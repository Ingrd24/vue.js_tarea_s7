<template>
  <div class="task-list-container">
    <h1 class="text-center text-primary mb-4 title">Lista de Tareas</h1>

    <!-- Botón para cargar tareas desde la API -->
    <button @click="loadTasks" class="load-tasks-button">Cargar Tareas</button>

    <!-- Mostrar lista de tareas solo si showTasks es true -->
    <div v-if="showTasks" class="task-list">
      <div v-if="tasks.length > 0">
        <div v-for="(task, index) in tasks" :key="task.id" class="task-item">
          <span :class="{ completed: task.completed }">{{ task.todo }}</span>
          <div>
            <button @click="toggleTaskCompletion(index)">
              {{ task.completed ? 'Desmarcar' : 'Completar' }}
            </button>
            <button @click="deleteTask(index)">Eliminar</button>
          </div>
        </div>
      </div>
      <div v-else class="no-tasks">No hay tareas disponibles.</div>
    </div>
  </div>
</template>

<script>
import { store, mutations } from "@/store"; // Importar el store y las mutaciones

export default {
  name: "TaskList",
  data() {
    return {
      showTasks: false, // Controla si se deben mostrar las tareas
    };
  },
  computed: {
    tasks() {
      return store.tasks; // Acceder al estado global de tareas
    },
  },
  methods: {
    // Cargar tareas desde la API
    async loadTasks() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        if (!response.ok) {
          throw new Error("Error al cargar tareas");
        }
        const data = await response.json();
        
        // Añadir tareas de la API al estado global
        const apiTasks = data.slice(0, 10).map(task => ({
          todo: task.title,
          completed: task.completed,
          id: task.id
        }));
        
        // Añadir tareas de la API al estado global sin borrar las existentes
        apiTasks.forEach(task => store.tasks.push(task));

        this.showTasks = true; // Mostrar la lista de tareas
      } catch (error) {
        console.error("Error al cargar tareas desde la API:", error);
      }
    },
    deleteTask(index) {
      mutations.deleteTask(index); // Llamar a la mutación para eliminar la tarea
    },
    toggleTaskCompletion(index) {
      mutations.toggleTaskCompletion(index); // Cambiar el estado de completado
    },
  },
};
</script>

<style scoped>
.task-list-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.load-tasks-button {
  padding: 10px 15px;
  background-color: #00bcd4;
  color: white;
  border: none;
  cursor: pointer;
}

.task-list {
  margin-top: 20px;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.completed {
  text-decoration: line-through;
  color: gray;
}

.no-tasks {
  margin-top: 20px;
  text-align: center;
  font-style: italic;
}

.title[data-v-246463e7] {
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, .3);
  margin-bottom: 30px;
}

.text-primary {
  --bs-text-opacity: 1;
  color: rgba(var(--bs-primary-rgb), var(--bs-text-opacity)) !important;
}

.text-center {
  text-align: center !important;
}

.mb-4 {
  margin-bottom: 1.5rem !important;
}
</style>
