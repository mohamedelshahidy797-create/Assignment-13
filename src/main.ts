
class User {

    public notebooks: NoteBook[] = []

    constructor(
        public id: number,
        public name: string,
        public email: string,
        private password: string,
        public phone: string,
        public age: number
    ) {
        if (age < 18 || age > 60) {
            throw new Error("Age must be between 18 and 60")
        }
    }

    displayInfo() {
        console.log({
            id: this.id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            age: this.age
        })
    }

    addNoteBook(notebook: NoteBook) {
        this.notebooks.push(notebook)
    }

}


class Admin extends User {

    manageNotes() {
        console.log("Admin can manage notes")
    }

}


class Note {    

    constructor(
        public id: number,
        public title: string,
        public content: string,
        public userId: User
    ) {}

    see(): string {
        return this.content.slice(0, 20)
    }

}


class NoteBook {

    private notes: Note[] = []

    addNote(id: number, title: string, content: string, userId: User) {

        const note = new Note(id, title, content, userId)

        this.notes.push(note)

    }

    removeNote(id: number) {

        this.notes = this.notes.filter(ele => ele.id != id)

    }

}


class Storage<T> {

    private items: T[] = []

    addItem(item: T) {
        this.items.push(item)
    }

    removeItem(item: T) {
        this.items = this.items.filter(ele => ele !== item)
    }

    getAllItems(): T[] {
        return this.items
    }

}


const admin = new Admin(
    1,
    "Mohamed",
    "mohamed@gmail.com",
    "123456",
    "01201272468",
    22
)

admin.displayInfo()
admin.manageNotes()


const notebook1 = new NoteBook()
const notebook2 = new NoteBook()

admin.addNoteBook(notebook1)
admin.addNoteBook(notebook2)


notebook1.addNote(1, "First Note", "This is my first note", admin)

notebook1.addNote(2, "Second Note", "This is my second note", admin)

notebook1.removeNote(1)


const note = new Note(3, "Third Note", "This is my third note", admin)

console.log(note.see())


const storage = new Storage<Note>()

storage.addItem(note)

console.log(storage.getAllItems())

storage.removeItem(note)

console.log(storage.getAllItems())
