var mongoose = require('mongoose');
var inquirer = require('inquirer');
var chalk = require('chalk');
var co = require('co');
var parse = require('./parse').parse;
var Schema = mongoose.Schema;
var jobPathSchema = new Schema({ job_number: String,path:String,create_time:Date});
var jobDetailSchema = new Schema({
 title:String,  	
 job: String,
 brand_country:String,
 author:String,
 text:String,
 time:Date,
 create_time:String,
 additional_notes:String,
 program:String,
 supplier:String,
 buyer:String,
 due_date:String,
 packout_date:String,
 ship_date:String,
 instore_date:String,
 status:String,
 contact:String,
 job_status:String
});
var JobDetailModel = mongoose.model('benchmark_job_detail', jobDetailSchema); //创建blog数据库
mongoose.connect('mongodb://localhost:27017/benchmark_job_detail',{ useNewUrlParser: true } );

function runDb(obj){
	  JobDetailModel.find(obj,(err,docs)=>{
	  	if (err) {console.log('  Warning: 非法输入')}
	    var n=0;
	  	docs.forEach(data=>{
	  		  n++;
	  		  var additional_info = data.title.split("任     务     单")[1];
	  		  if (additional_info) {
	  		  	console.log(`${chalk.green("任     务     单")}${chalk.red(additional_info)}`)
	  		  }else{
	  		  	console.log(`${chalk.green(data.title)}`)
	  		  }
	        console.log(`${chalk.green(data.job)}`)
	        console.log(`${chalk.green(data.brand_country)}`)
	        console.log(`${chalk.green(data.author)}`)
	        console.log(`${chalk.green(data.text)}`)
	        if (data.additional_notes) {
	          console.log(`${chalk.bold.red(data.additional_notes)}`)
	        }
	        console.log(`${chalk.green(data.create_time)}`)
	        console.log(`${chalk.blue(data.program)}`)
	        console.log(`${chalk.blue(data.supplier)}`)
	        console.log(`${chalk.blue(data.buyer)}`)
	        console.log(`${chalk.blue(data.due_date)}`)
	        console.log(`${chalk.blue(data.packout_date)}`)
	        console.log(`${chalk.blue(data.ship_date)}`)
	        console.log(`${chalk.blue(data.instore_date)}`)
	        console.log(`${chalk.blue(data.status)}`)
	        
	        console.log(`${chalk.green(data.contact)}`)
	       
	        console.log(`工单状态：${chalk.red.bold(data.job_status)}`)
	        console.log("---------------------------------------------------------------")
	  	})
	  	console.log(`共有：${chalk.blue.bold(n)} 条数据`)
	    mongoose.connection.close(); 
	  })
}
module.exports.query=function(){
	inquirer
      .prompt([
        /* Pass your questions in here */
          
          {
            type: 'rawlist',
            name: 'query',
            message: `${chalk.magenta(' 选择你的查询方式:')}`,
            choices: ['按工单号查询',"按系列,国家查询","按客人邮件查询","按做稿时间查询","按做稿人查询","按buyer、部门查询"],
            default: '按工单号查询'
          }
       
      ])
	  .then(answers => {
	  	  let obj={};
	  	  switch(answers.query){
	  	  	case "按工单号查询":
              inquirer.prompt([{
	            type: 'input',
	            name: 'type',
	            message: `${chalk.magenta(' 请输入关键字(公司名或者单号里的某个数字,eg: gem 22):')}`
              },])
              .then(answers=>{
                  // console.log("type",answers.type)
                  obj={job: {$regex: answers.type, $options: '$i'}}
                  runDb(obj)
              })
	  	  	  break;
	  	  	case "按系列,国家查询": 
	  	  	  
	          inquirer.prompt([{
		            type: 'input',
		            name: 'type',
		            message: `${chalk.magenta(' 请输入系列或国家(忽略大小写,如：hol,china):')}`
	          },])
	          .then(answers=>{
	                // console.log("type",answers.type)
                    obj={brand_country: {$regex: answers.type, $options: '$i'}}
                    runDb(obj)
	          })
	  	  	  break; 
	  	  	case "按客人邮件查询": 
	  	  	  
	          inquirer.prompt([{
		            type: 'input',
		            name: 'type',
		            message: `${chalk.magenta(' 请输入邮箱关键字(如：scott, @salesmarketingservices.com):')}`
	          },])
	          .then(answers=>{
	                // console.log("type",answers.type)
                    obj={contact: {$regex: answers.type, $options: '$i'}}
                    runDb(obj)
	          })
	  	  	  break; 
	  	  	case "按做稿时间查询": 
	  	  	  
	          inquirer.prompt([{
		            type: 'input',
		            name: 'type',
		            message: `${chalk.magenta(' 请输入模糊日期(如2019，03/):')}`
	          },])
	          .then(answers=>{
	                // console.log("type",answers.type)
                    obj={create_time: {$regex: answers.type, $options: '$i'}}
                    runDb(obj)
	          })
	  	  	  break;   
	  	  	case "按做稿人查询": 
	  	  	  
	          inquirer.prompt([{
		            type: 'input',
		            name: 'type',
		            message: `${chalk.magenta(' 请输入做稿人(如simon,scott):')}`
	          },])
	          .then(answers=>{
	                // console.log("type",answers.type)
                    obj={author: {$regex: answers.type, $options: '$i'}}
                    runDb(obj)
	          })
	  	  	  break;   
	  	  	case "按buyer、部门查询": 
	  	  	  
	          inquirer.prompt([{
		            type: 'input',
		            name: 'type',
		            message: `${chalk.magenta(' 请输入buyer或部门关键字(如kristen,18):')}`
	          },])
	          .then(answers=>{
	                // console.log("type",answers.type)
                    obj={buyer: {$regex: answers.type, $options: '$i'}}
                    runDb(obj)
	          })
	  	  	  break;         
	  	  }	  	  

	  })           
}