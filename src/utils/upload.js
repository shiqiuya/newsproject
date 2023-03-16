export default function (url, fd) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          if (xhr.status == 401) {
            alert("未登录或超时");
            top.location.assign("/manage/login.html");
          }
          reject(xhr.status);
        }
      }
    };

    xhr.open("post", url, true);
    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));
    xhr.send(fd);
  });
}
