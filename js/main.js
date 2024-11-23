//form vars

let siteName = document.getElementById("name");
let siteURL = document.getElementById("url");
let submit = document.querySelector("#submit");

// alert vars

let myAlert = document.getElementById("my-alert");
let alertBg = document.getElementById("alert-bg");
let innerAlert = document.getElementById("inner-alert");
let closeAlert = document.getElementById("close");

// flags

let validName = false;
let validURL = false;

// all books in local storage

let allBooks;
allBooks = JSON.parse(localStorage.getItem("books")) || [];

// show data in every load
showBooks();

// add book
submit.addEventListener("click", function () {
  let book = {
    name: siteName.value,
    url: siteURL.value,
  };

  if (validName === true && validURL === true) {
    let protocol = `https://`;
    if (book.url.startsWith(`www.`)) {
      book.url = protocol.concat(book.url);
    } else if (
      !book.url.startsWith(`www.`) ||
      !book.url.startsWith(`https://`)
    ) {
      book.url = protocol.concat(book.url);
    }
    allBooks.push(book);
    localStorage.setItem("books", JSON.stringify(allBooks));
    clearForm();
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
    validName = false;
    validURL = false;
  } else {
    //my alert
    myAlert.classList.replace("d-none", "d-block");
  }

  showBooks();
});

// clear form
function clearForm() {
  siteName.value = "";
  siteURL.value = "";
}

// show books

function showBooks() {
  let table = ``;
  for (let i = 0; i < allBooks.length; i++) {
    table += `
        <tr>
            <td>${i + 1}</td>
            <td>${allBooks[i].name}</td>
            <td>
            <button class="btn btn-success rounded-2 px-2 py-1">
                <a href="${allBooks[i].url}" target="_blank">
                <i class="fa-solid fa-eye"></i>
                Visit
                </a>
            </button>
            </td>
            <td>
            <button class="btn btn-danger rounded-2 px-2 py-1" onclick="deleteBook(${i})">
                <i class="fa-solid fa-trash-can"></i>
                Delete
            </button>
            </td>
        </tr>
        `;
  }
  document.getElementById("table-body").innerHTML = table;
}

// delete book

function deleteBook(index) {
  allBooks.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(allBooks));
  showBooks();
}

// validate form

siteName.addEventListener("input", function () {
  if (this.value.length > 2) {
    this.classList.remove("is-invalid");
    this.classList.add("is-valid");
    validName = true;
  } else {
    this.classList.remove("is-valid");
    this.classList.add("is-invalid");
    validName = false;
  }
});

siteURL.addEventListener("input", function () {
  if (
    (this.value.startsWith(`https://`) && this.value.endsWith(`.com`)) ||
    (this.value.startsWith(`www.`) && this.value.endsWith(`.com`)) ||
    (this.value.startsWith(`https://`) && this.value.endsWith(`.org`)) ||
    this.value.endsWith(`.com`) ||
    this.value.endsWith(`.org`)
  ) {
    this.classList.remove("is-invalid");
    this.classList.add("is-valid");
    validURL = true;
  } else {
    this.classList.remove("is-valid");
    this.classList.add("is-invalid");
    validURL = false;
  }
});

// close alert

closeAlert.addEventListener("click", function () {
  myAlert.classList.replace("d-block", "d-none");
});

alertBg.addEventListener("click", function () {
  myAlert.classList.remove("d-block");
  myAlert.classList.add("d-none");
});

// End Code :)
// Thanks Route :)