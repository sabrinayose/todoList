<template>
  <q-page class="flex flex-center">
    <q-card
      flat
      bordered
      style="width: 90%; margin-top: 50px; margin-bottom: 50px"
    >
      <div class="row justify-around q-ma-lg q-gutter-xs">
        <div class="col-12">
          <h4 style="text-align: center">
            <b>Pokemon Page</b>
          </h4>
          <div class="row justify-center q-mb-xl">
            <div>
              <q-btn
                push
                class="q-mx-md"
                style="background: #6488b6; color: white"
              >
                <q-icon name="arrow_back" @click="onClickPreviousPage" />
              </q-btn>
              <q-btn
                push
                class="q-mx-md"
                style="background: #6488b6; color: white"
              >
                <q-icon name="arrow_forward" @click="onClickNextPage" />
              </q-btn>
            </div>
            <!-- <div class=""></div> -->
          </div>
        </div>

        <q-card
          bordered
          class="my-card col-3"
          v-for="data in pokemonData"
          :key="data.name"
          style="margin-bottom: 20px"
        >
          <div class="column">
            <div class="col">
              <q-card-section style="padding-bottom: 0px">
                <div>{{ data.name }}</div>
              </q-card-section>
            </div>
            <div
              class="col"
              style="text-align: right; padding-bottom: 5px; padding-right: 5px"
            >
              <q-btn flat>
                <q-icon
                  name="visibility"
                  @click="$router.push('/pokemon/detail/' + data.name)"
                />
                <!-- <q-icon name="visibility" @click="showDetail(data.name)" /> -->
              </q-btn>
            </div>
          </div>
        </q-card>
      </div>
    </q-card>
    <!-- Pokemon Detail Dialog -->
    <!-- <q-dialog v-model="isDetailShown" persistent>
      <q-card
        flat
        bordered
        v-for="data in pokemonData"
        :key="data.name"
        style="width: 40%"
      >
        <div class="column q-ma-sm">
          <q-card-section class="row items-center">
            <span class="q-ml-sm">{{ data.name }}</span>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn
              flat
              style="background: #6488b6; color: white; margin-bottom: 20px"
              label="Close"
              @click="onClose"
            />
          </q-card-actions>
        </div>
      </q-card>
    </q-dialog> -->
  </q-page>
</template>

<script setup lang="ts">
import { Pokemon, getPokemonList } from '../list/PokemonList';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  data: String,
});
//  eslint-disable-next-line vue/no-setup-props-destructure
let page = props.data;
const router = useRouter();

if (page === undefined) {
  page = '0';
}

const pokemonData = ref<Pokemon[]>([]);
onMounted(async () => {
  pokemonData.value = await getPokemonList(page!);
});
// onMounted(async () => {
//   pokemonData.value = await getPokemonList();
// });

const pageNumber = Number(page!);
let previousPage = ref((pageNumber - 20).toString());
let nextPage = ref((pageNumber + 20).toString());

if (page === '0') {
  previousPage.value = '0';
}

if (page === '1280') {
  nextPage.value = '1280';
}

function toPreviousPage() {
  router.push('/pokemon/'.concat(previousPage.value)).then(() => router.go(0));
}
function toNextPage() {
  router.push('/pokemon/'.concat(nextPage.value)).then(() => router.go(0));
  console.log(nextPage.value);
}

function onClickPreviousPage() {
  toPreviousPage();
}

function onClickNextPage() {
  toNextPage();
}
</script>
