import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wikiList: [],
      search: "sup"
    }
    this.getWiki = this.getWiki.bind(this);
  }

  getWiki(){
    axios.get(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${this.state.search}&format=json`)
    .then(response => {
      var searchResultsArray = response.data[1];
      var searchResultsDescription = response.data[2];
      var searchResultsLink = response.data[3];

      let prom = new Promise(function (resolve, reject) {
        var newResponse = searchResultsArray.map(function(temp, index){
          return {
            article: searchResultsArray[index],
            description: searchResultsDescription[index],
            link: searchResultsLink[index]
          }
        })
        resolve(newResponse);
      })
      prom.then((value) => {
        this.setState({wikiList: value})
        console.log(this.state);
      });
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
        <h3><a href="https://github.com/CollinPerkins/reactWiki" target="_blank">Github Link for React Wiki App</a></h3>
      </div>
    );
  }
}
