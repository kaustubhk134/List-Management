const express = require("express");
const router = express.Router();

const {
  createList,
  getAllLists,
  getListById,
  updateList,
  softDelete,
  hardDelete,
} = require("../controllers/listController");

router.post("/", createList);
router.get("/", getAllLists);
router.get("/:id", getListById);
router.put("/:id", updateList);
router.patch("/soft-delete/:id", softDelete);
router.delete("/:id", hardDelete);

module.exports = router;