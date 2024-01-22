// for use write ("type": "module",) in package.json

import fs from 'fs';

export default class File {
  #name;
  #fullName;
  #content;

  constructor(path, fileName) {
    return (async () => {
      this.#name = this.#checkString(fileName);
      this.#fullName = this.#checkString(path) + this.#name;
      this.#content = await this.#getFileAsync(this.#fullName);
      return this;
    })();
  }

  get name() { return this.#name; }
  get fullName() { return this.#fullName; }
  get content() { return this.#content; }

  set content(value) { this.#content = value; }

  
  displayContent() {
    console.log(this.#content);  
  }  


  async #getFileAsync(pathName) {
    let content;
    try {
      content = await this.#readFileWithPromise(pathName);        
    } catch (error) {
      content = `Ошибка чтения файла: ${error.message}`;
    }
    return content;
  }

  #readFileWithPromise(filePath) {
    return new Promise((resolve, reject) => {
      let data = '';
      const readStream = fs.createReadStream(filePath, 'utf8')
      .on('error', (err) => { reject(err) })
      .on('data', (chunk) => { data += chunk; })
      .on('end', () => {resolve(data); });
    });
  }


  #checkString(str) {
    if (!str 
      || typeof str !== 'string' 
      || str.length < 1
      )
      throw new Error(`Error: file name is empty or no correct: ${str}`);
    return str;
  }  
}