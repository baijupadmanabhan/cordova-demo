
//var serviceURL = "http://54.209.32.17/Company/rest/service/companylist";
//var serviceURL = "http://localhost:8080/JerichoDemo/companylist";

    //personal-elb
//var serviceURL = "http://JRC-LoadBalanacer-747823579.us-east-1.elb.amazonaws.com/JerichoDemo/rest/service/companylist";

    //TR-ELB
var serviceURL = "http://EBS-TCS-Jericho-POC-Loadbalancer-442275777.us-west-2.elb.amazonaws.com/JerichoDemo/rest/service/companylist";


var obj;

$('#companyListPage').bind('pageinit', function(event) {
	getCompanyList();
});

function getCompanyList() {
    
	$.getJSON(serviceURL , function(data) {
		//console.log(data);
		$('#companyList li').remove();
		obj = data;
         
		$.each(obj.companies, function(index, company) {
			            
            $('#companyList').append('<li><a href="companydetails.html?id=' + company.permId + '"><img style="position:absolute; left:20px; TOP:15px" data-name=' + company.companyName + ' class="profile" class="img-circle"/>' + 
					'<h4 style="position:absolute; TOP:9px" >' + company.companyName + '</h4>' +
					'<p style="position:absolute; TOP:31px">' + company.businessSector +  '</p>' +
					'<p style="position:absolute; TOP:45px">#' + company.revenueRank +  '</p></a></li>');
            
            $('.profile').initial({
                                        charCount: 1, 
                                        textColor: '#ffffff', 
                                        seed: 16, 
                                        height: 50,
                                        width: 50,
                                        fontSize: 30,
                                        fontWeight: 100,
                                        fontFamily: 'HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica, Arial,Lucida Grande, sans-serif',
                                        radius: 80
                                });
            
		});
       
		$('#companyList').listview('refresh');
	});
}