const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoute = require('./routes/blogRoutes');
// connect to mongoDB
const dbURI = 'mongodb+srv://sachin12:test1234@node-learning.vme5f.mongodb.net/node-learning?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log('Connected to Database');
        const server = app.listen(3000);
    })
    .catch((err) => console.log(err));
// register view engine
app.set('view engine', 'ejs');

// middleware & static files

app.use(express.static('public'));  // This gives access to files in the public folder
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'About my new Blog',
        body: 'More about my new blog'
    });
    blog.save().then((result) => {
        res.send(result);
    }).catch((error) => {
        console.log(error);
    });
})

// GET reqs
app.get('/', (req, res) => {
    res.redirect('/blogs/');
});


app.get('/about', (req, res) => {
    res.render('about.ejs', {title: 'About'})
});

// All the blog routing...
app.use('/blogs',blogRoute);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});

});

