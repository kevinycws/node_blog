const crypto = require("crypto")

module.exports = function(password, key="ycwkevin"){
    const hmac = crypto.createHmac("sha256", key)
    hmac.update(password)
    const passwordHmac = hmac.digest("hex")
    return passwordHmac
}