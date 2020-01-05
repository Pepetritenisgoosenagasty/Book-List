class Book {
    constructor(title, author, isbn) {
       this.title = title;
       this.author = author;
       this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.querySelector('#book-list');
        // Creating table rows (tr)
      const row = document.createElement('tr');
        
      row.innerHTML = `<td>${book.title}</td>
                      <td>${book.author}</td>
                      <td>${book.isbn}</td>
                      <td><a href="#" class="delete"><i class="fa fa-trash-alt text-danger"></i> Delete</a></td>
                      `;
        list.appendChild(row); 
    }

    showAlert(msg, className) {
        const div = document.createElement('div');
             div.className = `alert ${className}`;

            //    Add text to div
            div.appendChild(document.createTextNode(msg));

            // Get parent 
            const container = document.querySelector('.container');

            const form = document.querySelector('#book-form');


            // Insert alert Before container
            container.insertBefore(div, form);

            //    Set time to remove err message
            setTimeout(() => {
                document.querySelector('.alert').remove();
            }, 3000);
   

    }

    deleteBook(target){
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// storing books in local storage
class Store {
    static getBooks(){
     let books;
     if (localStorage.getItem('books') === null) {
         books = [];
     }else {
         books = JSON.parse(localStorage.getItem('books'));
     }
     return books;
    }

    static dispalyBooks() {
        const books = Store.getBooks();

        books.forEach((book) => {
            
            const ui = new UI();
            // add books to ui
            ui.addBookToList(book);
        });
    }

    static addBooks(book) {
       const books = Store.getBooks();

       books.push(book);

       localStorage.setItem('books', JSON.stringify(books));


    }

    static removeBooks(isbn) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
}

}



// DOM load event
document.addEventListener('DOMContentLoaded', Store.dispalyBooks);

// Events Listeners
const form = document.querySelector('#book-form');

form.addEventListener('submit', (e) => {
   
    // Get form values
    const title = document.querySelector('#title').value,
          author = document.querySelector('#author').value,
          isbn = document.querySelector('#isbn').value;

    // Instantiate Book function
    const book = new Book(title, author, isbn);   

    // Instantiate UI function
    const ui = new UI();
     console.log(ui);
    // Validattion
    if (title === '' || author === '' || isbn === '') {
        // Show error Message
        ui.showAlert('Please fill in all fields', 'alert-danger');
 
    }else {

    // Add book to list
    ui.addBookToList(book);

    // Add book to local storage
    Store.addBooks(book);

    // Show success Message
    ui.showAlert('Book added successfully', 'alert-success');
    }

    // Clear fields
    ui.clearFields();

    e.preventDefault();
});

// Delete book
document.getElementById('book-list').addEventListener('click', function(e) {

    // Instantiate UI
    const ui = new UI();

    // Deleting book
   ui.deleteBook(e.target);

   // Deleting from local storage
   Store.removeBooks(e.target.parentElement.previousElementSibling.textContent);    
        // Show success Message
    ui.showAlert('Book removed successfully', 'alert-info');
   
     
     
    e.preventDefault();
    
});


