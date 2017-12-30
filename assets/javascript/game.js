//Variables and Arrays go here.

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

//Functions go here
function chooseYourPlayer() {
	$("#show-available-players").append("<h2>" + "Choose your player" + "</h2>");
	for (var i=0; i < characters.characterArray.length; i++) {
    //Create variable for character image.
    var characterImage = $("<img>");
    //Assign a data attribute to each image.
    characterImage.attr("data-name", characters.characterArray[i].name);
    //Add a class of character-image.
    characterImage.addClass("character-image rounded-circle");
    //Add image url
    characterImage.attr("src", characters.characterArray[i].imageUrl);
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
    
}

//Call functions here.
chooseYourPlayer();
