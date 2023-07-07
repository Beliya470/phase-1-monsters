document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.getElementById("monster-container");
    const createMonsterDiv = document.getElementById("create-monster");
    const backBtn = document.getElementById("back");
    const forwardBtn = document.getElementById("forward");
    let page = 1;
  
    function fetchMonsters() {
      fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
        .then((response) => response.json())
        .then((monsters) => {
          monsterContainer.innerHTML = "";
          monsters.forEach((monster) => {
            renderMonster(monster);
          });
        });
    }
  
    function renderMonster(monster) {
      const monsterCard = document.createElement("div");
      monsterCard.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>${monster.description}</p>
      `;
      monsterContainer.appendChild(monsterCard);
    }
  
    function createMonster(event) {
      event.preventDefault();
      const name = event.target.name.value;
      const age = event.target.age.value;
      const description = event.target.description.value;
  
      const monsterData = {
        name: name,
        age: parseFloat(age),
        description: description,
      };
  
      fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(monsterData),
      })
        .then((response) => response.json())
        .then((monster) => {
          renderMonster(monster);
        });
  
      event.target.reset();
    }
  
    function handleBackBtnClick() {
      if (page > 1) {
        page--;
        fetchMonsters();
      }
    }
  
    function handleForwardBtnClick() {
      page++;
      fetchMonsters();
    }
  
    fetchMonsters();
    createMonsterDiv.innerHTML = `
      <form id="monster-form">
        <input type="text" name="name" placeholder="Name" required />
        <input type="number" name="age" placeholder="Age" required />
        <input type="text" name="description" placeholder="Description" required />
        <input type="submit" value="Create Monster" />
      </form>
    `;
  
    const monsterForm = document.getElementById("monster-form");
    monsterForm.addEventListener("submit", createMonster);
  
    backBtn.addEventListener("click", handleBackBtnClick);
    forwardBtn.addEventListener("click", handleForwardBtnClick);
  });
  