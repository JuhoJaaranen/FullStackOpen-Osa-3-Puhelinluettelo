const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://juhojaaranen:${password}@puhelinluettelo.jdhi8.mongodb.net/?retryWrites=true&w=majority&appName=puhelinluettelo`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number
})

if (process.argv.length<4) {
  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(person)
        mongoose.connection.close()
      })
    })
} else if (process.argv.length<6)
  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)

    mongoose.connection.close()
  })