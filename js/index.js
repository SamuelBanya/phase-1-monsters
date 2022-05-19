// DELIVERABLES:
// COMPLETE: 1. When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.
// COMPLETE 2. Above your list of monsters, you should have a form to create a new monster. You should have fields for name, age, and description, and a 'Create Monster Button'. When you click the button, the monster should be added to the list and saved in the API.
// COMPLETE: 3. At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.

// FINAL PRODUCT:
// Monstr Inc
// Inputs: 'name...', 'age...', 'description...' --> 'Create' submit button

// What The Final Product Looks Like:
// Section for each monster:
// h1: Monster Name
// h4: (bold) Age: (age)
// p: Bio: (bio)

let totalMonsters = 0;
let pageNumber = 1;
let pageLimit = 1;

document.addEventListener("DOMContentLoaded", (e) => {
  createMonsterForm(e);
  listFirst50Monsters();
  let backButton = document.querySelector("#back");
  let forwardButton = document.querySelector("#forward");
  backButton.addEventListener("click", backButtonClick);
  forwardButton.addEventListener("click", forwardButtonClick);
});

function createMonsterForm(e) {
  let createMonsterContainer = document.querySelector("#create-monster");
  let form = document.createElement("form");
  let nameInput = document.createElement("input");
  nameInput.setAttribute("placeholder", "name...");
  let ageInput = document.createElement("input");
  ageInput.setAttribute("placeholder", "age...");
  let descriptionInput = document.createElement("input");
  descriptionInput.setAttribute("placeholder", "description...");
  let submitButton = document.createElement("input");
  submitButton.type = 'button';
  submitButton.id = 'submit';
  submitButton.value = 'Submit';
  submitButton.className = 'btn';

  submitButton.addEventListener("click", (e) => {
    let monsterContainer = document.querySelector("#monster-container");

    e.preventDefault();

    let monsterName = nameInput.value;
    let monsterAge = ageInput.value;
    let monsterDescription = descriptionInput.value;

    let monsterNameHeader = document.createElement("h1");
    let monsterNameContent = monsterName;
    monsterNameHeader.textContent = monsterNameContent;

    let ageHeader = document.createElement("h4");
    ageHeader.innerHTML = `<strong>age: ${monsterAge}</strong>`;

    let bioParagraph = document.createElement("p");
    bioParagraph.textContent = "Bio: " + monsterDescription;
    let breakTag = document.createElement("br");

    monsterContainer.append(monsterNameHeader, ageHeader, bioParagraph, breakTag);

    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify ({
        name: monsterName,
        age: monsterAge,
        description: monsterDescription
      })
    })
      .then((response) => response.json())
      .then((obj) => {
      })
      .catch((error) => {
      });
  });
  form.append(nameInput, ageInput, descriptionInput, submitButton);
  createMonsterContainer.append(form);
}

function listMonsters(pageNumber) {
  let monsterContainer = document.querySelector("#monster-container");
  // Fetch request to determine total number of monsters on page:
  fetch("http://localhost:3000/monsters", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((obj) => {
      totalMonsters = obj.length;
    })
    .catch((error) => {
      console.log("error.message: ", error.message);
    });
  // Fetch request for 50 monsters per page:
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((obj) => {
      obj.forEach((monsterObj) => {
        let monsterDiv = document.createElement("div");
        monsterDiv.id = monsterObj["id"];
        let monsterNameHeader = document.createElement("h1");
        let monsterNameContent = monsterObj["name"];
        monsterNameHeader.textContent = monsterNameContent;

        let ageHeader = document.createElement("h4");
        ageHeader.innerHTML = `<strong>age: ${monsterObj["age"]}</strong>`;

        let bioParagraph = document.createElement("p");
        bioParagraph.textContent = "Bio: " + monsterObj["description"];

        let breakTag = document.createElement("br");
        monsterDiv.append(monsterNameHeader, ageHeader, bioParagraph, breakTag);

        monsterContainer.append(monsterDiv);
      });
    })
    .catch((error) => {
      console.log("error.message: ", error.message);
    });
}

function listFirst50Monsters() {
  listMonsters(1);
}

function backButtonClick() {
  if (pageNumber > 1) {
    pageNumber -= 1;
    let monsterContainer = document.querySelector("#monster-container");
    monsterContainer.innerHTML = "";
    listMonsters(pageNumber);
  }
  else {
    console.log("You have reached the first page, please use the forward button!");
  }
}

function forwardButtonClick() {
  // Use .lastChildElement.id of the div of the last monster in the collection, if its less than the total amount in the collection, then continue
  const lastElement = document.querySelector("#monster-container").lastElementChild.id;

  if (lastElement < totalMonsters) {
    pageNumber += 1;
    listMonsters(pageNumber);
    let monsterContainer = document.querySelector("#monster-container");
    monsterContainer.innerHTML = "";
  }
  else {
    console.log("You have created the final page, please use the back button!");
  }
}
