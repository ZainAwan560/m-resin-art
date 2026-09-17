import {Router} from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import {fileURLToPath} from 'url';
import {requireAdmin} from '../middleware/auth.js';

const r=Router();
const directory=path.join(path.dirname(fileURLToPath(import.meta.url)),'../../uploads');
fs.mkdirSync(directory,{recursive:true});
const storage=multer.diskStorage({destination:directory,filename:(req,file,cb)=>{const ext=path.extname(file.originalname).toLowerCase();cb(null,`${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`)}});
const upload=multer({storage,limits:{fileSize:5*1024*1024},fileFilter:(req,file,cb)=>{cb(null,/^image\/(jpeg|png|webp|gif)$/.test(file.mimetype))}});

r.post('/',requireAdmin,upload.single('image'),(req,res)=>{
  if(!req.file)return res.status(400).json({message:'Please select a JPG, PNG, WEBP or GIF image'});
  res.status(201).json({url:`${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`});
});

export default r;
