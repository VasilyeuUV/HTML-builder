import File from '../_UserClasses/file.js';
import pathModule from 'path';
import { fileURLToPath } from 'url';

const path = pathModule.dirname(fileURLToPath(import.meta.url));
const file = new File(path, '/text.txt');
// file.contentToConsole();