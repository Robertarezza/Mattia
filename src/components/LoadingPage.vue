
<script>
export default {
  name: "LoadingPage",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
};
</script>


<template>
  <transition name="fade">
    <!-- Usa v-if per controllare la visibilità della pagina di caricamento -->
    <div v-if="isVisible" class="loading-page">
      <img src="../assets/img/logo2.png" alt="Logo" class="loading-logo" />
    </div>
  </transition>
</template>


<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color:white; /* Aggiungi un background bianco per nascondere il contenuto sotto */

  transition: opacity 1s ease; /* Aggiungi una transizione alla proprietà opacity */
  opacity: 1;
}

.loading-logo {
  width: 300px;
  height: 100px;
  opacity: 0.7;
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
}

/* Aggiungi la transizione per la dissolvenza */
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>