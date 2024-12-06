const express = require('express');
const router = express.Router();
const Task = require('../models/task');




router.post('/create-task', async(req,res) =>{

try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json({ message: 'Task created successfully!', 
    details: task });
} catch (error) {
    res.status(500).json({ error: error.message });
    res.status(500).json({ error: 'Failed to create task' });
}
})

router.get('/get-task',async(req,res)=>{
try {
    
    const { status} = req.query;
    const filter = {};
    if (status) filter.status = { $regex: status, $options: 'i' };

    const tasks = await Task.find(filter);
    res.json(tasks);
} catch (error) {
    console.error(error);
        res.status(500).json({ error: 'Failed to fetch task' });
}
})

router.get('/get-task/:id',async(req,res)=>{
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch task' });
    }
    })


router.put('/update-task/:id', async(req,res)=>{
    try {
        const {title, description, status, dueDate, priority} = req.body;
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, status, dueDate, priority },
            { new: true, runValidators: true } 
        );
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.status(201).json({ message: 'Task updated successfully!', 
        details: task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    res.status(500).json({ error: 'Failed to create task' });
    }
})



router.delete('/delete-task/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(201).json({ message: 'Task deleted successfully!',});
  } catch (error) {
    res.status(500).json({ error: error.message });
    res.status(500).json({ error: 'Failed to delete task' });
  }
    
  
});



    module.exports = router;