<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <!--[if lt IE 9]>
        <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->
        <title>Project Duckbuns</title>
        <link rel="stylesheet" href="style.css" />
        
    </head>
    
    <body>
    
    	<header>
        	<div id="Main_title">
        		<h1>Plan your trip</h1>
			<h2>Powered by Duckbuns.</h2>
        	</div>
        </header>
         
        <nav>
            <ul>
                <li><a href="#">Internal link 1</a></li>
                <li><a href="#">Internal link 2</a></li>
                <li><a href="#">Internal link 3</a></li>
            </ul>
        </nav>
         
        <section>
        
            <aside>
                <div id="map-canvas"/>
            </aside>
            
            <article>                
                <h1>Trip</h1>
                <p>
                	<form method="post" action="traitement.php">
                		<p>
					<div id="panel">
						<input id="target" type="text" placeholder="Search Box">
					</div>
                			<label for "loc_1">Location 1</label> : <input type="text" name="loc_1" id="loc_1"/> <label for "date_1">Date 1</label> : <input type="search" name="date_1" id="date_1"/> <br/>
                			<label for "loc_2">Location 2</label> : <input type="text" name="loc_2" id="loc_2"/> <label for "date_1">Date 2</label> : <input type="search" name="date_1" id="date_1"/> <br/>
                		</p>
                		<input type="submit" value="Search" />
                	</form>
                </p>
                
                <?php
                echo "Ceci a ete ecrit en PHP ce qui est plutot cool";
                ?>
                
                <p>
                Wow! Sounds like a fun trip!
                </p>
                
            </article>
        
        </section>
         
        <footer>
            <p>Copyright Duckbuns - All rights reserved.<br />
            <a href=#>Contact us</a></p>
        </footer>
        
        <script type="text/javascript" src=https://maps.googleapis.com/maps/api/js?key=AIzaSyASrZtcwITQWB03eKknfCefdWiX8jyYwmo&sensor=false> </script>
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places"></script>
        <script src="script.js"></script>
        
    </body>
</html>
