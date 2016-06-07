var express =       require('express');
var controller =    require('./user.controller');
var auth =          require('../../auth/auth.service');

var router = express.Router();

router.get('/',         auth.isAuthenticated, controller.index);
router.get('/roles',    auth.isAuthenticated, controller.getRoles);
router.get('/:id',      auth.isAuthenticated, controller.show);
router.post('/',        auth.isAuthenticated, controller.create);
router.put('/:id',      auth.isAuthenticated, controller.update);
router.patch('/:id',    auth.isAuthenticated, controller.active);
router.delete('/:id',   auth.hasRole('Administrateur'), controller.destroy);

module.exports = router;
