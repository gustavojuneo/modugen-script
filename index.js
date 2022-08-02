const fs = require('fs');
const path = require('path');
const { generateReplacedFile } = require('./generateFile');

const filesPath = path.join(__dirname, '/sample')
const outputName = 'output'

const generateModule = (currentPath = filesPath) => {
  fs.readdirSync(currentPath).forEach((file) => {
    const subpath = currentPath + '/' + file;
    if (fs.lstatSync(subpath).isDirectory()) {
      generateModule(subpath);
    } else {
      fs.readFile(currentPath + '/' + file, 'utf-8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const newFile = generateReplacedFile(data);
        const directories = currentPath.split('/');
        const lastDirectory = directories[directories.length - 1];
        const outputPath = lastDirectory === 'sample' 
          ? path.join(currentPath.substring(0, currentPath.indexOf('sample')), outputName) 
          : currentPath.replace('sample', outputName);
        try {
          if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath)
          }
        } catch (err) {
          console.error(err)
        }
        fs.writeFile(path.join(outputPath, file), newFile, (err) => {
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

generateModule()