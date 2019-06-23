var that = this;
var gameMTPunchOut = {
    characterSelected : false,
    characterName: "",
    enemiesCount : 3,
    enemyCard : 0,
    enemiesSelected : false,
    defenderSelected : false,
    defenderName: "",
    characters : {
        donFlamenco : { 
            health : 0,
            attack: 0,
            newAttack: 0,
            counterAttack: 0,
            defender: false,
            yourCharacter: false,
            enemy: false,
            defeated: false
        },
        glassJoe : { 
            health : 0,
            attack: 0,
            newAttack: 0,
            counterAttack: 0,
            yourCharacter: false,
            enemy: false,
            defender: false,
            defeated: false
        },
        mikeTyson : {
            health : 0,
            attack: 0,
            newAttack: 0,
            counterAttack: 0,
            yourCharacter: false,
            enemy: false,
            defender: false,
            defeated: false
        },
        pistonHonda : {
            health : 0,
            attack: 0,
            newAttack: 0,
            counterAttack: 0,
            yourCharacter: false,
            enemy: false,
            defender: false,
            defeated: false
        },
        superMachoMan : {
            health : 0,
            attack: 0,
            newAttack: 0,
            counterAttack: 0,
            yourCharacter: false,
            enemy: false,
            defender: false,
            defeated: false
        },
        vonKaiser : {
            health : 0,
            attack: 0,
            newAttack: 0,
            counterAttack: 0,
            yourCharacter: false,
            enemy: false,
            defender: false,
            defeated: false
        }
    }, 
    setCharacter : function (character) {
        this.characterName = character.id;
        this.setCharacterStats(character.id);
        this.characters[character.id].yourCharacter = true;
        this.characterSelected = true;
        $("#yourCharacter").attr("class","col-5 offset-1 col-lg-4 col-offset-lg-2 my-2 h-50");
    },
    setEnemy : function (character) {
        this.characters[character.id].enemy = true;
        this.enemiesCount--
        if(this.enemiesCount === 0){
            this.enemiesSelected = true;
        }
    },
    setDefender : function (fullEnemyCard) {
        var defenderId = $(fullEnemyCard).find('div:first').attr('id');
        this.setCharacterStats(defenderId);
        this.characters[defenderId].enemy = true;
        var enemyCardId = fullEnemyCard.id
        this.enemyCard = enemyCardId.charAt(enemyCardId.length - 1);
        this.defenderName = defenderId;
        this.defenderSelected = true;
        this.characters[defenderId].defender = true;
        gameMTPunchOut.hideEnemies(this.enemyCard)
        $(fullEnemyCard).attr("class","col-6 offset-3 col-lg-4 enemyCard");
        gameMTPunchOut.printMessage("<h3>Let's Get Ready to Rumble...</h3>","EnemyMessage");
        $("#jab").show();
        if(gameMTPunchOut.characters[gameMTPunchOut.characterName].newAttack > 19){
            $("#uppercut").show();
        }
    },
    characterJab : function (yourCharacter, theDefender){
        this.characters[theDefender].health = this.characters[theDefender].health - this.characters[yourCharacter].newAttack;
        gameMTPunchOut.counterAttack(yourCharacter,theDefender);
        gameMTPunchOut.updateHealth(yourCharacter,theDefender);
        gameMTPunchOut.doubleAttack(gameMTPunchOut.characterName);
        if(gameMTPunchOut.characters[yourCharacter].newAttack > 19){
            $("#uppercut").show();
        }
        if(!gameMTPunchOut.healthRemainingEval(yourCharacter)){
            this.updateAttackMessage(4);
            setTimeout(function(){
                $("#theEnemies").hide();
            },2000);
        };
    },
    characterUppercut : function (yourCharacter, theDefender){
        //temporarily store original Attack value
        var tempAttack = this.characters[yourCharacter].newAttack;
        this.characters[yourCharacter].newAttack = Math.trunc(this.characters[yourCharacter].newAttack + (this.characters[yourCharacter].newAttack / 2));
        this.characters[theDefender].health = this.characters[theDefender].health - this.characters[yourCharacter].newAttack        
        gameMTPunchOut.counterAttack(yourCharacter,theDefender);
        gameMTPunchOut.updateHealth(yourCharacter,theDefender);
        //reset's newAttack Power after using and displaying upperCut hit
        this.characters[yourCharacter].newAttack = tempAttack;
        this.characters[yourCharacter].newAttack = Math.trunc(this.characters[yourCharacter].newAttack / 2)
        if(gameMTPunchOut.characters[yourCharacter].newAttack < 20){
            $("#uppercut").hide();
        }
        if(!gameMTPunchOut.healthRemainingEval(yourCharacter)){
            this.updateAttackMessage(4);
            setTimeout(function(){
                $("#theEnemies").hide();
            },2000);
        };
    },
    defenderAttack: function (yourCharacter, theDefender){
        this.chracters[yourCharacter].health - this.characters[theDefender].counterAttack;
    },
    doubleAttack : function (yourCharacter) {
        this.characters[yourCharacter].newAttack = this.characters[yourCharacter].newAttack + this.characters[yourCharacter].attack;
    },
    counterAttack : function(yourCharacter, theDefender) {
        if(gameMTPunchOut.healthRemainingEval(theDefender)){
            this.characters[yourCharacter].health = this.characters[yourCharacter].health - this.characters[theDefender].counterAttack;
            this.updateAttackMessage(1);
        } else {
            this.characters[theDefender].defeated = true;
            this.updateAttackMessage(2);
            setTimeout(function(){
                gameMTPunchOut.showEnemies()
            },2000);
        }
    },
    setCharacterStats : function(character) {
        this.characters[character].health = 100;
        if(!this.characterSelected){
            this.characters[character].attack = Math.trunc(Math.random() * (4 - 2) + 2);
            this.characters[character].newAttack = this.characters[character].attack;
        } else {
            if(this.enemiesCount === 0){
                this.characters[character].counterAttack = Math.trunc(Math.random() * (5 - 3 ) + 3);
                this.enemiesCount++
            } else {
                this.characters[character].counterAttack = Math.trunc(Math.random() * (15 - 10 ) + 10);
                this.enemiesCount++
            }
        }
        this.characters[character].yourCharacter = false;
        this.characters[character].enemy = false;
        this.characters[character].defender = false;
        this.characters[character].defeated = false;
    },
    resetCharacter: function(character){
        this.characters[character].health = 0;
        this.characters[character].attack = 0;
        this.characters[character].counterAttack = 0;
        this.characters[character].newAttack = 0;
        this.characters[character].yourCharacter = false;
        this.characters[character].enemy = false;
        this.characters[character].defender = false;
        this.characters[character].defeated = false;
    },
    moveCard : function(character,location){
        $("#"+ location).html(character);
    },
    printMessage : function(message,location){
        $("#"+ location).html(message);
    },
    fightReady : function(){
        gameMTPunchOut.printMessage("<h5>The Enemies</h5>","EnemyMessage")
        gameMTPunchOut.printMessage("<h5>Select a defender from \"the Enemines\" to start a fight:</h5>","CharacterMessage")

    },
    healthRemainingEval : function(character){
        if(gameMTPunchOut.characters[character].health < 1){
            return false;
        } else {
            return true;
        };
    },
    updateHealth : function(yourCharacter,theDefender){
        gameMTPunchOut.printMessage("Health: " + gameMTPunchOut.characters[yourCharacter].health, yourCharacter+"HealthMsg")
        gameMTPunchOut.printMessage("Health: " + gameMTPunchOut.characters[theDefender].health, theDefender+"HealthMsg")
    },
    checkAttackBtn : function(){
        if(!gameMTPunchOut.healthRemainingEval(gameMTPunchOut.characterName) || !gameMTPunchOut.healthRemainingEval(gameMTPunchOut.defenderName)){
            if(gameMTPunchOut.healthRemainingEval(gameMTPunchOut.defenderName)){
                this.updateAttackMessage(5);
            }
            $("#jab").hide();
            $("#uppercut").hide();
        }
    },
    updateAttackMessage : function (eval){
        switch(eval){
            case 1:
                gameMTPunchOut.printMessage("<p>You Attacked for: " + this.characters[gameMTPunchOut.characterName].newAttack + "</p><p> Defender Attacked for: " + this.characters[gameMTPunchOut.defenderName].counterAttack +"</p>","AttackResultMsg");
                break;
            case 2:
                gameMTPunchOut.printMessage("<p>You Attacked for: " + this.characters[gameMTPunchOut.characterName].newAttack + "</p><p>Your opponent was defeated; Enemies will reload in a moment.</p>","AttackResultMsg");
                break;
            case 3:
                gameMTPunchOut.printMessage("<p>Your current Attack Power: " + this.characters[gameMTPunchOut.characterName].newAttack + "</p>","AttackResultMsg");
                break;
            case 4:
                gameMTPunchOut.printMessage("<p>Valiant Effort but \"the Enemies\" have defeated you.</p><p>Better Luck Next Time</p>","AttackResultMsg");
                break;
            case 5:
                gameMTPunchOut.printMessage("<p>Congratulations you have defeated all \"Enemies\" click the reset button to play again.</p>","AttackResultMsg");
                break;
        };
    },
    hideEnemies : function (defenderCardId){
        for(i = 1; i < 4; i++){
            if(i !== parseInt(defenderCardId)){
                $("#enemy"+i).hide();
            };
        };
    },
    showEnemies : function (){
        for(i = 1; i < 4; i++){
            if(( parseInt(this.enemyCard) === i)){
                $("#enemy"+i).empty();
                $("#enemy"+i).attr("class","");
            } else {
                $("#enemy"+i).show();
            }
        };
        this.defenderSelected = false;
        gameMTPunchOut.fightReady();
        gameMTPunchOut.updateAttackMessage(3);
    },

};
$(document).ready(function() {
    $("#actualGame").hide();
    $("#jab").hide();
    $("#uppercut").hide();
    gameMTPunchOut.printMessage("<h2>Select Your Character</h2>", "setupMessages");
});
$(".playerCard").on("click", function(){
    var fullPlayerCard = this;
    if (!gameMTPunchOut.characterSelected){
        gameMTPunchOut.setCharacter(fullPlayerCard)
        gameMTPunchOut.moveCard(fullPlayerCard,"yourCharacter")
        gameMTPunchOut.printMessage("<h2>Select " + gameMTPunchOut.enemiesCount + " Opponents</h2>", "setupMessages")
    } else if (!gameMTPunchOut.enemiesSelected && !gameMTPunchOut.characters[fullPlayerCard.id].yourCharacter && !gameMTPunchOut.characters[fullPlayerCard.id].enemy) {
        gameMTPunchOut.moveCard(fullPlayerCard,"enemy"+gameMTPunchOut.enemiesCount)
        gameMTPunchOut.setEnemy(fullPlayerCard)
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
    if(gameMTPunchOut.characterSelected && gameMTPunchOut.defenderSelected){
        if(gameMTPunchOut.healthRemainingEval(gameMTPunchOut.characterName) && gameMTPunchOut.healthRemainingEval(gameMTPunchOut.defenderName)){
                gameMTPunchOut.characterJab(gameMTPunchOut.characterName, gameMTPunchOut.defenderName);
        };
        gameMTPunchOut.checkAttackBtn();
    }
});
$("#uppercut").on("click", function(){
    if(gameMTPunchOut.characterSelected && gameMTPunchOut.defenderSelected){
        if(gameMTPunchOut.healthRemainingEval(gameMTPunchOut.characterName) && gameMTPunchOut.healthRemainingEval(gameMTPunchOut.defenderName)){
            gameMTPunchOut.characterUppercut(gameMTPunchOut.characterName, gameMTPunchOut.defenderName);
        };
        gameMTPunchOut.checkAttackBtn();
    };
});
$("#reset").on("click", function(){
    if(confirm("Are you sure you want to Restart the game?")){
        location.reload();
    }
});
