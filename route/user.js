const expess = require('express');
;
const validation = require('../validation/user/validation.js');

const midtrans = require('../controller/midtransController.js');

const routers = expess.Router();

routers.get('/midtrans',midtrans.getMidtrans);
routers.post('/midtrans',midtrans.createMidtrans);
routers.post('/midtransPaymentLink',midtrans.createMidtransPaymentLink);
routers.delete('/midtrans/:id',midtrans.updateMidtrans);
routers.delete('/midtrans/:id',midtrans.deleteMidtrans);


module.exports = routers;