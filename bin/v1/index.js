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
        choices: ['数据查询','数据管理','打开做稿','做新case'],
        default: '数据查询'
      }
   
  ])
  .then(answers => {
     switch (answers.type){
        case '数据管理':
            require('./manageData')()
           break;
        case "数据查询":
            require('./query').query()
           break;   
        case "打开做稿":
            require('./open').task()
           break;
        case "做新case":
            require('./query').query()
           break;         
     }

  });
