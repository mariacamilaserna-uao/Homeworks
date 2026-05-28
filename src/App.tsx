import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.scss'

type Song = {
  id: number
  title: string
  artist: string
  genre: string
  plays: number
}

class TrieNode {
  children = new Map<string, TrieNode>()
  isEnd = false
  song: Song | null = null
}

class SongTrie {
  root = new TrieNode()

  insert(song: Song) {
    let current = this.root
    const title = song.title.toLowerCase()

    for (const letter of title) {
      if (!current.children.has(letter)) {
        current.children.set(letter, new TrieNode())
      }
      current = current.children.get(letter)!
    }

    current.isEnd = true
    current.song = song
  }

  search(title: string) {
    const node = this.getNode(title.toLowerCase())
    return Boolean(node?.isEnd)
  }

  suggest(prefix: string) {
    const node = this.getNode(prefix.toLowerCase())
    if (!node) return []

    const songs: Song[] = []
    this.collect(node, songs)
    return songs.slice(0, 6)
  }

  private getNode(text: string) {
    let current = this.root

    for (const letter of text) {
      const next = current.children.get(letter)
      if (!next) return null
      current = next
    }

    return current
  }

  private collect(node: TrieNode, songs: Song[]) {
    if (node.isEnd && node.song) {
      songs.push(node.song)
    }

    for (const child of node.children.values()) {
      this.collect(child, songs)
    }
  }
}

class MaxHeap {
  data: Song[] = []

  insert(song: Song) {
    this.data.push(song)
    this.up(this.data.length - 1)
  }

  top(amount: number) {
    const copy = new MaxHeap()
    this.data.forEach((song) => copy.insert(song))
    const songs: Song[] = []

    while (copy.data.length && songs.length < amount) {
      const song = copy.extract()
      if (song) songs.push(song)
    }

    return songs
  }

  private extract() {
    if (this.data.length === 0) return null
    if (this.data.length === 1) return this.data.pop()!

    const max = this.data[0]
    this.data[0] = this.data.pop()!
    this.down(0)
    return max
  }

  private up(index: number) {
    let child = index

    while (child > 0) {
      const parent = Math.floor((child - 1) / 2)
      if (this.data[parent].plays >= this.data[child].plays) break
      this.swap(parent, child)
      child = parent
    }
  }

  private down(index: number) {
    let parent = index

    while (true) {
      const left = parent * 2 + 1
      const right = parent * 2 + 2
      let biggest = parent

      if (left < this.data.length && this.data[left].plays > this.data[biggest].plays) {
        biggest = left
      }

      if (right < this.data.length && this.data[right].plays > this.data[biggest].plays) {
        biggest = right
      }

      if (biggest === parent) break
      this.swap(parent, biggest)
      parent = biggest
    }
  }

  private swap(a: number, b: number) {
    const temp = this.data[a]
    this.data[a] = this.data[b]
    this.data[b] = temp
  }
}

class SongGraph {
  edges = new Map<number, Set<number>>()

  addSong(id: number) {
    if (!this.edges.has(id)) {
      this.edges.set(id, new Set())
    }
  }

  connect(a: number, b: number) {
    this.addSong(a)
    this.addSong(b)
    this.edges.get(a)!.add(b)
    this.edges.get(b)!.add(a)
  }

  related(id: number, songs: Song[]) {
    const ids = this.edges.get(id) ?? new Set()
    return [...ids]
      .map((songId) => songs.find((song) => song.id === songId))
      .filter((song): song is Song => Boolean(song))
  }
}

const firstSongs: Song[] = [
  { id: 1, title: 'In the end', artist: 'Linkin Park', genre: 'Nu metal', plays: 980 },
  { id: 2, title: 'Chop suey', artist: 'System of a Down', genre: 'Nu metal', plays: 940 },
  { id: 3, title: 'Everlong', artist: 'Foo Fighters', genre: 'Rock alternativo', plays: 890 },
  { id: 4, title: 'Killing in the name', artist: 'Rage Against the Machine', genre: 'Rock rap', plays: 860 },
  { id: 5, title: 'Reptilia', artist: 'The Strokes', genre: 'Indie rock', plays: 790 },
  { id: 6, title: 'Fluorescent adolescent', artist: 'Arctic Monkeys', genre: 'Indie rock', plays: 760 },
  { id: 7, title: 'Last nite', artist: 'The Strokes', genre: 'Indie rock', plays: 720 },
  { id: 8, title: 'Aerials', artist: 'System of a Down', genre: 'Nu metal', plays: 700 },
]

const firstConnections = [
  [1, 2],
  [1, 4],
  [1, 8],
  [2, 8],
  [3, 5],
  [3, 6],
  [4, 8],
  [5, 6],
  [5, 7],
  [6, 7],
]

