import $ from "jquery";
import ajax from "../../utils/ajax";

// const form = document.forms.modifyPwd;
// form.onsubmit = function (e){
//     e.preventDefault();
// if(confirm('确定修改密码？')){

// }
// }

$('form[name="modifyPwd"]').on("submit", async function (e) {
  e.preventDefault();
  const newPwd = $('[name="newpwd"]').val();
  const newPwd2 = $('[name="newpwd2"]').val();
  const oldPwd = $('[name="oldpwd"]').val();
  if (newPwd == "" || newPwd != newPwd2) {
    alert("两侧输入不一致");
    return;
  }
  if (oldPwd == "") {
    alert("必须输入旧密码");
    return;
  }
  const result = await ajax("post", "/api/manage/modifyPwd", { oldPwd, newPwd });
  alert(result.msg);
  if (result.flag) {
    localStorage.removeItem("token");
    top.location.assign("/manage/login.html");
  }
});
