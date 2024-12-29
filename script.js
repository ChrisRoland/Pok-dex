const baseURL = 'https://pokeapi.co/api/v2/pokemon/';
const container = document.querySelector('.container');
const search = document.getElementById('search');
const filter = document.getElementById('filter');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let currentPage = 1;
const itemsPerPage = 200;
const totalPages = Math.ceil(1302 / itemsPerPage); 

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
};

const fetchPokemons = async (page) => {
    container.innerHTML = '';
    const offset = (page - 1) * itemsPerPage;
    const url = `${baseURL}?offset=${offset}&limit=${itemsPerPage}`;
    const res = await fetch(url);
    const data = await res.json();
    data.results.forEach(async (pokemon) => {
        const pokeData = await fetchPokemonData(pokemon.url);
        createPokemonCard(pokeData);
    });
};

const fetchPokemonData = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
};

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
    const type = types.find(type => Object.keys(colors).includes(type));
    return type || 'normal';
}

search.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const pokemons = document.querySelectorAll('.pokemon');
    pokemons.forEach(pokemon => {
        const name = pokemon.querySelector('.name').innerText.toLowerCase();
        pokemon.style.display = name.includes(term) ? '' : 'none';
    });
});

filter.addEventListener('change', (e) => {
    const type = e.target.value;
    const pokemons = document.querySelectorAll('.pokemon');
    pokemons.forEach(pokemon => {
        const pokemonType = pokemon.querySelector('.type').innerText;
        pokemon.style.display = (type === 'all' || pokemonType === type) ? '' : 'none';
    });
});

prev.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchPokemons(currentPage);
    }
});

next.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        fetchPokemons(currentPage);
    }
});

fetchPokemons(currentPage);
