const categoryService = require('../services/categoryService');
require('dotenv').config();

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories(req.conn);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const showCategories = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = process.env.PAGINATION_LIMIT;
    const {
      categories,
      totalPages,
      currentPage,
      totalCategories
    } = await categoryService.getAllCategories(page, limit);
    res.render('pages/categories', {
      categories,
      totalPages,
      currentPage,
      totalCategories,
      limit
    });
  } catch (error) {
    next(error);
  }
};
const showAddCategory = async (req, res, next) => {
  try {
    res.render('pages/addCategory', {
      category_name: '',
      error: '',
      edit: false
    });
  } catch (error) {
    res.render('pages/addCategory', {
      category_name: '',
      error: error.message,
      edit: false
    });
  }
};
const showEditCategory = async (req, res, next) => {
  try {
    const {id} = req.params;
    if(!id){
      req.flash('error', 'Category ID is Invalid');
      res.redirect('/categories');
    }
    // now fetch the category details 
    const response = await categoryService.getCategoryDetailsByID(id);
    if(!response){
      req.flash('error', 'Category Not Found');
      res.redirect('/categories');
    }
    res.render('pages/addCategory', {
      category: response,
      category_name: response.category_name,
      error: '',
      edit: true
    });
  } catch (error) {
    res.render('pages/addCategory', {
      category: [],
      category_name: '',
      error: error.message,
      edit: true
    });
  }
};

const handleAddCategory = async (req, res, next) => {
  try {
    const data = req.body;
    if(!data.category_name){
      throw new Error("Cateogry Name is Required");
    }
    const response = await categoryService.addCategory(data);
    if(!response){
      res.render('pages/addCategory', {
        category_name: '',
        error: 'Something went wrong',
        edit: false
      });
    }
    req.flash('success', 'Category Added Successfully');
    res.redirect('/categories');
  } catch (error) {
    res.render('pages/addCategory', {
      category_name: '',
      error: error.message,
      edit: false
    });
  }
};

const handleEditCategory = async (req, res, next) => {
  try {
    const {id} = req.params;
    if(!id){
      throw new Error("Cateogry ID is Invalid");
    }
    // first check if category is present in DB.
    const categoryDetails = await categoryService.getCategoryDetailsByID(id);
    if(!categoryDetails){
      req.flash('error', 'Category Not Found');
      res.redirect('/categories');
    }
    const response = await categoryService.updateCategory(id, req.body);
    if(!response){
      res.render('pages/addCategory', {
        category_name: categoryDetails.category_name,
        error: 'Something went wrong. Category Not updated',
        edit: true
      });
    }
    req.flash('success', 'Category Updated Successfully');
    res.redirect('/categories');
  } catch (error) {
    req.flash('error', error.message);
    res.render('pages/addCategory', {
      category_name: '',
      error: error.message,
      edit: false
    });
  }
};

const handleToggleStatus = async (req, res, next) => {
  try {
    const newStatus = Number(req.params.status);
    const id = req.params.id;
    if (![0, 1].includes(newStatus)) {
      throw new Error('Invalid status value');
    }
    if (!id) {
      throw new Error('Invalid category id');
    }
    const response = await categoryService.toggleStatus(req.params);
    if(!response){
      req.flash('error', 'Status Not Updated. Something went wrong');
    }
    req.flash('success', 'Status Updated Successfully');
    res.redirect('/categories');
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/categories');
  }
};

module.exports = { getAllCategories, showCategories, showAddCategory, handleAddCategory, handleToggleStatus, showEditCategory, handleEditCategory};