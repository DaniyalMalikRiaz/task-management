const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const User = require('../models/user');
const { json } = require('body-parser');
const AuthMiddleware = require('../middleware/auth')

router.get('/getAll',AuthMiddleware(['Admin']),async(req,res)=>{
    try {
        const task = await Task.find().populate('userId', 'name email role')
        .exec();
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch task' });
    }
    })

    module.exports = router;