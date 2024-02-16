$(document).ready(function () {
    klimaspiel.checkForProgress()
    $("#playintro").click(function () {
        $("#blockInstructionCard").fadeToggle();
        $("#whiteScreenOverlay").fadeToggle();  // Hide the white-screen overlay
    });
    $(".getstarted").click(function () {
        $("#blockInstructionCard").fadeOut();
        $("#whiteScreenOverlay").fadeOut();  // Hide the white-screen overlay
    });
    // $(window).click(function(e){ if(e.target.classList =="white-screen-overlay" || e.target.classList=="standard") {$("#whiteScreenOverlay").fadeOut(); 
    // $("#blockmigrate").fadeOut();
    // $("#blockInstructionCard").fadeOut();}})
    



})



var klimaspiel = {
    currPage: 0,
    AnzahlPlayer: 0,
    klimakostenSued: 0,
    klimakostenNord: 0,
    klimateilerNord: 0, 
    klimateilerSued: 0, 
    anzahlPNord: 0, 
    anzahlPSued: 0, 
    yolosRound: [],
    year: [2010, 2020, 2030, 2040, 2050, 2060, 2070, 2080],
    roundnum: 0,

    loadPage() {
        $(".content").hide().load("main.html").fadeIn(2000)
    },

    round() {
        klimaspiel.roundnum = klimaspiel.roundnum + 1;

        $(".content").hide().load("round.html", function () {
            $(".round_num").html(klimaspiel.roundnum)
            $(".round_num_plus").html(klimaspiel.roundnum + 1)
            if (klimaspiel.roundnum >= 1 && klimaspiel.roundnum < 4) {
                $(".Anmoderation").css("display", "revert")
                $(".year").html(klimaspiel.year[klimaspiel.roundnum - 1])
                $(".num_yolos").html(klimaspiel.yolosRound[klimaspiel.roundnum - 1])
            }
            if (klimaspiel.roundnum == 4) {
                $(".Anmoderation_lvl2").css("display", "revert")
                $(".year").html(klimaspiel.year[klimaspiel.roundnum - 1])
                $(".num_yolos").html(klimaspiel.yolosRound[klimaspiel.roundnum - 1])
                $(".klimakostenSued").html(klimaspiel.klimakostenSued)
                $(".klimakostenNord").html(klimaspiel.klimakostenNord)
                $(".only_round_4").css("display", "revert")
                $("#migratebutton").css("display", "revert")
            }
            if (klimaspiel.roundnum > 4 &&  klimaspiel.roundnum < 9) {
                $(".Anmoderation_lvl3").css("display", "revert")
                $("#migratebutton").css("display", "revert")
                $(".year").html(klimaspiel.year[klimaspiel.roundnum - 1])
                let sumyolos = 0;
                klimaspiel.yolosRound.forEach((el) => sumyolos += parseInt(el));

                let currentCostSouth = Math.floor(sumyolos/klimaspiel.klimateilerSued)
                let costSouthpp = Math.floor(currentCostSouth/klimaspiel.anzahlPSued)
                let costSouth_hintere= currentCostSouth - (costSouthpp* klimaspiel.anzahlPSued)

                let currentCostNorth = Math.floor(sumyolos/klimaspiel.klimateilerNord)
                let costNorthpp = Math.floor(currentCostNorth/klimaspiel.anzahlPNord)
                let costNorth_hintere= currentCostNorth - (costNorthpp* klimaspiel.anzahlPNord)


                $(".num_yolos").html(sumyolos)
                //$(".vordere_n_sued").html(klimaspiel.anzahlPSued - costSouth_hintere)
                //$(".vordere_n_nord").html(klimaspiel.anzahlPNord - costNorth_hintere)
                $(".hintere_n_sued").html(costSouth_hintere )
                $(".hintere_n_nord").html(costNorth_hintere )
                $(".vordere_kosten_sued").html(costSouthpp + 1 )
                $(".vordere_kosten_nord").html(costNorthpp + 1)
                //$(".hintere_kosten_sued").html(costSouthpp + 2)
                //$(".hintere_kosten_nord").html(costNorthpp + 2)



            }

            if(klimaspiel.roundnum == 8){
                $(".formfield").css("display", "none")
                $("#startRound1").html("Spiel beenden")
            
            }
                

            if(klimaspiel.roundnum == 9){
                $(".Abmoderation").css("display", "revert")
                $(".formfield").css("display", "none")
                $("#startRound1").css("display", "none")
                $(".round_counter").css("display", "none")
            }

            document.cookie = "round=" + klimaspiel.roundnum  // + ";path=/" + round_number;
            document.cookie = "yolos=" + klimaspiel.yolosRound
        }).fadeIn(2000)
    },

    saveYolos(total, round) {
        if(parseInt(total)){
            klimaspiel.yolosRound.push(parseInt(total))
            document.cookie = "yolos" + klimaspiel.yolosRound
        }

    },

    checkForProgress() {
        if (getCookie("round")!='') {
            klimaspiel.AnzahlPlayer = getCookie("AnzahlPlayer")
            klimaspiel.roundnum = (parseInt(getCookie("round")) % 10) - 1 
            klimaspiel.yolosRound = getCookie("yolos").split(",")
            initInfo(parseInt(klimaspiel.AnzahlPlayer), renderGame1);
            $("#whiteScreenOverlay").fadeOut();
            setTimeout(function() {
                klimaspiel.round();  
            }, 600);
            
        } 
        else {
            $("#whiteScreenOverlay").fadeIn();  // Show the white-screen overlay
            $("#blockInstructionCard").fadeIn();
            $(".getstarted").click(function () {
                $("#blockInstructionCard").fadeToggle();
                $("#whiteScreenOverlay").fadeToggle();  // Hide the white-screen overlay
            });
            klimaspiel.loadPage()


        }

    }, 

    restart() {
        klimaspiel.roundnum=0
        klimaspiel.AnzahlPlayer= 0
        klimaspiel.yolosRound= []
        document.cookie = 'round=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
        document.cookie = 'yolos=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
        document.cookie = 'AnzahlPlayer=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
        klimaspiel.loadPage();

    }, 

    migrate(){
        $("#blockmigrate").fadeToggle();
        $("#whiteScreenOverlay").fadeToggle(); 
        $("#anzahlNorden").html(klimaspiel.anzahlPNord)
        $("#anzahlSueden").html(klimaspiel.anzahlPSued)
    }, 


    increaseSouth() {
        klimaspiel.anzahlPNord = klimaspiel.anzahlPNord - 1
        klimaspiel.anzahlPSued += 1
        $("#anzahlNorden").html(klimaspiel.anzahlPNord)
        $("#anzahlSueden").html(klimaspiel.anzahlPSued)

    }, 
    increaseNorth() {
        klimaspiel.anzahlPSued = klimaspiel.anzahlPSued - 1
        klimaspiel.anzahlPNord += 1
        $("#anzahlNorden").html(klimaspiel.anzahlPNord)
        $("#anzahlSueden").html(klimaspiel.anzahlPSued)

    }, 
    saveMigrate() {
        $("#blockmigrate").fadeToggle();
        $("#whiteScreenOverlay").fadeToggle(); 
        klimaspiel.roundnum = klimaspiel.roundnum -1 ; 
        klimaspiel.round()
    }


}


