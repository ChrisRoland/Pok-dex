const baseURL = 'https://pokeapi.co/api/v2/pokemon/';
const container = document.querySelector('.container');
const search = document.getElementById('search');
const filter = document.getElementById('filter');

const pokemons = 200;
const colors = {
    fire: '#f9c0b7',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#c8a3d5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemons; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async (id) => {
    const url = `${baseURL}${id}`;
    const res = await fetch(url);
    const data = await res.json();
    createPokemonCard(data);
    // console.log(data);
}

function createPokemonCard(pokemon) {
    const pokeEl = document.createElement('div');
    pokeEl.classList.add('pokemon');
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');
    const poke_types = pokemon.types.map(type => type.type.name);
    const type = mainType(poke_types);
    const color = colors[type];
    pokeEl.style.backgroundColor = color;
    const pokemonInnerHTML = `
        <div class="img-container">
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="${name}">
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small>Type: <span class="type">${type}</span></small>
            <p>
                <small class="abilities"><span>Abilities:</span> ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}</small><br>
                <small class="moves"><span>Moves:</span> ${pokemon.moves.slice(0, 6).map(move => move.move.name).join(', ')}</small>
            </p>
        </div>
    `;

    pokeEl.innerHTML = pokemonInnerHTML;
    container.appendChild(pokeEl);
}

function mainType(types) {
    const type = types.find(type => type === 'grass' || type === 'fire' || type === 'water' || type === 'electric' || type === 'ground' || type === 'rock' || type === 'fairy' || type === 'poison' || type === 'bug' || type === 'dragon' || type === 'psychic' || type === 'flying' || type === 'fighting' || type === 'normal');
    return type;
}

search.addEventListener('input', searchPokemons);

function searchPokemons(e) {
    const term = e.target.value;
    const pokemons = document.querySelectorAll('.pokemon');
    pokemons.forEach(pokemon => {
        const name = pokemon.querySelector('.name').innerText;
        if (name.includes(term)) {
            pokemon.style.display = '';
        } else {
            pokemon.style.display = 'none';
        }
    });
}



// fetchPokemons();