
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const article = require('../models/article');

const db = "mongodb://bloguser:bloguser2019@ds055564.mlab.com:55564/blogapp";

mongoose.Promise = global.Promise;
mongoose.connect(db, function (err) {
    if (err) {
        console.log('Error connecting');
    }
});

router.get('/all', function (req, res) {
    article.find({})
        .exec(function (err, articles) {
            if (err) {
                console.log('Error getting the articles')
            } else {
                console.log(articles);
                res.json(articles);
            }
        })
});

router.get('/articles/:id', function (req, res) {
    console.log('Requesting a specific article');
    article.findById(req.params.id)
        .exec(function (err, article) {
            if (err) {
                console.log('Error getting the article')
            } else {
                console.log(article);
                res.json(article);
            }
        })
});

router.post('/create', function (req, res) {
    console.log('Creating an article');
    var newArticle = new article();
    newArticle.title = req.body.title;
    newArticle.content = req.body.content;

    newArticle.save(function (err, article) {
        if (err) {
            console.log('Error inserting the article');
        } else {
            res.json(article)
        }
    })
});

router.post('/update/:id', function (req, res) {
    console.log('Updating an article');

    article.findById(req.params.id)
        .exec(function (err, article) {
            if (err) {
                console.log('Could not find the article');
            } else {
                article.title = req.body.title;
                article.content = req.body.content;
                article.save();

                res.json(article)
            }
        })
});

router.get('/delete/:id', function (req, res) {
    console.log('Deleting an article');
    article.findByIdAndRemove(req.params.id)
        .exec(function (err, article) {
            if (err) {
                console.log('Error deleting the article')
            } else {
                res.json(article)
            }
        })
});

module.exports = router;
