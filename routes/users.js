var express = require('express');
var router = express.Router();

var mongodb=require('mongodb').MongoClient
var db_str="mongodb://localhost:27017/twopro";
var ObjectId = require('mongodb').ObjectId;//为了转数组的的对象
var multiparty=require('multiparty');


/* GET users listing. */

//注册
router.post("/register",(req,res)=>{
 // console.log(req.body)
  mongodb.connect(db_str,(err,database)=>{
     database.collection("zhuce",(err,coll)=>{
      coll.find({username:req.body.username}).toArray((err,data)=>{
        if(data.length!=0){
          res.send("1")
        }else(
          coll.insertOne(req.body,()=>{
            //出错的里面的参数不能是res
            res.send("0")
          })
        )
        database.close()
      })
    })
  })
})
//登录注意里面都是错误优先的回调函数
router.post("/login",(req,res)=>{
  //console.log(req.body)
    mongodb.connect(db_str,(err,database)=>{
    database.collection("zhuce",(err,coll)=>{
      coll.find(req.body).toArray((err,data)=>{
        //console.log(data)
        if(data.length!=0){
          console.log(req.session)
          req.session.username=req.body.username
          res.send("1")
        }else{
          res.send("0")
        }
        database.close()
          })
        })
      })
})
//增加
// router.post("/",(req,res)=>{
//   //console.log(req.body)
//   mongodb.connect(db_str,(err,database)=>{
//     database.collection("add",(err,coll)=>{
//       if(req.body.title!=""){
//         coll.save(req.body,(err)=>{
//           //console.log(req.body)
//           res.send("1")
//         })
//       }else{
//         res.send("2")
//       }
//       database.close()
//     })
//   })
// })
//产品
router.post('/product',function(req,res){
  var form=new multiparty.Form();
  form.uploadDir = './public/upload';

 
  form.parse(req,function(err, fields, files){

    //fields是获取表单的数据 files图片上传成功返回的信息
    console.log(fields)
    console.log("分开")
    console.log(files)
    var title=fields.title[0];
    var riqi=fields.riqi[0];
    var content=fields.content1[0];
    var pic=files.img[0].path;
    
    mongodb.connect(db_str,function(err,database){
      database.collection('add',function(err,coll){
        coll.insert({
          title:title,
          riqi:riqi,
          content:content,
          pic:pic
        },function(){
          res.send("<script>alert('发布成功！！！');location.href='/'</script>");
          database.close();
        })
      })
    })
  })
})
//删除
router.post('/remove',(req,res)=>{
  console.log(req.body)
	mongodb.connect(db_str,(err,database)=>{
		database.collection('add',(err,coll)=>{
			coll.remove({_id:ObjectId(req.body.id)},()=>{
				res.send('2');
				database.close();
			})
		})
	})
})
//修改
router.post('/update',(req,res)=>{
  console.log(req.body)
	mongodb.connect(db_str,(err,database)=>{
		database.collection('add',(err,coll)=>{
      coll.updateOne({_id:ObjectId(req.body.id)},{$set: {title:req.body.title,content:req.body.content,riqi:req.body.riqi}},()=>{
        res.send('1')
        database.close()
      })
		})
	})
})
module.exports = router;
