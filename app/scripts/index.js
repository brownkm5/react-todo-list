var $ = require('jquery');
var Backbone = require('backbone');

var React = require('react');
var ReactDOM = require('react-dom');
var AppComponent = require('./components/app.jsx').AppComponent;

$.ajaxSetup({
  beforeSend: function(xhr){
    xhr.setRequestHeader('X-Parse-Application-Id', 'kmbparse');
    xhr.setRequestHeader('X-Parse-REST-API-Key', 'kylesb');
  }
});

$(function(){
  ReactDOM.render(
      React.createElement(AppComponent),
      document.getElementById('app')
    );
})
