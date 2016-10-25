'use strict';

const express = require('express');

const port = process.env.PORT || 3000
const app = express()

app.set('port', port)

app.use(express.static('/'))

app.get('/apiTest', (req, res) => {
	console.log("testing api call");
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
