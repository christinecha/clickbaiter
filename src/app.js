"use strict"

import React from 'react'
import ReactDOM from 'react-dom'
// import { Gridfolio } from './components/Gridfolio.jsx'

window.fbAsyncInit = function() {
  FB.init({
    appId      : '498097037043503',
    xfbml      : true,
    version    : 'v2.5'
  });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));


ReactDOM.render(
  <div>Hello world!</div>,
  document.getElementById('gridfolio-react')
)
