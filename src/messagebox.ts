import { initElement } from "./core/element";

const props = {
    iconpath: ""
};

export class MessageBox extends initElement({
    name: "c-messagebox",
    template: `<img icon />
        <slot name="title"></slot>
        <slot name="text"></slot>
        <slot name="button"></slot>`,
    style: `@keyframes Pop {
  0% {
    opacity: 0;
    box-shadow: none;
    transform: scale(0.1);
  }
  50% {
    transform: scale(0.5);
    opacity: 0.2;
  }
  80% {
    transform: scale(1.1);
    opacity: 0.3;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
:host {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 228px;
  height: auto;
  box-shadow: inset 0 0 3px rgba(255, 255, 255, 0.1), 0 0 2px rgba(0, 0, 0, 0.05), 0 38px 90px rgba(0, 0, 0, 0.25), 0 0 1px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  background: rgba(246, 246, 246, 0.6);
  -webkit-backdrop-filter: blur(30px);
          backdrop-filter: blur(30px);
  padding: 20px 16px;
  padding-bottom: 16px;
  animation: Pop 0.3s linear forwards;
  font-family: "SFPro-Regular", "PingFangSC-Regular";
}
:host img[icon] {
  width: 64px;
  height: 64px;
  margin-bottom: 20px;
}
::slotted([slot=title]) {
  font-size: 13px;
  margin: 0;
  margin-bottom: 10px;
  font-family: "SFPro-Bold", "PingFangSC-Bold";
}
::slotted([slot=text]) {
  font-size: 11px;
  margin: 0;
  margin-bottom: 16px;
  text-align: center;
}
::slotted([slot=button]) {
  height: 23px;
  align-self: normal;
}`,
    props,
    syncProps: ["iconpath"],
    setup(shadow) {
        console.log(111)
        setTimeout(() => {
            const img = shadow.querySelector("img") as HTMLImageElement;
            img.src = this.iconpath;
            console.log(img, this.iconpath)
        });
    }
}) { }

MessageBox.define();