renderGame1 = function (mytable) {

    $('#num_players_south').html(mytable.numPlayer_south)

    $('#num_players_north').html(mytable.numPlayer_north)

    /*   $('#num_yolos').html(mytable.yolos_start)
  
      $('#climate_cost_south').html(mytable.cost_after_r4_south)
  
      $('#climate_cost_north').html(mytable.cost_after_r4_north)
      $('#increase_after_round_south').html(mytable.increase_after_yolos_south)
  
      $('#increase_after_round_north').html(mytable.increase_after_yolos_north) */

    klimaspiel.klimakostenSued = mytable.cost_after_r4_south
    klimaspiel.klimakostenNord = mytable.cost_after_r4_north
    klimaspiel.klimateilerNord = mytable.increase_after_yolos_north
    klimaspiel.klimateilerSued = mytable.increase_after_yolos_south
    klimaspiel.anzahlPNord = mytable.numPlayer_north
    klimaspiel.anzahlPSued = mytable.numPlayer_south
    klimaspiel.yolosRound[0] = mytable.yolos_start

}



initInfo = function (value, callback) {
    $.getJSON("planspielTableA.json", function (json) {
        tableA = json[value][0];
    })

        .then(() => callback(tableA));
}

setNumberPlayers = function (myevent) {
    initInfo(parseInt(myevent.innerHTML), renderGame1);
    $(".choiceButton").removeClass("selected");
    myevent.classList.add("selected");
    $(".tableAnfangsverteilung").css("display", "block");
    $("#beforeStart").css("display", "block");
    klimaspiel.AnzahlPlayer = parseInt(myevent.innerHTML);
    document.cookie = "AnzahlPlayer=" + klimaspiel.AnzahlPlayer
    const numcols = parseInt(myevent.innerHTML) + 1
    $(`table.Anfangsverteilung td`).css("display", "none")
    $(`table.Anfangsverteilung td:nth-child(-n+${numcols})`).css("display", "revert")
}



function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

