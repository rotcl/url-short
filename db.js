const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync(__dirname + '/.data/db.json')
const db = low(adapter)

db.defaults({
    urls: []
  })
  .write()

const addUrl = async (url) => {
  return db.get('urls')
    .push(url)
    .write()
}

const find = async (id) => {
  return db.get('urls')
    .find({
      id: id
    })
    .value()
}

module.exports = {
  db,
  addUrl,
  find
}