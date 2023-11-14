require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"Buttons":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Button = (function(superClass) {
  extend(Button, superClass);

  function Button(options) {
    var guard;
    this.options = options != null ? options : {};
    this.HoverOff = bind(this.HoverOff, this);
    this.Hover = bind(this.Hover, this);
    guard = new Layer({
      size: 10,
      backgroundColor: "null"
    });
    guard.states = {
      "pressed": {
        opacity: 0
      },
      "normal": {
        opacity: 0
      }
    };
    guard.on(Events.StateSwitchEnd, function(from, to) {
      if (from !== to) {
        return this.parent.animate(to);
      }
    });
    _.defaults(this.options, {
      handler: null,
      guard: null,
      scaleTo: 0.9
    });
    Button.__super__.constructor.call(this, this.options);
    this.states = {
      "pressed": {
        scale: this.scaleTo
      },
      "normal": {
        scale: 1.0
      }
    };
    guard.parent = this;
    this.guard = guard;
    this.onTouchStart(this.Hover);
    this.onTouchEnd(this.HoverOff);
    this.onSwipeStart(this.HoverOff);
    this.onDragStart(this.HoverOff);
  }

  Button.prototype.Hover = function() {
    return this.guard.stateSwitch("pressed");
  };

  Button.prototype.HoverOff = function() {
    return this.guard.stateSwitch("normal");
  };

  Button.define('guard', {
    get: function() {
      return this.options.guard;
    },
    set: function(value) {
      return this.options.guard = value;
    }
  });

  Button.define('scaleTo', {
    get: function() {
      return this.options.scaleTo;
    },
    set: function(value) {
      return this.options.scaleTo = value;
    }
  });

  Button.define('handler', {
    set: function(value) {
      return this.on(Events.Tap, value);
    }
  });

  return Button;

})(Layer);


},{}],"Device_Class":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Device_Class = (function(superClass) {
  extend(Device_Class, superClass);

  function Device_Class(options) {
    this.options = options != null ? options : {};
    this.initBorderViewCss = bind(this.initBorderViewCss, this);
    this.animateStateToFill = bind(this.animateStateToFill, this);
    this.animateStateToNormal = bind(this.animateStateToNormal, this);
    this.stateSwitchToFill = bind(this.stateSwitchToFill, this);
    this.stateSwitchToNormal = bind(this.stateSwitchToNormal, this);
    _.defaults(this.options, {
      backgroundColor: "000",
      view: null
    });
    Device_Class.__super__.constructor.call(this, this.options);
    this.states = {
      "normal": {
        scale: 1
      },
      "fill": {
        scale: 1
      }
    };
    this.initBorderViewCss();
    this.sendToBack();
  }

  Device_Class.define('view', {
    get: function() {
      return this.options.view;
    },
    set: function(value) {
      this.options.view = value;
      this.options.width = value.width + 16 * 2;
      this.options.height = value.height + 16 * 2;
      return this.borderRadius = value.borderRadius + 16;
    }
  });

  Device_Class.prototype.stateSwitchToNormal = function() {
    return this.animate({
      scale: this.states["normal"].scale,
      options: {
        curve: Bezier.linear,
        time: 0
      }
    });
  };

  Device_Class.prototype.stateSwitchToFill = function() {
    return this.animate({
      scale: this.states["fill"].scale,
      options: {
        curve: Bezier.linear,
        time: 0
      }
    });
  };

  Device_Class.prototype.animateStateToNormal = function() {
    return this.animate({
      scale: this.states["normal"].scale,
      options: {
        curve: Spring({
          damping: 1
        }),
        time: 0.5
      }
    });
  };

  Device_Class.prototype.animateStateToFill = function() {
    return this.animate({
      scale: this.states["fill"].scale,
      options: {
        curve: Spring({
          damping: 1
        }),
        time: 0.5
      }
    });
  };

  Device_Class.prototype.initBorderViewCss = function() {
    var css;
    this.classList.add("iphone-tilllur-v");
    css = ".iphone-tilllur-v {\n	background: linear-gradient(\n	160.74deg,\n	rgba(36, 36, 36, 0.3) 24.39%,\n	rgba(28, 28, 28, 0.3) 29.47%,\n	rgba(10, 10, 10, 0.3) 99.85%\n	),\n	linear-gradient(\n	180deg,\n	rgba(2, 2, 2, 0.6) -0.21%,\n	rgba(21, 21, 21, 0.6) 6.52%,\n	rgba(6, 6, 6, 0.6) 99.79%\n	),\n	#5a5a5a;\nbox-shadow: 8px 14px 20px rgba(0, 0, 0, 0.25),\n	inset 0px -4px 16px rgba(255, 255, 255, 0.1),\n	inset 4px 0px 4px rgba(255, 255, 255, 0.1),\n	inset -4px 0px 4px rgba(0, 0, 0, 0.7);\n\n}";
    return Utils.insertCSS(css);
  };

  return Device_Class;

})(Layer);


},{}],"HomeBar_Class":[function(require,module,exports){
var device_assets,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.HomeBar_Class = (function(superClass) {
  extend(HomeBar_Class, superClass);

  function HomeBar_Class(options) {
    this.options = options != null ? options : {};
    this.createHomeIndicator = bind(this.createHomeIndicator, this);
    this.create = bind(this.create, this);
    this.viewSize = bind(this.viewSize, this);
    _.defaults(this.options, {
      parent: this.view,
      width: this.view.width,
      theme: this.view.homeBar_theme,
      height: 34,
      y: Align.bottom,
      name: ".home bar",
      backgroundColor: null
    });
    HomeBar_Class.__super__.constructor.call(this, this.options);
    this.create();
  }

  HomeBar_Class.define('view', {
    get: function() {
      return this.options.view;
    },
    set: function(value) {
      return this.options.view = value;
    }
  });

  HomeBar_Class.define('theme', {
    get: function() {
      return this.options.theme;
    },
    set: function(value) {
      return this.options.theme = value;
    }
  });

  HomeBar_Class.prototype.viewSize = function(w, h) {
    return this.view.width === w && this.view.height === h;
  };

  HomeBar_Class.prototype.create = function() {
    if (this.viewSize(375, 812) || this.viewSize(390, 844) || this.viewSize(414, 896) || this.viewSize(428, 926) || this.viewSize(360, 782) || this.viewSize(393, 852)) {
      return this.createHomeIndicator();
    }
  };

  HomeBar_Class.prototype.createHomeIndicator = function() {
    return new Layer({
      name: ".homeView",
      parent: this,
      width: 135,
      height: 5,
      x: Align.center,
      y: Align.bottom(-8),
      backgroundColor: device_assets.color[this.theme],
      borderRadius: 20
    });
  };

  return HomeBar_Class;

})(Layer);

device_assets = {
  color: {
    dark: "#000",
    light: "#FFF"
  }
};


},{}],"Logo":[function(require,module,exports){
var getLogo,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.LogoLayer = (function(superClass) {
  extend(LogoLayer, superClass);

  function LogoLayer(options) {
    this.options = options != null ? options : {};
    this.HoverOff = bind(this.HoverOff, this);
    this.Hover = bind(this.Hover, this);
    _.defaults(this.options, {
      opacity: 0.5,
      handler: null,
      svg: getLogo("FFF")
    });
    LogoLayer.__super__.constructor.call(this, this.options);
    this.style = {
      cursor: "pointer"
    };
    this.showHint = function() {};
    this.onMouseOver(this.Hover);
    this.onMouseOut(this.HoverOff);
  }

  LogoLayer.define('handler', {
    set: function(value) {
      return this.on(Events.Tap, value);
    }
  });

  LogoLayer.prototype.Hover = function() {
    return this.opacity = 0.8;
  };

  LogoLayer.prototype.HoverOff = function() {
    return this.opacity = 0.5;
  };

  return LogoLayer;

})(SVGLayer);

getLogo = function(withColor) {
  var selectedColor;
  selectedColor = "#FFFFFF";
  return "<svg width=\"76\" height=\"32\" viewBox=\"0 0 76 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M2.79199 21.6C2.79199 21.168 2.90399 20.408 3.12799 19.32L4.39999 12.84H2.98399L3.07999 12.12C4.99999 11.544 6.88799 10.552 8.74399 9.14398H9.89599L9.31999 11.76H11.192L10.976 12.84H9.12799L7.90399 19.32C7.69599 20.312 7.59199 20.976 7.59199 21.312C7.59199 22.08 7.92799 22.544 8.59999 22.704C8.43999 23.248 8.07199 23.68 7.49599 24C6.91999 24.32 6.22399 24.48 5.40799 24.48C4.59199 24.48 3.95199 24.224 3.48799 23.712C3.02399 23.2 2.79199 22.496 2.79199 21.6Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M17.5599 22.68C17.0639 23.88 16.0239 24.48 14.4399 24.48C13.6239 24.48 12.9599 24.2 12.4479 23.64C12.0159 23.144 11.7999 22.648 11.7999 22.152C11.7999 20.856 12.0959 18.944 12.6879 16.416L13.5759 11.76L18.4479 11.28L16.9839 18.864C16.7119 20.048 16.5759 20.848 16.5759 21.264C16.5759 22.176 16.9039 22.648 17.5599 22.68ZM14.0079 8.42398C14.0079 7.79998 14.2639 7.31998 14.7759 6.98398C15.3039 6.64798 15.9439 6.47998 16.6959 6.47998C17.4479 6.47998 18.0479 6.64798 18.4959 6.98398C18.9599 7.31998 19.1919 7.79998 19.1919 8.42398C19.1919 9.04798 18.9359 9.51998 18.4239 9.83998C17.9279 10.16 17.3039 10.32 16.5519 10.32C15.7999 10.32 15.1839 10.16 14.7039 9.83998C14.2399 9.51998 14.0079 9.04798 14.0079 8.42398Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M26.0606 22.68C25.5646 23.88 24.5246 24.48 22.9406 24.48C22.1406 24.48 21.4846 24.2 20.9726 23.64C20.5566 23.176 20.3486 22.68 20.3486 22.152C20.3486 20.952 20.6286 19.04 21.1886 16.416L22.9406 7.19998L27.8126 6.71998L25.4846 18.864C25.2126 20.048 25.0766 20.848 25.0766 21.264C25.0766 22.176 25.4046 22.648 26.0606 22.68Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M34.5618 22.68C34.0658 23.88 33.0258 24.48 31.4418 24.48C30.6418 24.48 29.9858 24.2 29.4738 23.64C29.0578 23.176 28.8498 22.68 28.8498 22.152C28.8498 20.952 29.1298 19.04 29.6898 16.416L31.4418 7.19998L36.3138 6.71998L33.9858 18.864C33.7138 20.048 33.5778 20.848 33.5778 21.264C33.5778 22.176 33.9058 22.648 34.5618 22.68Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M43.0631 22.68C42.5671 23.88 41.5271 24.48 39.9431 24.48C39.1431 24.48 38.4871 24.2 37.9751 23.64C37.5591 23.176 37.3511 22.68 37.3511 22.152C37.3511 20.952 37.6311 19.04 38.1911 16.416L39.9431 7.19998L44.8151 6.71998L42.4871 18.864C42.2151 20.048 42.0791 20.848 42.0791 21.264C42.0791 22.176 42.4071 22.648 43.0631 22.68Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M53.5323 22.992C52.7643 23.984 51.4283 24.48 49.5243 24.48C48.5323 24.48 47.6763 24.184 46.9563 23.592C46.2363 22.984 45.8763 22.248 45.8763 21.384C45.8763 20.904 45.9003 20.544 45.9483 20.304L47.5563 11.76L52.4283 11.28L50.6763 20.544C50.6123 20.896 50.5803 21.176 50.5803 21.384C50.5803 22.312 50.8603 22.776 51.4203 22.776C52.0443 22.776 52.5803 22.352 53.0283 21.504C53.1723 21.232 53.2763 20.92 53.3403 20.568L55.0443 11.76L59.7723 11.28L57.9963 20.64C57.9483 20.88 57.9243 21.128 57.9243 21.384C57.9243 21.64 57.9963 21.912 58.1403 22.2C58.2843 22.472 58.5883 22.64 59.0523 22.704C58.9563 23.088 58.7403 23.408 58.4043 23.664C57.7003 24.208 56.9643 24.48 56.1963 24.48C55.4443 24.48 54.8443 24.344 54.3963 24.072C53.9483 23.8 53.6603 23.44 53.5323 22.992Z\" fill=\"" + selectedColor + "\"/>\n<path d=\"M69.2947 17.256C69.8707 16.232 70.1587 15.2 70.1587 14.16C70.1587 13.472 69.9107 13.128 69.4147 13.128C69.0307 13.128 68.6387 13.456 68.2387 14.112C67.8227 14.768 67.5507 15.52 67.4227 16.368L66.1747 24L61.2067 24.48L63.6547 11.76L67.6147 11.28L67.1827 13.704C67.9667 12.088 69.2387 11.28 70.9987 11.28C71.9267 11.28 72.6387 11.52 73.1347 12C73.6467 12.48 73.9027 13.216 73.9027 14.208C73.9027 15.184 73.5747 15.984 72.9187 16.608C72.2787 17.232 71.4067 17.544 70.3027 17.544C69.8227 17.544 69.4867 17.448 69.2947 17.256Z\" fill=\"" + selectedColor + "\"/>\n</svg>";
};


},{}],"NavigationComponent":[function(require,module,exports){
var Button, FlowView, ModalView, NavigationView, Preview_Class,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Button = require("Buttons").Button;

Preview_Class = require("Preview_Class").Preview_Class;

FlowView = (function(superClass) {
  extend(FlowView, superClass);

  function FlowView(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, FlowView.__super__.constructor.call(this, this.options));
    if (this.parent) {
      this.width = this.parent.width;
      this.height = this.parent.height;
    }
    this.on(Events.TransitionStart, function(layerA, layerB) {
      if (layerB !== void 0 && layerB.custom !== void 0 && layerB.custom.customAction_Array !== void 0) {
        this.iterateThroughChildren(layerB, layerB.custom.customAction_Array, this.customAction_switchOnLayers);
      }
      if (layerA !== void 0 && layerA.custom !== void 0 && layerA.custom.customAction_Array !== void 0) {
        return this.iterateThroughChildren(layerA, layerA.custom.customAction_Array, this.customAction_switchOffLayers);
      }
    });
  }

  FlowView.define("parent", {
    enumerable: false,
    exportable: false,
    importable: true,
    get: function() {
      return this._parent || null;
    },
    set: function(layer) {
      var oldParent;
      if (layer === this._parent) {
        return;
      }
      if (layer === this) {
        throw Error("Layer.parent: a layer cannot be it's own parent.");
      }
      if (!layer instanceof Layer) {
        throw Error("Layer.parent needs to be a Layer object");
      }
      Utils.domCompleteCancel(this.__insertElement);
      if (this._parent) {
        this._parent._children = _.pull(this._parent._children, this);
        this._parent._element.removeChild(this._element);
        this._parent.emit("change:children", {
          added: [],
          removed: [this]
        });
        this._parent.emit("change:subLayers", {
          added: [],
          removed: [this]
        });
      }
      if (layer) {
        layer._element.appendChild(this._element);
        layer._children.push(this);
        layer.emit("change:children", {
          added: [this],
          removed: []
        });
        layer.emit("change:subLayers", {
          added: [this],
          removed: []
        });
      } else {
        this._insertElement();
      }
      oldParent = this._parent;
      this._parent = layer;
      this.bringToFront();
      this.emit("change:parent", this._parent, oldParent);
      this.emit("change:superLayer", this._parent, oldParent);
      this.width = layer.width;
      return this.height = layer.height;
    }
  });

  FlowView.prototype.stackTransition = function(nav, layerA, layerB, overlay) {
    var transition;
    return transition = {
      layerA: {
        show: {
          x: 0,
          y: 0
        },
        hide: {
          x: 0 - (layerA != null ? layerA.width : void 0) / 2,
          y: 0
        }
      },
      layerB: {
        show: {
          x: 0,
          y: 0
        },
        hide: {
          x: layerB.width,
          y: 0
        }
      },
      overlay: {
        show: {
          opacity: .5,
          x: 0,
          y: 0,
          size: nav.size
        },
        hide: {
          opacity: 0,
          x: 0,
          y: 0,
          size: nav.size
        }
      }
    };
  };

  FlowView.prototype.modalTransition = function(nav, layerA, layerB, overlay) {
    var transition;
    return transition = {
      layerA: {
        show: {
          x: 0,
          y: 0
        },
        hide: {
          x: 0,
          y: 0
        }
      },
      layerB: {
        show: {
          x: 0,
          y: 0
        },
        hide: {
          x: 0,
          y: (layerA != null ? layerA.height : void 0) + 10
        }
      },
      overlay: {
        show: {
          opacity: .5,
          x: 0,
          y: 0,
          size: nav.size
        },
        hide: {
          opacity: 0,
          x: 0,
          y: 0,
          size: nav.size
        }
      }
    };
  };

  FlowView.prototype.customAction_switchOnLayers = function(layer, box, flow) {
    var index, layerToCheck;
    layerToCheck = layer;
    index = box.indexOf(layerToCheck);
    if (index !== -1) {
      layer.ignoreEvents = false;
      return box.splice(index, 1);
    }
  };

  FlowView.prototype.customAction_switchOffLayers = function(layer, box, flow) {
    if (flow.shouldShowHintOverride(layer)) {
      box.push(layer);
      return layer.ignoreEvents = true;
    }
  };

  FlowView.prototype.shouldShowHintOverride = function(layer) {
    var eventName, i, len, ref;
    if (layer.ignoreEvents === true) {
      return false;
    }
    if (layer._draggable && layer._draggable.horizontal === false && layer._draggable.vertical === false) {
      return false;
    }
    if (layer.opacity === 0) {
      return false;
    }
    ref = layer.listenerEvents();
    for (i = 0, len = ref.length; i < len; i++) {
      eventName = ref[i];
      if (Events.isInteractive(eventName)) {
        return true;
      }
    }
    return false;
  };

  FlowView.prototype.iterateThroughChildren = function(layer, box, actionCallback) {
    var child, i, len, ref, results;
    actionCallback(layer, box, this);
    ref = layer.children;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      child = ref[i];
      results.push(this.iterateThroughChildren(child, box, actionCallback));
    }
    return results;
  };

  FlowView.prototype.open = function(navigationView) {
    navigationView.scrollToTop(false);
    if (navigationView.wrapper !== void 0 && navigationView.wrapper !== null) {
      return this.transition(navigationView.parent, this.modalTransition);
    } else {
      return this.transition(navigationView, this.stackTransition);
    }
  };

  return FlowView;

})(FlowComponent);

ModalView = (function(superClass) {
  extend(ModalView, superClass);

  function ModalView(options) {
    var navigationView_Wrapper;
    this.options = options != null ? options : {};
    navigationView_Wrapper = new Layer({
      name: "wrapper",
      backgroundColor: null,
      custom: {
        customAction_Array: []
      }
    });
    navigationView_Wrapper.on(Events.Tap, function() {
      return this.children[0].flow.showPrevious();
    });
    _.defaults(this.options, {
      flow: null,
      wrapper: navigationView_Wrapper,
      scrollVertical: true,
      scrollHorizontal: false,
      directionLock: true
    });
    ModalView.__super__.constructor.call(this, this.options);
    this.parent = navigationView_Wrapper;
    this.on(Events.Tap, function(event, layer) {
      return event.stopPropagation();
    });
    this.on(Events.SwipeDownStart, function(event, layer) {
      if (this.scrollY < 0) {
        return this.flow.showPrevious();
      }
    });
    if (this.flow) {
      this.flow.showNext(this.wrapper);
      this.flow.showPrevious({
        animate: false
      });
    }
  }

  ModalView.define('flow', {
    get: function() {
      return this.options.flow;
    }
  });

  ModalView.define('wrapper', {
    get: function() {
      return this.options.wrapper;
    },
    set: function(value) {
      return this.options.wrapper = value;
    }
  });

  ModalView.define("parent", {
    enumerable: false,
    exportable: false,
    importable: true,
    get: function() {
      return this._parent || null;
    },
    set: function(layer) {
      var oldParent;
      if (layer !== this.wrapper) {
        this.options.flow = layer;
        this.wrapper.parent = layer;
        this.wrapper.width = layer.width;
        this.wrapper.height = layer.height;
        this.width = layer.width;
        this.height = layer.height;
        return;
      }
      if (layer === this._parent) {
        return;
      }
      if (layer === this) {
        throw Error("Layer.parent: a layer cannot be it's own parent.");
      }
      if (!layer instanceof Layer) {
        throw Error("Layer.parent needs to be a Layer object");
      }
      Utils.domCompleteCancel(this.__insertElement);
      if (this._parent) {
        this._parent._children = _.pull(this._parent._children, this);
        this._parent._element.removeChild(this._element);
        this._parent.emit("change:children", {
          added: [],
          removed: [this]
        });
        this._parent.emit("change:subLayers", {
          added: [],
          removed: [this]
        });
      }
      if (layer) {
        layer._element.appendChild(this._element);
        layer._children.push(this);
        layer.emit("change:children", {
          added: [this],
          removed: []
        });
        layer.emit("change:subLayers", {
          added: [this],
          removed: []
        });
      } else {
        this._insertElement();
      }
      oldParent = this._parent;
      this._parent = layer;
      this.bringToFront();
      this.emit("change:parent", this._parent, oldParent);
      return this.emit("change:superLayer", this._parent, oldParent);
    }
  });

  ModalView.prototype.add = function(contentView) {
    contentView.parent = this.custom.view.content;
    return this.backgroundColor = null;
  };

  return ModalView;

})(ScrollComponent);

NavigationView = (function(superClass) {
  extend(NavigationView, superClass);

  function NavigationView(options) {
    this.options = options != null ? options : {};
    this.create_BackButton = bind(this.create_BackButton, this);
    _.defaults(this.options, {
      flow: null,
      backButton: null,
      showBack: true,
      scrollVertical: true,
      scrollHorizontal: false,
      directionLock: true,
      custom: {
        backButton_name: "Back_Button",
        customAction_Array: []
      }
    });
    NavigationView.__super__.constructor.call(this, this.options);
    try {
      this.backButton.bringToFront();
    } catch (error) {}
    this.on(Events.SwipeRightStart, (function(_this) {
      return function(event, layer) {
        try {
          return _this.flow.showPrevious();
        } catch (error) {}
      };
    })(this));
    this.on("change:children", function() {
      try {
        return this.backButton.bringToFront();
      } catch (error) {}
    });
  }

  NavigationView.define('flow', {
    get: function() {
      return this.options.flow;
    },
    set: function(value) {
      this.options.flow = value;
      value.showNext(this);
      return value.showPrevious({
        animate: false
      });
    }
  });

  NavigationView.define('backButton', {
    get: function() {
      return this.options.backButton;
    },
    set: function(value) {
      this.options.backButton = value;
      value.name = this.custom.backButton_name;
      value.parent = this;
      value.bringToFront();
      try {
        return value.handler = (function(_this) {
          return function() {
            return _this.flow.showPrevious();
          };
        })(this);
      } catch (error) {}
    }
  });

  NavigationView.define('showBack', {
    get: function() {
      return this.options.showBack;
    },
    set: function(value) {
      this.options.showBack = value;
      if (value === true && this.backButton === null) {
        return this.backButton = this.create_BackButton();
      }
    }
  });

  NavigationView.prototype.create_BackButton = function() {
    return new Button({
      name: this.custom.backButton_name,
      parent: this,
      size: 80,
      y: 32,
      backgroundColor: null,
      handler: function() {
        return this.parent.flow.showPrevious();
      }
    });
  };

  NavigationView.define("parent", {
    enumerable: false,
    exportable: false,
    importable: true,
    get: function() {
      return this._parent || null;
    },
    set: function(layer) {
      var oldParent;
      if (layer === this._parent) {
        return;
      }
      if (layer === this) {
        throw Error("Layer.parent: a layer cannot be it's own parent.");
      }
      if (!layer instanceof Layer) {
        throw Error("Layer.parent needs to be a Layer object");
      }
      Utils.domCompleteCancel(this.__insertElement);
      if (this._parent) {
        this._parent._children = _.pull(this._parent._children, this);
        this._parent._element.removeChild(this._element);
        this._parent.emit("change:children", {
          added: [],
          removed: [this]
        });
        this._parent.emit("change:subLayers", {
          added: [],
          removed: [this]
        });
      }
      if (layer) {
        layer._element.appendChild(this._element);
        layer._children.push(this);
        layer.emit("change:children", {
          added: [this],
          removed: []
        });
        layer.emit("change:subLayers", {
          added: [this],
          removed: []
        });
      } else {
        this._insertElement();
      }
      oldParent = this._parent;
      this._parent = layer;
      this.bringToFront();
      this.emit("change:parent", this._parent, oldParent);
      this.emit("change:superLayer", this._parent, oldParent);
      this.width = this.parent.width;
      this.height = this.parent.height;
      return this.flow = this.parent;
    }
  });

  NavigationView.prototype.add = function(contentView) {
    return contentView.parent = this.content;
  };

  return NavigationView;

})(ScrollComponent);

