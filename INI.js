/* MS INI file reader with an attempt at a formatter thrown in
requires nothing
works with require()

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
*/"use strict";var INI=(function(){var reqcon=typeof require!=="undefined"&&typeof console!=="undefined"&&console.entero,entero=typeof console!=="undefined"&&console.entero||function(){return function(o){return o;};},INI={
fromStream:function(h){var
x=entero(0,"INI.fromStream",arguments),
O={},
o=O,
c,
i,
s=" \t\uFEFF\xA0",
L;
while(!h.atEndOfStream){
L=h.readLine();
for(i=0;i<L.length&&s.indexOf(c=L.charAt(i))>=0;i++);
L=L.substring(i);
if(L&&c!=='#')
if(c==='['){
i=L.indexOf("]");
i=L.substring(1,i);
o=O[i]={};
}else{
while(s.indexOf(L.substring(L.length-1))>=0)L.length--;
i=c=L.indexOf("=");c++;
if(i<0){
o[L]="";
}else{
while(i&&s.indexOf(L.charAt(i-1))>=0)i--;
while(c<L.length&&s.indexOf(L.charAt(c))>=0)c++;
o[L.substring(0,i)]=L.substring(c);
}
}}
h.close();
return x(O);
},
fromString:function(s){var
x=entero(0,"INI.fromString",arguments),
l=s.split(/\r?\n/),
h={readLine:function(){if(l.length<2)h.atEndOfStream=true;return l.shift();},atEndOfStream:!s,close:enter("INI::StringStream",[s])};
return INI.fromStream(h);},
toText:function(o){var
s="",
a=[],
i,
j;
//= in key means key is ignored
//newline in key or value means it's ignored
for(i in o)if(i.indexOf("=")<0&&i.indexOf("\r")<0&&i.indexOf("\n")<0&&o.hasOwnProperty(i))if(typeof o[i]==="object")a.push(i);else s+=keyval(i,o[i]);//if(o[i].indexOf("\r")<0&&o[i].indexOf("\n"))s+=i+"="+o[i]+"\n";
for(j=0;j<a.length;j++){
s+="\n["+a[j]+"]\n";
for(i in o[a[j]])if(o[a[j]].hasOwnProperty(i))s+=keyval(i,o[a[j]][i]);
}
return s;}};
function keyval(k,v){var s=''+k+v,i=s.indexOf("\r"),j=s.indexOf("\n");
if(i<0&&j<0)return k.indexOf("=")<0?k+"="+v+"\n":'#"'+k+'"='+v+"\n";
if(Math.min(i,j)>=(''+k).length)return"#"+k+"=omitted value with newline\n";
return"#omitted key with newline\n";}
if(typeof module!=="undefined"&&module.exports){
module.exports=INI;
if(reqcon)require("module").extensions['.ini']=function(h,module){return entero(0,"require.extensions['.ini']",arguments)(INI.fromStream(h));};
}else if(typeof WScript!=="undefined"){
WScript.echo(INI.toText({testcase:"running",test:"hi",a:[0,1,2,3]}));
WScript.echo(INI.toText(INI.fromString("myname=Tester\n   run=Test, Debug\n\n[appMenu]\nTest=Test\n     [test] \neof\neon    =  5\neoeoe=          tjeis\n    ffnnf       =nfonfds")));
}
return INI;})();