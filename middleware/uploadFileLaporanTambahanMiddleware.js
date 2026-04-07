const multer = require('multer');

const upload_laporan_tambahan = multer({
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

const handleUploadLaporanTambahan = (req, res, next) => {
    upload_laporan_tambahan.single('laporan_tambahan_path')(req, res, function (err) {
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

module.exports = handleUploadLaporanTambahan;
