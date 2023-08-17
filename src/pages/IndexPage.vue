<template>
  <q-page class="flex flex-center">
    <q-card
      flat
      bordered
      style="width: 90%; margin-top: 50px; margin-bottom: 50px"
    >
      <div class="column">
        <div class="col q-ma-xl">
          <h3 class="text-bold" style="text-align: center">Welcome!!</h3>
        </div>
        <div class="col q-ma-xl" style="text-align: center">
          <div class="row justify-around">
            <q-card bordered class="my-card col-5" style="margin-bottom: 20px">
              <q-card-section>
                <q-btn
                  flat
                  style="color: #6488b6"
                  label="Todo List"
                  @click="$router.push('/todo')"
                />
              </q-card-section>
            </q-card>
            <q-card bordered class="my-card col-5" style="margin-bottom: 20px">
              <q-card-section>
                <q-btn
                  flat
                  style="color: #6488b6"
                  label="Pokemon List"
                  @click="$router.push('/pokemon/')"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </q-card>
    <!--  -->
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
</script>
