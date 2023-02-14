const pageList = document.getElementsByClassName("pg");
var index = 0;
pageList[index].style.display = "block";

function prev() {
  if (index != 0) {
    pageList[index].style.display = "none";
    index--;
    pageList[index].style.display = "block";
  }
}

function next() {
  if (index != pageList.length-1) {
    pageList[index].style.display = "none";
    index++;
    pageList[index].style.display = "block";
  }
}
