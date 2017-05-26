import React, { Component } from 'react'
import axios from 'axios'

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {
      translation: this.props.translation,
      voiceOptions: [],
      selectedVoice: null,
      textPronunciation: null,
      audioPronunciationSource: null
    }
  }
  componentDidMount() {
    this.props.clearSearch()
    this.getVoiceOptions()
  }
  getVoiceOptions() {
    axios.get('https://watson-api-explorer.mybluemix.net/text-to-speech/api/v1/voices')
      .then((response) => {
        this.setState({
          voiceOptions: response.data.voices
        })
      })
  }
  setVoice(e) {
    this.setState({
      selectedVoice: e.target.value
    })
  }

  //TODO: Fetch Phonetic Pronunciation

  //TODO: Fetch audio

  render() {
    let voices = this.state.voiceOptions.map((voice, index) => {
      return <option value={voice.name} key={index}>{voice.name}</option>
    })

    return(
      <div>
        <h3>Translation: </h3>
        <p>{this.state.translation}</p>

        <h3>Pronunciation:</h3>
        <form>
          <p>Choose Voice</p>
          <select onChange={(e) => this.setVoice(e)}>
            {voices}
          </select>
          <input type="submit" value="Select Voice"/>
        </form>
        <p><label>Selected Voice:</label>{ this.state.selectedVoice }</p>
        <p><label>Phonetic Pronunciation:</label></p>
        <p><label>Play Audio:</label></p>
      </div>
    )
  }
}

export default Results
