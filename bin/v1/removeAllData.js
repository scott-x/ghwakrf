var mongoose = require('mongoose');
var inquirer = require('inquirer');
var chalk = require('chalk');
var Schema = mongoose.Schema;

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

module.exports={
	removeAllData: function(){
		JobDetailModel.deleteMany({},function(err,result){
			  if (err) return handleError(err);
		      console.log("   删除完毕, 共删除 "+result.n+" 条数据")
		      mongoose.connection.close(); 
		})
	}
}