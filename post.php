<?php
	
	function pre($a=null){echo "<pre>";print_r($a);echo"</pre>";}
	
	if(isset($_POST["data"])){
		
		$new_string = str_replace('=', ' is ', str_replace('&', ' | ', $_POST["data"]) );
		$handle = fopen('log.txt','a+');
		fwrite($handle, date("r") . " " . $new_string . "\r");
		fclose($handle);
		
		/*
		foreach( explode("&",$_POST["data"]) as $k => $v ){
			$info = explode("=", $v);	
		}
		*/
	
		die("1");		
	}
	