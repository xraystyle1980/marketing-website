const AdminCategoriesController = require("../../controllers/admin/AdminCategoriesController");

const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require('../../helpers/passport')

router.get("/", ensureAuthenticated, AdminCategoriesController.getCategories);

router.get("/edit/:id", ensureAuthenticated, AdminCategoriesController.editCategory);

router.post("/", ensureAuthenticated, AdminCategoriesController.createCategory);

router.delete("/delete/:id", ensureAuthenticated, AdminCategoriesController.deleteCategory);

router.put("/update/:id", ensureAuthenticated, AdminCategoriesController.updateCategory);

module.exports = router;
