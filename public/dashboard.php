<?php
include('testserver.php');
//$search_ailment = ($_GET["ailment"]);

                $username = "";
                $email = "";
                $user = ($_SESSION['username']);
                //$db = mysqli_connect('localhost', 'root',  '', 'presibo') or die ('Connection failed!');
               // mysql_select_db ("users");

               // 02/01/2023 $query = "SELECT * FROM `users` WHERE username = '$user'";
               // $result = mysqli_query($db, $query);
               // if (mysqli_num_rows($result) != 1);

               // while ($row = mysqli_fetch_assoc ($result)){
                 //   $patientf = $row['firstname'];
                  //  $patientl = $row ['lastname'];
                  //  $ailment  = $row['ailment'];
                   // $duration  = $row['lenght'];
                   // $prescription  = $row['pres'];
                   // $ref  = $row['id'];


                //}  

                    
                //if (isset ($_POST['search_ailment'])){
        
                 // $search_ailment = ($_POST['search']);
        
             
                //  $query = "SELECT ailment, prescription FROM `prescriptions` WHERE ailment LIKE '%$search_ailment%'";
                  //$result = mysqli_query($db, $query);
                 // if (mysqli_num_rows($result) != 1);

                //  while ($row = mysqli_fetch_assoc ($result)){
                     // $ailment  = $row['ailment'];
                      
                     // $prescription  = $row['prescription'];
                     
                      
                 // }
                //}    


            ?>


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>My Profile</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <link href="assets/img/presibo.ico" rel="icon">
  <link href="assets/img/presibo.ico" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600;1,700&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets/vendor/fontawesome-free/css/all.min.css" rel="stylesheet">
  <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
  <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">
  <link href="assets/vendor/aos/aos.css" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="assets/css/main.css" rel="stylesheet">


  <style>
  .find-link {
  
  margin: auto;
  display: block;
  left: 50%;
  text-align: center;
  cursor: pointer;
}


  .native-buttons{
    position: relative;
    display: inline-block;
    flex:right;
    margin:auto;
    top:25%;
    margin-right: 0px;
  }
    input {
      padding: 10px;
      font-size: 16px;
      border: 2px solid #0084ff;
      border-radius: 20px;
      margin-bottom: 30px;
      width: 480px;

      position: relative;
      display: block;
      margin:auto;
      top:50%;
    }

    input:required{
      

       
    }


    input:invalid{
    

       
    }

    #error{
      position: relative;
      display: block;
      color: red;
      top:50%;
      text-align: center;
      font-family: 'Trebuchet MS';
      

    }

    form {
     

      position: relative;
      display: block;
      margin:auto;
      top:50%;
    }


    .outbound{
 
 
      font-size: 16px;
 
 border: none;
 cursor: pointer;
 position: relative;
 display: block;
 margin:auto;
 top:50%;
 text-align: center;
 text-decoration: none;
    }

    #popup-window{
      display: none;
      position:fixed;
      border-radius: 20px;

      top:50%;
      left:50%;
      transform:translate(-50%, -50%);
      background-color: #fff;
      border: 1px solid #ccc;
      box-shadow: 0 0 10px #ccc;
      z-index: 9999;
      padding: 150px;
      

    }

    #popup-button{
      background-color: #0084ff;
      color: #fff;
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 20px;
      width: 230px;

      border: none;
      cursor: pointer;
      position: relative;
      display: block;
      margin:auto;
      top:50%;
    }
  
    #popup-button:target + #popup-window {
      display: block;
    }

    #close-button {
      background-color: #ff0000;
      color: #fff;
      padding: 10px 20px;
      font-size: 12px;
      border-radius: 20px;
      width: 100px;

      border: none;
      cursor: pointer;
      position: relative;
      display: block;
      margin:auto;
      top:50%;
    }
  
    .results {
      margin-top: 20px;
      font-size: 18px;
      font-weight: bold;
    }

    .decoded-value{
      display: block;
      margin:auto;
      top:50%;
    }

    .circle{
      width: 10px;
      height: 100px;
      border-radius: 50%;
      background-color: #fff;
      border: 2px solid #0084ff;
      animation: rotate 5s linear infinite;
      top:50%;
      margin:auto;
    }

    @keyframes rotate {
      from{
      transform: rotate(0deg);
      }
      to{
        transform: rotate(360deg);
      }
    }

    .circle1{
      width: 10px;
      height: 100px;
      border-radius: 50%;
      background-color: #fff;
      border: 2px solid #111111;
      animation: rotate 5s linear infinite;
    }

    @keyframes rotate {
      from{
      transform: rotate(0deg);
      }
      to{
        transform: rotate(360deg);
      }
    }

    
    .circle2{
      width: 10px;
      height: 100px;
      border-radius: 50%;
      background-color: #fff;
      border: 2px solid #ff0000;
      animation: rotate 5s linear infinite;
    }

    @keyframes rotate {
      from{
      transform: rotate(0deg);
      }
      to{
        transform: rotate(360deg);
      }
    }

    
    
    .back-button {
      
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 20px;
      width: 80px;

      border: none;
      cursor: pointer;
      position: relative;
      display: block;
      margin:0px;
      top:0%;
      outline:none;
        text-decoration: none;
        color: #131314;
        background-color: #4e4e85;
    }

     
  </style>
