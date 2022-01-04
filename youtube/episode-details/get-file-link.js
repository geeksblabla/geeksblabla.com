const path = require("path")
const getFileLink = (file) => {
  const folder = path.parse(file).dir.replace(/^.*[\\\/]/, "")
  console.log(folder)
  return `\n\nYou can update this description 👉 : https://github.com/DevC-Casa/geeksblabla.com/tree/master/blablas/${folder}/index.md\n\n\n\n
  #darija #geeksblabla #morocco #dev #podcast`
}

module.exports = getFileLink
