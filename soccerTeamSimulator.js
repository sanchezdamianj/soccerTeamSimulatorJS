class Player {
    constructor(name,surname, qualification, position){
    this.name = name;
    this.surname = surname;
    this.qualification = qualification;
    this.position = position;
    }
}
   
const playersList = [];
const finalTeam = [];
const finalTeamSustitutes = [];

let createInitialList = document.getElementById("btn-addAll");
createInitialList.addEventListener("submit", ()=> {
    addInitialList();
});

const addInitialList = () => {    
        playersList.push(new Player('emiliano' ,'martinez', 10, 'Goalkeeper'));
        playersList.push(new Player('cristian','romero',10,'Defence'));
        playersList.push(new Player('nicolas' ,'otamendi',10,'Defence'));
        playersList.push(new Player('marcos','acunia', 10,'Winger' ));   
        playersList.push(new Player('gonzalo','montiel',10, 'Winger'));
        playersList.push(new Player('leandro','paredes',10,'Middle'));
        playersList.push(new Player('rodrigo','de paul',10, 'Middle'));
        playersList.push(new Player('giovani','lo celso',10, 'Middle'));   
        playersList.push(new Player('lautaro','martinez',10, 'Forward'));
        playersList.push(new Player('angel','di maria',10, 'Forward'));
        playersList.push(new Player('lionel','messi',10, 'All'));  
        addLocalStorage()
        showInitList(playersList);   
        rankTotal(playersList);     
}

function addLocalStorage(){
   for(let i = 0; i < playersList.length;i++){
    localStorage.setItem(playersList[i].name,playersList[i].surname); 
    }
}
//Modal Welcome
const modalContWelcome = document.querySelector('#modal-container'); 
const closeModal = document.querySelector('#close-modal');
closeModal.addEventListener('click', () =>{
    const user = document.getElementById('userName').value;
    const password = document.getElementById('userPass').value;
    (user !== 'enter your name' && password !== '')?modalContWelcome.classList.remove('modal-container--visible')
    :alert('You can login to the App, but you can not leave the fields in blank');
})

