const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(), 
  fileFilter: function (req, file, callback) {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      callback(null, true);
    } else {
      callback(new Error('Only PDF & DOC allowed'));
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2 // 2MB
  }
});

const handleUpload = (req, res, next) => {
    upload.single('file')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Ukuran file terlalu besar! Maksimal 3MB.' 
                });
            }
            return res.status(400).json({ success: false, message: err.message });
        } else if (err) {
            return res.status(500).json({ 
                success: false, 
                message: 'Terjadi kesalahan saat memproses file.' 
            });
        }
        
        next();
    });
};

module.exports = {upload, handleUpload};
