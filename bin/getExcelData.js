var mongoose = require('mongoose');
var inquirer = require('inquirer');
var chalk = require('chalk');
var co = require('co');
var parse = require('./parse').parse;
var Schema = mongoose.Schema;
var jobPathSchema = new Schema({ job_number: String,path:String,create_time:Date});
var JobPathModel = mongoose.model('benchmark_job_path', jobPathSchema); //创建blog数据库
mongoose.connect('mongodb://localhost:27017/benchmark_job_path',{ useNewUrlParser: true } );

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
                 
                 
                 JobPathModel.find( {job_number: {$regex: answers.type, $options: '$i'}}, function (err, docs) {
                     if (err) {console.log('err')}
                     docs.forEach(item=>{
                       
                       // console.log("---------------------------------------------")
                        
                            parse(item.path).then(data=>{

                              console.log("")
                              console.log(`${chalk.green(data.job)}`)
                              console.log(`${chalk.green(data.brand_country)}`)
                              console.log(`${chalk.green(data.author)}`)
                              console.log(`${chalk.green(data.text)}`)
                              console.log(`${chalk.green('日期:'+data.create_date)}`)
                              
                              
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
                              if (data.job_status=="已结束") {
                                console.log(`工单状态：${chalk.red.bold(data.job_status)}`)
                              }
                              if (data.job_status=="进行中") {
                                console.log(`工单状态：${chalk.green.bold(data.job_status)}`)
                              }
                              if (data.job_status=="未开始") {
                                console.log(`工单状态：${chalk.bold(data.job_status)}`)
                              }
                              
                              console.log("")
                              console.log("-------------------------------------------")
                            }).catch(err=>{
                              console.log(err)
                            })

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