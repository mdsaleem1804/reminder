# reminder


<?php

$xSpecialDate1  = "2020-02-15"; 
$xSpecialDate2  = "2020-01-31";
$xSpecialDate3  = "2020-02-25";

$xCurrentDate   = "2020-02-25";
$xTomorrowDate= date("Y-m-d", time() + 86400);


if ($xCurrentDate ==$xSpecialDate1) 
    CreateSMSContent("BirthDay",$xSpecialDate1,"9090909091");
if ($xCurrentDate ==$xSpecialDate2) 
    CreateSMSContent("MarriageDay",$xSpecialDate2,"9090909092");
if ($xCurrentDate ==$xSpecialDate3) 
    CreateSMSContent("Son Birth Day",$xSpecialDate3,"9090909093");
if ($xTomorrowDate ==$xSpecialDate1) 
    CreateSMSContent("BirthDay",$xSpecialDate1,"9090909091");
if ($xTomorrowDate ==$xSpecialDate2) 
    CreateSMSContent("MarriageDay",$xSpecialDate2,"9090909092");
if ($xTomorrowDate ==$xSpecialDate3) 
    CreateSMSContent("Son Birth Day",$xSpecialDate3,"9090909093");
     
function CreateSMSContent($specialdaycontent,$specialdate,$mobileno) {
    $xSpecialDayTitle=$specialdaycontent ;
    $xSmsContentToUser ="Reminder from Saibaba Temple for your ".$xSpecialDayTitle." as on " .date("d/M/Y", strtotime($specialdate));
    sendSMSToUser($xSmsContentToUser,$mobileno);
    $xSmsContentToAdmin ="Reminder for the person ".$mobileno." ".$xSpecialDayTitle." as on " .date("d/M/Y", strtotime($specialdate));
    sendSMSToAdmin($xSmsContentToAdmin,"7070707070");
?>

<?php
}

function sendSMSToUser($content,$numbers)
{
    echo $content;
}
function sendSMSToAdmin($content,$numbers)
{
     echo $content;
}
?>
