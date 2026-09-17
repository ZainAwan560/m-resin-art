import {Router} from 'express';import Product from '../models/Product.js';import {requireAdmin} from '../middleware/auth.js';
const r=Router();
r.get('/',async(req,res,next)=>{try{const q={};if(req.query.category)q.category=req.query.category;if(req.query.featured==='false')q.featured=false;if(req.query.available!=='false')q.available=true;res.json(await Product.find(q).sort({featured:-1,createdAt:-1}));}catch(e){next(e)}});
r.get('/:id',async(req,res,next)=>{try{const p=await Product.findById(req.params.id);if(!p)return res.status(404).json({message:'Product not found'});res.json(p)}catch(e){next(e)}});
r.post('/',requireAdmin,async(req,res,next)=>{try{const p=await Product.create(req.body);res.status(201).json(p)}catch(e){next(e)}});
r.put('/:id',requireAdmin,async(req,res,next)=>{try{const p=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});if(!p)return res.status(404).json({message:'Product not found'});res.json(p)}catch(e){next(e)}});
r.delete('/:id',requireAdmin,async(req,res,next)=>{try{await Product.findByIdAndDelete(req.params.id);res.json({ok:true})}catch(e){next(e)}});
export default r;
