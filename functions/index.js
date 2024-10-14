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
                        <td><button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 6h18M6 6v12a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V6M9 6V4a3 3 0 0 1 6 0v2"/>
    <path d="M9 6h6"/>
    <path d="M12 1v4"/>
</svg></button></td>
                    </tr>`;
        div.insertAdjacentHTML("beforeend", html);
    }
}

function deleteBook(id) {
    // Add your delete logic here
    console.log(`Delete book with ID: ${id}`);
}


loadingBooks();