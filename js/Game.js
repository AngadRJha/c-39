class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }
// all the code gets executed in a sequence
// database is remote
// to capture the data and bring it back it takes time
// await and async are together
  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1Img)
    car2 = createSprite(300,200);
    car2.addImage("car2",car2Img)
    car3 = createSprite(500,200);
    car3.addImage("car3",car3Img)
    car4 = createSprite(700,200);
    car4.addImage("car4",car4Img)
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    //allPlayers
    //player1:{distance:0,name:"Name1"}
    //player2:{distance:0,name:"Name2"}
    //player3:{distance:0,name:"Name3"}
    //player4:{distance:0,name:"Name4"}

    if(allPlayers !== undefined){
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200
      var y;

      for(var plr in allPlayers){
        background(groundImg)
        //add 1 to the index for every loop\
        image(trackImg,0,-displayHeight*4,displayWidth,displayHeight*5)
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
  
    if(player.distance>4200){
      gameState=2;
    }
    

    drawSprites();
  }

  end(){
    console.log('game end')
  }
}
