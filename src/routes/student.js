const express = require('express');
const studentController = require('../app/controllers/studentControllers');
const router = express.Router();
const { upload } = require('../app/midlewares/uploadMidleware');

router.post('/upload', upload.single('file'), studentController.upload);
router.get('/get-users', studentController.getUser);
router.get('/user', studentController.getUserPage);
router.get('/awards', studentController.getAwards);
router.post('/create', studentController.create);
router.delete('/:id/delete', studentController.delete);
// router.put('/:id/update', studentController.update);

module.exports = router;
