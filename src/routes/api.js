const express = require('express');
const apiController = require('../app/controllers/apiControllers');
const router = express.Router();
const { upload } = require('../app/midlewares/uploadMidleware');

router.post('/upload', upload.single('file'), apiController.upload);
router.get('/get-users', apiController.getUser);
router.get('/user', apiController.getUserPage);
router.get('/awards', apiController.getAwards);
router.post('/create', apiController.create);

module.exports = router;
