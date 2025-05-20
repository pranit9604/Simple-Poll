const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const quizRoutes = require('./routes/quiz');

const app = express();
const PORT = 5000;

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use('/', quizRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});