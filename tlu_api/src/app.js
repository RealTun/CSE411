const express = require('express');

const apiRoutes = require('./routes/api.routes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

module.exports = app;