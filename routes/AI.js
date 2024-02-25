module.exports = (app) => {
    let _AIController = require('../controllers/AI')

    // get bestmove
    app.route('/api/ai/captchahusc').post(_AIController.captcha_HUSC)
}