export default (method, url, params = {}, async = true) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          if (xhr.status == 401) {
            alert("您未登录或登录失效\n请重新登录");
            location.assign("/manage/login.html");
          } else {
            reject("服务器出错了");
          }
        }
      }
    };

    //判断请求类型如果是get，则需要将params附加到url中。
    if (method.toUpperCase() == "GET") {
      url += "?";
      for (let [key, value] of Object.entries(params)) {
        url += key + "=" + encodeURIComponent(value) + "&";
      }
      url = url.slice(0, -1);
    }

    xhr.open(method, url, async);

    // 从本地存储取
    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("token"));

    if (method.toUpperCase() == "POST") {
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.send(JSON.stringify(params));
    } else {
      xhr.send();
    }
  });
