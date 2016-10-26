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


// APIs

app.get('/api/getTeams', (req, res) => {
	knex('Teams')
		.select('*')
		.then((data) => {
			res.json(data)
		})
})

app.post('/api/addTeam', (req, res) => {
	knex('Teams')
		.insert(req.body)
		.then((data) => {
			res.json(data) //returns new id#
		})
})

app.get('/api/getCoaches/:team_id', (req, res) => {
	let team_id = req.params.team_id
	knex('Coaches')
		.select('*')
		.where('team_id', team_id)
		.then((data) => {
			res.json(data)
		})
})

app.post('/api/addCoach', (req, res) => {
	knex('Coaches')
		.insert(req.body)
		.then((data) => {
			res.json(data) //returns new id#
		})
})

app.get('/api/getGroups/:team_id', (req, res) => {
	let team_id = req.params.team_id
	knex('Groups')
		.select('*')
		.where('team_id', team_id)
		.then((data) => {
			res.json(data)
		})
})

app.post('/api/addGroup', (req, res) => {
	knex('Groups')
		.insert(req.body)
		.then((data) => {
			res.json(data)
		})
})

app.post('/api/addAthlete', (req, res) => {
	knex('Athletes')
		.insert(req.body)
		.then((data) => {
			res.json(data)
		})
})

// app.get('/api/getAthletes/Team/:team_id', (req, res) => {
// 	let team_id = req.params.team_id
// 	knex('Athletes')
// 		.join('Groups', 'Teams.id', team_id)
// 		.select('*')
// 		.where('Groups.team_id', team_id)
// 		.then((data) => {
// 			res.json(data)
// 		})
// })

app.get('/api/getAthletes/Group/:group_id', (req, res) => {
	let group_id = req.params.group_id
	knex('Athletes')
		.select('*')
		.where('group_id', group_id)
		.then((data) => {
			res.json(data)
		})
})

app.get('/api/getWorkout/:date', (req, res) => {
	let date = req.params.date
	knex('Workouts')
		.select('*')
		.where('date', date)
		.then((data) => {
			res.json(data)
		})
})

//need this? (from getWorkout api)
// app.get('/api/getAthlete/:athlete_id', (req, res) => {
// 	let athlete_id = req.params.athlete_id
// 	knex('Athletes')
// 		.join('Workouts', 'Athletes.id', 'Workouts.athlete_id')
// 		.select('*')
// 		.where('id', athlete_id)
// 		.then((data) => {
// 			res.json(data)
// 		})
// })

app.get('/api/workouts/getCoach/:coach_id', (req, res) => {
	let coach_id = req.params.coach_id
	knex('Workouts')
		.select('*')
		.where('coach_id', coach_id)
		.then((data) => {
			res.json(data)
		})
})

app.get('/api/workouts/getAthlete/:athlete_id', (req, res) => {
	let athlete_id = req.params.athlete_id
	knex('Workouts')
		.select('*')
		.where('athlete_id', athlete_id)
		.then((data) => {
			res.json(data)
		})
})

//need to limit by user's team
app.get('/api/workouts/Discipline/:discipline', (req, res) => {
	let discipline = req.params.discipline
	knex('Workouts')
		.select('*')
		.where('discipline', discipline)
		.then((data) => {
			res.json(data)
		})
})

app.post('/api/saveWorkout', (req, res) => {
	knex('Workouts')
		.insert(req.body)
		.then((data) => {
			res.json(data)
		})
})





app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
