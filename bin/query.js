var mongoose = require('mongoose');
var inquirer = require('inquirer');
var chalk = require('chalk');
var co = require('co');
var parse = require('./parse').parse;
var Schema = mongoose.Schema;
var jobPathSchema = new Schema({ job_number: String,path:String,create_time:Date});
var jobDetailSchema = new Schema({
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

module.exports.query=function(){
	inquirer
      .prompt([
        /* Pass your questions in here */
          {
            type: 'input',
            name: 'type',
            message: `${chalk.magenta(' 请输入关键字(公司名或者单号里的某个数字,eg: gem 22):')}`
          }
       
      ])
	  .then(answers => {
	  	  JobDetailModel.find({job: {$regex: answers.type, $options: '$i'}},(err,docs)=>{
	  	  	if (err) {console.log('  Warning: 非法输入')}
	  	    var n=0;
	  	  	docs.forEach(data=>{
	  	  		  n++;
	              console.log(`${chalk.green(data.job)}`)
	              console.log(`${chalk.green(data.brand_country)}`)
	              console.log(`${chalk.green(data.author)}`)
	              console.log(`${chalk.green(data.text)}`)
	              console.log(`${chalk.green('日期:'+data.create_time)}`)
	              
	              
	              if (data.additional_notes) {
	                console.log(`${chalk.bold.red(data.additional_notes)}`)
	              }
	              
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

	  })           
}