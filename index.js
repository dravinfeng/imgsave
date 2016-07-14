var fs=require('fs');
var path=require('path')
/**
 *@author dravin.feng
 *@param files //[item,],item 为 {file:'base64的 字节码字符串',name:'文件名',toPath:'存储文件路径,非必须'}
 *@param opts  //object, {encoding:"base64 or binary",toPath:"the path of img",callback:func}  
 **/


module.exports=function(files,opts){
    var _files,buff,times=0,
    _path=opts ? opts.path : '',
    encoding=opts ? opts.encoding : 'base64';
    
    if(!files){
        throw "fileStr is nessisery";
    }else if(!files.splice && files.charAt){
        _files=[files];
    }else{
        _files=files;
    }
    
    _files.forEach(function(d,i,self){
        //console.log(d.file)
        buff=new Buffer(d.file,(d.encoding ? d.encoding : encoding));
        
        var pt=path.normalize(d.path? d.path:_path)+'/';
        fs.writeFile(pt+d.name, buff,function(err){
            if(err){
                opts.callback && opts.callback(err,d);
            }
        });
    });
    
}
