const Category = require("../../models/category");
const Story = require("../../models/story");

const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require('../../helpers/passport')

const AdminStoriesController = require("../../controllers/admin/AdminStoriesController");
router.get("/", ensureAuthenticated, AdminStoriesController.getStories);

router.get("/:id", ensureAuthenticated, AdminStoriesController.getSingleStory);

router.get("/edit/:id", ensureAuthenticated, AdminStoriesController.editStory);

router.post("/", ensureAuthenticated, AdminStoriesController.createStory);

router.delete("/delete/:id", ensureAuthenticated, AdminStoriesController.deleteStory);
router.put("/update/:id", ensureAuthenticated, AdminStoriesController.updateStory);
module.exports = router;
