"use strict"

import React from 'react'
import ReactDOM from 'react-dom'
import Firebase from 'firebase'
import * as helper from './helpers.js'
import * as dictionary from './dictionary'

let ref = new Firebase("https://clickbaiter.firebaseio.com/")

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      title: "",
      description: "",
      imageLink: "",
      siteName: "",
      shareLink: ""
    }
  }

  getImageLink(query) {
    helper.getImage(query).then(imageLink => {
      this.setState({
        imageLink: imageLink || this.state.imageLink
      })
    })
  }

  getBait(e) {
    e.preventDefault()
    this.setState({
      shareable: false,
      imageLink: ""
    })

    let title = helper.random(dictionary.titles).reduce((acc, n) => {
      if (typeof n == "string") {
        return acc + " " + n
      } else {
        var madLib = helper.getMadLib(n)
        this.getImageLink(madLib)
        return acc + " " + madLib
      }
    }, "")

    this.setState({
      title: title,
      description: helper.random(dictionary.descriptions),
      site_name: helper.random(dictionary.siteNames)
    }, () => {
      this.renderBait()
    })
  }

  renderBait() {
    let count = 0

    let timeout = setInterval(() => {
      if (this.state.imageLink.length < 10 && count < 100) {
        count ++
      } else if (this.state.imageLink.length > 10){
        clearInterval(timeout)
        let newKey = ref.child("articles").push({
          title: this.state.title,
          description: this.state.description,
          imageLink: this.state.imageLink,
          site_name: this.state.site_name
        }, () => {
          this.setState({
            shareLink: location.origin + "/article/" + newKey.key(),
            shareable: true
          })
        })
      } else {
        clearInterval(timeout)
      }
    }, 10)
  }

  shareBait(e) {
    e.preventDefault()
    FB.ui({
      method: 'share_open_graph',
      action_type: 'og.reads',
      action_properties: JSON.stringify({
        object: this.state.shareLink
      })
    }, function(response){});
  }

  getShareButton() {
    if (this.state.shareable) {
      return (
        <button onClick={(e) => this.shareBait(e)}>go fish</button>
      )
    }
  }

  render() {
    return (
      <form id="clickbait-generator">
        <button onClick={(e) => this.getBait(e)}>give me some bait</button>
        {this.getShareButton()}
      </form>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
