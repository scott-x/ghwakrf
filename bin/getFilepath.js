var fs = require("fs")

var excel_path;

module.exports={
	readDir: function(folder){
        fs.readdir(folder,function(err,menu){	
        	if(!menu)
        		return;
        	menu.forEach(function(ele){	
        		fs.stat(folder+"/"+ele,function(err,info){
        			if(info.isDirectory()){
        				if (/做稿/.test(ele)) {
        					// console.log("dir: "+ele)
                            var pure_number = ele.substring(0,11);
                            var eles=pure_number+'\ 做稿';
                            
        					switch (ele.substring(0,1)){
        						case 'B':
        						case 'U':
        						case 'C':
        						  excel_path= folder+eles+'/'+pure_number+'_DetailList_W.xls';
        						  fs.exists(excel_path, function(exists) {
        						  	if (exists) {
        						  		require('./parse').parse(excel_path)
        						  	}else{
        						  	    excel_path=folder+eles+'/'+pure_number+'_DetailList_W.xls'+'x';
        						  	    require('./parse').parse(excel_path)
        						  	}
        						  });
        						  
        						  break;  
        						case 'P':
        						  ele=pure_number+'\ 做稿';
        						  excel_path='/Volumes/datavolumn_bmkserver_Pub/新做稿/印刷/' +eles+'/'+pure_number+'_DetailList_W.xls';
        						  exists(excel_path);
        						  require('./parse').parse(excel_path)
        						  break;       
        					}
        					
        				}
        			}
        		})
        	})			
        })
	}
}


function exists(file){
	fs.exists(file, function(exists) {
		if (exists) {
			return
		}else{
			return file=file+'x';
		}
	});
}