module.exports = (app) => {
    let _imagesController = require('../controllers/images')

    // get images
    app.route('/images/:filename').get(_imagesController.get)
}