const db = firebase.firestore();
firebase.initializeApp(firebaseConfig);
var respostaExibida = false; // Variável global para controlar se a resposta já foi exibida
var dezenaAtual; 
var contCorretas = 0;
var contIncorretas = 0;

function enviarDadosParaFirestore(email, corretas, incorretas) {
    db.collection(firebase.auth().currentUser.email).doc('Respostas Centena').set({
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
    db.collection(email).doc('Respostas Centena').get()
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
        
function gerardezena() {
    var dezena = Math.floor(Math.random() * 1000);
    var dezenaFormatada = dezena.toString().padStart(3, '0');
    dezenaAtual = dezenaFormatada;
    return dezenaFormatada;
}

function exibirResposta() {
    // Verifica se a resposta já foi exibida
    if (!respostaExibida) {
        var respostaContainer = document.getElementById("respostaContainer");
        // Cria um novo elemento para a resposta
        var respostaElement = document.createElement("p");
        // Define o texto da resposta como o retorno da função gerarLetra()
        respostaElement.textContent = dezenaAtual;
        // Adiciona o elemento da resposta ao container
        respostaContainer.appendChild(respostaElement);
        
        respostaExibida = true; // Define que a resposta foi exibida
    }
}

function atualizarBraille() {
    document.getElementById("brailleConteudo").innerHTML = br.braille(gerardezena());
} 

function atualizarContadores() {
    document.getElementById("contCorretas").textContent = contCorretas;
    document.getElementById("contIncorretas").textContent = contIncorretas;
}

function verificar() {
    var resposta = document.getElementById("entrada").value;
    var emailUsuario = firebase.auth().currentUser.email; 

    if (resposta === dezenaAtual) {
        document.getElementById("brailleConteudo").innerHTML = "";
        dezenaAtual = "";
        document.getElementById("respostaContainer").innerHTML = "";
        respostaExibida = false;
        contCorretas++;
        atualizarBraille(); 
        alert("Correto!");
    } else {
        contIncorretas++;
        alert("Tente novamente.");
           
    }

    atualizarContadores();
    enviarDadosParaFirestore(emailUsuario, contCorretas, contIncorretas);
    document.getElementById("entrada").value = "";
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

function redirecionarPagina() {
    var select = document.getElementById('genero');
    var opcaoSelecionada = select.value;
    if (opcaoSelecionada === "Dezena") {
        window.location.href = "./Numerosdezena.html";
    } else if (opcaoSelecionada === "Milhar") {
        window.location.href = "./Numerosmilhar.html";
    } else if (opcaoSelecionada === "Milhão") {
        window.location.href = "./Numerosmilhao.html";
    }
}