// Create web server

// Import module
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Use static file
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Import route
const commentRoute = require('./routes/comment.route');

// Use route
app.use('/', commentRoute);

// Listen port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});




