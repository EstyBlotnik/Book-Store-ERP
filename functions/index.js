import products from "../bookes.json" with {type: 'json'}
function loadingBooks() {
    console.log("loading");
    console.log(products.books);
    for (let book of products.books) {
        let div = document.getElementById("bookesTable");
        let html = `<tr class="lineBook">
                        <td>${book.id}</td>
                        <td>${book.title}</td>
                        <td>$${book.price}</td>
                        <td>Read</td>
                        <td>Update</td>
                        <td>Delete</td>
                    </tr>`;
        div.insertAdjacentHTML("beforeend", html);
    }
}

function deleteBook(id) {
    // Add your delete logic here
    console.log(`Delete book with ID: ${id}`);
}


loadingBooks();