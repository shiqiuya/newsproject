import "quill/dist/quill.snow.css";
import Quill from "quill";

export default function (a) {
  //初始化
  const content = new Quill(a, {
    theme: "snow",
    placeholder: "请输入内容：",
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],

        [{ header: [1, 2, 3, 4, 5, 6, false] }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction
        ["image"],
        [{ size: ["small", false, "large", "huge"] }], // custom dropdown

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ["clean"], // remove formatting button
      ],
    },
  });
  return content;
}
