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


},{"PCButtons":"PCButtons","SectionView":"SectionView"}],"DeviceView":[function(require,module,exports){
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


},{"InitView":"InitView"}],"PreviewComponent":[function(require,module,exports){
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


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA2LTE2IFtwcF0gWWFuZGV4IE5ldXJvIOKAkyBEZXNrdG9wIEZlZWQuZnJhbWVyL21vZHVsZXMvQnV0dG9ucy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA2LTE2IFtwcF0gWWFuZGV4IE5ldXJvIOKAkyBEZXNrdG9wIEZlZWQuZnJhbWVyL21vZHVsZXMvQ29uZmlnVmlldy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA2LTE2IFtwcF0gWWFuZGV4IE5ldXJvIOKAkyBEZXNrdG9wIEZlZWQuZnJhbWVyL21vZHVsZXMvRGV2aWNlVmlldy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA2LTE2IFtwcF0gWWFuZGV4IE5ldXJvIOKAkyBEZXNrdG9wIEZlZWQuZnJhbWVyL21vZHVsZXMvRGV2aWNlX0NsYXNzLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDYtMTYgW3BwXSBZYW5kZXggTmV1cm8g4oCTIERlc2t0b3AgRmVlZC5mcmFtZXIvbW9kdWxlcy9EZXZpY2VfSW5pdC5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA2LTE2IFtwcF0gWWFuZGV4IE5ldXJvIOKAkyBEZXNrdG9wIEZlZWQuZnJhbWVyL21vZHVsZXMvSG9tZUJhcl9DbGFzcy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA2LTE2IFtwcF0gWWFuZGV4IE5ldXJvIOKAkyBEZXNrdG9wIEZlZWQuZnJhbWVyL21vZHVsZXMvSW5pdFZpZXcuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0wNi0xNiBbcHBdIFlhbmRleCBOZXVybyDigJMgRGVza3RvcCBGZWVkLmZyYW1lci9tb2R1bGVzL0xvY2F0aW9uVmlldy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA2LTE2IFtwcF0gWWFuZGV4IE5ldXJvIOKAkyBEZXNrdG9wIEZlZWQuZnJhbWVyL21vZHVsZXMvTG9nby5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA2LTE2IFtwcF0gWWFuZGV4IE5ldXJvIOKAkyBEZXNrdG9wIEZlZWQuZnJhbWVyL21vZHVsZXMvTmF2aWdhdGlvbkNvbXBvbmVudC5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA2LTE2IFtwcF0gWWFuZGV4IE5ldXJvIOKAkyBEZXNrdG9wIEZlZWQuZnJhbWVyL21vZHVsZXMvUENCdXR0b25zLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDYtMTYgW3BwXSBZYW5kZXggTmV1cm8g4oCTIERlc2t0b3AgRmVlZC5mcmFtZXIvbW9kdWxlcy9QaG9uZVR5cGVWaWV3LmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDYtMTYgW3BwXSBZYW5kZXggTmV1cm8g4oCTIERlc2t0b3AgRmVlZC5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50LmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDYtMTYgW3BwXSBZYW5kZXggTmV1cm8g4oCTIERlc2t0b3AgRmVlZC5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3X0Fzc2V0cy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA2LTE2IFtwcF0gWWFuZGV4IE5ldXJvIOKAkyBEZXNrdG9wIEZlZWQuZnJhbWVyL21vZHVsZXMvUHJldmlld19DbGFzcy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA2LTE2IFtwcF0gWWFuZGV4IE5ldXJvIOKAkyBEZXNrdG9wIEZlZWQuZnJhbWVyL21vZHVsZXMvUHJldmlld19Jbml0LmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDYtMTYgW3BwXSBZYW5kZXggTmV1cm8g4oCTIERlc2t0b3AgRmVlZC5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3X0xvZ29MYXllci5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA2LTE2IFtwcF0gWWFuZGV4IE5ldXJvIOKAkyBEZXNrdG9wIEZlZWQuZnJhbWVyL21vZHVsZXMvUHJldmlld19VSS5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA2LTE2IFtwcF0gWWFuZGV4IE5ldXJvIOKAkyBEZXNrdG9wIEZlZWQuZnJhbWVyL21vZHVsZXMvU2NhbGVWaWV3LmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDYtMTYgW3BwXSBZYW5kZXggTmV1cm8g4oCTIERlc2t0b3AgRmVlZC5mcmFtZXIvbW9kdWxlcy9TZWN0aW9uVmlldy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA2LTE2IFtwcF0gWWFuZGV4IE5ldXJvIOKAkyBEZXNrdG9wIEZlZWQuZnJhbWVyL21vZHVsZXMvU3RhdHVzQmFyX0NsYXNzLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDYtMTYgW3BwXSBZYW5kZXggTmV1cm8g4oCTIERlc2t0b3AgRmVlZC5mcmFtZXIvbW9kdWxlcy9UcmVlTGF5ZXJWaWV3LmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDYtMTYgW3BwXSBZYW5kZXggTmV1cm8g4oCTIERlc2t0b3AgRmVlZC5mcmFtZXIvbW9kdWxlcy9VSV9CdXR0b25zLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDYtMTYgW3BwXSBZYW5kZXggTmV1cm8g4oCTIERlc2t0b3AgRmVlZC5mcmFtZXIvbW9kdWxlcy9VSV9Db25maWcuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0wNi0xNiBbcHBdIFlhbmRleCBOZXVybyDigJMgRGVza3RvcCBGZWVkLmZyYW1lci9tb2R1bGVzL1VJX1NlY3Rpb24uY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0wNi0xNiBbcHBdIFlhbmRleCBOZXVybyDigJMgRGVza3RvcCBGZWVkLmZyYW1lci9tb2R1bGVzL1VJX1RyZWUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDRUEsSUFBQTs7OztBQUFNLE9BQU8sQ0FBQzs7O0VBQ0EsZ0JBQUMsT0FBRDtBQUVaLFFBQUE7SUFGYSxJQUFDLENBQUEsNEJBQUQsVUFBUzs7O0lBRXRCLEtBQUEsR0FBUSxJQUFJLEtBQUosQ0FBVTtNQUFFLElBQUEsRUFBTSxFQUFSO01BQVksZUFBQSxFQUFpQixNQUE3QjtLQUFWO0lBRVIsS0FBSyxDQUFDLE1BQU4sR0FDQztNQUFBLFNBQUEsRUFBVztRQUFFLE9BQUEsRUFBUyxDQUFYO09BQVg7TUFDQSxRQUFBLEVBQVU7UUFBRSxPQUFBLEVBQVMsQ0FBWDtPQURWOztJQUdELEtBQUssQ0FBQyxFQUFOLENBQVMsTUFBTSxDQUFDLGNBQWhCLEVBQWdDLFNBQUMsSUFBRCxFQUFPLEVBQVA7TUFDL0IsSUFBRyxJQUFBLEtBQVEsRUFBWDtlQUFtQixJQUFDLENBQUEsTUFBTSxDQUFDLE9BQVIsQ0FBZ0IsRUFBaEIsRUFBbkI7O0lBRCtCLENBQWhDO0lBR0EsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsT0FBQSxFQUFTLElBQVQ7TUFDQSxLQUFBLEVBQU8sSUFEUDtNQUVBLE9BQUEsRUFBUyxHQUZUO0tBREQ7SUFLQSx3Q0FBTSxJQUFDLENBQUEsT0FBUDtJQUVBLElBQUMsQ0FBQSxNQUFELEdBQ0M7TUFBQSxTQUFBLEVBQVc7UUFBRSxLQUFBLEVBQU8sSUFBQyxDQUFBLE9BQVY7T0FBWDtNQUNBLFFBQUEsRUFBVTtRQUFFLEtBQUEsRUFBTyxHQUFUO09BRFY7O0lBR0QsS0FBSyxDQUFDLE1BQU4sR0FBZTtJQUNmLElBQUMsQ0FBQSxLQUFELEdBQVM7SUFFVCxJQUFDLENBQUMsWUFB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ZCxHQUF1QixDQUExQjtNQUNDLFNBQUEsR0FBWSxLQUFBLEdBQVE7QUFDcEI7QUFBQTtXQUFBLHFDQUFBOztxQkFDQyxJQUFDLENBQUEsU0FBRCxDQUFXLFNBQVgsRUFBc0IsU0FBdEI7QUFERDtxQkFGRDs7RUEzQlU7Ozs7R0F6Q3dCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXG5cbmNsYXNzIGV4cG9ydHMuQnV0dG9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdGd1YXJkID0gbmV3IExheWVyIHsgc2l6ZTogMTAsIGJhY2tncm91bmRDb2xvcjogXCJudWxsXCIgfVxuXHRcdFxuXHRcdGd1YXJkLnN0YXRlcyA9XG5cdFx0XHRcInByZXNzZWRcIjogeyBvcGFjaXR5OiAwIH1cblx0XHRcdFwibm9ybWFsXCI6IHsgb3BhY2l0eTogMCB9XG5cdFx0XG5cdFx0Z3VhcmQub24gRXZlbnRzLlN0YXRlU3dpdGNoRW5kLCAoZnJvbSwgdG8pIC0+XG5cdFx0XHRpZiBmcm9tICE9IHRvIHRoZW4gQHBhcmVudC5hbmltYXRlKHRvKVxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGhhbmRsZXI6IG51bGxcblx0XHRcdGd1YXJkOiBudWxsXG5cdFx0XHRzY2FsZVRvOiAwLjlcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAc3RhdGVzID1cblx0XHRcdFwicHJlc3NlZFwiOiB7IHNjYWxlOiBAc2NhbGVUbyB9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IHNjYWxlOiAxLjAgfVxuXHRcdFxuXHRcdGd1YXJkLnBhcmVudCA9IEBcblx0XHRAZ3VhcmQgPSBndWFyZFxuXHRcdFxuXHRcdEAub25Ub3VjaFN0YXJ0IEBIb3ZlclxuXHRcdEAub25Ub3VjaEVuZCBASG92ZXJPZmZcblx0XHRALm9uU3dpcGVTdGFydCBASG92ZXJPZmZcblx0XHRALm9uRHJhZ1N0YXJ0IEBIb3Zlck9mZlxuXHRcblx0SG92ZXI6ID0+IEBndWFyZC5zdGF0ZVN3aXRjaChcInByZXNzZWRcIilcblx0SG92ZXJPZmY6ID0+IEBndWFyZC5zdGF0ZVN3aXRjaChcIm5vcm1hbFwiKVxuXG5cblxuXHRAZGVmaW5lICdndWFyZCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ndWFyZFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ndWFyZCA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdzY2FsZVRvJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNjYWxlVG9cblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2NhbGVUbyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdoYW5kbGVyJyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9uKEV2ZW50cy5UYXAsIHZhbHVlKVxuXG4iLCJcblxue1NlY3Rpb25WaWV3fSA9IHJlcXVpcmUgXCJTZWN0aW9uVmlld1wiXG57VGV4dCwgQnV0dG9ufSA9IHJlcXVpcmUgXCJQQ0J1dHRvbnNcIlxuXG5jbGFzcyBleHBvcnRzLkNvbmZpZ1ZpZXcgZXh0ZW5kcyBTZWN0aW9uVmlld1xuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRoZWlnaHQ6IDEwMFxuXHRcdFx0eTogQWxpZ24uYm90dG9tKC04KVxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHQjIE92ZXJyaWRlXG5cdGFkZFNlY3Rpb246IChhY3Rpb25BcnJheSA9IFtdKSA9PlxuXHRcdGlmICFVdGlscy5pc01vYmlsZSgpXG5cdFx0XHRzZWN0aW9uVmlldyA9IG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IEBcblx0XHRcdFx0d2lkdGg6IDM2MCwgaGVpZ2h0OiAxMDAsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0XHR4OiAzMiwgeTogQWxpZ24uYm90dG9tKClcblxuXHRcdFx0QGFkZFNlY3Rpb25UaXRsZShzZWN0aW9uVmlldywgXCJQcmV2aWV3IFNldHRpbmdzXCIpXG5cdFx0XHRzZWN0aW9uVmlldy5zdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcdHNlY3Rpb25WaWV3Lm9uVGFwIC0+IDtcblx0XHRcdHNlY3Rpb25WaWV3LnNob3dIaW50ID0gLT4gO1xuXG5cdFx0XHRzdW1YID0gMFxuXHRcdFx0Zm9yIGFjdGlvbkl0ZW0sIGkgaW4gYWN0aW9uQXJyYXlcblx0XHRcdFx0c2VjdGlvbkJ1dHRvbiA9IEBhZGRBY3Rpb25CdXR0b24oYWN0aW9uSXRlbSwgaSlcblx0XHRcdFx0c2VjdGlvbkJ1dHRvbi5wYXJlbnQgPSBzZWN0aW9uVmlld1xuXHRcdFx0XHRzZWN0aW9uQnV0dG9uLnggPSBzdW1YXG5cdFx0XHRcdHN1bVggKz0gc2VjdGlvbkJ1dHRvbi53aWR0aCArIDggKyA0XG5cdFx0XHRcblx0XHRcdEB3aWR0aCA9IE1hdGgubWF4KEB3aWR0aCwgc3VtWClcblx0XG5cblxuXHQjICMgT3ZlcnJpZGVcblx0YWRkQWN0aW9uQnV0dG9uOiAoYWN0aW9uSXRlbSwgaW5kZXgpID0+XG5cdFx0YnV0dG9uTGF5ZXIgPSBuZXcgQnV0dG9uXG5cdFx0XHR0ZXh0OiBhY3Rpb25JdGVtLnRpdGxlXG5cdFx0XHR5OiA0MlxuXHRcdFx0c2VsZWN0ZWQ6IGlmIGluZGV4IGlzIDAgdGhlbiB0cnVlIGVsc2UgZmFsc2Vcblx0XHRcdGN1c3RvbTpcblx0XHRcdFx0YWN0aW9uSXRlbTogYWN0aW9uSXRlbVxuXHRcdFxuXHRcdGNvbXBsZXhIYW5kbGVyID0gKCkgLT5cblx0XHRcdEBjdXN0b20uYWN0aW9uSXRlbS5oYW5kbGVyKEBjdXN0b20uYWN0aW9uSXRlbS5kYXRhLCBAKVxuXG5cdFx0YnV0dG9uTGF5ZXIub24oRXZlbnRzLlRhcCwgY29tcGxleEhhbmRsZXIpXG5cdFx0cmV0dXJuIGJ1dHRvbkxheWVyIiwiXG5cbntTY2FsZVZpZXd9ID0gcmVxdWlyZSBcIlNjYWxlVmlld1wiXG5cblxuY2xhc3MgZXhwb3J0cy5EZXZpY2VWaWV3IGV4dGVuZHMgU2NhbGVWaWV3XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0Ym9yZGVyVmlldzogbnVsbFxuXHRcdFx0c2hvd0RldmljZTogdHJ1ZVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAYm9yZGVyVmlldyA9IG5ldyBMYXllclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIjAwMFwiXG5cdFx0XHRib3JkZXJSYWRpdXM6IEBib3JkZXJSYWRpdXMgKyAxNlxuXHRcdFx0b3BhY2l0eTogMVxuXG5cdFx0QGJvcmRlclZpZXcuc2VuZFRvQmFjaygpXG5cblx0XHRAaW5pdEJvcmRlclZpZXdDc3MoKVxuXHRcdEB1cGRhdGVCb3JkZXJWaWV3KClcblxuXHRcdEBvbiBcImNoYW5nZTpzaXplXCIsIC0+XG5cdFx0XHRAdXBkYXRlQm9yZGVyVmlldygpXG5cdFx0XG5cdFx0QG9uIFwiY2hhbmdlOnNjYWxlXCIsIC0+XG5cdFx0XHRAdXBkYXRlQm9yZGVyVmlldygpXG5cdFx0XG5cdFx0QG9uIFwiY2hhbmdlOnhcIiwgLT5cblx0XHRcdEB1cGRhdGVCb3JkZXJWaWV3KClcblx0XHRcblx0XHRAb24gXCJjaGFuZ2U6eVwiLCAtPlxuXHRcdFx0QHVwZGF0ZUJvcmRlclZpZXcoKVxuXHRcdFxuXG5cdEBkZWZpbmUgJ2JvcmRlclZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYm9yZGVyVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ib3JkZXJWaWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3Nob3dEZXZpY2UnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2hvd0RldmljZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zaG93RGV2aWNlID0gdmFsdWVcblx0XG5cdFxuXG5cblx0c2hvd0JvcmRlclZpZXc6ICgpID0+XG5cdFx0QGJvcmRlclZpZXcub3BhY2l0eSA9IDFcblx0XG5cdGhpZGVCb3JkZXJWaWV3OiAoKSA9PlxuXHRcdEBib3JkZXJWaWV3Lm9wYWNpdHkgPSAwXG5cblxuXHR1cGRhdGVCb3JkZXJWaWV3OiAoKSA9PlxuXHRcdGRlbHRhRyA9IDE2XG5cblx0XHRAYm9yZGVyVmlldy53aWR0aCA9IEB3aWR0aCArIGRlbHRhRyAqIDJcblx0XHRAYm9yZGVyVmlldy5oZWlnaHQgPSBAaGVpZ2h0ICsgZGVsdGFHICogMlxuXHRcdEBib3JkZXJWaWV3LnggPSBBbGlnbi5jZW50ZXIoKVxuXHRcdEBib3JkZXJWaWV3LnkgPSBBbGlnbi5jZW50ZXIoKVxuXHRcdEBib3JkZXJWaWV3LnNjYWxlID0gQHNjYWxlXG5cdFx0XG5cdFxuXHRpbml0Qm9yZGVyVmlld0NzczogKCkgPT5cblx0XHRAYm9yZGVyVmlldy5jbGFzc0xpc3QuYWRkKFwiaXBob25lLXRpbGxsdXItdlwiKVxuIFxuXHRcdGNzcyA9IFwiXCJcIlxuXHRcdC5pcGhvbmUtdGlsbGx1ci12IHtcblx0XHRcdGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcblx0XHRcdDE2MC43NGRlZyxcblx0XHRcdHJnYmEoMzYsIDM2LCAzNiwgMC4zKSAyNC4zOSUsXG5cdFx0XHRyZ2JhKDI4LCAyOCwgMjgsIDAuMykgMjkuNDclLFxuXHRcdFx0cmdiYSgxMCwgMTAsIDEwLCAwLjMpIDk5Ljg1JVxuXHRcdFx0KSxcblx0XHRcdGxpbmVhci1ncmFkaWVudChcblx0XHRcdDE4MGRlZyxcblx0XHRcdHJnYmEoMiwgMiwgMiwgMC42KSAtMC4yMSUsXG5cdFx0XHRyZ2JhKDIxLCAyMSwgMjEsIDAuNikgNi41MiUsXG5cdFx0XHRyZ2JhKDYsIDYsIDYsIDAuNikgOTkuNzklXG5cdFx0XHQpLFxuXHRcdFx0IzVhNWE1YTtcblx0XHRib3gtc2hhZG93OiA4cHggMTRweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4yNSksXG5cdFx0XHRpbnNldCAwcHggLTRweCAxNnB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSxcblx0XHRcdGluc2V0IDRweCAwcHggNHB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSxcblx0XHRcdGluc2V0IC00cHggMHB4IDRweCByZ2JhKDAsIDAsIDAsIDAuNyk7XG5cblx0XHR9XG5cdFx0XCJcIlwiXG5cdFx0XG5cdFx0VXRpbHMuaW5zZXJ0Q1NTKGNzcykiLCJcbmNsYXNzIGV4cG9ydHMuRGV2aWNlX0NsYXNzIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiMDAwXCJcblx0XHRcdHZpZXc6IG51bGxcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHQjIHVwZGF0ZSBmcm9tIHBhcmVudFxuXHRcdEBzdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBzY2FsZTogMSB9XG5cdFx0XHRcImZpbGxcIjogeyBzY2FsZTogMSB9XG5cblx0XHRAaW5pdEJvcmRlclZpZXdDc3MoKVxuXHRcdEBzZW5kVG9CYWNrKClcblx0XG5cblxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnZpZXcgPSB2YWx1ZVxuXHRcdFx0QG9wdGlvbnMud2lkdGggPSB2YWx1ZS53aWR0aCArIDE2ICogMlxuXHRcdFx0QG9wdGlvbnMuaGVpZ2h0ID0gdmFsdWUuaGVpZ2h0ICsgMTYgKiAyXG5cdFx0XHRAYm9yZGVyUmFkaXVzID0gdmFsdWUuYm9yZGVyUmFkaXVzICsgMTZcblxuXHRzdGF0ZVN3aXRjaFRvTm9ybWFsOiAoKSA9PlxuXHRcdEBhbmltYXRlKHNjYWxlOiBAc3RhdGVzW1wibm9ybWFsXCJdLnNjYWxlLCBvcHRpb25zOiB7IGN1cnZlOiBCZXppZXIubGluZWFyLCB0aW1lOiAwIH0pXG5cdFxuXHRzdGF0ZVN3aXRjaFRvRmlsbDogKCkgPT5cblx0XHRAYW5pbWF0ZShzY2FsZTogQHN0YXRlc1tcImZpbGxcIl0uc2NhbGUsIG9wdGlvbnM6IHsgY3VydmU6IEJlemllci5saW5lYXIsIHRpbWU6IDAgfSlcblxuXHRhbmltYXRlU3RhdGVUb05vcm1hbDogKCkgPT5cblx0XHRAYW5pbWF0ZShzY2FsZTogQHN0YXRlc1tcIm5vcm1hbFwiXS5zY2FsZSwgb3B0aW9uczogeyBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUgfSlcblx0XG5cdGFuaW1hdGVTdGF0ZVRvRmlsbDogKCkgPT5cblx0XHRAYW5pbWF0ZShzY2FsZTogQHN0YXRlc1tcImZpbGxcIl0uc2NhbGUsIG9wdGlvbnM6IHsgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41IH0pXG5cblxuXG5cdGluaXRCb3JkZXJWaWV3Q3NzOiAoKSA9PlxuXHRcdEBjbGFzc0xpc3QuYWRkKFwiaXBob25lLXRpbGxsdXItdlwiKVxuIFxuXHRcdGNzcyA9IFwiXCJcIlxuXHRcdC5pcGhvbmUtdGlsbGx1ci12IHtcblx0XHRcdGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcblx0XHRcdDE2MC43NGRlZyxcblx0XHRcdHJnYmEoMzYsIDM2LCAzNiwgMC4zKSAyNC4zOSUsXG5cdFx0XHRyZ2JhKDI4LCAyOCwgMjgsIDAuMykgMjkuNDclLFxuXHRcdFx0cmdiYSgxMCwgMTAsIDEwLCAwLjMpIDk5Ljg1JVxuXHRcdFx0KSxcblx0XHRcdGxpbmVhci1ncmFkaWVudChcblx0XHRcdDE4MGRlZyxcblx0XHRcdHJnYmEoMiwgMiwgMiwgMC42KSAtMC4yMSUsXG5cdFx0XHRyZ2JhKDIxLCAyMSwgMjEsIDAuNikgNi41MiUsXG5cdFx0XHRyZ2JhKDYsIDYsIDYsIDAuNikgOTkuNzklXG5cdFx0XHQpLFxuXHRcdFx0IzVhNWE1YTtcblx0XHRib3gtc2hhZG93OiA4cHggMTRweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4yNSksXG5cdFx0XHRpbnNldCAwcHggLTRweCAxNnB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSxcblx0XHRcdGluc2V0IDRweCAwcHggNHB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSxcblx0XHRcdGluc2V0IC00cHggMHB4IDRweCByZ2JhKDAsIDAsIDAsIDAuNyk7XG5cblx0XHR9XG5cdFx0XCJcIlwiXG5cdFx0XG5cdFx0VXRpbHMuaW5zZXJ0Q1NTKGNzcykiLCJcblxueyBEZXZpY2VfQ2xhc3MgfSA9IHJlcXVpcmUgXCJEZXZpY2VfQ2xhc3NcIlxuXG5jbGFzcyBleHBvcnRzLkRldmljZV9Jbml0IGV4dGVuZHMgRGV2aWNlX0NsYXNzXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0dmlzaWJsZTogQHZpZXcuZGV2aWNlQ29uZmlnLmVuYWJsZWRcblx0XHRcdGZvcmNlQW5kcm9pZEJhcjogQHZpZXcuZGV2aWNlQ29uZmlnLmZvcmNlX0FuZHJvaWRCYXJcblx0XHRcdHN0YXR1c0JhcjogQHZpZXcuZGV2aWNlQ29uZmlnLnN0YXR1c0Jhcl90aGVtZVxuXHRcdFx0aG9tZUJhcjogQHZpZXcuZGV2aWNlQ29uZmlnLmhvbWVCYXJfdGhlbWVcblx0XHRcdFxuXHRcdFx0cHJvdG90eXBlQ3JlYXRpb25ZZWFyOiBAdmlldy50aW1lVmFsdWVcblxuXHRcdFx0IyBnZXR0ZXJzXG5cdFx0XHRzdGF0dXNCYXJWaWV3OiBudWxsXG5cdFx0XHRob21lQmFyVmlldzogbnVsbFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAY3JlYXRlQmFycygpXG5cblxuXG5cdCMgZGVwcmVjYXRlZFxuXHRAZGVmaW5lICd2aXNpYmxlJyxcblx0XHRnZXQ6IC0+IGlmIEBvcHRpb25zLnZpc2libGUgdGhlbiByZXR1cm4gMSBlbHNlIHJldHVybiAwXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnZpc2libGUgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnZm9yY2VBbmRyb2lkQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZEJhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRCYXIgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgJ3N0YXR1c0JhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zdGF0dXNCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc3RhdHVzQmFyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2hvbWVCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaG9tZUJhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ob21lQmFyID0gdmFsdWVcblxuXHRAZGVmaW5lICdwcm90b3R5cGVDcmVhdGlvblllYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnByb3RvdHlwZUNyZWF0aW9uWWVhciA9IHZhbHVlXG5cblxuXG5cblxuXHRAZGVmaW5lICdzdGF0dXNCYXJWaWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnN0YXR1c0JhclZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc3RhdHVzQmFyVmlldyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdob21lQmFyVmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ob21lQmFyVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ob21lQmFyVmlldyA9IHZhbHVlXG5cblxuXG5cdHZpZXdTaXplOiAodywgaCkgPT4gcmV0dXJuIEB2aWV3LndpZHRoID09IHcgYW5kIEB2aWV3LmhlaWdodCA9PSBoXG5cblx0IyBDcmVhdGUgQmFyc1xuXG5cdGNyZWF0ZUJhcnM6ICgpID0+XG5cdFx0QHN0YXR1c0JhclZpZXcgPSBuZXcgTGF5ZXIgXG5cdFx0XHRwYXJlbnQ6IEB2aWV3LCB3aWR0aDogQHZpZXcud2lkdGgsIHk6IEFsaWduLnRvcCwgbmFtZTogXCIuc3RhdHVzIGJhclwiXG5cdFx0XHRvcGFjaXR5OiBAdmlzaWJsZSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0aWYgQGZvcmNlQW5kcm9pZEJhclxuXHRcdFx0QGNyZWF0ZUNsYXNzaWNBbmRyb2lkU3RhdHVzQmFyKEBzdGF0dXNCYXJWaWV3KSBcblxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM3NSwgODEyKSBvciBAdmlld1NpemUoMzkwLCA4NDQpIG9yIEB2aWV3U2l6ZSg0MTQsIDg5Nikgb3IgQHZpZXdTaXplKDQyOCwgOTI2KSBvciBAdmlld1NpemUoMzYwLCA3ODIpXG5cdFx0XHRAY3JlYXRlTm90Y2hTdGF0dXNCYXIoQHN0YXR1c0JhclZpZXcpXG5cdFx0XHRAY3JlYXRlSG9tZUluZGljYXRvciBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBAdmlldywgd2lkdGg6IEB2aWV3LndpZHRoLCBoZWlnaHQ6IDM0LCB5OiBBbGlnbi5ib3R0b20sIG5hbWU6IFwiLmhvbWUgYmFyXCIsIG9wYWNpdHk6IEB2aXNpYmxlLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRlbHNlIGlmIEB2aWV3U2l6ZSgzOTMsIDg1Milcblx0XHRcdEBjcmVhdGVOb3RjaFN0YXR1c0JhcihAc3RhdHVzQmFyVmlldylcblx0XHRcdEBjcmVhdGVIb21lSW5kaWNhdG9yIG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IEB2aWV3LCB3aWR0aDogQHZpZXcud2lkdGgsIGhlaWdodDogMzQsIHk6IEFsaWduLmJvdHRvbSwgbmFtZTogXCIuaG9tZSBiYXJcIiwgb3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM3NSwgNjY3KSBvciBAdmlld1NpemUoNDE0LCA3MzYpIG9yIEB2aWV3U2l6ZSgzMjAsIDU2OClcblx0XHRcdEBjcmVhdGVDbGFzc2ljU3RhdHVzQmFyKEBzdGF0dXNCYXJWaWV3KVxuXHRcdFxuXHRcdFxuXHRcdGVsc2UgQGNyZWF0ZUFuZHJvaWRTdGF0dXNCYXIoQHN0YXR1c0JhclZpZXcpXG5cdFxuXHRcblx0XG5cdFxuXG5cblxuXHRjcmVhdGVBbmRyb2lkU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gMzJcblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDUyLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5sZWZ0KDQpLCB5OiBBbGlnbi50b3AoMiArIDUpXG5cdFx0XHRjb2xvcjogZGV2aWNlX2Fzc2V0cy5jb2xvcltAc3RhdHVzQmFyXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTQsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ucmlnaHQoLTQpLCB5OiBBbGlnbi50b3AoNSlcblx0XHRcdGltYWdlOiBkZXZpY2VfYXNzZXRzLmFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlW0BzdGF0dXNCYXJdXG5cdFxuXHRcblx0Y3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTIsIGhlaWdodDogMjAsIHg6IEFsaWduLmxlZnQsIHk6IEFsaWduLnRvcCgyKVxuXHRcdFx0Y29sb3I6IGRldmljZV9hc3NldHMuY29sb3JbQHN0YXR1c0Jhcl0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDE0LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogMjAsIHg6IEFsaWduLnJpZ2h0LCB5OiBBbGlnbi50b3AoKVxuXHRcdFx0aW1hZ2U6IGRldmljZV9hc3NldHMuYW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHN0YXR1c0Jhcl1cblx0XG5cdFxuXG5cblxuXHRjcmVhdGVDbGFzc2ljU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gMjBcblx0XHRcblx0XHRjbGFzc2ljTGVmdENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLmxlZnRcblx0XHRcdGltYWdlOiBkZXZpY2VfYXNzZXRzLm9sZFN0YXR1c0JhckxlZnRJbWFnZVtAc3RhdHVzQmFyXVxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTQsIGhlaWdodDogMTYsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRjb2xvcjogZGV2aWNlX2Fzc2V0cy5jb2xvcltAc3RhdHVzQmFyXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogZGV2aWNlX2Fzc2V0cy5vbGRTdGF0dXNCYXJSaWdodEltYWdlW0BzdGF0dXNCYXJdXG5cdFx0XG5cdFxuXHRjcmVhdGVOb3RjaFN0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDQ0XG5cdFx0XG5cdFx0bm90Y2hMZWZ0Q29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDU0LCBoZWlnaHQ6IDIxLCB4OiBBbGlnbi5sZWZ0KDIxKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0Y29sb3I6IGRldmljZV9hc3NldHMuY29sb3JbQHN0YXR1c0Jhcl0sIGJhY2tncm91bmRDb2xvcjogbnVsbCwgbGV0dGVyU3BhY2luZzogLTAuMTdcblx0XHRcdGZvbnRTaXplOiAxNSwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdG5vdGNoQ2VudGVyQ29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMzc1LCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24uY2VudGVyXG5cdFx0XHRpbWFnZTogZGV2aWNlX2Fzc2V0cy5ub3RjaFxuXHRcdFxuXHRcdG5vdGNoUmlnaHRDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5yaWdodFxuXHRcdFx0aW1hZ2U6IGRldmljZV9hc3NldHMuc3RhdHVzQmFyUmlnaHRJbWFnZVtAc3RhdHVzQmFyXVxuXG5cblxuXG5cblx0Y3JlYXRlSG9tZUluZGljYXRvcjogKGJhckxheWVyKSA9PlxuXHRcdEBob21lQmFyVmlldyA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIuaG9tZVZpZXdcIlxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEzNSwgaGVpZ2h0OiA1LCB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmJvdHRvbSgtOClcblx0XHRcdGJhY2tncm91bmRDb2xvcjogZGV2aWNlX2Fzc2V0cy5jb2xvcltAaG9tZUJhcl0sIGJvcmRlclJhZGl1czogMjBcblx0XG5cblxuXG5kZXZpY2VfYXNzZXRzID1cblx0Y29sb3I6XG5cdFx0ZGFyazogXCIjMDAwXCJcblx0XHRsaWdodDogXCIjRkZGXCJcblx0XG5cdHN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhckxlZnRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfbGVmdF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdGFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9hbmRyb2lkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdFxuXG5cblx0bm90Y2g6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9ub3RjaC5wbmdcIlxuXHR0aXA6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3RpcC5wbmdcIiIsIlxuY2xhc3MgZXhwb3J0cy5Ib21lQmFyX0NsYXNzIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IEB2aWV3XG5cdFx0XHR3aWR0aDogQHZpZXcud2lkdGhcblx0XHRcdFxuXHRcdFx0dGhlbWU6IEB2aWV3LmhvbWVCYXJfdGhlbWVcblx0XHRcdFxuXHRcdFx0aGVpZ2h0OiAzNCwgeTogQWxpZ24uYm90dG9tLCBuYW1lOiBcIi5ob21lIGJhclwiLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QGNyZWF0ZSgpXG5cblxuXG5cdEBkZWZpbmUgJ3ZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy52aWV3ID0gdmFsdWVcblxuXHRAZGVmaW5lICd0aGVtZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50aGVtZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50aGVtZSA9IHZhbHVlXG5cblxuXG5cdHZpZXdTaXplOiAodywgaCkgPT4gcmV0dXJuIEB2aWV3LndpZHRoID09IHcgYW5kIEB2aWV3LmhlaWdodCA9PSBoXG5cblx0Y3JlYXRlOiAoKSA9PlxuXHRcdGlmIEB2aWV3U2l6ZSgzNzUsIDgxMikgb3IgQHZpZXdTaXplKDM5MCwgODQ0KSBvciBAdmlld1NpemUoNDE0LCA4OTYpIG9yIEB2aWV3U2l6ZSg0MjgsIDkyNikgb3IgQHZpZXdTaXplKDM2MCwgNzgyKSBvciBAdmlld1NpemUoMzkzLCA4NTIpXG5cdFx0XHRAY3JlYXRlSG9tZUluZGljYXRvcigpXG5cdFxuXHRcblx0Y3JlYXRlSG9tZUluZGljYXRvcjogKCkgPT5cblx0XHRuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiLmhvbWVWaWV3XCJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDEzNSwgaGVpZ2h0OiA1LCB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmJvdHRvbSgtOClcblx0XHRcdGJhY2tncm91bmRDb2xvcjogZGV2aWNlX2Fzc2V0cy5jb2xvcltAdGhlbWVdLCBib3JkZXJSYWRpdXM6IDIwXG5cblxuXG5kZXZpY2VfYXNzZXRzID1cblx0Y29sb3I6XG5cdFx0ZGFyazogXCIjMDAwXCJcblx0XHRsaWdodDogXCIjRkZGXCIiLCJcblxuQXNzZXRzID0gcmVxdWlyZSBcIlByZXZpZXdfQXNzZXRzXCJcblxuXG4jIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gXCJhdXRvXCJcblxuY2xhc3MgZXhwb3J0cy5Jbml0VmlldyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0bmFtZTogXCJQcmV2aWV3XCJcblx0XHRcdHZpZXc6IG51bGxcblx0XHRcdFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRib3JkZXJSYWRpdXM6IDQyXG5cdFx0XHRcblx0XHRcdGFzc2V0czogQXNzZXRzLmRhdGFcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cblx0XHR3aW5kb3cuc2F2ZVByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0KEApXG5cdFx0XG5cdFx0QHN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IHNjYWxlOiAxIH1cblx0XHRcdFwiZmlsbFwiOiB7IHNjYWxlOiAxIH1cblx0XHRcblx0XHRcblx0XHRcblxuXHRcblxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnZpZXcgPSB2YWx1ZVxuXHRcdFx0QHdpZHRoID0gQHZpZXcud2lkdGhcblx0XHRcdEBoZWlnaHQgPSBAdmlldy5oZWlnaHRcblx0XHRcdEB2aWV3LnBhcmVudCA9IEBcblxuXHRAZGVmaW5lICdhc3NldHMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYXNzZXRzXG5cblxuXG5cblxuXHRzY3JlZW5TaXplOiAodywgaCkgPT4gcmV0dXJuIFNjcmVlbi53aWR0aCA9PSB3IGFuZCBTY3JlZW4uaGVpZ2h0ID09IGhcblx0dmlld1NpemU6ICh3LCBoKSA9PiByZXR1cm4gQHdpZHRoID09IHcgYW5kIEBoZWlnaHQgPT0gaFxuXHR2aWV3V2lkdGg6ICh3KSA9PiByZXR1cm4gQHdpZHRoID09IHdcblxuXHRsb2dTaXplOiAoKSA9PlxuXHRcdG5ldyBUZXh0TGF5ZXIgeyB0ZXh0OiBcIiN7U2NyZWVuLndpZHRofXgje1NjcmVlbi5oZWlnaHR9XCIsIHk6IEFsaWduLmNlbnRlciB9XHRcblxuXG5cblx0YW5pbWF0ZVN0YXRlVG9Ob3JtYWw6ICgpID0+XG5cdFx0QGFuaW1hdGUoXCJub3JtYWxcIiwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcblx0YW5pbWF0ZVN0YXRlVG9GaWxsOiAoKSA9PlxuXHRcdEBhbmltYXRlKFwiZmlsbFwiLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFxuXHRzdGF0ZVN3aXRjaFRvTm9ybWFsOiAoKSA9PlxuXHRcdEBzdGF0ZVN3aXRjaChcIm5vcm1hbFwiKVxuXHRcblx0c3RhdGVTd2l0Y2hUb0ZpbGw6ICgpID0+XG5cdFx0QHN0YXRlU3dpdGNoKFwiZmlsbFwiKVxuXG5cblx0XHRcbiIsIlxuXG57RGV2aWNlVmlld30gPSByZXF1aXJlIFwiRGV2aWNlVmlld1wiXG5cblxuY2xhc3MgZXhwb3J0cy5Mb2NhdGlvblZpZXcgZXh0ZW5kcyBEZXZpY2VWaWV3XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0aW5pdFN0YXRlOiBcImZpbGxcIiAjIGZpbGwgLyBub3JtYWxcblx0XHRcdHNob3dCdXR0b246IHRydWVcblx0XHRcdHNob3dMb2dvOiB0cnVlXG5cdFx0XHRmb3JjZURlc2t0b3A6IGZhbHNlXG5cblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHNjYWxlUHJldmlldygpXG5cblxuXHRAZGVmaW5lICdpbml0U3RhdGUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaW5pdFN0YXRlXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmluaXRTdGF0ZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdzaG93QnV0dG9uJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNob3dCdXR0b25cblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0J1dHRvbiA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdzaG93TG9nbycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93TG9nb1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zaG93TG9nbyA9IHZhbHVlXG5cblx0QGRlZmluZSAnZm9yY2VEZXNrdG9wJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmZvcmNlRGVza3RvcFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuZm9yY2VEZXNrdG9wID0gdmFsdWVcblx0XHRcdGlmIHZhbHVlXG5cdFx0XHRcdEBzaG93RGV2aWNlID0gZmFsc2Vcblx0XHRcdFx0QHNob3dCYXJzID0gZmFsc2Vcblx0XHRcdFx0QGJvcmRlclJhZGl1cyA9IDhcblx0XG5cdFxuXHRzY2FsZVByZXZpZXc6ICgpID0+XG5cdFx0Zm9yY2VEZXNrdG9wTW9kZSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJkZXNrdG9wXCIsIFt7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcInRydWVcIiwgcmVzdWx0OiB0cnVlIH1dLCBmYWxzZSlcblxuXHRcdGlmIGZvcmNlRGVza3RvcE1vZGUgdGhlbiBAcHJldmlld0Rlc2t0b3AoKVxuXHRcdGVsc2UgaWYgVXRpbHMuaXNNb2JpbGUoKSB0aGVuIEBwcmV2aWV3TW9iaWxlKClcblx0XHRlbHNlIEBwcmV2aWV3RGVza3RvcCgpXG5cdFx0XHRcblx0XHRcblx0XG5cblx0dXBkYXRlU2NhbGU6ICgpID0+XG5cblx0XHRzY2FsZUZhY3RvciA9IFNjcmVlbi53aWR0aCAvIENhbnZhcy53aWR0aFxuXG5cdFx0QG9yaWdpblggPSAwXG5cdFx0QG9yaWdpblkgPSAwXG5cblx0XHRzY2FsZVggPSAoU2NyZWVuLndpZHRoIC0gc2NhbGVGYWN0b3IgKiAxMTIpIC8gQHdpZHRoXG5cdFx0c2NhbGVZID0gKFNjcmVlbi5oZWlnaHQgLSBzY2FsZUZhY3RvciAqIDExMikgLyBAaGVpZ2h0XG5cdFx0QHN0YXRlc1tcImZpbGxcIl0uc2NhbGUgPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSlcblxuXHRcdEBzdGF0ZXNbXCJmaWxsXCJdLnggPSAoU2NyZWVuLndpZHRoIC0gQHdpZHRoICogQHN0YXRlc1tcImZpbGxcIl0uc2NhbGUpIC8gMlxuXHRcdEBzdGF0ZXNbXCJmaWxsXCJdLnkgPSAoU2NyZWVuLmhlaWdodCAtIEBoZWlnaHQgKiBAc3RhdGVzW1wiZmlsbFwiXS5zY2FsZSkgLyAyXG5cblx0XHRAc3RhdGVzW1wibm9ybWFsXCJdLnggPSAoU2NyZWVuLndpZHRoIC0gQHdpZHRoKSAvIDJcblx0XHRAc3RhdGVzW1wibm9ybWFsXCJdLnkgPSAoU2NyZWVuLmhlaWdodCAtIEBoZWlnaHQpIC8gMlxuXG5cdFxuXG5cblxuXG5cdHNldERlc2t0b3BTY2FsZU1vZGU6ICgpID0+XG5cblx0XHRmb3JTdGF0ZSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJzY2FsZVwiLCBbeyB2YWx1ZTogXCJmaWxsXCIsIHJlc3VsdDogXCJmaWxsXCIgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwibm9ybWFsXCIsIHJlc3VsdDogXCJub3JtYWxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogXCJmaWxsXCIgfV0sIEBpbml0U3RhdGUpXG5cblx0XHRzaG91bGRTaG93QnV0dG9uID0gQGdldFN0YXRlR2VuZXJpYyhcImJ1dHRvblwiLCBbeyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvZmZcIiwgcmVzdWx0OiBmYWxzZSB9XSwgQHNob3dCdXR0b24pXG5cblx0XHRzaG91bGRTaG93TG9nbyA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJsb2dvXCIsIFt7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvZmZcIiwgcmVzdWx0OiBmYWxzZSB9XSwgQHNob3dMb2dvKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0c2hvdWxkU2hvd0RldmljZSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJkZXZpY2VcIiwgW3sgdmFsdWU6IFwiZmFsc2VcIiwgcmVzdWx0OiBmYWxzZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9mZlwiLCByZXN1bHQ6IGZhbHNlIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogdHJ1ZSB9XSwgQHNob3dEZXZpY2UpXG5cblx0XHRcblx0XHRpZiBzaG91bGRTaG93TG9nbyB0aGVuIEBjcmVhdGVMb2dvQnV0dG9uKClcblx0XHRpZiBzaG91bGRTaG93QnV0dG9uIHRoZW4gQGNyZWF0ZVNjYWxlQnV0dG9uKGZvclN0YXRlKVxuXHRcdGlmIHNob3VsZFNob3dEZXZpY2UgdGhlbiBAc2hvd0JvcmRlclZpZXcoKSBlbHNlIEBoaWRlQm9yZGVyVmlldygpXG5cdFx0QHN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcblx0XG5cdFxuXHRwcmV2aWV3RGVza3RvcDogKCkgPT5cblx0XHRAdXBkYXRlU2NhbGUoKVxuXHRcdEBzZXREZXNrdG9wU2NhbGVNb2RlKClcblx0XHRAY3JlYXRlQmFycygpXG5cdFx0QGNsaXAgPSB0cnVlXG5cdFx0QHVwZGF0ZVByZXZpZXdPblJlc2l6ZSgpXG5cblxuXHR1cGRhdGVQcmV2aWV3T25SZXNpemU6ICgpID0+XG5cdFx0bG9jYWxQcmV2aWV3ID0gQFxuXHRcdFxuXHRcdENhbnZhcy5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZSgpXG5cdFx0XHRsb2NhbFByZXZpZXcuc3RhdGVTd2l0Y2gobG9jYWxQcmV2aWV3LnN0YXRlcy5jdXJyZW50Lm5hbWUpXG5cdFx0XG5cdFx0Q2FudmFzLm9uIFwiY2hhbmdlOndpZHRoXCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlU2NhbGUoKVxuXHRcdFx0bG9jYWxQcmV2aWV3LnN0YXRlU3dpdGNoKGxvY2FsUHJldmlldy5zdGF0ZXMuY3VycmVudC5uYW1lKVxuXHRcdFxuXG5cdFx0U2NyZWVuLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVNjYWxlKClcblx0XHRcdGxvY2FsUHJldmlldy5zdGF0ZVN3aXRjaChsb2NhbFByZXZpZXcuc3RhdGVzLmN1cnJlbnQubmFtZSlcblx0XHRcblx0XHRTY3JlZW4ub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZSgpXG5cdFx0XHRsb2NhbFByZXZpZXcuc3RhdGVTd2l0Y2gobG9jYWxQcmV2aWV3LnN0YXRlcy5jdXJyZW50Lm5hbWUpXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRwcmV2aWV3TW9iaWxlOiAoKSA9PlxuXG5cdFx0QHNjYWxlID0gU2NyZWVuLndpZHRoIC8gQHdpZHRoXG5cdFx0QG9yaWdpblggPSAwXG5cdFx0QG9yaWdpblkgPSAwXG5cdFxuXHRcblxuXHRzZXRDdXN0b21QcmV2aWV3OiAoKSA9PlxuXHRcdEB5ID0gQWxpZ24udG9wXG5cdFx0XG5cdFx0QHNjYWxlID0gKFNjcmVlbi5oZWlnaHQgLSAxMjApIC8gQGhlaWdodFxuXHRcdEBib3JkZXJSYWRpdXMgPSAyMFxuXHRcdEBjbGlwID0gdHJ1ZVxuXG5cblxuXG5cdCMgZ2V0U3RhdGVHZW5lcmljOiAoa2V5ID0gXCJzY2FsZVwiLCBwYWlycyA9IFt7IHZhbHVlOiAsIHJlc3VsdDogfSwge3ZhbHVlOiAsIHJlc3VsdDogfV0sIGRlZmF1bHRSZXN1bHQgPSBcIlwiKVxuXHRnZXRTdGF0ZUdlbmVyaWM6IChzdGF0ZUtleSA9IFwic2NhbGVcIiwgc3RhdGVQYWlycyA9IFtdLCBkZWZhdWx0UmVzdWx0ID0gXCJcIikgPT5cblx0XHRyZXN1bHQgPSBkZWZhdWx0UmVzdWx0XG5cblx0XHRmb3IgaXRlbSBpbiBsb2NhdGlvbi5zZWFyY2hbMS4uXS5zcGxpdCgnJicpXG5cdFx0XHRrZXlWYWx1ZVBhaXIgPSBpdGVtLnNwbGl0KFwiPVwiKVxuXHRcdFx0a2V5UGFydCA9IGtleVZhbHVlUGFpclswXVxuXHRcdFx0dmFsdWVQYXJ0ID0ga2V5VmFsdWVQYWlyWzFdXG5cblx0XHRcdGlmIGtleVBhcnQgPT0gc3RhdGVLZXlcblx0XHRcdFx0Zm9yIHBhaXIgaW4gc3RhdGVQYWlyc1xuXHRcdFx0XHRcdGlmIHZhbHVlUGFydCA9PSBwYWlyLnZhbHVlXG5cdFx0XHRcdFx0XHQjIHByaW50IFwib2sgXCIgKyBcIiAje3BhaXIudmFsdWV9XCIgXG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBwYWlyLnJlc3VsdFxuXHRcdFx0XHRcdCMgZWxzZVxuXHRcdFx0XHRcdFx0IyBwcmludCBcIm5vdCBcIiArIFwiICN7cGFpci52YWx1ZX1cIiBcblx0XHRcblx0XHRyZXR1cm4gcmVzdWx0XG5cdFxuXHRcblx0XG5cdFxuIiwiIyBMb2dvXG5cbmNsYXNzIGV4cG9ydHMuTG9nb0xheWVyIGV4dGVuZHMgU1ZHTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0b3BhY2l0eTogMC41XG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cdFx0XHRzdmc6IGdldExvZ28oXCJGRkZcIilcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEBzdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRAc2hvd0hpbnQgPSAtPiA7XG5cdFx0XG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cdFxuXHRAZGVmaW5lICdoYW5kbGVyJyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9uKEV2ZW50cy5UYXAsIHZhbHVlKVxuXHRcblx0SG92ZXI6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjhcblx0SG92ZXJPZmY6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjVcblxuXG5cbmdldExvZ28gPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gXCIjRkZGRkZGXCJcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCI3NlwiIGhlaWdodD1cIjMyXCIgdmlld0JveD1cIjAgMCA3NiAzMlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk0yLjc5MTk5IDIxLjZDMi43OTE5OSAyMS4xNjggMi45MDM5OSAyMC40MDggMy4xMjc5OSAxOS4zMkw0LjM5OTk5IDEyLjg0SDIuOTgzOTlMMy4wNzk5OSAxMi4xMkM0Ljk5OTk5IDExLjU0NCA2Ljg4Nzk5IDEwLjU1MiA4Ljc0Mzk5IDkuMTQzOThIOS44OTU5OUw5LjMxOTk5IDExLjc2SDExLjE5MkwxMC45NzYgMTIuODRIOS4xMjc5OUw3LjkwMzk5IDE5LjMyQzcuNjk1OTkgMjAuMzEyIDcuNTkxOTkgMjAuOTc2IDcuNTkxOTkgMjEuMzEyQzcuNTkxOTkgMjIuMDggNy45Mjc5OSAyMi41NDQgOC41OTk5OSAyMi43MDRDOC40Mzk5OSAyMy4yNDggOC4wNzE5OSAyMy42OCA3LjQ5NTk5IDI0QzYuOTE5OTkgMjQuMzIgNi4yMjM5OSAyNC40OCA1LjQwNzk5IDI0LjQ4QzQuNTkxOTkgMjQuNDggMy45NTE5OSAyNC4yMjQgMy40ODc5OSAyMy43MTJDMy4wMjM5OSAyMy4yIDIuNzkxOTkgMjIuNDk2IDIuNzkxOTkgMjEuNlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMTcuNTU5OSAyMi42OEMxNy4wNjM5IDIzLjg4IDE2LjAyMzkgMjQuNDggMTQuNDM5OSAyNC40OEMxMy42MjM5IDI0LjQ4IDEyLjk1OTkgMjQuMiAxMi40NDc5IDIzLjY0QzEyLjAxNTkgMjMuMTQ0IDExLjc5OTkgMjIuNjQ4IDExLjc5OTkgMjIuMTUyQzExLjc5OTkgMjAuODU2IDEyLjA5NTkgMTguOTQ0IDEyLjY4NzkgMTYuNDE2TDEzLjU3NTkgMTEuNzZMMTguNDQ3OSAxMS4yOEwxNi45ODM5IDE4Ljg2NEMxNi43MTE5IDIwLjA0OCAxNi41NzU5IDIwLjg0OCAxNi41NzU5IDIxLjI2NEMxNi41NzU5IDIyLjE3NiAxNi45MDM5IDIyLjY0OCAxNy41NTk5IDIyLjY4Wk0xNC4wMDc5IDguNDIzOThDMTQuMDA3OSA3Ljc5OTk4IDE0LjI2MzkgNy4zMTk5OCAxNC43NzU5IDYuOTgzOThDMTUuMzAzOSA2LjY0Nzk4IDE1Ljk0MzkgNi40Nzk5OCAxNi42OTU5IDYuNDc5OThDMTcuNDQ3OSA2LjQ3OTk4IDE4LjA0NzkgNi42NDc5OCAxOC40OTU5IDYuOTgzOThDMTguOTU5OSA3LjMxOTk4IDE5LjE5MTkgNy43OTk5OCAxOS4xOTE5IDguNDIzOThDMTkuMTkxOSA5LjA0Nzk4IDE4LjkzNTkgOS41MTk5OCAxOC40MjM5IDkuODM5OThDMTcuOTI3OSAxMC4xNiAxNy4zMDM5IDEwLjMyIDE2LjU1MTkgMTAuMzJDMTUuNzk5OSAxMC4zMiAxNS4xODM5IDEwLjE2IDE0LjcwMzkgOS44Mzk5OEMxNC4yMzk5IDkuNTE5OTggMTQuMDA3OSA5LjA0Nzk4IDE0LjAwNzkgOC40MjM5OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMjYuMDYwNiAyMi42OEMyNS41NjQ2IDIzLjg4IDI0LjUyNDYgMjQuNDggMjIuOTQwNiAyNC40OEMyMi4xNDA2IDI0LjQ4IDIxLjQ4NDYgMjQuMiAyMC45NzI2IDIzLjY0QzIwLjU1NjYgMjMuMTc2IDIwLjM0ODYgMjIuNjggMjAuMzQ4NiAyMi4xNTJDMjAuMzQ4NiAyMC45NTIgMjAuNjI4NiAxOS4wNCAyMS4xODg2IDE2LjQxNkwyMi45NDA2IDcuMTk5OThMMjcuODEyNiA2LjcxOTk4TDI1LjQ4NDYgMTguODY0QzI1LjIxMjYgMjAuMDQ4IDI1LjA3NjYgMjAuODQ4IDI1LjA3NjYgMjEuMjY0QzI1LjA3NjYgMjIuMTc2IDI1LjQwNDYgMjIuNjQ4IDI2LjA2MDYgMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTM0LjU2MTggMjIuNjhDMzQuMDY1OCAyMy44OCAzMy4wMjU4IDI0LjQ4IDMxLjQ0MTggMjQuNDhDMzAuNjQxOCAyNC40OCAyOS45ODU4IDI0LjIgMjkuNDczOCAyMy42NEMyOS4wNTc4IDIzLjE3NiAyOC44NDk4IDIyLjY4IDI4Ljg0OTggMjIuMTUyQzI4Ljg0OTggMjAuOTUyIDI5LjEyOTggMTkuMDQgMjkuNjg5OCAxNi40MTZMMzEuNDQxOCA3LjE5OTk4TDM2LjMxMzggNi43MTk5OEwzMy45ODU4IDE4Ljg2NEMzMy43MTM4IDIwLjA0OCAzMy41Nzc4IDIwLjg0OCAzMy41Nzc4IDIxLjI2NEMzMy41Nzc4IDIyLjE3NiAzMy45MDU4IDIyLjY0OCAzNC41NjE4IDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk00My4wNjMxIDIyLjY4QzQyLjU2NzEgMjMuODggNDEuNTI3MSAyNC40OCAzOS45NDMxIDI0LjQ4QzM5LjE0MzEgMjQuNDggMzguNDg3MSAyNC4yIDM3Ljk3NTEgMjMuNjRDMzcuNTU5MSAyMy4xNzYgMzcuMzUxMSAyMi42OCAzNy4zNTExIDIyLjE1MkMzNy4zNTExIDIwLjk1MiAzNy42MzExIDE5LjA0IDM4LjE5MTEgMTYuNDE2TDM5Ljk0MzEgNy4xOTk5OEw0NC44MTUxIDYuNzE5OThMNDIuNDg3MSAxOC44NjRDNDIuMjE1MSAyMC4wNDggNDIuMDc5MSAyMC44NDggNDIuMDc5MSAyMS4yNjRDNDIuMDc5MSAyMi4xNzYgNDIuNDA3MSAyMi42NDggNDMuMDYzMSAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNTMuNTMyMyAyMi45OTJDNTIuNzY0MyAyMy45ODQgNTEuNDI4MyAyNC40OCA0OS41MjQzIDI0LjQ4QzQ4LjUzMjMgMjQuNDggNDcuNjc2MyAyNC4xODQgNDYuOTU2MyAyMy41OTJDNDYuMjM2MyAyMi45ODQgNDUuODc2MyAyMi4yNDggNDUuODc2MyAyMS4zODRDNDUuODc2MyAyMC45MDQgNDUuOTAwMyAyMC41NDQgNDUuOTQ4MyAyMC4zMDRMNDcuNTU2MyAxMS43Nkw1Mi40MjgzIDExLjI4TDUwLjY3NjMgMjAuNTQ0QzUwLjYxMjMgMjAuODk2IDUwLjU4MDMgMjEuMTc2IDUwLjU4MDMgMjEuMzg0QzUwLjU4MDMgMjIuMzEyIDUwLjg2MDMgMjIuNzc2IDUxLjQyMDMgMjIuNzc2QzUyLjA0NDMgMjIuNzc2IDUyLjU4MDMgMjIuMzUyIDUzLjAyODMgMjEuNTA0QzUzLjE3MjMgMjEuMjMyIDUzLjI3NjMgMjAuOTIgNTMuMzQwMyAyMC41NjhMNTUuMDQ0MyAxMS43Nkw1OS43NzIzIDExLjI4TDU3Ljk5NjMgMjAuNjRDNTcuOTQ4MyAyMC44OCA1Ny45MjQzIDIxLjEyOCA1Ny45MjQzIDIxLjM4NEM1Ny45MjQzIDIxLjY0IDU3Ljk5NjMgMjEuOTEyIDU4LjE0MDMgMjIuMkM1OC4yODQzIDIyLjQ3MiA1OC41ODgzIDIyLjY0IDU5LjA1MjMgMjIuNzA0QzU4Ljk1NjMgMjMuMDg4IDU4Ljc0MDMgMjMuNDA4IDU4LjQwNDMgMjMuNjY0QzU3LjcwMDMgMjQuMjA4IDU2Ljk2NDMgMjQuNDggNTYuMTk2MyAyNC40OEM1NS40NDQzIDI0LjQ4IDU0Ljg0NDMgMjQuMzQ0IDU0LjM5NjMgMjQuMDcyQzUzLjk0ODMgMjMuOCA1My42NjAzIDIzLjQ0IDUzLjUzMjMgMjIuOTkyWlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk02OS4yOTQ3IDE3LjI1NkM2OS44NzA3IDE2LjIzMiA3MC4xNTg3IDE1LjIgNzAuMTU4NyAxNC4xNkM3MC4xNTg3IDEzLjQ3MiA2OS45MTA3IDEzLjEyOCA2OS40MTQ3IDEzLjEyOEM2OS4wMzA3IDEzLjEyOCA2OC42Mzg3IDEzLjQ1NiA2OC4yMzg3IDE0LjExMkM2Ny44MjI3IDE0Ljc2OCA2Ny41NTA3IDE1LjUyIDY3LjQyMjcgMTYuMzY4TDY2LjE3NDcgMjRMNjEuMjA2NyAyNC40OEw2My42NTQ3IDExLjc2TDY3LjYxNDcgMTEuMjhMNjcuMTgyNyAxMy43MDRDNjcuOTY2NyAxMi4wODggNjkuMjM4NyAxMS4yOCA3MC45OTg3IDExLjI4QzcxLjkyNjcgMTEuMjggNzIuNjM4NyAxMS41MiA3My4xMzQ3IDEyQzczLjY0NjcgMTIuNDggNzMuOTAyNyAxMy4yMTYgNzMuOTAyNyAxNC4yMDhDNzMuOTAyNyAxNS4xODQgNzMuNTc0NyAxNS45ODQgNzIuOTE4NyAxNi42MDhDNzIuMjc4NyAxNy4yMzIgNzEuNDA2NyAxNy41NDQgNzAuMzAyNyAxNy41NDRDNjkuODIyNyAxNy41NDQgNjkuNDg2NyAxNy40NDggNjkuMjk0NyAxNy4yNTZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48L3N2Zz5cblwiXCJcIlxuIiwiXG57IEJ1dHRvbiB9ID0gcmVxdWlyZSBcIkJ1dHRvbnNcIlxuXG57IFByZXZpZXdfQ2xhc3MgfSA9IHJlcXVpcmUgXCJQcmV2aWV3X0NsYXNzXCJcblxuY2xhc3MgRmxvd1ZpZXcgZXh0ZW5kcyBGbG93Q29tcG9uZW50XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRpZiBAcGFyZW50XG5cdFx0XHRAd2lkdGggPSBAcGFyZW50LndpZHRoXG5cdFx0XHRAaGVpZ2h0ID0gQHBhcmVudC5oZWlnaHRcblxuXG5cdFx0IyBAb24gRXZlbnRzLlRyYW5zaXRpb25TdG9wLCAobGF5ZXJBLCBsYXllckIpIC0+XG5cdFx0IyBcdHByaW50IGxheWVyQi5uYW1lXG5cblxuXHRcdEBvbiBFdmVudHMuVHJhbnNpdGlvblN0YXJ0LCAobGF5ZXJBLCBsYXllckIpIC0+XG5cdFx0IyBcdCMgcHJpbnQgXCJzdGFydCDigJQ+IFwiICsgbGF5ZXJBLm5hbWUgPyAxICsgXCIgXCIgKyBsYXllckIubmFtZSA/IDJcblx0XHQjIFx0cHJpbnQgXCItXCJcblx0XHQjIFx0cHJpbnQgXCJzdGFydCDigJQ+IFwiICsgbGF5ZXJCLm5hbWUgPyAyXG5cdFx0XHRpZiBsYXllckIgIT0gdW5kZWZpbmVkIGFuZCBsYXllckIuY3VzdG9tICE9IHVuZGVmaW5lZCBhbmQgbGF5ZXJCLmN1c3RvbS5jdXN0b21BY3Rpb25fQXJyYXkgIT0gdW5kZWZpbmVkXG5cdFx0XHRcdEBpdGVyYXRlVGhyb3VnaENoaWxkcmVuIGxheWVyQiwgbGF5ZXJCLmN1c3RvbS5jdXN0b21BY3Rpb25fQXJyYXksIEBjdXN0b21BY3Rpb25fc3dpdGNoT25MYXllcnNcblx0XHRcdFxuXHRcdFx0aWYgbGF5ZXJBICE9IHVuZGVmaW5lZCBhbmQgbGF5ZXJBLmN1c3RvbSAhPSB1bmRlZmluZWQgYW5kIGxheWVyQS5jdXN0b20uY3VzdG9tQWN0aW9uX0FycmF5ICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRAaXRlcmF0ZVRocm91Z2hDaGlsZHJlbiBsYXllckEsIGxheWVyQS5jdXN0b20uY3VzdG9tQWN0aW9uX0FycmF5LCBAY3VzdG9tQWN0aW9uX3N3aXRjaE9mZkxheWVyc1xuXHRcdFxuXHRcdCMgQG9uIEV2ZW50cy5UcmFuc2l0aW9uSGFsdCwgKGxheWVyQSwgbGF5ZXJCKSAtPlxuXHRcdCMgXHRwcmludCBcImhhbHQg4oCUPiBcIiArIGxheWVyQi5uYW1lID8gMlxuXG5cdFx0IyBAb24gRXZlbnRzLlRyYW5zaXRpb25TdG9wLCAobGF5ZXJBLCBsYXllckIpIC0+XG5cdFx0IyBcdHByaW50IFwic3RvcCDigJQ+IFwiICsgbGF5ZXJCLm5hbWUgPyAyXG5cblx0XHQjIEBvbiBFdmVudHMuVHJhbnNpdGlvbkVuZCwgKGxheWVyQSwgbGF5ZXJCKSAtPlxuXHRcdCMgXHQjIHByaW50IFwiZW5kIOKAlD4gXCIgKyBsYXllckEubmFtZSA/IDEgKyBcIiBcIiArIGxheWVyQi5uYW1lID8gMlxuXHRcdCMgXHRwcmludCBcImVuZCDigJQ+IFwiICsgbGF5ZXJCLm5hbWUgPyAyXG5cdFx0XHRcblx0XHQjIFx0aWYgQHN0YWNrIGFuZCBAc3RhY2subGVuZ3RoID09IDEgYW5kIEBzdGFja1swXSA9PSBsYXllckIgYW5kIGxheWVyQiAhPSB1bmRlZmluZWRcblx0XHQjIFx0XHRAaXRlcmF0ZVRocm91Z2hDaGlsZHJlbiBsYXllckIsIGxheWVyQi5jdXN0b20uY3VzdG9tQWN0aW9uX0FycmF5LCBAY3VzdG9tQWN0aW9uX3N3aXRjaE9uTGF5ZXJzXG5cdFx0XG5cdFx0XG5cblxuXG5cdEBkZWZpbmUgXCJwYXJlbnRcIixcblx0XHRlbnVtZXJhYmxlOiBmYWxzZVxuXHRcdGV4cG9ydGFibGU6IGZhbHNlXG5cdFx0aW1wb3J0YWJsZTogdHJ1ZVxuXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QF9wYXJlbnQgb3IgbnVsbFxuXHRcdFxuXHRcdHNldDogKGxheWVyKSAtPlxuXHRcdFx0cmV0dXJuIGlmIGxheWVyIGlzIEBfcGFyZW50XG5cblx0XHRcdHRocm93IEVycm9yKFwiTGF5ZXIucGFyZW50OiBhIGxheWVyIGNhbm5vdCBiZSBpdCdzIG93biBwYXJlbnQuXCIpIGlmIGxheWVyIGlzIEBcblxuXHRcdFx0IyBDaGVjayB0aGUgdHlwZVxuXHRcdFx0aWYgbm90IGxheWVyIGluc3RhbmNlb2YgTGF5ZXJcblx0XHRcdFx0dGhyb3cgRXJyb3IgXCJMYXllci5wYXJlbnQgbmVlZHMgdG8gYmUgYSBMYXllciBvYmplY3RcIlxuXG5cdFx0XHQjIENhbmNlbCBwcmV2aW91cyBwZW5kaW5nIGluc2VydGlvbnNcblx0XHRcdFV0aWxzLmRvbUNvbXBsZXRlQ2FuY2VsKEBfX2luc2VydEVsZW1lbnQpXG5cblx0XHRcdCMgUmVtb3ZlIGZyb20gcHJldmlvdXMgcGFyZW50IGNoaWxkcmVuXG5cdFx0XHRpZiBAX3BhcmVudFxuXHRcdFx0XHRAX3BhcmVudC5fY2hpbGRyZW4gPSBfLnB1bGwgQF9wYXJlbnQuX2NoaWxkcmVuLCBAXG5cdFx0XHRcdEBfcGFyZW50Ll9lbGVtZW50LnJlbW92ZUNoaWxkIEBfZWxlbWVudFxuXHRcdFx0XHRAX3BhcmVudC5lbWl0IFwiY2hhbmdlOmNoaWxkcmVuXCIsIHthZGRlZDogW10sIHJlbW92ZWQ6IFtAXX1cblx0XHRcdFx0QF9wYXJlbnQuZW1pdCBcImNoYW5nZTpzdWJMYXllcnNcIiwge2FkZGVkOiBbXSwgcmVtb3ZlZDogW0BdfVxuXG5cdFx0XHQjIEVpdGhlciBpbnNlcnQgdGhlIGVsZW1lbnQgdG8gdGhlIG5ldyBwYXJlbnQgZWxlbWVudCBvciBpbnRvIGRvbVxuXHRcdFx0aWYgbGF5ZXJcblx0XHRcdFx0bGF5ZXIuX2VsZW1lbnQuYXBwZW5kQ2hpbGQgQF9lbGVtZW50XG5cdFx0XHRcdGxheWVyLl9jaGlsZHJlbi5wdXNoIEBcblx0XHRcdFx0bGF5ZXIuZW1pdCBcImNoYW5nZTpjaGlsZHJlblwiLCB7YWRkZWQ6IFtAXSwgcmVtb3ZlZDogW119XG5cdFx0XHRcdGxheWVyLmVtaXQgXCJjaGFuZ2U6c3ViTGF5ZXJzXCIsIHthZGRlZDogW0BdLCByZW1vdmVkOiBbXX1cblx0XHRcdGVsc2Vcblx0XHRcdFx0QF9pbnNlcnRFbGVtZW50KClcblxuXHRcdFx0b2xkUGFyZW50ID0gQF9wYXJlbnRcblx0XHRcdCMgU2V0IHRoZSBwYXJlbnRcblx0XHRcdEBfcGFyZW50ID0gbGF5ZXJcblxuXHRcdFx0IyBQbGFjZSB0aGlzIGxheWVyIG9uIHRvcCBvZiBpdHMgc2libGluZ3Ncblx0XHRcdEBicmluZ1RvRnJvbnQoKVxuXG5cdFx0XHRAZW1pdCBcImNoYW5nZTpwYXJlbnRcIiwgQF9wYXJlbnQsIG9sZFBhcmVudFxuXHRcdFx0QGVtaXQgXCJjaGFuZ2U6c3VwZXJMYXllclwiLCBAX3BhcmVudCwgb2xkUGFyZW50XG5cdFx0XHRcblx0XHRcdEB3aWR0aCA9IGxheWVyLndpZHRoXG5cdFx0XHRAaGVpZ2h0ID0gbGF5ZXIuaGVpZ2h0XG5cblxuXHRzdGFja1RyYW5zaXRpb246IChuYXYsIGxheWVyQSwgbGF5ZXJCLCBvdmVybGF5KSAtPlxuXHRcdHRyYW5zaXRpb24gPVxuXHRcdFx0bGF5ZXJBOlxuXHRcdFx0XHRzaG93OiB7eDogMCwgeTogMH1cblx0XHRcdFx0aGlkZToge3g6IDAgLSBsYXllckE/LndpZHRoIC8gMiwgeTogMH1cblx0XHRcdGxheWVyQjpcblx0XHRcdFx0c2hvdzoge3g6IDAsIHk6IDB9XG5cdFx0XHRcdGhpZGU6IHt4OiBsYXllckIud2lkdGgsIHk6IDB9XG5cdFx0XHRvdmVybGF5OlxuXHRcdFx0XHRzaG93OiB7b3BhY2l0eTogLjUsIHg6IDAsIHk6IDAsIHNpemU6IG5hdi5zaXplfVxuXHRcdFx0XHRoaWRlOiB7b3BhY2l0eTogMCwgeDogMCwgeTogMCwgc2l6ZTogbmF2LnNpemV9XG5cblxuXHRtb2RhbFRyYW5zaXRpb246IChuYXYsIGxheWVyQSwgbGF5ZXJCLCBvdmVybGF5KSAtPlxuXHRcdHRyYW5zaXRpb24gPVxuXHRcdFx0bGF5ZXJBOlxuXHRcdFx0XHRzaG93OiB7eDogMCwgeTogMH1cblx0XHRcdFx0aGlkZToge3g6IDAsIHk6IDB9XG5cdFx0XHRsYXllckI6XG5cdFx0XHRcdHNob3c6IHt4OiAwLCB5OiAwfVxuXHRcdFx0XHRoaWRlOiB7eDogMCwgeTogbGF5ZXJBPy5oZWlnaHQgKyAxMH1cblx0XHRcdG92ZXJsYXk6XG5cdFx0XHRcdHNob3c6IHtvcGFjaXR5OiAuNSwgeDogMCwgeTogMCwgc2l6ZTogbmF2LnNpemV9XG5cdFx0XHRcdGhpZGU6IHtvcGFjaXR5OiAwLCB4OiAwLCB5OiAwLCBzaXplOiBuYXYuc2l6ZX1cblxuXG5cdGN1c3RvbUFjdGlvbl9zd2l0Y2hPbkxheWVyczogKGxheWVyLCBib3gsIGZsb3cpIC0+XG5cdFx0IyBpZiBib3ggPT0gdW5kZWZpbmVkIHRoZW4gcmV0dXJuXG5cblx0XHRsYXllclRvQ2hlY2sgPSBsYXllclxuXHRcdGluZGV4ID0gYm94LmluZGV4T2YobGF5ZXJUb0NoZWNrKVxuXG5cdFx0aWYgaW5kZXggIT0gLTFcblx0XHRcdGxheWVyLmlnbm9yZUV2ZW50cyA9IGZhbHNlXG5cdFx0XHRib3guc3BsaWNlKGluZGV4LCAxKVxuXG5cblxuXHRjdXN0b21BY3Rpb25fc3dpdGNoT2ZmTGF5ZXJzOiAobGF5ZXIsIGJveCwgZmxvdykgLT5cblx0XHRcblx0XHQjIGlmIGxheWVyLm5hbWUgPT0gXCJ0ZW1wbmFtZVwiIHRoZW4gcHJpbnQgXCJva1wiXG5cdFx0IyBpZiBsYXllci5zaG91bGRTaG93SGludCgpXG5cdFx0IyBwcmludCBcImNoZWNrOiBcIiArIGxheWVyLm5hbWVcblxuXHRcdGlmIGZsb3cuc2hvdWxkU2hvd0hpbnRPdmVycmlkZShsYXllcilcblx0XHRcdCMgcHJpbnQgXCJ3aWxsIG9mZiBsYXllciBcIiArIGxheWVyLm5hbWVcblx0XHRcdGJveC5wdXNoIGxheWVyXG5cdFx0XHRsYXllci5pZ25vcmVFdmVudHMgPSB0cnVlXG5cdFx0XG5cblx0XHQjIGlmIGxheWVyLnBhcmVudCBpbnN0YW5jZW9mIFNjcm9sbENvbXBvbmVudCBvciBsYXllci5wYXJlbnQgaW5zdGFuY2VvZiBQYWdlQ29tcG9uZW50XG5cdFx0IyBcdCMgcHJpbnQgXCJoZXJlXCJcblx0XHQjIFx0IyBwcmludCBsYXllclxuXHRcdCMgXHQjIHByaW50IGxheWVyLnBhcmVudFxuXHRcdCMgXHQjIHByaW50IGxheWVyLmlnbm9yZUV2ZW50c1xuXG5cdFx0IyBcdGlmIGxheWVyLmlnbm9yZUV2ZW50cyA9PSBmYWxzZVxuXHRcdCMgXHRcdCMgcHJpbnQgXCJpbnNpZGVcIlxuXHRcdCMgXHRcdGJveC5wdXNoIGxheWVyXG5cdFx0IyBcdFx0bGF5ZXIuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXG5cblxuXHRcdCMgaWYgbGF5ZXIgaW5zdGFuY2VvZiBCdXR0b25cblx0XHQjIFx0aWYgIWxheWVyLmlnbm9yZUV2ZW50c1xuXHRcdCMgXHRcdGJveC5wdXNoIGxheWVyXG5cdFx0IyBcdFx0bGF5ZXIuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXHRcdFxuXHRcdCMgZWxzZSBpZiBsYXllci5wYXJlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uVmlld1xuXHRcdCMgXHRib3gucHVzaCBsYXllclxuXHRcdCMgXHRsYXllci5pZ25vcmVFdmVudHMgPSB0cnVlXG5cblx0XHQjIFx0Ym94LnB1c2ggbGF5ZXIucGFyZW50XG5cdFx0IyBcdGxheWVyLnBhcmVudC5pZ25vcmVFdmVudHMgPSB0cnVlXG5cdFx0XG5cdFx0IyBlbHNlIGlmIGxheWVyLnBhcmVudCBpbnN0YW5jZW9mIE1vZGFsVmlld1xuXG5cdFx0IyBcdGJveC5wdXNoIGxheWVyXG5cdFx0IyBcdGxheWVyLmlnbm9yZUV2ZW50cyA9IHRydWVcblxuXHRcdCMgXHRib3gucHVzaCBsYXllci5wYXJlbnRcblx0XHQjIFx0bGF5ZXIucGFyZW50Lmlnbm9yZUV2ZW50cyA9IHRydWVcblxuXHRcdCMgXHRib3gucHVzaCBsYXllci5wYXJlbnQucGFyZW50XG5cdFx0IyBcdGxheWVyLnBhcmVudC5wYXJlbnQuaWdub3JlRXZlbnRzID0gdHJ1ZVxuXG5cdFxuXHRcblx0XG5cdHNob3VsZFNob3dIaW50T3ZlcnJpZGU6IChsYXllcikgLT5cblx0XHRpZiBsYXllci5pZ25vcmVFdmVudHMgaXMgdHJ1ZSB0aGVuIHJldHVybiBmYWxzZVxuXHRcdCMgaWYgbGF5ZXIuaXNBbmltYXRpbmcgdGhlbiByZXR1cm4gZmFsc2VcblxuXHRcdCMgZm9yIHBhcmVudCBpbiBAYW5jZXN0b3JzKClcblx0XHRcdCMgcmV0dXJuIGZhbHNlIGlmIHBhcmVudC5pc0FuaW1hdGluZ1xuXG5cdFx0IyBmb3IgcGFyZW50IGluIGxheWVyLmFuY2VzdG9ycygpXG5cdFx0IyBcdCMgaWYgcGFyZW50IGluc3RhbmNlb2YgUHJldmlld19DbGFzc1xuXHRcdCMgXHQjIFx0IyBpZiBsYXllciBpbnN0YW5jZW9mIEJ1dHRvbiB0aGVuIHByaW50IFwiSEVSRVwiXG5cdFx0IyBcdCMgXHRjb250aW51ZVxuXHRcdCMgXHQjIGlmIHBhcmVudC5pc0FuaW1hdGluZ1xuXHRcdCMgXHQjIFx0aWYgbGF5ZXIgaW5zdGFuY2VvZiBCdXR0b24gdGhlbiBwcmludCBcIj8/P1wiXG5cdFx0IyBcdCMgXHRpZiBsYXllciBpbnN0YW5jZW9mIEJ1dHRvbiB0aGVuIHByaW50IHBhcmVudFxuXHRcdCMgXHRyZXR1cm4gZmFsc2UgaWYgcGFyZW50LmlzQW5pbWF0aW5nXG5cblx0XHRpZiBsYXllci5fZHJhZ2dhYmxlIGFuZCBsYXllci5fZHJhZ2dhYmxlLmhvcml6b250YWwgaXMgZmFsc2UgYW5kIGxheWVyLl9kcmFnZ2FibGUudmVydGljYWwgaXMgZmFsc2Vcblx0XHRcdHJldHVybiBmYWxzZVxuXG5cdFx0cmV0dXJuIGZhbHNlIGlmIGxheWVyLm9wYWNpdHkgaXMgMFxuXG5cdFx0Zm9yIGV2ZW50TmFtZSBpbiBsYXllci5saXN0ZW5lckV2ZW50cygpXG5cdFx0XHRyZXR1cm4gdHJ1ZSBpZiBFdmVudHMuaXNJbnRlcmFjdGl2ZShldmVudE5hbWUpXG5cdFx0XG5cdFx0cmV0dXJuIGZhbHNlXG5cblxuXG5cdGl0ZXJhdGVUaHJvdWdoQ2hpbGRyZW46IChsYXllciwgYm94LCBhY3Rpb25DYWxsYmFjaykgLT5cblx0XHRhY3Rpb25DYWxsYmFjayBsYXllciwgYm94LCBAXG5cdFx0Zm9yIGNoaWxkIGluIGxheWVyLmNoaWxkcmVuXG5cdFx0XHRAaXRlcmF0ZVRocm91Z2hDaGlsZHJlbiBjaGlsZCwgYm94LCBhY3Rpb25DYWxsYmFja1xuXG5cblx0b3BlbjogKG5hdmlnYXRpb25WaWV3KSAtPlxuXHRcdG5hdmlnYXRpb25WaWV3LnNjcm9sbFRvVG9wKGZhbHNlKVxuXHRcdCMgQGl0ZXJhdGVUaHJvdWdoQ2hpbGRyZW4gQGN1cnJlbnQsIEBjdXJyZW50LmN1c3RvbS5jdXN0b21BY3Rpb25fQXJyYXksIEBjdXN0b21BY3Rpb25fc3dpdGNoT2ZmTGF5ZXJzXG5cblx0XHRpZiBuYXZpZ2F0aW9uVmlldy53cmFwcGVyICE9IHVuZGVmaW5lZCBhbmQgbmF2aWdhdGlvblZpZXcud3JhcHBlciAhPSBudWxsXG5cdFx0XHRAdHJhbnNpdGlvbihuYXZpZ2F0aW9uVmlldy5wYXJlbnQsIEBtb2RhbFRyYW5zaXRpb24pXG5cdFx0XHQjIEBpdGVyYXRlVGhyb3VnaENoaWxkcmVuIG5hdmlnYXRpb25WaWV3LnBhcmVudCwgbmF2aWdhdGlvblZpZXcucGFyZW50LmN1c3RvbS5jdXN0b21BY3Rpb25fQXJyYXksIEBjdXN0b21BY3Rpb25fc3dpdGNoT25MYXllcnNcblx0XHRlbHNlXG5cdFx0XHRAdHJhbnNpdGlvbihuYXZpZ2F0aW9uVmlldywgQHN0YWNrVHJhbnNpdGlvbilcblx0XHRcdCMgQGl0ZXJhdGVUaHJvdWdoQ2hpbGRyZW4gbmF2aWdhdGlvblZpZXcsIG5hdmlnYXRpb25WaWV3LmN1c3RvbS5jdXN0b21BY3Rpb25fQXJyYXksIEBjdXN0b21BY3Rpb25fc3dpdGNoT25MYXllcnNcblxuXG5cblxuXG5cbmNsYXNzIE1vZGFsVmlldyBleHRlbmRzIFNjcm9sbENvbXBvbmVudFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0bmF2aWdhdGlvblZpZXdfV3JhcHBlciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJ3cmFwcGVyXCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRjdXN0b21BY3Rpb25fQXJyYXk6IFtdXG5cblx0XHRuYXZpZ2F0aW9uVmlld19XcmFwcGVyLm9uIEV2ZW50cy5UYXAsIC0+XG5cdFx0XHRAY2hpbGRyZW5bMF0uZmxvdy5zaG93UHJldmlvdXMoKVxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGZsb3c6IG51bGxcblx0XHRcdHdyYXBwZXI6IG5hdmlnYXRpb25WaWV3X1dyYXBwZXJcblx0XHRcdHNjcm9sbFZlcnRpY2FsOiB0cnVlXG5cdFx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0ZGlyZWN0aW9uTG9jazogdHJ1ZVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0XG5cdFx0QHBhcmVudCA9IG5hdmlnYXRpb25WaWV3X1dyYXBwZXJcblxuXHRcdEBvbiBFdmVudHMuVGFwLCAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuXHRcdEBvbiBFdmVudHMuU3dpcGVEb3duU3RhcnQsIChldmVudCwgbGF5ZXIpIC0+XG5cdFx0XHRpZiBAc2Nyb2xsWSA8IDBcblx0XHRcdFx0QGZsb3cuc2hvd1ByZXZpb3VzKClcblx0XHRcdFx0IyBAZmxvdy5pdGVyYXRlVGhyb3VnaENoaWxkcmVuIEAsIEBjdXN0b20uY3VzdG9tQWN0aW9uX0FycmF5LCBAZmxvdy5jdXN0b21BY3Rpb25fc3dpdGNoT2ZmTGF5ZXJzXG5cblx0XHRpZiBAZmxvd1xuXHRcdFx0QGZsb3cuc2hvd05leHQoQHdyYXBwZXIpXG5cdFx0XHRAZmxvdy5zaG93UHJldmlvdXMoYW5pbWF0ZTogZmFsc2UpXG5cblxuXG5cdEBkZWZpbmUgJ2Zsb3cnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZmxvd1xuXHRcdCMgc2V0OiAodmFsdWUpIC0+XG5cdFx0IyBcdEBvcHRpb25zLmZsb3cgPSB2YWx1ZVxuXHRcdCMgXHR2YWx1ZS5zaG93TmV4dChAKVxuXHRcdCMgXHR2YWx1ZS5zaG93UHJldmlvdXMoYW5pbWF0ZTogZmFsc2UpXG5cdFxuXHRAZGVmaW5lICd3cmFwcGVyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLndyYXBwZXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMud3JhcHBlciA9IHZhbHVlXG5cblx0QGRlZmluZSBcInBhcmVudFwiLFxuXHRcdGVudW1lcmFibGU6IGZhbHNlXG5cdFx0ZXhwb3J0YWJsZTogZmFsc2Vcblx0XHRpbXBvcnRhYmxlOiB0cnVlXG5cblx0XHRnZXQ6IC0+XG5cdFx0XHRAX3BhcmVudCBvciBudWxsXG5cdFx0XG5cdFx0c2V0OiAobGF5ZXIpIC0+XG5cblx0XHRcdCMgRmxvdyBwYXJlbnRcblx0XHRcdGlmIGxheWVyICE9IEB3cmFwcGVyXG5cdFx0XHRcdEBvcHRpb25zLmZsb3cgPSBsYXllclxuXG5cdFx0XHRcdEB3cmFwcGVyLnBhcmVudCA9IGxheWVyXG5cdFx0XHRcdEB3cmFwcGVyLndpZHRoID0gbGF5ZXIud2lkdGhcblx0XHRcdFx0QHdyYXBwZXIuaGVpZ2h0ID0gbGF5ZXIuaGVpZ2h0XG5cdFx0XHRcdEB3aWR0aCA9IGxheWVyLndpZHRoXG5cdFx0XHRcdEBoZWlnaHQgPSBsYXllci5oZWlnaHRcblxuXHRcdFx0XHRyZXR1cm5cblxuXG5cdFx0XHRyZXR1cm4gaWYgbGF5ZXIgaXMgQF9wYXJlbnRcblxuXHRcdFx0dGhyb3cgRXJyb3IoXCJMYXllci5wYXJlbnQ6IGEgbGF5ZXIgY2Fubm90IGJlIGl0J3Mgb3duIHBhcmVudC5cIikgaWYgbGF5ZXIgaXMgQFxuXG5cdFx0XHQjIENoZWNrIHRoZSB0eXBlXG5cdFx0XHRpZiBub3QgbGF5ZXIgaW5zdGFuY2VvZiBMYXllclxuXHRcdFx0XHR0aHJvdyBFcnJvciBcIkxheWVyLnBhcmVudCBuZWVkcyB0byBiZSBhIExheWVyIG9iamVjdFwiXG5cblx0XHRcdCMgQ2FuY2VsIHByZXZpb3VzIHBlbmRpbmcgaW5zZXJ0aW9uc1xuXHRcdFx0VXRpbHMuZG9tQ29tcGxldGVDYW5jZWwoQF9faW5zZXJ0RWxlbWVudClcblxuXHRcdFx0IyBSZW1vdmUgZnJvbSBwcmV2aW91cyBwYXJlbnQgY2hpbGRyZW5cblx0XHRcdGlmIEBfcGFyZW50XG5cdFx0XHRcdEBfcGFyZW50Ll9jaGlsZHJlbiA9IF8ucHVsbCBAX3BhcmVudC5fY2hpbGRyZW4sIEBcblx0XHRcdFx0QF9wYXJlbnQuX2VsZW1lbnQucmVtb3ZlQ2hpbGQgQF9lbGVtZW50XG5cdFx0XHRcdEBfcGFyZW50LmVtaXQgXCJjaGFuZ2U6Y2hpbGRyZW5cIiwge2FkZGVkOiBbXSwgcmVtb3ZlZDogW0BdfVxuXHRcdFx0XHRAX3BhcmVudC5lbWl0IFwiY2hhbmdlOnN1YkxheWVyc1wiLCB7YWRkZWQ6IFtdLCByZW1vdmVkOiBbQF19XG5cblx0XHRcdCMgRWl0aGVyIGluc2VydCB0aGUgZWxlbWVudCB0byB0aGUgbmV3IHBhcmVudCBlbGVtZW50IG9yIGludG8gZG9tXG5cdFx0XHRpZiBsYXllclxuXHRcdFx0XHRsYXllci5fZWxlbWVudC5hcHBlbmRDaGlsZCBAX2VsZW1lbnRcblx0XHRcdFx0bGF5ZXIuX2NoaWxkcmVuLnB1c2ggQFxuXHRcdFx0XHRsYXllci5lbWl0IFwiY2hhbmdlOmNoaWxkcmVuXCIsIHthZGRlZDogW0BdLCByZW1vdmVkOiBbXX1cblx0XHRcdFx0bGF5ZXIuZW1pdCBcImNoYW5nZTpzdWJMYXllcnNcIiwge2FkZGVkOiBbQF0sIHJlbW92ZWQ6IFtdfVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAX2luc2VydEVsZW1lbnQoKVxuXG5cdFx0XHRvbGRQYXJlbnQgPSBAX3BhcmVudFxuXHRcdFx0IyBTZXQgdGhlIHBhcmVudFxuXHRcdFx0QF9wYXJlbnQgPSBsYXllclxuXG5cdFx0XHQjIFBsYWNlIHRoaXMgbGF5ZXIgb24gdG9wIG9mIGl0cyBzaWJsaW5nc1xuXHRcdFx0QGJyaW5nVG9Gcm9udCgpXG5cblx0XHRcdEBlbWl0IFwiY2hhbmdlOnBhcmVudFwiLCBAX3BhcmVudCwgb2xkUGFyZW50XG5cdFx0XHRAZW1pdCBcImNoYW5nZTpzdXBlckxheWVyXCIsIEBfcGFyZW50LCBvbGRQYXJlbnRcblxuXG5cdFxuXHRhZGQ6IChjb250ZW50VmlldykgLT5cblx0XHRjb250ZW50Vmlldy5wYXJlbnQgPSBAY3VzdG9tLnZpZXcuY29udGVudFxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBudWxsXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5jbGFzcyBOYXZpZ2F0aW9uVmlldyBleHRlbmRzIFNjcm9sbENvbXBvbmVudFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGZsb3c6IG51bGxcblx0XHRcdGJhY2tCdXR0b246IG51bGxcblx0XHRcdHNob3dCYWNrOiB0cnVlXG5cdFx0XHRzY3JvbGxWZXJ0aWNhbDogdHJ1ZVxuXHRcdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRcdGRpcmVjdGlvbkxvY2s6IHRydWVcblx0XHRcdGN1c3RvbTpcblx0XHRcdFx0YmFja0J1dHRvbl9uYW1lOiBcIkJhY2tfQnV0dG9uXCJcblx0XHRcdFx0Y3VzdG9tQWN0aW9uX0FycmF5OiBbXVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHR0cnkgQGJhY2tCdXR0b24uYnJpbmdUb0Zyb250KClcblxuXHRcdEBvbiBFdmVudHMuU3dpcGVSaWdodFN0YXJ0LCAoZXZlbnQsIGxheWVyKSA9PlxuXHRcdFx0dHJ5IEBmbG93LnNob3dQcmV2aW91cygpXG5cdFx0XHQjIHRyeSBAZmxvdy5pdGVyYXRlVGhyb3VnaENoaWxkcmVuIEAsIEBjdXN0b20uY3VzdG9tQWN0aW9uX0FycmF5LCBAZmxvdy5jdXN0b21BY3Rpb25fc3dpdGNoT2ZmTGF5ZXJzXG5cdFx0XG5cdFx0QG9uIFwiY2hhbmdlOmNoaWxkcmVuXCIsIC0+XG5cdFx0XHR0cnkgQGJhY2tCdXR0b24uYnJpbmdUb0Zyb250KClcblx0XG5cblx0QGRlZmluZSAnZmxvdycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5mbG93XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5mbG93ID0gdmFsdWVcblx0XHRcdHZhbHVlLnNob3dOZXh0KEApXG5cdFx0XHR2YWx1ZS5zaG93UHJldmlvdXMoYW5pbWF0ZTogZmFsc2UpXG5cblxuXG5cdEBkZWZpbmUgJ2JhY2tCdXR0b24nLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYmFja0J1dHRvblxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuYmFja0J1dHRvbiA9IHZhbHVlXG5cdFx0XHR2YWx1ZS5uYW1lID0gQGN1c3RvbS5iYWNrQnV0dG9uX25hbWVcblxuXHRcdFx0dmFsdWUucGFyZW50ID0gQFxuXHRcdFx0dmFsdWUuYnJpbmdUb0Zyb250KClcblx0XHRcdFxuXHRcdFx0dHJ5IHZhbHVlLmhhbmRsZXIgPSAoKSA9PlxuXHRcdFx0XHRAZmxvdy5zaG93UHJldmlvdXMoKVxuXHRcdFx0XHQjIEBmbG93Lml0ZXJhdGVUaHJvdWdoQ2hpbGRyZW4gQCwgQGN1c3RvbS5jdXN0b21BY3Rpb25fQXJyYXksIEBmbG93LmN1c3RvbUFjdGlvbl9zd2l0Y2hPZmZMYXllcnNcblx0XG5cdEBkZWZpbmUgJ3Nob3dCYWNrJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNob3dCYWNrXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5zaG93QmFjayA9IHZhbHVlXG5cdFx0XHRpZiB2YWx1ZSA9PSB0cnVlIGFuZCBAYmFja0J1dHRvbiA9PSBudWxsXG5cdFx0XHRcdEBiYWNrQnV0dG9uID0gQGNyZWF0ZV9CYWNrQnV0dG9uKClcblxuXHRcblx0Y3JlYXRlX0JhY2tCdXR0b246ICgpID0+XG5cblx0XHRyZXR1cm4gbmV3IEJ1dHRvblxuXHRcdFx0bmFtZTogQGN1c3RvbS5iYWNrQnV0dG9uX25hbWVcblx0XHRcdHBhcmVudDogQCwgc2l6ZTogODAsIHk6IDMyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdCMgYmFja2dyb3VuZENvbG9yOiBcInJlZFwiXG5cdFx0XHRoYW5kbGVyOiAoKSAtPiBAcGFyZW50LmZsb3cuc2hvd1ByZXZpb3VzKClcblxuXG5cdEBkZWZpbmUgXCJwYXJlbnRcIixcblx0XHRlbnVtZXJhYmxlOiBmYWxzZVxuXHRcdGV4cG9ydGFibGU6IGZhbHNlXG5cdFx0aW1wb3J0YWJsZTogdHJ1ZVxuXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QF9wYXJlbnQgb3IgbnVsbFxuXHRcdFxuXHRcdHNldDogKGxheWVyKSAtPlxuXG5cdFx0XHRyZXR1cm4gaWYgbGF5ZXIgaXMgQF9wYXJlbnRcblxuXHRcdFx0dGhyb3cgRXJyb3IoXCJMYXllci5wYXJlbnQ6IGEgbGF5ZXIgY2Fubm90IGJlIGl0J3Mgb3duIHBhcmVudC5cIikgaWYgbGF5ZXIgaXMgQFxuXG5cdFx0XHQjIENoZWNrIHRoZSB0eXBlXG5cdFx0XHRpZiBub3QgbGF5ZXIgaW5zdGFuY2VvZiBMYXllclxuXHRcdFx0XHR0aHJvdyBFcnJvciBcIkxheWVyLnBhcmVudCBuZWVkcyB0byBiZSBhIExheWVyIG9iamVjdFwiXG5cblx0XHRcdCMgQ2FuY2VsIHByZXZpb3VzIHBlbmRpbmcgaW5zZXJ0aW9uc1xuXHRcdFx0VXRpbHMuZG9tQ29tcGxldGVDYW5jZWwoQF9faW5zZXJ0RWxlbWVudClcblxuXHRcdFx0IyBSZW1vdmUgZnJvbSBwcmV2aW91cyBwYXJlbnQgY2hpbGRyZW5cblx0XHRcdGlmIEBfcGFyZW50XG5cdFx0XHRcdEBfcGFyZW50Ll9jaGlsZHJlbiA9IF8ucHVsbCBAX3BhcmVudC5fY2hpbGRyZW4sIEBcblx0XHRcdFx0QF9wYXJlbnQuX2VsZW1lbnQucmVtb3ZlQ2hpbGQgQF9lbGVtZW50XG5cdFx0XHRcdEBfcGFyZW50LmVtaXQgXCJjaGFuZ2U6Y2hpbGRyZW5cIiwge2FkZGVkOiBbXSwgcmVtb3ZlZDogW0BdfVxuXHRcdFx0XHRAX3BhcmVudC5lbWl0IFwiY2hhbmdlOnN1YkxheWVyc1wiLCB7YWRkZWQ6IFtdLCByZW1vdmVkOiBbQF19XG5cblx0XHRcdCMgRWl0aGVyIGluc2VydCB0aGUgZWxlbWVudCB0byB0aGUgbmV3IHBhcmVudCBlbGVtZW50IG9yIGludG8gZG9tXG5cdFx0XHRpZiBsYXllclxuXHRcdFx0XHRsYXllci5fZWxlbWVudC5hcHBlbmRDaGlsZCBAX2VsZW1lbnRcblx0XHRcdFx0bGF5ZXIuX2NoaWxkcmVuLnB1c2ggQFxuXHRcdFx0XHRsYXllci5lbWl0IFwiY2hhbmdlOmNoaWxkcmVuXCIsIHthZGRlZDogW0BdLCByZW1vdmVkOiBbXX1cblx0XHRcdFx0bGF5ZXIuZW1pdCBcImNoYW5nZTpzdWJMYXllcnNcIiwge2FkZGVkOiBbQF0sIHJlbW92ZWQ6IFtdfVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAX2luc2VydEVsZW1lbnQoKVxuXG5cdFx0XHRvbGRQYXJlbnQgPSBAX3BhcmVudFxuXHRcdFx0IyBTZXQgdGhlIHBhcmVudFxuXHRcdFx0QF9wYXJlbnQgPSBsYXllclxuXG5cdFx0XHQjIFBsYWNlIHRoaXMgbGF5ZXIgb24gdG9wIG9mIGl0cyBzaWJsaW5nc1xuXHRcdFx0QGJyaW5nVG9Gcm9udCgpXG5cblx0XHRcdEBlbWl0IFwiY2hhbmdlOnBhcmVudFwiLCBAX3BhcmVudCwgb2xkUGFyZW50XG5cdFx0XHRAZW1pdCBcImNoYW5nZTpzdXBlckxheWVyXCIsIEBfcGFyZW50LCBvbGRQYXJlbnRcblxuXHRcdFx0QHdpZHRoID0gQHBhcmVudC53aWR0aFxuXHRcdFx0QGhlaWdodCA9IEBwYXJlbnQuaGVpZ2h0XG5cblx0XHRcdEBmbG93ID0gQHBhcmVudFxuXG5cdFxuXG5cblx0YWRkOiAoY29udGVudFZpZXcpIC0+XG5cdFx0Y29udGVudFZpZXcucGFyZW50ID0gQGNvbnRlbnRcblxuXG5cbm1vZHVsZS5leHBvcnRzID0geyBGbG93VmlldywgTmF2aWdhdGlvblZpZXcsIE1vZGFsVmlldyB9IiwiXG4jIFNWRyA9IHJlcXVpcmUgXCJQQ1NWR1wiXG5cbmNsYXNzIFRleHQgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0IyBmb250RmFtaWx5OiBmb250QXZlcmlhXG5cdFx0XHRmb250U2l6ZTogMThcblx0XHRcdHdlaWdodDogNzAwXG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRoZWlnaHQ6IDIwXG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiAwLjdcblx0XHRcdGxldHRlclNwYWNpbmc6IDAuNFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAc3R5bGUgPVxuXHRcdFx0XCJmb250LWZhbWlseVwiOiBcIidTRiBQcm8gVGV4dCcsICdQVCBTYW5zJywgJ0hlbHZldGljYScsICdUYWhvbWEnLCBzYW5zLXNlcmlmO1wiXG5cdFx0XHRcImZvbnQtd2VpZ2h0XCI6IDcwMFxuXHRcdFx0XCItd2Via2l0LWZvbnQtZmVhdHVyZS1zZXR0aW5nc1wiOiBcIidzczAyJyBvbiwgJ3NzMDYnIG9uLCAnc3MwOScgb24sICdzczExJyBvbjtcIlxuXHRcdFx0XCItbW96LWZvbnQtZmVhdHVyZS1zZXR0aW5nc1wiOiBcIidzczAyJyBvbiwgJ3NzMDYnIG9uLCAnc3MwOScgb24sICdzczExJyBvbjtcIlxuXHRcdFx0XCItbXMtZm9udC1mZWF0dXJlLXNldHRpbmdzXCI6IFwiJ3NzMDInIG9uLCAnc3MwNicgb24sICdzczA5JyBvbiwgJ3NzMTEnIG9uO1wiXG5cdFx0XHRcImZvbnQtZmVhdHVyZS1zZXR0aW5nc1wiOiBcIidzczAyJyBvbiwgJ3NzMDYnIG9uLCAnc3MwOScgb24sICdzczExJyBvbjtcIlxuXHRcdFxuXG5cblxuY2xhc3MgVGV4dEJ1dHRvbiBleHRlbmRzIFRleHRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0dHVwbGU6IHsgbm9ybWFsOiAwLjUsIGhvdmVyOiAwLjggfVxuXHRcdFx0aGFuZGxlcjogbnVsbFxuXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cblx0XHRAdXBkYXRlVHVwbGUoQHR1cGxlKVxuXHRcblx0XG5cdFx0XG5cdEhvdmVyOiA9PlxuXHRcdEBvcGFjaXR5ID0gQHR1cGxlLmhvdmVyXG5cdEhvdmVyT2ZmOiA9PlxuXHRcdEBvcGFjaXR5ID0gQHR1cGxlLm5vcm1hbFxuXHRcblx0dXBkYXRlVHVwbGU6IChuZXdUdXBsZSkgPT5cblx0XHRAdHVwbGUgPSBuZXdUdXBsZVxuXHRcdEBlbWl0IEV2ZW50cy5Nb3VzZU92ZXJcblx0XHRAZW1pdCBFdmVudHMuTW91c2VPdXRcblx0XG5cdFxuXHRAZGVmaW5lICdoYW5kbGVyJyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9uKEV2ZW50cy5UYXAsIHZhbHVlKVxuXHRcblx0QGRlZmluZSAndHVwbGUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudHVwbGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnR1cGxlID0gdmFsdWVcblxuXG5cbmNsYXNzIEJ1dHRvbiBleHRlbmRzIFRleHRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0aGFuZGxlcjogbnVsbFxuXHRcdFx0aGVpZ2h0OiAzMiwgYm9yZGVyUmFkaXVzOiA4XG5cdFx0XHRwYWRkaW5nOiB7IHRvcDogNiwgYm90dG9tOiA3LCBsZWZ0OiA5LCByaWdodDogOSB9XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwLjcpXCJcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEBzaG93SGludCA9IC0+IDtcblx0XHRAc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cdFx0XG5cdEhvdmVyOiA9PlxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsMC40KVwiXG5cdEhvdmVyT2ZmOiA9PlxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsMC43KVwiXG5cdFxuXHRAZGVmaW5lICdoYW5kbGVyJyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9uKEV2ZW50cy5UYXAsIHZhbHVlKVxuXG5cbmNsYXNzIEJ1dHRvblRhYiBleHRlbmRzIEJ1dHRvblxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRzZWxlY3RlZDogdHJ1ZVxuXHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdEhvdmVyOiA9PlxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsMC40KVwiXG5cdEhvdmVyT2ZmOiA9PlxuXHRcdGlmIEBzZWxlY3RlZCB0aGVuIEBiYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsMC43KVwiXG5cdFx0ZWxzZSBAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuMilcIlxuXG5cdEBkZWZpbmUgJ3NlbGVjdGVkJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNlbGVjdGVkXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5zZWxlY3RlZCA9IHZhbHVlXG5cdFx0XHRpZiB2YWx1ZSB0aGVuIEBiYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsMC43KVwiXG5cdFx0XHRlbHNlIEBiYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsMC4yKVwiXG5cblxuIyBCdXR0b246IFNWR1xuXG4jIGNsYXNzIFNWR0J1dHRvbiBleHRlbmRzIFRleHRCdXR0b25cbiMgXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuIyBcdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcbiMgXHRcdFx0dGV4dDogXCJcIlxuIyBcdFx0XHRhc3NldDogbnVsbFxuIyBcdFx0XHRjbGlwOiBmYWxzZVxuIyBcdFx0XHRhdXRvU2l6ZTogZmFsc2Vcblx0XHRcbiMgXHRcdEBzdmdTaGFwZSA9IG5ldyBTVkdMYXllclxuIyBcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwibnVsbFwiLCBuYW1lOiBcInN2Z1NoYXBlXCJcblx0XHRcbiMgXHRcdHN1cGVyIEBvcHRpb25zXG4jIFx0XHRAc3ZnU2hhcGUucGFyZW50ID0gQFxuIyBcdFx0QHVwZGF0ZVNWR1NpemUoKVxuXHRcblx0XG4jIFx0QGRlZmluZSAnYXNzZXQnLFxuIyBcdFx0Z2V0OiAtPiBAb3B0aW9ucy5hc3NldFxuIyBcdFx0c2V0OiAodmFsdWUpIC0+XG4jIFx0XHRcdEBvcHRpb25zLmFzc2V0ID0gdmFsdWVcbiMgXHRcdFx0QHN2Z1NoYXBlLnN0YXRlcyA9XG4jIFx0XHRcdFx0XCJvbkRhcmtcIjogeyBzdmc6IHZhbHVlLm9uRGFyayB9XG4jIFx0XHRcdFx0XCJvbkxpZ2h0XCI6IHsgc3ZnOiB2YWx1ZS5vbkxpZ2h0IH1cbiMgXHRcdFx0QHN2Z1NoYXBlLnN0YXRlU3dpdGNoKFwib25EYXJrXCIpXG5cdFxuIyBcdHVwZGF0ZVNWR1NpemU6ICgpID0+XG4jIFx0XHRAc3ZnU2hhcGUud2lkdGggPSBAd2lkdGhcbiMgXHRcdEBzdmdTaGFwZS5oZWlnaHQgPSBAaGVpZ2h0XG5cdFxuXG5cblxuXG4jIEJ1dHRvbjogQ29weVxuXG4jIGNsYXNzIENvcHlCdXR0b24gZXh0ZW5kcyBUZXh0QnV0dG9uXG4jIFx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcbiMgXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG4jIFx0XHRcdGxpbms6IFwiaHR0cHM6Ly90aWxsbHVyLmNvbVwiXG4jIFx0XHRcdGhhbmRsZXI6IEBjb3B5SGFuZGxlclxuXHRcdFxuIyBcdFx0QGFyZWEgPSBuZXcgTGF5ZXJcbiMgXHRcdFx0b3BhY2l0eTogMCwgeDogLTMwMDAsIGh0bWw6IG51bGxcblx0XHRcbiMgXHRcdHN1cGVyIEBvcHRpb25zXG4jIFx0XHRAYXJlYS5wYXJlbnQgPSBAXG5cdFxuXHRcbiMgXHRAZGVmaW5lICdsaW5rJyxcbiMgXHRcdGdldDogLT4gQG9wdGlvbnMubGlua1xuIyBcdFx0c2V0OiAodmFsdWUpIC0+XG4jIFx0XHRcdEBvcHRpb25zLmxpbmsgPSB2YWx1ZVxuIyBcdFx0XHRAdXBkYXRlKHZhbHVlKVxuXHRcblx0XG4jIFx0dXBkYXRlOiAobGluaykgPT5cbiMgXHRcdEBhcmVhLmh0bWwgPSBcIjx0ZXh0YXJlYSBjbGFzcz0nanMtY29weXRleHRhcmVhLWNsYXNzJyBzdHlsZT0nb3BhY2l0eTowOyc+I3tsaW5rfTwvdGV4dGFyZWE+XCJcblx0XG5cdFxuIyBcdGNvcHlIYW5kbGVyOiA9PlxuIyBcdFx0dGV4dERpdiA9IEBhcmVhLnF1ZXJ5U2VsZWN0b3IoJy5qcy1jb3B5dGV4dGFyZWEtY2xhc3MnKVxuIyBcdFx0dGV4dERpdi5mb2N1cygpXG4jIFx0XHR0ZXh0RGl2LnNlbGVjdCgpXG4jIFx0XHRkb2N1bWVudC5leGVjQ29tbWFuZCAnY29weSdcblx0XHRcbiMgXHRcdG9yaWdpblRpdGxlID0gQHRleHRcbiMgXHRcdEB0ZXh0ID0gXCJEb25lIPCfkYxcIlxuIyBcdFx0VXRpbHMuZGVsYXkgMSwgPT4gQHRleHQgPSBvcmlnaW5UaXRsZVxuXG5cblxuXG4jICMgIyBCdXR0b246IENvcHlcblxuIyAjIGNsYXNzIExpbmtCdXR0b24gZXh0ZW5kcyBTVkdCdXR0b25cbiMgIyBcdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG4jICMgXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG4jICMgXHRcdFx0bGluazogXCJodHRwczovL3RpbGxsdXIuY29tXCJcbiMgIyBcdFx0XHRib3JkZXJXaWR0aDogMSAqIDJcbiMgIyBcdFx0XHRib3JkZXJSYWRpdXM6IDIwICogMlxuIyAjIFx0XHRcdHR1cGxlOiB7IG5vcm1hbDogMS4wLCBob3ZlcjogMC44IH1cblx0XHRcdFxuXHRcdFxuIyAjIFx0XHRAdGludEJ1dHRvbkZpeCA9IG5ldyBMYXllclxuIyAjIFx0XHRcdGhlaWdodDogMTIwICogMlxuIyAjIFx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuIyAjIFx0XHRAYnV0dG9uVGV4dCA9IG5ldyBUZXh0XG4jICMgXHRcdFx0Zm9udFNpemU6IDMyICogMlxuIyAjIFx0XHRcdHRleHRBbGlnbjogXCJyaWdodFwiXG4jICMgXHRcdFx0aGVpZ2h0OiA2MCAqIDJcblx0XHRcbiMgIyBcdFx0QGJ1dHRvbkljb24gPSBuZXcgU1ZHTGF5ZXJcbiMgIyBcdFx0XHR3aWR0aDogMjQgKiAyLCBoZWlnaHQ6IDI0ICogMlxuIyAjIFx0XHRcdHN2ZzogU1ZHLm9wZW5JY29uLm9uTGlnaHRcbiMgIyBcdFx0XHRvcGFjaXR5OiAwLjZcblx0XHRcdFxuXG5cdFx0XG4jICMgXHRcdHN1cGVyIEBvcHRpb25zXG5cbiMgIyBcdFx0QGJ1dHRvblRleHQudGV4dCA9IEB0ZXh0XG4jICMgXHRcdEB0ZXh0ID0gXCJcIlxuXG4jICMgXHRcdEB0aW50QnV0dG9uRml4LnBhcmVudCA9IEBwYXJlbnRcbiMgIyBcdFx0QHRpbnRCdXR0b25GaXgueCA9IEFsaWduLnJpZ2h0XG4jICMgXHRcdEB0aW50QnV0dG9uRml4LnkgPSBBbGlnbi50b3Bcblx0XHRcbiMgIyBcdFx0QHBhcmVudCA9IEB0aW50QnV0dG9uRml4XG4jICMgXHRcdEB5ID0gQWxpZ24udG9wKDMwICogMilcbiMgIyBcdFx0QGhlaWdodCA9IDYwICogMlxuXG4jICMgXHRcdEBidXR0b25UZXh0LnBhcmVudCA9IEBcbiMgIyBcdFx0QGJ1dHRvblRleHQueCA9IDE2ICogMlxuIyAjIFx0XHRAYnV0dG9uVGV4dC55ID0gOSAqIDJcblxuIyAjIFx0XHRAYnV0dG9uSWNvbi5wYXJlbnQgPSBAXG4jICMgXHRcdEBidXR0b25JY29uLnggPSAxNiAqIDIgKyBAYnV0dG9uVGV4dC53aWR0aCArIDE2ICogMlxuIyAjIFx0XHRAYnV0dG9uSWNvbi55ID0gQWxpZ24uY2VudGVyKDMgKiAyKVxuXG4jICMgXHRcdEB3aWR0aCA9IDE2ICogMiArIEBidXR0b25UZXh0LndpZHRoICsgQGJ1dHRvbkljb24ud2lkdGggKyAxNiAqIDIgKyAxNiAqIDJcbiMgIyBcdFx0QHRpbnRCdXR0b25GaXgud2lkdGggPSBAd2lkdGggKyAzMCAqIDIgKyAxNiAqIDJcblxuIyAjIFx0XHRAdGludEJ1dHRvbkZpeC54ID0gQWxpZ24ucmlnaHRcbiMgIyBcdFx0QHggPSBBbGlnbi5yaWdodCgtMzAgKiAyKVxuXHRcdFxuXHRcblxuIyAjIFx0QGRlZmluZSAnbGluaycsXG4jICMgXHRcdGdldDogLT4gQG9wdGlvbnMubGlua1xuIyAjIFx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMubGluayA9IHZhbHVlXG5cdFxuIyAjIFx0c2V0Q29sb3I6IChjb2xvciA9IG51bGwpID0+XG4jICMgXHRcdGlmIGNvbG9yID09IG51bGwgdGhlbiByZXR1cm5cbiMgIyBcdFx0QHRpbnRCdXR0b25GaXguYmFja2dyb3VuZENvbG9yID0gY29sb3Jcblx0XG5cblxuXG5cblxuXG5cblxuIyBjbGFzcyBQcmV2aWV3QnV0dG9uIGV4dGVuZHMgVGV4dFxuIyBcdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cbiMgXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG4jIFx0XHRcdHR1cGxlOiB7IG5vcm1hbDogMS4wLCBob3ZlcjogMC44IH1cblx0XHRcbiMgXHRcdHN1cGVyIEBvcHRpb25zXG5cbiMgXHRcdEByZW1vdmVBbGxMaXN0ZW5lcnMoKVxuXG4jIFx0XHRALm9uTW91c2VPdmVyIEBIb3ZlclxuIyBcdFx0QC5vbk1vdXNlT3V0IEBIb3Zlck9mZlxuXG4jIFx0SG92ZXI6ID0+XG4jIFx0XHQjIEBzY2FsZSA9IDEuMDVcbiMgXHRcdEBvcGFjaXR5ID0gMS4wXG5cdFxuIyBcdEhvdmVyT2ZmOiA9PlxuIyBcdFx0IyBAc2NhbGUgPSAxLjBcbiMgXHRcdEBvcGFjaXR5ID0gMC44XG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0ge1RleHQsIFRleHRCdXR0b24sIEJ1dHRvbiwgQnV0dG9uVGFifVxuXG5cbiIsIlxuXG57SW5pdFZpZXd9ID0gcmVxdWlyZSBcIkluaXRWaWV3XCJcblxub3ZlcnJpZGVUaW1lVmFsdWUgPSBcIjIwOjIxXCJcblxuY2xhc3MgZXhwb3J0cy5QaG9uZVR5cGVWaWV3IGV4dGVuZHMgSW5pdFZpZXdcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRzdGF0dXNCYXI6IFwiZGFya1wiICMgbGlnaHQvZGFya1xuXHRcdFx0aG9tZUJhcjogXCJkYXJrXCIgIyBsaWdodC9kYXJrXG5cblx0XHRcdHZpc2libGU6IHRydWUgIyB0cnVlIC8gZmFsc2Vcblx0XHRcdGZvcmNlQW5kcm9pZEJhcjogZmFsc2UgIyB0cnVlIC8gZmFsc2VcblxuXHRcdFx0IyBvdmVycmlkZSB3aXRoIGNhcmVcblx0XHRcdHByb3RvdHlwZUNyZWF0aW9uWWVhcjogb3ZlcnJpZGVUaW1lVmFsdWVcblxuXHRcdFx0IyBnZXR0ZXJzXG5cdFx0XHRzdGF0dXNCYXJWaWV3OiBudWxsXG5cdFx0XHRob21lQmFyVmlldzogbnVsbFxuXHRcdFx0XG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XG5cblxuXHRAZGVmaW5lICdzdGF0dXNCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc3RhdHVzQmFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnN0YXR1c0JhciA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdob21lQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmhvbWVCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuaG9tZUJhciA9IHZhbHVlXG5cblx0QGRlZmluZSAnZm9yY2VBbmRyb2lkQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZEJhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRCYXIgPSB2YWx1ZVxuXHRcblxuXHRAZGVmaW5lICdzaG93QmFycycsXG5cdFx0Z2V0OiAtPiBpZiBAb3B0aW9ucy52aXNpYmxlIHRoZW4gcmV0dXJuIDEgZWxzZSByZXR1cm4gMFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy52aXNpYmxlID0gdmFsdWVcblxuXHQjIGRlcHJlY2F0ZWRcblx0QGRlZmluZSAndmlzaWJsZScsXG5cdFx0Z2V0OiAtPiBpZiBAb3B0aW9ucy52aXNpYmxlIHRoZW4gcmV0dXJuIDEgZWxzZSByZXR1cm4gMFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy52aXNpYmxlID0gdmFsdWVcblx0XG5cblxuXHRAZGVmaW5lICdwcm90b3R5cGVDcmVhdGlvblllYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnByb3RvdHlwZUNyZWF0aW9uWWVhciA9IHZhbHVlXG5cblxuXG5cdEBkZWZpbmUgJ3N0YXR1c0JhclZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc3RhdHVzQmFyVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zdGF0dXNCYXJWaWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2hvbWVCYXJWaWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmhvbWVCYXJWaWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmhvbWVCYXJWaWV3ID0gdmFsdWVcblxuXG5cblxuXHQjIENyZWF0ZSBCYXJzXG5cblx0Y3JlYXRlQmFyczogKCkgPT5cblx0XHRAc3RhdHVzQmFyVmlldyA9IG5ldyBMYXllciBcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IEB3aWR0aCwgeTogQWxpZ24udG9wLCBuYW1lOiBcIi5zdGF0dXMgYmFyXCJcblx0XHRcdG9wYWNpdHk6IEB2aXNpYmxlLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRpZiBAZm9yY2VBbmRyb2lkQmFyXG5cdFx0XHRAY3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXIoQHN0YXR1c0JhclZpZXcpIFxuXG5cdFx0ZWxzZSBpZiBAdmlld1NpemUoMzc1LCA4MTIpIG9yIEB2aWV3U2l6ZSgzOTAsIDg0NCkgb3IgQHZpZXdTaXplKDQxNCwgODk2KSBvciBAdmlld1NpemUoNDI4LCA5MjYpIG9yIEB2aWV3U2l6ZSgzNjAsIDc4Milcblx0XHRcdEBjcmVhdGVOb3RjaFN0YXR1c0JhcihAc3RhdHVzQmFyVmlldylcblx0XHRcdEBjcmVhdGVIb21lSW5kaWNhdG9yIG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiBAd2lkdGgsIGhlaWdodDogMzQsIHk6IEFsaWduLmJvdHRvbSwgbmFtZTogXCIuaG9tZSBiYXJcIiwgb3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM5MywgODUyKVxuXHRcdFx0cHJpbnQgXCJva1wiXG5cdFx0XHRAY3JlYXRlTm90Y2hTdGF0dXNCYXIoQHN0YXR1c0JhclZpZXcpXG5cdFx0XHRAY3JlYXRlSG9tZUluZGljYXRvciBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBALCB3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IDM0LCB5OiBBbGlnbi5ib3R0b20sIG5hbWU6IFwiLmhvbWUgYmFyXCIsIG9wYWNpdHk6IEB2aXNpYmxlLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRlbHNlIGlmIEB2aWV3U2l6ZSgzNzUsIDY2Nykgb3IgQHZpZXdTaXplKDQxNCwgNzM2KSBvciBAdmlld1NpemUoMzIwLCA1NjgpXG5cdFx0XHRAY3JlYXRlQ2xhc3NpY1N0YXR1c0JhcihAc3RhdHVzQmFyVmlldylcblx0XHRcblx0XHRcblx0XHRlbHNlIEBjcmVhdGVBbmRyb2lkU3RhdHVzQmFyKEBzdGF0dXNCYXJWaWV3KVxuXHRcblx0XG5cdFxuXHRcblxuXG5cblx0Y3JlYXRlQW5kcm9pZFN0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDMyXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1MiwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ubGVmdCg0KSwgeTogQWxpZ24udG9wKDIgKyA1KVxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbQHN0YXR1c0Jhcl0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDE0LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogMjAsIHg6IEFsaWduLnJpZ2h0KC00KSwgeTogQWxpZ24udG9wKDUpXG5cdFx0XHRpbWFnZTogQGFzc2V0cy5hbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZVtAc3RhdHVzQmFyXVxuXHRcblx0XG5cdGNyZWF0ZUNsYXNzaWNBbmRyb2lkU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gMjBcblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDUyLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5sZWZ0LCB5OiBBbGlnbi50b3AoMilcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0BzdGF0dXNCYXJdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxNCwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5yaWdodCwgeTogQWxpZ24udG9wKClcblx0XHRcdGltYWdlOiBAYXNzZXRzLmFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlW0BzdGF0dXNCYXJdXG5cdFxuXHRcblxuXG5cblx0Y3JlYXRlQ2xhc3NpY1N0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDIwXG5cdFx0XG5cdFx0Y2xhc3NpY0xlZnRDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5sZWZ0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5vbGRTdGF0dXNCYXJMZWZ0SW1hZ2VbQHN0YXR1c0Jhcl1cblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDU0LCBoZWlnaHQ6IDE2LCB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbQHN0YXR1c0Jhcl0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5yaWdodFxuXHRcdFx0aW1hZ2U6IEBhc3NldHMub2xkU3RhdHVzQmFyUmlnaHRJbWFnZVtAc3RhdHVzQmFyXVxuXHRcdFxuXHRcblx0Y3JlYXRlTm90Y2hTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSA0NFxuXHRcdFxuXHRcdG5vdGNoTGVmdENvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1NCwgaGVpZ2h0OiAyMSwgeDogQWxpZ24ubGVmdCgyMSksIHk6IEFsaWduLnRvcCgxMilcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0BzdGF0dXNCYXJdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGwsIGxldHRlclNwYWNpbmc6IC0wLjE3XG5cdFx0XHRmb250U2l6ZTogMTUsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRub3RjaENlbnRlckNvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDM3NSwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLmNlbnRlclxuXHRcdFx0aW1hZ2U6IEBhc3NldHMubm90Y2hcblx0XHRcblx0XHRub3RjaFJpZ2h0Q29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24ucmlnaHRcblx0XHRcdGltYWdlOiBAYXNzZXRzLnN0YXR1c0JhclJpZ2h0SW1hZ2VbQHN0YXR1c0Jhcl1cblx0XG5cdFxuXHRcblxuXG5cblx0Y3JlYXRlSG9tZUluZGljYXRvcjogKGJhckxheWVyKSA9PlxuXHRcdEBob21lQmFyVmlldyA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIuaG9tZVZpZXdcIlxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEzNSwgaGVpZ2h0OiA1LCB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmJvdHRvbSgtOClcblx0XHRcdGJhY2tncm91bmRDb2xvcjogQGFzc2V0cy5jb2xvcltAaG9tZUJhcl0sIGJvcmRlclJhZGl1czogMjBcblx0XG5cdCIsIiMgUHJldmlldyBDb21wb25lbnRcblxuRnJhbWVyLkRlZmF1bHRzLkFuaW1hdGlvbiA9XG5cdGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSlcblx0dGltZTogMC41XG5cbiMge1ByZXZpZXdfQ2xhc3N9ID0gcmVxdWlyZSBcIlByZXZpZXdfQ2xhc3NcIlxuIyB7UHJldmlld19Jbml0fSA9IHJlcXVpcmUgXCJQcmV2aWV3X0luaXRcIlxue1ByZXZpZXdfVUl9ID0gcmVxdWlyZSBcIlByZXZpZXdfVUlcIlxuIyB7Q29udHJvbF9DbGFzc30gPSByZXF1aXJlIFwiQ29udHJvbF9DbGFzc1wiXG5cbmNsYXNzIEZpeFByZXZpZXdFeHBvcnQgZXh0ZW5kcyBQcmV2aWV3X1VJXG5jbGFzcyBleHBvcnRzLlByZXZpZXcgZXh0ZW5kcyBGaXhQcmV2aWV3RXhwb3J0XG5cblxuXG5cbiMgTmF0aXZlXG5cbmB3aW5kb3cuc2F2ZVByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0ID0gZnVuY3Rpb24gKGxheWVyKSB7XG5cdHdpbmRvdy5wcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdCA9IGxheWVyXG59XG5gXG5cbmB3aW5kb3cucmVjZWl2ZU1lc3NhZ2VOb3JtYWwgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0d2luZG93LnByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0LmFuaW1hdGVTdGF0ZVRvTm9ybWFsKClcbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0ZU5vcm1hbFwiLCByZWNlaXZlTWVzc2FnZU5vcm1hbCwgZmFsc2UpO1xuYFxuXG5gd2luZG93LnJlY2VpdmVNZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdGNvbnNvbGUubG9nKGV2ZW50KVxuXHR3aW5kb3cucHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QuYW5pbWF0ZVN0YXRlVG9GaWxsKClcbn1cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0ZUZpbGxcIiwgcmVjZWl2ZU1lc3NhZ2UsIGZhbHNlKTtcbmBcblxuXG5cblxuXG5cbiIsIlxuXG5leHBvcnRzLmRhdGEgPVxuXHRjb2xvcjpcblx0XHRkYXJrOiBcIiMwMDBcIlxuXHRcdGxpZ2h0OiBcIiNGRkZcIlxuXHRcblxuXHRcblx0c3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyTGVmdEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0YW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvYW5kcm9pZFN0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0XG5cblxuXHRub3RjaDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX25vdGNoLnBuZ1wiXG5cdHRpcDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvdGlwLnBuZ1wiXG4iLCJcblxub3ZlcnJpZGVUaW1lVmFsdWUgPSBcIjIwOjIxXCJcblxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3X0NsYXNzIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdHN0YXRlR3VhcmRMYXllciA9IG5ldyBMYXllciB7IG9wYWNpdHk6IDAsIHNpemU6IDEgfVxuXHRcdHN0YXRlR3VhcmRMYXllci5zdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBzY2FsZTogMSB9XG5cdFx0XHRcImZpbGxcIjogeyBzY2FsZTogMSB9XG5cdFx0c3RhdGVHdWFyZExheWVyLnN0YXRlU3dpdGNoKFwiZmlsbFwiKVxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdG5hbWU6IFwiUHJldmlld1wiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGJvcmRlclJhZGl1czogNDJcblxuXHRcdFx0c3RhdGVHdWFyZDogc3RhdGVHdWFyZExheWVyXG5cdFx0XHR2aWV3OiBudWxsXG5cblx0XHRcdGJvcmRlclZpZXc6IG51bGxcblx0XHRcdHN0YXR1c0JhclZpZXc6IG51bGxcblx0XHRcdGhvbWVCYXJWaWV3OiBudWxsXG5cblx0XHRcdGNvbmZpZ1ZpZXc6IG51bGxcblx0XHRcdHNlY3Rpb25WaWV3OiBudWxsXG5cdFx0XHRcblxuXG5cdFx0XHQjIERldmljZVxuXHRcdFx0c2hvd0RldmljZTogdHJ1ZVxuXG5cdFx0XHQjIEJhcnNcblx0XHRcdHNob3dCYXJzOiB0cnVlXG5cdFx0XHRzaG93U3RhdHVzQmFyOiB0cnVlXG5cdFx0XHRzaG93SG9tZUJhcjogdHJ1ZVxuXG5cdFx0XHR0aW1lVmFsdWU6IG92ZXJyaWRlVGltZVZhbHVlICMgbm8gb3ZlcnJpZGVcblx0XHRcdGZvcmNlQW5kcm9pZEJhcjogZmFsc2Vcblx0XHRcdHN0YXR1c0Jhcl90aGVtZTogXCJkYXJrXCJcblx0XHRcdGhvbWVCYXJfdGhlbWU6IFwiZGFya1wiXG5cblx0XHRcdCMgQ29udHJvbHNcblx0XHRcdHNob3dVSTogdHJ1ZVxuXHRcdFx0c2hvd0xvZ286IHRydWVcblx0XHRcdHNjYWxlU3RhdGU6IFwiZmlsbFwiICMgZmlsbCAvIG5vcm1hbFxuXHRcdFx0c2hvd0hpbnRzOiB0cnVlXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdHdpbmRvdy5zYXZlUHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QoQClcblx0XHRAdXBkYXRlSW5pdCgpXG5cdFx0XG5cdFx0QHN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IHNjYWxlOiAxIH1cblx0XHRcdFwiZmlsbFwiOiB7IHNjYWxlOiAxIH1cblxuXG5cblx0QGRlZmluZSAndmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy52aWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy52aWV3ID0gdmFsdWVcblx0XHRcdEB3aWR0aCA9IEB2aWV3LndpZHRoXG5cdFx0XHRAaGVpZ2h0ID0gQHZpZXcuaGVpZ2h0XG5cdFx0XHRAdmlldy5wYXJlbnQgPSBAXG5cdFxuXHRAZGVmaW5lICdzdGF0ZUd1YXJkJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnN0YXRlR3VhcmRcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc3RhdGVHdWFyZCA9IHZhbHVlXG5cblxuXG5cdEBkZWZpbmUgJ2RldmljZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ib3JkZXJWaWV3XG5cdFxuXHRAZGVmaW5lICdzdGF0dXNCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc3RhdHVzQmFyVmlld1xuXHRcblx0QGRlZmluZSAnaG9tZUJhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ob21lQmFyVmlld1xuXG5cblxuXHRAZGVmaW5lICdib3JkZXJWaWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmJvcmRlclZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuYm9yZGVyVmlldyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdzdGF0dXNCYXJWaWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnN0YXR1c0JhclZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc3RhdHVzQmFyVmlldyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdob21lQmFyVmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ob21lQmFyVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ob21lQmFyVmlldyA9IHZhbHVlXG5cblxuXG5cdEBkZWZpbmUgJ2NvbmZpZ1ZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuY29uZmlnVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5jb25maWdWaWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3NlY3Rpb25WaWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNlY3Rpb25WaWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNlY3Rpb25WaWV3ID0gdmFsdWVcblx0XG5cblx0XG5cdFxuXHRcblxuXHRhbmltYXRlU3RhdGVUb05vcm1hbDogKCkgPT5cblx0XHRAc3RhdGVHdWFyZC5zdGF0ZVN3aXRjaChcIm5vcm1hbFwiKVxuXHRcdEBhbmltYXRlKHNjYWxlOiBAc3RhdGVzW1wibm9ybWFsXCJdLnNjYWxlLCBvcHRpb25zOiB7IGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSB9KVxuXHRcdGlmIEBib3JkZXJWaWV3IHRoZW4gQGJvcmRlclZpZXcuYW5pbWF0ZVN0YXRlVG9Ob3JtYWwoKVxuXHRcblx0YW5pbWF0ZVN0YXRlVG9GaWxsOiAoKSA9PlxuXHRcdEBzdGF0ZUd1YXJkLnN0YXRlU3dpdGNoKFwiZmlsbFwiKVxuXHRcdEBhbmltYXRlKHNjYWxlOiBAc3RhdGVzW1wiZmlsbFwiXS5zY2FsZSwgb3B0aW9uczogeyBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUgfSlcblx0XHRpZiBAYm9yZGVyVmlldyB0aGVuIEBib3JkZXJWaWV3LmFuaW1hdGVTdGF0ZVRvRmlsbCgpXG5cblx0c3RhdGVTd2l0Y2hUb05vcm1hbDogKCkgPT5cblx0XHRAc3RhdGVHdWFyZC5zdGF0ZVN3aXRjaChcIm5vcm1hbFwiKVxuXHRcdEBhbmltYXRlKHNjYWxlOiBAc3RhdGVzW1wibm9ybWFsXCJdLnNjYWxlLCBvcHRpb25zOiB7IGN1cnZlOiBCZXppZXIubGluZWFyLCB0aW1lOiAwIH0pXG5cdFx0aWYgQGJvcmRlclZpZXcgdGhlbiBAYm9yZGVyVmlldy5zdGF0ZVN3aXRjaFRvTm9ybWFsKClcblx0XG5cdHN0YXRlU3dpdGNoVG9GaWxsOiAoKSA9PlxuXHRcdEBzdGF0ZUd1YXJkLnN0YXRlU3dpdGNoKFwiZmlsbFwiKVxuXHRcdEBhbmltYXRlKHNjYWxlOiBAc3RhdGVzW1wiZmlsbFwiXS5zY2FsZSwgb3B0aW9uczogeyBjdXJ2ZTogQmV6aWVyLmxpbmVhciwgdGltZTogMCB9KVxuXHRcdGlmIEBib3JkZXJWaWV3IHRoZW4gQGJvcmRlclZpZXcuc3RhdGVTd2l0Y2hUb0ZpbGwoKVxuXHRcblxuXHRcblx0XG5cblx0QGRlZmluZSAnc2hvd0RldmljZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93RGV2aWNlXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNob3dEZXZpY2UgPSB2YWx1ZVxuXHRcblxuXG5cdEBkZWZpbmUgJ3Nob3dCYXJzJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNob3dCYXJzXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNob3dCYXJzID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3Nob3dTdGF0dXNCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2hvd1N0YXR1c0JhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zaG93U3RhdHVzQmFyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3Nob3dIb21lQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNob3dIb21lQmFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNob3dIb21lQmFyID0gdmFsdWVcblxuXG5cblxuXG5cdEBkZWZpbmUgJ3RpbWVWYWx1ZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50aW1lVmFsdWVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudGltZVZhbHVlID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2ZvcmNlQW5kcm9pZEJhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuZm9yY2VBbmRyb2lkQmFyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3N0YXR1c0Jhcl90aGVtZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zdGF0dXNCYXJfdGhlbWVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc3RhdHVzQmFyX3RoZW1lID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2hvbWVCYXJfdGhlbWUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaG9tZUJhcl90aGVtZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ob21lQmFyX3RoZW1lID0gdmFsdWVcblxuXG5cblxuXHRAZGVmaW5lICdzaG93VUknLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2hvd1VJXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNob3dVSSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdzaG93TG9nbycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93TG9nb1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zaG93TG9nbyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdzaG93SGludHMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2hvd0hpbnRzXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNob3dIaW50cyA9IHZhbHVlXG5cdFxuXHRcblx0XG5cblxuXHRAZGVmaW5lICdzY2FsZVN0YXRlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNjYWxlU3RhdGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2NhbGVTdGF0ZSA9IHZhbHVlXG5cdFxuXG5cblxuXG5cblxuXG5cdHVwZGF0ZUluaXQ6ICgpID0+XG5cblx0XHRAc2NhbGVTdGF0ZSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJzY2FsZVwiLCBbeyB2YWx1ZTogXCJmaWxsXCIsIHJlc3VsdDogXCJmaWxsXCIgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwibm9ybWFsXCIsIHJlc3VsdDogXCJub3JtYWxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IFwibm9ybWFsXCIgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwidHJ1ZVwiLCByZXN1bHQ6IFwiZmlsbFwiIH1dLCBAc2NhbGVTdGF0ZSlcblx0XHRcblx0XHRAc2NhbGVTdGF0ZSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJmaWxsXCIsIFt7IHZhbHVlOiBcIm9uXCIsIHJlc3VsdDogXCJmaWxsXCIgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogXCJub3JtYWxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogXCJmaWxsXCIgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwiZmFsc2VcIiwgcmVzdWx0OiBcIm5vcm1hbFwiIH1dLCBAc2NhbGVTdGF0ZSlcblxuXHRcdEBzaG93VUkgPSBAZ2V0U3RhdGVHZW5lcmljKFwiYnV0dG9uXCIsIFt7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwidHJ1ZVwiLCByZXN1bHQ6IHRydWUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwib25cIiwgcmVzdWx0OiB0cnVlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9mZlwiLCByZXN1bHQ6IGZhbHNlIH1dLCBAc2hvd1VJKVxuXHRcdFxuXHRcdEBzaG93VUkgPSBAZ2V0U3RhdGVHZW5lcmljKFwidWlcIiwgW3sgdmFsdWU6IFwiZmFsc2VcIiwgcmVzdWx0OiBmYWxzZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogdHJ1ZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvblwiLCByZXN1bHQ6IHRydWUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogZmFsc2UgfV0sIEBzaG93VUkpXG5cblx0XHRAc2hvd0xvZ28gPSBAZ2V0U3RhdGVHZW5lcmljKFwibG9nb1wiLCBbeyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcInRydWVcIiwgcmVzdWx0OiB0cnVlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9uXCIsIHJlc3VsdDogdHJ1ZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvZmZcIiwgcmVzdWx0OiBmYWxzZSB9XSwgQHNob3dMb2dvKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0QHNob3dEZXZpY2UgPSBAZ2V0U3RhdGVHZW5lcmljKFwiZGV2aWNlXCIsIFt7IHZhbHVlOiBcIm9mZlwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwib25cIiwgcmVzdWx0OiB0cnVlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwiZmFsc2VcIiwgcmVzdWx0OiBmYWxzZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcInRydWVcIiwgcmVzdWx0OiB0cnVlIH1dLCBAc2hvd0RldmljZSlcblx0XHRcblx0XHRAc2hvd0hpbnRzID0gQGdldFN0YXRlR2VuZXJpYyhcImhpbnRzXCIsIFt7IHZhbHVlOiBcIm9mZlwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwib25cIiwgcmVzdWx0OiB0cnVlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwiZmFsc2VcIiwgcmVzdWx0OiBmYWxzZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcInRydWVcIiwgcmVzdWx0OiB0cnVlIH1dLCBAc2hvd0hpbnRzKVxuXG5cblxuXHQjIGdldFN0YXRlR2VuZXJpYzogKGtleSA9IFwic2NhbGVcIiwgcGFpcnMgPSBbeyB2YWx1ZTogLCByZXN1bHQ6IH0sIHt2YWx1ZTogLCByZXN1bHQ6IH1dLCBkZWZhdWx0UmVzdWx0ID0gXCJcIilcblx0Z2V0U3RhdGVHZW5lcmljOiAoc3RhdGVLZXkgPSBcInNjYWxlXCIsIHN0YXRlUGFpcnMgPSBbXSwgZGVmYXVsdFJlc3VsdCA9IFwiXCIpID0+XG5cdFx0cmVzdWx0ID0gZGVmYXVsdFJlc3VsdFxuXG5cdFx0Zm9yIGl0ZW0gaW4gbG9jYXRpb24uc2VhcmNoWzEuLl0uc3BsaXQoJyYnKVxuXHRcdFx0a2V5VmFsdWVQYWlyID0gaXRlbS5zcGxpdChcIj1cIilcblx0XHRcdGtleVBhcnQgPSBrZXlWYWx1ZVBhaXJbMF1cblx0XHRcdHZhbHVlUGFydCA9IGtleVZhbHVlUGFpclsxXVxuXG5cdFx0XHRpZiBrZXlQYXJ0ID09IHN0YXRlS2V5XG5cdFx0XHRcdGZvciBwYWlyIGluIHN0YXRlUGFpcnNcblx0XHRcdFx0XHRpZiB2YWx1ZVBhcnQgPT0gcGFpci52YWx1ZVxuXHRcdFx0XHRcdFx0cmVzdWx0ID0gcGFpci5yZXN1bHRcblx0XHRcdFx0XHQjIGVsc2Vcblx0XHRcdFx0XHRcdCMgcHJpbnQgXCJub3QgXCIgKyBcIiAje3BhaXIudmFsdWV9XCIgXG5cdFx0XG5cdFx0cmV0dXJuIHJlc3VsdFxuXHRcblx0XG5cdFxuXHRcbiIsIlxuXG57UHJldmlld19DbGFzc30gPSByZXF1aXJlIFwiUHJldmlld19DbGFzc1wiXG57RGV2aWNlX0NsYXNzfSA9IHJlcXVpcmUgXCJEZXZpY2VfQ2xhc3NcIlxuXG57SG9tZUJhcl9DbGFzc30gPSByZXF1aXJlIFwiSG9tZUJhcl9DbGFzc1wiXG57U3RhdHVzQmFyX0NsYXNzfSA9IHJlcXVpcmUgXCJTdGF0dXNCYXJfQ2xhc3NcIlxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXdfSW5pdCBleHRlbmRzIFByZXZpZXdfQ2xhc3Ncblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHNjYWxlUHJldmlldygpXG5cblx0XG5cdFxuXHRzY2FsZVByZXZpZXc6ICgpID0+XG5cdFx0aWYgVXRpbHMuaXNNb2JpbGUoKSB0aGVuIEBwcmV2aWV3TW9iaWxlKClcblx0XHRlbHNlIEBwcmV2aWV3RGVza3RvcCgpXG5cdFxuXHR1cGRhdGVQcmV2aWV3OiAoKSA9PlxuXHRcdGlmIEBzdGF0ZUd1YXJkLnN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJmaWxsXCIgdGhlbiBAc3RhdGVTd2l0Y2hUb0ZpbGwoKVxuXHRcdGVsc2UgQHN0YXRlU3dpdGNoVG9Ob3JtYWwoKVxuXG5cdFx0IyBpZiBAYm9yZGVyVmlld1xuXHRcdCMgXHRpZiBAc2NhbGVTdGF0ZSA9PSBcImZpbGxcIiB0aGVuIEBib3JkZXJWaWV3LnN0YXRlU3dpdGNoVG9GaWxsKClcblx0XHQjIFx0ZWxzZSBAYm9yZGVyVmlldy5zdGF0ZVN3aXRjaFRvTm9ybWFsKClcblx0XG5cblxuXG5cdHByZXZpZXdEZXNrdG9wOiAoKSA9PlxuXHRcdGlmIEBzaG93RGV2aWNlIHRoZW4gQGJvcmRlclZpZXcgPSBuZXcgRGV2aWNlX0NsYXNzIHsgdmlldzogQCB9XG5cblx0XHRpZiBAc2hvd0hpbnRzIHRoZW4gRnJhbWVyLkV4dHJhcy5IaW50cy5lbmFibGUoKVxuXHRcdGVsc2UgRnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcblxuXHRcdGlmIEBzaG93QmFyc1xuXHRcdFx0aWYgQHNob3dIb21lQmFyIHRoZW4gQGhvbWVCYXJWaWV3ID0gbmV3IEhvbWVCYXJfQ2xhc3MgeyB2aWV3OiBAIH1cblx0XHRcdGlmIEBzaG93U3RhdHVzQmFyIHRoZW4gQHN0YXR1c0JhclZpZXcgPSBuZXcgU3RhdHVzQmFyX0NsYXNzIHsgdmlldzogQCB9XG5cblx0XHRAY2xpcCA9IHRydWVcblx0XHRAdXBkYXRlU2NhbGUoKVxuXHRcdEB1cGRhdGVQcmV2aWV3T25SZXNpemUoKVxuXHRcdFxuXHRcdGlmIEBzY2FsZVN0YXRlID09IFwiZmlsbFwiIHRoZW4gQHN0YXRlU3dpdGNoVG9GaWxsKClcblx0XHRlbHNlIEBzdGF0ZVN3aXRjaFRvTm9ybWFsKClcblxuXHRcblx0cHJldmlld01vYmlsZTogKCkgPT5cblx0XHRGcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXHRcdFxuXHRcdEBzY2FsZSA9IFNjcmVlbi53aWR0aCAvIEB3aWR0aFxuXHRcdEB4ID0gQWxpZ24uY2VudGVyXG5cdFx0QHkgPSBBbGlnbi5jZW50ZXJcblxuXHRcblxuXHR1cGRhdGVTY2FsZTogKCkgPT5cblxuXHRcdEB4ID0gQWxpZ24uY2VudGVyXG5cdFx0QHkgPSBBbGlnbi5jZW50ZXJcblxuXHRcdGlmIEBib3JkZXJWaWV3XG5cdFx0XHRAYm9yZGVyVmlldy54ID0gQWxpZ24uY2VudGVyXG5cdFx0XHRAYm9yZGVyVmlldy55ID0gQWxpZ24uY2VudGVyXG5cblx0XHRzY2FsZVggPSAoU2NyZWVuLndpZHRoIC0gMTEyKSAvIEB3aWR0aFxuXHRcdHNjYWxlWSA9IChTY3JlZW4uaGVpZ2h0IC0gMTEyKSAvIEBoZWlnaHRcblx0XHRAc3RhdGVzW1wiZmlsbFwiXS5zY2FsZSA9IE1hdGgubWluKHNjYWxlWCwgc2NhbGVZKVxuXG5cdFx0aWYgQGJvcmRlclZpZXdcblx0XHRcdEBib3JkZXJWaWV3LnN0YXRlc1tcImZpbGxcIl0uc2NhbGUgPSBAc3RhdGVzW1wiZmlsbFwiXS5zY2FsZVxuXG5cblxuXG5cblxuXG5cblx0dXBkYXRlUHJldmlld09uUmVzaXplOiAoKSA9PlxuXHRcdGxvY2FsUHJldmlldyA9IEBcblx0XHRcblx0XHRDYW52YXMub24gXCJjaGFuZ2U6aGVpZ2h0XCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlU2NhbGUoKVxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVByZXZpZXcoKVxuXHRcdFxuXHRcdENhbnZhcy5vbiBcImNoYW5nZTp3aWR0aFwiLCA9PlxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVNjYWxlKClcblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVQcmV2aWV3KClcblx0XHRcblxuXHRcdFNjcmVlbi5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZSgpXG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlUHJldmlldygpXG5cdFx0XG5cdFx0U2NyZWVuLm9uIFwiY2hhbmdlOndpZHRoXCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlU2NhbGUoKVxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVByZXZpZXcoKVxuXHRcblx0XG5cblxuIiwiIyBMb2dvXG5cbmNsYXNzIGV4cG9ydHMuTG9nb0xheWVyIGV4dGVuZHMgU1ZHTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0b3BhY2l0eTogMC41XG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cdFx0XHRzdmc6IGdldExvZ28oXCJGRkZcIilcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEBzdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcblx0XHRALm9uTW91c2VPdmVyIEBIb3ZlclxuXHRcdEAub25Nb3VzZU91dCBASG92ZXJPZmZcblx0XG5cdEBkZWZpbmUgJ2hhbmRsZXInLFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb24oRXZlbnRzLlRhcCwgdmFsdWUpXG5cdFxuXHRIb3ZlcjogPT5cblx0XHRAb3BhY2l0eSA9IDAuOFxuXHRIb3Zlck9mZjogPT5cblx0XHRAb3BhY2l0eSA9IDAuNVxuXG5cblxuZ2V0TG9nbyA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSBcIiNGRkZGRkZcIlxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjc2XCIgaGVpZ2h0PVwiMzJcIiB2aWV3Qm94PVwiMCAwIDc2IDMyXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBkPVwiTTIuNzkxOTkgMjEuNkMyLjc5MTk5IDIxLjE2OCAyLjkwMzk5IDIwLjQwOCAzLjEyNzk5IDE5LjMyTDQuMzk5OTkgMTIuODRIMi45ODM5OUwzLjA3OTk5IDEyLjEyQzQuOTk5OTkgMTEuNTQ0IDYuODg3OTkgMTAuNTUyIDguNzQzOTkgOS4xNDM5OEg5Ljg5NTk5TDkuMzE5OTkgMTEuNzZIMTEuMTkyTDEwLjk3NiAxMi44NEg5LjEyNzk5TDcuOTAzOTkgMTkuMzJDNy42OTU5OSAyMC4zMTIgNy41OTE5OSAyMC45NzYgNy41OTE5OSAyMS4zMTJDNy41OTE5OSAyMi4wOCA3LjkyNzk5IDIyLjU0NCA4LjU5OTk5IDIyLjcwNEM4LjQzOTk5IDIzLjI0OCA4LjA3MTk5IDIzLjY4IDcuNDk1OTkgMjRDNi45MTk5OSAyNC4zMiA2LjIyMzk5IDI0LjQ4IDUuNDA3OTkgMjQuNDhDNC41OTE5OSAyNC40OCAzLjk1MTk5IDI0LjIyNCAzLjQ4Nzk5IDIzLjcxMkMzLjAyMzk5IDIzLjIgMi43OTE5OSAyMi40OTYgMi43OTE5OSAyMS42WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0xNy41NTk5IDIyLjY4QzE3LjA2MzkgMjMuODggMTYuMDIzOSAyNC40OCAxNC40Mzk5IDI0LjQ4QzEzLjYyMzkgMjQuNDggMTIuOTU5OSAyNC4yIDEyLjQ0NzkgMjMuNjRDMTIuMDE1OSAyMy4xNDQgMTEuNzk5OSAyMi42NDggMTEuNzk5OSAyMi4xNTJDMTEuNzk5OSAyMC44NTYgMTIuMDk1OSAxOC45NDQgMTIuNjg3OSAxNi40MTZMMTMuNTc1OSAxMS43NkwxOC40NDc5IDExLjI4TDE2Ljk4MzkgMTguODY0QzE2LjcxMTkgMjAuMDQ4IDE2LjU3NTkgMjAuODQ4IDE2LjU3NTkgMjEuMjY0QzE2LjU3NTkgMjIuMTc2IDE2LjkwMzkgMjIuNjQ4IDE3LjU1OTkgMjIuNjhaTTE0LjAwNzkgOC40MjM5OEMxNC4wMDc5IDcuNzk5OTggMTQuMjYzOSA3LjMxOTk4IDE0Ljc3NTkgNi45ODM5OEMxNS4zMDM5IDYuNjQ3OTggMTUuOTQzOSA2LjQ3OTk4IDE2LjY5NTkgNi40Nzk5OEMxNy40NDc5IDYuNDc5OTggMTguMDQ3OSA2LjY0Nzk4IDE4LjQ5NTkgNi45ODM5OEMxOC45NTk5IDcuMzE5OTggMTkuMTkxOSA3Ljc5OTk4IDE5LjE5MTkgOC40MjM5OEMxOS4xOTE5IDkuMDQ3OTggMTguOTM1OSA5LjUxOTk4IDE4LjQyMzkgOS44Mzk5OEMxNy45Mjc5IDEwLjE2IDE3LjMwMzkgMTAuMzIgMTYuNTUxOSAxMC4zMkMxNS43OTk5IDEwLjMyIDE1LjE4MzkgMTAuMTYgMTQuNzAzOSA5LjgzOTk4QzE0LjIzOTkgOS41MTk5OCAxNC4wMDc5IDkuMDQ3OTggMTQuMDA3OSA4LjQyMzk4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0yNi4wNjA2IDIyLjY4QzI1LjU2NDYgMjMuODggMjQuNTI0NiAyNC40OCAyMi45NDA2IDI0LjQ4QzIyLjE0MDYgMjQuNDggMjEuNDg0NiAyNC4yIDIwLjk3MjYgMjMuNjRDMjAuNTU2NiAyMy4xNzYgMjAuMzQ4NiAyMi42OCAyMC4zNDg2IDIyLjE1MkMyMC4zNDg2IDIwLjk1MiAyMC42Mjg2IDE5LjA0IDIxLjE4ODYgMTYuNDE2TDIyLjk0MDYgNy4xOTk5OEwyNy44MTI2IDYuNzE5OThMMjUuNDg0NiAxOC44NjRDMjUuMjEyNiAyMC4wNDggMjUuMDc2NiAyMC44NDggMjUuMDc2NiAyMS4yNjRDMjUuMDc2NiAyMi4xNzYgMjUuNDA0NiAyMi42NDggMjYuMDYwNiAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMzQuNTYxOCAyMi42OEMzNC4wNjU4IDIzLjg4IDMzLjAyNTggMjQuNDggMzEuNDQxOCAyNC40OEMzMC42NDE4IDI0LjQ4IDI5Ljk4NTggMjQuMiAyOS40NzM4IDIzLjY0QzI5LjA1NzggMjMuMTc2IDI4Ljg0OTggMjIuNjggMjguODQ5OCAyMi4xNTJDMjguODQ5OCAyMC45NTIgMjkuMTI5OCAxOS4wNCAyOS42ODk4IDE2LjQxNkwzMS40NDE4IDcuMTk5OThMMzYuMzEzOCA2LjcxOTk4TDMzLjk4NTggMTguODY0QzMzLjcxMzggMjAuMDQ4IDMzLjU3NzggMjAuODQ4IDMzLjU3NzggMjEuMjY0QzMzLjU3NzggMjIuMTc2IDMzLjkwNTggMjIuNjQ4IDM0LjU2MTggMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTQzLjA2MzEgMjIuNjhDNDIuNTY3MSAyMy44OCA0MS41MjcxIDI0LjQ4IDM5Ljk0MzEgMjQuNDhDMzkuMTQzMSAyNC40OCAzOC40ODcxIDI0LjIgMzcuOTc1MSAyMy42NEMzNy41NTkxIDIzLjE3NiAzNy4zNTExIDIyLjY4IDM3LjM1MTEgMjIuMTUyQzM3LjM1MTEgMjAuOTUyIDM3LjYzMTEgMTkuMDQgMzguMTkxMSAxNi40MTZMMzkuOTQzMSA3LjE5OTk4TDQ0LjgxNTEgNi43MTk5OEw0Mi40ODcxIDE4Ljg2NEM0Mi4yMTUxIDIwLjA0OCA0Mi4wNzkxIDIwLjg0OCA0Mi4wNzkxIDIxLjI2NEM0Mi4wNzkxIDIyLjE3NiA0Mi40MDcxIDIyLjY0OCA0My4wNjMxIDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk01My41MzIzIDIyLjk5MkM1Mi43NjQzIDIzLjk4NCA1MS40MjgzIDI0LjQ4IDQ5LjUyNDMgMjQuNDhDNDguNTMyMyAyNC40OCA0Ny42NzYzIDI0LjE4NCA0Ni45NTYzIDIzLjU5MkM0Ni4yMzYzIDIyLjk4NCA0NS44NzYzIDIyLjI0OCA0NS44NzYzIDIxLjM4NEM0NS44NzYzIDIwLjkwNCA0NS45MDAzIDIwLjU0NCA0NS45NDgzIDIwLjMwNEw0Ny41NTYzIDExLjc2TDUyLjQyODMgMTEuMjhMNTAuNjc2MyAyMC41NDRDNTAuNjEyMyAyMC44OTYgNTAuNTgwMyAyMS4xNzYgNTAuNTgwMyAyMS4zODRDNTAuNTgwMyAyMi4zMTIgNTAuODYwMyAyMi43NzYgNTEuNDIwMyAyMi43NzZDNTIuMDQ0MyAyMi43NzYgNTIuNTgwMyAyMi4zNTIgNTMuMDI4MyAyMS41MDRDNTMuMTcyMyAyMS4yMzIgNTMuMjc2MyAyMC45MiA1My4zNDAzIDIwLjU2OEw1NS4wNDQzIDExLjc2TDU5Ljc3MjMgMTEuMjhMNTcuOTk2MyAyMC42NEM1Ny45NDgzIDIwLjg4IDU3LjkyNDMgMjEuMTI4IDU3LjkyNDMgMjEuMzg0QzU3LjkyNDMgMjEuNjQgNTcuOTk2MyAyMS45MTIgNTguMTQwMyAyMi4yQzU4LjI4NDMgMjIuNDcyIDU4LjU4ODMgMjIuNjQgNTkuMDUyMyAyMi43MDRDNTguOTU2MyAyMy4wODggNTguNzQwMyAyMy40MDggNTguNDA0MyAyMy42NjRDNTcuNzAwMyAyNC4yMDggNTYuOTY0MyAyNC40OCA1Ni4xOTYzIDI0LjQ4QzU1LjQ0NDMgMjQuNDggNTQuODQ0MyAyNC4zNDQgNTQuMzk2MyAyNC4wNzJDNTMuOTQ4MyAyMy44IDUzLjY2MDMgMjMuNDQgNTMuNTMyMyAyMi45OTJaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTY5LjI5NDcgMTcuMjU2QzY5Ljg3MDcgMTYuMjMyIDcwLjE1ODcgMTUuMiA3MC4xNTg3IDE0LjE2QzcwLjE1ODcgMTMuNDcyIDY5LjkxMDcgMTMuMTI4IDY5LjQxNDcgMTMuMTI4QzY5LjAzMDcgMTMuMTI4IDY4LjYzODcgMTMuNDU2IDY4LjIzODcgMTQuMTEyQzY3LjgyMjcgMTQuNzY4IDY3LjU1MDcgMTUuNTIgNjcuNDIyNyAxNi4zNjhMNjYuMTc0NyAyNEw2MS4yMDY3IDI0LjQ4TDYzLjY1NDcgMTEuNzZMNjcuNjE0NyAxMS4yOEw2Ny4xODI3IDEzLjcwNEM2Ny45NjY3IDEyLjA4OCA2OS4yMzg3IDExLjI4IDcwLjk5ODcgMTEuMjhDNzEuOTI2NyAxMS4yOCA3Mi42Mzg3IDExLjUyIDczLjEzNDcgMTJDNzMuNjQ2NyAxMi40OCA3My45MDI3IDEzLjIxNiA3My45MDI3IDE0LjIwOEM3My45MDI3IDE1LjE4NCA3My41NzQ3IDE1Ljk4NCA3Mi45MTg3IDE2LjYwOEM3Mi4yNzg3IDE3LjIzMiA3MS40MDY3IDE3LjU0NCA3MC4zMDI3IDE3LjU0NEM2OS44MjI3IDE3LjU0NCA2OS40ODY3IDE3LjQ0OCA2OS4yOTQ3IDE3LjI1NlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjwvc3ZnPlxuXCJcIlwiXG4iLCJcbntMb2dvTGF5ZXJ9ID0gcmVxdWlyZSBcIkxvZ29cIlxue1ByZXZpZXdfSW5pdH0gPSByZXF1aXJlIFwiUHJldmlld19Jbml0XCJcbntVSV9TZWN0aW9ufSA9IHJlcXVpcmUgXCJVSV9TZWN0aW9uXCJcbntVSV9Db25maWd9ID0gcmVxdWlyZSBcIlVJX0NvbmZpZ1wiXG5cblxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3X1VJIGV4dGVuZHMgUHJldmlld19Jbml0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAc2hvd0Rlc2t0b3BVSSgpXG5cdFxuXG5cblx0c2hvd0Rlc2t0b3BVSTogKCkgPT5cblx0XHRpZiBVdGlscy5pc01vYmlsZSgpIHRoZW4gcmV0dXJuXG5cblx0XHRpZiBAc2hvd0xvZ28gdGhlbiBAY3JlYXRlTG9nb0J1dHRvbigpXG5cdFx0aWYgQHNob3dVSSB0aGVuIEBhZGRDb25maWcoKVxuXG5cblxuXG5cblxuXHRjcmVhdGVMb2dvQnV0dG9uOiAoKSA9PlxuXHRcdFxuXHRcdG9wZW5Ib21lSGFuZGxlciA9ICgpIC0+XG5cdFx0XHR3aW5kb3cubG9jYXRpb24gPSBcImh0dHBzOi8vdGlsbGx1ci5jb21cIlxuXHRcdFxuXHRcdGxvZ29CdXR0b24gPSBuZXcgTG9nb0xheWVyXG5cdFx0XHR3aWR0aDogNzYsIGhlaWdodDogMzJcblx0XHRcdHg6IEFsaWduLmxlZnQoMzIpLCB5OiBBbGlnbi50b3AoMTIpXG5cdFx0XHRoYW5kbGVyOiBvcGVuSG9tZUhhbmRsZXJcblx0XG5cblx0YWRkU2VjdGlvbjogKHRpdGxlLCBhY3Rpb25BcnJheSA9IFtdKSA9PlxuXHRcdGlmIEBzZWN0aW9uVmlldyA9PSBudWxsIHRoZW4gQHNlY3Rpb25WaWV3ID0gbmV3IFVJX1NlY3Rpb25cblx0XHRAc2VjdGlvblZpZXcuYWRkU2VjdGlvbih0aXRsZSwgYWN0aW9uQXJyYXkpXG5cblxuXHQjIEZpbGwg4peJXG5cdCMgRmlsbCDil45cblxuXHRhZGRDb25maWc6ICgpID0+XG5cdFx0QGNvbmZpZ1ZpZXcgPSBuZXcgVUlfQ29uZmlnIHsgdmlldzogQCB9XG5cblx0XHRzY2FsZVR1cGxlID0gW1wiRml0XCIsIFwiMTAwJVwiXVxuXHRcdGhpbnRzVHVwbGUgPSBbXCJIaW50cyDil4lcIiwgXCJIaW50cyDil45cIl1cblxuXG5cdFx0dG9nZ2xlU2NhbGUgPSAoZW1wdHlEYXRhLCBsb2NhbEJ1dHRvbikgPT5cblx0XHRcdGlmIEBzdGF0ZUd1YXJkLnN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJub3JtYWxcIlxuXHRcdFx0XHRAYW5pbWF0ZVN0YXRlVG9GaWxsKClcblx0XHRcdFx0bG9jYWxCdXR0b24udGV4dCA9IHNjYWxlVHVwbGVbMF1cblx0XHRcdGVsc2Vcblx0XHRcdFx0QGFuaW1hdGVTdGF0ZVRvTm9ybWFsKClcblx0XHRcdFx0bG9jYWxCdXR0b24udGV4dCA9IHNjYWxlVHVwbGVbMV1cblx0XHRcdFx0XG5cdFx0XG5cdFx0dG9nZ2xlVGlwcyA9IChlbXB0eURhdGEsIGxvY2FsQnV0dG9uKSA9PlxuXHRcdFx0aWYgQHNob3dIaW50c1xuXHRcdFx0XHRAaGlkZUhpbnRzSGFuZGxlcigpXG5cdFx0XHRcdGxvY2FsQnV0dG9uLnRleHQgPSBoaW50c1R1cGxlWzFdXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBzaG93SGludHNIYW5kbGVyKClcblx0XHRcdFx0bG9jYWxCdXR0b24udGV4dCA9IGhpbnRzVHVwbGVbMF1cblx0XHRcblx0XHRpbml0U2NhbGVUaXRsZSA9IGlmIEBzaG93SGludHMgdGhlbiBoaW50c1R1cGxlWzBdIGVsc2UgaGludHNUdXBsZVsxXVxuXHRcdGluaXRTdGF0ZVRpdGxlID0gaWYgQHN0YXRlR3VhcmQuc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcIm5vcm1hbFwiIHRoZW4gc2NhbGVUdXBsZVsxXSBlbHNlIHNjYWxlVHVwbGVbMF1cblxuXHRcdCMgcHJpbnQgaW5pdFNjYWxlVGl0bGUgKyBcIiBcIiArIGluaXRTdGF0ZVRpdGxlXG5cblx0XHRAY29uZmlnVmlldy5hZGRTZWN0aW9uKFtcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IGluaXRTY2FsZVRpdGxlLFxuXHRcdFx0XHRoYW5kbGVyOiB0b2dnbGVUaXBzXG5cdFx0XHRcdH0sXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBpbml0U3RhdGVUaXRsZSxcblx0XHRcdFx0aGFuZGxlcjogdG9nZ2xlU2NhbGVcblx0XHRcdH0sXG5cdFx0XSlcblx0XG5cdFxuXHRoaWRlSGludHNIYW5kbGVyOiAoKSA9PlxuXHRcdEZyYW1lci5FeHRyYXMuSGludHMuZGlzYWJsZSgpXG5cdFx0QHNob3dIaW50cyA9ICFAc2hvd0hpbnRzXG5cblx0c2hvd0hpbnRzSGFuZGxlcjogKCkgPT5cblx0XHRGcmFtZXIuRXh0cmFzLkhpbnRzLmVuYWJsZSgpXG5cdFx0RnJhbWVyLkV4dHJhcy5IaW50cy5zaG93SGludHMoKVxuXHRcdEBzaG93SGludHMgPSAhQHNob3dIaW50c1xuIiwiXG57TG9nb0xheWVyfSA9IHJlcXVpcmUgXCJQcmV2aWV3X0xvZ29MYXllclwiXG57UGhvbmVUeXBlVmlld30gPSByZXF1aXJlIFwiUGhvbmVUeXBlVmlld1wiXG5cblxuY2xhc3MgZXhwb3J0cy5TY2FsZVZpZXcgZXh0ZW5kcyBQaG9uZVR5cGVWaWV3XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblxuXHRcblx0XG5cdFxuXHRjcmVhdGVMb2dvQnV0dG9uOiAoKSA9PlxuXHRcdFxuXHRcdG9wZW5Ib21lSGFuZGxlciA9ICgpIC0+XG5cdFx0XHR3aW5kb3cubG9jYXRpb24gPSBcImh0dHBzOi8vdGlsbGx1ci5jb21cIlxuXHRcdFxuXHRcdGxvZ29CdXR0b24gPSBuZXcgTG9nb0xheWVyXG5cdFx0XHR3aWR0aDogNzYsIGhlaWdodDogMzJcblx0XHRcdHg6IEFsaWduLmxlZnQoMzIpLCB5OiBBbGlnbi50b3AoMTIpXG5cdFx0XHRoYW5kbGVyOiBvcGVuSG9tZUhhbmRsZXJcblx0XG5cdFxuXHRcblx0Y3JlYXRlU2NhbGVCdXR0b246IChmb3JTdGF0ZSkgPT5cblx0XHRcblx0XHRidXR0b25TY2FsZSA9IG5ldyBMYXllclxuXHRcdFx0c2l6ZTogNDgsIGJvcmRlclJhZGl1czogNDhcblx0XHRcdHg6IEFsaWduLnJpZ2h0KC0zMiksIHk6IEFsaWduLmJvdHRvbSgtMzIpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4xKVwiXG5cdFx0XHRib3JkZXJXaWR0aDogMlxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRwcmV2aWV3OiBAXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUuc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUuc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4yKVwiIH1cblx0XHRcdFwiZmlsbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuNilcIiB9XG5cdFx0YnV0dG9uU2NhbGUuc3RhdGVTd2l0Y2goZm9yU3RhdGUpXG5cdFx0XG5cdFx0YnV0dG9uSW5zaWRlTGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYnV0dG9uU2NhbGVcblx0XHRcdGJvcmRlcldpZHRoOiAyXG5cdFx0XHRzaXplOiAyOCwgYm9yZGVyUmFkaXVzOiAyMlxuXHRcdFx0eDogMTAsIHk6IDEwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdFxuXHRcdFxuXHRcdGJ1dHRvbkluc2lkZUxheWVyLnN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuNilcIiB9XG5cdFx0XHRcImZpbGxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjIpXCIgfVxuXHRcdGJ1dHRvbkluc2lkZUxheWVyLnN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlLm9uVGFwIC0+XG5cdFx0XHRpZiBAc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcImZpbGxcIiB0aGVuIG5leHRTdGF0ZSA9IFwibm9ybWFsXCIgZWxzZSBuZXh0U3RhdGUgPSBcImZpbGxcIlxuXHRcdFx0QHN0YXRlU3dpdGNoKG5leHRTdGF0ZSlcblx0XHRcdEBjaGlsZHJlblswXS5zdGF0ZVN3aXRjaChuZXh0U3RhdGUpXG5cdFx0XHRAY3VzdG9tLnByZXZpZXcuYW5pbWF0ZShuZXh0U3RhdGUsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XHRcblx0XHR1cGRhdGVCdXR0b25PblJlc2l6ZSA9IChidXR0b25MYXllcikgPT5cblx0XHRcdGxvY2FsQnV0dG9uID0gYnV0dG9uTGF5ZXJcblx0XHRcdFxuXHRcdFx0Q2FudmFzLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0XHRidXR0b25MYXllci54ID0gQWxpZ24ucmlnaHQoLTMyKVxuXHRcdFx0XG5cdFx0XHRDYW52YXMub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdFx0YnV0dG9uTGF5ZXIueSA9IEFsaWduLmJvdHRvbSgtMzIpXG5cdFx0XG5cdFx0dXBkYXRlQnV0dG9uT25SZXNpemUoYnV0dG9uU2NhbGUpXG5cblxuXG4iLCJcblxue0xvY2F0aW9uVmlld30gPSByZXF1aXJlIFwiTG9jYXRpb25WaWV3XCJcblxuXG5jbGFzcyBleHBvcnRzLlNlY3Rpb25WaWV3IGV4dGVuZHMgTG9jYXRpb25WaWV3XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRjb250cm9sUGFuZWxMYXllciA9IG5ldyBMYXllclxuXHRcdFx0d2lkdGg6IDM2MCwgaGVpZ2h0OiAxMDAwXG5cdFx0XHR4OiAyMCwgeTogNjBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGNvbnRyb2xQYW5lbDogY29udHJvbFBhbmVsTGF5ZXJcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0Y29udHJvbFBhbmVsTGF5ZXIucGFyZW50ID0gQHBhcmVudFxuXG5cdFxuXHRAZGVmaW5lICdjb250cm9sUGFuZWwnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuY29udHJvbFBhbmVsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmNvbnRyb2xQYW5lbCA9IHZhbHVlXG5cdFxuXHRhZGRTZWN0aW9uOiAodGl0bGUsIGFjdGlvbkFycmF5ID0gW10pID0+XG5cdFx0aWYgVXRpbHMuaXNNb2JpbGUoKSB0aGVuIHJldHVyblxuXHRcdGVsc2Vcblx0XHRcdHNlY3Rpb25WaWV3ID0gbmV3IExheWVyXG5cdFx0XHRcdHdpZHRoOiAzNjBcblx0XHRcdFx0aGVpZ2h0OiAxMDBcblx0XHRcdFx0cGFyZW50OiBAY29udHJvbFBhbmVsXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0XG5cdFx0XHRzZWN0aW9uVmlldy55ID0gKEBjb250cm9sUGFuZWwuY2hpbGRyZW4ubGVuZ3RoIC0gMSkgKiAxMDBcblxuXHRcdFx0QGFkZFNlY3Rpb25UaXRsZSh0aXRsZSkucGFyZW50ID0gc2VjdGlvblZpZXdcblxuXHRcdFx0c3VtWCA9IDBcblx0XHRcdGZvciBhY3Rpb25JdGVtLCBpbmRleCBpbiBhY3Rpb25BcnJheVxuXHRcdFx0XHRzZWN0aW9uQnV0dG9uID0gQGFkZFNlY3Rpb25CdXR0b24oYWN0aW9uSXRlbSlcblx0XHRcdFx0c2VjdGlvbkJ1dHRvbi5wYXJlbnQgPSBzZWN0aW9uVmlld1xuXHRcdFx0XHRzZWN0aW9uQnV0dG9uLnggPSBzdW1YXG5cdFx0XHRcdHN1bVggKz0gc2VjdGlvbkJ1dHRvbi53aWR0aCArIDhcblx0XHRcdFx0XG5cblxuXG5cblx0YWRkU2VjdGlvbkJ1dHRvbjogKGFjdGlvbkl0ZW0sIHBWID0gNiwgcEggPSA5KSA9PlxuXHRcdGJ1dHRvbkxheWVyID0gbmV3IFRleHRMYXllclxuXHRcdFx0dGV4dDogYWN0aW9uSXRlbS50aXRsZVxuXHRcdFx0eTogNDJcblx0XHRcdHBhZGRpbmc6IHsgdG9wOiBwViwgYm90dG9tOiBwViArIDIsIGxlZnQ6IHBILCByaWdodDogcEggfVxuXHRcdFx0Zm9udFNpemU6IDE4XG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuNSlcIlxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA4XG5cdFx0XG5cdFx0YnV0dG9uTGF5ZXIub24oRXZlbnRzLlRhcCwgYWN0aW9uSXRlbS5oYW5kbGVyKVxuXHRcdHJldHVybiBidXR0b25MYXllclxuXG5cblx0YWRkU2VjdGlvblRpdGxlOiAodGl0bGUgPSBcIkhlYWRlciBUaXRsZVwiKSA9PlxuXHRcdHJldHVybiBuZXcgVGV4dExheWVyXG5cdFx0XHR0ZXh0OiB0aXRsZVxuXHRcdFx0Zm9udFNpemU6IDE1XG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdG9wYWNpdHk6IDAuNlxuXHRcdFx0cGFkZGluZzpcblx0XHRcdFx0dG9wOiAxMlxuXG5cblxuXG4jICMgRXhhbXBsZVxuIyBwcmV2aWV3LmFkZFNlY3Rpb24oXCJDaG9vc2UgQmFja2dyb3VuZFwiLCBbXG4jIFx0eyB0aXRsZTogdGVzdDEsIGhhbmRsZXI6IHRlc3QyIH0sXG4jIFx0eyB0aXRsZTogdGVzdDEsIGhhbmRsZXI6IHRlc3QyIH1cbiMgXSkiLCJcblxuY2xhc3MgZXhwb3J0cy5TdGF0dXNCYXJfQ2xhc3MgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHBhcmVudDogQHZpZXdcblx0XHRcdHdpZHRoOiBAdmlldy53aWR0aFxuXG5cdFx0XHR5OiBBbGlnbi50b3AsIG5hbWU6IFwiLnN0YXR1cyBiYXJcIiwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRcdHRoZW1lOiBAdmlldy5zdGF0dXNCYXJfdGhlbWVcblx0XHRcdGZvcmNlQW5kcm9pZDogQHZpZXcuZm9yY2VBbmRyb2lkQmFyXG5cdFx0XHRwcm90b3R5cGVDcmVhdGlvblllYXI6IEB2aWV3LnRpbWVWYWx1ZVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAY3JlYXRlKClcblxuXG5cblxuXG5cdEBkZWZpbmUgJ3ZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy52aWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3RoZW1lJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRoZW1lXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnRoZW1lID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2ZvcmNlQW5kcm9pZCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuZm9yY2VBbmRyb2lkID0gdmFsdWVcblxuXHRAZGVmaW5lICdwcm90b3R5cGVDcmVhdGlvblllYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnByb3RvdHlwZUNyZWF0aW9uWWVhciA9IHZhbHVlXG5cblxuXG5cblx0dmlld1NpemU6ICh3LCBoKSA9PiByZXR1cm4gQHZpZXcud2lkdGggPT0gdyBhbmQgQHZpZXcuaGVpZ2h0ID09IGhcblxuXHRjcmVhdGU6ICgpID0+XG5cdFx0XG5cdFx0aWYgQGZvcmNlQW5kcm9pZCB0aGVuIEBjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0JhcigpIFxuXG5cdFx0ZWxzZSBpZiBAdmlld1NpemUoMzc1LCA4MTIpIG9yIEB2aWV3U2l6ZSgzOTAsIDg0NCkgb3IgQHZpZXdTaXplKDQxNCwgODk2KSBvciBAdmlld1NpemUoNDI4LCA5MjYpIG9yIEB2aWV3U2l6ZSgzNjAsIDc4Milcblx0XHRcdEBjcmVhdGVOb3RjaFN0YXR1c0JhcigpXG5cdFx0XG5cdFx0ZWxzZSBpZiBAdmlld1NpemUoMzkzLCA4NTIpXG5cdFx0XHRAY3JlYXRlTm90Y2hTdGF0dXNCYXIoKVxuXHRcdFxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM3NSwgNjY3KSBvciBAdmlld1NpemUoNDE0LCA3MzYpIG9yIEB2aWV3U2l6ZSgzMjAsIDU2OClcblx0XHRcdEBjcmVhdGVDbGFzc2ljU3RhdHVzQmFyKClcblx0XHRcblx0XHRcblx0XHRlbHNlIEBjcmVhdGVBbmRyb2lkU3RhdHVzQmFyKClcblx0XG5cdFxuXHRcblx0XG5cblxuXG5cdGNyZWF0ZUFuZHJvaWRTdGF0dXNCYXI6ICgpID0+XG5cdFx0QGhlaWdodCA9IDMyXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDUyLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5sZWZ0KDQpLCB5OiBBbGlnbi50b3AoMiArIDUpXG5cdFx0XHRjb2xvcjogZGV2aWNlX2Fzc2V0cy5jb2xvcltAdGhlbWVdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxNCwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiAxMDAsIGhlaWdodDogMjAsIHg6IEFsaWduLnJpZ2h0KC00KSwgeTogQWxpZ24udG9wKDUpXG5cdFx0XHRpbWFnZTogZGV2aWNlX2Fzc2V0cy5hbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZVtAdGhlbWVdXG5cdFxuXHRcblx0Y3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXI6ICgpID0+XG5cdFx0QGhlaWdodCA9IDIwXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDUyLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5sZWZ0LCB5OiBBbGlnbi50b3AoMilcblx0XHRcdGNvbG9yOiBkZXZpY2VfYXNzZXRzLmNvbG9yW0B0aGVtZV0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDE0LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDEwMCwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ucmlnaHQsIHk6IEFsaWduLnRvcCgpXG5cdFx0XHRpbWFnZTogZGV2aWNlX2Fzc2V0cy5hbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZVtAdGhlbWVdXG5cdFxuXHRcblxuXG5cblx0Y3JlYXRlQ2xhc3NpY1N0YXR1c0JhcjogKCkgPT5cblx0XHRAaGVpZ2h0ID0gMjBcblx0XHRcblx0XHRjbGFzc2ljTGVmdENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogMTAwLCBoZWlnaHQ6IEBoZWlnaHQsIHg6IEFsaWduLmxlZnRcblx0XHRcdGltYWdlOiBkZXZpY2VfYXNzZXRzLm9sZFN0YXR1c0JhckxlZnRJbWFnZVtAdGhlbWVdXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDU0LCBoZWlnaHQ6IDE2LCB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0Y29sb3I6IGRldmljZV9hc3NldHMuY29sb3JbQHRoZW1lXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogMTAwLCBoZWlnaHQ6IEBoZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogZGV2aWNlX2Fzc2V0cy5vbGRTdGF0dXNCYXJSaWdodEltYWdlW0B0aGVtZV1cblx0XHRcblx0XG5cdGNyZWF0ZU5vdGNoU3RhdHVzQmFyOiAoKSA9PlxuXHRcdEBoZWlnaHQgPSA0NFxuXHRcdFxuXHRcdG5vdGNoTGVmdENvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDU0LCBoZWlnaHQ6IDIxLCB4OiBBbGlnbi5sZWZ0KDIxKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0Y29sb3I6IGRldmljZV9hc3NldHMuY29sb3JbQHRoZW1lXSwgYmFja2dyb3VuZENvbG9yOiBudWxsLCBsZXR0ZXJTcGFjaW5nOiAtMC4xN1xuXHRcdFx0Zm9udFNpemU6IDE1LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0bm90Y2hDZW50ZXJDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDM3NSwgaGVpZ2h0OiBAaGVpZ2h0LCB4OiBBbGlnbi5jZW50ZXJcblx0XHRcdGltYWdlOiBkZXZpY2VfYXNzZXRzLm5vdGNoXG5cdFx0XG5cdFx0bm90Y2hSaWdodENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogMTAwLCBoZWlnaHQ6IEBoZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogZGV2aWNlX2Fzc2V0cy5zdGF0dXNCYXJSaWdodEltYWdlW0B0aGVtZV1cblxuXG5cblxuZGV2aWNlX2Fzc2V0cyA9XG5cdGNvbG9yOlxuXHRcdGRhcms6IFwiIzAwMFwiXG5cdFx0bGlnaHQ6IFwiI0ZGRlwiXG5cdFxuXHRzdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRvbGRTdGF0dXNCYXJMZWZ0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfbGVmdF9saWdodC5wbmdcIlxuXHRvbGRTdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRhbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9hbmRyb2lkU3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvYW5kcm9pZFN0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRcblxuXG5cdG5vdGNoOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfbm90Y2gucG5nXCJcblx0dGlwOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy90aXAucG5nXCIiLCJcblxue1NlY3Rpb25WaWV3fSA9IHJlcXVpcmUgXCJTZWN0aW9uVmlld1wiXG5cblxuY2xhc3MgZXhwb3J0cy5UcmVlTGF5ZXJWaWV3IGV4dGVuZHMgU2VjdGlvblZpZXdcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdHRyZWVWaWV3TGF5ZXIgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0XHR3aWR0aDogMzIwXG5cdFx0XHRoZWlnaHQ6IDBcblx0XHRcdHNjcm9sbFZlcnRpY2FsOiB0cnVlXG5cdFx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0bW91c2VXaGVlbEVuYWJsZWQ6IHRydWVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjMjIyXCJcblx0XHRcblx0XHR0cmVlVmlld0xheWVyLmNvbnRlbnQuaGVpZ2h0ID0gMFxuXHRcdHRyZWVWaWV3TGF5ZXIubW91c2VXaGVlbEVuYWJsZWQgPSB0cnVlXG5cdFx0XHRcblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR0cmVlVmlldzogdHJlZVZpZXdMYXllclxuXHRcdFx0aW5kZW50OiAxXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdHRyZWVWaWV3TGF5ZXIucGFyZW50ID0gQHBhcmVudFxuXG5cdFxuXHRAZGVmaW5lICd0cmVlVmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50cmVlVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50cmVlVmlldyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdpbmRlbnQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaW5kZW50XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmluZGVudCA9IHZhbHVlXG5cdFxuXG5cblx0cHJpbnRUcmVlOiAoKSA9PlxuXHRcdHByaW50IEB2aWV3LmNoaWxkcmVuXG5cdFx0QHByaW50Tm9kZShAdmlldylcblx0XHRAdHJlZVZpZXcuaGVpZ2h0ID0gU2NyZWVuLmhlaWdodFxuXHRcdEB0cmVlVmlldy51cGRhdGVDb250ZW50KClcblx0XG5cblx0cHJpbnROb2RlOiAobm9kZSwgbGV2ZWwgPSAwKSA9PlxuXHRcdGlmIG5vZGUubmFtZSA9PSBcIlwiIHRoZW4gbGF5ZXJOYW1lID0gXCJVbnRpdGxlZFwiIGVsc2UgbGF5ZXJOYW1lID0gbm9kZS5uYW1lXG5cdFx0IyBwcmludCBBcnJheShsZXZlbCArIDEpLmpvaW4oXCIg44O7IFwiKSArIFwiICN7bGF5ZXJOYW1lfVwiXG5cblx0XHR0cmVlTm9kZUxheWVyID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBAdHJlZVZpZXcuY29udGVudFxuXHRcdFx0dGV4dDogQXJyYXkobGV2ZWwgKyAxKS5qb2luKFwiIOODuyBcIikgKyBcIiAje2xheWVyTmFtZX1cIlxuXHRcdFx0XG5cdFx0XHRmb250U2l6ZTogMTVcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXG5cdFx0XHRvcGFjaXR5OiBpZiBsYXllck5hbWUgPT0gXCJVbnRpdGxlZFwiIHRoZW4gMC41IGVsc2UgMVxuXHRcdFx0aGVpZ2h0OiAyOFxuXHRcdFx0eTogQHRyZWVWaWV3LmhlaWdodFxuXHRcdFx0IyBiYWNrZ3JvdW5kQ29sb3I6IFV0aWxzLnJhbmRvbUNvbG9yKClcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRsYXllcjogbm9kZVxuXHRcdFxuXHRcdHRyZWVOb2RlTGF5ZXIub25UYXAgLT5cblx0XHRcdHByaW50IFwiI3tAY3VzdG9tLmxheWVyLm5hbWV9IHg6ICN7QGN1c3RvbS5sYXllci54fSB5OiAje0BjdXN0b20ubGF5ZXIueX0gc2l6ZTogI3tAY3VzdG9tLmxheWVyLndpZHRofXgje0BjdXN0b20ubGF5ZXIuaGVpZ2h0fVwiXG5cblx0XHRcblx0XHRAdHJlZVZpZXcuaGVpZ2h0ICs9IDI4XG5cblxuXHRcdGlmIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMFxuXHRcdFx0bmV4dExldmVsID0gbGV2ZWwgKyAxXG5cdFx0XHRmb3IgY2hpbGROb2RlIGluIG5vZGUuY2hpbGRyZW5cblx0XHRcdFx0QHByaW50Tm9kZShjaGlsZE5vZGUsIG5leHRMZXZlbClcblx0XHRcbiIsIlxuY2xhc3MgVGV4dCBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHQjIGZvbnRGYW1pbHk6IGZvbnRBdmVyaWFcblx0XHRcdGZvbnRTaXplOiAxOFxuXHRcdFx0d2VpZ2h0OiA3MDBcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdGhlaWdodDogMjBcblx0XHRcdGxldHRlclNwYWNpbmc6IDAuN1xuXHRcdFx0bGV0dGVyU3BhY2luZzogMC40XG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBzdHlsZSA9XG5cdFx0XHRcImZvbnQtZmFtaWx5XCI6IFwiJ1NGIFBybyBUZXh0JywgJ1BUIFNhbnMnLCAnSGVsdmV0aWNhJywgJ1RhaG9tYScsIHNhbnMtc2VyaWY7XCJcblx0XHRcdFwiZm9udC13ZWlnaHRcIjogNzAwXG5cdFx0XHRcIi13ZWJraXQtZm9udC1mZWF0dXJlLXNldHRpbmdzXCI6IFwiJ3NzMDInIG9uLCAnc3MwNicgb24sICdzczA5JyBvbiwgJ3NzMTEnIG9uO1wiXG5cdFx0XHRcIi1tb3otZm9udC1mZWF0dXJlLXNldHRpbmdzXCI6IFwiJ3NzMDInIG9uLCAnc3MwNicgb24sICdzczA5JyBvbiwgJ3NzMTEnIG9uO1wiXG5cdFx0XHRcIi1tcy1mb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcdFwiZm9udC1mZWF0dXJlLXNldHRpbmdzXCI6IFwiJ3NzMDInIG9uLCAnc3MwNicgb24sICdzczA5JyBvbiwgJ3NzMTEnIG9uO1wiXG5cdFx0XG5cblxuXG5jbGFzcyBUZXh0QnV0dG9uIGV4dGVuZHMgVGV4dFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR0dXBsZTogeyBub3JtYWw6IDAuNSwgaG92ZXI6IDAuOCB9XG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEBzdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcblx0XHRALm9uTW91c2VPdmVyIEBIb3ZlclxuXHRcdEAub25Nb3VzZU91dCBASG92ZXJPZmZcblxuXHRcdEB1cGRhdGVUdXBsZShAdHVwbGUpXG5cdFxuXHRcblx0XHRcblx0SG92ZXI6ID0+XG5cdFx0QG9wYWNpdHkgPSBAdHVwbGUuaG92ZXJcblx0SG92ZXJPZmY6ID0+XG5cdFx0QG9wYWNpdHkgPSBAdHVwbGUubm9ybWFsXG5cdFxuXHR1cGRhdGVUdXBsZTogKG5ld1R1cGxlKSA9PlxuXHRcdEB0dXBsZSA9IG5ld1R1cGxlXG5cdFx0QGVtaXQgRXZlbnRzLk1vdXNlT3ZlclxuXHRcdEBlbWl0IEV2ZW50cy5Nb3VzZU91dFxuXHRcblx0XG5cdEBkZWZpbmUgJ2hhbmRsZXInLFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb24oRXZlbnRzLlRhcCwgdmFsdWUpXG5cdFxuXHRAZGVmaW5lICd0dXBsZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50dXBsZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMudHVwbGUgPSB2YWx1ZVxuXG5cblxuY2xhc3MgQnV0dG9uIGV4dGVuZHMgVGV4dFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cdFx0XHRoZWlnaHQ6IDMyLCBib3JkZXJSYWRpdXM6IDhcblx0XHRcdHBhZGRpbmc6IHsgdG9wOiA2LCBib3R0b206IDcsIGxlZnQ6IDksIHJpZ2h0OiA5IH1cblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuNylcIlxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QHNob3dIaW50ID0gLT4gO1xuXHRcdEBzdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcblx0XHRALm9uTW91c2VPdmVyIEBIb3ZlclxuXHRcdEAub25Nb3VzZU91dCBASG92ZXJPZmZcblx0XHRcblx0SG92ZXI6ID0+XG5cdFx0QGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjQpXCJcblx0SG92ZXJPZmY6ID0+XG5cdFx0QGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjcpXCJcblx0XG5cdEBkZWZpbmUgJ2hhbmRsZXInLFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb24oRXZlbnRzLlRhcCwgdmFsdWUpXG5cblxuY2xhc3MgQnV0dG9uVGFiIGV4dGVuZHMgQnV0dG9uXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHNlbGVjdGVkOiB0cnVlXG5cdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0SG92ZXI6ID0+XG5cdFx0QGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjQpXCJcblx0SG92ZXJPZmY6ID0+XG5cdFx0aWYgQHNlbGVjdGVkIHRoZW4gQGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjcpXCJcblx0XHRlbHNlIEBiYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsMC4yKVwiXG5cblx0QGRlZmluZSAnc2VsZWN0ZWQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2VsZWN0ZWRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnNlbGVjdGVkID0gdmFsdWVcblx0XHRcdGlmIHZhbHVlIHRoZW4gQGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjcpXCJcblx0XHRcdGVsc2UgQGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjIpXCJcblxuXG4jIEJ1dHRvbjogU1ZHXG5cbiMgY2xhc3MgU1ZHQnV0dG9uIGV4dGVuZHMgVGV4dEJ1dHRvblxuIyBcdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG4jIFx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuIyBcdFx0XHR0ZXh0OiBcIlwiXG4jIFx0XHRcdGFzc2V0OiBudWxsXG4jIFx0XHRcdGNsaXA6IGZhbHNlXG4jIFx0XHRcdGF1dG9TaXplOiBmYWxzZVxuXHRcdFxuIyBcdFx0QHN2Z1NoYXBlID0gbmV3IFNWR0xheWVyXG4jIFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJudWxsXCIsIG5hbWU6IFwic3ZnU2hhcGVcIlxuXHRcdFxuIyBcdFx0c3VwZXIgQG9wdGlvbnNcbiMgXHRcdEBzdmdTaGFwZS5wYXJlbnQgPSBAXG4jIFx0XHRAdXBkYXRlU1ZHU2l6ZSgpXG5cdFxuXHRcbiMgXHRAZGVmaW5lICdhc3NldCcsXG4jIFx0XHRnZXQ6IC0+IEBvcHRpb25zLmFzc2V0XG4jIFx0XHRzZXQ6ICh2YWx1ZSkgLT5cbiMgXHRcdFx0QG9wdGlvbnMuYXNzZXQgPSB2YWx1ZVxuIyBcdFx0XHRAc3ZnU2hhcGUuc3RhdGVzID1cbiMgXHRcdFx0XHRcIm9uRGFya1wiOiB7IHN2ZzogdmFsdWUub25EYXJrIH1cbiMgXHRcdFx0XHRcIm9uTGlnaHRcIjogeyBzdmc6IHZhbHVlLm9uTGlnaHQgfVxuIyBcdFx0XHRAc3ZnU2hhcGUuc3RhdGVTd2l0Y2goXCJvbkRhcmtcIilcblx0XG4jIFx0dXBkYXRlU1ZHU2l6ZTogKCkgPT5cbiMgXHRcdEBzdmdTaGFwZS53aWR0aCA9IEB3aWR0aFxuIyBcdFx0QHN2Z1NoYXBlLmhlaWdodCA9IEBoZWlnaHRcblx0XG5cblxuXG5cbiMgQnV0dG9uOiBDb3B5XG5cbiMgY2xhc3MgQ29weUJ1dHRvbiBleHRlbmRzIFRleHRCdXR0b25cbiMgXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuIyBcdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcbiMgXHRcdFx0bGluazogXCJodHRwczovL3RpbGxsdXIuY29tXCJcbiMgXHRcdFx0aGFuZGxlcjogQGNvcHlIYW5kbGVyXG5cdFx0XG4jIFx0XHRAYXJlYSA9IG5ldyBMYXllclxuIyBcdFx0XHRvcGFjaXR5OiAwLCB4OiAtMzAwMCwgaHRtbDogbnVsbFxuXHRcdFxuIyBcdFx0c3VwZXIgQG9wdGlvbnNcbiMgXHRcdEBhcmVhLnBhcmVudCA9IEBcblx0XG5cdFxuIyBcdEBkZWZpbmUgJ2xpbmsnLFxuIyBcdFx0Z2V0OiAtPiBAb3B0aW9ucy5saW5rXG4jIFx0XHRzZXQ6ICh2YWx1ZSkgLT5cbiMgXHRcdFx0QG9wdGlvbnMubGluayA9IHZhbHVlXG4jIFx0XHRcdEB1cGRhdGUodmFsdWUpXG5cdFxuXHRcbiMgXHR1cGRhdGU6IChsaW5rKSA9PlxuIyBcdFx0QGFyZWEuaHRtbCA9IFwiPHRleHRhcmVhIGNsYXNzPSdqcy1jb3B5dGV4dGFyZWEtY2xhc3MnIHN0eWxlPSdvcGFjaXR5OjA7Jz4je2xpbmt9PC90ZXh0YXJlYT5cIlxuXHRcblx0XG4jIFx0Y29weUhhbmRsZXI6ID0+XG4jIFx0XHR0ZXh0RGl2ID0gQGFyZWEucXVlcnlTZWxlY3RvcignLmpzLWNvcHl0ZXh0YXJlYS1jbGFzcycpXG4jIFx0XHR0ZXh0RGl2LmZvY3VzKClcbiMgXHRcdHRleHREaXYuc2VsZWN0KClcbiMgXHRcdGRvY3VtZW50LmV4ZWNDb21tYW5kICdjb3B5J1xuXHRcdFxuIyBcdFx0b3JpZ2luVGl0bGUgPSBAdGV4dFxuIyBcdFx0QHRleHQgPSBcIkRvbmUg8J+RjFwiXG4jIFx0XHRVdGlscy5kZWxheSAxLCA9PiBAdGV4dCA9IG9yaWdpblRpdGxlXG5cblxuXG5cbiMgIyAjIEJ1dHRvbjogQ29weVxuXG4jICMgY2xhc3MgTGlua0J1dHRvbiBleHRlbmRzIFNWR0J1dHRvblxuIyAjIFx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcbiMgIyBcdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcbiMgIyBcdFx0XHRsaW5rOiBcImh0dHBzOi8vdGlsbGx1ci5jb21cIlxuIyAjIFx0XHRcdGJvcmRlcldpZHRoOiAxICogMlxuIyAjIFx0XHRcdGJvcmRlclJhZGl1czogMjAgKiAyXG4jICMgXHRcdFx0dHVwbGU6IHsgbm9ybWFsOiAxLjAsIGhvdmVyOiAwLjggfVxuXHRcdFx0XG5cdFx0XG4jICMgXHRcdEB0aW50QnV0dG9uRml4ID0gbmV3IExheWVyXG4jICMgXHRcdFx0aGVpZ2h0OiAxMjAgKiAyXG4jICMgXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG4jICMgXHRcdEBidXR0b25UZXh0ID0gbmV3IFRleHRcbiMgIyBcdFx0XHRmb250U2l6ZTogMzIgKiAyXG4jICMgXHRcdFx0dGV4dEFsaWduOiBcInJpZ2h0XCJcbiMgIyBcdFx0XHRoZWlnaHQ6IDYwICogMlxuXHRcdFxuIyAjIFx0XHRAYnV0dG9uSWNvbiA9IG5ldyBTVkdMYXllclxuIyAjIFx0XHRcdHdpZHRoOiAyNCAqIDIsIGhlaWdodDogMjQgKiAyXG4jICMgXHRcdFx0c3ZnOiBTVkcub3Blbkljb24ub25MaWdodFxuIyAjIFx0XHRcdG9wYWNpdHk6IDAuNlxuXHRcdFx0XG5cblx0XHRcbiMgIyBcdFx0c3VwZXIgQG9wdGlvbnNcblxuIyAjIFx0XHRAYnV0dG9uVGV4dC50ZXh0ID0gQHRleHRcbiMgIyBcdFx0QHRleHQgPSBcIlwiXG5cbiMgIyBcdFx0QHRpbnRCdXR0b25GaXgucGFyZW50ID0gQHBhcmVudFxuIyAjIFx0XHRAdGludEJ1dHRvbkZpeC54ID0gQWxpZ24ucmlnaHRcbiMgIyBcdFx0QHRpbnRCdXR0b25GaXgueSA9IEFsaWduLnRvcFxuXHRcdFxuIyAjIFx0XHRAcGFyZW50ID0gQHRpbnRCdXR0b25GaXhcbiMgIyBcdFx0QHkgPSBBbGlnbi50b3AoMzAgKiAyKVxuIyAjIFx0XHRAaGVpZ2h0ID0gNjAgKiAyXG5cbiMgIyBcdFx0QGJ1dHRvblRleHQucGFyZW50ID0gQFxuIyAjIFx0XHRAYnV0dG9uVGV4dC54ID0gMTYgKiAyXG4jICMgXHRcdEBidXR0b25UZXh0LnkgPSA5ICogMlxuXG4jICMgXHRcdEBidXR0b25JY29uLnBhcmVudCA9IEBcbiMgIyBcdFx0QGJ1dHRvbkljb24ueCA9IDE2ICogMiArIEBidXR0b25UZXh0LndpZHRoICsgMTYgKiAyXG4jICMgXHRcdEBidXR0b25JY29uLnkgPSBBbGlnbi5jZW50ZXIoMyAqIDIpXG5cbiMgIyBcdFx0QHdpZHRoID0gMTYgKiAyICsgQGJ1dHRvblRleHQud2lkdGggKyBAYnV0dG9uSWNvbi53aWR0aCArIDE2ICogMiArIDE2ICogMlxuIyAjIFx0XHRAdGludEJ1dHRvbkZpeC53aWR0aCA9IEB3aWR0aCArIDMwICogMiArIDE2ICogMlxuXG4jICMgXHRcdEB0aW50QnV0dG9uRml4LnggPSBBbGlnbi5yaWdodFxuIyAjIFx0XHRAeCA9IEFsaWduLnJpZ2h0KC0zMCAqIDIpXG5cdFx0XG5cdFxuXG4jICMgXHRAZGVmaW5lICdsaW5rJyxcbiMgIyBcdFx0Z2V0OiAtPiBAb3B0aW9ucy5saW5rXG4jICMgXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5saW5rID0gdmFsdWVcblx0XG4jICMgXHRzZXRDb2xvcjogKGNvbG9yID0gbnVsbCkgPT5cbiMgIyBcdFx0aWYgY29sb3IgPT0gbnVsbCB0aGVuIHJldHVyblxuIyAjIFx0XHRAdGludEJ1dHRvbkZpeC5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvclxuXHRcblxuXG5cblxuXG5cblxuXG4jIGNsYXNzIFByZXZpZXdCdXR0b24gZXh0ZW5kcyBUZXh0XG4jIFx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuIyBcdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcbiMgXHRcdFx0dHVwbGU6IHsgbm9ybWFsOiAxLjAsIGhvdmVyOiAwLjggfVxuXHRcdFxuIyBcdFx0c3VwZXIgQG9wdGlvbnNcblxuIyBcdFx0QHJlbW92ZUFsbExpc3RlbmVycygpXG5cbiMgXHRcdEAub25Nb3VzZU92ZXIgQEhvdmVyXG4jIFx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cbiMgXHRIb3ZlcjogPT5cbiMgXHRcdCMgQHNjYWxlID0gMS4wNVxuIyBcdFx0QG9wYWNpdHkgPSAxLjBcblx0XG4jIFx0SG92ZXJPZmY6ID0+XG4jIFx0XHQjIEBzY2FsZSA9IDEuMFxuIyBcdFx0QG9wYWNpdHkgPSAwLjhcblxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSB7VGV4dCwgVGV4dEJ1dHRvbiwgQnV0dG9uLCBCdXR0b25UYWJ9XG5cblxuIiwiXG5cbntVSV9TZWN0aW9ufSA9IHJlcXVpcmUgXCJVSV9TZWN0aW9uXCJcbntUZXh0LCBCdXR0b259ID0gcmVxdWlyZSBcIlVJX0J1dHRvbnNcIlxuXG5jbGFzcyBleHBvcnRzLlVJX0NvbmZpZyBleHRlbmRzIFVJX1NlY3Rpb25cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0aGVpZ2h0OiAxMDAsIHk6IEFsaWduLmJvdHRvbSgtOClcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0XHR2aWV3OiBudWxsXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEB1cGRhdGVDb25maWdPblJlc2l6ZSgpXG5cblxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudmlldyA9IHZhbHVlXG5cblxuXHR1cGRhdGVDb25maWdPblJlc2l6ZTogKCkgPT5cblx0XHRsb2NhbENvbmZpZyA9IEBcblx0XHRcblx0XHRDYW52YXMub24gXCJjaGFuZ2U6aGVpZ2h0XCIsID0+IGxvY2FsQ29uZmlnLnkgPSBBbGlnbi5ib3R0b20oLTgpXG5cblxuXG5cdCMgT3ZlcnJpZGVcblx0YWRkU2VjdGlvbjogKGFjdGlvbkFycmF5ID0gW10pID0+XG5cdFx0c2VjdGlvblZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IDM2MCwgaGVpZ2h0OiAxMDAsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0eDogMzIsIHk6IEFsaWduLmJvdHRvbSgpXG5cblx0XHRAYWRkU2VjdGlvblRpdGxlKHNlY3Rpb25WaWV3LCBcIlByZXZpZXdcIilcblx0XHRzZWN0aW9uVmlldy5zdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRzZWN0aW9uVmlldy5vblRhcCAtPiA7XG5cdFx0c2VjdGlvblZpZXcuc2hvd0hpbnQgPSAtPiA7XG5cblx0XHRzdW1YID0gMFxuXHRcdGZvciBhY3Rpb25JdGVtLCBpIGluIGFjdGlvbkFycmF5XG5cdFx0XHRzZWN0aW9uQnV0dG9uID0gQGFkZEFjdGlvbkJ1dHRvbihhY3Rpb25JdGVtLCBpKVxuXHRcdFx0c2VjdGlvbkJ1dHRvbi5wYXJlbnQgPSBzZWN0aW9uVmlld1xuXHRcdFx0c2VjdGlvbkJ1dHRvbi54ID0gc3VtWFxuXHRcdFx0c3VtWCArPSBzZWN0aW9uQnV0dG9uLndpZHRoICsgOCArIDRcblx0XHRcblx0XHRAd2lkdGggPSBNYXRoLm1heChAd2lkdGgsIHN1bVgpXG5cdFxuXG5cblx0IyBPdmVycmlkZVxuXHRhZGRBY3Rpb25CdXR0b246IChhY3Rpb25JdGVtLCBpbmRleCkgPT5cblx0XHRidXR0b25MYXllciA9IG5ldyBCdXR0b25cblx0XHRcdHRleHQ6IGFjdGlvbkl0ZW0udGl0bGVcblx0XHRcdHk6IDQyXG5cdFx0XHRzZWxlY3RlZDogaWYgaW5kZXggaXMgMCB0aGVuIHRydWUgZWxzZSBmYWxzZVxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRhY3Rpb25JdGVtOiBhY3Rpb25JdGVtXG5cdFx0XG5cdFx0Y29tcGxleEhhbmRsZXIgPSAoKSAtPlxuXHRcdFx0QGN1c3RvbS5hY3Rpb25JdGVtLmhhbmRsZXIoQGN1c3RvbS5hY3Rpb25JdGVtLmRhdGEsIEApXG5cblx0XHRidXR0b25MYXllci5vbihFdmVudHMuVGFwLCBjb21wbGV4SGFuZGxlcilcblx0XHRyZXR1cm4gYnV0dG9uTGF5ZXIiLCJcblxuXG57VGV4dCwgQnV0dG9uVGFifSA9IHJlcXVpcmUgXCJVSV9CdXR0b25zXCJcblxuY2xhc3MgZXhwb3J0cy5VSV9TZWN0aW9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0d2lkdGg6IDIwMCwgaGVpZ2h0OiBTY3JlZW4uaGVpZ2h0LCB5OiAxMDBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XG5cblx0YWRkU2VjdGlvbjogKHRpdGxlLCBhY3Rpb25BcnJheSA9IFtdKSA9PlxuXG5cdFx0c2VjdGlvblZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IDM2MCwgaGVpZ2h0OiAxMDAsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0eDogMzIsIHk6IEBjaGlsZHJlbi5sZW5ndGggKiAxMDBcblxuXHRcdEBhZGRTZWN0aW9uVGl0bGUoc2VjdGlvblZpZXcsIHRpdGxlKVxuXG5cdFx0c2VjdGlvblZpZXcuc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0c2VjdGlvblZpZXcub25UYXAgLT4gO1xuXHRcdHNlY3Rpb25WaWV3LnNob3dIaW50ID0gLT4gO1xuXG5cdFx0c3VtWCA9IDBcblx0XHRmb3IgYWN0aW9uSXRlbSwgaSBpbiBhY3Rpb25BcnJheVxuXHRcdFx0c2VjdGlvbkJ1dHRvbiA9IEBhZGRBY3Rpb25CdXR0b24oYWN0aW9uSXRlbSwgaSlcblx0XHRcdHNlY3Rpb25CdXR0b24ucGFyZW50ID0gc2VjdGlvblZpZXdcblx0XHRcdHNlY3Rpb25CdXR0b24ueCA9IHN1bVhcblx0XHRcdHN1bVggKz0gc2VjdGlvbkJ1dHRvbi53aWR0aCArIDhcblx0XHRcblx0XHRAd2lkdGggPSBNYXRoLm1heChAd2lkdGgsIHN1bVgpXG5cblxuXG5cdGFkZEFjdGlvbkJ1dHRvbjogKGFjdGlvbkl0ZW0sIGluZGV4KSA9PlxuXHRcdGJ1dHRvbkxheWVyID0gbmV3IEJ1dHRvblRhYlxuXHRcdFx0dGV4dDogYWN0aW9uSXRlbS50aXRsZVxuXHRcdFx0eTogNDJcblx0XHRcdHNlbGVjdGVkOiBpZiBpbmRleCBpcyAwIHRoZW4gdHJ1ZSBlbHNlIGZhbHNlXG5cdFx0XHRjdXN0b206XG5cdFx0XHRcdGFjdGlvbkl0ZW06IGFjdGlvbkl0ZW1cblx0XHRcblx0XHRjb21wbGV4SGFuZGxlciA9ICgpIC0+XG5cdFx0XHRAY3VzdG9tLmFjdGlvbkl0ZW0uaGFuZGxlcihAY3VzdG9tLmFjdGlvbkl0ZW0uZGF0YSwgQClcblx0XHRcdGZvciBidXR0b24gaW4gQHBhcmVudC5jaGlsZHJlblxuXHRcdFx0XHRpZiBidXR0b24ubmFtZSBpc250IFwiLnNlY3Rpb25UaXRsZVwiXG5cdFx0XHRcdFx0YnV0dG9uLnNlbGVjdGVkID0gdHJ1ZSBpZiBidXR0b24gaXMgQFxuXHRcdFx0XHRcdGJ1dHRvbi5zZWxlY3RlZCA9IGZhbHNlIGlmIGJ1dHRvbiBpc250IEBcblxuXHRcdGJ1dHRvbkxheWVyLm9uKEV2ZW50cy5UYXAsIGNvbXBsZXhIYW5kbGVyKVxuXHRcdHJldHVybiBidXR0b25MYXllclxuXG5cblx0YWRkU2VjdGlvblRpdGxlOiAobG9jYWxQYXJlbnQsIHRpdGxlID0gXCJIZWFkZXIgVGl0bGVcIikgPT5cblx0XHRuZXcgVGV4dFxuXHRcdFx0cGFyZW50OiBsb2NhbFBhcmVudFxuXHRcdFx0dGV4dDogdGl0bGUsIG5hbWU6IFwiLnNlY3Rpb25UaXRsZVwiXG5cdFx0XHRmb250U2l6ZTogMTYsIG9wYWNpdHk6IDAuNSwgcGFkZGluZzogeyB0b3A6IDEyIH1cblxuIiwiXG5cbiMge1NlY3Rpb25WaWV3fSA9IHJlcXVpcmUgXCJTZWN0aW9uVmlld1wiXG5cblxuY2xhc3MgZXhwb3J0cy5UcmVlTGF5ZXJWaWV3IGV4dGVuZHMgU2VjdGlvblZpZXdcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdHRyZWVWaWV3TGF5ZXIgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0XHR3aWR0aDogMzIwXG5cdFx0XHRoZWlnaHQ6IDBcblx0XHRcdHNjcm9sbFZlcnRpY2FsOiB0cnVlXG5cdFx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0bW91c2VXaGVlbEVuYWJsZWQ6IHRydWVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjMjIyXCJcblx0XHRcblx0XHR0cmVlVmlld0xheWVyLmNvbnRlbnQuaGVpZ2h0ID0gMFxuXHRcdHRyZWVWaWV3TGF5ZXIubW91c2VXaGVlbEVuYWJsZWQgPSB0cnVlXG5cdFx0XHRcblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR0cmVlVmlldzogdHJlZVZpZXdMYXllclxuXHRcdFx0aW5kZW50OiAxXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdHRyZWVWaWV3TGF5ZXIucGFyZW50ID0gQHBhcmVudFxuXG5cdFxuXHRAZGVmaW5lICd0cmVlVmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50cmVlVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50cmVlVmlldyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdpbmRlbnQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaW5kZW50XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmluZGVudCA9IHZhbHVlXG5cdFxuXG5cblx0cHJpbnRUcmVlOiAoKSA9PlxuXHRcdHByaW50IEB2aWV3LmNoaWxkcmVuXG5cdFx0QHByaW50Tm9kZShAdmlldylcblx0XHRAdHJlZVZpZXcuaGVpZ2h0ID0gU2NyZWVuLmhlaWdodFxuXHRcdEB0cmVlVmlldy51cGRhdGVDb250ZW50KClcblx0XG5cblx0cHJpbnROb2RlOiAobm9kZSwgbGV2ZWwgPSAwKSA9PlxuXHRcdGlmIG5vZGUubmFtZSA9PSBcIlwiIHRoZW4gbGF5ZXJOYW1lID0gXCJVbnRpdGxlZFwiIGVsc2UgbGF5ZXJOYW1lID0gbm9kZS5uYW1lXG5cdFx0IyBwcmludCBBcnJheShsZXZlbCArIDEpLmpvaW4oXCIg44O7IFwiKSArIFwiICN7bGF5ZXJOYW1lfVwiXG5cblx0XHR0cmVlTm9kZUxheWVyID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBAdHJlZVZpZXcuY29udGVudFxuXHRcdFx0dGV4dDogQXJyYXkobGV2ZWwgKyAxKS5qb2luKFwiIOODuyBcIikgKyBcIiAje2xheWVyTmFtZX1cIlxuXHRcdFx0XG5cdFx0XHRmb250U2l6ZTogMTVcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXG5cdFx0XHRvcGFjaXR5OiBpZiBsYXllck5hbWUgPT0gXCJVbnRpdGxlZFwiIHRoZW4gMC41IGVsc2UgMVxuXHRcdFx0aGVpZ2h0OiAyOFxuXHRcdFx0eTogQHRyZWVWaWV3LmhlaWdodFxuXHRcdFx0IyBiYWNrZ3JvdW5kQ29sb3I6IFV0aWxzLnJhbmRvbUNvbG9yKClcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRsYXllcjogbm9kZVxuXHRcdFxuXHRcdHRyZWVOb2RlTGF5ZXIub25UYXAgLT5cblx0XHRcdHByaW50IFwiI3tAY3VzdG9tLmxheWVyLm5hbWV9IHg6ICN7QGN1c3RvbS5sYXllci54fSB5OiAje0BjdXN0b20ubGF5ZXIueX0gc2l6ZTogI3tAY3VzdG9tLmxheWVyLndpZHRofXgje0BjdXN0b20ubGF5ZXIuaGVpZ2h0fVwiXG5cblx0XHRcblx0XHRAdHJlZVZpZXcuaGVpZ2h0ICs9IDI4XG5cblxuXHRcdGlmIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMFxuXHRcdFx0bmV4dExldmVsID0gbGV2ZWwgKyAxXG5cdFx0XHRmb3IgY2hpbGROb2RlIGluIG5vZGUuY2hpbGRyZW5cblx0XHRcdFx0QHByaW50Tm9kZShjaGlsZE5vZGUsIG5leHRMZXZlbClcblx0XHRcbiJdfQ==
