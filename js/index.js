
window.onload=function () {


    // 获取元素
    //头部元素
    var arrowNode=document.querySelector('.arrow');
    var headeraLisNode=document.querySelectorAll('.nav li');
    var headerDownNodes=document.querySelectorAll('.down');
    //滑屏元素
    var contentNode=document.querySelector('.content');
    var contentUlNode=document.querySelector('.contentMain');
    //变量
    var contentHeight=contentNode.offsetHeight;
    var nowIndex=0;
    // var contentLinodes=document.querySelectorAll('.contentMain li')

    //封装移动事件
    function move(nowIndex) {
        for (var j = 0; j < headerDownNodes.length; j++) {
            headerDownNodes[j].style.width='0';
        }
        headerDownNodes[nowIndex].style.width='100%';
        arrowNode.style.left=headeraLisNode[nowIndex].getBoundingClientRect().left+headeraLisNode[nowIndex].offsetWidth/2-arrowNode.offsetWidth/2+'px'
        contentUlNode.style.top=-contentHeight*nowIndex+'px';
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




}