package pl.emanuelwloch.admin.data

data class AdminMessage(
    val id: String,
    val name: String,
    val email: String,
    val subject: String,
    val message: String,
    val status: String,
    val createdAt: String,
)
