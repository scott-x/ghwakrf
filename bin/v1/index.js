#!/usr/bin/env node
'use strict'

var chalk = require('chalk');
var inquirer = require('inquirer');

inquirer
  .prompt([
    /* Pass your questions in here */
      {
        type: 'rawlist',
        name: 'type',
        message: `${chalk.magenta(' What do you want to do?')}`,
        choices: ['query','remove job data','update job data','remove detail data','update detail data'],
        default: 'query'
      }
   
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
     switch (answers.type){
        case 'update detail data':
            require('./saveExcleData').getData()
           break;
        case 'remove detail data':
            require('./removeAllData').removeAllData()
           break;   
        case  'update job data':
            const folder = "/Volumes/datavolumn_bmkserver_Pub/新做稿";
            require('./getFilepath').readDir(folder)
           break;
        case 'remove job data':
            require('./removeData').removeData()
           break; 
        default:
            require('./query').query()
           break;      
     }

  });
