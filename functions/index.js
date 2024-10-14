import products from "../bookes.json" with {type: 'json'}
function reshowWindow() {
    const bookesTable = document.getElementById("bookesTable");
    bookesTable.innerHTML = ""
    let bookesOrder = JSON.parse(localStorage.getItem("bookesOrder")) || [];
    bookesOrder.forEach(key => {
        const value = JSON.parse(localStorage.getItem(key));
        let html = `<tr class="lineBook">
            <td>${key}</td>
            <td>${value.title}</td>
            <td>$${value.price}</td>
            <td><button id="${value.title}-read">Read</button></td>
            <td><button id="${value.title}-update">Update</button></td>
            <td><button id="${value.title}-delete"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M3 6h18M6 6v12a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V6M9 6V4a3 3 0 0 1 6 0v2"/>
<path d="M9 6h6"/>
<path d="M12 1v4"/>
</svg></button></td>
        </tr>`;
        bookesTable.insertAdjacentHTML("beforeend", html);
        document.getElementById(`${value.title}-read`).addEventListener("click", function () {
            putOnDisplay(value.title);
        });
        document.getElementById(`${value.title}-update`).addEventListener("click", function () {
            updateBook(key);
        });
        document.getElementById(`${value.title}-delete`).addEventListener("click", function () {
            deleteBook(key);
        });

    });
}
function initialization() {
    console.log("loading");
    console.log(products.books);
    let bookesOrder = JSON.parse(localStorage.getItem("bookesOrder")) || [];
    for (let book of products.books) {
        if (!bookesOrder.includes(book.id)) {
            bookesOrder.push(book.id);
            localStorage.setItem(book.id, JSON.stringify({ "title": book.title, "price": book.price, "img": book.image, "rating": book.rating }));
        }
    }
    localStorage.setItem("bookesOrder", JSON.stringify(bookesOrder));
}

function putOnDisplay(title) {
    const book = products.books.find(book => book.title === title);
    console.log(book);
    const div = document.getElementById("displayBook");
    let html = `
    <div class="title">
                <h3>${book.title}</h3>
            </div>
            <div class="bookInfo">
                <div class="imgFrame"><img src=${book.image}></div>
                <div class="priceAndRate">
                    <span class="Price"> price: $ ${book.price}</span>
                    <div class="rating-container">
                        <span>Rating:</span>
                        <div class="rating-bar">
                            <div class="rating-fill" style="width: ${book.rating * 10}%;"></div>
                        </div>
                        <span>${book.rating}</span>
                    </div>
                </div>
            </div>
    `
    div.innerHTML = html;

}

function deleteBook(id) {
    console.log(`Delete book with ID: ${id}`);
    localStorage.removeItem(id);
    let bookesOrder = JSON.parse(localStorage.getItem("bookesOrder")) || [];
    console.log(bookesOrder);
    bookesOrder = bookesOrder.filter(bookId => bookId.toString() !== id.toString());
    localStorage.setItem("bookesOrder", JSON.stringify(bookesOrder));
    reshowWindow();
}

function updateBook(key) {
    console.log(key);
}


document.getElementById('newBookForm').addEventListener('submit', function (event) {
    event.preventDefault(); // מונע מהפורם להגיש בצורה הרגילה

    // קבלת המידע מהפורם
    const formData = new FormData(event.target);
    const bookData = {};
    let bookId;
    formData.forEach((value, key) => {
        if (key === '_id') {
            bookId = value; // שומר את ה-ID בנפרד
        } else {
            bookData[key] = value; // מוסיף את המידע רק אם זה לא ID
        }
    });
    let bookesOrder = JSON.parse(localStorage.getItem("bookesOrder")) || [];
    console.log("before");
    
    console.log(bookesOrder);
    bookesOrder.push(bookId);
    console.log("after");
    
    console.log(bookesOrder);
    localStorage.setItem("bookesOrder", JSON.stringify(bookesOrder));
    localStorage.setItem(bookId,JSON.stringify(bookData))
    reshowWindow();
    // // אחסון המידע ב-localStorage
    // const books = JSON.parse(localStorage.getItem('books')) || []; // מקבל את ספרים מה-localStorage אם קיימים
    // books.push(bookData); // מוסיף את הספר החדש
    // localStorage.setItem('books', JSON.stringify(books)); // שומר את המידע ב-localStorage
    document.getElementById('newBookForm').reset();
});

// initialization();
reshowWindow();
