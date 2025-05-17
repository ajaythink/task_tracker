import mongoose from 'mongoose';

const Connection = async () => {
  try{
   await mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true});
    console.log("Database connected successfully");
  }
  catch(error){
    console.log("Database connection failed", error.message);11
  }
}


export default Connection;