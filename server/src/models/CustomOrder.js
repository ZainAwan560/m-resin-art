import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:String,email:String,phone:String,productType:String,description:String,budget:Number,referenceImages:[String],status:{type:String,enum:['New','Reviewed','Quoted','Approved','Completed','Cancelled'],default:'New'}},{timestamps:true});
export default mongoose.model('CustomOrder',schema);
