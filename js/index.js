// DELIVERABLES:
// COMPLETE: 1. When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.
// COMPLETE 2. Above your list of monsters, you should have a form to create a new monster. You should have fields for name, age, and description, and a 'Create Monster Button'. When you click the button, the monster should be added to the list and saved in the API.
// IN-PROGRESS: 3. At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.

// FINAL PRODUCT:
// Monstr Inc
// Inputs: 'name...', 'age...', 'description...' --> 'Create' submit button

// What The Final Product Looks Like:
// Section for each monster:
// h1: Monster Name
// h4: (bold) Age: (age)
// p: Bio: (bio)

let minMonsterNum = 0;
let maxMonsterNum = 0;

document.addEventListener("DOMContentLoaded", (e) => {
  createMonsterForm(e);
  listFirst50Monsters(0);
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

    console.log("createMonsterForm's submit button clicked");
    let monsterName = nameInput.value;
    let monsterAge = ageInput.value;
    let monsterDescription = descriptionInput.value;

    console.log("monsterName: ", monsterName);
    console.log("monsterAge: ", monsterAge);
    console.log("monsterDescription: ", monsterDescription);

    let monsterNameHeader = document.createElement("h1");
    let monsterNameContent = monsterName;
    monsterNameHeader.textContent = monsterNameContent;
    console.log("monsterNameHeader: ", monsterNameHeader);

    let ageHeader = document.createElement("h4");
    // ageHeader.innerHTML = "<strong>age: " + obj[i]["age"] + "</strong>";
    ageHeader.innerHTML = `<strong>age: ${monsterAge}</strong>`;
    console.log("ageHeader: ", ageHeader);

    let bioParagraph = document.createElement("p");
    bioParagraph.textContent = "Bio: " + monsterDescription;
    console.log("bioParagraph: ", bioParagraph);
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
        console.log("obj: ", obj);
        console.log("typeof(obj): ", typeof(obj));
      })
      .catch((error) => {
        console.log("error: ", error.message);
      });
  });

  console.log("nameInput: ", nameInput);
  console.log("ageInput: ", ageInput);
  console.log("descriptionInput: ", descriptionInput);
  form.append(nameInput, ageInput, descriptionInput, submitButton);
  createMonsterContainer.append(form);
}

function listMonsters(minMonsterNum) {
  let monsterContainer = document.querySelector("#monster-container");
  fetch("http://localhost:3000/monsters", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((obj) => {
      console.log("obj: ", obj);
      console.log("typeof(obj): ", typeof(obj));
      maxMonsterNum = obj.length;
      console.log("maxMonsterNum: ", maxMonsterNum);
      for (let i = minMonsterNum; i < minMonsterNum + 50; i++) {
        console.log("obj[" + i + "]: ", obj[i]);
        let monsterNameHeader = document.createElement("h1");
        let monsterNameContent = obj[i]["name"];
        monsterNameHeader.textContent = monsterNameContent;
        console.log("monsterNameHeader: ", monsterNameHeader);

        let ageHeader = document.createElement("h4");
        ageHeader.innerHTML = `<strong>age: ${obj[i]["age"]}</strong>`;
        console.log("ageHeader: ", ageHeader);

        let bioParagraph = document.createElement("p");
        bioParagraph.textContent = "Bio: " + obj[i]["description"];
        console.log("bioParagraph: ", bioParagraph);

        let breakTag = document.createElement("br");

        monsterContainer.append(monsterNameHeader, ageHeader, bioParagraph, breakTag);
      }
    })
    .catch((error) => {
      console.log("error.message: ", error.message);
    });
}

function listFirst50Monsters(minMonsterNum) {
  listMonsters(0);
}

function backButtonClick() {
  console.log("backButtonClick() function called");
  if (minMonsterNum > 0) {
    let monsterContainer = document.querySelector("#monster-container");
    monsterContainer.innerHTML = "";
    minMonsterNum = minMonsterNum - 50;
    listMonsters(minMonsterNum);
  }
}

function forwardButtonClick() {
  console.log("forwardButtonClick() function called");
  // TODO: Fix the logic behind this if statement
  if (minMonsterNum <= maxMonsterNum - 50) {
    console.log("minMonsterNum: ", minMonsterNum);
    console.log("maxMonsterNum: ", maxMonsterNum);
    let monsterContainer = document.querySelector("#monster-container");
    monsterContainer.innerHTML = "";
    minMonsterNum = minMonsterNum + 50;
    listMonsters(minMonsterNum);
  }
}
