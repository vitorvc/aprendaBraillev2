const db = firebase.firestore();
firebase.initializeApp(firebaseConfig);

var letraAtual;
var contCorretas = 0;
var contIncorretas = 0;



function enviarDadosParaFirestore(email, corretas, incorretas) {
    db.collection(firebase.auth().currentUser.email).doc('Respostas Alfabeto').set({
        respostasCorretas: corretas,
        respostasIncorretas: incorretas
    })
    .then(function() {
        console.log("Dados enviados para o Firestore com sucesso!");
    })
    .catch(function(error) {
        console.error("Erro ao enviar dados para o Firestore: ", error);
    });
}

function gerarLetra() {
    var alfabeto = "abcdefghijklmnopqrstuvwxyz";
    var letraAleatoria = alfabeto.charAt(Math.floor(Math.random() * alfabeto.length));
    letraAtual = letraAleatoria;
    return letraAleatoria;
}

function atualizarBraille() {
    document.getElementById("brailleConteudo").innerHTML = br.braille(gerarLetra());
}

function atualizarContadores() {
    document.getElementById("contCorretas").textContent = contCorretas;
    document.getElementById("contIncorretas").textContent = contIncorretas;
}

function verificar() {
var resposta = document.getElementById("entrada").value;
if (resposta === letraAtual) {
contCorretas++;
atualizarContadores();
atualizarBraille();
alert("Correto!");

var emailUsuario =   firebase.auth().currentUser.email; 
document.getElementById("entrada").value ='';
enviarDadosParaFirestore(emailUsuario, contCorretas, contIncorretas);
} else {
contIncorretas++;
atualizarContadores();
var emailUsuario =   firebase.auth().currentUser.email; 
alert("Tente novamente.");
enviarDadosParaFirestore(emailUsuario, contCorretas, contIncorretas);

}
document.getElementById("entrada").value ='';
}

atualizarBraille();
atualizarContadores();