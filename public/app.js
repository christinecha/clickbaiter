"use strict"

import React from 'react'
import ReactDOM from 'react-dom'
import Firebase from 'firebase'
import * as helper from './helpers'
import * as dictionary from './dictionary'

let ref = new Firebase("https://clickbaiter.firebaseio.com/")

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      gotcha: false,
      title: "",
      description: "",
      imageLink: "",
      siteName: "",
      shareLink: ""
    }
  }

  componentWillMount() {
    let paramObj = helper.getParamObj(location.href)
    if (paramObj && paramObj.gotcha) {
      ref.child("articles").child(paramObj.id).once("value", (snapshot) => {
        if (snapshot.val()) {
          console.log(snapshot.val())
          this.setState({
            gotcha: paramObj.gotcha,
            title: snapshot.val().title,
            description: snapshot.val().description,
            imageLink: snapshot.val().imageLink,
            shareLink: location.origin + "/article/" + snapshot.key(),
            shareable: true
          })
        }
      })
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
    }, () => {
      let title = helper.random(dictionary.titles).reduce((acc, n) => {
        if (typeof n == "string") {
          return acc + " " + n
        } else {
          var madLib = helper.getMadLib(n)
          return acc + " " + madLib
        }
      }, "")

      this.getImageLink(helper.random(title.split(" ")))

      this.setState({
        title: title,
        description: helper.random(dictionary.descriptions),
        site_name: helper.random(dictionary.siteNames)
      }, () => {
        this.renderBait()
      })
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
        <div>
          <button className="share facebook" onClick={(e) => this.shareBait(e)}>Facebook</button>
          <a
            className="twitter-share-button"
            href={"https://twitter.com/intent/tweet?text=" + this.state.shareLink}
            target="blank"
            data-size="large">
            <button className="share twitter" >Tweet it</button>
          </a>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <div className="preview" style={{backgroundImage: "url('" + this.state.imageLink + "')"}}>
          <div className="previewText">
            <h2 className="title">{this.state.title}</h2>
            <h4 className="description">{this.state.description}</h4>
          </div>
        </div>
        <form id="clickbait-generator">
          <button className="baitMe" onClick={(e) => this.getBait(e)}>give me some bait</button>
          {this.getShareButton()}
        </form>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
