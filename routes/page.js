module.exports = (app) => {
    let _pageController = require('../controllers/page')

    // load Main page
    app.route('/').get(_pageController.home);
}