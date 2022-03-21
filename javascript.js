let pokeImage;
let pokeId;
let pokeName;
let pokeTypes;
let pokeHeight; 
let pokeWeight;
let pokeMoves;
let pokeStats;

const loadPokemon = () => {
    document.getElementById('pokemonImage').src = pokeImage;
    document.getElementById('pokeId').innerHTML = '#'+pokeId;
    document.getElementById('pokeName').innerHTML = pokeName;
    document.getElementById('pokeHeight').innerHTML = pokeHeight + " kg";
    document.getElementById('pokeWeight').innerHTML = "0. " + pokeWeight + " m";
    document.getElementById('pokeMoves').innerHTML = pokeMoves;

    getTypes();
    getStats();

    document.getElementById('idPokemon').value='';
};

const getTypes = () => {
    let container = document.getElementById('pokeTypesContainer');
    console.log(pokeTypes);
    pokeTypes.forEach(type => {
        var p = document.createElement("p");
        p.innerHTML = type.type.name;
        getColor(p);
        container.appendChild(p);
    });
}

const getColor = (element) => {
    element.classList.add('tag');
    switch(element.innerHTML){
        case 'bug':
        case 'grass':
            element.style.background = "lightgreen";
            break;
        case 'dark':
            element.style.background = "black";
            break;
        case 'dragon':
        case 'flying':
        case 'ice':
        case 'steel':
        case 'water':
            element.style.background = "lightblue";
            break;
        case 'electric':
            element.style.background = "yellow";
            break;
        case 'fairy':
        case 'psychic':
            element.style.background = "pink";
            break;
        case 'fighting':
        case 'fire':
            element.style.background = "orange";
            break;
        case 'ghost':
        case 'normal':
        case 'poison':
            element.style.background = "purple";
            break;
        case 'ground':
        case 'rock':
            element.style.background = "brown";
            break;
        default:
            element.style.background = "black";
            break;
    }
}

const getStats = () => {
    pokeStats.forEach(element => {
        console.log(element.stat.name)
        document.getElementById(`${element.stat.name}Value`).innerHTML = element.base_stat;
        document.getElementById(`${element.stat.name}Progress`).style.width = (element.base_stat > 100) ? '100%' : `${element.base_stat}%`;
    });
}

const fetchPokemon = (idPokemon, load=false) =>{
     
    if(load){
        idPokemon = (idPokemon > 0 && idPokemon<300) ? idPokemon : 366;
    }

    const url = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;
    
    fetch(url).then((response) => {
        if(response.status != "200"){
            console.log(res) //ningun pokemon valido
        } else return response.json();
    }).then((data) => {
        console.log(data)
        pokeImage = data.sprites.other.home.front_default;
        pokeId = data.id;
        pokeName = data.name;
        pokeTypes = data.types;
        pokeHeight = data.height;
        pokeWeight = data.weight;
        pokeMoves = data.moves.length;
        pokeStats = data.stats;
        loadPokemon();
    });
};

const searchPokemon = () => {
    let idPokemon = document.getElementById('idPokemon').value;
    fetchPokemon(idPokemon)
};

fetchPokemon(Math.floor(Math.random() * 10), true);