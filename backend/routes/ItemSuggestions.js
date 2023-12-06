const express = require("express");
const router = express.Router();
const {
  GetItemSuggestions,
  AddItemSuggestions,
} = require("../controllers/ItemSuggestions");

router.route("/get/").get(GetItemSuggestions);
router.route("/add/").post(AddItemSuggestions);

module.exports = router;
