<?php
include 'globalfile.php';
$GLOBALS ['xStockNo']='';
$GLOBALS ['xMrp']='';
$GLOBALS ['xPRate']='';
$GLOBALS ['xDate']='';
$GLOBALS ['xQty'] ='';
$GLOBALS ['xReason'] ='';

$xFromDate = $GLOBALS ['xInvFromDate'];
$xToDate = $GLOBALS ['xInvToDate'];
if (isset ( $_GET ['stockno'] ) && ! empty ( $_GET ['stockno'] )) {
	$no = $_GET ['stockno'];
	if ($_GET ['xmode'] == 'edit') {
		$GLOBALS ['xMode'] = 'F';
		DataFetch ( $_GET ['stockno'] );
	}
}
if (isset ( $_POST ['update'] )) {
	DataProcess ( "U" );
} 
function DataFetch($xNo) {
	$result = mysql_query ( "SELECT *  FROM inv_stockentry where stockno=$xNo" ) or die ( mysql_error () );
	$count = mysql_num_rows ( $result );
	if ($count > 0) {
		while ( $row = mysql_fetch_array ( $result ) ) {
			
			$GLOBALS ['xStockNo'] = $row ['stockno'];
			$GLOBALS ['xMrp'] = $row ['mrp'];
			$GLOBALS ['xPRate']= $row ['maxstock'];
			$GLOBALS ['xItemNo']= $row ['itemno'];
		}
	}
}
function fn_FindCurrentStock($xItemNo) {
	$xCurrentStock = '';
	$xQry = "select stock from inv_stockentry where  itemno=$xItemNo";
	$result = mysql_query ( $xQry ) or die ( mysql_error () );
	while ( $row = mysql_fetch_array ( $result ) ) {
		$xCurrentStock = $row ['stock'];
	}
	return $xCurrentStock;
}
function fn_FindItemOriginalPrice($xItemNo) {
	$xOriginalPrice	 = 0;
	$xQry = "select originalprice from inv_purchaseentry where  itemno=$xItemNo";
	$result = mysql_query ( $xQry ) or die ( mysql_error () );
	while ( $row = mysql_fetch_array ( $result ) ) {
		$xOriginalPrice = $row ['originalprice'];
	}
	return $xOriginalPrice;
}

