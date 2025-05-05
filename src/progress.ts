import { initElement } from "./core/element";

class Progress extends initElement({
    name: "c-progress",
    template: `<div fill></div><div back></div>`,
    style: `:host {
  width: 100px;
  height: 6px;
  border-radius: 3px;
  overflow: hidden;
  display: inline-block;
  position: relative;
}
:host div[fill] {
  width: 0%;
  height: 100%;
  background: #007aff;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 3px;
  transition: width 0.3s ease;
}
:host div[back] {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.05);
  position: absolute;
  top: 0;
  left: 0;
}
:host([small]) {
  height: 3px;
}`,
    props: {
        small: "",
        progress: ""
    },
    syncProps: ["small", "progress"],
    setup(shadow) {
        setTimeout(() => {
            const fill = shadow.querySelector("div[fill]");
            (fill as HTMLElement).style.width = `${this.progress}%`;
        });
    },
    dispatch: {
        attrchanges(key, value) {
            if (key == "progress") {
                const fill = this.shadowRoot?.querySelector("div[fill]");
                (fill as HTMLElement).style.width = `${value}%`;
            }
        }
    }
}) {}

Progress.define();