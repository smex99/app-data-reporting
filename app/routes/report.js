const router = require('express-promise-router')();
const AppController = require('../controllers/app');

router.route('/').get(AppController.invoiceReadingResult);
router.route('/prediction').get(AppController.predictionMetrics);
router.route('/performance').get(AppController.performanceMetrics);
router.route('/filename/:id').get(AppController.getfilenameByInvoiceId);
router.route('/count').get(AppController.readingClassCountPredicted);

module.exports = router;
