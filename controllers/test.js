const _chess = require('./chess')
// Example usage
const fen = '3r1rk1/5ppp/2p1pn2/p1P5/1p2P3/3Q1P2/PP3P1P/3RR1K1 b';

_chess.getBestMove(fen, 5000)

  .then((bestMove) => {
    console.log('Best move:', bestMove);
  })
  .catch((error) => {
    console.error('Error:', error);
  });