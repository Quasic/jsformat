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
*/
if(typeof console!=="object")console={};
if(!console.entero)console.entero=(function(){var
S=0,
D={},
f=function(object,name,args,options){"use strict";var
x=S,
r=function(o){S=x;return o;};
r.resume=function(){S=x+1;};
if(options&&options.deprecated)D[(object&&object+"."||'')+name]=options.deprecated;
S++;return r;};
f.getStackLength=function(){return S;};
f.getDeprecatedUsage=function(){return D;};
f.local=true;
return f;})();
function testcasesWriteHTML(stream,repo,callback,options){"use strict";var
o=options||{},
T=0,
F=[],
i,
k,
s;
stream.write('<table><caption>Quasic/'+repo+'/'+(o.path||'')+' testcases</caption><tr><th>Test</th><th>Passed</th><th>Result</th><th>Expected</th></tr>');
window.onerror=function(a,b,c){stream.write('<tr><th colspan="4" class="Fatal">'+a+" in "+b+"&lt;"+c+"&gt;</th></tr>");};
function h(name){stream.write('<tr><th colspan="4">'+name+'</th></tr>');}
function t(js,expected){var
x=console.entero(null,"testcasesWriteHTML::t",arguments),
j=HTML.fromFormattedString(js),
E=HTML.fromFormattedString(stringFrom(expected)),
r,
c;
T++;
r=testcasesWriteHTML.e(js,expected);
c=r[0];
r=HTML.fromFormattedString(stringFrom(r[1]));
if(c!=="Pass")F[F.length]="{"+j+"} "+c+(c.substring(0,5)==="Pass "?"":": "+r+"\n!==\n"+E);
stream.write('<tr><td>'+j+'</td><td class="'+c+'">'+c+'</td><td>'+r+'</td><td>'+E+'</td></tr>');
return x(c);}
h("testcasesWriteHTML, console.entero(some version) //testcase system");
if(
t(i="true // testing comparison function itself, fail case","Fail true")
==="Fail"&&F[0]==='{'+i+'} Fail: true\n!==\n"Fail true"'
&&
t("console.entero() // testing comparison function itself, fail case with stack imbalance 1","Fail Stack Imbalance1")
==="Fail Stack Imbalance1"
&&
t(i="8gse // testing comparison function itself, exception case","Exception [Error(SyntaxError)...")
==="Exception"&&F[2].substring(0,(s="{"+i+"} Exception: [Error(SyntaxError)").length)===s
&&
t("console.entero(),console.entero(),'Pass Stack Imbalance2' // testing comparison function itself, pass case with stack imbalance 2","Pass Stack Imbalance2")
==="Pass Stack Imbalance2"
)F=[];else t("F",[]);
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
testcasesWriteHTML.nonStrictTest.stringFrom(h,t);

h("HTML // used in result rendering");
t('HTML.fromString("<&>")',"&lt;&amp;&gt;");
t('HTML.fromFormattedString("\\t<&>\\n")'," &nbsp; &nbsp; &lt;&amp;&gt;<br />");
t('"'+stringFrom.host(callback)+'" // stringFrom.host(callback)',"[object Function]");
if(F.length)
stream.write('<tr><th colspan="4" class="Fatal">ABORT: testcase system problem, '+F.length+' failures, stopping test...</th></tr>');
else callback(h,t);
h("[Results]");
t("stringFrom(console.entero.getDeprecatedUsage())","{}");
s=F.length?"Fail":"Pass";
stream.write('<tr><th>// (passed/total) testcases</th><td class="'+s+'">('+(T-F.length)+'/'+T+')</td><td>'+F.length+' failures, result: '+s+'</td></tr></table>');
s="";
k={string:1,number:1};
for(i in navigator)if(k[typeof navigator[i]])s+='<br />'+i+': '+navigator[i];
stream.write('<h2>Report</h2>'+(F.length?'Please paste the following report (redacted if necessary) and any other relevant info on <a href="//github.com/Quasic/'+repo+'/issues/new">GitHub</a>:<p /><code>Local entero (non-verbose mode): '+console.entero.local+'<p />'+F.join('<p />'):'')+'<p />Total Failures: '+F.length+s+'</code>');
if(console.entero.readLog)stream.write('<h2>Verbose log</h2>'+HTML.fromFormattedString(console.entero.readLog()));
if(o.alert)alert(F.length?F.length+" testcases failed.":"All "+T+" testcases passed.");
}
// avoid local clutter
testcasesWriteHTML.e=function(/*js,expected*/){"strict mode";try{
arguments.s=console.entero.getStackLength();
arguments.r=eval(arguments[0]);
return[(arguments.r===arguments[1]?"Pass":"Fail")+(console.entero.getStackLength()===arguments.s?'':" Stack Imbalance"+(console.entero.getStackLength()-arguments.s)),arguments.r];
}catch(e){
return["Exception",e];
}};
// avoid strict mode
testcasesWriteHTML.nonStrictTest={stringFrom:function(h,t){
h("stringFrom // outside of strict mode");
t("(function(){return stringFrom(arguments,{depth:1})})(0)","[Arguments][0]{callee:[Function],\ncaller:"+eval("(function(){return arguments;})()").caller+"}");
}};
