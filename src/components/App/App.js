import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import Search from '../Search/Search.js'
import Results from '../Results/Results.js'
import Translations from '../Translations/Translations.js'
import './App.css'

class App extends Component {

  constructor () {
    super()
    this.state = {
      translation: null
    }
  }

  setTranslation (data, language) {
    this.setState({
      translation: data,
      language: language
    })
  }

  render() {
    return(
      <Router>
        <div>
          <nav>
            <h1>React Translator</h1>
            <Link to="/search">Search</Link>
            <Link to="/results">Results</Link>
            <Link to="/translations">Saved Translations</Link>
          </nav>
          <main>
            <Switch>
              <Route
                path="/search"
                render={(props) => {
                  return (
                    <Search
                    {...props}
                    setTranslation={ (data, language ) => this.setTranslation(data, language ) }
                    />
                  )
                }}
              />
              <Route
                path="/results"
                render={(props) => {
                  return (
                    <Results
                      {...props}
                      translation={ this.state.translation }
                      language={ this.state.language }
                    />
                  )
                }}
              />
              <Route
                path="/translations"
                component={ Translations }
              />
              <Route
                path="/*"
                render={() => {
                  return (
                    <Redirect to="/search" />
                  )
                }}
              />
            </Switch>
          </main>
        </div>
      </Router>
    )
  }
}

export default App;
