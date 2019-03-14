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
var JobPathModel = mongoose.model('benchmark_job_path', jobPathSchema); //创建blog数据库
var JobDetailModel = mongoose.model('benchmark_job_detail', jobDetailSchema); //创建blog数据库
mongoose.connect('mongodb://localhost:27017/benchmark_job_path',{ useNewUrlParser: true } );
mongoose.connect('mongodb://localhost:27017/benchmark_job_detail',{ useNewUrlParser: true } );

module.exports={
  getData:function(){
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
                // Use user feedback for... whatever!!
                 
                 
                 JobPathModel.find({}, function (err, docs) {
                     if (err) {console.log('err')}
                     console.log(docs)
                     docs.forEach(item=>{
                       console.log(item)
                       
                       // console.log("---------------------------------------------")
                        
                            // parse(item.path).then(data=>{
                            //   var newJob = new JobDetailModel({
                            //         job: data.job,
                            //          brand_country:data.brand_country,
                            //          author:data.author,
                            //          text:data.text,
                            //          create_time:'日期:'+data.create_date,
                            //          additional_notes:data.additional_notes,
                            //          program:data.program,
                            //          supplier:data.supplier,
                            //          buyer:data.buyer,
                            //          due_date:data.due_date,
                            //          packout_date:data.packout_date,
                            //          ship_date:data.ship_date,
                            //          instore_date:data.instore_date,
                            //          status:data.status,
                            //          contact:data.contact,
                            //          job_status:data.job_status,
                            //          time:new Date().getTime()
                            //      })
                            //      newJob.save(function(err,docs){
                            //        if (err) {console.log('err')}
                            //         console.log(docs) // 
                            //      })
                              
                            //   console.log("")
                            //   console.log(`${chalk.green(data.job)}`)
                            //   console.log(`${chalk.green(data.brand_country)}`)
                            //   console.log(`${chalk.green(data.author)}`)
                            //   console.log(`${chalk.green(data.text)}`)
                            //   console.log(`${chalk.green('日期:'+data.create_date)}`)
                              
                              
                            //   if (data.additional_notes) {
                            //     console.log(`${chalk.bold.red(data.additional_notes)}`)
                            //   }
                              
                            //   console.log(`${chalk.blue(data.program)}`)
                            //   console.log(`${chalk.blue(data.supplier)}`)
                            //   console.log(`${chalk.blue(data.buyer)}`)
                            //   console.log(`${chalk.blue(data.due_date)}`)
                            //   console.log(`${chalk.blue(data.packout_date)}`)
                            //   console.log(`${chalk.blue(data.ship_date)}`)
                            //   console.log(`${chalk.blue(data.instore_date)}`)
                            //   console.log(`${chalk.blue(data.status)}`)
                              
                            //   console.log(`${chalk.green(data.contact)}`)
                              
                            //   console.log(`工单状态：${chalk.red.bold(data.job_status)}`)
                            //   console.log("")
                            //   console.log("-------------------------------------------")
                            // }).catch(err=>{
                            //   console.log(err)
                            // })

                            // co(function* () {
                            //   return yield parse(item.path)
                            // }).then(function (val) {
                            //   console.log(val);
                            // }, function (err) {
                            //   console.error(err.stack);
                            // });
                     })  
                     
                 });
     
              });
  }
}