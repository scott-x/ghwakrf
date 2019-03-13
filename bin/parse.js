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
       var obj={
       	job:job_data[1][1],
       	create_date:job_data[4][0],
       	author:job_data[2][2]||job_data[2][3],
       	text:job_data[4][1],
       	additional_notes:job_data[5][1],
       	program:job_data[4].toString().substring(index),
       	supplier:supplier,
       	buyer:job_data[6].toString().replace(/,/g,''),
       	due_date:job_data[7].toString().replace(/,/g,''),
       	packout_date:job_data[8].toString().replace(/,/g,''),
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