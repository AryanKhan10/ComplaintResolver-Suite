import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log(process.env.DATABASE_URL)
        const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URL}`)
        console.log(`MongoDB connected !! ${connectionInstance.connection.host}`)

    } catch (error) {
        console.log(`MongoDB Connection Error ${process.env.DATABASE_URL}`, error);
        process.exit(1)
    }
}

export default connectDB;