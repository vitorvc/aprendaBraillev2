var br = {
    braille: function (message) { 
        var txt = ''; 
        var myChar, prevCharNum, inQuote;
        var isFirstChar = true; // Flag para indicar se é o primeiro caractere da palavra

        function BrailleChar(bPix, bAlt) {
            return '<div class="br br-' + bPix + '" title="' + bAlt + '"></div>';
        }

        for (var i = 0; i < message.length; i++) {
            myChar = message.charAt(i);
            if ((myChar >= "a") && (myChar <= "z")) { 
                txt += BrailleChar(myChar, myChar);
                prevCharNum = false;
                isFirstChar = false; // Não é mais o primeiro caractere da palavra
            } else if ((myChar >= "A") && (myChar <= "Z")) { // A até Z
                if (isFirstChar) {
                    txt += BrailleChar("dec");
                    isFirstChar = false; // Não é mais o primeiro caractere da palavra
                }
                txt += BrailleChar(myChar, myChar);
                prevCharNum = false;
            } else if ((myChar > "0") && (myChar <= "9")) {
                if (!prevCharNum) {
                    txt += BrailleChar("num", "Number");
                } 
                txt += BrailleChar(String.fromCharCode(myChar.charCodeAt(0) + 48), myChar); 
                prevCharNum = true;
                isFirstChar = false; // Não é mais o primeiro caractere da palavra
            } else {
                switch (myChar) {
                    case " ": 
                        txt+=BrailleChar("sp", "Space");
                        prevCharNum = false;
                        isFirstChar = true; // Próximo caractere é o primeiro de uma nova palavra
                        break;
                    case "0":
                        if (!prevCharNum){
                            txt+=BrailleChar("num", "Number"); 
                        }
                        txt+=BrailleChar("j", "0");      
                        prevCharNum = true;
                        isFirstChar = false; // Não é mais o primeiro caractere da palavra
                        break;
                    case "\n":
                        txt+="<br><br>";
                        nbCharsInLine = -1;
                        prevCharNum = false;
                        isFirstChar = true; // Próximo caractere é o primeiro de uma nova palavra
                        break;
                    case ".":
                        txt+=BrailleChar("qs", "'"); //apostofre e ponto são iguais
                        prevCharNum = false;
                        break;
                    case "/":
                        txt+=BrailleChar("period", "/");//divisão
                        prevCharNum = false;
                        break;
                    case "%":
                        txt+=BrailleChar("col", "%")+BrailleChar("p", "");
                        prevCharNum = false;
                        break;
                    case "'":
                        txt+=BrailleChar("qs", "'"); //apostofre e ponto são iguais
                        prevCharNum = false;
                        break;
                    case ",":
                        txt+=BrailleChar("comma", ",");
                        prevCharNum = false;
                        break;
                    case "?":
                        txt+=BrailleChar("qu", "?"); 
                        prevCharNum = false;
                        break;

                    case "=":
                        txt+=BrailleChar("par", "="); 
                        prevCharNum = false;
                        break;
                    case "*":
                        txt+=BrailleChar("ast", "*"); //Corrigido
                        prevCharNum = false;
                        break;
                        case "-":
                        txt+=BrailleChar("hyph", "menos"); //Simbolo de menos
                        prevCharNum = false;
                        break;
                    case "//":
                        txt+=BrailleChar("sla", "//"); 
                        prevCharNum = false;
                        break;
                    case "!":
                        txt+=BrailleChar("ex", "!"); 
                        prevCharNum = false;
                        break;
                        case "+":
                            txt+=BrailleChar("ex", "!"); 
                            prevCharNum = false;
                            break;
                    case "'": 
                        if (inQuote)
                            txt+=BrailleChar("qc", "Close Quote"); 
                        else
                            txt+=BrailleChar("qo", "Open Quote");  
                        inQuote = !inQuote;
                        prevCharNum = false;
                        break;
                    case ":":
                        txt+=BrailleChar("col", ":");
                        prevCharNum = false;
                        break;
                    case ";":
                        txt+=BrailleChar("sc", ";"); 
                        prevCharNum = false;
                        break;
                    case "[":
                        txt+=BrailleChar("cap", "[")+BrailleChar("par", "");
                        break;
                    case "]":
                        txt+=BrailleChar("par", "]")+BrailleChar("qs", ""); 
                        break;
                    case "ç":
                        txt+=BrailleChar("ç");
                        prevCharNum = false;
                        break;
                        
                }
            }
        }

        return txt;
    },
}
