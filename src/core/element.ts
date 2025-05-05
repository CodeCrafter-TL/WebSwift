const setStyle = (shadowRoot: ShadowRoot, style: string = ""): void => {
    const css = new CSSStyleSheet();
    css.replaceSync(style);
    shadowRoot.adoptedStyleSheets.push(css);
};

interface Config<P> {
    name: string;
    style?: string;
    template?: string;
    props?: P & {
        [name:string]:any
    };
    syncProps?: (keyof P)[];
    dispatch?: {
        attrchanges(this: HTMLElement & P, key: keyof P, value: boolean | string | number): void;
    };
    setup?(this: HTMLElement & P, shadowRoot: ShadowRoot): void;
};

export const initElement = function <P>(config: Config<P>): {
    new(): HTMLElement & P;
    define(): void;
} {
    class InitElement extends HTMLElement {
        [key: string]: any;

        static define() {
            customElements.define(config.name, this);
        }
        #props:{
            [name:string]:any
        }=(()=>{
            const obj:{
                [name:string]:any
            } = {}
            for(const i in config.props || {}){
                const attr = this.getAttribute(i)
                if(attr){
                    obj[i] = attr
                }else{
                    obj[i] = config.props?.[i]
                }
            }
            return obj
        })();
        static observedAttributes = Object.keys(config.props ?? {});

        constructor() { 
            super();

            const shadow = this.attachShadow({ mode: "open" });

            setStyle(shadow, config.style);
            shadow.innerHTML = config.template || "";

            for (const prop in config.props) {
                Object.defineProperty(this, prop, {
                    get: () => {
                        return this.#props[prop];
                    },
                    set: (v) => {
                        const attr = this.getAttribute(prop);
                        if (attr == v) {
                            return;
                        } else {
                            if (config.syncProps?.includes(prop as keyof P)) {
                                this.#props[prop] = v
                                this.setAttribute(prop, v);
                                config.dispatch?.attrchanges.call<typeof this & P, any, void>(this as any, prop, v);
                            }
                        }
                    }
                })
            }

            config.setup?.call<any, any, void>(this, shadow);
        }

        attributeChangedCallback(key: string, _: unknown, newValue: string | null) {
            this[key] = newValue ?? "";
            config.dispatch?.attrchanges.call<typeof this & P, any, void>(this as any, key, newValue);
        }
    }
    return InitElement as any;
};