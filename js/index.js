HTMLElement.prototype.css=function(prop,value){
    if(value===undefined){
        var style=getComputedStyle(this);
        return style[prop];
    }else{
        this.style[prop]=value;
    }
}

/**** 美女图片部分小轮播 ***/
var adv={
    timer:null,
    slider:null,
    ul:null,
    liWidth:430,
    distance:0,
    duration:1000,
    steps:50,
    step:0,
    interval:0,
    canAuto:true,
    wait:3000,
    count:0,
    init:function(){
        this.slider=document.getElementById('banner_slider');
        this.ul=this.slider.getElementsByTagName('ul')[0];
        this.interval=this.duration/this.steps;
        this.slider.onmouseover=function() {
            this.canAuto = false;
        }.bind(this);
        this.slider.onmouseout=function(){
            this.canAuto=true;
        }.bind(this);
        this.autoMove();
    },
    autoMove:function(){
         setTimeout(function(){
            if(this.canAuto){
                 this.move(1);
            }else{
                this.autoMove();
            }
        }.bind(this),this.wait);
    },
    move:function(n){
        this.distance=n*this.liWidth;
        this.step=this.distance/this.steps;
        this.timer=setInterval(this.moveStep.bind(this),this.interval);
    },
    moveStep:function(){
        this.ul.css('left',parseFloat(this.ul.css('left'))-this.step+'px');
        this.count+=this.step;
        if(this.count>=430){
            this.ul.css('left',Math.round(parseFloat(this.ul.css('left')))+'px');
            clearInterval(this.timer);
            this.timer=null;
            this.count=0;
            if(parseFloat(this.ul.css('left'))<=-3440){
                this.ul.style.left=0+'px';
            }
            this.autoMove();
        }
    }
}
adv.init();


