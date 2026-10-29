const STORAGE_KEY = "boardly:boards";

function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function normalizeBoards(boards) {
  if (!Array.isArray(boards)) {
    return [];
  }

  return boards.map((board) => ({
    ...board,
    id: board.id || createId(),
    todos: Array.isArray(board.todos) ? board.todos : [],
  }));
}

export function loadBoards(fallbackBoards) {
  try {
    const storedBoards = localStorage.getItem(STORAGE_KEY);

    if (storedBoards === null) {
      return normalizeBoards(fallbackBoards);
    }

    return normalizeBoards(JSON.parse(storedBoards));
  } catch (error) {
    console.error("Failed to load boards:", error);
    return normalizeBoards(fallbackBoards);
  }
}

export function saveBoards(boards) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(boards));
    return true;
  } catch (error) {
    console.error("Failed to save boards:", error);
    return false;
  }
}

export function createBoard(title, color) {
  return {
    id: createId(),
    title,
    color,
    todos: [],
  };
}
