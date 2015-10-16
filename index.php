<!DOCTYPE html>
<?php

/* 				*\
	Ajax Test
\* 				*/

$content = 'home'; //Load by default
if(!empty($_GET['content'])){
	$tmp_content = basename($_GET['content']);
	if(file_exists("templates/{$tmp_content}.html"))
		$content = $tmp_content;
} 
$title = ucfirst($content);
?>
<html>
	<head>
		<link rel="stylesheet" href="css/style.css">
		<title><?php echo 'Ajax 2 | '.$title ?></title>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	</head>
	<body>
		<div id="wrap">
			<header role="banner">
				<h1 class="header">
					This is a website header.
				</h1>
				<nav role="navigation">
					<div class="nav">
						<a href="home" class="nav_link">Home</a>
						<a href="about" class="nav_link">About</a>
						<a href="articles" class="nav_link">Articles</a>
						<a href="contact" class="nav_link">Contact</a>
					</div>
				</nav>
			</header>
			<main role="main">
				<div class="content">
					<?php include("templates/$content.html"); ?>
				</div>
			</main>
			<footer role="contentinfo">
				<div class="footer">
					Copyright 2015.  All rights reserved.
				</div>
			</footer>
		</div>
	<!-- load javascript -->
	<script src="js/javascript.js"></script>
	</body>