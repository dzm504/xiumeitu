/* 用 canvas 绘制背景图片 */
(function(){
    var canvas=document.getElementById("canvas");
    var context=canvas.getContext('2d');
    var balls=[];
    function create(){
        var ball=new Ball();
        balls.push(ball);
    }
    function controlBall(){
        for(var i=0;i<balls.length;i++){
            var ball=balls[i];
            ball.paint();
            ball.move();
            if(ball.alpha<=0){
                balls.splice(i,1);
            }
        }
    }
    setInterval(function(){
        create();
        controlBall();
    },500);
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;
    (function move(){
        context.clearRect(0,0,canvas.width,canvas.height);
        controlBall();
        requestAnimationFrame(move);
    })()
    function Ball(){
        this.x=parseInt(Math.random()*(canvas.width-59)+30);
        this.y=canvas.height-30;
        this.r=parseInt(Math.random()*256);
        this.g=parseInt(Math.random()*256);
        this.b=parseInt(Math.random()*256);
        this.color="rgb("+this.r+","+this.g+","+this.b+")";
        this.alpha=1;
        this.paint=function(){
            context.fillStyle=this.color;
            context.globalAlpha = this.alpha; //透明度
            context.shadowColor=this.color;
            context.shadowBlur="5";
            context.beginPath();
            context.arc(this.x,this.y,30,0,Math.PI*2);
            context.closePath();
            context.fill();
        }
        this.move=function(){
            this.y--;
            this.alpha-=0.003;
            this.paint();
        }
    }
})();
/* 注册验证 */
(function(){
    var flag_user_name=false;
    var flag_user_pwd=false;
    var flag_email=false;
    var flag_rpwd=false;
    var flag_code=false;
    var user_name=document.getElementById("user_name");
    var unametips=document.getElementById("utips");
    formvalidity(user_name,unametips,{default:"请输入3至8位的英文或数字.",error:"用户名"},function(){
        $.get("data/username.php",{username:user_name.value},function(data){
            if(data=='exist'){
                unametips.style.color='#fb1d1d';
                unametips.innerHTML="用户名已存在.";

            }else{
                unametips.style.color='#28b419';
                unametips.innerHTML="用户名输入正确.";
                flag_user_name=true;
            }
        });
    });
    var user_pwd=document.getElementById("user_pwd");
    var ptips=document.getElementById("ptips");
    formvalidity(user_pwd,ptips,{default:"请输入6至12位的英文或数字.",error:"密码"});
    var rpwd=document.getElementById("repeat_pwd");
    var rtips=document.getElementById("rtips");
    rpwd.onfocus=function(){
        if(user_pwd.value==''){
            rtips.style.display="inline-block";
            rtips.style.color='#fb1d1d';
            rtips.innerHTML="请先设置密码.";
        }
    }
    rpwd.onblur=function(){
        if(rpwd.validity.valid){
            var value=user_pwd.value;
            if(value==rpwd.value){
                rtips.style.display="inline-block";
                rtips.style.color='#28b419';
                rtips.innerHTML="输入正确.";
                flag_rpwd=true;
            }else{
                rtips.style.display="inline-block";
                rtips.style.color='#fb1d1d';
                rtips.innerHTML="两次输入的密码不一致.";
            }
        }else if(rpwd.validity.valueMissing){
            rtips.style.color='#fb1d1d';
            rtips.innerHTML="请再次输入密码.";
        }
    }
    var email=document.getElementById("email");
    var etips=document.getElementById("etips");
    email.onfocus=function(){
        etips.style.display="inline-block";
        etips.style.color='#333';
        etips.innerHTML="请输入你的电子邮件地址.";
    }
    email.onblur=function(){
        if(email.validity.valid){
            etips.style.color='#28b419';
            etips.innerHTML="邮箱正确.";
            flag_email=true;
        }else if(email.validity.valueMissing){
            etips.style.color='#fb1d1d';
            etips.innerHTML="邮箱不能为空.";
        }else if(email.validity.typeMismatch){
            etips.style.color='#fb1d1d';
            etips.innerHTML="邮箱格式错误.";
        }
    }
    var str1=draw();
    $("#verification+a").click(function(event){
        event.preventDefault();
        str1=draw();
    });
    var code=document.getElementById("code");
    var ctips=document.getElementById("ctips");
    code.onfocus=function(){
        ctips.style.display="inline-block";
        ctips.style.color='#333';
        ctips.innerHTML="请输入下面图中的验证码（不区分大小写）.";
    }
    code.onblur=function(){
        if(code.validity.valid){
            if(code.value.toUpperCase()==str1){
                ctips.style.display="inline-block";
                ctips.style.color='#28b419';
                ctips.innerHTML="验证通过.";
                flag_code=true;
            }else{
                ctips.style.display="inline-block";
                ctips.style.color='#fb1d1d';
                ctips.innerHTML="验证码错误";
            }
        }else if(code.validity.valueMissing){
            ctips.style.color='#fb1d1d';
            ctips.innerHTML="请输入验证码.";
        }
    }
    function formvalidity(elem,elemTip,text,callback){
        elem.onfocus=function(){
            elemTip.style.display="inline-block";
            elemTip.style.color='#333';
            elemTip.innerHTML = text.default;
        }
        elem.onblur=function(){
            if(elem.validity.valid){
                if(callback){
                    callback();
                }else{
                    elemTip.style.color='#28b419';
                    elemTip.innerHTML=text.error+"输入正确.";
                    flag_user_pwd=true;
                }
            } else if(elem.validity.valueMissing){
                elemTip.style.color='#fb1d1d';
                elemTip.innerHTML=text.error+"不能为空.";
            }else if(elem.validity.patternMismatch){
                elemTip.style.color='#fb1d1d';
                elemTip.innerHTML=text.error+"输入有误.";
            }
        }
    }
    $("#registBtn").on("click",function(event){
        event.preventDefault();
        if($("#protolcals").get(0).checked){
            var flag=flag_user_name && flag_user_pwd && flag_rpwd && flag_email && flag_code;
            console.log(flag_user_name,flag_user_pwd,flag_rpwd,flag_email,flag_code);
            console.log(flag);
            if(flag){
                var data={
                    username:user_name.value,
                    userpwd:user_pwd.value,
                    email:email.value
                }
                $.post("data/regist.php",data,function(reponse){
                    if(reponse=="succ"){
                        alert("注册成功！");
                        window.location.href="index.html?login";
                    }
                },'text');
            }
        }else{
            alert("请先阅读《XXXXX使用协议》.");
        }
    });

})();
/* 生成验证码 */
function rn(min,max){/* 生成随机数 */
    return Math.floor(Math.random()*(max-min)+min);
}
function rc(min,max){/* 生成随机颜色 */
    var r=rn(min,max);
    var g=rn(min,max);
    var b=rn(min,max);
    return "rgb("+r+","+g+","+b+")";
}
function draw(){
    var str1='';
    var c1=document.getElementById("verification");
    var ctx=c1.getContext('2d');
    ctx.textBaseline = 'middle';
    /* 绘制背景色 */
    ctx.fillStyle=rc(180,240);
    ctx.fillRect(0,0,c1.width,c1.height);
    /* 绘制验证码 */
    var str='ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789';
    for(var i=0;i<4;i++){
        var txt=str[rn(0,str.length)];
        str1+=txt;
        ctx.fillStyle=rc(50,120);
        ctx.font=rn(28,32)+"px SimHei";
        var x=15+i*25;
        var y=rn(20,30);
        var deg=rn(-45,45)*Math.PI/180;
        /* 修改坐标原点和旋转角度 */
        ctx.translate(x,y);
        ctx.rotate(deg);
        ctx.fillText(txt,0,0);
        ctx.rotate(-deg);
        ctx.translate(-x,-y);
    }
    /* 绘制干扰线 */
    for(var c=0;c<3;c++){
        ctx.strokeStyle=rc(100,150);
        ctx.beginPath();
        ctx.moveTo(rn(0,c1.width),rn(0,c1.height));
        ctx.lineTo(rn(0,c1.width),rn(0,c1.height));
        ctx.stroke();
    }
    for(var i=0;i<60;i++){
        ctx.fillStyle=rc(0,255);
        ctx.beginPath();
        ctx.arc(rn(0,c1.width),rn(0,c1.height),1,0,Math.PI*2);
        ctx.fill();
    }
    return str1;
}



