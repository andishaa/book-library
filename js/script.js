const tableBody = document.createElement('tbody');
const addBookBtn = document.getElementById('addBookBtn');

function init() {
    setUpAddBookBtn();
}
init();

class Library {
    constructor() {
        this.books = [];
    }

    addBook(newBook) {
        this.books.push(newBook);
    }

    removeBook(filteredArr) {
        this.books = [...filteredArr];
    }

    changeReadStatus(bookIndex) {
        if (this.books[bookIndex].readStatus === true) {
            this.books[bookIndex].readStatus = false;
        } else {
            this.books[bookIndex].readStatus = true;
        }
    }
}

const myLibrary = new Library;

class Book {
    constructor(title, author, pages, readStatus) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }
}

function setUpAddBookBtn() {
    addBookBtn.addEventListener('click', () => {
        let title = document.getElementById('bookTitle').value;
        let author = document.getElementById('bookAuthor').value;
        let pages = document.getElementById('bookPages').value;
        let readStatus = document.getElementById('readStatus').checked;

        if (title === '' || author === '' || pages === '') {
            return;
        }

        let newBook = new Book(title, author, pages, readStatus);
        myLibrary.addBook(newBook);

        document.getElementById('addBookForm').reset();

        createTable();
    });
}

function createTable() {
    tableBody.textContent = '';
    const table = document.querySelector('table');

    myLibrary.books.forEach(book => {
        let row = document.createElement('tr');
        let title = document.createElement('td');
        let author = document.createElement('td');
        let pages = document.createElement('td');
        let readStatus = document.createElement('td');

        let changeStatusBtn = document.createElement('button');
        changeStatusBtn.classList.add('changeStatusBtn');
        changeStatusBtn.id = `ch_${book.id}`;
        changeStatusBtn.textContent = 'Change status';

        let removeBtn = document.createElement('button');
        removeBtn.classList.add('removeButton');
        removeBtn.id = `del_${book.id}`;
        removeBtn.textContent = 'Remove';

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

    if (tableBody.textContent !== '') {
        setUpRemoveBtn();
        setUpChangeReadStatusBtn();
    }
};

function setUpRemoveBtn() {
    const removeBtn = document.querySelectorAll('.removeButton');
    removeBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (confirm('Are you sure you want to REMOVE this book') === false) {
                return;
            }

            let removeBtnId = e.target.id;
            let filteredArr = myLibrary.books.filter(book => !removeBtnId.includes(book.id));

            myLibrary.removeBook(filteredArr);
            createTable();
        });
    });
}

function setUpChangeReadStatusBtn() {
    const changeStatusBtn = document.querySelectorAll('.changeStatusBtn');
    changeStatusBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let changeStatusBtnId = e.target.id;
            let bookIndex = myLibrary.books.findIndex((book => changeStatusBtnId.includes(book.id)));
            myLibrary.changeReadStatus(bookIndex);
            createTable();
        });
    });
}