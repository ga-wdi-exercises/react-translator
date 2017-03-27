import React, { Component } from 'react'
import './SearchContainer.css'

class SearchContainer extends Component {
  render() {
    let langOptions = this.props.langOptions.map((language, index) => {
      return(
        <option key={index + 1} value={language.short}>{language.name}</option>
      )
    })
    langOptions.unshift(
      <option key="0">Please Select a Language</option>
    )
    return(
      <div>
        <form onSubmit={(e) => this.props.onSearchSubmit(e)}>
          <p>Please enter text to be translated and the source and target languages</p>
          <p>
            <label>Text: </label>
            <textarea onChange={(e) => this.props.onSearchInput(e)}></textarea>
          </p>
          <p>
            <label>From: </label>
            <select onChange={(e) => this.props.setSourceLang(e)}>
              {langOptions}
            </select>
          </p>
          <p>
            <label>To: </label>
            <select onChange={(e) => this.props.setTargetLang(e)}>
              {langOptions}
            </select>
          </p>
          <input type="submit" value="Translate"/>
        </form>
      </div>
    )
  }
}


export default SearchContainer
