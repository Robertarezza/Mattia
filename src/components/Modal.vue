<script>
export default {
  props: {
    visible: Boolean,  // Controlla la visibilità del modale
    images: Array,     // Le immagini da visualizzare nel modale
  },
  data() {
    return {
      currentIndex: 0, // Indice dell'immagine corrente
    };
  },
  methods: {
    close() {
      this.$emit('close'); // Emetti l'evento per chiudere il modale
    },
    nextImage() {
      if (this.images.length) {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      }
    },
    prevImage() {
      if (this.images.length) {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      }
    }
  }
};
</script>


<template>
    <div v-if="visible" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <span class="close-button" @click="close">&times;</span>
        <div class="carousel">
          <div class="list">
            <!-- Ciclo sulle immagini passate come prop -->
            <div
              v-for="(image, index) in images"
              :key="index"
              class="item"
              :class="{
                active: currentIndex === index,
                previous: (currentIndex - 1 + images.length) % images.length === index,
                next: (currentIndex + 1) % images.length === index
              }"
            >
              <div class="cont-img">
                <img :src="image.img" alt="Immagine Carosello" class="immagini" />
              </div>
            </div>
          </div>
          <div class="list-text">
            <div
              v-for="(image, index) in images"
              :key="index"
              class="item-text"
              :class="{
                active: currentIndex === index,
                previous: (currentIndex - 1 + images.length) % images.length === index,
                next: (currentIndex + 1) % images.length === index
              }"
            >
              <div class="content">
                <h2 class="title">{{ image.description }}</h2>
                <p class="text">{{image.description1}}</p>
              </div>
            </div>
          </div>
          <!-- Controlli del Carosello -->
          <div class="arrows">
            <i class="fa-solid fa-circle-arrow-left prev" @click="prevImage"></i>
            <i class="fa-solid fa-circle-arrow-right next" @click="nextImage"></i>
          </div>
        </div>
      </div>
    </div>
  </template>



  <style lang="scss" scoped>
  .carousel {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.list,
.list-text {
  position: relative;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item,
.item-text {
  position: absolute;
  width: 500px;
  height: 100%;
  
  transition: all 3s cubic-bezier(0, 0, 0.2, 1);
  overflow: hidden;
  opacity: 0;
}

.cont-img {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}


.item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease, filter 0.3s ease; /* Aggiunto filtro per la transizione */
}

.item.active img {
  filter: none; /* Nessun filtro quando attivo */
}

.item.previous .content,
.item.next .content {
  opacity: 0;
}

.item.active,
.item-text.active {
  opacity: 1;
    transform: scale(1);
    z-index: 2;
    /* transition: all 0.5s ease; */
    transition-duration: 2s;
    transform-origin: right;
}

.list-text {
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-text {
  width: 500px;
  height: 100%;
  opacity: 0;
  transition: opacity 2s ease;
}

.item.previous {
  left: 58%;
  opacity: 0.8;
  transform: scale(0.5);
  z-index: 1;
}
.item.next {
  right: 58%;
  opacity: 0.5;
  transform: scale(0.5);
  z-index: 1;
}
.item-text.next,
.item-text.previous {
  opacity: 0; /* Nasconde il testo */
  transition: none; /* Nessuna transizione per mantenere nascosto */
}

.content {
  text-align: center;
  padding: 10px 105px;
}

.title {
  font-size: 1.7rem;
  color: #f15048;
  margin-bottom: 0.5rem;
  font-family: Comic Sans MS;
}

.text {
  font-size: 1rem;
  color: #f15048;
  font-family: Comic Sans MS;
}
.arrows {
  display: flex;
  justify-content: center;
  background-color: transparent;
  position: relative;
}

.arrows i {
  cursor: pointer;
  font-size: 2rem;
  //color: white;
  border-radius: 50%;
  margin: 0 5px;
  color: #f15048;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
    background: #022128;
    padding: 20px;
    border-radius: 5px;
    max-width: 90%;
    max-height: 61%;
    overflow-y: auto;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5em;
  cursor: pointer;
  color: gray
}




@media (max-width: 425px) {
    .title {
      font-size: 1rem;
  color: #f15048;
  margin-bottom: 0.5rem;
  word-wrap: break-word; /* Per andare a capo */
  max-width: 300px; /* Imposta una larghezza massima */
  white-space: normal; /* Gestione automatica dei ritorni a capo */
  font-family: Comic Sans MS;
    }
    .item img {
  width: 100%;
  height: 75%;
  object-fit: contain;
  transition: transform 0.3s ease, filter 0.3s ease; /* Aggiunto filtro per la transizione */
}
.text {
  font-size: 0.8rem;
  word-wrap: break-word; /* Per andare a capo */
  max-width: 300px; /* Imposta una larghezza massima */
  white-space: normal; /* Gestione automatica dei ritorni a capo */
  color: #f15048;
  font-family: Comic Sans MS;
}
    
  }
</style>