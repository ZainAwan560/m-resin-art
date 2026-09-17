import {Router} from 'express';import CustomOrder from '../models/CustomOrder.js';import {requireAdmin} from '../middleware/auth.js';
const r=Router();const statuses=['New','Reviewed','Quoted','Approved','Completed','Cancelled'];
r.post('/',async(req,res,next)=>{try{const {name,email,phone,productType,description,budget}=req.body;if(!name||!email||!phone||!productType||!description)return res.status(400).json({message:'Please complete all custom request fields'});res.status(201).json(await CustomOrder.create({name,email,phone,productType,description,budget:budget?Number(budget):undefined}))}catch(e){next(e)}});
r.get('/',requireAdmin,async(req,res,next)=>{try{res.json(await CustomOrder.find().sort({createdAt:-1}))}catch(e){next(e)}});
r.patch('/:id/status',requireAdmin,async(req,res,next)=>{try{if(!statuses.includes(req.body.status))return res.status(400).json({message:'Invalid custom order status'});const c=await CustomOrder.findByIdAndUpdate(req.params.id,{status:req.body.status},{new:true,runValidators:true});if(!c)return res.status(404).json({message:'Custom order not found'});res.json(c)}catch(e){next(e)}});
export default r;
