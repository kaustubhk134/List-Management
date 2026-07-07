const List = require("../models/listModel");

const createList = async (data) => {
    return await List.create(data);
};

const getAllLists = async (page, limit) => {
    const offset = (page - 1) * limit;
    return await List.findAndCountAll({
        where: {
            isDeleted: false,
        },
        limit,
        offset,
        order: [["createdAt", "DESC"]],
    });
};

const getListById = async (id) => {
    return await List.findOne({
        where: {
            id,
            isDeleted: false,
        },
    });
};

const updateList = async (id, data) => {
    const list = await List.findByPk(id);
    if (!list) return null;
    return await list.update(data);
};

const softDelete = async (id) => {
    const list = await List.findByPk(id);
    if (!list) return null;
    return await list.update({
        isDeleted: true,
    });
};

const hardDelete = async (id) => {
    const list = await List.findByPk(id);
    if (!list) return null;
    await list.destroy();
    return true;
};

module.exports = {
    createList,
    getAllLists,
    getListById,
    updateList,
    softDelete,
    hardDelete,
};