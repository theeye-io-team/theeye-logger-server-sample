const express = require('express')
const cors = require('cors')

const bodyParser = require('body-parser')
const got = require('got')
const fs = require('fs')

const main = () => {

  const api = new Api()
  api.start()

}

class Api {
  constructor () {
  }

  start () {
    const app = express()
    const dataStream = fs.createWriteStream('./data.log', {flags:'a'})

    app.use(cors())

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json())

    app.post('/*', function (req, res) {
      //console.log('Incomming ' + req.url)
      dataStream.write(JSON.stringify({
        url: req.url,
        headers: req.headers,
        body: req.body
      }) + '\n')

      res.status(200).json('ok')
    })

    app.get('/remote', function (req, res) {
      console.log(req.query)
      const payload = [
        { id: 'AbcA1234', label: 'A' },
        { id: 'AbcB1234', label: 'B' },
        { id: 'AbcC1234', label: 'C' },
        { id: 'AbcD1234', label: 'D' },
        { id: 'AbcE1234', label: 'E' },
      ]

      res.status(200).json(payload)
    })

    app.listen(8001, function () {
      console.log('listening on port 8001')
    })
  }
}

main ()
