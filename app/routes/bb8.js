const router = require('express-promise-router')();
const AppController = require('../controllers/app');

router.route('/').get(AppController.bb8ReadingResult);
router.route('/performance').get(AppController.bb8PerformanceMetrics);
router.route('/:id').get(AppController.getBB8ReadingResultById);
router.route('/filename/:id').get(AppController.getfilenameByInvoiceId);
router.route('/image').get(AppController.getInvoiceImage);

module.exports = router;
