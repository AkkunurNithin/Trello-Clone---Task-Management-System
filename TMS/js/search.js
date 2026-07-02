
// Search Tasks

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", searchCards);

function searchCards() {

    const searchText = searchInput.value.toLowerCase();

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        const title = card
            .querySelector(".card-title")
            .textContent
            .toLowerCase();

        const description = card
            .querySelector(".card-description")
            .textContent
            .toLowerCase();

        if (
            title.includes(searchText) ||
            description.includes(searchText)
        ) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }

    });

}
