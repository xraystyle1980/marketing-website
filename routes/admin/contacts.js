const AdminContactsController = require("../../controllers/admin/AdminContactsController");

const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require('../../helpers/passport')

router.get("/", ensureAuthenticated, AdminContactsController.getContacts);

module.exports = router;
