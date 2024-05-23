var br = {
    braille: function (message) { 
        // Inicialização de variáveis
        var txt = ''; // String de saída em Braille
        var myChar, prevCharNum, inQuote; // Variáveis de controle
        var isFirstChar = true; // Flag para indicar se é o primeiro caractere da palavra

        // Função para gerar na página HTML um caractere Braille específico
        function BrailleChar(bPix, bAlt) {
            return '<div class="br br-' + bPix + '" title="' + bAlt + '"></div>';
        }

        // Iteração sobre cada caractere da mensagem de entrada
        for (var i = 0; i < message.length; i++) {
            myChar = message.charAt(i); // Caractere atual

            // Verifica se o caractere é uma letra minúscula
            if ((myChar >= "a") && (myChar <= "z")) { 
                // Adiciona o caractere Braille correspondente
                txt += BrailleChar(myChar, myChar);
                prevCharNum = false; // Reseta a flag de caractere numérico
                isFirstChar = false; // Não é mais o primeiro caractere da palavra
            } else if ((myChar >= "A") && (myChar <= "Z")) { // Se é uma letra maiúscula
                if (isFirstChar) {
                    txt += BrailleChar("dec"); // Adiciona caractere que antecede a letra maiuscula
                    isFirstChar = false; // Não é mais o primeiro caractere da palavra
                }
                txt += BrailleChar(myChar, myChar); // Adiciona o caractere Braille correspondente
                prevCharNum = false; // Reseta a flag de caractere numérico
            } else if ((myChar > "0") && (myChar <= "9")) { // Se é um número
                if (!prevCharNum) {
                    txt += BrailleChar("num", "Number"); // Adiciona o caractere que antecede o número
                } 
                txt += BrailleChar(String.fromCharCode(myChar.charCodeAt(0) + 48), myChar); 
                prevCharNum = true; // Atualiza a flag de caractere numérico
                isFirstChar = false; // Não é mais o primeiro caractere
            } else { // Se não é uma letra nem número
                switch (myChar) {
                    case " ": // Espaço em branco
                        txt += BrailleChar("sp", "Space"); // Adiciona o caractere Braille correspondente para espaço
                        prevCharNum = false; // Reseta a flag de caractere numérico
                        isFirstChar = true; // Próximo caractere é o primeiro de uma nova palavra
                        break;
                    // Cada caractere tem seu próprio case dentro do switch
                    case ".":
                        txt += BrailleChar("qs", "'"); // Adiciona o caractere Braille correspondente para ponto/apóstrofe
                        prevCharNum = false; // Reseta a flag de caractere numérico
                        break;
                    // Restantes dos casos...
                }
            }
        }

        return txt; // Retorna a string em Braille resultante
    },
}