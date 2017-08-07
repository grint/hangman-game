class HangmanController {
	constructor($state, $scope, sharedUser, $localForage) {
		this.$state = $state;
		this.$scope = $scope;
		this.sharedUser = sharedUser;
		this.$localForage = $localForage;

		this.name = 'hangman';

		this.alphabet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
		this.words = ['3dhubs', 'marvin', 'print', 'filament', 'order', 'layer'];

		this.$scope.gamesCount = 0;

		this.game = {
			chosenWord: '',
			isSuccessful: false,
			guesses: [],
			counter: 0
		}

		// total scores in format {username: score}
		this.scores = {};

		// context of the canvas for drawing the hangman
		this.canvasContext;

		// order of drawing hangman's parts, starting from the last
		this.drawSteps = ['legs', 'arms', 'body', 'frame2', 'frame1'];
	}

	/**
	 * Init starting values when the game starts
	 * Randomly choose a word to play
	 * Set current user (add it to DB if not exists)
	 */
	$onInit() {
		// Start parameters
		this.sharedUser.isPlaying = true;
		this.sharedUser.lives = 5;
		this.game.chosenWord = this.words[Math.floor(Math.random() * this.words.length)].replace(/\s/g, "-");
		this.game.guesses = [];
		this.game.counter = 0;

		// Fill the hidden word filled with "_" by default according to the chosen word length
		for (var i = 0; i < this.game.chosenWord.length; i++) {
			this.game.guesses[i] = '_';
		}

		// Show user lives and prepare hangman canvas
		this.showMessage();
		this.prepareHangmanCanvas();

		console.log(this.game.chosenWord);
	}

	/**
	 * Start a new game 
	 * and increase games count: it triggers directive 'refresher'
	 */
	newGame() {
		this.$onInit();
		this.$scope.gamesCount += 1;
	}

	/**
	 * Actions if user won a game
	 * Increase the no. ot user's winning in DB
	 * Add scores for the game that depends on user's lives (lives * 10)
	 * Stop game and set it to successful state
	 * Show congratulations
	 */
	onWin() {
		this.$scope.message = "You Win!";
		this.sharedUser.isPlaying = false;
		this.game.isSuccessful = true;

		let that = this;
		this.$localForage.getItem('users').then(function(users) {
			// var objIndex = users.map(function(x) {return x.name; }).indexOf(that.sharedUser.name);
			// console.log(objIndex);
			// users[objIndex].winnings += 1;
			// users[objIndex].score += that.sharedUser.lives * 10;
			// users[objIndex] = that.sharedUser;

			users.forEach(function(user, index) {
				if(users[index].name == that.sharedUser.name) {
					users[index].winnings = that.sharedUser.winnings + 1;
					users[index].score = that.sharedUser.score + that.sharedUser.lives * 10;
					return;
				}
			});

			that.$localForage.setItem('users', users);

		}).catch(function(err) {
			console.log(err);
		});

	}

	/**
	 * Go to the page with leaders sharing current user data (is the last game won, user name, etc.)
	 */
	openLeaderboard() {
		this.$state.go('leaderboard', {
			obj: {
				game: this.game,
				user: this.sharedUser
			}
		});
	}

	/**
	 * When user clicks on the letter it will be compared with all letters in the chosen word
	 * If the letter is wrong - no. of user lives decreases and hangman is being drawed
	 */
	onLetterClick($event, el) {
		if (this.sharedUser.isPlaying && !el.clicked) {
			el.clicked = true;
			$event.cancelBubble = true;
			$event.stopPropagation();
			$event.preventDefault();

			// Try to find chosen letter in the word
			for (var i = 0; i < this.game.chosenWord.length; i++) {
				if (this.game.chosenWord[i] === el.letter) {
					this.game.guesses[i] = el.letter;
					this.game.counter += 1;
				}
			}

			// The letter is wrong ? lives--, draw hangman
			if (this.game.chosenWord.indexOf(el.letter) === -1) {
				this.sharedUser.lives -= 1;
				this.showMessage();
				this.animate();
			} else {
				this.showMessage();
			}
		}
	}

	/**
	 * Show message according to the game status, 
	 * stop game and add winning to the user winnings
	 */
	showMessage() {
		this.$scope.message = "You have " + this.sharedUser.lives + (this.sharedUser.lives == 1 ? " live" : " lives");
		// Game over
		if (this.sharedUser.lives < 1) {
			this.$scope.message = "Game Over";
		}

		for (var i = 0; i < this.game.guesses.length; i++) {
			// Game is successful
			if (this.game.counter === this.game.guesses.length) {
				this.onWin();
				break;
			}
		}
	}

	/**
	 * The function is called once on game start
	 * Prepare canvas for the future hangman
	 */
	prepareHangmanCanvas() {
		var canvas = document.getElementById('hangmanCanvas');
		this.canvasContext = canvas.getContext('2d');
		this.canvasContext.clearRect(0, 0, 400, 400);
		this.canvasContext.beginPath();
		this.canvasContext.strokeStyle = "#000";
		this.canvasContext.lineWidth = 2;
	}

	/**
	 * The function draws a line according to X and Y coordinates
	 * $pathFromX {number}: starting X coordinate
	 * $pathFromY {number}: starting Y coordinate
	 * $pathToX {number}: end X coordinate
	 * $pathToY {number}: end Y coordinate
	 */
	drawLine($pathFromX, $pathFromY, $pathToX, $pathToY) {
		this.canvasContext.moveTo($pathFromX, $pathFromY);
		this.canvasContext.lineTo($pathToX, $pathToY);
		this.canvasContext.stroke();
	}

	/**
	 * The function draws a circle according to X and Y coordinates
	 * $pathFromX {number}: starting X coordinate
	 * $pathFromY {number}: starting Y coordinate
	 * $pathToX {number}: end X coordinate
	 * $pathToY {number}: end Y coordinate
	 */
	drawCircle($pathFromX, $pathFromY, $pathToX, $pathToY) {
		this.canvasContext.beginPath();
		this.canvasContext.arc($pathFromX, $pathFromY, $pathToX, $pathToY, Math.PI * 2, true);
		this.canvasContext.stroke();
	}

	/**
	 * Draw chosen hangman's part according to the user's lives
	 * Name of the corresponding function is taken from "this.drawSteps"
	 * "User.lives" plays role of the array index
	 */
	animate() {
		var drawPart = this.drawSteps[this.sharedUser.lives];
		eval('this.' + drawPart + '()');
	}


	frame1() {
		this.drawLine(0, 150, 150, 150);
		this.drawLine(10, 0, 10, 600);
	};

	frame2() {
		this.drawLine(0, 5, 70, 5);
		this.drawLine(60, 5, 60, 15);
	};

	body() {
		this.drawCircle(60, 25, 10, 0); // head
		this.drawLine(60, 36, 60, 70); // torso
	};

	arms() {
		this.drawLine(60, 46, 25, 60); // left arm
		this.drawLine(60, 46, 95, 60); // right arm
	};

	legs() {
		this.drawLine(60, 70, 30, 110); // lett leg
		this.drawLine(60, 70, 90, 110); // right leg
	};
}

export default HangmanController;