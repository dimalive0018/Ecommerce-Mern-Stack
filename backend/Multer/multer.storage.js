const multer = require('multer');
const httpErrors = require('http-errors');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        if (!file) {
            callback(httpErrors(400, 'File non valido'))
        } else {
            callback(null, `Images`)
        };
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + `${file.originalname}`);
    }
});


module.exports = storage;