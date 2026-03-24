import mongoose from "mongoose";

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongo DB Connected");
    } catch (err) {
        console.log(err.message);
    }
}
export default connectDB;