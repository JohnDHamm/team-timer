'use strict';

const express = require('express');
const config = require('../knexfile').development
const knex = require('knex')(config)

const bodyParser = require('body-parser')

const port = process.env.PORT || 3000
const app = express()

app.set('port', port)

app.use(express.static('/'))
app.use(bodyParser.json())

app.get('/apiTest', (req, res) => {
	console.log("testing api call");
	res.json('hello sexy')
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
