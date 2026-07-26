package pl.emanuelwloch.admin

import android.Manifest
import android.os.Build
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.runtime.LaunchedEffect
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import pl.emanuelwloch.admin.ui.EmanuelAdminApp
import pl.emanuelwloch.admin.ui.EmanuelAdminTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            val viewModel: AdminViewModel = viewModel()
            val state = viewModel.state.collectAsStateWithLifecycle().value
            val permissionLauncher = rememberLauncherForActivityResult(
                ActivityResultContracts.RequestPermission(),
            ) {}

            LaunchedEffect(state.isAuthenticated) {
                if (
                    state.isAuthenticated &&
                    Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU &&
                    !shouldShowRequestPermissionRationale(Manifest.permission.POST_NOTIFICATIONS)
                ) {
                    permissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
                }
            }

            EmanuelAdminTheme {
                EmanuelAdminApp(
                    state = state,
                    onLogin = viewModel::login,
                    onRefresh = viewModel::refreshMessages,
                    onDelete = viewModel::deleteMessage,
                    onTestNotification = viewModel::sendTestNotification,
                    onLogout = viewModel::logout,
                )
            }
        }
    }
}
