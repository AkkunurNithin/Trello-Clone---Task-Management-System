
// Application Data


const appData = {
    boards: [
        {
            id: generateId(),
            name: "My Board",

            lists: [
                {
                    id: generateId(),
                    name: "Today",

                    cards: [
                        {
                            id: generateId(),
                            title: "Build Homepage",
                            description: "Design the landing page UI",
                            dueDate: "2026-07-05",
                            priority: "High"
                        }
                    ]
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
        }
    ],

    currentBoardId: null
};

// Select the first board by default
appData.currentBoardId = appData.boards[0].id;