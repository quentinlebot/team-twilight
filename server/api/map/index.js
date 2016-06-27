var express =       require('express');
var controller =    require('./map.controller');
var auth =          require('../../auth/auth.service');

var router =        express.Router();

router.get('/new/:nbPlayer/:gap',    controller.new);
router.get('/:id',              controller.show);

module.exports = router;