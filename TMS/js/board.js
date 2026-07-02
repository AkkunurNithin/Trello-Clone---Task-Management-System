
// DOM Elements
const addBoardBtn = document.getElementById("addBoardBtn");
const boardModal = document.getElementById("boardModal");
const boardNameInput = document.getElementById("boardName");
const createBoardBtn = document.getElementById("createBoard");
const closeBoardModal = document.getElementById("closeBoardModal");


// Open Modal


addBoardBtn.addEventListener("click", () => {

    boardModal.classList.add("active");

    boardNameInput.focus();

});


// Close Modal


closeBoardModal.addEventListener("click", closeBoardModalWindow);

boardModal.addEventListener("click", function (e) {

    if (e.target === boardModal) {

        closeBoardModalWindow();

    }

});

function closeBoardModalWindow() {

    boardModal.classList.remove("active");

    boardNameInput.value = "";

}

// Create Board

createBoardBtn.addEventListener("click", createBoard);

function createBoard() {

    const name = boardNameInput.value.trim();

    if (name === "") {

        alert("Please enter board name.");

        return;

    }

    const newBoard = {

        id: generateId(),

        name: name,

        lists: [

            {
                id: generateId(),
                name: "Today",
                cards: []
            },

            {
                id: generateId(),
                name: "Doing",
                cards: []
            },

            {
                id: generateId(),
                name: "Done",
                cards: []
            }

        ]

    };

    appData.boards.push(newBoard);

    appData.currentBoardId = newBoard.id;

    saveData();

    renderApp();

    closeBoardModalWindow();

}