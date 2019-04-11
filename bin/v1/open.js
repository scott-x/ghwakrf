var mongoose = require('mongoose');
var inquirer = require('inquirer');
var chalk = require('chalk');
var Schema = mongoose.Schema;
var jobPathSchema = new Schema({ job_number: String,path:String,create_time:Date});
var JobPathModel = mongoose.model('benchmark_job_path', jobPathSchema); //创建blog数据库
mongoose.connect('mongodb://localhost:27017/benchmark_job_path',{ useNewUrlParser: true } );
const { exec_cmd } = require('slimz');

function task(){
	inquirer
	.prompt([
	  /* Pass your questions in here */
	    {
	      type: 'input',
	      name: 'job',
	      message: `${chalk.magenta(' 请输入工单号，eg 190382:')}`
	    }
	 
	])
	.then(answers => {
	   let patt = /1[89][01][0-9][0-9a-zA-Z][0-9]/
	   if (patt.test(answers.job)) {
	      open(answers.job)
	   }else{
	      console.log('请输入正确的工单号')
	   }
	   
	}); 
}

async function open(job){
	let result= await find(JobPathModel,{path: {$regex: job, $options: '$i'}},-1)
	let index= result[0].path.lastIndexOf('/')
	let newPath = result[0].path.substring(0,(index-3))+"\\"+' 做稿'
	exec_cmd("open "+newPath.trim(),()=>{})
}

function find(Model,query_obj,sort){
   if (sort=='undefined'|| sort==-1) {
     sort=-1
   }else{
     sort=1
   }
   const promise = new Promise((resolve,reject)=>{
     Model.find(query_obj).sort({_id:sort})
    .exec((err,doc)=>{
      if (err) return console.log(err)
      resolve(doc)  
    });
   }) 
   return promise;
}


module.exports={
   task
}