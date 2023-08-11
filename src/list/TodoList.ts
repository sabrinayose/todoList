import { Todo } from 'src/components/models';
import { ref } from 'vue';

interface TodoList {
  id?: string;
  name?: string;
  done?: boolean;
  deadline?: string;
  desc?: string;
}

// const lists = ref([
//   {
//     id: '1',
//     name: 'Todo 1',
//     done: false,
//     deadline: '2022-06-03',
//     desc: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.',
//   },
//   {
//     id: '2',
//     name: 'Todo 2',
//     done: false,
//     deadline: '2022-06-03',
//     desc: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.',
//   },
//   {
//     id: '3',
//     name: 'Todo 3',
//     done: false,
//     deadline: '2022-06-03',
//     desc: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.',
//   },
//   {
//     id: '4',
//     name: 'Todo 4',
//     done: false,
//     deadline: '2022-06-03',
//     desc: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.',
//   },
//   {
//     id: '5',
//     name: 'Todo 5',
//     done: false,
//     deadline: '2022-06-03',
//     desc: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.',
//   },
//   {
//     id: '6',
//     name: 'Todo 6',
//     done: false,
//     deadline: '2022-06-03',
//     desc: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.',
//   },
// ]);

const lists = ref<TodoList[]>([
  {
    id: '1',
    name: 'Todo 1',
    done: false,
    deadline: '2022-06-03',
    desc: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.',
  },
  {
    id: '2',
    name: 'Todo 2',
    done: false,
    deadline: '2022-06-03',
    desc: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.',
  },
  {
    id: '3',
    name: 'Todo 3',
    done: false,
    deadline: '2022-06-03',
    desc: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.',
  },
  {
    id: '4',
    name: 'Todo 4',
    done: false,
    deadline: '2022-06-03',
    desc: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.',
  },
  {
    id: '5',
    name: 'Todo 5',
    done: false,
    deadline: '2022-06-03',
    desc: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.',
  },
  {
    id: '6',
    name: 'Todo 6',
    done: false,
    deadline: '2022-06-03',
    desc: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna.',
  },
]);

function saveTodo(data: TodoList) {
  const id = (
    parseInt(lists.value[lists.value.length - 1].id || '1') + 1
  ).toString();
  const done = false;

  if (
    data.name !== undefined &&
    data.desc !== undefined &&
    data.deadline !== undefined &&
    data.name !== '' &&
    data.desc !== '' &&
    data.deadline !== ''
  ) {
    const name = data.name.toString();
    const desc = data.desc.toString();
    const deadline = data.deadline.toString();

    const newTask = { id, name, done, deadline, desc };

    lists.value.push(newTask);
    if (lists.value[lists.value.length - 1].id === id) {
      console.log('Submit Success 1');
      console.log(lists.value);
      return true;
    } else {
      console.log('Submit Failed 1');
      console.log(lists.value);
      return false;
    }
  } else {
    console.log('Submit Failed 2');
    console.log(lists.value);
    return false;
  }
}

function deleteTodo(data: TodoList) {
  const id = lists.value.findIndex((lists) => lists.id === data.id);
  if (id != -1) {
    lists.value.splice(id, 1);
    console.log('Delete Success');
  } else {
    console.log('Delete Failed');
  }
}

function editTodo(data: TodoList) {
  const id = lists.value.findIndex((lists) => lists.id === data.id);

  if (
    data.name !== undefined &&
    data.desc !== undefined &&
    data.deadline !== undefined &&
    data.name !== '' &&
    data.desc !== '' &&
    data.deadline !== ''
  ) {
    const name = data.name.toString();
    const desc = data.desc.toString();
    const deadline = data.deadline.toString();
    const done = lists.value[id].done;
    if (id !== -1) {
      lists.value[id] = {
        ...lists.value[id],
        name,
        done,
        deadline,
        desc,
      };
      console.log(lists.value);
      console.log('Edit Success 1');
      return true;
    } else {
      console.log(lists.value);
      console.log('Edit Failed 1');
      return false;
    }
  } else {
    console.log('Edit Failed 2');
    console.log(lists.value);
    return false;
  }
}

export { lists, saveTodo, deleteTodo, editTodo };
// export { lists };
