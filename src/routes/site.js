const express = require('express');
const siteController = require('../app/controllers/siteController');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.array('files'), siteController.upload);

module.exports = router;
