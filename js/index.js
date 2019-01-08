
window.onload=function () {

    // 获取元素
    //头部元素
    var arrowNode=document.querySelector('.arrow');
    var headeraLisNode=document.querySelectorAll('.nav li');
    var headerDownNodes=document.querySelectorAll('.down');
    //滑屏元素
    var contentNode=document.querySelector('.content');
    var contentUlNode=document.querySelector('.contentMain');
    //第一屏元素
    var homePointNodes=document.querySelectorAll('.home .circlePoint li' );
    var homeLiNodes=document.querySelectorAll('.home .homeCarousel li');
    var homeUlNode=document.querySelector('.home .homeCarousel');
    //第五屏
    var aboutUlNode=document.querySelector('.aboutPhoto');
    var aboutLiNodes=document.querySelectorAll('.aboutPhoto li');
    // 右侧导航
    var rightNavNode=document.querySelector('.rightNav');
    var rightNavLiNodes=document.querySelectorAll('.rightNav li');
    //音乐部分的元素
    var musicNode=document.querySelector('.music');
    var audioMusicNode=document.querySelector('.music .audioMusic');
    //出入场元素
    var planeNode=document.querySelectorAll('.course .coursePlane');
    var workPenNodes=document.querySelectorAll('.works .workPen');
    var teamImgNode=document.querySelectorAll('.team .teamImg');
    var  aboutTitleNode=document.querySelector('.aboutTitle');
    var aboutTextNode=document.querySelector('.aboutText');
    //开机动画元素
    var maskAnimationNode=document.querySelector('.maskAnimation');


    //变量
    var contentHeight=contentNode.offsetHeight;
    var nowIndex=0;
    var lastIndex=0;
    //封装移动事件
    function move(nowIndex) {
        // for (var j = 0; j < headerDownNodes.length; j++) {
        //     headerDownNodes[j].style.width='';
        //     rightNavLiNodes[j].className='';
        // }
        headerDownNodes[lastIndex].style.width='';
        rightNavLiNodes[lastIndex].className='';

        headerDownNodes[nowIndex].style.width='100%';
        arrowNode.style.left=headeraLisNode[nowIndex].getBoundingClientRect().left+headeraLisNode[nowIndex].offsetWidth/2-arrowNode.offsetWidth/2+'px'
        contentUlNode.style.top=-contentHeight*nowIndex+'px';
        rightNavLiNodes[nowIndex].className='active';
        animationArr[lastIndex].anOut();
        animationArr[nowIndex].anIn();
        lastIndex=nowIndex;
    }
    //头部小箭头事件
    headerEvent();
    function headerEvent() {
    arrowNode.style.left=headeraLisNode[0].getBoundingClientRect().left+headeraLisNode[0].offsetWidth/2-arrowNode.offsetWidth/2+'px'
    headerDownNodes[0].style.width='100%'
    for (var i = 0; i < headeraLisNode.length; i++) {
        headeraLisNode[i].index=i;
        headeraLisNode[i].onclick=function () {
            nowIndex=this.index;
            move(nowIndex);
        }
     }
    }
    // 滚轮事件   滚轮滑屏事件
    scollEvent();
    function scollEvent() {
    document.onmousewheel=wheel;
    document.addEventListener('DOMMousescroll',wheel);
    function wheel(event) {
    event = event || window.event;
    var flag = '';
    if (event.wheelDelta) {
      //ie/chrome
      if (event.wheelDelta > 0) {
        flag = 'up';
      } else {
        flag = 'down'
      }
    } else if (event.detail) {
      //firefox
      if (event.detail < 0) {
        flag = 'up';
      } else {
        flag = 'down'
      }
    }
    switch (flag) {
      case 'up' :
      if(nowIndex>0){
          nowIndex--;
          move(nowIndex);
      }
        break;
      case 'down' :
       if(nowIndex<4){
           nowIndex++;
           move(nowIndex);
       }
        break;
    }
    //禁止默认行为
    event.preventDefault && event.preventDefault();
    return false;
    }

    }

    // 第一屏事件封装
    homeEvent();
    function homeEvent() {
        var lastIndex = 0;
        var nowIndex = 0;
        var lastTime = 0;
        var timer = null;

        //给每一个小圆点绑定点击事件
        for (var i = 0; i < homePointNodes.length; i++) {
            homePointNodes[i].index = i;
            homePointNodes[i].onclick = function () {
                var nowTime = Date.now();
                if (nowTime - lastTime < 2100) {
                    return;
                }
                nowIndex = this.index;
                if (nowIndex === lastIndex) return;
                clearInterval(timer);
                for (var j = 0; j < homeLiNodes.length; j++) {
                    homeLiNodes[j].className = 'commonTitle';
                }

                if (nowIndex > lastIndex) {
                    //说明点击的是右边
                    homeLiNodes[nowIndex].className = 'commonTitle rightShow';
                    homeLiNodes[lastIndex].className = 'commonTitle leftHide';
                } else {
                    //说明点击的是左边
                    homeLiNodes[nowIndex].className = 'commonTitle leftShow';
                    homeLiNodes[lastIndex].className = 'commonTitle rightHide';
                }

                homePointNodes[lastIndex].className = '';
                homePointNodes[nowIndex].className = 'active';

                lastIndex = nowIndex;
                lastTime = nowTime;
                //重新开启自动轮播
                autoPlay();

            }
        }
        //等第一屏开始过渡时，就需要自动轮播了~
        homeUlNode.addEventListener('transitionend', fn)
        function fn() {
            autoPlay();
            //只能触发一次，触发后要移除当前事件
            homeUlNode.removeEventListener('transitionend', fn)
        }
        //开启自动轮播
        function autoPlay() {
            //自动轮播
            timer = setInterval(function () {
                //相当于点击右边小圆点  右边显示 左边隐藏
                nowIndex++;
                if (nowIndex === 4) {
                    nowIndex = 0;
                }
                homeLiNodes[nowIndex].className = 'commonTitle rightShow';
                homeLiNodes[lastIndex].className = 'commonTitle leftHide';
                //修正小圆点的显示
                homePointNodes[lastIndex].className = '';
                homePointNodes[nowIndex].className = 'active';
                //同步下标
                lastIndex = nowIndex;
                //更新lastTime时间
                lastTime = Date.now();

            }, 2500)
        }
        //鼠标移入移出事件
        homeUlNode.onmouseenter = function () {
            clearInterval(timer);
        }
        homeUlNode.onmouseleave = autoPlay;

    }

//第五屏事件封装
    aboutEvent();
    function aboutEvent() {
        var width= aboutLiNodes[0].offsetWidth;
        var height=aboutLiNodes[0].offsetHeight;
        var canvas=null;
        var roundTimer=null;
        var paintingTimer=null;
        clearInterval(roundTimer);
        clearInterval(paintingTimer);
        for (var i = 0; i < aboutLiNodes.length; i++) {
            aboutLiNodes[i].index=i;
            aboutLiNodes[i].onmouseenter=function () {
                for (var j = 0; j < aboutLiNodes.length; j++) {
                    aboutLiNodes[j].style.opacity='0.5';
                }
                this.style.opacity='1';
                if(!canvas){
                    canvas=document.createElement('canvas');
                    canvas.width=width;
                    canvas.height=height;
                    canvas.className='canvas';
                    bubbleMove(canvas);
                    aboutUlNode.appendChild(canvas);
                }
                canvas.style.left=this.index*width+'px';
            }
        }
        aboutUlNode.onmouseleave=function(){
            for (var i = 0; i < aboutLiNodes.length; i++) {
                aboutLiNodes[i].style.opacity=1;
            }
            canvas.remove();
            canvas=null;
        }
        function bubbleMove(canvas) {
            var roundArr = [];
            if (canvas.getContext) {
                var pen = canvas.getContext('2d');

                roundTimer=setInterval(function () {
                    pen.clearRect(0, 0, canvas.width, canvas.height);

                    for (var i = 0; i < roundArr.length; i++) {
                        roundArr[i].deg += 6;
                        var rad = roundArr[i].deg * Math.PI / 180;
                        var nowLeft = Math.floor(roundArr[i].x  +  Math.sin(rad) * roundArr[i].s);
                        var nowTop = Math.floor(roundArr[i].y  - rad * roundArr[i].s);
                        if (nowTop <= 0) {
                            roundArr.splice(i, 1);
                            continue;
                        }
                        pen.fillStyle = 'rgba(' + roundArr[i].r + ', ' + roundArr[i].g + ', ' + roundArr[i].b + ', 1)';
                        pen.beginPath();
                        pen.arc(nowLeft, nowTop, roundArr[i].c_r, 0, Math.PI * 2);
                        pen.fill();
                    }

                }, 1000 / 60);

                paintingTimer=setInterval(function () {
                    var r = Math.floor(Math.random() * 255);
                    var g = Math.floor(Math.random() * 255);
                    var b = Math.floor(Math.random() * 255);
                    var c_r = Math.floor(Math.random() * 8 + 5);
                    var x = Math.floor(Math.random() * canvas.width);
                    var y = canvas.height + c_r;
                    var s = Math.floor(Math.random() * 50 + 10);
                    roundArr.push({
                        r: r,
                        g: g,
                        b: b,
                        x: x,
                        y: y,
                        c_r: c_r,
                        deg: 0,
                        s: s
                    })
                }, 1000/60)

            };
        }

    }

//右侧导航绑定事件
    for (var i = 0; i < rightNavLiNodes.length; i++) {
        rightNavLiNodes[i].index=i;
        rightNavLiNodes[i].onclick=function () {
            nowIndex=this.index;
            move(nowIndex);
        }




    }

// /音乐绑定事件
    musicNode.onclick=function () {
        if(audioMusicNode.paused){
            audioMusicNode.play();
            this.style.backgroundImage='url("imgs/musicon.gif")';
        }else{
            audioMusicNode.pause();
            this.style.backgroundImage='url("imgs/musicoff.gif")';
        }
    }
//    出入场动画
    var animationArr=[
        {
            anOut: function () {
                homeUlNode.style.transform='translateY(-200px)'
                homeUlNode.style.opacity=0;
            },
            anIn: function () {
                homeUlNode.style.transform='translateY(0)'
                homeUlNode.style.opacity=1;
            }
        },
        {
            anOut: function () {
                planeNode[0].style.transform='translate(-50px,-50px)';
                planeNode[1].style.transform='translate(-50px,50px)';
                planeNode[2].style.transform='translate(80px,-80px)'
            },
            anIn: function () {
                planeNode[0].style.transform='translate(0,0)';
                planeNode[1].style.transform='translate(0,0)';
                planeNode[2].style.transform='translate(0,0)';
            }
        },
        {
            anOut: function () {
                workPenNodes[0].style.transform='translate(-100px)';
                workPenNodes[1].style.transform='translate(100px)';
                workPenNodes[2].style.transform='translate(100px)'
            },
            anIn: function () {
                workPenNodes[0].style.transform='translate(0)';
                workPenNodes[1].style.transform='translate(0)';
                workPenNodes[2].style.transform='translate(0)';
            }
        },
        {
            anOut: function () {
                teamImgNode[0].style.transform='rotate(45deg)';
                teamImgNode[1].style.transform='rotate(-45deg)';

                // aboutPhotoNodes[0].style.transform = 'rotate(0)';
            },
            anIn: function () {
                teamImgNode[0].style.transform='rotate(0)';
                teamImgNode[1].style.transform='rotate(0)';
            }
        },
        {
            anOut: function () {
                aboutTitleNode.style.transform='translateX(-100px)';
                aboutTextNode.style.transform='translateX(100px)';
            },
            anIn: function () {
                aboutTitleNode.style.transform='translateX(0)';
                aboutTextNode.style.transform='translateX(0)';
            }
        }
        ]
    for (var i = 0; i < animationArr.length; i++) {
         if(i===0) continue;
        animationArr[i].anOut();
        
    }


   // 开机动画事
    maskAnimationEvent();
    function maskAnimationEvent() {
        var maskTopNode=document.querySelector('.maskAnimation .maskTop');
        var maskBottomNode=document.querySelector('.maskAnimation .maskBottom');
        var maskLineNode=document.querySelector('.maskAnimation .maskLine');
        var maskAnimationNode=document.querySelector('.maskAnimation');
        var imgArr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png'];
        var num=0;
        for (var i = 0; i < imgArr.length; i++) {
            var item=imgArr[i];
            var img=new Image();
            img.src='imgs/'+item;
            img.onload=function () {
                num++;
                maskLineNode.style.width=num/imgArr.length*100+'%';
                if(num===imgArr.length){
                    maskTopNode.style.height=0;
                    maskBottomNode.style.height=0;
                    maskLineNode.style.display='none';
                    maskAnimationNode.addEventListener('transitionend',function () {
                        maskAnimationNode.remove();
                        animationArr[0].anIn();

                    })

                }
            }

        }

    }

}