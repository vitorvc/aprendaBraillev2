const db = firebase.firestore();
firebase.initializeApp(firebaseConfig);
var respostaExibida = false; // Variável global para controlar se a resposta já foi exibida
var palavraAtual; 
var contCorretas = 0;
var contIncorretas = 0;

function enviarDadosParaFirestore(email, corretas, incorretas) {
    db.collection(firebase.auth().currentUser.email).doc('Resposta Palavras Medio').set({
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
    db.collection(email).doc('Resposta Palavras Medio').get()
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
    const palavras = ["Braille é um sistema", "o pato mora no lago", "o sapo mora no mato", "o cravo brigou com a rosa",
    "o macaco subiu no telhado", "a bola caiu no mato", "a galinha botou um ovo","a janela está fechada", "o dente do menino caiu",
    "o rato fugiu do gato", "o pato nada na lagoa", "o menino foi para escola", "a zebra é listada", "o papai foi trabalhar",
    "a pipoca pula na panela", "Maria come abacaxi", "Abelha coloca mel", "Mariana comeu jujuba", "o peixe nada rápido", "o menino joga bola", 
    "Alice ganhou presente", "Gramado natal luz", "Eu gosto de café", "Caixa de ferramenta inox", "Vamos todos cantar", "Rio Grande do Sul",
    "Habilidade de negociar", "Ubuntu é software livre", "Windows é software privado", "Faça um intervalo"];
    var palavraAleatoria = palavras[Math.floor(Math.random() * palavras.length)];
    palavraAtual = palavraAleatoria;
    return palavraAleatoria;
}

function exibirResposta() {
    // Verifica se a resposta já foi exibida
    if (!respostaExibida) {
        var respostaContainer = document.getElementById("respostaContainer");
        // Cria um novo elemento para a resposta
        var respostaElement = document.createElement("p");
        // Define o texto da resposta como o retorno da função gerarLetra()
        respostaElement.textContent = palavraAtual;
        // Adiciona o elemento da resposta ao container
        respostaContainer.appendChild(respostaElement);
        respostaExibida = true; // Define que a resposta foi exibida
    }
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

    if (resposta === palavraAtual) {
        document.getElementById("brailleConteudo").innerHTML = "";
        palavraAtual = "";
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
    
    if (opcaoSelecionada === "facil") {
        window.location.href = "./palavrasfacil.html";
    } else if (opcaoSelecionada === "medio") {
        window.location.href = "./palavrasmedio.html";
    } else if (opcaoSelecionada === "dificil") {
        window.location.href = "./palavrasdificil.html";
    }
}