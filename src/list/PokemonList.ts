import { ref } from 'vue';

export interface Pokemon {
  name: string;
  height?: number;
  weight?: number;
  base_experience?: number;
}

const pokemonLists = ref<Pokemon[]>([]);

// specified offset value
// async function getPokemonList() {
//   const response = await fetch(
//     'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20'
//   );
//   const data = await response.json();
//   pokemonLists.value = data.results;
//   return pokemonLists.value;
// }

async function getPokemonList(page: string) {
  const response = await fetch(
    'https://pokeapi.co/api/v2/pokemon/?offset='.concat(page, '&limit=20')
  );
  const data = await response.json();
  // console.log(page);
  pokemonLists.value = data.results;
  return pokemonLists.value;
}

async function getPokemonDetail(name: string) {
  const response = await fetch(
    'https://pokeapi.co/api/v2/pokemon/'.concat(name)
  );
  const data = await response.json();
  // pokemonLists.value = data.results;
  return data;
}

async function getPokemonImg(name: string) {
  const response = await fetch(
    'https://pokeapi.co/api/v2/pokemon/'.concat(name)
  );
  const data = await response.json();
  // pokemonLists.value = data.results;
  console.log(data.sprites.front_default);
  return data.sprites.front_default;
}

export { getPokemonList, getPokemonDetail, getPokemonImg };
