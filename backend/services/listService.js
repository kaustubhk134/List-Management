const List = require("../models/listModel");

const createList = async (data) => {
    return await List.create(data);
};

const getAllLists = async () => {
    return await List.findAll({
        where: {
            isDeleted: false,
        },
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