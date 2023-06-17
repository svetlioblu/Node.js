const Photo = require('../models/Photo')

exports.create = (photoCreateData) => Photo.create(photoCreateData)