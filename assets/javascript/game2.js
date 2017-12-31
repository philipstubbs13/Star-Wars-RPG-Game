$(document).ready(function() {
	var characters = {
		"Rey": {
			name: "Rey",
			attack: 8 ,
			enemyAttackBack: 15,
			health: 120,
			imageUrl: "assets/images/rae.jpg"
		}, 
		"Darth Vader": {
			name: "Darth Vader",
			attack: 14,
			enemyAttackBack: 5,
			health: 100,
			imageUrl: "assets/images/darth_vader.jpg"
		}, 
		"Finn": {
			name: "Finn",
			attack: 8,
			enemyAttackBack: 5,
			health: 150,
			imageUrl: "assets/images/finn.jpg"
			}, 
		"Kylo Ren": {
			name: "Kylo Ren",
			attack: 7,
			enemyAttackBack: 20,
			health: 180,
			imageUrl:"assets/images/kylo_ren.jpg"
			}
	};
	console.log(characters);

	//Will be populated when the player selects the character.
	var currSelectedCharacter;
	//Populated with all the characters the player didn't select.
	var combatants = [];
	//Will be populated when the user chooses an opponent.
	var currDefender;
	//Will keep track of turns during combat. Used for calculating player damage.
	var turnCounter = 1;
	//Tracks numbr of defeated opponents.
	var killCount = 0;

	//This function will render a character card to the page.
	//The character rendered and the area they are rendered to.
	var renderOne = function(character, renderArea, charStatus) {
		var charDiv = $("<div class='character' data-name='" + character.name + "' >");
		var charName = $("<div class='character-name'>").text(character.name);
		var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl).addClass("rounded-circle");
		var charHealth = $("<div class='character-health'>").text(character.health);
		charDiv.append(charName).append(charImage).append(charHealth);
		$(renderArea).append(charDiv);

		//If the character is an enemy or defender (the active opponent), add enemy charStatus.
		if (charStatus === "enemy") {
			$(charDiv).addClass("enemy");
		}

		else if (charStatus === "defender") {
			//Populate currDefender with the selected opponent's information.
			currDefender = character;
			$(charDiv).addClass("target-enemy");
		}
	}

	//Function to handle rendering game messages.
	var renderMessage  = function(message) {

		//Builds the message and appends it to the page.
		var gameMessageSet = $("#game-message");
		var newMessage = $("<div>").text(message);
		gameMessageSet.append(newMessage);

		//If we get this specific message passed in, clear the message area.
		if (message === "clearMessage") {
			gameMessageSet.text("");
		}
	}

	//This function handles the rendering of characters based on area and character.
	var renderCharacters = function(charObj, areaRender) {
		//"character-div" is the div where all of our characters begin the game.
		//If true, render all characters to the starting area.
		if (areaRender === "#character-div") {
			$(areaRender).empty();
			//Loop through the characters object and call the renderOne function on each character
			for (var key in charObj) {
				if(charObj.hasOwnProperty(key)) {
					renderOne(charObj[key], areaRender, "");
				}
			}
		}

		//"your-player" is the div where our selected character appears.
		//If true, render the selected player character to this area.
		if (areaRender === "#your-player") {
			renderOne(charObj, areaRender, "");
		}

		//"available-to-attack-section" is the div where our "inactive" opponents reside.
		//If true, render the selected character to this area.
		if (areaRender === "#available-to-attack-section") {

			//Loop through the combatants array and call the renderOne function to each character.
			for (var i =0; i < charObj.length; i++) {
				renderOne(charObj[i], areaRender, "enemy");
			}

			//Creates an on click event for each enemy.
			$(document).on("click", ".enemy", function(){
				var name = ($(this).attr("data-name"));

				//If there is no defender, the clicked enemy will become the defender.
				if ($("#your-opponent").children().length === 0) {
					renderCharacters(name, "#your-opponent");
					$(this).hide();
					renderMessage("clearMessage");
				}
			});
		}

		//"your-opponent" is the div where the active opponent appears.
		//If true, render the selected enemy in this location.
		if (areaRender === "#your-opponent") {
			$(areaRender).empty();
			for (var i =0; i < combatants.length; i++) {
				if (combatants[i].name === charObj){
					renderOne(combatants[i], areaRender, "defender");
				}
			}
		}

		//Re-render defender when attacked.
		if (areaRender === "playerDamage") {
			$("#your-opponent").empty();
			renderOne(charObj, "#your-opponent", "defender");
		}

		//Re-render player character when attacked.
		if (areaRender === "enemyDamage") {
			$("#your-player").empty();
			renderOne(charObj, "#your-player", "");
		}

		//Remove defeated enemy.
		if (areaRender === "enemyDefeated") {
			$("#your-opponent").empty();
			var gameStateMessage = "You have defeated " + charObj.name + ". Choose another enemy to fight.";
			renderMessage(gameStateMessage);
		}

	};

	//Function which handles restarting the game after victory defeat.
	var restartGame = function(inputEndGame) {

		//When the Restart button is clicked, reload the page.
		var restart = $("<button>Restart</button>").addClass("btn btn-primary").click(function() {
			location.reload();
		});

		//Build div that will display the victory/defeat message.
		var gameState = $("<div>").text(inputEndGame);

		//Render the restart button anad victory/defeat message to the page.
		$("#game-message").append(gameState);
		$("#game-message").append(restart);
	};

	//Render all characters to the page when the game starts.
	renderCharacters(characters, "#character-div");

	//On click event for selecting our character.
	$(document).on("click", ".character", function() {
		//Saving the clicked character's name.
		var name = $(this).attr("data-name");
		console.log(name);
		$("#character-div").hide();
		$("#show-available-players").hide();

		//If a player character has not yet been chosen...
		if (!currSelectedCharacter) {
			//We populate currSelectedCharacter with the selected character's inforation
			currSelectedCharacter = characters[name];
			//Loop through the remaining characters and push them to the combatants array.
			for (var key in characters) {
				if (key!== name) {
					combatants.push(characters[key]);
				}
			}

			console.log(combatants);
			//Hide the character select div.
			$("#characters-section").hide();

			//Then render our selected character and our combatants.
			renderCharacters(currSelectedCharacter, "#your-player");
			renderCharacters(combatants, "#available-to-attack-section");

		}
	});

	//When you click the attack button, run the following game logic...
	$("#attack-button").on("click", function() {
		if ($("#your-opponent").children().length !== 0) {

			//Creates messages for our attack and opponents counter attack.
			var attackMessage = "You attacked " + currDefender.name + " for " + (currSelectedCharacter.attack * turnCounter) + " damage.";
			var counterAttackMessage = currDefender.name + " attacked you back for " + currDefender.enemyAttackBack + " damage.";
			renderMessage("clearMessage");

			//Reduce defender's health yb your attack value.
			currDefender.health -= (currSelectedCharacter.attack * turnCounter);

			//if the enemy still has health...
			if (currDefender.health > 0) {

				//Render the enemy's updated character card.
				renderCharacters(currDefender, "playerDamage");

				//Render the combat message.
				renderMessage(attackMessage);
				renderMessage(counterAttackMessage);

				//Reduce your health by the opponent's attack value.
				currSelectedCharacter.health -= currDefender.enemyAttackBack;

				//Render the player's updated character card.
				renderCharacters(currSelectedCharacter, "enemyDamage");

				//If you have less than zero health the game ends.
				//We call the restartGame function to allow the user to restart the Game.
				if (currSelectedCharacter.health <= 0) {
					renderMessage("clearMessage");
					restartGame("You have been defeated. Game Over!");
					$("#attack-button").unbind("click");
				}
			}

			else {
				//Remove your opponent's character card.
				renderCharacters(currDefender, "enemyDefeated");
				//Increment your kill count.
				killCount++;
				//If you have killed all of your oppponents you win.
				//Call the restartGame function to allow the user to restart the game and play again.
				if (killCount >= 3) {
					renderMessage("clearMessage");
					restartGame("You won!! Game Over!");
				}
			}
		}
		//If the enemy has less than zero health they are defeated.
		turnCounter++;

	});
});