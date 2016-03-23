"use strict"

let express = require('express'),
    fs = require('fs'),
    app = express()

app.get('/', (req, res) => {
  fs.readFile(__dirname + "/template.html", 'utf-8', (err, data) => {
    var html = data
    var findVariable = /{{(.*)}}/g
    var match = findVariable.exec(html)

    var foo = "adfadfad"
    var bar = "booooo"

    while (match) {
      var replValue = new RegExp ("{{" + match[1] + "}}")
      html = html.replace(replValue, eval(match[1]))
      match = findVariable.exec(html)
    }

    res.send(html)
  })

})

app.listen('3000', () => {
  console.log('listening')
})
