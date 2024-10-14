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
      isActive: false, // Variabile per gestire lo stato del menu
     
    };
  },
  methods: {
    toggleMenu() {
      this.isActive = !this.isActive; // Cambia lo stato del menu (aperto/chiuso)
    },

   
    // Metodo per cambiare la sezione visibile
    changeSection(sectionIndex) {
      // Emesso l'evento 'section-changed' con il valore della sezione
      this.$emit('section-changed', sectionIndex);
    },
  },
};
</script>


 <template>
 <div>
    <b-navbar toggleable="lg" type="dark" class="nav">
      <b-navbar-brand @click.prevent="changeSection(0)">
        <img src="../assets/img/logo2.png" alt="business logo" />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav class="nav-2">
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="I nostri progetti" right class="custom-link">
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
        /* flex-basis: auto; */
        align-content: flex-start;
        justify-content: end;
        align-items: center;
    }
 }



 .nav {

    backdrop-filter: blur(30px);
    box-shadow: 0 0 30px rgba(227, 228, 237, 0.37);
    background-color: rgba(var(--bs-info-rgb), var(--bs-bg-opacity)) ;
    border-radius: 10px;
    margin-top: 10px;
    width: 95%;
    margin: 0 auto;
    display: flex;
    flex-wrap: nowrap;
 

}



img {
    max-width: 30%;
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


  </style>