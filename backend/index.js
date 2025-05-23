const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const adminRoutes = require('./routes/admin');
const questionRoutes = require('./routes/question');
const quizRoutes = require('./routes/quiz');

const app = express();
const PORT = 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', adminRoutes);
app.use('/api', questionRoutes);
app.use('/api', quizRoutes);

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});