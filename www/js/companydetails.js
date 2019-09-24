
$(document).on("pageshow", "#detailsPage",function(event) {

 //   var serviceURL = "http://localhost:8080/JerichoDemo/company/";
    //personal-elb
   // var serviceURL = "http://JRC-LoadBalanacer.com/JerichoDemo/rest/service/company/";
    
    //TR-ELB
var serviceURL = "http://JRC-LoadBalanacer.com/JerichoDemo/rest/service/company/";
    
	var id = getUrlVars()["id"];
	$.getJSON(serviceURL + id, displayCompany);
});

function displayCompany(data) {
	var companydetail = data;
    var TotalRevenueCurrent = 0.00;
    var TotalRevenueShow = 0.00;
    var TotalRevenuePrevious = 0.00;
    var RevPercent = 0.00;
    var RevDiff = 0.00;
    
	$('#companylogo').attr('src', 'pics/' + companydetail.company.companyId +'.png');
	$('#companyName').text(companydetail.company.companyName);
	$('#companyTic').text(companydetail.company.ticker);
    $('#companySector').text(companydetail.company.businessSector);
    $('#companyRank').text("#"+companydetail.company.revenueRank + " CUSTOMER  ");
    $('#companyWebP').text(companydetail.company.website);
                    
    
    companydetail.revenue.forEach(function (revenueItem) {
        
        var revenuetable = document.getElementById("revenueTable").getElementsByTagName('tbody')[0];
        var revenuerow = revenuetable.insertRow(revenuetable.rows.length);
        var revenuecell1 = revenuerow.insertCell();
        var revenuecell2 = revenuerow.insertCell();
        var revenuecell3 = revenuerow.insertCell();
        revenuecell1.innerHTML = revenueItem.businessUnit;
        revenuecell2.innerHTML = "$ " + revenueItem.currentPeriodRevenue;
        revenuecell3.innerHTML = "$ " + revenueItem.priorPeriodRevenue;
        TotalRevenueCurrent += parseFloat(revenueItem.currentPeriodRevenue);
        TotalRevenueShow = addCommas(TotalRevenueCurrent.toFixed(2));
        $('#TotalRevenueSpan').text("$ " +TotalRevenueShow);
        TotalRevenuePrevious += parseFloat(revenueItem.priorPeriodRevenue);
        
              
         if (TotalRevenueCurrent > TotalRevenuePrevious ) {
             RevDiff = TotalRevenueCurrent - TotalRevenuePrevious;
             RevPercent = Math.floor((RevDiff/TotalRevenuePrevious) *100 )+"%";
             
             document.getElementById("TotalRevenueArrow").className = "totRarrow-up";
             $('#TotalRevenuePerc').text("UP " + RevPercent );             
         }
        else{
            RevDiff = TotalRevenuePrevious - TotalRevenueCurrent;
            RevPercent = Math.floor((RevDiff/TotalRevenuePrevious) *100 )+"%";
            
            document.getElementById("TotalRevenueArrow").className = "totRarrow-down";
            $('#TotalRevenuePerc').text("DOWN " + RevPercent );
        }
    });
    
     companydetail.productRecomendations.forEach(function (productItem) {
        
        var prdtRcmdtable = document.getElementById("prdtRcmd").getElementsByTagName('tbody')[0];
        var prdtrow = prdtRcmdtable.insertRow(prdtRcmdtable.rows.length);
        var prdtcell1 = prdtrow.insertCell();
        var prdtcell2 = prdtrow.insertCell();

        prdtcell1.innerHTML = productItem.businessUnit;
        prdtcell2.innerHTML = productItem.productName;
               
    });
    
    companydetail.topProducts.forEach(function (topPrdtItem) {
        
        var topPrdttable = document.getElementById("topPrdt").getElementsByTagName('tbody')[0];
        var topPrdtrow = topPrdttable.insertRow(topPrdttable.rows.length);
        var topPrdtcell1 = topPrdtrow.insertCell();
        var topPrdtcell2 = topPrdtrow.insertCell();
        var topPrdtcell3 = topPrdtrow.insertCell();

        topPrdtcell1.innerHTML = topPrdtItem.businessUnit;
        topPrdtcell2.innerHTML = topPrdtItem.revenueRank;
        
        if (Number(topPrdtItem.currentPeriodRevenue) > Number(topPrdtItem.priorPeriodRevenue) ) {
            topPrdtcell3.innerHTML = '<center><p style="align:center" class="arrow-up"></p></center>';
        }
        else{
            topPrdtcell3.innerHTML = '<center><p style="align:center" class="arrow-down"></p></center>';
        }
        
       //  topPrdtcell3.innerHTML = '<i class="fa fa-arrow-up" style="font-size:24px;color:green"></i>';
        
    });
    
}

function addCommas(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

