<?php
set_time_limit(10000);

//$target_path = "uploads/";
$target_path = "/srv/www/f1v3.net/public_html/js/uploads/";

$target_path = $target_path . basename( $_FILES['uploadedfile']['name']);
move_uploaded_file($files['tmp_name'][$i],$dirr."/".$files['name'][$i]);

if(move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $target_path)) {
    echo "The file ".  basename( $_FILES['uploadedfile']['name']). 
    " has been uploaded";
} else{
    echo "There was an error uploading the file, please try again!";
}
$b = is_writable("/srv/www/f1v3.net/public_html/js/uploads/");
echo $b;
?>