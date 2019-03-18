var xlsx = require('node-xlsx').default;
var fs = require('fs')
var path = require('path')
// Parse a buffer
// Parse a file
module.exports={
	parse:function(excle_path){

       const workSheetsFromFile = xlsx.parse(excle_path);
       const job_data=workSheetsFromFile[0].data
       var index = job_data[4].toString().indexOf("Program");
       var supplier=job_data[5].toString().replace(/找去年更新/g,'').replace(/,/g,'');
       if (supplier.substring(0,1)!=="S") {
         var num = supplier.indexOf("Supplier")
         supplier = supplier.substring(num)
       }
       var job_status;
       if (excle_path.indexOf("未开始")>0) {
         job_status="未开始..."
       }
        if (excle_path.indexOf("进行中")>0) {
         job_status="进行中..."
       }
       if (excle_path.indexOf("已结束")>0) {
         job_status="已结束"
       }
       var text=job_data[4][1];
       var buyer=job_data[6].toString().replace(/,/g,'');
       if (buyer.substring(0,4)!="Buyer") {
         var index=buyer.indexOf("Buyer")
         buyer=buyer.substring(index)
         text+=buyer.substring(0,index-1);
       }
       var program = job_data[4].toString().substring(index);
       var p_index = program.indexOf("Program")
       program = program.substring(p_index);

       console.log(job_data)
       // console.log("job_status",job_status)
       var obj={
        title:job_data[0][0],
       	job:job_data[1][1],
        brand_country: job_data[2][0]+': '+job_data[2][1],
       	create_date:job_data[4][0],
       	author:job_data[2][2]||job_data[2][3],
       	text,
       	additional_notes:job_data[5][1],
       	program:program,
       	supplier:supplier,
       	buyer,
       	due_date:job_data[7].toString().replace(/,/g,''),
       	packout_date:job_data[8].toString().replace(/,/g,''),
        job_status,
       	ship_date:job_data[9].toString().replace(/,/g,''),
        instore_date:job_data[10].toString().replace(/,/g,''),
        status:job_data[11].toString().replace(/,/g,''),
        contact:job_data[12].toString().replace(/,/g,'')
       }

       return new Promise((resolve)=>{
            resolve(obj)
       })
	}
}
