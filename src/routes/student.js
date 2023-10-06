const express = require('express');
const studentController = require('../app/controllers/studentControllers');
const router = express.Router();

router.get('/get-all', studentController.getAll);
router.get('/get-students', studentController.getStudent);
router.get('/user', studentController.getUserPage);
router.get('/awards', studentController.getAwards);
router.post('/create', studentController.create);
router.delete('/:id/delete', studentController.delete);
router.put('/update/:id', studentController.update);

module.exports = router;
