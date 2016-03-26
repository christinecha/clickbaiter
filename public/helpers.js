"use strict"

export const random = (arr) => {
  return arr[Math.round(Math.random() * (arr.length - 1))]
}

export const getMadLib = (choices) => {
  var madLib = random(choices)
  return madLib
}

export const getImage = (query) => {
  console.log("called getImage:", query)
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest()

    req.onreadystatechange = () => {
      if (req.readyState == 4 && req.status == 200) {
        var results = JSON.parse(req.response)
        var photo = random(results.photos.photo)
        console.log("got image")
        var imageURL = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg"
        resolve(imageURL)
      }
    }

    req.open("GET", "https://api.flickr.com/services/rest/?api_key=a41cd321041173cb1fbbc60866bb8fbc&method=flickr.photos.search&format=json&nojsoncallback=1&sort=relevance&per_page=2&text=" + query, true)
    req.send()
  })
}

export const getParamObj = (url) => {
  let params = url.split('?')[1]
  let paramObj = {}

  if (params) {
    params = params.split('&')

    params.forEach(function(string) {
      var key = string.split('=')[0]
      var value = string.split('=')[1]
      paramObj[key] = value
    })

    return paramObj
  }

  return null
}
