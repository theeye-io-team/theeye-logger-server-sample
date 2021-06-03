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

    app.listen(8001, function () {
      console.log('listening on port 8001')
    })
  }
}

main ()
