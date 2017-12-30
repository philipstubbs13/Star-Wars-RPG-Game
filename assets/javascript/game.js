//Variables and Arrays go here.

//Variable to hold number of available characters
var numberAvailableCharacters = 4;

//Create variable to hold playable characters and character attributes
var characters = {
		characterArray: [{
			name: "Rey",
			attackPower: 8 ,
			counterAttackPower: 15,
			healthPoints: 120,
			imageUrl: "assets/images/rae.jpg"
			}, {
			name: "Darth Vader",
			attackPower: 14,
			counterAttackPower: 5,
			healthPoints: 100,
			imageUrl: "assets/images/darth_vader.jpg"
			}, {
			name: "Finn",
			attackPower: 8,
			counterAttackPower: 20,
			healthPoints: 150,
			imageUrl: "assets/images/finn.jpg"
			}, {
			name: "Kylo Ren",
			attackPower: 7,
			counterAttackPower: 20,
			healthPoints: 180,
			imageUrl:"assets/images/kylo_ren.jpg"
			}]
};

 var imageRey = $("<img class='character-image rounded-circle'>").attr("src", characters.characterArray[0].imageUrl).attr("alt",characters.characterArray[0].name);
 var imageVader = $("<img class='character-image rounded-circle'>").attr("src", characters.characterArray[1].imageUrl).attr("alt",characters.characterArray[1].name);
 var imageFinn = $("<img class='character-image rounded-circle'>").attr("src", characters.characterArray[2].imageUrl).attr("alt",characters.characterArray[2].name);
 var imageKylo = $("<img class='character-image rounded-circle'>").attr("src", characters.characterArray[3].imageUrl).attr("alt",characters.characterArray[3].name);

//Functions go here
function displayPlayerImages() {
	$("#show-available-players").append("<h2>" + "Choose your player." + "</h2>");
	for (var i=0; i < characters.characterArray.length; i++) {
		//Create variable for character image.
	    var characterImage = $("<img>");
	    //Assign a data attribute to each image.
	    characterImage.attr("data-name", characters.characterArray[i].name);
	    //Add a class of character-image.
	    characterImage.addClass("character-image rounded-circle");
	    //Add image url
	    characterImage.attr("src", characters.characterArray[i].imageUrl);
	    //Add image id
	    characterImage.attr("id", characters.characterArray[i].name)
	    //Append each button to the character-div in the HTML.
	    if (i === 0) {
	    	$("#character-div1").append(characterImage).append("<h4>" + "HP: " + characters.characterArray[i].healthPoints + "</h4>");
	    	$("#character-div1").addClass("text-center");
	    }
	    if (i === 1) {
	    	$("#character-div2").append(characterImage).append("<h4>" + "HP: " + characters.characterArray[i].healthPoints + "</h4>");
	    	$("#character-div2").addClass("text-center");
	    }
	    if (i === 2) {
	    	$("#character-div3").append(characterImage).append("<h4>" + "HP: " + characters.characterArray[i].healthPoints + "</h4>");
	    	$("#character-div3").addClass("text-center");
	    }
	    if (i === 3) {
	    	$("#character-div4").append(characterImage).append("<h4>" + "HP: " + characters.characterArray[i].healthPoints + "</h4>");
	    	$("#character-div4").addClass("text-center");
	    }
	}  

	chooseYourPlayer();
}


function chooseYourPlayer() {
	//When user chooses/clicks a player's image....
	$(".character-image").on("click", function() {
		userPlayer = $(this).attr("data-name");
		console.log(userPlayer);

		//Change "Choose your player" to "Choose your opponent" in HTML.
		$("#show-available-players").html("<h2>" + "Choose your opponent." + "</h2>");

		if (numberAvailableCharacters === 4) {

			//If user chooses Rey...
			if (userPlayer === characters.characterArray[0].name) {
				$("#character-div1").empty();
				numberAvailableCharacters--;
				$("#your-player").append(imageRey).append("<h4>" + "HP: " + characters.characterArray[0].healthPoints + "</h4>");
			}

			//If user chooses Darth Vader...
			else if (userPlayer === characters.characterArray[1].name) {
				$("#character-div2").empty();
				numberAvailableCharacters--;
				$("#your-player").append(imageVader).append("<h4>" + "HP: " + characters.characterArray[1].healthPoints + "</h4>");
				displayYourPlayer();
			}

			//If user chooses Finn...
			else if (userPlayer === characters.characterArray[2].name) {
				$("#character-div3").empty();
				numberAvailableCharacters--;
				$("#your-player").append(imageFinn).append("<h4>" + "HP: " + characters.characterArray[2].healthPoints + "</h4>");
				displayYourPlayer();
			}

			//If user chooses Kylo Ren...
			else if (userPlayer === characters.characterArray[3].name) {
				$("#character-div4").empty();
				numberAvailableCharacters--;
				$("#your-player").append(imageKylo).append("<h4>" + "HP: " + characters.characterArray[3].healthPoints + "</h4>");
				displayYourPlayer();
			}
		}

		//Choose opponent.
		else if (numberAvailableCharacters === 3) {
			//If user chooses Rey...
			if (userPlayer === characters.characterArray[0].name) {
				$("#character-div1").empty();
				numberAvailableCharacters--;
				$("#your-opponent").append(imageRey).append("<h4>" + "HP: " + characters.characterArray[0].healthPoints + "</h4>");
			}

			//If user chooses Darth Vader...
			else if (userPlayer === characters.characterArray[1].name) {
				$("#character-div2").empty();
				numberAvailableCharacters--;
				$("#your-opponent").append(imageVader).append("<h4>" + "HP: " + characters.characterArray[1].healthPoints + "</h4>");
				displayYourPlayer();
			}

			//If user chooses Finn...
			else if (userPlayer === characters.characterArray[2].name) {
				$("#character-div3").empty();
				numberAvailableCharacters--;
				$("#your-opponent").append(imageFinn).append("<h4>" + "HP: " + characters.characterArray[2].healthPoints + "</h4>");
				displayYourPlayer();
			}

			//If user chooses Kylo Ren...
			else if (userPlayer === characters.characterArray[3].name) {
				$("#character-div4").empty();
				numberAvailableCharacters--;
				$("#your-opponent").append(imageKylo).append("<h4>" + "HP: " + characters.characterArray[3].healthPoints + "</h4>");
				displayYourPlayer();
			}

		}
	})
}

function displayYourPlayer() {
}


//Call functions here.
displayPlayerImages();


