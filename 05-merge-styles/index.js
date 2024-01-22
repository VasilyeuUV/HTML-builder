const fs = require('fs');
const path = require('path');

const bundle = path.join(__dirname, 'project-dist', 'bundle.css');
const stylesFolder = path.join(__dirname, 'styles');

fs.rm(bundle, { force: true }, () => {});
fs.readdir(stylesFolder, { withFileTypes: true }, (err, files) =>
  err
    ? console.log(err.message)
    : files.forEach((file) => {
        if (file.isFile()) {
          const fileName = file.name.split('.');
          if (fileName[1] === 'css') {
            let str = '';
            fs.createReadStream(path.join(file.path, file.name))
              .on('data', (chunk) => (str += chunk))
              .on('end', () =>
                fs.createWriteStream(bundle, { flags: 'a' })
                  .write(`\n${str}`),
              );
          }
        }
      }),
);
