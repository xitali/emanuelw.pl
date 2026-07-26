package pl.emanuelwloch.admin.ui

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val DarkColors = darkColorScheme(
    primary = Color(0xFF22D3EE),
    secondary = Color(0xFFA855F7),
    background = Color(0xFF07111F),
    surface = Color(0xFF0D1B2A),
    surfaceVariant = Color(0xFF14263A),
    onPrimary = Color(0xFF001F24),
    onBackground = Color(0xFFE5F2FF),
    onSurface = Color(0xFFE5F2FF),
    onSurfaceVariant = Color(0xFFBAC8D8),
    error = Color(0xFFFFB4AB),
)

private val LightColors = lightColorScheme(
    primary = Color(0xFF007C8A),
    secondary = Color(0xFF7E22CE),
    background = Color(0xFFF5FAFF),
    surface = Color(0xFFFFFFFF),
    surfaceVariant = Color(0xFFE6EEF7),
    onPrimary = Color.White,
    onBackground = Color(0xFF0B1725),
    onSurface = Color(0xFF0B1725),
    onSurfaceVariant = Color(0xFF425466),
)

@Composable
fun EmanuelAdminTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = if (isSystemInDarkTheme()) DarkColors else LightColors,
        content = content,
    )
}
