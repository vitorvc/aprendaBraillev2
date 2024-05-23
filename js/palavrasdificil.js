const db = firebase.firestore();
firebase.initializeApp(firebaseConfig);
var respostaExibida = false;
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
            const palavras = ["Pensar na morte da bezerra", "Trocar os pés pelas mãos", "O Palmeiras tem mundial sim", "Grêmio futebol porto alegrense",
             "Palmeira maior campeão brasileiro", "Internacional é popularmente conhecido como Colorado", "Muiraquitã é um dos ícones culturais em Santarém",
             "Alter do Chão é conhecido como caribe brasileiro", "A tirinha é um gênero textual", "Mônica tem um coelhinho de pelúcia", "Paçoca é o palhaço do circo aliança",
             "Braille é um sistema de escrita tátil", "A vaca Mimosa é da vovó Violeta", "Anedota é um gênero textual humorístico", "O Palmeiras é o time da virada",
             "O Palmeiras é o time do amor", "A lenda do boto cor de rosa", "música popular brasileira é um gênero musical", "Elis Regina foi uma cantora brasileira",
             "Eu sou metal raio relâmpago e trovão", "O mundo anda tão complicado", "Quero que saibas que me lembro", "Acho que estou gostando de alguém"];
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