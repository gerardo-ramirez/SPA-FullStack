//este archivo actua como react, transforma la app en SPA.
//
import BookService from './services/BookService';

//importmamos timeago para formatear la fecha que se renderiza por img.
import { format } from 'timeago.js';

const bookService = new BookService();
class UI {
    //pinta en pantalla
    async  renderBooks() {
        const books = await bookService.getBooks();
        const booksCardContainer = document.getElementById('books-cards');
        booksCardContainer.innerHTML = '';
        //forHeach funciona como un map
        books.forEach(book => {
            const div = document.createElement(`div`);
            div.className = '';
            div.innerHTML = `
        <div class='card m-2'>
        <div class='row'>
        <div class='col-md-4'>
        <img src='${book.imagePath}' alt='' class='img-fluid'/>
        </div>
        <div class='col-md-8'>
        <div class='card-block px-2'>
        <h4>${book.title}</h4>
        <p class='card-text'>${book.author}</p>
        <a href='#' class='btn btn-danger delete' _id="${book._id}">x</a>
        </div>
        </div>
        <div class='card-footer'>
        ${format(book.create_at)}</div>
        </div>
        </div>
        
        `;
            booksCardContainer.appendChild(div);

        });
    }
    //agrega libro
    async addANewBook(book) {
        await bookService.postBook(book);
        this.clearBookForm();
        //llamo a render para traer los datos denuevo.
        this.renderBooks();

    }
    //limpia el formulario
    clearBookForm() {
        document.getElementById('book-form').reset();


    }
    //muestra mensaje
    renderMessage(message, colorMessage, secondsToRemove) {
        let div = document.createElement('div');
        div.className = `alert alert-${colorMessage} message`;
        const container = document.getElementById('contentMessage');
        const bookForm = document.getElementById('book-form');
        div.appendChild(document.createTextNode(message));
        container.insertBefore(div, bookForm);
        setTimeout(() => {
            document.querySelector('.message').remove()
        }, secondsToRemove);

    }
    //elimina elemeto de la interfazz
    async deleteBook(bookId) {
        await bookService.deleteBook(bookId);
        this.renderBooks();
    }

}

export default UI;