const db = firebase.firestore();
firebase.initializeApp(firebaseConfig);

var palavraAtual; 
        var contCorretas = 0;
        var contIncorretas = 0;

        function enviarDadosParaFirestore(email, corretas, incorretas) {
            db.collection(firebase.auth().currentUser.email).doc('Respostas Palavras').set({
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
            const palavras = ["cachorro", "gato", "passaro", "computador", "cafe", "felicidade", "sorvete", "bicicleta", "amizade", "praia", "montanha", "livro", "musica", "escola", "trabalho", "viagem", "familia", "natureza", "sonho"];
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
    if (resposta === palavraAtual) {//
        contCorretas++;
        atualizarContadores();
        atualizarBraille(); 
        alert("Correto!");

        var emailUsuario =   firebase.auth().currentUser.email; 
        document.getElementById("entrada").value = "";
        enviarDadosParaFirestore(emailUsuario, contCorretas, contIncorretas);
    } else {
        contIncorretas++;
        atualizarContadores();
        var emailUsuario =   firebase.auth().currentUser.email; 
        enviarDadosParaFirestore(emailUsuario, contCorretas, contIncorretas);
        alert("Tente novamente.");
    }
    document.getElementById("entrada").value = "";

}

        
        atualizarBraille();
        atualizarContadores(); 