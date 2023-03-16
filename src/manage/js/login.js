const manageLoginForm = document.forms.manageLogin;
import ajax from "../../utils/ajax";

//检测当前是否顶级
//可以用来防止非法引出
if (top != window) {
  top.location.href = location.href;
}

manageLoginForm.onsubmit = async function (e) {
  e.preventDefault();
  const result = await ajax("post", "/api/manage/login", {
    uid: manageLoginForm.uid.value,
    pwd: manageLoginForm.pwd.value,
  });
  console.log(result);
  if (result.flag) {
    alert(result.msg);
    localStorage.setItem("token", result.token);
    location.assign("/manage/index.html");
  } else {
    alert(result.msg);
  }
};
