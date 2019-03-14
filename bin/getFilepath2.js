var fs = require("fs");
var parse = require('./parse').parse;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var jobPathSchema = new Schema({ job_number: String,path:String,create_time:Date});
var JobPathModel = mongoose.model('benchmark_job_path', jobPathSchema); //创建blog数据库
mongoose.connect('mongodb://localhost:27017/benchmark_job_path',{ useNewUrlParser: true } );

function parsePath(filePath){
   var index = filePath.indexOf(' ');
   while(index>-1){
      filePath = filePath.substring(0,index)+'\\'+filePath.substring(index);
      index = filePath.indexOf(' ',index+2);
   }
   return filePath;
}

function readDir(path){
    // JobPathModel.remove({},function(err,result){
    //     if (err) return handleError(err);
    //       console.log("清库中。。。。")
    // })
    fs.readdir(path,function(err,menu){    
        if(!menu)
            return;
        menu.forEach(function(ele){    
            fs.stat(path+"/"+ele,function(err,info){
                if(info.isDirectory()){
                    // console.log("dir: "+ele)
                    if (ele=="摄影") {
                      return
                    }
                    readDir(path+"/"+ele);
                }else{
                    // console.log("file: "+ele)
                    const patt=/DetailList_W/g
                    const result = patt.test(ele) && ele.substring(0,1)!=='.' && ele.substring(0,1)!=='~';
                    if (result) {
                        
                        // var newPath = parsePath(path)+'/'+ele;
                        var newPath = path+'/'+ele;
                        console.log(newPath)
                        //save path into database
                        
                        var newJobPath = new JobPathModel({
                              job_number:ele,
                              path:newPath,
                              // status:status,
                              create_time:new Date().getTime()
                           })
                           newJobPath.save(function(err,docs){
                             if (err) {console.log('err')}
                              console.log(docs) // 
                              // mongoose.connection.close(); //位置不对，2500多天只有6条数据进去了
                           })
                        
                        
                        
                        // parse(newPath).then(data=>{
                        //     console.log(data)
                        // })
                       
                        // require('./parse').parse("/Volumes/datavolumn_bmkserver_Pub/新做稿/未开始/B190306_LNC\ 做稿/B190306_LNC_DetailList_W.xls")

                    }else{
                      return
                    }
                }    
            })
        })            
    })
}

module.exports={
   readDir:readDir
}