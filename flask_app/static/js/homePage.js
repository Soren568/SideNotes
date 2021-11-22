
subjects = ["art", "mathematics", "philosophy", "political+science", "computers", "fiction", "nonfiction", "social+science", "self+help"]
window.onload = function() {
    subject = subjects[randomNumber(0, subjects.length)]
    fetch("https://www.googleapis.com/books/v1/volumes?q=subject:" + subject + "&printType=books")
    .then(resp => resp.json())
    .then(homeBooks => {
        starRatings = {}

        document.querySelector(".books-suggested").innerHTML = ''
        homeBooks.items.forEach(book => {
            homeAuthors = "authors" in book.volumeInfo ? book.volumeInfo.authors[0] : "N/A" 
            homeThumbNail = "imageLinks" in book.volumeInfo ? book.volumeInfo.imageLinks.thumbnail : '/static/img/placeholder-cover.jpeg'
            book.volumeInfo.averageRating ? starRatings[book.id] = `${book.volumeInfo.averageRating / 5 * 100}%` : starRatings[book.id] = 0
            document.querySelector(".books-suggested").innerHTML += `
            <div class="card card-books p-1" data-href="/book/${book.id}/view">
                    <img src="${homeThumbNail}" class="card-img-top mt-1" alt="...">
                    <div class="card-body range placeholder-wave">
                        <h5 class="book-title mb-0">${book.volumeInfo.title}</h5>
                        <p class="mb-0"><small class="text-muted">${homeAuthors}</small></p>
                        <div class="card-ratings">
                            <div class="stars-outer">
                                <div class=" stars-inner" data-book-id="${book.id}"></div>
                            </div>
                            <div class="ratings-count xs-text">${book.volumeInfo.ratingsCount}</div>
                        </div>
                        <p class="md-text">Notes: <span class="placeholder placeholder-s col-3"></span></p>
                    </div>
                </div>
                `
        });
        return homeBooks
    })
    .then(homeBooks => {
        homeBooks.items.forEach(book => {
            if (book.id in starRatings) {
                document.querySelector(`div[data-book-id = '${book.id}']`).style.width = starRatings[book.id]
            }
    })
    var booksCard = document.querySelectorAll(".card-books")
            for (const book of booksCard) {
                book.addEventListener('click', function (e) {
                    
                    window.location.href = this.getAttribute("data-href")
                })
            }
})
}
function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min);
} 
