const ItemSuggestion = require("../models/ItemSuggestions");

const AddItemSuggestions = async (req, res) => {
  const item = req.body.item;
  const existingItem = await ItemSuggestion.find({ item: item });
  try {
    // Assuming you have a Mongoose model named ItemSuggestion
    if (existingItem.length === 0) {
      const newItem = new ItemSuggestion({ item: item });
      await newItem.save();
      
      res.status(201).json({ success: true, data: newItem });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const GetItemSuggestions = async (req, res) => {
  const items = await ItemSuggestion.find({});
  res.status(200).json(items);
};

module.exports = { GetItemSuggestions, AddItemSuggestions };
