const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

let trainers = getTrainers() // this retirns the json object
// snapshot 1

const render = (trainers) => {
  // make the view
  // everything happens here
  // use out trainers object
}

document.addEventListener('on some event', () => {
  trainers = getTrainers() // new trainers
  // will happen when click events are triggered
  render(trainers)
})

function getTrainers() {
   fetch(TRAINERS_URL, {
    method: "GET",
    headers: {
      'Content-Type': "application/json"
    },
  })
  .then(res => res.json())
  .then(json => {
    json.forEach(trainer => {
      renderTrainers(trainer)
    })
  })
  .catch((e) => console.log(e))
}

function deletePokemon(trainer, pokemon) {
  fetch(`${TRAINERS_URL}/${trainer}/pokemons/${pokemon}`, {
   method: "DELETE",
   headers: {
     'Content-Type': "application/json"
   },
 })
 .then(res => res.json())
 .then(json => {
   console.log(json)
 })
 .catch((e) => console.log(e))
}

function addPokemon(trainer) {
  return fetch(`${TRAINERS_URL}/${trainer}/pokemons`, {
    method: "POST",
    headers: {
      'Content-Type': "application/json"
    }
  })
}

function renderTrainers(trainer) {
  const trainerElem = document.querySelector("main")  
  const wrapper = document.createElement('div');
  const addButton = document.createElement('button');
  const trainerHeader = document.createElement('h2');
  const pokemonList = document.createElement('ul')

  wrapper.className = 'card';
  wrapper.id = `trainer-${trainer.id}`;

  trainerHeader.innerText = trainer.name;
  wrapper.appendChild(trainerHeader)

  addButton.innerText = 'add pokemon'
  addButton.addEventListener('click', (e) => {
    // add pokemon
    addPokemon(trainer.id)
      .then(res => res.json())
      .then(json => {
        const pokemon = json;
  
        const pokemonListItem = document.createElement('li')
        const removeButton = document.createElement('button')
    
        pokemonListItem.innerText = `${pokemon.nickname} (${pokemon.species})`
    
        removeButton.innerText = "remove"
        removeButton.className = 'release'
        removeButton.addEventListener('click', (e) => {
          // remove pokemon
          console.log('remove pokemon')
          deletePokemon(trainer.id, pokemon.id)
          e.target.parentNode.remove()
        })
    
        pokemonListItem.appendChild(removeButton)
      
        pokemonList.appendChild(pokemonListItem)
      })
  })

  wrapper.appendChild(addButton)

  trainer.pokemons.map(pokemon => {
    const pokemonListItem = document.createElement('li')
    const removeButton = document.createElement('button')

    pokemonListItem.innerText = `${pokemon.nickname} (${pokemon.species})`

    removeButton.innerText = "remove"
    removeButton.className = 'release'
    removeButton.addEventListener('click', (e) => {
      // remove pokemon
      console.log('remove pokemon')
      deletePokemon(trainer.id, pokemon.id)
      e.target.parentNode.remove()
    })

    pokemonListItem.appendChild(removeButton)
  
    pokemonList.appendChild(pokemonListItem)
  })

  wrapper.appendChild(pokemonList)

  trainerElem.appendChild(wrapper)
}


getTrainers()

