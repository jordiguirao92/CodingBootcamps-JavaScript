class Book {
    constructor(title, author, isbn){
      this.title = title;
      this.author = author;
      this.isbn = isbn;
    }
  }
 
  class UI {
    addBookToList(book) {
       const list = document.getElementById('book-list');
 
       //Creamo un elemento tr
       const row = document.createElement('tr');
     
       //Insertamos columnas
       row.innerHTML = `
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.isbn}</td>
         <td><a href="#" class="btn btn-danger">X</a></td>
       `;
     
       list.appendChild(row);
    }
 
    showAlert(message, className) {
       //Creamos un div
       const div = document.createElement('div');
       //Añadimos clase
       div.className = `alert ${className}`;
       //Añadimos texto
       div.appendChild(document.createTextNode(message));
       
       const container = document.querySelector('.container');
  
       //Seleccionamos el formulario
       const form = document.querySelector('#book-form');
       //Insartamos elementos
       container.insertBefore(div, form);
 
       setTimeout(function(){
         document.querySelector('.alert').remove();
       }, 3000);
    }
 
    deleteBook(target) {
     if(target.className === 'btn btn-danger'){
       target.parentElement.parentElement.remove();
     }
    }
 
    clearFields() {
     document.getElementById('title').value = "";
     document.getElementById('author').value = "";
     document.getElementById('isbn').value = "";
    }
 }
 
 

 class Store {
 
   
   static getBooks() {
     let books;
     if(localStorage.getItem('books') === null) {
       books = [];
     } else {
       books = JSON.parse(localStorage.getItem('books'));
     }
 
     return books;
   }
 
   
   static displayBooks() {
     const books = Store.getBooks();
 
     books.forEach(function(book){
       const ui = new UI;
       //Añadimos el  libro al UI
       ui.addBookToList(book);
     });
   }
 
   //Añadimos libros al localStorage
   static addBook(book) {
     
     const books = Store.getBooks();
 
     //Añadimos un nuevo libro
     books.push(book);
     //Añadimos un clave-valor al localStorage
     localStorage.setItem('books', JSON.stringify(books));
   }
 
   static removeBook(isbn) {
     const books = Store.getBooks();
 
     books.forEach(function(book, index){
       if(book.isbn === isbn){
         books.splice(index, 1);
       }
     });
 
     localStorage.setItem('books', JSON.stringify(books));
   }
 }
 
 //Cargamos el DOM
 document.addEventListener('DOMContentLoaded', Store.displayBooks);
 
  //Event Listener
 document.getElementById('book-form').addEventListener('submit', function(e) {
 
   //Obtener los valores del formulario
   const title = document.getElementById('title').value,
         author = document.getElementById('author').value,
         isbn = document.getElementById('isbn').value
 
   //Creamos un nuevo libro(book)
   const book = new Book(title, author, isbn);
 
   //Iniciamos UI
   const ui = new UI();
 
   //Validar
   if(title === "" || author === "" || isbn === ""){
     //Alerta de error
     ui.showAlert('Please fill in all fields', 'error');
   } else {
     //Añadir libro a al lista
     ui.addBookToList(book);
 
     //Añadimos el libro al localStorage
     Store.addBook(book);
 
     //Mostramos alerta
     ui.showAlert('Book Added', 'success');
 
     //Creamos campos
     ui.clearFields();
   }
   
   e.preventDefault();
 });
 
 // Event Listener para eliminar
 document.getElementById('book-list').addEventListener('click', function(e){
   
   //Iniciar UI
   const ui = new UI();
   
   //Eliminar libro
   ui.deleteBook(e.target);
 
   //Borramos información del localStorage
   Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
 
   //Mostramos alerta
   ui.showAlert('Book Removed!', 'success');
 
   e.preventDefault();
 });