</head>

<body>

  <!-- ======= Header ======= -->
  <header id="header" class="header d-flex align-items-center fixed-top">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">

      <a href="index.html" class="logo d-flex align-items-center">
        <!-- Uncomment the line below if you also wish to use an image logo -->
        <!-- <img src="assets/img/logo.png" alt=""> -->
        <h1>Presibo</h1>
      </a>

      <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
      <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
      <nav id="navbar" class="navbar">
      <ul>
          <li><a href="index.html" class="active">Home</a></li>
          <li><a href="#">About</a></li>
          <li class="dropdown"><a href="#"><span>Health</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
            <ul>
              <li><a href="https://app.presibo.online/store">Consult</a></li>
                   
                  <li><a href="donate-blood">Donate Blood</a></li>
                  <li><a href="ambulance">Find Ambulance</a></li>
                  <li><a href="#">Get Doctor </a></li>
                   
                </ul>
              </li>
               
          </li>
          <li class="dropdown"><a href="#"><span>Community</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
            <ul>
              <li><a href="#">Support Groups</a></li>
              <li><a href="#">Health Club</a></li>
               
            </ul>
          </li>
          <li class="dropdown"><a href="#"><span>Store</span> <i class="bi bi-chevron-down dropdown-indicator"></i></a>
            <ul>
              <li><a href="https://app.presibo.online/store.html">Devices</a></li>
              <li><a href="https://app.presibo.online/bills.html">Medical Bills</a></li>
              <li><a href="https://app.presibo.online/store.html">Kits</a></li>

            </ul>
          </li>
        
          <li><a href="contact.php">Contact</a></li>
          <li><a href="login.html">Login</a></li>

          <li><a class="get-a-quote" href="register.html">Sign Up</a></li>
        </ul>
      </nav><!-- .navbar -->

    </div>
  </header><!-- End Header -->
  <!-- End Header -->

  <main id="main">

    <!-- ======= Breadcrumbs ======= -->
    <div class="breadcrumbs">
      <div class="page-header d-flex align-items-center" style="background-image: url('assets/img/page-header.jpg');">
        <div class="container position-relative">
          <div class="row d-flex justify-content-center">
            <div class="col-lg-6 text-center">
              <h2>My Profile</h2>
              <p></p>
            </div>
          </div>
        </div>
      </div>
      <nav>
        <div class="container">
          <ol>
            <li><a href="index.html">Home</a></li>
            <li>My Profile</li>
          </ol>
        </div>
      </nav>
    </div><!-- End Breadcrumbs -->

    <section class="sample-page">
      <div class="container" data-aos="fade-up">
      <div class = "content">

<form name = "findDocForm"  action = "docloc.php" onsubmit="return validatefindDocForm()">
<input type="text" id="query" name="ailment" placeholder = "Type of doctor needed"><br>
<span id = "error"></span>


<button id = "popup-button" type = "submit">Start</button>
<br>
<a class = "find-link" href = "register" >Find Ambulance</a>
</form>
</div>
      </div>
    </section>

    <script>

function validatefindDocForm() {
	if( document.findDocForm.ailment.value == "" ) {
  	
            var error = "Can't be empty!";
  document.getElementById("error").innerHTML = error;
  var queryfunc = document.getElementById("query");
  //queryfunc.style.display = "none";
  queryfunc.style.border = "2px solid red";

            
            
            return false;
         }
        }
</script>

<script>

function back() {
        window.location = "location.html?"
    return;

    }
  var query = document.getElementById("query").value;

//  var url = new URL(window.location);
//  var user = url.searchParams.get("user");
//  var user = decodeURIComponent("[user]");
  
var locat = decodeURIComponent(window.location.search.split('location=')[1]);

