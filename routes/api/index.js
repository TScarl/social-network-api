const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/User', userRoutes);
router.use('/Thought', ThoughtRoutes);

module.exports = router;
