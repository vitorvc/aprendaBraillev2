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
                    txt += BrailleChar("dec","Maiusculo");
                    isFirstChar = false; // Não é mais o primeiro caractere da palavra
                }
                txt += BrailleChar(myChar, myChar);
                prevCharNum = false;
            } else if ((myChar > "0") && (myChar <= "9")) {
                if (!prevCharNum) {
                    txt += BrailleChar("num", "Numero");
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
                        txt+=BrailleChar("ponto", "."); //apostofre e ponto são iguais
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
                    case "#":
                        txt+=BrailleChar("num", "Number")+BrailleChar("k", "#");
                        prevCharNum = false;
                        break;
                    case "'":
                        txt+=BrailleChar("ponto", "'"); //apostofre e ponto são iguais
                        prevCharNum = false;
                        break;
                    case ",":
                        txt+=BrailleChar("virgula", ",");
                        prevCharNum = false;
                        break;
                    case "":
                        txt+=BrailleChar("qu"); 
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
                        txt+=BrailleChar("menos", "-"); //Simbolo de menos
                        prevCharNum = false;
                        break;
                    case "í":
                        txt+=BrailleChar("í","í"); 
                        prevCharNum = false;
                        break;
                    case "!":
                        txt+=BrailleChar("ex", "!"); 
                        prevCharNum = false;
                        break;
                    case "+":
                        txt+=BrailleChar("ex", "+"); 
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
                        txt+=BrailleChar("doispontos", ":");
                        prevCharNum = false;
                        break;
                    case ";":
                        txt+=BrailleChar("pontoevirgula", ";"); 
                        prevCharNum = false;
                        break;
                    case "[":
                        txt+=BrailleChar("cap", "[")+BrailleChar("par", "");
                        break;
                    case "]":
                        txt+=BrailleChar("par", "]")+BrailleChar("qs", ""); 
                        break;
                    case "ç":
                        txt+=BrailleChar("ç","ç");
                        prevCharNum = false;
                        break;
                    case "é":
                        txt+=BrailleChar("é","é");
                        prevCharNum = false;
                        break;
                    case "á":
                        txt+=BrailleChar("á","á");
                        prevCharNum = false;
                        break;    
                    case "ó":
                        txt+=BrailleChar("ó","ó");
                        prevCharNum = false;
                        break;   
                    case "ú":
                        txt+=BrailleChar("ú","ú");
                        prevCharNum = false;
                        break;   
                    case "à":
                        txt+=BrailleChar("à","à");
                        prevCharNum = false;
                        break;      
                    case "â":
                        txt+=BrailleChar("â","â");
                        prevCharNum = false;
                        break;
                    case "ê":
                        txt+=BrailleChar("ê","ê");
                        prevCharNum = false;
                        break;  
                    case "ô":
                        txt+=BrailleChar("ô","ô");
                        prevCharNum = false;
                        break;    
                    case "ã":
                        txt+=BrailleChar("ã","ã");
                        prevCharNum = false;
                        break;
                    case "õ":
                        txt+=BrailleChar("õ","õ");
                        prevCharNum = false;
                        break; 
                    case "^":
                        txt+=BrailleChar("circunflexo","^");
                        prevCharNum = false;
                        break;    
                    case "?":
                        txt+=BrailleChar("interrogacao","?");
                        prevCharNum = false;
                        break;
                    case "~":
                        txt+=BrailleChar("til","~");
                        prevCharNum = false;
                        break;        
                    case "$":
                        txt+=BrailleChar("cifrao","$");
                        prevCharNum = false;
                        break;                   
                    }                  
                
                
            }
        }

        return txt;
    },
}
