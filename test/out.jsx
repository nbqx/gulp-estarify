#target InDesign-7.0
LabeledObjects = this.LabeledObjects || {};

LabeledObjects._find = function(obj){
  var lname = obj.label || obj.name || "NOT_LABELED";
  var otype = obj.toString();
  return {
    name: lname,
    type: otype
  }
};

// TODO: same label-name
LabeledObjects.findAllWithType = function(){
  var args = Array.prototype.slice.call(arguments);

  if(args.length===1){
    var obj = args[0];
    return LabeledObjects.findAllWithType(obj,{});
  }else{
    var obj = args[0];
    var ret = args[1];
    var children = obj.allPageItems;
    var o = LabeledObjects._find(obj);

    ret[o.name] = {};
    ret[o.name]["type"] = o.type;

    if(children.length!==0){
      if(!ret[o.name].hasOwnProperty("children")) ret[o.name]["children"] = {};
      for(var i=0; i<children.length; i++){
        var c = children[i];
        LabeledObjects.findAllWithType(c,ret[o.name]["children"]);
      }
    }
    return ret
  }
};

LabeledObjects.findAll = function(obj){
  var ret = [];
  var objs = LabeledObjects.findAllWithType(obj);
  function recur(o,r){
    var keys = (function(_o){
      for(var k in _o){
        r.push(k);
      }

      if(_o[k].hasOwnProperty("children")){
        var _r = recur(_o[k]["children"],[]);
        r.push(_r);
      }

      return r
    })(o);

    return keys
  }
  return recur(objs,[]);
};


JSON=new Object();JSON.stringify=function(e){var e=e;var c={}.hasOwnProperty?true:false;var d=function(i){return i<10?"0"+i:i};var a={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};function b(i){if(/["\\\x00-\x1f]/.test(i)){return'"'+i.replace(/([\x00-\x1f\\"])/g,function(k,j){var l=a[j];if(l){return l}return j})+'"'}return'"'+i+'"'}function f(q){var m=["["],j,p,k=q.length,n;for(p=0;p<k;p+=1){n=q[p];switch(typeof n){case"undefined":case"function":case"unknown":break;default:if(j){m.push(",")}m.push(n==null?"null":JSON.stringify(n));j=true}}m.push("]");return m.join("")}function h(i){return'"'+i.getFullYear()+"-"+d(i.getMonth()+1)+"-"+d(i.getDate())+"T"+d(i.getHours())+":"+d(i.getMinutes())+":"+d(i.getSeconds())+'"'}function g(n){if(typeof n=="undefined"||n===null){return"null"}else{if(n instanceof Date){return h(n)}else{if(typeof n=="string"){return b(n)}else{if(typeof n=="number"){return isFinite(n)?String(n):"null"}else{if(typeof n=="boolean"){return String(n)}else{if(n instanceof Array){return f(n)}else{var k=["{"],j,m,l;for(m in n){l=n[m];switch(typeof l){case"undefined":case"function":case"unknown":break;default:if(j){k.push(",")}k.push(g(m),":",l===null?"null":g(l));j=true}}k.push("}");return k.join("")}}}}}}}return g(e)};JSON.parse=function(json){return eval("("+json+")")};

var log = $.writeln;
var obj = app.activeDocument.selection[0];
log(JSON.stringify(LabeledObjects.findAllWithType(obj)));
log(JSON.stringify(LabeledObjects.findAll(obj)));
