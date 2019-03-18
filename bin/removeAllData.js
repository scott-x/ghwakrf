var mongoose = require('mongoose');
var inquirer = require('inquirer');
var chalk = require('chalk');
var Schema = mongoose.Schema;

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

module.exports={
	removeAllData: function(){
		JobDetailModel.remove({},function(err,result){
			  if (err) return handleError(err);
		      console.log(result);
		      console.log("  删除完毕")
		      mongoose.connection.close(); 
		})
	}
}