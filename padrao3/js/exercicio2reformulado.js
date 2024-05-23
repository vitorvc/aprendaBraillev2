const db = firebase.firestore();
   firebase.initializeApp(firebaseConfig);
   
   let numeroTentativas = 0;
   
   function verificarRespostas() {
       const respostasCorretas = ['4', '3', '2', '1'];
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
           // Todas as respostas estão corretas, envie para o Firestore
           enviarDadosParaFirestore(firebase.auth().currentUser.email, numeroTentativas);
           alert('Parabéns! Respostas corretas.');
           setTimeout(() => {
            window.location.href = "./exercicio3reformulado.html";
        }, 300);
       } else {
           // Pelo menos uma resposta está incorreta, exiba uma mensagem
           alert(`Tentativa ${numeroTentativas}: Algumas respostas estão incorretas. Tente novamente.`);
       }
   }
   
   async function enviarDadosParaFirestore(email, tentativas) {
       return new Promise((resolve, reject) => {
           db.collection(email).doc('Respostas Padrão 3').update({
               exercicio2Tentativas: tentativas
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