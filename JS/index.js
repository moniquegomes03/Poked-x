//Conectando a Poke API

// Variáveis Globais

const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
let searchPokemon = 0;

const fetchPokemon = async(Pokemon)=>{
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon}`);

    if (APIresponse.status === 200) {
        const data = await APIresponse.json();
        return data;
    }
}

//Renderizando dados Pokemon

const renderPokemon = async (Pokemon)=>{
    pokemonName.innerHTML = "Loading...";
    pokemonNumber.innerHTML = "";
    const data = await fetchPokemon(Pokemon);

    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = "";
        searchPokemon = data.id
    } else {
        pokemonImage.src = ('https://static.wikia.nocookie.net/character-stats-and-profiles/images/a/a2/MissingNo.2.png/revision/latest?cb=20220111202342')
        pokemonName.innerHTML = "Nome/Id Inválido"
        input.value = "";
    }

    console.log(data);
}

//Achar pokemon pelo input

form.addEventListener("submit", (event)=>{
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
})

//Eventos dos Botões Prev e Next

buttonPrev.addEventListener("click", ()=>{
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon)   
    }
});

buttonNext.addEventListener("click", ()=>{
    searchPokemon += 1;
    renderPokemon(searchPokemon)
});

renderPokemon(132)