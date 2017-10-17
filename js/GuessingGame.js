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

    if (guess >= 1 || guess <= 100) { 
        this.playersGuess = guess;
        return this.checkGuess.call(this);
    } else {
        throw "That is an invalid guess." 
    }

}

Game.prototype.checkGuess = function() {
    if (this.pastGuesses.indexOf(this.playersGuess) === -1) {
        this.pastGuesses.push(this.playersGuess);
    } else {
        $('#sub-heading').html('Please guess again!');
        return "You have already guessed that number.";
    }

    $('#guesses ul li:nth-child('+this.pastGuesses.length+')').text(this.playersGuess);

    if (this.playersGuess === this.winningNumber) {
        showGameEnd();
        return "You Win!";
    }
    
    if (this.pastGuesses.length === 5) {
        showGameEnd();
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

function submitGuess(game) {
    var guess = parseInt($('#guess-input').val());
    var output = game.playersGuessSubmission(guess);

    $('#guess-input').val('');
    $('#heading').html(output);
}

function showGameEnd() {
    $('#sub-heading').html('Please reset the game to play again!');
    $('#submit-btn').prop('disabled', true);
    $('#hint-btn').prop('disabled', true);
}

$(document).ready(function() {
    var game = newGame();

    $('#submit-btn').click(function() {
        submitGuess(game);
    });

    $('#guess-input').keypress(function(e) {
        if (e.keyCode === 13) {
            submitGuess(game);
        }
    });

    $('#reset-btn').click(function() {
        game = newGame();
        $('#heading').html('Play the Guessing Game!');
        $('#sub-heading').html('Guess a number between 1-100!');
        $('#submit-btn').prop('disabled', false);
        $('#hint-btn').prop('disabled', false);
        $('.guess').text('-');
    });

    $('#hint-btn').click(function() {
        $('#heading').html(game.provideHint().join(', '));
    });
});