console.log('loading index.js ..');

function post(url, files) {
  const form = new FormData();
  console.log({ files });
  form.append('file', files[0]);
  return fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    body: form
  });
}

const form = document.getElementById('form');
form.onsubmit = async (event) => {
  event.preventDefault();
  const { files } = event.srcElement[0];
  await post("/api/upload", files);
  updateFileList();
};

async function getUploadedFiles() {
  const response = await fetch("/api/files");
  return response.json();
}

async function updateFileList() {
  const fileList = document.getElementById('file-list');
  if (!fileList) {
    return;
  }
  const files = await getUploadedFiles();
  const ul = document.createElement('ul');
  for (const { filename, megabytes } of files) {
    const li = document.createElement('li');
    li.innerHTML = `${filename} (${megabytes} MB)`;
    ul.append(li);
  }
  if (fileList.hasChildNodes()) {
    fileList.removeChild(fileList.firstChild);
  }
  fileList.append(ul);
}

setTimeout(updateFileList, 100);
