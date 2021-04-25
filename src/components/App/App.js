import React from 'react'
import './App.css';
import propTypes from 'prop-types'

export class App extends React.Component {
  render () {
    const page = this.props.page

    return (
      <div className="App">
        {page || <div>No container</div>}
      </div>
    );
  }
}

App.propTypes = {
  page: propTypes.object.isRequired
}