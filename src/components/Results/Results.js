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
        console.log(response)
        this.setState({
          voiceOptions: response.data.voices
        })
      })
  }
  setVoice(e) {
    this.setState({
      selectedVoice: e.target.value
    }, () => {
      console.log(this.state.selectedVoice)
    })
  }

  getTextPronunciation() {
    axios.get('https://watson-api-explorer.mybluemix.net/text-to-speech/api/v1/pronunciation', {
      params: {
        text: this.state.translation,
        voice: this.state.selectedVoice
      }
    })
    .then((response) => {
      console.log(response)
      this.setState({
        textPronunciation: response.data.pronunciation
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  getAudioPronunciation() {
    this.setState({
      audioPronunciationSource: `https://watson-api-explorer.mybluemix.net/text-to-speech/api/v1/synthesize?text=${this.state.translation}&voice=${this.state.selectedVoice}`
    })
  }

  getPronunciations(e) {
    e.preventDefault()
    this.getTextPronunciation()
    this.getAudioPronunciation()
  }
  render() {
    let voices = this.state.voiceOptions.map((voice, index) => {
      return <option value={voice.name} key={index}>{voice.name}</option>
    })
    let audio =
      this.state.audioPronunciationSource?
      <audio controls>
        <source type="audio/ogg" src={this.state.audioPronunciationSource}/>
      </audio> :
      null

    return(
      <div>
        <h3>Translation: </h3>
        <p>{this.state.translation}</p>

        <h3>Get Pronunciation</h3>
        <form onSubmit={(e) => this.getPronunciations(e)} >
          <p>Choose Voice</p>
          <select onChange={(e) => this.setVoice(e)}>
            {voices}
          </select>
          <input type="submit" value="Select Voice"/>
        </form>
        <p>{this.state.textPronunciation}</p>
        <p>{audio}</p>
      </div>
    )
  }
}

export default Results
