import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import Albums from './components/albums';
import Album from './components/album';
import Player from './components/player';
import Sidebar from './components/sidebar';
import Songs from './components/songs';
import Artists from './components/artists';
import Artist from './components/artist';

import { Router, Route, hashHistory, IndexRedirect } from 'react-router';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path = "/" component = { AppContainer } >
      <IndexRedirect to="albums" />
      <Route path = "albums" component = { Albums } />
      <Route path = "albums/:albumId" component = { Album } />
      <Route path = "artists" component = { Artists } />
      <Route path = "artists/:artistId" component = { Artist } />
    </ Route>
  </ Router>,
  document.getElementById('app')
);
