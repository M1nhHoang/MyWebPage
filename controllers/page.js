module.exports = {
    home: async (req, res) => {
        // instance
        let _pageService = require('../services/pageService');
        // Lấy ID của người dùng từ cookie hoặc tạo mới nếu cookie không tồn tại
        let userId = req.cookies.userId;
        
        // check if a request from a libary
        respone = _pageService.isLegit(req);
        if (respone) {
            res.end(respone);
        }
        
        // check if user don't have cookie
        if (!userId) {
            // set user cookie
            res.cookie('userId',await _pageService.createNewUser(), { 
                maxAge: 30 * 24 * 60 * 1000  // 1 month
                // httpOnly: true,
                // secure: true
            });
        }
        // check if user not exit
        else if (!_pageService.isExitUser(userId)) {
            // if cookie is not found in database, create a new random userid
            // set user cookie
            res.cookie('userId',await _pageService.createNewUser(), { 
                maxAge: 30 * 24 * 60 * 1000 // 1 month
                // httpOnly: true,
                // secure: true
            });
        }
        
        // Hiển thị trang web
        let path = require('path');
        res.set('X-Content-Type-Options', 'nosniff');
        res.set('Cache-Control', 'no-store');
        res.set('Content-Type', 'text/html; charset=utf-8');
        res.sendFile(path.join(__dirname, '..', 'public/index.html'));
    }
}