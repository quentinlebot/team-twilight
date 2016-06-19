var express =       require('express');
var controller =    require('./gameResult.controller');
var router =        express.Router();

router.get('/',         controller.index);
router.get('/:id',      controller.show);
router.post('/',        controller.create);
//router.put('/:id',      controller.update);
//router.patch('/:id',    controller.active);
router.delete('/:id',   controller.destroy);

module.exports = router;