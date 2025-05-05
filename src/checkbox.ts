import { initElement } from "./core/element";

export class CheckBox extends initElement({
    name: "c-checkbox",
    template: `<div type>
    <img draggable="false" mark src="./assets/tick.svg" />
    <div gradient></div>
    <div fill></div>
</div>
<p label>Hello</p>`,
    style: `:host {
  width: auto;
  height: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  cursor: default;
}
:host div[type] {
  width: 14px;
  height: 14px;
  position: relative;
}
:host div[type] img[mark] {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  scale: 0.8;
  display: none;
}
:host div[type] div[gradient] {
  opacity: 0.17;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 3.5px;
  z-index: -1;
  display: none;
}
:host div[type] div[fill] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background: #FFFFFF;
  border: 0.5px solid rgba(0, 0, 0, 0.15);
  box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.1), inset 0 0 2px 0 rgba(0, 0, 0, 0.1);
  border-radius: 3.5px;
}
:host([state=on]) div[type] img[mark] {
  display: initial;
}
:host([state=on]) div[type] div[gradient] {
  display: block;
  background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 96%);
}
:host([state=on]) div[type] div[fill] {
  border: none;
  background: #007aff;
  box-shadow: 0 0 3px 0 rgba(255, 255, 255, 0.12), 0 1px 2px 0 rgba(255, 255, 255, 0.12), 0 0 1px 0 rgba(255, 255, 255, 0.24);
}
:host([disabled=true][state=on]) img[mark] {
  opacity: 0.25 !important;
  filter: invert(1);
}
:host([disabled=true][state=on]) div[gradient] {
  display: none;
}
:host([disabled=true][state=on]) div[fill] {
  opacity: 0.5 !important;
  background: #FFFFFF !important;
  border: 0.5px solid rgba(0, 0, 0, 0.02) !important;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.15), 0 1px 0 0 rgba(0, 0, 0, 0.05) !important;
}
:host([disabled=true][state=off]) div[fill] {
  opacity: 0.49;
  background: #FFFFFF;
  border: 0.5px solid rgba(0, 0, 0, 0.15);
  box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.1), inset 0 0 2px 0 rgba(0, 0, 0, 0.1);
}
:host([disabled=true]){
  pointer-events:none;
}
:host p[label] {
  margin: 0;
  margin-left: 6px;
  font-size: 13px;
  font-family: "SFPro-Regular", "PingFangSC-Regular";
}`,
    props: {
        state: "on",
        disabled: "false"
    },
    syncProps: ["state", "disabled"],
    setup(shadow) {
        let is_mousedown: boolean;
        this.addEventListener("mousedown", () => {
            is_mousedown = true
            this.style.filter = "brightness(0.9)";
        });
        window.addEventListener("mouseup", () => {
            if (!is_mousedown) return;
            is_mousedown = false;
            this.state = this.state == "on" ? "off" : "on"
            this.style.filter = "brightness(1)";
        });
    }
}) {

}

CheckBox.define();