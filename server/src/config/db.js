import mongoose from 'mongoose';
let connectionPromise;
export async function connectDB(){
  if(!process.env.MONGO_URI) throw new Error('MONGO_URI is missing');
  if(mongoose.connection.readyState===1)return mongoose.connection;
  if(!connectionPromise){
    connectionPromise=mongoose.connect(process.env.MONGO_URI).then(connection=>{
      console.log('MongoDB connected');
      return connection;
    }).catch(error=>{
      connectionPromise=undefined;
      throw error;
    });
  }
  return connectionPromise;
}
