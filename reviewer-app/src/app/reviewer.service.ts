import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class ReviewerService {

  constructor(private _http: HttpClient) { }


  registerUser(user) {
    return this._http.post('/register', user)
  }

  loginUser(user) {
    return this._http.post('/login', user)
  }

  addSong(song) {
    return this._http.post('/addSong', song)
  }

  getSongs() {
    return this._http.get('/songs')
  }

  getPlaylists() {
    return this._http.get('/playlist')
  }

  createPlaylist(songs) {
    return this._http.post('/createPlaylist', songs)
  }

  getSpecPlaylist(id) {
    return this._http.post('/playlist/:id', id)
  }

  addComment(comment) {
    return this._http.post('/addComment', comment)
  }

  logoff() {
    return this._http.get('/logoff')
  }

}
