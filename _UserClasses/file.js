import fs from 'fs';

export default class File {
  static #fsModule = fs;

  #name;
  #fullName;
  #content;
  #contentToConsole() {
    console.log(this.#content);
  }

  constructor(path, fileName) {
    this.#name = this.#checkString(fileName);
    this.#fullName = this.#checkString(path) + this.#name;
    this.#content = this.#readFileContent(this.#fullName);
  }

  get name() { return this.#name; }
  get fullName() { return this.#fullName; }
  get content() { return this.#content; }
  get contentToConsole() { return this.#contentToConsole; }

  #checkString(str) {
    if (!str 
      || typeof str !== 'string' 
      || str.length < 1
      )
      throw new Error(`Error: file name is empty or no correct: ${str}`);
    return str;
  }
  
  #readFileContent(file) {
    try { 
      let data = '';
      File.#fsModule
        .createReadStream(file, { encoding: 'utf-8' })
        .on('error', (error) => console.log('Error: ', error.message))
        .on('data', (chunk) => (data += chunk))
        .on('end', () => {
            this.#content = data;
            console.log(this.#content);
        }); 
    } catch (error) {
      console.error("An error occurred: ", error.message);
    }
  }
}