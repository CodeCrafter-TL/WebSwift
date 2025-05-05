import { initElement } from "./core/element";

export class Window extends initElement({
    name: "c-window",
    template: `<div titlebar>
    <div wintools>
        <div oval close>
            <img src="../assets/xmark.svg" />
        </div>
        <div oval minimize>
            <img src="../assets/minus.svg" />
        </div>
        <div oval zoom>
            <img src="../assets/arrow.up.left.and.arrow.down.right.svg" />
        </div>
    </div>
    <p title></p>
</div>
<div content><slot></slot></div>`,
    style: `:host {
  width: 400px;
  height: 300px;
  background: #fff;
  box-shadow: 0 36px 100px 0 rgba(0, 0, 0, 0.35), 0 0 3px 0 rgba(0, 0, 0, 0.23), inset 0 0 3px 0 rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  display: block;
  min-width: 86px;
  min-height: 38px;
  resize: both;
}
:host::-webkit-resizer {
  display: none;
}
:host div[titlebar] {
  width: 100%;
  height: 28px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(245, 245, 245);
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.15);
  cursor: default;
  user-select: none;
  -webkit-user-select: none;
}
:host div[titlebar] div[wintools] {
  width: auto;
  height: 12px;
  display: inline-flex;
  position: absolute;
  top: 8px;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 8px;
}
:host div[titlebar] div[wintools]:hover div[oval] img {
  display: initial;
}
:host div[titlebar] div[wintools] div[oval] {
  width: 12px;
  height: 12px;
  border-radius: 6px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
:host div[titlebar] div[wintools] div[oval] img {
  width: 100%;
  height: 100%;
  scale: 0.5;
  display: none;
}
:host div[titlebar] div[wintools] div[close] {
  background: #ff5f57;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
}
:host div[titlebar] div[wintools] div[minimize] {
  background: #febc2e;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
}
:host div[titlebar] div[wintools] div[zoom] {
  background: #28c840;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
}
:host div[titlebar] p[title] {
  font-size: 13px;
  font-family: "SFPro-Bold", "PingFangSC-Bold";
  max-width: 40%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
:host div[content] {
  width: 100%;
  height: 100%;
}`,
    props: {
        title: "",
        width: 0,
        height: 0,
    },
    syncProps: ["title", "width", "height"],
    setup(shadow) {
        setTimeout(()=>{
            let title = this.title;
            shadow.querySelector("p[title]")!.innerHTML = title;
            let width = this.width;
            let height = this.height;
            this.style.width = width + "px";
            this.style.height = height + "px";
        })

        const ovals = shadow.querySelectorAll("div[oval]");
        let is_mousedown: boolean;

        ovals.forEach(oval => {
            oval.addEventListener("mousedown", () => {
                (oval as HTMLElement).style.filter = "brightness(0.9)";
                is_mousedown = true;
            });
            window.addEventListener("mouseup", () => {
                if (!is_mousedown) return;
                is_mousedown = false;
                (oval as HTMLElement).style.filter = "brightness(1)";
                if (oval.hasAttribute("close")) {
                  this.parentNode?.removeChild(this);
                }
            });
        });
    }
}) {}

Window.define();