import File from '../_UserClasses/file.js';
import pathModule from 'path';
import { fileURLToPath } from 'url';

const file = await new File(
  pathModule.dirname(fileURLToPath(import.meta.url)) + '\\',
  'text.txt'
  );
file.displayContent();
console.log(file.content);