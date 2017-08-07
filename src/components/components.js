import angular from 'angular';
import Hangman from './hangman/hangman';
import Docs from './docs/docs';
import Leaderboard from './leaderboard/leaderboard';

export default angular.module('app.components', [
	Hangman.name,
	Docs.name,
	Leaderboard.name
]);