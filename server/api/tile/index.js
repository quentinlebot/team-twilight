var express =       require('express');
var controller =    require('./tile.controller');
var router =        express.Router();

router.get('/:id',      controller.show);

module.exports = router;