var user = decodeURIComponent(window.location.search.split('user=')[1]);
var phone = decodeURIComponent(window.location.search.split('phone=')[1]);

  
  document.getElementById("location").innerHTML = locat;
  document.getElementById("user").innerHTML = user;
  document.getElementById("phone").innerHTML = phone;



  
  //get location from url
  //var url1 = new URL(window.location);
  //var location = url1.searchParams.get("location");
  //var location = decodeURIComponent("[location]");
  
 //var location = decodeURIComponent(window.location.search.split('location=')[1]);
   //document.getElementById("location").innerHTML = location;

  var popupButton = document.getElementById("popup-button");
  var popupWindow = document.getElementById("popup-window");
  var closeButton = document.getElementById("close-button");


  popupButton.addEventListener("click",function(){
  var ailment = document.Query.value;

    window.location = 'search3.php?user=Prime1&location=Lekki&ailment='+ailment
    return;

    //var emergency = document.getElementById("query").value;
   // document.getElementById("emergency").innerHTML = emergency;

    
  //  if (popupWindow.style.display === "none"){
      //popupWindow.style.display = "none";
    //}
    
    //else{
      popupWindow.style.display = "block";
    //}
    //else{
     // popupWindow.style.display = "none";
   // }
  })


  
  closeButton.addEventListener("click",function(){
    popupWindow.style.display = "none";

  })
//function search() {
  //var query = document.getElementById("query").value;

  //var url = new URL(window.location);
  //var user = url.searchParams.get("user");
  //var user = decodeURIComponent("[user]");
  //document.getElementById("popup-window");
  //document.getElementById("decoded-value").innerHTML = user; 
  //popup-window
  //var user = decodeURIComponent(window.location.search.split('user=')[1]);

 
  // Perform login here with the provided username and password
  // if (!query) {
    //alert("Hi " + user + " Please enter a search query");
    //return;
   // document.getElementById("decoded-value").innerHTML = user; 
  // }

  
//}
</script>

  </main><!-- End #main -->

  <!-- ======= Footer ======= -->
  <footer id="footer" class="footer">

    <div class="container">
      <div class="row gy-4">
        <div class="col-lg-5 col-md-12 footer-info">
          <a href="index.html" class="logo d-flex align-items-center">
            <span>Presibo</span>
          </a>
          <p>Presibo is a digital medical service that is helping patients get affordable and quality medical care by leveraging on Artificial Intelligence.</p>
          <div class="social-links d-flex mt-4">
            <a href="https://twitter.com/presibolife" class="twitter"><i class="bi bi-twitter"></i></a>
            <a href="https://facebook.com/presibolife" class="facebook"><i class="bi bi-facebook"></i></a>
            <a href="https://instagram.com/presibolife" class="instagram"><i class="bi bi-instagram"></i></a>
            <a href="#" class="linkedin"><i class="bi bi-linkedin"></i></a>
          </div>
        </div>

        <div class="col-lg-2 col-6 footer-links">
          <h4></h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="/about">About us</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Terms of service</a></li>
            <li><a href="#">Privacy policy</a></li>
          </ul>
        </div>

        <div class="col-lg-2 col-6 footer-links">
          <h4>Our Services</h4>
          <ul>
          <li><a href="#">Hospital Management Technology</a></li>
            <li><a href="#">Laboratory Integration Service</a></li>
            <li><a href="#">Emergency Ambulance Service</a></li>
            <li><a href="#">Cloud Services</a></li>
          </ul>
        </div>

        <div class="col-lg-3 col-md-12 footer-contact text-center text-md-start">
          <h4>Contact Us</h4>
          <p>
            1b Racheal Nwangwu Close, <br>
            Lekki Phase 1, Lagos<br>
            Nigeria <br><br>
            <strong>Phone:</strong> +234 90 551 797 38<br>
            <strong>Email:</strong> info@presibo.online<br>
          </p>

        </div>

      </div>
    </div>

    <div class="container mt-4">
      <div class="copyright">
        &copy; 2023 Copyright <strong><span>Presibo</span></strong>. All Rights Reserved
      </div>
      <div class="credits">
        <!-- All the links in the footer should remain intact. -->
        <!-- You can delete the links only if you purchased the pro version. -->
        <!-- Licensing information: https://bootstrapmade.com/license/ -->
        <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/Presibo-bootstrap-Presibotics-website-template/ -->
        
      </div>
    </div>

  </footer><!-- End Footer -->
  <!-- End Footer -->

  <a href="#" class="scroll-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <div id="preloader"></div>

  <!-- Vendor JS Files -->
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/purecounter/purecounter_vanilla.js"></script>
  <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
  <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
  <script src="assets/vendor/aos/aos.js"></script>
  <script src="assets/vendor/php-email-form/validate.js"></script>

  <!-- Template Main JS File -->
  <script src="assets/js/main.js"></script>

</body>

</html>