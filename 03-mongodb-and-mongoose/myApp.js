require('dotenv').config();
const envs = process.env;
const mongoose = require('mongoose');
mongoose.connect(envs.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = {
    name: {
        type: String,
        required: true
    },
    age: Number,
    favoriteFoods: [String]
}

const Person = mongoose.model('Person', personSchema);
const supermario = new Person({ name: 'Super Mario', age: 40, favoriteFoods: ['Spaghetti'] });
const luigi = new Person({ name: 'Luigi', age: 24, favoriteFoods: ['Spaghetti'] });
const arrayOfPeople = [supermario, luigi];

const createAndSavePerson = (done) => {
    supermario.save((err, data) => err ? done(err) : done(null, data));
};

const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, data) => err ? done(err) : done(null, data));
};

const findPeopleByName = (personName, done) => {
    done(null /*, data*/);
};

const findOneByFood = (food, done) => {
    done(null /*, data*/);
};

const findPersonById = (personId, done) => {
    done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";

    done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
    const ageToSet = 20;

    done(null /*, data*/);
};

const removeById = (personId, done) => {
    done(null /*, data*/);
};

const removeManyPeople = (done) => {
    const nameToRemove = "Mary";

    done(null /*, data*/);
};

const queryChain = (done) => {
    const foodToSearch = "burrito";

    done(null /*, data*/);
};

/** **Well Done !!**
 /* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
