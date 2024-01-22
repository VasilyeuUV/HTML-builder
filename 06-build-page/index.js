const fs = require('fs');
const path = require('path');
const folder = require('../04-copy-directory/index.js');
const style = require('../05-merge-styles/index.js');



// function bundleStyles(from, to) {
//   fs.rm(to, { force: true }, () => {});
//   fs.readdir(from, { withFileTypes: true }, (err, files) =>
//     err
//       ? console.log(err.message)
//       : files.forEach((file) => {
//           if (file.isFile()) {
//             const fileName = file.name.split('.');
//             if (fileName[1] === 'css') {
//               let str = '';
//               fs.createReadStream(path.join(file.path, file.name))
//                 .on('data', (chunk) => (str += chunk))
//                 .on('end', () =>
//                   fs.createWriteStream(to, { flags: 'a' })
//                     .write(`\n${str}`),
//                 );
//             }
//           }
//         }),
//   );
// }








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


        style.bundleStyles(
          path.join(__dirname, 'styles'),
          path.join(folderName, 'style.css')
          );
        folder.copyFolder(
          path.join(__dirname, 'assets'),
          path.join(folderName, 'assets'),
        );          
      });
    },
  );
}

initPage( path.join(__dirname, 'project-dist'));