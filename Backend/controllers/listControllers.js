const db = require("../models");

const list = db.list;

module.exports = {
  listOfItems: async (req, res) => {
    try {
      const items = req.body.item;

      if (!Array.isArray(items)) {
        return res.status(400).json({
          success: false,
          message: "Expected 'item' to be an array",
        });
      }

      // Filter out empty or whitespace-only strings
      const validItems = items.filter((item) => item && item.trim() !== "");

      if (validItems.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No valid items to insert",
        });
      }

      const listAdded = await Promise.all(
        validItems.map(async (item) => {
          return await list.create({ item });
        })
      );

      return res.status(200).json({
        success: true,
        list: listAdded,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  getAllItems: async (req, res) => {
    try {
      const items = await list.findAll();

      return res.status(200).json({
        success: true,
        list: items,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  deleteItem: async (req, res) => {
    const { id } = req.body;
    try {
      const deleted = await db.list.destroy({ where: { id } });
      if (deleted) {
        res.json({ success: true, message: "Item deleted" });
      } else {
        res.json({ success: false, message: "Item not found" });
      }
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
};