function DataProcess($mode) {
	$xStockNo = $_POST ['f_stockno'];
	$xMrp =  $_POST ['f_mrp'];
	$xItemNo=  $_POST ['f_itemno'];
	$xQty =  $_POST ['f_qty'];
		$xReason =  $_POST ['f_reason'];
	$xQry = "";
	$xMsg = "";
	if ($mode == 'S') {
	} elseif ($mode == 'U') {
		$xQry = "UPDATE inv_stockentry   SET mrp='$xMrp',stock=stock+$xQty WHERE stockno=$xStockNo";
		echo '<script type="text/javascript">swal("Good job!", "Updated!", "success");</script>';
		$xQty=$xQty+0;
		$xQry1 ="insert into inv_stockentry_logs (itemno,qty,reason) values($xItemNo,$xQty,'$xReason')";
	}
	//echo $xQry;
	mysql_query ( $xQry) or die ( mysql_error () );
	 mysql_query ($xQry1) or die ( mysql_error () );
	
	header ( 'Location: inv_hr002_e_batch_stock.php' );
}
?>
<html>
<head>
<?php include 'title.php'?>
<script type="text/javascript">
$(document).ready(function () {
    (function ($) {
        $('#filter').keyup(function () {
            var rex = new RegExp($(this).val(), 'i');
            $('.searchable tr').hide();
            $('.searchable tr').filter(function () {
                return rex.test($(this).text());
            }).show();
        })
    }(jQuery));
});
</script>
</head>
<body>

	<form class="form" name="itemcategoryform"
		action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
	<div id="divToPrint">
		<div class="panel panel-primary">
			<div class="panel-body">
				<div class="container">
		
				 <div class="row">
				 <h1>PRICE MODIFICATION</h1>
    <div class="col-xs-2" style="display:none">
	<label> STOCKNO</label> <input type="text" class="form-control"
								id="f_stockno" name="f_stockno"
								value="<?php echo $GLOBALS ['xStockNo']; ?>" readonly >
								</div>
								

	<div class="col-xs-4">
	<label> MRP</label> <input type="text" class="form-control"
								id="f_mrp" name="f_mrp"
								value="<?php echo $GLOBALS ['xMrp']; ?>" >
								
								</div>
  </div>
		  

                        <div class="row" >
                      
                            <div class="col-xs-2" style="display:none">
                            <label>Date </label>
                                <input type="date" class="form-control" name="f_date"  required readonly
                                       value="<?php echo $GLOBALS ['xCurrentDate'] ; ?>">
                            </div>	
           
                   
                   <div class="col-xs-3">
                                <label>Item Name:</label> <select class="form-control" 
                                                                  name="f_itemno" readonly>
                                    <option value="0">Choose Item</option>
                                    <?php
                                    $result = mysql_query("SELECT *  FROM m_item  where itemno in(select itemno from inv_stockentry where stock>0) order by itemname");
                                    while ($row = mysql_fetch_array($result)) {
                                        ?>
                                        <option value="<?php echo $row['itemno']; ?>"
                                        <?php
                                        if ($row ['itemno'] == $GLOBALS ['xItemNo']) {
                                            echo 'selected="selected"';
                                        }
                                        ?>>
                                                     <?php echo $row['itemname'] ?>
                                        </option>
                                        <?php
                                    }
                                    ?>
                                </select>

                            </div>
            <div class="col-xs-5" >
                             <label>Reason </label>
                                <input type="text" class="form-control" name="f_reason" required
										value="<?php echo $GLOBALS ['xReason']; ?>">
                            </div>	
                            <div class="col-xs-2" >
                            <label>Qty </label>
                                <input type="text" class="form-control" name="f_qty" required
										value="<?php echo $GLOBALS ['xQty']; ?>">
                            </div>	
								
                 
                             

                       <div class="col-xs-2" >
                     <label></label>
 <input type="submit" name="update" class="btn btn-primary"
									value="UPDATE"  accesskey="s"> 
                            </div>	
                        </div>  


    </form>		

					
<?php
$xSlNo = 0;	
$xQry = "select s.itemno,s.stock,s.mrp,s.batch,s.expdate,s.stockno,s.maxstock from inv_stockentry as s,m_item as i where i.itemno=s.itemno  and s.stock>0 order by i.itemname";
$result2 = mysql_query ( $xQry );
?>
</br></br></br>
	<div class="col-xs-8">
	<input id="filter" type="text" class="col-xs-8"
						placeholder="Search here...">
	</div>
<table class="table table-hover" border="1" width="100%">
						<thead>
							<tr>
			<th width="5%">S.No</th>
								
								<th width="45%">ItemName</th>
								<th width="10%">Stock</th>
							
                               <th width="10%">SalePrice</th>
								<th width="10%">BATCH</th>
                      
								
								
							</tr>
						</thead>

						<tbody class="searchable">
<?php
$xGrandTotal=0;
while ( $row = mysql_fetch_array ( $result2 ) ) {
	echo '<tr>';
	finditemname ( $row ['itemno'] );
	$xSlNo +=1;
        $xMrp=$row ['mrp'];
        
        $xStock=$row ['stock'];
 
        echo '<td>' . $xSlNo . '</td>';
	echo '<td>' . $GLOBALS ['xItemName'] . '</td>';
	echo '<td>' . $xStock . '</td>';  

	echo '<td>' . $xMrp. '</td>';
	echo '<td>' . $row ['batch'] . '</td>';

		?>
		
<td><a
							href="inv_hr002_e_batch_stock.php<?php echo '?stockno='.$row['stockno'] . '&xmode=edit'; ?>"
							onclick="return confirm_edit()"> <img src="images/edit.png"
								alt="HTML tutorial" style="width: 30px; height: 30px; border: 0">
						</a></td>
						<?php
	echo '</tr>';    
	
}

	
?>	

</tbody>
					</table>
					
					
					
				</div>
				<!-- /container -->
			</div>
		</div>
	</div>
</body>
</html>
