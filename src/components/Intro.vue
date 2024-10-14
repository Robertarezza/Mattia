<script>
export default {
    name: 'Intro',
  data() {
    return {
      fullText: 'Diamo vita alle tue idee, un livello alla volta.',
      displayText: '',
      index: 0,
      showImage: false, // Stato per gestire la visibilità dell'immagine
      showImage2: false, // Stato per la seconda immagine
    };
  },
  mounted() {
    this.typeText();
  },
  methods: {
    typeText() {
      if (this.index < this.fullText.length) {
        this.displayText += this.fullText.charAt(this.index);
        this.index++;
        setTimeout(this.typeText, 100); // Imposta il ritardo tra ogni lettera
      } else {
        // Mostra le immagini dopo che il typing è completato
        this.showImage = true; // Mostra la prima immagine
        setTimeout(() => {
          this.showImage2 = true; // Mostra la seconda immagine dopo un ritardo
        }, 500); // Ritardo di 500ms per la seconda immagine
      }
    },
  },
};
</script>

<template>
    <div class="intro" id="Intro">
   <div class="intro-text">
    <h1 class="typing">{{ displayText }}</h1>
    <p class="fade-in">Dalla progettazione alla realtà: esplora la precisione e l'arte della stampa 3D.</p>
  </div>
  <transition name="fade">
      <template v-if="showImage">
        <img :class="{ 'animated-image': true, 'show-image': showImage }" src="/src/assets/img/img2-removebg-preview.png" alt="Immagine di esempio" />
      </template>
    </transition>
    <transition name="fade">
      <template v-if="showImage2">
        <img :class="{ 'animated-image2': true, 'show-image': showImage2 }" src="/src/assets/img/Funko1.png" alt="Immagine di esempio" />
      </template>
    </transition>
</div>
  </template>

  <style scoped lang="scss">
  .intro {
  text-align: center;
}

  .intro-text {
  display: flex;
  justify-content: center; /* Centra orizzontalmente */
  align-items: center; /* Centra verticalmente */
  text-align: center;
  flex-direction: column;
  height: 100vh;
  width: 80vw;
  padding: 20px 20px; /* Padding per gestire il testo su schermi più piccoli */
  z-index: 1;
  position: relative;
  margin: 0 auto;
}

h1 {
    font-size: 5rem;
}

.typing {
  font-family: 'Courier', monospace;
  font-weight: 800;
  /*  border-right: 2px solid;*/ /* Cursore lampeggiante */
  white-space: pre-wrap;
  overflow: hidden;
  width: 0;
  animation: typing 4s steps(40, end) forwards, blink-caret 0.75s step-end 1s 6; /* Si ferma dopo un po' */
}

/* Animazione di typing */
@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}


.fade-in {
  opacity: 0;
  animation: fadeIn 2s ease-in-out 4s forwards; /* Ritarda l'entrata dopo l'effetto typing */
}

@keyframes fadeIn {
  to { opacity: 1; }
}



/* Keyframes per l'animazione di ingresso */
@keyframes fadeInScale {
  0% {
    opacity: 0; /* Inizialmente invisibile */
    transform: scale(0.7); /* Inizialmente ridotta */
  }
  100% {
    opacity: 1; /* Rendi l'immagine visibile */
    transform: scale(1); /* Ripristina la dimensione originale */
  }
}

/* Animazione dell'immagine */
.animated-image {
  max-width: 20%;
  opacity: 0;
  position: absolute; /* Per posizionare l'immagine */
  top: 100px; /* Regola la posizione verticale */
  right: 10px; /* Regola la posizione orizzontale */
  animation: fadeInScale 0.8s ease-in-out forwards; /* Utilizza i keyframes */
}

.animated-image2 {
  max-width: 20%;
  opacity: 0;
  position: absolute; /* Per posizionare l'immagine */
  top: 310px; /* Regola la posizione verticale */
  left: 5px; /* Regola la posizione orizzontale */
  animation: fadeInScale 0.8s ease-in-out forwards; /* Utilizza i keyframes */

}

/* Classe per gestire il ritardo dell'animazione */
.show-image {

  animation-delay: 1s; /* Ritardo per la prima immagine */
}

.show-image2 {

  animation-delay: 2s; /* Ritardo per la seconda immagine */
}

@media (max-width: 350px) {
    h1 {
     
      font-size: 2rem;
    }

    .intro-text {
 
  justify-content: space-evenly ;

  
}

.animated-image2{
  max-width: 40%;
  top: 350px;
}

.animated-image{
  max-width: 40%;
  top: 35px
}
 }
 @media (max-width: 425px) {
    h1 {
     
      font-size: 2rem;
    }

    .intro-text {
 
  justify-content: space-evenly ;

  
}
 }
@media (max-width: 460px) {
    h1 {
     
      font-size: 2rem;
    }

    .intro-text {
 
  justify-content: space-evenly ;

  
}
.animated-image2{
  max-width: 40%;
  top: 350px;
}

.animated-image{
  max-width: 40%;
  top: 35px
}
 }
</style>