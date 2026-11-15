import type { Board, BoardItem, NoteItem, Task, TaskListItem } from '@shared/types/board';


const STORAGE_KEY = 'boardly:boards';

interface LegacyBoard extends Omit<Partial<Board>, 'items'> {
  todos?: unknown[];
  items?: unknown[];
}

function createId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// Normalize task
function normalizeTask(task: unknown): Task {
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

  const source = task as Partial<Task>;

  return {
    id: source.id || createId(),
    text: typeof source.text === 'string' ? source.text : '',
    color: typeof source.color === 'string' ? source.color : '#76ce1250',
    date: typeof source.date === 'string' ? source.date : '',
    currentTime:
      typeof source.currentTime === 'number'
        ? source.currentTime
        : Date.now(),
    completed: typeof source.completed === 'boolean'
      ? source.completed
      : false,
  };
}

// Normalize board item
function normalizeItem(item: unknown): BoardItem | null {
  if (!item || typeof item !== 'object' || Array.isArray(item)) {
    return null;
  }

  const source = item as Record<string, unknown>;

  if (source.type === 'task-list') {
    const taskList: TaskListItem = {
      id: typeof source.id === 'string' && source.id
        ? source.id
        : createId(),

      type: 'task-list',

      title: typeof source.title === 'string' && source.title.trim()
        ? source.title
        : 'Untitled task list',

      tasks: Array.isArray(source.tasks)
        ? source.tasks.map(normalizeTask)
        : [],
    };

    return taskList;
  }

  if (source.type === 'note') {
    const note: NoteItem = {
      id: typeof source.id === 'string' && source.id
        ? source.id
        : createId(),

      type: 'note',

      title: typeof source.title === 'string' && source.title.trim()
        ? source.title
        : 'Untitled note',

      content: typeof source.content === 'string'
        ? source.content
        : '',
    };

    return note;
  }

  return null;
}

// Migrate legacy todos
function migrateLegacyTodos(board: LegacyBoard): BoardItem[] {
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
export function normalizeBoards(boards: unknown): Board[] {
  if (!Array.isArray(boards)) {
    return [];
  }

  return boards
    .filter(
      (board): board is LegacyBoard =>
        board !== null &&
        typeof board === 'object' &&
        !Array.isArray(board)
    )
    .map((board): Board => {
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
          .filter((item): item is BoardItem => item !== null),
      };
    });
}


// Load boards
export function loadBoards(fallbackBoards: Board[]): Board[] {
  try {
    const storedBoards = localStorage.getItem(STORAGE_KEY);

    if (storedBoards === null) {
      return normalizeBoards(fallbackBoards);
    }

    const parsedBoards: unknown = JSON.parse(storedBoards);

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
export function saveBoards(boards: Board[]): boolean {
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
export function createBoard(title: string, color: string): Board {
  return {
    id: createId(),
    title,
    color,
    items: [],
  };
}

// Create task list
export function createTaskList(title = 'Untitled task list'): TaskListItem {
  return {
    id: createId(),
    type: 'task-list',
    title,
    tasks: [],
  };
}

// Create note
export function createNote(title = 'Untitled note'): NoteItem {
  return {
    id: createId(),
    type: 'note',
    title,
    content: '',
  };
}
