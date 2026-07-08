const List = require("../models/listModel");
const { Op } = require("sequelize");

const createList = async (data) => {
    return await List.create(data);
};

const getAllLists = async (page, limit, search) => {
    const offset = (page - 1) * limit;

    // Base condition: only fetch items that are not soft-deleted
    const whereCondition = {
        isDeleted: false,
    };

    // If a search term exists, filter by title OR description (case-insensitive)
    if (search) {
        whereCondition[Op.or] = [
            { title: { [Op.iLike]: `%${search}%` } },
            { description: { [Op.iLike]: `%${search}%` } }
        ];
    }

    return await List.findAndCountAll({
        where: whereCondition,
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