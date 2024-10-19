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
      currentSection: 0,
      sections: ['introEl', 'appCardHomeEl', 'contactFormEl'],
      isSectionInView: false, // Nuovo stato per sapere se una sezione è visibile
      touchStartY: 0, // Per memorizzare la posizione iniziale del tocco
      touchThreshold: 0, // Soglia di scorrimento per cambiare sezione
      loading: true, // Stato di caricamento iniziale
      isVisible: true, // Stato di visibilità della loading page
      isScrolling: false, // Stato per il controllo dello scrolling
    };
  },

  methods: {
    // Metodo per gestire l'evento di scroll
    handleScroll(event) {
      if (this.isScrolling ) return; // Non esegue lo scroll se stiamo già scrollando o la sezione non è in vista
      this.isScrolling = true;

      // Verifica se lo scroll è verso il basso o verso l'alto
      if (event.deltaY > 0 && this.currentSection < this.sections.length - 1) {
        this.currentSection++;
      } else if (event.deltaY < 0 && this.currentSection > 0) {
        this.currentSection--;
      }

      this.activateAnimation(this.currentSection);
    },

    // Metodo per gestire il movimento del dito su dispositivi mobili
    handleTouchStart(event) {
      this.touchStartY = event.touches[0].clientY; // Salva la posizione Y iniziale
    },

    handleTouchMove(event) {
      if (this.isScrolling) return; // Se stiamo già scrollando, esci

      const touchEndY = event.touches[0].clientY; // Posizione Y finale
      const touchDiff = this.touchStartY - touchEndY; // Calcola la differenza

      // Verifica se lo scorrimento è oltre la soglia e cambia sezione
      if (touchDiff > this.touchThreshold && this.currentSection < this.sections.length - 1) {
        this.isScrolling = true; // Imposta lo stato di scrolling
        setTimeout(() => (this.isScrolling = false), 1000); // Resetta dopo 1 secondo
        this.currentSection++;
      } else if (touchDiff < -this.touchThreshold && this.currentSection > 0) {
        this.isScrolling = true; // Imposta lo stato di scrolling
        setTimeout(() => (this.isScrolling = false), 1000); // Resetta dopo 1 secondo
        this.currentSection--;
      }

      this.activateAnimation(this.currentSection);
    },

    // Metodo per gestire il cambio di sezione dalla navbar
    handleSectionChange(sectionIndex) {
      this.currentSection = sectionIndex;
      this.activateAnimation(sectionIndex); // Attivare le animazioni per la nuova sezione
    },

    // Metodo per osservare le sezioni visibili
    observeSections() {
      const observerOptions = {
        root: null,
        threshold: 0.5, // 50% della sezione visibile
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isSectionInView = true;
          } else {
            this.isSectionInView = false;
          }
        });
      }, observerOptions);

      // Usa nextTick per osservare le sezioni dopo che il DOM è stato renderizzato
      nextTick(() => {
        if (this.$refs.introEl) {
          observer.observe(this.$refs.introEl);
        }
        if (this.$refs.appCardHomeEl) {
          observer.observe(this.$refs.appCardHomeEl);
        }
        if (this.$refs.contactFormEl) {
          observer.observe(this.$refs.contactFormEl);
        }
      });
    },

    // Metodo per attivare l'animazione della sezione
    activateAnimation(sectionIndex) {
      this.isScrolling = false; // Sblocca lo scroll subito dopo aver iniziato l'animazione
      const animationDuration = 600;

      // Anima la sezione corrente
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
    this.observeSections(); // Avvia l'osservazione delle sezioni
    window.addEventListener('wheel', this.handleScroll);
    window.addEventListener('touchstart', this.handleTouchStart);
    window.addEventListener('touchmove', this.handleTouchMove);

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

  beforeUnmount() {
    // Rimuovi il listener dello scroll quando il componente viene distrutto
    window.removeEventListener('wheel', this.handleScroll);
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchmove', this.handleTouchMove);
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
