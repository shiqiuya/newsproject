const userLoginForm = document.forms.userLogin;
import ajax from "../../utils/ajax";

userLoginForm.onsubmit = async function (e) {
  e.preventDefault();
  const result = await ajax("post", "/api/users/login", {
    uid: userLoginForm.uid.value,
    pwd: userLoginForm.pwd.value,
  });
  console.log(result);
  if (result.flag) {
    alert(result.msg);
    localStorage.setItem("token", result.token);
    location.assign("/users/index.html");
  }
};
