<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Todo App </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list class="q-mt-xl">
        <q-item v-for="data in menus" :key="data.id">
          <!-- <q-item-section>
            <q-btn
              :href="data.url"
              class="text-black text-h5 text-bold"
              style="text-decoration: none"
            >
              {{ data.title }}
            </q-btn>
          </q-item-section> -->

          <router-link
            style="text-decoration: none"
            class="text-black"
            :to="data.url"
          >
            <q-btn flat style="color: black">
              {{ data.title }}
            </q-btn>
          </router-link>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const menus = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Todo',
    url: '/todo',
  },
  {
    title: 'Add List',
    url: '/add-list',
  },
  {
    title: 'Pokemon',
    url: '/pokemon',
  },
];

const leftDrawerOpen = ref(true);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
