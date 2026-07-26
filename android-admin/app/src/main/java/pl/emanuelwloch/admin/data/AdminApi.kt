package pl.emanuelwloch.admin.data

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.json.JSONObject
import java.net.HttpURLConnection
import java.net.URL

class AdminApi(private val baseUrl: String) {
    suspend fun login(password: String): String {
        val response = request(
            path = "/api/mobile/auth",
            method = "POST",
            body = JSONObject().put("password", password),
        )
        return response.getString("token")
    }

    suspend fun getMessages(token: String): List<AdminMessage> {
        val response = request(
            path = "/api/mobile/messages",
            method = "GET",
            token = token,
        )
        val messages = response.getJSONArray("messages")
        return buildList {
            repeat(messages.length()) { index ->
                val item = messages.getJSONObject(index)
                add(
                    AdminMessage(
                        id = item.optString("id"),
                        name = item.optString("name"),
                        email = item.optString("email"),
                        subject = item.optString("subject"),
                        message = item.optString("message"),
                        status = item.optString("status", "unread"),
                        createdAt = item.optString("created_at"),
                    ),
                )
            }
        }
    }

    suspend fun deleteMessage(token: String, messageId: String) {
        request(
            path = "/api/mobile/messages",
            method = "DELETE",
            token = token,
            body = JSONObject().put("id", messageId),
        )
    }

    suspend fun registerDevice(
        token: String,
        deviceId: String,
        installationId: String,
    ) {
        request(
            path = "/api/mobile/device",
            method = "POST",
            token = token,
            body = JSONObject()
                .put("deviceId", deviceId)
                .put("installationId", installationId),
        )
    }

    suspend fun unregisterDevice(token: String, deviceId: String) {
        request(
            path = "/api/mobile/device",
            method = "DELETE",
            token = token,
            body = JSONObject().put("deviceId", deviceId),
        )
    }

    suspend fun sendTestNotification(token: String) {
        request(
            path = "/api/mobile/test",
            method = "POST",
            token = token,
        )
    }

    private suspend fun request(
        path: String,
        method: String,
        token: String? = null,
        body: JSONObject? = null,
    ): JSONObject = withContext(Dispatchers.IO) {
        val connection = (URL("$baseUrl$path").openConnection() as HttpURLConnection).apply {
            requestMethod = method
            connectTimeout = 15_000
            readTimeout = 20_000
            setRequestProperty("Accept", "application/json")
            setRequestProperty("Content-Type", "application/json; charset=utf-8")
            token?.let { setRequestProperty("Authorization", "Bearer $it") }
            useCaches = false
            if (body != null) {
                doOutput = true
                outputStream.bufferedWriter(Charsets.UTF_8).use { writer ->
                    writer.write(body.toString())
                }
            }
        }

        try {
            val status = connection.responseCode
            val stream = if (status in 200..299) connection.inputStream else connection.errorStream
            val raw = stream?.bufferedReader(Charsets.UTF_8)?.use { it.readText() }.orEmpty()
            val json = runCatching { JSONObject(raw) }.getOrElse { JSONObject() }

            if (status !in 200..299) {
                throw ApiException(
                    statusCode = status,
                    message = json.optString("error", "Błąd połączenia z serwerem ($status)."),
                )
            }

            json
        } finally {
            connection.disconnect()
        }
    }
}

class ApiException(
    val statusCode: Int,
    override val message: String,
) : Exception(message)
