(()=>{"use strict";var e={d:(r,t)=>{for(var n in t)e.o(t,n)&&!e.o(r,n)&&Object.defineProperty(r,n,{enumerable:!0,get:t[n]})},o:(e,r)=>Object.prototype.hasOwnProperty.call(e,r),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},r={};function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(e){var r=function(e,r){if("object"!==t(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,"string");if("object"!==t(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===t(r)?r:String(r)}function i(e,r,t){return(r=n(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function u(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){var t=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var n,i,o,u,a=[],l=!0,c=!1;try{if(o=(t=t.call(e)).next,0===r){if(Object(t)!==t)return;l=!1}else for(;!(l=(n=o.call(t)).done)&&(a.push(n.value),a.length!==r);l=!0);}catch(e){c=!0,i=e}finally{try{if(!l&&null!=t.return&&(u=t.return(),Object(u)!==u))return}finally{if(c)throw i}}return a}}(e,r)||function(e,r){if(e){if("string"==typeof e)return o(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?o(e,r):void 0}}(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}e.r(r),e.d(r,{default:()=>P,email:()=>b,integer:()=>c,isString:()=>function(e){return"string"==typeof e},max:()=>v,min:()=>s,minMax:()=>d,number:()=>l,required:()=>f,test:()=>y});const a=require("react");function l(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Value is invalid";return function(r){var t=/^\d*\.?\d*$/.test(r);return t?{valid:t}:{valid:t,message:e}}}function c(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Value is invalid";return function(r){var t=/^\d+$/.test(r);return t?{valid:t}:{valid:t,message:e}}}function f(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"This field is required.";return function(r){var t=function(e){return"string"==typeof e}(r)?""!==r.trim():!!r;return t?{valid:t}:{valid:t,message:e}}}function s(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Value is invalid";return function(t){var n=t>=e;return n?{valid:n}:{valid:n,message:r}}}function v(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Value is invalid";return function(t){var n=t<=e;return n?{valid:n}:{valid:n,message:r}}}function d(e,r){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Value is invalid";return function(n){var i=n>=e&&n<=r;return i?{valid:i}:{valid:i,message:t}}}function y(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Value is invalid";return function(t){var n=e(t);return n?{valid:n}:{valid:n,message:r}}}function b(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Value is invalid";return function(r){var t=new RegExp(/^[-!#-'*+/-9=?^-~]+(?:\.[-!#-'*+/-9=?^-~]+)*@[-!#-'*+/-9=?^-~]+(?:\.[-!#-'*+/-9=?^-~]{2,20})+$/i).test(r);return t?{valid:t}:{valid:t,message:e}}}function m(e,r){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n={};for(var i in r)for(var o=r[i],u=0;u<o.length;u++){var a=(0,o[u])(null!==t?t:e[i]);if(!a.valid){n[i]=a.message;break}}return n}var g=function(e){return p(null==e?void 0:e.value)&&null!=e&&e.querySelectorAll&&(null==e?void 0:e.querySelectorAll("input,select,textarea")[0])||e},p=function(e){return void 0===e};function h(e,r){var t="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=function(e,r){if(e){if("string"==typeof e)return S(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?S(e,r):void 0}}(e))||r&&e&&"number"==typeof e.length){t&&(e=t);var n=0,i=function(){};return{s:i,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,u=!0,a=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return u=e.done,e},e:function(e){a=!0,o=e},f:function(){try{u||null==t.return||t.return()}finally{if(a)throw o}}}}function S(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}var O=function(e){return"checkbox"===e.type};function j(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function w(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?j(Object(t),!0).forEach((function(r){i(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):j(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function k(e){return 0===Object.keys(e).length}const P=function(e,r){var t=u((0,a.useState)(w({},e.fields)),1)[0],n=u((0,a.useState)(!1),2),o=n[0],l=n[1],c=u((0,a.useState)({}),2),f=c[0],s=c[1],v=(0,a.useRef)(w({},e.fields)),d=(0,a.useCallback)((function(r,t){var n=m(v.current,i({},r,e.validators[r]),t);s((function(e){var t=w({},e);return k(n)&&delete t[r],w(w({},t),n)}))}),[e.validators]),y=(0,a.useCallback)((function(t){t.preventDefault(),l(!0);var n=m(v.current,e.validators);s(n),k(n)&&r(v.current)}),[r,e.validators]),b=(0,a.useCallback)((function(e,r){o&&d(e,r),v.current[e]=r}),[o,e.validators,d]),p=(0,a.useCallback)((function(e,r){o&&d(e,r),v.current[e]=r}),[o,d]),S=(0,a.useCallback)((function(e){return v.current[e]}),[]),j=(0,a.useCallback)((function(e,r){return s(w(w({},f),{},i({},e,r)))}),[f]),P=(0,a.useCallback)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;e?v.current[e]=t[e]:v.current=w({},t)}),[t]),A=(0,a.useCallback)((function(e){return{name:e,ref:function(r){var t=g(r);t&&function(e,r){if(O(e)||function(e){return"radio"===e.type}(e))e.checked=!!r;else if(function(e){return"select"===e.tagName.toLowerCase()}(e)){var t,n=h(e.options);try{for(n.s();!(t=n.n()).done;){var i=t.value;if(i.value===r){i.selected=!0;break}}}catch(e){n.e(e)}finally{n.f()}}else e.value=r}(t,v.current[e])},onChange:function(r){r.preventDefault();var t=g(r.target),n=O(t)?"checked":"value";b(e,r.target[n])}}}),[v,b]);return{errors:f,submitted:o,register:A,onSubmit:y,setValue:p,getValue:S,setError:j,reset:P}};module.exports=r})();