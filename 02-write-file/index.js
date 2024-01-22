const { stdin, stdout } = process;

stdout.write('Enter text:\n');
stdin.on('data', (data) => {
  if (data.toString().trim().toLowerCase() === 'exit') 
    process.exit();
  saveToFile(data);
});
process
  .on('SIGINT', () => process.exit())     // Ctrl + 'C'
  .on('exit', () => {
    console.log('Text entry completed.');
    });

function saveToFile(text) {
  const fs = require('fs');
  const path = require('path');

  fs.createWriteStream(
    path.join(__dirname, 'text.txt'),
    {
      flags: 'a',
    }
    )
    .write(`${text}`);
}