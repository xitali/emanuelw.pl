package pl.emanuelwloch.admin.notifications

import android.annotation.SuppressLint
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Intent
import androidx.core.app.NotificationCompat
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import pl.emanuelwloch.admin.BuildConfig
import pl.emanuelwloch.admin.MainActivity
import pl.emanuelwloch.admin.R
import pl.emanuelwloch.admin.data.AdminApi
import pl.emanuelwloch.admin.data.SecureSessionStore

@SuppressLint("MissingFirebaseInstanceTokenRefresh")
class EmanuelFirebaseMessagingService : FirebaseMessagingService() {
    private val serviceScope = CoroutineScope(SupervisorJob() + Dispatchers.IO)

    override fun onRegistered(firebaseInstallationId: String) {
        super.onRegistered(firebaseInstallationId)
        val session = SecureSessionStore(this)
        val token = session.readToken() ?: return

        serviceScope.launch {
            runCatching {
                AdminApi(BuildConfig.API_BASE_URL).registerDevice(
                    token = token,
                    deviceId = session.deviceId(),
                    installationId = firebaseInstallationId,
                )
            }
        }
    }

    override fun onUnregistered(firebaseInstallationId: String) {
        super.onUnregistered(firebaseInstallationId)
        val session = SecureSessionStore(this)
        val token = session.readToken() ?: return

        serviceScope.launch {
            runCatching {
                AdminApi(BuildConfig.API_BASE_URL).unregisterDevice(
                    token = token,
                    deviceId = session.deviceId(),
                )
            }
        }
    }

    override fun onMessageReceived(message: RemoteMessage) {
        super.onMessageReceived(message)
        createChannel()

        val title = message.data["title"] ?: "Emanuel Admin"
        val body = message.data["body"] ?: "Masz nową wiadomość."
        val messageId = message.data["messageId"].orEmpty()
        val intent = Intent(this, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_CLEAR_TOP or Intent.FLAG_ACTIVITY_SINGLE_TOP
            putExtra("messageId", messageId)
        }
        val pendingIntent = PendingIntent.getActivity(
            this,
            0,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
        )
        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_notification)
            .setContentTitle(title)
            .setContentText(body)
            .setStyle(NotificationCompat.BigTextStyle().bigText(body))
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setAutoCancel(true)
            .setContentIntent(pendingIntent)
            .build()

        getSystemService(NotificationManager::class.java).notify(
            messageId.hashCode().takeIf { it != 0 } ?: System.currentTimeMillis().toInt(),
            notification,
        )
    }

    private fun createChannel() {
        val channel = NotificationChannel(
            CHANNEL_ID,
            getString(R.string.notification_channel_name),
            NotificationManager.IMPORTANCE_HIGH,
        ).apply {
            description = getString(R.string.notification_channel_description)
        }
        getSystemService(NotificationManager::class.java).createNotificationChannel(channel)
    }

    private companion object {
        const val CHANNEL_ID = "portfolio_messages"
    }
}
