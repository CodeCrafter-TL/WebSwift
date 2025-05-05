import { initElement } from "./core/element";

export class Button extends initElement({
    name: "c-button",
    template: `<p><slot></slot></p><div gradient></div><div fill></div>`,
    style: `:host {
  width: auto;
  height: auto;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
  padding: 3px 7px;
  overflow: hidden;
  position: relative;
  cursor: default;
  -webkit-user-select: none;
     -moz-user-select: none;
          user-select: none;
  border: 0.5px solid rgba(0, 0, 0, 0.02);
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.15), 0 1px 0 rgba(0, 0, 0, 0.05);
  font-family: "SFPro-Regular", "PingFangSC-Regular";
}
:host [gradient] {
  width: 100%;
  height: 100%;
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
:host [fill] {
  width: 100%;
  height: 100%;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -2;
}
:host p {
  color: black;
  font-size: 13px;
  margin: 0;
}
:host([primary]) {
  box-shadow: 0 0.5px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.12), 0 0.5px 1px rgba(0, 0, 0, 0.24);
  border: none;
}
:host([primary]) p {
  color: white;
}
:host([primary]) [gradient] {
  display: block;
  background: linear-gradient(to bottom, #fff, rgba(255, 255, 255, 0));
  opacity: 0.17;
}
:host([primary]) [fill] {
  background: #007aff;
}
:host([disabled=true]) {
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.15), 0 1px 0 rgba(0, 0, 0, 0.05);
  pointer-events: none;
}
:host([disabled=true]) [gradient] {
  display: none;
}
:host([disabled=true]) [fill] {
  background: #fff;
}
:host([disabled=true]) p {
  color: rgba(0, 0, 0, 0.25);
}`,
    props: {
        disabled: "false",
        command: ""
    },
    syncProps: [
        "disabled",
        "command"
    ],
    setup(shadow) {
        setTimeout(() => {
            const command = new Function(this.command);
            let is_mousedown: boolean;
            //@ts-ignore
            this.addEventListener("mousedown", () => {
                is_mousedown = true;
                this.style.filter = "brightness(0.9)";
            });
            window.addEventListener("mouseup", () => {
                if (!is_mousedown) return;
                is_mousedown = false;
                this.style.filter = "brightness(1)";
                command();
            });
        })
    }
}) {
}

Button.define();