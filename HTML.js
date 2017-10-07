/*Simple HTML processing without depending on the window DOM

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
*/"use strict";var HTML=(function(){var amp=/&/g,ot=/</g,ct=/>/g,nl=/\r?\n/g,tab=/\t/g,quot=/"/g,CHECKED=' checked="checked"',HTML={
fromString:function(s){return(s+'').replace(amp,"&amp;").replace(ot,"&lt;").replace(ct,"&gt;");},
fromFormattedString:function(s){return HTML.fromString(s).replace(nl,"<br />").replace(tab," &nbsp; &nbsp; ");},
Attribute:{
	fromString:function(s){return HTML.fromString(s).replace(quot,"&#34;");}
},
options:function(o,selectedValue){var r='',i;for(i in o)if(o.hasOwnProperty(i))r+='<option value="'+HTML.Attribute.fromString(i)+(selectedValue==i?'" selected="selected':'')+'">'+HTML.fromString(o[i])+'</option>';return r;}
};return HTML;})();//extra HTML in case renamed outside if using global
