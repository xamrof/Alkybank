// const path = require('path')
const fs = require('fs')

const deleteFile = async (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path)
  }
}

module.exports = deleteFile
