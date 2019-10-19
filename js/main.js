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
  //add event listeners here
  PLAYERS.forEach(addCard);
  let box = document.querySelector(".message");
  box.addEventListener("click", function(ev) {
    ev.target.classList.remove("active");
    clearTimeout(timmy);
  });
}

function addCard(player) {
  //create Elements
  let card = document.createElement("div");
  let content = document.createElement("div");
  let avatar = document.createElement("img");
  let name = document.createElement("h3");
  let pos = document.createElement("h4");
  let actions = document.createElement("div");
  let add = document.createElement("button");
  let remove = document.createElement("button");
  //add CSS
  card.className = "card";
  content.className = "card-content";
  avatar.className = "card-person";
  actions.className = "card-actions";
  add.className = "add";
  remove.className = "remove";
  //build structure
  card.appendChild(content);
  content.appendChild(avatar);
  content.appendChild(name);
  content.appendChild(pos);
  card.appendChild(actions);
  actions.appendChild(add);
  actions.appendChild(remove);
  //add content
  avatar.src = `./img/${player.image}`;
  avatar.alt = player.name;
  name.textContent = player.name;
  pos.textContent = player.position;
  add.textContent = "Add";
  remove.textContent = "Remove";
  actions.setAttribute("data-person", player.id);
  //listeners
  actions.addEventListener("click", handlePlayer);
  //add to page
  document.querySelector("main").appendChild(card);
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
  let name = document.createElement("dt");
  let position = document.createElement("dd");
  name.className = "remove";
  name.setAttribute("data-person", player.id);
  name.textContent = player.name;
  name.title = "Click name to remove from team";
  position.textContent = player.position;
  name.addEventListener("click", handlePlayer);
  document.querySelector(".team-members").appendChild(name);
  document.querySelector(".team-members").appendChild(position);
}

function handlePlayer(ev) {
  let button = ev.target;
  let idContainer = ev.currentTarget; //could be div or dt
  //console.log(idContainer);
  let id = parseInt(idContainer.getAttribute("data-person"));
  //use the id to get the name and position to display
  let player = PLAYERS.find(person => {
    if (person.id == id) {
      //console.log("YES", id);
      return true;
    }
  });
  let action = button.className.toLowerCase();
  //console.log(action);
  switch (action) {
    case "add":
      //check if player already added
      let index = TEAM.findIndex(player => {
        return player.id == id;
      });
      if (index != -1) {
        //player already on team
        console.log("This player is already on the team");
      } else {
        //call the function to validate the types of players
        let feedback = validateTeam(player);
        if (feedback.full) {
          console.log("You have a full team with", TEAM.length, "players");
        } else {
          //not full yet
          console.log(feedback.msg);
        }
        showMessage(feedback.msg);
        //update the CSS for the player
        if (button !== idContainer && feedback.added) {
          idContainer.closest(".card").classList.add("picked");
        }
        if (feedback.full) {
          let notTeam = document.querySelectorAll(".card:not(.picked)");
          notTeam.forEach(card => {
            card.classList.add("hidden");
          });
        }
      }
      break;
    case "remove":
      //update the array of TEAM members
      TEAM = TEAM.filter(player => {
        return player.id != id;
      });
      let hidden = document.querySelectorAll(".hidden");
      hidden.forEach(card => {
        card.classList.remove("hidden");
      });
      //update the CSS on the card
      let actions = document.querySelector(`.card [data-person="${id}"]`);
      actions.closest(".card").classList.remove("picked");
      break;
    default:
  }
  document.querySelector(".team-members").innerHTML = "";
  TEAM.sort((a, b) => {
    //sort by position name
    if (a.position > b.position) {
      return -1;
    } else {
      return 1;
    }
  }).forEach(buildTeam);
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
  if (TEAM.length === 7) {
    return { full: true, msg: "Your team is already full" };
  }

  TEAM.push(newPlayer); //add for test
  console.log(TEAM);
  TEAM.forEach(player => {
    currentMembers[player.position.toLowerCase()] += 1;
  });
  if (
    SEEKER === currentMembers.seeker &&
    KEEPER === currentMembers.keeper &&
    BEATER === currentMembers.beater &&
    CHASER === currentMembers.chaser
  ) {
    //we have exactly the right number of each type
    return { full: true, msg: "Your team is ready.", added: true };
  } else if (
    currentMembers.seeker > SEEKER ||
    currentMembers.keeper > KEEPER ||
    currentMembers.beater > BEATER ||
    currentMembers.chaser > CHASER
  ) {
    //the new person exceeds a certain type
    TEAM.pop(); //remove the new person
    return {
      full: false,
      msg: `The ${newPlayer.position} position is already full.`,
      added: false
    };
  } else {
    //we accept the new person but need more
    return {
      full: false,
      msg: `${newPlayer.name} has been added as a ${newPlayer.position}`,
      added: true
    };
  }
}

function showMessage(msg) {
  let box = document.querySelector(".message");
  box.textContent = msg;
  box.classList.add("active");
  clearTimeout(timmy);
  timmy = setTimeout(function() {
    box.classList.remove("active");
  }, 3000);
}
