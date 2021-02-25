const fs = require('fs');
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './uploads' });

fs.mkdirSync('./uploads', { recursive: true });

const app = express()
const port = 3030

app.post('/api/upload', upload.single('file'), (req, res) => {
  const msg = 'file created';
  console.log({ req });
  res.status(201).send(msg);
});

app.get('/', (req, res) => {
  res.status(200).send('hello express!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
