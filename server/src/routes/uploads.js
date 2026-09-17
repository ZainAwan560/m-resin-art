import {Router} from 'express';
import multer from 'multer';
import {v2 as cloudinary} from 'cloudinary';
import {requireAdmin} from '../middleware/auth.js';

const r=Router();
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
});
const upload=multer({storage:multer.memoryStorage(),limits:{fileSize:5*1024*1024},fileFilter:(req,file,cb)=>{cb(null,/^image\/(jpeg|png|webp|gif)$/.test(file.mimetype))}});

const uploadToCloudinary=file=>new Promise((resolve,reject)=>{
  const stream=cloudinary.uploader.upload_stream({folder:'m-resin-art/products',resource_type:'image'},(error,result)=>error?reject(error):resolve(result));
  stream.end(file.buffer);
});

r.post('/',requireAdmin,upload.single('image'),async(req,res,next)=>{
  try{
    if(!req.file)return res.status(400).json({message:'Please select a JPG, PNG, WEBP or GIF image'});
    if(!process.env.CLOUDINARY_CLOUD_NAME||!process.env.CLOUDINARY_API_KEY||!process.env.CLOUDINARY_API_SECRET)return res.status(503).json({message:'Image storage is not configured'});
    const result=await uploadToCloudinary(req.file);
    res.status(201).json({url:result.secure_url});
  }catch(error){next(error)}
});

export default r;
