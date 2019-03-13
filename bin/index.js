#!/usr/bin/env node
'use strict'
// process.title = 'sc';
var program = require('commander');
var chalk = require('chalk');
var inquirer = require('inquirer');

program.version(require('../package').version)
.usage('<command> [options]');

program
	.command('information')
	.description('get the job info of benchmark')
	.alias('info')
    .action(() => {
        inquirer
          .prompt([
            /* Pass your questions in here */
              {
                type: 'rawlist',
                name: 'type',
                message: `${chalk.magenta(' What do you want to do?')}`,
                choices: ['update the data','get job info'],
                default: 'update the data'
              }
           
          ])
          .then(answers => {
            // Use user feedback for... whatever!!
             switch (answers.type){
                case 'get job info':
                    require('./info').run()
                   break;
                case  'update the data':
                    const folder = "/Volumes/datavolumn_bmkserver_Pub/新做稿/未开始";
                    require('./getFilepath2').readDir(folder)
                   break;
             }
 
          });
    })       

program.parse(process.argv)

if(!program.args.length){
    program.help()
}
