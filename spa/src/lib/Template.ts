import * as _ from 'underscore';
export class Template{
	_css:string;
	_html:string;
	_template:string;

	constructor( css:string, html:string){
		this._css = css;
		this._html = html;
		this.createTemplate();

	}

	createTemplate(){
		this._template="";

		if( this._css!="" ){
			this._template = `<custom-style>
			<style>
			${this._css}
			</style>
			</custom-style>`;
		}
		this._template += this._html;
	}

	get template(){
		return this._template;
	}

	static render( template:string, data:any = {} ){
		var preTemplate = _.template( template );
		return preTemplate( { data: data } );
	}
}
