const tableBody = document.createElement('tbody');
const addBookBtn = document.getElementById('addBookBtn');

let myLibrary = [
    {
        title: "The Hobbit",
        author: "J.R.R Tolkien",
        pages: 295,
        readStatus: false
    },
];

class Book {
    constructor(title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }
}

addBookBtn.addEventListener('click', () => {
    let title = document.getElementById('bookTitle').value;
    let author = document.getElementById('bookAuthor').value;
    let pages = document.getElementById('bookPages').value;
    let readStatus = document.getElementById('readStatus').checked;

    if (title === '' || author === '' || pages === '') {
        return;
    }

    addBookToLibrary(title, author, pages, readStatus);

    document.getElementById('addBookForm').reset();

    createTable();
});

function addBookToLibrary(title, author, pages, readStatus) {
    let newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook);
}

function createTable() {
    tableBody.textContent = '';
    const table = document.querySelector('table');

    myLibrary.forEach(book => {
        let row = document.createElement('tr');
        let title = document.createElement('td');
        let author = document.createElement('td');
        let pages = document.createElement('td');
        let readStatus = document.createElement('td');

        let changeStatusBtn = document.createElement('button');
        changeStatusBtn.classList.add('changeStatusBtn');
        changeStatusBtn.textContent = 'change read status';

        let removeBtn = document.createElement('button');
        removeBtn.classList.add('removeButton');
        removeBtn.textContent = 'Delete';

        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = book.pages;
        if (book.readStatus) {
            readStatus.textContent = 'Read';
        } else {
            readStatus.textContent = 'Not read';
        }

        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(pages);
        row.appendChild(readStatus);
        row.appendChild(changeStatusBtn);
        row.appendChild(removeBtn);

        tableBody.appendChild(row)

    });

    table.appendChild(tableBody);

}