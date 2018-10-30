const express = require("express");
const router = express.Router();
const AdminLocationsController = require('../../controllers/admin/AdminLocationsController')

router.get("/", AdminLocationsController.getLocations);

router.get("/:id", AdminLocationsController.getSingleLocation);

router.get("/edit/:id", AdminLocationsController.editLocation);

router.post("/", AdminLocationsController.createLocation);

router.delete("/delete/:id", AdminLocationsController.deleteLocation);
router.put("/update/:id", AdminLocationsController.updateLocation);
module.exports = router;
