const fs = require('fs');
const path = require('path');
const { generateFile } = require('./generateFile');

const filesPath = path.join(__dirname, '/sample')
const outputName = 'output'

const getFiles = (currentPath) => {
  fs.readdirSync(currentPath).forEach((file) => {
    const subpath = currentPath + '/' + file;
    if (fs.lstatSync(subpath).isDirectory()) {
      getFiles(subpath);
    } else {
      fs.readFile(currentPath + '/' + file, 'utf-8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const newFile = generateFile(data);
        const directories = currentPath.split('/');
        const lastDirectory = directories[directories.length - 1];
        const outputPath = currentPath.substr(0, currentPath.indexOf('sample'));
        const subfolderPath = currentPath.replace('sample', outputName);
        const actualPath = lastDirectory === 'sample' 
          ? path.join(outputPath, outputName) : subfolderPath;
        try {
          if (!fs.existsSync(actualPath)) {
            fs.mkdirSync(actualPath)
          }
        } catch (err) {
          console.error(err)
        }
        fs.writeFile(path.join(actualPath, file), newFile, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(`File ${file} created!`)
        })
      })
    }
  })
}

getFiles(filesPath)