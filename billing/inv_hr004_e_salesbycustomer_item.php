<?php
include 'globalfile.php';
$xFromDate = $GLOBALS ['xInvFromDate'];
$xToDate = $GLOBALS ['xInvToDate'];
$xQryFilter = '';
$xNetQty=0;
if (isset ( $_GET ['passsalesinvoiceno'] ) && ! empty ( $_GET ['passsalesinvoiceno'] )) {
	$xSalesInvoiceNo = $_GET ['passsalesinvoiceno'];
	$xQryFilter = $xQryFilter . ' ' . "and salesinvoiceno=$xSalesInvoiceNo";
} else {
	// if($xSupplierNo!=0) { $xQryFilter= $xQryFilter. ' ' . "and supplierno=$xSupplierNo"; }
	$xQryFilter = '';
}
if (isset($_GET ['passitemno']) && !empty($_GET ['passitemno'])) {
    $xItemNo = $_GET ['passitemno'];
    $xQryFilter = $xQryFilter . ' ' . "and itemno=$xItemNo";
}
?>
<title>Consolidated-Sales</title>

<!--             ----------------------- REPORT GOES HERE  ------------------------  !-->
<div id="divToPrint">


	<div class="panel panel-primary">
		<div class="panel-heading  text-center">
			<b><?php echo "Sales Details  From[".date('d/M/y', strtotime($xFromDate))."]TO [".date('d/M/y', strtotime($xToDate))."] As On ". date("d/M/y h:i:sa"); ?></b>

		</div>
  
		<div class="panel-body">

			<div class="container">
                                          <input id="filter" type="text" class="col-xs-8"
				placeholder="Search here...">
				<!--
<p><label for="search"><strong>Enter keyword to search </strong></label><input type="text" id="search"/></p>!-->
				<table class="table table-striped  table-bordered "
					data-responsive="table">
					<thead>
						<tr>
							<th>S.No</th>
							<th>Inv.No</th>
							<th>Item Name</th>
							<th width="15%">Customer Name</th>
							<th>Qty</th>
							<th>MRP</th>
                 
							<th>Gst%</th>
							<th>Total</th>
						</tr>
					</thead>


					<tbody class="searchable">

<?php
$xQry = '';
$xSlNo = 0;
$xGrandVat = 0;
$xGrandDiscount = 0;
$xGrandTotal = 0;
$xGrandNetTotal = 0;
$xGrandProfit = 0;

$xQry = "SELECT * from inv_salesentry where salesinvoiceno>0 $xQryFilter order by salesinvoiceno,txno";

$result2 = mysql_query ( $xQry );
$rowCount = mysql_num_rows ( $result2 );

if (mysql_num_rows ( $result2 )) {
	$xGrandTotal = 0;
	while ( $row = mysql_fetch_array ( $result2 ) ) {
		$xSlNo += 1;
		finditemname( $row ['itemno'] );
                	findcustomername ( $row ['customerno'] );
		?>
<tr>
<?php
		echo '<td>' . $xSlNo . '</td>';
		echo '<td align=right>' . $row ['salesinvoiceno'] . '</td>';
		//echo '<td align=right>' . $row ['txno'] . '</td>';

		echo '<td align=left>' . $GLOBALS ['xItemName'] . '</td>';
                	echo '<td align=left>' . $GLOBALS ['xCustomerName'] . '</td>';
		//echo '<td align=left>' . $GLOBALS ['xItemDescription'] . '</td>';
		echo '<td align=right>' .$row ['qty'] . '</td>';
		echo '<td align=right>' . $row ['unitmrp'] . '</td>';
		echo '<td align=right>' . $row ['vat'] . '</td>';
                $xQtyIntoMrp=$row ['qty']*$row ['unitmrp'];
		echo '<td align=right>' . $xQtyIntoMrp . '</td>';
		$xGrandTotal += $xQtyIntoMrp;
		$xNetQty+=$row ['qty'];
                 ?>
     <td><a href="accounts_credit_note.php<?php   echo '?mrp='.$row ['unitmrp'].
                 '&batchid='.$row['batchid']. 
                 '&expdate='.$row['dateexpired'].
                 '&itemno='.$row['itemno']. 
                 '&salesqty='.$row['qty'].
                 '&salesinvoiceno='.$row['salesinvoiceno']. 
                  '&customerno='.$row['customerno'].
                 '&xmode=salesreturn';  ?>"
		onclick="return confirm_()"> 
             <img src="images/salesreturn.jpg" style="width: 30px; height: 30px; border: 0"></a></td>
             
             <?php
		echo '</tr>';
	}
	
	echo '<tr>';
	echo '<td colspan=4>Grand Total</td>';
	echo '<td align=right>' .  $xNetQty . '</td>';
		echo '<td></td>';
		echo '<td></td>';
	echo '<td align=right>' . fn_RupeeFormat ( $xGrandTotal ) . '</td>';
	echo '</tr>';
} 

else {
	fn_NoDataFound ();
}

?>	

					
					
					
					</tbody>
				</table>

			</div>
			<!-- /container -->
		</div>
	</div>
</div>
<!--             ----------------------- REPORT ENDS HERE  ------------------------  !-->
