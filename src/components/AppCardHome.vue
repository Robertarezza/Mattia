<script>
import Modal from './Modal.vue';
import { store } from "../store";

export default {
    name: 'AppCardHome',
  components: {
    Modal
  },
  data() {
    return {
      store,
      isModalVisible: false, // Indica se il modale è visibile
      currentImages: [], // Le immagini attuali da visualizzare nel modale
    };
  },

  created() {
  console.log(this.store.Quadretti);  // Verifica se i dati sono corretti
  console.log(this.store.Creazioni3d);  // Verifica se i dati per Creazioni 3D sono corretti
},
  methods: {
    openCard(item) {
      if (item.title === "Quadretti") {
        console.log('Quadretti clicked'); 
        // Carica le immagini dei Quadretti
        this.currentImages = this.store.Quadretti;
        console.log('Loaded Quadretti images: ', this.currentImages);
      } 
      else if (item.title === "Creazioni 3D") {
        // Carica le immagini delle Creazioni 3D
        this.currentImages = this.store.Creazioni3d; 
        
      }
      else if (item.title === "FUNKO POP") {
        // Carica le immagini delle FUNKO POP
        this.currentImages = this.store.FunkoPop; 
        
      }
      else if (item.title === "Stampe realistiche") {
        // Carica le immagini delle STAMPE REALISTICHE
        this.currentImages = this.store.Stampe; 
        
      }
      // Mostra il modale
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    }
  }
};
</script>

<template>
  <div class="d-flex row" id="AppCardHome" >
    <div v-for="(item, index) in store.CardHome" :key="index" class="col-lg-3 col-md-5 col-xs-6 mb-3 d-flex" @click="openCard(item)">
      <div class="card p-3 rounded element-class">
        <i :class="[item.icon, 'animated-icon']" style="font-size: xxx-large"></i>
        <p class="mt-4">{{ item.title }}</p>
        <p style="text-align: center">{{ item.text }}</p>
      </div>
    </div>

  <!-- Modale, visualizzato quando isModalVisible è true -->
  <Modal
      :visible="isModalVisible"
      :images="currentImages"
      @close="closeModal"
    />
  </div>
</template>
  
  <style lang="scss" scoped>
  
  .card {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    height: 298px;
    width: 80%;
    flex-wrap: wrap;
    background-color: #333333;
    color: white;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    font-family: Comic Sans MS;
    cursor: pointer;
  }

  .row {
    padding-top: 180px;
    height: 80vh;
  }
  
  // Animazione icon
  @-webkit-keyframes text-shadow-pop-bottom {
    0% {
      text-shadow: 0 0 #555555;
      -webkit-transform: translateY(0);
              transform: translateY(0);
    }
    100% {
      text-shadow: 0 8px #555555;
      -webkit-transform: translateY(-8px);
              transform: translateY(-8px);
    }
  }
  
  @keyframes text-shadow-pop-bottom {
    0% {
      text-shadow: 0 0 #555555;
      transform: translateY(0);
    }
    100% {
      text-shadow: 0 8px #555555;
      transform: translateY(-8px);
    }
  }
  
  .element-class:hover .animated-icon {
    animation: text-shadow-pop-bottom 0.5s forwards;
    -webkit-animation: text-shadow-pop-bottom 0.5s forwards;
  }

  @media (max-width: 350px) {
    .row {
      padding-top: 100px;
    height: 80vh;
    }

    #AppCardHome {
      padding-left: 68px;
      margin-top: 50px;
    }

  
 }
 @media (max-width: 425px) {
    .row {
      padding-top: 100px;
    height: 80vh;
    }

    #AppCardHome {
      padding-left: 68px;
      margin-top: 50px;
    }

  
 }
  </style>
  