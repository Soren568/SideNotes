
bookId = window.location.pathname.split('/')[2]


window.onload = function() {
    fetch("https://www.googleapis.com/books/v1/volumes/" + bookId)
    .then(resp => resp.json())
    .then(mainBook => {
        mainBookInfo = mainBook.volumeInfo
        console.log(mainBookInfo)
        bookAuthors = "authors" in mainBookInfo ? mainBookInfo.authors : "N/A"
        mainBookInfo.subtitle ? subTitle = `: ${mainBookInfo.subtitle}` : subTitle = ""
        // Editing the HTML of the page
        document.getElementById("main-book-title").innerHTML = `${mainBookInfo.title} <span class="display-6">${subTitle}</span>`
        document.getElementById("main-authors").innerHTML = `Other books by ${bookAuthors[0]}:`
        document.querySelector(".description-text").innerHTML = mainBookInfo.description
        document.querySelector(".categories").innerHTML = '<strong> Categories: <strong>'

        if("categories" in mainBookInfo){
            mainBookInfo.categories.forEach(cat => {
                document.querySelector(".categories").innerHTML += `<li> ${cat},  </li> `
            });
        } else {
            document.querySelector(".categories").innerHTML = 'Categories: <li> N/A <li>'
        }

        document.querySelector(".author").innerHTML = '<strong>Author(s): </strong>'
        bookAuthors.forEach(auth => {
            document.querySelector(".author").innerHTML += `<li> ${auth} </li>`
        })

        if (mainBookInfo.averageRating) {
            starRating = `${mainBookInfo.averageRating / 5 * 100}%`;
        }
        starRating = "averageRating" in mainBookInfo ? `${mainBookInfo.averageRating / 5 * 100}%` : 0
        document.querySelector(".stars-inner").style.width = starRating
        
        ratingAmount = mainBookInfo.ratingsCount ? mainBookInfo.ratingsCount :  0
        document.querySelector(".main-ratings-count").innerHTML = ratingAmount

        thumbNail = "imageLinks" in mainBookInfo ? mainBookInfo.imageLinks.thumbnail : "/static/img/placeholder-cover.jpeg"
        document.getElementById("main-book-cover").src = thumbNail

        // Listen for main book cover click
        document.getElementById("main-book-cover").addEventListener('click', function(e){
            window.location.href = mainBookInfo.infoLink
        })
        
        
        return fetch("https://www.googleapis.com/books/v1/volumes?q=inauthor:" + mainBookInfo.authors + "&maxResults=20")
    })
    .then(resp => resp.json())
    .then(authorBooks => {
        document.querySelector(".by-same-author").innerHTML = ''
        authorBooks.items.forEach(aBook => {
            smallThumbNail = "imageLinks" in aBook.volumeInfo ? aBook.volumeInfo.imageLinks.thumbnail : "/static/img/placeholder-cover.jpeg"
            document.querySelector(".by-same-author").innerHTML += `
            <div class="small-book-card placeholder-glow">
                <img src="${smallThumbNail}" alt="" height="110px" width="90px" class="small-book-cover" data-href="/book/${aBook.id}/view">
                <p class="mt-1 small-title">${aBook.volumeInfo.title}</p>
            </div>
            `
        })
        
        return authorBooks
    })
    // On click of cover by same author take you to that page
    .then(authorBooks => {
        var authorBooks = document.querySelectorAll(".small-book-cover")
        for (const bookCover of authorBooks) {
            console.log('listening')
            bookCover.addEventListener('click', function (e) {
                console.log('click')
                window.location.href = this.getAttribute("data-href")
            })
        }
    })

}