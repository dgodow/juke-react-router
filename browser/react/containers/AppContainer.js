import React, { Component } from 'react';
import axios from 'axios';

import initialState from '../initialState';
import AUDIO from '../audio';

import Albums from '../components/Albums.js';
import Album from '../components/Album';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';
import Artist from '../components/Artist';

import { convertAlbum, convertAlbums, skip, convertArtist } from '../utils';

export default class AppContainer extends Component {

/*

const initialState = {
  albums: [],
  selectedAlbum: {},
  currentSong: {},
  currentSongList: [],
  isPlaying: false,
  progress: 0
};

*/


  constructor (props) {
    super(props);
    this.state = initialState;

    this.toggle = this.toggle.bind(this);
    this.toggleOne = this.toggleOne.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.selectAlbum = this.selectAlbum.bind(this);
    this.deselectAlbum = this.deselectAlbum.bind(this);
    this.getArtists = this.getArtists.bind(this);
    this.artistsOnLoad = this.artistsOnLoad.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
  }

  componentDidMount () {
    axios.get('/api/albums/')
      .then(res => res.data)
      .then(album => this.albumsOnLoad(convertAlbums(album)));

    AUDIO.addEventListener('ended', () =>
      this.next());
    AUDIO.addEventListener('timeupdate', () =>
      this.setProgress(AUDIO.currentTime / AUDIO.duration));
  }

  albumsOnLoad (albums) {
    this.setState({
      albums: albums
    });
  }

  getArtists () {
    axios.get('/api/artists/')
      .then(res => res.data)
      .then(artists => this.artistsOnLoad(artists));
  }

  artistsOnLoad (artists) {
    this.setState({
      artists: artists
    })
  }

  play () {
    AUDIO.play();
    this.setState({ isPlaying: true });
  }

  pause () {
    AUDIO.pause();
    this.setState({ isPlaying: false });
  }

  load (currentSong, currentSongList) {
    AUDIO.src = currentSong.audioUrl;
    AUDIO.load();
    this.setState({
      currentSong: currentSong,
      currentSongList: currentSongList
    });
  }

  startSong (song, list) {
    this.pause();
    this.load(song, list);
    this.play();
  }

  toggleOne (selectedSong, selectedSongList) {
    if (selectedSong.id !== this.state.currentSong.id)
      this.startSong(selectedSong, selectedSongList);
    else this.toggle();
  }

  toggle () {
    if (this.state.isPlaying) this.pause();
    else this.play();
  }

  next () {
    this.startSong(...skip(1, this.state));
  }

  prev () {
    this.startSong(...skip(-1, this.state));
  }

  setProgress (progress) {
    this.setState({ progress: progress });
  }

  selectArtist (artistId) {
    axios.get(`/api/artists/${artistId}`)
      .then(res => res.data)
      .then(convertArtist)
      .then(artist => {
        console.log('artist', artist);
        this.setState({
        selectedArtist: artist
      })
    })
  }

  selectAlbum (albumId) {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => {this.setState({
        selectedAlbum: convertAlbum(album)
      });
    });
  }

  deselectAlbum () {
    this.setState({ selectedAlbum: {}});
  }

  render () {
    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar deselectAlbum={this.deselectAlbum} />
        </div>
        <div className="col-xs-10">
        {
          this.props.children
          ? React.cloneElement(this.props.children, {
              album: this.state.selectedAlbum,
              currentSong: this.state.currentSong,
              isPlaying: this.state.isPlaying,
              toggleOne: this.toggleOne,
              albums: this.state.albums,
              artists: this.state.artists,
              selectAlbum: this.selectAlbum,
              selectArtist: this.selectArtist,
              getArtists: this.getArtists,
              artist: this.state.selectedArtist
            })

          : null
        }
        </div>
        <Player
          currentSong={this.state.currentSong}
          currentSongList={this.state.currentSongList}
          isPlaying={this.state.isPlaying}
          progress={this.state.progress}
          next={this.next}
          prev={this.prev}
          toggle={this.toggle}
        />
      </div>
    );
  }
}
