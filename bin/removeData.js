var mongoose = require('mongoose');
var inquirer = require('inquirer');
var chalk = require('chalk');
var Schema = mongoose.Schema;
var jobPathSchema = new Schema({ job_number: String,path:String,create_time:Date});
var JobPathModel = mongoose.model('benchmark_job_path', jobPathSchema); //创建blog数据库
mongoose.connect('mongodb://localhost:27017/benchmark_job_path',{ useNewUrlParser: true } );


module.exports={
	removeData: function(){
		JobPathModel.remove({},function(err,result){
			  if (err) return handleError(err);
		      console.log(result);
		      console.log("  删除完毕")
		      mongoose.connection.close(); 
		})
	}
}