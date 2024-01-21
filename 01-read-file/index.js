import File from '../_UserClasses/file.js';
import pathModule from 'path';
import { fileURLToPath } from 'url';

// РЕАЛИЗАЦИЯ В ФАЙЛЕ _UserClasses/file.js метод #readFileWithPromise()

const file = await new File(
  pathModule.dirname(fileURLToPath(import.meta.url)) + '\\',
  'text.txt'
  );
file.displayContent();