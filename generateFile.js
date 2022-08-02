const fs = require('fs');
const path = require('path');

const getKeys = () => {
  let keys = [];
  try {
    const content = fs.readFileSync(path.join(__dirname, 'keys.txt'), 'utf8');
    const contentSplitted = content.split(/\r?\n/).filter(element => element);
    contentSplitted.forEach(k => {
      const [key, replace] = k.split(" | ")
      keys.push({ name: key, replace })
    })
    return keys;
  } catch (err) {
    console.log(err);
    return;
  }
};

const generateReplacedFile = (data) => {
  let newData = data;
  const keys = getKeys();

  keys.forEach(key => {
    newData = newData.replaceAll(key.name, key.replace)
  })
  return newData;
}

module.exports = { generateReplacedFile }