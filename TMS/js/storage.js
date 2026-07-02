
// LocalStorage Key

const STORAGE_KEY = "taskflow-data";

// Save Data

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
}

// Load Data

function loadData() {

    const savedData = localStorage.getItem(STORAGE_KEY);

    if (!savedData) return;

    const parsedData = JSON.parse(savedData);

    appData.boards = parsedData.boards;
    appData.currentBoardId = parsedData.currentBoardId;
}

// Clear Storage (Optional)

function clearStorage() {
    localStorage.removeItem(STORAGE_KEY);
}