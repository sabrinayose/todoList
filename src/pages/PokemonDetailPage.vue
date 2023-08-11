<template>
  <q-page class="flex flex-center">
    <q-card
      flat
      bordered
      style="width: 90%; margin-top: 50px; margin-bottom: 50px"
    >
      <div class="row justify-around q-ma-lg">
        <q-card
          bordered
          class="my-card"
          v-for="data in pokemonDetail"
          :key="data.name"
          style="margin-bottom: 20px"
        >
          <div class="column">
            <div class="col">
              <q-btn
                flat
                style="background: #6488b6; color: white; margin-bottom: 20px"
                label="Back"
                @click="$router.push('/pokemon')"
              />
            </div>
            <div class="col">
              <q-card-section style="padding-bottom: 0px">
                <div class="text-h6">{{ data.name }}</div>
              </q-card-section>
            </div>
            <div class="col justify-center">
              <q-card-section>
                <div class="text-subtitle2">Weight : {{ data.weight }}</div>
                <div class="text-subtitle2">Height : {{ data.height }}</div>
                <div class="text-subtitle2">
                  Base Experience : {{ data.base_experience }}
                </div>
              </q-card-section>
            </div>
          </div>
        </q-card>
        <!-- <div class="column">
          <div class="col">
            <q-btn
              flat
              style="background: #6488b6; color: white; margin-bottom: 20px"
              label="Back"
              @click="$router.push('/pokemon')"
            />
          </div>
          <div class="col">
            <q-card-section style="padding-bottom: 0px">
              <div class="text-h4"><b>Spearow</b></div>
            </q-card-section>
          </div>
          <div class="col justify-center">
            <q-card-section>
              <div class="text-subtitle1">Weight : 20</div>
              <div class="text-subtitle1">Height : 3</div>
              <div class="text-subtitle1">Base Experience : 52</div>
            </q-card-section>
          </div>
        </div> -->
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { Pokemon, getPokemonDetail } from '../list/PokemonList';
import { onMounted, ref } from 'vue';

const pokemonDetail = ref<Pokemon[]>([]);
const props = defineProps({
  name: String,
});

onMounted(async () => {
  pokemonDetail.value = await getPokemonDetail(props.name!);
});

// console.log('Detail');
</script>
