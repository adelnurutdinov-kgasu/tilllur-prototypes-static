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


},{}],"ConfigView":[function(require,module,exports){
var Button, SectionView, Text, ref,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SectionView = require("SectionView").SectionView;

ref = require("PCButtons"), Text = ref.Text, Button = ref.Button;

exports.ConfigView = (function(superClass) {
  extend(ConfigView, superClass);

  function ConfigView(options) {
    this.options = options != null ? options : {};
    this.addActionButton = bind(this.addActionButton, this);
    this.addSection = bind(this.addSection, this);
    _.defaults(this.options, {
      height: 100,
      y: Align.bottom(-8)
    });
    ConfigView.__super__.constructor.call(this, this.options);
  }

  ConfigView.prototype.addSection = function(actionArray) {
    var actionItem, i, j, len, sectionButton, sectionView, sumX;
    if (actionArray == null) {
      actionArray = [];
    }
    if (!Utils.isMobile()) {
      sectionView = new Layer({
        parent: this,
        width: 360,
        height: 100,
        backgroundColor: null,
        x: 32,
        y: Align.bottom()
      });
      this.addSectionTitle(sectionView, "Preview Settings");
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
    }
  };

  ConfigView.prototype.addActionButton = function(actionItem, index) {
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

  return ConfigView;

})(SectionView);


},{"PCButtons":"PCButtons","SectionView":"SectionView"}],"ControlPanel":[function(require,module,exports){
var createControlPanel, findStack, getPanelFromSide, getStack, panelName, rowExists;

panelName = ".ControlPanel";

getStack = function(alignment, parent, sName, sWidth, sHeight, padding, offset) {
  var stackView;
  if (alignment == null) {
    alignment = "vertical";
  }
  if (parent == null) {
    parent = null;
  }
  if (sName == null) {
    sName = "some stack";
  }
  if (sWidth == null) {
    sWidth = 100;
  }
  if (sHeight == null) {
    sHeight = 100;
  }
  if (padding == null) {
    padding = 0;
  }
  if (offset == null) {
    offset = 20;
  }
  stackView = new Layer({
    parent: parent,
    width: sWidth,
    height: sHeight,
    name: "" + sName,
    backgroundColor: "null",
    custom: {
      alignment: alignment,
      padding: padding,
      offset: offset
    }
  });
  stackView.on("change:children", function() {
    var i, item, j, key, len, ref, results, sumPos;
    if (this.custom.alignment === "vertical") {
      key = {
        d: "y",
        s: "height"
      };
    } else if (this.custom.alignment === "horizontal") {
      key = {
        d: "x",
        s: "width"
      };
    } else if (this.custom.alignment === "horizontal-reverse") {
      key = {
        d: "x",
        s: "width"
      };
    }
    sumPos = this.custom.offset;
    ref = this.children;
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      item = ref[i];
      if (this.custom.alignment === "horizontal" || this.custom.alignment === "vertical") {
        item[key.d] = sumPos;
      } else if (this.custom.alignment === "horizontal-reverse") {
        item[key.d] = this.width - sumPos - item[key.s];
      }
      results.push(sumPos += item[key.s] + this.custom.padding);
    }
    return results;
  });
  return stackView;
};

createControlPanel = function() {
  var leftPanel, panels, rightPanel;
  panels = new Layer({
    name: panelName,
    width: Canvas.width,
    height: Canvas.height,
    backgroundColor: "null"
  });
  leftPanel = getStack("vertical", panels, "left panel", 320, Canvas.height, 0, 20);
  rightPanel = getStack("vertical", panels, "right panel", 320, Canvas.height, 0, 20);
  return rightPanel.x = Align.right();
};

rowExists = function(layer, row) {
  var item, j, len, ref;
  ref = layer.children;
  for (j = 0, len = ref.length; j < len; j++) {
    item = ref[j];
    if (item.name === row) {
      return item;
    }
  }
  return null;
};

findStack = function(panel, row) {
  var selectedRow, stackAlignment;
  if (row == null) {
    row = "1";
  }
  if (panel.name === "right panel") {
    stackAlignment = "horizontal-reverse";
  } else {
    stackAlignment = "horizontal";
  }
  selectedRow = rowExists(panel, row);
  if (selectedRow !== null) {
    return selectedRow;
  } else {
    selectedRow = getStack(stackAlignment, panel, row, panel.width, 40, 6);
  }
  return selectedRow;
};

exports.breaker = function(side) {
  if (side == null) {
    side = "left";
  }
  return this.header("", side);
};

exports.header = function(label, side) {
  var headerView;
  if (label == null) {
    label = "Header";
  }
  if (side == null) {
    side = "left";
  }
  if (Layer.select(panelName) === void 0) {
    createControlPanel();
  }
  if (getPanelFromSide(side) === null) {
    return null;
  }
  headerView = new TextLayer({
    text: label,
    fontSize: 15,
    fontWeight: 500,
    color: "white",
    opacity: 0.6,
    padding: {
      top: 12,
      left: side === "left" ? 3 : 0,
      right: side === "right" ? 3 : 0
    }
  });
  headerView.parent = findStack(getPanelFromSide(side), Utils.randomNumber());
  return headerView;
};

getPanelFromSide = function(side) {
  if (side === "left") {
    return Layer.select(panelName).children[0];
  } else if (side === "right") {
    return Layer.select(panelName).children[1];
  }
  return null;
};

exports.button = function(label, handler, side, row, pV, pH) {
  var buttonView;
  if (label == null) {
    label = "Button";
  }
  if (handler == null) {
    handler = null;
  }
  if (side == null) {
    side = "left";
  }
  if (row == null) {
    row = "1";
  }
  if (pV == null) {
    pV = 6;
  }
  if (pH == null) {
    pH = 8;
  }
  if (Layer.select(panelName) === void 0) {
    createControlPanel();
  }
  if (getPanelFromSide(side) === null) {
    return null;
  }
  buttonView = new TextLayer({
    text: label,
    padding: {
      top: pV,
      bottom: pV + 2,
      left: pH,
      right: pH
    },
    fontSize: 15,
    fontWeight: 500,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 8
  });
  buttonView.states = {
    "shown": {
      backgroundColor: "rgba(0,0,0,0.9)"
    },
    "hidden": {
      backgroundColor: "rgba(0,0,0,0.4)"
    }
  };
  buttonView.stateSwitch("hidden");
  buttonView.parent = findStack(getPanelFromSide(side), row);
  buttonView.on(Events.Tap, handler);
  return buttonView;
};


},{}],"DeviceView":[function(require,module,exports){
var ScaleView,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ScaleView = require("ScaleView").ScaleView;

exports.DeviceView = (function(superClass) {
  extend(DeviceView, superClass);

  function DeviceView(options) {
    this.options = options != null ? options : {};
    this.initBorderViewCss = bind(this.initBorderViewCss, this);
    this.updateBorderView = bind(this.updateBorderView, this);
    this.hideBorderView = bind(this.hideBorderView, this);
    this.showBorderView = bind(this.showBorderView, this);
    _.defaults(this.options, {
      borderView: null,
      showDevice: true
    });
    DeviceView.__super__.constructor.call(this, this.options);
    this.borderView = new Layer({
      backgroundColor: "000",
      borderRadius: this.borderRadius + 16,
      opacity: 1
    });
    this.borderView.sendToBack();
    this.initBorderViewCss();
    this.updateBorderView();
    this.on("change:size", function() {
      return this.updateBorderView();
    });
    this.on("change:scale", function() {
      return this.updateBorderView();
    });
    this.on("change:x", function() {
      return this.updateBorderView();
    });
    this.on("change:y", function() {
      return this.updateBorderView();
    });
  }

  DeviceView.define('borderView', {
    get: function() {
      return this.options.borderView;
    },
    set: function(value) {
      return this.options.borderView = value;
    }
  });

  DeviceView.define('showDevice', {
    get: function() {
      return this.options.showDevice;
    },
    set: function(value) {
      return this.options.showDevice = value;
    }
  });

  DeviceView.prototype.showBorderView = function() {
    return this.borderView.opacity = 1;
  };

  DeviceView.prototype.hideBorderView = function() {
    return this.borderView.opacity = 0;
  };

  DeviceView.prototype.updateBorderView = function() {
    var deltaG;
    deltaG = 16;
    this.borderView.width = this.width + deltaG * 2;
    this.borderView.height = this.height + deltaG * 2;
    this.borderView.x = Align.center();
    this.borderView.y = Align.center();
    return this.borderView.scale = this.scale;
  };

  DeviceView.prototype.initBorderViewCss = function() {
    var css;
    this.borderView.classList.add("iphone-tilllur-v");
    css = ".iphone-tilllur-v {\n	background: linear-gradient(\n	160.74deg,\n	rgba(36, 36, 36, 0.3) 24.39%,\n	rgba(28, 28, 28, 0.3) 29.47%,\n	rgba(10, 10, 10, 0.3) 99.85%\n	),\n	linear-gradient(\n	180deg,\n	rgba(2, 2, 2, 0.6) -0.21%,\n	rgba(21, 21, 21, 0.6) 6.52%,\n	rgba(6, 6, 6, 0.6) 99.79%\n	),\n	#5a5a5a;\nbox-shadow: 8px 14px 20px rgba(0, 0, 0, 0.25),\n	inset 0px -4px 16px rgba(255, 255, 255, 0.1),\n	inset 4px 0px 4px rgba(255, 255, 255, 0.1),\n	inset -4px 0px 4px rgba(0, 0, 0, 0.7);\n\n}";
    return Utils.insertCSS(css);
  };

  return DeviceView;

})(ScaleView);


},{"ScaleView":"ScaleView"}],"Device_Class":[function(require,module,exports){
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


},{}],"Device_Init":[function(require,module,exports){
var Device_Class, device_assets,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Device_Class = require("Device_Class").Device_Class;

exports.Device_Init = (function(superClass) {
  extend(Device_Init, superClass);

  function Device_Init(options) {
    this.options = options != null ? options : {};
    this.createHomeIndicator = bind(this.createHomeIndicator, this);
    this.createNotchStatusBar = bind(this.createNotchStatusBar, this);
    this.createClassicStatusBar = bind(this.createClassicStatusBar, this);
    this.createClassicAndroidStatusBar = bind(this.createClassicAndroidStatusBar, this);
    this.createAndroidStatusBar = bind(this.createAndroidStatusBar, this);
    this.createBars = bind(this.createBars, this);
    this.viewSize = bind(this.viewSize, this);
    _.defaults(this.options, {
      visible: this.view.deviceConfig.enabled,
      forceAndroidBar: this.view.deviceConfig.force_AndroidBar,
      statusBar: this.view.deviceConfig.statusBar_theme,
      homeBar: this.view.deviceConfig.homeBar_theme,
      prototypeCreationYear: this.view.timeValue,
      statusBarView: null,
      homeBarView: null
    });
    Device_Init.__super__.constructor.call(this, this.options);
    this.createBars();
  }

  Device_Init.define('visible', {
    get: function() {
      if (this.options.visible) {
        return 1;
      } else {
        return 0;
      }
    },
    set: function(value) {
      return this.options.visible = value;
    }
  });

  Device_Init.define('forceAndroidBar', {
    get: function() {
      return this.options.forceAndroidBar;
    },
    set: function(value) {
      return this.options.forceAndroidBar = value;
    }
  });

  Device_Init.define('statusBar', {
    get: function() {
      return this.options.statusBar;
    },
    set: function(value) {
      return this.options.statusBar = value;
    }
  });

  Device_Init.define('homeBar', {
    get: function() {
      return this.options.homeBar;
    },
    set: function(value) {
      return this.options.homeBar = value;
    }
  });

  Device_Init.define('prototypeCreationYear', {
    get: function() {
      return this.options.prototypeCreationYear;
    },
    set: function(value) {
      return this.options.prototypeCreationYear = value;
    }
  });

  Device_Init.define('statusBarView', {
    get: function() {
      return this.options.statusBarView;
    },
    set: function(value) {
      return this.options.statusBarView = value;
    }
  });

  Device_Init.define('homeBarView', {
    get: function() {
      return this.options.homeBarView;
    },
    set: function(value) {
      return this.options.homeBarView = value;
    }
  });

  Device_Init.prototype.viewSize = function(w, h) {
    return this.view.width === w && this.view.height === h;
  };

  Device_Init.prototype.createBars = function() {
    this.statusBarView = new Layer({
      parent: this.view,
      width: this.view.width,
      y: Align.top,
      name: ".status bar",
      opacity: this.visible,
      backgroundColor: null
    });
    if (this.forceAndroidBar) {
      return this.createClassicAndroidStatusBar(this.statusBarView);
    } else if (this.viewSize(375, 812) || this.viewSize(390, 844) || this.viewSize(414, 896) || this.viewSize(428, 926) || this.viewSize(360, 782)) {
      this.createNotchStatusBar(this.statusBarView);
      return this.createHomeIndicator(new Layer({
        parent: this.view,
        width: this.view.width,
        height: 34,
        y: Align.bottom,
        name: ".home bar",
        opacity: this.visible,
        backgroundColor: null
      }));
    } else if (this.viewSize(393, 852)) {
      this.createNotchStatusBar(this.statusBarView);
      return this.createHomeIndicator(new Layer({
        parent: this.view,
        width: this.view.width,
        height: 34,
        y: Align.bottom,
        name: ".home bar",
        opacity: this.visible,
        backgroundColor: null
      }));
    } else if (this.viewSize(375, 667) || this.viewSize(414, 736) || this.viewSize(320, 568)) {
      return this.createClassicStatusBar(this.statusBarView);
    } else {
      return this.createAndroidStatusBar(this.statusBarView);
    }
  };

  Device_Init.prototype.createAndroidStatusBar = function(barLayer) {
    var classicCenterComponent, classicRightomponent;
    barLayer.height = 32;
    classicCenterComponent = new TextLayer({
      parent: barLayer,
      width: 52,
      height: 20,
      x: Align.left(4),
      y: Align.top(2 + 5),
      color: device_assets.color[this.statusBar],
      backgroundColor: null,
      fontSize: 14,
      fontWeight: 600,
      textAlign: "center",
      fontFamily: ".system, SF Pro Text",
      text: this.prototypeCreationYear
    });
    return classicRightomponent = new Layer({
      parent: barLayer,
      width: 100,
      height: 20,
      x: Align.right(-4),
      y: Align.top(5),
      image: device_assets.androidStatusBarRightImage[this.statusBar]
    });
  };

  Device_Init.prototype.createClassicAndroidStatusBar = function(barLayer) {
    var classicCenterComponent, classicRightomponent;
    barLayer.height = 20;
    classicCenterComponent = new TextLayer({
      parent: barLayer,
      width: 52,
      height: 20,
      x: Align.left,
      y: Align.top(2),
      color: device_assets.color[this.statusBar],
      backgroundColor: null,
      fontSize: 14,
      fontWeight: 600,
      textAlign: "center",
      fontFamily: ".system, SF Pro Text",
      text: this.prototypeCreationYear
    });
    return classicRightomponent = new Layer({
      parent: barLayer,
      width: 100,
      height: 20,
      x: Align.right,
      y: Align.top(),
      image: device_assets.androidStatusBarRightImage[this.statusBar]
    });
  };

  Device_Init.prototype.createClassicStatusBar = function(barLayer) {
    var classicCenterComponent, classicLeftComponent, classicRightomponent;
    barLayer.height = 20;
    classicLeftComponent = new Layer({
      parent: barLayer,
      width: 100,
      height: barLayer.height,
      x: Align.left,
      image: device_assets.oldStatusBarLeftImage[this.statusBar]
    });
    classicCenterComponent = new TextLayer({
      parent: barLayer,
      width: 54,
      height: 16,
      x: Align.center,
      y: Align.center,
      color: device_assets.color[this.statusBar],
      backgroundColor: null,
      fontSize: 12,
      fontWeight: 600,
      textAlign: "center",
      fontFamily: ".system, SF Pro Text",
      text: this.prototypeCreationYear
    });
    return classicRightomponent = new Layer({
      parent: barLayer,
      width: 100,
      height: barLayer.height,
      x: Align.right,
      image: device_assets.oldStatusBarRightImage[this.statusBar]
    });
  };

  Device_Init.prototype.createNotchStatusBar = function(barLayer) {
    var notchCenterComponent, notchLeftComponent, notchRightComponent;
    barLayer.height = 44;
    notchLeftComponent = new TextLayer({
      parent: barLayer,
      width: 54,
      height: 21,
      x: Align.left(21),
      y: Align.top(12),
      color: device_assets.color[this.statusBar],
      backgroundColor: null,
      letterSpacing: -0.17,
      fontSize: 15,
      fontWeight: 600,
      textAlign: "center",
      fontFamily: ".system, SF Pro Text",
      text: this.prototypeCreationYear
    });
    notchCenterComponent = new Layer({
      parent: barLayer,
      width: 375,
      height: barLayer.height,
      x: Align.center,
      image: device_assets.notch
    });
    return notchRightComponent = new Layer({
      parent: barLayer,
      width: 100,
      height: barLayer.height,
      x: Align.right,
      image: device_assets.statusBarRightImage[this.statusBar]
    });
  };

  Device_Init.prototype.createHomeIndicator = function(barLayer) {
    return this.homeBarView = new Layer({
      name: ".homeView",
      parent: barLayer,
      width: 135,
      height: 5,
      x: Align.center,
      y: Align.bottom(-8),
      backgroundColor: device_assets.color[this.homeBar],
      borderRadius: 20
    });
  };

  return Device_Init;

})(Device_Class);

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


},{"Device_Class":"Device_Class"}],"HomeBar_Class":[function(require,module,exports){
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


},{}],"InitView":[function(require,module,exports){
var Assets,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Assets = require("Preview_Assets");

exports.InitView = (function(superClass) {
  extend(InitView, superClass);

  function InitView(options) {
    this.options = options != null ? options : {};
    this.stateSwitchToFill = bind(this.stateSwitchToFill, this);
    this.stateSwitchToNormal = bind(this.stateSwitchToNormal, this);
    this.animateStateToFill = bind(this.animateStateToFill, this);
    this.animateStateToNormal = bind(this.animateStateToNormal, this);
    this.logSize = bind(this.logSize, this);
    this.viewWidth = bind(this.viewWidth, this);
    this.viewSize = bind(this.viewSize, this);
    this.screenSize = bind(this.screenSize, this);
    _.defaults(this.options, {
      name: "Preview",
      view: null,
      backgroundColor: null,
      borderRadius: 42,
      assets: Assets.data
    });
    InitView.__super__.constructor.call(this, this.options);
    window.savePreviewMessageFramerObject(this);
    this.states = {
      "normal": {
        scale: 1
      },
      "fill": {
        scale: 1
      }
    };
  }

  InitView.define('view', {
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

  InitView.define('assets', {
    get: function() {
      return this.options.assets;
    }
  });

  InitView.prototype.screenSize = function(w, h) {
    return Screen.width === w && Screen.height === h;
  };

  InitView.prototype.viewSize = function(w, h) {
    return this.width === w && this.height === h;
  };

  InitView.prototype.viewWidth = function(w) {
    return this.width === w;
  };

  InitView.prototype.logSize = function() {
    return new TextLayer({
      text: Screen.width + "x" + Screen.height,
      y: Align.center
    });
  };

  InitView.prototype.animateStateToNormal = function() {
    return this.animate("normal", {
      curve: Spring({
        damping: 1
      }),
      time: 0.5
    });
  };

  InitView.prototype.animateStateToFill = function() {
    return this.animate("fill", {
      curve: Spring({
        damping: 1
      }),
      time: 0.5
    });
  };

  InitView.prototype.stateSwitchToNormal = function() {
    return this.stateSwitch("normal");
  };

  InitView.prototype.stateSwitchToFill = function() {
    return this.stateSwitch("fill");
  };

  return InitView;

})(Layer);


},{"Preview_Assets":"Preview_Assets"}],"LocationView":[function(require,module,exports){
var DeviceView,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

DeviceView = require("DeviceView").DeviceView;

exports.LocationView = (function(superClass) {
  extend(LocationView, superClass);

  function LocationView(options) {
    this.options = options != null ? options : {};
    this.getStateGeneric = bind(this.getStateGeneric, this);
    this.setCustomPreview = bind(this.setCustomPreview, this);
    this.previewMobile = bind(this.previewMobile, this);
    this.updatePreviewOnResize = bind(this.updatePreviewOnResize, this);
    this.previewDesktop = bind(this.previewDesktop, this);
    this.setDesktopScaleMode = bind(this.setDesktopScaleMode, this);
    this.updateScale = bind(this.updateScale, this);
    this.scalePreview = bind(this.scalePreview, this);
    _.defaults(this.options, {
      initState: "fill",
      showButton: true,
      showLogo: true,
      forceDesktop: false
    });
    LocationView.__super__.constructor.call(this, this.options);
    this.scalePreview();
  }

  LocationView.define('initState', {
    get: function() {
      return this.options.initState;
    },
    set: function(value) {
      return this.options.initState = value;
    }
  });

  LocationView.define('showButton', {
    get: function() {
      return this.options.showButton;
    },
    set: function(value) {
      return this.options.showButton = value;
    }
  });

  LocationView.define('showLogo', {
    get: function() {
      return this.options.showLogo;
    },
    set: function(value) {
      return this.options.showLogo = value;
    }
  });

  LocationView.define('forceDesktop', {
    get: function() {
      return this.options.forceDesktop;
    },
    set: function(value) {
      this.options.forceDesktop = value;
      if (value) {
        this.showDevice = false;
        this.showBars = false;
        return this.borderRadius = 8;
      }
    }
  });

  LocationView.prototype.scalePreview = function() {
    var forceDesktopMode;
    forceDesktopMode = this.getStateGeneric("desktop", [
      {
        value: "false",
        result: false
      }, {
        value: "true",
        result: true
      }
    ], false);
    if (forceDesktopMode) {
      return this.previewDesktop();
    } else if (Utils.isMobile()) {
      return this.previewMobile();
    } else {
      return this.previewDesktop();
    }
  };

  LocationView.prototype.updateScale = function() {
    var scaleFactor, scaleX, scaleY;
    scaleFactor = Screen.width / Canvas.width;
    this.originX = 0;
    this.originY = 0;
    scaleX = (Screen.width - scaleFactor * 112) / this.width;
    scaleY = (Screen.height - scaleFactor * 112) / this.height;
    this.states["fill"].scale = Math.min(scaleX, scaleY);
    this.states["fill"].x = (Screen.width - this.width * this.states["fill"].scale) / 2;
    this.states["fill"].y = (Screen.height - this.height * this.states["fill"].scale) / 2;
    this.states["normal"].x = (Screen.width - this.width) / 2;
    return this.states["normal"].y = (Screen.height - this.height) / 2;
  };

  LocationView.prototype.setDesktopScaleMode = function() {
    var forState, shouldShowButton, shouldShowDevice, shouldShowLogo;
    forState = this.getStateGeneric("scale", [
      {
        value: "fill",
        result: "fill"
      }, {
        value: "normal",
        result: "normal"
      }, {
        value: "true",
        result: "fill"
      }
    ], this.initState);
    shouldShowButton = this.getStateGeneric("button", [
      {
        value: "false",
        result: false
      }, {
        value: "off",
        result: false
      }
    ], this.showButton);
    shouldShowLogo = this.getStateGeneric("logo", [
      {
        value: "false",
        result: false
      }, {
        value: "off",
        result: false
      }
    ], this.showLogo);
    shouldShowDevice = this.getStateGeneric("device", [
      {
        value: "false",
        result: false
      }, {
        value: "off",
        result: false
      }, {
        value: "true",
        result: true
      }
    ], this.showDevice);
    if (shouldShowLogo) {
      this.createLogoButton();
    }
    if (shouldShowButton) {
      this.createScaleButton(forState);
    }
    if (shouldShowDevice) {
      this.showBorderView();
    } else {
      this.hideBorderView();
    }
    return this.stateSwitch(forState);
  };

  LocationView.prototype.previewDesktop = function() {
    this.updateScale();
    this.setDesktopScaleMode();
    this.createBars();
    this.clip = true;
    return this.updatePreviewOnResize();
  };

  LocationView.prototype.updatePreviewOnResize = function() {
    var localPreview;
    localPreview = this;
    Canvas.on("change:height", (function(_this) {
      return function() {
        localPreview.updateScale();
        return localPreview.stateSwitch(localPreview.states.current.name);
      };
    })(this));
    Canvas.on("change:width", (function(_this) {
      return function() {
        localPreview.updateScale();
        return localPreview.stateSwitch(localPreview.states.current.name);
      };
    })(this));
    Screen.on("change:height", (function(_this) {
      return function() {
        localPreview.updateScale();
        return localPreview.stateSwitch(localPreview.states.current.name);
      };
    })(this));
    return Screen.on("change:width", (function(_this) {
      return function() {
        localPreview.updateScale();
        return localPreview.stateSwitch(localPreview.states.current.name);
      };
    })(this));
  };

  LocationView.prototype.previewMobile = function() {
    this.scale = Screen.width / this.width;
    this.originX = 0;
    return this.originY = 0;
  };

  LocationView.prototype.setCustomPreview = function() {
    this.y = Align.top;
    this.scale = (Screen.height - 120) / this.height;
    this.borderRadius = 20;
    return this.clip = true;
  };

  LocationView.prototype.getStateGeneric = function(stateKey, statePairs, defaultResult) {
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

  return LocationView;

})(DeviceView);


},{"DeviceView":"DeviceView"}],"Logo":[function(require,module,exports){
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
      preventBackSwipe: false,
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
    if (this.preventBackSwipe === false) {
      this.on(Events.SwipeRightStart, (function(_this) {
        return function(event, layer) {
          try {
            return _this.flow.showPrevious();
          } catch (error) {}
        };
      })(this));
    }
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

  NavigationView.define('preventBackSwipe', {
    get: function() {
      return this.options.preventBackSwipe;
    },
    set: function(value) {
      return this.options.preventBackSwipe = value;
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


},{"Buttons":"Buttons","Preview_Class":"Preview_Class"}],"PCButtons":[function(require,module,exports){
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


},{}],"PhoneTypeView":[function(require,module,exports){
var InitView, overrideTimeValue,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

InitView = require("InitView").InitView;

overrideTimeValue = "20:21";

exports.PhoneTypeView = (function(superClass) {
  extend(PhoneTypeView, superClass);

  function PhoneTypeView(options) {
    this.options = options != null ? options : {};
    this.createHomeIndicator = bind(this.createHomeIndicator, this);
    this.createNotchStatusBar = bind(this.createNotchStatusBar, this);
    this.createClassicStatusBar = bind(this.createClassicStatusBar, this);
    this.createClassicAndroidStatusBar = bind(this.createClassicAndroidStatusBar, this);
    this.createAndroidStatusBar = bind(this.createAndroidStatusBar, this);
    this.createBars = bind(this.createBars, this);
    _.defaults(this.options, {
      statusBar: "dark",
      homeBar: "dark",
      visible: true,
      forceAndroidBar: false,
      prototypeCreationYear: overrideTimeValue,
      statusBarView: null,
      homeBarView: null
    });
    PhoneTypeView.__super__.constructor.call(this, this.options);
  }

  PhoneTypeView.define('statusBar', {
    get: function() {
      return this.options.statusBar;
    },
    set: function(value) {
      return this.options.statusBar = value;
    }
  });

  PhoneTypeView.define('homeBar', {
    get: function() {
      return this.options.homeBar;
    },
    set: function(value) {
      return this.options.homeBar = value;
    }
  });

  PhoneTypeView.define('forceAndroidBar', {
    get: function() {
      return this.options.forceAndroidBar;
    },
    set: function(value) {
      return this.options.forceAndroidBar = value;
    }
  });

  PhoneTypeView.define('showBars', {
    get: function() {
      if (this.options.visible) {
        return 1;
      } else {
        return 0;
      }
    },
    set: function(value) {
      return this.options.visible = value;
    }
  });

  PhoneTypeView.define('visible', {
    get: function() {
      if (this.options.visible) {
        return 1;
      } else {
        return 0;
      }
    },
    set: function(value) {
      return this.options.visible = value;
    }
  });

  PhoneTypeView.define('prototypeCreationYear', {
    get: function() {
      return this.options.prototypeCreationYear;
    },
    set: function(value) {
      return this.options.prototypeCreationYear = value;
    }
  });

  PhoneTypeView.define('statusBarView', {
    get: function() {
      return this.options.statusBarView;
    },
    set: function(value) {
      return this.options.statusBarView = value;
    }
  });

  PhoneTypeView.define('homeBarView', {
    get: function() {
      return this.options.homeBarView;
    },
    set: function(value) {
      return this.options.homeBarView = value;
    }
  });

  PhoneTypeView.prototype.createBars = function() {
    this.statusBarView = new Layer({
      parent: this,
      width: this.width,
      y: Align.top,
      name: ".status bar",
      opacity: this.visible,
      backgroundColor: null
    });
    if (this.forceAndroidBar) {
      return this.createClassicAndroidStatusBar(this.statusBarView);
    } else if (this.viewSize(375, 812) || this.viewSize(390, 844) || this.viewSize(414, 896) || this.viewSize(428, 926) || this.viewSize(360, 782)) {
      this.createNotchStatusBar(this.statusBarView);
      return this.createHomeIndicator(new Layer({
        parent: this,
        width: this.width,
        height: 34,
        y: Align.bottom,
        name: ".home bar",
        opacity: this.visible,
        backgroundColor: null
      }));
    } else if (this.viewSize(393, 852)) {
      print("ok");
      this.createNotchStatusBar(this.statusBarView);
      return this.createHomeIndicator(new Layer({
        parent: this,
        width: this.width,
        height: 34,
        y: Align.bottom,
        name: ".home bar",
        opacity: this.visible,
        backgroundColor: null
      }));
    } else if (this.viewSize(375, 667) || this.viewSize(414, 736) || this.viewSize(320, 568)) {
      return this.createClassicStatusBar(this.statusBarView);
    } else {
      return this.createAndroidStatusBar(this.statusBarView);
    }
  };

  PhoneTypeView.prototype.createAndroidStatusBar = function(barLayer) {
    var classicCenterComponent, classicRightomponent;
    barLayer.height = 32;
    classicCenterComponent = new TextLayer({
      parent: barLayer,
      width: 52,
      height: 20,
      x: Align.left(4),
      y: Align.top(2 + 5),
      color: this.assets.color[this.statusBar],
      backgroundColor: null,
      fontSize: 14,
      fontWeight: 600,
      textAlign: "center",
      fontFamily: ".system, SF Pro Text",
      text: this.prototypeCreationYear
    });
    return classicRightomponent = new Layer({
      parent: barLayer,
      width: 100,
      height: 20,
      x: Align.right(-4),
      y: Align.top(5),
      image: this.assets.androidStatusBarRightImage[this.statusBar]
    });
  };

  PhoneTypeView.prototype.createClassicAndroidStatusBar = function(barLayer) {
    var classicCenterComponent, classicRightomponent;
    barLayer.height = 20;
    classicCenterComponent = new TextLayer({
      parent: barLayer,
      width: 52,
      height: 20,
      x: Align.left,
      y: Align.top(2),
      color: this.assets.color[this.statusBar],
      backgroundColor: null,
      fontSize: 14,
      fontWeight: 600,
      textAlign: "center",
      fontFamily: ".system, SF Pro Text",
      text: this.prototypeCreationYear
    });
    return classicRightomponent = new Layer({
      parent: barLayer,
      width: 100,
      height: 20,
      x: Align.right,
      y: Align.top(),
      image: this.assets.androidStatusBarRightImage[this.statusBar]
    });
  };

  PhoneTypeView.prototype.createClassicStatusBar = function(barLayer) {
    var classicCenterComponent, classicLeftComponent, classicRightomponent;
    barLayer.height = 20;
    classicLeftComponent = new Layer({
      parent: barLayer,
      width: 100,
      height: barLayer.height,
      x: Align.left,
      image: this.assets.oldStatusBarLeftImage[this.statusBar]
    });
    classicCenterComponent = new TextLayer({
      parent: barLayer,
      width: 54,
      height: 16,
      x: Align.center,
      y: Align.center,
      color: this.assets.color[this.statusBar],
      backgroundColor: null,
      fontSize: 12,
      fontWeight: 600,
      textAlign: "center",
      fontFamily: ".system, SF Pro Text",
      text: this.prototypeCreationYear
    });
    return classicRightomponent = new Layer({
      parent: barLayer,
      width: 100,
      height: barLayer.height,
      x: Align.right,
      image: this.assets.oldStatusBarRightImage[this.statusBar]
    });
  };

  PhoneTypeView.prototype.createNotchStatusBar = function(barLayer) {
    var notchCenterComponent, notchLeftComponent, notchRightComponent;
    barLayer.height = 44;
    notchLeftComponent = new TextLayer({
      parent: barLayer,
      width: 54,
      height: 21,
      x: Align.left(21),
      y: Align.top(12),
      color: this.assets.color[this.statusBar],
      backgroundColor: null,
      letterSpacing: -0.17,
      fontSize: 15,
      fontWeight: 600,
      textAlign: "center",
      fontFamily: ".system, SF Pro Text",
      text: this.prototypeCreationYear
    });
    notchCenterComponent = new Layer({
      parent: barLayer,
      width: 375,
      height: barLayer.height,
      x: Align.center,
      image: this.assets.notch
    });
    return notchRightComponent = new Layer({
      parent: barLayer,
      width: 100,
      height: barLayer.height,
      x: Align.right,
      image: this.assets.statusBarRightImage[this.statusBar]
    });
  };

  PhoneTypeView.prototype.createHomeIndicator = function(barLayer) {
    return this.homeBarView = new Layer({
      name: ".homeView",
      parent: barLayer,
      width: 135,
      height: 5,
      x: Align.center,
      y: Align.bottom(-8),
      backgroundColor: this.assets.color[this.homeBar],
      borderRadius: 20
    });
  };

  return PhoneTypeView;

})(InitView);


},{"InitView":"InitView"}],"PreviewClass1":[function(require,module,exports){
var Assets,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Assets = require("Preview_Assets");

exports.PreviewClass1 = (function(superClass) {
  extend(PreviewClass1, superClass);

  function PreviewClass1(options) {
    this.options = options != null ? options : {};
    this.stateSwitchToFill = bind(this.stateSwitchToFill, this);
    this.stateSwitchToNormal = bind(this.stateSwitchToNormal, this);
    this.animateStateToFill = bind(this.animateStateToFill, this);
    this.animateStateToNormal = bind(this.animateStateToNormal, this);
    this.logSize = bind(this.logSize, this);
    this.viewWidth = bind(this.viewWidth, this);
    this.viewSize = bind(this.viewSize, this);
    this.screenSize = bind(this.screenSize, this);
    _.defaults(this.options, {
      name: "Preview",
      view: null,
      backgroundColor: null,
      borderRadius: 42,
      assets: Assets.data
    });
    PreviewClass1.__super__.constructor.call(this, this.options);
    window.savePreviewMessageFramerObject(this);
    this.states = {
      "normal": {
        scale: 1
      },
      "fill": {
        scale: 1
      }
    };
  }

  PreviewClass1.define('view', {
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

  PreviewClass1.define('assets', {
    get: function() {
      return this.options.assets;
    }
  });

  PreviewClass1.prototype.screenSize = function(w, h) {
    return Screen.width === w && Screen.height === h;
  };

  PreviewClass1.prototype.viewSize = function(w, h) {
    return this.width === w && this.height === h;
  };

  PreviewClass1.prototype.viewWidth = function(w) {
    return this.width === w;
  };

  PreviewClass1.prototype.logSize = function() {
    return new TextLayer({
      text: Screen.width + "x" + Screen.height,
      y: Align.center
    });
  };

  PreviewClass1.prototype.animateStateToNormal = function() {
    return this.animate("normal", {
      curve: Spring({
        damping: 1
      }),
      time: 0.5
    });
  };

  PreviewClass1.prototype.animateStateToFill = function() {
    return this.animate("fill", {
      curve: Spring({
        damping: 1
      }),
      time: 0.5
    });
  };

  PreviewClass1.prototype.stateSwitchToNormal = function() {
    return this.stateSwitch("normal");
  };

  PreviewClass1.prototype.stateSwitchToFill = function() {
    return this.stateSwitch("fill");
  };

  return PreviewClass1;

})(Layer);


},{"Preview_Assets":"Preview_Assets"}],"PreviewClass2":[function(require,module,exports){
var PreviewClass1,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PreviewClass1 = require("PreviewClass1").PreviewClass1;

exports.PreviewClass2 = (function(superClass) {
  extend(PreviewClass2, superClass);

  function PreviewClass2(options) {
    this.options = options != null ? options : {};
    this.createHomeIndicator = bind(this.createHomeIndicator, this);
    this.createNotchStatusBar = bind(this.createNotchStatusBar, this);
    this.createClassicStatusBar = bind(this.createClassicStatusBar, this);
    this.createClassicAndroidStatusBar = bind(this.createClassicAndroidStatusBar, this);
    this.createAndroidStatusBar = bind(this.createAndroidStatusBar, this);
    this.createBars = bind(this.createBars, this);
    _.defaults(this.options, {
      statusBar: "dark",
      homeBar: "dark",
      visible: true,
      forceAndroidBar: false,
      prototypeCreationYear: "20:20"
    });
    PreviewClass2.__super__.constructor.call(this, this.options);
  }

  PreviewClass2.define('statusBar', {
    get: function() {
      return this.options.statusBar;
    },
    set: function(value) {
      return this.options.statusBar = value;
    }
  });

  PreviewClass2.define('homeBar', {
    get: function() {
      return this.options.homeBar;
    },
    set: function(value) {
      return this.options.homeBar = value;
    }
  });

  PreviewClass2.define('forceAndroidBar', {
    get: function() {
      return this.options.forceAndroidBar;
    },
    set: function(value) {
      return this.options.forceAndroidBar = value;
    }
  });

  PreviewClass2.define('visible', {
    get: function() {
      if (this.options.visible) {
        return 1;
      } else {
        return 0;
      }
    },
    set: function(value) {
      return this.options.visible = value;
    }
  });

  PreviewClass2.define('prototypeCreationYear', {
    get: function() {
      return this.options.prototypeCreationYear;
    },
    set: function(value) {
      return this.options.prototypeCreationYear = value;
    }
  });

  PreviewClass2.prototype.createBars = function() {
    var topBar;
    topBar = new Layer({
      parent: this,
      width: this.width,
      y: Align.top,
      name: ".status bar",
      opacity: this.visible,
      backgroundColor: null
    });
    if (this.viewSize(375, 812) || this.viewSize(390, 844) || this.viewSize(414, 896) || this.viewSize(428, 926) || this.viewSize(360, 782)) {
      this.createNotchStatusBar(topBar);
      return this.createHomeIndicator(new Layer({
        parent: this,
        width: this.width,
        height: 34,
        y: Align.bottom,
        name: ".home bar",
        opacity: this.visible,
        backgroundColor: null
      }));
    } else if (this.viewSize(375, 667) || this.viewSize(414, 736) || this.viewSize(320, 568)) {
      return this.createClassicStatusBar(topBar);
    } else if (this.forceAndroidBar) {
      return this.createClassicAndroidStatusBar(topBar);
    } else {
      return this.createAndroidStatusBar(topBar);
    }
  };

  PreviewClass2.prototype.createAndroidStatusBar = function(barLayer) {
    var classicCenterComponent, classicRightomponent;
    barLayer.height = 32;
    classicCenterComponent = new TextLayer({
      parent: barLayer,
      width: 52,
      height: 20,
      x: Align.left(4),
      y: Align.top(2 + 5),
      color: this.assets.color[this.statusBar],
      backgroundColor: null,
      fontSize: 14,
      fontWeight: 600,
      textAlign: "center",
      fontFamily: ".system, SF Pro Text",
      text: this.prototypeCreationYear
    });
    return classicRightomponent = new Layer({
      parent: barLayer,
      width: 100,
      height: 20,
      x: Align.right(-4),
      y: Align.top(5),
      image: this.assets.androidStatusBarRightImage[this.statusBar]
    });
  };

  PreviewClass2.prototype.createClassicAndroidStatusBar = function(barLayer) {
    var classicCenterComponent, classicRightomponent;
    barLayer.height = 20;
    classicCenterComponent = new TextLayer({
      parent: barLayer,
      width: 52,
      height: 20,
      x: Align.left,
      y: Align.top(2),
      color: this.assets.color[this.statusBar],
      backgroundColor: null,
      fontSize: 14,
      fontWeight: 600,
      textAlign: "center",
      fontFamily: ".system, SF Pro Text",
      text: this.prototypeCreationYear
    });
    return classicRightomponent = new Layer({
      parent: barLayer,
      width: 100,
      height: 20,
      x: Align.right,
      y: Align.top(),
      image: this.assets.androidStatusBarRightImage[this.statusBar]
    });
  };

  PreviewClass2.prototype.createClassicStatusBar = function(barLayer) {
    var classicCenterComponent, classicLeftComponent, classicRightomponent;
    barLayer.height = 20;
    classicLeftComponent = new Layer({
      parent: barLayer,
      width: 100,
      height: barLayer.height,
      x: Align.left,
      image: this.assets.oldStatusBarLeftImage[this.statusBar]
    });
    classicCenterComponent = new TextLayer({
      parent: barLayer,
      width: 54,
      height: 16,
      x: Align.center,
      y: Align.center,
      color: this.assets.color[this.statusBar],
      backgroundColor: null,
      fontSize: 12,
      fontWeight: 600,
      textAlign: "center",
      fontFamily: ".system, SF Pro Text",
      text: this.prototypeCreationYear
    });
    return classicRightomponent = new Layer({
      parent: barLayer,
      width: 100,
      height: barLayer.height,
      x: Align.right,
      image: this.assets.oldStatusBarRightImage[this.statusBar]
    });
  };

  PreviewClass2.prototype.createNotchStatusBar = function(barLayer) {
    var notchCenterComponent, notchLeftComponent, notchRightComponent;
    barLayer.height = 44;
    notchLeftComponent = new TextLayer({
      parent: barLayer,
      width: 54,
      height: 21,
      x: Align.left(21),
      y: Align.top(12),
      color: this.assets.color[this.statusBar],
      backgroundColor: null,
      letterSpacing: -0.17,
      fontSize: 15,
      fontWeight: 600,
      textAlign: "center",
      fontFamily: ".system, SF Pro Text",
      text: this.prototypeCreationYear
    });
    notchCenterComponent = new Layer({
      parent: barLayer,
      width: 375,
      height: barLayer.height,
      x: Align.center,
      image: this.assets.notch
    });
    return notchRightComponent = new Layer({
      parent: barLayer,
      width: 100,
      height: barLayer.height,
      x: Align.right,
      image: this.assets.statusBarRightImage[this.statusBar]
    });
  };

  PreviewClass2.prototype.createHomeIndicator = function(barLayer) {
    var homeIndicator;
    return homeIndicator = new Layer({
      parent: barLayer,
      width: 135,
      height: 5,
      x: Align.center,
      y: Align.bottom(-8),
      backgroundColor: this.assets.color[this.homeBar],
      borderRadius: 20
    });
  };

  return PreviewClass2;

})(PreviewClass1);


},{"PreviewClass1":"PreviewClass1"}],"PreviewClass35":[function(require,module,exports){
var PreviewClass3,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PreviewClass3 = require("PreviewClass3").PreviewClass3;

exports.PreviewClass35 = (function(superClass) {
  extend(PreviewClass35, superClass);

  function PreviewClass35(options) {
    this.options = options != null ? options : {};
    this.initBorderViewCss = bind(this.initBorderViewCss, this);
    this.updateBorderView = bind(this.updateBorderView, this);
    this.hideBorderView = bind(this.hideBorderView, this);
    this.showBorderView = bind(this.showBorderView, this);
    _.defaults(this.options, {
      borderView: null,
      showDevice: false
    });
    PreviewClass35.__super__.constructor.call(this, this.options);
    this.borderView = new Layer({
      backgroundColor: "000",
      borderRadius: this.borderRadius + 16,
      opacity: 1
    });
    this.borderView.sendToBack();
    this.initBorderViewCss();
    this.updateBorderView();
    this.on("change:size", function() {
      return this.updateBorderView();
    });
    this.on("change:scale", function() {
      return this.updateBorderView();
    });
    this.on("change:x", function() {
      return this.updateBorderView();
    });
    this.on("change:y", function() {
      return this.updateBorderView();
    });
  }

  PreviewClass35.define('borderView', {
    get: function() {
      return this.options.borderView;
    },
    set: function(value) {
      return this.options.borderView = value;
    }
  });

  PreviewClass35.define('showDevice', {
    get: function() {
      return this.options.showDevice;
    },
    set: function(value) {
      return this.options.showDevice = value;
    }
  });

  PreviewClass35.prototype.showBorderView = function() {
    return this.borderView.opacity = 1;
  };

  PreviewClass35.prototype.hideBorderView = function() {
    return this.borderRadius.opacity = 0;
  };

  PreviewClass35.prototype.updateBorderView = function() {
    var deltaG;
    deltaG = 16;
    this.borderView.width = this.width + deltaG * 2;
    this.borderView.height = this.height + deltaG * 2;
    this.borderView.x = Align.center();
    this.borderView.y = Align.center();
    return this.borderView.scale = this.scale;
  };

  PreviewClass35.prototype.initBorderViewCss = function() {
    var css;
    this.borderView.classList.add("iphone-tilllur-v");
    css = ".iphone-tilllur-v {\n	background: linear-gradient(\n	160.74deg,\n	rgba(36, 36, 36, 0.3) 24.39%,\n	rgba(28, 28, 28, 0.3) 29.47%,\n	rgba(10, 10, 10, 0.3) 99.85%\n	),\n	linear-gradient(\n	180deg,\n	rgba(2, 2, 2, 0.6) -0.21%,\n	rgba(21, 21, 21, 0.6) 6.52%,\n	rgba(6, 6, 6, 0.6) 99.79%\n	),\n	#5a5a5a;\nbox-shadow: 8px 14px 20px rgba(0, 0, 0, 0.25),\n	inset 0px -4px 16px rgba(255, 255, 255, 0.1),\n	inset 4px 0px 4px rgba(255, 255, 255, 0.1),\n	inset -4px 0px 4px rgba(0, 0, 0, 0.7);\n\n}";
    return Utils.insertCSS(css);
  };

  return PreviewClass35;

})(PreviewClass3);


},{"PreviewClass3":"PreviewClass3"}],"PreviewClass3":[function(require,module,exports){
var LogoLayer, PreviewClass2,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

LogoLayer = require("Preview_LogoLayer").LogoLayer;

PreviewClass2 = require("PreviewClass2").PreviewClass2;

exports.PreviewClass3 = (function(superClass) {
  extend(PreviewClass3, superClass);

  function PreviewClass3(options) {
    this.options = options != null ? options : {};
    this.createScaleButton = bind(this.createScaleButton, this);
    this.createLogoButton = bind(this.createLogoButton, this);
    _.defaults(this.options, PreviewClass3.__super__.constructor.call(this, this.options));
  }

  PreviewClass3.prototype.createLogoButton = function() {
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

  PreviewClass3.prototype.createScaleButton = function(forState) {
    var buttonInsideLayer, buttonScale, updateButtonOnResize;
    buttonScale = new Layer({
      size: 48,
      borderRadius: 48,
      x: Align.right(-32),
      y: Align.bottom(-32),
      backgroundColor: "rgba(255,255,255, 0.1)",
      borderWidth: 2,
      custom: {
        preview: this
      }
    });
    buttonScale.style = {
      cursor: "pointer"
    };
    buttonScale.states = {
      "normal": {
        borderColor: "rgba(255,255,255, 0.2)"
      },
      "fill": {
        borderColor: "rgba(255,255,255, 0.6)"
      }
    };
    buttonScale.stateSwitch(forState);
    buttonInsideLayer = new Layer({
      parent: buttonScale,
      borderWidth: 2,
      size: 28,
      borderRadius: 22,
      x: 10,
      y: 10,
      backgroundColor: null
    });
    buttonInsideLayer.states = {
      "normal": {
        borderColor: "rgba(255,255,255, 0.6)"
      },
      "fill": {
        borderColor: "rgba(255,255,255, 0.2)"
      }
    };
    buttonInsideLayer.stateSwitch(forState);
    buttonScale.onTap(function() {
      var nextState;
      if (this.states.current.name === "fill") {
        nextState = "normal";
      } else {
        nextState = "fill";
      }
      this.stateSwitch(nextState);
      this.children[0].stateSwitch(nextState);
      return this.custom.preview.animate(nextState, {
        curve: Spring({
          damping: 1
        }),
        time: 0.5
      });
    });
    updateButtonOnResize = (function(_this) {
      return function(buttonLayer) {
        var localButton;
        localButton = buttonLayer;
        Canvas.on("change:height", function() {
          return buttonLayer.x = Align.right(-32);
        });
        return Canvas.on("change:width", function() {
          return buttonLayer.y = Align.bottom(-32);
        });
      };
    })(this);
    return updateButtonOnResize(buttonScale);
  };

  return PreviewClass3;

})(PreviewClass2);


},{"PreviewClass2":"PreviewClass2","Preview_LogoLayer":"Preview_LogoLayer"}],"PreviewClass4":[function(require,module,exports){
var PreviewClass35,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PreviewClass35 = require("PreviewClass35").PreviewClass35;

exports.PreviewClass4 = (function(superClass) {
  extend(PreviewClass4, superClass);

  function PreviewClass4(options) {
    this.options = options != null ? options : {};
    this.getStateGeneric = bind(this.getStateGeneric, this);
    this.setCustomPreview = bind(this.setCustomPreview, this);
    this.previewMobile = bind(this.previewMobile, this);
    this.updatePreviewOnResize = bind(this.updatePreviewOnResize, this);
    this.previewDesktop = bind(this.previewDesktop, this);
    this.setDesktopScaleMode = bind(this.setDesktopScaleMode, this);
    this.updateScaleState = bind(this.updateScaleState, this);
    this.scalePreview = bind(this.scalePreview, this);
    _.defaults(this.options, PreviewClass4.__super__.constructor.call(this, this.options));
    this.scalePreview();
  }

  PreviewClass4.prototype.scalePreview = function() {
    if (Utils.isMobile()) {
      return this.previewMobile();
    } else {
      this.updateScaleState();
      this.setDesktopScaleMode();
      this.previewDesktop();
      return this.updatePreviewOnResize();
    }
  };

  PreviewClass4.prototype.updateScaleState = function() {
    var scaleX, scaleY;
    scaleX = (Canvas.width - 112) / this.width;
    scaleY = (Canvas.height - 112) / this.height;
    return this.states.fill.scale = Math.min(scaleX, scaleY);
  };

  PreviewClass4.prototype.setDesktopScaleMode = function(forState) {
    var initState, shouldShowButton, shouldShowDevice, shouldShowLogo;
    if (forState == null) {
      forState = "normal";
    }
    initState = this.getStateGeneric("scale", [
      {
        value: "fill",
        result: "fill"
      }, {
        value: "normal",
        result: "normal"
      }, {
        value: "true",
        result: "fill"
      }
    ], forState);
    shouldShowButton = this.getStateGeneric("button", [
      {
        value: "false",
        result: false
      }, {
        value: "off",
        result: false
      }
    ], true);
    shouldShowLogo = this.getStateGeneric("logo", [
      {
        value: "false",
        result: false
      }, {
        value: "off",
        result: false
      }
    ], true);
    shouldShowDevice = this.getStateGeneric("device", [
      {
        value: "false",
        result: false
      }, {
        value: "true",
        result: true
      }
    ], false);
    if (shouldShowLogo) {
      this.createLogoButton();
    }
    if (shouldShowButton) {
      this.createScaleButton(initState);
    }
    if (shouldShowDevice) {
      this.showBorderView();
    } else {
      this.hideBorderView();
    }
    return this.stateSwitch(initState);
  };

  PreviewClass4.prototype.previewDesktop = function() {
    Canvas.backgroundColor = "222";
    this.createBars();
    this.center();
    return this.clip = true;
  };

  PreviewClass4.prototype.updatePreviewOnResize = function() {
    var localPreview;
    localPreview = this;
    Canvas.on("change:height", (function(_this) {
      return function() {
        localPreview.x = Align.center;
        return localPreview.updateScaleState();
      };
    })(this));
    return Canvas.on("change:width", (function(_this) {
      return function() {
        localPreview.y = Align.center;
        return localPreview.updateScaleState();
      };
    })(this));
  };

  PreviewClass4.prototype.previewMobile = function() {
    var previewCanvas;
    previewCanvas = new BackgroundLayer({
      backgroundColor: "222",
      name: ".hiddenPreviewCanvas"
    });
    this.clip = false;
    this.center();
    this.originY = 0.5;
    this.originX = 0.5;
    if (this.viewSize(360, 640) || this.viewSize(375, 667) || this.viewSize(375, 812) || this.viewSize(390, 844) || this.viewSize(414, 896) || this.viewSize(428, 926)) {
      return this.scale = Screen.width / this.width;
    } else {
      return this.setCustomPreview();
    }
  };

  PreviewClass4.prototype.setCustomPreview = function() {
    var tip;
    this.y = Align.top;
    this.originY = 0.1;
    this.scale = (Screen.height - 120) / this.height;
    this.borderRadius = 20;
    this.clip = true;
    return tip = new Layer({
      width: 240,
      height: 44,
      image: this.assets.tip,
      x: Align.center,
      y: Align.bottom(-30),
      opacity: 0.5
    });
  };

  PreviewClass4.prototype.getStateGeneric = function(stateKey, statePairs, defaultResult) {
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

  return PreviewClass4;

})(PreviewClass35);


},{"PreviewClass35":"PreviewClass35"}],"PreviewClass5":[function(require,module,exports){
var PreviewClass4,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PreviewClass4 = require("PreviewClass4").PreviewClass4;

exports.PreviewClass5 = (function(superClass) {
  extend(PreviewClass5, superClass);

  function PreviewClass5(options) {
    var controlPanelLayer;
    this.options = options != null ? options : {};
    this.addSectionTitle = bind(this.addSectionTitle, this);
    this.addSectionButton = bind(this.addSectionButton, this);
    this.addSection = bind(this.addSection, this);
    controlPanelLayer = new Layer({
      width: 360,
      height: 1000,
      x: 20,
      y: 60,
      backgroundColor: null
    });
    _.defaults(this.options, {
      controlPanel: controlPanelLayer
    });
    PreviewClass5.__super__.constructor.call(this, this.options);
    controlPanelLayer.parent = this.parent;
  }

  PreviewClass5.define('controlPanel', {
    get: function() {
      return this.options.controlPanel;
    },
    set: function(value) {
      return this.options.controlPanel = value;
    }
  });

  PreviewClass5.prototype.addSection = function(title, actionArray) {
    var actionItem, i, index, len, results, sectionButton, sectionView, sumX;
    if (actionArray == null) {
      actionArray = [];
    }
    if (Utils.isMobile()) {

    } else {
      sectionView = new Layer({
        width: 360,
        height: 100,
        parent: this.controlPanel,
        backgroundColor: null
      });
      sectionView.y = (this.controlPanel.children.length - 1) * 100;
      this.addSectionTitle(title).parent = sectionView;
      sumX = 0;
      results = [];
      for (index = i = 0, len = actionArray.length; i < len; index = ++i) {
        actionItem = actionArray[index];
        sectionButton = this.addSectionButton(actionItem);
        sectionButton.parent = sectionView;
        sectionButton.x = sumX;
        results.push(sumX += sectionButton.width + 8);
      }
      return results;
    }
  };

  PreviewClass5.prototype.addSectionButton = function(actionItem, pV, pH) {
    var buttonLayer;
    if (pV == null) {
      pV = 6;
    }
    if (pH == null) {
      pH = 9;
    }
    buttonLayer = new TextLayer({
      text: actionItem.title,
      y: 42,
      padding: {
        top: pV,
        bottom: pV + 2,
        left: pH,
        right: pH
      },
      fontSize: 18,
      fontWeight: 500,
      color: "white",
      backgroundColor: "rgba(0,0,0,0.5)",
      borderRadius: 8
    });
    buttonLayer.on(Events.Tap, actionItem.handler);
    return buttonLayer;
  };

  PreviewClass5.prototype.addSectionTitle = function(title) {
    if (title == null) {
      title = "Header Title";
    }
    return new TextLayer({
      text: title,
      fontSize: 15,
      fontWeight: 500,
      color: "white",
      opacity: 0.6,
      padding: {
        top: 12
      }
    });
  };

  return PreviewClass5;

})(PreviewClass4);


},{"PreviewClass4":"PreviewClass4"}],"PreviewClass6":[function(require,module,exports){
var PreviewClass5,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

PreviewClass5 = require("PreviewClass5").PreviewClass5;

exports.PreviewClass6 = (function(superClass) {
  extend(PreviewClass6, superClass);

  function PreviewClass6(options) {
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
    PreviewClass6.__super__.constructor.call(this, this.options);
    treeViewLayer.parent = this.parent;
  }

  PreviewClass6.define('treeView', {
    get: function() {
      return this.options.treeView;
    },
    set: function(value) {
      return this.options.treeView = value;
    }
  });

  PreviewClass6.define('indent', {
    get: function() {
      return this.options.indent;
    },
    set: function(value) {
      return this.options.indent = value;
    }
  });

  PreviewClass6.prototype.printTree = function() {
    print(this.view.children);
    this.printNode(this.view);
    this.treeView.height = Screen.height;
    return this.treeView.updateContent();
  };

  PreviewClass6.prototype.printNode = function(node, level) {
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

  return PreviewClass6;

})(PreviewClass5);


},{"PreviewClass5":"PreviewClass5"}],"PreviewComponentAssets":[function(require,module,exports){
exports.data = {
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
  notch: "modules/PreviewComponentAssets/statusBar_notch.png"
};


},{}],"PreviewComponent":[function(require,module,exports){
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


},{"Preview_UI":"Preview_UI"}],"Preview_Assets":[function(require,module,exports){
exports.data = {
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


},{}],"Preview_Class":[function(require,module,exports){
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


},{"Device_Class":"Device_Class","HomeBar_Class":"HomeBar_Class","Preview_Class":"Preview_Class","StatusBar_Class":"StatusBar_Class"}],"Preview_LogoLayer":[function(require,module,exports){
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


},{}],"Preview_UI":[function(require,module,exports){
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


},{"Logo":"Logo","Preview_Init":"Preview_Init","UI_Config":"UI_Config","UI_Section":"UI_Section"}],"ScaleView":[function(require,module,exports){
var LogoLayer, PhoneTypeView,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

LogoLayer = require("Preview_LogoLayer").LogoLayer;

PhoneTypeView = require("PhoneTypeView").PhoneTypeView;

exports.ScaleView = (function(superClass) {
  extend(ScaleView, superClass);

  function ScaleView(options) {
    this.options = options != null ? options : {};
    this.createScaleButton = bind(this.createScaleButton, this);
    this.createLogoButton = bind(this.createLogoButton, this);
    _.defaults(this.options, ScaleView.__super__.constructor.call(this, this.options));
  }

  ScaleView.prototype.createLogoButton = function() {
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

  ScaleView.prototype.createScaleButton = function(forState) {
    var buttonInsideLayer, buttonScale, updateButtonOnResize;
    buttonScale = new Layer({
      size: 48,
      borderRadius: 48,
      x: Align.right(-32),
      y: Align.bottom(-32),
      backgroundColor: "rgba(255,255,255, 0.1)",
      borderWidth: 2,
      custom: {
        preview: this
      }
    });
    buttonScale.style = {
      cursor: "pointer"
    };
    buttonScale.states = {
      "normal": {
        borderColor: "rgba(255,255,255, 0.2)"
      },
      "fill": {
        borderColor: "rgba(255,255,255, 0.6)"
      }
    };
    buttonScale.stateSwitch(forState);
    buttonInsideLayer = new Layer({
      parent: buttonScale,
      borderWidth: 2,
      size: 28,
      borderRadius: 22,
      x: 10,
      y: 10,
      backgroundColor: null
    });
    buttonInsideLayer.states = {
      "normal": {
        borderColor: "rgba(255,255,255, 0.6)"
      },
      "fill": {
        borderColor: "rgba(255,255,255, 0.2)"
      }
    };
    buttonInsideLayer.stateSwitch(forState);
    buttonScale.onTap(function() {
      var nextState;
      if (this.states.current.name === "fill") {
        nextState = "normal";
      } else {
        nextState = "fill";
      }
      this.stateSwitch(nextState);
      this.children[0].stateSwitch(nextState);
      return this.custom.preview.animate(nextState, {
        curve: Spring({
          damping: 1
        }),
        time: 0.5
      });
    });
    updateButtonOnResize = (function(_this) {
      return function(buttonLayer) {
        var localButton;
        localButton = buttonLayer;
        Canvas.on("change:height", function() {
          return buttonLayer.x = Align.right(-32);
        });
        return Canvas.on("change:width", function() {
          return buttonLayer.y = Align.bottom(-32);
        });
      };
    })(this);
    return updateButtonOnResize(buttonScale);
  };

  return ScaleView;

})(PhoneTypeView);


},{"PhoneTypeView":"PhoneTypeView","Preview_LogoLayer":"Preview_LogoLayer"}],"SectionView":[function(require,module,exports){
var LocationView,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

LocationView = require("LocationView").LocationView;

exports.SectionView = (function(superClass) {
  extend(SectionView, superClass);

  function SectionView(options) {
    var controlPanelLayer;
    this.options = options != null ? options : {};
    this.addSectionTitle = bind(this.addSectionTitle, this);
    this.addSectionButton = bind(this.addSectionButton, this);
    this.addSection = bind(this.addSection, this);
    controlPanelLayer = new Layer({
      width: 360,
      height: 1000,
      x: 20,
      y: 60,
      backgroundColor: null
    });
    _.defaults(this.options, {
      controlPanel: controlPanelLayer
    });
    SectionView.__super__.constructor.call(this, this.options);
    controlPanelLayer.parent = this.parent;
  }

  SectionView.define('controlPanel', {
    get: function() {
      return this.options.controlPanel;
    },
    set: function(value) {
      return this.options.controlPanel = value;
    }
  });

  SectionView.prototype.addSection = function(title, actionArray) {
    var actionItem, i, index, len, results, sectionButton, sectionView, sumX;
    if (actionArray == null) {
      actionArray = [];
    }
    if (Utils.isMobile()) {

    } else {
      sectionView = new Layer({
        width: 360,
        height: 100,
        parent: this.controlPanel,
        backgroundColor: null
      });
      sectionView.y = (this.controlPanel.children.length - 1) * 100;
      this.addSectionTitle(title).parent = sectionView;
      sumX = 0;
      results = [];
      for (index = i = 0, len = actionArray.length; i < len; index = ++i) {
        actionItem = actionArray[index];
        sectionButton = this.addSectionButton(actionItem);
        sectionButton.parent = sectionView;
        sectionButton.x = sumX;
        results.push(sumX += sectionButton.width + 8);
      }
      return results;
    }
  };

  SectionView.prototype.addSectionButton = function(actionItem, pV, pH) {
    var buttonLayer;
    if (pV == null) {
      pV = 6;
    }
    if (pH == null) {
      pH = 9;
    }
    buttonLayer = new TextLayer({
      text: actionItem.title,
      y: 42,
      padding: {
        top: pV,
        bottom: pV + 2,
        left: pH,
        right: pH
      },
      fontSize: 18,
      fontWeight: 500,
      color: "white",
      backgroundColor: "rgba(0,0,0,0.5)",
      borderRadius: 8
    });
    buttonLayer.on(Events.Tap, actionItem.handler);
    return buttonLayer;
  };

  SectionView.prototype.addSectionTitle = function(title) {
    if (title == null) {
      title = "Header Title";
    }
    return new TextLayer({
      text: title,
      fontSize: 15,
      fontWeight: 500,
      color: "white",
      opacity: 0.6,
      padding: {
        top: 12
      }
    });
  };

  return SectionView;

})(LocationView);


},{"LocationView":"LocationView"}],"StatusBar_Class":[function(require,module,exports){
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


},{}],"TreeLayerView":[function(require,module,exports){
var SectionView,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

SectionView = require("SectionView").SectionView;

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


},{"SectionView":"SectionView"}],"UI_Buttons":[function(require,module,exports){
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


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA4LTA3IFtwcF0gU2hlZGV2cm9vbSDigJMgQ29tcGFyZSBUaHJlZSBWaWRlb3MuZnJhbWVyL21vZHVsZXMvQnV0dG9ucy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA4LTA3IFtwcF0gU2hlZGV2cm9vbSDigJMgQ29tcGFyZSBUaHJlZSBWaWRlb3MuZnJhbWVyL21vZHVsZXMvQ29uZmlnVmlldy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA4LTA3IFtwcF0gU2hlZGV2cm9vbSDigJMgQ29tcGFyZSBUaHJlZSBWaWRlb3MuZnJhbWVyL21vZHVsZXMvQ29udHJvbFBhbmVsLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDgtMDcgW3BwXSBTaGVkZXZyb29tIOKAkyBDb21wYXJlIFRocmVlIFZpZGVvcy5mcmFtZXIvbW9kdWxlcy9EZXZpY2VWaWV3LmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDgtMDcgW3BwXSBTaGVkZXZyb29tIOKAkyBDb21wYXJlIFRocmVlIFZpZGVvcy5mcmFtZXIvbW9kdWxlcy9EZXZpY2VfQ2xhc3MuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0wOC0wNyBbcHBdIFNoZWRldnJvb20g4oCTIENvbXBhcmUgVGhyZWUgVmlkZW9zLmZyYW1lci9tb2R1bGVzL0RldmljZV9Jbml0LmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDgtMDcgW3BwXSBTaGVkZXZyb29tIOKAkyBDb21wYXJlIFRocmVlIFZpZGVvcy5mcmFtZXIvbW9kdWxlcy9Ib21lQmFyX0NsYXNzLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDgtMDcgW3BwXSBTaGVkZXZyb29tIOKAkyBDb21wYXJlIFRocmVlIFZpZGVvcy5mcmFtZXIvbW9kdWxlcy9Jbml0Vmlldy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA4LTA3IFtwcF0gU2hlZGV2cm9vbSDigJMgQ29tcGFyZSBUaHJlZSBWaWRlb3MuZnJhbWVyL21vZHVsZXMvTG9jYXRpb25WaWV3LmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDgtMDcgW3BwXSBTaGVkZXZyb29tIOKAkyBDb21wYXJlIFRocmVlIFZpZGVvcy5mcmFtZXIvbW9kdWxlcy9Mb2dvLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDgtMDcgW3BwXSBTaGVkZXZyb29tIOKAkyBDb21wYXJlIFRocmVlIFZpZGVvcy5mcmFtZXIvbW9kdWxlcy9OYXZpZ2F0aW9uQ29tcG9uZW50LmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDgtMDcgW3BwXSBTaGVkZXZyb29tIOKAkyBDb21wYXJlIFRocmVlIFZpZGVvcy5mcmFtZXIvbW9kdWxlcy9QQ0J1dHRvbnMuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0wOC0wNyBbcHBdIFNoZWRldnJvb20g4oCTIENvbXBhcmUgVGhyZWUgVmlkZW9zLmZyYW1lci9tb2R1bGVzL1Bob25lVHlwZVZpZXcuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0wOC0wNyBbcHBdIFNoZWRldnJvb20g4oCTIENvbXBhcmUgVGhyZWUgVmlkZW9zLmZyYW1lci9tb2R1bGVzL1ByZXZpZXdDbGFzczEuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0wOC0wNyBbcHBdIFNoZWRldnJvb20g4oCTIENvbXBhcmUgVGhyZWUgVmlkZW9zLmZyYW1lci9tb2R1bGVzL1ByZXZpZXdDbGFzczIuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0wOC0wNyBbcHBdIFNoZWRldnJvb20g4oCTIENvbXBhcmUgVGhyZWUgVmlkZW9zLmZyYW1lci9tb2R1bGVzL1ByZXZpZXdDbGFzczM1LmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDgtMDcgW3BwXSBTaGVkZXZyb29tIOKAkyBDb21wYXJlIFRocmVlIFZpZGVvcy5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3Q2xhc3MzLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDgtMDcgW3BwXSBTaGVkZXZyb29tIOKAkyBDb21wYXJlIFRocmVlIFZpZGVvcy5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3Q2xhc3M0LmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDgtMDcgW3BwXSBTaGVkZXZyb29tIOKAkyBDb21wYXJlIFRocmVlIFZpZGVvcy5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3Q2xhc3M1LmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDgtMDcgW3BwXSBTaGVkZXZyb29tIOKAkyBDb21wYXJlIFRocmVlIFZpZGVvcy5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3Q2xhc3M2LmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDgtMDcgW3BwXSBTaGVkZXZyb29tIOKAkyBDb21wYXJlIFRocmVlIFZpZGVvcy5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDgtMDcgW3BwXSBTaGVkZXZyb29tIOKAkyBDb21wYXJlIFRocmVlIFZpZGVvcy5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50LmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDgtMDcgW3BwXSBTaGVkZXZyb29tIOKAkyBDb21wYXJlIFRocmVlIFZpZGVvcy5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3X0Fzc2V0cy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA4LTA3IFtwcF0gU2hlZGV2cm9vbSDigJMgQ29tcGFyZSBUaHJlZSBWaWRlb3MuZnJhbWVyL21vZHVsZXMvUHJldmlld19DbGFzcy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA4LTA3IFtwcF0gU2hlZGV2cm9vbSDigJMgQ29tcGFyZSBUaHJlZSBWaWRlb3MuZnJhbWVyL21vZHVsZXMvUHJldmlld19Jbml0LmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDgtMDcgW3BwXSBTaGVkZXZyb29tIOKAkyBDb21wYXJlIFRocmVlIFZpZGVvcy5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3X0xvZ29MYXllci5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA4LTA3IFtwcF0gU2hlZGV2cm9vbSDigJMgQ29tcGFyZSBUaHJlZSBWaWRlb3MuZnJhbWVyL21vZHVsZXMvUHJldmlld19VSS5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA4LTA3IFtwcF0gU2hlZGV2cm9vbSDigJMgQ29tcGFyZSBUaHJlZSBWaWRlb3MuZnJhbWVyL21vZHVsZXMvU2NhbGVWaWV3LmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDgtMDcgW3BwXSBTaGVkZXZyb29tIOKAkyBDb21wYXJlIFRocmVlIFZpZGVvcy5mcmFtZXIvbW9kdWxlcy9TZWN0aW9uVmlldy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA4LTA3IFtwcF0gU2hlZGV2cm9vbSDigJMgQ29tcGFyZSBUaHJlZSBWaWRlb3MuZnJhbWVyL21vZHVsZXMvU3RhdHVzQmFyX0NsYXNzLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDgtMDcgW3BwXSBTaGVkZXZyb29tIOKAkyBDb21wYXJlIFRocmVlIFZpZGVvcy5mcmFtZXIvbW9kdWxlcy9UcmVlTGF5ZXJWaWV3LmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDgtMDcgW3BwXSBTaGVkZXZyb29tIOKAkyBDb21wYXJlIFRocmVlIFZpZGVvcy5mcmFtZXIvbW9kdWxlcy9VSV9CdXR0b25zLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDgtMDcgW3BwXSBTaGVkZXZyb29tIOKAkyBDb21wYXJlIFRocmVlIFZpZGVvcy5mcmFtZXIvbW9kdWxlcy9VSV9Db25maWcuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0wOC0wNyBbcHBdIFNoZWRldnJvb20g4oCTIENvbXBhcmUgVGhyZWUgVmlkZW9zLmZyYW1lci9tb2R1bGVzL1VJX1NlY3Rpb24uY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0wOC0wNyBbcHBdIFNoZWRldnJvb20g4oCTIENvbXBhcmUgVGhyZWUgVmlkZW9zLmZyYW1lci9tb2R1bGVzL1VJX1RyZWUuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0wOC0wNyBbcHBdIFNoZWRldnJvb20g4oCTIENvbXBhcmUgVGhyZWUgVmlkZW9zLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0VBLElBQUE7Ozs7QUFBTSxPQUFPLENBQUM7OztFQUNBLGdCQUFDLE9BQUQ7QUFFWixRQUFBO0lBRmEsSUFBQyxDQUFBLDRCQUFELFVBQVM7OztJQUV0QixLQUFBLEdBQVEsSUFBSSxLQUFKLENBQVU7TUFBRSxJQUFBLEVBQU0sRUFBUjtNQUFZLGVBQUEsRUFBaUIsTUFBN0I7S0FBVjtJQUVSLEtBQUssQ0FBQyxNQUFOLEdBQ0M7TUFBQSxTQUFBLEVBQVc7UUFBRSxPQUFBLEVBQVMsQ0FBWDtPQUFYO01BQ0EsUUFBQSxFQUFVO1FBQUUsT0FBQSxFQUFTLENBQVg7T0FEVjs7SUFHRCxLQUFLLENBQUMsRUFBTixDQUFTLE1BQU0sQ0FBQyxjQUFoQixFQUFnQyxTQUFDLElBQUQsRUFBTyxFQUFQO01BQy9CLElBQUcsSUFBQSxLQUFRLEVBQVg7ZUFBbUIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxPQUFSLENBQWdCLEVBQWhCLEVBQW5COztJQUQrQixDQUFoQztJQUdBLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLE9BQUEsRUFBUyxJQUFUO01BQ0EsS0FBQSxFQUFPLElBRFA7TUFFQSxPQUFBLEVBQVMsR0FGVDtLQUREO0lBS0Esd0NBQU0sSUFBQyxDQUFBLE9BQVA7SUFFQSxJQUFDLENBQUEsTUFBRCxHQUNDO01BQUEsU0FBQSxFQUFXO1FBQUUsS0FBQSxFQUFPLElBQUMsQ0FBQSxPQUFWO09BQVg7TUFDQSxRQUFBLEVBQVU7UUFBRSxLQUFBLEVBQU8sR0FBVDtPQURWOztJQUdELEtBQUssQ0FBQyxNQUFOLEdBQWU7SUFDZixJQUFDLENBQUEsS0FBRCxHQUFTO0lBRVQsSUFBQyxDQUFDLFlBQUYsQ0FBZSxJQUFDLENBQUEsS0FBaEI7SUFDQSxJQUFDLENBQUMsVUFBRixDQUFhLElBQUMsQ0FBQSxRQUFkO0lBQ0EsSUFBQyxDQUFDLFlBQUYsQ0FBZSxJQUFDLENBQUEsUUFBaEI7SUFDQSxJQUFDLENBQUMsV0FBRixDQUFjLElBQUMsQ0FBQSxRQUFmO0VBNUJZOzttQkE4QmIsS0FBQSxHQUFPLFNBQUE7V0FBRyxJQUFDLENBQUEsS0FBSyxDQUFDLFdBQVAsQ0FBbUIsU0FBbkI7RUFBSDs7bUJBQ1AsUUFBQSxHQUFVLFNBQUE7V0FBRyxJQUFDLENBQUEsS0FBSyxDQUFDLFdBQVAsQ0FBbUIsUUFBbkI7RUFBSDs7RUFJVixNQUFDLENBQUEsTUFBRCxDQUFRLE9BQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxLQUFULEdBQWlCO0lBQTVCLENBREw7R0FERDs7RUFJQSxNQUFDLENBQUEsTUFBRCxDQUFRLFNBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxPQUFULEdBQW1CO0lBQTlCLENBREw7R0FERDs7RUFJQSxNQUFDLENBQUEsTUFBRCxDQUFRLFNBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsRUFBRCxDQUFJLE1BQU0sQ0FBQyxHQUFYLEVBQWdCLEtBQWhCO0lBQVgsQ0FBTDtHQUREOzs7O0dBNUM0Qjs7OztBQ0E3QixJQUFBLDhCQUFBO0VBQUE7Ozs7QUFBQyxjQUFlLE9BQUEsQ0FBUSxhQUFSOztBQUNoQixNQUFpQixPQUFBLENBQVEsV0FBUixDQUFqQixFQUFDLGVBQUQsRUFBTzs7QUFFRCxPQUFPLENBQUM7OztFQUNBLG9CQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUzs7O0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLE1BQUEsRUFBUSxHQUFSO01BQ0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFOLENBQWEsQ0FBQyxDQUFkLENBREg7S0FERDtJQUlBLDRDQUFNLElBQUMsQ0FBQSxPQUFQO0VBTlk7O3VCQVNiLFVBQUEsR0FBWSxTQUFDLFdBQUQ7QUFDWCxRQUFBOztNQURZLGNBQWM7O0lBQzFCLElBQUcsQ0FBQyxLQUFLLENBQUMsUUFBTixDQUFBLENBQUo7TUFDQyxXQUFBLEdBQWMsSUFBSSxLQUFKLENBQ2I7UUFBQSxNQUFBLEVBQVEsSUFBUjtRQUNBLEtBQUEsRUFBTyxHQURQO1FBQ1ksTUFBQSxFQUFRLEdBRHBCO1FBQ3lCLGVBQUEsRUFBaUIsSUFEMUM7UUFFQSxDQUFBLEVBQUcsRUFGSDtRQUVPLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBTixDQUFBLENBRlY7T0FEYTtNQUtkLElBQUMsQ0FBQSxlQUFELENBQWlCLFdBQWpCLEVBQThCLGtCQUE5QjtNQUNBLFdBQVcsQ0FBQyxLQUFaLEdBQW9CO1FBQUEsTUFBQSxFQUFRLFNBQVI7O01BQ3BCLFdBQVcsQ0FBQyxLQUFaLENBQWtCLFNBQUEsR0FBQSxDQUFsQjtNQUNBLFdBQVcsQ0FBQyxRQUFaLEdBQXVCLFNBQUEsR0FBQTtNQUV2QixJQUFBLEdBQU87QUFDUCxXQUFBLHFEQUFBOztRQUNDLGFBQUEsR0FBZ0IsSUFBQyxDQUFBLGVBQUQsQ0FBaUIsVUFBakIsRUFBNkIsQ0FBN0I7UUFDaEIsYUFBYSxDQUFDLE1BQWQsR0FBdUI7UUFDdkIsYUFBYSxDQUFDLENBQWQsR0FBa0I7UUFDbEIsSUFBQSxJQUFRLGFBQWEsQ0FBQyxLQUFkLEdBQXNCLENBQXRCLEdBQTBCO0FBSm5DO2FBTUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFJLENBQUMsR0FBTCxDQUFTLElBQUMsQ0FBQSxLQUFWLEVBQWlCLElBQWpCLEVBbEJWOztFQURXOzt1QkF3QlosZUFBQSxHQUFpQixTQUFDLFVBQUQsRUFBYSxLQUFiO0FBQ2hCLFFBQUE7SUFBQSxXQUFBLEdBQWMsSUFBSSxNQUFKLENBQ2I7TUFBQSxJQUFBLEVBQU0sVUFBVSxDQUFDLEtBQWpCO01BQ0EsQ0FBQSxFQUFHLEVBREg7TUFFQSxRQUFBLEVBQWEsS0FBQSxLQUFTLENBQVosR0FBbUIsSUFBbkIsR0FBNkIsS0FGdkM7TUFHQSxNQUFBLEVBQ0M7UUFBQSxVQUFBLEVBQVksVUFBWjtPQUpEO0tBRGE7SUFPZCxjQUFBLEdBQWlCLFNBQUE7YUFDaEIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBbkIsQ0FBMkIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBOUMsRUFBb0QsSUFBcEQ7SUFEZ0I7SUFHakIsV0FBVyxDQUFDLEVBQVosQ0FBZSxNQUFNLENBQUMsR0FBdEIsRUFBMkIsY0FBM0I7QUFDQSxXQUFPO0VBWlM7Ozs7R0FsQ2U7Ozs7QUNIakMsSUFBQTs7QUFBQSxTQUFBLEdBQVk7O0FBS1osUUFBQSxHQUFXLFNBQUMsU0FBRCxFQUF5QixNQUF6QixFQUF3QyxLQUF4QyxFQUE4RCxNQUE5RCxFQUE0RSxPQUE1RSxFQUEyRixPQUEzRixFQUF3RyxNQUF4RztBQUNWLE1BQUE7O0lBRFcsWUFBWTs7O0lBQVksU0FBUzs7O0lBQU0sUUFBUTs7O0lBQWMsU0FBUzs7O0lBQUssVUFBVTs7O0lBQUssVUFBVTs7O0lBQUcsU0FBUzs7RUFDM0gsU0FBQSxHQUFZLElBQUksS0FBSixDQUNYO0lBQUEsTUFBQSxFQUFRLE1BQVI7SUFDQSxLQUFBLEVBQU8sTUFEUDtJQUVBLE1BQUEsRUFBUSxPQUZSO0lBR0EsSUFBQSxFQUFNLEVBQUEsR0FBRyxLQUhUO0lBSUEsZUFBQSxFQUFpQixNQUpqQjtJQU1BLE1BQUEsRUFDQztNQUFBLFNBQUEsRUFBVyxTQUFYO01BQ0EsT0FBQSxFQUFTLE9BRFQ7TUFFQSxNQUFBLEVBQVEsTUFGUjtLQVBEO0dBRFc7RUFZWixTQUFTLENBQUMsRUFBVixDQUFhLGlCQUFiLEVBQWdDLFNBQUE7QUFDL0IsUUFBQTtJQUFBLElBQUcsSUFBQyxDQUFBLE1BQU0sQ0FBQyxTQUFSLEtBQXFCLFVBQXhCO01BQXdDLEdBQUEsR0FBTTtRQUFFLENBQUEsRUFBRyxHQUFMO1FBQVUsQ0FBQSxFQUFHLFFBQWI7UUFBOUM7S0FBQSxNQUNLLElBQUcsSUFBQyxDQUFBLE1BQU0sQ0FBQyxTQUFSLEtBQXFCLFlBQXhCO01BQTBDLEdBQUEsR0FBTTtRQUFFLENBQUEsRUFBRyxHQUFMO1FBQVUsQ0FBQSxFQUFHLE9BQWI7UUFBaEQ7S0FBQSxNQUNBLElBQUcsSUFBQyxDQUFBLE1BQU0sQ0FBQyxTQUFSLEtBQXFCLG9CQUF4QjtNQUFrRCxHQUFBLEdBQU07UUFBRSxDQUFBLEVBQUcsR0FBTDtRQUFVLENBQUEsRUFBRyxPQUFiO1FBQXhEOztJQUVMLE1BQUEsR0FBUyxJQUFDLENBQUEsTUFBTSxDQUFDO0FBQ2pCO0FBQUE7U0FBQSw2Q0FBQTs7TUFFQyxJQUFHLElBQUMsQ0FBQSxNQUFNLENBQUMsU0FBUixLQUFxQixZQUFyQixJQUFxQyxJQUFDLENBQUEsTUFBTSxDQUFDLFNBQVIsS0FBcUIsVUFBN0Q7UUFBNkUsSUFBSyxDQUFBLEdBQUcsQ0FBQyxDQUFKLENBQUwsR0FBYyxPQUEzRjtPQUFBLE1BQ0ssSUFBRyxJQUFDLENBQUEsTUFBTSxDQUFDLFNBQVIsS0FBcUIsb0JBQXhCO1FBQWtELElBQUssQ0FBQSxHQUFHLENBQUMsQ0FBSixDQUFMLEdBQWMsSUFBQyxDQUFBLEtBQUQsR0FBUyxNQUFULEdBQWtCLElBQUssQ0FBQSxHQUFHLENBQUMsQ0FBSixFQUF2Rjs7bUJBRUwsTUFBQSxJQUFVLElBQUssQ0FBQSxHQUFHLENBQUMsQ0FBSixDQUFMLEdBQWMsSUFBQyxDQUFBLE1BQU0sQ0FBQztBQUxqQzs7RUFOK0IsQ0FBaEM7QUFjQSxTQUFPO0FBM0JHOztBQW1DWCxrQkFBQSxHQUFxQixTQUFBO0FBQ3BCLE1BQUE7RUFBQSxNQUFBLEdBQVMsSUFBSSxLQUFKLENBQ1I7SUFBQSxJQUFBLEVBQU0sU0FBTjtJQUNBLEtBQUEsRUFBTyxNQUFNLENBQUMsS0FEZDtJQUVBLE1BQUEsRUFBUSxNQUFNLENBQUMsTUFGZjtJQUdBLGVBQUEsRUFBaUIsTUFIakI7R0FEUTtFQU1ULFNBQUEsR0FBWSxRQUFBLENBQVMsVUFBVCxFQUFxQixNQUFyQixFQUE2QixZQUE3QixFQUEyQyxHQUEzQyxFQUFnRCxNQUFNLENBQUMsTUFBdkQsRUFBK0QsQ0FBL0QsRUFBa0UsRUFBbEU7RUFDWixVQUFBLEdBQWEsUUFBQSxDQUFTLFVBQVQsRUFBcUIsTUFBckIsRUFBNkIsYUFBN0IsRUFBNEMsR0FBNUMsRUFBaUQsTUFBTSxDQUFDLE1BQXhELEVBQWdFLENBQWhFLEVBQW1FLEVBQW5FO1NBQ2IsVUFBVSxDQUFDLENBQVgsR0FBZSxLQUFLLENBQUMsS0FBTixDQUFBO0FBVEs7O0FBWXJCLFNBQUEsR0FBWSxTQUFDLEtBQUQsRUFBUSxHQUFSO0FBQ1gsTUFBQTtBQUFBO0FBQUEsT0FBQSxxQ0FBQTs7SUFDQyxJQUFHLElBQUksQ0FBQyxJQUFMLEtBQWEsR0FBaEI7QUFBeUIsYUFBTyxLQUFoQzs7QUFERDtBQUVBLFNBQU87QUFISTs7QUFLWixTQUFBLEdBQVksU0FBQyxLQUFELEVBQVEsR0FBUjtBQUNYLE1BQUE7O0lBRG1CLE1BQU07O0VBQ3pCLElBQUcsS0FBSyxDQUFDLElBQU4sS0FBYyxhQUFqQjtJQUFvQyxjQUFBLEdBQWlCLHFCQUFyRDtHQUFBLE1BQUE7SUFDSyxjQUFBLEdBQWlCLGFBRHRCOztFQUdBLFdBQUEsR0FBYyxTQUFBLENBQVUsS0FBVixFQUFpQixHQUFqQjtFQUNkLElBQUcsV0FBQSxLQUFlLElBQWxCO0FBQTRCLFdBQU8sWUFBbkM7R0FBQSxNQUFBO0lBQ0ssV0FBQSxHQUFjLFFBQUEsQ0FBUyxjQUFULEVBQXlCLEtBQXpCLEVBQWdDLEdBQWhDLEVBQXFDLEtBQUssQ0FBQyxLQUEzQyxFQUFrRCxFQUFsRCxFQUFzRCxDQUF0RCxFQURuQjs7QUFHQSxTQUFPO0FBUkk7O0FBbUJaLE9BQU8sQ0FBQyxPQUFSLEdBQWtCLFNBQUMsSUFBRDs7SUFBQyxPQUFPOztBQUN6QixTQUFPLElBQUksQ0FBQyxNQUFMLENBQVksRUFBWixFQUFnQixJQUFoQjtBQURVOztBQUlsQixPQUFPLENBQUMsTUFBUixHQUFpQixTQUFDLEtBQUQsRUFBbUIsSUFBbkI7QUFDaEIsTUFBQTs7SUFEaUIsUUFBUTs7O0lBQVUsT0FBTzs7RUFDMUMsSUFBRyxLQUFLLENBQUMsTUFBTixDQUFhLFNBQWIsQ0FBQSxLQUEyQixNQUE5QjtJQUE2QyxrQkFBQSxDQUFBLEVBQTdDOztFQUNBLElBQUcsZ0JBQUEsQ0FBaUIsSUFBakIsQ0FBQSxLQUEwQixJQUE3QjtBQUF1QyxXQUFPLEtBQTlDOztFQUVBLFVBQUEsR0FBYSxJQUFJLFNBQUosQ0FDWjtJQUFBLElBQUEsRUFBTSxLQUFOO0lBQ0EsUUFBQSxFQUFVLEVBRFY7SUFFQSxVQUFBLEVBQVksR0FGWjtJQUdBLEtBQUEsRUFBTyxPQUhQO0lBS0EsT0FBQSxFQUFTLEdBTFQ7SUFNQSxPQUFBLEVBQ0M7TUFBQSxHQUFBLEVBQUssRUFBTDtNQUNBLElBQUEsRUFBUyxJQUFBLEtBQVEsTUFBWCxHQUF1QixDQUF2QixHQUE4QixDQURwQztNQUVBLEtBQUEsRUFBVSxJQUFBLEtBQVEsT0FBWCxHQUF3QixDQUF4QixHQUErQixDQUZ0QztLQVBEO0dBRFk7RUFZYixVQUFVLENBQUMsTUFBWCxHQUFvQixTQUFBLENBQVUsZ0JBQUEsQ0FBaUIsSUFBakIsQ0FBVixFQUFrQyxLQUFLLENBQUMsWUFBTixDQUFBLENBQWxDO0FBQ3BCLFNBQU87QUFqQlM7O0FBbUJqQixnQkFBQSxHQUFtQixTQUFDLElBQUQ7RUFDbEIsSUFBRyxJQUFBLEtBQVEsTUFBWDtBQUF1QixXQUFPLEtBQUssQ0FBQyxNQUFOLENBQWEsU0FBYixDQUF1QixDQUFDLFFBQVMsQ0FBQSxDQUFBLEVBQS9EO0dBQUEsTUFDSyxJQUFHLElBQUEsS0FBUSxPQUFYO0FBQXdCLFdBQU8sS0FBSyxDQUFDLE1BQU4sQ0FBYSxTQUFiLENBQXVCLENBQUMsUUFBUyxDQUFBLENBQUEsRUFBaEU7O0FBQ0wsU0FBTztBQUhXOztBQUtuQixPQUFPLENBQUMsTUFBUixHQUFpQixTQUFDLEtBQUQsRUFBbUIsT0FBbkIsRUFBbUMsSUFBbkMsRUFBa0QsR0FBbEQsRUFBNkQsRUFBN0QsRUFBcUUsRUFBckU7QUFDaEIsTUFBQTs7SUFEaUIsUUFBUTs7O0lBQVUsVUFBVTs7O0lBQU0sT0FBTzs7O0lBQVEsTUFBTTs7O0lBQUssS0FBSzs7O0lBQUcsS0FBSzs7RUFDMUYsSUFBRyxLQUFLLENBQUMsTUFBTixDQUFhLFNBQWIsQ0FBQSxLQUEyQixNQUE5QjtJQUE2QyxrQkFBQSxDQUFBLEVBQTdDOztFQUNBLElBQUcsZ0JBQUEsQ0FBaUIsSUFBakIsQ0FBQSxLQUEwQixJQUE3QjtBQUF1QyxXQUFPLEtBQTlDOztFQUVBLFVBQUEsR0FBYSxJQUFJLFNBQUosQ0FDWjtJQUFBLElBQUEsRUFBTSxLQUFOO0lBQ0EsT0FBQSxFQUFTO01BQUUsR0FBQSxFQUFLLEVBQVA7TUFBVyxNQUFBLEVBQVEsRUFBQSxHQUFLLENBQXhCO01BQTJCLElBQUEsRUFBTSxFQUFqQztNQUFxQyxLQUFBLEVBQU8sRUFBNUM7S0FEVDtJQUVBLFFBQUEsRUFBVSxFQUZWO0lBR0EsVUFBQSxFQUFZLEdBSFo7SUFJQSxLQUFBLEVBQU8sT0FKUDtJQUtBLGVBQUEsRUFBaUIsaUJBTGpCO0lBTUEsWUFBQSxFQUFjLENBTmQ7R0FEWTtFQVNiLFVBQVUsQ0FBQyxNQUFYLEdBQ0M7SUFBQSxPQUFBLEVBQVM7TUFBRSxlQUFBLEVBQWlCLGlCQUFuQjtLQUFUO0lBQ0EsUUFBQSxFQUFVO01BQUUsZUFBQSxFQUFpQixpQkFBbkI7S0FEVjs7RUFFRCxVQUFVLENBQUMsV0FBWCxDQUF1QixRQUF2QjtFQUVBLFVBQVUsQ0FBQyxNQUFYLEdBQW9CLFNBQUEsQ0FBVSxnQkFBQSxDQUFpQixJQUFqQixDQUFWLEVBQWtDLEdBQWxDO0VBQ3BCLFVBQVUsQ0FBQyxFQUFYLENBQWMsTUFBTSxDQUFDLEdBQXJCLEVBQTBCLE9BQTFCO0FBRUEsU0FBTztBQXJCUzs7OztBQ3hHakIsSUFBQSxTQUFBO0VBQUE7Ozs7QUFBQyxZQUFhLE9BQUEsQ0FBUSxXQUFSOztBQUdSLE9BQU8sQ0FBQzs7O0VBQ0Esb0JBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTOzs7OztJQUV0QixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxVQUFBLEVBQVksSUFBWjtNQUNBLFVBQUEsRUFBWSxJQURaO0tBREQ7SUFJQSw0Q0FBTSxJQUFDLENBQUEsT0FBUDtJQUVBLElBQUMsQ0FBQSxVQUFELEdBQWMsSUFBSSxLQUFKLENBQ2I7TUFBQSxlQUFBLEVBQWlCLEtBQWpCO01BQ0EsWUFBQSxFQUFjLElBQUMsQ0FBQSxZQUFELEdBQWdCLEVBRDlCO01BRUEsT0FBQSxFQUFTLENBRlQ7S0FEYTtJQUtkLElBQUMsQ0FBQSxVQUFVLENBQUMsVUFBWixDQUFBO0lBRUEsSUFBQyxDQUFBLGlCQUFELENBQUE7SUFDQSxJQUFDLENBQUEsZ0JBQUQsQ0FBQTtJQUVBLElBQUMsQ0FBQSxFQUFELENBQUksYUFBSixFQUFtQixTQUFBO2FBQ2xCLElBQUMsQ0FBQSxnQkFBRCxDQUFBO0lBRGtCLENBQW5CO0lBR0EsSUFBQyxDQUFBLEVBQUQsQ0FBSSxjQUFKLEVBQW9CLFNBQUE7YUFDbkIsSUFBQyxDQUFBLGdCQUFELENBQUE7SUFEbUIsQ0FBcEI7SUFHQSxJQUFDLENBQUEsRUFBRCxDQUFJLFVBQUosRUFBZ0IsU0FBQTthQUNmLElBQUMsQ0FBQSxnQkFBRCxDQUFBO0lBRGUsQ0FBaEI7SUFHQSxJQUFDLENBQUEsRUFBRCxDQUFJLFVBQUosRUFBZ0IsU0FBQTthQUNmLElBQUMsQ0FBQSxnQkFBRCxDQUFBO0lBRGUsQ0FBaEI7RUEzQlk7O0VBK0JiLFVBQUMsQ0FBQSxNQUFELENBQVEsWUFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLFVBQVQsR0FBc0I7SUFBakMsQ0FETDtHQUREOztFQUlBLFVBQUMsQ0FBQSxNQUFELENBQVEsWUFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLFVBQVQsR0FBc0I7SUFBakMsQ0FETDtHQUREOzt1QkFPQSxjQUFBLEdBQWdCLFNBQUE7V0FDZixJQUFDLENBQUEsVUFBVSxDQUFDLE9BQVosR0FBc0I7RUFEUDs7dUJBR2hCLGNBQUEsR0FBZ0IsU0FBQTtXQUNmLElBQUMsQ0FBQSxVQUFVLENBQUMsT0FBWixHQUFzQjtFQURQOzt1QkFJaEIsZ0JBQUEsR0FBa0IsU0FBQTtBQUNqQixRQUFBO0lBQUEsTUFBQSxHQUFTO0lBRVQsSUFBQyxDQUFBLFVBQVUsQ0FBQyxLQUFaLEdBQW9CLElBQUMsQ0FBQSxLQUFELEdBQVMsTUFBQSxHQUFTO0lBQ3RDLElBQUMsQ0FBQSxVQUFVLENBQUMsTUFBWixHQUFxQixJQUFDLENBQUEsTUFBRCxHQUFVLE1BQUEsR0FBUztJQUN4QyxJQUFDLENBQUEsVUFBVSxDQUFDLENBQVosR0FBZ0IsS0FBSyxDQUFDLE1BQU4sQ0FBQTtJQUNoQixJQUFDLENBQUEsVUFBVSxDQUFDLENBQVosR0FBZ0IsS0FBSyxDQUFDLE1BQU4sQ0FBQTtXQUNoQixJQUFDLENBQUEsVUFBVSxDQUFDLEtBQVosR0FBb0IsSUFBQyxDQUFBO0VBUEo7O3VCQVVsQixpQkFBQSxHQUFtQixTQUFBO0FBQ2xCLFFBQUE7SUFBQSxJQUFDLENBQUEsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUF0QixDQUEwQixrQkFBMUI7SUFFQSxHQUFBLEdBQU07V0F1Qk4sS0FBSyxDQUFDLFNBQU4sQ0FBZ0IsR0FBaEI7RUExQmtCOzs7O0dBNURhOzs7O0FDSmpDLElBQUE7Ozs7QUFBTSxPQUFPLENBQUM7OztFQUNBLHNCQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUzs7Ozs7O0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLGVBQUEsRUFBaUIsS0FBakI7TUFDQSxJQUFBLEVBQU0sSUFETjtLQUREO0lBSUEsOENBQU0sSUFBQyxDQUFBLE9BQVA7SUFHQSxJQUFDLENBQUEsTUFBRCxHQUNDO01BQUEsUUFBQSxFQUFVO1FBQUUsS0FBQSxFQUFPLENBQVQ7T0FBVjtNQUNBLE1BQUEsRUFBUTtRQUFFLEtBQUEsRUFBTyxDQUFUO09BRFI7O0lBR0QsSUFBQyxDQUFBLGlCQUFELENBQUE7SUFDQSxJQUFDLENBQUEsVUFBRCxDQUFBO0VBZFk7O0VBa0JiLFlBQUMsQ0FBQSxNQUFELENBQVEsTUFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7TUFDSixJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsR0FBZ0I7TUFDaEIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxLQUFULEdBQWlCLEtBQUssQ0FBQyxLQUFOLEdBQWMsRUFBQSxHQUFLO01BQ3BDLElBQUMsQ0FBQSxPQUFPLENBQUMsTUFBVCxHQUFrQixLQUFLLENBQUMsTUFBTixHQUFlLEVBQUEsR0FBSzthQUN0QyxJQUFDLENBQUEsWUFBRCxHQUFnQixLQUFLLENBQUMsWUFBTixHQUFxQjtJQUpqQyxDQURMO0dBREQ7O3lCQVFBLG1CQUFBLEdBQXFCLFNBQUE7V0FDcEIsSUFBQyxDQUFBLE9BQUQsQ0FBUztNQUFBLEtBQUEsRUFBTyxJQUFDLENBQUEsTUFBTyxDQUFBLFFBQUEsQ0FBUyxDQUFDLEtBQXpCO01BQWdDLE9BQUEsRUFBUztRQUFFLEtBQUEsRUFBTyxNQUFNLENBQUMsTUFBaEI7UUFBd0IsSUFBQSxFQUFNLENBQTlCO09BQXpDO0tBQVQ7RUFEb0I7O3lCQUdyQixpQkFBQSxHQUFtQixTQUFBO1dBQ2xCLElBQUMsQ0FBQSxPQUFELENBQVM7TUFBQSxLQUFBLEVBQU8sSUFBQyxDQUFBLE1BQU8sQ0FBQSxNQUFBLENBQU8sQ0FBQyxLQUF2QjtNQUE4QixPQUFBLEVBQVM7UUFBRSxLQUFBLEVBQU8sTUFBTSxDQUFDLE1BQWhCO1FBQXdCLElBQUEsRUFBTSxDQUE5QjtPQUF2QztLQUFUO0VBRGtCOzt5QkFHbkIsb0JBQUEsR0FBc0IsU0FBQTtXQUNyQixJQUFDLENBQUEsT0FBRCxDQUFTO01BQUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxNQUFPLENBQUEsUUFBQSxDQUFTLENBQUMsS0FBekI7TUFBZ0MsT0FBQSxFQUFTO1FBQUUsS0FBQSxFQUFPLE1BQUEsQ0FBTztVQUFBLE9BQUEsRUFBUyxDQUFUO1NBQVAsQ0FBVDtRQUE2QixJQUFBLEVBQU0sR0FBbkM7T0FBekM7S0FBVDtFQURxQjs7eUJBR3RCLGtCQUFBLEdBQW9CLFNBQUE7V0FDbkIsSUFBQyxDQUFBLE9BQUQsQ0FBUztNQUFBLEtBQUEsRUFBTyxJQUFDLENBQUEsTUFBTyxDQUFBLE1BQUEsQ0FBTyxDQUFDLEtBQXZCO01BQThCLE9BQUEsRUFBUztRQUFFLEtBQUEsRUFBTyxNQUFBLENBQU87VUFBQSxPQUFBLEVBQVMsQ0FBVDtTQUFQLENBQVQ7UUFBNkIsSUFBQSxFQUFNLEdBQW5DO09BQXZDO0tBQVQ7RUFEbUI7O3lCQUtwQixpQkFBQSxHQUFtQixTQUFBO0FBQ2xCLFFBQUE7SUFBQSxJQUFDLENBQUEsU0FBUyxDQUFDLEdBQVgsQ0FBZSxrQkFBZjtJQUVBLEdBQUEsR0FBTTtXQXVCTixLQUFLLENBQUMsU0FBTixDQUFnQixHQUFoQjtFQTFCa0I7Ozs7R0F6Q2U7Ozs7QUNDbkMsSUFBQSwyQkFBQTtFQUFBOzs7O0FBQUUsZUFBaUIsT0FBQSxDQUFRLGNBQVI7O0FBRWIsT0FBTyxDQUFDOzs7RUFDQSxxQkFBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7Ozs7Ozs7O0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLE9BQUEsRUFBUyxJQUFDLENBQUEsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUE1QjtNQUNBLGVBQUEsRUFBaUIsSUFBQyxDQUFBLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBRHBDO01BRUEsU0FBQSxFQUFXLElBQUMsQ0FBQSxJQUFJLENBQUMsWUFBWSxDQUFDLGVBRjlCO01BR0EsT0FBQSxFQUFTLElBQUMsQ0FBQSxJQUFJLENBQUMsWUFBWSxDQUFDLGFBSDVCO01BS0EscUJBQUEsRUFBdUIsSUFBQyxDQUFBLElBQUksQ0FBQyxTQUw3QjtNQVFBLGFBQUEsRUFBZSxJQVJmO01BU0EsV0FBQSxFQUFhLElBVGI7S0FERDtJQVlBLDZDQUFNLElBQUMsQ0FBQSxPQUFQO0lBRUEsSUFBQyxDQUFBLFVBQUQsQ0FBQTtFQWhCWTs7RUFxQmIsV0FBQyxDQUFBLE1BQUQsQ0FBUSxTQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTtNQUFHLElBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxPQUFaO0FBQXlCLGVBQU8sRUFBaEM7T0FBQSxNQUFBO0FBQXVDLGVBQU8sRUFBOUM7O0lBQUgsQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLE9BQVQsR0FBbUI7SUFBOUIsQ0FETDtHQUREOztFQUlBLFdBQUMsQ0FBQSxNQUFELENBQVEsaUJBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxlQUFULEdBQTJCO0lBQXRDLENBREw7R0FERDs7RUFJQSxXQUFDLENBQUEsTUFBRCxDQUFRLFdBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFULEdBQXFCO0lBQWhDLENBREw7R0FERDs7RUFJQSxXQUFDLENBQUEsTUFBRCxDQUFRLFNBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxPQUFULEdBQW1CO0lBQTlCLENBREw7R0FERDs7RUFJQSxXQUFDLENBQUEsTUFBRCxDQUFRLHVCQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMscUJBQVQsR0FBaUM7SUFBNUMsQ0FETDtHQUREOztFQVFBLFdBQUMsQ0FBQSxNQUFELENBQVEsZUFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLGFBQVQsR0FBeUI7SUFBcEMsQ0FETDtHQUREOztFQUlBLFdBQUMsQ0FBQSxNQUFELENBQVEsYUFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLFdBQVQsR0FBdUI7SUFBbEMsQ0FETDtHQUREOzt3QkFNQSxRQUFBLEdBQVUsU0FBQyxDQUFELEVBQUksQ0FBSjtBQUFVLFdBQU8sSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFOLEtBQWUsQ0FBZixJQUFxQixJQUFDLENBQUEsSUFBSSxDQUFDLE1BQU4sS0FBZ0I7RUFBdEQ7O3dCQUlWLFVBQUEsR0FBWSxTQUFBO0lBQ1gsSUFBQyxDQUFBLGFBQUQsR0FBaUIsSUFBSSxLQUFKLENBQ2hCO01BQUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxJQUFUO01BQWUsS0FBQSxFQUFPLElBQUMsQ0FBQSxJQUFJLENBQUMsS0FBNUI7TUFBbUMsQ0FBQSxFQUFHLEtBQUssQ0FBQyxHQUE1QztNQUFpRCxJQUFBLEVBQU0sYUFBdkQ7TUFDQSxPQUFBLEVBQVMsSUFBQyxDQUFBLE9BRFY7TUFDbUIsZUFBQSxFQUFpQixJQURwQztLQURnQjtJQUlqQixJQUFHLElBQUMsQ0FBQSxlQUFKO2FBQ0MsSUFBQyxDQUFBLDZCQUFELENBQStCLElBQUMsQ0FBQSxhQUFoQyxFQUREO0tBQUEsTUFHSyxJQUFHLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBQSxJQUF1QixJQUFDLENBQUEsUUFBRCxDQUFVLEdBQVYsRUFBZSxHQUFmLENBQXZCLElBQThDLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBOUMsSUFBcUUsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUFyRSxJQUE0RixJQUFDLENBQUEsUUFBRCxDQUFVLEdBQVYsRUFBZSxHQUFmLENBQS9GO01BQ0osSUFBQyxDQUFBLG9CQUFELENBQXNCLElBQUMsQ0FBQSxhQUF2QjthQUNBLElBQUMsQ0FBQSxtQkFBRCxDQUFxQixJQUFJLEtBQUosQ0FDcEI7UUFBQSxNQUFBLEVBQVEsSUFBQyxDQUFBLElBQVQ7UUFBZSxLQUFBLEVBQU8sSUFBQyxDQUFBLElBQUksQ0FBQyxLQUE1QjtRQUFtQyxNQUFBLEVBQVEsRUFBM0M7UUFBK0MsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUF4RDtRQUFnRSxJQUFBLEVBQU0sV0FBdEU7UUFBbUYsT0FBQSxFQUFTLElBQUMsQ0FBQSxPQUE3RjtRQUFzRyxlQUFBLEVBQWlCLElBQXZIO09BRG9CLENBQXJCLEVBRkk7S0FBQSxNQUtBLElBQUcsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUFIO01BQ0osSUFBQyxDQUFBLG9CQUFELENBQXNCLElBQUMsQ0FBQSxhQUF2QjthQUNBLElBQUMsQ0FBQSxtQkFBRCxDQUFxQixJQUFJLEtBQUosQ0FDcEI7UUFBQSxNQUFBLEVBQVEsSUFBQyxDQUFBLElBQVQ7UUFBZSxLQUFBLEVBQU8sSUFBQyxDQUFBLElBQUksQ0FBQyxLQUE1QjtRQUFtQyxNQUFBLEVBQVEsRUFBM0M7UUFBK0MsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUF4RDtRQUFnRSxJQUFBLEVBQU0sV0FBdEU7UUFBbUYsT0FBQSxFQUFTLElBQUMsQ0FBQSxPQUE3RjtRQUFzRyxlQUFBLEVBQWlCLElBQXZIO09BRG9CLENBQXJCLEVBRkk7S0FBQSxNQUtBLElBQUcsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUFBLElBQXVCLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBdkIsSUFBOEMsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUFqRDthQUNKLElBQUMsQ0FBQSxzQkFBRCxDQUF3QixJQUFDLENBQUEsYUFBekIsRUFESTtLQUFBLE1BQUE7YUFJQSxJQUFDLENBQUEsc0JBQUQsQ0FBd0IsSUFBQyxDQUFBLGFBQXpCLEVBSkE7O0VBbEJNOzt3QkE4Qlosc0JBQUEsR0FBd0IsU0FBQyxRQUFEO0FBQ3ZCLFFBQUE7SUFBQSxRQUFRLENBQUMsTUFBVCxHQUFrQjtJQUVsQixzQkFBQSxHQUF5QixJQUFJLFNBQUosQ0FDeEI7TUFBQSxNQUFBLEVBQVEsUUFBUjtNQUFrQixLQUFBLEVBQU8sRUFBekI7TUFBNkIsTUFBQSxFQUFRLEVBQXJDO01BQXlDLENBQUEsRUFBRyxLQUFLLENBQUMsSUFBTixDQUFXLENBQVgsQ0FBNUM7TUFBMkQsQ0FBQSxFQUFHLEtBQUssQ0FBQyxHQUFOLENBQVUsQ0FBQSxHQUFJLENBQWQsQ0FBOUQ7TUFDQSxLQUFBLEVBQU8sYUFBYSxDQUFDLEtBQU0sQ0FBQSxJQUFDLENBQUEsU0FBRCxDQUQzQjtNQUN3QyxlQUFBLEVBQWlCLElBRHpEO01BRUEsUUFBQSxFQUFVLEVBRlY7TUFFYyxVQUFBLEVBQVksR0FGMUI7TUFFK0IsU0FBQSxFQUFXLFFBRjFDO01BRW9ELFVBQUEsRUFBWSxzQkFGaEU7TUFHQSxJQUFBLEVBQU0sSUFBQyxDQUFBLHFCQUhQO0tBRHdCO1dBTXpCLG9CQUFBLEdBQXVCLElBQUksS0FBSixDQUN0QjtNQUFBLE1BQUEsRUFBUSxRQUFSO01BQWtCLEtBQUEsRUFBTyxHQUF6QjtNQUE4QixNQUFBLEVBQVEsRUFBdEM7TUFBMEMsQ0FBQSxFQUFHLEtBQUssQ0FBQyxLQUFOLENBQVksQ0FBQyxDQUFiLENBQTdDO01BQThELENBQUEsRUFBRyxLQUFLLENBQUMsR0FBTixDQUFVLENBQVYsQ0FBakU7TUFDQSxLQUFBLEVBQU8sYUFBYSxDQUFDLDBCQUEyQixDQUFBLElBQUMsQ0FBQSxTQUFELENBRGhEO0tBRHNCO0VBVEE7O3dCQWN4Qiw2QkFBQSxHQUErQixTQUFDLFFBQUQ7QUFDOUIsUUFBQTtJQUFBLFFBQVEsQ0FBQyxNQUFULEdBQWtCO0lBRWxCLHNCQUFBLEdBQXlCLElBQUksU0FBSixDQUN4QjtNQUFBLE1BQUEsRUFBUSxRQUFSO01BQWtCLEtBQUEsRUFBTyxFQUF6QjtNQUE2QixNQUFBLEVBQVEsRUFBckM7TUFBeUMsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQUFsRDtNQUF3RCxDQUFBLEVBQUcsS0FBSyxDQUFDLEdBQU4sQ0FBVSxDQUFWLENBQTNEO01BQ0EsS0FBQSxFQUFPLGFBQWEsQ0FBQyxLQUFNLENBQUEsSUFBQyxDQUFBLFNBQUQsQ0FEM0I7TUFDd0MsZUFBQSxFQUFpQixJQUR6RDtNQUVBLFFBQUEsRUFBVSxFQUZWO01BRWMsVUFBQSxFQUFZLEdBRjFCO01BRStCLFNBQUEsRUFBVyxRQUYxQztNQUVvRCxVQUFBLEVBQVksc0JBRmhFO01BR0EsSUFBQSxFQUFNLElBQUMsQ0FBQSxxQkFIUDtLQUR3QjtXQU16QixvQkFBQSxHQUF1QixJQUFJLEtBQUosQ0FDdEI7TUFBQSxNQUFBLEVBQVEsUUFBUjtNQUFrQixLQUFBLEVBQU8sR0FBekI7TUFBOEIsTUFBQSxFQUFRLEVBQXRDO01BQTBDLENBQUEsRUFBRyxLQUFLLENBQUMsS0FBbkQ7TUFBMEQsQ0FBQSxFQUFHLEtBQUssQ0FBQyxHQUFOLENBQUEsQ0FBN0Q7TUFDQSxLQUFBLEVBQU8sYUFBYSxDQUFDLDBCQUEyQixDQUFBLElBQUMsQ0FBQSxTQUFELENBRGhEO0tBRHNCO0VBVE87O3dCQWlCL0Isc0JBQUEsR0FBd0IsU0FBQyxRQUFEO0FBQ3ZCLFFBQUE7SUFBQSxRQUFRLENBQUMsTUFBVCxHQUFrQjtJQUVsQixvQkFBQSxHQUF1QixJQUFJLEtBQUosQ0FDdEI7TUFBQSxNQUFBLEVBQVEsUUFBUjtNQUFrQixLQUFBLEVBQU8sR0FBekI7TUFBOEIsTUFBQSxFQUFRLFFBQVEsQ0FBQyxNQUEvQztNQUF1RCxDQUFBLEVBQUcsS0FBSyxDQUFDLElBQWhFO01BQ0EsS0FBQSxFQUFPLGFBQWEsQ0FBQyxxQkFBc0IsQ0FBQSxJQUFDLENBQUEsU0FBRCxDQUQzQztLQURzQjtJQUl2QixzQkFBQSxHQUF5QixJQUFJLFNBQUosQ0FDeEI7TUFBQSxNQUFBLEVBQVEsUUFBUjtNQUFrQixLQUFBLEVBQU8sRUFBekI7TUFBNkIsTUFBQSxFQUFRLEVBQXJDO01BQXlDLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBbEQ7TUFBMEQsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFuRTtNQUNBLEtBQUEsRUFBTyxhQUFhLENBQUMsS0FBTSxDQUFBLElBQUMsQ0FBQSxTQUFELENBRDNCO01BQ3dDLGVBQUEsRUFBaUIsSUFEekQ7TUFFQSxRQUFBLEVBQVUsRUFGVjtNQUVjLFVBQUEsRUFBWSxHQUYxQjtNQUUrQixTQUFBLEVBQVcsUUFGMUM7TUFFb0QsVUFBQSxFQUFZLHNCQUZoRTtNQUdBLElBQUEsRUFBTSxJQUFDLENBQUEscUJBSFA7S0FEd0I7V0FNekIsb0JBQUEsR0FBdUIsSUFBSSxLQUFKLENBQ3RCO01BQUEsTUFBQSxFQUFRLFFBQVI7TUFBa0IsS0FBQSxFQUFPLEdBQXpCO01BQThCLE1BQUEsRUFBUSxRQUFRLENBQUMsTUFBL0M7TUFBdUQsQ0FBQSxFQUFHLEtBQUssQ0FBQyxLQUFoRTtNQUNBLEtBQUEsRUFBTyxhQUFhLENBQUMsc0JBQXVCLENBQUEsSUFBQyxDQUFBLFNBQUQsQ0FENUM7S0FEc0I7RUFiQTs7d0JBa0J4QixvQkFBQSxHQUFzQixTQUFDLFFBQUQ7QUFDckIsUUFBQTtJQUFBLFFBQVEsQ0FBQyxNQUFULEdBQWtCO0lBRWxCLGtCQUFBLEdBQXFCLElBQUksU0FBSixDQUNwQjtNQUFBLE1BQUEsRUFBUSxRQUFSO01BQWtCLEtBQUEsRUFBTyxFQUF6QjtNQUE2QixNQUFBLEVBQVEsRUFBckM7TUFBeUMsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQUFOLENBQVcsRUFBWCxDQUE1QztNQUE0RCxDQUFBLEVBQUcsS0FBSyxDQUFDLEdBQU4sQ0FBVSxFQUFWLENBQS9EO01BQ0EsS0FBQSxFQUFPLGFBQWEsQ0FBQyxLQUFNLENBQUEsSUFBQyxDQUFBLFNBQUQsQ0FEM0I7TUFDd0MsZUFBQSxFQUFpQixJQUR6RDtNQUMrRCxhQUFBLEVBQWUsQ0FBQyxJQUQvRTtNQUVBLFFBQUEsRUFBVSxFQUZWO01BRWMsVUFBQSxFQUFZLEdBRjFCO01BRStCLFNBQUEsRUFBVyxRQUYxQztNQUVvRCxVQUFBLEVBQVksc0JBRmhFO01BR0EsSUFBQSxFQUFNLElBQUMsQ0FBQSxxQkFIUDtLQURvQjtJQU1yQixvQkFBQSxHQUF1QixJQUFJLEtBQUosQ0FDdEI7TUFBQSxNQUFBLEVBQVEsUUFBUjtNQUFrQixLQUFBLEVBQU8sR0FBekI7TUFBOEIsTUFBQSxFQUFRLFFBQVEsQ0FBQyxNQUEvQztNQUF1RCxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQWhFO01BQ0EsS0FBQSxFQUFPLGFBQWEsQ0FBQyxLQURyQjtLQURzQjtXQUl2QixtQkFBQSxHQUFzQixJQUFJLEtBQUosQ0FDckI7TUFBQSxNQUFBLEVBQVEsUUFBUjtNQUFrQixLQUFBLEVBQU8sR0FBekI7TUFBOEIsTUFBQSxFQUFRLFFBQVEsQ0FBQyxNQUEvQztNQUF1RCxDQUFBLEVBQUcsS0FBSyxDQUFDLEtBQWhFO01BQ0EsS0FBQSxFQUFPLGFBQWEsQ0FBQyxtQkFBb0IsQ0FBQSxJQUFDLENBQUEsU0FBRCxDQUR6QztLQURxQjtFQWJEOzt3QkFxQnRCLG1CQUFBLEdBQXFCLFNBQUMsUUFBRDtXQUNwQixJQUFDLENBQUEsV0FBRCxHQUFlLElBQUksS0FBSixDQUNkO01BQUEsSUFBQSxFQUFNLFdBQU47TUFDQSxNQUFBLEVBQVEsUUFEUjtNQUNrQixLQUFBLEVBQU8sR0FEekI7TUFDOEIsTUFBQSxFQUFRLENBRHRDO01BQ3lDLENBQUEsRUFBRyxLQUFLLENBQUMsTUFEbEQ7TUFDMEQsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFOLENBQWEsQ0FBQyxDQUFkLENBRDdEO01BRUEsZUFBQSxFQUFpQixhQUFhLENBQUMsS0FBTSxDQUFBLElBQUMsQ0FBQSxPQUFELENBRnJDO01BRWdELFlBQUEsRUFBYyxFQUY5RDtLQURjO0VBREs7Ozs7R0FoS1k7O0FBeUtsQyxhQUFBLEdBQ0M7RUFBQSxLQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0sTUFBTjtJQUNBLEtBQUEsRUFBTyxNQURQO0dBREQ7RUFJQSxtQkFBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLHlEQUFOO0lBQ0EsS0FBQSxFQUFPLDBEQURQO0dBTEQ7RUFPQSxxQkFBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLDJEQUFOO0lBQ0EsS0FBQSxFQUFPLDREQURQO0dBUkQ7RUFVQSxzQkFBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLDREQUFOO0lBQ0EsS0FBQSxFQUFPLDZEQURQO0dBWEQ7RUFhQSwwQkFBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLGdFQUFOO0lBQ0EsS0FBQSxFQUFPLGlFQURQO0dBZEQ7RUFtQkEsS0FBQSxFQUFPLG9EQW5CUDtFQW9CQSxHQUFBLEVBQUssd0NBcEJMOzs7OztBQzdLRCxJQUFBLGFBQUE7RUFBQTs7OztBQUFNLE9BQU8sQ0FBQzs7O0VBQ0EsdUJBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTOzs7O0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLE1BQUEsRUFBUSxJQUFDLENBQUEsSUFBVDtNQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsSUFBSSxDQUFDLEtBRGI7TUFHQSxLQUFBLEVBQU8sSUFBQyxDQUFBLElBQUksQ0FBQyxhQUhiO01BS0EsTUFBQSxFQUFRLEVBTFI7TUFLWSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BTHJCO01BSzZCLElBQUEsRUFBTSxXQUxuQztNQUtnRCxlQUFBLEVBQWlCLElBTGpFO0tBREQ7SUFRQSwrQ0FBTSxJQUFDLENBQUEsT0FBUDtJQUVBLElBQUMsQ0FBQSxNQUFELENBQUE7RUFaWTs7RUFnQmIsYUFBQyxDQUFBLE1BQUQsQ0FBUSxNQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxHQUFnQjtJQUEzQixDQURMO0dBREQ7O0VBSUEsYUFBQyxDQUFBLE1BQUQsQ0FBUSxPQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBVCxHQUFpQjtJQUE1QixDQURMO0dBREQ7OzBCQU1BLFFBQUEsR0FBVSxTQUFDLENBQUQsRUFBSSxDQUFKO0FBQVUsV0FBTyxJQUFDLENBQUEsSUFBSSxDQUFDLEtBQU4sS0FBZSxDQUFmLElBQXFCLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTixLQUFnQjtFQUF0RDs7MEJBRVYsTUFBQSxHQUFRLFNBQUE7SUFDUCxJQUFHLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBQSxJQUF1QixJQUFDLENBQUEsUUFBRCxDQUFVLEdBQVYsRUFBZSxHQUFmLENBQXZCLElBQThDLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBOUMsSUFBcUUsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUFyRSxJQUE0RixJQUFDLENBQUEsUUFBRCxDQUFVLEdBQVYsRUFBZSxHQUFmLENBQTVGLElBQW1ILElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBdEg7YUFDQyxJQUFDLENBQUEsbUJBQUQsQ0FBQSxFQUREOztFQURPOzswQkFLUixtQkFBQSxHQUFxQixTQUFBO1dBQ3BCLElBQUksS0FBSixDQUNDO01BQUEsSUFBQSxFQUFNLFdBQU47TUFDQSxNQUFBLEVBQVEsSUFEUjtNQUNXLEtBQUEsRUFBTyxHQURsQjtNQUN1QixNQUFBLEVBQVEsQ0FEL0I7TUFDa0MsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUQzQztNQUNtRCxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxDQUFDLENBQWQsQ0FEdEQ7TUFFQSxlQUFBLEVBQWlCLGFBQWEsQ0FBQyxLQUFNLENBQUEsSUFBQyxDQUFBLEtBQUQsQ0FGckM7TUFFOEMsWUFBQSxFQUFjLEVBRjVEO0tBREQ7RUFEb0I7Ozs7R0FsQ2M7O0FBMENwQyxhQUFBLEdBQ0M7RUFBQSxLQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0sTUFBTjtJQUNBLEtBQUEsRUFBTyxNQURQO0dBREQ7Ozs7O0FDMUNELElBQUEsTUFBQTtFQUFBOzs7O0FBQUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxnQkFBUjs7QUFLSCxPQUFPLENBQUM7OztFQUNBLGtCQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUzs7Ozs7Ozs7O0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLElBQUEsRUFBTSxTQUFOO01BQ0EsSUFBQSxFQUFNLElBRE47TUFHQSxlQUFBLEVBQWlCLElBSGpCO01BSUEsWUFBQSxFQUFjLEVBSmQ7TUFNQSxNQUFBLEVBQVEsTUFBTSxDQUFDLElBTmY7S0FERDtJQVNBLDBDQUFNLElBQUMsQ0FBQSxPQUFQO0lBR0EsTUFBTSxDQUFDLDhCQUFQLENBQXNDLElBQXRDO0lBRUEsSUFBQyxDQUFBLE1BQUQsR0FDQztNQUFBLFFBQUEsRUFBVTtRQUFFLEtBQUEsRUFBTyxDQUFUO09BQVY7TUFDQSxNQUFBLEVBQVE7UUFBRSxLQUFBLEVBQU8sQ0FBVDtPQURSOztFQWpCVzs7RUF5QmIsUUFBQyxDQUFBLE1BQUQsQ0FBUSxNQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDtNQUNKLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxHQUFnQjtNQUNoQixJQUFDLENBQUEsS0FBRCxHQUFTLElBQUMsQ0FBQSxJQUFJLENBQUM7TUFDZixJQUFDLENBQUEsTUFBRCxHQUFVLElBQUMsQ0FBQSxJQUFJLENBQUM7YUFDaEIsSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFOLEdBQWU7SUFKWCxDQURMO0dBREQ7O0VBUUEsUUFBQyxDQUFBLE1BQUQsQ0FBUSxRQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0dBREQ7O3FCQU9BLFVBQUEsR0FBWSxTQUFDLENBQUQsRUFBSSxDQUFKO0FBQVUsV0FBTyxNQUFNLENBQUMsS0FBUCxLQUFnQixDQUFoQixJQUFzQixNQUFNLENBQUMsTUFBUCxLQUFpQjtFQUF4RDs7cUJBQ1osUUFBQSxHQUFVLFNBQUMsQ0FBRCxFQUFJLENBQUo7QUFBVSxXQUFPLElBQUMsQ0FBQSxLQUFELEtBQVUsQ0FBVixJQUFnQixJQUFDLENBQUEsTUFBRCxLQUFXO0VBQTVDOztxQkFDVixTQUFBLEdBQVcsU0FBQyxDQUFEO0FBQU8sV0FBTyxJQUFDLENBQUEsS0FBRCxLQUFVO0VBQXhCOztxQkFFWCxPQUFBLEdBQVMsU0FBQTtXQUNSLElBQUksU0FBSixDQUFjO01BQUUsSUFBQSxFQUFTLE1BQU0sQ0FBQyxLQUFSLEdBQWMsR0FBZCxHQUFpQixNQUFNLENBQUMsTUFBbEM7TUFBNEMsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFyRDtLQUFkO0VBRFE7O3FCQUtULG9CQUFBLEdBQXNCLFNBQUE7V0FDckIsSUFBQyxDQUFBLE9BQUQsQ0FBUyxRQUFULEVBQW1CO01BQUEsS0FBQSxFQUFPLE1BQUEsQ0FBTztRQUFBLE9BQUEsRUFBUyxDQUFUO09BQVAsQ0FBUDtNQUEyQixJQUFBLEVBQU0sR0FBakM7S0FBbkI7RUFEcUI7O3FCQUd0QixrQkFBQSxHQUFvQixTQUFBO1dBQ25CLElBQUMsQ0FBQSxPQUFELENBQVMsTUFBVCxFQUFpQjtNQUFBLEtBQUEsRUFBTyxNQUFBLENBQU87UUFBQSxPQUFBLEVBQVMsQ0FBVDtPQUFQLENBQVA7TUFBMkIsSUFBQSxFQUFNLEdBQWpDO0tBQWpCO0VBRG1COztxQkFHcEIsbUJBQUEsR0FBcUIsU0FBQTtXQUNwQixJQUFDLENBQUEsV0FBRCxDQUFhLFFBQWI7RUFEb0I7O3FCQUdyQixpQkFBQSxHQUFtQixTQUFBO1dBQ2xCLElBQUMsQ0FBQSxXQUFELENBQWEsTUFBYjtFQURrQjs7OztHQTNEVzs7OztBQ0wvQixJQUFBLFVBQUE7RUFBQTs7OztBQUFDLGFBQWMsT0FBQSxDQUFRLFlBQVI7O0FBR1QsT0FBTyxDQUFDOzs7RUFDQSxzQkFBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7Ozs7Ozs7OztJQUV0QixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxTQUFBLEVBQVcsTUFBWDtNQUNBLFVBQUEsRUFBWSxJQURaO01BRUEsUUFBQSxFQUFVLElBRlY7TUFHQSxZQUFBLEVBQWMsS0FIZDtLQUREO0lBT0EsOENBQU0sSUFBQyxDQUFBLE9BQVA7SUFFQSxJQUFDLENBQUEsWUFBRCxDQUFBO0VBWFk7O0VBY2IsWUFBQyxDQUFBLE1BQUQsQ0FBUSxXQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBVCxHQUFxQjtJQUFoQyxDQURMO0dBREQ7O0VBSUEsWUFBQyxDQUFBLE1BQUQsQ0FBUSxZQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsVUFBVCxHQUFzQjtJQUFqQyxDQURMO0dBREQ7O0VBSUEsWUFBQyxDQUFBLE1BQUQsQ0FBUSxVQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsUUFBVCxHQUFvQjtJQUEvQixDQURMO0dBREQ7O0VBSUEsWUFBQyxDQUFBLE1BQUQsQ0FBUSxjQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDtNQUNKLElBQUMsQ0FBQSxPQUFPLENBQUMsWUFBVCxHQUF3QjtNQUN4QixJQUFHLEtBQUg7UUFDQyxJQUFDLENBQUEsVUFBRCxHQUFjO1FBQ2QsSUFBQyxDQUFBLFFBQUQsR0FBWTtlQUNaLElBQUMsQ0FBQSxZQUFELEdBQWdCLEVBSGpCOztJQUZJLENBREw7R0FERDs7eUJBVUEsWUFBQSxHQUFjLFNBQUE7QUFDYixRQUFBO0lBQUEsZ0JBQUEsR0FBbUIsSUFBQyxDQUFBLGVBQUQsQ0FBaUIsU0FBakIsRUFBNEI7TUFBQztRQUFFLEtBQUEsRUFBTyxPQUFUO1FBQWtCLE1BQUEsRUFBUSxLQUExQjtPQUFELEVBQ25DO1FBQUUsS0FBQSxFQUFPLE1BQVQ7UUFBaUIsTUFBQSxFQUFRLElBQXpCO09BRG1DO0tBQTVCLEVBQzJCLEtBRDNCO0lBR25CLElBQUcsZ0JBQUg7YUFBeUIsSUFBQyxDQUFBLGNBQUQsQ0FBQSxFQUF6QjtLQUFBLE1BQ0ssSUFBRyxLQUFLLENBQUMsUUFBTixDQUFBLENBQUg7YUFBeUIsSUFBQyxDQUFBLGFBQUQsQ0FBQSxFQUF6QjtLQUFBLE1BQUE7YUFDQSxJQUFDLENBQUEsY0FBRCxDQUFBLEVBREE7O0VBTFE7O3lCQVdkLFdBQUEsR0FBYSxTQUFBO0FBRVosUUFBQTtJQUFBLFdBQUEsR0FBYyxNQUFNLENBQUMsS0FBUCxHQUFlLE1BQU0sQ0FBQztJQUVwQyxJQUFDLENBQUEsT0FBRCxHQUFXO0lBQ1gsSUFBQyxDQUFBLE9BQUQsR0FBVztJQUVYLE1BQUEsR0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFQLEdBQWUsV0FBQSxHQUFjLEdBQTlCLENBQUEsR0FBcUMsSUFBQyxDQUFBO0lBQy9DLE1BQUEsR0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLFdBQUEsR0FBYyxHQUEvQixDQUFBLEdBQXNDLElBQUMsQ0FBQTtJQUNoRCxJQUFDLENBQUEsTUFBTyxDQUFBLE1BQUEsQ0FBTyxDQUFDLEtBQWhCLEdBQXdCLElBQUksQ0FBQyxHQUFMLENBQVMsTUFBVCxFQUFpQixNQUFqQjtJQUV4QixJQUFDLENBQUEsTUFBTyxDQUFBLE1BQUEsQ0FBTyxDQUFDLENBQWhCLEdBQW9CLENBQUMsTUFBTSxDQUFDLEtBQVAsR0FBZSxJQUFDLENBQUEsS0FBRCxHQUFTLElBQUMsQ0FBQSxNQUFPLENBQUEsTUFBQSxDQUFPLENBQUMsS0FBekMsQ0FBQSxHQUFrRDtJQUN0RSxJQUFDLENBQUEsTUFBTyxDQUFBLE1BQUEsQ0FBTyxDQUFDLENBQWhCLEdBQW9CLENBQUMsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFDLENBQUEsTUFBTyxDQUFBLE1BQUEsQ0FBTyxDQUFDLEtBQTNDLENBQUEsR0FBb0Q7SUFFeEUsSUFBQyxDQUFBLE1BQU8sQ0FBQSxRQUFBLENBQVMsQ0FBQyxDQUFsQixHQUFzQixDQUFDLE1BQU0sQ0FBQyxLQUFQLEdBQWUsSUFBQyxDQUFBLEtBQWpCLENBQUEsR0FBMEI7V0FDaEQsSUFBQyxDQUFBLE1BQU8sQ0FBQSxRQUFBLENBQVMsQ0FBQyxDQUFsQixHQUFzQixDQUFDLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLElBQUMsQ0FBQSxNQUFsQixDQUFBLEdBQTRCO0VBZnRDOzt5QkFzQmIsbUJBQUEsR0FBcUIsU0FBQTtBQUVwQixRQUFBO0lBQUEsUUFBQSxHQUFXLElBQUMsQ0FBQSxlQUFELENBQWlCLE9BQWpCLEVBQTBCO01BQUM7UUFBRSxLQUFBLEVBQU8sTUFBVDtRQUFpQixNQUFBLEVBQVEsTUFBekI7T0FBRCxFQUMzQjtRQUFFLEtBQUEsRUFBTyxRQUFUO1FBQW1CLE1BQUEsRUFBUSxRQUEzQjtPQUQyQixFQUUzQjtRQUFFLEtBQUEsRUFBTyxNQUFUO1FBQWlCLE1BQUEsRUFBUSxNQUF6QjtPQUYyQjtLQUExQixFQUVtQyxJQUFDLENBQUEsU0FGcEM7SUFJWCxnQkFBQSxHQUFtQixJQUFDLENBQUEsZUFBRCxDQUFpQixRQUFqQixFQUEyQjtNQUFDO1FBQUUsS0FBQSxFQUFPLE9BQVQ7UUFBa0IsTUFBQSxFQUFRLEtBQTFCO09BQUQsRUFDbEM7UUFBRSxLQUFBLEVBQU8sS0FBVDtRQUFnQixNQUFBLEVBQVEsS0FBeEI7T0FEa0M7S0FBM0IsRUFDMkIsSUFBQyxDQUFBLFVBRDVCO0lBR25CLGNBQUEsR0FBaUIsSUFBQyxDQUFBLGVBQUQsQ0FBaUIsTUFBakIsRUFBeUI7TUFBQztRQUFFLEtBQUEsRUFBTyxPQUFUO1FBQWtCLE1BQUEsRUFBUSxLQUExQjtPQUFELEVBQy9CO1FBQUUsS0FBQSxFQUFPLEtBQVQ7UUFBZ0IsTUFBQSxFQUFRLEtBQXhCO09BRCtCO0tBQXpCLEVBQzRCLElBQUMsQ0FBQSxRQUQ3QjtJQUdqQixnQkFBQSxHQUFtQixJQUFDLENBQUEsZUFBRCxDQUFpQixRQUFqQixFQUEyQjtNQUFDO1FBQUUsS0FBQSxFQUFPLE9BQVQ7UUFBa0IsTUFBQSxFQUFRLEtBQTFCO09BQUQsRUFDbkM7UUFBRSxLQUFBLEVBQU8sS0FBVDtRQUFnQixNQUFBLEVBQVEsS0FBeEI7T0FEbUMsRUFFbkM7UUFBRSxLQUFBLEVBQU8sTUFBVDtRQUFpQixNQUFBLEVBQVEsSUFBekI7T0FGbUM7S0FBM0IsRUFFMEIsSUFBQyxDQUFBLFVBRjNCO0lBS25CLElBQUcsY0FBSDtNQUF1QixJQUFDLENBQUEsZ0JBQUQsQ0FBQSxFQUF2Qjs7SUFDQSxJQUFHLGdCQUFIO01BQXlCLElBQUMsQ0FBQSxpQkFBRCxDQUFtQixRQUFuQixFQUF6Qjs7SUFDQSxJQUFHLGdCQUFIO01BQXlCLElBQUMsQ0FBQSxjQUFELENBQUEsRUFBekI7S0FBQSxNQUFBO01BQWdELElBQUMsQ0FBQSxjQUFELENBQUEsRUFBaEQ7O1dBQ0EsSUFBQyxDQUFBLFdBQUQsQ0FBYSxRQUFiO0VBcEJvQjs7eUJBd0JyQixjQUFBLEdBQWdCLFNBQUE7SUFDZixJQUFDLENBQUEsV0FBRCxDQUFBO0lBQ0EsSUFBQyxDQUFBLG1CQUFELENBQUE7SUFDQSxJQUFDLENBQUEsVUFBRCxDQUFBO0lBQ0EsSUFBQyxDQUFBLElBQUQsR0FBUTtXQUNSLElBQUMsQ0FBQSxxQkFBRCxDQUFBO0VBTGU7O3lCQVFoQixxQkFBQSxHQUF1QixTQUFBO0FBQ3RCLFFBQUE7SUFBQSxZQUFBLEdBQWU7SUFFZixNQUFNLENBQUMsRUFBUCxDQUFVLGVBQVYsRUFBMkIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO1FBQzFCLFlBQVksQ0FBQyxXQUFiLENBQUE7ZUFDQSxZQUFZLENBQUMsV0FBYixDQUF5QixZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFyRDtNQUYwQjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBM0I7SUFJQSxNQUFNLENBQUMsRUFBUCxDQUFVLGNBQVYsRUFBMEIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO1FBQ3pCLFlBQVksQ0FBQyxXQUFiLENBQUE7ZUFDQSxZQUFZLENBQUMsV0FBYixDQUF5QixZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFyRDtNQUZ5QjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBMUI7SUFLQSxNQUFNLENBQUMsRUFBUCxDQUFVLGVBQVYsRUFBMkIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO1FBQzFCLFlBQVksQ0FBQyxXQUFiLENBQUE7ZUFDQSxZQUFZLENBQUMsV0FBYixDQUF5QixZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFyRDtNQUYwQjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBM0I7V0FJQSxNQUFNLENBQUMsRUFBUCxDQUFVLGNBQVYsRUFBMEIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO1FBQ3pCLFlBQVksQ0FBQyxXQUFiLENBQUE7ZUFDQSxZQUFZLENBQUMsV0FBYixDQUF5QixZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFyRDtNQUZ5QjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBMUI7RUFoQnNCOzt5QkEwQnZCLGFBQUEsR0FBZSxTQUFBO0lBRWQsSUFBQyxDQUFBLEtBQUQsR0FBUyxNQUFNLENBQUMsS0FBUCxHQUFlLElBQUMsQ0FBQTtJQUN6QixJQUFDLENBQUEsT0FBRCxHQUFXO1dBQ1gsSUFBQyxDQUFBLE9BQUQsR0FBVztFQUpHOzt5QkFRZixnQkFBQSxHQUFrQixTQUFBO0lBQ2pCLElBQUMsQ0FBQSxDQUFELEdBQUssS0FBSyxDQUFDO0lBRVgsSUFBQyxDQUFBLEtBQUQsR0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLEdBQWpCLENBQUEsR0FBd0IsSUFBQyxDQUFBO0lBQ2xDLElBQUMsQ0FBQSxZQUFELEdBQWdCO1dBQ2hCLElBQUMsQ0FBQSxJQUFELEdBQVE7RUFMUzs7eUJBV2xCLGVBQUEsR0FBaUIsU0FBQyxRQUFELEVBQXFCLFVBQXJCLEVBQXNDLGFBQXRDO0FBQ2hCLFFBQUE7O01BRGlCLFdBQVc7OztNQUFTLGFBQWE7OztNQUFJLGdCQUFnQjs7SUFDdEUsTUFBQSxHQUFTO0FBRVQ7QUFBQSxTQUFBLHFDQUFBOztNQUNDLFlBQUEsR0FBZSxJQUFJLENBQUMsS0FBTCxDQUFXLEdBQVg7TUFDZixPQUFBLEdBQVUsWUFBYSxDQUFBLENBQUE7TUFDdkIsU0FBQSxHQUFZLFlBQWEsQ0FBQSxDQUFBO01BRXpCLElBQUcsT0FBQSxLQUFXLFFBQWQ7QUFDQyxhQUFBLDhDQUFBOztVQUNDLElBQUcsU0FBQSxLQUFhLElBQUksQ0FBQyxLQUFyQjtZQUVDLE1BQUEsR0FBUyxJQUFJLENBQUMsT0FGZjs7QUFERCxTQUREOztBQUxEO0FBYUEsV0FBTztFQWhCUzs7OztHQW5KaUI7Ozs7QUNIbkMsSUFBQSxPQUFBO0VBQUE7Ozs7QUFBTSxPQUFPLENBQUM7OztFQUNBLG1CQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUzs7O0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLE9BQUEsRUFBUyxHQUFUO01BQ0EsT0FBQSxFQUFTLElBRFQ7TUFFQSxHQUFBLEVBQUssT0FBQSxDQUFRLEtBQVIsQ0FGTDtLQUREO0lBS0EsMkNBQU0sSUFBQyxDQUFBLE9BQVA7SUFDQSxJQUFDLENBQUEsS0FBRCxHQUFTO01BQUEsTUFBQSxFQUFRLFNBQVI7O0lBQ1QsSUFBQyxDQUFBLFFBQUQsR0FBWSxTQUFBLEdBQUE7SUFFWixJQUFDLENBQUMsV0FBRixDQUFjLElBQUMsQ0FBQSxLQUFmO0lBQ0EsSUFBQyxDQUFDLFVBQUYsQ0FBYSxJQUFDLENBQUEsUUFBZDtFQVpZOztFQWNiLFNBQUMsQ0FBQSxNQUFELENBQVEsU0FBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxFQUFELENBQUksTUFBTSxDQUFDLEdBQVgsRUFBZ0IsS0FBaEI7SUFBWCxDQUFMO0dBREQ7O3NCQUdBLEtBQUEsR0FBTyxTQUFBO1dBQ04sSUFBQyxDQUFBLE9BQUQsR0FBVztFQURMOztzQkFFUCxRQUFBLEdBQVUsU0FBQTtXQUNULElBQUMsQ0FBQSxPQUFELEdBQVc7RUFERjs7OztHQXBCcUI7O0FBeUJoQyxPQUFBLEdBQVUsU0FBQyxTQUFEO0FBQ1QsTUFBQTtFQUFBLGFBQUEsR0FBZ0I7QUFDaEIsU0FBTyw2a0JBQUEsR0FDdWQsYUFEdmQsR0FDcWUsbXVCQURyZSxHQUVrdEIsYUFGbHRCLEdBRWd1Qiw4VkFGaHVCLEdBRzZVLGFBSDdVLEdBRzJWLDhWQUgzVixHQUk2VSxhQUo3VSxHQUkyViw4VkFKM1YsR0FLNlUsYUFMN1UsR0FLMlYscXhCQUwzVixHQU1vd0IsYUFOcHdCLEdBTWt4QixxaUJBTmx4QixHQU9vaEIsYUFQcGhCLEdBT2tpQjtBQVRoaUI7Ozs7QUMxQlYsSUFBQSwwREFBQTtFQUFBOzs7O0FBQUUsU0FBVyxPQUFBLENBQVEsU0FBUjs7QUFFWCxnQkFBa0IsT0FBQSxDQUFRLGVBQVI7O0FBRWQ7OztFQUNRLGtCQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUztJQUV0QixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBRUEsMENBQU0sSUFBQyxDQUFBLE9BQVAsQ0FGQTtJQUlBLElBQUcsSUFBQyxDQUFBLE1BQUo7TUFDQyxJQUFDLENBQUEsS0FBRCxHQUFTLElBQUMsQ0FBQSxNQUFNLENBQUM7TUFDakIsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFDLENBQUEsTUFBTSxDQUFDLE9BRm5COztJQUtBLElBQUMsQ0FBQSxFQUFELENBQUksTUFBTSxDQUFDLGVBQVgsRUFBNEIsU0FBQyxNQUFELEVBQVMsTUFBVDtNQUMzQixJQUFHLE1BQUEsS0FBVSxNQUFWLElBQXdCLE1BQU0sQ0FBQyxNQUFQLEtBQWlCLE1BQXpDLElBQXVELE1BQU0sQ0FBQyxNQUFNLENBQUMsa0JBQWQsS0FBb0MsTUFBOUY7UUFDQyxJQUFDLENBQUEsc0JBQUQsQ0FBd0IsTUFBeEIsRUFBZ0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxrQkFBOUMsRUFBa0UsSUFBQyxDQUFBLDJCQUFuRSxFQUREOztNQUdBLElBQUcsTUFBQSxLQUFVLE1BQVYsSUFBd0IsTUFBTSxDQUFDLE1BQVAsS0FBaUIsTUFBekMsSUFBdUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxrQkFBZCxLQUFvQyxNQUE5RjtlQUNDLElBQUMsQ0FBQSxzQkFBRCxDQUF3QixNQUF4QixFQUFnQyxNQUFNLENBQUMsTUFBTSxDQUFDLGtCQUE5QyxFQUFrRSxJQUFDLENBQUEsNEJBQW5FLEVBREQ7O0lBSjJCLENBQTVCO0VBWFk7O0VBb0JiLFFBQUMsQ0FBQSxNQUFELENBQVEsUUFBUixFQUNDO0lBQUEsVUFBQSxFQUFZLEtBQVo7SUFDQSxVQUFBLEVBQVksS0FEWjtJQUVBLFVBQUEsRUFBWSxJQUZaO0lBSUEsR0FBQSxFQUFLLFNBQUE7YUFDSixJQUFDLENBQUEsT0FBRCxJQUFZO0lBRFIsQ0FKTDtJQU9BLEdBQUEsRUFBSyxTQUFDLEtBQUQ7QUFDSixVQUFBO01BQUEsSUFBVSxLQUFBLEtBQVMsSUFBQyxDQUFBLE9BQXBCO0FBQUEsZUFBQTs7TUFFQSxJQUFtRSxLQUFBLEtBQVMsSUFBNUU7QUFBQSxjQUFNLEtBQUEsQ0FBTSxrREFBTixFQUFOOztNQUdBLElBQUcsQ0FBSSxLQUFKLFlBQXFCLEtBQXhCO0FBQ0MsY0FBTSxLQUFBLENBQU0seUNBQU4sRUFEUDs7TUFJQSxLQUFLLENBQUMsaUJBQU4sQ0FBd0IsSUFBQyxDQUFBLGVBQXpCO01BR0EsSUFBRyxJQUFDLENBQUEsT0FBSjtRQUNDLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBVCxHQUFxQixDQUFDLENBQUMsSUFBRixDQUFPLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBaEIsRUFBMkIsSUFBM0I7UUFDckIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBbEIsQ0FBOEIsSUFBQyxDQUFBLFFBQS9CO1FBQ0EsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsaUJBQWQsRUFBaUM7VUFBQyxLQUFBLEVBQU8sRUFBUjtVQUFZLE9BQUEsRUFBUyxDQUFDLElBQUQsQ0FBckI7U0FBakM7UUFDQSxJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBYyxrQkFBZCxFQUFrQztVQUFDLEtBQUEsRUFBTyxFQUFSO1VBQVksT0FBQSxFQUFTLENBQUMsSUFBRCxDQUFyQjtTQUFsQyxFQUpEOztNQU9BLElBQUcsS0FBSDtRQUNDLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBZixDQUEyQixJQUFDLENBQUEsUUFBNUI7UUFDQSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQWhCLENBQXFCLElBQXJCO1FBQ0EsS0FBSyxDQUFDLElBQU4sQ0FBVyxpQkFBWCxFQUE4QjtVQUFDLEtBQUEsRUFBTyxDQUFDLElBQUQsQ0FBUjtVQUFhLE9BQUEsRUFBUyxFQUF0QjtTQUE5QjtRQUNBLEtBQUssQ0FBQyxJQUFOLENBQVcsa0JBQVgsRUFBK0I7VUFBQyxLQUFBLEVBQU8sQ0FBQyxJQUFELENBQVI7VUFBYSxPQUFBLEVBQVMsRUFBdEI7U0FBL0IsRUFKRDtPQUFBLE1BQUE7UUFNQyxJQUFDLENBQUEsY0FBRCxDQUFBLEVBTkQ7O01BUUEsU0FBQSxHQUFZLElBQUMsQ0FBQTtNQUViLElBQUMsQ0FBQSxPQUFELEdBQVc7TUFHWCxJQUFDLENBQUEsWUFBRCxDQUFBO01BRUEsSUFBQyxDQUFBLElBQUQsQ0FBTSxlQUFOLEVBQXVCLElBQUMsQ0FBQSxPQUF4QixFQUFpQyxTQUFqQztNQUNBLElBQUMsQ0FBQSxJQUFELENBQU0sbUJBQU4sRUFBMkIsSUFBQyxDQUFBLE9BQTVCLEVBQXFDLFNBQXJDO01BRUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxLQUFLLENBQUM7YUFDZixJQUFDLENBQUEsTUFBRCxHQUFVLEtBQUssQ0FBQztJQXZDWixDQVBMO0dBREQ7O3FCQWtEQSxlQUFBLEdBQWlCLFNBQUMsR0FBRCxFQUFNLE1BQU4sRUFBYyxNQUFkLEVBQXNCLE9BQXRCO0FBQ2hCLFFBQUE7V0FBQSxVQUFBLEdBQ0M7TUFBQSxNQUFBLEVBQ0M7UUFBQSxJQUFBLEVBQU07VUFBQyxDQUFBLEVBQUcsQ0FBSjtVQUFPLENBQUEsRUFBRyxDQUFWO1NBQU47UUFDQSxJQUFBLEVBQU07VUFBQyxDQUFBLEVBQUcsQ0FBQSxxQkFBSSxNQUFNLENBQUUsZUFBUixHQUFnQixDQUF4QjtVQUEyQixDQUFBLEVBQUcsQ0FBOUI7U0FETjtPQUREO01BR0EsTUFBQSxFQUNDO1FBQUEsSUFBQSxFQUFNO1VBQUMsQ0FBQSxFQUFHLENBQUo7VUFBTyxDQUFBLEVBQUcsQ0FBVjtTQUFOO1FBQ0EsSUFBQSxFQUFNO1VBQUMsQ0FBQSxFQUFHLE1BQU0sQ0FBQyxLQUFYO1VBQWtCLENBQUEsRUFBRyxDQUFyQjtTQUROO09BSkQ7TUFNQSxPQUFBLEVBQ0M7UUFBQSxJQUFBLEVBQU07VUFBQyxPQUFBLEVBQVMsRUFBVjtVQUFjLENBQUEsRUFBRyxDQUFqQjtVQUFvQixDQUFBLEVBQUcsQ0FBdkI7VUFBMEIsSUFBQSxFQUFNLEdBQUcsQ0FBQyxJQUFwQztTQUFOO1FBQ0EsSUFBQSxFQUFNO1VBQUMsT0FBQSxFQUFTLENBQVY7VUFBYSxDQUFBLEVBQUcsQ0FBaEI7VUFBbUIsQ0FBQSxFQUFHLENBQXRCO1VBQXlCLElBQUEsRUFBTSxHQUFHLENBQUMsSUFBbkM7U0FETjtPQVBEOztFQUZlOztxQkFhakIsZUFBQSxHQUFpQixTQUFDLEdBQUQsRUFBTSxNQUFOLEVBQWMsTUFBZCxFQUFzQixPQUF0QjtBQUNoQixRQUFBO1dBQUEsVUFBQSxHQUNDO01BQUEsTUFBQSxFQUNDO1FBQUEsSUFBQSxFQUFNO1VBQUMsQ0FBQSxFQUFHLENBQUo7VUFBTyxDQUFBLEVBQUcsQ0FBVjtTQUFOO1FBQ0EsSUFBQSxFQUFNO1VBQUMsQ0FBQSxFQUFHLENBQUo7VUFBTyxDQUFBLEVBQUcsQ0FBVjtTQUROO09BREQ7TUFHQSxNQUFBLEVBQ0M7UUFBQSxJQUFBLEVBQU07VUFBQyxDQUFBLEVBQUcsQ0FBSjtVQUFPLENBQUEsRUFBRyxDQUFWO1NBQU47UUFDQSxJQUFBLEVBQU07VUFBQyxDQUFBLEVBQUcsQ0FBSjtVQUFPLENBQUEsb0JBQUcsTUFBTSxDQUFFLGdCQUFSLEdBQWlCLEVBQTNCO1NBRE47T0FKRDtNQU1BLE9BQUEsRUFDQztRQUFBLElBQUEsRUFBTTtVQUFDLE9BQUEsRUFBUyxFQUFWO1VBQWMsQ0FBQSxFQUFHLENBQWpCO1VBQW9CLENBQUEsRUFBRyxDQUF2QjtVQUEwQixJQUFBLEVBQU0sR0FBRyxDQUFDLElBQXBDO1NBQU47UUFDQSxJQUFBLEVBQU07VUFBQyxPQUFBLEVBQVMsQ0FBVjtVQUFhLENBQUEsRUFBRyxDQUFoQjtVQUFtQixDQUFBLEVBQUcsQ0FBdEI7VUFBeUIsSUFBQSxFQUFNLEdBQUcsQ0FBQyxJQUFuQztTQUROO09BUEQ7O0VBRmU7O3FCQVlqQixhQUFBLEdBQWUsU0FBQyxHQUFELEVBQU0sTUFBTixFQUFjLE1BQWQsRUFBc0IsT0FBdEI7QUFDZCxRQUFBO1dBQUEsVUFBQSxHQUNDO01BQUEsTUFBQSxFQUNDO1FBQUEsSUFBQSxFQUFNO1VBQUMsQ0FBQSxFQUFHLENBQUo7VUFBTyxDQUFBLEVBQUcsQ0FBVjtVQUFhLEtBQUEsRUFBTyxDQUFwQjtTQUFOO1FBQ0EsSUFBQSxFQUFNO1VBQUMsQ0FBQSxFQUFHLENBQUEscUJBQUksTUFBTSxDQUFFLGVBQWhCO1VBQXVCLENBQUEsRUFBRyxDQUExQjtVQUE2QixLQUFBLEVBQU8sR0FBcEM7U0FETjtPQUREO01BR0EsTUFBQSxFQUNDO1FBQUEsSUFBQSxFQUFNO1VBQUMsQ0FBQSxFQUFHLENBQUo7VUFBTyxDQUFBLEVBQUcsQ0FBVjtVQUFhLEtBQUEsRUFBTyxDQUFwQjtTQUFOO1FBQ0EsSUFBQSxFQUFNO1VBQUMsQ0FBQSxFQUFHLE1BQU0sQ0FBQyxLQUFYO1VBQWtCLENBQUEsRUFBRyxDQUFyQjtVQUF3QixLQUFBLEVBQU8sR0FBL0I7U0FETjtPQUpEO01BTUEsT0FBQSxFQUNDO1FBQUEsSUFBQSxFQUFNO1VBQUMsT0FBQSxFQUFTLEVBQVY7VUFBYyxDQUFBLEVBQUcsQ0FBakI7VUFBb0IsQ0FBQSxFQUFHLENBQXZCO1VBQTBCLElBQUEsRUFBTSxHQUFHLENBQUMsSUFBcEM7U0FBTjtRQUNBLElBQUEsRUFBTTtVQUFDLE9BQUEsRUFBUyxDQUFWO1VBQWEsQ0FBQSxFQUFHLENBQWhCO1VBQW1CLENBQUEsRUFBRyxDQUF0QjtVQUF5QixJQUFBLEVBQU0sR0FBRyxDQUFDLElBQW5DO1NBRE47T0FQRDs7RUFGYTs7cUJBYWYsMkJBQUEsR0FBNkIsU0FBQyxLQUFELEVBQVEsR0FBUixFQUFhLElBQWI7QUFHNUIsUUFBQTtJQUFBLFlBQUEsR0FBZTtJQUNmLEtBQUEsR0FBUSxHQUFHLENBQUMsT0FBSixDQUFZLFlBQVo7SUFFUixJQUFHLEtBQUEsS0FBUyxDQUFDLENBQWI7TUFDQyxLQUFLLENBQUMsWUFBTixHQUFxQjthQUNyQixHQUFHLENBQUMsTUFBSixDQUFXLEtBQVgsRUFBa0IsQ0FBbEIsRUFGRDs7RUFONEI7O3FCQVk3Qiw0QkFBQSxHQUE4QixTQUFDLEtBQUQsRUFBUSxHQUFSLEVBQWEsSUFBYjtJQUU3QixJQUFHLElBQUksQ0FBQyxzQkFBTCxDQUE0QixLQUE1QixDQUFIO01BRUMsR0FBRyxDQUFDLElBQUosQ0FBUyxLQUFUO2FBQ0EsS0FBSyxDQUFDLFlBQU4sR0FBcUIsS0FIdEI7O0VBRjZCOztxQkFTOUIsc0JBQUEsR0FBd0IsU0FBQyxLQUFEO0FBQ3ZCLFFBQUE7SUFBQSxJQUFHLEtBQUssQ0FBQyxZQUFOLEtBQXNCLElBQXpCO0FBQW1DLGFBQU8sTUFBMUM7O0lBZUEsSUFBRyxLQUFLLENBQUMsVUFBTixJQUFxQixLQUFLLENBQUMsVUFBVSxDQUFDLFVBQWpCLEtBQStCLEtBQXBELElBQThELEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBakIsS0FBNkIsS0FBOUY7QUFDQyxhQUFPLE1BRFI7O0lBR0EsSUFBZ0IsS0FBSyxDQUFDLE9BQU4sS0FBaUIsQ0FBakM7QUFBQSxhQUFPLE1BQVA7O0FBRUE7QUFBQSxTQUFBLHFDQUFBOztNQUNDLElBQWUsTUFBTSxDQUFDLGFBQVAsQ0FBcUIsU0FBckIsQ0FBZjtBQUFBLGVBQU8sS0FBUDs7QUFERDtBQUdBLFdBQU87RUF4QmdCOztxQkE0QnhCLHNCQUFBLEdBQXdCLFNBQUMsS0FBRCxFQUFRLEdBQVIsRUFBYSxjQUFiO0FBQ3ZCLFFBQUE7SUFBQSxjQUFBLENBQWUsS0FBZixFQUFzQixHQUF0QixFQUEyQixJQUEzQjtBQUNBO0FBQUE7U0FBQSxxQ0FBQTs7bUJBQ0MsSUFBQyxDQUFBLHNCQUFELENBQXdCLEtBQXhCLEVBQStCLEdBQS9CLEVBQW9DLGNBQXBDO0FBREQ7O0VBRnVCOztxQkFNeEIsSUFBQSxHQUFNLFNBQUMsY0FBRDtJQUNMLGNBQWMsQ0FBQyxXQUFmLENBQTJCLEtBQTNCO0lBR0EsSUFBRyxjQUFjLENBQUMsT0FBZixLQUEwQixNQUExQixJQUF3QyxjQUFjLENBQUMsT0FBZixLQUEwQixJQUFyRTthQUNDLElBQUMsQ0FBQSxVQUFELENBQVksY0FBYyxDQUFDLE1BQTNCLEVBQW1DLElBQUMsQ0FBQSxlQUFwQyxFQUREO0tBQUEsTUFBQTthQUlDLElBQUMsQ0FBQSxVQUFELENBQVksY0FBWixFQUE0QixJQUFDLENBQUEsZUFBN0IsRUFKRDs7RUFKSzs7OztHQXBLZ0I7O0FBb0xqQjs7O0VBQ1EsbUJBQUMsT0FBRDtBQUVaLFFBQUE7SUFGYSxJQUFDLENBQUEsNEJBQUQsVUFBUztJQUV0QixzQkFBQSxHQUF5QixJQUFJLEtBQUosQ0FDeEI7TUFBQSxJQUFBLEVBQU0sU0FBTjtNQUNBLGVBQUEsRUFBaUIsSUFEakI7TUFFQSxNQUFBLEVBQ0M7UUFBQSxrQkFBQSxFQUFvQixFQUFwQjtPQUhEO0tBRHdCO0lBTXpCLHNCQUFzQixDQUFDLEVBQXZCLENBQTBCLE1BQU0sQ0FBQyxHQUFqQyxFQUFzQyxTQUFBO2FBQ3JDLElBQUMsQ0FBQSxRQUFTLENBQUEsQ0FBQSxDQUFFLENBQUMsSUFBSSxDQUFDLFlBQWxCLENBQUE7SUFEcUMsQ0FBdEM7SUFHQSxDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxJQUFBLEVBQU0sSUFBTjtNQUNBLE9BQUEsRUFBUyxzQkFEVDtNQUVBLGNBQUEsRUFBZ0IsSUFGaEI7TUFHQSxnQkFBQSxFQUFrQixLQUhsQjtNQUlBLGFBQUEsRUFBZSxJQUpmO0tBREQ7SUFPQSwyQ0FBTSxJQUFDLENBQUEsT0FBUDtJQUVBLElBQUMsQ0FBQSxNQUFELEdBQVU7SUFFVixJQUFDLENBQUEsRUFBRCxDQUFJLE1BQU0sQ0FBQyxHQUFYLEVBQWdCLFNBQUMsS0FBRCxFQUFRLEtBQVI7YUFDZixLQUFLLENBQUMsZUFBTixDQUFBO0lBRGUsQ0FBaEI7SUFHQSxJQUFDLENBQUEsRUFBRCxDQUFJLE1BQU0sQ0FBQyxjQUFYLEVBQTJCLFNBQUMsS0FBRCxFQUFRLEtBQVI7TUFDMUIsSUFBRyxJQUFDLENBQUEsT0FBRCxHQUFXLENBQWQ7ZUFDQyxJQUFDLENBQUEsSUFBSSxDQUFDLFlBQU4sQ0FBQSxFQUREOztJQUQwQixDQUEzQjtJQUtBLElBQUcsSUFBQyxDQUFBLElBQUo7TUFDQyxJQUFDLENBQUEsSUFBSSxDQUFDLFFBQU4sQ0FBZSxJQUFDLENBQUEsT0FBaEI7TUFDQSxJQUFDLENBQUEsSUFBSSxDQUFDLFlBQU4sQ0FBbUI7UUFBQSxPQUFBLEVBQVMsS0FBVDtPQUFuQixFQUZEOztFQTlCWTs7RUFvQ2IsU0FBQyxDQUFBLE1BQUQsQ0FBUSxNQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0dBREQ7O0VBT0EsU0FBQyxDQUFBLE1BQUQsQ0FBUSxTQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsT0FBVCxHQUFtQjtJQUE5QixDQURMO0dBREQ7O0VBSUEsU0FBQyxDQUFBLE1BQUQsQ0FBUSxRQUFSLEVBQ0M7SUFBQSxVQUFBLEVBQVksS0FBWjtJQUNBLFVBQUEsRUFBWSxLQURaO0lBRUEsVUFBQSxFQUFZLElBRlo7SUFJQSxHQUFBLEVBQUssU0FBQTthQUNKLElBQUMsQ0FBQSxPQUFELElBQVk7SUFEUixDQUpMO0lBT0EsR0FBQSxFQUFLLFNBQUMsS0FBRDtBQUdKLFVBQUE7TUFBQSxJQUFHLEtBQUEsS0FBUyxJQUFDLENBQUEsT0FBYjtRQUNDLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxHQUFnQjtRQUVoQixJQUFDLENBQUEsT0FBTyxDQUFDLE1BQVQsR0FBa0I7UUFDbEIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxLQUFULEdBQWlCLEtBQUssQ0FBQztRQUN2QixJQUFDLENBQUEsT0FBTyxDQUFDLE1BQVQsR0FBa0IsS0FBSyxDQUFDO1FBQ3hCLElBQUMsQ0FBQSxLQUFELEdBQVMsS0FBSyxDQUFDO1FBQ2YsSUFBQyxDQUFBLE1BQUQsR0FBVSxLQUFLLENBQUM7QUFFaEIsZUFURDs7TUFZQSxJQUFVLEtBQUEsS0FBUyxJQUFDLENBQUEsT0FBcEI7QUFBQSxlQUFBOztNQUVBLElBQW1FLEtBQUEsS0FBUyxJQUE1RTtBQUFBLGNBQU0sS0FBQSxDQUFNLGtEQUFOLEVBQU47O01BR0EsSUFBRyxDQUFJLEtBQUosWUFBcUIsS0FBeEI7QUFDQyxjQUFNLEtBQUEsQ0FBTSx5Q0FBTixFQURQOztNQUlBLEtBQUssQ0FBQyxpQkFBTixDQUF3QixJQUFDLENBQUEsZUFBekI7TUFHQSxJQUFHLElBQUMsQ0FBQSxPQUFKO1FBQ0MsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFULEdBQXFCLENBQUMsQ0FBQyxJQUFGLENBQU8sSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFoQixFQUEyQixJQUEzQjtRQUNyQixJQUFDLENBQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFsQixDQUE4QixJQUFDLENBQUEsUUFBL0I7UUFDQSxJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBYyxpQkFBZCxFQUFpQztVQUFDLEtBQUEsRUFBTyxFQUFSO1VBQVksT0FBQSxFQUFTLENBQUMsSUFBRCxDQUFyQjtTQUFqQztRQUNBLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFjLGtCQUFkLEVBQWtDO1VBQUMsS0FBQSxFQUFPLEVBQVI7VUFBWSxPQUFBLEVBQVMsQ0FBQyxJQUFELENBQXJCO1NBQWxDLEVBSkQ7O01BT0EsSUFBRyxLQUFIO1FBQ0MsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFmLENBQTJCLElBQUMsQ0FBQSxRQUE1QjtRQUNBLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBaEIsQ0FBcUIsSUFBckI7UUFDQSxLQUFLLENBQUMsSUFBTixDQUFXLGlCQUFYLEVBQThCO1VBQUMsS0FBQSxFQUFPLENBQUMsSUFBRCxDQUFSO1VBQWEsT0FBQSxFQUFTLEVBQXRCO1NBQTlCO1FBQ0EsS0FBSyxDQUFDLElBQU4sQ0FBVyxrQkFBWCxFQUErQjtVQUFDLEtBQUEsRUFBTyxDQUFDLElBQUQsQ0FBUjtVQUFhLE9BQUEsRUFBUyxFQUF0QjtTQUEvQixFQUpEO09BQUEsTUFBQTtRQU1DLElBQUMsQ0FBQSxjQUFELENBQUEsRUFORDs7TUFRQSxTQUFBLEdBQVksSUFBQyxDQUFBO01BRWIsSUFBQyxDQUFBLE9BQUQsR0FBVztNQUdYLElBQUMsQ0FBQSxZQUFELENBQUE7TUFFQSxJQUFDLENBQUEsSUFBRCxDQUFNLGVBQU4sRUFBdUIsSUFBQyxDQUFBLE9BQXhCLEVBQWlDLFNBQWpDO2FBQ0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxtQkFBTixFQUEyQixJQUFDLENBQUEsT0FBNUIsRUFBcUMsU0FBckM7SUFsREksQ0FQTDtHQUREOztzQkE4REEsR0FBQSxHQUFLLFNBQUMsV0FBRDtJQUNKLFdBQVcsQ0FBQyxNQUFaLEdBQXFCLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDO1dBQ2xDLElBQUMsQ0FBQSxlQUFELEdBQW1CO0VBRmY7Ozs7R0E5R2tCOztBQTZIbEI7OztFQUNRLHdCQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUzs7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsSUFBQSxFQUFNLElBQU47TUFDQSxVQUFBLEVBQVksSUFEWjtNQUVBLFFBQUEsRUFBVSxJQUZWO01BR0EsZ0JBQUEsRUFBa0IsS0FIbEI7TUFJQSxjQUFBLEVBQWdCLElBSmhCO01BS0EsZ0JBQUEsRUFBa0IsS0FMbEI7TUFNQSxhQUFBLEVBQWUsSUFOZjtNQU9BLE1BQUEsRUFDQztRQUFBLGVBQUEsRUFBaUIsYUFBakI7UUFDQSxrQkFBQSxFQUFvQixFQURwQjtPQVJEO0tBREQ7SUFZQSxnREFBTSxJQUFDLENBQUEsT0FBUDtBQUVBO01BQUksSUFBQyxDQUFBLFVBQVUsQ0FBQyxZQUFaLENBQUEsRUFBSjtLQUFBO0lBRUEsSUFBRyxJQUFDLENBQUEsZ0JBQUQsS0FBcUIsS0FBeEI7TUFDQyxJQUFDLENBQUEsRUFBRCxDQUFJLE1BQU0sQ0FBQyxlQUFYLEVBQTRCLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBQyxLQUFELEVBQVEsS0FBUjtBQUMzQjttQkFBSSxLQUFDLENBQUEsSUFBSSxDQUFDLFlBQU4sQ0FBQSxFQUFKO1dBQUE7UUFEMkI7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTVCLEVBREQ7O0lBSUEsSUFBQyxDQUFBLEVBQUQsQ0FBSSxpQkFBSixFQUF1QixTQUFBO0FBQ3RCO2VBQUksSUFBQyxDQUFBLFVBQVUsQ0FBQyxZQUFaLENBQUEsRUFBSjtPQUFBO0lBRHNCLENBQXZCO0VBdEJZOztFQTBCYixjQUFDLENBQUEsTUFBRCxDQUFRLE1BQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO01BQ0osSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULEdBQWdCO01BQ2hCLEtBQUssQ0FBQyxRQUFOLENBQWUsSUFBZjthQUNBLEtBQUssQ0FBQyxZQUFOLENBQW1CO1FBQUEsT0FBQSxFQUFTLEtBQVQ7T0FBbkI7SUFISSxDQURMO0dBREQ7O0VBUUEsY0FBQyxDQUFBLE1BQUQsQ0FBUSxrQkFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLGdCQUFULEdBQTRCO0lBQXZDLENBREw7R0FERDs7RUFNQSxjQUFDLENBQUEsTUFBRCxDQUFRLFlBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO01BQ0osSUFBQyxDQUFBLE9BQU8sQ0FBQyxVQUFULEdBQXNCO01BQ3RCLEtBQUssQ0FBQyxJQUFOLEdBQWEsSUFBQyxDQUFBLE1BQU0sQ0FBQztNQUVyQixLQUFLLENBQUMsTUFBTixHQUFlO01BQ2YsS0FBSyxDQUFDLFlBQU4sQ0FBQTtBQUVBO2VBQUksS0FBSyxDQUFDLE9BQU4sR0FBZ0IsQ0FBQSxTQUFBLEtBQUE7aUJBQUEsU0FBQTttQkFDbkIsS0FBQyxDQUFBLElBQUksQ0FBQyxZQUFOLENBQUE7VUFEbUI7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLEVBQXBCO09BQUE7SUFQSSxDQURMO0dBREQ7O0VBYUEsY0FBQyxDQUFBLE1BQUQsQ0FBUSxVQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDtNQUNKLElBQUMsQ0FBQSxPQUFPLENBQUMsUUFBVCxHQUFvQjtNQUNwQixJQUFHLEtBQUEsS0FBUyxJQUFULElBQWtCLElBQUMsQ0FBQSxVQUFELEtBQWUsSUFBcEM7ZUFDQyxJQUFDLENBQUEsVUFBRCxHQUFjLElBQUMsQ0FBQSxpQkFBRCxDQUFBLEVBRGY7O0lBRkksQ0FETDtHQUREOzsyQkFRQSxpQkFBQSxHQUFtQixTQUFBO0FBRWxCLFdBQU8sSUFBSSxNQUFKLENBQ047TUFBQSxJQUFBLEVBQU0sSUFBQyxDQUFBLE1BQU0sQ0FBQyxlQUFkO01BQ0EsTUFBQSxFQUFRLElBRFI7TUFDVyxJQUFBLEVBQU0sRUFEakI7TUFDcUIsQ0FBQSxFQUFHLEVBRHhCO01BRUEsZUFBQSxFQUFpQixJQUZqQjtNQUlBLE9BQUEsRUFBUyxTQUFBO2VBQU0sSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBYixDQUFBO01BQU4sQ0FKVDtLQURNO0VBRlc7O0VBVW5CLGNBQUMsQ0FBQSxNQUFELENBQVEsUUFBUixFQUNDO0lBQUEsVUFBQSxFQUFZLEtBQVo7SUFDQSxVQUFBLEVBQVksS0FEWjtJQUVBLFVBQUEsRUFBWSxJQUZaO0lBSUEsR0FBQSxFQUFLLFNBQUE7YUFDSixJQUFDLENBQUEsT0FBRCxJQUFZO0lBRFIsQ0FKTDtJQU9BLEdBQUEsRUFBSyxTQUFDLEtBQUQ7QUFFSixVQUFBO01BQUEsSUFBVSxLQUFBLEtBQVMsSUFBQyxDQUFBLE9BQXBCO0FBQUEsZUFBQTs7TUFFQSxJQUFtRSxLQUFBLEtBQVMsSUFBNUU7QUFBQSxjQUFNLEtBQUEsQ0FBTSxrREFBTixFQUFOOztNQUdBLElBQUcsQ0FBSSxLQUFKLFlBQXFCLEtBQXhCO0FBQ0MsY0FBTSxLQUFBLENBQU0seUNBQU4sRUFEUDs7TUFJQSxLQUFLLENBQUMsaUJBQU4sQ0FBd0IsSUFBQyxDQUFBLGVBQXpCO01BR0EsSUFBRyxJQUFDLENBQUEsT0FBSjtRQUNDLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBVCxHQUFxQixDQUFDLENBQUMsSUFBRixDQUFPLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBaEIsRUFBMkIsSUFBM0I7UUFDckIsSUFBQyxDQUFBLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBbEIsQ0FBOEIsSUFBQyxDQUFBLFFBQS9CO1FBQ0EsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsaUJBQWQsRUFBaUM7VUFBQyxLQUFBLEVBQU8sRUFBUjtVQUFZLE9BQUEsRUFBUyxDQUFDLElBQUQsQ0FBckI7U0FBakM7UUFDQSxJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBYyxrQkFBZCxFQUFrQztVQUFDLEtBQUEsRUFBTyxFQUFSO1VBQVksT0FBQSxFQUFTLENBQUMsSUFBRCxDQUFyQjtTQUFsQyxFQUpEOztNQU9BLElBQUcsS0FBSDtRQUNDLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBZixDQUEyQixJQUFDLENBQUEsUUFBNUI7UUFDQSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQWhCLENBQXFCLElBQXJCO1FBQ0EsS0FBSyxDQUFDLElBQU4sQ0FBVyxpQkFBWCxFQUE4QjtVQUFDLEtBQUEsRUFBTyxDQUFDLElBQUQsQ0FBUjtVQUFhLE9BQUEsRUFBUyxFQUF0QjtTQUE5QjtRQUNBLEtBQUssQ0FBQyxJQUFOLENBQVcsa0JBQVgsRUFBK0I7VUFBQyxLQUFBLEVBQU8sQ0FBQyxJQUFELENBQVI7VUFBYSxPQUFBLEVBQVMsRUFBdEI7U0FBL0IsRUFKRDtPQUFBLE1BQUE7UUFNQyxJQUFDLENBQUEsY0FBRCxDQUFBLEVBTkQ7O01BUUEsU0FBQSxHQUFZLElBQUMsQ0FBQTtNQUViLElBQUMsQ0FBQSxPQUFELEdBQVc7TUFHWCxJQUFDLENBQUEsWUFBRCxDQUFBO01BRUEsSUFBQyxDQUFBLElBQUQsQ0FBTSxlQUFOLEVBQXVCLElBQUMsQ0FBQSxPQUF4QixFQUFpQyxTQUFqQztNQUNBLElBQUMsQ0FBQSxJQUFELENBQU0sbUJBQU4sRUFBMkIsSUFBQyxDQUFBLE9BQTVCLEVBQXFDLFNBQXJDO01BRUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUFDLENBQUEsTUFBTSxDQUFDO01BQ2pCLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBLE1BQU0sQ0FBQzthQUVsQixJQUFDLENBQUEsSUFBRCxHQUFRLElBQUMsQ0FBQTtJQTFDTCxDQVBMO0dBREQ7OzJCQXVEQSxHQUFBLEdBQUssU0FBQyxXQUFEO1dBQ0osV0FBVyxDQUFDLE1BQVosR0FBcUIsSUFBQyxDQUFBO0VBRGxCOzs7O0dBL0h1Qjs7QUFvSTdCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCO0VBQUUsVUFBQSxRQUFGO0VBQVksZ0JBQUEsY0FBWjtFQUE0QixXQUFBLFNBQTVCOzs7OztBQ3ZiakIsSUFBQSxtQ0FBQTtFQUFBOzs7O0FBQU07OztFQUNRLGNBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTO0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFFQztNQUFBLFFBQUEsRUFBVSxFQUFWO01BQ0EsTUFBQSxFQUFRLEdBRFI7TUFFQSxLQUFBLEVBQU8sT0FGUDtNQUdBLE1BQUEsRUFBUSxFQUhSO01BSUEsYUFBQSxFQUFlLEdBSmY7TUFLQSxhQUFBLEVBQWUsR0FMZjtLQUZEO0lBU0Esc0NBQU0sSUFBQyxDQUFBLE9BQVA7SUFFQSxJQUFDLENBQUEsS0FBRCxHQUNDO01BQUEsYUFBQSxFQUFlLDhEQUFmO01BQ0EsYUFBQSxFQUFlLEdBRGY7TUFFQSwrQkFBQSxFQUFpQyw2Q0FGakM7TUFHQSw0QkFBQSxFQUE4Qiw2Q0FIOUI7TUFJQSwyQkFBQSxFQUE2Qiw2Q0FKN0I7TUFLQSx1QkFBQSxFQUF5Qiw2Q0FMekI7O0VBZFc7Ozs7R0FESzs7QUF5QmI7OztFQUNRLG9CQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUzs7OztJQUV0QixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxLQUFBLEVBQU87UUFBRSxNQUFBLEVBQVEsR0FBVjtRQUFlLEtBQUEsRUFBTyxHQUF0QjtPQUFQO01BQ0EsT0FBQSxFQUFTLElBRFQ7S0FERDtJQUtBLDRDQUFNLElBQUMsQ0FBQSxPQUFQO0lBQ0EsSUFBQyxDQUFBLEtBQUQsR0FBUztNQUFBLE1BQUEsRUFBUSxTQUFSOztJQUVULElBQUMsQ0FBQyxXQUFGLENBQWMsSUFBQyxDQUFBLEtBQWY7SUFDQSxJQUFDLENBQUMsVUFBRixDQUFhLElBQUMsQ0FBQSxRQUFkO0lBRUEsSUFBQyxDQUFBLFdBQUQsQ0FBYSxJQUFDLENBQUEsS0FBZDtFQWJZOzt1QkFpQmIsS0FBQSxHQUFPLFNBQUE7V0FDTixJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxLQUFLLENBQUM7RUFEWjs7dUJBRVAsUUFBQSxHQUFVLFNBQUE7V0FDVCxJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxLQUFLLENBQUM7RUFEVDs7dUJBR1YsV0FBQSxHQUFhLFNBQUMsUUFBRDtJQUNaLElBQUMsQ0FBQSxLQUFELEdBQVM7SUFDVCxJQUFDLENBQUEsSUFBRCxDQUFNLE1BQU0sQ0FBQyxTQUFiO1dBQ0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxNQUFNLENBQUMsUUFBYjtFQUhZOztFQU1iLFVBQUMsQ0FBQSxNQUFELENBQVEsU0FBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxFQUFELENBQUksTUFBTSxDQUFDLEdBQVgsRUFBZ0IsS0FBaEI7SUFBWCxDQUFMO0dBREQ7O0VBR0EsVUFBQyxDQUFBLE1BQUQsQ0FBUSxPQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUNKLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBVCxHQUFpQjtJQURiLENBREw7R0FERDs7OztHQWhDd0I7O0FBdUNuQjs7O0VBQ1EsZ0JBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTOzs7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsT0FBQSxFQUFTLElBQVQ7TUFDQSxNQUFBLEVBQVEsRUFEUjtNQUNZLFlBQUEsRUFBYyxDQUQxQjtNQUVBLE9BQUEsRUFBUztRQUFFLEdBQUEsRUFBSyxDQUFQO1FBQVUsTUFBQSxFQUFRLENBQWxCO1FBQXFCLElBQUEsRUFBTSxDQUEzQjtRQUE4QixLQUFBLEVBQU8sQ0FBckM7T0FGVDtNQUdBLGVBQUEsRUFBaUIsaUJBSGpCO0tBREQ7SUFNQSx3Q0FBTSxJQUFDLENBQUEsT0FBUDtJQUNBLElBQUMsQ0FBQSxRQUFELEdBQVksU0FBQSxHQUFBO0lBQ1osSUFBQyxDQUFBLEtBQUQsR0FBUztNQUFBLE1BQUEsRUFBUSxTQUFSOztJQUVULElBQUMsQ0FBQyxXQUFGLENBQWMsSUFBQyxDQUFBLEtBQWY7SUFDQSxJQUFDLENBQUMsVUFBRixDQUFhLElBQUMsQ0FBQSxRQUFkO0VBYlk7O21CQWViLEtBQUEsR0FBTyxTQUFBO1dBQ04sSUFBQyxDQUFBLGVBQUQsR0FBbUI7RUFEYjs7bUJBRVAsUUFBQSxHQUFVLFNBQUE7V0FDVCxJQUFDLENBQUEsZUFBRCxHQUFtQjtFQURWOztFQUdWLE1BQUMsQ0FBQSxNQUFELENBQVEsU0FBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxFQUFELENBQUksTUFBTSxDQUFDLEdBQVgsRUFBZ0IsS0FBaEI7SUFBWCxDQUFMO0dBREQ7Ozs7R0FyQm9COztBQXlCZjs7O0VBQ1EsbUJBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTOzs7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsUUFBQSxFQUFVLElBQVY7S0FERDtJQUdBLDJDQUFNLElBQUMsQ0FBQSxPQUFQO0VBTFk7O3NCQU9iLEtBQUEsR0FBTyxTQUFBO1dBQ04sSUFBQyxDQUFBLGVBQUQsR0FBbUI7RUFEYjs7c0JBRVAsUUFBQSxHQUFVLFNBQUE7SUFDVCxJQUFHLElBQUMsQ0FBQSxRQUFKO2FBQWtCLElBQUMsQ0FBQSxlQUFELEdBQW1CLGtCQUFyQztLQUFBLE1BQUE7YUFDSyxJQUFDLENBQUEsZUFBRCxHQUFtQixrQkFEeEI7O0VBRFM7O0VBSVYsU0FBQyxDQUFBLE1BQUQsQ0FBUSxVQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDtNQUNKLElBQUMsQ0FBQSxPQUFPLENBQUMsUUFBVCxHQUFvQjtNQUNwQixJQUFHLEtBQUg7ZUFBYyxJQUFDLENBQUEsZUFBRCxHQUFtQixrQkFBakM7T0FBQSxNQUFBO2VBQ0ssSUFBQyxDQUFBLGVBQUQsR0FBbUIsa0JBRHhCOztJQUZJLENBREw7R0FERDs7OztHQWR1Qjs7QUFtTXhCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCO0VBQUMsTUFBQSxJQUFEO0VBQU8sWUFBQSxVQUFQO0VBQW1CLFFBQUEsTUFBbkI7RUFBMkIsV0FBQSxTQUEzQjs7Ozs7QUM3UmpCLElBQUEsMkJBQUE7RUFBQTs7OztBQUFDLFdBQVksT0FBQSxDQUFRLFVBQVI7O0FBRWIsaUJBQUEsR0FBb0I7O0FBRWQsT0FBTyxDQUFDOzs7RUFDQSx1QkFBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7Ozs7Ozs7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsU0FBQSxFQUFXLE1BQVg7TUFDQSxPQUFBLEVBQVMsTUFEVDtNQUdBLE9BQUEsRUFBUyxJQUhUO01BSUEsZUFBQSxFQUFpQixLQUpqQjtNQU9BLHFCQUFBLEVBQXVCLGlCQVB2QjtNQVVBLGFBQUEsRUFBZSxJQVZmO01BV0EsV0FBQSxFQUFhLElBWGI7S0FERDtJQWVBLCtDQUFNLElBQUMsQ0FBQSxPQUFQO0VBakJZOztFQXFCYixhQUFDLENBQUEsTUFBRCxDQUFRLFdBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFULEdBQXFCO0lBQWhDLENBREw7R0FERDs7RUFJQSxhQUFDLENBQUEsTUFBRCxDQUFRLFNBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxPQUFULEdBQW1CO0lBQTlCLENBREw7R0FERDs7RUFJQSxhQUFDLENBQUEsTUFBRCxDQUFRLGlCQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsZUFBVCxHQUEyQjtJQUF0QyxDQURMO0dBREQ7O0VBS0EsYUFBQyxDQUFBLE1BQUQsQ0FBUSxVQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTtNQUFHLElBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxPQUFaO0FBQXlCLGVBQU8sRUFBaEM7T0FBQSxNQUFBO0FBQXVDLGVBQU8sRUFBOUM7O0lBQUgsQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLE9BQVQsR0FBbUI7SUFBOUIsQ0FETDtHQUREOztFQUtBLGFBQUMsQ0FBQSxNQUFELENBQVEsU0FBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7TUFBRyxJQUFHLElBQUMsQ0FBQSxPQUFPLENBQUMsT0FBWjtBQUF5QixlQUFPLEVBQWhDO09BQUEsTUFBQTtBQUF1QyxlQUFPLEVBQTlDOztJQUFILENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxPQUFULEdBQW1CO0lBQTlCLENBREw7R0FERDs7RUFNQSxhQUFDLENBQUEsTUFBRCxDQUFRLHVCQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMscUJBQVQsR0FBaUM7SUFBNUMsQ0FETDtHQUREOztFQU1BLGFBQUMsQ0FBQSxNQUFELENBQVEsZUFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLGFBQVQsR0FBeUI7SUFBcEMsQ0FETDtHQUREOztFQUlBLGFBQUMsQ0FBQSxNQUFELENBQVEsYUFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLFdBQVQsR0FBdUI7SUFBbEMsQ0FETDtHQUREOzswQkFTQSxVQUFBLEdBQVksU0FBQTtJQUNYLElBQUMsQ0FBQSxhQUFELEdBQWlCLElBQUksS0FBSixDQUNoQjtNQUFBLE1BQUEsRUFBUSxJQUFSO01BQVcsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFuQjtNQUEwQixDQUFBLEVBQUcsS0FBSyxDQUFDLEdBQW5DO01BQXdDLElBQUEsRUFBTSxhQUE5QztNQUNBLE9BQUEsRUFBUyxJQUFDLENBQUEsT0FEVjtNQUNtQixlQUFBLEVBQWlCLElBRHBDO0tBRGdCO0lBSWpCLElBQUcsSUFBQyxDQUFBLGVBQUo7YUFDQyxJQUFDLENBQUEsNkJBQUQsQ0FBK0IsSUFBQyxDQUFBLGFBQWhDLEVBREQ7S0FBQSxNQUdLLElBQUcsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUFBLElBQXVCLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBdkIsSUFBOEMsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUE5QyxJQUFxRSxJQUFDLENBQUEsUUFBRCxDQUFVLEdBQVYsRUFBZSxHQUFmLENBQXJFLElBQTRGLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBL0Y7TUFDSixJQUFDLENBQUEsb0JBQUQsQ0FBc0IsSUFBQyxDQUFBLGFBQXZCO2FBQ0EsSUFBQyxDQUFBLG1CQUFELENBQXFCLElBQUksS0FBSixDQUNwQjtRQUFBLE1BQUEsRUFBUSxJQUFSO1FBQVcsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFuQjtRQUEwQixNQUFBLEVBQVEsRUFBbEM7UUFBc0MsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUEvQztRQUF1RCxJQUFBLEVBQU0sV0FBN0Q7UUFBMEUsT0FBQSxFQUFTLElBQUMsQ0FBQSxPQUFwRjtRQUE2RixlQUFBLEVBQWlCLElBQTlHO09BRG9CLENBQXJCLEVBRkk7S0FBQSxNQUtBLElBQUcsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUFIO01BQ0osS0FBQSxDQUFNLElBQU47TUFDQSxJQUFDLENBQUEsb0JBQUQsQ0FBc0IsSUFBQyxDQUFBLGFBQXZCO2FBQ0EsSUFBQyxDQUFBLG1CQUFELENBQXFCLElBQUksS0FBSixDQUNwQjtRQUFBLE1BQUEsRUFBUSxJQUFSO1FBQVcsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFuQjtRQUEwQixNQUFBLEVBQVEsRUFBbEM7UUFBc0MsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUEvQztRQUF1RCxJQUFBLEVBQU0sV0FBN0Q7UUFBMEUsT0FBQSxFQUFTLElBQUMsQ0FBQSxPQUFwRjtRQUE2RixlQUFBLEVBQWlCLElBQTlHO09BRG9CLENBQXJCLEVBSEk7S0FBQSxNQU1BLElBQUcsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUFBLElBQXVCLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBdkIsSUFBOEMsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUFqRDthQUNKLElBQUMsQ0FBQSxzQkFBRCxDQUF3QixJQUFDLENBQUEsYUFBekIsRUFESTtLQUFBLE1BQUE7YUFJQSxJQUFDLENBQUEsc0JBQUQsQ0FBd0IsSUFBQyxDQUFBLGFBQXpCLEVBSkE7O0VBbkJNOzswQkErQlosc0JBQUEsR0FBd0IsU0FBQyxRQUFEO0FBQ3ZCLFFBQUE7SUFBQSxRQUFRLENBQUMsTUFBVCxHQUFrQjtJQUVsQixzQkFBQSxHQUF5QixJQUFJLFNBQUosQ0FDeEI7TUFBQSxNQUFBLEVBQVEsUUFBUjtNQUFrQixLQUFBLEVBQU8sRUFBekI7TUFBNkIsTUFBQSxFQUFRLEVBQXJDO01BQXlDLENBQUEsRUFBRyxLQUFLLENBQUMsSUFBTixDQUFXLENBQVgsQ0FBNUM7TUFBMkQsQ0FBQSxFQUFHLEtBQUssQ0FBQyxHQUFOLENBQVUsQ0FBQSxHQUFJLENBQWQsQ0FBOUQ7TUFDQSxLQUFBLEVBQU8sSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFNLENBQUEsSUFBQyxDQUFBLFNBQUQsQ0FEckI7TUFDa0MsZUFBQSxFQUFpQixJQURuRDtNQUVBLFFBQUEsRUFBVSxFQUZWO01BRWMsVUFBQSxFQUFZLEdBRjFCO01BRStCLFNBQUEsRUFBVyxRQUYxQztNQUVvRCxVQUFBLEVBQVksc0JBRmhFO01BR0EsSUFBQSxFQUFNLElBQUMsQ0FBQSxxQkFIUDtLQUR3QjtXQU16QixvQkFBQSxHQUF1QixJQUFJLEtBQUosQ0FDdEI7TUFBQSxNQUFBLEVBQVEsUUFBUjtNQUFrQixLQUFBLEVBQU8sR0FBekI7TUFBOEIsTUFBQSxFQUFRLEVBQXRDO01BQTBDLENBQUEsRUFBRyxLQUFLLENBQUMsS0FBTixDQUFZLENBQUMsQ0FBYixDQUE3QztNQUE4RCxDQUFBLEVBQUcsS0FBSyxDQUFDLEdBQU4sQ0FBVSxDQUFWLENBQWpFO01BQ0EsS0FBQSxFQUFPLElBQUMsQ0FBQSxNQUFNLENBQUMsMEJBQTJCLENBQUEsSUFBQyxDQUFBLFNBQUQsQ0FEMUM7S0FEc0I7RUFUQTs7MEJBY3hCLDZCQUFBLEdBQStCLFNBQUMsUUFBRDtBQUM5QixRQUFBO0lBQUEsUUFBUSxDQUFDLE1BQVQsR0FBa0I7SUFFbEIsc0JBQUEsR0FBeUIsSUFBSSxTQUFKLENBQ3hCO01BQUEsTUFBQSxFQUFRLFFBQVI7TUFBa0IsS0FBQSxFQUFPLEVBQXpCO01BQTZCLE1BQUEsRUFBUSxFQUFyQztNQUF5QyxDQUFBLEVBQUcsS0FBSyxDQUFDLElBQWxEO01BQXdELENBQUEsRUFBRyxLQUFLLENBQUMsR0FBTixDQUFVLENBQVYsQ0FBM0Q7TUFDQSxLQUFBLEVBQU8sSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFNLENBQUEsSUFBQyxDQUFBLFNBQUQsQ0FEckI7TUFDa0MsZUFBQSxFQUFpQixJQURuRDtNQUVBLFFBQUEsRUFBVSxFQUZWO01BRWMsVUFBQSxFQUFZLEdBRjFCO01BRStCLFNBQUEsRUFBVyxRQUYxQztNQUVvRCxVQUFBLEVBQVksc0JBRmhFO01BR0EsSUFBQSxFQUFNLElBQUMsQ0FBQSxxQkFIUDtLQUR3QjtXQU16QixvQkFBQSxHQUF1QixJQUFJLEtBQUosQ0FDdEI7TUFBQSxNQUFBLEVBQVEsUUFBUjtNQUFrQixLQUFBLEVBQU8sR0FBekI7TUFBOEIsTUFBQSxFQUFRLEVBQXRDO01BQTBDLENBQUEsRUFBRyxLQUFLLENBQUMsS0FBbkQ7TUFBMEQsQ0FBQSxFQUFHLEtBQUssQ0FBQyxHQUFOLENBQUEsQ0FBN0Q7TUFDQSxLQUFBLEVBQU8sSUFBQyxDQUFBLE1BQU0sQ0FBQywwQkFBMkIsQ0FBQSxJQUFDLENBQUEsU0FBRCxDQUQxQztLQURzQjtFQVRPOzswQkFpQi9CLHNCQUFBLEdBQXdCLFNBQUMsUUFBRDtBQUN2QixRQUFBO0lBQUEsUUFBUSxDQUFDLE1BQVQsR0FBa0I7SUFFbEIsb0JBQUEsR0FBdUIsSUFBSSxLQUFKLENBQ3RCO01BQUEsTUFBQSxFQUFRLFFBQVI7TUFBa0IsS0FBQSxFQUFPLEdBQXpCO01BQThCLE1BQUEsRUFBUSxRQUFRLENBQUMsTUFBL0M7TUFBdUQsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQUFoRTtNQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsTUFBTSxDQUFDLHFCQUFzQixDQUFBLElBQUMsQ0FBQSxTQUFELENBRHJDO0tBRHNCO0lBSXZCLHNCQUFBLEdBQXlCLElBQUksU0FBSixDQUN4QjtNQUFBLE1BQUEsRUFBUSxRQUFSO01BQWtCLEtBQUEsRUFBTyxFQUF6QjtNQUE2QixNQUFBLEVBQVEsRUFBckM7TUFBeUMsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFsRDtNQUEwRCxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQW5FO01BQ0EsS0FBQSxFQUFPLElBQUMsQ0FBQSxNQUFNLENBQUMsS0FBTSxDQUFBLElBQUMsQ0FBQSxTQUFELENBRHJCO01BQ2tDLGVBQUEsRUFBaUIsSUFEbkQ7TUFFQSxRQUFBLEVBQVUsRUFGVjtNQUVjLFVBQUEsRUFBWSxHQUYxQjtNQUUrQixTQUFBLEVBQVcsUUFGMUM7TUFFb0QsVUFBQSxFQUFZLHNCQUZoRTtNQUdBLElBQUEsRUFBTSxJQUFDLENBQUEscUJBSFA7S0FEd0I7V0FNekIsb0JBQUEsR0FBdUIsSUFBSSxLQUFKLENBQ3RCO01BQUEsTUFBQSxFQUFRLFFBQVI7TUFBa0IsS0FBQSxFQUFPLEdBQXpCO01BQThCLE1BQUEsRUFBUSxRQUFRLENBQUMsTUFBL0M7TUFBdUQsQ0FBQSxFQUFHLEtBQUssQ0FBQyxLQUFoRTtNQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsTUFBTSxDQUFDLHNCQUF1QixDQUFBLElBQUMsQ0FBQSxTQUFELENBRHRDO0tBRHNCO0VBYkE7OzBCQWtCeEIsb0JBQUEsR0FBc0IsU0FBQyxRQUFEO0FBQ3JCLFFBQUE7SUFBQSxRQUFRLENBQUMsTUFBVCxHQUFrQjtJQUVsQixrQkFBQSxHQUFxQixJQUFJLFNBQUosQ0FDcEI7TUFBQSxNQUFBLEVBQVEsUUFBUjtNQUFrQixLQUFBLEVBQU8sRUFBekI7TUFBNkIsTUFBQSxFQUFRLEVBQXJDO01BQXlDLENBQUEsRUFBRyxLQUFLLENBQUMsSUFBTixDQUFXLEVBQVgsQ0FBNUM7TUFBNEQsQ0FBQSxFQUFHLEtBQUssQ0FBQyxHQUFOLENBQVUsRUFBVixDQUEvRDtNQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsTUFBTSxDQUFDLEtBQU0sQ0FBQSxJQUFDLENBQUEsU0FBRCxDQURyQjtNQUNrQyxlQUFBLEVBQWlCLElBRG5EO01BQ3lELGFBQUEsRUFBZSxDQUFDLElBRHpFO01BRUEsUUFBQSxFQUFVLEVBRlY7TUFFYyxVQUFBLEVBQVksR0FGMUI7TUFFK0IsU0FBQSxFQUFXLFFBRjFDO01BRW9ELFVBQUEsRUFBWSxzQkFGaEU7TUFHQSxJQUFBLEVBQU0sSUFBQyxDQUFBLHFCQUhQO0tBRG9CO0lBTXJCLG9CQUFBLEdBQXVCLElBQUksS0FBSixDQUN0QjtNQUFBLE1BQUEsRUFBUSxRQUFSO01BQWtCLEtBQUEsRUFBTyxHQUF6QjtNQUE4QixNQUFBLEVBQVEsUUFBUSxDQUFDLE1BQS9DO01BQXVELENBQUEsRUFBRyxLQUFLLENBQUMsTUFBaEU7TUFDQSxLQUFBLEVBQU8sSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQURmO0tBRHNCO1dBSXZCLG1CQUFBLEdBQXNCLElBQUksS0FBSixDQUNyQjtNQUFBLE1BQUEsRUFBUSxRQUFSO01BQWtCLEtBQUEsRUFBTyxHQUF6QjtNQUE4QixNQUFBLEVBQVEsUUFBUSxDQUFDLE1BQS9DO01BQXVELENBQUEsRUFBRyxLQUFLLENBQUMsS0FBaEU7TUFDQSxLQUFBLEVBQU8sSUFBQyxDQUFBLE1BQU0sQ0FBQyxtQkFBb0IsQ0FBQSxJQUFDLENBQUEsU0FBRCxDQURuQztLQURxQjtFQWJEOzswQkFzQnRCLG1CQUFBLEdBQXFCLFNBQUMsUUFBRDtXQUNwQixJQUFDLENBQUEsV0FBRCxHQUFlLElBQUksS0FBSixDQUNkO01BQUEsSUFBQSxFQUFNLFdBQU47TUFDQSxNQUFBLEVBQVEsUUFEUjtNQUNrQixLQUFBLEVBQU8sR0FEekI7TUFDOEIsTUFBQSxFQUFRLENBRHRDO01BQ3lDLENBQUEsRUFBRyxLQUFLLENBQUMsTUFEbEQ7TUFDMEQsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFOLENBQWEsQ0FBQyxDQUFkLENBRDdEO01BRUEsZUFBQSxFQUFpQixJQUFDLENBQUEsTUFBTSxDQUFDLEtBQU0sQ0FBQSxJQUFDLENBQUEsT0FBRCxDQUYvQjtNQUUwQyxZQUFBLEVBQWMsRUFGeEQ7S0FEYztFQURLOzs7O0dBdktjOzs7O0FDSnBDLElBQUEsTUFBQTtFQUFBOzs7O0FBQUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxnQkFBUjs7QUFLSCxPQUFPLENBQUM7OztFQUNBLHVCQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUzs7Ozs7Ozs7O0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLElBQUEsRUFBTSxTQUFOO01BQ0EsSUFBQSxFQUFNLElBRE47TUFHQSxlQUFBLEVBQWlCLElBSGpCO01BSUEsWUFBQSxFQUFjLEVBSmQ7TUFNQSxNQUFBLEVBQVEsTUFBTSxDQUFDLElBTmY7S0FERDtJQVNBLCtDQUFNLElBQUMsQ0FBQSxPQUFQO0lBR0EsTUFBTSxDQUFDLDhCQUFQLENBQXNDLElBQXRDO0lBRUEsSUFBQyxDQUFBLE1BQUQsR0FDQztNQUFBLFFBQUEsRUFBVTtRQUFFLEtBQUEsRUFBTyxDQUFUO09BQVY7TUFDQSxNQUFBLEVBQVE7UUFBRSxLQUFBLEVBQU8sQ0FBVDtPQURSOztFQWpCVzs7RUF5QmIsYUFBQyxDQUFBLE1BQUQsQ0FBUSxNQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDtNQUNKLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxHQUFnQjtNQUNoQixJQUFDLENBQUEsS0FBRCxHQUFTLElBQUMsQ0FBQSxJQUFJLENBQUM7TUFDZixJQUFDLENBQUEsTUFBRCxHQUFVLElBQUMsQ0FBQSxJQUFJLENBQUM7YUFDaEIsSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFOLEdBQWU7SUFKWCxDQURMO0dBREQ7O0VBUUEsYUFBQyxDQUFBLE1BQUQsQ0FBUSxRQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0dBREQ7OzBCQU9BLFVBQUEsR0FBWSxTQUFDLENBQUQsRUFBSSxDQUFKO0FBQVUsV0FBTyxNQUFNLENBQUMsS0FBUCxLQUFnQixDQUFoQixJQUFzQixNQUFNLENBQUMsTUFBUCxLQUFpQjtFQUF4RDs7MEJBQ1osUUFBQSxHQUFVLFNBQUMsQ0FBRCxFQUFJLENBQUo7QUFBVSxXQUFPLElBQUMsQ0FBQSxLQUFELEtBQVUsQ0FBVixJQUFnQixJQUFDLENBQUEsTUFBRCxLQUFXO0VBQTVDOzswQkFDVixTQUFBLEdBQVcsU0FBQyxDQUFEO0FBQU8sV0FBTyxJQUFDLENBQUEsS0FBRCxLQUFVO0VBQXhCOzswQkFFWCxPQUFBLEdBQVMsU0FBQTtXQUNSLElBQUksU0FBSixDQUFjO01BQUUsSUFBQSxFQUFTLE1BQU0sQ0FBQyxLQUFSLEdBQWMsR0FBZCxHQUFpQixNQUFNLENBQUMsTUFBbEM7TUFBNEMsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFyRDtLQUFkO0VBRFE7OzBCQUtULG9CQUFBLEdBQXNCLFNBQUE7V0FDckIsSUFBQyxDQUFBLE9BQUQsQ0FBUyxRQUFULEVBQW1CO01BQUEsS0FBQSxFQUFPLE1BQUEsQ0FBTztRQUFBLE9BQUEsRUFBUyxDQUFUO09BQVAsQ0FBUDtNQUEyQixJQUFBLEVBQU0sR0FBakM7S0FBbkI7RUFEcUI7OzBCQUd0QixrQkFBQSxHQUFvQixTQUFBO1dBQ25CLElBQUMsQ0FBQSxPQUFELENBQVMsTUFBVCxFQUFpQjtNQUFBLEtBQUEsRUFBTyxNQUFBLENBQU87UUFBQSxPQUFBLEVBQVMsQ0FBVDtPQUFQLENBQVA7TUFBMkIsSUFBQSxFQUFNLEdBQWpDO0tBQWpCO0VBRG1COzswQkFHcEIsbUJBQUEsR0FBcUIsU0FBQTtXQUNwQixJQUFDLENBQUEsV0FBRCxDQUFhLFFBQWI7RUFEb0I7OzBCQUdyQixpQkFBQSxHQUFtQixTQUFBO1dBQ2xCLElBQUMsQ0FBQSxXQUFELENBQWEsTUFBYjtFQURrQjs7OztHQTNEZ0I7Ozs7QUNMcEMsSUFBQSxhQUFBO0VBQUE7Ozs7QUFBQyxnQkFBaUIsT0FBQSxDQUFRLGVBQVI7O0FBR1osT0FBTyxDQUFDOzs7RUFDQSx1QkFBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7Ozs7Ozs7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsU0FBQSxFQUFXLE1BQVg7TUFDQSxPQUFBLEVBQVMsTUFEVDtNQUdBLE9BQUEsRUFBUyxJQUhUO01BSUEsZUFBQSxFQUFpQixLQUpqQjtNQU9BLHFCQUFBLEVBQXVCLE9BUHZCO0tBREQ7SUFXQSwrQ0FBTSxJQUFDLENBQUEsT0FBUDtFQWJZOztFQWlCYixhQUFDLENBQUEsTUFBRCxDQUFRLFdBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFULEdBQXFCO0lBQWhDLENBREw7R0FERDs7RUFJQSxhQUFDLENBQUEsTUFBRCxDQUFRLFNBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxPQUFULEdBQW1CO0lBQTlCLENBREw7R0FERDs7RUFJQSxhQUFDLENBQUEsTUFBRCxDQUFRLGlCQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsZUFBVCxHQUEyQjtJQUF0QyxDQURMO0dBREQ7O0VBSUEsYUFBQyxDQUFBLE1BQUQsQ0FBUSxTQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTtNQUFHLElBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxPQUFaO0FBQXlCLGVBQU8sRUFBaEM7T0FBQSxNQUFBO0FBQXVDLGVBQU8sRUFBOUM7O0lBQUgsQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLE9BQVQsR0FBbUI7SUFBOUIsQ0FETDtHQUREOztFQU1BLGFBQUMsQ0FBQSxNQUFELENBQVEsdUJBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxxQkFBVCxHQUFpQztJQUE1QyxDQURMO0dBREQ7OzBCQVVBLFVBQUEsR0FBWSxTQUFBO0FBQ1gsUUFBQTtJQUFBLE1BQUEsR0FBUyxJQUFJLEtBQUosQ0FDUjtNQUFBLE1BQUEsRUFBUSxJQUFSO01BQVcsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFuQjtNQUEwQixDQUFBLEVBQUcsS0FBSyxDQUFDLEdBQW5DO01BQXdDLElBQUEsRUFBTSxhQUE5QztNQUNBLE9BQUEsRUFBUyxJQUFDLENBQUEsT0FEVjtNQUNtQixlQUFBLEVBQWlCLElBRHBDO0tBRFE7SUFJVCxJQUFHLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBQSxJQUF1QixJQUFDLENBQUEsUUFBRCxDQUFVLEdBQVYsRUFBZSxHQUFmLENBQXZCLElBQThDLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBOUMsSUFBcUUsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUFyRSxJQUE0RixJQUFDLENBQUEsUUFBRCxDQUFVLEdBQVYsRUFBZSxHQUFmLENBQS9GO01BQ0MsSUFBQyxDQUFBLG9CQUFELENBQXNCLE1BQXRCO2FBQ0EsSUFBQyxDQUFBLG1CQUFELENBQXFCLElBQUksS0FBSixDQUNwQjtRQUFBLE1BQUEsRUFBUSxJQUFSO1FBQVcsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFuQjtRQUEwQixNQUFBLEVBQVEsRUFBbEM7UUFBc0MsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUEvQztRQUF1RCxJQUFBLEVBQU0sV0FBN0Q7UUFBMEUsT0FBQSxFQUFTLElBQUMsQ0FBQSxPQUFwRjtRQUE2RixlQUFBLEVBQWlCLElBQTlHO09BRG9CLENBQXJCLEVBRkQ7S0FBQSxNQUtLLElBQUcsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUFBLElBQXVCLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBdkIsSUFBOEMsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUFqRDthQUNKLElBQUMsQ0FBQSxzQkFBRCxDQUF3QixNQUF4QixFQURJO0tBQUEsTUFHQSxJQUFHLElBQUMsQ0FBQSxlQUFKO2FBQ0osSUFBQyxDQUFBLDZCQUFELENBQStCLE1BQS9CLEVBREk7S0FBQSxNQUFBO2FBR0EsSUFBQyxDQUFBLHNCQUFELENBQXdCLE1BQXhCLEVBSEE7O0VBYk07OzBCQXdCWixzQkFBQSxHQUF3QixTQUFDLFFBQUQ7QUFDdkIsUUFBQTtJQUFBLFFBQVEsQ0FBQyxNQUFULEdBQWtCO0lBRWxCLHNCQUFBLEdBQXlCLElBQUksU0FBSixDQUN4QjtNQUFBLE1BQUEsRUFBUSxRQUFSO01BQWtCLEtBQUEsRUFBTyxFQUF6QjtNQUE2QixNQUFBLEVBQVEsRUFBckM7TUFBeUMsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQUFOLENBQVcsQ0FBWCxDQUE1QztNQUEyRCxDQUFBLEVBQUcsS0FBSyxDQUFDLEdBQU4sQ0FBVSxDQUFBLEdBQUksQ0FBZCxDQUE5RDtNQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsTUFBTSxDQUFDLEtBQU0sQ0FBQSxJQUFDLENBQUEsU0FBRCxDQURyQjtNQUNrQyxlQUFBLEVBQWlCLElBRG5EO01BRUEsUUFBQSxFQUFVLEVBRlY7TUFFYyxVQUFBLEVBQVksR0FGMUI7TUFFK0IsU0FBQSxFQUFXLFFBRjFDO01BRW9ELFVBQUEsRUFBWSxzQkFGaEU7TUFHQSxJQUFBLEVBQU0sSUFBQyxDQUFBLHFCQUhQO0tBRHdCO1dBTXpCLG9CQUFBLEdBQXVCLElBQUksS0FBSixDQUN0QjtNQUFBLE1BQUEsRUFBUSxRQUFSO01BQWtCLEtBQUEsRUFBTyxHQUF6QjtNQUE4QixNQUFBLEVBQVEsRUFBdEM7TUFBMEMsQ0FBQSxFQUFHLEtBQUssQ0FBQyxLQUFOLENBQVksQ0FBQyxDQUFiLENBQTdDO01BQThELENBQUEsRUFBRyxLQUFLLENBQUMsR0FBTixDQUFVLENBQVYsQ0FBakU7TUFDQSxLQUFBLEVBQU8sSUFBQyxDQUFBLE1BQU0sQ0FBQywwQkFBMkIsQ0FBQSxJQUFDLENBQUEsU0FBRCxDQUQxQztLQURzQjtFQVRBOzswQkFjeEIsNkJBQUEsR0FBK0IsU0FBQyxRQUFEO0FBQzlCLFFBQUE7SUFBQSxRQUFRLENBQUMsTUFBVCxHQUFrQjtJQUVsQixzQkFBQSxHQUF5QixJQUFJLFNBQUosQ0FDeEI7TUFBQSxNQUFBLEVBQVEsUUFBUjtNQUFrQixLQUFBLEVBQU8sRUFBekI7TUFBNkIsTUFBQSxFQUFRLEVBQXJDO01BQXlDLENBQUEsRUFBRyxLQUFLLENBQUMsSUFBbEQ7TUFBd0QsQ0FBQSxFQUFHLEtBQUssQ0FBQyxHQUFOLENBQVUsQ0FBVixDQUEzRDtNQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsTUFBTSxDQUFDLEtBQU0sQ0FBQSxJQUFDLENBQUEsU0FBRCxDQURyQjtNQUNrQyxlQUFBLEVBQWlCLElBRG5EO01BRUEsUUFBQSxFQUFVLEVBRlY7TUFFYyxVQUFBLEVBQVksR0FGMUI7TUFFK0IsU0FBQSxFQUFXLFFBRjFDO01BRW9ELFVBQUEsRUFBWSxzQkFGaEU7TUFHQSxJQUFBLEVBQU0sSUFBQyxDQUFBLHFCQUhQO0tBRHdCO1dBTXpCLG9CQUFBLEdBQXVCLElBQUksS0FBSixDQUN0QjtNQUFBLE1BQUEsRUFBUSxRQUFSO01BQWtCLEtBQUEsRUFBTyxHQUF6QjtNQUE4QixNQUFBLEVBQVEsRUFBdEM7TUFBMEMsQ0FBQSxFQUFHLEtBQUssQ0FBQyxLQUFuRDtNQUEwRCxDQUFBLEVBQUcsS0FBSyxDQUFDLEdBQU4sQ0FBQSxDQUE3RDtNQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsTUFBTSxDQUFDLDBCQUEyQixDQUFBLElBQUMsQ0FBQSxTQUFELENBRDFDO0tBRHNCO0VBVE87OzBCQWlCL0Isc0JBQUEsR0FBd0IsU0FBQyxRQUFEO0FBQ3ZCLFFBQUE7SUFBQSxRQUFRLENBQUMsTUFBVCxHQUFrQjtJQUVsQixvQkFBQSxHQUF1QixJQUFJLEtBQUosQ0FDdEI7TUFBQSxNQUFBLEVBQVEsUUFBUjtNQUFrQixLQUFBLEVBQU8sR0FBekI7TUFBOEIsTUFBQSxFQUFRLFFBQVEsQ0FBQyxNQUEvQztNQUF1RCxDQUFBLEVBQUcsS0FBSyxDQUFDLElBQWhFO01BQ0EsS0FBQSxFQUFPLElBQUMsQ0FBQSxNQUFNLENBQUMscUJBQXNCLENBQUEsSUFBQyxDQUFBLFNBQUQsQ0FEckM7S0FEc0I7SUFJdkIsc0JBQUEsR0FBeUIsSUFBSSxTQUFKLENBQ3hCO01BQUEsTUFBQSxFQUFRLFFBQVI7TUFBa0IsS0FBQSxFQUFPLEVBQXpCO01BQTZCLE1BQUEsRUFBUSxFQUFyQztNQUF5QyxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQWxEO01BQTBELENBQUEsRUFBRyxLQUFLLENBQUMsTUFBbkU7TUFDQSxLQUFBLEVBQU8sSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFNLENBQUEsSUFBQyxDQUFBLFNBQUQsQ0FEckI7TUFDa0MsZUFBQSxFQUFpQixJQURuRDtNQUVBLFFBQUEsRUFBVSxFQUZWO01BRWMsVUFBQSxFQUFZLEdBRjFCO01BRStCLFNBQUEsRUFBVyxRQUYxQztNQUVvRCxVQUFBLEVBQVksc0JBRmhFO01BR0EsSUFBQSxFQUFNLElBQUMsQ0FBQSxxQkFIUDtLQUR3QjtXQU16QixvQkFBQSxHQUF1QixJQUFJLEtBQUosQ0FDdEI7TUFBQSxNQUFBLEVBQVEsUUFBUjtNQUFrQixLQUFBLEVBQU8sR0FBekI7TUFBOEIsTUFBQSxFQUFRLFFBQVEsQ0FBQyxNQUEvQztNQUF1RCxDQUFBLEVBQUcsS0FBSyxDQUFDLEtBQWhFO01BQ0EsS0FBQSxFQUFPLElBQUMsQ0FBQSxNQUFNLENBQUMsc0JBQXVCLENBQUEsSUFBQyxDQUFBLFNBQUQsQ0FEdEM7S0FEc0I7RUFiQTs7MEJBa0J4QixvQkFBQSxHQUFzQixTQUFDLFFBQUQ7QUFDckIsUUFBQTtJQUFBLFFBQVEsQ0FBQyxNQUFULEdBQWtCO0lBRWxCLGtCQUFBLEdBQXFCLElBQUksU0FBSixDQUNwQjtNQUFBLE1BQUEsRUFBUSxRQUFSO01BQWtCLEtBQUEsRUFBTyxFQUF6QjtNQUE2QixNQUFBLEVBQVEsRUFBckM7TUFBeUMsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQUFOLENBQVcsRUFBWCxDQUE1QztNQUE0RCxDQUFBLEVBQUcsS0FBSyxDQUFDLEdBQU4sQ0FBVSxFQUFWLENBQS9EO01BQ0EsS0FBQSxFQUFPLElBQUMsQ0FBQSxNQUFNLENBQUMsS0FBTSxDQUFBLElBQUMsQ0FBQSxTQUFELENBRHJCO01BQ2tDLGVBQUEsRUFBaUIsSUFEbkQ7TUFDeUQsYUFBQSxFQUFlLENBQUMsSUFEekU7TUFFQSxRQUFBLEVBQVUsRUFGVjtNQUVjLFVBQUEsRUFBWSxHQUYxQjtNQUUrQixTQUFBLEVBQVcsUUFGMUM7TUFFb0QsVUFBQSxFQUFZLHNCQUZoRTtNQUdBLElBQUEsRUFBTSxJQUFDLENBQUEscUJBSFA7S0FEb0I7SUFNckIsb0JBQUEsR0FBdUIsSUFBSSxLQUFKLENBQ3RCO01BQUEsTUFBQSxFQUFRLFFBQVI7TUFBa0IsS0FBQSxFQUFPLEdBQXpCO01BQThCLE1BQUEsRUFBUSxRQUFRLENBQUMsTUFBL0M7TUFBdUQsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFoRTtNQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsTUFBTSxDQUFDLEtBRGY7S0FEc0I7V0FJdkIsbUJBQUEsR0FBc0IsSUFBSSxLQUFKLENBQ3JCO01BQUEsTUFBQSxFQUFRLFFBQVI7TUFBa0IsS0FBQSxFQUFPLEdBQXpCO01BQThCLE1BQUEsRUFBUSxRQUFRLENBQUMsTUFBL0M7TUFBdUQsQ0FBQSxFQUFHLEtBQUssQ0FBQyxLQUFoRTtNQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsTUFBTSxDQUFDLG1CQUFvQixDQUFBLElBQUMsQ0FBQSxTQUFELENBRG5DO0tBRHFCO0VBYkQ7OzBCQXNCdEIsbUJBQUEsR0FBcUIsU0FBQyxRQUFEO0FBQ3BCLFFBQUE7V0FBQSxhQUFBLEdBQWdCLElBQUksS0FBSixDQUNmO01BQUEsTUFBQSxFQUFRLFFBQVI7TUFBa0IsS0FBQSxFQUFPLEdBQXpCO01BQThCLE1BQUEsRUFBUSxDQUF0QztNQUF5QyxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQWxEO01BQTBELENBQUEsRUFBRyxLQUFLLENBQUMsTUFBTixDQUFhLENBQUMsQ0FBZCxDQUE3RDtNQUNBLGVBQUEsRUFBaUIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFNLENBQUEsSUFBQyxDQUFBLE9BQUQsQ0FEL0I7TUFDMEMsWUFBQSxFQUFjLEVBRHhEO0tBRGU7RUFESTs7OztHQTdJYzs7OztBQ0hwQyxJQUFBLGFBQUE7RUFBQTs7OztBQUFDLGdCQUFpQixPQUFBLENBQVEsZUFBUjs7QUFHWixPQUFPLENBQUM7OztFQUNBLHdCQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUzs7Ozs7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsVUFBQSxFQUFZLElBQVo7TUFDQSxVQUFBLEVBQVksS0FEWjtLQUREO0lBSUEsZ0RBQU0sSUFBQyxDQUFBLE9BQVA7SUFFQSxJQUFDLENBQUEsVUFBRCxHQUFjLElBQUksS0FBSixDQUNiO01BQUEsZUFBQSxFQUFpQixLQUFqQjtNQUNBLFlBQUEsRUFBYyxJQUFDLENBQUEsWUFBRCxHQUFnQixFQUQ5QjtNQUVBLE9BQUEsRUFBUyxDQUZUO0tBRGE7SUFLZCxJQUFDLENBQUEsVUFBVSxDQUFDLFVBQVosQ0FBQTtJQUdBLElBQUMsQ0FBQSxpQkFBRCxDQUFBO0lBQ0EsSUFBQyxDQUFBLGdCQUFELENBQUE7SUFFQSxJQUFDLENBQUEsRUFBRCxDQUFJLGFBQUosRUFBbUIsU0FBQTthQUNsQixJQUFDLENBQUEsZ0JBQUQsQ0FBQTtJQURrQixDQUFuQjtJQUdBLElBQUMsQ0FBQSxFQUFELENBQUksY0FBSixFQUFvQixTQUFBO2FBQ25CLElBQUMsQ0FBQSxnQkFBRCxDQUFBO0lBRG1CLENBQXBCO0lBR0EsSUFBQyxDQUFBLEVBQUQsQ0FBSSxVQUFKLEVBQWdCLFNBQUE7YUFDZixJQUFDLENBQUEsZ0JBQUQsQ0FBQTtJQURlLENBQWhCO0lBR0EsSUFBQyxDQUFBLEVBQUQsQ0FBSSxVQUFKLEVBQWdCLFNBQUE7YUFDZixJQUFDLENBQUEsZ0JBQUQsQ0FBQTtJQURlLENBQWhCO0VBNUJZOztFQWlDYixjQUFDLENBQUEsTUFBRCxDQUFRLFlBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxVQUFULEdBQXNCO0lBQWpDLENBREw7R0FERDs7RUFJQSxjQUFDLENBQUEsTUFBRCxDQUFRLFlBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxVQUFULEdBQXNCO0lBQWpDLENBREw7R0FERDs7MkJBT0EsY0FBQSxHQUFnQixTQUFBO1dBQ2YsSUFBQyxDQUFBLFVBQVUsQ0FBQyxPQUFaLEdBQXNCO0VBRFA7OzJCQUdoQixjQUFBLEdBQWdCLFNBQUE7V0FDZixJQUFDLENBQUEsWUFBWSxDQUFDLE9BQWQsR0FBd0I7RUFEVDs7MkJBR2hCLGdCQUFBLEdBQWtCLFNBQUE7QUFDakIsUUFBQTtJQUFBLE1BQUEsR0FBUztJQUlULElBQUMsQ0FBQSxVQUFVLENBQUMsS0FBWixHQUFvQixJQUFDLENBQUEsS0FBRCxHQUFTLE1BQUEsR0FBUztJQUN0QyxJQUFDLENBQUEsVUFBVSxDQUFDLE1BQVosR0FBcUIsSUFBQyxDQUFBLE1BQUQsR0FBVSxNQUFBLEdBQVM7SUFDeEMsSUFBQyxDQUFBLFVBQVUsQ0FBQyxDQUFaLEdBQWdCLEtBQUssQ0FBQyxNQUFOLENBQUE7SUFDaEIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxDQUFaLEdBQWdCLEtBQUssQ0FBQyxNQUFOLENBQUE7V0FDaEIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxLQUFaLEdBQW9CLElBQUMsQ0FBQTtFQVRKOzsyQkFZbEIsaUJBQUEsR0FBbUIsU0FBQTtBQUNsQixRQUFBO0lBQUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBdEIsQ0FBMEIsa0JBQTFCO0lBRUEsR0FBQSxHQUFNO1dBdUJOLEtBQUssQ0FBQyxTQUFOLENBQWdCLEdBQWhCO0VBMUJrQjs7OztHQS9EaUI7Ozs7QUNKckMsSUFBQSx3QkFBQTtFQUFBOzs7O0FBQUMsWUFBYSxPQUFBLENBQVEsbUJBQVI7O0FBQ2IsZ0JBQWlCLE9BQUEsQ0FBUSxlQUFSOztBQUdaLE9BQU8sQ0FBQzs7O0VBQ0EsdUJBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTOzs7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUVBLCtDQUFNLElBQUMsQ0FBQSxPQUFQLENBRkE7RUFGWTs7MEJBVWIsZ0JBQUEsR0FBa0IsU0FBQTtBQUVqQixRQUFBO0lBQUEsZUFBQSxHQUFrQixTQUFBO2FBQ2pCLE1BQU0sQ0FBQyxRQUFQLEdBQWtCO0lBREQ7V0FHbEIsVUFBQSxHQUFhLElBQUksU0FBSixDQUNaO01BQUEsS0FBQSxFQUFPLEVBQVA7TUFBVyxNQUFBLEVBQVEsRUFBbkI7TUFDQSxDQUFBLEVBQUcsS0FBSyxDQUFDLElBQU4sQ0FBVyxFQUFYLENBREg7TUFDbUIsQ0FBQSxFQUFHLEtBQUssQ0FBQyxHQUFOLENBQVUsRUFBVixDQUR0QjtNQUVBLE9BQUEsRUFBUyxlQUZUO0tBRFk7RUFMSTs7MEJBWWxCLGlCQUFBLEdBQW1CLFNBQUMsUUFBRDtBQUVsQixRQUFBO0lBQUEsV0FBQSxHQUFjLElBQUksS0FBSixDQUNiO01BQUEsSUFBQSxFQUFNLEVBQU47TUFBVSxZQUFBLEVBQWMsRUFBeEI7TUFDQSxDQUFBLEVBQUcsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFDLEVBQWIsQ0FESDtNQUNxQixDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxDQUFDLEVBQWQsQ0FEeEI7TUFFQSxlQUFBLEVBQWlCLHdCQUZqQjtNQUdBLFdBQUEsRUFBYSxDQUhiO01BSUEsTUFBQSxFQUNDO1FBQUEsT0FBQSxFQUFTLElBQVQ7T0FMRDtLQURhO0lBUWQsV0FBVyxDQUFDLEtBQVosR0FBb0I7TUFBQSxNQUFBLEVBQVEsU0FBUjs7SUFFcEIsV0FBVyxDQUFDLE1BQVosR0FDQztNQUFBLFFBQUEsRUFBVTtRQUFFLFdBQUEsRUFBYSx3QkFBZjtPQUFWO01BQ0EsTUFBQSxFQUFRO1FBQUUsV0FBQSxFQUFhLHdCQUFmO09BRFI7O0lBRUQsV0FBVyxDQUFDLFdBQVosQ0FBd0IsUUFBeEI7SUFFQSxpQkFBQSxHQUFvQixJQUFJLEtBQUosQ0FDbkI7TUFBQSxNQUFBLEVBQVEsV0FBUjtNQUNBLFdBQUEsRUFBYSxDQURiO01BRUEsSUFBQSxFQUFNLEVBRk47TUFFVSxZQUFBLEVBQWMsRUFGeEI7TUFHQSxDQUFBLEVBQUcsRUFISDtNQUdPLENBQUEsRUFBRyxFQUhWO01BSUEsZUFBQSxFQUFpQixJQUpqQjtLQURtQjtJQVFwQixpQkFBaUIsQ0FBQyxNQUFsQixHQUNDO01BQUEsUUFBQSxFQUFVO1FBQUUsV0FBQSxFQUFhLHdCQUFmO09BQVY7TUFDQSxNQUFBLEVBQVE7UUFBRSxXQUFBLEVBQWEsd0JBQWY7T0FEUjs7SUFFRCxpQkFBaUIsQ0FBQyxXQUFsQixDQUE4QixRQUE5QjtJQUVBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLFNBQUE7QUFDakIsVUFBQTtNQUFBLElBQUcsSUFBQyxDQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBaEIsS0FBd0IsTUFBM0I7UUFBdUMsU0FBQSxHQUFZLFNBQW5EO09BQUEsTUFBQTtRQUFpRSxTQUFBLEdBQVksT0FBN0U7O01BQ0EsSUFBQyxDQUFBLFdBQUQsQ0FBYSxTQUFiO01BQ0EsSUFBQyxDQUFBLFFBQVMsQ0FBQSxDQUFBLENBQUUsQ0FBQyxXQUFiLENBQXlCLFNBQXpCO2FBQ0EsSUFBQyxDQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBaEIsQ0FBd0IsU0FBeEIsRUFBbUM7UUFBQSxLQUFBLEVBQU8sTUFBQSxDQUFPO1VBQUEsT0FBQSxFQUFTLENBQVQ7U0FBUCxDQUFQO1FBQTJCLElBQUEsRUFBTSxHQUFqQztPQUFuQztJQUppQixDQUFsQjtJQU1BLG9CQUFBLEdBQXVCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQyxXQUFEO0FBQ3RCLFlBQUE7UUFBQSxXQUFBLEdBQWM7UUFFZCxNQUFNLENBQUMsRUFBUCxDQUFVLGVBQVYsRUFBMkIsU0FBQTtpQkFDMUIsV0FBVyxDQUFDLENBQVosR0FBZ0IsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFDLEVBQWI7UUFEVSxDQUEzQjtlQUdBLE1BQU0sQ0FBQyxFQUFQLENBQVUsY0FBVixFQUEwQixTQUFBO2lCQUN6QixXQUFXLENBQUMsQ0FBWixHQUFnQixLQUFLLENBQUMsTUFBTixDQUFhLENBQUMsRUFBZDtRQURTLENBQTFCO01BTnNCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQTtXQVN2QixvQkFBQSxDQUFxQixXQUFyQjtFQTdDa0I7Ozs7R0F2QmdCOzs7O0FDSHBDLElBQUEsY0FBQTtFQUFBOzs7O0FBQUMsaUJBQWtCLE9BQUEsQ0FBUSxnQkFBUjs7QUFHYixPQUFPLENBQUM7OztFQUNBLHVCQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUzs7Ozs7Ozs7O0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFFQSwrQ0FBTSxJQUFDLENBQUEsT0FBUCxDQUZBO0lBSUEsSUFBQyxDQUFBLFlBQUQsQ0FBQTtFQU5ZOzswQkFZYixZQUFBLEdBQWMsU0FBQTtJQUNiLElBQUcsS0FBSyxDQUFDLFFBQU4sQ0FBQSxDQUFIO2FBQ0MsSUFBQyxDQUFBLGFBQUQsQ0FBQSxFQUREO0tBQUEsTUFBQTtNQUdDLElBQUMsQ0FBQSxnQkFBRCxDQUFBO01BQ0EsSUFBQyxDQUFBLG1CQUFELENBQUE7TUFDQSxJQUFDLENBQUEsY0FBRCxDQUFBO2FBQ0EsSUFBQyxDQUFBLHFCQUFELENBQUEsRUFORDs7RUFEYTs7MEJBWWQsZ0JBQUEsR0FBa0IsU0FBQTtBQUNqQixRQUFBO0lBQUEsTUFBQSxHQUFTLENBQUMsTUFBTSxDQUFDLEtBQVAsR0FBZSxHQUFoQixDQUFBLEdBQXVCLElBQUMsQ0FBQTtJQUNqQyxNQUFBLEdBQVMsQ0FBQyxNQUFNLENBQUMsTUFBUCxHQUFnQixHQUFqQixDQUFBLEdBQXdCLElBQUMsQ0FBQTtXQUNsQyxJQUFDLENBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFiLEdBQXFCLElBQUksQ0FBQyxHQUFMLENBQVMsTUFBVCxFQUFpQixNQUFqQjtFQUhKOzswQkFTbEIsbUJBQUEsR0FBcUIsU0FBQyxRQUFEO0FBRXBCLFFBQUE7O01BRnFCLFdBQVc7O0lBRWhDLFNBQUEsR0FBWSxJQUFDLENBQUEsZUFBRCxDQUFpQixPQUFqQixFQUEwQjtNQUFDO1FBQUUsS0FBQSxFQUFPLE1BQVQ7UUFBaUIsTUFBQSxFQUFRLE1BQXpCO09BQUQsRUFDNUI7UUFBRSxLQUFBLEVBQU8sUUFBVDtRQUFtQixNQUFBLEVBQVEsUUFBM0I7T0FENEIsRUFFNUI7UUFBRSxLQUFBLEVBQU8sTUFBVDtRQUFpQixNQUFBLEVBQVEsTUFBekI7T0FGNEI7S0FBMUIsRUFFa0MsUUFGbEM7SUFJWixnQkFBQSxHQUFtQixJQUFDLENBQUEsZUFBRCxDQUFpQixRQUFqQixFQUEyQjtNQUFDO1FBQUUsS0FBQSxFQUFPLE9BQVQ7UUFBa0IsTUFBQSxFQUFRLEtBQTFCO09BQUQsRUFDbEM7UUFBRSxLQUFBLEVBQU8sS0FBVDtRQUFnQixNQUFBLEVBQVEsS0FBeEI7T0FEa0M7S0FBM0IsRUFDMkIsSUFEM0I7SUFHbkIsY0FBQSxHQUFpQixJQUFDLENBQUEsZUFBRCxDQUFpQixNQUFqQixFQUF5QjtNQUFDO1FBQUUsS0FBQSxFQUFPLE9BQVQ7UUFBa0IsTUFBQSxFQUFRLEtBQTFCO09BQUQsRUFDL0I7UUFBRSxLQUFBLEVBQU8sS0FBVDtRQUFnQixNQUFBLEVBQVEsS0FBeEI7T0FEK0I7S0FBekIsRUFDNEIsSUFENUI7SUFHakIsZ0JBQUEsR0FBbUIsSUFBQyxDQUFBLGVBQUQsQ0FBaUIsUUFBakIsRUFBMkI7TUFBQztRQUFFLEtBQUEsRUFBTyxPQUFUO1FBQWtCLE1BQUEsRUFBUSxLQUExQjtPQUFELEVBQ25DO1FBQUUsS0FBQSxFQUFPLE1BQVQ7UUFBaUIsTUFBQSxFQUFRLElBQXpCO09BRG1DO0tBQTNCLEVBQzBCLEtBRDFCO0lBR25CLElBQUcsY0FBSDtNQUF1QixJQUFDLENBQUEsZ0JBQUQsQ0FBQSxFQUF2Qjs7SUFDQSxJQUFHLGdCQUFIO01BQXlCLElBQUMsQ0FBQSxpQkFBRCxDQUFtQixTQUFuQixFQUF6Qjs7SUFDQSxJQUFHLGdCQUFIO01BQXlCLElBQUMsQ0FBQSxjQUFELENBQUEsRUFBekI7S0FBQSxNQUFBO01BQWdELElBQUMsQ0FBQSxjQUFELENBQUEsRUFBaEQ7O1dBQ0EsSUFBQyxDQUFBLFdBQUQsQ0FBYSxTQUFiO0VBbEJvQjs7MEJBc0JyQixjQUFBLEdBQWdCLFNBQUE7SUFDZixNQUFNLENBQUMsZUFBUCxHQUF5QjtJQUN6QixJQUFDLENBQUEsVUFBRCxDQUFBO0lBQ0EsSUFBQyxDQUFBLE1BQUQsQ0FBQTtXQUNBLElBQUMsQ0FBQSxJQUFELEdBQVE7RUFKTzs7MEJBT2hCLHFCQUFBLEdBQXVCLFNBQUE7QUFDdEIsUUFBQTtJQUFBLFlBQUEsR0FBZTtJQUVmLE1BQU0sQ0FBQyxFQUFQLENBQVUsZUFBVixFQUEyQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7UUFDMUIsWUFBWSxDQUFDLENBQWIsR0FBaUIsS0FBSyxDQUFDO2VBQ3ZCLFlBQVksQ0FBQyxnQkFBYixDQUFBO01BRjBCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUEzQjtXQUlBLE1BQU0sQ0FBQyxFQUFQLENBQVUsY0FBVixFQUEwQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7UUFDekIsWUFBWSxDQUFDLENBQWIsR0FBaUIsS0FBSyxDQUFDO2VBQ3ZCLFlBQVksQ0FBQyxnQkFBYixDQUFBO01BRnlCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUExQjtFQVBzQjs7MEJBaUJ2QixhQUFBLEdBQWUsU0FBQTtBQUNkLFFBQUE7SUFBQSxhQUFBLEdBQWdCLElBQUksZUFBSixDQUNmO01BQUEsZUFBQSxFQUFpQixLQUFqQjtNQUF3QixJQUFBLEVBQU0sc0JBQTlCO0tBRGU7SUFHaEIsSUFBQyxDQUFBLElBQUQsR0FBUTtJQUNSLElBQUMsQ0FBQSxNQUFELENBQUE7SUFDQSxJQUFDLENBQUEsT0FBRCxHQUFXO0lBQ1gsSUFBQyxDQUFBLE9BQUQsR0FBVztJQUtYLElBQUcsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUFBLElBQXVCLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBdkIsSUFBOEMsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUE5QyxJQUFxRSxJQUFDLENBQUEsUUFBRCxDQUFVLEdBQVYsRUFBZSxHQUFmLENBQXJFLElBQTRGLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBNUYsSUFBbUgsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUF0SDthQUNDLElBQUMsQ0FBQSxLQUFELEdBQVMsTUFBTSxDQUFDLEtBQVAsR0FBZSxJQUFDLENBQUEsTUFEMUI7S0FBQSxNQUFBO2FBR0MsSUFBQyxDQUFBLGdCQUFELENBQUEsRUFIRDs7RUFaYzs7MEJBbUJmLGdCQUFBLEdBQWtCLFNBQUE7QUFDakIsUUFBQTtJQUFBLElBQUMsQ0FBQSxDQUFELEdBQUssS0FBSyxDQUFDO0lBQ1gsSUFBQyxDQUFBLE9BQUQsR0FBVztJQUVYLElBQUMsQ0FBQSxLQUFELEdBQVMsQ0FBQyxNQUFNLENBQUMsTUFBUCxHQUFnQixHQUFqQixDQUFBLEdBQXdCLElBQUMsQ0FBQTtJQUNsQyxJQUFDLENBQUEsWUFBRCxHQUFnQjtJQUNoQixJQUFDLENBQUEsSUFBRCxHQUFRO1dBRVIsR0FBQSxHQUFNLElBQUksS0FBSixDQUNMO01BQUEsS0FBQSxFQUFPLEdBQVA7TUFBWSxNQUFBLEVBQVEsRUFBcEI7TUFDQSxLQUFBLEVBQU8sSUFBQyxDQUFBLE1BQU0sQ0FBQyxHQURmO01BRUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUZUO01BRWlCLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBTixDQUFhLENBQUMsRUFBZCxDQUZwQjtNQUdBLE9BQUEsRUFBUyxHQUhUO0tBREs7RUFSVzs7MEJBa0JsQixlQUFBLEdBQWlCLFNBQUMsUUFBRCxFQUFxQixVQUFyQixFQUFzQyxhQUF0QztBQUNoQixRQUFBOztNQURpQixXQUFXOzs7TUFBUyxhQUFhOzs7TUFBSSxnQkFBZ0I7O0lBQ3RFLE1BQUEsR0FBUztBQUVUO0FBQUEsU0FBQSxxQ0FBQTs7TUFDQyxZQUFBLEdBQWUsSUFBSSxDQUFDLEtBQUwsQ0FBVyxHQUFYO01BQ2YsT0FBQSxHQUFVLFlBQWEsQ0FBQSxDQUFBO01BQ3ZCLFNBQUEsR0FBWSxZQUFhLENBQUEsQ0FBQTtNQUV6QixJQUFHLE9BQUEsS0FBVyxRQUFkO0FBQ0MsYUFBQSw4Q0FBQTs7VUFDQyxJQUFHLFNBQUEsS0FBYSxJQUFJLENBQUMsS0FBckI7WUFFQyxNQUFBLEdBQVMsSUFBSSxDQUFDLE9BRmY7O0FBREQsU0FERDs7QUFMRDtBQWFBLFdBQU87RUFoQlM7Ozs7R0FySGtCOzs7O0FDSHBDLElBQUEsYUFBQTtFQUFBOzs7O0FBQUMsZ0JBQWlCLE9BQUEsQ0FBUSxlQUFSOztBQUdaLE9BQU8sQ0FBQzs7O0VBQ0EsdUJBQUMsT0FBRDtBQUVaLFFBQUE7SUFGYSxJQUFDLENBQUEsNEJBQUQsVUFBUzs7OztJQUV0QixpQkFBQSxHQUFvQixJQUFJLEtBQUosQ0FDbkI7TUFBQSxLQUFBLEVBQU8sR0FBUDtNQUFZLE1BQUEsRUFBUSxJQUFwQjtNQUNBLENBQUEsRUFBRyxFQURIO01BQ08sQ0FBQSxFQUFHLEVBRFY7TUFFQSxlQUFBLEVBQWlCLElBRmpCO0tBRG1CO0lBS3BCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLFlBQUEsRUFBYyxpQkFBZDtLQUREO0lBR0EsK0NBQU0sSUFBQyxDQUFBLE9BQVA7SUFFQSxpQkFBaUIsQ0FBQyxNQUFsQixHQUEyQixJQUFDLENBQUE7RUFaaEI7O0VBZWIsYUFBQyxDQUFBLE1BQUQsQ0FBUSxjQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsWUFBVCxHQUF3QjtJQUFuQyxDQURMO0dBREQ7OzBCQUlBLFVBQUEsR0FBWSxTQUFDLEtBQUQsRUFBUSxXQUFSO0FBQ1gsUUFBQTs7TUFEbUIsY0FBYzs7SUFDakMsSUFBRyxLQUFLLENBQUMsUUFBTixDQUFBLENBQUg7QUFBQTtLQUFBLE1BQUE7TUFFQyxXQUFBLEdBQWMsSUFBSSxLQUFKLENBQ2I7UUFBQSxLQUFBLEVBQU8sR0FBUDtRQUNBLE1BQUEsRUFBUSxHQURSO1FBRUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxZQUZUO1FBR0EsZUFBQSxFQUFpQixJQUhqQjtPQURhO01BTWQsV0FBVyxDQUFDLENBQVosR0FBZ0IsQ0FBQyxJQUFDLENBQUEsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUF2QixHQUFnQyxDQUFqQyxDQUFBLEdBQXNDO01BRXRELElBQUMsQ0FBQSxlQUFELENBQWlCLEtBQWpCLENBQXVCLENBQUMsTUFBeEIsR0FBaUM7TUFFakMsSUFBQSxHQUFPO0FBQ1A7V0FBQSw2REFBQTs7UUFDQyxhQUFBLEdBQWdCLElBQUMsQ0FBQSxnQkFBRCxDQUFrQixVQUFsQjtRQUNoQixhQUFhLENBQUMsTUFBZCxHQUF1QjtRQUN2QixhQUFhLENBQUMsQ0FBZCxHQUFrQjtxQkFDbEIsSUFBQSxJQUFRLGFBQWEsQ0FBQyxLQUFkLEdBQXNCO0FBSi9CO3FCQWJEOztFQURXOzswQkF3QlosZ0JBQUEsR0FBa0IsU0FBQyxVQUFELEVBQWEsRUFBYixFQUFxQixFQUFyQjtBQUNqQixRQUFBOztNQUQ4QixLQUFLOzs7TUFBRyxLQUFLOztJQUMzQyxXQUFBLEdBQWMsSUFBSSxTQUFKLENBQ2I7TUFBQSxJQUFBLEVBQU0sVUFBVSxDQUFDLEtBQWpCO01BQ0EsQ0FBQSxFQUFHLEVBREg7TUFFQSxPQUFBLEVBQVM7UUFBRSxHQUFBLEVBQUssRUFBUDtRQUFXLE1BQUEsRUFBUSxFQUFBLEdBQUssQ0FBeEI7UUFBMkIsSUFBQSxFQUFNLEVBQWpDO1FBQXFDLEtBQUEsRUFBTyxFQUE1QztPQUZUO01BR0EsUUFBQSxFQUFVLEVBSFY7TUFJQSxVQUFBLEVBQVksR0FKWjtNQUtBLEtBQUEsRUFBTyxPQUxQO01BTUEsZUFBQSxFQUFpQixpQkFOakI7TUFPQSxZQUFBLEVBQWMsQ0FQZDtLQURhO0lBVWQsV0FBVyxDQUFDLEVBQVosQ0FBZSxNQUFNLENBQUMsR0FBdEIsRUFBMkIsVUFBVSxDQUFDLE9BQXRDO0FBQ0EsV0FBTztFQVpVOzswQkFlbEIsZUFBQSxHQUFpQixTQUFDLEtBQUQ7O01BQUMsUUFBUTs7QUFDekIsV0FBTyxJQUFJLFNBQUosQ0FDTjtNQUFBLElBQUEsRUFBTSxLQUFOO01BQ0EsUUFBQSxFQUFVLEVBRFY7TUFFQSxVQUFBLEVBQVksR0FGWjtNQUdBLEtBQUEsRUFBTyxPQUhQO01BSUEsT0FBQSxFQUFTLEdBSlQ7TUFLQSxPQUFBLEVBQ0M7UUFBQSxHQUFBLEVBQUssRUFBTDtPQU5EO0tBRE07RUFEUzs7OztHQTNEa0I7Ozs7QUNIcEMsSUFBQSxhQUFBO0VBQUE7Ozs7QUFBQyxnQkFBaUIsT0FBQSxDQUFRLGVBQVI7O0FBR1osT0FBTyxDQUFDOzs7RUFDQSx1QkFBQyxPQUFEO0FBRVosUUFBQTtJQUZhLElBQUMsQ0FBQSw0QkFBRCxVQUFTOzs7SUFFdEIsYUFBQSxHQUFnQixJQUFJLGVBQUosQ0FDZjtNQUFBLEtBQUEsRUFBTyxHQUFQO01BQ0EsTUFBQSxFQUFRLENBRFI7TUFFQSxjQUFBLEVBQWdCLElBRmhCO01BR0EsZ0JBQUEsRUFBa0IsS0FIbEI7TUFJQSxpQkFBQSxFQUFtQixJQUpuQjtNQUtBLGVBQUEsRUFBaUIsTUFMakI7S0FEZTtJQVFoQixhQUFhLENBQUMsT0FBTyxDQUFDLE1BQXRCLEdBQStCO0lBQy9CLGFBQWEsQ0FBQyxpQkFBZCxHQUFrQztJQUdsQyxDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxRQUFBLEVBQVUsYUFBVjtNQUNBLE1BQUEsRUFBUSxDQURSO0tBREQ7SUFJQSwrQ0FBTSxJQUFDLENBQUEsT0FBUDtJQUVBLGFBQWEsQ0FBQyxNQUFkLEdBQXVCLElBQUMsQ0FBQTtFQXBCWjs7RUF1QmIsYUFBQyxDQUFBLE1BQUQsQ0FBUSxVQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsUUFBVCxHQUFvQjtJQUEvQixDQURMO0dBREQ7O0VBSUEsYUFBQyxDQUFBLE1BQUQsQ0FBUSxRQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsTUFBVCxHQUFrQjtJQUE3QixDQURMO0dBREQ7OzBCQU1BLFNBQUEsR0FBVyxTQUFBO0lBQ1YsS0FBQSxDQUFNLElBQUMsQ0FBQSxJQUFJLENBQUMsUUFBWjtJQUNBLElBQUMsQ0FBQSxTQUFELENBQVcsSUFBQyxDQUFBLElBQVo7SUFDQSxJQUFDLENBQUEsUUFBUSxDQUFDLE1BQVYsR0FBbUIsTUFBTSxDQUFDO1dBQzFCLElBQUMsQ0FBQSxRQUFRLENBQUMsYUFBVixDQUFBO0VBSlU7OzBCQU9YLFNBQUEsR0FBVyxTQUFDLElBQUQsRUFBTyxLQUFQO0FBQ1YsUUFBQTs7TUFEaUIsUUFBUTs7SUFDekIsSUFBRyxJQUFJLENBQUMsSUFBTCxLQUFhLEVBQWhCO01BQXdCLFNBQUEsR0FBWSxXQUFwQztLQUFBLE1BQUE7TUFBb0QsU0FBQSxHQUFZLElBQUksQ0FBQyxLQUFyRTs7SUFHQSxhQUFBLEdBQWdCLElBQUksU0FBSixDQUNmO01BQUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxRQUFRLENBQUMsT0FBbEI7TUFDQSxJQUFBLEVBQU0sS0FBQSxDQUFNLEtBQUEsR0FBUSxDQUFkLENBQWdCLENBQUMsSUFBakIsQ0FBc0IsS0FBdEIsQ0FBQSxHQUErQixDQUFBLEdBQUEsR0FBSSxTQUFKLENBRHJDO01BR0EsUUFBQSxFQUFVLEVBSFY7TUFJQSxVQUFBLEVBQVksR0FKWjtNQUtBLEtBQUEsRUFBTyxPQUxQO01BT0EsT0FBQSxFQUFZLFNBQUEsS0FBYSxVQUFoQixHQUFnQyxHQUFoQyxHQUF5QyxDQVBsRDtNQVFBLE1BQUEsRUFBUSxFQVJSO01BU0EsQ0FBQSxFQUFHLElBQUMsQ0FBQSxRQUFRLENBQUMsTUFUYjtNQVdBLGVBQUEsRUFBaUIsSUFYakI7TUFZQSxNQUFBLEVBQ0M7UUFBQSxLQUFBLEVBQU8sSUFBUDtPQWJEO0tBRGU7SUFnQmhCLGFBQWEsQ0FBQyxLQUFkLENBQW9CLFNBQUE7YUFDbkIsS0FBQSxDQUFTLElBQUMsQ0FBQSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQWYsR0FBb0IsTUFBcEIsR0FBMEIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBeEMsR0FBMEMsTUFBMUMsR0FBZ0QsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBOUQsR0FBZ0UsU0FBaEUsR0FBeUUsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBdkYsR0FBNkYsR0FBN0YsR0FBZ0csSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBdEg7SUFEbUIsQ0FBcEI7SUFJQSxJQUFDLENBQUEsUUFBUSxDQUFDLE1BQVYsSUFBb0I7SUFHcEIsSUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQWQsR0FBdUIsQ0FBMUI7TUFDQyxTQUFBLEdBQVksS0FBQSxHQUFRO0FBQ3BCO0FBQUE7V0FBQSxxQ0FBQTs7cUJBQ0MsSUFBQyxDQUFBLFNBQUQsQ0FBVyxTQUFYLEVBQXNCLFNBQXRCO0FBREQ7cUJBRkQ7O0VBM0JVOzs7O0dBekN3Qjs7OztBQ0pwQyxPQUFPLENBQUMsSUFBUixHQUNDO0VBQUEsS0FBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLE1BQU47SUFDQSxLQUFBLEVBQU8sTUFEUDtHQUREO0VBR0EsbUJBQUEsRUFDQztJQUFBLElBQUEsRUFBTSx5REFBTjtJQUNBLEtBQUEsRUFBTywwREFEUDtHQUpEO0VBTUEscUJBQUEsRUFDQztJQUFBLElBQUEsRUFBTSwyREFBTjtJQUNBLEtBQUEsRUFBTyw0REFEUDtHQVBEO0VBU0Esc0JBQUEsRUFDQztJQUFBLElBQUEsRUFBTSw0REFBTjtJQUNBLEtBQUEsRUFBTyw2REFEUDtHQVZEO0VBWUEsMEJBQUEsRUFDQztJQUFBLElBQUEsRUFBTSxnRUFBTjtJQUNBLEtBQUEsRUFBTyxpRUFEUDtHQWJEO0VBZ0JBLEtBQUEsRUFBTyxvREFoQlA7Ozs7O0FDQUQsSUFBQSw0QkFBQTtFQUFBOzs7QUFBQSxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQWhCLEdBQ0M7RUFBQSxLQUFBLEVBQU8sTUFBQSxDQUFPO0lBQUEsT0FBQSxFQUFTLENBQVQ7R0FBUCxDQUFQO0VBQ0EsSUFBQSxFQUFNLEdBRE47OztBQUtBLGFBQWMsT0FBQSxDQUFRLFlBQVI7O0FBR1Q7Ozs7Ozs7OztHQUF5Qjs7QUFDekIsT0FBTyxDQUFDOzs7Ozs7Ozs7R0FBZ0I7O0FBTzlCOzs7OztBQUtBOzs7Ozs7QUFNQTs7Ozs7Ozs7O0FDNUJBLE9BQU8sQ0FBQyxJQUFSLEdBQ0M7RUFBQSxLQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0sTUFBTjtJQUNBLEtBQUEsRUFBTyxNQURQO0dBREQ7RUFNQSxtQkFBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLHlEQUFOO0lBQ0EsS0FBQSxFQUFPLDBEQURQO0dBUEQ7RUFTQSxxQkFBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLDJEQUFOO0lBQ0EsS0FBQSxFQUFPLDREQURQO0dBVkQ7RUFZQSxzQkFBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLDREQUFOO0lBQ0EsS0FBQSxFQUFPLDZEQURQO0dBYkQ7RUFlQSwwQkFBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLGdFQUFOO0lBQ0EsS0FBQSxFQUFPLGlFQURQO0dBaEJEO0VBcUJBLEtBQUEsRUFBTyxvREFyQlA7RUFzQkEsR0FBQSxFQUFLLHdDQXRCTDs7Ozs7QUNERCxJQUFBLGlCQUFBO0VBQUE7Ozs7QUFBQSxpQkFBQSxHQUFvQjs7QUFFZCxPQUFPLENBQUM7OztFQUNBLHVCQUFDLE9BQUQ7QUFFWixRQUFBO0lBRmEsSUFBQyxDQUFBLDRCQUFELFVBQVM7Ozs7Ozs7SUFFdEIsZUFBQSxHQUFrQixJQUFJLEtBQUosQ0FBVTtNQUFFLE9BQUEsRUFBUyxDQUFYO01BQWMsSUFBQSxFQUFNLENBQXBCO0tBQVY7SUFDbEIsZUFBZSxDQUFDLE1BQWhCLEdBQ0M7TUFBQSxRQUFBLEVBQVU7UUFBRSxLQUFBLEVBQU8sQ0FBVDtPQUFWO01BQ0EsTUFBQSxFQUFRO1FBQUUsS0FBQSxFQUFPLENBQVQ7T0FEUjs7SUFFRCxlQUFlLENBQUMsV0FBaEIsQ0FBNEIsTUFBNUI7SUFFQSxDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxJQUFBLEVBQU0sU0FBTjtNQUNBLGVBQUEsRUFBaUIsSUFEakI7TUFFQSxZQUFBLEVBQWMsRUFGZDtNQUlBLFVBQUEsRUFBWSxlQUpaO01BS0EsSUFBQSxFQUFNLElBTE47TUFPQSxVQUFBLEVBQVksSUFQWjtNQVFBLGFBQUEsRUFBZSxJQVJmO01BU0EsV0FBQSxFQUFhLElBVGI7TUFXQSxVQUFBLEVBQVksSUFYWjtNQVlBLFdBQUEsRUFBYSxJQVpiO01BaUJBLFVBQUEsRUFBWSxJQWpCWjtNQW9CQSxRQUFBLEVBQVUsSUFwQlY7TUFxQkEsYUFBQSxFQUFlLElBckJmO01Bc0JBLFdBQUEsRUFBYSxJQXRCYjtNQXdCQSxTQUFBLEVBQVcsaUJBeEJYO01BeUJBLGVBQUEsRUFBaUIsS0F6QmpCO01BMEJBLGVBQUEsRUFBaUIsTUExQmpCO01BMkJBLGFBQUEsRUFBZSxNQTNCZjtNQThCQSxNQUFBLEVBQVEsSUE5QlI7TUErQkEsUUFBQSxFQUFVLElBL0JWO01BZ0NBLFNBQUEsRUFBVyxJQWhDWDtNQW1DQSxVQUFBLEVBQVksTUFuQ1o7TUFvQ0EsUUFBQSxFQUFVLEVBcENWO0tBREQ7SUF5Q0EsK0NBQU0sSUFBQyxDQUFBLE9BQVA7SUFFQSxNQUFNLENBQUMsOEJBQVAsQ0FBc0MsSUFBdEM7SUFDQSxJQUFDLENBQUEsVUFBRCxDQUFBO0lBRUEsSUFBQyxDQUFBLE1BQUQsR0FDQztNQUFBLFFBQUEsRUFBVTtRQUFFLEtBQUEsRUFBTyxDQUFUO09BQVY7TUFDQSxNQUFBLEVBQVE7UUFBRSxLQUFBLEVBQU8sQ0FBVDtPQURSOztFQXZEVzs7RUE0RGIsYUFBQyxDQUFBLE1BQUQsQ0FBUSxNQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDtNQUNKLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxHQUFnQjtNQUNoQixJQUFDLENBQUEsS0FBRCxHQUFTLElBQUMsQ0FBQSxJQUFJLENBQUM7TUFDZixJQUFDLENBQUEsTUFBRCxHQUFVLElBQUMsQ0FBQSxJQUFJLENBQUM7YUFDaEIsSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFOLEdBQWU7SUFKWCxDQURMO0dBREQ7O0VBUUEsYUFBQyxDQUFBLE1BQUQsQ0FBUSxZQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsVUFBVCxHQUFzQjtJQUFqQyxDQURMO0dBREQ7O0VBTUEsYUFBQyxDQUFBLE1BQUQsQ0FBUSxRQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0dBREQ7O0VBR0EsYUFBQyxDQUFBLE1BQUQsQ0FBUSxXQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0dBREQ7O0VBR0EsYUFBQyxDQUFBLE1BQUQsQ0FBUSxTQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0dBREQ7O0VBS0EsYUFBQyxDQUFBLE1BQUQsQ0FBUSxZQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsVUFBVCxHQUFzQjtJQUFqQyxDQURMO0dBREQ7O0VBSUEsYUFBQyxDQUFBLE1BQUQsQ0FBUSxlQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsYUFBVCxHQUF5QjtJQUFwQyxDQURMO0dBREQ7O0VBSUEsYUFBQyxDQUFBLE1BQUQsQ0FBUSxhQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsV0FBVCxHQUF1QjtJQUFsQyxDQURMO0dBREQ7O0VBTUEsYUFBQyxDQUFBLE1BQUQsQ0FBUSxZQUFSLEVB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O0dBekN3Qjs7OztBQ0RwQyxPQUFPLENBQUMsS0FBUixHQUFnQjs7QUFFaEIsT0FBTyxDQUFDLFVBQVIsR0FBcUIsU0FBQTtTQUNwQixLQUFBLENBQU0sdUJBQU47QUFEb0I7O0FBR3JCLE9BQU8sQ0FBQyxPQUFSLEdBQWtCLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXG5cbmNsYXNzIGV4cG9ydHMuQnV0dG9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdGd1YXJkID0gbmV3IExheWVyIHsgc2l6ZTogMTAsIGJhY2tncm91bmRDb2xvcjogXCJudWxsXCIgfVxuXHRcdFxuXHRcdGd1YXJkLnN0YXRlcyA9XG5cdFx0XHRcInByZXNzZWRcIjogeyBvcGFjaXR5OiAwIH1cblx0XHRcdFwibm9ybWFsXCI6IHsgb3BhY2l0eTogMCB9XG5cdFx0XG5cdFx0Z3VhcmQub24gRXZlbnRzLlN0YXRlU3dpdGNoRW5kLCAoZnJvbSwgdG8pIC0+XG5cdFx0XHRpZiBmcm9tICE9IHRvIHRoZW4gQHBhcmVudC5hbmltYXRlKHRvKVxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGhhbmRsZXI6IG51bGxcblx0XHRcdGd1YXJkOiBudWxsXG5cdFx0XHRzY2FsZVRvOiAwLjlcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAc3RhdGVzID1cblx0XHRcdFwicHJlc3NlZFwiOiB7IHNjYWxlOiBAc2NhbGVUbyB9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IHNjYWxlOiAxLjAgfVxuXHRcdFxuXHRcdGd1YXJkLnBhcmVudCA9IEBcblx0XHRAZ3VhcmQgPSBndWFyZFxuXHRcdFxuXHRcdEAub25Ub3VjaFN0YXJ0IEBIb3ZlclxuXHRcdEAub25Ub3VjaEVuZCBASG92ZXJPZmZcblx0XHRALm9uU3dpcGVTdGFydCBASG92ZXJPZmZcblx0XHRALm9uRHJhZ1N0YXJ0IEBIb3Zlck9mZlxuXHRcblx0SG92ZXI6ID0+IEBndWFyZC5zdGF0ZVN3aXRjaChcInByZXNzZWRcIilcblx0SG92ZXJPZmY6ID0+IEBndWFyZC5zdGF0ZVN3aXRjaChcIm5vcm1hbFwiKVxuXG5cblxuXHRAZGVmaW5lICdndWFyZCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ndWFyZFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ndWFyZCA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdzY2FsZVRvJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNjYWxlVG9cblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2NhbGVUbyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdoYW5kbGVyJyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9uKEV2ZW50cy5UYXAsIHZhbHVlKVxuXG4iLCJcblxue1NlY3Rpb25WaWV3fSA9IHJlcXVpcmUgXCJTZWN0aW9uVmlld1wiXG57VGV4dCwgQnV0dG9ufSA9IHJlcXVpcmUgXCJQQ0J1dHRvbnNcIlxuXG5jbGFzcyBleHBvcnRzLkNvbmZpZ1ZpZXcgZXh0ZW5kcyBTZWN0aW9uVmlld1xuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRoZWlnaHQ6IDEwMFxuXHRcdFx0eTogQWxpZ24uYm90dG9tKC04KVxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHQjIE92ZXJyaWRlXG5cdGFkZFNlY3Rpb246IChhY3Rpb25BcnJheSA9IFtdKSA9PlxuXHRcdGlmICFVdGlscy5pc01vYmlsZSgpXG5cdFx0XHRzZWN0aW9uVmlldyA9IG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IEBcblx0XHRcdFx0d2lkdGg6IDM2MCwgaGVpZ2h0OiAxMDAsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0XHR4OiAzMiwgeTogQWxpZ24uYm90dG9tKClcblxuXHRcdFx0QGFkZFNlY3Rpb25UaXRsZShzZWN0aW9uVmlldywgXCJQcmV2aWV3IFNldHRpbmdzXCIpXG5cdFx0XHRzZWN0aW9uVmlldy5zdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcdHNlY3Rpb25WaWV3Lm9uVGFwIC0+IDtcblx0XHRcdHNlY3Rpb25WaWV3LnNob3dIaW50ID0gLT4gO1xuXG5cdFx0XHRzdW1YID0gMFxuXHRcdFx0Zm9yIGFjdGlvbkl0ZW0sIGkgaW4gYWN0aW9uQXJyYXlcblx0XHRcdFx0c2VjdGlvbkJ1dHRvbiA9IEBhZGRBY3Rpb25CdXR0b24oYWN0aW9uSXRlbSwgaSlcblx0XHRcdFx0c2VjdGlvbkJ1dHRvbi5wYXJlbnQgPSBzZWN0aW9uVmlld1xuXHRcdFx0XHRzZWN0aW9uQnV0dG9uLnggPSBzdW1YXG5cdFx0XHRcdHN1bVggKz0gc2VjdGlvbkJ1dHRvbi53aWR0aCArIDggKyA0XG5cdFx0XHRcblx0XHRcdEB3aWR0aCA9IE1hdGgubWF4KEB3aWR0aCwgc3VtWClcblx0XG5cblxuXHQjICMgT3ZlcnJpZGVcblx0YWRkQWN0aW9uQnV0dG9uOiAoYWN0aW9uSXRlbSwgaW5kZXgpID0+XG5cdFx0YnV0dG9uTGF5ZXIgPSBuZXcgQnV0dG9uXG5cdFx0XHR0ZXh0OiBhY3Rpb25JdGVtLnRpdGxlXG5cdFx0XHR5OiA0MlxuXHRcdFx0c2VsZWN0ZWQ6IGlmIGluZGV4IGlzIDAgdGhlbiB0cnVlIGVsc2UgZmFsc2Vcblx0XHRcdGN1c3RvbTpcblx0XHRcdFx0YWN0aW9uSXRlbTogYWN0aW9uSXRlbVxuXHRcdFxuXHRcdGNvbXBsZXhIYW5kbGVyID0gKCkgLT5cblx0XHRcdEBjdXN0b20uYWN0aW9uSXRlbS5oYW5kbGVyKEBjdXN0b20uYWN0aW9uSXRlbS5kYXRhLCBAKVxuXG5cdFx0YnV0dG9uTGF5ZXIub24oRXZlbnRzLlRhcCwgY29tcGxleEhhbmRsZXIpXG5cdFx0cmV0dXJuIGJ1dHRvbkxheWVyIiwiXG5cbnBhbmVsTmFtZSA9IFwiLkNvbnRyb2xQYW5lbFwiXG5cblxuIyBTdGFja1xuXG5nZXRTdGFjayA9IChhbGlnbm1lbnQgPSBcInZlcnRpY2FsXCIsIHBhcmVudCA9IG51bGwsIHNOYW1lID0gXCJzb21lIHN0YWNrXCIsIHNXaWR0aCA9IDEwMCwgc0hlaWdodCA9IDEwMCwgcGFkZGluZyA9IDAsIG9mZnNldCA9IDIwKSAtPlxuXHRzdGFja1ZpZXcgPSBuZXcgTGF5ZXJcblx0XHRwYXJlbnQ6IHBhcmVudFxuXHRcdHdpZHRoOiBzV2lkdGhcblx0XHRoZWlnaHQ6IHNIZWlnaHRcblx0XHRuYW1lOiBcIiN7c05hbWV9XCJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwibnVsbFwiXG5cdFx0IyBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsMCwwLC4yXCJcblx0XHRjdXN0b206XG5cdFx0XHRhbGlnbm1lbnQ6IGFsaWdubWVudFxuXHRcdFx0cGFkZGluZzogcGFkZGluZ1xuXHRcdFx0b2Zmc2V0OiBvZmZzZXRcblx0XG5cdHN0YWNrVmlldy5vbiBcImNoYW5nZTpjaGlsZHJlblwiLCAtPlxuXHRcdGlmIEBjdXN0b20uYWxpZ25tZW50ID09IFwidmVydGljYWxcIiB0aGVuIGtleSA9IHsgZDogXCJ5XCIsIHM6IFwiaGVpZ2h0XCIgfVxuXHRcdGVsc2UgaWYgQGN1c3RvbS5hbGlnbm1lbnQgPT0gXCJob3Jpem9udGFsXCIgdGhlbiBrZXkgPSB7IGQ6IFwieFwiLCBzOiBcIndpZHRoXCIgfVxuXHRcdGVsc2UgaWYgQGN1c3RvbS5hbGlnbm1lbnQgPT0gXCJob3Jpem9udGFsLXJldmVyc2VcIiB0aGVuIGtleSA9IHsgZDogXCJ4XCIsIHM6IFwid2lkdGhcIiB9XG5cdFx0XG5cdFx0c3VtUG9zID0gQGN1c3RvbS5vZmZzZXRcblx0XHRmb3IgaXRlbSwgaSBpbiBAY2hpbGRyZW5cblxuXHRcdFx0aWYgQGN1c3RvbS5hbGlnbm1lbnQgPT0gXCJob3Jpem9udGFsXCIgb3IgQGN1c3RvbS5hbGlnbm1lbnQgPT0gXCJ2ZXJ0aWNhbFwiIHRoZW4gaXRlbVtrZXkuZF0gPSBzdW1Qb3Ncblx0XHRcdGVsc2UgaWYgQGN1c3RvbS5hbGlnbm1lbnQgPT0gXCJob3Jpem9udGFsLXJldmVyc2VcIiB0aGVuIGl0ZW1ba2V5LmRdID0gQHdpZHRoIC0gc3VtUG9zIC0gaXRlbVtrZXkuc11cblxuXHRcdFx0c3VtUG9zICs9IGl0ZW1ba2V5LnNdICsgQGN1c3RvbS5wYWRkaW5nXG5cblx0XG5cdHJldHVybiBzdGFja1ZpZXdcblxuXG5cblxuXG5cblxuY3JlYXRlQ29udHJvbFBhbmVsID0gKCkgLT5cblx0cGFuZWxzID0gbmV3IExheWVyXG5cdFx0bmFtZTogcGFuZWxOYW1lXG5cdFx0d2lkdGg6IENhbnZhcy53aWR0aFxuXHRcdGhlaWdodDogQ2FudmFzLmhlaWdodFxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJudWxsXCJcblx0XG5cdGxlZnRQYW5lbCA9IGdldFN0YWNrKFwidmVydGljYWxcIiwgcGFuZWxzLCBcImxlZnQgcGFuZWxcIiwgMzIwLCBDYW52YXMuaGVpZ2h0LCAwLCAyMClcblx0cmlnaHRQYW5lbCA9IGdldFN0YWNrKFwidmVydGljYWxcIiwgcGFuZWxzLCBcInJpZ2h0IHBhbmVsXCIsIDMyMCwgQ2FudmFzLmhlaWdodCwgMCwgMjApXG5cdHJpZ2h0UGFuZWwueCA9IEFsaWduLnJpZ2h0KClcblxuXG5yb3dFeGlzdHMgPSAobGF5ZXIsIHJvdykgLT5cblx0Zm9yIGl0ZW0gaW4gbGF5ZXIuY2hpbGRyZW5cblx0XHRpZiBpdGVtLm5hbWUgPT0gcm93IHRoZW4gcmV0dXJuIGl0ZW1cblx0cmV0dXJuIG51bGxcblxuZmluZFN0YWNrID0gKHBhbmVsLCByb3cgPSBcIjFcIikgLT5cblx0aWYgcGFuZWwubmFtZSA9PSBcInJpZ2h0IHBhbmVsXCIgdGhlbiBzdGFja0FsaWdubWVudCA9IFwiaG9yaXpvbnRhbC1yZXZlcnNlXCJcblx0ZWxzZSBzdGFja0FsaWdubWVudCA9IFwiaG9yaXpvbnRhbFwiXG5cblx0c2VsZWN0ZWRSb3cgPSByb3dFeGlzdHMocGFuZWwsIHJvdylcblx0aWYgc2VsZWN0ZWRSb3cgIT0gbnVsbCB0aGVuIHJldHVybiBzZWxlY3RlZFJvd1xuXHRlbHNlIHNlbGVjdGVkUm93ID0gZ2V0U3RhY2soc3RhY2tBbGlnbm1lbnQsIHBhbmVsLCByb3csIHBhbmVsLndpZHRoLCA0MCwgNilcblx0XG5cdHJldHVybiBzZWxlY3RlZFJvd1xuXG5cblxuXG5cblxuXG5cblxuXG5leHBvcnRzLmJyZWFrZXIgPSAoc2lkZSA9IFwibGVmdFwiKSAtPlxuXHRyZXR1cm4gdGhpcy5oZWFkZXIoXCJcIiwgc2lkZSlcblxuXG5leHBvcnRzLmhlYWRlciA9IChsYWJlbCA9IFwiSGVhZGVyXCIsIHNpZGUgPSBcImxlZnRcIikgLT5cblx0aWYgTGF5ZXIuc2VsZWN0KHBhbmVsTmFtZSkgPT0gdW5kZWZpbmVkIHRoZW4gY3JlYXRlQ29udHJvbFBhbmVsKClcblx0aWYgZ2V0UGFuZWxGcm9tU2lkZShzaWRlKSA9PSBudWxsIHRoZW4gcmV0dXJuIG51bGxcblx0XG5cdGhlYWRlclZpZXcgPSBuZXcgVGV4dExheWVyXG5cdFx0dGV4dDogbGFiZWxcblx0XHRmb250U2l6ZTogMTVcblx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0IyB0ZXh0QWxpZ246IHNpZGVcblx0XHRvcGFjaXR5OiAwLjZcblx0XHRwYWRkaW5nOlxuXHRcdFx0dG9wOiAxMlxuXHRcdFx0bGVmdDogaWYgc2lkZSA9PSBcImxlZnRcIiB0aGVuIDMgZWxzZSAwXG5cdFx0XHRyaWdodDogaWYgc2lkZSA9PSBcInJpZ2h0XCIgdGhlbiAzIGVsc2UgMFxuXHRcblx0aGVhZGVyVmlldy5wYXJlbnQgPSBmaW5kU3RhY2soZ2V0UGFuZWxGcm9tU2lkZShzaWRlKSwgVXRpbHMucmFuZG9tTnVtYmVyKCkpXG5cdHJldHVybiBoZWFkZXJWaWV3XG5cbmdldFBhbmVsRnJvbVNpZGUgPSAoc2lkZSkgLT5cblx0aWYgc2lkZSA9PSBcImxlZnRcIiB0aGVuIHJldHVybiBMYXllci5zZWxlY3QocGFuZWxOYW1lKS5jaGlsZHJlblswXVxuXHRlbHNlIGlmIHNpZGUgPT0gXCJyaWdodFwiIHRoZW4gcmV0dXJuIExheWVyLnNlbGVjdChwYW5lbE5hbWUpLmNoaWxkcmVuWzFdXG5cdHJldHVybiBudWxsXG5cbmV4cG9ydHMuYnV0dG9uID0gKGxhYmVsID0gXCJCdXR0b25cIiwgaGFuZGxlciA9IG51bGwsIHNpZGUgPSBcImxlZnRcIiwgcm93ID0gXCIxXCIsIHBWID0gNiwgcEggPSA4KSAtPlxuXHRpZiBMYXllci5zZWxlY3QocGFuZWxOYW1lKSA9PSB1bmRlZmluZWQgdGhlbiBjcmVhdGVDb250cm9sUGFuZWwoKVxuXHRpZiBnZXRQYW5lbEZyb21TaWRlKHNpZGUpID09IG51bGwgdGhlbiByZXR1cm4gbnVsbFxuXHRcblx0YnV0dG9uVmlldyA9IG5ldyBUZXh0TGF5ZXJcblx0XHR0ZXh0OiBsYWJlbFxuXHRcdHBhZGRpbmc6IHsgdG9wOiBwViwgYm90dG9tOiBwViArIDIsIGxlZnQ6IHBILCByaWdodDogcEggfVxuXHRcdGZvbnRTaXplOiAxNVxuXHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwLjUpXCJcblx0XHRib3JkZXJSYWRpdXM6IDhcblx0XG5cdGJ1dHRvblZpZXcuc3RhdGVzID1cblx0XHRcInNob3duXCI6IHsgYmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMC45KVwiIH1cblx0XHRcImhpZGRlblwiOiB7IGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuNClcIiB9XG5cdGJ1dHRvblZpZXcuc3RhdGVTd2l0Y2goXCJoaWRkZW5cIilcblx0XG5cdGJ1dHRvblZpZXcucGFyZW50ID0gZmluZFN0YWNrKGdldFBhbmVsRnJvbVNpZGUoc2lkZSksIHJvdylcblx0YnV0dG9uVmlldy5vbihFdmVudHMuVGFwLCBoYW5kbGVyKVxuXHRcblx0cmV0dXJuIGJ1dHRvblZpZXdcblxuIiwiXG5cbntTY2FsZVZpZXd9ID0gcmVxdWlyZSBcIlNjYWxlVmlld1wiXG5cblxuY2xhc3MgZXhwb3J0cy5EZXZpY2VWaWV3IGV4dGVuZHMgU2NhbGVWaWV3XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0Ym9yZGVyVmlldzogbnVsbFxuXHRcdFx0c2hvd0RldmljZTogdHJ1ZVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAYm9yZGVyVmlldyA9IG5ldyBMYXllclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIjAwMFwiXG5cdFx0XHRib3JkZXJSYWRpdXM6IEBib3JkZXJSYWRpdXMgKyAxNlxuXHRcdFx0b3BhY2l0eTogMVxuXG5cdFx0QGJvcmRlclZpZXcuc2VuZFRvQmFjaygpXG5cblx0XHRAaW5pdEJvcmRlclZpZXdDc3MoKVxuXHRcdEB1cGRhdGVCb3JkZXJWaWV3KClcblxuXHRcdEBvbiBcImNoYW5nZTpzaXplXCIsIC0+XG5cdFx0XHRAdXBkYXRlQm9yZGVyVmlldygpXG5cdFx0XG5cdFx0QG9uIFwiY2hhbmdlOnNjYWxlXCIsIC0+XG5cdFx0XHRAdXBkYXRlQm9yZGVyVmlldygpXG5cdFx0XG5cdFx0QG9uIFwiY2hhbmdlOnhcIiwgLT5cblx0XHRcdEB1cGRhdGVCb3JkZXJWaWV3KClcblx0XHRcblx0XHRAb24gXCJjaGFuZ2U6eVwiLCAtPlxuXHRcdFx0QHVwZGF0ZUJvcmRlclZpZXcoKVxuXHRcdFxuXG5cdEBkZWZpbmUgJ2JvcmRlclZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYm9yZGVyVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ib3JkZXJWaWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3Nob3dEZXZpY2UnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2hvd0RldmljZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zaG93RGV2aWNlID0gdmFsdWVcblx0XG5cdFxuXG5cblx0c2hvd0JvcmRlclZpZXc6ICgpID0+XG5cdFx0QGJvcmRlclZpZXcub3BhY2l0eSA9IDFcblx0XG5cdGhpZGVCb3JkZXJWaWV3OiAoKSA9PlxuXHRcdEBib3JkZXJWaWV3Lm9wYWNpdHkgPSAwXG5cblxuXHR1cGRhdGVCb3JkZXJWaWV3OiAoKSA9PlxuXHRcdGRlbHRhRyA9IDE2XG5cblx0XHRAYm9yZGVyVmlldy53aWR0aCA9IEB3aWR0aCArIGRlbHRhRyAqIDJcblx0XHRAYm9yZGVyVmlldy5oZWlnaHQgPSBAaGVpZ2h0ICsgZGVsdGFHICogMlxuXHRcdEBib3JkZXJWaWV3LnggPSBBbGlnbi5jZW50ZXIoKVxuXHRcdEBib3JkZXJWaWV3LnkgPSBBbGlnbi5jZW50ZXIoKVxuXHRcdEBib3JkZXJWaWV3LnNjYWxlID0gQHNjYWxlXG5cdFx0XG5cdFxuXHRpbml0Qm9yZGVyVmlld0NzczogKCkgPT5cblx0XHRAYm9yZGVyVmlldy5jbGFzc0xpc3QuYWRkKFwiaXBob25lLXRpbGxsdXItdlwiKVxuIFxuXHRcdGNzcyA9IFwiXCJcIlxuXHRcdC5pcGhvbmUtdGlsbGx1ci12IHtcblx0XHRcdGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcblx0XHRcdDE2MC43NGRlZyxcblx0XHRcdHJnYmEoMzYsIDM2LCAzNiwgMC4zKSAyNC4zOSUsXG5cdFx0XHRyZ2JhKDI4LCAyOCwgMjgsIDAuMykgMjkuNDclLFxuXHRcdFx0cmdiYSgxMCwgMTAsIDEwLCAwLjMpIDk5Ljg1JVxuXHRcdFx0KSxcblx0XHRcdGxpbmVhci1ncmFkaWVudChcblx0XHRcdDE4MGRlZyxcblx0XHRcdHJnYmEoMiwgMiwgMiwgMC42KSAtMC4yMSUsXG5cdFx0XHRyZ2JhKDIxLCAyMSwgMjEsIDAuNikgNi41MiUsXG5cdFx0XHRyZ2JhKDYsIDYsIDYsIDAuNikgOTkuNzklXG5cdFx0XHQpLFxuXHRcdFx0IzVhNWE1YTtcblx0XHRib3gtc2hhZG93OiA4cHggMTRweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4yNSksXG5cdFx0XHRpbnNldCAwcHggLTRweCAxNnB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSxcblx0XHRcdGluc2V0IDRweCAwcHggNHB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSxcblx0XHRcdGluc2V0IC00cHggMHB4IDRweCByZ2JhKDAsIDAsIDAsIDAuNyk7XG5cblx0XHR9XG5cdFx0XCJcIlwiXG5cdFx0XG5cdFx0VXRpbHMuaW5zZXJ0Q1NTKGNzcykiLCJcbmNsYXNzIGV4cG9ydHMuRGV2aWNlX0NsYXNzIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiMDAwXCJcblx0XHRcdHZpZXc6IG51bGxcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHQjIHVwZGF0ZSBmcm9tIHBhcmVudFxuXHRcdEBzdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBzY2FsZTogMSB9XG5cdFx0XHRcImZpbGxcIjogeyBzY2FsZTogMSB9XG5cblx0XHRAaW5pdEJvcmRlclZpZXdDc3MoKVxuXHRcdEBzZW5kVG9CYWNrKClcblx0XG5cblxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnZpZXcgPSB2YWx1ZVxuXHRcdFx0QG9wdGlvbnMud2lkdGggPSB2YWx1ZS53aWR0aCArIDE2ICogMlxuXHRcdFx0QG9wdGlvbnMuaGVpZ2h0ID0gdmFsdWUuaGVpZ2h0ICsgMTYgKiAyXG5cdFx0XHRAYm9yZGVyUmFkaXVzID0gdmFsdWUuYm9yZGVyUmFkaXVzICsgMTZcblxuXHRzdGF0ZVN3aXRjaFRvTm9ybWFsOiAoKSA9PlxuXHRcdEBhbmltYXRlKHNjYWxlOiBAc3RhdGVzW1wibm9ybWFsXCJdLnNjYWxlLCBvcHRpb25zOiB7IGN1cnZlOiBCZXppZXIubGluZWFyLCB0aW1lOiAwIH0pXG5cdFxuXHRzdGF0ZVN3aXRjaFRvRmlsbDogKCkgPT5cblx0XHRAYW5pbWF0ZShzY2FsZTogQHN0YXRlc1tcImZpbGxcIl0uc2NhbGUsIG9wdGlvbnM6IHsgY3VydmU6IEJlemllci5saW5lYXIsIHRpbWU6IDAgfSlcblxuXHRhbmltYXRlU3RhdGVUb05vcm1hbDogKCkgPT5cblx0XHRAYW5pbWF0ZShzY2FsZTogQHN0YXRlc1tcIm5vcm1hbFwiXS5zY2FsZSwgb3B0aW9uczogeyBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUgfSlcblx0XG5cdGFuaW1hdGVTdGF0ZVRvRmlsbDogKCkgPT5cblx0XHRAYW5pbWF0ZShzY2FsZTogQHN0YXRlc1tcImZpbGxcIl0uc2NhbGUsIG9wdGlvbnM6IHsgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41IH0pXG5cblxuXG5cdGluaXRCb3JkZXJWaWV3Q3NzOiAoKSA9PlxuXHRcdEBjbGFzc0xpc3QuYWRkKFwiaXBob25lLXRpbGxsdXItdlwiKVxuIFxuXHRcdGNzcyA9IFwiXCJcIlxuXHRcdC5pcGhvbmUtdGlsbGx1ci12IHtcblx0XHRcdGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcblx0XHRcdDE2MC43NGRlZyxcblx0XHRcdHJnYmEoMzYsIDM2LCAzNiwgMC4zKSAyNC4zOSUsXG5cdFx0XHRyZ2JhKDI4LCAyOCwgMjgsIDAuMykgMjkuNDclLFxuXHRcdFx0cmdiYSgxMCwgMTAsIDEwLCAwLjMpIDk5Ljg1JVxuXHRcdFx0KSxcblx0XHRcdGxpbmVhci1ncmFkaWVudChcblx0XHRcdDE4MGRlZyxcblx0XHRcdHJnYmEoMiwgMiwgMiwgMC42KSAtMC4yMSUsXG5cdFx0XHRyZ2JhKDIxLCAyMSwgMjEsIDAuNikgNi41MiUsXG5cdFx0XHRyZ2JhKDYsIDYsIDYsIDAuNikgOTkuNzklXG5cdFx0XHQpLFxuXHRcdFx0IzVhNWE1YTtcblx0XHRib3gtc2hhZG93OiA4cHggMTRweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4yNSksXG5cdFx0XHRpbnNldCAwcHggLTRweCAxNnB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSxcblx0XHRcdGluc2V0IDRweCAwcHggNHB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSxcblx0XHRcdGluc2V0IC00cHggMHB4IDRweCByZ2JhKDAsIDAsIDAsIDAuNyk7XG5cblx0XHR9XG5cdFx0XCJcIlwiXG5cdFx0XG5cdFx0VXRpbHMuaW5zZXJ0Q1NTKGNzcykiLCJcblxueyBEZXZpY2VfQ2xhc3MgfSA9IHJlcXVpcmUgXCJEZXZpY2VfQ2xhc3NcIlxuXG5jbGFzcyBleHBvcnRzLkRldmljZV9Jbml0IGV4dGVuZHMgRGV2aWNlX0NsYXNzXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0dmlzaWJsZTogQHZpZXcuZGV2aWNlQ29uZmlnLmVuYWJsZWRcblx0XHRcdGZvcmNlQW5kcm9pZEJhcjogQHZpZXcuZGV2aWNlQ29uZmlnLmZvcmNlX0FuZHJvaWRCYXJcblx0XHRcdHN0YXR1c0JhcjogQHZpZXcuZGV2aWNlQ29uZmlnLnN0YXR1c0Jhcl90aGVtZVxuXHRcdFx0aG9tZUJhcjogQHZpZXcuZGV2aWNlQ29uZmlnLmhvbWVCYXJfdGhlbWVcblx0XHRcdFxuXHRcdFx0cHJvdG90eXBlQ3JlYXRpb25ZZWFyOiBAdmlldy50aW1lVmFsdWVcblxuXHRcdFx0IyBnZXR0ZXJzXG5cdFx0XHRzdGF0dXNCYXJWaWV3OiBudWxsXG5cdFx0XHRob21lQmFyVmlldzogbnVsbFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAY3JlYXRlQmFycygpXG5cblxuXG5cdCMgZGVwcmVjYXRlZFxuXHRAZGVmaW5lICd2aXNpYmxlJyxcblx0XHRnZXQ6IC0+IGlmIEBvcHRpb25zLnZpc2libGUgdGhlbiByZXR1cm4gMSBlbHNlIHJldHVybiAwXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnZpc2libGUgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnZm9yY2VBbmRyb2lkQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZEJhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRCYXIgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgJ3N0YXR1c0JhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zdGF0dXNCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc3RhdHVzQmFyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2hvbWVCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaG9tZUJhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ob21lQmFyID0gdmFsdWVcblxuXHRAZGVmaW5lICdwcm90b3R5cGVDcmVhdGlvblllYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnByb3RvdHlwZUNyZWF0aW9uWWVhciA9IHZhbHVlXG5cblxuXG5cblxuXHRAZGVmaW5lICdzdGF0dXNCYXJWaWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnN0YXR1c0JhclZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc3RhdHVzQmFyVmlldyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdob21lQmFyVmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ob21lQmFyVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ob21lQmFyVmlldyA9IHZhbHVlXG5cblxuXG5cdHZpZXdTaXplOiAodywgaCkgPT4gcmV0dXJuIEB2aWV3LndpZHRoID09IHcgYW5kIEB2aWV3LmhlaWdodCA9PSBoXG5cblx0IyBDcmVhdGUgQmFyc1xuXG5cdGNyZWF0ZUJhcnM6ICgpID0+XG5cdFx0QHN0YXR1c0JhclZpZXcgPSBuZXcgTGF5ZXIgXG5cdFx0XHRwYXJlbnQ6IEB2aWV3LCB3aWR0aDogQHZpZXcud2lkdGgsIHk6IEFsaWduLnRvcCwgbmFtZTogXCIuc3RhdHVzIGJhclwiXG5cdFx0XHRvcGFjaXR5OiBAdmlzaWJsZSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0aWYgQGZvcmNlQW5kcm9pZEJhclxuXHRcdFx0QGNyZWF0ZUNsYXNzaWNBbmRyb2lkU3RhdHVzQmFyKEBzdGF0dXNCYXJWaWV3KSBcblxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM3NSwgODEyKSBvciBAdmlld1NpemUoMzkwLCA4NDQpIG9yIEB2aWV3U2l6ZSg0MTQsIDg5Nikgb3IgQHZpZXdTaXplKDQyOCwgOTI2KSBvciBAdmlld1NpemUoMzYwLCA3ODIpXG5cdFx0XHRAY3JlYXRlTm90Y2hTdGF0dXNCYXIoQHN0YXR1c0JhclZpZXcpXG5cdFx0XHRAY3JlYXRlSG9tZUluZGljYXRvciBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBAdmlldywgd2lkdGg6IEB2aWV3LndpZHRoLCBoZWlnaHQ6IDM0LCB5OiBBbGlnbi5ib3R0b20sIG5hbWU6IFwiLmhvbWUgYmFyXCIsIG9wYWNpdHk6IEB2aXNpYmxlLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRlbHNlIGlmIEB2aWV3U2l6ZSgzOTMsIDg1Milcblx0XHRcdEBjcmVhdGVOb3RjaFN0YXR1c0JhcihAc3RhdHVzQmFyVmlldylcblx0XHRcdEBjcmVhdGVIb21lSW5kaWNhdG9yIG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IEB2aWV3LCB3aWR0aDogQHZpZXcud2lkdGgsIGhlaWdodDogMzQsIHk6IEFsaWduLmJvdHRvbSwgbmFtZTogXCIuaG9tZSBiYXJcIiwgb3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM3NSwgNjY3KSBvciBAdmlld1NpemUoNDE0LCA3MzYpIG9yIEB2aWV3U2l6ZSgzMjAsIDU2OClcblx0XHRcdEBjcmVhdGVDbGFzc2ljU3RhdHVzQmFyKEBzdGF0dXNCYXJWaWV3KVxuXHRcdFxuXHRcdFxuXHRcdGVsc2UgQGNyZWF0ZUFuZHJvaWRTdGF0dXNCYXIoQHN0YXR1c0JhclZpZXcpXG5cdFxuXHRcblx0XG5cdFxuXG5cblxuXHRjcmVhdGVBbmRyb2lkU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gMzJcblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDUyLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5sZWZ0KDQpLCB5OiBBbGlnbi50b3AoMiArIDUpXG5cdFx0XHRjb2xvcjogZGV2aWNlX2Fzc2V0cy5jb2xvcltAc3RhdHVzQmFyXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTQsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ucmlnaHQoLTQpLCB5OiBBbGlnbi50b3AoNSlcblx0XHRcdGltYWdlOiBkZXZpY2VfYXNzZXRzLmFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlW0BzdGF0dXNCYXJdXG5cdFxuXHRcblx0Y3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTIsIGhlaWdodDogMjAsIHg6IEFsaWduLmxlZnQsIHk6IEFsaWduLnRvcCgyKVxuXHRcdFx0Y29sb3I6IGRldmljZV9hc3NldHMuY29sb3JbQHN0YXR1c0Jhcl0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDE0LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogMjAsIHg6IEFsaWduLnJpZ2h0LCB5OiBBbGlnbi50b3AoKVxuXHRcdFx0aW1hZ2U6IGRldmljZV9hc3NldHMuYW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHN0YXR1c0Jhcl1cblx0XG5cdFxuXG5cblxuXHRjcmVhdGVDbGFzc2ljU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gMjBcblx0XHRcblx0XHRjbGFzc2ljTGVmdENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLmxlZnRcblx0XHRcdGltYWdlOiBkZXZpY2VfYXNzZXRzLm9sZFN0YXR1c0JhckxlZnRJbWFnZVtAc3RhdHVzQmFyXVxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTQsIGhlaWdodDogMTYsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRjb2xvcjogZGV2aWNlX2Fzc2V0cy5jb2xvcltAc3RhdHVzQmFyXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogZGV2aWNlX2Fzc2V0cy5vbGRTdGF0dXNCYXJSaWdodEltYWdlW0BzdGF0dXNCYXJdXG5cdFx0XG5cdFxuXHRjcmVhdGVOb3RjaFN0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDQ0XG5cdFx0XG5cdFx0bm90Y2hMZWZ0Q29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDU0LCBoZWlnaHQ6IDIxLCB4OiBBbGlnbi5sZWZ0KDIxKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0Y29sb3I6IGRldmljZV9hc3NldHMuY29sb3JbQHN0YXR1c0Jhcl0sIGJhY2tncm91bmRDb2xvcjogbnVsbCwgbGV0dGVyU3BhY2luZzogLTAuMTdcblx0XHRcdGZvbnRTaXplOiAxNSwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdG5vdGNoQ2VudGVyQ29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMzc1LCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24uY2VudGVyXG5cdFx0XHRpbWFnZTogZGV2aWNlX2Fzc2V0cy5ub3RjaFxuXHRcdFxuXHRcdG5vdGNoUmlnaHRDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5yaWdodFxuXHRcdFx0aW1hZ2U6IGRldmljZV9hc3NldHMuc3RhdHVzQmFyUmlnaHRJbWFnZVtAc3RhdHVzQmFyXVxuXG5cblxuXG5cblx0Y3JlYXRlSG9tZUluZGljYXRvcjogKGJhckxheWVyKSA9PlxuXHRcdEBob21lQmFyVmlldyA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIuaG9tZVZpZXdcIlxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEzNSwgaGVpZ2h0OiA1LCB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmJvdHRvbSgtOClcblx0XHRcdGJhY2tncm91bmRDb2xvcjogZGV2aWNlX2Fzc2V0cy5jb2xvcltAaG9tZUJhcl0sIGJvcmRlclJhZGl1czogMjBcblx0XG5cblxuXG5kZXZpY2VfYXNzZXRzID1cblx0Y29sb3I6XG5cdFx0ZGFyazogXCIjMDAwXCJcblx0XHRsaWdodDogXCIjRkZGXCJcblx0XG5cdHN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhckxlZnRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfbGVmdF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdGFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9hbmRyb2lkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdFxuXG5cblx0bm90Y2g6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9ub3RjaC5wbmdcIlxuXHR0aXA6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3RpcC5wbmdcIiIsIlxuY2xhc3MgZXhwb3J0cy5Ib21lQmFyX0NsYXNzIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IEB2aWV3XG5cdFx0XHR3aWR0aDogQHZpZXcud2lkdGhcblx0XHRcdFxuXHRcdFx0dGhlbWU6IEB2aWV3LmhvbWVCYXJfdGhlbWVcblx0XHRcdFxuXHRcdFx0aGVpZ2h0OiAzNCwgeTogQWxpZ24uYm90dG9tLCBuYW1lOiBcIi5ob21lIGJhclwiLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QGNyZWF0ZSgpXG5cblxuXG5cdEBkZWZpbmUgJ3ZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy52aWV3ID0gdmFsdWVcblxuXHRAZGVmaW5lICd0aGVtZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50aGVtZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50aGVtZSA9IHZhbHVlXG5cblxuXG5cdHZpZXdTaXplOiAodywgaCkgPT4gcmV0dXJuIEB2aWV3LndpZHRoID09IHcgYW5kIEB2aWV3LmhlaWdodCA9PSBoXG5cblx0Y3JlYXRlOiAoKSA9PlxuXHRcdGlmIEB2aWV3U2l6ZSgzNzUsIDgxMikgb3IgQHZpZXdTaXplKDM5MCwgODQ0KSBvciBAdmlld1NpemUoNDE0LCA4OTYpIG9yIEB2aWV3U2l6ZSg0MjgsIDkyNikgb3IgQHZpZXdTaXplKDM2MCwgNzgyKSBvciBAdmlld1NpemUoMzkzLCA4NTIpXG5cdFx0XHRAY3JlYXRlSG9tZUluZGljYXRvcigpXG5cdFxuXHRcblx0Y3JlYXRlSG9tZUluZGljYXRvcjogKCkgPT5cblx0XHRuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiLmhvbWVWaWV3XCJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDEzNSwgaGVpZ2h0OiA1LCB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmJvdHRvbSgtOClcblx0XHRcdGJhY2tncm91bmRDb2xvcjogZGV2aWNlX2Fzc2V0cy5jb2xvcltAdGhlbWVdLCBib3JkZXJSYWRpdXM6IDIwXG5cblxuXG5kZXZpY2VfYXNzZXRzID1cblx0Y29sb3I6XG5cdFx0ZGFyazogXCIjMDAwXCJcblx0XHRsaWdodDogXCIjRkZGXCIiLCJcblxuQXNzZXRzID0gcmVxdWlyZSBcIlByZXZpZXdfQXNzZXRzXCJcblxuXG4jIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gXCJhdXRvXCJcblxuY2xhc3MgZXhwb3J0cy5Jbml0VmlldyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0bmFtZTogXCJQcmV2aWV3XCJcblx0XHRcdHZpZXc6IG51bGxcblx0XHRcdFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRib3JkZXJSYWRpdXM6IDQyXG5cdFx0XHRcblx0XHRcdGFzc2V0czogQXNzZXRzLmRhdGFcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cblx0XHR3aW5kb3cuc2F2ZVByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0KEApXG5cdFx0XG5cdFx0QHN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IHNjYWxlOiAxIH1cblx0XHRcdFwiZmlsbFwiOiB7IHNjYWxlOiAxIH1cblx0XHRcblx0XHRcblx0XHRcblxuXHRcblxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnZpZXcgPSB2YWx1ZVxuXHRcdFx0QHdpZHRoID0gQHZpZXcud2lkdGhcblx0XHRcdEBoZWlnaHQgPSBAdmlldy5oZWlnaHRcblx0XHRcdEB2aWV3LnBhcmVudCA9IEBcblxuXHRAZGVmaW5lICdhc3NldHMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYXNzZXRzXG5cblxuXG5cblxuXHRzY3JlZW5TaXplOiAodywgaCkgPT4gcmV0dXJuIFNjcmVlbi53aWR0aCA9PSB3IGFuZCBTY3JlZW4uaGVpZ2h0ID09IGhcblx0dmlld1NpemU6ICh3LCBoKSA9PiByZXR1cm4gQHdpZHRoID09IHcgYW5kIEBoZWlnaHQgPT0gaFxuXHR2aWV3V2lkdGg6ICh3KSA9PiByZXR1cm4gQHdpZHRoID09IHdcblxuXHRsb2dTaXplOiAoKSA9PlxuXHRcdG5ldyBUZXh0TGF5ZXIgeyB0ZXh0OiBcIiN7U2NyZWVuLndpZHRofXgje1NjcmVlbi5oZWlnaHR9XCIsIHk6IEFsaWduLmNlbnRlciB9XHRcblxuXG5cblx0YW5pbWF0ZVN0YXRlVG9Ob3JtYWw6ICgpID0+XG5cdFx0QGFuaW1hdGUoXCJub3JtYWxcIiwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcblx0YW5pbWF0ZVN0YXRlVG9GaWxsOiAoKSA9PlxuXHRcdEBhbmltYXRlKFwiZmlsbFwiLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFxuXHRzdGF0ZVN3aXRjaFRvTm9ybWFsOiAoKSA9PlxuXHRcdEBzdGF0ZVN3aXRjaChcIm5vcm1hbFwiKVxuXHRcblx0c3RhdGVTd2l0Y2hUb0ZpbGw6ICgpID0+XG5cdFx0QHN0YXRlU3dpdGNoKFwiZmlsbFwiKVxuXG5cblx0XHRcbiIsIlxuXG57RGV2aWNlVmlld30gPSByZXF1aXJlIFwiRGV2aWNlVmlld1wiXG5cblxuY2xhc3MgZXhwb3J0cy5Mb2NhdGlvblZpZXcgZXh0ZW5kcyBEZXZpY2VWaWV3XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0aW5pdFN0YXRlOiBcImZpbGxcIiAjIGZpbGwgLyBub3JtYWxcblx0XHRcdHNob3dCdXR0b246IHRydWVcblx0XHRcdHNob3dMb2dvOiB0cnVlXG5cdFx0XHRmb3JjZURlc2t0b3A6IGZhbHNlXG5cblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHNjYWxlUHJldmlldygpXG5cblxuXHRAZGVmaW5lICdpbml0U3RhdGUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaW5pdFN0YXRlXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmluaXRTdGF0ZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdzaG93QnV0dG9uJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNob3dCdXR0b25cblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0J1dHRvbiA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdzaG93TG9nbycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93TG9nb1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zaG93TG9nbyA9IHZhbHVlXG5cblx0QGRlZmluZSAnZm9yY2VEZXNrdG9wJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmZvcmNlRGVza3RvcFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuZm9yY2VEZXNrdG9wID0gdmFsdWVcblx0XHRcdGlmIHZhbHVlXG5cdFx0XHRcdEBzaG93RGV2aWNlID0gZmFsc2Vcblx0XHRcdFx0QHNob3dCYXJzID0gZmFsc2Vcblx0XHRcdFx0QGJvcmRlclJhZGl1cyA9IDhcblx0XG5cdFxuXHRzY2FsZVByZXZpZXc6ICgpID0+XG5cdFx0Zm9yY2VEZXNrdG9wTW9kZSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJkZXNrdG9wXCIsIFt7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcInRydWVcIiwgcmVzdWx0OiB0cnVlIH1dLCBmYWxzZSlcblxuXHRcdGlmIGZvcmNlRGVza3RvcE1vZGUgdGhlbiBAcHJldmlld0Rlc2t0b3AoKVxuXHRcdGVsc2UgaWYgVXRpbHMuaXNNb2JpbGUoKSB0aGVuIEBwcmV2aWV3TW9iaWxlKClcblx0XHRlbHNlIEBwcmV2aWV3RGVza3RvcCgpXG5cdFx0XHRcblx0XHRcblx0XG5cblx0dXBkYXRlU2NhbGU6ICgpID0+XG5cblx0XHRzY2FsZUZhY3RvciA9IFNjcmVlbi53aWR0aCAvIENhbnZhcy53aWR0aFxuXG5cdFx0QG9yaWdpblggPSAwXG5cdFx0QG9yaWdpblkgPSAwXG5cblx0XHRzY2FsZVggPSAoU2NyZWVuLndpZHRoIC0gc2NhbGVGYWN0b3IgKiAxMTIpIC8gQHdpZHRoXG5cdFx0c2NhbGVZID0gKFNjcmVlbi5oZWlnaHQgLSBzY2FsZUZhY3RvciAqIDExMikgLyBAaGVpZ2h0XG5cdFx0QHN0YXRlc1tcImZpbGxcIl0uc2NhbGUgPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSlcblxuXHRcdEBzdGF0ZXNbXCJmaWxsXCJdLnggPSAoU2NyZWVuLndpZHRoIC0gQHdpZHRoICogQHN0YXRlc1tcImZpbGxcIl0uc2NhbGUpIC8gMlxuXHRcdEBzdGF0ZXNbXCJmaWxsXCJdLnkgPSAoU2NyZWVuLmhlaWdodCAtIEBoZWlnaHQgKiBAc3RhdGVzW1wiZmlsbFwiXS5zY2FsZSkgLyAyXG5cblx0XHRAc3RhdGVzW1wibm9ybWFsXCJdLnggPSAoU2NyZWVuLndpZHRoIC0gQHdpZHRoKSAvIDJcblx0XHRAc3RhdGVzW1wibm9ybWFsXCJdLnkgPSAoU2NyZWVuLmhlaWdodCAtIEBoZWlnaHQpIC8gMlxuXG5cdFxuXG5cblxuXG5cdHNldERlc2t0b3BTY2FsZU1vZGU6ICgpID0+XG5cblx0XHRmb3JTdGF0ZSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJzY2FsZVwiLCBbeyB2YWx1ZTogXCJmaWxsXCIsIHJlc3VsdDogXCJmaWxsXCIgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwibm9ybWFsXCIsIHJlc3VsdDogXCJub3JtYWxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogXCJmaWxsXCIgfV0sIEBpbml0U3RhdGUpXG5cblx0XHRzaG91bGRTaG93QnV0dG9uID0gQGdldFN0YXRlR2VuZXJpYyhcImJ1dHRvblwiLCBbeyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvZmZcIiwgcmVzdWx0OiBmYWxzZSB9XSwgQHNob3dCdXR0b24pXG5cblx0XHRzaG91bGRTaG93TG9nbyA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJsb2dvXCIsIFt7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvZmZcIiwgcmVzdWx0OiBmYWxzZSB9XSwgQHNob3dMb2dvKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0c2hvdWxkU2hvd0RldmljZSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJkZXZpY2VcIiwgW3sgdmFsdWU6IFwiZmFsc2VcIiwgcmVzdWx0OiBmYWxzZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9mZlwiLCByZXN1bHQ6IGZhbHNlIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogdHJ1ZSB9XSwgQHNob3dEZXZpY2UpXG5cblx0XHRcblx0XHRpZiBzaG91bGRTaG93TG9nbyB0aGVuIEBjcmVhdGVMb2dvQnV0dG9uKClcblx0XHRpZiBzaG91bGRTaG93QnV0dG9uIHRoZW4gQGNyZWF0ZVNjYWxlQnV0dG9uKGZvclN0YXRlKVxuXHRcdGlmIHNob3VsZFNob3dEZXZpY2UgdGhlbiBAc2hvd0JvcmRlclZpZXcoKSBlbHNlIEBoaWRlQm9yZGVyVmlldygpXG5cdFx0QHN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcblx0XG5cdFxuXHRwcmV2aWV3RGVza3RvcDogKCkgPT5cblx0XHRAdXBkYXRlU2NhbGUoKVxuXHRcdEBzZXREZXNrdG9wU2NhbGVNb2RlKClcblx0XHRAY3JlYXRlQmFycygpXG5cdFx0QGNsaXAgPSB0cnVlXG5cdFx0QHVwZGF0ZVByZXZpZXdPblJlc2l6ZSgpXG5cblxuXHR1cGRhdGVQcmV2aWV3T25SZXNpemU6ICgpID0+XG5cdFx0bG9jYWxQcmV2aWV3ID0gQFxuXHRcdFxuXHRcdENhbnZhcy5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZSgpXG5cdFx0XHRsb2NhbFByZXZpZXcuc3RhdGVTd2l0Y2gobG9jYWxQcmV2aWV3LnN0YXRlcy5jdXJyZW50Lm5hbWUpXG5cdFx0XG5cdFx0Q2FudmFzLm9uIFwiY2hhbmdlOndpZHRoXCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlU2NhbGUoKVxuXHRcdFx0bG9jYWxQcmV2aWV3LnN0YXRlU3dpdGNoKGxvY2FsUHJldmlldy5zdGF0ZXMuY3VycmVudC5uYW1lKVxuXHRcdFxuXG5cdFx0U2NyZWVuLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVNjYWxlKClcblx0XHRcdGxvY2FsUHJldmlldy5zdGF0ZVN3aXRjaChsb2NhbFByZXZpZXcuc3RhdGVzLmN1cnJlbnQubmFtZSlcblx0XHRcblx0XHRTY3JlZW4ub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZSgpXG5cdFx0XHRsb2NhbFByZXZpZXcuc3RhdGVTd2l0Y2gobG9jYWxQcmV2aWV3LnN0YXRlcy5jdXJyZW50Lm5hbWUpXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRwcmV2aWV3TW9iaWxlOiAoKSA9PlxuXG5cdFx0QHNjYWxlID0gU2NyZWVuLndpZHRoIC8gQHdpZHRoXG5cdFx0QG9yaWdpblggPSAwXG5cdFx0QG9yaWdpblkgPSAwXG5cdFxuXHRcblxuXHRzZXRDdXN0b21QcmV2aWV3OiAoKSA9PlxuXHRcdEB5ID0gQWxpZ24udG9wXG5cdFx0XG5cdFx0QHNjYWxlID0gKFNjcmVlbi5oZWlnaHQgLSAxMjApIC8gQGhlaWdodFxuXHRcdEBib3JkZXJSYWRpdXMgPSAyMFxuXHRcdEBjbGlwID0gdHJ1ZVxuXG5cblxuXG5cdCMgZ2V0U3RhdGVHZW5lcmljOiAoa2V5ID0gXCJzY2FsZVwiLCBwYWlycyA9IFt7IHZhbHVlOiAsIHJlc3VsdDogfSwge3ZhbHVlOiAsIHJlc3VsdDogfV0sIGRlZmF1bHRSZXN1bHQgPSBcIlwiKVxuXHRnZXRTdGF0ZUdlbmVyaWM6IChzdGF0ZUtleSA9IFwic2NhbGVcIiwgc3RhdGVQYWlycyA9IFtdLCBkZWZhdWx0UmVzdWx0ID0gXCJcIikgPT5cblx0XHRyZXN1bHQgPSBkZWZhdWx0UmVzdWx0XG5cblx0XHRmb3IgaXRlbSBpbiBsb2NhdGlvbi5zZWFyY2hbMS4uXS5zcGxpdCgnJicpXG5cdFx0XHRrZXlWYWx1ZVBhaXIgPSBpdGVtLnNwbGl0KFwiPVwiKVxuXHRcdFx0a2V5UGFydCA9IGtleVZhbHVlUGFpclswXVxuXHRcdFx0dmFsdWVQYXJ0ID0ga2V5VmFsdWVQYWlyWzFdXG5cblx0XHRcdGlmIGtleVBhcnQgPT0gc3RhdGVLZXlcblx0XHRcdFx0Zm9yIHBhaXIgaW4gc3RhdGVQYWlyc1xuXHRcdFx0XHRcdGlmIHZhbHVlUGFydCA9PSBwYWlyLnZhbHVlXG5cdFx0XHRcdFx0XHQjIHByaW50IFwib2sgXCIgKyBcIiAje3BhaXIudmFsdWV9XCIgXG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBwYWlyLnJlc3VsdFxuXHRcdFx0XHRcdCMgZWxzZVxuXHRcdFx0XHRcdFx0IyBwcmludCBcIm5vdCBcIiArIFwiICN7cGFpci52YWx1ZX1cIiBcblx0XHRcblx0XHRyZXR1cm4gcmVzdWx0XG5cdFxuXHRcblx0XG5cdFxuIiwiIyBMb2dvXG5cbmNsYXNzIGV4cG9ydHMuTG9nb0xheWVyIGV4dGVuZHMgU1ZHTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0b3BhY2l0eTogMC41XG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cdFx0XHRzdmc6IGdldExvZ28oXCJGRkZcIilcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEBzdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRAc2hvd0hpbnQgPSAtPiA7XG5cdFx0XG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cdFxuXHRAZGVmaW5lICdoYW5kbGVyJyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9uKEV2ZW50cy5UYXAsIHZhbHVlKVxuXHRcblx0SG92ZXI6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjhcblx0SG92ZXJPZmY6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjVcblxuXG5cbmdldExvZ28gPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gXCIjRkZGRkZGXCJcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCI3NlwiIGhlaWdodD1cIjMyXCIgdmlld0JveD1cIjAgMCA3NiAzMlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk0yLjc5MTk5IDIxLjZDMi43OTE5OSAyMS4xNjggMi45MDM5OSAyMC40MDggMy4xMjc5OSAxOS4zMkw0LjM5OTk5IDEyLjg0SDIuOTgzOTlMMy4wNzk5OSAxMi4xMkM0Ljk5OTk5IDExLjU0NCA2Ljg4Nzk5IDEwLjU1MiA4Ljc0Mzk5IDkuMTQzOThIOS44OTU5OUw5LjMxOTk5IDExLjc2SDExLjE5MkwxMC45NzYgMTIuODRIOS4xMjc5OUw3LjkwMzk5IDE5LjMyQzcuNjk1OTkgMjAuMzEyIDcuNTkxOTkgMjAuOTc2IDcuNTkxOTkgMjEuMzEyQzcuNTkxOTkgMjIuMDggNy45Mjc5OSAyMi41NDQgOC41OTk5OSAyMi43MDRDOC40Mzk5OSAyMy4yNDggOC4wNzE5OSAyMy42OCA3LjQ5NTk5IDI0QzYuOTE5OTkgMjQuMzIgNi4yMjM5OSAyNC40OCA1LjQwNzk5IDI0LjQ4QzQuNTkxOTkgMjQuNDggMy45NTE5OSAyNC4yMjQgMy40ODc5OSAyMy43MTJDMy4wMjM5OSAyMy4yIDIuNzkxOTkgMjIuNDk2IDIuNzkxOTkgMjEuNlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMTcuNTU5OSAyMi42OEMxNy4wNjM5IDIzLjg4IDE2LjAyMzkgMjQuNDggMTQuNDM5OSAyNC40OEMxMy42MjM5IDI0LjQ4IDEyLjk1OTkgMjQuMiAxMi40NDc5IDIzLjY0QzEyLjAxNTkgMjMuMTQ0IDExLjc5OTkgMjIuNjQ4IDExLjc5OTkgMjIuMTUyQzExLjc5OTkgMjAuODU2IDEyLjA5NTkgMTguOTQ0IDEyLjY4NzkgMTYuNDE2TDEzLjU3NTkgMTEuNzZMMTguNDQ3OSAxMS4yOEwxNi45ODM5IDE4Ljg2NEMxNi43MTE5IDIwLjA0OCAxNi41NzU5IDIwLjg0OCAxNi41NzU5IDIxLjI2NEMxNi41NzU5IDIyLjE3NiAxNi45MDM5IDIyLjY0OCAxNy41NTk5IDIyLjY4Wk0xNC4wMDc5IDguNDIzOThDMTQuMDA3OSA3Ljc5OTk4IDE0LjI2MzkgNy4zMTk5OCAxNC43NzU5IDYuOTgzOThDMTUuMzAzOSA2LjY0Nzk4IDE1Ljk0MzkgNi40Nzk5OCAxNi42OTU5IDYuNDc5OThDMTcuNDQ3OSA2LjQ3OTk4IDE4LjA0NzkgNi42NDc5OCAxOC40OTU5IDYuOTgzOThDMTguOTU5OSA3LjMxOTk4IDE5LjE5MTkgNy43OTk5OCAxOS4xOTE5IDguNDIzOThDMTkuMTkxOSA5LjA0Nzk4IDE4LjkzNTkgOS41MTk5OCAxOC40MjM5IDkuODM5OThDMTcuOTI3OSAxMC4xNiAxNy4zMDM5IDEwLjMyIDE2LjU1MTkgMTAuMzJDMTUuNzk5OSAxMC4zMiAxNS4xODM5IDEwLjE2IDE0LjcwMzkgOS44Mzk5OEMxNC4yMzk5IDkuNTE5OTggMTQuMDA3OSA5LjA0Nzk4IDE0LjAwNzkgOC40MjM5OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMjYuMDYwNiAyMi42OEMyNS41NjQ2IDIzLjg4IDI0LjUyNDYgMjQuNDggMjIuOTQwNiAyNC40OEMyMi4xNDA2IDI0LjQ4IDIxLjQ4NDYgMjQuMiAyMC45NzI2IDIzLjY0QzIwLjU1NjYgMjMuMTc2IDIwLjM0ODYgMjIuNjggMjAuMzQ4NiAyMi4xNTJDMjAuMzQ4NiAyMC45NTIgMjAuNjI4NiAxOS4wNCAyMS4xODg2IDE2LjQxNkwyMi45NDA2IDcuMTk5OThMMjcuODEyNiA2LjcxOTk4TDI1LjQ4NDYgMTguODY0QzI1LjIxMjYgMjAuMDQ4IDI1LjA3NjYgMjAuODQ4IDI1LjA3NjYgMjEuMjY0QzI1LjA3NjYgMjIuMTc2IDI1LjQwNDYgMjIuNjQ4IDI2LjA2MDYgMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTM0LjU2MTggMjIuNjhDMzQuMDY1OCAyMy44OCAzMy4wMjU4IDI0LjQ4IDMxLjQ0MTggMjQuNDhDMzAuNjQxOCAyNC40OCAyOS45ODU4IDI0LjIgMjkuNDczOCAyMy42NEMyOS4wNTc4IDIzLjE3NiAyOC44NDk4IDIyLjY4IDI4Ljg0OTggMjIuMTUyQzI4Ljg0OTggMjAuOTUyIDI5LjEyOTggMTkuMDQgMjkuNjg5OCAxNi40MTZMMzEuNDQxOCA3LjE5OTk4TDM2LjMxMzggNi43MTk5OEwzMy45ODU4IDE4Ljg2NEMzMy43MTM4IDIwLjA0OCAzMy41Nzc4IDIwLjg0OCAzMy41Nzc4IDIxLjI2NEMzMy41Nzc4IDIyLjE3NiAzMy45MDU4IDIyLjY0OCAzNC41NjE4IDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk00My4wNjMxIDIyLjY4QzQyLjU2NzEgMjMuODggNDEuNTI3MSAyNC40OCAzOS45NDMxIDI0LjQ4QzM5LjE0MzEgMjQuNDggMzguNDg3MSAyNC4yIDM3Ljk3NTEgMjMuNjRDMzcuNTU5MSAyMy4xNzYgMzcuMzUxMSAyMi42OCAzNy4zNTExIDIyLjE1MkMzNy4zNTExIDIwLjk1MiAzNy42MzExIDE5LjA0IDM4LjE5MTEgMTYuNDE2TDM5Ljk0MzEgNy4xOTk5OEw0NC44MTUxIDYuNzE5OThMNDIuNDg3MSAxOC44NjRDNDIuMjE1MSAyMC4wNDggNDIuMDc5MSAyMC44NDggNDIuMDc5MSAyMS4yNjRDNDIuMDc5MSAyMi4xNzYgNDIuNDA3MSAyMi42NDggNDMuMDYzMSAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNTMuNTMyMyAyMi45OTJDNTIuNzY0MyAyMy45ODQgNTEuNDI4MyAyNC40OCA0OS41MjQzIDI0LjQ4QzQ4LjUzMjMgMjQuNDggNDcuNjc2MyAyNC4xODQgNDYuOTU2MyAyMy41OTJDNDYuMjM2MyAyMi45ODQgNDUuODc2MyAyMi4yNDggNDUuODc2MyAyMS4zODRDNDUuODc2MyAyMC45MDQgNDUuOTAwMyAyMC41NDQgNDUuOTQ4MyAyMC4zMDRMNDcuNTU2MyAxMS43Nkw1Mi40MjgzIDExLjI4TDUwLjY3NjMgMjAuNTQ0QzUwLjYxMjMgMjAuODk2IDUwLjU4MDMgMjEuMTc2IDUwLjU4MDMgMjEuMzg0QzUwLjU4MDMgMjIuMzEyIDUwLjg2MDMgMjIuNzc2IDUxLjQyMDMgMjIuNzc2QzUyLjA0NDMgMjIuNzc2IDUyLjU4MDMgMjIuMzUyIDUzLjAyODMgMjEuNTA0QzUzLjE3MjMgMjEuMjMyIDUzLjI3NjMgMjAuOTIgNTMuMzQwMyAyMC41NjhMNTUuMDQ0MyAxMS43Nkw1OS43NzIzIDExLjI4TDU3Ljk5NjMgMjAuNjRDNTcuOTQ4MyAyMC44OCA1Ny45MjQzIDIxLjEyOCA1Ny45MjQzIDIxLjM4NEM1Ny45MjQzIDIxLjY0IDU3Ljk5NjMgMjEuOTEyIDU4LjE0MDMgMjIuMkM1OC4yODQzIDIyLjQ3MiA1OC41ODgzIDIyLjY0IDU5LjA1MjMgMjIuNzA0QzU4Ljk1NjMgMjMuMDg4IDU4Ljc0MDMgMjMuNDA4IDU4LjQwNDMgMjMuNjY0QzU3LjcwMDMgMjQuMjA4IDU2Ljk2NDMgMjQuNDggNTYuMTk2MyAyNC40OEM1NS40NDQzIDI0LjQ4IDU0Ljg0NDMgMjQuMzQ0IDU0LjM5NjMgMjQuMDcyQzUzLjk0ODMgMjMuOCA1My42NjAzIDIzLjQ0IDUzLjUzMjMgMjIuOTkyWlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk02OS4yOTQ3IDE3LjI1NkM2OS44NzA3IDE2LjIzMiA3MC4xNTg3IDE1LjIgNzAuMTU4NyAxNC4xNkM3MC4xNTg3IDEzLjQ3MiA2OS45MTA3IDEzLjEyOCA2OS40MTQ3IDEzLjEyOEM2OS4wMzA3IDEzLjEyOCA2OC42Mzg3IDEzLjQ1NiA2OC4yMzg3IDE0LjExMkM2Ny44MjI3IDE0Ljc2OCA2Ny41NTA3IDE1LjUyIDY3LjQyMjcgMTYuMzY4TDY2LjE3NDcgMjRMNjEuMjA2NyAyNC40OEw2My42NTQ3IDExLjc2TDY3LjYxNDcgMTEuMjhMNjcuMTgyNyAxMy43MDRDNjcuOTY2NyAxMi4wODggNjkuMjM4NyAxMS4yOCA3MC45OTg3IDExLjI4QzcxLjkyNjcgMTEuMjggNzIuNjM4NyAxMS41MiA3My4xMzQ3IDEyQzczLjY0NjcgMTIuNDggNzMuOTAyNyAxMy4yMTYgNzMuOTAyNyAxNC4yMDhDNzMuOTAyNyAxNS4xODQgNzMuNTc0NyAxNS45ODQgNzIuOTE4NyAxNi42MDhDNzIuMjc4NyAxNy4yMzIgNzEuNDA2NyAxNy41NDQgNzAuMzAyNyAxNy41NDRDNjkuODIyNyAxNy41NDQgNjkuNDg2NyAxNy40NDggNjkuMjk0NyAxNy4yNTZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48L3N2Zz5cblwiXCJcIlxuIiwiXG57IEJ1dHRvbiB9ID0gcmVxdWlyZSBcIkJ1dHRvbnNcIlxuXG57IFByZXZpZXdfQ2xhc3MgfSA9IHJlcXVpcmUgXCJQcmV2aWV3X0NsYXNzXCJcblxuY2xhc3MgRmxvd1ZpZXcgZXh0ZW5kcyBGbG93Q29tcG9uZW50XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRpZiBAcGFyZW50XG5cdFx0XHRAd2lkdGggPSBAcGFyZW50LndpZHRoXG5cdFx0XHRAaGVpZ2h0ID0gQHBhcmVudC5oZWlnaHRcblxuXG5cdFx0QG9uIEV2ZW50cy5UcmFuc2l0aW9uU3RhcnQsIChsYXllckEsIGxheWVyQikgLT5cblx0XHRcdGlmIGxheWVyQiAhPSB1bmRlZmluZWQgYW5kIGxheWVyQi5jdXN0b20gIT0gdW5kZWZpbmVkIGFuZCBsYXllckIuY3VzdG9tLmN1c3RvbUFjdGlvbl9BcnJheSAhPSB1bmRlZmluZWRcblx0XHRcdFx0QGl0ZXJhdGVUaHJvdWdoQ2hpbGRyZW4gbGF5ZXJCLCBsYXllckIuY3VzdG9tLmN1c3RvbUFjdGlvbl9BcnJheSwgQGN1c3RvbUFjdGlvbl9zd2l0Y2hPbkxheWVyc1xuXHRcdFx0XG5cdFx0XHRpZiBsYXllckEgIT0gdW5kZWZpbmVkIGFuZCBsYXllckEuY3VzdG9tICE9IHVuZGVmaW5lZCBhbmQgbGF5ZXJBLmN1c3RvbS5jdXN0b21BY3Rpb25fQXJyYXkgIT0gdW5kZWZpbmVkXG5cdFx0XHRcdEBpdGVyYXRlVGhyb3VnaENoaWxkcmVuIGxheWVyQSwgbGF5ZXJBLmN1c3RvbS5jdXN0b21BY3Rpb25fQXJyYXksIEBjdXN0b21BY3Rpb25fc3dpdGNoT2ZmTGF5ZXJzXG5cblxuXG5cdEBkZWZpbmUgXCJwYXJlbnRcIixcblx0XHRlbnVtZXJhYmxlOiBmYWxzZVxuXHRcdGV4cG9ydGFibGU6IGZhbHNlXG5cdFx0aW1wb3J0YWJsZTogdHJ1ZVxuXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QF9wYXJlbnQgb3IgbnVsbFxuXHRcdFxuXHRcdHNldDogKGxheWVyKSAtPlxuXHRcdFx0cmV0dXJuIGlmIGxheWVyIGlzIEBfcGFyZW50XG5cblx0XHRcdHRocm93IEVycm9yKFwiTGF5ZXIucGFyZW50OiBhIGxheWVyIGNhbm5vdCBiZSBpdCdzIG93biBwYXJlbnQuXCIpIGlmIGxheWVyIGlzIEBcblxuXHRcdFx0IyBDaGVjayB0aGUgdHlwZVxuXHRcdFx0aWYgbm90IGxheWVyIGluc3RhbmNlb2YgTGF5ZXJcblx0XHRcdFx0dGhyb3cgRXJyb3IgXCJMYXllci5wYXJlbnQgbmVlZHMgdG8gYmUgYSBMYXllciBvYmplY3RcIlxuXG5cdFx0XHQjIENhbmNlbCBwcmV2aW91cyBwZW5kaW5nIGluc2VydGlvbnNcblx0XHRcdFV0aWxzLmRvbUNvbXBsZXRlQ2FuY2VsKEBfX2luc2VydEVsZW1lbnQpXG5cblx0XHRcdCMgUmVtb3ZlIGZyb20gcHJldmlvdXMgcGFyZW50IGNoaWxkcmVuXG5cdFx0XHRpZiBAX3BhcmVudFxuXHRcdFx0XHRAX3BhcmVudC5fY2hpbGRyZW4gPSBfLnB1bGwgQF9wYXJlbnQuX2NoaWxkcmVuLCBAXG5cdFx0XHRcdEBfcGFyZW50Ll9lbGVtZW50LnJlbW92ZUNoaWxkIEBfZWxlbWVudFxuXHRcdFx0XHRAX3BhcmVudC5lbWl0IFwiY2hhbmdlOmNoaWxkcmVuXCIsIHthZGRlZDogW10sIHJlbW92ZWQ6IFtAXX1cblx0XHRcdFx0QF9wYXJlbnQuZW1pdCBcImNoYW5nZTpzdWJMYXllcnNcIiwge2FkZGVkOiBbXSwgcmVtb3ZlZDogW0BdfVxuXG5cdFx0XHQjIEVpdGhlciBpbnNlcnQgdGhlIGVsZW1lbnQgdG8gdGhlIG5ldyBwYXJlbnQgZWxlbWVudCBvciBpbnRvIGRvbVxuXHRcdFx0aWYgbGF5ZXJcblx0XHRcdFx0bGF5ZXIuX2VsZW1lbnQuYXBwZW5kQ2hpbGQgQF9lbGVtZW50XG5cdFx0XHRcdGxheWVyLl9jaGlsZHJlbi5wdXNoIEBcblx0XHRcdFx0bGF5ZXIuZW1pdCBcImNoYW5nZTpjaGlsZHJlblwiLCB7YWRkZWQ6IFtAXSwgcmVtb3ZlZDogW119XG5cdFx0XHRcdGxheWVyLmVtaXQgXCJjaGFuZ2U6c3ViTGF5ZXJzXCIsIHthZGRlZDogW0BdLCByZW1vdmVkOiBbXX1cblx0XHRcdGVsc2Vcblx0XHRcdFx0QF9pbnNlcnRFbGVtZW50KClcblxuXHRcdFx0b2xkUGFyZW50ID0gQF9wYXJlbnRcblx0XHRcdCMgU2V0IHRoZSBwYXJlbnRcblx0XHRcdEBfcGFyZW50ID0gbGF5ZXJcblxuXHRcdFx0IyBQbGFjZSB0aGlzIGxheWVyIG9uIHRvcCBvZiBpdHMgc2libGluZ3Ncblx0XHRcdEBicmluZ1RvRnJvbnQoKVxuXG5cdFx0XHRAZW1pdCBcImNoYW5nZTpwYXJlbnRcIiwgQF9wYXJlbnQsIG9sZFBhcmVudFxuXHRcdFx0QGVtaXQgXCJjaGFuZ2U6c3VwZXJMYXllclwiLCBAX3BhcmVudCwgb2xkUGFyZW50XG5cdFx0XHRcblx0XHRcdEB3aWR0aCA9IGxheWVyLndpZHRoXG5cdFx0XHRAaGVpZ2h0ID0gbGF5ZXIuaGVpZ2h0XG5cblxuXHRzdGFja1RyYW5zaXRpb246IChuYXYsIGxheWVyQSwgbGF5ZXJCLCBvdmVybGF5KSAtPlxuXHRcdHRyYW5zaXRpb24gPVxuXHRcdFx0bGF5ZXJBOlxuXHRcdFx0XHRzaG93OiB7eDogMCwgeTogMH1cblx0XHRcdFx0aGlkZToge3g6IDAgLSBsYXllckE/LndpZHRoIC8gMiwgeTogMH1cblx0XHRcdGxheWVyQjpcblx0XHRcdFx0c2hvdzoge3g6IDAsIHk6IDB9XG5cdFx0XHRcdGhpZGU6IHt4OiBsYXllckIud2lkdGgsIHk6IDB9XG5cdFx0XHRvdmVybGF5OlxuXHRcdFx0XHRzaG93OiB7b3BhY2l0eTogLjUsIHg6IDAsIHk6IDAsIHNpemU6IG5hdi5zaXplfVxuXHRcdFx0XHRoaWRlOiB7b3BhY2l0eTogMCwgeDogMCwgeTogMCwgc2l6ZTogbmF2LnNpemV9XG5cblxuXHRtb2RhbFRyYW5zaXRpb246IChuYXYsIGxheWVyQSwgbGF5ZXJCLCBvdmVybGF5KSAtPlxuXHRcdHRyYW5zaXRpb24gPVxuXHRcdFx0bGF5ZXJBOlxuXHRcdFx0XHRzaG93OiB7eDogMCwgeTogMH1cblx0XHRcdFx0aGlkZToge3g6IDAsIHk6IDB9XG5cdFx0XHRsYXllckI6XG5cdFx0XHRcdHNob3c6IHt4OiAwLCB5OiAwfVxuXHRcdFx0XHRoaWRlOiB7eDogMCwgeTogbGF5ZXJBPy5oZWlnaHQgKyAxMH1cblx0XHRcdG92ZXJsYXk6XG5cdFx0XHRcdHNob3c6IHtvcGFjaXR5OiAuNSwgeDogMCwgeTogMCwgc2l6ZTogbmF2LnNpemV9XG5cdFx0XHRcdGhpZGU6IHtvcGFjaXR5OiAwLCB4OiAwLCB5OiAwLCBzaXplOiBuYXYuc2l6ZX1cblx0XG5cdGFwcFRyYW5zaXRpb246IChuYXYsIGxheWVyQSwgbGF5ZXJCLCBvdmVybGF5KSAtPlxuXHRcdHRyYW5zaXRpb24gPVxuXHRcdFx0bGF5ZXJBOlxuXHRcdFx0XHRzaG93OiB7eDogMCwgeTogMCwgc2NhbGU6IDF9XG5cdFx0XHRcdGhpZGU6IHt4OiAwIC0gbGF5ZXJBPy53aWR0aCwgeTogMCwgc2NhbGU6IDAuOH1cblx0XHRcdGxheWVyQjpcblx0XHRcdFx0c2hvdzoge3g6IDAsIHk6IDAsIHNjYWxlOiAxfVxuXHRcdFx0XHRoaWRlOiB7eDogbGF5ZXJCLndpZHRoLCB5OiAwLCBzY2FsZTogMC44fVxuXHRcdFx0b3ZlcmxheTpcblx0XHRcdFx0c2hvdzoge29wYWNpdHk6IC41LCB4OiAwLCB5OiAwLCBzaXplOiBuYXYuc2l6ZX1cblx0XHRcdFx0aGlkZToge29wYWNpdHk6IDAsIHg6IDAsIHk6IDAsIHNpemU6IG5hdi5zaXplfVxuXG5cblx0Y3VzdG9tQWN0aW9uX3N3aXRjaE9uTGF5ZXJzOiAobGF5ZXIsIGJveCwgZmxvdykgLT5cblx0XHQjIGlmIGJveCA9PSB1bmRlZmluZWQgdGhlbiByZXR1cm5cblxuXHRcdGxheWVyVG9DaGVjayA9IGxheWVyXG5cdFx0aW5kZXggPSBib3guaW5kZXhPZihsYXllclRvQ2hlY2spXG5cblx0XHRpZiBpbmRleCAhPSAtMVxuXHRcdFx0bGF5ZXIuaWdub3JlRXZlbnRzID0gZmFsc2Vcblx0XHRcdGJveC5zcGxpY2UoaW5kZXgsIDEpXG5cblxuXG5cdGN1c3RvbUFjdGlvbl9zd2l0Y2hPZmZMYXllcnM6IChsYXllciwgYm94LCBmbG93KSAtPlxuXG5cdFx0aWYgZmxvdy5zaG91bGRTaG93SGludE92ZXJyaWRlKGxheWVyKVxuXHRcdFx0IyBwcmludCBcIndpbGwgb2ZmIGxheWVyIFwiICsgbGF5ZXIubmFtZVxuXHRcdFx0Ym94LnB1c2ggbGF5ZXJcblx0XHRcdGxheWVyLmlnbm9yZUV2ZW50cyA9IHRydWVcblx0XG5cdFxuXHRcblx0c2hvdWxkU2hvd0hpbnRPdmVycmlkZTogKGxheWVyKSAtPlxuXHRcdGlmIGxheWVyLmlnbm9yZUV2ZW50cyBpcyB0cnVlIHRoZW4gcmV0dXJuIGZhbHNlXG5cdFx0IyBpZiBsYXllci5pc0FuaW1hdGluZyB0aGVuIHJldHVybiBmYWxzZVxuXG5cdFx0IyBmb3IgcGFyZW50IGluIEBhbmNlc3RvcnMoKVxuXHRcdFx0IyByZXR1cm4gZmFsc2UgaWYgcGFyZW50LmlzQW5pbWF0aW5nXG5cblx0XHQjIGZvciBwYXJlbnQgaW4gbGF5ZXIuYW5jZXN0b3JzKClcblx0XHQjIFx0IyBpZiBwYXJlbnQgaW5zdGFuY2VvZiBQcmV2aWV3X0NsYXNzXG5cdFx0IyBcdCMgXHQjIGlmIGxheWVyIGluc3RhbmNlb2YgQnV0dG9uIHRoZW4gcHJpbnQgXCJIRVJFXCJcblx0XHQjIFx0IyBcdGNvbnRpbnVlXG5cdFx0IyBcdCMgaWYgcGFyZW50LmlzQW5pbWF0aW5nXG5cdFx0IyBcdCMgXHRpZiBsYXllciBpbnN0YW5jZW9mIEJ1dHRvbiB0aGVuIHByaW50IFwiPz8/XCJcblx0XHQjIFx0IyBcdGlmIGxheWVyIGluc3RhbmNlb2YgQnV0dG9uIHRoZW4gcHJpbnQgcGFyZW50XG5cdFx0IyBcdHJldHVybiBmYWxzZSBpZiBwYXJlbnQuaXNBbmltYXRpbmdcblxuXHRcdGlmIGxheWVyLl9kcmFnZ2FibGUgYW5kIGxheWVyLl9kcmFnZ2FibGUuaG9yaXpvbnRhbCBpcyBmYWxzZSBhbmQgbGF5ZXIuX2RyYWdnYWJsZS52ZXJ0aWNhbCBpcyBmYWxzZVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cblx0XHRyZXR1cm4gZmFsc2UgaWYgbGF5ZXIub3BhY2l0eSBpcyAwXG5cblx0XHRmb3IgZXZlbnROYW1lIGluIGxheWVyLmxpc3RlbmVyRXZlbnRzKClcblx0XHRcdHJldHVybiB0cnVlIGlmIEV2ZW50cy5pc0ludGVyYWN0aXZlKGV2ZW50TmFtZSlcblx0XHRcblx0XHRyZXR1cm4gZmFsc2VcblxuXG5cblx0aXRlcmF0ZVRocm91Z2hDaGlsZHJlbjogKGxheWVyLCBib3gsIGFjdGlvbkNhbGxiYWNrKSAtPlxuXHRcdGFjdGlvbkNhbGxiYWNrIGxheWVyLCBib3gsIEBcblx0XHRmb3IgY2hpbGQgaW4gbGF5ZXIuY2hpbGRyZW5cblx0XHRcdEBpdGVyYXRlVGhyb3VnaENoaWxkcmVuIGNoaWxkLCBib3gsIGFjdGlvbkNhbGxiYWNrXG5cblxuXHRvcGVuOiAobmF2aWdhdGlvblZpZXcpIC0+XG5cdFx0bmF2aWdhdGlvblZpZXcuc2Nyb2xsVG9Ub3AoZmFsc2UpXG5cdFx0IyBAaXRlcmF0ZVRocm91Z2hDaGlsZHJlbiBAY3VycmVudCwgQGN1cnJlbnQuY3VzdG9tLmN1c3RvbUFjdGlvbl9BcnJheSwgQGN1c3RvbUFjdGlvbl9zd2l0Y2hPZmZMYXllcnNcblxuXHRcdGlmIG5hdmlnYXRpb25WaWV3LndyYXBwZXIgIT0gdW5kZWZpbmVkIGFuZCBuYXZpZ2F0aW9uVmlldy53cmFwcGVyICE9IG51bGxcblx0XHRcdEB0cmFuc2l0aW9uKG5hdmlnYXRpb25WaWV3LnBhcmVudCwgQG1vZGFsVHJhbnNpdGlvbilcblx0XHRcdCMgQGl0ZXJhdGVUaHJvdWdoQ2hpbGRyZW4gbmF2aWdhdGlvblZpZXcucGFyZW50LCBuYXZpZ2F0aW9uVmlldy5wYXJlbnQuY3VzdG9tLmN1c3RvbUFjdGlvbl9BcnJheSwgQGN1c3RvbUFjdGlvbl9zd2l0Y2hPbkxheWVyc1xuXHRcdGVsc2Vcblx0XHRcdEB0cmFuc2l0aW9uKG5hdmlnYXRpb25WaWV3LCBAc3RhY2tUcmFuc2l0aW9uKVxuXHRcdFx0IyBAaXRlcmF0ZVRocm91Z2hDaGlsZHJlbiBuYXZpZ2F0aW9uVmlldywgbmF2aWdhdGlvblZpZXcuY3VzdG9tLmN1c3RvbUFjdGlvbl9BcnJheSwgQGN1c3RvbUFjdGlvbl9zd2l0Y2hPbkxheWVyc1xuXG5cblxuXG5cblxuY2xhc3MgTW9kYWxWaWV3IGV4dGVuZHMgU2Nyb2xsQ29tcG9uZW50XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRuYXZpZ2F0aW9uVmlld19XcmFwcGVyID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIndyYXBwZXJcIlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRjdXN0b206XG5cdFx0XHRcdGN1c3RvbUFjdGlvbl9BcnJheTogW11cblxuXHRcdG5hdmlnYXRpb25WaWV3X1dyYXBwZXIub24gRXZlbnRzLlRhcCwgLT5cblx0XHRcdEBjaGlsZHJlblswXS5mbG93LnNob3dQcmV2aW91cygpXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0ZmxvdzogbnVsbFxuXHRcdFx0d3JhcHBlcjogbmF2aWdhdGlvblZpZXdfV3JhcHBlclxuXHRcdFx0c2Nyb2xsVmVydGljYWw6IHRydWVcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRkaXJlY3Rpb25Mb2NrOiB0cnVlXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRcblx0XHRAcGFyZW50ID0gbmF2aWdhdGlvblZpZXdfV3JhcHBlclxuXG5cdFx0QG9uIEV2ZW50cy5UYXAsIChldmVudCwgbGF5ZXIpIC0+XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuXG5cdFx0QG9uIEV2ZW50cy5Td2lwZURvd25TdGFydCwgKGV2ZW50LCBsYXllcikgLT5cblx0XHRcdGlmIEBzY3JvbGxZIDwgMFxuXHRcdFx0XHRAZmxvdy5zaG93UHJldmlvdXMoKVxuXHRcdFx0XHQjIEBmbG93Lml0ZXJhdGVUaHJvdWdoQ2hpbGRyZW4gQCwgQGN1c3RvbS5jdXN0b21BY3Rpb25fQXJyYXksIEBmbG93LmN1c3RvbUFjdGlvbl9zd2l0Y2hPZmZMYXllcnNcblxuXHRcdGlmIEBmbG93XG5cdFx0XHRAZmxvdy5zaG93TmV4dChAd3JhcHBlcilcblx0XHRcdEBmbG93LnNob3dQcmV2aW91cyhhbmltYXRlOiBmYWxzZSlcblxuXG5cblx0QGRlZmluZSAnZmxvdycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5mbG93XG5cdFx0IyBzZXQ6ICh2YWx1ZSkgLT5cblx0XHQjIFx0QG9wdGlvbnMuZmxvdyA9IHZhbHVlXG5cdFx0IyBcdHZhbHVlLnNob3dOZXh0KEApXG5cdFx0IyBcdHZhbHVlLnNob3dQcmV2aW91cyhhbmltYXRlOiBmYWxzZSlcblx0XG5cdEBkZWZpbmUgJ3dyYXBwZXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMud3JhcHBlclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy53cmFwcGVyID0gdmFsdWVcblxuXHRAZGVmaW5lIFwicGFyZW50XCIsXG5cdFx0ZW51bWVyYWJsZTogZmFsc2Vcblx0XHRleHBvcnRhYmxlOiBmYWxzZVxuXHRcdGltcG9ydGFibGU6IHRydWVcblxuXHRcdGdldDogLT5cblx0XHRcdEBfcGFyZW50IG9yIG51bGxcblx0XHRcblx0XHRzZXQ6IChsYXllcikgLT5cblxuXHRcdFx0IyBGbG93IHBhcmVudFxuXHRcdFx0aWYgbGF5ZXIgIT0gQHdyYXBwZXJcblx0XHRcdFx0QG9wdGlvbnMuZmxvdyA9IGxheWVyXG5cblx0XHRcdFx0QHdyYXBwZXIucGFyZW50ID0gbGF5ZXJcblx0XHRcdFx0QHdyYXBwZXIud2lkdGggPSBsYXllci53aWR0aFxuXHRcdFx0XHRAd3JhcHBlci5oZWlnaHQgPSBsYXllci5oZWlnaHRcblx0XHRcdFx0QHdpZHRoID0gbGF5ZXIud2lkdGhcblx0XHRcdFx0QGhlaWdodCA9IGxheWVyLmhlaWdodFxuXG5cdFx0XHRcdHJldHVyblxuXG5cblx0XHRcdHJldHVybiBpZiBsYXllciBpcyBAX3BhcmVudFxuXG5cdFx0XHR0aHJvdyBFcnJvcihcIkxheWVyLnBhcmVudDogYSBsYXllciBjYW5ub3QgYmUgaXQncyBvd24gcGFyZW50LlwiKSBpZiBsYXllciBpcyBAXG5cblx0XHRcdCMgQ2hlY2sgdGhlIHR5cGVcblx0XHRcdGlmIG5vdCBsYXllciBpbnN0YW5jZW9mIExheWVyXG5cdFx0XHRcdHRocm93IEVycm9yIFwiTGF5ZXIucGFyZW50IG5lZWRzIHRvIGJlIGEgTGF5ZXIgb2JqZWN0XCJcblxuXHRcdFx0IyBDYW5jZWwgcHJldmlvdXMgcGVuZGluZyBpbnNlcnRpb25zXG5cdFx0XHRVdGlscy5kb21Db21wbGV0ZUNhbmNlbChAX19pbnNlcnRFbGVtZW50KVxuXG5cdFx0XHQjIFJlbW92ZSBmcm9tIHByZXZpb3VzIHBhcmVudCBjaGlsZHJlblxuXHRcdFx0aWYgQF9wYXJlbnRcblx0XHRcdFx0QF9wYXJlbnQuX2NoaWxkcmVuID0gXy5wdWxsIEBfcGFyZW50Ll9jaGlsZHJlbiwgQFxuXHRcdFx0XHRAX3BhcmVudC5fZWxlbWVudC5yZW1vdmVDaGlsZCBAX2VsZW1lbnRcblx0XHRcdFx0QF9wYXJlbnQuZW1pdCBcImNoYW5nZTpjaGlsZHJlblwiLCB7YWRkZWQ6IFtdLCByZW1vdmVkOiBbQF19XG5cdFx0XHRcdEBfcGFyZW50LmVtaXQgXCJjaGFuZ2U6c3ViTGF5ZXJzXCIsIHthZGRlZDogW10sIHJlbW92ZWQ6IFtAXX1cblxuXHRcdFx0IyBFaXRoZXIgaW5zZXJ0IHRoZSBlbGVtZW50IHRvIHRoZSBuZXcgcGFyZW50IGVsZW1lbnQgb3IgaW50byBkb21cblx0XHRcdGlmIGxheWVyXG5cdFx0XHRcdGxheWVyLl9lbGVtZW50LmFwcGVuZENoaWxkIEBfZWxlbWVudFxuXHRcdFx0XHRsYXllci5fY2hpbGRyZW4ucHVzaCBAXG5cdFx0XHRcdGxheWVyLmVtaXQgXCJjaGFuZ2U6Y2hpbGRyZW5cIiwge2FkZGVkOiBbQF0sIHJlbW92ZWQ6IFtdfVxuXHRcdFx0XHRsYXllci5lbWl0IFwiY2hhbmdlOnN1YkxheWVyc1wiLCB7YWRkZWQ6IFtAXSwgcmVtb3ZlZDogW119XG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBfaW5zZXJ0RWxlbWVudCgpXG5cblx0XHRcdG9sZFBhcmVudCA9IEBfcGFyZW50XG5cdFx0XHQjIFNldCB0aGUgcGFyZW50XG5cdFx0XHRAX3BhcmVudCA9IGxheWVyXG5cblx0XHRcdCMgUGxhY2UgdGhpcyBsYXllciBvbiB0b3Agb2YgaXRzIHNpYmxpbmdzXG5cdFx0XHRAYnJpbmdUb0Zyb250KClcblxuXHRcdFx0QGVtaXQgXCJjaGFuZ2U6cGFyZW50XCIsIEBfcGFyZW50LCBvbGRQYXJlbnRcblx0XHRcdEBlbWl0IFwiY2hhbmdlOnN1cGVyTGF5ZXJcIiwgQF9wYXJlbnQsIG9sZFBhcmVudFxuXG5cblx0XG5cdGFkZDogKGNvbnRlbnRWaWV3KSAtPlxuXHRcdGNvbnRlbnRWaWV3LnBhcmVudCA9IEBjdXN0b20udmlldy5jb250ZW50XG5cdFx0QGJhY2tncm91bmRDb2xvciA9IG51bGxcblxuXG5cblxuXG5cblxuXG5cblxuXG5cbmNsYXNzIE5hdmlnYXRpb25WaWV3IGV4dGVuZHMgU2Nyb2xsQ29tcG9uZW50XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0ZmxvdzogbnVsbFxuXHRcdFx0YmFja0J1dHRvbjogbnVsbFxuXHRcdFx0c2hvd0JhY2s6IHRydWVcblx0XHRcdHByZXZlbnRCYWNrU3dpcGU6IGZhbHNlXG5cdFx0XHRzY3JvbGxWZXJ0aWNhbDogdHJ1ZVxuXHRcdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRcdGRpcmVjdGlvbkxvY2s6IHRydWVcblx0XHRcdGN1c3RvbTpcblx0XHRcdFx0YmFja0J1dHRvbl9uYW1lOiBcIkJhY2tfQnV0dG9uXCJcblx0XHRcdFx0Y3VzdG9tQWN0aW9uX0FycmF5OiBbXVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHR0cnkgQGJhY2tCdXR0b24uYnJpbmdUb0Zyb250KClcblxuXHRcdGlmIEBwcmV2ZW50QmFja1N3aXBlID09IGZhbHNlXG5cdFx0XHRAb24gRXZlbnRzLlN3aXBlUmlnaHRTdGFydCwgKGV2ZW50LCBsYXllcikgPT5cblx0XHRcdFx0dHJ5IEBmbG93LnNob3dQcmV2aW91cygpXG5cdFx0XG5cdFx0QG9uIFwiY2hhbmdlOmNoaWxkcmVuXCIsIC0+XG5cdFx0XHR0cnkgQGJhY2tCdXR0b24uYnJpbmdUb0Zyb250KClcblx0XG5cblx0QGRlZmluZSAnZmxvdycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5mbG93XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5mbG93ID0gdmFsdWVcblx0XHRcdHZhbHVlLnNob3dOZXh0KEApXG5cdFx0XHR2YWx1ZS5zaG93UHJldmlvdXMoYW5pbWF0ZTogZmFsc2UpXG5cdFxuXG5cdEBkZWZpbmUgJ3ByZXZlbnRCYWNrU3dpcGUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMucHJldmVudEJhY2tTd2lwZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5wcmV2ZW50QmFja1N3aXBlID0gdmFsdWVcblxuXG5cblx0QGRlZmluZSAnYmFja0J1dHRvbicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5iYWNrQnV0dG9uXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5iYWNrQnV0dG9uID0gdmFsdWVcblx0XHRcdHZhbHVlLm5hbWUgPSBAY3VzdG9tLmJhY2tCdXR0b25fbmFtZVxuXG5cdFx0XHR2YWx1ZS5wYXJlbnQgPSBAXG5cdFx0XHR2YWx1ZS5icmluZ1RvRnJvbnQoKVxuXHRcdFx0XG5cdFx0XHR0cnkgdmFsdWUuaGFuZGxlciA9ICgpID0+XG5cdFx0XHRcdEBmbG93LnNob3dQcmV2aW91cygpXG5cdFx0XHRcdCMgQGZsb3cuaXRlcmF0ZVRocm91Z2hDaGlsZHJlbiBALCBAY3VzdG9tLmN1c3RvbUFjdGlvbl9BcnJheSwgQGZsb3cuY3VzdG9tQWN0aW9uX3N3aXRjaE9mZkxheWVyc1xuXHRcblx0QGRlZmluZSAnc2hvd0JhY2snLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2hvd0JhY2tcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnNob3dCYWNrID0gdmFsdWVcblx0XHRcdGlmIHZhbHVlID09IHRydWUgYW5kIEBiYWNrQnV0dG9uID09IG51bGxcblx0XHRcdFx0QGJhY2tCdXR0b24gPSBAY3JlYXRlX0JhY2tCdXR0b24oKVxuXG5cdFxuXHRjcmVhdGVfQmFja0J1dHRvbjogKCkgPT5cblxuXHRcdHJldHVybiBuZXcgQnV0dG9uXG5cdFx0XHRuYW1lOiBAY3VzdG9tLmJhY2tCdXR0b25fbmFtZVxuXHRcdFx0cGFyZW50OiBALCBzaXplOiA4MCwgeTogMzJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0IyBiYWNrZ3JvdW5kQ29sb3I6IFwicmVkXCJcblx0XHRcdGhhbmRsZXI6ICgpIC0+IEBwYXJlbnQuZmxvdy5zaG93UHJldmlvdXMoKVxuXG5cblx0QGRlZmluZSBcInBhcmVudFwiLFxuXHRcdGVudW1lcmFibGU6IGZhbHNlXG5cdFx0ZXhwb3J0YWJsZTogZmFsc2Vcblx0XHRpbXBvcnRhYmxlOiB0cnVlXG5cblx0XHRnZXQ6IC0+XG5cdFx0XHRAX3BhcmVudCBvciBudWxsXG5cdFx0XG5cdFx0c2V0OiAobGF5ZXIpIC0+XG5cblx0XHRcdHJldHVybiBpZiBsYXllciBpcyBAX3BhcmVudFxuXG5cdFx0XHR0aHJvdyBFcnJvcihcIkxheWVyLnBhcmVudDogYSBsYXllciBjYW5ub3QgYmUgaXQncyBvd24gcGFyZW50LlwiKSBpZiBsYXllciBpcyBAXG5cblx0XHRcdCMgQ2hlY2sgdGhlIHR5cGVcblx0XHRcdGlmIG5vdCBsYXllciBpbnN0YW5jZW9mIExheWVyXG5cdFx0XHRcdHRocm93IEVycm9yIFwiTGF5ZXIucGFyZW50IG5lZWRzIHRvIGJlIGEgTGF5ZXIgb2JqZWN0XCJcblxuXHRcdFx0IyBDYW5jZWwgcHJldmlvdXMgcGVuZGluZyBpbnNlcnRpb25zXG5cdFx0XHRVdGlscy5kb21Db21wbGV0ZUNhbmNlbChAX19pbnNlcnRFbGVtZW50KVxuXG5cdFx0XHQjIFJlbW92ZSBmcm9tIHByZXZpb3VzIHBhcmVudCBjaGlsZHJlblxuXHRcdFx0aWYgQF9wYXJlbnRcblx0XHRcdFx0QF9wYXJlbnQuX2NoaWxkcmVuID0gXy5wdWxsIEBfcGFyZW50Ll9jaGlsZHJlbiwgQFxuXHRcdFx0XHRAX3BhcmVudC5fZWxlbWVudC5yZW1vdmVDaGlsZCBAX2VsZW1lbnRcblx0XHRcdFx0QF9wYXJlbnQuZW1pdCBcImNoYW5nZTpjaGlsZHJlblwiLCB7YWRkZWQ6IFtdLCByZW1vdmVkOiBbQF19XG5cdFx0XHRcdEBfcGFyZW50LmVtaXQgXCJjaGFuZ2U6c3ViTGF5ZXJzXCIsIHthZGRlZDogW10sIHJlbW92ZWQ6IFtAXX1cblxuXHRcdFx0IyBFaXRoZXIgaW5zZXJ0IHRoZSBlbGVtZW50IHRvIHRoZSBuZXcgcGFyZW50IGVsZW1lbnQgb3IgaW50byBkb21cblx0XHRcdGlmIGxheWVyXG5cdFx0XHRcdGxheWVyLl9lbGVtZW50LmFwcGVuZENoaWxkIEBfZWxlbWVudFxuXHRcdFx0XHRsYXllci5fY2hpbGRyZW4ucHVzaCBAXG5cdFx0XHRcdGxheWVyLmVtaXQgXCJjaGFuZ2U6Y2hpbGRyZW5cIiwge2FkZGVkOiBbQF0sIHJlbW92ZWQ6IFtdfVxuXHRcdFx0XHRsYXllci5lbWl0IFwiY2hhbmdlOnN1YkxheWVyc1wiLCB7YWRkZWQ6IFtAXSwgcmVtb3ZlZDogW119XG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBfaW5zZXJ0RWxlbWVudCgpXG5cblx0XHRcdG9sZFBhcmVudCA9IEBfcGFyZW50XG5cdFx0XHQjIFNldCB0aGUgcGFyZW50XG5cdFx0XHRAX3BhcmVudCA9IGxheWVyXG5cblx0XHRcdCMgUGxhY2UgdGhpcyBsYXllciBvbiB0b3Agb2YgaXRzIHNpYmxpbmdzXG5cdFx0XHRAYnJpbmdUb0Zyb250KClcblxuXHRcdFx0QGVtaXQgXCJjaGFuZ2U6cGFyZW50XCIsIEBfcGFyZW50LCBvbGRQYXJlbnRcblx0XHRcdEBlbWl0IFwiY2hhbmdlOnN1cGVyTGF5ZXJcIiwgQF9wYXJlbnQsIG9sZFBhcmVudFxuXG5cdFx0XHRAd2lkdGggPSBAcGFyZW50LndpZHRoXG5cdFx0XHRAaGVpZ2h0ID0gQHBhcmVudC5oZWlnaHRcblxuXHRcdFx0QGZsb3cgPSBAcGFyZW50XG5cblx0XG5cblxuXHRhZGQ6IChjb250ZW50VmlldykgLT5cblx0XHRjb250ZW50Vmlldy5wYXJlbnQgPSBAY29udGVudFxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSB7IEZsb3dWaWV3LCBOYXZpZ2F0aW9uVmlldywgTW9kYWxWaWV3IH0iLCJcbiMgU1ZHID0gcmVxdWlyZSBcIlBDU1ZHXCJcblxuY2xhc3MgVGV4dCBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHQjIGZvbnRGYW1pbHk6IGZvbnRBdmVyaWFcblx0XHRcdGZvbnRTaXplOiAxOFxuXHRcdFx0d2VpZ2h0OiA3MDBcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdGhlaWdodDogMjBcblx0XHRcdGxldHRlclNwYWNpbmc6IDAuN1xuXHRcdFx0bGV0dGVyU3BhY2luZzogMC40XG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBzdHlsZSA9XG5cdFx0XHRcImZvbnQtZmFtaWx5XCI6IFwiJ1NGIFBybyBUZXh0JywgJ1BUIFNhbnMnLCAnSGVsdmV0aWNhJywgJ1RhaG9tYScsIHNhbnMtc2VyaWY7XCJcblx0XHRcdFwiZm9udC13ZWlnaHRcIjogNzAwXG5cdFx0XHRcIi13ZWJraXQtZm9udC1mZWF0dXJlLXNldHRpbmdzXCI6IFwiJ3NzMDInIG9uLCAnc3MwNicgb24sICdzczA5JyBvbiwgJ3NzMTEnIG9uO1wiXG5cdFx0XHRcIi1tb3otZm9udC1mZWF0dXJlLXNldHRpbmdzXCI6IFwiJ3NzMDInIG9uLCAnc3MwNicgb24sICdzczA5JyBvbiwgJ3NzMTEnIG9uO1wiXG5cdFx0XHRcIi1tcy1mb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcdFwiZm9udC1mZWF0dXJlLXNldHRpbmdzXCI6IFwiJ3NzMDInIG9uLCAnc3MwNicgb24sICdzczA5JyBvbiwgJ3NzMTEnIG9uO1wiXG5cdFx0XG5cblxuXG5jbGFzcyBUZXh0QnV0dG9uIGV4dGVuZHMgVGV4dFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR0dXBsZTogeyBub3JtYWw6IDAuNSwgaG92ZXI6IDAuOCB9XG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEBzdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcblx0XHRALm9uTW91c2VPdmVyIEBIb3ZlclxuXHRcdEAub25Nb3VzZU91dCBASG92ZXJPZmZcblxuXHRcdEB1cGRhdGVUdXBsZShAdHVwbGUpXG5cdFxuXHRcblx0XHRcblx0SG92ZXI6ID0+XG5cdFx0QG9wYWNpdHkgPSBAdHVwbGUuaG92ZXJcblx0SG92ZXJPZmY6ID0+XG5cdFx0QG9wYWNpdHkgPSBAdHVwbGUubm9ybWFsXG5cdFxuXHR1cGRhdGVUdXBsZTogKG5ld1R1cGxlKSA9PlxuXHRcdEB0dXBsZSA9IG5ld1R1cGxlXG5cdFx0QGVtaXQgRXZlbnRzLk1vdXNlT3ZlclxuXHRcdEBlbWl0IEV2ZW50cy5Nb3VzZU91dFxuXHRcblx0XG5cdEBkZWZpbmUgJ2hhbmRsZXInLFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb24oRXZlbnRzLlRhcCwgdmFsdWUpXG5cdFxuXHRAZGVmaW5lICd0dXBsZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50dXBsZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMudHVwbGUgPSB2YWx1ZVxuXG5cblxuY2xhc3MgQnV0dG9uIGV4dGVuZHMgVGV4dFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cdFx0XHRoZWlnaHQ6IDMyLCBib3JkZXJSYWRpdXM6IDhcblx0XHRcdHBhZGRpbmc6IHsgdG9wOiA2LCBib3R0b206IDcsIGxlZnQ6IDksIHJpZ2h0OiA5IH1cblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuNylcIlxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QHNob3dIaW50ID0gLT4gO1xuXHRcdEBzdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcblx0XHRALm9uTW91c2VPdmVyIEBIb3ZlclxuXHRcdEAub25Nb3VzZU91dCBASG92ZXJPZmZcblx0XHRcblx0SG92ZXI6ID0+XG5cdFx0QGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjQpXCJcblx0SG92ZXJPZmY6ID0+XG5cdFx0QGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjcpXCJcblx0XG5cdEBkZWZpbmUgJ2hhbmRsZXInLFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb24oRXZlbnRzLlRhcCwgdmFsdWUpXG5cblxuY2xhc3MgQnV0dG9uVGFiIGV4dGVuZHMgQnV0dG9uXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHNlbGVjdGVkOiB0cnVlXG5cdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0SG92ZXI6ID0+XG5cdFx0QGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjQpXCJcblx0SG92ZXJPZmY6ID0+XG5cdFx0aWYgQHNlbGVjdGVkIHRoZW4gQGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjcpXCJcblx0XHRlbHNlIEBiYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsMC4yKVwiXG5cblx0QGRlZmluZSAnc2VsZWN0ZWQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2VsZWN0ZWRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnNlbGVjdGVkID0gdmFsdWVcblx0XHRcdGlmIHZhbHVlIHRoZW4gQGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjcpXCJcblx0XHRcdGVsc2UgQGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjIpXCJcblxuXG4jIEJ1dHRvbjogU1ZHXG5cbiMgY2xhc3MgU1ZHQnV0dG9uIGV4dGVuZHMgVGV4dEJ1dHRvblxuIyBcdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG4jIFx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuIyBcdFx0XHR0ZXh0OiBcIlwiXG4jIFx0XHRcdGFzc2V0OiBudWxsXG4jIFx0XHRcdGNsaXA6IGZhbHNlXG4jIFx0XHRcdGF1dG9TaXplOiBmYWxzZVxuXHRcdFxuIyBcdFx0QHN2Z1NoYXBlID0gbmV3IFNWR0xheWVyXG4jIFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJudWxsXCIsIG5hbWU6IFwic3ZnU2hhcGVcIlxuXHRcdFxuIyBcdFx0c3VwZXIgQG9wdGlvbnNcbiMgXHRcdEBzdmdTaGFwZS5wYXJlbnQgPSBAXG4jIFx0XHRAdXBkYXRlU1ZHU2l6ZSgpXG5cdFxuXHRcbiMgXHRAZGVmaW5lICdhc3NldCcsXG4jIFx0XHRnZXQ6IC0+IEBvcHRpb25zLmFzc2V0XG4jIFx0XHRzZXQ6ICh2YWx1ZSkgLT5cbiMgXHRcdFx0QG9wdGlvbnMuYXNzZXQgPSB2YWx1ZVxuIyBcdFx0XHRAc3ZnU2hhcGUuc3RhdGVzID1cbiMgXHRcdFx0XHRcIm9uRGFya1wiOiB7IHN2ZzogdmFsdWUub25EYXJrIH1cbiMgXHRcdFx0XHRcIm9uTGlnaHRcIjogeyBzdmc6IHZhbHVlLm9uTGlnaHQgfVxuIyBcdFx0XHRAc3ZnU2hhcGUuc3RhdGVTd2l0Y2goXCJvbkRhcmtcIilcblx0XG4jIFx0dXBkYXRlU1ZHU2l6ZTogKCkgPT5cbiMgXHRcdEBzdmdTaGFwZS53aWR0aCA9IEB3aWR0aFxuIyBcdFx0QHN2Z1NoYXBlLmhlaWdodCA9IEBoZWlnaHRcblx0XG5cblxuXG5cbiMgQnV0dG9uOiBDb3B5XG5cbiMgY2xhc3MgQ29weUJ1dHRvbiBleHRlbmRzIFRleHRCdXR0b25cbiMgXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuIyBcdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcbiMgXHRcdFx0bGluazogXCJodHRwczovL3RpbGxsdXIuY29tXCJcbiMgXHRcdFx0aGFuZGxlcjogQGNvcHlIYW5kbGVyXG5cdFx0XG4jIFx0XHRAYXJlYSA9IG5ldyBMYXllclxuIyBcdFx0XHRvcGFjaXR5OiAwLCB4OiAtMzAwMCwgaHRtbDogbnVsbFxuXHRcdFxuIyBcdFx0c3VwZXIgQG9wdGlvbnNcbiMgXHRcdEBhcmVhLnBhcmVudCA9IEBcblx0XG5cdFxuIyBcdEBkZWZpbmUgJ2xpbmsnLFxuIyBcdFx0Z2V0OiAtPiBAb3B0aW9ucy5saW5rXG4jIFx0XHRzZXQ6ICh2YWx1ZSkgLT5cbiMgXHRcdFx0QG9wdGlvbnMubGluayA9IHZhbHVlXG4jIFx0XHRcdEB1cGRhdGUodmFsdWUpXG5cdFxuXHRcbiMgXHR1cGRhdGU6IChsaW5rKSA9PlxuIyBcdFx0QGFyZWEuaHRtbCA9IFwiPHRleHRhcmVhIGNsYXNzPSdqcy1jb3B5dGV4dGFyZWEtY2xhc3MnIHN0eWxlPSdvcGFjaXR5OjA7Jz4je2xpbmt9PC90ZXh0YXJlYT5cIlxuXHRcblx0XG4jIFx0Y29weUhhbmRsZXI6ID0+XG4jIFx0XHR0ZXh0RGl2ID0gQGFyZWEucXVlcnlTZWxlY3RvcignLmpzLWNvcHl0ZXh0YXJlYS1jbGFzcycpXG4jIFx0XHR0ZXh0RGl2LmZvY3VzKClcbiMgXHRcdHRleHREaXYuc2VsZWN0KClcbiMgXHRcdGRvY3VtZW50LmV4ZWNDb21tYW5kICdjb3B5J1xuXHRcdFxuIyBcdFx0b3JpZ2luVGl0bGUgPSBAdGV4dFxuIyBcdFx0QHRleHQgPSBcIkRvbmUg8J+RjFwiXG4jIFx0XHRVdGlscy5kZWxheSAxLCA9PiBAdGV4dCA9IG9yaWdpblRpdGxlXG5cblxuXG5cbiMgIyAjIEJ1dHRvbjogQ29weVxuXG4jICMgY2xhc3MgTGlua0J1dHRvbiBleHRlbmRzIFNWR0J1dHRvblxuIyAjIFx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcbiMgIyBcdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcbiMgIyBcdFx0XHRsaW5rOiBcImh0dHBzOi8vdGlsbGx1ci5jb21cIlxuIyAjIFx0XHRcdGJvcmRlcldpZHRoOiAxICogMlxuIyAjIFx0XHRcdGJvcmRlclJhZGl1czogMjAgKiAyXG4jICMgXHRcdFx0dHVwbGU6IHsgbm9ybWFsOiAxLjAsIGhvdmVyOiAwLjggfVxuXHRcdFx0XG5cdFx0XG4jICMgXHRcdEB0aW50QnV0dG9uRml4ID0gbmV3IExheWVyXG4jICMgXHRcdFx0aGVpZ2h0OiAxMjAgKiAyXG4jICMgXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG4jICMgXHRcdEBidXR0b25UZXh0ID0gbmV3IFRleHRcbiMgIyBcdFx0XHRmb250U2l6ZTogMzIgKiAyXG4jICMgXHRcdFx0dGV4dEFsaWduOiBcInJpZ2h0XCJcbiMgIyBcdFx0XHRoZWlnaHQ6IDYwICogMlxuXHRcdFxuIyAjIFx0XHRAYnV0dG9uSWNvbiA9IG5ldyBTVkdMYXllclxuIyAjIFx0XHRcdHdpZHRoOiAyNCAqIDIsIGhlaWdodDogMjQgKiAyXG4jICMgXHRcdFx0c3ZnOiBTVkcub3Blbkljb24ub25MaWdodFxuIyAjIFx0XHRcdG9wYWNpdHk6IDAuNlxuXHRcdFx0XG5cblx0XHRcbiMgIyBcdFx0c3VwZXIgQG9wdGlvbnNcblxuIyAjIFx0XHRAYnV0dG9uVGV4dC50ZXh0ID0gQHRleHRcbiMgIyBcdFx0QHRleHQgPSBcIlwiXG5cbiMgIyBcdFx0QHRpbnRCdXR0b25GaXgucGFyZW50ID0gQHBhcmVudFxuIyAjIFx0XHRAdGludEJ1dHRvbkZpeC54ID0gQWxpZ24ucmlnaHRcbiMgIyBcdFx0QHRpbnRCdXR0b25GaXgueSA9IEFsaWduLnRvcFxuXHRcdFxuIyAjIFx0XHRAcGFyZW50ID0gQHRpbnRCdXR0b25GaXhcbiMgIyBcdFx0QHkgPSBBbGlnbi50b3AoMzAgKiAyKVxuIyAjIFx0XHRAaGVpZ2h0ID0gNjAgKiAyXG5cbiMgIyBcdFx0QGJ1dHRvblRleHQucGFyZW50ID0gQFxuIyAjIFx0XHRAYnV0dG9uVGV4dC54ID0gMTYgKiAyXG4jICMgXHRcdEBidXR0b25UZXh0LnkgPSA5ICogMlxuXG4jICMgXHRcdEBidXR0b25JY29uLnBhcmVudCA9IEBcbiMgIyBcdFx0QGJ1dHRvbkljb24ueCA9IDE2ICogMiArIEBidXR0b25UZXh0LndpZHRoICsgMTYgKiAyXG4jICMgXHRcdEBidXR0b25JY29uLnkgPSBBbGlnbi5jZW50ZXIoMyAqIDIpXG5cbiMgIyBcdFx0QHdpZHRoID0gMTYgKiAyICsgQGJ1dHRvblRleHQud2lkdGggKyBAYnV0dG9uSWNvbi53aWR0aCArIDE2ICogMiArIDE2ICogMlxuIyAjIFx0XHRAdGludEJ1dHRvbkZpeC53aWR0aCA9IEB3aWR0aCArIDMwICogMiArIDE2ICogMlxuXG4jICMgXHRcdEB0aW50QnV0dG9uRml4LnggPSBBbGlnbi5yaWdodFxuIyAjIFx0XHRAeCA9IEFsaWduLnJpZ2h0KC0zMCAqIDIpXG5cdFx0XG5cdFxuXG4jICMgXHRAZGVmaW5lICdsaW5rJyxcbiMgIyBcdFx0Z2V0OiAtPiBAb3B0aW9ucy5saW5rXG4jICMgXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5saW5rID0gdmFsdWVcblx0XG4jICMgXHRzZXRDb2xvcjogKGNvbG9yID0gbnVsbCkgPT5cbiMgIyBcdFx0aWYgY29sb3IgPT0gbnVsbCB0aGVuIHJldHVyblxuIyAjIFx0XHRAdGludEJ1dHRvbkZpeC5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvclxuXHRcblxuXG5cblxuXG5cblxuXG4jIGNsYXNzIFByZXZpZXdCdXR0b24gZXh0ZW5kcyBUZXh0XG4jIFx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuIyBcdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcbiMgXHRcdFx0dHVwbGU6IHsgbm9ybWFsOiAxLjAsIGhvdmVyOiAwLjggfVxuXHRcdFxuIyBcdFx0c3VwZXIgQG9wdGlvbnNcblxuIyBcdFx0QHJlbW92ZUFsbExpc3RlbmVycygpXG5cbiMgXHRcdEAub25Nb3VzZU92ZXIgQEhvdmVyXG4jIFx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cbiMgXHRIb3ZlcjogPT5cbiMgXHRcdCMgQHNjYWxlID0gMS4wNVxuIyBcdFx0QG9wYWNpdHkgPSAxLjBcblx0XG4jIFx0SG92ZXJPZmY6ID0+XG4jIFx0XHQjIEBzY2FsZSA9IDEuMFxuIyBcdFx0QG9wYWNpdHkgPSAwLjhcblxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSB7VGV4dCwgVGV4dEJ1dHRvbiwgQnV0dG9uLCBCdXR0b25UYWJ9XG5cblxuIiwiXG5cbntJbml0Vmlld30gPSByZXF1aXJlIFwiSW5pdFZpZXdcIlxuXG5vdmVycmlkZVRpbWVWYWx1ZSA9IFwiMjA6MjFcIlxuXG5jbGFzcyBleHBvcnRzLlBob25lVHlwZVZpZXcgZXh0ZW5kcyBJbml0Vmlld1xuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHN0YXR1c0JhcjogXCJkYXJrXCIgIyBsaWdodC9kYXJrXG5cdFx0XHRob21lQmFyOiBcImRhcmtcIiAjIGxpZ2h0L2RhcmtcblxuXHRcdFx0dmlzaWJsZTogdHJ1ZSAjIHRydWUgLyBmYWxzZVxuXHRcdFx0Zm9yY2VBbmRyb2lkQmFyOiBmYWxzZSAjIHRydWUgLyBmYWxzZVxuXG5cdFx0XHQjIG92ZXJyaWRlIHdpdGggY2FyZVxuXHRcdFx0cHJvdG90eXBlQ3JlYXRpb25ZZWFyOiBvdmVycmlkZVRpbWVWYWx1ZVxuXG5cdFx0XHQjIGdldHRlcnNcblx0XHRcdHN0YXR1c0JhclZpZXc6IG51bGxcblx0XHRcdGhvbWVCYXJWaWV3OiBudWxsXG5cdFx0XHRcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcblxuXG5cdEBkZWZpbmUgJ3N0YXR1c0JhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zdGF0dXNCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc3RhdHVzQmFyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2hvbWVCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaG9tZUJhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ob21lQmFyID0gdmFsdWVcblxuXHRAZGVmaW5lICdmb3JjZUFuZHJvaWRCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZm9yY2VBbmRyb2lkQmFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZEJhciA9IHZhbHVlXG5cdFxuXG5cdEBkZWZpbmUgJ3Nob3dCYXJzJyxcblx0XHRnZXQ6IC0+IGlmIEBvcHRpb25zLnZpc2libGUgdGhlbiByZXR1cm4gMSBlbHNlIHJldHVybiAwXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnZpc2libGUgPSB2YWx1ZVxuXG5cdCMgZGVwcmVjYXRlZFxuXHRAZGVmaW5lICd2aXNpYmxlJyxcblx0XHRnZXQ6IC0+IGlmIEBvcHRpb25zLnZpc2libGUgdGhlbiByZXR1cm4gMSBlbHNlIHJldHVybiAwXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnZpc2libGUgPSB2YWx1ZVxuXHRcblxuXG5cdEBkZWZpbmUgJ3Byb3RvdHlwZUNyZWF0aW9uWWVhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5wcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyID0gdmFsdWVcblxuXG5cblx0QGRlZmluZSAnc3RhdHVzQmFyVmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zdGF0dXNCYXJWaWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnN0YXR1c0JhclZpZXcgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnaG9tZUJhclZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaG9tZUJhclZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuaG9tZUJhclZpZXcgPSB2YWx1ZVxuXG5cblxuXG5cdCMgQ3JlYXRlIEJhcnNcblxuXHRjcmVhdGVCYXJzOiAoKSA9PlxuXHRcdEBzdGF0dXNCYXJWaWV3ID0gbmV3IExheWVyIFxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogQHdpZHRoLCB5OiBBbGlnbi50b3AsIG5hbWU6IFwiLnN0YXR1cyBiYXJcIlxuXHRcdFx0b3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGlmIEBmb3JjZUFuZHJvaWRCYXJcblx0XHRcdEBjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0JhcihAc3RhdHVzQmFyVmlldykgXG5cblx0XHRlbHNlIGlmIEB2aWV3U2l6ZSgzNzUsIDgxMikgb3IgQHZpZXdTaXplKDM5MCwgODQ0KSBvciBAdmlld1NpemUoNDE0LCA4OTYpIG9yIEB2aWV3U2l6ZSg0MjgsIDkyNikgb3IgQHZpZXdTaXplKDM2MCwgNzgyKVxuXHRcdFx0QGNyZWF0ZU5vdGNoU3RhdHVzQmFyKEBzdGF0dXNCYXJWaWV3KVxuXHRcdFx0QGNyZWF0ZUhvbWVJbmRpY2F0b3IgbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogQCwgd2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiAzNCwgeTogQWxpZ24uYm90dG9tLCBuYW1lOiBcIi5ob21lIGJhclwiLCBvcGFjaXR5OiBAdmlzaWJsZSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0ZWxzZSBpZiBAdmlld1NpemUoMzkzLCA4NTIpXG5cdFx0XHRwcmludCBcIm9rXCJcblx0XHRcdEBjcmVhdGVOb3RjaFN0YXR1c0JhcihAc3RhdHVzQmFyVmlldylcblx0XHRcdEBjcmVhdGVIb21lSW5kaWNhdG9yIG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiBAd2lkdGgsIGhlaWdodDogMzQsIHk6IEFsaWduLmJvdHRvbSwgbmFtZTogXCIuaG9tZSBiYXJcIiwgb3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM3NSwgNjY3KSBvciBAdmlld1NpemUoNDE0LCA3MzYpIG9yIEB2aWV3U2l6ZSgzMjAsIDU2OClcblx0XHRcdEBjcmVhdGVDbGFzc2ljU3RhdHVzQmFyKEBzdGF0dXNCYXJWaWV3KVxuXHRcdFxuXHRcdFxuXHRcdGVsc2UgQGNyZWF0ZUFuZHJvaWRTdGF0dXNCYXIoQHN0YXR1c0JhclZpZXcpXG5cdFxuXHRcblx0XG5cdFxuXG5cblxuXHRjcmVhdGVBbmRyb2lkU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gMzJcblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDUyLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5sZWZ0KDQpLCB5OiBBbGlnbi50b3AoMiArIDUpXG5cdFx0XHRjb2xvcjogQGFzc2V0cy5jb2xvcltAc3RhdHVzQmFyXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTQsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ucmlnaHQoLTQpLCB5OiBBbGlnbi50b3AoNSlcblx0XHRcdGltYWdlOiBAYXNzZXRzLmFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlW0BzdGF0dXNCYXJdXG5cdFxuXHRcblx0Y3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTIsIGhlaWdodDogMjAsIHg6IEFsaWduLmxlZnQsIHk6IEFsaWduLnRvcCgyKVxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbQHN0YXR1c0Jhcl0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDE0LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogMjAsIHg6IEFsaWduLnJpZ2h0LCB5OiBBbGlnbi50b3AoKVxuXHRcdFx0aW1hZ2U6IEBhc3NldHMuYW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHN0YXR1c0Jhcl1cblx0XG5cdFxuXG5cblxuXHRjcmVhdGVDbGFzc2ljU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gMjBcblx0XHRcblx0XHRjbGFzc2ljTGVmdENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLmxlZnRcblx0XHRcdGltYWdlOiBAYXNzZXRzLm9sZFN0YXR1c0JhckxlZnRJbWFnZVtAc3RhdHVzQmFyXVxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTQsIGhlaWdodDogMTYsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRjb2xvcjogQGFzc2V0cy5jb2xvcltAc3RhdHVzQmFyXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5vbGRTdGF0dXNCYXJSaWdodEltYWdlW0BzdGF0dXNCYXJdXG5cdFx0XG5cdFxuXHRjcmVhdGVOb3RjaFN0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDQ0XG5cdFx0XG5cdFx0bm90Y2hMZWZ0Q29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDU0LCBoZWlnaHQ6IDIxLCB4OiBBbGlnbi5sZWZ0KDIxKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbQHN0YXR1c0Jhcl0sIGJhY2tncm91bmRDb2xvcjogbnVsbCwgbGV0dGVyU3BhY2luZzogLTAuMTdcblx0XHRcdGZvbnRTaXplOiAxNSwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdG5vdGNoQ2VudGVyQ29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMzc1LCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24uY2VudGVyXG5cdFx0XHRpbWFnZTogQGFzc2V0cy5ub3RjaFxuXHRcdFxuXHRcdG5vdGNoUmlnaHRDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5yaWdodFxuXHRcdFx0aW1hZ2U6IEBhc3NldHMuc3RhdHVzQmFyUmlnaHRJbWFnZVtAc3RhdHVzQmFyXVxuXHRcblx0XG5cdFxuXG5cblxuXHRjcmVhdGVIb21lSW5kaWNhdG9yOiAoYmFyTGF5ZXIpID0+XG5cdFx0QGhvbWVCYXJWaWV3ID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi5ob21lVmlld1wiXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTM1LCBoZWlnaHQ6IDUsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uYm90dG9tKC04KVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBAYXNzZXRzLmNvbG9yW0Bob21lQmFyXSwgYm9yZGVyUmFkaXVzOiAyMFxuXHRcblx0IiwiXG5cbkFzc2V0cyA9IHJlcXVpcmUgXCJQcmV2aWV3X0Fzc2V0c1wiXG5cblxuIyBkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9IFwiYXV0b1wiXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld0NsYXNzMSBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0bmFtZTogXCJQcmV2aWV3XCJcblx0XHRcdHZpZXc6IG51bGxcblx0XHRcdFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRib3JkZXJSYWRpdXM6IDQyXG5cdFx0XHRcblx0XHRcdGFzc2V0czogQXNzZXRzLmRhdGFcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cblx0XHR3aW5kb3cuc2F2ZVByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0KEApXG5cdFx0XG5cdFx0QHN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IHNjYWxlOiAxIH1cblx0XHRcdFwiZmlsbFwiOiB7IHNjYWxlOiAxIH1cblx0XHRcblx0XHRcblx0XHRcblxuXHRcblxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnZpZXcgPSB2YWx1ZVxuXHRcdFx0QHdpZHRoID0gQHZpZXcud2lkdGhcblx0XHRcdEBoZWlnaHQgPSBAdmlldy5oZWlnaHRcblx0XHRcdEB2aWV3LnBhcmVudCA9IEBcblxuXHRAZGVmaW5lICdhc3NldHMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYXNzZXRzXG5cblxuXG5cblxuXHRzY3JlZW5TaXplOiAodywgaCkgPT4gcmV0dXJuIFNjcmVlbi53aWR0aCA9PSB3IGFuZCBTY3JlZW4uaGVpZ2h0ID09IGhcblx0dmlld1NpemU6ICh3LCBoKSA9PiByZXR1cm4gQHdpZHRoID09IHcgYW5kIEBoZWlnaHQgPT0gaFxuXHR2aWV3V2lkdGg6ICh3KSA9PiByZXR1cm4gQHdpZHRoID09IHdcblxuXHRsb2dTaXplOiAoKSA9PlxuXHRcdG5ldyBUZXh0TGF5ZXIgeyB0ZXh0OiBcIiN7U2NyZWVuLndpZHRofXgje1NjcmVlbi5oZWlnaHR9XCIsIHk6IEFsaWduLmNlbnRlciB9XHRcblxuXG5cblx0YW5pbWF0ZVN0YXRlVG9Ob3JtYWw6ICgpID0+XG5cdFx0QGFuaW1hdGUoXCJub3JtYWxcIiwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcblx0YW5pbWF0ZVN0YXRlVG9GaWxsOiAoKSA9PlxuXHRcdEBhbmltYXRlKFwiZmlsbFwiLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFxuXHRzdGF0ZVN3aXRjaFRvTm9ybWFsOiAoKSA9PlxuXHRcdEBzdGF0ZVN3aXRjaChcIm5vcm1hbFwiKVxuXHRcblx0c3RhdGVTd2l0Y2hUb0ZpbGw6ICgpID0+XG5cdFx0QHN0YXRlU3dpdGNoKFwiZmlsbFwiKVxuXG5cblx0XHRcbiIsIlxuXG57UHJldmlld0NsYXNzMX0gPSByZXF1aXJlIFwiUHJldmlld0NsYXNzMVwiXG5cblxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3Q2xhc3MyIGV4dGVuZHMgUHJldmlld0NsYXNzMVxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHN0YXR1c0JhcjogXCJkYXJrXCIgIyBsaWdodC9kYXJrXG5cdFx0XHRob21lQmFyOiBcImRhcmtcIiAjIGxpZ2h0L2RhcmtcblxuXHRcdFx0dmlzaWJsZTogdHJ1ZSAjIHRydWUgLyBmYWxzZVxuXHRcdFx0Zm9yY2VBbmRyb2lkQmFyOiBmYWxzZSAjIHRydWUgLyBmYWxzZVxuXG5cdFx0XHQjIG92ZXJyaWRlIHdpdGggY2FyZVxuXHRcdFx0cHJvdG90eXBlQ3JlYXRpb25ZZWFyOiBcIjIwOjIwXCJcblx0XHRcdFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFxuXG5cblx0QGRlZmluZSAnc3RhdHVzQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnN0YXR1c0JhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zdGF0dXNCYXIgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnaG9tZUJhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ob21lQmFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmhvbWVCYXIgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgJ2ZvcmNlQW5kcm9pZEJhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuZm9yY2VBbmRyb2lkQmFyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3Zpc2libGUnLFxuXHRcdGdldDogLT4gaWYgQG9wdGlvbnMudmlzaWJsZSB0aGVuIHJldHVybiAxIGVsc2UgcmV0dXJuIDBcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudmlzaWJsZSA9IHZhbHVlXG5cdFxuXG5cblx0QGRlZmluZSAncHJvdG90eXBlQ3JlYXRpb25ZZWFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5wcm90b3R5cGVDcmVhdGlvblllYXIgPSB2YWx1ZVxuXG5cblxuXG5cblx0IyBDcmVhdGUgQmFyc1xuXG5cdGNyZWF0ZUJhcnM6ICgpID0+XG5cdFx0dG9wQmFyID0gbmV3IExheWVyIFxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogQHdpZHRoLCB5OiBBbGlnbi50b3AsIG5hbWU6IFwiLnN0YXR1cyBiYXJcIlxuXHRcdFx0b3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGlmIEB2aWV3U2l6ZSgzNzUsIDgxMikgb3IgQHZpZXdTaXplKDM5MCwgODQ0KSBvciBAdmlld1NpemUoNDE0LCA4OTYpIG9yIEB2aWV3U2l6ZSg0MjgsIDkyNikgb3IgQHZpZXdTaXplKDM2MCwgNzgyKVxuXHRcdFx0QGNyZWF0ZU5vdGNoU3RhdHVzQmFyKHRvcEJhcilcblx0XHRcdEBjcmVhdGVIb21lSW5kaWNhdG9yIG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiBAd2lkdGgsIGhlaWdodDogMzQsIHk6IEFsaWduLmJvdHRvbSwgbmFtZTogXCIuaG9tZSBiYXJcIiwgb3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM3NSwgNjY3KSBvciBAdmlld1NpemUoNDE0LCA3MzYpIG9yIEB2aWV3U2l6ZSgzMjAsIDU2OClcblx0XHRcdEBjcmVhdGVDbGFzc2ljU3RhdHVzQmFyKHRvcEJhcilcblx0XHRcblx0XHRlbHNlIGlmIEBmb3JjZUFuZHJvaWRCYXJcblx0XHRcdEBjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0Jhcih0b3BCYXIpIFxuXHRcdFxuXHRcdGVsc2UgQGNyZWF0ZUFuZHJvaWRTdGF0dXNCYXIodG9wQmFyKVxuXHRcblx0XG5cdFxuXHRcblxuXG5cblx0Y3JlYXRlQW5kcm9pZFN0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDMyXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1MiwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ubGVmdCg0KSwgeTogQWxpZ24udG9wKDIgKyA1KVxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbQHN0YXR1c0Jhcl0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDE0LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogMjAsIHg6IEFsaWduLnJpZ2h0KC00KSwgeTogQWxpZ24udG9wKDUpXG5cdFx0XHRpbWFnZTogQGFzc2V0cy5hbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZVtAc3RhdHVzQmFyXVxuXHRcblx0XG5cdGNyZWF0ZUNsYXNzaWNBbmRyb2lkU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gMjBcblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDUyLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5sZWZ0LCB5OiBBbGlnbi50b3AoMilcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0BzdGF0dXNCYXJdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxNCwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5yaWdodCwgeTogQWxpZ24udG9wKClcblx0XHRcdGltYWdlOiBAYXNzZXRzLmFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlW0BzdGF0dXNCYXJdXG5cdFxuXHRcblxuXG5cblx0Y3JlYXRlQ2xhc3NpY1N0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDIwXG5cdFx0XG5cdFx0Y2xhc3NpY0xlZnRDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5sZWZ0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5vbGRTdGF0dXNCYXJMZWZ0SW1hZ2VbQHN0YXR1c0Jhcl1cblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDU0LCBoZWlnaHQ6IDE2LCB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbQHN0YXR1c0Jhcl0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5yaWdodFxuXHRcdFx0aW1hZ2U6IEBhc3NldHMub2xkU3RhdHVzQmFyUmlnaHRJbWFnZVtAc3RhdHVzQmFyXVxuXHRcdFxuXHRcblx0Y3JlYXRlTm90Y2hTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSA0NFxuXHRcdFxuXHRcdG5vdGNoTGVmdENvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1NCwgaGVpZ2h0OiAyMSwgeDogQWxpZ24ubGVmdCgyMSksIHk6IEFsaWduLnRvcCgxMilcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0BzdGF0dXNCYXJdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGwsIGxldHRlclNwYWNpbmc6IC0wLjE3XG5cdFx0XHRmb250U2l6ZTogMTUsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRub3RjaENlbnRlckNvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDM3NSwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLmNlbnRlclxuXHRcdFx0aW1hZ2U6IEBhc3NldHMubm90Y2hcblx0XHRcblx0XHRub3RjaFJpZ2h0Q29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24ucmlnaHRcblx0XHRcdGltYWdlOiBAYXNzZXRzLnN0YXR1c0JhclJpZ2h0SW1hZ2VbQHN0YXR1c0Jhcl1cblx0XG5cdFxuXHRcblxuXG5cblx0Y3JlYXRlSG9tZUluZGljYXRvcjogKGJhckxheWVyKSA9PlxuXHRcdGhvbWVJbmRpY2F0b3IgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMzUsIGhlaWdodDogNSwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5ib3R0b20oLTgpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBhc3NldHMuY29sb3JbQGhvbWVCYXJdLCBib3JkZXJSYWRpdXM6IDIwXG5cdFxuXHQiLCJcblxue1ByZXZpZXdDbGFzczN9ID0gcmVxdWlyZSBcIlByZXZpZXdDbGFzczNcIlxuXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld0NsYXNzMzUgZXh0ZW5kcyBQcmV2aWV3Q2xhc3MzXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0Ym9yZGVyVmlldzogbnVsbFxuXHRcdFx0c2hvd0RldmljZTogZmFsc2Vcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QGJvcmRlclZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIwMDBcIlxuXHRcdFx0Ym9yZGVyUmFkaXVzOiBAYm9yZGVyUmFkaXVzICsgMTZcblx0XHRcdG9wYWNpdHk6IDFcblxuXHRcdEBib3JkZXJWaWV3LnNlbmRUb0JhY2soKVxuXHRcdCMgaWYgQHNob3dEZXZpY2UgdGhlbiBAc2hvd0JvcmRlclZpZXcoKVxuXG5cdFx0QGluaXRCb3JkZXJWaWV3Q3NzKClcblx0XHRAdXBkYXRlQm9yZGVyVmlldygpXG5cblx0XHRAb24gXCJjaGFuZ2U6c2l6ZVwiLCAtPlxuXHRcdFx0QHVwZGF0ZUJvcmRlclZpZXcoKVxuXHRcdFxuXHRcdEBvbiBcImNoYW5nZTpzY2FsZVwiLCAtPlxuXHRcdFx0QHVwZGF0ZUJvcmRlclZpZXcoKVxuXHRcdFxuXHRcdEBvbiBcImNoYW5nZTp4XCIsIC0+XG5cdFx0XHRAdXBkYXRlQm9yZGVyVmlldygpXG5cdFx0XG5cdFx0QG9uIFwiY2hhbmdlOnlcIiwgLT5cblx0XHRcdEB1cGRhdGVCb3JkZXJWaWV3KClcblx0XHRcblxuXHRcblx0QGRlZmluZSAnYm9yZGVyVmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ib3JkZXJWaWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmJvcmRlclZpZXcgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnc2hvd0RldmljZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93RGV2aWNlXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNob3dEZXZpY2UgPSB2YWx1ZVxuXHRcblx0XG5cblxuXHRzaG93Qm9yZGVyVmlldzogKCkgPT5cblx0XHRAYm9yZGVyVmlldy5vcGFjaXR5ID0gMVxuXHRcblx0aGlkZUJvcmRlclZpZXc6ICgpID0+XG5cdFx0QGJvcmRlclJhZGl1cy5vcGFjaXR5ID0gMFxuXG5cdHVwZGF0ZUJvcmRlclZpZXc6ICgpID0+XG5cdFx0ZGVsdGFHID0gMTZcblxuXHRcdCMgQGJvcmRlclZpZXcueCA9IEB4IC0gZGVsdGFHXG5cdFx0IyBAYm9yZGVyVmlldy55ID0gQHkgLSBkZWx0YUdcblx0XHRAYm9yZGVyVmlldy53aWR0aCA9IEB3aWR0aCArIGRlbHRhRyAqIDJcblx0XHRAYm9yZGVyVmlldy5oZWlnaHQgPSBAaGVpZ2h0ICsgZGVsdGFHICogMlxuXHRcdEBib3JkZXJWaWV3LnggPSBBbGlnbi5jZW50ZXIoKVxuXHRcdEBib3JkZXJWaWV3LnkgPSBBbGlnbi5jZW50ZXIoKVxuXHRcdEBib3JkZXJWaWV3LnNjYWxlID0gQHNjYWxlXG5cdFx0XG5cdFxuXHRpbml0Qm9yZGVyVmlld0NzczogKCkgPT5cblx0XHRAYm9yZGVyVmlldy5jbGFzc0xpc3QuYWRkKFwiaXBob25lLXRpbGxsdXItdlwiKVxuIFxuXHRcdGNzcyA9IFwiXCJcIlxuXHRcdC5pcGhvbmUtdGlsbGx1ci12IHtcblx0XHRcdGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcblx0XHRcdDE2MC43NGRlZyxcblx0XHRcdHJnYmEoMzYsIDM2LCAzNiwgMC4zKSAyNC4zOSUsXG5cdFx0XHRyZ2JhKDI4LCAyOCwgMjgsIDAuMykgMjkuNDclLFxuXHRcdFx0cmdiYSgxMCwgMTAsIDEwLCAwLjMpIDk5Ljg1JVxuXHRcdFx0KSxcblx0XHRcdGxpbmVhci1ncmFkaWVudChcblx0XHRcdDE4MGRlZyxcblx0XHRcdHJnYmEoMiwgMiwgMiwgMC42KSAtMC4yMSUsXG5cdFx0XHRyZ2JhKDIxLCAyMSwgMjEsIDAuNikgNi41MiUsXG5cdFx0XHRyZ2JhKDYsIDYsIDYsIDAuNikgOTkuNzklXG5cdFx0XHQpLFxuXHRcdFx0IzVhNWE1YTtcblx0XHRib3gtc2hhZG93OiA4cHggMTRweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4yNSksXG5cdFx0XHRpbnNldCAwcHggLTRweCAxNnB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSxcblx0XHRcdGluc2V0IDRweCAwcHggNHB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSxcblx0XHRcdGluc2V0IC00cHggMHB4IDRweCByZ2JhKDAsIDAsIDAsIDAuNyk7XG5cblx0XHR9XG5cdFx0XCJcIlwiXG5cdFx0XG5cdFx0VXRpbHMuaW5zZXJ0Q1NTKGNzcykiLCJcbntMb2dvTGF5ZXJ9ID0gcmVxdWlyZSBcIlByZXZpZXdfTG9nb0xheWVyXCJcbntQcmV2aWV3Q2xhc3MyfSA9IHJlcXVpcmUgXCJQcmV2aWV3Q2xhc3MyXCJcblxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXdDbGFzczMgZXh0ZW5kcyBQcmV2aWV3Q2xhc3MyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblxuXHRcblx0XG5cdFxuXHRjcmVhdGVMb2dvQnV0dG9uOiAoKSA9PlxuXHRcdFxuXHRcdG9wZW5Ib21lSGFuZGxlciA9ICgpIC0+XG5cdFx0XHR3aW5kb3cubG9jYXRpb24gPSBcImh0dHBzOi8vdGlsbGx1ci5jb21cIlxuXHRcdFxuXHRcdGxvZ29CdXR0b24gPSBuZXcgTG9nb0xheWVyXG5cdFx0XHR3aWR0aDogNzYsIGhlaWdodDogMzJcblx0XHRcdHg6IEFsaWduLmxlZnQoMzIpLCB5OiBBbGlnbi50b3AoMTIpXG5cdFx0XHRoYW5kbGVyOiBvcGVuSG9tZUhhbmRsZXJcblx0XG5cdFxuXHRcblx0Y3JlYXRlU2NhbGVCdXR0b246IChmb3JTdGF0ZSkgPT5cblx0XHRcblx0XHRidXR0b25TY2FsZSA9IG5ldyBMYXllclxuXHRcdFx0c2l6ZTogNDgsIGJvcmRlclJhZGl1czogNDhcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0zMiksIHk6IEFsaWduLmJvdHRvbSgtMzIpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4xKVwiXG5cdFx0XHRib3JkZXJXaWR0aDogMlxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRwcmV2aWV3OiBAXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUuc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUuc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4yKVwiIH1cblx0XHRcdFwiZmlsbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuNilcIiB9XG5cdFx0YnV0dG9uU2NhbGUuc3RhdGVTd2l0Y2goZm9yU3RhdGUpXG5cdFx0XG5cdFx0YnV0dG9uSW5zaWRlTGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYnV0dG9uU2NhbGVcblx0XHRcdGJvcmRlcldpZHRoOiAyXG5cdFx0XHRzaXplOiAyOCwgYm9yZGVyUmFkaXVzOiAyMlxuXHRcdFx0eDogMTAsIHk6IDEwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdFxuXHRcdFxuXHRcdGJ1dHRvbkluc2lkZUxheWVyLnN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuNilcIiB9XG5cdFx0XHRcImZpbGxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjIpXCIgfVxuXHRcdGJ1dHRvbkluc2lkZUxheWVyLnN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlLm9uVGFwIC0+XG5cdFx0XHRpZiBAc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcImZpbGxcIiB0aGVuIG5leHRTdGF0ZSA9IFwibm9ybWFsXCIgZWxzZSBuZXh0U3RhdGUgPSBcImZpbGxcIlxuXHRcdFx0QHN0YXRlU3dpdGNoKG5leHRTdGF0ZSlcblx0XHRcdEBjaGlsZHJlblswXS5zdGF0ZVN3aXRjaChuZXh0U3RhdGUpXG5cdFx0XHRAY3VzdG9tLnByZXZpZXcuYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XHRcblx0XHR1cGRhdGVCdXR0b25PblJlc2l6ZSA9IChidXR0b25MYXllcikgPT5cblx0XHRcdGxvY2FsQnV0dG9uID0gYnV0dG9uTGF5ZXJcblx0XHRcdFxuXHRcdFx0Q2FudmFzLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0XHRidXR0b25MYXllci54ID0gQWxpZ24ucmlnaHQoLTMyKVxuXHRcdFx0XG5cdFx0XHRDYW52YXMub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdFx0YnV0dG9uTGF5ZXIueSA9IEFsaWduLmJvdHRvbSgtMzIpXG5cdFx0XG5cdFx0dXBkYXRlQnV0dG9uT25SZXNpemUoYnV0dG9uU2NhbGUpXG5cblxuXG4iLCJcblxue1ByZXZpZXdDbGFzczM1fSA9IHJlcXVpcmUgXCJQcmV2aWV3Q2xhc3MzNVwiXG5cblxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3Q2xhc3M0IGV4dGVuZHMgUHJldmlld0NsYXNzMzVcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBzY2FsZVByZXZpZXcoKVxuXG5cdFxuXHRcblx0XG5cdFxuXHRzY2FsZVByZXZpZXc6ICgpID0+XG5cdFx0aWYgVXRpbHMuaXNNb2JpbGUoKVxuXHRcdFx0QHByZXZpZXdNb2JpbGUoKVxuXHRcdGVsc2Vcblx0XHRcdEB1cGRhdGVTY2FsZVN0YXRlKClcblx0XHRcdEBzZXREZXNrdG9wU2NhbGVNb2RlKClcblx0XHRcdEBwcmV2aWV3RGVza3RvcCgpXG5cdFx0XHRAdXBkYXRlUHJldmlld09uUmVzaXplKClcblxuXG5cdFxuXHRcblx0dXBkYXRlU2NhbGVTdGF0ZTogKCkgPT5cblx0XHRzY2FsZVggPSAoQ2FudmFzLndpZHRoIC0gMTEyKSAvIEB3aWR0aFxuXHRcdHNjYWxlWSA9IChDYW52YXMuaGVpZ2h0IC0gMTEyKSAvIEBoZWlnaHRcblx0XHRAc3RhdGVzLmZpbGwuc2NhbGUgPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSlcblx0XG5cblxuXG5cblx0c2V0RGVza3RvcFNjYWxlTW9kZTogKGZvclN0YXRlID0gXCJub3JtYWxcIikgPT5cblxuXHRcdGluaXRTdGF0ZSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJzY2FsZVwiLCBbeyB2YWx1ZTogXCJmaWxsXCIsIHJlc3VsdDogXCJmaWxsXCIgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwibm9ybWFsXCIsIHJlc3VsdDogXCJub3JtYWxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogXCJmaWxsXCIgfV0sIGZvclN0YXRlKVxuXG5cdFx0c2hvdWxkU2hvd0J1dHRvbiA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJidXR0b25cIiwgW3sgdmFsdWU6IFwiZmFsc2VcIiwgcmVzdWx0OiBmYWxzZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogZmFsc2UgfV0sIHRydWUpXG5cblx0XHRzaG91bGRTaG93TG9nbyA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJsb2dvXCIsIFt7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvZmZcIiwgcmVzdWx0OiBmYWxzZSB9XSwgdHJ1ZSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdHNob3VsZFNob3dEZXZpY2UgPSBAZ2V0U3RhdGVHZW5lcmljKFwiZGV2aWNlXCIsIFt7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogdHJ1ZSB9XSwgZmFsc2UpXG5cdFx0XG5cdFx0aWYgc2hvdWxkU2hvd0xvZ28gdGhlbiBAY3JlYXRlTG9nb0J1dHRvbigpXG5cdFx0aWYgc2hvdWxkU2hvd0J1dHRvbiB0aGVuIEBjcmVhdGVTY2FsZUJ1dHRvbihpbml0U3RhdGUpXG5cdFx0aWYgc2hvdWxkU2hvd0RldmljZSB0aGVuIEBzaG93Qm9yZGVyVmlldygpIGVsc2UgQGhpZGVCb3JkZXJWaWV3KClcblx0XHRAc3RhdGVTd2l0Y2goaW5pdFN0YXRlKVxuXHRcblx0XG5cdFxuXHRwcmV2aWV3RGVza3RvcDogKCkgPT5cblx0XHRDYW52YXMuYmFja2dyb3VuZENvbG9yID0gXCIyMjJcIlxuXHRcdEBjcmVhdGVCYXJzKClcblx0XHRAY2VudGVyKClcblx0XHRAY2xpcCA9IHRydWVcblxuXG5cdHVwZGF0ZVByZXZpZXdPblJlc2l6ZTogKCkgPT5cblx0XHRsb2NhbFByZXZpZXcgPSBAXG5cdFx0XG5cdFx0Q2FudmFzLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0bG9jYWxQcmV2aWV3LnggPSBBbGlnbi5jZW50ZXJcblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZVN0YXRlKClcblx0XHRcblx0XHRDYW52YXMub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy55ID0gQWxpZ24uY2VudGVyXG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlU2NhbGVTdGF0ZSgpXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRwcmV2aWV3TW9iaWxlOiAoKSA9PlxuXHRcdHByZXZpZXdDYW52YXMgPSBuZXcgQmFja2dyb3VuZExheWVyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiMjIyXCIsIG5hbWU6IFwiLmhpZGRlblByZXZpZXdDYW52YXNcIlxuXHRcdFxuXHRcdEBjbGlwID0gZmFsc2Vcblx0XHRAY2VudGVyKClcblx0XHRAb3JpZ2luWSA9IDAuNVxuXHRcdEBvcmlnaW5YID0gMC41XG5cblx0XHQjIHByaW50IEB3aWR0aCArICcgJyArIEBoZWlnaHRcblx0XHRcblx0XHRcblx0XHRpZiBAdmlld1NpemUoMzYwLCA2NDApIG9yIEB2aWV3U2l6ZSgzNzUsIDY2Nykgb3IgQHZpZXdTaXplKDM3NSwgODEyKSBvciBAdmlld1NpemUoMzkwLCA4NDQpIG9yIEB2aWV3U2l6ZSg0MTQsIDg5Nikgb3IgQHZpZXdTaXplKDQyOCwgOTI2KVxuXHRcdFx0QHNjYWxlID0gU2NyZWVuLndpZHRoIC8gQHdpZHRoXG5cdFx0ZWxzZVxuXHRcdFx0QHNldEN1c3RvbVByZXZpZXcoKVxuXHRcblx0XG5cblx0c2V0Q3VzdG9tUHJldmlldzogKCkgPT5cblx0XHRAeSA9IEFsaWduLnRvcFxuXHRcdEBvcmlnaW5ZID0gMC4xXG5cdFx0XG5cdFx0QHNjYWxlID0gKFNjcmVlbi5oZWlnaHQgLSAxMjApIC8gQGhlaWdodFxuXHRcdEBib3JkZXJSYWRpdXMgPSAyMFxuXHRcdEBjbGlwID0gdHJ1ZVxuXG5cdFx0dGlwID0gbmV3IExheWVyXG5cdFx0XHR3aWR0aDogMjQwLCBoZWlnaHQ6IDQ0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy50aXBcblx0XHRcdHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uYm90dG9tKC0zMClcblx0XHRcdG9wYWNpdHk6IDAuNVxuXG5cblxuXG5cdCMgZ2V0U3RhdGVHZW5lcmljOiAoa2V5ID0gXCJzY2FsZVwiLCBwYWlycyA9IFt7IHZhbHVlOiAsIHJlc3VsdDogfSwge3ZhbHVlOiAsIHJlc3VsdDogfV0sIGRlZmF1bHRSZXN1bHQgPSBcIlwiKVxuXHRnZXRTdGF0ZUdlbmVyaWM6IChzdGF0ZUtleSA9IFwic2NhbGVcIiwgc3RhdGVQYWlycyA9IFtdLCBkZWZhdWx0UmVzdWx0ID0gXCJcIikgPT5cblx0XHRyZXN1bHQgPSBkZWZhdWx0UmVzdWx0XG5cblx0XHRmb3IgaXRlbSBpbiBsb2NhdGlvbi5zZWFyY2hbMS4uXS5zcGxpdCgnJicpXG5cdFx0XHRrZXlWYWx1ZVBhaXIgPSBpdGVtLnNwbGl0KFwiPVwiKVxuXHRcdFx0a2V5UGFydCA9IGtleVZhbHVlUGFpclswXVxuXHRcdFx0dmFsdWVQYXJ0ID0ga2V5VmFsdWVQYWlyWzFdXG5cblx0XHRcdGlmIGtleVBhcnQgPT0gc3RhdGVLZXlcblx0XHRcdFx0Zm9yIHBhaXIgaW4gc3RhdGVQYWlyc1xuXHRcdFx0XHRcdGlmIHZhbHVlUGFydCA9PSBwYWlyLnZhbHVlXG5cdFx0XHRcdFx0XHQjIHByaW50IFwib2sgXCIgKyBcIiAje3BhaXIudmFsdWV9XCIgXG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBwYWlyLnJlc3VsdFxuXHRcdFx0XHRcdCMgZWxzZVxuXHRcdFx0XHRcdFx0IyBwcmludCBcIm5vdCBcIiArIFwiICN7cGFpci52YWx1ZX1cIiBcblx0XHRcblx0XHRyZXR1cm4gcmVzdWx0XG5cdFxuXHRcblx0XG5cdFxuIiwiXG5cbntQcmV2aWV3Q2xhc3M0fSA9IHJlcXVpcmUgXCJQcmV2aWV3Q2xhc3M0XCJcblxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXdDbGFzczUgZXh0ZW5kcyBQcmV2aWV3Q2xhc3M0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRjb250cm9sUGFuZWxMYXllciA9IG5ldyBMYXllclxuXHRcdFx0d2lkdGg6IDM2MCwgaGVpZ2h0OiAxMDAwXG5cdFx0XHR4OiAyMCwgeTogNjBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGNvbnRyb2xQYW5lbDogY29udHJvbFBhbmVsTGF5ZXJcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0Y29udHJvbFBhbmVsTGF5ZXIucGFyZW50ID0gQHBhcmVudFxuXG5cdFxuXHRAZGVmaW5lICdjb250cm9sUGFuZWwnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuY29udHJvbFBhbmVsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmNvbnRyb2xQYW5lbCA9IHZhbHVlXG5cdFxuXHRhZGRTZWN0aW9uOiAodGl0bGUsIGFjdGlvbkFycmF5ID0gW10pID0+XG5cdFx0aWYgVXRpbHMuaXNNb2JpbGUoKSB0aGVuIHJldHVyblxuXHRcdGVsc2Vcblx0XHRcdHNlY3Rpb25WaWV3ID0gbmV3IExheWVyXG5cdFx0XHRcdHdpZHRoOiAzNjBcblx0XHRcdFx0aGVpZ2h0OiAxMDBcblx0XHRcdFx0cGFyZW50OiBAY29udHJvbFBhbmVsXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0XG5cdFx0XHRzZWN0aW9uVmlldy55ID0gKEBjb250cm9sUGFuZWwuY2hpbGRyZW4ubGVuZ3RoIC0gMSkgKiAxMDBcblxuXHRcdFx0QGFkZFNlY3Rpb25UaXRsZSh0aXRsZSkucGFyZW50ID0gc2VjdGlvblZpZXdcblxuXHRcdFx0c3VtWCA9IDBcblx0XHRcdGZvciBhY3Rpb25JdGVtLCBpbmRleCBpbiBhY3Rpb25BcnJheVxuXHRcdFx0XHRzZWN0aW9uQnV0dG9uID0gQGFkZFNlY3Rpb25CdXR0b24oYWN0aW9uSXRlbSlcblx0XHRcdFx0c2VjdGlvbkJ1dHRvbi5wYXJlbnQgPSBzZWN0aW9uVmlld1xuXHRcdFx0XHRzZWN0aW9uQnV0dG9uLnggPSBzdW1YXG5cdFx0XHRcdHN1bVggKz0gc2VjdGlvbkJ1dHRvbi53aWR0aCArIDhcblx0XHRcdFx0XG5cblxuXG5cblx0YWRkU2VjdGlvbkJ1dHRvbjogKGFjdGlvbkl0ZW0sIHBWID0gNiwgcEggPSA5KSA9PlxuXHRcdGJ1dHRvbkxheWVyID0gbmV3IFRleHRMYXllclxuXHRcdFx0dGV4dDogYWN0aW9uSXRlbS50aXRsZVxuXHRcdFx0eTogNDJcblx0XHRcdHBhZGRpbmc6IHsgdG9wOiBwViwgYm90dG9tOiBwViArIDIsIGxlZnQ6IHBILCByaWdodDogcEggfVxuXHRcdFx0Zm9udFNpemU6IDE4XG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuNSlcIlxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA4XG5cdFx0XG5cdFx0YnV0dG9uTGF5ZXIub24oRXZlbnRzLlRhcCwgYWN0aW9uSXRlbS5oYW5kbGVyKVxuXHRcdHJldHVybiBidXR0b25MYXllclxuXG5cblx0YWRkU2VjdGlvblRpdGxlOiAodGl0bGUgPSBcIkhlYWRlciBUaXRsZVwiKSA9PlxuXHRcdHJldHVybiBuZXcgVGV4dExheWVyXG5cdFx0XHR0ZXh0OiB0aXRsZVxuXHRcdFx0Zm9udFNpemU6IDE1XG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdG9wYWNpdHk6IDAuNlxuXHRcdFx0cGFkZGluZzpcblx0XHRcdFx0dG9wOiAxMlxuXG5cblxuXG4jICMgRXhhbXBsZVxuIyBwcmV2aWV3LmFkZFNlY3Rpb24oXCJDaG9vc2UgQmFja2dyb3VuZFwiLCBbXG4jIFx0eyB0aXRsZTogdGVzdDEsIGhhbmRsZXI6IHRlc3QyIH0sXG4jIFx0eyB0aXRsZTogdGVzdDEsIGhhbmRsZXI6IHRlc3QyIH1cbiMgXSkiLCJcblxue1ByZXZpZXdDbGFzczV9ID0gcmVxdWlyZSBcIlByZXZpZXdDbGFzczVcIlxuXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld0NsYXNzNiBleHRlbmRzIFByZXZpZXdDbGFzczVcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdHRyZWVWaWV3TGF5ZXIgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0XHR3aWR0aDogMzIwXG5cdFx0XHRoZWlnaHQ6IDBcblx0XHRcdHNjcm9sbFZlcnRpY2FsOiB0cnVlXG5cdFx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0bW91c2VXaGVlbEVuYWJsZWQ6IHRydWVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjMjIyXCJcblx0XHRcblx0XHR0cmVlVmlld0xheWVyLmNvbnRlbnQuaGVpZ2h0ID0gMFxuXHRcdHRyZWVWaWV3TGF5ZXIubW91c2VXaGVlbEVuYWJsZWQgPSB0cnVlXG5cdFx0XHRcblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR0cmVlVmlldzogdHJlZVZpZXdMYXllclxuXHRcdFx0aW5kZW50OiAxXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdHRyZWVWaWV3TGF5ZXIucGFyZW50ID0gQHBhcmVudFxuXG5cdFxuXHRAZGVmaW5lICd0cmVlVmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50cmVlVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50cmVlVmlldyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdpbmRlbnQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaW5kZW50XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmluZGVudCA9IHZhbHVlXG5cdFxuXG5cblx0cHJpbnRUcmVlOiAoKSA9PlxuXHRcdHByaW50IEB2aWV3LmNoaWxkcmVuXG5cdFx0QHByaW50Tm9kZShAdmlldylcblx0XHRAdHJlZVZpZXcuaGVpZ2h0ID0gU2NyZWVuLmhlaWdodFxuXHRcdEB0cmVlVmlldy51cGRhdGVDb250ZW50KClcblx0XG5cblx0cHJpbnROb2RlOiAobm9kZSwgbGV2ZWwgPSAwKSA9PlxuXHRcdGlmIG5vZGUubmFtZSA9PSBcIlwiIHRoZW4gbGF5ZXJOYW1lID0gXCJVbnRpdGxlZFwiIGVsc2UgbGF5ZXJOYW1lID0gbm9kZS5uYW1lXG5cdFx0IyBwcmludCBBcnJheShsZXZlbCArIDEpLmpvaW4oXCIg44O7IFwiKSArIFwiICN7bGF5ZXJOYW1lfVwiXG5cblx0XHR0cmVlTm9kZUxheWVyID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBAdHJlZVZpZXcuY29udGVudFxuXHRcdFx0dGV4dDogQXJyYXkobGV2ZWwgKyAxKS5qb2luKFwiIOODuyBcIikgKyBcIiAje2xheWVyTmFtZX1cIlxuXHRcdFx0XG5cdFx0XHRmb250U2l6ZTogMTVcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXG5cdFx0XHRvcGFjaXR5OiBpZiBsYXllck5hbWUgPT0gXCJVbnRpdGxlZFwiIHRoZW4gMC41IGVsc2UgMVxuXHRcdFx0aGVpZ2h0OiAyOFxuXHRcdFx0eTogQHRyZWVWaWV3LmhlaWdodFxuXHRcdFx0IyBiYWNrZ3JvdW5kQ29sb3I6IFV0aWxzLnJhbmRvbUNvbG9yKClcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRsYXllcjogbm9kZVxuXHRcdFxuXHRcdHRyZWVOb2RlTGF5ZXIub25UYXAgLT5cblx0XHRcdHByaW50IFwiI3tAY3VzdG9tLmxheWVyLm5hbWV9IHg6ICN7QGN1c3RvbS5sYXllci54fSB5OiAje0BjdXN0b20ubGF5ZXIueX0gc2l6ZTogI3tAY3VzdG9tLmxheWVyLndpZHRofXgje0BjdXN0b20ubGF5ZXIuaGVpZ2h0fVwiXG5cblx0XHRcblx0XHRAdHJlZVZpZXcuaGVpZ2h0ICs9IDI4XG5cblxuXHRcdGlmIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMFxuXHRcdFx0bmV4dExldmVsID0gbGV2ZWwgKyAxXG5cdFx0XHRmb3IgY2hpbGROb2RlIGluIG5vZGUuY2hpbGRyZW5cblx0XHRcdFx0QHByaW50Tm9kZShjaGlsZE5vZGUsIG5leHRMZXZlbClcblx0XHRcbiIsIlxuZXhwb3J0cy5kYXRhID1cblx0Y29sb3I6XG5cdFx0ZGFyazogXCIjMDAwXCJcblx0XHRsaWdodDogXCIjRkZGXCJcblx0c3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyTGVmdEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0YW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvYW5kcm9pZFN0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0XG5cdG5vdGNoOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfbm90Y2gucG5nXCJcbiIsIiMgUHJldmlldyBDb21wb25lbnRcblxuRnJhbWVyLkRlZmF1bHRzLkFuaW1hdGlvbiA9XG5cdGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSlcblx0dGltZTogMC41XG5cbiMge1ByZXZpZXdfQ2xhc3N9ID0gcmVxdWlyZSBcIlByZXZpZXdfQ2xhc3NcIlxuIyB7UHJldmlld19Jbml0fSA9IHJlcXVpcmUgXCJQcmV2aWV3X0luaXRcIlxue1ByZXZpZXdfVUl9ID0gcmVxdWlyZSBcIlByZXZpZXdfVUlcIlxuIyB7Q29udHJvbF9DbGFzc30gPSByZXF1aXJlIFwiQ29udHJvbF9DbGFzc1wiXG5cbmNsYXNzIEZpeFByZXZpZXdFeHBvcnQgZXh0ZW5kcyBQcmV2aWV3X1VJXG5jbGFzcyBleHBvcnRzLlByZXZpZXcgZXh0ZW5kcyBGaXhQcmV2aWV3RXhwb3J0XG5cblxuXG5cbiMgTmF0aXZlXG5cbmB3aW5kb3cuc2F2ZVByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0ID0gZnVuY3Rpb24gKGxheWVyKSB7XG5cdHdpbmRvdy5wcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdCA9IGxheWVyXG59XG5gXG5cbmB3aW5kb3cucmVjZWl2ZU1lc3NhZ2VOb3JtYWwgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0d2luZG93LnByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0LmFuaW1hdGVTdGF0ZVRvTm9ybWFsKClcbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0ZU5vcm1hbFwiLCByZWNlaXZlTWVzc2FnZU5vcm1hbCwgZmFsc2UpO1xuYFxuXG5gd2luZG93LnJlY2VpdmVNZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdGNvbnNvbGUubG9nKGV2ZW50KVxuXHR3aW5kb3cucHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QuYW5pbWF0ZVN0YXRlVG9GaWxsKClcbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0ZUZpbGxcIiwgcmVjZWl2ZU1lc3NhZ2UsIGZhbHNlKTtcbmBcblxuXG5cblxuXG5cbiIsIlxuXG5leHBvcnRzLmRhdGEgPVxuXHRjb2xvcjpcblx0XHRkYXJrOiBcIiMwMDBcIlxuXHRcdGxpZ2h0OiBcIiNGRkZcIlxuXHRcblxuXHRcblx0c3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyTGVmdEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0YW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvYW5kcm9pZFN0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0XG5cblxuXHRub3RjaDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX25vdGNoLnBuZ1wiXG5cdHRpcDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvdGlwLnBuZ1wiXG4iLCJcblxub3ZlcnJpZGVUaW1lVmFsdWUgPSBcIjIwOjIxXCJcblxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3X0NsYXNzIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdHN0YXRlR3VhcmRMYXllciA9IG5ldyBMYXllciB7IG9wYWNpdHk6IDAsIHNpemU6IDEgfVxuXHRcdHN0YXRlR3VhcmRMYXllci5zdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBzY2FsZTogMSB9XG5cdFx0XHRcImZpbGxcIjogeyBzY2FsZTogMSB9XG5cdFx0c3RhdGVHdWFyZExheWVyLnN0YXRlU3dpdGNoKFwiZmlsbFwiKVxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdG5hbWU6IFwiUHJldmlld1wiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGJvcmRlclJhZGl1czogNDJcblxuXHRcdFx0c3RhdGVHdWFyZDogc3RhdGVHdWFyZExheWVyXG5cdFx0XHR2aWV3OiBudWxsXG5cblx0XHRcdGJvcmRlclZpZXc6IG51bGxcblx0XHRcdHN0YXR1c0JhclZpZXc6IG51bGxcblx0XHRcdGhvbWVCYXJWaWV3OiBudWxsXG5cblx0XHRcdGNvbmZpZ1ZpZXc6IG51bGxcblx0XHRcdHNlY3Rpb25WaWV3OiBudWxsXG5cdFx0XHRcblxuXG5cdFx0XHQjIERldmljZVxuXHRcdFx0c2hvd0RldmljZTogdHJ1ZVxuXG5cdFx0XHQjIEJhcnNcblx0XHRcdHNob3dCYXJzOiB0cnVlXG5cdFx0XHRzaG93U3RhdHVzQmFyOiB0cnVlXG5cdFx0XHRzaG93SG9tZUJhcjogdHJ1ZVxuXG5cdFx0XHR0aW1lVmFsdWU6IG92ZXJyaWRlVGltZVZhbHVlICMgbm8gb3ZlcnJpZGVcblx0XHRcdGZvcmNlQW5kcm9pZEJhcjogZmFsc2Vcblx0XHRcdHN0YXR1c0Jhcl90aGVtZTogXCJkYXJrXCJcblx0XHRcdGhvbWVCYXJfdGhlbWU6IFwiZGFya1wiXG5cblx0XHRcdCMgQ29udHJvbHNcblx0XHRcdHNob3dVSTogdHJ1ZVxuXHRcdFx0c2hvd0xvZ286IHRydWVcblx0XHRcdHNob3dIaW50czogdHJ1ZVxuXG5cdFx0XHQjIFNjYWxlXG5cdFx0XHRzY2FsZVN0YXRlOiBcImZpbGxcIiAjIGZpbGwgLyBub3JtYWxcblx0XHRcdHNjYWxlR2FwOiA1NlxuXHRcdFx0XG5cdFx0XHRcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0d2luZG93LnNhdmVQcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdChAKVxuXHRcdEB1cGRhdGVJbml0KClcblx0XHRcblx0XHRAc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgc2NhbGU6IDEgfVxuXHRcdFx0XCJmaWxsXCI6IHsgc2NhbGU6IDEgfVxuXG5cblxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnZpZXcgPSB2YWx1ZVxuXHRcdFx0QHdpZHRoID0gQHZpZXcud2lkdGhcblx0XHRcdEBoZWlnaHQgPSBAdmlldy5oZWlnaHRcblx0XHRcdEB2aWV3LnBhcmVudCA9IEBcblx0XG5cdEBkZWZpbmUgJ3N0YXRlR3VhcmQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc3RhdGVHdWFyZFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zdGF0ZUd1YXJkID0gdmFsdWVcblxuXG5cblx0QGRlZmluZSAnZGV2aWNlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmJvcmRlclZpZXdcblx0XG5cdEBkZWZpbmUgJ3N0YXR1c0JhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zdGF0dXNCYXJWaWV3XG5cdFxuXHRAZGVmaW5lICdob21lQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmhvbWVCYXJWaWV3XG5cblxuXG5cdEBkZWZpbmUgJ2JvcmRlclZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYm9yZGVyVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ib3JkZXJWaWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3N0YXR1c0JhclZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc3RhdHVzQmFyVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zdGF0dXNCYXJWaWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2hvbWVCYXJWaWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmhvbWVCYXJWaWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmhvbWVCYXJWaWV3ID0gdmFsdWVcblxuXG5cblx0QGRlZmluZSAnY29uZmlnVmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5jb25maWdWaWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmNvbmZpZ1ZpZXcgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnc2VjdGlvblZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2VjdGlvblZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2VjdGlvblZpZXcgPSB2YWx1ZVxuXHRcblxuXHRcblx0XG5cdFxuXG5cdGFuaW1hdGVTdGF0ZVRvTm9ybWFsOiAoKSA9PlxuXHRcdEBzdGF0ZUd1YXJkLnN0YXRlU3dpdGNoKFwibm9ybWFsXCIpXG5cdFx0QGFuaW1hdGUoc2NhbGU6IEBzdGF0ZXNbXCJub3JtYWxcIl0uc2NhbGUsIG9wdGlvbnM6IHsgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41IH0pXG5cdFx0aWYgQGJvcmRlclZpZXcgdGhlbiBAYm9yZGVyVmlldy5hbmltYXRlU3RhdGVUb05vcm1hbCgpXG5cdFxuXHRhbmltYXRlU3RhdGVUb0ZpbGw6ICgpID0+XG5cdFx0QHN0YXRlR3VhcmQuc3RhdGVTd2l0Y2goXCJmaWxsXCIpXG5cdFx0QGFuaW1hdGUoc2NhbGU6IEBzdGF0ZXNbXCJmaWxsXCJdLnNjYWxlLCBvcHRpb25zOiB7IGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSB9KVxuXHRcdGlmIEBib3JkZXJWaWV3IHRoZW4gQGJvcmRlclZpZXcuYW5pbWF0ZVN0YXRlVG9GaWxsKClcblxuXHRzdGF0ZVN3aXRjaFRvTm9ybWFsOiAoKSA9PlxuXHRcdEBzdGF0ZUd1YXJkLnN0YXRlU3dpdGNoKFwibm9ybWFsXCIpXG5cdFx0QGFuaW1hdGUoc2NhbGU6IEBzdGF0ZXNbXCJub3JtYWxcIl0uc2NhbGUsIG9wdGlvbnM6IHsgY3VydmU6IEJlemllci5saW5lYXIsIHRpbWU6IDAgfSlcblx0XHRpZiBAYm9yZGVyVmlldyB0aGVuIEBib3JkZXJWaWV3LnN0YXRlU3dpdGNoVG9Ob3JtYWwoKVxuXHRcblx0c3RhdGVTd2l0Y2hUb0ZpbGw6ICgpID0+XG5cdFx0QHN0YXRlR3VhcmQuc3RhdGVTd2l0Y2goXCJmaWxsXCIpXG5cdFx0QGFuaW1hdGUoc2NhbGU6IEBzdGF0ZXNbXCJmaWxsXCJdLnNjYWxlLCBvcHRpb25zOiB7IGN1cnZlOiBCZXppZXIubGluZWFyLCB0aW1lOiAwIH0pXG5cdFx0aWYgQGJvcmRlclZpZXcgdGhlbiBAYm9yZGVyVmlldy5zdGF0ZVN3aXRjaFRvRmlsbCgpXG5cdFxuXG5cdFxuXHRcblxuXHRAZGVmaW5lICdzaG93RGV2aWNlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNob3dEZXZpY2Vcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0RldmljZSA9IHZhbHVlXG5cdFxuXG5cblx0QGRlZmluZSAnc2hvd0JhcnMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2hvd0JhcnNcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0JhcnMgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnc2hvd1N0YXR1c0JhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93U3RhdHVzQmFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNob3dTdGF0dXNCYXIgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnc2hvd0hvbWVCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2hvd0hvbWVCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0hvbWVCYXIgPSB2YWx1ZVxuXG5cblxuXG5cblx0QGRlZmluZSAndGltZVZhbHVlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRpbWVWYWx1ZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50aW1lVmFsdWUgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnZm9yY2VBbmRyb2lkQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZEJhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRCYXIgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnc3RhdHVzQmFyX3RoZW1lJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnN0YXR1c0Jhcl90aGVtZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zdGF0dXNCYXJfdGhlbWUgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnaG9tZUJhcl90aGVtZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ob21lQmFyX3RoZW1lXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmhvbWVCYXJfdGhlbWUgPSB2YWx1ZVxuXG5cblxuXG5cdEBkZWZpbmUgJ3Nob3dVSScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93VUlcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd1VJID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3Nob3dMb2dvJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNob3dMb2dvXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNob3dMb2dvID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3Nob3dIaW50cycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93SGludHNcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0hpbnRzID0gdmFsdWVcblx0XG5cdFxuXHRcblxuXG5cdEBkZWZpbmUgJ3NjYWxlU3RhdGUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2NhbGVTdGF0ZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zY2FsZVN0YXRlID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3NjYWxlR2FwJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNjYWxlR2FwXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNjYWxlR2FwID0gdmFsdWVcblxuXG5cblxuXG5cdHVwZGF0ZUluaXQ6ICgpID0+XG5cblx0XHRAc2NhbGVTdGF0ZSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJzY2FsZVwiLCBbeyB2YWx1ZTogXCJmaWxsXCIsIHJlc3VsdDogXCJmaWxsXCIgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwibm9ybWFsXCIsIHJlc3VsdDogXCJub3JtYWxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IFwibm9ybWFsXCIgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwidHJ1ZVwiLCByZXN1bHQ6IFwiZmlsbFwiIH1dLCBAc2NhbGVTdGF0ZSlcblx0XHRcblx0XHRAc2NhbGVTdGF0ZSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJmaWxsXCIsIFt7IHZhbHVlOiBcIm9uXCIsIHJlc3VsdDogXCJmaWxsXCIgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogXCJub3JtYWxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogXCJmaWxsXCIgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwiZmFsc2VcIiwgcmVzdWx0OiBcIm5vcm1hbFwiIH1dLCBAc2NhbGVTdGF0ZSlcblx0XHRcblx0XHRAc2hvd1VJID0gQGdldFN0YXRlR2VuZXJpYyhcImJ1dHRvblwiLCBbeyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcInRydWVcIiwgcmVzdWx0OiB0cnVlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9uXCIsIHJlc3VsdDogdHJ1ZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvZmZcIiwgcmVzdWx0OiBmYWxzZSB9XSwgQHNob3dVSSlcblx0XHRcblx0XHRAc2hvd1VJID0gQGdldFN0YXRlR2VuZXJpYyhcInVpXCIsIFt7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwidHJ1ZVwiLCByZXN1bHQ6IHRydWUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwib25cIiwgcmVzdWx0OiB0cnVlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9mZlwiLCByZXN1bHQ6IGZhbHNlIH1dLCBAc2hvd1VJKVxuXG5cdFx0QHNob3dMb2dvID0gQGdldFN0YXRlR2VuZXJpYyhcImxvZ29cIiwgW3sgdmFsdWU6IFwiZmFsc2VcIiwgcmVzdWx0OiBmYWxzZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogdHJ1ZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvblwiLCByZXN1bHQ6IHRydWUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogZmFsc2UgfV0sIEBzaG93TG9nbylcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdEBzaG93RGV2aWNlID0gQGdldFN0YXRlR2VuZXJpYyhcImRldmljZVwiLCBbeyB2YWx1ZTogXCJvZmZcIiwgcmVzdWx0OiBmYWxzZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9uXCIsIHJlc3VsdDogdHJ1ZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogdHJ1ZSB9XSwgQHNob3dEZXZpY2UpXG5cdFx0XG5cdFx0QHNob3dIaW50cyA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJoaW50c1wiLCBbeyB2YWx1ZTogXCJvZmZcIiwgcmVzdWx0OiBmYWxzZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9uXCIsIHJlc3VsdDogdHJ1ZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogdHJ1ZSB9XSwgQHNob3dIaW50cylcblxuXG5cblx0IyBnZXRTdGF0ZUdlbmVyaWM6IChrZXkgPSBcInNjYWxlXCIsIHBhaXJzID0gW3sgdmFsdWU6ICwgcmVzdWx0OiB9LCB7dmFsdWU6ICwgcmVzdWx0OiB9XSwgZGVmYXVsdFJlc3VsdCA9IFwiXCIpXG5cdGdldFN0YXRlR2VuZXJpYzogKHN0YXRlS2V5ID0gXCJzY2FsZVwiLCBzdGF0ZVBhaXJzID0gW10sIGRlZmF1bHRSZXN1bHQgPSBcIlwiKSA9PlxuXHRcdHJlc3VsdCA9IGRlZmF1bHRSZXN1bHRcblxuXHRcdGZvciBpdGVtIGluIGxvY2F0aW9uLnNlYXJjaFsxLi5dLnNwbGl0KCcmJylcblx0XHRcdGtleVZhbHVlUGFpciA9IGl0ZW0uc3BsaXQoXCI9XCIpXG5cdFx0XHRrZXlQYXJ0ID0ga2V5VmFsdWVQYWlyWzBdXG5cdFx0XHR2YWx1ZVBhcnQgPSBrZXlWYWx1ZVBhaXJbMV1cblxuXHRcdFx0aWYga2V5UGFydCA9PSBzdGF0ZUtleVxuXHRcdFx0XHRmb3IgcGFpciBpbiBzdGF0ZVBhaXJzXG5cdFx0XHRcdFx0aWYgdmFsdWVQYXJ0ID09IHBhaXIudmFsdWVcblx0XHRcdFx0XHRcdHJlc3VsdCA9IHBhaXIucmVzdWx0XG5cdFx0XHRcdFx0IyBlbHNlXG5cdFx0XHRcdFx0XHQjIHByaW50IFwibm90IFwiICsgXCIgI3twYWlyLnZhbHVlfVwiIFxuXHRcdFxuXHRcdHJldHVybiByZXN1bHRcblx0XG5cdFxuXHRcblx0XG4iLCJcblxue1ByZXZpZXdfQ2xhc3N9ID0gcmVxdWlyZSBcIlByZXZpZXdfQ2xhc3NcIlxue0RldmljZV9DbGFzc30gPSByZXF1aXJlIFwiRGV2aWNlX0NsYXNzXCJcblxue0hvbWVCYXJfQ2xhc3N9ID0gcmVxdWlyZSBcIkhvbWVCYXJfQ2xhc3NcIlxue1N0YXR1c0Jhcl9DbGFzc30gPSByZXF1aXJlIFwiU3RhdHVzQmFyX0NsYXNzXCJcblxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3X0luaXQgZXh0ZW5kcyBQcmV2aWV3X0NsYXNzXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBzY2FsZVByZXZpZXcoKVxuXG5cdFxuXHRcblx0c2NhbGVQcmV2aWV3OiAoKSA9PlxuXHRcdGlmIEBzaG93SGludHMgdGhlbiBGcmFtZXIuRXh0cmFzLkhpbnRzLmVuYWJsZSgpXG5cdFx0ZWxzZSBGcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXG5cdFx0aWYgVXRpbHMuaXNNb2JpbGUoKSB0aGVuIEBwcmV2aWV3TW9iaWxlKClcblx0XHRlbHNlIEBwcmV2aWV3RGVza3RvcCgpXG5cdFxuXHR1cGRhdGVQcmV2aWV3OiAoKSA9PlxuXHRcdGlmIEBzdGF0ZUd1YXJkLnN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJmaWxsXCIgdGhlbiBAc3RhdGVTd2l0Y2hUb0ZpbGwoKVxuXHRcdGVsc2UgQHN0YXRlU3dpdGNoVG9Ob3JtYWwoKVxuXG5cdFx0IyBpZiBAYm9yZGVyVmlld1xuXHRcdCMgXHRpZiBAc2NhbGVTdGF0ZSA9PSBcImZpbGxcIiB0aGVuIEBib3JkZXJWaWV3LnN0YXRlU3dpdGNoVG9GaWxsKClcblx0XHQjIFx0ZWxzZSBAYm9yZGVyVmlldy5zdGF0ZVN3aXRjaFRvTm9ybWFsKClcblx0XG5cblxuXG5cdHByZXZpZXdEZXNrdG9wOiAoKSA9PlxuXHRcdGlmIEBzaG93RGV2aWNlIHRoZW4gQGJvcmRlclZpZXcgPSBuZXcgRGV2aWNlX0NsYXNzIHsgdmlldzogQCB9XG5cblx0XHQjIGlmIEBzaG93SGludHMgdGhlbiBGcmFtZXIuRXh0cmFzLkhpbnRzLmVuYWJsZSgpXG5cdFx0IyBlbHNlIEZyYW1lci5FeHRyYXMuSGludHMuZGlzYWJsZSgpXG5cblx0XHRpZiBAc2hvd0JhcnNcblx0XHRcdGlmIEBzaG93SG9tZUJhciB0aGVuIEBob21lQmFyVmlldyA9IG5ldyBIb21lQmFyX0NsYXNzIHsgdmlldzogQCB9XG5cdFx0XHRpZiBAc2hvd1N0YXR1c0JhciB0aGVuIEBzdGF0dXNCYXJWaWV3ID0gbmV3IFN0YXR1c0Jhcl9DbGFzcyB7IHZpZXc6IEAgfVxuXG5cdFx0QGNsaXAgPSB0cnVlXG5cdFx0QHVwZGF0ZVNjYWxlKClcblx0XHRAdXBkYXRlUHJldmlld09uUmVzaXplKClcblx0XHRcblx0XHRpZiBAc2NhbGVTdGF0ZSA9PSBcImZpbGxcIiB0aGVuIEBzdGF0ZVN3aXRjaFRvRmlsbCgpXG5cdFx0ZWxzZSBAc3RhdGVTd2l0Y2hUb05vcm1hbCgpXG5cblx0XG5cdHByZXZpZXdNb2JpbGU6ICgpID0+XG5cdFx0IyBpZiBAc2hvd0hpbnRzIHRoZW4gRnJhbWVyLkV4dHJhcy5IaW50cy5lbmFibGUoKVxuXHRcdCMgZWxzZSBGcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXHRcdFxuXHRcdEBzY2FsZSA9IFNjcmVlbi53aWR0aCAvIEB3aWR0aFxuXHRcdEB4ID0gQWxpZ24uY2VudGVyXG5cdFx0QHkgPSBBbGlnbi5jZW50ZXJcblxuXHRcblxuXHR1cGRhdGVTY2FsZTogKCkgPT5cblxuXHRcdEB4ID0gQWxpZ24uY2VudGVyXG5cdFx0QHkgPSBBbGlnbi5jZW50ZXJcblxuXHRcdGlmIEBib3JkZXJWaWV3XG5cdFx0XHRAYm9yZGVyVmlldy54ID0gQWxpZ24uY2VudGVyXG5cdFx0XHRAYm9yZGVyVmlldy55ID0gQWxpZ24uY2VudGVyXG5cblx0XHRzY2FsZVggPSAoU2NyZWVuLndpZHRoIC0gQHNjYWxlR2FwICogMikgLyBAd2lkdGhcblx0XHRzY2FsZVkgPSAoU2NyZWVuLmhlaWdodCAtIEBzY2FsZUdhcCAqIDIpIC8gQGhlaWdodFxuXHRcdFxuXHRcdEBzdGF0ZXNbXCJmaWxsXCJdLnNjYWxlID0gTWF0aC5taW4oc2NhbGVYLCBzY2FsZVkpXG5cblx0XHRpZiBAYm9yZGVyVmlld1xuXHRcdFx0QGJvcmRlclZpZXcuc3RhdGVzW1wiZmlsbFwiXS5zY2FsZSA9IEBzdGF0ZXNbXCJmaWxsXCJdLnNjYWxlXG5cblxuXG5cblxuXG5cblxuXHR1cGRhdGVQcmV2aWV3T25SZXNpemU6ICgpID0+XG5cdFx0bG9jYWxQcmV2aWV3ID0gQFxuXHRcdFxuXHRcdENhbnZhcy5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZSgpXG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlUHJldmlldygpXG5cdFx0XG5cdFx0Q2FudmFzLm9uIFwiY2hhbmdlOndpZHRoXCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlU2NhbGUoKVxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVByZXZpZXcoKVxuXHRcdFxuXG5cdFx0U2NyZWVuLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVNjYWxlKClcblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVQcmV2aWV3KClcblx0XHRcblx0XHRTY3JlZW4ub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZSgpXG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlUHJldmlldygpXG5cdFxuXHRcblxuXG4iLCIjIExvZ29cblxuY2xhc3MgZXhwb3J0cy5Mb2dvTGF5ZXIgZXh0ZW5kcyBTVkdMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRvcGFjaXR5OiAwLjVcblx0XHRcdGhhbmRsZXI6IG51bGxcblx0XHRcdHN2ZzogZ2V0TG9nbyhcIkZGRlwiKVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QHN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdFxuXHRcdEAub25Nb3VzZU92ZXIgQEhvdmVyXG5cdFx0QC5vbk1vdXNlT3V0IEBIb3Zlck9mZlxuXHRcblx0QGRlZmluZSAnaGFuZGxlcicsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvbihFdmVudHMuVGFwLCB2YWx1ZSlcblx0XG5cdEhvdmVyOiA9PlxuXHRcdEBvcGFjaXR5ID0gMC44XG5cdEhvdmVyT2ZmOiA9PlxuXHRcdEBvcGFjaXR5ID0gMC41XG5cblxuXG5nZXRMb2dvID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IFwiI0ZGRkZGRlwiXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiNzZcIiBoZWlnaHQ9XCIzMlwiIHZpZXdCb3g9XCIwIDAgNzYgMzJcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNMi43OTE5OSAyMS42QzIuNzkxOTkgMjEuMTY4IDIuOTAzOTkgMjAuNDA4IDMuMTI3OTkgMTkuMzJMNC4zOTk5OSAxMi44NEgyLjk4Mzk5TDMuMDc5OTkgMTIuMTJDNC45OTk5OSAxMS41NDQgNi44ODc5OSAxMC41NTIgOC43NDM5OSA5LjE0Mzk4SDkuODk1OTlMOS4zMTk5OSAxMS43NkgxMS4xOTJMMTAuOTc2IDEyLjg0SDkuMTI3OTlMNy45MDM5OSAxOS4zMkM3LjY5NTk5IDIwLjMxMiA3LjU5MTk5IDIwLjk3NiA3LjU5MTk5IDIxLjMxMkM3LjU5MTk5IDIyLjA4IDcuOTI3OTkgMjIuNTQ0IDguNTk5OTkgMjIuNzA0QzguNDM5OTkgMjMuMjQ4IDguMDcxOTkgMjMuNjggNy40OTU5OSAyNEM2LjkxOTk5IDI0LjMyIDYuMjIzOTkgMjQuNDggNS40MDc5OSAyNC40OEM0LjU5MTk5IDI0LjQ4IDMuOTUxOTkgMjQuMjI0IDMuNDg3OTkgMjMuNzEyQzMuMDIzOTkgMjMuMiAyLjc5MTk5IDIyLjQ5NiAyLjc5MTk5IDIxLjZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTE3LjU1OTkgMjIuNjhDMTcuMDYzOSAyMy44OCAxNi4wMjM5IDI0LjQ4IDE0LjQzOTkgMjQuNDhDMTMuNjIzOSAyNC40OCAxMi45NTk5IDI0LjIgMTIuNDQ3OSAyMy42NEMxMi4wMTU5IDIzLjE0NCAxMS43OTk5IDIyLjY0OCAxMS43OTk5IDIyLjE1MkMxMS43OTk5IDIwLjg1NiAxMi4wOTU5IDE4Ljk0NCAxMi42ODc5IDE2LjQxNkwxMy41NzU5IDExLjc2TDE4LjQ0NzkgMTEuMjhMMTYuOTgzOSAxOC44NjRDMTYuNzExOSAyMC4wNDggMTYuNTc1OSAyMC44NDggMTYuNTc1OSAyMS4yNjRDMTYuNTc1OSAyMi4xNzYgMTYuOTAzOSAyMi42NDggMTcuNTU5OSAyMi42OFpNMTQuMDA3OSA4LjQyMzk4QzE0LjAwNzkgNy43OTk5OCAxNC4yNjM5IDcuMzE5OTggMTQuNzc1OSA2Ljk4Mzk4QzE1LjMwMzkgNi42NDc5OCAxNS45NDM5IDYuNDc5OTggMTYuNjk1OSA2LjQ3OTk4QzE3LjQ0NzkgNi40Nzk5OCAxOC4wNDc5IDYuNjQ3OTggMTguNDk1OSA2Ljk4Mzk4QzE4Ljk1OTkgNy4zMTk5OCAxOS4xOTE5IDcuNzk5OTggMTkuMTkxOSA4LjQyMzk4QzE5LjE5MTkgOS4wNDc5OCAxOC45MzU5IDkuNTE5OTggMTguNDIzOSA5LjgzOTk4QzE3LjkyNzkgMTAuMTYgMTcuMzAzOSAxMC4zMiAxNi41NTE5IDEwLjMyQzE1Ljc5OTkgMTAuMzIgMTUuMTgzOSAxMC4xNiAxNC43MDM5IDkuODM5OThDMTQuMjM5OSA5LjUxOTk4IDE0LjAwNzkgOS4wNDc5OCAxNC4wMDc5IDguNDIzOThaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTI2LjA2MDYgMjIuNjhDMjUuNTY0NiAyMy44OCAyNC41MjQ2IDI0LjQ4IDIyLjk0MDYgMjQuNDhDMjIuMTQwNiAyNC40OCAyMS40ODQ2IDI0LjIgMjAuOTcyNiAyMy42NEMyMC41NTY2IDIzLjE3NiAyMC4zNDg2IDIyLjY4IDIwLjM0ODYgMjIuMTUyQzIwLjM0ODYgMjAuOTUyIDIwLjYyODYgMTkuMDQgMjEuMTg4NiAxNi40MTZMMjIuOTQwNiA3LjE5OTk4TDI3LjgxMjYgNi43MTk5OEwyNS40ODQ2IDE4Ljg2NEMyNS4yMTI2IDIwLjA0OCAyNS4wNzY2IDIwLjg0OCAyNS4wNzY2IDIxLjI2NEMyNS4wNzY2IDIyLjE3NiAyNS40MDQ2IDIyLjY0OCAyNi4wNjA2IDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0zNC41NjE4IDIyLjY4QzM0LjA2NTggMjMuODggMzMuMDI1OCAyNC40OCAzMS40NDE4IDI0LjQ4QzMwLjY0MTggMjQuNDggMjkuOTg1OCAyNC4yIDI5LjQ3MzggMjMuNjRDMjkuMDU3OCAyMy4xNzYgMjguODQ5OCAyMi42OCAyOC44NDk4IDIyLjE1MkMyOC44NDk4IDIwLjk1MiAyOS4xMjk4IDE5LjA0IDI5LjY4OTggMTYuNDE2TDMxLjQ0MTggNy4xOTk5OEwzNi4zMTM4IDYuNzE5OThMMzMuOTg1OCAxOC44NjRDMzMuNzEzOCAyMC4wNDggMzMuNTc3OCAyMC44NDggMzMuNTc3OCAyMS4yNjRDMzMuNTc3OCAyMi4xNzYgMzMuOTA1OCAyMi42NDggMzQuNTYxOCAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNDMuMDYzMSAyMi42OEM0Mi41NjcxIDIzLjg4IDQxLjUyNzEgMjQuNDggMzkuOTQzMSAyNC40OEMzOS4xNDMxIDI0LjQ4IDM4LjQ4NzEgMjQuMiAzNy45NzUxIDIzLjY0QzM3LjU1OTEgMjMuMTc2IDM3LjM1MTEgMjIuNjggMzcuMzUxMSAyMi4xNTJDMzcuMzUxMSAyMC45NTIgMzcuNjMxMSAxOS4wNCAzOC4xOTExIDE2LjQxNkwzOS45NDMxIDcuMTk5OThMNDQuODE1MSA2LjcxOTk4TDQyLjQ4NzEgMTguODY0QzQyLjIxNTEgMjAuMDQ4IDQyLjA3OTEgMjAuODQ4IDQyLjA3OTEgMjEuMjY0QzQyLjA3OTEgMjIuMTc2IDQyLjQwNzEgMjIuNjQ4IDQzLjA2MzEgMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTUzLjUzMjMgMjIuOTkyQzUyLjc2NDMgMjMuOTg0IDUxLjQyODMgMjQuNDggNDkuNTI0MyAyNC40OEM0OC41MzIzIDI0LjQ4IDQ3LjY3NjMgMjQuMTg0IDQ2Ljk1NjMgMjMuNTkyQzQ2LjIzNjMgMjIuOTg0IDQ1Ljg3NjMgMjIuMjQ4IDQ1Ljg3NjMgMjEuMzg0QzQ1Ljg3NjMgMjAuOTA0IDQ1LjkwMDMgMjAuNTQ0IDQ1Ljk0ODMgMjAuMzA0TDQ3LjU1NjMgMTEuNzZMNTIuNDI4MyAxMS4yOEw1MC42NzYzIDIwLjU0NEM1MC42MTIzIDIwLjg5NiA1MC41ODAzIDIxLjE3NiA1MC41ODAzIDIxLjM4NEM1MC41ODAzIDIyLjMxMiA1MC44NjAzIDIyLjc3NiA1MS40MjAzIDIyLjc3NkM1Mi4wNDQzIDIyLjc3NiA1Mi41ODAzIDIyLjM1MiA1My4wMjgzIDIxLjUwNEM1My4xNzIzIDIxLjIzMiA1My4yNzYzIDIwLjkyIDUzLjM0MDMgMjAuNTY4TDU1LjA0NDMgMTEuNzZMNTkuNzcyMyAxMS4yOEw1Ny45OTYzIDIwLjY0QzU3Ljk0ODMgMjAuODggNTcuOTI0MyAyMS4xMjggNTcuOTI0MyAyMS4zODRDNTcuOTI0MyAyMS42NCA1Ny45OTYzIDIxLjkxMiA1OC4xNDAzIDIyLjJDNTguMjg0MyAyMi40NzIgNTguNTg4MyAyMi42NCA1OS4wNTIzIDIyLjcwNEM1OC45NTYzIDIzLjA4OCA1OC43NDAzIDIzLjQwOCA1OC40MDQzIDIzLjY2NEM1Ny43MDAzIDI0LjIwOCA1Ni45NjQzIDI0LjQ4IDU2LjE5NjMgMjQuNDhDNTUuNDQ0MyAyNC40OCA1NC44NDQzIDI0LjM0NCA1NC4zOTYzIDI0LjA3MkM1My45NDgzIDIzLjggNTMuNjYwMyAyMy40NCA1My41MzIzIDIyLjk5MlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNjkuMjk0NyAxNy4yNTZDNjkuODcwNyAxNi4yMzIgNzAuMTU4NyAxNS4yIDcwLjE1ODcgMTQuMTZDNzAuMTU4NyAxMy40NzIgNjkuOTEwNyAxMy4xMjggNjkuNDE0NyAxMy4xMjhDNjkuMDMwNyAxMy4xMjggNjguNjM4NyAxMy40NTYgNjguMjM4NyAxNC4xMTJDNjcuODIyNyAxNC43NjggNjcuNTUwNyAxNS41MiA2Ny40MjI3IDE2LjM2OEw2Ni4xNzQ3IDI0TDYxLjIwNjcgMjQuNDhMNjMuNjU0NyAxMS43Nkw2Ny42MTQ3IDExLjI4TDY3LjE4MjcgMTMuNzA0QzY3Ljk2NjcgMTIuMDg4IDY5LjIzODcgMTEuMjggNzAuOTk4NyAxMS4yOEM3MS45MjY3IDExLjI4IDcyLjYzODcgMTEuNTIgNzMuMTM0NyAxMkM3My42NDY3IDEyLjQ4IDczLjkwMjcgMTMuMjE2IDczLjkwMjcgMTQuMjA4QzczLjkwMjcgMTUuMTg0IDczLjU3NDcgMTUuOTg0IDcyLjkxODcgMTYuNjA4QzcyLjI3ODcgMTcuMjMyIDcxLjQwNjcgMTcuNTQ0IDcwLjMwMjcgMTcuNTQ0QzY5LjgyMjcgMTcuNTQ0IDY5LjQ4NjcgMTcuNDQ4IDY5LjI5NDcgMTcuMjU2WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPC9zdmc+XG5cIlwiXCJcbiIsIlxue0xvZ29MYXllcn0gPSByZXF1aXJlIFwiTG9nb1wiXG57UHJldmlld19Jbml0fSA9IHJlcXVpcmUgXCJQcmV2aWV3X0luaXRcIlxue1VJX1NlY3Rpb259ID0gcmVxdWlyZSBcIlVJX1NlY3Rpb25cIlxue1VJX0NvbmZpZ30gPSByZXF1aXJlIFwiVUlfQ29uZmlnXCJcblxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXdfVUkgZXh0ZW5kcyBQcmV2aWV3X0luaXRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBzaG93RGVza3RvcFVJKClcblx0XG5cblxuXHRzaG93RGVza3RvcFVJOiAoKSA9PlxuXHRcdGlmIFV0aWxzLmlzTW9iaWxlKCkgdGhlbiByZXR1cm5cblxuXHRcdGlmIEBzaG93TG9nbyB0aGVuIEBjcmVhdGVMb2dvQnV0dG9uKClcblx0XHRpZiBAc2hvd1VJIHRoZW4gQGFkZENvbmZpZygpXG5cblxuXG5cblxuXG5cdGNyZWF0ZUxvZ29CdXR0b246ICgpID0+XG5cdFx0XG5cdFx0b3BlbkhvbWVIYW5kbGVyID0gKCkgLT5cblx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IFwiaHR0cHM6Ly90aWxsbHVyLmNvbVwiXG5cdFx0XG5cdFx0bG9nb0J1dHRvbiA9IG5ldyBMb2dvTGF5ZXJcblx0XHRcdHdpZHRoOiA3NiwgaGVpZ2h0OiAzMlxuXHRcdFx0eDogQWxpZ24ubGVmdCgzMiksIHk6IEFsaWduLnRvcCgxMilcblx0XHRcdGhhbmRsZXI6IG9wZW5Ib21lSGFuZGxlclxuXHRcblxuXHRhZGRTZWN0aW9uOiAodGl0bGUsIGFjdGlvbkFycmF5ID0gW10pID0+XG5cdFx0aWYgQHNlY3Rpb25WaWV3ID09IG51bGwgdGhlbiBAc2VjdGlvblZpZXcgPSBuZXcgVUlfU2VjdGlvblxuXHRcdEBzZWN0aW9uVmlldy5hZGRTZWN0aW9uKHRpdGxlLCBhY3Rpb25BcnJheSlcblxuXG5cdCMgRmlsbCDil4lcblx0IyBGaWxsIOKXjlxuXG5cdGFkZENvbmZpZzogKCkgPT5cblx0XHRAY29uZmlnVmlldyA9IG5ldyBVSV9Db25maWcgeyB2aWV3OiBAIH1cblxuXHRcdHNjYWxlVHVwbGUgPSBbXCJGaXRcIiwgXCIxMDAlXCJdXG5cdFx0aGludHNUdXBsZSA9IFtcIkhpbnRzIOKXiVwiLCBcIkhpbnRzIOKXjlwiXVxuXG5cblx0XHR0b2dnbGVTY2FsZSA9IChlbXB0eURhdGEsIGxvY2FsQnV0dG9uKSA9PlxuXHRcdFx0aWYgQHN0YXRlR3VhcmQuc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcIm5vcm1hbFwiXG5cdFx0XHRcdEBhbmltYXRlU3RhdGVUb0ZpbGwoKVxuXHRcdFx0XHRsb2NhbEJ1dHRvbi50ZXh0ID0gc2NhbGVUdXBsZVswXVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAYW5pbWF0ZVN0YXRlVG9Ob3JtYWwoKVxuXHRcdFx0XHRsb2NhbEJ1dHRvbi50ZXh0ID0gc2NhbGVUdXBsZVsxXVxuXHRcdFx0XHRcblx0XHRcblx0XHR0b2dnbGVUaXBzID0gKGVtcHR5RGF0YSwgbG9jYWxCdXR0b24pID0+XG5cdFx0XHRpZiBAc2hvd0hpbnRzXG5cdFx0XHRcdEBoaWRlSGludHNIYW5kbGVyKClcblx0XHRcdFx0bG9jYWxCdXR0b24udGV4dCA9IGhpbnRzVHVwbGVbMV1cblx0XHRcdGVsc2Vcblx0XHRcdFx0QHNob3dIaW50c0hhbmRsZXIoKVxuXHRcdFx0XHRsb2NhbEJ1dHRvbi50ZXh0ID0gaGludHNUdXBsZVswXVxuXHRcdFxuXHRcdGluaXRTY2FsZVRpdGxlID0gaWYgQHNob3dIaW50cyB0aGVuIGhpbnRzVHVwbGVbMF0gZWxzZSBoaW50c1R1cGxlWzFdXG5cdFx0aW5pdFN0YXRlVGl0bGUgPSBpZiBAc3RhdGVHdWFyZC5zdGF0ZXMuY3VycmVudC5uYW1lID09IFwibm9ybWFsXCIgdGhlbiBzY2FsZVR1cGxlWzFdIGVsc2Ugc2NhbGVUdXBsZVswXVxuXG5cdFx0IyBwcmludCBpbml0U2NhbGVUaXRsZSArIFwiIFwiICsgaW5pdFN0YXRlVGl0bGVcblxuXHRcdEBjb25maWdWaWV3LmFkZFNlY3Rpb24oW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogaW5pdFNjYWxlVGl0bGUsXG5cdFx0XHRcdGhhbmRsZXI6IHRvZ2dsZVRpcHNcblx0XHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IGluaXRTdGF0ZVRpdGxlLFxuXHRcdFx0XHRoYW5kbGVyOiB0b2dnbGVTY2FsZVxuXHRcdFx0fSxcblx0XHRdKVxuXHRcblx0XG5cdGhpZGVIaW50c0hhbmRsZXI6ICgpID0+XG5cdFx0RnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcblx0XHRAc2hvd0hpbnRzID0gIUBzaG93SGludHNcblxuXHRzaG93SGludHNIYW5kbGVyOiAoKSA9PlxuXHRcdEZyYW1lci5FeHRyYXMuSGludHMuZW5hYmxlKClcblx0XHRGcmFtZXIuRXh0cmFzLkhpbnRzLnNob3dIaW50cygpXG5cdFx0QHNob3dIaW50cyA9ICFAc2hvd0hpbnRzXG4iLCJcbntMb2dvTGF5ZXJ9ID0gcmVxdWlyZSBcIlByZXZpZXdfTG9nb0xheWVyXCJcbntQaG9uZVR5cGVWaWV3fSA9IHJlcXVpcmUgXCJQaG9uZVR5cGVWaWV3XCJcblxuXG5jbGFzcyBleHBvcnRzLlNjYWxlVmlldyBleHRlbmRzIFBob25lVHlwZVZpZXdcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXG5cdFxuXHRcblx0XG5cdGNyZWF0ZUxvZ29CdXR0b246ICgpID0+XG5cdFx0XG5cdFx0b3BlbkhvbWVIYW5kbGVyID0gKCkgLT5cblx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IFwiaHR0cHM6Ly90aWxsbHVyLmNvbVwiXG5cdFx0XG5cdFx0bG9nb0J1dHRvbiA9IG5ldyBMb2dvTGF5ZXJcblx0XHRcdHdpZHRoOiA3NiwgaGVpZ2h0OiAzMlxuXHRcdFx0eDogQWxpZ24ubGVmdCgzMiksIHk6IEFsaWduLnRvcCgxMilcblx0XHRcdGhhbmRsZXI6IG9wZW5Ib21lSGFuZGxlclxuXHRcblx0XG5cdFxuXHRjcmVhdGVTY2FsZUJ1dHRvbjogKGZvclN0YXRlKSA9PlxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlID0gbmV3IExheWVyXG5cdFx0XHRzaXplOiA0OCwgYm9yZGVyUmFkaXVzOiA0OFxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTMyKSwgeTogQWxpZ24uYm90dG9tKC0zMilcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjEpXCJcblx0XHRcdGJvcmRlcldpZHRoOiAyXG5cdFx0XHRjdXN0b206XG5cdFx0XHRcdHByZXZpZXc6IEBcblx0XHRcblx0XHRidXR0b25TY2FsZS5zdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcblx0XHRidXR0b25TY2FsZS5zdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjIpXCIgfVxuXHRcdFx0XCJmaWxsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC42KVwiIH1cblx0XHRidXR0b25TY2FsZS5zdGF0ZVN3aXRjaChmb3JTdGF0ZSlcblx0XHRcblx0XHRidXR0b25JbnNpZGVMYXllciA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBidXR0b25TY2FsZVxuXHRcdFx0Ym9yZGVyV2lkdGg6IDJcblx0XHRcdHNpemU6IDI4LCBib3JkZXJSYWRpdXM6IDIyXG5cdFx0XHR4OiAxMCwgeTogMTBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0XG5cdFx0XG5cdFx0YnV0dG9uSW5zaWRlTGF5ZXIuc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC42KVwiIH1cblx0XHRcdFwiZmlsbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuMilcIiB9XG5cdFx0YnV0dG9uSW5zaWRlTGF5ZXIuc3RhdGVTd2l0Y2goZm9yU3RhdGUpXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUub25UYXAgLT5cblx0XHRcdGlmIEBzdGF0ZXMuY3VycmVudC5uYW1lID09IFwiZmlsbFwiIHRoZW4gbmV4dFN0YXRlID0gXCJub3JtYWxcIiBlbHNlIG5leHRTdGF0ZSA9IFwiZmlsbFwiXG5cdFx0XHRAc3RhdGVTd2l0Y2gobmV4dFN0YXRlKVxuXHRcdFx0QGNoaWxkcmVuWzBdLnN0YXRlU3dpdGNoKG5leHRTdGF0ZSlcblx0XHRcdEBjdXN0b20ucHJldmlldy5hbmltYXRlKG5leHRTdGF0ZSwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcdFxuXHRcdHVwZGF0ZUJ1dHRvbk9uUmVzaXplID0gKGJ1dHRvbkxheWVyKSA9PlxuXHRcdFx0bG9jYWxCdXR0b24gPSBidXR0b25MYXllclxuXHRcdFx0XG5cdFx0XHRDYW52YXMub24gXCJjaGFuZ2U6aGVpZ2h0XCIsID0+XG5cdFx0XHRcdGJ1dHRvbkxheWVyLnggPSBBbGlnbi5yaWdodCgtMzIpXG5cdFx0XHRcblx0XHRcdENhbnZhcy5vbiBcImNoYW5nZTp3aWR0aFwiLCA9PlxuXHRcdFx0XHRidXR0b25MYXllci55ID0gQWxpZ24uYm90dG9tKC0zMilcblx0XHRcblx0XHR1cGRhdGVCdXR0b25PblJlc2l6ZShidXR0b25TY2FsZSlcblxuXG5cbiIsIlxuXG57TG9jYXRpb25WaWV3fSA9IHJlcXVpcmUgXCJMb2NhdGlvblZpZXdcIlxuXG5cbmNsYXNzIGV4cG9ydHMuU2VjdGlvblZpZXcgZXh0ZW5kcyBMb2NhdGlvblZpZXdcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdGNvbnRyb2xQYW5lbExheWVyID0gbmV3IExheWVyXG5cdFx0XHR3aWR0aDogMzYwLCBoZWlnaHQ6IDEwMDBcblx0XHRcdHg6IDIwLCB5OiA2MFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0Y29udHJvbFBhbmVsOiBjb250cm9sUGFuZWxMYXllclxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRjb250cm9sUGFuZWxMYXllci5wYXJlbnQgPSBAcGFyZW50XG5cblx0XG5cdEBkZWZpbmUgJ2NvbnRyb2xQYW5lbCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5jb250cm9sUGFuZWxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuY29udHJvbFBhbmVsID0gdmFsdWVcblx0XG5cdGFkZFNlY3Rpb246ICh0aXRsZSwgYWN0aW9uQXJyYXkgPSBbXSkgPT5cblx0XHRpZiBVdGlscy5pc01vYmlsZSgpIHRoZW4gcmV0dXJuXG5cdFx0ZWxzZVxuXHRcdFx0c2VjdGlvblZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdFx0d2lkdGg6IDM2MFxuXHRcdFx0XHRoZWlnaHQ6IDEwMFxuXHRcdFx0XHRwYXJlbnQ6IEBjb250cm9sUGFuZWxcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRcblx0XHRcdHNlY3Rpb25WaWV3LnkgPSAoQGNvbnRyb2xQYW5lbC5jaGlsZHJlbi5sZW5ndGggLSAxKSAqIDEwMFxuXG5cdFx0XHRAYWRkU2VjdGlvblRpdGxlKHRpdGxlKS5wYXJlbnQgPSBzZWN0aW9uVmlld1xuXG5cdFx0XHRzdW1YID0gMFxuXHRcdFx0Zm9yIGFjdGlvbkl0ZW0sIGluZGV4IGluIGFjdGlvbkFycmF5XG5cdFx0XHRcdHNlY3Rpb25CdXR0b24gPSBAYWRkU2VjdGlvbkJ1dHRvbihhY3Rpb25JdGVtKVxuXHRcdFx0XHRzZWN0aW9uQnV0dG9uLnBhcmVudCA9IHNlY3Rpb25WaWV3XG5cdFx0XHRcdHNlY3Rpb25CdXR0b24ueCA9IHN1bVhcblx0XHRcdFx0c3VtWCArPSBzZWN0aW9uQnV0dG9uLndpZHRoICsgOFxuXHRcdFx0XHRcblxuXG5cblxuXHRhZGRTZWN0aW9uQnV0dG9uOiAoYWN0aW9uSXRlbSwgcFYgPSA2LCBwSCA9IDkpID0+XG5cdFx0YnV0dG9uTGF5ZXIgPSBuZXcgVGV4dExheWVyXG5cdFx0XHR0ZXh0OiBhY3Rpb25JdGVtLnRpdGxlXG5cdFx0XHR5OiA0MlxuXHRcdFx0cGFkZGluZzogeyB0b3A6IHBWLCBib3R0b206IHBWICsgMiwgbGVmdDogcEgsIHJpZ2h0OiBwSCB9XG5cdFx0XHRmb250U2l6ZTogMThcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMC41KVwiXG5cdFx0XHRib3JkZXJSYWRpdXM6IDhcblx0XHRcblx0XHRidXR0b25MYXllci5vbihFdmVudHMuVGFwLCBhY3Rpb25JdGVtLmhhbmRsZXIpXG5cdFx0cmV0dXJuIGJ1dHRvbkxheWVyXG5cblxuXHRhZGRTZWN0aW9uVGl0bGU6ICh0aXRsZSA9IFwiSGVhZGVyIFRpdGxlXCIpID0+XG5cdFx0cmV0dXJuIG5ldyBUZXh0TGF5ZXJcblx0XHRcdHRleHQ6IHRpdGxlXG5cdFx0XHRmb250U2l6ZTogMTVcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0b3BhY2l0eTogMC42XG5cdFx0XHRwYWRkaW5nOlxuXHRcdFx0XHR0b3A6IDEyXG5cblxuXG5cbiMgIyBFeGFtcGxlXG4jIHByZXZpZXcuYWRkU2VjdGlvbihcIkNob29zZSBCYWNrZ3JvdW5kXCIsIFtcbiMgXHR7IHRpdGxlOiB0ZXN0MSwgaGFuZGxlcjogdGVzdDIgfSxcbiMgXHR7IHRpdGxlOiB0ZXN0MSwgaGFuZGxlcjogdGVzdDIgfVxuIyBdKSIsIlxuXG5jbGFzcyBleHBvcnRzLlN0YXR1c0Jhcl9DbGFzcyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0cGFyZW50OiBAdmlld1xuXHRcdFx0d2lkdGg6IEB2aWV3LndpZHRoXG5cblx0XHRcdHk6IEFsaWduLnRvcCwgbmFtZTogXCIuc3RhdHVzIGJhclwiLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblxuXHRcdFx0dGhlbWU6IEB2aWV3LnN0YXR1c0Jhcl90aGVtZVxuXHRcdFx0Zm9yY2VBbmRyb2lkOiBAdmlldy5mb3JjZUFuZHJvaWRCYXJcblx0XHRcdHByb3RvdHlwZUNyZWF0aW9uWWVhcjogQHZpZXcudGltZVZhbHVlXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBjcmVhdGUoKVxuXG5cblxuXG5cblx0QGRlZmluZSAndmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy52aWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnZpZXcgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAndGhlbWUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudGhlbWVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudGhlbWUgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnZm9yY2VBbmRyb2lkJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWQgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgJ3Byb3RvdHlwZUNyZWF0aW9uWWVhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5wcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyID0gdmFsdWVcblxuXG5cblxuXHR2aWV3U2l6ZTogKHcsIGgpID0+IHJldHVybiBAdmlldy53aWR0aCA9PSB3IGFuZCBAdmlldy5oZWlnaHQgPT0gaFxuXG5cdGNyZWF0ZTogKCkgPT5cblx0XHRcblx0XHRpZiBAZm9yY2VBbmRyb2lkIHRoZW4gQGNyZWF0ZUNsYXNzaWNBbmRyb2lkU3RhdHVzQmFyKCkgXG5cblx0XHRlbHNlIGlmIEB2aWV3U2l6ZSgzNzUsIDgxMikgb3IgQHZpZXdTaXplKDM5MCwgODQ0KSBvciBAdmlld1NpemUoNDE0LCA4OTYpIG9yIEB2aWV3U2l6ZSg0MjgsIDkyNikgb3IgQHZpZXdTaXplKDM2MCwgNzgyKVxuXHRcdFx0QGNyZWF0ZU5vdGNoU3RhdHVzQmFyKClcblx0XHRcblx0XHRlbHNlIGlmIEB2aWV3U2l6ZSgzOTMsIDg1Milcblx0XHRcdEBjcmVhdGVOb3RjaFN0YXR1c0JhcigpXG5cdFx0XG5cdFx0ZWxzZSBpZiBAdmlld1NpemUoMzc1LCA2NjcpIG9yIEB2aWV3U2l6ZSg0MTQsIDczNikgb3IgQHZpZXdTaXplKDMyMCwgNTY4KVxuXHRcdFx0QGNyZWF0ZUNsYXNzaWNTdGF0dXNCYXIoKVxuXHRcdFxuXHRcdFxuXHRcdGVsc2UgQGNyZWF0ZUFuZHJvaWRTdGF0dXNCYXIoKVxuXHRcblx0XG5cdFxuXHRcblxuXG5cblx0Y3JlYXRlQW5kcm9pZFN0YXR1c0JhcjogKCkgPT5cblx0XHRAaGVpZ2h0ID0gMzJcblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogNTIsIGhlaWdodDogMjAsIHg6IEFsaWduLmxlZnQoNCksIHk6IEFsaWduLnRvcCgyICsgNSlcblx0XHRcdGNvbG9yOiBkZXZpY2VfYXNzZXRzLmNvbG9yW0B0aGVtZV0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDE0LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDEwMCwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ucmlnaHQoLTQpLCB5OiBBbGlnbi50b3AoNSlcblx0XHRcdGltYWdlOiBkZXZpY2VfYXNzZXRzLmFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlW0B0aGVtZV1cblx0XG5cdFxuXHRjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0JhcjogKCkgPT5cblx0XHRAaGVpZ2h0ID0gMjBcblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogNTIsIGhlaWdodDogMjAsIHg6IEFsaWduLmxlZnQsIHk6IEFsaWduLnRvcCgyKVxuXHRcdFx0Y29sb3I6IGRldmljZV9hc3NldHMuY29sb3JbQHRoZW1lXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTQsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogMTAwLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5yaWdodCwgeTogQWxpZ24udG9wKClcblx0XHRcdGltYWdlOiBkZXZpY2VfYXNzZXRzLmFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlW0B0aGVtZV1cblx0XG5cdFxuXG5cblxuXHRjcmVhdGVDbGFzc2ljU3RhdHVzQmFyOiAoKSA9PlxuXHRcdEBoZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNMZWZ0Q29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiAxMDAsIGhlaWdodDogQGhlaWdodCwgeDogQWxpZ24ubGVmdFxuXHRcdFx0aW1hZ2U6IGRldmljZV9hc3NldHMub2xkU3RhdHVzQmFyTGVmdEltYWdlW0B0aGVtZV1cblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogNTQsIGhlaWdodDogMTYsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRjb2xvcjogZGV2aWNlX2Fzc2V0cy5jb2xvcltAdGhlbWVdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiAxMDAsIGhlaWdodDogQGhlaWdodCwgeDogQWxpZ24ucmlnaHRcblx0XHRcdGltYWdlOiBkZXZpY2VfYXNzZXRzLm9sZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHRoZW1lXVxuXHRcdFxuXHRcblx0Y3JlYXRlTm90Y2hTdGF0dXNCYXI6ICgpID0+XG5cdFx0QGhlaWdodCA9IDQ0XG5cdFx0XG5cdFx0bm90Y2hMZWZ0Q29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogNTQsIGhlaWdodDogMjEsIHg6IEFsaWduLmxlZnQoMjEpLCB5OiBBbGlnbi50b3AoMTIpXG5cdFx0XHRjb2xvcjogZGV2aWNlX2Fzc2V0cy5jb2xvcltAdGhlbWVdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGwsIGxldHRlclNwYWNpbmc6IC0wLjE3XG5cdFx0XHRmb250U2l6ZTogMTUsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRub3RjaENlbnRlckNvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogMzc1LCBoZWlnaHQ6IEBoZWlnaHQsIHg6IEFsaWduLmNlbnRlclxuXHRcdFx0aW1hZ2U6IGRldmljZV9hc3NldHMubm90Y2hcblx0XHRcblx0XHRub3RjaFJpZ2h0Q29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiAxMDAsIGhlaWdodDogQGhlaWdodCwgeDogQWxpZ24ucmlnaHRcblx0XHRcdGltYWdlOiBkZXZpY2VfYXNzZXRzLnN0YXR1c0JhclJpZ2h0SW1hZ2VbQHRoZW1lXVxuXG5cblxuXG5kZXZpY2VfYXNzZXRzID1cblx0Y29sb3I6XG5cdFx0ZGFyazogXCIjMDAwXCJcblx0XHRsaWdodDogXCIjRkZGXCJcblx0XG5cdHN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhckxlZnRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfbGVmdF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdGFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9hbmRyb2lkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdFxuXG5cblx0bm90Y2g6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9ub3RjaC5wbmdcIlxuXHR0aXA6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3RpcC5wbmdcIiIsIlxuXG57U2VjdGlvblZpZXd9ID0gcmVxdWlyZSBcIlNlY3Rpb25WaWV3XCJcblxuXG5jbGFzcyBleHBvcnRzLlRyZWVMYXllclZpZXcgZXh0ZW5kcyBTZWN0aW9uVmlld1xuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0dHJlZVZpZXdMYXllciA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0XHRcdHdpZHRoOiAzMjBcblx0XHRcdGhlaWdodDogMFxuXHRcdFx0c2Nyb2xsVmVydGljYWw6IHRydWVcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRtb3VzZVdoZWVsRW5hYmxlZDogdHJ1ZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiMyMjJcIlxuXHRcdFxuXHRcdHRyZWVWaWV3TGF5ZXIuY29udGVudC5oZWlnaHQgPSAwXG5cdFx0dHJlZVZpZXdMYXllci5tb3VzZVdoZWVsRW5hYmxlZCA9IHRydWVcblx0XHRcdFxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHRyZWVWaWV3OiB0cmVlVmlld0xheWVyXG5cdFx0XHRpbmRlbnQ6IDFcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0dHJlZVZpZXdMYXllci5wYXJlbnQgPSBAcGFyZW50XG5cblx0XG5cdEBkZWZpbmUgJ3RyZWVWaWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRyZWVWaWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnRyZWVWaWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2luZGVudCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5pbmRlbnRcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuaW5kZW50ID0gdmFsdWVcblx0XG5cblxuXHRwcmludFRyZWU6ICgpID0+XG5cdFx0cHJpbnQgQHZpZXcuY2hpbGRyZW5cblx0XHRAcHJpbnROb2RlKEB2aWV3KVxuXHRcdEB0cmVlVmlldy5oZWlnaHQgPSBTY3JlZW4uaGVpZ2h0XG5cdFx0QHRyZWVWaWV3LnVwZGF0ZUNvbnRlbnQoKVxuXHRcblxuXHRwcmludE5vZGU6IChub2RlLCBsZXZlbCA9IDApID0+XG5cdFx0aWYgbm9kZS5uYW1lID09IFwiXCIgdGhlbiBsYXllck5hbWUgPSBcIlVudGl0bGVkXCIgZWxzZSBsYXllck5hbWUgPSBub2RlLm5hbWVcblx0XHQjIHByaW50IEFycmF5KGxldmVsICsgMSkuam9pbihcIiDjg7sgXCIpICsgXCIgI3tsYXllck5hbWV9XCJcblxuXHRcdHRyZWVOb2RlTGF5ZXIgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEB0cmVlVmlldy5jb250ZW50XG5cdFx0XHR0ZXh0OiBBcnJheShsZXZlbCArIDEpLmpvaW4oXCIg44O7IFwiKSArIFwiICN7bGF5ZXJOYW1lfVwiXG5cdFx0XHRcblx0XHRcdGZvbnRTaXplOiAxNVxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cblx0XHRcdG9wYWNpdHk6IGlmIGxheWVyTmFtZSA9PSBcIlVudGl0bGVkXCIgdGhlbiAwLjUgZWxzZSAxXG5cdFx0XHRoZWlnaHQ6IDI4XG5cdFx0XHR5OiBAdHJlZVZpZXcuaGVpZ2h0XG5cdFx0XHQjIGJhY2tncm91bmRDb2xvcjogVXRpbHMucmFuZG9tQ29sb3IoKVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRjdXN0b206XG5cdFx0XHRcdGxheWVyOiBub2RlXG5cdFx0XG5cdFx0dHJlZU5vZGVMYXllci5vblRhcCAtPlxuXHRcdFx0cHJpbnQgXCIje0BjdXN0b20ubGF5ZXIubmFtZX0geDogI3tAY3VzdG9tLmxheWVyLnh9IHk6ICN7QGN1c3RvbS5sYXllci55fSBzaXplOiAje0BjdXN0b20ubGF5ZXIud2lkdGh9eCN7QGN1c3RvbS5sYXllci5oZWlnaHR9XCJcblxuXHRcdFxuXHRcdEB0cmVlVmlldy5oZWlnaHQgKz0gMjhcblxuXG5cdFx0aWYgbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwXG5cdFx0XHRuZXh0TGV2ZWwgPSBsZXZlbCArIDFcblx0XHRcdGZvciBjaGlsZE5vZGUgaW4gbm9kZS5jaGlsZHJlblxuXHRcdFx0XHRAcHJpbnROb2RlKGNoaWxkTm9kZSwgbmV4dExldmVsKVxuXHRcdFxuIiwiXG5jbGFzcyBUZXh0IGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdCMgZm9udEZhbWlseTogZm9udEF2ZXJpYVxuXHRcdFx0Zm9udFNpemU6IDE4XG5cdFx0XHR3ZWlnaHQ6IDcwMFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0aGVpZ2h0OiAyMFxuXHRcdFx0bGV0dGVyU3BhY2luZzogMC43XG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiAwLjRcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHN0eWxlID1cblx0XHRcdFwiZm9udC1mYW1pbHlcIjogXCInU0YgUHJvIFRleHQnLCAnUFQgU2FucycsICdIZWx2ZXRpY2EnLCAnVGFob21hJywgc2Fucy1zZXJpZjtcIlxuXHRcdFx0XCJmb250LXdlaWdodFwiOiA3MDBcblx0XHRcdFwiLXdlYmtpdC1mb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcdFwiLW1vei1mb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcdFwiLW1zLWZvbnQtZmVhdHVyZS1zZXR0aW5nc1wiOiBcIidzczAyJyBvbiwgJ3NzMDYnIG9uLCAnc3MwOScgb24sICdzczExJyBvbjtcIlxuXHRcdFx0XCJmb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcblxuXG5cbmNsYXNzIFRleHRCdXR0b24gZXh0ZW5kcyBUZXh0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHR1cGxlOiB7IG5vcm1hbDogMC41LCBob3ZlcjogMC44IH1cblx0XHRcdGhhbmRsZXI6IG51bGxcblxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QHN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdFxuXHRcdEAub25Nb3VzZU92ZXIgQEhvdmVyXG5cdFx0QC5vbk1vdXNlT3V0IEBIb3Zlck9mZlxuXG5cdFx0QHVwZGF0ZVR1cGxlKEB0dXBsZSlcblx0XG5cdFxuXHRcdFxuXHRIb3ZlcjogPT5cblx0XHRAb3BhY2l0eSA9IEB0dXBsZS5ob3ZlclxuXHRIb3Zlck9mZjogPT5cblx0XHRAb3BhY2l0eSA9IEB0dXBsZS5ub3JtYWxcblx0XG5cdHVwZGF0ZVR1cGxlOiAobmV3VHVwbGUpID0+XG5cdFx0QHR1cGxlID0gbmV3VHVwbGVcblx0XHRAZW1pdCBFdmVudHMuTW91c2VPdmVyXG5cdFx0QGVtaXQgRXZlbnRzLk1vdXNlT3V0XG5cdFxuXHRcblx0QGRlZmluZSAnaGFuZGxlcicsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvbihFdmVudHMuVGFwLCB2YWx1ZSlcblx0XG5cdEBkZWZpbmUgJ3R1cGxlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnR1cGxlXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy50dXBsZSA9IHZhbHVlXG5cblxuXG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBUZXh0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGhhbmRsZXI6IG51bGxcblx0XHRcdGhlaWdodDogMzIsIGJvcmRlclJhZGl1czogOFxuXHRcdFx0cGFkZGluZzogeyB0b3A6IDYsIGJvdHRvbTogNywgbGVmdDogOSwgcmlnaHQ6IDkgfVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMC43KVwiXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAc2hvd0hpbnQgPSAtPiA7XG5cdFx0QHN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdFxuXHRcdEAub25Nb3VzZU92ZXIgQEhvdmVyXG5cdFx0QC5vbk1vdXNlT3V0IEBIb3Zlck9mZlxuXHRcdFxuXHRIb3ZlcjogPT5cblx0XHRAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuNClcIlxuXHRIb3Zlck9mZjogPT5cblx0XHRAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuNylcIlxuXHRcblx0QGRlZmluZSAnaGFuZGxlcicsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvbihFdmVudHMuVGFwLCB2YWx1ZSlcblxuXG5jbGFzcyBCdXR0b25UYWIgZXh0ZW5kcyBCdXR0b25cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0c2VsZWN0ZWQ6IHRydWVcblx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRIb3ZlcjogPT5cblx0XHRAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuNClcIlxuXHRIb3Zlck9mZjogPT5cblx0XHRpZiBAc2VsZWN0ZWQgdGhlbiBAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuNylcIlxuXHRcdGVsc2UgQGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjIpXCJcblxuXHRAZGVmaW5lICdzZWxlY3RlZCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zZWxlY3RlZFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuc2VsZWN0ZWQgPSB2YWx1ZVxuXHRcdFx0aWYgdmFsdWUgdGhlbiBAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuNylcIlxuXHRcdFx0ZWxzZSBAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuMilcIlxuXG5cbiMgQnV0dG9uOiBTVkdcblxuIyBjbGFzcyBTVkdCdXR0b24gZXh0ZW5kcyBUZXh0QnV0dG9uXG4jIFx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcbiMgXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG4jIFx0XHRcdHRleHQ6IFwiXCJcbiMgXHRcdFx0YXNzZXQ6IG51bGxcbiMgXHRcdFx0Y2xpcDogZmFsc2VcbiMgXHRcdFx0YXV0b1NpemU6IGZhbHNlXG5cdFx0XG4jIFx0XHRAc3ZnU2hhcGUgPSBuZXcgU1ZHTGF5ZXJcbiMgXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIm51bGxcIiwgbmFtZTogXCJzdmdTaGFwZVwiXG5cdFx0XG4jIFx0XHRzdXBlciBAb3B0aW9uc1xuIyBcdFx0QHN2Z1NoYXBlLnBhcmVudCA9IEBcbiMgXHRcdEB1cGRhdGVTVkdTaXplKClcblx0XG5cdFxuIyBcdEBkZWZpbmUgJ2Fzc2V0JyxcbiMgXHRcdGdldDogLT4gQG9wdGlvbnMuYXNzZXRcbiMgXHRcdHNldDogKHZhbHVlKSAtPlxuIyBcdFx0XHRAb3B0aW9ucy5hc3NldCA9IHZhbHVlXG4jIFx0XHRcdEBzdmdTaGFwZS5zdGF0ZXMgPVxuIyBcdFx0XHRcdFwib25EYXJrXCI6IHsgc3ZnOiB2YWx1ZS5vbkRhcmsgfVxuIyBcdFx0XHRcdFwib25MaWdodFwiOiB7IHN2ZzogdmFsdWUub25MaWdodCB9XG4jIFx0XHRcdEBzdmdTaGFwZS5zdGF0ZVN3aXRjaChcIm9uRGFya1wiKVxuXHRcbiMgXHR1cGRhdGVTVkdTaXplOiAoKSA9PlxuIyBcdFx0QHN2Z1NoYXBlLndpZHRoID0gQHdpZHRoXG4jIFx0XHRAc3ZnU2hhcGUuaGVpZ2h0ID0gQGhlaWdodFxuXHRcblxuXG5cblxuIyBCdXR0b246IENvcHlcblxuIyBjbGFzcyBDb3B5QnV0dG9uIGV4dGVuZHMgVGV4dEJ1dHRvblxuIyBcdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG4jIFx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuIyBcdFx0XHRsaW5rOiBcImh0dHBzOi8vdGlsbGx1ci5jb21cIlxuIyBcdFx0XHRoYW5kbGVyOiBAY29weUhhbmRsZXJcblx0XHRcbiMgXHRcdEBhcmVhID0gbmV3IExheWVyXG4jIFx0XHRcdG9wYWNpdHk6IDAsIHg6IC0zMDAwLCBodG1sOiBudWxsXG5cdFx0XG4jIFx0XHRzdXBlciBAb3B0aW9uc1xuIyBcdFx0QGFyZWEucGFyZW50ID0gQFxuXHRcblx0XG4jIFx0QGRlZmluZSAnbGluaycsXG4jIFx0XHRnZXQ6IC0+IEBvcHRpb25zLmxpbmtcbiMgXHRcdHNldDogKHZhbHVlKSAtPlxuIyBcdFx0XHRAb3B0aW9ucy5saW5rID0gdmFsdWVcbiMgXHRcdFx0QHVwZGF0ZSh2YWx1ZSlcblx0XG5cdFxuIyBcdHVwZGF0ZTogKGxpbmspID0+XG4jIFx0XHRAYXJlYS5odG1sID0gXCI8dGV4dGFyZWEgY2xhc3M9J2pzLWNvcHl0ZXh0YXJlYS1jbGFzcycgc3R5bGU9J29wYWNpdHk6MDsnPiN7bGlua308L3RleHRhcmVhPlwiXG5cdFxuXHRcbiMgXHRjb3B5SGFuZGxlcjogPT5cbiMgXHRcdHRleHREaXYgPSBAYXJlYS5xdWVyeVNlbGVjdG9yKCcuanMtY29weXRleHRhcmVhLWNsYXNzJylcbiMgXHRcdHRleHREaXYuZm9jdXMoKVxuIyBcdFx0dGV4dERpdi5zZWxlY3QoKVxuIyBcdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQgJ2NvcHknXG5cdFx0XG4jIFx0XHRvcmlnaW5UaXRsZSA9IEB0ZXh0XG4jIFx0XHRAdGV4dCA9IFwiRG9uZSDwn5GMXCJcbiMgXHRcdFV0aWxzLmRlbGF5IDEsID0+IEB0ZXh0ID0gb3JpZ2luVGl0bGVcblxuXG5cblxuIyAjICMgQnV0dG9uOiBDb3B5XG5cbiMgIyBjbGFzcyBMaW5rQnV0dG9uIGV4dGVuZHMgU1ZHQnV0dG9uXG4jICMgXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuIyAjIFx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuIyAjIFx0XHRcdGxpbms6IFwiaHR0cHM6Ly90aWxsbHVyLmNvbVwiXG4jICMgXHRcdFx0Ym9yZGVyV2lkdGg6IDEgKiAyXG4jICMgXHRcdFx0Ym9yZGVyUmFkaXVzOiAyMCAqIDJcbiMgIyBcdFx0XHR0dXBsZTogeyBub3JtYWw6IDEuMCwgaG92ZXI6IDAuOCB9XG5cdFx0XHRcblx0XHRcbiMgIyBcdFx0QHRpbnRCdXR0b25GaXggPSBuZXcgTGF5ZXJcbiMgIyBcdFx0XHRoZWlnaHQ6IDEyMCAqIDJcbiMgIyBcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcbiMgIyBcdFx0QGJ1dHRvblRleHQgPSBuZXcgVGV4dFxuIyAjIFx0XHRcdGZvbnRTaXplOiAzMiAqIDJcbiMgIyBcdFx0XHR0ZXh0QWxpZ246IFwicmlnaHRcIlxuIyAjIFx0XHRcdGhlaWdodDogNjAgKiAyXG5cdFx0XG4jICMgXHRcdEBidXR0b25JY29uID0gbmV3IFNWR0xheWVyXG4jICMgXHRcdFx0d2lkdGg6IDI0ICogMiwgaGVpZ2h0OiAyNCAqIDJcbiMgIyBcdFx0XHRzdmc6IFNWRy5vcGVuSWNvbi5vbkxpZ2h0XG4jICMgXHRcdFx0b3BhY2l0eTogMC42XG5cdFx0XHRcblxuXHRcdFxuIyAjIFx0XHRzdXBlciBAb3B0aW9uc1xuXG4jICMgXHRcdEBidXR0b25UZXh0LnRleHQgPSBAdGV4dFxuIyAjIFx0XHRAdGV4dCA9IFwiXCJcblxuIyAjIFx0XHRAdGludEJ1dHRvbkZpeC5wYXJlbnQgPSBAcGFyZW50XG4jICMgXHRcdEB0aW50QnV0dG9uRml4LnggPSBBbGlnbi5yaWdodFxuIyAjIFx0XHRAdGludEJ1dHRvbkZpeC55ID0gQWxpZ24udG9wXG5cdFx0XG4jICMgXHRcdEBwYXJlbnQgPSBAdGludEJ1dHRvbkZpeFxuIyAjIFx0XHRAeSA9IEFsaWduLnRvcCgzMCAqIDIpXG4jICMgXHRcdEBoZWlnaHQgPSA2MCAqIDJcblxuIyAjIFx0XHRAYnV0dG9uVGV4dC5wYXJlbnQgPSBAXG4jICMgXHRcdEBidXR0b25UZXh0LnggPSAxNiAqIDJcbiMgIyBcdFx0QGJ1dHRvblRleHQueSA9IDkgKiAyXG5cbiMgIyBcdFx0QGJ1dHRvbkljb24ucGFyZW50ID0gQFxuIyAjIFx0XHRAYnV0dG9uSWNvbi54ID0gMTYgKiAyICsgQGJ1dHRvblRleHQud2lkdGggKyAxNiAqIDJcbiMgIyBcdFx0QGJ1dHRvbkljb24ueSA9IEFsaWduLmNlbnRlcigzICogMilcblxuIyAjIFx0XHRAd2lkdGggPSAxNiAqIDIgKyBAYnV0dG9uVGV4dC53aWR0aCArIEBidXR0b25JY29uLndpZHRoICsgMTYgKiAyICsgMTYgKiAyXG4jICMgXHRcdEB0aW50QnV0dG9uRml4LndpZHRoID0gQHdpZHRoICsgMzAgKiAyICsgMTYgKiAyXG5cbiMgIyBcdFx0QHRpbnRCdXR0b25GaXgueCA9IEFsaWduLnJpZ2h0XG4jICMgXHRcdEB4ID0gQWxpZ24ucmlnaHQoLTMwICogMilcblx0XHRcblx0XG5cbiMgIyBcdEBkZWZpbmUgJ2xpbmsnLFxuIyAjIFx0XHRnZXQ6IC0+IEBvcHRpb25zLmxpbmtcbiMgIyBcdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmxpbmsgPSB2YWx1ZVxuXHRcbiMgIyBcdHNldENvbG9yOiAoY29sb3IgPSBudWxsKSA9PlxuIyAjIFx0XHRpZiBjb2xvciA9PSBudWxsIHRoZW4gcmV0dXJuXG4jICMgXHRcdEB0aW50QnV0dG9uRml4LmJhY2tncm91bmRDb2xvciA9IGNvbG9yXG5cdFxuXG5cblxuXG5cblxuXG5cbiMgY2xhc3MgUHJldmlld0J1dHRvbiBleHRlbmRzIFRleHRcbiMgXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG4jIFx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuIyBcdFx0XHR0dXBsZTogeyBub3JtYWw6IDEuMCwgaG92ZXI6IDAuOCB9XG5cdFx0XG4jIFx0XHRzdXBlciBAb3B0aW9uc1xuXG4jIFx0XHRAcmVtb3ZlQWxsTGlzdGVuZXJzKClcblxuIyBcdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcbiMgXHRcdEAub25Nb3VzZU91dCBASG92ZXJPZmZcblxuIyBcdEhvdmVyOiA9PlxuIyBcdFx0IyBAc2NhbGUgPSAxLjA1XG4jIFx0XHRAb3BhY2l0eSA9IDEuMFxuXHRcbiMgXHRIb3Zlck9mZjogPT5cbiMgXHRcdCMgQHNjYWxlID0gMS4wXG4jIFx0XHRAb3BhY2l0eSA9IDAuOFxuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtUZXh0LCBUZXh0QnV0dG9uLCBCdXR0b24sIEJ1dHRvblRhYn1cblxuXG4iLCJcblxue1VJX1NlY3Rpb259ID0gcmVxdWlyZSBcIlVJX1NlY3Rpb25cIlxue1RleHQsIEJ1dHRvbn0gPSByZXF1aXJlIFwiVUlfQnV0dG9uc1wiXG5cbmNsYXNzIGV4cG9ydHMuVUlfQ29uZmlnIGV4dGVuZHMgVUlfU2VjdGlvblxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRoZWlnaHQ6IDEwMCwgeTogQWxpZ24uYm90dG9tKC04KVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRcdHZpZXc6IG51bGxcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QHVwZGF0ZUNvbmZpZ09uUmVzaXplKClcblxuXG5cdEBkZWZpbmUgJ3ZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy52aWV3ID0gdmFsdWVcblxuXG5cdHVwZGF0ZUNvbmZpZ09uUmVzaXplOiAoKSA9PlxuXHRcdGxvY2FsQ29uZmlnID0gQFxuXHRcdFxuXHRcdENhbnZhcy5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT4gbG9jYWxDb25maWcueSA9IEFsaWduLmJvdHRvbSgtOClcblxuXG5cblx0IyBPdmVycmlkZVxuXHRhZGRTZWN0aW9uOiAoYWN0aW9uQXJyYXkgPSBbXSkgPT5cblx0XHRzZWN0aW9uVmlldyA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR3aWR0aDogMzYwLCBoZWlnaHQ6IDEwMCwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR4OiAzMiwgeTogQWxpZ24uYm90dG9tKClcblxuXHRcdEBhZGRTZWN0aW9uVGl0bGUoc2VjdGlvblZpZXcsIFwiUHJldmlld1wiKVxuXHRcdHNlY3Rpb25WaWV3LnN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdHNlY3Rpb25WaWV3Lm9uVGFwIC0+IDtcblx0XHRzZWN0aW9uVmlldy5zaG93SGludCA9IC0+IDtcblxuXHRcdHN1bVggPSAwXG5cdFx0Zm9yIGFjdGlvbkl0ZW0sIGkgaW4gYWN0aW9uQXJyYXlcblx0XHRcdHNlY3Rpb25CdXR0b24gPSBAYWRkQWN0aW9uQnV0dG9uKGFjdGlvbkl0ZW0sIGkpXG5cdFx0XHRzZWN0aW9uQnV0dG9uLnBhcmVudCA9IHNlY3Rpb25WaWV3XG5cdFx0XHRzZWN0aW9uQnV0dG9uLnggPSBzdW1YXG5cdFx0XHRzdW1YICs9IHNlY3Rpb25CdXR0b24ud2lkdGggKyA4ICsgNFxuXHRcdFxuXHRcdEB3aWR0aCA9IE1hdGgubWF4KEB3aWR0aCwgc3VtWClcblx0XG5cblxuXHQjIE92ZXJyaWRlXG5cdGFkZEFjdGlvbkJ1dHRvbjogKGFjdGlvbkl0ZW0sIGluZGV4KSA9PlxuXHRcdGJ1dHRvbkxheWVyID0gbmV3IEJ1dHRvblxuXHRcdFx0dGV4dDogYWN0aW9uSXRlbS50aXRsZVxuXHRcdFx0eTogNDJcblx0XHRcdHNlbGVjdGVkOiBpZiBpbmRleCBpcyAwIHRoZW4gdHJ1ZSBlbHNlIGZhbHNlXG5cdFx0XHRjdXN0b206XG5cdFx0XHRcdGFjdGlvbkl0ZW06IGFjdGlvbkl0ZW1cblx0XHRcblx0XHRjb21wbGV4SGFuZGxlciA9ICgpIC0+XG5cdFx0XHRAY3VzdG9tLmFjdGlvbkl0ZW0uaGFuZGxlcihAY3VzdG9tLmFjdGlvbkl0ZW0uZGF0YSwgQClcblxuXHRcdGJ1dHRvbkxheWVyLm9uKEV2ZW50cy5UYXAsIGNvbXBsZXhIYW5kbGVyKVxuXHRcdHJldHVybiBidXR0b25MYXllciIsIlxuXG5cbntUZXh0LCBCdXR0b25UYWJ9ID0gcmVxdWlyZSBcIlVJX0J1dHRvbnNcIlxuXG5jbGFzcyBleHBvcnRzLlVJX1NlY3Rpb24gZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR3aWR0aDogMjAwLCBoZWlnaHQ6IFNjcmVlbi5oZWlnaHQsIHk6IDEwMFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcblxuXHRhZGRTZWN0aW9uOiAodGl0bGUsIGFjdGlvbkFycmF5ID0gW10pID0+XG5cblx0XHRzZWN0aW9uVmlldyA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBAXG5cdFx0XHR3aWR0aDogMzYwLCBoZWlnaHQ6IDEwMCwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHR4OiAzMiwgeTogQGNoaWxkcmVuLmxlbmd0aCAqIDEwMFxuXG5cdFx0QGFkZFNlY3Rpb25UaXRsZShzZWN0aW9uVmlldywgdGl0bGUpXG5cblx0XHRzZWN0aW9uVmlldy5zdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRzZWN0aW9uVmlldy5vblRhcCAtPiA7XG5cdFx0c2VjdGlvblZpZXcuc2hvd0hpbnQgPSAtPiA7XG5cblx0XHRzdW1YID0gMFxuXHRcdGZvciBhY3Rpb25JdGVtLCBpIGluIGFjdGlvbkFycmF5XG5cdFx0XHRzZWN0aW9uQnV0dG9uID0gQGFkZEFjdGlvbkJ1dHRvbihhY3Rpb25JdGVtLCBpKVxuXHRcdFx0c2VjdGlvbkJ1dHRvbi5wYXJlbnQgPSBzZWN0aW9uVmlld1xuXHRcdFx0c2VjdGlvbkJ1dHRvbi54ID0gc3VtWFxuXHRcdFx0c3VtWCArPSBzZWN0aW9uQnV0dG9uLndpZHRoICsgOFxuXHRcdFxuXHRcdEB3aWR0aCA9IE1hdGgubWF4KEB3aWR0aCwgc3VtWClcblxuXG5cblx0YWRkQWN0aW9uQnV0dG9uOiAoYWN0aW9uSXRlbSwgaW5kZXgpID0+XG5cdFx0YnV0dG9uTGF5ZXIgPSBuZXcgQnV0dG9uVGFiXG5cdFx0XHR0ZXh0OiBhY3Rpb25JdGVtLnRpdGxlXG5cdFx0XHR5OiA0MlxuXHRcdFx0c2VsZWN0ZWQ6IGlmIGluZGV4IGlzIDAgdGhlbiB0cnVlIGVsc2UgZmFsc2Vcblx0XHRcdGN1c3RvbTpcblx0XHRcdFx0YWN0aW9uSXRlbTogYWN0aW9uSXRlbVxuXHRcdFxuXHRcdGNvbXBsZXhIYW5kbGVyID0gKCkgLT5cblx0XHRcdEBjdXN0b20uYWN0aW9uSXRlbS5oYW5kbGVyKEBjdXN0b20uYWN0aW9uSXRlbS5kYXRhLCBAKVxuXHRcdFx0Zm9yIGJ1dHRvbiBpbiBAcGFyZW50LmNoaWxkcmVuXG5cdFx0XHRcdGlmIGJ1dHRvbi5uYW1lIGlzbnQgXCIuc2VjdGlvblRpdGxlXCJcblx0XHRcdFx0XHRidXR0b24uc2VsZWN0ZWQgPSB0cnVlIGlmIGJ1dHRvbiBpcyBAXG5cdFx0XHRcdFx0YnV0dG9uLnNlbGVjdGVkID0gZmFsc2UgaWYgYnV0dG9uIGlzbnQgQFxuXG5cdFx0YnV0dG9uTGF5ZXIub24oRXZlbnRzLlRhcCwgY29tcGxleEhhbmRsZXIpXG5cdFx0cmV0dXJuIGJ1dHRvbkxheWVyXG5cblxuXHRhZGRTZWN0aW9uVGl0bGU6IChsb2NhbFBhcmVudCwgdGl0bGUgPSBcIkhlYWRlciBUaXRsZVwiKSA9PlxuXHRcdG5ldyBUZXh0XG5cdFx0XHRwYXJlbnQ6IGxvY2FsUGFyZW50XG5cdFx0XHR0ZXh0OiB0aXRsZSwgbmFtZTogXCIuc2VjdGlvblRpdGxlXCJcblx0XHRcdGZvbnRTaXplOiAxNiwgb3BhY2l0eTogMC41LCBwYWRkaW5nOiB7IHRvcDogMTIgfVxuXG4iLCJcblxuIyB7U2VjdGlvblZpZXd9ID0gcmVxdWlyZSBcIlNlY3Rpb25WaWV3XCJcblxuXG5jbGFzcyBleHBvcnRzLlRyZWVMYXllclZpZXcgZXh0ZW5kcyBTZWN0aW9uVmlld1xuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0dHJlZVZpZXdMYXllciA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0XHRcdHdpZHRoOiAzMjBcblx0XHRcdGhlaWdodDogMFxuXHRcdFx0c2Nyb2xsVmVydGljYWw6IHRydWVcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRtb3VzZVdoZWVsRW5hYmxlZDogdHJ1ZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiMyMjJcIlxuXHRcdFxuXHRcdHRyZWVWaWV3TGF5ZXIuY29udGVudC5oZWlnaHQgPSAwXG5cdFx0dHJlZVZpZXdMYXllci5tb3VzZVdoZWVsRW5hYmxlZCA9IHRydWVcblx0XHRcdFxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHRyZWVWaWV3OiB0cmVlVmlld0xheWVyXG5cdFx0XHRpbmRlbnQ6IDFcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0dHJlZVZpZXdMYXllci5wYXJlbnQgPSBAcGFyZW50XG5cblx0XG5cdEBkZWZpbmUgJ3RyZWVWaWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRyZWVWaWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnRyZWVWaWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2luZGVudCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5pbmRlbnRcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuaW5kZW50ID0gdmFsdWVcblx0XG5cblxuXHRwcmludFRyZWU6ICgpID0+XG5cdFx0cHJpbnQgQHZpZXcuY2hpbGRyZW5cblx0XHRAcHJpbnROb2RlKEB2aWV3KVxuXHRcdEB0cmVlVmlldy5oZWlnaHQgPSBTY3JlZW4uaGVpZ2h0XG5cdFx0QHRyZWVWaWV3LnVwZGF0ZUNvbnRlbnQoKVxuXHRcblxuXHRwcmludE5vZGU6IChub2RlLCBsZXZlbCA9IDApID0+XG5cdFx0aWYgbm9kZS5uYW1lID09IFwiXCIgdGhlbiBsYXllck5hbWUgPSBcIlVudGl0bGVkXCIgZWxzZSBsYXllck5hbWUgPSBub2RlLm5hbWVcblx0XHQjIHByaW50IEFycmF5KGxldmVsICsgMSkuam9pbihcIiDjg7sgXCIpICsgXCIgI3tsYXllck5hbWV9XCJcblxuXHRcdHRyZWVOb2RlTGF5ZXIgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEB0cmVlVmlldy5jb250ZW50XG5cdFx0XHR0ZXh0OiBBcnJheShsZXZlbCArIDEpLmpvaW4oXCIg44O7IFwiKSArIFwiICN7bGF5ZXJOYW1lfVwiXG5cdFx0XHRcblx0XHRcdGZvbnRTaXplOiAxNVxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cblx0XHRcdG9wYWNpdHk6IGlmIGxheWVyTmFtZSA9PSBcIlVudGl0bGVkXCIgdGhlbiAwLjUgZWxzZSAxXG5cdFx0XHRoZWlnaHQ6IDI4XG5cdFx0XHR5OiBAdHJlZVZpZXcuaGVpZ2h0XG5cdFx0XHQjIGJhY2tncm91bmRDb2xvcjogVXRpbHMucmFuZG9tQ29sb3IoKVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRjdXN0b206XG5cdFx0XHRcdGxheWVyOiBub2RlXG5cdFx0XG5cdFx0dHJlZU5vZGVMYXllci5vblRhcCAtPlxuXHRcdFx0cHJpbnQgXCIje0BjdXN0b20ubGF5ZXIubmFtZX0geDogI3tAY3VzdG9tLmxheWVyLnh9IHk6ICN7QGN1c3RvbS5sYXllci55fSBzaXplOiAje0BjdXN0b20ubGF5ZXIud2lkdGh9eCN7QGN1c3RvbS5sYXllci5oZWlnaHR9XCJcblxuXHRcdFxuXHRcdEB0cmVlVmlldy5oZWlnaHQgKz0gMjhcblxuXG5cdFx0aWYgbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwXG5cdFx0XHRuZXh0TGV2ZWwgPSBsZXZlbCArIDFcblx0XHRcdGZvciBjaGlsZE5vZGUgaW4gbm9kZS5jaGlsZHJlblxuXHRcdFx0XHRAcHJpbnROb2RlKGNoaWxkTm9kZSwgbmV4dExldmVsKVxuXHRcdFxuIiwiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSJdfQ==
