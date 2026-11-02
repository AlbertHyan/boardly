const STORAGE_KEY = 'boardly:boards';

function createId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// Normalize task
function normalizeTask(task) {
  if (!task || typeof task !== 'object' || Array.isArray(task)) {
    return {
      id: createId(),
      text: '',
      color: '#76ce1250',
      date: '',
      currentTime: Date.now(),
      completed: false,
    };
  }

  return {
    id: task.id || createId(),
    text: typeof task.text === 'string' ? task.text : '',
    color: typeof task.color === 'string' ? task.color : '#76ce1250',
    date: typeof task.date === 'string' ? task.date : '',
    currentTime:
      typeof task.currentTime === 'number'
        ? task.currentTime
        : Date.now(),
    completed: typeof task.completed === 'boolean'
      ? task.completed
      : false,
  };
}

// Normalize board item
function normalizeItem(item) {
  if (!item || typeof item !== 'object' || Array.isArray(item)) {
    return null;
  }

  if (item.type === 'task-list') {
    return {
      id: typeof item.id === 'string' && item.id
        ? item.id
        : createId(),
      type: 'task-list',
      title: typeof item.title === 'string' && item.title.trim()
        ? item.title
        : 'Untitled task list',
      tasks: Array.isArray(item.tasks)
        ? item.tasks.map(normalizeTask)
        : [],
    };
  }

  if (item.type === 'note') {
    return {
      id: typeof item.id === 'string' && item.id
        ? item.id
        : createId(),
      type: 'note',
      title: typeof item.title === 'string' && item.title.trim()
        ? item.title
        : 'Untitled note',
      content: typeof item.content === 'string'
        ? item.content
        : '',
    };
  }

  return null;
}

// Migrate legacy todos
function migrateLegacyTodos(board) {
  if (!Array.isArray(board.todos) || board.todos.length === 0) {
    return [];
  }

  return [
    {
      id: createId(),
      type: 'task-list',
      title: 'Tasks',
      tasks: board.todos.map(normalizeTask),
    },
  ];
}

// Normalize boards
export function normalizeBoards(boards) {
  if (!Array.isArray(boards)) {
    return [];
  }

  return boards
    .filter(
      (board) =>
        board !== null &&
        typeof board === 'object' &&
        !Array.isArray(board)
    )
    .map((board) => {
      const sourceItems = Array.isArray(board.items)
        ? board.items
        : migrateLegacyTodos(board);

      return {
        id: typeof board.id === 'string' && board.id
          ? board.id
          : createId(),
        title: typeof board.title === 'string' && board.title.trim()
          ? board.title
          : 'Untitled board',
        color: typeof board.color === 'string'
          ? board.color
          : '#76ce12',
        items: sourceItems
          .map(normalizeItem)
          .filter((item) => item !== null),
      };
    });
}

// Load boards
export function loadBoards(fallbackBoards) {
  try {
    const storedBoards = localStorage.getItem(STORAGE_KEY);

    if (storedBoards === null) {
      return normalizeBoards(fallbackBoards);
    }

    const parsedBoards = JSON.parse(storedBoards);

    if (!Array.isArray(parsedBoards)) {
      return normalizeBoards(fallbackBoards);
    }

    return normalizeBoards(parsedBoards);
  } catch (error) {
    console.error('Failed to load boards:', error);
    return normalizeBoards(fallbackBoards);
  }
}

// Save boards
export function saveBoards(boards) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(normalizeBoards(boards))
    );

    return true;
  } catch (error) {
    console.error('Failed to save boards:', error);
    return false;
  }
}

// Create board
export function createBoard(title, color) {
  return {
    id: createId(),
    title,
    color,
    items: [],
  };
}

// Create task list
export function createTaskList(title = 'Untitled task list') {
  return {
    id: createId(),
    type: 'task-list',
    title,
    tasks: [],
  };
}

// Create note
export function createNote(title = 'Untitled note') {
  return {
    id: createId(),
    type: 'note',
    title,
    content: '',
  };
}