
<script >
 import axios from 'axios';

export default {
    name: 'ContactForm',
   
  data() {
    return {

      formData: {
        name: "",
        email: "",
        message: "",
      },
      showModal: false, // Modal di conferma
      loading: false,   // Stato di caricamento
      success: false,   // Stato di successo
      errorMessage: "", // Messaggio di errore
    };
  },
  methods: {
    async handleSubmit() {
      // Imposta lo stato di caricamento
      this.loading = true;
      this.errorMessage = "";

      try {
        // Invia una richiesta POST al tuo server o endpoint MailSlurp
        const response = await axios.post('server/invia-messaggio', this.formData);

        // Gestisci la risposta in caso di successo
        if (response.status === 200) {
          this.success = true;
          this.formData = { name: "", email: "", message: "" }; // Resetta il form
          this.showModal = true; // Mostra il messaggio di conferma
        } else {
          throw new Error("Qualcosa è andato storto");
        }
      } catch (error) {
        console.error("Dettagli errore:", error); // Aggiungi questo per il debug
        this.errorMessage = "Errore nell'invio del messaggio. Riprova.";
      } finally {
        // Resetta lo stato di caricamento
        this.loading = false;
      }
    },
  },
};
</script>


<template>
 <div id="ContactForm" >
    <div class="row mt-5 row_form">
    <div class="col-md-6">
      <form
        @submit.prevent="handleSubmit"
        style="
          justify-content: center;
          align-items: center;
          display: flex;
          flex-direction: column;
        "
      >
        <div class="form-control mt-3">
          <input v-model="formData.name" type="text" id="name" name="name" required />
          <label for="name">
            <span style="transition-delay: 0ms; margin-left: 10px">N</span>
            <span style="transition-delay: 50ms">o</span>
            <span style="transition-delay: 100ms">m</span>
            <span style="transition-delay: 150ms">e</span>
          </label>
        </div>
        <div class="form-control mt-3">
          <input v-model="formData.email" type="email" id="email" name="email" required />
          <label for="email">
            <span style="transition-delay: 0ms; margin-left: 10px">E</span>
            <span style="transition-delay: 50ms">m</span>
            <span style="transition-delay: 100ms">a</span>
            <span style="transition-delay: 150ms">i</span>
            <span style="transition-delay: 150ms">l</span>
          </label>
        </div>
        <div class="form-control mt-3">
          <textarea
            v-model="formData.message"
            id="message"
            name="message"
            rows="4"
            required
            style="font-size: 16px; white-space: normal; word-wrap: break-word"
          ></textarea>
          <label for="message">
            <span style="transition-delay: 0ms; margin-left: 10px">M</span>
            <span style="transition-delay: 50ms">e</span>
            <span style="transition-delay: 100ms">s</span>
            <span style="transition-delay: 150ms">s</span>
            <span style="transition-delay: 150ms">a</span>
            <span style="transition-delay: 150ms">g</span>
            <span style="transition-delay: 150ms">g</span>
            <span style="transition-delay: 150ms">i</span>
            <span style="transition-delay: 150ms">o</span>
          </label>
        </div>

        <button class="Btn" type="submit" :disabled="loading">

          <span v-if="loading" class="loading-spinner"></span>
          <svg v-else class="Layer" viewBox="0 0 1095.66 1095.63">
            <path
              class="cls-1"
              d="M1298,749.62c.4,300.41-243,548-548.1,547.9C446.23,1297.4,201.92,1051.2,202.29,749c.37-301.52,244.49-547.41,548.34-547.12C1055.43,202.18,1298.25,449.6,1298,749.62Z"
              transform="translate(-202.29 -201.89)"
            ></path>
            <path
              class="cls-2"
              d="M1285.89,749.79c-.25,297.07-241.24,535.86-536.12,535.66-296.34-.21-537-241.72-535.29-539,1.68-293.16,240.83-534.18,539.15-532.37C1046.8,215.84,1285.62,453.88,1285.89,749.79Z"
              transform="translate(-202.29 -201.89)"
            ></path>
            <path
              class="cls-3"
              d="M1195.29,749.56c.54,244.73-198.67,446.2-446.87,445.33C503.27,1194,304,994.53,304.93,748c.91-244.52,199.12-443.08,444.39-443.49C997.43,304,1195.74,505.59,1195.29,749.56Z"
              transform="translate(-202.29 -201.89)"
            ></path>
            <path
              class="cls-4"
              d="M1097.23,749.87c.22,190.31-154.42,347.43-348,346.92-192-.5-346.48-156.44-346.17-347.7C403.33,558,558.18,402,751.08,402.55,944.62,403.09,1097.69,560.56,1097.23,749.87Z"
              transform="translate(-202.29 -201.89)"
            ></path>
            <path
              class="cls-5"
              d="M1006.72,744.28c2.81,143.23-110.17,257.35-247.42,261.9C613.15,1011,498.22,895.93,493.71,758.88,488.93,613.71,603,498,740.69,493.28,886.73,488.24,1004,603.87,1006.72,744.28Z"
              transform="translate(-202.29 -201.89)"
            ></path>
            <path
              class="cls-6"
              d="M607.55,553.77c5.13,3.72,10.28,7.42,15.4,11.15l124.12,90.24a8.57,8.57,0,0,1,1.2.84c1.26,1.27,2.35,1.09,3.77,0,6.36-4.74,12.82-9.35,19.24-14l118.23-85.89c1.07-.78,2.17-1.54,3.28-2.32.82,1.1,0,2-.27,2.77Q866.29,637.48,840,718.38c-1.11,3.42-1.13,3.42,1.81,5.56l136,98.81c1.17.86,2.33,1.74,3.79,2.83-1.48.73-2.79.45-4,.45q-84.07,0-168.16,0h-.73c-3.7,0-3.68,0-4.8,3.43q-26.1,80.4-52.23,160.78c-.4,1.21-.45,2.66-1.77,3.6L735,948.24q-19.34-59.52-38.68-119c-1-3.16-1-3.17-4.6-3.17q-84.27,0-168.53,0a10.57,10.57,0,0,1-4.24-.34,13.17,13.17,0,0,1,3.33-2.77q67.55-49.08,135.1-98.18c5-3.63,4.38-1.8,2.43-7.83q-25.94-80.07-52-160.11c-.3-.91-.57-1.83-.85-2.75Z"
              transform="translate(-202.29 -201.89)"
            ></path>
          </svg>
          <p  class="text">Invia</p>
        </button>
      </form>
      <!-- Modale di Successo -->
      <div v-if="showModal" id="successModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="showModal = false">&times;</span>
          <p>Mail inviata correttamente!</p>
        </div>
      </div>
    </div>
    <!-- Colonna per il testo descrittivo -->
    <div class="col-md-6">
      <h6
        style=""
      >
        Contattaci
      </h6>
      <p style="color: white; font-size: 0.9rem; font-family: Comic Sans MS;" class=" ">
        Utilizza il nostro modulo di contatto per tutte le richieste di informazioni o
        contattaci direttamente utilizzando le informazioni di contatto sottostanti. Non
        esitare a contattarci.
      </p>

      <ul class="wrapper">
        <li class="icon facebook">
          <a
            href="https://www.facebook.com/mattia.sbravati.1?locale=it_IT"
            target="_blank"
            aria-label="Facebook"
          >
            <span class="tooltip">Facebook</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#f15048"
              height="1.2em"
              viewBox="0 0 320 512"
            >
              <path
                d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
              ></path>
            </svg>
          </a>
        </li>

        <li class="icon instagram">
          <a
            href="https://www.instagram.com/funkomatti/"
            target="_blank"
            aria-label="Instagram"
          >
            <span class="tooltip">Instagram</span>
            <svg
              viewBox="0 0 16 16"
              class="bi bi-instagram"
              fill="#f15048"
              height="1.2em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
              ></path>
            </svg>
          </a>
        </li>
      </ul>
    </div>
  </div>
 </div>
