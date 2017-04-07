<?php
   $db = pg_connect("host=latamdb.cizczvxkmrku.us-west-2.rds.amazonaws.com port=5432 dbname=juego user=latam password=cujhz9vpQPek5GMNCtcS");
   if(!$db){
      echo "Error : Unable to open database\n";
   } else {
		if(isset($_GET['total'])){
			$cantidadEjercicios = pg_query($db, "select count(*) from frase ");
			if (!$cantidadEjercicios) {
			  echo "Ocurrió un error en la consulta cantidad Ejercicios.\n";
			  exit;
			}else{
				$allresult['total'] = pg_fetch_array($cantidadEjercicios)[0];
			}
		}else{
   			$q = intval($_GET['q']);
			$result = pg_query($db, "select imagen
									from frase 
									where id_frase = ".$q);
			if (!$result) {
			  echo "Ocurrió un error en la consulta de la imagen.\n";
			  exit;
			}else{
				$allresult['imagen'] = pg_fetch_array($result)[0];
			}

			$resultPalabras = pg_query($db, "select posicion, id_palabra, sintaxis, tipo, (opciones - 1) AS opciones
									from parte 
									inner join palabra as pl on (pl.id_palabra = palabra_id)
									where frase_id = ".$q.
									"ORDER BY posicion ASC");
			
			
			if (!$resultPalabras) {
			  echo "Ocurrió un error en la consulta de partes.\n";
			  exit;
			}else{
				$palabrasCorrectas = pg_fetch_all($resultPalabras);
			}

			foreach ($palabrasCorrectas as $key => $palabra) {
				
				$resultPosiblesPalabras = pg_query($db, "select sintaxis
										from palabra 
										where id_palabra != ".$palabra['id_palabra']." AND tipo = ".$palabra['tipo']." 
										ORDER BY random() 
										limit ". $palabra['opciones']);

				if (!$resultPosiblesPalabras) {
				  echo "Ocurrió un error en la consulta de palabras.\n";
				  exit;
				}else{
					$arrayResult = pg_fetch_all_columns($resultPosiblesPalabras);
					array_push($arrayResult,$palabra['sintaxis']);
					shuffle($arrayResult);
					$opciones = array($palabra['sintaxis'],$arrayResult);
				}
				$allresult[$key] = $opciones;
			}
		}
		
		echo json_encode($allresult);
   }
?>