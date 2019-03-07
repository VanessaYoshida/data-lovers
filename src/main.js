window.onload= function(){
    showNamesPokemon()
    selectedPokemon()
    showTypePokemon(selectType);
    showTypePokemon(selectWeaknesses);
}


function getOrderedPokemonByNames(){
    return POKEMON.pokemon.sort((a, b) => {
        if (a.name > b.name){
            return 1;
        }
        if (a.name < b.name){
            return -1;
        }
        return 0;
    });
}

function showNamesPokemon(){
    let namesPokemon= document.getElementById("names-pokemon")

    namesPokemon.innerHTML += `
    ${getOrderedPokemonByNames().map((pokemon)=> `
        <option value="${pokemon['id']}" class="list-pokemon">
             ${pokemon['name']}

        </option>
    `).join("")}
   `
}


function selectedPokemon(){
    let pokemoneEl= document.getElementById("names-pokemon");
    let showPokemon= document.getElementById("display-name");

    pokemoneEl.addEventListener("change", () => {
    selectedPokemon('name', pokemoneEl, showPokemon);
    });
    
    let pokemonId= pokemoneEl.options[pokemoneEl.selectedIndex].value;
    let result= POKEMON['pokemon'].filter(pokemon => pokemon.id == pokemonId);

    showPokemon.innerHTML= ''
    showPokemon.innerHTML+= `
        ${result.map( pokemon => `
            <img src="${pokemon.img}">
            <p>Nome: ${pokemon.name}</p>
            <p> Tipo: ${pokemon.type}</p>
            <p>Altura: ${pokemon.height}</p>
            <p>Peso: ${pokemon.weight}</p>
            <p>Candy: ${pokemon.candy}</p>
            <p>Quantidade de Candys: ${pokemon.candy_count}</p>
            <p>Ovo: ${pokemon.egg}</p>
            <p>Chance de encontrar: ${pokemon.spawn_chance}</p>
            <p>AVG Spawns: ${pokemon.avg_spawns}</p>
            <p>Encontrar jogadores: ${pokemon.spawn_time}</p>
            <p>Multiplicadores: ${pokemon.multipliers}</p>
            <p>Fraquezas: ${pokemon.weaknesses}</p>
            <p>Proxima evolucao: ${pokemon.next_evolution}</p>
        `).join("")}
        `
}


let selectType = document.querySelector("#select-type");
let displayType = document.querySelector("#display-type");
let selectWeaknesses = document.querySelector("#select-weaknesses");
let displayWeaknesses = document.querySelector("#display-weaknesses");
let arrayTypes = ["Grass", "Fire", "Water", "Bug", "Normal", "Poison", "Electric", "Ground", "Fighting", "Psychic", "Rock", "Flying", "Ghost", "Ice", "Dragon", "Steel", "Dark", "Fairy"];
arrayTypes.sort();

function showTypePokemon(category){
    for(i in arrayTypes){
        category.innerHTML += `
            <option value="${arrayTypes[i]}" class="list-pokemon">
             ${arrayTypes[i]}
            </option>    
        `
    }
}

selectType.addEventListener("change", () => {
selectedPokemonFrom('type', selectType, displayType);
});

selectWeaknesses.addEventListener("change", () => {
selectedPokemonFrom('weaknesses', selectWeaknesses, displayWeaknesses);
});

function selectedPokemonFrom(categorySelect, dataSelect, displayTag){
    displayTag.innerHTML = "";
    let pokemonsFromType = POKEMON.pokemon.filter(
        (pokemon) => {
            let typeFilter = pokemon[categorySelect].filter(
                (type) => {
                    return type === dataSelect.value;
                }
            );
            if(typeFilter.length > 0){
                showPokemon(pokemon, displayTag);
                return true;
            }
        }
    );
    if (pokemonsFromType.length === 0) {
        displayTag.innerHTML += `
        <p> Nenhum pokémon encontrado </p>
        `
    }
}


function showPokemon(pokemon, tagById){
    let nextEvolution = pokemon["next_evolution"] ? pokemon["next_evolution"][0].name : 'Sem evolução';

    tagById.innerHTML += `
                <section class="pokemons-type">
                    <div class="pokemon-type">
                        <img src="${pokemon.img}" class="poke-photo" />   
                        <div class="text-name">
                            <h3 class="poke-name">${pokemon.name}</h3>
                        </div>
                        <div class="text-type">
                            <p class="poke-type"> Tipo: ${pokemon.type.join(", ")}</p>
                            <p> Fraquezas: ${pokemon.weaknesses.join(", ")}</p>
                            <p> Próxima(s) Evolução(ões): ${nextEvolution}</p>
                        </div>
                    </div> 
                </section>        
                `
}


document.querySelector("#btn-voltar").style.display = "none";

let btnBack = document.getElementById("btn-voltar");
btnBack.addEventListener("click", function(){
    document.location.reload(true);
    });
   
let hidenName= document.querySelector("#section-names")    
hidenName.addEventListener("change", () => {
    hideScreenName();
    });

function hideScreenName(){
    hidenType.style.display = "none";
    document.querySelector("#section-weaknesses").style.display = "none";
    document.querySelector("#section-types").style.display = "none";
    document.querySelector(".imagem-box-name").style.display = "none";
    document.querySelector(".text-box-name").style.display = "none";
    document.querySelector("#btn-voltar").style.display = "block";
}


let hidenType= document.querySelector("#select-type")
hidenType.addEventListener("change", () => {
    hideScreenType();
    });
    
function hideScreenType(){
    document.querySelector("#section-names").style.display = "none";
    document.querySelector("#section-weaknesses").style.display = "none";
    document.querySelector(".imagem-box-types").style.display = "none";
    document.querySelector(".text-box-types").style.display = "none";
    document.querySelector("#btn-voltar").style.display = "block";
}


let hidenWeaknesses= document.querySelector("#select-weaknesses")
hidenWeaknesses.addEventListener("change", () => {
    hideScreenType();
    });

function hideScreenWeaknesses(){
    document.querySelector("#section-names").style.display = "none";
    document.querySelector("#section-types").style.display = "none";
    document.querySelector(".imagem-box").style.display = "none";
    document.querySelector(".text-select-box").style.display = "none";
    document.querySelector("#btn-voltar").style.display = "block";
}
