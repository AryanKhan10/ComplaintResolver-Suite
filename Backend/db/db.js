import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URL}`)
        console.log(`MongoDB connected !! ${connectionInstance.connection.host}`)

    } catch (error) {
        console.log(`MongoDB Connection Error ${process.env.DATABASE_URL}/${DB_NAME}` ,error);
        process.exit(1)
    }
}

export default connectDB;