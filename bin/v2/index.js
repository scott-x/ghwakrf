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
        choices: ['query','update'],
        default: 'query'
      }
   
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
     switch (answers.type){
        case 'query':
            require('./query').queryData()
           break;
        case 'update':
            require('./update').updatelData()
           break;   
     }

  });
