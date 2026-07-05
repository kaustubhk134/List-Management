const listService = require("../services/listService");

// Create
const createList = async (req, res, next) => {
  try {
    const list = await listService.createList(req.body);

    res.status(201).json({
      success: true,
      message: "Created successfully",
      data: list,
    });
  } catch (error) {
    next(error);
  }
};

// Get All
const getAllLists = async (req, res, next) => {
  try {
    const lists = await listService.getAllLists();

    res.status(200).json({
      success: true,
      data: lists,
    });
  } catch (error) {
    next(error);
  }
};

// Get By ID
const getListById = async (req, res, next) => {
  try {
    const list = await listService.getListById(req.params.id);

    if (!list) {
      return res.status(404).json({
        success: false,
        message: "List not found",
      });
    }

    res.status(200).json({
      success: true,
      data: list,
    });
  } catch (error) {
    next(error);
  }
};

// Update
const updateList = async (req, res, next) => {
  try {
    const list = await listService.updateList(req.params.id, req.body);

    if (!list) {
      return res.status(404).json({
        success: false,
        message: "List not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: list,
    });
  } catch (error) {
    next(error);
  }
};

// Soft Delete
const softDelete = async (req, res, next) => {
  try {
    const list = await listService.softDelete(req.params.id);

    if (!list) {
      return res.status(404).json({
        success: false,
        message: "List not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Soft deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Hard Delete
const hardDelete = async (req, res, next) => {
  try {
    const deleted = await listService.hardDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "List not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Deleted permanently",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createList,
  getAllLists,
  getListById,
  updateList,
  softDelete,
  hardDelete,
};