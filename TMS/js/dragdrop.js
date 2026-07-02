
// Drag & Drop


let draggedCardId = null;


// Enable Drag & Drop


function enableDragAndDrop() {

    const cards = document.querySelectorAll(".card");
    const dropZones = document.querySelectorAll(".cards");

    // Drag Start
    cards.forEach(card => {

        card.addEventListener("dragstart", function () {

            draggedCardId = this.dataset.id;

            this.classList.add("dragging");

        });

        // Drag End
        card.addEventListener("dragend", function () {

            this.classList.remove("dragging");

            draggedCardId = null;

        });

    });

    // Drop Zones
    dropZones.forEach(zone => {

        zone.addEventListener("dragover", function (e) {

            e.preventDefault();

            this.classList.add("drag-over");

        });

        zone.addEventListener("dragleave", function () {

            this.classList.remove("drag-over");

        });

        zone.addEventListener("drop", function (e) {

            e.preventDefault();

            this.classList.remove("drag-over");

            const targetListId = this.parentElement.dataset.id;

            if (!draggedCardId || !targetListId) return;

            moveCard(draggedCardId, targetListId);

        });

    });

}


// Move Card


function moveCard(cardId, targetListId) {

    const board = getCurrentBoard();

    let movedCard = null;

    // Remove from current list
    board.lists.forEach(list => {

        const index = list.cards.findIndex(
            card => card.id === cardId
        );

        if (index !== -1) {

            movedCard = list.cards.splice(index, 1)[0];

        }

    });

    if (!movedCard) return;

    // Find target list
    const targetList = board.lists.find(
        list => list.id === targetListId
    );

    if (!targetList) return;

    // Add card to target list
    targetList.cards.push(movedCard);

    saveData();

    renderApp();

}