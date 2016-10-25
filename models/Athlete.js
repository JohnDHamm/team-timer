'use strict'

const config = require('../knexfile').development
const knex = require('knex')(config)
const bookshelf = require('bookshelf')(knex)

module.exports = bookshelf.Model.extend({
	tableName: 'Athletes'
})
