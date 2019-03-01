var Riqi=document.getElementById("riqi")
function datestring(){
    var str =str||"/"
    var odata=new Date();
    var year=odata.getFullYear();
    var month=(odata.getMonth()+1);
    var data=twostring(odata.getDate());
    var hour=twostring(odata.getHours());
    var minites=twostring(odata.getMinutes());
   return  str=year+str+month+str+data+" "+hour+":"+minites
}
function twostring(num){
return num>10?num:"0"+num
}
// console.log(datestring())
// console.log(Riqi)


        window.setInterval(function() {
        Riqi.value=datestring()
    }, 1000);







//关闭弹窗
function closed(){
    $(".close").click(function(){
        $(".msg-ok").hide()
        $(".msg-error").hide()
    })

}


//增加
// $("#btn").click(function(){

// //console.log($("#riqi").html())
// //console.log($("#content1").val())

//         $.ajax({
//             type:"post",
//             url:"/users",
//             dataType:"json",
//             data:{title:$("#title").val(),riqi:$("#riqi").html(),content:$("#content1").val()},
//             success:function(data){
//                 console.log(data)
//                 if(data==1){
//                     $(".msg-ok").show()
//                     closed()
//                     location.href="/"
//                 }else{
//                     $(".msg-error").show()
//                     closed()
//                 }
//             }
//         })
// })
//删除
$(".del").click(function(){
    $.ajax({
        type:"post",
        url:"/users/remove",
        dataType:"json",
        data:{id:$(this).attr("data-id")},
        success:function(data){
            console.log(data)
            if(data==2){
                alert("删除成功")
                location.reload()
            }else{
                alert("删除失败")
            }
        }
    })
})
//修改
//console.log(location.search.split("=")[1])
$("#save").click(function(){
    $.ajax({
        type:"post",
        url:"users/update",
        dataType:"json",
        data:{
            id:location.search.split("=")[1],
            title:$("#title").val(),riqi:$("#riqi").val(),content:$("#content1").val()
        },
        success:function(data){
            console.log(data)
            if(data==1){
                alert("修改成功")
                location.href="/"
            }else{
                alert("修改失败")
            }
        }
    })
})

$("#disback").click(function(){
    location.href="/"
})
//查询通过表单请求  ajax请求好像不行
// $("#searchfind").click(function(){
//     //console.log($(".small-field").val())
//     $.ajax({
//         type:"get",
//         url:"/search",
//         data:{title:$(".small-field").val()},
//         success:function(data){
//             console.log(data)
//             if(data){
//                 $("html").html(data);
//             }else{
//                 alert("未查询到")
//             }
//         }
//     })
// })




