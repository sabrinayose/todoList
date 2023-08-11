<template>
  <q-page class="flex flex-center">
    <q-card
      flat
      bordered
      style="width: 90%; margin-top: 50px; margin-bottom: 50px"
    >
      <div class="column justify-center q-ma-lg">
        <div class="row justify-center">
          <h4 class="col justify-center">
            <b><center>Todo Page</center></b>
          </h4>
        </div>

        <!-- <div class="row justify-start q-my-md">
          <router-link
            style="text-decoration: none"
            class="text-white justify-center"
            to="/add-list"
          >
            <q-btn
              push
              style="background: #6488b6; color: white; margin-bottom: 20px"
              @click="addList"
            >
              Add Todo List
            </q-btn>
          </router-link>
        </div> -->

        <div class="row justify-start q-my-md">
          <q-btn
            push
            style="background: #6488b6; color: white; margin-bottom: 20px"
            @click="addList"
          >
            Add Todo List
          </q-btn>
        </div>

        <q-card
          bordered
          class="my-card column justify-start"
          v-for="data in lists"
          :key="data.id"
          style="margin-bottom: 20px"
        >
          <div class="row">
            <q-checkbox v-model="data.done" style="margin-left: 15px" />
            <div class="col justify-start">
              <q-card-section>
                <div class="text-h6">{{ data.name }}</div>
                <div class="text-subtitle2">{{ data.deadline }}</div>
              </q-card-section>
            </div>
            <div class="col-2 justify-end" style="margin-top: 25px">
              <q-btn flat>
                <q-icon
                  name="edit"
                  @click="$router.push('/edit-list/' + data.id)"
                />
              </q-btn>
              <q-btn flat>
                <q-icon name="delete" @click="confirmDelete(data.id)" />
              </q-btn>
            </div>
          </div>

          <q-separator inset />

          <div class="col">
            <q-card-section>
              {{ data.desc }}
            </q-card-section>
          </div>
        </q-card>
      </div>
    </q-card>

    <!-- Add Todo -->
    <q-dialog v-model="isDialogShown" persistent>
      <!-- <q-card style="min-width: 1000px">
        <q-card-section>
          <div class="text-h6">Add List</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="inputTodo.taskName" label="Task Name" />
          <q-input
            dense
            v-model="inputTodo.taskDesc"
            label="Task Description"
          />
          <q-input
            dense
            v-model="inputTodo.taskDeadline"
            label="Task Deadline"
            type="date"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="onCancel" />
          <q-btn flat label="Submit" @click="onSubmit" />
        </q-card-actions>
      </q-card> -->
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
              v-model="inputTodo.taskName"
            >
            </q-input>
          </div>

          <div class="row justify-center q-my-sm">
            <q-input
              outlined
              class="col-8 text-black rounded-borders"
              placeholder="Task Description"
              v-model="inputTodo.taskDesc"
            >
            </q-input>
          </div>

          <div class="row justify-center q-my-sm">
            <q-input
              outlined
              type="date"
              class="col-8 text-black rounded-borders"
              placeholder="Task Deadline"
              v-model="inputTodo.taskDeadline"
            >
            </q-input>
          </div>

          <q-card-actions align="right" class="text-primary">
            <q-btn
              outline
              style="background: white; color: #6488b6; margin-bottom: 20px"
              label="Cancel"
              @click="onCancel"
            />
            <q-btn
              flat
              style="background: #6488b6; color: white; margin-bottom: 20px"
              label="Submit"
              @click="onSubmit"
            />
          </q-card-actions>
        </div>
      </q-card>
    </q-dialog>
    <!-- Confirm Delete -->
    <q-dialog v-model="isConfirmDeleteShown" persistent>
      <q-card flat bordered style="width: 40%">
        <div class="column q-ma-sm">
          <q-card-section class="row items-center">
            <span class="q-ml-sm"
              >Are you sure you want to delete this task?</span
            >
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn
              outline
              style="background: white; color: #6488b6; margin-bottom: 20px"
              label="Cancel"
              @click="onCancelDelete"
            />
            <q-btn
              flat
              style="background: #6488b6; color: white; margin-bottom: 20px"
              label="Delete"
              @click="onDelete"
            />
          </q-card-actions>
        </div>
      </q-card>
    </q-dialog>
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
              style="background: #6488b6; color: white; margin-bottom: 20px"
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
import { defineComponent } from 'vue';
import { ref, reactive } from 'vue';
import { useQuasar } from 'quasar';
import { lists, saveTodo, deleteTodo } from '../list/TodoList';
import { useRouter } from 'vue-router';

const router = useRouter();

const isDialogShown = ref(false);
const isConfirmDeleteShown = ref(false);
const isSubmitAlertShown = ref(false);
const toBeDeletedId = ref('');

const inputTodo = reactive({
  taskName: '',
  taskDeadline: '',
  taskDesc: '',
});

// function saveTodo() {
//   const id = (parseInt(lists.value[lists.value.length - 1].id) + 1).toString();
//   const done = false;

//   if (
//     inputTodo.taskName !== undefined &&
//     inputTodo.taskDesc !== undefined &&
//     inputTodo.taskDeadline !== undefined &&
//     inputTodo.taskName !== '' &&
//     inputTodo.taskDesc !== '' &&
//     inputTodo.taskDeadline !== ''
//   ) {
//     const name = inputTodo.taskName.toString();
//     const desc = inputTodo.taskDesc.toString();
//     const deadline = inputTodo.taskDeadline.toString();

//     const newTask = { id, name, done, deadline, desc };

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

function submit() {
  if (
    saveTodo({
      name: inputTodo.taskName,
      desc: inputTodo.taskDesc,
      deadline: inputTodo.taskDeadline,
    }) == true
  ) {
    router.push('/todo');
    console.log('Submit Success');
  } else {
    console.log('Submit Failed');
    showSubmitAlertDialog();
  }
}

function showAddDialog() {
  isDialogShown.value = true;
}

function hideAddDialog() {
  isDialogShown.value = false;
}

function addList() {
  showAddDialog();
}

function onSubmit() {
  // saveTodo();
  submit();
  resetInput();
  hideAddDialog();
}

function onCancel() {
  resetInput();
  hideAddDialog();
}

function resetInput() {
  inputTodo.taskName = '';
  inputTodo.taskDeadline = '';
  inputTodo.taskDesc = '';
}

function confirmDelete(id) {
  toBeDeletedId.value = id;
  showConfirmDelete();
}

function showConfirmDelete() {
  isConfirmDeleteShown.value = true;
}

function hideConfirmDelete() {
  isConfirmDeleteShown.value = false;
}

// function deleteTask(id) {
//   const index = lists.value.findIndex((lists) => lists.id === id);
//   if (index != -1) {
//     console.log('Delete Success');
//     lists.value.splice(index, 1);
//   } else {
//     console.log('Delete Failed');
//   }
// }

function onDelete() {
  // deleteTask(toBeDeletedId.value);
  deleteTodo({ id: toBeDeletedId.value });
  hideConfirmDelete();
}

function onCancelDelete() {
  hideConfirmDelete();
}

function showSubmitAlertDialog() {
  isSubmitAlertShown.value = true;
}

function hideSubmitAlertDialog() {
  isSubmitAlertShown.value = false;
}

function onOk() {
  hideSubmitAlertDialog();
  showAddDialog();
}
</script>
