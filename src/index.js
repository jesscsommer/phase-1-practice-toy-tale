let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function createCard(toyObj){
  const card = document.createElement('div')
  card.className = 'card'

  const toyName = document.createElement('h2')
  toyName.innerText = toyObj['name']

  const toyImg = document.createElement('img')
  toyImg.className = 'toy-avatar'
  toyImg.src = toyObj['image']
  toyImg.alt = toyObj['name']

  const likes = document.createElement('p')
  likes.innerText = `${toyObj['likes']} likes`

  const likeBtn = document.createElement('button')
  likeBtn.className = 'like-btn'
  likeBtn.id = toyObj['id']
  likeBtn.innerText = 'Like'
  likeBtn.addEventListener('click', function (e) {
    handleLike(e.target, toyObj['likes'])
  })

  card.append(toyName, toyImg, likes, likeBtn)
  document.querySelector('#toy-collection').append(card);
}

fetch('http://localhost:3000/toys')
.then(res => res.json())
.then(data => data.forEach(toyObj => createCard(toyObj)))
.catch((error) => alert(error))

const addToyForm = document.querySelector('.add-toy-form')

addToyForm.addEventListener('submit', e => fetch('http://localhost:3000/toys', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  body: JSON.stringify({
    'name': e.target['name'].value,
    'image': e.target['image'].value,
    'likes': 0
  })
}))


function handleLike(likeBtn, currentLikes){
  fetch(`http://localhost:3000/toys/${likeBtn.id}`, {
    method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        'likes': currentLikes + 1
      })
    })
    .then(likeBtn.parentElement.querySelector('p').innerText = `${currentLikes + 1} likes`)

  }
