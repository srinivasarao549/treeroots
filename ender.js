/*!
  * =============================================================
  * Ender: open module JavaScript framework (https://ender.no.de)
  * Build: ender build flywheel keymaster
  * =============================================================
  */

/*!
  * Ender: open module JavaScript framework (client-lib)
  * copyright Dustin Diaz & Jacob Thornton 2011 (@ded @fat)
  * http://ender.no.de
  * License MIT
  */
!function (context) {

  // a global object for node.js module compatiblity
  // ============================================

  context['global'] = context

  // Implements simple module system
  // losely based on CommonJS Modules spec v1.1.1
  // ============================================

  var modules = {}
    , old = context.$

  function require (identifier) {
    // modules can be required from ender's build system, or found on the window
    var module = modules[identifier] || window[identifier]
    if (!module) throw new Error("Requested module '" + identifier + "' has not been defined.")
    return module
  }

  function provide (name, what) {
    return (modules[name] = what)
  }

  context['provide'] = provide
  context['require'] = require

  function aug(o, o2) {
    for (var k in o2) k != 'noConflict' && k != '_VERSION' && (o[k] = o2[k])
    return o
  }

  function boosh(s, r, els) {
    // string || node || nodelist || window
    if (typeof s == 'string' || s.nodeName || (s.length && 'item' in s) || s == window) {
      els = ender._select(s, r)
      els.selector = s
    } else els = isFinite(s.length) ? s : [s]
    return aug(els, boosh)
  }

  function ender(s, r) {
    return boosh(s, r)
  }

  aug(ender, {
      _VERSION: '0.3.6'
    , fn: boosh // for easy compat to jQuery plugins
    , ender: function (o, chain) {
        aug(chain ? boosh : ender, o)
      }
    , _select: function (s, r) {
        return (r || document).querySelectorAll(s)
      }
  })

  aug(boosh, {
    forEach: function (fn, scope, i) {
      // opt out of native forEach so we can intentionally call our own scope
      // defaulting to the current item and be able to return self
      for (i = 0, l = this.length; i < l; ++i) i in this && fn.call(scope || this[i], this[i], i, this)
      // return self for chaining
      return this
    },
    $: ender // handy reference to self
  })

  ender.noConflict = function () {
    context.$ = old
    return this
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = ender
  // use subscript notation as extern for Closure compilation
  context['ender'] = context['$'] = context['ender'] || ender

}(this);

!function () {

  var module = { exports: {} }, exports = module.exports;

  !function (context, undefined) {
      
      // poly-fill copy-pasted from https://github.com/ded/morpheus/blob/master/src/morpheus.js
      var frame = function () {
          // native animation frames
          // http://webstuff.nfshost.com/anim-timing/Overview.html
          // http://dev.chromium.org/developers/design-documents/requestanimationframe-implementation
          return context.requestAnimationFrame  ||
            context.webkitRequestAnimationFrame ||
            context.mozRequestAnimationFrame    ||
            context.oRequestAnimationFrame      ||
            context.msRequestAnimationFrame     ||
            function ($callback) {
              context.setTimeout(function () {
                $callback(+new Date())
              }, 10)
            }
        }()
  
      , flywheel = function($callback, $framerate_cap){
          
          // 'private attr'
          var _max_frame_duration,
              _last_spin_timestamp = +new Date(),
              _continue_spinning_flywheel = false,
              _step_by = 1000/60,
              
          // 'private methods'
              _set_max_frame_duration_by_framerate_cap = function(framerate_cap){
                   _max_frame_duration = 1000/framerate_cap
              },
              _spin_flywheel = function spin(timestamp){
                  var time_delta = timestamp - _last_spin_timestamp,
                      capped_time_delta
  
                      _last_spin_timestamp = timestamp
  
                  // cap the framerate
                  ;( time_delta < _max_frame_duration )? capped_time_delta = time_delta
                  : capped_time_delta = _max_frame_duration
  
  
                  // set up the next spin
                  if ( _continue_spinning_flywheel ) frame(function(timestamp){
                      spin(timestamp)
                  })
  
                  // call the callback
                  $callback(capped_time_delta)
              }
  
          // convert the given framerate cap to a duration
          if ( $framerate_cap !== undefined ) _set_max_frame_duration_by_framerate_cap($framerate_cap)
          else _max_frame_duration = 1000/30
  
  
          // return an API object, to let users manipulate the loop
          return {
              
              start: function(){
                  _continue_spinning_flywheel = true
                  _spin_flywheel()
                  return this
              },
              
              stop: function(){
                  _continue_spinning_flywheel = false
                  return this
              },
              
              step: function(fake_time_delta){
                  // step abuses the fact that _spin_flywheel(undefined) means $callback's time_delta = _max_frame_duration
                  var cache_max_frame_duration = _max_frame_duration
                                  
                  if ( fake_time_delta !== undefined ) _max_frame_duration = fake_time_delta
                  else _max_frame_duration = _step_by
                  
                  _continue_spinning_flywheel = false
                  _spin_flywheel()
                  
                  // re-instate intial _step_by value
                   _max_frame_duration = cache_max_frame_duration
                  
                  return this                     
              },
              
              set_callback: function(callback){
                  $callback = callback
                  return this
              },
  
              set_framerate_cap: function(framerate_cap){
                  _set_max_frame_duration_by_framerate_cap(framerate_cap)
                  return this
              }
          
          }
      }
  
      context["flywheel"] = flywheel
  }(this)

  provide("flywheel", module.exports);

  !function($){
  
      provide("flywheel", flywheel)
  
  }(ender)
  

}();

!function () {

  var module = { exports: {} }, exports = module.exports;

  //     keymaster.js
  //     (c) 2011 Thomas Fuchs
  //     keymaster.js may be freely distributed under the MIT license.
  
  ;(function(global){
    var k,
      _handlers = {},
      _mods = { 16: false, 18: false, 17: false, 91: false },
      _scope = 'all',
      // modifier keys
      _MODIFIERS = {
        '⇧': 16, shift: 16,
        '⌥': 18, alt: 18, option: 18,
        '⌃': 17, ctrl: 17, control: 17,
        '⌘': 91, command: 91
      },
      // special keys
      _MAP = {
        backspace: 8, tab: 9, clear: 12,
        enter: 13, 'return': 13,
        esc: 27, escape: 27, space: 32,
        left: 37, up: 38,
        right: 39, down: 40,
        del: 46, 'delete': 46,
        home: 36, end: 35,
        pageup: 33, pagedown: 34,
        ',': 188, '.': 190, '/': 191,
        '`': 192, '-': 189, '=': 187,
        ';': 186, '\'': 222,
        '[': 219, ']': 221, '\\': 220
      };
  
    for(k=1;k<20;k++) _MODIFIERS['f'+k] = 111+k;
  
    // IE doesn't support Array#indexOf, so have a simple replacement
    function index(array, item){
      var i = array.length;
      while(i--) if(array[i]===item) return i;
      return -1;
    }
  
    // handle keydown event
    function dispatch(event){
      var key, tagName, handler, k, i, modifiersMatch;
      tagName = (event.target || event.srcElement).tagName;
      key = event.keyCode;
  
      // if a modifier key, set the key.<modifierkeyname> property to true and return
      if(key == 93 || key == 224) key = 91; // right command on webkit, command on Gecko
      if(key in _mods) {
        _mods[key] = true;
        // 'assignKey' from inside this closure is exported to window.key
        for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = true;
        return;
      }
  
      // ignore keypressed in any elements that support keyboard data input
      if (tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA') return;
  
      // abort if no potentially matching shortcuts found
      if (!(key in _handlers)) return;
  
      // for each potential shortcut
      for (i = 0; i < _handlers[key].length; i++) {
        handler = _handlers[key][i];
  
        // see if it's in the current scope
        if(handler.scope == _scope || handler.scope == 'all'){
          // check if modifiers match if any
          modifiersMatch = handler.mods.length > 0;
          for(k in _mods)
            if((!_mods[k] && index(handler.mods, +k) > -1) ||
              (_mods[k] && index(handler.mods, +k) == -1)) modifiersMatch = false;
          // call the handler and stop the event if neccessary
          if((handler.mods.length == 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91]) || modifiersMatch){
            if(handler.method(event, handler)===false){
              if(event.preventDefault) event.preventDefault();
                else event.returnValue = false;
              if(event.stopPropagation) event.stopPropagation();
              if(event.cancelBubble) event.cancelBubble = true;
            }
          }
        }
  	}
    };
  
    // unset modifier keys on keyup
    function clearModifier(event){
      var key = event.keyCode, k;
      if(key == 93 || key == 224) key = 91;
      if(key in _mods) {
        _mods[key] = false;
        for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = false;
      }
    };
  
    // parse and assign shortcut
    function assignKey(key, scope, method){
      var keys, mods, i, mi;
      if (method === undefined) {
        method = scope;
        scope = 'all';
      }
      key = key.replace(/\s/g,'');
      keys = key.split(',');
  
      if((keys[keys.length-1])=='')
        keys[keys.length-2] += ',';
      // for each shortcut
      for (i = 0; i < keys.length; i++) {
        // set modifier keys if any
        mods = [];
        key = keys[i].split('+');
        if(key.length > 1){
          mods = key.slice(0,key.length-1);
          for (mi = 0; mi < mods.length; mi++)
            mods[mi] = _MODIFIERS[mods[mi]];
          key = [key[key.length-1]];
        }
        // convert to keycode and...
        key = key[0]
        key = _MAP[key] || key.toUpperCase().charCodeAt(0);
        // ...store handler
        if (!(key in _handlers)) _handlers[key] = [];
        _handlers[key].push({ shortcut: keys[i], scope: scope, method: method, key: keys[i], mods: mods });
      }
    };
  
    // initialize key.<modifier> to false
    for(k in _MODIFIERS) assignKey[k] = false;
  
    // set current scope (default 'all')
    function setScope(scope){ _scope = scope || 'all' };
  
    // cross-browser events
    function addEvent(object, event, method) {
      if (object.addEventListener)
        object.addEventListener(event, method, false);
      else if(object.attachEvent)
        object.attachEvent('on'+event, function(){ method(window.event) });
    };
  
    // set the handlers globally on document
    addEvent(document, 'keydown', dispatch);
    addEvent(document, 'keyup', clearModifier);
  
    // set window.key and window.key.setScope
    global.key = assignKey;
    global.key.setScope = setScope;
  
    if(typeof module !== 'undefined') module.exports = key;
  
  })(this);
  

  provide("keymaster", module.exports);

  !function ($) {
    $.ender({
      key: require('keymaster')
    })
  }(ender)

}();