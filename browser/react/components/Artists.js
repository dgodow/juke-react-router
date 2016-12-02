import axios from 'axios';
import React from 'react';

class Artists extends React.Component {

  componentDidMount () {
    this.props.getArtists();
  }

  render () {
    console.log(this.props.artists);

    return (
      <div>
        <h3>Artists</h3>
          <div className="list-group">
          {
            this.props.artists.map(artist => {
              return (
                <div className="list-group-item" key={artist.id}>
                  <Link to={`/artist/${artist.id}`}>{ artist.name }</Link>}
                </div>
              )    
            })
          }
        </div>
      </div>
    )
  }

}


export default Artists;
