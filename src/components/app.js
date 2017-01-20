import React, { Component } from 'react';
import $ from 'jquery';

import WikiList from './wikiList';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wikiList: [],
      search: "sup",
      gotData: false
    }
    this.getWiki = this.getWiki.bind(this);
  }

  getWiki(){
    $.ajax({
      url: `https://en.wikipedia.org/w/api.php?action=opensearch&search=${this.state.search}&format=json`,
      jsonp: "callback",
      dataType: "jsonp",
      data: {
        format: "json"
      },
      success: function( response ) {
        this.setState({
          wikiData: response,
          gotData: true
        })
      }.bind(this)
    });
  }

  render() {
    return (
      <div>
        <div>
          <button className="btn btn-primary right" onClick={this.getWiki}>
            Search!
          </button>
        </div>
        <WikiList wikiData={this.state.wikiData} gotData={this.state.gotData}/>
        <h3>
          <a href="https://github.com/CollinPerkins/reactWiki" target="_blank">Github Link for React Wiki App</a>
        </h3>
      </div>
    );
  }
}