module.exports = {
  FlowView: FlowView,
  NavigationView: NavigationView,
  ModalView: ModalView
};


},{"Buttons":"Buttons","Preview_Class":"Preview_Class"}],"PreviewComponent":[function(require,module,exports){
var FixPreviewExport, Preview_UI,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Framer.Defaults.Animation = {
  curve: Spring({
    damping: 1
  }),
  time: 0.5
};

Preview_UI = require("Preview_UI").Preview_UI;

FixPreviewExport = (function(superClass) {
  extend(FixPreviewExport, superClass);

  function FixPreviewExport() {
    return FixPreviewExport.__super__.constructor.apply(this, arguments);
  }

  return FixPreviewExport;

})(Preview_UI);

exports.Preview = (function(superClass) {
  extend(Preview, superClass);

  function Preview() {
    return Preview.__super__.constructor.apply(this, arguments);
  }

  return Preview;

})(FixPreviewExport);

window.savePreviewMessageFramerObject = function (layer) {
	window.previewMessageFramerObject = layer
}
;

window.receiveMessageNormal = function (event) {
	window.previewMessageFramerObject.animateStateToNormal()
}
window.addEventListener("animateNormal", receiveMessageNormal, false);
;

window.receiveMessage = function (event) {
	console.log(event)
	window.previewMessageFramerObject.animateStateToFill()
}
window.addEventListener("animateFill", receiveMessage, false);
;


},{"Preview_UI":"Preview_UI"}],"Preview_Class":[function(require,module,exports){
var overrideTimeValue,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

overrideTimeValue = "20:21";

exports.Preview_Class = (function(superClass) {
  extend(Preview_Class, superClass);

  function Preview_Class(options) {
    var stateGuardLayer;
    this.options = options != null ? options : {};
    this.getStateGeneric = bind(this.getStateGeneric, this);
    this.updateInit = bind(this.updateInit, this);
    this.stateSwitchToFill = bind(this.stateSwitchToFill, this);
    this.stateSwitchToNormal = bind(this.stateSwitchToNormal, this);
    this.animateStateToFill = bind(this.animateStateToFill, this);
    this.animateStateToNormal = bind(this.animateStateToNormal, this);
    stateGuardLayer = new Layer({
      opacity: 0,
      size: 1
    });
    stateGuardLayer.states = {
      "normal": {
        scale: 1
      },
      "fill": {
        scale: 1
      }
    };
    stateGuardLayer.stateSwitch("fill");
    _.defaults(this.options, {
      name: "Preview",
      backgroundColor: null,
      borderRadius: 42,
      stateGuard: stateGuardLayer,
      view: null,
      borderView: null,
      statusBarView: null,
      homeBarView: null,
      configView: null,
      sectionView: null,
      showDevice: true,
      showBars: true,
      showStatusBar: true,
      showHomeBar: true,
      timeValue: overrideTimeValue,
      forceAndroidBar: false,
      statusBar_theme: "dark",
      homeBar_theme: "dark",
      showUI: true,
      showLogo: true,
      scaleState: "fill",
      showHints: true
    });
    Preview_Class.__super__.constructor.call(this, this.options);
    window.savePreviewMessageFramerObject(this);
    this.updateInit();
    this.states = {
      "normal": {
        scale: 1
      },
      "fill": {
        scale: 1
      }
    };
  }

  Preview_Class.define('view', {
    get: function() {
      return this.options.view;
    },
    set: function(value) {
      this.options.view = value;
      this.width = this.view.width;
      this.height = this.view.height;
      return this.view.parent = this;
    }
  });

  Preview_Class.define('stateGuard', {
    get: function() {
      return this.options.stateGuard;
    },
    set: function(value) {
      return this.options.stateGuard = value;
    }
  });

  Preview_Class.define('device', {
    get: function() {
      return this.options.borderView;
    }
  });

  Preview_Class.define('statusBar', {
    get: function() {
      return this.options.statusBarView;
    }
  });

  Preview_Class.define('homeBar', {
    get: function() {
      return this.options.homeBarView;
    }
  });

  Preview_Class.define('borderView', {
    get: function() {
      return this.options.borderView;
    },
    set: function(value) {
      return this.options.borderView = value;
    }
  });

  Preview_Class.define('statusBarView', {
    get: function() {
      return this.options.statusBarView;
    },
    set: function(value) {
      return this.options.statusBarView = value;
    }
  });

  Preview_Class.define('homeBarView', {
    get: function() {
      return this.options.homeBarView;
    },
    set: function(value) {
      return this.options.homeBarView = value;
    }
  });

  Preview_Class.define('configView', {
    get: function() {
      return this.options.configView;
    },
    set: function(value) {
      return this.options.configView = value;
    }
  });

  Preview_Class.define('sectionView', {
    get: function() {
      return this.options.sectionView;
    },
    set: function(value) {
      return this.options.sectionView = value;
    }
  });

  Preview_Class.prototype.animateStateToNormal = function() {
    this.stateGuard.stateSwitch("normal");
    this.animate({
      scale: this.states["normal"].scale,
      options: {
        curve: Spring({
          damping: 1
        }),
        time: 0.5
      }
    });
    if (this.borderView) {
      return this.borderView.animateStateToNormal();
    }
  };

  Preview_Class.prototype.animateStateToFill = function() {
    this.stateGuard.stateSwitch("fill");
    this.animate({
      scale: this.states["fill"].scale,
      options: {
        curve: Spring({
          damping: 1
        }),
        time: 0.5
      }
    });
    if (this.borderView) {
      return this.borderView.animateStateToFill();
    }
  };

  Preview_Class.prototype.stateSwitchToNormal = function() {
    this.stateGuard.stateSwitch("normal");
    this.animate({
      scale: this.states["normal"].scale,
      options: {
        curve: Bezier.linear,
        time: 0
      }
    });
    if (this.borderView) {
      return this.borderView.stateSwitchToNormal();
    }
  };

  Preview_Class.prototype.stateSwitchToFill = function() {
    this.stateGuard.stateSwitch("fill");
    this.animate({
      scale: this.states["fill"].scale,
      options: {
        curve: Bezier.linear,
        time: 0
      }
    });
    if (this.borderView) {
      return this.borderView.stateSwitchToFill();
    }
  };

  Preview_Class.define('showDevice', {
    get: function() {
      return this.options.showDevice;
    },
    set: function(value) {
      return this.options.showDevice = value;
    }
  });

  Preview_Class.define('showBars', {
    get: function() {
      return this.options.showBars;
    },
    set: function(value) {
      return this.options.showBars = value;
    }
  });

  Preview_Class.define('showStatusBar', {
    get: function() {
      return this.options.showStatusBar;
    },
    set: function(value) {
      return this.options.showStatusBar = value;
    }
  });

  Preview_Class.define('showHomeBar', {
    get: function() {
      return this.options.showHomeBar;
    },
    set: function(value) {
      return this.options.showHomeBar = value;
    }
  });

  Preview_Class.define('timeValue', {
    get: function() {
      return this.options.timeValue;
    },
    set: function(value) {
      return this.options.timeValue = value;
    }
  });

  Preview_Class.define('forceAndroidBar', {
    get: function() {
      return this.options.forceAndroidBar;
    },
    set: function(value) {
      return this.options.forceAndroidBar = value;
    }
  });

  Preview_Class.define('statusBar_theme', {
    get: function() {
      return this.options.statusBar_theme;
    },
    set: function(value) {
      return this.options.statusBar_theme = value;
    }
  });

  Preview_Class.define('homeBar_theme', {
    get: function() {
      return this.options.homeBar_theme;
    },
    set: function(value) {
      return this.options.homeBar_theme = value;
    }
  });

  Preview_Class.define('showUI', {
    get: function() {
      return this.options.showUI;
    },
    set: function(value) {
      return this.options.showUI = value;
    }
  });

  Preview_Class.define('showLogo', {
    get: function() {
      return this.options.showLogo;
    },
    set: function(value) {
      return this.options.showLogo = value;
    }
  });

  Preview_Class.define('showHints', {
    get: function() {
      return this.options.showHints;
    },
    set: function(value) {
      return this.options.showHints = value;
    }
  });

  Preview_Class.define('scaleState', {
    get: function() {
      return this.options.scaleState;
    },
    set: function(value) {
      return this.options.scaleState = value;
    }
  });

  Preview_Class.prototype.updateInit = function() {
    this.scaleState = this.getStateGeneric("scale", [
      {
        value: "fill",
        result: "fill"
      }, {
        value: "normal",
        result: "normal"
      }, {
        value: "false",
        result: "normal"
      }, {
        value: "true",
        result: "fill"
      }
    ], this.scaleState);
    this.scaleState = this.getStateGeneric("fill", [
      {
        value: "on",
        result: "fill"
      }, {
        value: "off",
        result: "normal"
      }, {
        value: "true",
        result: "fill"
      }, {
        value: "false",
        result: "normal"
      }
    ], this.scaleState);
    this.showUI = this.getStateGeneric("button", [
      {
        value: "false",
        result: false
      }, {
        value: "true",
        result: true
      }, {
        value: "on",
        result: true
      }, {
        value: "off",
        result: false
      }
    ], this.showUI);
    this.showUI = this.getStateGeneric("ui", [
      {
        value: "false",
        result: false
      }, {
        value: "true",
        result: true
      }, {
        value: "on",
        result: true
      }, {
        value: "off",
        result: false
      }
    ], this.showUI);
    this.showLogo = this.getStateGeneric("logo", [
      {
        value: "false",
        result: false
      }, {
        value: "true",
        result: true
      }, {
        value: "on",
        result: true
      }, {
        value: "off",
        result: false
      }
    ], this.showLogo);
    this.showDevice = this.getStateGeneric("device", [
      {
        value: "off",
        result: false
      }, {
        value: "on",
        result: true
      }, {
        value: "false",
        result: false
      }, {
        value: "true",
        result: true
      }
    ], this.showDevice);
    return this.showHints = this.getStateGeneric("hints", [
      {
        value: "off",
        result: false
      }, {
        value: "on",
        result: true
      }, {
        value: "false",
        result: false
      }, {
        value: "true",
        result: true
      }
    ], this.showHints);
  };

  Preview_Class.prototype.getStateGeneric = function(stateKey, statePairs, defaultResult) {
    var i, item, j, keyPart, keyValuePair, len, len1, pair, ref, result, valuePart;
    if (stateKey == null) {
      stateKey = "scale";
    }
    if (statePairs == null) {
      statePairs = [];
    }
    if (defaultResult == null) {
      defaultResult = "";
    }
    result = defaultResult;
    ref = location.search.slice(1).split('&');
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      keyValuePair = item.split("=");
      keyPart = keyValuePair[0];
      valuePart = keyValuePair[1];
      if (keyPart === stateKey) {
        for (j = 0, len1 = statePairs.length; j < len1; j++) {
          pair = statePairs[j];
          if (valuePart === pair.value) {
            result = pair.result;
          }
        }
      }
    }
    return result;
  };

  return Preview_Class;

})(Layer);


},{}],"Preview_Init":[function(require,module,exports){
var Device_Class, HomeBar_Class, Preview_Class, StatusBar_Class,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Preview_Class = require("Preview_Class").Preview_Class;

Device_Class = require("Device_Class").Device_Class;

HomeBar_Class = require("HomeBar_Class").HomeBar_Class;

StatusBar_Class = require("StatusBar_Class").StatusBar_Class;

exports.Preview_Init = (function(superClass) {
  extend(Preview_Init, superClass);

  function Preview_Init(options) {
    this.options = options != null ? options : {};
    this.updatePreviewOnResize = bind(this.updatePreviewOnResize, this);
    this.updateScale = bind(this.updateScale, this);
    this.previewMobile = bind(this.previewMobile, this);
    this.previewDesktop = bind(this.previewDesktop, this);
    this.updatePreview = bind(this.updatePreview, this);
    this.scalePreview = bind(this.scalePreview, this);
    Preview_Init.__super__.constructor.call(this, this.options);
    this.scalePreview();
  }

  Preview_Init.prototype.scalePreview = function() {
    if (Utils.isMobile()) {
      return this.previewMobile();
    } else {
      return this.previewDesktop();
    }
  };

  Preview_Init.prototype.updatePreview = function() {
    if (this.stateGuard.states.current.name === "fill") {
      return this.stateSwitchToFill();
    } else {
      return this.stateSwitchToNormal();
    }
  };

  Preview_Init.prototype.previewDesktop = function() {
    if (this.showDevice) {
      this.borderView = new Device_Class({
        view: this
      });
    }
    if (this.showHints) {
      Framer.Extras.Hints.enable();
    } else {
      Framer.Extras.Hints.disable();
    }
    if (this.showBars) {
      if (this.showHomeBar) {
        this.homeBarView = new HomeBar_Class({
          view: this
        });
      }
      if (this.showStatusBar) {
        this.statusBarView = new StatusBar_Class({
          view: this
        });
      }
    }
    this.clip = true;
    this.updateScale();
    this.updatePreviewOnResize();
    if (this.scaleState === "fill") {
      return this.stateSwitchToFill();
    } else {
      return this.stateSwitchToNormal();
    }
  };

  Preview_Init.prototype.previewMobile = function() {
    Framer.Extras.Hints.disable();
    this.scale = Screen.width / this.width;
    this.x = Align.center;
    return this.y = Align.center;
  };

  Preview_Init.prototype.updateScale = function() {
    var scaleX, scaleY;
    this.x = Align.center;
    this.y = Align.center;
    if (this.borderView) {
      this.borderView.x = Align.center;
      this.borderView.y = Align.center;
    }
    scaleX = (Screen.width - 112) / this.width;
    scaleY = (Screen.height - 112) / this.height;
    this.states["fill"].scale = Math.min(scaleX, scaleY);
    if (this.borderView) {
      return this.borderView.states["fill"].scale = this.states["fill"].scale;
    }
  };

  Preview_Init.prototype.updatePreviewOnResize = function() {
    var localPreview;
    localPreview = this;
    Canvas.on("change:height", (function(_this) {
      return function() {
        localPreview.updateScale();
        return localPreview.updatePreview();
      };
    })(this));
    Canvas.on("change:width", (function(_this) {
      return function() {
        localPreview.updateScale();
        return localPreview.updatePreview();
      };
    })(this));
    Screen.on("change:height", (function(_this) {
      return function() {
        localPreview.updateScale();
        return localPreview.updatePreview();
      };
    })(this));
    return Screen.on("change:width", (function(_this) {
      return function() {
        localPreview.updateScale();
        return localPreview.updatePreview();
      };
    })(this));
  };

  return Preview_Init;

})(Preview_Class);


},{"Device_Class":"Device_Class","HomeBar_Class":"HomeBar_Class","Preview_Class":"Preview_Class","StatusBar_Class":"StatusBar_Class"}],"Preview_UI":[function(require,module,exports){
var LogoLayer, Preview_Init, UI_Config, UI_Section,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

LogoLayer = require("Logo").LogoLayer;

Preview_Init = require("Preview_Init").Preview_Init;

UI_Section = require("UI_Section").UI_Section;

UI_Config = require("UI_Config").UI_Config;

exports.Preview_UI = (function(superClass) {
  extend(Preview_UI, superClass);

  function Preview_UI(options) {
    this.options = options != null ? options : {};
    this.showHintsHandler = bind(this.showHintsHandler, this);
    this.hideHintsHandler = bind(this.hideHintsHandler, this);
    this.addConfig = bind(this.addConfig, this);
    this.addSection = bind(this.addSection, this);
    this.createLogoButton = bind(this.createLogoButton, this);
    this.showDesktopUI = bind(this.showDesktopUI, this);
    _.defaults(this.options, Preview_UI.__super__.constructor.call(this, this.options));
    this.showDesktopUI();
  }

  Preview_UI.prototype.showDesktopUI = function() {
    if (Utils.isMobile()) {
      return;
    }
    if (this.showLogo) {
      this.createLogoButton();
    }
    if (this.showUI) {
      return this.addConfig();
    }
  };

  Preview_UI.prototype.createLogoButton = function() {
    var logoButton, openHomeHandler;
    openHomeHandler = function() {
      return window.location = "https://tilllur.com";
    };
    return logoButton = new LogoLayer({
      width: 76,
      height: 32,
      x: Align.left(32),
      y: Align.top(12),
      handler: openHomeHandler
    });
  };

  Preview_UI.prototype.addSection = function(title, actionArray) {
    if (actionArray == null) {
      actionArray = [];
    }
    if (this.sectionView === null) {
      this.sectionView = new UI_Section;
    }
    return this.sectionView.addSection(title, actionArray);
  };

  Preview_UI.prototype.addConfig = function() {
    var hintsTuple, initScaleTitle, initStateTitle, scaleTuple, toggleScale, toggleTips;
    this.configView = new UI_Config({
      view: this
    });
    scaleTuple = ["Fit", "100%"];
    hintsTuple = ["Hints ◉", "Hints ◎"];
    toggleScale = (function(_this) {
      return function(emptyData, localButton) {
        if (_this.stateGuard.states.current.name === "normal") {
          _this.animateStateToFill();
          return localButton.text = scaleTuple[0];
        } else {
          _this.animateStateToNormal();
          return localButton.text = scaleTuple[1];
        }
      };
    })(this);
    toggleTips = (function(_this) {
      return function(emptyData, localButton) {
        if (_this.showHints) {
          _this.hideHintsHandler();
          return localButton.text = hintsTuple[1];
        } else {
          _this.showHintsHandler();
          return localButton.text = hintsTuple[0];
        }
      };
    })(this);
    initScaleTitle = this.showHints ? hintsTuple[0] : hintsTuple[1];
    initStateTitle = this.stateGuard.states.current.name === "normal" ? scaleTuple[1] : scaleTuple[0];
    return this.configView.addSection([
      {
        title: initScaleTitle,
        handler: toggleTips
      }, {
        title: initStateTitle,
        handler: toggleScale
      }
    ]);
  };

  Preview_UI.prototype.hideHintsHandler = function() {
    Framer.Extras.Hints.disable();
    return this.showHints = !this.showHints;
  };

  Preview_UI.prototype.showHintsHandler = function() {
    Framer.Extras.Hints.enable();
    Framer.Extras.Hints.showHints();
    return this.showHints = !this.showHints;
  };

  return Preview_UI;

})(Preview_Init);


},{"Logo":"Logo","Preview_Init":"Preview_Init","UI_Config":"UI_Config","UI_Section":"UI_Section"}],"Stack":[function(require,module,exports){
exports.vertical = function(layerArray, spacing, padding) {
  var currentValue, i, item, len, view;
  if (spacing == null) {
    spacing = 16;
  }
  if (padding == null) {
    padding = {
      x: 0,
      y: 0
    };
  }
  view = new Layer({
    width: layerArray[0].width,
    x: padding.x,
    y: padding.y,
    backgroundColor: "white"
  });
  currentValue = 0;
  for (i = 0, len = layerArray.length; i < len; i++) {
    item = layerArray[i];
    item.parent = view;
    item.y = currentValue;
    currentValue = currentValue + item.height + spacing;
  }
  view.height = currentValue;
  return view;
};

exports.horizontal = function(layerArray, spacing, padding) {
  var currentValue, i, item, len, view;
  if (spacing == null) {
    spacing = 16;
  }
  if (padding == null) {
    padding = {
      x: 0,
      y: 0
    };
  }
  view = new Layer({
    height: layerArray[0].height,
    x: padding.x,
    y: padding.y,
    backgroundColor: "white"
  });
  currentValue = 0;
  for (i = 0, len = layerArray.length; i < len; i++) {
    item = layerArray[i];
    item.parent = view;
    item.x = currentValue;
    currentValue = currentValue + item.width + spacing;
  }
  view.width = currentValue;
  return view;
};


},{}],"StatusBar_Class":[function(require,module,exports){
var device_assets,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.StatusBar_Class = (function(superClass) {
  extend(StatusBar_Class, superClass);

  function StatusBar_Class(options) {
    this.options = options != null ? options : {};
    this.createNotchStatusBar = bind(this.createNotchStatusBar, this);
    this.createClassicStatusBar = bind(this.createClassicStatusBar, this);
    this.createClassicAndroidStatusBar = bind(this.createClassicAndroidStatusBar, this);
    this.createAndroidStatusBar = bind(this.createAndroidStatusBar, this);
    this.create = bind(this.create, this);
    this.viewSize = bind(this.viewSize, this);
    _.defaults(this.options, {
      parent: this.view,
      width: this.view.width,
      y: Align.top,
      name: ".status bar",
      backgroundColor: null,
      theme: this.view.statusBar_theme,
      forceAndroid: this.view.forceAndroidBar,
      prototypeCreationYear: this.view.timeValue
    });
    StatusBar_Class.__super__.constructor.call(this, this.options);
    this.create();
  }

  StatusBar_Class.define('view', {
    get: function() {
      return this.options.view;
    },
    set: function(value) {
      return this.options.view = value;
    }
  });

  StatusBar_Class.define('theme', {
    get: function() {
      return this.options.theme;
    },
    set: function(value) {
      return this.options.theme = value;
    }
  });

  StatusBar_Class.define('forceAndroid', {
    get: function() {
      return this.options.forceAndroid;
    },
    set: function(value) {
      return this.options.forceAndroid = value;
    }
  });

  StatusBar_Class.define('prototypeCreationYear', {
    get: function() {
      return this.options.prototypeCreationYear;
    },
    set: function(value) {
      return this.options.prototypeCreationYear = value;
    }
  });

  StatusBar_Class.prototype.viewSize = function(w, h) {
    return this.view.width === w && this.view.height === h;
  };

  StatusBar_Class.prototype.create = function() {
    if (this.forceAndroid) {
      return this.createClassicAndroidStatusBar();
    } else if (this.viewSize(375, 812) || this.viewSize(390, 844) || this.viewSize(414, 896) || this.viewSize(428, 926) || this.viewSize(360, 782)) {
      return this.createNotchStatusBar();
    } else if (this.viewSize(393, 852)) {
      return this.createNotchStatusBar();
    } else if (this.viewSize(375, 667) || this.viewSize(414, 736) || this.viewSize(320, 568)) {
      return this.createClassicStatusBar();
    } else {
      return this.createAndroidStatusBar();
    }
  };

  StatusBar_Class.prototype.createAndroidStatusBar = function() {
    var classicCenterComponent, classicRightomponent;
    this.height = 32;
    classicCenterComponent = new TextLayer({
      parent: this,
      width: 52,
      height: 20,
      x: Align.left(4),
      y: Align.top(2 + 5),
      color: device_assets.color[this.theme],
      backgroundColor: null,
      fontSize: 14,
      fontWeight: 600,
      textAlign: "center",
      fontFamily: ".system, SF Pro Text",
      text: this.prototypeCreationYear
    });
    return classicRightomponent = new Layer({
      parent: this,
      width: 100,
      height: 20,
      x: Align.right(-4),
      y: Align.top(5),
      image: device_assets.androidStatusBarRightImage[this.theme]
    });
  };

  StatusBar_Class.prototype.createClassicAndroidStatusBar = function() {
    var classicCenterComponent, classicRightomponent;
    this.height = 20;
    classicCenterComponent = new TextLayer({
      parent: this,
      width: 52,
      height: 20,
      x: Align.left,
      y: Align.top(2),
      color: device_assets.color[this.theme],
      backgroundColor: null,
      fontSize: 14,
      fontWeight: 600,
      textAlign: "center",
      fontFamily: ".system, SF Pro Text",
      text: this.prototypeCreationYear
    });
    return classicRightomponent = new Layer({
      parent: this,
      width: 100,
      height: 20,
      x: Align.right,
      y: Align.top(),
      image: device_assets.androidStatusBarRightImage[this.theme]
    });
  };

  StatusBar_Class.prototype.createClassicStatusBar = function() {
    var classicCenterComponent, classicLeftComponent, classicRightomponent;
    this.height = 20;
    classicLeftComponent = new Layer({
      parent: this,
      width: 100,
      height: this.height,
      x: Align.left,
      image: device_assets.oldStatusBarLeftImage[this.theme]
    });
    classicCenterComponent = new TextLayer({
      parent: this,
      width: 54,
      height: 16,
      x: Align.center,
      y: Align.center,
      color: device_assets.color[this.theme],
      backgroundColor: null,
      fontSize: 12,
      fontWeight: 600,
      textAlign: "center",
      fontFamily: ".system, SF Pro Text",
      text: this.prototypeCreationYear
    });
    return classicRightomponent = new Layer({
      parent: this,
      width: 100,
      height: this.height,
      x: Align.right,
      image: device_assets.oldStatusBarRightImage[this.theme]
    });
  };

  StatusBar_Class.prototype.createNotchStatusBar = function() {
    var notchCenterComponent, notchLeftComponent, notchRightComponent;
    this.height = 44;
    notchLeftComponent = new TextLayer({
      parent: this,
      width: 54,
      height: 21,
      x: Align.left(21),
      y: Align.top(12),
      color: device_assets.color[this.theme],
      backgroundColor: null,
      letterSpacing: -0.17,
      fontSize: 15,
      fontWeight: 600,
      textAlign: "center",
      fontFamily: ".system, SF Pro Text",
      text: this.prototypeCreationYear
    });
    notchCenterComponent = new Layer({
      parent: this,
      width: 375,
      height: this.height,
      x: Align.center,
      image: device_assets.notch
    });
    return notchRightComponent = new Layer({
      parent: this,
      width: 100,
      height: this.height,
      x: Align.right,
      image: device_assets.statusBarRightImage[this.theme]
    });
  };

  return StatusBar_Class;

})(Layer);

device_assets = {
  color: {
    dark: "#000",
    light: "#FFF"
  },
  statusBarRightImage: {
    dark: "modules/PreviewComponentAssets/statusBar_right_dark.png",
    light: "modules/PreviewComponentAssets/statusBar_right_light.png"
  },
  oldStatusBarLeftImage: {
    dark: "modules/PreviewComponentAssets/oldStatusBar_left_dark.png",
    light: "modules/PreviewComponentAssets/oldStatusBar_left_light.png"
  },
  oldStatusBarRightImage: {
    dark: "modules/PreviewComponentAssets/oldStatusBar_right_dark.png",
    light: "modules/PreviewComponentAssets/oldStatusBar_right_light.png"
  },
  androidStatusBarRightImage: {
    dark: "modules/PreviewComponentAssets/androidStatusBar_right_dark.png",
    light: "modules/PreviewComponentAssets/androidStatusBar_right_light.png"
  },
  notch: "modules/PreviewComponentAssets/statusBar_notch.png",
  tip: "modules/PreviewComponentAssets/tip.png"
};


},{}],"UI_Buttons":[function(require,module,exports){
var Button, ButtonTab, Text, TextButton,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Text = (function(superClass) {
  extend(Text, superClass);

  function Text(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, {
      fontSize: 18,
      weight: 700,
      color: "white",
      height: 20,
      letterSpacing: 0.7,
      letterSpacing: 0.4
    });
    Text.__super__.constructor.call(this, this.options);
    this.style = {
      "font-family": "'SF Pro Text', 'PT Sans', 'Helvetica', 'Tahoma', sans-serif;",
      "font-weight": 700,
      "-webkit-font-feature-settings": "'ss02' on, 'ss06' on, 'ss09' on, 'ss11' on;",
      "-moz-font-feature-settings": "'ss02' on, 'ss06' on, 'ss09' on, 'ss11' on;",
      "-ms-font-feature-settings": "'ss02' on, 'ss06' on, 'ss09' on, 'ss11' on;",
      "font-feature-settings": "'ss02' on, 'ss06' on, 'ss09' on, 'ss11' on;"
    };
  }

  return Text;

})(TextLayer);

TextButton = (function(superClass) {
  extend(TextButton, superClass);

  function TextButton(options) {
    this.options = options != null ? options : {};
    this.updateTuple = bind(this.updateTuple, this);
    this.HoverOff = bind(this.HoverOff, this);
    this.Hover = bind(this.Hover, this);
    _.defaults(this.options, {
      tuple: {
        normal: 0.5,
        hover: 0.8
      },
      handler: null
    });
    TextButton.__super__.constructor.call(this, this.options);
    this.style = {
      cursor: "pointer"
    };
    this.onMouseOver(this.Hover);
    this.onMouseOut(this.HoverOff);
    this.updateTuple(this.tuple);
  }

  TextButton.prototype.Hover = function() {
    return this.opacity = this.tuple.hover;
  };

  TextButton.prototype.HoverOff = function() {
    return this.opacity = this.tuple.normal;
  };

  TextButton.prototype.updateTuple = function(newTuple) {
    this.tuple = newTuple;
    this.emit(Events.MouseOver);
    return this.emit(Events.MouseOut);
  };

  TextButton.define('handler', {
    set: function(value) {
      return this.on(Events.Tap, value);
    }
  });

  TextButton.define('tuple', {
    get: function() {
      return this.options.tuple;
    },
    set: function(value) {
      return this.options.tuple = value;
    }
  });

  return TextButton;

})(Text);

Button = (function(superClass) {
  extend(Button, superClass);

  function Button(options) {
    this.options = options != null ? options : {};
    this.HoverOff = bind(this.HoverOff, this);
    this.Hover = bind(this.Hover, this);
    _.defaults(this.options, {
      handler: null,
      height: 32,
      borderRadius: 8,
      padding: {
        top: 6,
        bottom: 7,
        left: 9,
        right: 9
      },
      backgroundColor: "rgba(0,0,0,0.7)"
    });
    Button.__super__.constructor.call(this, this.options);
    this.showHint = function() {};
    this.style = {
      cursor: "pointer"
    };
    this.onMouseOver(this.Hover);
    this.onMouseOut(this.HoverOff);
  }

  Button.prototype.Hover = function() {
    return this.backgroundColor = "rgba(0,0,0,0.4)";
  };

  Button.prototype.HoverOff = function() {
    return this.backgroundColor = "rgba(0,0,0,0.7)";
  };

  Button.define('handler', {
    set: function(value) {
      return this.on(Events.Tap, value);
    }
  });

  return Button;

})(Text);

ButtonTab = (function(superClass) {
  extend(ButtonTab, superClass);

  function ButtonTab(options) {
    this.options = options != null ? options : {};
    this.HoverOff = bind(this.HoverOff, this);
    this.Hover = bind(this.Hover, this);
    _.defaults(this.options, {
      selected: true
    });
    ButtonTab.__super__.constructor.call(this, this.options);
  }

  ButtonTab.prototype.Hover = function() {
    return this.backgroundColor = "rgba(0,0,0,0.4)";
  };

  ButtonTab.prototype.HoverOff = function() {
    if (this.selected) {
      return this.backgroundColor = "rgba(0,0,0,0.7)";
    } else {
      return this.backgroundColor = "rgba(0,0,0,0.2)";
    }
  };

  ButtonTab.define('selected', {
    get: function() {
      return this.options.selected;
    },
    set: function(value) {
      this.options.selected = value;
      if (value) {
        return this.backgroundColor = "rgba(0,0,0,0.7)";
      } else {
        return this.backgroundColor = "rgba(0,0,0,0.2)";
      }
    }
  });

  return ButtonTab;

})(Button);

module.exports = {
  Text: Text,
  TextButton: TextButton,
  Button: Button,
  ButtonTab: ButtonTab
};


},{}],"UI_Config":[function(require,module,exports){
var Button, Text, UI_Section, ref,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

UI_Section = require("UI_Section").UI_Section;

ref = require("UI_Buttons"), Text = ref.Text, Button = ref.Button;

exports.UI_Config = (function(superClass) {
  extend(UI_Config, superClass);

  function UI_Config(options) {
    this.options = options != null ? options : {};
    this.addActionButton = bind(this.addActionButton, this);
    this.addSection = bind(this.addSection, this);
    this.updateConfigOnResize = bind(this.updateConfigOnResize, this);
    _.defaults(this.options, {
      height: 100,
      y: Align.bottom(-8),
      backgroundColor: null,
      view: null
    });
    UI_Config.__super__.constructor.call(this, this.options);
    this.updateConfigOnResize();
  }

  UI_Config.define('view', {
    get: function() {
      return this.options.view;
    },
    set: function(value) {
      return this.options.view = value;
    }
  });

  UI_Config.prototype.updateConfigOnResize = function() {
    var localConfig;
    localConfig = this;
    return Canvas.on("change:height", (function(_this) {
      return function() {
        return localConfig.y = Align.bottom(-8);
      };
    })(this));
  };

  UI_Config.prototype.addSection = function(actionArray) {
    var actionItem, i, j, len, sectionButton, sectionView, sumX;
    if (actionArray == null) {
      actionArray = [];
    }
    sectionView = new Layer({
      parent: this,
      width: 360,
      height: 100,
      backgroundColor: null,
      x: 32,
      y: Align.bottom()
    });
    this.addSectionTitle(sectionView, "Preview");
    sectionView.style = {
      cursor: "pointer"
    };
    sectionView.onTap(function() {});
    sectionView.showHint = function() {};
    sumX = 0;
    for (i = j = 0, len = actionArray.length; j < len; i = ++j) {
      actionItem = actionArray[i];
      sectionButton = this.addActionButton(actionItem, i);
      sectionButton.parent = sectionView;
      sectionButton.x = sumX;
      sumX += sectionButton.width + 8 + 4;
    }
    return this.width = Math.max(this.width, sumX);
  };

  UI_Config.prototype.addActionButton = function(actionItem, index) {
    var buttonLayer, complexHandler;
    buttonLayer = new Button({
      text: actionItem.title,
      y: 42,
      selected: index === 0 ? true : false,
      custom: {
        actionItem: actionItem
      }
    });
    complexHandler = function() {
      return this.custom.actionItem.handler(this.custom.actionItem.data, this);
    };
    buttonLayer.on(Events.Tap, complexHandler);
    return buttonLayer;
  };

  return UI_Config;

})(UI_Section);


},{"UI_Buttons":"UI_Buttons","UI_Section":"UI_Section"}],"UI_Section":[function(require,module,exports){
var ButtonTab, Text, ref,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ref = require("UI_Buttons"), Text = ref.Text, ButtonTab = ref.ButtonTab;

exports.UI_Section = (function(superClass) {
  extend(UI_Section, superClass);

  function UI_Section(options) {
    this.options = options != null ? options : {};
    this.addSectionTitle = bind(this.addSectionTitle, this);
    this.addActionButton = bind(this.addActionButton, this);
    this.addSection = bind(this.addSection, this);
    _.defaults(this.options, {
      width: 200,
      height: Screen.height,
      y: 100,
      backgroundColor: null
    });
    UI_Section.__super__.constructor.call(this, this.options);
  }

  UI_Section.prototype.addSection = function(title, actionArray) {
    var actionItem, i, j, len, sectionButton, sectionView, sumX;
    if (actionArray == null) {
      actionArray = [];
    }
    sectionView = new Layer({
      parent: this,
      width: 360,
      height: 100,
      backgroundColor: null,
      x: 32,
      y: this.children.length * 100
    });
    this.addSectionTitle(sectionView, title);
    sectionView.style = {
      cursor: "pointer"
    };
    sectionView.onTap(function() {});
    sectionView.showHint = function() {};
    sumX = 0;
    for (i = j = 0, len = actionArray.length; j < len; i = ++j) {
      actionItem = actionArray[i];
      sectionButton = this.addActionButton(actionItem, i);
      sectionButton.parent = sectionView;
      sectionButton.x = sumX;
      sumX += sectionButton.width + 8;
    }
    return this.width = Math.max(this.width, sumX);
  };

  UI_Section.prototype.addActionButton = function(actionItem, index) {
    var buttonLayer, complexHandler;
    buttonLayer = new ButtonTab({
      text: actionItem.title,
      y: 42,
      selected: index === 0 ? true : false,
      custom: {
        actionItem: actionItem
      }
    });
    complexHandler = function() {
      var button, j, len, ref1, results;
      this.custom.actionItem.handler(this.custom.actionItem.data, this);
      ref1 = this.parent.children;
      results = [];
      for (j = 0, len = ref1.length; j < len; j++) {
        button = ref1[j];
        if (button.name !== ".sectionTitle") {
          if (button === this) {
            button.selected = true;
          }
          if (button !== this) {
            results.push(button.selected = false);
          } else {
            results.push(void 0);
          }
        } else {
          results.push(void 0);
        }
      }
      return results;
    };
    buttonLayer.on(Events.Tap, complexHandler);
    return buttonLayer;
  };

  UI_Section.prototype.addSectionTitle = function(localParent, title) {
    if (title == null) {
      title = "Header Title";
    }
    return new Text({
      parent: localParent,
      text: title,
      name: ".sectionTitle",
      fontSize: 16,
      opacity: 0.5,
      padding: {
        top: 12
      }
    });
  };

  return UI_Section;

})(Layer);


},{"UI_Buttons":"UI_Buttons"}],"UI_Tree":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.TreeLayerView = (function(superClass) {
  extend(TreeLayerView, superClass);

  function TreeLayerView(options) {
    var treeViewLayer;
    this.options = options != null ? options : {};
    this.printNode = bind(this.printNode, this);
    this.printTree = bind(this.printTree, this);
    treeViewLayer = new ScrollComponent({
      width: 320,
      height: 0,
      scrollVertical: true,
      scrollHorizontal: false,
      mouseWheelEnabled: true,
      backgroundColor: "#222"
    });
    treeViewLayer.content.height = 0;
    treeViewLayer.mouseWheelEnabled = true;
    _.defaults(this.options, {
      treeView: treeViewLayer,
      indent: 1
    });
    TreeLayerView.__super__.constructor.call(this, this.options);
    treeViewLayer.parent = this.parent;
  }

  TreeLayerView.define('treeView', {
    get: function() {
      return this.options.treeView;
    },
    set: function(value) {
      return this.options.treeView = value;
    }
  });

  TreeLayerView.define('indent', {
    get: function() {
      return this.options.indent;
    },
    set: function(value) {
      return this.options.indent = value;
    }
  });

  TreeLayerView.prototype.printTree = function() {
    print(this.view.children);
    this.printNode(this.view);
    this.treeView.height = Screen.height;
    return this.treeView.updateContent();
  };

  TreeLayerView.prototype.printNode = function(node, level) {
    var childNode, i, layerName, len, nextLevel, ref, results, treeNodeLayer;
    if (level == null) {
      level = 0;
    }
    if (node.name === "") {
      layerName = "Untitled";
    } else {
      layerName = node.name;
    }
    treeNodeLayer = new TextLayer({
      parent: this.treeView.content,
      text: Array(level + 1).join(" ・ ") + (" " + layerName),
      fontSize: 15,
      fontWeight: 500,
      color: "white",
      opacity: layerName === "Untitled" ? 0.5 : 1,
      height: 28,
      y: this.treeView.height,
      backgroundColor: null,
      custom: {
        layer: node
      }
    });
    treeNodeLayer.onTap(function() {
      return print(this.custom.layer.name + " x: " + this.custom.layer.x + " y: " + this.custom.layer.y + " size: " + this.custom.layer.width + "x" + this.custom.layer.height);
    });
    this.treeView.height += 28;
    if (node.children.length > 0) {
      nextLevel = level + 1;
      ref = node.children;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        childNode = ref[i];
        results.push(this.printNode(childNode, nextLevel));
      }
      return results;
    }
  };

  return TreeLayerView;

})(SectionView);


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTEwLTI0IFtwcF0gU2hlZGV2cnVtIOKAlCBNb2RlcyBGZWVkLmZyYW1lci9tb2R1bGVzL0J1dHRvbnMuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0xMC0yNCBbcHBdIFNoZWRldnJ1bSDigJQgTW9kZXMgRmVlZC5mcmFtZXIvbW9kdWxlcy9EZXZpY2VfQ2xhc3MuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0xMC0yNCBbcHBdIFNoZWRldnJ1bSDigJQgTW9kZXMgRmVlZC5mcmFtZXIvbW9kdWxlcy9Ib21lQmFyX0NsYXNzLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMTAtMjQgW3BwXSBTaGVkZXZydW0g4oCUIE1vZGVzIEZlZWQuZnJhbWVyL21vZHVsZXMvTG9nby5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTEwLTI0IFtwcF0gU2hlZGV2cnVtIOKAlCBNb2RlcyBGZWVkLmZyYW1lci9tb2R1bGVzL05hdmlnYXRpb25Db21wb25lbnQuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0xMC0yNCBbcHBdIFNoZWRldnJ1bSDigJQgTW9kZXMgRmVlZC5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50LmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMTAtMjQgW3BwXSBTaGVkZXZydW0g4oCUIE1vZGVzIEZlZWQuZnJhbWVyL21vZHVsZXMvUHJldmlld19DbGFzcy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTEwLTI0IFtwcF0gU2hlZGV2cnVtIOKAlCBNb2RlcyBGZWVkLmZyYW1lci9tb2R1bGVzL1ByZXZpZXdfSW5pdC5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTEwLTI0IFtwcF0gU2hlZGV2cnVtIOKAlCBNb2RlcyBGZWVkLmZyYW1lci9tb2R1bGVzL1ByZXZpZXdfVUkuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0xMC0yNCBbcHBdIFNoZWRldnJ1bSDigJQgTW9kZXMgRmVlZC5mcmFtZXIvbW9kdWxlcy9TdGFjay5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTEwLTI0IFtwcF0gU2hlZGV2cnVtIOKAlCBNb2RlcyBGZWVkLmZyYW1lci9tb2R1bGVzL1N0YXR1c0Jhcl9DbGFzcy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTEwLTI0IFtwcF0gU2hlZGV2cnVtIOKAlCBNb2RlcyBGZWVkLmZyYW1lci9tb2R1bGVzL1VJX0J1dHRvbnMuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0xMC0yNCBbcHBdIFNoZWRldnJ1bSDigJQgTW9kZXMgRmVlZC5mcmFtZXIvbW9kdWxlcy9VSV9Db25maWcuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0xMC0yNCBbcHBdIFNoZWRldnJ1bSDigJQgTW9kZXMgRmVlZC5mcmFtZXIvbW9kdWxlcy9VSV9TZWN0aW9uLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMTAtMjQgW3BwXSBTaGVkZXZydW0g4oCUIE1vZGVzIEZlZWQuZnJhbWVyL21vZHVsZXMvVUlfVHJlZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNFQSxJQUFBOzs7O0FBQU0sT0FBTyxDQUFDOzs7RUFDQSxnQkFBQyxPQUFEO0FBRVosUUFBQTtJQUZhLElBQUMsQ0FBQSw0QkFBRCxVQUFTOzs7SUFFdEIsS0FBQSxHQUFRLElBQUksS0FBSixDQUFVO01BQUUsSUFBQSxFQUFNLEVBQVI7TUFBWSxlQUFBLEVBQWlCLE1BQTdCO0tBQVY7SUFFUixLQUFLLENBQUMsTUFBTixHQUNDO01BQUEsU0FB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QUMsQ0FBQSxRQUFRLENBQUMsTUFUYjtNQVdBLGVBQUEsRUFBaUIsSUFYakI7TUFZQSxNQUFBLEVBQ0M7UUFBQSxLQUFBLEVBQU8sSUFBUDtPQWJEO0tBRGU7SUFnQmhCLGFBQWEsQ0FBQyxLQUFkLENBQW9CLFNBQUE7YUFDbkIsS0FBQSxDQUFTLElBQUMsQ0FBQSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQWYsR0FBb0IsTUFBcEIsR0FBMEIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBeEMsR0FBMEMsTUFBMUMsR0FBZ0QsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBOUQsR0FBZ0UsU0FBaEUsR0FBeUUsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBdkYsR0FBNkYsR0FBN0YsR0FBZ0csSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBdEg7SUFEbUIsQ0FBcEI7SUFJQSxJQUFDLENBQUEsUUFBUSxDQUFDLE1BQVYsSUFBb0I7SUFHcEIsSUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQWQsR0FBdUIsQ0FBMUI7TUFDQyxTQUFBLEdBQVksS0FBQSxHQUFRO0FBQ3BCO0FBQUE7V0FBQSxxQ0FBQTs7cUJBQ0MsSUFBQyxDQUFBLFNBQUQsQ0FBVyxTQUFYLEVBQXNCLFNBQXRCO0FBREQ7cUJBRkQ7O0VBM0JVOzs7O0dBekN3QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlxuXG5jbGFzcyBleHBvcnRzLkJ1dHRvbiBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRndWFyZCA9IG5ldyBMYXllciB7IHNpemU6IDEwLCBiYWNrZ3JvdW5kQ29sb3I6IFwibnVsbFwiIH1cblx0XHRcblx0XHRndWFyZC5zdGF0ZXMgPVxuXHRcdFx0XCJwcmVzc2VkXCI6IHsgb3BhY2l0eTogMCB9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IG9wYWNpdHk6IDAgfVxuXHRcdFxuXHRcdGd1YXJkLm9uIEV2ZW50cy5TdGF0ZVN3aXRjaEVuZCwgKGZyb20sIHRvKSAtPlxuXHRcdFx0aWYgZnJvbSAhPSB0byB0aGVuIEBwYXJlbnQuYW5pbWF0ZSh0bylcblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cdFx0XHRndWFyZDogbnVsbFxuXHRcdFx0c2NhbGVUbzogMC45XG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHN0YXRlcyA9XG5cdFx0XHRcInByZXNzZWRcIjogeyBzY2FsZTogQHNjYWxlVG8gfVxuXHRcdFx0XCJub3JtYWxcIjogeyBzY2FsZTogMS4wIH1cblx0XHRcblx0XHRndWFyZC5wYXJlbnQgPSBAXG5cdFx0QGd1YXJkID0gZ3VhcmRcblx0XHRcblx0XHRALm9uVG91Y2hTdGFydCBASG92ZXJcblx0XHRALm9uVG91Y2hFbmQgQEhvdmVyT2ZmXG5cdFx0QC5vblN3aXBlU3RhcnQgQEhvdmVyT2ZmXG5cdFx0QC5vbkRyYWdTdGFydCBASG92ZXJPZmZcblx0XG5cdEhvdmVyOiA9PiBAZ3VhcmQuc3RhdGVTd2l0Y2goXCJwcmVzc2VkXCIpXG5cdEhvdmVyT2ZmOiA9PiBAZ3VhcmQuc3RhdGVTd2l0Y2goXCJub3JtYWxcIilcblxuXG5cblx0QGRlZmluZSAnZ3VhcmQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZ3VhcmRcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuZ3VhcmQgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnc2NhbGVUbycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zY2FsZVRvXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNjYWxlVG8gPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnaGFuZGxlcicsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvbihFdmVudHMuVGFwLCB2YWx1ZSlcblxuIiwiXG5jbGFzcyBleHBvcnRzLkRldmljZV9DbGFzcyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIjAwMFwiXG5cdFx0XHR2aWV3OiBudWxsXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0IyB1cGRhdGUgZnJvbSBwYXJlbnRcblx0XHRAc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgc2NhbGU6IDEgfVxuXHRcdFx0XCJmaWxsXCI6IHsgc2NhbGU6IDEgfVxuXG5cdFx0QGluaXRCb3JkZXJWaWV3Q3NzKClcblx0XHRAc2VuZFRvQmFjaygpXG5cdFxuXG5cblx0QGRlZmluZSAndmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy52aWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy52aWV3ID0gdmFsdWVcblx0XHRcdEBvcHRpb25zLndpZHRoID0gdmFsdWUud2lkdGggKyAxNiAqIDJcblx0XHRcdEBvcHRpb25zLmhlaWdodCA9IHZhbHVlLmhlaWdodCArIDE2ICogMlxuXHRcdFx0QGJvcmRlclJhZGl1cyA9IHZhbHVlLmJvcmRlclJhZGl1cyArIDE2XG5cblx0c3RhdGVTd2l0Y2hUb05vcm1hbDogKCkgPT5cblx0XHRAYW5pbWF0ZShzY2FsZTogQHN0YXRlc1tcIm5vcm1hbFwiXS5zY2FsZSwgb3B0aW9uczogeyBjdXJ2ZTogQmV6aWVyLmxpbmVhciwgdGltZTogMCB9KVxuXHRcblx0c3RhdGVTd2l0Y2hUb0ZpbGw6ICgpID0+XG5cdFx0QGFuaW1hdGUoc2NhbGU6IEBzdGF0ZXNbXCJmaWxsXCJdLnNjYWxlLCBvcHRpb25zOiB7IGN1cnZlOiBCZXppZXIubGluZWFyLCB0aW1lOiAwIH0pXG5cblx0YW5pbWF0ZVN0YXRlVG9Ob3JtYWw6ICgpID0+XG5cdFx0QGFuaW1hdGUoc2NhbGU6IEBzdGF0ZXNbXCJub3JtYWxcIl0uc2NhbGUsIG9wdGlvbnM6IHsgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41IH0pXG5cdFxuXHRhbmltYXRlU3RhdGVUb0ZpbGw6ICgpID0+XG5cdFx0QGFuaW1hdGUoc2NhbGU6IEBzdGF0ZXNbXCJmaWxsXCJdLnNjYWxlLCBvcHRpb25zOiB7IGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSB9KVxuXG5cblxuXHRpbml0Qm9yZGVyVmlld0NzczogKCkgPT5cblx0XHRAY2xhc3NMaXN0LmFkZChcImlwaG9uZS10aWxsbHVyLXZcIilcbiBcblx0XHRjc3MgPSBcIlwiXCJcblx0XHQuaXBob25lLXRpbGxsdXItdiB7XG5cdFx0XHRiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXG5cdFx0XHQxNjAuNzRkZWcsXG5cdFx0XHRyZ2JhKDM2LCAzNiwgMzYsIDAuMykgMjQuMzklLFxuXHRcdFx0cmdiYSgyOCwgMjgsIDI4LCAwLjMpIDI5LjQ3JSxcblx0XHRcdHJnYmEoMTAsIDEwLCAxMCwgMC4zKSA5OS44NSVcblx0XHRcdCksXG5cdFx0XHRsaW5lYXItZ3JhZGllbnQoXG5cdFx0XHQxODBkZWcsXG5cdFx0XHRyZ2JhKDIsIDIsIDIsIDAuNikgLTAuMjElLFxuXHRcdFx0cmdiYSgyMSwgMjEsIDIxLCAwLjYpIDYuNTIlLFxuXHRcdFx0cmdiYSg2LCA2LCA2LCAwLjYpIDk5Ljc5JVxuXHRcdFx0KSxcblx0XHRcdCM1YTVhNWE7XG5cdFx0Ym94LXNoYWRvdzogOHB4IDE0cHggMjBweCByZ2JhKDAsIDAsIDAsIDAuMjUpLFxuXHRcdFx0aW5zZXQgMHB4IC00cHggMTZweCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSksXG5cdFx0XHRpbnNldCA0cHggMHB4IDRweCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSksXG5cdFx0XHRpbnNldCAtNHB4IDBweCA0cHggcmdiYSgwLCAwLCAwLCAwLjcpO1xuXG5cdFx0fVxuXHRcdFwiXCJcIlxuXHRcdFxuXHRcdFV0aWxzLmluc2VydENTUyhjc3MpIiwiXG5jbGFzcyBleHBvcnRzLkhvbWVCYXJfQ2xhc3MgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHBhcmVudDogQHZpZXdcblx0XHRcdHdpZHRoOiBAdmlldy53aWR0aFxuXHRcdFx0XG5cdFx0XHR0aGVtZTogQHZpZXcuaG9tZUJhcl90aGVtZVxuXHRcdFx0XG5cdFx0XHRoZWlnaHQ6IDM0LCB5OiBBbGlnbi5ib3R0b20sIG5hbWU6IFwiLmhvbWUgYmFyXCIsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAY3JlYXRlKClcblxuXG5cblx0QGRlZmluZSAndmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy52aWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnZpZXcgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgJ3RoZW1lJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRoZW1lXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnRoZW1lID0gdmFsdWVcblxuXG5cblx0dmlld1NpemU6ICh3LCBoKSA9PiByZXR1cm4gQHZpZXcud2lkdGggPT0gdyBhbmQgQHZpZXcuaGVpZ2h0ID09IGhcblxuXHRjcmVhdGU6ICgpID0+XG5cdFx0aWYgQHZpZXdTaXplKDM3NSwgODEyKSBvciBAdmlld1NpemUoMzkwLCA4NDQpIG9yIEB2aWV3U2l6ZSg0MTQsIDg5Nikgb3IgQHZpZXdTaXplKDQyOCwgOTI2KSBvciBAdmlld1NpemUoMzYwLCA3ODIpIG9yIEB2aWV3U2l6ZSgzOTMsIDg1Milcblx0XHRcdEBjcmVhdGVIb21lSW5kaWNhdG9yKClcblx0XG5cdFxuXHRjcmVhdGVIb21lSW5kaWNhdG9yOiAoKSA9PlxuXHRcdG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIuaG9tZVZpZXdcIlxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogMTM1LCBoZWlnaHQ6IDUsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uYm90dG9tKC04KVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBkZXZpY2VfYXNzZXRzLmNvbG9yW0B0aGVtZV0sIGJvcmRlclJhZGl1czogMjBcblxuXG5cbmRldmljZV9hc3NldHMgPVxuXHRjb2xvcjpcblx0XHRkYXJrOiBcIiMwMDBcIlxuXHRcdGxpZ2h0OiBcIiNGRkZcIiIsIiMgTG9nb1xuXG5jbGFzcyBleHBvcnRzLkxvZ29MYXllciBleHRlbmRzIFNWR0xheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdG9wYWNpdHk6IDAuNVxuXHRcdFx0aGFuZGxlcjogbnVsbFxuXHRcdFx0c3ZnOiBnZXRMb2dvKFwiRkZGXCIpXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0QHNob3dIaW50ID0gLT4gO1xuXHRcdFxuXHRcdEAub25Nb3VzZU92ZXIgQEhvdmVyXG5cdFx0QC5vbk1vdXNlT3V0IEBIb3Zlck9mZlxuXHRcblx0QGRlZmluZSAnaGFuZGxlcicsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvbihFdmVudHMuVGFwLCB2YWx1ZSlcblx0XG5cdEhvdmVyOiA9PlxuXHRcdEBvcGFjaXR5ID0gMC44XG5cdEhvdmVyT2ZmOiA9PlxuXHRcdEBvcGFjaXR5ID0gMC41XG5cblxuXG5nZXRMb2dvID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IFwiI0ZGRkZGRlwiXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiNzZcIiBoZWlnaHQ9XCIzMlwiIHZpZXdCb3g9XCIwIDAgNzYgMzJcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNMi43OTE5OSAyMS42QzIuNzkxOTkgMjEuMTY4IDIuOTAzOTkgMjAuNDA4IDMuMTI3OTkgMTkuMzJMNC4zOTk5OSAxMi44NEgyLjk4Mzk5TDMuMDc5OTkgMTIuMTJDNC45OTk5OSAxMS41NDQgNi44ODc5OSAxMC41NTIgOC43NDM5OSA5LjE0Mzk4SDkuODk1OTlMOS4zMTk5OSAxMS43NkgxMS4xOTJMMTAuOTc2IDEyLjg0SDkuMTI3OTlMNy45MDM5OSAxOS4zMkM3LjY5NTk5IDIwLjMxMiA3LjU5MTk5IDIwLjk3NiA3LjU5MTk5IDIxLjMxMkM3LjU5MTk5IDIyLjA4IDcuOTI3OTkgMjIuNTQ0IDguNTk5OTkgMjIuNzA0QzguNDM5OTkgMjMuMjQ4IDguMDcxOTkgMjMuNjggNy40OTU5OSAyNEM2LjkxOTk5IDI0LjMyIDYuMjIzOTkgMjQuNDggNS40MDc5OSAyNC40OEM0LjU5MTk5IDI0LjQ4IDMuOTUxOTkgMjQuMjI0IDMuNDg3OTkgMjMuNzEyQzMuMDIzOTkgMjMuMiAyLjc5MTk5IDIyLjQ5NiAyLjc5MTk5IDIxLjZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTE3LjU1OTkgMjIuNjhDMTcuMDYzOSAyMy44OCAxNi4wMjM5IDI0LjQ4IDE0LjQzOTkgMjQuNDhDMTMuNjIzOSAyNC40OCAxMi45NTk5IDI0LjIgMTIuNDQ3OSAyMy42NEMxMi4wMTU5IDIzLjE0NCAxMS43OTk5IDIyLjY0OCAxMS43OTk5IDIyLjE1MkMxMS43OTk5IDIwLjg1NiAxMi4wOTU5IDE4Ljk0NCAxMi42ODc5IDE2LjQxNkwxMy41NzU5IDExLjc2TDE4LjQ0NzkgMTEuMjhMMTYuOTgzOSAxOC44NjRDMTYuNzExOSAyMC4wNDggMTYuNTc1OSAyMC44NDggMTYuNTc1OSAyMS4yNjRDMTYuNTc1OSAyMi4xNzYgMTYuOTAzOSAyMi42NDggMTcuNTU5OSAyMi42OFpNMTQuMDA3OSA4LjQyMzk4QzE0LjAwNzkgNy43OTk5OCAxNC4yNjM5IDcuMzE5OTggMTQuNzc1OSA2Ljk4Mzk4QzE1LjMwMzkgNi42NDc5OCAxNS45NDM5IDYuNDc5OTggMTYuNjk1OSA2LjQ3OTk4QzE3LjQ0NzkgNi40Nzk5OCAxOC4wNDc5IDYuNjQ3OTggMTguNDk1OSA2Ljk4Mzk4QzE4Ljk1OTkgNy4zMTk5OCAxOS4xOTE5IDcuNzk5OTggMTkuMTkxOSA4LjQyMzk4QzE5LjE5MTkgOS4wNDc5OCAxOC45MzU5IDkuNTE5OTggMTguNDIzOSA5LjgzOTk4QzE3LjkyNzkgMTAuMTYgMTcuMzAzOSAxMC4zMiAxNi41NTE5IDEwLjMyQzE1Ljc5OTkgMTAuMzIgMTUuMTgzOSAxMC4xNiAxNC43MDM5IDkuODM5OThDMTQuMjM5OSA5LjUxOTk4IDE0LjAwNzkgOS4wNDc5OCAxNC4wMDc5IDguNDIzOThaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTI2LjA2MDYgMjIuNjhDMjUuNTY0NiAyMy44OCAyNC41MjQ2IDI0LjQ4IDIyLjk0MDYgMjQuNDhDMjIuMTQwNiAyNC40OCAyMS40ODQ2IDI0LjIgMjAuOTcyNiAyMy42NEMyMC41NTY2IDIzLjE3NiAyMC4zNDg2IDIyLjY4IDIwLjM0ODYgMjIuMTUyQzIwLjM0ODYgMjAuOTUyIDIwLjYyODYgMTkuMDQgMjEuMTg4NiAxNi40MTZMMjIuOTQwNiA3LjE5OTk4TDI3LjgxMjYgNi43MTk5OEwyNS40ODQ2IDE4Ljg2NEMyNS4yMTI2IDIwLjA0OCAyNS4wNzY2IDIwLjg0OCAyNS4wNzY2IDIxLjI2NEMyNS4wNzY2IDIyLjE3NiAyNS40MDQ2IDIyLjY0OCAyNi4wNjA2IDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0zNC41NjE4IDIyLjY4QzM0LjA2NTggMjMuODggMzMuMDI1OCAyNC40OCAzMS40NDE4IDI0LjQ4QzMwLjY0MTggMjQuNDggMjkuOTg1OCAyNC4yIDI5LjQ3MzggMjMuNjRDMjkuMDU3OCAyMy4xNzYgMjguODQ5OCAyMi42OCAyOC44NDk4IDIyLjE1MkMyOC44NDk4IDIwLjk1MiAyOS4xMjk4IDE5LjA0IDI5LjY4OTggMTYuNDE2TDMxLjQ0MTggNy4xOTk5OEwzNi4zMTM4IDYuNzE5OThMMzMuOTg1OCAxOC44NjRDMzMuNzEzOCAyMC4wNDggMzMuNTc3OCAyMC44NDggMzMuNTc3OCAyMS4yNjRDMzMuNTc3OCAyMi4xNzYgMzMuOTA1OCAyMi42NDggMzQuNTYxOCAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNDMuMDYzMSAyMi42OEM0Mi41NjcxIDIzLjg4IDQxLjUyNzEgMjQuNDggMzkuOTQzMSAyNC40OEMzOS4xNDMxIDI0LjQ4IDM4LjQ4NzEgMjQuMiAzNy45NzUxIDIzLjY0QzM3LjU1OTEgMjMuMTc2IDM3LjM1MTEgMjIuNjggMzcuMzUxMSAyMi4xNTJDMzcuMzUxMSAyMC45NTIgMzcuNjMxMSAxOS4wNCAzOC4xOTExIDE2LjQxNkwzOS45NDMxIDcuMTk5OThMNDQuODE1MSA2LjcxOTk4TDQyLjQ4NzEgMTguODY0QzQyLjIxNTEgMjAuMDQ4IDQyLjA3OTEgMjAuODQ4IDQyLjA3OTEgMjEuMjY0QzQyLjA3OTEgMjIuMTc2IDQyLjQwNzEgMjIuNjQ4IDQzLjA2MzEgMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTUzLjUzMjMgMjIuOTkyQzUyLjc2NDMgMjMuOTg0IDUxLjQyODMgMjQuNDggNDkuNTI0MyAyNC40OEM0OC41MzIzIDI0LjQ4IDQ3LjY3NjMgMjQuMTg0IDQ2Ljk1NjMgMjMuNTkyQzQ2LjIzNjMgMjIuOTg0IDQ1Ljg3NjMgMjIuMjQ4IDQ1Ljg3NjMgMjEuMzg0QzQ1Ljg3NjMgMjAuOTA0IDQ1LjkwMDMgMjAuNTQ0IDQ1Ljk0ODMgMjAuMzA0TDQ3LjU1NjMgMTEuNzZMNTIuNDI4MyAxMS4yOEw1MC42NzYzIDIwLjU0NEM1MC42MTIzIDIwLjg5NiA1MC41ODAzIDIxLjE3NiA1MC41ODAzIDIxLjM4NEM1MC41ODAzIDIyLjMxMiA1MC44NjAzIDIyLjc3NiA1MS40MjAzIDIyLjc3NkM1Mi4wNDQzIDIyLjc3NiA1Mi41ODAzIDIyLjM1MiA1My4wMjgzIDIxLjUwNEM1My4xNzIzIDIxLjIzMiA1My4yNzYzIDIwLjkyIDUzLjM0MDMgMjAuNTY4TDU1LjA0NDMgMTEuNzZMNTkuNzcyMyAxMS4yOEw1Ny45OTYzIDIwLjY0QzU3Ljk0ODMgMjAuODggNTcuOTI0MyAyMS4xMjggNTcuOTI0MyAyMS4zODRDNTcuOTI0MyAyMS42NCA1Ny45OTYzIDIxLjkxMiA1OC4xNDAzIDIyLjJDNTguMjg0MyAyMi40NzIgNTguNTg4MyAyMi42NCA1OS4wNTIzIDIyLjcwNEM1OC45NTYzIDIzLjA4OCA1OC43NDAzIDIzLjQwOCA1OC40MDQzIDIzLjY2NEM1Ny43MDAzIDI0LjIwOCA1Ni45NjQzIDI0LjQ4IDU2LjE5NjMgMjQuNDhDNTUuNDQ0MyAyNC40OCA1NC44NDQzIDI0LjM0NCA1NC4zOTYzIDI0LjA3MkM1My45NDgzIDIzLjggNTMuNjYwMyAyMy40NCA1My41MzIzIDIyLjk5MlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNjkuMjk0NyAxNy4yNTZDNjkuODcwNyAxNi4yMzIgNzAuMTU4NyAxNS4yIDcwLjE1ODcgMTQuMTZDNzAuMTU4NyAxMy40NzIgNjkuOTEwNyAxMy4xMjggNjkuNDE0NyAxMy4xMjhDNjkuMDMwNyAxMy4xMjggNjguNjM4NyAxMy40NTYgNjguMjM4NyAxNC4xMTJDNjcuODIyNyAxNC43NjggNjcuNTUwNyAxNS41MiA2Ny40MjI3IDE2LjM2OEw2Ni4xNzQ3IDI0TDYxLjIwNjcgMjQuNDhMNjMuNjU0NyAxMS43Nkw2Ny42MTQ3IDExLjI4TDY3LjE4MjcgMTMuNzA0QzY3Ljk2NjcgMTIuMDg4IDY5LjIzODcgMTEuMjggNzAuOTk4NyAxMS4yOEM3MS45MjY3IDExLjI4IDcyLjYzODcgMTEuNTIgNzMuMTM0NyAxMkM3My42NDY3IDEyLjQ4IDczLjkwMjcgMTMuMjE2IDczLjkwMjcgMTQuMjA4QzczLjkwMjcgMTUuMTg0IDczLjU3NDcgMTUuOTg0IDcyLjkxODcgMTYuNjA4QzcyLjI3ODcgMTcuMjMyIDcxLjQwNjcgMTcuNTQ0IDcwLjMwMjcgMTcuNTQ0QzY5LjgyMjcgMTcuNTQ0IDY5LjQ4NjcgMTcuNDQ4IDY5LjI5NDcgMTcuMjU2WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPC9zdmc+XG5cIlwiXCJcbiIsIlxueyBCdXR0b24gfSA9IHJlcXVpcmUgXCJCdXR0b25zXCJcblxueyBQcmV2aWV3X0NsYXNzIH0gPSByZXF1aXJlIFwiUHJldmlld19DbGFzc1wiXG5cbmNsYXNzIEZsb3dWaWV3IGV4dGVuZHMgRmxvd0NvbXBvbmVudFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0aWYgQHBhcmVudFxuXHRcdFx0QHdpZHRoID0gQHBhcmVudC53aWR0aFxuXHRcdFx0QGhlaWdodCA9IEBwYXJlbnQuaGVpZ2h0XG5cblxuXHRcdCMgQG9uIEV2ZW50cy5UcmFuc2l0aW9uU3RvcCwgKGxheWVyQSwgbGF5ZXJCKSAtPlxuXHRcdCMgXHRwcmludCBsYXllckIubmFtZVxuXG5cblx0XHRAb24gRXZlbnRzLlRyYW5zaXRpb25TdGFydCwgKGxheWVyQSwgbGF5ZXJCKSAtPlxuXHRcdCMgXHQjIHByaW50IFwic3RhcnQg4oCUPiBcIiArIGxheWVyQS5uYW1lID8gMSArIFwiIFwiICsgbGF5ZXJCLm5hbWUgPyAyXG5cdFx0IyBcdHByaW50IFwiLVwiXG5cdFx0IyBcdHByaW50IFwic3RhcnQg4oCUPiBcIiArIGxheWVyQi5uYW1lID8gMlxuXHRcdFx0aWYgbGF5ZXJCICE9IHVuZGVmaW5lZCBhbmQgbGF5ZXJCLmN1c3RvbSAhPSB1bmRlZmluZWQgYW5kIGxheWVyQi5jdXN0b20uY3VzdG9tQWN0aW9uX0FycmF5ICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRAaXRlcmF0ZVRocm91Z2hDaGlsZHJlbiBsYXllckIsIGxheWVyQi5jdXN0b20uY3VzdG9tQWN0aW9uX0FycmF5LCBAY3VzdG9tQWN0aW9uX3N3aXRjaE9uTGF5ZXJzXG5cdFx0XHRcblx0XHRcdGlmIGxheWVyQSAhPSB1bmRlZmluZWQgYW5kIGxheWVyQS5jdXN0b20gIT0gdW5kZWZpbmVkIGFuZCBsYXllckEuY3VzdG9tLmN1c3RvbUFjdGlvbl9BcnJheSAhPSB1bmRlZmluZWRcblx0XHRcdFx0QGl0ZXJhdGVUaHJvdWdoQ2hpbGRyZW4gbGF5ZXJBLCBsYXllckEuY3VzdG9tLmN1c3RvbUFjdGlvbl9BcnJheSwgQGN1c3RvbUFjdGlvbl9zd2l0Y2hPZmZMYXllcnNcblx0XHRcblx0XHQjIEBvbiBFdmVudHMuVHJhbnNpdGlvbkhhbHQsIChsYXllckEsIGxheWVyQikgLT5cblx0XHQjIFx0cHJpbnQgXCJoYWx0IOKAlD4gXCIgKyBsYXllckIubmFtZSA/IDJcblxuXHRcdCMgQG9uIEV2ZW50cy5UcmFuc2l0aW9uU3RvcCwgKGxheWVyQSwgbGF5ZXJCKSAtPlxuXHRcdCMgXHRwcmludCBcInN0b3Ag4oCUPiBcIiArIGxheWVyQi5uYW1lID8gMlxuXG5cdFx0IyBAb24gRXZlbnRzLlRyYW5zaXRpb25FbmQsIChsYXllckEsIGxheWVyQikgLT5cblx0XHQjIFx0IyBwcmludCBcImVuZCDigJQ+IFwiICsgbGF5ZXJBLm5hbWUgPyAxICsgXCIgXCIgKyBsYXllckIubmFtZSA/IDJcblx0XHQjIFx0cHJpbnQgXCJlbmQg4oCUPiBcIiArIGxheWVyQi5uYW1lID8gMlxuXHRcdFx0XG5cdFx0IyBcdGlmIEBzdGFjayBhbmQgQHN0YWNrLmxlbmd0aCA9PSAxIGFuZCBAc3RhY2tbMF0gPT0gbGF5ZXJCIGFuZCBsYXllckIgIT0gdW5kZWZpbmVkXG5cdFx0IyBcdFx0QGl0ZXJhdGVUaHJvdWdoQ2hpbGRyZW4gbGF5ZXJCLCBsYXllckIuY3VzdG9tLmN1c3RvbUFjdGlvbl9BcnJheSwgQGN1c3RvbUFjdGlvbl9zd2l0Y2hPbkxheWVyc1xuXHRcdFxuXHRcdFxuXG5cblxuXHRAZGVmaW5lIFwicGFyZW50XCIsXG5cdFx0ZW51bWVyYWJsZTogZmFsc2Vcblx0XHRleHBvcnRhYmxlOiBmYWxzZVxuXHRcdGltcG9ydGFibGU6IHRydWVcblxuXHRcdGdldDogLT5cblx0XHRcdEBfcGFyZW50IG9yIG51bGxcblx0XHRcblx0XHRzZXQ6IChsYXllcikgLT5cblx0XHRcdHJldHVybiBpZiBsYXllciBpcyBAX3BhcmVudFxuXG5cdFx0XHR0aHJvdyBFcnJvcihcIkxheWVyLnBhcmVudDogYSBsYXllciBjYW5ub3QgYmUgaXQncyBvd24gcGFyZW50LlwiKSBpZiBsYXllciBpcyBAXG5cblx0XHRcdCMgQ2hlY2sgdGhlIHR5cGVcblx0XHRcdGlmIG5vdCBsYXllciBpbnN0YW5jZW9mIExheWVyXG5cdFx0XHRcdHRocm93IEVycm9yIFwiTGF5ZXIucGFyZW50IG5lZWRzIHRvIGJlIGEgTGF5ZXIgb2JqZWN0XCJcblxuXHRcdFx0IyBDYW5jZWwgcHJldmlvdXMgcGVuZGluZyBpbnNlcnRpb25zXG5cdFx0XHRVdGlscy5kb21Db21wbGV0ZUNhbmNlbChAX19pbnNlcnRFbGVtZW50KVxuXG5cdFx0XHQjIFJlbW92ZSBmcm9tIHByZXZpb3VzIHBhcmVudCBjaGlsZHJlblxuXHRcdFx0aWYgQF9wYXJlbnRcblx0XHRcdFx0QF9wYXJlbnQuX2NoaWxkcmVuID0gXy5wdWxsIEBfcGFyZW50Ll9jaGlsZHJlbiwgQFxuXHRcdFx0XHRAX3BhcmVudC5fZWxlbWVudC5yZW1vdmVDaGlsZCBAX2VsZW1lbnRcblx0XHRcdFx0QF9wYXJlbnQuZW1pdCBcImNoYW5nZTpjaGlsZHJlblwiLCB7YWRkZWQ6IFtdLCByZW1vdmVkOiBbQF19XG5cdFx0XHRcdEBfcGFyZW50LmVtaXQgXCJjaGFuZ2U6c3ViTGF5ZXJzXCIsIHthZGRlZDogW10sIHJlbW92ZWQ6IFtAXX1cblxuXHRcdFx0IyBFaXRoZXIgaW5zZXJ0IHRoZSBlbGVtZW50IHRvIHRoZSBuZXcgcGFyZW50IGVsZW1lbnQgb3IgaW50byBkb21cblx0XHRcdGlmIGxheWVyXG5cdFx0XHRcdGxheWVyLl9lbGVtZW50LmFwcGVuZENoaWxkIEBfZWxlbWVudFxuXHRcdFx0XHRsYXllci5fY2hpbGRyZW4ucHVzaCBAXG5cdFx0XHRcdGxheWVyLmVtaXQgXCJjaGFuZ2U6Y2hpbGRyZW5cIiwge2FkZGVkOiBbQF0sIHJlbW92ZWQ6IFtdfVxuXHRcdFx0XHRsYXllci5lbWl0IFwiY2hhbmdlOnN1YkxheWVyc1wiLCB7YWRkZWQ6IFtAXSwgcmVtb3ZlZDogW119XG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBfaW5zZXJ0RWxlbWVudCgpXG5cblx0XHRcdG9sZFBhcmVudCA9IEBfcGFyZW50XG5cdFx0XHQjIFNldCB0aGUgcGFyZW50XG5cdFx0XHRAX3BhcmVudCA9IGxheWVyXG5cblx0XHRcdCMgUGxhY2UgdGhpcyBsYXllciBvbiB0b3Agb2YgaXRzIHNpYmxpbmdzXG5cdFx0XHRAYnJpbmdUb0Zyb250KClcblxuXHRcdFx0QGVtaXQgXCJjaGFuZ2U6cGFyZW50XCIsIEBfcGFyZW50LCBvbGRQYXJlbnRcblx0XHRcdEBlbWl0IFwiY2hhbmdlOnN1cGVyTGF5ZXJcIiwgQF9wYXJlbnQsIG9sZFBhcmVudFxuXHRcdFx0XG5cdFx0XHRAd2lkdGggPSBsYXllci53aWR0aFxuXHRcdFx0QGhlaWdodCA9IGxheWVyLmhlaWdodFxuXG5cblx0c3RhY2tUcmFuc2l0aW9uOiAobmF2LCBsYXllckEsIGxheWVyQiwgb3ZlcmxheSkgLT5cblx0XHR0cmFuc2l0aW9uID1cblx0XHRcdGxheWVyQTpcblx0XHRcdFx0c2hvdzoge3g6IDAsIHk6IDB9XG5cdFx0XHRcdGhpZGU6IHt4OiAwIC0gbGF5ZXJBPy53aWR0aCAvIDIsIHk6IDB9XG5cdFx0XHRsYXllckI6XG5cdFx0XHRcdHNob3c6IHt4OiAwLCB5OiAwfVxuXHRcdFx0XHRoaWRlOiB7eDogbGF5ZXJCLndpZHRoLCB5OiAwfVxuXHRcdFx0b3ZlcmxheTpcblx0XHRcdFx0c2hvdzoge29wYWNpdHk6IC41LCB4OiAwLCB5OiAwLCBzaXplOiBuYXYuc2l6ZX1cblx0XHRcdFx0aGlkZToge29wYWNpdHk6IDAsIHg6IDAsIHk6IDAsIHNpemU6IG5hdi5zaXplfVxuXG5cblx0bW9kYWxUcmFuc2l0aW9uOiAobmF2LCBsYXllckEsIGxheWVyQiwgb3ZlcmxheSkgLT5cblx0XHR0cmFuc2l0aW9uID1cblx0XHRcdGxheWVyQTpcblx0XHRcdFx0c2hvdzoge3g6IDAsIHk6IDB9XG5cdFx0XHRcdGhpZGU6IHt4OiAwLCB5OiAwfVxuXHRcdFx0bGF5ZXJCOlxuXHRcdFx0XHRzaG93OiB7eDogMCwgeTogMH1cblx0XHRcdFx0aGlkZToge3g6IDAsIHk6IGxheWVyQT8uaGVpZ2h0ICsgMTB9XG5cdFx0XHRvdmVybGF5OlxuXHRcdFx0XHRzaG93OiB7b3BhY2l0eTogLjUsIHg6IDAsIHk6IDAsIHNpemU6IG5hdi5zaXplfVxuXHRcdFx0XHRoaWRlOiB7b3BhY2l0eTogMCwgeDogMCwgeTogMCwgc2l6ZTogbmF2LnNpemV9XG5cblxuXHRjdXN0b21BY3Rpb25fc3dpdGNoT25MYXllcnM6IChsYXllciwgYm94LCBmbG93KSAtPlxuXHRcdCMgaWYgYm94ID09IHVuZGVmaW5lZCB0aGVuIHJldHVyblxuXG5cdFx0bGF5ZXJUb0NoZWNrID0gbGF5ZXJcblx0XHRpbmRleCA9IGJveC5pbmRleE9mKGxheWVyVG9DaGVjaylcblxuXHRcdGlmIGluZGV4ICE9IC0xXG5cdFx0XHRsYXllci5pZ25vcmVFdmVudHMgPSBmYWxzZVxuXHRcdFx0Ym94LnNwbGljZShpbmRleCwgMSlcblxuXG5cblx0Y3VzdG9tQWN0aW9uX3N3aXRjaE9mZkxheWVyczogKGxheWVyLCBib3gsIGZsb3cpIC0+XG5cdFx0XG5cdFx0IyBpZiBsYXllci5uYW1lID09IFwidGVtcG5hbWVcIiB0aGVuIHByaW50IFwib2tcIlxuXHRcdCMgaWYgbGF5ZXIuc2hvdWxkU2hvd0hpbnQoKVxuXHRcdCMgcHJpbnQgXCJjaGVjazogXCIgKyBsYXllci5uYW1lXG5cblx0XHRpZiBmbG93LnNob3VsZFNob3dIaW50T3ZlcnJpZGUobGF5ZXIpXG5cdFx0XHQjIHByaW50IFwid2lsbCBvZmYgbGF5ZXIgXCIgKyBsYXllci5uYW1lXG5cdFx0XHRib3gucHVzaCBsYXllclxuXHRcdFx0bGF5ZXIuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXHRcdFxuXG5cdFx0IyBpZiBsYXllci5wYXJlbnQgaW5zdGFuY2VvZiBTY3JvbGxDb21wb25lbnQgb3IgbGF5ZXIucGFyZW50IGluc3RhbmNlb2YgUGFnZUNvbXBvbmVudFxuXHRcdCMgXHQjIHByaW50IFwiaGVyZVwiXG5cdFx0IyBcdCMgcHJpbnQgbGF5ZXJcblx0XHQjIFx0IyBwcmludCBsYXllci5wYXJlbnRcblx0XHQjIFx0IyBwcmludCBsYXllci5pZ25vcmVFdmVudHNcblxuXHRcdCMgXHRpZiBsYXllci5pZ25vcmVFdmVudHMgPT0gZmFsc2Vcblx0XHQjIFx0XHQjIHByaW50IFwiaW5zaWRlXCJcblx0XHQjIFx0XHRib3gucHVzaCBsYXllclxuXHRcdCMgXHRcdGxheWVyLmlnbm9yZUV2ZW50cyA9IHRydWVcblxuXG5cblx0XHQjIGlmIGxheWVyIGluc3RhbmNlb2YgQnV0dG9uXG5cdFx0IyBcdGlmICFsYXllci5pZ25vcmVFdmVudHNcblx0XHQjIFx0XHRib3gucHVzaCBsYXllclxuXHRcdCMgXHRcdGxheWVyLmlnbm9yZUV2ZW50cyA9IHRydWVcblx0XHRcblx0XHQjIGVsc2UgaWYgbGF5ZXIucGFyZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvblZpZXdcblx0XHQjIFx0Ym94LnB1c2ggbGF5ZXJcblx0XHQjIFx0bGF5ZXIuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXG5cdFx0IyBcdGJveC5wdXNoIGxheWVyLnBhcmVudFxuXHRcdCMgXHRsYXllci5wYXJlbnQuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXHRcdFxuXHRcdCMgZWxzZSBpZiBsYXllci5wYXJlbnQgaW5zdGFuY2VvZiBNb2RhbFZpZXdcblxuXHRcdCMgXHRib3gucHVzaCBsYXllclxuXHRcdCMgXHRsYXllci5pZ25vcmVFdmVudHMgPSB0cnVlXG5cblx0XHQjIFx0Ym94LnB1c2ggbGF5ZXIucGFyZW50XG5cdFx0IyBcdGxheWVyLnBhcmVudC5pZ25vcmVFdmVudHMgPSB0cnVlXG5cblx0XHQjIFx0Ym94LnB1c2ggbGF5ZXIucGFyZW50LnBhcmVudFxuXHRcdCMgXHRsYXllci5wYXJlbnQucGFyZW50Lmlnbm9yZUV2ZW50cyA9IHRydWVcblxuXHRcblx0XG5cdFxuXHRzaG91bGRTaG93SGludE92ZXJyaWRlOiAobGF5ZXIpIC0+XG5cdFx0aWYgbGF5ZXIuaWdub3JlRXZlbnRzIGlzIHRydWUgdGhlbiByZXR1cm4gZmFsc2Vcblx0XHQjIGlmIGxheWVyLmlzQW5pbWF0aW5nIHRoZW4gcmV0dXJuIGZhbHNlXG5cblx0XHQjIGZvciBwYXJlbnQgaW4gQGFuY2VzdG9ycygpXG5cdFx0XHQjIHJldHVybiBmYWxzZSBpZiBwYXJlbnQuaXNBbmltYXRpbmdcblxuXHRcdCMgZm9yIHBhcmVudCBpbiBsYXllci5hbmNlc3RvcnMoKVxuXHRcdCMgXHQjIGlmIHBhcmVudCBpbnN0YW5jZW9mIFByZXZpZXdfQ2xhc3Ncblx0XHQjIFx0IyBcdCMgaWYgbGF5ZXIgaW5zdGFuY2VvZiBCdXR0b24gdGhlbiBwcmludCBcIkhFUkVcIlxuXHRcdCMgXHQjIFx0Y29udGludWVcblx0XHQjIFx0IyBpZiBwYXJlbnQuaXNBbmltYXRpbmdcblx0XHQjIFx0IyBcdGlmIGxheWVyIGluc3RhbmNlb2YgQnV0dG9uIHRoZW4gcHJpbnQgXCI/Pz9cIlxuXHRcdCMgXHQjIFx0aWYgbGF5ZXIgaW5zdGFuY2VvZiBCdXR0b24gdGhlbiBwcmludCBwYXJlbnRcblx0XHQjIFx0cmV0dXJuIGZhbHNlIGlmIHBhcmVudC5pc0FuaW1hdGluZ1xuXG5cdFx0aWYgbGF5ZXIuX2RyYWdnYWJsZSBhbmQgbGF5ZXIuX2RyYWdnYWJsZS5ob3Jpem9udGFsIGlzIGZhbHNlIGFuZCBsYXllci5fZHJhZ2dhYmxlLnZlcnRpY2FsIGlzIGZhbHNlXG5cdFx0XHRyZXR1cm4gZmFsc2VcblxuXHRcdHJldHVybiBmYWxzZSBpZiBsYXllci5vcGFjaXR5IGlzIDBcblxuXHRcdGZvciBldmVudE5hbWUgaW4gbGF5ZXIubGlzdGVuZXJFdmVudHMoKVxuXHRcdFx0cmV0dXJuIHRydWUgaWYgRXZlbnRzLmlzSW50ZXJhY3RpdmUoZXZlbnROYW1lKVxuXHRcdFxuXHRcdHJldHVybiBmYWxzZVxuXG5cblxuXHRpdGVyYXRlVGhyb3VnaENoaWxkcmVuOiAobGF5ZXIsIGJveCwgYWN0aW9uQ2FsbGJhY2spIC0+XG5cdFx0YWN0aW9uQ2FsbGJhY2sgbGF5ZXIsIGJveCwgQFxuXHRcdGZvciBjaGlsZCBpbiBsYXllci5jaGlsZHJlblxuXHRcdFx0QGl0ZXJhdGVUaHJvdWdoQ2hpbGRyZW4gY2hpbGQsIGJveCwgYWN0aW9uQ2FsbGJhY2tcblxuXG5cdG9wZW46IChuYXZpZ2F0aW9uVmlldykgLT5cblx0XHRuYXZpZ2F0aW9uVmlldy5zY3JvbGxUb1RvcChmYWxzZSlcblx0XHQjIEBpdGVyYXRlVGhyb3VnaENoaWxkcmVuIEBjdXJyZW50LCBAY3VycmVudC5jdXN0b20uY3VzdG9tQWN0aW9uX0FycmF5LCBAY3VzdG9tQWN0aW9uX3N3aXRjaE9mZkxheWVyc1xuXG5cdFx0aWYgbmF2aWdhdGlvblZpZXcud3JhcHBlciAhPSB1bmRlZmluZWQgYW5kIG5hdmlnYXRpb25WaWV3LndyYXBwZXIgIT0gbnVsbFxuXHRcdFx0QHRyYW5zaXRpb24obmF2aWdhdGlvblZpZXcucGFyZW50LCBAbW9kYWxUcmFuc2l0aW9uKVxuXHRcdFx0IyBAaXRlcmF0ZVRocm91Z2hDaGlsZHJlbiBuYXZpZ2F0aW9uVmlldy5wYXJlbnQsIG5hdmlnYXRpb25WaWV3LnBhcmVudC5jdXN0b20uY3VzdG9tQWN0aW9uX0FycmF5LCBAY3VzdG9tQWN0aW9uX3N3aXRjaE9uTGF5ZXJzXG5cdFx0ZWxzZVxuXHRcdFx0QHRyYW5zaXRpb24obmF2aWdhdGlvblZpZXcsIEBzdGFja1RyYW5zaXRpb24pXG5cdFx0XHQjIEBpdGVyYXRlVGhyb3VnaENoaWxkcmVuIG5hdmlnYXRpb25WaWV3LCBuYXZpZ2F0aW9uVmlldy5jdXN0b20uY3VzdG9tQWN0aW9uX0FycmF5LCBAY3VzdG9tQWN0aW9uX3N3aXRjaE9uTGF5ZXJzXG5cblxuXG5cblxuXG5jbGFzcyBNb2RhbFZpZXcgZXh0ZW5kcyBTY3JvbGxDb21wb25lbnRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdG5hdmlnYXRpb25WaWV3X1dyYXBwZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwid3JhcHBlclwiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGN1c3RvbTpcblx0XHRcdFx0Y3VzdG9tQWN0aW9uX0FycmF5OiBbXVxuXG5cdFx0bmF2aWdhdGlvblZpZXdfV3JhcHBlci5vbiBFdmVudHMuVGFwLCAtPlxuXHRcdFx0QGNoaWxkcmVuWzBdLmZsb3cuc2hvd1ByZXZpb3VzKClcblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRmbG93OiBudWxsXG5cdFx0XHR3cmFwcGVyOiBuYXZpZ2F0aW9uVmlld19XcmFwcGVyXG5cdFx0XHRzY3JvbGxWZXJ0aWNhbDogdHJ1ZVxuXHRcdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRcdGRpcmVjdGlvbkxvY2s6IHRydWVcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEBwYXJlbnQgPSBuYXZpZ2F0aW9uVmlld19XcmFwcGVyXG5cblx0XHRAb24gRXZlbnRzLlRhcCwgKGV2ZW50LCBsYXllcikgLT5cblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cblx0XHRAb24gRXZlbnRzLlN3aXBlRG93blN0YXJ0LCAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdFx0aWYgQHNjcm9sbFkgPCAwXG5cdFx0XHRcdEBmbG93LnNob3dQcmV2aW91cygpXG5cdFx0XHRcdCMgQGZsb3cuaXRlcmF0ZVRocm91Z2hDaGlsZHJlbiBALCBAY3VzdG9tLmN1c3RvbUFjdGlvbl9BcnJheSwgQGZsb3cuY3VzdG9tQWN0aW9uX3N3aXRjaE9mZkxheWVyc1xuXG5cdFx0aWYgQGZsb3dcblx0XHRcdEBmbG93LnNob3dOZXh0KEB3cmFwcGVyKVxuXHRcdFx0QGZsb3cuc2hvd1ByZXZpb3VzKGFuaW1hdGU6IGZhbHNlKVxuXG5cblxuXHRAZGVmaW5lICdmbG93Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmZsb3dcblx0XHQjIHNldDogKHZhbHVlKSAtPlxuXHRcdCMgXHRAb3B0aW9ucy5mbG93ID0gdmFsdWVcblx0XHQjIFx0dmFsdWUuc2hvd05leHQoQClcblx0XHQjIFx0dmFsdWUuc2hvd1ByZXZpb3VzKGFuaW1hdGU6IGZhbHNlKVxuXHRcblx0QGRlZmluZSAnd3JhcHBlcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy53cmFwcGVyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLndyYXBwZXIgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgXCJwYXJlbnRcIixcblx0XHRlbnVtZXJhYmxlOiBmYWxzZVxuXHRcdGV4cG9ydGFibGU6IGZhbHNlXG5cdFx0aW1wb3J0YWJsZTogdHJ1ZVxuXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QF9wYXJlbnQgb3IgbnVsbFxuXHRcdFxuXHRcdHNldDogKGxheWVyKSAtPlxuXG5cdFx0XHQjIEZsb3cgcGFyZW50XG5cdFx0XHRpZiBsYXllciAhPSBAd3JhcHBlclxuXHRcdFx0XHRAb3B0aW9ucy5mbG93ID0gbGF5ZXJcblxuXHRcdFx0XHRAd3JhcHBlci5wYXJlbnQgPSBsYXllclxuXHRcdFx0XHRAd3JhcHBlci53aWR0aCA9IGxheWVyLndpZHRoXG5cdFx0XHRcdEB3cmFwcGVyLmhlaWdodCA9IGxheWVyLmhlaWdodFxuXHRcdFx0XHRAd2lkdGggPSBsYXllci53aWR0aFxuXHRcdFx0XHRAaGVpZ2h0ID0gbGF5ZXIuaGVpZ2h0XG5cblx0XHRcdFx0cmV0dXJuXG5cblxuXHRcdFx0cmV0dXJuIGlmIGxheWVyIGlzIEBfcGFyZW50XG5cblx0XHRcdHRocm93IEVycm9yKFwiTGF5ZXIucGFyZW50OiBhIGxheWVyIGNhbm5vdCBiZSBpdCdzIG93biBwYXJlbnQuXCIpIGlmIGxheWVyIGlzIEBcblxuXHRcdFx0IyBDaGVjayB0aGUgdHlwZVxuXHRcdFx0aWYgbm90IGxheWVyIGluc3RhbmNlb2YgTGF5ZXJcblx0XHRcdFx0dGhyb3cgRXJyb3IgXCJMYXllci5wYXJlbnQgbmVlZHMgdG8gYmUgYSBMYXllciBvYmplY3RcIlxuXG5cdFx0XHQjIENhbmNlbCBwcmV2aW91cyBwZW5kaW5nIGluc2VydGlvbnNcblx0XHRcdFV0aWxzLmRvbUNvbXBsZXRlQ2FuY2VsKEBfX2luc2VydEVsZW1lbnQpXG5cblx0XHRcdCMgUmVtb3ZlIGZyb20gcHJldmlvdXMgcGFyZW50IGNoaWxkcmVuXG5cdFx0XHRpZiBAX3BhcmVudFxuXHRcdFx0XHRAX3BhcmVudC5fY2hpbGRyZW4gPSBfLnB1bGwgQF9wYXJlbnQuX2NoaWxkcmVuLCBAXG5cdFx0XHRcdEBfcGFyZW50Ll9lbGVtZW50LnJlbW92ZUNoaWxkIEBfZWxlbWVudFxuXHRcdFx0XHRAX3BhcmVudC5lbWl0IFwiY2hhbmdlOmNoaWxkcmVuXCIsIHthZGRlZDogW10sIHJlbW92ZWQ6IFtAXX1cblx0XHRcdFx0QF9wYXJlbnQuZW1pdCBcImNoYW5nZTpzdWJMYXllcnNcIiwge2FkZGVkOiBbXSwgcmVtb3ZlZDogW0BdfVxuXG5cdFx0XHQjIEVpdGhlciBpbnNlcnQgdGhlIGVsZW1lbnQgdG8gdGhlIG5ldyBwYXJlbnQgZWxlbWVudCBvciBpbnRvIGRvbVxuXHRcdFx0aWYgbGF5ZXJcblx0XHRcdFx0bGF5ZXIuX2VsZW1lbnQuYXBwZW5kQ2hpbGQgQF9lbGVtZW50XG5cdFx0XHRcdGxheWVyLl9jaGlsZHJlbi5wdXNoIEBcblx0XHRcdFx0bGF5ZXIuZW1pdCBcImNoYW5nZTpjaGlsZHJlblwiLCB7YWRkZWQ6IFtAXSwgcmVtb3ZlZDogW119XG5cdFx0XHRcdGxheWVyLmVtaXQgXCJjaGFuZ2U6c3ViTGF5ZXJzXCIsIHthZGRlZDogW0BdLCByZW1vdmVkOiBbXX1cblx0XHRcdGVsc2Vcblx0XHRcdFx0QF9pbnNlcnRFbGVtZW50KClcblxuXHRcdFx0b2xkUGFyZW50ID0gQF9wYXJlbnRcblx0XHRcdCMgU2V0IHRoZSBwYXJlbnRcblx0XHRcdEBfcGFyZW50ID0gbGF5ZXJcblxuXHRcdFx0IyBQbGFjZSB0aGlzIGxheWVyIG9uIHRvcCBvZiBpdHMgc2libGluZ3Ncblx0XHRcdEBicmluZ1RvRnJvbnQoKVxuXG5cdFx0XHRAZW1pdCBcImNoYW5nZTpwYXJlbnRcIiwgQF9wYXJlbnQsIG9sZFBhcmVudFxuXHRcdFx0QGVtaXQgXCJjaGFuZ2U6c3VwZXJMYXllclwiLCBAX3BhcmVudCwgb2xkUGFyZW50XG5cblxuXHRcblx0YWRkOiAoY29udGVudFZpZXcpIC0+XG5cdFx0Y29udGVudFZpZXcucGFyZW50ID0gQGN1c3RvbS52aWV3LmNvbnRlbnRcblx0XHRAYmFja2dyb3VuZENvbG9yID0gbnVsbFxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuY2xhc3MgTmF2aWdhdGlvblZpZXcgZXh0ZW5kcyBTY3JvbGxDb21wb25lbnRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRmbG93OiBudWxsXG5cdFx0XHRiYWNrQnV0dG9uOiBudWxsXG5cdFx0XHRzaG93QmFjazogdHJ1ZVxuXHRcdFx0c2Nyb2xsVmVydGljYWw6IHRydWVcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRkaXJlY3Rpb25Mb2NrOiB0cnVlXG5cdFx0XHRjdXN0b206XG5cdFx0XHRcdGJhY2tCdXR0b25fbmFtZTogXCJCYWNrX0J1dHRvblwiXG5cdFx0XHRcdGN1c3RvbUFjdGlvbl9BcnJheTogW11cblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0dHJ5IEBiYWNrQnV0dG9uLmJyaW5nVG9Gcm9udCgpXG5cblx0XHRAb24gRXZlbnRzLlN3aXBlUmlnaHRTdGFydCwgKGV2ZW50LCBsYXllcikgPT5cblx0XHRcdHRyeSBAZmxvdy5zaG93UHJldmlvdXMoKVxuXHRcdFx0IyB0cnkgQGZsb3cuaXRlcmF0ZVRocm91Z2hDaGlsZHJlbiBALCBAY3VzdG9tLmN1c3RvbUFjdGlvbl9BcnJheSwgQGZsb3cuY3VzdG9tQWN0aW9uX3N3aXRjaE9mZkxheWVyc1xuXHRcdFxuXHRcdEBvbiBcImNoYW5nZTpjaGlsZHJlblwiLCAtPlxuXHRcdFx0dHJ5IEBiYWNrQnV0dG9uLmJyaW5nVG9Gcm9udCgpXG5cdFxuXG5cdEBkZWZpbmUgJ2Zsb3cnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZmxvd1xuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuZmxvdyA9IHZhbHVlXG5cdFx0XHR2YWx1ZS5zaG93TmV4dChAKVxuXHRcdFx0dmFsdWUuc2hvd1ByZXZpb3VzKGFuaW1hdGU6IGZhbHNlKVxuXG5cblxuXHRAZGVmaW5lICdiYWNrQnV0dG9uJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmJhY2tCdXR0b25cblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLmJhY2tCdXR0b24gPSB2YWx1ZVxuXHRcdFx0dmFsdWUubmFtZSA9IEBjdXN0b20uYmFja0J1dHRvbl9uYW1lXG5cblx0XHRcdHZhbHVlLnBhcmVudCA9IEBcblx0XHRcdHZhbHVlLmJyaW5nVG9Gcm9udCgpXG5cdFx0XHRcblx0XHRcdHRyeSB2YWx1ZS5oYW5kbGVyID0gKCkgPT5cblx0XHRcdFx0QGZsb3cuc2hvd1ByZXZpb3VzKClcblx0XHRcdFx0IyBAZmxvdy5pdGVyYXRlVGhyb3VnaENoaWxkcmVuIEAsIEBjdXN0b20uY3VzdG9tQWN0aW9uX0FycmF5LCBAZmxvdy5jdXN0b21BY3Rpb25fc3dpdGNoT2ZmTGF5ZXJzXG5cdFxuXHRAZGVmaW5lICdzaG93QmFjaycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93QmFja1xuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuc2hvd0JhY2sgPSB2YWx1ZVxuXHRcdFx0aWYgdmFsdWUgPT0gdHJ1ZSBhbmQgQGJhY2tCdXR0b24gPT0gbnVsbFxuXHRcdFx0XHRAYmFja0J1dHRvbiA9IEBjcmVhdGVfQmFja0J1dHRvbigpXG5cblx0XG5cdGNyZWF0ZV9CYWNrQnV0dG9uOiAoKSA9PlxuXG5cdFx0cmV0dXJuIG5ldyBCdXR0b25cblx0XHRcdG5hbWU6IEBjdXN0b20uYmFja0J1dHRvbl9uYW1lXG5cdFx0XHRwYXJlbnQ6IEAsIHNpemU6IDgwLCB5OiAzMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHQjIGJhY2tncm91bmRDb2xvcjogXCJyZWRcIlxuXHRcdFx0aGFuZGxlcjogKCkgLT4gQHBhcmVudC5mbG93LnNob3dQcmV2aW91cygpXG5cblxuXHRAZGVmaW5lIFwicGFyZW50XCIsXG5cdFx0ZW51bWVyYWJsZTogZmFsc2Vcblx0XHRleHBvcnRhYmxlOiBmYWxzZVxuXHRcdGltcG9ydGFibGU6IHRydWVcblxuXHRcdGdldDogLT5cblx0XHRcdEBfcGFyZW50IG9yIG51bGxcblx0XHRcblx0XHRzZXQ6IChsYXllcikgLT5cblxuXHRcdFx0cmV0dXJuIGlmIGxheWVyIGlzIEBfcGFyZW50XG5cblx0XHRcdHRocm93IEVycm9yKFwiTGF5ZXIucGFyZW50OiBhIGxheWVyIGNhbm5vdCBiZSBpdCdzIG93biBwYXJlbnQuXCIpIGlmIGxheWVyIGlzIEBcblxuXHRcdFx0IyBDaGVjayB0aGUgdHlwZVxuXHRcdFx0aWYgbm90IGxheWVyIGluc3RhbmNlb2YgTGF5ZXJcblx0XHRcdFx0dGhyb3cgRXJyb3IgXCJMYXllci5wYXJlbnQgbmVlZHMgdG8gYmUgYSBMYXllciBvYmplY3RcIlxuXG5cdFx0XHQjIENhbmNlbCBwcmV2aW91cyBwZW5kaW5nIGluc2VydGlvbnNcblx0XHRcdFV0aWxzLmRvbUNvbXBsZXRlQ2FuY2VsKEBfX2luc2VydEVsZW1lbnQpXG5cblx0XHRcdCMgUmVtb3ZlIGZyb20gcHJldmlvdXMgcGFyZW50IGNoaWxkcmVuXG5cdFx0XHRpZiBAX3BhcmVudFxuXHRcdFx0XHRAX3BhcmVudC5fY2hpbGRyZW4gPSBfLnB1bGwgQF9wYXJlbnQuX2NoaWxkcmVuLCBAXG5cdFx0XHRcdEBfcGFyZW50Ll9lbGVtZW50LnJlbW92ZUNoaWxkIEBfZWxlbWVudFxuXHRcdFx0XHRAX3BhcmVudC5lbWl0IFwiY2hhbmdlOmNoaWxkcmVuXCIsIHthZGRlZDogW10sIHJlbW92ZWQ6IFtAXX1cblx0XHRcdFx0QF9wYXJlbnQuZW1pdCBcImNoYW5nZTpzdWJMYXllcnNcIiwge2FkZGVkOiBbXSwgcmVtb3ZlZDogW0BdfVxuXG5cdFx0XHQjIEVpdGhlciBpbnNlcnQgdGhlIGVsZW1lbnQgdG8gdGhlIG5ldyBwYXJlbnQgZWxlbWVudCBvciBpbnRvIGRvbVxuXHRcdFx0aWYgbGF5ZXJcblx0XHRcdFx0bGF5ZXIuX2VsZW1lbnQuYXBwZW5kQ2hpbGQgQF9lbGVtZW50XG5cdFx0XHRcdGxheWVyLl9jaGlsZHJlbi5wdXNoIEBcblx0XHRcdFx0bGF5ZXIuZW1pdCBcImNoYW5nZTpjaGlsZHJlblwiLCB7YWRkZWQ6IFtAXSwgcmVtb3ZlZDogW119XG5cdFx0XHRcdGxheWVyLmVtaXQgXCJjaGFuZ2U6c3ViTGF5ZXJzXCIsIHthZGRlZDogW0BdLCByZW1vdmVkOiBbXX1cblx0XHRcdGVsc2Vcblx0XHRcdFx0QF9pbnNlcnRFbGVtZW50KClcblxuXHRcdFx0b2xkUGFyZW50ID0gQF9wYXJlbnRcblx0XHRcdCMgU2V0IHRoZSBwYXJlbnRcblx0XHRcdEBfcGFyZW50ID0gbGF5ZXJcblxuXHRcdFx0IyBQbGFjZSB0aGlzIGxheWVyIG9uIHRvcCBvZiBpdHMgc2libGluZ3Ncblx0XHRcdEBicmluZ1RvRnJvbnQoKVxuXG5cdFx0XHRAZW1pdCBcImNoYW5nZTpwYXJlbnRcIiwgQF9wYXJlbnQsIG9sZFBhcmVudFxuXHRcdFx0QGVtaXQgXCJjaGFuZ2U6c3VwZXJMYXllclwiLCBAX3BhcmVudCwgb2xkUGFyZW50XG5cblx0XHRcdEB3aWR0aCA9IEBwYXJlbnQud2lkdGhcblx0XHRcdEBoZWlnaHQgPSBAcGFyZW50LmhlaWdodFxuXG5cdFx0XHRAZmxvdyA9IEBwYXJlbnRcblxuXHRcblxuXG5cdGFkZDogKGNvbnRlbnRWaWV3KSAtPlxuXHRcdGNvbnRlbnRWaWV3LnBhcmVudCA9IEBjb250ZW50XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgRmxvd1ZpZXcsIE5hdmlnYXRpb25WaWV3LCBNb2RhbFZpZXcgfSIsIiMgUHJldmlldyBDb21wb25lbnRcblxuRnJhbWVyLkRlZmF1bHRzLkFuaW1hdGlvbiA9XG5cdGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSlcblx0dGltZTogMC41XG5cbiMge1ByZXZpZXdfQ2xhc3N9ID0gcmVxdWlyZSBcIlByZXZpZXdfQ2xhc3NcIlxuIyB7UHJldmlld19Jbml0fSA9IHJlcXVpcmUgXCJQcmV2aWV3X0luaXRcIlxue1ByZXZpZXdfVUl9ID0gcmVxdWlyZSBcIlByZXZpZXdfVUlcIlxuIyB7Q29udHJvbF9DbGFzc30gPSByZXF1aXJlIFwiQ29udHJvbF9DbGFzc1wiXG5cbmNsYXNzIEZpeFByZXZpZXdFeHBvcnQgZXh0ZW5kcyBQcmV2aWV3X1VJXG5jbGFzcyBleHBvcnRzLlByZXZpZXcgZXh0ZW5kcyBGaXhQcmV2aWV3RXhwb3J0XG5cblxuXG5cbiMgTmF0aXZlXG5cbmB3aW5kb3cuc2F2ZVByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0ID0gZnVuY3Rpb24gKGxheWVyKSB7XG5cdHdpbmRvdy5wcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdCA9IGxheWVyXG59XG5gXG5cbmB3aW5kb3cucmVjZWl2ZU1lc3NhZ2VOb3JtYWwgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0d2luZG93LnByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0LmFuaW1hdGVTdGF0ZVRvTm9ybWFsKClcbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0ZU5vcm1hbFwiLCByZWNlaXZlTWVzc2FnZU5vcm1hbCwgZmFsc2UpO1xuYFxuXG5gd2luZG93LnJlY2VpdmVNZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdGNvbnNvbGUubG9nKGV2ZW50KVxuXHR3aW5kb3cucHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QuYW5pbWF0ZVN0YXRlVG9GaWxsKClcbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0ZUZpbGxcIiwgcmVjZWl2ZU1lc3NhZ2UsIGZhbHNlKTtcbmBcblxuXG5cblxuXG5cbiIsIlxuXG5vdmVycmlkZVRpbWVWYWx1ZSA9IFwiMjA6MjFcIlxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXdfQ2xhc3MgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0c3RhdGVHdWFyZExheWVyID0gbmV3IExheWVyIHsgb3BhY2l0eTogMCwgc2l6ZTogMSB9XG5cdFx0c3RhdGVHdWFyZExheWVyLnN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IHNjYWxlOiAxIH1cblx0XHRcdFwiZmlsbFwiOiB7IHNjYWxlOiAxIH1cblx0XHRzdGF0ZUd1YXJkTGF5ZXIuc3RhdGVTd2l0Y2goXCJmaWxsXCIpXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0bmFtZTogXCJQcmV2aWV3XCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA0MlxuXG5cdFx0XHRzdGF0ZUd1YXJkOiBzdGF0ZUd1YXJkTGF5ZXJcblx0XHRcdHZpZXc6IG51bGxcblxuXHRcdFx0Ym9yZGVyVmlldzogbnVsbFxuXHRcdFx0c3RhdHVzQmFyVmlldzogbnVsbFxuXHRcdFx0aG9tZUJhclZpZXc6IG51bGxcblxuXHRcdFx0Y29uZmlnVmlldzogbnVsbFxuXHRcdFx0c2VjdGlvblZpZXc6IG51bGxcblx0XHRcdFxuXG5cblx0XHRcdCMgRGV2aWNlXG5cdFx0XHRzaG93RGV2aWNlOiB0cnVlXG5cblx0XHRcdCMgQmFyc1xuXHRcdFx0c2hvd0JhcnM6IHRydWVcblx0XHRcdHNob3dTdGF0dXNCYXI6IHRydWVcblx0XHRcdHNob3dIb21lQmFyOiB0cnVlXG5cblx0XHRcdHRpbWVWYWx1ZTogb3ZlcnJpZGVUaW1lVmFsdWUgIyBubyBvdmVycmlkZVxuXHRcdFx0Zm9yY2VBbmRyb2lkQmFyOiBmYWxzZVxuXHRcdFx0c3RhdHVzQmFyX3RoZW1lOiBcImRhcmtcIlxuXHRcdFx0aG9tZUJhcl90aGVtZTogXCJkYXJrXCJcblxuXHRcdFx0IyBDb250cm9sc1xuXHRcdFx0c2hvd1VJOiB0cnVlXG5cdFx0XHRzaG93TG9nbzogdHJ1ZVxuXHRcdFx0c2NhbGVTdGF0ZTogXCJmaWxsXCIgIyBmaWxsIC8gbm9ybWFsXG5cdFx0XHRzaG93SGludHM6IHRydWVcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0d2luZG93LnNhdmVQcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdChAKVxuXHRcdEB1cGRhdGVJbml0KClcblx0XHRcblx0XHRAc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgc2NhbGU6IDEgfVxuXHRcdFx0XCJmaWxsXCI6IHsgc2NhbGU6IDEgfVxuXG5cblxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnZpZXcgPSB2YWx1ZVxuXHRcdFx0QHdpZHRoID0gQHZpZXcud2lkdGhcblx0XHRcdEBoZWlnaHQgPSBAdmlldy5oZWlnaHRcblx0XHRcdEB2aWV3LnBhcmVudCA9IEBcblx0XG5cdEBkZWZpbmUgJ3N0YXRlR3VhcmQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc3RhdGVHdWFyZFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zdGF0ZUd1YXJkID0gdmFsdWVcblxuXG5cblx0QGRlZmluZSAnZGV2aWNlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmJvcmRlclZpZXdcblx0XG5cdEBkZWZpbmUgJ3N0YXR1c0JhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zdGF0dXNCYXJWaWV3XG5cdFxuXHRAZGVmaW5lICdob21lQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmhvbWVCYXJWaWV3XG5cblxuXG5cdEBkZWZpbmUgJ2JvcmRlclZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYm9yZGVyVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ib3JkZXJWaWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3N0YXR1c0JhclZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc3RhdHVzQmFyVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zdGF0dXNCYXJWaWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2hvbWVCYXJWaWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmhvbWVCYXJWaWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmhvbWVCYXJWaWV3ID0gdmFsdWVcblxuXG5cblx0QGRlZmluZSAnY29uZmlnVmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5jb25maWdWaWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmNvbmZpZ1ZpZXcgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnc2VjdGlvblZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2VjdGlvblZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2VjdGlvblZpZXcgPSB2YWx1ZVxuXHRcblxuXHRcblx0XG5cdFxuXG5cdGFuaW1hdGVTdGF0ZVRvTm9ybWFsOiAoKSA9PlxuXHRcdEBzdGF0ZUd1YXJkLnN0YXRlU3dpdGNoKFwibm9ybWFsXCIpXG5cdFx0QGFuaW1hdGUoc2NhbGU6IEBzdGF0ZXNbXCJub3JtYWxcIl0uc2NhbGUsIG9wdGlvbnM6IHsgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41IH0pXG5cdFx0aWYgQGJvcmRlclZpZXcgdGhlbiBAYm9yZGVyVmlldy5hbmltYXRlU3RhdGVUb05vcm1hbCgpXG5cdFxuXHRhbmltYXRlU3RhdGVUb0ZpbGw6ICgpID0+XG5cdFx0QHN0YXRlR3VhcmQuc3RhdGVTd2l0Y2goXCJmaWxsXCIpXG5cdFx0QGFuaW1hdGUoc2NhbGU6IEBzdGF0ZXNbXCJmaWxsXCJdLnNjYWxlLCBvcHRpb25zOiB7IGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSB9KVxuXHRcdGlmIEBib3JkZXJWaWV3IHRoZW4gQGJvcmRlclZpZXcuYW5pbWF0ZVN0YXRlVG9GaWxsKClcblxuXHRzdGF0ZVN3aXRjaFRvTm9ybWFsOiAoKSA9PlxuXHRcdEBzdGF0ZUd1YXJkLnN0YXRlU3dpdGNoKFwibm9ybWFsXCIpXG5cdFx0QGFuaW1hdGUoc2NhbGU6IEBzdGF0ZXNbXCJub3JtYWxcIl0uc2NhbGUsIG9wdGlvbnM6IHsgY3VydmU6IEJlemllci5saW5lYXIsIHRpbWU6IDAgfSlcblx0XHRpZiBAYm9yZGVyVmlldyB0aGVuIEBib3JkZXJWaWV3LnN0YXRlU3dpdGNoVG9Ob3JtYWwoKVxuXHRcblx0c3RhdGVTd2l0Y2hUb0ZpbGw6ICgpID0+XG5cdFx0QHN0YXRlR3VhcmQuc3RhdGVTd2l0Y2goXCJmaWxsXCIpXG5cdFx0QGFuaW1hdGUoc2NhbGU6IEBzdGF0ZXNbXCJmaWxsXCJdLnNjYWxlLCBvcHRpb25zOiB7IGN1cnZlOiBCZXppZXIubGluZWFyLCB0aW1lOiAwIH0pXG5cdFx0aWYgQGJvcmRlclZpZXcgdGhlbiBAYm9yZGVyVmlldy5zdGF0ZVN3aXRjaFRvRmlsbCgpXG5cdFxuXG5cdFxuXHRcblxuXHRAZGVmaW5lICdzaG93RGV2aWNlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNob3dEZXZpY2Vcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0RldmljZSA9IHZhbHVlXG5cdFxuXG5cblx0QGRlZmluZSAnc2hvd0JhcnMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2hvd0JhcnNcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0JhcnMgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnc2hvd1N0YXR1c0JhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93U3RhdHVzQmFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNob3dTdGF0dXNCYXIgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnc2hvd0hvbWVCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2hvd0hvbWVCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0hvbWVCYXIgPSB2YWx1ZVxuXG5cblxuXG5cblx0QGRlZmluZSAndGltZVZhbHVlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRpbWVWYWx1ZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50aW1lVmFsdWUgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnZm9yY2VBbmRyb2lkQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZEJhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRCYXIgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnc3RhdHVzQmFyX3RoZW1lJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnN0YXR1c0Jhcl90aGVtZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zdGF0dXNCYXJfdGhlbWUgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnaG9tZUJhcl90aGVtZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ob21lQmFyX3RoZW1lXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmhvbWVCYXJfdGhlbWUgPSB2YWx1ZVxuXG5cblxuXG5cdEBkZWZpbmUgJ3Nob3dVSScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93VUlcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd1VJID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3Nob3dMb2dvJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNob3dMb2dvXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNob3dMb2dvID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3Nob3dIaW50cycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93SGludHNcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0hpbnRzID0gdmFsdWVcblx0XG5cdFxuXHRcblxuXG5cdEBkZWZpbmUgJ3NjYWxlU3RhdGUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2NhbGVTdGF0ZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zY2FsZVN0YXRlID0gdmFsdWVcblx0XG5cblxuXG5cblxuXG5cblx0dXBkYXRlSW5pdDogKCkgPT5cblxuXHRcdEBzY2FsZVN0YXRlID0gQGdldFN0YXRlR2VuZXJpYyhcInNjYWxlXCIsIFt7IHZhbHVlOiBcImZpbGxcIiwgcmVzdWx0OiBcImZpbGxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJub3JtYWxcIiwgcmVzdWx0OiBcIm5vcm1hbFwiIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogXCJub3JtYWxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogXCJmaWxsXCIgfV0sIEBzY2FsZVN0YXRlKVxuXHRcdFxuXHRcdEBzY2FsZVN0YXRlID0gQGdldFN0YXRlR2VuZXJpYyhcImZpbGxcIiwgW3sgdmFsdWU6IFwib25cIiwgcmVzdWx0OiBcImZpbGxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvZmZcIiwgcmVzdWx0OiBcIm5vcm1hbFwiIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcInRydWVcIiwgcmVzdWx0OiBcImZpbGxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IFwibm9ybWFsXCIgfV0sIEBzY2FsZVN0YXRlKVxuXG5cdFx0QHNob3dVSSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJidXR0b25cIiwgW3sgdmFsdWU6IFwiZmFsc2VcIiwgcmVzdWx0OiBmYWxzZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogdHJ1ZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvblwiLCByZXN1bHQ6IHRydWUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogZmFsc2UgfV0sIEBzaG93VUkpXG5cdFx0XG5cdFx0QHNob3dVSSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJ1aVwiLCBbeyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcInRydWVcIiwgcmVzdWx0OiB0cnVlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9uXCIsIHJlc3VsdDogdHJ1ZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvZmZcIiwgcmVzdWx0OiBmYWxzZSB9XSwgQHNob3dVSSlcblxuXHRcdEBzaG93TG9nbyA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJsb2dvXCIsIFt7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwidHJ1ZVwiLCByZXN1bHQ6IHRydWUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwib25cIiwgcmVzdWx0OiB0cnVlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9mZlwiLCByZXN1bHQ6IGZhbHNlIH1dLCBAc2hvd0xvZ28pXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRAc2hvd0RldmljZSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJkZXZpY2VcIiwgW3sgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvblwiLCByZXN1bHQ6IHRydWUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwidHJ1ZVwiLCByZXN1bHQ6IHRydWUgfV0sIEBzaG93RGV2aWNlKVxuXHRcdFxuXHRcdEBzaG93SGludHMgPSBAZ2V0U3RhdGVHZW5lcmljKFwiaGludHNcIiwgW3sgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvblwiLCByZXN1bHQ6IHRydWUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwidHJ1ZVwiLCByZXN1bHQ6IHRydWUgfV0sIEBzaG93SGludHMpXG5cblxuXG5cdCMgZ2V0U3RhdGVHZW5lcmljOiAoa2V5ID0gXCJzY2FsZVwiLCBwYWlycyA9IFt7IHZhbHVlOiAsIHJlc3VsdDogfSwge3ZhbHVlOiAsIHJlc3VsdDogfV0sIGRlZmF1bHRSZXN1bHQgPSBcIlwiKVxuXHRnZXRTdGF0ZUdlbmVyaWM6IChzdGF0ZUtleSA9IFwic2NhbGVcIiwgc3RhdGVQYWlycyA9IFtdLCBkZWZhdWx0UmVzdWx0ID0gXCJcIikgPT5cblx0XHRyZXN1bHQgPSBkZWZhdWx0UmVzdWx0XG5cblx0XHRmb3IgaXRlbSBpbiBsb2NhdGlvbi5zZWFyY2hbMS4uXS5zcGxpdCgnJicpXG5cdFx0XHRrZXlWYWx1ZVBhaXIgPSBpdGVtLnNwbGl0KFwiPVwiKVxuXHRcdFx0a2V5UGFydCA9IGtleVZhbHVlUGFpclswXVxuXHRcdFx0dmFsdWVQYXJ0ID0ga2V5VmFsdWVQYWlyWzFdXG5cblx0XHRcdGlmIGtleVBhcnQgPT0gc3RhdGVLZXlcblx0XHRcdFx0Zm9yIHBhaXIgaW4gc3RhdGVQYWlyc1xuXHRcdFx0XHRcdGlmIHZhbHVlUGFydCA9PSBwYWlyLnZhbHVlXG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBwYWlyLnJlc3VsdFxuXHRcdFx0XHRcdCMgZWxzZVxuXHRcdFx0XHRcdFx0IyBwcmludCBcIm5vdCBcIiArIFwiICN7cGFpci52YWx1ZX1cIiBcblx0XHRcblx0XHRyZXR1cm4gcmVzdWx0XG5cdFxuXHRcblx0XG5cdFxuIiwiXG5cbntQcmV2aWV3X0NsYXNzfSA9IHJlcXVpcmUgXCJQcmV2aWV3X0NsYXNzXCJcbntEZXZpY2VfQ2xhc3N9ID0gcmVxdWlyZSBcIkRldmljZV9DbGFzc1wiXG5cbntIb21lQmFyX0NsYXNzfSA9IHJlcXVpcmUgXCJIb21lQmFyX0NsYXNzXCJcbntTdGF0dXNCYXJfQ2xhc3N9ID0gcmVxdWlyZSBcIlN0YXR1c0Jhcl9DbGFzc1wiXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld19Jbml0IGV4dGVuZHMgUHJldmlld19DbGFzc1xuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAc2NhbGVQcmV2aWV3KClcblxuXHRcblx0XG5cdHNjYWxlUHJldmlldzogKCkgPT5cblx0XHRpZiBVdGlscy5pc01vYmlsZSgpIHRoZW4gQHByZXZpZXdNb2JpbGUoKVxuXHRcdGVsc2UgQHByZXZpZXdEZXNrdG9wKClcblx0XG5cdHVwZGF0ZVByZXZpZXc6ICgpID0+XG5cdFx0aWYgQHN0YXRlR3VhcmQuc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcImZpbGxcIiB0aGVuIEBzdGF0ZVN3aXRjaFRvRmlsbCgpXG5cdFx0ZWxzZSBAc3RhdGVTd2l0Y2hUb05vcm1hbCgpXG5cblx0XHQjIGlmIEBib3JkZXJWaWV3XG5cdFx0IyBcdGlmIEBzY2FsZVN0YXRlID09IFwiZmlsbFwiIHRoZW4gQGJvcmRlclZpZXcuc3RhdGVTd2l0Y2hUb0ZpbGwoKVxuXHRcdCMgXHRlbHNlIEBib3JkZXJWaWV3LnN0YXRlU3dpdGNoVG9Ob3JtYWwoKVxuXHRcblxuXG5cblx0cHJldmlld0Rlc2t0b3A6ICgpID0+XG5cdFx0aWYgQHNob3dEZXZpY2UgdGhlbiBAYm9yZGVyVmlldyA9IG5ldyBEZXZpY2VfQ2xhc3MgeyB2aWV3OiBAIH1cblxuXHRcdGlmIEBzaG93SGludHMgdGhlbiBGcmFtZXIuRXh0cmFzLkhpbnRzLmVuYWJsZSgpXG5cdFx0ZWxzZSBGcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXG5cdFx0aWYgQHNob3dCYXJzXG5cdFx0XHRpZiBAc2hvd0hvbWVCYXIgdGhlbiBAaG9tZUJhclZpZXcgPSBuZXcgSG9tZUJhcl9DbGFzcyB7IHZpZXc6IEAgfVxuXHRcdFx0aWYgQHNob3dTdGF0dXNCYXIgdGhlbiBAc3RhdHVzQmFyVmlldyA9IG5ldyBTdGF0dXNCYXJfQ2xhc3MgeyB2aWV3OiBAIH1cblxuXHRcdEBjbGlwID0gdHJ1ZVxuXHRcdEB1cGRhdGVTY2FsZSgpXG5cdFx0QHVwZGF0ZVByZXZpZXdPblJlc2l6ZSgpXG5cdFx0XG5cdFx0aWYgQHNjYWxlU3RhdGUgPT0gXCJmaWxsXCIgdGhlbiBAc3RhdGVTd2l0Y2hUb0ZpbGwoKVxuXHRcdGVsc2UgQHN0YXRlU3dpdGNoVG9Ob3JtYWwoKVxuXG5cdFxuXHRwcmV2aWV3TW9iaWxlOiAoKSA9PlxuXHRcdEZyYW1lci5FeHRyYXMuSGludHMuZGlzYWJsZSgpXG5cdFx0XG5cdFx0QHNjYWxlID0gU2NyZWVuLndpZHRoIC8gQHdpZHRoXG5cdFx0QHggPSBBbGlnbi5jZW50ZXJcblx0XHRAeSA9IEFsaWduLmNlbnRlclxuXG5cdFxuXG5cdHVwZGF0ZVNjYWxlOiAoKSA9PlxuXG5cdFx0QHggPSBBbGlnbi5jZW50ZXJcblx0XHRAeSA9IEFsaWduLmNlbnRlclxuXG5cdFx0aWYgQGJvcmRlclZpZXdcblx0XHRcdEBib3JkZXJWaWV3LnggPSBBbGlnbi5jZW50ZXJcblx0XHRcdEBib3JkZXJWaWV3LnkgPSBBbGlnbi5jZW50ZXJcblxuXHRcdHNjYWxlWCA9IChTY3JlZW4ud2lkdGggLSAxMTIpIC8gQHdpZHRoXG5cdFx0c2NhbGVZID0gKFNjcmVlbi5oZWlnaHQgLSAxMTIpIC8gQGhlaWdodFxuXHRcdEBzdGF0ZXNbXCJmaWxsXCJdLnNjYWxlID0gTWF0aC5taW4oc2NhbGVYLCBzY2FsZVkpXG5cblx0XHRpZiBAYm9yZGVyVmlld1xuXHRcdFx0QGJvcmRlclZpZXcuc3RhdGVzW1wiZmlsbFwiXS5zY2FsZSA9IEBzdGF0ZXNbXCJmaWxsXCJdLnNjYWxlXG5cblxuXG5cblxuXG5cblxuXHR1cGRhdGVQcmV2aWV3T25SZXNpemU6ICgpID0+XG5cdFx0bG9jYWxQcmV2aWV3ID0gQFxuXHRcdFxuXHRcdENhbnZhcy5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZSgpXG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlUHJldmlldygpXG5cdFx0XG5cdFx0Q2FudmFzLm9uIFwiY2hhbmdlOndpZHRoXCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlU2NhbGUoKVxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVByZXZpZXcoKVxuXHRcdFxuXG5cdFx0U2NyZWVuLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVNjYWxlKClcblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVQcmV2aWV3KClcblx0XHRcblx0XHRTY3JlZW4ub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZSgpXG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlUHJldmlldygpXG5cdFxuXHRcblxuXG4iLCJcbntMb2dvTGF5ZXJ9ID0gcmVxdWlyZSBcIkxvZ29cIlxue1ByZXZpZXdfSW5pdH0gPSByZXF1aXJlIFwiUHJldmlld19Jbml0XCJcbntVSV9TZWN0aW9ufSA9IHJlcXVpcmUgXCJVSV9TZWN0aW9uXCJcbntVSV9Db25maWd9ID0gcmVxdWlyZSBcIlVJX0NvbmZpZ1wiXG5cblxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3X1VJIGV4dGVuZHMgUHJldmlld19Jbml0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAc2hvd0Rlc2t0b3BVSSgpXG5cdFxuXG5cblx0c2hvd0Rlc2t0b3BVSTogKCkgPT5cblx0XHRpZiBVdGlscy5pc01vYmlsZSgpIHRoZW4gcmV0dXJuXG5cblx0XHRpZiBAc2hvd0xvZ28gdGhlbiBAY3JlYXRlTG9nb0J1dHRvbigpXG5cdFx0aWYgQHNob3dVSSB0aGVuIEBhZGRDb25maWcoKVxuXG5cblxuXG5cblxuXHRjcmVhdGVMb2dvQnV0dG9uOiAoKSA9PlxuXHRcdFxuXHRcdG9wZW5Ib21lSGFuZGxlciA9ICgpIC0+XG5cdFx0XHR3aW5kb3cubG9jYXRpb24gPSBcImh0dHBzOi8vdGlsbGx1ci5jb21cIlxuXHRcdFxuXHRcdGxvZ29CdXR0b24gPSBuZXcgTG9nb0xheWVyXG5cdFx0XHR3aWR0aDogNzYsIGhlaWdodDogMzJcblx0XHRcdHg6IEFsaWduLmxlZnQoMzIpLCB5OiBBbGlnbi50b3AoMTIpXG5cdFx0XHRoYW5kbGVyOiBvcGVuSG9tZUhhbmRsZXJcblx0XG5cblx0YWRkU2VjdGlvbjogKHRpdGxlLCBhY3Rpb25BcnJheSA9IFtdKSA9PlxuXHRcdGlmIEBzZWN0aW9uVmlldyA9PSBudWxsIHRoZW4gQHNlY3Rpb25WaWV3ID0gbmV3IFVJX1NlY3Rpb25cblx0XHRAc2VjdGlvblZpZXcuYWRkU2VjdGlvbih0aXRsZSwgYWN0aW9uQXJyYXkpXG5cblxuXHQjIEZpbGwg4peJXG5cdCMgRmlsbCDil45cblxuXHRhZGRDb25maWc6ICgpID0+XG5cdFx0QGNvbmZpZ1ZpZXcgPSBuZXcgVUlfQ29uZmlnIHsgdmlldzogQCB9XG5cblx0XHRzY2FsZVR1cGxlID0gW1wiRml0XCIsIFwiMTAwJVwiXVxuXHRcdGhpbnRzVHVwbGUgPSBbXCJIaW50cyDil4lcIiwgXCJIaW50cyDil45cIl1cblxuXG5cdFx0dG9nZ2xlU2NhbGUgPSAoZW1wdHlEYXRhLCBsb2NhbEJ1dHRvbikgPT5cblx0XHRcdGlmIEBzdGF0ZUd1YXJkLnN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJub3JtYWxcIlxuXHRcdFx0XHRAYW5pbWF0ZVN0YXRlVG9GaWxsKClcblx0XHRcdFx0bG9jYWxCdXR0b24udGV4dCA9IHNjYWxlVHVwbGVbMF1cblx0XHRcdGVsc2Vcblx0XHRcdFx0QGFuaW1hdGVTdGF0ZVRvTm9ybWFsKClcblx0XHRcdFx0bG9jYWxCdXR0b24udGV4dCA9IHNjYWxlVHVwbGVbMV1cblx0XHRcdFx0XG5cdFx0XG5cdFx0dG9nZ2xlVGlwcyA9IChlbXB0eURhdGEsIGxvY2FsQnV0dG9uKSA9PlxuXHRcdFx0aWYgQHNob3dIaW50c1xuXHRcdFx0XHRAaGlkZUhpbnRzSGFuZGxlcigpXG5cdFx0XHRcdGxvY2FsQnV0dG9uLnRleHQgPSBoaW50c1R1cGxlWzFdXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBzaG93SGludHNIYW5kbGVyKClcblx0XHRcdFx0bG9jYWxCdXR0b24udGV4dCA9IGhpbnRzVHVwbGVbMF1cblx0XHRcblx0XHRpbml0U2NhbGVUaXRsZSA9IGlmIEBzaG93SGludHMgdGhlbiBoaW50c1R1cGxlWzBdIGVsc2UgaGludHNUdXBsZVsxXVxuXHRcdGluaXRTdGF0ZVRpdGxlID0gaWYgQHN0YXRlR3VhcmQuc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcIm5vcm1hbFwiIHRoZW4gc2NhbGVUdXBsZVsxXSBlbHNlIHNjYWxlVHVwbGVbMF1cblxuXHRcdCMgcHJpbnQgaW5pdFNjYWxlVGl0bGUgKyBcIiBcIiArIGluaXRTdGF0ZVRpdGxlXG5cblx0XHRAY29uZmlnVmlldy5hZGRTZWN0aW9uKFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IGluaXRTY2FsZVRpdGxlLFxuXHRcdFx0XHRoYW5kbGVyOiB0b2dnbGVUaXBzXG5cdFx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBpbml0U3RhdGVUaXRsZSxcblx0XHRcdFx0aGFuZGxlcjogdG9nZ2xlU2NhbGVcblx0XHRcdH0sXG5cdFx0XSlcblx0XG5cdFxuXHRoaWRlSGludHNIYW5kbGVyOiAoKSA9PlxuXHRcdEZyYW1lci5FeHRyYXMuSGludHMuZGlzYWJsZSgpXG5cdFx0QHNob3dIaW50cyA9ICFAc2hvd0hpbnRzXG5cblx0c2hvd0hpbnRzSGFuZGxlcjogKCkgPT5cblx0XHRGcmFtZXIuRXh0cmFzLkhpbnRzLmVuYWJsZSgpXG5cdFx0RnJhbWVyLkV4dHJhcy5IaW50cy5zaG93SGludHMoKVxuXHRcdEBzaG93SGludHMgPSAhQHNob3dIaW50c1xuIiwiXG5leHBvcnRzLnZlcnRpY2FsID0gKGxheWVyQXJyYXksIHNwYWNpbmcgPSAxNiwgcGFkZGluZyA9IHsgeDogMCwgeTogMCB9KSAtPlxuXHR2aWV3ID0gbmV3IExheWVyXG5cdFx0d2lkdGg6IGxheWVyQXJyYXlbMF0ud2lkdGhcblx0XHR4OiBwYWRkaW5nLngsIHk6IHBhZGRpbmcueVxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cblx0Y3VycmVudFZhbHVlID0gMFxuXHRmb3IgaXRlbSBpbiBsYXllckFycmF5XG5cdFx0aXRlbS5wYXJlbnQgPSB2aWV3XG5cdFx0aXRlbS55ID0gY3VycmVudFZhbHVlXG5cdFx0Y3VycmVudFZhbHVlID0gY3VycmVudFZhbHVlICsgaXRlbS5oZWlnaHQgKyBzcGFjaW5nXG5cblx0dmlldy5oZWlnaHQgPSBjdXJyZW50VmFsdWVcblx0cmV0dXJuIHZpZXdcblxuXG5leHBvcnRzLmhvcml6b250YWwgPSAobGF5ZXJBcnJheSwgc3BhY2luZyA9IDE2LCBwYWRkaW5nID0geyB4OiAwLCB5OiAwIH0gKSAtPlxuXHR2aWV3ID0gbmV3IExheWVyXG5cdFx0aGVpZ2h0OiBsYXllckFycmF5WzBdLmhlaWdodFxuXHRcdHg6IHBhZGRpbmcueCwgeTogcGFkZGluZy55XG5cdFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblxuXHRjdXJyZW50VmFsdWUgPSAwXG5cdGZvciBpdGVtIGluIGxheWVyQXJyYXlcblx0XHRpdGVtLnBhcmVudCA9IHZpZXdcblx0XHRpdGVtLnggPSBjdXJyZW50VmFsdWVcblx0XHRjdXJyZW50VmFsdWUgPSBjdXJyZW50VmFsdWUgKyBpdGVtLndpZHRoICsgc3BhY2luZ1xuXG5cdHZpZXcud2lkdGggPSBjdXJyZW50VmFsdWVcblx0cmV0dXJuIHZpZXdcblxuIiwiXG5cbmNsYXNzIGV4cG9ydHMuU3RhdHVzQmFyX0NsYXNzIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IEB2aWV3XG5cdFx0XHR3aWR0aDogQHZpZXcud2lkdGhcblxuXHRcdFx0eTogQWxpZ24udG9wLCBuYW1lOiBcIi5zdGF0dXMgYmFyXCIsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0XHR0aGVtZTogQHZpZXcuc3RhdHVzQmFyX3RoZW1lXG5cdFx0XHRmb3JjZUFuZHJvaWQ6IEB2aWV3LmZvcmNlQW5kcm9pZEJhclxuXHRcdFx0cHJvdG90eXBlQ3JlYXRpb25ZZWFyOiBAdmlldy50aW1lVmFsdWVcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QGNyZWF0ZSgpXG5cblxuXG5cblxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudmlldyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICd0aGVtZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50aGVtZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50aGVtZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdmb3JjZUFuZHJvaWQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZm9yY2VBbmRyb2lkXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZCA9IHZhbHVlXG5cblx0QGRlZmluZSAncHJvdG90eXBlQ3JlYXRpb25ZZWFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5wcm90b3R5cGVDcmVhdGlvblllYXIgPSB2YWx1ZVxuXG5cblxuXG5cdHZpZXdTaXplOiAodywgaCkgPT4gcmV0dXJuIEB2aWV3LndpZHRoID09IHcgYW5kIEB2aWV3LmhlaWdodCA9PSBoXG5cblx0Y3JlYXRlOiAoKSA9PlxuXHRcdFxuXHRcdGlmIEBmb3JjZUFuZHJvaWQgdGhlbiBAY3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXIoKSBcblxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM3NSwgODEyKSBvciBAdmlld1NpemUoMzkwLCA4NDQpIG9yIEB2aWV3U2l6ZSg0MTQsIDg5Nikgb3IgQHZpZXdTaXplKDQyOCwgOTI2KSBvciBAdmlld1NpemUoMzYwLCA3ODIpXG5cdFx0XHRAY3JlYXRlTm90Y2hTdGF0dXNCYXIoKVxuXHRcdFxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM5MywgODUyKVxuXHRcdFx0QGNyZWF0ZU5vdGNoU3RhdHVzQmFyKClcblx0XHRcblx0XHRlbHNlIGlmIEB2aWV3U2l6ZSgzNzUsIDY2Nykgb3IgQHZpZXdTaXplKDQxNCwgNzM2KSBvciBAdmlld1NpemUoMzIwLCA1NjgpXG5cdFx0XHRAY3JlYXRlQ2xhc3NpY1N0YXR1c0JhcigpXG5cdFx0XG5cdFx0XG5cdFx0ZWxzZSBAY3JlYXRlQW5kcm9pZFN0YXR1c0JhcigpXG5cdFxuXHRcblx0XG5cdFxuXG5cblxuXHRjcmVhdGVBbmRyb2lkU3RhdHVzQmFyOiAoKSA9PlxuXHRcdEBoZWlnaHQgPSAzMlxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiA1MiwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ubGVmdCg0KSwgeTogQWxpZ24udG9wKDIgKyA1KVxuXHRcdFx0Y29sb3I6IGRldmljZV9hc3NldHMuY29sb3JbQHRoZW1lXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTQsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogMTAwLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5yaWdodCgtNCksIHk6IEFsaWduLnRvcCg1KVxuXHRcdFx0aW1hZ2U6IGRldmljZV9hc3NldHMuYW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHRoZW1lXVxuXHRcblx0XG5cdGNyZWF0ZUNsYXNzaWNBbmRyb2lkU3RhdHVzQmFyOiAoKSA9PlxuXHRcdEBoZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiA1MiwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ubGVmdCwgeTogQWxpZ24udG9wKDIpXG5cdFx0XHRjb2xvcjogZGV2aWNlX2Fzc2V0cy5jb2xvcltAdGhlbWVdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxNCwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiAxMDAsIGhlaWdodDogMjAsIHg6IEFsaWduLnJpZ2h0LCB5OiBBbGlnbi50b3AoKVxuXHRcdFx0aW1hZ2U6IGRldmljZV9hc3NldHMuYW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHRoZW1lXVxuXHRcblx0XG5cblxuXG5cdGNyZWF0ZUNsYXNzaWNTdGF0dXNCYXI6ICgpID0+XG5cdFx0QGhlaWdodCA9IDIwXG5cdFx0XG5cdFx0Y2xhc3NpY0xlZnRDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBAaGVpZ2h0LCB4OiBBbGlnbi5sZWZ0XG5cdFx0XHRpbWFnZTogZGV2aWNlX2Fzc2V0cy5vbGRTdGF0dXNCYXJMZWZ0SW1hZ2VbQHRoZW1lXVxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiA1NCwgaGVpZ2h0OiAxNiwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGNvbG9yOiBkZXZpY2VfYXNzZXRzLmNvbG9yW0B0aGVtZV0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBAaGVpZ2h0LCB4OiBBbGlnbi5yaWdodFxuXHRcdFx0aW1hZ2U6IGRldmljZV9hc3NldHMub2xkU3RhdHVzQmFyUmlnaHRJbWFnZVtAdGhlbWVdXG5cdFx0XG5cdFxuXHRjcmVhdGVOb3RjaFN0YXR1c0JhcjogKCkgPT5cblx0XHRAaGVpZ2h0ID0gNDRcblx0XHRcblx0XHRub3RjaExlZnRDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiA1NCwgaGVpZ2h0OiAyMSwgeDogQWxpZ24ubGVmdCgyMSksIHk6IEFsaWduLnRvcCgxMilcblx0XHRcdGNvbG9yOiBkZXZpY2VfYXNzZXRzLmNvbG9yW0B0aGVtZV0sIGJhY2tncm91bmRDb2xvcjogbnVsbCwgbGV0dGVyU3BhY2luZzogLTAuMTdcblx0XHRcdGZvbnRTaXplOiAxNSwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdG5vdGNoQ2VudGVyQ29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiAzNzUsIGhlaWdodDogQGhlaWdodCwgeDogQWxpZ24uY2VudGVyXG5cdFx0XHRpbWFnZTogZGV2aWNlX2Fzc2V0cy5ub3RjaFxuXHRcdFxuXHRcdG5vdGNoUmlnaHRDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBAaGVpZ2h0LCB4OiBBbGlnbi5yaWdodFxuXHRcdFx0aW1hZ2U6IGRldmljZV9hc3NldHMuc3RhdHVzQmFyUmlnaHRJbWFnZVtAdGhlbWVdXG5cblxuXG5cbmRldmljZV9hc3NldHMgPVxuXHRjb2xvcjpcblx0XHRkYXJrOiBcIiMwMDBcIlxuXHRcdGxpZ2h0OiBcIiNGRkZcIlxuXHRcblx0c3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyTGVmdEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0YW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvYW5kcm9pZFN0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0XG5cblxuXHRub3RjaDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX25vdGNoLnBuZ1wiXG5cdHRpcDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvdGlwLnBuZ1wiIiwiXG5jbGFzcyBUZXh0IGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdCMgZm9udEZhbWlseTogZm9udEF2ZXJpYVxuXHRcdFx0Zm9udFNpemU6IDE4XG5cdFx0XHR3ZWlnaHQ6IDcwMFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0aGVpZ2h0OiAyMFxuXHRcdFx0bGV0dGVyU3BhY2luZzogMC43XG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiAwLjRcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHN0eWxlID1cblx0XHRcdFwiZm9udC1mYW1pbHlcIjogXCInU0YgUHJvIFRleHQnLCAnUFQgU2FucycsICdIZWx2ZXRpY2EnLCAnVGFob21hJywgc2Fucy1zZXJpZjtcIlxuXHRcdFx0XCJmb250LXdlaWdodFwiOiA3MDBcblx0XHRcdFwiLXdlYmtpdC1mb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcdFwiLW1vei1mb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcdFwiLW1zLWZvbnQtZmVhdHVyZS1zZXR0aW5nc1wiOiBcIidzczAyJyBvbiwgJ3NzMDYnIG9uLCAnc3MwOScgb24sICdzczExJyBvbjtcIlxuXHRcdFx0XCJmb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcblxuXG5cbmNsYXNzIFRleHRCdXR0b24gZXh0ZW5kcyBUZXh0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHR1cGxlOiB7IG5vcm1hbDogMC41LCBob3ZlcjogMC44IH1cblx0XHRcdGhhbmRsZXI6IG51bGxcblxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QHN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdFxuXHRcdEAub25Nb3VzZU92ZXIgQEhvdmVyXG5cdFx0QC5vbk1vdXNlT3V0IEBIb3Zlck9mZlxuXG5cdFx0QHVwZGF0ZVR1cGxlKEB0dXBsZSlcblx0XG5cdFxuXHRcdFxuXHRIb3ZlcjogPT5cblx0XHRAb3BhY2l0eSA9IEB0dXBsZS5ob3ZlclxuXHRIb3Zlck9mZjogPT5cblx0XHRAb3BhY2l0eSA9IEB0dXBsZS5ub3JtYWxcblx0XG5cdHVwZGF0ZVR1cGxlOiAobmV3VHVwbGUpID0+XG5cdFx0QHR1cGxlID0gbmV3VHVwbGVcblx0XHRAZW1pdCBFdmVudHMuTW91c2VPdmVyXG5cdFx0QGVtaXQgRXZlbnRzLk1vdXNlT3V0XG5cdFxuXHRcblx0QGRlZmluZSAnaGFuZGxlcicsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvbihFdmVudHMuVGFwLCB2YWx1ZSlcblx0XG5cdEBkZWZpbmUgJ3R1cGxlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnR1cGxlXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy50dXBsZSA9IHZhbHVlXG5cblxuXG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBUZXh0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGhhbmRsZXI6IG51bGxcblx0XHRcdGhlaWdodDogMzIsIGJvcmRlclJhZGl1czogOFxuXHRcdFx0cGFkZGluZzogeyB0b3A6IDYsIGJvdHRvbTogNywgbGVmdDogOSwgcmlnaHQ6IDkgfVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMC43KVwiXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAc2hvd0hpbnQgPSAtPiA7XG5cdFx0QHN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdFxuXHRcdEAub25Nb3VzZU92ZXIgQEhvdmVyXG5cdFx0QC5vbk1vdXNlT3V0IEBIb3Zlck9mZlxuXHRcdFxuXHRIb3ZlcjogPT5cblx0XHRAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuNClcIlxuXHRIb3Zlck9mZjogPT5cblx0XHRAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuNylcIlxuXHRcblx0QGRlZmluZSAnaGFuZGxlcicsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvbihFdmVudHMuVGFwLCB2YWx1ZSlcblxuXG5jbGFzcyBCdXR0b25UYWIgZXh0ZW5kcyBCdXR0b25cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0c2VsZWN0ZWQ6IHRydWVcblx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRIb3ZlcjogPT5cblx0XHRAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuNClcIlxuXHRIb3Zlck9mZjogPT5cblx0XHRpZiBAc2VsZWN0ZWQgdGhlbiBAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuNylcIlxuXHRcdGVsc2UgQGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjIpXCJcblxuXHRAZGVmaW5lICdzZWxlY3RlZCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zZWxlY3RlZFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuc2VsZWN0ZWQgPSB2YWx1ZVxuXHRcdFx0aWYgdmFsdWUgdGhlbiBAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuNylcIlxuXHRcdFx0ZWxzZSBAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuMilcIlxuXG5cbiMgQnV0dG9uOiBTVkdcblxuIyBjbGFzcyBTVkdCdXR0b24gZXh0ZW5kcyBUZXh0QnV0dG9uXG4jIFx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcbiMgXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG4jIFx0XHRcdHRleHQ6IFwiXCJcbiMgXHRcdFx0YXNzZXQ6IG51bGxcbiMgXHRcdFx0Y2xpcDogZmFsc2VcbiMgXHRcdFx0YXV0b1NpemU6IGZhbHNlXG5cdFx0XG4jIFx0XHRAc3ZnU2hhcGUgPSBuZXcgU1ZHTGF5ZXJcbiMgXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIm51bGxcIiwgbmFtZTogXCJzdmdTaGFwZVwiXG5cdFx0XG4jIFx0XHRzdXBlciBAb3B0aW9uc1xuIyBcdFx0QHN2Z1NoYXBlLnBhcmVudCA9IEBcbiMgXHRcdEB1cGRhdGVTVkdTaXplKClcblx0XG5cdFxuIyBcdEBkZWZpbmUgJ2Fzc2V0JyxcbiMgXHRcdGdldDogLT4gQG9wdGlvbnMuYXNzZXRcbiMgXHRcdHNldDogKHZhbHVlKSAtPlxuIyBcdFx0XHRAb3B0aW9ucy5hc3NldCA9IHZhbHVlXG4jIFx0XHRcdEBzdmdTaGFwZS5zdGF0ZXMgPVxuIyBcdFx0XHRcdFwib25EYXJrXCI6IHsgc3ZnOiB2YWx1ZS5vbkRhcmsgfVxuIyBcdFx0XHRcdFwib25MaWdodFwiOiB7IHN2ZzogdmFsdWUub25MaWdodCB9XG4jIFx0XHRcdEBzdmdTaGFwZS5zdGF0ZVN3aXRjaChcIm9uRGFya1wiKVxuXHRcbiMgXHR1cGRhdGVTVkdTaXplOiAoKSA9PlxuIyBcdFx0QHN2Z1NoYXBlLndpZHRoID0gQHdpZHRoXG4jIFx0XHRAc3ZnU2hhcGUuaGVpZ2h0ID0gQGhlaWdodFxuXHRcblxuXG5cblxuIyBCdXR0b246IENvcHlcblxuIyBjbGFzcyBDb3B5QnV0dG9uIGV4dGVuZHMgVGV4dEJ1dHRvblxuIyBcdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG4jIFx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuIyBcdFx0XHRsaW5rOiBcImh0dHBzOi8vdGlsbGx1ci5jb21cIlxuIyBcdFx0XHRoYW5kbGVyOiBAY29weUhhbmRsZXJcblx0XHRcbiMgXHRcdEBhcmVhID0gbmV3IExheWVyXG4jIFx0XHRcdG9wYWNpdHk6IDAsIHg6IC0zMDAwLCBodG1sOiBudWxsXG5cdFx0XG4jIFx0XHRzdXBlciBAb3B0aW9uc1xuIyBcdFx0QGFyZWEucGFyZW50ID0gQFxuXHRcblx0XG4jIFx0QGRlZmluZSAnbGluaycsXG4jIFx0XHRnZXQ6IC0+IEBvcHRpb25zLmxpbmtcbiMgXHRcdHNldDogKHZhbHVlKSAtPlxuIyBcdFx0XHRAb3B0aW9ucy5saW5rID0gdmFsdWVcbiMgXHRcdFx0QHVwZGF0ZSh2YWx1ZSlcblx0XG5cdFxuIyBcdHVwZGF0ZTogKGxpbmspID0+XG4jIFx0XHRAYXJlYS5odG1sID0gXCI8dGV4dGFyZWEgY2xhc3M9J2pzLWNvcHl0ZXh0YXJlYS1jbGFzcycgc3R5bGU9J29wYWNpdHk6MDsnPiN7bGlua308L3RleHRhcmVhPlwiXG5cdFxuXHRcbiMgXHRjb3B5SGFuZGxlcjogPT5cbiMgXHRcdHRleHREaXYgPSBAYXJlYS5xdWVyeVNlbGVjdG9yKCcuanMtY29weXRleHRhcmVhLWNsYXNzJylcbiMgXHRcdHRleHREaXYuZm9jdXMoKVxuIyBcdFx0dGV4dERpdi5zZWxlY3QoKVxuIyBcdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQgJ2NvcHknXG5cdFx0XG4jIFx0XHRvcmlnaW5UaXRsZSA9IEB0ZXh0XG4jIFx0XHRAdGV4dCA9IFwiRG9uZSDwn5GMXCJcbiMgXHRcdFV0aWxzLmRlbGF5IDEsID0+IEB0ZXh0ID0gb3JpZ2luVGl0bGVcblxuXG5cblxuIyAjICMgQnV0dG9uOiBDb3B5XG5cbiMgIyBjbGFzcyBMaW5rQnV0dG9uIGV4dGVuZHMgU1ZHQnV0dG9uXG4jICMgXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuIyAjIFx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuIyAjIFx0XHRcdGxpbms6IFwiaHR0cHM6Ly90aWxsbHVyLmNvbVwiXG4jICMgXHRcdFx0Ym9yZGVyV2lkdGg6IDEgKiAyXG4jICMgXHRcdFx0Ym9yZGVyUmFkaXVzOiAyMCAqIDJcbiMgIyBcdFx0XHR0dXBsZTogeyBub3JtYWw6IDEuMCwgaG92ZXI6IDAuOCB9XG5cdFx0XHRcblx0XHRcbiMgIyBcdFx0QHRpbnRCdXR0b25GaXggPSBuZXcgTGF5ZXJcbiMgIyBcdFx0XHRoZWlnaHQ6IDEyMCAqIDJcbiMgIyBcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcbiMgIyBcdFx0QGJ1dHRvblRleHQgPSBuZXcgVGV4dFxuIyAjIFx0XHRcdGZvbnRTaXplOiAzMiAqIDJcbiMgIyBcdFx0XHR0ZXh0QWxpZ246IFwicmlnaHRcIlxuIyAjIFx0XHRcdGhlaWdodDogNjAgKiAyXG5cdFx0XG4jICMgXHRcdEBidXR0b25JY29uID0gbmV3IFNWR0xheWVyXG4jICMgXHRcdFx0d2lkdGg6IDI0ICogMiwgaGVpZ2h0OiAyNCAqIDJcbiMgIyBcdFx0XHRzdmc6IFNWRy5vcGVuSWNvbi5vbkxpZ2h0XG4jICMgXHRcdFx0b3BhY2l0eTogMC42XG5cdFx0XHRcblxuXHRcdFxuIyAjIFx0XHRzdXBlciBAb3B0aW9uc1xuXG4jICMgXHRcdEBidXR0b25UZXh0LnRleHQgPSBAdGV4dFxuIyAjIFx0XHRAdGV4dCA9IFwiXCJcblxuIyAjIFx0XHRAdGludEJ1dHRvbkZpeC5wYXJlbnQgPSBAcGFyZW50XG4jICMgXHRcdEB0aW50QnV0dG9uRml4LnggPSBBbGlnbi5yaWdodFxuIyAjIFx0XHRAdGludEJ1dHRvbkZpeC55ID0gQWxpZ24udG9wXG5cdFx0XG4jICMgXHRcdEBwYXJlbnQgPSBAdGludEJ1dHRvbkZpeFxuIyAjIFx0XHRAeSA9IEFsaWduLnRvcCgzMCAqIDIpXG4jICMgXHRcdEBoZWlnaHQgPSA2MCAqIDJcblxuIyAjIFx0XHRAYnV0dG9uVGV4dC5wYXJlbnQgPSBAXG4jICMgXHRcdEBidXR0b25UZXh0LnggPSAxNiAqIDJcbiMgIyBcdFx0QGJ1dHRvblRleHQueSA9IDkgKiAyXG5cbiMgIyBcdFx0QGJ1dHRvbkljb24ucGFyZW50ID0gQFxuIyAjIFx0XHRAYnV0dG9uSWNvbi54ID0gMTYgKiAyICsgQGJ1dHRvblRleHQud2lkdGggKyAxNiAqIDJcbiMgIyBcdFx0QGJ1dHRvbkljb24ueSA9IEFsaWduLmNlbnRlcigzICogMilcblxuIyAjIFx0XHRAd2lkdGggPSAxNiAqIDIgKyBAYnV0dG9uVGV4dC53aWR0aCArIEBidXR0b25JY29uLndpZHRoICsgMTYgKiAyICsgMTYgKiAyXG4jICMgXHRcdEB0aW50QnV0dG9uRml4LndpZHRoID0gQHdpZHRoICsgMzAgKiAyICsgMTYgKiAyXG5cbiMgIyBcdFx0QHRpbnRCdXR0b25GaXgueCA9IEFsaWduLnJpZ2h0XG4jICMgXHRcdEB4ID0gQWxpZ24ucmlnaHQoLTMwICogMilcblx0XHRcblx0XG5cbiMgIyBcdEBkZWZpbmUgJ2xpbmsnLFxuIyAjIFx0XHRnZXQ6IC0+IEBvcHRpb25zLmxpbmtcbiMgIyBcdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmxpbmsgPSB2YWx1ZVxuXHRcbiMgIyBcdHNldENvbG9yOiAoY29sb3IgPSBudWxsKSA9PlxuIyAjIFx0XHRpZiBjb2xvciA9PSBudWxsIHRoZW4gcmV0dXJuXG4jICMgXHRcdEB0aW50QnV0dG9uRml4LmJhY2tncm91bmRDb2xvciA9IGNvbG9yXG5cdFxuXG5cblxuXG5cblxuXG5cbiMgY2xhc3MgUHJldmlld0J1dHRvbiBleHRlbmRzIFRleHRcbiMgXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG4jIFx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuIyBcdFx0XHR0dXBsZTogeyBub3JtYWw6IDEuMCwgaG92ZXI6IDAuOCB9XG5cdFx0XG4jIFx0XHRzdXBlciBAb3B0aW9uc1xuXG4jIFx0XHRAcmVtb3ZlQWxsTGlzdGVuZXJzKClcblxuIyBcdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcbiMgXHRcdEAub25Nb3VzZU91dCBASG92ZXJPZmZcblxuIyBcdEhvdmVyOiA9PlxuIyBcdFx0IyBAc2NhbGUgPSAxLjA1XG4jIFx0XHRAb3BhY2l0eSA9IDEuMFxuXHRcbiMgXHRIb3Zlck9mZjogPT5cbiMgXHRcdCMgQHNjYWxlID0gMS4wXG4jIFx0XHRAb3BhY2l0eSA9IDAuOFxuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtUZXh0LCBUZXh0QnV0dG9uLCBCdXR0b24sIEJ1dHRvblRhYn1cblxuXG4iLCJcblxue1VJX1NlY3Rpb259ID0gcmVxdWlyZSBcIlVJX1NlY3Rpb25cIlxue1RleHQsIEJ1dHRvbn0gPSByZXF1aXJlIFwiVUlfQnV0dG9uc1wiXG5cbmNsYXNzIGV4cG9ydHMuVUlfQ29uZmlnIGV4dGVuZHMgVUlfU2VjdGlvblxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRoZWlnaHQ6IDEwMCwgeTogQWxpZ24uYm90dG9tKC04KVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRcdHZpZXc6IG51bGxcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QHVwZGF0ZUNvbmZpZ09uUmVzaXplKClcblxuXG5cdEBkZWZpbmUgJ3ZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy52aWV3ID0gdmFsdWVcblxuXG5cdHVwZGF0ZUNvbmZpZ09uUmVzaXplOiAoKSA9PlxuXHRcdGxvY2FsQ29uZmlnID0gQFxuXHRcdFxuXHRcdENhbnZhcy5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT4gbG9jYWxDb25maWcueSA9IEFsaWduLmJvdHRvbSgtOClcblxuXG5cblx0IyBPdmVycmlkZVxuXHRhZGRTZWN0aW9uOiAoYWN0aW9uQXJyYXkgPSBbXSkgPT5cblx0XHRzZWN0aW9uVmlldyA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR3aWR0aDogMzYwLCBoZWlnaHQ6IDEwMCwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR4OiAzMiwgeTogQWxpZ24uYm90dG9tKClcblxuXHRcdEBhZGRTZWN0aW9uVGl0bGUoc2VjdGlvblZpZXcsIFwiUHJldmlld1wiKVxuXHRcdHNlY3Rpb25WaWV3LnN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdHNlY3Rpb25WaWV3Lm9uVGFwIC0+IDtcblx0XHRzZWN0aW9uVmlldy5zaG93SGludCA9IC0+IDtcblxuXHRcdHN1bVggPSAwXG5cdFx0Zm9yIGFjdGlvbkl0ZW0sIGkgaW4gYWN0aW9uQXJyYXlcblx0XHRcdHNlY3Rpb25CdXR0b24gPSBAYWRkQWN0aW9uQnV0dG9uKGFjdGlvbkl0ZW0sIGkpXG5cdFx0XHRzZWN0aW9uQnV0dG9uLnBhcmVudCA9IHNlY3Rpb25WaWV3XG5cdFx0XHRzZWN0aW9uQnV0dG9uLnggPSBzdW1YXG5cdFx0XHRzdW1YICs9IHNlY3Rpb25CdXR0b24ud2lkdGggKyA4ICsgNFxuXHRcdFxuXHRcdEB3aWR0aCA9IE1hdGgubWF4KEB3aWR0aCwgc3VtWClcblx0XG5cblxuXHQjIE92ZXJyaWRlXG5cdGFkZEFjdGlvbkJ1dHRvbjogKGFjdGlvbkl0ZW0sIGluZGV4KSA9PlxuXHRcdGJ1dHRvbkxheWVyID0gbmV3IEJ1dHRvblxuXHRcdFx0dGV4dDogYWN0aW9uSXRlbS50aXRsZVxuXHRcdFx0eTogNDJcblx0XHRcdHNlbGVjdGVkOiBpZiBpbmRleCBpcyAwIHRoZW4gdHJ1ZSBlbHNlIGZhbHNlXG5cdFx0XHRjdXN0b206XG5cdFx0XHRcdGFjdGlvbkl0ZW06IGFjdGlvbkl0ZW1cblx0XHRcblx0XHRjb21wbGV4SGFuZGxlciA9ICgpIC0+XG5cdFx0XHRAY3VzdG9tLmFjdGlvbkl0ZW0uaGFuZGxlcihAY3VzdG9tLmFjdGlvbkl0ZW0uZGF0YSwgQClcblxuXHRcdGJ1dHRvbkxheWVyLm9uKEV2ZW50cy5UYXAsIGNvbXBsZXhIYW5kbGVyKVxuXHRcdHJldHVybiBidXR0b25MYXllciIsIlxuXG5cbntUZXh0LCBCdXR0b25UYWJ9ID0gcmVxdWlyZSBcIlVJX0J1dHRvbnNcIlxuXG5jbGFzcyBleHBvcnRzLlVJX1NlY3Rpb24gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR3aWR0aDogMjAwLCBoZWlnaHQ6IFNjcmVlbi5oZWlnaHQsIHk6IDEwMFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcblxuXHRhZGRTZWN0aW9uOiAodGl0bGUsIGFjdGlvbkFycmF5ID0gW10pID0+XG5cblx0XHRzZWN0aW9uVmlldyA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR3aWR0aDogMzYwLCBoZWlnaHQ6IDEwMCwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR4OiAzMiwgeTogQGNoaWxkcmVuLmxlbmd0aCAqIDEwMFxuXG5cdFx0QGFkZFNlY3Rpb25UaXRsZShzZWN0aW9uVmlldywgdGl0bGUpXG5cblx0XHRzZWN0aW9uVmlldy5zdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRzZWN0aW9uVmlldy5vblRhcCAtPiA7XG5cdFx0c2VjdGlvblZpZXcuc2hvd0hpbnQgPSAtPiA7XG5cblx0XHRzdW1YID0gMFxuXHRcdGZvciBhY3Rpb25JdGVtLCBpIGluIGFjdGlvbkFycmF5XG5cdFx0XHRzZWN0aW9uQnV0dG9uID0gQGFkZEFjdGlvbkJ1dHRvbihhY3Rpb25JdGVtLCBpKVxuXHRcdFx0c2VjdGlvbkJ1dHRvbi5wYXJlbnQgPSBzZWN0aW9uVmlld1xuXHRcdFx0c2VjdGlvbkJ1dHRvbi54ID0gc3VtWFxuXHRcdFx0c3VtWCArPSBzZWN0aW9uQnV0dG9uLndpZHRoICsgOFxuXHRcdFxuXHRcdEB3aWR0aCA9IE1hdGgubWF4KEB3aWR0aCwgc3VtWClcblxuXG5cblx0YWRkQWN0aW9uQnV0dG9uOiAoYWN0aW9uSXRlbSwgaW5kZXgpID0+XG5cdFx0YnV0dG9uTGF5ZXIgPSBuZXcgQnV0dG9uVGFiXG5cdFx0XHR0ZXh0OiBhY3Rpb25JdGVtLnRpdGxlXG5cdFx0XHR5OiA0MlxuXHRcdFx0c2VsZWN0ZWQ6IGlmIGluZGV4IGlzIDAgdGhlbiB0cnVlIGVsc2UgZmFsc2Vcblx0XHRcdGN1c3RvbTpcblx0XHRcdFx0YWN0aW9uSXRlbTogYWN0aW9uSXRlbVxuXHRcdFxuXHRcdGNvbXBsZXhIYW5kbGVyID0gKCkgLT5cblx0XHRcdEBjdXN0b20uYWN0aW9uSXRlbS5oYW5kbGVyKEBjdXN0b20uYWN0aW9uSXRlbS5kYXRhLCBAKVxuXHRcdFx0Zm9yIGJ1dHRvbiBpbiBAcGFyZW50LmNoaWxkcmVuXG5cdFx0XHRcdGlmIGJ1dHRvbi5uYW1lIGlzbnQgXCIuc2VjdGlvblRpdGxlXCJcblx0XHRcdFx0XHRidXR0b24uc2VsZWN0ZWQgPSB0cnVlIGlmIGJ1dHRvbiBpcyBAXG5cdFx0XHRcdFx0YnV0dG9uLnNlbGVjdGVkID0gZmFsc2UgaWYgYnV0dG9uIGlzbnQgQFxuXG5cdFx0YnV0dG9uTGF5ZXIub24oRXZlbnRzLlRhcCwgY29tcGxleEhhbmRsZXIpXG5cdFx0cmV0dXJuIGJ1dHRvbkxheWVyXG5cblxuXHRhZGRTZWN0aW9uVGl0bGU6IChsb2NhbFBhcmVudCwgdGl0bGUgPSBcIkhlYWRlciBUaXRsZVwiKSA9PlxuXHRcdG5ldyBUZXh0XG5cdFx0XHRwYXJlbnQ6IGxvY2FsUGFyZW50XG5cdFx0XHR0ZXh0OiB0aXRsZSwgbmFtZTogXCIuc2VjdGlvblRpdGxlXCJcblx0XHRcdGZvbnRTaXplOiAxNiwgb3BhY2l0eTogMC41LCBwYWRkaW5nOiB7IHRvcDogMTIgfVxuXG4iLCJcblxuIyB7U2VjdGlvblZpZXd9ID0gcmVxdWlyZSBcIlNlY3Rpb25WaWV3XCJcblxuXG5jbGFzcyBleHBvcnRzLlRyZWVMYXllclZpZXcgZXh0ZW5kcyBTZWN0aW9uVmlld1xuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0dHJlZVZpZXdMYXllciA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0XHRcdHdpZHRoOiAzMjBcblx0XHRcdGhlaWdodDogMFxuXHRcdFx0c2Nyb2xsVmVydGljYWw6IHRydWVcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRtb3VzZVdoZWVsRW5hYmxlZDogdHJ1ZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiMyMjJcIlxuXHRcdFxuXHRcdHRyZWVWaWV3TGF5ZXIuY29udGVudC5oZWlnaHQgPSAwXG5cdFx0dHJlZVZpZXdMYXllci5tb3VzZVdoZWVsRW5hYmxlZCA9IHRydWVcblx0XHRcdFxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHRyZWVWaWV3OiB0cmVlVmlld0xheWVyXG5cdFx0XHRpbmRlbnQ6IDFcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0dHJlZVZpZXdMYXllci5wYXJlbnQgPSBAcGFyZW50XG5cblx0XG5cdEBkZWZpbmUgJ3RyZWVWaWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRyZWVWaWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnRyZWVWaWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2luZGVudCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5pbmRlbnRcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuaW5kZW50ID0gdmFsdWVcblx0XG5cblxuXHRwcmludFRyZWU6ICgpID0+XG5cdFx0cHJpbnQgQHZpZXcuY2hpbGRyZW5cblx0XHRAcHJpbnROb2RlKEB2aWV3KVxuXHRcdEB0cmVlVmlldy5oZWlnaHQgPSBTY3JlZW4uaGVpZ2h0XG5cdFx0QHRyZWVWaWV3LnVwZGF0ZUNvbnRlbnQoKVxuXHRcblxuXHRwcmludE5vZGU6IChub2RlLCBsZXZlbCA9IDApID0+XG5cdFx0aWYgbm9kZS5uYW1lID09IFwiXCIgdGhlbiBsYXllck5hbWUgPSBcIlVudGl0bGVkXCIgZWxzZSBsYXllck5hbWUgPSBub2RlLm5hbWVcblx0XHQjIHByaW50IEFycmF5KGxldmVsICsgMSkuam9pbihcIiDjg7sgXCIpICsgXCIgI3tsYXllck5hbWV9XCJcblxuXHRcdHRyZWVOb2RlTGF5ZXIgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEB0cmVlVmlldy5jb250ZW50XG5cdFx0XHR0ZXh0OiBBcnJheShsZXZlbCArIDEpLmpvaW4oXCIg44O7IFwiKSArIFwiICN7bGF5ZXJOYW1lfVwiXG5cdFx0XHRcblx0XHRcdGZvbnRTaXplOiAxNVxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cblx0XHRcdG9wYWNpdHk6IGlmIGxheWVyTmFtZSA9PSBcIlVudGl0bGVkXCIgdGhlbiAwLjUgZWxzZSAxXG5cdFx0XHRoZWlnaHQ6IDI4XG5cdFx0XHR5OiBAdHJlZVZpZXcuaGVpZ2h0XG5cdFx0XHQjIGJhY2tncm91bmRDb2xvcjogVXRpbHMucmFuZG9tQ29sb3IoKVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRjdXN0b206XG5cdFx0XHRcdGxheWVyOiBub2RlXG5cdFx0XG5cdFx0dHJlZU5vZGVMYXllci5vblRhcCAtPlxuXHRcdFx0cHJpbnQgXCIje0BjdXN0b20ubGF5ZXIubmFtZX0geDogI3tAY3VzdG9tLmxheWVyLnh9IHk6ICN7QGN1c3RvbS5sYXllci55fSBzaXplOiAje0BjdXN0b20ubGF5ZXIud2lkdGh9eCN7QGN1c3RvbS5sYXllci5oZWlnaHR9XCJcblxuXHRcdFxuXHRcdEB0cmVlVmlldy5oZWlnaHQgKz0gMjhcblxuXG5cdFx0aWYgbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwXG5cdFx0XHRuZXh0TGV2ZWwgPSBsZXZlbCArIDFcblx0XHRcdGZvciBjaGlsZE5vZGUgaW4gbm9kZS5jaGlsZHJlblxuXHRcdFx0XHRAcHJpbnROb2RlKGNoaWxkTm9kZSwgbmV4dExldmVsKVxuXHRcdFxuIl19
