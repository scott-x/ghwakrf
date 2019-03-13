var fs = require("fs")
var parse = require('./parse').parse;
function parsePath(filePath){
   var index = filePath.indexOf(' ');
   while(index>-1){
      filePath = filePath.substring(0,index)+'\\'+filePath.substring(index);
      index = filePath.indexOf(' ',index+2);
   }
   return filePath;
}

function readDir(path){
    fs.readdir(path,function(err,menu){    
        if(!menu)
            return;
        menu.forEach(function(ele){    
            fs.stat(path+"/"+ele,function(err,info){
                if(info.isDirectory()){
                    // console.log("dir: "+ele)
                    readDir(path+"/"+ele);
                }else{
                    // console.log("file: "+ele)
                    const patt=/DetailList_W/g
                    const result = patt.test(ele) && ele.substring(0,1)!=='.' && ele.substring(0,1)!=='~';
                    if (result) {
                        
                        var newPath = parsePath(path)+'/'+ele;
                        console.log(newPath)
                        //save path into database

                        
                        // parse(newPath).then(data=>{
                        //     console.log(data)
                        // })
                       
                        // require('./parse').parse("/Volumes/datavolumn_bmkserver_Pub/新做稿/未开始/B190306_LNC\ 做稿/B190306_LNC_DetailList_W.xls")

                    }
                }    
            })
        })            
    })
}

module.exports={
   readDir:readDir
}
