

var PlayersService = function(endpointUri, callback){
    var playersData = [];
    var myRoster = JSON.parse(localStorage.getItem('myRoster'))|| []

    function saveRoster(){
        localStorage.setItem('myRoster', JSON.stringify(myRoster))
    }

    this.getPlayersByTeam = function(teamName, cb){
    var list = playersData.filter(function(player){
    	  if(player.pro_team == teamName){
    	    return true;
        }
      });
   console.log(list)
      cb(JSON.parse(JSON.stringify(list)));
    }
    
    this.getPlayersByPosition = function(position,cb){
    var list= playersData.filter(function(player){
          if(player.position == position){
            return true;
          }
          });
   cb(JSON.parse(JSON.stringify(list)))
   }
    
    this.getPlayersByName = function(playerName,cb){
     var list= playersData.filter(function(player){
          if(player.fullname == playerName){
            return true;
          }
          });
     cb(JSON.parse(JSON.stringify(list)))
    }
    
    
   this.addPlayer = function(id, cb){
    for (var i=0;i<playersData.length;i++){
       var player = playersData[i];
      if (player.id==id){
        console.log(myRoster)
        if ((myRoster.indexOf(player)) ==-1 && (myRoster.length < 11)){
         myRoster.push(player)
         saveRoster()
         }
       }
    }
        cb(JSON.parse(JSON.stringify(myRoster)))
    }

   this.removePlayer = function(id,cb){
    for (var i=0;i<playersData.length;i++){
       var player = playersData[i];
      if (player.id==id){
         if (myRoster.indexOf(player)!=-1){
          var index = myRoster.indexOf(player);
         myRoster.splice(index,1);
         saveRoster()
         }
       }
    }
        cb(JSON.parse(JSON.stringify(myRoster)))
    }

/*
function CarService() {

    var cars = JSON.parse(localStorage.getItem('cars')) || []

    function saveCars(){
        localStorage.setItem('cars', JSON.stringify(cars))
    }

    this.getCars = function(cb) {
        cb(JSON.parse(JSON.stringify(cars)))
    }

    this.addCars = function(car){
        cars.push(car)
        saveCars()
    }


}

*/

    /*
   document.getElementById('my-team-output').innerHTML += document.getElementById('player-output').innerHTML;
   document.getElementById('player-output').innerHTML = '';
   return true
  */
   

    function loadPlayersData(){
      
      //Lets check the localstorage for the data before making the call.
      //Ideally if a user has already used your site 
      //we can cut down on the load time by saving and pulling from localstorage 
      
      var localData = localStorage.getItem('playersData');
      if(localData){
      	playersData = JSON.parse(localData);
      	return callback(playersData); 
      	//return will short-circuit the loadPlayersData function
      	//this will prevent the code below from ever executing
      }
      
      var url = "https://bcw-getter.herokuapp.com/?url=";
      var endpointUri = "https://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
      var apiUrl = url + encodeURIComponent(endpointUri);
    
        $.getJSON(apiUrl, function(data){
          playersData = data.body.players;
          console.log('Player Data Ready')
          console.log('Writing Player Data to localStorage')
          localStorage.setItem('playersData', JSON.stringify(playersData))
          console.log('Finished Writing Player Data to localStorage')
          console.log(playersData);
          
          callback(playersData)
        });
     
    }
    
    console.log(callback)
loadPlayersData(); //call the function above every time we create a new service
}