const express = require("express");
const router = express.Router();
const VietnamController = require("../controller/vietnamController");

router.get('/',VietnamController.getAll);
router.post('/province',VietnamController.createProvince);
router.post('/district',VietnamController.createDistrict);

module.exports= router;