const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

// Selezione del container in pagina
const container = document.getElementById("container");
// Per ogni elemento di posts creo un div
for (let post of posts) {
    let postElement = document.createElement("div");

    // InnerHTML all'interno di postElement
    postElement.innerHTML = 
    `
    <div class="post">
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    <img class="profile-pic" src="${post.author.image}" alt="${post.author.name}">                    
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${post.author.name}</div>
                    <div class="post-meta__time">${post.created}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${post.content}</div>
        <div class="post__image">
            <img src="${post.media}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#" data-postid=${post.id}>
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${post.id}" class="js-likes-counter">${post.likes}</b> persone
                </div>
            </div> 
        </div>            
    </div>
    `;
    // AppendChild al container
    container.appendChild(postElement);
}

// Seleziono la collezione di elementi likeButtons
const likeButtons = document.getElementsByClassName("like-button");

// Mi fa un iterazione per ogni elemento della collezione likeButtons
for (let likeButton of likeButtons) {
    let isClicked = false;
    // Aggiungo al likeButton corrente un event listenere sul click
    likeButton.addEventListener("click", function(event) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault?retiredLocale=it 
        // In questo caso lo usiamo per evitare ogni altra azione di default sul like-button (lo scroll verso l'alto e eventuali <a>)
        event.preventDefault();
        if (!isClicked) {
            // Salvo in una variabile il valore  di data-postid come intero
            let postId = parseInt(this.getAttribute("data-postid"));
            // Chiamo la funzione likePost
            likePost(postId);
            likeButton.classList.add("like-button--liked");
            isClicked = true;
        } else {
            let postId = parseInt(this.getAttribute("data-postid"));
            unlikePost(postId);
            likeButton.classList.remove("like-button--liked");
            isClicked = false;
        }
    });
}

// Creo un array vuoto per tenere traccia dei post con il like
let likedPosts = [];

// Funzioni


function likePost(postId) {
    let postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex > -1) {
        posts[postIndex].likes++;
        likedPosts.push(postId);
        // Display del like
        let likeCounter = document.getElementById(`like-counter-${postId}`);
        likeCounter.textContent = posts[postIndex].likes;
    }
}

function unlikePost(postId) {
    let postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex > -1) {
        posts[postIndex].likes--;
        let index = likedPosts.indexOf(postId);
        if (index > -1) {
            likedPosts.splice(index, 1);
        }
        // Display del like
        let likeCounter = document.getElementById(`like-counter-${postId}`);
        likeCounter.textContent = posts[postIndex].likes;
    }
}