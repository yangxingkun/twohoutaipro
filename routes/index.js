var express = require('express');
var router = express.Router();

var mongodb=require('mongodb').MongoClient
var db_str="mongodb://localhost:27017/twopro";

var async=require("async")
var ObjectId = require('mongodb').ObjectId;//为了转数组的的对象
/* GET home page. */
//渲染主页的信息以及页码的渲染
router.get('/', function(req, res, next) {
  mongodb.connect(db_str,(err,database)=>{
    database.collection("add",(err,coll)=>{
      	//页码
		var pageNo=req.query.pageNo;
		pageNo=pageNo?pageNo:1
			//每页显示数量
			var size=4;
			//总共多少条数据
			var count=0;
			//总页数
			var page=0;
					async.series([
					function(callback){
						coll.find({}).toArray((err,data)=>{
							count=data.length;
							page=Math.ceil(count/size)
							//下一页
							pageNo=pageNo>page?page:pageNo;
							//上一页
							pageNo=pageNo<1?1:pageNo;
						})
						callback(null,'')
					},
					function(callback){
						coll.find().sort({_id:-1}).limit(size).skip(pageNo-1).toArray((err,data)=>{
							callback(null,data)
						})
						//传过来的是页码1但是数据是数组012方式传过来的
					}
				],function(err,data){
					//我们用的是data[1],因为他是数组的形式['',data]
					console.log(data[1]);
					res.render('index',{data:data[1],pageNo:pageNo,page:page,count:count,name:req.session.username})
					database.close();
				//后端处理完后数据传到前端然后在前端接收数据
				})
    })
  })
});










//注册
router.get("/register",(req,res)=>{
  res.render('register')
})

//登录
router.get("/login",(req,res)=>{
  res.render('login')
})
//退出
router.get("/relogin",(req,res)=>{
      req.session.destroy(function(err){    
        if(err){      
        console.log(err)    
        }else{      
        res.redirect("/")   
        } 
        })
})
//修改
router.get("/update",(req,res)=>{
  res.render('update',{name:req.session.username})
})

//详情页
router.get("/detail",(req,res)=>{
 // console.log(req.query.id)
	mongodb.connect(db_str,(err,database)=>{
		database.collection('add',(err,coll)=>{
      coll.find({_id:ObjectId(req.query.id)}).toArray((err,detail)=>{
				//console.log(detail)
				console.log(detail[0].pic)
				// var pic=detail[0].pic
				// va pic1 =pic.split(/\^public/)

        res.render('detail',{name:req.session.username,title:detail[0].title,content:detail[0].content,riqi:detail[0].riqi,pic:detail[0].pic.replace("public","")})
        database.close()
      }) 
		})
	})
})


//潜套在子组件detail
router.get("/detail1",(req,res)=>{
	// console.log(req.query.id)
	 mongodb.connect(db_str,(err,database)=>{
		 database.collection('add',(err,coll)=>{
			 coll.find({_id:ObjectId(req.query.id)}).toArray((err,detail)=>{
				 //console.log(detail)
				 console.log(detail[0].pic)
				 // var pic=detail[0].pic
				 // va pic1 =pic.split(/\^public/)
 
				 res.render('detail1',{name:req.session.username,title:detail[0].title,content:detail[0].content,riqi:detail[0].riqi,pic:detail[0].pic.replace("public","")})
				 database.close()
			 }) 
		 })
	 })
 })

//照片库
router.get("/picture",(req,res)=>{



	mongodb.connect(db_str,(err,database)=>{
		database.collection('add',(err,coll)=>{
      coll.find({}).toArray((err,data)=>{
				console.log(data)
        res.render('picture',{name:req.session.username,data:data})
        database.close()
      }) 
		})
	})

	




})












//查询
router.get("/search",(req,res)=>{
  console.log(req.query.title);
  mongodb.connect(db_str,(err,database)=>{
    database.collection("add",(err,coll)=>{
      coll.find({}).toArray((err,data)=>{
       // console.log(data)
        var arr=[]
        var reg=new RegExp(req.query.title)
        for(var i=0;i<data.length;i++){
          if(reg.test(data[i].title)){
            arr.push(data[i])
          }
          console.log(arr)
        }
        res.render('search',{name:req.session.username,data:arr,tatols:arr.length})
        database.close()
      })
    })
  })
})







module.exports = router;
