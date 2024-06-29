const db = firebase.firestore();
firebase.initializeApp(firebaseConfig);

var letraAtual;
var contCorretas = 0;
var contIncorretas = 0;

function enviarDadosParaFirestore(email, corretas, incorretas) {
    db.collection(firebase.auth().currentUser.email).doc('Respostas Numeros').set({
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

function recuperarDadosDoFirestore(email) {
    db.collection(email).doc('Respostas Numeros').get()
    .then(function(doc) {
        if (doc.exists) {
            contCorretas = doc.data().respostasCorretas || 0;
            contIncorretas = doc.data().respostasIncorretas || 0;
            atualizarContadores();
        } else {
            console.log("Nenhum dado encontrado!");
        }
    })
    .catch(function(error) {
        console.error("Erro ao recuperar dados do Firestore: ", error);
    });
}

function gerarLetra() {
    var alfabeto = "1234567890";
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
    var emailUsuario = firebase.auth().currentUser.email; 

    if (resposta === letraAtual) {
        contCorretas++;
        alert("Correto!");
        atualizarBraille();
    } else {
        contIncorretas++;
        alert("Tente novamente.");
    }

    atualizarContadores();
    enviarDadosParaFirestore(emailUsuario, contCorretas, contIncorretas);
    document.getElementById("entrada").value = '';
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var emailUsuario = user.email;
        recuperarDadosDoFirestore(emailUsuario);
    } else {
        console.log("Nenhum usuário autenticado.");
    }
});

atualizarBraille();