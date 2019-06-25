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
            defeated: false,
            microImg: "assets/images/microDonFlamenco.png"
        },
        glassJoe : { 
            health : 0,
            attack: 0,
            newAttack: 0,
            counterAttack: 0,
            yourCharacter: false,
            enemy: false,
            defender: false,
            defeated: false,
            microImg: "assets/images/microGlassJoe.png"
        },
        mikeTyson : {
            health : 0,
            attack: 0,
            newAttack: 0,
            counterAttack: 0,
            yourCharacter: false,
            enemy: false,
            defender: false,
            defeated: false,
            microImg: "assets/images/microMikeTyson.png"
        },
        pistonHonda : {
            health : 0,
            attack: 0,
            newAttack: 0,
            counterAttack: 0,
            yourCharacter: false,
            enemy: false,
            defender: false,
            defeated: false,
            microImg: "assets/images/microPistonHonda.png"
        },
        superMachoMan : {
            health : 0,
            attack: 0,
            newAttack: 0,
            counterAttack: 0,
            yourCharacter: false,
            enemy: false,
            defender: false,
            defeated: false,
            microImg: "assets/images/microSuperMachoMan.png"
        },
        vonKaiser : {
            health : 0,
            attack: 0,
            newAttack: 0,
            counterAttack: 0,
            yourCharacter: false,
            enemy: false,
            defender: false,
            defeated: false,
            microImg: "assets/images/microVonKaiser.png"
        }
    }, 
    setCharacter : function (character) {
        this.characterName = character.id;
        this.setCharacterStats(character.id);
        this.characters[character.id].yourCharacter = true;
        this.characterSelected = true;
        $("#"+this.characterName).attr('class',"card-img-bottom w-100 center-block m-auto");
        $("#yourCharacter").attr("class","col-5 offset-1 col-lg-4 col-offset-lg-2 my-2 h-100")
        this.addCharacterHealthBar(character.id);
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
        this.setMicroImage();
        this.addDefenderHealthBar("theDefender");
        this.hideEnemies(this.enemyCard)
    },
    characterJab : function (yourCharacter, theDefender){
        this.characters[theDefender].health = this.characters[theDefender].health - this.characters[yourCharacter].newAttack;
        this.doubleAttack(this.characterName);
        this.updateHealth(yourCharacter,theDefender);
        if(!this.healthRemainingEval(yourCharacter)){
            this.updateAttackMessage(4);
        };
    },
    characterUppercut : function (yourCharacter, theDefender){
        //temporarily store original Attack value
        var tempAttack = this.characters[yourCharacter].newAttack;
        this.characters[yourCharacter].newAttack = Math.trunc(this.characters[yourCharacter].newAttack + (this.characters[yourCharacter].newAttack / 2));
        this.characters[theDefender].health = this.characters[theDefender].health - this.characters[yourCharacter].newAttack
        //reset's newAttack Power after using and displaying upperCut hit
        this.characters[yourCharacter].newAttack = tempAttack;
        this.characters[yourCharacter].newAttack = Math.trunc(this.characters[yourCharacter].newAttack / 2)
        this.updateHealth(yourCharacter,theDefender);
        if(!this.healthRemainingEval(yourCharacter)){
            this.updateAttackMessage(4);
            that.gameMTPunchOut.printMessage("<h2>Better Luck Next Time!</h2>", "CharacterMessage")
        };
    },
    defenderAttack: function (yourCharacter, theDefender){
        this.chracters[yourCharacter].health - this.characters[theDefender].counterAttack;
    },
    doubleAttack : function (yourCharacter) {
        this.characters[yourCharacter].newAttack = this.characters[yourCharacter].newAttack + this.characters[yourCharacter].attack;
    },
    counterAttack : function(yourCharacter, theDefender) {
        if(this.healthRemainingEval(theDefender)){
            this.characters[yourCharacter].health = this.characters[yourCharacter].health - this.characters[theDefender].counterAttack;
            this.updateAttackMessage(1);
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
        this.printMessage("<h5>The Enemies</h5>","EnemyMessage")
        this.printMessage("<h5>Select a defender from \"the Enemines\" to start a fight:</h5>","CharacterMessage")

    },
    healthRemainingEval : function(character){
        if(this.characters[character].health < 1){
            return false;
        } else {
            return true;
        };
    },
    updateHealth : function(yourCharacter){
        this.printMessage("Health: " + this.characters[yourCharacter].health, yourCharacter+"HealthMsg")
        this.printMessage("Health: " + this.characters[this.defenderName].health, "theDefenderHealthMsg")

    },
    checkAttackBtn : function(){
        if(!this.healthRemainingEval(this.characterName) || !this.healthRemainingEval(this.defenderName)){
            if(this.healthRemainingEval(this.defenderName)){
                this.updateAttackMessage(4);
            } else {
                if(this.enemiesCount !== 3){
                    this.clearMicroImage();
                    $("#jab").hide();
                    $("#uppercut").hide();
                    this.showEnemies();
                } else {
                    $("#jab").hide();
                    $("#uppercut").hide();
                    this.updateAttackMessage(5);
                }
            }
        } else {
            if($("#jab:visible").length === 0 ){
                that.gameMTPunchOut.printMessage("<h2>Select an Attack!</h2>", "CharacterMessage")
                $("#jab").show();
            }
            if(this.characters[this.characterName].newAttack < 20){
                $("#uppercut").hide();
            } else if (this.characters[this.characterName].newAttack > 19){
                $("#uppercut").show();
            }
        };
    },
    updateAttackMessage : function (eval){
        switch(eval){
            case 1:
                this.printMessage("<p>You Attacked for: " + this.characters[this.characterName].newAttack + "</p><p> Defender Attacked for: " + this.characters[this.defenderName].counterAttack +"</p>","AttackResultMsg");
                break;
            case 2:
                this.printMessage("<p>You Attacked for: " + this.characters[this.characterName].newAttack + "</p><p>Your opponent was defeated; Enemies will reload in a moment.</p>","AttackResultMsg");
                break;
            case 3:
                this.printMessage("","AttackResultMsg");
                this.printMessage("<h5>The Enemies</h5>","EnemyMessage")
                this.printMessage("<h5>Select a defender from \"the Enemies\" to start a fight:</h5>","CharacterMessage")
                break;
            case 4:
                this.printMessage("<p>Valiant Effort but \"the Enemies\" have defeated you.</p><p>Better Luck Next Time</p>","AttackResultMsg");
                this.printMessage("<h2>Better Luck Next Time!</h2>", "CharacterMessage")
                break;
            case 5:
                this.printMessage("<p>Congratulations you have defeated all \"Enemies\" click the reset button to play again.</p>","AttackResultMsg");
                this.printMessage("<h2>Congratulations you have Won!</h2>", "CharacterMessage")
                break;
        };
    },
    hideEnemies : function (){
        $("#theEnemies").hide();
        for(i = 1; i < 4; i++){
                $("#enemy"+i).hide();
        };
    },
    addCharacterHealthBar: function (elementId){
        $('#'+elementId).prepend('<div class="card-header bg-success border-bottom-0 w-100" id="' + elementId + 'HealthMsg"></div>')
    },
    addDefenderHealthBar: function (elementId){
        $('#'+elementId).prepend('<div class="card border"><div class="card-header bg-success border-bottom-0 w-100" id="' + elementId + 'HealthMsg"></div></div>')
    },
    clearMicroImage: function(){
       $("#theDefender").empty('');
    },
    setMicroImage: function (){
        $("#theDefender").html('<img src="' + this.characters[this.defenderName].microImg + '" class="card-img-bottom mx-auto" alt="theDefenderImage">');
    },
    showEnemies: function (){
        for(i = 1; i < 4; i++){
            if(( parseInt(this.enemyCard) === i)){
                $("#enemy"+i).empty();
                $("#enemy"+i).attr("class","");
            } else {
                $("#enemy"+i).show();
            }
        };
        if(this.enemiesCount !== 3){
            this.defenderSelected = false;
            $("#theEnemies").show();
            this.updateAttackMessage(3);
            return true;
        }
    }
};
$(document).ready(function() {
    $("#actualGame").hide();
    $("#jab").hide();
    $("#uppercut").hide();
    that.gameMTPunchOut.printMessage("<h2>Select Your Character</h2>", "setupMessages");
});
$(".playerCard").on("click", function(){
    var fullPlayerCard = this;
    if (!that.gameMTPunchOut.characterSelected){
        that.gameMTPunchOut.setCharacter(fullPlayerCard)
        that.gameMTPunchOut.moveCard(fullPlayerCard,"yourCharacter")
        that.gameMTPunchOut.printMessage("<h2>Select " + that.gameMTPunchOut.enemiesCount + " Opponents</h2>", "setupMessages")
    } else if (!that.gameMTPunchOut.enemiesSelected && !that.gameMTPunchOut.characters[fullPlayerCard.id].yourCharacter && !that.gameMTPunchOut.characters[fullPlayerCard.id].enemy) {
        that.gameMTPunchOut.moveCard(fullPlayerCard,"enemy"+that.gameMTPunchOut.enemiesCount)
        that.gameMTPunchOut.setEnemy(fullPlayerCard)
        that.gameMTPunchOut.printMessage("<h2>Select " + that.gameMTPunchOut.enemiesCount + " More Opponents</h2>", "setupMessages")
        if (that.gameMTPunchOut.enemiesSelected && $("#actualGame:visible").length === 0 && that.gameMTPunchOut.enemiesCount !== 3){
            $("#actualGame").show();
            $("#playerCards").hide();
            that.gameMTPunchOut.fightReady()
        }
    }
    
});
$(".enemyCard").on("click", function(){
    var fullEnemyCard = this;
    if(!that.gameMTPunchOut.defenderSelected){
        that.gameMTPunchOut.setDefender(fullEnemyCard);
    }
    that.gameMTPunchOut.checkAttackBtn();
});
$("#jab").on("click", function(){
    if(that.gameMTPunchOut.characterSelected && that.gameMTPunchOut.defenderSelected){
        if(that.gameMTPunchOut.healthRemainingEval(that.gameMTPunchOut.characterName) && that.gameMTPunchOut.healthRemainingEval(that.gameMTPunchOut.defenderName)){
                that.gameMTPunchOut.characterJab(that.gameMTPunchOut.characterName, that.gameMTPunchOut.defenderName);
        }
        if(that.gameMTPunchOut.healthRemainingEval(that.gameMTPunchOut.defenderName)){
            that.gameMTPunchOut.counterAttack(that.gameMTPunchOut.characterName, that.gameMTPunchOut.defenderName);
            that.gameMTPunchOut.updateHealth(that.gameMTPunchOut.characterName,that.gameMTPunchOut.defenderName);
            that.gameMTPunchOut.checkAttackBtn();
        } else {
            that.gameMTPunchOut.checkAttackBtn();
        }
    }
});
$("#uppercut").on("click", function(){
    if(that.gameMTPunchOut.characterSelected && that.gameMTPunchOut.defenderSelected){
        if(that.gameMTPunchOut.healthRemainingEval(that.gameMTPunchOut.characterName) && that.gameMTPunchOut.healthRemainingEval(that.gameMTPunchOut.defenderName)){
            that.gameMTPunchOut.characterUppercut(that.gameMTPunchOut.characterName, that.gameMTPunchOut.defenderName);
        };
        if(that.gameMTPunchOut.healthRemainingEval(that.gameMTPunchOut.defenderName)){
            that.gameMTPunchOut.counterAttack(that.gameMTPunchOut.characterName, that.gameMTPunchOut.defenderName);
            that.gameMTPunchOut.updateHealth(that.gameMTPunchOut.characterName,that.gameMTPunchOut.defenderName);
            that.gameMTPunchOut.checkAttackBtn();
        } else {
            that.gameMTPunchOut.checkAttackBtn();
        }
    };
});
$("#reset").on("click", function(){
    if(confirm("Are you sure you want to Restart the game?")){
        location.reload();
    }
});
