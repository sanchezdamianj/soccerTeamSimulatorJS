class Player {
    constructor(name,surname, qualification, position){
    this.name = name;
    this.surname = surname;
    this.qualification = qualification;
    this.position = position;
    }
}
   
const playersList = [];
let createInitialList = document.getElementById("btn-addAll");
createInitialList.addEventListener("submit", ()=> {
        addInitialList();
});

const addInitialList = () => {    
        playersList.push(new Player('emiliano' ,'martinez', 8, 'Portero'));
        playersList.push(new Player('cristian' ,'romero',9,'Defensa central'));
        playersList.push(new Player('nicolas' ,'otamendi',9,'Defensa central'));
        playersList.push(new Player('marcos','acunia', 7,'Lateral izquierdo' ));   
        playersList.push(new Player('gonzalo','montiel',9, 'Lateral Derecho'));
        playersList.push(new Player('leandro','paredes',9,'Pivote'));
        playersList.push(new Player('rodrigo','de paul',10, 'Mediocentro'));
        playersList.push(new Player('giovani','lo celso',10, 'Mediocentro'));   
        playersList.push(new Player('lautaro','martinez',9, 'Delantero centro'));
        playersList.push(new Player('angel','di maria',10, 'Extremo Derecho'));
        playersList.push(new Player('lionel','messi',10, 'Todas'));  
        alert("You created the initial players list");
        showInitList(playersList);        
}

function welcome() {
    alert("Simulation Soccer Team");
    const user = prompt('What is your name?');
    const password = prompt(`${user} please, enter your password`);
    validateUser(user, password);
    return user, password;
}

function validateUser(user, password) {
    if (user !== '' && password !== '') {
        alert(`Hi ${user}, Welcome to the Soccer Team simulator`);
        let quantity = prompt("How many team do you have?");
        for(let i = quantity; i >= 0 ; i--){
            alert(`The countdown is coming! ${i}`);
            if (i === 0){alert(`Let's get started ${user}!!!!!!!!`)}
        }
    }else {
        alert('You can login to the App, but you can not leave the fields in blank');  
        welcome();
    }        
        

}
welcome();

const form = document.getElementById("eventForm");
form.addEventListener("submit", function(event) {
    event.preventDefault();
})
const playersHTML = document.querySelector(".players");
let players = [];
const getPlayer = (id)=>{
	return new Promise((resolve,reject)=>{
		let player = players[id];
		if (player == undefined) reject("There is no player with this name");
		else setTimeout(()=> {resolve(player)}, Math.random()*1400);
	})
}
const returnPlayers = async ()=>{
	let player = [];
    let i = players.length - 1;
	player[i] = await getPlayer(i);
	let newHTMLCode = `
		<div class="player">
		    <div class="name">${player[i].name}${player[i].surname}</div>
		    <div class="qualification">${player[i].qualification}</div> 
            <div class="position">${player[i].position}</div> 
		 </div>`;
	playersHTML.innerHTML += newHTMLCode;  
    localStorage.setItem(player[i].name, player[i].qualification, player[i].position);   
    form.reset();
}

function addPlayer(){
    let nameToBeAdded = document.getElementById("namePlayer").value;  
    let surnameToBeAdded = document.getElementById("surnamePlayer").value
    let qualificationNew = parseInt(document.getElementById("qualificationNew").value);   
    let position = document.getElementById("position").value;   
    let playerNew = new Player(nameToBeAdded,surnameToBeAdded, qualificationNew ,position);
    if(players = [{}]){
        players = [...playersList];
    }
    if (namePlayer.value !== "Enter a player"){
        let pos = players.findIndex(element => element.name === surnameToBeAdded);
        if (pos >= 0){   
            players.splice(pos, 1)};
            players.push(playerNew);
        returnPlayers(); 
        rankTotal(players);
    }
}
function delPlayer(){
    let playerToBeDeleted = document.getElementById("surnamePlayer").value;
    let pos = players.findIndex(element => element.name === playerToBeDeleted);
      if (pos >= 0){   
        players.splice(pos, 1)
      };  
}

const rankingTotalHTML = document.querySelector(".total");
const rankTotal = (players) =>{
    let sum = players.map(player => player.qualification).reduce((prev, curr) => prev + curr, 0);
    if(sum){
    let rankHTMLCode = `<div class="total">${sum}</div>`;
    rankingTotalHTML.innerHTML = rankHTMLCode;
    }   
    return sum;
}

function showInitList(setPlayers) {
  let i;
  let namePic = "";
  let completeName = "";
  let surnamePic = "";
  for (i = 0; i < setPlayers.length; i++) {
    namePic = setPlayers[i].name;
    surnamePic = setPlayers[i].surname;
    completeName = (("./assets/"+namePic+" "+surnamePic+".jpg").replace(/[' "]+/g, ' ')).toLowerCase();
    const galleryHTML = document.querySelector(".gallery");
    if(completeName){
        let newGalleryHTMLCode = `
             <div class="gallery">
                <div>   
                    <img src="${completeName}"/>
                    <p class="qualy">Qualification: ${setPlayers[i].qualification}</p>
                </div>
             </div>`;
        galleryHTML.innerHTML += newGalleryHTMLCode;
    }
  }
}

function searchPlayers() {
  let i;
  let res = [...playersList];
  let namePic = "";
  let completeName = "";
  let input = document.getElementById("search").value;
  for (i = 0; i < res.length; i++) {
    if (input === res[i].surname || input === res[i].name){
       namePic = res[i].name;
       completeName = (("./assets/"+namePic+" "+input+".jpg").replace(/[' "]+/g, ' ')).toLowerCase();
    }
  }
  const galleryHTML = document.querySelector(".gallery");
    if(completeName){
  let newGalleryHTMLCode = `
             <div class="gallery">
              <img src="${completeName}"/>
             </div>`;
  galleryHTML.innerHTML += newGalleryHTMLCode;
    }
}

document.getElementById("btn-searchPlayers").addEventListener("click", (e)=>{
    e.preventDefault();
});

