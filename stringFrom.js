/* mostly for deep or shallow inspection of objects to a string rather than to the console
polyfills Array.prototype.indexOf

Similar tools:
JSON.stringify, though it won't handle circular references
node.js' util.inspect
FireFox's Object.toSource
For something better supporting circular references, use toJavaScript.js.
A version supporting the window object is in my dom repo.
A version supporting the WScript and ActiveXObject objects, including IE's window object, as well as VBScript objects, is built into the core of my wshta repo.
I recently found, but haven't tried https://github.com/NV/jsDump

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
R={
c:/\\/g,
q:/"/g,
z:/\0/g,
vk:/^[a-zA-Z_$][a-zA-Z0-9_$]*$/},
noArguments=OptS.apply(argo())==="[object Object]";
function argo(){return arguments;}
if(noArguments&&!("caller"in argo()))noArguments=5;
function functionDescriptor(f){var s=f.toString(),i=s.indexOf(')');return i<2?s:s.substring(0,i+1);}
stringFrom=function(o,Opt){var s=typeof o;//deep inspect recursive?
//other functions that could call stringFrom should not be used before or in the opt.depth===0 check to avoid infinite loops
	if(s==="number"||s==="boolean"||s==="undefined"||o===null)return''+o;
	if(s==="string"){
	return o.indexOf('"')>=0&&o.indexOf("'")<0?"'"+o.replace(R.c,"\\\\").replace(R.z,"\\0")+"'":'"'+o.replace(R.c,"\\\\").replace(R.z,"\\0").replace(R.q,'\\"')+'"';
	}
	if(s==="object"||s==="function"){
	s=s==="function"?"[object Function]":OptS.apply(o);
	if(s.substring(0,8)==="[object ")s='['+s.substring(8);
	if(s==="[Error]")return"[Error"+(o.name&&o.name!=="Error"?"("+o.name+")":"")+(o.number?"#"+o.number:"")+': "'+o.message+'"]';
	var i,t,opt=typeof Opt==="object"?{depth:"depth" in Opt?Opt.depth:2,customInspect:Opt.customInspect||!"customInspect" in Opt,maxArrayLength:"maxArrayLength" in Opt?Opt.maxArrayLength:100,recursiveList:Opt.recursiveList||[],useFunctionDescriptor:Opt.useFunctionDescriptor}:{depth:2,customInspect:true,maxArrayLength:100,recursiveList:[]};
if(s==="[Object]")
if(noArguments&&o.callee&&"length"in o&&(noArguments===5||"caller"in o))s="[Arguments]";
if(opt.depth<1)return s;
if(opt.recursiveList.indexOf(o)>=0)return"[Circular "+s.substring(1);
if(!o.hasOwnProperty)opt.showInherited=true;
//actually should clone, here, as this might catch non-circular, parallel references, but this will avoid duplication in general...
opt.recursiveList.push(o);
if((typeof o.inspect==="function"||OptS.apply(o.inspect)==='[object Function]')&&opt.customInspect)return o.inspect(opt.depth,Opt,opt);
	i=1;
	if(opt.depth)opt.depth--;
	if(s==='[Function]'){
	s=(opt.useFunctionDescriptor?functionDescriptor(o):o.toString())+'\t';
	}else if((s.substring(s.length-6)==='Array]'||s.substring(0,11)==="[Arguments]")&&(opt.maxArrayLength||opt.maxArrayLength===null)){
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
	if(opt.showInherited)for(i in o)
	t.push((i.search(R.vk)<0?'"'+i.replace(R.c,"\\\\").replace(R.q,'\\"')+'"':i)+':'+stringFrom(o[i],opt));
	else for(i in o)if(o.hasOwnProperty(i))
	t.push((i.search(R.vk)<0?'"'+i.replace(R.c,"\\\\").replace(R.q,'\\"')+'"':i)+':'+stringFrom(o[i],opt));
	}
	if(!t.length&&s.substring(0,11)==="[Arguments]")t=['callee:'+stringFrom(o.callee,opt),'caller:'+stringFrom(o.caller,opt)];
return(s==="[Object]"?'{'+t.join(',\n')+'}':s+(t.length?'{'+t.join(',\n')+'}':''));}return"["+s+"]";}
})();
