const fs = require('fs');
const path = require('path');

fs.readdir(
  path.join(__dirname, 'secret-folder'),
  {
    withFileTypes: true,
  },
  (err, files) => err 
    ? console.log(err.message) 
    : files.forEach(file => {
      if (file.isFile()) {
        const fileName = file.name.split('.');
        fs.stat(
          path.join(file.path, file.name),
          (err, stats) => err 
            ? console.log(err.message)
            : console.log(`${fileName[0]} - ${fileName[1]} - ${stats.size} bytes`)
        )
      }
    })    
)