module.exports = (app) => {
    let _chessController = require('../controllers/chess')

    // get bestmove
    app.route('/api/chess/getbestmove').get(_chessController.getBestMove)
}