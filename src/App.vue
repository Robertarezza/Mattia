<script>
import { ref, nextTick } from 'vue';
import { useMotion } from '@vueuse/motion';
import ContactForm from "./components/ContactForm.vue";
import NavBar from "./components/NavBar.vue";
import Intro from "./components/Intro.vue";
import AppCardHome from "./components/AppCardHome.vue";
import LoadingPage from './components/LoadingPage.vue'; // Importa la pagina di caricamento

export default {
  name: "App",
  components: {
    ContactForm,
    NavBar,
    Intro,
    AppCardHome,
    LoadingPage,
  },

  data() {
    return {
      introEl: ref(null), // Ref per l'elemento DOM
      appCardHomeEl: ref(null),
      contactFormEl: ref(null),
      loading: true, // Stato di caricamento iniziale
      isVisible: true, // Stato di visibilità della loading page

      currentSection: 0, // Aggiungi questa riga per definire currentSection
    };
  },

  methods: {
    handleSectionChange(sectionIndex) {
    console.log(`Changing to section: ${sectionIndex}`); // Aggiungi questo per il debug
    this.currentSection = sectionIndex;
    this.activateAnimation(sectionIndex);
  },
    
    // Metodo per osservare le sezioni visibili e attivare le animazioni
    observeSections() {
  const observerOptions = {
    root: null,
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const section = entry.target;

        if (section === this.$refs.introEl) {
          this.activateAnimation(0);
        } else if (section === this.$refs.appCardHomeEl) {
          this.activateAnimation(1);
        } else if (section === this.$refs.contactFormEl) {
          this.activateAnimation(2);
        }
      }
    });
  }, observerOptions);

  // Osserva le sezioni senza nextTick
  if (this.$refs.introEl) observer.observe(this.$refs.introEl);
  if (this.$refs.appCardHomeEl) observer.observe(this.$refs.appCardHomeEl);
  if (this.$refs.contactFormEl) observer.observe(this.$refs.contactFormEl);
},

    // Metodo per attivare l'animazione della sezione
    activateAnimation(sectionIndex) {
      const animationDuration = 600;

      // Anima la sezione corrente in base all'indice
      if (sectionIndex === 0) {
        useMotion(this.$refs.introEl, {
          initial: { opacity: 0, y: 100 },
          animate: { opacity: 1, y: 0, duration: animationDuration },
        });
      } else if (sectionIndex === 1) {
        useMotion(this.$refs.appCardHomeEl, {
          initial: { opacity: 0, x: 100 },
          animate: { opacity: 1, x: 0, duration: animationDuration },
        });

        useMotion(this.$refs.introEl, {
          initial: { opacity: 1 },
          animate: { opacity: 0, y: -100, duration: animationDuration },
        });
      } else if (sectionIndex === 2) {
        useMotion(this.$refs.contactFormEl, {
          initial: { opacity: 0, x: -100 },
          animate: { opacity: 1, x: 0, duration: animationDuration },
        });

        useMotion(this.$refs.appCardHomeEl, {
          initial: { opacity: 1 },
          animate: { opacity: 0, x: -100, duration: animationDuration },
        });
      }
    },
  },

  mounted() {
    this.observeSections(); // Avvia l'osservazione delle sezioni visibili

    // Inizialmente attiva l'animazione della prima sezione
    this.activateAnimation(0);
  },

  // Simula un tempo di caricamento
  created() {
    setTimeout(() => {
      this.loading = false; // Nasconde il contenuto della loading page
      setTimeout(() => {
        this.isVisible = false; // Dopo la transizione, rimuovi la loading page dal DOM
      }, 1000); // 1 secondo di transizione
    }, 2000); // Simula un caricamento di 2 secondi
  },
};
</script>






<template>
  <div>
    <!-- Passa isVisible come prop al componente LoadingPage -->
    <LoadingPage :isVisible="isVisible" />

  <div id="app"  v-if="!loading" class="background-container">
    <header>
       <!-- Ascoltiamo l'evento 'section-changed' -->
       <NavBar @section-changed="handleSectionChange" />
    </header>

    <main>
  <!-- Sezioni a schermo intero -->
  <transition name="fade-slide">
    <div v-if="currentSection === 0" ref="introEl">
      <Intro />
    </div>
  </transition>

  <transition name="fade-slide">
    <div v-if="currentSection === 1" ref="appCardHomeEl">
      <AppCardHome />
    </div>
  </transition>

  <transition name="fade-slide">
    <div v-if="currentSection === 2" ref="contactFormEl">
      <ContactForm />
    </div>
  </transition>
</main>

    <footer>
      <p>&copy; 2024 My Vue.js Site</p>
    </footer>
  </div>
  </div>
</template>





<style scoped lang="scss">

.background-container {
  min-height: 100vh;
  background-image: url('../src/assets/img/sfondo53.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
}

#app {
  font-family: Comic Sans MS;
  text-align: center;
  background-image: url("../src/assets/img/sfondo53.jpg");
  background-size: cover;
  background-attachment: fixed;
  color: #f15048;
  height: 100vh;
  overflow-x: hidden; /* Evita overflow orizzontale */
  overflow: hidden;
}

header {
  color: #f15048;
  //padding: 20px;
  position: sticky;
  top: 10px;
  left: 0;
  z-index: 20;
  min-height: 10vh;
}

main {
  margin: 20px;
  position: relative;
  height: 80vh; /* Cambiato per far spazio al footer */
  overflow: hidden;
}

@media (max-width: 350px) {
  main {
 max-height: 80vh;
  overflow:auto;
}

@media (max-width: 425px) {
  main {
  overflow:auto;
  max-height: 80vh;
}
}
  
 }
 @media (max-width: 460px) { /* Per schermi mobili */
  main {
    max-height: 80vh; /* Mantiene il comportamento attuale per i mobili */
    overflow: auto; /* Permette lo scorrimento */
  }
}
 @media (max-width: 768px) { /* Per schermi mobili */
  main {
    max-height: 80vh; /* Mantiene il comportamento attuale per i mobili */
    overflow: auto; /* Permette lo scorrimento */
  }
}
 @media (max-width: 991px) { /* Per schermi mobili */
  main {
    max-height: 80vh; /* Mantiene il comportamento attuale per i mobili */
    overflow: auto; /* Permette lo scorrimento */
  }
}


html {
  scroll-behavior: smooth;
}

footer {
  background-color: #35495e;
  color: white;
  //padding: 10px;
  min-height: 10vh;
}


/* Definizione della transizione fade e slide */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.6s, transform 0.6s;
}

.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(100px); /* Slitta leggermente verso il basso */
}

.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0); /* Posizione di partenza */
}
</style>
