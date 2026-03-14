const express = require("express");
const router = express.Router();

const {
  getRecycleBin,
  restoreItem,
  permanentDelete,
  emptyRecycleBin
} = require("../controllers/recycleController");


// get all deleted items
router.get("/", getRecycleBin);


// restore item
router.put("/restore/:type/:id", restoreItem);


// permanent delete
router.delete("/delete/:type/:id", permanentDelete);


// empty recycle bin
router.delete("/empty", emptyRecycleBin);


module.exports = router;