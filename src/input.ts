import { initElement } from "./core/element";

class Input extends initElement({
    name: "c-input",
    template: `<img icon src="./assets/search.svg" />
<input placeholder="Placeholder" />
<img clear src="./assets/xmark.circle.fill.svg" />
<div fill></div>`,
    style: `:host {
  width: 206px;
  height: 22px;
  position: relative;
  display: inline-flex;
  align-items: center;
}
:host img[icon] {
  display: none;
}
:host input {
  width: calc(100% - 14px);
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  padding: 0 7px;
  font-family: "SFPro-Regular", "PingFangSC-Regular";
}
:host input:focus ~ div[fill] {
  outline: 3px solid rgba(0, 122, 255, 0.5);
}
:host input:focus ~ img[clear] {
  opacity: 0.25;
  pointer-events: initial;
}
:host input::-moz-placeholder {
  font-family: "SFPro-Regular", "PingFangSC-Regular";
  font-size: 13px;
  color: rgba(0, 0, 0, 0.25);
  line-height: 16px;
}
:host input::placeholder {
  font-family: "SFPro-Regular", "PingFangSC-Regular";
  font-size: 13px;
  color: rgba(0, 0, 0, 0.25);
  line-height: 16px;
}
:host div[fill] {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -2;
  outline: 6px solid transparent;
  transition: outline 0.3s ease;
  pointer-events: none;
  background: #fff;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.3), 0 0 0 0 rgba(0, 0, 0, 0.05);
}
:host img[clear] {
  opacity: 0;
  position: absolute;
  right: 3px;
  top: 3px;
  pointer-events: none;
  width: 16px;
  height: 16px;
  transition: opacity 0.25s ease;
}
:host([type=search]) img[icon] {
  display: block;
  margin-left: 7px;
}
:host([type=search]) input {
  width: calc(100% - 35px);
  padding-left: 28px;
}
:host([type=search]) div[fill] {
  background: #fff;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.3), 0 0 0 0 rgba(0, 0, 0, 0.05);
  border-radius: 5px;
}
:host([disabled=true]) { pointer-events: none }
:host([disabled=true]) div[fill] {
  background: rgba(255, 255, 255, 0.5) !important;
}
:host([disabled=true][type=search]) img[icon] {
  opacity: 0.5;
}`,
    props: {
        type: "",
        disabled: "false",
        placeholder: "",
        value: ""
    },
    syncProps: ["type", "disabled", "placeholder", "value"],
    setup(shadow) {
        const clear = shadow.querySelector("img[clear]") as HTMLElement;
        const input = shadow.querySelector("input") as HTMLInputElement;

        this.value = input?.value as string;
        this.placeholder = input?.placeholder as string;
        input.value = this.value;
        input.placeholder = this.placeholder;

        clear?.addEventListener("mousedown", () => {
            clear.style.filter = "brightness(0.9)";
            input.focus();
            input.value = "";
            this.value = input.value;
        });
        clear?.addEventListener("mouseup", () => {
            clear.style.filter = "brightness(1)";
            input.focus();
            input.value = "";
            this.value = input.value;
        });
    }
}) {}

Input.define();