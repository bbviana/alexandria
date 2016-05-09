
const getLoggedUser = function (req, res) {
    const user = req.user || {}
    res.json({
        name: user.name,
        login: user.login,
        email: user.email,
        avatarURL: user.avatarURL,
        admin: user.admin
    })
}

export default {
    getLoggedUser
}