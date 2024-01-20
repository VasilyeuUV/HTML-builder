import File from '../_UserClasses/file.js';
import pathModule from 'path';
import { fileURLToPath } from 'url';

const file = new File(
  pathModule.dirname(fileURLToPath(import.meta.url)), 
  '/text.txt'
  );
// file.contentToConsole();