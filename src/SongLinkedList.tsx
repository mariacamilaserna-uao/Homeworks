// src/SongLinkedList.tsx

export interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  year: number;
  audioUrl: string;
}

export class SongNode {
  song: Song;
  next: SongNode | null = null;

  constructor(song: Song) {
    this.song = song;
  }
}

export class SongLinkedList {
  head: SongNode | null = null;
  private current: SongNode | null = null;
  size: number = 0;

  append(song: Song): void {
    const newNode = new SongNode(song);
    if (!this.head) {
      this.head = newNode;
      this.current = this.head;
    } else {
      let temp = this.head;
      while (temp.next) {
        temp = temp.next;
      }
      temp.next = newNode;
    }
    this.size++;
  }

  getCurrent(): SongNode | null {
    return this.current;
  }

  nextSong(): SongNode | null {
    if (this.current && this.current.next) {
      this.current = this.current.next;
    }
    return this.current;
  }

  reset(): void {
    this.current = this.head;
  }

  hasNext(): boolean {
    return !!(this.current?.next);
  }

  toArray(): Song[] {
    const result: Song[] = [];
    let temp = this.head;
    while (temp) {
      result.push(temp.song);
      temp = temp.next;
    }
    return result;
  }
}

// 4 canciones Nu Metal / Rock clásico con audio de archive.org
const songsData: Song[] = [
  {
    id: 1,
    title: "Breaking the Habit",
    artist: "Linkin Park",
    album: "Meteora",
    year: 2003,
    audioUrl:
      "https://ia800304.us.archive.org/7/items/LinkinParkBreakingTheHabit/BreakingTheHabit.mp3",
  },
  {
    id: 2,
    title: "Numb",
    artist: "Linkin Park",
    album: "Meteora",
    year: 2003,
    audioUrl:
      "https://ia801602.us.archive.org/16/items/LinkinParkNumb_201611/Linkin%20Park%20-%20Numb.mp3",
  },
  {
    id: 3,
    title: "Chop Suey!",
    artist: "System of a Down",
    album: "Toxicity",
    year: 2001,
    audioUrl:
      "https://ia800500.us.archive.org/8/items/SystemOfADownChopSuey_201611/System%20Of%20A%20Down%20-%20Chop%20Suey%21.mp3",
  },
  {
    id: 4,
    title: "Down with the Sickness",
    artist: "Disturbed",
    album: "The Sickness",
    year: 2000,
    audioUrl:
      "https://ia801406.us.archive.org/14/items/DisturbedDownWithTheSickness/Disturbed%20-%20Down%20With%20The%20Sickness.mp3",
  },
];

export function createSongPlaylist(): SongLinkedList {
  const list = new SongLinkedList();
  songsData.forEach((s) => list.append(s));
  return list;
}
