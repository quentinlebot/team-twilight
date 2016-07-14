var express =       require('express');
var controller =    require('./race.controller');
var auth =          require('../../auth/auth.service');

var router =        express.Router();

router.get('/',                         controller.index);
router.get('/:id',                      controller.show);
router.get('/newPick/:nbPlayer',       controller.pick);
//router.post('/',        auth.isAuthenticated, controller.create);
//router.put('/:id',      auth.isAuthenticated, controller.update);
//router.patch('/:id',    auth.isAuthenticated, controller.active);
//router.delete('/:id',   auth.isAuthenticated, controller.destroy);

module.exports = router;
