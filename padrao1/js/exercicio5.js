const db = firebase.firestore();
firebase.initializeApp(firebaseConfig);
   
let numeroTentativas = 0;
   
   function verificarRespostas() {
       const respostasCorretas = ['4', '1', '2', '3'];
       const inputs = document.querySelectorAll('.resposta-input');
       let corretas = 0;
   
       inputs.forEach((input, index) => {
           const respostaCorreta = respostasCorretas[index];
   
           if (input.value === respostaCorreta) {
               corretas++;
           }
       });
   
       numeroTentativas++;
   
       if (corretas === inputs.length) {
           enviarDadosParaFirestore(firebase.auth().currentUser.email, numeroTentativas);
           alert('Parabéns! Respostas corretas.');
           setTimeout(() => {
            window.location.href = "../padrao2/padrao2.html";
        }, 300);
            
       } else {
           alert(`Tentativa ${numeroTentativas}: Algumas respostas estão incorretas. Tente novamente.`);
       }
   }
   
   async function enviarDadosParaFirestore(email, tentativas) {
       return new Promise((resolve, reject) => {
           db.collection(email).doc('Respostas Padrão 1').set({
               exercicio5Tentativas: tentativas,
           })
           .then(() => {
               resolve();
           })
           .catch(error => {
               console.error("Erro ao enviar dados para o Firestore: ", error);
               reject(error);
           });
       });
   }