
// Render Entire App

function renderApp() {
    renderBoards();
    renderLists();
    enableDragAndDrop();
}

// Get Current Board

function getCurrentBoard() {
    return appData.boards.find(
        board => board.id === appData.currentBoardId
    );
}

// Render Boards

function renderBoards() {

    const boardsContainer = document.querySelector(".boards-list");

    boardsContainer.innerHTML = "";

    appData.boards.forEach(board => {

        const boardElement = document.createElement("div");

        boardElement.className = "board-item";

        if (board.id === appData.currentBoardId) {
            boardElement.classList.add("active");
        }

        boardElement.innerHTML = `
            <span>${board.name}</span>

            <div class="board-actions">

                <button
                    class="rename-board"
                    data-id="${board.id}">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button
                    class="delete-board"
                    data-id="${board.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>
        `;

        // Switch Board
        boardElement.addEventListener("click", () => {

            appData.currentBoardId = board.id;

            saveData();

            renderApp();

        });

        boardsContainer.appendChild(boardElement);

    });

    // Rename Board

    document.querySelectorAll(".rename-board").forEach(button => {

        button.addEventListener("click", function (e) {

            e.stopPropagation();

            const board = appData.boards.find(
                b => b.id === this.dataset.id
            );

            const newName = prompt(
                "Enter Board Name",
                board.name
            );

            if (!newName || !newName.trim()) return;

            board.name = newName.trim();

            saveData();

            renderApp();

        });

    });

    // Delete Board

    document.querySelectorAll(".delete-board").forEach(button => {

        button.addEventListener("click", function (e) {

            e.stopPropagation();

            if (appData.boards.length === 1) {
                alert("At least one board is required.");
                return;
            }

            appData.boards = appData.boards.filter(
                board => board.id !== this.dataset.id
            );

            appData.currentBoardId = appData.boards[0].id;

            saveData();

            renderApp();

        });

    });

}

// Render Lists

function renderLists() {

    const board = getCurrentBoard();

    const boardContainer = document.querySelector(".board-container");

    const addList = document.querySelector(".add-list");

    boardContainer.innerHTML = "";

    board.lists.forEach(list => {

        const listElement = document.createElement("div");

        listElement.className = "list";

        // Required for Drag & Drop
        listElement.dataset.id = list.id;

        listElement.innerHTML = `

            <div class="list-header">

                <h3>${list.name}</h3>

                <div class="list-actions">

                    <button
                        class="rename-list"
                        data-id="${list.id}">
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button
                        class="delete-list"
                        data-id="${list.id}">
                        <i class="fa-solid fa-trash"></i>
                    </button>

                    <button
                        class="addCardBtn"
                        data-id="${list.id}">
                        +
                    </button>

                </div>

            </div>

            <div class="cards"></div>

        `;

        renderCards(
            list.cards,
            listElement.querySelector(".cards")
        );

        boardContainer.appendChild(listElement);

    });

    // Rename List

    document.querySelectorAll(".rename-list").forEach(button => {

        button.addEventListener("click", function (e) {

            e.stopPropagation();

            const list = board.lists.find(
                item => item.id === this.dataset.id
            );

            const newName = prompt(
                "Enter List Name",
                list.name
            );

            if (!newName || !newName.trim()) return;

            list.name = newName.trim();

            saveData();

            renderApp();

        });

    });

    // Delete List

    document.querySelectorAll(".delete-list").forEach(button => {

        button.addEventListener("click", function (e) {

            e.stopPropagation();

            if (!confirm("Delete this list?")) return;

            board.lists = board.lists.filter(
                item => item.id !== this.dataset.id
            );

            saveData();

            renderApp();

        });

    });

    if (addList) {
        boardContainer.appendChild(addList);
    }

    document.getElementById("boardTitle").textContent = board.name;

}

// Render Cards

function renderCards(cards, container) {

    container.innerHTML = "";

    cards.forEach(card => {

        const cardElement = document.createElement("div");

        cardElement.className = "card";

        cardElement.draggable = true;

        cardElement.dataset.id = card.id;

        cardElement.innerHTML = `

            <div class="card-header">

                <h4 class="card-title">
                    ${card.title}
                </h4>

                <span class="priority ${card.priority.toLowerCase()}">
                    ${card.priority}
                </span>

            </div>

                    ${card.description ? `
            <p class="card-description">
                ${card.description}
            </p>
            ` : ""}
            <div class="card-footer">

                <div class="card-date">
                    <i class="fa-solid fa-calendar"></i>
                    ${card.dueDate}
                </div>

                <div class="card-actions">

                    <button
                        class="edit-btn"
                        data-id="${card.id}">
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button
                        class="delete-btn"
                        data-id="${card.id}">
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            </div>

        `;

        // Edit Card

        cardElement
            .querySelector(".edit-btn")
            .addEventListener("click", function (e) {

                e.stopPropagation();

                editCard(card.id);

            });

        // Delete Card

        cardElement
            .querySelector(".delete-btn")
            .addEventListener("click", function (e) {

                e.stopPropagation();

                if (confirm("Delete this task?")) {

                    deleteCard(card.id);

                }

            });

        container.appendChild(cardElement);

    });

}