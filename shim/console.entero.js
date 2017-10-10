/* Console extensions
requires console and stringFrom.js
polyfills Array.prototype.indexOf
adds:
console.stringFrom is mostly for logging objects other than to the console

console.entero adds tracking capabilities to console, for use with some of my scripts

WARNING: console.entero is for debugging/analyzing only! This verbose mode slows down scripts and can generate huge logs.

This uses the verbose console mode of require(module,console).js from my wshta repo. I assume the normal mode is unneeded for basically any environments with console built in.

Scripts wishing to optionally support console.entero may use this code:
entero=console.entero||(function(){var
x=function(o){return o;};
x.resume=function(){};
return function(){return x;}})()

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
*///"use strict"; doesn't work with arguments.callee
if(typeof console!=="object")var console={log:function(){},error:function(){}};
(function(){var
OptS=Object.prototype.toString,
stringFrom=typeof stringFrom==="function"||OptS.apply(stringFrom)==="[object Function]"?stringFrom:function(o){var t=typeof o;return t==="object"?OptS.apply(o):"["+t+" "+o+"]";},
S=0,
L="";
function functionDescriptor(f){var s=f.toString(),i=s.indexOf(')');return i<2?s:s.substring(0,i+1);}
function fn(n,params,d){var
p=[],
i;
if(params&&params.length)for(i=0;i<params.length;i++)p[i]=params[i];//toSource?
return(d.object?stringFrom(d.object)+'.':'')
+n+(p.length?'('+p.join(',')+')':'')
+(d.deprecated?'[deprecated: '+d.deprecated+']':'')
+(params&&params.callee?" as "+functionDescriptor(params.callee):'')
//caller empty outside of function and doesn't work with strict mode
}
console.entero=function(n,params,O){var
d=O||{},
N=fn(n,params,d),
x=S,
f=++S+": "+N+" entered.";
console.log(f);
L+=f;
f=function(r){var
s=S+": "+N+" returned "+r;
console.log(s);
L+=s;
S=x;
return r;};
f.resume=function(e,O){var
s=S+": "+(O?fn(n,params,O):N)+"Error: "+e.message;
console.error(s);
L+=s;
S=x+1;
return e;
};
return f;};
console.entero.readLog=function(){var r=L;L="";return r;};
console.entero.getStackLength=function(){return S;};
})();