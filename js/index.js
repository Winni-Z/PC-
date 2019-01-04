
window.onload=function () {


    // 获取元素
    var arrowNode=document.querySelector('.arrow');
    var headeraLisNode=document.querySelectorAll('.nav li');
    var headerDownNodes=document.querySelectorAll('.down');

    arrowNode.style.left=headeraLisNode[0].getBoundingClientRect().left+headeraLisNode[0].offsetWidth/2-arrowNode.offsetWidth/2+'px'
    headerDownNodes[0].style.width='100%'
    for (var i = 0; i < headeraLisNode.length; i++) {
        headeraLisNode[i].index=i;
        headeraLisNode[i].onclick=function () {
            for (var j = 0; j < headerDownNodes.length; j++) {
                 headerDownNodes[j].style.width='0';
            }
        headerDownNodes[this.index].style.width='100%';
        arrowNode.style.left=this.getBoundingClientRect().left+this.offsetWidth/2-arrowNode.offsetWidth/2+'px'

       }
   }




}