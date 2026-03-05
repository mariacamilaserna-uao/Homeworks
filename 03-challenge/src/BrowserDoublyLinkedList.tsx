// src/BrowserDoublyLinkedList.tsx

export interface BrowserPage {
  id: number;
  url: string;
  title: string;
  favicon: string;
  visitedAt: string;
}

export class BrowserNode {
  page: BrowserPage;
  prev: BrowserNode | null = null;
  next: BrowserNode | null = null;

  constructor(page: BrowserPage) {
    this.page = page;
  }
}

export class BrowserDoublyLinkedList {
  head: BrowserNode | null = null;
  tail: BrowserNode | null = null;
  private current: BrowserNode | null = null;
  size: number = 0;

  append(page: BrowserPage): void {
    const newNode = new BrowserNode(page);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.current = newNode;
    } else {
      newNode.prev = this.tail;
      if (this.tail) this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  getCurrent(): BrowserNode | null {
    return this.current;
  }

  goForward(): BrowserNode | null {
    if (this.current && this.current.next) {
      this.current = this.current.next;
    }
    return this.current;
  }

  goBack(): BrowserNode | null {
    if (this.current && this.current.prev) {
      this.current = this.current.prev;
    }
    return this.current;
  }

  canGoForward(): boolean {
    return !!(this.current?.next);
  }

  canGoBack(): boolean {
    return !!(this.current?.prev);
  }

  goToHead(): void {
    this.current = this.head;
  }

  goToTail(): void {
    this.current = this.tail;
  }

  toArray(): BrowserPage[] {
    const result: BrowserPage[] = [];
    let temp = this.head;
    while (temp) {
      result.push(temp.page);
      temp = temp.next;
    }
    return result;
  }
}

// Páginas simuladas del historial del navegador
const pagesData: BrowserPage[] = [
  {
    id: 1,
    url: "https://www.google.com",
    title: "Google",
    favicon: "🔍",
    visitedAt: "10:00 AM",
  },
  {
    id: 2,
    url: "https://www.github.com",
    title: "GitHub - Repositories",
    favicon: "🐙",
    visitedAt: "10:03 AM",
  },
  {
    id: 3,
    url: "https://stackoverflow.com/questions/linked-lists",
    title: "Stack Overflow - Linked Lists",
    favicon: "📚",
    visitedAt: "10:07 AM",
  },
  {
    id: 4,
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "YouTube - Never Gonna Give You Up",
    favicon: "🎬",
    visitedAt: "10:15 AM",
  },
  {
    id: 5,
    url: "https://reactjs.org/docs",
    title: "React Documentation",
    favicon: "⚛️",
    visitedAt: "10:20 AM",
  },
  {
    id: 6,
    url: "https://www.reddit.com/r/programming",
    title: "Reddit - r/programming",
    favicon: "🤖",
    visitedAt: "10:25 AM",
  },
];

export function createBrowserHistory(): BrowserDoublyLinkedList {
  const list = new BrowserDoublyLinkedList();
  pagesData.forEach((p) => list.append(p));
  // El cursor empieza en la última página visitada
  list.goToTail();
  return list;
}
