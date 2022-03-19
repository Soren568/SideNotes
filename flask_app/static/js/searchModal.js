console.log("hello")

var bookSearch = document.querySelector('#books-form')

// Book Search 
bookSearch.addEventListener('submit', function (e) {
    e.preventDefault()
    console.log('books searched!')

    let apiKey = "AIzaSyBLRoJIlAzU9vHUVjZtsiuWcFAITyBmavc"
    let form = new FormData(bookSearch)
    var searchTerm = document.querySelector("#search-term").value
    searchTerm.replace(" ", "+")
    var searchResultsContainer = document.querySelector("#search-results-container")

    fetch("https://www.googleapis.com/books/v1/volumes?q=" + searchTerm + "&printType=books&key=" + apiKey + "&maxResults=40")
        .then(resp => resp.json())
        .then(searchResults => {
            console.log(searchResults)
            // Clear the last results
            searchResultsContainer.innerHTML = ''

            starRatings = {}
            // iterate through each result
            searchResults.items.forEach(book => {
                var bookCard = document.createElement('div');
                bookCard.setAttribute('class', 'book-card');
                // Load stars
                if (book.volumeInfo.averageRating) {
                    starRatings[book.id] = `${book.volumeInfo.averageRating / 5 * 100}%`;
                }
                thumbNail = "imageLinks" in book.volumeInfo ? book.volumeInfo.imageLinks.thumbnail : "/static/img/placeholder-cover.jpeg"

                firstAuthor = book.volumeInfo.authors
                book.volumeInfo.ratingsCount ? ratingAmount = book.volumeInfo.ratingsCount : ratingAmount = 0
                bookCard.innerHTML += `
                <div class="card card-books p-1" data-href="/book/${book.id}/view">
                    <img src="${thumbNail}" class="card-img-top mt-1" alt="...">
                    <div class="card-body range" >
                        <h5 class="book-title mb-0">${book.volumeInfo.title}</h5>
                        <p class="mb-0"><small class="text-muted">${firstAuthor}</small></p>
                        <div class="card-ratings">
                            <div class="stars-outer">
                                <div class=" stars-inner" data-book-id="${book.id}"></div>
                            </div>
                            <div class="ratings-count xs-text">${ratingAmount}</div>
                        </div>
                        <p class="md-text">Notes: 324</p>
                    </div>
                </div>
                `
                searchResultsContainer.appendChild(bookCard)
            })
            $('#search-modal').modal('show')
            return searchResults
        })
        .then(searchResults => {
            searchResults.items.forEach(book => {
                if (book.id in starRatings) {
                    document.querySelector(`div[data-book-id = '${book.id}']`).style.width = starRatings[book.id]
                }

            })
            // Book Description Page load AJAX
            var booksCard = document.querySelectorAll(".book-card")
            for (const book of booksCard) {
                book.addEventListener('click', function (e) {
                    window.location.href = this.children[0].getAttribute("data-href")
                })
            }
        })
})

// =================================== Google Sign-In ===================================
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    userImg = document.createElement("img")
    userImg.setAttribute('id', 'user-img')
    userImg.setAttribute('class', 'mt-1')
    userImg.src = profile.getImageUrl()
    console.log(id_token)
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    document.getElementById("sign-in").style.display = "none"
    document.getElementById("sign-out").style.display = "block"
    document.getElementById("user-img-container").appendChild(userImg)
    userImg.addEventListener('click', function (e) {
        window.location.href = `/users/${id_token}/view`
    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    document.getElementById("sign-in").style.display = "block"
    document.getElementById("sign-out").style.display = "none"
    document.getElementById("user-img-container").removeChild(userImg)
}
// ===============================================================================================