import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  domain = "http://localhost:3000"; //path to my nodeServer
  authToken;
  user;
  options;

  constructor(
    private _http: HttpClient
  ) { }

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    /*this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authToken // Attach token
      })
    });*/
  }

  // Function to get token from client local storage
  loadToken() {
    this.authToken = localStorage.getItem('token');; // Get token and asssign to variable to be used elsewhere
  }

  /**
   * Send user object to nodeServer/authentication for registeration
   * @param user 
   */
  registerUser(user) {
    //return this._http.post(this.domain + '/authentication/register', user).map(res =>{
  }

  //checks for username whether is available or not
  checkUsername(username) {
    //return this._http.get(this.domain + '/authentication/checkUsername/' + username).map(res => res.json());
  }

  //checks for username whether is available or not
  checkEmail(email) {
    //return this._http.get(this.domain + '/authentication/checkEmail/' + email).map(res => res.json());
  }

  /**
   * 
   * @param token 
   * @param user 
   */
  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  /**
   * 
   * @param user 
   */
  login(user) {
    //return this._http.post(this.domain+'/authentication/login',user).map(res => res.json());
  }

  // Function to logout
  logout() {
    this.authToken = null; // Set token to null
    this.user = null; // Set user to null
    localStorage.clear(); // Clear local storage
  }

  // Function to get user's profile data
  getProfile() {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    //return this._http.get(this.domain + 'authentication/profile', this.options).map(res => res.json());
  }

  // Function to get public profile data
  getPublicProfile(username) {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    //return this._http.get(this.domain + 'authentication/publicProfile/' + username, this.options).map(res => res.json());
  }

  // Function to check if user is logged in
  loggedIn() {
   // return tokenNotExpired();
  }

}
