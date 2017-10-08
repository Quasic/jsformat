/* mostly for deep or shallow inspection of objects to a string rather than to the console
polyfills Array.prototype.indexOf

Similar tools:
JSON.stringify, though it won't handle circular references
node.js' util.inspect
FireFox's Object.toSource
For something better supporting circular references, use toJavaScript.js.
A version supporting the WScript and ActiveXObject objects, as well as VBScript objects, is built into the core of my wshta repo.

Copyright (C) Quasic on GitHub
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
*/"use strict";var stringFrom;
if(!Array.prototype.indexOf)Array.prototype.indexOf=function(obj,fromIndex){var o=Object(this),len=o.length>>>0,n,k;if(!len||(n=Math.ceil(Math.abs(fromIndex))||0)>=len)return-1;for(k=n<0?Math.max(len-Math.abs(n),0):n;k<len;k++)if(k in o&&o[k]===obj)return k;return-1;};
(function(){var
OptS=Object.prototype.toString,
R={c:/\\/g,q:/"/g,z:/\0/g,vk:/^[a-zA-Z_$][a-zA-Z0-9_$]*$/};
function functionDescriptor(f){var s=f.toString(),i=s.indexOf(')');return i<2?s:s.substring(0,i+1);}
stringFrom=function(o,Opt){var s=typeof o;//deep inspect recursive?
//other functions that could call stringFrom should not be used before or in the opt.depth===0 check to avoid infinite loops
	if(s==="number"||s==="boolean"||s==="undefined"||o===null)return''+o;
	if(s==="string"){
	return o.indexOf('"')>=0&&o.indexOf("'")<0?"'"+o.replace(R.c,"\\\\").replace(R.z,"\\0")+"'":'"'+o.replace(R.c,"\\\\").replace(R.z,"\\0").replace(R.q,'\\"')+'"';
	}
	if(s==="object"||s==="function"){
	if(o instanceof Enumerator)return'[Enumerator]';
	s=s==="function"?"[object Function]":OptS.apply(o);
	if(s.substring(0,8)==="[object ")s='['+s.substring(8);
	if(s==="[Error]")return"[Error"+(o.name&&o.name!=="Error"?"("+o.name+")":"")+(o.number?"#"+o.number:"")+': "'+o.message+'"]';
	var i,t,opt=typeof Opt==="object"?{depth:"depth" in Opt?Opt.depth:2,customInspect:Opt.customInspect||!"customInspect" in Opt,maxArrayLength:"maxArrayLength" in Opt?Opt.maxArrayLength:100,recursiveList:[],useFunctionDescriptor:Opt.useFunctionDescriptor}:{depth:2,customInspect:true,maxArrayLength:100,recursiveList:[]};
	if(o instanceof ActiveXObject){
	//for(i in axo)if(cache.hasOwnProperty(i)&&o===cache[i].exports)return'require("'+i+'")';
	if(wsh){
	if(o===WScript)return"WScript";
	if(o===WScript.Arguments)return'WScript.Arguments';
	if(o===WScript.Arguments.Named)return'WScript.Arguments.Named';
	if(o===WScript.Arguments.Unnamed)return'WScript.Arguments.Unnamed';
	if(o===WScript.StdErr)return'WScript.StdErr';
	if(o===WScript.StdIn)return'WScript.StdIn';
	if(o===WScript.StdOut)return'WScript.StdOut';
	}
	s="[ActiveXObject"+(s==="[Object]"?typeof(o+'')==="undefined"?'[!toString]':o+''==="[object]"?'':" "+o:s)+"]";
	if(!win)return s;
	t=arguments;
	for(i in o){t=i;break;}
	if(o.tagName)s="[DOM "+o.tagName+(o.className?"."+o.className.replace(R.s,"."):"")+(o.id?"#"+o.id:"")+"]";else if("length" in o)s=o.nodeValue&&o.nodeValue.length===o.length?"[DOM TextNode "+stringFrom(o.nodeValue,{depth:0})+"]":"[DOM Array]";else if(t===arguments)return s;
	}
	if(typeof(o+'')==="undefined")return"[!toString"+s+"]";
	if(o.callee&&o.caller&&"length"in o)s="[arguments]";
	if(opt.depth<1){
	if(o===console)return'[Console]';
	return s;}
if(opt.recursiveList.indexOf(o)>=0)return"[Circular "+s.substring(8);
opt.recursiveList.push(o);
//var x={depth:0};x=console.enter("stringFrom",arguments,x);
if((typeof o.inspect==="function"||OptS.apply(o.inspect)==='[object Function]')&&opt.customInspect)return x(o.inspect(opt.depth,Opt,opt));
	//no more returns before x()
	i=1;
	if(opt.depth)opt.depth--;
	if(s==='[Function]'){
	s=(opt.useFunctionDescriptor?functionDescriptor(o):o.toString())+'\t';
	}else if((s.substring(s.length-6)==='Array]'||s.substring(0,11)==="[arguments]")&&(opt.maxArrayLength||opt.maxArrayLength===null)){
	t=[];
	i=opt.maxArrayLength===null?o.length:Math.min(o.length,opt.maxArrayLength);
	for(i--;i>=0;i--)t[i]=stringFrom(o[i],opt);
	s=(s==='[Array]'?'':s)+'['+t.join(',\n')+']';
	}
	t=[];
	if(i<0||s.substring(s.length-6)==='Array]'){
	if(opt.showInherited)for(i in o)if(isNaN(i))
	t.push((i.search(R.vk)<0?'"'+i.replace(R.c,"\\\\").replace(R.q,'\\"')+'"':i)+':'+stringFrom(o[i],opt));
	else for(i in o)if(o.hasOwnProperty(i)&&isNaN(i))
	t.push((i.search(R.vk)<0?'"'+i.replace(R.c,"\\\\").replace(R.q,'\\"')+'"':i)+':'+stringFrom(o[i],opt));
	}else{
	if(opt.showInherited||!o.hasOwnProperty)for(i in o)
	t.push((i.search(R.vk)<0?'"'+i.replace(R.c,"\\\\").replace(R.q,'\\"')+'"':i)+':'+stringFrom(o[i],opt));
	else for(i in o)if(o.hasOwnProperty(i))
	t.push((i.search(R.vk)<0?'"'+i.replace(R.c,"\\\\").replace(R.q,'\\"')+'"':i)+':'+stringFrom(o[i],opt));
	}
	if(!t.length&&s.substring(0,11)==="[arguments]")t=['callee:'+stringFrom(o.callee,opt),'caller:'+stringFrom(o.caller,opt)];
return(s==="[Object]"?'{'+t.join(',\n')+'}':s+(t.length?'{'+t.join(',\n')+'}':''));}return"["+s+"]";}
})();
