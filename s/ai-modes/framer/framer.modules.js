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


},{}],"CV_InputView":[function(require,module,exports){
var Button;

Button = require("Buttons").Button;

exports.background = function() {
  return new Layer({
    width: 375.0,
    height: 812.0,
    image: "images/input_background.png"
  });
};

exports.topView = function(parent) {
  return new Layer({
    parent: parent,
    width: 375,
    height: 56,
    backgroundColor: null,
    y: Align.top(44)
  });
};

exports.buttonDelete = function(parent, handler) {
  return new Button({
    parent: parent,
    width: 44.0,
    height: 44.0,
    image: "images/button_clear.png",
    x: Align.right(-16),
    y: Align.center,
    handler: handler
  });
};

exports.promptView = function(parent, handler) {
  var promptNull, promptTyped, promptView;
  promptView = new Layer({
    parent: parent,
    width: 375.0,
    height: 180.0,
    y: 100,
    backgroundColor: null,
    custom: {
      handler: handler
    }
  });
  promptView.onTap(function() {
    return this.custom.handler();
  });
  promptView.states = {
    "null": {
      opacity: 1
    },
    "typed": {
      opacity: 1
    },
    "top": {
      y: 100
    },
    "bottom": {
      y: 475
    }
  };
  promptView.stateSwitch("null");
  promptView.on(Events.StateSwitchEnd, function(from, to) {
    if (to !== from) {
      if (to === "typed") {
        return this.children[1].opacity = 1;
      } else if (to === "null") {
        return this.children[1].opacity = 0;
      }
    }
  });
  promptNull = new Layer({
    parent: promptView,
    width: 375.0,
    height: 180.0,
    image: "images/promptNull.png"
  });
  promptTyped = new Layer({
    parent: promptView,
    width: 375.0,
    height: 180.0,
    image: "images/promptTyped.png",
    opacity: 0
  });
  return promptView;
};

exports.bottomView = function(parent) {
  return new Layer({
    parent: parent,
    width: 375,
    height: 64,
    backgroundColor: null,
    y: Align.bottom(-32)
  });
};

exports.buttonMagic = function(parent, handler) {
  return new Button({
    parent: parent,
    width: 44.0,
    height: 44.0,
    image: "images/button_magic.png",
    x: Align.left(16),
    y: Align.center,
    handler: handler
  });
};

exports.buttonSettings = function(parent, handler) {
  return new Button({
    parent: parent,
    width: 44.0,
    height: 44.0,
    image: "images/button_settings.png",
    x: Align.left(68),
    y: Align.center,
    handler: handler
  });
};

exports.buttonCamera = function(parent, handler) {
  return new Button({
    parent: parent,
    width: 44.0,
    height: 44.0,
    image: "images/button_camera.png",
    x: Align.left(120),
    y: Align.center,
    handler: handler
  });
};

exports.buttonContinue = function(parent, handler) {
  return new Button({
    parent: parent,
    size: 44,
    image: "images/button_right.png",
    x: Align.right(-125),
    y: Align.center,
    handler: handler,
    opacity: 0
  });
};

exports.buttonNext = function(parent, handler) {
  return new Button({
    parent: parent,
    width: 101.0,
    height: 44.0,
    image: "images/button_create.png",
    x: Align.right(-16),
    y: Align.center,
    handler: handler
  });
};

exports.imageView = function(parent) {
  var imageView;
  imageView = new Layer({
    parent: parent,
    size: 375,
    y: Align.top(100),
    image: "images/image_choose.png"
  });
  imageView.states = {
    "shown": {
      opacity: 1
    },
    "hidden": {
      opacity: 0
    }
  };
  imageView.stateSwitch("hidden");
  return imageView;
};

exports.chooseView = function() {
  return new Layer({
    width: 375.0,
    height: 740.0,
    image: "images/recent_photo_basic.png"
  });
};

exports.images = function(parent, handler) {
  return new Button({
    parent: parent,
    width: 375.0,
    height: 668.0,
    image: "images/choose_images_temp.png",
    scaleTo: 1,
    handler: handler,
    y: 72
  });
};

exports.chooseButtonClose = function(parent, handler) {
  return new Button({
    parent: parent,
    width: 44.0,
    height: 44.0,
    image: "images/button_close.png",
    x: Align.right(-16),
    y: Align.top(16),
    handler: handler
  });
};

exports.settingsView = function() {
  return new Layer({
    width: 375.0,
    height: 740.0,
    image: "images/settings_base_view.png"
  });
};

exports.settingsButtonClose = function(parent, handler) {
  return new Button({
    parent: parent,
    width: 44.0,
    height: 44.0,
    image: "images/button_close.png",
    x: Align.right(-16),
    y: Align.top(16),
    handler: handler
  });
};


},{"Buttons":"Buttons"}],"CV_ModalView":[function(require,module,exports){
var Button;

Button = require("Buttons").Button;

exports.background = function() {
  return new Layer({
    width: 375.0,
    height: 380.0,
    backgroundColor: "white"
  });
};

exports.changeButton = function(parent, handler) {
  return new Button({
    parent: parent,
    width: 375.0,
    height: 86.0,
    image: "images/big_button_change.png",
    y: Align.bottom(-32 - 86),
    handler: handler,
    scaleTo: 0.96
  });
};

exports.createButton = function(parent, handler) {
  return new Button({
    parent: parent,
    width: 375.0,
    height: 86.0,
    image: "images/big_button_create.png",
    y: Align.bottom(-32),
    handler: handler,
    scaleTo: 0.96
  });
};

exports.modesView = function(parent) {
  var i, item, j, len, mode02, mode03, mode04, mode05, mode06, mode07, mode08, modesView, ref;
  modesView = new ScrollComponent({
    parent: parent,
    width: 375,
    height: 180,
    scrollVertical: false,
    scrollHorizontal: true,
    directionLock: true
  });
  mode02 = new Button({
    width: 160.0,
    height: 160.0,
    image: "images/mode02.png",
    scaleTo: 0.94
  });
  mode03 = new Button({
    width: 160.0,
    height: 160.0,
    image: "images/mode03.png",
    scaleTo: 0.94
  });
  mode04 = new Button({
    width: 160.0,
    height: 160.0,
    image: "images/mode04.png",
    scaleTo: 0.94
  });
  mode05 = new Button({
    width: 160.0,
    height: 160.0,
    image: "images/mode05.png",
    scaleTo: 0.94
  });
  mode06 = new Button({
    width: 160.0,
    height: 160.0,
    image: "images/mode06.png",
    scaleTo: 0.94
  });
  mode07 = new Button({
    width: 160.0,
    height: 160.0,
    image: "images/mode07.png",
    scaleTo: 0.94
  });
  mode08 = new Button({
    width: 160.0,
    height: 160.0,
    image: "images/mode08.png",
    scaleTo: 0.94
  });
  ref = [mode02, mode03, mode04, mode05, mode06, mode07, mode08];
  for (i = j = 0, len = ref.length; j < len; i = ++j) {
    item = ref[i];
    item.parent = modesView.content;
    item.width = 140;
    item.height = 140;
    item.x = 16 + (140 + 4) * i;
    item.y = 20;
  }
  return modesView;
};

exports.toysBackground = function() {
  return new Layer({
    width: 375.0,
    height: 812.0,
    image: "images/create_toy_view.png"
  });
};

exports.toysCreateButton = function(parent, handler) {
  return new Button({
    parent: parent,
    width: 176.0,
    height: 44.0,
    image: "images/button_create_toy.png",
    x: Align.right(-16),
    y: Align.bottom(-40),
    handler: handler
  });
};


},{"Buttons":"Buttons"}],"CV_PublishView":[function(require,module,exports){
var Button;

Button = require("Buttons").Button;

exports.background = function() {
  return new Layer({
    width: 375.0,
    height: 812.0,
    image: "images/input_background.png"
  });
};

exports.topView = function(parent) {
  return new Layer({
    parent: parent,
    width: 375,
    height: 64,
    backgroundColor: null,
    y: Align.top(44)
  });
};

exports.buttonTag = function(parent, handler) {
  return new Button({
    parent: parent,
    width: 44.0,
    height: 44.0,
    image: "images/button_tag.png",
    x: Align.right(-16),
    y: Align.center,
    handler: handler
  });
};

exports.buttonMusic = function(parent, handler) {
  return new Button({
    parent: parent,
    width: 44.0,
    height: 44.0,
    image: "images/button_music.png",
    x: Align.right(-68),
    y: Align.center,
    handler: handler
  });
};

exports.buttonText = function(parent, handler) {
  return new Button({
    parent: parent,
    width: 44.0,
    height: 44.0,
    image: "images/button_text.png",
    x: Align.right(-120),
    y: Align.center,
    handler: handler
  });
};

exports.imageView = function(parent) {
  var i, imageDone, imageProgress, imageView, j, len, len1, ref, ref1, stateName;
  imageView = new Layer({
    parent: parent,
    size: 375,
    y: Align.top(176)
  });
  imageView.states = {
    "shown": {
      opacity: 1
    },
    "hidden": {
      opacity: 1
    }
  };
  imageView.stateSwitch("hidden");
  imageView.on(Events.StateSwitchEnd, function(from, to) {
    if (to !== from) {
      if (to === "shown") {
        return this.children[1].opacity = 1;
      } else if (to === "hidden") {
        return this.children[1].opacity = 0;
      }
    }
  });
  imageProgress = new Layer({
    parent: imageView,
    width: 375.0,
    height: 375.0,
    image: "images/progress_1.png"
  });
  imageProgress.states = {
    "text1": {
      image: "images/progress_1.png"
    },
    "text2": {
      image: "images/progress_2.png"
    },
    "image1": {
      image: "images/progress_3.png"
    },
    "image2": {
      image: "images/progress_3.png"
    },
    "toys1": {
      image: "images/progress_toys.png"
    }
  };
  imageProgress.stateSwitch("text1");
  ref = imageProgress.stateNames;
  for (i = 0, len = ref.length; i < len; i++) {
    stateName = ref[i];
    if (stateName !== "default") {
      Framer.Extras.Preloader.addImage(imageProgress[stateName]);
    }
  }
  imageDone = new Layer({
    parent: imageView,
    width: 375.0,
    height: 375.0,
    image: "images/result_1.png",
    opacity: 0
  });
  imageDone.states = {
    "text1": {
      image: "images/result_1.png"
    },
    "text2": {
      image: "images/result_2.png"
    },
    "image1": {
      image: "images/result_3.png"
    },
    "image2": {
      image: "images/result_3.png"
    },
    "toys1": {
      image: "images/result_toys.png"
    }
  };
  imageDone.stateSwitch("text1");
  ref1 = imageProgress.stateNames;
  for (j = 0, len1 = ref1.length; j < len1; j++) {
    stateName = ref1[j];
    if (stateName !== "default") {
      Framer.Extras.Preloader.addImage(imageDone[stateName]);
    }
  }
  return imageView;
};

exports.timeView = function(parent) {
  var timeView;
  timeView = new Layer({
    parent: parent,
    width: 375.0,
    height: 228.0,
    image: "images/timeleft_image.png",
    y: Align.bottom(-32)
  });
  timeView.states = {
    "shown": {
      opacity: 1
    },
    "hidden": {
      opacity: 0
    }
  };
  timeView.stateSwitch("shown");
  return timeView;
};

exports.bottomView = function(parent) {
  var bottomView;
  bottomView = new Layer({
    parent: parent,
    width: 375,
    height: 64,
    backgroundColor: null,
    y: Align.bottom(-32)
  });
  bottomView.states = {
    "shown": {
      opacity: 1
    },
    "hidden": {
      opacity: 0
    }
  };
  bottomView.stateSwitch("hidden");
  return bottomView;
};

exports.buttonReroll = function(parent, handler) {
  return new Button({
    parent: parent,
    width: 44.0,
    height: 44.0,
    image: "images/button_reroll.png",
    x: Align.left(16),
    y: Align.center,
    handler: handler
  });
};

exports.buttonSave = function(parent, handler) {
  return new Button({
    parent: parent,
    width: 44.0,
    height: 44.0,
    image: "images/button_save.png",
    x: Align.left(68),
    y: Align.center,
    handler: handler
  });
};

exports.buttonPublish = function(parent, handler) {
  return new Button({
    parent: parent,
    width: 153.0,
    height: 44.0,
    image: "images/button_publish.png",
    x: Align.right(-16),
    y: Align.center,
    handler: handler
  });
};


},{"Buttons":"Buttons"}],"CameraLayer":[function(require,module,exports){
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.CameraLayer = (function(superClass) {
  extend(CameraLayer, superClass);

  function CameraLayer(options) {
    var baseOptions, customProps, ref, ref1, ref2, ref3, ref4;
    if (options == null) {
      options = {};
    }
    customProps = {
      facing: true,
      flipped: true,
      autoFlip: true,
      resolution: true,
      fit: true
    };
    baseOptions = Object.keys(options).filter(function(key) {
      return !customProps[key];
    }).reduce(function(clone, key) {
      clone[key] = options[key];
      return clone;
    }, {
      backgroundColor: 'transparent'
    });
    CameraLayer.__super__.constructor.call(this, baseOptions);
    this._facing = (ref = options.facing) != null ? ref : 'back';
    this._flipped = (ref1 = options.flipped) != null ? ref1 : false;
    this._autoFlip = (ref2 = options.autoFlip) != null ? ref2 : true;
    this._resolution = (ref3 = options.resolution) != null ? ref3 : 720;
    this._started = false;
    this._stream = null;
    this._scheduledRestart = null;
    this._recording = null;
    this.clip = true;
    this.player.autoplay = true;
    this.player.muted = true;
    this.player.playsinline = true;
    this.player.style.objectFit = (ref4 = options.fit) != null ? ref4 : 'cover';
  }

  CameraLayer.define('facing', {
    get: function() {
      return this._facing;
    },
    set: function(facing) {
      this._facing = facing === 'front' ? 'front' : 'back';
      return this._setRestart();
    }
  });

  CameraLayer.define('flipped', {
    get: function() {
      return this._flipped;
    },
    set: function(flipped) {
      this._flipped = flipped;
      return this._setRestart();
    }
  });

  CameraLayer.define('autoFlip', {
    get: function() {
      return this._autoFlip;
    },
    set: function(autoFlip) {
      this._autoFlip = autoFlip;
      return this._setRestart();
    }
  });

  CameraLayer.define('resolution', {
    get: function() {
      return this._resolution;
    },
    set: function(resolution) {
      this._resolution = resolution;
      return this._setRestart();
    }
  });

  CameraLayer.define('fit', {
    get: function() {
      return this.player.style.objectFit;
    },
    set: function(fit) {
      return this.player.style.objectFit = fit;
    }
  });

  CameraLayer.define('isRecording', {
    get: function() {
      var ref;
      return ((ref = this._recording) != null ? ref.recorder.state : void 0) === 'recording';
    }
  });

  CameraLayer.prototype.toggleFacing = function() {
    this._facing = this._facing === 'front' ? 'back' : 'front';
    return this._setRestart();
  };

  CameraLayer.prototype.capture = function(width, height, ratio) {
    var canvas, context, url;
    if (width == null) {
      width = this.width;
    }
    if (height == null) {
      height = this.height;
    }
    if (ratio == null) {
      ratio = window.devicePixelRatio;
    }
    canvas = document.createElement("canvas");
    canvas.width = ratio * width;
    canvas.height = ratio * height;
    context = canvas.getContext("2d");
    this.draw(context);
    url = canvas.toDataURL();
    this.emit('capture', url);
    return url;
  };

  CameraLayer.prototype.draw = function(context) {
    var clipBox, cover, layerBox, ref, videoBox, videoHeight, videoWidth, x, y;
    if (!context) {
      return;
    }
    cover = function(srcW, srcH, dstW, dstH) {
      var scale, scaleX, scaleY;
      scaleX = dstW / srcW;
      scaleY = dstH / srcH;
      scale = scaleX > scaleY ? scaleX : scaleY;
      return {
        width: srcW * scale,
        height: srcH * scale
      };
    };
    ref = this.player, videoWidth = ref.videoWidth, videoHeight = ref.videoHeight;
    clipBox = {
      width: context.canvas.width,
      height: context.canvas.height
    };
    layerBox = cover(this.width, this.height, clipBox.width, clipBox.height);
    videoBox = cover(videoWidth, videoHeight, layerBox.width, layerBox.height);
    x = (clipBox.width - videoBox.width) / 2;
    y = (clipBox.height - videoBox.height) / 2;
    return context.drawImage(this.player, x, y, videoBox.width, videoBox.height);
  };

  CameraLayer.prototype.start = function() {
    var constraints;
    constraints = {
      video: {
        facingMode: {
          ideal: this._facing === 'front' ? 'user' : 'environment'
        }
      },
      audio: true
    };
    return this._getUserMedia(constraints).then((function(_this) {
      return function(stream) {
        _this.player.srcObject = stream;
        _this._started = true;
        _this._stream = stream;
        return _this._flip();
      };
    })(this))["catch"](function(error) {
      return console.error(error);
    });
  };

  CameraLayer.prototype.stop = function() {
    var ref;
    this._started = false;
    this.player.pause();
    this.player.srcObject = null;
    if ((ref = this._stream) != null) {
      ref.getTracks().forEach(function(track) {
        return track.stop();
      });
    }
    this._stream = null;
    if (this._scheduledRestart) {
      cancelAnimationFrame(this._scheduledRestart);
      return this._scheduledRestart = null;
    }
  };

  CameraLayer.prototype.startRecording = function() {
    var chunks, recorder;
    if (this._recording) {
      this._recording.recorder.stop();
      this._recording = null;
    }
    chunks = [];
    recorder = new MediaRecorder(this._stream, {
      mimeType: 'video/webm'
    });
    recorder.addEventListener('start', (function(_this) {
      return function(event) {
        return _this.emit('startrecording');
      };
    })(this));
    recorder.addEventListener('dataavailable', function(event) {
      return chunks.push(event.data);
    });
    recorder.addEventListener('stop', (function(_this) {
      return function(event) {
        var blob, url;
        blob = new Blob(chunks);
        url = window.URL.createObjectURL(blob);
        _this.emit('stoprecording');
        return _this.emit('record', url);
      };
    })(this));
    recorder.start();
    return this._recording = {
      recorder: recorder,
      chunks: chunks
    };
  };

  CameraLayer.prototype.stopRecording = function() {
    if (!this._recording) {
      return;
    }
    this._recording.recorder.stop();
    return this._recording = null;
  };

  CameraLayer.prototype.onCapture = function(callback) {
    return this.on('capture', callback);
  };

  CameraLayer.prototype.onStartRecording = function(callback) {
    return this.on('startrecording', callback);
  };

  CameraLayer.prototype.onStopRecording = function(callback) {
    return this.on('stoprecording', callback);
  };

  CameraLayer.prototype.onRecord = function(callback) {
    return this.on('record', callback);
  };

  CameraLayer.prototype._setRestart = function() {
    if (!this._started || this._scheduledRestart) {
      return;
    }
    return this._scheduledRestart = requestAnimationFrame((function(_this) {
      return function() {
        _this._scheduledRestart = null;
        return _this.start();
      };
    })(this));
  };

  CameraLayer.prototype._flip = function() {
    var x;
    if (this._autoFlip) {
      this._flipped = this._facing === 'user';
    }
    x = this._flipped ? -1 : 1;
    return this.player.style.webkitTransform = "scale(" + x + ", 1)";
  };

  CameraLayer.prototype._enumerateDevices = function() {
    try {
      return navigator.mediaDevices.enumerateDevices();
    } catch (error1) {
      return Promise.reject();
    }
  };

  CameraLayer.prototype._getUserMedia = function(constraints) {
    try {
      return navigator.mediaDevices.getUserMedia(constraints);
    } catch (error1) {
      return Promise.reject();
    }
  };

  return CameraLayer;

})(VideoLayer);


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


},{"Buttons":"Buttons"}],"PhoneTypeView":[function(require,module,exports){
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


},{"LocationView":"LocationView"}],"ShoppingData":[function(require,module,exports){
var Button, ButtonOmnibox, ButtonVideo, ref, shopItemLeft01, shopItemLeft02, shopItemLeft03, shopItemLeft04, shopItemRight01, shopItemRight02, shopItemRight03;

ref = require("Buttons"), Button = ref.Button, ButtonOmnibox = ref.ButtonOmnibox, ButtonVideo = ref.ButtonVideo;

shopItemLeft01 = new ButtonOmnibox({
  width: 177.0,
  height: 342.66666666666663,
  image: "images/shopItem_left01.png"
});

shopItemLeft02 = new ButtonOmnibox({
  width: 176.33333333333331,
  height: 226.0,
  image: "images/shopItem_left02.png"
});

shopItemLeft03 = new ButtonOmnibox({
  width: 176.33333333333331,
  height: 160.0,
  image: "images/shopItem_left03.png"
});

shopItemLeft04 = new ButtonOmnibox({
  width: 178.0,
  height: 258.0,
  image: "images/shopItem_left04.png"
});

shopItemRight01 = new ButtonOmnibox({
  width: 176.33333333333331,
  height: 256.0,
  image: "images/shopItem_right01.png"
});

shopItemRight02 = new ButtonOmnibox({
  width: 178.33333333333331,
  height: 261.0,
  image: "images/shopItem_right02.png"
});

shopItemRight03 = new ButtonOmnibox({
  width: 176.0,
  height: 279.0,
  image: "images/shopItem_right03.png"
});

exports.data = {
  left: [shopItemLeft01, shopItemLeft02, shopItemLeft03, shopItemLeft04],
  right: [shopItemRight01, shopItemRight02, shopItemRight03]
};


},{"Buttons":"Buttons"}],"Stack":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTEwLTE4IFtwcF0gU2hlZGV2cnVtIOKAlCBOZXcgTW9kZXMuZnJhbWVyL21vZHVsZXMvQnV0dG9ucy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTEwLTE4IFtwcF0gU2hlZGV2cnVtIOKAlCBOZXcgTW9kZXMuZnJhbWVyL21vZHVsZXMvQ1ZfSW5wdXRWaWV3LmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMTAtMTggW3BwXSBTaGVkZXZydW0g4oCUIE5ldyBNb2Rlcy5mcmFtZXIvbW9kdWxlcy9DVl9Nb2RhbFZpZXcuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0xMC0xOCBbcHBdIFNoZWRldnJ1bSDigJQgTmV3IE1vZGVzLmZyYW1lci9tb2R1bGVzL0NWX1B1Ymxpc2hWaWV3LmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMTAtMTggW3BwXSBTaGVkZXZydW0g4oCUIE5ldyBNb2Rlcy5mcmFtZXIvbW9kdWxlcy9DYW1lcmFMYXllci5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTEwLTE4IFtwcF0gU2hlZGV2cnVtIOKAlCBOZXcgTW9kZXMuZnJhbWVyL21vZHVsZXMvRGV2aWNlVmlldy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTEwLTE4IFtwcF0gU2hlZGV2cnVtIOKAlCBOZXcgTW9kZXMuZnJhbWVyL21vZHVsZXMvRGV2aWNlX0NsYXNzLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMTAtMTggW3BwXSBTaGVkZXZydW0g4oCUIE5ldyBNb2Rlcy5mcmFtZXIvbW9kdWxlcy9EZXZpY2VfSW5pdC5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTEwLTE4IFtwcF0gU2hlZGV2cnVtIOKAlCBOZXcgTW9kZXMuZnJhbWVyL21vZHVsZXMvSG9tZUJhcl9DbGFzcy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTEwLTE4IFtwcF0gU2hlZGV2cnVtIOKAlCBOZXcgTW9kZXMuZnJhbWVyL21vZHVsZXMvSW5pdFZpZXcuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0xMC0xOCBbcHBdIFNoZWRldnJ1bSDigJQgTmV3IE1vZGVzLmZyYW1lci9tb2R1bGVzL0xvY2F0aW9uVmlldy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTEwLTE4IFtwcF0gU2hlZGV2cnVtIOKAlCBOZXcgTW9kZXMuZnJhbWVyL21vZHVsZXMvTG9nby5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTEwLTE4IFtwcF0gU2hlZGV2cnVtIOKAlCBOZXcgTW9kZXMuZnJhbWVyL21vZHVsZXMvTmF2aWdhdGlvbkNvbXBvbmVudC5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTEwLTE4IFtwcF0gU2hlZGV2cnVtIOKAlCBOZXcgTW9kZXMuZnJhbWVyL21vZHVsZXMvUGhvbmVUeXBlVmlldy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTEwLTE4IFtwcF0gU2hlZGV2cnVtIOKAlCBOZXcgTW9kZXMuZnJhbWVyL21vZHVsZXMvUHJldmlld0NvbXBvbmVudC5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTEwLTE4IFtwcF0gU2hlZGV2cnVtIOKAlCBOZXcgTW9kZXMuZnJhbWVyL21vZHVsZXMvUHJldmlld19Bc3NldHMuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0xMC0xOCBbcHBdIFNoZWRldnJ1bSDigJQgTmV3IE1vZGVzLmZyYW1lci9tb2R1bGVzL1ByZXZpZXdfQ2xhc3MuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0xMC0xOCBbcHBdIFNoZWRldnJ1bSDigJQgTmV3IE1vZGVzLmZyYW1lci9tb2R1bGVzL1ByZXZpZXdfSW5pdC5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTEwLTE4IFtwcF0gU2hlZGV2cnVtIOKAlCBOZXcgTW9kZXMuZnJhbWVyL21vZHVsZXMvUHJldmlld19Mb2dvTGF5ZXIuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0xMC0xOCBbcHBdIFNoZWRldnJ1bSDigJQgTmV3IE1vZGVzLmZyYW1lci9tb2R1bGVzL1ByZXZpZXdfVUkuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0xMC0xOCBbcHBdIFNoZWRldnJ1bSDigJQgTmV3IE1vZGVzLmZyYW1lci9tb2R1bGVzL1NjYWxlVmlldy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTEwLTE4IFtwcF0gU2hlZGV2cnVtIOKAlCBOZXcgTW9kZXMuZnJhbWVyL21vZHVsZXMvU2VjdGlvblZpZXcuY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0xMC0xOCBbcHBdIFNoZWRldnJ1bSDigJQgTmV3IE1vZGVzLmZyYW1lci9tb2R1bGVzL1Nob3BwaW5nRGF0YS5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTEwLTE4IFtwcF0gU2hlZGV2cnVtIOKAlCBOZXcgTW9kZXMuZnJhbWVyL21vZHVsZXMvU3RhY2suY29mZmVlIiwiLi4vLi4vUHJvdG90eXBpbmctUXVldWUvMjAyMy0xMC0xOCBbcHBdIFNoZWRldnJ1bSDigJQgTmV3IE1vZGVzLmZyYW1lci9tb2R1bGVzL1N0YXR1c0Jhcl9DbGFzcy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTEwLTE4IFtwcF0gU2hlZGV2cnVtIOKAlCBOZXcgTW9kZXMuZnJhbWVyL21vZHVsZXMvVHJlZUxheWVyVmlldy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTEwLTE4IFtwcF0gU2hlZGV2cnVtIOKAlCBOZXcgTW9kZXMuZnJhbWVyL21vZHVsZXMvVUlfQnV0dG9ucy5jb2ZmZWUiLCIuLi8uLi9Qcm90b3R5cGluZy1RdWV1ZS8yMDIzLTEwLTE4IFtwcF0gU2hlZGV2cnVtIOKAlCBOZXcgTW9kZXMuZnJhbWVyL21vZHVsZXMvVUlfQ29uZmlnLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMTAtMTggW3BwXSBTaGVkZXZydW0g4oCUIE5ldyBNb2Rlcy5mcmFtZXIvbW9kdWxlcy9VSV9TZWN0aW9uLmNvZmZlZSIsIi4uLy4uL1Byb3RvdHlwaW5nLVF1ZXVlLzIwMjMtMTAtMTggW3BwXSBTaGVkZXZydW0g4oCUIE5ldyBNb2Rlcy5mcmFtZXIvbW9kdWxlcy9VSV9UcmVlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0VBLElBQUE7Ozs7QUFBTSxPQUFPLENBQUM7OztFQUNBLGdCQUFDLE9BQUQ7QUFFWixRQUFBO0lBRmEsSUFBQyxDQUFBLDRCQUFELFVBQVM7OztJQUV0QixLQUFBLEdBQVEsSUFBSSxLQUFKLENBQVU7TUFBRSxJQUFBLEVBQU0sRUFBUjtNQUFZLGVBQUEsRUFBaUIsTUFBN0I7S0FBVjtJQUVSLEtBQUssQ0FBQyxNQUFOLEdBQ0M7TUFBQSxTQUFBLEVBQVc7UUFBRSxPQUFBLEVBQVMsQ0FBWDtPQUFYO01BQ0EsUUFBQSxFQUFVO1FBQUUsT0FBQSxFQUFTLENBQVg7T0FEVjs7SUFHRCxLQUFLLENBQUMsRUFBTixDQUFTLE1BQU0sQ0FBQyxjQUFoQixFQUFnQyxTQUFDLElBQUQsRUFBTyxFQUFQO01BQy9CLElBQUcsSUFBQSxLQUFRLEVBQVg7ZUFBbUIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxPQUFSLENBQWdCLEVBQWhCLEVBQW5COztJQUQrQixDQUFoQztJQUdBLENBQUMsQ0FBQyxRQUFGLENBQVcsSUFBQyxDQUFBLE9BQVosRUFDQztNQUFBLE9BQUEsRUFBUyxJQUFUO01BQ0EsS0FB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YUFDbkIsS0FBQSxDQUFTLElBQUMsQ0FBQSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQWYsR0FBb0IsTUFBcEIsR0FBMEIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBeEMsR0FBMEMsTUFBMUMsR0FBZ0QsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBOUQsR0FBZ0UsU0FBaEUsR0FBeUUsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBdkYsR0FBNkYsR0FBN0YsR0FBZ0csSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBdEg7SUFEbUIsQ0FBcEI7SUFJQSxJQUFDLENBQUEsUUFBUSxDQUFDLE1BQVYsSUFBb0I7SUFHcEIsSUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQWQsR0FBdUIsQ0FBMUI7TUFDQyxTQUFBLEdBQVksS0FBQSxHQUFRO0FBQ3BCO0FBQUE7V0FBQSxxQ0FBQTs7cUJBQ0MsSUFBQyxDQUFBLFNBQUQsQ0FBVyxTQUFYLEVBQXNCLFNBQXRCO0FBREQ7cUJBRkQ7O0VBM0JVOzs7O0dBekN3QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlxuXG5jbGFzcyBleHBvcnRzLkJ1dHRvbiBleHRlbmRzIExheWVyXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRndWFyZCA9IG5ldyBMYXllciB7IHNpemU6IDEwLCBiYWNrZ3JvdW5kQ29sb3I6IFwibnVsbFwiIH1cblx0XHRcblx0XHRndWFyZC5zdGF0ZXMgPVxuXHRcdFx0XCJwcmVzc2VkXCI6IHsgb3BhY2l0eTogMCB9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IG9wYWNpdHk6IDAgfVxuXHRcdFxuXHRcdGd1YXJkLm9uIEV2ZW50cy5TdGF0ZVN3aXRjaEVuZCwgKGZyb20sIHRvKSAtPlxuXHRcdFx0aWYgZnJvbSAhPSB0byB0aGVuIEBwYXJlbnQuYW5pbWF0ZSh0bylcblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cdFx0XHRndWFyZDogbnVsbFxuXHRcdFx0c2NhbGVUbzogMC45XG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0QHN0YXRlcyA9XG5cdFx0XHRcInByZXNzZWRcIjogeyBzY2FsZTogQHNjYWxlVG8gfVxuXHRcdFx0XCJub3JtYWxcIjogeyBzY2FsZTogMS4wIH1cblx0XHRcblx0XHRndWFyZC5wYXJlbnQgPSBAXG5cdFx0QGd1YXJkID0gZ3VhcmRcblx0XHRcblx0XHRALm9uVG91Y2hTdGFydCBASG92ZXJcblx0XHRALm9uVG91Y2hFbmQgQEhvdmVyT2ZmXG5cdFx0QC5vblN3aXBlU3RhcnQgQEhvdmVyT2ZmXG5cdFx0QC5vbkRyYWdTdGFydCBASG92ZXJPZmZcblx0XG5cdEhvdmVyOiA9PiBAZ3VhcmQuc3RhdGVTd2l0Y2goXCJwcmVzc2VkXCIpXG5cdEhvdmVyT2ZmOiA9PiBAZ3VhcmQuc3RhdGVTd2l0Y2goXCJub3JtYWxcIilcblxuXG5cblx0QGRlZmluZSAnZ3VhcmQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZ3VhcmRcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuZ3VhcmQgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnc2NhbGVUbycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zY2FsZVRvXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNjYWxlVG8gPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnaGFuZGxlcicsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvbihFdmVudHMuVGFwLCB2YWx1ZSlcblxuIiwiXG57IEJ1dHRvbiB9ID0gcmVxdWlyZSBcIkJ1dHRvbnNcIlxuXG5leHBvcnRzLmJhY2tncm91bmQgPSAoKSAtPlxuXHRyZXR1cm4gbmV3IExheWVyXG5cdFx0d2lkdGg6IDM3NS4wXG5cdFx0aGVpZ2h0OiA4MTIuMFxuXHRcdGltYWdlOiBcImltYWdlcy9pbnB1dF9iYWNrZ3JvdW5kLnBuZ1wiXG5cblxuXG5cbmV4cG9ydHMudG9wVmlldyA9IChwYXJlbnQpIC0+XG5cdHJldHVybiBuZXcgTGF5ZXJcblx0XHRwYXJlbnQ6IHBhcmVudFxuXHRcdHdpZHRoOiAzNzVcblx0XHRoZWlnaHQ6IDU2XG5cdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0eTogQWxpZ24udG9wKDQ0KVxuXG5leHBvcnRzLmJ1dHRvbkRlbGV0ZSA9IChwYXJlbnQsIGhhbmRsZXIpIC0+XG5cdHJldHVybiBuZXcgQnV0dG9uXG5cdFx0cGFyZW50OiBwYXJlbnRcblx0XHR3aWR0aDogNDQuMCwgaGVpZ2h0OiA0NC4wLCBpbWFnZTogXCJpbWFnZXMvYnV0dG9uX2NsZWFyLnBuZ1wiXG5cdFx0eDogQWxpZ24ucmlnaHQoLTE2KSwgeTogQWxpZ24uY2VudGVyXG5cdFx0aGFuZGxlcjogaGFuZGxlclxuXG5cblxuXG5leHBvcnRzLnByb21wdFZpZXcgPSAocGFyZW50LCBoYW5kbGVyKSAtPlxuXHRwcm9tcHRWaWV3ID0gbmV3IExheWVyXG5cdFx0cGFyZW50OiBwYXJlbnRcblx0XHR3aWR0aDogMzc1LjAsIGhlaWdodDogMTgwLjBcblx0XHR5OiAxMDBcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRjdXN0b206XG5cdFx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdFxuXHRwcm9tcHRWaWV3Lm9uVGFwIC0+XG5cdFx0QGN1c3RvbS5oYW5kbGVyKClcblx0XG5cdHByb21wdFZpZXcuc3RhdGVzID1cblx0XHRcIm51bGxcIjogeyBvcGFjaXR5OiAxIH1cblx0XHRcInR5cGVkXCI6IHsgb3BhY2l0eTogMSB9XG5cdFx0XCJ0b3BcIjogeyB5OiAxMDAgfVxuXHRcdFwiYm90dG9tXCI6IHsgeTogNDc1IH1cblx0cHJvbXB0Vmlldy5zdGF0ZVN3aXRjaChcIm51bGxcIilcblxuXHRwcm9tcHRWaWV3Lm9uIEV2ZW50cy5TdGF0ZVN3aXRjaEVuZCwgKGZyb20sIHRvKSAtPlxuXHRcdGlmIHRvICE9IGZyb21cblx0XHRcdGlmIHRvID09IFwidHlwZWRcIiB0aGVuIEBjaGlsZHJlblsxXS5vcGFjaXR5ID0gMVxuXHRcdFx0ZWxzZSBpZiB0byA9PSBcIm51bGxcIiB0aGVuIEBjaGlsZHJlblsxXS5vcGFjaXR5ID0gMFxuXG5cdHByb21wdE51bGwgPSBuZXcgTGF5ZXJcblx0XHRwYXJlbnQ6IHByb21wdFZpZXdcblx0XHR3aWR0aDogMzc1LjAsIGhlaWdodDogMTgwLjAsIGltYWdlOiBcImltYWdlcy9wcm9tcHROdWxsLnBuZ1wiXG5cblx0cHJvbXB0VHlwZWQgPSBuZXcgTGF5ZXJcblx0XHRwYXJlbnQ6IHByb21wdFZpZXdcblx0XHR3aWR0aDogMzc1LjAsIGhlaWdodDogMTgwLjAsIGltYWdlOiBcImltYWdlcy9wcm9tcHRUeXBlZC5wbmdcIlxuXHRcdG9wYWNpdHk6IDBcblx0XG5cdHJldHVybiBwcm9tcHRWaWV3XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5leHBvcnRzLmJvdHRvbVZpZXcgPSAocGFyZW50KSAtPlxuXHRyZXR1cm4gbmV3IExheWVyXG5cdFx0cGFyZW50OiBwYXJlbnRcblx0XHR3aWR0aDogMzc1XG5cdFx0aGVpZ2h0OiA2NFxuXHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdHk6IEFsaWduLmJvdHRvbSgtMzIpXG5cbmV4cG9ydHMuYnV0dG9uTWFnaWMgPSAocGFyZW50LCBoYW5kbGVyKSAtPlxuXHRyZXR1cm4gbmV3IEJ1dHRvblxuXHRcdHBhcmVudDogcGFyZW50XG5cdFx0d2lkdGg6IDQ0LjBcblx0XHRoZWlnaHQ6IDQ0LjBcblx0XHRpbWFnZTogXCJpbWFnZXMvYnV0dG9uX21hZ2ljLnBuZ1wiXG5cdFx0eDogQWxpZ24ubGVmdCgxNiksIHk6IEFsaWduLmNlbnRlclxuXHRcdGhhbmRsZXI6IGhhbmRsZXJcblxuZXhwb3J0cy5idXR0b25TZXR0aW5ncyA9IChwYXJlbnQsIGhhbmRsZXIpIC0+XG5cdHJldHVybiBuZXcgQnV0dG9uXG5cdFx0cGFyZW50OiBwYXJlbnRcblx0XHR3aWR0aDogNDQuMFxuXHRcdGhlaWdodDogNDQuMFxuXHRcdGltYWdlOiBcImltYWdlcy9idXR0b25fc2V0dGluZ3MucG5nXCJcblx0XHR4OiBBbGlnbi5sZWZ0KDY4KSwgeTogQWxpZ24uY2VudGVyXG5cdFx0aGFuZGxlcjogaGFuZGxlclxuXG5leHBvcnRzLmJ1dHRvbkNhbWVyYSA9IChwYXJlbnQsIGhhbmRsZXIpIC0+XG5cdHJldHVybiBuZXcgQnV0dG9uXG5cdFx0cGFyZW50OiBwYXJlbnRcblx0XHR3aWR0aDogNDQuMFxuXHRcdGhlaWdodDogNDQuMFxuXHRcdGltYWdlOiBcImltYWdlcy9idXR0b25fY2FtZXJhLnBuZ1wiXG5cdFx0eDogQWxpZ24ubGVmdCgxMjApLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cblxuZXhwb3J0cy5idXR0b25Db250aW51ZSA9IChwYXJlbnQsIGhhbmRsZXIpIC0+XG5cdHJldHVybiBuZXcgQnV0dG9uXG5cdFx0cGFyZW50OiBwYXJlbnRcblx0XHRzaXplOiA0NFxuXHRcdGltYWdlOiBcImltYWdlcy9idXR0b25fcmlnaHQucG5nXCJcblx0XHR4OiBBbGlnbi5yaWdodCgtMTI1KSwgeTogQWxpZ24uY2VudGVyXG5cdFx0aGFuZGxlcjogaGFuZGxlclxuXHRcdG9wYWNpdHk6IDBcblxuXG5leHBvcnRzLmJ1dHRvbk5leHQgPSAocGFyZW50LCBoYW5kbGVyKSAtPlxuXHRyZXR1cm4gbmV3IEJ1dHRvblxuXHRcdHBhcmVudDogcGFyZW50XG5cdFx0d2lkdGg6IDEwMS4wXG5cdFx0aGVpZ2h0OiA0NC4wXG5cdFx0aW1hZ2U6IFwiaW1hZ2VzL2J1dHRvbl9jcmVhdGUucG5nXCJcblx0XHR4OiBBbGlnbi5yaWdodCgtMTYpLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cblxuXG5cbmV4cG9ydHMuaW1hZ2VWaWV3ID0gKHBhcmVudCkgLT5cblx0aW1hZ2VWaWV3ID0gbmV3IExheWVyXG5cdFx0cGFyZW50OiBwYXJlbnRcblx0XHRzaXplOiAzNzVcblx0XHR5OiBBbGlnbi50b3AoMTAwKVxuXHRcdGltYWdlOiBcImltYWdlcy9pbWFnZV9jaG9vc2UucG5nXCJcblxuXHRcblx0aW1hZ2VWaWV3LnN0YXRlcyA9XG5cdFx0XCJzaG93blwiOiB7IG9wYWNpdHk6IDEgfVxuXHRcdFwiaGlkZGVuXCI6IHsgb3BhY2l0eTogMCB9XG5cdGltYWdlVmlldy5zdGF0ZVN3aXRjaChcImhpZGRlblwiKVxuXG5cdHJldHVybiBpbWFnZVZpZXdcblxuXG5leHBvcnRzLmNob29zZVZpZXcgPSAoKSAtPlxuXHRyZXR1cm4gbmV3IExheWVyXG5cdFx0d2lkdGg6IDM3NS4wLCBoZWlnaHQ6IDc0MC4wLCBpbWFnZTogXCJpbWFnZXMvcmVjZW50X3Bob3RvX2Jhc2ljLnBuZ1wiXG5cbmV4cG9ydHMuaW1hZ2VzID0gKHBhcmVudCwgaGFuZGxlcikgLT5cblx0cmV0dXJuIG5ldyBCdXR0b25cblx0XHRwYXJlbnQ6IHBhcmVudFxuXHRcdHdpZHRoOiAzNzUuMCwgaGVpZ2h0OiA2NjguMCwgaW1hZ2U6IFwiaW1hZ2VzL2Nob29zZV9pbWFnZXNfdGVtcC5wbmdcIlxuXHRcdHNjYWxlVG86IDFcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdFx0eTogNzJcblxuXG5leHBvcnRzLmNob29zZUJ1dHRvbkNsb3NlID0gKHBhcmVudCwgaGFuZGxlcikgLT5cblx0cmV0dXJuIG5ldyBCdXR0b25cblx0XHRwYXJlbnQ6IHBhcmVudFxuXHRcdHdpZHRoOiA0NC4wLCBoZWlnaHQ6IDQ0LjAsIGltYWdlOiBcImltYWdlcy9idXR0b25fY2xvc2UucG5nXCJcblx0XHR4OiBBbGlnbi5yaWdodCgtMTYpLCB5OiBBbGlnbi50b3AoMTYpXG5cdFx0aGFuZGxlcjogaGFuZGxlclxuXG5cblxuXG5cbmV4cG9ydHMuc2V0dGluZ3NWaWV3ID0gKCkgLT5cblx0cmV0dXJuIG5ldyBMYXllclxuXHRcdHdpZHRoOiAzNzUuMCwgaGVpZ2h0OiA3NDAuMCwgaW1hZ2U6IFwiaW1hZ2VzL3NldHRpbmdzX2Jhc2Vfdmlldy5wbmdcIlxuXG5leHBvcnRzLnNldHRpbmdzQnV0dG9uQ2xvc2UgPSAocGFyZW50LCBoYW5kbGVyKSAtPlxuXHRyZXR1cm4gbmV3IEJ1dHRvblxuXHRcdHBhcmVudDogcGFyZW50XG5cdFx0d2lkdGg6IDQ0LjAsIGhlaWdodDogNDQuMCwgaW1hZ2U6IFwiaW1hZ2VzL2J1dHRvbl9jbG9zZS5wbmdcIlxuXHRcdHg6IEFsaWduLnJpZ2h0KC0xNiksIHk6IEFsaWduLnRvcCgxNilcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG4iLCJcbnsgQnV0dG9uIH0gPSByZXF1aXJlIFwiQnV0dG9uc1wiXG5cbmV4cG9ydHMuYmFja2dyb3VuZCA9ICgpIC0+XG5cdHJldHVybiBuZXcgTGF5ZXJcblx0XHR3aWR0aDogMzc1LjBcblx0XHRoZWlnaHQ6IDM4MC4wXG5cdFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblxuXG5leHBvcnRzLmNoYW5nZUJ1dHRvbiA9IChwYXJlbnQsIGhhbmRsZXIpIC0+XG5cdHJldHVybiBuZXcgQnV0dG9uXG5cdFx0cGFyZW50OiBwYXJlbnRcblx0XHR3aWR0aDogMzc1LjAsIGhlaWdodDogODYuMCwgaW1hZ2U6IFwiaW1hZ2VzL2JpZ19idXR0b25fY2hhbmdlLnBuZ1wiXG5cdFx0eTogQWxpZ24uYm90dG9tKC0zMi04Nilcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdFx0c2NhbGVUbzogMC45NlxuXG5leHBvcnRzLmNyZWF0ZUJ1dHRvbiA9IChwYXJlbnQsIGhhbmRsZXIpIC0+XG5cdHJldHVybiBuZXcgQnV0dG9uXG5cdFx0cGFyZW50OiBwYXJlbnRcblx0XHR3aWR0aDogMzc1LjAsIGhlaWdodDogODYuMCwgaW1hZ2U6IFwiaW1hZ2VzL2JpZ19idXR0b25fY3JlYXRlLnBuZ1wiXG5cdFx0eTogQWxpZ24uYm90dG9tKC0zMilcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdFx0c2NhbGVUbzogMC45NlxuXG5cbmV4cG9ydHMubW9kZXNWaWV3ID0gKHBhcmVudCkgLT5cblxuXHRtb2Rlc1ZpZXcgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0cGFyZW50OiBwYXJlbnRcblx0XHR3aWR0aDogMzc1XG5cdFx0aGVpZ2h0OiAxODBcblx0XHRzY3JvbGxWZXJ0aWNhbDogZmFsc2Vcblx0XHRzY3JvbGxIb3Jpem9udGFsOiB0cnVlXG5cdFx0ZGlyZWN0aW9uTG9jazogdHJ1ZVxuXHRcblxuXHQjIG1vZGUwMSA9IG5ldyBCdXR0b25cblx0IyBcdHdpZHRoOiAxNjAuMCwgaGVpZ2h0OiAxNjAuMCwgaW1hZ2U6IFwiaW1hZ2VzL21vZGUwMS5wbmdcIlxuXHQjIFx0c2NhbGVUbzogMC45NFxuXG5cdG1vZGUwMiA9IG5ldyBCdXR0b25cblx0XHR3aWR0aDogMTYwLjAsIGhlaWdodDogMTYwLjAsIGltYWdlOiBcImltYWdlcy9tb2RlMDIucG5nXCJcblx0XHRzY2FsZVRvOiAwLjk0XG5cblx0bW9kZTAzID0gbmV3IEJ1dHRvblxuXHRcdHdpZHRoOiAxNjAuMCwgaGVpZ2h0OiAxNjAuMCwgaW1hZ2U6IFwiaW1hZ2VzL21vZGUwMy5wbmdcIlxuXHRcdHNjYWxlVG86IDAuOTRcblxuXHRtb2RlMDQgPSBuZXcgQnV0dG9uXG5cdFx0d2lkdGg6IDE2MC4wLCBoZWlnaHQ6IDE2MC4wLCBpbWFnZTogXCJpbWFnZXMvbW9kZTA0LnBuZ1wiXG5cdFx0c2NhbGVUbzogMC45NFxuXG5cdG1vZGUwNSA9IG5ldyBCdXR0b25cblx0XHR3aWR0aDogMTYwLjAsIGhlaWdodDogMTYwLjAsIGltYWdlOiBcImltYWdlcy9tb2RlMDUucG5nXCJcblx0XHRzY2FsZVRvOiAwLjk0XG5cblx0bW9kZTA2ID0gbmV3IEJ1dHRvblxuXHRcdHdpZHRoOiAxNjAuMCwgaGVpZ2h0OiAxNjAuMCwgaW1hZ2U6IFwiaW1hZ2VzL21vZGUwNi5wbmdcIlxuXHRcdHNjYWxlVG86IDAuOTRcblxuXHRtb2RlMDcgPSBuZXcgQnV0dG9uXG5cdFx0d2lkdGg6IDE2MC4wLCBoZWlnaHQ6IDE2MC4wLCBpbWFnZTogXCJpbWFnZXMvbW9kZTA3LnBuZ1wiXG5cdFx0c2NhbGVUbzogMC45NFxuXG5cdG1vZGUwOCA9IG5ldyBCdXR0b25cblx0XHR3aWR0aDogMTYwLjAsIGhlaWdodDogMTYwLjAsIGltYWdlOiBcImltYWdlcy9tb2RlMDgucG5nXCJcblx0XHRzY2FsZVRvOiAwLjk0XG5cdFxuXHRmb3IgaXRlbSwgaSBpbiBbbW9kZTAyLCBtb2RlMDMsIG1vZGUwNCwgbW9kZTA1LCBtb2RlMDYsIG1vZGUwNywgbW9kZTA4XVxuXHRcdGl0ZW0ucGFyZW50ID0gbW9kZXNWaWV3LmNvbnRlbnRcblx0XHRpdGVtLndpZHRoID0gMTQwXG5cdFx0aXRlbS5oZWlnaHQgPSAxNDBcblx0XHRpdGVtLnggPSAxNiArICgxNDAgKyA0KSAqIGlcblx0XHRpdGVtLnkgPSAyMFxuXHRcblx0cmV0dXJuIG1vZGVzVmlld1xuXG5cblxuZXhwb3J0cy50b3lzQmFja2dyb3VuZCA9ICgpIC0+XG5cdHJldHVybiBuZXcgTGF5ZXJcblx0XHR3aWR0aDogMzc1LjAsIGhlaWdodDogODEyLjAsIGltYWdlOiBcImltYWdlcy9jcmVhdGVfdG95X3ZpZXcucG5nXCJcblxuIyBleHBvcnRzLnRveXNJbnB1dCA9IChwYXJlbnQsIGhhbmRsZXIpIC0+XG4jIFx0cmV0dXJuIG5ldyBCdXR0b25cbiMgXHRcdHBhcmVudDogcGFyZW50XG4jIFx0XHR3aWR0aDogMzc1LjAsIGhlaWdodDogMTgwLjAsIGltYWdlOiBcImltYWdlcy90b3lzX2lucHV0LnBuZ1wiXG4jIFx0XHRzY2FsZVRvOiAxXG4jIFx0XHR5OiAxMDBcbiMgXHRcdGhhbmRsZXI6IGhhbmRsZXJcblxuIyBleHBvcnRzLnRveXNDbG9zZUJ1dHRvbiA9IChwYXJlbnQsIGhhbmRsZXIpIC0+XG4jIFx0cmV0dXJuIG5ldyBCdXR0b25cbiMgXHRcdHBhcmVudDogcGFyZW50XG4jIFx0XHR3aWR0aDogNDQuMCwgaGVpZ2h0OiA0NC4wLCBpbWFnZTogXCJpbWFnZXMvYnV0dG9uX2Nsb3NlLnBuZ1wiXG4jIFx0XHR4OiBBbGlnbi5yaWdodCgtMTYpLCB5OiBBbGlnbi50b3AoMTYpXG4jIFx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cbmV4cG9ydHMudG95c0NyZWF0ZUJ1dHRvbiA9IChwYXJlbnQsIGhhbmRsZXIpIC0+XG5cdHJldHVybiBuZXcgQnV0dG9uXG5cdFx0cGFyZW50OiBwYXJlbnRcblx0XHR3aWR0aDogMTc2LjAsIGhlaWdodDogNDQuMCwgaW1hZ2U6IFwiaW1hZ2VzL2J1dHRvbl9jcmVhdGVfdG95LnBuZ1wiXG5cdFx0eDogQWxpZ24ucmlnaHQoLTE2KSwgeTogQWxpZ24uYm90dG9tKC00MClcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG4iLCJcbnsgQnV0dG9uIH0gPSByZXF1aXJlIFwiQnV0dG9uc1wiXG5cbmV4cG9ydHMuYmFja2dyb3VuZCA9ICgpIC0+XG5cdHJldHVybiBuZXcgTGF5ZXJcblx0XHR3aWR0aDogMzc1LjBcblx0XHRoZWlnaHQ6IDgxMi4wXG5cdFx0aW1hZ2U6IFwiaW1hZ2VzL2lucHV0X2JhY2tncm91bmQucG5nXCJcblxuXG5cbmV4cG9ydHMudG9wVmlldyA9IChwYXJlbnQpIC0+XG5cdHJldHVybiBuZXcgTGF5ZXJcblx0XHRwYXJlbnQ6IHBhcmVudFxuXHRcdHdpZHRoOiAzNzVcblx0XHRoZWlnaHQ6IDY0XG5cdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0eTogQWxpZ24udG9wKDQ0KVxuXG5leHBvcnRzLmJ1dHRvblRhZyA9IChwYXJlbnQsIGhhbmRsZXIpIC0+XG5cdHJldHVybiBuZXcgQnV0dG9uXG5cdFx0cGFyZW50OiBwYXJlbnRcblx0XHR3aWR0aDogNDQuMCwgaGVpZ2h0OiA0NC4wLCBpbWFnZTogXCJpbWFnZXMvYnV0dG9uX3RhZy5wbmdcIlxuXHRcdHg6IEFsaWduLnJpZ2h0KC0xNiksIHk6IEFsaWduLmNlbnRlclxuXHRcdGhhbmRsZXI6IGhhbmRsZXJcblxuZXhwb3J0cy5idXR0b25NdXNpYyA9IChwYXJlbnQsIGhhbmRsZXIpIC0+XG5cdHJldHVybiBuZXcgQnV0dG9uXG5cdFx0cGFyZW50OiBwYXJlbnRcblx0XHR3aWR0aDogNDQuMCwgaGVpZ2h0OiA0NC4wLCBpbWFnZTogXCJpbWFnZXMvYnV0dG9uX211c2ljLnBuZ1wiXG5cdFx0eDogQWxpZ24ucmlnaHQoLTY4KSwgeTogQWxpZ24uY2VudGVyXG5cdFx0aGFuZGxlcjogaGFuZGxlclxuXG5leHBvcnRzLmJ1dHRvblRleHQgPSAocGFyZW50LCBoYW5kbGVyKSAtPlxuXHRyZXR1cm4gbmV3IEJ1dHRvblxuXHRcdHBhcmVudDogcGFyZW50XG5cdFx0d2lkdGg6IDQ0LjAsIGhlaWdodDogNDQuMCwgaW1hZ2U6IFwiaW1hZ2VzL2J1dHRvbl90ZXh0LnBuZ1wiXG5cdFx0eDogQWxpZ24ucmlnaHQoLTEyMCksIHk6IEFsaWduLmNlbnRlclxuXHRcdGhhbmRsZXI6IGhhbmRsZXJcblxuXG5cblxuZXhwb3J0cy5pbWFnZVZpZXcgPSAocGFyZW50KSAtPlxuXHRpbWFnZVZpZXcgPSBuZXcgTGF5ZXJcblx0XHRwYXJlbnQ6IHBhcmVudFxuXHRcdHNpemU6IDM3NVxuXHRcdHk6IEFsaWduLnRvcCgxNzYpXG5cdFxuXHRpbWFnZVZpZXcuc3RhdGVzID1cblx0XHRcInNob3duXCI6IHsgb3BhY2l0eTogMSB9XG5cdFx0XCJoaWRkZW5cIjogeyBvcGFjaXR5OiAxIH1cblx0aW1hZ2VWaWV3LnN0YXRlU3dpdGNoKFwiaGlkZGVuXCIpXG5cblx0aW1hZ2VWaWV3Lm9uIEV2ZW50cy5TdGF0ZVN3aXRjaEVuZCwgKGZyb20sIHRvKSAtPlxuXHRcdGlmIHRvICE9IGZyb21cblx0XHRcdGlmIHRvID09IFwic2hvd25cIiB0aGVuIEBjaGlsZHJlblsxXS5vcGFjaXR5ID0gMVxuXHRcdFx0ZWxzZSBpZiB0byA9PSBcImhpZGRlblwiIHRoZW4gIEBjaGlsZHJlblsxXS5vcGFjaXR5ID0gMFxuXHRcblx0aW1hZ2VQcm9ncmVzcyA9IG5ldyBMYXllclxuXHRcdHBhcmVudDogaW1hZ2VWaWV3XG5cdFx0d2lkdGg6IDM3NS4wLCBoZWlnaHQ6IDM3NS4wLCBpbWFnZTogXCJpbWFnZXMvcHJvZ3Jlc3NfMS5wbmdcIlxuXHRcblx0aW1hZ2VQcm9ncmVzcy5zdGF0ZXMgPVxuXHRcdFwidGV4dDFcIjogeyBpbWFnZTogXCJpbWFnZXMvcHJvZ3Jlc3NfMS5wbmdcIiB9XG5cdFx0XCJ0ZXh0MlwiOiB7IGltYWdlOiBcImltYWdlcy9wcm9ncmVzc18yLnBuZ1wiIH1cblx0XHRcImltYWdlMVwiOiB7IGltYWdlOiBcImltYWdlcy9wcm9ncmVzc18zLnBuZ1wiIH1cblx0XHRcImltYWdlMlwiOiB7IGltYWdlOiBcImltYWdlcy9wcm9ncmVzc18zLnBuZ1wiIH1cblx0XHRcInRveXMxXCI6IHsgaW1hZ2U6IFwiaW1hZ2VzL3Byb2dyZXNzX3RveXMucG5nXCJ9XG5cdGltYWdlUHJvZ3Jlc3Muc3RhdGVTd2l0Y2goXCJ0ZXh0MVwiKVxuXG5cdGZvciBzdGF0ZU5hbWUgaW4gaW1hZ2VQcm9ncmVzcy5zdGF0ZU5hbWVzXG5cdFx0aWYgc3RhdGVOYW1lICE9IFwiZGVmYXVsdFwiXG5cdFx0XHRGcmFtZXIuRXh0cmFzLlByZWxvYWRlci5hZGRJbWFnZShpbWFnZVByb2dyZXNzW3N0YXRlTmFtZV0pXG5cblxuXG5cdGltYWdlRG9uZSA9IG5ldyBMYXllclxuXHRcdHBhcmVudDogaW1hZ2VWaWV3XG5cdFx0d2lkdGg6IDM3NS4wLCBoZWlnaHQ6IDM3NS4wLCBpbWFnZTogXCJpbWFnZXMvcmVzdWx0XzEucG5nXCJcblx0XHRvcGFjaXR5OiAwXG5cdFxuXHRpbWFnZURvbmUuc3RhdGVzID1cblx0XHRcInRleHQxXCI6IHsgaW1hZ2U6IFwiaW1hZ2VzL3Jlc3VsdF8xLnBuZ1wiIH1cblx0XHRcInRleHQyXCI6IHsgaW1hZ2U6IFwiaW1hZ2VzL3Jlc3VsdF8yLnBuZ1wiIH1cblx0XHRcImltYWdlMVwiOiB7IGltYWdlOiBcImltYWdlcy9yZXN1bHRfMy5wbmdcIiB9XG5cdFx0XCJpbWFnZTJcIjogeyBpbWFnZTogXCJpbWFnZXMvcmVzdWx0XzMucG5nXCIgfVxuXHRcdFwidG95czFcIjogeyBpbWFnZTogXCJpbWFnZXMvcmVzdWx0X3RveXMucG5nXCJ9XG5cdGltYWdlRG9uZS5zdGF0ZVN3aXRjaChcInRleHQxXCIpXG5cblx0Zm9yIHN0YXRlTmFtZSBpbiBpbWFnZVByb2dyZXNzLnN0YXRlTmFtZXNcblx0XHRpZiBzdGF0ZU5hbWUgIT0gXCJkZWZhdWx0XCJcblx0XHRcdEZyYW1lci5FeHRyYXMuUHJlbG9hZGVyLmFkZEltYWdlKGltYWdlRG9uZVtzdGF0ZU5hbWVdKVxuXG5cdHJldHVybiBpbWFnZVZpZXdcblxuXG5cbmV4cG9ydHMudGltZVZpZXcgPSAocGFyZW50KSAtPlxuXHR0aW1lVmlldyA9IG5ldyBMYXllclxuXHRcdHBhcmVudDogcGFyZW50XG5cdFx0d2lkdGg6IDM3NS4wLCBoZWlnaHQ6IDIyOC4wLCBpbWFnZTogXCJpbWFnZXMvdGltZWxlZnRfaW1hZ2UucG5nXCJcblx0XHR5OiBBbGlnbi5ib3R0b20oLTMyKVxuXHRcblx0dGltZVZpZXcuc3RhdGVzID1cblx0XHRcInNob3duXCI6IHsgb3BhY2l0eTogMSB9XG5cdFx0XCJoaWRkZW5cIjogeyBvcGFjaXR5OiAwIH1cblx0XG5cdHRpbWVWaWV3LnN0YXRlU3dpdGNoKFwic2hvd25cIilcblxuXHRyZXR1cm4gdGltZVZpZXdcblxuXG5cdCMgd2lkdGg6IDM3NS4wLCBoZWlnaHQ6IDM3NS4wLCBpbWFnZTogXCJpbWFnZXMvcHJvZ3Jlc3NfdG95cy5wbmdcIlxuXHQjIHdpZHRoOiAzNzUuMCwgaGVpZ2h0OiAzNzUuMCwgaW1hZ2U6IFwiaW1hZ2VzL3Jlc3VsdF90b3lzLnBuZ1wiXG5cblxuZXhwb3J0cy5ib3R0b21WaWV3ID0gKHBhcmVudCkgLT5cblx0Ym90dG9tVmlldyA9IG5ldyBMYXllclxuXHRcdHBhcmVudDogcGFyZW50XG5cdFx0d2lkdGg6IDM3NVxuXHRcdGhlaWdodDogNjRcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHR5OiBBbGlnbi5ib3R0b20oLTMyKVxuXHRcblx0Ym90dG9tVmlldy5zdGF0ZXMgPVxuXHRcdFwic2hvd25cIjogeyBvcGFjaXR5OiAxIH1cblx0XHRcImhpZGRlblwiOiB7IG9wYWNpdHk6IDAgfVxuXHRcblx0Ym90dG9tVmlldy5zdGF0ZVN3aXRjaChcImhpZGRlblwiKVxuXG5cdHJldHVybiBib3R0b21WaWV3XG5cbmV4cG9ydHMuYnV0dG9uUmVyb2xsID0gKHBhcmVudCwgaGFuZGxlcikgLT5cblx0cmV0dXJuIG5ldyBCdXR0b25cblx0XHRwYXJlbnQ6IHBhcmVudFxuXHRcdHdpZHRoOiA0NC4wLCBoZWlnaHQ6IDQ0LjAsIGltYWdlOiBcImltYWdlcy9idXR0b25fcmVyb2xsLnBuZ1wiXG5cdFx0eDogQWxpZ24ubGVmdCgxNiksIHk6IEFsaWduLmNlbnRlclxuXHRcdGhhbmRsZXI6IGhhbmRsZXJcblxuZXhwb3J0cy5idXR0b25TYXZlID0gKHBhcmVudCwgaGFuZGxlcikgLT5cblx0cmV0dXJuIG5ldyBCdXR0b25cblx0XHRwYXJlbnQ6IHBhcmVudFxuXHRcdHdpZHRoOiA0NC4wLCBoZWlnaHQ6IDQ0LjAsIGltYWdlOiBcImltYWdlcy9idXR0b25fc2F2ZS5wbmdcIlxuXHRcdHg6IEFsaWduLmxlZnQoNjgpLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cbiMgZXhwb3J0cy5idXR0b25FZGl0ID0gKHBhcmVudCwgaGFuZGxlcikgLT5cbiMgXHRyZXR1cm4gbmV3IEJ1dHRvblxuIyBcdFx0cGFyZW50OiBwYXJlbnRcbiMgXHRcdHdpZHRoOiA0NC4wLCBoZWlnaHQ6IDQ0LjAsIGltYWdlOiBcImltYWdlcy9idXR0b25fZWRpdC5wbmdcIlxuIyBcdFx0eDogQWxpZ24ubGVmdCg2OCksIHk6IEFsaWduLmNlbnRlclxuIyBcdFx0aGFuZGxlcjogaGFuZGxlclxuXG5cblxuIyBleHBvcnRzLmJ1dHRvblNhdmUgPSAocGFyZW50LCBoYW5kbGVyKSAtPlxuIyBcdHJldHVybiBuZXcgQnV0dG9uXG4jIFx0XHRwYXJlbnQ6IHBhcmVudFxuIyBcdFx0d2lkdGg6IDQ0LjAsIGhlaWdodDogNDQuMCwgaW1hZ2U6IFwiaW1hZ2VzL2J1dHRvbl9zYXZlLnBuZ1wiXG4jIFx0XHR4OiBBbGlnbi5yaWdodCgtMTc3KSwgeTogQWxpZ24uY2VudGVyXG4jIFx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cbmV4cG9ydHMuYnV0dG9uUHVibGlzaCA9IChwYXJlbnQsIGhhbmRsZXIpIC0+XG5cdHJldHVybiBuZXcgQnV0dG9uXG5cdFx0cGFyZW50OiBwYXJlbnRcblx0XHR3aWR0aDogMTUzLjAsIGhlaWdodDogNDQuMCwgaW1hZ2U6IFwiaW1hZ2VzL2J1dHRvbl9wdWJsaXNoLnBuZ1wiXG5cdFx0eDogQWxpZ24ucmlnaHQoLTE2KSwgeTogQWxpZ24uY2VudGVyXG5cdFx0aGFuZGxlcjogaGFuZGxlclxuXG5cblxuIiwiY2xhc3MgZXhwb3J0cy5DYW1lcmFMYXllciBleHRlbmRzIFZpZGVvTGF5ZXJcbiAgY29uc3RydWN0b3I6IChvcHRpb25zID0ge30pIC0+XG4gICAgY3VzdG9tUHJvcHMgPVxuICAgICAgZmFjaW5nOiB0cnVlXG4gICAgICBmbGlwcGVkOiB0cnVlXG4gICAgICBhdXRvRmxpcDogdHJ1ZVxuICAgICAgcmVzb2x1dGlvbjogdHJ1ZVxuICAgICAgZml0OiB0cnVlXG5cbiAgICBiYXNlT3B0aW9ucyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpXG4gICAgICAuZmlsdGVyIChrZXkpIC0+ICFjdXN0b21Qcm9wc1trZXldXG4gICAgICAucmVkdWNlIChjbG9uZSwga2V5KSAtPlxuICAgICAgICBjbG9uZVtrZXldID0gb3B0aW9uc1trZXldXG4gICAgICAgIGNsb25lXG4gICAgICAsIHsgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnIH1cblxuICAgIHN1cGVyKGJhc2VPcHRpb25zKVxuXG4gICAgQF9mYWNpbmcgPSBvcHRpb25zLmZhY2luZyA/ICdiYWNrJ1xuICAgIEBfZmxpcHBlZCA9IG9wdGlvbnMuZmxpcHBlZCA/IGZhbHNlXG4gICAgQF9hdXRvRmxpcCA9IG9wdGlvbnMuYXV0b0ZsaXAgPyB0cnVlXG4gICAgQF9yZXNvbHV0aW9uID0gb3B0aW9ucy5yZXNvbHV0aW9uID8gNzIwXG5cbiAgICBAX3N0YXJ0ZWQgPSBmYWxzZVxuICAgIEBfc3RyZWFtID0gbnVsbFxuICAgIEBfc2NoZWR1bGVkUmVzdGFydCA9IG51bGxcbiAgICBAX3JlY29yZGluZyA9IG51bGxcblxuICAgIEBjbGlwID0gdHJ1ZVxuXG4gICAgQHBsYXllci5hdXRvcGxheSA9IHRydWVcbiAgICBAcGxheWVyLm11dGVkID0gdHJ1ZVxuICAgIEBwbGF5ZXIucGxheXNpbmxpbmUgPSB0cnVlXG4gICAgQHBsYXllci5zdHlsZS5vYmplY3RGaXQgPSBvcHRpb25zLmZpdCA/ICdjb3ZlcidcblxuICBAZGVmaW5lICdmYWNpbmcnLFxuICAgIGdldDogLT4gQF9mYWNpbmdcbiAgICBzZXQ6IChmYWNpbmcpIC0+XG4gICAgICBAX2ZhY2luZyA9IGlmIGZhY2luZyA9PSAnZnJvbnQnIHRoZW4gJ2Zyb250JyBlbHNlICdiYWNrJ1xuICAgICAgQF9zZXRSZXN0YXJ0KClcblxuICBAZGVmaW5lICdmbGlwcGVkJyxcbiAgICBnZXQ6IC0+IEBfZmxpcHBlZFxuICAgIHNldDogKGZsaXBwZWQpIC0+XG4gICAgICBAX2ZsaXBwZWQgPSBmbGlwcGVkXG4gICAgICBAX3NldFJlc3RhcnQoKVxuXG4gIEBkZWZpbmUgJ2F1dG9GbGlwJyxcbiAgICBnZXQ6IC0+IEBfYXV0b0ZsaXBcbiAgICBzZXQ6IChhdXRvRmxpcCkgLT5cbiAgICAgIEBfYXV0b0ZsaXAgPSBhdXRvRmxpcFxuICAgICAgQF9zZXRSZXN0YXJ0KClcblxuICBAZGVmaW5lICdyZXNvbHV0aW9uJyxcbiAgICBnZXQ6IC0+IEBfcmVzb2x1dGlvblxuICAgIHNldDogKHJlc29sdXRpb24pIC0+XG4gICAgICBAX3Jlc29sdXRpb24gPSByZXNvbHV0aW9uXG4gICAgICBAX3NldFJlc3RhcnQoKVxuXG4gIEBkZWZpbmUgJ2ZpdCcsXG4gICAgZ2V0OiAtPiBAcGxheWVyLnN0eWxlLm9iamVjdEZpdFxuICAgIHNldDogKGZpdCkgLT4gQHBsYXllci5zdHlsZS5vYmplY3RGaXQgPSBmaXRcblxuICBAZGVmaW5lICdpc1JlY29yZGluZycsXG4gICAgZ2V0OiAtPiBAX3JlY29yZGluZz8ucmVjb3JkZXIuc3RhdGUgPT0gJ3JlY29yZGluZydcblxuICB0b2dnbGVGYWNpbmc6IC0+XG4gICAgQF9mYWNpbmcgPSBpZiBAX2ZhY2luZyA9PSAnZnJvbnQnIHRoZW4gJ2JhY2snIGVsc2UgJ2Zyb250J1xuICAgIEBfc2V0UmVzdGFydCgpXG5cbiAgY2FwdHVyZTogKHdpZHRoID0gQHdpZHRoLCBoZWlnaHQgPSBAaGVpZ2h0LCByYXRpbyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKSAtPlxuICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIilcbiAgICBjYW52YXMud2lkdGggPSByYXRpbyAqIHdpZHRoXG4gICAgY2FudmFzLmhlaWdodCA9IHJhdGlvICogaGVpZ2h0XG5cbiAgICBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKVxuICAgIEBkcmF3KGNvbnRleHQpXG5cbiAgICB1cmwgPSBjYW52YXMudG9EYXRhVVJMKClcbiAgICBAZW1pdCgnY2FwdHVyZScsIHVybClcblxuICAgIHVybFxuXG4gIGRyYXc6IChjb250ZXh0KSAtPlxuICAgIHJldHVybiB1bmxlc3MgY29udGV4dFxuXG4gICAgY292ZXIgPSAoc3JjVywgc3JjSCwgZHN0VywgZHN0SCkgLT5cbiAgICAgIHNjYWxlWCA9IGRzdFcgLyBzcmNXXG4gICAgICBzY2FsZVkgPSBkc3RIIC8gc3JjSFxuICAgICAgc2NhbGUgPSBpZiBzY2FsZVggPiBzY2FsZVkgdGhlbiBzY2FsZVggZWxzZSBzY2FsZVlcbiAgICAgIHdpZHRoOiBzcmNXICogc2NhbGUsIGhlaWdodDogc3JjSCAqIHNjYWxlXG5cbiAgICB7dmlkZW9XaWR0aCwgdmlkZW9IZWlnaHR9ID0gQHBsYXllclxuXG4gICAgY2xpcEJveCA9IHdpZHRoOiBjb250ZXh0LmNhbnZhcy53aWR0aCwgaGVpZ2h0OiBjb250ZXh0LmNhbnZhcy5oZWlnaHRcbiAgICBsYXllckJveCA9IGNvdmVyKEB3aWR0aCwgQGhlaWdodCwgY2xpcEJveC53aWR0aCwgY2xpcEJveC5oZWlnaHQpXG4gICAgdmlkZW9Cb3ggPSBjb3Zlcih2aWRlb1dpZHRoLCB2aWRlb0hlaWdodCwgbGF5ZXJCb3gud2lkdGgsIGxheWVyQm94LmhlaWdodClcblxuICAgIHggPSAoY2xpcEJveC53aWR0aCAtIHZpZGVvQm94LndpZHRoKSAvIDJcbiAgICB5ID0gKGNsaXBCb3guaGVpZ2h0IC0gdmlkZW9Cb3guaGVpZ2h0KSAvIDJcblxuICAgIGNvbnRleHQuZHJhd0ltYWdlKEBwbGF5ZXIsIHgsIHksIHZpZGVvQm94LndpZHRoLCB2aWRlb0JveC5oZWlnaHQpXG5cbiAgc3RhcnQ6IC0+XG4gICAgY29uc3RyYWludHMgPVxuICAgICAgdmlkZW86XG4gICAgICAgIGZhY2luZ01vZGU6IHtpZGVhbDogaWYgQF9mYWNpbmcgPT0gJ2Zyb250JyB0aGVuICd1c2VyJyBlbHNlICdlbnZpcm9ubWVudCd9XG4gICAgICBhdWRpbzpcbiAgICAgICAgdHJ1ZVxuXG4gICAgQF9nZXRVc2VyTWVkaWEoY29uc3RyYWludHMpLnRoZW4gKHN0cmVhbSkgPT5cbiAgICAgIEBwbGF5ZXIuc3JjT2JqZWN0ID0gc3RyZWFtXG4gICAgICBAX3N0YXJ0ZWQgPSB0cnVlXG4gICAgICBAX3N0cmVhbSA9IHN0cmVhbVxuICAgICAgQF9mbGlwKClcblxuICAgIC5jYXRjaCAoZXJyb3IpIC0+XG4gICAgICBjb25zb2xlLmVycm9yKGVycm9yKVxuXG4gIHN0b3A6IC0+XG4gICAgQF9zdGFydGVkID0gZmFsc2VcblxuICAgIEBwbGF5ZXIucGF1c2UoKVxuICAgIEBwbGF5ZXIuc3JjT2JqZWN0ID0gbnVsbFxuXG4gICAgQF9zdHJlYW0/LmdldFRyYWNrcygpLmZvckVhY2ggKHRyYWNrKSAtPiB0cmFjay5zdG9wKClcbiAgICBAX3N0cmVhbSA9IG51bGxcblxuICAgIGlmIEBfc2NoZWR1bGVkUmVzdGFydFxuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoQF9zY2hlZHVsZWRSZXN0YXJ0KVxuICAgICAgQF9zY2hlZHVsZWRSZXN0YXJ0ID0gbnVsbFxuXG4gIHN0YXJ0UmVjb3JkaW5nOiAtPlxuICAgIGlmIEBfcmVjb3JkaW5nXG4gICAgICBAX3JlY29yZGluZy5yZWNvcmRlci5zdG9wKClcbiAgICAgIEBfcmVjb3JkaW5nID0gbnVsbFxuXG4gICAgY2h1bmtzID0gW11cblxuICAgIHJlY29yZGVyID0gbmV3IE1lZGlhUmVjb3JkZXIoQF9zdHJlYW0sIHttaW1lVHlwZTogJ3ZpZGVvL3dlYm0nfSlcbiAgICByZWNvcmRlci5hZGRFdmVudExpc3RlbmVyICdzdGFydCcsIChldmVudCkgPT4gQGVtaXQoJ3N0YXJ0cmVjb3JkaW5nJylcbiAgICByZWNvcmRlci5hZGRFdmVudExpc3RlbmVyICdkYXRhYXZhaWxhYmxlJywgKGV2ZW50KSAtPiBjaHVua3MucHVzaChldmVudC5kYXRhKVxuICAgIHJlY29yZGVyLmFkZEV2ZW50TGlzdGVuZXIgJ3N0b3AnLCAoZXZlbnQpID0+XG4gICAgICBibG9iID0gbmV3IEJsb2IoY2h1bmtzKVxuICAgICAgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYilcbiAgICAgIEBlbWl0KCdzdG9wcmVjb3JkaW5nJylcbiAgICAgIEBlbWl0KCdyZWNvcmQnLCB1cmwpXG5cbiAgICByZWNvcmRlci5zdGFydCgpXG5cbiAgICBAX3JlY29yZGluZyA9IHtyZWNvcmRlciwgY2h1bmtzfVxuXG4gIHN0b3BSZWNvcmRpbmc6IC0+XG4gICAgcmV0dXJuIGlmICFAX3JlY29yZGluZ1xuICAgIEBfcmVjb3JkaW5nLnJlY29yZGVyLnN0b3AoKVxuICAgIEBfcmVjb3JkaW5nID0gbnVsbFxuXG4gIG9uQ2FwdHVyZTogKGNhbGxiYWNrKSAtPiBAb24oJ2NhcHR1cmUnLCBjYWxsYmFjaylcbiAgb25TdGFydFJlY29yZGluZzogKGNhbGxiYWNrKSAtPiBAb24oJ3N0YXJ0cmVjb3JkaW5nJywgY2FsbGJhY2spXG4gIG9uU3RvcFJlY29yZGluZzogKGNhbGxiYWNrKSAtPiBAb24oJ3N0b3ByZWNvcmRpbmcnLCBjYWxsYmFjaylcbiAgb25SZWNvcmQ6IChjYWxsYmFjaykgLT4gQG9uKCdyZWNvcmQnLCBjYWxsYmFjaylcblxuICBfc2V0UmVzdGFydDogLT5cbiAgICByZXR1cm4gaWYgIUBfc3RhcnRlZCB8fCBAX3NjaGVkdWxlZFJlc3RhcnRcblxuICAgIEBfc2NoZWR1bGVkUmVzdGFydCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSA9PlxuICAgICAgQF9zY2hlZHVsZWRSZXN0YXJ0ID0gbnVsbFxuICAgICAgQHN0YXJ0KClcblxuICBfZmxpcDogLT5cbiAgICBAX2ZsaXBwZWQgPSBAX2ZhY2luZyA9PSAndXNlcicgaWYgQF9hdXRvRmxpcFxuICAgIHggPSBpZiBAX2ZsaXBwZWQgdGhlbiAtMSBlbHNlIDFcbiAgICBAcGxheWVyLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IFwic2NhbGUoI3t4fSwgMSlcIlxuXG4gIF9lbnVtZXJhdGVEZXZpY2VzOiAtPlxuICAgIHRyeVxuICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzKClcbiAgICBjYXRjaFxuICAgICAgUHJvbWlzZS5yZWplY3QoKVxuXG4gIF9nZXRVc2VyTWVkaWE6IChjb25zdHJhaW50cykgLT5cbiAgICB0cnlcbiAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzKVxuICAgIGNhdGNoXG4gICAgICBQcm9taXNlLnJlamVjdCgpXG4iLCJcblxue1NjYWxlVmlld30gPSByZXF1aXJlIFwiU2NhbGVWaWV3XCJcblxuXG5jbGFzcyBleHBvcnRzLkRldmljZVZpZXcgZXh0ZW5kcyBTY2FsZVZpZXdcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRib3JkZXJWaWV3OiBudWxsXG5cdFx0XHRzaG93RGV2aWNlOiB0cnVlXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBib3JkZXJWaWV3ID0gbmV3IExheWVyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwiMDAwXCJcblx0XHRcdGJvcmRlclJhZGl1czogQGJvcmRlclJhZGl1cyArIDE2XG5cdFx0XHRvcGFjaXR5OiAxXG5cblx0XHRAYm9yZGVyVmlldy5zZW5kVG9CYWNrKClcblxuXHRcdEBpbml0Qm9yZGVyVmlld0NzcygpXG5cdFx0QHVwZGF0ZUJvcmRlclZpZXcoKVxuXG5cdFx0QG9uIFwiY2hhbmdlOnNpemVcIiwgLT5cblx0XHRcdEB1cGRhdGVCb3JkZXJWaWV3KClcblx0XHRcblx0XHRAb24gXCJjaGFuZ2U6c2NhbGVcIiwgLT5cblx0XHRcdEB1cGRhdGVCb3JkZXJWaWV3KClcblx0XHRcblx0XHRAb24gXCJjaGFuZ2U6eFwiLCAtPlxuXHRcdFx0QHVwZGF0ZUJvcmRlclZpZXcoKVxuXHRcdFxuXHRcdEBvbiBcImNoYW5nZTp5XCIsIC0+XG5cdFx0XHRAdXBkYXRlQm9yZGVyVmlldygpXG5cdFx0XG5cblx0QGRlZmluZSAnYm9yZGVyVmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ib3JkZXJWaWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmJvcmRlclZpZXcgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnc2hvd0RldmljZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93RGV2aWNlXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNob3dEZXZpY2UgPSB2YWx1ZVxuXHRcblx0XG5cblxuXHRzaG93Qm9yZGVyVmlldzogKCkgPT5cblx0XHRAYm9yZGVyVmlldy5vcGFjaXR5ID0gMVxuXHRcblx0aGlkZUJvcmRlclZpZXc6ICgpID0+XG5cdFx0QGJvcmRlclZpZXcub3BhY2l0eSA9IDBcblxuXG5cdHVwZGF0ZUJvcmRlclZpZXc6ICgpID0+XG5cdFx0ZGVsdGFHID0gMTZcblxuXHRcdEBib3JkZXJWaWV3LndpZHRoID0gQHdpZHRoICsgZGVsdGFHICogMlxuXHRcdEBib3JkZXJWaWV3LmhlaWdodCA9IEBoZWlnaHQgKyBkZWx0YUcgKiAyXG5cdFx0QGJvcmRlclZpZXcueCA9IEFsaWduLmNlbnRlcigpXG5cdFx0QGJvcmRlclZpZXcueSA9IEFsaWduLmNlbnRlcigpXG5cdFx0QGJvcmRlclZpZXcuc2NhbGUgPSBAc2NhbGVcblx0XHRcblx0XG5cdGluaXRCb3JkZXJWaWV3Q3NzOiAoKSA9PlxuXHRcdEBib3JkZXJWaWV3LmNsYXNzTGlzdC5hZGQoXCJpcGhvbmUtdGlsbGx1ci12XCIpXG4gXG5cdFx0Y3NzID0gXCJcIlwiXG5cdFx0LmlwaG9uZS10aWxsbHVyLXYge1xuXHRcdFx0YmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxuXHRcdFx0MTYwLjc0ZGVnLFxuXHRcdFx0cmdiYSgzNiwgMzYsIDM2LCAwLjMpIDI0LjM5JSxcblx0XHRcdHJnYmEoMjgsIDI4LCAyOCwgMC4zKSAyOS40NyUsXG5cdFx0XHRyZ2JhKDEwLCAxMCwgMTAsIDAuMykgOTkuODUlXG5cdFx0XHQpLFxuXHRcdFx0bGluZWFyLWdyYWRpZW50KFxuXHRcdFx0MTgwZGVnLFxuXHRcdFx0cmdiYSgyLCAyLCAyLCAwLjYpIC0wLjIxJSxcblx0XHRcdHJnYmEoMjEsIDIxLCAyMSwgMC42KSA2LjUyJSxcblx0XHRcdHJnYmEoNiwgNiwgNiwgMC42KSA5OS43OSVcblx0XHRcdCksXG5cdFx0XHQjNWE1YTVhO1xuXHRcdGJveC1zaGFkb3c6IDhweCAxNHB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjI1KSxcblx0XHRcdGluc2V0IDBweCAtNHB4IDE2cHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpLFxuXHRcdFx0aW5zZXQgNHB4IDBweCA0cHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpLFxuXHRcdFx0aW5zZXQgLTRweCAwcHggNHB4IHJnYmEoMCwgMCwgMCwgMC43KTtcblxuXHRcdH1cblx0XHRcIlwiXCJcblx0XHRcblx0XHRVdGlscy5pbnNlcnRDU1MoY3NzKSIsIlxuY2xhc3MgZXhwb3J0cy5EZXZpY2VfQ2xhc3MgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIwMDBcIlxuXHRcdFx0dmlldzogbnVsbFxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdCMgdXBkYXRlIGZyb20gcGFyZW50XG5cdFx0QHN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IHNjYWxlOiAxIH1cblx0XHRcdFwiZmlsbFwiOiB7IHNjYWxlOiAxIH1cblxuXHRcdEBpbml0Qm9yZGVyVmlld0NzcygpXG5cdFx0QHNlbmRUb0JhY2soKVxuXHRcblxuXG5cdEBkZWZpbmUgJ3ZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudmlld1xuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMudmlldyA9IHZhbHVlXG5cdFx0XHRAb3B0aW9ucy53aWR0aCA9IHZhbHVlLndpZHRoICsgMTYgKiAyXG5cdFx0XHRAb3B0aW9ucy5oZWlnaHQgPSB2YWx1ZS5oZWlnaHQgKyAxNiAqIDJcblx0XHRcdEBib3JkZXJSYWRpdXMgPSB2YWx1ZS5ib3JkZXJSYWRpdXMgKyAxNlxuXG5cdHN0YXRlU3dpdGNoVG9Ob3JtYWw6ICgpID0+XG5cdFx0QGFuaW1hdGUoc2NhbGU6IEBzdGF0ZXNbXCJub3JtYWxcIl0uc2NhbGUsIG9wdGlvbnM6IHsgY3VydmU6IEJlemllci5saW5lYXIsIHRpbWU6IDAgfSlcblx0XG5cdHN0YXRlU3dpdGNoVG9GaWxsOiAoKSA9PlxuXHRcdEBhbmltYXRlKHNjYWxlOiBAc3RhdGVzW1wiZmlsbFwiXS5zY2FsZSwgb3B0aW9uczogeyBjdXJ2ZTogQmV6aWVyLmxpbmVhciwgdGltZTogMCB9KVxuXG5cdGFuaW1hdGVTdGF0ZVRvTm9ybWFsOiAoKSA9PlxuXHRcdEBhbmltYXRlKHNjYWxlOiBAc3RhdGVzW1wibm9ybWFsXCJdLnNjYWxlLCBvcHRpb25zOiB7IGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSB9KVxuXHRcblx0YW5pbWF0ZVN0YXRlVG9GaWxsOiAoKSA9PlxuXHRcdEBhbmltYXRlKHNjYWxlOiBAc3RhdGVzW1wiZmlsbFwiXS5zY2FsZSwgb3B0aW9uczogeyBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUgfSlcblxuXG5cblx0aW5pdEJvcmRlclZpZXdDc3M6ICgpID0+XG5cdFx0QGNsYXNzTGlzdC5hZGQoXCJpcGhvbmUtdGlsbGx1ci12XCIpXG4gXG5cdFx0Y3NzID0gXCJcIlwiXG5cdFx0LmlwaG9uZS10aWxsbHVyLXYge1xuXHRcdFx0YmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxuXHRcdFx0MTYwLjc0ZGVnLFxuXHRcdFx0cmdiYSgzNiwgMzYsIDM2LCAwLjMpIDI0LjM5JSxcblx0XHRcdHJnYmEoMjgsIDI4LCAyOCwgMC4zKSAyOS40NyUsXG5cdFx0XHRyZ2JhKDEwLCAxMCwgMTAsIDAuMykgOTkuODUlXG5cdFx0XHQpLFxuXHRcdFx0bGluZWFyLWdyYWRpZW50KFxuXHRcdFx0MTgwZGVnLFxuXHRcdFx0cmdiYSgyLCAyLCAyLCAwLjYpIC0wLjIxJSxcblx0XHRcdHJnYmEoMjEsIDIxLCAyMSwgMC42KSA2LjUyJSxcblx0XHRcdHJnYmEoNiwgNiwgNiwgMC42KSA5OS43OSVcblx0XHRcdCksXG5cdFx0XHQjNWE1YTVhO1xuXHRcdGJveC1zaGFkb3c6IDhweCAxNHB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjI1KSxcblx0XHRcdGluc2V0IDBweCAtNHB4IDE2cHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpLFxuXHRcdFx0aW5zZXQgNHB4IDBweCA0cHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpLFxuXHRcdFx0aW5zZXQgLTRweCAwcHggNHB4IHJnYmEoMCwgMCwgMCwgMC43KTtcblxuXHRcdH1cblx0XHRcIlwiXCJcblx0XHRcblx0XHRVdGlscy5pbnNlcnRDU1MoY3NzKSIsIlxuXG57IERldmljZV9DbGFzcyB9ID0gcmVxdWlyZSBcIkRldmljZV9DbGFzc1wiXG5cbmNsYXNzIGV4cG9ydHMuRGV2aWNlX0luaXQgZXh0ZW5kcyBEZXZpY2VfQ2xhc3Ncblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR2aXNpYmxlOiBAdmlldy5kZXZpY2VDb25maWcuZW5hYmxlZFxuXHRcdFx0Zm9yY2VBbmRyb2lkQmFyOiBAdmlldy5kZXZpY2VDb25maWcuZm9yY2VfQW5kcm9pZEJhclxuXHRcdFx0c3RhdHVzQmFyOiBAdmlldy5kZXZpY2VDb25maWcuc3RhdHVzQmFyX3RoZW1lXG5cdFx0XHRob21lQmFyOiBAdmlldy5kZXZpY2VDb25maWcuaG9tZUJhcl90aGVtZVxuXHRcdFx0XG5cdFx0XHRwcm90b3R5cGVDcmVhdGlvblllYXI6IEB2aWV3LnRpbWVWYWx1ZVxuXG5cdFx0XHQjIGdldHRlcnNcblx0XHRcdHN0YXR1c0JhclZpZXc6IG51bGxcblx0XHRcdGhvbWVCYXJWaWV3OiBudWxsXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBjcmVhdGVCYXJzKClcblxuXG5cblx0IyBkZXByZWNhdGVkXG5cdEBkZWZpbmUgJ3Zpc2libGUnLFxuXHRcdGdldDogLT4gaWYgQG9wdGlvbnMudmlzaWJsZSB0aGVuIHJldHVybiAxIGVsc2UgcmV0dXJuIDBcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudmlzaWJsZSA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdmb3JjZUFuZHJvaWRCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZm9yY2VBbmRyb2lkQmFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZEJhciA9IHZhbHVlXG5cblx0QGRlZmluZSAnc3RhdHVzQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnN0YXR1c0JhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zdGF0dXNCYXIgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnaG9tZUJhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ob21lQmFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmhvbWVCYXIgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgJ3Byb3RvdHlwZUNyZWF0aW9uWWVhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5wcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyID0gdmFsdWVcblxuXG5cblxuXG5cdEBkZWZpbmUgJ3N0YXR1c0JhclZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc3RhdHVzQmFyVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zdGF0dXNCYXJWaWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2hvbWVCYXJWaWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmhvbWVCYXJWaWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmhvbWVCYXJWaWV3ID0gdmFsdWVcblxuXG5cblx0dmlld1NpemU6ICh3LCBoKSA9PiByZXR1cm4gQHZpZXcud2lkdGggPT0gdyBhbmQgQHZpZXcuaGVpZ2h0ID09IGhcblxuXHQjIENyZWF0ZSBCYXJzXG5cblx0Y3JlYXRlQmFyczogKCkgPT5cblx0XHRAc3RhdHVzQmFyVmlldyA9IG5ldyBMYXllciBcblx0XHRcdHBhcmVudDogQHZpZXcsIHdpZHRoOiBAdmlldy53aWR0aCwgeTogQWxpZ24udG9wLCBuYW1lOiBcIi5zdGF0dXMgYmFyXCJcblx0XHRcdG9wYWNpdHk6IEB2aXNpYmxlLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcblx0XHRpZiBAZm9yY2VBbmRyb2lkQmFyXG5cdFx0XHRAY3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXIoQHN0YXR1c0JhclZpZXcpIFxuXG5cdFx0ZWxzZSBpZiBAdmlld1NpemUoMzc1LCA4MTIpIG9yIEB2aWV3U2l6ZSgzOTAsIDg0NCkgb3IgQHZpZXdTaXplKDQxNCwgODk2KSBvciBAdmlld1NpemUoNDI4LCA5MjYpIG9yIEB2aWV3U2l6ZSgzNjAsIDc4Milcblx0XHRcdEBjcmVhdGVOb3RjaFN0YXR1c0JhcihAc3RhdHVzQmFyVmlldylcblx0XHRcdEBjcmVhdGVIb21lSW5kaWNhdG9yIG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IEB2aWV3LCB3aWR0aDogQHZpZXcud2lkdGgsIGhlaWdodDogMzQsIHk6IEFsaWduLmJvdHRvbSwgbmFtZTogXCIuaG9tZSBiYXJcIiwgb3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM5MywgODUyKVxuXHRcdFx0QGNyZWF0ZU5vdGNoU3RhdHVzQmFyKEBzdGF0dXNCYXJWaWV3KVxuXHRcdFx0QGNyZWF0ZUhvbWVJbmRpY2F0b3IgbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogQHZpZXcsIHdpZHRoOiBAdmlldy53aWR0aCwgaGVpZ2h0OiAzNCwgeTogQWxpZ24uYm90dG9tLCBuYW1lOiBcIi5ob21lIGJhclwiLCBvcGFjaXR5OiBAdmlzaWJsZSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0ZWxzZSBpZiBAdmlld1NpemUoMzc1LCA2NjcpIG9yIEB2aWV3U2l6ZSg0MTQsIDczNikgb3IgQHZpZXdTaXplKDMyMCwgNTY4KVxuXHRcdFx0QGNyZWF0ZUNsYXNzaWNTdGF0dXNCYXIoQHN0YXR1c0JhclZpZXcpXG5cdFx0XG5cdFx0XG5cdFx0ZWxzZSBAY3JlYXRlQW5kcm9pZFN0YXR1c0JhcihAc3RhdHVzQmFyVmlldylcblx0XG5cdFxuXHRcblx0XG5cblxuXG5cdGNyZWF0ZUFuZHJvaWRTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAzMlxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTIsIGhlaWdodDogMjAsIHg6IEFsaWduLmxlZnQoNCksIHk6IEFsaWduLnRvcCgyICsgNSlcblx0XHRcdGNvbG9yOiBkZXZpY2VfYXNzZXRzLmNvbG9yW0BzdGF0dXNCYXJdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxNCwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5yaWdodCgtNCksIHk6IEFsaWduLnRvcCg1KVxuXHRcdFx0aW1hZ2U6IGRldmljZV9hc3NldHMuYW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHN0YXR1c0Jhcl1cblx0XG5cdFxuXHRjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDIwXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1MiwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ubGVmdCwgeTogQWxpZ24udG9wKDIpXG5cdFx0XHRjb2xvcjogZGV2aWNlX2Fzc2V0cy5jb2xvcltAc3RhdHVzQmFyXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTQsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ucmlnaHQsIHk6IEFsaWduLnRvcCgpXG5cdFx0XHRpbWFnZTogZGV2aWNlX2Fzc2V0cy5hbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZVtAc3RhdHVzQmFyXVxuXHRcblx0XG5cblxuXG5cdGNyZWF0ZUNsYXNzaWNTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNMZWZ0Q29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24ubGVmdFxuXHRcdFx0aW1hZ2U6IGRldmljZV9hc3NldHMub2xkU3RhdHVzQmFyTGVmdEltYWdlW0BzdGF0dXNCYXJdXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiA1NCwgaGVpZ2h0OiAxNiwgeDogQWxpZ24uY2VudGVyLCB5OiBBbGlnbi5jZW50ZXJcblx0XHRcdGNvbG9yOiBkZXZpY2VfYXNzZXRzLmNvbG9yW0BzdGF0dXNCYXJdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxMiwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTAwLCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24ucmlnaHRcblx0XHRcdGltYWdlOiBkZXZpY2VfYXNzZXRzLm9sZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHN0YXR1c0Jhcl1cblx0XHRcblx0XG5cdGNyZWF0ZU5vdGNoU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gNDRcblx0XHRcblx0XHRub3RjaExlZnRDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTQsIGhlaWdodDogMjEsIHg6IEFsaWduLmxlZnQoMjEpLCB5OiBBbGlnbi50b3AoMTIpXG5cdFx0XHRjb2xvcjogZGV2aWNlX2Fzc2V0cy5jb2xvcltAc3RhdHVzQmFyXSwgYmFja2dyb3VuZENvbG9yOiBudWxsLCBsZXR0ZXJTcGFjaW5nOiAtMC4xN1xuXHRcdFx0Zm9udFNpemU6IDE1LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0bm90Y2hDZW50ZXJDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAzNzUsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5jZW50ZXJcblx0XHRcdGltYWdlOiBkZXZpY2VfYXNzZXRzLm5vdGNoXG5cdFx0XG5cdFx0bm90Y2hSaWdodENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogZGV2aWNlX2Fzc2V0cy5zdGF0dXNCYXJSaWdodEltYWdlW0BzdGF0dXNCYXJdXG5cblxuXG5cblxuXHRjcmVhdGVIb21lSW5kaWNhdG9yOiAoYmFyTGF5ZXIpID0+XG5cdFx0QGhvbWVCYXJWaWV3ID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi5ob21lVmlld1wiXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTM1LCBoZWlnaHQ6IDUsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uYm90dG9tKC04KVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBkZXZpY2VfYXNzZXRzLmNvbG9yW0Bob21lQmFyXSwgYm9yZGVyUmFkaXVzOiAyMFxuXHRcblxuXG5cbmRldmljZV9hc3NldHMgPVxuXHRjb2xvcjpcblx0XHRkYXJrOiBcIiMwMDBcIlxuXHRcdGxpZ2h0OiBcIiNGRkZcIlxuXHRcblx0c3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyTGVmdEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9sZWZ0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfbGlnaHQucG5nXCJcblx0b2xkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0YW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvYW5kcm9pZFN0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL2FuZHJvaWRTdGF0dXNCYXJfcmlnaHRfbGlnaHQucG5nXCJcblx0XG5cblxuXHRub3RjaDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvc3RhdHVzQmFyX25vdGNoLnBuZ1wiXG5cdHRpcDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvdGlwLnBuZ1wiIiwiXG5jbGFzcyBleHBvcnRzLkhvbWVCYXJfQ2xhc3MgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHBhcmVudDogQHZpZXdcblx0XHRcdHdpZHRoOiBAdmlldy53aWR0aFxuXHRcdFx0XG5cdFx0XHR0aGVtZTogQHZpZXcuaG9tZUJhcl90aGVtZVxuXHRcdFx0XG5cdFx0XHRoZWlnaHQ6IDM0LCB5OiBBbGlnbi5ib3R0b20sIG5hbWU6IFwiLmhvbWUgYmFyXCIsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAY3JlYXRlKClcblxuXG5cblx0QGRlZmluZSAndmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy52aWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnZpZXcgPSB2YWx1ZVxuXG5cdEBkZWZpbmUgJ3RoZW1lJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRoZW1lXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnRoZW1lID0gdmFsdWVcblxuXG5cblx0dmlld1NpemU6ICh3LCBoKSA9PiByZXR1cm4gQHZpZXcud2lkdGggPT0gdyBhbmQgQHZpZXcuaGVpZ2h0ID09IGhcblxuXHRjcmVhdGU6ICgpID0+XG5cdFx0aWYgQHZpZXdTaXplKDM3NSwgODEyKSBvciBAdmlld1NpemUoMzkwLCA4NDQpIG9yIEB2aWV3U2l6ZSg0MTQsIDg5Nikgb3IgQHZpZXdTaXplKDQyOCwgOTI2KSBvciBAdmlld1NpemUoMzYwLCA3ODIpIG9yIEB2aWV3U2l6ZSgzOTMsIDg1Milcblx0XHRcdEBjcmVhdGVIb21lSW5kaWNhdG9yKClcblx0XG5cdFxuXHRjcmVhdGVIb21lSW5kaWNhdG9yOiAoKSA9PlxuXHRcdG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCIuaG9tZVZpZXdcIlxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogMTM1LCBoZWlnaHQ6IDUsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uYm90dG9tKC04KVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBkZXZpY2VfYXNzZXRzLmNvbG9yW0B0aGVtZV0sIGJvcmRlclJhZGl1czogMjBcblxuXG5cbmRldmljZV9hc3NldHMgPVxuXHRjb2xvcjpcblx0XHRkYXJrOiBcIiMwMDBcIlxuXHRcdGxpZ2h0OiBcIiNGRkZcIiIsIlxuXG5Bc3NldHMgPSByZXF1aXJlIFwiUHJldmlld19Bc3NldHNcIlxuXG5cbiMgZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSBcImF1dG9cIlxuXG5jbGFzcyBleHBvcnRzLkluaXRWaWV3IGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRuYW1lOiBcIlByZXZpZXdcIlxuXHRcdFx0dmlldzogbnVsbFxuXHRcdFx0XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGJvcmRlclJhZGl1czogNDJcblx0XHRcdFxuXHRcdFx0YXNzZXRzOiBBc3NldHMuZGF0YVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblxuXHRcdHdpbmRvdy5zYXZlUHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QoQClcblx0XHRcblx0XHRAc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgc2NhbGU6IDEgfVxuXHRcdFx0XCJmaWxsXCI6IHsgc2NhbGU6IDEgfVxuXHRcdFxuXHRcdFxuXHRcdFxuXG5cdFxuXG5cdEBkZWZpbmUgJ3ZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudmlld1xuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMudmlldyA9IHZhbHVlXG5cdFx0XHRAd2lkdGggPSBAdmlldy53aWR0aFxuXHRcdFx0QGhlaWdodCA9IEB2aWV3LmhlaWdodFxuXHRcdFx0QHZpZXcucGFyZW50ID0gQFxuXG5cdEBkZWZpbmUgJ2Fzc2V0cycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5hc3NldHNcblxuXG5cblxuXG5cdHNjcmVlblNpemU6ICh3LCBoKSA9PiByZXR1cm4gU2NyZWVuLndpZHRoID09IHcgYW5kIFNjcmVlbi5oZWlnaHQgPT0gaFxuXHR2aWV3U2l6ZTogKHcsIGgpID0+IHJldHVybiBAd2lkdGggPT0gdyBhbmQgQGhlaWdodCA9PSBoXG5cdHZpZXdXaWR0aDogKHcpID0+IHJldHVybiBAd2lkdGggPT0gd1xuXG5cdGxvZ1NpemU6ICgpID0+XG5cdFx0bmV3IFRleHRMYXllciB7IHRleHQ6IFwiI3tTY3JlZW4ud2lkdGh9eCN7U2NyZWVuLmhlaWdodH1cIiwgeTogQWxpZ24uY2VudGVyIH1cdFxuXG5cblxuXHRhbmltYXRlU3RhdGVUb05vcm1hbDogKCkgPT5cblx0XHRAYW5pbWF0ZShcIm5vcm1hbFwiLCBjdXJ2ZTogU3ByaW5nKGRhbXBpbmc6IDEpLCB0aW1lOiAwLjUpXG5cdFxuXHRhbmltYXRlU3RhdGVUb0ZpbGw6ICgpID0+XG5cdFx0QGFuaW1hdGUoXCJmaWxsXCIsIGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSlcblx0XG5cdHN0YXRlU3dpdGNoVG9Ob3JtYWw6ICgpID0+XG5cdFx0QHN0YXRlU3dpdGNoKFwibm9ybWFsXCIpXG5cdFxuXHRzdGF0ZVN3aXRjaFRvRmlsbDogKCkgPT5cblx0XHRAc3RhdGVTd2l0Y2goXCJmaWxsXCIpXG5cblxuXHRcdFxuIiwiXG5cbntEZXZpY2VWaWV3fSA9IHJlcXVpcmUgXCJEZXZpY2VWaWV3XCJcblxuXG5jbGFzcyBleHBvcnRzLkxvY2F0aW9uVmlldyBleHRlbmRzIERldmljZVZpZXdcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRpbml0U3RhdGU6IFwiZmlsbFwiICMgZmlsbCAvIG5vcm1hbFxuXHRcdFx0c2hvd0J1dHRvbjogdHJ1ZVxuXHRcdFx0c2hvd0xvZ286IHRydWVcblx0XHRcdGZvcmNlRGVza3RvcDogZmFsc2VcblxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAc2NhbGVQcmV2aWV3KClcblxuXG5cdEBkZWZpbmUgJ2luaXRTdGF0ZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5pbml0U3RhdGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuaW5pdFN0YXRlID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3Nob3dCdXR0b24nLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2hvd0J1dHRvblxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zaG93QnV0dG9uID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3Nob3dMb2dvJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNob3dMb2dvXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNob3dMb2dvID0gdmFsdWVcblxuXHRAZGVmaW5lICdmb3JjZURlc2t0b3AnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZm9yY2VEZXNrdG9wXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5mb3JjZURlc2t0b3AgPSB2YWx1ZVxuXHRcdFx0aWYgdmFsdWVcblx0XHRcdFx0QHNob3dEZXZpY2UgPSBmYWxzZVxuXHRcdFx0XHRAc2hvd0JhcnMgPSBmYWxzZVxuXHRcdFx0XHRAYm9yZGVyUmFkaXVzID0gOFxuXHRcblx0XG5cdHNjYWxlUHJldmlldzogKCkgPT5cblx0XHRmb3JjZURlc2t0b3BNb2RlID0gQGdldFN0YXRlR2VuZXJpYyhcImRlc2t0b3BcIiwgW3sgdmFsdWU6IFwiZmFsc2VcIiwgcmVzdWx0OiBmYWxzZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwidHJ1ZVwiLCByZXN1bHQ6IHRydWUgfV0sIGZhbHNlKVxuXG5cdFx0aWYgZm9yY2VEZXNrdG9wTW9kZSB0aGVuIEBwcmV2aWV3RGVza3RvcCgpXG5cdFx0ZWxzZSBpZiBVdGlscy5pc01vYmlsZSgpIHRoZW4gQHByZXZpZXdNb2JpbGUoKVxuXHRcdGVsc2UgQHByZXZpZXdEZXNrdG9wKClcblx0XHRcdFxuXHRcdFxuXHRcblxuXHR1cGRhdGVTY2FsZTogKCkgPT5cblxuXHRcdHNjYWxlRmFjdG9yID0gU2NyZWVuLndpZHRoIC8gQ2FudmFzLndpZHRoXG5cblx0XHRAb3JpZ2luWCA9IDBcblx0XHRAb3JpZ2luWSA9IDBcblxuXHRcdHNjYWxlWCA9IChTY3JlZW4ud2lkdGggLSBzY2FsZUZhY3RvciAqIDExMikgLyBAd2lkdGhcblx0XHRzY2FsZVkgPSAoU2NyZWVuLmhlaWdodCAtIHNjYWxlRmFjdG9yICogMTEyKSAvIEBoZWlnaHRcblx0XHRAc3RhdGVzW1wiZmlsbFwiXS5zY2FsZSA9IE1hdGgubWluKHNjYWxlWCwgc2NhbGVZKVxuXG5cdFx0QHN0YXRlc1tcImZpbGxcIl0ueCA9IChTY3JlZW4ud2lkdGggLSBAd2lkdGggKiBAc3RhdGVzW1wiZmlsbFwiXS5zY2FsZSkgLyAyXG5cdFx0QHN0YXRlc1tcImZpbGxcIl0ueSA9IChTY3JlZW4uaGVpZ2h0IC0gQGhlaWdodCAqIEBzdGF0ZXNbXCJmaWxsXCJdLnNjYWxlKSAvIDJcblxuXHRcdEBzdGF0ZXNbXCJub3JtYWxcIl0ueCA9IChTY3JlZW4ud2lkdGggLSBAd2lkdGgpIC8gMlxuXHRcdEBzdGF0ZXNbXCJub3JtYWxcIl0ueSA9IChTY3JlZW4uaGVpZ2h0IC0gQGhlaWdodCkgLyAyXG5cblx0XG5cblxuXG5cblx0c2V0RGVza3RvcFNjYWxlTW9kZTogKCkgPT5cblxuXHRcdGZvclN0YXRlID0gQGdldFN0YXRlR2VuZXJpYyhcInNjYWxlXCIsIFt7IHZhbHVlOiBcImZpbGxcIiwgcmVzdWx0OiBcImZpbGxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJub3JtYWxcIiwgcmVzdWx0OiBcIm5vcm1hbFwiIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcInRydWVcIiwgcmVzdWx0OiBcImZpbGxcIiB9XSwgQGluaXRTdGF0ZSlcblxuXHRcdHNob3VsZFNob3dCdXR0b24gPSBAZ2V0U3RhdGVHZW5lcmljKFwiYnV0dG9uXCIsIFt7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9mZlwiLCByZXN1bHQ6IGZhbHNlIH1dLCBAc2hvd0J1dHRvbilcblxuXHRcdHNob3VsZFNob3dMb2dvID0gQGdldFN0YXRlR2VuZXJpYyhcImxvZ29cIiwgW3sgdmFsdWU6IFwiZmFsc2VcIiwgcmVzdWx0OiBmYWxzZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9mZlwiLCByZXN1bHQ6IGZhbHNlIH1dLCBAc2hvd0xvZ28pXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRzaG91bGRTaG93RGV2aWNlID0gQGdldFN0YXRlR2VuZXJpYyhcImRldmljZVwiLCBbeyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogZmFsc2UgfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcInRydWVcIiwgcmVzdWx0OiB0cnVlIH1dLCBAc2hvd0RldmljZSlcblxuXHRcdFxuXHRcdGlmIHNob3VsZFNob3dMb2dvIHRoZW4gQGNyZWF0ZUxvZ29CdXR0b24oKVxuXHRcdGlmIHNob3VsZFNob3dCdXR0b24gdGhlbiBAY3JlYXRlU2NhbGVCdXR0b24oZm9yU3RhdGUpXG5cdFx0aWYgc2hvdWxkU2hvd0RldmljZSB0aGVuIEBzaG93Qm9yZGVyVmlldygpIGVsc2UgQGhpZGVCb3JkZXJWaWV3KClcblx0XHRAc3RhdGVTd2l0Y2goZm9yU3RhdGUpXG5cdFxuXHRcblx0XG5cdHByZXZpZXdEZXNrdG9wOiAoKSA9PlxuXHRcdEB1cGRhdGVTY2FsZSgpXG5cdFx0QHNldERlc2t0b3BTY2FsZU1vZGUoKVxuXHRcdEBjcmVhdGVCYXJzKClcblx0XHRAY2xpcCA9IHRydWVcblx0XHRAdXBkYXRlUHJldmlld09uUmVzaXplKClcblxuXG5cdHVwZGF0ZVByZXZpZXdPblJlc2l6ZTogKCkgPT5cblx0XHRsb2NhbFByZXZpZXcgPSBAXG5cdFx0XG5cdFx0Q2FudmFzLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVNjYWxlKClcblx0XHRcdGxvY2FsUHJldmlldy5zdGF0ZVN3aXRjaChsb2NhbFByZXZpZXcuc3RhdGVzLmN1cnJlbnQubmFtZSlcblx0XHRcblx0XHRDYW52YXMub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZSgpXG5cdFx0XHRsb2NhbFByZXZpZXcuc3RhdGVTd2l0Y2gobG9jYWxQcmV2aWV3LnN0YXRlcy5jdXJyZW50Lm5hbWUpXG5cdFx0XG5cblx0XHRTY3JlZW4ub24gXCJjaGFuZ2U6aGVpZ2h0XCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlU2NhbGUoKVxuXHRcdFx0bG9jYWxQcmV2aWV3LnN0YXRlU3dpdGNoKGxvY2FsUHJldmlldy5zdGF0ZXMuY3VycmVudC5uYW1lKVxuXHRcdFxuXHRcdFNjcmVlbi5vbiBcImNoYW5nZTp3aWR0aFwiLCA9PlxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVNjYWxlKClcblx0XHRcdGxvY2FsUHJldmlldy5zdGF0ZVN3aXRjaChsb2NhbFByZXZpZXcuc3RhdGVzLmN1cnJlbnQubmFtZSlcblx0XG5cdFxuXHRcblx0XG5cdFxuXHRcblx0XG5cdHByZXZpZXdNb2JpbGU6ICgpID0+XG5cblx0XHRAc2NhbGUgPSBTY3JlZW4ud2lkdGggLyBAd2lkdGhcblx0XHRAb3JpZ2luWCA9IDBcblx0XHRAb3JpZ2luWSA9IDBcblx0XG5cdFxuXG5cdHNldEN1c3RvbVByZXZpZXc6ICgpID0+XG5cdFx0QHkgPSBBbGlnbi50b3Bcblx0XHRcblx0XHRAc2NhbGUgPSAoU2NyZWVuLmhlaWdodCAtIDEyMCkgLyBAaGVpZ2h0XG5cdFx0QGJvcmRlclJhZGl1cyA9IDIwXG5cdFx0QGNsaXAgPSB0cnVlXG5cblxuXG5cblx0IyBnZXRTdGF0ZUdlbmVyaWM6IChrZXkgPSBcInNjYWxlXCIsIHBhaXJzID0gW3sgdmFsdWU6ICwgcmVzdWx0OiB9LCB7dmFsdWU6ICwgcmVzdWx0OiB9XSwgZGVmYXVsdFJlc3VsdCA9IFwiXCIpXG5cdGdldFN0YXRlR2VuZXJpYzogKHN0YXRlS2V5ID0gXCJzY2FsZVwiLCBzdGF0ZVBhaXJzID0gW10sIGRlZmF1bHRSZXN1bHQgPSBcIlwiKSA9PlxuXHRcdHJlc3VsdCA9IGRlZmF1bHRSZXN1bHRcblxuXHRcdGZvciBpdGVtIGluIGxvY2F0aW9uLnNlYXJjaFsxLi5dLnNwbGl0KCcmJylcblx0XHRcdGtleVZhbHVlUGFpciA9IGl0ZW0uc3BsaXQoXCI9XCIpXG5cdFx0XHRrZXlQYXJ0ID0ga2V5VmFsdWVQYWlyWzBdXG5cdFx0XHR2YWx1ZVBhcnQgPSBrZXlWYWx1ZVBhaXJbMV1cblxuXHRcdFx0aWYga2V5UGFydCA9PSBzdGF0ZUtleVxuXHRcdFx0XHRmb3IgcGFpciBpbiBzdGF0ZVBhaXJzXG5cdFx0XHRcdFx0aWYgdmFsdWVQYXJ0ID09IHBhaXIudmFsdWVcblx0XHRcdFx0XHRcdCMgcHJpbnQgXCJvayBcIiArIFwiICN7cGFpci52YWx1ZX1cIiBcblx0XHRcdFx0XHRcdHJlc3VsdCA9IHBhaXIucmVzdWx0XG5cdFx0XHRcdFx0IyBlbHNlXG5cdFx0XHRcdFx0XHQjIHByaW50IFwibm90IFwiICsgXCIgI3twYWlyLnZhbHVlfVwiIFxuXHRcdFxuXHRcdHJldHVybiByZXN1bHRcblx0XG5cdFxuXHRcblx0XG4iLCIjIExvZ29cblxuY2xhc3MgZXhwb3J0cy5Mb2dvTGF5ZXIgZXh0ZW5kcyBTVkdMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRvcGFjaXR5OiAwLjVcblx0XHRcdGhhbmRsZXI6IG51bGxcblx0XHRcdHN2ZzogZ2V0TG9nbyhcIkZGRlwiKVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QHN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdEBzaG93SGludCA9IC0+IDtcblx0XHRcblx0XHRALm9uTW91c2VPdmVyIEBIb3ZlclxuXHRcdEAub25Nb3VzZU91dCBASG92ZXJPZmZcblx0XG5cdEBkZWZpbmUgJ2hhbmRsZXInLFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb24oRXZlbnRzLlRhcCwgdmFsdWUpXG5cdFxuXHRIb3ZlcjogPT5cblx0XHRAb3BhY2l0eSA9IDAuOFxuXHRIb3Zlck9mZjogPT5cblx0XHRAb3BhY2l0eSA9IDAuNVxuXG5cblxuZ2V0TG9nbyA9ICh3aXRoQ29sb3IpIC0+XG5cdHNlbGVjdGVkQ29sb3IgPSBcIiNGRkZGRkZcIlxuXHRyZXR1cm4gXCJcIlwiPHN2ZyB3aWR0aD1cIjc2XCIgaGVpZ2h0PVwiMzJcIiB2aWV3Qm94PVwiMCAwIDc2IDMyXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG48cGF0aCBkPVwiTTIuNzkxOTkgMjEuNkMyLjc5MTk5IDIxLjE2OCAyLjkwMzk5IDIwLjQwOCAzLjEyNzk5IDE5LjMyTDQuMzk5OTkgMTIuODRIMi45ODM5OUwzLjA3OTk5IDEyLjEyQzQuOTk5OTkgMTEuNTQ0IDYuODg3OTkgMTAuNTUyIDguNzQzOTkgOS4xNDM5OEg5Ljg5NTk5TDkuMzE5OTkgMTEuNzZIMTEuMTkyTDEwLjk3NiAxMi44NEg5LjEyNzk5TDcuOTAzOTkgMTkuMzJDNy42OTU5OSAyMC4zMTIgNy41OTE5OSAyMC45NzYgNy41OTE5OSAyMS4zMTJDNy41OTE5OSAyMi4wOCA3LjkyNzk5IDIyLjU0NCA4LjU5OTk5IDIyLjcwNEM4LjQzOTk5IDIzLjI0OCA4LjA3MTk5IDIzLjY4IDcuNDk1OTkgMjRDNi45MTk5OSAyNC4zMiA2LjIyMzk5IDI0LjQ4IDUuNDA3OTkgMjQuNDhDNC41OTE5OSAyNC40OCAzLjk1MTk5IDI0LjIyNCAzLjQ4Nzk5IDIzLjcxMkMzLjAyMzk5IDIzLjIgMi43OTE5OSAyMi40OTYgMi43OTE5OSAyMS42WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0xNy41NTk5IDIyLjY4QzE3LjA2MzkgMjMuODggMTYuMDIzOSAyNC40OCAxNC40Mzk5IDI0LjQ4QzEzLjYyMzkgMjQuNDggMTIuOTU5OSAyNC4yIDEyLjQ0NzkgMjMuNjRDMTIuMDE1OSAyMy4xNDQgMTEuNzk5OSAyMi42NDggMTEuNzk5OSAyMi4xNTJDMTEuNzk5OSAyMC44NTYgMTIuMDk1OSAxOC45NDQgMTIuNjg3OSAxNi40MTZMMTMuNTc1OSAxMS43NkwxOC40NDc5IDExLjI4TDE2Ljk4MzkgMTguODY0QzE2LjcxMTkgMjAuMDQ4IDE2LjU3NTkgMjAuODQ4IDE2LjU3NTkgMjEuMjY0QzE2LjU3NTkgMjIuMTc2IDE2LjkwMzkgMjIuNjQ4IDE3LjU1OTkgMjIuNjhaTTE0LjAwNzkgOC40MjM5OEMxNC4wMDc5IDcuNzk5OTggMTQuMjYzOSA3LjMxOTk4IDE0Ljc3NTkgNi45ODM5OEMxNS4zMDM5IDYuNjQ3OTggMTUuOTQzOSA2LjQ3OTk4IDE2LjY5NTkgNi40Nzk5OEMxNy40NDc5IDYuNDc5OTggMTguMDQ3OSA2LjY0Nzk4IDE4LjQ5NTkgNi45ODM5OEMxOC45NTk5IDcuMzE5OTggMTkuMTkxOSA3Ljc5OTk4IDE5LjE5MTkgOC40MjM5OEMxOS4xOTE5IDkuMDQ3OTggMTguOTM1OSA5LjUxOTk4IDE4LjQyMzkgOS44Mzk5OEMxNy45Mjc5IDEwLjE2IDE3LjMwMzkgMTAuMzIgMTYuNTUxOSAxMC4zMkMxNS43OTk5IDEwLjMyIDE1LjE4MzkgMTAuMTYgMTQuNzAzOSA5LjgzOTk4QzE0LjIzOTkgOS41MTk5OCAxNC4wMDc5IDkuMDQ3OTggMTQuMDA3OSA4LjQyMzk4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0yNi4wNjA2IDIyLjY4QzI1LjU2NDYgMjMuODggMjQuNTI0NiAyNC40OCAyMi45NDA2IDI0LjQ4QzIyLjE0MDYgMjQuNDggMjEuNDg0NiAyNC4yIDIwLjk3MjYgMjMuNjRDMjAuNTU2NiAyMy4xNzYgMjAuMzQ4NiAyMi42OCAyMC4zNDg2IDIyLjE1MkMyMC4zNDg2IDIwLjk1MiAyMC42Mjg2IDE5LjA0IDIxLjE4ODYgMTYuNDE2TDIyLjk0MDYgNy4xOTk5OEwyNy44MTI2IDYuNzE5OThMMjUuNDg0NiAxOC44NjRDMjUuMjEyNiAyMC4wNDggMjUuMDc2NiAyMC44NDggMjUuMDc2NiAyMS4yNjRDMjUuMDc2NiAyMi4xNzYgMjUuNDA0NiAyMi42NDggMjYuMDYwNiAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNMzQuNTYxOCAyMi42OEMzNC4wNjU4IDIzLjg4IDMzLjAyNTggMjQuNDggMzEuNDQxOCAyNC40OEMzMC42NDE4IDI0LjQ4IDI5Ljk4NTggMjQuMiAyOS40NzM4IDIzLjY0QzI5LjA1NzggMjMuMTc2IDI4Ljg0OTggMjIuNjggMjguODQ5OCAyMi4xNTJDMjguODQ5OCAyMC45NTIgMjkuMTI5OCAxOS4wNCAyOS42ODk4IDE2LjQxNkwzMS40NDE4IDcuMTk5OThMMzYuMzEzOCA2LjcxOTk4TDMzLjk4NTggMTguODY0QzMzLjcxMzggMjAuMDQ4IDMzLjU3NzggMjAuODQ4IDMzLjU3NzggMjEuMjY0QzMzLjU3NzggMjIuMTc2IDMzLjkwNTggMjIuNjQ4IDM0LjU2MTggMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTQzLjA2MzEgMjIuNjhDNDIuNTY3MSAyMy44OCA0MS41MjcxIDI0LjQ4IDM5Ljk0MzEgMjQuNDhDMzkuMTQzMSAyNC40OCAzOC40ODcxIDI0LjIgMzcuOTc1MSAyMy42NEMzNy41NTkxIDIzLjE3NiAzNy4zNTExIDIyLjY4IDM3LjM1MTEgMjIuMTUyQzM3LjM1MTEgMjAuOTUyIDM3LjYzMTEgMTkuMDQgMzguMTkxMSAxNi40MTZMMzkuOTQzMSA3LjE5OTk4TDQ0LjgxNTEgNi43MTk5OEw0Mi40ODcxIDE4Ljg2NEM0Mi4yMTUxIDIwLjA0OCA0Mi4wNzkxIDIwLjg0OCA0Mi4wNzkxIDIxLjI2NEM0Mi4wNzkxIDIyLjE3NiA0Mi40MDcxIDIyLjY0OCA0My4wNjMxIDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk01My41MzIzIDIyLjk5MkM1Mi43NjQzIDIzLjk4NCA1MS40MjgzIDI0LjQ4IDQ5LjUyNDMgMjQuNDhDNDguNTMyMyAyNC40OCA0Ny42NzYzIDI0LjE4NCA0Ni45NTYzIDIzLjU5MkM0Ni4yMzYzIDIyLjk4NCA0NS44NzYzIDIyLjI0OCA0NS44NzYzIDIxLjM4NEM0NS44NzYzIDIwLjkwNCA0NS45MDAzIDIwLjU0NCA0NS45NDgzIDIwLjMwNEw0Ny41NTYzIDExLjc2TDUyLjQyODMgMTEuMjhMNTAuNjc2MyAyMC41NDRDNTAuNjEyMyAyMC44OTYgNTAuNTgwMyAyMS4xNzYgNTAuNTgwMyAyMS4zODRDNTAuNTgwMyAyMi4zMTIgNTAuODYwMyAyMi43NzYgNTEuNDIwMyAyMi43NzZDNTIuMDQ0MyAyMi43NzYgNTIuNTgwMyAyMi4zNTIgNTMuMDI4MyAyMS41MDRDNTMuMTcyMyAyMS4yMzIgNTMuMjc2MyAyMC45MiA1My4zNDAzIDIwLjU2OEw1NS4wNDQzIDExLjc2TDU5Ljc3MjMgMTEuMjhMNTcuOTk2MyAyMC42NEM1Ny45NDgzIDIwLjg4IDU3LjkyNDMgMjEuMTI4IDU3LjkyNDMgMjEuMzg0QzU3LjkyNDMgMjEuNjQgNTcuOTk2MyAyMS45MTIgNTguMTQwMyAyMi4yQzU4LjI4NDMgMjIuNDcyIDU4LjU4ODMgMjIuNjQgNTkuMDUyMyAyMi43MDRDNTguOTU2MyAyMy4wODggNTguNzQwMyAyMy40MDggNTguNDA0MyAyMy42NjRDNTcuNzAwMyAyNC4yMDggNTYuOTY0MyAyNC40OCA1Ni4xOTYzIDI0LjQ4QzU1LjQ0NDMgMjQuNDggNTQuODQ0MyAyNC4zNDQgNTQuMzk2MyAyNC4wNzJDNTMuOTQ4MyAyMy44IDUzLjY2MDMgMjMuNDQgNTMuNTMyMyAyMi45OTJaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTY5LjI5NDcgMTcuMjU2QzY5Ljg3MDcgMTYuMjMyIDcwLjE1ODcgMTUuMiA3MC4xNTg3IDE0LjE2QzcwLjE1ODcgMTMuNDcyIDY5LjkxMDcgMTMuMTI4IDY5LjQxNDcgMTMuMTI4QzY5LjAzMDcgMTMuMTI4IDY4LjYzODcgMTMuNDU2IDY4LjIzODcgMTQuMTEyQzY3LjgyMjcgMTQuNzY4IDY3LjU1MDcgMTUuNTIgNjcuNDIyNyAxNi4zNjhMNjYuMTc0NyAyNEw2MS4yMDY3IDI0LjQ4TDYzLjY1NDcgMTEuNzZMNjcuNjE0NyAxMS4yOEw2Ny4xODI3IDEzLjcwNEM2Ny45NjY3IDEyLjA4OCA2OS4yMzg3IDExLjI4IDcwLjk5ODcgMTEuMjhDNzEuOTI2NyAxMS4yOCA3Mi42Mzg3IDExLjUyIDczLjEzNDcgMTJDNzMuNjQ2NyAxMi40OCA3My45MDI3IDEzLjIxNiA3My45MDI3IDE0LjIwOEM3My45MDI3IDE1LjE4NCA3My41NzQ3IDE1Ljk4NCA3Mi45MTg3IDE2LjYwOEM3Mi4yNzg3IDE3LjIzMiA3MS40MDY3IDE3LjU0NCA3MC4zMDI3IDE3LjU0NEM2OS44MjI3IDE3LjU0NCA2OS40ODY3IDE3LjQ0OCA2OS4yOTQ3IDE3LjI1NlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjwvc3ZnPlxuXCJcIlwiXG4iLCJcblxuXG57IEJ1dHRvbiB9ID0gcmVxdWlyZSBcIkJ1dHRvbnNcIlxuXG5cblxuY2xhc3MgRmxvd1ZpZXcgZXh0ZW5kcyBGbG93Q29tcG9uZW50XG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRpZiBAcGFyZW50XG5cdFx0XHRAd2lkdGggPSBAcGFyZW50LndpZHRoXG5cdFx0XHRAaGVpZ2h0ID0gQHBhcmVudC5oZWlnaHRcblxuXG5cblx0QGRlZmluZSBcInBhcmVudFwiLFxuXHRcdGVudW1lcmFibGU6IGZhbHNlXG5cdFx0ZXhwb3J0YWJsZTogZmFsc2Vcblx0XHRpbXBvcnRhYmxlOiB0cnVlXG5cblx0XHRnZXQ6IC0+XG5cdFx0XHRAX3BhcmVudCBvciBudWxsXG5cdFx0XG5cdFx0c2V0OiAobGF5ZXIpIC0+XG5cdFx0XHRyZXR1cm4gaWYgbGF5ZXIgaXMgQF9wYXJlbnRcblxuXHRcdFx0dGhyb3cgRXJyb3IoXCJMYXllci5wYXJlbnQ6IGEgbGF5ZXIgY2Fubm90IGJlIGl0J3Mgb3duIHBhcmVudC5cIikgaWYgbGF5ZXIgaXMgQFxuXG5cdFx0XHQjIENoZWNrIHRoZSB0eXBlXG5cdFx0XHRpZiBub3QgbGF5ZXIgaW5zdGFuY2VvZiBMYXllclxuXHRcdFx0XHR0aHJvdyBFcnJvciBcIkxheWVyLnBhcmVudCBuZWVkcyB0byBiZSBhIExheWVyIG9iamVjdFwiXG5cblx0XHRcdCMgQ2FuY2VsIHByZXZpb3VzIHBlbmRpbmcgaW5zZXJ0aW9uc1xuXHRcdFx0VXRpbHMuZG9tQ29tcGxldGVDYW5jZWwoQF9faW5zZXJ0RWxlbWVudClcblxuXHRcdFx0IyBSZW1vdmUgZnJvbSBwcmV2aW91cyBwYXJlbnQgY2hpbGRyZW5cblx0XHRcdGlmIEBfcGFyZW50XG5cdFx0XHRcdEBfcGFyZW50Ll9jaGlsZHJlbiA9IF8ucHVsbCBAX3BhcmVudC5fY2hpbGRyZW4sIEBcblx0XHRcdFx0QF9wYXJlbnQuX2VsZW1lbnQucmVtb3ZlQ2hpbGQgQF9lbGVtZW50XG5cdFx0XHRcdEBfcGFyZW50LmVtaXQgXCJjaGFuZ2U6Y2hpbGRyZW5cIiwge2FkZGVkOiBbXSwgcmVtb3ZlZDogW0BdfVxuXHRcdFx0XHRAX3BhcmVudC5lbWl0IFwiY2hhbmdlOnN1YkxheWVyc1wiLCB7YWRkZWQ6IFtdLCByZW1vdmVkOiBbQF19XG5cblx0XHRcdCMgRWl0aGVyIGluc2VydCB0aGUgZWxlbWVudCB0byB0aGUgbmV3IHBhcmVudCBlbGVtZW50IG9yIGludG8gZG9tXG5cdFx0XHRpZiBsYXllclxuXHRcdFx0XHRsYXllci5fZWxlbWVudC5hcHBlbmRDaGlsZCBAX2VsZW1lbnRcblx0XHRcdFx0bGF5ZXIuX2NoaWxkcmVuLnB1c2ggQFxuXHRcdFx0XHRsYXllci5lbWl0IFwiY2hhbmdlOmNoaWxkcmVuXCIsIHthZGRlZDogW0BdLCByZW1vdmVkOiBbXX1cblx0XHRcdFx0bGF5ZXIuZW1pdCBcImNoYW5nZTpzdWJMYXllcnNcIiwge2FkZGVkOiBbQF0sIHJlbW92ZWQ6IFtdfVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAX2luc2VydEVsZW1lbnQoKVxuXG5cdFx0XHRvbGRQYXJlbnQgPSBAX3BhcmVudFxuXHRcdFx0IyBTZXQgdGhlIHBhcmVudFxuXHRcdFx0QF9wYXJlbnQgPSBsYXllclxuXG5cdFx0XHQjIFBsYWNlIHRoaXMgbGF5ZXIgb24gdG9wIG9mIGl0cyBzaWJsaW5nc1xuXHRcdFx0QGJyaW5nVG9Gcm9udCgpXG5cblx0XHRcdEBlbWl0IFwiY2hhbmdlOnBhcmVudFwiLCBAX3BhcmVudCwgb2xkUGFyZW50XG5cdFx0XHRAZW1pdCBcImNoYW5nZTpzdXBlckxheWVyXCIsIEBfcGFyZW50LCBvbGRQYXJlbnRcblx0XHRcdFxuXHRcdFx0IyBwcmludCBsYXllclxuXHRcdFx0QHdpZHRoID0gbGF5ZXIud2lkdGhcblx0XHRcdEBoZWlnaHQgPSBsYXllci5oZWlnaHRcblxuXHRcdFx0IyBwcmludCBAd2lkdGggKyBcIiBcIiArIEBoZWlnaHRcblxuXG5cdHN0YWNrVHJhbnNpdGlvbjogKG5hdiwgbGF5ZXJBLCBsYXllckIsIG92ZXJsYXkpIC0+XG5cdFx0dHJhbnNpdGlvbiA9XG5cdFx0XHRsYXllckE6XG5cdFx0XHRcdHNob3c6IHt4OiAwLCB5OiAwfVxuXHRcdFx0XHRoaWRlOiB7eDogMCAtIGxheWVyQT8ud2lkdGggLyAyLCB5OiAwfVxuXHRcdFx0bGF5ZXJCOlxuXHRcdFx0XHRzaG93OiB7eDogMCwgeTogMH1cblx0XHRcdFx0aGlkZToge3g6IGxheWVyQi53aWR0aCwgeTogMH1cblx0XHRcdG92ZXJsYXk6XG5cdFx0XHRcdHNob3c6IHtvcGFjaXR5OiAuNSwgeDogMCwgeTogMCwgc2l6ZTogbmF2LnNpemV9XG5cdFx0XHRcdGhpZGU6IHtvcGFjaXR5OiAwLCB4OiAwLCB5OiAwLCBzaXplOiBuYXYuc2l6ZX1cblxuXG5cdG1vZGFsVHJhbnNpdGlvbjogKG5hdiwgbGF5ZXJBLCBsYXllckIsIG92ZXJsYXkpIC0+XG5cdFx0dHJhbnNpdGlvbiA9XG5cdFx0XHRsYXllckE6XG5cdFx0XHRcdHNob3c6IHt4OiAwLCB5OiAwfVxuXHRcdFx0XHRoaWRlOiB7eDogMCwgeTogMH1cblx0XHRcdGxheWVyQjpcblx0XHRcdFx0c2hvdzoge3g6IDAsIHk6IDB9XG5cdFx0XHRcdGhpZGU6IHt4OiAwLCB5OiBsYXllckE/LmhlaWdodCArIDEwfVxuXHRcdFx0b3ZlcmxheTpcblx0XHRcdFx0c2hvdzoge29wYWNpdHk6IC41LCB4OiAwLCB5OiAwLCBzaXplOiBuYXYuc2l6ZX1cblx0XHRcdFx0aGlkZToge29wYWNpdHk6IDAsIHg6IDAsIHk6IDAsIHNpemU6IG5hdi5zaXplfVxuXG5cblxuXHRvcGVuOiAobmF2aWdhdGlvblZpZXcpIC0+XG5cdFx0bmF2aWdhdGlvblZpZXcuc2Nyb2xsVG9Ub3AoZmFsc2UpXG5cdFx0aWYgbmF2aWdhdGlvblZpZXcud3JhcHBlciAhPSB1bmRlZmluZWQgYW5kIG5hdmlnYXRpb25WaWV3LndyYXBwZXIgIT0gbnVsbFxuXHRcdFx0QHRyYW5zaXRpb24obmF2aWdhdGlvblZpZXcucGFyZW50LCBAbW9kYWxUcmFuc2l0aW9uKVxuXHRcdGVsc2Vcblx0XHRcdEB0cmFuc2l0aW9uKG5hdmlnYXRpb25WaWV3LCBAc3RhY2tUcmFuc2l0aW9uKVxuXG5cblxuXG5cbmNsYXNzIE1vZGFsVmlldyBleHRlbmRzIFNjcm9sbENvbXBvbmVudFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0bmF2aWdhdGlvblZpZXdfV3JhcHBlciA9IG5ldyBMYXllclxuXHRcdFx0bmFtZTogXCJ3cmFwcGVyXCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0bmF2aWdhdGlvblZpZXdfV3JhcHBlci5vbiBFdmVudHMuVGFwLCAtPlxuXHRcdFx0QGNoaWxkcmVuWzBdLmZsb3cuc2hvd1ByZXZpb3VzKClcblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRmbG93OiBudWxsXG5cdFx0XHR3cmFwcGVyOiBuYXZpZ2F0aW9uVmlld19XcmFwcGVyXG5cdFx0XHRzY3JvbGxWZXJ0aWNhbDogdHJ1ZVxuXHRcdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRcdGRpcmVjdGlvbkxvY2s6IHRydWVcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdFxuXHRcdEBwYXJlbnQgPSBuYXZpZ2F0aW9uVmlld19XcmFwcGVyXG5cblx0XHRAb24gRXZlbnRzLlRhcCwgKGV2ZW50LCBsYXllcikgLT5cblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG5cblx0XHRAb24gRXZlbnRzLlN3aXBlRG93blN0YXJ0LCAoZXZlbnQsIGxheWVyKSAtPlxuXHRcdFx0aWYgQHNjcm9sbFkgPCAwIHRoZW4gQGZsb3cuc2hvd1ByZXZpb3VzKClcblxuXHRcdCMgbmF2aWdhdGlvblZpZXdfSGFuZGxlciA9IG5ldyBMYXllclxuXHRcdCMgXHRwYXJlbnQ6IEBcblx0XHQjIFx0Ym9yZGVyUmFkaXVzOiA4XG5cdFx0IyBcdHdpZHRoOiA0MCwgaGVpZ2h0OiAzLCB4OiBBbGlnbi5jZW50ZXIsIG9wYWNpdHk6IDAuNVxuXHRcdCMgXHR5OiAxMDBcblx0XHQjIFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblx0XHRcblx0XHQjICMgQG9uIFwiY2hhbmdlOnlcIiwgLT5cblx0XHQjICMgXHRAcGFyZW50LnBhcmVudC5jaGlsZHJlblsxXS5uYXZpZ2F0aW9uVmlld19IYW5kbGVyLnkgPSBAcGFyZW50LnkgLSAxMVxuXHRcdFxuXHRcdCMgQGNvbnRlbnQub24gXCJjaGFuZ2U6eVwiLCAtPlxuXHRcdCMgXHRsb2NhbEhhbmRsZXIgPSBAcGFyZW50LmNoaWxkcmVuWzFdXG5cdFx0IyBcdCMgbG9jYWxIYW5kbGVyLnkgPSBAcGFyZW50LnkgLSAxMVxuXHRcdCMgXHRwcmludCBsb2NhbEhhbmRsZXIueVxuXHRcdFxuXHRcdCMgQGNvbnRlbnQuZW1pdCBcImNoYW5nZTp5XCJcblxuXG5cblx0QGRlZmluZSAnZmxvdycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5mbG93XG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5mbG93ID0gdmFsdWVcblx0XHRcdHZhbHVlLnNob3dOZXh0KEApXG5cdFx0XHR2YWx1ZS5zaG93UHJldmlvdXMoYW5pbWF0ZTogZmFsc2UpXG5cdFxuXHRAZGVmaW5lICd3cmFwcGVyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLndyYXBwZXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMud3JhcHBlciA9IHZhbHVlXG5cblx0QGRlZmluZSBcInBhcmVudFwiLFxuXHRcdGVudW1lcmFibGU6IGZhbHNlXG5cdFx0ZXhwb3J0YWJsZTogZmFsc2Vcblx0XHRpbXBvcnRhYmxlOiB0cnVlXG5cblx0XHRnZXQ6IC0+XG5cdFx0XHRAX3BhcmVudCBvciBudWxsXG5cdFx0XG5cdFx0c2V0OiAobGF5ZXIpIC0+XG5cblx0XHRcdCMgRmxvdyBwYXJlbnRcblx0XHRcdGlmIGxheWVyICE9IEB3cmFwcGVyXG5cdFx0XHRcdEBvcHRpb25zLmZsb3cgPSBsYXllclxuXG5cdFx0XHRcdEB3cmFwcGVyLnBhcmVudCA9IGxheWVyXG5cdFx0XHRcdEB3cmFwcGVyLndpZHRoID0gbGF5ZXIud2lkdGhcblx0XHRcdFx0QHdyYXBwZXIuaGVpZ2h0ID0gbGF5ZXIuaGVpZ2h0XG5cdFx0XHRcdEB3aWR0aCA9IGxheWVyLndpZHRoXG5cdFx0XHRcdEBoZWlnaHQgPSBsYXllci5oZWlnaHRcblxuXHRcdFx0XHRyZXR1cm5cblxuXG5cdFx0XHRyZXR1cm4gaWYgbGF5ZXIgaXMgQF9wYXJlbnRcblxuXHRcdFx0dGhyb3cgRXJyb3IoXCJMYXllci5wYXJlbnQ6IGEgbGF5ZXIgY2Fubm90IGJlIGl0J3Mgb3duIHBhcmVudC5cIikgaWYgbGF5ZXIgaXMgQFxuXG5cdFx0XHQjIENoZWNrIHRoZSB0eXBlXG5cdFx0XHRpZiBub3QgbGF5ZXIgaW5zdGFuY2VvZiBMYXllclxuXHRcdFx0XHR0aHJvdyBFcnJvciBcIkxheWVyLnBhcmVudCBuZWVkcyB0byBiZSBhIExheWVyIG9iamVjdFwiXG5cblx0XHRcdCMgQ2FuY2VsIHByZXZpb3VzIHBlbmRpbmcgaW5zZXJ0aW9uc1xuXHRcdFx0VXRpbHMuZG9tQ29tcGxldGVDYW5jZWwoQF9faW5zZXJ0RWxlbWVudClcblxuXHRcdFx0IyBSZW1vdmUgZnJvbSBwcmV2aW91cyBwYXJlbnQgY2hpbGRyZW5cblx0XHRcdGlmIEBfcGFyZW50XG5cdFx0XHRcdEBfcGFyZW50Ll9jaGlsZHJlbiA9IF8ucHVsbCBAX3BhcmVudC5fY2hpbGRyZW4sIEBcblx0XHRcdFx0QF9wYXJlbnQuX2VsZW1lbnQucmVtb3ZlQ2hpbGQgQF9lbGVtZW50XG5cdFx0XHRcdEBfcGFyZW50LmVtaXQgXCJjaGFuZ2U6Y2hpbGRyZW5cIiwge2FkZGVkOiBbXSwgcmVtb3ZlZDogW0BdfVxuXHRcdFx0XHRAX3BhcmVudC5lbWl0IFwiY2hhbmdlOnN1YkxheWVyc1wiLCB7YWRkZWQ6IFtdLCByZW1vdmVkOiBbQF19XG5cblx0XHRcdCMgRWl0aGVyIGluc2VydCB0aGUgZWxlbWVudCB0byB0aGUgbmV3IHBhcmVudCBlbGVtZW50IG9yIGludG8gZG9tXG5cdFx0XHRpZiBsYXllclxuXHRcdFx0XHRsYXllci5fZWxlbWVudC5hcHBlbmRDaGlsZCBAX2VsZW1lbnRcblx0XHRcdFx0bGF5ZXIuX2NoaWxkcmVuLnB1c2ggQFxuXHRcdFx0XHRsYXllci5lbWl0IFwiY2hhbmdlOmNoaWxkcmVuXCIsIHthZGRlZDogW0BdLCByZW1vdmVkOiBbXX1cblx0XHRcdFx0bGF5ZXIuZW1pdCBcImNoYW5nZTpzdWJMYXllcnNcIiwge2FkZGVkOiBbQF0sIHJlbW92ZWQ6IFtdfVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAX2luc2VydEVsZW1lbnQoKVxuXG5cdFx0XHRvbGRQYXJlbnQgPSBAX3BhcmVudFxuXHRcdFx0IyBTZXQgdGhlIHBhcmVudFxuXHRcdFx0QF9wYXJlbnQgPSBsYXllclxuXG5cdFx0XHQjIFBsYWNlIHRoaXMgbGF5ZXIgb24gdG9wIG9mIGl0cyBzaWJsaW5nc1xuXHRcdFx0QGJyaW5nVG9Gcm9udCgpXG5cblx0XHRcdEBlbWl0IFwiY2hhbmdlOnBhcmVudFwiLCBAX3BhcmVudCwgb2xkUGFyZW50XG5cdFx0XHRAZW1pdCBcImNoYW5nZTpzdXBlckxheWVyXCIsIEBfcGFyZW50LCBvbGRQYXJlbnRcblxuXG5cdFxuXHRhZGQ6IChjb250ZW50VmlldykgLT5cblx0XHRjb250ZW50Vmlldy5wYXJlbnQgPSBAY3VzdG9tLnZpZXcuY29udGVudFxuXHRcdEBiYWNrZ3JvdW5kQ29sb3IgPSBudWxsXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5jbGFzcyBOYXZpZ2F0aW9uVmlldyBleHRlbmRzIFNjcm9sbENvbXBvbmVudFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdGZsb3c6IG51bGxcblx0XHRcdGJhY2tCdXR0b246IG51bGxcblx0XHRcdHNob3dCYWNrOiB0cnVlXG5cdFx0XHRzY3JvbGxWZXJ0aWNhbDogdHJ1ZVxuXHRcdFx0c2Nyb2xsSG9yaXpvbnRhbDogZmFsc2Vcblx0XHRcdGRpcmVjdGlvbkxvY2s6IHRydWVcblx0XHRcdGN1c3RvbTpcblx0XHRcdFx0YmFja0J1dHRvbl9uYW1lOiBcIkJhY2tfQnV0dG9uXCJcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0dHJ5IEBiYWNrQnV0dG9uLmJyaW5nVG9Gcm9udCgpXG5cblx0XHRAb24gRXZlbnRzLlN3aXBlUmlnaHRTdGFydCwgKGV2ZW50LCBsYXllcikgPT5cblx0XHRcdHRyeSBAZmxvdy5zaG93UHJldmlvdXMoKVxuXHRcdFxuXHRcdEBvbiBcImNoYW5nZTpjaGlsZHJlblwiLCAtPlxuXHRcdFx0dHJ5IEBiYWNrQnV0dG9uLmJyaW5nVG9Gcm9udCgpXG5cdFxuXG5cdEBkZWZpbmUgJ2Zsb3cnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZmxvd1xuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMuZmxvdyA9IHZhbHVlXG5cdFx0XHR2YWx1ZS5zaG93TmV4dChAKVxuXHRcdFx0dmFsdWUuc2hvd1ByZXZpb3VzKGFuaW1hdGU6IGZhbHNlKVxuXG5cblxuXHRAZGVmaW5lICdiYWNrQnV0dG9uJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmJhY2tCdXR0b25cblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLmJhY2tCdXR0b24gPSB2YWx1ZVxuXHRcdFx0dmFsdWUubmFtZSA9IEBjdXN0b20uYmFja0J1dHRvbl9uYW1lXG5cblx0XHRcdHZhbHVlLnBhcmVudCA9IEBcblx0XHRcdHZhbHVlLmJyaW5nVG9Gcm9udCgpXG5cdFx0XHRcblx0XHRcdHRyeSB2YWx1ZS5oYW5kbGVyID0gKCkgPT4gQGZsb3cuc2hvd1ByZXZpb3VzKClcblx0XG5cdEBkZWZpbmUgJ3Nob3dCYWNrJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNob3dCYWNrXG5cdFx0c2V0OiAodmFsdWUpIC0+XG5cdFx0XHRAb3B0aW9ucy5zaG93QmFjayA9IHZhbHVlXG5cdFx0XHRpZiB2YWx1ZSA9PSB0cnVlIGFuZCBAYmFja0J1dHRvbiA9PSBudWxsXG5cdFx0XHRcdEBiYWNrQnV0dG9uID0gQGNyZWF0ZV9CYWNrQnV0dG9uKClcblxuXHRcblx0Y3JlYXRlX0JhY2tCdXR0b246ICgpID0+XG5cblx0XHRyZXR1cm4gbmV3IEJ1dHRvblxuXHRcdFx0bmFtZTogQGN1c3RvbS5iYWNrQnV0dG9uX25hbWVcblx0XHRcdHBhcmVudDogQCwgc2l6ZTogODAsIHk6IDMyXG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdCMgYmFja2dyb3VuZENvbG9yOiBcInJlZFwiXG5cdFx0XHRoYW5kbGVyOiAoKSAtPiBAcGFyZW50LmZsb3cuc2hvd1ByZXZpb3VzKClcblxuXG5cdEBkZWZpbmUgXCJwYXJlbnRcIixcblx0XHRlbnVtZXJhYmxlOiBmYWxzZVxuXHRcdGV4cG9ydGFibGU6IGZhbHNlXG5cdFx0aW1wb3J0YWJsZTogdHJ1ZVxuXG5cdFx0Z2V0OiAtPlxuXHRcdFx0QF9wYXJlbnQgb3IgbnVsbFxuXHRcdFxuXHRcdHNldDogKGxheWVyKSAtPlxuXG5cdFx0XHRyZXR1cm4gaWYgbGF5ZXIgaXMgQF9wYXJlbnRcblxuXHRcdFx0dGhyb3cgRXJyb3IoXCJMYXllci5wYXJlbnQ6IGEgbGF5ZXIgY2Fubm90IGJlIGl0J3Mgb3duIHBhcmVudC5cIikgaWYgbGF5ZXIgaXMgQFxuXG5cdFx0XHQjIENoZWNrIHRoZSB0eXBlXG5cdFx0XHRpZiBub3QgbGF5ZXIgaW5zdGFuY2VvZiBMYXllclxuXHRcdFx0XHR0aHJvdyBFcnJvciBcIkxheWVyLnBhcmVudCBuZWVkcyB0byBiZSBhIExheWVyIG9iamVjdFwiXG5cblx0XHRcdCMgQ2FuY2VsIHByZXZpb3VzIHBlbmRpbmcgaW5zZXJ0aW9uc1xuXHRcdFx0VXRpbHMuZG9tQ29tcGxldGVDYW5jZWwoQF9faW5zZXJ0RWxlbWVudClcblxuXHRcdFx0IyBSZW1vdmUgZnJvbSBwcmV2aW91cyBwYXJlbnQgY2hpbGRyZW5cblx0XHRcdGlmIEBfcGFyZW50XG5cdFx0XHRcdEBfcGFyZW50Ll9jaGlsZHJlbiA9IF8ucHVsbCBAX3BhcmVudC5fY2hpbGRyZW4sIEBcblx0XHRcdFx0QF9wYXJlbnQuX2VsZW1lbnQucmVtb3ZlQ2hpbGQgQF9lbGVtZW50XG5cdFx0XHRcdEBfcGFyZW50LmVtaXQgXCJjaGFuZ2U6Y2hpbGRyZW5cIiwge2FkZGVkOiBbXSwgcmVtb3ZlZDogW0BdfVxuXHRcdFx0XHRAX3BhcmVudC5lbWl0IFwiY2hhbmdlOnN1YkxheWVyc1wiLCB7YWRkZWQ6IFtdLCByZW1vdmVkOiBbQF19XG5cblx0XHRcdCMgRWl0aGVyIGluc2VydCB0aGUgZWxlbWVudCB0byB0aGUgbmV3IHBhcmVudCBlbGVtZW50IG9yIGludG8gZG9tXG5cdFx0XHRpZiBsYXllclxuXHRcdFx0XHRsYXllci5fZWxlbWVudC5hcHBlbmRDaGlsZCBAX2VsZW1lbnRcblx0XHRcdFx0bGF5ZXIuX2NoaWxkcmVuLnB1c2ggQFxuXHRcdFx0XHRsYXllci5lbWl0IFwiY2hhbmdlOmNoaWxkcmVuXCIsIHthZGRlZDogW0BdLCByZW1vdmVkOiBbXX1cblx0XHRcdFx0bGF5ZXIuZW1pdCBcImNoYW5nZTpzdWJMYXllcnNcIiwge2FkZGVkOiBbQF0sIHJlbW92ZWQ6IFtdfVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAX2luc2VydEVsZW1lbnQoKVxuXG5cdFx0XHRvbGRQYXJlbnQgPSBAX3BhcmVudFxuXHRcdFx0IyBTZXQgdGhlIHBhcmVudFxuXHRcdFx0QF9wYXJlbnQgPSBsYXllclxuXG5cdFx0XHQjIFBsYWNlIHRoaXMgbGF5ZXIgb24gdG9wIG9mIGl0cyBzaWJsaW5nc1xuXHRcdFx0QGJyaW5nVG9Gcm9udCgpXG5cblx0XHRcdEBlbWl0IFwiY2hhbmdlOnBhcmVudFwiLCBAX3BhcmVudCwgb2xkUGFyZW50XG5cdFx0XHRAZW1pdCBcImNoYW5nZTpzdXBlckxheWVyXCIsIEBfcGFyZW50LCBvbGRQYXJlbnRcblxuXHRcdFx0QHdpZHRoID0gQHBhcmVudC53aWR0aFxuXHRcdFx0QGhlaWdodCA9IEBwYXJlbnQuaGVpZ2h0XG5cblx0XHRcdEBmbG93ID0gQHBhcmVudFxuXG5cdFxuXG5cblx0YWRkOiAoY29udGVudFZpZXcpIC0+XG5cdFx0Y29udGVudFZpZXcucGFyZW50ID0gQGNvbnRlbnRcblxuXG5cbm1vZHVsZS5leHBvcnRzID0geyBGbG93VmlldywgTmF2aWdhdGlvblZpZXcsIE1vZGFsVmlldyB9IiwiXG5cbntJbml0Vmlld30gPSByZXF1aXJlIFwiSW5pdFZpZXdcIlxuXG5vdmVycmlkZVRpbWVWYWx1ZSA9IFwiMjA6MjFcIlxuXG5jbGFzcyBleHBvcnRzLlBob25lVHlwZVZpZXcgZXh0ZW5kcyBJbml0Vmlld1xuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHN0YXR1c0JhcjogXCJkYXJrXCIgIyBsaWdodC9kYXJrXG5cdFx0XHRob21lQmFyOiBcImRhcmtcIiAjIGxpZ2h0L2RhcmtcblxuXHRcdFx0dmlzaWJsZTogdHJ1ZSAjIHRydWUgLyBmYWxzZVxuXHRcdFx0Zm9yY2VBbmRyb2lkQmFyOiBmYWxzZSAjIHRydWUgLyBmYWxzZVxuXG5cdFx0XHQjIG92ZXJyaWRlIHdpdGggY2FyZVxuXHRcdFx0cHJvdG90eXBlQ3JlYXRpb25ZZWFyOiBvdmVycmlkZVRpbWVWYWx1ZVxuXG5cdFx0XHQjIGdldHRlcnNcblx0XHRcdHN0YXR1c0JhclZpZXc6IG51bGxcblx0XHRcdGhvbWVCYXJWaWV3OiBudWxsXG5cdFx0XHRcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcblxuXG5cdEBkZWZpbmUgJ3N0YXR1c0JhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zdGF0dXNCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc3RhdHVzQmFyID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2hvbWVCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaG9tZUJhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ob21lQmFyID0gdmFsdWVcblxuXHRAZGVmaW5lICdmb3JjZUFuZHJvaWRCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuZm9yY2VBbmRyb2lkQmFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZEJhciA9IHZhbHVlXG5cdFxuXG5cdEBkZWZpbmUgJ3Nob3dCYXJzJyxcblx0XHRnZXQ6IC0+IGlmIEBvcHRpb25zLnZpc2libGUgdGhlbiByZXR1cm4gMSBlbHNlIHJldHVybiAwXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnZpc2libGUgPSB2YWx1ZVxuXG5cdCMgZGVwcmVjYXRlZFxuXHRAZGVmaW5lICd2aXNpYmxlJyxcblx0XHRnZXQ6IC0+IGlmIEBvcHRpb25zLnZpc2libGUgdGhlbiByZXR1cm4gMSBlbHNlIHJldHVybiAwXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnZpc2libGUgPSB2YWx1ZVxuXHRcblxuXG5cdEBkZWZpbmUgJ3Byb3RvdHlwZUNyZWF0aW9uWWVhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5wcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyID0gdmFsdWVcblxuXG5cblx0QGRlZmluZSAnc3RhdHVzQmFyVmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zdGF0dXNCYXJWaWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnN0YXR1c0JhclZpZXcgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnaG9tZUJhclZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaG9tZUJhclZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuaG9tZUJhclZpZXcgPSB2YWx1ZVxuXG5cblxuXG5cdCMgQ3JlYXRlIEJhcnNcblxuXHRjcmVhdGVCYXJzOiAoKSA9PlxuXHRcdEBzdGF0dXNCYXJWaWV3ID0gbmV3IExheWVyIFxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogQHdpZHRoLCB5OiBBbGlnbi50b3AsIG5hbWU6IFwiLnN0YXR1cyBiYXJcIlxuXHRcdFx0b3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGlmIEBmb3JjZUFuZHJvaWRCYXJcblx0XHRcdEBjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0JhcihAc3RhdHVzQmFyVmlldykgXG5cblx0XHRlbHNlIGlmIEB2aWV3U2l6ZSgzNzUsIDgxMikgb3IgQHZpZXdTaXplKDM5MCwgODQ0KSBvciBAdmlld1NpemUoNDE0LCA4OTYpIG9yIEB2aWV3U2l6ZSg0MjgsIDkyNikgb3IgQHZpZXdTaXplKDM2MCwgNzgyKVxuXHRcdFx0QGNyZWF0ZU5vdGNoU3RhdHVzQmFyKEBzdGF0dXNCYXJWaWV3KVxuXHRcdFx0QGNyZWF0ZUhvbWVJbmRpY2F0b3IgbmV3IExheWVyXG5cdFx0XHRcdHBhcmVudDogQCwgd2lkdGg6IEB3aWR0aCwgaGVpZ2h0OiAzNCwgeTogQWxpZ24uYm90dG9tLCBuYW1lOiBcIi5ob21lIGJhclwiLCBvcGFjaXR5OiBAdmlzaWJsZSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG5cdFx0ZWxzZSBpZiBAdmlld1NpemUoMzkzLCA4NTIpXG5cdFx0XHRwcmludCBcIm9rXCJcblx0XHRcdEBjcmVhdGVOb3RjaFN0YXR1c0JhcihAc3RhdHVzQmFyVmlldylcblx0XHRcdEBjcmVhdGVIb21lSW5kaWNhdG9yIG5ldyBMYXllclxuXHRcdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiBAd2lkdGgsIGhlaWdodDogMzQsIHk6IEFsaWduLmJvdHRvbSwgbmFtZTogXCIuaG9tZSBiYXJcIiwgb3BhY2l0eTogQHZpc2libGUsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM3NSwgNjY3KSBvciBAdmlld1NpemUoNDE0LCA3MzYpIG9yIEB2aWV3U2l6ZSgzMjAsIDU2OClcblx0XHRcdEBjcmVhdGVDbGFzc2ljU3RhdHVzQmFyKEBzdGF0dXNCYXJWaWV3KVxuXHRcdFxuXHRcdFxuXHRcdGVsc2UgQGNyZWF0ZUFuZHJvaWRTdGF0dXNCYXIoQHN0YXR1c0JhclZpZXcpXG5cdFxuXHRcblx0XG5cdFxuXG5cblxuXHRjcmVhdGVBbmRyb2lkU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gMzJcblx0XHRcblx0XHRjbGFzc2ljQ2VudGVyQ29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDUyLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5sZWZ0KDQpLCB5OiBBbGlnbi50b3AoMiArIDUpXG5cdFx0XHRjb2xvcjogQGFzc2V0cy5jb2xvcltAc3RhdHVzQmFyXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTQsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ucmlnaHQoLTQpLCB5OiBBbGlnbi50b3AoNSlcblx0XHRcdGltYWdlOiBAYXNzZXRzLmFuZHJvaWRTdGF0dXNCYXJSaWdodEltYWdlW0BzdGF0dXNCYXJdXG5cdFxuXHRcblx0Y3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXI6IChiYXJMYXllcikgPT5cblx0XHRiYXJMYXllci5oZWlnaHQgPSAyMFxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTIsIGhlaWdodDogMjAsIHg6IEFsaWduLmxlZnQsIHk6IEFsaWduLnRvcCgyKVxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbQHN0YXR1c0Jhcl0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDE0LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogMjAsIHg6IEFsaWduLnJpZ2h0LCB5OiBBbGlnbi50b3AoKVxuXHRcdFx0aW1hZ2U6IEBhc3NldHMuYW5kcm9pZFN0YXR1c0JhclJpZ2h0SW1hZ2VbQHN0YXR1c0Jhcl1cblx0XG5cdFxuXG5cblxuXHRjcmVhdGVDbGFzc2ljU3RhdHVzQmFyOiAoYmFyTGF5ZXIpID0+XG5cdFx0YmFyTGF5ZXIuaGVpZ2h0ID0gMjBcblx0XHRcblx0XHRjbGFzc2ljTGVmdENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLmxlZnRcblx0XHRcdGltYWdlOiBAYXNzZXRzLm9sZFN0YXR1c0JhckxlZnRJbWFnZVtAc3RhdHVzQmFyXVxuXHRcdFxuXHRcdGNsYXNzaWNDZW50ZXJDb21wb25lbnQgPSBuZXcgVGV4dExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogNTQsIGhlaWdodDogMTYsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uY2VudGVyXG5cdFx0XHRjb2xvcjogQGFzc2V0cy5jb2xvcltAc3RhdHVzQmFyXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDEwMCwgaGVpZ2h0OiBiYXJMYXllci5oZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogQGFzc2V0cy5vbGRTdGF0dXNCYXJSaWdodEltYWdlW0BzdGF0dXNCYXJdXG5cdFx0XG5cdFxuXHRjcmVhdGVOb3RjaFN0YXR1c0JhcjogKGJhckxheWVyKSA9PlxuXHRcdGJhckxheWVyLmhlaWdodCA9IDQ0XG5cdFx0XG5cdFx0bm90Y2hMZWZ0Q29tcG9uZW50ID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBiYXJMYXllciwgd2lkdGg6IDU0LCBoZWlnaHQ6IDIxLCB4OiBBbGlnbi5sZWZ0KDIxKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0Y29sb3I6IEBhc3NldHMuY29sb3JbQHN0YXR1c0Jhcl0sIGJhY2tncm91bmRDb2xvcjogbnVsbCwgbGV0dGVyU3BhY2luZzogLTAuMTdcblx0XHRcdGZvbnRTaXplOiAxNSwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdG5vdGNoQ2VudGVyQ29tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMzc1LCBoZWlnaHQ6IGJhckxheWVyLmhlaWdodCwgeDogQWxpZ24uY2VudGVyXG5cdFx0XHRpbWFnZTogQGFzc2V0cy5ub3RjaFxuXHRcdFxuXHRcdG5vdGNoUmlnaHRDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogYmFyTGF5ZXIsIHdpZHRoOiAxMDAsIGhlaWdodDogYmFyTGF5ZXIuaGVpZ2h0LCB4OiBBbGlnbi5yaWdodFxuXHRcdFx0aW1hZ2U6IEBhc3NldHMuc3RhdHVzQmFyUmlnaHRJbWFnZVtAc3RhdHVzQmFyXVxuXHRcblx0XG5cdFxuXG5cblxuXHRjcmVhdGVIb21lSW5kaWNhdG9yOiAoYmFyTGF5ZXIpID0+XG5cdFx0QGhvbWVCYXJWaWV3ID0gbmV3IExheWVyXG5cdFx0XHRuYW1lOiBcIi5ob21lVmlld1wiXG5cdFx0XHRwYXJlbnQ6IGJhckxheWVyLCB3aWR0aDogMTM1LCBoZWlnaHQ6IDUsIHg6IEFsaWduLmNlbnRlciwgeTogQWxpZ24uYm90dG9tKC04KVxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBAYXNzZXRzLmNvbG9yW0Bob21lQmFyXSwgYm9yZGVyUmFkaXVzOiAyMFxuXHRcblx0IiwiIyBQcmV2aWV3IENvbXBvbmVudFxuXG5GcmFtZXIuRGVmYXVsdHMuQW5pbWF0aW9uID1cblx0Y3VydmU6IFNwcmluZyhkYW1waW5nOiAxKVxuXHR0aW1lOiAwLjVcblxuIyB7UHJldmlld19DbGFzc30gPSByZXF1aXJlIFwiUHJldmlld19DbGFzc1wiXG4jIHtQcmV2aWV3X0luaXR9ID0gcmVxdWlyZSBcIlByZXZpZXdfSW5pdFwiXG57UHJldmlld19VSX0gPSByZXF1aXJlIFwiUHJldmlld19VSVwiXG4jIHtDb250cm9sX0NsYXNzfSA9IHJlcXVpcmUgXCJDb250cm9sX0NsYXNzXCJcblxuY2xhc3MgRml4UHJldmlld0V4cG9ydCBleHRlbmRzIFByZXZpZXdfVUlcbmNsYXNzIGV4cG9ydHMuUHJldmlldyBleHRlbmRzIEZpeFByZXZpZXdFeHBvcnRcblxuXG5cblxuIyBOYXRpdmVcblxuYHdpbmRvdy5zYXZlUHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QgPSBmdW5jdGlvbiAobGF5ZXIpIHtcblx0d2luZG93LnByZXZpZXdNZXNzYWdlRnJhbWVyT2JqZWN0ID0gbGF5ZXJcbn1cbmBcblxuYHdpbmRvdy5yZWNlaXZlTWVzc2FnZU5vcm1hbCA9IGZ1bmN0aW9uIChldmVudCkge1xuXHR3aW5kb3cucHJldmlld01lc3NhZ2VGcmFtZXJPYmplY3QuYW5pbWF0ZVN0YXRlVG9Ob3JtYWwoKVxufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRlTm9ybWFsXCIsIHJlY2VpdmVNZXNzYWdlTm9ybWFsLCBmYWxzZSk7XG5gXG5cbmB3aW5kb3cucmVjZWl2ZU1lc3NhZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0Y29uc29sZS5sb2coZXZlbnQpXG5cdHdpbmRvdy5wcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdC5hbmltYXRlU3RhdGVUb0ZpbGwoKVxufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRlRmlsbFwiLCByZWNlaXZlTWVzc2FnZSwgZmFsc2UpO1xuYFxuXG5cblxuXG5cblxuIiwiXG5cbmV4cG9ydHMuZGF0YSA9XG5cdGNvbG9yOlxuXHRcdGRhcms6IFwiIzAwMFwiXG5cdFx0bGlnaHQ6IFwiI0ZGRlwiXG5cdFxuXG5cdFxuXHRzdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRvbGRTdGF0dXNCYXJMZWZ0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfbGVmdF9saWdodC5wbmdcIlxuXHRvbGRTdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRhbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9hbmRyb2lkU3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvYW5kcm9pZFN0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRcblxuXG5cdG5vdGNoOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfbm90Y2gucG5nXCJcblx0dGlwOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy90aXAucG5nXCJcbiIsIlxuXG5vdmVycmlkZVRpbWVWYWx1ZSA9IFwiMjA6MjFcIlxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXdfQ2xhc3MgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0c3RhdGVHdWFyZExheWVyID0gbmV3IExheWVyIHsgb3BhY2l0eTogMCwgc2l6ZTogMSB9XG5cdFx0c3RhdGVHdWFyZExheWVyLnN0YXRlcyA9XG5cdFx0XHRcIm5vcm1hbFwiOiB7IHNjYWxlOiAxIH1cblx0XHRcdFwiZmlsbFwiOiB7IHNjYWxlOiAxIH1cblx0XHRzdGF0ZUd1YXJkTGF5ZXIuc3RhdGVTd2l0Y2goXCJmaWxsXCIpXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0bmFtZTogXCJQcmV2aWV3XCJcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Ym9yZGVyUmFkaXVzOiA0MlxuXG5cdFx0XHRzdGF0ZUd1YXJkOiBzdGF0ZUd1YXJkTGF5ZXJcblx0XHRcdHZpZXc6IG51bGxcblxuXHRcdFx0Ym9yZGVyVmlldzogbnVsbFxuXHRcdFx0c3RhdHVzQmFyVmlldzogbnVsbFxuXHRcdFx0aG9tZUJhclZpZXc6IG51bGxcblxuXHRcdFx0Y29uZmlnVmlldzogbnVsbFxuXHRcdFx0c2VjdGlvblZpZXc6IG51bGxcblx0XHRcdFxuXG5cblx0XHRcdCMgRGV2aWNlXG5cdFx0XHRzaG93RGV2aWNlOiB0cnVlXG5cblx0XHRcdCMgQmFyc1xuXHRcdFx0c2hvd0JhcnM6IHRydWVcblx0XHRcdHNob3dTdGF0dXNCYXI6IHRydWVcblx0XHRcdHNob3dIb21lQmFyOiB0cnVlXG5cblx0XHRcdHRpbWVWYWx1ZTogb3ZlcnJpZGVUaW1lVmFsdWUgIyBubyBvdmVycmlkZVxuXHRcdFx0Zm9yY2VBbmRyb2lkQmFyOiBmYWxzZVxuXHRcdFx0c3RhdHVzQmFyX3RoZW1lOiBcImRhcmtcIlxuXHRcdFx0aG9tZUJhcl90aGVtZTogXCJkYXJrXCJcblxuXHRcdFx0IyBDb250cm9sc1xuXHRcdFx0c2hvd1VJOiB0cnVlXG5cdFx0XHRzaG93TG9nbzogdHJ1ZVxuXHRcdFx0c2NhbGVTdGF0ZTogXCJmaWxsXCIgIyBmaWxsIC8gbm9ybWFsXG5cdFx0XHRzaG93SGludHM6IHRydWVcblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXG5cdFx0d2luZG93LnNhdmVQcmV2aWV3TWVzc2FnZUZyYW1lck9iamVjdChAKVxuXHRcdEB1cGRhdGVJbml0KClcblx0XHRcblx0XHRAc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgc2NhbGU6IDEgfVxuXHRcdFx0XCJmaWxsXCI6IHsgc2NhbGU6IDEgfVxuXG5cblxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnZpZXcgPSB2YWx1ZVxuXHRcdFx0QHdpZHRoID0gQHZpZXcud2lkdGhcblx0XHRcdEBoZWlnaHQgPSBAdmlldy5oZWlnaHRcblx0XHRcdEB2aWV3LnBhcmVudCA9IEBcblx0XG5cdEBkZWZpbmUgJ3N0YXRlR3VhcmQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc3RhdGVHdWFyZFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zdGF0ZUd1YXJkID0gdmFsdWVcblxuXG5cblx0QGRlZmluZSAnZGV2aWNlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmJvcmRlclZpZXdcblx0XG5cdEBkZWZpbmUgJ3N0YXR1c0JhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zdGF0dXNCYXJWaWV3XG5cdFxuXHRAZGVmaW5lICdob21lQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmhvbWVCYXJWaWV3XG5cblxuXG5cdEBkZWZpbmUgJ2JvcmRlclZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuYm9yZGVyVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5ib3JkZXJWaWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3N0YXR1c0JhclZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc3RhdHVzQmFyVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zdGF0dXNCYXJWaWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2hvbWVCYXJWaWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmhvbWVCYXJWaWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmhvbWVCYXJWaWV3ID0gdmFsdWVcblxuXG5cblx0QGRlZmluZSAnY29uZmlnVmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5jb25maWdWaWV3XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmNvbmZpZ1ZpZXcgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnc2VjdGlvblZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2VjdGlvblZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2VjdGlvblZpZXcgPSB2YWx1ZVxuXHRcblxuXHRcblx0XG5cdFxuXG5cdGFuaW1hdGVTdGF0ZVRvTm9ybWFsOiAoKSA9PlxuXHRcdEBzdGF0ZUd1YXJkLnN0YXRlU3dpdGNoKFwibm9ybWFsXCIpXG5cdFx0QGFuaW1hdGUoc2NhbGU6IEBzdGF0ZXNbXCJub3JtYWxcIl0uc2NhbGUsIG9wdGlvbnM6IHsgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41IH0pXG5cdFx0aWYgQGJvcmRlclZpZXcgdGhlbiBAYm9yZGVyVmlldy5hbmltYXRlU3RhdGVUb05vcm1hbCgpXG5cdFxuXHRhbmltYXRlU3RhdGVUb0ZpbGw6ICgpID0+XG5cdFx0QHN0YXRlR3VhcmQuc3RhdGVTd2l0Y2goXCJmaWxsXCIpXG5cdFx0QGFuaW1hdGUoc2NhbGU6IEBzdGF0ZXNbXCJmaWxsXCJdLnNjYWxlLCBvcHRpb25zOiB7IGN1cnZlOiBTcHJpbmcoZGFtcGluZzogMSksIHRpbWU6IDAuNSB9KVxuXHRcdGlmIEBib3JkZXJWaWV3IHRoZW4gQGJvcmRlclZpZXcuYW5pbWF0ZVN0YXRlVG9GaWxsKClcblxuXHRzdGF0ZVN3aXRjaFRvTm9ybWFsOiAoKSA9PlxuXHRcdEBzdGF0ZUd1YXJkLnN0YXRlU3dpdGNoKFwibm9ybWFsXCIpXG5cdFx0QGFuaW1hdGUoc2NhbGU6IEBzdGF0ZXNbXCJub3JtYWxcIl0uc2NhbGUsIG9wdGlvbnM6IHsgY3VydmU6IEJlemllci5saW5lYXIsIHRpbWU6IDAgfSlcblx0XHRpZiBAYm9yZGVyVmlldyB0aGVuIEBib3JkZXJWaWV3LnN0YXRlU3dpdGNoVG9Ob3JtYWwoKVxuXHRcblx0c3RhdGVTd2l0Y2hUb0ZpbGw6ICgpID0+XG5cdFx0QHN0YXRlR3VhcmQuc3RhdGVTd2l0Y2goXCJmaWxsXCIpXG5cdFx0QGFuaW1hdGUoc2NhbGU6IEBzdGF0ZXNbXCJmaWxsXCJdLnNjYWxlLCBvcHRpb25zOiB7IGN1cnZlOiBCZXppZXIubGluZWFyLCB0aW1lOiAwIH0pXG5cdFx0aWYgQGJvcmRlclZpZXcgdGhlbiBAYm9yZGVyVmlldy5zdGF0ZVN3aXRjaFRvRmlsbCgpXG5cdFxuXG5cdFxuXHRcblxuXHRAZGVmaW5lICdzaG93RGV2aWNlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNob3dEZXZpY2Vcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0RldmljZSA9IHZhbHVlXG5cdFxuXG5cblx0QGRlZmluZSAnc2hvd0JhcnMnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2hvd0JhcnNcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0JhcnMgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnc2hvd1N0YXR1c0JhcicsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93U3RhdHVzQmFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNob3dTdGF0dXNCYXIgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnc2hvd0hvbWVCYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2hvd0hvbWVCYXJcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0hvbWVCYXIgPSB2YWx1ZVxuXG5cblxuXG5cblx0QGRlZmluZSAndGltZVZhbHVlJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRpbWVWYWx1ZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50aW1lVmFsdWUgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnZm9yY2VBbmRyb2lkQmFyJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLmZvcmNlQW5kcm9pZEJhclxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRCYXIgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnc3RhdHVzQmFyX3RoZW1lJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnN0YXR1c0Jhcl90aGVtZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zdGF0dXNCYXJfdGhlbWUgPSB2YWx1ZVxuXHRcblx0QGRlZmluZSAnaG9tZUJhcl90aGVtZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5ob21lQmFyX3RoZW1lXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmhvbWVCYXJfdGhlbWUgPSB2YWx1ZVxuXG5cblxuXG5cdEBkZWZpbmUgJ3Nob3dVSScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93VUlcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd1VJID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3Nob3dMb2dvJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnNob3dMb2dvXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnNob3dMb2dvID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3Nob3dIaW50cycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5zaG93SGludHNcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuc2hvd0hpbnRzID0gdmFsdWVcblx0XG5cdFxuXHRcblxuXG5cdEBkZWZpbmUgJ3NjYWxlU3RhdGUnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2NhbGVTdGF0ZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5zY2FsZVN0YXRlID0gdmFsdWVcblx0XG5cblxuXG5cblxuXG5cblx0dXBkYXRlSW5pdDogKCkgPT5cblxuXHRcdEBzY2FsZVN0YXRlID0gQGdldFN0YXRlR2VuZXJpYyhcInNjYWxlXCIsIFt7IHZhbHVlOiBcImZpbGxcIiwgcmVzdWx0OiBcImZpbGxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJub3JtYWxcIiwgcmVzdWx0OiBcIm5vcm1hbFwiIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogXCJub3JtYWxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogXCJmaWxsXCIgfV0sIEBzY2FsZVN0YXRlKVxuXHRcdFxuXHRcdEBzY2FsZVN0YXRlID0gQGdldFN0YXRlR2VuZXJpYyhcImZpbGxcIiwgW3sgdmFsdWU6IFwib25cIiwgcmVzdWx0OiBcImZpbGxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvZmZcIiwgcmVzdWx0OiBcIm5vcm1hbFwiIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcInRydWVcIiwgcmVzdWx0OiBcImZpbGxcIiB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IFwibm9ybWFsXCIgfV0sIEBzY2FsZVN0YXRlKVxuXG5cdFx0QHNob3dVSSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJidXR0b25cIiwgW3sgdmFsdWU6IFwiZmFsc2VcIiwgcmVzdWx0OiBmYWxzZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJ0cnVlXCIsIHJlc3VsdDogdHJ1ZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvblwiLCByZXN1bHQ6IHRydWUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogZmFsc2UgfV0sIEBzaG93VUkpXG5cdFx0XG5cdFx0QHNob3dVSSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJ1aVwiLCBbeyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcInRydWVcIiwgcmVzdWx0OiB0cnVlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9uXCIsIHJlc3VsdDogdHJ1ZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvZmZcIiwgcmVzdWx0OiBmYWxzZSB9XSwgQHNob3dVSSlcblxuXHRcdEBzaG93TG9nbyA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJsb2dvXCIsIFt7IHZhbHVlOiBcImZhbHNlXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwidHJ1ZVwiLCByZXN1bHQ6IHRydWUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwib25cIiwgcmVzdWx0OiB0cnVlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR7IHZhbHVlOiBcIm9mZlwiLCByZXN1bHQ6IGZhbHNlIH1dLCBAc2hvd0xvZ28pXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0XHRAc2hvd0RldmljZSA9IEBnZXRTdGF0ZUdlbmVyaWMoXCJkZXZpY2VcIiwgW3sgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvblwiLCByZXN1bHQ6IHRydWUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwidHJ1ZVwiLCByZXN1bHQ6IHRydWUgfV0sIEBzaG93RGV2aWNlKVxuXHRcdFxuXHRcdEBzaG93SGludHMgPSBAZ2V0U3RhdGVHZW5lcmljKFwiaGludHNcIiwgW3sgdmFsdWU6IFwib2ZmXCIsIHJlc3VsdDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJvblwiLCByZXN1bHQ6IHRydWUgfSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0eyB2YWx1ZTogXCJmYWxzZVwiLCByZXN1bHQ6IGZhbHNlIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHsgdmFsdWU6IFwidHJ1ZVwiLCByZXN1bHQ6IHRydWUgfV0sIEBzaG93SGludHMpXG5cblxuXG5cdCMgZ2V0U3RhdGVHZW5lcmljOiAoa2V5ID0gXCJzY2FsZVwiLCBwYWlycyA9IFt7IHZhbHVlOiAsIHJlc3VsdDogfSwge3ZhbHVlOiAsIHJlc3VsdDogfV0sIGRlZmF1bHRSZXN1bHQgPSBcIlwiKVxuXHRnZXRTdGF0ZUdlbmVyaWM6IChzdGF0ZUtleSA9IFwic2NhbGVcIiwgc3RhdGVQYWlycyA9IFtdLCBkZWZhdWx0UmVzdWx0ID0gXCJcIikgPT5cblx0XHRyZXN1bHQgPSBkZWZhdWx0UmVzdWx0XG5cblx0XHRmb3IgaXRlbSBpbiBsb2NhdGlvbi5zZWFyY2hbMS4uXS5zcGxpdCgnJicpXG5cdFx0XHRrZXlWYWx1ZVBhaXIgPSBpdGVtLnNwbGl0KFwiPVwiKVxuXHRcdFx0a2V5UGFydCA9IGtleVZhbHVlUGFpclswXVxuXHRcdFx0dmFsdWVQYXJ0ID0ga2V5VmFsdWVQYWlyWzFdXG5cblx0XHRcdGlmIGtleVBhcnQgPT0gc3RhdGVLZXlcblx0XHRcdFx0Zm9yIHBhaXIgaW4gc3RhdGVQYWlyc1xuXHRcdFx0XHRcdGlmIHZhbHVlUGFydCA9PSBwYWlyLnZhbHVlXG5cdFx0XHRcdFx0XHRyZXN1bHQgPSBwYWlyLnJlc3VsdFxuXHRcdFx0XHRcdCMgZWxzZVxuXHRcdFx0XHRcdFx0IyBwcmludCBcIm5vdCBcIiArIFwiICN7cGFpci52YWx1ZX1cIiBcblx0XHRcblx0XHRyZXR1cm4gcmVzdWx0XG5cdFxuXHRcblx0XG5cdFxuIiwiXG5cbntQcmV2aWV3X0NsYXNzfSA9IHJlcXVpcmUgXCJQcmV2aWV3X0NsYXNzXCJcbntEZXZpY2VfQ2xhc3N9ID0gcmVxdWlyZSBcIkRldmljZV9DbGFzc1wiXG5cbntIb21lQmFyX0NsYXNzfSA9IHJlcXVpcmUgXCJIb21lQmFyX0NsYXNzXCJcbntTdGF0dXNCYXJfQ2xhc3N9ID0gcmVxdWlyZSBcIlN0YXR1c0Jhcl9DbGFzc1wiXG5cbmNsYXNzIGV4cG9ydHMuUHJldmlld19Jbml0IGV4dGVuZHMgUHJldmlld19DbGFzc1xuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAc2NhbGVQcmV2aWV3KClcblxuXHRcblx0XG5cdHNjYWxlUHJldmlldzogKCkgPT5cblx0XHRpZiBVdGlscy5pc01vYmlsZSgpIHRoZW4gQHByZXZpZXdNb2JpbGUoKVxuXHRcdGVsc2UgQHByZXZpZXdEZXNrdG9wKClcblx0XG5cdHVwZGF0ZVByZXZpZXc6ICgpID0+XG5cdFx0aWYgQHN0YXRlR3VhcmQuc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcImZpbGxcIiB0aGVuIEBzdGF0ZVN3aXRjaFRvRmlsbCgpXG5cdFx0ZWxzZSBAc3RhdGVTd2l0Y2hUb05vcm1hbCgpXG5cblx0XHQjIGlmIEBib3JkZXJWaWV3XG5cdFx0IyBcdGlmIEBzY2FsZVN0YXRlID09IFwiZmlsbFwiIHRoZW4gQGJvcmRlclZpZXcuc3RhdGVTd2l0Y2hUb0ZpbGwoKVxuXHRcdCMgXHRlbHNlIEBib3JkZXJWaWV3LnN0YXRlU3dpdGNoVG9Ob3JtYWwoKVxuXHRcblxuXG5cblx0cHJldmlld0Rlc2t0b3A6ICgpID0+XG5cdFx0aWYgQHNob3dEZXZpY2UgdGhlbiBAYm9yZGVyVmlldyA9IG5ldyBEZXZpY2VfQ2xhc3MgeyB2aWV3OiBAIH1cblxuXHRcdGlmIEBzaG93SGludHMgdGhlbiBGcmFtZXIuRXh0cmFzLkhpbnRzLmVuYWJsZSgpXG5cdFx0ZWxzZSBGcmFtZXIuRXh0cmFzLkhpbnRzLmRpc2FibGUoKVxuXG5cdFx0aWYgQHNob3dCYXJzXG5cdFx0XHRpZiBAc2hvd0hvbWVCYXIgdGhlbiBAaG9tZUJhclZpZXcgPSBuZXcgSG9tZUJhcl9DbGFzcyB7IHZpZXc6IEAgfVxuXHRcdFx0aWYgQHNob3dTdGF0dXNCYXIgdGhlbiBAc3RhdHVzQmFyVmlldyA9IG5ldyBTdGF0dXNCYXJfQ2xhc3MgeyB2aWV3OiBAIH1cblxuXHRcdEBjbGlwID0gdHJ1ZVxuXHRcdEB1cGRhdGVTY2FsZSgpXG5cdFx0QHVwZGF0ZVByZXZpZXdPblJlc2l6ZSgpXG5cdFx0XG5cdFx0aWYgQHNjYWxlU3RhdGUgPT0gXCJmaWxsXCIgdGhlbiBAc3RhdGVTd2l0Y2hUb0ZpbGwoKVxuXHRcdGVsc2UgQHN0YXRlU3dpdGNoVG9Ob3JtYWwoKVxuXG5cdFxuXHRwcmV2aWV3TW9iaWxlOiAoKSA9PlxuXHRcdEZyYW1lci5FeHRyYXMuSGludHMuZGlzYWJsZSgpXG5cdFx0XG5cdFx0QHNjYWxlID0gU2NyZWVuLndpZHRoIC8gQHdpZHRoXG5cdFx0QHggPSBBbGlnbi5jZW50ZXJcblx0XHRAeSA9IEFsaWduLmNlbnRlclxuXG5cdFxuXG5cdHVwZGF0ZVNjYWxlOiAoKSA9PlxuXG5cdFx0QHggPSBBbGlnbi5jZW50ZXJcblx0XHRAeSA9IEFsaWduLmNlbnRlclxuXG5cdFx0aWYgQGJvcmRlclZpZXdcblx0XHRcdEBib3JkZXJWaWV3LnggPSBBbGlnbi5jZW50ZXJcblx0XHRcdEBib3JkZXJWaWV3LnkgPSBBbGlnbi5jZW50ZXJcblxuXHRcdHNjYWxlWCA9IChTY3JlZW4ud2lkdGggLSAxMTIpIC8gQHdpZHRoXG5cdFx0c2NhbGVZID0gKFNjcmVlbi5oZWlnaHQgLSAxMTIpIC8gQGhlaWdodFxuXHRcdEBzdGF0ZXNbXCJmaWxsXCJdLnNjYWxlID0gTWF0aC5taW4oc2NhbGVYLCBzY2FsZVkpXG5cblx0XHRpZiBAYm9yZGVyVmlld1xuXHRcdFx0QGJvcmRlclZpZXcuc3RhdGVzW1wiZmlsbFwiXS5zY2FsZSA9IEBzdGF0ZXNbXCJmaWxsXCJdLnNjYWxlXG5cblxuXG5cblxuXG5cblxuXHR1cGRhdGVQcmV2aWV3T25SZXNpemU6ICgpID0+XG5cdFx0bG9jYWxQcmV2aWV3ID0gQFxuXHRcdFxuXHRcdENhbnZhcy5vbiBcImNoYW5nZTpoZWlnaHRcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZSgpXG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlUHJldmlldygpXG5cdFx0XG5cdFx0Q2FudmFzLm9uIFwiY2hhbmdlOndpZHRoXCIsID0+XG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlU2NhbGUoKVxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVByZXZpZXcoKVxuXHRcdFxuXG5cdFx0U2NyZWVuLm9uIFwiY2hhbmdlOmhlaWdodFwiLCA9PlxuXHRcdFx0bG9jYWxQcmV2aWV3LnVwZGF0ZVNjYWxlKClcblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVQcmV2aWV3KClcblx0XHRcblx0XHRTY3JlZW4ub24gXCJjaGFuZ2U6d2lkdGhcIiwgPT5cblx0XHRcdGxvY2FsUHJldmlldy51cGRhdGVTY2FsZSgpXG5cdFx0XHRsb2NhbFByZXZpZXcudXBkYXRlUHJldmlldygpXG5cdFxuXHRcblxuXG4iLCIjIExvZ29cblxuY2xhc3MgZXhwb3J0cy5Mb2dvTGF5ZXIgZXh0ZW5kcyBTVkdMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRvcGFjaXR5OiAwLjVcblx0XHRcdGhhbmRsZXI6IG51bGxcblx0XHRcdHN2ZzogZ2V0TG9nbyhcIkZGRlwiKVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QHN0eWxlID0gY3Vyc29yOiBcInBvaW50ZXJcIlxuXHRcdFxuXHRcdEAub25Nb3VzZU92ZXIgQEhvdmVyXG5cdFx0QC5vbk1vdXNlT3V0IEBIb3Zlck9mZlxuXHRcblx0QGRlZmluZSAnaGFuZGxlcicsXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvbihFdmVudHMuVGFwLCB2YWx1ZSlcblx0XG5cdEhvdmVyOiA9PlxuXHRcdEBvcGFjaXR5ID0gMC44XG5cdEhvdmVyT2ZmOiA9PlxuXHRcdEBvcGFjaXR5ID0gMC41XG5cblxuXG5nZXRMb2dvID0gKHdpdGhDb2xvcikgLT5cblx0c2VsZWN0ZWRDb2xvciA9IFwiI0ZGRkZGRlwiXG5cdHJldHVybiBcIlwiXCI8c3ZnIHdpZHRoPVwiNzZcIiBoZWlnaHQ9XCIzMlwiIHZpZXdCb3g9XCIwIDAgNzYgMzJcIiBmaWxsPVwibm9uZVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbjxwYXRoIGQ9XCJNMi43OTE5OSAyMS42QzIuNzkxOTkgMjEuMTY4IDIuOTAzOTkgMjAuNDA4IDMuMTI3OTkgMTkuMzJMNC4zOTk5OSAxMi44NEgyLjk4Mzk5TDMuMDc5OTkgMTIuMTJDNC45OTk5OSAxMS41NDQgNi44ODc5OSAxMC41NTIgOC43NDM5OSA5LjE0Mzk4SDkuODk1OTlMOS4zMTk5OSAxMS43NkgxMS4xOTJMMTAuOTc2IDEyLjg0SDkuMTI3OTlMNy45MDM5OSAxOS4zMkM3LjY5NTk5IDIwLjMxMiA3LjU5MTk5IDIwLjk3NiA3LjU5MTk5IDIxLjMxMkM3LjU5MTk5IDIyLjA4IDcuOTI3OTkgMjIuNTQ0IDguNTk5OTkgMjIuNzA0QzguNDM5OTkgMjMuMjQ4IDguMDcxOTkgMjMuNjggNy40OTU5OSAyNEM2LjkxOTk5IDI0LjMyIDYuMjIzOTkgMjQuNDggNS40MDc5OSAyNC40OEM0LjU5MTk5IDI0LjQ4IDMuOTUxOTkgMjQuMjI0IDMuNDg3OTkgMjMuNzEyQzMuMDIzOTkgMjMuMiAyLjc5MTk5IDIyLjQ5NiAyLjc5MTk5IDIxLjZaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTE3LjU1OTkgMjIuNjhDMTcuMDYzOSAyMy44OCAxNi4wMjM5IDI0LjQ4IDE0LjQzOTkgMjQuNDhDMTMuNjIzOSAyNC40OCAxMi45NTk5IDI0LjIgMTIuNDQ3OSAyMy42NEMxMi4wMTU5IDIzLjE0NCAxMS43OTk5IDIyLjY0OCAxMS43OTk5IDIyLjE1MkMxMS43OTk5IDIwLjg1NiAxMi4wOTU5IDE4Ljk0NCAxMi42ODc5IDE2LjQxNkwxMy41NzU5IDExLjc2TDE4LjQ0NzkgMTEuMjhMMTYuOTgzOSAxOC44NjRDMTYuNzExOSAyMC4wNDggMTYuNTc1OSAyMC44NDggMTYuNTc1OSAyMS4yNjRDMTYuNTc1OSAyMi4xNzYgMTYuOTAzOSAyMi42NDggMTcuNTU5OSAyMi42OFpNMTQuMDA3OSA4LjQyMzk4QzE0LjAwNzkgNy43OTk5OCAxNC4yNjM5IDcuMzE5OTggMTQuNzc1OSA2Ljk4Mzk4QzE1LjMwMzkgNi42NDc5OCAxNS45NDM5IDYuNDc5OTggMTYuNjk1OSA2LjQ3OTk4QzE3LjQ0NzkgNi40Nzk5OCAxOC4wNDc5IDYuNjQ3OTggMTguNDk1OSA2Ljk4Mzk4QzE4Ljk1OTkgNy4zMTk5OCAxOS4xOTE5IDcuNzk5OTggMTkuMTkxOSA4LjQyMzk4QzE5LjE5MTkgOS4wNDc5OCAxOC45MzU5IDkuNTE5OTggMTguNDIzOSA5LjgzOTk4QzE3LjkyNzkgMTAuMTYgMTcuMzAzOSAxMC4zMiAxNi41NTE5IDEwLjMyQzE1Ljc5OTkgMTAuMzIgMTUuMTgzOSAxMC4xNiAxNC43MDM5IDkuODM5OThDMTQuMjM5OSA5LjUxOTk4IDE0LjAwNzkgOS4wNDc5OCAxNC4wMDc5IDguNDIzOThaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTI2LjA2MDYgMjIuNjhDMjUuNTY0NiAyMy44OCAyNC41MjQ2IDI0LjQ4IDIyLjk0MDYgMjQuNDhDMjIuMTQwNiAyNC40OCAyMS40ODQ2IDI0LjIgMjAuOTcyNiAyMy42NEMyMC41NTY2IDIzLjE3NiAyMC4zNDg2IDIyLjY4IDIwLjM0ODYgMjIuMTUyQzIwLjM0ODYgMjAuOTUyIDIwLjYyODYgMTkuMDQgMjEuMTg4NiAxNi40MTZMMjIuOTQwNiA3LjE5OTk4TDI3LjgxMjYgNi43MTk5OEwyNS40ODQ2IDE4Ljg2NEMyNS4yMTI2IDIwLjA0OCAyNS4wNzY2IDIwLjg0OCAyNS4wNzY2IDIxLjI2NEMyNS4wNzY2IDIyLjE3NiAyNS40MDQ2IDIyLjY0OCAyNi4wNjA2IDIyLjY4WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPHBhdGggZD1cIk0zNC41NjE4IDIyLjY4QzM0LjA2NTggMjMuODggMzMuMDI1OCAyNC40OCAzMS40NDE4IDI0LjQ4QzMwLjY0MTggMjQuNDggMjkuOTg1OCAyNC4yIDI5LjQ3MzggMjMuNjRDMjkuMDU3OCAyMy4xNzYgMjguODQ5OCAyMi42OCAyOC44NDk4IDIyLjE1MkMyOC44NDk4IDIwLjk1MiAyOS4xMjk4IDE5LjA0IDI5LjY4OTggMTYuNDE2TDMxLjQ0MTggNy4xOTk5OEwzNi4zMTM4IDYuNzE5OThMMzMuOTg1OCAxOC44NjRDMzMuNzEzOCAyMC4wNDggMzMuNTc3OCAyMC44NDggMzMuNTc3OCAyMS4yNjRDMzMuNTc3OCAyMi4xNzYgMzMuOTA1OCAyMi42NDggMzQuNTYxOCAyMi42OFpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNDMuMDYzMSAyMi42OEM0Mi41NjcxIDIzLjg4IDQxLjUyNzEgMjQuNDggMzkuOTQzMSAyNC40OEMzOS4xNDMxIDI0LjQ4IDM4LjQ4NzEgMjQuMiAzNy45NzUxIDIzLjY0QzM3LjU1OTEgMjMuMTc2IDM3LjM1MTEgMjIuNjggMzcuMzUxMSAyMi4xNTJDMzcuMzUxMSAyMC45NTIgMzcuNjMxMSAxOS4wNCAzOC4xOTExIDE2LjQxNkwzOS45NDMxIDcuMTk5OThMNDQuODE1MSA2LjcxOTk4TDQyLjQ4NzEgMTguODY0QzQyLjIxNTEgMjAuMDQ4IDQyLjA3OTEgMjAuODQ4IDQyLjA3OTEgMjEuMjY0QzQyLjA3OTEgMjIuMTc2IDQyLjQwNzEgMjIuNjQ4IDQzLjA2MzEgMjIuNjhaXCIgZmlsbD1cIiN7c2VsZWN0ZWRDb2xvcn1cIi8+XG48cGF0aCBkPVwiTTUzLjUzMjMgMjIuOTkyQzUyLjc2NDMgMjMuOTg0IDUxLjQyODMgMjQuNDggNDkuNTI0MyAyNC40OEM0OC41MzIzIDI0LjQ4IDQ3LjY3NjMgMjQuMTg0IDQ2Ljk1NjMgMjMuNTkyQzQ2LjIzNjMgMjIuOTg0IDQ1Ljg3NjMgMjIuMjQ4IDQ1Ljg3NjMgMjEuMzg0QzQ1Ljg3NjMgMjAuOTA0IDQ1LjkwMDMgMjAuNTQ0IDQ1Ljk0ODMgMjAuMzA0TDQ3LjU1NjMgMTEuNzZMNTIuNDI4MyAxMS4yOEw1MC42NzYzIDIwLjU0NEM1MC42MTIzIDIwLjg5NiA1MC41ODAzIDIxLjE3NiA1MC41ODAzIDIxLjM4NEM1MC41ODAzIDIyLjMxMiA1MC44NjAzIDIyLjc3NiA1MS40MjAzIDIyLjc3NkM1Mi4wNDQzIDIyLjc3NiA1Mi41ODAzIDIyLjM1MiA1My4wMjgzIDIxLjUwNEM1My4xNzIzIDIxLjIzMiA1My4yNzYzIDIwLjkyIDUzLjM0MDMgMjAuNTY4TDU1LjA0NDMgMTEuNzZMNTkuNzcyMyAxMS4yOEw1Ny45OTYzIDIwLjY0QzU3Ljk0ODMgMjAuODggNTcuOTI0MyAyMS4xMjggNTcuOTI0MyAyMS4zODRDNTcuOTI0MyAyMS42NCA1Ny45OTYzIDIxLjkxMiA1OC4xNDAzIDIyLjJDNTguMjg0MyAyMi40NzIgNTguNTg4MyAyMi42NCA1OS4wNTIzIDIyLjcwNEM1OC45NTYzIDIzLjA4OCA1OC43NDAzIDIzLjQwOCA1OC40MDQzIDIzLjY2NEM1Ny43MDAzIDI0LjIwOCA1Ni45NjQzIDI0LjQ4IDU2LjE5NjMgMjQuNDhDNTUuNDQ0MyAyNC40OCA1NC44NDQzIDI0LjM0NCA1NC4zOTYzIDI0LjA3MkM1My45NDgzIDIzLjggNTMuNjYwMyAyMy40NCA1My41MzIzIDIyLjk5MlpcIiBmaWxsPVwiI3tzZWxlY3RlZENvbG9yfVwiLz5cbjxwYXRoIGQ9XCJNNjkuMjk0NyAxNy4yNTZDNjkuODcwNyAxNi4yMzIgNzAuMTU4NyAxNS4yIDcwLjE1ODcgMTQuMTZDNzAuMTU4NyAxMy40NzIgNjkuOTEwNyAxMy4xMjggNjkuNDE0NyAxMy4xMjhDNjkuMDMwNyAxMy4xMjggNjguNjM4NyAxMy40NTYgNjguMjM4NyAxNC4xMTJDNjcuODIyNyAxNC43NjggNjcuNTUwNyAxNS41MiA2Ny40MjI3IDE2LjM2OEw2Ni4xNzQ3IDI0TDYxLjIwNjcgMjQuNDhMNjMuNjU0NyAxMS43Nkw2Ny42MTQ3IDExLjI4TDY3LjE4MjcgMTMuNzA0QzY3Ljk2NjcgMTIuMDg4IDY5LjIzODcgMTEuMjggNzAuOTk4NyAxMS4yOEM3MS45MjY3IDExLjI4IDcyLjYzODcgMTEuNTIgNzMuMTM0NyAxMkM3My42NDY3IDEyLjQ4IDczLjkwMjcgMTMuMjE2IDczLjkwMjcgMTQuMjA4QzczLjkwMjcgMTUuMTg0IDczLjU3NDcgMTUuOTg0IDcyLjkxODcgMTYuNjA4QzcyLjI3ODcgMTcuMjMyIDcxLjQwNjcgMTcuNTQ0IDcwLjMwMjcgMTcuNTQ0QzY5LjgyMjcgMTcuNTQ0IDY5LjQ4NjcgMTcuNDQ4IDY5LjI5NDcgMTcuMjU2WlwiIGZpbGw9XCIje3NlbGVjdGVkQ29sb3J9XCIvPlxuPC9zdmc+XG5cIlwiXCJcbiIsIlxue0xvZ29MYXllcn0gPSByZXF1aXJlIFwiTG9nb1wiXG57UHJldmlld19Jbml0fSA9IHJlcXVpcmUgXCJQcmV2aWV3X0luaXRcIlxue1VJX1NlY3Rpb259ID0gcmVxdWlyZSBcIlVJX1NlY3Rpb25cIlxue1VJX0NvbmZpZ30gPSByZXF1aXJlIFwiVUlfQ29uZmlnXCJcblxuXG5jbGFzcyBleHBvcnRzLlByZXZpZXdfVUkgZXh0ZW5kcyBQcmV2aWV3X0luaXRcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBzaG93RGVza3RvcFVJKClcblx0XG5cblxuXHRzaG93RGVza3RvcFVJOiAoKSA9PlxuXHRcdGlmIFV0aWxzLmlzTW9iaWxlKCkgdGhlbiByZXR1cm5cblxuXHRcdGlmIEBzaG93TG9nbyB0aGVuIEBjcmVhdGVMb2dvQnV0dG9uKClcblx0XHRpZiBAc2hvd1VJIHRoZW4gQGFkZENvbmZpZygpXG5cblxuXG5cblxuXG5cdGNyZWF0ZUxvZ29CdXR0b246ICgpID0+XG5cdFx0XG5cdFx0b3BlbkhvbWVIYW5kbGVyID0gKCkgLT5cblx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IFwiaHR0cHM6Ly90aWxsbHVyLmNvbVwiXG5cdFx0XG5cdFx0bG9nb0J1dHRvbiA9IG5ldyBMb2dvTGF5ZXJcblx0XHRcdHdpZHRoOiA3NiwgaGVpZ2h0OiAzMlxuXHRcdFx0eDogQWxpZ24ubGVmdCgzMiksIHk6IEFsaWduLnRvcCgxMilcblx0XHRcdGhhbmRsZXI6IG9wZW5Ib21lSGFuZGxlclxuXHRcblxuXHRhZGRTZWN0aW9uOiAodGl0bGUsIGFjdGlvbkFycmF5ID0gW10pID0+XG5cdFx0aWYgQHNlY3Rpb25WaWV3ID09IG51bGwgdGhlbiBAc2VjdGlvblZpZXcgPSBuZXcgVUlfU2VjdGlvblxuXHRcdEBzZWN0aW9uVmlldy5hZGRTZWN0aW9uKHRpdGxlLCBhY3Rpb25BcnJheSlcblxuXG5cdCMgRmlsbCDil4lcblx0IyBGaWxsIOKXjlxuXG5cdGFkZENvbmZpZzogKCkgPT5cblx0XHRAY29uZmlnVmlldyA9IG5ldyBVSV9Db25maWcgeyB2aWV3OiBAIH1cblxuXHRcdHNjYWxlVHVwbGUgPSBbXCJGaXRcIiwgXCIxMDAlXCJdXG5cdFx0aGludHNUdXBsZSA9IFtcIkhpbnRzIOKXiVwiLCBcIkhpbnRzIOKXjlwiXVxuXG5cblx0XHR0b2dnbGVTY2FsZSA9IChlbXB0eURhdGEsIGxvY2FsQnV0dG9uKSA9PlxuXHRcdFx0aWYgQHN0YXRlR3VhcmQuc3RhdGVzLmN1cnJlbnQubmFtZSA9PSBcIm5vcm1hbFwiXG5cdFx0XHRcdEBhbmltYXRlU3RhdGVUb0ZpbGwoKVxuXHRcdFx0XHRsb2NhbEJ1dHRvbi50ZXh0ID0gc2NhbGVUdXBsZVswXVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRAYW5pbWF0ZVN0YXRlVG9Ob3JtYWwoKVxuXHRcdFx0XHRsb2NhbEJ1dHRvbi50ZXh0ID0gc2NhbGVUdXBsZVsxXVxuXHRcdFx0XHRcblx0XHRcblx0XHR0b2dnbGVUaXBzID0gKGVtcHR5RGF0YSwgbG9jYWxCdXR0b24pID0+XG5cdFx0XHRpZiBAc2hvd0hpbnRzXG5cdFx0XHRcdEBoaWRlSGludHNIYW5kbGVyKClcblx0XHRcdFx0bG9jYWxCdXR0b24udGV4dCA9IGhpbnRzVHVwbGVbMV1cblx0XHRcdGVsc2Vcblx0XHRcdFx0QHNob3dIaW50c0hhbmRsZXIoKVxuXHRcdFx0XHRsb2NhbEJ1dHRvbi50ZXh0ID0gaGludHNUdXBsZVswXVxuXHRcdFxuXHRcdGluaXRTY2FsZVRpdGxlID0gaWYgQHNob3dIaW50cyB0aGVuIGhpbnRzVHVwbGVbMF0gZWxzZSBoaW50c1R1cGxlWzFdXG5cdFx0aW5pdFN0YXRlVGl0bGUgPSBpZiBAc3RhdGVHdWFyZC5zdGF0ZXMuY3VycmVudC5uYW1lID09IFwibm9ybWFsXCIgdGhlbiBzY2FsZVR1cGxlWzFdIGVsc2Ugc2NhbGVUdXBsZVswXVxuXG5cdFx0IyBwcmludCBpbml0U2NhbGVUaXRsZSArIFwiIFwiICsgaW5pdFN0YXRlVGl0bGVcblxuXHRcdEBjb25maWdWaWV3LmFkZFNlY3Rpb24oW1xuXHRcdFx0e1xuXHRcdFx0XHR0aXRsZTogaW5pdFNjYWxlVGl0bGUsXG5cdFx0XHRcdGhhbmRsZXI6IHRvZ2dsZVRpcHNcblx0XHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0dGl0bGU6IGluaXRTdGF0ZVRpdGxlLFxuXHRcdFx0XHRoYW5kbGVyOiB0b2dnbGVTY2FsZVxuXHRcdFx0fSxcblx0XHRdKVxuXHRcblx0XG5cdGhpZGVIaW50c0hhbmRsZXI6ICgpID0+XG5cdFx0RnJhbWVyLkV4dHJhcy5IaW50cy5kaXNhYmxlKClcblx0XHRAc2hvd0hpbnRzID0gIUBzaG93SGludHNcblxuXHRzaG93SGludHNIYW5kbGVyOiAoKSA9PlxuXHRcdEZyYW1lci5FeHRyYXMuSGludHMuZW5hYmxlKClcblx0XHRGcmFtZXIuRXh0cmFzLkhpbnRzLnNob3dIaW50cygpXG5cdFx0QHNob3dIaW50cyA9ICFAc2hvd0hpbnRzXG4iLCJcbntMb2dvTGF5ZXJ9ID0gcmVxdWlyZSBcIlByZXZpZXdfTG9nb0xheWVyXCJcbntQaG9uZVR5cGVWaWV3fSA9IHJlcXVpcmUgXCJQaG9uZVR5cGVWaWV3XCJcblxuXG5jbGFzcyBleHBvcnRzLlNjYWxlVmlldyBleHRlbmRzIFBob25lVHlwZVZpZXdcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXG5cdFxuXHRcblx0XG5cdGNyZWF0ZUxvZ29CdXR0b246ICgpID0+XG5cdFx0XG5cdFx0b3BlbkhvbWVIYW5kbGVyID0gKCkgLT5cblx0XHRcdHdpbmRvdy5sb2NhdGlvbiA9IFwiaHR0cHM6Ly90aWxsbHVyLmNvbVwiXG5cdFx0XG5cdFx0bG9nb0J1dHRvbiA9IG5ldyBMb2dvTGF5ZXJcblx0XHRcdHdpZHRoOiA3NiwgaGVpZ2h0OiAzMlxuXHRcdFx0eDogQWxpZ24ubGVmdCgzMiksIHk6IEFsaWduLnRvcCgxMilcblx0XHRcdGhhbmRsZXI6IG9wZW5Ib21lSGFuZGxlclxuXHRcblx0XG5cdFxuXHRjcmVhdGVTY2FsZUJ1dHRvbjogKGZvclN0YXRlKSA9PlxuXHRcdFxuXHRcdGJ1dHRvblNjYWxlID0gbmV3IExheWVyXG5cdFx0XHRzaXplOiA0OCwgYm9yZGVyUmFkaXVzOiA0OFxuXHRcdFx0eDogQWxpZ24ucmlnaHQoLTMyKSwgeTogQWxpZ24uYm90dG9tKC0zMilcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjEpXCJcblx0XHRcdGJvcmRlcldpZHRoOiAyXG5cdFx0XHRjdXN0b206XG5cdFx0XHRcdHByZXZpZXc6IEBcblx0XHRcblx0XHRidXR0b25TY2FsZS5zdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcblx0XHRidXR0b25TY2FsZS5zdGF0ZXMgPVxuXHRcdFx0XCJub3JtYWxcIjogeyBib3JkZXJDb2xvcjogXCJyZ2JhKDI1NSwyNTUsMjU1LCAwLjIpXCIgfVxuXHRcdFx0XCJmaWxsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC42KVwiIH1cblx0XHRidXR0b25TY2FsZS5zdGF0ZVN3aXRjaChmb3JTdGF0ZSlcblx0XHRcblx0XHRidXR0b25JbnNpZGVMYXllciA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBidXR0b25TY2FsZVxuXHRcdFx0Ym9yZGVyV2lkdGg6IDJcblx0XHRcdHNpemU6IDI4LCBib3JkZXJSYWRpdXM6IDIyXG5cdFx0XHR4OiAxMCwgeTogMTBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0XG5cdFx0XG5cdFx0YnV0dG9uSW5zaWRlTGF5ZXIuc3RhdGVzID1cblx0XHRcdFwibm9ybWFsXCI6IHsgYm9yZGVyQ29sb3I6IFwicmdiYSgyNTUsMjU1LDI1NSwgMC42KVwiIH1cblx0XHRcdFwiZmlsbFwiOiB7IGJvcmRlckNvbG9yOiBcInJnYmEoMjU1LDI1NSwyNTUsIDAuMilcIiB9XG5cdFx0YnV0dG9uSW5zaWRlTGF5ZXIuc3RhdGVTd2l0Y2goZm9yU3RhdGUpXG5cdFx0XG5cdFx0YnV0dG9uU2NhbGUub25UYXAgLT5cblx0XHRcdGlmIEBzdGF0ZXMuY3VycmVudC5uYW1lID09IFwiZmlsbFwiIHRoZW4gbmV4dFN0YXRlID0gXCJub3JtYWxcIiBlbHNlIG5leHRTdGF0ZSA9IFwiZmlsbFwiXG5cdFx0XHRAc3RhdGVTd2l0Y2gobmV4dFN0YXRlKVxuXHRcdFx0QGNoaWxkcmVuWzBdLnN0YXRlU3dpdGNoKG5leHRTdGF0ZSlcblx0XHRcdEBjdXN0b20ucHJldmlldy5hbmltYXRlKG5leHRTdGF0ZSwgY3VydmU6IFNwcmluZyhkYW1waW5nOiAxKSwgdGltZTogMC41KVxuXHRcdFxuXHRcdHVwZGF0ZUJ1dHRvbk9uUmVzaXplID0gKGJ1dHRvbkxheWVyKSA9PlxuXHRcdFx0bG9jYWxCdXR0b24gPSBidXR0b25MYXllclxuXHRcdFx0XG5cdFx0XHRDYW52YXMub24gXCJjaGFuZ2U6aGVpZ2h0XCIsID0+XG5cdFx0XHRcdGJ1dHRvbkxheWVyLnggPSBBbGlnbi5yaWdodCgtMzIpXG5cdFx0XHRcblx0XHRcdENhbnZhcy5vbiBcImNoYW5nZTp3aWR0aFwiLCA9PlxuXHRcdFx0XHRidXR0b25MYXllci55ID0gQWxpZ24uYm90dG9tKC0zMilcblx0XHRcblx0XHR1cGRhdGVCdXR0b25PblJlc2l6ZShidXR0b25TY2FsZSlcblxuXG5cbiIsIlxuXG57TG9jYXRpb25WaWV3fSA9IHJlcXVpcmUgXCJMb2NhdGlvblZpZXdcIlxuXG5cbmNsYXNzIGV4cG9ydHMuU2VjdGlvblZpZXcgZXh0ZW5kcyBMb2NhdGlvblZpZXdcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdGNvbnRyb2xQYW5lbExheWVyID0gbmV3IExheWVyXG5cdFx0XHR3aWR0aDogMzYwLCBoZWlnaHQ6IDEwMDBcblx0XHRcdHg6IDIwLCB5OiA2MFxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0Y29udHJvbFBhbmVsOiBjb250cm9sUGFuZWxMYXllclxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRjb250cm9sUGFuZWxMYXllci5wYXJlbnQgPSBAcGFyZW50XG5cblx0XG5cdEBkZWZpbmUgJ2NvbnRyb2xQYW5lbCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5jb250cm9sUGFuZWxcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuY29udHJvbFBhbmVsID0gdmFsdWVcblx0XG5cdGFkZFNlY3Rpb246ICh0aXRsZSwgYWN0aW9uQXJyYXkgPSBbXSkgPT5cblx0XHRpZiBVdGlscy5pc01vYmlsZSgpIHRoZW4gcmV0dXJuXG5cdFx0ZWxzZVxuXHRcdFx0c2VjdGlvblZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdFx0d2lkdGg6IDM2MFxuXHRcdFx0XHRoZWlnaHQ6IDEwMFxuXHRcdFx0XHRwYXJlbnQ6IEBjb250cm9sUGFuZWxcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRcblx0XHRcdHNlY3Rpb25WaWV3LnkgPSAoQGNvbnRyb2xQYW5lbC5jaGlsZHJlbi5sZW5ndGggLSAxKSAqIDEwMFxuXG5cdFx0XHRAYWRkU2VjdGlvblRpdGxlKHRpdGxlKS5wYXJlbnQgPSBzZWN0aW9uVmlld1xuXG5cdFx0XHRzdW1YID0gMFxuXHRcdFx0Zm9yIGFjdGlvbkl0ZW0sIGluZGV4IGluIGFjdGlvbkFycmF5XG5cdFx0XHRcdHNlY3Rpb25CdXR0b24gPSBAYWRkU2VjdGlvbkJ1dHRvbihhY3Rpb25JdGVtKVxuXHRcdFx0XHRzZWN0aW9uQnV0dG9uLnBhcmVudCA9IHNlY3Rpb25WaWV3XG5cdFx0XHRcdHNlY3Rpb25CdXR0b24ueCA9IHN1bVhcblx0XHRcdFx0c3VtWCArPSBzZWN0aW9uQnV0dG9uLndpZHRoICsgOFxuXHRcdFx0XHRcblxuXG5cblxuXHRhZGRTZWN0aW9uQnV0dG9uOiAoYWN0aW9uSXRlbSwgcFYgPSA2LCBwSCA9IDkpID0+XG5cdFx0YnV0dG9uTGF5ZXIgPSBuZXcgVGV4dExheWVyXG5cdFx0XHR0ZXh0OiBhY3Rpb25JdGVtLnRpdGxlXG5cdFx0XHR5OiA0MlxuXHRcdFx0cGFkZGluZzogeyB0b3A6IHBWLCBib3R0b206IHBWICsgMiwgbGVmdDogcEgsIHJpZ2h0OiBwSCB9XG5cdFx0XHRmb250U2l6ZTogMThcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJnYmEoMCwwLDAsMC41KVwiXG5cdFx0XHRib3JkZXJSYWRpdXM6IDhcblx0XHRcblx0XHRidXR0b25MYXllci5vbihFdmVudHMuVGFwLCBhY3Rpb25JdGVtLmhhbmRsZXIpXG5cdFx0cmV0dXJuIGJ1dHRvbkxheWVyXG5cblxuXHRhZGRTZWN0aW9uVGl0bGU6ICh0aXRsZSA9IFwiSGVhZGVyIFRpdGxlXCIpID0+XG5cdFx0cmV0dXJuIG5ldyBUZXh0TGF5ZXJcblx0XHRcdHRleHQ6IHRpdGxlXG5cdFx0XHRmb250U2l6ZTogMTVcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXHRcdFx0b3BhY2l0eTogMC42XG5cdFx0XHRwYWRkaW5nOlxuXHRcdFx0XHR0b3A6IDEyXG5cblxuXG5cbiMgIyBFeGFtcGxlXG4jIHByZXZpZXcuYWRkU2VjdGlvbihcIkNob29zZSBCYWNrZ3JvdW5kXCIsIFtcbiMgXHR7IHRpdGxlOiB0ZXN0MSwgaGFuZGxlcjogdGVzdDIgfSxcbiMgXHR7IHRpdGxlOiB0ZXN0MSwgaGFuZGxlcjogdGVzdDIgfVxuIyBdKSIsInsgQnV0dG9uLCBCdXR0b25PbW5pYm94LCBCdXR0b25WaWRlbyB9ID0gcmVxdWlyZSBcIkJ1dHRvbnNcIlxuXG5zaG9wSXRlbUxlZnQwMSA9IG5ldyBCdXR0b25PbW5pYm94XG5cdHdpZHRoOiAxNzcuMFxuXHRoZWlnaHQ6IDM0Mi42NjY2NjY2NjY2NjY2M1xuXHRpbWFnZTogXCJpbWFnZXMvc2hvcEl0ZW1fbGVmdDAxLnBuZ1wiXG5cbnNob3BJdGVtTGVmdDAyID0gbmV3IEJ1dHRvbk9tbmlib3hcblx0d2lkdGg6IDE3Ni4zMzMzMzMzMzMzMzMzMVxuXHRoZWlnaHQ6IDIyNi4wXG5cdGltYWdlOiBcImltYWdlcy9zaG9wSXRlbV9sZWZ0MDIucG5nXCJcblxuc2hvcEl0ZW1MZWZ0MDMgPSBuZXcgQnV0dG9uT21uaWJveFxuXHR3aWR0aDogMTc2LjMzMzMzMzMzMzMzMzMxXG5cdGhlaWdodDogMTYwLjBcblx0aW1hZ2U6IFwiaW1hZ2VzL3Nob3BJdGVtX2xlZnQwMy5wbmdcIlxuXG5zaG9wSXRlbUxlZnQwNCA9IG5ldyBCdXR0b25PbW5pYm94XG5cdHdpZHRoOiAxNzguMFxuXHRoZWlnaHQ6IDI1OC4wXG5cdGltYWdlOiBcImltYWdlcy9zaG9wSXRlbV9sZWZ0MDQucG5nXCJcblxuc2hvcEl0ZW1SaWdodDAxID0gbmV3IEJ1dHRvbk9tbmlib3hcblx0d2lkdGg6IDE3Ni4zMzMzMzMzMzMzMzMzMVxuXHRoZWlnaHQ6IDI1Ni4wXG5cdGltYWdlOiBcImltYWdlcy9zaG9wSXRlbV9yaWdodDAxLnBuZ1wiXG5cbnNob3BJdGVtUmlnaHQwMiA9IG5ldyBCdXR0b25PbW5pYm94XG5cdHdpZHRoOiAxNzguMzMzMzMzMzMzMzMzMzFcblx0aGVpZ2h0OiAyNjEuMFxuXHRpbWFnZTogXCJpbWFnZXMvc2hvcEl0ZW1fcmlnaHQwMi5wbmdcIlxuXG5zaG9wSXRlbVJpZ2h0MDMgPSBuZXcgQnV0dG9uT21uaWJveFxuXHR3aWR0aDogMTc2LjBcblx0aGVpZ2h0OiAyNzkuMFxuXHRpbWFnZTogXCJpbWFnZXMvc2hvcEl0ZW1fcmlnaHQwMy5wbmdcIlxuXG5leHBvcnRzLmRhdGEgPVxuICAgIGxlZnQ6IFtzaG9wSXRlbUxlZnQwMSwgc2hvcEl0ZW1MZWZ0MDIsIHNob3BJdGVtTGVmdDAzLCBzaG9wSXRlbUxlZnQwNF1cbiAgICByaWdodDogW3Nob3BJdGVtUmlnaHQwMSwgc2hvcEl0ZW1SaWdodDAyLCBzaG9wSXRlbVJpZ2h0MDNdXG4iLCJcbmV4cG9ydHMudmVydGljYWwgPSAobGF5ZXJBcnJheSwgc3BhY2luZyA9IDE2LCBwYWRkaW5nID0geyB4OiAwLCB5OiAwIH0pIC0+XG5cdHZpZXcgPSBuZXcgTGF5ZXJcblx0XHR3aWR0aDogbGF5ZXJBcnJheVswXS53aWR0aFxuXHRcdHg6IHBhZGRpbmcueCwgeTogcGFkZGluZy55XG5cdFx0YmFja2dyb3VuZENvbG9yOiBcIndoaXRlXCJcblxuXHRjdXJyZW50VmFsdWUgPSAwXG5cdGZvciBpdGVtIGluIGxheWVyQXJyYXlcblx0XHRpdGVtLnBhcmVudCA9IHZpZXdcblx0XHRpdGVtLnkgPSBjdXJyZW50VmFsdWVcblx0XHRjdXJyZW50VmFsdWUgPSBjdXJyZW50VmFsdWUgKyBpdGVtLmhlaWdodCArIHNwYWNpbmdcblxuXHR2aWV3LmhlaWdodCA9IGN1cnJlbnRWYWx1ZVxuXHRyZXR1cm4gdmlld1xuXG5cbmV4cG9ydHMuaG9yaXpvbnRhbCA9IChsYXllckFycmF5LCBzcGFjaW5nID0gMTYsIHBhZGRpbmcgPSB7IHg6IDAsIHk6IDAgfSApIC0+XG5cdHZpZXcgPSBuZXcgTGF5ZXJcblx0XHRoZWlnaHQ6IGxheWVyQXJyYXlbMF0uaGVpZ2h0XG5cdFx0eDogcGFkZGluZy54LCB5OiBwYWRkaW5nLnlcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwid2hpdGVcIlxuXG5cdGN1cnJlbnRWYWx1ZSA9IDBcblx0Zm9yIGl0ZW0gaW4gbGF5ZXJBcnJheVxuXHRcdGl0ZW0ucGFyZW50ID0gdmlld1xuXHRcdGl0ZW0ueCA9IGN1cnJlbnRWYWx1ZVxuXHRcdGN1cnJlbnRWYWx1ZSA9IGN1cnJlbnRWYWx1ZSArIGl0ZW0ud2lkdGggKyBzcGFjaW5nXG5cblx0dmlldy53aWR0aCA9IGN1cnJlbnRWYWx1ZVxuXHRyZXR1cm4gdmlld1xuXG4iLCJcblxuY2xhc3MgZXhwb3J0cy5TdGF0dXNCYXJfQ2xhc3MgZXh0ZW5kcyBMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHBhcmVudDogQHZpZXdcblx0XHRcdHdpZHRoOiBAdmlldy53aWR0aFxuXG5cdFx0XHR5OiBBbGlnbi50b3AsIG5hbWU6IFwiLnN0YXR1cyBiYXJcIiwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cblx0XHRcdHRoZW1lOiBAdmlldy5zdGF0dXNCYXJfdGhlbWVcblx0XHRcdGZvcmNlQW5kcm9pZDogQHZpZXcuZm9yY2VBbmRyb2lkQmFyXG5cdFx0XHRwcm90b3R5cGVDcmVhdGlvblllYXI6IEB2aWV3LnRpbWVWYWx1ZVxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0XHRAY3JlYXRlKClcblxuXG5cblxuXG5cdEBkZWZpbmUgJ3ZpZXcnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMudmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy52aWV3ID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ3RoZW1lJyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnRoZW1lXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnRoZW1lID0gdmFsdWVcblx0XG5cdEBkZWZpbmUgJ2ZvcmNlQW5kcm9pZCcsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy5mb3JjZUFuZHJvaWRcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMuZm9yY2VBbmRyb2lkID0gdmFsdWVcblxuXHRAZGVmaW5lICdwcm90b3R5cGVDcmVhdGlvblllYXInLFxuXHRcdGdldDogLT4gQG9wdGlvbnMucHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLnByb3RvdHlwZUNyZWF0aW9uWWVhciA9IHZhbHVlXG5cblxuXG5cblx0dmlld1NpemU6ICh3LCBoKSA9PiByZXR1cm4gQHZpZXcud2lkdGggPT0gdyBhbmQgQHZpZXcuaGVpZ2h0ID09IGhcblxuXHRjcmVhdGU6ICgpID0+XG5cdFx0XG5cdFx0aWYgQGZvcmNlQW5kcm9pZCB0aGVuIEBjcmVhdGVDbGFzc2ljQW5kcm9pZFN0YXR1c0JhcigpIFxuXG5cdFx0ZWxzZSBpZiBAdmlld1NpemUoMzc1LCA4MTIpIG9yIEB2aWV3U2l6ZSgzOTAsIDg0NCkgb3IgQHZpZXdTaXplKDQxNCwgODk2KSBvciBAdmlld1NpemUoNDI4LCA5MjYpIG9yIEB2aWV3U2l6ZSgzNjAsIDc4Milcblx0XHRcdEBjcmVhdGVOb3RjaFN0YXR1c0JhcigpXG5cdFx0XG5cdFx0ZWxzZSBpZiBAdmlld1NpemUoMzkzLCA4NTIpXG5cdFx0XHRAY3JlYXRlTm90Y2hTdGF0dXNCYXIoKVxuXHRcdFxuXHRcdGVsc2UgaWYgQHZpZXdTaXplKDM3NSwgNjY3KSBvciBAdmlld1NpemUoNDE0LCA3MzYpIG9yIEB2aWV3U2l6ZSgzMjAsIDU2OClcblx0XHRcdEBjcmVhdGVDbGFzc2ljU3RhdHVzQmFyKClcblx0XHRcblx0XHRcblx0XHRlbHNlIEBjcmVhdGVBbmRyb2lkU3RhdHVzQmFyKClcblx0XG5cdFxuXHRcblx0XG5cblxuXG5cdGNyZWF0ZUFuZHJvaWRTdGF0dXNCYXI6ICgpID0+XG5cdFx0QGhlaWdodCA9IDMyXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDUyLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5sZWZ0KDQpLCB5OiBBbGlnbi50b3AoMiArIDUpXG5cdFx0XHRjb2xvcjogZGV2aWNlX2Fzc2V0cy5jb2xvcltAdGhlbWVdLCBiYWNrZ3JvdW5kQ29sb3I6IG51bGxcblx0XHRcdGZvbnRTaXplOiAxNCwgZm9udFdlaWdodDogNjAwLCB0ZXh0QWxpZ246IFwiY2VudGVyXCIsIGZvbnRGYW1pbHk6IFwiLnN5c3RlbSwgU0YgUHJvIFRleHRcIlxuXHRcdFx0dGV4dDogQHByb3RvdHlwZUNyZWF0aW9uWWVhclxuXHRcdFxuXHRcdGNsYXNzaWNSaWdodG9tcG9uZW50ID0gbmV3IExheWVyXG5cdFx0XHRwYXJlbnQ6IEAsIHdpZHRoOiAxMDAsIGhlaWdodDogMjAsIHg6IEFsaWduLnJpZ2h0KC00KSwgeTogQWxpZ24udG9wKDUpXG5cdFx0XHRpbWFnZTogZGV2aWNlX2Fzc2V0cy5hbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZVtAdGhlbWVdXG5cdFxuXHRcblx0Y3JlYXRlQ2xhc3NpY0FuZHJvaWRTdGF0dXNCYXI6ICgpID0+XG5cdFx0QGhlaWdodCA9IDIwXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDUyLCBoZWlnaHQ6IDIwLCB4OiBBbGlnbi5sZWZ0LCB5OiBBbGlnbi50b3AoMilcblx0XHRcdGNvbG9yOiBkZXZpY2VfYXNzZXRzLmNvbG9yW0B0aGVtZV0sIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Zm9udFNpemU6IDE0LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0Y2xhc3NpY1JpZ2h0b21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDEwMCwgaGVpZ2h0OiAyMCwgeDogQWxpZ24ucmlnaHQsIHk6IEFsaWduLnRvcCgpXG5cdFx0XHRpbWFnZTogZGV2aWNlX2Fzc2V0cy5hbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZVtAdGhlbWVdXG5cdFxuXHRcblxuXG5cblx0Y3JlYXRlQ2xhc3NpY1N0YXR1c0JhcjogKCkgPT5cblx0XHRAaGVpZ2h0ID0gMjBcblx0XHRcblx0XHRjbGFzc2ljTGVmdENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogMTAwLCBoZWlnaHQ6IEBoZWlnaHQsIHg6IEFsaWduLmxlZnRcblx0XHRcdGltYWdlOiBkZXZpY2VfYXNzZXRzLm9sZFN0YXR1c0JhckxlZnRJbWFnZVtAdGhlbWVdXG5cdFx0XG5cdFx0Y2xhc3NpY0NlbnRlckNvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDU0LCBoZWlnaHQ6IDE2LCB4OiBBbGlnbi5jZW50ZXIsIHk6IEFsaWduLmNlbnRlclxuXHRcdFx0Y29sb3I6IGRldmljZV9hc3NldHMuY29sb3JbQHRoZW1lXSwgYmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XHRmb250U2l6ZTogMTIsIGZvbnRXZWlnaHQ6IDYwMCwgdGV4dEFsaWduOiBcImNlbnRlclwiLCBmb250RmFtaWx5OiBcIi5zeXN0ZW0sIFNGIFBybyBUZXh0XCJcblx0XHRcdHRleHQ6IEBwcm90b3R5cGVDcmVhdGlvblllYXJcblx0XHRcblx0XHRjbGFzc2ljUmlnaHRvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogMTAwLCBoZWlnaHQ6IEBoZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogZGV2aWNlX2Fzc2V0cy5vbGRTdGF0dXNCYXJSaWdodEltYWdlW0B0aGVtZV1cblx0XHRcblx0XG5cdGNyZWF0ZU5vdGNoU3RhdHVzQmFyOiAoKSA9PlxuXHRcdEBoZWlnaHQgPSA0NFxuXHRcdFxuXHRcdG5vdGNoTGVmdENvbXBvbmVudCA9IG5ldyBUZXh0TGF5ZXJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDU0LCBoZWlnaHQ6IDIxLCB4OiBBbGlnbi5sZWZ0KDIxKSwgeTogQWxpZ24udG9wKDEyKVxuXHRcdFx0Y29sb3I6IGRldmljZV9hc3NldHMuY29sb3JbQHRoZW1lXSwgYmFja2dyb3VuZENvbG9yOiBudWxsLCBsZXR0ZXJTcGFjaW5nOiAtMC4xN1xuXHRcdFx0Zm9udFNpemU6IDE1LCBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogXCJjZW50ZXJcIiwgZm9udEZhbWlseTogXCIuc3lzdGVtLCBTRiBQcm8gVGV4dFwiXG5cdFx0XHR0ZXh0OiBAcHJvdG90eXBlQ3JlYXRpb25ZZWFyXG5cdFx0XG5cdFx0bm90Y2hDZW50ZXJDb21wb25lbnQgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQCwgd2lkdGg6IDM3NSwgaGVpZ2h0OiBAaGVpZ2h0LCB4OiBBbGlnbi5jZW50ZXJcblx0XHRcdGltYWdlOiBkZXZpY2VfYXNzZXRzLm5vdGNoXG5cdFx0XG5cdFx0bm90Y2hSaWdodENvbXBvbmVudCA9IG5ldyBMYXllclxuXHRcdFx0cGFyZW50OiBALCB3aWR0aDogMTAwLCBoZWlnaHQ6IEBoZWlnaHQsIHg6IEFsaWduLnJpZ2h0XG5cdFx0XHRpbWFnZTogZGV2aWNlX2Fzc2V0cy5zdGF0dXNCYXJSaWdodEltYWdlW0B0aGVtZV1cblxuXG5cblxuZGV2aWNlX2Fzc2V0cyA9XG5cdGNvbG9yOlxuXHRcdGRhcms6IFwiIzAwMFwiXG5cdFx0bGlnaHQ6IFwiI0ZGRlwiXG5cdFxuXHRzdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL3N0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRvbGRTdGF0dXNCYXJMZWZ0SW1hZ2U6XG5cdFx0ZGFyazogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvb2xkU3RhdHVzQmFyX2xlZnRfZGFyay5wbmdcIlxuXHRcdGxpZ2h0OiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9vbGRTdGF0dXNCYXJfbGVmdF9saWdodC5wbmdcIlxuXHRvbGRTdGF0dXNCYXJSaWdodEltYWdlOlxuXHRcdGRhcms6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9yaWdodF9kYXJrLnBuZ1wiXG5cdFx0bGlnaHQ6IFwibW9kdWxlcy9QcmV2aWV3Q29tcG9uZW50QXNzZXRzL29sZFN0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRhbmRyb2lkU3RhdHVzQmFyUmlnaHRJbWFnZTpcblx0XHRkYXJrOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9hbmRyb2lkU3RhdHVzQmFyX3JpZ2h0X2RhcmsucG5nXCJcblx0XHRsaWdodDogXCJtb2R1bGVzL1ByZXZpZXdDb21wb25lbnRBc3NldHMvYW5kcm9pZFN0YXR1c0Jhcl9yaWdodF9saWdodC5wbmdcIlxuXHRcblxuXG5cdG5vdGNoOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy9zdGF0dXNCYXJfbm90Y2gucG5nXCJcblx0dGlwOiBcIm1vZHVsZXMvUHJldmlld0NvbXBvbmVudEFzc2V0cy90aXAucG5nXCIiLCJcblxue1NlY3Rpb25WaWV3fSA9IHJlcXVpcmUgXCJTZWN0aW9uVmlld1wiXG5cblxuY2xhc3MgZXhwb3J0cy5UcmVlTGF5ZXJWaWV3IGV4dGVuZHMgU2VjdGlvblZpZXdcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdHRyZWVWaWV3TGF5ZXIgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0XHR3aWR0aDogMzIwXG5cdFx0XHRoZWlnaHQ6IDBcblx0XHRcdHNjcm9sbFZlcnRpY2FsOiB0cnVlXG5cdFx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0bW91c2VXaGVlbEVuYWJsZWQ6IHRydWVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjMjIyXCJcblx0XHRcblx0XHR0cmVlVmlld0xheWVyLmNvbnRlbnQuaGVpZ2h0ID0gMFxuXHRcdHRyZWVWaWV3TGF5ZXIubW91c2VXaGVlbEVuYWJsZWQgPSB0cnVlXG5cdFx0XHRcblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR0cmVlVmlldzogdHJlZVZpZXdMYXllclxuXHRcdFx0aW5kZW50OiAxXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdHRyZWVWaWV3TGF5ZXIucGFyZW50ID0gQHBhcmVudFxuXG5cdFxuXHRAZGVmaW5lICd0cmVlVmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50cmVlVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50cmVlVmlldyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdpbmRlbnQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaW5kZW50XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmluZGVudCA9IHZhbHVlXG5cdFxuXG5cblx0cHJpbnRUcmVlOiAoKSA9PlxuXHRcdHByaW50IEB2aWV3LmNoaWxkcmVuXG5cdFx0QHByaW50Tm9kZShAdmlldylcblx0XHRAdHJlZVZpZXcuaGVpZ2h0ID0gU2NyZWVuLmhlaWdodFxuXHRcdEB0cmVlVmlldy51cGRhdGVDb250ZW50KClcblx0XG5cblx0cHJpbnROb2RlOiAobm9kZSwgbGV2ZWwgPSAwKSA9PlxuXHRcdGlmIG5vZGUubmFtZSA9PSBcIlwiIHRoZW4gbGF5ZXJOYW1lID0gXCJVbnRpdGxlZFwiIGVsc2UgbGF5ZXJOYW1lID0gbm9kZS5uYW1lXG5cdFx0IyBwcmludCBBcnJheShsZXZlbCArIDEpLmpvaW4oXCIg44O7IFwiKSArIFwiICN7bGF5ZXJOYW1lfVwiXG5cblx0XHR0cmVlTm9kZUxheWVyID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBAdHJlZVZpZXcuY29udGVudFxuXHRcdFx0dGV4dDogQXJyYXkobGV2ZWwgKyAxKS5qb2luKFwiIOODuyBcIikgKyBcIiAje2xheWVyTmFtZX1cIlxuXHRcdFx0XG5cdFx0XHRmb250U2l6ZTogMTVcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXG5cdFx0XHRvcGFjaXR5OiBpZiBsYXllck5hbWUgPT0gXCJVbnRpdGxlZFwiIHRoZW4gMC41IGVsc2UgMVxuXHRcdFx0aGVpZ2h0OiAyOFxuXHRcdFx0eTogQHRyZWVWaWV3LmhlaWdodFxuXHRcdFx0IyBiYWNrZ3JvdW5kQ29sb3I6IFV0aWxzLnJhbmRvbUNvbG9yKClcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRsYXllcjogbm9kZVxuXHRcdFxuXHRcdHRyZWVOb2RlTGF5ZXIub25UYXAgLT5cblx0XHRcdHByaW50IFwiI3tAY3VzdG9tLmxheWVyLm5hbWV9IHg6ICN7QGN1c3RvbS5sYXllci54fSB5OiAje0BjdXN0b20ubGF5ZXIueX0gc2l6ZTogI3tAY3VzdG9tLmxheWVyLndpZHRofXgje0BjdXN0b20ubGF5ZXIuaGVpZ2h0fVwiXG5cblx0XHRcblx0XHRAdHJlZVZpZXcuaGVpZ2h0ICs9IDI4XG5cblxuXHRcdGlmIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMFxuXHRcdFx0bmV4dExldmVsID0gbGV2ZWwgKyAxXG5cdFx0XHRmb3IgY2hpbGROb2RlIGluIG5vZGUuY2hpbGRyZW5cblx0XHRcdFx0QHByaW50Tm9kZShjaGlsZE5vZGUsIG5leHRMZXZlbClcblx0XHRcbiIsIlxuY2xhc3MgVGV4dCBleHRlbmRzIFRleHRMYXllclxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHQjIGZvbnRGYW1pbHk6IGZvbnRBdmVyaWFcblx0XHRcdGZvbnRTaXplOiAxOFxuXHRcdFx0d2VpZ2h0OiA3MDBcblx0XHRcdGNvbG9yOiBcIndoaXRlXCJcblx0XHRcdGhlaWdodDogMjBcblx0XHRcdGxldHRlclNwYWNpbmc6IDAuN1xuXHRcdFx0bGV0dGVyU3BhY2luZzogMC40XG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdEBzdHlsZSA9XG5cdFx0XHRcImZvbnQtZmFtaWx5XCI6IFwiJ1NGIFBybyBUZXh0JywgJ1BUIFNhbnMnLCAnSGVsdmV0aWNhJywgJ1RhaG9tYScsIHNhbnMtc2VyaWY7XCJcblx0XHRcdFwiZm9udC13ZWlnaHRcIjogNzAwXG5cdFx0XHRcIi13ZWJraXQtZm9udC1mZWF0dXJlLXNldHRpbmdzXCI6IFwiJ3NzMDInIG9uLCAnc3MwNicgb24sICdzczA5JyBvbiwgJ3NzMTEnIG9uO1wiXG5cdFx0XHRcIi1tb3otZm9udC1mZWF0dXJlLXNldHRpbmdzXCI6IFwiJ3NzMDInIG9uLCAnc3MwNicgb24sICdzczA5JyBvbiwgJ3NzMTEnIG9uO1wiXG5cdFx0XHRcIi1tcy1mb250LWZlYXR1cmUtc2V0dGluZ3NcIjogXCInc3MwMicgb24sICdzczA2JyBvbiwgJ3NzMDknIG9uLCAnc3MxMScgb247XCJcblx0XHRcdFwiZm9udC1mZWF0dXJlLXNldHRpbmdzXCI6IFwiJ3NzMDInIG9uLCAnc3MwNicgb24sICdzczA5JyBvbiwgJ3NzMTEnIG9uO1wiXG5cdFx0XG5cblxuXG5jbGFzcyBUZXh0QnV0dG9uIGV4dGVuZHMgVGV4dFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR0dXBsZTogeyBub3JtYWw6IDAuNSwgaG92ZXI6IDAuOCB9XG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cblx0XHRcblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEBzdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcblx0XHRALm9uTW91c2VPdmVyIEBIb3ZlclxuXHRcdEAub25Nb3VzZU91dCBASG92ZXJPZmZcblxuXHRcdEB1cGRhdGVUdXBsZShAdHVwbGUpXG5cdFxuXHRcblx0XHRcblx0SG92ZXI6ID0+XG5cdFx0QG9wYWNpdHkgPSBAdHVwbGUuaG92ZXJcblx0SG92ZXJPZmY6ID0+XG5cdFx0QG9wYWNpdHkgPSBAdHVwbGUubm9ybWFsXG5cdFxuXHR1cGRhdGVUdXBsZTogKG5ld1R1cGxlKSA9PlxuXHRcdEB0dXBsZSA9IG5ld1R1cGxlXG5cdFx0QGVtaXQgRXZlbnRzLk1vdXNlT3ZlclxuXHRcdEBlbWl0IEV2ZW50cy5Nb3VzZU91dFxuXHRcblx0XG5cdEBkZWZpbmUgJ2hhbmRsZXInLFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb24oRXZlbnRzLlRhcCwgdmFsdWUpXG5cdFxuXHRAZGVmaW5lICd0dXBsZScsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50dXBsZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QG9wdGlvbnMudHVwbGUgPSB2YWx1ZVxuXG5cblxuY2xhc3MgQnV0dG9uIGV4dGVuZHMgVGV4dFxuXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHRoYW5kbGVyOiBudWxsXG5cdFx0XHRoZWlnaHQ6IDMyLCBib3JkZXJSYWRpdXM6IDhcblx0XHRcdHBhZGRpbmc6IHsgdG9wOiA2LCBib3R0b206IDcsIGxlZnQ6IDksIHJpZ2h0OiA5IH1cblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDAsMCwwLDAuNylcIlxuXHRcdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cdFx0QHNob3dIaW50ID0gLT4gO1xuXHRcdEBzdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRcblx0XHRALm9uTW91c2VPdmVyIEBIb3ZlclxuXHRcdEAub25Nb3VzZU91dCBASG92ZXJPZmZcblx0XHRcblx0SG92ZXI6ID0+XG5cdFx0QGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjQpXCJcblx0SG92ZXJPZmY6ID0+XG5cdFx0QGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjcpXCJcblx0XG5cdEBkZWZpbmUgJ2hhbmRsZXInLFxuXHRcdHNldDogKHZhbHVlKSAtPiBAb24oRXZlbnRzLlRhcCwgdmFsdWUpXG5cblxuY2xhc3MgQnV0dG9uVGFiIGV4dGVuZHMgQnV0dG9uXG5cdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG5cdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcblx0XHRcdHNlbGVjdGVkOiB0cnVlXG5cdFxuXHRcdHN1cGVyIEBvcHRpb25zXG5cblx0SG92ZXI6ID0+XG5cdFx0QGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjQpXCJcblx0SG92ZXJPZmY6ID0+XG5cdFx0aWYgQHNlbGVjdGVkIHRoZW4gQGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjcpXCJcblx0XHRlbHNlIEBiYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsMC4yKVwiXG5cblx0QGRlZmluZSAnc2VsZWN0ZWQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuc2VsZWN0ZWRcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdEBvcHRpb25zLnNlbGVjdGVkID0gdmFsdWVcblx0XHRcdGlmIHZhbHVlIHRoZW4gQGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjcpXCJcblx0XHRcdGVsc2UgQGJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjIpXCJcblxuXG4jIEJ1dHRvbjogU1ZHXG5cbiMgY2xhc3MgU1ZHQnV0dG9uIGV4dGVuZHMgVGV4dEJ1dHRvblxuIyBcdGNvbnN0cnVjdG9yOiAoQG9wdGlvbnM9e30pIC0+XG5cdFx0XG4jIFx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuIyBcdFx0XHR0ZXh0OiBcIlwiXG4jIFx0XHRcdGFzc2V0OiBudWxsXG4jIFx0XHRcdGNsaXA6IGZhbHNlXG4jIFx0XHRcdGF1dG9TaXplOiBmYWxzZVxuXHRcdFxuIyBcdFx0QHN2Z1NoYXBlID0gbmV3IFNWR0xheWVyXG4jIFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJudWxsXCIsIG5hbWU6IFwic3ZnU2hhcGVcIlxuXHRcdFxuIyBcdFx0c3VwZXIgQG9wdGlvbnNcbiMgXHRcdEBzdmdTaGFwZS5wYXJlbnQgPSBAXG4jIFx0XHRAdXBkYXRlU1ZHU2l6ZSgpXG5cdFxuXHRcbiMgXHRAZGVmaW5lICdhc3NldCcsXG4jIFx0XHRnZXQ6IC0+IEBvcHRpb25zLmFzc2V0XG4jIFx0XHRzZXQ6ICh2YWx1ZSkgLT5cbiMgXHRcdFx0QG9wdGlvbnMuYXNzZXQgPSB2YWx1ZVxuIyBcdFx0XHRAc3ZnU2hhcGUuc3RhdGVzID1cbiMgXHRcdFx0XHRcIm9uRGFya1wiOiB7IHN2ZzogdmFsdWUub25EYXJrIH1cbiMgXHRcdFx0XHRcIm9uTGlnaHRcIjogeyBzdmc6IHZhbHVlLm9uTGlnaHQgfVxuIyBcdFx0XHRAc3ZnU2hhcGUuc3RhdGVTd2l0Y2goXCJvbkRhcmtcIilcblx0XG4jIFx0dXBkYXRlU1ZHU2l6ZTogKCkgPT5cbiMgXHRcdEBzdmdTaGFwZS53aWR0aCA9IEB3aWR0aFxuIyBcdFx0QHN2Z1NoYXBlLmhlaWdodCA9IEBoZWlnaHRcblx0XG5cblxuXG5cbiMgQnV0dG9uOiBDb3B5XG5cbiMgY2xhc3MgQ29weUJ1dHRvbiBleHRlbmRzIFRleHRCdXR0b25cbiMgXHRjb25zdHJ1Y3RvcjogKEBvcHRpb25zPXt9KSAtPlxuXHRcdFxuIyBcdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcbiMgXHRcdFx0bGluazogXCJodHRwczovL3RpbGxsdXIuY29tXCJcbiMgXHRcdFx0aGFuZGxlcjogQGNvcHlIYW5kbGVyXG5cdFx0XG4jIFx0XHRAYXJlYSA9IG5ldyBMYXllclxuIyBcdFx0XHRvcGFjaXR5OiAwLCB4OiAtMzAwMCwgaHRtbDogbnVsbFxuXHRcdFxuIyBcdFx0c3VwZXIgQG9wdGlvbnNcbiMgXHRcdEBhcmVhLnBhcmVudCA9IEBcblx0XG5cdFxuIyBcdEBkZWZpbmUgJ2xpbmsnLFxuIyBcdFx0Z2V0OiAtPiBAb3B0aW9ucy5saW5rXG4jIFx0XHRzZXQ6ICh2YWx1ZSkgLT5cbiMgXHRcdFx0QG9wdGlvbnMubGluayA9IHZhbHVlXG4jIFx0XHRcdEB1cGRhdGUodmFsdWUpXG5cdFxuXHRcbiMgXHR1cGRhdGU6IChsaW5rKSA9PlxuIyBcdFx0QGFyZWEuaHRtbCA9IFwiPHRleHRhcmVhIGNsYXNzPSdqcy1jb3B5dGV4dGFyZWEtY2xhc3MnIHN0eWxlPSdvcGFjaXR5OjA7Jz4je2xpbmt9PC90ZXh0YXJlYT5cIlxuXHRcblx0XG4jIFx0Y29weUhhbmRsZXI6ID0+XG4jIFx0XHR0ZXh0RGl2ID0gQGFyZWEucXVlcnlTZWxlY3RvcignLmpzLWNvcHl0ZXh0YXJlYS1jbGFzcycpXG4jIFx0XHR0ZXh0RGl2LmZvY3VzKClcbiMgXHRcdHRleHREaXYuc2VsZWN0KClcbiMgXHRcdGRvY3VtZW50LmV4ZWNDb21tYW5kICdjb3B5J1xuXHRcdFxuIyBcdFx0b3JpZ2luVGl0bGUgPSBAdGV4dFxuIyBcdFx0QHRleHQgPSBcIkRvbmUg8J+RjFwiXG4jIFx0XHRVdGlscy5kZWxheSAxLCA9PiBAdGV4dCA9IG9yaWdpblRpdGxlXG5cblxuXG5cbiMgIyAjIEJ1dHRvbjogQ29weVxuXG4jICMgY2xhc3MgTGlua0J1dHRvbiBleHRlbmRzIFNWR0J1dHRvblxuIyAjIFx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcbiMgIyBcdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcbiMgIyBcdFx0XHRsaW5rOiBcImh0dHBzOi8vdGlsbGx1ci5jb21cIlxuIyAjIFx0XHRcdGJvcmRlcldpZHRoOiAxICogMlxuIyAjIFx0XHRcdGJvcmRlclJhZGl1czogMjAgKiAyXG4jICMgXHRcdFx0dHVwbGU6IHsgbm9ybWFsOiAxLjAsIGhvdmVyOiAwLjggfVxuXHRcdFx0XG5cdFx0XG4jICMgXHRcdEB0aW50QnV0dG9uRml4ID0gbmV3IExheWVyXG4jICMgXHRcdFx0aGVpZ2h0OiAxMjAgKiAyXG4jICMgXHRcdFx0YmFja2dyb3VuZENvbG9yOiBudWxsXG5cdFx0XG4jICMgXHRcdEBidXR0b25UZXh0ID0gbmV3IFRleHRcbiMgIyBcdFx0XHRmb250U2l6ZTogMzIgKiAyXG4jICMgXHRcdFx0dGV4dEFsaWduOiBcInJpZ2h0XCJcbiMgIyBcdFx0XHRoZWlnaHQ6IDYwICogMlxuXHRcdFxuIyAjIFx0XHRAYnV0dG9uSWNvbiA9IG5ldyBTVkdMYXllclxuIyAjIFx0XHRcdHdpZHRoOiAyNCAqIDIsIGhlaWdodDogMjQgKiAyXG4jICMgXHRcdFx0c3ZnOiBTVkcub3Blbkljb24ub25MaWdodFxuIyAjIFx0XHRcdG9wYWNpdHk6IDAuNlxuXHRcdFx0XG5cblx0XHRcbiMgIyBcdFx0c3VwZXIgQG9wdGlvbnNcblxuIyAjIFx0XHRAYnV0dG9uVGV4dC50ZXh0ID0gQHRleHRcbiMgIyBcdFx0QHRleHQgPSBcIlwiXG5cbiMgIyBcdFx0QHRpbnRCdXR0b25GaXgucGFyZW50ID0gQHBhcmVudFxuIyAjIFx0XHRAdGludEJ1dHRvbkZpeC54ID0gQWxpZ24ucmlnaHRcbiMgIyBcdFx0QHRpbnRCdXR0b25GaXgueSA9IEFsaWduLnRvcFxuXHRcdFxuIyAjIFx0XHRAcGFyZW50ID0gQHRpbnRCdXR0b25GaXhcbiMgIyBcdFx0QHkgPSBBbGlnbi50b3AoMzAgKiAyKVxuIyAjIFx0XHRAaGVpZ2h0ID0gNjAgKiAyXG5cbiMgIyBcdFx0QGJ1dHRvblRleHQucGFyZW50ID0gQFxuIyAjIFx0XHRAYnV0dG9uVGV4dC54ID0gMTYgKiAyXG4jICMgXHRcdEBidXR0b25UZXh0LnkgPSA5ICogMlxuXG4jICMgXHRcdEBidXR0b25JY29uLnBhcmVudCA9IEBcbiMgIyBcdFx0QGJ1dHRvbkljb24ueCA9IDE2ICogMiArIEBidXR0b25UZXh0LndpZHRoICsgMTYgKiAyXG4jICMgXHRcdEBidXR0b25JY29uLnkgPSBBbGlnbi5jZW50ZXIoMyAqIDIpXG5cbiMgIyBcdFx0QHdpZHRoID0gMTYgKiAyICsgQGJ1dHRvblRleHQud2lkdGggKyBAYnV0dG9uSWNvbi53aWR0aCArIDE2ICogMiArIDE2ICogMlxuIyAjIFx0XHRAdGludEJ1dHRvbkZpeC53aWR0aCA9IEB3aWR0aCArIDMwICogMiArIDE2ICogMlxuXG4jICMgXHRcdEB0aW50QnV0dG9uRml4LnggPSBBbGlnbi5yaWdodFxuIyAjIFx0XHRAeCA9IEFsaWduLnJpZ2h0KC0zMCAqIDIpXG5cdFx0XG5cdFxuXG4jICMgXHRAZGVmaW5lICdsaW5rJyxcbiMgIyBcdFx0Z2V0OiAtPiBAb3B0aW9ucy5saW5rXG4jICMgXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy5saW5rID0gdmFsdWVcblx0XG4jICMgXHRzZXRDb2xvcjogKGNvbG9yID0gbnVsbCkgPT5cbiMgIyBcdFx0aWYgY29sb3IgPT0gbnVsbCB0aGVuIHJldHVyblxuIyAjIFx0XHRAdGludEJ1dHRvbkZpeC5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvclxuXHRcblxuXG5cblxuXG5cblxuXG4jIGNsYXNzIFByZXZpZXdCdXR0b24gZXh0ZW5kcyBUZXh0XG4jIFx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuIyBcdFx0Xy5kZWZhdWx0cyBAb3B0aW9ucyxcbiMgXHRcdFx0dHVwbGU6IHsgbm9ybWFsOiAxLjAsIGhvdmVyOiAwLjggfVxuXHRcdFxuIyBcdFx0c3VwZXIgQG9wdGlvbnNcblxuIyBcdFx0QHJlbW92ZUFsbExpc3RlbmVycygpXG5cbiMgXHRcdEAub25Nb3VzZU92ZXIgQEhvdmVyXG4jIFx0XHRALm9uTW91c2VPdXQgQEhvdmVyT2ZmXG5cbiMgXHRIb3ZlcjogPT5cbiMgXHRcdCMgQHNjYWxlID0gMS4wNVxuIyBcdFx0QG9wYWNpdHkgPSAxLjBcblx0XG4jIFx0SG92ZXJPZmY6ID0+XG4jIFx0XHQjIEBzY2FsZSA9IDEuMFxuIyBcdFx0QG9wYWNpdHkgPSAwLjhcblxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSB7VGV4dCwgVGV4dEJ1dHRvbiwgQnV0dG9uLCBCdXR0b25UYWJ9XG5cblxuIiwiXG5cbntVSV9TZWN0aW9ufSA9IHJlcXVpcmUgXCJVSV9TZWN0aW9uXCJcbntUZXh0LCBCdXR0b259ID0gcmVxdWlyZSBcIlVJX0J1dHRvbnNcIlxuXG5jbGFzcyBleHBvcnRzLlVJX0NvbmZpZyBleHRlbmRzIFVJX1NlY3Rpb25cblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0aGVpZ2h0OiAxMDAsIHk6IEFsaWduLmJvdHRvbSgtOClcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0XHR2aWV3OiBudWxsXG5cblx0XHRzdXBlciBAb3B0aW9uc1xuXHRcdEB1cGRhdGVDb25maWdPblJlc2l6ZSgpXG5cblxuXHRAZGVmaW5lICd2aWV3Jyxcblx0XHRnZXQ6IC0+IEBvcHRpb25zLnZpZXdcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQG9wdGlvbnMudmlldyA9IHZhbHVlXG5cblxuXHR1cGRhdGVDb25maWdPblJlc2l6ZTogKCkgPT5cblx0XHRsb2NhbENvbmZpZyA9IEBcblx0XHRcblx0XHRDYW52YXMub24gXCJjaGFuZ2U6aGVpZ2h0XCIsID0+IGxvY2FsQ29uZmlnLnkgPSBBbGlnbi5ib3R0b20oLTgpXG5cblxuXG5cdCMgT3ZlcnJpZGVcblx0YWRkU2VjdGlvbjogKGFjdGlvbkFycmF5ID0gW10pID0+XG5cdFx0c2VjdGlvblZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IDM2MCwgaGVpZ2h0OiAxMDAsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0eDogMzIsIHk6IEFsaWduLmJvdHRvbSgpXG5cblx0XHRAYWRkU2VjdGlvblRpdGxlKHNlY3Rpb25WaWV3LCBcIlByZXZpZXdcIilcblx0XHRzZWN0aW9uVmlldy5zdHlsZSA9IGN1cnNvcjogXCJwb2ludGVyXCJcblx0XHRzZWN0aW9uVmlldy5vblRhcCAtPiA7XG5cdFx0c2VjdGlvblZpZXcuc2hvd0hpbnQgPSAtPiA7XG5cblx0XHRzdW1YID0gMFxuXHRcdGZvciBhY3Rpb25JdGVtLCBpIGluIGFjdGlvbkFycmF5XG5cdFx0XHRzZWN0aW9uQnV0dG9uID0gQGFkZEFjdGlvbkJ1dHRvbihhY3Rpb25JdGVtLCBpKVxuXHRcdFx0c2VjdGlvbkJ1dHRvbi5wYXJlbnQgPSBzZWN0aW9uVmlld1xuXHRcdFx0c2VjdGlvbkJ1dHRvbi54ID0gc3VtWFxuXHRcdFx0c3VtWCArPSBzZWN0aW9uQnV0dG9uLndpZHRoICsgOCArIDRcblx0XHRcblx0XHRAd2lkdGggPSBNYXRoLm1heChAd2lkdGgsIHN1bVgpXG5cdFxuXG5cblx0IyBPdmVycmlkZVxuXHRhZGRBY3Rpb25CdXR0b246IChhY3Rpb25JdGVtLCBpbmRleCkgPT5cblx0XHRidXR0b25MYXllciA9IG5ldyBCdXR0b25cblx0XHRcdHRleHQ6IGFjdGlvbkl0ZW0udGl0bGVcblx0XHRcdHk6IDQyXG5cdFx0XHRzZWxlY3RlZDogaWYgaW5kZXggaXMgMCB0aGVuIHRydWUgZWxzZSBmYWxzZVxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRhY3Rpb25JdGVtOiBhY3Rpb25JdGVtXG5cdFx0XG5cdFx0Y29tcGxleEhhbmRsZXIgPSAoKSAtPlxuXHRcdFx0QGN1c3RvbS5hY3Rpb25JdGVtLmhhbmRsZXIoQGN1c3RvbS5hY3Rpb25JdGVtLmRhdGEsIEApXG5cblx0XHRidXR0b25MYXllci5vbihFdmVudHMuVGFwLCBjb21wbGV4SGFuZGxlcilcblx0XHRyZXR1cm4gYnV0dG9uTGF5ZXIiLCJcblxuXG57VGV4dCwgQnV0dG9uVGFifSA9IHJlcXVpcmUgXCJVSV9CdXR0b25zXCJcblxuY2xhc3MgZXhwb3J0cy5VSV9TZWN0aW9uIGV4dGVuZHMgTGF5ZXJcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblx0XHRcblx0XHRfLmRlZmF1bHRzIEBvcHRpb25zLFxuXHRcdFx0d2lkdGg6IDIwMCwgaGVpZ2h0OiBTY3JlZW4uaGVpZ2h0LCB5OiAxMDBcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXG5cdFx0c3VwZXIgQG9wdGlvbnNcblx0XG5cblx0YWRkU2VjdGlvbjogKHRpdGxlLCBhY3Rpb25BcnJheSA9IFtdKSA9PlxuXG5cdFx0c2VjdGlvblZpZXcgPSBuZXcgTGF5ZXJcblx0XHRcdHBhcmVudDogQFxuXHRcdFx0d2lkdGg6IDM2MCwgaGVpZ2h0OiAxMDAsIGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0eDogMzIsIHk6IEBjaGlsZHJlbi5sZW5ndGggKiAxMDBcblxuXHRcdEBhZGRTZWN0aW9uVGl0bGUoc2VjdGlvblZpZXcsIHRpdGxlKVxuXG5cdFx0c2VjdGlvblZpZXcuc3R5bGUgPSBjdXJzb3I6IFwicG9pbnRlclwiXG5cdFx0c2VjdGlvblZpZXcub25UYXAgLT4gO1xuXHRcdHNlY3Rpb25WaWV3LnNob3dIaW50ID0gLT4gO1xuXG5cdFx0c3VtWCA9IDBcblx0XHRmb3IgYWN0aW9uSXRlbSwgaSBpbiBhY3Rpb25BcnJheVxuXHRcdFx0c2VjdGlvbkJ1dHRvbiA9IEBhZGRBY3Rpb25CdXR0b24oYWN0aW9uSXRlbSwgaSlcblx0XHRcdHNlY3Rpb25CdXR0b24ucGFyZW50ID0gc2VjdGlvblZpZXdcblx0XHRcdHNlY3Rpb25CdXR0b24ueCA9IHN1bVhcblx0XHRcdHN1bVggKz0gc2VjdGlvbkJ1dHRvbi53aWR0aCArIDhcblx0XHRcblx0XHRAd2lkdGggPSBNYXRoLm1heChAd2lkdGgsIHN1bVgpXG5cblxuXG5cdGFkZEFjdGlvbkJ1dHRvbjogKGFjdGlvbkl0ZW0sIGluZGV4KSA9PlxuXHRcdGJ1dHRvbkxheWVyID0gbmV3IEJ1dHRvblRhYlxuXHRcdFx0dGV4dDogYWN0aW9uSXRlbS50aXRsZVxuXHRcdFx0eTogNDJcblx0XHRcdHNlbGVjdGVkOiBpZiBpbmRleCBpcyAwIHRoZW4gdHJ1ZSBlbHNlIGZhbHNlXG5cdFx0XHRjdXN0b206XG5cdFx0XHRcdGFjdGlvbkl0ZW06IGFjdGlvbkl0ZW1cblx0XHRcblx0XHRjb21wbGV4SGFuZGxlciA9ICgpIC0+XG5cdFx0XHRAY3VzdG9tLmFjdGlvbkl0ZW0uaGFuZGxlcihAY3VzdG9tLmFjdGlvbkl0ZW0uZGF0YSwgQClcblx0XHRcdGZvciBidXR0b24gaW4gQHBhcmVudC5jaGlsZHJlblxuXHRcdFx0XHRpZiBidXR0b24ubmFtZSBpc250IFwiLnNlY3Rpb25UaXRsZVwiXG5cdFx0XHRcdFx0YnV0dG9uLnNlbGVjdGVkID0gdHJ1ZSBpZiBidXR0b24gaXMgQFxuXHRcdFx0XHRcdGJ1dHRvbi5zZWxlY3RlZCA9IGZhbHNlIGlmIGJ1dHRvbiBpc250IEBcblxuXHRcdGJ1dHRvbkxheWVyLm9uKEV2ZW50cy5UYXAsIGNvbXBsZXhIYW5kbGVyKVxuXHRcdHJldHVybiBidXR0b25MYXllclxuXG5cblx0YWRkU2VjdGlvblRpdGxlOiAobG9jYWxQYXJlbnQsIHRpdGxlID0gXCJIZWFkZXIgVGl0bGVcIikgPT5cblx0XHRuZXcgVGV4dFxuXHRcdFx0cGFyZW50OiBsb2NhbFBhcmVudFxuXHRcdFx0dGV4dDogdGl0bGUsIG5hbWU6IFwiLnNlY3Rpb25UaXRsZVwiXG5cdFx0XHRmb250U2l6ZTogMTYsIG9wYWNpdHk6IDAuNSwgcGFkZGluZzogeyB0b3A6IDEyIH1cblxuIiwiXG5cbiMge1NlY3Rpb25WaWV3fSA9IHJlcXVpcmUgXCJTZWN0aW9uVmlld1wiXG5cblxuY2xhc3MgZXhwb3J0cy5UcmVlTGF5ZXJWaWV3IGV4dGVuZHMgU2VjdGlvblZpZXdcblx0Y29uc3RydWN0b3I6IChAb3B0aW9ucz17fSkgLT5cblxuXHRcdHRyZWVWaWV3TGF5ZXIgPSBuZXcgU2Nyb2xsQ29tcG9uZW50XG5cdFx0XHR3aWR0aDogMzIwXG5cdFx0XHRoZWlnaHQ6IDBcblx0XHRcdHNjcm9sbFZlcnRpY2FsOiB0cnVlXG5cdFx0XHRzY3JvbGxIb3Jpem9udGFsOiBmYWxzZVxuXHRcdFx0bW91c2VXaGVlbEVuYWJsZWQ6IHRydWVcblx0XHRcdGJhY2tncm91bmRDb2xvcjogXCIjMjIyXCJcblx0XHRcblx0XHR0cmVlVmlld0xheWVyLmNvbnRlbnQuaGVpZ2h0ID0gMFxuXHRcdHRyZWVWaWV3TGF5ZXIubW91c2VXaGVlbEVuYWJsZWQgPSB0cnVlXG5cdFx0XHRcblxuXHRcdF8uZGVmYXVsdHMgQG9wdGlvbnMsXG5cdFx0XHR0cmVlVmlldzogdHJlZVZpZXdMYXllclxuXHRcdFx0aW5kZW50OiAxXG5cdFx0XG5cdFx0c3VwZXIgQG9wdGlvbnNcblxuXHRcdHRyZWVWaWV3TGF5ZXIucGFyZW50ID0gQHBhcmVudFxuXG5cdFxuXHRAZGVmaW5lICd0cmVlVmlldycsXG5cdFx0Z2V0OiAtPiBAb3B0aW9ucy50cmVlVmlld1xuXHRcdHNldDogKHZhbHVlKSAtPiBAb3B0aW9ucy50cmVlVmlldyA9IHZhbHVlXG5cdFxuXHRAZGVmaW5lICdpbmRlbnQnLFxuXHRcdGdldDogLT4gQG9wdGlvbnMuaW5kZW50XG5cdFx0c2V0OiAodmFsdWUpIC0+IEBvcHRpb25zLmluZGVudCA9IHZhbHVlXG5cdFxuXG5cblx0cHJpbnRUcmVlOiAoKSA9PlxuXHRcdHByaW50IEB2aWV3LmNoaWxkcmVuXG5cdFx0QHByaW50Tm9kZShAdmlldylcblx0XHRAdHJlZVZpZXcuaGVpZ2h0ID0gU2NyZWVuLmhlaWdodFxuXHRcdEB0cmVlVmlldy51cGRhdGVDb250ZW50KClcblx0XG5cblx0cHJpbnROb2RlOiAobm9kZSwgbGV2ZWwgPSAwKSA9PlxuXHRcdGlmIG5vZGUubmFtZSA9PSBcIlwiIHRoZW4gbGF5ZXJOYW1lID0gXCJVbnRpdGxlZFwiIGVsc2UgbGF5ZXJOYW1lID0gbm9kZS5uYW1lXG5cdFx0IyBwcmludCBBcnJheShsZXZlbCArIDEpLmpvaW4oXCIg44O7IFwiKSArIFwiICN7bGF5ZXJOYW1lfVwiXG5cblx0XHR0cmVlTm9kZUxheWVyID0gbmV3IFRleHRMYXllclxuXHRcdFx0cGFyZW50OiBAdHJlZVZpZXcuY29udGVudFxuXHRcdFx0dGV4dDogQXJyYXkobGV2ZWwgKyAxKS5qb2luKFwiIOODuyBcIikgKyBcIiAje2xheWVyTmFtZX1cIlxuXHRcdFx0XG5cdFx0XHRmb250U2l6ZTogMTVcblx0XHRcdGZvbnRXZWlnaHQ6IDUwMFxuXHRcdFx0Y29sb3I6IFwid2hpdGVcIlxuXG5cdFx0XHRvcGFjaXR5OiBpZiBsYXllck5hbWUgPT0gXCJVbnRpdGxlZFwiIHRoZW4gMC41IGVsc2UgMVxuXHRcdFx0aGVpZ2h0OiAyOFxuXHRcdFx0eTogQHRyZWVWaWV3LmhlaWdodFxuXHRcdFx0IyBiYWNrZ3JvdW5kQ29sb3I6IFV0aWxzLnJhbmRvbUNvbG9yKClcblx0XHRcdGJhY2tncm91bmRDb2xvcjogbnVsbFxuXHRcdFx0Y3VzdG9tOlxuXHRcdFx0XHRsYXllcjogbm9kZVxuXHRcdFxuXHRcdHRyZWVOb2RlTGF5ZXIub25UYXAgLT5cblx0XHRcdHByaW50IFwiI3tAY3VzdG9tLmxheWVyLm5hbWV9IHg6ICN7QGN1c3RvbS5sYXllci54fSB5OiAje0BjdXN0b20ubGF5ZXIueX0gc2l6ZTogI3tAY3VzdG9tLmxheWVyLndpZHRofXgje0BjdXN0b20ubGF5ZXIuaGVpZ2h0fVwiXG5cblx0XHRcblx0XHRAdHJlZVZpZXcuaGVpZ2h0ICs9IDI4XG5cblxuXHRcdGlmIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMFxuXHRcdFx0bmV4dExldmVsID0gbGV2ZWwgKyAxXG5cdFx0XHRmb3IgY2hpbGROb2RlIGluIG5vZGUuY2hpbGRyZW5cblx0XHRcdFx0QHByaW50Tm9kZShjaGlsZE5vZGUsIG5leHRMZXZlbClcblx0XHRcbiJdfQ==
