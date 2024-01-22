const fs = require('fs');
const path = require('path');

function copyCurrentFolder(folderFrom, folderTo) {
  fs.readdir(folderFrom, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      if (file.isDirectory()) {
        copyEntireFolder(
          path.join(file.path, file.name),
          path.join(folderTo, file.name),
        );
      } else {
        fs.copyFile(
          path.join(file.path, file.name),
          path.join(folderTo, file.name),
          (err) => {
            if (err) throw err;
          },
        );
      }
    });
  });
}

function createFolderToCopy(folderFrom, folderTo) {
  fs.mkdir(folderTo, (err) => {
    if (err) throw err;
    copyCurrentFolder(folderFrom, folderTo);
  });
}

function copyDir(folderFrom, folderTo) {
  fs.rm(
    folderTo,
    {
      recursive: true,
      force: true,
    },
    (err) => {
      if (err) throw err;
      createFolderToCopy(folderFrom, folderTo);
    },
  );
}

copyDir(
  path.join(__dirname, 'files'), 
  path.join(__dirname, 'files-copy')
  );
