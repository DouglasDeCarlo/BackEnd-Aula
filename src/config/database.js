import mongoose from "mongoose";

export const connectDatabase = async () => {
    try {
        const dbUrl = process.env.dbUrl;

        if (!dbUrl) {
            throw new Error("MONGO_URI não definida");
        }

        await mongoose.connect(dbUrl );

        console.log("Conectado com o MongoDB");
    } catch (error) {
        console.error("Erro ao conectar com o MongoDB:", error);
        process.exit(1);
    }
};