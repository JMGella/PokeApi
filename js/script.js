window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");

  // paginacion
  let params = new URLSearchParams(location.search);
  let pag = 0;
  let j = 0;
  if (params.has("pag")) {
    pag = parseInt(params.get("pag"));
    j = 15 * pag;
  }
  const next = document.getElementById("nextpage");
  const prev = document.getElementById("prevpage");
  const next2 = document.getElementById("nextpage2");
  const prev2 = document.getElementById("prevpage2");
  let q = pag + 1;
  let p = pag - 1;
  next.innerHTML = `<a href="index.html?pag=${q}" class="btn btn-success">Siguiente</a>`;
  prev.innerHTML = `<a href="index.html?pag=${p}" class="btn btn-success">Anterior</a>`;
  next2.innerHTML = `<a href="index.html?pag=${q}" class="btn btn-success">Siguiente</a>`;
  prev2.innerHTML = `<a href="index.html?pag=${p}" class="btn btn-success">Anterior</a>`;
  if (pag === 0) {
    prev.style.display = "none";
    prev2.style.display = "none";
  }
  function OcultarBotones() {
    prev.style.display = "none";
    next.style.display = "none";
    prev2.style.display = "none";
    next2.style.display = "none";
  }

  //default lista de pokemones
  const fetchPokemon = async () => {
    for (let i = 1 + j; i <= 15 + j; i++) {
      await getListPokemon(i);
    }
  };
  const getListPokemon = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();
    console.log("getlist:" + pokemon.name);
    createCard(pokemon);
  };

  //busqueda:
  const btn = document.getElementById("button");
  const searchinput = document.getElementById("search");
  let searchparam = "";
  btn.addEventListener("click", function () {
    submit();
    OcultarBotones();
    console.log("searchparam1: " + searchparam);
  });
  searchinput.addEventListener("enter", function (event) {
    if (event.key === "Enter") {
      submit();
      OcultarBotones();
    }
  });
  function submit() {
    searchparam = document.getElementById("search").value;
    searchlist(searchparam.toLowerCase());
  }
  const searchlist = async (element) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=10000`
    );
    const searchdata = await response.json();
    console.log(`searchlist:${searchdata.results[0].name}`);
    var pokemonsearch = searchdata.results;
    console.log("pokemonsearch: " + pokemonsearch);
    console.log(typeof pokemonsearch);
    let resultsearch = pokemonsearch.filter((pokemonsearch) =>
      pokemonsearch.name.includes(element)
    );
    console.log("filtrado ya: " + resultsearch[1].name);
    const listaPokemon = document.getElementById("lista");
    listaPokemon.innerHTML = "";
    for (let i = 0; i < resultsearch.length; i++) {
      getListPokemonFiltrado(resultsearch[i]);
    }
  };
  const getListPokemonFiltrado = async (pokemonfiltrado) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonfiltrado.name}`
    );
    const pokemon = await response.json();
    console.log("getlist:" + pokemon.name + " pesa " + pokemon.weight);
    createCard(pokemon);
  };

  //creacion de tarjetas

  const createCard = (pokemon) => {
    console.log("createCard: " + pokemon.name);
    const listaPokemon = document.getElementById("lista");
    const card = document.createElement("div");
    card.classList.add("col");
    const { sprites, name, id, types, height, weight } = pokemon;
    let typeslist = getPokemonTypes(types);
    let typebackground = types[0].type.name;
    if (sprites.front_default === null) {
      sprites.front_default = "images/pokeball.png";
    }
    const nameCapitalized = capitalizarPrimeraLetra(name);

    card.innerHTML = `<div class="card mb-5" style="width: 18rem;">
    <a href="detail.html?id=${id}" class="text-reset text-decoration-none"><div class="${typebackground}">
    <img src="${sprites.front_default}" alt="imagen del pokemon" class="bd-placeholder-img card-img-top" id="image">
    </div>
    <div class="card-body text-center">
        <h5 class="card-title" id="name">${nameCapitalized}</h5> ID: <span id="id">${id}</span>
    </div>
    <ul class="list-group list-group-flush text-center">
        <li class="list-group-item"><span><b>Tipos: </b></span><span id="type">${typeslist}</span></li>
        <li class="list-group-item"><span><b>Peso: </b></span><span id="weight">${weight}</span></li>
        <li class="list-group-item"><span><b>Altura: </b></span><span id="height">${height}</span></li>
    </ul></a>
    `;

    listaPokemon.appendChild(card);
  };

  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

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

  fetchPokemon();
});