// Initial modal list 
const openEls = document.querySelectorAll("[data-open]");
const closeEls = document.querySelectorAll("[data-close]");
const isVisible = "is-visible";
for (const el of openEls) {
  el.addEventListener("click", function() {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  });
}
for (const el of closeEls) {
  el.addEventListener("click", function() {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
}
document.addEventListener("click", e => {
  if (e.target == document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible [data-close]").click();
  }
});
document.addEventListener("keyup", e => {
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible [data-close]").click();
  }
});
//end Initial Modal list

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
    const star = updateQualification(player[i].qualification);
	let newHTMLCode = `
		<tr>
            <th>${player[i].qualification}</th>
		    <td class="name">${player[i].name} ${player[i].surname}</td>
		    <td class="qualification">${star}</td> 
            <td class="position">${player[i].position}</td> 
		 </tr>`;
	playersHTML.innerHTML += newHTMLCode;    

    let imgPathToTeam = (("./assets/"+player[i].name+" "+player[i].surname+".jpg").replace(/[' "]+/g, ' ')).toLowerCase();
    const galleryHTML = document.querySelector(".galleryFInalTeam");
     let newGalleryHTMLCode = `      
        <div class="cardFT">
            <img src="${imgPathToTeam}" class="card-img-top" alt="">
            <div class="card-bodyFT">
                <h5 id="idjug" class="card-titleFT">${player[i].name} ${player[i].surname}</h5>
                <p class="card-textFT">Ranking:${player[i].qualification}</p>
                <button id="btn-addToTeam" onclick='toFinalTeam(${i})' class="btn btn-outline-danger ft">X</button>
            </div>
        </div>`;
    galleryHTML.innerHTML += newGalleryHTMLCode;
}

function addPlayer(){
    let nameToBeAdded = document.getElementById("namePlayer").value;  
    let surnameToBeAdded = document.getElementById("surnamePlayer").value
    let qualificationNew = parseInt(document.getElementById("qualificationNew").value);   
    let position = document.getElementById("position").value;   
    let playerNew = new Player(nameToBeAdded,surnameToBeAdded,qualificationNew ,position);
    if(players = [{}]){
        players = [...playersList + playerNew];
    }
    if (namePlayer.value !== "Enter a player"){
        let pos = players.findIndex(element =>  element.name === nameToBeAdded || element.name === surnameToBeAdded);
        if (pos >= 0){   
            players.splice(pos, 1)};
            players.push(playerNew);
        returnPlayers(); 
        rankTotal(players);
    }
}
function delPlayer(){
    let nameToBeAdded = document.getElementById("namePlayer").value;  
    let playerToBeDeleted = document.getElementById("surnamePlayer").value;
    let pos = players.findIndex(element => element.name === playerToBeDeleted || element.surname === nameToBeAdded);
      if (pos >= 0){   
        players.splice(pos, 1)
      };  
}


const rankTotal = (players) =>{
    const rankingTotalHTML = document.querySelector(".total");
    let sum = players.map(player => player.qualification).reduce((prev, curr) => prev + curr, 0);
    if(sum){
    let rankHTMLCode = `<div class="total">Ranking Total: ${sum}</div>`;
    rankingTotalHTML.innerHTML = rankHTMLCode;
    }   
    return sum;
}

const htmlStructure = (imgPath,arrPlayers, index) =>{
    const galleryHTML = document.querySelector(".gallery");
     let newGalleryHTMLCode = `      
        <div class="card" style="width: 225px;height:375px;">
            <img src="${imgPath}" class="card-img-top" alt="">
            <div class=""card-body>
                <h5 id="idjug" class="card-title">${arrPlayers[index].name} ${arrPlayers[index].surname}</h5>
                <p class="card-text">Qualification: ${arrPlayers[index].qualification}</p>
                <button id="btn-addToTeam" onclick='toFinalTeam(${index})' class="btn btn-primary">Add to Team</button>
            </div>
        </div>`;
    galleryHTML.innerHTML += newGalleryHTMLCode;
}

function showInitList(setPlayers) {
  let i;
  let namePic,completeName,surnamePic = "";
  for (i = 0; i < setPlayers.length; i++) {
    namePic = setPlayers[i].name;
    surnamePic = setPlayers[i].surname;
    completeName = (("./assets/"+namePic+" "+surnamePic+".jpg").replace(/[' "]+/g, ' ')).toLowerCase();
    completeName?htmlStructure(completeName, setPlayers, i):console.log("There is no player with this name");
  }
}

document.getElementById("btn-searchPlayers").addEventListener("click",(e)=> {
    e.preventDefault();
});

function searchPlayers(){
  let namePic = "";
  let surnamePic = "";
  let completeName = "";
  let input = document.getElementById("search").value;
  let res = playersList.find((pl) => pl.name === input || pl.surname === input);
  let posRes = playersList.findIndex((pl) => pl.name === input || pl.surname === input);
  if (res){
       namePic = res.name;
       surnamePic = res.surname;
       completeName = (("./assets/"+namePic+" "+surnamePic+".jpg").replace(/[' "]+/g, ' ')).toLowerCase();
    }
  try {
  htmlStructure(completeName, playersList, posRes);
  } catch (error) {
   alert("There is no player with this name", error);   
  }
}

function updateQualification(qualyQuantity) {
const stars = [];
for(let i = 0; i < qualyQuantity;i++){
    stars.push(i+1)
}
return stars.map( () =>
       `<img src='./assets/star.png' width="32" alt="estrellitas"/>`
        ).join("");
}

document.getElementById("btn-addToTeam")?.addEventListener("click", (e) => {
e.preventDefault();
});

// Array about final team to get the ranking, displat it into cancha
function toFinalTeam(index){
    const pls = playersList[index];
    const name = pls.name;
    const surname = pls.surname;
    const quali = pls.qualification;
    const pos = pls.position;
    let playerNew = new Player(name,surname,quali,pos);
    imgPathToTeam = (("./assets/"+name+" "+surname+".jpg").replace(/[' "]+/g, ' ')).toLowerCase();
    if(finalTeam.length < 11){
        finalTeam.push(playerNew);
        let posFT = finalTeam.length - 1;
        const galleryHTML = document.querySelector(".galleryFinalTeam");
         htmlStructureCard(imgPathToTeam,name,surname,quali,posFT,galleryHTML,'cardFT');
    }else {
        posSus = finalTeamSustitutes.length;
        finalTeamSustitutes.push(playerNew);
        const gallerySusHTML = document.querySelector(".gallerySustitute");
        showModal();
        htmlStructureCard(imgPathToTeam,name,surname,quali,posSus,gallerySusHTML,'card');
    }
}

function htmlStructureCard(imgPath,name,surname,quali,index,galleryTypeHTML,cardType){
        let message = '';
        let classAd = '';
        let btnClass = '';
        if(cardType === 'card'){
            message= 'Add to Team';
            classAd= '';
            btnClass = 'btn-outline-success';
        }else{
            message= 'X';
            classAd = 'ft'
            btnClass = 'btn-outline-danger'
        }
        let newGalleryHTMLCode = `      
            <div class="${cardType}">
                <img src="${imgPath}" class="card-img-top" alt="">
                <div class="card-bodyFT">
                    <h5 id="idjug" class="card-titleFT">${name} ${surname}</h5>
                    <p class="card-textFT">Ranking:${quali}</p>
                    <button id="btn-addToTeam" onclick='toFinalTeam(${index})' class="btn ${btnClass} ${classAd}">${message}</button>
                </div>
            </div>`;
        galleryTypeHTML.innerHTML += newGalleryHTMLCode;
}

function showModal() {
  document.getElementById('openModal').style.display = 'block';
}

function CloseModal() {
  document.getElementById('openModal').style.display = 'none';
}
