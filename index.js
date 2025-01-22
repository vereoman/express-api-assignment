const express = require('express');
const { resolve } = require('path');
const fs = require('fs');

const app = express();
const port = 3010;

let students = [];
try {
  const data = fs.readFileSync(resolve(__dirname, 'data.json'), 'utf-8');
  students = JSON.parse(data);
} catch (err) {
  console.error('Error reading data.json:', err);
}

app.use(express.json());

app.post('/students/above-threshold', (req, res) => {
  const { threshold } = req.body;

  if (typeof threshold !== 'number' || isNaN(threshold)) {
    return res.status(400).json({ error: 'Invalid threshold value' });
  }

  const filteredStudents = students.filter(student => student.total > threshold);

  res.json({
    count: filteredStudents.length,
    students: filteredStudents.map(student => ({
      name: student.name,
      total: student.total
    }))
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});