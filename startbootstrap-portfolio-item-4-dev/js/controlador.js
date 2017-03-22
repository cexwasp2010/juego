var palabraNumero = 1;
var ejercicio = 1;
var contador = 0;
var aciertos = 0;

var palabras = [];

function validar(palabra)
{
	 contador ++;
	if(palabra.value == document.getElementById('palabra'+palabraNumero).getAttribute('value')	){
		//cambiar el color de la palabra a verde para indicar que es correcta
		document.getElementById('palabra'+palabraNumero).style.color = '#01DF01';
		aciertos++;
		document.getElementById('score').innerHTML = aciertos;
		if(document.getElementById('totalPalabras').getAttribute('value') == palabraNumero)
		{
			siguienteEjercicio(++ejercicio);
		}else{	//aumenta la variable palabraNumero en uno y consulta la siguiente palabra de la frase
			siguientePalabra(++palabraNumero);
		}
	}else{
		document.getElementById('palabra'+palabraNumero).style.color = '#DF0101';
		setTimeout(function(){
	    	document.getElementById('palabra'+palabraNumero).style.color = '';
			palabra.style.display = "none";
			document.getElementById('palabra'+palabraNumero).innerHTML= "...";
		}, 1000);
	}
	
}

function pintar(palabra)
{
	document.getElementById('palabra'+palabraNumero).innerHTML=palabra;
}

function limpiarPalabra(palabra)
{
	document.getElementById('palabra'+palabraNumero).innerHTML="...";
}

function siguienteEjercicio(ejercicio)
{
	//Consulta a base de datos para traer las palabras del siguiente ejercicio.
	if (window.XMLHttpRequest) {
	    // code for IE7+, Firefox, Chrome, Opera, Safari
	    xmlhttp=new XMLHttpRequest();
  	} else { // code for IE6, IE5
    	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  	}
  	xmlhttp.onreadystatechange=function() {
    	if (this.readyState==4 && this.status==200) {
	     var txt = "";
	     var response = JSON.parse(this.responseText);
	        for (x in response) {
	            txt += response[x].imagen ;
	        	palabras = response[x].palabras;
	        }
	 	document.getElementById("imagenEjercicio").src = txt;
	     // 	document.getElementById("score").innerHTML=this.responseText;
	    }
	}
  	xmlhttp.open("GET","conector_pg.php?q="+1);
	xmlhttp.send();

	 /*if(ejercicio==1){
	 	document.getElementById("imagenEjercicio").src = "http://st3.depositphotos.com/10638998/14415/i/1600/depositphotos_144155583-stock-photo-senior-couple-listening-music.jpg";
		 palabras = [
		  ['They', 'He', 'She'],
		  ['are', 'is', 'is not'],
		  ['listening', 'reading', 'eating'],
		  ['to music', 'a horse', 'a car']
		];
	}else if(ejercicio==2){
		document.getElementById("imagenEjercicio").src = "https://cdn.pixabay.com/photo/2017/02/03/05/32/man-2034538_960_720.png";
		 palabras = [
		  ['He', 'She', 'They'],
		  ['is', 'are'],
		  ['running', 'looking', 'taking']
		];
	}else if(ejercicio==3){
		document.getElementById("imagenEjercicio").src = "https://cdn.pixabay.com/photo/2016/12/19/11/45/ironing-1918025_960_720.png";
		 palabras = [
		  ['She is', 'They are', 'He is'],
		  ['ironing', 'shaving', 'sweeping', 'emptying', 'yawning']
		];
	}else if(ejercicio==4){
		document.getElementById("imagenEjercicio").src = "https://cdn.pixabay.com/photo/2016/03/31/20/54/comic-characters-1296081_960_720.png";
		 palabras = [
		  ['He is', 'She is', 'They are'],
		  ['stealing', 'feeding', 'drawing', 'throwing', 'putting'],
		  ['a wallet', 'over', 'a rope', 'a dog', 'a ball']
		];
	}else{*/
 	if(ejercicio==2){
 		location.href="terminado.html";
		var contador = 0;
		var aciertos = 0;
	}
	//}
	
	palabraNumero = 1;
	var html = '';
	//Pintamos los campos de las palabras que forman la frase y le asignamos el valor correcto
	for(var i = 0; i<palabras.length; i++){
        html +=     '<div id="palabra'+(i+1)+'" value="'+palabras[i][0]+'" class="label-replace">...</div>';
	}
	document.getElementById('coincidencias').innerHTML=html;
	document.getElementById('totalPalabras').value = palabras.length;

	siguientePalabra(palabraNumero)
	//Código para traer el siguiente ejercicio
}

function siguientePalabra(numero)
{
	var html = '';
	//Pintamos los botones que hacen parte del campo que se va a comparar 
	palabras[numero-1];
	for(var i = 0; i<palabras[numero-1].length; i++){
        html +=     ' <div style="padding-right: 5px; padding-top: 14px;">'
                        +'<input type="button" class="btn btn-info" value="'+palabras[numero-1][i]+'" onmouseout="limpiarPalabra()" onmouseover="javascript:pintar(this.value);" onclick="javascript:validar(this);">'+
                    '</div>';
	}
	document.getElementById('opciones').innerHTML=html;
}
