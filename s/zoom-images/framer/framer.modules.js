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
var Button, ModalView, NavigationComponent, NavigationView,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Button = require("Buttons").Button;

NavigationComponent = (function(superClass) {
  extend(NavigationComponent, superClass);

  function NavigationComponent(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, NavigationComponent.__super__.constructor.call(this, this.options));
  }

  NavigationComponent.prototype.stackTransition = function(nav, layerA, layerB, overlay) {
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

  NavigationComponent.prototype.modalTransition = function(nav, layerA, layerB, overlay) {
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

  NavigationComponent.prototype.create_BackButton = function(parentLayer) {
    return new Button({
      parent: parentLayer,
      width: 100,
      height: 82,
      y: 54,
      backgroundColor: null,
      opacity: 0.4,
      handler: function() {
        return this.custom.flow.showPrevious();
      },
      custom: {
        flow: this
      }
    });
  };

  NavigationComponent.prototype.open = function(navigationView) {
    if (navigationView.custom && navigationView.custom.view) {
      navigationView.custom.view.scrollToTop(false);
      return this.transition(navigationView, this.modalTransition);
    } else {
      navigationView.scrollToTop(false);
      return this.transition(navigationView, this.stackTransition);
    }
  };

  NavigationComponent.prototype.createView = function(bgColor) {
    var navigationView;
    if (bgColor == null) {
      bgColor = "white";
    }
    navigationView = new NavigationView({
      width: this.width,
      height: this.height,
      backgroundColor: bgColor,
      scrollVertical: true,
      scrollHorizontal: false,
      directionLock: true
    });
    navigationView.on(Events.SwipeRightStart, (function(_this) {
      return function(event, layer) {
        return _this.showPrevious();
      };
    })(this));
    this.showNext(navigationView);
    this.showPrevious({
      animate: false
    });
    this.create_BackButton(navigationView.content);
    return navigationView;
  };

  NavigationComponent.prototype.createModal = function(bgColor, gap, radius) {
    var navigationView, navigationView_Handler, navigationView_Wrapper;
    if (bgColor == null) {
      bgColor = "white";
    }
    if (gap == null) {
      gap = 66;
    }
    if (radius == null) {
      radius = 56;
    }
    navigationView_Wrapper = new ModalView({
      name: "wrapper",
      width: this.width,
      height: this.height,
      backgroundColor: null,
      custom: {
        view: null,
        handler: null
      }
    });
    navigationView = new ScrollComponent({
      parent: navigationView_Wrapper,
      y: gap,
      width: this.width,
      height: this.height - gap,
      backgroundColor: bgColor,
      scrollVertical: true,
      scrollHorizontal: false,
      directionLock: true,
      borderRadius: radius,
      custom: {
        flow: this
      }
    });
    navigationView_Wrapper.custom.view = navigationView;
    navigationView_Handler = new Layer({
      parent: navigationView_Wrapper,
      width: 40,
      height: 3,
      x: Align.center,
      y: gap - 11,
      backgroundColor: bgColor,
      opacity: 0.5
    });
    navigationView_Wrapper.custom.handler = navigationView_Handler;
    navigationView.on(Events.SwipeRightStart, function(event, layer) {
      return this.custom.flow.showPrevious();
    });
    navigationView.on(Events.SwipeDownStart, function(event, layer) {
      if (this.scrollY < 0) {
        return this.custom.flow.showPrevious();
      }
    });
    this.showNext(navigationView_Wrapper);
    this.showPrevious({
      animate: false
    });
    return navigationView_Wrapper;
  };

  return NavigationComponent;

})(FlowComponent);

NavigationView = (function(superClass) {
  extend(NavigationView, superClass);

  function NavigationView(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, NavigationView.__super__.constructor.call(this, this.options));
  }

  NavigationView.prototype.add = function(contentView) {
    return contentView.parent = this.content;
  };

  return NavigationView;

})(ScrollComponent);

ModalView = (function(superClass) {
  extend(ModalView, superClass);

  function ModalView(options) {
    this.options = options != null ? options : {};
    _.defaults(this.options, ModalView.__super__.constructor.call(this, this.options));
  }

  ModalView.prototype.add = function(contentView) {
    contentView.parent = this.custom.view.content;
    return this.backgroundColor = null;
  };

  return ModalView;

})(Layer);

module.exports = {
  NavigationComponent: NavigationComponent
};


},{"Buttons":"Buttons"}],"PCButtons":[function(require,module,exports){
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
    if (this.showHints) {
      Framer.Extras.Hints.enable();
    } else {
      Framer.Extras.Hints.disable();
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA1LTIyIFtwcF0gU2hlZGV2cm9vbSDigJMgWm9vbSBQaG90by5mcmFtZXIvbW9kdWxlcy9CdXR0b25zLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDUtMjIgW3BwXSBTaGVkZXZyb29tIOKAkyBab29tIFBob3RvLmZyYW1lci9tb2R1bGVzL0NvbmZpZ1ZpZXcuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0wNS0yMiBbcHBdIFNoZWRldnJvb20g4oCTIFpvb20gUGhvdG8uZnJhbWVyL21vZHVsZXMvRGV2aWNlVmlldy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA1LTIyIFtwcF0gU2hlZGV2cm9vbSDigJMgWm9vbSBQaG90by5mcmFtZXIvbW9kdWxlcy9EZXZpY2VfQ2xhc3MuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0wNS0yMiBbcHBdIFNoZWRldnJvb20g4oCTIFpvb20gUGhvdG8uZnJhbWVyL21vZHVsZXMvRGV2aWNlX0luaXQuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0wNS0yMiBbcHBdIFNoZWRldnJvb20g4oCTIFpvb20gUGhvdG8uZnJhbWVyL21vZHVsZXMvSG9tZUJhcl9DbGFzcy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA1LTIyIFtwcF0gU2hlZGV2cm9vbSDigJMgWm9vbSBQaG90by5mcmFtZXIvbW9kdWxlcy9Jbml0Vmlldy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA1LTIyIFtwcF0gU2hlZGV2cm9vbSDigJMgWm9vbSBQaG90by5mcmFtZXIvbW9kdWxlcy9Mb2NhdGlvblZpZXcuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0wNS0yMiBbcHBdIFNoZWRldnJvb20g4oCTIFpvb20gUGhvdG8uZnJhbWVyL21vZHVsZXMvTG9nby5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA1LTIyIFtwcF0gU2hlZGV2cm9vbSDigJMgWm9vbSBQaG90by5mcmFtZXIvbW9kdWxlcy9OYXZpZ2F0aW9uQ29tcG9uZW50LmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDUtMjIgW3BwXSBTaGVkZXZyb29tIOKAkyBab29tIFBob3RvLmZyYW1lci9tb2R1bGVzL1BDQnV0dG9ucy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA1LTIyIFtwcF0gU2hlZGV2cm9vbSDigJMgWm9vbSBQaG90by5mcmFtZXIvbW9kdWxlcy9QaG9uZVR5cGVWaWV3LmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDUtMjIgW3BwXSBTaGVkZXZyb29tIOKAkyBab29tIFBob3RvLmZyYW1lci9tb2R1bGVzL1ByZXZpZXdDbGFzczEuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0wNS0yMiBbcHBdIFNoZWRldnJvb20g4oCTIFpvb20gUGhvdG8uZnJhbWVyL21vZHVsZXMvUHJldmlld0NsYXNzMi5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA1LTIyIFtwcF0gU2hlZGV2cm9vbSDigJMgWm9vbSBQaG90by5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3Q2xhc3MzNS5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA1LTIyIFtwcF0gU2hlZGV2cm9vbSDigJMgWm9vbSBQaG90by5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3Q2xhc3MzLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDUtMjIgW3BwXSBTaGVkZXZyb29tIOKAkyBab29tIFBob3RvLmZyYW1lci9tb2R1bGVzL1ByZXZpZXdDbGFzczQuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0wNS0yMiBbcHBdIFNoZWRldnJvb20g4oCTIFpvb20gUGhvdG8uZnJhbWVyL21vZHVsZXMvUHJldmlld0NsYXNzNS5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA1LTIyIFtwcF0gU2hlZGV2cm9vbSDigJMgWm9vbSBQaG90by5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3Q2xhc3M2LmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDUtMjIgW3BwXSBTaGVkZXZyb29tIOKAkyBab29tIFBob3RvLmZyYW1lci9tb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0wNS0yMiBbcHBdIFNoZWRldnJvb20g4oCTIFpvb20gUGhvdG8uZnJhbWVyL21vZHVsZXMvUHJldmlld0NvbXBvbmVudC5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA1LTIyIFtwcF0gU2hlZGV2cm9vbSDigJMgWm9vbSBQaG90by5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3X0Fzc2V0cy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA1LTIyIFtwcF0gU2hlZGV2cm9vbSDigJMgWm9vbSBQaG90by5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3X0NsYXNzLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDUtMjIgW3BwXSBTaGVkZXZyb29tIOKAkyBab29tIFBob3RvLmZyYW1lci9tb2R1bGVzL1ByZXZpZXdfSW5pdC5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA1LTIyIFtwcF0gU2hlZGV2cm9vbSDigJMgWm9vbSBQaG90by5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3X0xvZ29MYXllci5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA1LTIyIFtwcF0gU2hlZGV2cm9vbSDigJMgWm9vbSBQaG90by5mcmFtZXIvbW9kdWxlcy9QcmV2aWV3X1VJLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDUtMjIgW3BwXSBTaGVkZXZyb29tIOKAkyBab29tIFBob3RvLmZyYW1lci9tb2R1bGVzL1NjYWxlVmlldy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA1LTIyIFtwcF0gU2hlZGV2cm9vbSDigJMgWm9vbSBQaG90by5mcmFtZXIvbW9kdWxlcy9TZWN0aW9uVmlldy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA1LTIyIFtwcF0gU2hlZGV2cm9vbSDigJMgWm9vbSBQaG90by5mcmFtZXIvbW9kdWxlcy9TdGF0dXNCYXJfQ2xhc3MuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0wNS0yMiBbcHBdIFNoZWRldnJvb20g4oCTIFpvb20gUGhvdG8uZnJhbWVyL21vZHVsZXMvVHJlZUxheWVyVmlldy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA1LTIyIFtwcF0gU2hlZGV2cm9vbSDigJMgWm9vbSBQaG90by5mcmFtZXIvbW9kdWxlcy9VSV9CdXR0b25zLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDUtMjIgW3BwXSBTaGVkZXZyb29tIOKAkyBab29tIFBob3RvLmZyYW1lci9tb2R1bGVzL1VJX0NvbmZpZy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTA1LTIyIFtwcF0gU2hlZGV2cm9vbSDigJMgWm9vbSBQaG90by5mcmFtZXIvbW9kdWxlcy9VSV9TZWN0aW9uLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMDUtMjIgW3BwXSBTaGVkZXZyb29tIOKAkyBab29tIFBob3RvLmZyYW1lci9tb2R1bGVzL1VJX1RyZWUuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0wNS0yMiBbcHBdIFNoZWRldnJvb20g4oCTIFpvb20gUGhvdG8uZnJhbWVyL21vZHVsZXMvbXlNb2R1bGUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDRUEsSUFBQTs7OztBQUFNLE9BQU8sQ0FBQzs7O0VBQ0EsZ0JBQUMsT0FBRDtBQUVaLFFBQUE7SUFGYSxJQUFDLENBQUEsNEJBQUQsVUFBUzs7O0lBRXRCLEtBQUEsR0FBUSxJQUFJLEtBQUosQ0FBVTtNQUFFLElBQUEsRUFBTSxFQUFSO01BQVksZUFBQSxFQUFpQixNQUE3QjtLQUFWO0lBRVIsS0FBSyxDQUFDLE1BQU4sR0FDQztNQUFBLFNBQUEsRUFBVztRQUFFLE9BQUEsRUFBUyxDQUFYO09BQVg7TUFDQSxRQUFBLEVBQVU7UUFBRSxPQUFBLEVBQVMsQ0FBWDtPQURWOztJQUdELEtBQUssQ0FBQyxFQUFOLENBQVMsTUFBTSxDQUFDLGNBQWhCLEVBQWdDLFNBQUMsSUFBRCxFQUFPLEVBQVA7TUFDL0IsSUFBRyxJQUFBLEtBQVEsRUFBWDtlQUFtQixJQUFDLENBQUEsTUFBTSxDQUFDLE9BQVIsQ0FBZ0IsRUFBaEIsRUFBbkI7O0lBRCtCLENBQWhDO0lBR0EsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsT0FBQSxFQUFTLElBQVQ7TUFDQSxLQUFBLEVBQU8sSUFEUDtNQUVBLE9BQUEsRUFBUyxHQUZUO0tBREQ7SUFLQSx3Q0FBTSxJQUFDLENBQUEsT0FBUDtJQUVBLElBQUMsQ0FBQSxNQUFELEdBQ0M7TUFBQSxTQUFBLEVBQVc7UUFBRSxLQUFBLEVBQU8sSUFBQyxDQUFBLE9BQVY7T0FBWDtNQUNBLFFBQUEsRUFBVTtRQUFFLEtBQUEsRUFBTyxHQUFUO09BRFY7O0lBR0QsS0FBSyxDQUFDLE1BQU4sR0FBZTtJQUNmLElBQUMsQ0FBQSxLQUFELEdBQVM7SUFFVCxJQUFDLENBQUMsWUFBRixDQUFlLElBQUMsQ0FBQSxLQUFoQjtJQUNBLElBQUMsQ0FBQyxVQUFGLENBQWEsSUFBQyxDQUFBLFFBQWQ7SUFDQSxJQUFDLENBQUMsWUFBRixDQUFlLElBQUMsQ0FBQSxRQUFoQjtJQUNBLElBQUMsQ0FBQyxXQUFGLENBQWMsSUFBQyxDQUFBLFFBQWY7RUE1Qlk7O21CQThCYixLQUFBLEdBQU8sU0FBQTtXQUFHLElBQUMsQ0FBQSxLQUFLLENBQUMsV0FBUCxDQUFtQixTQUFuQjtFQUFIOzttQkFDUCxRQUFBLEdBQVUsU0FBQTtXQUFHLElBQUMsQ0FBQSxLQUFLLENBQUMsV0FBUCxDQUFtQixRQUFuQjtFQUFIOztFQUlWLE1BQUMsQ0FBQSxNQUFELENBQVEsT0FBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLEtBQVQsR0FBaUI7SUFBNUIsQ0FETDtHQUREOztFQUlBLE1BQUMsQ0FBQSxNQUFELENBQVEsU0FBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLE9BQVQsR0FBbUI7SUFBOUIsQ0FETDtHQUREOztFQUlBLE1BQUMsQ0FBQSxNQUFELENBQVEsU0FBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxFQUFELENBQUksTUFBTSxDQUFDLEdBQVgsRUFBZ0IsS0FBaEI7SUFBWCxDQUFMO0dBREQ7Ozs7R0E1QzRCOzs7O0FDQTdCLElBQUEsOEJBQUE7RUFBQTs7OztBQUFDLGNBQWUsT0FBQSxDQUFRLGFBQVI7O0FBQ2hCLE1BQWlCLE9BQUEsQ0FBUSxXQUFSLENBQWpCLEVBQUMsZUFBRCxFQUFPOztBQUVELE9BQU8sQ0FBQzs7O0VBQ0Esb0JBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTOzs7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsTUFBQSxFQUFRLEdBQVI7TUFDQSxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxDQUFDLENBQWQsQ0FESDtLQUREO0lBSUEsNENBQU0sSUFBQyxDQUFBLE9BQVA7RUFOWTs7dUJBU2IsVUFBQSxHQUFZLFNBQUMsV0FBRDtBQUNYLFFBQUE7O01BRFksY0FBYzs7SUFDMUIsSUFBRyxDQUFDLEtBQUssQ0FBQyxRQUFOLENBQUEsQ0FBSjtNQUNDLFdBQUEsR0FBYyxJQUFJLEtBQUosQ0FDYjtRQUFBLE1BQUEsRUFBUSxJQUFSO1FBQ0EsS0FBQSxFQUFPLEdBRFA7UUFDWSxNQUFBLEVBQVEsR0FEcEI7UUFDeUIsZUFBQSxFQUFpQixJQUQxQztRQUVBLENBQUEsRUFBRyxFQUZIO1FBRU8sQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFOLENBQUEsQ0FGVjtPQURhO01BS2QsSUFBQyxDQUFBLGVBQUQsQ0FBaUIsV0FBakIsRUFBOEIsa0JBQTlCO01BQ0EsV0FBVyxDQUFDLEtBQVosR0FBb0I7UUFBQSxNQUFBLEVBQVEsU0FBUjs7TUFDcEIsV0FBVyxDQUFDLEtBQVosQ0FBa0IsU0FBQSxHQUFBLENBQWxCO01BQ0EsV0FBVyxDQUFDLFFBQVosR0FBdUIsU0FBQSxHQUFBO01BRXZCLElBQUEsR0FBTztBQUNQLFdBQUEscURBQUE7O1FBQ0MsYUFBQSxHQUFnQixJQUFDLENBQUEsZUFBRCxDQUFpQixVQUFqQixFQUE2QixDQUE3QjtRQUNoQixhQUFhLENBQUMsTUFBZCxHQUF1QjtRQUN2QixhQUFhLENBQUMsQ0FBZCxHQUFrQjtRQUNsQixJQUFBLElBQVEsYUFBYSxDQUFDLEtBQWQsR0FBc0IsQ0FBdEIsR0FBMEI7QUFKbkM7YUFNQSxJQUFDLENBQUEsS0FBRCxHQUFTLElBQUksQ0FBQyxHQUFMLENBQVMsSUFBQyxDQUFBLEtBQVYsRUFBaUIsSUFBakIsRUFsQlY7O0VBRFc7O3VCQXdCWixlQUFBLEdBQWlCLFNBQUMsVUFBRCxFQUFhLEtBQWI7QUFDaEIsUUFBQTtJQUFBLFdBQUEsR0FBYyxJQUFJLE1BQUosQ0FDYjtNQUFBLElBQUEsRUFBTSxVQUFVLENBQUMsS0FBakI7TUFDQSxDQUFBLEVBQUcsRUFESDtNQUVBLFFBQUEsRUFBYSxLQUFBLEtBQVMsQ0FBWixHQUFtQixJQUFuQixHQUE2QixLQUZ2QztNQUdBLE1BQUEsRUFDQztRQUFBLFVBQUEsRUFBWSxVQUFaO09BSkQ7S0FEYTtJQU9kLGNBQUEsR0FBaUIsU0FBQTthQUNoQixJQUFDLENBQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFuQixDQUEyQixJQUFDLENBQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUE5QyxFQUFvRCxJQUFwRDtJQURnQjtJQUdqQixXQUFXLENBQUMsRUFBWixDQUFlLE1BQU0sQ0FBQyxHQUF0QixFQUEyQixjQUEzQjtBQUNBLFdBQU87RUFaUzs7OztHQWxDZTs7OztBQ0hqQyxJQUFBLFNBQUE7RUFBQTs7OztBQUFDLFlBQWEsT0FBQSxDQUFRLFdBQVI7O0FBR1IsT0FBTyxDQUFDOzs7RUFDQSxvQkFBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7Ozs7O0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLFVBQUEsRUFBWSxJQUFaO01BQ0EsVUFBQSxFQUFZLElBRFo7S0FERDtJQUlBLDRDQUFNLElBQUMsQ0FBQSxPQUFQO0lBRUEsSUFBQyxDQUFBLFVBQUQsR0FBYyxJQUFJLEtBQUosQ0FDYjtNQUFBLGVBQUEsRUFBaUIsS0FBakI7TUFDQSxZQUFBLEVBQWMsSUFBQyxDQUFBLFlBQUQsR0FBZ0IsRUFEOUI7TUFFQSxPQUFBLEVBQVMsQ0FGVDtLQURhO0lBS2QsSUFBQyxDQUFBLFVBQVUsQ0FBQyxVQUFaLENBQUE7SUFFQSxJQUFDLENBQUEsaUJBQUQsQ0FBQTtJQUNBLElBQUMsQ0FBQSxnQkFBRCxDQUFBO0lBRUEsSUFBQyxDQUFBLEVBQUQsQ0FBSSxhQUFKLEVBQW1CLFNBQUE7YUFDbEIsSUFBQyxDQUFBLGdCQUFELENBQUE7SUFEa0IsQ0FBbkI7SUFHQSxJQUFDLENBQUEsRUFBRCxDQUFJLGNBQUosRUFBb0IsU0FBQTthQUNuQixJQUFDLENBQUEsZ0JBQUQsQ0FBQTtJQURtQixDQUFwQjtJQUdBLElBQUMsQ0FBQSxFQUFELENBQUksVUFBSixFQUFnQixTQUFBO2FBQ2YsSUFBQyxDQUFBLGdCQUFELENBQUE7SUFEZSxDQUFoQjtJQUdBLElBQUMsQ0FBQSxFQUFELENBQUksVUFBSixFQUFnQixTQUFBO2FBQ2YsSUFBQyxDQUFBLGdCQUFELENBQUE7SUFEZSxDQUFoQjtFQTNCWTs7RUErQmIsVUFBQyxDQUFBLE1BQUQsQ0FBUSxZQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsVUFBVCxHQUFzQjtJQUFqQyxDQURMO0dBREQ7O0VBSUEsVUFBQyxDQUFBLE1BQUQsQ0FBUSxZQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsVUFBVCxHQUFzQjtJQUFqQyxDQURMO0dBREQ7O3VCQU9BLGNBQUEsR0FBZ0IsU0FBQTtXQUNmLElBQUMsQ0FBQSxVQUFVLENBQUMsT0FBWixHQUFzQjtFQURQOzt1QkFHaEIsY0FBQSxHQUFnQixTQUFBO1dBQ2YsSUFBQyxDQUFBLFVBQVUsQ0FBQyxPQUFaLEdBQXNCO0VBRFA7O3VCQUloQixnQkFBQSxHQUFrQixTQUFBO0FBQ2pCLFFBQUE7SUFBQSxNQUFBLEdBQVM7SUFFVCxJQUFDLENBQUEsVUFBVSxDQUFDLEtBQVosR0FBb0IsSUFBQyxDQUFBLEtBQUQsR0FBUyxNQUFBLEdBQVM7SUFDdEMsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFaLEdBQXFCLElBQUMsQ0FBQSxNQUFELEdBQVUsTUFBQSxHQUFTO0lBQ3hDLElBQUMsQ0FBQSxVQUFVLENBQUMsQ0FBWixHQUFnQixLQUFLLENBQUMsTUFBTixDQUFBO0lBQ2hCLElBQUMsQ0FBQSxVQUFVLENBQUMsQ0FBWixHQUFnQixLQUFLLENBQUMsTUFBTixDQUFBO1dBQ2hCLElBQUMsQ0FBQSxVQUFVLENBQUMsS0FBWixHQUFvQixJQUFDLENBQUE7RUFQSjs7dUJBVWxCLGlCQUFBLEdBQW1CLFNBQUE7QUFDbEIsUUFBQTtJQUFBLElBQUMsQ0FBQSxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQXRCLENBQTBCLGtCQUExQjtJQUVBLEdBQUEsR0FBTTtXQXVCTixLQUFLLENBQUMsU0FBTixDQUFnQixHQUFoQjtFQTFCa0I7Ozs7R0E1RGE7Ozs7QUNKakMsSUFBQTs7OztBQUFNLE9BQU8sQ0FBQzs7O0VBQ0Esc0JBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTOzs7Ozs7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsZUFBQSxFQUFpQixLQUFqQjtNQUNBLElBQUEsRUFBTSxJQUROO0tBREQ7SUFJQSw4Q0FBTSxJQUFDLENBQUEsT0FBUDtJQUdBLElBQUMsQ0FBQSxNQUFELEdBQ0M7TUFBQSxRQUFBLEVBQVU7UUFBRSxLQUFBLEVBQU8sQ0FBVDtPQUFWO01BQ0EsTUFBQSxFQUFRO1FBQUUsS0FBQSxFQUFPLENBQVQ7T0FEUjs7SUFHRCxJQUFDLENBQUEsaUJBQUQsQ0FBQTtJQUNBLElBQUMsQ0FBQSxVQUFELENBQUE7RUFkWTs7RUFrQmIsWUFBQyxDQUFBLE1BQUQsQ0FBUSxNQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDtNQUNKLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxHQUFnQjtNQUNoQixJQUFDLENBQUEsT0FBTyxDQUFDLEtBQVQsR0FBaUIsS0FBSyxDQUFDLEtBQU4sR0FBYyxFQUFBLEdBQUs7TUFDcEMsSUFBQyxDQUFBLE9BQU8sQ0FBQyxNQUFULEdBQWtCLEtBQUssQ0FBQyxNQUFOLEdBQWUsRUFBQSxHQUFLO2FBQ3RDLElBQUMsQ0FBQSxZQUFELEdBQWdCLEtBQUssQ0FBQyxZQUFOLEdBQXFCO0lBSmpDLENBREw7R0FERDs7eUJBUUEsbUJBQUEsR0FBcUIsU0FBQTtXQUNwQixJQUFDLENBQUEsT0FBRCxDQUFTO01BQUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxNQUFPLENBQUEsUUFBQSxDQUFTLENBQUMsS0FBekI7TUFBZ0MsT0FBQSxFQUFTO1FBQUUsS0FBQSxFQUFPLE1BQU0sQ0FBQyxNQUFoQjtRQUF3QixJQUFBLEVBQU0sQ0FBOUI7T0FBekM7S0FBVDtFQURvQjs7eUJBR3JCLGlCQUFBLEdBQW1CLFNBQUE7V0FDbEIsSUFBQyxDQUFBLE9BQUQsQ0FBUztNQUFBLEtBQUEsRUFBTyxJQUFDLENBQUEsTUFBTyxDQUFBLE1BQUEsQ0FBTyxDQUFDLEtBQXZCO01BQThCLE9BQUEsRUFBUztRQUFFLEtBQUEsRUFBTyxNQUFNLENBQUMsTUFBaEI7UUFBd0IsSUFBQSxFQUFNLENBQTlCO09BQXZDO0tBQVQ7RUFEa0I7O3lCQUduQixvQkFBQSxHQUFzQixTQUFBO1dBQ3JCLElBQUMsQ0FBQSxPQUFELENBQVM7TUFBQSxLQUFBLEVBQU8sSUFBQyxDQUFBLE1BQU8sQ0FBQSxRQUFBLENBQVMsQ0FBQyxLQUF6QjtNQUFnQyxPQUFBLEVBQVM7UUFBRSxLQUFBLEVBQU8sTUFBQSxDQUFPO1VBQUEsT0FBQSxFQUFTLENBQVQ7U0FBUCxDQUFUO1FBQTZCLElBQUEsRUFBTSxHQUFuQztPQUF6QztLQUFUO0VBRHFCOzt5QkFHdEIsa0JBQUEsR0FBb0IsU0FBQTtXQUNuQixJQUFDLENBQUEsT0FBRCxDQUFTO01BQUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxNQUFPLENBQUEsTUFBQSxDQUFPLENBQUMsS0FBdkI7TUFBOEIsT0FBQSxFQUFTO1FBQUUsS0FBQSxFQUFPLE1BQUEsQ0FBTztVQUFBLE9BQUEsRUFBUyxDQUFUO1NBQVAsQ0FBVDtRQUE2QixJQUFBLEVBQU0sR0FBbkM7T0FBdkM7S0FBVDtFQURtQjs7eUJBS3BCLGlCQUFBLEdBQW1CLFNBQUE7QUFDbEIsUUFBQTtJQUFBLElBQUMsQ0FBQSxTQUFTLENBQUMsR0FBWCxDQUFlLGtCQUFmO0lBRUEsR0FBQSxHQUFNO1dBdUJOLEtBQUssQ0FBQyxTQUFOLENBQWdCLEdBQWhCO0VBMUJrQjs7OztHQXpDZTs7OztBQ0NuQyxJQUFBLDJCQUFBO0VBQUE7Ozs7QUFBRSxlQUFpQixPQUFBLENBQVEsY0FBUjs7QUFFYixPQUFPLENBQUM7OztFQUNBLHFCQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUzs7Ozs7Ozs7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsT0FBQSxFQUFTLElBQUMsQ0FBQSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQTVCO01BQ0EsZUFBQSxFQUFpQixJQUFDLENBQUEsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFEcEM7TUFFQSxTQUFBLEVBQVcsSUFBQyxDQUFBLElBQUksQ0FBQyxZQUFZLENBQUMsZUFGOUI7TUFHQSxPQUFBLEVBQVMsSUFBQyxDQUFBLElBQUksQ0FBQyxZQUFZLENBQUMsYUFINUI7TUFLQSxxQkFBQSxFQUF1QixJQUFDLENBQUEsSUFBSSxDQUFDLFNBTDdCO01BUUEsYUFBQSxFQUFlLElBUmY7TUFTQSxXQUFBLEVBQWEsSUFUYjtLQUREO0lBWUEsNkNBQU0sSUFBQyxDQUFBLE9BQVA7SUFFQSxJQUFDLENBQUEsVUFBRCxDQUFBO0VBaEJZOztFQXFCYixXQUFDLENBQUEsTUFBRCxDQUFRLFNBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO01BQUcsSUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDLE9BQVo7QUFBeUIsZUFBTyxFQUFoQztPQUFBLE1BQUE7QUFBdUMsZUFBTyxFQUE5Qzs7SUFBSCxDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsT0FBVCxHQUFtQjtJQUE5QixDQURMO0dBREQ7O0VBSUEsV0FBQyxDQUFBLE1BQUQsQ0FBUSxpQkFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLGVBQVQsR0FBMkI7SUFBdEMsQ0FETDtHQUREOztFQUlBLFdBQUMsQ0FBQSxNQUFELENBQVEsV0FBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLFNBQVQsR0FBcUI7SUFBaEMsQ0FETDtHQUREOztFQUlBLFdBQUMsQ0FBQSxNQUFELENBQVEsU0FBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLE9BQVQsR0FBbUI7SUFBOUIsQ0FETDtHQUREOztFQUlBLFdBQUMsQ0FBQSxNQUFELENBQVEsdUJBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxxQkFBVCxHQUFpQztJQUE1QyxDQURMO0dBREQ7O0VBUUEsV0FBQyxDQUFBLE1BQUQsQ0FBUSxlQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsYUFBVCxHQUF5QjtJQUFwQyxDQURMO0dBREQ7O0VBSUEsV0FBQyxDQUFBLE1BQUQsQ0FBUSxhQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsV0FBVCxHQUF1QjtJQUFsQyxDQURMO0dBREQ7O3dCQU1BLFFBQUEsR0FBVSxTQUFDLENBQUQsRUFBSSxDQUFKO0FBQVUsV0FBTyxJQUFDLENBQUEsSUFBSSxDQUFDLEtBQU4sS0FBZSxDQUFmLElBQXFCLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTixLQUFnQjtFQUF0RDs7d0JBSVYsVUFBQSxHQUFZLFNBQUE7SUFDWCxJQUFDLENBQUEsYUFBRCxHQUFpQixJQUFJLEtBQUosQ0FDaEI7TUFBQSxNQUFBLEVBQVEsSUFBQyxDQUFBLElBQVQ7TUFBZSxLQUFBLEVBQU8sSUFBQyxDQUFBLElBQUksQ0FBQyxLQUE1QjtNQUFtQyxDQUFBLEVBQUcsS0FBSyxDQUFDLEdBQTVDO01BQWlELElBQUEsRUFBTSxhQUF2RDtNQUNBLE9BQUEsRUFBUyxJQUFDLENBQUEsT0FEVjtNQUNtQixlQUFBLEVBQWlCLElBRHBDO0tBRGdCO0lBSWpCLElBQUcsSUFBQyxDQUFBLGVBQUo7YUFDQyxJQUFDLENBQUEsNkJBQUQsQ0FBK0IsSUFBQyxDQUFBLGFBQWhDLEVBREQ7S0FBQSxNQUdLLElBQUcsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUFBLElBQXVCLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBdkIsSUFBOEMsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUE5QyxJQUFxRSxJQUFDLENBQUEsUUFBRCxDQUFVLEdBQVYsRUFBZSxHQUFmLENBQXJFLElBQTRGLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBL0Y7TUFDSixJQUFDLENBQUEsb0JBQUQsQ0FBc0IsSUFBQyxDQUFBLGFBQXZCO2FBQ0EsSUFBQyxDQUFBLG1CQUFELENBQXFCLElBQUksS0FBSixDQUNwQjtRQUFBLE1BQUEsRUFBUSxJQUFDLENBQUEsSUFBVDtRQUFlLEtBQUEsRUFBTyxJQUFDLENBQUEsSUFBSSxDQUFDLEtBQTVCO1FBQW1DLE1BQUEsRUFBUSxFQUEzQztRQUErQyxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQXhEO1FBQWdFLElBQUEsRUFBTSxXQUF0RTtRQUFtRixPQUFBLEVBQVMsSUFBQyxDQUFBLE9BQTdGO1FBQXNHLGVBQUEsRUFBaUIsSUFBdkg7T0FEb0IsQ0FBckIsRUFGSTtLQUFBLE1BS0EsSUFBRyxJQUFDLENBQUEsUUFBRCxDQUFVLEdBQVYsRUFBZSxHQUFmLENBQUg7TUFDSixJQUFDLENBQUEsb0JBQUQsQ0FBc0IsSUFBQyxDQUFBLGFBQXZCO2FBQ0EsSUFBQyxDQUFBLG1CQUFELENBQXFCLElBQUksS0FBSixDQUNwQjtRQUFBLE1BQUEsRUFBUSxJQUFDLENBQUEsSUFBVDtRQUFlLEtBQUEsRUFBTyxJQUFDLENBQUEsSUFBSSxDQUFDLEtBQTVCO1FBQW1DLE1BQUEsRUFBUSxFQUEzQztRQUErQyxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQXhEO1FBQWdFLElBQUEsRUFBTSxXQUF0RTtRQUFtRixPQUFBLEVBQVMsSUFBQyxDQUFBLE9BQTdGO1FBQXNHLGVBQUEsRUFBaUIsSUFBdkg7T0FEb0IsQ0FBckIsRUFGSTtLQUFBLE1BS0EsSUFBRyxJQUFDLENBQUEsUUFBRCxDQUFVLEdBQVYsRUFBZSxHQUFmLENBQUEsSUFBdUIsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUF2QixJQUE4QyxJQUFDLENBQUEsUUFBRCxDQUFVLEdBQVYsRUFBZSxHQUFmLENBQWpEO2FBQ0osSUFBQyxDQUFBLHNCQUFELENBQXdCLElBQUMsQ0FBQSxhQUF6QixFQURJO0tBQUEsTUFBQTthQUlBLElBQUMsQ0FBQSxzQkFBRCxDQUF3QixJQUFDLENBQUEsYUFBekIsRUFKQTs7RUFsQk07O3dCQThCWixzQkFBQSxHQUF3QixTQUFDLFFBQUQ7QUFDdkIsUUFBQTtJQUFBLFFBQVEsQ0FBQyxNQUFULEdBQWtCO0lBRWxCLHNCQUFBLEdBQXlCLElBQUksU0FBSixDQUN4QjtNQUFBLE1BQUEsRUFBUSxRQUFSO01BQWtCLEtBQUEsRUFBTyxFQUF6QjtNQUE2QixNQUFBLEVBQVEsRUFBckM7TUFBeUMsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQUFOLENBQVcsQ0FBWCxDQUE1QztNQUEyRCxDQUFBLEVBQUcsS0FBSyxDQUFDLEdBQU4sQ0FBVSxDQUFBLEdBQUksQ0FBZCxDQUE5RDtNQUNBLEtBQUEsRUFBTyxhQUFhLENBQUMsS0FBTSxDQUFBLElBQUMsQ0FBQSxTQUFELENBRDNCO01BQ3dDLGVBQUEsRUFBaUIsSUFEekQ7TUFFQSxRQUFBLEVBQVUsRUFGVjtNQUVjLFVBQUEsRUFBWSxHQUYxQjtNQUUrQixTQUFBLEVBQVcsUUFGMUM7TUFFb0QsVUFBQSxFQUFZLHNCQUZoRTtNQUdBLElBQUEsRUFBTSxJQUFDLENBQUEscUJBSFA7S0FEd0I7V0FNekIsb0JBQUEsR0FBdUIsSUFBSSxLQUFKLENBQ3RCO01BQUEsTUFBQSxFQUFRLFFBQVI7TUFBa0IsS0FBQSxFQUFPLEdBQXpCO01BQThCLE1BQUEsRUFBUSxFQUF0QztNQUEwQyxDQUFBLEVBQUcsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFDLENBQWIsQ0FBN0M7TUFBOEQsQ0FBQSxFQUFHLEtBQUssQ0FBQyxHQUFOLENBQVUsQ0FBVixDQUFqRTtNQUNBLEtBQUEsRUFBTyxhQUFhLENBQUMsMEJBQTJCLENBQUEsSUFBQyxDQUFBLFNBQUQsQ0FEaEQ7S0FEc0I7RUFUQTs7d0JBY3hCLDZCQUFBLEdBQStCLFNBQUMsUUFBRDtBQUM5QixRQUFBO0lBQUEsUUFBUSxDQUFDLE1BQVQsR0FBa0I7SUFFbEIsc0JBQUEsR0FBeUIsSUFBSSxTQUFKLENBQ3hCO01BQUEsTUFBQSxFQUFRLFFBQVI7TUFBa0IsS0FBQSxFQUFPLEVBQXpCO01BQTZCLE1BQUEsRUFBUSxFQUFyQztNQUF5QyxDQUFBLEVBQUcsS0FBSyxDQUFDLElBQWxEO01BQXdELENBQUEsRUFBRyxLQUFLLENBQUMsR0FBTixDQUFVLENBQVYsQ0FBM0Q7TUFDQSxLQUFBLEVBQU8sYUFBYSxDQUFDLEtBQU0sQ0FBQSxJQUFDLENBQUEsU0FBRCxDQUQzQjtNQUN3QyxlQUFBLEVBQWlCLElBRHpEO01BRUEsUUFBQSxFQUFVLEVBRlY7TUFFYyxVQUFBLEVBQVksR0FGMUI7TUFFK0IsU0FBQSxFQUFXLFFBRjFDO01BRW9ELFVBQUEsRUFBWSxzQkFGaEU7TUFHQSxJQUFBLEVBQU0sSUFBQyxDQUFBLHFCQUhQO0tBRHdCO1dBTXpCLG9CQUFBLEdBQXVCLElBQUksS0FBSixDQUN0QjtNQUFBLE1BQUEsRUFBUSxRQUFSO01BQWtCLEtBQUEsRUFBTyxHQUF6QjtNQUE4QixNQUFBLEVBQVEsRUFBdEM7TUFBMEMsQ0FBQSxFQUFHLEtBQUssQ0FBQyxLQUFuRDtNQUEwRCxDQUFBLEVBQUcsS0FBSyxDQUFDLEdBQU4sQ0FBQSxDQUE3RDtNQUNBLEtBQUEsRUFBTyxhQUFhLENBQUMsMEJBQTJCLENBQUEsSUFBQyxDQUFBLFNBQUQsQ0FEaEQ7S0FEc0I7RUFUTzs7d0JBaUIvQixzQkFBQSxHQUF3QixTQUFDLFFBQUQ7QUFDdkIsUUFBQTtJQUFBLFFBQVEsQ0FBQyxNQUFULEdBQWtCO0lBRWxCLG9CQUFBLEdBQXVCLElBQUksS0FBSixDQUN0QjtNQUFBLE1BQUEsRUFBUSxRQUFSO01BQWtCLEtBQUEsRUFBTyxHQUF6QjtNQUE4QixNQUFBLEVBQVEsUUFBUSxDQUFDLE1BQS9DO01BQXVELENBQUEsRUFBRyxLQUFLLENBQUMsSUFBaEU7TUFDQSxLQUFBLEVBQU8sYUFBYSxDQUFDLHFCQUFzQixDQUFBLElBQUMsQ0FBQSxTQUFELENBRDNDO0tBRHNCO0lBSXZCLHNCQUFBLEdBQXlCLElBQUksU0FBSixDQUN4QjtNQUFBLE1BQUEsRUFBUSxRQUFSO01BQWtCLEtBQUEsRUFBTyxFQUF6QjtNQUE2QixNQUFBLEVBQVEsRUFBckM7TUFBeUMsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFsRDtNQUEwRCxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQW5FO01BQ0EsS0FBQSxFQUFPLGFBQWEsQ0FBQyxLQUFNLENBQUEsSUFBQyxDQUFBLFNBQUQsQ0FEM0I7TUFDd0MsZUFBQSxFQUFpQixJQUR6RDtNQUVBLFFBQUEsRUFBVSxFQUZWO01BRWMsVUFBQSxFQUFZLEdBRjFCO01BRStCLFNBQUEsRUFBVyxRQUYxQztNQUVvRCxVQUFBLEVBQVksc0JBRmhFO01BR0EsSUFBQSxFQUFNLElBQUMsQ0FBQSxxQkFIUDtLQUR3QjtXQU16QixvQkFBQSxHQUF1QixJQUFJLEtBQUosQ0FDdEI7TUFBQSxNQUFBLEVBQVEsUUFBUjtNQUFrQixLQUFBLEVBQU8sR0FBekI7TUFBOEIsTUFBQSxFQUFRLFFBQVEsQ0FBQyxNQUEvQztNQUF1RCxDQUFBLEVBQUcsS0FBSyxDQUFDLEtBQWhFO01BQ0EsS0FBQSxFQUFPLGFBQWEsQ0FBQyxzQkFBdUIsQ0FBQSxJQUFDLENBQUEsU0FBRCxDQUQ1QztLQURzQjtFQWJBOzt3QkFrQnhCLG9CQUFBLEdBQXNCLFNBQUMsUUFBRDtBQUNyQixRQUFBO0lBQUEsUUFBUSxDQUFDLE1BQVQsR0FBa0I7SUFFbEIsa0JBQUEsR0FBcUIsSUFBSSxTQUFKLENBQ3BCO01BQUEsTUFBQSxFQUFRLFFBQVI7TUFBa0IsS0FBQSxFQUFPLEVBQXpCO01BQTZCLE1BQUEsRUFBUSxFQUFyQztNQUF5QyxDQUFBLEVBQUcsS0FBSyxDQUFDLElBQU4sQ0FBVyxFQUFYLENBQTVDO01BQTRELENBQUEsRUFBRyxLQUFLLENBQUMsR0FBTixDQUFVLEVBQVYsQ0FBL0Q7TUFDQSxLQUFBLEVBQU8sYUFBYSxDQUFDLEtBQU0sQ0FBQSxJQUFDLENBQUEsU0FBRCxDQUQzQjtNQUN3QyxlQUFBLEVBQWlCLElBRHpEO01BQytELGFBQUEsRUFBZSxDQUFDLElBRC9FO01BRUEsUUFBQSxFQUFVLEVBRlY7TUFFYyxVQUFBLEVBQVksR0FGMUI7TUFFK0IsU0FBQSxFQUFXLFFBRjFDO01BRW9ELFVBQUEsRUFBWSxzQkFGaEU7TUFHQSxJQUFBLEVBQU0sSUFBQyxDQUFBLHFCQUhQO0tBRG9CO0lBTXJCLG9CQUFBLEdBQXVCLElBQUksS0FBSixDQUN0QjtNQUFBLE1BQUEsRUFBUSxRQUFSO01BQWtCLEtBQUEsRUFBTyxHQUF6QjtNQUE4QixNQUFBLEVBQVEsUUFBUSxDQUFDLE1BQS9DO01BQXVELENBQUEsRUFBRyxLQUFLLENBQUMsTUFBaEU7TUFDQSxLQUFBLEVBQU8sYUFBYSxDQUFDLEtBRHJCO0tBRHNCO1dBSXZCLG1CQUFBLEdBQXNCLElBQUksS0FBSixDQUNyQjtNQUFBLE1BQUEsRUFBUSxRQUFSO01BQWtCLEtBQUEsRUFBTyxHQUF6QjtNQUE4QixNQUFBLEVBQVEsUUFBUSxDQUFDLE1BQS9DO01BQXVELENBQUEsRUFBRyxLQUFLLENBQUMsS0FBaEU7TUFDQSxLQUFBLEVBQU8sYUFBYSxDQUFDLG1CQUFvQixDQUFBLElBQUMsQ0FBQSxTQUFELENBRHpDO0tBRHFCO0VBYkQ7O3dCQXFCdEIsbUJBQUEsR0FBcUIsU0FBQyxRQUFEO1dBQ3BCLElBQUMsQ0FBQSxXQUFELEdBQWUsSUFBSSxLQUFKLENBQ2Q7TUFBQSxJQUFBLEVBQU0sV0FBTjtNQUNBLE1BQUEsRUFBUSxRQURSO01BQ2tCLEtBQUEsRUFBTyxHQUR6QjtNQUM4QixNQUFBLEVBQVEsQ0FEdEM7TUFDeUMsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQURsRDtNQUMwRCxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxDQUFDLENBQWQsQ0FEN0Q7TUFFQSxlQUFBLEVBQWlCLGFBQWEsQ0FBQyxLQUFNLENBQUEsSUFBQyxDQUFBLE9BQUQsQ0FGckM7TUFFZ0QsWUFBQSxFQUFjLEVBRjlEO0tBRGM7RUFESzs7OztHQWhLWTs7QUF5S2xDLGFBQUEsR0FDQztFQUFBLEtBQUEsRUFDQztJQUFBLElBQUEsRUFBTSxNQUFOO0lBQ0EsS0FBQSxFQUFPLE1BRFA7R0FERDtFQUlBLG1CQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0seURBQU47SUFDQSxLQUFBLEVBQU8sMERBRFA7R0FMRDtFQU9BLHFCQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0sMkRBQU47SUFDQSxLQUFBLEVBQU8sNERBRFA7R0FSRDtFQVVBLHNCQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0sNERBQU47SUFDQSxLQUFBLEVBQU8sNkRBRFA7R0FYRDtFQWFBLDBCQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0sZ0VBQU47SUFDQSxLQUFBLEVBQU8saUVBRFA7R0FkRDtFQW1CQSxLQUFBLEVBQU8sb0RBbkJQO0VBb0JBLEdBQUEsRUFBSyx3Q0FwQkw7Ozs7O0FDN0tELElBQUEsYUFBQTtFQUFBOzs7O0FBQU0sT0FBTyxDQUFDOzs7RUFDQSx1QkFBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7Ozs7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxJQUFUO01BQ0EsS0FBQSxFQUFPLElBQUMsQ0FBQSxJQUFJLENBQUMsS0FEYjtNQUdBLEtBQUEsRUFBTyxJQUFDLENBQUEsSUFBSSxDQUFDLGFBSGI7TUFLQSxNQUFBLEVBQVEsRUFMUjtNQUtZLENBQUEsRUFBRyxLQUFLLENBQUMsTUFMckI7TUFLNkIsSUFBQSxFQUFNLFdBTG5DO01BS2dELGVBQUEsRUFBaUIsSUFMakU7S0FERDtJQVFBLCtDQUFNLElBQUMsQ0FBQSxPQUFQO0lBRUEsSUFBQyxDQUFBLE1BQUQsQ0FBQTtFQVpZOztFQWdCYixhQUFDLENBQUEsTUFBRCxDQUFRLE1BQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULEdBQWdCO0lBQTNCLENBREw7R0FERDs7RUFJQSxhQUFDLENBQUEsTUFBRCxDQUFRLE9BQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxLQUFULEdBQWlCO0lBQTVCLENBREw7R0FERDs7MEJBTUEsUUFBQSxHQUFVLFNBQUMsQ0FBRCxFQUFJLENBQUo7QUFBVSxXQUFPLElBQUMsQ0FBQSxJQUFJLENBQUMsS0FBTixLQUFlLENBQWYsSUFBcUIsSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFOLEtBQWdCO0VBQXREOzswQkFFVixNQUFBLEdBQVEsU0FBQTtJQUNQLElBQUcsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUFBLElBQXVCLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBdkIsSUFBOEMsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUE5QyxJQUFxRSxJQUFDLENBQUEsUUFBRCxDQUFVLEdBQVYsRUFBZSxHQUFmLENBQXJFLElBQTRGLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBNUYsSUFBbUgsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUF0SDthQUNDLElBQUMsQ0FBQSxtQkFBRCxDQUFBLEVBREQ7O0VBRE87OzBCQUtSLG1CQUFBLEdBQXFCLFNBQUE7V0FDcEIsSUFBSSxLQUFKLENBQ0M7TUFBQSxJQUFBLEVBQU0sV0FBTjtNQUNBLE1BQUEsRUFBUSxJQURSO01BQ1csS0FBQSxFQUFPLEdBRGxCO01BQ3VCLE1BQUEsRUFBUSxDQUQvQjtNQUNrQyxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BRDNDO01BQ21ELENBQUEsRUFBRyxLQUFLLENBQUMsTUFBTixDQUFhLENBQUMsQ0FBZCxDQUR0RDtNQUVBLGVBQUEsRUFBaUIsYUFBYSxDQUFDLEtBQU0sQ0FBQSxJQUFDLENBQUEsS0FBRCxDQUZyQztNQUU4QyxZQUFBLEVBQWMsRUFGNUQ7S0FERDtFQURvQjs7OztHQWxDYzs7QUEwQ3BDLGFBQUEsR0FDQztFQUFBLEtBQUEsRUFDQztJQUFBLElBQUEsRUFBTSxNQUFOO0lBQ0EsS0FBQSxFQUFPLE1BRFA7R0FERDs7Ozs7QUMxQ0QsSUFBQSxNQUFBO0VBQUE7Ozs7QUFBQSxNQUFBLEdBQVMsT0FBQSxDQUFRLGdCQUFSOztBQUtILE9BQU8sQ0FBQzs7O0VBQ0Esa0JBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTOzs7Ozs7Ozs7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsSUFBQSxFQUFNLFNBQU47TUFDQSxJQUFBLEVBQU0sSUFETjtNQUdBLGVBQUEsRUFBaUIsSUFIakI7TUFJQSxZQUFBLEVBQWMsRUFKZDtNQU1BLE1BQUEsRUFBUSxNQUFNLENBQUMsSUFOZjtLQUREO0lBU0EsMENBQU0sSUFBQyxDQUFBLE9BQVA7SUFHQSxNQUFNLENBQUMsOEJBQVAsQ0FBc0MsSUFBdEM7SUFFQSxJQUFDLENBQUEsTUFBRCxHQUNDO01BQUEsUUFBQSxFQUFVO1FBQUUsS0FBQSxFQUFPLENBQVQ7T0FBVjtNQUNBLE1BQUEsRUFBUTtRQUFFLEtBQUEsRUFBTyxDQUFUO09BRFI7O0VBakJXOztFQXlCYixRQUFDLENBQUEsTUFBRCxDQUFRLE1BQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO01BQ0osSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULEdBQWdCO01BQ2hCLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBQyxDQUFBLElBQUksQ0FBQztNQUNmLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBLElBQUksQ0FBQzthQUNoQixJQUFDLENBQUEsSUFBSSxDQUFDLE1BQU4sR0FBZTtJQUpYLENBREw7R0FERDs7RUFRQSxRQUFDLENBQUEsTUFBRCxDQUFRLFFBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7R0FERDs7cUJBT0EsVUFBQSxHQUFZLFNBQUMsQ0FBRCxFQUFJLENBQUo7QUFBVSxXQUFPLE1BQU0sQ0FBQyxLQUFQLEtBQWdCLENBQWhCLElBQXNCLE1BQU0sQ0FBQyxNQUFQLEtBQWlCO0VBQXhEOztxQkFDWixRQUFBLEdBQVUsU0FBQyxDQUFELEVBQUksQ0FBSjtBQUFVLFdBQU8sSUFBQyxDQUFBLEtBQUQsS0FBVSxDQUFWLElBQWdCLElBQUMsQ0FBQSxNQUFELEtBQVc7RUFBNUM7O3FCQUNWLFNBQUEsR0FBVyxTQUFDLENBQUQ7QUFBTyxXQUFPLElBQUMsQ0FBQSxLQUFELEtBQVU7RUFBeEI7O3FCQUVYLE9BQUEsR0FBUyxTQUFBO1dBQ1IsSUFBSSxTQUFKLENBQWM7TUFBRSxJQUFBLEVBQVMsTUFBTSxDQUFDLEtBQVIsR0FBYyxHQUFkLEdBQWlCLE1BQU0sQ0FBQyxNQUFsQztNQUE0QyxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQXJEO0tBQWQ7RUFEUTs7cUJBS1Qsb0JBQUEsR0FBc0IsU0FBQTtXQUNyQixJQUFDLENBQUEsT0FBRCxDQUFTLFFBQVQsRUFBbUI7TUFBQSxLQUFBLEVBQU8sTUFBQSxDQUFPO1FBQUEsT0FBQSxFQUFTLENBQVQ7T0FBUCxDQUFQO01BQTJCLElBQUEsRUFBTSxHQUFqQztLQUFuQjtFQURxQjs7cUJBR3RCLGtCQUFBLEdBQW9CLFNBQUE7V0FDbkIsSUFBQyxDQUFBLE9BQUQsQ0FBUyxNQUFULEVBQWlCO01BQUEsS0FBQSxFQUFPLE1BQUEsQ0FBTztRQUFBLE9BQUEsRUFBUyxDQUFUO09BQVAsQ0FBUDtNQUEyQixJQUFBLEVBQU0sR0FBakM7S0FBakI7RUFEbUI7O3FCQUdwQixtQkFBQSxHQUFxQixTQUFBO1dBQ3BCLElBQUMsQ0FBQSxXQUFELENBQWEsUUFBYjtFQURvQjs7cUJBR3JCLGlCQUFBLEdBQW1CLFNBQUE7V0FDbEIsSUFBQyxDQUFBLFdBQUQsQ0FBYSxNQUFiO0VBRGtCOzs7O0dBM0RXOzs7O0FDTC9CLElBQUEsVUFBQTtFQUFBOzs7O0FBQUMsYUFBYyxPQUFBLENBQVEsWUFBUjs7QUFHVCxPQUFPLENBQUM7OztFQUNBLHNCQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUzs7Ozs7Ozs7O0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLFNBQUEsRUFBVyxNQUFYO01BQ0EsVUFBQSxFQUFZLElBRFo7TUFFQSxRQUFBLEVBQVUsSUFGVjtNQUdBLFlBQUEsRUFBYyxLQUhkO0tBREQ7SUFPQSw4Q0FBTSxJQUFDLENBQUEsT0FBUDtJQUVBLElBQUMsQ0FBQSxZQUFELENBQUE7RUFYWTs7RUFjYixZQUFDLENBQUEsTUFBRCxDQUFRLFdBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFULEdBQXFCO0lBQWhDLENBREw7R0FERDs7RUFJQSxZQUFDLENBQUEsTUFBRCxDQUFRLFlBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxVQUFULEdBQXNCO0lBQWpDLENBREw7R0FERDs7RUFJQSxZQUFDLENBQUEsTUFBRCxDQUFRLFVBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxRQUFULEdBQW9CO0lBQS9CLENBREw7R0FERDs7RUFJQSxZQUFDLENBQUEsTUFBRCxDQUFRLGNBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO01BQ0osSUFBQyxDQUFBLE9BQU8sQ0FBQyxZQUFULEdBQXdCO01BQ3hCLElBQUcsS0FBSDtRQUNDLElBQUMsQ0FBQSxVQUFELEdBQWM7UUFDZCxJQUFDLENBQUEsUUFBRCxHQUFZO2VBQ1osSUFBQyxDQUFBLFlBQUQsR0FBZ0IsRUFIakI7O0lBRkksQ0FETDtHQUREOzt5QkFVQSxZQUFBLEdBQWMsU0FBQTtBQUNiLFFBQUE7SUFBQSxnQkFBQSxHQUFtQixJQUFDLENBQUEsZUFBRCxDQUFpQixTQUFqQixFQUE0QjtNQUFDO1FBQUUsS0FBQSxFQUFPLE9BQVQ7UUFBa0IsTUFBQSxFQUFRLEtBQTFCO09BQUQsRUFDbkM7UUFBRSxLQUFBLEVBQU8sTUFBVDtRQUFpQixNQUFBLEVBQVEsSUFBekI7T0FEbUM7S0FBNUIsRUFDMkIsS0FEM0I7SUFHbkIsSUFBRyxnQkFBSDthQUF5QixJQUFDLENBQUEsY0FBRCxDQUFBLEVBQXpCO0tBQUEsTUFDSyxJQUFHLEtBQUssQ0FBQyxRQUFOLENBQUEsQ0FBSDthQUF5QixJQUFDLENBQUEsYUFBRCxDQUFBLEVBQXpCO0tBQUEsTUFBQTthQUNBLElBQUMsQ0FBQSxjQUFELENBQUEsRUFEQTs7RUFMUTs7eUJBV2QsV0FBQSxHQUFhLFNBQUE7QUFFWixRQUFBO0lBQUEsV0FBQSxHQUFjLE1BQU0sQ0FBQyxLQUFQLEdBQWUsTUFBTSxDQUFDO0lBRXBDLElBQUMsQ0FBQSxPQUFELEdBQVc7SUFDWCxJQUFDLENBQUEsT0FBRCxHQUFXO0lBRVgsTUFBQSxHQUFTLENBQUMsTUFBTSxDQUFDLEtBQVAsR0FBZSxXQUFBLEdBQWMsR0FBOUIsQ0FBQSxHQUFxQyxJQUFDLENBQUE7SUFDL0MsTUFBQSxHQUFTLENBQUMsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsV0FBQSxHQUFjLEdBQS9CLENBQUEsR0FBc0MsSUFBQyxDQUFBO0lBQ2hELElBQUMsQ0FBQSxNQUFPLENBQUEsTUFBQSxDQUFPLENBQUMsS0FBaEIsR0FBd0IsSUFBSSxDQUFDLEdBQUwsQ0FBUyxNQUFULEVBQWlCLE1BQWpCO0lBRXhCLElBQUMsQ0FBQSxNQUFPLENBQUEsTUFBQSxDQUFPLENBQUMsQ0FBaEIsR0FBb0IsQ0FBQyxNQUFNLENBQUMsS0FBUCxHQUFlLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBQyxDQUFBLE1BQU8sQ0FBQSxNQUFBLENBQU8sQ0FBQyxLQUF6QyxDQUFBLEdBQWtEO0lBQ3RFLElBQUMsQ0FBQSxNQUFPLENBQUEsTUFBQSxDQUFPLENBQUMsQ0FBaEIsR0FBb0IsQ0FBQyxNQUFNLENBQUMsTUFBUCxHQUFnQixJQUFDLENBQUEsTUFBRCxHQUFVLElBQUMsQ0FBQSxNQUFPLENBQUEsTUFBQSxDQUFPLENBQUMsS0FBM0MsQ0FBQSxHQUFvRDtJQUV4RSxJQUFDLENBQUEsTUFBTyxDQUFBLFFBQUEsQ0FBUyxDQUFDLENBQWxCLEdBQXNCLENBQUMsTUFBTSxDQUFDLEtBQVAsR0FBZSxJQUFDLENBQUEsS0FBakIsQ0FBQSxHQUEwQjtXQUNoRCxJQUFDLENBQUEsTUFBTyxDQUFBLFFBQUEsQ0FBUyxDQUFDLENBQWxCLEdBQXNCLENBQUMsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsSUFBQyxDQUFBLE1BQWxCLENBQUEsR0FBNEI7RUFmdEM7O3lCQXNCYixtQkFBQSxHQUFxQixTQUFBO0FBRXBCLFFBQUE7SUFBQSxRQUFBLEdBQVcsSUFBQyxDQUFBLGVBQUQsQ0FBaUIsT0FBakIsRUFBMEI7TUFBQztRQUFFLEtBQUEsRUFBTyxNQUFUO1FBQWlCLE1BQUEsRUFBUSxNQUF6QjtPQUFELEVBQzNCO1FBQUUsS0FBQSxFQUFPLFFBQVQ7UUFBbUIsTUFBQSxFQUFRLFFBQTNCO09BRDJCLEVBRTNCO1FBQUUsS0FBQSxFQUFPLE1BQVQ7UUFBaUIsTUFBQSxFQUFRLE1BQXpCO09BRjJCO0tBQTFCLEVBRW1DLElBQUMsQ0FBQSxTQUZwQztJQUlYLGdCQUFBLEdBQW1CLElBQUMsQ0FBQSxlQUFELENBQWlCLFFBQWpCLEVBQTJCO01BQUM7UUFBRSxLQUFBLEVBQU8sT0FBVDtRQUFrQixNQUFBLEVBQVEsS0FBMUI7T0FBRCxFQUNsQztRQUFFLEtBQUEsRUFBTyxLQUFUO1FBQWdCLE1BQUEsRUFBUSxLQUF4QjtPQURrQztLQUEzQixFQUMyQixJQUFDLENBQUEsVUFENUI7SUFHbkIsY0FBQSxHQUFpQixJQUFDLENBQUEsZUFBRCxDQUFpQixNQUFqQixFQUF5QjtNQUFDO1FBQUUsS0FBQSxFQUFPLE9BQVQ7UUFBa0IsTUFBQSxFQUFRLEtBQTFCO09BQUQsRUFDL0I7UUFBRSxLQUFBLEVBQU8sS0FBVDtRQUFnQixNQUFBLEVBQVEsS0FBeEI7T0FEK0I7S0FBekIsRUFDNEIsSUFBQyxDQUFBLFFBRDdCO0lBR2pCLGdCQUFBLEdBQW1CLElBQUMsQ0FBQSxlQUFELENBQWlCLFFBQWpCLEVBQTJCO01BQUM7UUFBRSxLQUFBLEVBQU8sT0FBVDtRQUFrQixNQUFBLEVBQVEsS0FBMUI7T0FBRCxFQUNuQztRQUFFLEtBQUEsRUFBTyxLQUFUO1FBQWdCLE1BQUEsRUFBUSxLQUF4QjtPQURtQyxFQUVuQztRQUFFLEtBQUEsRUFBTyxNQUFUO1FBQWlCLE1BQUEsRUFBUSxJQUF6QjtPQUZtQztLQUEzQixFQUUwQixJQUFDLENBQUEsVUFGM0I7SUFLbkIsSUFBRyxjQUFIO01BQXVCLElBQUMsQ0FBQSxnQkFBRCxDQUFBLEVBQXZCOztJQUNBLElBQUcsZ0JBQUg7TUFBeUIsSUFBQyxDQUFBLGlCQUFELENBQW1CLFFBQW5CLEVBQXpCOztJQUNBLElBQUcsZ0JBQUg7TUFBeUIsSUFBQyxDQUFBLGNBQUQsQ0FBQSxFQUF6QjtLQUFBLE1BQUE7TUFBZ0QsSUFBQyxDQUFBLGNBQUQsQ0FBQSxFQUFoRDs7V0FDQSxJQUFDLENBQUEsV0FBRCxDQUFhLFFBQWI7RUFwQm9COzt5QkF3QnJCLGNBQUEsR0FBZ0IsU0FBQTtJQUNmLElBQUMsQ0FBQSxXQUFELENBQUE7SUFDQSxJQUFDLENBQUEsbUJBQUQsQ0FBQTtJQUNBLElBQUMsQ0FBQSxVQUFELENBQUE7SUFDQSxJQUFDLENBQUEsSUFBRCxHQUFRO1dBQ1IsSUFBQyxDQUFBLHFCQUFELENBQUE7RUFMZTs7eUJBUWhCLHFCQUFBLEdBQXVCLFNBQUE7QUFDdEIsUUFBQTtJQUFBLFlBQUEsR0FBZTtJQUVmLE1BQU0sQ0FBQyxFQUFQLENBQVUsZUFBVixFQUEyQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7UUFDMUIsWUFBWSxDQUFDLFdBQWIsQ0FBQTtlQUNBLFlBQVksQ0FBQyxXQUFiLENBQXlCLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQXJEO01BRjBCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUEzQjtJQUlBLE1BQU0sQ0FBQyxFQUFQLENBQVUsY0FBVixFQUEwQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7UUFDekIsWUFBWSxDQUFDLFdBQWIsQ0FBQTtlQUNBLFlBQVksQ0FBQyxXQUFiLENBQXlCLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQXJEO01BRnlCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUExQjtJQUtBLE1BQU0sQ0FBQyxFQUFQLENBQVUsZUFBVixFQUEyQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7UUFDMUIsWUFBWSxDQUFDLFdBQWIsQ0FBQTtlQUNBLFlBQVksQ0FBQyxXQUFiLENBQXlCLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQXJEO01BRjBCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUEzQjtXQUlBLE1BQU0sQ0FBQyxFQUFQLENBQVUsY0FBVixFQUEwQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7UUFDekIsWUFBWSxDQUFDLFdBQWIsQ0FBQTtlQUNBLFlBQVksQ0FBQyxXQUFiLENBQXlCLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQXJEO01BRnlCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUExQjtFQWhCc0I7O3lCQTBCdkIsYUFBQSxHQUFlLFNBQUE7SUFFZCxJQUFDLENBQUEsS0FBRCxHQUFTLE1BQU0sQ0FBQyxLQUFQLEdBQWUsSUFBQyxDQUFBO0lBQ3pCLElBQUMsQ0FBQSxPQUFELEdBQVc7V0FDWCxJQUFDLENBQUEsT0FBRCxHQUFXO0VBSkc7O3lCQVFmLGdCQUFBLEdBQWtCLFNBQUE7SUFDakIsSUFBQyxDQUFBLENBQUQsR0FBSyxLQUFLLENBQUM7SUFFWCxJQUFDLENBQUEsS0FBRCxHQUFTLENBQUMsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsR0FBakIsQ0FBQSxHQUF3QixJQUFDLENBQUE7SUFDbEMsSUFBQyxDQUFBLFlBQUQsR0FBZ0I7V0FDaEIsSUFBQyxDQUFBLElBQUQsR0FBUTtFQUxTOzt5QkFXbEIsZUFBQSxHQUFpQixTQUFDLFFBQUQsRUFBcUIsVUFBckIsRUFBc0MsYUFBdEM7QUFDaEIsUUFBQTs7TUFEaUIsV0FBVzs7O01BQVMsYUFBYTs7O01BQUksZ0JBQWdCOztJQUN0RSxNQUFBLEdBQVM7QUFFVDtBQUFBLFNBQUEscUNBQUE7O01BQ0MsWUFBQSxHQUFlLElBQUksQ0FBQyxLQUFMLENBQVcsR0FBWDtNQUNmLE9BQUEsR0FBVSxZQUFhLENBQUEsQ0FBQTtNQUN2QixTQUFBLEdBQVksWUFBYSxDQUFBLENBQUE7TUFFekIsSUFBRyxPQUFBLEtBQVcsUUFBZDtBQUNDLGFBQUEsOENBQUE7O1VBQ0MsSUFBRyxTQUFBLEtBQWEsSUFBSSxDQUFDLEtBQXJCO1lBRUMsTUFBQSxHQUFTLElBQUksQ0FBQyxPQUZmOztBQURELFNBREQ7O0FBTEQ7QUFhQSxXQUFPO0VBaEJTOzs7O0dBbkppQjs7OztBQ0huQyxJQUFBLE9BQUE7RUFBQTs7OztBQUFNLE9BQU8sQ0FBQzs7O0VBQ0EsbUJBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTOzs7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsT0FBQSxFQUFTLEdBQVQ7TUFDQSxPQUFBLEVBQVMsSUFEVDtNQUVBLEdBQUEsRUFBSyxPQUFBLENBQVEsS0FBUixDQUZMO0tBREQ7SUFLQSwyQ0FBTSxJQUFDLENBQUEsT0FBUDtJQUNBLElBQUMsQ0FBQSxLQUFELEdBQVM7TUFBQSxNQUFBLEVBQVEsU0FBUjs7SUFDVCxJQUFDLENBQUEsUUFBRCxHQUFZLFNBQUEsR0FBQTtJQUVaLElBQUMsQ0FBQyxXQUFGLENBQWMsSUFBQyxDQUFBLEtBQWY7SUFDQSxJQUFDLENBQUMsVUFBRixDQUFhLElBQUMsQ0FBQSxRQUFkO0VBWlk7O0VBY2IsU0FBQyxDQUFBLE1BQUQsQ0FBUSxTQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLEVBQUQsQ0FBSSxNQUFNLENBQUMsR0FBWCxFQUFnQixLQUFoQjtJQUFYLENBQUw7R0FERDs7c0JBR0EsS0FBQSxHQUFPLFNBQUE7V0FDTixJQUFDLENBQUEsT0FBRCxHQUFXO0VBREw7O3NCQUVQLFFBQUEsR0FBVSxTQUFBO1dBQ1QsSUFBQyxDQUFBLE9BQUQsR0FBVztFQURGOzs7O0dBcEJxQjs7QUF5QmhDLE9BQUEsR0FBVSxTQUFDLFNBQUQ7QUFDVCxNQUFBO0VBQUEsYUFBQSxHQUFnQjtBQUNoQixTQUFPLDZrQkFBQSxHQUN1ZCxhQUR2ZCxHQUNxZSxtdUJBRHJlLEdBRWt0QixhQUZsdEIsR0FFZ3VCLDhWQUZodUIsR0FHNlUsYUFIN1UsR0FHMlYsOFZBSDNWLEdBSTZVLGFBSjdVLEdBSTJWLDhWQUozVixHQUs2VSxhQUw3VSxHQUsyVixxeEJBTDNWLEdBTW93QixhQU5wd0IsR0FNa3hCLHFpQkFObHhCLEdBT29oQixhQVBwaEIsR0FPa2lCO0FBVGhpQjs7OztBQ3hCVixJQUFBLHNEQUFBO0VBQUE7OztBQUFFLFNBQVcsT0FBQSxDQUFRLFNBQVI7O0FBSVA7OztFQUNRLDZCQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUztJQUV0QixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBR0EscURBQU0sSUFBQyxDQUFBLE9BQVAsQ0FIQTtFQUZZOztnQ0F5QmIsZUFBQSxHQUFpQixTQUFDLEdBQUQsRUFBTSxNQUFOLEVBQWMsTUFBZCxFQUFzQixPQUF0QjtBQUNoQixRQUFBO1dBQUEsVUFBQSxHQUNDO01BQUEsTUFBQSxFQUNDO1FBQUEsSUFBQSxFQUFNO1VBQUMsQ0FBQSxFQUFHLENBQUo7VUFBTyxDQUFBLEVBQUcsQ0FBVjtTQUFOO1FBQ0EsSUFBQSxFQUFNO1VBQUMsQ0FBQSxFQUFHLENBQUEscUJBQUksTUFBTSxDQUFFLGVBQVIsR0FBZ0IsQ0FBeEI7VUFBMkIsQ0FBQSxFQUFHLENBQTlCO1NBRE47T0FERDtNQUdBLE1BQUEsRUFDQztRQUFBLElBQUEsRUFBTTtVQUFDLENBQUEsRUFBRyxDQUFKO1VBQU8sQ0FBQSxFQUFHLENBQVY7U0FBTjtRQUNBLElBQUEsRUFBTTtVQUFDLENBQUEsRUFBRyxNQUFNLENBQUMsS0FBWDtVQUFrQixDQUFBLEVBQUcsQ0FBckI7U0FETjtPQUpEO01BTUEsT0FBQSxFQUNDO1FBQUEsSUFBQSxFQUFNO1VBQUMsT0FBQSxFQUFTLEVBQVY7VUFBYyxDQUFBLEVBQUcsQ0FBakI7VUFBb0IsQ0FBQSxFQUFHLENBQXZCO1VBQTBCLElBQUEsRUFBTSxHQUFHLENBQUMsSUFBcEM7U0FBTjtRQUNBLElBQUEsRUFBTTtVQUFDLE9BQUEsRUFBUyxDQUFWO1VBQWEsQ0FBQSxFQUFHLENBQWhCO1VBQW1CLENBQUEsRUFBRyxDQUF0QjtVQUF5QixJQUFBLEVBQU0sR0FBRyxDQUFDLElBQW5DO1NBRE47T0FQRDs7RUFGZTs7Z0NBYWpCLGVBQUEsR0FBaUIsU0FBQyxHQUFELEVBQU0sTUFBTixFQUFjLE1BQWQsRUFBc0IsT0FBdEI7QUFDaEIsUUFBQTtXQUFBLFVBQUEsR0FDQztNQUFBLE1BQUEsRUFDQztRQUFBLElBQUEsRUFBTTtVQUFDLENBQUEsRUFBRyxDQUFKO1VBQU8sQ0FBQSxFQUFHLENBQVY7U0FBTjtRQUNBLElBQUEsRUFBTTtVQUFDLENBQUEsRUFBRyxDQUFKO1VBQU8sQ0FBQSxFQUFHLENBQVY7U0FETjtPQUREO01BR0EsTUFBQSxFQUNDO1FBQUEsSUFBQSxFQUFNO1VBQUMsQ0FBQSxFQUFHLENBQUo7VUFBTyxDQUFBLEVBQUcsQ0FBVjtTQUFOO1FBQ0EsSUFBQSxFQUFNO1VBQUMsQ0FBQSxFQUFHLENBQUo7VUFBTyxDQUFBLG9CQUFHLE1BQU0sQ0FBRSxnQkFBUixHQUFpQixFQUEzQjtTQUROO09BSkQ7TUFNQSxPQUFBLEVBQ0M7UUFBQSxJQUFBLEVBQU07VUFBQyxPQUFBLEVBQVMsRUFBVjtVQUFjLENBQUEsRUFBRyxDQUFqQjtVQUFvQixDQUFBLEVBQUcsQ0FBdkI7VUFBMEIsSUFBQSxFQUFNLEdBQUcsQ0FBQyxJQUFwQztTQUFOO1FBQ0EsSUFBQSxFQUFNO1VBQUMsT0FBQSxFQUFTLENBQVY7VUFBYSxDQUFBLEVBQUcsQ0FBaEI7VUFBbUIsQ0FBQSxFQUFHLENBQXRCO1VBQXlCLElBQUEsRUFBTSxHQUFHLENBQUMsSUFBbkM7U0FETjtPQVBEOztFQUZlOztnQ0FnQmpCLGlCQUFBLEdBQW1CLFNBQUMsV0FBRDtBQUNsQixXQUFPLElBQUksTUFBSixDQUNOO01BQUEsTUFBQSxFQUFRLFdBQVI7TUFDQSxLQUFBLEVBQU8sR0FEUDtNQUNZLE1BQUEsRUFBUSxFQURwQjtNQUN3QixDQUFBLEVBQUcsRUFEM0I7TUFFQSxlQUFBLEVBQWlCLElBRmpCO01BR0EsT0FBQSxFQUFTLEdBSFQ7TUFJQSxPQUFBLEVBQVMsU0FBQTtlQUFNLElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQWIsQ0FBQTtNQUFOLENBSlQ7TUFLQSxNQUFBLEVBQ0M7UUFBQSxJQUFBLEVBQU0sSUFBTjtPQU5EO0tBRE07RUFEVzs7Z0NBWW5CLElBQUEsR0FBTSxTQUFDLGNBQUQ7SUFDTCxJQUFHLGNBQWMsQ0FBQyxNQUFmLElBQTBCLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBbkQ7TUFDQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUEzQixDQUF1QyxLQUF2QzthQUNBLElBQUMsQ0FBQSxVQUFELENBQVksY0FBWixFQUE0QixJQUFDLENBQUEsZUFBN0IsRUFGRDtLQUFBLE1BQUE7TUFJQyxjQUFjLENBQUMsV0FBZixDQUEyQixLQUEzQjthQUNBLElBQUMsQ0FBQSxVQUFELENBQVksY0FBWixFQUE0QixJQUFDLENBQUEsZUFBN0IsRUFMRDs7RUFESzs7Z0NBVU4sVUFBQSxHQUFZLFNBQUMsT0FBRDtBQUNYLFFBQUE7O01BRFksVUFBVTs7SUFDdEIsY0FBQSxHQUFpQixJQUFJLGNBQUosQ0FDaEI7TUFBQSxLQUFBLEVBQU8sSUFBQyxDQUFBLEtBQVI7TUFDQSxNQUFBLEVBQVEsSUFBQyxDQUFBLE1BRFQ7TUFFQSxlQUFBLEVBQWlCLE9BRmpCO01BR0EsY0FBQSxFQUFnQixJQUhoQjtNQUlBLGdCQUFBLEVBQWtCLEtBSmxCO01BS0EsYUFBQSxFQUFlLElBTGY7S0FEZ0I7SUFRakIsY0FBYyxDQUFDLEVBQWYsQ0FBa0IsTUFBTSxDQUFDLGVBQXpCLEVBQTBDLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQyxLQUFELEVBQVEsS0FBUjtlQUN6QyxLQUFDLENBQUEsWUFBRCxDQUFBO01BRHlDO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUExQztJQUdBLElBQUMsQ0FBQSxRQUFELENBQVUsY0FBVjtJQUNBLElBQUMsQ0FBQSxZQUFELENBQWM7TUFBQSxPQUFBLEVBQVMsS0FBVDtLQUFkO0lBRUEsSUFBQyxDQUFBLGlCQUFELENBQW1CLGNBQWMsQ0FBQyxPQUFsQztBQUVBLFdBQU87RUFqQkk7O2dDQW9CWixXQUFBLEdBQWEsU0FBQyxPQUFELEVBQW9CLEdBQXBCLEVBQThCLE1BQTlCO0FBQ1osUUFBQTs7TUFEYSxVQUFVOzs7TUFBUyxNQUFNOzs7TUFBSSxTQUFTOztJQUNuRCxzQkFBQSxHQUF5QixJQUFJLFNBQUosQ0FDeEI7TUFBQSxJQUFBLEVBQU0sU0FBTjtNQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsS0FEUjtNQUVBLE1BQUEsRUFBUSxJQUFDLENBQUEsTUFGVDtNQUdBLGVBQUEsRUFBaUIsSUFIakI7TUFJQSxNQUFBLEVBQ0M7UUFBQSxJQUFBLEVBQU0sSUFBTjtRQUNBLE9BQUEsRUFBUyxJQURUO09BTEQ7S0FEd0I7SUFTekIsY0FBQSxHQUFpQixJQUFJLGVBQUosQ0FDaEI7TUFBQSxNQUFBLEVBQVEsc0JBQVI7TUFDQSxDQUFBLEVBQUcsR0FESDtNQUVBLEtBQUEsRUFBTyxJQUFDLENBQUEsS0FGUjtNQUdBLE1BQUEsRUFBUSxJQUFDLENBQUEsTUFBRCxHQUFVLEdBSGxCO01BSUEsZUFBQSxFQUFpQixPQUpqQjtNQUtBLGNBQUEsRUFBZ0IsSUFMaEI7TUFNQSxnQkFBQSxFQUFrQixLQU5sQjtNQU9BLGFBQUEsRUFBZSxJQVBmO01BUUEsWUFBQSxFQUFjLE1BUmQ7TUFTQSxNQUFBLEVBQ0M7UUFBQSxJQUFBLEVBQU0sSUFBTjtPQVZEO0tBRGdCO0lBYWpCLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxJQUE5QixHQUFxQztJQUVyQyxzQkFBQSxHQUF5QixJQUFJLEtBQUosQ0FDeEI7TUFBQSxNQUFBLEVBQVEsc0JBQVI7TUFDQSxLQUFBLEVBQU8sRUFEUDtNQUNXLE1BQUEsRUFBUSxDQURuQjtNQUNzQixDQUFBLEVBQUcsS0FBSyxDQUFDLE1BRC9CO01BQ3VDLENBQUEsRUFBRyxHQUFBLEdBQU0sRUFEaEQ7TUFFQSxlQUFBLEVBQWlCLE9BRmpCO01BRTBCLE9BQUEsRUFBUyxHQUZuQztLQUR3QjtJQUt6QixzQkFBc0IsQ0FBQyxNQUFNLENBQUMsT0FBOUIsR0FBd0M7SUFFeEMsY0FBYyxDQUFDLEVBQWYsQ0FBa0IsTUFBTSxDQUFDLGVBQXpCLEVBQTBDLFNBQUMsS0FBRCxFQUFRLEtBQVI7YUFDekMsSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBYixDQUFBO0lBRHlDLENBQTFDO0lBR0EsY0FBYyxDQUFDLEVBQWYsQ0FBa0IsTUFBTSxDQUFDLGNBQXpCLEVBQXlDLFNBQUMsS0FBRCxFQUFRLEtBQVI7TUFDeEMsSUFBRyxJQUFDLENBQUEsT0FBRCxHQUFXLENBQWQ7ZUFBcUIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBYixDQUFBLEVBQXJCOztJQUR3QyxDQUF6QztJQUdBLElBQUMsQ0FBQSxRQUFELENBQVUsc0JBQVY7SUFDQSxJQUFDLENBQUEsWUFBRCxDQUFjO01BQUEsT0FBQSxFQUFTLEtBQVQ7S0FBZDtBQUVBLFdBQU87RUF6Q0s7Ozs7R0FqR29COztBQThKNUI7OztFQUNRLHdCQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUztJQUV0QixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBRUEsZ0RBQU0sSUFBQyxDQUFBLE9BQVAsQ0FGQTtFQUZZOzsyQkFNYixHQUFBLEdBQUssU0FBQyxXQUFEO1dBQ0osV0FBVyxDQUFDLE1BQVosR0FBcUIsSUFBQyxDQUFBO0VBRGxCOzs7O0dBUHVCOztBQVd2Qjs7O0VBQ1EsbUJBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTO0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFFQSwyQ0FBTSxJQUFDLENBQUEsT0FBUCxDQUZBO0VBRlk7O3NCQU1iLEdBQUEsR0FBSyxTQUFDLFdBQUQ7SUFDSixXQUFXLENBQUMsTUFBWixHQUFxQixJQUFDLENBQUEsTUFBTSxDQUFDLElBQUksQ0FBQztXQUNsQyxJQUFDLENBQUEsZUFBRCxHQUFtQjtFQUZmOzs7O0dBUGtCOztBQVl4QixNQUFNLENBQUMsT0FBUCxHQUFpQjtFQUFFLHFCQUFBLG1CQUFGOzs7OztBQ3pMakIsSUFBQSxtQ0FBQTtFQUFBOzs7O0FBQU07OztFQUNRLGNBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTO0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFFQztNQUFBLFFBQUEsRUFBVSxFQUFWO01BQ0EsTUFBQSxFQUFRLEdBRFI7TUFFQSxLQUFBLEVBQU8sT0FGUDtNQUdBLE1BQUEsRUFBUSxFQUhSO01BSUEsYUFBQSxFQUFlLEdBSmY7TUFLQSxhQUFBLEVBQWUsR0FMZjtLQUZEO0lBU0Esc0NBQU0sSUFBQyxDQUFBLE9BQVA7SUFFQSxJQUFDLENBQUEsS0FBRCxHQUNDO01BQUEsYUFBQSxFQUFlLDhEQUFmO01BQ0EsYUFBQSxFQUFlLEdBRGY7TUFFQSwrQkFBQSxFQUFpQyw2Q0FGakM7TUFHQSw0QkFBQSxFQUE4Qiw2Q0FIOUI7TUFJQSwyQkFBQSxFQUE2Qiw2Q0FKN0I7TUFLQSx1QkFBQSxFQUF5Qiw2Q0FMekI7O0VBZFc7Ozs7R0FESzs7QUF5QmI7OztFQUNRLG9CQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUzs7OztJQUV0QixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxLQUFBLEVBQU87UUFBRSxNQUFBLEVBQVEsR0FBVjtRQUFlLEtBQUEsRUFBTyxHQUF0QjtPQUFQO01BQ0EsT0FBQSxFQUFTLElBRFQ7S0FERDtJQUtBLDRDQUFNLElBQUMsQ0FBQSxPQUFQO0lBQ0EsSUFBQyxDQUFBLEtBQUQsR0FBUztNQUFBLE1BQUEsRUFBUSxTQUFSOztJQUVULElBQUMsQ0FBQyxXQUFGLENBQWMsSUFBQyxDQUFBLEtBQWY7SUFDQSxJQUFDLENBQUMsVUFBRixDQUFhLElBQUMsQ0FBQSxRQUFkO0lBRUEsSUFBQyxDQUFBLFdBQUQsQ0FBYSxJQUFDLENBQUEsS0FBZDtFQWJZOzt1QkFpQmIsS0FBQSxHQUFPLFNBQUE7V0FDTixJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxLQUFLLENBQUM7RUFEWjs7dUJBRVAsUUFBQSxHQUFVLFNBQUE7V0FDVCxJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxLQUFLLENBQUM7RUFEVDs7dUJBR1YsV0FBQSxHQUFhLFNBQUMsUUFBRDtJQUNaLElBQUMsQ0FBQSxLQUFELEdBQVM7SUFDVCxJQUFDLENBQUEsSUFBRCxDQUFNLE1BQU0sQ0FBQyxTQUFiO1dBQ0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxNQUFNLENBQUMsUUFBYjtFQUhZOztFQU1iLFVBQUMsQ0FBQSxNQUFELENBQVEsU0FBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxFQUFELENBQUksTUFBTSxDQUFDLEdBQVgsRUFBZ0IsS0FBaEI7SUFBWCxDQUFMO0dBREQ7O0VBR0EsVUFBQyxDQUFBLE1BQUQsQ0FBUSxPQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUNKLElBQUMsQ0FBQSxPQUFPLENBQUMsS0FBVCxHQUFpQjtJQURiLENBREw7R0FERDs7OztHQWhDd0I7O0FBdUNuQjs7O0VBQ1EsZ0JBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTOzs7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsT0FBQSxFQUFTLElBQVQ7TUFDQSxNQUFBLEVBQVEsRUFEUjtNQUNZLFlBQUEsRUFBYyxDQUQxQjtNQUVBLE9BQUEsRUFBUztRQUFFLEdBQUEsRUFBSyxDQUFQO1FBQVUsTUFBQSxFQUFRLENBQWxCO1FBQXFCLElBQUEsRUFBTSxDQUEzQjtRQUE4QixLQUFBLEVBQU8sQ0FBckM7T0FGVDtNQUdBLGVBQUEsRUFBaUIsaUJBSGpCO0tBREQ7SUFNQSx3Q0FBTSxJQUFDLENBQUEsT0FBUDtJQUNBLElBQUMsQ0FBQSxRQUFELEdBQVksU0FBQSxHQUFBO0lBQ1osSUFBQyxDQUFBLEtBQUQsR0FBUztNQUFBLE1BQUEsRUFBUSxTQUFSOztJQUVULElBQUMsQ0FBQyxXQUFGLENBQWMsSUFBQyxDQUFBLEtBQWY7SUFDQSxJQUFDLENBQUMsVUFBRixDQUFhLElBQUMsQ0FBQSxRQUFkO0VBYlk7O21CQWViLEtBQUEsR0FBTyxTQUFBO1dBQ04sSUFBQyxDQUFBLGVBQUQsR0FBbUI7RUFEYjs7bUJBRVAsUUFBQSxHQUFVLFNBQUE7V0FDVCxJQUFDLENBQUEsZUFBRCxHQUFtQjtFQURWOztFQUdWLE1BQUMsQ0FBQSxNQUFELENBQVEsU0FBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxFQUFELENBQUksTUFBTSxDQUFDLEdBQVgsRUFBZ0IsS0FBaEI7SUFBWCxDQUFMO0dBREQ7Ozs7R0FyQm9COztBQXlCZjs7O0VBQ1EsbUJBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTOzs7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsUUFBQSxFQUFVLElBQVY7S0FERDtJQUdBLDJDQUFNLElBQUMsQ0FBQSxPQUFQO0VBTFk7O3NCQU9iLEtBQUEsR0FBTyxTQUFBO1dBQ04sSUFBQyxDQUFBLGVBQUQsR0FBbUI7RUFEYjs7c0JBRVAsUUFBQSxHQUFVLFNBQUE7SUFDVCxJQUFHLElBQUMsQ0FBQSxRQUFKO2FBQWtCLElBQUMsQ0FBQSxlQUFELEdBQW1CLGtCQUFyQztLQUFBLE1BQUE7YUFDSyxJQUFDLENBQUEsZUFBRCxHQUFtQixrQkFEeEI7O0VBRFM7O0VBSVYsU0FBQyxDQUFBLE1BQUQsQ0FBUSxVQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDtNQUNKLElBQUMsQ0FBQSxPQUFPLENBQUMsUUFBVCxHQUFvQjtNQUNwQixJQUFHLEtBQUg7ZUFBYyxJQUFDLENBQUEsZUFBRCxHQUFtQixrQkFBakM7T0FBQSxNQUFBO2VBQ0ssSUFBQyxDQUFBLGVBQUQsR0FBbUIsa0JBRHhCOztJQUZJLENBREw7R0FERDs7OztHQWR1Qjs7QUFtTXhCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCO0VBQUMsTUFBQSxJQUFEO0VBQU8sWUFBQSxVQUFQO0VBQW1CLFFBQUEsTUFBbkI7RUFBMkIsV0FBQSxTQUEzQjs7Ozs7QUM3UmpCLElBQUEsMkJBQUE7RUFBQTs7OztBQUFDLFdBQVksT0FBQSxDQUFRLFVBQVI7O0FBRWIsaUJBQUEsR0FBb0I7O0FBRWQsT0FBTyxDQUFDOzs7RUFDQSx1QkFBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7Ozs7Ozs7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsU0FBQSxFQUFXLE1BQVg7TUFDQSxPQUFBLEVBQVMsTUFEVDtNQUdBLE9BQUEsRUFBUyxJQUhUO01BSUEsZUFBQSxFQUFpQixLQUpqQjtNQU9BLHFCQUFBLEVBQXVCLGlCQVB2QjtNQVVBLGFBQUEsRUFBZSxJQVZmO01BV0EsV0FBQSxFQUFhLElBWGI7S0FERDtJQWVBLCtDQUFNLElBQUMsQ0FBQSxPQUFQO0VBakJZOztFQXFCYixhQUFDLENBQUEsTUFBRCxDQUFRLFdBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFULEdBQXFCO0lBQWhDLENBREw7R0FERDs7RUFJQSxhQUFDLENBQUEsTUFBRCxDQUFRLFNBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxPQUFULEdBQW1CO0lBQTlCLENBREw7R0FERDs7RUFJQSxhQUFDLENBQUEsTUFBRCxDQUFRLGlCQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsZUFBVCxHQUEyQjtJQUF0QyxDQURMO0dBREQ7O0VBS0EsYUFBQyxDQUFBLE1BQUQsQ0FBUSxVQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTtNQUFHLElBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxPQUFaO0FBQXlCLGVBQU8sRUFBaEM7T0FBQSxNQUFBO0FBQXVDLGVBQU8sRUFBOUM7O0lBQUgsQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLE9BQVQsR0FBbUI7SUFBOUIsQ0FETDtHQUREOztFQUtBLGFBQUMsQ0FBQSxNQUFELENBQVEsU0FBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7TUFBRyxJQUFHLElBQUMsQ0FBQSxPQUFPLENBQUMsT0FBWjtBQUF5QixlQUFPLEVBQWhDO09BQUEsTUFBQTtBQUF1QyxlQUFPLEVBQTlDOztJQUFILENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxPQUFULEdBQW1CO0lBQTlCLENBREw7R0FERDs7RUFNQSxhQUFDLENBQUEsTUFBRCxDQUFRLHVCQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMscUJBQVQsR0FBaUM7SUFBNUMsQ0FETDtHQUREOztFQU1BLGFBQUMsQ0FBQSxNQUFELENBQVEsZUFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLGFBQVQsR0FBeUI7SUFBcEMsQ0FETDtHQUREOztFQUlBLGFBQUMsQ0FBQSxNQUFELENBQVEsYUFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLFdBQVQsR0FBdUI7SUFBbEMsQ0FETDtHQUREOzswQkFTQSxVQUFBLEdBQVksU0FBQTtJQUNYLElBQUMsQ0FBQSxhQUFELEdBQWlCLElBQUksS0FBSixDQUNoQjtNQUFBLE1BQUEsRUFBUSxJQUFSO01BQVcsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFuQjtNQUEwQixDQUFBLEVBQUcsS0FBSyxDQUFDLEdBQW5DO01BQXdDLElBQUEsRUFBTSxhQUE5QztNQUNBLE9BQUEsRUFBUyxJQUFDLENBQUEsT0FEVjtNQUNtQixlQUFBLEVBQWlCLElBRHBDO0tBRGdCO0lBSWpCLElBQUcsSUFBQyxDQUFBLGVBQUo7YUFDQyxJQUFDLENBQUEsNkJBQUQsQ0FBK0IsSUFBQyxDQUFBLGFBQWhDLEVBREQ7S0FBQSxNQUdLLElBQUcsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUFBLElBQXVCLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBdkIsSUFBOEMsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUE5QyxJQUFxRSxJQUFDLENBQUEsUUFBRCxDQUFVLEdBQVYsRUFBZSxHQUFmLENBQXJFLElBQTRGLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBL0Y7TUFDSixJQUFDLENBQUEsb0JBQUQsQ0FBc0IsSUFBQyxDQUFBLGFBQXZCO2FBQ0EsSUFBQyxDQUFBLG1CQUFELENBQXFCLElBQUksS0FBSixDQUNwQjtRQUFBLE1BQUEsRUFBUSxJQUFSO1FBQVcsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFuQjtRQUEwQixNQUFBLEVBQVEsRUFBbEM7UUFBc0MsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUEvQztRQUF1RCxJQUFBLEVBQU0sV0FBN0Q7UUFBMEUsT0FBQSxFQUFTLElBQUMsQ0FBQSxPQUFwRjtRQUE2RixlQUFBLEVBQWlCLElBQTlHO09BRG9CLENBQXJCLEVBRkk7S0FBQSxNQUtBLElBQUcsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUFIO01BQ0osS0FBQSxDQUFNLElBQU47TUFDQSxJQUFDLENBQUEsb0JBQUQsQ0FBc0IsSUFBQyxDQUFBLGFBQXZCO2FBQ0EsSUFBQyxDQUFBLG1CQUFELENBQXFCLElBQUksS0FBSixDQUNwQjtRQUFBLE1BQUEsRUFBUSxJQUFSO1FBQVcsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFuQjtRQUEwQixNQUFBLEVBQVEsRUFBbEM7UUFBc0MsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUEvQztRQUF1RCxJQUFBLEVBQU0sV0FBN0Q7UUFBMEUsT0FBQSxFQUFTLElBQUMsQ0FBQSxPQUFwRjtRQUE2RixlQUFBLEVBQWlCLElBQTlHO09BRG9CLENBQXJCLEVBSEk7S0FBQSxNQU1BLElBQUcsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUFBLElBQXVCLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBdkIsSUFBOEMsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUFqRDthQUNKLElBQUMsQ0FBQSxzQkFBRCxDQUF3QixJQUFDLENBQUEsYUFBekIsRUFESTtLQUFBLE1BQUE7YUFJQSxJQUFDLENBQUEsc0JBQUQsQ0FBd0IsSUFBQyxDQUFBLGFBQXpCLEVBSkE7O0VBbkJNOzswQkErQlosc0JBQUEsR0FBd0IsU0FBQyxRQUFEO0FBQ3ZCLFFBQUE7SUFBQSxRQUFRLENBQUMsTUFBVCxHQUFrQjtJQUVsQixzQkFBQSxHQUF5QixJQUFJLFNBQUosQ0FDeEI7TUFBQSxNQUFBLEVBQVEsUUFBUjtNQUFrQixLQUFBLEVBQU8sRUFBekI7TUFBNkIsTUFBQSxFQUFRLEVBQXJDO01BQXlDLENBQUEsRUFBRyxLQUFLLENBQUMsSUFBTixDQUFXLENBQVgsQ0FBNUM7TUFBMkQsQ0FBQSxFQUFHLEtBQUssQ0FBQyxHQUFOLENBQVUsQ0FBQSxHQUFJLENBQWQsQ0FBOUQ7TUFDQSxLQUFBLEVBQU8sSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFNLENBQUEsSUFBQyxDQUFBLFNBQUQsQ0FEckI7TUFDa0MsZUFBQSxFQUFpQixJQURuRDtNQUVBLFFBQUEsRUFBVSxFQUZWO01BRWMsVUFBQSxFQUFZLEdBRjFCO01BRStCLFNBQUEsRUFBVyxRQUYxQztNQUVvRCxVQUFBLEVBQVksc0JBRmhFO01BR0EsSUFBQSxFQUFNLElBQUMsQ0FBQSxxQkFIUDtLQUR3QjtXQU16QixvQkFBQSxHQUF1QixJQUFJLEtBQUosQ0FDdEI7TUFBQSxNQUFBLEVBQVEsUUFBUjtNQUFrQixLQUFBLEVBQU8sR0FBekI7TUFBOEIsTUFBQSxFQUFRLEVBQXRDO01BQTBDLENBQUEsRUFBRyxLQUFLLENBQUMsS0FBTixDQUFZLENBQUMsQ0FBYixDQUE3QztNQUE4RCxDQUFBLEVBQUcsS0FBSyxDQUFDLEdBQU4sQ0FBVSxDQUFWLENBQWpFO01BQ0EsS0FBQSxFQUFPLElBQUMsQ0FBQSxNQUFNLENBQUMsMEJBQTJCLENBQUEsSUFBQyxDQUFBLFNBQUQsQ0FEMUM7S0FEc0I7RUFUQTs7MEJBY3hCLDZCQUFBLEdBQStCLFNBQUMsUUFBRDtBQUM5QixRQUFBO0lBQUEsUUFBUSxDQUFDLE1BQVQsR0FBa0I7SUFFbEIsc0JBQUEsR0FBeUIsSUFBSSxTQUFKLENBQ3hCO01BQUEsTUFBQSxFQUFRLFFBQVI7TUFBa0IsS0FBQSxFQUFPLEVBQXpCO01BQTZCLE1BQUEsRUFBUSxFQUFyQztNQUF5QyxDQUFBLEVBQUcsS0FBSyxDQUFDLElBQWxEO01BQXdELENBQUEsRUFBRyxLQUFLLENBQUMsR0FBTixDQUFVLENBQVYsQ0FBM0Q7TUFDQSxLQUFBLEVBQU8sSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFNLENBQUEsSUFBQyxDQUFBLFNBQUQsQ0FEckI7TUFDa0MsZUFBQSxFQUFpQixJQURuRDtNQUVBLFFBQUEsRUFBVSxFQUZWO01BRWMsVUFBQSxFQUFZLEdBRjFCO01BRStCLFNBQUEsRUFBVyxRQUYxQztNQUVvRCxVQUFBLEVBQVksc0JBRmhFO01BR0EsSUFBQSxFQUFNLElBQUMsQ0FBQSxxQkFIUDtLQUR3QjtXQU16QixvQkFBQSxHQUF1QixJQUFJLEtBQUosQ0FDdEI7TUFBQSxNQUFBLEVBQVEsUUFBUjtNQUFrQixLQUFBLEVBQU8sR0FBekI7TUFBOEIsTUFBQSxFQUFRLEVBQXRDO01BQTBDLENBQUEsRUFBRyxLQUFLLENBQUMsS0FBbkQ7TUFBMEQsQ0FBQSxFQUFHLEtBQUssQ0FBQyxHQUFOLENBQUEsQ0FBN0Q7TUFDQSxLQUFBLEVBQU8sSUFBQyxDQUFBLE1BQU0sQ0FBQywwQkFBMkIsQ0FBQSxJQUFDLENBQUEsU0FBRCxDQUQxQztLQURzQjtFQVRPOzswQkFpQi9CLHNCQUFBLEdBQXdCLFNBQUMsUUFBRDtBQUN2QixRQUFBO0lBQUEsUUFBUSxDQUFDLE1BQVQsR0FBa0I7SUFFbEIsb0JBQUEsR0FBdUIsSUFBSSxLQUFKLENBQ3RCO01BQUEsTUFBQSxFQUFRLFFBQVI7TUFBa0IsS0FBQSxFQUFPLEdBQXpCO01BQThCLE1BQUEsRUFBUSxRQUFRLENBQUMsTUFBL0M7TUFBdUQsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQUFoRTtNQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsTUFBTSxDQUFDLHFCQUFzQixDQUFBLElBQUMsQ0FBQSxTQUFELENBRHJDO0tBRHNCO0lBSXZCLHNCQUFBLEdBQXlCLElBQUksU0FBSixDQUN4QjtNQUFBLE1BQUEsRUFBUSxRQUFSO01BQWtCLEtBQUEsRUFBTyxFQUF6QjtNQUE2QixNQUFBLEVBQVEsRUFBckM7TUFBeUMsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFsRDtNQUEwRCxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQW5FO01BQ0EsS0FBQSxFQUFPLElBQUMsQ0FBQSxNQUFNLENBQUMsS0FBTSxDQUFBLElBQUMsQ0FBQSxTQUFELENBRHJCO01BQ2tDLGVBQUEsRUFBaUIsSUFEbkQ7TUFFQSxRQUFBLEVBQVUsRUFGVjtNQUVjLFVBQUEsRUFBWSxHQUYxQjtNQUUrQixTQUFBLEVBQVcsUUFGMUM7TUFFb0QsVUFBQSxFQUFZLHNCQUZoRTtNQUdBLElBQUEsRUFBTSxJQUFDLENBQUEscUJBSFA7S0FEd0I7V0FNekIsb0JBQUEsR0FBdUIsSUFBSSxLQUFKLENBQ3RCO01BQUEsTUFBQSxFQUFRLFFBQVI7TUFBa0IsS0FBQSxFQUFPLEdBQXpCO01BQThCLE1BQUEsRUFBUSxRQUFRLENBQUMsTUFBL0M7TUFBdUQsQ0FBQSxFQUFHLEtBQUssQ0FBQyxLQUFoRTtNQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsTUFBTSxDQUFDLHNCQUF1QixDQUFBLElBQUMsQ0FBQSxTQUFELENBRHRDO0tBRHNCO0VBYkE7OzBCQWtCeEIsb0JBQUEsR0FBc0IsU0FBQyxRQUFEO0FBQ3JCLFFBQUE7SUFBQSxRQUFRLENBQUMsTUFBVCxHQUFrQjtJQUVsQixrQkFBQSxHQUFxQixJQUFJLFNBQUosQ0FDcEI7TUFBQSxNQUFBLEVBQVEsUUFBUjtNQUFrQixLQUFBLEVBQU8sRUFBekI7TUFBNkIsTUFBQSxFQUFRLEVBQXJDO01BQXlDLENBQUEsRUFBRyxLQUFLLENBQUMsSUFBTixDQUFXLEVBQVgsQ0FBNUM7TUFBNEQsQ0FBQSxFQUFHLEtBQUssQ0FBQyxHQUFOLENBQVUsRUFBVixDQUEvRDtNQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsTUFBTSxDQUFDLEtBQU0sQ0FBQSxJQUFDLENBQUEsU0FBRCxDQURyQjtNQUNrQyxlQUFBLEVBQWlCLElBRG5EO01BQ3lELGFBQUEsRUFBZSxDQUFDLElBRHpFO01BRUEsUUFBQSxFQUFVLEVBRlY7TUFFYyxVQUFBLEVBQVksR0FGMUI7TUFFK0IsU0FBQSxFQUFXLFFBRjFDO01BRW9ELFVBQUEsRUFBWSxzQkFGaEU7TUFHQSxJQUFBLEVBQU0sSUFBQyxDQUFBLHFCQUhQO0tBRG9CO0lBTXJCLG9CQUFBLEdBQXVCLElBQUksS0FBSixDQUN0QjtNQUFBLE1BQUEsRUFBUSxRQUFSO01BQWtCLEtBQUEsRUFBTyxHQUF6QjtNQUE4QixNQUFBLEVBQVEsUUFBUSxDQUFDLE1BQS9DO01BQXVELENBQUEsRUFBRyxLQUFLLENBQUMsTUFBaEU7TUFDQSxLQUFBLEVBQU8sSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQURmO0tBRHNCO1dBSXZCLG1CQUFBLEdBQXNCLElBQUksS0FBSixDQUNyQjtNQUFBLE1BQUEsRUFBUSxRQUFSO01BQWtCLEtBQUEsRUFBTyxHQUF6QjtNQUE4QixNQUFBLEVBQVEsUUFBUSxDQUFDLE1BQS9DO01BQXVELENBQUEsRUFBRyxLQUFLLENBQUMsS0FBaEU7TUFDQSxLQUFBLEVBQU8sSUFBQyxDQUFBLE1BQU0sQ0FBQyxtQkFBb0IsQ0FBQSxJQUFDLENBQUEsU0FBRCxDQURuQztLQURxQjtFQWJEOzswQkFzQnRCLG1CQUFBLEdBQXFCLFNBQUMsUUFBRDtXQUNwQixJQUFDLENBQUEsV0FBRCxHQUFlLElBQUksS0FBSixDQUNkO01BQUEsSUFBQSxFQUFNLFdBQU47TUFDQSxNQUFBLEVBQVEsUUFEUjtNQUNrQixLQUFBLEVBQU8sR0FEekI7TUFDOEIsTUFBQSxFQUFRLENBRHRDO01BQ3lDLENBQUEsRUFBRyxLQUFLLENBQUMsTUFEbEQ7TUFDMEQsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFOLENBQWEsQ0FBQyxDQUFkLENBRDdEO01BRUEsZUFBQSxFQUFpQixJQUFDLENBQUEsTUFBTSxDQUFDLEtBQU0sQ0FBQSxJQUFDLENBQUEsT0FBRCxDQUYvQjtNQUUwQyxZQUFBLEVBQWMsRUFGeEQ7S0FEYztFQURLOzs7O0dBdktjOzs7O0FDSnBDLElBQUEsTUFBQTtFQUFBOzs7O0FBQUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxnQkFBUjs7QUFLSCxPQUFPLENBQUM7OztFQUNBLHVCQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUzs7Ozs7Ozs7O0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLElBQUEsRUFBTSxTQUFOO01BQ0EsSUFBQSxFQUFNLElBRE47TUFHQSxlQUFBLEVBQWlCLElBSGpCO01BSUEsWUFBQSxFQUFjLEVBSmQ7TUFNQSxNQUFBLEVBQVEsTUFBTSxDQUFDLElBTmY7S0FERDtJQVNBLCtDQUFNLElBQUMsQ0FBQSxPQUFQO0lBR0EsTUFBTSxDQUFDLDhCQUFQLENBQXNDLElBQXRDO0lBRUEsSUFBQyxDQUFBLE1BQUQsR0FDQztNQUFBLFFBQUEsRUFBVTtRQUFFLEtBQUEsRUFBTyxDQUFUO09BQVY7TUFDQSxNQUFBLEVBQVE7UUFBRSxLQUFBLEVBQU8sQ0FBVDtPQURSOztFQWpCVzs7RUF5QmIsYUFBQyxDQUFBLE1BQUQsQ0FBUSxNQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDtNQUNKLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxHQUFnQjtNQUNoQixJQUFDLENBQUEsS0FBRCxHQUFTLElBQUMsQ0FBQSxJQUFJLENBQUM7TUFDZixJQUFDLENBQUEsTUFBRCxHQUFVLElBQUMsQ0FBQSxJQUFJLENBQUM7YUFDaEIsSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFOLEdBQWU7SUFKWCxDQURMO0dBREQ7O0VBUUEsYUFBQyxDQUFBLE1BQUQsQ0FBUSxRQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0dBREQ7OzBCQU9BLFVBQUEsR0FBWSxTQUFDLENBQUQsRUFBSSxDQUFKO0FBQVUsV0FBTyxNQUFNLENBQUMsS0FBUCxLQUFnQixDQUFoQixJQUFzQixNQUFNLENBQUMsTUFBUCxLQUFpQjtFQUF4RDs7MEJBQ1osUUFBQSxHQUFVLFNBQUMsQ0FBRCxFQUFJLENBQUo7QUFBVSxXQUFPLElBQUMsQ0FBQSxLQUFELEtBQVUsQ0FBVixJQUFnQixJQUFDLENBQUEsTUFBRCxLQUFXO0VBQTVDOzswQkFDVixTQUFBLEdBQVcsU0FBQyxDQUFEO0FBQU8sV0FBTyxJQUFDLENBQUEsS0FBRCxLQUFVO0VBQXhCOzswQkFFWCxPQUFBLEdBQVMsU0FBQTtXQUNSLElBQUksU0FBSixDQUFjO01BQUUsSUFBQSxFQUFTLE1BQU0sQ0FBQyxLQUFSLEdBQWMsR0FBZCxHQUFpQixNQUFNLENBQUMsTUFBbEM7TUFBNEMsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFyRDtLQUFkO0VBRFE7OzBCQUtULG9CQUFBLEdBQXNCLFNBQUE7V0FDckIsSUFBQyxDQUFBLE9BQUQsQ0FBUyxRQUFULEVBQW1CO01BQUEsS0FBQSxFQUFPLE1BQUEsQ0FBTztRQUFBLE9BQUEsRUFBUyxDQUFUO09BQVAsQ0FBUDtNQUEyQixJQUFBLEVBQU0sR0FBakM7S0FBbkI7RUFEcUI7OzBCQUd0QixrQkFBQSxHQUFvQixTQUFBO1dBQ25CLElBQUMsQ0FBQSxPQUFELENBQVMsTUFBVCxFQUFpQjtNQUFBLEtBQUEsRUFBTyxNQUFBLENBQU87UUFBQSxPQUFBLEVBQVMsQ0FBVDtPQUFQLENBQVA7TUFBMkIsSUFBQSxFQUFNLEdBQWpDO0tBQWpCO0VBRG1COzswQkFHcEIsbUJBQUEsR0FBcUIsU0FBQTtXQUNwQixJQUFDLENBQUEsV0FBRCxDQUFhLFFBQWI7RUFEb0I7OzBCQUdyQixpQkFBQSxHQUFtQixTQUFBO1dBQ2xCLElBQUMsQ0FBQSxXQUFELENBQWEsTUFBYjtFQURrQjs7OztHQTNEZ0I7Ozs7QUNMcEMsSUFBQSxhQUFBO0VBQUE7Ozs7QUFBQyxnQkFBaUIsT0FBQSxDQUFRLGVBQVI7O0FBR1osT0FBTyxDQUFDOzs7RUFDQSx1QkFBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7Ozs7Ozs7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsU0FBQSxFQUFXLE1BQVg7TUFDQSxPQUFBLEVBQVMsTUFEVDtNQUdBLE9BQUEsRUFBUyxJQUhUO01BSUEsZUFBQSxFQUFpQixLQUpqQjtNQU9BLHFCQUFBLEVBQXVCLE9BUHZCO0tBREQ7SUFXQSwrQ0FBTSxJQUFDLENBQUEsT0FBUDtFQWJZOztFQWlCYixhQUFDLENBQUEsTUFBRCxDQUFRLFdBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFULEdBQXFCO0lBQWhDLENBREw7R0FERDs7RUFJQSxhQUFDLENBQUEsTUFBRCxDQUFRLFNBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxPQUFULEdBQW1CO0lBQTlCLENBREw7R0FERDs7RUFJQSxhQUFDLENBQUEsTUFBRCxDQUFRLGlCQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsZUFBVCxHQUEyQjtJQUF0QyxDQURMO0dBREQ7O0VBSUEsYUFBQyxDQUFBLE1BQUQsQ0FBUSxTQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTtNQUFHLElBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxPQUFaO0FBQXlCLGVBQU8sRUFBaEM7T0FBQSxNQUFBO0FBQXVDLGVBQU8sRUFBOUM7O0lBQUgsQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLE9BQVQsR0FBbUI7SUFBOUIsQ0FETDtHQUREOztFQU1BLGFBQUMsQ0FBQSxNQUFELENBQVEsdUJBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxxQkFBVCxHQUFpQztJQUE1QyxDQURMO0dBREQ7OzBCQVVBLFVBQUEsR0FBWSxTQUFBO0FBQ1gsUUFBQTtJQUFBLE1BQUEsR0FBUyxJQUFJLEtBQUosQ0FDUjtNQUFBLE1BQUEsRUFBUSxJQUFSO01BQVcsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFuQjtNQUEwQixDQUFBLEVBQUcsS0FBSyxDQUFDLEdBQW5DO01BQXdDLElBQUEsRUFBTSxhQUE5QztNQUNBLE9BQUEsRUFBUyxJQUFDLENBQUEsT0FEVjtNQUNtQixlQUFBLEVBQWlCLElBRHBDO0tBRFE7SUFJVCxJQUFHLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBQSxJQUF1QixJQUFDLENBQUEsUUFBRCxDQUFVLEdBQVYsRUFBZSxHQUFmLENBQXZCLElBQThDLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBOUMsSUFBcUUsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUFyRSxJQUE0RixJQUFDLENBQUEsUUFBRCxDQUFVLEdBQVYsRUFBZSxHQUFmLENBQS9GO01BQ0MsSUFBQyxDQUFBLG9CQUFELENBQXNCLE1BQXRCO2FBQ0EsSUFBQyxDQUFBLG1CQUFELENBQXFCLElBQUksS0FBSixDQUNwQjtRQUFBLE1BQUEsRUFBUSxJQUFSO1FBQVcsS0FBQSxFQUFPLElBQUMsQ0FBQSxLQUFuQjtRQUEwQixNQUFBLEVBQVEsRUFBbEM7UUFBc0MsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUEvQztRQUF1RCxJQUFBLEVBQU0sV0FBN0Q7UUFBMEUsT0FBQSxFQUFTLElBQUMsQ0FBQSxPQUFwRjtRQUE2RixlQUFBLEVBQWlCLElBQTlHO09BRG9CLENBQXJCLEVBRkQ7S0FBQSxNQUtLLElBQUcsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUFBLElBQXVCLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBdkIsSUFBOEMsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUFqRDthQUNKLElBQUMsQ0FBQSxzQkFBRCxDQUF3QixNQUF4QixFQURJO0tBQUEsTUFHQSxJQUFHLElBQUMsQ0FBQSxlQUFKO2FBQ0osSUFBQyxDQUFBLDZCQUFELENBQStCLE1BQS9CLEVBREk7S0FBQSxNQUFBO2FBR0EsSUFBQyxDQUFBLHNCQUFELENBQXdCLE1BQXhCLEVBSEE7O0VBYk07OzBCQXdCWixzQkFBQSxHQUF3QixTQUFDLFFBQUQ7QUFDdkIsUUFBQTtJQUFBLFFBQVEsQ0FBQyxNQUFULEdBQWtCO0lBRWxCLHNCQUFBLEdBQXlCLElBQUksU0FBSixDQUN4QjtNQUFBLE1BQUEsRUFBUSxRQUFSO01BQWtCLEtBQUEsRUFBTyxFQUF6QjtNQUE2QixNQUFBLEVBQVEsRUFBckM7TUFBeUMsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQUFOLENBQVcsQ0FBWCxDQUE1QztNQUEyRCxDQUFBLEVBQUcsS0FBSyxDQUFDLEdBQU4sQ0FBVSxDQUFBLEdBQUksQ0FBZCxDQUE5RDtNQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsTUFBTSxDQUFDLEtBQU0sQ0FBQSxJQUFDLENBQUEsU0FBRCxDQURyQjtNQUNrQyxlQUFBLEVBQWlCLElBRG5EO01BRUEsUUFBQSxFQUFVLEVBRlY7TUFFYyxVQUFBLEVBQVksR0FGMUI7TUFFK0IsU0FBQSxFQUFXLFFBRjFDO01BRW9ELFVBQUEsRUFBWSxzQkFGaEU7TUFHQSxJQUFBLEVBQU0sSUFBQyxDQUFBLHFCQUhQO0tBRHdCO1dBTXpCLG9CQUFBLEdBQXVCLElBQUksS0FBSixDQUN0QjtNQUFBLE1BQUEsRUFBUSxRQUFSO01BQWtCLEtBQUEsRUFBTyxHQUF6QjtNQUE4QixNQUFBLEVBQVEsRUFBdEM7TUFBMEMsQ0FBQSxFQUFHLEtBQUssQ0FBQyxLQUFOLENBQVksQ0FBQyxDQUFiLENBQTdDO01BQThELENBQUEsRUFBRyxLQUFLLENBQUMsR0FBTixDQUFVLENBQVYsQ0FBakU7TUFDQSxLQUFBLEVBQU8sSUFBQyxDQUFBLE1BQU0sQ0FBQywwQkFBMkIsQ0FBQSxJQUFDLENBQUEsU0FBRCxDQUQxQztLQURzQjtFQVRBOzswQkFjeEIsNkJBQUEsR0FBK0IsU0FBQyxRQUFEO0FBQzlCLFFBQUE7SUFBQSxRQUFRLENBQUMsTUFBVCxHQUFrQjtJQUVsQixzQkFBQSxHQUF5QixJQUFJLFNBQUosQ0FDeEI7TUFBQSxNQUFBLEVBQVEsUUFBUjtNQUFrQixLQUFBLEVBQU8sRUFBekI7TUFBNkIsTUFBQSxFQUFRLEVBQXJDO01BQXlDLENBQUEsRUFBRyxLQUFLLENBQUMsSUFBbEQ7TUFBd0QsQ0FBQSxFQUFHLEtBQUssQ0FBQyxHQUFOLENBQVUsQ0FBVixDQUEzRDtNQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsTUFBTSxDQUFDLEtBQU0sQ0FBQSxJQUFDLENBQUEsU0FBRCxDQURyQjtNQUNrQyxlQUFBLEVBQWlCLElBRG5EO01BRUEsUUFBQSxFQUFVLEVBRlY7TUFFYyxVQUFBLEVBQVksR0FGMUI7TUFFK0IsU0FBQSxFQUFXLFFBRjFDO01BRW9ELFVBQUEsRUFBWSxzQkFGaEU7TUFHQSxJQUFBLEVBQU0sSUFBQyxDQUFBLHFCQUhQO0tBRHdCO1dBTXpCLG9CQUFBLEdBQXVCLElBQUksS0FBSixDQUN0QjtNQUFBLE1BQUEsRUFBUSxRQUFSO01BQWtCLEtBQUEsRUFBTyxHQUF6QjtNQUE4QixNQUFBLEVBQVEsRUFBdEM7TUFBMEMsQ0FBQSxFQUFHLEtBQUssQ0FBQyxLQUFuRDtNQUEwRCxDQUFBLEVBQUcsS0FBSyxDQUFDLEdBQU4sQ0FBQSxDQUE3RDtNQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsTUFBTSxDQUFDLDBCQUEyQixDQUFBLElBQUMsQ0FBQSxTQUFELENBRDFDO0tBRHNCO0VBVE87OzBCQWlCL0Isc0JBQUEsR0FBd0IsU0FBQyxRQUFEO0FBQ3ZCLFFBQUE7SUFBQSxRQUFRLENBQUMsTUFBVCxHQUFrQjtJQUVsQixvQkFBQSxHQUF1QixJQUFJLEtBQUosQ0FDdEI7TUFBQSxNQUFBLEVBQVEsUUFBUjtNQUFrQixLQUFBLEVBQU8sR0FBekI7TUFBOEIsTUFBQSxFQUFRLFFBQVEsQ0FBQyxNQUEvQztNQUF1RCxDQUFBLEVBQUcsS0FBSyxDQUFDLElBQWhFO01BQ0EsS0FBQSxFQUFPLElBQUMsQ0FBQSxNQUFNLENBQUMscUJBQXNCLENBQUEsSUFBQyxDQUFBLFNBQUQsQ0FEckM7S0FEc0I7SUFJdkIsc0JBQUEsR0FBeUIsSUFBSSxTQUFKLENBQ3hCO01BQUEsTUFBQSxFQUFRLFFBQVI7TUFBa0IsS0FBQSxFQUFPLEVBQXpCO01BQTZCLE1BQUEsRUFBUSxFQUFyQztNQUF5QyxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQWxEO01BQTBELENBQUEsRUFBRyxLQUFLLENBQUMsTUFBbkU7TUFDQSxLQUFBLEVBQU8sSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFNLENBQUEsSUFBQyxDQUFBLFNBQUQsQ0FEckI7TUFDa0MsZUFBQSxFQUFpQixJQURuRDtNQUVBLFFBQUEsRUFBVSxFQUZWO01BRWMsVUFBQSxFQUFZLEdBRjFCO01BRStCLFNBQUEsRUFBVyxRQUYxQztNQUVvRCxVQUFBLEVBQVksc0JBRmhFO01BR0EsSUFBQSxFQUFNLElBQUMsQ0FBQSxxQkFIUDtLQUR3QjtXQU16QixvQkFBQSxHQUF1QixJQUFJLEtBQUosQ0FDdEI7TUFBQSxNQUFBLEVBQVEsUUFBUjtNQUFrQixLQUFBLEVBQU8sR0FBekI7TUFBOEIsTUFBQSxFQUFRLFFBQVEsQ0FBQyxNQUEvQztNQUF1RCxDQUFBLEVBQUcsS0FBSyxDQUFDLEtBQWhFO01BQ0EsS0FBQSxFQUFPLElBQUMsQ0FBQSxNQUFNLENBQUMsc0JBQXVCLENBQUEsSUFBQyxDQUFBLFNBQUQsQ0FEdEM7S0FEc0I7RUFiQTs7MEJBa0J4QixvQkFBQSxHQUFzQixTQUFDLFFBQUQ7QUFDckIsUUFBQTtJQUFBLFFBQVEsQ0FBQyxNQUFULEdBQWtCO0lBRWxCLGtCQUFBLEdBQXFCLElBQUksU0FBSixDQUNwQjtNQUFBLE1BQUEsRUFBUSxRQUFSO01BQWtCLEtBQUEsRUFBTyxFQUF6QjtNQUE2QixNQUFBLEVBQVEsRUFBckM7TUFBeUMsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQUFOLENBQVcsRUFBWCxDQUE1QztNQUE0RCxDQUFBLEVBQUcsS0FBSyxDQUFDLEdBQU4sQ0FBVSxFQUFWLENBQS9EO01BQ0EsS0FBQSxFQUFPLElBQUMsQ0FBQSxNQUFNLENBQUMsS0FBTSxDQUFBLElBQUMsQ0FBQSxTQUFELENBRHJCO01BQ2tDLGVBQUEsRUFBaUIsSUFEbkQ7TUFDeUQsYUFBQSxFQUFlLENBQUMsSUFEekU7TUFFQSxRQUFBLEVBQVUsRUFGVjtNQUVjLFVBQUEsRUFBWSxHQUYxQjtNQUUrQixTQUFBLEVBQVcsUUFGMUM7TUFFb0QsVUFBQSxFQUFZLHNCQUZoRTtNQUdBLElBQUEsRUFBTSxJQUFDLENBQUEscUJBSFA7S0FEb0I7SUFNckIsb0JBQUEsR0FBdUIsSUFBSSxLQUFKLENBQ3RCO01BQUEsTUFBQSxFQUFRLFFBQVI7TUFBa0IsS0FBQSxFQUFPLEdBQXpCO01BQThCLE1BQUEsRUFBUSxRQUFRLENBQUMsTUFBL0M7TUFBdUQsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFoRTtNQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsTUFBTSxDQUFDLEtBRGY7S0FEc0I7V0FJdkIsbUJBQUEsR0FBc0IsSUFBSSxLQUFKLENBQ3JCO01BQUEsTUFBQSxFQUFRLFFBQVI7TUFBa0IsS0FBQSxFQUFPLEdBQXpCO01BQThCLE1BQUEsRUFBUSxRQUFRLENBQUMsTUFBL0M7TUFBdUQsQ0FBQSxFQUFHLEtBQUssQ0FBQyxLQUFoRTtNQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsTUFBTSxDQUFDLG1CQUFvQixDQUFBLElBQUMsQ0FBQSxTQUFELENBRG5DO0tBRHFCO0VBYkQ7OzBCQXNCdEIsbUJBQUEsR0FBcUIsU0FBQyxRQUFEO0FBQ3BCLFFBQUE7V0FBQSxhQUFBLEdBQWdCLElBQUksS0FBSixDQUNmO01BQUEsTUFBQSxFQUFRLFFBQVI7TUFBa0IsS0FBQSxFQUFPLEdBQXpCO01BQThCLE1BQUEsRUFBUSxDQUF0QztNQUF5QyxDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQWxEO01BQTBELENBQUEsRUFBRyxLQUFLLENBQUMsTUFBTixDQUFhLENBQUMsQ0FBZCxDQUE3RDtNQUNBLGVBQUEsRUFBaUIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFNLENBQUEsSUFBQyxDQUFBLE9BQUQsQ0FEL0I7TUFDMEMsWUFBQSxFQUFjLEVBRHhEO0tBRGU7RUFESTs7OztHQTdJYzs7OztBQ0hwQyxJQUFBLGFBQUE7RUFBQTs7OztBQUFDLGdCQUFpQixPQUFBLENBQVEsZUFBUjs7QUFHWixPQUFPLENBQUM7OztFQUNBLHdCQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUzs7Ozs7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsVUFBQSxFQUFZLElBQVo7TUFDQSxVQUFBLEVBQVksS0FEWjtLQUREO0lBSUEsZ0RBQU0sSUFBQyxDQUFBLE9BQVA7SUFFQSxJQUFDLENBQUEsVUFBRCxHQUFjLElBQUksS0FBSixDQUNiO01BQUEsZUFBQSxFQUFpQixLQUFqQjtNQUNBLFlBQUEsRUFBYyxJQUFDLENBQUEsWUFBRCxHQUFnQixFQUQ5QjtNQUVBLE9BQUEsRUFBUyxDQUZUO0tBRGE7SUFLZCxJQUFDLENBQUEsVUFBVSxDQUFDLFVBQVosQ0FBQTtJQUdBLElBQUMsQ0FBQSxpQkFBRCxDQUFBO0lBQ0EsSUFBQyxDQUFBLGdCQUFELENBQUE7SUFFQSxJQUFDLENBQUEsRUFBRCxDQUFJLGFBQUosRUFBbUIsU0FBQTthQUNsQixJQUFDLENBQUEsZ0JBQUQsQ0FBQTtJQURrQixDQUFuQjtJQUdBLElBQUMsQ0FBQSxFQUFELENBQUksY0FBSixFQUFvQixTQUFBO2FBQ25CLElBQUMsQ0FBQSxnQkFBRCxDQUFBO0lBRG1CLENBQXBCO0lBR0EsSUFBQyxDQUFBLEVBQUQsQ0FBSSxVQUFKLEVBQWdCLFNBQUE7YUFDZixJQUFDLENBQUEsZ0JBQUQsQ0FBQTtJQURlLENBQWhCO0lBR0EsSUFBQyxDQUFBLEVBQUQsQ0FBSSxVQUFKLEVBQWdCLFNBQUE7YUFDZixJQUFDLENBQUEsZ0JBQUQsQ0FBQTtJQURlLENBQWhCO0VBNUJZOztFQWlDYixjQUFDLENBQUEsTUFBRCxDQUFRLFlBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxVQUFULEdBQXNCO0lBQWpDLENBREw7R0FERDs7RUFJQSxjQUFDLENBQUEsTUFBRCxDQUFRLFlBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxVQUFULEdBQXNCO0lBQWpDLENBREw7R0FERDs7MkJBT0EsY0FBQSxHQUFnQixTQUFBO1dBQ2YsSUFBQyxDQUFBLFVBQVUsQ0FBQyxPQUFaLEdBQXNCO0VBRFA7OzJCQUdoQixjQUFBLEdBQWdCLFNBQUE7V0FDZixJQUFDLENBQUEsWUFBWSxDQUFDLE9BQWQsR0FBd0I7RUFEVDs7MkJBR2hCLGdCQUFBLEdBQWtCLFNBQUE7QUFDakIsUUFBQTtJQUFBLE1BQUEsR0FBUztJQUlULElBQUMsQ0FBQSxVQUFVLENBQUMsS0FBWixHQUFvQixJQUFDLENBQUEsS0FBRCxHQUFTLE1BQUEsR0FBUztJQUN0QyxJQUFDLENBQUEsVUFBVSxDQUFDLE1BQVosR0FBcUIsSUFBQyxDQUFBLE1BQUQsR0FBVSxNQUFBLEdBQVM7SUFDeEMsSUFBQyxDQUFBLFVBQVUsQ0FBQyxDQUFaLEdBQWdCLEtBQUssQ0FBQyxNQUFOLENBQUE7SUFDaEIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxDQUFaLEdBQWdCLEtBQUssQ0FBQyxNQUFOLENBQUE7V0FDaEIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxLQUFaLEdBQW9CLElBQUMsQ0FBQTtFQVRKOzsyQkFZbEIsaUJBQUEsR0FBbUIsU0FBQTtBQUNsQixRQUFBO0lBQUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBdEIsQ0FBMEIsa0JBQTFCO0lBRUEsR0FBQSxHQUFNO1dBdUJOLEtBQUssQ0FBQyxTQUFOLENBQWdCLEdBQWhCO0VBMUJrQjs7OztHQS9EaUI7Ozs7QUNKckMsSUFBQSx3QkFBQTtFQUFBOzs7O0FBQUMsWUFBYSxPQUFBLENBQVEsbUJBQVI7O0FBQ2IsZ0JBQWlCLE9BQUEsQ0FBUSxlQUFSOztBQUdaLE9BQU8sQ0FBQzs7O0VBQ0EsdUJBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTOzs7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUVBLCtDQUFNLElBQUMsQ0FBQSxPQUFQLENBRkE7RUFGWTs7MEJBVWIsZ0JBQUEsR0FBa0IsU0FBQTtBQUVqQixRQUFBO0lBQUEsZUFBQSxHQUFrQixTQUFBO2FBQ2pCLE1BQU0sQ0FBQyxRQUFQLEdBQWtCO0lBREQ7V0FHbEIsVUFBQSxHQUFhLElBQUksU0FBSixDQUNaO01BQUEsS0FBQSxFQUFPLEVBQVA7TUFBVyxNQUFBLEVBQVEsRUFBbkI7TUFDQSxDQUFBLEVBQUcsS0FBSyxDQUFDLElBQU4sQ0FBVyxFQUFYLENBREg7TUFDbUIsQ0FBQSxFQUFHLEtBQUssQ0FBQyxHQUFOLENBQVUsRUFBVixDQUR0QjtNQUVBLE9BQUEsRUFBUyxlQUZUO0tBRFk7RUFMSTs7MEJBWWxCLGlCQUFBLEdBQW1CLFNBQUMsUUFBRDtBQUVsQixRQUFBO0lBQUEsV0FBQSxHQUFjLElBQUksS0FBSixDQUNiO01BQUEsSUFBQSxFQUFNLEVBQU47TUFBVSxZQUFBLEVBQWMsRUFBeEI7TUFDQSxDQUFBLEVBQUcsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFDLEVBQWIsQ0FESDtNQUNxQixDQUFBLEVBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxDQUFDLEVBQWQsQ0FEeEI7TUFFQSxlQUFBLEVBQWlCLHdCQUZqQjtNQUdBLFdBQUEsRUFBYSxDQUhiO01BSUEsTUFBQSxFQUNDO1FBQUEsT0FBQSxFQUFTLElBQVQ7T0FMRDtLQURhO0lBUWQsV0FBVyxDQUFDLEtBQVosR0FBb0I7TUFBQSxNQUFBLEVBQVEsU0FBUjs7SUFFcEIsV0FBVyxDQUFDLE1BQVosR0FDQztNQUFBLFFBQUEsRUFBVTtRQUFFLFdBQUEsRUFBYSx3QkFBZjtPQUFWO01BQ0EsTUFBQSxFQUFRO1FBQUUsV0FBQSxFQUFhLHdCQUFmO09BRFI7O0lBRUQsV0FBVyxDQUFDLFdBQVosQ0FBd0IsUUFBeEI7SUFFQSxpQkFBQSxHQUFvQixJQUFJLEtBQUosQ0FDbkI7TUFBQSxNQUFBLEVBQVEsV0FBUjtNQUNBLFdBQUEsRUFBYSxDQURiO01BRUEsSUFBQSxFQUFNLEVBRk47TUFFVSxZQUFBLEVBQWMsRUFGeEI7TUFHQSxDQUFBLEVBQUcsRUFISDtNQUdPLENBQUEsRUFBRyxFQUhWO01BSUEsZUFBQSxFQUFpQixJQUpqQjtLQURtQjtJQVFwQixpQkFBaUIsQ0FBQyxNQUFsQixHQUNDO01BQUEsUUFBQSxFQUFVO1FBQUUsV0FBQSxFQUFhLHdCQUFmO09BQVY7TUFDQSxNQUFBLEVBQVE7UUFBRSxXQUFBLEVBQWEsd0JBQWY7T0FEUjs7SUFFRCxpQkFBaUIsQ0FBQyxXQUFsQixDQUE4QixRQUE5QjtJQUVBLFdBQVcsQ0FBQyxLQUFaLENBQWtCLFNBQUE7QUFDakIsVUFBQTtNQUFBLElBQUcsSUFBQyxDQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBaEIsS0FBd0IsTUFBM0I7UUFBdUMsU0FBQSxHQUFZLFNBQW5EO09BQUEsTUFBQTtRQUFpRSxTQUFBLEdBQVksT0FBN0U7O01BQ0EsSUFBQyxDQUFBLFdBQUQsQ0FBYSxTQUFiO01BQ0EsSUFBQyxDQUFBLFFBQVMsQ0FBQSxDQUFBLENBQUUsQ0FBQyxXQUFiLENBQXlCLFNBQXpCO2FBQ0EsSUFBQyxDQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBaEIsQ0FBd0IsU0FBeEIsRUFBbUM7UUFBQSxLQUFBLEVBQU8sTUFBQSxDQUFPO1VBQUEsT0FBQSxFQUFTLENBQVQ7U0FBUCxDQUFQO1FBQTJCLElBQUEsRUFBTSxHQUFqQztPQUFuQztJQUppQixDQUFsQjtJQU1BLG9CQUFBLEdBQXVCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQyxXQUFEO0FBQ3RCLFlBQUE7UUFBQSxXQUFBLEdBQWM7UUFFZCxNQUFNLENBQUMsRUFBUCxDQUFVLGVBQVYsRUFBMkIsU0FBQTtpQkFDMUIsV0FBVyxDQUFDLENBQVosR0FBZ0IsS0FBSyxDQUFDLEtBQU4sQ0FBWSxDQUFDLEVBQWI7UUFEVSxDQUEzQjtlQUdBLE1BQU0sQ0FBQyxFQUFQLENBQVUsY0FBVixFQUEwQixTQUFBO2lCQUN6QixXQUFXLENBQUMsQ0FBWixHQUFnQixLQUFLLENBQUMsTUFBTixDQUFhLENBQUMsRUFBZDtRQURTLENBQTFCO01BTnNCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQTtXQVN2QixvQkFBQSxDQUFxQixXQUFyQjtFQTdDa0I7Ozs7R0F2QmdCOzs7O0FDSHBDLElBQUEsY0FBQTtFQUFBOzs7O0FBQUMsaUJBQWtCLE9BQUEsQ0FBUSxnQkFBUjs7QUFHYixPQUFPLENBQUM7OztFQUNBLHVCQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUzs7Ozs7Ozs7O0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFFQSwrQ0FBTSxJQUFDLENBQUEsT0FBUCxDQUZBO0lBSUEsSUFBQyxDQUFBLFlBQUQsQ0FBQTtFQU5ZOzswQkFZYixZQUFBLEdBQWMsU0FBQTtJQUNiLElBQUcsS0FBSyxDQUFDLFFBQU4sQ0FBQSxDQUFIO2FBQ0MsSUFBQyxDQUFBLGFBQUQsQ0FBQSxFQUREO0tBQUEsTUFBQTtNQUdDLElBQUMsQ0FBQSxnQkFBRCxDQUFBO01BQ0EsSUFBQyxDQUFBLG1CQUFELENBQUE7TUFDQSxJQUFDLENBQUEsY0FBRCxDQUFBO2FBQ0EsSUFBQyxDQUFBLHFCQUFELENBQUEsRUFORDs7RUFEYTs7MEJBWWQsZ0JBQUEsR0FBa0IsU0FBQTtBQUNqQixRQUFBO0lBQUEsTUFBQSxHQUFTLENBQUMsTUFBTSxDQUFDLEtBQVAsR0FBZSxHQUFoQixDQUFBLEdBQXVCLElBQUMsQ0FBQTtJQUNqQyxNQUFBLEdBQVMsQ0FBQyxNQUFNLENBQUMsTUFBUCxHQUFnQixHQUFqQixDQUFBLEdBQXdCLElBQUMsQ0FBQTtXQUNsQyxJQUFDLENBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFiLEdBQXFCLElBQUksQ0FBQyxHQUFMLENBQVMsTUFBVCxFQUFpQixNQUFqQjtFQUhKOzswQkFTbEIsbUJBQUEsR0FBcUIsU0FBQyxRQUFEO0FBRXBCLFFBQUE7O01BRnFCLFdBQVc7O0lBRWhDLFNBQUEsR0FBWSxJQUFDLENBQUEsZUFBRCxDQUFpQixPQUFqQixFQUEwQjtNQUFDO1FBQUUsS0FBQSxFQUFPLE1BQVQ7UUFBaUIsTUFBQSxFQUFRLE1BQXpCO09BQUQsRUFDNUI7UUFBRSxLQUFBLEVBQU8sUUFBVDtRQUFtQixNQUFBLEVBQVEsUUFBM0I7T0FENEIsRUFFNUI7UUFBRSxLQUFBLEVBQU8sTUFBVDtRQUFpQixNQUFBLEVBQVEsTUFBekI7T0FGNEI7S0FBMUIsRUFFa0MsUUFGbEM7SUFJWixnQkFBQSxHQUFtQixJQUFDLENBQUEsZUFBRCxDQUFpQixRQUFqQixFQUEyQjtNQUFDO1FBQUUsS0FBQSxFQUFPLE9BQVQ7UUFBa0IsTUFBQSxFQUFRLEtBQTFCO09BQUQsRUFDbEM7UUFBRSxLQUFBLEVBQU8sS0FBVDtRQUFnQixNQUFBLEVBQVEsS0FBeEI7T0FEa0M7S0FBM0IsRUFDMkIsSUFEM0I7SUFHbkIsY0FBQSxHQUFpQixJQUFDLENBQUEsZUFBRCxDQUFpQixNQUFqQixFQUF5QjtNQUFDO1FBQUUsS0FBQSxFQUFPLE9BQVQ7UUFBa0IsTUFBQSxFQUFRLEtBQTFCO09BQUQsRUFDL0I7UUFBRSxLQUFBLEVBQU8sS0FBVDtRQUFnQixNQUFBLEVBQVEsS0FBeEI7T0FEK0I7S0FBekIsRUFDNEIsSUFENUI7SUFHakIsZ0JBQUEsR0FBbUIsSUFBQyxDQUFBLGVBQUQsQ0FBaUIsUUFBakIsRUFBMkI7TUFBQztRQUFFLEtBQUEsRUFBTyxPQUFUO1FBQWtCLE1BQUEsRUFBUSxLQUExQjtPQUFELEVBQ25DO1FBQUUsS0FBQSxFQUFPLE1BQVQ7UUFBaUIsTUFBQSxFQUFRLElBQXpCO09BRG1DO0tBQTNCLEVBQzBCLEtBRDFCO0lBR25CLElBQUcsY0FBSDtNQUF1QixJQUFDLENBQUEsZ0JBQUQsQ0FBQSxFQUF2Qjs7SUFDQSxJQUFHLGdCQUFIO01BQXlCLElBQUMsQ0FBQSxpQkFBRCxDQUFtQixTQUFuQixFQUF6Qjs7SUFDQSxJQUFHLGdCQUFIO01BQXlCLElBQUMsQ0FBQSxjQUFELENBQUEsRUFBekI7S0FBQSxNQUFBO01BQWdELElBQUMsQ0FBQSxjQUFELENBQUEsRUFBaEQ7O1dBQ0EsSUFBQyxDQUFBLFdBQUQsQ0FBYSxTQUFiO0VBbEJvQjs7MEJBc0JyQixjQUFBLEdBQWdCLFNBQUE7SUFDZixNQUFNLENBQUMsZUFBUCxHQUF5QjtJQUN6QixJQUFDLENBQUEsVUFBRCxDQUFBO0lBQ0EsSUFBQyxDQUFBLE1BQUQsQ0FBQTtXQUNBLElBQUMsQ0FBQSxJQUFELEdBQVE7RUFKTzs7MEJBT2hCLHFCQUFBLEdBQXVCLFNBQUE7QUFDdEIsUUFBQTtJQUFBLFlBQUEsR0FBZTtJQUVmLE1BQU0sQ0FBQyxFQUFQLENBQVUsZUFBVixFQUEyQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7UUFDMUIsWUFBWSxDQUFDLENBQWIsR0FBaUIsS0FBSyxDQUFDO2VBQ3ZCLFlBQVksQ0FBQyxnQkFBYixDQUFBO01BRjBCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUEzQjtXQUlBLE1BQU0sQ0FBQyxFQUFQLENBQVUsY0FBVixFQUEwQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7UUFDekIsWUFBWSxDQUFDLENBQWIsR0FBaUIsS0FBSyxDQUFDO2VBQ3ZCLFlBQVksQ0FBQyxnQkFBYixDQUFBO01BRnlCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUExQjtFQVBzQjs7MEJBaUJ2QixhQUFBLEdBQWUsU0FBQTtBQUNkLFFBQUE7SUFBQSxhQUFBLEdBQWdCLElBQUksZUFBSixDQUNmO01BQUEsZUFBQSxFQUFpQixLQUFqQjtNQUF3QixJQUFBLEVBQU0sc0JBQTlCO0tBRGU7SUFHaEIsSUFBQyxDQUFBLElBQUQsR0FBUTtJQUNSLElBQUMsQ0FBQSxNQUFELENBQUE7SUFDQSxJQUFDLENBQUEsT0FBRCxHQUFXO0lBQ1gsSUFBQyxDQUFBLE9BQUQsR0FBVztJQUtYLElBQUcsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUFBLElBQXVCLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBdkIsSUFBOEMsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUE5QyxJQUFxRSxJQUFDLENBQUEsUUFBRCxDQUFVLEdBQVYsRUFBZSxHQUFmLENBQXJFLElBQTRGLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBNUYsSUFBbUgsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUF0SDthQUNDLElBQUMsQ0FBQSxLQUFELEdBQVMsTUFBTSxDQUFDLEtBQVAsR0FBZSxJQUFDLENBQUEsTUFEMUI7S0FBQSxNQUFBO2FBR0MsSUFBQyxDQUFBLGdCQUFELENBQUEsRUFIRDs7RUFaYzs7MEJBbUJmLGdCQUFBLEdBQWtCLFNBQUE7QUFDakIsUUFBQTtJQUFBLElBQUMsQ0FBQSxDQUFELEdBQUssS0FBSyxDQUFDO0lBQ1gsSUFBQyxDQUFBLE9BQUQsR0FBVztJQUVYLElBQUMsQ0FBQSxLQUFELEdBQVMsQ0FBQyxNQUFNLENBQUMsTUFBUCxHQUFnQixHQUFqQixDQUFBLEdBQXdCLElBQUMsQ0FBQTtJQUNsQyxJQUFDLENBQUEsWUFBRCxHQUFnQjtJQUNoQixJQUFDLENBQUEsSUFBRCxHQUFRO1dBRVIsR0FBQSxHQUFNLElBQUksS0FBSixDQUNMO01BQUEsS0FBQSxFQUFPLEdBQVA7TUFBWSxNQUFBLEVBQVEsRUFBcEI7TUFDQSxLQUFBLEVBQU8sSUFBQyxDQUFBLE1BQU0sQ0FBQyxHQURmO01BRUEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUZUO01BRWlCLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBTixDQUFhLENBQUMsRUFBZCxDQUZwQjtNQUdBLE9BQUEsRUFBUyxHQUhUO0tBREs7RUFSVzs7MEJBa0JsQixlQUFBLEdBQWlCLFNBQUMsUUFBRCxFQUFxQixVQUFyQixFQUFzQyxhQUF0QztBQUNoQixRQUFBOztNQURpQixXQUFXOzs7TUFBUyxhQUFhOzs7TUFBSSxnQkFBZ0I7O0lBQ3RFLE1BQUEsR0FBUztBQUVUO0FBQUEsU0FBQSxxQ0FBQTs7TUFDQyxZQUFBLEdBQWUsSUFBSSxDQUFDLEtBQUwsQ0FBVyxHQUFYO01BQ2YsT0FBQSxHQUFVLFlBQWEsQ0FBQSxDQUFBO01BQ3ZCLFNBQUEsR0FBWSxZQUFhLENBQUEsQ0FBQTtNQUV6QixJQUFHLE9BQUEsS0FBVyxRQUFkO0FBQ0MsYUFBQSw4Q0FBQTs7VUFDQyxJQUFHLFNBQUEsS0FBYSxJQUFJLENBQUMsS0FBckI7WUFFQyxNQUFBLEdBQVMsSUFBSSxDQUFDLE9BRmY7O0FBREQsU0FERDs7QUFMRDtBQWFBLFdBQU87RUFoQlM7Ozs7R0FySGtCOzs7O0FDSHBDLElBQUEsYUFBQTtFQUFBOzs7O0FBQUMsZ0JBQWlCLE9BQUEsQ0FBUSxlQUFSOztBQUdaLE9BQU8sQ0FBQzs7O0VBQ0EsdUJBQUMsT0FBRDtBQUVaLFFBQUE7SUFGYSxJQUFDLENBQUEsNEJBQUQsVUFBUzs7OztJQUV0QixpQkFBQSxHQUFvQixJQUFJLEtBQUosQ0FDbkI7TUFBQSxLQUFBLEVBQU8sR0FBUDtNQUFZLE1BQUEsRUFBUSxJQUFwQjtNQUNBLENBQUEsRUFBRyxFQURIO01BQ08sQ0FBQSxFQUFHLEVBRFY7TUFFQSxlQUFBLEVBQWlCLElBRmpCO0tBRG1CO0lBS3BCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLFlBQUEsRUFBYyxpQkFBZDtLQUREO0lBR0EsK0NBQU0sSUFBQyxDQUFBLE9BQVA7SUFFQSxpQkFBaUIsQ0FBQyxNQUFsQixHQUEyQixJQUFDLENBQUE7RUFaaEI7O0VBZWIsYUFBQyxDQUFBLE1BQUQsQ0FBUSxjQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsWUFBVCxHQUF3QjtJQUFuQyxDQURMO0dBREQ7OzBCQUlBLFVBQUEsR0FBWSxTQUFDLEtBQUQsRUFBUSxXQUFSO0FBQ1gsUUFBQTs7TUFEbUIsY0FBYzs7SUFDakMsSUFBRyxLQUFLLENBQUMsUUFBTixDQUFBLENBQUg7QUFBQTtLQUFBLE1BQUE7TUFFQyxXQUFBLEdBQWMsSUFBSSxLQUFKLENBQ2I7UUFBQSxLQUFBLEVBQU8sR0FBUDtRQUNBLE1BQUEsRUFBUSxHQURSO1FBRUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxZQUZUO1FBR0EsZUFBQSxFQUFpQixJQUhqQjtPQURhO01BTWQsV0FBVyxDQUFDLENBQVosR0FBZ0IsQ0FBQyxJQUFDLENBQUEsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUF2QixHQUFnQyxDQUFqQyxDQUFBLEdBQXNDO01BRXRELElBQUMsQ0FBQSxlQUFELENBQWlCLEtBQWpCLENBQXVCLENBQUMsTUFBeEIsR0FBaUM7TUFFakMsSUFBQSxHQUFPO0FBQ1A7V0FBQSw2REFBQTs7UUFDQyxhQUFBLEdBQWdCLElBQUMsQ0FBQSxnQkFBRCxDQUFrQixVQUFsQjtRQUNoQixhQUFhLENBQUMsTUFBZCxHQUF1QjtRQUN2QixhQUFhLENBQUMsQ0FBZCxHQUFrQjtxQkFDbEIsSUFBQSxJQUFRLGFBQWEsQ0FBQyxLQUFkLEdBQXNCO0FBSi9CO3FCQWJEOztFQURXOzswQkF3QlosZ0JBQUEsR0FBa0IsU0FBQyxVQUFELEVBQWEsRUFBYixFQUFxQixFQUFyQjtBQUNqQixRQUFBOztNQUQ4QixLQUFLOzs7TUFBRyxLQUFLOztJQUMzQyxXQUFBLEdBQWMsSUFBSSxTQUFKLENBQ2I7TUFBQSxJQUFBLEVBQU0sVUFBVSxDQUFDLEtBQWpCO01BQ0EsQ0FBQSxFQUFHLEVBREg7TUFFQSxPQUFBLEVBQVM7UUFBRSxHQUFBLEVBQUssRUFBUDtRQUFXLE1BQUEsRUFBUSxFQUFBLEdBQUssQ0FBeEI7UUFBMkIsSUFBQSxFQUFNLEVBQWpDO1FBQXFDLEtBQUEsRUFBTyxFQUE1QztPQUZUO01BR0EsUUFBQSxFQUFVLEVBSFY7TUFJQSxVQUFBLEVBQVksR0FKWjtNQUtBLEtBQUEsRUFBTyxPQUxQO01BTUEsZUFBQSxFQUFpQixpQkFOakI7TUFPQSxZQUFBLEVBQWMsQ0FQZDtLQURhO0lBVWQsV0FBVyxDQUFDLEVBQVosQ0FBZSxNQUFNLENBQUMsR0FBdEIsRUFBMkIsVUFBVSxDQUFDLE9BQXRDO0FBQ0EsV0FBTztFQVpVOzswQkFlbEIsZUFBQSxHQUFpQixTQUFDLEtBQUQ7O01BQUMsUUFBUTs7QUFDekIsV0FBTyxJQUFJLFNBQUosQ0FDTjtNQUFBLElBQUEsRUFBTSxLQUFOO01BQ0EsUUFBQSxFQUFVLEVBRFY7TUFFQSxVQUFBLEVBQVksR0FGWjtNQUdBLEtBQUEsRUFBTyxPQUhQO01BSUEsT0FBQSxFQUFTLEdBSlQ7TUFLQSxPQUFBLEVBQ0M7UUFBQSxHQUFBLEVBQUssRUFBTDtPQU5EO0tBRE07RUFEUzs7OztHQTNEa0I7Ozs7QUNIcEMsSUFBQSxhQUFBO0VBQUE7Ozs7QUFBQyxnQkFBaUIsT0FBQSxDQUFRLGVBQVI7O0FBR1osT0FBTyxDQUFDOzs7RUFDQSx1QkFBQyxPQUFEO0FBRVosUUFBQTtJQUZhLElBQUMsQ0FBQSw0QkFBRCxVQUFTOzs7SUFFdEIsYUFBQSxHQUFnQixJQUFJLGVBQUosQ0FDZjtNQUFBLEtBQUEsRUFBTyxHQUFQO01BQ0EsTUFBQSxFQUFRLENBRFI7TUFFQSxjQUFBLEVBQWdCLElBRmhCO01BR0EsZ0JBQUEsRUFBa0IsS0FIbEI7TUFJQSxpQkFBQSxFQUFtQixJQUpuQjtNQUtBLGVBQUEsRUFBaUIsTUFMakI7S0FEZTtJQVFoQixhQUFhLENBQUMsT0FBTyxDQUFDLE1BQXRCLEdBQStCO0lBQy9CLGFBQWEsQ0FBQyxpQkFBZCxHQUFrQztJQUdsQyxDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxRQUFBLEVBQVUsYUFBVjtNQUNBLE1BQUEsRUFBUSxDQURSO0tBREQ7SUFJQSwrQ0FBTSxJQUFDLENBQUEsT0FBUDtJQUVBLGFBQWEsQ0FBQyxNQUFkLEdBQXVCLElBQUMsQ0FBQTtFQXBCWjs7RUF1QmIsYUFBQyxDQUFBLE1BQUQsQ0FBUSxVQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsUUFBVCxHQUFvQjtJQUEvQixDQURMO0dBREQ7O0VBSUEsYUFBQyxDQUFBLE1BQUQsQ0FBUSxRQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsTUFBVCxHQUFrQjtJQUE3QixDQURMO0dBREQ7OzBCQU1BLFNBQUEsR0FBVyxTQUFBO0lBQ1YsS0FBQSxDQUFNLElBQUMsQ0FBQSxJQUFJLENBQUMsUUFBWjtJQUNBLElBQUMsQ0FBQSxTQUFELENBQVcsSUFBQyxDQUFBLElBQVo7SUFDQSxJQUFDLENBQUEsUUFBUSxDQUFDLE1BQVYsR0FBbUIsTUFBTSxDQUFDO1dBQzFCLElBQUMsQ0FBQSxRQUFRLENBQUMsYUFBVixDQUFBO0VBSlU7OzBCQU9YLFNBQUEsR0FBVyxTQUFDLElBQUQsRUFBTyxLQUFQO0FBQ1YsUUFBQTs7TUFEaUIsUUFBUTs7SUFDekIsSUFBRyxJQUFJLENBQUMsSUFBTCxLQUFhLEVBQWhCO01BQXdCLFNBQUEsR0FBWSxXQUFwQztLQUFBLE1BQUE7TUFBb0QsU0FBQSxHQUFZLElBQUksQ0FBQyxLQUFyRTs7SUFHQSxhQUFBLEdBQWdCLElBQUksU0FBSixDQUNmO01BQUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxRQUFRLENBQUMsT0FBbEI7TUFDQSxJQUFBLEVBQU0sS0FBQSxDQUFNLEtBQUEsR0FBUSxDQUFkLENBQWdCLENBQUMsSUFBakIsQ0FBc0IsS0FBdEIsQ0FBQSxHQUErQixDQUFBLEdBQUEsR0FBSSxTQUFKLENBRHJDO01BR0EsUUFBQSxFQUFVLEVBSFY7TUFJQSxVQUFBLEVBQVksR0FKWjtNQUtBLEtBQUEsRUFBTyxPQUxQO01BT0EsT0FBQSxFQUFZLFNBQUEsS0FBYSxVQUFoQixHQUFnQyxHQUFoQyxHQUF5QyxDQVBsRDtNQVFBLE1BQUEsRUFBUSxFQVJSO01BU0EsQ0FBQSxFQUFHLElBQUMsQ0FBQSxRQUFRLENBQUMsTUFUYjtNQVdBLGVBQUEsRUFBaUIsSUFYakI7TUFZQSxNQUFBLEVBQ0M7UUFBQSxLQUFBLEVBQU8sSUFBUDtPQWJEO0tBRGU7SUFnQmhCLGFBQWEsQ0FBQyxLQUFkLENBQW9CLFNBQUE7YUFDbkIsS0FBQSxDQUFTLElBQUMsQ0FBQSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQWYsR0FBb0IsTUFBcEIsR0FBMEIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBeEMsR0FBMEMsTUFBMUMsR0FBZ0QsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBOUQsR0FBZ0UsU0FBaEUsR0FBeUUsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBdkYsR0FBNkYsR0FBN0YsR0FBZ0csSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBdEg7SUFEbUIsQ0FBcEI7SUFJQSxJQUFDLENBQUEsUUFBUSxDQUFDLE1BQVYsSUFBb0I7SUFHcEIsSUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQWQsR0FBdUIsQ0FBMUI7TUFDQyxTQUFBLEdBQVksS0FBQSxHQUFRO0FBQ3BCO0FBQUE7V0FBQSxxQ0FBQTs7cUJBQ0MsSUFBQyxDQUFBLFNBQUQsQ0FBVyxTQUFYLEVBQXNCLFNBQXRCO0FBREQ7cUJBRkQ7O0VBM0JVOzs7O0dBekN3Qjs7OztBQ0pwQyxPQUFPLENBQUMsSUFBUixHQUNDO0VBQUEsS0FBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLE1BQU47SUFDQSxLQUFBLEVBQU8sTUFEUDtHQUREO0VBR0EsbUJBQUEsRUFDQztJQUFBLElBQUEsRUFBTSx5REFBTjtJQUNBLEtBQUEsRUFBTywwREFEUDtHQUpEO0VBTUEscUJBQUEsRUFDQztJQUFBLElBQUEsRUFBTSwyREFBTjtJQUNBLEtBQUEsRUFBTyw0REFEUDtHQVBEO0VBU0Esc0JBQUEsRUFDQztJQUFBLElBQUEsRUFBTSw0REFBTjtJQUNBLEtBQUEsRUFBTyw2REFEUDtHQVZEO0VBWUEsMEJBQUEsRUFDQztJQUFBLElBQUEsRUFBTSxnRUFBTjtJQUNBLEtBQUEsRUFBTyxpRUFEUDtHQWJEO0VBZ0JBLEtBQUEsRUFBTyxvREFoQlA7Ozs7O0FDQUQsSUFBQSw0QkFBQTtFQUFBOzs7QUFBQSxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQWhCLEdBQ0M7RUFBQSxLQUFBLEVBQU8sTUFBQSxDQUFPO0lBQUEsT0FBQSxFQUFTLENBQVQ7R0FBUCxDQUFQO0VBQ0EsSUFBQSxFQUFNLEdBRE47OztBQUtBLGFBQWMsT0FBQSxDQUFRLFlBQVI7O0FBR1Q7Ozs7Ozs7OztHQUF5Qjs7QUFDekIsT0FBTyxDQUFDOzs7Ozs7Ozs7R0FBZ0I7O0FBTzlCOzs7OztBQUtBOzs7Ozs7QUFNQTs7Ozs7Ozs7O0FDNUJBLE9BQU8sQ0FBQyxJQUFSLEdBQ0M7RUFBQSxLQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0sTUFBTjtJQUNBLEtBQUEsRUFBTyxNQURQO0dBREQ7RUFNQSxtQkFBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLHlEQUFOO0lBQ0EsS0FBQSxFQUFPLDBEQURQO0dBUEQ7RUFTQSxxQkFBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLDJEQUFOO0lBQ0EsS0FBQSxFQUFPLDREQURQO0dBVkQ7RUFZQSxzQkFBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLDREQUFOO0lBQ0EsS0FBQSxFQUFPLDZEQURQO0dBYkQ7RUFlQSwwQkFBQSxFQUNDO0lBQUEsSUFBQSxFQUFNLGdFQUFOO0lBQ0EsS0FBQSxFQUFPLGlFQURQO0dBaEJEO0VBcUJBLEtBQUEsRUFBTyxvREFyQlA7RUFzQkEsR0FBQSxFQUFLLHdDQXRCTDs7Ozs7QUNERCxJQUFBLGlCQUFBO0VBQUE7Ozs7QUFBQSxpQkFBQSxHQUFvQjs7QUFFZCxPQUFPLENBQUM7OztFQUNBLHVCQUFDLE9BQUQ7QUFFWixRQUFBO0lBRmEsSUFBQyxDQUFBLDRCQUFELFVBQVM7Ozs7Ozs7SUFFdEIsZUFBQSxHQUFrQixJQUFJLEtBQUosQ0FBVTtNQUFFLE9BQUEsRUFBUyxDQUFYO01BQWMsSUFBQSxFQUFNLENBQXBCO0tBQVY7SUFDbEIsZUFBZSxDQUFDLE1BQWhCLEdBQ0M7TUFBQSxRQUFBLEVBQVU7UUFBRSxLQUFBLEVBQU8sQ0FBVDtPQUFWO01BQ0EsTUFBQSxFQUFRO1FBQUUsS0FBQSxFQUFPLENBQVQ7T0FEUjs7SUFFRCxlQUFlLENBQUMsV0FBaEIsQ0FBNEIsTUFBNUI7SUFFQSxDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxJQUFBLEVBQU0sU0FBTjtNQUNBLGVBQUEsRUFBaUIsSUFEakI7TUFFQSxZQUFBLEVBQWMsRUFGZDtNQUlBLFVBQUEsRUFBWSxlQUpaO01BS0EsSUFBQSxFQUFNLElBTE47TUFPQSxVQUFBLEVBQVksSUFQWjtNQVFBLGFBQUEsRUFBZSxJQVJmO01BU0EsV0FBQSxFQUFhLElBVGI7TUFXQSxVQUFBLEVBQVksSUFYWjtNQVlBLFdBQUEsRUFBYSxJQVpiO01BaUJBLFVBQUEsRUFBWSxJQWpCWjtNQW9CQSxRQUFBLEVBQVUsSUFwQlY7TUFxQkEsYUFBQSxFQUFlLElBckJmO01Bc0JBLFdBQUEsRUFBYSxJQXRCYjtNQXdCQSxTQUFBLEVBQVcsaUJBeEJYO01BeUJBLGVBQUEsRUFBaUIsS0F6QmpCO01BMEJBLGVBQUEsRUFBaUIsTUExQmpCO01BMkJBLGFBQUEsRUFBZSxNQTNCZjtNQThCQSxNQUFBLEVBQVEsSUE5QlI7TUErQkEsUUFBQSxFQUFVLElBL0JWO01BZ0NBLFVBQUEsRUFBWSxNQWhDWjtNQWlDQSxTQUFBLEVBQVcsSUFqQ1g7S0FERDtJQW9DQSwrQ0FBTSxJQUFDLENBQUEsT0FBUDtJQUVBLE1BQU0sQ0FBQyw4QkFBUCxDQUFzQyxJQUF0QztJQUNBLElBQUMsQ0FBQSxVQUFELENBQUE7SUFFQSxJQUFDLENBQUEsTUFBRCxHQUNDO01BQUEsUUFBQSxFQUFVO1FBQUUsS0FBQSxFQUFPLENBQVQ7T0FBVjtNQUNBLE1BQUEsRUFBUTtRQUFFLEtBQUEsRUFBTyxDQUFUO09BRFI7O0VBbERXOztFQXVEYixhQUFDLENBQUEsTUFBRCxDQUFRLE1BQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO01BQ0osSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULEdBQWdCO01BQ2hCLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFBQyxDQUFBLElBQUksQ0FBQztNQUNmLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBLElBQUksQ0FBQzthQUNoQixJQUFDLENBQUEsSUFBSSxDQUFDLE1BQU4sR0FBZTtJQUpYLENBREw7R0FERDs7RUFRQSxhQUFDLENBQUEsTUFBRCxDQUFRLFlBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxVQUFULEdBQXNCO0lBQWpDLENBREw7R0FERDs7RUFNQSxhQUFDLENBQUEsTUFBRCxDQUFRLFFBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7R0FERDs7RUFHQSxhQUFDLENBQUEsTUFBRCxDQUFRLFdBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7R0FERDs7RUFHQSxhQUFDLENBQUEsTUFBRCxDQUFRLFNBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7R0FERDs7RUFLQSxhQUFDLENBQUEsTUFBRCxDQUFRLFlBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxVQUFULEdBQXNCO0lBQWpDLENBREw7R0FERDs7RUFJQSxhQUFDLENBQUEsTUFBRCxDQUFRLGVBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxhQUFULEdBQXlCO0lBQXBDLENBREw7R0FERDs7RUFJQSxhQUFDLENBQUEsTUFBRCxDQUFRLGFBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxXQUFULEdBQXVCO0lBQWxDLENBREw7R0FERDs7RUFNQSxhQUFDLENBQUEsTUFBRCxDQUFRLFlBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxVQUFULEdBQXNCO0lBQWpDLENBREw7R0FERDs7RUFJQSxhQUFDLENBQUEsTUFBRCxDQUFRLGFBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxXQUFULEdBQXVCO0lBQWxDLENBREw7R0FERDs7MEJBU0Esb0JBQUEsR0FBc0IsU0FBQTtJQUNyQixJQUFDLENBQUEsVUFBVSxDQUFDLFdBQVosQ0FBd0IsUUFBeEI7SUFDQSxJQUFDLENBQUEsT0FBRCxDQUFTO01BQUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxNQUFPLENBQUEsUUFBQSxDQUFTLENBQUMsS0FBekI7TUFBZ0MsT0FBQSxFQUFTO1FBQUUsS0FBQSxFQUFPLE1BQUEsQ0FBTztVQUFBLE9BQUEsRUFBUyxDQUFUO1NBQVAsQ0FBVDtRQUE2QixJQUFBLEVBQU0sR0FBbkM7T0FBekM7S0FBVDtJQUNBLElBQUcsSUFBQyxDQUFBLFVBQUo7YUFBb0IsSUFBQyxDQUFBLFVBQVUsQ0FBQyxvQkFBWixDQUFBLEVBQXBCOztFQUhxQjs7MEJBS3RCLGtCQUFBLEdBQW9CLFNBQUE7SUFDbkIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxXQUFaLENBQXdCLE1BQXhCO0lBQ0EsSUFBQyxDQUFBLE9BQUQsQ0FBUztNQUFBLEtBQUEsRUFBTyxJQUFDLENBQUEsTUFBTyxDQUFBLE1BQUEsQ0FBTyxDQUFDLEtBQXZCO01BQThCLE9BQUEsRUFBUztRQUFFLEtBQUEsRUFBTyxNQUFBLENBQU87VUFBQSxPQUFBLEVBQVMsQ0FBVDtTQUFQLENBQVQ7UUFBNkIsSUFBQSxFQUFNLEdBQW5DO09BQXZDO0tBQVQ7SUFDQSxJQUFHLElBQUMsQ0FBQSxVQUFKO2FBQW9CLElBQUMsQ0FBQSxVQUFVLENBQUMsa0JBQVosQ0FBQSxFQUFwQjs7RUFIbUI7OzBCQUtwQixtQkFBQSxHQUFxQixTQUFBO0lBQ3BCLElBQUMsQ0FBQSxVQUFVLENBQUMsV0FBWixDQUF3QixRQUF4QjtJQUNBLElBQUMsQ0FBQSxPQUFELENBQVM7TUFBQSxLQUFBLEVBQU8sSUFBQyxDQUFBLE1BQU8sQ0FBQSxRQUFBLENBQVMsQ0FBQyxLQUF6QjtNQUFnQyxPQUFBLEVBQVM7UUFBRSxLQUFBLEVBQU8sTUFBTSxDQUFDLE1BQWhCO1FBQXdCLElBQUEsRUFBTSxDQUE5QjtPQUF6QztLQUFUO0lBQ0EsSUFBRyxJQUFDLENBQUEsVUFBSjthQUFvQixJQUFDLENBQUEsVUFBVSxDQUFDLG1CQUFaLENBQUEsRUFBcEI7O0VBSG9COzswQkFLckIsaUJBQUEsR0FBbUIsU0FBQTtJQUNsQixJQUFDLENBQUEsVUFBVSxDQUFDLFdBQVosQ0FBd0IsTUFBeEI7SUFDQSxJQUFDLENBQUEsT0FBRCxDQUFTO01BQUEsS0FBQSxFQUFPLElBQUMsQ0FBQSxNQUFPLENBQUEsTUFBQSxDQUFPLENBQUMsS0FBdkI7TUFBOEIsT0FBQSxFQUFTO1FBQUUsS0FBQSxFQUFPLE1BQU0sQ0FBQyxNQUFoQjtRQUF3QixJQUFBLEVBQU0sQ0FBOUI7T0FBdkM7S0FBVDtJQUNBLElBQUcsSUFBQyxDQUFBLFVBQUo7YUFBb0IsSUFBQyxDQUFBLFVBQVUsQ0FBQyxpQkFBWixDQUFBLEVBQXBCOztFQUhrQjs7RUFTbkIsYUFBQyxDQUFBLE1BQUQsQ0FBUSxZQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsVUFBVCxHQUFzQjtJQUFqQyxDQURMO0dBREQ7O0VBTUEsYUFBQyxDQUFBLE1BQUQsQ0FBUSxVQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsUUFBVCxHQUFvQjtJQUEvQixDQURMO0dBREQ7O0VBSUEsYUFBQyxDQUFBLE1BQUQsQ0FBUSxlQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsYUFBVCxHQUF5QjtJQUFwQyxDQURMO0dBREQ7O0VBSUEsYUFBQyxDQUFBLE1BQUQsQ0FBUSxhQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsV0FBVCxHQUF1QjtJQUFsQyxDQURMO0dBREQ7O0VBUUEsYUFBQyxDQUFBLE1BQUQsQ0FBUSxXQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBVCxHQUFxQjtJQUFoQyxDQURMO0dBREQ7O0VBSUEsYUFBQyxDQUFBLE1BQUQsQ0FBUSxpQkFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsT0FBTyxDQUFDLGVBQVQsR0FBMkI7SUFBdEMsQ0FETDtHQUREOztFQUlBLGFBQUMsQ0FBQSxNQUFELENBQVEsaUJBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxlQUFULEdBQTJCO0lBQXRDLENBREw7R0FERDs7RUFJQSxhQUFDLENBQUEsTUFBRCxDQUFRLGVBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxhQUFULEdBQXlCO0lBQXBDLENBREw7R0FERDs7RUFPQSxhQUFDLENBQUEsTUFBRCxDQUFRLFFBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxNQUFULEdBQWtCO0lBQTdCLENBREw7R0FERDs7RUFJQSxhQUFDLENBQUEsTUFBRCxDQUFRLFVBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxRQUFULEdBQW9CO0lBQS9CLENBREw7R0FERDs7RUFJQSxhQUFDLENBQUEsTUFBRCxDQUFRLFdBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFULEdBQXFCO0lBQWhDLENBREw7R0FERDs7RUFRQSxhQUFDLENBQUEsTUFBRCxDQUFRLFlBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxVQUFULEdBQXNCO0lBQWpDLENBREw7R0FERDs7MEJBV0EsVUFBQSxHQUFZLFNBQUE7SUFFWCxJQUFDLENBQUEsVUFBRCxHQUFjLElBQUMsQ0FBQSxlQUFELENBQWlCLE9BQWpCLEVBQTBCO01BQUM7UUFBRSxLQUFBLEVBQU8sTUFBVDtRQUFpQixNQUFBLEVBQVEsTUFBekI7T0FBRCxFQUM5QjtRQUFFLEtBQUEsRUFBTyxRQUFUO1FBQW1CLE1BQUEsRUFBUSxRQUEzQjtPQUQ4QixFQUU5QjtRQUFFLEtBQUEsRUFBTyxPQUFUO1FBQWtCLE1BQUEsRUFBUSxRQUExQjtPQUY4QixFQUc5QjtRQUFFLEtBQUEsRUFBTyxNQUFUO1FBQWlCLE1BQUEsRUFBUSxNQUF6QjtPQUg4QjtLQUExQixFQUdnQyxJQUFDLENBQUEsVUFIakM7SUFLZCxJQUFDLENBQUEsVUFBRCxHQUFjLElBQUMsQ0FBQSxlQUFELENBQWlCLE1BQWpCLEVBQXlCO01BQUM7UUFBRSxLQUFBLEVBQU8sSUFBVDtRQUFlLE1BQUEsRUFBUSxNQUF2QjtPQUFELEVBQzdCO1FBQUUsS0FBQSxFQUFPLEtBQVQ7UUFBZ0IsTUFBQSxFQUFRLFFBQXhCO09BRDZCLEVBRTdCO1FBQUUsS0FBQSxFQUFPLE1BQVQ7UUFBaUIsTUFBQSxFQUFRLE1BQXpCO09BRjZCLEVBRzdCO1FBQUUsS0FBQSxFQUFPLE9BQVQ7UUFBa0IsTUFBQSxFQUFRLFFBQTFCO09BSDZCO0tBQXpCLEVBR21DLElBQUMsQ0FBQSxVQUhwQztJQUtkLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBLGVBQUQsQ0FBaUIsUUFBakIsRUFBMkI7TUFBQztRQUFFLEtBQUEsRUFBTyxPQUFUO1FBQWtCLE1BQUEsRUFBUSxLQUExQjtPQUFELEVBQzNCO1FBQUUsS0FBQSxFQUFPLE1BQVQ7UUFBaUIsTUFBQSxFQUFRLElBQXpCO09BRDJCLEVBRTNCO1FBQUUsS0FBQSxFQUFPLElBQVQ7UUFBZSxNQUFBLEVBQVEsSUFBdkI7T0FGMkIsRUFHM0I7UUFBRSxLQUFBLEVBQU8sS0FBVDtRQUFnQixNQUFBLEVBQVEsS0FBeEI7T0FIMkI7S0FBM0IsRUFHa0MsSUFBQyxDQUFBLE1BSG5DO0lBS1YsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFDLENBQUEsZUFBRCxDQUFpQixJQUFqQixFQUF1QjtNQUFDO1FBQUUsS0FBQSxFQUFPLE9BQVQ7UUFBa0IsTUFBQSxFQUFRLEtBQTFCO09BQUQsRUFDdkI7UUFBRSxLQUFBLEVBQU8sTUFBVDtRQUFpQixNQUFBLEVBQVEsSUFBekI7T0FEdUIsRUFFdkI7UUFBRSxLQUFBLEVBQU8sSUFBVDtRQUFlLE1BQUEsRUFBUSxJQUF2QjtPQUZ1QixFQUd2QjtRQUFFLEtBQUEsRUFBTyxLQUFUO1FBQWdCLE1BQUEsRUFBUSxLQUF4QjtPQUh1QjtLQUF2QixFQUdrQyxJQUFDLENBQUEsTUFIbkM7SUFLVixJQUFDLENBQUEsUUFBRCxHQUFZLElBQUMsQ0FBQSxlQUFELENBQWlCLE1BQWpCLEVBQXlCO01BQUM7UUFBRSxLQUFBLEVBQU8sT0FBVDtRQUFrQixNQUFBLEVBQVEsS0FBMUI7T0FBRCxFQUMzQjtRQUFFLEtBQUEsRUFBTyxNQUFUO1FBQWlCLE1BQUEsRUFBUSxJQUF6QjtPQUQyQixFQUUzQjtRQUFFLEtBQUEsRUFBTyxJQUFUO1FBQWUsTUFBQSxFQUFRLElBQXZCO09BRjJCLEVBRzNCO1FBQUUsS0FBQSxFQUFPLEtBQVQ7UUFBZ0IsTUFBQSxFQUFRLEtBQXhCO09BSDJCO0tBQXpCLEVBR2dDLElBQUMsQ0FBQSxRQUhqQztJQUtaLElBQUMsQ0FBQSxVQUFELEdBQWMsSUFBQyxDQUFBLGVBQUQsQ0FBaUIsUUFBakIsRUFBMkI7TUFBQztRQUFFLEtBQUEsRUFBTyxLQUFUO1FBQWdCLE1BQUEsRUFBUSxLQUF4QjtPQUFELEVBQzlCO1FBQUUsS0FBQSxFQUFPLElBQVQ7UUFBZSxNQUFBLEVBQVEsSUFBdkI7T0FEOEIsRUFFOUI7UUFBRSxLQUFBLEVBQU8sT0FBVDtRQUFrQixNQUFBLEVBQVEsS0FBMUI7T0FGOEIsRUFHOUI7UUFBRSxLQUFBLEVBQU8sTUFBVDtRQUFpQixNQUFBLEVBQVEsSUFBekI7T0FIOEI7S0FBM0IsRUFHK0IsSUFBQyxDQUFBLFVBSGhDO1dBS2QsSUFBQyxDQUFBLFNBQUQsR0FBYSxJQUFDLENBQUEsZUFBRCxDQUFpQixPQUFqQixFQUEwQjtNQUFDO1FBQUUsS0FBQSxFQUFPLEtBQVQ7UUFBZ0IsTUFBQSxFQUFRLEtBQXhCO09BQUQsRUFDNUI7UUFBRSxLQUFBLEVBQU8sSUFBVDtRQUFlLE1BQUEsRUFBUSxJQUF2QjtPQUQ0QixFQUU1QjtRQUFFLEtBQUEsRUFBTyxPQUFUO1FBQWtCLE1BQUEsRUFBUSxLQUExQjtPQUY0QixFQUc1QjtRQUFFLEtBQUEsRUFBTyxNQUFUO1FBQWlCLE1BQUEsRUFBUSxJQUF6QjtPQUg0QjtLQUExQixFQUdnQyxJQUFDLENBQUEsU0FIakM7RUFoQ0Y7OzBCQXdDWixlQUFBLEdBQWlCLFNBQUMsUUFBRCxFQUFxQixVQUFyQixFQUFzQyxhQUF0QztBQUNoQixRQUFBOztNQURpQixXQUFXOzs7TUFBUyxhQUFhOzs7TUFBSSxnQkFBZ0I7O0lBQ3RFLE1BQUEsR0FBUztBQUVUO0FBQUEsU0FBQSxxQ0FBQTs7TUFDQyxZQUFBLEdBQWUsSUFBSSxDQUFDLEtBQUwsQ0FBVyxHQUFYO01BQ2YsT0FBQSxHQUFVLFlBQWEsQ0FBQSxDQUFBO01BQ3ZCLFNBQUEsR0FBWSxZQUFhLENBQUEsQ0FBQTtNQUV6QixJQUFHLE9BQUEsS0FBVyxRQUFkO0FBQ0MsYUFBQSw4Q0FBQTs7VUFDQyxJQUFHLFNBQUEsS0FBYSxJQUFJLENBQUMsS0FBckI7WUFDQyxNQUFBLEdBQVMsSUFBSSxDQUFDLE9BRGY7O0FBREQsU0FERDs7QUFMRDtBQVlBLFdBQU87RUFmUzs7OztHQWhQa0I7Ozs7QUNGcEMsSUFBQSwyREFBQTtFQUFBOzs7O0FBQUMsZ0JBQWlCLE9BQUEsQ0FBUSxlQUFSOztBQUNqQixlQUFnQixPQUFBLENBQVEsY0FBUjs7QUFFaEIsZ0JBQWlCLE9BQUEsQ0FBUSxlQUFSOztBQUNqQixrQkFBbUIsT0FBQSxDQUFRLGlCQUFSOztBQUVkLE9BQU8sQ0FBQzs7O0VBQ0Esc0JBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTOzs7Ozs7O0lBQ3RCLDhDQUFNLElBQUMsQ0FBQSxPQUFQO0lBRUEsSUFBQyxDQUFBLFlBQUQsQ0FBQTtFQUhZOzt5QkFPYixZQUFBLEdBQWMsU0FBQTtJQUNiLElBQUcsS0FBSyxDQUFDLFFBQU4sQ0FBQSxDQUFIO2FBQXlCLElBQUMsQ0FBQSxhQUFELENBQUEsRUFBekI7S0FBQSxNQUFBO2FBQ0ssSUFBQyxDQUFBLGNBQUQsQ0FBQSxFQURMOztFQURhOzt5QkFJZCxhQUFBLEdBQWUsU0FBQTtJQUNkLElBQUcsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQTNCLEtBQW1DLE1BQXRDO2FBQWtELElBQUMsQ0FBQSxpQkFBRCxDQUFBLEVBQWxEO0tBQUEsTUFBQTthQUNLLElBQUMsQ0FBQSxtQkFBRCxDQUFBLEVBREw7O0VBRGM7O3lCQVdmLGNBQUEsR0FBZ0IsU0FBQTtJQUNmLElBQUcsSUFBQyxDQUFBLFVBQUo7TUFBb0IsSUFBQyxDQUFBLFVBQUQsR0FBYyxJQUFJLFlBQUosQ0FBaUI7UUFBRSxJQUFBLEVBQU0sSUFBUjtPQUFqQixFQUFsQzs7SUFFQSxJQUFHLElBQUMsQ0FBQSxRQUFKO01BQ0MsSUFBRyxJQUFDLENBQUEsV0FBSjtRQUFxQixJQUFDLENBQUEsV0FBRCxHQUFlLElBQUksYUFBSixDQUFrQjtVQUFFLElBQUEsRUFBTSxJQUFSO1NBQWxCLEVBQXBDOztNQUNBLElBQUcsSUFBQyxDQUFBLGFBQUo7UUFBdUIsSUFBQyxDQUFBLGFBQUQsR0FBaUIsSUFBSSxlQUFKLENBQW9CO1VBQUUsSUFBQSxFQUFNLElBQVI7U0FBcEIsRUFBeEM7T0FGRDs7SUFJQSxJQUFDLENBQUEsSUFBRCxHQUFRO0lBQ1IsSUFBQyxDQUFBLFdBQUQsQ0FBQTtJQUNBLElBQUMsQ0FBQSxxQkFBRCxDQUFBO0lBRUEsSUFBRyxJQUFDLENBQUEsVUFBRCxLQUFlLE1BQWxCO2FBQThCLElBQUMsQ0FBQSxpQkFBRCxDQUFBLEVBQTlCO0tBQUEsTUFBQTthQUNLLElBQUMsQ0FBQSxtQkFBRCxDQUFBLEVBREw7O0VBWGU7O3lCQWVoQixhQUFBLEdBQWUsU0FBQTtJQUNkLElBQUMsQ0FBQSxLQUFELEdBQVMsTUFBTSxDQUFDLEtBQVAsR0FBZSxJQUFDLENBQUE7SUFDekIsSUFBQyxDQUFBLENBQUQsR0FBSyxLQUFLLENBQUM7V0FDWCxJQUFDLENBQUEsQ0FBRCxHQUFLLEtBQUssQ0FBQztFQUhHOzt5QkFPZixXQUFBLEdBQWEsU0FBQTtBQUVaLFFBQUE7SUFBQSxJQUFDLENBQUEsQ0FBRCxHQUFLLEtBQUssQ0FBQztJQUNYLElBQUMsQ0FBQSxDQUFELEdBQUssS0FBSyxDQUFDO0lBRVgsSUFBRyxJQUFDLENBQUEsVUFBSjtNQUNDLElBQUMsQ0FBQSxVQUFVLENBQUMsQ0FBWixHQUFnQixLQUFLLENBQUM7TUFDdEIsSUFBQyxDQUFBLFVBQVUsQ0FBQyxDQUFaLEdBQWdCLEtBQUssQ0FBQyxPQUZ2Qjs7SUFJQSxNQUFBLEdBQVMsQ0FBQyxNQUFNLENBQUMsS0FBUCxHQUFlLEdBQWhCLENBQUEsR0FBdUIsSUFBQyxDQUFBO0lBQ2pDLE1BQUEsR0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLEdBQWpCLENBQUEsR0FBd0IsSUFBQyxDQUFBO0lBQ2xDLElBQUMsQ0FBQSxNQUFPLENBQUEsTUFBQSxDQUFPLENBQUMsS0FBaEIsR0FBd0IsSUFBSSxDQUFDLEdBQUwsQ0FBUyxNQUFULEVBQWlCLE1BQWpCO0lBRXhCLElBQUcsSUFBQyxDQUFBLFVBQUo7YUFDQyxJQUFDLENBQUEsVUFBVSxDQUFDLE1BQU8sQ0FBQSxNQUFBLENBQU8sQ0FBQyxLQUEzQixHQUFtQyxJQUFDLENBQUEsTUFBTyxDQUFBLE1BQUEsQ0FBTyxDQUFDLE1BRHBEOztFQWJZOzt5QkF1QmIscUJBQUEsR0FBdUIsU0FBQTtBQUN0QixRQUFBO0lBQUEsWUFBQSxHQUFlO0lBRWYsTUFBTSxDQUFDLEVBQVAsQ0FBVSxlQUFWLEVBQTJCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtRQUMxQixZQUFZLENBQUMsV0FBYixDQUFBO2VBQ0EsWUFBWSxDQUFDLGFBQWIsQ0FBQTtNQUYwQjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBM0I7SUFJQSxNQUFNLENBQUMsRUFBUCxDQUFVLGNBQVYsRUFBMEIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFBO1FBQ3pCLFlBQVksQ0FBQyxXQUFiLENBQUE7ZUFDQSxZQUFZLENBQUMsYUFBYixDQUFBO01BRnlCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUExQjtJQUtBLE1BQU0sQ0FBQyxFQUFQLENBQVUsZUFBVixFQUEyQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7UUFDMUIsWUFBWSxDQUFDLFdBQWIsQ0FBQTtlQUNBLFlBQVksQ0FBQyxhQUFiLENBQUE7TUFGMEI7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTNCO1dBSUEsTUFBTSxDQUFDLEVBQVAsQ0FBVSxjQUFWLEVBQTBCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtRQUN6QixZQUFZLENBQUMsV0FBYixDQUFBO2VBQ0EsWUFBWSxDQUFDLGFBQWIsQ0FBQTtNQUZ5QjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBMUI7RUFoQnNCOzs7O0dBcEVXOzs7O0FDTm5DLElBQUEsT0FBQTtFQUFBOzs7O0FBQU0sT0FBTyxDQUFDOzs7RUFDQSxtQkFBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7OztJQUV0QixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxPQUFBLEVBQVMsR0FBVDtNQUNBLE9BQUEsRUFBUyxJQURUO01BRUEsR0FBQSxFQUFLLE9BQUEsQ0FBUSxLQUFSLENBRkw7S0FERDtJQUtBLDJDQUFNLElBQUMsQ0FBQSxPQUFQO0lBQ0EsSUFBQyxDQUFBLEtBQUQsR0FBUztNQUFBLE1BQUEsRUFBUSxTQUFSOztJQUVULElBQUMsQ0FBQyxXQUFGLENBQWMsSUFBQyxDQUFBLEtBQWY7SUFDQSxJQUFDLENBQUMsVUFBRixDQUFhLElBQUMsQ0FBQSxRQUFkO0VBWFk7O0VBYWIsU0FBQyxDQUFBLE1BQUQsQ0FBUSxTQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLEVBQUQsQ0FBSSxNQUFNLENBQUMsR0FBWCxFQUFnQixLQUFoQjtJQUFYLENBQUw7R0FERDs7c0JBR0EsS0FBQSxHQUFPLFNBQUE7V0FDTixJQUFDLENBQUEsT0FBRCxHQUFXO0VBREw7O3NCQUVQLFFBQUEsR0FBVSxTQUFBO1dBQ1QsSUFBQyxDQUFBLE9BQUQsR0FBVztFQURGOzs7O0dBbkJxQjs7QUF3QmhDLE9BQUEsR0FBVSxTQUFDLFNBQUQ7QUFDVCxNQUFBO0VBQUEsYUFBQSxHQUFnQjtBQUNoQixTQUFPLDZrQkFBQSxHQUN1ZCxhQUR2ZCxHQUNxZSxtdUJBRHJlLEdBRWt0QixhQUZsdEIsR0FFZ3VCLDhWQUZodUIsR0FHNlUsYUFIN1UsR0FHMlYsOFZBSDNWLEdBSTZVLGFBSjdVLEdBSTJWLDhWQUozVixHQUs2VSxhQUw3VSxHQUsyVixxeEJBTDNWLEdBTW93QixhQU5wd0IsR0FNa3hCLHFpQkFObHhCLEdBT29oQixhQVBwaEIsR0FPa2lCO0FBVGhpQjs7OztBQ3pCVixJQUFBLDhDQUFBO0VBQUE7Ozs7QUFBQyxZQUFhLE9BQUEsQ0FBUSxNQUFSOztBQUNiLGVBQWdCLE9BQUEsQ0FBUSxjQUFSOztBQUNoQixhQUFjLE9BQUEsQ0FBUSxZQUFSOztBQUNkLFlBQWEsT0FBQSxDQUFRLFdBQVI7O0FBR1IsT0FBTyxDQUFDOzs7RUFDQSxvQkFBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7Ozs7Ozs7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUVBLDRDQUFNLElBQUMsQ0FBQSxPQUFQLENBRkE7SUFJQSxJQUFDLENBQUEsYUFBRCxDQUFBO0VBTlk7O3VCQVViLGFBQUEsR0FBZSxTQUFBO0lBQ2QsSUFBRyxLQUFLLENBQUMsUUFBTixDQUFBLENBQUg7QUFBeUIsYUFBekI7O0lBRUEsSUFBRyxJQUFDLENBQUEsUUFBSjtNQUFrQixJQUFDLENBQUEsZ0JBQUQsQ0FBQSxFQUFsQjs7SUFDQSxJQUFHLElBQUMsQ0FBQSxNQUFKO2FBQWdCLElBQUMsQ0FBQSxTQUFELENBQUEsRUFBaEI7O0VBSmM7O3VCQVdmLGdCQUFBLEdBQWtCLFNBQUE7QUFFakIsUUFBQTtJQUFBLGVBQUEsR0FBa0IsU0FBQTthQUNqQixNQUFNLENBQUMsUUFBUCxHQUFrQjtJQUREO1dBR2xCLFVBQUEsR0FBYSxJQUFJLFNBQUosQ0FDWjtNQUFBLEtBQUEsRUFBTyxFQUFQO01BQVcsTUFBQSxFQUFRLEVBQW5CO01BQ0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQUFOLENBQVcsRUFBWCxDQURIO01BQ21CLENBQUEsRUFBRyxLQUFLLENBQUMsR0FBTixDQUFVLEVBQVYsQ0FEdEI7TUFFQSxPQUFBLEVBQVMsZUFGVDtLQURZO0VBTEk7O3VCQVdsQixVQUFBLEdBQVksU0FBQyxLQUFELEVBQVEsV0FBUjs7TUFBUSxjQUFjOztJQUNqQyxJQUFHLElBQUMsQ0FBQSxXQUFELEtBQWdCLElBQW5CO01BQTZCLElBQUMsQ0FBQSxXQUFELEdBQWUsSUFBSSxXQUFoRDs7V0FDQSxJQUFDLENBQUEsV0FBVyxDQUFDLFVBQWIsQ0FBd0IsS0FBeEIsRUFBK0IsV0FBL0I7RUFGVzs7dUJBUVosU0FBQSxHQUFXLFNBQUE7QUFDVixRQUFBO0lBQUEsSUFBQyxDQUFBLFVBQUQsR0FBYyxJQUFJLFNBQUosQ0FBYztNQUFFLElBQUEsRUFBTSxJQUFSO0tBQWQ7SUFFZCxJQUFHLElBQUMsQ0FBQSxTQUFKO01BQW1CLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQXBCLENBQUEsRUFBbkI7S0FBQSxNQUFBO01BQ0ssTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBcEIsQ0FBQSxFQURMOztJQUdBLFVBQUEsR0FBYSxDQUFDLEtBQUQsRUFBUSxNQUFSO0lBQ2IsVUFBQSxHQUFhLENBQUMsU0FBRCxFQUFZLFNBQVo7SUFHYixXQUFBLEdBQWMsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFDLFNBQUQsRUFBWSxXQUFaO1FBQ2IsSUFBRyxLQUFDLENBQUEsVUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBM0IsS0FBbUMsUUFBdEM7VUFDQyxLQUFDLENBQUEsa0JBQUQsQ0FBQTtpQkFDQSxXQUFXLENBQUMsSUFBWixHQUFtQixVQUFXLENBQUEsQ0FBQSxFQUYvQjtTQUFBLE1BQUE7VUFJQyxLQUFDLENBQUEsb0JBQUQsQ0FBQTtpQkFDQSxXQUFXLENBQUMsSUFBWixHQUFtQixVQUFXLENBQUEsQ0FBQSxFQUwvQjs7TUFEYTtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUE7SUFTZCxVQUFBLEdBQWEsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFDLFNBQUQsRUFBWSxXQUFaO1FBQ1osSUFBRyxLQUFDLENBQUEsU0FBSjtVQUNDLEtBQUMsQ0FBQSxnQkFBRCxDQUFBO2lCQUNBLFdBQVcsQ0FBQyxJQUFaLEdBQW1CLFVBQVcsQ0FBQSxDQUFBLEVBRi9CO1NBQUEsTUFBQTtVQUlDLEtBQUMsQ0FBQSxnQkFBRCxDQUFBO2lCQUNBLFdBQVcsQ0FBQyxJQUFaLEdBQW1CLFVBQVcsQ0FBQSxDQUFBLEVBTC9COztNQURZO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQTtJQVFiLGNBQUEsR0FBb0IsSUFBQyxDQUFBLFNBQUosR0FBbUIsVUFBVyxDQUFBLENBQUEsQ0FBOUIsR0FBc0MsVUFBVyxDQUFBLENBQUE7SUFDbEUsY0FBQSxHQUFvQixJQUFDLENBQUEsVUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBM0IsS0FBbUMsUUFBdEMsR0FBb0QsVUFBVyxDQUFBLENBQUEsQ0FBL0QsR0FBdUUsVUFBVyxDQUFBLENBQUE7V0FJbkcsSUFBQyxDQUFBLFVBQVUsQ0FBQyxVQUFaLENBQXVCO01BQ3RCO1FBQ0MsS0FBQSxFQUFPLGNBRFI7UUFFQyxPQUFBLEVBQVMsVUFGVjtPQURzQixFQUt0QjtRQUNDLEtBQUEsRUFBTyxjQURSO1FBRUMsT0FBQSxFQUFTLFdBRlY7T0FMc0I7S0FBdkI7RUFoQ1U7O3VCQTRDWCxnQkFBQSxHQUFrQixTQUFBO0lBQ2pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQXBCLENBQUE7V0FDQSxJQUFDLENBQUEsU0FBRCxHQUFhLENBQUMsSUFBQyxDQUFBO0VBRkU7O3VCQUlsQixnQkFBQSxHQUFrQixTQUFBO0lBQ2pCLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQXBCLENBQUE7SUFDQSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFwQixDQUFBO1dBQ0EsSUFBQyxDQUFBLFNBQUQsR0FBYSxDQUFDLElBQUMsQ0FBQTtFQUhFOzs7O0dBekZjOzs7O0FDTmpDLElBQUEsd0JBQUE7RUFBQTs7OztBQUFDLFlBQWEsT0FBQSxDQUFRLG1CQUFSOztBQUNiLGdCQUFpQixPQUFBLENBQVEsZUFBUjs7QUFHWixPQUFPLENBQUM7OztFQUNBLG1CQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUzs7O0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFFQSwyQ0FBTSxJQUFDLENBQUEsT0FBUCxDQUZBO0VBRlk7O3NCQVViLGdCQUFBLEdBQWtCLFNBQUE7QUFFakIsUUFBQTtJQUFBLGVBQUEsR0FBa0IsU0FBQTthQUNqQixNQUFNLENBQUMsUUFBUCxHQUFrQjtJQUREO1dBR2xCLFVBQUEsR0FBYSxJQUFJLFNBQUosQ0FDWjtNQUFBLEtBQUEsRUFBTyxFQUFQO01BQVcsTUFBQSxFQUFRLEVBQW5CO01BQ0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQUFOLENBQVcsRUFBWCxDQURIO01BQ21CLENBQUEsRUFBRyxLQUFLLENBQUMsR0FBTixDQUFVLEVBQVYsQ0FEdEI7TUFFQSxPQUFBLEVBQVMsZUFGVDtLQURZO0VBTEk7O3NCQVlsQixpQkFBQSxHQUFtQixTQUFDLFFBQUQ7QUFFbEIsUUFBQTtJQUFBLFdBQUEsR0FBYyxJQUFJLEtBQUosQ0FDYjtNQUFBLElBQUEsRUFBTSxFQUFOO01BQVUsWUFBQSxFQUFjLEVBQXhCO01BQ0EsQ0FBQSxFQUFHLEtBQUssQ0FBQyxLQUFOLENBQVksQ0FBQyxFQUFiLENBREg7TUFDcUIsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFOLENBQWEsQ0FBQyxFQUFkLENBRHhCO01BRUEsZUFBQSxFQUFpQix3QkFGakI7TUFHQSxXQUFBLEVBQWEsQ0FIYjtNQUlBLE1BQUEsRUFDQztRQUFBLE9BQUEsRUFBUyxJQUFUO09BTEQ7S0FEYTtJQVFkLFdBQVcsQ0FBQyxLQUFaLEdBQW9CO01BQUEsTUFBQSxFQUFRLFNBQVI7O0lBRXBCLFdBQVcsQ0FBQyxNQUFaLEdBQ0M7TUFBQSxRQUFBLEVBQVU7UUFBRSxXQUFBLEVBQWEsd0JBQWY7T0FBVjtNQUNBLE1BQUEsRUFBUTtRQUFFLFdBQUEsRUFBYSx3QkFBZjtPQURSOztJQUVELFdBQVcsQ0FBQyxXQUFaLENBQXdCLFFBQXhCO0lBRUEsaUJBQUEsR0FBb0IsSUFBSSxLQUFKLENBQ25CO01BQUEsTUFBQSxFQUFRLFdBQVI7TUFDQSxXQUFBLEVBQWEsQ0FEYjtNQUVBLElBQUEsRUFBTSxFQUZOO01BRVUsWUFBQSxFQUFjLEVBRnhCO01BR0EsQ0FBQSxFQUFHLEVBSEg7TUFHTyxDQUFBLEVBQUcsRUFIVjtNQUlBLGVBQUEsRUFBaUIsSUFKakI7S0FEbUI7SUFRcEIsaUJBQWlCLENBQUMsTUFBbEIsR0FDQztNQUFBLFFBQUEsRUFBVTtRQUFFLFdBQUEsRUFBYSx3QkFBZjtPQUFWO01BQ0EsTUFBQSxFQUFRO1FBQUUsV0FBQSxFQUFhLHdCQUFmO09BRFI7O0lBRUQsaUJBQWlCLENBQUMsV0FBbEIsQ0FBOEIsUUFBOUI7SUFFQSxXQUFXLENBQUMsS0FBWixDQUFrQixTQUFBO0FBQ2pCLFVBQUE7TUFBQSxJQUFHLElBQUMsQ0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQWhCLEtBQXdCLE1BQTNCO1FBQXVDLFNBQUEsR0FBWSxTQUFuRDtPQUFBLE1BQUE7UUFBaUUsU0FBQSxHQUFZLE9BQTdFOztNQUNBLElBQUMsQ0FBQSxXQUFELENBQWEsU0FBYjtNQUNBLElBQUMsQ0FBQSxRQUFTLENBQUEsQ0FBQSxDQUFFLENBQUMsV0FBYixDQUF5QixTQUF6QjthQUNBLElBQUMsQ0FBQSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQWhCLENBQXdCLFNBQXhCLEVBQW1DO1FBQUEsS0FBQSxFQUFPLE1BQUEsQ0FBTztVQUFBLE9BQUEsRUFBUyxDQUFUO1NBQVAsQ0FBUDtRQUEyQixJQUFBLEVBQU0sR0FBakM7T0FBbkM7SUFKaUIsQ0FBbEI7SUFNQSxvQkFBQSxHQUF1QixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUMsV0FBRDtBQUN0QixZQUFBO1FBQUEsV0FBQSxHQUFjO1FBRWQsTUFBTSxDQUFDLEVBQVAsQ0FBVSxlQUFWLEVBQTJCLFNBQUE7aUJBQzFCLFdBQVcsQ0FBQyxDQUFaLEdBQWdCLEtBQUssQ0FBQyxLQUFOLENBQVksQ0FBQyxFQUFiO1FBRFUsQ0FBM0I7ZUFHQSxNQUFNLENBQUMsRUFBUCxDQUFVLGNBQVYsRUFBMEIsU0FBQTtpQkFDekIsV0FBVyxDQUFDLENBQVosR0FBZ0IsS0FBSyxDQUFDLE1BQU4sQ0FBYSxDQUFDLEVBQWQ7UUFEUyxDQUExQjtNQU5zQjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUE7V0FTdkIsb0JBQUEsQ0FBcUIsV0FBckI7RUE3Q2tCOzs7O0dBdkJZOzs7O0FDSGhDLElBQUEsWUFBQTtFQUFBOzs7O0FBQUMsZUFBZ0IsT0FBQSxDQUFRLGNBQVI7O0FBR1gsT0FBTyxDQUFDOzs7RUFDQSxxQkFBQyxPQUFEO0FBRVosUUFBQTtJQUZhLElBQUMsQ0FBQSw0QkFBRCxVQUFTOzs7O0lBRXRCLGlCQUFBLEdBQW9CLElBQUksS0FBSixDQUNuQjtNQUFBLEtBQUEsRUFBTyxHQUFQO01BQVksTUFBQSxFQUFRLElBQXBCO01BQ0EsQ0FBQSxFQUFHLEVBREg7TUFDTyxDQUFBLEVBQUcsRUFEVjtNQUVBLGVBQUEsRUFBaUIsSUFGakI7S0FEbUI7SUFLcEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsWUFBQSxFQUFjLGlCQUFkO0tBREQ7SUFHQSw2Q0FBTSxJQUFDLENBQUEsT0FBUDtJQUVBLGlCQUFpQixDQUFDLE1BQWxCLEdBQTJCLElBQUMsQ0FBQTtFQVpoQjs7RUFlYixXQUFDLENBQUEsTUFBRCxDQUFRLGNBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxZQUFULEdBQXdCO0lBQW5DLENBREw7R0FERDs7d0JBSUEsVUFBQSxHQUFZLFNBQUMsS0FBRCxFQUFRLFdBQVI7QUFDWCxRQUFBOztNQURtQixjQUFjOztJQUNqQyxJQUFHLEtBQUssQ0FBQyxRQUFOLENBQUEsQ0FBSDtBQUFBO0tBQUEsTUFBQTtNQUVDLFdBQUEsR0FBYyxJQUFJLEtBQUosQ0FDYjtRQUFBLEtBQUEsRUFBTyxHQUFQO1FBQ0EsTUFBQSxFQUFRLEdBRFI7UUFFQSxNQUFBLEVBQVEsSUFBQyxDQUFBLFlBRlQ7UUFHQSxlQUFBLEVBQWlCLElBSGpCO09BRGE7TUFNZCxXQUFXLENBQUMsQ0FBWixHQUFnQixDQUFDLElBQUMsQ0FBQSxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQXZCLEdBQWdDLENBQWpDLENBQUEsR0FBc0M7TUFFdEQsSUFBQyxDQUFBLGVBQUQsQ0FBaUIsS0FBakIsQ0FBdUIsQ0FBQyxNQUF4QixHQUFpQztNQUVqQyxJQUFBLEdBQU87QUFDUDtXQUFBLDZEQUFBOztRQUNDLGFBQUEsR0FBZ0IsSUFBQyxDQUFBLGdCQUFELENBQWtCLFVBQWxCO1FBQ2hCLGFBQWEsQ0FBQyxNQUFkLEdBQXVCO1FBQ3ZCLGFBQWEsQ0FBQyxDQUFkLEdBQWtCO3FCQUNsQixJQUFBLElBQVEsYUFBYSxDQUFDLEtBQWQsR0FBc0I7QUFKL0I7cUJBYkQ7O0VBRFc7O3dCQXdCWixnQkFBQSxHQUFrQixTQUFDLFVBQUQsRUFBYSxFQUFiLEVBQXFCLEVBQXJCO0FBQ2pCLFFBQUE7O01BRDhCLEtBQUs7OztNQUFHLEtBQUs7O0lBQzNDLFdBQUEsR0FBYyxJQUFJLFNBQUosQ0FDYjtNQUFBLElBQUEsRUFBTSxVQUFVLENBQUMsS0FBakI7TUFDQSxDQUFBLEVBQUcsRUFESDtNQUVBLE9BQUEsRUFBUztRQUFFLEdBQUEsRUFBSyxFQUFQO1FBQVcsTUFBQSxFQUFRLEVBQUEsR0FBSyxDQUF4QjtRQUEyQixJQUFBLEVBQU0sRUFBakM7UUFBcUMsS0FBQSxFQUFPLEVBQTVDO09BRlQ7TUFHQSxRQUFBLEVBQVUsRUFIVjtNQUlBLFVBQUEsRUFBWSxHQUpaO01BS0EsS0FBQSxFQUFPLE9BTFA7TUFNQSxlQUFBLEVBQWlCLGlCQU5qQjtNQU9BLFlBQUEsRUFBYyxDQVBkO0tBRGE7SUFVZCxXQUFXLENBQUMsRUFBWixDQUFlLE1BQU0sQ0FBQyxHQUF0QixFQUEyQixVQUFVLENBQUMsT0FBdEM7QUFDQSxXQUFPO0VBWlU7O3dCQWVsQixlQUFBLEdBQWlCLFNBQUMsS0FBRDs7TUFBQyxRQUFROztBQUN6QixXQUFPLElBQUksU0FBSixDQUNOO01BQUEsSUFBQSxFQUFNLEtBQU47TUFDQSxRQUFBLEVBQVUsRUFEVjtNQUVBLFVBQUEsRUFBWSxHQUZaO01BR0EsS0FBQSxFQUFPLE9BSFA7TUFJQSxPQUFBLEVBQVMsR0FKVDtNQUtBLE9BQUEsRUFDQztRQUFBLEdBQUEsRUFBSyxFQUFMO09BTkQ7S0FETTtFQURTOzs7O0dBM0RnQjs7OztBQ0hsQyxJQUFBLGFBQUE7RUFBQTs7OztBQUFNLE9BQU8sQ0FBQzs7O0VBQ0EseUJBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTOzs7Ozs7O0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLE1BQUEsRUFBUSxJQUFDLENBQUEsSUFBVDtNQUNBLEtBQUEsRUFBTyxJQUFDLENBQUEsSUFBSSxDQUFDLEtBRGI7TUFHQSxDQUFBLEVBQUcsS0FBSyxDQUFDLEdBSFQ7TUFHYyxJQUFBLEVBQU0sYUFIcEI7TUFHbUMsZUFBQSxFQUFpQixJQUhwRDtNQUtBLEtBQUEsRUFBTyxJQUFDLENBQUEsSUFBSSxDQUFDLGVBTGI7TUFNQSxZQUFBLEVBQWMsSUFBQyxDQUFBLElBQUksQ0FBQyxlQU5wQjtNQU9BLHFCQUFBLEVBQXVCLElBQUMsQ0FBQSxJQUFJLENBQUMsU0FQN0I7S0FERDtJQVVBLGlEQUFNLElBQUMsQ0FBQSxPQUFQO0lBRUEsSUFBQyxDQUFBLE1BQUQsQ0FBQTtFQWRZOztFQW9CYixlQUFDLENBQUEsTUFBRCxDQUFRLE1BQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULEdBQWdCO0lBQTNCLENBREw7R0FERDs7RUFJQSxlQUFDLENBQUEsTUFBRCxDQUFRLE9BQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxLQUFULEdBQWlCO0lBQTVCLENBREw7R0FERDs7RUFJQSxlQUFDLENBQUEsTUFBRCxDQUFRLGNBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxZQUFULEdBQXdCO0lBQW5DLENBREw7R0FERDs7RUFJQSxlQUFDLENBQUEsTUFBRCxDQUFRLHVCQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMscUJBQVQsR0FBaUM7SUFBNUMsQ0FETDtHQUREOzs0QkFPQSxRQUFBLEdBQVUsU0FBQyxDQUFELEVBQUksQ0FBSjtBQUFVLFdBQU8sSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFOLEtBQWUsQ0FBZixJQUFxQixJQUFDLENBQUEsSUFBSSxDQUFDLE1BQU4sS0FBZ0I7RUFBdEQ7OzRCQUVWLE1BQUEsR0FBUSxTQUFBO0lBRVAsSUFBRyxJQUFDLENBQUEsWUFBSjthQUFzQixJQUFDLENBQUEsNkJBQUQsQ0FBQSxFQUF0QjtLQUFBLE1BRUssSUFBRyxJQUFDLENBQUEsUUFBRCxDQUFVLEdBQVYsRUFBZSxHQUFmLENBQUEsSUFBdUIsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUF2QixJQUE4QyxJQUFDLENBQUEsUUFBRCxDQUFVLEdBQVYsRUFBZSxHQUFmLENBQTlDLElBQXFFLElBQUMsQ0FBQSxRQUFELENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBckUsSUFBNEYsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUEvRjthQUNKLElBQUMsQ0FBQSxvQkFBRCxDQUFBLEVBREk7S0FBQSxNQUdBLElBQUcsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUFIO2FBQ0osSUFBQyxDQUFBLG9CQUFELENBQUEsRUFESTtLQUFBLE1BR0EsSUFBRyxJQUFDLENBQUEsUUFBRCxDQUFVLEdBQVYsRUFBZSxHQUFmLENBQUEsSUFBdUIsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLEVBQWUsR0FBZixDQUF2QixJQUE4QyxJQUFDLENBQUEsUUFBRCxDQUFVLEdBQVYsRUFBZSxHQUFmLENBQWpEO2FBQ0osSUFBQyxDQUFBLHNCQUFELENBQUEsRUFESTtLQUFBLE1BQUE7YUFJQSxJQUFDLENBQUEsc0JBQUQsQ0FBQSxFQUpBOztFQVZFOzs0QkFzQlIsc0JBQUEsR0FBd0IsU0FBQTtBQUN2QixRQUFBO0lBQUEsSUFBQyxDQUFBLE1BQUQsR0FBVTtJQUVWLHNCQUFBLEdBQXlCLElBQUksU0FBSixDQUN4QjtNQUFBLE1BQUEsRUFBUSxJQUFSO01BQVcsS0FBQSxFQUFPLEVBQWxCO01BQXNCLE1BQUEsRUFBUSxFQUE5QjtNQUFrQyxDQUFBLEVBQUcsS0FBSyxDQUFDLElBQU4sQ0FBVyxDQUFYLENBQXJDO01BQW9ELENBQUEsRUFBRyxLQUFLLENBQUMsR0FBTixDQUFVLENBQUEsR0FBSSxDQUFkLENBQXZEO01BQ0EsS0FBQSxFQUFPLGFBQWEsQ0FBQyxLQUFNLENBQUEsSUFBQyxDQUFBLEtBQUQsQ0FEM0I7TUFDb0MsZUFBQSxFQUFpQixJQURyRDtNQUVBLFFBQUEsRUFBVSxFQUZWO01BRWMsVUFBQSxFQUFZLEdBRjFCO01BRStCLFNBQUEsRUFBVyxRQUYxQztNQUVvRCxVQUFBLEVBQVksc0JBRmhFO01BR0EsSUFBQSxFQUFNLElBQUMsQ0FBQSxxQkFIUDtLQUR3QjtXQU16QixvQkFBQSxHQUF1QixJQUFJLEtBQUosQ0FDdEI7TUFBQSxNQUFBLEVBQVEsSUFBUjtNQUFXLEtBQUEsRUFBTyxHQUFsQjtNQUF1QixNQUFBLEVBQVEsRUFBL0I7TUFBbUMsQ0FBQSxFQUFHLEtBQUssQ0FBQyxLQUFOLENBQVksQ0FBQyxDQUFiLENBQXRDO01BQXVELENBQUEsRUFBRyxLQUFLLENBQUMsR0FBTixDQUFVLENBQVYsQ0FBMUQ7TUFDQSxLQUFBLEVBQU8sYUFBYSxDQUFDLDBCQUEyQixDQUFBLElBQUMsQ0FBQSxLQUFELENBRGhEO0tBRHNCO0VBVEE7OzRCQWN4Qiw2QkFBQSxHQUErQixTQUFBO0FBQzlCLFFBQUE7SUFBQSxJQUFDLENBQUEsTUFBRCxHQUFVO0lBRVYsc0JBQUEsR0FBeUIsSUFBSSxTQUFKLENBQ3hCO01BQUEsTUFBQSxFQUFRLElBQVI7TUFBVyxLQUFBLEVBQU8sRUFBbEI7TUFBc0IsTUFBQSxFQUFRLEVBQTlCO01BQWtDLENBQUEsRUFBRyxLQUFLLENBQUMsSUFBM0M7TUFBaUQsQ0FBQSxFQUFHLEtBQUssQ0FBQyxHQUFOLENBQVUsQ0FBVixDQUFwRDtNQUNBLEtBQUEsRUFBTyxhQUFhLENBQUMsS0FBTSxDQUFBLElBQUMsQ0FBQSxLQUFELENBRDNCO01BQ29DLGVBQUEsRUFBaUIsSUFEckQ7TUFFQSxRQUFBLEVBQVUsRUFGVjtNQUVjLFVBQUEsRUFBWSxHQUYxQjtNQUUrQixTQUFBLEVBQVcsUUFGMUM7TUFFb0QsVUFBQSxFQUFZLHNCQUZoRTtNQUdBLElBQUEsRUFBTSxJQUFDLENBQUEscUJBSFA7S0FEd0I7V0FNekIsb0JBQUEsR0FBdUIsSUFBSSxLQUFKLENBQ3RCO01BQUEsTUFBQSxFQUFRLElBQVI7TUFBVyxLQUFBLEVBQU8sR0FBbEI7TUFBdUIsTUFBQSxFQUFRLEVBQS9CO01BQW1DLENBQUEsRUFBRyxLQUFLLENBQUMsS0FBNUM7TUFBbUQsQ0FBQSxFQUFHLEtBQUssQ0FBQyxHQUFOLENBQUEsQ0FBdEQ7TUFDQSxLQUFBLEVBQU8sYUFBYSxDQUFDLDBCQUEyQixDQUFBLElBQUMsQ0FBQSxLQUFELENBRGhEO0tBRHNCO0VBVE87OzRCQWlCL0Isc0JBQUEsR0FBd0IsU0FBQTtBQUN2QixRQUFBO0lBQUEsSUFBQyxDQUFBLE1BQUQsR0FBVTtJQUVWLG9CQUFBLEdBQXVCLElBQUksS0FBSixDQUN0QjtNQUFBLE1BQUEsRUFBUSxJQUFSO01BQVcsS0FBQSxFQUFPLEdBQWxCO01BQXVCLE1BQUEsRUFBUSxJQUFDLENBQUEsTUFBaEM7TUFBd0MsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQUFqRDtNQUNBLEtBQUEsRUFBTyxhQUFhLENBQUMscUJBQXNCLENBQUEsSUFBQyxDQUFBLEtBQUQsQ0FEM0M7S0FEc0I7SUFJdkIsc0JBQUEsR0FBeUIsSUFBSSxTQUFKLENBQ3hCO01BQUEsTUFBQSxFQUFRLElBQVI7TUFBVyxLQUFBLEVBQU8sRUFBbEI7TUFBc0IsTUFBQSxFQUFRLEVBQTlCO01BQWtDLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBM0M7TUFBbUQsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUE1RDtNQUNBLEtBQUEsRUFBTyxhQUFhLENBQUMsS0FBTSxDQUFBLElBQUMsQ0FBQSxLQUFELENBRDNCO01BQ29DLGVBQUEsRUFBaUIsSUFEckQ7TUFFQSxRQUFBLEVBQVUsRUFGVjtNQUVjLFVBQUEsRUFBWSxHQUYxQjtNQUUrQixTQUFBLEVBQVcsUUFGMUM7TUFFb0QsVUFBQSxFQUFZLHNCQUZoRTtNQUdBLElBQUEsRUFBTSxJQUFDLENBQUEscUJBSFA7S0FEd0I7V0FNekIsb0JBQUEsR0FBdUIsSUFBSSxLQUFKLENBQ3RCO01BQUEsTUFBQSxFQUFRLElBQVI7TUFBVyxLQUFBLEVBQU8sR0FBbEI7TUFBdUIsTUFBQSxFQUFRLElBQUMsQ0FBQSxNQUFoQztNQUF3QyxDQUFBLEVBQUcsS0FBSyxDQUFDLEtBQWpEO01BQ0EsS0FBQSxFQUFPLGFBQWEsQ0FBQyxzQkFBdUIsQ0FBQSxJQUFDLENBQUEsS0FBRCxDQUQ1QztLQURzQjtFQWJBOzs0QkFrQnhCLG9CQUFBLEdBQXNCLFNBQUE7QUFDckIsUUFBQTtJQUFBLElBQUMsQ0FBQSxNQUFELEdBQVU7SUFFVixrQkFBQSxHQUFxQixJQUFJLFNBQUosQ0FDcEI7TUFBQSxNQUFBLEVBQVEsSUFBUjtNQUFXLEtBQUEsRUFBTyxFQUFsQjtNQUFzQixNQUFBLEVBQVEsRUFBOUI7TUFBa0MsQ0FBQSxFQUFHLEtBQUssQ0FBQyxJQUFOLENBQVcsRUFBWCxDQUFyQztNQUFxRCxDQUFBLEVBQUcsS0FBSyxDQUFDLEdBQU4sQ0FBVSxFQUFWLENBQXhEO01BQ0EsS0FBQSxFQUFPLGFBQWEsQ0FBQyxLQUFNLENBQUEsSUFBQyxDQUFBLEtBQUQsQ0FEM0I7TUFDb0MsZUFBQSxFQUFpQixJQURyRDtNQUMyRCxhQUFBLEVBQWUsQ0FBQyxJQUQzRTtNQUVBLFFBQUEsRUFBVSxFQUZWO01BRWMsVUFBQSxFQUFZLEdBRjFCO01BRStCLFNBQUEsRUFBVyxRQUYxQztNQUVvRCxVQUFBLEVBQVksc0JBRmhFO01BR0EsSUFBQSxFQUFNLElBQUMsQ0FBQSxxQkFIUDtLQURvQjtJQU1yQixvQkFBQSxHQUF1QixJQUFJLEtBQUosQ0FDdEI7TUFBQSxNQUFBLEVBQVEsSUFBUjtNQUFXLEtBQUEsRUFBTyxHQUFsQjtNQUF1QixNQUFBLEVBQVEsSUFBQyxDQUFBLE1BQWhDO01BQXdDLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBakQ7TUFDQSxLQUFBLEVBQU8sYUFBYSxDQUFDLEtBRHJCO0tBRHNCO1dBSXZCLG1CQUFBLEdBQXNCLElBQUksS0FBSixDQUNyQjtNQUFBLE1BQUEsRUFBUSxJQUFSO01BQVcsS0FBQSxFQUFPLEdBQWxCO01BQXVCLE1BQUEsRUFBUSxJQUFDLENBQUEsTUFBaEM7TUFBd0MsQ0FBQSxFQUFHLEtBQUssQ0FBQyxLQUFqRDtNQUNBLEtBQUEsRUFBTyxhQUFhLENBQUMsbUJBQW9CLENBQUEsSUFBQyxDQUFBLEtBQUQsQ0FEekM7S0FEcUI7RUFiRDs7OztHQWpIZTs7QUFxSXRDLGFBQUEsR0FDQztFQUFBLEtBQUEsRUFDQztJQUFBLElBQUEsRUFBTSxNQUFOO0lBQ0EsS0FBQSxFQUFPLE1BRFA7R0FERDtFQUlBLG1CQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0seURBQU47SUFDQSxLQUFBLEVBQU8sMERBRFA7R0FMRDtFQU9BLHFCQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0sMkRBQU47SUFDQSxLQUFBLEVBQU8sNERBRFA7R0FSRDtFQVVBLHNCQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0sNERBQU47SUFDQSxLQUFBLEVBQU8sNkRBRFA7R0FYRDtFQWFBLDBCQUFBLEVBQ0M7SUFBQSxJQUFBLEVBQU0sZ0VBQU47SUFDQSxLQUFBLEVBQU8saUVBRFA7R0FkRDtFQW1CQSxLQUFBLEVBQU8sb0RBbkJQO0VBb0JBLEdBQUEsRUFBSyx3Q0FwQkw7Ozs7O0FDdElELElBQUEsV0FBQTtFQUFBOzs7O0FBQUMsY0FBZSxPQUFBLENBQVEsYUFBUjs7QUFHVixPQUFPLENBQUM7OztFQUNBLHVCQUFDLE9BQUQ7QUFFWixRQUFBO0lBRmEsSUFBQyxDQUFBLDRCQUFELFVBQVM7OztJQUV0QixhQUFBLEdBQWdCLElBQUksZUFBSixDQUNmO01BQUEsS0FBQSxFQUFPLEdBQVA7TUFDQSxNQUFBLEVBQVEsQ0FEUjtNQUVBLGNBQUEsRUFBZ0IsSUFGaEI7TUFHQSxnQkFBQSxFQUFrQixLQUhsQjtNQUlBLGlCQUFBLEVBQW1CLElBSm5CO01BS0EsZUFBQSxFQUFpQixNQUxqQjtLQURlO0lBUWhCLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBdEIsR0FBK0I7SUFDL0IsYUFBYSxDQUFDLGlCQUFkLEdBQWtDO0lBR2xDLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLFFBQUEsRUFBVSxhQUFWO01BQ0EsTUFBQSxFQUFRLENBRFI7S0FERDtJQUlBLCtDQUFNLElBQUMsQ0FBQSxPQUFQO0lBRUEsYUFBYSxDQUFDLE1BQWQsR0FBdUIsSUFBQyxDQUFBO0VBcEJaOztFQXVCYixhQUFDLENBQUEsTUFBRCxDQUFRLFVBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxRQUFULEdBQW9CO0lBQS9CLENBREw7R0FERDs7RUFJQSxhQUFDLENBQUEsTUFBRCxDQUFRLFFBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFBO2FBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQztJQUFaLENBQUw7SUFDQSxHQUFBLEVBQUssU0FBQyxLQUFEO2FBQVcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxNQUFULEdBQWtCO0lBQTdCLENBREw7R0FERDs7MEJBTUEsU0FBQSxHQUFXLFNBQUE7SUFDVixLQUFBLENBQU0sSUFBQyxDQUFBLElBQUksQ0FBQyxRQUFaO0lBQ0EsSUFBQyxDQUFBLFNBQUQsQ0FBVyxJQUFDLENBQUEsSUFBWjtJQUNBLElBQUMsQ0FBQSxRQUFRLENBQUMsTUFBVixHQUFtQixNQUFNLENBQUM7V0FDMUIsSUFBQyxDQUFBLFFBQVEsQ0FBQyxhQUFWLENBQUE7RUFKVTs7MEJBT1gsU0FBQSxHQUFXLFNBQUMsSUFBRCxFQUFPLEtBQVA7QUFDVixRQUFBOztNQURpQixRQUFROztJQUN6QixJQUFHLElBQUksQ0FBQyxJQUFMLEtBQWEsRUFBaEI7TUFBd0IsU0FBQSxHQUFZLFdBQXBDO0tBQUEsTUFBQTtNQUFvRCxTQUFBLEdBQVksSUFBSSxDQUFDLEtBQXJFOztJQUdBLGFBQUEsR0FBZ0IsSUFBSSxTQUFKLENBQ2Y7TUFBQSxNQUFBLEVBQVEsSUFBQyxDQUFBLFFBQVEsQ0FBQyxPQUFsQjtNQUNBLElBQUEsRUFBTSxLQUFBLENBQU0sS0FBQSxHQUFRLENBQWQsQ0FBZ0IsQ0FBQyxJQUFqQixDQUFzQixLQUF0QixDQUFBLEdBQStCLENBQUEsR0FBQSxHQUFJLFNBQUosQ0FEckM7TUFHQSxRQUFBLEVBQVUsRUFIVjtNQUlBLFVBQUEsRUFBWSxHQUpaO01BS0EsS0FBQSxFQUFPLE9BTFA7TUFPQSxPQUFBLEVBQVksU0FBQSxLQUFhLFVBQWhCLEdBQWdDLEdBQWhDLEdBQXlDLENBUGxEO01BUUEsTUFBQSxFQUFRLEVBUlI7TUFTQSxDQUFBLEVBQUcsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQVRiO01BV0EsZUFBQSxFQUFpQixJQVhqQjtNQVlBLE1BQUEsRUFDQztRQUFBLEtBQUEsRUFBTyxJQUFQO09BYkQ7S0FEZTtJQWdCaEIsYUFBYSxDQUFDLEtBQWQsQ0FBb0IsU0FBQTthQUNuQixLQUFBLENBQVMsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBZixHQUFvQixNQUFwQixHQUEwQixJQUFDLENBQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUF4QyxHQUEwQyxNQUExQyxHQUFnRCxJQUFDLENBQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUE5RCxHQUFnRSxTQUFoRSxHQUF5RSxJQUFDLENBQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUF2RixHQUE2RixHQUE3RixHQUFnRyxJQUFDLENBQUEsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUF0SDtJQURtQixDQUFwQjtJQUlBLElBQUMsQ0FBQSxRQUFRLENBQUMsTUFBVixJQUFvQjtJQUdwQixJQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBZCxHQUF1QixDQUExQjtNQUNDLFNBQUEsR0FBWSxLQUFBLEdBQVE7QUFDcEI7QUFBQTtXQUFBLHFDQUFBOztxQkFDQyxJQUFDLENBQUEsU0FBRCxDQUFXLFNBQVgsRUFBc0IsU0FBdEI7QUFERDtxQkFGRDs7RUEzQlU7Ozs7R0F6Q3dCOzs7O0FDSnBDLElBQUEsbUNBQUE7RUFBQTs7OztBQUFNOzs7RUFDUSxjQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUztJQUV0QixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBRUM7TUFBQSxRQUFBLEVBQVUsRUFBVjtNQUNBLE1BQUEsRUFBUSxHQURSO01BRUEsS0FBQSxFQUFPLE9BRlA7TUFHQSxNQUFBLEVBQVEsRUFIUjtNQUlBLGFBQUEsRUFBZSxHQUpmO01BS0EsYUFBQSxFQUFlLEdBTGY7S0FGRDtJQVNBLHNDQUFNLElBQUMsQ0FBQSxPQUFQO0lBRUEsSUFBQyxDQUFBLEtBQUQsR0FDQztNQUFBLGFBQUEsRUFBZSw4REFBZjtNQUNBLGFBQUEsRUFBZSxHQURmO01BRUEsK0JBQUEsRUFBaUMsNkNBRmpDO01BR0EsNEJBQUEsRUFBOEIsNkNBSDlCO01BSUEsMkJBQUEsRUFBNkIsNkNBSjdCO01BS0EsdUJBQUEsRUFBeUIsNkNBTHpCOztFQWRXOzs7O0dBREs7O0FBeUJiOzs7RUFDUSxvQkFBQyxPQUFEO0lBQUMsSUFBQyxDQUFBLDRCQUFELFVBQVM7Ozs7SUFFdEIsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUNDO01BQUEsS0FBQSxFQUFPO1FBQUUsTUFBQSxFQUFRLEdBQVY7UUFBZSxLQUFBLEVBQU8sR0FBdEI7T0FBUDtNQUNBLE9BQUEsRUFBUyxJQURUO0tBREQ7SUFLQSw0Q0FBTSxJQUFDLENBQUEsT0FBUDtJQUNBLElBQUMsQ0FBQSxLQUFELEdBQVM7TUFBQSxNQUFBLEVBQVEsU0FBUjs7SUFFVCxJQUFDLENBQUMsV0FBRixDQUFjLElBQUMsQ0FBQSxLQUFmO0lBQ0EsSUFBQyxDQUFDLFVBQUYsQ0FBYSxJQUFDLENBQUEsUUFBZDtJQUVBLElBQUMsQ0FBQSxXQUFELENBQWEsSUFBQyxDQUFBLEtBQWQ7RUFiWTs7dUJBaUJiLEtBQUEsR0FBTyxTQUFBO1dBQ04sSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUFDLENBQUEsS0FBSyxDQUFDO0VBRFo7O3VCQUVQLFFBQUEsR0FBVSxTQUFBO1dBQ1QsSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUFDLENBQUEsS0FBSyxDQUFDO0VBRFQ7O3VCQUdWLFdBQUEsR0FBYSxTQUFDLFFBQUQ7SUFDWixJQUFDLENBQUEsS0FBRCxHQUFTO0lBQ1QsSUFBQyxDQUFBLElBQUQsQ0FBTSxNQUFNLENBQUMsU0FBYjtXQUNBLElBQUMsQ0FBQSxJQUFELENBQU0sTUFBTSxDQUFDLFFBQWI7RUFIWTs7RUFNYixVQUFDLENBQUEsTUFBRCxDQUFRLFNBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsRUFBRCxDQUFJLE1BQU0sQ0FBQyxHQUFYLEVBQWdCLEtBQWhCO0lBQVgsQ0FBTDtHQUREOztFQUdBLFVBQUMsQ0FBQSxNQUFELENBQVEsT0FBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFDSixJQUFDLENBQUEsT0FBTyxDQUFDLEtBQVQsR0FBaUI7SUFEYixDQURMO0dBREQ7Ozs7R0FoQ3dCOztBQXVDbkI7OztFQUNRLGdCQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUzs7O0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLE9BQUEsRUFBUyxJQUFUO01BQ0EsTUFBQSxFQUFRLEVBRFI7TUFDWSxZQUFBLEVBQWMsQ0FEMUI7TUFFQSxPQUFBLEVBQVM7UUFBRSxHQUFBLEVBQUssQ0FBUDtRQUFVLE1BQUEsRUFBUSxDQUFsQjtRQUFxQixJQUFBLEVBQU0sQ0FBM0I7UUFBOEIsS0FBQSxFQUFPLENBQXJDO09BRlQ7TUFHQSxlQUFBLEVBQWlCLGlCQUhqQjtLQUREO0lBTUEsd0NBQU0sSUFBQyxDQUFBLE9BQVA7SUFDQSxJQUFDLENBQUEsUUFBRCxHQUFZLFNBQUEsR0FBQTtJQUNaLElBQUMsQ0FBQSxLQUFELEdBQVM7TUFBQSxNQUFBLEVBQVEsU0FBUjs7SUFFVCxJQUFDLENBQUMsV0FBRixDQUFjLElBQUMsQ0FBQSxLQUFmO0lBQ0EsSUFBQyxDQUFDLFVBQUYsQ0FBYSxJQUFDLENBQUEsUUFBZDtFQWJZOzttQkFlYixLQUFBLEdBQU8sU0FBQTtXQUNOLElBQUMsQ0FBQSxlQUFELEdBQW1CO0VBRGI7O21CQUVQLFFBQUEsR0FBVSxTQUFBO1dBQ1QsSUFBQyxDQUFBLGVBQUQsR0FBbUI7RUFEVjs7RUFHVixNQUFDLENBQUEsTUFBRCxDQUFRLFNBQVIsRUFDQztJQUFBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7YUFBVyxJQUFDLENBQUEsRUFBRCxDQUFJLE1BQU0sQ0FBQyxHQUFYLEVBQWdCLEtBQWhCO0lBQVgsQ0FBTDtHQUREOzs7O0dBckJvQjs7QUF5QmY7OztFQUNRLG1CQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUzs7O0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLFFBQUEsRUFBVSxJQUFWO0tBREQ7SUFHQSwyQ0FBTSxJQUFDLENBQUEsT0FBUDtFQUxZOztzQkFPYixLQUFBLEdBQU8sU0FBQTtXQUNOLElBQUMsQ0FBQSxlQUFELEdBQW1CO0VBRGI7O3NCQUVQLFFBQUEsR0FBVSxTQUFBO0lBQ1QsSUFBRyxJQUFDLENBQUEsUUFBSjthQUFrQixJQUFDLENBQUEsZUFBRCxHQUFtQixrQkFBckM7S0FBQSxNQUFBO2FBQ0ssSUFBQyxDQUFBLGVBQUQsR0FBbUIsa0JBRHhCOztFQURTOztFQUlWLFNBQUMsQ0FBQSxNQUFELENBQVEsVUFBUixFQUNDO0lBQUEsR0FBQSxFQUFLLFNBQUE7YUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDO0lBQVosQ0FBTDtJQUNBLEdBQUEsRUFBSyxTQUFDLEtBQUQ7TUFDSixJQUFDLENBQUEsT0FBTyxDQUFDLFFBQVQsR0FBb0I7TUFDcEIsSUFBRyxLQUFIO2VBQWMsSUFBQyxDQUFBLGVBQUQsR0FBbUIsa0JBQWpDO09BQUEsTUFBQTtlQUNLLElBQUMsQ0FBQSxlQUFELEdBQW1CLGtCQUR4Qjs7SUFGSSxDQURMO0dBREQ7Ozs7R0FkdUI7O0FBbU14QixNQUFNLENBQUMsT0FBUCxHQUFpQjtFQUFDLE1BQUEsSUFBRDtFQUFPLFlBQUEsVUFBUDtFQUFtQixRQUFBLE1BQW5CO0VBQTJCLFdBQUEsU0FBM0I7Ozs7O0FDM1JqQixJQUFBLDZCQUFBO0VBQUE7Ozs7QUFBQyxhQUFjLE9BQUEsQ0FBUSxZQUFSOztBQUNmLE1BQWlCLE9BQUEsQ0FBUSxZQUFSLENBQWpCLEVBQUMsZUFBRCxFQUFPOztBQUVELE9BQU8sQ0FBQzs7O0VBQ0EsbUJBQUMsT0FBRDtJQUFDLElBQUMsQ0FBQSw0QkFBRCxVQUFTOzs7O0lBRXRCLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLE1BQUEsRUFBUSxHQUFSO01BQWEsQ0FBQSxFQUFHLEtBQUssQ0FBQyxNQUFOLENBQWEsQ0FBQyxDQUFkLENBQWhCO01BQ0EsZUFBQSxFQUFpQixJQURqQjtNQUdBLElBQUEsRUFBTSxJQUhOO0tBREQ7SUFNQSwyQ0FBTSxJQUFDLENBQUEsT0FBUDtJQUNBLElBQUMsQ0FBQSxvQkFBRCxDQUFBO0VBVFk7O0VBWWIsU0FBQyxDQUFBLE1BQUQsQ0FBUSxNQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxHQUFnQjtJQUEzQixDQURMO0dBREQ7O3NCQUtBLG9CQUFBLEdBQXNCLFNBQUE7QUFDckIsUUFBQTtJQUFBLFdBQUEsR0FBYztXQUVkLE1BQU0sQ0FBQyxFQUFQLENBQVUsZUFBVixFQUEyQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7ZUFBRyxXQUFXLENBQUMsQ0FBWixHQUFnQixLQUFLLENBQUMsTUFBTixDQUFhLENBQUMsQ0FBZDtNQUFuQjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBM0I7RUFIcUI7O3NCQVF0QixVQUFBLEdBQVksU0FBQyxXQUFEO0FBQ1gsUUFBQTs7TUFEWSxjQUFjOztJQUMxQixXQUFBLEdBQWMsSUFBSSxLQUFKLENBQ2I7TUFBQSxNQUFBLEVBQVEsSUFBUjtNQUNBLEtBQUEsRUFBTyxHQURQO01BQ1ksTUFBQSxFQUFRLEdBRHBCO01BQ3lCLGVBQUEsRUFBaUIsSUFEMUM7TUFFQSxDQUFBLEVBQUcsRUFGSDtNQUVPLENBQUEsRUFBRyxLQUFLLENBQUMsTUFBTixDQUFBLENBRlY7S0FEYTtJQUtkLElBQUMsQ0FBQSxlQUFELENBQWlCLFdBQWpCLEVBQThCLFNBQTlCO0lBQ0EsV0FBVyxDQUFDLEtBQVosR0FBb0I7TUFBQSxNQUFBLEVBQVEsU0FBUjs7SUFDcEIsV0FBVyxDQUFDLEtBQVosQ0FBa0IsU0FBQSxHQUFBLENBQWxCO0lBQ0EsV0FBVyxDQUFDLFFBQVosR0FBdUIsU0FBQSxHQUFBO0lBRXZCLElBQUEsR0FBTztBQUNQLFNBQUEscURBQUE7O01BQ0MsYUFBQSxHQUFnQixJQUFDLENBQUEsZUFBRCxDQUFpQixVQUFqQixFQUE2QixDQUE3QjtNQUNoQixhQUFhLENBQUMsTUFBZCxHQUF1QjtNQUN2QixhQUFhLENBQUMsQ0FBZCxHQUFrQjtNQUNsQixJQUFBLElBQVEsYUFBYSxDQUFDLEtBQWQsR0FBc0IsQ0FBdEIsR0FBMEI7QUFKbkM7V0FNQSxJQUFDLENBQUEsS0FBRCxHQUFTLElBQUksQ0FBQyxHQUFMLENBQVMsSUFBQyxDQUFBLEtBQVYsRUFBaUIsSUFBakI7RUFsQkU7O3NCQXVCWixlQUFBLEdBQWlCLFNBQUMsVUFBRCxFQUFhLEtBQWI7QUFDaEIsUUFBQTtJQUFBLFdBQUEsR0FBYyxJQUFJLE1BQUosQ0FDYjtNQUFBLElBQUEsRUFBTSxVQUFVLENBQUMsS0FBakI7TUFDQSxDQUFBLEVBQUcsRUFESDtNQUVBLFFBQUEsRUFBYSxLQUFBLEtBQVMsQ0FBWixHQUFtQixJQUFuQixHQUE2QixLQUZ2QztNQUdBLE1BQUEsRUFDQztRQUFBLFVBQUEsRUFBWSxVQUFaO09BSkQ7S0FEYTtJQU9kLGNBQUEsR0FBaUIsU0FBQTthQUNoQixJQUFDLENBQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFuQixDQUEyQixJQUFDLENBQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUE5QyxFQUFvRCxJQUFwRDtJQURnQjtJQUdqQixXQUFXLENBQUMsRUFBWixDQUFlLE1BQU0sQ0FBQyxHQUF0QixFQUEyQixjQUEzQjtBQUNBLFdBQU87RUFaUzs7OztHQWpEYzs7OztBQ0ZoQyxJQUFBLG9CQUFBO0VBQUE7Ozs7QUFBQSxNQUFvQixPQUFBLENBQVEsWUFBUixDQUFwQixFQUFDLGVBQUQsRUFBTzs7QUFFRCxPQUFPLENBQUM7OztFQUNBLG9CQUFDLE9BQUQ7SUFBQyxJQUFDLENBQUEsNEJBQUQsVUFBUzs7OztJQUV0QixDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxLQUFBLEVBQU8sR0FBUDtNQUFZLE1BQUEsRUFBUSxNQUFNLENBQUMsTUFBM0I7TUFBbUMsQ0FBQSxFQUFHLEdBQXRDO01BQ0EsZUFBQSxFQUFpQixJQURqQjtLQUREO0lBSUEsNENBQU0sSUFBQyxDQUFBLE9BQVA7RUFOWTs7dUJBU2IsVUFBQSxHQUFZLFNBQUMsS0FBRCxFQUFRLFdBQVI7QUFFWCxRQUFBOztNQUZtQixjQUFjOztJQUVqQyxXQUFBLEdBQWMsSUFBSSxLQUFKLENBQ2I7TUFBQSxNQUFBLEVBQVEsSUFBUjtNQUNBLEtBQUEsRUFBTyxHQURQO01BQ1ksTUFBQSxFQUFRLEdBRHBCO01BQ3lCLGVBQUEsRUFBaUIsSUFEMUM7TUFFQSxDQUFBLEVBQUcsRUFGSDtNQUVPLENBQUEsRUFBRyxJQUFDLENBQUEsUUFBUSxDQUFDLE1BQVYsR0FBbUIsR0FGN0I7S0FEYTtJQUtkLElBQUMsQ0FBQSxlQUFELENBQWlCLFdBQWpCLEVBQThCLEtBQTlCO0lBRUEsV0FBVyxDQUFDLEtBQVosR0FBb0I7TUFBQSxNQUFBLEVBQVEsU0FBUjs7SUFDcEIsV0FBVyxDQUFDLEtBQVosQ0FBa0IsU0FBQSxHQUFBLENBQWxCO0lBQ0EsV0FBVyxDQUFDLFFBQVosR0FBdUIsU0FBQSxHQUFBO0lBRXZCLElBQUEsR0FBTztBQUNQLFNBQUEscURBQUE7O01BQ0MsYUFBQSxHQUFnQixJQUFDLENBQUEsZUFBRCxDQUFpQixVQUFqQixFQUE2QixDQUE3QjtNQUNoQixhQUFhLENBQUMsTUFBZCxHQUF1QjtNQUN2QixhQUFhLENBQUMsQ0FBZCxHQUFrQjtNQUNsQixJQUFBLElBQVEsYUFBYSxDQUFDLEtBQWQsR0FBc0I7QUFKL0I7V0FNQSxJQUFDLENBQUEsS0FBRCxHQUFTLElBQUksQ0FBQyxHQUFMLENBQVMsSUFBQyxDQUFBLEtBQVYsRUFBaUIsSUFBakI7RUFwQkU7O3VCQXdCWixlQUFBLEdBQWlCLFNBQUMsVUFBRCxFQUFhLEtBQWI7QUFDaEIsUUFBQTtJQUFBLFdBQUEsR0FBYyxJQUFJLFNBQUosQ0FDYjtNQUFBLElBQUEsRUFBTSxVQUFVLENBQUMsS0FBakI7TUFDQSxDQUFBLEVBQUcsRUFESDtNQUVBLFFBQUEsRUFBYSxLQUFBLEtBQVMsQ0FBWixHQUFtQixJQUFuQixHQUE2QixLQUZ2QztNQUdBLE1BQUEsRUFDQztRQUFBLFVBQUEsRUFBWSxVQUFaO09BSkQ7S0FEYTtJQU9kLGNBQUEsR0FBaUIsU0FBQTtBQUNoQixVQUFBO01BQUEsSUFBQyxDQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBbkIsQ0FBMkIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBOUMsRUFBb0QsSUFBcEQ7QUFDQTtBQUFBO1dBQUEsc0NBQUE7O1FBQ0MsSUFBRyxNQUFNLENBQUMsSUFBUCxLQUFpQixlQUFwQjtVQUNDLElBQTBCLE1BQUEsS0FBVSxJQUFwQztZQUFBLE1BQU0sQ0FBQyxRQUFQLEdBQWtCLEtBQWxCOztVQUNBLElBQTJCLE1BQUEsS0FBWSxJQUF2Qzt5QkFBQSxNQUFNLENBQUMsUUFBUCxHQUFrQixPQUFsQjtXQUFBLE1BQUE7aUNBQUE7V0FGRDtTQUFBLE1BQUE7K0JBQUE7O0FBREQ7O0lBRmdCO0lBT2pCLFdBQVcsQ0FBQyxFQUFaLENBQWUsTUFBTSxDQUFDLEdBQXRCLEVBQTJCLGNBQTNCO0FBQ0EsV0FBTztFQWhCUzs7dUJBbUJqQixlQUFBLEdBQWlCLFNBQUMsV0FBRCxFQUFjLEtBQWQ7O01BQWMsUUFBUTs7V0FDdEMsSUFBSSxJQUFKLENBQ0M7TUFBQSxNQUFBLEVBQVEsV0FBUjtNQUNBLElBQUEsRUFBTSxLQUROO01BQ2EsSUFBQSxFQUFNLGVBRG5CO01BRUEsUUFBQSxFQUFVLEVBRlY7TUFFYyxPQUFBLEVBQVMsR0FGdkI7TUFFNEIsT0FBQSxFQUFTO1FBQUUsR0FBQSxFQUFLLEVBQVA7T0FGckM7S0FERDtFQURnQjs7OztHQXJEZTs7OztBQ0FqQyxJQUFBOzs7O0FBQU0sT0FBTyxDQUFDOzs7RUFDQSx1QkFBQyxPQUFEO0FBRVosUUFBQTtJQUZhLElBQUMsQ0FBQSw0QkFBRCxVQUFTOzs7SUFFdEIsYUFBQSxHQUFnQixJQUFJLGVBQUosQ0FDZjtNQUFBLEtBQUEsRUFBTyxHQUFQO01BQ0EsTUFBQSxFQUFRLENBRFI7TUFFQSxjQUFBLEVBQWdCLElBRmhCO01BR0EsZ0JBQUEsRUFBa0IsS0FIbEI7TUFJQSxpQkFBQSxFQUFtQixJQUpuQjtNQUtBLGVBQUEsRUFBaUIsTUFMakI7S0FEZTtJQVFoQixhQUFhLENBQUMsT0FBTyxDQUFDLE1BQXRCLEdBQStCO0lBQy9CLGFBQWEsQ0FBQyxpQkFBZCxHQUFrQztJQUdsQyxDQUFDLENBQUMsUUFBRixDQUFXLElBQUMsQ0FBQSxPQUFaLEVBQ0M7TUFBQSxRQUFBLEVBQVUsYUFBVjtNQUNBLE1BQUEsRUFBUSxDQURSO0tBREQ7SUFJQSwrQ0FBTSxJQUFDLENBQUEsT0FBUDtJQUVBLGFBQWEsQ0FBQyxNQUFkLEdBQXVCLElBQUMsQ0FBQTtFQXBCWjs7RUF1QmIsYUFBQyxDQUFBLE1BQUQsQ0FBUSxVQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsUUFBVCxHQUFvQjtJQUEvQixDQURMO0dBREQ7O0VBSUEsYUFBQyxDQUFBLE1BQUQsQ0FBUSxRQUFSLEVBQ0M7SUFBQSxHQUFBLEVBQUssU0FBQTthQUFHLElBQUMsQ0FBQSxPQUFPLENBQUM7SUFBWixDQUFMO0lBQ0EsR0FBQSxFQUFLLFNBQUMsS0FBRDthQUFXLElBQUMsQ0FBQSxPQUFPLENBQUMsTUFBVCxHQUFrQjtJQUE3QixDQURMO0dBREQ7OzBCQU1BLFNBQUEsR0FBVyxTQUFBO0lBQ1YsS0FBQSxDQUFNLElBQUMsQ0FBQSxJQUFJLENBQUMsUUFBWjtJQUNBLElBQUMsQ0FBQSxTQUFELENBQVcsSUFBQyxDQUFBLElBQVo7SUFDQSxJQUFDLENBQUEsUUFBUSxDQUFDLE1BQVYsR0FBbUIsTUFBTSxDQUFDO1dBQzFCLElBQUMsQ0FBQSxRQUFRLENBQUMsYUFBVixDQUFBO0VBSlU7OzBCQU9YLFNBQUEsR0FBVyxTQUFDLElBQUQsRUFBTyxLQUFQO0FBQ1YsUUFBQTs7TUFEaUIsUUFBUTs7SUFDekIsSUFBRyxJQUFJLENBQUMsSUFBTCxLQUFhLEVBQWhCO01BQXdCLFNBQUEsR0FBWSxXQUFwQztLQUFBLE1BQUE7TUFBb0QsU0FBQSxHQUFZLElBQUksQ0FBQyxLQUFyRTs7SUFHQSxhQUFBLEdBQWdCLElBQUksU0FBSixDQUNmO01BQUEsTUFBQSxFQUFRLElBQUMsQ0FBQSxRQUFRLENBQUMsT0FBbEI7TUFDQSxJQUFBLEVBQU0sS0FBQSxDQUFNLEtBQUEsR0FBUSxDQUFkLENBQWdCLENBQUMsSUFBakIsQ0FBc0IsS0FBdEIsQ0FBQSxHQUErQixDQUFBLEdBQUEsR0FBSSxTQUFKLENBRHJDO01BR0EsUUFBQSxFQUFVLEVBSFY7TUFJQSxVQUFBLEVBQVksR0FKWjtNQUtBLEtBQUEsRUFBTyxPQUxQO01BT0EsT0FBQSxFQUFZLFNBQUEsS0FBYSxVQUFoQixHQUFnQyxHQUFoQyxHQUF5QyxDQVBsRDtNQVFBLE1BQUEsRUFBUSxFQVJSO01BU0EsQ0FBQSxFQUFHLElBQUMsQ0FBQSxRQUFRLENBQUMsTUFUYjtNQVdBLGVBQUEsRUFBaUIsSUFYakI7TUFZQSxNQUFBLEVBQ0M7UUFBQSxLQUFBLEVBQU8sSUFBUDtPQWJEO0tBRGU7SUFnQmhCLGFBQWEsQ0FBQyxLQUFkLENBQW9CLFNBQUE7YUFDbkIsS0FBQSxDQUFTLElBQUMsQ0FBQSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQWYsR0FBb0IsTUFBcEIsR0FBMEIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBeEMsR0FBMEMsTUFBMUMsR0FBZ0QsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBOUQsR0FBZ0UsU0FBaEUsR0FBeUUsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBdkYsR0FBNkYsR0FBN0YsR0FBZ0csSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBdEg7SUFEbUIsQ0FBcEI7SUFJQSxJQUFDLENBQUEsUUFBUSxDQUFDLE1BQVYsSUFBb0I7SUFHcEIsSUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQWQsR0FBdUIsQ0FBMUI7TUFDQyxTQUFBLEdBQVksS0FBQSxHQUFRO0FBQ3BCO0FBQUE7V0FBQSxxQ0FBQTs7cUJBQ0MsSUFBQyxDQUFBLFNBQUQsQ0FBVyxTQUFYLEVBQXNCLFNBQXRCO0FBREQ7cUJBRkQ7O0VBM0JVOzs7O0dBekN3Qjs7OztBQ0RwQyxPQUFPLENBQUMsS0FBUixHQUFnQjs7QUFFaEIsT0FBTyxDQUFDLFVBQVIsR0FBcUIsU0FBQTtTQUNwQixLQUFBLENBQU0sdUJBQU47QUFEb0I7O0FBR3JCLE9BQU8sQ0FBQyxPQUFSLEdBQWtCLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXG5cbmNsYXNzIGV4cG9ydHMuQnV0dG9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdGd1YXJkID0gbmV3IExheWVyIHsgc2l6ZTogMTAsIGJhY2tncm91bmRDb2xvcjogXCJudWxsXCIgfVxuXHRcdFxuXHRcdGd1YXJkLnN0YXRlcyA9XG5cdFx0XHRcInByZXNzZWRcIjogeyBvcGFjaXR5OiAwIH1cblx0XHRcdFwibm9ybWFsXCI6IHsgb3BhY2l0eTogMCB9XG5cdFx0XG5cdFx0Z3VhcmQub24gRXZlbnRzLlN0YXRlU3dpdGNoRW5kLCAoZnJvbSwgdG8pIC0+XG5cdFx0XHRpZiBmcm9tICE9IHRvIHRoZW4gQHBhcmVudC5hbmltYXRlKHRvKVxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGhhbmRsZXI6IG51bGxcblx0XHRcdGd1YXJkOiBudWxsXG5cdFx0XHRzY2FsZVRvOiAwLjlcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAc3RhdGVzID1cblx0XHRcdFwicHJlc3NlZFwiOiB7IHNjYWxlOiBAc2NhbGVUbyB9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IHNjYWxlOiAxLjAgfVxuXHRcdFxuXHRcdGd1YXJkLnBhcmVudCA9IEBcblx0XHRAZ3VhcmQgPSBndWFyZFxuXHRcdFxuXHRcdEAub25Ub3VjaFN0YXJ0IEBIb3ZlclxuXHRcdEAub25Ub3VjaEVuZCBASG92ZXJPZmZcblx0XHRALm9uU3dpcGVTdGFydCBASG92ZXJPZmZcblx0XHRALm9uRHJhZ1N0YXJ0IEBIb3Zlck9mZlxuXHRcblx0SG92ZXI6ID0+IEBndWFyZC5zdGF0ZVN3aXRjaChcInByZXNzZWRcIilcblx0SG92ZXJPZmY6ID0+IEBndWFyZC5zdGF0ZVN3aXRjaChcIm5vcm1hbFwiKVxuXG5cblxuXHRAZGVmaW5lICdndWFyZCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ndWFyZFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ndWFyZCA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdzY2FsZVRvJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNjYWxlVG9cblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2NhbGVUbyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdoYW5kbGVyJyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9uKEV2ZW50cy5UYXAsIHZhbHVlKVxuXG4iLCJcblxue1NlY3Rpb25WaWV3fSA9IHJlcXVpcmUgXCJTZWN0aW9uVmlld1wiXG57VGV4dCwgQnV0dG9ufSA9IHJlcXVpcmUgXCJQQ0J1dHRvbnNcIlxuXG5jbGFzcyBleHBvcnRzLkNvbmZpZ1ZpZXcgZXh0ZW5kcyBTZWN0aW9uVmlld1xuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRoZWlnaHQ6IDEwMFxuXHRcdFx0eTogQWxpZ24uYm90dG9tKC04KVxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHQjIE92ZXJyaWRlXG5cdGFkZFNlY3Rpb246IChhY3Rpb25BcnJheSA9IFtdKSA9PlxuXHRcdGlmICFVdGlscy5pc01vYmlsZSgpXG5cdFx0XHRzZWN0aW9uVmlldyA9IG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IEBcblx0XHRcdFx0d2lkdGg6IDM2MCwgaGVpZ2h0OiAxMDAsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0XHR4OiAzMiwgeTogQWxpZ24uYm90dG9tKClcblxuXHRcdFx0QGFkZFNlY3Rpb25UaXRsZShzZWN0aW9uVmlldywgXCJQcmV2aWV3IFNldHRpbmdzXCIpXG5cdFx0XHRzZWN0aW9uVmlldy5zdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcdHNlY3Rpb25WaWV3Lm9uVGFwIC0+IDtcblx0XHRcdHNlY3Rpb25WaWV3LnNob3dIaW50ID0gLT4gO1xuXG5cdFx0XHRzdW1YID0gMFxuXHRcdFx0Zm9yIGFjdGlvbkl0ZW0sIGkgaW4gYWN0aW9uQXJyYXlcblx0XHRcdFx0c2VjdGlvbkJ1dHRvbiA9IEBhZGRBY3Rpb25CdXR0b24oYWN0aW9uSXRlbSwgaSlcblx0XHRcdFx0c2VjdGlvbkJ1dHRvbi5wYXJlbnQgPSBzZWN0aW9uVmlld1xuXHRcdFx0XHRzZWN0aW9uQnV0dG9uLnggPSBzdW1YXG5cdFx0XHRcdHN1bVggKz0gc2VjdGlvbkJ1dHRvbi53aWR0aCArIDggKyA0XG5cdFx0XHRcblx0XHRcdEB3aWR0aCA9IE1hdGgubWF4KEB3aWR0aCwgc3VtWClcblx0XG5cblxuXHQjICMgT3ZlcnJpZGVcblx0YWRkQWN0aW9uQnV0dG9uOiAoYWN0aW9uSXRlbSwgaW5kZXgpID0+XG5cdFx0YnV0dG9uTGF5ZXIgPSBuZXcgQnV0dG9uXG5cdFx0XHR0ZXh0OiBhY3Rpb25JdGVtLnRpdGxlXG5cdFx0XHR5OiA0MlxuXHRcdFx0c2VsZWN0ZWQ6IGlmIGluZGV4IGlzIDAgdGhlbiB0cnVlIGVsc2UgZmFsc2Vcblx0XHRcdGN1c3RvbTpcblx0XHRcdFx0YWN0aW9uSXRlbTogYWN0aW9uSXRlbVxuXHRcdFxuXHRcdGNvbXBsZXhIYW5kbGVyID0gKCkgLT5cblx0XHRcdEBjdXN0b20uYWN0aW9uSXRlbS5oYW5kbGVyKEBjdXN0b20uYWN0aW9uSXRlbS5kYXRhLCBAKVxuXG5cdFx0YnV0dG9uTGF5ZXIub24oRXZlbnRzLlRhcCwgY29tcGxleEhhbmRsZXIpXG5cdFx0cmV0dXJuIGJ1dHRvbkxheWVyIiwiXG5cbntTY2FsZVZpZXd9ID0gcmVxdWlyZSBcIlNjYWxlVmlld1wiXG5cblxuY2xhc3MgZXhwb3J0cy5EZXZpY2VWaWV3IGV4dGVuZHMgU2NhbGVWaWV3XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0Ym9yZGVyVmlldzogbnVsbFxuXHRcdFx0c2hvd0RldmljZTogdHJ1ZVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAYm9yZGVyVmlldyA9IG5ldyBMYXllclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIjAwMFwiXG5cdFx0XHRib3JkZXJSYWRpdXM6IEBib3JkZXJSYWRpdXMgKyAxNlxuXHRcdFx0b3BhY2l0eTogMVxuXG5cdFx0QGJvcmRlclZpZXcuc2VuZFRvQmFjaygpXG5cblx0XHRAaW5pdEJvcmRlclZpZXdDc3MoKVxuXHRcdEB1cGRhdGVCb3JkZXJWaWV3KClcblxuXHRcdEBvbiBcImNoYW5nZTpzaXplXCIsIC0+XG5cdFx0XHRAdXBkYXRlQm9yZGVyVmlldygpXG5cdFx0XG5cdFx0QG9uIFwiY2hhbmdlOnNjYWxlXCIsIC0+XG5cdFx0XHRAdXBkYXRlQm9yZGVyVmlldygpXG5cdFx0XG5cdFx0QG9uIFwiY2hhbmdlOnhcIiwgLT5cblx0XHRcdEB1cGRhdGVCb3JkZXJWaWV3KClcblx0XHRcblx0XHRAb24gXCJjaGFuZ2U6eVwiLCAtPlxuXHRcdFx0QHVwZGF0ZUJvcmRlclZpZXcoKVxuXHRcdFxuXG5cdEBkZWZpbmUgJ2JvcmRlclZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYm9yZGVyVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ib3JkZXJWaWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3Nob3dEZXZpY2UnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2hvd0RldmljZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zaG93RGV2aWNlID0gdmFsdWVcblx0XG5cdFxuXG5cblx0c2hvd0JvcmRlclZpZXc6ICgpID0+XG5cdFx0QGJvcmRlclZpZXcub3BhY2l0eSA9IDFcblx0XG5cdGhpZGVCb3JkZXJWaWV3OiAoKSA9PlxuXHRcdEBib3JkZXJWaWV3Lm9wYWNpdHkgPSAwXG5cblxuXHR1cGRhdGVCb3JkZXJWaWV3OiAoKSA9PlxuXHRcdGRlbHRhRyA9IDE2XG5cblx0XHRAYm9yZGVyVmlldy53aWR0aCA9IEB3aWR0aCArIGRlbHRhRyAqIDJcblx0XHRAYm9yZGVyVmlldy5oZWlnaHQgPSBAaGVpZ2h0ICsgZGVsdGFHICogMlxuXHRcdEBib3JkZXJWaWV3LnggPSBBbGlnbi5jZW50ZXIoKVxuXHRcdEBib3JkZXJWaWV3LnkgPSBBbGlnbi5jZW50ZXIoKVxuXHRcdEBib3JkZXJWaWV3LnNjYWxlID0gQHNjYWxlXG5cdFx0XG5cdFxuXHRpbml0Qm9yZGVyVmlld0NzczogKCkgPT5cblx0XHRAYm9yZGVyVmlldy5jbGFzc0xpc3QuYWRkKFwiaXBob25lLXRpbGxsdXItdlwiKVxuIFxuXHRcdGNzcyA9IFwiXCJcIlxuXHRcdC5pcGhvbmUtdGlsbGx1ci12IHtcblx0XHRcdGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcblx0XHRcdDE2MC43NGRlZyxcblx0XHRcdHJnYmEoMzYsIDM2LCAzNiwgMC4zKSAyNC4zOSUsXG5cdFx0XHRyZ2JhKDI4LCAyOCwgMjgsIDAuMykgMjkuNDclLFxuXHRcdFx0cmdiYSgxMCwgMTAsIDEwLCAwLjMpIDk5Ljg1JVxuXHRcdFx0KSxcblx0XHRcdGxpbmVhci1ncmFkaWVudChcblx0XHRcdDE4MGRlZyxcblx0XHRcdHJnYmEoMiwgMiwgMiwgMC42KSAtMC4yMSUsXG5cdFx0XHRyZ2JhKDIxLCAyMSwgMjEsIDAuNikgNi41MiUsXG5cdFx0XHRyZ2JhKDYsIDYsIDYsIDAuNikgOTkuNzklXG5cdFx0XHQpLFxuXHRcdFx0IzVhNWE1YTtcblx0XHRib3gtc2hhZG93OiA4cHggMTRweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4yNSksXG5cdFx0XHRpbnNldCAwcHggLTRweCAxNnB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSxcblx0XHRcdGluc2V0IDRweCAwcHggNHB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSxcblx0XHRcdGluc2V0IC00cHggMHB4IDRweCByZ2JhKDAsIDAsIDAsIDAuNyk7XG5cblx0XHR9XG5cdFx0XCJcIlwiXG5cdFx0XG5cdFx0VXRpbHMuaW5zZXJ0Q1NTKGNzcykiLCJcbmNsYXNzIGV4cG9ydHMuRGV2aWNlX0NsYXNzIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiMDAwXCJcblx0XHRcdHZpZXc6IG51bGxcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHQjIHVwZGF0ZSBmcm9tIHBhcmVudFxuXHRcdEBzdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBzY2FsZTogMSB9XG5cdFx0XHRcImZpbGxcIjogeyBzY2FsZTogMSB9XG5cblx0XHRAaW5pdEJvcmRlclZpZXdDc3MoKVxuXHRcdEBzZW5kVG9CYWNrKClcblx0XG5cblxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnZpZXcgPSB2YWx1ZVxuXHRcdFx0QG9wdGlvbnMud2lkdGggPSB2YWx1ZS53aWR0aCArIDE2ICogMlxuXHRcdFx0QG9wdGlvbnMuaGVpZ2h0ID0gdmFsdWUuaGVpZ2h0ICsgMTYgKiAyXG5cdFx0XHRAYm9yZGVyUmFkaXVzID0gdmFsdWUuYm9yZGVyUmFkaXVzICsgMTZcblxuXHRzdGF0ZVN3aXRjaFRvTm9ybWFsOiAoKSA9PlxuXHRcdEBhbmltYXRlKHNjYWxlOiBAc3RhdGVzW1wibm9ybWFsXCJdLnNjYWxlLCBvcHRpb25zOiB7IGN1cnZlOiBCZXppZXIubGluZWFyLCB0aW1lOiAwIH0pXG5cdFxuXHRzdGF0ZVN3aXRjaFRvRmlsbDogKCkgPT5cblx0XHRAYW5pbWF0ZShzY2FsZTogQHN0YXRlc1tcImZpbGxcIl0uc2NhbGUsIG9wdGlvbnM6IHsgY3VydmU6IEJlemllci5saW5lYXIsIHRpbWU6IDAgfSlcblxuXHRhbmltYXRlU3RhdGVUb05vcm1hbDogKCkgPT5cblx0XHRAYW5pbWF0ZShzY2FsZTogQHN0YXRlc1tcIm5vcm1hbFwiXS5zY2FsZSwgb3B0aW9uczogeyBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUgfSlcblx0XG5cdGFuaW1hdGVTdGF0ZVRvRmlsbDogKCkgPT5cblx0XHRAYW5pbWF0ZShzY2FsZTogQHN0YXRlc1tcImZpbGxcIl0uc2NhbGUsIG9wdGlvbnM6IHsgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41IH0pXG5cblxuXG5cdGluaXRCb3JkZXJWaWV3Q3NzOiAoKSA9PlxuXHRcdEBjbGFzc0xpc3QuYWRkKFwiaXBob25lLXRpbGxsdXItdlwiKVxuIFxuXHRcdGNzcyA9IFwiXCJcIlxuXHRcdC5pcGhvbmUtdGlsbGx1ci12IHtcblx0XHRcdGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcblx0XHRcdDE2MC43NGRlZyxcblx0XHRcdHJnYmEoMzYsIDM2LCAzNiwgMC4zKSAyNC4zOSUsXG5cdFx0XHRyZ2JhKDI4LCAyOCwgMjgsIDAuMykgMjkuNDclLFxuXHRcdFx0cmdiYSgxMCwgMTAsIDEwLCAwLjMpIDk5Ljg1JVxuXHRcdFx0KSxcblx0XHRcdGxpbmVhci1ncmFkaWVudChcblx0XHRcdDE4MGRlZyxcblx0XHRcdHJnYmEoMiwgMiwgMiwgMC42KSAtMC4yMSUsXG5cdFx0XHRyZ2JhKDIxLCAyMSwgMjEsIDAuNikgNi41MiUsXG5cdFx0XHRyZ2JhKDYsIDYsIDYsIDAuNikgOTkuNzklXG5cdFx0XHQpLFxuXHRcdFx0IzVhNWE1YTtcblx0XHRib3gtc2hhZG93OiA4cHggMTRweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4yNSksXG5cdFx0XHRpbnNldCAwcHggLTRweCAxNnB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSxcblx0XHRcdGluc2V0IDRweCAwcHggNHB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSxcblx0XHRcdGluc2V0IC00cHggMHB4IDRweCByZ2JhKDAsIDAsIDAsIDAuNyk7XG5cblx0XHR9XG5cdFx0XCJcIlwiXG5cdFx0XG5cdFx0VXRpbHMuaW5zZXJ0Q1NTKGNzcykiLCJcblxueyBEZXZpY2VfQ2xhc3MgfSA9IHJlcXVpcmUgXCJEZXZpY2VfQ2xhc3NcIlxuXG5jbGFzcyBleHBvcnRzLkRldmljZV9Jbml0IGV4dGVuZHMgRGV2aWNlX0NsYXNzXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0dmlzaWJsZTogQHZpZXcuZGV2aWNlQ29uZmlnLmVuYWJsZWRcblx0XHRcdGZvcmNlQW5kcm9pZEJhcjogQHZpZXcuZGV2aWNlQ29uZmlnLmZvcmNlX0FuZHJvaWRCYXJcblx0XHRcdHN0YXR1c0JhcjogQHZpZXcuZGV2aWNlQ29uZmlnLnN0YXR1c0Jhcl90aGVtZVxuXHRcdFx0aG9tZUJhcjogQHZpZXcuZGV2aWNlQ29uZmlnLmhvbWVCYXJfdGhlbWVcblx0XHRcdFxuXHRcdFx0cHJvdG90eXBlQ3JlYXRpb25ZZWFyOiBAdmlldy50aW1lVmFsdWVcblxuXHRcdFx0IyBnZXR0ZXJzXG5cdFx0XHRzdGF0dXNCYXJWaWV3OiBudWxsXG5cdFx0XHRob21lQmFyVmlldzogbnVsbFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAY3JlYXRlQmFycygpXG5cblxuXG5cdCMgZGVwcmVjYXRlZFxuXHRAZGVmaW5lICd2aXNpYmxlJyxcblx0XHRnZXQ6IC0+IGlmIEBvcHRpb25zLnZpc2libGUgdGhlbiByZXR1cm4gMSBlbHNlIHJldHVybiAwXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnZpc2libGUgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnZm9yY2VBbmRyb2lkQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZEJhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRCYXIgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgJ3N0YXR1c0JhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zdGF0dXNCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc3RhdHVzQmFyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2hvbWVCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaG9tZUJhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ob21lQmFyID0gdmFsdWVcblxuXHRAZGVmaW5lICdwcm90b3R5cGVDcmVhdGlvblllYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnByb3RvdHlwZUNyZWF0aW9uWWVhciA9IHZhbHVlXG5cblxuXG5cblxuXHRAZGVmaW5lICdzdGF0dXNCYXJWaWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnN0YXR1c0JhclZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc3RhdHVzQmFyVmlldyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdob21lQmFyVmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ob21lQmFyVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ob21lQmFyVmlldyA9IHZhbHVlXG5cblxuXG5cdHZpZXdTaXplOiAodywgaCkgPT4gcmV0dXJuIEB2aWV3LndpZHRoID09IHcgYW5kIEB2aWV3LmhlaWdodCA9PSBoXG5cblx0IyBDcmVhdGUgQmFyc1xuXG5cdGNyZWF0ZUJhcnM6ICgpID0+XG5cdFx0QHN0YXR1c0JhclZpZXcgPSBuZXcgTGF5ZXIgXG5cdFx0XHRwYXJlbnQ6IEB2aWV3LCB3aWR0aDogQHZpZXcud2lkdGgsIHk6IEFsaWduLnRvcCwgbmFtZTogXCIuc3RhdHVzIGJhclwiXG5cdFx0XHRvcGFjaXR5OiBAdmlzaWJsZSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0aWYgQGZvcmNlQW5kcm9pZEJhclxuXHRcdFx0QGNyZWF0ZUNsYXNzaWNBbmRyb2lkU3RhdHVzQmFyKEBzdGF0dXNCYXJWaWV3KSBcblxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM3NSwgODEyKSBvciBAdmlld1NpemUoMzkwLCA4NDQpIG9yIEB2aWV3U2l6ZSg0MTQsIDg5Nikgb3IgQHZpZXdTaXplKDQyOCwgOTI2KSBvciBAdmlld1NpemUoMzYwLCA3ODIpXG5cdFx0XHRAY3JlYXRlTm90Y2hTdGF0dXNCYXIoQHN0YXR1c0JhclZpZXcpXG5cdFx0XHRAY3JlYXRlSG9tZUluZGljYXRvciBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBAdmlldywgd2lkdGg6IEB2aWV3LndpZHRoLCBoZWlnaHQ6IDM0LCB5OiBBbGlnbi5ib3R0b20sIG5hbWU6IFwiLmhvbWUgYmFyXCIsIG9wYWNpdHk6IEB2aXNpYmxlLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRlbHNlIGlmIEB2aWV3U2l6ZSgzOTMsIDg1Milcblx0XHRcdEBjcmVhdGVOb3RjaFN0YXR1c0JhcihAc3RhdHVzQmFyVmlldylcblx0XHRcdEBjcmVhdGVIb21lSW5kaWNhdG9yIG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IEB2aWV3LCB3aWR0aDogQHZpZXcud2lkdGgsIGhlaWdodDogMzQsIHk6IEFsaWduLmJvdHRvbSwgbmFtZTogXCIuaG9tZSBiYXJcIiwgb3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM3NSwgNjY3KSBvciBAdmlld1NpemUoNDE0LCA3MzYpIG9yIEB2aWV3U2l6ZSgzMjAsIDU2OClcblx0XHRcdEBjcmVhdGVDbGFzc2ljU3RhdHVzQmFyKEBzdGF0dXNCYXJWaWV3KVxuXHRcdFxuXHRcdFxuXHRcdGVsc2UgQGNyZWF0ZUFuZHJvaWRTdGF0dXNCYXIoQHN0YXR1c0JhclZpZXcpXG5cdFxuXHRcblx0XG5cdFxuXG5cblxuXHRjcmVhdGVBbmRyb2lkU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gMzJcblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDUyLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5sZWZ0KDQpLCB5OiBBbGlnbi50b3AoMiArIDUpXG5cdFx0XHRjb2xvcjogZGV2aWNlX2Fzc2V0cy5jb2xvcltAc3RhdHVzQmFyXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTQsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ucmlnaHQoLTQpLCB5OiBBbGlnbi50b3AoNSlcblx0XHRcdGltYWdlOiBkZXZpY2VfYXNzZXRzLmFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlW0BzdGF0dXNCYXJdXG5cdFxuXHRcblx0Y3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTIsIGhlaWdodDogMjAsIHg6IEFsaWduLmxlZnQsIHk6IEFsaWduLnRvcCgyKVxuXHRcdFx0Y29sb3I6IGRldmljZV9hc3NldHMuY29sb3JbQHN0YXR1c0Jhcl0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDE0LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogMjAsIHg6IEFsaWduLnJpZ2h0LCB5OiBBbGlnbi50b3AoKVxuXHRcdFx0aW1hZ2U6IGRldmljZV9hc3NldHMuYW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHN0YXR1c0Jhcl1cblx0XG5cdFxuXG5cblxuXHRjcmVhdGVDbGFzc2ljU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gMjBcblx0XHRcblx0XHRjbGFzc2ljTGVmdENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLmxlZnRcblx0XHRcdGltYWdlOiBkZXZpY2VfYXNzZXRzLm9sZFN0YXR1c0JhckxlZnRJbWFnZVtAc3RhdHVzQmFyXVxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTQsIGhlaWdodDogMTYsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRjb2xvcjogZGV2aWNlX2Fzc2V0cy5jb2xvcltAc3RhdHVzQmFyXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogZGV2aWNlX2Fzc2V0cy5vbGRTdGF0dXNCYXJSaWdodEltYWdlW0BzdGF0dXNCYXJdXG5cdFx0XG5cdFxuXHRjcmVhdGVOb3RjaFN0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDQ0XG5cdFx0XG5cdFx0bm90Y2hMZWZ0Q29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDU0LCBoZWlnaHQ6IDIxLCB4OiBBbGlnbi5sZWZ0KDIxKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0Y29sb3I6IGRldmljZV9hc3NldHMuY29sb3JbQHN0YXR1c0Jhcl0sIGJhY2tncm91bmRDb2xvcjogbnVsbCwgbGV0dGVyU3BhY2luZzogLTAuMTdcblx0XHRcdGZvbnRTaXplOiAxNSwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdG5vdGNoQ2VudGVyQ29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMzc1LCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24uY2VudGVyXG5cdFx0XHRpbWFnZTogZGV2aWNlX2Fzc2V0cy5ub3RjaFxuXHRcdFxuXHRcdG5vdGNoUmlnaHRDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5yaWdodFxuXHRcdFx0aW1hZ2U6IGRldmljZV9hc3NldHMuc3RhdHVzQmFyUmlnaHRJbWFnZVtAc3RhdHVzQmFyXVxuXG5cblxuXG5cblx0Y3JlYXRlSG9tZUluZGljYXRvcjogKGJhckxheWVyKSA9PlxuXHRcdEBob21lQmFyVmlldyA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIuaG9tZVZpZXdcIlxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEzNSwgaGVpZ2h0OiA1LCB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmJvdHRvbSgtOClcblx0XHRcdGJhY2tncm91bmRDb2xvcjogZGV2aWNlX2Fzc2V0cy5jb2xvcltAaG9tZUJhcl0sIGJvcmRlclJhZGl1czogMjBcblx0XG5cblxuXG5kZXZpY2VfYXNzZXRzID1cblx0Y29sb3I6XG5cdFx0ZGFyazogXCIjMDAwXCJcblx0XHRsaWdodDogXCIjRkZGXCJcblx0XG5cdHN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhckxlZnRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfbGVmdF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2xpZ2h0LnBuZ1wiXG5cdG9sZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdGFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9hbmRyb2lkU3RhdHVzQmFyX3JpZ2h0X2xpZ2h0LnBuZ1wiXG5cdFxuXG5cblx0bm90Y2g6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9ub3RjaC5wbmdcIlxuXHR0aXA6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3RpcC5wbmdcIiIsIlxuY2xhc3MgZXhwb3J0cy5Ib21lQmFyX0NsYXNzIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IEB2aWV3XG5cdFx0XHR3aWR0aDogQHZpZXcud2lkdGhcblx0XHRcdFxuXHRcdFx0dGhlbWU6IEB2aWV3LmhvbWVCYXJfdGhlbWVcblx0XHRcdFxuXHRcdFx0aGVpZ2h0OiAzNCwgeTogQWxpZ24uYm90dG9tLCBuYW1lOiBcIi5ob21lIGJhclwiLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QGNyZWF0ZSgpXG5cblxuXG5cdEBkZWZpbmUgJ3ZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy52aWV3ID0gdmFsdWVcblxuXHRAZGVmaW5lICd0aGVtZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50aGVtZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50aGVtZSA9IHZhbHVlXG5cblxuXG5cdHZpZXdTaXplOiAodywgaCkgPT4gcmV0dXJuIEB2aWV3LndpZHRoID09IHcgYW5kIEB2aWV3LmhlaWdodCA9PSBoXG5cblx0Y3JlYXRlOiAoKSA9PlxuXHRcdGlmIEB2aWV3U2l6ZSgzNzUsIDgxMikgb3IgQHZpZXdTaXplKDM5MCwgODQ0KSBvciBAdmlld1NpemUoNDE0LCA4OTYpIG9yIEB2aWV3U2l6ZSg0MjgsIDkyNikgb3IgQHZpZXdTaXplKDM2MCwgNzgyKSBvciBAdmlld1NpemUoMzkzLCA4NTIpXG5cdFx0XHRAY3JlYXRlSG9tZUluZGljYXRvcigpXG5cdFxuXHRcblx0Y3JlYXRlSG9tZUluZGljYXRvcjogKCkgPT5cblx0XHRuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiLmhvbWVWaWV3XCJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDEzNSwgaGVpZ2h0OiA1LCB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmJvdHRvbSgtOClcblx0XHRcdGJhY2tncm91bmRDb2xvcjogZGV2aWNlX2Fzc2V0cy5jb2xvcltAdGhlbWVdLCBib3JkZXJSYWRpdXM6IDIwXG5cblxuXG5kZXZpY2VfYXNzZXRzID1cblx0Y29sb3I6XG5cdFx0ZGFyazogXCIjMDAwXCJcblx0XHRsaWdodDogXCIjRkZGXCIiLCJcblxuQXNzZXRzID0gcmVxdWlyZSBcIlByZXZpZXdfQXNzZXRzXCJcblxuXG4jIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gXCJhdXRvXCJcblxuY2xhc3MgZXhwb3J0cy5Jbml0VmlldyBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0bmFtZTogXCJQcmV2aWV3XCJcblx0XHRcdHZpZXc6IG51bGxcblx0XHRcdFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRib3JkZXJSYWRpdXM6IDQyXG5cdFx0XHRcblx0XHRcdGFzc2V0czogQXNzZXRzLmRhdGFcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cblx0XHR3aW5kb3cuc2F2ZVByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0KEApXG5cdFx0XG5cdFx0QHN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IHNjYWxlOiAxIH1cblx0XHRcdFwiZmlsbFwiOiB7IHNjYWxlOiAxIH1cblx0XHRcblx0XHRcblx0XHRcblxuXHRcblxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnZpZXcgPSB2YWx1ZVxuXHRcdFx0QHdpZHRoID0gQHZpZXcud2lkdGhcblx0XHRcdEBoZWlnaHQgPSBAdmlldy5oZWlnaHRcblx0XHRcdEB2aWV3LnBhcmVudCA9IEBcblxuXHRAZGVmaW5lICdhc3NldHMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYXNzZXRzXG5cblxuXG5cblxuXHRzY3JlZW5TaXplOiAodywgaCkgPT4gcmV0dXJuIFNjcmVlbi53aWR0aCA9PSB3IGFuZCBTY3JlZW4uaGVpZ2h0ID09IGhcblx0dmlld1NpemU6ICh3LCBoKSA9PiByZXR1cm4gQHdpZHRoID09IHcgYW5kIEBoZWlnaHQgPT0gaFxuXHR2aWV3V2lkdGg6ICh3KSA9PiByZXR1cm4gQHdpZHRoID09IHdcblxuXHRsb2dTaXplOiAoKSA9PlxuXHRcdG5ldyBUZXh0TGF5ZXIgeyB0ZXh0OiBcIiN7U2NyZWVuLndpZHRofXgje1NjcmVlbi5oZWlnaHR9XCIsIHk6IEFsaWduLmNlbnRlciB9XHRcblxuXG5cblx0YW5pbWF0ZVN0YXRlVG9Ob3JtYWw6ICgpID0+XG5cdFx0QGFuaW1hdGUoXCJub3JtYWxcIiwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcblx0YW5pbWF0ZVN0YXRlVG9GaWxsOiAoKSA9PlxuXHRcdEBhbmltYXRlKFwiZmlsbFwiLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFxuXHRzdGF0ZVN3aXRjaFRvTm9ybWFsOiAoKSA9PlxuXHRcdEBzdGF0ZVN3aXRjaChcIm5vcm1hbFwiKVxuXHRcblx0c3RhdGVTd2l0Y2hUb0ZpbGw6ICgpID0+XG5cdFx0QHN0YXRlU3dpdGNoKFwiZmlsbFwiKVxuXG5cblx0XHRcbiIsIlxuXG57RGV2aWNlVmlld30gPSByZXF1aXJlIFwiRGV2aWNlVmlld1wiXG5cblxuY2xhc3MgZXhwb3J0cy5Mb2NhdGlvblZpZXcgZXh0ZW5kcyBEZXZpY2VWaWV3XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0aW5pdFN0YXRlOiBcImZpbGxcIiAjIGZpbGwgLyBub3JtYWxcblx0XHRcdHNob3dCdXR0b246IHRydWVcblx0XHRcdHNob3dMb2dvOiB0cnVlXG5cdFx0XHRmb3JjZURlc2t0b3A6IGZhbHNlXG5cblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHNjYWxlUHJldmlldygpXG5cblxuXHRAZGVmaW5lICdpbml0U3RhdGUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaW5pdFN0YXRlXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmluaXRTdGF0ZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdzaG93QnV0dG9uJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNob3dCdXR0b25cblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0J1dHRvbiA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdzaG93TG9nbycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93TG9nb1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zaG93TG9nbyA9IHZhbHVlXG5cblx0QGRlZmluZSAnZm9yY2VEZXNrdG9wJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmZvcmNlRGVza3RvcFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuZm9yY2VEZXNrdG9wID0gdmFsdWVcblx0XHRcdGlmIHZhbHVlXG5cdFx0XHRcdEBzaG93RGV2aWNlID0gZmFsc2Vcblx0XHRcdFx0QHNob3dCYXJzID0gZmFsc2Vcblx0XHRcdFx0QGJvcmRlclJhZGl1cyA9IDhcblx0XG5cdFxuXHRzY2FsZVByZXZpZXc6ICgpID0+XG5cdFx0Zm9yY2VEZXNrdG9wTW9kZSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJkZXNrdG9wXCIsIFt7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcInRydWVcIiwgcmVzdWx0OiB0cnVlIH1dLCBmYWxzZSlcblxuXHRcdGlmIGZvcmNlRGVza3RvcE1vZGUgdGhlbiBAcHJldmlld0Rlc2t0b3AoKVxuXHRcdGVsc2UgaWYgVXRpbHMuaXNNb2JpbGUoKSB0aGVuIEBwcmV2aWV3TW9iaWxlKClcblx0XHRlbHNlIEBwcmV2aWV3RGVza3RvcCgpXG5cdFx0XHRcblx0XHRcblx0XG5cblx0dXBkYXRlU2NhbGU6ICgpID0+XG5cblx0XHRzY2FsZUZhY3RvciA9IFNjcmVlbi53aWR0aCAvIENhbnZhcy53aWR0aFxuXG5cdFx0QG9yaWdpblggPSAwXG5cdFx0QG9yaWdpblkgPSAwXG5cblx0XHRzY2FsZVggPSAoU2NyZWVuLndpZHRoIC0gc2NhbGVGYWN0b3IgKiAxMTIpIC8gQHdpZHRoXG5cdFx0c2NhbGVZID0gKFNjcmVlbi5oZWlnaHQgLSBzY2FsZUZhY3RvciAqIDExMikgLyBAaGVpZ2h0XG5cdFx0QHN0YXRlc1tcImZpbGxcIl0uc2NhbGUgPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSlcblxuXHRcdEBzdGF0ZXNbXCJmaWxsXCJdLnggPSAoU2NyZWVuLndpZHRoIC0gQHdpZHRoICogQHN0YXRlc1tcImZpbGxcIl0uc2NhbGUpIC8gMlxuXHRcdEBzdGF0ZXNbXCJmaWxsXCJdLnkgPSAoU2NyZWVuLmhlaWdodCAtIEBoZWlnaHQgKiBAc3RhdGVzW1wiZmlsbFwiXS5zY2FsZSkgLyAyXG5cblx0XHRAc3RhdGVzW1wibm9ybWFsXCJdLnggPSAoU2NyZWVuLndpZHRoIC0gQHdpZHRoKSAvIDJcblx0XHRAc3RhdGVzW1wibm9ybWFsXCJdLnkgPSAoU2NyZWVuLmhlaWdodCAtIEBoZWlnaHQpIC8gMlxuXG5cdFxuXG5cblxuXG5cdHNldERlc2t0b3BTY2FsZU1vZGU6ICgpID0+XG5cblx0XHRmb3JTdGF0ZSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJzY2FsZVwiLCBbeyB2YWx1ZTogXCJmaWxsXCIsIHJlc3VsdDogXCJmaWxsXCIgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwibm9ybWFsXCIsIHJlc3VsdDogXCJub3JtYWxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogXCJmaWxsXCIgfV0sIEBpbml0U3RhdGUpXG5cblx0XHRzaG91bGRTaG93QnV0dG9uID0gQGdldFN0YXRlR2VuZXJpYyhcImJ1dHRvblwiLCBbeyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvZmZcIiwgcmVzdWx0OiBmYWxzZSB9XSwgQHNob3dCdXR0b24pXG5cblx0XHRzaG91bGRTaG93TG9nbyA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJsb2dvXCIsIFt7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvZmZcIiwgcmVzdWx0OiBmYWxzZSB9XSwgQHNob3dMb2dvKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0c2hvdWxkU2hvd0RldmljZSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJkZXZpY2VcIiwgW3sgdmFsdWU6IFwiZmFsc2VcIiwgcmVzdWx0OiBmYWxzZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9mZlwiLCByZXN1bHQ6IGZhbHNlIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogdHJ1ZSB9XSwgQHNob3dEZXZpY2UpXG5cblx0XHRcblx0XHRpZiBzaG91bGRTaG93TG9nbyB0aGVuIEBjcmVhdGVMb2dvQnV0dG9uKClcblx0XHRpZiBzaG91bGRTaG93QnV0dG9uIHRoZW4gQGNyZWF0ZVNjYWxlQnV0dG9uKGZvclN0YXRlKVxuXHRcdGlmIHNob3VsZFNob3dEZXZpY2UgdGhlbiBAc2hvd0JvcmRlclZpZXcoKSBlbHNlIEBoaWRlQm9yZGVyVmlldygpXG5cdFx0QHN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcblx0XG5cdFxuXHRwcmV2aWV3RGVza3RvcDogKCkgPT5cblx0XHRAdXBkYXRlU2NhbGUoKVxuXHRcdEBzZXREZXNrdG9wU2NhbGVNb2RlKClcblx0XHRAY3JlYXRlQmFycygpXG5cdFx0QGNsaXAgPSB0cnVlXG5cdFx0QHVwZGF0ZVByZXZpZXdPblJlc2l6ZSgpXG5cblxuXHR1cGRhdGVQcmV2aWV3T25SZXNpemU6ICgpID0+XG5cdFx0bG9jYWxQcmV2aWV3ID0gQFxuXHRcdFxuXHRcdENhbnZhcy5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZSgpXG5cdFx0XHRsb2NhbFByZXZpZXcuc3RhdGVTd2l0Y2gobG9jYWxQcmV2aWV3LnN0YXRlcy5jdXJyZW50Lm5hbWUpXG5cdFx0XG5cdFx0Q2FudmFzLm9uIFwiY2hhbmdlOndpZHRoXCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlU2NhbGUoKVxuXHRcdFx0bG9jYWxQcmV2aWV3LnN0YXRlU3dpdGNoKGxvY2FsUHJldmlldy5zdGF0ZXMuY3VycmVudC5uYW1lKVxuXHRcdFxuXG5cdFx0U2NyZWVuLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVNjYWxlKClcblx0XHRcdGxvY2FsUHJldmlldy5zdGF0ZVN3aXRjaChsb2NhbFByZXZpZXcuc3RhdGVzLmN1cnJlbnQubmFtZSlcblx0XHRcblx0XHRTY3JlZW4ub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZSgpXG5cdFx0XHRsb2NhbFByZXZpZXcuc3RhdGVTd2l0Y2gobG9jYWxQcmV2aWV3LnN0YXRlcy5jdXJyZW50Lm5hbWUpXG5cdFxuXHRcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRwcmV2aWV3TW9iaWxlOiAoKSA9PlxuXG5cdFx0QHNjYWxlID0gU2NyZWVuLndpZHRoIC8gQHdpZHRoXG5cdFx0QG9yaWdpblggPSAwXG5cdFx0QG9yaWdpblkgPSAwXG5cdFxuXHRcblxuXHRzZXRDdXN0b21QcmV2aWV3OiAoKSA9PlxuXHRcdEB5ID0gQWxpZ24udG9wXG5cdFx0XG5cdFx0QHNjYWxlID0gKFNjcmVlbi5oZWlnaHQgLSAxMjApIC8gQGhlaWdodFxuXHRcdEBib3JkZXJSYWRpdXMgPSAyMFxuXHRcdEBjbGlwID0gdHJ1ZVxuXG5cblxuXG5cdCMgZ2V0U3RhdGVHZW5lcmljOiAoa2V5ID0gXCJzY2FsZVwiLCBwYWlycyA9IFt7IHZhbHVlOiAsIHJlc3VsdDogfSwge3ZhbHVlOiAsIHJlc3VsdDogfV0sIGRlZmF1bHRSZXN1bHQgPSBcIlwiKVxuXHRnZXRTdGF0ZUdlbmVyaWM6IChzdGF0ZUtleSA9IFwic2NhbGVcIiwgc3RhdGVQYWlycyA9IFtdLCBkZWZhdWx0UmVzdWx0ID0gXCJcIikgPT5cblx0XHRyZXN1bHQgPSBkZWZhdWx0UmVzdWx0XG5cblx0XHRmb3IgaXRlbSBpbiBsb2NhdGlvbi5zZWFyY2hbMS4uXS5zcGxpdCgnJicpXG5cdFx0XHRrZXlWYWx1ZVBhaXIgPSBpdGVtLnNwbGl0KFwiPVwiKVxuXHRcdFx0a2V5UGFydCA9IGtleVZhbHVlUGFpclswXVxuXHRcdFx0dmFsdWVQYXJ0ID0ga2V5VmFsdWVQYWlyWzFdXG5cblx0XHRcdGlmIGtleVBhcnQgPT0gc3RhdGVLZXlcblx0XHRcdFx0Zm9yIHBhaXIgaW4gc3RhdGVQYWlyc1xuXHRcdFx0XHRcdGlmIHZhbHVlUGFydCA9PSBwYWlyLnZhbHVlXG5cdFx0XHRcdFx0XHQjIHByaW50IFwib2sgXCIgKyBcIiAje3BhaXIudmFsdWV9XCIgXG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBwYWlyLnJlc3VsdFxuXHRcdFx0XHRcdCMgZWxzZVxuXHRcdFx0XHRcdFx0IyBwcmludCBcIm5vdCBcIiArIFwiICN7cGFpci52YWx1ZX1cIiBcblx0XHRcblx0XHRyZXR1cm4gcmVzdWx0XG5cdFxuXHRcblx0XG5cdFxuIiwiIyBMb2dvXG5cbmNsYXNzIGV4cG9ydHMuTG9nb0xheWVyIGV4dGVuZHMgU1ZHTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0b3BhY2l0eTogMC41XG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cdFx0XHRzdmc6IGdldExvZ28oXCJGRkZcIilcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEBzdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRAc2hvd0hpbnQgPSAtPiA7XG5cdFx0XG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cdFxuXHRAZGVmaW5lICdoYW5kbGVyJyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9uKEV2ZW50cy5UYXAsIHZhbHVlKVxuXHRcblx0SG92ZXI6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjhcblx0SG92ZXJPZmY6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjVcblxuXG5cbmdldExvZ28gPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gXCIjRkZGRkZGXCJcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCI3NlwiIGhlaWdodD1cIjMyXCIgdmlld0JveD1cIjAgMCA3NiAzMlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk0yLjc5MTk5IDIxLjZDMi43OTE5OSAyMS4xNjggMi45MDM5OSAyMC40MDggMy4xMjc5OSAxOS4zMkw0LjM5OTk5IDEyLjg0SDIuOTgzOTlMMy4wNzk5OSAxMi4xMkM0Ljk5OTk5IDExLjU0NCA2Ljg4Nzk5IDEwLjU1MiA4Ljc0Mzk5IDkuMTQzOThIOS44OTU5OUw5LjMxOTk5IDExLjc2SDExLjE5MkwxMC45NzYgMTIuODRIOS4xMjc5OUw3LjkwMzk5IDE5LjMyQzcuNjk1OTkgMjAuMzEyIDcuNTkxOTkgMjAuOTc2IDcuNTkxOTkgMjEuMzEyQzcuNTkxOTkgMjIuMDggNy45Mjc5OSAyMi41NDQgOC41OTk5OSAyMi43MDRDOC40Mzk5OSAyMy4yNDggOC4wNzE5OSAyMy42OCA3LjQ5NTk5IDI0QzYuOTE5OTkgMjQuMzIgNi4yMjM5OSAyNC40OCA1LjQwNzk5IDI0LjQ4QzQuNTkxOTkgMjQuNDggMy45NTE5OSAyNC4yMjQgMy40ODc5OSAyMy43MTJDMy4wMjM5OSAyMy4yIDIuNzkxOTkgMjIuNDk2IDIuNzkxOTkgMjEuNlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMTcuNTU5OSAyMi42OEMxNy4wNjM5IDIzLjg4IDE2LjAyMzkgMjQuNDggMTQuNDM5OSAyNC40OEMxMy42MjM5IDI0LjQ4IDEyLjk1OTkgMjQuMiAxMi40NDc5IDIzLjY0QzEyLjAxNTkgMjMuMTQ0IDExLjc5OTkgMjIuNjQ4IDExLjc5OTkgMjIuMTUyQzExLjc5OTkgMjAuODU2IDEyLjA5NTkgMTguOTQ0IDEyLjY4NzkgMTYuNDE2TDEzLjU3NTkgMTEuNzZMMTguNDQ3OSAxMS4yOEwxNi45ODM5IDE4Ljg2NEMxNi43MTE5IDIwLjA0OCAxNi41NzU5IDIwLjg0OCAxNi41NzU5IDIxLjI2NEMxNi41NzU5IDIyLjE3NiAxNi45MDM5IDIyLjY0OCAxNy41NTk5IDIyLjY4Wk0xNC4wMDc5IDguNDIzOThDMTQuMDA3OSA3Ljc5OTk4IDE0LjI2MzkgNy4zMTk5OCAxNC43NzU5IDYuOTgzOThDMTUuMzAzOSA2LjY0Nzk4IDE1Ljk0MzkgNi40Nzk5OCAxNi42OTU5IDYuNDc5OThDMTcuNDQ3OSA2LjQ3OTk4IDE4LjA0NzkgNi42NDc5OCAxOC40OTU5IDYuOTgzOThDMTguOTU5OSA3LjMxOTk4IDE5LjE5MTkgNy43OTk5OCAxOS4xOTE5IDguNDIzOThDMTkuMTkxOSA5LjA0Nzk4IDE4LjkzNTkgOS41MTk5OCAxOC40MjM5IDkuODM5OThDMTcuOTI3OSAxMC4xNiAxNy4zMDM5IDEwLjMyIDE2LjU1MTkgMTAuMzJDMTUuNzk5OSAxMC4zMiAxNS4xODM5IDEwLjE2IDE0LjcwMzkgOS44Mzk5OEMxNC4yMzk5IDkuNTE5OTggMTQuMDA3OSA5LjA0Nzk4IDE0LjAwNzkgOC40MjM5OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMjYuMDYwNiAyMi42OEMyNS41NjQ2IDIzLjg4IDI0LjUyNDYgMjQuNDggMjIuOTQwNiAyNC40OEMyMi4xNDA2IDI0LjQ4IDIxLjQ4NDYgMjQuMiAyMC45NzI2IDIzLjY0QzIwLjU1NjYgMjMuMTc2IDIwLjM0ODYgMjIuNjggMjAuMzQ4NiAyMi4xNTJDMjAuMzQ4NiAyMC45NTIgMjAuNjI4NiAxOS4wNCAyMS4xODg2IDE2LjQxNkwyMi45NDA2IDcuMTk5OThMMjcuODEyNiA2LjcxOTk4TDI1LjQ4NDYgMTguODY0QzI1LjIxMjYgMjAuMDQ4IDI1LjA3NjYgMjAuODQ4IDI1LjA3NjYgMjEuMjY0QzI1LjA3NjYgMjIuMTc2IDI1LjQwNDYgMjIuNjQ4IDI2LjA2MDYgMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTM0LjU2MTggMjIuNjhDMzQuMDY1OCAyMy44OCAzMy4wMjU4IDI0LjQ4IDMxLjQ0MTggMjQuNDhDMzAuNjQxOCAyNC40OCAyOS45ODU4IDI0LjIgMjkuNDczOCAyMy42NEMyOS4wNTc4IDIzLjE3NiAyOC44NDk4IDIyLjY4IDI4Ljg0OTggMjIuMTUyQzI4Ljg0OTggMjAuOTUyIDI5LjEyOTggMTkuMDQgMjkuNjg5OCAxNi40MTZMMzEuNDQxOCA3LjE5OTk4TDM2LjMxMzggNi43MTk5OEwzMy45ODU4IDE4Ljg2NEMzMy43MTM4IDIwLjA0OCAzMy41Nzc4IDIwLjg0OCAzMy41Nzc4IDIxLjI2NEMzMy41Nzc4IDIyLjE3NiAzMy45MDU4IDIyLjY0OCAzNC41NjE4IDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk00My4wNjMxIDIyLjY4QzQyLjU2NzEgMjMuODggNDEuNTI3MSAyNC40OCAzOS45NDMxIDI0LjQ4QzM5LjE0MzEgMjQuNDggMzguNDg3MSAyNC4yIDM3Ljk3NTEgMjMuNjRDMzcuNTU5MSAyMy4xNzYgMzcuMzUxMSAyMi42OCAzNy4zNTExIDIyLjE1MkMzNy4zNTExIDIwLjk1MiAzNy42MzExIDE5LjA0IDM4LjE5MTEgMTYuNDE2TDM5Ljk0MzEgNy4xOTk5OEw0NC44MTUxIDYuNzE5OThMNDIuNDg3MSAxOC44NjRDNDIuMjE1MSAyMC4wNDggNDIuMDc5MSAyMC44NDggNDIuMDc5MSAyMS4yNjRDNDIuMDc5MSAyMi4xNzYgNDIuNDA3MSAyMi42NDggNDMuMDYzMSAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNTMuNTMyMyAyMi45OTJDNTIuNzY0MyAyMy45ODQgNTEuNDI4MyAyNC40OCA0OS41MjQzIDI0LjQ4QzQ4LjUzMjMgMjQuNDggNDcuNjc2MyAyNC4xODQgNDYuOTU2MyAyMy41OTJDNDYuMjM2MyAyMi45ODQgNDUuODc2MyAyMi4yNDggNDUuODc2MyAyMS4zODRDNDUuODc2MyAyMC45MDQgNDUuOTAwMyAyMC41NDQgNDUuOTQ4MyAyMC4zMDRMNDcuNTU2MyAxMS43Nkw1Mi40MjgzIDExLjI4TDUwLjY3NjMgMjAuNTQ0QzUwLjYxMjMgMjAuODk2IDUwLjU4MDMgMjEuMTc2IDUwLjU4MDMgMjEuMzg0QzUwLjU4MDMgMjIuMzEyIDUwLjg2MDMgMjIuNzc2IDUxLjQyMDMgMjIuNzc2QzUyLjA0NDMgMjIuNzc2IDUyLjU4MDMgMjIuMzUyIDUzLjAyODMgMjEuNTA0QzUzLjE3MjMgMjEuMjMyIDUzLjI3NjMgMjAuOTIgNTMuMzQwMyAyMC41NjhMNTUuMDQ0MyAxMS43Nkw1OS43NzIzIDExLjI4TDU3Ljk5NjMgMjAuNjRDNTcuOTQ4MyAyMC44OCA1Ny45MjQzIDIxLjEyOCA1Ny45MjQzIDIxLjM4NEM1Ny45MjQzIDIxLjY0IDU3Ljk5NjMgMjEuOTEyIDU4LjE0MDMgMjIuMkM1OC4yODQzIDIyLjQ3MiA1OC41ODgzIDIyLjY0IDU5LjA1MjMgMjIuNzA0QzU4Ljk1NjMgMjMuMDg4IDU4Ljc0MDMgMjMuNDA4IDU4LjQwNDMgMjMuNjY0QzU3LjcwMDMgMjQuMjA4IDU2Ljk2NDMgMjQuNDggNTYuMTk2MyAyNC40OEM1NS40NDQzIDI0LjQ4IDU0Ljg0NDMgMjQuMzQ0IDU0LjM5NjMgMjQuMDcyQzUzLjk0ODMgMjMuOCA1My42NjAzIDIzLjQ0IDUzLjUzMjMgMjIuOTkyWlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk02OS4yOTQ3IDE3LjI1NkM2OS44NzA3IDE2LjIzMiA3MC4xNTg3IDE1LjIgNzAuMTU4NyAxNC4xNkM3MC4xNTg3IDEzLjQ3MiA2OS45MTA3IDEzLjEyOCA2OS40MTQ3IDEzLjEyOEM2OS4wMzA3IDEzLjEyOCA2OC42Mzg3IDEzLjQ1NiA2OC4yMzg3IDE0LjExMkM2Ny44MjI3IDE0Ljc2OCA2Ny41NTA3IDE1LjUyIDY3LjQyMjcgMTYuMzY4TDY2LjE3NDcgMjRMNjEuMjA2NyAyNC40OEw2My42NTQ3IDExLjc2TDY3LjYxNDcgMTEuMjhMNjcuMTgyNyAxMy43MDRDNjcuOTY2NyAxMi4wODggNjkuMjM4NyAxMS4yOCA3MC45OTg3IDExLjI4QzcxLjkyNjcgMTEuMjggNzIuNjM4NyAxMS41MiA3My4xMzQ3IDEyQzczLjY0NjcgMTIuNDggNzMuOTAyNyAxMy4yMTYgNzMuOTAyNyAxNC4yMDhDNzMuOTAyNyAxNS4xODQgNzMuNTc0NyAxNS45ODQgNzIuOTE4NyAxNi42MDhDNzIuMjc4NyAxNy4yMzIgNzEuNDA2NyAxNy41NDQgNzAuMzAyNyAxNy41NDRDNjkuODIyNyAxNy41NDQgNjkuNDg2NyAxNy40NDggNjkuMjk0NyAxNy4yNTZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48L3N2Zz5cblwiXCJcIlxuIiwiXG5cblxueyBCdXR0b24gfSA9IHJlcXVpcmUgXCJCdXR0b25zXCJcblxuXG5cbmNsYXNzIE5hdmlnYXRpb25Db21wb25lbnQgZXh0ZW5kcyBGbG93Q29tcG9uZW50XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0IyBzY3JlZW46IG51bGxcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cblx0XG5cdCMgQGRlZmluZSAndmlldycsXG5cdCMgXHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0IyBcdHNldDogKHZhbHVlKSAtPlxuXHQjIFx0XHRwcmludCBcIj9cIlxuXHQjIFx0XHQjIEBvcHRpb25zLnZpZXcgPSB2YWx1ZVxuXHQjIFx0XHQjIHByaW50IHZhbHVlXG5cdCMgXHRcdCMgQHBhcmVudCA9IHZhbHVlXG5cdCMgXHRcdCMgQHdpZHRoID0gdmFsdWUud2lkdGhcblx0IyBcdFx0IyBAaGVpZ2h0ID0gdmFsdWUuaGVpZ2h0XG5cdCMgXHRcdCMgcHJpbnQgQFxuXHQjIFx0XHQjIEBiYWNrZ3JvdW5kQ29sb3IgPSBcImJsdWVcIlxuXHQjIFx0XHQjIHByaW50IEBwYXJlbnRcblxuXG5cblxuXHRzdGFja1RyYW5zaXRpb246IChuYXYsIGxheWVyQSwgbGF5ZXJCLCBvdmVybGF5KSAtPlxuXHRcdHRyYW5zaXRpb24gPVxuXHRcdFx0bGF5ZXJBOlxuXHRcdFx0XHRzaG93OiB7eDogMCwgeTogMH1cblx0XHRcdFx0aGlkZToge3g6IDAgLSBsYXllckE/LndpZHRoIC8gMiwgeTogMH1cblx0XHRcdGxheWVyQjpcblx0XHRcdFx0c2hvdzoge3g6IDAsIHk6IDB9XG5cdFx0XHRcdGhpZGU6IHt4OiBsYXllckIud2lkdGgsIHk6IDB9XG5cdFx0XHRvdmVybGF5OlxuXHRcdFx0XHRzaG93OiB7b3BhY2l0eTogLjUsIHg6IDAsIHk6IDAsIHNpemU6IG5hdi5zaXplfVxuXHRcdFx0XHRoaWRlOiB7b3BhY2l0eTogMCwgeDogMCwgeTogMCwgc2l6ZTogbmF2LnNpemV9XG5cblxuXHRtb2RhbFRyYW5zaXRpb246IChuYXYsIGxheWVyQSwgbGF5ZXJCLCBvdmVybGF5KSAtPlxuXHRcdHRyYW5zaXRpb24gPVxuXHRcdFx0bGF5ZXJBOlxuXHRcdFx0XHRzaG93OiB7eDogMCwgeTogMH1cblx0XHRcdFx0aGlkZToge3g6IDAsIHk6IDB9XG5cdFx0XHRsYXllckI6XG5cdFx0XHRcdHNob3c6IHt4OiAwLCB5OiAwfVxuXHRcdFx0XHRoaWRlOiB7eDogMCwgeTogbGF5ZXJBPy5oZWlnaHQgKyAxMH1cblx0XHRcdG92ZXJsYXk6XG5cdFx0XHRcdHNob3c6IHtvcGFjaXR5OiAuNSwgeDogMCwgeTogMCwgc2l6ZTogbmF2LnNpemV9XG5cdFx0XHRcdGhpZGU6IHtvcGFjaXR5OiAwLCB4OiAwLCB5OiAwLCBzaXplOiBuYXYuc2l6ZX1cblxuXG5cblxuXG5cdGNyZWF0ZV9CYWNrQnV0dG9uOiAocGFyZW50TGF5ZXIpIC0+XG5cdFx0cmV0dXJuIG5ldyBCdXR0b25cblx0XHRcdHBhcmVudDogcGFyZW50TGF5ZXJcblx0XHRcdHdpZHRoOiAxMDAsIGhlaWdodDogODIsIHk6IDU0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdG9wYWNpdHk6IDAuNFxuXHRcdFx0aGFuZGxlcjogKCkgLT4gQGN1c3RvbS5mbG93LnNob3dQcmV2aW91cygpXG5cdFx0XHRjdXN0b206XG5cdFx0XHRcdGZsb3c6IEBcblxuXG5cblx0b3BlbjogKG5hdmlnYXRpb25WaWV3KSAtPlxuXHRcdGlmIG5hdmlnYXRpb25WaWV3LmN1c3RvbSBhbmQgbmF2aWdhdGlvblZpZXcuY3VzdG9tLnZpZXdcblx0XHRcdG5hdmlnYXRpb25WaWV3LmN1c3RvbS52aWV3LnNjcm9sbFRvVG9wKGZhbHNlKVxuXHRcdFx0QHRyYW5zaXRpb24obmF2aWdhdGlvblZpZXcsIEBtb2RhbFRyYW5zaXRpb24pXG5cdFx0ZWxzZVxuXHRcdFx0bmF2aWdhdGlvblZpZXcuc2Nyb2xsVG9Ub3AoZmFsc2UpXG5cdFx0XHRAdHJhbnNpdGlvbihuYXZpZ2F0aW9uVmlldywgQHN0YWNrVHJhbnNpdGlvbilcblxuXG5cblx0Y3JlYXRlVmlldzogKGJnQ29sb3IgPSBcIndoaXRlXCIpIC0+XG5cdFx0bmF2aWdhdGlvblZpZXcgPSBuZXcgTmF2aWdhdGlvblZpZXdcblx0XHRcdHdpZHRoOiBAd2lkdGhcblx0XHRcdGhlaWdodDogQGhlaWdodFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBiZ0NvbG9yXG5cdFx0XHRzY3JvbGxWZXJ0aWNhbDogdHJ1ZVxuXHRcdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRcdGRpcmVjdGlvbkxvY2s6IHRydWVcblx0XHRcblx0XHRuYXZpZ2F0aW9uVmlldy5vbiBFdmVudHMuU3dpcGVSaWdodFN0YXJ0LCAoZXZlbnQsIGxheWVyKSA9PlxuXHRcdFx0QHNob3dQcmV2aW91cygpXG5cdFx0XG5cdFx0QHNob3dOZXh0KG5hdmlnYXRpb25WaWV3KVxuXHRcdEBzaG93UHJldmlvdXMoYW5pbWF0ZTogZmFsc2UpXG5cblx0XHRAY3JlYXRlX0JhY2tCdXR0b24obmF2aWdhdGlvblZpZXcuY29udGVudClcblx0XHRcblx0XHRyZXR1cm4gbmF2aWdhdGlvblZpZXdcblx0XG5cblx0Y3JlYXRlTW9kYWw6IChiZ0NvbG9yID0gXCJ3aGl0ZVwiLCBnYXAgPSA2NiwgcmFkaXVzID0gNTYpIC0+XG5cdFx0bmF2aWdhdGlvblZpZXdfV3JhcHBlciA9IG5ldyBNb2RhbFZpZXdcblx0XHRcdG5hbWU6IFwid3JhcHBlclwiXG5cdFx0XHR3aWR0aDogQHdpZHRoXG5cdFx0XHRoZWlnaHQ6IEBoZWlnaHRcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHR2aWV3OiBudWxsXG5cdFx0XHRcdGhhbmRsZXI6IG51bGxcblxuXHRcdG5hdmlnYXRpb25WaWV3ID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHRcdFx0cGFyZW50OiBuYXZpZ2F0aW9uVmlld19XcmFwcGVyXG5cdFx0XHR5OiBnYXBcblx0XHRcdHdpZHRoOiBAd2lkdGhcblx0XHRcdGhlaWdodDogQGhlaWdodCAtIGdhcFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBiZ0NvbG9yXG5cdFx0XHRzY3JvbGxWZXJ0aWNhbDogdHJ1ZVxuXHRcdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRcdGRpcmVjdGlvbkxvY2s6IHRydWVcblx0XHRcdGJvcmRlclJhZGl1czogcmFkaXVzXG5cdFx0XHRjdXN0b206XG5cdFx0XHRcdGZsb3c6IEBcblxuXHRcdG5hdmlnYXRpb25WaWV3X1dyYXBwZXIuY3VzdG9tLnZpZXcgPSBuYXZpZ2F0aW9uVmlld1xuXG5cdFx0bmF2aWdhdGlvblZpZXdfSGFuZGxlciA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBuYXZpZ2F0aW9uVmlld19XcmFwcGVyXG5cdFx0XHR3aWR0aDogNDAsIGhlaWdodDogMywgeDogQWxpZ24uY2VudGVyLCB5OiBnYXAgLSAxMVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBiZ0NvbG9yLCBvcGFjaXR5OiAwLjVcblx0XHRcblx0XHRuYXZpZ2F0aW9uVmlld19XcmFwcGVyLmN1c3RvbS5oYW5kbGVyID0gbmF2aWdhdGlvblZpZXdfSGFuZGxlclxuXG5cdFx0bmF2aWdhdGlvblZpZXcub24gRXZlbnRzLlN3aXBlUmlnaHRTdGFydCwgKGV2ZW50LCBsYXllcikgLT5cblx0XHRcdEBjdXN0b20uZmxvdy5zaG93UHJldmlvdXMoKVxuXG5cdFx0bmF2aWdhdGlvblZpZXcub24gRXZlbnRzLlN3aXBlRG93blN0YXJ0LCAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdFx0aWYgQHNjcm9sbFkgPCAwIHRoZW4gQGN1c3RvbS5mbG93LnNob3dQcmV2aW91cygpXG5cdFx0XG5cdFx0QHNob3dOZXh0KG5hdmlnYXRpb25WaWV3X1dyYXBwZXIpXG5cdFx0QHNob3dQcmV2aW91cyhhbmltYXRlOiBmYWxzZSlcblx0XHRcblx0XHRyZXR1cm4gbmF2aWdhdGlvblZpZXdfV3JhcHBlclxuXG5cblxuXG5cdCMgaW5pdF9OYXZpZ2F0aW9uVmlld0NvbnRlbnQ6IChuYXZpZ2F0aW9uVmlldywgY29udGVudFZpZXcpIC0+XG5cdCMgXHRpZiBuYXZpZ2F0aW9uVmlldy5jdXN0b20gYW5kIG5hdmlnYXRpb25WaWV3LmN1c3RvbS52aWV3XG5cdCMgXHRcdGNvbnRlbnRWaWV3LnBhcmVudCA9IG5hdmlnYXRpb25WaWV3LmN1c3RvbS52aWV3LmNvbnRlbnRcblx0IyBcdFx0Y29udGVudFZpZXcuYmFja2dyb3VuZENvbG9yID0gbnVsbFxuXHQjIFx0ZWxzZVxuXHQjIFx0XHRjb250ZW50Vmlldy5wYXJlbnQgPSBuYXZpZ2F0aW9uVmlldy5jb250ZW50XG5cblxuXG5cblxuXG5cblxuXG5jbGFzcyBOYXZpZ2F0aW9uVmlldyBleHRlbmRzIFNjcm9sbENvbXBvbmVudFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdGFkZDogKGNvbnRlbnRWaWV3KSAtPlxuXHRcdGNvbnRlbnRWaWV3LnBhcmVudCA9IEBjb250ZW50XG5cblxuY2xhc3MgTW9kYWxWaWV3IGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRhZGQ6IChjb250ZW50VmlldykgLT5cblx0XHRjb250ZW50Vmlldy5wYXJlbnQgPSBAY3VzdG9tLnZpZXcuY29udGVudFxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBudWxsXG5cblxubW9kdWxlLmV4cG9ydHMgPSB7IE5hdmlnYXRpb25Db21wb25lbnQgfSIsIlxuIyBTVkcgPSByZXF1aXJlIFwiUENTVkdcIlxuXG5jbGFzcyBUZXh0IGV4dGVuZHMgVGV4dExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdCMgZm9udEZhbWlseTogZm9udEF2ZXJpYVxuXHRcdFx0Zm9udFNpemU6IDE4XG5cdFx0XHR3ZWlnaHQ6IDcwMFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0aGVpZ2h0OiAyMFxuXHRcdFx0bGV0dGVyU3BhY2luZzogMC43XG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiAwLjRcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHN0eWxlID1cblx0XHRcdFwiZm9udC1mYW1pbHlcIjogXCInU0YgUHJvIFRleHQnLCAnUFQgU2FucycsICdIZWx2ZXRpY2EnLCAnVGFob21hJywgc2Fucy1zZXJpZjtcIlxuXHRcdFx0XCJmb250LXdlaWdodFwiOiA3MDBcblx0XHRcdFwiLXdlYmtpdC1mb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcdFwiLW1vei1mb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcdFwiLW1zLWZvbnQtZmVhdHVyZS1zZXR0aW5nc1wiOiBcIidzczAyJyBvbiwgJ3NzMDYnIG9uLCAnc3MwOScgb24sICdzczExJyBvbjtcIlxuXHRcdFx0XCJmb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcblxuXG5cbmNsYXNzIFRleHRCdXR0b24gZXh0ZW5kcyBUZXh0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHR1cGxlOiB7IG5vcm1hbDogMC41LCBob3ZlcjogMC44IH1cblx0XHRcdGhhbmRsZXI6IG51bGxcblxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QHN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdFxuXHRcdEAub25Nb3VzZU92ZXIgQEhvdmVyXG5cdFx0QC5vbk1vdXNlT3V0IEBIb3Zlck9mZlxuXG5cdFx0QHVwZGF0ZVR1cGxlKEB0dXBsZSlcblx0XG5cdFxuXHRcdFxuXHRIb3ZlcjogPT5cblx0XHRAb3BhY2l0eSA9IEB0dXBsZS5ob3ZlclxuXHRIb3Zlck9mZjogPT5cblx0XHRAb3BhY2l0eSA9IEB0dXBsZS5ub3JtYWxcblx0XG5cdHVwZGF0ZVR1cGxlOiAobmV3VHVwbGUpID0+XG5cdFx0QHR1cGxlID0gbmV3VHVwbGVcblx0XHRAZW1pdCBFdmVudHMuTW91c2VPdmVyXG5cdFx0QGVtaXQgRXZlbnRzLk1vdXNlT3V0XG5cdFxuXHRcblx0QGRlZmluZSAnaGFuZGxlcicsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvbihFdmVudHMuVGFwLCB2YWx1ZSlcblx0XG5cdEBkZWZpbmUgJ3R1cGxlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnR1cGxlXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy50dXBsZSA9IHZhbHVlXG5cblxuXG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBUZXh0XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGhhbmRsZXI6IG51bGxcblx0XHRcdGhlaWdodDogMzIsIGJvcmRlclJhZGl1czogOFxuXHRcdFx0cGFkZGluZzogeyB0b3A6IDYsIGJvdHRvbTogNywgbGVmdDogOSwgcmlnaHQ6IDkgfVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMC43KVwiXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAc2hvd0hpbnQgPSAtPiA7XG5cdFx0QHN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdFxuXHRcdEAub25Nb3VzZU92ZXIgQEhvdmVyXG5cdFx0QC5vbk1vdXNlT3V0IEBIb3Zlck9mZlxuXHRcdFxuXHRIb3ZlcjogPT5cblx0XHRAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuNClcIlxuXHRIb3Zlck9mZjogPT5cblx0XHRAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuNylcIlxuXHRcblx0QGRlZmluZSAnaGFuZGxlcicsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvbihFdmVudHMuVGFwLCB2YWx1ZSlcblxuXG5jbGFzcyBCdXR0b25UYWIgZXh0ZW5kcyBCdXR0b25cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0c2VsZWN0ZWQ6IHRydWVcblx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRIb3ZlcjogPT5cblx0XHRAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuNClcIlxuXHRIb3Zlck9mZjogPT5cblx0XHRpZiBAc2VsZWN0ZWQgdGhlbiBAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuNylcIlxuXHRcdGVsc2UgQGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjIpXCJcblxuXHRAZGVmaW5lICdzZWxlY3RlZCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zZWxlY3RlZFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuc2VsZWN0ZWQgPSB2YWx1ZVxuXHRcdFx0aWYgdmFsdWUgdGhlbiBAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuNylcIlxuXHRcdFx0ZWxzZSBAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuMilcIlxuXG5cbiMgQnV0dG9uOiBTVkdcblxuIyBjbGFzcyBTVkdCdXR0b24gZXh0ZW5kcyBUZXh0QnV0dG9uXG4jIFx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcbiMgXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG4jIFx0XHRcdHRleHQ6IFwiXCJcbiMgXHRcdFx0YXNzZXQ6IG51bGxcbiMgXHRcdFx0Y2xpcDogZmFsc2VcbiMgXHRcdFx0YXV0b1NpemU6IGZhbHNlXG5cdFx0XG4jIFx0XHRAc3ZnU2hhcGUgPSBuZXcgU1ZHTGF5ZXJcbiMgXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIm51bGxcIiwgbmFtZTogXCJzdmdTaGFwZVwiXG5cdFx0XG4jIFx0XHRzdXBlciBAb3B0aW9uc1xuIyBcdFx0QHN2Z1NoYXBlLnBhcmVudCA9IEBcbiMgXHRcdEB1cGRhdGVTVkdTaXplKClcblx0XG5cdFxuIyBcdEBkZWZpbmUgJ2Fzc2V0JyxcbiMgXHRcdGdldDogLT4gQG9wdGlvbnMuYXNzZXRcbiMgXHRcdHNldDogKHZhbHVlKSAtPlxuIyBcdFx0XHRAb3B0aW9ucy5hc3NldCA9IHZhbHVlXG4jIFx0XHRcdEBzdmdTaGFwZS5zdGF0ZXMgPVxuIyBcdFx0XHRcdFwib25EYXJrXCI6IHsgc3ZnOiB2YWx1ZS5vbkRhcmsgfVxuIyBcdFx0XHRcdFwib25MaWdodFwiOiB7IHN2ZzogdmFsdWUub25MaWdodCB9XG4jIFx0XHRcdEBzdmdTaGFwZS5zdGF0ZVN3aXRjaChcIm9uRGFya1wiKVxuXHRcbiMgXHR1cGRhdGVTVkdTaXplOiAoKSA9PlxuIyBcdFx0QHN2Z1NoYXBlLndpZHRoID0gQHdpZHRoXG4jIFx0XHRAc3ZnU2hhcGUuaGVpZ2h0ID0gQGhlaWdodFxuXHRcblxuXG5cblxuIyBCdXR0b246IENvcHlcblxuIyBjbGFzcyBDb3B5QnV0dG9uIGV4dGVuZHMgVGV4dEJ1dHRvblxuIyBcdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG4jIFx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuIyBcdFx0XHRsaW5rOiBcImh0dHBzOi8vdGlsbGx1ci5jb21cIlxuIyBcdFx0XHRoYW5kbGVyOiBAY29weUhhbmRsZXJcblx0XHRcbiMgXHRcdEBhcmVhID0gbmV3IExheWVyXG4jIFx0XHRcdG9wYWNpdHk6IDAsIHg6IC0zMDAwLCBodG1sOiBudWxsXG5cdFx0XG4jIFx0XHRzdXBlciBAb3B0aW9uc1xuIyBcdFx0QGFyZWEucGFyZW50ID0gQFxuXHRcblx0XG4jIFx0QGRlZmluZSAnbGluaycsXG4jIFx0XHRnZXQ6IC0+IEBvcHRpb25zLmxpbmtcbiMgXHRcdHNldDogKHZhbHVlKSAtPlxuIyBcdFx0XHRAb3B0aW9ucy5saW5rID0gdmFsdWVcbiMgXHRcdFx0QHVwZGF0ZSh2YWx1ZSlcblx0XG5cdFxuIyBcdHVwZGF0ZTogKGxpbmspID0+XG4jIFx0XHRAYXJlYS5odG1sID0gXCI8dGV4dGFyZWEgY2xhc3M9J2pzLWNvcHl0ZXh0YXJlYS1jbGFzcycgc3R5bGU9J29wYWNpdHk6MDsnPiN7bGlua308L3RleHRhcmVhPlwiXG5cdFxuXHRcbiMgXHRjb3B5SGFuZGxlcjogPT5cbiMgXHRcdHRleHREaXYgPSBAYXJlYS5xdWVyeVNlbGVjdG9yKCcuanMtY29weXRleHRhcmVhLWNsYXNzJylcbiMgXHRcdHRleHREaXYuZm9jdXMoKVxuIyBcdFx0dGV4dERpdi5zZWxlY3QoKVxuIyBcdFx0ZG9jdW1lbnQuZXhlY0NvbW1hbmQgJ2NvcHknXG5cdFx0XG4jIFx0XHRvcmlnaW5UaXRsZSA9IEB0ZXh0XG4jIFx0XHRAdGV4dCA9IFwiRG9uZSDwn5GMXCJcbiMgXHRcdFV0aWxzLmRlbGF5IDEsID0+IEB0ZXh0ID0gb3JpZ2luVGl0bGVcblxuXG5cblxuIyAjICMgQnV0dG9uOiBDb3B5XG5cbiMgIyBjbGFzcyBMaW5rQnV0dG9uIGV4dGVuZHMgU1ZHQnV0dG9uXG4jICMgXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuIyAjIFx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuIyAjIFx0XHRcdGxpbms6IFwiaHR0cHM6Ly90aWxsbHVyLmNvbVwiXG4jICMgXHRcdFx0Ym9yZGVyV2lkdGg6IDEgKiAyXG4jICMgXHRcdFx0Ym9yZGVyUmFkaXVzOiAyMCAqIDJcbiMgIyBcdFx0XHR0dXBsZTogeyBub3JtYWw6IDEuMCwgaG92ZXI6IDAuOCB9XG5cdFx0XHRcblx0XHRcbiMgIyBcdFx0QHRpbnRCdXR0b25GaXggPSBuZXcgTGF5ZXJcbiMgIyBcdFx0XHRoZWlnaHQ6IDEyMCAqIDJcbiMgIyBcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcbiMgIyBcdFx0QGJ1dHRvblRleHQgPSBuZXcgVGV4dFxuIyAjIFx0XHRcdGZvbnRTaXplOiAzMiAqIDJcbiMgIyBcdFx0XHR0ZXh0QWxpZ246IFwicmlnaHRcIlxuIyAjIFx0XHRcdGhlaWdodDogNjAgKiAyXG5cdFx0XG4jICMgXHRcdEBidXR0b25JY29uID0gbmV3IFNWR0xheWVyXG4jICMgXHRcdFx0d2lkdGg6IDI0ICogMiwgaGVpZ2h0OiAyNCAqIDJcbiMgIyBcdFx0XHRzdmc6IFNWRy5vcGVuSWNvbi5vbkxpZ2h0XG4jICMgXHRcdFx0b3BhY2l0eTogMC42XG5cdFx0XHRcblxuXHRcdFxuIyAjIFx0XHRzdXBlciBAb3B0aW9uc1xuXG4jICMgXHRcdEBidXR0b25UZXh0LnRleHQgPSBAdGV4dFxuIyAjIFx0XHRAdGV4dCA9IFwiXCJcblxuIyAjIFx0XHRAdGludEJ1dHRvbkZpeC5wYXJlbnQgPSBAcGFyZW50XG4jICMgXHRcdEB0aW50QnV0dG9uRml4LnggPSBBbGlnbi5yaWdodFxuIyAjIFx0XHRAdGludEJ1dHRvbkZpeC55ID0gQWxpZ24udG9wXG5cdFx0XG4jICMgXHRcdEBwYXJlbnQgPSBAdGludEJ1dHRvbkZpeFxuIyAjIFx0XHRAeSA9IEFsaWduLnRvcCgzMCAqIDIpXG4jICMgXHRcdEBoZWlnaHQgPSA2MCAqIDJcblxuIyAjIFx0XHRAYnV0dG9uVGV4dC5wYXJlbnQgPSBAXG4jICMgXHRcdEBidXR0b25UZXh0LnggPSAxNiAqIDJcbiMgIyBcdFx0QGJ1dHRvblRleHQueSA9IDkgKiAyXG5cbiMgIyBcdFx0QGJ1dHRvbkljb24ucGFyZW50ID0gQFxuIyAjIFx0XHRAYnV0dG9uSWNvbi54ID0gMTYgKiAyICsgQGJ1dHRvblRleHQud2lkdGggKyAxNiAqIDJcbiMgIyBcdFx0QGJ1dHRvbkljb24ueSA9IEFsaWduLmNlbnRlcigzICogMilcblxuIyAjIFx0XHRAd2lkdGggPSAxNiAqIDIgKyBAYnV0dG9uVGV4dC53aWR0aCArIEBidXR0b25JY29uLndpZHRoICsgMTYgKiAyICsgMTYgKiAyXG4jICMgXHRcdEB0aW50QnV0dG9uRml4LndpZHRoID0gQHdpZHRoICsgMzAgKiAyICsgMTYgKiAyXG5cbiMgIyBcdFx0QHRpbnRCdXR0b25GaXgueCA9IEFsaWduLnJpZ2h0XG4jICMgXHRcdEB4ID0gQWxpZ24ucmlnaHQoLTMwICogMilcblx0XHRcblx0XG5cbiMgIyBcdEBkZWZpbmUgJ2xpbmsnLFxuIyAjIFx0XHRnZXQ6IC0+IEBvcHRpb25zLmxpbmtcbiMgIyBcdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmxpbmsgPSB2YWx1ZVxuXHRcbiMgIyBcdHNldENvbG9yOiAoY29sb3IgPSBudWxsKSA9PlxuIyAjIFx0XHRpZiBjb2xvciA9PSBudWxsIHRoZW4gcmV0dXJuXG4jICMgXHRcdEB0aW50QnV0dG9uRml4LmJhY2tncm91bmRDb2xvciA9IGNvbG9yXG5cdFxuXG5cblxuXG5cblxuXG5cbiMgY2xhc3MgUHJldmlld0J1dHRvbiBleHRlbmRzIFRleHRcbiMgXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG4jIFx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuIyBcdFx0XHR0dXBsZTogeyBub3JtYWw6IDEuMCwgaG92ZXI6IDAuOCB9XG5cdFx0XG4jIFx0XHRzdXBlciBAb3B0aW9uc1xuXG4jIFx0XHRAcmVtb3ZlQWxsTGlzdGVuZXJzKClcblxuIyBcdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcbiMgXHRcdEAub25Nb3VzZU91dCBASG92ZXJPZmZcblxuIyBcdEhvdmVyOiA9PlxuIyBcdFx0IyBAc2NhbGUgPSAxLjA1XG4jIFx0XHRAb3BhY2l0eSA9IDEuMFxuXHRcbiMgXHRIb3Zlck9mZjogPT5cbiMgXHRcdCMgQHNjYWxlID0gMS4wXG4jIFx0XHRAb3BhY2l0eSA9IDAuOFxuXG5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtUZXh0LCBUZXh0QnV0dG9uLCBCdXR0b24sIEJ1dHRvblRhYn1cblxuXG4iLCJcblxue0luaXRWaWV3fSA9IHJlcXVpcmUgXCJJbml0Vmlld1wiXG5cbm92ZXJyaWRlVGltZVZhbHVlID0gXCIyMDoyMVwiXG5cbmNsYXNzIGV4cG9ydHMuUGhvbmVUeXBlVmlldyBleHRlbmRzIEluaXRWaWV3XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0c3RhdHVzQmFyOiBcImRhcmtcIiAjIGxpZ2h0L2Rhcmtcblx0XHRcdGhvbWVCYXI6IFwiZGFya1wiICMgbGlnaHQvZGFya1xuXG5cdFx0XHR2aXNpYmxlOiB0cnVlICMgdHJ1ZSAvIGZhbHNlXG5cdFx0XHRmb3JjZUFuZHJvaWRCYXI6IGZhbHNlICMgdHJ1ZSAvIGZhbHNlXG5cblx0XHRcdCMgb3ZlcnJpZGUgd2l0aCBjYXJlXG5cdFx0XHRwcm90b3R5cGVDcmVhdGlvblllYXI6IG92ZXJyaWRlVGltZVZhbHVlXG5cblx0XHRcdCMgZ2V0dGVyc1xuXHRcdFx0c3RhdHVzQmFyVmlldzogbnVsbFxuXHRcdFx0aG9tZUJhclZpZXc6IG51bGxcblx0XHRcdFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFxuXG5cblx0QGRlZmluZSAnc3RhdHVzQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnN0YXR1c0JhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zdGF0dXNCYXIgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnaG9tZUJhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ob21lQmFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmhvbWVCYXIgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgJ2ZvcmNlQW5kcm9pZEJhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuZm9yY2VBbmRyb2lkQmFyID0gdmFsdWVcblx0XG5cblx0QGRlZmluZSAnc2hvd0JhcnMnLFxuXHRcdGdldDogLT4gaWYgQG9wdGlvbnMudmlzaWJsZSB0aGVuIHJldHVybiAxIGVsc2UgcmV0dXJuIDBcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudmlzaWJsZSA9IHZhbHVlXG5cblx0IyBkZXByZWNhdGVkXG5cdEBkZWZpbmUgJ3Zpc2libGUnLFxuXHRcdGdldDogLT4gaWYgQG9wdGlvbnMudmlzaWJsZSB0aGVuIHJldHVybiAxIGVsc2UgcmV0dXJuIDBcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudmlzaWJsZSA9IHZhbHVlXG5cdFxuXG5cblx0QGRlZmluZSAncHJvdG90eXBlQ3JlYXRpb25ZZWFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5wcm90b3R5cGVDcmVhdGlvblllYXIgPSB2YWx1ZVxuXG5cblxuXHRAZGVmaW5lICdzdGF0dXNCYXJWaWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnN0YXR1c0JhclZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc3RhdHVzQmFyVmlldyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdob21lQmFyVmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ob21lQmFyVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ob21lQmFyVmlldyA9IHZhbHVlXG5cblxuXG5cblx0IyBDcmVhdGUgQmFyc1xuXG5cdGNyZWF0ZUJhcnM6ICgpID0+XG5cdFx0QHN0YXR1c0JhclZpZXcgPSBuZXcgTGF5ZXIgXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiBAd2lkdGgsIHk6IEFsaWduLnRvcCwgbmFtZTogXCIuc3RhdHVzIGJhclwiXG5cdFx0XHRvcGFjaXR5OiBAdmlzaWJsZSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0aWYgQGZvcmNlQW5kcm9pZEJhclxuXHRcdFx0QGNyZWF0ZUNsYXNzaWNBbmRyb2lkU3RhdHVzQmFyKEBzdGF0dXNCYXJWaWV3KSBcblxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM3NSwgODEyKSBvciBAdmlld1NpemUoMzkwLCA4NDQpIG9yIEB2aWV3U2l6ZSg0MTQsIDg5Nikgb3IgQHZpZXdTaXplKDQyOCwgOTI2KSBvciBAdmlld1NpemUoMzYwLCA3ODIpXG5cdFx0XHRAY3JlYXRlTm90Y2hTdGF0dXNCYXIoQHN0YXR1c0JhclZpZXcpXG5cdFx0XHRAY3JlYXRlSG9tZUluZGljYXRvciBuZXcgTGF5ZXJcblx0XHRcdFx0cGFyZW50OiBALCB3aWR0aDogQHdpZHRoLCBoZWlnaHQ6IDM0LCB5OiBBbGlnbi5ib3R0b20sIG5hbWU6IFwiLmhvbWUgYmFyXCIsIG9wYWNpdHk6IEB2aXNpYmxlLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRlbHNlIGlmIEB2aWV3U2l6ZSgzOTMsIDg1Milcblx0XHRcdHByaW50IFwib2tcIlxuXHRcdFx0QGNyZWF0ZU5vdGNoU3RhdHVzQmFyKEBzdGF0dXNCYXJWaWV3KVxuXHRcdFx0QGNyZWF0ZUhvbWVJbmRpY2F0b3IgbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogQCwgd2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiAzNCwgeTogQWxpZ24uYm90dG9tLCBuYW1lOiBcIi5ob21lIGJhclwiLCBvcGFjaXR5OiBAdmlzaWJsZSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0ZWxzZSBpZiBAdmlld1NpemUoMzc1LCA2NjcpIG9yIEB2aWV3U2l6ZSg0MTQsIDczNikgb3IgQHZpZXdTaXplKDMyMCwgNTY4KVxuXHRcdFx0QGNyZWF0ZUNsYXNzaWNTdGF0dXNCYXIoQHN0YXR1c0JhclZpZXcpXG5cdFx0XG5cdFx0XG5cdFx0ZWxzZSBAY3JlYXRlQW5kcm9pZFN0YXR1c0JhcihAc3RhdHVzQmFyVmlldylcblx0XG5cdFxuXHRcblx0XG5cblxuXG5cdGNyZWF0ZUFuZHJvaWRTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAzMlxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTIsIGhlaWdodDogMjAsIHg6IEFsaWduLmxlZnQoNCksIHk6IEFsaWduLnRvcCgyICsgNSlcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0BzdGF0dXNCYXJdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxNCwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5yaWdodCgtNCksIHk6IEFsaWduLnRvcCg1KVxuXHRcdFx0aW1hZ2U6IEBhc3NldHMuYW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHN0YXR1c0Jhcl1cblx0XG5cdFxuXHRjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDIwXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1MiwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ubGVmdCwgeTogQWxpZ24udG9wKDIpXG5cdFx0XHRjb2xvcjogQGFzc2V0cy5jb2xvcltAc3RhdHVzQmFyXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTQsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ucmlnaHQsIHk6IEFsaWduLnRvcCgpXG5cdFx0XHRpbWFnZTogQGFzc2V0cy5hbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZVtAc3RhdHVzQmFyXVxuXHRcblx0XG5cblxuXG5cdGNyZWF0ZUNsYXNzaWNTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNMZWZ0Q29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24ubGVmdFxuXHRcdFx0aW1hZ2U6IEBhc3NldHMub2xkU3RhdHVzQmFyTGVmdEltYWdlW0BzdGF0dXNCYXJdXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1NCwgaGVpZ2h0OiAxNiwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGNvbG9yOiBAYXNzZXRzLmNvbG9yW0BzdGF0dXNCYXJdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24ucmlnaHRcblx0XHRcdGltYWdlOiBAYXNzZXRzLm9sZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHN0YXR1c0Jhcl1cblx0XHRcblx0XG5cdGNyZWF0ZU5vdGNoU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gNDRcblx0XHRcblx0XHRub3RjaExlZnRDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTQsIGhlaWdodDogMjEsIHg6IEFsaWduLmxlZnQoMjEpLCB5OiBBbGlnbi50b3AoMTIpXG5cdFx0XHRjb2xvcjogQGFzc2V0cy5jb2xvcltAc3RhdHVzQmFyXSwgYmFja2dyb3VuZENvbG9yOiBudWxsLCBsZXR0ZXJTcGFjaW5nOiAtMC4xN1xuXHRcdFx0Zm9udFNpemU6IDE1LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0bm90Y2hDZW50ZXJDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAzNzUsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5jZW50ZXJcblx0XHRcdGltYWdlOiBAYXNzZXRzLm5vdGNoXG5cdFx0XG5cdFx0bm90Y2hSaWdodENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5zdGF0dXNCYXJSaWdodEltYWdlW0BzdGF0dXNCYXJdXG5cdFxuXHRcblx0XG5cblxuXG5cdGNyZWF0ZUhvbWVJbmRpY2F0b3I6IChiYXJMYXllcikgPT5cblx0XHRAaG9tZUJhclZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdG5hbWU6IFwiLmhvbWVWaWV3XCJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMzUsIGhlaWdodDogNSwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5ib3R0b20oLTgpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEBhc3NldHMuY29sb3JbQGhvbWVCYXJdLCBib3JkZXJSYWRpdXM6IDIwXG5cdFxuXHQiLCJcblxuQXNzZXRzID0gcmVxdWlyZSBcIlByZXZpZXdfQXNzZXRzXCJcblxuXG4jIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gXCJhdXRvXCJcblxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3Q2xhc3MxIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRuYW1lOiBcIlByZXZpZXdcIlxuXHRcdFx0dmlldzogbnVsbFxuXHRcdFx0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGJvcmRlclJhZGl1czogNDJcblx0XHRcdFxuXHRcdFx0YXNzZXRzOiBBc3NldHMuZGF0YVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblxuXHRcdHdpbmRvdy5zYXZlUHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QoQClcblx0XHRcblx0XHRAc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgc2NhbGU6IDEgfVxuXHRcdFx0XCJmaWxsXCI6IHsgc2NhbGU6IDEgfVxuXHRcdFxuXHRcdFxuXHRcdFxuXG5cdFxuXG5cdEBkZWZpbmUgJ3ZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudmlld1xuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMudmlldyA9IHZhbHVlXG5cdFx0XHRAd2lkdGggPSBAdmlldy53aWR0aFxuXHRcdFx0QGhlaWdodCA9IEB2aWV3LmhlaWdodFxuXHRcdFx0QHZpZXcucGFyZW50ID0gQFxuXG5cdEBkZWZpbmUgJ2Fzc2V0cycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5hc3NldHNcblxuXG5cblxuXG5cdHNjcmVlblNpemU6ICh3LCBoKSA9PiByZXR1cm4gU2NyZWVuLndpZHRoID09IHcgYW5kIFNjcmVlbi5oZWlnaHQgPT0gaFxuXHR2aWV3U2l6ZTogKHcsIGgpID0+IHJldHVybiBAd2lkdGggPT0gdyBhbmQgQGhlaWdodCA9PSBoXG5cdHZpZXdXaWR0aDogKHcpID0+IHJldHVybiBAd2lkdGggPT0gd1xuXG5cdGxvZ1NpemU6ICgpID0+XG5cdFx0bmV3IFRleHRMYXllciB7IHRleHQ6IFwiI3tTY3JlZW4ud2lkdGh9eCN7U2NyZWVuLmhlaWdodH1cIiwgeTogQWxpZ24uY2VudGVyIH1cdFxuXG5cblxuXHRhbmltYXRlU3RhdGVUb05vcm1hbDogKCkgPT5cblx0XHRAYW5pbWF0ZShcIm5vcm1hbFwiLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFxuXHRhbmltYXRlU3RhdGVUb0ZpbGw6ICgpID0+XG5cdFx0QGFuaW1hdGUoXCJmaWxsXCIsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XG5cdHN0YXRlU3dpdGNoVG9Ob3JtYWw6ICgpID0+XG5cdFx0QHN0YXRlU3dpdGNoKFwibm9ybWFsXCIpXG5cdFxuXHRzdGF0ZVN3aXRjaFRvRmlsbDogKCkgPT5cblx0XHRAc3RhdGVTd2l0Y2goXCJmaWxsXCIpXG5cblxuXHRcdFxuIiwiXG5cbntQcmV2aWV3Q2xhc3MxfSA9IHJlcXVpcmUgXCJQcmV2aWV3Q2xhc3MxXCJcblxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXdDbGFzczIgZXh0ZW5kcyBQcmV2aWV3Q2xhc3MxXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0c3RhdHVzQmFyOiBcImRhcmtcIiAjIGxpZ2h0L2Rhcmtcblx0XHRcdGhvbWVCYXI6IFwiZGFya1wiICMgbGlnaHQvZGFya1xuXG5cdFx0XHR2aXNpYmxlOiB0cnVlICMgdHJ1ZSAvIGZhbHNlXG5cdFx0XHRmb3JjZUFuZHJvaWRCYXI6IGZhbHNlICMgdHJ1ZSAvIGZhbHNlXG5cblx0XHRcdCMgb3ZlcnJpZGUgd2l0aCBjYXJlXG5cdFx0XHRwcm90b3R5cGVDcmVhdGlvblllYXI6IFwiMjA6MjBcIlxuXHRcdFx0XG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XG5cblxuXHRAZGVmaW5lICdzdGF0dXNCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc3RhdHVzQmFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnN0YXR1c0JhciA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdob21lQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmhvbWVCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuaG9tZUJhciA9IHZhbHVlXG5cblx0QGRlZmluZSAnZm9yY2VBbmRyb2lkQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZEJhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRCYXIgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAndmlzaWJsZScsXG5cdFx0Z2V0OiAtPiBpZiBAb3B0aW9ucy52aXNpYmxlIHRoZW4gcmV0dXJuIDEgZWxzZSByZXR1cm4gMFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy52aXNpYmxlID0gdmFsdWVcblx0XG5cblxuXHRAZGVmaW5lICdwcm90b3R5cGVDcmVhdGlvblllYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnByb3RvdHlwZUNyZWF0aW9uWWVhciA9IHZhbHVlXG5cblxuXG5cblxuXHQjIENyZWF0ZSBCYXJzXG5cblx0Y3JlYXRlQmFyczogKCkgPT5cblx0XHR0b3BCYXIgPSBuZXcgTGF5ZXIgXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiBAd2lkdGgsIHk6IEFsaWduLnRvcCwgbmFtZTogXCIuc3RhdHVzIGJhclwiXG5cdFx0XHRvcGFjaXR5OiBAdmlzaWJsZSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0aWYgQHZpZXdTaXplKDM3NSwgODEyKSBvciBAdmlld1NpemUoMzkwLCA4NDQpIG9yIEB2aWV3U2l6ZSg0MTQsIDg5Nikgb3IgQHZpZXdTaXplKDQyOCwgOTI2KSBvciBAdmlld1NpemUoMzYwLCA3ODIpXG5cdFx0XHRAY3JlYXRlTm90Y2hTdGF0dXNCYXIodG9wQmFyKVxuXHRcdFx0QGNyZWF0ZUhvbWVJbmRpY2F0b3IgbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogQCwgd2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiAzNCwgeTogQWxpZ24uYm90dG9tLCBuYW1lOiBcIi5ob21lIGJhclwiLCBvcGFjaXR5OiBAdmlzaWJsZSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0ZWxzZSBpZiBAdmlld1NpemUoMzc1LCA2NjcpIG9yIEB2aWV3U2l6ZSg0MTQsIDczNikgb3IgQHZpZXdTaXplKDMyMCwgNTY4KVxuXHRcdFx0QGNyZWF0ZUNsYXNzaWNTdGF0dXNCYXIodG9wQmFyKVxuXHRcdFxuXHRcdGVsc2UgaWYgQGZvcmNlQW5kcm9pZEJhclxuXHRcdFx0QGNyZWF0ZUNsYXNzaWNBbmRyb2lkU3RhdHVzQmFyKHRvcEJhcikgXG5cdFx0XG5cdFx0ZWxzZSBAY3JlYXRlQW5kcm9pZFN0YXR1c0Jhcih0b3BCYXIpXG5cdFxuXHRcblx0XG5cdFxuXG5cblxuXHRjcmVhdGVBbmRyb2lkU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gMzJcblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDUyLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5sZWZ0KDQpLCB5OiBBbGlnbi50b3AoMiArIDUpXG5cdFx0XHRjb2xvcjogQGFzc2V0cy5jb2xvcltAc3RhdHVzQmFyXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTQsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ucmlnaHQoLTQpLCB5OiBBbGlnbi50b3AoNSlcblx0XHRcdGltYWdlOiBAYXNzZXRzLmFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlW0BzdGF0dXNCYXJdXG5cdFxuXHRcblx0Y3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTIsIGhlaWdodDogMjAsIHg6IEFsaWduLmxlZnQsIHk6IEFsaWduLnRvcCgyKVxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbQHN0YXR1c0Jhcl0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDE0LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogMjAsIHg6IEFsaWduLnJpZ2h0LCB5OiBBbGlnbi50b3AoKVxuXHRcdFx0aW1hZ2U6IEBhc3NldHMuYW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHN0YXR1c0Jhcl1cblx0XG5cdFxuXG5cblxuXHRjcmVhdGVDbGFzc2ljU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gMjBcblx0XHRcblx0XHRjbGFzc2ljTGVmdENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLmxlZnRcblx0XHRcdGltYWdlOiBAYXNzZXRzLm9sZFN0YXR1c0JhckxlZnRJbWFnZVtAc3RhdHVzQmFyXVxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTQsIGhlaWdodDogMTYsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRjb2xvcjogQGFzc2V0cy5jb2xvcltAc3RhdHVzQmFyXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5vbGRTdGF0dXNCYXJSaWdodEltYWdlW0BzdGF0dXNCYXJdXG5cdFx0XG5cdFxuXHRjcmVhdGVOb3RjaFN0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDQ0XG5cdFx0XG5cdFx0bm90Y2hMZWZ0Q29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDU0LCBoZWlnaHQ6IDIxLCB4OiBBbGlnbi5sZWZ0KDIxKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbQHN0YXR1c0Jhcl0sIGJhY2tncm91bmRDb2xvcjogbnVsbCwgbGV0dGVyU3BhY2luZzogLTAuMTdcblx0XHRcdGZvbnRTaXplOiAxNSwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdG5vdGNoQ2VudGVyQ29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMzc1LCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24uY2VudGVyXG5cdFx0XHRpbWFnZTogQGFzc2V0cy5ub3RjaFxuXHRcdFxuXHRcdG5vdGNoUmlnaHRDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5yaWdodFxuXHRcdFx0aW1hZ2U6IEBhc3NldHMuc3RhdHVzQmFyUmlnaHRJbWFnZVtAc3RhdHVzQmFyXVxuXHRcblx0XG5cdFxuXG5cblxuXHRjcmVhdGVIb21lSW5kaWNhdG9yOiAoYmFyTGF5ZXIpID0+XG5cdFx0aG9tZUluZGljYXRvciA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEzNSwgaGVpZ2h0OiA1LCB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmJvdHRvbSgtOClcblx0XHRcdGJhY2tncm91bmRDb2xvcjogQGFzc2V0cy5jb2xvcltAaG9tZUJhcl0sIGJvcmRlclJhZGl1czogMjBcblx0XG5cdCIsIlxuXG57UHJldmlld0NsYXNzM30gPSByZXF1aXJlIFwiUHJldmlld0NsYXNzM1wiXG5cblxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3Q2xhc3MzNSBleHRlbmRzIFByZXZpZXdDbGFzczNcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRib3JkZXJWaWV3OiBudWxsXG5cdFx0XHRzaG93RGV2aWNlOiBmYWxzZVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAYm9yZGVyVmlldyA9IG5ldyBMYXllclxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIjAwMFwiXG5cdFx0XHRib3JkZXJSYWRpdXM6IEBib3JkZXJSYWRpdXMgKyAxNlxuXHRcdFx0b3BhY2l0eTogMVxuXG5cdFx0QGJvcmRlclZpZXcuc2VuZFRvQmFjaygpXG5cdFx0IyBpZiBAc2hvd0RldmljZSB0aGVuIEBzaG93Qm9yZGVyVmlldygpXG5cblx0XHRAaW5pdEJvcmRlclZpZXdDc3MoKVxuXHRcdEB1cGRhdGVCb3JkZXJWaWV3KClcblxuXHRcdEBvbiBcImNoYW5nZTpzaXplXCIsIC0+XG5cdFx0XHRAdXBkYXRlQm9yZGVyVmlldygpXG5cdFx0XG5cdFx0QG9uIFwiY2hhbmdlOnNjYWxlXCIsIC0+XG5cdFx0XHRAdXBkYXRlQm9yZGVyVmlldygpXG5cdFx0XG5cdFx0QG9uIFwiY2hhbmdlOnhcIiwgLT5cblx0XHRcdEB1cGRhdGVCb3JkZXJWaWV3KClcblx0XHRcblx0XHRAb24gXCJjaGFuZ2U6eVwiLCAtPlxuXHRcdFx0QHVwZGF0ZUJvcmRlclZpZXcoKVxuXHRcdFxuXG5cdFxuXHRAZGVmaW5lICdib3JkZXJWaWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmJvcmRlclZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuYm9yZGVyVmlldyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdzaG93RGV2aWNlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNob3dEZXZpY2Vcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0RldmljZSA9IHZhbHVlXG5cdFxuXHRcblxuXG5cdHNob3dCb3JkZXJWaWV3OiAoKSA9PlxuXHRcdEBib3JkZXJWaWV3Lm9wYWNpdHkgPSAxXG5cdFxuXHRoaWRlQm9yZGVyVmlldzogKCkgPT5cblx0XHRAYm9yZGVyUmFkaXVzLm9wYWNpdHkgPSAwXG5cblx0dXBkYXRlQm9yZGVyVmlldzogKCkgPT5cblx0XHRkZWx0YUcgPSAxNlxuXG5cdFx0IyBAYm9yZGVyVmlldy54ID0gQHggLSBkZWx0YUdcblx0XHQjIEBib3JkZXJWaWV3LnkgPSBAeSAtIGRlbHRhR1xuXHRcdEBib3JkZXJWaWV3LndpZHRoID0gQHdpZHRoICsgZGVsdGFHICogMlxuXHRcdEBib3JkZXJWaWV3LmhlaWdodCA9IEBoZWlnaHQgKyBkZWx0YUcgKiAyXG5cdFx0QGJvcmRlclZpZXcueCA9IEFsaWduLmNlbnRlcigpXG5cdFx0QGJvcmRlclZpZXcueSA9IEFsaWduLmNlbnRlcigpXG5cdFx0QGJvcmRlclZpZXcuc2NhbGUgPSBAc2NhbGVcblx0XHRcblx0XG5cdGluaXRCb3JkZXJWaWV3Q3NzOiAoKSA9PlxuXHRcdEBib3JkZXJWaWV3LmNsYXNzTGlzdC5hZGQoXCJpcGhvbmUtdGlsbGx1ci12XCIpXG4gXG5cdFx0Y3NzID0gXCJcIlwiXG5cdFx0LmlwaG9uZS10aWxsbHVyLXYge1xuXHRcdFx0YmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxuXHRcdFx0MTYwLjc0ZGVnLFxuXHRcdFx0cmdiYSgzNiwgMzYsIDM2LCAwLjMpIDI0LjM5JSxcblx0XHRcdHJnYmEoMjgsIDI4LCAyOCwgMC4zKSAyOS40NyUsXG5cdFx0XHRyZ2JhKDEwLCAxMCwgMTAsIDAuMykgOTkuODUlXG5cdFx0XHQpLFxuXHRcdFx0bGluZWFyLWdyYWRpZW50KFxuXHRcdFx0MTgwZGVnLFxuXHRcdFx0cmdiYSgyLCAyLCAyLCAwLjYpIC0wLjIxJSxcblx0XHRcdHJnYmEoMjEsIDIxLCAyMSwgMC42KSA2LjUyJSxcblx0XHRcdHJnYmEoNiwgNiwgNiwgMC42KSA5OS43OSVcblx0XHRcdCksXG5cdFx0XHQjNWE1YTVhO1xuXHRcdGJveC1zaGFkb3c6IDhweCAxNHB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjI1KSxcblx0XHRcdGluc2V0IDBweCAtNHB4IDE2cHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpLFxuXHRcdFx0aW5zZXQgNHB4IDBweCA0cHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpLFxuXHRcdFx0aW5zZXQgLTRweCAwcHggNHB4IHJnYmEoMCwgMCwgMCwgMC43KTtcblxuXHRcdH1cblx0XHRcIlwiXCJcblx0XHRcblx0XHRVdGlscy5pbnNlcnRDU1MoY3NzKSIsIlxue0xvZ29MYXllcn0gPSByZXF1aXJlIFwiUHJldmlld19Mb2dvTGF5ZXJcIlxue1ByZXZpZXdDbGFzczJ9ID0gcmVxdWlyZSBcIlByZXZpZXdDbGFzczJcIlxuXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld0NsYXNzMyBleHRlbmRzIFByZXZpZXdDbGFzczJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXG5cdFxuXHRcblx0XG5cdGNyZWF0ZUxvZ29CdXR0b246ICgpID0+XG5cdFx0XG5cdFx0b3BlbkhvbWVIYW5kbGVyID0gKCkgLT5cblx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IFwiaHR0cHM6Ly90aWxsbHVyLmNvbVwiXG5cdFx0XG5cdFx0bG9nb0J1dHRvbiA9IG5ldyBMb2dvTGF5ZXJcblx0XHRcdHdpZHRoOiA3NiwgaGVpZ2h0OiAzMlxuXHRcdFx0eDogQWxpZ24ubGVmdCgzMiksIHk6IEFsaWduLnRvcCgxMilcblx0XHRcdGhhbmRsZXI6IG9wZW5Ib21lSGFuZGxlclxuXHRcblx0XG5cdFxuXHRjcmVhdGVTY2FsZUJ1dHRvbjogKGZvclN0YXRlKSA9PlxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlID0gbmV3IExheWVyXG5cdFx0XHRzaXplOiA0OCwgYm9yZGVyUmFkaXVzOiA0OFxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTMyKSwgeTogQWxpZ24uYm90dG9tKC0zMilcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjEpXCJcblx0XHRcdGJvcmRlcldpZHRoOiAyXG5cdFx0XHRjdXN0b206XG5cdFx0XHRcdHByZXZpZXc6IEBcblx0XHRcblx0XHRidXR0b25TY2FsZS5zdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcblx0XHRidXR0b25TY2FsZS5zdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjIpXCIgfVxuXHRcdFx0XCJmaWxsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC42KVwiIH1cblx0XHRidXR0b25TY2FsZS5zdGF0ZVN3aXRjaChmb3JTdGF0ZSlcblx0XHRcblx0XHRidXR0b25JbnNpZGVMYXllciA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBidXR0b25TY2FsZVxuXHRcdFx0Ym9yZGVyV2lkdGg6IDJcblx0XHRcdHNpemU6IDI4LCBib3JkZXJSYWRpdXM6IDIyXG5cdFx0XHR4OiAxMCwgeTogMTBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0XG5cdFx0XG5cdFx0YnV0dG9uSW5zaWRlTGF5ZXIuc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC42KVwiIH1cblx0XHRcdFwiZmlsbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuMilcIiB9XG5cdFx0YnV0dG9uSW5zaWRlTGF5ZXIuc3RhdGVTd2l0Y2goZm9yU3RhdGUpXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUub25UYXAgLT5cblx0XHRcdGlmIEBzdGF0ZXMuY3VycmVudC5uYW1lID09IFwiZmlsbFwiIHRoZW4gbmV4dFN0YXRlID0gXCJub3JtYWxcIiBlbHNlIG5leHRTdGF0ZSA9IFwiZmlsbFwiXG5cdFx0XHRAc3RhdGVTd2l0Y2gobmV4dFN0YXRlKVxuXHRcdFx0QGNoaWxkcmVuWzBdLnN0YXRlU3dpdGNoKG5leHRTdGF0ZSlcblx0XHRcdEBjdXN0b20ucHJldmlldy5hbmltYXRlKG5leHRTdGF0ZSwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcdFxuXHRcdHVwZGF0ZUJ1dHRvbk9uUmVzaXplID0gKGJ1dHRvbkxheWVyKSA9PlxuXHRcdFx0bG9jYWxCdXR0b24gPSBidXR0b25MYXllclxuXHRcdFx0XG5cdFx0XHRDYW52YXMub24gXCJjaGFuZ2U6aGVpZ2h0XCIsID0+XG5cdFx0XHRcdGJ1dHRvbkxheWVyLnggPSBBbGlnbi5yaWdodCgtMzIpXG5cdFx0XHRcblx0XHRcdENhbnZhcy5vbiBcImNoYW5nZTp3aWR0aFwiLCA9PlxuXHRcdFx0XHRidXR0b25MYXllci55ID0gQWxpZ24uYm90dG9tKC0zMilcblx0XHRcblx0XHR1cGRhdGVCdXR0b25PblJlc2l6ZShidXR0b25TY2FsZSlcblxuXG5cbiIsIlxuXG57UHJldmlld0NsYXNzMzV9ID0gcmVxdWlyZSBcIlByZXZpZXdDbGFzczM1XCJcblxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXdDbGFzczQgZXh0ZW5kcyBQcmV2aWV3Q2xhc3MzNVxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHNjYWxlUHJldmlldygpXG5cblx0XG5cdFxuXHRcblx0XG5cdHNjYWxlUHJldmlldzogKCkgPT5cblx0XHRpZiBVdGlscy5pc01vYmlsZSgpXG5cdFx0XHRAcHJldmlld01vYmlsZSgpXG5cdFx0ZWxzZVxuXHRcdFx0QHVwZGF0ZVNjYWxlU3RhdGUoKVxuXHRcdFx0QHNldERlc2t0b3BTY2FsZU1vZGUoKVxuXHRcdFx0QHByZXZpZXdEZXNrdG9wKClcblx0XHRcdEB1cGRhdGVQcmV2aWV3T25SZXNpemUoKVxuXG5cblx0XG5cdFxuXHR1cGRhdGVTY2FsZVN0YXRlOiAoKSA9PlxuXHRcdHNjYWxlWCA9IChDYW52YXMud2lkdGggLSAxMTIpIC8gQHdpZHRoXG5cdFx0c2NhbGVZID0gKENhbnZhcy5oZWlnaHQgLSAxMTIpIC8gQGhlaWdodFxuXHRcdEBzdGF0ZXMuZmlsbC5zY2FsZSA9IE1hdGgubWluKHNjYWxlWCwgc2NhbGVZKVxuXHRcblxuXG5cblxuXHRzZXREZXNrdG9wU2NhbGVNb2RlOiAoZm9yU3RhdGUgPSBcIm5vcm1hbFwiKSA9PlxuXG5cdFx0aW5pdFN0YXRlID0gQGdldFN0YXRlR2VuZXJpYyhcInNjYWxlXCIsIFt7IHZhbHVlOiBcImZpbGxcIiwgcmVzdWx0OiBcImZpbGxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJub3JtYWxcIiwgcmVzdWx0OiBcIm5vcm1hbFwiIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcInRydWVcIiwgcmVzdWx0OiBcImZpbGxcIiB9XSwgZm9yU3RhdGUpXG5cblx0XHRzaG91bGRTaG93QnV0dG9uID0gQGdldFN0YXRlR2VuZXJpYyhcImJ1dHRvblwiLCBbeyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvZmZcIiwgcmVzdWx0OiBmYWxzZSB9XSwgdHJ1ZSlcblxuXHRcdHNob3VsZFNob3dMb2dvID0gQGdldFN0YXRlR2VuZXJpYyhcImxvZ29cIiwgW3sgdmFsdWU6IFwiZmFsc2VcIiwgcmVzdWx0OiBmYWxzZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9mZlwiLCByZXN1bHQ6IGZhbHNlIH1dLCB0cnVlKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0c2hvdWxkU2hvd0RldmljZSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJkZXZpY2VcIiwgW3sgdmFsdWU6IFwiZmFsc2VcIiwgcmVzdWx0OiBmYWxzZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcInRydWVcIiwgcmVzdWx0OiB0cnVlIH1dLCBmYWxzZSlcblx0XHRcblx0XHRpZiBzaG91bGRTaG93TG9nbyB0aGVuIEBjcmVhdGVMb2dvQnV0dG9uKClcblx0XHRpZiBzaG91bGRTaG93QnV0dG9uIHRoZW4gQGNyZWF0ZVNjYWxlQnV0dG9uKGluaXRTdGF0ZSlcblx0XHRpZiBzaG91bGRTaG93RGV2aWNlIHRoZW4gQHNob3dCb3JkZXJWaWV3KCkgZWxzZSBAaGlkZUJvcmRlclZpZXcoKVxuXHRcdEBzdGF0ZVN3aXRjaChpbml0U3RhdGUpXG5cdFxuXHRcblx0XG5cdHByZXZpZXdEZXNrdG9wOiAoKSA9PlxuXHRcdENhbnZhcy5iYWNrZ3JvdW5kQ29sb3IgPSBcIjIyMlwiXG5cdFx0QGNyZWF0ZUJhcnMoKVxuXHRcdEBjZW50ZXIoKVxuXHRcdEBjbGlwID0gdHJ1ZVxuXG5cblx0dXBkYXRlUHJldmlld09uUmVzaXplOiAoKSA9PlxuXHRcdGxvY2FsUHJldmlldyA9IEBcblx0XHRcblx0XHRDYW52YXMub24gXCJjaGFuZ2U6aGVpZ2h0XCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcueCA9IEFsaWduLmNlbnRlclxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVNjYWxlU3RhdGUoKVxuXHRcdFxuXHRcdENhbnZhcy5vbiBcImNoYW5nZTp3aWR0aFwiLCA9PlxuXHRcdFx0bG9jYWxQcmV2aWV3LnkgPSBBbGlnbi5jZW50ZXJcblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZVN0YXRlKClcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRcblx0XG5cdHByZXZpZXdNb2JpbGU6ICgpID0+XG5cdFx0cHJldmlld0NhbnZhcyA9IG5ldyBCYWNrZ3JvdW5kTGF5ZXJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIyMjJcIiwgbmFtZTogXCIuaGlkZGVuUHJldmlld0NhbnZhc1wiXG5cdFx0XG5cdFx0QGNsaXAgPSBmYWxzZVxuXHRcdEBjZW50ZXIoKVxuXHRcdEBvcmlnaW5ZID0gMC41XG5cdFx0QG9yaWdpblggPSAwLjVcblxuXHRcdCMgcHJpbnQgQHdpZHRoICsgJyAnICsgQGhlaWdodFxuXHRcdFxuXHRcdFxuXHRcdGlmIEB2aWV3U2l6ZSgzNjAsIDY0MCkgb3IgQHZpZXdTaXplKDM3NSwgNjY3KSBvciBAdmlld1NpemUoMzc1LCA4MTIpIG9yIEB2aWV3U2l6ZSgzOTAsIDg0NCkgb3IgQHZpZXdTaXplKDQxNCwgODk2KSBvciBAdmlld1NpemUoNDI4LCA5MjYpXG5cdFx0XHRAc2NhbGUgPSBTY3JlZW4ud2lkdGggLyBAd2lkdGhcblx0XHRlbHNlXG5cdFx0XHRAc2V0Q3VzdG9tUHJldmlldygpXG5cdFxuXHRcblxuXHRzZXRDdXN0b21QcmV2aWV3OiAoKSA9PlxuXHRcdEB5ID0gQWxpZ24udG9wXG5cdFx0QG9yaWdpblkgPSAwLjFcblx0XHRcblx0XHRAc2NhbGUgPSAoU2NyZWVuLmhlaWdodCAtIDEyMCkgLyBAaGVpZ2h0XG5cdFx0QGJvcmRlclJhZGl1cyA9IDIwXG5cdFx0QGNsaXAgPSB0cnVlXG5cblx0XHR0aXAgPSBuZXcgTGF5ZXJcblx0XHRcdHdpZHRoOiAyNDAsIGhlaWdodDogNDRcblx0XHRcdGltYWdlOiBAYXNzZXRzLnRpcFxuXHRcdFx0eDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5ib3R0b20oLTMwKVxuXHRcdFx0b3BhY2l0eTogMC41XG5cblxuXG5cblx0IyBnZXRTdGF0ZUdlbmVyaWM6IChrZXkgPSBcInNjYWxlXCIsIHBhaXJzID0gW3sgdmFsdWU6ICwgcmVzdWx0OiB9LCB7dmFsdWU6ICwgcmVzdWx0OiB9XSwgZGVmYXVsdFJlc3VsdCA9IFwiXCIpXG5cdGdldFN0YXRlR2VuZXJpYzogKHN0YXRlS2V5ID0gXCJzY2FsZVwiLCBzdGF0ZVBhaXJzID0gW10sIGRlZmF1bHRSZXN1bHQgPSBcIlwiKSA9PlxuXHRcdHJlc3VsdCA9IGRlZmF1bHRSZXN1bHRcblxuXHRcdGZvciBpdGVtIGluIGxvY2F0aW9uLnNlYXJjaFsxLi5dLnNwbGl0KCcmJylcblx0XHRcdGtleVZhbHVlUGFpciA9IGl0ZW0uc3BsaXQoXCI9XCIpXG5cdFx0XHRrZXlQYXJ0ID0ga2V5VmFsdWVQYWlyWzBdXG5cdFx0XHR2YWx1ZVBhcnQgPSBrZXlWYWx1ZVBhaXJbMV1cblxuXHRcdFx0aWYga2V5UGFydCA9PSBzdGF0ZUtleVxuXHRcdFx0XHRmb3IgcGFpciBpbiBzdGF0ZVBhaXJzXG5cdFx0XHRcdFx0aWYgdmFsdWVQYXJ0ID09IHBhaXIudmFsdWVcblx0XHRcdFx0XHRcdCMgcHJpbnQgXCJvayBcIiArIFwiICN7cGFpci52YWx1ZX1cIiBcblx0XHRcdFx0XHRcdHJlc3VsdCA9IHBhaXIucmVzdWx0XG5cdFx0XHRcdFx0IyBlbHNlXG5cdFx0XHRcdFx0XHQjIHByaW50IFwibm90IFwiICsgXCIgI3twYWlyLnZhbHVlfVwiIFxuXHRcdFxuXHRcdHJldHVybiByZXN1bHRcblx0XG5cdFxuXHRcblx0XG4iLCJcblxue1ByZXZpZXdDbGFzczR9ID0gcmVxdWlyZSBcIlByZXZpZXdDbGFzczRcIlxuXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld0NsYXNzNSBleHRlbmRzIFByZXZpZXdDbGFzczRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdGNvbnRyb2xQYW5lbExheWVyID0gbmV3IExheWVyXG5cdFx0XHR3aWR0aDogMzYwLCBoZWlnaHQ6IDEwMDBcblx0XHRcdHg6IDIwLCB5OiA2MFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0Y29udHJvbFBhbmVsOiBjb250cm9sUGFuZWxMYXllclxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRjb250cm9sUGFuZWxMYXllci5wYXJlbnQgPSBAcGFyZW50XG5cblx0XG5cdEBkZWZpbmUgJ2NvbnRyb2xQYW5lbCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5jb250cm9sUGFuZWxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuY29udHJvbFBhbmVsID0gdmFsdWVcblx0XG5cdGFkZFNlY3Rpb246ICh0aXRsZSwgYWN0aW9uQXJyYXkgPSBbXSkgPT5cblx0XHRpZiBVdGlscy5pc01vYmlsZSgpIHRoZW4gcmV0dXJuXG5cdFx0ZWxzZVxuXHRcdFx0c2VjdGlvblZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdFx0d2lkdGg6IDM2MFxuXHRcdFx0XHRoZWlnaHQ6IDEwMFxuXHRcdFx0XHRwYXJlbnQ6IEBjb250cm9sUGFuZWxcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRcblx0XHRcdHNlY3Rpb25WaWV3LnkgPSAoQGNvbnRyb2xQYW5lbC5jaGlsZHJlbi5sZW5ndGggLSAxKSAqIDEwMFxuXG5cdFx0XHRAYWRkU2VjdGlvblRpdGxlKHRpdGxlKS5wYXJlbnQgPSBzZWN0aW9uVmlld1xuXG5cdFx0XHRzdW1YID0gMFxuXHRcdFx0Zm9yIGFjdGlvbkl0ZW0sIGluZGV4IGluIGFjdGlvbkFycmF5XG5cdFx0XHRcdHNlY3Rpb25CdXR0b24gPSBAYWRkU2VjdGlvbkJ1dHRvbihhY3Rpb25JdGVtKVxuXHRcdFx0XHRzZWN0aW9uQnV0dG9uLnBhcmVudCA9IHNlY3Rpb25WaWV3XG5cdFx0XHRcdHNlY3Rpb25CdXR0b24ueCA9IHN1bVhcblx0XHRcdFx0c3VtWCArPSBzZWN0aW9uQnV0dG9uLndpZHRoICsgOFxuXHRcdFx0XHRcblxuXG5cblxuXHRhZGRTZWN0aW9uQnV0dG9uOiAoYWN0aW9uSXRlbSwgcFYgPSA2LCBwSCA9IDkpID0+XG5cdFx0YnV0dG9uTGF5ZXIgPSBuZXcgVGV4dExheWVyXG5cdFx0XHR0ZXh0OiBhY3Rpb25JdGVtLnRpdGxlXG5cdFx0XHR5OiA0MlxuXHRcdFx0cGFkZGluZzogeyB0b3A6IHBWLCBib3R0b206IHBWICsgMiwgbGVmdDogcEgsIHJpZ2h0OiBwSCB9XG5cdFx0XHRmb250U2l6ZTogMThcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMC41KVwiXG5cdFx0XHRib3JkZXJSYWRpdXM6IDhcblx0XHRcblx0XHRidXR0b25MYXllci5vbihFdmVudHMuVGFwLCBhY3Rpb25JdGVtLmhhbmRsZXIpXG5cdFx0cmV0dXJuIGJ1dHRvbkxheWVyXG5cblxuXHRhZGRTZWN0aW9uVGl0bGU6ICh0aXRsZSA9IFwiSGVhZGVyIFRpdGxlXCIpID0+XG5cdFx0cmV0dXJuIG5ldyBUZXh0TGF5ZXJcblx0XHRcdHRleHQ6IHRpdGxlXG5cdFx0XHRmb250U2l6ZTogMTVcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0b3BhY2l0eTogMC42XG5cdFx0XHRwYWRkaW5nOlxuXHRcdFx0XHR0b3A6IDEyXG5cblxuXG5cbiMgIyBFeGFtcGxlXG4jIHByZXZpZXcuYWRkU2VjdGlvbihcIkNob29zZSBCYWNrZ3JvdW5kXCIsIFtcbiMgXHR7IHRpdGxlOiB0ZXN0MSwgaGFuZGxlcjogdGVzdDIgfSxcbiMgXHR7IHRpdGxlOiB0ZXN0MSwgaGFuZGxlcjogdGVzdDIgfVxuIyBdKSIsIlxuXG57UHJldmlld0NsYXNzNX0gPSByZXF1aXJlIFwiUHJldmlld0NsYXNzNVwiXG5cblxuY2xhc3MgZXhwb3J0cy5QcmV2aWV3Q2xhc3M2IGV4dGVuZHMgUHJldmlld0NsYXNzNVxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0dHJlZVZpZXdMYXllciA9IG5ldyBTY3JvbGxDb21wb25lbnRcblx0XHRcdHdpZHRoOiAzMjBcblx0XHRcdGhlaWdodDogMFxuXHRcdFx0c2Nyb2xsVmVydGljYWw6IHRydWVcblx0XHRcdHNjcm9sbEhvcml6b250YWw6IGZhbHNlXG5cdFx0XHRtb3VzZVdoZWVsRW5hYmxlZDogdHJ1ZVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcIiMyMjJcIlxuXHRcdFxuXHRcdHRyZWVWaWV3TGF5ZXIuY29udGVudC5oZWlnaHQgPSAwXG5cdFx0dHJlZVZpZXdMYXllci5tb3VzZVdoZWVsRW5hYmxlZCA9IHRydWVcblx0XHRcdFxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHRyZWVWaWV3OiB0cmVlVmlld0xheWVyXG5cdFx0XHRpbmRlbnQ6IDFcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0dHJlZVZpZXdMYXllci5wYXJlbnQgPSBAcGFyZW50XG5cblx0XG5cdEBkZWZpbmUgJ3RyZWVWaWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRyZWVWaWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnRyZWVWaWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2luZGVudCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5pbmRlbnRcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuaW5kZW50ID0gdmFsdWVcblx0XG5cblxuXHRwcmludFRyZWU6ICgpID0+XG5cdFx0cHJpbnQgQHZpZXcuY2hpbGRyZW5cblx0XHRAcHJpbnROb2RlKEB2aWV3KVxuXHRcdEB0cmVlVmlldy5oZWlnaHQgPSBTY3JlZW4uaGVpZ2h0XG5cdFx0QHRyZWVWaWV3LnVwZGF0ZUNvbnRlbnQoKVxuXHRcblxuXHRwcmludE5vZGU6IChub2RlLCBsZXZlbCA9IDApID0+XG5cdFx0aWYgbm9kZS5uYW1lID09IFwiXCIgdGhlbiBsYXllck5hbWUgPSBcIlVudGl0bGVkXCIgZWxzZSBsYXllck5hbWUgPSBub2RlLm5hbWVcblx0XHQjIHByaW50IEFycmF5KGxldmVsICsgMSkuam9pbihcIiDjg7sgXCIpICsgXCIgI3tsYXllck5hbWV9XCJcblxuXHRcdHRyZWVOb2RlTGF5ZXIgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEB0cmVlVmlldy5jb250ZW50XG5cdFx0XHR0ZXh0OiBBcnJheShsZXZlbCArIDEpLmpvaW4oXCIg44O7IFwiKSArIFwiICN7bGF5ZXJOYW1lfVwiXG5cdFx0XHRcblx0XHRcdGZvbnRTaXplOiAxNVxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cblx0XHRcdG9wYWNpdHk6IGlmIGxheWVyTmFtZSA9PSBcIlVudGl0bGVkXCIgdGhlbiAwLjUgZWxzZSAxXG5cdFx0XHRoZWlnaHQ6IDI4XG5cdFx0XHR5OiBAdHJlZVZpZXcuaGVpZ2h0XG5cdFx0XHQjIGJhY2tncm91bmRDb2xvcjogVXRpbHMucmFuZG9tQ29sb3IoKVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRjdXN0b206XG5cdFx0XHRcdGxheWVyOiBub2RlXG5cdFx0XG5cdFx0dHJlZU5vZGVMYXllci5vblRhcCAtPlxuXHRcdFx0cHJpbnQgXCIje0BjdXN0b20ubGF5ZXIubmFtZX0geDogI3tAY3VzdG9tLmxheWVyLnh9IHk6ICN7QGN1c3RvbS5sYXllci55fSBzaXplOiAje0BjdXN0b20ubGF5ZXIud2lkdGh9eCN7QGN1c3RvbS5sYXllci5oZWlnaHR9XCJcblxuXHRcdFxuXHRcdEB0cmVlVmlldy5oZWlnaHQgKz0gMjhcblxuXG5cdFx0aWYgbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwXG5cdFx0XHRuZXh0TGV2ZWwgPSBsZXZlbCArIDFcblx0XHRcdGZvciBjaGlsZE5vZGUgaW4gbm9kZS5jaGlsZHJlblxuXHRcdFx0XHRAcHJpbnROb2RlKGNoaWxkTm9kZSwgbmV4dExldmVsKVxuXHRcdFxuIiwiXG5leHBvcnRzLmRhdGEgPVxuXHRjb2xvcjpcblx0XHRkYXJrOiBcIiMwMDBcIlxuXHRcdGxpZ2h0OiBcIiNGRkZcIlxuXHRzdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRvbGRTdGF0dXNCYXJMZWZ0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfbGVmdF9saWdodC5wbmdcIlxuXHRvbGRTdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRhbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9hbmRyb2lkU3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvYW5kcm9pZFN0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRcblx0bm90Y2g6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9ub3RjaC5wbmdcIlxuIiwiIyBQcmV2aWV3IENvbXBvbmVudFxuXG5GcmFtZXIuRGVmYXVsdHMuQW5pbWF0aW9uID1cblx0Y3VydmU6IFNwcmluZyhkYW1waW5nOiAxKVxuXHR0aW1lOiAwLjVcblxuIyB7UHJldmlld19DbGFzc30gPSByZXF1aXJlIFwiUHJldmlld19DbGFzc1wiXG4jIHtQcmV2aWV3X0luaXR9ID0gcmVxdWlyZSBcIlByZXZpZXdfSW5pdFwiXG57UHJldmlld19VSX0gPSByZXF1aXJlIFwiUHJldmlld19VSVwiXG4jIHtDb250cm9sX0NsYXNzfSA9IHJlcXVpcmUgXCJDb250cm9sX0NsYXNzXCJcblxuY2xhc3MgRml4UHJldmlld0V4cG9ydCBleHRlbmRzIFByZXZpZXdfVUlcbmNsYXNzIGV4cG9ydHMuUHJldmlldyBleHRlbmRzIEZpeFByZXZpZXdFeHBvcnRcblxuXG5cblxuIyBOYXRpdmVcblxuYHdpbmRvdy5zYXZlUHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QgPSBmdW5jdGlvbiAobGF5ZXIpIHtcblx0d2luZG93LnByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0ID0gbGF5ZXJcbn1cbmBcblxuYHdpbmRvdy5yZWNlaXZlTWVzc2FnZU5vcm1hbCA9IGZ1bmN0aW9uIChldmVudCkge1xuXHR3aW5kb3cucHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QuYW5pbWF0ZVN0YXRlVG9Ob3JtYWwoKVxufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRlTm9ybWFsXCIsIHJlY2VpdmVNZXNzYWdlTm9ybWFsLCBmYWxzZSk7XG5gXG5cbmB3aW5kb3cucmVjZWl2ZU1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0Y29uc29sZS5sb2coZXZlbnQpXG5cdHdpbmRvdy5wcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdC5hbmltYXRlU3RhdGVUb0ZpbGwoKVxufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRlRmlsbFwiLCByZWNlaXZlTWVzc2FnZSwgZmFsc2UpO1xuYFxuXG5cblxuXG5cblxuIiwiXG5cbmV4cG9ydHMuZGF0YSA9XG5cdGNvbG9yOlxuXHRcdGRhcms6IFwiIzAwMFwiXG5cdFx0bGlnaHQ6IFwiI0ZGRlwiXG5cdFxuXG5cdFxuXHRzdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRvbGRTdGF0dXNCYXJMZWZ0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfbGVmdF9saWdodC5wbmdcIlxuXHRvbGRTdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRhbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9hbmRyb2lkU3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvYW5kcm9pZFN0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRcblxuXG5cdG5vdGNoOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfbm90Y2gucG5nXCJcblx0dGlwOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy90aXAucG5nXCJcbiIsIlxuXG5vdmVycmlkZVRpbWVWYWx1ZSA9IFwiMjA6MjFcIlxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXdfQ2xhc3MgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0c3RhdGVHdWFyZExheWVyID0gbmV3IExheWVyIHsgb3BhY2l0eTogMCwgc2l6ZTogMSB9XG5cdFx0c3RhdGVHdWFyZExheWVyLnN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IHNjYWxlOiAxIH1cblx0XHRcdFwiZmlsbFwiOiB7IHNjYWxlOiAxIH1cblx0XHRzdGF0ZUd1YXJkTGF5ZXIuc3RhdGVTd2l0Y2goXCJmaWxsXCIpXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0bmFtZTogXCJQcmV2aWV3XCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA0MlxuXG5cdFx0XHRzdGF0ZUd1YXJkOiBzdGF0ZUd1YXJkTGF5ZXJcblx0XHRcdHZpZXc6IG51bGxcblxuXHRcdFx0Ym9yZGVyVmlldzogbnVsbFxuXHRcdFx0c3RhdHVzQmFyVmlldzogbnVsbFxuXHRcdFx0aG9tZUJhclZpZXc6IG51bGxcblxuXHRcdFx0Y29uZmlnVmlldzogbnVsbFxuXHRcdFx0c2VjdGlvblZpZXc6IG51bGxcblx0XHRcdFxuXG5cblx0XHRcdCMgRGV2aWNlXG5cdFx0XHRzaG93RGV2aWNlOiB0cnVlXG5cblx0XHRcdCMgQmFyc1xuXHRcdFx0c2hvd0JhcnM6IHRydWVcblx0XHRcdHNob3dTdGF0dXNCYXI6IHRydWVcblx0XHRcdHNob3dIb21lQmFyOiB0cnVlXG5cblx0XHRcdHRpbWVWYWx1ZTogb3ZlcnJpZGVUaW1lVmFsdWUgIyBubyBvdmVycmlkZVxuXHRcdFx0Zm9yY2VBbmRyb2lkQmFyOiBmYWxzZVxuXHRcdFx0c3RhdHVzQmFyX3RoZW1lOiBcImRhcmtcIlxuXHRcdFx0aG9tZUJhcl90aGVtZTogXCJkYXJrXCJcblxuXHRcdFx0IyBDb250cm9sc1xuXHRcdFx0c2hvd1VJOiB0cnVlXG5cdFx0XHRzaG93TG9nbzogdHJ1ZVxuXHRcdFx0c2NhbGVTdGF0ZTogXCJmaWxsXCIgIyBmaWxsIC8gbm9ybWFsXG5cdFx0XHRzaG93SGludHM6IHRydWVcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0d2luZG93LnNhdmVQcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdChAKVxuXHRcdEB1cGRhdGVJbml0KClcblx0XHRcblx0XHRAc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgc2NhbGU6IDEgfVxuXHRcdFx0XCJmaWxsXCI6IHsgc2NhbGU6IDEgfVxuXG5cblxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnZpZXcgPSB2YWx1ZVxuXHRcdFx0QHdpZHRoID0gQHZpZXcud2lkdGhcblx0XHRcdEBoZWlnaHQgPSBAdmlldy5oZWlnaHRcblx0XHRcdEB2aWV3LnBhcmVudCA9IEBcblx0XG5cdEBkZWZpbmUgJ3N0YXRlR3VhcmQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc3RhdGVHdWFyZFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zdGF0ZUd1YXJkID0gdmFsdWVcblxuXG5cblx0QGRlZmluZSAnZGV2aWNlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmJvcmRlclZpZXdcblx0XG5cdEBkZWZpbmUgJ3N0YXR1c0JhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zdGF0dXNCYXJWaWV3XG5cdFxuXHRAZGVmaW5lICdob21lQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmhvbWVCYXJWaWV3XG5cblxuXG5cdEBkZWZpbmUgJ2JvcmRlclZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYm9yZGVyVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ib3JkZXJWaWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3N0YXR1c0JhclZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc3RhdHVzQmFyVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zdGF0dXNCYXJWaWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2hvbWVCYXJWaWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmhvbWVCYXJWaWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmhvbWVCYXJWaWV3ID0gdmFsdWVcblxuXG5cblx0QGRlZmluZSAnY29uZmlnVmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5jb25maWdWaWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmNvbmZpZ1ZpZXcgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnc2VjdGlvblZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2VjdGlvblZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2VjdGlvblZpZXcgPSB2YWx1ZVxuXHRcblxuXHRcblx0XG5cdFxuXG5cdGFuaW1hdGVTdGF0ZVRvTm9ybWFsOiAoKSA9PlxuXHRcdEBzdGF0ZUd1YXJkLnN0YXRlU3dpdGNoKFwibm9ybWFsXCIpXG5cdFx0QGFuaW1hdGUoc2NhbGU6IEBzdGF0ZXNbXCJub3JtYWxcIl0uc2NhbGUsIG9wdGlvbnM6IHsgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41IH0pXG5cdFx0aWYgQGJvcmRlclZpZXcgdGhlbiBAYm9yZGVyVmlldy5hbmltYXRlU3RhdGVUb05vcm1hbCgpXG5cdFxuXHRhbmltYXRlU3RhdGVUb0ZpbGw6ICgpID0+XG5cdFx0QHN0YXRlR3VhcmQuc3RhdGVTd2l0Y2goXCJmaWxsXCIpXG5cdFx0QGFuaW1hdGUoc2NhbGU6IEBzdGF0ZXNbXCJmaWxsXCJdLnNjYWxlLCBvcHRpb25zOiB7IGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSB9KVxuXHRcdGlmIEBib3JkZXJWaWV3IHRoZW4gQGJvcmRlclZpZXcuYW5pbWF0ZVN0YXRlVG9GaWxsKClcblxuXHRzdGF0ZVN3aXRjaFRvTm9ybWFsOiAoKSA9PlxuXHRcdEBzdGF0ZUd1YXJkLnN0YXRlU3dpdGNoKFwibm9ybWFsXCIpXG5cdFx0QGFuaW1hdGUoc2NhbGU6IEBzdGF0ZXNbXCJub3JtYWxcIl0uc2NhbGUsIG9wdGlvbnM6IHsgY3VydmU6IEJlemllci5saW5lYXIsIHRpbWU6IDAgfSlcblx0XHRpZiBAYm9yZGVyVmlldyB0aGVuIEBib3JkZXJWaWV3LnN0YXRlU3dpdGNoVG9Ob3JtYWwoKVxuXHRcblx0c3RhdGVTd2l0Y2hUb0ZpbGw6ICgpID0+XG5cdFx0QHN0YXRlR3VhcmQuc3RhdGVTd2l0Y2goXCJmaWxsXCIpXG5cdFx0QGFuaW1hdGUoc2NhbGU6IEBzdGF0ZXNbXCJmaWxsXCJdLnNjYWxlLCBvcHRpb25zOiB7IGN1cnZlOiBCZXppZXIubGluZWFyLCB0aW1lOiAwIH0pXG5cdFx0aWYgQGJvcmRlclZpZXcgdGhlbiBAYm9yZGVyVmlldy5zdGF0ZVN3aXRjaFRvRmlsbCgpXG5cdFxuXG5cdFxuXHRcblxuXHRAZGVmaW5lICdzaG93RGV2aWNlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNob3dEZXZpY2Vcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0RldmljZSA9IHZhbHVlXG5cdFxuXG5cblx0QGRlZmluZSAnc2hvd0JhcnMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2hvd0JhcnNcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0JhcnMgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnc2hvd1N0YXR1c0JhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93U3RhdHVzQmFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNob3dTdGF0dXNCYXIgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnc2hvd0hvbWVCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2hvd0hvbWVCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0hvbWVCYXIgPSB2YWx1ZVxuXG5cblxuXG5cblx0QGRlZmluZSAndGltZVZhbHVlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRpbWVWYWx1ZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50aW1lVmFsdWUgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnZm9yY2VBbmRyb2lkQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZEJhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRCYXIgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnc3RhdHVzQmFyX3RoZW1lJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnN0YXR1c0Jhcl90aGVtZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zdGF0dXNCYXJfdGhlbWUgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnaG9tZUJhcl90aGVtZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ob21lQmFyX3RoZW1lXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmhvbWVCYXJfdGhlbWUgPSB2YWx1ZVxuXG5cblxuXG5cdEBkZWZpbmUgJ3Nob3dVSScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93VUlcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd1VJID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3Nob3dMb2dvJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNob3dMb2dvXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNob3dMb2dvID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3Nob3dIaW50cycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93SGludHNcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0hpbnRzID0gdmFsdWVcblx0XG5cdFxuXHRcblxuXG5cdEBkZWZpbmUgJ3NjYWxlU3RhdGUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2NhbGVTdGF0ZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zY2FsZVN0YXRlID0gdmFsdWVcblx0XG5cblxuXG5cblxuXG5cblx0dXBkYXRlSW5pdDogKCkgPT5cblxuXHRcdEBzY2FsZVN0YXRlID0gQGdldFN0YXRlR2VuZXJpYyhcInNjYWxlXCIsIFt7IHZhbHVlOiBcImZpbGxcIiwgcmVzdWx0OiBcImZpbGxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJub3JtYWxcIiwgcmVzdWx0OiBcIm5vcm1hbFwiIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogXCJub3JtYWxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogXCJmaWxsXCIgfV0sIEBzY2FsZVN0YXRlKVxuXHRcdFxuXHRcdEBzY2FsZVN0YXRlID0gQGdldFN0YXRlR2VuZXJpYyhcImZpbGxcIiwgW3sgdmFsdWU6IFwib25cIiwgcmVzdWx0OiBcImZpbGxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvZmZcIiwgcmVzdWx0OiBcIm5vcm1hbFwiIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcInRydWVcIiwgcmVzdWx0OiBcImZpbGxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IFwibm9ybWFsXCIgfV0sIEBzY2FsZVN0YXRlKVxuXG5cdFx0QHNob3dVSSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJidXR0b25cIiwgW3sgdmFsdWU6IFwiZmFsc2VcIiwgcmVzdWx0OiBmYWxzZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogdHJ1ZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvblwiLCByZXN1bHQ6IHRydWUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogZmFsc2UgfV0sIEBzaG93VUkpXG5cdFx0XG5cdFx0QHNob3dVSSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJ1aVwiLCBbeyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcInRydWVcIiwgcmVzdWx0OiB0cnVlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9uXCIsIHJlc3VsdDogdHJ1ZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvZmZcIiwgcmVzdWx0OiBmYWxzZSB9XSwgQHNob3dVSSlcblxuXHRcdEBzaG93TG9nbyA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJsb2dvXCIsIFt7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwidHJ1ZVwiLCByZXN1bHQ6IHRydWUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwib25cIiwgcmVzdWx0OiB0cnVlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9mZlwiLCByZXN1bHQ6IGZhbHNlIH1dLCBAc2hvd0xvZ28pXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRAc2hvd0RldmljZSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJkZXZpY2VcIiwgW3sgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvblwiLCByZXN1bHQ6IHRydWUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwidHJ1ZVwiLCByZXN1bHQ6IHRydWUgfV0sIEBzaG93RGV2aWNlKVxuXHRcdFxuXHRcdEBzaG93SGludHMgPSBAZ2V0U3RhdGVHZW5lcmljKFwiaGludHNcIiwgW3sgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvblwiLCByZXN1bHQ6IHRydWUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwidHJ1ZVwiLCByZXN1bHQ6IHRydWUgfV0sIEBzaG93SGludHMpXG5cblxuXG5cdCMgZ2V0U3RhdGVHZW5lcmljOiAoa2V5ID0gXCJzY2FsZVwiLCBwYWlycyA9IFt7IHZhbHVlOiAsIHJlc3VsdDogfSwge3ZhbHVlOiAsIHJlc3VsdDogfV0sIGRlZmF1bHRSZXN1bHQgPSBcIlwiKVxuXHRnZXRTdGF0ZUdlbmVyaWM6IChzdGF0ZUtleSA9IFwic2NhbGVcIiwgc3RhdGVQYWlycyA9IFtdLCBkZWZhdWx0UmVzdWx0ID0gXCJcIikgPT5cblx0XHRyZXN1bHQgPSBkZWZhdWx0UmVzdWx0XG5cblx0XHRmb3IgaXRlbSBpbiBsb2NhdGlvbi5zZWFyY2hbMS4uXS5zcGxpdCgnJicpXG5cdFx0XHRrZXlWYWx1ZVBhaXIgPSBpdGVtLnNwbGl0KFwiPVwiKVxuXHRcdFx0a2V5UGFydCA9IGtleVZhbHVlUGFpclswXVxuXHRcdFx0dmFsdWVQYXJ0ID0ga2V5VmFsdWVQYWlyWzFdXG5cblx0XHRcdGlmIGtleVBhcnQgPT0gc3RhdGVLZXlcblx0XHRcdFx0Zm9yIHBhaXIgaW4gc3RhdGVQYWlyc1xuXHRcdFx0XHRcdGlmIHZhbHVlUGFydCA9PSBwYWlyLnZhbHVlXG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBwYWlyLnJlc3VsdFxuXHRcdFx0XHRcdCMgZWxzZVxuXHRcdFx0XHRcdFx0IyBwcmludCBcIm5vdCBcIiArIFwiICN7cGFpci52YWx1ZX1cIiBcblx0XHRcblx0XHRyZXR1cm4gcmVzdWx0XG5cdFxuXHRcblx0XG5cdFxuIiwiXG5cbntQcmV2aWV3X0NsYXNzfSA9IHJlcXVpcmUgXCJQcmV2aWV3X0NsYXNzXCJcbntEZXZpY2VfQ2xhc3N9ID0gcmVxdWlyZSBcIkRldmljZV9DbGFzc1wiXG5cbntIb21lQmFyX0NsYXNzfSA9IHJlcXVpcmUgXCJIb21lQmFyX0NsYXNzXCJcbntTdGF0dXNCYXJfQ2xhc3N9ID0gcmVxdWlyZSBcIlN0YXR1c0Jhcl9DbGFzc1wiXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld19Jbml0IGV4dGVuZHMgUHJldmlld19DbGFzc1xuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAc2NhbGVQcmV2aWV3KClcblxuXHRcblx0XG5cdHNjYWxlUHJldmlldzogKCkgPT5cblx0XHRpZiBVdGlscy5pc01vYmlsZSgpIHRoZW4gQHByZXZpZXdNb2JpbGUoKVxuXHRcdGVsc2UgQHByZXZpZXdEZXNrdG9wKClcblx0XG5cdHVwZGF0ZVByZXZpZXc6ICgpID0+XG5cdFx0aWYgQHN0YXRlR3VhcmQuc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcImZpbGxcIiB0aGVuIEBzdGF0ZVN3aXRjaFRvRmlsbCgpXG5cdFx0ZWxzZSBAc3RhdGVTd2l0Y2hUb05vcm1hbCgpXG5cblx0XHQjIGlmIEBib3JkZXJWaWV3XG5cdFx0IyBcdGlmIEBzY2FsZVN0YXRlID09IFwiZmlsbFwiIHRoZW4gQGJvcmRlclZpZXcuc3RhdGVTd2l0Y2hUb0ZpbGwoKVxuXHRcdCMgXHRlbHNlIEBib3JkZXJWaWV3LnN0YXRlU3dpdGNoVG9Ob3JtYWwoKVxuXHRcblxuXG5cblx0cHJldmlld0Rlc2t0b3A6ICgpID0+XG5cdFx0aWYgQHNob3dEZXZpY2UgdGhlbiBAYm9yZGVyVmlldyA9IG5ldyBEZXZpY2VfQ2xhc3MgeyB2aWV3OiBAIH1cblxuXHRcdGlmIEBzaG93QmFyc1xuXHRcdFx0aWYgQHNob3dIb21lQmFyIHRoZW4gQGhvbWVCYXJWaWV3ID0gbmV3IEhvbWVCYXJfQ2xhc3MgeyB2aWV3OiBAIH1cblx0XHRcdGlmIEBzaG93U3RhdHVzQmFyIHRoZW4gQHN0YXR1c0JhclZpZXcgPSBuZXcgU3RhdHVzQmFyX0NsYXNzIHsgdmlldzogQCB9XG5cblx0XHRAY2xpcCA9IHRydWVcblx0XHRAdXBkYXRlU2NhbGUoKVxuXHRcdEB1cGRhdGVQcmV2aWV3T25SZXNpemUoKVxuXHRcdFxuXHRcdGlmIEBzY2FsZVN0YXRlID09IFwiZmlsbFwiIHRoZW4gQHN0YXRlU3dpdGNoVG9GaWxsKClcblx0XHRlbHNlIEBzdGF0ZVN3aXRjaFRvTm9ybWFsKClcblxuXHRcblx0cHJldmlld01vYmlsZTogKCkgPT5cblx0XHRAc2NhbGUgPSBTY3JlZW4ud2lkdGggLyBAd2lkdGhcblx0XHRAeCA9IEFsaWduLmNlbnRlclxuXHRcdEB5ID0gQWxpZ24uY2VudGVyXG5cblx0XG5cblx0dXBkYXRlU2NhbGU6ICgpID0+XG5cblx0XHRAeCA9IEFsaWduLmNlbnRlclxuXHRcdEB5ID0gQWxpZ24uY2VudGVyXG5cblx0XHRpZiBAYm9yZGVyVmlld1xuXHRcdFx0QGJvcmRlclZpZXcueCA9IEFsaWduLmNlbnRlclxuXHRcdFx0QGJvcmRlclZpZXcueSA9IEFsaWduLmNlbnRlclxuXG5cdFx0c2NhbGVYID0gKFNjcmVlbi53aWR0aCAtIDExMikgLyBAd2lkdGhcblx0XHRzY2FsZVkgPSAoU2NyZWVuLmhlaWdodCAtIDExMikgLyBAaGVpZ2h0XG5cdFx0QHN0YXRlc1tcImZpbGxcIl0uc2NhbGUgPSBNYXRoLm1pbihzY2FsZVgsIHNjYWxlWSlcblxuXHRcdGlmIEBib3JkZXJWaWV3XG5cdFx0XHRAYm9yZGVyVmlldy5zdGF0ZXNbXCJmaWxsXCJdLnNjYWxlID0gQHN0YXRlc1tcImZpbGxcIl0uc2NhbGVcblxuXG5cblxuXG5cblxuXG5cdHVwZGF0ZVByZXZpZXdPblJlc2l6ZTogKCkgPT5cblx0XHRsb2NhbFByZXZpZXcgPSBAXG5cdFx0XG5cdFx0Q2FudmFzLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVNjYWxlKClcblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVQcmV2aWV3KClcblx0XHRcblx0XHRDYW52YXMub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZSgpXG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlUHJldmlldygpXG5cdFx0XG5cblx0XHRTY3JlZW4ub24gXCJjaGFuZ2U6aGVpZ2h0XCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlU2NhbGUoKVxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVByZXZpZXcoKVxuXHRcdFxuXHRcdFNjcmVlbi5vbiBcImNoYW5nZTp3aWR0aFwiLCA9PlxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVNjYWxlKClcblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVQcmV2aWV3KClcblx0XG5cdFxuXG5cbiIsIiMgTG9nb1xuXG5jbGFzcyBleHBvcnRzLkxvZ29MYXllciBleHRlbmRzIFNWR0xheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdG9wYWNpdHk6IDAuNVxuXHRcdFx0aGFuZGxlcjogbnVsbFxuXHRcdFx0c3ZnOiBnZXRMb2dvKFwiRkZGXCIpXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cdFxuXHRAZGVmaW5lICdoYW5kbGVyJyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9uKEV2ZW50cy5UYXAsIHZhbHVlKVxuXHRcblx0SG92ZXI6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjhcblx0SG92ZXJPZmY6ID0+XG5cdFx0QG9wYWNpdHkgPSAwLjVcblxuXG5cbmdldExvZ28gPSAod2l0aENvbG9yKSAtPlxuXHRzZWxlY3RlZENvbG9yID0gXCIjRkZGRkZGXCJcblx0cmV0dXJuIFwiXCJcIjxzdmcgd2lkdGg9XCI3NlwiIGhlaWdodD1cIjMyXCIgdmlld0JveD1cIjAgMCA3NiAzMlwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuPHBhdGggZD1cIk0yLjc5MTk5IDIxLjZDMi43OTE5OSAyMS4xNjggMi45MDM5OSAyMC40MDggMy4xMjc5OSAxOS4zMkw0LjM5OTk5IDEyLjg0SDIuOTgzOTlMMy4wNzk5OSAxMi4xMkM0Ljk5OTk5IDExLjU0NCA2Ljg4Nzk5IDEwLjU1MiA4Ljc0Mzk5IDkuMTQzOThIOS44OTU5OUw5LjMxOTk5IDExLjc2SDExLjE5MkwxMC45NzYgMTIuODRIOS4xMjc5OUw3LjkwMzk5IDE5LjMyQzcuNjk1OTkgMjAuMzEyIDcuNTkxOTkgMjAuOTc2IDcuNTkxOTkgMjEuMzEyQzcuNTkxOTkgMjIuMDggNy45Mjc5OSAyMi41NDQgOC41OTk5OSAyMi43MDRDOC40Mzk5OSAyMy4yNDggOC4wNzE5OSAyMy42OCA3LjQ5NTk5IDI0QzYuOTE5OTkgMjQuMzIgNi4yMjM5OSAyNC40OCA1LjQwNzk5IDI0LjQ4QzQuNTkxOTkgMjQuNDggMy45NTE5OSAyNC4yMjQgMy40ODc5OSAyMy43MTJDMy4wMjM5OSAyMy4yIDIuNzkxOTkgMjIuNDk2IDIuNzkxOTkgMjEuNlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMTcuNTU5OSAyMi42OEMxNy4wNjM5IDIzLjg4IDE2LjAyMzkgMjQuNDggMTQuNDM5OSAyNC40OEMxMy42MjM5IDI0LjQ4IDEyLjk1OTkgMjQuMiAxMi40NDc5IDIzLjY0QzEyLjAxNTkgMjMuMTQ0IDExLjc5OTkgMjIuNjQ4IDExLjc5OTkgMjIuMTUyQzExLjc5OTkgMjAuODU2IDEyLjA5NTkgMTguOTQ0IDEyLjY4NzkgMTYuNDE2TDEzLjU3NTkgMTEuNzZMMTguNDQ3OSAxMS4yOEwxNi45ODM5IDE4Ljg2NEMxNi43MTE5IDIwLjA0OCAxNi41NzU5IDIwLjg0OCAxNi41NzU5IDIxLjI2NEMxNi41NzU5IDIyLjE3NiAxNi45MDM5IDIyLjY0OCAxNy41NTk5IDIyLjY4Wk0xNC4wMDc5IDguNDIzOThDMTQuMDA3OSA3Ljc5OTk4IDE0LjI2MzkgNy4zMTk5OCAxNC43NzU5IDYuOTgzOThDMTUuMzAzOSA2LjY0Nzk4IDE1Ljk0MzkgNi40Nzk5OCAxNi42OTU5IDYuNDc5OThDMTcuNDQ3OSA2LjQ3OTk4IDE4LjA0NzkgNi42NDc5OCAxOC40OTU5IDYuOTgzOThDMTguOTU5OSA3LjMxOTk4IDE5LjE5MTkgNy43OTk5OCAxOS4xOTE5IDguNDIzOThDMTkuMTkxOSA5LjA0Nzk4IDE4LjkzNTkgOS41MTk5OCAxOC40MjM5IDkuODM5OThDMTcuOTI3OSAxMC4xNiAxNy4zMDM5IDEwLjMyIDE2LjU1MTkgMTAuMzJDMTUuNzk5OSAxMC4zMiAxNS4xODM5IDEwLjE2IDE0LjcwMzkgOS44Mzk5OEMxNC4yMzk5IDkuNTE5OTggMTQuMDA3OSA5LjA0Nzk4IDE0LjAwNzkgOC40MjM5OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMjYuMDYwNiAyMi42OEMyNS41NjQ2IDIzLjg4IDI0LjUyNDYgMjQuNDggMjIuOTQwNiAyNC40OEMyMi4xNDA2IDI0LjQ4IDIxLjQ4NDYgMjQuMiAyMC45NzI2IDIzLjY0QzIwLjU1NjYgMjMuMTc2IDIwLjM0ODYgMjIuNjggMjAuMzQ4NiAyMi4xNTJDMjAuMzQ4NiAyMC45NTIgMjAuNjI4NiAxOS4wNCAyMS4xODg2IDE2LjQxNkwyMi45NDA2IDcuMTk5OThMMjcuODEyNiA2LjcxOTk4TDI1LjQ4NDYgMTguODY0QzI1LjIxMjYgMjAuMDQ4IDI1LjA3NjYgMjAuODQ4IDI1LjA3NjYgMjEuMjY0QzI1LjA3NjYgMjIuMTc2IDI1LjQwNDYgMjIuNjQ4IDI2LjA2MDYgMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTM0LjU2MTggMjIuNjhDMzQuMDY1OCAyMy44OCAzMy4wMjU4IDI0LjQ4IDMxLjQ0MTggMjQuNDhDMzAuNjQxOCAyNC40OCAyOS45ODU4IDI0LjIgMjkuNDczOCAyMy42NEMyOS4wNTc4IDIzLjE3NiAyOC44NDk4IDIyLjY4IDI4Ljg0OTggMjIuMTUyQzI4Ljg0OTggMjAuOTUyIDI5LjEyOTggMTkuMDQgMjkuNjg5OCAxNi40MTZMMzEuNDQxOCA3LjE5OTk4TDM2LjMxMzggNi43MTk5OEwzMy45ODU4IDE4Ljg2NEMzMy43MTM4IDIwLjA0OCAzMy41Nzc4IDIwLjg0OCAzMy41Nzc4IDIxLjI2NEMzMy41Nzc4IDIyLjE3NiAzMy45MDU4IDIyLjY0OCAzNC41NjE4IDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk00My4wNjMxIDIyLjY4QzQyLjU2NzEgMjMuODggNDEuNTI3MSAyNC40OCAzOS45NDMxIDI0LjQ4QzM5LjE0MzEgMjQuNDggMzguNDg3MSAyNC4yIDM3Ljk3NTEgMjMuNjRDMzcuNTU5MSAyMy4xNzYgMzcuMzUxMSAyMi42OCAzNy4zNTExIDIyLjE1MkMzNy4zNTExIDIwLjk1MiAzNy42MzExIDE5LjA0IDM4LjE5MTEgMTYuNDE2TDM5Ljk0MzEgNy4xOTk5OEw0NC44MTUxIDYuNzE5OThMNDIuNDg3MSAxOC44NjRDNDIuMjE1MSAyMC4wNDggNDIuMDc5MSAyMC44NDggNDIuMDc5MSAyMS4yNjRDNDIuMDc5MSAyMi4xNzYgNDIuNDA3MSAyMi42NDggNDMuMDYzMSAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNTMuNTMyMyAyMi45OTJDNTIuNzY0MyAyMy45ODQgNTEuNDI4MyAyNC40OCA0OS41MjQzIDI0LjQ4QzQ4LjUzMjMgMjQuNDggNDcuNjc2MyAyNC4xODQgNDYuOTU2MyAyMy41OTJDNDYuMjM2MyAyMi45ODQgNDUuODc2MyAyMi4yNDggNDUuODc2MyAyMS4zODRDNDUuODc2MyAyMC45MDQgNDUuOTAwMyAyMC41NDQgNDUuOTQ4MyAyMC4zMDRMNDcuNTU2MyAxMS43Nkw1Mi40MjgzIDExLjI4TDUwLjY3NjMgMjAuNTQ0QzUwLjYxMjMgMjAuODk2IDUwLjU4MDMgMjEuMTc2IDUwLjU4MDMgMjEuMzg0QzUwLjU4MDMgMjIuMzEyIDUwLjg2MDMgMjIuNzc2IDUxLjQyMDMgMjIuNzc2QzUyLjA0NDMgMjIuNzc2IDUyLjU4MDMgMjIuMzUyIDUzLjAyODMgMjEuNTA0QzUzLjE3MjMgMjEuMjMyIDUzLjI3NjMgMjAuOTIgNTMuMzQwMyAyMC41NjhMNTUuMDQ0MyAxMS43Nkw1OS43NzIzIDExLjI4TDU3Ljk5NjMgMjAuNjRDNTcuOTQ4MyAyMC44OCA1Ny45MjQzIDIxLjEyOCA1Ny45MjQzIDIxLjM4NEM1Ny45MjQzIDIxLjY0IDU3Ljk5NjMgMjEuOTEyIDU4LjE0MDMgMjIuMkM1OC4yODQzIDIyLjQ3MiA1OC41ODgzIDIyLjY0IDU5LjA1MjMgMjIuNzA0QzU4Ljk1NjMgMjMuMDg4IDU4Ljc0MDMgMjMuNDA4IDU4LjQwNDMgMjMuNjY0QzU3LjcwMDMgMjQuMjA4IDU2Ljk2NDMgMjQuNDggNTYuMTk2MyAyNC40OEM1NS40NDQzIDI0LjQ4IDU0Ljg0NDMgMjQuMzQ0IDU0LjM5NjMgMjQuMDcyQzUzLjk0ODMgMjMuOCA1My42NjAzIDIzLjQ0IDUzLjUzMjMgMjIuOTkyWlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk02OS4yOTQ3IDE3LjI1NkM2OS44NzA3IDE2LjIzMiA3MC4xNTg3IDE1LjIgNzAuMTU4NyAxNC4xNkM3MC4xNTg3IDEzLjQ3MiA2OS45MTA3IDEzLjEyOCA2OS40MTQ3IDEzLjEyOEM2OS4wMzA3IDEzLjEyOCA2OC42Mzg3IDEzLjQ1NiA2OC4yMzg3IDE0LjExMkM2Ny44MjI3IDE0Ljc2OCA2Ny41NTA3IDE1LjUyIDY3LjQyMjcgMTYuMzY4TDY2LjE3NDcgMjRMNjEuMjA2NyAyNC40OEw2My42NTQ3IDExLjc2TDY3LjYxNDcgMTEuMjhMNjcuMTgyNyAxMy43MDRDNjcuOTY2NyAxMi4wODggNjkuMjM4NyAxMS4yOCA3MC45OTg3IDExLjI4QzcxLjkyNjcgMTEuMjggNzIuNjM4NyAxMS41MiA3My4xMzQ3IDEyQzczLjY0NjcgMTIuNDggNzMuOTAyNyAxMy4yMTYgNzMuOTAyNyAxNC4yMDhDNzMuOTAyNyAxNS4xODQgNzMuNTc0NyAxNS45ODQgNzIuOTE4NyAxNi42MDhDNzIuMjc4NyAxNy4yMzIgNzEuNDA2NyAxNy41NDQgNzAuMzAyNyAxNy41NDRDNjkuODIyNyAxNy41NDQgNjkuNDg2NyAxNy40NDggNjkuMjk0NyAxNy4yNTZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48L3N2Zz5cblwiXCJcIlxuIiwiXG57TG9nb0xheWVyfSA9IHJlcXVpcmUgXCJMb2dvXCJcbntQcmV2aWV3X0luaXR9ID0gcmVxdWlyZSBcIlByZXZpZXdfSW5pdFwiXG57VUlfU2VjdGlvbn0gPSByZXF1aXJlIFwiVUlfU2VjdGlvblwiXG57VUlfQ29uZmlnfSA9IHJlcXVpcmUgXCJVSV9Db25maWdcIlxuXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld19VSSBleHRlbmRzIFByZXZpZXdfSW5pdFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHNob3dEZXNrdG9wVUkoKVxuXHRcblxuXG5cdHNob3dEZXNrdG9wVUk6ICgpID0+XG5cdFx0aWYgVXRpbHMuaXNNb2JpbGUoKSB0aGVuIHJldHVyblxuXG5cdFx0aWYgQHNob3dMb2dvIHRoZW4gQGNyZWF0ZUxvZ29CdXR0b24oKVxuXHRcdGlmIEBzaG93VUkgdGhlbiBAYWRkQ29uZmlnKClcblxuXG5cblxuXG5cblx0Y3JlYXRlTG9nb0J1dHRvbjogKCkgPT5cblx0XHRcblx0XHRvcGVuSG9tZUhhbmRsZXIgPSAoKSAtPlxuXHRcdFx0d2luZG93LmxvY2F0aW9uID0gXCJodHRwczovL3RpbGxsdXIuY29tXCJcblx0XHRcblx0XHRsb2dvQnV0dG9uID0gbmV3IExvZ29MYXllclxuXHRcdFx0d2lkdGg6IDc2LCBoZWlnaHQ6IDMyXG5cdFx0XHR4OiBBbGlnbi5sZWZ0KDMyKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0aGFuZGxlcjogb3BlbkhvbWVIYW5kbGVyXG5cdFxuXG5cdGFkZFNlY3Rpb246ICh0aXRsZSwgYWN0aW9uQXJyYXkgPSBbXSkgPT5cblx0XHRpZiBAc2VjdGlvblZpZXcgPT0gbnVsbCB0aGVuIEBzZWN0aW9uVmlldyA9IG5ldyBVSV9TZWN0aW9uXG5cdFx0QHNlY3Rpb25WaWV3LmFkZFNlY3Rpb24odGl0bGUsIGFjdGlvbkFycmF5KVxuXG5cblx0IyBGaWxsIOKXiVxuXHQjIEZpbGwg4peOXG5cblx0YWRkQ29uZmlnOiAoKSA9PlxuXHRcdEBjb25maWdWaWV3ID0gbmV3IFVJX0NvbmZpZyB7IHZpZXc6IEAgfSBcblxuXHRcdGlmIEBzaG93SGludHMgdGhlbiBGcmFtZXIuRXh0cmFzLkhpbnRzLmVuYWJsZSgpXG5cdFx0ZWxzZSBGcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXG5cdFx0c2NhbGVUdXBsZSA9IFtcIkZpdFwiLCBcIjEwMCVcIl1cblx0XHRoaW50c1R1cGxlID0gW1wiSGludHMg4peJXCIsIFwiSGludHMg4peOXCJdXG5cblxuXHRcdHRvZ2dsZVNjYWxlID0gKGVtcHR5RGF0YSwgbG9jYWxCdXR0b24pID0+XG5cdFx0XHRpZiBAc3RhdGVHdWFyZC5zdGF0ZXMuY3VycmVudC5uYW1lID09IFwibm9ybWFsXCJcblx0XHRcdFx0QGFuaW1hdGVTdGF0ZVRvRmlsbCgpXG5cdFx0XHRcdGxvY2FsQnV0dG9uLnRleHQgPSBzY2FsZVR1cGxlWzBdXG5cdFx0XHRlbHNlXG5cdFx0XHRcdEBhbmltYXRlU3RhdGVUb05vcm1hbCgpXG5cdFx0XHRcdGxvY2FsQnV0dG9uLnRleHQgPSBzY2FsZVR1cGxlWzFdXG5cdFx0XHRcdFxuXHRcdFxuXHRcdHRvZ2dsZVRpcHMgPSAoZW1wdHlEYXRhLCBsb2NhbEJ1dHRvbikgPT5cblx0XHRcdGlmIEBzaG93SGludHNcblx0XHRcdFx0QGhpZGVIaW50c0hhbmRsZXIoKVxuXHRcdFx0XHRsb2NhbEJ1dHRvbi50ZXh0ID0gaGludHNUdXBsZVsxXVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAc2hvd0hpbnRzSGFuZGxlcigpXG5cdFx0XHRcdGxvY2FsQnV0dG9uLnRleHQgPSBoaW50c1R1cGxlWzBdXG5cdFx0XG5cdFx0aW5pdFNjYWxlVGl0bGUgPSBpZiBAc2hvd0hpbnRzIHRoZW4gaGludHNUdXBsZVswXSBlbHNlIGhpbnRzVHVwbGVbMV1cblx0XHRpbml0U3RhdGVUaXRsZSA9IGlmIEBzdGF0ZUd1YXJkLnN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJub3JtYWxcIiB0aGVuIHNjYWxlVHVwbGVbMV0gZWxzZSBzY2FsZVR1cGxlWzBdXG5cblx0XHQjIHByaW50IGluaXRTY2FsZVRpdGxlICsgXCIgXCIgKyBpbml0U3RhdGVUaXRsZVxuXG5cdFx0QGNvbmZpZ1ZpZXcuYWRkU2VjdGlvbihbXG5cdFx0XHR7XG5cdFx0XHRcdHRpdGxlOiBpbml0U2NhbGVUaXRsZSxcblx0XHRcdFx0aGFuZGxlcjogdG9nZ2xlVGlwc1xuXHRcdFx0XHR9LFxuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogaW5pdFN0YXRlVGl0bGUsXG5cdFx0XHRcdGhhbmRsZXI6IHRvZ2dsZVNjYWxlXG5cdFx0XHR9LFxuXHRcdF0pXG5cdFxuXHRcblx0aGlkZUhpbnRzSGFuZGxlcjogKCkgPT5cblx0XHRGcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXHRcdEBzaG93SGludHMgPSAhQHNob3dIaW50c1xuXG5cdHNob3dIaW50c0hhbmRsZXI6ICgpID0+XG5cdFx0RnJhbWVyLkV4dHJhcy5IaW50cy5lbmFibGUoKVxuXHRcdEZyYW1lci5FeHRyYXMuSGludHMuc2hvd0hpbnRzKClcblx0XHRAc2hvd0hpbnRzID0gIUBzaG93SGludHNcbiIsIlxue0xvZ29MYXllcn0gPSByZXF1aXJlIFwiUHJldmlld19Mb2dvTGF5ZXJcIlxue1Bob25lVHlwZVZpZXd9ID0gcmVxdWlyZSBcIlBob25lVHlwZVZpZXdcIlxuXG5cbmNsYXNzIGV4cG9ydHMuU2NhbGVWaWV3IGV4dGVuZHMgUGhvbmVUeXBlVmlld1xuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cblx0XG5cdFxuXHRcblx0Y3JlYXRlTG9nb0J1dHRvbjogKCkgPT5cblx0XHRcblx0XHRvcGVuSG9tZUhhbmRsZXIgPSAoKSAtPlxuXHRcdFx0d2luZG93LmxvY2F0aW9uID0gXCJodHRwczovL3RpbGxsdXIuY29tXCJcblx0XHRcblx0XHRsb2dvQnV0dG9uID0gbmV3IExvZ29MYXllclxuXHRcdFx0d2lkdGg6IDc2LCBoZWlnaHQ6IDMyXG5cdFx0XHR4OiBBbGlnbi5sZWZ0KDMyKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0aGFuZGxlcjogb3BlbkhvbWVIYW5kbGVyXG5cdFxuXHRcblx0XG5cdGNyZWF0ZVNjYWxlQnV0dG9uOiAoZm9yU3RhdGUpID0+XG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUgPSBuZXcgTGF5ZXJcblx0XHRcdHNpemU6IDQ4LCBib3JkZXJSYWRpdXM6IDQ4XG5cdFx0XHR4OiBBbGlnbi5yaWdodCgtMzIpLCB5OiBBbGlnbi5ib3R0b20oLTMyKVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuMSlcIlxuXHRcdFx0Ym9yZGVyV2lkdGg6IDJcblx0XHRcdGN1c3RvbTpcblx0XHRcdFx0cHJldmlldzogQFxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlLnN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlLnN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuMilcIiB9XG5cdFx0XHRcImZpbGxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjYpXCIgfVxuXHRcdGJ1dHRvblNjYWxlLnN0YXRlU3dpdGNoKGZvclN0YXRlKVxuXHRcdFxuXHRcdGJ1dHRvbkluc2lkZUxheWVyID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJ1dHRvblNjYWxlXG5cdFx0XHRib3JkZXJXaWR0aDogMlxuXHRcdFx0c2l6ZTogMjgsIGJvcmRlclJhZGl1czogMjJcblx0XHRcdHg6IDEwLCB5OiAxMFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRcblx0XHRcblx0XHRidXR0b25JbnNpZGVMYXllci5zdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjYpXCIgfVxuXHRcdFx0XCJmaWxsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC4yKVwiIH1cblx0XHRidXR0b25JbnNpZGVMYXllci5zdGF0ZVN3aXRjaChmb3JTdGF0ZSlcblx0XHRcblx0XHRidXR0b25TY2FsZS5vblRhcCAtPlxuXHRcdFx0aWYgQHN0YXRlcy5jdXJyZW50Lm5hbWUgPT0gXCJmaWxsXCIgdGhlbiBuZXh0U3RhdGUgPSBcIm5vcm1hbFwiIGVsc2UgbmV4dFN0YXRlID0gXCJmaWxsXCJcblx0XHRcdEBzdGF0ZVN3aXRjaChuZXh0U3RhdGUpXG5cdFx0XHRAY2hpbGRyZW5bMF0uc3RhdGVTd2l0Y2gobmV4dFN0YXRlKVxuXHRcdFx0QGN1c3RvbS5wcmV2aWV3LmFuaW1hdGUobmV4dFN0YXRlLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFx0XG5cdFx0dXBkYXRlQnV0dG9uT25SZXNpemUgPSAoYnV0dG9uTGF5ZXIpID0+XG5cdFx0XHRsb2NhbEJ1dHRvbiA9IGJ1dHRvbkxheWVyXG5cdFx0XHRcblx0XHRcdENhbnZhcy5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT5cblx0XHRcdFx0YnV0dG9uTGF5ZXIueCA9IEFsaWduLnJpZ2h0KC0zMilcblx0XHRcdFxuXHRcdFx0Q2FudmFzLm9uIFwiY2hhbmdlOndpZHRoXCIsID0+XG5cdFx0XHRcdGJ1dHRvbkxheWVyLnkgPSBBbGlnbi5ib3R0b20oLTMyKVxuXHRcdFxuXHRcdHVwZGF0ZUJ1dHRvbk9uUmVzaXplKGJ1dHRvblNjYWxlKVxuXG5cblxuIiwiXG5cbntMb2NhdGlvblZpZXd9ID0gcmVxdWlyZSBcIkxvY2F0aW9uVmlld1wiXG5cblxuY2xhc3MgZXhwb3J0cy5TZWN0aW9uVmlldyBleHRlbmRzIExvY2F0aW9uVmlld1xuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Y29udHJvbFBhbmVsTGF5ZXIgPSBuZXcgTGF5ZXJcblx0XHRcdHdpZHRoOiAzNjAsIGhlaWdodDogMTAwMFxuXHRcdFx0eDogMjAsIHk6IDYwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRjb250cm9sUGFuZWw6IGNvbnRyb2xQYW5lbExheWVyXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdGNvbnRyb2xQYW5lbExheWVyLnBhcmVudCA9IEBwYXJlbnRcblxuXHRcblx0QGRlZmluZSAnY29udHJvbFBhbmVsJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmNvbnRyb2xQYW5lbFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5jb250cm9sUGFuZWwgPSB2YWx1ZVxuXHRcblx0YWRkU2VjdGlvbjogKHRpdGxlLCBhY3Rpb25BcnJheSA9IFtdKSA9PlxuXHRcdGlmIFV0aWxzLmlzTW9iaWxlKCkgdGhlbiByZXR1cm5cblx0XHRlbHNlXG5cdFx0XHRzZWN0aW9uVmlldyA9IG5ldyBMYXllclxuXHRcdFx0XHR3aWR0aDogMzYwXG5cdFx0XHRcdGhlaWdodDogMTAwXG5cdFx0XHRcdHBhcmVudDogQGNvbnRyb2xQYW5lbFxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdFxuXHRcdFx0c2VjdGlvblZpZXcueSA9IChAY29udHJvbFBhbmVsLmNoaWxkcmVuLmxlbmd0aCAtIDEpICogMTAwXG5cblx0XHRcdEBhZGRTZWN0aW9uVGl0bGUodGl0bGUpLnBhcmVudCA9IHNlY3Rpb25WaWV3XG5cblx0XHRcdHN1bVggPSAwXG5cdFx0XHRmb3IgYWN0aW9uSXRlbSwgaW5kZXggaW4gYWN0aW9uQXJyYXlcblx0XHRcdFx0c2VjdGlvbkJ1dHRvbiA9IEBhZGRTZWN0aW9uQnV0dG9uKGFjdGlvbkl0ZW0pXG5cdFx0XHRcdHNlY3Rpb25CdXR0b24ucGFyZW50ID0gc2VjdGlvblZpZXdcblx0XHRcdFx0c2VjdGlvbkJ1dHRvbi54ID0gc3VtWFxuXHRcdFx0XHRzdW1YICs9IHNlY3Rpb25CdXR0b24ud2lkdGggKyA4XG5cdFx0XHRcdFxuXG5cblxuXG5cdGFkZFNlY3Rpb25CdXR0b246IChhY3Rpb25JdGVtLCBwViA9IDYsIHBIID0gOSkgPT5cblx0XHRidXR0b25MYXllciA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHRleHQ6IGFjdGlvbkl0ZW0udGl0bGVcblx0XHRcdHk6IDQyXG5cdFx0XHRwYWRkaW5nOiB7IHRvcDogcFYsIGJvdHRvbTogcFYgKyAyLCBsZWZ0OiBwSCwgcmlnaHQ6IHBIIH1cblx0XHRcdGZvbnRTaXplOiAxOFxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwLjUpXCJcblx0XHRcdGJvcmRlclJhZGl1czogOFxuXHRcdFxuXHRcdGJ1dHRvbkxheWVyLm9uKEV2ZW50cy5UYXAsIGFjdGlvbkl0ZW0uaGFuZGxlcilcblx0XHRyZXR1cm4gYnV0dG9uTGF5ZXJcblxuXG5cdGFkZFNlY3Rpb25UaXRsZTogKHRpdGxlID0gXCJIZWFkZXIgVGl0bGVcIikgPT5cblx0XHRyZXR1cm4gbmV3IFRleHRMYXllclxuXHRcdFx0dGV4dDogdGl0bGVcblx0XHRcdGZvbnRTaXplOiAxNVxuXHRcdFx0Zm9udFdlaWdodDogNTAwXG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRvcGFjaXR5OiAwLjZcblx0XHRcdHBhZGRpbmc6XG5cdFx0XHRcdHRvcDogMTJcblxuXG5cblxuIyAjIEV4YW1wbGVcbiMgcHJldmlldy5hZGRTZWN0aW9uKFwiQ2hvb3NlIEJhY2tncm91bmRcIiwgW1xuIyBcdHsgdGl0bGU6IHRlc3QxLCBoYW5kbGVyOiB0ZXN0MiB9LFxuIyBcdHsgdGl0bGU6IHRlc3QxLCBoYW5kbGVyOiB0ZXN0MiB9XG4jIF0pIiwiXG5cbmNsYXNzIGV4cG9ydHMuU3RhdHVzQmFyX0NsYXNzIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRwYXJlbnQ6IEB2aWV3XG5cdFx0XHR3aWR0aDogQHZpZXcud2lkdGhcblxuXHRcdFx0eTogQWxpZ24udG9wLCBuYW1lOiBcIi5zdGF0dXMgYmFyXCIsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0XHR0aGVtZTogQHZpZXcuc3RhdHVzQmFyX3RoZW1lXG5cdFx0XHRmb3JjZUFuZHJvaWQ6IEB2aWV3LmZvcmNlQW5kcm9pZEJhclxuXHRcdFx0cHJvdG90eXBlQ3JlYXRpb25ZZWFyOiBAdmlldy50aW1lVmFsdWVcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QGNyZWF0ZSgpXG5cblxuXG5cblxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudmlldyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICd0aGVtZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50aGVtZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50aGVtZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdmb3JjZUFuZHJvaWQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZm9yY2VBbmRyb2lkXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZCA9IHZhbHVlXG5cblx0QGRlZmluZSAncHJvdG90eXBlQ3JlYXRpb25ZZWFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5wcm90b3R5cGVDcmVhdGlvblllYXIgPSB2YWx1ZVxuXG5cblxuXG5cdHZpZXdTaXplOiAodywgaCkgPT4gcmV0dXJuIEB2aWV3LndpZHRoID09IHcgYW5kIEB2aWV3LmhlaWdodCA9PSBoXG5cblx0Y3JlYXRlOiAoKSA9PlxuXHRcdFxuXHRcdGlmIEBmb3JjZUFuZHJvaWQgdGhlbiBAY3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXIoKSBcblxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM3NSwgODEyKSBvciBAdmlld1NpemUoMzkwLCA4NDQpIG9yIEB2aWV3U2l6ZSg0MTQsIDg5Nikgb3IgQHZpZXdTaXplKDQyOCwgOTI2KSBvciBAdmlld1NpemUoMzYwLCA3ODIpXG5cdFx0XHRAY3JlYXRlTm90Y2hTdGF0dXNCYXIoKVxuXHRcdFxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM5MywgODUyKVxuXHRcdFx0QGNyZWF0ZU5vdGNoU3RhdHVzQmFyKClcblx0XHRcblx0XHRlbHNlIGlmIEB2aWV3U2l6ZSgzNzUsIDY2Nykgb3IgQHZpZXdTaXplKDQxNCwgNzM2KSBvciBAdmlld1NpemUoMzIwLCA1NjgpXG5cdFx0XHRAY3JlYXRlQ2xhc3NpY1N0YXR1c0JhcigpXG5cdFx0XG5cdFx0XG5cdFx0ZWxzZSBAY3JlYXRlQW5kcm9pZFN0YXR1c0JhcigpXG5cdFxuXHRcblx0XG5cdFxuXG5cblxuXHRjcmVhdGVBbmRyb2lkU3RhdHVzQmFyOiAoKSA9PlxuXHRcdEBoZWlnaHQgPSAzMlxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiA1MiwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ubGVmdCg0KSwgeTogQWxpZ24udG9wKDIgKyA1KVxuXHRcdFx0Y29sb3I6IGRldmljZV9hc3NldHMuY29sb3JbQHRoZW1lXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTQsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogMTAwLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5yaWdodCgtNCksIHk6IEFsaWduLnRvcCg1KVxuXHRcdFx0aW1hZ2U6IGRldmljZV9hc3NldHMuYW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHRoZW1lXVxuXHRcblx0XG5cdGNyZWF0ZUNsYXNzaWNBbmRyb2lkU3RhdHVzQmFyOiAoKSA9PlxuXHRcdEBoZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiA1MiwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ubGVmdCwgeTogQWxpZ24udG9wKDIpXG5cdFx0XHRjb2xvcjogZGV2aWNlX2Fzc2V0cy5jb2xvcltAdGhlbWVdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxNCwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiAxMDAsIGhlaWdodDogMjAsIHg6IEFsaWduLnJpZ2h0LCB5OiBBbGlnbi50b3AoKVxuXHRcdFx0aW1hZ2U6IGRldmljZV9hc3NldHMuYW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHRoZW1lXVxuXHRcblx0XG5cblxuXG5cdGNyZWF0ZUNsYXNzaWNTdGF0dXNCYXI6ICgpID0+XG5cdFx0QGhlaWdodCA9IDIwXG5cdFx0XG5cdFx0Y2xhc3NpY0xlZnRDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBAaGVpZ2h0LCB4OiBBbGlnbi5sZWZ0XG5cdFx0XHRpbWFnZTogZGV2aWNlX2Fzc2V0cy5vbGRTdGF0dXNCYXJMZWZ0SW1hZ2VbQHRoZW1lXVxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiA1NCwgaGVpZ2h0OiAxNiwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGNvbG9yOiBkZXZpY2VfYXNzZXRzLmNvbG9yW0B0aGVtZV0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBAaGVpZ2h0LCB4OiBBbGlnbi5yaWdodFxuXHRcdFx0aW1hZ2U6IGRldmljZV9hc3NldHMub2xkU3RhdHVzQmFyUmlnaHRJbWFnZVtAdGhlbWVdXG5cdFx0XG5cdFxuXHRjcmVhdGVOb3RjaFN0YXR1c0JhcjogKCkgPT5cblx0XHRAaGVpZ2h0ID0gNDRcblx0XHRcblx0XHRub3RjaExlZnRDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiA1NCwgaGVpZ2h0OiAyMSwgeDogQWxpZ24ubGVmdCgyMSksIHk6IEFsaWduLnRvcCgxMilcblx0XHRcdGNvbG9yOiBkZXZpY2VfYXNzZXRzLmNvbG9yW0B0aGVtZV0sIGJhY2tncm91bmRDb2xvcjogbnVsbCwgbGV0dGVyU3BhY2luZzogLTAuMTdcblx0XHRcdGZvbnRTaXplOiAxNSwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdG5vdGNoQ2VudGVyQ29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiAzNzUsIGhlaWdodDogQGhlaWdodCwgeDogQWxpZ24uY2VudGVyXG5cdFx0XHRpbWFnZTogZGV2aWNlX2Fzc2V0cy5ub3RjaFxuXHRcdFxuXHRcdG5vdGNoUmlnaHRDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBAaGVpZ2h0LCB4OiBBbGlnbi5yaWdodFxuXHRcdFx0aW1hZ2U6IGRldmljZV9hc3NldHMuc3RhdHVzQmFyUmlnaHRJbWFnZVtAdGhlbWVdXG5cblxuXG5cbmRldmljZV9hc3NldHMgPVxuXHRjb2xvcjpcblx0XHRkYXJrOiBcIiMwMDBcIlxuXHRcdGxpZ2h0OiBcIiNGRkZcIlxuXHRcblx0c3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyTGVmdEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0YW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvYW5kcm9pZFN0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0XG5cblxuXHRub3RjaDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX25vdGNoLnBuZ1wiXG5cdHRpcDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvdGlwLnBuZ1wiIiwiXG5cbntTZWN0aW9uVmlld30gPSByZXF1aXJlIFwiU2VjdGlvblZpZXdcIlxuXG5cbmNsYXNzIGV4cG9ydHMuVHJlZUxheWVyVmlldyBleHRlbmRzIFNlY3Rpb25WaWV3XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHR0cmVlVmlld0xheWVyID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHRcdFx0d2lkdGg6IDMyMFxuXHRcdFx0aGVpZ2h0OiAwXG5cdFx0XHRzY3JvbGxWZXJ0aWNhbDogdHJ1ZVxuXHRcdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRcdG1vdXNlV2hlZWxFbmFibGVkOiB0cnVlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiIzIyMlwiXG5cdFx0XG5cdFx0dHJlZVZpZXdMYXllci5jb250ZW50LmhlaWdodCA9IDBcblx0XHR0cmVlVmlld0xheWVyLm1vdXNlV2hlZWxFbmFibGVkID0gdHJ1ZVxuXHRcdFx0XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0dHJlZVZpZXc6IHRyZWVWaWV3TGF5ZXJcblx0XHRcdGluZGVudDogMVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHR0cmVlVmlld0xheWVyLnBhcmVudCA9IEBwYXJlbnRcblxuXHRcblx0QGRlZmluZSAndHJlZVZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudHJlZVZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudHJlZVZpZXcgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnaW5kZW50Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmluZGVudFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5pbmRlbnQgPSB2YWx1ZVxuXHRcblxuXG5cdHByaW50VHJlZTogKCkgPT5cblx0XHRwcmludCBAdmlldy5jaGlsZHJlblxuXHRcdEBwcmludE5vZGUoQHZpZXcpXG5cdFx0QHRyZWVWaWV3LmhlaWdodCA9IFNjcmVlbi5oZWlnaHRcblx0XHRAdHJlZVZpZXcudXBkYXRlQ29udGVudCgpXG5cdFxuXG5cdHByaW50Tm9kZTogKG5vZGUsIGxldmVsID0gMCkgPT5cblx0XHRpZiBub2RlLm5hbWUgPT0gXCJcIiB0aGVuIGxheWVyTmFtZSA9IFwiVW50aXRsZWRcIiBlbHNlIGxheWVyTmFtZSA9IG5vZGUubmFtZVxuXHRcdCMgcHJpbnQgQXJyYXkobGV2ZWwgKyAxKS5qb2luKFwiIOODuyBcIikgKyBcIiAje2xheWVyTmFtZX1cIlxuXG5cdFx0dHJlZU5vZGVMYXllciA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogQHRyZWVWaWV3LmNvbnRlbnRcblx0XHRcdHRleHQ6IEFycmF5KGxldmVsICsgMSkuam9pbihcIiDjg7sgXCIpICsgXCIgI3tsYXllck5hbWV9XCJcblx0XHRcdFxuXHRcdFx0Zm9udFNpemU6IDE1XG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblxuXHRcdFx0b3BhY2l0eTogaWYgbGF5ZXJOYW1lID09IFwiVW50aXRsZWRcIiB0aGVuIDAuNSBlbHNlIDFcblx0XHRcdGhlaWdodDogMjhcblx0XHRcdHk6IEB0cmVlVmlldy5oZWlnaHRcblx0XHRcdCMgYmFja2dyb3VuZENvbG9yOiBVdGlscy5yYW5kb21Db2xvcigpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGN1c3RvbTpcblx0XHRcdFx0bGF5ZXI6IG5vZGVcblx0XHRcblx0XHR0cmVlTm9kZUxheWVyLm9uVGFwIC0+XG5cdFx0XHRwcmludCBcIiN7QGN1c3RvbS5sYXllci5uYW1lfSB4OiAje0BjdXN0b20ubGF5ZXIueH0geTogI3tAY3VzdG9tLmxheWVyLnl9IHNpemU6ICN7QGN1c3RvbS5sYXllci53aWR0aH14I3tAY3VzdG9tLmxheWVyLmhlaWdodH1cIlxuXG5cdFx0XG5cdFx0QHRyZWVWaWV3LmhlaWdodCArPSAyOFxuXG5cblx0XHRpZiBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDBcblx0XHRcdG5leHRMZXZlbCA9IGxldmVsICsgMVxuXHRcdFx0Zm9yIGNoaWxkTm9kZSBpbiBub2RlLmNoaWxkcmVuXG5cdFx0XHRcdEBwcmludE5vZGUoY2hpbGROb2RlLCBuZXh0TGV2ZWwpXG5cdFx0XG4iLCJcbmNsYXNzIFRleHQgZXh0ZW5kcyBUZXh0TGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0IyBmb250RmFtaWx5OiBmb250QXZlcmlhXG5cdFx0XHRmb250U2l6ZTogMThcblx0XHRcdHdlaWdodDogNzAwXG5cdFx0XHRjb2xvcjogXCJ3aGl0ZVwiXG5cdFx0XHRoZWlnaHQ6IDIwXG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiAwLjdcblx0XHRcdGxldHRlclNwYWNpbmc6IDAuNFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAc3R5bGUgPVxuXHRcdFx0XCJmb250LWZhbWlseVwiOiBcIidTRiBQcm8gVGV4dCcsICdQVCBTYW5zJywgJ0hlbHZldGljYScsICdUYWhvbWEnLCBzYW5zLXNlcmlmO1wiXG5cdFx0XHRcImZvbnQtd2VpZ2h0XCI6IDcwMFxuXHRcdFx0XCItd2Via2l0LWZvbnQtZmVhdHVyZS1zZXR0aW5nc1wiOiBcIidzczAyJyBvbiwgJ3NzMDYnIG9uLCAnc3MwOScgb24sICdzczExJyBvbjtcIlxuXHRcdFx0XCItbW96LWZvbnQtZmVhdHVyZS1zZXR0aW5nc1wiOiBcIidzczAyJyBvbiwgJ3NzMDYnIG9uLCAnc3MwOScgb24sICdzczExJyBvbjtcIlxuXHRcdFx0XCItbXMtZm9udC1mZWF0dXJlLXNldHRpbmdzXCI6IFwiJ3NzMDInIG9uLCAnc3MwNicgb24sICdzczA5JyBvbiwgJ3NzMTEnIG9uO1wiXG5cdFx0XHRcImZvbnQtZmVhdHVyZS1zZXR0aW5nc1wiOiBcIidzczAyJyBvbiwgJ3NzMDYnIG9uLCAnc3MwOScgb24sICdzczExJyBvbjtcIlxuXHRcdFxuXG5cblxuY2xhc3MgVGV4dEJ1dHRvbiBleHRlbmRzIFRleHRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0dHVwbGU6IHsgbm9ybWFsOiAwLjUsIGhvdmVyOiAwLjggfVxuXHRcdFx0aGFuZGxlcjogbnVsbFxuXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cblx0XHRAdXBkYXRlVHVwbGUoQHR1cGxlKVxuXHRcblx0XG5cdFx0XG5cdEhvdmVyOiA9PlxuXHRcdEBvcGFjaXR5ID0gQHR1cGxlLmhvdmVyXG5cdEhvdmVyT2ZmOiA9PlxuXHRcdEBvcGFjaXR5ID0gQHR1cGxlLm5vcm1hbFxuXHRcblx0dXBkYXRlVHVwbGU6IChuZXdUdXBsZSkgPT5cblx0XHRAdHVwbGUgPSBuZXdUdXBsZVxuXHRcdEBlbWl0IEV2ZW50cy5Nb3VzZU92ZXJcblx0XHRAZW1pdCBFdmVudHMuTW91c2VPdXRcblx0XG5cdFxuXHRAZGVmaW5lICdoYW5kbGVyJyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9uKEV2ZW50cy5UYXAsIHZhbHVlKVxuXHRcblx0QGRlZmluZSAndHVwbGUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudHVwbGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnR1cGxlID0gdmFsdWVcblxuXG5cbmNsYXNzIEJ1dHRvbiBleHRlbmRzIFRleHRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0aGFuZGxlcjogbnVsbFxuXHRcdFx0aGVpZ2h0OiAzMiwgYm9yZGVyUmFkaXVzOiA4XG5cdFx0XHRwYWRkaW5nOiB7IHRvcDogNiwgYm90dG9tOiA3LCBsZWZ0OiA5LCByaWdodDogOSB9XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgwLDAsMCwwLjcpXCJcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEBzaG93SGludCA9IC0+IDtcblx0XHRAc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0XG5cdFx0QC5vbk1vdXNlT3ZlciBASG92ZXJcblx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cdFx0XG5cdEhvdmVyOiA9PlxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsMC40KVwiXG5cdEhvdmVyT2ZmOiA9PlxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsMC43KVwiXG5cdFxuXHRAZGVmaW5lICdoYW5kbGVyJyxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9uKEV2ZW50cy5UYXAsIHZhbHVlKVxuXG5cbmNsYXNzIEJ1dHRvblRhYiBleHRlbmRzIEJ1dHRvblxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRzZWxlY3RlZDogdHJ1ZVxuXHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdEhvdmVyOiA9PlxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsMC40KVwiXG5cdEhvdmVyT2ZmOiA9PlxuXHRcdGlmIEBzZWxlY3RlZCB0aGVuIEBiYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsMC43KVwiXG5cdFx0ZWxzZSBAYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsMCwwLDAuMilcIlxuXG5cdEBkZWZpbmUgJ3NlbGVjdGVkJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNlbGVjdGVkXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5zZWxlY3RlZCA9IHZhbHVlXG5cdFx0XHRpZiB2YWx1ZSB0aGVuIEBiYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsMC43KVwiXG5cdFx0XHRlbHNlIEBiYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsMC4yKVwiXG5cblxuIyBCdXR0b246IFNWR1xuXG4jIGNsYXNzIFNWR0J1dHRvbiBleHRlbmRzIFRleHRCdXR0b25cbiMgXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuIyBcdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcbiMgXHRcdFx0dGV4dDogXCJcIlxuIyBcdFx0XHRhc3NldDogbnVsbFxuIyBcdFx0XHRjbGlwOiBmYWxzZVxuIyBcdFx0XHRhdXRvU2l6ZTogZmFsc2Vcblx0XHRcbiMgXHRcdEBzdmdTaGFwZSA9IG5ldyBTVkdMYXllclxuIyBcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwibnVsbFwiLCBuYW1lOiBcInN2Z1NoYXBlXCJcblx0XHRcbiMgXHRcdHN1cGVyIEBvcHRpb25zXG4jIFx0XHRAc3ZnU2hhcGUucGFyZW50ID0gQFxuIyBcdFx0QHVwZGF0ZVNWR1NpemUoKVxuXHRcblx0XG4jIFx0QGRlZmluZSAnYXNzZXQnLFxuIyBcdFx0Z2V0OiAtPiBAb3B0aW9ucy5hc3NldFxuIyBcdFx0c2V0OiAodmFsdWUpIC0+XG4jIFx0XHRcdEBvcHRpb25zLmFzc2V0ID0gdmFsdWVcbiMgXHRcdFx0QHN2Z1NoYXBlLnN0YXRlcyA9XG4jIFx0XHRcdFx0XCJvbkRhcmtcIjogeyBzdmc6IHZhbHVlLm9uRGFyayB9XG4jIFx0XHRcdFx0XCJvbkxpZ2h0XCI6IHsgc3ZnOiB2YWx1ZS5vbkxpZ2h0IH1cbiMgXHRcdFx0QHN2Z1NoYXBlLnN0YXRlU3dpdGNoKFwib25EYXJrXCIpXG5cdFxuIyBcdHVwZGF0ZVNWR1NpemU6ICgpID0+XG4jIFx0XHRAc3ZnU2hhcGUud2lkdGggPSBAd2lkdGhcbiMgXHRcdEBzdmdTaGFwZS5oZWlnaHQgPSBAaGVpZ2h0XG5cdFxuXG5cblxuXG4jIEJ1dHRvbjogQ29weVxuXG4jIGNsYXNzIENvcHlCdXR0b24gZXh0ZW5kcyBUZXh0QnV0dG9uXG4jIFx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcbiMgXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG4jIFx0XHRcdGxpbms6IFwiaHR0cHM6Ly90aWxsbHVyLmNvbVwiXG4jIFx0XHRcdGhhbmRsZXI6IEBjb3B5SGFuZGxlclxuXHRcdFxuIyBcdFx0QGFyZWEgPSBuZXcgTGF5ZXJcbiMgXHRcdFx0b3BhY2l0eTogMCwgeDogLTMwMDAsIGh0bWw6IG51bGxcblx0XHRcbiMgXHRcdHN1cGVyIEBvcHRpb25zXG4jIFx0XHRAYXJlYS5wYXJlbnQgPSBAXG5cdFxuXHRcbiMgXHRAZGVmaW5lICdsaW5rJyxcbiMgXHRcdGdldDogLT4gQG9wdGlvbnMubGlua1xuIyBcdFx0c2V0OiAodmFsdWUpIC0+XG4jIFx0XHRcdEBvcHRpb25zLmxpbmsgPSB2YWx1ZVxuIyBcdFx0XHRAdXBkYXRlKHZhbHVlKVxuXHRcblx0XG4jIFx0dXBkYXRlOiAobGluaykgPT5cbiMgXHRcdEBhcmVhLmh0bWwgPSBcIjx0ZXh0YXJlYSBjbGFzcz0nanMtY29weXRleHRhcmVhLWNsYXNzJyBzdHlsZT0nb3BhY2l0eTowOyc+I3tsaW5rfTwvdGV4dGFyZWE+XCJcblx0XG5cdFxuIyBcdGNvcHlIYW5kbGVyOiA9PlxuIyBcdFx0dGV4dERpdiA9IEBhcmVhLnF1ZXJ5U2VsZWN0b3IoJy5qcy1jb3B5dGV4dGFyZWEtY2xhc3MnKVxuIyBcdFx0dGV4dERpdi5mb2N1cygpXG4jIFx0XHR0ZXh0RGl2LnNlbGVjdCgpXG4jIFx0XHRkb2N1bWVudC5leGVjQ29tbWFuZCAnY29weSdcblx0XHRcbiMgXHRcdG9yaWdpblRpdGxlID0gQHRleHRcbiMgXHRcdEB0ZXh0ID0gXCJEb25lIPCfkYxcIlxuIyBcdFx0VXRpbHMuZGVsYXkgMSwgPT4gQHRleHQgPSBvcmlnaW5UaXRsZVxuXG5cblxuXG4jICMgIyBCdXR0b246IENvcHlcblxuIyAjIGNsYXNzIExpbmtCdXR0b24gZXh0ZW5kcyBTVkdCdXR0b25cbiMgIyBcdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG4jICMgXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG4jICMgXHRcdFx0bGluazogXCJodHRwczovL3RpbGxsdXIuY29tXCJcbiMgIyBcdFx0XHRib3JkZXJXaWR0aDogMSAqIDJcbiMgIyBcdFx0XHRib3JkZXJSYWRpdXM6IDIwICogMlxuIyAjIFx0XHRcdHR1cGxlOiB7IG5vcm1hbDogMS4wLCBob3ZlcjogMC44IH1cblx0XHRcdFxuXHRcdFxuIyAjIFx0XHRAdGludEJ1dHRvbkZpeCA9IG5ldyBMYXllclxuIyAjIFx0XHRcdGhlaWdodDogMTIwICogMlxuIyAjIFx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuIyAjIFx0XHRAYnV0dG9uVGV4dCA9IG5ldyBUZXh0XG4jICMgXHRcdFx0Zm9udFNpemU6IDMyICogMlxuIyAjIFx0XHRcdHRleHRBbGlnbjogXCJyaWdodFwiXG4jICMgXHRcdFx0aGVpZ2h0OiA2MCAqIDJcblx0XHRcbiMgIyBcdFx0QGJ1dHRvbkljb24gPSBuZXcgU1ZHTGF5ZXJcbiMgIyBcdFx0XHR3aWR0aDogMjQgKiAyLCBoZWlnaHQ6IDI0ICogMlxuIyAjIFx0XHRcdHN2ZzogU1ZHLm9wZW5JY29uLm9uTGlnaHRcbiMgIyBcdFx0XHRvcGFjaXR5OiAwLjZcblx0XHRcdFxuXG5cdFx0XG4jICMgXHRcdHN1cGVyIEBvcHRpb25zXG5cbiMgIyBcdFx0QGJ1dHRvblRleHQudGV4dCA9IEB0ZXh0XG4jICMgXHRcdEB0ZXh0ID0gXCJcIlxuXG4jICMgXHRcdEB0aW50QnV0dG9uRml4LnBhcmVudCA9IEBwYXJlbnRcbiMgIyBcdFx0QHRpbnRCdXR0b25GaXgueCA9IEFsaWduLnJpZ2h0XG4jICMgXHRcdEB0aW50QnV0dG9uRml4LnkgPSBBbGlnbi50b3Bcblx0XHRcbiMgIyBcdFx0QHBhcmVudCA9IEB0aW50QnV0dG9uRml4XG4jICMgXHRcdEB5ID0gQWxpZ24udG9wKDMwICogMilcbiMgIyBcdFx0QGhlaWdodCA9IDYwICogMlxuXG4jICMgXHRcdEBidXR0b25UZXh0LnBhcmVudCA9IEBcbiMgIyBcdFx0QGJ1dHRvblRleHQueCA9IDE2ICogMlxuIyAjIFx0XHRAYnV0dG9uVGV4dC55ID0gOSAqIDJcblxuIyAjIFx0XHRAYnV0dG9uSWNvbi5wYXJlbnQgPSBAXG4jICMgXHRcdEBidXR0b25JY29uLnggPSAxNiAqIDIgKyBAYnV0dG9uVGV4dC53aWR0aCArIDE2ICogMlxuIyAjIFx0XHRAYnV0dG9uSWNvbi55ID0gQWxpZ24uY2VudGVyKDMgKiAyKVxuXG4jICMgXHRcdEB3aWR0aCA9IDE2ICogMiArIEBidXR0b25UZXh0LndpZHRoICsgQGJ1dHRvbkljb24ud2lkdGggKyAxNiAqIDIgKyAxNiAqIDJcbiMgIyBcdFx0QHRpbnRCdXR0b25GaXgud2lkdGggPSBAd2lkdGggKyAzMCAqIDIgKyAxNiAqIDJcblxuIyAjIFx0XHRAdGludEJ1dHRvbkZpeC54ID0gQWxpZ24ucmlnaHRcbiMgIyBcdFx0QHggPSBBbGlnbi5yaWdodCgtMzAgKiAyKVxuXHRcdFxuXHRcblxuIyAjIFx0QGRlZmluZSAnbGluaycsXG4jICMgXHRcdGdldDogLT4gQG9wdGlvbnMubGlua1xuIyAjIFx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMubGluayA9IHZhbHVlXG5cdFxuIyAjIFx0c2V0Q29sb3I6IChjb2xvciA9IG51bGwpID0+XG4jICMgXHRcdGlmIGNvbG9yID09IG51bGwgdGhlbiByZXR1cm5cbiMgIyBcdFx0QHRpbnRCdXR0b25GaXguYmFja2dyb3VuZENvbG9yID0gY29sb3Jcblx0XG5cblxuXG5cblxuXG5cblxuIyBjbGFzcyBQcmV2aWV3QnV0dG9uIGV4dGVuZHMgVGV4dFxuIyBcdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cbiMgXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG4jIFx0XHRcdHR1cGxlOiB7IG5vcm1hbDogMS4wLCBob3ZlcjogMC44IH1cblx0XHRcbiMgXHRcdHN1cGVyIEBvcHRpb25zXG5cbiMgXHRcdEByZW1vdmVBbGxMaXN0ZW5lcnMoKVxuXG4jIFx0XHRALm9uTW91c2VPdmVyIEBIb3ZlclxuIyBcdFx0QC5vbk1vdXNlT3V0IEBIb3Zlck9mZlxuXG4jIFx0SG92ZXI6ID0+XG4jIFx0XHQjIEBzY2FsZSA9IDEuMDVcbiMgXHRcdEBvcGFjaXR5ID0gMS4wXG5cdFxuIyBcdEhvdmVyT2ZmOiA9PlxuIyBcdFx0IyBAc2NhbGUgPSAxLjBcbiMgXHRcdEBvcGFjaXR5ID0gMC44XG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0ge1RleHQsIFRleHRCdXR0b24sIEJ1dHRvbiwgQnV0dG9uVGFifVxuXG5cbiIsIlxuXG57VUlfU2VjdGlvbn0gPSByZXF1aXJlIFwiVUlfU2VjdGlvblwiXG57VGV4dCwgQnV0dG9ufSA9IHJlcXVpcmUgXCJVSV9CdXR0b25zXCJcblxuY2xhc3MgZXhwb3J0cy5VSV9Db25maWcgZXh0ZW5kcyBVSV9TZWN0aW9uXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGhlaWdodDogMTAwLCB5OiBBbGlnbi5ib3R0b20oLTgpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblxuXHRcdFx0dmlldzogbnVsbFxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XHRAdXBkYXRlQ29uZmlnT25SZXNpemUoKVxuXG5cblx0QGRlZmluZSAndmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy52aWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnZpZXcgPSB2YWx1ZVxuXG5cblx0dXBkYXRlQ29uZmlnT25SZXNpemU6ICgpID0+XG5cdFx0bG9jYWxDb25maWcgPSBAXG5cdFx0XG5cdFx0Q2FudmFzLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PiBsb2NhbENvbmZpZy55ID0gQWxpZ24uYm90dG9tKC04KVxuXG5cblxuXHQjIE92ZXJyaWRlXG5cdGFkZFNlY3Rpb246IChhY3Rpb25BcnJheSA9IFtdKSA9PlxuXHRcdHNlY3Rpb25WaWV3ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiAzNjAsIGhlaWdodDogMTAwLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdHg6IDMyLCB5OiBBbGlnbi5ib3R0b20oKVxuXG5cdFx0QGFkZFNlY3Rpb25UaXRsZShzZWN0aW9uVmlldywgXCJQcmV2aWV3XCIpXG5cdFx0c2VjdGlvblZpZXcuc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0c2VjdGlvblZpZXcub25UYXAgLT4gO1xuXHRcdHNlY3Rpb25WaWV3LnNob3dIaW50ID0gLT4gO1xuXG5cdFx0c3VtWCA9IDBcblx0XHRmb3IgYWN0aW9uSXRlbSwgaSBpbiBhY3Rpb25BcnJheVxuXHRcdFx0c2VjdGlvbkJ1dHRvbiA9IEBhZGRBY3Rpb25CdXR0b24oYWN0aW9uSXRlbSwgaSlcblx0XHRcdHNlY3Rpb25CdXR0b24ucGFyZW50ID0gc2VjdGlvblZpZXdcblx0XHRcdHNlY3Rpb25CdXR0b24ueCA9IHN1bVhcblx0XHRcdHN1bVggKz0gc2VjdGlvbkJ1dHRvbi53aWR0aCArIDggKyA0XG5cdFx0XG5cdFx0QHdpZHRoID0gTWF0aC5tYXgoQHdpZHRoLCBzdW1YKVxuXHRcblxuXG5cdCMgT3ZlcnJpZGVcblx0YWRkQWN0aW9uQnV0dG9uOiAoYWN0aW9uSXRlbSwgaW5kZXgpID0+XG5cdFx0YnV0dG9uTGF5ZXIgPSBuZXcgQnV0dG9uXG5cdFx0XHR0ZXh0OiBhY3Rpb25JdGVtLnRpdGxlXG5cdFx0XHR5OiA0MlxuXHRcdFx0c2VsZWN0ZWQ6IGlmIGluZGV4IGlzIDAgdGhlbiB0cnVlIGVsc2UgZmFsc2Vcblx0XHRcdGN1c3RvbTpcblx0XHRcdFx0YWN0aW9uSXRlbTogYWN0aW9uSXRlbVxuXHRcdFxuXHRcdGNvbXBsZXhIYW5kbGVyID0gKCkgLT5cblx0XHRcdEBjdXN0b20uYWN0aW9uSXRlbS5oYW5kbGVyKEBjdXN0b20uYWN0aW9uSXRlbS5kYXRhLCBAKVxuXG5cdFx0YnV0dG9uTGF5ZXIub24oRXZlbnRzLlRhcCwgY29tcGxleEhhbmRsZXIpXG5cdFx0cmV0dXJuIGJ1dHRvbkxheWVyIiwiXG5cblxue1RleHQsIEJ1dHRvblRhYn0gPSByZXF1aXJlIFwiVUlfQnV0dG9uc1wiXG5cbmNsYXNzIGV4cG9ydHMuVUlfU2VjdGlvbiBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHdpZHRoOiAyMDAsIGhlaWdodDogU2NyZWVuLmhlaWdodCwgeTogMTAwXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFxuXG5cdGFkZFNlY3Rpb246ICh0aXRsZSwgYWN0aW9uQXJyYXkgPSBbXSkgPT5cblxuXHRcdHNlY3Rpb25WaWV3ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEBcblx0XHRcdHdpZHRoOiAzNjAsIGhlaWdodDogMTAwLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdHg6IDMyLCB5OiBAY2hpbGRyZW4ubGVuZ3RoICogMTAwXG5cblx0XHRAYWRkU2VjdGlvblRpdGxlKHNlY3Rpb25WaWV3LCB0aXRsZSlcblxuXHRcdHNlY3Rpb25WaWV3LnN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdHNlY3Rpb25WaWV3Lm9uVGFwIC0+IDtcblx0XHRzZWN0aW9uVmlldy5zaG93SGludCA9IC0+IDtcblxuXHRcdHN1bVggPSAwXG5cdFx0Zm9yIGFjdGlvbkl0ZW0sIGkgaW4gYWN0aW9uQXJyYXlcblx0XHRcdHNlY3Rpb25CdXR0b24gPSBAYWRkQWN0aW9uQnV0dG9uKGFjdGlvbkl0ZW0sIGkpXG5cdFx0XHRzZWN0aW9uQnV0dG9uLnBhcmVudCA9IHNlY3Rpb25WaWV3XG5cdFx0XHRzZWN0aW9uQnV0dG9uLnggPSBzdW1YXG5cdFx0XHRzdW1YICs9IHNlY3Rpb25CdXR0b24ud2lkdGggKyA4XG5cdFx0XG5cdFx0QHdpZHRoID0gTWF0aC5tYXgoQHdpZHRoLCBzdW1YKVxuXG5cblxuXHRhZGRBY3Rpb25CdXR0b246IChhY3Rpb25JdGVtLCBpbmRleCkgPT5cblx0XHRidXR0b25MYXllciA9IG5ldyBCdXR0b25UYWJcblx0XHRcdHRleHQ6IGFjdGlvbkl0ZW0udGl0bGVcblx0XHRcdHk6IDQyXG5cdFx0XHRzZWxlY3RlZDogaWYgaW5kZXggaXMgMCB0aGVuIHRydWUgZWxzZSBmYWxzZVxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRhY3Rpb25JdGVtOiBhY3Rpb25JdGVtXG5cdFx0XG5cdFx0Y29tcGxleEhhbmRsZXIgPSAoKSAtPlxuXHRcdFx0QGN1c3RvbS5hY3Rpb25JdGVtLmhhbmRsZXIoQGN1c3RvbS5hY3Rpb25JdGVtLmRhdGEsIEApXG5cdFx0XHRmb3IgYnV0dG9uIGluIEBwYXJlbnQuY2hpbGRyZW5cblx0XHRcdFx0aWYgYnV0dG9uLm5hbWUgaXNudCBcIi5zZWN0aW9uVGl0bGVcIlxuXHRcdFx0XHRcdGJ1dHRvbi5zZWxlY3RlZCA9IHRydWUgaWYgYnV0dG9uIGlzIEBcblx0XHRcdFx0XHRidXR0b24uc2VsZWN0ZWQgPSBmYWxzZSBpZiBidXR0b24gaXNudCBAXG5cblx0XHRidXR0b25MYXllci5vbihFdmVudHMuVGFwLCBjb21wbGV4SGFuZGxlcilcblx0XHRyZXR1cm4gYnV0dG9uTGF5ZXJcblxuXG5cdGFkZFNlY3Rpb25UaXRsZTogKGxvY2FsUGFyZW50LCB0aXRsZSA9IFwiSGVhZGVyIFRpdGxlXCIpID0+XG5cdFx0bmV3IFRleHRcblx0XHRcdHBhcmVudDogbG9jYWxQYXJlbnRcblx0XHRcdHRleHQ6IHRpdGxlLCBuYW1lOiBcIi5zZWN0aW9uVGl0bGVcIlxuXHRcdFx0Zm9udFNpemU6IDE2LCBvcGFjaXR5OiAwLjUsIHBhZGRpbmc6IHsgdG9wOiAxMiB9XG5cbiIsIlxuXG4jIHtTZWN0aW9uVmlld30gPSByZXF1aXJlIFwiU2VjdGlvblZpZXdcIlxuXG5cbmNsYXNzIGV4cG9ydHMuVHJlZUxheWVyVmlldyBleHRlbmRzIFNlY3Rpb25WaWV3XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHR0cmVlVmlld0xheWVyID0gbmV3IFNjcm9sbENvbXBvbmVudFxuXHRcdFx0d2lkdGg6IDMyMFxuXHRcdFx0aGVpZ2h0OiAwXG5cdFx0XHRzY3JvbGxWZXJ0aWNhbDogdHJ1ZVxuXHRcdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRcdG1vdXNlV2hlZWxFbmFibGVkOiB0cnVlXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiIzIyMlwiXG5cdFx0XG5cdFx0dHJlZVZpZXdMYXllci5jb250ZW50LmhlaWdodCA9IDBcblx0XHR0cmVlVmlld0xheWVyLm1vdXNlV2hlZWxFbmFibGVkID0gdHJ1ZVxuXHRcdFx0XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0dHJlZVZpZXc6IHRyZWVWaWV3TGF5ZXJcblx0XHRcdGluZGVudDogMVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHR0cmVlVmlld0xheWVyLnBhcmVudCA9IEBwYXJlbnRcblxuXHRcblx0QGRlZmluZSAndHJlZVZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudHJlZVZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudHJlZVZpZXcgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnaW5kZW50Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmluZGVudFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5pbmRlbnQgPSB2YWx1ZVxuXHRcblxuXG5cdHByaW50VHJlZTogKCkgPT5cblx0XHRwcmludCBAdmlldy5jaGlsZHJlblxuXHRcdEBwcmludE5vZGUoQHZpZXcpXG5cdFx0QHRyZWVWaWV3LmhlaWdodCA9IFNjcmVlbi5oZWlnaHRcblx0XHRAdHJlZVZpZXcudXBkYXRlQ29udGVudCgpXG5cdFxuXG5cdHByaW50Tm9kZTogKG5vZGUsIGxldmVsID0gMCkgPT5cblx0XHRpZiBub2RlLm5hbWUgPT0gXCJcIiB0aGVuIGxheWVyTmFtZSA9IFwiVW50aXRsZWRcIiBlbHNlIGxheWVyTmFtZSA9IG5vZGUubmFtZVxuXHRcdCMgcHJpbnQgQXJyYXkobGV2ZWwgKyAxKS5qb2luKFwiIOODuyBcIikgKyBcIiAje2xheWVyTmFtZX1cIlxuXG5cdFx0dHJlZU5vZGVMYXllciA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogQHRyZWVWaWV3LmNvbnRlbnRcblx0XHRcdHRleHQ6IEFycmF5KGxldmVsICsgMSkuam9pbihcIiDjg7sgXCIpICsgXCIgI3tsYXllck5hbWV9XCJcblx0XHRcdFxuXHRcdFx0Zm9udFNpemU6IDE1XG5cdFx0XHRmb250V2VpZ2h0OiA1MDBcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblxuXHRcdFx0b3BhY2l0eTogaWYgbGF5ZXJOYW1lID09IFwiVW50aXRsZWRcIiB0aGVuIDAuNSBlbHNlIDFcblx0XHRcdGhlaWdodDogMjhcblx0XHRcdHk6IEB0cmVlVmlldy5oZWlnaHRcblx0XHRcdCMgYmFja2dyb3VuZENvbG9yOiBVdGlscy5yYW5kb21Db2xvcigpXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGN1c3RvbTpcblx0XHRcdFx0bGF5ZXI6IG5vZGVcblx0XHRcblx0XHR0cmVlTm9kZUxheWVyLm9uVGFwIC0+XG5cdFx0XHRwcmludCBcIiN7QGN1c3RvbS5sYXllci5uYW1lfSB4OiAje0BjdXN0b20ubGF5ZXIueH0geTogI3tAY3VzdG9tLmxheWVyLnl9IHNpemU6ICN7QGN1c3RvbS5sYXllci53aWR0aH14I3tAY3VzdG9tLmxheWVyLmhlaWdodH1cIlxuXG5cdFx0XG5cdFx0QHRyZWVWaWV3LmhlaWdodCArPSAyOFxuXG5cblx0XHRpZiBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDBcblx0XHRcdG5leHRMZXZlbCA9IGxldmVsICsgMVxuXHRcdFx0Zm9yIGNoaWxkTm9kZSBpbiBub2RlLmNoaWxkcmVuXG5cdFx0XHRcdEBwcmludE5vZGUoY2hpbGROb2RlLCBuZXh0TGV2ZWwpXG5cdFx0XG4iLCIjIEFkZCB0aGUgZm9sbG93aW5nIGxpbmUgdG8geW91ciBwcm9qZWN0IGluIEZyYW1lciBTdHVkaW8uIFxuIyBteU1vZHVsZSA9IHJlcXVpcmUgXCJteU1vZHVsZVwiXG4jIFJlZmVyZW5jZSB0aGUgY29udGVudHMgYnkgbmFtZSwgbGlrZSBteU1vZHVsZS5teUZ1bmN0aW9uKCkgb3IgbXlNb2R1bGUubXlWYXJcblxuZXhwb3J0cy5teVZhciA9IFwibXlWYXJpYWJsZVwiXG5cbmV4cG9ydHMubXlGdW5jdGlvbiA9IC0+XG5cdHByaW50IFwibXlGdW5jdGlvbiBpcyBydW5uaW5nXCJcblxuZXhwb3J0cy5teUFycmF5ID0gWzEsIDIsIDNdIl19
