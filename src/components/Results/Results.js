import React, { Component } from 'react'

class Results extends Component {
  componentDidMount() {
    this.props.clearSearch()
  }
  render() {
    return(
      <div>
        <h3>Translation: </h3>
        <p>{this.props.translation}</p>
      </div>
    )
  }
}

export default Results
