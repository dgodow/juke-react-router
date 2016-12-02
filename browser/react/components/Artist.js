import React from 'react';

class Artist extends React.Component {

  render () {
    return (
      <div>
        <h3>{this.props.artist.name}</h3>
        <h4></h4>
        <h4>SONGS</h4>
      </div>
      )
  }
}

export default Artist;