const express = require("express");
const router = express.Router();
const ProvinceController = require("../controller/provinceController");
const DistrictController = require('../controller/districtController');

router.get('/',ProvinceController.getAll);
router.post('/province',ProvinceController.create);
router.post('/district',DistrictController.create);

module.exports= router;