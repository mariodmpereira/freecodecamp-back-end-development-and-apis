const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;
const { Schema } = mongoose
const bodyParser = require('body-parser');
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

main().catch(err => console.log(err))

async function main() {
    await mongoose.connect(process.env.DB_URI)
}

const userSchema = new Schema({
    username: { type: String, require: true, unique: true },
    exercises: [{
        description: String,
        duration: Number,
        date: Date
    }]
}, { versionKey: false })

const User = mongoose.model('User', userSchema)

app.get('/api/users', (req, res) => {
    User.find({}, (err, data) =>
        err ? console.log(err) : res.json(data)
    )
})

app.post('/api/users', (req, res) => {
    const username = req.body.username;
    User.create({ username: username }, (err, data) =>
        err ? console.log(err) : res.json({ _id: data._id, username: data.username })
    )
})

app.post('/api/users/:id/exercises', (req, res) => { // description, duration, date
    const id = req.params.id;
    let { description, duration, date } = req.body;
    date = date === undefined ? new Date().toDateString() : new Date(date).toDateString();

    const exerciseToAdd = {
        description: description,
        duration: duration,
        date: date
    };

    User.findOne({ _id: new ObjectId(id) }, (err, data) => {
            data.exercises.push(exerciseToAdd);
            data.save((err, data) => {
                const response = {
                    username: data.username,
                    description: description,
                    duration: duration,
                    date: date,
                    _id: id
                };

                err ? console.log(err) : res.json(response)
            })
        }
    )
})

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})
