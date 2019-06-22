var that = this;
var gameMTPunchOut = {
    characterSelected : false,
    enemiesCount : 3,
    defenderSelected : false,
    characters : {
        donFlamenco : { 
            health : 0,
            attack: 0,
            newAttack: 0,
            counterAttack: 0,
            defender: false,
            yourCharacter: false,
            enemy: false,
            img: "assets/images/minDonFlamenco.png"
        },
        glassJoe : { 
            health : 0,
            attack: 0,
            newAttack: 0,
            counterAttack: 0,
            yourCharacter: false,
            enemy: false,
            defender: false,
            img: "assets/images/minGlassJoe.png"
        },
        mikeTyson : {
            health : 0,
            attack: 0,
            newAttack: 0,
            counterAttack: 0,
            yourCharacter: false,
            enemy: false,
            defender: false,
            img: "assets/images/minMikeTyson.png"
        },
        pistonHonda : {
            health : 0,
            attack: 0,
            newAttack: 0,
            counterAttack: 0,
            yourCharacter: false,
            enemy: false,
            defender: false,
            img: "assets/images/minPistonHonda.png"
        },
        superMachoMan : {
            health : 0,
            attack: 0,
            newAttack: 0,
            counterAttack: 0,
            yourCharacter: false,
            enemy: false,
            defender: false,
            img: "assets/images/minSuperMachoMan.png"
        },
        vonKaiser : {
            health : 0,
            attack: 0,
            newAttack: 0,
            counterAttack: 0,
            yourCharacter: false,
            enemy: false,
            defender: false,
            img: "assets/images/minVonKaiser.png"
        }
    }, 
    setCharacter : function (character) {
        this.resetCharacter(character);
        this.characters[character].yourCharacter = true;
        this.characterSelected = true;
    },
    setEnemy : function (character) {
        this.resetCharacter(character);
        this.characters[character].enemy = true;
        this.enemiesCount--
        if(this.enemiesCount === 0){
            this.enemiesSelected = true;
        }
    },
    setDefender : function (fullEnemyCard) {
        var defenderId = $(fullEnemyCard).find('div:first').attr('id');
        var enemyCardId = fullEnemyCard.id
        this.defenderSelected = true;
        this.characters[defenderId].defender = true;
        var defenderCardId = enemyCardId.charAt(enemyCardId.length - 1);
        for(i = 1; i < 4; i++){
            if(i !== parseInt(defenderCardId)){
                $("#enemy"+i).hide();
            };
        };
        $(fullEnemyCard).attr("class","col-8 offset-2 enemyCard");
        gameMTPunchOut.printMessage("<h3>Let's Get Ready to Rumble...</h3>","EnemyMessage");
    },
    characterJab : function (yourCharacter, theDefender){
        this.characters[theDefender].health - this.characters[yourCharacter].newAttack;
    },
    characterUppercut : function (yourCharacter, theDefender){
        var tempAttack = this.characters[yourCharacter].newAttack + (this.characters[yourCharacter].newAttack / 2);
        this.characters[theDefender].health - tempAttack
        this.characters[yourCharacter].newAttack = this.characters[yourCharacter].attack
    },
    defenderAttack: function (yourCharacter, theDefender){
        this.chracters[yourCharacter].health - this.characters[theDefender].counterAttack;
    },
    doubleAttack : function (yourCharacter) {
        this.characters[yourCharacter].newAttack = this.characters[yourCharacter].newAttack + this.characters[yourCharacter].attack;
    },
    counterAttack : function(yourCharacter, theDefender) {
        this.characters[yourCharacter].health - this.characters[theDefender].counterAttack;
    },
    resetCharacter : function(character) {
        this.characters[character].health = 100;
        this.characters[character].attack = Math.trunc(Math.random() * 5 + 1);
        this.characters[character].counterAttack = Math.trunc(Math.random() * 20);
        this.characters[character].newAttack = this.characters[character].attack;
        this.characters[character].yourCharacter = false;
        this.characters[character].enemy = false;
        this.characters[character].defender = false;
    },
    resetGamereset : function(){
        this.resetCharacter("donFlamenco");
        this.resetCharacter("glassJoe");
        this.resetCharacter("mikeTyson");
        this.resetCharacter("pistonHonda");
        this.resetCharacter("superMachoMan");
        this.resetCharacter("vonKaiser");
        this.characterSelected = false;
        this.enemiesSelected = false;
        this.defenderSelected = false;
    },
    moveCard : function(character,location){
        $("#"+ location).html(character);
    },
    printMessage : function(message,location){
        $("#"+ location).html(message);
    },
    fightReady : function(){
        gameMTPunchOut.printMessage("<h3>Select from an enemy below to start a fight:</h3>","EnemyMessage")

    }
};

$(document).ready(function() {
    $("#actualGame").hide();
    gameMTPunchOut.printMessage("<h2>Select Your Character</h2>", "setupMessages")
});

$(".playerCard").on("click", function(){
    var fullPlayerCard = this;
    if (!gameMTPunchOut.characterSelected){
        gameMTPunchOut.setCharacter(fullPlayerCard.id)
        gameMTPunchOut.moveCard(fullPlayerCard,"yourCharacter")
        $("#yourCharacter").attr("class","col-8 offset-2 my-2");
        gameMTPunchOut.printMessage("<h2>Select " + gameMTPunchOut.enemiesCount + " Opponents</h2>", "setupMessages")
    } else if (!gameMTPunchOut.enemiesSelected && !gameMTPunchOut.characters[fullPlayerCard.id].yourCharacter && !gameMTPunchOut.characters[fullPlayerCard.id].enemy) {
        gameMTPunchOut.moveCard(fullPlayerCard,"enemy"+gameMTPunchOut.enemiesCount)
        gameMTPunchOut.setEnemy(fullPlayerCard.id)
        gameMTPunchOut.printMessage("<h2>Select " + gameMTPunchOut.enemiesCount + " More Opponents</h2>", "setupMessages")
        if (gameMTPunchOut.enemiesSelected && $("#actualGame:visible").length === 0 ){
            $("#actualGame").show();
            $("#playerCards").hide();
            gameMTPunchOut.fightReady()
        }
    }
});


$(".enemyCard").on("click", function(){
    var fullEnemyCard = this;
    if(!that.defenderSelected){
        gameMTPunchOut.setDefender(fullEnemyCard);
        gameMTPunchOut.printMessage("<h2>Select an Attack!</h2>", "CharacterMessage")
    }
});

$("#jab").on("click", function(){
    console.log(this);
    console.log(this.type);
    console.log(this.id);
});

$("#uppercut").on("click", function(){
    console.log(this);
    console.log(this.type);
    console.log(this.id);
});

