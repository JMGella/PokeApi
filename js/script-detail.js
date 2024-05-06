window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");

  let params = new URLSearchParams(location.search);
  let id = params.get("id");

  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  const url2 = `https://pokeapi.co/api/v2/characteristic/${id}/`;

  const fetchPokemon = async () => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    imagenesFicha(data);
    DatosPokemon(data);
    document.title = "Ficha de " + capitalizarPrimeraLetra(titlePokemon(data));
  };

  const fetchPokemon2 = async () => {
    try {
      const response2 = await fetch(url2);
      const data2 = await response2.json();
      console.log("esto es el data2" + data2);
      DescripcionPokemon(data2);
    } catch {
      console.error("No hay descripción de este pokemon");
    }
  };

  const imagenesFicha = (pokemon) => {
    console.log("createCard: " + pokemon.name);
    const fichaPokemon = document.getElementById("imagenes");
    const card = document.createElement("div");

    const { sprites, types } = pokemon;
    let typebackground = types[0].type.name;
    if (sprites.front_default === null) {
      sprites.front_default = "images/pokeball.png";
    }
    if (sprites.back_default === null) {
      sprites.back_default = "images/pokeball.png";
    }
    if (sprites.front_shiny === null) {
      sprites.front_shiny = "images/pokeball.png";
    }
    if (sprites.back_shiny === null) {
      sprites.back_shiny = "images/pokeball.png";
    }
    card.classList.add(`col-6`);
    card.innerHTML = `
    <div class="${typebackground} rounded">
    <div class="row row-cols-2">
        <div class="col">
            <img src="${sprites.front_default}" alt="imagen del pokemon" class="bd-placeholder-img card-img-top" id="image1">
        </div>
        <div class="col">
            <img src="${sprites.back_default}" alt="imagen del pokemon" class="bd-placeholder-img card-img-top" id="image2">
        </div>
        <div class="col">
            <img src="${sprites.front_shiny}" alt="imagen del pokemon" class="bd-placeholder-img card-img-top" id="image3">
        </div>
        <div class="col">
            <img src="${sprites.back_shiny}" alt="imagen del pokemon" class="bd-placeholder-img card-img-top" id="image4">
        </div>
        </div>
        </div>`;
    fichaPokemon.appendChild(card);
  };

  const DatosPokemon = (pokemon) => {
    console.log(pokemon.name + " " + pokemon.id);

    const namePokemon = document.getElementById("name");
    namePokemon.innerHTML = capitalizarPrimeraLetra(pokemon.name);
    const idPokemon = document.getElementById("id");
    idPokemon.innerHTML = pokemon.id;
    const typePokemon = document.getElementById("type");
    let types = pokemon.types;
    let typeslist = getPokemonTypes(types);
    typePokemon.innerHTML = typeslist;
    const heightPokemon = document.getElementById("height");
    heightPokemon.innerHTML = pokemon.height;
    const weightPokemon = document.getElementById("weight");
    weightPokemon.innerHTML = pokemon.weight;
    let abilities = pokemon.abilities;
    let abilitieslist = getPokemonAbilities(abilities);
    const abilitiesPokemon = document.getElementById("abilities");
    abilitiesPokemon.innerHTML = abilitieslist;
    let stats = pokemon.stats;
    let statslist = getPokemonStats(stats);
    const statsPokemon = document.getElementById("stats");
    statsPokemon.innerHTML = statslist;
  };

  const DescripcionPokemon = (pokemon) => {
    console.log("dentro del print" + pokemon.descriptions[5].description);
    const descriptionPokemon = document.getElementById("description");
    descriptionPokemon.innerHTML = pokemon.descriptions[5].description;
  };

  const getPokemonTypes = (types) => {
    let typeslist = "";
    types.forEach((element, index) => {
      if (index === 0) {
        typeslist = traducirTipos(element.type.name);
      } else {
        typeslist = typeslist + " | " + traducirTipos(element.type.name);
      }
    });
    return typeslist;
  };

  const getPokemonAbilities = (abilities) => {
    let abilitieslist = "";
    abilities.forEach((element, index) => {
      if (index === 0) {
        abilitieslist = capitalizarPrimeraLetra(element.ability.name);
      } else {
        abilitieslist =
          abilitieslist + " | " + capitalizarPrimeraLetra(element.ability.name);
      }
    });
    return abilitieslist;
  };

  const getPokemonStats = (stats) => {
    let statslist = "";
    stats.forEach((element, index) => {
      if (index === 0) {
        statslist =
          "<b>" +
          traducirStats(element.stat.name) +
          "</b>" +
          ": " +
          element.base_stat;
      } else {
        statslist =
          statslist +
          " | " +
          "<b>" +
          traducirStats(element.stat.name) +
          "</b>" +
          ": " +
          element.base_stat;
      }
    });
    return statslist;
  };

  function traducirTipos(element) {
    if (element === "grass") {
      element = "Planta";
    }
    if (element === "fire") {
      element = "Fuego";
    }
    if (element === "water") {
      element = "Agua";
    }
    if (element === "bug") {
      element = "Bicho";
    }
    if (element === "poison") {
      element = "Veneno";
    }
    if (element === "electric") {
      element = "Eléctrico";
    }
    if (element === "ground") {
      element = "Tierra";
    }
    if (element === "fairy") {
      element = "Hada";
    }
    if (element === "fighting") {
      element = "Lucha";
    }
    if (element === "psychic") {
      element = "Psíquico";
    }
    if (element === "rock") {
      element = "Roca";
    }
    if (element === "ghost") {
      element = "Fantasma";
    }
    if (element === "ice") {
      element = "Hielo";
    }
    if (element === "dragon") {
      element = "Dragón";
    }
    if (element === "dark") {
      element = "Siniestro";
    }
    if (element === "steel") {
      element = "Acero";
    }
    if (element === "flying") {
      element = "Volador";
    }
    return element;
  }

  function traducirStats(element) {
    if (element === "hp") {
      element = "Salud";
    }
    if (element === "attack") {
      element = "Ataque";
    }
    if (element === "defense") {
      element = "Defensa";
    }
    if (element === "special-attack") {
      element = "Ataque especial";
    }
    if (element === "special-defense") {
      element = "Defensa especial";
    }
    if (element === "speed") {
      element = "Velocidad";
    }
    return element;
  }

  function capitalizarPrimeraLetra(element) {
    return element.charAt(0).toUpperCase() + element.slice(1);
  }

  fetchPokemon();
  fetchPokemon2();

  function titlePokemon(pokemon) {
    titlepokemon = pokemon.name;
    return titlepokemon;
  }
});
