//los servicios no son mas que clases. Aqui invocamos a la API. 
class BookService {
    //los constructores siempre se ejecutan al instanciar la clase.
    constructor() {
        this.URI = '/api/books'

    }
    async getBooks() {
        const response = await fetch(this.URI);
        const books = await response.json();
        return books;

    }
    //espera datos :book
    async  postBook(book) {
        const respuesta = await fetch(this.URI, {
            //creamos cabeceras headers que le dicen que es lo que le estoy enviando al backend.
            method: "POST",
            body: book
        });
        const data = await respuesta.json();
        console.log(data);
    }
    async deleteBook(bookId) {
        const res = await fetch(`${this.URI}/${bookId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE',

        });
        const data = await res.json();
        console.log(data);


    }
};
export default BookService;