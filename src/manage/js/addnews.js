// const form = document.forms[0];
// const yulan = document.getElementById('yulan');
// const fr = new FileReader();

// fr.onload = function () {
//   yulan.src = fr.result;
// }

// form.pic.onchange = function () {
//   const pic = this.files[0];
//   if (pic) {
//     fr.readAsDataURL(pic);
//   } else {
//     yulan.src = '';
//   }
// }

import quill from "../../utils/quill";
import ajax from "../../utils/ajax";
const content = quill("#editor");
import upload from "../../utils/upload";

/**
 * 使用blob方式实现，blob 是二进制大对象。
 * 将图片转化为blob存储在内存中，创建一个url指向这个对象。
 * 将指向blob的url附加给预览的图片就可以实现预览
 */
const form = document.forms[0];
//新闻图片
const yulan = document.getElementById("yulan");

//表单图片路径
form.pic.onchange = function () {
  const pic = this.files[0];
  if (pic) {
    yulan.src = URL.createObjectURL(pic);
  } else {
    yulan.src = "";
  }
};

//表单提交 内容
form.onsubmit = async function (e) {
  e.preventDefault();

  const fd = new FormData(form);
  fd.append("content", content.root.innerHTML);

  // fd.append('title',form.title.value);
  // fd.append('pic',form.pic.files[0]);

  const result = await upload("/api/manage/addnews", fd);
  if (result.flag) {
    alert(result.msg);
  } else {
    alert(result.msg);
  }
};

const select = document.getElementById("xinwenList");

//新闻分类
window.onload = async function () {
  const result = await ajax("post", "/api/manage/getNewsClassList");
  console.log(result.flag);
  if (result.flag) {
    console.log(result.data);
    result.data.forEach((item) => {
      const option = document.createElement("option");
      option.innerHTML = item.className;
      option.value = item.id;
      select.appendChild(option);
    });
  }
};
