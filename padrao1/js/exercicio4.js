const db = firebase.firestore();
firebase.initializeApp(firebaseConfig);

let numeroTentativas = 0;
const respostasCorretas = ['radar', 'raia','wafer', 'web'];

function verificar() {
    numeroTentativas++;

    const respostasSelecionadas = document.querySelectorAll('input[name="words"]:checked');

    const respostasArray = Array.from(respostasSelecionadas, checkbox => checkbox.value);

    const acertou = verificarRespostas(respostasArray);

    if (acertou) {
        enviarDadosParaFirestore(firebase.auth().currentUser.email, numeroTentativas)
            .then(() => {
                alert('Parabéns! Respostas corretas.');
                window.location.href = "./exercicio5.html";
            })
            .catch(error => console.error("Erro ao enviar dados para o Firestore: ", error));
    } else {
        alert('Tente novamente.');
        alert(`Número de tentativas: ${numeroTentativas}`);
    }

}
function verificarRespostas(respostasUsuario) {
    return JSON.stringify(respostasUsuario.sort()) === JSON.stringify(respostasCorretas.sort());
}

async function enviarDadosParaFirestore(email, tentativas) {
    return new Promise((resolve, reject) => {
        db.collection(email).doc('Respostas Padrão 1').update({
            exercicio4Tentativas: tentativas,
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