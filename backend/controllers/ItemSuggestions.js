const ItemSuggestion = require("../models/ItemSuggestions");

const AddItemSuggestions = async (req, res) => {
  try {
    const item = req.body.item;
    // Assuming you have a Mongoose model named ItemSuggestion
    const newItem = new ItemSuggestion({ item: item });
    await newItem.save();

    res.status(201).json({ success: true, data: newItem });
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
