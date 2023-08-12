const multer = require('multer');
const storage = require('../Multer/multer.storage')
const httpErrors = require('http-errors');

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: function (req, file, callback) {
        if (!['image/jpeg', 'image/png'].includes(file.mimetype)) {
            return callback(httpErrors(422, 'The uploaded photo must be a JPEG or PNG image'), false);
        };
        callback(null, true);
    }
});

module.exports = upload;