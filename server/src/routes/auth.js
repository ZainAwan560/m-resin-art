import {Router} from 'express';import bcrypt from 'bcryptjs';import jwt from 'jsonwebtoken';import rateLimit from 'express-rate-limit';import Admin from '../models/Admin.js';
const r=Router();
const limiter=rateLimit({windowMs:15*60*1000,max:8,standardHeaders:true,legacyHeaders:false,message:{message:'Too many login attempts. Try again later.'}});
const cookieSecure=process.env.VERCEL==='1'||process.env.COOKIE_SECURE==='true';
const cookieOptions={httpOnly:true,sameSite:cookieSecure?'none':'lax',secure:cookieSecure,path:'/',domain:process.env.COOKIE_DOMAIN||undefined,maxAge:8*60*60*1000};
r.post('/login',limiter,async(req,res,next)=>{try{const {email,password}=req.body;const a=await Admin.findOne({email:email?.toLowerCase()});if(!a||!(await bcrypt.compare(password||'',a.passwordHash)))return res.status(401).json({message:'Invalid credentials'});a.lastLoginAt=new Date();await a.save();const token=jwt.sign({sub:a._id.toString(),role:a.role,email:a.email},process.env.JWT_SECRET,{expiresIn:'8h'});res.cookie('admin_token',token,cookieOptions);res.json({admin:{email:a.email,role:a.role}});}catch(e){next(e)}});
r.post('/logout',(req,res)=>{res.clearCookie('admin_token',{path:'/',domain:process.env.COOKIE_DOMAIN||undefined});res.json({ok:true})});
r.get('/me',async(req,res)=>{if(!req.cookies?.admin_token)return res.status(401).json({authenticated:false});try{const p=jwt.verify(req.cookies.admin_token,process.env.JWT_SECRET);res.json({authenticated:true,admin:p});}catch{res.status(401).json({authenticated:false})}});
export default r;
