const app = require("./app");
const sequelize = require("./utils/database");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {

        await sequelize.authenticate();
        console.log("Database Connected");
        await sequelize.sync();
        console.log("Tables Synced");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.log(error);
    }
};

startServer();