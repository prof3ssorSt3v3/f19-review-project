let PLAYERS = [
  { id: 2, name: "Mary Potter", position: "Seeker", image: "000002.jpg" },
  { id: 3, name: "Don Weasley", position: "Keeper", image: "000003.jpg" },
  { id: 4, name: "Demi Granger", position: "Chaser", image: "000004.jpg" },
  { id: 5, name: "Simone Snape", position: "Beater", image: "000005.jpg" },
  { id: 21, name: "Cara Longbottom", position: "Seeker", image: "000021.jpg" },
  { id: 22, name: "Jenn Lovegood", position: "Chaser", image: "000022.jpg" },
  { id: 29, name: "Paulo Crabbe", position: "Keeper", image: "000029.jpg" },
  { id: 37, name: "Horace Lupin", position: "Beater", image: "000037.jpg" },
  { id: 40, name: "Richard Tonks", position: "Chaser", image: "000040.jpg" },
  { id: 58, name: "Bruce Grindewald", position: "Chaser", image: "000058.jpg" },
  { id: 59, name: "Graham Lestrange", position: "Beater", image: "000059.jpg" },
  { id: 79, name: "Lily Crouch", position: "Seeker", image: "000079.jpg" },
  { id: 92, name: "Charles Diggory", position: "Keeper", image: "000092.jpg" },
  {
    id: 101,
    name: "Irma McGonagall",
    position: "Chaser",
    image: "000101.jpg"
  },
  { id: 150, name: "Ernie Pettigrew", position: "Beater", image: "000150.jpg" }
];
let TEAM = [];
let timmy = null;

document.addEventListener("DOMContentLoaded", init);

function init() {
  //HTML has loaded
  //build cards
  //add event listeners
}

function addCard(player) {
  //create Elements
  //add CSS
  //build structure
  //add content
  //listeners
  //add to page
}

/***************
 * Sample HTML
 * 
 * <div class="card picked">
          <div class="card-content">
            <img src="./img/000002.jpg" class="card-person" alt="Mary Potter" />
            <h3>Mary Potter</h3>
            <h4>Seeker</h4>
          </div>
          <div class="card-actions" data-person="2">
            <button class="add">Add</button>
            <button class="remove">Remove</button>
          </div>
        </div>
 */

function buildTeam(player) {
  //called for each person in the TEAM array
  //create elements
  //set CSS
  //add content
  //add event listeners
  //add to page
}

function handlePlayer(ev) {
  let button = ev.target;
  let idContainer = ev.currentTarget; //could be div or dt
  //get the id
  //use the id to get the name and position to display
  //get the action from the className
  let action;
  switch (action) {
    case "add":
      //check if player already added
      //validate the player type
      //display a user feedback message
      //update the CSS for the card if added to team
      //update CSS for the cards if team is full
      break;
    case "remove":
      //update the array of TEAM members
      //update CSS for the card to not picked
      //update CSS for team not being full
      break;
    default:
  }
  //empty the sidebar list
  //sort the TEAM
  //call buildTeam to display new list
}

function validateTeam(newPlayer) {
  //each team needs 1 seeker, 1 keeper, 2 beaters, 3 chasers
  const SEEKER = 1;
  const KEEPER = 1;
  const BEATER = 2;
  const CHASER = 3;
  let currentMembers = {
    seeker: 0,
    keeper: 0,
    beater: 0,
    chaser: 0
  };
  //check if team is already full before adding

  //add player to TEAM
  //loop through team and count each position
  //test for full team - return message
  //test for one position having too many - then cancel the add, return message
  //else just return message that person was added
  //returned message object {full: , added: , message}
}

function showMessage(msg) {
  //set the text in the message box
  //set the CSS class
  //clear timer
  //set timer to remove the CSS class
}
