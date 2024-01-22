const fs = require('fs');
const path = require('path');

fs.createReadStream(
  path.join(__dirname, 'text.txt'), 
  'utf-8'
  )
  .on('data', (chunk) => console.log(chunk))



/* with use user class

import File from '../_UserClasses/file.js';
import pathModule from 'path';
import { fileURLToPath } from 'url';

// РЕАЛИЗАЦИЯ В ФАЙЛЕ _UserClasses/file.js метод #readFileWithPromise()

const file = await new File(
  pathModule.dirname(fileURLToPath(import.meta.url)) + '\\',
  'text.txt'
  );
file.displayContent();

*/