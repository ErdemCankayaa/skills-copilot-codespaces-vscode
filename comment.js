// Create web server 

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comment = require('./models/comment');
const app = express();
const port = 3000;

// Connect to database

mongoose.connect('mongodb://localhost:27017/comment', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a new comment
app.post('/comment', (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment
    });
    comment.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send('Internal server error');
        });
});

// Get all comments

app.get('/comment', (req, res) => {
    Comment.find()
        .then(comment => {
            res.send(comment);
        })
        .catch(err => {
            res.status(500).send('Internal server error');
        });
}
);

// Get a comment by id

app.get('/comment/:id', (req, res) => {
    Comment.findById(req.params.id)
        .then(comment => {
            res.send(comment);
        })
        .catch(err => {
            res.status(500).send('Internal server error');
        });
}
);

// Update a comment by id

app.put('/comment/:id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment
    })
        .then(comment => {
            res.send(comment);
        })
        .catch(err => {
            res.status(500).send('Internal server error');
        });
}
);

// Delete a comment by id

app.delete('/comment/:id', (req, res) => {
    Comment.findByIdAndDelete(req.params.id)
        .then(comment => {
            res.send(comment);
        })
        .catch(err => {
            res.status(500).send('Internal server error');
        });
}
);

// Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

