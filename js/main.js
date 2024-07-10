let bookmarkName = document.getElementById("bookmarkName");
let bookmarkURL = document.getElementById("bookmarkURL");
let submitBtn = document.getElementById("submitBtn");
const websiteNameRegex = /^.{3,}$/;
const urlRegex = /^https:\/\/[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$/;

let booksArr = JSON.parse(localStorage.getItem("books")) ?? [];
displayBooks();

function addBook() {
    const inputValid = isInputValid();
    const duplicate = isDuplicate();

    if (inputValid && !duplicate) {
        booksArr.push(getBook());
        onDataChange();
        clearForm();
    } else {
        if (!inputValid) {
            validateInputMessage();
        }
        if (duplicate) {
            duplicateFoundMessage();
        }
    }
}

function validateInputMessage() {
    Swal.fire({
        icon: "error",
        title: "Invalid Website Name or URL",
        text: "Website Name must be at least 3 characters and the URL must be valid",
    });
}

function duplicateFoundMessage() {
    Swal.fire({
        icon: "error",
        title: "Duplicate Entry Found",
        text: "Please enter a website that has not been bookmarked before",
    });
}

function getBook() {
    let book = {
        websiteName: bookmarkName.value,
        websiteURL: bookmarkURL.value,
    };
    return book;
}

function clearForm() {
    bookmarkName.value = "";
    bookmarkURL.value = "";
}

function onDataChange() {
    localStorage.setItem("books", JSON.stringify(booksArr));
    displayBooks();
}

function displayBooks() {
    let entry = "";
    for (let i = 0; i < booksArr.length; i++) {
        entry += `<tr>
        <td>${i + 1}</td>
        <td>${booksArr[i].websiteName}</td>
        <td><button onclick="visitBook(${i})" class="btn btn-visit"><i class="fa-regular fa-eye p-1"></i>Visit</button></td>
        <td><button onclick="deleteBook(${i})" class="btn btn-danger"> <i class="fa-solid fa-trash-can p-1"></i>Delete</button></td>
    </tr>`;
    }
    document.getElementById("tableContent").innerHTML = entry;
}

function deleteBook(index) {
    booksArr.splice(index, 1);
    onDataChange();
}

function isInputValid() {
    return urlRegex.test(bookmarkURL.value) && websiteNameRegex.test(bookmarkName.value);
}

function isDuplicate() {
    for (let i = 0; i < booksArr.length; i++) {
        if (booksArr[i].websiteName === bookmarkName.value || booksArr[i].websiteURL === bookmarkURL.value) {
            return true;
        }
    }
    return false;
}

function visitBook(index) {
    window.open(booksArr[index].websiteURL, '_blank').focus();
}
