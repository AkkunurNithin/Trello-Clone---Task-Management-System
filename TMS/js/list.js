
// DOM Elements

const addListBtn = document.getElementById("addListBtn");
const listModal = document.getElementById("listModal");
const listNameInput = document.getElementById("listName");
const createListBtn = document.getElementById("createList");
const closeListModal = document.getElementById("closeListModal");

// Open Modal

addListBtn.addEventListener("click", () => {
    listModal.classList.add("active");
    listNameInput.focus();
});

// Close Modal

closeListModal.addEventListener("click", closeList);

listModal.addEventListener("click", (e) => {
    if (e.target === listModal) {
        closeList();
    }
});

function closeList() {
    listModal.classList.remove("active");
    listNameInput.value = "";
}

// Create List

createListBtn.addEventListener("click", createList);

function createList() {

    const name = listNameInput.value.trim();

    if (name === "") {
        alert("Please enter list name");
        return;
    }

    const board = getCurrentBoard();

    board.lists.push({
        id: generateId(),
        name: name,
        cards: []
    });

    saveData();

    renderApp();

    closeList();
}