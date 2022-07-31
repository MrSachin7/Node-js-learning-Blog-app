// blog_index, blog_details, blog_create_get, blog_create_post blog_delete
const Blog = require("../models/blog");

const blog_index = (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((result) => {
            res.render('blogs/index', {title: 'All blogs', blogs: result});
        })
        .catch((error) => {
            console.log(error);
        });
}
const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id).then(result => {
        res.render('blogs/details', {title: 'Blog details', blog: result});
    }).catch(err => {
        res.render('404', {title : "Blog not found"})
    });
}
const blog_create_get = (req, res) => {
    res.render('blogs/create', {title: 'Create new blog'});

}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save().then((result) => {
        res.redirect('/blogs');
    }).catch(error => {
        console.log(error);
    });
}
const blog_delete = (req, res) =>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({
                redirect : '/blogs'
            });
        }).catch(err => console.log(err));
}

module.exports = {
    blog_index, blog_details, blog_create_get,
    blog_create_post, blog_delete
}