

var PlayersService = function(endpointUri, callback){
    var playersData = [];
    
    this.getPlayersByTeam = function(teamName, cb){
    var list =	playersData.filter(function(player){
    	  if(player.pro_team == teamName){
    	    return true;
        }
      });
   console.log(list)
      cb(list);
    }
    
    this.getPlayersByPosition = function(position,cb){
    var list=    playersData.filter(function(player){
          if(player.position == position){
            return true;
          }
          });
   cb(list);
   }
    
    this.getPlayersByName = function(playerName,cb){
     var list=   playersData.filter(function(player){
          if(player.fullname == playerName){
            return true;
          }
          });
    cb(list);
    }
    
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
loadPlayersData(); //call the function above every time we create a new service
} 