<script>
import { ref } from 'vue';
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
      introEl: ref(null),
      appCardHomeEl: ref(null),
      contactFormEl: ref(null),
      currentSection: 0, // Indica quale sezione è attualmente visibile
      sections: ['introEl', 'appCardHomeEl', 'contactFormEl'], // Elenco delle sezioni
      isScrolling: false, // Stato per prevenire scroll multipli
      loading: true, // Stato di caricamento iniziale
      isVisible: true, // Stato di visibilità della loading page
    };
  },
 
  methods: {
    // Metodo per gestire l'evento di scroll e cambiare sezione
    handleScroll(event) {
      if (this.isScrolling) return; // Se stiamo già scrollando, esci

      this.isScrolling = true; // Imposta lo stato di scrolling
      setTimeout(() => this.isScrolling = false, 1000); // Resetta dopo 1 secondo

      // Verifica se lo scroll è verso il basso o verso l'alto
      if (event.deltaY > 0 && this.currentSection < this.sections.length - 1) {
        this.currentSection++;
      } else if (event.deltaY < 0 && this.currentSection > 0) {
        this.currentSection--;
      }

      this.activateAnimation(this.currentSection);
    },

    // Metodo per gestire il cambio di sezione dalla navbar
    handleSectionChange(sectionIndex) {
      this.currentSection = sectionIndex;
      this.activateAnimation(sectionIndex); // Attivare le animazioni per la nuova sezione
    },

    // Metodo per attivare le animazioni per la sezione corrente
    activateAnimation(sectionIndex) {
      if (sectionIndex === 0) {
        // Attivare animazione per Intro
        useMotion(this.introEl, {
          initial: { opacity: 0, y: 100 },
          animate: { opacity: 1, y: 0, duration: 600 },
        });
      } else if (sectionIndex === 1) {
        // Attivare animazione per AppCardHome
        useMotion(this.appCardHomeEl, {
          initial: { opacity: 0, x: 100 }, // Slide in from right
          animate: { opacity: 1, x: 0, duration: 600 },
        });

        // Dissolvenza di Intro
        useMotion(this.introEl, {
          initial: { opacity: 1 },
          animate: { opacity: 0, y: -100, duration: 600 },
        });
      } else if (sectionIndex === 2) {
        // Attivare animazione per ContactForm
        useMotion(this.contactFormEl, {
          initial: { opacity: 0, x: -100 }, // Slide in from left
          animate: { opacity: 1, x: 0, duration: 600 },
        });

        // Dissolvenza di AppCardHome
        useMotion(this.appCardHomeEl, {
          initial: { opacity: 1 },
          animate: { opacity: 0, x: -100, duration: 600 },
        });
      }
    },
  },

  mounted() {
    // Aggiungi un listener per rilevare lo scroll
    window.addEventListener('wheel', this.handleScroll);

    // Attivare l'animazione iniziale per Intro
    this.activateAnimation(0);

    // Simula un tempo di caricamento
    setTimeout(() => {
      this.loading = false; // Nasconde il contenuto della loading page
      setTimeout(() => {
        this.isVisible = false; // Dopo la transizione, rimuovi la loading page dal DOM
      }, 1000); // 1 secondo di transizione
    }, 2000); // Simula un caricamento di 2 secondi
  },

  beforeUnmount() {
    // Rimuovi il listener dello scroll quando il componente viene distrutto
    window.removeEventListener('wheel', this.handleScroll);
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
      <transition name="fade-slide" id="Intro">
        <div v-if="currentSection === 0" ref="introEl" class="">
          <Intro />
        </div>
      </transition>

      <transition name="fade-slide" id="AppCardHome">
        <div v-if="currentSection === 1" ref="appCardHomeEl" class="">
          <AppCardHome />
        </div>
      </transition>

      <transition name="fade-slide" id="ContactForm">
        <div v-if="currentSection === 2" ref="contactFormEl" class="">
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
}

header {
  color: #f15048;
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
  overflow: hidden; /* Permette lo scroll */
}

@media (max-width: 768px) { /* Per schermi mobili */
  main {
    height: 80vh; /* Mantiene il comportamento attuale per i mobili */
    overflow: auto; /* Permette lo scroll */
  }
}

html {
  scroll-behavior: smooth;
}

footer {
  background-color: #35495e;
  color: white;
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
