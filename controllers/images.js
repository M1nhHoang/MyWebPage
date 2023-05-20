module.exports = {
    get: (req, res) => {
        let fs = require('fs');
        let path = require('path');
        // get params
        let filename = req.params.filename;
        // file path
        let dir = path.join(__dirname, '..', `public/images/${filename}`)
        
        // check file exit
        fs.access(dir, fs.constants.F_OK, (err) => {
            if (err) {
                // image not found
                res.sendStatus(404);
            } else {
                // read image
                fs.readFile(dir, (err, data) => {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.setHeader('Content-Type', 'image/jpeg'); // Đặt header content-type
                        res.send(data);
                    }
                })
            }
        })
    }
}