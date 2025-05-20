require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({"Buttons":[function(require,module,exports){
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.Button = (function(superClass) {
  extend(Button, superClass);

  function Button(options) {
    var guard, savedOptions;
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
    savedOptions = {
      x: this.options.x,
      y: this.options.y
    };
    this.options.x = null;
    this.options.y = null;
    Button.__super__.constructor.call(this, this.options);
    if (savedOptions.x) {
      this.x = savedOptions.x;
    }
    if (savedOptions.y) {
      this.y = savedOptions.y;
    }
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
    get: function() {
      return this.options.handler;
    },
    set: function(value) {
      return this.on(Events.Tap, Utils.throttle(0.2, value));
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


},{}],"LogView":[function(require,module,exports){
var LogView,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

LogView = (function(superClass) {
  extend(LogView, superClass);

  function LogView(options) {
    this.options = options != null ? options : {};
    this.printNode = bind(this.printNode, this);
    _.defaults(this.options, {
      node: null
    });
    LogView.__super__.constructor.call(this, this.options);
    if (this.node) {
      this.printNode(this.node);
    }
  }

  LogView.define('node', {
    get: function() {
      return this.options.node;
    },
    set: function(value) {
      return this.options.node = value;
    }
  });

  LogView.prototype.printNode = function(node, level) {
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
      parent: this.content,
      text: Array(level + 1).join(" ・ ") + (node.name + ": " + node.width + "x" + node.height),
      fontSize: 15,
      fontWeight: 500,
      color: "white",
      opacity: layerName === "Untitled" ? 0.5 : 1,
      height: 28,
      y: this.height,
      backgroundColor: null,
      custom: {
        layer: node
      }
    });
    this.height += 28;
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

  return LogView;

})(ScrollComponent);

module.exports = {
  LogView: LogView
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
    var child, i, len, ref;
    this.options = options != null ? options : {};
    _.defaults(this.options, FlowView.__super__.constructor.call(this, this.options));
    if (this.parent) {
      this.width = this.parent.width;
      this.height = this.parent.height;
      ref = this.children;
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        child.width = this.parent.width;
        child.height = this.parent.height;
      }
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

  FlowView.prototype.appTransition = function(nav, layerA, layerB, overlay) {
    var transition;
    return transition = {
      layerA: {
        show: {
          x: 0,
          y: 0,
          scale: 1
        },
        hide: {
          x: 0 - (layerA != null ? layerA.width : void 0),
          y: 0,
          scale: 0.8
        }
      },
      layerB: {
        show: {
          x: 0,
          y: 0,
          scale: 1
        },
        hide: {
          x: layerB.width,
          y: 0,
          scale: 0.8
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
    this.create_Buttons = bind(this.create_Buttons, this);
    this.create_BackButton = bind(this.create_BackButton, this);
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
      backButton: null,
      showBack: false,
      wrapper: navigationView_Wrapper,
      scrollVertical: true,
      scrollHorizontal: false,
      directionLock: true,
      buttons: {},
      custom: {
        backButton_name: "Back_Button",
        buttonLayers: []
      }
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
    try {
      this.backButton.bringToFront();
    } catch (error) {}
    this.on("change:children", function() {
      var button, i, len, ref, results;
      try {
        this.backButton.bringToFront();
      } catch (error) {}
      try {
        ref = this.custom.buttonLayers;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          button = ref[i];
          results.push(button.bringToFront());
        }
        return results;
      } catch (error) {}
    });
    this.create_Buttons();
  }

  ModalView.define('buttons', {
    get: function() {
      return this.options.buttons;
    },
    set: function(value) {
      return this.options.buttons = value;
    }
  });

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

  ModalView.define('backButton', {
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

  ModalView.define('showBack', {
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

  ModalView.prototype.create_BackButton = function() {
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

  ModalView.prototype.create_Buttons = function() {
    var button, buttonName, buttonOptions, buttonOptions2, buttonParent, results;
    results = [];
    for (buttonName in this.buttons) {
      buttonOptions = this.buttons[buttonName];
      if (buttonOptions.fixed) {
        buttonParent = this;
      } else {
        buttonParent = this.content;
      }
      buttonOptions2 = _.extend({}, buttonOptions, {
        parent: buttonParent
      });
      button = new Button(buttonOptions2);
      results.push(this.custom.buttonLayers.push(button));
    }
    return results;
  };

  return ModalView;

})(ScrollComponent);

NavigationView = (function(superClass) {
  extend(NavigationView, superClass);

  function NavigationView(options) {
    this.options = options != null ? options : {};
    this.create_Buttons = bind(this.create_Buttons, this);
    this.create_BackButton = bind(this.create_BackButton, this);
    _.defaults(this.options, {
      flow: null,
      backButton: null,
      showBack: true,
      preventBackSwipe: false,
      scrollVertical: true,
      scrollHorizontal: false,
      directionLock: true,
      buttons: {},
      custom: {
        backButton_name: "Back_Button",
        customAction_Array: [],
        buttonLayers: []
      }
    });
    NavigationView.__super__.constructor.call(this, this.options);
    this.content.width = this.width;
    this.content.height = this.height;
    if (this.preventBackSwipe === false) {
      this.on(Events.SwipeRightStart, (function(_this) {
        return function(event, layer) {
          try {
            return _this.flow.showPrevious();
          } catch (error) {}
        };
      })(this));
    }
    try {
      this.backButton.bringToFront();
    } catch (error) {}
    this.on("change:children", function() {
      var button, i, len, ref, results;
      try {
        this.backButton.bringToFront();
      } catch (error) {}
      try {
        ref = this.custom.buttonLayers;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          button = ref[i];
          results.push(button.bringToFront());
        }
        return results;
      } catch (error) {}
    });
    this.create_Buttons();
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

  NavigationView.define('preventBackSwipe', {
    get: function() {
      return this.options.preventBackSwipe;
    },
    set: function(value) {
      return this.options.preventBackSwipe = value;
    }
  });

  NavigationView.define('buttons', {
    get: function() {
      return this.options.buttons;
    },
    set: function(value) {
      return this.options.buttons = value;
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

  NavigationView.prototype.create_Buttons = function() {
    var button, buttonName, buttonOptions, buttonOptions2, buttonParent, results;
    results = [];
    for (buttonName in this.buttons) {
      buttonOptions = this.buttons[buttonName];
      if (buttonOptions.fixed) {
        buttonParent = this;
      } else {
        buttonParent = this.content;
      }
      buttonOptions2 = _.extend({}, buttonOptions, {
        parent: buttonParent
      });
      button = new Button(buttonOptions2);
      results.push(this.custom.buttonLayers.push(button));
    }
    return results;
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
var FixPreviewExport, LogView, Preview_UI,
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

LogView = require("LogView").LogView;

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


},{"LogView":"LogView","Preview_UI":"Preview_UI"}],"Preview_Class":[function(require,module,exports){
var overrideTimeValue,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

overrideTimeValue = "20:25";

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
      showHints: true,
      scaleState: "fill",
      scaleGap: 56
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

  Preview_Class.define('scaleGap', {
    get: function() {
      return this.options.scaleGap;
    },
    set: function(value) {
      return this.options.scaleGap = value;
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
    if (this.showHints) {
      Framer.Extras.Hints.enable();
    } else {
      Framer.Extras.Hints.disable();
    }
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
    scaleX = (Screen.width - this.scaleGap * 2) / this.width;
    scaleY = (Screen.height - this.scaleGap * 2) / this.height;
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


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDI1LTA1LTIxIFtwbGF0Zm9ybV0gUHJvamVjdCDigJQgVGl0bGUgODM4LmZyYW1lci9tb2R1bGVzL0J1dHRvbnMuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyNS0wNS0yMSBbcGxhdGZvcm1dIFByb2plY3Qg4oCUIFRpdGxlIDgzOC5mcmFtZXIvbW9kdWxlcy9EZXZpY2VfQ2xhc3MuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyNS0wNS0yMSBbcGxhdGZvcm1dIFByb2plY3Qg4oCUIFRpdGxlIDgzOC5mcmFtZXIvbW9kdWxlcy9Ib21lQmFyX0NsYXNzLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjUtMDUtMjEgW3BsYXRmb3JtXSBQcm9qZWN0IOKAlCBUaXRsZSA4MzguZnJhbWVyL21vZHVsZXMvTG9nVmlldy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDI1LTA1LTIxIFtwbGF0Zm9ybV0gUHJvamVjdCDigJQgVGl0bGUgODM4LmZyYW1lci9tb2R1bGVzL0xvZ28uY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyNS0wNS0yMSBbcGxhdGZvcm1dIFByb2plY3Qg4oCUIFRpdGxlIDgzOC5mcmFtZXIvbW9kdWxlcy9OYXZpZ2F0aW9uQ29tcG9uZW50LmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjUtMDUtMjEgW3BsYXRmb3JtXSBQcm9qZWN0IOKAlCBUaXRsZSA4MzguZnJhbWVyL21vZHVsZXMvUHJldmlld0NvbXBvbmVudC5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDI1LTA1LTIxIFtwbGF0Zm9ybV0gUHJvamVjdCDigJQgVGl0bGUgODM4LmZyYW1lci9tb2R1bGVzL1ByZXZpZXdfQ2xhc3MuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyNS0wNS0yMSBbcGxhdGZvcm1dIFByb2plY3Qg4oCUIFRpdGxlIDgzOC5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3X0luaXQuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyNS0wNS0yMSBbcGxhdGZvcm1dIFByb2plY3Qg4oCUIFRpdGxlIDgzOC5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3X1VJLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjUtMDUtMjEgW3BsYXRmb3JtXSBQcm9qZWN0IOKAlCBUaXRsZSA4MzguZnJhbWVyL21vZHVsZXMvU3RhdHVzQmFyX0NsYXNzLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjUtMDUtMjEgW3BsYXRmb3JtXSBQcm9qZWN0IOKAlCBUaXRsZSA4MzguZnJhbWVyL21vZHVsZXMvVUlfQnV0dG9ucy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDI1LTA1LTIxIFtwbGF0Zm9ybV0gUHJvamVjdCDigJQgVGl0bGUgODM4LmZyYW1lci9tb2R1bGVzL1VJX0NvbmZpZy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDI1LTA1LTIxIFtwbGF0Zm9ybV0gUHJvamVjdCDigJQgVGl0bGUgODM4LmZyYW1lci9tb2R1bGVzL1VJX1NlY3Rpb24uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDRUEsSUFBQTs7OztBQUFNLE9BQU8sQ0FBQzs7O0VBQ0EsZ0JBQUMsT0FBRDtBQUVaLFFBQUE7SUFGYSxJQUFDLENBQUEsNEJBQUQsVUFBUzs7O0lBRXRCLEtBQUEsR0FBUSxJQUFJLEtBQUosQ0FBVTtNQUFFLElBQUEsRUFBTSxFQUFSO01BQVksZUFBQSxFQUFpQixNQUE3QjtLQUFWO0lBRVIsS0FBSyxDQUFDLE1BQU4sR0FDQztNQUFBLFNBQUEsRUFBVztRQUFFLE9BQUEsRUFBUyxDQUFYO09BQVg7TUFDQSxRQUFBLEVBQVU7UUFBRSxP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LElBQTJCLE1BQUEsS0FBWSxJQUF2Qzt5QkFBQSxNQUFNLENBQUMsUUFBUCxHQUFrQixPQUFsQjtXQUFBLE1BQUE7aUNBQUE7V0FGRDtTQUFBLE1BQUE7K0JBQUE7O0FBREQ7O0lBRmdCO0lBT2pCLFdBQVcsQ0FBQyxFQUFaLENBQWUsTUFBTSxDQUFDLEdBQXRCLEVBQTJCLGNBQTNCO0FBQ0EsV0FBTztFQWhCUzs7dUJBbUJqQixlQUFBLEdBQWlCLFNBQUMsV0FBRCxFQUFjLEtBQWQ7O01BQWMsUUFBUTs7V0FDdEMsSUFBSSxJQUFKLENBQ0M7TUFBQSxNQUFBLEVBQVEsV0FBUjtNQUNBLElBQUEsRUFBTSxLQUROO01BQ2EsSUFBQSxFQUFNLGVBRG5CO01BRUEsUUFBQSxFQUFVLEVBRlY7TUFFYyxPQUFBLEVBQVMsR0FGdkI7TUFFNEIsT0FBQSxFQUFTO1FBQUUsR0FBQSxFQUFLLEVBQVA7T0FGckM7S0FERDtFQURnQjs7OztHQXJEZSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlxuXG5jbGFzcyBleHBvcnRzLkJ1dHRvbiBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRndWFyZCA9IG5ldyBMYXllciB7IHNpemU6IDEwLCBiYWNrZ3JvdW5kQ29sb3I6IFwibnVsbFwiIH1cblx0XHRcblx0XHRndWFyZC5zdGF0ZXMgPVxuXHRcdFx0XCJwcmVzc2VkXCI6IHsgb3BhY2l0eTogMCB9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IG9wYWNpdHk6IDAgfVxuXHRcdFxuXHRcdGd1YXJkLm9uIEV2ZW50cy5TdGF0ZVN3aXRjaEVuZCwgKGZyb20sIHRvKSAtPlxuXHRcdFx0aWYgZnJvbSAhPSB0byB0aGVuIEBwYXJlbnQuYW5pbWF0ZSh0bylcblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cdFx0XHRndWFyZDogbnVsbFxuXHRcdFx0c2NhbGVUbzogMC45XG5cblx0XHRzYXZlZE9wdGlvbnMgPVxuXHRcdFx0eDogQG9wdGlvbnMueFxuXHRcdFx0eTogQG9wdGlvbnMueVxuXG5cdFx0QG9wdGlvbnMueCA9IG51bGxcblx0XHRAb3B0aW9ucy55ID0gbnVsbFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRpZiBzYXZlZE9wdGlvbnMueCB0aGVuIEB4ID0gc2F2ZWRPcHRpb25zLnhcblx0XHRpZiBzYXZlZE9wdGlvbnMueSB0aGVuIEB5ID0gc2F2ZWRPcHRpb25zLnlcblxuXHRcdEBzdGF0ZXMgPVxuXHRcdFx0XCJwcmVzc2VkXCI6IHsgc2NhbGU6IEBzY2FsZVRvIH1cblx0XHRcdFwibm9ybWFsXCI6IHsgc2NhbGU6IDEuMCB9XG5cdFx0XG5cdFx0Z3VhcmQucGFyZW50ID0gQFxuXHRcdEBndWFyZCA9IGd1YXJkXG5cdFx0XG5cdFx0QC5vblRvdWNoU3RhcnQgQEhvdmVyXG5cdFx0QC5vblRvdWNoRW5kIEBIb3Zlck9mZlxuXHRcdEAub25Td2lwZVN0YXJ0IEBIb3Zlck9mZlxuXHRcdEAub25EcmFnU3RhcnQgQEhvdmVyT2ZmXG5cdFxuXHRIb3ZlcjogPT4gQGd1YXJkLnN0YXRlU3dpdGNoKFwicHJlc3NlZFwiKVxuXHRIb3Zlck9mZjogPT4gQGd1YXJkLnN0YXRlU3dpdGNoKFwibm9ybWFsXCIpXG5cblxuXG5cdEBkZWZpbmUgJ2d1YXJkJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmd1YXJkXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmd1YXJkID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3NjYWxlVG8nLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2NhbGVUb1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zY2FsZVRvID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2hhbmRsZXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaGFuZGxlclxuXHRcdHNldDogKHZhbHVlKSAtPiBcblx0XHRcdEBvbiBFdmVudHMuVGFwLCBVdGlscy50aHJvdHRsZSgwLjIsIHZhbHVlKVxuXHQiLCJcbmNsYXNzIGV4cG9ydHMuRGV2aWNlX0NsYXNzIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiMDAwXCJcblx0XHRcdHZpZXc6IG51bGxcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHQjIHVwZGF0ZSBmcm9tIHBhcmVudFxuXHRcdEBzdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBzY2FsZTogMSB9XG5cdFx0XHRcImZpbGxcIjogeyBzY2FsZTogMSB9XG5cblx0XHRAaW5pdEJvcmRlclZpZXdDc3MoKVxuXHRcdEBzZW5kVG9CYWNrKClcblx0XG5cblxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnZpZXcgPSB2YWx1ZVxuXHRcdFx0QG9wdGlvbnMud2lkdGggPSB2YWx1ZS53aWR0aCArIDE2ICogMlxuXHRcdFx0QG9wdGlvbnMuaGVpZ2h0ID0gdmFsdWUuaGVpZ2h0ICsgMTYgKiAyXG5cdFx0XHRAYm9yZGVyUmFkaXVzID0gdmFsdWUuYm9yZGVyUmFkaXVzICsgMTZcblxuXHRzdGF0ZVN3aXRjaFRvTm9ybWFsOiAoKSA9PlxuXHRcdEBhbmltYXRlKHNjYWxlOiBAc3RhdGVzW1wibm9ybWFsXCJdLnNjYWxlLCBvcHRpb25zOiB7IGN1cnZlOiBCZXppZXIubGluZWFyLCB0aW1lOiAwIH0pXG5cdFxuXHRzdGF0ZVN3aXRjaFRvRmlsbDogKCkgPT5cblx0XHRAYW5pbWF0ZShzY2FsZTogQHN0YXRlc1tcImZpbGxcIl0uc2NhbGUsIG9wdGlvbnM6IHsgY3VydmU6IEJlemllci5saW5lYXIsIHRpbWU6IDAgfSlcblxuXHRhbmltYXRlU3RhdGVUb05vcm1hbDogKCkgPT5cblx0XHRAYW5pbWF0ZShzY2FsZTogQHN0YXRlc1tcIm5vcm1hbFwiXS5zY2FsZSwgb3B0aW9uczogeyBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUgfSlcblx0XG5cdGFuaW1hdGVTdGF0ZVRvRmlsbDogKCkgPT5cblx0XHRAYW5pbWF0ZShzY2FsZTogQHN0YXRlc1tcImZpbGxcIl0uc2NhbGUsIG9wdGlvbnM6IHsgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41IH0pXG5cblxuXG5cdGluaXRCb3JkZXJWaWV3Q3NzOiAoKSA9PlxuXHRcdEBjbGFzc0xpc3QuYWRkKFwiaXBob25lLXRpbGxsdXItdlwiKVxuIFxuXHRcdGNzcyA9IFwiXCJcIlxuXHRcdC5pcGhvbmUtdGlsbGx1ci12IHtcblx0XHRcdGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcblx0XHRcdDE2MC43NGRlZyxcblx0XHRcdHJnYmEoMzYsIDM2LCAzNiwgMC4zKSAyNC4zOSUsXG5cdFx0XHRyZ2JhKDI4LCAyOCwgMjgsIDAuMykgMjkuNDclLFxuXHRcdFx0cmdiYSgxMCwgMTAsIDEwLCAwLjMpIDk5Ljg1JVxuXHRcdFx0KSxcblx0XHRcdGxpbmVhci1ncmFkaWVudChcblx0XHRcdDE4MGRlZyxcblx0XHRcdHJnYmEoMiwgMiwgMiwgMC42KSAtMC4yMSUsXG5cdFx0XHRyZ2JhKDIxLCAyMSwgMjEsIDAuNikgNi41MiUsXG5cdFx0XHRyZ2JhKDYsIDYsIDYsIDAuNikgOTkuNzklXG5cdFx0XHQpLFxuXHRcdFx0IzVhNWE1YTtcblx0XHRib3gtc2hhZG93OiA4cHggMTRweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4yNSksXG5cdFx0XHRpbnNldCAwcHggLTRweCAxNnB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSxcblx0XHRcdGluc2V0IDRweCAwcHggNHB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSxcblx0XHRcdGluc2V0IC00cHggMHB4IDRweCByZ2JhKDAsIDAsIDAsIDAuNyk7XG5cblx0XHR9XG5cdFx0XCJcIlwiXG5cdFx0XG5cdFx0VXRpbHMuaW5zZXJ0Q1NTKGNzcykiLCJcbmNsYXNzIGV4cG9ydHMuSG9tZUJhcl9DbGFzcyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0cGFyZW50OiBAdmlld1xuXHRcdFx0d2lkdGg6IEB2aWV3LndpZHRoXG5cdFx0XHRcblx0XHRcdHRoZW1lOiBAdmlldy5ob21lQmFyX3RoZW1lXG5cdFx0XHRcblx0XHRcdGhlaWdodDogMzQsIHk6IEFsaWduLmJvdHRvbSwgbmFtZTogXCIuaG9tZSBiYXJcIiwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBjcmVhdGUoKVxuXG5cblxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudmlldyA9IHZhbHVlXG5cblx0QGRlZmluZSAndGhlbWUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudGhlbWVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudGhlbWUgPSB2YWx1ZVxuXG5cblxuXHR2aWV3U2l6ZTogKHcsIGgpID0+IHJldHVybiBAdmlldy53aWR0aCA9PSB3IGFuZCBAdmlldy5oZWlnaHQgPT0gaFxuXG5cdGNyZWF0ZTogKCkgPT5cblx0XHRpZiBAdmlld1NpemUoMzc1LCA4MTIpIG9yIEB2aWV3U2l6ZSgzOTAsIDg0NCkgb3IgQHZpZXdTaXplKDQxNCwgODk2KSBvciBAdmlld1NpemUoNDI4LCA5MjYpIG9yIEB2aWV3U2l6ZSgzNjAsIDc4Mikgb3IgQHZpZXdTaXplKDM5MywgODUyKVxuXHRcdFx0QGNyZWF0ZUhvbWVJbmRpY2F0b3IoKVxuXHRcblx0XG5cdGNyZWF0ZUhvbWVJbmRpY2F0b3I6ICgpID0+XG5cdFx0bmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi5ob21lVmlld1wiXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiAxMzUsIGhlaWdodDogNSwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5ib3R0b20oLTgpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGRldmljZV9hc3NldHMuY29sb3JbQHRoZW1lXSwgYm9yZGVyUmFkaXVzOiAyMFxuXG5cblxuZGV2aWNlX2Fzc2V0cyA9XG5cdGNvbG9yOlxuXHRcdGRhcms6IFwiIzAwMFwiXG5cdFx0bGlnaHQ6IFwiI0ZGRlwiIiwiXG5cbmNsYXNzIExvZ1ZpZXcgZXh0ZW5kcyBTY3JvbGxDb21wb25lbnRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0bm9kZTogbnVsbFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRpZiBAbm9kZSB0aGVuIEBwcmludE5vZGUoQG5vZGUpXG5cdFxuXHRAZGVmaW5lICdub2RlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLm5vZGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMubm9kZSA9IHZhbHVlXG5cblx0cHJpbnROb2RlOiAobm9kZSwgbGV2ZWwgPSAwKSA9PlxuXHRcdGlmIG5vZGUubmFtZSA9PSBcIlwiIHRoZW4gbGF5ZXJOYW1lID0gXCJVbnRpdGxlZFwiIGVsc2UgbGF5ZXJOYW1lID0gbm9kZS5uYW1lXG5cdFx0IyBwcmludCBBcnJheShsZXZlbCArIDEpLmpvaW4oXCIg44O7IFwiKSArIFwiICN7bGF5ZXJOYW1lfVwiXG5cblx0XHR0cmVlTm9kZUxheWVyID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBAY29udGVudFxuXHRcdFx0dGV4dDogQXJyYXkobGV2ZWwgKyAxKS5qb2luKFwiIOODuyBcIikgK1xuXHRcdFx0XCIje25vZGUubmFtZX06ICN7bm9kZS53aWR0aH14I3tub2RlLmhlaWdodH1cIlxuXHRcdFx0IyBcIiAje2xheWVyTmFtZX1cIlxuXHRcdFx0XG5cdFx0XHRmb250U2l6ZTogMTVcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXG5cdFx0XHRvcGFjaXR5OiBpZiBsYXllck5hbWUgPT0gXCJVbnRpdGxlZFwiIHRoZW4gMC41IGVsc2UgMVxuXHRcdFx0aGVpZ2h0OiAyOFxuXHRcdFx0eTogQGhlaWdodFxuXHRcdFx0IyBiYWNrZ3JvdW5kQ29sb3I6IFV0aWxzLnJhbmRvbUNvbG9yKClcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRsYXllcjogbm9kZVxuXHRcdFxuXHRcdCMgdHJlZU5vZGVMYXllci5vblRhcCAtPlxuXHRcdFx0IyBwcmludCBcIiN7QGN1c3RvbS5sYXllci5uYW1lfSB4OiAje0BjdXN0b20ubGF5ZXIueH0geTogI3tAY3VzdG9tLmxheWVyLnl9IHNpemU6ICN7QGN1c3RvbS5sYXllci53aWR0aH14I3tAY3VzdG9tLmxheWVyLmhlaWdodH1cIlxuXG5cdFx0XG5cdFx0QGhlaWdodCArPSAyOFxuXG5cdFx0aWYgbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwXG5cdFx0XHRuZXh0TGV2ZWwgPSBsZXZlbCArIDFcblx0XHRcdGZvciBjaGlsZE5vZGUgaW4gbm9kZS5jaGlsZHJlblxuXHRcdFx0XHRAcHJpbnROb2RlKGNoaWxkTm9kZSwgbmV4dExldmVsKVxuXG5cbm1vZHVsZS5leHBvcnRzID0ge0xvZ1ZpZXd9IiwiIyBMb2dvXG5cbmNsYXNzIGV4cG9ydHMuTG9nb0xheWVyIGV4dGVuZHMgU1ZHTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0b3BhY2l0eTogMC41XG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cdFx0XHRzdmc6IGdldExvZ28oXCJGRkZcIilcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEBzdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRAc2hvd0hpbnQgPSAtPiA7XG5cdFx0XG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cdFxuXHRAZGVmaW5lICdoYW5kbGVyJyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9uKEV2ZW50cy5UYXAsIHZhbHVlKVxuXHRcblx0SG92ZXI6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjhcblx0SG92ZXJPZmY6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjVcblxuXG5cbmdldExvZ28gPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gXCIjRkZGRkZGXCJcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCI3NlwiIGhlaWdodD1cIjMyXCIgdmlld0JveD1cIjAgMCA3NiAzMlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk0yLjc5MTk5IDIxLjZDMi43OTE5OSAyMS4xNjggMi45MDM5OSAyMC40MDggMy4xMjc5OSAxOS4zMkw0LjM5OTk5IDEyLjg0SDIuOTgzOTlMMy4wNzk5OSAxMi4xMkM0Ljk5OTk5IDExLjU0NCA2Ljg4Nzk5IDEwLjU1MiA4Ljc0Mzk5IDkuMTQzOThIOS44OTU5OUw5LjMxOTk5IDExLjc2SDExLjE5MkwxMC45NzYgMTIuODRIOS4xMjc5OUw3LjkwMzk5IDE5LjMyQzcuNjk1OTkgMjAuMzEyIDcuNTkxOTkgMjAuOTc2IDcuNTkxOTkgMjEuMzEyQzcuNTkxOTkgMjIuMDggNy45Mjc5OSAyMi41NDQgOC41OTk5OSAyMi43MDRDOC40Mzk5OSAyMy4yNDggOC4wNzE5OSAyMy42OCA3LjQ5NTk5IDI0QzYuOTE5OTkgMjQuMzIgNi4yMjM5OSAyNC40OCA1LjQwNzk5IDI0LjQ4QzQuNTkxOTkgMjQuNDggMy45NTE5OSAyNC4yMjQgMy40ODc5OSAyMy43MTJDMy4wMjM5OSAyMy4yIDIuNzkxOTkgMjIuNDk2IDIuNzkxOTkgMjEuNlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMTcuNTU5OSAyMi42OEMxNy4wNjM5IDIzLjg4IDE2LjAyMzkgMjQuNDggMTQuNDM5OSAyNC40OEMxMy42MjM5IDI0LjQ4IDEyLjk1OTkgMjQuMiAxMi40NDc5IDIzLjY0QzEyLjAxNTkgMjMuMTQ0IDExLjc5OTkgMjIuNjQ4IDExLjc5OTkgMjIuMTUyQzExLjc5OTkgMjAuODU2IDEyLjA5NTkgMTguOTQ0IDEyLjY4NzkgMTYuNDE2TDEzLjU3NTkgMTEuNzZMMTguNDQ3OSAxMS4yOEwxNi45ODM5IDE4Ljg2NEMxNi43MTE5IDIwLjA0OCAxNi41NzU5IDIwLjg0OCAxNi41NzU5IDIxLjI2NEMxNi41NzU5IDIyLjE3NiAxNi45MDM5IDIyLjY0OCAxNy41NTk5IDIyLjY4Wk0xNC4wMDc5IDguNDIzOThDMTQuMDA3OSA3Ljc5OTk4IDE0LjI2MzkgNy4zMTk5OCAxNC43NzU5IDYuOTgzOThDMTUuMzAzOSA2LjY0Nzk4IDE1Ljk0MzkgNi40Nzk5OCAxNi42OTU5IDYuNDc5OThDMTcuNDQ3OSA2LjQ3OTk4IDE4LjA0NzkgNi42NDc5OCAxOC40OTU5IDYuOTgzOThDMTguOTU5OSA3LjMxOTk4IDE5LjE5MTkgNy43OTk5OCAxOS4xOTE5IDguNDIzOThDMTkuMTkxOSA5LjA0Nzk4IDE4LjkzNTkgOS41MTk5OCAxOC40MjM5IDkuODM5OThDMTcuOTI3OSAxMC4xNiAxNy4zMDM5IDEwLjMyIDE2LjU1MTkgMTAuMzJDMTUuNzk5OSAxMC4zMiAxNS4xODM5IDEwLjE2IDE0LjcwMzkgOS44Mzk5OEMxNC4yMzk5IDkuNTE5OTggMTQuMDA3OSA5LjA0Nzk4IDE0LjAwNzkgOC40MjM5OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMjYuMDYwNiAyMi42OEMyNS41NjQ2IDIzLjg4IDI0LjUyNDYgMjQuNDggMjIuOTQwNiAyNC40OEMyMi4xNDA2IDI0LjQ4IDIxLjQ4NDYgMjQuMiAyMC45NzI2IDIzLjY0QzIwLjU1NjYgMjMuMTc2IDIwLjM0ODYgMjIuNjggMjAuMzQ4NiAyMi4xNTJDMjAuMzQ4NiAyMC45NTIgMjAuNjI4NiAxOS4wNCAyMS4xODg2IDE2LjQxNkwyMi45NDA2IDcuMTk5OThMMjcuODEyNiA2LjcxOTk4TDI1LjQ4NDYgMTguODY0QzI1LjIxMjYgMjAuMDQ4IDI1LjA3NjYgMjAuODQ4IDI1LjA3NjYgMjEuMjY0QzI1LjA3NjYgMjIuMTc2IDI1LjQwNDYgMjIuNjQ4IDI2LjA2MDYgMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTM0LjU2MTggMjIuNjhDMzQuMDY1OCAyMy44OCAzMy4wMjU4IDI0LjQ4IDMxLjQ0MTggMjQuNDhDMzAuNjQxOCAyNC40OCAyOS45ODU4IDI0LjIgMjkuNDczOCAyMy42NEMyOS4wNTc4IDIzLjE3NiAyOC44NDk4IDIyLjY4IDI4Ljg0OTggMjIuMTUyQzI4Ljg0OTggMjAuOTUyIDI5LjEyOTggMTkuMDQgMjkuNjg5OCAxNi40MTZMMzEuNDQxOCA3LjE5OTk4TDM2LjMxMzggNi43MTk5OEwzMy45ODU4IDE4Ljg2NEMzMy43MTM4IDIwLjA0OCAzMy41Nzc4IDIwLjg0OCAzMy41Nzc4IDIxLjI2NEMzMy41Nzc4IDIyLjE3NiAzMy45MDU4IDIyLjY0OCAzNC41NjE4IDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk00My4wNjMxIDIyLjY4QzQyLjU2NzEgMjMuODggNDEuNTI3MSAyNC40OCAzOS45NDMxIDI0LjQ4QzM5LjE0MzEgMjQuNDggMzguNDg3MSAyNC4yIDM3Ljk3NTEgMjMuNjRDMzcuNTU5MSAyMy4xNzYgMzcuMzUxMSAyMi42OCAzNy4zNTExIDIyLjE1MkMzNy4zNTExIDIwLjk1MiAzNy42MzExIDE5LjA0IDM4LjE5MTEgMTYuNDE2TDM5Ljk0MzEgNy4xOTk5OEw0NC44MTUxIDYuNzE5OThMNDIuNDg3MSAxOC44NjRDNDIuMjE1MSAyMC4wNDggNDIuMDc5MSAyMC44NDggNDIuMDc5MSAyMS4yNjRDNDIuMDc5MSAyMi4xNzYgNDIuNDA3MSAyMi42NDggNDMuMDYzMSAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNTMuNTMyMyAyMi45OTJDNTIuNzY0MyAyMy45ODQgNTEuNDI4MyAyNC40OCA0OS41MjQzIDI0LjQ4QzQ4LjUzMjMgMjQuNDggNDcuNjc2MyAyNC4xODQgNDYuOTU2MyAyMy41OTJDNDYuMjM2MyAyMi45ODQgNDUuODc2MyAyMi4yNDggNDUuODc2MyAyMS4zODRDNDUuODc2MyAyMC45MDQgNDUuOTAwMyAyMC41NDQgNDUuOTQ4MyAyMC4zMDRMNDcuNTU2MyAxMS43Nkw1Mi40MjgzIDExLjI4TDUwLjY3NjMgMjAuNTQ0QzUwLjYxMjMgMjAuODk2IDUwLjU4MDMgMjEuMTc2IDUwLjU4MDMgMjEuMzg0QzUwLjU4MDMgMjIuMzEyIDUwLjg2MDMgMjIuNzc2IDUxLjQyMDMgMjIuNzc2QzUyLjA0NDMgMjIuNzc2IDUyLjU4MDMgMjIuMzUyIDUzLjAyODMgMjEuNTA0QzUzLjE3MjMgMjEuMjMyIDUzLjI3NjMgMjAuOTIgNTMuMzQwMyAyMC41NjhMNTUuMDQ0MyAxMS43Nkw1OS43NzIzIDExLjI4TDU3Ljk5NjMgMjAuNjRDNTcuOTQ4MyAyMC44OCA1Ny45MjQzIDIxLjEyOCA1Ny45MjQzIDIxLjM4NEM1Ny45MjQzIDIxLjY0IDU3Ljk5NjMgMjEuOTEyIDU4LjE0MDMgMjIuMkM1OC4yODQzIDIyLjQ3MiA1OC41ODgzIDIyLjY0IDU5LjA1MjMgMjIuNzA0QzU4Ljk1NjMgMjMuMDg4IDU4Ljc0MDMgMjMuNDA4IDU4LjQwNDMgMjMuNjY0QzU3LjcwMDMgMjQuMjA4IDU2Ljk2NDMgMjQuNDggNTYuMTk2MyAyNC40OEM1NS40NDQzIDI0LjQ4IDU0Ljg0NDMgMjQuMzQ0IDU0LjM5NjMgMjQuMDcyQzUzLjk0ODMgMjMuOCA1My42NjAzIDIzLjQ0IDUzLjUzMjMgMjIuOTkyWlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk02OS4yOTQ3IDE3LjI1NkM2OS44NzA3IDE2LjIzMiA3MC4xNTg3IDE1LjIgNzAuMTU4NyAxNC4xNkM3MC4xNTg3IDEzLjQ3MiA2OS45MTA3IDEzLjEyOCA2OS40MTQ3IDEzLjEyOEM2OS4wMzA3IDEzLjEyOCA2OC42Mzg3IDEzLjQ1NiA2OC4yMzg3IDE0LjExMkM2Ny44MjI3IDE0Ljc2OCA2Ny41NTA3IDE1LjUyIDY3LjQyMjcgMTYuMzY4TDY2LjE3NDcgMjRMNjEuMjA2NyAyNC40OEw2My42NTQ3IDExLjc2TDY3LjYxNDcgMTEuMjhMNjcuMTgyNyAxMy43MDRDNjcuOTY2NyAxMi4wODggNjkuMjM4NyAxMS4yOCA3MC45OTg3IDExLjI4QzcxLjkyNjcgMTEuMjggNzIuNjM4NyAxMS41MiA3My4xMzQ3IDEyQzczLjY0NjcgMTIuNDggNzMuOTAyNyAxMy4yMTYgNzMuOTAyNyAxNC4yMDhDNzMuOTAyNyAxNS4xODQgNzMuNTc0NyAxNS45ODQgNzIuOTE4NyAxNi42MDhDNzIuMjc4NyAxNy4yMzIgNzEuNDA2NyAxNy41NDQgNzAuMzAyNyAxNy41NDRDNjkuODIyNyAxNy41NDQgNjkuNDg2NyAxNy40NDggNjkuMjk0NyAxNy4yNTZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48L3N2Zz5cblwiXCJcIlxuIiwiXG57IEJ1dHRvbiB9ID0gcmVxdWlyZSBcIkJ1dHRvbnNcIlxuXG57IFByZXZpZXdfQ2xhc3MgfSA9IHJlcXVpcmUgXCJQcmV2aWV3X0NsYXNzXCJcblxuY2xhc3MgRmxvd1ZpZXcgZXh0ZW5kcyBGbG93Q29tcG9uZW50XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRpZiBAcGFyZW50XG5cdFx0XHRAd2lkdGggPSBAcGFyZW50LndpZHRoXG5cdFx0XHRAaGVpZ2h0ID0gQHBhcmVudC5oZWlnaHRcblx0XHRcdGZvciBjaGlsZCBpbiBAY2hpbGRyZW5cblx0XHRcdFx0Y2hpbGQud2lkdGggPSBAcGFyZW50LndpZHRoXG5cdFx0XHRcdGNoaWxkLmhlaWdodCA9IEBwYXJlbnQuaGVpZ2h0XG5cdFx0XG5cblx0XHRAb24gRXZlbnRzLlRyYW5zaXRpb25TdGFydCwgKGxheWVyQSwgbGF5ZXJCKSAtPlxuXHRcdFx0aWYgbGF5ZXJCICE9IHVuZGVmaW5lZCBhbmQgbGF5ZXJCLmN1c3RvbSAhPSB1bmRlZmluZWQgYW5kIGxheWVyQi5jdXN0b20uY3VzdG9tQWN0aW9uX0FycmF5ICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRAaXRlcmF0ZVRocm91Z2hDaGlsZHJlbiBsYXllckIsIGxheWVyQi5jdXN0b20uY3VzdG9tQWN0aW9uX0FycmF5LCBAY3VzdG9tQWN0aW9uX3N3aXRjaE9uTGF5ZXJzXG5cdFx0XHRcblx0XHRcdGlmIGxheWVyQSAhPSB1bmRlZmluZWQgYW5kIGxheWVyQS5jdXN0b20gIT0gdW5kZWZpbmVkIGFuZCBsYXllckEuY3VzdG9tLmN1c3RvbUFjdGlvbl9BcnJheSAhPSB1bmRlZmluZWRcblx0XHRcdFx0QGl0ZXJhdGVUaHJvdWdoQ2hpbGRyZW4gbGF5ZXJBLCBsYXllckEuY3VzdG9tLmN1c3RvbUFjdGlvbl9BcnJheSwgQGN1c3RvbUFjdGlvbl9zd2l0Y2hPZmZMYXllcnNcblxuXG5cblx0QGRlZmluZSBcInBhcmVudFwiLFxuXHRcdGVudW1lcmFibGU6IGZhbHNlXG5cdFx0ZXhwb3J0YWJsZTogZmFsc2Vcblx0XHRpbXBvcnRhYmxlOiB0cnVlXG5cblx0XHRnZXQ6IC0+XG5cdFx0XHRAX3BhcmVudCBvciBudWxsXG5cdFx0XG5cdFx0c2V0OiAobGF5ZXIpIC0+XG5cdFx0XHRyZXR1cm4gaWYgbGF5ZXIgaXMgQF9wYXJlbnRcblxuXHRcdFx0dGhyb3cgRXJyb3IoXCJMYXllci5wYXJlbnQ6IGEgbGF5ZXIgY2Fubm90IGJlIGl0J3Mgb3duIHBhcmVudC5cIikgaWYgbGF5ZXIgaXMgQFxuXG5cdFx0XHQjIENoZWNrIHRoZSB0eXBlXG5cdFx0XHRpZiBub3QgbGF5ZXIgaW5zdGFuY2VvZiBMYXllclxuXHRcdFx0XHR0aHJvdyBFcnJvciBcIkxheWVyLnBhcmVudCBuZWVkcyB0byBiZSBhIExheWVyIG9iamVjdFwiXG5cblx0XHRcdCMgQ2FuY2VsIHByZXZpb3VzIHBlbmRpbmcgaW5zZXJ0aW9uc1xuXHRcdFx0VXRpbHMuZG9tQ29tcGxldGVDYW5jZWwoQF9faW5zZXJ0RWxlbWVudClcblxuXHRcdFx0IyBSZW1vdmUgZnJvbSBwcmV2aW91cyBwYXJlbnQgY2hpbGRyZW5cblx0XHRcdGlmIEBfcGFyZW50XG5cdFx0XHRcdEBfcGFyZW50Ll9jaGlsZHJlbiA9IF8ucHVsbCBAX3BhcmVudC5fY2hpbGRyZW4sIEBcblx0XHRcdFx0QF9wYXJlbnQuX2VsZW1lbnQucmVtb3ZlQ2hpbGQgQF9lbGVtZW50XG5cdFx0XHRcdEBfcGFyZW50LmVtaXQgXCJjaGFuZ2U6Y2hpbGRyZW5cIiwge2FkZGVkOiBbXSwgcmVtb3ZlZDogW0BdfVxuXHRcdFx0XHRAX3BhcmVudC5lbWl0IFwiY2hhbmdlOnN1YkxheWVyc1wiLCB7YWRkZWQ6IFtdLCByZW1vdmVkOiBbQF19XG5cblx0XHRcdCMgRWl0aGVyIGluc2VydCB0aGUgZWxlbWVudCB0byB0aGUgbmV3IHBhcmVudCBlbGVtZW50IG9yIGludG8gZG9tXG5cdFx0XHRpZiBsYXllclxuXHRcdFx0XHRsYXllci5fZWxlbWVudC5hcHBlbmRDaGlsZCBAX2VsZW1lbnRcblx0XHRcdFx0bGF5ZXIuX2NoaWxkcmVuLnB1c2ggQFxuXHRcdFx0XHRsYXllci5lbWl0IFwiY2hhbmdlOmNoaWxkcmVuXCIsIHthZGRlZDogW0BdLCByZW1vdmVkOiBbXX1cblx0XHRcdFx0bGF5ZXIuZW1pdCBcImNoYW5nZTpzdWJMYXllcnNcIiwge2FkZGVkOiBbQF0sIHJlbW92ZWQ6IFtdfVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAX2luc2VydEVsZW1lbnQoKVxuXG5cdFx0XHRvbGRQYXJlbnQgPSBAX3BhcmVudFxuXHRcdFx0IyBTZXQgdGhlIHBhcmVudFxuXHRcdFx0QF9wYXJlbnQgPSBsYXllclxuXG5cdFx0XHQjIFBsYWNlIHRoaXMgbGF5ZXIgb24gdG9wIG9mIGl0cyBzaWJsaW5nc1xuXHRcdFx0QGJyaW5nVG9Gcm9udCgpXG5cblx0XHRcdEBlbWl0IFwiY2hhbmdlOnBhcmVudFwiLCBAX3BhcmVudCwgb2xkUGFyZW50XG5cdFx0XHRAZW1pdCBcImNoYW5nZTpzdXBlckxheWVyXCIsIEBfcGFyZW50LCBvbGRQYXJlbnRcblx0XHRcdFxuXHRcdFx0QHdpZHRoID0gbGF5ZXIud2lkdGhcblx0XHRcdEBoZWlnaHQgPSBsYXllci5oZWlnaHRcblxuXG5cdHN0YWNrVHJhbnNpdGlvbjogKG5hdiwgbGF5ZXJBLCBsYXllckIsIG92ZXJsYXkpIC0+XG5cdFx0dHJhbnNpdGlvbiA9XG5cdFx0XHRsYXllckE6XG5cdFx0XHRcdHNob3c6IHt4OiAwLCB5OiAwfVxuXHRcdFx0XHRoaWRlOiB7eDogMCAtIGxheWVyQT8ud2lkdGggLyAyLCB5OiAwfVxuXHRcdFx0bGF5ZXJCOlxuXHRcdFx0XHRzaG93OiB7eDogMCwgeTogMH1cblx0XHRcdFx0aGlkZToge3g6IGxheWVyQi53aWR0aCwgeTogMH1cblx0XHRcdG92ZXJsYXk6XG5cdFx0XHRcdHNob3c6IHtvcGFjaXR5OiAuNSwgeDogMCwgeTogMCwgc2l6ZTogbmF2LnNpemV9XG5cdFx0XHRcdGhpZGU6IHtvcGFjaXR5OiAwLCB4OiAwLCB5OiAwLCBzaXplOiBuYXYuc2l6ZX1cblxuXG5cdG1vZGFsVHJhbnNpdGlvbjogKG5hdiwgbGF5ZXJBLCBsYXllckIsIG92ZXJsYXkpIC0+XG5cdFx0dHJhbnNpdGlvbiA9XG5cdFx0XHRsYXllckE6XG5cdFx0XHRcdHNob3c6IHt4OiAwLCB5OiAwfVxuXHRcdFx0XHRoaWRlOiB7eDogMCwgeTogMH1cblx0XHRcdGxheWVyQjpcblx0XHRcdFx0c2hvdzoge3g6IDAsIHk6IDB9XG5cdFx0XHRcdGhpZGU6IHt4OiAwLCB5OiBsYXllckE/LmhlaWdodCArIDEwfVxuXHRcdFx0b3ZlcmxheTpcblx0XHRcdFx0c2hvdzoge29wYWNpdHk6IC41LCB4OiAwLCB5OiAwLCBzaXplOiBuYXYuc2l6ZX1cblx0XHRcdFx0aGlkZToge29wYWNpdHk6IDAsIHg6IDAsIHk6IDAsIHNpemU6IG5hdi5zaXplfVxuXHRcblx0YXBwVHJhbnNpdGlvbjogKG5hdiwgbGF5ZXJBLCBsYXllckIsIG92ZXJsYXkpIC0+XG5cdFx0dHJhbnNpdGlvbiA9XG5cdFx0XHRsYXllckE6XG5cdFx0XHRcdHNob3c6IHt4OiAwLCB5OiAwLCBzY2FsZTogMX1cblx0XHRcdFx0aGlkZToge3g6IDAgLSBsYXllckE/LndpZHRoLCB5OiAwLCBzY2FsZTogMC44fVxuXHRcdFx0bGF5ZXJCOlxuXHRcdFx0XHRzaG93OiB7eDogMCwgeTogMCwgc2NhbGU6IDF9XG5cdFx0XHRcdGhpZGU6IHt4OiBsYXllckIud2lkdGgsIHk6IDAsIHNjYWxlOiAwLjh9XG5cdFx0XHRvdmVybGF5OlxuXHRcdFx0XHRzaG93OiB7b3BhY2l0eTogLjUsIHg6IDAsIHk6IDAsIHNpemU6IG5hdi5zaXplfVxuXHRcdFx0XHRoaWRlOiB7b3BhY2l0eTogMCwgeDogMCwgeTogMCwgc2l6ZTogbmF2LnNpemV9XG5cblxuXHRjdXN0b21BY3Rpb25fc3dpdGNoT25MYXllcnM6IChsYXllciwgYm94LCBmbG93KSAtPlxuXHRcdCMgaWYgYm94ID09IHVuZGVmaW5lZCB0aGVuIHJldHVyblxuXG5cdFx0bGF5ZXJUb0NoZWNrID0gbGF5ZXJcblx0XHRpbmRleCA9IGJveC5pbmRleE9mKGxheWVyVG9DaGVjaylcblxuXHRcdGlmIGluZGV4ICE9IC0xXG5cdFx0XHRsYXllci5pZ25vcmVFdmVudHMgPSBmYWxzZVxuXHRcdFx0Ym94LnNwbGljZShpbmRleCwgMSlcblxuXG5cblx0Y3VzdG9tQWN0aW9uX3N3aXRjaE9mZkxheWVyczogKGxheWVyLCBib3gsIGZsb3cpIC0+XG5cblx0XHRpZiBmbG93LnNob3VsZFNob3dIaW50T3ZlcnJpZGUobGF5ZXIpXG5cdFx0XHQjIHByaW50IFwid2lsbCBvZmYgbGF5ZXIgXCIgKyBsYXllci5uYW1lXG5cdFx0XHRib3gucHVzaCBsYXllclxuXHRcdFx0bGF5ZXIuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXHRcblx0XG5cdFxuXHRzaG91bGRTaG93SGludE92ZXJyaWRlOiAobGF5ZXIpIC0+XG5cdFx0aWYgbGF5ZXIuaWdub3JlRXZlbnRzIGlzIHRydWUgdGhlbiByZXR1cm4gZmFsc2Vcblx0XHQjIGlmIGxheWVyLmlzQW5pbWF0aW5nIHRoZW4gcmV0dXJuIGZhbHNlXG5cblx0XHQjIGZvciBwYXJlbnQgaW4gQGFuY2VzdG9ycygpXG5cdFx0XHQjIHJldHVybiBmYWxzZSBpZiBwYXJlbnQuaXNBbmltYXRpbmdcblxuXHRcdCMgZm9yIHBhcmVudCBpbiBsYXllci5hbmNlc3RvcnMoKVxuXHRcdCMgXHQjIGlmIHBhcmVudCBpbnN0YW5jZW9mIFByZXZpZXdfQ2xhc3Ncblx0XHQjIFx0IyBcdCMgaWYgbGF5ZXIgaW5zdGFuY2VvZiBCdXR0b24gdGhlbiBwcmludCBcIkhFUkVcIlxuXHRcdCMgXHQjIFx0Y29udGludWVcblx0XHQjIFx0IyBpZiBwYXJlbnQuaXNBbmltYXRpbmdcblx0XHQjIFx0IyBcdGlmIGxheWVyIGluc3RhbmNlb2YgQnV0dG9uIHRoZW4gcHJpbnQgXCI/Pz9cIlxuXHRcdCMgXHQjIFx0aWYgbGF5ZXIgaW5zdGFuY2VvZiBCdXR0b24gdGhlbiBwcmludCBwYXJlbnRcblx0XHQjIFx0cmV0dXJuIGZhbHNlIGlmIHBhcmVudC5pc0FuaW1hdGluZ1xuXG5cdFx0aWYgbGF5ZXIuX2RyYWdnYWJsZSBhbmQgbGF5ZXIuX2RyYWdnYWJsZS5ob3Jpem9udGFsIGlzIGZhbHNlIGFuZCBsYXllci5fZHJhZ2dhYmxlLnZlcnRpY2FsIGlzIGZhbHNlXG5cdFx0XHRyZXR1cm4gZmFsc2VcblxuXHRcdHJldHVybiBmYWxzZSBpZiBsYXllci5vcGFjaXR5IGlzIDBcblxuXHRcdGZvciBldmVudE5hbWUgaW4gbGF5ZXIubGlzdGVuZXJFdmVudHMoKVxuXHRcdFx0cmV0dXJuIHRydWUgaWYgRXZlbnRzLmlzSW50ZXJhY3RpdmUoZXZlbnROYW1lKVxuXHRcdFxuXHRcdHJldHVybiBmYWxzZVxuXG5cblxuXG5cdGl0ZXJhdGVUaHJvdWdoQ2hpbGRyZW46IChsYXllciwgYm94LCBhY3Rpb25DYWxsYmFjaykgLT5cblx0XHRhY3Rpb25DYWxsYmFjayBsYXllciwgYm94LCBAXG5cdFx0Zm9yIGNoaWxkIGluIGxheWVyLmNoaWxkcmVuXG5cdFx0XHRAaXRlcmF0ZVRocm91Z2hDaGlsZHJlbiBjaGlsZCwgYm94LCBhY3Rpb25DYWxsYmFja1xuXG5cblx0b3BlbjogKG5hdmlnYXRpb25WaWV3KSAtPlxuXHRcdG5hdmlnYXRpb25WaWV3LnNjcm9sbFRvVG9wKGZhbHNlKVxuXHRcdCMgQGl0ZXJhdGVUaHJvdWdoQ2hpbGRyZW4gQGN1cnJlbnQsIEBjdXJyZW50LmN1c3RvbS5jdXN0b21BY3Rpb25fQXJyYXksIEBjdXN0b21BY3Rpb25fc3dpdGNoT2ZmTGF5ZXJzXG5cblx0XHRpZiBuYXZpZ2F0aW9uVmlldy53cmFwcGVyICE9IHVuZGVmaW5lZCBhbmQgbmF2aWdhdGlvblZpZXcud3JhcHBlciAhPSBudWxsXG5cdFx0XHRAdHJhbnNpdGlvbihuYXZpZ2F0aW9uVmlldy5wYXJlbnQsIEBtb2RhbFRyYW5zaXRpb24pXG5cdFx0XHQjIEBpdGVyYXRlVGhyb3VnaENoaWxkcmVuIG5hdmlnYXRpb25WaWV3LnBhcmVudCwgbmF2aWdhdGlvblZpZXcucGFyZW50LmN1c3RvbS5jdXN0b21BY3Rpb25fQXJyYXksIEBjdXN0b21BY3Rpb25fc3dpdGNoT25MYXllcnNcblx0XHRlbHNlXG5cdFx0XHRAdHJhbnNpdGlvbihuYXZpZ2F0aW9uVmlldywgQHN0YWNrVHJhbnNpdGlvbilcblx0XHRcdCMgQGl0ZXJhdGVUaHJvdWdoQ2hpbGRyZW4gbmF2aWdhdGlvblZpZXcsIG5hdmlnYXRpb25WaWV3LmN1c3RvbS5jdXN0b21BY3Rpb25fQXJyYXksIEBjdXN0b21BY3Rpb25fc3dpdGNoT25MYXllcnNcblxuXG5cblxuXG5cbmNsYXNzIE1vZGFsVmlldyBleHRlbmRzIFNjcm9sbENvbXBvbmVudFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0bmF2aWdhdGlvblZpZXdfV3JhcHBlciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJ3cmFwcGVyXCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRjdXN0b21BY3Rpb25fQXJyYXk6IFtdXG5cdFx0XHRcdFxuXG5cdFx0bmF2aWdhdGlvblZpZXdfV3JhcHBlci5vbiBFdmVudHMuVGFwLCAtPlxuXHRcdFx0QGNoaWxkcmVuWzBdLmZsb3cuc2hvd1ByZXZpb3VzKClcblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRmbG93OiBudWxsXG5cdFx0XHRiYWNrQnV0dG9uOiBudWxsXG5cdFx0XHRzaG93QmFjazogZmFsc2Vcblx0XHRcdHdyYXBwZXI6IG5hdmlnYXRpb25WaWV3X1dyYXBwZXJcblx0XHRcdHNjcm9sbFZlcnRpY2FsOiB0cnVlXG5cdFx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0ZGlyZWN0aW9uTG9jazogdHJ1ZVxuXHRcdFx0YnV0dG9uczoge31cblx0XHRcdGN1c3RvbTpcblx0XHRcdFx0YmFja0J1dHRvbl9uYW1lOiBcIkJhY2tfQnV0dG9uXCJcblx0XHRcdFx0YnV0dG9uTGF5ZXJzOiBbXVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0QHBhcmVudCA9IG5hdmlnYXRpb25WaWV3X1dyYXBwZXJcblxuXHRcdEBvbiBFdmVudHMuVGFwLCAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuXHRcdEBvbiBFdmVudHMuU3dpcGVEb3duU3RhcnQsIChldmVudCwgbGF5ZXIpIC0+XG5cdFx0XHRpZiBAc2Nyb2xsWSA8IDBcblx0XHRcdFx0QGZsb3cuc2hvd1ByZXZpb3VzKClcblx0XHRcdFx0IyBAZmxvdy5pdGVyYXRlVGhyb3VnaENoaWxkcmVuIEAsIEBjdXN0b20uY3VzdG9tQWN0aW9uX0FycmF5LCBAZmxvdy5jdXN0b21BY3Rpb25fc3dpdGNoT2ZmTGF5ZXJzXG5cblx0XHRpZiBAZmxvd1xuXHRcdFx0QGZsb3cuc2hvd05leHQoQHdyYXBwZXIpXG5cdFx0XHRAZmxvdy5zaG93UHJldmlvdXMoYW5pbWF0ZTogZmFsc2UpXG5cdFx0XG5cdFx0dHJ5IEBiYWNrQnV0dG9uLmJyaW5nVG9Gcm9udCgpXG5cdFx0QG9uIFwiY2hhbmdlOmNoaWxkcmVuXCIsIC0+XG5cdFx0XHR0cnkgQGJhY2tCdXR0b24uYnJpbmdUb0Zyb250KClcblx0XHRcdHRyeSBidXR0b24uYnJpbmdUb0Zyb250KCkgZm9yIGJ1dHRvbiBpbiBAY3VzdG9tLmJ1dHRvbkxheWVyc1xuXG5cdFx0QGNyZWF0ZV9CdXR0b25zKClcblxuXG5cdEBkZWZpbmUgJ2J1dHRvbnMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYnV0dG9uc1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5idXR0b25zID0gdmFsdWVcblxuXHRAZGVmaW5lICdmbG93Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmZsb3dcblx0XHQjIHNldDogKHZhbHVlKSAtPlxuXHRcdCMgXHRAb3B0aW9ucy5mbG93ID0gdmFsdWVcblx0XHQjIFx0dmFsdWUuc2hvd05leHQoQClcblx0XHQjIFx0dmFsdWUuc2hvd1ByZXZpb3VzKGFuaW1hdGU6IGZhbHNlKVxuXHRcblx0QGRlZmluZSAnd3JhcHBlcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy53cmFwcGVyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLndyYXBwZXIgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgXCJwYXJlbnRcIixcblx0XHRlbnVtZXJhYmxlOiBmYWxzZVxuXHRcdGV4cG9ydGFibGU6IGZhbHNlXG5cdFx0aW1wb3J0YWJsZTogdHJ1ZVxuXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QF9wYXJlbnQgb3IgbnVsbFxuXHRcdFxuXHRcdHNldDogKGxheWVyKSAtPlxuXG5cdFx0XHQjIEZsb3cgcGFyZW50XG5cdFx0XHRpZiBsYXllciAhPSBAd3JhcHBlclxuXHRcdFx0XHRAb3B0aW9ucy5mbG93ID0gbGF5ZXJcblxuXHRcdFx0XHRAd3JhcHBlci5wYXJlbnQgPSBsYXllclxuXHRcdFx0XHRAd3JhcHBlci53aWR0aCA9IGxheWVyLndpZHRoXG5cdFx0XHRcdEB3cmFwcGVyLmhlaWdodCA9IGxheWVyLmhlaWdodFxuXHRcdFx0XHRAd2lkdGggPSBsYXllci53aWR0aFxuXHRcdFx0XHRAaGVpZ2h0ID0gbGF5ZXIuaGVpZ2h0XG5cblx0XHRcdFx0cmV0dXJuXG5cblxuXHRcdFx0cmV0dXJuIGlmIGxheWVyIGlzIEBfcGFyZW50XG5cblx0XHRcdHRocm93IEVycm9yKFwiTGF5ZXIucGFyZW50OiBhIGxheWVyIGNhbm5vdCBiZSBpdCdzIG93biBwYXJlbnQuXCIpIGlmIGxheWVyIGlzIEBcblxuXHRcdFx0IyBDaGVjayB0aGUgdHlwZVxuXHRcdFx0aWYgbm90IGxheWVyIGluc3RhbmNlb2YgTGF5ZXJcblx0XHRcdFx0dGhyb3cgRXJyb3IgXCJMYXllci5wYXJlbnQgbmVlZHMgdG8gYmUgYSBMYXllciBvYmplY3RcIlxuXG5cdFx0XHQjIENhbmNlbCBwcmV2aW91cyBwZW5kaW5nIGluc2VydGlvbnNcblx0XHRcdFV0aWxzLmRvbUNvbXBsZXRlQ2FuY2VsKEBfX2luc2VydEVsZW1lbnQpXG5cblx0XHRcdCMgUmVtb3ZlIGZyb20gcHJldmlvdXMgcGFyZW50IGNoaWxkcmVuXG5cdFx0XHRpZiBAX3BhcmVudFxuXHRcdFx0XHRAX3BhcmVudC5fY2hpbGRyZW4gPSBfLnB1bGwgQF9wYXJlbnQuX2NoaWxkcmVuLCBAXG5cdFx0XHRcdEBfcGFyZW50Ll9lbGVtZW50LnJlbW92ZUNoaWxkIEBfZWxlbWVudFxuXHRcdFx0XHRAX3BhcmVudC5lbWl0IFwiY2hhbmdlOmNoaWxkcmVuXCIsIHthZGRlZDogW10sIHJlbW92ZWQ6IFtAXX1cblx0XHRcdFx0QF9wYXJlbnQuZW1pdCBcImNoYW5nZTpzdWJMYXllcnNcIiwge2FkZGVkOiBbXSwgcmVtb3ZlZDogW0BdfVxuXG5cdFx0XHQjIEVpdGhlciBpbnNlcnQgdGhlIGVsZW1lbnQgdG8gdGhlIG5ldyBwYXJlbnQgZWxlbWVudCBvciBpbnRvIGRvbVxuXHRcdFx0aWYgbGF5ZXJcblx0XHRcdFx0bGF5ZXIuX2VsZW1lbnQuYXBwZW5kQ2hpbGQgQF9lbGVtZW50XG5cdFx0XHRcdGxheWVyLl9jaGlsZHJlbi5wdXNoIEBcblx0XHRcdFx0bGF5ZXIuZW1pdCBcImNoYW5nZTpjaGlsZHJlblwiLCB7YWRkZWQ6IFtAXSwgcmVtb3ZlZDogW119XG5cdFx0XHRcdGxheWVyLmVtaXQgXCJjaGFuZ2U6c3ViTGF5ZXJzXCIsIHthZGRlZDogW0BdLCByZW1vdmVkOiBbXX1cblx0XHRcdGVsc2Vcblx0XHRcdFx0QF9pbnNlcnRFbGVtZW50KClcblxuXHRcdFx0b2xkUGFyZW50ID0gQF9wYXJlbnRcblx0XHRcdCMgU2V0IHRoZSBwYXJlbnRcblx0XHRcdEBfcGFyZW50ID0gbGF5ZXJcblxuXHRcdFx0IyBQbGFjZSB0aGlzIGxheWVyIG9uIHRvcCBvZiBpdHMgc2libGluZ3Ncblx0XHRcdEBicmluZ1RvRnJvbnQoKVxuXG5cdFx0XHRAZW1pdCBcImNoYW5nZTpwYXJlbnRcIiwgQF9wYXJlbnQsIG9sZFBhcmVudFxuXHRcdFx0QGVtaXQgXCJjaGFuZ2U6c3VwZXJMYXllclwiLCBAX3BhcmVudCwgb2xkUGFyZW50XG5cblxuXHRcblx0YWRkOiAoY29udGVudFZpZXcpIC0+XG5cdFx0Y29udGVudFZpZXcucGFyZW50ID0gQGN1c3RvbS52aWV3LmNvbnRlbnRcblx0XHRAYmFja2dyb3VuZENvbG9yID0gbnVsbFxuXHRcblxuXHRAZGVmaW5lICdiYWNrQnV0dG9uJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmJhY2tCdXR0b25cblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLmJhY2tCdXR0b24gPSB2YWx1ZVxuXHRcdFx0dmFsdWUubmFtZSA9IEBjdXN0b20uYmFja0J1dHRvbl9uYW1lXG5cblx0XHRcdHZhbHVlLnBhcmVudCA9IEBcblx0XHRcdHZhbHVlLmJyaW5nVG9Gcm9udCgpXG5cdFx0XHRcblx0XHRcdHRyeSB2YWx1ZS5oYW5kbGVyID0gKCkgPT5cblx0XHRcdFx0QGZsb3cuc2hvd1ByZXZpb3VzKClcblx0XHRcdFx0IyBAZmxvdy5pdGVyYXRlVGhyb3VnaENoaWxkcmVuIEAsIEBjdXN0b20uY3VzdG9tQWN0aW9uX0FycmF5LCBAZmxvdy5jdXN0b21BY3Rpb25fc3dpdGNoT2ZmTGF5ZXJzXG5cdFxuXG5cdEBkZWZpbmUgJ3Nob3dCYWNrJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNob3dCYWNrXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5zaG93QmFjayA9IHZhbHVlXG5cdFx0XHRpZiB2YWx1ZSA9PSB0cnVlIGFuZCBAYmFja0J1dHRvbiA9PSBudWxsXG5cdFx0XHRcdEBiYWNrQnV0dG9uID0gQGNyZWF0ZV9CYWNrQnV0dG9uKClcblxuXHRcblx0Y3JlYXRlX0JhY2tCdXR0b246ICgpID0+XG5cdFx0cmV0dXJuIG5ldyBCdXR0b25cblx0XHRcdG5hbWU6IEBjdXN0b20uYmFja0J1dHRvbl9uYW1lXG5cdFx0XHRwYXJlbnQ6IEAsIHNpemU6IDgwLCB5OiAzMlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHQjIGJhY2tncm91bmRDb2xvcjogXCJyZWRcIlxuXHRcdFx0aGFuZGxlcjogKCkgLT4gQHBhcmVudC5mbG93LnNob3dQcmV2aW91cygpXG5cdFxuXHRjcmVhdGVfQnV0dG9uczogKCkgPT5cblx0XHRcblx0XHRmb3IgYnV0dG9uTmFtZSBvZiBAYnV0dG9uc1xuXHRcdFx0YnV0dG9uT3B0aW9ucyA9IEBidXR0b25zW2J1dHRvbk5hbWVdXG5cdFx0XHRpZiBidXR0b25PcHRpb25zLmZpeGVkIHRoZW4gYnV0dG9uUGFyZW50ID0gQCBlbHNlIGJ1dHRvblBhcmVudCA9IEBjb250ZW50XG5cblx0XHRcdGJ1dHRvbk9wdGlvbnMyID0gXy5leHRlbmQoe30sIGJ1dHRvbk9wdGlvbnMsIHtwYXJlbnQ6IGJ1dHRvblBhcmVudH0pXG5cdFx0XHRidXR0b24gPSBuZXcgQnV0dG9uKGJ1dHRvbk9wdGlvbnMyKVxuXHRcdFx0XG5cdFx0XHQjIGlmIGJ1dHRvbk9wdGlvbnMuaGFuZGxlciB0aGVuIGJ1dHRvbi5oYW5kbGVyID0gYnV0dG9uT3B0aW9ucy5oYW5kbGVyXG5cdFx0XHRAY3VzdG9tLmJ1dHRvbkxheWVycy5wdXNoIGJ1dHRvblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuY2xhc3MgTmF2aWdhdGlvblZpZXcgZXh0ZW5kcyBTY3JvbGxDb21wb25lbnRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRmbG93OiBudWxsXG5cdFx0XHRiYWNrQnV0dG9uOiBudWxsXG5cdFx0XHRzaG93QmFjazogdHJ1ZVxuXHRcdFx0cHJldmVudEJhY2tTd2lwZTogZmFsc2Vcblx0XHRcdHNjcm9sbFZlcnRpY2FsOiB0cnVlXG5cdFx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0ZGlyZWN0aW9uTG9jazogdHJ1ZVxuXHRcdFx0YnV0dG9uczoge31cblx0XHRcdGN1c3RvbTpcblx0XHRcdFx0YmFja0J1dHRvbl9uYW1lOiBcIkJhY2tfQnV0dG9uXCJcblx0XHRcdFx0Y3VzdG9tQWN0aW9uX0FycmF5OiBbXVxuXHRcdFx0XHRidXR0b25MYXllcnM6IFtdXG5cblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QGNvbnRlbnQud2lkdGggPSBAd2lkdGhcblx0XHRAY29udGVudC5oZWlnaHQgPSBAaGVpZ2h0XG5cblx0XHRpZiBAcHJldmVudEJhY2tTd2lwZSA9PSBmYWxzZVxuXHRcdFx0QG9uIEV2ZW50cy5Td2lwZVJpZ2h0U3RhcnQsIChldmVudCwgbGF5ZXIpID0+XG5cdFx0XHRcdHRyeSBAZmxvdy5zaG93UHJldmlvdXMoKVxuXG5cdFx0dHJ5IEBiYWNrQnV0dG9uLmJyaW5nVG9Gcm9udCgpXG5cdFx0QG9uIFwiY2hhbmdlOmNoaWxkcmVuXCIsIC0+XG5cdFx0XHR0cnkgQGJhY2tCdXR0b24uYnJpbmdUb0Zyb250KClcblx0XHRcdHRyeSBidXR0b24uYnJpbmdUb0Zyb250KCkgZm9yIGJ1dHRvbiBpbiBAY3VzdG9tLmJ1dHRvbkxheWVyc1xuXG5cdFx0QGNyZWF0ZV9CdXR0b25zKClcblx0XG5cblx0QGRlZmluZSAnZmxvdycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5mbG93XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5mbG93ID0gdmFsdWVcblx0XHRcdHZhbHVlLnNob3dOZXh0KEApXG5cdFx0XHR2YWx1ZS5zaG93UHJldmlvdXMoYW5pbWF0ZTogZmFsc2UpXG5cdFxuXG5cdEBkZWZpbmUgJ3ByZXZlbnRCYWNrU3dpcGUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMucHJldmVudEJhY2tTd2lwZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5wcmV2ZW50QmFja1N3aXBlID0gdmFsdWVcblxuXHRAZGVmaW5lICdidXR0b25zJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmJ1dHRvbnNcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuYnV0dG9ucyA9IHZhbHVlXG5cblxuXHRAZGVmaW5lICdiYWNrQnV0dG9uJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmJhY2tCdXR0b25cblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLmJhY2tCdXR0b24gPSB2YWx1ZVxuXHRcdFx0dmFsdWUubmFtZSA9IEBjdXN0b20uYmFja0J1dHRvbl9uYW1lXG5cblx0XHRcdHZhbHVlLnBhcmVudCA9IEBcblx0XHRcdHZhbHVlLmJyaW5nVG9Gcm9udCgpXG5cdFx0XHRcblx0XHRcdHRyeSB2YWx1ZS5oYW5kbGVyID0gKCkgPT5cblx0XHRcdFx0QGZsb3cuc2hvd1ByZXZpb3VzKClcblx0XHRcdFx0IyBAZmxvdy5pdGVyYXRlVGhyb3VnaENoaWxkcmVuIEAsIEBjdXN0b20uY3VzdG9tQWN0aW9uX0FycmF5LCBAZmxvdy5jdXN0b21BY3Rpb25fc3dpdGNoT2ZmTGF5ZXJzXG5cdFxuXHRAZGVmaW5lICdzaG93QmFjaycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93QmFja1xuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuc2hvd0JhY2sgPSB2YWx1ZVxuXHRcdFx0aWYgdmFsdWUgPT0gdHJ1ZSBhbmQgQGJhY2tCdXR0b24gPT0gbnVsbFxuXHRcdFx0XHRAYmFja0J1dHRvbiA9IEBjcmVhdGVfQmFja0J1dHRvbigpXG5cblx0XG5cdGNyZWF0ZV9CYWNrQnV0dG9uOiAoKSA9PlxuXHRcdHJldHVybiBuZXcgQnV0dG9uXG5cdFx0XHRuYW1lOiBAY3VzdG9tLmJhY2tCdXR0b25fbmFtZVxuXHRcdFx0cGFyZW50OiBALCBzaXplOiA4MCwgeTogMzJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0IyBiYWNrZ3JvdW5kQ29sb3I6IFwicmVkXCJcblx0XHRcdGhhbmRsZXI6ICgpIC0+IEBwYXJlbnQuZmxvdy5zaG93UHJldmlvdXMoKVxuXHRcblx0Y3JlYXRlX0J1dHRvbnM6ICgpID0+XG5cdFx0XG5cdFx0Zm9yIGJ1dHRvbk5hbWUgb2YgQGJ1dHRvbnNcblx0XHRcdGJ1dHRvbk9wdGlvbnMgPSBAYnV0dG9uc1tidXR0b25OYW1lXVxuXHRcdFx0aWYgYnV0dG9uT3B0aW9ucy5maXhlZCB0aGVuIGJ1dHRvblBhcmVudCA9IEAgZWxzZSBidXR0b25QYXJlbnQgPSBAY29udGVudFxuXG5cdFx0XHRidXR0b25PcHRpb25zMiA9IF8uZXh0ZW5kKHt9LCBidXR0b25PcHRpb25zLCB7cGFyZW50OiBidXR0b25QYXJlbnR9KVxuXHRcdFx0YnV0dG9uID0gbmV3IEJ1dHRvbihidXR0b25PcHRpb25zMilcblx0XHRcdFxuXHRcdFx0IyBpZiBidXR0b25PcHRpb25zLmhhbmRsZXIgdGhlbiBidXR0b24uaGFuZGxlciA9IGJ1dHRvbk9wdGlvbnMuaGFuZGxlclxuXHRcdFx0QGN1c3RvbS5idXR0b25MYXllcnMucHVzaCBidXR0b25cblxuXG5cdEBkZWZpbmUgXCJwYXJlbnRcIixcblx0XHRlbnVtZXJhYmxlOiBmYWxzZVxuXHRcdGV4cG9ydGFibGU6IGZhbHNlXG5cdFx0aW1wb3J0YWJsZTogdHJ1ZVxuXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QF9wYXJlbnQgb3IgbnVsbFxuXHRcdFxuXHRcdHNldDogKGxheWVyKSAtPlxuXG5cdFx0XHRyZXR1cm4gaWYgbGF5ZXIgaXMgQF9wYXJlbnRcblxuXHRcdFx0dGhyb3cgRXJyb3IoXCJMYXllci5wYXJlbnQ6IGEgbGF5ZXIgY2Fubm90IGJlIGl0J3Mgb3duIHBhcmVudC5cIikgaWYgbGF5ZXIgaXMgQFxuXG5cdFx0XHQjIENoZWNrIHRoZSB0eXBlXG5cdFx0XHRpZiBub3QgbGF5ZXIgaW5zdGFuY2VvZiBMYXllclxuXHRcdFx0XHR0aHJvdyBFcnJvciBcIkxheWVyLnBhcmVudCBuZWVkcyB0byBiZSBhIExheWVyIG9iamVjdFwiXG5cblx0XHRcdCMgQ2FuY2VsIHByZXZpb3VzIHBlbmRpbmcgaW5zZXJ0aW9uc1xuXHRcdFx0VXRpbHMuZG9tQ29tcGxldGVDYW5jZWwoQF9faW5zZXJ0RWxlbWVudClcblxuXHRcdFx0IyBSZW1vdmUgZnJvbSBwcmV2aW91cyBwYXJlbnQgY2hpbGRyZW5cblx0XHRcdGlmIEBfcGFyZW50XG5cdFx0XHRcdEBfcGFyZW50Ll9jaGlsZHJlbiA9IF8ucHVsbCBAX3BhcmVudC5fY2hpbGRyZW4sIEBcblx0XHRcdFx0QF9wYXJlbnQuX2VsZW1lbnQucmVtb3ZlQ2hpbGQgQF9lbGVtZW50XG5cdFx0XHRcdEBfcGFyZW50LmVtaXQgXCJjaGFuZ2U6Y2hpbGRyZW5cIiwge2FkZGVkOiBbXSwgcmVtb3ZlZDogW0BdfVxuXHRcdFx0XHRAX3BhcmVudC5lbWl0IFwiY2hhbmdlOnN1YkxheWVyc1wiLCB7YWRkZWQ6IFtdLCByZW1vdmVkOiBbQF19XG5cblx0XHRcdCMgRWl0aGVyIGluc2VydCB0aGUgZWxlbWVudCB0byB0aGUgbmV3IHBhcmVudCBlbGVtZW50IG9yIGludG8gZG9tXG5cdFx0XHRpZiBsYXllclxuXHRcdFx0XHRsYXllci5fZWxlbWVudC5hcHBlbmRDaGlsZCBAX2VsZW1lbnRcblx0XHRcdFx0bGF5ZXIuX2NoaWxkcmVuLnB1c2ggQFxuXHRcdFx0XHRsYXllci5lbWl0IFwiY2hhbmdlOmNoaWxkcmVuXCIsIHthZGRlZDogW0BdLCByZW1vdmVkOiBbXX1cblx0XHRcdFx0bGF5ZXIuZW1pdCBcImNoYW5nZTpzdWJMYXllcnNcIiwge2FkZGVkOiBbQF0sIHJlbW92ZWQ6IFtdfVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAX2luc2VydEVsZW1lbnQoKVxuXG5cdFx0XHRvbGRQYXJlbnQgPSBAX3BhcmVudFxuXHRcdFx0IyBTZXQgdGhlIHBhcmVudFxuXHRcdFx0QF9wYXJlbnQgPSBsYXllclxuXG5cdFx0XHQjIFBsYWNlIHRoaXMgbGF5ZXIgb24gdG9wIG9mIGl0cyBzaWJsaW5nc1xuXHRcdFx0QGJyaW5nVG9Gcm9udCgpXG5cblx0XHRcdEBlbWl0IFwiY2hhbmdlOnBhcmVudFwiLCBAX3BhcmVudCwgb2xkUGFyZW50XG5cdFx0XHRAZW1pdCBcImNoYW5nZTpzdXBlckxheWVyXCIsIEBfcGFyZW50LCBvbGRQYXJlbnRcblxuXHRcdFx0QHdpZHRoID0gQHBhcmVudC53aWR0aFxuXHRcdFx0QGhlaWdodCA9IEBwYXJlbnQuaGVpZ2h0XG5cblx0XHRcdEBmbG93ID0gQHBhcmVudFxuXG5cdFxuXG5cblx0YWRkOiAoY29udGVudFZpZXcpIC0+XG5cdFx0Y29udGVudFZpZXcucGFyZW50ID0gQGNvbnRlbnRcblxuXG5cbm1vZHVsZS5leHBvcnRzID0geyBGbG93VmlldywgTmF2aWdhdGlvblZpZXcsIE1vZGFsVmlldyB9IiwiIyBQcmV2aWV3IENvbXBvbmVudFxuXG5GcmFtZXIuRGVmYXVsdHMuQW5pbWF0aW9uID1cblx0Y3VydmU6IFNwcmluZyhkYW1waW5nOiAxKVxuXHR0aW1lOiAwLjVcblxuIyB7UHJldmlld19DbGFzc30gPSByZXF1aXJlIFwiUHJldmlld19DbGFzc1wiXG4jIHtQcmV2aWV3X0luaXR9ID0gcmVxdWlyZSBcIlByZXZpZXdfSW5pdFwiXG57UHJldmlld19VSX0gPSByZXF1aXJlIFwiUHJldmlld19VSVwiXG4jIHtDb250cm9sX0NsYXNzfSA9IHJlcXVpcmUgXCJDb250cm9sX0NsYXNzXCJcblxuY2xhc3MgRml4UHJldmlld0V4cG9ydCBleHRlbmRzIFByZXZpZXdfVUlcbmNsYXNzIGV4cG9ydHMuUHJldmlldyBleHRlbmRzIEZpeFByZXZpZXdFeHBvcnRcblxueyBMb2dWaWV3IH0gPSByZXF1aXJlIFwiTG9nVmlld1wiXG5cblxuIyBOYXRpdmVcblxuYHdpbmRvdy5zYXZlUHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QgPSBmdW5jdGlvbiAobGF5ZXIpIHtcblx0d2luZG93LnByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0ID0gbGF5ZXJcbn1cbmBcblxuYHdpbmRvdy5yZWNlaXZlTWVzc2FnZU5vcm1hbCA9IGZ1bmN0aW9uIChldmVudCkge1xuXHR3aW5kb3cucHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QuYW5pbWF0ZVN0YXRlVG9Ob3JtYWwoKVxufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRlTm9ybWFsXCIsIHJlY2VpdmVNZXNzYWdlTm9ybWFsLCBmYWxzZSk7XG5gXG5cbmB3aW5kb3cucmVjZWl2ZU1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0Y29uc29sZS5sb2coZXZlbnQpXG5cdHdpbmRvdy5wcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdC5hbmltYXRlU3RhdGVUb0ZpbGwoKVxufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRlRmlsbFwiLCByZWNlaXZlTWVzc2FnZSwgZmFsc2UpO1xuYFxuXG5cblxuXG5cblxuIiwiXG5cbm92ZXJyaWRlVGltZVZhbHVlID0gXCIyMDoyNVwiXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld19DbGFzcyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRzdGF0ZUd1YXJkTGF5ZXIgPSBuZXcgTGF5ZXIgeyBvcGFjaXR5OiAwLCBzaXplOiAxIH1cblx0XHRzdGF0ZUd1YXJkTGF5ZXIuc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgc2NhbGU6IDEgfVxuXHRcdFx0XCJmaWxsXCI6IHsgc2NhbGU6IDEgfVxuXHRcdHN0YXRlR3VhcmRMYXllci5zdGF0ZVN3aXRjaChcImZpbGxcIilcblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRuYW1lOiBcIlByZXZpZXdcIlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRib3JkZXJSYWRpdXM6IDQyXG5cblx0XHRcdHN0YXRlR3VhcmQ6IHN0YXRlR3VhcmRMYXllclxuXHRcdFx0dmlldzogbnVsbFxuXG5cdFx0XHRib3JkZXJWaWV3OiBudWxsXG5cdFx0XHRzdGF0dXNCYXJWaWV3OiBudWxsXG5cdFx0XHRob21lQmFyVmlldzogbnVsbFxuXG5cdFx0XHRjb25maWdWaWV3OiBudWxsXG5cdFx0XHRzZWN0aW9uVmlldzogbnVsbFxuXHRcdFx0XG5cblxuXHRcdFx0IyBEZXZpY2Vcblx0XHRcdHNob3dEZXZpY2U6IHRydWVcblxuXHRcdFx0IyBCYXJzXG5cdFx0XHRzaG93QmFyczogdHJ1ZVxuXHRcdFx0c2hvd1N0YXR1c0JhcjogdHJ1ZVxuXHRcdFx0c2hvd0hvbWVCYXI6IHRydWVcblxuXHRcdFx0dGltZVZhbHVlOiBvdmVycmlkZVRpbWVWYWx1ZSAjIG5vIG92ZXJyaWRlXG5cdFx0XHRmb3JjZUFuZHJvaWRCYXI6IGZhbHNlXG5cdFx0XHRzdGF0dXNCYXJfdGhlbWU6IFwiZGFya1wiXG5cdFx0XHRob21lQmFyX3RoZW1lOiBcImRhcmtcIlxuXG5cdFx0XHQjIENvbnRyb2xzXG5cdFx0XHRzaG93VUk6IHRydWVcblx0XHRcdHNob3dMb2dvOiB0cnVlXG5cdFx0XHRzaG93SGludHM6IHRydWVcblxuXHRcdFx0IyBTY2FsZVxuXHRcdFx0c2NhbGVTdGF0ZTogXCJmaWxsXCIgIyBmaWxsIC8gbm9ybWFsXG5cdFx0XHRzY2FsZUdhcDogNTZcblx0XHRcdFxuXHRcdFx0XG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdHdpbmRvdy5zYXZlUHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QoQClcblx0XHRAdXBkYXRlSW5pdCgpXG5cdFx0XG5cdFx0QHN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IHNjYWxlOiAxIH1cblx0XHRcdFwiZmlsbFwiOiB7IHNjYWxlOiAxIH1cblxuXG5cblx0QGRlZmluZSAndmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy52aWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy52aWV3ID0gdmFsdWVcblx0XHRcdEB3aWR0aCA9IEB2aWV3LndpZHRoXG5cdFx0XHRAaGVpZ2h0ID0gQHZpZXcuaGVpZ2h0XG5cdFx0XHRAdmlldy5wYXJlbnQgPSBAXG5cdFxuXHRAZGVmaW5lICdzdGF0ZUd1YXJkJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnN0YXRlR3VhcmRcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc3RhdGVHdWFyZCA9IHZhbHVlXG5cblxuXG5cdEBkZWZpbmUgJ2RldmljZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ib3JkZXJWaWV3XG5cdFxuXHRAZGVmaW5lICdzdGF0dXNCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc3RhdHVzQmFyVmlld1xuXHRcblx0QGRlZmluZSAnaG9tZUJhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ob21lQmFyVmlld1xuXG5cblxuXHRAZGVmaW5lICdib3JkZXJWaWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmJvcmRlclZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuYm9yZGVyVmlldyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdzdGF0dXNCYXJWaWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnN0YXR1c0JhclZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc3RhdHVzQmFyVmlldyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdob21lQmFyVmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ob21lQmFyVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ob21lQmFyVmlldyA9IHZhbHVlXG5cblxuXG5cdEBkZWZpbmUgJ2NvbmZpZ1ZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuY29uZmlnVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5jb25maWdWaWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3NlY3Rpb25WaWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNlY3Rpb25WaWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNlY3Rpb25WaWV3ID0gdmFsdWVcblx0XG5cblx0XG5cdFxuXHRcblxuXHRhbmltYXRlU3RhdGVUb05vcm1hbDogKCkgPT5cblx0XHRAc3RhdGVHdWFyZC5zdGF0ZVN3aXRjaChcIm5vcm1hbFwiKVxuXHRcdEBhbmltYXRlKHNjYWxlOiBAc3RhdGVzW1wibm9ybWFsXCJdLnNjYWxlLCBvcHRpb25zOiB7IGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSB9KVxuXHRcdGlmIEBib3JkZXJWaWV3IHRoZW4gQGJvcmRlclZpZXcuYW5pbWF0ZVN0YXRlVG9Ob3JtYWwoKVxuXHRcblx0YW5pbWF0ZVN0YXRlVG9GaWxsOiAoKSA9PlxuXHRcdEBzdGF0ZUd1YXJkLnN0YXRlU3dpdGNoKFwiZmlsbFwiKVxuXHRcdEBhbmltYXRlKHNjYWxlOiBAc3RhdGVzW1wiZmlsbFwiXS5zY2FsZSwgb3B0aW9uczogeyBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUgfSlcblx0XHRpZiBAYm9yZGVyVmlldyB0aGVuIEBib3JkZXJWaWV3LmFuaW1hdGVTdGF0ZVRvRmlsbCgpXG5cblx0c3RhdGVTd2l0Y2hUb05vcm1hbDogKCkgPT5cblx0XHRAc3RhdGVHdWFyZC5zdGF0ZVN3aXRjaChcIm5vcm1hbFwiKVxuXHRcdEBhbmltYXRlKHNjYWxlOiBAc3RhdGVzW1wibm9ybWFsXCJdLnNjYWxlLCBvcHRpb25zOiB7IGN1cnZlOiBCZXppZXIubGluZWFyLCB0aW1lOiAwIH0pXG5cdFx0aWYgQGJvcmRlclZpZXcgdGhlbiBAYm9yZGVyVmlldy5zdGF0ZVN3aXRjaFRvTm9ybWFsKClcblx0XG5cdHN0YXRlU3dpdGNoVG9GaWxsOiAoKSA9PlxuXHRcdEBzdGF0ZUd1YXJkLnN0YXRlU3dpdGNoKFwiZmlsbFwiKVxuXHRcdEBhbmltYXRlKHNjYWxlOiBAc3RhdGVzW1wiZmlsbFwiXS5zY2FsZSwgb3B0aW9uczogeyBjdXJ2ZTogQmV6aWVyLmxpbmVhciwgdGltZTogMCB9KVxuXHRcdGlmIEBib3JkZXJWaWV3IHRoZW4gQGJvcmRlclZpZXcuc3RhdGVTd2l0Y2hUb0ZpbGwoKVxuXHRcblxuXHRcblx0XG5cblx0QGRlZmluZSAnc2hvd0RldmljZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93RGV2aWNlXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNob3dEZXZpY2UgPSB2YWx1ZVxuXHRcblxuXG5cdEBkZWZpbmUgJ3Nob3dCYXJzJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNob3dCYXJzXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNob3dCYXJzID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3Nob3dTdGF0dXNCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2hvd1N0YXR1c0JhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zaG93U3RhdHVzQmFyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3Nob3dIb21lQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNob3dIb21lQmFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNob3dIb21lQmFyID0gdmFsdWVcblxuXG5cblxuXG5cdEBkZWZpbmUgJ3RpbWVWYWx1ZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50aW1lVmFsdWVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudGltZVZhbHVlID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2ZvcmNlQW5kcm9pZEJhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuZm9yY2VBbmRyb2lkQmFyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3N0YXR1c0Jhcl90aGVtZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zdGF0dXNCYXJfdGhlbWVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc3RhdHVzQmFyX3RoZW1lID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2hvbWVCYXJfdGhlbWUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaG9tZUJhcl90aGVtZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ob21lQmFyX3RoZW1lID0gdmFsdWVcblxuXG5cblxuXHRAZGVmaW5lICdzaG93VUknLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2hvd1VJXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNob3dVSSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdzaG93TG9nbycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93TG9nb1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zaG93TG9nbyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdzaG93SGludHMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2hvd0hpbnRzXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNob3dIaW50cyA9IHZhbHVlXG5cdFxuXHRcblx0XG5cblxuXHRAZGVmaW5lICdzY2FsZVN0YXRlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNjYWxlU3RhdGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2NhbGVTdGF0ZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdzY2FsZUdhcCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zY2FsZUdhcFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zY2FsZUdhcCA9IHZhbHVlXG5cblxuXG5cblxuXHR1cGRhdGVJbml0OiAoKSA9PlxuXG5cdFx0QHNjYWxlU3RhdGUgPSBAZ2V0U3RhdGVHZW5lcmljKFwic2NhbGVcIiwgW3sgdmFsdWU6IFwiZmlsbFwiLCByZXN1bHQ6IFwiZmlsbFwiIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm5vcm1hbFwiLCByZXN1bHQ6IFwibm9ybWFsXCIgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwiZmFsc2VcIiwgcmVzdWx0OiBcIm5vcm1hbFwiIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcInRydWVcIiwgcmVzdWx0OiBcImZpbGxcIiB9XSwgQHNjYWxlU3RhdGUpXG5cdFx0XG5cdFx0QHNjYWxlU3RhdGUgPSBAZ2V0U3RhdGVHZW5lcmljKFwiZmlsbFwiLCBbeyB2YWx1ZTogXCJvblwiLCByZXN1bHQ6IFwiZmlsbFwiIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9mZlwiLCByZXN1bHQ6IFwibm9ybWFsXCIgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwidHJ1ZVwiLCByZXN1bHQ6IFwiZmlsbFwiIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogXCJub3JtYWxcIiB9XSwgQHNjYWxlU3RhdGUpXG5cdFx0XG5cdFx0QHNob3dVSSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJidXR0b25cIiwgW3sgdmFsdWU6IFwiZmFsc2VcIiwgcmVzdWx0OiBmYWxzZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogdHJ1ZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvblwiLCByZXN1bHQ6IHRydWUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogZmFsc2UgfV0sIEBzaG93VUkpXG5cdFx0XG5cdFx0QHNob3dVSSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJ1aVwiLCBbeyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcInRydWVcIiwgcmVzdWx0OiB0cnVlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9uXCIsIHJlc3VsdDogdHJ1ZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvZmZcIiwgcmVzdWx0OiBmYWxzZSB9XSwgQHNob3dVSSlcblxuXHRcdEBzaG93TG9nbyA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJsb2dvXCIsIFt7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwidHJ1ZVwiLCByZXN1bHQ6IHRydWUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwib25cIiwgcmVzdWx0OiB0cnVlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9mZlwiLCByZXN1bHQ6IGZhbHNlIH1dLCBAc2hvd0xvZ28pXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRAc2hvd0RldmljZSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJkZXZpY2VcIiwgW3sgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvblwiLCByZXN1bHQ6IHRydWUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwidHJ1ZVwiLCByZXN1bHQ6IHRydWUgfV0sIEBzaG93RGV2aWNlKVxuXHRcdFxuXHRcdEBzaG93SGludHMgPSBAZ2V0U3RhdGVHZW5lcmljKFwiaGludHNcIiwgW3sgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvblwiLCByZXN1bHQ6IHRydWUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwidHJ1ZVwiLCByZXN1bHQ6IHRydWUgfV0sIEBzaG93SGludHMpXG5cblxuXG5cdCMgZ2V0U3RhdGVHZW5lcmljOiAoa2V5ID0gXCJzY2FsZVwiLCBwYWlycyA9IFt7IHZhbHVlOiAsIHJlc3VsdDogfSwge3ZhbHVlOiAsIHJlc3VsdDogfV0sIGRlZmF1bHRSZXN1bHQgPSBcIlwiKVxuXHRnZXRTdGF0ZUdlbmVyaWM6IChzdGF0ZUtleSA9IFwic2NhbGVcIiwgc3RhdGVQYWlycyA9IFtdLCBkZWZhdWx0UmVzdWx0ID0gXCJcIikgPT5cblx0XHRyZXN1bHQgPSBkZWZhdWx0UmVzdWx0XG5cblx0XHRmb3IgaXRlbSBpbiBsb2NhdGlvbi5zZWFyY2hbMS4uXS5zcGxpdCgnJicpXG5cdFx0XHRrZXlWYWx1ZVBhaXIgPSBpdGVtLnNwbGl0KFwiPVwiKVxuXHRcdFx0a2V5UGFydCA9IGtleVZhbHVlUGFpclswXVxuXHRcdFx0dmFsdWVQYXJ0ID0ga2V5VmFsdWVQYWlyWzFdXG5cblx0XHRcdGlmIGtleVBhcnQgPT0gc3RhdGVLZXlcblx0XHRcdFx0Zm9yIHBhaXIgaW4gc3RhdGVQYWlyc1xuXHRcdFx0XHRcdGlmIHZhbHVlUGFydCA9PSBwYWlyLnZhbHVlXG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBwYWlyLnJlc3VsdFxuXHRcdFx0XHRcdCMgZWxzZVxuXHRcdFx0XHRcdFx0IyBwcmludCBcIm5vdCBcIiArIFwiICN7cGFpci52YWx1ZX1cIiBcblx0XHRcblx0XHRyZXR1cm4gcmVzdWx0XG5cdFxuXHRcblx0XG5cdFxuIiwiXG5cbntQcmV2aWV3X0NsYXNzfSA9IHJlcXVpcmUgXCJQcmV2aWV3X0NsYXNzXCJcbntEZXZpY2VfQ2xhc3N9ID0gcmVxdWlyZSBcIkRldmljZV9DbGFzc1wiXG5cbntIb21lQmFyX0NsYXNzfSA9IHJlcXVpcmUgXCJIb21lQmFyX0NsYXNzXCJcbntTdGF0dXNCYXJfQ2xhc3N9ID0gcmVxdWlyZSBcIlN0YXR1c0Jhcl9DbGFzc1wiXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld19Jbml0IGV4dGVuZHMgUHJldmlld19DbGFzc1xuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAc2NhbGVQcmV2aWV3KClcblxuXHRcblx0XG5cdHNjYWxlUHJldmlldzogKCkgPT5cblx0XHRpZiBAc2hvd0hpbnRzIHRoZW4gRnJhbWVyLkV4dHJhcy5IaW50cy5lbmFibGUoKVxuXHRcdGVsc2UgRnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcblxuXHRcdGlmIFV0aWxzLmlzTW9iaWxlKCkgdGhlbiBAcHJldmlld01vYmlsZSgpXG5cdFx0ZWxzZSBAcHJldmlld0Rlc2t0b3AoKVxuXHRcblx0dXBkYXRlUHJldmlldzogKCkgPT5cblx0XHRpZiBAc3RhdGVHdWFyZC5zdGF0ZXMuY3VycmVudC5uYW1lID09IFwiZmlsbFwiIHRoZW4gQHN0YXRlU3dpdGNoVG9GaWxsKClcblx0XHRlbHNlIEBzdGF0ZVN3aXRjaFRvTm9ybWFsKClcblxuXHRcdCMgaWYgQGJvcmRlclZpZXdcblx0XHQjIFx0aWYgQHNjYWxlU3RhdGUgPT0gXCJmaWxsXCIgdGhlbiBAYm9yZGVyVmlldy5zdGF0ZVN3aXRjaFRvRmlsbCgpXG5cdFx0IyBcdGVsc2UgQGJvcmRlclZpZXcuc3RhdGVTd2l0Y2hUb05vcm1hbCgpXG5cdFxuXG5cblxuXHRwcmV2aWV3RGVza3RvcDogKCkgPT5cblx0XHRpZiBAc2hvd0RldmljZSB0aGVuIEBib3JkZXJWaWV3ID0gbmV3IERldmljZV9DbGFzcyB7IHZpZXc6IEAgfVxuXG5cdFx0IyBpZiBAc2hvd0hpbnRzIHRoZW4gRnJhbWVyLkV4dHJhcy5IaW50cy5lbmFibGUoKVxuXHRcdCMgZWxzZSBGcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXG5cdFx0aWYgQHNob3dCYXJzXG5cdFx0XHRpZiBAc2hvd0hvbWVCYXIgdGhlbiBAaG9tZUJhclZpZXcgPSBuZXcgSG9tZUJhcl9DbGFzcyB7IHZpZXc6IEAgfVxuXHRcdFx0aWYgQHNob3dTdGF0dXNCYXIgdGhlbiBAc3RhdHVzQmFyVmlldyA9IG5ldyBTdGF0dXNCYXJfQ2xhc3MgeyB2aWV3OiBAIH1cblxuXHRcdEBjbGlwID0gdHJ1ZVxuXHRcdEB1cGRhdGVTY2FsZSgpXG5cdFx0QHVwZGF0ZVByZXZpZXdPblJlc2l6ZSgpXG5cdFx0XG5cdFx0aWYgQHNjYWxlU3RhdGUgPT0gXCJmaWxsXCIgdGhlbiBAc3RhdGVTd2l0Y2hUb0ZpbGwoKVxuXHRcdGVsc2UgQHN0YXRlU3dpdGNoVG9Ob3JtYWwoKVxuXG5cdFxuXHRwcmV2aWV3TW9iaWxlOiAoKSA9PlxuXHRcdCMgaWYgQHNob3dIaW50cyB0aGVuIEZyYW1lci5FeHRyYXMuSGludHMuZW5hYmxlKClcblx0XHQjIGVsc2UgRnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcblx0XHRcblx0XHRAc2NhbGUgPSBTY3JlZW4ud2lkdGggLyBAd2lkdGhcblx0XHRAeCA9IEFsaWduLmNlbnRlclxuXHRcdEB5ID0gQWxpZ24uY2VudGVyXG5cblx0XG5cblx0dXBkYXRlU2NhbGU6ICgpID0+XG5cblx0XHRAeCA9IEFsaWduLmNlbnRlclxuXHRcdEB5ID0gQWxpZ24uY2VudGVyXG5cblx0XHRpZiBAYm9yZGVyVmlld1xuXHRcdFx0QGJvcmRlclZpZXcueCA9IEFsaWduLmNlbnRlclxuXHRcdFx0QGJvcmRlclZpZXcueSA9IEFsaWduLmNlbnRlclxuXG5cdFx0c2NhbGVYID0gKFNjcmVlbi53aWR0aCAtIEBzY2FsZUdhcCAqIDIpIC8gQHdpZHRoXG5cdFx0c2NhbGVZID0gKFNjcmVlbi5oZWlnaHQgLSBAc2NhbGVHYXAgKiAyKSAvIEBoZWlnaHRcblx0XHRcblx0XHRAc3RhdGVzW1wiZmlsbFwiXS5zY2FsZSA9IE1hdGgubWluKHNjYWxlWCwgc2NhbGVZKVxuXG5cdFx0aWYgQGJvcmRlclZpZXdcblx0XHRcdEBib3JkZXJWaWV3LnN0YXRlc1tcImZpbGxcIl0uc2NhbGUgPSBAc3RhdGVzW1wiZmlsbFwiXS5zY2FsZVxuXG5cblxuXG5cblxuXG5cblx0dXBkYXRlUHJldmlld09uUmVzaXplOiAoKSA9PlxuXHRcdGxvY2FsUHJldmlldyA9IEBcblx0XHRcblx0XHRDYW52YXMub24gXCJjaGFuZ2U6aGVpZ2h0XCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlU2NhbGUoKVxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVByZXZpZXcoKVxuXHRcdFxuXHRcdENhbnZhcy5vbiBcImNoYW5nZTp3aWR0aFwiLCA9PlxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVNjYWxlKClcblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVQcmV2aWV3KClcblx0XHRcblxuXHRcdFNjcmVlbi5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZSgpXG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlUHJldmlldygpXG5cdFx0XG5cdFx0U2NyZWVuLm9uIFwiY2hhbmdlOndpZHRoXCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlU2NhbGUoKVxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVByZXZpZXcoKVxuXHRcblx0XG5cblxuIiwiXG57TG9nb0xheWVyfSA9IHJlcXVpcmUgXCJMb2dvXCJcbntQcmV2aWV3X0luaXR9ID0gcmVxdWlyZSBcIlByZXZpZXdfSW5pdFwiXG57VUlfU2VjdGlvbn0gPSByZXF1aXJlIFwiVUlfU2VjdGlvblwiXG57VUlfQ29uZmlnfSA9IHJlcXVpcmUgXCJVSV9Db25maWdcIlxuXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld19VSSBleHRlbmRzIFByZXZpZXdfSW5pdFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHNob3dEZXNrdG9wVUkoKVxuXHRcblxuXG5cdHNob3dEZXNrdG9wVUk6ICgpID0+XG5cdFx0aWYgVXRpbHMuaXNNb2JpbGUoKSB0aGVuIHJldHVyblxuXG5cdFx0aWYgQHNob3dMb2dvIHRoZW4gQGNyZWF0ZUxvZ29CdXR0b24oKVxuXHRcdGlmIEBzaG93VUkgdGhlbiBAYWRkQ29uZmlnKClcblxuXG5cblxuXG5cblx0Y3JlYXRlTG9nb0J1dHRvbjogKCkgPT5cblx0XHRcblx0XHRvcGVuSG9tZUhhbmRsZXIgPSAoKSAtPlxuXHRcdFx0d2luZG93LmxvY2F0aW9uID0gXCJodHRwczovL3RpbGxsdXIuY29tXCJcblx0XHRcblx0XHRsb2dvQnV0dG9uID0gbmV3IExvZ29MYXllclxuXHRcdFx0d2lkdGg6IDc2LCBoZWlnaHQ6IDMyXG5cdFx0XHR4OiBBbGlnbi5sZWZ0KDMyKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0aGFuZGxlcjogb3BlbkhvbWVIYW5kbGVyXG5cdFxuXG5cdGFkZFNlY3Rpb246ICh0aXRsZSwgYWN0aW9uQXJyYXkgPSBbXSkgPT5cblx0XHRpZiBAc2VjdGlvblZpZXcgPT0gbnVsbCB0aGVuIEBzZWN0aW9uVmlldyA9IG5ldyBVSV9TZWN0aW9uXG5cdFx0QHNlY3Rpb25WaWV3LmFkZFNlY3Rpb24odGl0bGUsIGFjdGlvbkFycmF5KVxuXG5cblx0IyBGaWxsIOKXiVxuXHQjIEZpbGwg4peOXG5cblx0YWRkQ29uZmlnOiAoKSA9PlxuXHRcdEBjb25maWdWaWV3ID0gbmV3IFVJX0NvbmZpZyB7IHZpZXc6IEAgfVxuXG5cdFx0c2NhbGVUdXBsZSA9IFtcIkZpdFwiLCBcIjEwMCVcIl1cblx0XHRoaW50c1R1cGxlID0gW1wiSGludHMg4peJXCIsIFwiSGludHMg4peOXCJdXG5cblxuXHRcdHRvZ2dsZVNjYWxlID0gKGVtcHR5RGF0YSwgbG9jYWxCdXR0b24pID0+XG5cdFx0XHRpZiBAc3RhdGVHdWFyZC5zdGF0ZXMuY3VycmVudC5uYW1lID09IFwibm9ybWFsXCJcblx0XHRcdFx0QGFuaW1hdGVTdGF0ZVRvRmlsbCgpXG5cdFx0XHRcdGxvY2FsQnV0dG9uLnRleHQgPSBzY2FsZVR1cGxlWzBdXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBhbmltYXRlU3RhdGVUb05vcm1hbCgpXG5cdFx0XHRcdGxvY2FsQnV0dG9uLnRleHQgPSBzY2FsZVR1cGxlWzFdXG5cdFx0XHRcdFxuXHRcdFxuXHRcdHRvZ2dsZVRpcHMgPSAoZW1wdHlEYXRhLCBsb2NhbEJ1dHRvbikgPT5cblx0XHRcdGlmIEBzaG93SGludHNcblx0XHRcdFx0QGhpZGVIaW50c0hhbmRsZXIoKVxuXHRcdFx0XHRsb2NhbEJ1dHRvbi50ZXh0ID0gaGludHNUdXBsZVsxXVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAc2hvd0hpbnRzSGFuZGxlcigpXG5cdFx0XHRcdGxvY2FsQnV0dG9uLnRleHQgPSBoaW50c1R1cGxlWzBdXG5cdFx0XG5cdFx0aW5pdFNjYWxlVGl0bGUgPSBpZiBAc2hvd0hpbnRzIHRoZW4gaGludHNUdXBsZVswXSBlbHNlIGhpbnRzVHVwbGVbMV1cblx0XHRpbml0U3RhdGVUaXRsZSA9IGlmIEBzdGF0ZUd1YXJkLnN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJub3JtYWxcIiB0aGVuIHNjYWxlVHVwbGVbMV0gZWxzZSBzY2FsZVR1cGxlWzBdXG5cblx0XHQjIHByaW50IGluaXRTY2FsZVRpdGxlICsgXCIgXCIgKyBpbml0U3RhdGVUaXRsZVxuXG5cdFx0QGNvbmZpZ1ZpZXcuYWRkU2VjdGlvbihbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBpbml0U2NhbGVUaXRsZSxcblx0XHRcdFx0aGFuZGxlcjogdG9nZ2xlVGlwc1xuXHRcdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogaW5pdFN0YXRlVGl0bGUsXG5cdFx0XHRcdGhhbmRsZXI6IHRvZ2dsZVNjYWxlXG5cdFx0XHR9LFxuXHRcdF0pXG5cdFxuXHRcblx0aGlkZUhpbnRzSGFuZGxlcjogKCkgPT5cblx0XHRGcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXHRcdEBzaG93SGludHMgPSAhQHNob3dIaW50c1xuXG5cdHNob3dIaW50c0hhbmRsZXI6ICgpID0+XG5cdFx0RnJhbWVyLkV4dHJhcy5IaW50cy5lbmFibGUoKVxuXHRcdEZyYW1lci5FeHRyYXMuSGludHMuc2hvd0hpbnRzKClcblx0XHRAc2hvd0hpbnRzID0gIUBzaG93SGludHNcbiIsIlxuXG5jbGFzcyBleHBvcnRzLlN0YXR1c0Jhcl9DbGFzcyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0cGFyZW50OiBAdmlld1xuXHRcdFx0d2lkdGg6IEB2aWV3LndpZHRoXG5cblx0XHRcdHk6IEFsaWduLnRvcCwgbmFtZTogXCIuc3RhdHVzIGJhclwiLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblxuXHRcdFx0dGhlbWU6IEB2aWV3LnN0YXR1c0Jhcl90aGVtZVxuXHRcdFx0Zm9yY2VBbmRyb2lkOiBAdmlldy5mb3JjZUFuZHJvaWRCYXJcblx0XHRcdHByb3RvdHlwZUNyZWF0aW9uWWVhcjogQHZpZXcudGltZVZhbHVlXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBjcmVhdGUoKVxuXG5cblxuXG5cblx0QGRlZmluZSAndmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy52aWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnZpZXcgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAndGhlbWUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudGhlbWVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudGhlbWUgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnZm9yY2VBbmRyb2lkJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWQgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgJ3Byb3RvdHlwZUNyZWF0aW9uWWVhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5wcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyID0gdmFsdWVcblxuXG5cblxuXHR2aWV3U2l6ZTogKHcsIGgpID0+IHJldHVybiBAdmlldy53aWR0aCA9PSB3IGFuZCBAdmlldy5oZWlnaHQgPT0gaFxuXG5cdGNyZWF0ZTogKCkgPT5cblx0XHRcblx0XHRpZiBAZm9yY2VBbmRyb2lkIHRoZW4gQGNyZWF0ZUNsYXNzaWNBbmRyb2lkU3RhdHVzQmFyKCkgXG5cblx0XHRlbHNlIGlmIEB2aWV3U2l6ZSgzNzUsIDgxMikgb3IgQHZpZXdTaXplKDM5MCwgODQ0KSBvciBAdmlld1NpemUoNDE0LCA4OTYpIG9yIEB2aWV3U2l6ZSg0MjgsIDkyNikgb3IgQHZpZXdTaXplKDM2MCwgNzgyKVxuXHRcdFx0QGNyZWF0ZU5vdGNoU3RhdHVzQmFyKClcblx0XHRcblx0XHRlbHNlIGlmIEB2aWV3U2l6ZSgzOTMsIDg1Milcblx0XHRcdEBjcmVhdGVOb3RjaFN0YXR1c0JhcigpXG5cdFx0XG5cdFx0ZWxzZSBpZiBAdmlld1NpemUoMzc1LCA2NjcpIG9yIEB2aWV3U2l6ZSg0MTQsIDczNikgb3IgQHZpZXdTaXplKDMyMCwgNTY4KVxuXHRcdFx0QGNyZWF0ZUNsYXNzaWNTdGF0dXNCYXIoKVxuXHRcdFxuXHRcdFxuXHRcdGVsc2UgQGNyZWF0ZUFuZHJvaWRTdGF0dXNCYXIoKVxuXHRcblx0XG5cdFxuXHRcblxuXG5cblx0Y3JlYXRlQW5kcm9pZFN0YXR1c0JhcjogKCkgPT5cblx0XHRAaGVpZ2h0ID0gMzJcblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogNTIsIGhlaWdodDogMjAsIHg6IEFsaWduLmxlZnQoNCksIHk6IEFsaWduLnRvcCgyICsgNSlcblx0XHRcdGNvbG9yOiBkZXZpY2VfYXNzZXRzLmNvbG9yW0B0aGVtZV0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDE0LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDEwMCwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ucmlnaHQoLTQpLCB5OiBBbGlnbi50b3AoNSlcblx0XHRcdGltYWdlOiBkZXZpY2VfYXNzZXRzLmFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlW0B0aGVtZV1cblx0XG5cdFxuXHRjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0JhcjogKCkgPT5cblx0XHRAaGVpZ2h0ID0gMjBcblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogNTIsIGhlaWdodDogMjAsIHg6IEFsaWduLmxlZnQsIHk6IEFsaWduLnRvcCgyKVxuXHRcdFx0Y29sb3I6IGRldmljZV9hc3NldHMuY29sb3JbQHRoZW1lXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTQsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogMTAwLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5yaWdodCwgeTogQWxpZ24udG9wKClcblx0XHRcdGltYWdlOiBkZXZpY2VfYXNzZXRzLmFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlW0B0aGVtZV1cblx0XG5cdFxuXG5cblxuXHRjcmVhdGVDbGFzc2ljU3RhdHVzQmFyOiAoKSA9PlxuXHRcdEBoZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNMZWZ0Q29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiAxMDAsIGhlaWdodDogQGhlaWdodCwgeDogQWxpZ24ubGVmdFxuXHRcdFx0aW1hZ2U6IGRldmljZV9hc3NldHMub2xkU3RhdHVzQmFyTGVmdEltYWdlW0B0aGVtZV1cblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogNTQsIGhlaWdodDogMTYsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRjb2xvcjogZGV2aWNlX2Fzc2V0cy5jb2xvcltAdGhlbWVdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiAxMDAsIGhlaWdodDogQGhlaWdodCwgeDogQWxpZ24ucmlnaHRcblx0XHRcdGltYWdlOiBkZXZpY2VfYXNzZXRzLm9sZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHRoZW1lXVxuXHRcdFxuXHRcblx0Y3JlYXRlTm90Y2hTdGF0dXNCYXI6ICgpID0+XG5cdFx0QGhlaWdodCA9IDQ0XG5cdFx0XG5cdFx0bm90Y2hMZWZ0Q29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogNTQsIGhlaWdodDogMjEsIHg6IEFsaWduLmxlZnQoMjEpLCB5OiBBbGlnbi50b3AoMTIpXG5cdFx0XHRjb2xvcjogZGV2aWNlX2Fzc2V0cy5jb2xvcltAdGhlbWVdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGwsIGxldHRlclNwYWNpbmc6IC0wLjE3XG5cdFx0XHRmb250U2l6ZTogMTUsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRub3RjaENlbnRlckNvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogMzc1LCBoZWlnaHQ6IEBoZWlnaHQsIHg6IEFsaWduLmNlbnRlclxuXHRcdFx0aW1hZ2U6IGRldmljZV9hc3NldHMubm90Y2hcblx0XHRcblx0XHRub3RjaFJpZ2h0Q29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiAxMDAsIGhlaWdodDogQGhlaWdodCwgeDogQWxpZ24ucmlnaHRcblx0XHRcdGltYWdlOiBkZXZpY2VfYXNzZXRzLnN0YXR1c0JhclJpZ2h0SW1hZ2VbQHRoZW1lXVxuXG5cblxuXG5kZXZpY2VfYXNzZXRzID1cblx0Y29sb3I6XG5cdFx0ZGFyazogXCIjMDAwXCJcblx0XHRsaWdodDogXCIjRkZGXCJcblx0XG5cdHN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhckxlZnRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfbGVmdF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdGFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9hbmRyb2lkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdFxuXG5cblx0bm90Y2g6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9ub3RjaC5wbmdcIlxuXHR0aXA6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3RpcC5wbmdcIiIsIlxuY2xhc3MgVGV4dCBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHQjIGZvbnRGYW1pbHk6IGZvbnRBdmVyaWFcblx0XHRcdGZvbnRTaXplOiAxOFxuXHRcdFx0d2VpZ2h0OiA3MDBcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdGhlaWdodDogMjBcblx0XHRcdGxldHRlclNwYWNpbmc6IDAuN1xuXHRcdFx0bGV0dGVyU3BhY2luZzogMC40XG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBzdHlsZSA9XG5cdFx0XHRcImZvbnQtZmFtaWx5XCI6IFwiJ1NGIFBybyBUZXh0JywgJ1BUIFNhbnMnLCAnSGVsdmV0aWNhJywgJ1RhaG9tYScsIHNhbnMtc2VyaWY7XCJcblx0XHRcdFwiZm9udC13ZWlnaHRcIjogNzAwXG5cdFx0XHRcIi13ZWJraXQtZm9udC1mZWF0dXJlLXNldHRpbmdzXCI6IFwiJ3NzMDInIG9uLCAnc3MwNicgb24sICdzczA5JyBvbiwgJ3NzMTEnIG9uO1wiXG5cdFx0XHRcIi1tb3otZm9udC1mZWF0dXJlLXNldHRpbmdzXCI6IFwiJ3NzMDInIG9uLCAnc3MwNicgb24sICdzczA5JyBvbiwgJ3NzMTEnIG9uO1wiXG5cdFx0XHRcIi1tcy1mb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcdFwiZm9udC1mZWF0dXJlLXNldHRpbmdzXCI6IFwiJ3NzMDInIG9uLCAnc3MwNicgb24sICdzczA5JyBvbiwgJ3NzMTEnIG9uO1wiXG5cdFx0XG5cblxuXG5jbGFzcyBUZXh0QnV0dG9uIGV4dGVuZHMgVGV4dFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR0dXBsZTogeyBub3JtYWw6IDAuNSwgaG92ZXI6IDAuOCB9XG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEBzdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcblx0XHRALm9uTW91c2VPdmVyIEBIb3ZlclxuXHRcdEAub25Nb3VzZU91dCBASG92ZXJPZmZcblxuXHRcdEB1cGRhdGVUdXBsZShAdHVwbGUpXG5cdFxuXHRcblx0XHRcblx0SG92ZXI6ID0+XG5cdFx0QG9wYWNpdHkgPSBAdHVwbGUuaG92ZXJcblx0SG92ZXJPZmY6ID0+XG5cdFx0QG9wYWNpdHkgPSBAdHVwbGUubm9ybWFsXG5cdFxuXHR1cGRhdGVUdXBsZTogKG5ld1R1cGxlKSA9PlxuXHRcdEB0dXBsZSA9IG5ld1R1cGxlXG5cdFx0QGVtaXQgRXZlbnRzLk1vdXNlT3ZlclxuXHRcdEBlbWl0IEV2ZW50cy5Nb3VzZU91dFxuXHRcblx0XG5cdEBkZWZpbmUgJ2hhbmRsZXInLFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb24oRXZlbnRzLlRhcCwgdmFsdWUpXG5cdFxuXHRAZGVmaW5lICd0dXBsZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50dXBsZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMudHVwbGUgPSB2YWx1ZVxuXG5cblxuY2xhc3MgQnV0dG9uIGV4dGVuZHMgVGV4dFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cdFx0XHRoZWlnaHQ6IDMyLCBib3JkZXJSYWRpdXM6IDhcblx0XHRcdHBhZGRpbmc6IHsgdG9wOiA2LCBib3R0b206IDcsIGxlZnQ6IDksIHJpZ2h0OiA5IH1cblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuNylcIlxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QHNob3dIaW50ID0gLT4gO1xuXHRcdEBzdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcblx0XHRALm9uTW91c2VPdmVyIEBIb3ZlclxuXHRcdEAub25Nb3VzZU91dCBASG92ZXJPZmZcblx0XHRcblx0SG92ZXI6ID0+XG5cdFx0QGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjQpXCJcblx0SG92ZXJPZmY6ID0+XG5cdFx0QGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjcpXCJcblx0XG5cdEBkZWZpbmUgJ2hhbmRsZXInLFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb24oRXZlbnRzLlRhcCwgdmFsdWUpXG5cblxuY2xhc3MgQnV0dG9uVGFiIGV4dGVuZHMgQnV0dG9uXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHNlbGVjdGVkOiB0cnVlXG5cdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0SG92ZXI6ID0+XG5cdFx0QGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjQpXCJcblx0SG92ZXJPZmY6ID0+XG5cdFx0aWYgQHNlbGVjdGVkIHRoZW4gQGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjcpXCJcblx0XHRlbHNlIEBiYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsMC4yKVwiXG5cblx0QGRlZmluZSAnc2VsZWN0ZWQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2VsZWN0ZWRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnNlbGVjdGVkID0gdmFsdWVcblx0XHRcdGlmIHZhbHVlIHRoZW4gQGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjcpXCJcblx0XHRcdGVsc2UgQGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjIpXCJcblxuXG4jIEJ1dHRvbjogU1ZHXG5cbiMgY2xhc3MgU1ZHQnV0dG9uIGV4dGVuZHMgVGV4dEJ1dHRvblxuIyBcdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG4jIFx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuIyBcdFx0XHR0ZXh0OiBcIlwiXG4jIFx0XHRcdGFzc2V0OiBudWxsXG4jIFx0XHRcdGNsaXA6IGZhbHNlXG4jIFx0XHRcdGF1dG9TaXplOiBmYWxzZVxuXHRcdFxuIyBcdFx0QHN2Z1NoYXBlID0gbmV3IFNWR0xheWVyXG4jIFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJudWxsXCIsIG5hbWU6IFwic3ZnU2hhcGVcIlxuXHRcdFxuIyBcdFx0c3VwZXIgQG9wdGlvbnNcbiMgXHRcdEBzdmdTaGFwZS5wYXJlbnQgPSBAXG4jIFx0XHRAdXBkYXRlU1ZHU2l6ZSgpXG5cdFxuXHRcbiMgXHRAZGVmaW5lICdhc3NldCcsXG4jIFx0XHRnZXQ6IC0+IEBvcHRpb25zLmFzc2V0XG4jIFx0XHRzZXQ6ICh2YWx1ZSkgLT5cbiMgXHRcdFx0QG9wdGlvbnMuYXNzZXQgPSB2YWx1ZVxuIyBcdFx0XHRAc3ZnU2hhcGUuc3RhdGVzID1cbiMgXHRcdFx0XHRcIm9uRGFya1wiOiB7IHN2ZzogdmFsdWUub25EYXJrIH1cbiMgXHRcdFx0XHRcIm9uTGlnaHRcIjogeyBzdmc6IHZhbHVlLm9uTGlnaHQgfVxuIyBcdFx0XHRAc3ZnU2hhcGUuc3RhdGVTd2l0Y2goXCJvbkRhcmtcIilcblx0XG4jIFx0dXBkYXRlU1ZHU2l6ZTogKCkgPT5cbiMgXHRcdEBzdmdTaGFwZS53aWR0aCA9IEB3aWR0aFxuIyBcdFx0QHN2Z1NoYXBlLmhlaWdodCA9IEBoZWlnaHRcblx0XG5cblxuXG5cbiMgQnV0dG9uOiBDb3B5XG5cbiMgY2xhc3MgQ29weUJ1dHRvbiBleHRlbmRzIFRleHRCdXR0b25cbiMgXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuIyBcdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcbiMgXHRcdFx0bGluazogXCJodHRwczovL3RpbGxsdXIuY29tXCJcbiMgXHRcdFx0aGFuZGxlcjogQGNvcHlIYW5kbGVyXG5cdFx0XG4jIFx0XHRAYXJlYSA9IG5ldyBMYXllclxuIyBcdFx0XHRvcGFjaXR5OiAwLCB4OiAtMzAwMCwgaHRtbDogbnVsbFxuXHRcdFxuIyBcdFx0c3VwZXIgQG9wdGlvbnNcbiMgXHRcdEBhcmVhLnBhcmVudCA9IEBcblx0XG5cdFxuIyBcdEBkZWZpbmUgJ2xpbmsnLFxuIyBcdFx0Z2V0OiAtPiBAb3B0aW9ucy5saW5rXG4jIFx0XHRzZXQ6ICh2YWx1ZSkgLT5cbiMgXHRcdFx0QG9wdGlvbnMubGluayA9IHZhbHVlXG4jIFx0XHRcdEB1cGRhdGUodmFsdWUpXG5cdFxuXHRcbiMgXHR1cGRhdGU6IChsaW5rKSA9PlxuIyBcdFx0QGFyZWEuaHRtbCA9IFwiPHRleHRhcmVhIGNsYXNzPSdqcy1jb3B5dGV4dGFyZWEtY2xhc3MnIHN0eWxlPSdvcGFjaXR5OjA7Jz4je2xpbmt9PC90ZXh0YXJlYT5cIlxuXHRcblx0XG4jIFx0Y29weUhhbmRsZXI6ID0+XG4jIFx0XHR0ZXh0RGl2ID0gQGFyZWEucXVlcnlTZWxlY3RvcignLmpzLWNvcHl0ZXh0YXJlYS1jbGFzcycpXG4jIFx0XHR0ZXh0RGl2LmZvY3VzKClcbiMgXHRcdHRleHREaXYuc2VsZWN0KClcbiMgXHRcdGRvY3VtZW50LmV4ZWNDb21tYW5kICdjb3B5J1xuXHRcdFxuIyBcdFx0b3JpZ2luVGl0bGUgPSBAdGV4dFxuIyBcdFx0QHRleHQgPSBcIkRvbmUg8J+RjFwiXG4jIFx0XHRVdGlscy5kZWxheSAxLCA9PiBAdGV4dCA9IG9yaWdpblRpdGxlXG5cblxuXG5cbiMgIyAjIEJ1dHRvbjogQ29weVxuXG4jICMgY2xhc3MgTGlua0J1dHRvbiBleHRlbmRzIFNWR0J1dHRvblxuIyAjIFx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcbiMgIyBcdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcbiMgIyBcdFx0XHRsaW5rOiBcImh0dHBzOi8vdGlsbGx1ci5jb21cIlxuIyAjIFx0XHRcdGJvcmRlcldpZHRoOiAxICogMlxuIyAjIFx0XHRcdGJvcmRlclJhZGl1czogMjAgKiAyXG4jICMgXHRcdFx0dHVwbGU6IHsgbm9ybWFsOiAxLjAsIGhvdmVyOiAwLjggfVxuXHRcdFx0XG5cdFx0XG4jICMgXHRcdEB0aW50QnV0dG9uRml4ID0gbmV3IExheWVyXG4jICMgXHRcdFx0aGVpZ2h0OiAxMjAgKiAyXG4jICMgXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG4jICMgXHRcdEBidXR0b25UZXh0ID0gbmV3IFRleHRcbiMgIyBcdFx0XHRmb250U2l6ZTogMzIgKiAyXG4jICMgXHRcdFx0dGV4dEFsaWduOiBcInJpZ2h0XCJcbiMgIyBcdFx0XHRoZWlnaHQ6IDYwICogMlxuXHRcdFxuIyAjIFx0XHRAYnV0dG9uSWNvbiA9IG5ldyBTVkdMYXllclxuIyAjIFx0XHRcdHdpZHRoOiAyNCAqIDIsIGhlaWdodDogMjQgKiAyXG4jICMgXHRcdFx0c3ZnOiBTVkcub3Blbkljb24ub25MaWdodFxuIyAjIFx0XHRcdG9wYWNpdHk6IDAuNlxuXHRcdFx0XG5cblx0XHRcbiMgIyBcdFx0c3VwZXIgQG9wdGlvbnNcblxuIyAjIFx0XHRAYnV0dG9uVGV4dC50ZXh0ID0gQHRleHRcbiMgIyBcdFx0QHRleHQgPSBcIlwiXG5cbiMgIyBcdFx0QHRpbnRCdXR0b25GaXgucGFyZW50ID0gQHBhcmVudFxuIyAjIFx0XHRAdGludEJ1dHRvbkZpeC54ID0gQWxpZ24ucmlnaHRcbiMgIyBcdFx0QHRpbnRCdXR0b25GaXgueSA9IEFsaWduLnRvcFxuXHRcdFxuIyAjIFx0XHRAcGFyZW50ID0gQHRpbnRCdXR0b25GaXhcbiMgIyBcdFx0QHkgPSBBbGlnbi50b3AoMzAgKiAyKVxuIyAjIFx0XHRAaGVpZ2h0ID0gNjAgKiAyXG5cbiMgIyBcdFx0QGJ1dHRvblRleHQucGFyZW50ID0gQFxuIyAjIFx0XHRAYnV0dG9uVGV4dC54ID0gMTYgKiAyXG4jICMgXHRcdEBidXR0b25UZXh0LnkgPSA5ICogMlxuXG4jICMgXHRcdEBidXR0b25JY29uLnBhcmVudCA9IEBcbiMgIyBcdFx0QGJ1dHRvbkljb24ueCA9IDE2ICogMiArIEBidXR0b25UZXh0LndpZHRoICsgMTYgKiAyXG4jICMgXHRcdEBidXR0b25JY29uLnkgPSBBbGlnbi5jZW50ZXIoMyAqIDIpXG5cbiMgIyBcdFx0QHdpZHRoID0gMTYgKiAyICsgQGJ1dHRvblRleHQud2lkdGggKyBAYnV0dG9uSWNvbi53aWR0aCArIDE2ICogMiArIDE2ICogMlxuIyAjIFx0XHRAdGludEJ1dHRvbkZpeC53aWR0aCA9IEB3aWR0aCArIDMwICogMiArIDE2ICogMlxuXG4jICMgXHRcdEB0aW50QnV0dG9uRml4LnggPSBBbGlnbi5yaWdodFxuIyAjIFx0XHRAeCA9IEFsaWduLnJpZ2h0KC0zMCAqIDIpXG5cdFx0XG5cdFxuXG4jICMgXHRAZGVmaW5lICdsaW5rJyxcbiMgIyBcdFx0Z2V0OiAtPiBAb3B0aW9ucy5saW5rXG4jICMgXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5saW5rID0gdmFsdWVcblx0XG4jICMgXHRzZXRDb2xvcjogKGNvbG9yID0gbnVsbCkgPT5cbiMgIyBcdFx0aWYgY29sb3IgPT0gbnVsbCB0aGVuIHJldHVyblxuIyAjIFx0XHRAdGludEJ1dHRvbkZpeC5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvclxuXHRcblxuXG5cblxuXG5cblxuXG4jIGNsYXNzIFByZXZpZXdCdXR0b24gZXh0ZW5kcyBUZXh0XG4jIFx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuIyBcdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcbiMgXHRcdFx0dHVwbGU6IHsgbm9ybWFsOiAxLjAsIGhvdmVyOiAwLjggfVxuXHRcdFxuIyBcdFx0c3VwZXIgQG9wdGlvbnNcblxuIyBcdFx0QHJlbW92ZUFsbExpc3RlbmVycygpXG5cbiMgXHRcdEAub25Nb3VzZU92ZXIgQEhvdmVyXG4jIFx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cbiMgXHRIb3ZlcjogPT5cbiMgXHRcdCMgQHNjYWxlID0gMS4wNVxuIyBcdFx0QG9wYWNpdHkgPSAxLjBcblx0XG4jIFx0SG92ZXJPZmY6ID0+XG4jIFx0XHQjIEBzY2FsZSA9IDEuMFxuIyBcdFx0QG9wYWNpdHkgPSAwLjhcblxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSB7VGV4dCwgVGV4dEJ1dHRvbiwgQnV0dG9uLCBCdXR0b25UYWJ9XG5cblxuIiwiXG5cbntVSV9TZWN0aW9ufSA9IHJlcXVpcmUgXCJVSV9TZWN0aW9uXCJcbntUZXh0LCBCdXR0b259ID0gcmVxdWlyZSBcIlVJX0J1dHRvbnNcIlxuXG5jbGFzcyBleHBvcnRzLlVJX0NvbmZpZyBleHRlbmRzIFVJX1NlY3Rpb25cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0aGVpZ2h0OiAxMDAsIHk6IEFsaWduLmJvdHRvbSgtOClcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0XHR2aWV3OiBudWxsXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEB1cGRhdGVDb25maWdPblJlc2l6ZSgpXG5cblxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudmlldyA9IHZhbHVlXG5cblxuXHR1cGRhdGVDb25maWdPblJlc2l6ZTogKCkgPT5cblx0XHRsb2NhbENvbmZpZyA9IEBcblx0XHRcblx0XHRDYW52YXMub24gXCJjaGFuZ2U6aGVpZ2h0XCIsID0+IGxvY2FsQ29uZmlnLnkgPSBBbGlnbi5ib3R0b20oLTgpXG5cblxuXG5cdCMgT3ZlcnJpZGVcblx0YWRkU2VjdGlvbjogKGFjdGlvbkFycmF5ID0gW10pID0+XG5cdFx0c2VjdGlvblZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IDM2MCwgaGVpZ2h0OiAxMDAsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0eDogMzIsIHk6IEFsaWduLmJvdHRvbSgpXG5cblx0XHRAYWRkU2VjdGlvblRpdGxlKHNlY3Rpb25WaWV3LCBcIlByZXZpZXdcIilcblx0XHRzZWN0aW9uVmlldy5zdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRzZWN0aW9uVmlldy5vblRhcCAtPiA7XG5cdFx0c2VjdGlvblZpZXcuc2hvd0hpbnQgPSAtPiA7XG5cblx0XHRzdW1YID0gMFxuXHRcdGZvciBhY3Rpb25JdGVtLCBpIGluIGFjdGlvbkFycmF5XG5cdFx0XHRzZWN0aW9uQnV0dG9uID0gQGFkZEFjdGlvbkJ1dHRvbihhY3Rpb25JdGVtLCBpKVxuXHRcdFx0c2VjdGlvbkJ1dHRvbi5wYXJlbnQgPSBzZWN0aW9uVmlld1xuXHRcdFx0c2VjdGlvbkJ1dHRvbi54ID0gc3VtWFxuXHRcdFx0c3VtWCArPSBzZWN0aW9uQnV0dG9uLndpZHRoICsgOCArIDRcblx0XHRcblx0XHRAd2lkdGggPSBNYXRoLm1heChAd2lkdGgsIHN1bVgpXG5cdFxuXG5cblx0IyBPdmVycmlkZVxuXHRhZGRBY3Rpb25CdXR0b246IChhY3Rpb25JdGVtLCBpbmRleCkgPT5cblx0XHRidXR0b25MYXllciA9IG5ldyBCdXR0b25cblx0XHRcdHRleHQ6IGFjdGlvbkl0ZW0udGl0bGVcblx0XHRcdHk6IDQyXG5cdFx0XHRzZWxlY3RlZDogaWYgaW5kZXggaXMgMCB0aGVuIHRydWUgZWxzZSBmYWxzZVxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRhY3Rpb25JdGVtOiBhY3Rpb25JdGVtXG5cdFx0XG5cdFx0Y29tcGxleEhhbmRsZXIgPSAoKSAtPlxuXHRcdFx0QGN1c3RvbS5hY3Rpb25JdGVtLmhhbmRsZXIoQGN1c3RvbS5hY3Rpb25JdGVtLmRhdGEsIEApXG5cblx0XHRidXR0b25MYXllci5vbihFdmVudHMuVGFwLCBjb21wbGV4SGFuZGxlcilcblx0XHRyZXR1cm4gYnV0dG9uTGF5ZXIiLCJcblxuXG57VGV4dCwgQnV0dG9uVGFifSA9IHJlcXVpcmUgXCJVSV9CdXR0b25zXCJcblxuY2xhc3MgZXhwb3J0cy5VSV9TZWN0aW9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0d2lkdGg6IDIwMCwgaGVpZ2h0OiBTY3JlZW4uaGVpZ2h0LCB5OiAxMDBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XG5cblx0YWRkU2VjdGlvbjogKHRpdGxlLCBhY3Rpb25BcnJheSA9IFtdKSA9PlxuXG5cdFx0c2VjdGlvblZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IDM2MCwgaGVpZ2h0OiAxMDAsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0eDogMzIsIHk6IEBjaGlsZHJlbi5sZW5ndGggKiAxMDBcblxuXHRcdEBhZGRTZWN0aW9uVGl0bGUoc2VjdGlvblZpZXcsIHRpdGxlKVxuXG5cdFx0c2VjdGlvblZpZXcuc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0c2VjdGlvblZpZXcub25UYXAgLT4gO1xuXHRcdHNlY3Rpb25WaWV3LnNob3dIaW50ID0gLT4gO1xuXG5cdFx0c3VtWCA9IDBcblx0XHRmb3IgYWN0aW9uSXRlbSwgaSBpbiBhY3Rpb25BcnJheVxuXHRcdFx0c2VjdGlvbkJ1dHRvbiA9IEBhZGRBY3Rpb25CdXR0b24oYWN0aW9uSXRlbSwgaSlcblx0XHRcdHNlY3Rpb25CdXR0b24ucGFyZW50ID0gc2VjdGlvblZpZXdcblx0XHRcdHNlY3Rpb25CdXR0b24ueCA9IHN1bVhcblx0XHRcdHN1bVggKz0gc2VjdGlvbkJ1dHRvbi53aWR0aCArIDhcblx0XHRcblx0XHRAd2lkdGggPSBNYXRoLm1heChAd2lkdGgsIHN1bVgpXG5cblxuXG5cdGFkZEFjdGlvbkJ1dHRvbjogKGFjdGlvbkl0ZW0sIGluZGV4KSA9PlxuXHRcdGJ1dHRvbkxheWVyID0gbmV3IEJ1dHRvblRhYlxuXHRcdFx0dGV4dDogYWN0aW9uSXRlbS50aXRsZVxuXHRcdFx0eTogNDJcblx0XHRcdHNlbGVjdGVkOiBpZiBpbmRleCBpcyAwIHRoZW4gdHJ1ZSBlbHNlIGZhbHNlXG5cdFx0XHRjdXN0b206XG5cdFx0XHRcdGFjdGlvbkl0ZW06IGFjdGlvbkl0ZW1cblx0XHRcblx0XHRjb21wbGV4SGFuZGxlciA9ICgpIC0+XG5cdFx0XHRAY3VzdG9tLmFjdGlvbkl0ZW0uaGFuZGxlcihAY3VzdG9tLmFjdGlvbkl0ZW0uZGF0YSwgQClcblx0XHRcdGZvciBidXR0b24gaW4gQHBhcmVudC5jaGlsZHJlblxuXHRcdFx0XHRpZiBidXR0b24ubmFtZSBpc250IFwiLnNlY3Rpb25UaXRsZVwiXG5cdFx0XHRcdFx0YnV0dG9uLnNlbGVjdGVkID0gdHJ1ZSBpZiBidXR0b24gaXMgQFxuXHRcdFx0XHRcdGJ1dHRvbi5zZWxlY3RlZCA9IGZhbHNlIGlmIGJ1dHRvbiBpc250IEBcblxuXHRcdGJ1dHRvbkxheWVyLm9uKEV2ZW50cy5UYXAsIGNvbXBsZXhIYW5kbGVyKVxuXHRcdHJldHVybiBidXR0b25MYXllclxuXG5cblx0YWRkU2VjdGlvblRpdGxlOiAobG9jYWxQYXJlbnQsIHRpdGxlID0gXCJIZWFkZXIgVGl0bGVcIikgPT5cblx0XHRuZXcgVGV4dFxuXHRcdFx0cGFyZW50OiBsb2NhbFBhcmVudFxuXHRcdFx0dGV4dDogdGl0bGUsIG5hbWU6IFwiLnNlY3Rpb25UaXRsZVwiXG5cdFx0XHRmb250U2l6ZTogMTYsIG9wYWNpdHk6IDAuNSwgcGFkZGluZzogeyB0b3A6IDEyIH1cblxuIl19
