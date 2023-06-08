var buttonColor=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;

$(document).keydown(function(){

    if(!started) {
    
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
    }

})

$(".btn").click(function() {
    var userChosenColor=this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    CheckAnswer(userClickedPattern.length-1);
})

function CheckAnswer(currentLevel){
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if (userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();},
                1000);
        }
    }
    else {
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");
        $("h1").text("Game Over,Press Any Key To Restart..!!")

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        
        startOver();
    }

}


function nextSequence () {

    userClickedPattern=[];
    
    level++ ;

    $("#level-title").text("Level "+level);
    
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);  

    
}

function startOver() {
    gamePattern=[];
    level=0;
    started=false;
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");},100);
}


function playSound(name){
    var audio= new Audio("sounds/" + name + ".mp3");
    audio.play();
}
