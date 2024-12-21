const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/taskRoutes');
const adminRoutes = require('./routes/admin');
app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => res.send('API is running...'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



