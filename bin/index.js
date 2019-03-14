#!/usr/bin/env node
'use strict'
// process.title = 'sc';
// var program = require('commander');
var chalk = require('chalk');
var inquirer = require('inquirer');

// program.version(require('../package').version)
// .usage('<command> [options]');

// program
// 	.command('information')
// 	.description('get the job info of benchmark')
// 	.alias('info')
//     .action(() => {
        inquirer
          .prompt([
            /* Pass your questions in here */
              {
                type: 'rawlist',
                name: 'type',
                message: `${chalk.magenta(' What do you want to do?')}`,
                choices: ['query','update detail info','remove data','update the job data in database'],
                default: 'query'
              }
           
          ])
          .then(answers => {
            // Use user feedback for... whatever!!
             switch (answers.type){
                case 'update detail info':
                    require('./saveExcleData').getData()
                   break;
                case  'update the job data in database':
                    const folder = "/Volumes/datavolumn_bmkserver_Pub/新做稿";
                    require('./getFilepath2').readDir(folder)

                   break;
                case 'remove data':
                    require('./removeData').removeData()
                   break; 
                case 'query':
                    require('./query').query()
                   break;      
             }
 
          });
    // })       

// program.parse(process.argv)

// if(!program.args.length){
//     program.help()
// }
