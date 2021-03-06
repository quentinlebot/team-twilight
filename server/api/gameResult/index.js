var express =       require('express');
var controller =    require('./gameResult.controller');
var auth =          require('../../auth/auth.service');

var router =        express.Router();

router.get('/',         controller.index);
router.get('/:id',      controller.show);
router.get('/season/:season_id',      
                        controller.getSeason);
router.get('/season/:season_id/player/:player_id',      
                        controller.getBestSeasonPlayer);
router.get('/game/:game_id',      
                        controller.getGame);
//router.post('/',        auth.isAuthenticated, controller.create);
//router.put('/:id',      auth.isAuthenticated, controller.update);
//router.patch('/:id',    auth.isAuthenticated, controller.active);
//router.delete('/:id',   auth.isAuthenticated, controller.destroy);

module.exports = router;