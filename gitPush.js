/**
 * Created by albert on 16/11/7.
 */

'use strict';

var exec = require('child_process').exec;
// 加载File System读写模块
var fs = require('fs');
// 加载编码转换模块
var iconv = require('iconv-lite');
var filePath = "/file/code/web/chromeExtension/nodeEdit/test.text";


var autoEdit = {

    writeAndPush:function(){

        setInterval(function () {
            writeFile(filePath);
            exec("git commit -am 'edit test.text' ",function(err2, stdout, stderr){
                console.log(JSON.stringify('cmd->git commit -am----'+err2));
                exec("git push",function(err3, stdout, stderr){
                    console.log(JSON.stringify('cmd->git push----'+err3));
                });
            });

            // exec('cd /file/code/web/chromeExtension',function(err, stdout, stderr){
            //     console.log(JSON.stringify('cmd->cd----'+err));
            //
            // });


        },500);





    }


}

autoEdit.writeAndPush();



function writeFile(file){
    // 测试用的中文
    var str = "\r\n我是一个人Hello myself!";
    // 把中文转换成字节数组
    var arr = iconv.encode(str, 'gbk');
    console.log(arr);

    // appendFile，如果文件不存在，会自动创建新文件
    // 如果用writeFile，那么会删除旧文件，直接写新文件
    fs.writeFile(file, arr, function(err){
        if(err)
            console.log("fail " + err);
        else
            console.log("写入文件ok");
    });
}

function readFile(file){
    fs.readFile(file, function(err, data){
        if(err)
            console.log("读取文件fail " + err);
        else{
            // 读取成功时
            // 输出字节数组
            console.log(data);
            // 把数组转换为gbk中文
            var str = iconv.decode(data, 'gbk');
            console.log(str);
        }
    });
}