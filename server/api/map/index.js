var express =       require('express');
var controller =    require('./map.controller');
var router =        express.Router();

router.get('/new/:nbPlayer',    controller.new);
router.get('/:id',              controller.show);

module.exports = router;