const { spawn } = require('child_process');

module.exports = {
    getBestMove: (req, res) => {
        return new Promise((resolve, reject) => {
            // get parameter
            const fen = req.query.fen;
            const time = req.query.time;
            
            if (time > 1000){
                reject('Time limit is 1000');
            }
            
            const stockfish = spawn('./services/stockfish_10_x64');
            
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
                    reject('Process exited with code ' + code);
                }
            });
            
            stockfish.stdin.write('uci\n');
            stockfish.stdin.write('ucinewgame\n');
            stockfish.stdin.write('position fen ' + fen + '\n');
            stockfish.stdin.write('go movetime ' + time + '\n');
        }).then((bestMove) => {
                res.status(200).json({ bestMove });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }   
}
