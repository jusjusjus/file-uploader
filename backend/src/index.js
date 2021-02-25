const cors = require('cors');
const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');

const dropzone = './uploads';
fs.mkdirSync(dropzone, { recursive: true });

const app = express()
const port = 3030

app.use(cors());

async function getUploadedFiles() {
  const files = fs.readdirSync(dropzone);
  return files.map((filename) => {
    const filepath = path.join(dropzone, filename);
    const stats = fs.statSync(filepath);
    const megabytes = stats.size / (1024 * 1024);
    return { filename, megabytes };
  });
}

const upload = multer({ dest: dropzone });
app.post('/api/upload', upload.single('file'), (req, res) => {
  const msg = 'file created';
  res.status(201).send(msg);
});

app.get('/api/files', async (req, res) => {
  const files = await getUploadedFiles();
  console.log(files);
  res.status(200).send(files);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
