const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/msword' ||
      file.mimetype ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF/DOC allowed'));
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 3 // 3MB
  }
});

const upload_file_arahan = upload.fields([
  { name: 'file_arahan', maxCount: 5 },
]);

const handleUploadArahan = (req, res, next) => {
    upload_file_arahan(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Ukuran file terlalu besar! Maksimal 3MB per file.' 
                });
            }
            if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                return res.status(400).json({ 
                    success: false, 
                    message: 'File terlalu banyak atau field salah! Maksimal upload 5 file sekaligus.' 
                });
            }
            return res.status(400).json({ success: false, message: err.message });
            
        } else if (err) {
            return res.status(400).json({ 
                success: false, 
                message: err.message 
            });
        }
        
        next();
    });
};

module.exports = handleUploadArahan;

