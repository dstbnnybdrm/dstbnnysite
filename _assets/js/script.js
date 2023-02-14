const pageList = document.getElementsByClassName("poem");
var index = 0;
pageList[index].className += " is-visible";

function next() {
  if (index != 0) {
    pageList[index].className
      = pageList[index].className.replace( /(?:^|\s)is-visible(?!\S)/g , '' );
    console.log(pageList[index].className)
    index--;
    pageList[index].className += " is-visible";
    // window.location.href = "#" + pageList[index].id.toString(); 
    
  }
}

function prev() {
  if (index != pageList.length-1) {
    pageList[index].className
      = pageList[index].className.replace( /(?:^|\s)is-visible(?!\S)/g , '' );
    index++;
    pageList[index].className += " is-visible";
    // window.location.href = "#" + pageList[index].id.toString(); 
  }
}