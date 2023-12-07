var playing = false;
var score;
var trialsleft;
var step;
var action;
var fruits = ['apple', 'banana', 'cherry', 'mango', 'orange', 'pineapple', 'pomegranate', 'strawberry', 'watermelon'];

$(function () {
    //click on start reset button
    $("#startreset").click(function () {
        //if we are playing
        if (playing == true) {
            //reload page
            location.reload();
        }
        else {
            //we are not playing
            playing = true;  //game initate
            //set score to 0
            score = 0;
            $("#scorevalue").html(score);

            //show trials left 
            $("#trialsleft").show();
            trialsleft = 3;
            addHearts();

            //hide gameOver box
            $("#gameOver").hide();

            //change button text to reset game
            $("#startreset").html("Reset Game");

            //start sending fruits
            startAction();

        }
    });
    

    $("#fruit1").click(function(){
        score++;
        $("#scorevalue").html(score); //update score

        //document.getElementById("slice").play();
        $("#slice")[0].play();
        
        //stop fruit
        clearInterval(action);

        //hide fruit
        $("#fruit1").hide("explode", 500); //slice fruit


        //send new fruit
        setTimeout(startAction, 800);
    });

    //fill trialsleft box with hearts
    function addHearts() {
        $("#trialsleft").empty();
        for (i = 0; i < trialsleft; i++) {
            $("#trialsleft").append(' <img src="images/heart.png" class="life"> ');
        }
    }

    //start sending fruits

    function startAction() {

        //generate a fruit
        $("#fruit1").show();
        chooseFruit(); //choose a random fruit
        $("#fruit1").css({ 'left': Math.round(750 * Math.random()), 'top': -100 }); //random position


        //generate a random step
        step = 1 + Math.round(5 * Math.random()); //change step

        //move fruit by on este[ every 10ms
        action = setInterval(function () {
            $("#fruit1").css('top', $("#fruit1").position().top + step);

             //check fruit is too low
         if ($("#fruit1").position().top > $("#fruitContainer").height()) {
            //check trail left
            if (trialsleft > 1) {
                $("#fruit1").show();
                chooseFruit();
                $("#fruit1").css({ 'left': Math.round(700 * Math.random()), 'top': -100 });
                //random position

                //generate a random step
                step = 1 + Math.round(5*Math.random()); //change step

                //reduce trials by one
                trialsleft--;

                //populate trialsleft box
                addHearts();

            }
            else {   //gameOver
                playing = false;

                $("#startreset").html("Start Game");  //chenge button
                $("#gameOver").show();
                $("#gameOver").html('<p>Game Over!</p><p>Your score is ' + score + '</p>');
                $("#trialsleft").hide();
                stopAction();
            }
        }

     }, 2);
   }

    //generate a random keyword

    function chooseFruit() {
        $("#fruit1").attr('src', 'images/' + fruits[Math.round(8 * Math.random())] + '.png');
    }

    //stop dropping fruits
    function stopAction() {
        clearInterval(action);
        $("#fruit1").hide();
    }

});


