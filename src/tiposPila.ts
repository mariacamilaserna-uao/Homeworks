export interface Libro {
  nombre: string;
  isbn: string;
  autor: string;
  editorial: string;
}

export class PilaLibros {
  libros: Libro[] = [];

  agregarLibro(libro: Libro) {
    this.libros.push(libro);
  }

  sacarLibro(): Libro | undefined {
    return this.libros.pop();
  }

  verTope(): Libro | undefined {
    if (this.libros.length === 0) return undefined;
    return this.libros[this.libros.length - 1];
  }

  cuantosHay(): number {
    return this.libros.length;
  }

  estaVacia(): boolean {
    return this.libros.length === 0;
  }

  obtenerTodos(): Libro[] {
    return [...this.libros];
  }
}

export function generarDatosEjemplo(): Libro[] {
  return [
    {
      nombre: "Cien años de soledad",
      isbn: "978-8401336956",
      autor: "Gabriel Garcia Marquez",
      editorial: "Sudamericana"
    },
    {
      nombre: "El amor en los tiempos del colera",
      isbn: "978-8401414249",
      autor: "Gabriel Garcia Marquez",
      editorial: "Sudamericana"
    },
    {
      nombre: "Las aventuras de Sherlock Holmes",
      isbn: "978-8426104007",
      autor: "Arthur Conan Doyle",
      editorial: "Alianza"
    },
    {
      nombre: "Don Quijote de la Mancha",
      isbn: "978-8423357130",
      autor: "Miguel de Cervantes",
      editorial: "Espasa"
    },
    {
      nombre: "La casa de los espiritus",
      isbn: "978-8401014152",
      autor: "Isabel Allende",
      editorial: "Sudamericana"
    }
  ];
}
