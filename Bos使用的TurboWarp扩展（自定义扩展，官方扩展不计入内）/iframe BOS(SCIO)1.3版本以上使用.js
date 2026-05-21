// Name: BOS Iframe (消息增强版)
// ID: bosIframeMsg
// Description: 支持消息记录、最后消息获取、应用间通信

(function (Scratch) {
  "use strict";

  const iframesMap = new Map();
  let lastMessageApp = "";
  let lastMessageContent = "";

  // 新颜色：深蓝 + 青色（之前是红+青，现在换一套）🎨
  const COLOR1 = "#1E5BA3";  // 深蓝
  const COLOR2 = "#3A8CFF";  // 亮蓝

  // 默认沙箱策略
  const DEFAULT_SANDBOX = [
    "allow-scripts", "allow-forms", "allow-modals", "allow-popups",
    "allow-same-origin", "allow-storage-access-by-user-activation",
    "allow-downloads", "allow-orientation-lock", "allow-pointer-lock",
    "allow-presentation", "allow-top-navigation",
    "allow-top-navigation-by-user-activation",
  ].join(" ");

  const featurePolicy = {
    accelerometer: "'self'", "ambient-light-sensor": "'self'",
    autoplay: "'self'", battery: "'self'", camera: "'self'",
    "display-capture": "'self'", "document-domain": "'self'",
    "encrypted-media": "'self'", fullscreen: "'self'",
    geolocation: "'self'", gyroscope: "'self'", magnetometer: "'self'",
    microphone: "'self'", midi: "'self'", payment: "'self'",
    "picture-in-picture": "'self'", "publickey-credentials-get": "'self'",
    "speaker-selection": "'self'", usb: "'self'", vibrate: "'self'",
    vr: "'self'", "screen-wake-lock": "'self'", "web-share": "'self'",
    "interest-cohort": "'self'",
  };

  const textToBase64Url = (text, mimeType = 'text/html') => {
    try {
      const base64 = btoa(unescape(encodeURIComponent(text)));
      return `data:${mimeType};base64,${base64}`;
    } catch (e) {
      return `data:text/html,${encodeURIComponent(text)}`;
    }
  };

  const processUrlInput = (input, defaultMime = 'text/html') => {
    if (!input) return '';
    if (input.startsWith('http://') || input.startsWith('https://') ||
        input.startsWith('data:') || input.startsWith('file:')) {
      return input;
    }
    if (input.startsWith('base64,') || input.includes(';base64,')) {
      if (!input.startsWith('data:')) {
        return `data:${defaultMime};${input}`;
      }
      return input;
    }
    if (input.includes('<html') || input.includes('<body') ||
        input.includes('<div') || input.includes('<script') ||
        input.includes('<style')) {
      return textToBase64Url(input, defaultMime);
    }
    return textToBase64Url(input, defaultMime);
  };

  const sendMessageToIframe = (name, message) => {
    const info = iframesMap.get(name);
    if (!info) return false;
    try {
      info.iframe.contentWindow.postMessage(message, '*');
      return true;
    } catch (e) {
      return false;
    }
  };

  const broadcastMessage = (message) => {
    let count = 0;
    for (const [name, info] of iframesMap.entries()) {
      if (sendMessageToIframe(name, message)) count++;
    }
    return count;
  };

  const closeFrame = (name) => {
    const info = iframesMap.get(name);
    if (!info) return;
    if (info.messageHandler) {
      window.removeEventListener('message', info.messageHandler);
    }
    Scratch.renderer.removeOverlay(info.iframe);
    if (info.iframe.parentNode) {
      info.iframe.parentNode.removeChild(info.iframe);
    }
    iframesMap.delete(name);
  };

  const updateFramePosition = (name) => {
    const info = iframesMap.get(name);
    if (!info) return;
    const { iframe, x, y, width, height, interactive, visible, layer } = info;
    iframe.style.pointerEvents = interactive ? "auto" : "none";
    iframe.style.display = visible ? "" : "none";
    iframe.style.opacity = visible ? "1" : "0";
    iframe.style.zIndex = layer;
    iframe.style.width = `${Math.max(width, 1)}px`;
    iframe.style.height = `${Math.max(height, 1)}px`;
    iframe.style.transform = `translate(${-width / 2 + x}px, ${-height / 2 - y}px)`;
    iframe.style.top = "0";
    iframe.style.left = "0";
  };

  const createFrame = (src, name, options = {}) => {
    if (iframesMap.has(name)) closeFrame(name);

    const processedUrl = processUrlInput(src, options.mimeType || 'text/html');
    if (!processedUrl) return;

    const iframe = document.createElement("iframe");
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.position = "absolute";
    iframe.style.background = "transparent";
    iframe.setAttribute("sandbox", DEFAULT_SANDBOX);
    iframe.setAttribute("allow", Object.entries(featurePolicy)
      .map(([k, v]) => `${k} ${v}`).join("; "));
    iframe.setAttribute("allowtransparency", "true");
    iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
    iframe.setAttribute("crossorigin", "anonymous");
    iframe.src = processedUrl;

    const overlay = Scratch.renderer.addOverlay(iframe, "scale-centered");

    const frameInfo = {
      iframe, overlay, name, url: processedUrl,
      visible: true, interactive: true, x: 0, y: 0,
      width: Scratch.vm.runtime.stageWidth,
      height: Scratch.vm.runtime.stageHeight, layer: 1,
      util: options.util,
      lastMessage: null,
    };

    const messageHandler = (event) => {
      if (event.source !== iframe.contentWindow) return;
      const data = event.data;
      frameInfo.lastMessage = data;
      lastMessageApp = name;
      lastMessageContent = data;
      
      if (frameInfo.util && frameInfo.util.startHats) {
        frameInfo.util.startHats('bosIframeMsg_onMessage', { NAME: name });
        frameInfo.util.startHats('bosIframeMsg_onAnyMessage');
      }
    };
    window.addEventListener('message', messageHandler);
    frameInfo.messageHandler = messageHandler;

    iframe.addEventListener('load', () => {
      console.log(`BOS iframe: ${name} loaded`);
    }, { once: true });

    iframesMap.set(name, frameInfo);
    updateFramePosition(name);
    return iframe;
  };

  Scratch.vm.on("STAGE_SIZE_CHANGED", () => {
    for (const name of iframesMap.keys()) updateFramePosition(name);
  });

  Scratch.vm.runtime.on("RUNTIME_DISPOSED", () => {
    for (const name of iframesMap.keys()) closeFrame(name);
  });

  class BosIframeExtension {
    getInfo() {
      return {
        name: "BOS Iframe (消息增强版)",
        id: "bosIframeMsg",  // ← 新 ID，不会和旧版冲突
        color1: COLOR1,
        color2: COLOR2,
        blocks: [
          {
            opcode: "bosRunHtml",
            blockType: Scratch.BlockType.COMMAND,
            text: "运行 HTML [HTML] 命名为 [NAME]",
            arguments: {
              HTML: { type: Scratch.ArgumentType.STRING, defaultValue: "<h1>Hello BOS</h1>" },
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "App" }
            }
          },
          {
            opcode: "bosOpenUrl",
            blockType: Scratch.BlockType.COMMAND,
            text: "打开网址 [URL] 命名为 [NAME]",
            arguments: {
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "https://example.com" },
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "Web" }
            }
          },
          {
            opcode: "bosOpenBase64",
            blockType: Scratch.BlockType.COMMAND,
            text: "打开 Base64 [BASE64] 命名为 [NAME]",
            arguments: {
              BASE64: { type: Scratch.ArgumentType.STRING, defaultValue: "base64,PGgxPkhlbGxvPC9oMT4=" },
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "BaseApp" }
            }
          },
          "---",
          {
            opcode: "bosSendMessage",
            blockType: Scratch.BlockType.COMMAND,
            text: "向 [NAME] 发送消息 [MSG]",
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "App" },
              MSG: { type: Scratch.ArgumentType.STRING, defaultValue: "hello" }
            }
          },
          {
            opcode: "bosBroadcastMessage",
            blockType: Scratch.BlockType.COMMAND,
            text: "广播消息 [MSG] 给所有应用",
            arguments: {
              MSG: { type: Scratch.ArgumentType.STRING, defaultValue: "ping" }
            }
          },
          "---",
          {
            opcode: "setPosition",
            blockType: Scratch.BlockType.COMMAND,
            text: "移动 [NAME] 到 x:[X] y:[Y]",
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "App" },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          },
          {
            opcode: "setSize",
            blockType: Scratch.BlockType.COMMAND,
            text: "设置 [NAME] 大小 宽:[W] 高:[H]",
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "App" },
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 480 },
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 360 }
            }
          },
          {
            opcode: "bosTerminate",
            blockType: Scratch.BlockType.COMMAND,
            text: "终止 [NAME] 应用",
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "App" }
            }
          },
          {
            opcode: "bosGetAllApps",
            blockType: Scratch.BlockType.REPORTER,
            text: "所有运行中的应用列表",
          },
          "---",
          {
            opcode: "onMessage",
            blockType: Scratch.BlockType.EVENT,
            text: "当 [NAME] 收到消息",
            isEdgeActivated: false,
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "App" }
            }
          },
          {
            opcode: "onAnyMessage",
            blockType: Scratch.BlockType.EVENT,
            text: "当任何应用收到消息",
            isEdgeActivated: false,
          },
          {
            opcode: "getLastMessage",
            blockType: Scratch.BlockType.REPORTER,
            text: "应用 [NAME] 最后收到的消息",
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "App" }
            }
          },
          {
            opcode: "getLastMessageApp",
            blockType: Scratch.BlockType.REPORTER,
            text: "最后收到消息的应用名",
          },
          {
            opcode: "getLastMessageContent",
            blockType: Scratch.BlockType.REPORTER,
            text: "最后收到的消息内容",
          }
        ]
      };
    }

    bosRunHtml(args, util) {
      createFrame(Scratch.Cast.toString(args.HTML), Scratch.Cast.toString(args.NAME), { util });
    }

    bosOpenUrl(args, util) {
      const url = Scratch.Cast.toString(args.URL);
      if (!url.startsWith('http://') && !url.startsWith('https://')) return;
      createFrame(url, Scratch.Cast.toString(args.NAME), { util });
    }

    bosOpenBase64(args, util) {
      const base64 = Scratch.Cast.toString(args.BASE64);
      const processed = processUrlInput(base64);
      if (processed) createFrame(processed, Scratch.Cast.toString(args.NAME), { util });
    }

    bosSendMessage(args) {
      const name = Scratch.Cast.toString(args.NAME);
      const msg = Scratch.Cast.toString(args.MSG);
      return sendMessageToIframe(name, msg);
    }

    bosBroadcastMessage(args) {
      const msg = Scratch.Cast.toString(args.MSG);
      return broadcastMessage(msg);
    }

    setPosition(args) {
      const info = iframesMap.get(Scratch.Cast.toString(args.NAME));
      if (info) {
        info.x = Scratch.Cast.toNumber(args.X);
        info.y = Scratch.Cast.toNumber(args.Y);
        updateFramePosition(info.name);
      }
    }

    setSize(args) {
      const info = iframesMap.get(Scratch.Cast.toString(args.NAME));
      if (info) {
        info.width = Math.max(Scratch.Cast.toNumber(args.W), 1);
        info.height = Math.max(Scratch.Cast.toNumber(args.H), 1);
        updateFramePosition(info.name);
      }
    }

    bosTerminate(args) {
      closeFrame(Scratch.Cast.toString(args.NAME));
    }

    bosGetAllApps() {
      const apps = [];
      for (const name of iframesMap.keys()) apps.push(name);
      return apps.join(", ");
    }

    onMessage(args, util) {}
    onAnyMessage(args, util) {}
    
    getLastMessage(args) {
      const info = iframesMap.get(Scratch.Cast.toString(args.NAME));
      return info && info.lastMessage !== null ? String(info.lastMessage) : "";
    }
    
    getLastMessageApp() {
      return lastMessageApp;
    }
    
    getLastMessageContent() {
      return lastMessageContent;
    }
  }

  Scratch.extensions.register(new BosIframeExtension());
})(Scratch);
