const router = require ('express').Router();
const controller = require('../controllers/user.controller');
 router.post('/me',controller.getMe);
 router.post('/me',controller.updateMe);

 module.exports =router;