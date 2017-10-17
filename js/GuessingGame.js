function newGame() {
    return new Game();
}

function generateWinningNumber() {
    return Math.floor((Math.random() * 100) + 1);
}

function shuffle(array) {
    var m = array.length, t, i;

    while (m) {
  
      i = Math.floor(Math.random() * m--);
  
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
}

function Game() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
    var difference = this.playersGuess - this.winningNumber;
    return difference < 0 ? difference / -1 : difference;
}

Game.prototype.isLower = function() {
    return this.playersGuess < this.winningNumber ? true : false;
}

Game.prototype.playersGuessSubmission = function(guess) {
    if (guess < 1 || guess > 100 || typeof(guess) !== 'number') { throw "That is an invalid guess." }
    this.playersGuess = guess;
    return this.checkGuess.call(this);
}

Game.prototype.checkGuess = function() {

    if (this.playersGuess === this.winningNumber) {
        return "You Win!";
    }
    
    if (this.pastGuesses.indexOf(this.playersGuess) === -1) {
        this.pastGuesses.push(this.playersGuess);
    } else {
        return "You have already guessed that number.";
    }

    if (this.pastGuesses.length === 5) {
        return "You Lose.";
    }

    var difference = this.difference();

    if (difference < 10) {
        return "You\'re burning up!";
    } else if (difference < 25) {
        return "You\'re lukewarm.";
    } else if (difference < 50) {
        return "You\'re a bit chilly.";
    } else {
        return "You\'re ice cold!";
    }
}

Game.prototype.provideHint = function() {
    return shuffle([this.winningNumber, generateWinningNumber(), generateWinningNumber()]);
}

$(document).ready(function() {
    var game = newGame();

    $('#submit-btn').click(function() {
        var guess = parseInt($('#guess-input').val());
        $('#guess-input').val('');
        console.log(game.playersGuessSubmission(guess));
    });
});