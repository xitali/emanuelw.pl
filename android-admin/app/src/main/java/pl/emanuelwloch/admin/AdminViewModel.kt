package pl.emanuelwloch.admin

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.google.firebase.messaging.FirebaseMessaging
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import pl.emanuelwloch.admin.data.AdminApi
import pl.emanuelwloch.admin.data.AdminMessage
import pl.emanuelwloch.admin.data.ApiException
import pl.emanuelwloch.admin.data.SecureSessionStore

data class AdminUiState(
    val isAuthenticated: Boolean = false,
    val isLoading: Boolean = false,
    val messages: List<AdminMessage> = emptyList(),
    val error: String? = null,
    val info: String? = null,
)

class AdminViewModel(application: Application) : AndroidViewModel(application) {
    private val api = AdminApi(BuildConfig.API_BASE_URL)
    private val session = SecureSessionStore(application)
    private val mutableState = MutableStateFlow(
        AdminUiState(isAuthenticated = session.readToken() != null),
    )
    val state: StateFlow<AdminUiState> = mutableState.asStateFlow()

    init {
        if (mutableState.value.isAuthenticated) {
            refreshMessages()
            registerCurrentFcmToken()
        }
    }

    fun login(password: String) {
        if (password.isBlank() || mutableState.value.isLoading) return
        mutableState.update { it.copy(isLoading = true, error = null, info = null) }

        viewModelScope.launch {
            runCatching { api.login(password) }
                .onSuccess { token ->
                    session.saveToken(token)
                    mutableState.update {
                        it.copy(isAuthenticated = true, isLoading = false)
                    }
                    registerCurrentFcmToken()
                    refreshMessages()
                }
                .onFailure { error -> handleError(error) }
        }
    }

    fun refreshMessages() {
        val token = session.readToken() ?: return logoutLocally()
        mutableState.update { it.copy(isLoading = true, error = null, info = null) }

        viewModelScope.launch {
            runCatching { api.getMessages(token) }
                .onSuccess { messages ->
                    mutableState.update {
                        it.copy(messages = messages, isLoading = false)
                    }
                }
                .onFailure { error -> handleError(error) }
        }
    }

    fun deleteMessage(messageId: String) {
        val token = session.readToken() ?: return logoutLocally()
        mutableState.update { it.copy(isLoading = true, error = null, info = null) }

        viewModelScope.launch {
            runCatching { api.deleteMessage(token, messageId) }
                .onSuccess {
                    mutableState.update {
                        it.copy(
                            messages = it.messages.filterNot { message -> message.id == messageId },
                            isLoading = false,
                            info = "Wiadomość została usunięta.",
                        )
                    }
                }
                .onFailure { error -> handleError(error) }
        }
    }

    fun sendTestNotification() {
        val token = session.readToken() ?: return logoutLocally()
        mutableState.update { it.copy(isLoading = true, error = null, info = null) }

        viewModelScope.launch {
            runCatching { api.sendTestNotification(token) }
                .onSuccess {
                    mutableState.update {
                        it.copy(
                            isLoading = false,
                            info = "Wysłano testowe powiadomienie.",
                        )
                    }
                }
                .onFailure { error -> handleError(error) }
        }
    }

    fun logout() {
        val token = session.readToken()
        val deviceId = session.deviceId()
        logoutLocally()

        if (token != null) {
            viewModelScope.launch {
                runCatching { api.unregisterDevice(token, deviceId) }
            }
        }
    }

    private fun registerCurrentFcmToken() {
        if (session.readToken() == null) return
        FirebaseMessaging.getInstance().register().addOnFailureListener { error ->
            mutableState.update {
                it.copy(
                    error = error.message
                        ?: "Nie udało się włączyć powiadomień.",
                )
            }
        }
    }

    private fun handleError(error: Throwable) {
        if (error is ApiException && error.statusCode == 401) {
            logoutLocally()
            mutableState.update {
                it.copy(error = "Sesja wygasła. Zaloguj się ponownie.")
            }
            return
        }

        mutableState.update {
            it.copy(
                isLoading = false,
                error = error.message ?: "Wystąpił nieoczekiwany błąd.",
            )
        }
    }

    private fun logoutLocally() {
        session.clearToken()
        mutableState.value = AdminUiState()
    }
}
