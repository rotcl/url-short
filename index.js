const express = require('express')
const bodyParser = require('body-parser')
const Joi = require('joi')
const ShortUniqueId = require('short-unique-id')
const uuid = new ShortUniqueId()
const app = express()
const {
  db,
  addUrl,
  find
} = require('./db')

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', (req, res) => {
  return res.sendFile(__dirname + '/view/index.html')
})

app.get('/:id', async (req, res) => {
  const id = req.params.id
  const url = await find(id)
  if (url) {
    return res.redirect(url.url)
  }
  return res.redirect('/')
})

app.post('/new', async (req, res) => {
  const value = Joi.validate(req.body, {
    url: Joi.string().uri()
  })
  if (value.error) {
    return res.sendStatus(500).send({
      error: 'Invalid URL'
    })
  }
  const newUrl = {
    url: value.value.url,
    id: uuid.randomUUID(5),
    created: new Date()
  }
  addUrl(newUrl)
    .then(() => {
      return res.send(newUrl)
    })
    .catch(err => {
      return res.sendStatus(500)
    })
})

const listener = app.listen(process.env.PORT || 3456, () => {
  console.log('App listening on port ' + listener.address().port);
})