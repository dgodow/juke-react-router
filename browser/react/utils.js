import axios from 'axios';


export const convertSong = (song) => {
  song.audioUrl = `/api/songs/${song.id}/audio`;
  return song;
};

export const convertAlbum = (album) => {
  album.imageUrl = `/api/albums/${album.id}/image`;
  album.songs = album.songs.map(convertSong);
  return album;
};

export const convertArtist = (artist) => {
  const songs = axios.get(`/api/artists/${artist.id}/songs`);
  const albums = axios.get(`/api/artists/${artist.id}/albums`);

  return Promise.all([songs, albums])
    .then((results) => {
      artist.songs = results[0].data;
      artist.albums = results[1].data;
      return artist;
    })
};


export const convertAlbums = (albums) =>
  albums.map(album => convertAlbum(album));

const mod = (num, m) => ((num % m) + m) % m;

export const skip = (interval, { currentSongList, currentSong }) => {
  let idx = currentSongList.map(song => song.id).indexOf(currentSong.id);
  idx = mod(idx + interval, currentSongList.length);
  const next = currentSongList[idx];
  return [next, currentSongList];
};
