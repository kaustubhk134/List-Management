const app = require("./app");
const sequelize = require("./utils/database");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {

        // // Force the database to drop and recreate tables right here at startup
        // console.log("Attempting to force sync database...");
        // await sequelize.sync({ force: true });
        // console.log("Database tables dropped and recreated with UUIDs successfully!");

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