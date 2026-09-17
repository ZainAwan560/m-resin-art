import jwt from 'jsonwebtoken';
export function requireAdmin(req,res,next){
  try{const token=req.cookies?.admin_token;if(!token)return res.status(401).json({message:'Authentication required'});const p=jwt.verify(token,process.env.JWT_SECRET);if(p.role!=='admin')return res.status(403).json({message:'Forbidden'});req.admin=p;next();}catch{res.status(401).json({message:'Invalid or expired session'});}
}
