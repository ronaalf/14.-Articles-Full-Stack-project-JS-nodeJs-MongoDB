const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');
require('dotenv/config');


    //Add css file or any file with that route.
app.use(express.static(__dirname + '/views'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false}));

app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc'});
    res.render('articles/index', { articles: articles });
});

app.use('/articles', articleRouter);

mongoose.connect(process.env.DB_CONNECTION, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true 
}, 
() => console.log('Connected successfully to DB!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running at port ${PORT}!`));