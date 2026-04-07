const multer = require('multer');

const upload_file_display = multer({
  storage: multer.memoryStorage(), 
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "video/mp4" ||
      file.mimetype === "video/webm"
    ) {
      cb(null, true);
    } else {
      cb(new Error('only JPG, PNG, MP4, WebM support!'));
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 50 // 50MB
  }
});

const handleUploadDisplay = (req, res, next) => {
    upload_file_display.single('display_path')(req, res, function (err) {
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

module.exports = {upload_file_display, handleUploadDisplay};
