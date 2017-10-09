/* basically for checking that my scripts are working from a browser

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
*///"use strict";
function testcasesDocWrite(repo,callback,O){var
o=O||{},
T=0,
F=[],
i,
k,
s;
document.write('<table><caption>Quasic/'+repo+'/'+(o.path||'')+' testcases</caption><tr><th>Test</th><th>Passed</th><th>Result</th><th>Expected</th></tr>');
window.onerror=function(a,b,c){document.write('<tr><th colspan="4" class="Fatal">'+a+" in "+b+"&lt;"+c+"&gt;</th></tr>");};
function h(name){document.write('<tr><th colspan="4">'+name+'</th></tr>');}
function t(js,expected){var
j=HTML.fromFormattedString(js),
r,
c;
T++;
try{
var
r=eval(js),
c=r===expected?"Pass":"Fail";
}catch(e){
c="Exception";
r=e;
}
r=HTML.fromFormattedString(stringFrom(r));
if(c!=="Pass")F[F.length]="{"+j+"} "+c+": "+r;
document.write('<tr><td>'+j+'</td><td class="'+c+'">'+c+'</td><td>'+r+'</td><td>'+HTML.fromFormattedString(stringFrom(expected))+'</td></tr>');
return c;
}
if(
t(i="true // testing comparison function itself, fail case","Fail true")
==="Fail"&&F[0]==="{"+i+"} Fail: true"&&
t(i="8gse // testing comparison function itself, exception case","Exception [Error(SyntaxError)...")
==="Exception"&&F[1].substring(0,(s="{"+i+"} Exception: [Error(SyntaxError)").length)===s)F=[];else t("F",[]);
t("true // testing comparison function itself, pass case",true);
h("stringFrom // used in result rendering");
t("stringFrom(-10)","-10");
t("stringFrom(true)","true");
t("stringFrom(undefined)","undefined");
t("stringFrom(null)","null");
t('stringFrom("\'\\0\\\\")','"\'\\0\\\\"');
t("stringFrom('\"\\0\\\\')","'\"\\0\\\\'");
t("stringFrom(new Error('just testing'))",'[Error: "just testing"]');
t("stringFrom([3])","[3]");
t("stringFrom({test:5})","{test:5}");
t("(function(){return stringFrom(arguments,{depth:1})})(0)","[Arguments][0]{callee:[Function],\ncaller:"+eval("(function(){return arguments;})()").caller+"}");

h("HTML // used in result rendering");
t('HTML.fromString("<&>")',"&lt;&amp;&gt;");
t('HTML.fromFormattedString("\\t<&>\\n")'," &nbsp; &nbsp; &lt;&amp;&gt;<br />");
if(F.length)
document.write('<tr><th colspan="4" class="Fatal">ABORT: testcase system problem, '+F.length+' failures, stopping test...</th></tr>');
else callback(h,t);
s=F.length?"Fail":"Pass";
document.write('<tr><th>Result</th><td class="'+s+'">('+(T-F.length)+'/'+T+')</td><td>Testcases '+s+'ed.</td><th>Result</th></tr></table>');
s="";
k={string:1,number:1};
for(i in navigator)if(k[typeof navigator[i]])s+='<br />'+i+': '+navigator[i];
document.write('<h2>Report</h2>'+(F.length?'Please paste the following report (redacted if necessary) and any other relevant info on <a href="//github.com/Quasic/'+repo+'/issues/new">GitHub</a>:<pre>'+F.join('<p />'):'<pre>')+'<p />Total Failures: '+F.length+s+'</pre>');
if(o.alert)alert(F.length?F.length+" testcases failed.":"All "+T+" testcases passed.");
}