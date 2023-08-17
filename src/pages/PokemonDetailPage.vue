<template>
  <q-page class="flex flex-center column">
    <div class="col" style="margin-top: 50px">
      <q-btn
        push
        style="background: #6488b6; color: white"
        label="Back"
        @click="$router.push('/pokemon/')"
      />
    </div>
    <q-card
      flat
      bordered
      style="width: 90%; margin-top: 50px; margin-bottom: 50px"
      class="col q-ma-xs"
    >
      <div class="row q-ma-lg justify-center">
        <div class="column q-ma-sm">
          <div class="text-h4 q-ma-md text-bold" style="text-align: center">
            {{ data.name }}
          </div>

          <div class="q-ma-xs" style="text-align: center">
            <q-img :src="pokemonImg" style="height: 120px; max-width: 130px" />
          </div>

          <q-markup-table :separator="separator" flat class="col">
            <tbody>
              <tr class="q-tr--no-hover">
                <td class="text-left">Weight</td>
                <td class="text-right">{{ data.weight }}</td>
              </tr>
              <tr class="q-tr--no-hover">
                <td class="text-left">Height</td>
                <td class="text-right">{{ data.height }}</td>
              </tr>
              <tr class="q-tr--no-hover">
                <td class="text-left">Base Experience</td>
                <td class="text-right">{{ data.base_experience }}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { Pokemon, getPokemonDetail, getPokemonImg } from '../list/PokemonList';
import { onMounted, ref } from 'vue';

const separator = 'none';

const data = ref<Pokemon>({} as Pokemon);
const pokemonImg = ref('');
const props = defineProps({
  name: String,
});

onMounted(async () => {
  data.value = await getPokemonDetail(props.name!);
  pokemonImg.value = await getPokemonImg(props.name!);
});

// console.log('Detail');
</script>