/***** 排行榜菜单切换 ****/
$("ul.rankings").on("click","li",function(){
    $(this).addClass("on").siblings().removeClass("on");
    var i=$(this).index();
    $("#meta_ranking ul:nth-child("+(i+1)+")").css("display","block").siblings().hide();
});
/** 主轮播（淡入淡出） ***/
$("#prev,#next").mouseover(function(){
    $("#prev").animate({left:'470px'},400);
    $("#next").animate({right:'470px'},400);
});
$("#prev,#next").mouseout(function(){
    $("#prev").animate({left:'502px'},400);
    $("#next").animate({right:'502px'},400);
});
var adv_banner={
    timer:null,
    parentIndex:0,
    init:function(){
        $("#slider").on("mouseover",function(){
            clearInterval(this.timer);
            this.timer=null;
        }.bind(this));
        $("#slider").on("mouseout",function(){
            if(this.timer==null){
                this.autoMove();
            }
        }.bind(this));
        $("#prev").on("click",function(e){
            e.preventDefault();
            clearInterval(this.timer);
            this.timer=null;
            this.parentIndex--;
            if(this.parentIndex==-1){
                this.parentIndex=4;
            }
            this.updateView();
        }.bind(this));
        $("#next").on("click",function(e){
            e.preventDefault();
            clearInterval(this.timer);
            this.timer=null;
            this.move();
        }.bind(this));
        $("#indexes").on("click","li",function(e){
            clearInterval(this.timer);
            this.timer=null;
            if($(e.target).attr("class")=="active"){
                return;
            }
            this.parentIndex=$(e.target).index();
            this.updateView();
        }.bind(this));
        this.timer=setInterval(this.move.bind(this),3000);
    },
    autoMove:function(){
        this.timer=setInterval(this.move.bind(this),3000);
    },
    showBtn:function(idx){
        $("#indexes>li").eq(idx).addClass("active").siblings(".active").removeClass("active");
    },
    move:function(){
        this.parentIndex++;
        if(this.parentIndex==5){
            this.parentIndex=0;
        }
        this.updateView();
    },
    updateView:function(){
        var idx=this.parentIndex;
        this.showBtn(idx);
        $("#img>li").eq(idx).addClass("next_step");
        $("#img>li").eq(idx).siblings(".parent").fadeOut(500,function(){
            $("#img>li").eq(idx).addClass("parent").removeClass("next_step");
            $(this).removeClass("parent").css("display","block");
            this.parentIndex=$("#img>li").index($(".parent"));
        });

    }
}
adv_banner.init();
/* 注册登陆部分 */
(function(){
    if(!sessionStorage.getItem('xiumeitu_user')){
        var url=window.location.search;
        url=="?login"&&modal_show();
    }
})();
function modal_show(){
    $("div.modal").fadeIn(500,function(){
        $("div.modal-dialog").animate({width:'500px',opacity:'1'},300);
    });
    if(window.localStorage.getItem("xiumeitu_user")){
        $("#uname").val(window.localStorage.getItem("xiumeitu_user"));
    }
}
$("ul.top_box").on("click",'li:first-child #login',function(event){
    event.preventDefault();
    modal_show();
});
(function(){
    var username=window.sessionStorage.getItem("xiumeitu_user");
    if(username){
        $("#login").parent().html("<img src='images/user.png'>欢迎回来,"+username+"&nbsp;&nbsp;&nbsp;<a href='#' id='quit'>[退出登录]</a>");
    }
})()
$("#btLogin").click(function(event){
    event.preventDefault();
    var requestData=$('#login-form').serialize();
    $.post("data/login.php",requestData,function(data){
        if(data.code){
            $("div.modal").fadeOut(500,function(){
                $("#login").parent().html("<img src='images/user.png'>欢迎回来,"+$("#uname").val()+"&nbsp;&nbsp;&nbsp;<a href='#' id='quit'>[退出登录]</a>");
                if($("#isRem").get(0).checked){
                    window.localStorage.setItem("xiumeitu_user",data.username);
                }else{
                    if(window.localStorage.getItem("xiumeitu_user")) {
                        window.localStorage.removeItem("xiumeitu_user");
                    }
                }
            });
            window.sessionStorage.setItem("xiumeitu_user",data.username);
        }else{
            $(".msg-warn").css("display","none");
            $(".msg-error").css("display",'block').html("<b></b>用户名或密码错误");
        }
    },'json');

});
$("ul.top_box").on("click",'li:first-child #quit',function(){
    $(this).parent().html('<a id="login" href="#"><img src="images/user.png">[登陆]</a>');
    window.sessionStorage.removeItem("xiumeitu_user");
});
$(".close").click(function(){
	$("div.modal-dialog").animate({width:'0px',opacity:'0'},300,function(){
		$("div.modal").fadeOut(500);
	});
});
/* 留言板部分 */
function updateview(){
    $.get('data/updatemsg.php',{page:1},function(data){
        //console.log(data);
        $('.pages ul').html("<li><a href='javascript:gotoPrePage()'>上一页</a></li> <li class='current'><a href='javascript:changePage(1)'>1</a></li> <li><a href='javascript:gotoNextPage()'>下一页</a></li>");
        getTotalPage();
        for(var i= 0,html='';i<data.length;i++){
            html+="<div class='msg-group'> <div class='user'> <img src='images/person.jpg'/><br/> <a href='#'>"+data[i].name+"</a> </div> <div class='content'> <p>"+data[i].msg+"</p> <br/> <span class='rt'>"+gettimes(data[i].createTime)+"</span> </div> <span class='close' i='"+data[i].mid+"'>&times;</span> </div>";
        }
        $('.message_board_show').html(html);
    })

}
function delLink(){

}
function getTotalPage(){
    $.get('data/get_total_page.php',{},function(data){
        var pager_num=Math.ceil(data/5);
        for(var i=2;i<pager_num+1;i++){
            $(".pages>ul>li:last-child").before("<li><a href='javascript:changePage("+i+")'>"+i+"</a></li>");
        }
    })
}
function gotoPage(page){
    $.get('data/updatemsg.php',{page:page},function(data){
        console.log(data);
        for(var i= 0,html='';i<data.length;i++){
            html+="<div class='msg-group'> <div class='user'> <img src='images/person.jpg'/><br/> <a href='#'>"+data[i].name+"</a> </div> <div class='content'> <p>"+data[i].msg+"</p> <br/> <span class='rt'>"+gettimes(data[i].createTime)+"</span> </div> <span class='close' i='"+data[i].mid+"'>&times;</span> </div>";
        }
        $('.message_board_show').html(html);
    })
}
function changePage(page){
    $(".pages li").eq(page).addClass("current").siblings().removeClass('current');
    gotoPage(page);
}
function gotoPrePage(){
    var curren=$(".pages li.current a").html();
    console.log(curren);
    if(curren>='2'){
        gotoPage(curren-1);
        $(".pages li").eq(curren-1).addClass("current").siblings().removeClass('current');
    }else{
        return;
    }
}
function gotoNextPage(){
    var curren=$(".pages li.current a").html();
    console.log(curren);
    var len=$('.pages li').length;
    console.log(len);
    if(curren<=len-3){
        gotoPage(curren*1+1);
        $(".pages li").eq(curren*1+1).addClass("current").siblings().removeClass('current');
    }else{
        return;
    }
}
updateview();
function gettimes(str){
    var date=new Date(parseInt(str));
    var y=date.getFullYear();
    var m=date.getMonth()+1;
    m<10&&(m='0'+m);
    var d=date.getDate();
    d<10&&(d='0'+d);
    var h=date.getHours();
    h<10&&(h='0'+d);
    var mm=date.getMinutes();
    mm<10&&(mm='0'+mm);
    var s=date.getSeconds();
    s<10&&(s='0'+s);
    return y+'-'+m+'-'+d+' '+h+':'+mm+':'+s;
}
$('#btn').click(function(){
    var uname=$("#username").val();
    var data=$("#messages").val();
    if(data&&uname){
        $.post("data/addmsg.php",{username:uname,msg:data},function(response){
            if(response=='succ'){
                updateview();
                $("#messages").val('');
                $("#username").val('');
            }
        })
    }else{
        alert('请将内容填写完整.');
    }
});
$(".message_board_show").on('click',".close",function(){
    var mid=$(this).attr('i');
    console.log(mid);
    $.post("data/delmsg.php",{mid:mid},function(response){
        if(response=='succ'){
            updateview();
        }
    })
})
