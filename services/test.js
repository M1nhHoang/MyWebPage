const { spawn } = require('child_process');

function getBestMove(fen, time) {
  return new Promise((resolve, reject) => {
    const stockfish = spawn('./stockfish_10_x64');

    stockfish.stdout.on('data', (data) => {
        const output = data.toString();
        const lines = output.split('\n');
        
        for (let line of lines) {
            if (line.startsWith('bestmove')) {
                const bestMove = line.split(' ')[1];
                stockfish.stdin.write('quit\n');
                resolve(bestMove);
            }
        }
    });
    
    stockfish.on('error', (error) => {
        reject('Error starting Stockfish: ' + error);
    });
    
    stockfish.on('exit', (code) => {
        if (code !== 0) {
            reject('Stockfish process exited with code ' + code);
        }
    });
    
    stockfish.stdin.write('uci\n');
    stockfish.stdin.write('ucinewgame\n');
    stockfish.stdin.write('position fen ' + fen + '\n');
    stockfish.stdin.write('go movetime ' + time + '\n');
    
  });
}

// Example usage
const fen = 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w';
const time = 1000; // Thời gian chờ (tính bằng mili giây)

getBestMove(fen, time)
  .then((bestMove) => {
    console.log('Best move:', bestMove);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
