const userRegForm = document.forms.userReg;
import ajax from "../../utils/ajax";

userRegForm.onsubmit = async function (e) {
  e.preventDefault();
  const result = await ajax("post", "/api/users/reg", {
    uid: userRegForm.uid.value,
    pwd: userRegForm.pwd.value,
  });
  console.log(result);
};
