const request = require('request');

module.exports = {
    captcha_HUSC: (req, res) => {
        try {
            const base64_image = req.body.image.replace(/^data:image\/\w+;base64,/, '');

            const options = {
                url: 'http://117.2.182.218:7777/captchahusc',
                method: 'POST',
                form: { 'image': base64_image }
            };

            // request post
            request(options, (error, response, body) => {
                if (error) {
                    res.status(500).json({ status: 'error', message: 'Không tìm thấy server! Liên hệ: 0161001726415 - Vietcombank' });
                } else {
                    if (response.statusCode === 200) {
                        res.status(200).json({ status: 'Success', result: body, info: '0161001726415 - Vietcombank' });
                    } else {
                        res.status(response.statusCode).json({ status: 'error', message: 'Lỗi từ máy chủ! Liên hệ: 0161001726415 - Vietcombank' });
                    }
                }
            });
        } catch (error) {
            res.status(400).json({ status: 'error', message: 'Hình ảnh phải là base64' });
        }
    }
}
