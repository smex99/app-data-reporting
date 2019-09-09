const router = require('express-promise-router')();
const AppController = require('../controllers/app');

router.route('/').get(AppController.invoiceReadingResult);
router.route('/:id').get(AppController.getFocusReadingInvoiceById);

module.exports = router;
