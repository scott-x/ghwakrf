var inquirer = require('inquirer');
var chalk = require('chalk');

function manageData(){
  inquirer
    .prompt([
      /* Pass your questions in here */
        {
          type: 'rawlist',
          name: 'operate',
          message: `${chalk.magenta(' What do you want to do?')}`,
          choices: ['remove job data','update job data','remove detail data','update detail date'],
          default: 'remove job data'
        }
     
    ])
    .then(answers => {
      // Use user feedback for... whatever!!
       switch (answers.operate){
          case 'update detail date':
              require('./saveExcleData').getData()
             break;
          case 'remove detail data':
              require('./removeAllData').removeAllData()
             break;   
          case  'update job data':
              const folder = "/Volumes/datavolumn_bmkserver_Pub/新做稿";
              require('./getFilepath').readDir(folder)
             break;
          default:
              require('./removeData').removeData()
             break;    
       }

    });
}

module.exports=manageData;