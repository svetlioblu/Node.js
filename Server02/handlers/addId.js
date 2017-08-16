module.exports = (db) => {
  for (let i = 0; i < db.length; i++) {
    db[i].id = `34${i}`
  }
  return db
}
