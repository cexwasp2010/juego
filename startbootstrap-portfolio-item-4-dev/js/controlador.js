var palabraNumero = 0;
var totalEjercicios = 0;
var ejercicio = [];
var contador = 0;
var aciertos = 0;
var palabras = [];

function validar(palabra)
{
	 contador ++;
	if(palabra.value == document.getElementById('palabra'+palabraNumero).getAttribute('value')	){
		++aciertos;
		document.getElementById('score').innerHTML = ""+aciertos;
		//cambiar el color de la palabra a verde para indicar que es correcta
		document.getElementById('palabra'+palabraNumero).style.color = '#01DF01';
		if(document.getElementById('totalPalabras').getAttribute('value') == palabraNumero)
		{
			document.getElementById('opciones').style.display = 'none';
			if(ejercicio.length <= totalEjercicios){
				palabras = [];
				siguienteEjercicio();
			}else{
	 			location.href="terminado.html";
				contador = 0;
				aciertos = 0;
			}
		}else{	
			//aumenta la variable palabraNumero en uno y consulta la siguiente palabra de la frase
			siguientePalabra(++palabraNumero);
		}
	}else{
		--aciertos;
		palabra.style.display = "none";
		document.getElementById('score').innerHTML = ""+aciertos;
		document.getElementById('palabra'+palabraNumero).style.color = '#DF0101';
		setTimeout(function(){
	    	document.getElementById('palabra'+palabraNumero).style.color = '';
		}, 1000);
		document.getElementById('palabra'+palabraNumero).innerHTML= "...";
	}
	
}

function pintar(palabra)
{
	document.getElementById('palabra'+palabraNumero).innerHTML=palabra;
}

function limpiarPalabra(palabra)
{
	if(palabras.length != 0)
	document.getElementById('palabra'+palabraNumero).innerHTML="...";
}

function siguienteEjercicio()
{
	//Consulta a base de datos para traer las palabras del siguiente ejercicio.
	if (window.XMLHttpRequest) {
	    // code for IE7+, Firefox, Chrome, Opera, Safari
	    xmlhttp=new XMLHttpRequest();
  	} else { // code for IE6, IE5
    	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}
 	document.getElementById("imagenEjercicio").src = "";
  	xmlhttp.onreadystatechange=function() {
    	if (this.readyState==4 && this.status==200) {
			document.getElementById('opciones').style.display = 'block';
		    var urlimagen = "";
		    var response = JSON.parse(this.responseText);
		for (posicion in response) {
        	if(!isNaN(posicion))
        		palabras[posicion] = response[posicion];
        	else
            	urlimagen = response.imagen ;
	        }
	 	document.getElementById("imagenEjercicio").src = urlimagen;
		
		var html = '';
		//Pintamos los campos de las palabras que forman la frase y le asignamos el valor correcto
		for(var i = 0; i<palabras.length; i++){
	        html +=     '<div id="palabra'+i+'" value="'+palabras[i][0]+'" class="label-replace">...</div>';
		}
		
		document.getElementById('coincidencias').innerHTML=html;
		document.getElementById('totalPalabras').value = palabras.length-1;
    	palabraNumero = 0;
		siguientePalabra(palabraNumero)
		}
	}
	
	var siguiente = Math.floor(Math.random() * totalEjercicios );
	if(ejercicio.length == 0)
		ejercicio[siguiente] = siguiente;
	else{
		do{
			siguiente = Math.floor(Math.random() * totalEjercicios );
		}while(ejercicio.indexOf(siguiente) !=-1);
	ejercicio[siguiente] = siguiente;
	}
  	xmlhttp.open("GET","conector_pg.php?q="+siguiente);
	xmlhttp.send();
	
}
/**
* Consulta la siguiente palabra de la frase y pinta los botones opcionales
*/
function siguientePalabra(numero)
{
	var html = '';
	//Pintamos los botones que hacen parte del campo que se va a comparar 
	for(var i = 0; i<palabras[numero][1].length; i++){
        html +=     ' <div style="padding-right: 5px; padding-top: 14px; display: inline-block;">'
                        +'<input type="button" name="opcion" class="btn btn-info" value="'+palabras[numero][1][i]+'" onmouseout="limpiarPalabra()" onmouseover="javascript:pintar(this.value);" onclick="javascript:validar(this);">'+
                    '</div>';
	}
	document.getElementById('opciones').innerHTML=html;
}

$(document).ready(function(){
	if (window.XMLHttpRequest) {
	    // code for IE7+, Firefox, Chrome, Opera, Safari
	    xmlhttp=new XMLHttpRequest();
  	} else { // code for IE6, IE5
    	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}
 	document.getElementById("imagenEjercicio").src = "";
  	xmlhttp.onreadystatechange=function() {
    	if (this.readyState==4 && this.status==200) {
			var response = JSON.parse(this.responseText);
			totalEjercicios = response.total;
			siguienteEjercicio();
	 	}
	}
  	xmlhttp.open("GET","conector_pg.php?total=true");
	xmlhttp.send();
});