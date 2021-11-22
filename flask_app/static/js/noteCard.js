upVote = document.querySelectorAll(".up-vote")

upVote.forEach(button => {
    button.addEventListener('click', function(e){
        button.classList.toggle('clicked-upvote')
    })
});

downVote = document.querySelectorAll(".down-vote")
downVote.forEach(button => {
    button.addEventListener('click', function(e){
        button.classList.toggle('clicked-downvote')
    })
})