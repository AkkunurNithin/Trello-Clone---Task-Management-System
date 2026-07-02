
// DOM Elements
const cardModal = document.getElementById("cardModal");
const cardTitleInput = document.getElementById("cardTitle");
const cardDescriptionInput = document.getElementById("cardDescription");
const dueDateInput = document.getElementById("dueDate");
const priorityInput = document.getElementById("priority");

const createCardBtn = document.getElementById("createCard");
const closeCardModal = document.getElementById("closeCardModal");

// Store selected list id
let selectedListId = null;

// Store edit card id
let editingCardId = null;


// Open Card Modal


document.addEventListener("click", function (e) {

    if (e.target.closest(".addCardBtn")) {

        selectedListId = e.target.closest(".addCardBtn").dataset.id;

        editingCardId = null;

        cardTitleInput.value = "";
        cardDescriptionInput.value = "";
        dueDateInput.value = "";
        priorityInput.value = "Low";

        createCardBtn.textContent = "Add Task";

        cardModal.classList.add("active");
    }

});


// Close Modal


closeCardModal.addEventListener("click", closeCardModalWindow);

cardModal.addEventListener("click", function (e) {

    if (e.target === cardModal) {

        closeCardModalWindow();

    }

});

function closeCardModalWindow() {

    cardModal.classList.remove("active");

    cardTitleInput.value = "";
    cardDescriptionInput.value = "";
    dueDateInput.value = "";
    priorityInput.value = "Low";

    editingCardId = null;

}


// Add / Update Card


createCardBtn.addEventListener("click", saveCard);

function saveCard() {

    const title = cardTitleInput.value.trim();

    if (title === "") {

        alert("Task title is required.");

        return;

    }

    const board = getCurrentBoard();

    const list = board.lists.find(
        list => list.id === selectedListId
    );

    // Edit Card
    if (editingCardId) {

        const card = list.cards.find(
            card => card.id === editingCardId
        );

        card.title = title;
        card.description = cardDescriptionInput.value.trim();
        card.dueDate = dueDateInput.value;
        card.priority = priorityInput.value;

    }

    // Create Card
    else {

        list.cards.push({

            id: generateId(),

            title,

            description: cardDescriptionInput.value.trim(),

            dueDate: dueDateInput.value,

            priority: priorityInput.value

        });

    }

    saveData();

    renderApp();

    closeCardModalWindow();

}


// Delete Card


function deleteCard(cardId) {

    const board = getCurrentBoard();

    board.lists.forEach(list => {

        list.cards = list.cards.filter(
            card => card.id !== cardId
        );

    });

    saveData();

    renderApp();

}


// Edit Card


function editCard(cardId) {

    const board = getCurrentBoard();

    board.lists.forEach(list => {

        const card = list.cards.find(
            card => card.id === cardId
        );

        if (card) {

            selectedListId = list.id;

            editingCardId = card.id;

            cardTitleInput.value = card.title;

            cardDescriptionInput.value = card.description;

            dueDateInput.value = card.dueDate;

            priorityInput.value = card.priority;

            createCardBtn.textContent = "Update Task";

            cardModal.classList.add("active");

        }

    });

}