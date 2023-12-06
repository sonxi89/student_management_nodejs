const express = require('express');
const studentController = require('../app/controllers/studentControllers');
const router = express.Router();

router.get('/get-all', studentController.getAll);
router.get('/students', studentController.getStudent);
router.get('/awards', studentController.getAwards);
router.post('/create', studentController.create);
router.delete('/:id/delete', studentController.delete);
router.put('/update/:id', studentController.update);
router.delete('/delete-score/:id', studentController.deleteScore);
router.put('/update-score/:id', studentController.updateScore);
router.get('/scores', studentController.getScore);
router.get('/statistics', studentController.statistics);
router.get('/report', studentController.report);

module.exports = router;
