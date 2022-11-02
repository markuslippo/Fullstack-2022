const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://markus:${password}@cluster0.iva59d2.mongodb.net/personApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
    .connect(url)
    .then(() => {
        console.log('connected')

        if(name === undefined) {
            console.log('phonebook:')
            Person.find({}).then(people => {
                people.forEach(p => {
                    console.log(`${p.name} ${p.number}`)
                })
                mongoose.connection.close()
            })
      
        } else {
            const person = new Person({
                name: name,
                number: number
            })
            console.log(`${person} saved!`)
            person.save().then(() => mongoose.connection.close())
        }
    })
    .catch((err) => console.log(err))