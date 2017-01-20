import React, { Component } from 'react';
import $ from 'jquery';
import _ from 'lodash';

import WikiList from './wikiList';
import SearchBar from './searchBar';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wikiList: [],
      gotData: false
    }
    this.getWiki('');
  }

  getWiki(term){
    $.ajax({
      url: `https://en.wikipedia.org/w/api.php?action=opensearch&search=${term}&format=json`,
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
    const getWiki = _.debounce((term) => { this.getWiki(term) }, 300);

    return (
      <div>
        <div>
          <SearchBar onSearchTermChange={getWiki} />
          <a href="https://en.wikipedia.org/wiki/Special:Random" target="_blank">
            <button>Random</button>
          </a>

        </div>
        <WikiList wikiData={this.state.wikiData} gotData={this.state.gotData}/>
        <h3>
          <a href="https://github.com/CollinPerkins/reactWiki" target="_blank">Github Link for React Wiki App</a>
        </h3>
      </div>
    );
  }
}
