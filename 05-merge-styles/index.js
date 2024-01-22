const fs = require('fs');
const path = require('path');

function bundleStyles(from, to) {
  fs.rm(to, { force: true }, () => {});
  fs.readdir(from, { withFileTypes: true }, (err, files) =>
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
                  fs.createWriteStream(to, { flags: 'a' })
                    .write(`\n${str}`),
                );
            }
          }
        }),
  );
}

bundleStyles(
  path.join(__dirname, 'styles'),
  path.join(__dirname, 'project-dist', 'bundle.css')
);

module.exports = {
  bundleStyles: function(from, to) {return bundleStyles(from, to) }
}
