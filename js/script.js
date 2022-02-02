const tableContainer = document.getElementById('table-container');
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
    tableContainer.textContent = '';

    if(myLibrary.books.length === 0) {
        return;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const trow = document.createElement('tr');
    const tbody = document.createElement('tbody');

    const thTitle = document.createElement('th');
    thTitle.textContent = 'Title';
    const thAuthor = document.createElement('th');
    thAuthor.textContent = 'Author';
    const thPages = document.createElement('th');
    thPages.textContent = 'Pages';
    const thStatus = document.createElement('th');
    thStatus.textContent = 'Status';

    trow.appendChild(thTitle);
    trow.appendChild(thAuthor);
    trow.appendChild(thPages);
    trow.appendChild(thStatus);

    thead.appendChild(trow);

    table.appendChild(thead);

    myLibrary.books.forEach(book => {
        let row = document.createElement('tr');
        let tdTitle = document.createElement('td');
        let tdAuthor = document.createElement('td');
        let tdPages = document.createElement('td');
        let tdReadStatus = document.createElement('td');
        let tdChangeStatusBtn = document.createElement('td');
        let tdRemoveBtn = document.createElement('td');

        let changeStatusBtn = document.createElement('button');
        changeStatusBtn.classList.add('changeStatusBtn');
        changeStatusBtn.id = `ch_${book.id}`;
        changeStatusBtn.textContent = 'Change status';
        tdChangeStatusBtn.appendChild(changeStatusBtn);

        let removeBtn = document.createElement('button');
        removeBtn.classList.add('removeButton');
        removeBtn.id = `del_${book.id}`;
        removeBtn.textContent = 'Remove';
        tdRemoveBtn.appendChild(removeBtn);

        tdTitle.textContent = book.title;
        tdAuthor.textContent = book.author;
        tdPages.textContent = book.pages;
        if (book.readStatus) {
            tdReadStatus.textContent = 'Read';
        } else {
            tdReadStatus.textContent = 'Not read';
        }

        row.appendChild(tdTitle);
        row.appendChild(tdAuthor);
        row.appendChild(tdPages);
        row.appendChild(tdReadStatus);
        row.appendChild(tdChangeStatusBtn);
        row.appendChild(tdRemoveBtn);

        tbody.appendChild(row);

    });

    table.appendChild(tbody);
    tableContainer.appendChild(table);

    if (tbody.textContent !== '') {
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