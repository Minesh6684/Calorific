const mongoose = require("mongoose");

const ItemSuggestionSchema = new mongoose.Schema({
  item: { type: String, required: true },
});

const ItemSuggestion = mongoose.model("ItemSuggestion", ItemSuggestionSchema);

module.exports = ItemSuggestion;
