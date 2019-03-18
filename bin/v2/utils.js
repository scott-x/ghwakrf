function getXslPath(){
   
}

var fs = require("fs")

// function readDir(path){
// 	fs.readdir(path,function(err,menu){	
// 		if(!menu)
// 			return;
// 		menu.forEach(function(ele){	
// 			fs.stat(path+"/"+ele,function(err,info){
// 				if(info.isDirectory()){
// 					console.log("dir: "+ele)
// 					readDir(path+"/"+ele);
// 				}else{
// 					console.log("file: "+ele)
// 				}	
// 			})
// 		})			
// 	})

// }	


function getExtName(file){
   const last_dott = file.lastIndexOf('.')
   return file.substring(last_dott+1)
}


const folder = "/Volumes/datavolumn_bmkserver_Pub/新做稿"
/**
  folder: folder
  arr: filter type, 文件后缀名eg:['png','jpg']
*/
var fs = require("fs")

function readDir(path,...arr){
	let exts = [],files=[]
	exts.push(...arr);
	fs.readdir(path,function(err,menu){	
		if(!menu)
			return;
		menu.forEach(function(ele){	
			fs.stat(path+"/"+ele,function(err,info){
				if(info.isDirectory()){
					// console.log("dir: "+ele)
					readDir(path+"/"+ele);
				}else{
					
				}	
			})
		})			
	})

}	



readDir(folder,arr= ['xls','xlsx'])

