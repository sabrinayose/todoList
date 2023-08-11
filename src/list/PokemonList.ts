import { ref } from 'vue';

export interface Pokemon {
  name: string;
  height: number;
  weight: number;
  base_experience: number;
}

const pokemonLists = ref<Pokemon[]>([]);

async function getPokemonList() {
  const response = await fetch(
    'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20'
  );
  const data = await response.json();
  pokemonLists.value = data.results;
  return pokemonLists.value;
}

async function getPokemonDetail(name: string) {
  const response = await fetch(
    'https://pokeapi.co/api/v2/pokemon/'.concat(name)
  );
  const data = await response.json();
  //   pokemonLists.value = data.results;
  return data;
}

export { getPokemonList, getPokemonDetail };
