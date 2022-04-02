
class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    getBook(bookId){
        return this.books.filter(book => book.id === bookId)[0];
    }

    removeBook(bookId) {
        this.books = this.books.filter(book => book.id !== bookId);
    }

    changeBookReadStatus(bookId) {
        const book = this.getBook(bookId);
        book.readStatus = !book.readStatus;
    }
}

class Book {
    constructor(title, author, pages, readStatus) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }
}

const rowPrefix = 'row_';

const tableContainer = document.getElementById('table-container');
const addBookBtn = document.getElementById('addBookBtn');
const myLibrary = new Library;

function toggleForm() {
    let addBookForm = document.getElementById('addBookForm');
    let toggleBookFormBtn = document.getElementById('toggleBookFormBtn');

    if (addBookForm.style.display === 'none') {
        toggleBookFormBtn.textContent = 'Close book form';
        addBookForm.style.display = 'block';
    } else {
        toggleBookFormBtn.textContent = 'Add new book';
        addBookForm.style.display = 'none';
    }
}

function setUpAddBookBtn() {
    addBookBtn.addEventListener('click', (e) => {
        e.preventDefault();
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

    if (myLibrary.books.length === 0) {
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

        row.id = rowPrefix + book.id;
        row.classList.add('book-row');

        let changeStatusBtn = document.createElement('button');
        changeStatusBtn.classList.add('changeStatusBtn');
        changeStatusBtn.textContent = 'Change status';
        tdChangeStatusBtn.appendChild(changeStatusBtn);

        let removeBtn = document.createElement('button');
        removeBtn.classList.add('removeButton');
        removeBtn.textContent = 'Remove';
        tdRemoveBtn.appendChild(removeBtn);

        tdTitle.textContent = book.title;
        tdAuthor.textContent = book.author;
        tdPages.textContent = book.pages;
        changeReadStatus(book.id, tdReadStatus);

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

function changeReadStatus(bookId, tdReadStatus) {
    const book = myLibrary.getBook(bookId);
    if (book.readStatus) {
        tdReadStatus.textContent = 'Read';
    } else {
        tdReadStatus.textContent = 'Not read';
    }
}

function setUpRemoveBtn() {
    const removeBtn = document.querySelectorAll('.removeButton');
    removeBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (confirm('Are you sure you want to REMOVE this book') === false) {
                return;
            }

            const bookId = getBookIdFromClosestParentBookRow(e.target);
            myLibrary.removeBook(bookId);

            createTable();
        });
    });
}

function getBookIdFromClosestParentBookRow(domElement) {
    return domElement.closest('.book-row').id.replace(/^row\_/,'');
}

function setUpChangeReadStatusBtn() {
    const changeStatusBtn = document.querySelectorAll('.changeStatusBtn');
    changeStatusBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const bookId = getBookIdFromClosestParentBookRow(e.target);
            myLibrary.changeBookReadStatus(bookId);
            const bookRow = e.target.closest('.book-row');
            const statusColumnIndex = [...bookRow.closest('table').querySelectorAll('th')].findIndex(th => th.textContent === "Status");
            const tdReadStatus = bookRow.querySelectorAll('td')[statusColumnIndex];
            changeReadStatus(bookId,tdReadStatus);
        });
    });
}

function init() {
    setUpAddBookBtn();
}
init();