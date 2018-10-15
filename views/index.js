function pug_attr(t,e,n,f){return!1!==e&&null!=e&&(e||"class"!==t&&"style"!==t)?!0===e?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (color, domain, message, posts) {pug_mixins["navigation"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Cnav class=\"navbar navbar-expand-lg navbar-light bg-light\"\u003E\u003Ca" + (" class=\"navbar-brand\""+pug_attr("href", domain, true, false)) + "\u003EFrontend\u003C\u002Fa\u003E\u003Cbutton class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"\u003E\u003Cspan class=\"navbar-toggler-icon\"\u003E\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003Cdiv class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\"\u003E\u003Cul class=\"navbar-nav mr-auto\"\u003E\u003Cli class=\"nav-item\"\u003E\u003Ca" + (" class=\"nav-link\""+pug_attr("href", domain+'posts', true, false)) + "\u003EPosts\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003Cli class=\"nav-item\"\u003E\u003Ca" + (" class=\"nav-link\""+pug_attr("href", domain+'categories', true, false)) + "\u003ECategories\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003Cli class=\"nav-item\"\u003E\u003Ca" + (" class=\"nav-link\""+pug_attr("href", domain+'admin/contacts', true, false)) + "\u003EContacts\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fnav\u003E";
};
pug_mixins["postlist"] = pug_interp = function(public){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Cul class=\"list-group\"\u003E";
// iterate posts
;(function(){
  var $$obj = posts;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var post = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli class=\"list-group-item mb-3\"\u003E\u003Ch2 class=\"mr-3\"\u003E" + (pug_escape(null == (pug_interp = post.name) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003Cp class=\"mr-3\"\u003E" + (pug_escape(null == (pug_interp = post.content) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003Cdiv class=\"mr-3\"\u003E" + (pug_escape(null == (pug_interp = post.order) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"mb-3\"\u003E";
// iterate post.categories
;(function(){
  var $$obj = post.categories;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var category = $$obj[pug_index1];
pug_html = pug_html + "\u003Cspan class=\"badge badge-primary mr-2\"\u003E" + (pug_escape(null == (pug_interp = category.name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var category = $$obj[pug_index1];
pug_html = pug_html + "\u003Cspan class=\"badge badge-primary mr-2\"\u003E" + (pug_escape(null == (pug_interp = category.name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cform" + (" class=\"d-flex justify-content-between\""+" method=\"POST\""+pug_attr("action", domain+'posts/delete/'+post._id +'?_method=DELETE', true, false)) + "\u003E\u003Ca" + (" class=\"btn btn-outline-primary mr-2\""+pug_attr("href", domain+"posts/"+post._id, true, false)) + "\u003EShow\u003C\u002Fa\u003E";
if (!public) {
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center\"\u003E\u003Ca" + (" class=\"btn btn-outline-primary mr-2\""+pug_attr("href", domain+"posts/edit/"+post._id, true, false)) + "\u003EEdit\u003C\u002Fa\u003E\u003Cbutton class=\"btn btn-outline-danger\" type=\"submit\"\u003Edelete\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fform\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var post = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli class=\"list-group-item mb-3\"\u003E\u003Ch2 class=\"mr-3\"\u003E" + (pug_escape(null == (pug_interp = post.name) ? "" : pug_interp)) + "\u003C\u002Fh2\u003E\u003Cp class=\"mr-3\"\u003E" + (pug_escape(null == (pug_interp = post.content) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003Cdiv class=\"mr-3\"\u003E" + (pug_escape(null == (pug_interp = post.order) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"mb-3\"\u003E";
// iterate post.categories
;(function(){
  var $$obj = post.categories;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var category = $$obj[pug_index2];
pug_html = pug_html + "\u003Cspan class=\"badge badge-primary mr-2\"\u003E" + (pug_escape(null == (pug_interp = category.name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var category = $$obj[pug_index2];
pug_html = pug_html + "\u003Cspan class=\"badge badge-primary mr-2\"\u003E" + (pug_escape(null == (pug_interp = category.name) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cform" + (" class=\"d-flex justify-content-between\""+" method=\"POST\""+pug_attr("action", domain+'posts/delete/'+post._id +'?_method=DELETE', true, false)) + "\u003E\u003Ca" + (" class=\"btn btn-outline-primary mr-2\""+pug_attr("href", domain+"posts/"+post._id, true, false)) + "\u003EShow\u003C\u002Fa\u003E";
if (!public) {
pug_html = pug_html + "\u003Cdiv class=\"d-flex align-items-center\"\u003E\u003Ca" + (" class=\"btn btn-outline-primary mr-2\""+pug_attr("href", domain+"posts/edit/"+post._id, true, false)) + "\u003EEdit\u003C\u002Fa\u003E\u003Cbutton class=\"btn btn-outline-danger\" type=\"submit\"\u003Edelete\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fform\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
};
pug_mixins["contactform"] = pug_interp = function(){
var block = (this && this.block), attributes = (this && this.attributes) || {};
pug_html = pug_html + "\u003Cdiv class=\"my-5 px-5\"\u003E\u003Cdiv class=\"mb-5 px-md-5\"\u003E\u003Ch1\u003EContact\u003C\u002Fh1\u003E\u003Cform method=\"post\" action=\"\u002Fcontact\"\u003E\u003Cdiv class=\"row\"\u003E\u003Cdiv class=\"col-md-6 mb-3\"\u003E\u003Clabel for=\"name\"\u003EName\u003C\u002Flabel\u003E\u003Cinput class=\"form-control\" id=\"name\" name=\"name\" type=\"text\" placeholder=\"\" value=\"\" required=\"\"\u002F\u003E\u003Cdiv class=\"invalid-feedback\"\u003EValid first name is required.\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"col-md-6 mb-3\"\u003E\u003Clabel for=\"email\"\u003EEmail\u003C\u002Flabel\u003E\u003Cspan class=\"text-muted\"\u003E(Optional)\u003C\u002Fspan\u003E\u003Cinput class=\"form-control\" id=\"email\" name=\"email\" type=\"email\" placeholder=\"you@example.com\"\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"invalid-feedback\"\u003EPlease enter a valid email address for shipping updates.\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"mb-3\"\u003E\u003Clabel for=\"body\"\u003EMessage\u003C\u002Flabel\u003E\u003Ctextarea class=\"form-control\" id=\"body\" name=\"body\" placeholder=\"\" value=\"\" required=\"\"\u003E\u003C\u002Ftextarea\u003E\u003Cdiv class=\"invalid-feedback\"\u003EValid last name is required.\u003C\u002Fdiv\u003E\u003Cbutton class=\"btn btn-primary\" type=\"submit\"\u003ESend!\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
pug_html = pug_html + "\u003C!DOCTYPE html\u003E\u003C!-- saved from url=(0051)https:\u002F\u002Fgetbootstrap.com\u002Fdocs\u002F4.0\u002Fexamples\u002Fsign-in\u002F--\u003E\u003Chtml lang=\"en\"\u003E\u003Chead\u003E\u003Cmeta http-equiv=\"Content-Type\" content=\"text\u002Fhtml; charset=UTF-8\"\u003E\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\"\u003E\u003Cmeta name=\"description\" content=\"\"\u003E\u003Cmeta name=\"author\" content=\"\"\u003E\u003Ctitle\u003ESignin Template for Bootstrap\u003C\u002Ftitle\u003E\u003Clink rel=\"stylesheet\" href=\"https:\u002F\u002Fmaxcdn.bootstrapcdn.com\u002Fbootstrap\u002F4.0.0\u002Fcss\u002Fbootstrap.min.css\" integrity=\"sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW\u002FdAiS6JXm\" crossorigin=\"anonymous\"\u003E\u003C!-- Custom styles for this template--\u003E\u003C\u002Fhead\u003E\u003Cbody class=\"text-center\"\u003E";
if (message) {
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["alert","alert-dismissible","fade","show",color], [false,false,false,false,true]), false, true)+" role=\"alert\" style=\"z-index: 1\"") + "\u003E\u003Cstrong\u003E" + (pug_escape(null == (pug_interp = message) ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E\u003Cbutton class=\"close\" type=\"button\" data-dismiss=\"alert\" aria-label=\"Close\"\u003E\u003Cspan aria-hidden=\"true\"\u003E×\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E";
}
pug_mixins["navigation"]();
pug_html = pug_html + "\u003Cdiv class=\"container mt-5 text-left\"\u003E\u003Ch1\u003EDCI\u003C\u002Fh1\u003E";
pug_mixins["postlist"](true);
pug_mixins["contactform"]();
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cscript src=\"https:\u002F\u002Fcode.jquery.com\u002Fjquery-3.3.1.slim.min.js\" integrity=\"sha384-q8i\u002FX+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Fpopper.js\u002F1.14.3\u002Fumd\u002Fpopper.min.js\" integrity=\"sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK\u002Fl8WvCWPIPm49\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003Cscript src=\"https:\u002F\u002Fstackpath.bootstrapcdn.com\u002Fbootstrap\u002F4.1.1\u002Fjs\u002Fbootstrap.min.js\" integrity=\"sha384-smHYKdLADwkXOn1EmN1qk\u002FHfnUcbVRZyYmZ4qpPea6sjB\u002FpTJ0euyQp0Mk8ck+5T\" crossorigin=\"anonymous\"\u003E\u003C\u002Fscript\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";}.call(this,"color" in locals_for_with?locals_for_with.color:typeof color!=="undefined"?color:undefined,"domain" in locals_for_with?locals_for_with.domain:typeof domain!=="undefined"?domain:undefined,"message" in locals_for_with?locals_for_with.message:typeof message!=="undefined"?message:undefined,"posts" in locals_for_with?locals_for_with.posts:typeof posts!=="undefined"?posts:undefined));;return pug_html;}