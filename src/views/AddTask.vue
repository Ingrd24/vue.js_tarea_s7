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
  </div>
</template>

<script>
import { mutations } from '@/store';

export default {
  name: "AddTask",
  data() {
    return {
      newTask: "", // Campo para la nueva tarea
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim() === "") return; // No añadir tareas vacías
      mutations.addTask(this.newTask); // Añade la tarea al estado global
      this.newTask = ""; // Limpia el campo de entrada
    }
  }
};
</script>

<style scoped>
.add-task-container {
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}

.input-group {
  display: flex;
  margin-bottom: 10px;
}

.task-input {
  flex-grow: 1;
  padding: 8px;
  margin-right: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
</style>
