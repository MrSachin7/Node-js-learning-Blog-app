const express = require('express');
const blogController = require('../controllers/blogController')
const {blog_details} = require("../controllers/blogController");
const router = express.Router();

router.get('/', blogController.blog_index);


router.post('/',blogController.blog_create_post);

router.get('/:id', blogController.blog_details);


router.delete('/:id', blogController.blog_delete);

router.get('/new/create',blogController.blog_create_get);

module.exports = router;
