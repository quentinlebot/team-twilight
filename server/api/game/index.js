var express =       require('express');
var controller =    require('./game.controller');
var auth =          require('../../auth/auth.service');

var router =        express.Router();

router.get('/',                 controller.index);
router.get('/season/:id_season',         
                                controller.getSeason);
router.get('/:id',              controller.show);
//router.post('/',        auth.isAuthenticated, controller.create);
//router.put('/:id',      auth.isAuthenticated, controller.update);
//router.patch('/:id',    auth.isAuthenticated, controller.active);
//router.delete('/:id',   auth.isAuthenticated, controller.destroy);

module.exports = router;