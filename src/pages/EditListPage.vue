<template>
  <q-page class="flex flex-center">
    <q-card
      flat
      bordered
      style="width: 90%; margin-top: 50px; margin-bottom: 50px"
    >
      <div class="column q-ma-lg">
        <div class="row justify-center">
          <h4 class="col-8 justify-center">
            <b>Edit List Page</b>
          </h4>
        </div>

        <div class="row justify-center q-my-sm">
          <q-input
            outlined
            class="col-8 text-black rounded-borders"
            placeholder="Task Name"
            v-model="taskName"
          >
          </q-input>
        </div>

        <div class="row justify-center q-my-sm">
          <q-input
            outlined
            class="col-8 text-black rounded-borders"
            placeholder="Task Description"
            v-model="taskDesc"
          >
          </q-input>
        </div>

        <div class="row justify-center q-my-sm">
          <q-input
            outlined
            type="date"
            class="col-8 text-black rounded-borders"
            v-model="taskDeadline"
          >
          </q-input>
        </div>

        <div class="row justify-center q-my-md">
          <q-btn
            push
            style="background: #6488b6; color: white; margin-bottom: 20px"
            label="Edit"
            @click="editTask"
          />
          <router-link
            style="text-decoration: none"
            class="text-white justify-center"
            to="/todo"
          >
            <q-btn
              outline
              style="
                background: white;
                color: #6488b6;
                margin-bottom: 20px;
                margin-left: 10px;
              "
              label="Cancel"
            />
          </router-link>
        </div>
      </div>
    </q-card>
    <!-- Submit Alert -->
    <q-dialog v-model="isEditAlertShown" persistent>
      <q-card flat bordered style="width: 40%">
        <div class="column q-ma-sm">
          <q-card-section class="row items-center">
            <span class="q-ml-sm">Please Input Data</span>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn
              flat
              style="
                background: #6488b6;
                color: white;
                margin-bottom: 20px;
                width: 50px;
              "
              label="OK"
              @click="onOk"
            />
          </q-card-actions>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { lists, editTodo } from 'src/list/TodoList';
// import router from 'src/router';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isEditAlertShown = ref(false);
const props = defineProps({
  id: String,
});

const data = lists.value.find((lists) => lists.id === props.id);
console.log(props.id);
console.log(data);
console.log('test');
const router = useRouter();

const taskName = ref(data?.name);
const taskDesc = ref(data?.desc);
const taskDeadline = ref(data?.deadline);

function editTask() {
  if (
    editTodo({
      id: data?.id,
      name: taskName.value,
      desc: taskDesc.value,
      deadline: taskDeadline.value,
    }) == true
  ) {
    router.push('/todo');
    console.log('Edit Success');
  } else {
    console.log('Edit Failed');
    showEditAlertDialog();
  }
}

function showEditAlertDialog() {
  isEditAlertShown.value = true;
}

function hideEditAlertDialog() {
  isEditAlertShown.value = false;
}

function onOk() {
  hideEditAlertDialog();
}
</script>
