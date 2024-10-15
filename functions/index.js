import products from "../bookes.json" with {type: 'json'}
function reshowWindow() {
    const bookesTable = document.getElementById("bookesTable");
    bookesTable.innerHTML = ""
    let bookesOrder = JSON.parse(localStorage.getItem("bookesOrder")) || [];
    bookesOrder.forEach(key => {
        const value = JSON.parse(localStorage.getItem(key));
        if (value) {
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
            putOnDisplay(key);
        });
        document.getElementById(`${value.title}-update`).addEventListener("click", function () {
            addForm(key,value);
        });
        document.getElementById(`${value.title}-delete`).addEventListener("click", function () {
            deleteBook(key);
        });
    }

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

function putOnDisplay(id) {

    const book = JSON.parse(localStorage.getItem(id));
    console.log(book);
    const div = document.getElementById("displayBook");
    let html = `
    <div class="title">
                <h3>${book.title}</h3>
            </div>
            <div class="bookInfo">
                <div class="imgFrame"><img src=${book.img}></div>
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
    if (div) {
        div.innerHTML = html;
    } else {
        console.error('Div with id "bookDisplay" not found.');
    }
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

document.getElementById('newBook').addEventListener("click", function () {
    addForm();
});

function addForm(key=null,value=null){
    console.log("first")
    const div=document.getElementById('placeForPopup');
    div.innerHTML=` 
        <div id="popup" class="popup">
        <div class="popup-content">
            <span id="closePopup" class="close">&times;</span>
            <h1>${key?"Edit Book":"+ New book"}</h1>
            <h2>- - - - - - - - - - - - - - - - -</h2>
            <form id="newBookForm">
            ${key?
                `<div> <h2> book: ${key}</h2></div>
                <input type="hidden" name="_id" value=${key}>`:
                `<label>
                    ID:
                    <input type="number" name="_id">
                </label>`
            }
                
                <label>
                    Title:
                    <input type="text" name="title" ${key&&`value="${value.title}"`}>

                </label>
                <label>
                    Price (by $):
                    <input type="number" name="price" ${key&&`value="${value.price}"`}>
                </label>
                <label>
                    Book cover URL
                    <input type="text" name="img" ${key&&`value="${value.img}"`}>
                </label>
                <label>
    Rating (0-10):
    <div class="rating-slider">
        <input type="range" id="rating" name="rating" min="0" max="10" value="${key?`${value.rating}`:5}">
        <span id="ratingValue">${key?`${value.rating}`:5}</span> <!-- מציג את הדירוג הנוכחי -->
    </div>
</label>

                <input type="submit" id="submit">
            </form>
        </div>
    </div>
    `
    // הוספת מאזין לאירוע על הקו
    document.getElementById('rating').addEventListener('input', function() {
    // עדכון הערך המוצג
    document.getElementById('ratingValue').textContent = this.value;
    });
    // פונקציה לסגירת ה-popup
    document.getElementById('closePopup').addEventListener("click", () => {
        div.innerHTML="";
    });

    document.getElementById('newBookForm').addEventListener('submit', function (event) {
    div.innerHTML="";
    event.preventDefault(); // מונע מהפורם להגיש בצורה הרגילה
    console.log("newBookForm")
    // קבלת המידע מהפורם
    const formData = new FormData(event.target);
    const bookData = {};
    let bookId;
    formData.forEach((value, key) => {
        if(!value||value==""){
            alert("mising data");
            return;
        }
        if (key === '_id') {
            bookId = value; // שומר את ה-ID בנפרד
        } else {
            bookData[key] = value; // מוסיף את המידע רק אם זה לא ID
        }
    });
    let bookesOrder = JSON.parse(localStorage.getItem("bookesOrder")) || [];
    console.log("before");
    console.log(bookData);
    console.log(bookesOrder);
    bookesOrder.push(bookId);
    console.log("after");
    
    console.log(bookesOrder);
    localStorage.setItem("bookesOrder", JSON.stringify(bookesOrder));
    localStorage.setItem(bookId,JSON.stringify(bookData))
    reshowWindow();
});
}

// initialization();
reshowWindow();
