const db = firebase.firestore();
firebase.initializeApp(firebaseConfig);
var respostaExibida = false; // Variável global para controlar se a resposta já foi exibida
var dezenaAtual; 
        var contCorretas = 0;
        var contIncorretas = 0;

        function enviarDadosParaFirestore(email, corretas, incorretas) {
            db.collection(firebase.auth().currentUser.email).doc('Respostas Dezena').set({
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
        
        function gerardezena() {
            var dezena = Math.floor(Math.random() * 100);
            var dezenaFormatada = dezena.toString().padStart(2, '0');
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
            if (resposta === dezenaAtual) {
                document.getElementById("brailleConteudo").innerHTML = "";
                dezenaAtual = ""; // Limpa a variável que armazena a pergunta atual
        
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
            if (opcaoSelecionada === "Dezena") {
                window.location.href = "./Numerosdezena.html";
            } else if (opcaoSelecionada === "Milhar") {
                window.location.href = "./Numerosmilhar.html";
            } else if (opcaoSelecionada === "Milhão") {
                window.location.href = "./Numerosmilhao.html";
            }
        }