</template>

<style scoped lang="scss">
#ContactForm {
//   max-width: 600px;
  margin: 0 auto;
 // padding-top: 110px;
  height: 80vh;
  justify-content: center;
    align-content: center;
}

h6 {
  max-width: min-content; 
  font-size: 3rem; 
  color: #f15048; 
  margin-top: 20px; 
  font-family: Comic Sans MS;
}

/* Stile per l'indicatore di caricamento */
.loading-spinner {
  border: 4px solid #f3f3f3; /* Colore di sfondo */
  border-radius: 50%;
  border-top: 4px solid #3498db; /* Colore della parte animata */
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

/* Animazione per l'indicatore di caricamento */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

//modale
.modal {
  display: block; /* Mostra il modale */
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

//input
/* From Uiverse.io by liyaxu123 */
.form-control {
  position: relative;
  margin-bottom: 20px;
  width: 90%;
  background-color: transparent;
  border-top: none;
}

.form-control input {
  background-color: transparent;
  border: 0;
  border-bottom: 2px #fff solid;
  display: block;
  width: 100%;
  padding: 2px 0;
  font-size: 18px;
  color: white;
}
.form-control textarea {
  background-color: transparent;
  border: 0;
  border-bottom: 2px #fff solid;
  display: block;
  width: 100%;
  padding: 2px 0;
  font-size: 18px;
  color: white;
}

.form-control input:focus,
.form-control input:valid {
  outline: 0;
  border-bottom-color: #f15048;
}

.form-control textarea:focus,
.form-control textarea:valid {
  outline: 0;
  border-bottom-color: #f15048;
}

.form-control label {
  position: absolute;
  top: 9px;
  left: 0;
  pointer-events: none;
}

.form-control label span {
  display: inline-block;
  font-size: 18px;
  min-width: 5px;
  color: #f15048;

  -webkit-transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.form-control input:focus + label span,
.form-control input:valid + label span {
  color: #f15048;
  font-weight: bold;
  -webkit-transform: translateY(-30px);
  -ms-transform: translateY(-30px);
  transform: translateY(-30px);
}

.form-control textarea:focus + label span,
.form-control textarea:valid + label span {
  color: #f15048;
  font-weight: bold;
  -webkit-transform: translateY(-30px);
  -ms-transform: translateY(-30px);
  transform: translateY(-30px);
}

//bottone
//* From Uiverse.io by vinodjangid07 */
.Btn {
  position: relative;
  width: 180px;
  height: 50px;
  border: none;
  background-color: #005f99;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 30px;
  cursor: pointer;
  -webkit-box-shadow: 8px 8px 0px rgb(12, 12, 12);
  box-shadow: 8px 8px 0px rgb(12, 12, 12);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
}

.Layer {
  width: 60px;
  position: absolute;
  left: -30px;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-animation: spin 5s linear infinite;
  animation: spin 5s linear infinite;
}

.Btn:hover {
  -webkit-transform: translateY(5px);
  -ms-transform: translateY(5px);
  transform: translateY(5px);
  -webkit-box-shadow: 3px 3px 0px black;
  box-shadow: 3px 3px 0px black;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
}

@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.Btn:hover .Layer {
  left: 0%;
  width: 100%;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
}

.text {
  color: #f15048;
  font-weight: 600;
  font-size: 1.1em;
  position: absolute;
  margin-top: 5px;
  z-index: 2;
  -webkit-transition-duration: 0.1s;
  transition-duration: 0.1s;
  font-family: Whitney, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica,
    Arial, sans-serif;
}

.Btn:hover .text {
  color: transparent;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
}
/* svg colors */
.cls-1 {
  fill: #242021;
}

.cls-2 {
  fill: #e82728;
}

.cls-3 {
  fill: #fefefe;
}

.cls-4 {
  fill: #e92728;
}

.cls-5 {
  fill: #005f99;
}

.cls-6 {
  fill: #fff;
}
/* svg colors */

//link social

/* From Uiverse.io by escannord */
.wrapper {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  list-style: none;
  height: 120px;
  width: 100%;
  padding-top: 40px;
  font-family: "Poppins", sans-serif;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.wrapper .icon {
  position: relative;
  //background: #fff;
  z-index: 0;
  border-radius: 50%;
  margin: 10px;
  width: 50px;
  height: 50px;
  font-size: 18px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow: hidden;
  -webkit-box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  -webkit-transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .icon::after {
  content: "";
  position: absolute;
  display: inline-block;
  height: 100%;
  width: 100%;
  background-color: transparent;
  z-index: -1;
  border-radius: 50%;
  top: 100%;
}
.wrapper .icon:hover:after {
  -webkit-animation: bg-pos 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) 1 both;
  animation: bg-pos 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) 1 both;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
}

.wrapper .icon:hover {
  color: #fff;
  overflow: unset;
  -webkit-transition: color 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transition: color 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  -webkit-animation: overflow-toggle 0.7s;
  animation: overflow-toggle 0.7s;
}

.wrapper .tooltip {
  position: absolute;
  top: 0;
  font-size: 14px;
  //background: #fff;
  color: #fff;
  padding: 5px 8px;
  border-radius: 5px;
  -webkit-box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  pointer-events: none;
  -webkit-transition: all 0.3s 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transition: all 0.3s 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .tooltip::before {
  position: absolute;
  content: "";
  height: 8px;
  width: 8px;
  background: #fff;
  bottom: -3px;
  left: 50%;
  -webkit-transform: translate(-50%) rotate(45deg);
  -ms-transform: translate(-50%) rotate(45deg);
  transform: translate(-50%) rotate(45deg);
  -webkit-transition: all 0.3s 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transition: all 0.3s 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.wrapper .icon:hover .tooltip {
  top: -45px;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.wrapper .icon:hover span,
.wrapper .icon:hover .tooltip {
  text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
}
.wrapper .facebook::after {
  background-color: #1877f2;
}

.wrapper .instagram::after {
  background-color: #e4405f;
}

.wrapper .facebook:hover .tooltip,
.wrapper .facebook:hover .tooltip::before {
  background: #1877f2;
  color: #fff;
}

.wrapper .instagram:hover .tooltip,
.wrapper .instagram:hover .tooltip::before {
  background: #e4405f;
  color: #fff;
}

@-webkit-keyframes bg-pos {
  0% {
    top: 100%;
  }
  100% {
    top: 0;
  }
}

@keyframes bg-pos {
  0% {
    top: 100%;
  }
  100% {
    top: 0;
  }
}

@-webkit-keyframes overflow-toggle {
  0% {
    overflow: hidden;
  }
  100% {
    overflow: visible;
  }
}

@keyframes overflow-toggle {
  0% {
    overflow: hidden;
  }
  100% {
    overflow: visible;
  }
}
.wrapper .icon:hover svg {
  fill: #fff; /* Cambia il colore delle icone SVG all'hover */
}

/* Media query per invertire l'ordine */
@media (max-width: 768px) {
   .row {
       flex-direction: column-reverse; /* Inverti la direzione del flex */
 }

  .wrapper .facebook {
    background: #1877f2;
    color: #fff;
  }

  .wrapper .icon svg {
    fill: #fff;
  }
  .wrapper .instagram {
    background: #e4405f;
    color: #fff;
  }

  
}

@media (max-width: 425px) {
  .row {
    flex-direction: column-reverse; /* Inverti la direzione del flex */
    margin: 0 auto;
   // margin-top: -53px !important;
  }

  .wrapper .facebook {
    background: #1877f2;
    color: #fff;
  }

  .wrapper .icon svg {
    fill: #fff;
  }
  .wrapper .instagram {
    background: #e4405f;
    color: #fff;
  }
}

@media (min-width: 350px) {
   

    

    h6 {
      max-width: none;
    }

  
 }
</style>