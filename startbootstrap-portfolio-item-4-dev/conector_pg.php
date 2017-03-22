<?php
$q = intval($_GET['q']);

   $host        = "host=127.0.0.1";
   $port        = "port=5432";
   $dbname      = "dbname=juego";
   $credentials = "user=postgres password=pass123";

   $db = pg_connect("host=localhost port=5432 dbname=juego user=postgres password=123");
   if(!$db){
      echo "Error : Unable to open database\n";
   } else {
		$result = pg_query($db, "select imagen
								from frase 
								where id_frase = ".$q);
		if (!$result) {
		  echo "Ocurrió un error.\n";
		  exit;
		}else{
			$allresult['imagen'] = pg_fetch_array($result)[0];
		}
		$resultPalabra = pg_query($db, "select posicion, id_palabra, sintaxis
								from parte 
								inner join palabra as pl on (pl.parte_id = id_parte)
								where frase_id = ".$q);
		if (!$result) {
		  echo "Ocurrió un error.\n";
		  exit;
		}else{
			$allresult['palabras'] = pg_fetch_all($resultPalabra);
		}
		
		/*$result = pg_query($db, "select imagen, id_parte, id_palabra, sintaxis
								from frase 
								inner join parte as p on (p.frase_id = id_frase)
								inner join palabra as pl on (pl.parte_id = p.id_parte)
								where id_frase = ".$q);
		if (!$result) {
		  echo "Ocurrió un error.\n";
		  exit;
		}else{
			$response = pg_fetch_all($result);
		}*/
		/*while($row = pg_fetch_row($result)) $response[] = $row;
		*/
		echo json_encode($allresult);
   }
  


/*class conector_pg
{ 
	echo $$_REQUEST["q"];
	
	var $host;
	var $db;
	var $usuario;
	var $password;
	var $link;
	
	function __construct($host='127.0.0.1', $db='juego', $user='user', $pass='123')
	{
		$this->host=$host;
		$this->db=$db;
		$this->usuario=$user;
		$this->password=$pass;
	}

	function consultar($sql)
	{
		$datos_db="host='$this->host' dbname='$this->bd' user='$this->usuario' password='$this->password'";
		$link=pg_connect($datos_db);
		$this->link=$link;
		$query=pg_query($link,$sql);
		if(!$query) echo $sql;
		return $query;
	}

	function __destruct()
	{
		pg_close($this->link);
	}
}*/

?>