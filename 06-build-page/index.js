const fs = require('fs');
const path = require('path');
const folder = require('../04-copy-directory/index.js');
const style = require('../05-merge-styles/index.js');

function readFile(filePath) {
  return new Promise((resolve) => {
    let data = '';
    const readStream = fs
      .createReadStream(filePath, 'utf8')
      .on('error', (err) => console.log(err.message))
      .on('data', (chunk) => {
        data += chunk;
      })
      .on('end', () => {
        resolve(data);
      });
  });
}

async function getFileAsync(pathName) {
  try {
    return await readFile(pathName);
  } catch (error) {
    console.log(error.message);
  }
}

async function createHtml(from, componentsPath, to) {
  let html = await getFileAsync(from);
  fs.readdir(componentsPath, { withFileTypes: true }, (err, files) =>
    err
      ? console.log(err.message)
      : files.forEach(async (file) => {
          if (file.isFile()) {
            const fileName = file.name.split('.');
            if (fileName[1] === 'html') {
              let component = '';
              fs.createReadStream(path.join(file.path, file.name))
                .on('data', (chunk) => (component += chunk))
                .on('end', () => {
                  html = html.replaceAll(
                    `{{${fileName[0]}}}`,
                    `\n${component}\n`,
                  );
                  fs.createWriteStream(to).write(html);
                });
            }
          }
        }),
  );
}

function initPage(folderName) {
  fs.rm(
    folderName,
    {
      recursive: true,
      force: true,
    },
    (err) => {
      if (err) throw err;
      fs.mkdir(folderName, (err) => {
        if (err) throw err;
        createHtml(
          path.join(__dirname, 'template.html'),
          path.join(__dirname, 'components'),
          path.join(folderName, 'index.html'),
        );
        style.bundleStyles(
          path.join(__dirname, 'styles'),
          path.join(folderName, 'style.css'),
        );
        folder.copyFolder(
          path.join(__dirname, 'assets'),
          path.join(folderName, 'assets'),
        );
      });
    },
  );
}

initPage(path.join(__dirname, 'project-dist'));
