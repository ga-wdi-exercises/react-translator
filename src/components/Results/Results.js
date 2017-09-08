import React, { Component } from 'react'
import axios from 'axios'


class Results extends Component {

  constructor () {
    super()
    this.state = {
      voiceAudioSource: null
    }
  }

  saveTranslation () {
    axios.post('http://localhost:3001/api/translations', {
      text: this.props.translation,
      audioSource: this.state.voiceAudioSource
    })
    .then(() => {
      this.props.history.push('/translations')
    })
    .catch((err) => {
      console.log(err)
    })
  }

  componentDidMount () {
    if (!this.props.translation) {
      this.props.history.push('/search')
    }
    else {
      axios.get('https://watson-api-explorer.mybluemix.net/text-to-speech/api/v1/voices')
        .then((res) => {
          let selectedVoice = res.data.voices.find((voice) => voice.name.includes(this.props.language))
          this.setState({
            voiceAudioSource: `https://watson-api-explorer.mybluemix.net/text-to-speech/api/v1/synthesize?text=${this.props.translation}&voice=${selectedVoice.name}`
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  render () {
    let audio =
      this.state.voiceAudioSource?
      <audio controls>
        <source type="audio/ogg" src={this.state.voiceAudioSource}/>
      </audio> :
      null

    return (
      <div>
        <h3>Translation</h3>
        <p>{ this.props.translation }</p>
        { audio }
        <button onClick={() => this.saveTranslation()}>Save Translation</button>
      </div>
    )
  }
}

export default Results
