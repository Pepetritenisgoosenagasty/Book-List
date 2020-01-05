// Book COnstructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn   = isbn;
}

// UI function
function UI() {}

// Add book to list function
UI.prototype.addBookToList = function(book){
    const list = document.querySelector('#book-list');
    // Creating table rows (tr)
  const row = document.createElement('tr');
    
  row.innerHTML = `<td>${book.title}</td>
                  <td>${book.author}</td>
                  <td>${book.isbn}</td>
                  <td><a href="#" class="delete">X</a></td>
                  `;
    list.appendChild(row);              
}

// Clear Fields
UI.prototype.clearFields = function() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
}

// Show alert
UI.prototype.showAlert = function(msg, className) {
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

// Delete
UI.prototype.deleteBook = function(target) {
   if (target.className === 'delete') {
       target.parentElement.parentElement.remove();
   }
}


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

    // Validattion
    if (title === '' || author === '' || isbn === '') {
        // Show error Message
        ui.showAlert('Please fill in all fields', 'alert-danger');
 
    }else {

    // Add book to list
    ui.addBookToList(book);

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
    if (ui.deleteBook(e.target)) {
        // Show success Message
    ui.showAlert('Book removed successfully', 'alert-info');
    }
     
     
    e.preventDefault();
});
