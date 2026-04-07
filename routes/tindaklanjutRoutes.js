const express = require("express");
const verifyToken = require('../middleware/authMiddleware');
const authorizationRoles = require('../middleware/roleMiddleware');
const router = express.Router();
const handleUploadArahan = require('../middleware/uploadFileArahan');
const handleUploadTindakLanjut = require('../middleware/uploadPatchTindakLanjut')
const { getTindakLanjut, createTindakLanjut, updateTindakLanjut, getMyArahan, getFile, getFileMeta } = require('../controllers/tindaklanjutController')

// router get tindak lanjut
router.get('/get-tindaklanjut', getTindakLanjut);

// router get arahan sesuai pegawai
router.get('/get-arahan', verifyToken, authorizationRoles('pegawai', 'admin'), getMyArahan);

// router post untuk membuat arahan dan tindak lanjut
router.post('/create-tindaklanjut', handleUploadArahan, createTindakLanjut);

// router patch untuk mengisi tindak lanjut
router.patch('/update/:id/tindaklanjut', verifyToken, authorizationRoles('pegawai', 'admin'),handleUploadTindakLanjut, updateTindakLanjut);

// router get membuka file
router.get('/file_tindak/:id', getFile);

router.get('/file_meta/:id', getFileMeta);


module.exports = router;
