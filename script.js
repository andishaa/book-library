let myLibrary = [
    {
        title: "The Hobbit",
        author: "J.R.R Tolkien",
        pages: 295,
        read: false
    },
    {
        title: "Dedoviya",
        author: "Sandokan S.",
        pages: 169,
        read: true
    },
];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.info = function () {
            return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
        };
    }
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}