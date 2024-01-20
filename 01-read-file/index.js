class File {
  static #fsModule = require('fs');
  static #pathModule = require('path');

  #name;
  #fullName;
  #content;
  #contentToConsole() {
    console.log(this.#content);
  }

  constructor(fileName) {
    this.#name = this.#setFileName(fileName);
    this.#fullName = File.#pathModule.join(__dirname, this.#name);
    this.#content = this.#readFileContent(this.#fullName);
  }

  get name() { return this.#name; }
  get fullName() { return this.#fullName; }
  get content() { return this.#content; }
  get contentToConsole() { return this.#contentToConsole; }

  #setFileName(fileName) {
    if (!fileName 
      || typeof fileName !== 'string' 
      || fileName.length < 1
      )
      throw new Error(`Error: file name is empty or no correct: ${fileName}`);
    return fileName;
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

const file = new File('text.txt');
// file.contentToConsole();


