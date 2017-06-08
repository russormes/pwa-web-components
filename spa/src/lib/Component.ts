import {Template} from './Template';

export interface IWebComponent{
	addListeners():void;
	render():void;
	connectedCallback():void;
	attributeChangedCallback(attr:string):void;
}

export interface IHTMLComponent{
	selector:string,
	template:string,
	style:string
}

export class WebComponent extends HTMLElement  implements IWebComponent{
	protected _htmlComponent: IHTMLComponent;
	protected _template:Template;

	constructor(){
		super();
		let shadowRoot = this.attachShadow({mode: 'open'});
		this._template = new Template(this._htmlComponent.style,this._htmlComponent.template);
		shadowRoot.innerHTML = this._template.template;
		this.addListeners();
	}

	set HtmlComponent(htmlComponent:IHTMLComponent){
		this._htmlComponent = htmlComponent;
	}

	addListeners(): void {
		//throw new Error("Method not implemented.");
	}

	render(): void {
		// throw new Error("Method not implemented.");
	}

	connectedCallback(): void {
		this.render();
	}

	attributeChangedCallback(attr:string): void {
		console.log("change attr", attr)
		this.render();
	}
}


//Decorators for WebComponents
export function Component(htmlComponent:IHTMLComponent){
	return function(target:Function){
		const classConstructor = target.constructor;
		target.prototype.HtmlComponent = htmlComponent;
		customElements.define(htmlComponent.selector,target);
		customElements.whenDefined(htmlComponent.selector).then(() => {
			console.log(`registered component ${htmlComponent.selector}`);
		});
	}
}

export function Binding(element:string,all:boolean=false){
	return  function Binding(target:any,key:string){
		if (delete target[key]) {
			Object.defineProperty(target, key, {
				get: function () :HTMLElement{
					if(all)
						return this.shadowRoot.querySelectorAll(element);
					else
						return this.shadowRoot.querySelector(element);
				},
				set: function (value) {
					this.shadowRoot.querySelector(element).innerHTML = value;

				},
				enumerable: true,
				configurable: true
			});
		}
	}
}

export function Attribute(target:any, key:string){
		if ( delete target[key] ) { //This is if(true) ...
			Object.defineProperty( target, key, {
				get: function () {
					//return this[key];
					return (this.hasAttribute(key))?this.getAttribute(key):false;
				},
				set: function (value) {
					if(typeof(value)=='boolean'){
						if(value){
							this.setAttribute(key,value);
						}else{
							this.removeAttribute(key);
						}
					}else{
						return this.setAttribute(key,value);
					}

				},
				enumerable: true,
				configurable: true
			});
		}

}
