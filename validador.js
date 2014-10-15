"use strict";

var validadorDocumentos = function() {
     return {
          validarCIF: function(string) {
               var regexp = /^[A-z]([0-9]{8}|-[0-9]{8})$/i;
               var stringProcesado;
               var digitoControl;
               var pares = [];
               var impares = [];
               var A = 0, B = 0, C = 0;

               if(!regexp.test(string)) return false;

               stringProcesado = string.replace("-", "").toUpperCase().substr(1, 7);

               for(var digito in stringProcesado) {
                    (digito % 2 == 0)? impares.push(stringProcesado[digito]) : pares.push(stringProcesado[digito]);
               }

               for(var digito in pares) {
                    var numero = pares[digito];

                    if(!isNaN(numero)) {
                         A += parseInt(numero);
                    }
               }

               for(var digito in impares) {
                    var numero = impares[digito];

                    if(!isNaN(numero)) {
                         var operacion1 = numero * 2;
                         var operacion2;

                         if(operacion1 > 9) {
                              operacion2 = parseInt(operacion1.toString().substr(0, 1)) + parseInt(operacion1.toString().substr(1, 2)); 
                         }

                         else {
                              operacion2 = operacion1;
                         }

                         B += operacion2;
                    }
               }

               C = (A + B);
               C = 10 - parseInt(C.toString().substr(1, 2));

               try{
                    console.log("A", A);
                    console.log("B", B);
                    console.log("C", C);
                    console.log("CIF", string);
               }    

               catch(err){}

               if(C != string.substr(string.length - 1, string.length)) return false;

               return true;
          },

          validarNIE: function(string) {
               var regexp = /^([A-z]|[A-z]-|)[0-9]{7,8}([A-z]|-[A-z])$/i;
               var stringProcesado;
               var digitoControlInicio, digitoControlFinal, digito;
               var A = 0;
               var equivalenciaLetraInicial = {
                    X: 0,
                    Y: 1,
                    Z: 2
               };
               var tablaEquivalencia = {
                    0: "T",
                    1: "R",
                    2: "W",
                    3: "A",
                    4: "G",
                    5: "M",
                    6: "Y",
                    7: "F",
                    8: "P",
                    9: "D",
                    10: "X",
                    11: "B",
                    12: "N",
                    13: "J",
                    14: "Z",
                    15: "S",
                    16: "Q",
                    17: "V",
                    18: "H",
                    19: "L",
                    20: "C",
                    21: "K",
                    22: "E"        
               };

               if(!regexp.test(string)) return false;

               stringProcesado = string.replace("-", "").toUpperCase();
               digitoControlInicio = stringProcesado.substr(0, 1);
               digitoControlFinal = stringProcesado.substr(stringProcesado.length - 1, stringProcesado.length);

               if(isNaN(digitoControlInicio)) {
                    digitoControlInicio = equivalenciaLetraInicial[digitoControlInicio];
                    stringProcesado = digitoControlInicio + stringProcesado.substr(1, stringProcesado.length);
               }
                      
               A = parseInt(stringProcesado) % 23;
                  
               try{
                    console.log("A", tablaEquivalencia[A]);
               }

               catch(err){}

               if(digitoControlFinal.toUpperCase() != tablaEquivalencia[A]) return false;

               return true;
          }
     }
}();
