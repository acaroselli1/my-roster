
function PlayersController() {

  var loading = true; //Start the spinner
  var apiUrl = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
  var playersService = new PlayersService(apiUrl, drawPlayers);

  this.getPlayersByPosition = function getPlayersByPosition(e) {
    e.preventDefault();
    var players = e.target.playersByPosition.value;
    playersService.getPlayersByPosition(players,drawPlayers);
  }

  
  this.getPlayersByTeam = function getPlayersByTeam(e) {
    e.preventDefault();
    var players = e.target.playersByTeam.value;
    playersService.getPlayersByTeam(players,drawPlayers);
  }

  this.getPlayersByName = function getPlayersByName(e) {
    e.preventDefault();
    var players = e.target.playersByName.value;
    playersService.getPlayersByName(players,drawPlayers);
  }
 
  this.addPlayer = function addPlayer(id) {
  playersService.addPlayer(id,drawMyTeam);
  }

  /*
 this.addCar = function(event){
        event.preventDefault()
        var form = event.target

        var car = {
            year: form.year.value,
            make: form.make.value,
            model: form.model.value
        }

        carService.addCars(car)
        carService.getCars(drawCars)
        form.reset()
    }

*/



  this.removePlayer = function removePlayer(id) {
  playersService.removePlayer(id,drawMyTeam);
  } 


  function drawPlayers(playersList) {
    console.log(playersList[0]);
    var template = ''
    var playerElem = document.getElementById('player-output')

    for (var i = 0; i < playersList.length; i++) {
      var player = playersList[i];
      template += `
    <div class ="col-xs-3"
      <div class="player-card">
          <div class="card" style="width: 20rem;">
                    <img class="card-img-top" src="${player.photo}" width="200px" height="200px"alt="Card image cap">
                    <div class="card-block">
                       <p class="card-text text-center fullname">${player.fullname}</p>
                       <p class="card-text text-center">${player.pro_team}</p>
                       <p class="card-text text-center">${player.position}</p>
                      <div class="buttons"> 
                        <button class ="select" id = "remove"onclick="app.controllers.playersController.removePlayer(${player.id})"><span class="glyphicon glyphicon-minus-sign"></span> Remove From Team</button>
                        <button class ="select" id ="add" onclick="app.controllers.playersController.addPlayer(${player.id})"><span class="glyphicon glyphicon-plus-sign"></span> Add to Team</button>
                      </div>
                   </div>
          </div>
      </div>
    </div>
    `  
    }
    playerElem.innerHTML = template
  }

  function drawMyTeam(playersList) {
    console.log(playersList[0]);
    var template = ''
    var myTeamElem = document.getElementById('my-team-output')

    for (var i = 0; i < playersList.length; i++) {
      var player = playersList[i];
      template += `
    <div class ="col-xs-3"
      <div class="player-card">
          <div class="card" style="width: 20rem;">
                    <img class="card-img-top" src="${player.photo}" width="200px" height="200px"alt="Card image cap">
                    <div class="card-block">
                       <p class="card-text text-center fullname">${player.fullname}</p>
                       <p class="card-text text-center">${player.pro_team}</p>
                       <p class="card-text text-center">${player.position}</p>
                    </div>
          </div>
      </div>
    </div>
    `  
    }
    myTeamElem.innerHTML = template
  }


}


