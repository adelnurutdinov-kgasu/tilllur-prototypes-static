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
var Button, FlowView, ModalView, NavigationView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Button = require("Buttons").Button;

FlowView = (function(superClass) {
  extend(FlowView, superClass);

  function FlowView(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, FlowView.__super__.constructor.call(this, this.options));
    if (this.parent) {
      this.width = this.parent.width;
      this.height = this.parent.height;
    }
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
      backgroundColor: null
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
  }

  ModalView.define('flow', {
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
        backButton_name: "Back_Button"
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


},{"Buttons":"Buttons"}],"PreviewComponent":[function(require,module,exports){
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


},{"Logo":"Logo","Preview_Init":"Preview_Init","UI_Config":"UI_Config","UI_Section":"UI_Section"}],"StatusBar_Class":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi90ZW1wbGF0ZS9UZW1wbGF0ZS5mcmFtZXIvbW9kdWxlcy9CdXR0b25zLmNvZmZlZSIsIi4uL3RlbXBsYXRlL1RlbXBsYXRlLmZyYW1lci9tb2R1bGVzL0RldmljZV9DbGFzcy5jb2ZmZWUiLCIuLi90ZW1wbGF0ZS9UZW1wbGF0ZS5mcmFtZXIvbW9kdWxlcy9Ib21lQmFyX0NsYXNzLmNvZmZlZSIsIi4uL3RlbXBsYXRlL1RlbXBsYXRlLmZyYW1lci9tb2R1bGVzL0xvZ28uY29mZmVlIiwiLi4vdGVtcGxhdGUvVGVtcGxhdGUuZnJhbWVyL21vZHVsZXMvTmF2aWdhdGlvbkNvbXBvbmVudC5jb2ZmZWUiLCIuLi90ZW1wbGF0ZS9UZW1wbGF0ZS5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50LmNvZmZlZSIsIi4uL3RlbXBsYXRlL1RlbXBsYXRlLmZyYW1lci9tb2R1bGVzL1ByZXZpZXdfQ2xhc3MuY29mZmVlIiwiLi4vdGVtcGxhdGUvVGVtcGxhdGUuZnJhbWVyL21vZHVsZXMvUHJldmlld19Jbml0LmNvZmZlZSIsIi4uL3RlbXBsYXRlL1RlbXBsYXRlLmZyYW1lci9tb2R1bGVzL1ByZXZpZXdfVUkuY29mZmVlIiwiLi4vdGVtcGxhdGUvVGVtcGxhdGUuZnJhbWVyL21vZHVsZXMvU3RhdHVzQmFyX0NsYXNzLmNvZmZlZSIsIi4uL3RlbXBsYXRlL1RlbXBsYXRlLmZyYW1lci9tb2R1bGVzL1VJX0J1dHRvbnMuY29mZmVlIiwiLi4vdGVtcGxhdGUvVGVtcGxhdGUuZnJhbWVyL21vZHVsZXMvVUlfQ29uZmlnLmNvZmZlZSIsIi4uL3RlbXBsYXRlL1RlbXBsYXRlLmZyYW1lci9tb2R1bGVzL1VJX1NlY3Rpb24uY29mZmVlIiwiLi4vdGVtcGxhdGUvVGVtcGxhdGUuZnJhbWVyL21vZHVsZXMvVUlfVHJlZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNFQSxJ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Q0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLFVBQVQsR0FBc0I7SUFBakMsQ0FETDtHQUREOztFQU1BLGFBQUMsQ0FBQSxNQUFELENBQVEsUUFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtHQUREOztFQUdBLGFBQUMsQ0FBQSxNQUFELENBQVEsV0FBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtHQUREOztFQUdBLGFBQUMsQ0FBQSxNQUFELENBQVEsU0FBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtHQUREOztFQUtBLGFBQUMsQ0FBQSxNQUFELENBQVEsWUFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLFVBQVQsR0FBc0I7SUFBakMsQ0FETDtHQUREOztFQUlBLGFBQUMsQ0FBQSxNQUFELENBQVEsZUFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLGFBQVQsR0FBeUI7SUFBcEMsQ0FETDtHQUREOztFQUlBLGFBQUMsQ0FBQSxNQUFELENBQVEsYUFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLFdBQVQsR0FBdUI7SUFBbEMsQ0FETDtHQUREOztFQU1BLGFBQUMsQ0FBQSxNQUFELENBQVEs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R0FBWSxLQUFBLEdBQVE7QUFDcEI7QUFBQTtXQUFBLHFDQUFBOztxQkFDQyxJQUFDLENBQUEsU0FBRCxDQUFXLFNBQVgsRUFBc0IsU0FBdEI7QUFERDtxQkFGRDs7RUEzQlU7Ozs7R0F6Q3dCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXG5cbmNsYXNzIGV4cG9ydHMuQnV0dG9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdGd1YXJkID0gbmV3IExheWVyIHsgc2l6ZTogMTAsIGJhY2tncm91bmRDb2xvcjogXCJudWxsXCIgfVxuXHRcdFxuXHRcdGd1YXJkLnN0YXRlcyA9XG5cdFx0XHRcInByZXNzZWRcIjogeyBvcGFjaXR5OiAwIH1cblx0XHRcdFwibm9ybWFsXCI6IHsgb3BhY2l0eTogMCB9XG5cdFx0XG5cdFx0Z3VhcmQub24gRXZlbnRzLlN0YXRlU3dpdGNoRW5kLCAoZnJvbSwgdG8pIC0+XG5cdFx0XHRpZiBmcm9tICE9IHRvIHRoZW4gQHBhcmVudC5hbmltYXRlKHRvKVxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGhhbmRsZXI6IG51bGxcblx0XHRcdGd1YXJkOiBudWxsXG5cdFx0XHRzY2FsZVRvOiAwLjlcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAc3RhdGVzID1cblx0XHRcdFwicHJlc3NlZFwiOiB7IHNjYWxlOiBAc2NhbGVUbyB9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IHNjYWxlOiAxLjAgfVxuXHRcdFxuXHRcdGd1YXJkLnBhcmVudCA9IEBcblx0XHRAZ3VhcmQgPSBndWFyZFxuXHRcdFxuXHRcdEAub25Ub3VjaFN0YXJ0IEBIb3ZlclxuXHRcdEAub25Ub3VjaEVuZCBASG92ZXJPZmZcblx0XHRALm9uU3dpcGVTdGFydCBASG92ZXJPZmZcblx0XHRALm9uRHJhZ1N0YXJ0IEBIb3Zlck9mZlxuXHRcblx0SG92ZXI6ID0+IEBndWFyZC5zdGF0ZVN3aXRjaChcInByZXNzZWRcIilcblx0SG92ZXJPZmY6ID0+IEBndWFyZC5zdGF0ZVN3aXRjaChcIm5vcm1hbFwiKVxuXG5cblxuXHRAZGVmaW5lICdndWFyZCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ndWFyZFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ndWFyZCA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdzY2FsZVRvJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNjYWxlVG9cblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2NhbGVUbyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdoYW5kbGVyJyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9uKEV2ZW50cy5UYXAsIHZhbHVlKVxuXG4iLCJcbmNsYXNzIGV4cG9ydHMuRGV2aWNlX0NsYXNzIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiMDAwXCJcblx0XHRcdHZpZXc6IG51bGxcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHQjIHVwZGF0ZSBmcm9tIHBhcmVudFxuXHRcdEBzdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBzY2FsZTogMSB9XG5cdFx0XHRcImZpbGxcIjogeyBzY2FsZTogMSB9XG5cblx0XHRAaW5pdEJvcmRlclZpZXdDc3MoKVxuXHRcdEBzZW5kVG9CYWNrKClcblx0XG5cblxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnZpZXcgPSB2YWx1ZVxuXHRcdFx0QG9wdGlvbnMud2lkdGggPSB2YWx1ZS53aWR0aCArIDE2ICogMlxuXHRcdFx0QG9wdGlvbnMuaGVpZ2h0ID0gdmFsdWUuaGVpZ2h0ICsgMTYgKiAyXG5cdFx0XHRAYm9yZGVyUmFkaXVzID0gdmFsdWUuYm9yZGVyUmFkaXVzICsgMTZcblxuXHRzdGF0ZVN3aXRjaFRvTm9ybWFsOiAoKSA9PlxuXHRcdEBhbmltYXRlKHNjYWxlOiBAc3RhdGVzW1wibm9ybWFsXCJdLnNjYWxlLCBvcHRpb25zOiB7IGN1cnZlOiBCZXppZXIubGluZWFyLCB0aW1lOiAwIH0pXG5cdFxuXHRzdGF0ZVN3aXRjaFRvRmlsbDogKCkgPT5cblx0XHRAYW5pbWF0ZShzY2FsZTogQHN0YXRlc1tcImZpbGxcIl0uc2NhbGUsIG9wdGlvbnM6IHsgY3VydmU6IEJlemllci5saW5lYXIsIHRpbWU6IDAgfSlcblxuXHRhbmltYXRlU3RhdGVUb05vcm1hbDogKCkgPT5cblx0XHRAYW5pbWF0ZShzY2FsZTogQHN0YXRlc1tcIm5vcm1hbFwiXS5zY2FsZSwgb3B0aW9uczogeyBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUgfSlcblx0XG5cdGFuaW1hdGVTdGF0ZVRvRmlsbDogKCkgPT5cblx0XHRAYW5pbWF0ZShzY2FsZTogQHN0YXRlc1tcImZpbGxcIl0uc2NhbGUsIG9wdGlvbnM6IHsgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41IH0pXG5cblxuXG5cdGluaXRCb3JkZXJWaWV3Q3NzOiAoKSA9PlxuXHRcdEBjbGFzc0xpc3QuYWRkKFwiaXBob25lLXRpbGxsdXItdlwiKVxuIFxuXHRcdGNzcyA9IFwiXCJcIlxuXHRcdC5pcGhvbmUtdGlsbGx1ci12IHtcblx0XHRcdGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcblx0XHRcdDE2MC43NGRlZyxcblx0XHRcdHJnYmEoMzYsIDM2LCAzNiwgMC4zKSAyNC4zOSUsXG5cdFx0XHRyZ2JhKDI4LCAyOCwgMjgsIDAuMykgMjkuNDclLFxuXHRcdFx0cmdiYSgxMCwgMTAsIDEwLCAwLjMpIDk5Ljg1JVxuXHRcdFx0KSxcblx0XHRcdGxpbmVhci1ncmFkaWVudChcblx0XHRcdDE4MGRlZyxcblx0XHRcdHJnYmEoMiwgMiwgMiwgMC42KSAtMC4yMSUsXG5cdFx0XHRyZ2JhKDIxLCAyMSwgMjEsIDAuNikgNi41MiUsXG5cdFx0XHRyZ2JhKDYsIDYsIDYsIDAuNikgOTkuNzklXG5cdFx0XHQpLFxuXHRcdFx0IzVhNWE1YTtcblx0XHRib3gtc2hhZG93OiA4cHggMTRweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4yNSksXG5cdFx0XHRpbnNldCAwcHggLTRweCAxNnB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSxcblx0XHRcdGluc2V0IDRweCAwcHggNHB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSxcblx0XHRcdGluc2V0IC00cHggMHB4IDRweCByZ2JhKDAsIDAsIDAsIDAuNyk7XG5cblx0XHR9XG5cdFx0XCJcIlwiXG5cdFx0XG5cdFx0VXRpbHMuaW5zZXJ0Q1NTKGNzcykiLCJcbmNsYXNzIGV4cG9ydHMuSG9tZUJhcl9DbGFzcyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0cGFyZW50OiBAdmlld1xuXHRcdFx0d2lkdGg6IEB2aWV3LndpZHRoXG5cdFx0XHRcblx0XHRcdHRoZW1lOiBAdmlldy5ob21lQmFyX3RoZW1lXG5cdFx0XHRcblx0XHRcdGhlaWdodDogMzQsIHk6IEFsaWduLmJvdHRvbSwgbmFtZTogXCIuaG9tZSBiYXJcIiwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBjcmVhdGUoKVxuXG5cblxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudmlldyA9IHZhbHVlXG5cblx0QGRlZmluZSAndGhlbWUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudGhlbWVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudGhlbWUgPSB2YWx1ZVxuXG5cblxuXHR2aWV3U2l6ZTogKHcsIGgpID0+IHJldHVybiBAdmlldy53aWR0aCA9PSB3IGFuZCBAdmlldy5oZWlnaHQgPT0gaFxuXG5cdGNyZWF0ZTogKCkgPT5cblx0XHRpZiBAdmlld1NpemUoMzc1LCA4MTIpIG9yIEB2aWV3U2l6ZSgzOTAsIDg0NCkgb3IgQHZpZXdTaXplKDQxNCwgODk2KSBvciBAdmlld1NpemUoNDI4LCA5MjYpIG9yIEB2aWV3U2l6ZSgzNjAsIDc4Mikgb3IgQHZpZXdTaXplKDM5MywgODUyKVxuXHRcdFx0QGNyZWF0ZUhvbWVJbmRpY2F0b3IoKVxuXHRcblx0XG5cdGNyZWF0ZUhvbWVJbmRpY2F0b3I6ICgpID0+XG5cdFx0bmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi5ob21lVmlld1wiXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiAxMzUsIGhlaWdodDogNSwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5ib3R0b20oLTgpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGRldmljZV9hc3NldHMuY29sb3JbQHRoZW1lXSwgYm9yZGVyUmFkaXVzOiAyMFxuXG5cblxuZGV2aWNlX2Fzc2V0cyA9XG5cdGNvbG9yOlxuXHRcdGRhcms6IFwiIzAwMFwiXG5cdFx0bGlnaHQ6IFwiI0ZGRlwiIiwiIyBMb2dvXG5cbmNsYXNzIGV4cG9ydHMuTG9nb0xheWVyIGV4dGVuZHMgU1ZHTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0b3BhY2l0eTogMC41XG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cdFx0XHRzdmc6IGdldExvZ28oXCJGRkZcIilcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEBzdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRAc2hvd0hpbnQgPSAtPiA7XG5cdFx0XG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cdFxuXHRAZGVmaW5lICdoYW5kbGVyJyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9uKEV2ZW50cy5UYXAsIHZhbHVlKVxuXHRcblx0SG92ZXI6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjhcblx0SG92ZXJPZmY6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjVcblxuXG5cbmdldExvZ28gPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gXCIjRkZGRkZGXCJcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCI3NlwiIGhlaWdodD1cIjMyXCIgdmlld0JveD1cIjAgMCA3NiAzMlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk0yLjc5MTk5IDIxLjZDMi43OTE5OSAyMS4xNjggMi45MDM5OSAyMC40MDggMy4xMjc5OSAxOS4zMkw0LjM5OTk5IDEyLjg0SDIuOTgzOTlMMy4wNzk5OSAxMi4xMkM0Ljk5OTk5IDExLjU0NCA2Ljg4Nzk5IDEwLjU1MiA4Ljc0Mzk5IDkuMTQzOThIOS44OTU5OUw5LjMxOTk5IDExLjc2SDExLjE5MkwxMC45NzYgMTIuODRIOS4xMjc5OUw3LjkwMzk5IDE5LjMyQzcuNjk1OTkgMjAuMzEyIDcuNTkxOTkgMjAuOTc2IDcuNTkxOTkgMjEuMzEyQzcuNTkxOTkgMjIuMDggNy45Mjc5OSAyMi41NDQgOC41OTk5OSAyMi43MDRDOC40Mzk5OSAyMy4yNDggOC4wNzE5OSAyMy42OCA3LjQ5NTk5IDI0QzYuOTE5OTkgMjQuMzIgNi4yMjM5OSAyNC40OCA1LjQwNzk5IDI0LjQ4QzQuNTkxOTkgMjQuNDggMy45NTE5OSAyNC4yMjQgMy40ODc5OSAyMy43MTJDMy4wMjM5OSAyMy4yIDIuNzkxOTkgMjIuNDk2IDIuNzkxOTkgMjEuNlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMTcuNTU5OSAyMi42OEMxNy4wNjM5IDIzLjg4IDE2LjAyMzkgMjQuNDggMTQuNDM5OSAyNC40OEMxMy42MjM5IDI0LjQ4IDEyLjk1OTkgMjQuMiAxMi40NDc5IDIzLjY0QzEyLjAxNTkgMjMuMTQ0IDExLjc5OTkgMjIuNjQ4IDExLjc5OTkgMjIuMTUyQzExLjc5OTkgMjAuODU2IDEyLjA5NTkgMTguOTQ0IDEyLjY4NzkgMTYuNDE2TDEzLjU3NTkgMTEuNzZMMTguNDQ3OSAxMS4yOEwxNi45ODM5IDE4Ljg2NEMxNi43MTE5IDIwLjA0OCAxNi41NzU5IDIwLjg0OCAxNi41NzU5IDIxLjI2NEMxNi41NzU5IDIyLjE3NiAxNi45MDM5IDIyLjY0OCAxNy41NTk5IDIyLjY4Wk0xNC4wMDc5IDguNDIzOThDMTQuMDA3OSA3Ljc5OTk4IDE0LjI2MzkgNy4zMTk5OCAxNC43NzU5IDYuOTgzOThDMTUuMzAzOSA2LjY0Nzk4IDE1Ljk0MzkgNi40Nzk5OCAxNi42OTU5IDYuNDc5OThDMTcuNDQ3OSA2LjQ3OTk4IDE4LjA0NzkgNi42NDc5OCAxOC40OTU5IDYuOTgzOThDMTguOTU5OSA3LjMxOTk4IDE5LjE5MTkgNy43OTk5OCAxOS4xOTE5IDguNDIzOThDMTkuMTkxOSA5LjA0Nzk4IDE4LjkzNTkgOS41MTk5OCAxOC40MjM5IDkuODM5OThDMTcuOTI3OSAxMC4xNiAxNy4zMDM5IDEwLjMyIDE2LjU1MTkgMTAuMzJDMTUuNzk5OSAxMC4zMiAxNS4xODM5IDEwLjE2IDE0LjcwMzkgOS44Mzk5OEMxNC4yMzk5IDkuNTE5OTggMTQuMDA3OSA5LjA0Nzk4IDE0LjAwNzkgOC40MjM5OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMjYuMDYwNiAyMi42OEMyNS41NjQ2IDIzLjg4IDI0LjUyNDYgMjQuNDggMjIuOTQwNiAyNC40OEMyMi4xNDA2IDI0LjQ4IDIxLjQ4NDYgMjQuMiAyMC45NzI2IDIzLjY0QzIwLjU1NjYgMjMuMTc2IDIwLjM0ODYgMjIuNjggMjAuMzQ4NiAyMi4xNTJDMjAuMzQ4NiAyMC45NTIgMjAuNjI4NiAxOS4wNCAyMS4xODg2IDE2LjQxNkwyMi45NDA2IDcuMTk5OThMMjcuODEyNiA2LjcxOTk4TDI1LjQ4NDYgMTguODY0QzI1LjIxMjYgMjAuMDQ4IDI1LjA3NjYgMjAuODQ4IDI1LjA3NjYgMjEuMjY0QzI1LjA3NjYgMjIuMTc2IDI1LjQwNDYgMjIuNjQ4IDI2LjA2MDYgMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTM0LjU2MTggMjIuNjhDMzQuMDY1OCAyMy44OCAzMy4wMjU4IDI0LjQ4IDMxLjQ0MTggMjQuNDhDMzAuNjQxOCAyNC40OCAyOS45ODU4IDI0LjIgMjkuNDczOCAyMy42NEMyOS4wNTc4IDIzLjE3NiAyOC44NDk4IDIyLjY4IDI4Ljg0OTggMjIuMTUyQzI4Ljg0OTggMjAuOTUyIDI5LjEyOTggMTkuMDQgMjkuNjg5OCAxNi40MTZMMzEuNDQxOCA3LjE5OTk4TDM2LjMxMzggNi43MTk5OEwzMy45ODU4IDE4Ljg2NEMzMy43MTM4IDIwLjA0OCAzMy41Nzc4IDIwLjg0OCAzMy41Nzc4IDIxLjI2NEMzMy41Nzc4IDIyLjE3NiAzMy45MDU4IDIyLjY0OCAzNC41NjE4IDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk00My4wNjMxIDIyLjY4QzQyLjU2NzEgMjMuODggNDEuNTI3MSAyNC40OCAzOS45NDMxIDI0LjQ4QzM5LjE0MzEgMjQuNDggMzguNDg3MSAyNC4yIDM3Ljk3NTEgMjMuNjRDMzcuNTU5MSAyMy4xNzYgMzcuMzUxMSAyMi42OCAzNy4zNTExIDIyLjE1MkMzNy4zNTExIDIwLjk1MiAzNy42MzExIDE5LjA0IDM4LjE5MTEgMTYuNDE2TDM5Ljk0MzEgNy4xOTk5OEw0NC44MTUxIDYuNzE5OThMNDIuNDg3MSAxOC44NjRDNDIuMjE1MSAyMC4wNDggNDIuMDc5MSAyMC44NDggNDIuMDc5MSAyMS4yNjRDNDIuMDc5MSAyMi4xNzYgNDIuNDA3MSAyMi42NDggNDMuMDYzMSAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNTMuNTMyMyAyMi45OTJDNTIuNzY0MyAyMy45ODQgNTEuNDI4MyAyNC40OCA0OS41MjQzIDI0LjQ4QzQ4LjUzMjMgMjQuNDggNDcuNjc2MyAyNC4xODQgNDYuOTU2MyAyMy41OTJDNDYuMjM2MyAyMi45ODQgNDUuODc2MyAyMi4yNDggNDUuODc2MyAyMS4zODRDNDUuODc2MyAyMC45MDQgNDUuOTAwMyAyMC41NDQgNDUuOTQ4MyAyMC4zMDRMNDcuNTU2MyAxMS43Nkw1Mi40MjgzIDExLjI4TDUwLjY3NjMgMjAuNTQ0QzUwLjYxMjMgMjAuODk2IDUwLjU4MDMgMjEuMTc2IDUwLjU4MDMgMjEuMzg0QzUwLjU4MDMgMjIuMzEyIDUwLjg2MDMgMjIuNzc2IDUxLjQyMDMgMjIuNzc2QzUyLjA0NDMgMjIuNzc2IDUyLjU4MDMgMjIuMzUyIDUzLjAyODMgMjEuNTA0QzUzLjE3MjMgMjEuMjMyIDUzLjI3NjMgMjAuOTIgNTMuMzQwMyAyMC41NjhMNTUuMDQ0MyAxMS43Nkw1OS43NzIzIDExLjI4TDU3Ljk5NjMgMjAuNjRDNTcuOTQ4MyAyMC44OCA1Ny45MjQzIDIxLjEyOCA1Ny45MjQzIDIxLjM4NEM1Ny45MjQzIDIxLjY0IDU3Ljk5NjMgMjEuOTEyIDU4LjE0MDMgMjIuMkM1OC4yODQzIDIyLjQ3MiA1OC41ODgzIDIyLjY0IDU5LjA1MjMgMjIuNzA0QzU4Ljk1NjMgMjMuMDg4IDU4Ljc0MDMgMjMuNDA4IDU4LjQwNDMgMjMuNjY0QzU3LjcwMDMgMjQuMjA4IDU2Ljk2NDMgMjQuNDggNTYuMTk2MyAyNC40OEM1NS40NDQzIDI0LjQ4IDU0Ljg0NDMgMjQuMzQ0IDU0LjM5NjMgMjQuMDcyQzUzLjk0ODMgMjMuOCA1My42NjAzIDIzLjQ0IDUzLjUzMjMgMjIuOTkyWlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk02OS4yOTQ3IDE3LjI1NkM2OS44NzA3IDE2LjIzMiA3MC4xNTg3IDE1LjIgNzAuMTU4NyAxNC4xNkM3MC4xNTg3IDEzLjQ3MiA2OS45MTA3IDEzLjEyOCA2OS40MTQ3IDEzLjEyOEM2OS4wMzA3IDEzLjEyOCA2OC42Mzg3IDEzLjQ1NiA2OC4yMzg3IDE0LjExMkM2Ny44MjI3IDE0Ljc2OCA2Ny41NTA3IDE1LjUyIDY3LjQyMjcgMTYuMzY4TDY2LjE3NDcgMjRMNjEuMjA2NyAyNC40OEw2My42NTQ3IDExLjc2TDY3LjYxNDcgMTEuMjhMNjcuMTgyNyAxMy43MDRDNjcuOTY2NyAxMi4wODggNjkuMjM4NyAxMS4yOCA3MC45OTg3IDExLjI4QzcxLjkyNjcgMTEuMjggNzIuNjM4NyAxMS41MiA3My4xMzQ3IDEyQzczLjY0NjcgMTIuNDggNzMuOTAyNyAxMy4yMTYgNzMuOTAyNyAxNC4yMDhDNzMuOTAyNyAxNS4xODQgNzMuNTc0NyAxNS45ODQgNzIuOTE4NyAxNi42MDhDNzIuMjc4NyAxNy4yMzIgNzEuNDA2NyAxNy41NDQgNzAuMzAyNyAxNy41NDRDNjkuODIyNyAxNy41NDQgNjkuNDg2NyAxNy40NDggNjkuMjk0NyAxNy4yNTZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48L3N2Zz5cblwiXCJcIlxuIiwiXG5cblxueyBCdXR0b24gfSA9IHJlcXVpcmUgXCJCdXR0b25zXCJcblxuXG5cbmNsYXNzIEZsb3dWaWV3IGV4dGVuZHMgRmxvd0NvbXBvbmVudFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0aWYgQHBhcmVudFxuXHRcdFx0QHdpZHRoID0gQHBhcmVudC53aWR0aFxuXHRcdFx0QGhlaWdodCA9IEBwYXJlbnQuaGVpZ2h0XG5cblxuXG5cdEBkZWZpbmUgXCJwYXJlbnRcIixcblx0XHRlbnVtZXJhYmxlOiBmYWxzZVxuXHRcdGV4cG9ydGFibGU6IGZhbHNlXG5cdFx0aW1wb3J0YWJsZTogdHJ1ZVxuXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QF9wYXJlbnQgb3IgbnVsbFxuXHRcdFxuXHRcdHNldDogKGxheWVyKSAtPlxuXHRcdFx0cmV0dXJuIGlmIGxheWVyIGlzIEBfcGFyZW50XG5cblx0XHRcdHRocm93IEVycm9yKFwiTGF5ZXIucGFyZW50OiBhIGxheWVyIGNhbm5vdCBiZSBpdCdzIG93biBwYXJlbnQuXCIpIGlmIGxheWVyIGlzIEBcblxuXHRcdFx0IyBDaGVjayB0aGUgdHlwZVxuXHRcdFx0aWYgbm90IGxheWVyIGluc3RhbmNlb2YgTGF5ZXJcblx0XHRcdFx0dGhyb3cgRXJyb3IgXCJMYXllci5wYXJlbnQgbmVlZHMgdG8gYmUgYSBMYXllciBvYmplY3RcIlxuXG5cdFx0XHQjIENhbmNlbCBwcmV2aW91cyBwZW5kaW5nIGluc2VydGlvbnNcblx0XHRcdFV0aWxzLmRvbUNvbXBsZXRlQ2FuY2VsKEBfX2luc2VydEVsZW1lbnQpXG5cblx0XHRcdCMgUmVtb3ZlIGZyb20gcHJldmlvdXMgcGFyZW50IGNoaWxkcmVuXG5cdFx0XHRpZiBAX3BhcmVudFxuXHRcdFx0XHRAX3BhcmVudC5fY2hpbGRyZW4gPSBfLnB1bGwgQF9wYXJlbnQuX2NoaWxkcmVuLCBAXG5cdFx0XHRcdEBfcGFyZW50Ll9lbGVtZW50LnJlbW92ZUNoaWxkIEBfZWxlbWVudFxuXHRcdFx0XHRAX3BhcmVudC5lbWl0IFwiY2hhbmdlOmNoaWxkcmVuXCIsIHthZGRlZDogW10sIHJlbW92ZWQ6IFtAXX1cblx0XHRcdFx0QF9wYXJlbnQuZW1pdCBcImNoYW5nZTpzdWJMYXllcnNcIiwge2FkZGVkOiBbXSwgcmVtb3ZlZDogW0BdfVxuXG5cdFx0XHQjIEVpdGhlciBpbnNlcnQgdGhlIGVsZW1lbnQgdG8gdGhlIG5ldyBwYXJlbnQgZWxlbWVudCBvciBpbnRvIGRvbVxuXHRcdFx0aWYgbGF5ZXJcblx0XHRcdFx0bGF5ZXIuX2VsZW1lbnQuYXBwZW5kQ2hpbGQgQF9lbGVtZW50XG5cdFx0XHRcdGxheWVyLl9jaGlsZHJlbi5wdXNoIEBcblx0XHRcdFx0bGF5ZXIuZW1pdCBcImNoYW5nZTpjaGlsZHJlblwiLCB7YWRkZWQ6IFtAXSwgcmVtb3ZlZDogW119XG5cdFx0XHRcdGxheWVyLmVtaXQgXCJjaGFuZ2U6c3ViTGF5ZXJzXCIsIHthZGRlZDogW0BdLCByZW1vdmVkOiBbXX1cblx0XHRcdGVsc2Vcblx0XHRcdFx0QF9pbnNlcnRFbGVtZW50KClcblxuXHRcdFx0b2xkUGFyZW50ID0gQF9wYXJlbnRcblx0XHRcdCMgU2V0IHRoZSBwYXJlbnRcblx0XHRcdEBfcGFyZW50ID0gbGF5ZXJcblxuXHRcdFx0IyBQbGFjZSB0aGlzIGxheWVyIG9uIHRvcCBvZiBpdHMgc2libGluZ3Ncblx0XHRcdEBicmluZ1RvRnJvbnQoKVxuXG5cdFx0XHRAZW1pdCBcImNoYW5nZTpwYXJlbnRcIiwgQF9wYXJlbnQsIG9sZFBhcmVudFxuXHRcdFx0QGVtaXQgXCJjaGFuZ2U6c3VwZXJMYXllclwiLCBAX3BhcmVudCwgb2xkUGFyZW50XG5cdFx0XHRcblx0XHRcdCMgcHJpbnQgbGF5ZXJcblx0XHRcdEB3aWR0aCA9IGxheWVyLndpZHRoXG5cdFx0XHRAaGVpZ2h0ID0gbGF5ZXIuaGVpZ2h0XG5cblx0XHRcdCMgcHJpbnQgQHdpZHRoICsgXCIgXCIgKyBAaGVpZ2h0XG5cblxuXHRzdGFja1RyYW5zaXRpb246IChuYXYsIGxheWVyQSwgbGF5ZXJCLCBvdmVybGF5KSAtPlxuXHRcdHRyYW5zaXRpb24gPVxuXHRcdFx0bGF5ZXJBOlxuXHRcdFx0XHRzaG93OiB7eDogMCwgeTogMH1cblx0XHRcdFx0aGlkZToge3g6IDAgLSBsYXllckE/LndpZHRoIC8gMiwgeTogMH1cblx0XHRcdGxheWVyQjpcblx0XHRcdFx0c2hvdzoge3g6IDAsIHk6IDB9XG5cdFx0XHRcdGhpZGU6IHt4OiBsYXllckIud2lkdGgsIHk6IDB9XG5cdFx0XHRvdmVybGF5OlxuXHRcdFx0XHRzaG93OiB7b3BhY2l0eTogLjUsIHg6IDAsIHk6IDAsIHNpemU6IG5hdi5zaXplfVxuXHRcdFx0XHRoaWRlOiB7b3BhY2l0eTogMCwgeDogMCwgeTogMCwgc2l6ZTogbmF2LnNpemV9XG5cblxuXHRtb2RhbFRyYW5zaXRpb246IChuYXYsIGxheWVyQSwgbGF5ZXJCLCBvdmVybGF5KSAtPlxuXHRcdHRyYW5zaXRpb24gPVxuXHRcdFx0bGF5ZXJBOlxuXHRcdFx0XHRzaG93OiB7eDogMCwgeTogMH1cblx0XHRcdFx0aGlkZToge3g6IDAsIHk6IDB9XG5cdFx0XHRsYXllckI6XG5cdFx0XHRcdHNob3c6IHt4OiAwLCB5OiAwfVxuXHRcdFx0XHRoaWRlOiB7eDogMCwgeTogbGF5ZXJBPy5oZWlnaHQgKyAxMH1cblx0XHRcdG92ZXJsYXk6XG5cdFx0XHRcdHNob3c6IHtvcGFjaXR5OiAuNSwgeDogMCwgeTogMCwgc2l6ZTogbmF2LnNpemV9XG5cdFx0XHRcdGhpZGU6IHtvcGFjaXR5OiAwLCB4OiAwLCB5OiAwLCBzaXplOiBuYXYuc2l6ZX1cblxuXG5cblx0b3BlbjogKG5hdmlnYXRpb25WaWV3KSAtPlxuXHRcdG5hdmlnYXRpb25WaWV3LnNjcm9sbFRvVG9wKGZhbHNlKVxuXHRcdGlmIG5hdmlnYXRpb25WaWV3LndyYXBwZXIgIT0gdW5kZWZpbmVkIGFuZCBuYXZpZ2F0aW9uVmlldy53cmFwcGVyICE9IG51bGxcblx0XHRcdEB0cmFuc2l0aW9uKG5hdmlnYXRpb25WaWV3LnBhcmVudCwgQG1vZGFsVHJhbnNpdGlvbilcblx0XHRlbHNlXG5cdFx0XHRAdHJhbnNpdGlvbihuYXZpZ2F0aW9uVmlldywgQHN0YWNrVHJhbnNpdGlvbilcblxuXG5cblxuXG5jbGFzcyBNb2RhbFZpZXcgZXh0ZW5kcyBTY3JvbGxDb21wb25lbnRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdG5hdmlnYXRpb25WaWV3X1dyYXBwZXIgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwid3JhcHBlclwiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblxuXHRcdG5hdmlnYXRpb25WaWV3X1dyYXBwZXIub24gRXZlbnRzLlRhcCwgLT5cblx0XHRcdEBjaGlsZHJlblswXS5mbG93LnNob3dQcmV2aW91cygpXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0ZmxvdzogbnVsbFxuXHRcdFx0d3JhcHBlcjogbmF2aWdhdGlvblZpZXdfV3JhcHBlclxuXHRcdFx0c2Nyb2xsVmVydGljYWw6IHRydWVcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRkaXJlY3Rpb25Mb2NrOiB0cnVlXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRAcGFyZW50ID0gbmF2aWdhdGlvblZpZXdfV3JhcHBlclxuXG5cdFx0QG9uIEV2ZW50cy5UYXAsIChldmVudCwgbGF5ZXIpIC0+XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXG5cdFx0QG9uIEV2ZW50cy5Td2lwZURvd25TdGFydCwgKGV2ZW50LCBsYXllcikgLT5cblx0XHRcdGlmIEBzY3JvbGxZIDwgMCB0aGVuIEBmbG93LnNob3dQcmV2aW91cygpXG5cblx0XHQjIG5hdmlnYXRpb25WaWV3X0hhbmRsZXIgPSBuZXcgTGF5ZXJcblx0XHQjIFx0cGFyZW50OiBAXG5cdFx0IyBcdGJvcmRlclJhZGl1czogOFxuXHRcdCMgXHR3aWR0aDogNDAsIGhlaWdodDogMywgeDogQWxpZ24uY2VudGVyLCBvcGFjaXR5OiAwLjVcblx0XHQjIFx0eTogMTAwXG5cdFx0IyBcdGJhY2tncm91bmRDb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XG5cdFx0IyAjIEBvbiBcImNoYW5nZTp5XCIsIC0+XG5cdFx0IyAjIFx0QHBhcmVudC5wYXJlbnQuY2hpbGRyZW5bMV0ubmF2aWdhdGlvblZpZXdfSGFuZGxlci55ID0gQHBhcmVudC55IC0gMTFcblx0XHRcblx0XHQjIEBjb250ZW50Lm9uIFwiY2hhbmdlOnlcIiwgLT5cblx0XHQjIFx0bG9jYWxIYW5kbGVyID0gQHBhcmVudC5jaGlsZHJlblsxXVxuXHRcdCMgXHQjIGxvY2FsSGFuZGxlci55ID0gQHBhcmVudC55IC0gMTFcblx0XHQjIFx0cHJpbnQgbG9jYWxIYW5kbGVyLnlcblx0XHRcblx0XHQjIEBjb250ZW50LmVtaXQgXCJjaGFuZ2U6eVwiXG5cblxuXG5cdEBkZWZpbmUgJ2Zsb3cnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZmxvd1xuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuZmxvdyA9IHZhbHVlXG5cdFx0XHR2YWx1ZS5zaG93TmV4dChAKVxuXHRcdFx0dmFsdWUuc2hvd1ByZXZpb3VzKGFuaW1hdGU6IGZhbHNlKVxuXHRcblx0QGRlZmluZSAnd3JhcHBlcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy53cmFwcGVyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLndyYXBwZXIgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgXCJwYXJlbnRcIixcblx0XHRlbnVtZXJhYmxlOiBmYWxzZVxuXHRcdGV4cG9ydGFibGU6IGZhbHNlXG5cdFx0aW1wb3J0YWJsZTogdHJ1ZVxuXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QF9wYXJlbnQgb3IgbnVsbFxuXHRcdFxuXHRcdHNldDogKGxheWVyKSAtPlxuXG5cdFx0XHQjIEZsb3cgcGFyZW50XG5cdFx0XHRpZiBsYXllciAhPSBAd3JhcHBlclxuXHRcdFx0XHRAb3B0aW9ucy5mbG93ID0gbGF5ZXJcblxuXHRcdFx0XHRAd3JhcHBlci5wYXJlbnQgPSBsYXllclxuXHRcdFx0XHRAd3JhcHBlci53aWR0aCA9IGxheWVyLndpZHRoXG5cdFx0XHRcdEB3cmFwcGVyLmhlaWdodCA9IGxheWVyLmhlaWdodFxuXHRcdFx0XHRAd2lkdGggPSBsYXllci53aWR0aFxuXHRcdFx0XHRAaGVpZ2h0ID0gbGF5ZXIuaGVpZ2h0XG5cblx0XHRcdFx0cmV0dXJuXG5cblxuXHRcdFx0cmV0dXJuIGlmIGxheWVyIGlzIEBfcGFyZW50XG5cblx0XHRcdHRocm93IEVycm9yKFwiTGF5ZXIucGFyZW50OiBhIGxheWVyIGNhbm5vdCBiZSBpdCdzIG93biBwYXJlbnQuXCIpIGlmIGxheWVyIGlzIEBcblxuXHRcdFx0IyBDaGVjayB0aGUgdHlwZVxuXHRcdFx0aWYgbm90IGxheWVyIGluc3RhbmNlb2YgTGF5ZXJcblx0XHRcdFx0dGhyb3cgRXJyb3IgXCJMYXllci5wYXJlbnQgbmVlZHMgdG8gYmUgYSBMYXllciBvYmplY3RcIlxuXG5cdFx0XHQjIENhbmNlbCBwcmV2aW91cyBwZW5kaW5nIGluc2VydGlvbnNcblx0XHRcdFV0aWxzLmRvbUNvbXBsZXRlQ2FuY2VsKEBfX2luc2VydEVsZW1lbnQpXG5cblx0XHRcdCMgUmVtb3ZlIGZyb20gcHJldmlvdXMgcGFyZW50IGNoaWxkcmVuXG5cdFx0XHRpZiBAX3BhcmVudFxuXHRcdFx0XHRAX3BhcmVudC5fY2hpbGRyZW4gPSBfLnB1bGwgQF9wYXJlbnQuX2NoaWxkcmVuLCBAXG5cdFx0XHRcdEBfcGFyZW50Ll9lbGVtZW50LnJlbW92ZUNoaWxkIEBfZWxlbWVudFxuXHRcdFx0XHRAX3BhcmVudC5lbWl0IFwiY2hhbmdlOmNoaWxkcmVuXCIsIHthZGRlZDogW10sIHJlbW92ZWQ6IFtAXX1cblx0XHRcdFx0QF9wYXJlbnQuZW1pdCBcImNoYW5nZTpzdWJMYXllcnNcIiwge2FkZGVkOiBbXSwgcmVtb3ZlZDogW0BdfVxuXG5cdFx0XHQjIEVpdGhlciBpbnNlcnQgdGhlIGVsZW1lbnQgdG8gdGhlIG5ldyBwYXJlbnQgZWxlbWVudCBvciBpbnRvIGRvbVxuXHRcdFx0aWYgbGF5ZXJcblx0XHRcdFx0bGF5ZXIuX2VsZW1lbnQuYXBwZW5kQ2hpbGQgQF9lbGVtZW50XG5cdFx0XHRcdGxheWVyLl9jaGlsZHJlbi5wdXNoIEBcblx0XHRcdFx0bGF5ZXIuZW1pdCBcImNoYW5nZTpjaGlsZHJlblwiLCB7YWRkZWQ6IFtAXSwgcmVtb3ZlZDogW119XG5cdFx0XHRcdGxheWVyLmVtaXQgXCJjaGFuZ2U6c3ViTGF5ZXJzXCIsIHthZGRlZDogW0BdLCByZW1vdmVkOiBbXX1cblx0XHRcdGVsc2Vcblx0XHRcdFx0QF9pbnNlcnRFbGVtZW50KClcblxuXHRcdFx0b2xkUGFyZW50ID0gQF9wYXJlbnRcblx0XHRcdCMgU2V0IHRoZSBwYXJlbnRcblx0XHRcdEBfcGFyZW50ID0gbGF5ZXJcblxuXHRcdFx0IyBQbGFjZSB0aGlzIGxheWVyIG9uIHRvcCBvZiBpdHMgc2libGluZ3Ncblx0XHRcdEBicmluZ1RvRnJvbnQoKVxuXG5cdFx0XHRAZW1pdCBcImNoYW5nZTpwYXJlbnRcIiwgQF9wYXJlbnQsIG9sZFBhcmVudFxuXHRcdFx0QGVtaXQgXCJjaGFuZ2U6c3VwZXJMYXllclwiLCBAX3BhcmVudCwgb2xkUGFyZW50XG5cblxuXHRcblx0YWRkOiAoY29udGVudFZpZXcpIC0+XG5cdFx0Y29udGVudFZpZXcucGFyZW50ID0gQGN1c3RvbS52aWV3LmNvbnRlbnRcblx0XHRAYmFja2dyb3VuZENvbG9yID0gbnVsbFxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuY2xhc3MgTmF2aWdhdGlvblZpZXcgZXh0ZW5kcyBTY3JvbGxDb21wb25lbnRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRmbG93OiBudWxsXG5cdFx0XHRiYWNrQnV0dG9uOiBudWxsXG5cdFx0XHRzaG93QmFjazogdHJ1ZVxuXHRcdFx0c2Nyb2xsVmVydGljYWw6IHRydWVcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRkaXJlY3Rpb25Mb2NrOiB0cnVlXG5cdFx0XHRjdXN0b206XG5cdFx0XHRcdGJhY2tCdXR0b25fbmFtZTogXCJCYWNrX0J1dHRvblwiXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdHRyeSBAYmFja0J1dHRvbi5icmluZ1RvRnJvbnQoKVxuXG5cdFx0QG9uIEV2ZW50cy5Td2lwZVJpZ2h0U3RhcnQsIChldmVudCwgbGF5ZXIpID0+XG5cdFx0XHR0cnkgQGZsb3cuc2hvd1ByZXZpb3VzKClcblx0XHRcblx0XHRAb24gXCJjaGFuZ2U6Y2hpbGRyZW5cIiwgLT5cblx0XHRcdHRyeSBAYmFja0J1dHRvbi5icmluZ1RvRnJvbnQoKVxuXHRcblxuXHRAZGVmaW5lICdmbG93Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmZsb3dcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLmZsb3cgPSB2YWx1ZVxuXHRcdFx0dmFsdWUuc2hvd05leHQoQClcblx0XHRcdHZhbHVlLnNob3dQcmV2aW91cyhhbmltYXRlOiBmYWxzZSlcblxuXG5cblx0QGRlZmluZSAnYmFja0J1dHRvbicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5iYWNrQnV0dG9uXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5iYWNrQnV0dG9uID0gdmFsdWVcblx0XHRcdHZhbHVlLm5hbWUgPSBAY3VzdG9tLmJhY2tCdXR0b25fbmFtZVxuXG5cdFx0XHR2YWx1ZS5wYXJlbnQgPSBAXG5cdFx0XHR2YWx1ZS5icmluZ1RvRnJvbnQoKVxuXHRcdFx0XG5cdFx0XHR0cnkgdmFsdWUuaGFuZGxlciA9ICgpID0+IEBmbG93LnNob3dQcmV2aW91cygpXG5cdFxuXHRAZGVmaW5lICdzaG93QmFjaycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93QmFja1xuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuc2hvd0JhY2sgPSB2YWx1ZVxuXHRcdFx0aWYgdmFsdWUgPT0gdHJ1ZSBhbmQgQGJhY2tCdXR0b24gPT0gbnVsbFxuXHRcdFx0XHRAYmFja0J1dHRvbiA9IEBjcmVhdGVfQmFja0J1dHRvbigpXG5cblx0XG5cdGNyZWF0ZV9CYWNrQnV0dG9uOiAoKSA9PlxuXG5cdFx0cmV0dXJuIG5ldyBCdXR0b25cblx0XHRcdG5hbWU6IEBjdXN0b20uYmFja0J1dHRvbl9uYW1lXG5cdFx0XHRwYXJlbnQ6IEAsIHNpemU6IDgwLCB5OiAzMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHQjIGJhY2tncm91bmRDb2xvcjogXCJyZWRcIlxuXHRcdFx0aGFuZGxlcjogKCkgLT4gQHBhcmVudC5mbG93LnNob3dQcmV2aW91cygpXG5cblxuXHRAZGVmaW5lIFwicGFyZW50XCIsXG5cdFx0ZW51bWVyYWJsZTogZmFsc2Vcblx0XHRleHBvcnRhYmxlOiBmYWxzZVxuXHRcdGltcG9ydGFibGU6IHRydWVcblxuXHRcdGdldDogLT5cblx0XHRcdEBfcGFyZW50IG9yIG51bGxcblx0XHRcblx0XHRzZXQ6IChsYXllcikgLT5cblxuXHRcdFx0cmV0dXJuIGlmIGxheWVyIGlzIEBfcGFyZW50XG5cblx0XHRcdHRocm93IEVycm9yKFwiTGF5ZXIucGFyZW50OiBhIGxheWVyIGNhbm5vdCBiZSBpdCdzIG93biBwYXJlbnQuXCIpIGlmIGxheWVyIGlzIEBcblxuXHRcdFx0IyBDaGVjayB0aGUgdHlwZVxuXHRcdFx0aWYgbm90IGxheWVyIGluc3RhbmNlb2YgTGF5ZXJcblx0XHRcdFx0dGhyb3cgRXJyb3IgXCJMYXllci5wYXJlbnQgbmVlZHMgdG8gYmUgYSBMYXllciBvYmplY3RcIlxuXG5cdFx0XHQjIENhbmNlbCBwcmV2aW91cyBwZW5kaW5nIGluc2VydGlvbnNcblx0XHRcdFV0aWxzLmRvbUNvbXBsZXRlQ2FuY2VsKEBfX2luc2VydEVsZW1lbnQpXG5cblx0XHRcdCMgUmVtb3ZlIGZyb20gcHJldmlvdXMgcGFyZW50IGNoaWxkcmVuXG5cdFx0XHRpZiBAX3BhcmVudFxuXHRcdFx0XHRAX3BhcmVudC5fY2hpbGRyZW4gPSBfLnB1bGwgQF9wYXJlbnQuX2NoaWxkcmVuLCBAXG5cdFx0XHRcdEBfcGFyZW50Ll9lbGVtZW50LnJlbW92ZUNoaWxkIEBfZWxlbWVudFxuXHRcdFx0XHRAX3BhcmVudC5lbWl0IFwiY2hhbmdlOmNoaWxkcmVuXCIsIHthZGRlZDogW10sIHJlbW92ZWQ6IFtAXX1cblx0XHRcdFx0QF9wYXJlbnQuZW1pdCBcImNoYW5nZTpzdWJMYXllcnNcIiwge2FkZGVkOiBbXSwgcmVtb3ZlZDogW0BdfVxuXG5cdFx0XHQjIEVpdGhlciBpbnNlcnQgdGhlIGVsZW1lbnQgdG8gdGhlIG5ldyBwYXJlbnQgZWxlbWVudCBvciBpbnRvIGRvbVxuXHRcdFx0aWYgbGF5ZXJcblx0XHRcdFx0bGF5ZXIuX2VsZW1lbnQuYXBwZW5kQ2hpbGQgQF9lbGVtZW50XG5cdFx0XHRcdGxheWVyLl9jaGlsZHJlbi5wdXNoIEBcblx0XHRcdFx0bGF5ZXIuZW1pdCBcImNoYW5nZTpjaGlsZHJlblwiLCB7YWRkZWQ6IFtAXSwgcmVtb3ZlZDogW119XG5cdFx0XHRcdGxheWVyLmVtaXQgXCJjaGFuZ2U6c3ViTGF5ZXJzXCIsIHthZGRlZDogW0BdLCByZW1vdmVkOiBbXX1cblx0XHRcdGVsc2Vcblx0XHRcdFx0QF9pbnNlcnRFbGVtZW50KClcblxuXHRcdFx0b2xkUGFyZW50ID0gQF9wYXJlbnRcblx0XHRcdCMgU2V0IHRoZSBwYXJlbnRcblx0XHRcdEBfcGFyZW50ID0gbGF5ZXJcblxuXHRcdFx0IyBQbGFjZSB0aGlzIGxheWVyIG9uIHRvcCBvZiBpdHMgc2libGluZ3Ncblx0XHRcdEBicmluZ1RvRnJvbnQoKVxuXG5cdFx0XHRAZW1pdCBcImNoYW5nZTpwYXJlbnRcIiwgQF9wYXJlbnQsIG9sZFBhcmVudFxuXHRcdFx0QGVtaXQgXCJjaGFuZ2U6c3VwZXJMYXllclwiLCBAX3BhcmVudCwgb2xkUGFyZW50XG5cblx0XHRcdEB3aWR0aCA9IEBwYXJlbnQud2lkdGhcblx0XHRcdEBoZWlnaHQgPSBAcGFyZW50LmhlaWdodFxuXG5cdFx0XHRAZmxvdyA9IEBwYXJlbnRcblxuXHRcblxuXG5cdGFkZDogKGNvbnRlbnRWaWV3KSAtPlxuXHRcdGNvbnRlbnRWaWV3LnBhcmVudCA9IEBjb250ZW50XG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgRmxvd1ZpZXcsIE5hdmlnYXRpb25WaWV3LCBNb2RhbFZpZXcgfSIsIiMgUHJldmlldyBDb21wb25lbnRcblxuRnJhbWVyLkRlZmF1bHRzLkFuaW1hdGlvbiA9XG5cdGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSlcblx0dGltZTogMC41XG5cbiMge1ByZXZpZXdfQ2xhc3N9ID0gcmVxdWlyZSBcIlByZXZpZXdfQ2xhc3NcIlxuIyB7UHJldmlld19Jbml0fSA9IHJlcXVpcmUgXCJQcmV2aWV3X0luaXRcIlxue1ByZXZpZXdfVUl9ID0gcmVxdWlyZSBcIlByZXZpZXdfVUlcIlxuIyB7Q29udHJvbF9DbGFzc30gPSByZXF1aXJlIFwiQ29udHJvbF9DbGFzc1wiXG5cbmNsYXNzIEZpeFByZXZpZXdFeHBvcnQgZXh0ZW5kcyBQcmV2aWV3X1VJXG5jbGFzcyBleHBvcnRzLlByZXZpZXcgZXh0ZW5kcyBGaXhQcmV2aWV3RXhwb3J0XG5cblxuXG5cbiMgTmF0aXZlXG5cbmB3aW5kb3cuc2F2ZVByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0ID0gZnVuY3Rpb24gKGxheWVyKSB7XG5cdHdpbmRvdy5wcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdCA9IGxheWVyXG59XG5gXG5cbmB3aW5kb3cucmVjZWl2ZU1lc3NhZ2VOb3JtYWwgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0d2luZG93LnByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0LmFuaW1hdGVTdGF0ZVRvTm9ybWFsKClcbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0ZU5vcm1hbFwiLCByZWNlaXZlTWVzc2FnZU5vcm1hbCwgZmFsc2UpO1xuYFxuXG5gd2luZG93LnJlY2VpdmVNZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdGNvbnNvbGUubG9nKGV2ZW50KVxuXHR3aW5kb3cucHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QuYW5pbWF0ZVN0YXRlVG9GaWxsKClcbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0ZUZpbGxcIiwgcmVjZWl2ZU1lc3NhZ2UsIGZhbHNlKTtcbmBcblxuXG5cblxuXG5cbiIsIlxuXG5vdmVycmlkZVRpbWVWYWx1ZSA9IFwiMjA6MjFcIlxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXdfQ2xhc3MgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0c3RhdGVHdWFyZExheWVyID0gbmV3IExheWVyIHsgb3BhY2l0eTogMCwgc2l6ZTogMSB9XG5cdFx0c3RhdGVHdWFyZExheWVyLnN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IHNjYWxlOiAxIH1cblx0XHRcdFwiZmlsbFwiOiB7IHNjYWxlOiAxIH1cblx0XHRzdGF0ZUd1YXJkTGF5ZXIuc3RhdGVTd2l0Y2goXCJmaWxsXCIpXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0bmFtZTogXCJQcmV2aWV3XCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA0MlxuXG5cdFx0XHRzdGF0ZUd1YXJkOiBzdGF0ZUd1YXJkTGF5ZXJcblx0XHRcdHZpZXc6IG51bGxcblxuXHRcdFx0Ym9yZGVyVmlldzogbnVsbFxuXHRcdFx0c3RhdHVzQmFyVmlldzogbnVsbFxuXHRcdFx0aG9tZUJhclZpZXc6IG51bGxcblxuXHRcdFx0Y29uZmlnVmlldzogbnVsbFxuXHRcdFx0c2VjdGlvblZpZXc6IG51bGxcblx0XHRcdFxuXG5cblx0XHRcdCMgRGV2aWNlXG5cdFx0XHRzaG93RGV2aWNlOiB0cnVlXG5cblx0XHRcdCMgQmFyc1xuXHRcdFx0c2hvd0JhcnM6IHRydWVcblx0XHRcdHNob3dTdGF0dXNCYXI6IHRydWVcblx0XHRcdHNob3dIb21lQmFyOiB0cnVlXG5cblx0XHRcdHRpbWVWYWx1ZTogb3ZlcnJpZGVUaW1lVmFsdWUgIyBubyBvdmVycmlkZVxuXHRcdFx0Zm9yY2VBbmRyb2lkQmFyOiBmYWxzZVxuXHRcdFx0c3RhdHVzQmFyX3RoZW1lOiBcImRhcmtcIlxuXHRcdFx0aG9tZUJhcl90aGVtZTogXCJkYXJrXCJcblxuXHRcdFx0IyBDb250cm9sc1xuXHRcdFx0c2hvd1VJOiB0cnVlXG5cdFx0XHRzaG93TG9nbzogdHJ1ZVxuXHRcdFx0c2NhbGVTdGF0ZTogXCJmaWxsXCIgIyBmaWxsIC8gbm9ybWFsXG5cdFx0XHRzaG93SGludHM6IHRydWVcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0d2luZG93LnNhdmVQcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdChAKVxuXHRcdEB1cGRhdGVJbml0KClcblx0XHRcblx0XHRAc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgc2NhbGU6IDEgfVxuXHRcdFx0XCJmaWxsXCI6IHsgc2NhbGU6IDEgfVxuXG5cblxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnZpZXcgPSB2YWx1ZVxuXHRcdFx0QHdpZHRoID0gQHZpZXcud2lkdGhcblx0XHRcdEBoZWlnaHQgPSBAdmlldy5oZWlnaHRcblx0XHRcdEB2aWV3LnBhcmVudCA9IEBcblx0XG5cdEBkZWZpbmUgJ3N0YXRlR3VhcmQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc3RhdGVHdWFyZFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zdGF0ZUd1YXJkID0gdmFsdWVcblxuXG5cblx0QGRlZmluZSAnZGV2aWNlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmJvcmRlclZpZXdcblx0XG5cdEBkZWZpbmUgJ3N0YXR1c0JhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zdGF0dXNCYXJWaWV3XG5cdFxuXHRAZGVmaW5lICdob21lQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmhvbWVCYXJWaWV3XG5cblxuXG5cdEBkZWZpbmUgJ2JvcmRlclZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYm9yZGVyVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ib3JkZXJWaWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3N0YXR1c0JhclZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc3RhdHVzQmFyVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zdGF0dXNCYXJWaWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2hvbWVCYXJWaWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmhvbWVCYXJWaWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmhvbWVCYXJWaWV3ID0gdmFsdWVcblxuXG5cblx0QGRlZmluZSAnY29uZmlnVmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5jb25maWdWaWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmNvbmZpZ1ZpZXcgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnc2VjdGlvblZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2VjdGlvblZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2VjdGlvblZpZXcgPSB2YWx1ZVxuXHRcblxuXHRcblx0XG5cdFxuXG5cdGFuaW1hdGVTdGF0ZVRvTm9ybWFsOiAoKSA9PlxuXHRcdEBzdGF0ZUd1YXJkLnN0YXRlU3dpdGNoKFwibm9ybWFsXCIpXG5cdFx0QGFuaW1hdGUoc2NhbGU6IEBzdGF0ZXNbXCJub3JtYWxcIl0uc2NhbGUsIG9wdGlvbnM6IHsgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41IH0pXG5cdFx0aWYgQGJvcmRlclZpZXcgdGhlbiBAYm9yZGVyVmlldy5hbmltYXRlU3RhdGVUb05vcm1hbCgpXG5cdFxuXHRhbmltYXRlU3RhdGVUb0ZpbGw6ICgpID0+XG5cdFx0QHN0YXRlR3VhcmQuc3RhdGVTd2l0Y2goXCJmaWxsXCIpXG5cdFx0QGFuaW1hdGUoc2NhbGU6IEBzdGF0ZXNbXCJmaWxsXCJdLnNjYWxlLCBvcHRpb25zOiB7IGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSB9KVxuXHRcdGlmIEBib3JkZXJWaWV3IHRoZW4gQGJvcmRlclZpZXcuYW5pbWF0ZVN0YXRlVG9GaWxsKClcblxuXHRzdGF0ZVN3aXRjaFRvTm9ybWFsOiAoKSA9PlxuXHRcdEBzdGF0ZUd1YXJkLnN0YXRlU3dpdGNoKFwibm9ybWFsXCIpXG5cdFx0QGFuaW1hdGUoc2NhbGU6IEBzdGF0ZXNbXCJub3JtYWxcIl0uc2NhbGUsIG9wdGlvbnM6IHsgY3VydmU6IEJlemllci5saW5lYXIsIHRpbWU6IDAgfSlcblx0XHRpZiBAYm9yZGVyVmlldyB0aGVuIEBib3JkZXJWaWV3LnN0YXRlU3dpdGNoVG9Ob3JtYWwoKVxuXHRcblx0c3RhdGVTd2l0Y2hUb0ZpbGw6ICgpID0+XG5cdFx0QHN0YXRlR3VhcmQuc3RhdGVTd2l0Y2goXCJmaWxsXCIpXG5cdFx0QGFuaW1hdGUoc2NhbGU6IEBzdGF0ZXNbXCJmaWxsXCJdLnNjYWxlLCBvcHRpb25zOiB7IGN1cnZlOiBCZXppZXIubGluZWFyLCB0aW1lOiAwIH0pXG5cdFx0aWYgQGJvcmRlclZpZXcgdGhlbiBAYm9yZGVyVmlldy5zdGF0ZVN3aXRjaFRvRmlsbCgpXG5cdFxuXG5cdFxuXHRcblxuXHRAZGVmaW5lICdzaG93RGV2aWNlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNob3dEZXZpY2Vcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0RldmljZSA9IHZhbHVlXG5cdFxuXG5cblx0QGRlZmluZSAnc2hvd0JhcnMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2hvd0JhcnNcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0JhcnMgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnc2hvd1N0YXR1c0JhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93U3RhdHVzQmFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNob3dTdGF0dXNCYXIgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnc2hvd0hvbWVCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2hvd0hvbWVCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0hvbWVCYXIgPSB2YWx1ZVxuXG5cblxuXG5cblx0QGRlZmluZSAndGltZVZhbHVlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRpbWVWYWx1ZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50aW1lVmFsdWUgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnZm9yY2VBbmRyb2lkQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZEJhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRCYXIgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnc3RhdHVzQmFyX3RoZW1lJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnN0YXR1c0Jhcl90aGVtZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zdGF0dXNCYXJfdGhlbWUgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnaG9tZUJhcl90aGVtZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ob21lQmFyX3RoZW1lXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmhvbWVCYXJfdGhlbWUgPSB2YWx1ZVxuXG5cblxuXG5cdEBkZWZpbmUgJ3Nob3dVSScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93VUlcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd1VJID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3Nob3dMb2dvJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNob3dMb2dvXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNob3dMb2dvID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3Nob3dIaW50cycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93SGludHNcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0hpbnRzID0gdmFsdWVcblx0XG5cdFxuXHRcblxuXG5cdEBkZWZpbmUgJ3NjYWxlU3RhdGUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2NhbGVTdGF0ZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zY2FsZVN0YXRlID0gdmFsdWVcblx0XG5cblxuXG5cblxuXG5cblx0dXBkYXRlSW5pdDogKCkgPT5cblxuXHRcdEBzY2FsZVN0YXRlID0gQGdldFN0YXRlR2VuZXJpYyhcInNjYWxlXCIsIFt7IHZhbHVlOiBcImZpbGxcIiwgcmVzdWx0OiBcImZpbGxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJub3JtYWxcIiwgcmVzdWx0OiBcIm5vcm1hbFwiIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogXCJub3JtYWxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogXCJmaWxsXCIgfV0sIEBzY2FsZVN0YXRlKVxuXHRcdFxuXHRcdEBzY2FsZVN0YXRlID0gQGdldFN0YXRlR2VuZXJpYyhcImZpbGxcIiwgW3sgdmFsdWU6IFwib25cIiwgcmVzdWx0OiBcImZpbGxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvZmZcIiwgcmVzdWx0OiBcIm5vcm1hbFwiIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcInRydWVcIiwgcmVzdWx0OiBcImZpbGxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IFwibm9ybWFsXCIgfV0sIEBzY2FsZVN0YXRlKVxuXG5cdFx0QHNob3dVSSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJidXR0b25cIiwgW3sgdmFsdWU6IFwiZmFsc2VcIiwgcmVzdWx0OiBmYWxzZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogdHJ1ZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvblwiLCByZXN1bHQ6IHRydWUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogZmFsc2UgfV0sIEBzaG93VUkpXG5cdFx0XG5cdFx0QHNob3dVSSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJ1aVwiLCBbeyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcInRydWVcIiwgcmVzdWx0OiB0cnVlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9uXCIsIHJlc3VsdDogdHJ1ZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvZmZcIiwgcmVzdWx0OiBmYWxzZSB9XSwgQHNob3dVSSlcblxuXHRcdEBzaG93TG9nbyA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJsb2dvXCIsIFt7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwidHJ1ZVwiLCByZXN1bHQ6IHRydWUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwib25cIiwgcmVzdWx0OiB0cnVlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9mZlwiLCByZXN1bHQ6IGZhbHNlIH1dLCBAc2hvd0xvZ28pXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRAc2hvd0RldmljZSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJkZXZpY2VcIiwgW3sgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvblwiLCByZXN1bHQ6IHRydWUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwidHJ1ZVwiLCByZXN1bHQ6IHRydWUgfV0sIEBzaG93RGV2aWNlKVxuXHRcdFxuXHRcdEBzaG93SGludHMgPSBAZ2V0U3RhdGVHZW5lcmljKFwiaGludHNcIiwgW3sgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvblwiLCByZXN1bHQ6IHRydWUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwidHJ1ZVwiLCByZXN1bHQ6IHRydWUgfV0sIEBzaG93SGludHMpXG5cblxuXG5cdCMgZ2V0U3RhdGVHZW5lcmljOiAoa2V5ID0gXCJzY2FsZVwiLCBwYWlycyA9IFt7IHZhbHVlOiAsIHJlc3VsdDogfSwge3ZhbHVlOiAsIHJlc3VsdDogfV0sIGRlZmF1bHRSZXN1bHQgPSBcIlwiKVxuXHRnZXRTdGF0ZUdlbmVyaWM6IChzdGF0ZUtleSA9IFwic2NhbGVcIiwgc3RhdGVQYWlycyA9IFtdLCBkZWZhdWx0UmVzdWx0ID0gXCJcIikgPT5cblx0XHRyZXN1bHQgPSBkZWZhdWx0UmVzdWx0XG5cblx0XHRmb3IgaXRlbSBpbiBsb2NhdGlvbi5zZWFyY2hbMS4uXS5zcGxpdCgnJicpXG5cdFx0XHRrZXlWYWx1ZVBhaXIgPSBpdGVtLnNwbGl0KFwiPVwiKVxuXHRcdFx0a2V5UGFydCA9IGtleVZhbHVlUGFpclswXVxuXHRcdFx0dmFsdWVQYXJ0ID0ga2V5VmFsdWVQYWlyWzFdXG5cblx0XHRcdGlmIGtleVBhcnQgPT0gc3RhdGVLZXlcblx0XHRcdFx0Zm9yIHBhaXIgaW4gc3RhdGVQYWlyc1xuXHRcdFx0XHRcdGlmIHZhbHVlUGFydCA9PSBwYWlyLnZhbHVlXG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBwYWlyLnJlc3VsdFxuXHRcdFx0XHRcdCMgZWxzZVxuXHRcdFx0XHRcdFx0IyBwcmludCBcIm5vdCBcIiArIFwiICN7cGFpci52YWx1ZX1cIiBcblx0XHRcblx0XHRyZXR1cm4gcmVzdWx0XG5cdFxuXHRcblx0XG5cdFxuIiwiXG5cbntQcmV2aWV3X0NsYXNzfSA9IHJlcXVpcmUgXCJQcmV2aWV3X0NsYXNzXCJcbntEZXZpY2VfQ2xhc3N9ID0gcmVxdWlyZSBcIkRldmljZV9DbGFzc1wiXG5cbntIb21lQmFyX0NsYXNzfSA9IHJlcXVpcmUgXCJIb21lQmFyX0NsYXNzXCJcbntTdGF0dXNCYXJfQ2xhc3N9ID0gcmVxdWlyZSBcIlN0YXR1c0Jhcl9DbGFzc1wiXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld19Jbml0IGV4dGVuZHMgUHJldmlld19DbGFzc1xuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAc2NhbGVQcmV2aWV3KClcblxuXHRcblx0XG5cdHNjYWxlUHJldmlldzogKCkgPT5cblx0XHRpZiBVdGlscy5pc01vYmlsZSgpIHRoZW4gQHByZXZpZXdNb2JpbGUoKVxuXHRcdGVsc2UgQHByZXZpZXdEZXNrdG9wKClcblx0XG5cdHVwZGF0ZVByZXZpZXc6ICgpID0+XG5cdFx0aWYgQHN0YXRlR3VhcmQuc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcImZpbGxcIiB0aGVuIEBzdGF0ZVN3aXRjaFRvRmlsbCgpXG5cdFx0ZWxzZSBAc3RhdGVTd2l0Y2hUb05vcm1hbCgpXG5cblx0XHQjIGlmIEBib3JkZXJWaWV3XG5cdFx0IyBcdGlmIEBzY2FsZVN0YXRlID09IFwiZmlsbFwiIHRoZW4gQGJvcmRlclZpZXcuc3RhdGVTd2l0Y2hUb0ZpbGwoKVxuXHRcdCMgXHRlbHNlIEBib3JkZXJWaWV3LnN0YXRlU3dpdGNoVG9Ob3JtYWwoKVxuXHRcblxuXG5cblx0cHJldmlld0Rlc2t0b3A6ICgpID0+XG5cdFx0aWYgQHNob3dEZXZpY2UgdGhlbiBAYm9yZGVyVmlldyA9IG5ldyBEZXZpY2VfQ2xhc3MgeyB2aWV3OiBAIH1cblxuXHRcdGlmIEBzaG93SGludHMgdGhlbiBGcmFtZXIuRXh0cmFzLkhpbnRzLmVuYWJsZSgpXG5cdFx0ZWxzZSBGcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXG5cdFx0aWYgQHNob3dCYXJzXG5cdFx0XHRpZiBAc2hvd0hvbWVCYXIgdGhlbiBAaG9tZUJhclZpZXcgPSBuZXcgSG9tZUJhcl9DbGFzcyB7IHZpZXc6IEAgfVxuXHRcdFx0aWYgQHNob3dTdGF0dXNCYXIgdGhlbiBAc3RhdHVzQmFyVmlldyA9IG5ldyBTdGF0dXNCYXJfQ2xhc3MgeyB2aWV3OiBAIH1cblxuXHRcdEBjbGlwID0gdHJ1ZVxuXHRcdEB1cGRhdGVTY2FsZSgpXG5cdFx0QHVwZGF0ZVByZXZpZXdPblJlc2l6ZSgpXG5cdFx0XG5cdFx0aWYgQHNjYWxlU3RhdGUgPT0gXCJmaWxsXCIgdGhlbiBAc3RhdGVTd2l0Y2hUb0ZpbGwoKVxuXHRcdGVsc2UgQHN0YXRlU3dpdGNoVG9Ob3JtYWwoKVxuXG5cdFxuXHRwcmV2aWV3TW9iaWxlOiAoKSA9PlxuXHRcdEZyYW1lci5FeHRyYXMuSGludHMuZGlzYWJsZSgpXG5cdFx0XG5cdFx0QHNjYWxlID0gU2NyZWVuLndpZHRoIC8gQHdpZHRoXG5cdFx0QHggPSBBbGlnbi5jZW50ZXJcblx0XHRAeSA9IEFsaWduLmNlbnRlclxuXG5cdFxuXG5cdHVwZGF0ZVNjYWxlOiAoKSA9PlxuXG5cdFx0QHggPSBBbGlnbi5jZW50ZXJcblx0XHRAeSA9IEFsaWduLmNlbnRlclxuXG5cdFx0aWYgQGJvcmRlclZpZXdcblx0XHRcdEBib3JkZXJWaWV3LnggPSBBbGlnbi5jZW50ZXJcblx0XHRcdEBib3JkZXJWaWV3LnkgPSBBbGlnbi5jZW50ZXJcblxuXHRcdHNjYWxlWCA9IChTY3JlZW4ud2lkdGggLSAxMTIpIC8gQHdpZHRoXG5cdFx0c2NhbGVZID0gKFNjcmVlbi5oZWlnaHQgLSAxMTIpIC8gQGhlaWdodFxuXHRcdEBzdGF0ZXNbXCJmaWxsXCJdLnNjYWxlID0gTWF0aC5taW4oc2NhbGVYLCBzY2FsZVkpXG5cblx0XHRpZiBAYm9yZGVyVmlld1xuXHRcdFx0QGJvcmRlclZpZXcuc3RhdGVzW1wiZmlsbFwiXS5zY2FsZSA9IEBzdGF0ZXNbXCJmaWxsXCJdLnNjYWxlXG5cblxuXG5cblxuXG5cblxuXHR1cGRhdGVQcmV2aWV3T25SZXNpemU6ICgpID0+XG5cdFx0bG9jYWxQcmV2aWV3ID0gQFxuXHRcdFxuXHRcdENhbnZhcy5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZSgpXG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlUHJldmlldygpXG5cdFx0XG5cdFx0Q2FudmFzLm9uIFwiY2hhbmdlOndpZHRoXCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlU2NhbGUoKVxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVByZXZpZXcoKVxuXHRcdFxuXG5cdFx0U2NyZWVuLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVNjYWxlKClcblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVQcmV2aWV3KClcblx0XHRcblx0XHRTY3JlZW4ub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZSgpXG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlUHJldmlldygpXG5cdFxuXHRcblxuXG4iLCJcbntMb2dvTGF5ZXJ9ID0gcmVxdWlyZSBcIkxvZ29cIlxue1ByZXZpZXdfSW5pdH0gPSByZXF1aXJlIFwiUHJldmlld19Jbml0XCJcbntVSV9TZWN0aW9ufSA9IHJlcXVpcmUgXCJVSV9TZWN0aW9uXCJcbntVSV9Db25maWd9ID0gcmVxdWlyZSBcIlVJX0NvbmZpZ1wiXG5cblxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3X1VJIGV4dGVuZHMgUHJldmlld19Jbml0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAc2hvd0Rlc2t0b3BVSSgpXG5cdFxuXG5cblx0c2hvd0Rlc2t0b3BVSTogKCkgPT5cblx0XHRpZiBVdGlscy5pc01vYmlsZSgpIHRoZW4gcmV0dXJuXG5cblx0XHRpZiBAc2hvd0xvZ28gdGhlbiBAY3JlYXRlTG9nb0J1dHRvbigpXG5cdFx0aWYgQHNob3dVSSB0aGVuIEBhZGRDb25maWcoKVxuXG5cblxuXG5cblxuXHRjcmVhdGVMb2dvQnV0dG9uOiAoKSA9PlxuXHRcdFxuXHRcdG9wZW5Ib21lSGFuZGxlciA9ICgpIC0+XG5cdFx0XHR3aW5kb3cubG9jYXRpb24gPSBcImh0dHBzOi8vdGlsbGx1ci5jb21cIlxuXHRcdFxuXHRcdGxvZ29CdXR0b24gPSBuZXcgTG9nb0xheWVyXG5cdFx0XHR3aWR0aDogNzYsIGhlaWdodDogMzJcblx0XHRcdHg6IEFsaWduLmxlZnQoMzIpLCB5OiBBbGlnbi50b3AoMTIpXG5cdFx0XHRoYW5kbGVyOiBvcGVuSG9tZUhhbmRsZXJcblx0XG5cblx0YWRkU2VjdGlvbjogKHRpdGxlLCBhY3Rpb25BcnJheSA9IFtdKSA9PlxuXHRcdGlmIEBzZWN0aW9uVmlldyA9PSBudWxsIHRoZW4gQHNlY3Rpb25WaWV3ID0gbmV3IFVJX1NlY3Rpb25cblx0XHRAc2VjdGlvblZpZXcuYWRkU2VjdGlvbih0aXRsZSwgYWN0aW9uQXJyYXkpXG5cblxuXHQjIEZpbGwg4peJXG5cdCMgRmlsbCDil45cblxuXHRhZGRDb25maWc6ICgpID0+XG5cdFx0QGNvbmZpZ1ZpZXcgPSBuZXcgVUlfQ29uZmlnIHsgdmlldzogQCB9XG5cblx0XHRzY2FsZVR1cGxlID0gW1wiRml0XCIsIFwiMTAwJVwiXVxuXHRcdGhpbnRzVHVwbGUgPSBbXCJIaW50cyDil4lcIiwgXCJIaW50cyDil45cIl1cblxuXG5cdFx0dG9nZ2xlU2NhbGUgPSAoZW1wdHlEYXRhLCBsb2NhbEJ1dHRvbikgPT5cblx0XHRcdGlmIEBzdGF0ZUd1YXJkLnN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJub3JtYWxcIlxuXHRcdFx0XHRAYW5pbWF0ZVN0YXRlVG9GaWxsKClcblx0XHRcdFx0bG9jYWxCdXR0b24udGV4dCA9IHNjYWxlVHVwbGVbMF1cblx0XHRcdGVsc2Vcblx0XHRcdFx0QGFuaW1hdGVTdGF0ZVRvTm9ybWFsKClcblx0XHRcdFx0bG9jYWxCdXR0b24udGV4dCA9IHNjYWxlVHVwbGVbMV1cblx0XHRcdFx0XG5cdFx0XG5cdFx0dG9nZ2xlVGlwcyA9IChlbXB0eURhdGEsIGxvY2FsQnV0dG9uKSA9PlxuXHRcdFx0aWYgQHNob3dIaW50c1xuXHRcdFx0XHRAaGlkZUhpbnRzSGFuZGxlcigpXG5cdFx0XHRcdGxvY2FsQnV0dG9uLnRleHQgPSBoaW50c1R1cGxlWzFdXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBzaG93SGludHNIYW5kbGVyKClcblx0XHRcdFx0bG9jYWxCdXR0b24udGV4dCA9IGhpbnRzVHVwbGVbMF1cblx0XHRcblx0XHRpbml0U2NhbGVUaXRsZSA9IGlmIEBzaG93SGludHMgdGhlbiBoaW50c1R1cGxlWzBdIGVsc2UgaGludHNUdXBsZVsxXVxuXHRcdGluaXRTdGF0ZVRpdGxlID0gaWYgQHN0YXRlR3VhcmQuc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcIm5vcm1hbFwiIHRoZW4gc2NhbGVUdXBsZVsxXSBlbHNlIHNjYWxlVHVwbGVbMF1cblxuXHRcdCMgcHJpbnQgaW5pdFNjYWxlVGl0bGUgKyBcIiBcIiArIGluaXRTdGF0ZVRpdGxlXG5cblx0XHRAY29uZmlnVmlldy5hZGRTZWN0aW9uKFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IGluaXRTY2FsZVRpdGxlLFxuXHRcdFx0XHRoYW5kbGVyOiB0b2dnbGVUaXBzXG5cdFx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBpbml0U3RhdGVUaXRsZSxcblx0XHRcdFx0aGFuZGxlcjogdG9nZ2xlU2NhbGVcblx0XHRcdH0sXG5cdFx0XSlcblx0XG5cdFxuXHRoaWRlSGludHNIYW5kbGVyOiAoKSA9PlxuXHRcdEZyYW1lci5FeHRyYXMuSGludHMuZGlzYWJsZSgpXG5cdFx0QHNob3dIaW50cyA9ICFAc2hvd0hpbnRzXG5cblx0c2hvd0hpbnRzSGFuZGxlcjogKCkgPT5cblx0XHRGcmFtZXIuRXh0cmFzLkhpbnRzLmVuYWJsZSgpXG5cdFx0RnJhbWVyLkV4dHJhcy5IaW50cy5zaG93SGludHMoKVxuXHRcdEBzaG93SGludHMgPSAhQHNob3dIaW50c1xuIiwiXG5cbmNsYXNzIGV4cG9ydHMuU3RhdHVzQmFyX0NsYXNzIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IEB2aWV3XG5cdFx0XHR3aWR0aDogQHZpZXcud2lkdGhcblxuXHRcdFx0eTogQWxpZ24udG9wLCBuYW1lOiBcIi5zdGF0dXMgYmFyXCIsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0XHR0aGVtZTogQHZpZXcuc3RhdHVzQmFyX3RoZW1lXG5cdFx0XHRmb3JjZUFuZHJvaWQ6IEB2aWV3LmZvcmNlQW5kcm9pZEJhclxuXHRcdFx0cHJvdG90eXBlQ3JlYXRpb25ZZWFyOiBAdmlldy50aW1lVmFsdWVcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QGNyZWF0ZSgpXG5cblxuXG5cblxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudmlldyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICd0aGVtZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50aGVtZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50aGVtZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdmb3JjZUFuZHJvaWQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZm9yY2VBbmRyb2lkXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZCA9IHZhbHVlXG5cblx0QGRlZmluZSAncHJvdG90eXBlQ3JlYXRpb25ZZWFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5wcm90b3R5cGVDcmVhdGlvblllYXIgPSB2YWx1ZVxuXG5cblxuXG5cdHZpZXdTaXplOiAodywgaCkgPT4gcmV0dXJuIEB2aWV3LndpZHRoID09IHcgYW5kIEB2aWV3LmhlaWdodCA9PSBoXG5cblx0Y3JlYXRlOiAoKSA9PlxuXHRcdFxuXHRcdGlmIEBmb3JjZUFuZHJvaWQgdGhlbiBAY3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXIoKSBcblxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM3NSwgODEyKSBvciBAdmlld1NpemUoMzkwLCA4NDQpIG9yIEB2aWV3U2l6ZSg0MTQsIDg5Nikgb3IgQHZpZXdTaXplKDQyOCwgOTI2KSBvciBAdmlld1NpemUoMzYwLCA3ODIpXG5cdFx0XHRAY3JlYXRlTm90Y2hTdGF0dXNCYXIoKVxuXHRcdFxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM5MywgODUyKVxuXHRcdFx0QGNyZWF0ZU5vdGNoU3RhdHVzQmFyKClcblx0XHRcblx0XHRlbHNlIGlmIEB2aWV3U2l6ZSgzNzUsIDY2Nykgb3IgQHZpZXdTaXplKDQxNCwgNzM2KSBvciBAdmlld1NpemUoMzIwLCA1NjgpXG5cdFx0XHRAY3JlYXRlQ2xhc3NpY1N0YXR1c0JhcigpXG5cdFx0XG5cdFx0XG5cdFx0ZWxzZSBAY3JlYXRlQW5kcm9pZFN0YXR1c0JhcigpXG5cdFxuXHRcblx0XG5cdFxuXG5cblxuXHRjcmVhdGVBbmRyb2lkU3RhdHVzQmFyOiAoKSA9PlxuXHRcdEBoZWlnaHQgPSAzMlxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiA1MiwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ubGVmdCg0KSwgeTogQWxpZ24udG9wKDIgKyA1KVxuXHRcdFx0Y29sb3I6IGRldmljZV9hc3NldHMuY29sb3JbQHRoZW1lXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTQsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogMTAwLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5yaWdodCgtNCksIHk6IEFsaWduLnRvcCg1KVxuXHRcdFx0aW1hZ2U6IGRldmljZV9hc3NldHMuYW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHRoZW1lXVxuXHRcblx0XG5cdGNyZWF0ZUNsYXNzaWNBbmRyb2lkU3RhdHVzQmFyOiAoKSA9PlxuXHRcdEBoZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiA1MiwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ubGVmdCwgeTogQWxpZ24udG9wKDIpXG5cdFx0XHRjb2xvcjogZGV2aWNlX2Fzc2V0cy5jb2xvcltAdGhlbWVdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxNCwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiAxMDAsIGhlaWdodDogMjAsIHg6IEFsaWduLnJpZ2h0LCB5OiBBbGlnbi50b3AoKVxuXHRcdFx0aW1hZ2U6IGRldmljZV9hc3NldHMuYW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHRoZW1lXVxuXHRcblx0XG5cblxuXG5cdGNyZWF0ZUNsYXNzaWNTdGF0dXNCYXI6ICgpID0+XG5cdFx0QGhlaWdodCA9IDIwXG5cdFx0XG5cdFx0Y2xhc3NpY0xlZnRDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBAaGVpZ2h0LCB4OiBBbGlnbi5sZWZ0XG5cdFx0XHRpbWFnZTogZGV2aWNlX2Fzc2V0cy5vbGRTdGF0dXNCYXJMZWZ0SW1hZ2VbQHRoZW1lXVxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiA1NCwgaGVpZ2h0OiAxNiwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGNvbG9yOiBkZXZpY2VfYXNzZXRzLmNvbG9yW0B0aGVtZV0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBAaGVpZ2h0LCB4OiBBbGlnbi5yaWdodFxuXHRcdFx0aW1hZ2U6IGRldmljZV9hc3NldHMub2xkU3RhdHVzQmFyUmlnaHRJbWFnZVtAdGhlbWVdXG5cdFx0XG5cdFxuXHRjcmVhdGVOb3RjaFN0YXR1c0JhcjogKCkgPT5cblx0XHRAaGVpZ2h0ID0gNDRcblx0XHRcblx0XHRub3RjaExlZnRDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiA1NCwgaGVpZ2h0OiAyMSwgeDogQWxpZ24ubGVmdCgyMSksIHk6IEFsaWduLnRvcCgxMilcblx0XHRcdGNvbG9yOiBkZXZpY2VfYXNzZXRzLmNvbG9yW0B0aGVtZV0sIGJhY2tncm91bmRDb2xvcjogbnVsbCwgbGV0dGVyU3BhY2luZzogLTAuMTdcblx0XHRcdGZvbnRTaXplOiAxNSwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdG5vdGNoQ2VudGVyQ29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiAzNzUsIGhlaWdodDogQGhlaWdodCwgeDogQWxpZ24uY2VudGVyXG5cdFx0XHRpbWFnZTogZGV2aWNlX2Fzc2V0cy5ub3RjaFxuXHRcdFxuXHRcdG5vdGNoUmlnaHRDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBAaGVpZ2h0LCB4OiBBbGlnbi5yaWdodFxuXHRcdFx0aW1hZ2U6IGRldmljZV9hc3NldHMuc3RhdHVzQmFyUmlnaHRJbWFnZVtAdGhlbWVdXG5cblxuXG5cbmRldmljZV9hc3NldHMgPVxuXHRjb2xvcjpcblx0XHRkYXJrOiBcIiMwMDBcIlxuXHRcdGxpZ2h0OiBcIiNGRkZcIlxuXHRcblx0c3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyTGVmdEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0YW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvYW5kcm9pZFN0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0XG5cblxuXHRub3RjaDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX25vdGNoLnBuZ1wiXG5cdHRpcDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvdGlwLnBuZ1wiIiwiXG5jbGFzcyBUZXh0IGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdCMgZm9udEZhbWlseTogZm9udEF2ZXJpYVxuXHRcdFx0Zm9udFNpemU6IDE4XG5cdFx0XHR3ZWlnaHQ6IDcwMFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0aGVpZ2h0OiAyMFxuXHRcdFx0bGV0dGVyU3BhY2luZzogMC43XG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiAwLjRcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHN0eWxlID1cblx0XHRcdFwiZm9udC1mYW1pbHlcIjogXCInU0YgUHJvIFRleHQnLCAnUFQgU2FucycsICdIZWx2ZXRpY2EnLCAnVGFob21hJywgc2Fucy1zZXJpZjtcIlxuXHRcdFx0XCJmb250LXdlaWdodFwiOiA3MDBcblx0XHRcdFwiLXdlYmtpdC1mb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcdFwiLW1vei1mb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcdFwiLW1zLWZvbnQtZmVhdHVyZS1zZXR0aW5nc1wiOiBcIidzczAyJyBvbiwgJ3NzMDYnIG9uLCAnc3MwOScgb24sICdzczExJyBvbjtcIlxuXHRcdFx0XCJmb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcblxuXG5cbmNsYXNzIFRleHRCdXR0b24gZXh0ZW5kcyBUZXh0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHR1cGxlOiB7IG5vcm1hbDogMC41LCBob3ZlcjogMC44IH1cblx0XHRcdGhhbmRsZXI6IG51bGxcblxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QHN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdFxuXHRcdEAub25Nb3VzZU92ZXIgQEhvdmVyXG5cdFx0QC5vbk1vdXNlT3V0IEBIb3Zlck9mZlxuXG5cdFx0QHVwZGF0ZVR1cGxlKEB0dXBsZSlcblx0XG5cdFxuXHRcdFxuXHRIb3ZlcjogPT5cblx0XHRAb3BhY2l0eSA9IEB0dXBsZS5ob3ZlclxuXHRIb3Zlck9mZjogPT5cblx0XHRAb3BhY2l0eSA9IEB0dXBsZS5ub3JtYWxcblx0XG5cdHVwZGF0ZVR1cGxlOiAobmV3VHVwbGUpID0+XG5cdFx0QHR1cGxlID0gbmV3VHVwbGVcblx0XHRAZW1pdCBFdmVudHMuTW91c2VPdmVyXG5cdFx0QGVtaXQgRXZlbnRzLk1vdXNlT3V0XG5cdFxuXHRcblx0QGRlZmluZSAnaGFuZGxlcicsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvbihFdmVudHMuVGFwLCB2YWx1ZSlcblx0XG5cdEBkZWZpbmUgJ3R1cGxlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnR1cGxlXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy50dXBsZSA9IHZhbHVlXG5cblxuXG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBUZXh0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGhhbmRsZXI6IG51bGxcblx0XHRcdGhlaWdodDogMzIsIGJvcmRlclJhZGl1czogOFxuXHRcdFx0cGFkZGluZzogeyB0b3A6IDYsIGJvdHRvbTogNywgbGVmdDogOSwgcmlnaHQ6IDkgfVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMC43KVwiXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAc2hvd0hpbnQgPSAtPiA7XG5cdFx0QHN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdFxuXHRcdEAub25Nb3VzZU92ZXIgQEhvdmVyXG5cdFx0QC5vbk1vdXNlT3V0IEBIb3Zlck9mZlxuXHRcdFxuXHRIb3ZlcjogPT5cblx0XHRAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuNClcIlxuXHRIb3Zlck9mZjogPT5cblx0XHRAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuNylcIlxuXHRcblx0QGRlZmluZSAnaGFuZGxlcicsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvbihFdmVudHMuVGFwLCB2YWx1ZSlcblxuXG5jbGFzcyBCdXR0b25UYWIgZXh0ZW5kcyBCdXR0b25cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0c2VsZWN0ZWQ6IHRydWVcblx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRIb3ZlcjogPT5cblx0XHRAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuNClcIlxuXHRIb3Zlck9mZjogPT5cblx0XHRpZiBAc2VsZWN0ZWQgdGhlbiBAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuNylcIlxuXHRcdGVsc2UgQGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjIpXCJcblxuXHRAZGVmaW5lICdzZWxlY3RlZCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zZWxlY3RlZFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuc2VsZWN0ZWQgPSB2YWx1ZVxuXHRcdFx0aWYgdmFsdWUgdGhlbiBAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuNylcIlxuXHRcdFx0ZWxzZSBAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuMilcIlxuXG5cbiMgQnV0dG9uOiBTVkdcblxuIyBjbGFzcyBTVkdCdXR0b24gZXh0ZW5kcyBUZXh0QnV0dG9uXG4jIFx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcbiMgXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG4jIFx0XHRcdHRleHQ6IFwiXCJcbiMgXHRcdFx0YXNzZXQ6IG51bGxcbiMgXHRcdFx0Y2xpcDogZmFsc2VcbiMgXHRcdFx0YXV0b1NpemU6IGZhbHNlXG5cdFx0XG4jIFx0XHRAc3ZnU2hhcGUgPSBuZXcgU1ZHTGF5ZXJcbiMgXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIm51bGxcIiwgbmFtZTogXCJzdmdTaGFwZVwiXG5cdFx0XG4jIFx0XHRzdXBlciBAb3B0aW9uc1xuIyBcdFx0QHN2Z1NoYXBlLnBhcmVudCA9IEBcbiMgXHRcdEB1cGRhdGVTVkdTaXplKClcblx0XG5cdFxuIyBcdEBkZWZpbmUgJ2Fzc2V0JyxcbiMgXHRcdGdldDogLT4gQG9wdGlvbnMuYXNzZXRcbiMgXHRcdHNldDogKHZhbHVlKSAtPlxuIyBcdFx0XHRAb3B0aW9ucy5hc3NldCA9IHZhbHVlXG4jIFx0XHRcdEBzdmdTaGFwZS5zdGF0ZXMgPVxuIyBcdFx0XHRcdFwib25EYXJrXCI6IHsgc3ZnOiB2YWx1ZS5vbkRhcmsgfVxuIyBcdFx0XHRcdFwib25MaWdodFwiOiB7IHN2ZzogdmFsdWUub25MaWdodCB9XG4jIFx0XHRcdEBzdmdTaGFwZS5zdGF0ZVN3aXRjaChcIm9uRGFya1wiKVxuXHRcbiMgXHR1cGRhdGVTVkdTaXplOiAoKSA9PlxuIyBcdFx0QHN2Z1NoYXBlLndpZHRoID0gQHdpZHRoXG4jIFx0XHRAc3ZnU2hhcGUuaGVpZ2h0ID0gQGhlaWdodFxuXHRcblxuXG5cblxuIyBCdXR0b246IENvcHlcblxuIyBjbGFzcyBDb3B5QnV0dG9uIGV4dGVuZHMgVGV4dEJ1dHRvblxuIyBcdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG4jIFx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuIyBcdFx0XHRsaW5rOiBcImh0dHBzOi8vdGlsbGx1ci5jb21cIlxuIyBcdFx0XHRoYW5kbGVyOiBAY29weUhhbmRsZXJcblx0XHRcbiMgXHRcdEBhcmVhID0gbmV3IExheWVyXG4jIFx0XHRcdG9wYWNpdHk6IDAsIHg6IC0zMDAwLCBodG1sOiBudWxsXG5cdFx0XG4jIFx0XHRzdXBlciBAb3B0aW9uc1xuIyBcdFx0QGFyZWEucGFyZW50ID0gQFxuXHRcblx0XG4jIFx0QGRlZmluZSAnbGluaycsXG4jIFx0XHRnZXQ6IC0+IEBvcHRpb25zLmxpbmtcbiMgXHRcdHNldDogKHZhbHVlKSAtPlxuIyBcdFx0XHRAb3B0aW9ucy5saW5rID0gdmFsdWVcbiMgXHRcdFx0QHVwZGF0ZSh2YWx1ZSlcblx0XG5cdFxuIyBcdHVwZGF0ZTogKGxpbmspID0+XG4jIFx0XHRAYXJlYS5odG1sID0gXCI8dGV4dGFyZWEgY2xhc3M9J2pzLWNvcHl0ZXh0YXJlYS1jbGFzcycgc3R5bGU9J29wYWNpdHk6MDsnPiN7bGlua308L3RleHRhcmVhPlwiXG5cdFxuXHRcbiMgXHRjb3B5SGFuZGxlcjogPT5cbiMgXHRcdHRleHREaXYgPSBAYXJlYS5xdWVyeVNlbGVjdG9yKCcuanMtY29weXRleHRhcmVhLWNsYXNzJylcbiMgXHRcdHRleHREaXYuZm9jdXMoKVxuIyBcdFx0dGV4dERpdi5zZWxlY3QoKVxuIyBcdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQgJ2NvcHknXG5cdFx0XG4jIFx0XHRvcmlnaW5UaXRsZSA9IEB0ZXh0XG4jIFx0XHRAdGV4dCA9IFwiRG9uZSDwn5GMXCJcbiMgXHRcdFV0aWxzLmRlbGF5IDEsID0+IEB0ZXh0ID0gb3JpZ2luVGl0bGVcblxuXG5cblxuIyAjICMgQnV0dG9uOiBDb3B5XG5cbiMgIyBjbGFzcyBMaW5rQnV0dG9uIGV4dGVuZHMgU1ZHQnV0dG9uXG4jICMgXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuIyAjIFx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuIyAjIFx0XHRcdGxpbms6IFwiaHR0cHM6Ly90aWxsbHVyLmNvbVwiXG4jICMgXHRcdFx0Ym9yZGVyV2lkdGg6IDEgKiAyXG4jICMgXHRcdFx0Ym9yZGVyUmFkaXVzOiAyMCAqIDJcbiMgIyBcdFx0XHR0dXBsZTogeyBub3JtYWw6IDEuMCwgaG92ZXI6IDAuOCB9XG5cdFx0XHRcblx0XHRcbiMgIyBcdFx0QHRpbnRCdXR0b25GaXggPSBuZXcgTGF5ZXJcbiMgIyBcdFx0XHRoZWlnaHQ6IDEyMCAqIDJcbiMgIyBcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcbiMgIyBcdFx0QGJ1dHRvblRleHQgPSBuZXcgVGV4dFxuIyAjIFx0XHRcdGZvbnRTaXplOiAzMiAqIDJcbiMgIyBcdFx0XHR0ZXh0QWxpZ246IFwicmlnaHRcIlxuIyAjIFx0XHRcdGhlaWdodDogNjAgKiAyXG5cdFx0XG4jICMgXHRcdEBidXR0b25JY29uID0gbmV3IFNWR0xheWVyXG4jICMgXHRcdFx0d2lkdGg6IDI0ICogMiwgaGVpZ2h0OiAyNCAqIDJcbiMgIyBcdFx0XHRzdmc6IFNWRy5vcGVuSWNvbi5vbkxpZ2h0XG4jICMgXHRcdFx0b3BhY2l0eTogMC42XG5cdFx0XHRcblxuXHRcdFxuIyAjIFx0XHRzdXBlciBAb3B0aW9uc1xuXG4jICMgXHRcdEBidXR0b25UZXh0LnRleHQgPSBAdGV4dFxuIyAjIFx0XHRAdGV4dCA9IFwiXCJcblxuIyAjIFx0XHRAdGludEJ1dHRvbkZpeC5wYXJlbnQgPSBAcGFyZW50XG4jICMgXHRcdEB0aW50QnV0dG9uRml4LnggPSBBbGlnbi5yaWdodFxuIyAjIFx0XHRAdGludEJ1dHRvbkZpeC55ID0gQWxpZ24udG9wXG5cdFx0XG4jICMgXHRcdEBwYXJlbnQgPSBAdGludEJ1dHRvbkZpeFxuIyAjIFx0XHRAeSA9IEFsaWduLnRvcCgzMCAqIDIpXG4jICMgXHRcdEBoZWlnaHQgPSA2MCAqIDJcblxuIyAjIFx0XHRAYnV0dG9uVGV4dC5wYXJlbnQgPSBAXG4jICMgXHRcdEBidXR0b25UZXh0LnggPSAxNiAqIDJcbiMgIyBcdFx0QGJ1dHRvblRleHQueSA9IDkgKiAyXG5cbiMgIyBcdFx0QGJ1dHRvbkljb24ucGFyZW50ID0gQFxuIyAjIFx0XHRAYnV0dG9uSWNvbi54ID0gMTYgKiAyICsgQGJ1dHRvblRleHQud2lkdGggKyAxNiAqIDJcbiMgIyBcdFx0QGJ1dHRvbkljb24ueSA9IEFsaWduLmNlbnRlcigzICogMilcblxuIyAjIFx0XHRAd2lkdGggPSAxNiAqIDIgKyBAYnV0dG9uVGV4dC53aWR0aCArIEBidXR0b25JY29uLndpZHRoICsgMTYgKiAyICsgMTYgKiAyXG4jICMgXHRcdEB0aW50QnV0dG9uRml4LndpZHRoID0gQHdpZHRoICsgMzAgKiAyICsgMTYgKiAyXG5cbiMgIyBcdFx0QHRpbnRCdXR0b25GaXgueCA9IEFsaWduLnJpZ2h0XG4jICMgXHRcdEB4ID0gQWxpZ24ucmlnaHQoLTMwICogMilcblx0XHRcblx0XG5cbiMgIyBcdEBkZWZpbmUgJ2xpbmsnLFxuIyAjIFx0XHRnZXQ6IC0+IEBvcHRpb25zLmxpbmtcbiMgIyBcdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmxpbmsgPSB2YWx1ZVxuXHRcbiMgIyBcdHNldENvbG9yOiAoY29sb3IgPSBudWxsKSA9PlxuIyAjIFx0XHRpZiBjb2xvciA9PSBudWxsIHRoZW4gcmV0dXJuXG4jICMgXHRcdEB0aW50QnV0dG9uRml4LmJhY2tncm91bmRDb2xvciA9IGNvbG9yXG5cdFxuXG5cblxuXG5cblxuXG5cbiMgY2xhc3MgUHJldmlld0J1dHRvbiBleHRlbmRzIFRleHRcbiMgXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG4jIFx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuIyBcdFx0XHR0dXBsZTogeyBub3JtYWw6IDEuMCwgaG92ZXI6IDAuOCB9XG5cdFx0XG4jIFx0XHRzdXBlciBAb3B0aW9uc1xuXG4jIFx0XHRAcmVtb3ZlQWxsTGlzdGVuZXJzKClcblxuIyBcdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcbiMgXHRcdEAub25Nb3VzZU91dCBASG92ZXJPZmZcblxuIyBcdEhvdmVyOiA9PlxuIyBcdFx0IyBAc2NhbGUgPSAxLjA1XG4jIFx0XHRAb3BhY2l0eSA9IDEuMFxuXHRcbiMgXHRIb3Zlck9mZjogPT5cbiMgXHRcdCMgQHNjYWxlID0gMS4wXG4jIFx0XHRAb3BhY2l0eSA9IDAuOFxuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtUZXh0LCBUZXh0QnV0dG9uLCBCdXR0b24sIEJ1dHRvblRhYn1cblxuXG4iLCJcblxue1VJX1NlY3Rpb259ID0gcmVxdWlyZSBcIlVJX1NlY3Rpb25cIlxue1RleHQsIEJ1dHRvbn0gPSByZXF1aXJlIFwiVUlfQnV0dG9uc1wiXG5cbmNsYXNzIGV4cG9ydHMuVUlfQ29uZmlnIGV4dGVuZHMgVUlfU2VjdGlvblxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRoZWlnaHQ6IDEwMCwgeTogQWxpZ24uYm90dG9tKC04KVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRcdHZpZXc6IG51bGxcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QHVwZGF0ZUNvbmZpZ09uUmVzaXplKClcblxuXG5cdEBkZWZpbmUgJ3ZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy52aWV3ID0gdmFsdWVcblxuXG5cdHVwZGF0ZUNvbmZpZ09uUmVzaXplOiAoKSA9PlxuXHRcdGxvY2FsQ29uZmlnID0gQFxuXHRcdFxuXHRcdENhbnZhcy5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT4gbG9jYWxDb25maWcueSA9IEFsaWduLmJvdHRvbSgtOClcblxuXG5cblx0IyBPdmVycmlkZVxuXHRhZGRTZWN0aW9uOiAoYWN0aW9uQXJyYXkgPSBbXSkgPT5cblx0XHRzZWN0aW9uVmlldyA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR3aWR0aDogMzYwLCBoZWlnaHQ6IDEwMCwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR4OiAzMiwgeTogQWxpZ24uYm90dG9tKClcblxuXHRcdEBhZGRTZWN0aW9uVGl0bGUoc2VjdGlvblZpZXcsIFwiUHJldmlld1wiKVxuXHRcdHNlY3Rpb25WaWV3LnN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdHNlY3Rpb25WaWV3Lm9uVGFwIC0+IDtcblx0XHRzZWN0aW9uVmlldy5zaG93SGludCA9IC0+IDtcblxuXHRcdHN1bVggPSAwXG5cdFx0Zm9yIGFjdGlvbkl0ZW0sIGkgaW4gYWN0aW9uQXJyYXlcblx0XHRcdHNlY3Rpb25CdXR0b24gPSBAYWRkQWN0aW9uQnV0dG9uKGFjdGlvbkl0ZW0sIGkpXG5cdFx0XHRzZWN0aW9uQnV0dG9uLnBhcmVudCA9IHNlY3Rpb25WaWV3XG5cdFx0XHRzZWN0aW9uQnV0dG9uLnggPSBzdW1YXG5cdFx0XHRzdW1YICs9IHNlY3Rpb25CdXR0b24ud2lkdGggKyA4ICsgNFxuXHRcdFxuXHRcdEB3aWR0aCA9IE1hdGgubWF4KEB3aWR0aCwgc3VtWClcblx0XG5cblxuXHQjIE92ZXJyaWRlXG5cdGFkZEFjdGlvbkJ1dHRvbjogKGFjdGlvbkl0ZW0sIGluZGV4KSA9PlxuXHRcdGJ1dHRvbkxheWVyID0gbmV3IEJ1dHRvblxuXHRcdFx0dGV4dDogYWN0aW9uSXRlbS50aXRsZVxuXHRcdFx0eTogNDJcblx0XHRcdHNlbGVjdGVkOiBpZiBpbmRleCBpcyAwIHRoZW4gdHJ1ZSBlbHNlIGZhbHNlXG5cdFx0XHRjdXN0b206XG5cdFx0XHRcdGFjdGlvbkl0ZW06IGFjdGlvbkl0ZW1cblx0XHRcblx0XHRjb21wbGV4SGFuZGxlciA9ICgpIC0+XG5cdFx0XHRAY3VzdG9tLmFjdGlvbkl0ZW0uaGFuZGxlcihAY3VzdG9tLmFjdGlvbkl0ZW0uZGF0YSwgQClcblxuXHRcdGJ1dHRvbkxheWVyLm9uKEV2ZW50cy5UYXAsIGNvbXBsZXhIYW5kbGVyKVxuXHRcdHJldHVybiBidXR0b25MYXllciIsIlxuXG5cbntUZXh0LCBCdXR0b25UYWJ9ID0gcmVxdWlyZSBcIlVJX0J1dHRvbnNcIlxuXG5jbGFzcyBleHBvcnRzLlVJX1NlY3Rpb24gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR3aWR0aDogMjAwLCBoZWlnaHQ6IFNjcmVlbi5oZWlnaHQsIHk6IDEwMFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcblxuXHRhZGRTZWN0aW9uOiAodGl0bGUsIGFjdGlvbkFycmF5ID0gW10pID0+XG5cblx0XHRzZWN0aW9uVmlldyA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR3aWR0aDogMzYwLCBoZWlnaHQ6IDEwMCwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR4OiAzMiwgeTogQGNoaWxkcmVuLmxlbmd0aCAqIDEwMFxuXG5cdFx0QGFkZFNlY3Rpb25UaXRsZShzZWN0aW9uVmlldywgdGl0bGUpXG5cblx0XHRzZWN0aW9uVmlldy5zdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRzZWN0aW9uVmlldy5vblRhcCAtPiA7XG5cdFx0c2VjdGlvblZpZXcuc2hvd0hpbnQgPSAtPiA7XG5cblx0XHRzdW1YID0gMFxuXHRcdGZvciBhY3Rpb25JdGVtLCBpIGluIGFjdGlvbkFycmF5XG5cdFx0XHRzZWN0aW9uQnV0dG9uID0gQGFkZEFjdGlvbkJ1dHRvbihhY3Rpb25JdGVtLCBpKVxuXHRcdFx0c2VjdGlvbkJ1dHRvbi5wYXJlbnQgPSBzZWN0aW9uVmlld1xuXHRcdFx0c2VjdGlvbkJ1dHRvbi54ID0gc3VtWFxuXHRcdFx0c3VtWCArPSBzZWN0aW9uQnV0dG9uLndpZHRoICsgOFxuXHRcdFxuXHRcdEB3aWR0aCA9IE1hdGgubWF4KEB3aWR0aCwgc3VtWClcblxuXG5cblx0YWRkQWN0aW9uQnV0dG9uOiAoYWN0aW9uSXRlbSwgaW5kZXgpID0+XG5cdFx0YnV0dG9uTGF5ZXIgPSBuZXcgQnV0dG9uVGFiXG5cdFx0XHR0ZXh0OiBhY3Rpb25JdGVtLnRpdGxlXG5cdFx0XHR5OiA0MlxuXHRcdFx0c2VsZWN0ZWQ6IGlmIGluZGV4IGlzIDAgdGhlbiB0cnVlIGVsc2UgZmFsc2Vcblx0XHRcdGN1c3RvbTpcblx0XHRcdFx0YWN0aW9uSXRlbTogYWN0aW9uSXRlbVxuXHRcdFxuXHRcdGNvbXBsZXhIYW5kbGVyID0gKCkgLT5cblx0XHRcdEBjdXN0b20uYWN0aW9uSXRlbS5oYW5kbGVyKEBjdXN0b20uYWN0aW9uSXRlbS5kYXRhLCBAKVxuXHRcdFx0Zm9yIGJ1dHRvbiBpbiBAcGFyZW50LmNoaWxkcmVuXG5cdFx0XHRcdGlmIGJ1dHRvbi5uYW1lIGlzbnQgXCIuc2VjdGlvblRpdGxlXCJcblx0XHRcdFx0XHRidXR0b24uc2VsZWN0ZWQgPSB0cnVlIGlmIGJ1dHRvbiBpcyBAXG5cdFx0XHRcdFx0YnV0dG9uLnNlbGVjdGVkID0gZmFsc2UgaWYgYnV0dG9uIGlzbnQgQFxuXG5cdFx0YnV0dG9uTGF5ZXIub24oRXZlbnRzLlRhcCwgY29tcGxleEhhbmRsZXIpXG5cdFx0cmV0dXJuIGJ1dHRvbkxheWVyXG5cblxuXHRhZGRTZWN0aW9uVGl0bGU6IChsb2NhbFBhcmVudCwgdGl0bGUgPSBcIkhlYWRlciBUaXRsZVwiKSA9PlxuXHRcdG5ldyBUZXh0XG5cdFx0XHRwYXJlbnQ6IGxvY2FsUGFyZW50XG5cdFx0XHR0ZXh0OiB0aXRsZSwgbmFtZTogXCIuc2VjdGlvblRpdGxlXCJcblx0XHRcdGZvbnRTaXplOiAxNiwgb3BhY2l0eTogMC41LCBwYWRkaW5nOiB7IHRvcDogMTIgfVxuXG4iLCJcblxuIyB7U2VjdGlvblZpZXd9ID0gcmVxdWlyZSBcIlNlY3Rpb25WaWV3XCJcblxuXG5jbGFzcyBleHBvcnRzLlRyZWVMYXllclZpZXcgZXh0ZW5kcyBTZWN0aW9uVmlld1xuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0dHJlZVZpZXdMYXllciA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0XHRcdHdpZHRoOiAzMjBcblx0XHRcdGhlaWdodDogMFxuXHRcdFx0c2Nyb2xsVmVydGljYWw6IHRydWVcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRtb3VzZVdoZWVsRW5hYmxlZDogdHJ1ZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiMyMjJcIlxuXHRcdFxuXHRcdHRyZWVWaWV3TGF5ZXIuY29udGVudC5oZWlnaHQgPSAwXG5cdFx0dHJlZVZpZXdMYXllci5tb3VzZVdoZWVsRW5hYmxlZCA9IHRydWVcblx0XHRcdFxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHRyZWVWaWV3OiB0cmVlVmlld0xheWVyXG5cdFx0XHRpbmRlbnQ6IDFcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0dHJlZVZpZXdMYXllci5wYXJlbnQgPSBAcGFyZW50XG5cblx0XG5cdEBkZWZpbmUgJ3RyZWVWaWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRyZWVWaWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnRyZWVWaWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2luZGVudCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5pbmRlbnRcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuaW5kZW50ID0gdmFsdWVcblx0XG5cblxuXHRwcmludFRyZWU6ICgpID0+XG5cdFx0cHJpbnQgQHZpZXcuY2hpbGRyZW5cblx0XHRAcHJpbnROb2RlKEB2aWV3KVxuXHRcdEB0cmVlVmlldy5oZWlnaHQgPSBTY3JlZW4uaGVpZ2h0XG5cdFx0QHRyZWVWaWV3LnVwZGF0ZUNvbnRlbnQoKVxuXHRcblxuXHRwcmludE5vZGU6IChub2RlLCBsZXZlbCA9IDApID0+XG5cdFx0aWYgbm9kZS5uYW1lID09IFwiXCIgdGhlbiBsYXllck5hbWUgPSBcIlVudGl0bGVkXCIgZWxzZSBsYXllck5hbWUgPSBub2RlLm5hbWVcblx0XHQjIHByaW50IEFycmF5KGxldmVsICsgMSkuam9pbihcIiDjg7sgXCIpICsgXCIgI3tsYXllck5hbWV9XCJcblxuXHRcdHRyZWVOb2RlTGF5ZXIgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEB0cmVlVmlldy5jb250ZW50XG5cdFx0XHR0ZXh0OiBBcnJheShsZXZlbCArIDEpLmpvaW4oXCIg44O7IFwiKSArIFwiICN7bGF5ZXJOYW1lfVwiXG5cdFx0XHRcblx0XHRcdGZvbnRTaXplOiAxNVxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cblx0XHRcdG9wYWNpdHk6IGlmIGxheWVyTmFtZSA9PSBcIlVudGl0bGVkXCIgdGhlbiAwLjUgZWxzZSAxXG5cdFx0XHRoZWlnaHQ6IDI4XG5cdFx0XHR5OiBAdHJlZVZpZXcuaGVpZ2h0XG5cdFx0XHQjIGJhY2tncm91bmRDb2xvcjogVXRpbHMucmFuZG9tQ29sb3IoKVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRjdXN0b206XG5cdFx0XHRcdGxheWVyOiBub2RlXG5cdFx0XG5cdFx0dHJlZU5vZGVMYXllci5vblRhcCAtPlxuXHRcdFx0cHJpbnQgXCIje0BjdXN0b20ubGF5ZXIubmFtZX0geDogI3tAY3VzdG9tLmxheWVyLnh9IHk6ICN7QGN1c3RvbS5sYXllci55fSBzaXplOiAje0BjdXN0b20ubGF5ZXIud2lkdGh9eCN7QGN1c3RvbS5sYXllci5oZWlnaHR9XCJcblxuXHRcdFxuXHRcdEB0cmVlVmlldy5oZWlnaHQgKz0gMjhcblxuXG5cdFx0aWYgbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwXG5cdFx0XHRuZXh0TGV2ZWwgPSBsZXZlbCArIDFcblx0XHRcdGZvciBjaGlsZE5vZGUgaW4gbm9kZS5jaGlsZHJlblxuXHRcdFx0XHRAcHJpbnROb2RlKGNoaWxkTm9kZSwgbmV4dExldmVsKVxuXHRcdFxuIl19
