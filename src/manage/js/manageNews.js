import "../css/manageNews.css";
const list = document.getElementById("list");
import ajax from "../../utils/ajax";
const pagingDiv = document.getElementById("paging");
const pageSize = 10;
let currentPage = 1;
let recordCount;
let search = "";
const searchForm = document.forms.search;

init();

function init() {
  getNewsList();
  pagingDiv.onclick = paging_click;
  searchForm.onsubmit = function (e) {
    e.preventDefault();
    search = searchForm.s.value;
    currentPage = 1;
    getNewsList();
  };
}
async function getNewsList() {
  const result = await ajax("get", "/api/manage/getNewsList", { pageSize, currentPage, search });
  if (result.flag) {
    renderTable(result.data.list);
    recordCount = result.data.count;
    //渲染分页
    renderPaging();
  }
}

function renderTable(data) {
  list.innerHTML = "";
  data.forEach((item) => {
    let s = "<tr>";
    s += `<td>${item.id}</td>`;
    s += `<td>${item.title}</td>`;
    s += `<td>${item.auth}</td>`;
    s += `<td>${formatDate(item.updatedAt)}</td>`;
    s += `<td>${formatDate(item.createdAt)}</td>`;
    s += "</tr>";

    list.innerHTML += s;
  });
}

//处理时间
function formatDate(s) {
  var date = new Date(s);
  return date.getFullYear();
}

//渲染分页
function renderPaging() {
  //最大页数
  const maxPage = Math.ceil(recordCount / pageSize);
  pagingDiv.innerHTML = "";
  let s = "";

  s += `<span>共${recordCount}条</span>`;
  //左箭头
  if (currentPage != 1) {
    s += `<span class='btn2' data-index='${currentPage - 1}';>&lt;</span>`;
  } else {
    s += `<span class='btn1'>&lt;</span>`;
  }
  //首页
  if (currentPage != 1) {
    s += `<span class='btn2' data-index='1';>1</span>`;
  } else {
    s += `<span class='btn1' data-index='1'>1</span>`;
  }
  //前1后1
  let start, end;
  start = currentPage - 1;
  if (start < 2) {
    start = 2;
  }

  end = start + 2;
  if (end > maxPage - 1) {
    end = maxPage - 1;
  }
  if (start > 2) {
    s += "...";
  }

  for (let i = start; i <= end; i++) {
    s += `<span class='btn2' data-index='${i}'>${i}</span>`;
  }
  if (end < maxPage - 1) {
    s += "...";
  }

  //尾页
  if (maxPage > 1) {
    if (currentPage != maxPage) {
      s += `<span class='btn2' data-index='${maxPage}'>${maxPage}</span>`;
    } else {
      s += `<span class='btn1' data-index='${maxPage}'>${maxPage}</span>`;
    }
  }

  //右箭头
  if (currentPage != maxPage) {
    s += `<span class='btn2' data-index='${currentPage * 1 + 1}';>&gt;</span>`;
  } else {
    s += `<span class='btn1'>&gt;</span>`;
  }

  pagingDiv.innerHTML = s;
  pagingDiv.querySelector(`[data-index='${currentPage}']`).classList.add("active");
}

function paging_click(e) {
  if (e.target.className == "btn2") {
    currentPage = e.target.dataset.index;
    getNewsList();
  }
}
