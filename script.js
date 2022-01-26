let myLibrary = [
    {
        title: "The Hobbit",
        author: "J.R.R Tolkien",
        pages: 295,
        readStatus: false
    },
    {
        title: "Dedoviya",
        author: "Sandokan S.",
        pages: 169,
        readStatus: true
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

function addBookToLibrary(title, author, pages, readStatus) {
    let newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook);
}

function createTable() {
    const table = document.querySelector('table');
    const tableBody = document.createElement('tbody');

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
createTable();