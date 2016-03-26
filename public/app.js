"use strict"

import React from 'react'
import ReactDOM from 'react-dom'
import Firebase from 'firebase'
import * as helper from './helpers'
import * as dictionary from './dictionary'

let ref = new Firebase("https://clickbaiter.firebaseio.com/")

class App extends React.Component {

  // Set up the state template. Not using null values so in the worst case scenario, it
  // would just print wrong information rather than breaking completely.
  constructor() {
    super()
    this.state = {
      gotcha: false,
      title: "",
      description: "",
      imageLink: "",
      siteName: "",
      shareLink: "",
      clickCount: 0,
    }
  }

  componentWillMount() {
    // Parse the URL and return the params in a neat little object.
    let paramObj = helper.getParamObj(location.href)

    // Check if the URL is one from a click-through path (gotcha: true, id: 1234)
    // This will not break if there are no matching params.
    if (paramObj && paramObj.gotcha && paramObj.id) {

      // Grab the matching article data by id from Firebase.
      ref.child("articles").child(paramObj.id).once("value", (snapshot) => {

        // If the article actually exists in the database:
        if (snapshot.val()) {

          // Set the state with all the matching keys.
          // Added || operands to protect against null values.
          this.setState({
            gotcha: true,
            title: snapshot.val().title || "",
            description: snapshot.val().description || "",
            imageLink: snapshot.val().imageLink || "",
            shareLink: location.origin + "/article/" + snapshot.key(),
            shareable: true,
            clickCount: snapshot.val().clickCount || 1
          })

          // If clickCount exists and it's a number, then add 1.
          if (snapshot.val().clickCount && typeof snapshot.val().clickCount == "number") {
            ref.child("articles").child(paramObj.id).update({
              clickCount: snapshot.val().clickCount + 1
            })
          } else {
            // Otherwise, set it to 1.
            ref.child("articles").child(paramObj.id).child("clickCount").set(1)
          }

        // If the params exist (gotcha and id) but there is no article data for that id,
        // still make "gotcha" true -- just generate new bait.
        } else {
          this.setState({ gotcha: true })
          this.getBait()
        }
      })
    }
  }

  componentDidUpdate() {
    // This makes sure that everytime we update the component, the FB data does too.
    FB.XFBML.parse()
  }

  getImageLink(query) {
    helper.getImage(query).then(imageLink => {
      this.setState({
        imageLink: imageLink || this.state.imageLink
      })
    })
  }

  getBait(e) {
    if (e) e.preventDefault()
    this.setState({
      shareable: false,
      imageLink: ""
    }, () => {
      let imageQueryOptions = []

      let title = helper.random(dictionary.titles).reduce((acc, n) => {
        if (typeof n == "string") {
          return acc + " " + n
        } else {
          var madLib = helper.getMadLib(n)
          imageQueryOptions.push(madLib)
          return acc + " " + madLib
        }
      }, "")

      let randomImageQuery = helper.random(imageQueryOptions)

      helper.getImage(randomImageQuery).then(imageLink => {
        this.setState({
          title: title,
          description: helper.random(dictionary.descriptions),
          site_name: helper.random(dictionary.siteNames),
          imageLink: imageLink || this.state.imageLink
        }, () => {
          this.renderBait()
        })
      })
    })
  }

  renderBait() {
    let count = 0

    if (this.state.imageLink.length > 10){
      console.log('1')
      let newKey = ref.child("articles").push({
        title: this.state.title,
        description: this.state.description,
        imageLink: this.state.imageLink,
        site_name: this.state.site_name
      }, () => {
        console.log('2')
        this.setState({
          shareLink: location.origin + "/article/" + newKey.key(),
          shareable: true
        })
      })
    } else {
      console.log('failed to connect. can you try again?')
    }
  }

  getGotcha() {
    let countText = [
      "It's alright - this link has claimed ",
      <span className="count" key={1}>{this.state.clickCount}</span>,
      " other victims just like you. "
    ]

    if (this.state.gotcha) {
      return (
        <div className="gotcha">
          <h3>Awww, you've been clickbaited!</h3>
          <p>
            {this.state.clickCount > 1 ? countText : null}
            Get revenge by sharing some more of this crap on your newsfeed.
          </p>
        </div>
      )
    }
  }

  getShareButton() {
    if (this.state.shareable) {
      return (
        <div>
          <div className="fb-share-container">
            <div className="fb-share-button" data-href={this.state.shareLink} data-layout="button"></div>
          </div>
          <input className="link-display" value={this.state.shareLink} readOnly />
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.getGotcha()}
        <h3 className="site-title">clickbait generator</h3>
        <div className="preview" style={{backgroundImage: "url('" + this.state.imageLink + "')"}}>
          <div className="previewText">
            <h2 className="title">{this.state.title}</h2>
            <h4 className="description">{this.state.description}</h4>
          </div>
        </div>
        <form id="clickbait-generator">
          <button className="baitMe" onClick={(e) => this.getBait(e)}>generate some clickbait</button>
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
