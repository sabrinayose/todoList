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
            <b><center>Add List Page</center></b>
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
            placeholder="Task Deadline"
            v-model="taskDeadline"
          >
          </q-input>
        </div>

        <div class="row justify-center q-my-md">
          <q-btn
            push
            style="background: #6488b6; color: white; margin-bottom: 20px"
            @click="submit"
          >
            Submit
          </q-btn>
        </div>
      </div>
    </q-card>

    <!-- Submit Alert -->
    <q-dialog v-model="isSubmitAlertShown" persistent>
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
import { lists } from 'src/list/TodoList';
import { saveTodo } from 'src/list/TodoList';
// import router from 'src/router';
import { defineComponent } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isSubmitAlertShown = ref(false);
const router = useRouter();

const taskName = ref('');
const taskDesc = ref('');
const taskDeadline = ref('');

// function saveTodo() {
//   const id = (parseInt(lists.value[lists.value.length - 1].id) + 1).toString();
//   const done = false;

//   if (
//     taskName.value !== undefined &&
//     taskDesc.value !== undefined &&
//     taskDeadline.value !== undefined &&
//     taskName.value !== '' &&
//     taskDesc.value !== '' &&
//     taskDeadline.value !== ''
//   ) {
//     const name = taskName.value.toString();
//     const desc = taskDesc.value.toString();
//     const deadline = taskDeadline.value.toString();

//     const newTask = { id, name, desc, deadline, done };

//     lists.value.push(newTask);
//     if (lists.value[lists.value.length - 1].id === id) {
//       console.log('Submit Success');
//       console.log(lists.value);
//     } else {
//       console.log('Submit Failed');
//       console.log(lists.value);
//     }
//   } else {
//     console.log('Submit Failed');
//     console.log(lists.value);
//     showSubmitAlertDialog();
//   }
// }

function showSubmitAlertDialog() {
  isSubmitAlertShown.value = true;
}

function hideSubmitAlertDialog() {
  isSubmitAlertShown.value = false;
}

function onOk() {
  hideSubmitAlertDialog();
}

function submit() {
  if (
    saveTodo({
      name: taskName.value,
      desc: taskDesc.value,
      deadline: taskDeadline.value,
    }) == true
  ) {
    router.push('/todo');
    console.log('Submit Success');
  } else {
    console.log('Submit Failed');
    showSubmitAlertDialog();
  }
}
</script>

//
<script>
// export default {
//   setup() {
//     return {
//       val,
//     };
//   },
// };
//
//
</script>
