/*fdate date formatter
works with require(module,console).js tracer, or you can override fdate.entero

Copyright (C) Quasic of GitHub
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
*/"use strict";function fdate(f,d,utc){return fdate.getFormatter(f,utc)(d);}
fdate.WKDN=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
fdate.MN=["January","February","March","April","May","June","July","August","September","October","November","December"];
fdate.loaded=new Date();
fdate.now=function(){return new Date;};//could be overridden
fdate.consolentero=typeof console!="undefined"&&console.trace&&console.entero;
fdate.entero=fdate.consolentero||function(){return function(o){return o;};};
fdate.numDays=function(m,y){return fdate.entero(0,"fdate.numDays",[m,y])(m==1?new Date(new Date("March 1, "+y+" 0:00")-9999).getDate():30+[1,0,1,0,1,0,1,1,0,1,0,1][m]);};
fdate.relative=function(D,k){var d=new Date-D,m=Math.abs(d),i;for(i=0;i<fdate.relative.a.length;i++)if(m>=fdate.relative.a[i][0])return(m=Math.round(m/fdate.relative.a[i][0]))+fdate.relative.a[i][k||1]+(k===3&&m===1?'':'s')+(d<0?' from now':' ago');};
fdate.relative.a=[
[7*24*3600000,"w"," wk"," weeks"],
[24*3600000,"d"," dy"," day"],
[3600000,"h"," hr"," hour"],
[60000,"m"," min"," minute"],
[1000,"s"," sec"," second"],
[0,"ms"," ms"," millisecond"]
];//{ms:1,s:1000,m:60000,h:3600000};
fdate.getFormatter=function(f,utc){var x=fdate.entero(0,"fdate.getFormatter",arguments),a=[],c,n,i,t,r=arguments.callee.r,R=0,rR=0;
for(i=0;i<f.length;i+=n){
c=f.charAt(i);
for(n=1;i+n<f.length&&f.charAt(i+n)===c;n++);
c=f.substring(i,i+n);
if(c==='x'){
rR=R=arguments.callee.fi[f.charAt(i+n)];
R="(R."+R[0]+"===D."+R[0]+")&&Math.abs(D-R)<"+R[1];
}else{
if(utc&&arguments.callee.f["UTC"+c])c="UTC"+c;
if(arguments.callee.f[c]){
t=utc&&c.substring(0,2)!="UTC"?fdate.getFormatter.f[c].replace(r,"D.getUTC"):fdate.getFormatter.f[c];
a.push(R?"("+R+"?'':"+t+")":t);
}else if((t=a[a.length-1]).charAt(0)==="'"&&t.substring(t.length-1)==="'")a[a.length-1]=t.substring(0,t.length-1)+c+"'";else a.push("'"+c+"'");
R=0;
}}
c=new Function("o","var "+(fdate.consolentero?"x=console.entero('fdate.getFormatter(\""+f.replace(/"/g,'\\"')+"\","+utc+")',arguments.callee,arguments),":"")+"D=typeof o!=='undefined'?new Date(o):new Date"+(rR?",R=new Date":"")+";return "+(fdate.consolentero?"x(":"")+"isNaN(D)?'Invalid date: '+o:"+a.join("+")+(fdate.consolentero?")":"")+";");
x();return c;};
fdate.getFormatter.r=/D\.get/g;
fdate.getFormatter.fi={
Y:["getFullYear()",366*24*3600000],
M:["getMonth()",31*24*3600000],
W:["getDay()",24*3600000],
D:["getDate()",24*3600000],

H:["getHours()",3600000],
a:["getHours()<12",Infinity],//?
p:["getHours()<12",Infinity],//?
h:["getHours()",3600000],
m:["getMinutes()",60000],
s:["getSeconds()",1000],
u:["getMilliseconds()",1],
z:["getTimezoneOffset()",Infinity]
};
fdate.getFormatter.f={
Y:"D.getFullYear()",
YY:"(D.getFullYear()+'').substring(2)",
YYYY:"D.getFullYear()",
M:"(D.getMonth()+1)",
MM:"(D.getMonth()+101+'').substring(1)",
MMM:'["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][D.getMonth()]',
MMMM:'["January","February","March","April","May","June","July","August","September","October","November","December"][D.getMonth()]',
WWW:'["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][D.getDay()]',
WWWW:'["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][D.getDay()]',
D:"D.getDate()",
DD:"(D.getDate()+100+'').substring(1)",

R:"fdate.relative(D,1)",
RR:"fdate.relative(D,2)",
RRR:"fdate.relative(D,3)",

H:"D.getHours()",
HH:"(D.getHours()+100+'').substring(1)",
a:"(D.getHours()<12?'a':'p')",
aa:"(D.getHours()<12?'am':'pm')",
aaaa:"(D.getHours()<12?'a.m.':'p.m.')",
p:"(D.getHours()<12?'a':'p')",
pp:"(D.getHours()<12?'am':'pm')",
pppp:"(D.getHours()<12?'a.m.':'p.m.')",
h:"((D.getHours()%12)||12)",
hh:"(((D.getHours()%12)||12)+100+'').substring(1)",
m:"D.getMinutes()",
mm:"(D.getMinutes()+100+'').substring(1)",
s:"D.getSeconds()",
ss:"(D.getSeconds()+100+'').substring(1)",
//D.getMilliseconds()===D%1000, but easier to convert to UTC with function
u:"(D.getMilliseconds()+1000+'').charAt(1)",
uu:"(D.getMilliseconds()+1000+'').substring(1,2)",
uuu:"(D.getMilliseconds()+1000+'').substring(1,3)",
z:"'UTC'+(D.getTimezoneOffset()<0?'':'+')+(Math.floor(D.getTimezoneOffset()/60)+100+'').substring(1)+(D.getTimezoneOffset()%60+10000+'').substring(3)",//no getUTCTimezoneOffset, duh
UTCz:"'UTC+0000'",
zz:"fdate.tzr.exec(D.toString())[1]",
UTCzz:"'(UTC)'"
};
fdate.tzr=/\(([^)]+)\)/;
if(typeof module!=="undefined"&&module.exports)module.exports=fdate;
fdate;