import React, { Component } from 'react';

export default class WikiList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wikiList: []
    }
    this.showList = this.showList.bind(this);
  }

  showList(data, gotData) {
    if(gotData){
      var searchResultsArray = data[1];
      var searchResultsDescription = data[2];
      var searchResultsLink = data[3];

      var listOutput = searchResultsArray.map(function(temp, index){
        var title = searchResultsArray[index];
        var description = searchResultsDescription[index];
        var link = searchResultsLink[index];

        return (
          <a href={link} target="_blank" key={index}>
            <div>
              <h2>{title}</h2>
              <h5>{description}</h5>
            </div>
          </a>
        )
      })
      return listOutput;
    }
  }

  render() {
    return (
      <div>
        {this.props.wikiData ? this.showList(this.props.wikiData, this.props.gotData) : ""}
        {console.log(this.props.wikiData)}
      </div>
    );
  }
}
