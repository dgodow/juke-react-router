import React from 'react';
import Songs from './Songs'

class Artist extends React.Component {

  componentDidMount () {
    this.props.selectArtist(this.props.routeParams.artistId);
  }

  render () {
    const artist = this.props.artist;
    console.log(artist)
    return (
      <div>
        <h3>{artist.name}</h3>

        <h4>SONGS</h4>
        <div>
          {

          }
          </div>
          {
            artist.songs.map(song => {
              return ( <tr key={song.id}>
                <td>
                  <button className="btn btn-default btn-xs" onClick={() => toggle(song, songs)}>

                  </button>
                </td>
                <td>{ song.name }</td>
                <td>
                  <span>{ song.artists ? song.artists.map(artist => artist.name).join(', ') : null }</span>
                </td>
                <td>{ song.genre }</td>
              </tr>
              )
            })
          }
      </div>
      )
  }
}




export default Artist;
