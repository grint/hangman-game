import angular from 'angular';
import uiRouter from 'angular-ui-router';
import AppComponent from './app.component.js';
import Common from './common/common';
import Components from './components/components';
import localforage from "localforage";
import LocalForageModule from 'angular-localforage';

import 'bootstrap/dist/js/bootstrap.min.js';
import './css/styles.scss';

angular.module('hangmanGame', [
		uiRouter,
		LocalForageModule,
		Common.name,
		Components.name
	])

	.config(['$localForageProvider', function($localForageProvider) {
		$localForageProvider.config({
			driver: localforage.INDEXEDDB,
			name: 'hangman', // name of the database and prefix data
			storeName: 'game'

		});
	}])

	.directive('app', AppComponent)

	/**
	 * Service contains current user data 
	 * and user methods for saving and loading data from/to database
	 */
	.factory('sharedUser', function($localForage) {
		var user = {
			name: '',
			lives: 5,
			isPlaying: false,
			isLogged: false,
			score: 0,
			winnings: 0
		}

		/**
		 * Check if users is exists and logged in
		 */
		$localForage.getItem('currentUser').then(function(username) {
			if (username) {
				// Current user is set - check if such user exists in DB
				$localForage.getItem('users').then(function(users) {
					if(users) {
						users.forEach(function(db_user, index) {
							user.name = db_user.name;
							user.isLogged = true;
							user.score = db_user.score;
							user.winnings = db_user.winnings;
						});
					}
				})
			}
		}).catch(function(err) {
			console.log(err);
		});


		/**
		 * Submit Login form
		 * form {Object}: current form
		 * username {string}: name of the user to login
		 */
		user.logIn = function(form, user) {
			// If form is invalid, return and show validation errors
			if (form.$invalid) {
				return;
			}

			// User is not exist in the DB, show validation error
			let that = this;
			$localForage.getItem('users').then(function(users) {
				if (!users.filter(function(db_user) { return db_user.name === user.name }).length > 0) {
					form.$userNotExists = true;
					return;
				} else {
					that.setCurrentUser(user.name);
					that.isLogged = true;
				}
			}).catch(function(err) {
				console.log(err);
			});
		}

		/**
		 * Logout user: set key "currentUser" in DB to null
		 */
		user.logOut = function() {
			this.writeToDb('currentUser', null);
			this.isLogged = false;
		}

		/**
		 * Submit createUser form
		 * Add new user to "users" in the DB
		 * Set the user as current
		 * form {Object}: current form
		 * username {string}: name of the user to create
		 */
		user.createUser = function(form, user) {
			// If form is invalid, return and show validation errors
			if (form.$invalid) {
				return;
			}

			// If user is already in the DB, show validation error
			// otherwise - create user by adding user's name to "users" object
			let that = this;
			$localForage.getItem('users').then(function(users) {
				if (users && users.filter(function(db_user) { return db_user.name === user.name }).length > 0) {
					// form.$invalid = true;
					console.log("exists");
					form.$userExists = true;
					return;
				} else {
					that.addNewUser(user.name);
					that.writeToDb('currentUser', user.name);
					that.isLogged = true;
				}
			}).catch(function(err) {
				console.log(err);
			});
		}

		/**
		 * Write information to DB 
		 * key {string}: key in storage where to write new data
		 * value: value to write
		 */
		user.writeToDb = function(key, value) {
			$localForage.setItem(key, value).then(function(value) {}).catch(function(err) {
				console.log(err);
			});
		}

		/**
		 * Set current user in DB if user exists
		 * username {string}: name of the user to set
		 * return true/false
		 */
		user.setCurrentUser = function(username) {
			let that = this;
			$localForage.getItem('users').then(function(users) {
				if (users.filter(function(user) { return user.name === username }).length > 0) {
					that.writeToDb('currentUser', username);
					that.isLogged = true;
				} else {
					that.isLogged = false;
				}
			}).catch(function(err) {
				console.log(err);
			});
		}

		/**
		 * Add new user to DB to 'users' table
		 * username {string}: name of the user to add
		 */
		user.addNewUser = function(username) {
			$localForage.getItem('users').then(function(users) {
				if (!users) users = [];
				var user = { name: username, winnings: 0, score: 0 };
				users.push(user);
				$localForage.setItem('users', users);
			});
		}

		return user;
	});