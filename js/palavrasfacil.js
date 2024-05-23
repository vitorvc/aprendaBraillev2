const db = firebase.firestore();
firebase.initializeApp(firebaseConfig);
var respostaExibida = false; // Variável global para controlar se a resposta já foi exibida
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
            const palavras = ["bom dia", "boa tarde", "boa noite", "boa sorte", "muito obrigado", "com licença", "por favor",
             "volte sempre", "dia feliz", "rio branco", "mar azul", "peixe dourado", "onça pintada", "laranja lima", "meia boca", "porto alegre",
             "roda gigante", "segurar vela", "planeta terra", "semana santa", "janela janelinha", "porta campainha", "dim dom", "caribe brasileiro",
             "banana prata", "banana branca", "amora preta", "amora silvestre", "laranja suco", "cereja negra", "noz vermelha", "noz comum", "ameixa brava",
             "fruta do conde", "goiaba branca", "goiaba vermelha", "jaca mole", "jaca dura", "manga rosa"];
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
            if (resposta === palavraAtual) {
                document.getElementById("brailleConteudo").innerHTML = "";
                palavraAtual = ""; // Limpa a variável que armazena a pergunta atual
        
                // Limpa a div de exibição da resposta
                document.getElementById("respostaContainer").innerHTML = "";
                
                // Define respostaExibida como false novamente
                respostaExibida = false;
                // Se a resposta estiver correta
                contCorretas++;
                atualizarContadores();
                atualizarBraille(); 
                document.getElementById("entrada").value = "";
                alert("Correto!");
                var emailUsuario = firebase.auth().currentUser.email; 
              
                enviarDadosParaFirestore(emailUsuario, contCorretas, contIncorretas);
        
                // Limpa a área de exibição da pergunta e da resposta

            } else {
                // Se a resposta estiver incorreta
                contIncorretas++;
                atualizarContadores();
                document.getElementById("entrada").value = "";
                alert("Tente novamente.");
                var emailUsuario = firebase.auth().currentUser.email; 
                enviarDadosParaFirestore(emailUsuario, contCorretas, contIncorretas);
                
            }
            
        }

        
        atualizarBraille();
        atualizarContadores(); 

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