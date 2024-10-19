<script>
import ContactForm from './ContactForm.vue';
import AppCardHome from './AppCardHome.vue';
import { store } from '../store';
import Modal from './Modal.vue';
import Intro from './Intro.vue';

export default {
  name: 'NavBar',
  components: {
    ContactForm,
    AppCardHome,
    Intro,
    Modal
  },
  data() {
    return {
      store,
      isActive: false, // Variabile per gestire lo stato del menu (aperto/chiuso)
    };
  },
  methods: {
    toggleMenu() {
      this.isActive = !this.isActive; // Cambia lo stato del menu (aperto/chiuso)
    },

    // Metodo per cambiare la sezione visibile
    changeSection(sectionIndex) {
      this.isActive = false; // Chiude il menu una volta cambiata la sezione
      this.$emit('section-changed', sectionIndex); // Emesso l'evento 'section-changed'
    },
  },
};
</script>


<template>
  <div>
    <!-- Navbar principale -->
    <b-navbar toggleable="lg" type="dark" class="nav">
      <!-- Brand con il logo -->
      <b-navbar-brand @click.prevent="changeSection(0)">
        <img src="../assets/img/logo2.png" alt="business logo" />
      </b-navbar-brand>

      <!-- Pulsante per il toggle del menu in versione mobile -->
      <b-navbar-toggle @click="toggleMenu" style=""></b-navbar-toggle>

      <!-- Collapse per la versione mobile -->
      <b-collapse id="nav-collapse" is-nav :visible="isActive" class="nav-2">
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="I nostri progetti" right class="custom-link" >
            <b-dropdown-item @click.prevent="changeSection(1)">Quadretti</b-dropdown-item>
            <b-dropdown-item @click.prevent="changeSection(1)">Creazioni 3D</b-dropdown-item>
            <b-dropdown-item @click.prevent="changeSection(1)">FUNKO POP</b-dropdown-item>
            <b-dropdown-item @click.prevent="changeSection(1)">Stampe realistiche</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item class="custom-link" @click.prevent="changeSection(2)">Contattaci</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>




<style scoped lang="scss">
@media (min-width: 992px) {
  .navbar-expand-lg .navbar-collapse {
    display: flex !important;
    align-content: flex-start;
    justify-content: end;
    align-items: center;
  }
}

.nav {
  backdrop-filter: blur(30px);
  box-shadow: 0 0 30px rgba(227, 228, 237, 0.37);
  background-color: rgba(var(--bs-info-rgb), var(--bs-bg-opacity));
  border-radius: 10px;
  margin-top: 10px;
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-wrap: nowrap;
  color: #fff;
}

@media (max-width: 992px) {
    .nav-2[data-v-c3ceb15a] {
      background-color: rgba(13, 202, 240, var(--bs-bg-opacity));
        box-shadow: 0 0 30px rgba(227, 228, 237, 0.37);
        backdrop-filter: blur(30px);
        position: absolute;
        top: 60px;
        right: 0;
        width: 19%;
        left: 683px;
        
    }
  }

img {
  max-width: 30%;
}

.nav-link {
    display: block;
    padding: var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x);
    font-size: var(--bs-nav-link-font-size);
    font-weight: var(--bs-nav-link-font-weight);
    color: var(--bs-nav-link-color);
    text-decoration: none;
    background: none;
    border: 0;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;


    a{
      color: white;
    }
}

.navbar-brand {
  padding-top: var(--bs-navbar-brand-padding-y);
  padding-bottom: var(--bs-navbar-brand-padding-y);
  margin-right: var(--bs-navbar-brand-margin-end);
  font-size: var(--bs-navbar-brand-font-size);
  color: var(--bs-navbar-brand-color);
  text-decoration: none;
  white-space: nowrap;
  display: flex;
}

.custom-link {
  color: #fff;
}

@media (max-width: 992px) {
  .nav-2 {
    background-color: rgba(var(--bs-info-rgb), var(--bs-bg-opacity));
    position: absolute;
    top: 60px;
    right: 20px;
    width: 100%;
  }
}
</style>