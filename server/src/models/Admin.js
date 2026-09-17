import mongoose from 'mongoose';
const schema=new mongoose.Schema({email:{type:String,unique:true,lowercase:true,trim:true},passwordHash:{type:String,required:true},role:{type:String,enum:['admin'],default:'admin'},lastLoginAt:Date},{timestamps:true});
export default mongoose.model('Admin',schema);
