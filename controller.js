
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
                    <img class="card-img-top" src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/" alt="Card image cap">
                    <div class="card-block">
                       <p class="card-text text-center">${player.fullname}</p>
                       <p class="card-text text-center">${player.pro_team}</p>
                       <p class="card-text text-center">${player.position}</p>
                    </div>
          </div>
      </div>
    </div>
    `  
    }
    playerElem.innerHTML = template
  }



}


