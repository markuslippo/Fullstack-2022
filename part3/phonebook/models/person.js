const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to ', url)

mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB: ', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String, 
        minLength: [8, 'Phone number must have more than 8 numbers'],
        required: true, 
        validate: {
            validator: (value) => {
                if(value.split('-').length > 2)
                    return false
                else if (value.split('-')[0].length > 3 || value.split('-')[0].length < 2)
                    return false
                else 
                    return true
            }, 
            message: 'Invalid number!'
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)