function buildTrie(songs: Song[]) {
  const trie = new SongTrie()
  songs.forEach((song) => trie.insert(song))
  return trie
}

function buildHeap(songs: Song[]) {
  const heap = new MaxHeap()
  songs.forEach((song) => heap.insert(song))
  return heap
}

function buildGraph(songs: Song[]) {
  const graph = new SongGraph()
  songs.forEach((song) => graph.addSong(song.id))
  firstConnections.forEach(([a, b]) => graph.connect(a, b))
  return graph
}

function App() {
  const [songs, setSongs] = useState(firstSongs)
  const [query, setQuery] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newArtist, setNewArtist] = useState('')
  const [selectedId, setSelectedId] = useState(firstSongs[0].id)

  const trie = useMemo(() => buildTrie(songs), [songs])
  const heap = useMemo(() => buildHeap(songs), [songs])
  const graph = useMemo(() => buildGraph(songs), [songs])
  const suggestions = query.trim() ? trie.suggest(query.trim()) : []
  const exists = query.trim() ? trie.search(query.trim()) : false
  const topSongs = heap.top(5)
  const selectedSong = songs.find((song) => song.id === selectedId) ?? songs[0]
  const relatedSongs = graph.related(selectedSong.id, songs)

  function addSong(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const title = newTitle.trim()
    const artist = newArtist.trim()

    if (!title || !artist) return

    const nextSong: Song = {
      id: Date.now(),
      title,
      artist,
      genre: 'Nuevo',
      plays: Math.floor(Math.random() * 350) + 250,
    }

    setSongs((current) => [...current, nextSong])
    setNewTitle('')
    setNewArtist('')
    setQuery(title)
    setSelectedId(nextSong.id)
  }

  return (
    <main className="app">
      <section className="intro">
        <div>
          <span className="tag">Parcial 3</span>
          <h1>Spotify aula</h1>
          <p>
            Una mini plataforma para buscar canciones, ver el top y recibir
            recomendaciones segun canciones parecidas.
          </p>
        </div>
        <div className="stats">
          <span>{songs.length}</span>
          <small>canciones cargadas</small>
        </div>
      </section>

      <section className="layout">
        <div className="panel search-panel">
          <div className="panel-head">
            <span>Trie</span>
            <h2>Buscador predictivo</h2>
          </div>

          <label htmlFor="search">Buscar cancion</label>
          <input
            id="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ej: In the end"
          />

          <div className={exists ? 'result ok' : 'result'}>
            {query.trim()
              ? exists
                ? 'La cancion si existe en el Trie'
                : 'No esta exacta, mira las sugerencias'
              : 'Escribe para buscar rapido'}
          </div>

          <div className="suggestions">
            {suggestions.map((song) => (
              <button
                key={song.id}
                type="button"
                onClick={() => {
                  setQuery(song.title)
                  setSelectedId(song.id)
                }}
              >
                <strong>{song.title}</strong>
                <span>{song.artist}</span>
              </button>
            ))}
          </div>

          <form className="add-form" onSubmit={addSong}>
            <h3>Agregar cancion</h3>
            <div>
              <input
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
                placeholder="Nombre"
              />
              <input
                value={newArtist}
                onChange={(event) => setNewArtist(event.target.value)}
                placeholder="Artista"
              />
            </div>
            <button type="submit">Guardar</button>
          </form>
        </div>

        <div className="panel ranking-panel">
          <div className="panel-head">
            <span>Max Heap</span>
            <h2>Top mas escuchadas</h2>
          </div>

          <div className="ranking">
            {topSongs.map((song, index) => (
              <button
                key={song.id}
                type="button"
                className={song.id === selectedSong.id ? 'active' : ''}
                onClick={() => setSelectedId(song.id)}
              >
                <b>{index + 1}</b>
                <span>
                  <strong>{song.title}</strong>
                  <small>{song.artist}</small>
                </span>
                <em>{song.plays}</em>
              </button>
            ))}
          </div>
        </div>

        <div className="panel graph-panel">
          <div className="panel-head">
            <span>Grafo</span>
            <h2>Relacionadas</h2>
          </div>

          <div className="selected">
            <strong>{selectedSong.title}</strong>
            <span>{selectedSong.genre}</span>
          </div>

          <div className="related">
            {relatedSongs.length ? (
              relatedSongs.map((song) => (
                <button
                  key={song.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(song.id)
                    setQuery(song.title)
                  }}
                >
                  {song.title}
                  <span>{song.artist}</span>
                </button>
              ))
            ) : (
              <p>Esta cancion aun no tiene conexiones en el grafo.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
