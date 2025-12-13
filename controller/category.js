const Category = require("../models/category.model");

exports.createCategory = async (req,res,next)=>{
 try {
   const cat = await Category.create(req.body.name);
   res.json(cat);
 } catch(e){ next(e); }
};

exports.getCategories = async (req,res,next)=>{
 try {
   res.json(await Category.getAll());
 } catch(e){ next(e); }
};

exports.getCategory = async (req,res,next)=>{
 try {
   res.json(await Category.getById(req.params.id));
 } catch(e){ next(e); }
};

exports.updateCategory = async (req,res,next)=>{
 try {
   res.json(await Category.update(req.params.id, req.body.name));
 } catch(e){ next(e); }
};

exports.deleteCategory = async (req,res,next)=>{
 try {
   await Category.remove(req.params.id);
   res.json({success:true});
 } catch(e){ next(e); }
};
