const db = firebase.firestore();
firebase.initializeApp(firebaseConfig);

var palavraAtual; 
var contCorretas = 0;
var contIncorretas = 0;

        function enviarDadosParaFirestore(email, corretas, incorretas) {
            db.collection(firebase.auth().currentUser.email).doc('Respostas Expressões').set({
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
            db.collection(email).doc('Respostas Expressões').get()
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
            const palavras = ["5*5=25", "3*3=9","1+1=2", "3-1=2","1+1=2","2*7=14","3/2=1,5","8-1=7"];
            var palavraAleatoria = palavras[Math.floor(Math.random() * palavras.length)];
            palavraAtual = palavraAleatoria;
            return palavraAleatoria;
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
        contCorretas++;
        alert("Correto!");
        atualizarBraille(); 
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