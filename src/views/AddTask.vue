<template>
    <div class="add-task-container">
      <h1 class="text-center text-success mb-4">Añadir Tarea</h1>
  
      <div class="input-group">
        <input 
          v-model="newTask" 
          @keyup.enter="addTask" 
          placeholder="Añadir nueva tarea" 
          class="task-input"
        />
        <button @click="addTask" class="add-button">Añadir</button>
      </div>
  
      <div v-if="tasks.length > 0" class="task-list">
        <div v-for="task in tasks" :key="task.id" class="task-item">
          <span :class="{ completed: task.completed }">{{ task.todo }}</span>
          <div>
            <button @click="toggleTaskCompletion(task)">
              {{ task.completed ? 'Desmarcar' : 'Completar' }}
            </button>
            <button @click="deleteTask(task)">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { store, mutations } from '@/store';
  
  export default {
    name: "AddTask",
    data() {
      return {
        newTask: "", // Campo para la nueva tarea
      };
    },
    computed: {
      tasks() {
        return store.tasks; // Tareas del estado global
      }
    },
    methods: {
      addTask() {
        if (this.newTask.trim() === "") return;
        mutations.addTask(this.newTask); // Añade la tarea
        this.newTask = ""; // Limpia el campo
      },
      deleteTask(task) {
        const taskIndex = store.tasks.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) {
          mutations.deleteTask(taskIndex); // Elimina la tarea
        }
      },
      toggleTaskCompletion(task) {
        const taskIndex = store.tasks.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) {
          mutations.toggleTaskCompletion(taskIndex); // Cambia el estado de la tarea
        }
      }
    }
  };
  </script>
  