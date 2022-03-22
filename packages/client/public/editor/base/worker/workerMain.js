/*! For license information please see workerMain.js.LICENSE.txt */
(function () {
  var e,
    t,
    n = [
      "require",
      "exports",
      "vs/base/common/strings",
      "vs/base/common/platform",
      "vs/base/common/event",
      "vs/editor/common/core/position",
      "vs/editor/common/core/range",
      "vs/base/common/lifecycle",
      "vs/base/common/path",
      "vs/base/common/types",
      "vs/base/common/errors",
      "vs/base/common/uri",
      "vs/base/common/stopwatch",
      "vs/base/common/cancellation",
      "vs/base/common/diff/diff",
      "vs/base/common/uint",
      "vs/editor/common/core/characterClassifier",
      "vs/editor/common/model",
      "vs/base/common/arrays",
      "vs/base/common/cache",
      "vs/base/common/codicons",
      "vs/base/common/diff/diffChange",
      "vs/base/common/functional",
      "vs/base/common/iterator",
      "vs/base/common/keyCodes",
      "vs/base/common/lazy",
      "vs/base/common/linkedList",
      "vs/base/common/process",
      "vs/base/common/async",
      "vs/base/common/extpath",
      "vs/base/common/hash",
      "vs/base/common/map",
      "vs/base/common/glob",
      "vs/base/common/objects",
      "vs/editor/common/core/selection",
      "vs/editor/common/core/wordCharacterClassifier",
      "vs/editor/common/core/wordHelper",
      "vs/editor/common/diff/diffComputer",
      "vs/editor/common/languageSelector",
      "vs/editor/common/languages/linkComputer",
      "vs/editor/common/languages/supports/inplaceReplaceSupport",
      "vs/editor/common/languageFeatureRegistry",
      "vs/editor/common/model/prefixSumComputer",
      "vs/editor/common/model/mirrorTextModel",
      "vs/editor/common/model/textModelSearch",
      "vs/editor/common/languages/unicodeTextModelHighlighter",
      "vs/editor/common/standalone/standaloneEnums",
      "vs/editor/common/tokenizationRegistry",
      "vs/editor/common/languages",
      "vs/editor/common/services/editorBaseApi",
      "vs/base/common/worker/simpleWorker",
      "vs/editor/common/services/editorSimpleWorker",
    ],
    r = function (e) {
      for (var t = [], r = 0, i = e.length; r < i; r++) t[r] = n[e[r]];
      return t;
    },
    i = this,
    o = "object" == typeof global ? global : {};
  !(function (e) {
    e.global = i;
    var t = (function () {
      function t() {
        (this._detected = !1),
          (this._isWindows = !1),
          (this._isNode = !1),
          (this._isElectronRenderer = !1),
          (this._isWebWorker = !1),
          (this._isElectronNodeIntegrationWebWorker = !1);
      }
      return (
        Object.defineProperty(t.prototype, "isWindows", {
          get: function () {
            return this._detect(), this._isWindows;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "isNode", {
          get: function () {
            return this._detect(), this._isNode;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "isElectronRenderer", {
          get: function () {
            return this._detect(), this._isElectronRenderer;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "isWebWorker", {
          get: function () {
            return this._detect(), this._isWebWorker;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(
          t.prototype,
          "isElectronNodeIntegrationWebWorker",
          {
            get: function () {
              return this._detect(), this._isElectronNodeIntegrationWebWorker;
            },
            enumerable: !1,
            configurable: !0,
          }
        ),
        (t.prototype._detect = function () {
          this._detected ||
            ((this._detected = !0),
            (this._isWindows = t._isWindows()),
            (this._isNode = "undefined" != typeof module && !!module.exports),
            (this._isElectronRenderer =
              "undefined" != typeof process &&
              "undefined" != typeof process.versions &&
              "undefined" != typeof process.versions.electron &&
              "renderer" === process.type),
            (this._isWebWorker = "function" == typeof e.global.importScripts),
            (this._isElectronNodeIntegrationWebWorker =
              this._isWebWorker &&
              "undefined" != typeof process &&
              "undefined" != typeof process.versions &&
              "undefined" != typeof process.versions.electron &&
              "worker" === process.type));
        }),
        (t._isWindows = function () {
          return (
            !!(
              "undefined" != typeof navigator &&
              navigator.userAgent &&
              navigator.userAgent.indexOf("Windows") >= 0
            ) ||
            ("undefined" != typeof process && "win32" === process.platform)
          );
        }),
        t
      );
    })();
    e.Environment = t;
  })(t || (t = {})),
    (function (e) {
      var t = function (e, t, n) {
        (this.type = e), (this.detail = t), (this.timestamp = n);
      };
      e.LoaderEvent = t;
      var n = (function () {
        function n(e) {
          this._events = [new t(1, "", e)];
        }
        return (
          (n.prototype.record = function (n, r) {
            this._events.push(
              new t(n, r, e.Utilities.getHighPerformanceTimestamp())
            );
          }),
          (n.prototype.getEvents = function () {
            return this._events;
          }),
          n
        );
      })();
      e.LoaderEventRecorder = n;
      var r = (function () {
        function e() {}
        return (
          (e.prototype.record = function (e, t) {}),
          (e.prototype.getEvents = function () {
            return [];
          }),
          (e.INSTANCE = new e()),
          e
        );
      })();
      e.NullLoaderEventRecorder = r;
    })(t || (t = {})),
    (function (e) {
      var t = (function () {
        function t() {}
        return (
          (t.fileUriToFilePath = function (e, t) {
            if (((t = decodeURI(t).replace(/%23/g, "#")), e)) {
              if (/^file:\/\/\//.test(t)) return t.substr(8);
              if (/^file:\/\//.test(t)) return t.substr(5);
            } else if (/^file:\/\//.test(t)) return t.substr(7);
            return t;
          }),
          (t.startsWith = function (e, t) {
            return e.length >= t.length && e.substr(0, t.length) === t;
          }),
          (t.endsWith = function (e, t) {
            return e.length >= t.length && e.substr(e.length - t.length) === t;
          }),
          (t.containsQueryString = function (e) {
            return /^[^\#]*\?/gi.test(e);
          }),
          (t.isAbsolutePath = function (e) {
            return /^((http:\/\/)|(https:\/\/)|(file:\/\/)|(\/))/.test(e);
          }),
          (t.forEachProperty = function (e, t) {
            if (e) {
              var n = void 0;
              for (n in e) e.hasOwnProperty(n) && t(n, e[n]);
            }
          }),
          (t.isEmpty = function (e) {
            var n = !0;
            return (
              t.forEachProperty(e, function () {
                n = !1;
              }),
              n
            );
          }),
          (t.recursiveClone = function (e) {
            if (
              !e ||
              "object" != typeof e ||
              e instanceof RegExp ||
              (!Array.isArray(e) &&
                Object.getPrototypeOf(e) !== Object.prototype)
            )
              return e;
            var n = Array.isArray(e) ? [] : {};
            return (
              t.forEachProperty(e, function (e, r) {
                n[e] = r && "object" == typeof r ? t.recursiveClone(r) : r;
              }),
              n
            );
          }),
          (t.generateAnonymousModule = function () {
            return "===anonymous" + t.NEXT_ANONYMOUS_ID++ + "===";
          }),
          (t.isAnonymousModule = function (e) {
            return t.startsWith(e, "===anonymous");
          }),
          (t.getHighPerformanceTimestamp = function () {
            return (
              this.PERFORMANCE_NOW_PROBED ||
                ((this.PERFORMANCE_NOW_PROBED = !0),
                (this.HAS_PERFORMANCE_NOW =
                  e.global.performance &&
                  "function" == typeof e.global.performance.now)),
              this.HAS_PERFORMANCE_NOW ? e.global.performance.now() : Date.now()
            );
          }),
          (t.NEXT_ANONYMOUS_ID = 1),
          (t.PERFORMANCE_NOW_PROBED = !1),
          (t.HAS_PERFORMANCE_NOW = !1),
          t
        );
      })();
      e.Utilities = t;
    })(t || (t = {})),
    (function (e) {
      function t(e) {
        if (e instanceof Error) return e;
        var t = new Error(e.message || String(e) || "Unknown Error");
        return e.stack && (t.stack = e.stack), t;
      }
      e.ensureError = t;
      var n = (function () {
        function n() {}
        return (
          (n.validateConfigurationOptions = function (n) {
            if (
              ("string" != typeof (n = n || {}).baseUrl && (n.baseUrl = ""),
              "boolean" != typeof n.isBuild && (n.isBuild = !1),
              "object" != typeof n.paths && (n.paths = {}),
              "object" != typeof n.config && (n.config = {}),
              "undefined" == typeof n.catchError && (n.catchError = !1),
              "undefined" == typeof n.recordStats && (n.recordStats = !1),
              "string" != typeof n.urlArgs && (n.urlArgs = ""),
              "function" != typeof n.onError &&
                (n.onError = function (e) {
                  return "loading" === e.phase
                    ? (console.error('Loading "' + e.moduleId + '" failed'),
                      console.error(e),
                      console.error("Here are the modules that depend on it:"),
                      void console.error(e.neededBy))
                    : "factory" === e.phase
                    ? (console.error(
                        'The factory method of "' +
                          e.moduleId +
                          '" has thrown an exception'
                      ),
                      void console.error(e))
                    : void 0;
                }),
              Array.isArray(n.ignoreDuplicateModules) ||
                (n.ignoreDuplicateModules = []),
              n.baseUrl.length > 0 &&
                (e.Utilities.endsWith(n.baseUrl, "/") || (n.baseUrl += "/")),
              "string" != typeof n.cspNonce && (n.cspNonce = ""),
              "undefined" == typeof n.preferScriptTags &&
                (n.preferScriptTags = !1),
              Array.isArray(n.nodeModules) || (n.nodeModules = []),
              n.nodeCachedData &&
                "object" == typeof n.nodeCachedData &&
                ("string" != typeof n.nodeCachedData.seed &&
                  (n.nodeCachedData.seed = "seed"),
                ("number" != typeof n.nodeCachedData.writeDelay ||
                  n.nodeCachedData.writeDelay < 0) &&
                  (n.nodeCachedData.writeDelay = 7e3),
                !n.nodeCachedData.path ||
                  "string" != typeof n.nodeCachedData.path))
            ) {
              var r = t(
                new Error(
                  "INVALID cached data configuration, 'path' MUST be set"
                )
              );
              (r.phase = "configuration"),
                n.onError(r),
                (n.nodeCachedData = void 0);
            }
            return n;
          }),
          (n.mergeConfigurationOptions = function (t, r) {
            void 0 === t && (t = null), void 0 === r && (r = null);
            var i = e.Utilities.recursiveClone(r || {});
            return (
              e.Utilities.forEachProperty(t, function (t, n) {
                "ignoreDuplicateModules" === t &&
                "undefined" != typeof i.ignoreDuplicateModules
                  ? (i.ignoreDuplicateModules =
                      i.ignoreDuplicateModules.concat(n))
                  : "paths" === t && "undefined" != typeof i.paths
                  ? e.Utilities.forEachProperty(n, function (e, t) {
                      return (i.paths[e] = t);
                    })
                  : "config" === t && "undefined" != typeof i.config
                  ? e.Utilities.forEachProperty(n, function (e, t) {
                      return (i.config[e] = t);
                    })
                  : (i[t] = e.Utilities.recursiveClone(n));
              }),
              n.validateConfigurationOptions(i)
            );
          }),
          n
        );
      })();
      e.ConfigurationOptionsUtil = n;
      var r = (function () {
        function t(e, t) {
          if (
            ((this._env = e),
            (this.options = n.mergeConfigurationOptions(t)),
            this._createIgnoreDuplicateModulesMap(),
            this._createNodeModulesMap(),
            this._createSortedPathsRules(),
            "" === this.options.baseUrl)
          ) {
            if (
              this.options.nodeRequire &&
              this.options.nodeRequire.main &&
              this.options.nodeRequire.main.filename &&
              this._env.isNode
            ) {
              var r = this.options.nodeRequire.main.filename,
                i = Math.max(r.lastIndexOf("/"), r.lastIndexOf("\\"));
              this.options.baseUrl = r.substring(0, i + 1);
            }
            if (this.options.nodeMain && this._env.isNode) {
              (r = this.options.nodeMain),
                (i = Math.max(r.lastIndexOf("/"), r.lastIndexOf("\\")));
              this.options.baseUrl = r.substring(0, i + 1);
            }
          }
        }
        return (
          (t.prototype._createIgnoreDuplicateModulesMap = function () {
            this.ignoreDuplicateModulesMap = {};
            for (var e = 0; e < this.options.ignoreDuplicateModules.length; e++)
              this.ignoreDuplicateModulesMap[
                this.options.ignoreDuplicateModules[e]
              ] = !0;
          }),
          (t.prototype._createNodeModulesMap = function () {
            this.nodeModulesMap = Object.create(null);
            for (var e = 0, t = this.options.nodeModules; e < t.length; e++) {
              var n = t[e];
              this.nodeModulesMap[n] = !0;
            }
          }),
          (t.prototype._createSortedPathsRules = function () {
            var t = this;
            (this.sortedPathsRules = []),
              e.Utilities.forEachProperty(this.options.paths, function (e, n) {
                Array.isArray(n)
                  ? t.sortedPathsRules.push({ from: e, to: n })
                  : t.sortedPathsRules.push({ from: e, to: [n] });
              }),
              this.sortedPathsRules.sort(function (e, t) {
                return t.from.length - e.from.length;
              });
          }),
          (t.prototype.cloneAndMerge = function (e) {
            return new t(
              this._env,
              n.mergeConfigurationOptions(e, this.options)
            );
          }),
          (t.prototype.getOptionsLiteral = function () {
            return this.options;
          }),
          (t.prototype._applyPaths = function (t) {
            for (var n, r = 0, i = this.sortedPathsRules.length; r < i; r++)
              if (
                ((n = this.sortedPathsRules[r]),
                e.Utilities.startsWith(t, n.from))
              ) {
                for (var o = [], s = 0, a = n.to.length; s < a; s++)
                  o.push(n.to[s] + t.substr(n.from.length));
                return o;
              }
            return [t];
          }),
          (t.prototype._addUrlArgsToUrl = function (t) {
            return e.Utilities.containsQueryString(t)
              ? t + "&" + this.options.urlArgs
              : t + "?" + this.options.urlArgs;
          }),
          (t.prototype._addUrlArgsIfNecessaryToUrl = function (e) {
            return this.options.urlArgs ? this._addUrlArgsToUrl(e) : e;
          }),
          (t.prototype._addUrlArgsIfNecessaryToUrls = function (e) {
            if (this.options.urlArgs)
              for (var t = 0, n = e.length; t < n; t++)
                e[t] = this._addUrlArgsToUrl(e[t]);
            return e;
          }),
          (t.prototype.moduleIdToPaths = function (t) {
            if (
              this._env.isNode &&
              (!0 === this.nodeModulesMap[t] ||
                (this.options.amdModulesPattern instanceof RegExp &&
                  !this.options.amdModulesPattern.test(t)))
            )
              return this.isBuild() ? ["empty:"] : ["node|" + t];
            var n,
              r = t;
            if (e.Utilities.endsWith(r, ".js") || e.Utilities.isAbsolutePath(r))
              !e.Utilities.endsWith(r, ".js") &&
                !e.Utilities.containsQueryString(r) &&
                (r += ".js"),
                (n = [r]);
            else
              for (var i = 0, o = (n = this._applyPaths(r)).length; i < o; i++)
                (this.isBuild() && "empty:" === n[i]) ||
                  (e.Utilities.isAbsolutePath(n[i]) ||
                    (n[i] = this.options.baseUrl + n[i]),
                  !e.Utilities.endsWith(n[i], ".js") &&
                    !e.Utilities.containsQueryString(n[i]) &&
                    (n[i] = n[i] + ".js"));
            return this._addUrlArgsIfNecessaryToUrls(n);
          }),
          (t.prototype.requireToUrl = function (t) {
            var n = t;
            return (
              e.Utilities.isAbsolutePath(n) ||
                ((n = this._applyPaths(n)[0]),
                e.Utilities.isAbsolutePath(n) ||
                  (n = this.options.baseUrl + n)),
              this._addUrlArgsIfNecessaryToUrl(n)
            );
          }),
          (t.prototype.isBuild = function () {
            return this.options.isBuild;
          }),
          (t.prototype.isDuplicateMessageIgnoredFor = function (e) {
            return this.ignoreDuplicateModulesMap.hasOwnProperty(e);
          }),
          (t.prototype.getConfigForModule = function (e) {
            if (this.options.config) return this.options.config[e];
          }),
          (t.prototype.shouldCatchError = function () {
            return this.options.catchError;
          }),
          (t.prototype.shouldRecordStats = function () {
            return this.options.recordStats;
          }),
          (t.prototype.onError = function (e) {
            this.options.onError(e);
          }),
          t
        );
      })();
      e.Configuration = r;
    })(t || (t = {})),
    (function (e) {
      var t = (function () {
          function e(e) {
            (this._env = e),
              (this._scriptLoader = null),
              (this._callbackMap = {});
          }
          return (
            (e.prototype.load = function (e, t, o, s) {
              var a = this;
              if (!this._scriptLoader)
                if (this._env.isWebWorker) this._scriptLoader = new r();
                else if (this._env.isElectronRenderer) {
                  var l = e.getConfig().getOptionsLiteral().preferScriptTags;
                  this._scriptLoader = l ? new n() : new i(this._env);
                } else
                  this._env.isNode
                    ? (this._scriptLoader = new i(this._env))
                    : (this._scriptLoader = new n());
              var u = { callback: o, errorback: s };
              this._callbackMap.hasOwnProperty(t)
                ? this._callbackMap[t].push(u)
                : ((this._callbackMap[t] = [u]),
                  this._scriptLoader.load(
                    e,
                    t,
                    function () {
                      return a.triggerCallback(t);
                    },
                    function (e) {
                      return a.triggerErrorback(t, e);
                    }
                  ));
            }),
            (e.prototype.triggerCallback = function (e) {
              var t = this._callbackMap[e];
              delete this._callbackMap[e];
              for (var n = 0; n < t.length; n++) t[n].callback();
            }),
            (e.prototype.triggerErrorback = function (e, t) {
              var n = this._callbackMap[e];
              delete this._callbackMap[e];
              for (var r = 0; r < n.length; r++) n[r].errorback(t);
            }),
            e
          );
        })(),
        n = (function () {
          function t() {}
          return (
            (t.prototype.attachListeners = function (e, t, n) {
              var r = function () {
                  e.removeEventListener("load", i),
                    e.removeEventListener("error", o);
                },
                i = function (e) {
                  r(), t();
                },
                o = function (e) {
                  r(), n(e);
                };
              e.addEventListener("load", i), e.addEventListener("error", o);
            }),
            (t.prototype.load = function (t, n, r, i) {
              if (/^node\|/.test(n)) {
                var o = t.getConfig().getOptionsLiteral(),
                  a = s(t.getRecorder(), o.nodeRequire || e.global.nodeRequire),
                  l = n.split("|"),
                  u = null;
                try {
                  u = a(l[1]);
                } catch (f) {
                  return void i(f);
                }
                t.enqueueDefineAnonymousModule([], function () {
                  return u;
                }),
                  r();
              } else {
                var c = document.createElement("script");
                c.setAttribute("async", "async"),
                  c.setAttribute("type", "text/javascript"),
                  this.attachListeners(c, r, i);
                var h = t.getConfig().getOptionsLiteral().trustedTypesPolicy;
                h && (n = h.createScriptURL(n)), c.setAttribute("src", n);
                var d = t.getConfig().getOptionsLiteral().cspNonce;
                d && c.setAttribute("nonce", d),
                  document.getElementsByTagName("head")[0].appendChild(c);
              }
            }),
            t
          );
        })();
      var r = (function () {
          function t() {
            this._cachedCanUseEval = null;
          }
          return (
            (t.prototype._canUseEval = function (e) {
              return (
                null === this._cachedCanUseEval &&
                  (this._cachedCanUseEval = (function (e) {
                    var t = e
                      .getConfig()
                      .getOptionsLiteral().trustedTypesPolicy;
                    try {
                      return (
                        (t
                          ? self.eval(t.createScript("", "true"))
                          : new Function("true")
                        ).call(self),
                        !0
                      );
                    } catch {
                      return !1;
                    }
                  })(e)),
                this._cachedCanUseEval
              );
            }),
            (t.prototype.load = function (t, n, r, i) {
              if (/^node\|/.test(n)) {
                var o = t.getConfig().getOptionsLiteral(),
                  a = s(t.getRecorder(), o.nodeRequire || e.global.nodeRequire),
                  l = n.split("|"),
                  u = null;
                try {
                  u = a(l[1]);
                } catch (h) {
                  return void i(h);
                }
                t.enqueueDefineAnonymousModule([], function () {
                  return u;
                }),
                  r();
              } else {
                var c = t.getConfig().getOptionsLiteral().trustedTypesPolicy;
                if (
                  !(
                    /^((http:)|(https:)|(file:))/.test(n) &&
                    n.substring(0, self.origin.length) !== self.origin
                  ) &&
                  this._canUseEval(t)
                )
                  return void fetch(n)
                    .then(function (e) {
                      if (200 !== e.status) throw new Error(e.statusText);
                      return e.text();
                    })
                    .then(function (e) {
                      (e = e + "\n//# sourceURL=" + n),
                        (c
                          ? self.eval(c.createScript("", e))
                          : new Function(e)
                        ).call(self),
                        r();
                    })
                    .then(void 0, i);
                try {
                  c && (n = c.createScriptURL(n)), importScripts(n), r();
                } catch (h) {
                  i(h);
                }
              }
            }),
            t
          );
        })(),
        i = (function () {
          function t(e) {
            (this._env = e),
              (this._didInitialize = !1),
              (this._didPatchNodeRequire = !1);
          }
          return (
            (t.prototype._init = function (e) {
              this._didInitialize ||
                ((this._didInitialize = !0),
                (this._fs = e("fs")),
                (this._vm = e("vm")),
                (this._path = e("path")),
                (this._crypto = e("crypto")));
            }),
            (t.prototype._initNodeRequire = function (e, t) {
              var n = t.getConfig().getOptionsLiteral().nodeCachedData;
              if (n && !this._didPatchNodeRequire) {
                this._didPatchNodeRequire = !0;
                var r = this,
                  i = e("module");
                i.prototype._compile = function (e, s) {
                  var a,
                    l = i.wrap(e.replace(/^#!.*/, "")),
                    u = t.getRecorder(),
                    c = r._getCachedDataPath(n, s),
                    h = { filename: s };
                  try {
                    var d = r._fs.readFileSync(c);
                    (a = d.slice(0, 16)),
                      (h.cachedData = d.slice(16)),
                      u.record(60, c);
                  } catch {
                    u.record(61, c);
                  }
                  var f = new r._vm.Script(l, h),
                    g = f.runInThisContext(h),
                    m = r._path.dirname(s),
                    p = (function (e) {
                      var t = e.constructor,
                        n = function (t) {
                          try {
                            return e.require(t);
                          } finally {
                          }
                        };
                      return (
                        ((n.resolve = function (n, r) {
                          return t._resolveFilename(n, e, !1, r);
                        }).paths = function (n) {
                          return t._resolveLookupPaths(n, e);
                        }),
                        (n.main = process.mainModule),
                        (n.extensions = t._extensions),
                        (n.cache = t._cache),
                        n
                      );
                    })(this),
                    _ = [this.exports, p, this, s, m, process, o, Buffer],
                    b = g.apply(this.exports, _);
                  return (
                    r._handleCachedData(f, l, c, !h.cachedData, t),
                    r._verifyCachedData(f, l, c, a, t),
                    b
                  );
                };
              }
            }),
            (t.prototype.load = function (n, r, i, o) {
              var a = this,
                l = n.getConfig().getOptionsLiteral(),
                u = s(n.getRecorder(), l.nodeRequire || e.global.nodeRequire),
                c =
                  l.nodeInstrumenter ||
                  function (e) {
                    return e;
                  };
              this._init(u), this._initNodeRequire(u, n);
              var h = n.getRecorder();
              if (/^node\|/.test(r)) {
                var d = r.split("|"),
                  f = null;
                try {
                  f = u(d[1]);
                } catch (b) {
                  return void o(b);
                }
                n.enqueueDefineAnonymousModule([], function () {
                  return f;
                }),
                  i();
              } else {
                r = e.Utilities.fileUriToFilePath(this._env.isWindows, r);
                var g = this._path.normalize(r),
                  m = this._getElectronRendererScriptPathOrUri(g),
                  p = Boolean(l.nodeCachedData),
                  _ = p ? this._getCachedDataPath(l.nodeCachedData, r) : void 0;
                this._readSourceAndCachedData(g, _, h, function (e, r, s, l) {
                  if (e) o(e);
                  else {
                    var u;
                    (u =
                      r.charCodeAt(0) === t._BOM
                        ? t._PREFIX + r.substring(1) + t._SUFFIX
                        : t._PREFIX + r + t._SUFFIX),
                      (u = c(u, g));
                    var h = { filename: m, cachedData: s },
                      d = a._createAndEvalScript(n, u, h, i, o);
                    a._handleCachedData(d, u, _, p && !s, n),
                      a._verifyCachedData(d, u, _, l, n);
                  }
                });
              }
            }),
            (t.prototype._createAndEvalScript = function (t, n, r, i, o) {
              var s = t.getRecorder();
              s.record(31, r.filename);
              var a = new this._vm.Script(n, r),
                l = a.runInThisContext(r),
                u = t.getGlobalAMDDefineFunc(),
                c = !1,
                h = function () {
                  return (c = !0), u.apply(null, arguments);
                };
              return (
                (h.amd = u.amd),
                l.call(
                  e.global,
                  t.getGlobalAMDRequireFunc(),
                  h,
                  r.filename,
                  this._path.dirname(r.filename)
                ),
                s.record(32, r.filename),
                c
                  ? i()
                  : o(
                      new Error(
                        "Didn't receive define call in " + r.filename + "!"
                      )
                    ),
                a
              );
            }),
            (t.prototype._getElectronRendererScriptPathOrUri = function (e) {
              if (!this._env.isElectronRenderer) return e;
              var t = e.match(/^([a-z])\:(.*)/i);
              return t
                ? "file:///" +
                    (t[1].toUpperCase() + ":" + t[2]).replace(/\\/g, "/")
                : "file://" + e;
            }),
            (t.prototype._getCachedDataPath = function (e, t) {
              var n = this._crypto
                  .createHash("md5")
                  .update(t, "utf8")
                  .update(e.seed, "utf8")
                  .update(process.arch, "")
                  .digest("hex"),
                r = this._path.basename(t).replace(/\.js$/, "");
              return this._path.join(e.path, r + "-" + n + ".code");
            }),
            (t.prototype._handleCachedData = function (e, t, n, r, i) {
              var o = this;
              e.cachedDataRejected
                ? this._fs.unlink(n, function (r) {
                    i.getRecorder().record(62, n),
                      o._createAndWriteCachedData(e, t, n, i),
                      r && i.getConfig().onError(r);
                  })
                : r && this._createAndWriteCachedData(e, t, n, i);
            }),
            (t.prototype._createAndWriteCachedData = function (e, t, n, r) {
              var i = this,
                o = Math.ceil(
                  r.getConfig().getOptionsLiteral().nodeCachedData.writeDelay *
                    (1 + Math.random())
                ),
                s = -1,
                a = 0,
                l = void 0,
                u = function () {
                  setTimeout(function () {
                    l ||
                      (l = i._crypto
                        .createHash("md5")
                        .update(t, "utf8")
                        .digest());
                    var o = e.createCachedData();
                    if (!(0 === o.length || o.length === s || a >= 5)) {
                      if (o.length < s) return void u();
                      (s = o.length),
                        i._fs.writeFile(n, Buffer.concat([l, o]), function (e) {
                          e && r.getConfig().onError(e),
                            r.getRecorder().record(63, n),
                            u();
                        });
                    }
                  }, o * Math.pow(4, a++));
                };
              u();
            }),
            (t.prototype._readSourceAndCachedData = function (e, t, n, r) {
              if (t) {
                var i = void 0,
                  o = void 0,
                  s = void 0,
                  a = 2,
                  l = function (e) {
                    e ? r(e) : 0 == --a && r(void 0, i, o, s);
                  };
                this._fs.readFile(e, { encoding: "utf8" }, function (e, t) {
                  (i = t), l(e);
                }),
                  this._fs.readFile(t, function (e, r) {
                    !e && r && r.length > 0
                      ? ((s = r.slice(0, 16)),
                        (o = r.slice(16)),
                        n.record(60, t))
                      : n.record(61, t),
                      l();
                  });
              } else this._fs.readFile(e, { encoding: "utf8" }, r);
            }),
            (t.prototype._verifyCachedData = function (e, t, n, r, i) {
              var o = this;
              !r ||
                e.cachedDataRejected ||
                setTimeout(function () {
                  var e = o._crypto
                    .createHash("md5")
                    .update(t, "utf8")
                    .digest();
                  r.equals(e) ||
                    (i
                      .getConfig()
                      .onError(
                        new Error(
                          "FAILED TO VERIFY CACHED DATA, deleting stale '" +
                            n +
                            "' now, but a RESTART IS REQUIRED"
                        )
                      ),
                    o._fs.unlink(n, function (e) {
                      e && i.getConfig().onError(e);
                    }));
                }, Math.ceil(5e3 * (1 + Math.random())));
            }),
            (t._BOM = 65279),
            (t._PREFIX =
              "(function (require, define, __filename, __dirname) { "),
            (t._SUFFIX = "\n});"),
            t
          );
        })();
      function s(e, t) {
        if (t.__$__isRecorded) return t;
        var n = function (n) {
          e.record(33, n);
          try {
            return t(n);
          } finally {
            e.record(34, n);
          }
        };
        return (n.__$__isRecorded = !0), n;
      }
      (e.ensureRecordedNodeRequire = s),
        (e.createScriptLoader = function (e) {
          return new t(e);
        });
    })(t || (t = {})),
    (function (e) {
      var t = (function () {
        function t(e) {
          var t = e.lastIndexOf("/");
          this.fromModulePath = -1 !== t ? e.substr(0, t + 1) : "";
        }
        return (
          (t._normalizeModuleId = function (e) {
            var t,
              n = e;
            for (t = /\/\.\//; t.test(n); ) n = n.replace(t, "/");
            for (
              n = n.replace(/^\.\//g, ""),
                t =
                  /\/(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//;
              t.test(n);

            )
              n = n.replace(t, "/");
            return (n = n.replace(
              /^(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//,
              ""
            ));
          }),
          (t.prototype.resolveModule = function (n) {
            var r = n;
            return (
              e.Utilities.isAbsolutePath(r) ||
                ((e.Utilities.startsWith(r, "./") ||
                  e.Utilities.startsWith(r, "../")) &&
                  (r = t._normalizeModuleId(this.fromModulePath + r))),
              r
            );
          }),
          (t.ROOT = new t("")),
          t
        );
      })();
      e.ModuleIdResolver = t;
      var n = (function () {
        function t(e, t, n, r, i, o) {
          (this.id = e),
            (this.strId = t),
            (this.dependencies = n),
            (this._callback = r),
            (this._errorback = i),
            (this.moduleIdResolver = o),
            (this.exports = {}),
            (this.error = null),
            (this.exportsPassedIn = !1),
            (this.unresolvedDependenciesCount = this.dependencies.length),
            (this._isComplete = !1);
        }
        return (
          (t._safeInvokeFunction = function (t, n) {
            try {
              return {
                returnedValue: t.apply(e.global, n),
                producedError: null,
              };
            } catch (r) {
              return { returnedValue: null, producedError: r };
            }
          }),
          (t._invokeFactory = function (t, n, r, i) {
            return t.isBuild() && !e.Utilities.isAnonymousModule(n)
              ? { returnedValue: null, producedError: null }
              : t.shouldCatchError()
              ? this._safeInvokeFunction(r, i)
              : { returnedValue: r.apply(e.global, i), producedError: null };
          }),
          (t.prototype.complete = function (n, r, i) {
            this._isComplete = !0;
            var o = null;
            if (this._callback)
              if ("function" == typeof this._callback) {
                n.record(21, this.strId);
                var s = t._invokeFactory(r, this.strId, this._callback, i);
                (o = s.producedError),
                  n.record(22, this.strId),
                  !o &&
                    "undefined" != typeof s.returnedValue &&
                    (!this.exportsPassedIn ||
                      e.Utilities.isEmpty(this.exports)) &&
                    (this.exports = s.returnedValue);
              } else this.exports = this._callback;
            if (o) {
              var a = e.ensureError(o);
              (a.phase = "factory"),
                (a.moduleId = this.strId),
                (this.error = a),
                r.onError(a);
            }
            (this.dependencies = null),
              (this._callback = null),
              (this._errorback = null),
              (this.moduleIdResolver = null);
          }),
          (t.prototype.onDependencyError = function (e) {
            return (
              (this._isComplete = !0),
              (this.error = e),
              !!this._errorback && (this._errorback(e), !0)
            );
          }),
          (t.prototype.isComplete = function () {
            return this._isComplete;
          }),
          t
        );
      })();
      e.Module = n;
      var r = (function () {
          function e() {
            (this._nextId = 0),
              (this._strModuleIdToIntModuleId = new Map()),
              (this._intModuleIdToStrModuleId = []),
              this.getModuleId("exports"),
              this.getModuleId("module"),
              this.getModuleId("require");
          }
          return (
            (e.prototype.getMaxModuleId = function () {
              return this._nextId;
            }),
            (e.prototype.getModuleId = function (e) {
              var t = this._strModuleIdToIntModuleId.get(e);
              return (
                "undefined" == typeof t &&
                  ((t = this._nextId++),
                  this._strModuleIdToIntModuleId.set(e, t),
                  (this._intModuleIdToStrModuleId[t] = e)),
                t
              );
            }),
            (e.prototype.getStrModuleId = function (e) {
              return this._intModuleIdToStrModuleId[e];
            }),
            e
          );
        })(),
        i = (function () {
          function e(e) {
            this.id = e;
          }
          return (
            (e.EXPORTS = new e(0)),
            (e.MODULE = new e(1)),
            (e.REQUIRE = new e(2)),
            e
          );
        })();
      e.RegularDependency = i;
      var o = function (e, t, n) {
        (this.id = e), (this.pluginId = t), (this.pluginParam = n);
      };
      e.PluginDependency = o;
      var s = (function () {
        function s(t, n, i, o, s) {
          void 0 === s && (s = 0),
            (this._env = t),
            (this._scriptLoader = n),
            (this._loaderAvailableTimestamp = s),
            (this._defineFunc = i),
            (this._requireFunc = o),
            (this._moduleIdProvider = new r()),
            (this._config = new e.Configuration(this._env)),
            (this._hasDependencyCycle = !1),
            (this._modules2 = []),
            (this._knownModules2 = []),
            (this._inverseDependencies2 = []),
            (this._inversePluginDependencies2 = new Map()),
            (this._currentAnonymousDefineCall = null),
            (this._recorder = null),
            (this._buildInfoPath = []),
            (this._buildInfoDefineStack = []),
            (this._buildInfoDependencies = []);
        }
        return (
          (s.prototype.reset = function () {
            return new s(
              this._env,
              this._scriptLoader,
              this._defineFunc,
              this._requireFunc,
              this._loaderAvailableTimestamp
            );
          }),
          (s.prototype.getGlobalAMDDefineFunc = function () {
            return this._defineFunc;
          }),
          (s.prototype.getGlobalAMDRequireFunc = function () {
            return this._requireFunc;
          }),
          (s._findRelevantLocationInStack = function (e, t) {
            for (
              var n = function (e) {
                  return e.replace(/\\/g, "/");
                },
                r = n(e),
                i = t.split(/\n/),
                o = 0;
              o < i.length;
              o++
            ) {
              var s = i[o].match(/(.*):(\d+):(\d+)\)?$/);
              if (s) {
                var a = s[1],
                  l = s[2],
                  u = s[3],
                  c = Math.max(a.lastIndexOf(" ") + 1, a.lastIndexOf("(") + 1);
                if ((a = n((a = a.substr(c)))) === r) {
                  var h = { line: parseInt(l, 10), col: parseInt(u, 10) };
                  return (
                    1 === h.line &&
                      (h.col -=
                        "(function (require, define, __filename, __dirname) { ".length),
                    h
                  );
                }
              }
            }
            throw new Error(
              "Could not correlate define call site for needle " + e
            );
          }),
          (s.prototype.getBuildInfo = function () {
            if (!this._config.isBuild()) return null;
            for (
              var e = [], t = 0, n = 0, r = this._modules2.length;
              n < r;
              n++
            ) {
              var i = this._modules2[n];
              if (i) {
                var o = this._buildInfoPath[i.id] || null,
                  a = this._buildInfoDefineStack[i.id] || null,
                  l = this._buildInfoDependencies[i.id];
                e[t++] = {
                  id: i.strId,
                  path: o,
                  defineLocation:
                    o && a ? s._findRelevantLocationInStack(o, a) : null,
                  dependencies: l,
                  shim: null,
                  exports: i.exports,
                };
              }
            }
            return e;
          }),
          (s.prototype.getRecorder = function () {
            return (
              this._recorder ||
                (this._config.shouldRecordStats()
                  ? (this._recorder = new e.LoaderEventRecorder(
                      this._loaderAvailableTimestamp
                    ))
                  : (this._recorder = e.NullLoaderEventRecorder.INSTANCE)),
              this._recorder
            );
          }),
          (s.prototype.getLoaderEvents = function () {
            return this.getRecorder().getEvents();
          }),
          (s.prototype.enqueueDefineAnonymousModule = function (e, t) {
            if (null !== this._currentAnonymousDefineCall)
              throw new Error(
                "Can only have one anonymous define call per script file"
              );
            var n = null;
            this._config.isBuild() &&
              (n = new Error("StackLocation").stack || null),
              (this._currentAnonymousDefineCall = {
                stack: n,
                dependencies: e,
                callback: t,
              });
          }),
          (s.prototype.defineModule = function (e, r, i, o, s, a) {
            var l = this;
            void 0 === a && (a = new t(e));
            var u = this._moduleIdProvider.getModuleId(e);
            if (this._modules2[u])
              this._config.isDuplicateMessageIgnoredFor(e) ||
                console.warn("Duplicate definition of module '" + e + "'");
            else {
              var c = new n(u, e, this._normalizeDependencies(r, a), i, o, a);
              (this._modules2[u] = c),
                this._config.isBuild() &&
                  ((this._buildInfoDefineStack[u] = s),
                  (this._buildInfoDependencies[u] = (c.dependencies || []).map(
                    function (e) {
                      return l._moduleIdProvider.getStrModuleId(e.id);
                    }
                  ))),
                this._resolve(c);
            }
          }),
          (s.prototype._normalizeDependency = function (e, t) {
            if ("exports" === e) return i.EXPORTS;
            if ("module" === e) return i.MODULE;
            if ("require" === e) return i.REQUIRE;
            var n = e.indexOf("!");
            if (n >= 0) {
              var r = t.resolveModule(e.substr(0, n)),
                s = t.resolveModule(e.substr(n + 1)),
                a = this._moduleIdProvider.getModuleId(r + "!" + s),
                l = this._moduleIdProvider.getModuleId(r);
              return new o(a, l, s);
            }
            return new i(
              this._moduleIdProvider.getModuleId(t.resolveModule(e))
            );
          }),
          (s.prototype._normalizeDependencies = function (e, t) {
            for (var n = [], r = 0, i = 0, o = e.length; i < o; i++)
              n[r++] = this._normalizeDependency(e[i], t);
            return n;
          }),
          (s.prototype._relativeRequire = function (t, n, r, i) {
            if ("string" == typeof n) return this.synchronousRequire(n, t);
            this.defineModule(
              e.Utilities.generateAnonymousModule(),
              n,
              r,
              i,
              null,
              t
            );
          }),
          (s.prototype.synchronousRequire = function (e, n) {
            void 0 === n && (n = new t(e));
            var r = this._normalizeDependency(e, n),
              i = this._modules2[r.id];
            if (!i)
              throw new Error(
                "Check dependency list! Synchronous require cannot resolve module '" +
                  e +
                  "'. This is the first mention of this module!"
              );
            if (!i.isComplete())
              throw new Error(
                "Check dependency list! Synchronous require cannot resolve module '" +
                  e +
                  "'. This module has not been resolved completely yet."
              );
            if (i.error) throw i.error;
            return i.exports;
          }),
          (s.prototype.configure = function (t, n) {
            var r = this._config.shouldRecordStats();
            (this._config = n
              ? new e.Configuration(this._env, t)
              : this._config.cloneAndMerge(t)),
              this._config.shouldRecordStats() && !r && (this._recorder = null);
          }),
          (s.prototype.getConfig = function () {
            return this._config;
          }),
          (s.prototype._onLoad = function (e) {
            if (null !== this._currentAnonymousDefineCall) {
              var t = this._currentAnonymousDefineCall;
              (this._currentAnonymousDefineCall = null),
                this.defineModule(
                  this._moduleIdProvider.getStrModuleId(e),
                  t.dependencies,
                  t.callback,
                  null,
                  t.stack
                );
            }
          }),
          (s.prototype._createLoadError = function (t, n) {
            var r = this,
              i = this._moduleIdProvider.getStrModuleId(t),
              o = (this._inverseDependencies2[t] || []).map(function (e) {
                return r._moduleIdProvider.getStrModuleId(e);
              }),
              s = e.ensureError(n);
            return (s.phase = "loading"), (s.moduleId = i), (s.neededBy = o), s;
          }),
          (s.prototype._onLoadError = function (e, t) {
            var r = this._createLoadError(e, t);
            this._modules2[e] ||
              (this._modules2[e] = new n(
                e,
                this._moduleIdProvider.getStrModuleId(e),
                [],
                function () {},
                null,
                null
              ));
            for (
              var i = [], o = 0, s = this._moduleIdProvider.getMaxModuleId();
              o < s;
              o++
            )
              i[o] = !1;
            var a = !1,
              l = [];
            for (l.push(e), i[e] = !0; l.length > 0; ) {
              var u = l.shift(),
                c = this._modules2[u];
              c && (a = c.onDependencyError(r) || a);
              var h = this._inverseDependencies2[u];
              if (h)
                for (o = 0, s = h.length; o < s; o++) {
                  var d = h[o];
                  i[d] || (l.push(d), (i[d] = !0));
                }
            }
            a || this._config.onError(r);
          }),
          (s.prototype._hasDependencyPath = function (e, t) {
            var n = this._modules2[e];
            if (!n) return !1;
            for (
              var r = [], i = 0, o = this._moduleIdProvider.getMaxModuleId();
              i < o;
              i++
            )
              r[i] = !1;
            var s = [];
            for (s.push(n), r[e] = !0; s.length > 0; ) {
              var a = s.shift().dependencies;
              if (a)
                for (i = 0, o = a.length; i < o; i++) {
                  var l = a[i];
                  if (l.id === t) return !0;
                  var u = this._modules2[l.id];
                  u && !r[l.id] && ((r[l.id] = !0), s.push(u));
                }
            }
            return !1;
          }),
          (s.prototype._findCyclePath = function (e, t, n) {
            if (e === t || 50 === n) return [e];
            var r = this._modules2[e];
            if (!r) return null;
            var i = r.dependencies;
            if (i)
              for (var o = 0, s = i.length; o < s; o++) {
                var a = this._findCyclePath(i[o].id, t, n + 1);
                if (null !== a) return a.push(e), a;
              }
            return null;
          }),
          (s.prototype._createRequire = function (t) {
            var n = this,
              r = function (e, r, i) {
                return n._relativeRequire(t, e, r, i);
              };
            return (
              (r.toUrl = function (e) {
                return n._config.requireToUrl(t.resolveModule(e));
              }),
              (r.getStats = function () {
                return n.getLoaderEvents();
              }),
              (r.hasDependencyCycle = function () {
                return n._hasDependencyCycle;
              }),
              (r.config = function (e, t) {
                void 0 === t && (t = !1), n.configure(e, t);
              }),
              (r.__$__nodeRequire = e.global.nodeRequire),
              r
            );
          }),
          (s.prototype._loadModule = function (e) {
            var t = this;
            if (!this._modules2[e] && !this._knownModules2[e]) {
              this._knownModules2[e] = !0;
              var n = this._moduleIdProvider.getStrModuleId(e),
                r = this._config.moduleIdToPaths(n);
              this._env.isNode &&
                (-1 === n.indexOf("/") || /^@[^\/]+\/[^\/]+$/.test(n)) &&
                r.push("node|" + n);
              var i = -1,
                o = function (n) {
                  if (++i >= r.length) t._onLoadError(e, n);
                  else {
                    var s = r[i],
                      a = t.getRecorder();
                    if (t._config.isBuild() && "empty:" === s)
                      return (
                        (t._buildInfoPath[e] = s),
                        t.defineModule(
                          t._moduleIdProvider.getStrModuleId(e),
                          [],
                          null,
                          null,
                          null
                        ),
                        void t._onLoad(e)
                      );
                    a.record(10, s),
                      t._scriptLoader.load(
                        t,
                        s,
                        function () {
                          t._config.isBuild() && (t._buildInfoPath[e] = s),
                            a.record(11, s),
                            t._onLoad(e);
                        },
                        function (e) {
                          a.record(12, s), o(e);
                        }
                      );
                  }
                };
              o(null);
            }
          }),
          (s.prototype._loadPluginDependency = function (e, n) {
            var r = this;
            if (!this._modules2[n.id] && !this._knownModules2[n.id]) {
              this._knownModules2[n.id] = !0;
              var i = function (e) {
                r.defineModule(
                  r._moduleIdProvider.getStrModuleId(n.id),
                  [],
                  e,
                  null,
                  null
                );
              };
              (i.error = function (e) {
                r._config.onError(r._createLoadError(n.id, e));
              }),
                e.load(
                  n.pluginParam,
                  this._createRequire(t.ROOT),
                  i,
                  this._config.getOptionsLiteral()
                );
            }
          }),
          (s.prototype._resolve = function (e) {
            var t = this,
              n = e.dependencies;
            if (n)
              for (var r = 0, s = n.length; r < s; r++) {
                var a = n[r];
                if (a !== i.EXPORTS)
                  if (a !== i.MODULE)
                    if (a !== i.REQUIRE) {
                      var l = this._modules2[a.id];
                      if (l && l.isComplete()) {
                        if (l.error) return void e.onDependencyError(l.error);
                        e.unresolvedDependenciesCount--;
                      } else if (this._hasDependencyPath(a.id, e.id)) {
                        (this._hasDependencyCycle = !0),
                          console.warn(
                            "There is a dependency cycle between '" +
                              this._moduleIdProvider.getStrModuleId(a.id) +
                              "' and '" +
                              this._moduleIdProvider.getStrModuleId(e.id) +
                              "'. The cyclic path follows:"
                          );
                        var u = this._findCyclePath(a.id, e.id, 0) || [];
                        u.reverse(),
                          u.push(a.id),
                          console.warn(
                            u
                              .map(function (e) {
                                return t._moduleIdProvider.getStrModuleId(e);
                              })
                              .join(" => \n")
                          ),
                          e.unresolvedDependenciesCount--;
                      } else if (
                        ((this._inverseDependencies2[a.id] =
                          this._inverseDependencies2[a.id] || []),
                        this._inverseDependencies2[a.id].push(e.id),
                        a instanceof o)
                      ) {
                        var c = this._modules2[a.pluginId];
                        if (c && c.isComplete()) {
                          this._loadPluginDependency(c.exports, a);
                          continue;
                        }
                        var h = this._inversePluginDependencies2.get(
                          a.pluginId
                        );
                        h ||
                          ((h = []),
                          this._inversePluginDependencies2.set(a.pluginId, h)),
                          h.push(a),
                          this._loadModule(a.pluginId);
                      } else this._loadModule(a.id);
                    } else e.unresolvedDependenciesCount--;
                  else e.unresolvedDependenciesCount--;
                else (e.exportsPassedIn = !0), e.unresolvedDependenciesCount--;
              }
            0 === e.unresolvedDependenciesCount && this._onModuleComplete(e);
          }),
          (s.prototype._onModuleComplete = function (e) {
            var t = this,
              n = this.getRecorder();
            if (!e.isComplete()) {
              var r = e.dependencies,
                o = [];
              if (r)
                for (var s = 0, a = r.length; s < a; s++) {
                  var l = r[s];
                  if (l !== i.EXPORTS)
                    if (l !== i.MODULE)
                      if (l !== i.REQUIRE) {
                        var u = this._modules2[l.id];
                        o[s] = u ? u.exports : null;
                      } else o[s] = this._createRequire(e.moduleIdResolver);
                    else
                      o[s] = {
                        id: e.strId,
                        config: function () {
                          return t._config.getConfigForModule(e.strId);
                        },
                      };
                  else o[s] = e.exports;
                }
              e.complete(n, this._config, o);
              var c = this._inverseDependencies2[e.id];
              if (((this._inverseDependencies2[e.id] = null), c))
                for (s = 0, a = c.length; s < a; s++) {
                  var h = c[s],
                    d = this._modules2[h];
                  d.unresolvedDependenciesCount--,
                    0 === d.unresolvedDependenciesCount &&
                      this._onModuleComplete(d);
                }
              var f = this._inversePluginDependencies2.get(e.id);
              if (f) {
                this._inversePluginDependencies2.delete(e.id);
                for (s = 0, a = f.length; s < a; s++)
                  this._loadPluginDependency(e.exports, f[s]);
              }
            }
          }),
          s
        );
      })();
      e.ModuleManager = s;
    })(t || (t = {})),
    (function (t) {
      var n = new t.Environment(),
        r = null,
        i = function (e, t, n) {
          "string" != typeof e && ((n = t), (t = e), (e = null)),
            ("object" != typeof t || !Array.isArray(t)) &&
              ((n = t), (t = null)),
            t || (t = ["require", "exports", "module"]),
            e
              ? r.defineModule(e, t, n, null, null)
              : r.enqueueDefineAnonymousModule(t, n);
        };
      i.amd = { jQuery: !0 };
      var o = function (e, t) {
          void 0 === t && (t = !1), r.configure(e, t);
        },
        s = function () {
          if (1 === arguments.length) {
            if (arguments[0] instanceof Object && !Array.isArray(arguments[0]))
              return void o(arguments[0]);
            if ("string" == typeof arguments[0])
              return r.synchronousRequire(arguments[0]);
          }
          if (
            (2 !== arguments.length && 3 !== arguments.length) ||
            !Array.isArray(arguments[0])
          )
            throw new Error("Unrecognized require call");
          r.defineModule(
            t.Utilities.generateAnonymousModule(),
            arguments[0],
            arguments[1],
            arguments[2],
            null
          );
        };
      function a() {
        if (
          "undefined" != typeof t.global.require ||
          "undefined" != typeof require
        ) {
          var e = t.global.require || require;
          if ("function" == typeof e && "function" == typeof e.resolve) {
            var o = t.ensureRecordedNodeRequire(r.getRecorder(), e);
            (t.global.nodeRequire = o),
              (s.nodeRequire = o),
              (s.__$__nodeRequire = o);
          }
        }
        !n.isNode ||
        n.isElectronRenderer ||
        n.isElectronNodeIntegrationWebWorker
          ? (n.isElectronRenderer || (t.global.define = i),
            (t.global.require = s))
          : ((module.exports = s), (require = s));
      }
      (s.config = o),
        (s.getConfig = function () {
          return r.getConfig().getOptionsLiteral();
        }),
        (s.reset = function () {
          r = r.reset();
        }),
        (s.getBuildInfo = function () {
          return r.getBuildInfo();
        }),
        (s.getStats = function () {
          return r.getLoaderEvents();
        }),
        (s.define = i),
        (t.init = a),
        ("function" != typeof t.global.define || !t.global.define.amd) &&
          ((r = new t.ModuleManager(
            n,
            t.createScriptLoader(n),
            i,
            s,
            t.Utilities.getHighPerformanceTimestamp()
          )),
          "undefined" != typeof t.global.require &&
            "function" != typeof t.global.require &&
            s.config(t.global.require),
          (e = function () {
            return i.apply(null, arguments);
          }),
          (e.amd = i.amd),
          "undefined" == typeof doNotInitLoader && a());
    })(t || (t = {})),
    e(n[18], r([0, 1]), function (e, t) {
      "use strict";
      function n(e, t) {
        for (let n = e.length - 1; n >= 0; n--) {
          if (t(e[n])) return n;
        }
        return -1;
      }
      function r(e, t, n) {
        const r = i(e, t),
          o = e.length,
          s = n.length;
        e.length = o + s;
        for (let i = o - 1; i >= r; i--) e[i + s] = e[i];
        for (let i = 0; i < s; i++) e[i + r] = n[i];
      }
      function i(e, t) {
        return t < 0 ? Math.max(t + e.length, 0) : Math.min(t, e.length);
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.ArrayQueue =
          t.findMinBy =
          t.findLastMaxBy =
          t.findMaxBy =
          t.numberComparator =
          t.compareBy =
          t.splice =
          t.insertInto =
          t.asArray =
          t.pushToEnd =
          t.pushToStart =
          t.arrayInsert =
          t.range =
          t.flatten =
          t.firstOrDefault =
          t.lastIndex =
          t.findLast =
          t.distinct =
          t.isNonEmptyArray =
          t.isFalsyOrEmpty =
          t.coalesce =
          t.groupBy =
          t.quickSelect =
          t.findFirstInSorted =
          t.binarySearch =
          t.equals =
          t.tail2 =
          t.tail =
            void 0),
        (t.tail = function (e, t = 0) {
          return e[e.length - (1 + t)];
        }),
        (t.tail2 = function (e) {
          if (0 === e.length) throw new Error("Invalid tail call");
          return [e.slice(0, e.length - 1), e[e.length - 1]];
        }),
        (t.equals = function (e, t, n = (e, t) => e === t) {
          if (e === t) return !0;
          if (!e || !t || e.length !== t.length) return !1;
          for (let r = 0, i = e.length; r < i; r++)
            if (!n(e[r], t[r])) return !1;
          return !0;
        }),
        (t.binarySearch = function (e, t, n) {
          let r = 0,
            i = e.length - 1;
          for (; r <= i; ) {
            const o = ((r + i) / 2) | 0,
              s = n(e[o], t);
            if (s < 0) r = o + 1;
            else {
              if (!(s > 0)) return o;
              i = o - 1;
            }
          }
          return -(r + 1);
        }),
        (t.findFirstInSorted = function (e, t) {
          let n = 0,
            r = e.length;
          if (0 === r) return 0;
          for (; n < r; ) {
            const i = Math.floor((n + r) / 2);
            t(e[i]) ? (r = i) : (n = i + 1);
          }
          return n;
        }),
        (t.quickSelect = function e(t, n, r) {
          if ((t |= 0) >= n.length) throw new TypeError("invalid index");
          let i = n[Math.floor(n.length * Math.random())],
            o = [],
            s = [],
            a = [];
          for (let l of n) {
            const e = r(l, i);
            e < 0 ? o.push(l) : e > 0 ? s.push(l) : a.push(l);
          }
          return t < o.length
            ? e(t, o, r)
            : t < o.length + a.length
            ? a[0]
            : e(t - (o.length + a.length), s, r);
        }),
        (t.groupBy = function (e, t) {
          const n = [];
          let r;
          for (const i of e.slice(0).sort(t))
            r && 0 === t(r[0], i) ? r.push(i) : ((r = [i]), n.push(r));
          return n;
        }),
        (t.coalesce = function (e) {
          return e.filter((e) => !!e);
        }),
        (t.isFalsyOrEmpty = function (e) {
          return !Array.isArray(e) || 0 === e.length;
        }),
        (t.isNonEmptyArray = function (e) {
          return Array.isArray(e) && e.length > 0;
        }),
        (t.distinct = function (e, t = (e) => e) {
          const n = new Set();
          return e.filter((e) => {
            const r = t(e);
            return !n.has(r) && (n.add(r), !0);
          });
        }),
        (t.findLast = function (e, t) {
          const r = n(e, t);
          if (-1 !== r) return e[r];
        }),
        (t.lastIndex = n),
        (t.firstOrDefault = function (e, t) {
          return e.length > 0 ? e[0] : t;
        }),
        (t.flatten = function (e) {
          return [].concat(...e);
        }),
        (t.range = function (e, t) {
          let n = "number" == typeof t ? e : 0;
          "number" == typeof t ? (n = e) : ((n = 0), (t = e));
          const r = [];
          if (n <= t) for (let i = n; i < t; i++) r.push(i);
          else for (let i = n; i > t; i--) r.push(i);
          return r;
        }),
        (t.arrayInsert = function (e, t, n) {
          const r = e.slice(0, t),
            i = e.slice(t);
          return r.concat(n, i);
        }),
        (t.pushToStart = function (e, t) {
          const n = e.indexOf(t);
          n > -1 && (e.splice(n, 1), e.unshift(t));
        }),
        (t.pushToEnd = function (e, t) {
          const n = e.indexOf(t);
          n > -1 && (e.splice(n, 1), e.push(t));
        }),
        (t.asArray = function (e) {
          return Array.isArray(e) ? e : [e];
        }),
        (t.insertInto = r),
        (t.splice = function (e, t, n, o) {
          const s = i(e, t),
            a = e.splice(s, n);
          return r(e, s, o), a;
        }),
        (t.compareBy = function (e, t) {
          return (n, r) => t(e(n), e(r));
        });
      function o(e, t) {
        if (0 === e.length) return;
        let n = e[0];
        for (let r = 1; r < e.length; r++) {
          const i = e[r];
          t(i, n) > 0 && (n = i);
        }
        return n;
      }
      (t.numberComparator = (e, t) => e - t),
        (t.findMaxBy = o),
        (t.findLastMaxBy = function (e, t) {
          if (0 === e.length) return;
          let n = e[0];
          for (let r = 1; r < e.length; r++) {
            const i = e[r];
            t(i, n) >= 0 && (n = i);
          }
          return n;
        }),
        (t.findMinBy = function (e, t) {
          return o(e, (e, n) => -t(e, n));
        });
      t.ArrayQueue = class {
        constructor(e) {
          (this.items = e),
            (this.firstIdx = 0),
            (this.lastIdx = this.items.length - 1);
        }
        takeWhile(e) {
          let t = this.firstIdx;
          for (; t < this.items.length && e(this.items[t]); ) t++;
          const n =
            t === this.firstIdx ? null : this.items.slice(this.firstIdx, t);
          return (this.firstIdx = t), n;
        }
        takeFromEndWhile(e) {
          let t = this.lastIdx;
          for (; t >= 0 && e(this.items[t]); ) t--;
          const n =
            t === this.lastIdx
              ? null
              : this.items.slice(t + 1, this.lastIdx + 1);
          return (this.lastIdx = t), n;
        }
        peek() {
          return this.items[this.firstIdx];
        }
        dequeue() {
          const e = this.items[this.firstIdx];
          return this.firstIdx++, e;
        }
        takeCount(e) {
          const t = this.items.slice(this.firstIdx, this.firstIdx + e);
          return (this.firstIdx += e), t;
        }
      };
    }),
    e(n[19], r([0, 1]), function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.LRUCachedComputed = void 0);
      t.LRUCachedComputed = class {
        constructor(e) {
          (this.computeFn = e),
            (this.lastCache = void 0),
            (this.lastArgKey = void 0);
        }
        get(e) {
          const t = JSON.stringify(e);
          return (
            this.lastArgKey !== t &&
              ((this.lastArgKey = t), (this.lastCache = this.computeFn(e))),
            this.lastCache
          );
        }
      };
    }),
    e(n[20], r([0, 1]), function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.CSSIcon = t.Codicon = t.getCodiconAriaLabel = void 0),
        (t.getCodiconAriaLabel = function (e) {
          return e ? e.replace(/\$\((.*?)\)/g, (e, t) => ` ${t} `).trim() : "";
        });
      class n {
        constructor(e, t, r) {
          (this.id = e),
            (this.definition = t),
            (this.description = r),
            n._allCodicons.push(this);
        }
        get classNames() {
          return "codicon codicon-" + this.id;
        }
        get classNamesArray() {
          return ["codicon", "codicon-" + this.id];
        }
        get cssSelector() {
          return ".codicon.codicon-" + this.id;
        }
        static getAll() {
          return n._allCodicons;
        }
      }
      (t.Codicon = n),
        (n._allCodicons = []),
        (n.add = new n("add", { fontCharacter: "\\ea60" })),
        (n.plus = new n("plus", n.add.definition)),
        (n.gistNew = new n("gist-new", n.add.definition)),
        (n.repoCreate = new n("repo-create", n.add.definition)),
        (n.lightbulb = new n("lightbulb", { fontCharacter: "\\ea61" })),
        (n.lightBulb = new n("light-bulb", { fontCharacter: "\\ea61" })),
        (n.repo = new n("repo", { fontCharacter: "\\ea62" })),
        (n.repoDelete = new n("repo-delete", { fontCharacter: "\\ea62" })),
        (n.gistFork = new n("gist-fork", { fontCharacter: "\\ea63" })),
        (n.repoForked = new n("repo-forked", { fontCharacter: "\\ea63" })),
        (n.gitPullRequest = new n("git-pull-request", {
          fontCharacter: "\\ea64",
        })),
        (n.gitPullRequestAbandoned = new n("git-pull-request-abandoned", {
          fontCharacter: "\\ea64",
        })),
        (n.recordKeys = new n("record-keys", { fontCharacter: "\\ea65" })),
        (n.keyboard = new n("keyboard", { fontCharacter: "\\ea65" })),
        (n.tag = new n("tag", { fontCharacter: "\\ea66" })),
        (n.tagAdd = new n("tag-add", { fontCharacter: "\\ea66" })),
        (n.tagRemove = new n("tag-remove", { fontCharacter: "\\ea66" })),
        (n.person = new n("person", { fontCharacter: "\\ea67" })),
        (n.personFollow = new n("person-follow", { fontCharacter: "\\ea67" })),
        (n.personOutline = new n("person-outline", {
          fontCharacter: "\\ea67",
        })),
        (n.personFilled = new n("person-filled", { fontCharacter: "\\ea67" })),
        (n.gitBranch = new n("git-branch", { fontCharacter: "\\ea68" })),
        (n.gitBranchCreate = new n("git-branch-create", {
          fontCharacter: "\\ea68",
        })),
        (n.gitBranchDelete = new n("git-branch-delete", {
          fontCharacter: "\\ea68",
        })),
        (n.sourceControl = new n("source-control", {
          fontCharacter: "\\ea68",
        })),
        (n.mirror = new n("mirror", { fontCharacter: "\\ea69" })),
        (n.mirrorPublic = new n("mirror-public", { fontCharacter: "\\ea69" })),
        (n.star = new n("star", { fontCharacter: "\\ea6a" })),
        (n.starAdd = new n("star-add", { fontCharacter: "\\ea6a" })),
        (n.starDelete = new n("star-delete", { fontCharacter: "\\ea6a" })),
        (n.starEmpty = new n("star-empty", { fontCharacter: "\\ea6a" })),
        (n.comment = new n("comment", { fontCharacter: "\\ea6b" })),
        (n.commentAdd = new n("comment-add", { fontCharacter: "\\ea6b" })),
        (n.alert = new n("alert", { fontCharacter: "\\ea6c" })),
        (n.warning = new n("warning", { fontCharacter: "\\ea6c" })),
        (n.search = new n("search", { fontCharacter: "\\ea6d" })),
        (n.searchSave = new n("search-save", { fontCharacter: "\\ea6d" })),
        (n.logOut = new n("log-out", { fontCharacter: "\\ea6e" })),
        (n.signOut = new n("sign-out", { fontCharacter: "\\ea6e" })),
        (n.logIn = new n("log-in", { fontCharacter: "\\ea6f" })),
        (n.signIn = new n("sign-in", { fontCharacter: "\\ea6f" })),
        (n.eye = new n("eye", { fontCharacter: "\\ea70" })),
        (n.eyeUnwatch = new n("eye-unwatch", { fontCharacter: "\\ea70" })),
        (n.eyeWatch = new n("eye-watch", { fontCharacter: "\\ea70" })),
        (n.circleFilled = new n("circle-filled", { fontCharacter: "\\ea71" })),
        (n.primitiveDot = new n("primitive-dot", { fontCharacter: "\\ea71" })),
        (n.closeDirty = new n("close-dirty", { fontCharacter: "\\ea71" })),
        (n.debugBreakpoint = new n("debug-breakpoint", {
          fontCharacter: "\\ea71",
        })),
        (n.debugBreakpointDisabled = new n("debug-breakpoint-disabled", {
          fontCharacter: "\\ea71",
        })),
        (n.debugHint = new n("debug-hint", { fontCharacter: "\\ea71" })),
        (n.primitiveSquare = new n("primitive-square", {
          fontCharacter: "\\ea72",
        })),
        (n.edit = new n("edit", { fontCharacter: "\\ea73" })),
        (n.pencil = new n("pencil", { fontCharacter: "\\ea73" })),
        (n.info = new n("info", { fontCharacter: "\\ea74" })),
        (n.issueOpened = new n("issue-opened", { fontCharacter: "\\ea74" })),
        (n.gistPrivate = new n("gist-private", { fontCharacter: "\\ea75" })),
        (n.gitForkPrivate = new n("git-fork-private", {
          fontCharacter: "\\ea75",
        })),
        (n.lock = new n("lock", { fontCharacter: "\\ea75" })),
        (n.mirrorPrivate = new n("mirror-private", {
          fontCharacter: "\\ea75",
        })),
        (n.close = new n("close", { fontCharacter: "\\ea76" })),
        (n.removeClose = new n("remove-close", { fontCharacter: "\\ea76" })),
        (n.x = new n("x", { fontCharacter: "\\ea76" })),
        (n.repoSync = new n("repo-sync", { fontCharacter: "\\ea77" })),
        (n.sync = new n("sync", { fontCharacter: "\\ea77" })),
        (n.clone = new n("clone", { fontCharacter: "\\ea78" })),
        (n.desktopDownload = new n("desktop-download", {
          fontCharacter: "\\ea78",
        })),
        (n.beaker = new n("beaker", { fontCharacter: "\\ea79" })),
        (n.microscope = new n("microscope", { fontCharacter: "\\ea79" })),
        (n.vm = new n("vm", { fontCharacter: "\\ea7a" })),
        (n.deviceDesktop = new n("device-desktop", {
          fontCharacter: "\\ea7a",
        })),
        (n.file = new n("file", { fontCharacter: "\\ea7b" })),
        (n.fileText = new n("file-text", { fontCharacter: "\\ea7b" })),
        (n.more = new n("more", { fontCharacter: "\\ea7c" })),
        (n.ellipsis = new n("ellipsis", { fontCharacter: "\\ea7c" })),
        (n.kebabHorizontal = new n("kebab-horizontal", {
          fontCharacter: "\\ea7c",
        })),
        (n.mailReply = new n("mail-reply", { fontCharacter: "\\ea7d" })),
        (n.reply = new n("reply", { fontCharacter: "\\ea7d" })),
        (n.organization = new n("organization", { fontCharacter: "\\ea7e" })),
        (n.organizationFilled = new n("organization-filled", {
          fontCharacter: "\\ea7e",
        })),
        (n.organizationOutline = new n("organization-outline", {
          fontCharacter: "\\ea7e",
        })),
        (n.newFile = new n("new-file", { fontCharacter: "\\ea7f" })),
        (n.fileAdd = new n("file-add", { fontCharacter: "\\ea7f" })),
        (n.newFolder = new n("new-folder", { fontCharacter: "\\ea80" })),
        (n.fileDirectoryCreate = new n("file-directory-create", {
          fontCharacter: "\\ea80",
        })),
        (n.trash = new n("trash", { fontCharacter: "\\ea81" })),
        (n.trashcan = new n("trashcan", { fontCharacter: "\\ea81" })),
        (n.history = new n("history", { fontCharacter: "\\ea82" })),
        (n.clock = new n("clock", { fontCharacter: "\\ea82" })),
        (n.folder = new n("folder", { fontCharacter: "\\ea83" })),
        (n.fileDirectory = new n("file-directory", {
          fontCharacter: "\\ea83",
        })),
        (n.symbolFolder = new n("symbol-folder", { fontCharacter: "\\ea83" })),
        (n.logoGithub = new n("logo-github", { fontCharacter: "\\ea84" })),
        (n.markGithub = new n("mark-github", { fontCharacter: "\\ea84" })),
        (n.github = new n("github", { fontCharacter: "\\ea84" })),
        (n.terminal = new n("terminal", { fontCharacter: "\\ea85" })),
        (n.console = new n("console", { fontCharacter: "\\ea85" })),
        (n.repl = new n("repl", { fontCharacter: "\\ea85" })),
        (n.zap = new n("zap", { fontCharacter: "\\ea86" })),
        (n.symbolEvent = new n("symbol-event", { fontCharacter: "\\ea86" })),
        (n.error = new n("error", { fontCharacter: "\\ea87" })),
        (n.stop = new n("stop", { fontCharacter: "\\ea87" })),
        (n.variable = new n("variable", { fontCharacter: "\\ea88" })),
        (n.symbolVariable = new n("symbol-variable", {
          fontCharacter: "\\ea88",
        })),
        (n.array = new n("array", { fontCharacter: "\\ea8a" })),
        (n.symbolArray = new n("symbol-array", { fontCharacter: "\\ea8a" })),
        (n.symbolModule = new n("symbol-module", { fontCharacter: "\\ea8b" })),
        (n.symbolPackage = new n("symbol-package", {
          fontCharacter: "\\ea8b",
        })),
        (n.symbolNamespace = new n("symbol-namespace", {
          fontCharacter: "\\ea8b",
        })),
        (n.symbolObject = new n("symbol-object", { fontCharacter: "\\ea8b" })),
        (n.symbolMethod = new n("symbol-method", { fontCharacter: "\\ea8c" })),
        (n.symbolFunction = new n("symbol-function", {
          fontCharacter: "\\ea8c",
        })),
        (n.symbolConstructor = new n("symbol-constructor", {
          fontCharacter: "\\ea8c",
        })),
        (n.symbolBoolean = new n("symbol-boolean", {
          fontCharacter: "\\ea8f",
        })),
        (n.symbolNull = new n("symbol-null", { fontCharacter: "\\ea8f" })),
        (n.symbolNumeric = new n("symbol-numeric", {
          fontCharacter: "\\ea90",
        })),
        (n.symbolNumber = new n("symbol-number", { fontCharacter: "\\ea90" })),
        (n.symbolStructure = new n("symbol-structure", {
          fontCharacter: "\\ea91",
        })),
        (n.symbolStruct = new n("symbol-struct", { fontCharacter: "\\ea91" })),
        (n.symbolParameter = new n("symbol-parameter", {
          fontCharacter: "\\ea92",
        })),
        (n.symbolTypeParameter = new n("symbol-type-parameter", {
          fontCharacter: "\\ea92",
        })),
        (n.symbolKey = new n("symbol-key", { fontCharacter: "\\ea93" })),
        (n.symbolText = new n("symbol-text", { fontCharacter: "\\ea93" })),
        (n.symbolReference = new n("symbol-reference", {
          fontCharacter: "\\ea94",
        })),
        (n.goToFile = new n("go-to-file", { fontCharacter: "\\ea94" })),
        (n.symbolEnum = new n("symbol-enum", { fontCharacter: "\\ea95" })),
        (n.symbolValue = new n("symbol-value", { fontCharacter: "\\ea95" })),
        (n.symbolRuler = new n("symbol-ruler", { fontCharacter: "\\ea96" })),
        (n.symbolUnit = new n("symbol-unit", { fontCharacter: "\\ea96" })),
        (n.activateBreakpoints = new n("activate-breakpoints", {
          fontCharacter: "\\ea97",
        })),
        (n.archive = new n("archive", { fontCharacter: "\\ea98" })),
        (n.arrowBoth = new n("arrow-both", { fontCharacter: "\\ea99" })),
        (n.arrowDown = new n("arrow-down", { fontCharacter: "\\ea9a" })),
        (n.arrowLeft = new n("arrow-left", { fontCharacter: "\\ea9b" })),
        (n.arrowRight = new n("arrow-right", { fontCharacter: "\\ea9c" })),
        (n.arrowSmallDown = new n("arrow-small-down", {
          fontCharacter: "\\ea9d",
        })),
        (n.arrowSmallLeft = new n("arrow-small-left", {
          fontCharacter: "\\ea9e",
        })),
        (n.arrowSmallRight = new n("arrow-small-right", {
          fontCharacter: "\\ea9f",
        })),
        (n.arrowSmallUp = new n("arrow-small-up", { fontCharacter: "\\eaa0" })),
        (n.arrowUp = new n("arrow-up", { fontCharacter: "\\eaa1" })),
        (n.bell = new n("bell", { fontCharacter: "\\eaa2" })),
        (n.bold = new n("bold", { fontCharacter: "\\eaa3" })),
        (n.book = new n("book", { fontCharacter: "\\eaa4" })),
        (n.bookmark = new n("bookmark", { fontCharacter: "\\eaa5" })),
        (n.debugBreakpointConditionalUnverified = new n(
          "debug-breakpoint-conditional-unverified",
          { fontCharacter: "\\eaa6" }
        )),
        (n.debugBreakpointConditional = new n("debug-breakpoint-conditional", {
          fontCharacter: "\\eaa7",
        })),
        (n.debugBreakpointConditionalDisabled = new n(
          "debug-breakpoint-conditional-disabled",
          { fontCharacter: "\\eaa7" }
        )),
        (n.debugBreakpointDataUnverified = new n(
          "debug-breakpoint-data-unverified",
          { fontCharacter: "\\eaa8" }
        )),
        (n.debugBreakpointData = new n("debug-breakpoint-data", {
          fontCharacter: "\\eaa9",
        })),
        (n.debugBreakpointDataDisabled = new n(
          "debug-breakpoint-data-disabled",
          { fontCharacter: "\\eaa9" }
        )),
        (n.debugBreakpointLogUnverified = new n(
          "debug-breakpoint-log-unverified",
          { fontCharacter: "\\eaaa" }
        )),
        (n.debugBreakpointLog = new n("debug-breakpoint-log", {
          fontCharacter: "\\eaab",
        })),
        (n.debugBreakpointLogDisabled = new n("debug-breakpoint-log-disabled", {
          fontCharacter: "\\eaab",
        })),
        (n.briefcase = new n("briefcase", { fontCharacter: "\\eaac" })),
        (n.broadcast = new n("broadcast", { fontCharacter: "\\eaad" })),
        (n.browser = new n("browser", { fontCharacter: "\\eaae" })),
        (n.bug = new n("bug", { fontCharacter: "\\eaaf" })),
        (n.calendar = new n("calendar", { fontCharacter: "\\eab0" })),
        (n.caseSensitive = new n("case-sensitive", {
          fontCharacter: "\\eab1",
        })),
        (n.check = new n("check", { fontCharacter: "\\eab2" })),
        (n.checklist = new n("checklist", { fontCharacter: "\\eab3" })),
        (n.chevronDown = new n("chevron-down", { fontCharacter: "\\eab4" })),
        (n.dropDownButton = new n(
          "drop-down-button",
          n.chevronDown.definition
        )),
        (n.chevronLeft = new n("chevron-left", { fontCharacter: "\\eab5" })),
        (n.chevronRight = new n("chevron-right", { fontCharacter: "\\eab6" })),
        (n.chevronUp = new n("chevron-up", { fontCharacter: "\\eab7" })),
        (n.chromeClose = new n("chrome-close", { fontCharacter: "\\eab8" })),
        (n.chromeMaximize = new n("chrome-maximize", {
          fontCharacter: "\\eab9",
        })),
        (n.chromeMinimize = new n("chrome-minimize", {
          fontCharacter: "\\eaba",
        })),
        (n.chromeRestore = new n("chrome-restore", {
          fontCharacter: "\\eabb",
        })),
        (n.circleOutline = new n("circle-outline", {
          fontCharacter: "\\eabc",
        })),
        (n.debugBreakpointUnverified = new n("debug-breakpoint-unverified", {
          fontCharacter: "\\eabc",
        })),
        (n.circleSlash = new n("circle-slash", { fontCharacter: "\\eabd" })),
        (n.circuitBoard = new n("circuit-board", { fontCharacter: "\\eabe" })),
        (n.clearAll = new n("clear-all", { fontCharacter: "\\eabf" })),
        (n.clippy = new n("clippy", { fontCharacter: "\\eac0" })),
        (n.closeAll = new n("close-all", { fontCharacter: "\\eac1" })),
        (n.cloudDownload = new n("cloud-download", {
          fontCharacter: "\\eac2",
        })),
        (n.cloudUpload = new n("cloud-upload", { fontCharacter: "\\eac3" })),
        (n.code = new n("code", { fontCharacter: "\\eac4" })),
        (n.collapseAll = new n("collapse-all", { fontCharacter: "\\eac5" })),
        (n.colorMode = new n("color-mode", { fontCharacter: "\\eac6" })),
        (n.commentDiscussion = new n("comment-discussion", {
          fontCharacter: "\\eac7",
        })),
        (n.compareChanges = new n("compare-changes", {
          fontCharacter: "\\eafd",
        })),
        (n.creditCard = new n("credit-card", { fontCharacter: "\\eac9" })),
        (n.dash = new n("dash", { fontCharacter: "\\eacc" })),
        (n.dashboard = new n("dashboard", { fontCharacter: "\\eacd" })),
        (n.database = new n("database", { fontCharacter: "\\eace" })),
        (n.debugContinue = new n("debug-continue", {
          fontCharacter: "\\eacf",
        })),
        (n.debugDisconnect = new n("debug-disconnect", {
          fontCharacter: "\\ead0",
        })),
        (n.debugPause = new n("debug-pause", { fontCharacter: "\\ead1" })),
        (n.debugRestart = new n("debug-restart", { fontCharacter: "\\ead2" })),
        (n.debugStart = new n("debug-start", { fontCharacter: "\\ead3" })),
        (n.debugStepInto = new n("debug-step-into", {
          fontCharacter: "\\ead4",
        })),
        (n.debugStepOut = new n("debug-step-out", { fontCharacter: "\\ead5" })),
        (n.debugStepOver = new n("debug-step-over", {
          fontCharacter: "\\ead6",
        })),
        (n.debugStop = new n("debug-stop", { fontCharacter: "\\ead7" })),
        (n.debug = new n("debug", { fontCharacter: "\\ead8" })),
        (n.deviceCameraVideo = new n("device-camera-video", {
          fontCharacter: "\\ead9",
        })),
        (n.deviceCamera = new n("device-camera", { fontCharacter: "\\eada" })),
        (n.deviceMobile = new n("device-mobile", { fontCharacter: "\\eadb" })),
        (n.diffAdded = new n("diff-added", { fontCharacter: "\\eadc" })),
        (n.diffIgnored = new n("diff-ignored", { fontCharacter: "\\eadd" })),
        (n.diffModified = new n("diff-modified", { fontCharacter: "\\eade" })),
        (n.diffRemoved = new n("diff-removed", { fontCharacter: "\\eadf" })),
        (n.diffRenamed = new n("diff-renamed", { fontCharacter: "\\eae0" })),
        (n.diff = new n("diff", { fontCharacter: "\\eae1" })),
        (n.discard = new n("discard", { fontCharacter: "\\eae2" })),
        (n.editorLayout = new n("editor-layout", { fontCharacter: "\\eae3" })),
        (n.emptyWindow = new n("empty-window", { fontCharacter: "\\eae4" })),
        (n.exclude = new n("exclude", { fontCharacter: "\\eae5" })),
        (n.extensions = new n("extensions", { fontCharacter: "\\eae6" })),
        (n.eyeClosed = new n("eye-closed", { fontCharacter: "\\eae7" })),
        (n.fileBinary = new n("file-binary", { fontCharacter: "\\eae8" })),
        (n.fileCode = new n("file-code", { fontCharacter: "\\eae9" })),
        (n.fileMedia = new n("file-media", { fontCharacter: "\\eaea" })),
        (n.filePdf = new n("file-pdf", { fontCharacter: "\\eaeb" })),
        (n.fileSubmodule = new n("file-submodule", {
          fontCharacter: "\\eaec",
        })),
        (n.fileSymlinkDirectory = new n("file-symlink-directory", {
          fontCharacter: "\\eaed",
        })),
        (n.fileSymlinkFile = new n("file-symlink-file", {
          fontCharacter: "\\eaee",
        })),
        (n.fileZip = new n("file-zip", { fontCharacter: "\\eaef" })),
        (n.files = new n("files", { fontCharacter: "\\eaf0" })),
        (n.filter = new n("filter", { fontCharacter: "\\eaf1" })),
        (n.flame = new n("flame", { fontCharacter: "\\eaf2" })),
        (n.foldDown = new n("fold-down", { fontCharacter: "\\eaf3" })),
        (n.foldUp = new n("fold-up", { fontCharacter: "\\eaf4" })),
        (n.fold = new n("fold", { fontCharacter: "\\eaf5" })),
        (n.folderActive = new n("folder-active", { fontCharacter: "\\eaf6" })),
        (n.folderOpened = new n("folder-opened", { fontCharacter: "\\eaf7" })),
        (n.gear = new n("gear", { fontCharacter: "\\eaf8" })),
        (n.gift = new n("gift", { fontCharacter: "\\eaf9" })),
        (n.gistSecret = new n("gist-secret", { fontCharacter: "\\eafa" })),
        (n.gist = new n("gist", { fontCharacter: "\\eafb" })),
        (n.gitCommit = new n("git-commit", { fontCharacter: "\\eafc" })),
        (n.gitCompare = new n("git-compare", { fontCharacter: "\\eafd" })),
        (n.gitMerge = new n("git-merge", { fontCharacter: "\\eafe" })),
        (n.githubAction = new n("github-action", { fontCharacter: "\\eaff" })),
        (n.githubAlt = new n("github-alt", { fontCharacter: "\\eb00" })),
        (n.globe = new n("globe", { fontCharacter: "\\eb01" })),
        (n.grabber = new n("grabber", { fontCharacter: "\\eb02" })),
        (n.graph = new n("graph", { fontCharacter: "\\eb03" })),
        (n.gripper = new n("gripper", { fontCharacter: "\\eb04" })),
        (n.heart = new n("heart", { fontCharacter: "\\eb05" })),
        (n.home = new n("home", { fontCharacter: "\\eb06" })),
        (n.horizontalRule = new n("horizontal-rule", {
          fontCharacter: "\\eb07",
        })),
        (n.hubot = new n("hubot", { fontCharacter: "\\eb08" })),
        (n.inbox = new n("inbox", { fontCharacter: "\\eb09" })),
        (n.issueClosed = new n("issue-closed", { fontCharacter: "\\eba4" })),
        (n.issueReopened = new n("issue-reopened", {
          fontCharacter: "\\eb0b",
        })),
        (n.issues = new n("issues", { fontCharacter: "\\eb0c" })),
        (n.italic = new n("italic", { fontCharacter: "\\eb0d" })),
        (n.jersey = new n("jersey", { fontCharacter: "\\eb0e" })),
        (n.json = new n("json", { fontCharacter: "\\eb0f" })),
        (n.kebabVertical = new n("kebab-vertical", {
          fontCharacter: "\\eb10",
        })),
        (n.key = new n("key", { fontCharacter: "\\eb11" })),
        (n.law = new n("law", { fontCharacter: "\\eb12" })),
        (n.lightbulbAutofix = new n("lightbulb-autofix", {
          fontCharacter: "\\eb13",
        })),
        (n.linkExternal = new n("link-external", { fontCharacter: "\\eb14" })),
        (n.link = new n("link", { fontCharacter: "\\eb15" })),
        (n.listOrdered = new n("list-ordered", { fontCharacter: "\\eb16" })),
        (n.listUnordered = new n("list-unordered", {
          fontCharacter: "\\eb17",
        })),
        (n.liveShare = new n("live-share", { fontCharacter: "\\eb18" })),
        (n.loading = new n("loading", { fontCharacter: "\\eb19" })),
        (n.location = new n("location", { fontCharacter: "\\eb1a" })),
        (n.mailRead = new n("mail-read", { fontCharacter: "\\eb1b" })),
        (n.mail = new n("mail", { fontCharacter: "\\eb1c" })),
        (n.markdown = new n("markdown", { fontCharacter: "\\eb1d" })),
        (n.megaphone = new n("megaphone", { fontCharacter: "\\eb1e" })),
        (n.mention = new n("mention", { fontCharacter: "\\eb1f" })),
        (n.milestone = new n("milestone", { fontCharacter: "\\eb20" })),
        (n.mortarBoard = new n("mortar-board", { fontCharacter: "\\eb21" })),
        (n.move = new n("move", { fontCharacter: "\\eb22" })),
        (n.multipleWindows = new n("multiple-windows", {
          fontCharacter: "\\eb23",
        })),
        (n.mute = new n("mute", { fontCharacter: "\\eb24" })),
        (n.noNewline = new n("no-newline", { fontCharacter: "\\eb25" })),
        (n.note = new n("note", { fontCharacter: "\\eb26" })),
        (n.octoface = new n("octoface", { fontCharacter: "\\eb27" })),
        (n.openPreview = new n("open-preview", { fontCharacter: "\\eb28" })),
        (n.package_ = new n("package", { fontCharacter: "\\eb29" })),
        (n.paintcan = new n("paintcan", { fontCharacter: "\\eb2a" })),
        (n.pin = new n("pin", { fontCharacter: "\\eb2b" })),
        (n.play = new n("play", { fontCharacter: "\\eb2c" })),
        (n.run = new n("run", { fontCharacter: "\\eb2c" })),
        (n.plug = new n("plug", { fontCharacter: "\\eb2d" })),
        (n.preserveCase = new n("preserve-case", { fontCharacter: "\\eb2e" })),
        (n.preview = new n("preview", { fontCharacter: "\\eb2f" })),
        (n.project = new n("project", { fontCharacter: "\\eb30" })),
        (n.pulse = new n("pulse", { fontCharacter: "\\eb31" })),
        (n.question = new n("question", { fontCharacter: "\\eb32" })),
        (n.quote = new n("quote", { fontCharacter: "\\eb33" })),
        (n.radioTower = new n("radio-tower", { fontCharacter: "\\eb34" })),
        (n.reactions = new n("reactions", { fontCharacter: "\\eb35" })),
        (n.references = new n("references", { fontCharacter: "\\eb36" })),
        (n.refresh = new n("refresh", { fontCharacter: "\\eb37" })),
        (n.regex = new n("regex", { fontCharacter: "\\eb38" })),
        (n.remoteExplorer = new n("remote-explorer", {
          fontCharacter: "\\eb39",
        })),
        (n.remote = new n("remote", { fontCharacter: "\\eb3a" })),
        (n.remove = new n("remove", { fontCharacter: "\\eb3b" })),
        (n.replaceAll = new n("replace-all", { fontCharacter: "\\eb3c" })),
        (n.replace = new n("replace", { fontCharacter: "\\eb3d" })),
        (n.repoClone = new n("repo-clone", { fontCharacter: "\\eb3e" })),
        (n.repoForcePush = new n("repo-force-push", {
          fontCharacter: "\\eb3f",
        })),
        (n.repoPull = new n("repo-pull", { fontCharacter: "\\eb40" })),
        (n.repoPush = new n("repo-push", { fontCharacter: "\\eb41" })),
        (n.report = new n("report", { fontCharacter: "\\eb42" })),
        (n.requestChanges = new n("request-changes", {
          fontCharacter: "\\eb43",
        })),
        (n.rocket = new n("rocket", { fontCharacter: "\\eb44" })),
        (n.rootFolderOpened = new n("root-folder-opened", {
          fontCharacter: "\\eb45",
        })),
        (n.rootFolder = new n("root-folder", { fontCharacter: "\\eb46" })),
        (n.rss = new n("rss", { fontCharacter: "\\eb47" })),
        (n.ruby = new n("ruby", { fontCharacter: "\\eb48" })),
        (n.saveAll = new n("save-all", { fontCharacter: "\\eb49" })),
        (n.saveAs = new n("save-as", { fontCharacter: "\\eb4a" })),
        (n.save = new n("save", { fontCharacter: "\\eb4b" })),
        (n.screenFull = new n("screen-full", { fontCharacter: "\\eb4c" })),
        (n.screenNormal = new n("screen-normal", { fontCharacter: "\\eb4d" })),
        (n.searchStop = new n("search-stop", { fontCharacter: "\\eb4e" })),
        (n.server = new n("server", { fontCharacter: "\\eb50" })),
        (n.settingsGear = new n("settings-gear", { fontCharacter: "\\eb51" })),
        (n.settings = new n("settings", { fontCharacter: "\\eb52" })),
        (n.shield = new n("shield", { fontCharacter: "\\eb53" })),
        (n.smiley = new n("smiley", { fontCharacter: "\\eb54" })),
        (n.sortPrecedence = new n("sort-precedence", {
          fontCharacter: "\\eb55",
        })),
        (n.splitHorizontal = new n("split-horizontal", {
          fontCharacter: "\\eb56",
        })),
        (n.splitVertical = new n("split-vertical", {
          fontCharacter: "\\eb57",
        })),
        (n.squirrel = new n("squirrel", { fontCharacter: "\\eb58" })),
        (n.starFull = new n("star-full", { fontCharacter: "\\eb59" })),
        (n.starHalf = new n("star-half", { fontCharacter: "\\eb5a" })),
        (n.symbolClass = new n("symbol-class", { fontCharacter: "\\eb5b" })),
        (n.symbolColor = new n("symbol-color", { fontCharacter: "\\eb5c" })),
        (n.symbolCustomColor = new n("symbol-customcolor", {
          fontCharacter: "\\eb5c",
        })),
        (n.symbolConstant = new n("symbol-constant", {
          fontCharacter: "\\eb5d",
        })),
        (n.symbolEnumMember = new n("symbol-enum-member", {
          fontCharacter: "\\eb5e",
        })),
        (n.symbolField = new n("symbol-field", { fontCharacter: "\\eb5f" })),
        (n.symbolFile = new n("symbol-file", { fontCharacter: "\\eb60" })),
        (n.symbolInterface = new n("symbol-interface", {
          fontCharacter: "\\eb61",
        })),
        (n.symbolKeyword = new n("symbol-keyword", {
          fontCharacter: "\\eb62",
        })),
        (n.symbolMisc = new n("symbol-misc", { fontCharacter: "\\eb63" })),
        (n.symbolOperator = new n("symbol-operator", {
          fontCharacter: "\\eb64",
        })),
        (n.symbolProperty = new n("symbol-property", {
          fontCharacter: "\\eb65",
        })),
        (n.wrench = new n("wrench", { fontCharacter: "\\eb65" })),
        (n.wrenchSubaction = new n("wrench-subaction", {
          fontCharacter: "\\eb65",
        })),
        (n.symbolSnippet = new n("symbol-snippet", {
          fontCharacter: "\\eb66",
        })),
        (n.tasklist = new n("tasklist", { fontCharacter: "\\eb67" })),
        (n.telescope = new n("telescope", { fontCharacter: "\\eb68" })),
        (n.textSize = new n("text-size", { fontCharacter: "\\eb69" })),
        (n.threeBars = new n("three-bars", { fontCharacter: "\\eb6a" })),
        (n.thumbsdown = new n("thumbsdown", { fontCharacter: "\\eb6b" })),
        (n.thumbsup = new n("thumbsup", { fontCharacter: "\\eb6c" })),
        (n.tools = new n("tools", { fontCharacter: "\\eb6d" })),
        (n.triangleDown = new n("triangle-down", { fontCharacter: "\\eb6e" })),
        (n.triangleLeft = new n("triangle-left", { fontCharacter: "\\eb6f" })),
        (n.triangleRight = new n("triangle-right", {
          fontCharacter: "\\eb70",
        })),
        (n.triangleUp = new n("triangle-up", { fontCharacter: "\\eb71" })),
        (n.twitter = new n("twitter", { fontCharacter: "\\eb72" })),
        (n.unfold = new n("unfold", { fontCharacter: "\\eb73" })),
        (n.unlock = new n("unlock", { fontCharacter: "\\eb74" })),
        (n.unmute = new n("unmute", { fontCharacter: "\\eb75" })),
        (n.unverified = new n("unverified", { fontCharacter: "\\eb76" })),
        (n.verified = new n("verified", { fontCharacter: "\\eb77" })),
        (n.versions = new n("versions", { fontCharacter: "\\eb78" })),
        (n.vmActive = new n("vm-active", { fontCharacter: "\\eb79" })),
        (n.vmOutline = new n("vm-outline", { fontCharacter: "\\eb7a" })),
        (n.vmRunning = new n("vm-running", { fontCharacter: "\\eb7b" })),
        (n.watch = new n("watch", { fontCharacter: "\\eb7c" })),
        (n.whitespace = new n("whitespace", { fontCharacter: "\\eb7d" })),
        (n.wholeWord = new n("whole-word", { fontCharacter: "\\eb7e" })),
        (n.window = new n("window", { fontCharacter: "\\eb7f" })),
        (n.wordWrap = new n("word-wrap", { fontCharacter: "\\eb80" })),
        (n.zoomIn = new n("zoom-in", { fontCharacter: "\\eb81" })),
        (n.zoomOut = new n("zoom-out", { fontCharacter: "\\eb82" })),
        (n.listFilter = new n("list-filter", { fontCharacter: "\\eb83" })),
        (n.listFlat = new n("list-flat", { fontCharacter: "\\eb84" })),
        (n.listSelection = new n("list-selection", {
          fontCharacter: "\\eb85",
        })),
        (n.selection = new n("selection", { fontCharacter: "\\eb85" })),
        (n.listTree = new n("list-tree", { fontCharacter: "\\eb86" })),
        (n.debugBreakpointFunctionUnverified = new n(
          "debug-breakpoint-function-unverified",
          { fontCharacter: "\\eb87" }
        )),
        (n.debugBreakpointFunction = new n("debug-breakpoint-function", {
          fontCharacter: "\\eb88",
        })),
        (n.debugBreakpointFunctionDisabled = new n(
          "debug-breakpoint-function-disabled",
          { fontCharacter: "\\eb88" }
        )),
        (n.debugStackframeActive = new n("debug-stackframe-active", {
          fontCharacter: "\\eb89",
        })),
        (n.debugStackframeDot = new n("debug-stackframe-dot", {
          fontCharacter: "\\eb8a",
        })),
        (n.debugStackframe = new n("debug-stackframe", {
          fontCharacter: "\\eb8b",
        })),
        (n.debugStackframeFocused = new n("debug-stackframe-focused", {
          fontCharacter: "\\eb8b",
        })),
        (n.debugBreakpointUnsupported = new n("debug-breakpoint-unsupported", {
          fontCharacter: "\\eb8c",
        })),
        (n.symbolString = new n("symbol-string", { fontCharacter: "\\eb8d" })),
        (n.debugReverseContinue = new n("debug-reverse-continue", {
          fontCharacter: "\\eb8e",
        })),
        (n.debugStepBack = new n("debug-step-back", {
          fontCharacter: "\\eb8f",
        })),
        (n.debugRestartFrame = new n("debug-restart-frame", {
          fontCharacter: "\\eb90",
        })),
        (n.callIncoming = new n("call-incoming", { fontCharacter: "\\eb92" })),
        (n.callOutgoing = new n("call-outgoing", { fontCharacter: "\\eb93" })),
        (n.menu = new n("menu", { fontCharacter: "\\eb94" })),
        (n.expandAll = new n("expand-all", { fontCharacter: "\\eb95" })),
        (n.feedback = new n("feedback", { fontCharacter: "\\eb96" })),
        (n.groupByRefType = new n("group-by-ref-type", {
          fontCharacter: "\\eb97",
        })),
        (n.ungroupByRefType = new n("ungroup-by-ref-type", {
          fontCharacter: "\\eb98",
        })),
        (n.account = new n("account", { fontCharacter: "\\eb99" })),
        (n.bellDot = new n("bell-dot", { fontCharacter: "\\eb9a" })),
        (n.debugConsole = new n("debug-console", { fontCharacter: "\\eb9b" })),
        (n.library = new n("library", { fontCharacter: "\\eb9c" })),
        (n.output = new n("output", { fontCharacter: "\\eb9d" })),
        (n.runAll = new n("run-all", { fontCharacter: "\\eb9e" })),
        (n.syncIgnored = new n("sync-ignored", { fontCharacter: "\\eb9f" })),
        (n.pinned = new n("pinned", { fontCharacter: "\\eba0" })),
        (n.githubInverted = new n("github-inverted", {
          fontCharacter: "\\eba1",
        })),
        (n.debugAlt = new n("debug-alt", { fontCharacter: "\\eb91" })),
        (n.serverProcess = new n("server-process", {
          fontCharacter: "\\eba2",
        })),
        (n.serverEnvironment = new n("server-environment", {
          fontCharacter: "\\eba3",
        })),
        (n.pass = new n("pass", { fontCharacter: "\\eba4" })),
        (n.stopCircle = new n("stop-circle", { fontCharacter: "\\eba5" })),
        (n.playCircle = new n("play-circle", { fontCharacter: "\\eba6" })),
        (n.record = new n("record", { fontCharacter: "\\eba7" })),
        (n.debugAltSmall = new n("debug-alt-small", {
          fontCharacter: "\\eba8",
        })),
        (n.vmConnect = new n("vm-connect", { fontCharacter: "\\eba9" })),
        (n.cloud = new n("cloud", { fontCharacter: "\\ebaa" })),
        (n.merge = new n("merge", { fontCharacter: "\\ebab" })),
        (n.exportIcon = new n("export", { fontCharacter: "\\ebac" })),
        (n.graphLeft = new n("graph-left", { fontCharacter: "\\ebad" })),
        (n.magnet = new n("magnet", { fontCharacter: "\\ebae" })),
        (n.notebook = new n("notebook", { fontCharacter: "\\ebaf" })),
        (n.redo = new n("redo", { fontCharacter: "\\ebb0" })),
        (n.checkAll = new n("check-all", { fontCharacter: "\\ebb1" })),
        (n.pinnedDirty = new n("pinned-dirty", { fontCharacter: "\\ebb2" })),
        (n.passFilled = new n("pass-filled", { fontCharacter: "\\ebb3" })),
        (n.circleLargeFilled = new n("circle-large-filled", {
          fontCharacter: "\\ebb4",
        })),
        (n.circleLargeOutline = new n("circle-large-outline", {
          fontCharacter: "\\ebb5",
        })),
        (n.combine = new n("combine", { fontCharacter: "\\ebb6" })),
        (n.gather = new n("gather", { fontCharacter: "\\ebb6" })),
        (n.table = new n("table", { fontCharacter: "\\ebb7" })),
        (n.variableGroup = new n("variable-group", {
          fontCharacter: "\\ebb8",
        })),
        (n.typeHierarchy = new n("type-hierarchy", {
          fontCharacter: "\\ebb9",
        })),
        (n.typeHierarchySub = new n("type-hierarchy-sub", {
          fontCharacter: "\\ebba",
        })),
        (n.typeHierarchySuper = new n("type-hierarchy-super", {
          fontCharacter: "\\ebbb",
        })),
        (n.gitPullRequestCreate = new n("git-pull-request-create", {
          fontCharacter: "\\ebbc",
        })),
        (n.runAbove = new n("run-above", { fontCharacter: "\\ebbd" })),
        (n.runBelow = new n("run-below", { fontCharacter: "\\ebbe" })),
        (n.notebookTemplate = new n("notebook-template", {
          fontCharacter: "\\ebbf",
        })),
        (n.debugRerun = new n("debug-rerun", { fontCharacter: "\\ebc0" })),
        (n.workspaceTrusted = new n("workspace-trusted", {
          fontCharacter: "\\ebc1",
        })),
        (n.workspaceUntrusted = new n("workspace-untrusted", {
          fontCharacter: "\\ebc2",
        })),
        (n.workspaceUnspecified = new n("workspace-unspecified", {
          fontCharacter: "\\ebc3",
        })),
        (n.terminalCmd = new n("terminal-cmd", { fontCharacter: "\\ebc4" })),
        (n.terminalDebian = new n("terminal-debian", {
          fontCharacter: "\\ebc5",
        })),
        (n.terminalLinux = new n("terminal-linux", {
          fontCharacter: "\\ebc6",
        })),
        (n.terminalPowershell = new n("terminal-powershell", {
          fontCharacter: "\\ebc7",
        })),
        (n.terminalTmux = new n("terminal-tmux", { fontCharacter: "\\ebc8" })),
        (n.terminalUbuntu = new n("terminal-ubuntu", {
          fontCharacter: "\\ebc9",
        })),
        (n.terminalBash = new n("terminal-bash", { fontCharacter: "\\ebca" })),
        (n.arrowSwap = new n("arrow-swap", { fontCharacter: "\\ebcb" })),
        (n.copy = new n("copy", { fontCharacter: "\\ebcc" })),
        (n.personAdd = new n("person-add", { fontCharacter: "\\ebcd" })),
        (n.filterFilled = new n("filter-filled", { fontCharacter: "\\ebce" })),
        (n.wand = new n("wand", { fontCharacter: "\\ebcf" })),
        (n.debugLineByLine = new n("debug-line-by-line", {
          fontCharacter: "\\ebd0",
        })),
        (n.inspect = new n("inspect", { fontCharacter: "\\ebd1" })),
        (n.layers = new n("layers", { fontCharacter: "\\ebd2" })),
        (n.layersDot = new n("layers-dot", { fontCharacter: "\\ebd3" })),
        (n.layersActive = new n("layers-active", { fontCharacter: "\\ebd4" })),
        (n.compass = new n("compass", { fontCharacter: "\\ebd5" })),
        (n.compassDot = new n("compass-dot", { fontCharacter: "\\ebd6" })),
        (n.compassActive = new n("compass-active", {
          fontCharacter: "\\ebd7",
        })),
        (n.azure = new n("azure", { fontCharacter: "\\ebd8" })),
        (n.issueDraft = new n("issue-draft", { fontCharacter: "\\ebd9" })),
        (n.gitPullRequestClosed = new n("git-pull-request-closed", {
          fontCharacter: "\\ebda",
        })),
        (n.gitPullRequestDraft = new n("git-pull-request-draft", {
          fontCharacter: "\\ebdb",
        })),
        (n.debugAll = new n("debug-all", { fontCharacter: "\\ebdc" })),
        (n.debugCoverage = new n("debug-coverage", {
          fontCharacter: "\\ebdd",
        })),
        (n.runErrors = new n("run-errors", { fontCharacter: "\\ebde" })),
        (n.folderLibrary = new n("folder-library", {
          fontCharacter: "\\ebdf",
        })),
        (n.debugContinueSmall = new n("debug-continue-small", {
          fontCharacter: "\\ebe0",
        })),
        (n.beakerStop = new n("beaker-stop", { fontCharacter: "\\ebe1" })),
        (n.graphLine = new n("graph-line", { fontCharacter: "\\ebe2" })),
        (n.graphScatter = new n("graph-scatter", { fontCharacter: "\\ebe3" })),
        (n.pieChart = new n("pie-chart", { fontCharacter: "\\ebe4" })),
        (n.bracket = new n("bracket", n.json.definition)),
        (n.bracketDot = new n("bracket-dot", { fontCharacter: "\\ebe5" })),
        (n.bracketError = new n("bracket-error", { fontCharacter: "\\ebe6" })),
        (n.lockSmall = new n("lock-small", { fontCharacter: "\\ebe7" })),
        (n.azureDevops = new n("azure-devops", { fontCharacter: "\\ebe8" })),
        (n.verifiedFilled = new n("verified-filled", {
          fontCharacter: "\\ebe9",
        })),
        (n.newLine = new n("newline", { fontCharacter: "\\ebea" })),
        (n.layout = new n("layout", { fontCharacter: "\\ebeb" })),
        (n.layoutActivitybarLeft = new n("layout-activitybar-left", {
          fontCharacter: "\\ebec",
        })),
        (n.layoutActivitybarRight = new n("layout-activitybar-right", {
          fontCharacter: "\\ebed",
        })),
        (n.layoutPanelLeft = new n("layout-panel-left", {
          fontCharacter: "\\ebee",
        })),
        (n.layoutPanelCenter = new n("layout-panel-center", {
          fontCharacter: "\\ebef",
        })),
        (n.layoutPanelJustify = new n("layout-panel-justify", {
          fontCharacter: "\\ebf0",
        })),
        (n.layoutPanelRight = new n("layout-panel-right", {
          fontCharacter: "\\ebf1",
        })),
        (n.layoutPanel = new n("layout-panel", { fontCharacter: "\\ebf2" })),
        (n.layoutSidebarLeft = new n("layout-sidebar-left", {
          fontCharacter: "\\ebf3",
        })),
        (n.layoutSidebarRight = new n("layout-sidebar-right", {
          fontCharacter: "\\ebf4",
        })),
        (n.layoutStatusbar = new n("layout-statusbar", {
          fontCharacter: "\\ebf5",
        })),
        (n.layoutMenubar = new n("layout-menubar", {
          fontCharacter: "\\ebf6",
        })),
        (n.layoutCentered = new n("layout-centered", {
          fontCharacter: "\\ebf7",
        })),
        (n.target = new n("target", { fontCharacter: "\\ebf8" })),
        (n.dialogError = new n("dialog-error", n.error.definition)),
        (n.dialogWarning = new n("dialog-warning", n.warning.definition)),
        (n.dialogInfo = new n("dialog-info", n.info.definition)),
        (n.dialogClose = new n("dialog-close", n.close.definition)),
        (n.treeItemExpanded = new n(
          "tree-item-expanded",
          n.chevronDown.definition
        )),
        (n.treeFilterOnTypeOn = new n(
          "tree-filter-on-type-on",
          n.listFilter.definition
        )),
        (n.treeFilterOnTypeOff = new n(
          "tree-filter-on-type-off",
          n.listSelection.definition
        )),
        (n.treeFilterClear = new n("tree-filter-clear", n.close.definition)),
        (n.treeItemLoading = new n("tree-item-loading", n.loading.definition)),
        (n.menuSelection = new n("menu-selection", n.check.definition)),
        (n.menuSubmenu = new n("menu-submenu", n.chevronRight.definition)),
        (n.menuBarMore = new n("menubar-more", n.more.definition)),
        (n.scrollbarButtonLeft = new n(
          "scrollbar-button-left",
          n.triangleLeft.definition
        )),
        (n.scrollbarButtonRight = new n(
          "scrollbar-button-right",
          n.triangleRight.definition
        )),
        (n.scrollbarButtonUp = new n(
          "scrollbar-button-up",
          n.triangleUp.definition
        )),
        (n.scrollbarButtonDown = new n(
          "scrollbar-button-down",
          n.triangleDown.definition
        )),
        (n.toolBarMore = new n("toolbar-more", n.more.definition)),
        (n.quickInputBack = new n("quick-input-back", n.arrowLeft.definition)),
        (function (e) {
          (e.iconNameSegment = "[A-Za-z0-9]+"),
            (e.iconNameExpression = "[A-Za-z0-9-]+"),
            (e.iconModifierExpression = "~[A-Za-z]+"),
            (e.iconNameCharacter = "[A-Za-z0-9~-]");
          const t = new RegExp(
            `^(${e.iconNameExpression})(${e.iconModifierExpression})?$`
          );
          function r(e) {
            if (e instanceof n) return ["codicon", "codicon-" + e.id];
            const i = t.exec(e.id);
            if (!i) return r(n.error);
            let [, o, s] = i;
            const a = ["codicon", "codicon-" + o];
            return s && a.push("codicon-modifier-" + s.substr(1)), a;
          }
          (e.asClassNameArray = r),
            (e.asClassName = function (e) {
              return r(e).join(" ");
            }),
            (e.asCSSSelector = function (e) {
              return "." + r(e).join(".");
            });
        })(t.CSSIcon || (t.CSSIcon = {}));
    }),
    e(n[21], r([0, 1]), function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.DiffChange = void 0);
      t.DiffChange = class {
        constructor(e, t, n, r) {
          (this.originalStart = e),
            (this.originalLength = t),
            (this.modifiedStart = n),
            (this.modifiedLength = r);
        }
        getOriginalEnd() {
          return this.originalStart + this.originalLength;
        }
        getModifiedEnd() {
          return this.modifiedStart + this.modifiedLength;
        }
      };
    }),
    e(n[10], r([0, 1]), function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.NotSupportedError =
          t.illegalState =
          t.illegalArgument =
          t.canceled =
          t.CancellationError =
          t.isCancellationError =
          t.transformErrorForSerialization =
          t.onUnexpectedExternalError =
          t.onUnexpectedError =
          t.errorHandler =
          t.ErrorHandler =
            void 0);
      class n {
        constructor() {
          (this.listeners = []),
            (this.unexpectedErrorHandler = function (e) {
              setTimeout(() => {
                throw e.stack ? new Error(e.message + "\n\n" + e.stack) : e;
              }, 0);
            });
        }
        emit(e) {
          this.listeners.forEach((t) => {
            t(e);
          });
        }
        onUnexpectedError(e) {
          this.unexpectedErrorHandler(e), this.emit(e);
        }
        onUnexpectedExternalError(e) {
          this.unexpectedErrorHandler(e);
        }
      }
      (t.ErrorHandler = n),
        (t.errorHandler = new n()),
        (t.onUnexpectedError = function (e) {
          i(e) || t.errorHandler.onUnexpectedError(e);
        }),
        (t.onUnexpectedExternalError = function (e) {
          i(e) || t.errorHandler.onUnexpectedExternalError(e);
        }),
        (t.transformErrorForSerialization = function (e) {
          if (e instanceof Error) {
            let { name: t, message: n } = e;
            return {
              $isError: !0,
              name: t,
              message: n,
              stack: e.stacktrace || e.stack,
            };
          }
          return e;
        });
      const r = "Canceled";
      function i(e) {
        return (
          e instanceof o ||
          (e instanceof Error && e.name === r && e.message === r)
        );
      }
      t.isCancellationError = i;
      class o extends Error {
        constructor() {
          super(r), (this.name = this.message);
        }
      }
      (t.CancellationError = o),
        (t.canceled = function () {
          const e = new Error(r);
          return (e.name = e.message), e;
        }),
        (t.illegalArgument = function (e) {
          return e
            ? new Error(`Illegal argument: ${e}`)
            : new Error("Illegal argument");
        }),
        (t.illegalState = function (e) {
          return e
            ? new Error(`Illegal state: ${e}`)
            : new Error("Illegal state");
        });
      class s extends Error {
        constructor(e) {
          super("NotSupported"), e && (this.message = e);
        }
      }
      t.NotSupportedError = s;
    }),
    e(n[22], r([0, 1]), function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.once = void 0),
        (t.once = function (e) {
          const t = this;
          let n,
            r = !1;
          return function () {
            return r || ((r = !0), (n = e.apply(t, arguments))), n;
          };
        });
    }),
    e(n[23], r([0, 1]), function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Iterable = void 0),
        (function (e) {
          e.is = function (e) {
            return (
              e &&
              "object" == typeof e &&
              "function" == typeof e[Symbol.iterator]
            );
          };
          const t = Object.freeze([]);
          (e.empty = function () {
            return t;
          }),
            (e.single = function* (e) {
              yield e;
            }),
            (e.from = function (e) {
              return e || t;
            }),
            (e.isEmpty = function (e) {
              return !e || !0 === e[Symbol.iterator]().next().done;
            }),
            (e.first = function (e) {
              return e[Symbol.iterator]().next().value;
            }),
            (e.some = function (e, t) {
              for (const n of e) if (t(n)) return !0;
              return !1;
            }),
            (e.find = function (e, t) {
              for (const n of e) if (t(n)) return n;
            }),
            (e.filter = function* (e, t) {
              for (const n of e) t(n) && (yield n);
            }),
            (e.map = function* (e, t) {
              let n = 0;
              for (const r of e) yield t(r, n++);
            }),
            (e.concat = function* (...e) {
              for (const t of e) for (const e of t) yield e;
            }),
            (e.concatNested = function* (e) {
              for (const t of e) for (const e of t) yield e;
            }),
            (e.reduce = function (e, t, n) {
              let r = n;
              for (const i of e) r = t(r, i);
              return r;
            }),
            (e.slice = function* (e, t, n = e.length) {
              for (
                t < 0 && (t += e.length),
                  n < 0 ? (n += e.length) : n > e.length && (n = e.length);
                t < n;
                t++
              )
                yield e[t];
            }),
            (e.consume = function (t, n = Number.POSITIVE_INFINITY) {
              const r = [];
              if (0 === n) return [r, t];
              const i = t[Symbol.iterator]();
              for (let o = 0; o < n; o++) {
                const t = i.next();
                if (t.done) return [r, e.empty()];
                r.push(t.value);
              }
              return [r, { [Symbol.iterator]: () => i }];
            }),
            (e.equals = function (e, t, n = (e, t) => e === t) {
              const r = e[Symbol.iterator](),
                i = t[Symbol.iterator]();
              for (;;) {
                const e = r.next(),
                  t = i.next();
                if (e.done !== t.done) return !1;
                if (e.done) return !0;
                if (!n(e.value, t.value)) return !1;
              }
            });
        })(t.Iterable || (t.Iterable = {}));
    }),
    e(n[24], r([0, 1]), function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.KeyChord =
          t.KeyCodeUtils =
          t.IMMUTABLE_KEY_CODE_TO_CODE =
          t.IMMUTABLE_CODE_TO_KEY_CODE =
          t.NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE =
          t.EVENT_KEY_CODE_MAP =
            void 0);
      class n {
        constructor() {
          (this._keyCodeToStr = []), (this._strToKeyCode = Object.create(null));
        }
        define(e, t) {
          (this._keyCodeToStr[e] = t),
            (this._strToKeyCode[t.toLowerCase()] = e);
        }
        keyCodeToStr(e) {
          return this._keyCodeToStr[e];
        }
        strToKeyCode(e) {
          return this._strToKeyCode[e.toLowerCase()] || 0;
        }
      }
      const r = new n(),
        i = new n(),
        o = new n();
      (t.EVENT_KEY_CODE_MAP = new Array(230)),
        (t.NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE = {});
      const s = [],
        a = Object.create(null),
        l = Object.create(null);
      (t.IMMUTABLE_CODE_TO_KEY_CODE = []), (t.IMMUTABLE_KEY_CODE_TO_CODE = []);
      for (let c = 0; c <= 193; c++) t.IMMUTABLE_CODE_TO_KEY_CODE[c] = -1;
      for (let c = 0; c <= 126; c++) t.IMMUTABLE_KEY_CODE_TO_CODE[c] = -1;
      var u;
      !(function () {
        const e = "",
          n = [
            [0, 1, 0, "None", 0, "unknown", 0, "VK_UNKNOWN", e, e],
            [0, 1, 1, "Hyper", 0, e, 0, e, e, e],
            [0, 1, 2, "Super", 0, e, 0, e, e, e],
            [0, 1, 3, "Fn", 0, e, 0, e, e, e],
            [0, 1, 4, "FnLock", 0, e, 0, e, e, e],
            [0, 1, 5, "Suspend", 0, e, 0, e, e, e],
            [0, 1, 6, "Resume", 0, e, 0, e, e, e],
            [0, 1, 7, "Turbo", 0, e, 0, e, e, e],
            [0, 1, 8, "Sleep", 0, e, 0, "VK_SLEEP", e, e],
            [0, 1, 9, "WakeUp", 0, e, 0, e, e, e],
            [31, 0, 10, "KeyA", 31, "A", 65, "VK_A", e, e],
            [32, 0, 11, "KeyB", 32, "B", 66, "VK_B", e, e],
            [33, 0, 12, "KeyC", 33, "C", 67, "VK_C", e, e],
            [34, 0, 13, "KeyD", 34, "D", 68, "VK_D", e, e],
            [35, 0, 14, "KeyE", 35, "E", 69, "VK_E", e, e],
            [36, 0, 15, "KeyF", 36, "F", 70, "VK_F", e, e],
            [37, 0, 16, "KeyG", 37, "G", 71, "VK_G", e, e],
            [38, 0, 17, "KeyH", 38, "H", 72, "VK_H", e, e],
            [39, 0, 18, "KeyI", 39, "I", 73, "VK_I", e, e],
            [40, 0, 19, "KeyJ", 40, "J", 74, "VK_J", e, e],
            [41, 0, 20, "KeyK", 41, "K", 75, "VK_K", e, e],
            [42, 0, 21, "KeyL", 42, "L", 76, "VK_L", e, e],
            [43, 0, 22, "KeyM", 43, "M", 77, "VK_M", e, e],
            [44, 0, 23, "KeyN", 44, "N", 78, "VK_N", e, e],
            [45, 0, 24, "KeyO", 45, "O", 79, "VK_O", e, e],
            [46, 0, 25, "KeyP", 46, "P", 80, "VK_P", e, e],
            [47, 0, 26, "KeyQ", 47, "Q", 81, "VK_Q", e, e],
            [48, 0, 27, "KeyR", 48, "R", 82, "VK_R", e, e],
            [49, 0, 28, "KeyS", 49, "S", 83, "VK_S", e, e],
            [50, 0, 29, "KeyT", 50, "T", 84, "VK_T", e, e],
            [51, 0, 30, "KeyU", 51, "U", 85, "VK_U", e, e],
            [52, 0, 31, "KeyV", 52, "V", 86, "VK_V", e, e],
            [53, 0, 32, "KeyW", 53, "W", 87, "VK_W", e, e],
            [54, 0, 33, "KeyX", 54, "X", 88, "VK_X", e, e],
            [55, 0, 34, "KeyY", 55, "Y", 89, "VK_Y", e, e],
            [56, 0, 35, "KeyZ", 56, "Z", 90, "VK_Z", e, e],
            [22, 0, 36, "Digit1", 22, "1", 49, "VK_1", e, e],
            [23, 0, 37, "Digit2", 23, "2", 50, "VK_2", e, e],
            [24, 0, 38, "Digit3", 24, "3", 51, "VK_3", e, e],
            [25, 0, 39, "Digit4", 25, "4", 52, "VK_4", e, e],
            [26, 0, 40, "Digit5", 26, "5", 53, "VK_5", e, e],
            [27, 0, 41, "Digit6", 27, "6", 54, "VK_6", e, e],
            [28, 0, 42, "Digit7", 28, "7", 55, "VK_7", e, e],
            [29, 0, 43, "Digit8", 29, "8", 56, "VK_8", e, e],
            [30, 0, 44, "Digit9", 30, "9", 57, "VK_9", e, e],
            [21, 0, 45, "Digit0", 21, "0", 48, "VK_0", e, e],
            [3, 1, 46, "Enter", 3, "Enter", 13, "VK_RETURN", e, e],
            [9, 1, 47, "Escape", 9, "Escape", 27, "VK_ESCAPE", e, e],
            [1, 1, 48, "Backspace", 1, "Backspace", 8, "VK_BACK", e, e],
            [2, 1, 49, "Tab", 2, "Tab", 9, "VK_TAB", e, e],
            [10, 1, 50, "Space", 10, "Space", 32, "VK_SPACE", e, e],
            [
              83,
              0,
              51,
              "Minus",
              83,
              "-",
              189,
              "VK_OEM_MINUS",
              "-",
              "OEM_MINUS",
            ],
            [81, 0, 52, "Equal", 81, "=", 187, "VK_OEM_PLUS", "=", "OEM_PLUS"],
            [87, 0, 53, "BracketLeft", 87, "[", 219, "VK_OEM_4", "[", "OEM_4"],
            [89, 0, 54, "BracketRight", 89, "]", 221, "VK_OEM_6", "]", "OEM_6"],
            [88, 0, 55, "Backslash", 88, "\\", 220, "VK_OEM_5", "\\", "OEM_5"],
            [0, 0, 56, "IntlHash", 0, e, 0, e, e, e],
            [80, 0, 57, "Semicolon", 80, ";", 186, "VK_OEM_1", ";", "OEM_1"],
            [90, 0, 58, "Quote", 90, "'", 222, "VK_OEM_7", "'", "OEM_7"],
            [86, 0, 59, "Backquote", 86, "`", 192, "VK_OEM_3", "`", "OEM_3"],
            [
              82,
              0,
              60,
              "Comma",
              82,
              ",",
              188,
              "VK_OEM_COMMA",
              ",",
              "OEM_COMMA",
            ],
            [
              84,
              0,
              61,
              "Period",
              84,
              ".",
              190,
              "VK_OEM_PERIOD",
              ".",
              "OEM_PERIOD",
            ],
            [85, 0, 62, "Slash", 85, "/", 191, "VK_OEM_2", "/", "OEM_2"],
            [8, 1, 63, "CapsLock", 8, "CapsLock", 20, "VK_CAPITAL", e, e],
            [59, 1, 64, "F1", 59, "F1", 112, "VK_F1", e, e],
            [60, 1, 65, "F2", 60, "F2", 113, "VK_F2", e, e],
            [61, 1, 66, "F3", 61, "F3", 114, "VK_F3", e, e],
            [62, 1, 67, "F4", 62, "F4", 115, "VK_F4", e, e],
            [63, 1, 68, "F5", 63, "F5", 116, "VK_F5", e, e],
            [64, 1, 69, "F6", 64, "F6", 117, "VK_F6", e, e],
            [65, 1, 70, "F7", 65, "F7", 118, "VK_F7", e, e],
            [66, 1, 71, "F8", 66, "F8", 119, "VK_F8", e, e],
            [67, 1, 72, "F9", 67, "F9", 120, "VK_F9", e, e],
            [68, 1, 73, "F10", 68, "F10", 121, "VK_F10", e, e],
            [69, 1, 74, "F11", 69, "F11", 122, "VK_F11", e, e],
            [70, 1, 75, "F12", 70, "F12", 123, "VK_F12", e, e],
            [0, 1, 76, "PrintScreen", 0, e, 0, e, e, e],
            [79, 1, 77, "ScrollLock", 79, "ScrollLock", 145, "VK_SCROLL", e, e],
            [7, 1, 78, "Pause", 7, "PauseBreak", 19, "VK_PAUSE", e, e],
            [19, 1, 79, "Insert", 19, "Insert", 45, "VK_INSERT", e, e],
            [14, 1, 80, "Home", 14, "Home", 36, "VK_HOME", e, e],
            [11, 1, 81, "PageUp", 11, "PageUp", 33, "VK_PRIOR", e, e],
            [20, 1, 82, "Delete", 20, "Delete", 46, "VK_DELETE", e, e],
            [13, 1, 83, "End", 13, "End", 35, "VK_END", e, e],
            [12, 1, 84, "PageDown", 12, "PageDown", 34, "VK_NEXT", e, e],
            [
              17,
              1,
              85,
              "ArrowRight",
              17,
              "RightArrow",
              39,
              "VK_RIGHT",
              "Right",
              e,
            ],
            [15, 1, 86, "ArrowLeft", 15, "LeftArrow", 37, "VK_LEFT", "Left", e],
            [18, 1, 87, "ArrowDown", 18, "DownArrow", 40, "VK_DOWN", "Down", e],
            [16, 1, 88, "ArrowUp", 16, "UpArrow", 38, "VK_UP", "Up", e],
            [78, 1, 89, "NumLock", 78, "NumLock", 144, "VK_NUMLOCK", e, e],
            [
              108,
              1,
              90,
              "NumpadDivide",
              108,
              "NumPad_Divide",
              111,
              "VK_DIVIDE",
              e,
              e,
            ],
            [
              103,
              1,
              91,
              "NumpadMultiply",
              103,
              "NumPad_Multiply",
              106,
              "VK_MULTIPLY",
              e,
              e,
            ],
            [
              106,
              1,
              92,
              "NumpadSubtract",
              106,
              "NumPad_Subtract",
              109,
              "VK_SUBTRACT",
              e,
              e,
            ],
            [104, 1, 93, "NumpadAdd", 104, "NumPad_Add", 107, "VK_ADD", e, e],
            [3, 1, 94, "NumpadEnter", 3, e, 0, e, e, e],
            [94, 1, 95, "Numpad1", 94, "NumPad1", 97, "VK_NUMPAD1", e, e],
            [95, 1, 96, "Numpad2", 95, "NumPad2", 98, "VK_NUMPAD2", e, e],
            [96, 1, 97, "Numpad3", 96, "NumPad3", 99, "VK_NUMPAD3", e, e],
            [97, 1, 98, "Numpad4", 97, "NumPad4", 100, "VK_NUMPAD4", e, e],
            [98, 1, 99, "Numpad5", 98, "NumPad5", 101, "VK_NUMPAD5", e, e],
            [99, 1, 100, "Numpad6", 99, "NumPad6", 102, "VK_NUMPAD6", e, e],
            [100, 1, 101, "Numpad7", 100, "NumPad7", 103, "VK_NUMPAD7", e, e],
            [101, 1, 102, "Numpad8", 101, "NumPad8", 104, "VK_NUMPAD8", e, e],
            [102, 1, 103, "Numpad9", 102, "NumPad9", 105, "VK_NUMPAD9", e, e],
            [93, 1, 104, "Numpad0", 93, "NumPad0", 96, "VK_NUMPAD0", e, e],
            [
              107,
              1,
              105,
              "NumpadDecimal",
              107,
              "NumPad_Decimal",
              110,
              "VK_DECIMAL",
              e,
              e,
            ],
            [
              92,
              0,
              106,
              "IntlBackslash",
              92,
              "OEM_102",
              226,
              "VK_OEM_102",
              e,
              e,
            ],
            [58, 1, 107, "ContextMenu", 58, "ContextMenu", 93, e, e, e],
            [0, 1, 108, "Power", 0, e, 0, e, e, e],
            [0, 1, 109, "NumpadEqual", 0, e, 0, e, e, e],
            [71, 1, 110, "F13", 71, "F13", 124, "VK_F13", e, e],
            [72, 1, 111, "F14", 72, "F14", 125, "VK_F14", e, e],
            [73, 1, 112, "F15", 73, "F15", 126, "VK_F15", e, e],
            [74, 1, 113, "F16", 74, "F16", 127, "VK_F16", e, e],
            [75, 1, 114, "F17", 75, "F17", 128, "VK_F17", e, e],
            [76, 1, 115, "F18", 76, "F18", 129, "VK_F18", e, e],
            [77, 1, 116, "F19", 77, "F19", 130, "VK_F19", e, e],
            [0, 1, 117, "F20", 0, e, 0, "VK_F20", e, e],
            [0, 1, 118, "F21", 0, e, 0, "VK_F21", e, e],
            [0, 1, 119, "F22", 0, e, 0, "VK_F22", e, e],
            [0, 1, 120, "F23", 0, e, 0, "VK_F23", e, e],
            [0, 1, 121, "F24", 0, e, 0, "VK_F24", e, e],
            [0, 1, 122, "Open", 0, e, 0, e, e, e],
            [0, 1, 123, "Help", 0, e, 0, e, e, e],
            [0, 1, 124, "Select", 0, e, 0, e, e, e],
            [0, 1, 125, "Again", 0, e, 0, e, e, e],
            [0, 1, 126, "Undo", 0, e, 0, e, e, e],
            [0, 1, 127, "Cut", 0, e, 0, e, e, e],
            [0, 1, 128, "Copy", 0, e, 0, e, e, e],
            [0, 1, 129, "Paste", 0, e, 0, e, e, e],
            [0, 1, 130, "Find", 0, e, 0, e, e, e],
            [
              0,
              1,
              131,
              "AudioVolumeMute",
              112,
              "AudioVolumeMute",
              173,
              "VK_VOLUME_MUTE",
              e,
              e,
            ],
            [
              0,
              1,
              132,
              "AudioVolumeUp",
              113,
              "AudioVolumeUp",
              175,
              "VK_VOLUME_UP",
              e,
              e,
            ],
            [
              0,
              1,
              133,
              "AudioVolumeDown",
              114,
              "AudioVolumeDown",
              174,
              "VK_VOLUME_DOWN",
              e,
              e,
            ],
            [
              105,
              1,
              134,
              "NumpadComma",
              105,
              "NumPad_Separator",
              108,
              "VK_SEPARATOR",
              e,
              e,
            ],
            [110, 0, 135, "IntlRo", 110, "ABNT_C1", 193, "VK_ABNT_C1", e, e],
            [0, 1, 136, "KanaMode", 0, e, 0, e, e, e],
            [0, 0, 137, "IntlYen", 0, e, 0, e, e, e],
            [0, 1, 138, "Convert", 0, e, 0, e, e, e],
            [0, 1, 139, "NonConvert", 0, e, 0, e, e, e],
            [0, 1, 140, "Lang1", 0, e, 0, e, e, e],
            [0, 1, 141, "Lang2", 0, e, 0, e, e, e],
            [0, 1, 142, "Lang3", 0, e, 0, e, e, e],
            [0, 1, 143, "Lang4", 0, e, 0, e, e, e],
            [0, 1, 144, "Lang5", 0, e, 0, e, e, e],
            [0, 1, 145, "Abort", 0, e, 0, e, e, e],
            [0, 1, 146, "Props", 0, e, 0, e, e, e],
            [0, 1, 147, "NumpadParenLeft", 0, e, 0, e, e, e],
            [0, 1, 148, "NumpadParenRight", 0, e, 0, e, e, e],
            [0, 1, 149, "NumpadBackspace", 0, e, 0, e, e, e],
            [0, 1, 150, "NumpadMemoryStore", 0, e, 0, e, e, e],
            [0, 1, 151, "NumpadMemoryRecall", 0, e, 0, e, e, e],
            [0, 1, 152, "NumpadMemoryClear", 0, e, 0, e, e, e],
            [0, 1, 153, "NumpadMemoryAdd", 0, e, 0, e, e, e],
            [0, 1, 154, "NumpadMemorySubtract", 0, e, 0, e, e, e],
            [0, 1, 155, "NumpadClear", 0, e, 0, e, e, e],
            [0, 1, 156, "NumpadClearEntry", 0, e, 0, e, e, e],
            [5, 1, 0, e, 5, "Ctrl", 17, "VK_CONTROL", e, e],
            [4, 1, 0, e, 4, "Shift", 16, "VK_SHIFT", e, e],
            [6, 1, 0, e, 6, "Alt", 18, "VK_MENU", e, e],
            [57, 1, 0, e, 57, "Meta", 0, "VK_COMMAND", e, e],
            [5, 1, 157, "ControlLeft", 5, e, 0, "VK_LCONTROL", e, e],
            [4, 1, 158, "ShiftLeft", 4, e, 0, "VK_LSHIFT", e, e],
            [6, 1, 159, "AltLeft", 6, e, 0, "VK_LMENU", e, e],
            [57, 1, 160, "MetaLeft", 57, e, 0, "VK_LWIN", e, e],
            [5, 1, 161, "ControlRight", 5, e, 0, "VK_RCONTROL", e, e],
            [4, 1, 162, "ShiftRight", 4, e, 0, "VK_RSHIFT", e, e],
            [6, 1, 163, "AltRight", 6, e, 0, "VK_RMENU", e, e],
            [57, 1, 164, "MetaRight", 57, e, 0, "VK_RWIN", e, e],
            [0, 1, 165, "BrightnessUp", 0, e, 0, e, e, e],
            [0, 1, 166, "BrightnessDown", 0, e, 0, e, e, e],
            [0, 1, 167, "MediaPlay", 0, e, 0, e, e, e],
            [0, 1, 168, "MediaRecord", 0, e, 0, e, e, e],
            [0, 1, 169, "MediaFastForward", 0, e, 0, e, e, e],
            [0, 1, 170, "MediaRewind", 0, e, 0, e, e, e],
            [
              114,
              1,
              171,
              "MediaTrackNext",
              119,
              "MediaTrackNext",
              176,
              "VK_MEDIA_NEXT_TRACK",
              e,
              e,
            ],
            [
              115,
              1,
              172,
              "MediaTrackPrevious",
              120,
              "MediaTrackPrevious",
              177,
              "VK_MEDIA_PREV_TRACK",
              e,
              e,
            ],
            [
              116,
              1,
              173,
              "MediaStop",
              121,
              "MediaStop",
              178,
              "VK_MEDIA_STOP",
              e,
              e,
            ],
            [0, 1, 174, "Eject", 0, e, 0, e, e, e],
            [
              117,
              1,
              175,
              "MediaPlayPause",
              122,
              "MediaPlayPause",
              179,
              "VK_MEDIA_PLAY_PAUSE",
              e,
              e,
            ],
            [
              0,
              1,
              176,
              "MediaSelect",
              123,
              "LaunchMediaPlayer",
              181,
              "VK_MEDIA_LAUNCH_MEDIA_SELECT",
              e,
              e,
            ],
            [
              0,
              1,
              177,
              "LaunchMail",
              124,
              "LaunchMail",
              180,
              "VK_MEDIA_LAUNCH_MAIL",
              e,
              e,
            ],
            [
              0,
              1,
              178,
              "LaunchApp2",
              125,
              "LaunchApp2",
              183,
              "VK_MEDIA_LAUNCH_APP2",
              e,
              e,
            ],
            [0, 1, 179, "LaunchApp1", 0, e, 0, "VK_MEDIA_LAUNCH_APP1", e, e],
            [0, 1, 180, "SelectTask", 0, e, 0, e, e, e],
            [0, 1, 181, "LaunchScreenSaver", 0, e, 0, e, e, e],
            [
              0,
              1,
              182,
              "BrowserSearch",
              115,
              "BrowserSearch",
              170,
              "VK_BROWSER_SEARCH",
              e,
              e,
            ],
            [
              0,
              1,
              183,
              "BrowserHome",
              116,
              "BrowserHome",
              172,
              "VK_BROWSER_HOME",
              e,
              e,
            ],
            [
              112,
              1,
              184,
              "BrowserBack",
              117,
              "BrowserBack",
              166,
              "VK_BROWSER_BACK",
              e,
              e,
            ],
            [
              113,
              1,
              185,
              "BrowserForward",
              118,
              "BrowserForward",
              167,
              "VK_BROWSER_FORWARD",
              e,
              e,
            ],
            [0, 1, 186, "BrowserStop", 0, e, 0, "VK_BROWSER_STOP", e, e],
            [0, 1, 187, "BrowserRefresh", 0, e, 0, "VK_BROWSER_REFRESH", e, e],
            [
              0,
              1,
              188,
              "BrowserFavorites",
              0,
              e,
              0,
              "VK_BROWSER_FAVORITES",
              e,
              e,
            ],
            [0, 1, 189, "ZoomToggle", 0, e, 0, e, e, e],
            [0, 1, 190, "MailReply", 0, e, 0, e, e, e],
            [0, 1, 191, "MailForward", 0, e, 0, e, e, e],
            [0, 1, 192, "MailSend", 0, e, 0, e, e, e],
            [109, 1, 0, e, 109, "KeyInComposition", 229, e, e, e],
            [111, 1, 0, e, 111, "ABNT_C2", 194, "VK_ABNT_C2", e, e],
            [91, 1, 0, e, 91, "OEM_8", 223, "VK_OEM_8", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_CLEAR", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_KANA", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_HANGUL", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_JUNJA", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_FINAL", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_HANJA", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_KANJI", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_CONVERT", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_NONCONVERT", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_ACCEPT", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_MODECHANGE", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_SELECT", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_PRINT", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_EXECUTE", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_SNAPSHOT", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_HELP", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_APPS", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_PROCESSKEY", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_PACKET", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_DBE_SBCSCHAR", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_DBE_DBCSCHAR", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_ATTN", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_CRSEL", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_EXSEL", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_EREOF", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_PLAY", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_ZOOM", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_NONAME", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_PA1", e, e],
            [0, 1, 0, e, 0, e, 0, "VK_OEM_CLEAR", e, e],
          ];
        let u = [],
          c = [];
        for (const h of n) {
          const [e, n, d, f, g, m, p, _, b, C] = h;
          if (
            (c[d] ||
              ((c[d] = !0),
              (s[d] = f),
              (a[f] = d),
              (l[f.toLowerCase()] = d),
              n &&
                ((t.IMMUTABLE_CODE_TO_KEY_CODE[d] = g),
                0 !== g &&
                  3 !== g &&
                  5 !== g &&
                  4 !== g &&
                  6 !== g &&
                  57 !== g &&
                  (t.IMMUTABLE_KEY_CODE_TO_CODE[g] = d))),
            !u[g])
          ) {
            if (((u[g] = !0), !m))
              throw new Error(
                `String representation missing for key code ${g} around scan code ${f}`
              );
            r.define(g, m), i.define(g, b || m), o.define(g, C || b || m);
          }
          p && (t.EVENT_KEY_CODE_MAP[p] = g),
            _ && (t.NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE[_] = g);
        }
        t.IMMUTABLE_KEY_CODE_TO_CODE[3] = 46;
      })(),
        ((u = t.KeyCodeUtils || (t.KeyCodeUtils = {})).toString = function (e) {
          return r.keyCodeToStr(e);
        }),
        (u.fromString = function (e) {
          return r.strToKeyCode(e);
        }),
        (u.toUserSettingsUS = function (e) {
          return i.keyCodeToStr(e);
        }),
        (u.toUserSettingsGeneral = function (e) {
          return o.keyCodeToStr(e);
        }),
        (u.fromUserSettings = function (e) {
          return i.strToKeyCode(e) || o.strToKeyCode(e);
        }),
        (u.toElectronAccelerator = function (e) {
          if (e >= 93 && e <= 108) return null;
          switch (e) {
            case 16:
              return "Up";
            case 18:
              return "Down";
            case 15:
              return "Left";
            case 17:
              return "Right";
          }
          return r.keyCodeToStr(e);
        }),
        (t.KeyChord = function (e, t) {
          return (e | (((65535 & t) << 16) >>> 0)) >>> 0;
        });
    }),
    e(n[25], r([0, 1]), function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }), (t.Lazy = void 0);
      t.Lazy = class {
        constructor(e) {
          (this.executor = e), (this._didRun = !1);
        }
        getValue() {
          if (!this._didRun)
            try {
              this._value = this.executor();
            } catch (e) {
              this._error = e;
            } finally {
              this._didRun = !0;
            }
          if (this._error) throw this._error;
          return this._value;
        }
        get rawValue() {
          return this._value;
        }
      };
    }),
    e(n[7], r([0, 1, 22, 23]), function (e, t, n, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.ImmortalReference =
          t.MutableDisposable =
          t.Disposable =
          t.DisposableStore =
          t.toDisposable =
          t.combinedDisposable =
          t.dispose =
          t.isDisposable =
          t.MultiDisposeError =
          t.markAsSingleton =
          t.setDisposableTracker =
            void 0);
      let i = null;
      function o(e) {
        i = e;
      }
      function s(e) {
        return null == i || i.trackDisposable(e), e;
      }
      function a(e) {
        null == i || i.markAsDisposed(e);
      }
      function l(e, t) {
        null == i || i.setParent(e, t);
      }
      (t.setDisposableTracker = o),
        (t.markAsSingleton = function (e) {
          return null == i || i.markAsSingleton(e), e;
        });
      class u extends Error {
        constructor(e) {
          super(
            `Encountered errors while disposing of store. Errors: [${e.join(
              ", "
            )}]`
          ),
            (this.errors = e);
        }
      }
      function c(e) {
        if (r.Iterable.is(e)) {
          let n = [];
          for (const r of e)
            if (r)
              try {
                r.dispose();
              } catch (t) {
                n.push(t);
              }
          if (1 === n.length) throw n[0];
          if (n.length > 1) throw new u(n);
          return Array.isArray(e) ? [] : e;
        }
        if (e) return e.dispose(), e;
      }
      function h(e) {
        const t = s({
          dispose: (0, n.once)(() => {
            a(t), e();
          }),
        });
        return t;
      }
      (t.MultiDisposeError = u),
        (t.isDisposable = function (e) {
          return "function" == typeof e.dispose && 0 === e.dispose.length;
        }),
        (t.dispose = c),
        (t.combinedDisposable = function (...e) {
          const t = h(() => c(e));
          return (
            (function (e, t) {
              if (i) for (const n of e) i.setParent(n, t);
            })(e, t),
            t
          );
        }),
        (t.toDisposable = h);
      class d {
        constructor() {
          (this._toDispose = new Set()), (this._isDisposed = !1), s(this);
        }
        dispose() {
          this._isDisposed || (a(this), (this._isDisposed = !0), this.clear());
        }
        get isDisposed() {
          return this._isDisposed;
        }
        clear() {
          try {
            c(this._toDispose.values());
          } finally {
            this._toDispose.clear();
          }
        }
        add(e) {
          if (!e) return e;
          if (e === this)
            throw new Error("Cannot register a disposable on itself!");
          return (
            l(e, this),
            this._isDisposed
              ? d.DISABLE_DISPOSED_WARNING ||
                console.warn(
                  new Error(
                    "Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!"
                  ).stack
                )
              : this._toDispose.add(e),
            e
          );
        }
      }
      (t.DisposableStore = d), (d.DISABLE_DISPOSED_WARNING = !1);
      class f {
        constructor() {
          (this._store = new d()), s(this), l(this._store, this);
        }
        dispose() {
          a(this), this._store.dispose();
        }
        _register(e) {
          if (e === this)
            throw new Error("Cannot register a disposable on itself!");
          return this._store.add(e);
        }
      }
      (t.Disposable = f), (f.None = Object.freeze({ dispose() {} }));
      t.MutableDisposable = class {
        constructor() {
          (this._isDisposed = !1), s(this);
        }
        get value() {
          return this._isDisposed ? void 0 : this._value;
        }
        set value(e) {
          var t;
          this._isDisposed ||
            e === this._value ||
            (null === (t = this._value) || void 0 === t || t.dispose(),
            e && l(e, this),
            (this._value = e));
        }
        clear() {
          this.value = void 0;
        }
        dispose() {
          var e;
          (this._isDisposed = !0),
            a(this),
            null === (e = this._value) || void 0 === e || e.dispose(),
            (this._value = void 0);
        }
        clearAndLeak() {
          const e = this._value;
          return (this._value = void 0), e && l(e, null), e;
        }
      };
      t.ImmortalReference = class {
        constructor(e) {
          this.object = e;
        }
        dispose() {}
      };
    }),
    e(n[26], r([0, 1]), function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.LinkedList = void 0);
      class n {
        constructor(e) {
          (this.element = e),
            (this.next = n.Undefined),
            (this.prev = n.Undefined);
        }
      }
      n.Undefined = new n(void 0);
      class r {
        constructor() {
          (this._first = n.Undefined),
            (this._last = n.Undefined),
            (this._size = 0);
        }
        get size() {
          return this._size;
        }
        isEmpty() {
          return this._first === n.Undefined;
        }
        clear() {
          let e = this._first;
          for (; e !== n.Undefined; ) {
            const t = e.next;
            (e.prev = n.Undefined), (e.next = n.Undefined), (e = t);
          }
          (this._first = n.Undefined),
            (this._last = n.Undefined),
            (this._size = 0);
        }
        unshift(e) {
          return this._insert(e, !1);
        }
        push(e) {
          return this._insert(e, !0);
        }
        _insert(e, t) {
          const r = new n(e);
          if (this._first === n.Undefined) (this._first = r), (this._last = r);
          else if (t) {
            const e = this._last;
            (this._last = r), (r.prev = e), (e.next = r);
          } else {
            const e = this._first;
            (this._first = r), (r.next = e), (e.prev = r);
          }
          this._size += 1;
          let i = !1;
          return () => {
            i || ((i = !0), this._remove(r));
          };
        }
        shift() {
          if (this._first !== n.Undefined) {
            const e = this._first.element;
            return this._remove(this._first), e;
          }
        }
        pop() {
          if (this._last !== n.Undefined) {
            const e = this._last.element;
            return this._remove(this._last), e;
          }
        }
        _remove(e) {
          if (e.prev !== n.Undefined && e.next !== n.Undefined) {
            const t = e.prev;
            (t.next = e.next), (e.next.prev = t);
          } else e.prev === n.Undefined && e.next === n.Undefined ? ((this._first = n.Undefined), (this._last = n.Undefined)) : e.next === n.Undefined ? ((this._last = this._last.prev), (this._last.next = n.Undefined)) : e.prev === n.Undefined && ((this._first = this._first.next), (this._first.prev = n.Undefined));
          this._size -= 1;
        }
        *[Symbol.iterator]() {
          let e = this._first;
          for (; e !== n.Undefined; ) yield e.element, (e = e.next);
        }
      }
      t.LinkedList = r;
    }),
    e(n[3], r([0, 1]), function (e, t) {
      "use strict";
      var n;
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.isAndroid =
          t.isEdge =
          t.isSafari =
          t.isFirefox =
          t.isChrome =
          t.isLittleEndian =
          t.OS =
          t.setTimeout0 =
          t.language =
          t.userAgent =
          t.isIOS =
          t.isWeb =
          t.isNative =
          t.isLinux =
          t.isMacintosh =
          t.isWindows =
          t.globals =
            void 0);
      const r = "en";
      let i,
        o,
        s,
        a,
        l = !1,
        u = !1,
        c = !1,
        h = !1,
        d = !1,
        f = !1,
        g = !1,
        m = !1,
        p = r;
      (t.globals =
        "object" == typeof self
          ? self
          : "object" == typeof global
          ? global
          : {}),
        "undefined" != typeof t.globals.vscode &&
        "undefined" != typeof t.globals.vscode.process
          ? (a = t.globals.vscode.process)
          : "undefined" != typeof process && (a = process);
      const _ =
          "string" ==
          typeof (null === (n = null == a ? void 0 : a.versions) || void 0 === n
            ? void 0
            : n.electron),
        b = _ && "renderer" === (null == a ? void 0 : a.type);
      if ("object" != typeof navigator || b)
        if ("object" == typeof a) {
          (l = "win32" === a.platform),
            (u = "darwin" === a.platform),
            (c = "linux" === a.platform),
            (h = c && !!a.env.SNAP && !!a.env.SNAP_REVISION),
            (g = _),
            (i = r),
            (p = r);
          const e = a.env.VSCODE_NLS_CONFIG;
          if (e)
            try {
              const t = JSON.parse(e),
                n = t.availableLanguages["*"];
              (i = t.locale), (p = n || r), (o = t._translationsConfigFile);
            } catch {}
          d = !0;
        } else console.error("Unable to resolve platform.");
      else
        (s = navigator.userAgent),
          (l = s.indexOf("Windows") >= 0),
          (u = s.indexOf("Macintosh") >= 0),
          (m =
            (s.indexOf("Macintosh") >= 0 ||
              s.indexOf("iPad") >= 0 ||
              s.indexOf("iPhone") >= 0) &&
            !!navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 0),
          (c = s.indexOf("Linux") >= 0),
          (f = !0),
          (i = navigator.language),
          (p = i);
      let C = 0;
      u ? (C = 1) : l ? (C = 3) : c && (C = 2),
        (t.isWindows = l),
        (t.isMacintosh = u),
        (t.isLinux = c),
        (t.isNative = d),
        (t.isWeb = f),
        (t.isIOS = m),
        (t.userAgent = s),
        (t.language = p),
        (t.setTimeout0 = (() => {
          if (
            "function" == typeof t.globals.postMessage &&
            !t.globals.importScripts
          ) {
            let e = [];
            t.globals.addEventListener("message", (t) => {
              if (t.data && t.data.vscodeScheduleAsyncWork)
                for (let n = 0, r = e.length; n < r; n++) {
                  const r = e[n];
                  if (r.id === t.data.vscodeScheduleAsyncWork)
                    return e.splice(n, 1), void r.callback();
                }
            });
            let n = 0;
            return (r) => {
              const i = ++n;
              e.push({ id: i, callback: r }),
                t.globals.postMessage({ vscodeScheduleAsyncWork: i }, "*");
            };
          }
          return (e) => setTimeout(e);
        })()),
        (t.OS = u || m ? 2 : l ? 1 : 3);
      let y = !0,
        v = !1;
      (t.isLittleEndian = function () {
        if (!v) {
          v = !0;
          const e = new Uint8Array(2);
          (e[0] = 1), (e[1] = 2), (y = 513 === new Uint16Array(e.buffer)[0]);
        }
        return y;
      }),
        (t.isChrome = !!(t.userAgent && t.userAgent.indexOf("Chrome") >= 0)),
        (t.isFirefox = !!(t.userAgent && t.userAgent.indexOf("Firefox") >= 0)),
        (t.isSafari = !!(
          !t.isChrome &&
          t.userAgent &&
          t.userAgent.indexOf("Safari") >= 0
        )),
        (t.isEdge = !!(t.userAgent && t.userAgent.indexOf("Edg/") >= 0)),
        (t.isAndroid = !!(t.userAgent && t.userAgent.indexOf("Android") >= 0));
    }),
    e(n[27], r([0, 1, 3]), function (e, t, n) {
      "use strict";
      let r;
      if (
        (Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.platform = t.env = t.cwd = void 0),
        "undefined" != typeof n.globals.vscode &&
          "undefined" != typeof n.globals.vscode.process)
      ) {
        const e = n.globals.vscode.process;
        r = {
          get platform() {
            return e.platform;
          },
          get arch() {
            return e.arch;
          },
          get env() {
            return e.env;
          },
          cwd: () => e.cwd(),
        };
      } else
        r =
          "undefined" != typeof process
            ? {
                get platform() {
                  return process.platform;
                },
                get arch() {
                  return process.arch;
                },
                get env() {
                  return process.env;
                },
                cwd: () => process.env.VSCODE_CWD || process.cwd(),
              }
            : {
                get platform() {
                  return n.isWindows
                    ? "win32"
                    : n.isMacintosh
                    ? "darwin"
                    : "linux";
                },
                get arch() {},
                get env() {
                  return {};
                },
                cwd: () => "/",
              };
      (t.cwd = r.cwd), (t.env = r.env), (t.platform = r.platform);
    }),
    e(n[8], r([0, 1, 27]), function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.sep =
          t.extname =
          t.basename =
          t.dirname =
          t.relative =
          t.resolve =
          t.normalize =
          t.posix =
          t.win32 =
            void 0);
      const r = 46,
        i = 47,
        o = 92,
        s = 58;
      class a extends Error {
        constructor(e, t, n) {
          let r;
          "string" == typeof t && 0 === t.indexOf("not ")
            ? ((r = "must not be"), (t = t.replace(/^not /, "")))
            : (r = "must be");
          const i = -1 !== e.indexOf(".") ? "property" : "argument";
          let o = `The "${e}" ${i} ${r} of type ${t}`;
          (o += ". Received type " + typeof n),
            super(o),
            (this.code = "ERR_INVALID_ARG_TYPE");
        }
      }
      function l(e, t) {
        if ("string" != typeof e) throw new a(t, "string", e);
      }
      function u(e) {
        return e === i || e === o;
      }
      function c(e) {
        return e === i;
      }
      function h(e) {
        return (e >= 65 && e <= 90) || (e >= 97 && e <= 122);
      }
      function d(e, t, n, o) {
        let s = "",
          a = 0,
          l = -1,
          u = 0,
          c = 0;
        for (let h = 0; h <= e.length; ++h) {
          if (h < e.length) c = e.charCodeAt(h);
          else {
            if (o(c)) break;
            c = i;
          }
          if (o(c)) {
            if (l !== h - 1 && 1 !== u)
              if (2 === u) {
                if (
                  s.length < 2 ||
                  2 !== a ||
                  s.charCodeAt(s.length - 1) !== r ||
                  s.charCodeAt(s.length - 2) !== r
                ) {
                  if (s.length > 2) {
                    const e = s.lastIndexOf(n);
                    -1 === e
                      ? ((s = ""), (a = 0))
                      : ((s = s.slice(0, e)),
                        (a = s.length - 1 - s.lastIndexOf(n))),
                      (l = h),
                      (u = 0);
                    continue;
                  }
                  if (0 !== s.length) {
                    (s = ""), (a = 0), (l = h), (u = 0);
                    continue;
                  }
                }
                t && ((s += s.length > 0 ? `${n}..` : ".."), (a = 2));
              } else
                s.length > 0
                  ? (s += `${n}${e.slice(l + 1, h)}`)
                  : (s = e.slice(l + 1, h)),
                  (a = h - l - 1);
            (l = h), (u = 0);
          } else c === r && -1 !== u ? ++u : (u = -1);
        }
        return s;
      }
      function f(e, t) {
        if (null === t || "object" != typeof t)
          throw new a("pathObject", "Object", t);
        const n = t.dir || t.root,
          r = t.base || `${t.name || ""}${t.ext || ""}`;
        return n ? (n === t.root ? `${n}${r}` : `${n}${e}${r}`) : r;
      }
      (t.win32 = {
        resolve(...e) {
          let t = "",
            r = "",
            i = !1;
          for (let a = e.length - 1; a >= -1; a--) {
            let c;
            if (a >= 0) {
              if (((c = e[a]), l(c, "path"), 0 === c.length)) continue;
            } else
              0 === t.length
                ? (c = n.cwd())
                : ((c = n.env[`=${t}`] || n.cwd()),
                  (void 0 === c ||
                    (c.slice(0, 2).toLowerCase() !== t.toLowerCase() &&
                      c.charCodeAt(2) === o)) &&
                    (c = `${t}\\`));
            const d = c.length;
            let f = 0,
              g = "",
              m = !1;
            const p = c.charCodeAt(0);
            if (1 === d) u(p) && ((f = 1), (m = !0));
            else if (u(p))
              if (((m = !0), u(c.charCodeAt(1)))) {
                let e = 2,
                  t = e;
                for (; e < d && !u(c.charCodeAt(e)); ) e++;
                if (e < d && e !== t) {
                  const n = c.slice(t, e);
                  for (t = e; e < d && u(c.charCodeAt(e)); ) e++;
                  if (e < d && e !== t) {
                    for (t = e; e < d && !u(c.charCodeAt(e)); ) e++;
                    (e === d || e !== t) &&
                      ((g = `\\\\${n}\\${c.slice(t, e)}`), (f = e));
                  }
                }
              } else f = 1;
            else
              h(p) &&
                c.charCodeAt(1) === s &&
                ((g = c.slice(0, 2)),
                (f = 2),
                d > 2 && u(c.charCodeAt(2)) && ((m = !0), (f = 3)));
            if (g.length > 0)
              if (t.length > 0) {
                if (g.toLowerCase() !== t.toLowerCase()) continue;
              } else t = g;
            if (i) {
              if (t.length > 0) break;
            } else if (
              ((r = `${c.slice(f)}\\${r}`), (i = m), m && t.length > 0)
            )
              break;
          }
          return (r = d(r, !i, "\\", u)), i ? `${t}\\${r}` : `${t}${r}` || ".";
        },
        normalize(e) {
          l(e, "path");
          const t = e.length;
          if (0 === t) return ".";
          let n,
            r = 0,
            i = !1;
          const o = e.charCodeAt(0);
          if (1 === t) return c(o) ? "\\" : e;
          if (u(o))
            if (((i = !0), u(e.charCodeAt(1)))) {
              let i = 2,
                o = i;
              for (; i < t && !u(e.charCodeAt(i)); ) i++;
              if (i < t && i !== o) {
                const s = e.slice(o, i);
                for (o = i; i < t && u(e.charCodeAt(i)); ) i++;
                if (i < t && i !== o) {
                  for (o = i; i < t && !u(e.charCodeAt(i)); ) i++;
                  if (i === t) return `\\\\${s}\\${e.slice(o)}\\`;
                  i !== o && ((n = `\\\\${s}\\${e.slice(o, i)}`), (r = i));
                }
              }
            } else r = 1;
          else
            h(o) &&
              e.charCodeAt(1) === s &&
              ((n = e.slice(0, 2)),
              (r = 2),
              t > 2 && u(e.charCodeAt(2)) && ((i = !0), (r = 3)));
          let a = r < t ? d(e.slice(r), !i, "\\", u) : "";
          return (
            0 === a.length && !i && (a = "."),
            a.length > 0 && u(e.charCodeAt(t - 1)) && (a += "\\"),
            void 0 === n ? (i ? `\\${a}` : a) : i ? `${n}\\${a}` : `${n}${a}`
          );
        },
        isAbsolute(e) {
          l(e, "path");
          const t = e.length;
          if (0 === t) return !1;
          const n = e.charCodeAt(0);
          return (
            u(n) ||
            (t > 2 && h(n) && e.charCodeAt(1) === s && u(e.charCodeAt(2)))
          );
        },
        join(...e) {
          if (0 === e.length) return ".";
          let n, r;
          for (let t = 0; t < e.length; ++t) {
            const i = e[t];
            l(i, "path"),
              i.length > 0 && (void 0 === n ? (n = r = i) : (n += `\\${i}`));
          }
          if (void 0 === n) return ".";
          let i = !0,
            o = 0;
          if ("string" == typeof r && u(r.charCodeAt(0))) {
            ++o;
            const e = r.length;
            e > 1 &&
              u(r.charCodeAt(1)) &&
              (++o, e > 2 && (u(r.charCodeAt(2)) ? ++o : (i = !1)));
          }
          if (i) {
            for (; o < n.length && u(n.charCodeAt(o)); ) o++;
            o >= 2 && (n = `\\${n.slice(o)}`);
          }
          return t.win32.normalize(n);
        },
        relative(e, n) {
          if ((l(e, "from"), l(n, "to"), e === n)) return "";
          const r = t.win32.resolve(e),
            i = t.win32.resolve(n);
          if (r === i || (e = r.toLowerCase()) === (n = i.toLowerCase()))
            return "";
          let s = 0;
          for (; s < e.length && e.charCodeAt(s) === o; ) s++;
          let a = e.length;
          for (; a - 1 > s && e.charCodeAt(a - 1) === o; ) a--;
          const u = a - s;
          let c = 0;
          for (; c < n.length && n.charCodeAt(c) === o; ) c++;
          let h = n.length;
          for (; h - 1 > c && n.charCodeAt(h - 1) === o; ) h--;
          const d = h - c,
            f = u < d ? u : d;
          let g = -1,
            m = 0;
          for (; m < f; m++) {
            const t = e.charCodeAt(s + m);
            if (t !== n.charCodeAt(c + m)) break;
            t === o && (g = m);
          }
          if (m !== f) {
            if (-1 === g) return i;
          } else {
            if (d > f) {
              if (n.charCodeAt(c + m) === o) return i.slice(c + m + 1);
              if (2 === m) return i.slice(c + m);
            }
            u > f && (e.charCodeAt(s + m) === o ? (g = m) : 2 === m && (g = 3)),
              -1 === g && (g = 0);
          }
          let p = "";
          for (m = s + g + 1; m <= a; ++m)
            (m === a || e.charCodeAt(m) === o) &&
              (p += 0 === p.length ? ".." : "\\..");
          return (
            (c += g),
            p.length > 0
              ? `${p}${i.slice(c, h)}`
              : (i.charCodeAt(c) === o && ++c, i.slice(c, h))
          );
        },
        toNamespacedPath(e) {
          if ("string" != typeof e) return e;
          if (0 === e.length) return "";
          const n = t.win32.resolve(e);
          if (n.length <= 2) return e;
          if (n.charCodeAt(0) === o) {
            if (n.charCodeAt(1) === o) {
              const e = n.charCodeAt(2);
              if (63 !== e && e !== r) return `\\\\?\\UNC\\${n.slice(2)}`;
            }
          } else if (
            h(n.charCodeAt(0)) &&
            n.charCodeAt(1) === s &&
            n.charCodeAt(2) === o
          )
            return `\\\\?\\${n}`;
          return e;
        },
        dirname(e) {
          l(e, "path");
          const t = e.length;
          if (0 === t) return ".";
          let n = -1,
            r = 0;
          const i = e.charCodeAt(0);
          if (1 === t) return u(i) ? e : ".";
          if (u(i)) {
            if (((n = r = 1), u(e.charCodeAt(1)))) {
              let i = 2,
                o = i;
              for (; i < t && !u(e.charCodeAt(i)); ) i++;
              if (i < t && i !== o) {
                for (o = i; i < t && u(e.charCodeAt(i)); ) i++;
                if (i < t && i !== o) {
                  for (o = i; i < t && !u(e.charCodeAt(i)); ) i++;
                  if (i === t) return e;
                  i !== o && (n = r = i + 1);
                }
              }
            }
          } else
            h(i) &&
              e.charCodeAt(1) === s &&
              ((n = t > 2 && u(e.charCodeAt(2)) ? 3 : 2), (r = n));
          let o = -1,
            a = !0;
          for (let s = t - 1; s >= r; --s)
            if (u(e.charCodeAt(s))) {
              if (!a) {
                o = s;
                break;
              }
            } else a = !1;
          if (-1 === o) {
            if (-1 === n) return ".";
            o = n;
          }
          return e.slice(0, o);
        },
        basename(e, t) {
          void 0 !== t && l(t, "ext"), l(e, "path");
          let n,
            r = 0,
            i = -1,
            o = !0;
          if (
            (e.length >= 2 &&
              h(e.charCodeAt(0)) &&
              e.charCodeAt(1) === s &&
              (r = 2),
            void 0 !== t && t.length > 0 && t.length <= e.length)
          ) {
            if (t === e) return "";
            let s = t.length - 1,
              a = -1;
            for (n = e.length - 1; n >= r; --n) {
              const l = e.charCodeAt(n);
              if (u(l)) {
                if (!o) {
                  r = n + 1;
                  break;
                }
              } else
                -1 === a && ((o = !1), (a = n + 1)),
                  s >= 0 &&
                    (l === t.charCodeAt(s)
                      ? -1 == --s && (i = n)
                      : ((s = -1), (i = a)));
            }
            return (
              r === i ? (i = a) : -1 === i && (i = e.length), e.slice(r, i)
            );
          }
          for (n = e.length - 1; n >= r; --n)
            if (u(e.charCodeAt(n))) {
              if (!o) {
                r = n + 1;
                break;
              }
            } else -1 === i && ((o = !1), (i = n + 1));
          return -1 === i ? "" : e.slice(r, i);
        },
        extname(e) {
          l(e, "path");
          let t = 0,
            n = -1,
            i = 0,
            o = -1,
            a = !0,
            c = 0;
          e.length >= 2 &&
            e.charCodeAt(1) === s &&
            h(e.charCodeAt(0)) &&
            (t = i = 2);
          for (let s = e.length - 1; s >= t; --s) {
            const t = e.charCodeAt(s);
            if (u(t)) {
              if (!a) {
                i = s + 1;
                break;
              }
            } else
              -1 === o && ((a = !1), (o = s + 1)),
                t === r
                  ? -1 === n
                    ? (n = s)
                    : 1 !== c && (c = 1)
                  : -1 !== n && (c = -1);
          }
          return -1 === n ||
            -1 === o ||
            0 === c ||
            (1 === c && n === o - 1 && n === i + 1)
            ? ""
            : e.slice(n, o);
        },
        format: f.bind(null, "\\"),
        parse(e) {
          l(e, "path");
          const t = { root: "", dir: "", base: "", ext: "", name: "" };
          if (0 === e.length) return t;
          const n = e.length;
          let i = 0,
            o = e.charCodeAt(0);
          if (1 === n)
            return u(o)
              ? ((t.root = t.dir = e), t)
              : ((t.base = t.name = e), t);
          if (u(o)) {
            if (((i = 1), u(e.charCodeAt(1)))) {
              let t = 2,
                r = t;
              for (; t < n && !u(e.charCodeAt(t)); ) t++;
              if (t < n && t !== r) {
                for (r = t; t < n && u(e.charCodeAt(t)); ) t++;
                if (t < n && t !== r) {
                  for (r = t; t < n && !u(e.charCodeAt(t)); ) t++;
                  t === n ? (i = t) : t !== r && (i = t + 1);
                }
              }
            }
          } else if (h(o) && e.charCodeAt(1) === s) {
            if (n <= 2) return (t.root = t.dir = e), t;
            if (((i = 2), u(e.charCodeAt(2)))) {
              if (3 === n) return (t.root = t.dir = e), t;
              i = 3;
            }
          }
          i > 0 && (t.root = e.slice(0, i));
          let a = -1,
            c = i,
            d = -1,
            f = !0,
            g = e.length - 1,
            m = 0;
          for (; g >= i; --g)
            if (((o = e.charCodeAt(g)), u(o))) {
              if (!f) {
                c = g + 1;
                break;
              }
            } else
              -1 === d && ((f = !1), (d = g + 1)),
                o === r
                  ? -1 === a
                    ? (a = g)
                    : 1 !== m && (m = 1)
                  : -1 !== a && (m = -1);
          return (
            -1 !== d &&
              (-1 === a || 0 === m || (1 === m && a === d - 1 && a === c + 1)
                ? (t.base = t.name = e.slice(c, d))
                : ((t.name = e.slice(c, a)),
                  (t.base = e.slice(c, d)),
                  (t.ext = e.slice(a, d)))),
            (t.dir = c > 0 && c !== i ? e.slice(0, c - 1) : t.root),
            t
          );
        },
        sep: "\\",
        delimiter: ";",
        win32: null,
        posix: null,
      }),
        (t.posix = {
          resolve(...e) {
            let t = "",
              r = !1;
            for (let o = e.length - 1; o >= -1 && !r; o--) {
              const s = o >= 0 ? e[o] : n.cwd();
              l(s, "path"),
                0 !== s.length &&
                  ((t = `${s}/${t}`), (r = s.charCodeAt(0) === i));
            }
            return (t = d(t, !r, "/", c)), r ? `/${t}` : t.length > 0 ? t : ".";
          },
          normalize(e) {
            if ((l(e, "path"), 0 === e.length)) return ".";
            const t = e.charCodeAt(0) === i,
              n = e.charCodeAt(e.length - 1) === i;
            return 0 === (e = d(e, !t, "/", c)).length
              ? t
                ? "/"
                : n
                ? "./"
                : "."
              : (n && (e += "/"), t ? `/${e}` : e);
          },
          isAbsolute: (e) => (
            l(e, "path"), e.length > 0 && e.charCodeAt(0) === i
          ),
          join(...e) {
            if (0 === e.length) return ".";
            let n;
            for (let t = 0; t < e.length; ++t) {
              const r = e[t];
              l(r, "path"),
                r.length > 0 && (void 0 === n ? (n = r) : (n += `/${r}`));
            }
            return void 0 === n ? "." : t.posix.normalize(n);
          },
          relative(e, n) {
            if (
              (l(e, "from"),
              l(n, "to"),
              e === n || (e = t.posix.resolve(e)) === (n = t.posix.resolve(n)))
            )
              return "";
            const r = e.length,
              o = r - 1,
              s = n.length - 1,
              a = o < s ? o : s;
            let u = -1,
              c = 0;
            for (; c < a; c++) {
              const t = e.charCodeAt(1 + c);
              if (t !== n.charCodeAt(1 + c)) break;
              t === i && (u = c);
            }
            if (c === a)
              if (s > a) {
                if (n.charCodeAt(1 + c) === i) return n.slice(1 + c + 1);
                if (0 === c) return n.slice(1 + c);
              } else
                o > a &&
                  (e.charCodeAt(1 + c) === i ? (u = c) : 0 === c && (u = 0));
            let h = "";
            for (c = 1 + u + 1; c <= r; ++c)
              (c === r || e.charCodeAt(c) === i) &&
                (h += 0 === h.length ? ".." : "/..");
            return `${h}${n.slice(1 + u)}`;
          },
          toNamespacedPath: (e) => e,
          dirname(e) {
            if ((l(e, "path"), 0 === e.length)) return ".";
            const t = e.charCodeAt(0) === i;
            let n = -1,
              r = !0;
            for (let o = e.length - 1; o >= 1; --o)
              if (e.charCodeAt(o) === i) {
                if (!r) {
                  n = o;
                  break;
                }
              } else r = !1;
            return -1 === n
              ? t
                ? "/"
                : "."
              : t && 1 === n
              ? "//"
              : e.slice(0, n);
          },
          basename(e, t) {
            void 0 !== t && l(t, "ext"), l(e, "path");
            let n,
              r = 0,
              o = -1,
              s = !0;
            if (void 0 !== t && t.length > 0 && t.length <= e.length) {
              if (t === e) return "";
              let a = t.length - 1,
                l = -1;
              for (n = e.length - 1; n >= 0; --n) {
                const u = e.charCodeAt(n);
                if (u === i) {
                  if (!s) {
                    r = n + 1;
                    break;
                  }
                } else
                  -1 === l && ((s = !1), (l = n + 1)),
                    a >= 0 &&
                      (u === t.charCodeAt(a)
                        ? -1 == --a && (o = n)
                        : ((a = -1), (o = l)));
              }
              return (
                r === o ? (o = l) : -1 === o && (o = e.length), e.slice(r, o)
              );
            }
            for (n = e.length - 1; n >= 0; --n)
              if (e.charCodeAt(n) === i) {
                if (!s) {
                  r = n + 1;
                  break;
                }
              } else -1 === o && ((s = !1), (o = n + 1));
            return -1 === o ? "" : e.slice(r, o);
          },
          extname(e) {
            l(e, "path");
            let t = -1,
              n = 0,
              o = -1,
              s = !0,
              a = 0;
            for (let l = e.length - 1; l >= 0; --l) {
              const u = e.charCodeAt(l);
              if (u !== i)
                -1 === o && ((s = !1), (o = l + 1)),
                  u === r
                    ? -1 === t
                      ? (t = l)
                      : 1 !== a && (a = 1)
                    : -1 !== t && (a = -1);
              else if (!s) {
                n = l + 1;
                break;
              }
            }
            return -1 === t ||
              -1 === o ||
              0 === a ||
              (1 === a && t === o - 1 && t === n + 1)
              ? ""
              : e.slice(t, o);
          },
          format: f.bind(null, "/"),
          parse(e) {
            l(e, "path");
            const t = { root: "", dir: "", base: "", ext: "", name: "" };
            if (0 === e.length) return t;
            const n = e.charCodeAt(0) === i;
            let o;
            n ? ((t.root = "/"), (o = 1)) : (o = 0);
            let s = -1,
              a = 0,
              u = -1,
              c = !0,
              h = e.length - 1,
              d = 0;
            for (; h >= o; --h) {
              const t = e.charCodeAt(h);
              if (t !== i)
                -1 === u && ((c = !1), (u = h + 1)),
                  t === r
                    ? -1 === s
                      ? (s = h)
                      : 1 !== d && (d = 1)
                    : -1 !== s && (d = -1);
              else if (!c) {
                a = h + 1;
                break;
              }
            }
            if (-1 !== u) {
              const r = 0 === a && n ? 1 : a;
              -1 === s || 0 === d || (1 === d && s === u - 1 && s === a + 1)
                ? (t.base = t.name = e.slice(r, u))
                : ((t.name = e.slice(r, s)),
                  (t.base = e.slice(r, u)),
                  (t.ext = e.slice(s, u)));
            }
            return a > 0 ? (t.dir = e.slice(0, a - 1)) : n && (t.dir = "/"), t;
          },
          sep: "/",
          delimiter: ":",
          win32: null,
          posix: null,
        }),
        (t.posix.win32 = t.win32.win32 = t.win32),
        (t.posix.posix = t.win32.posix = t.posix),
        (t.normalize =
          "win32" === n.platform ? t.win32.normalize : t.posix.normalize),
        (t.resolve =
          "win32" === n.platform ? t.win32.resolve : t.posix.resolve),
        (t.relative =
          "win32" === n.platform ? t.win32.relative : t.posix.relative),
        (t.dirname =
          "win32" === n.platform ? t.win32.dirname : t.posix.dirname),
        (t.basename =
          "win32" === n.platform ? t.win32.basename : t.posix.basename),
        (t.extname =
          "win32" === n.platform ? t.win32.extname : t.posix.extname),
        (t.sep = "win32" === n.platform ? t.win32.sep : t.posix.sep);
    }),
    e(n[12], r([0, 1, 3]), function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.StopWatch = void 0);
      const r =
        n.globals.performance && "function" == typeof n.globals.performance.now;
      class i {
        constructor(e) {
          (this._highResolution = r && e),
            (this._startTime = this._now()),
            (this._stopTime = -1);
        }
        static create(e = !0) {
          return new i(e);
        }
        stop() {
          this._stopTime = this._now();
        }
        elapsed() {
          return -1 !== this._stopTime
            ? this._stopTime - this._startTime
            : this._now() - this._startTime;
        }
        _now() {
          return this._highResolution
            ? n.globals.performance.now()
            : Date.now();
        }
      }
      t.StopWatch = i;
    }),
    e(n[4], r([0, 1, 10, 7, 26, 12]), function (e, t, n, r, i, o) {
      "use strict";
      var s;
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Relay =
          t.EventBufferer =
          t.DebounceEmitter =
          t.PauseableEmitter =
          t.Emitter =
          t.Event =
            void 0),
        (function (e) {
          function t(e) {
            return (t, n = null, r) => {
              let i,
                o = !1;
              return (
                (i = e(
                  (e) => {
                    if (!o) return i ? i.dispose() : (o = !0), t.call(n, e);
                  },
                  null,
                  r
                )),
                o && i.dispose(),
                i
              );
            };
          }
          function n(e, t) {
            return a((n, r = null, i) => e((e) => n.call(r, t(e)), null, i));
          }
          function i(e, t) {
            return a((n, r = null, i) =>
              e(
                (e) => {
                  t(e), n.call(r, e);
                },
                null,
                i
              )
            );
          }
          function o(e, t) {
            return a((n, r = null, i) =>
              e((e) => t(e) && n.call(r, e), null, i)
            );
          }
          function s(e, t, r) {
            let i = r;
            return n(e, (e) => ((i = t(i, e)), i));
          }
          function a(e) {
            let t;
            const n = new l({
              onFirstListenerAdd() {
                t = e(n.fire, n);
              },
              onLastListenerRemove() {
                t.dispose();
              },
            });
            return n.event;
          }
          function u(e, t, n = 100, r = !1, i) {
            let o,
              s,
              a,
              u = 0;
            const c = new l({
              leakWarningThreshold: i,
              onFirstListenerAdd() {
                o = e((e) => {
                  u++,
                    (s = t(s, e)),
                    r && !a && (c.fire(s), (s = void 0)),
                    clearTimeout(a),
                    (a = setTimeout(() => {
                      const e = s;
                      (s = void 0),
                        (a = void 0),
                        (!r || u > 1) && c.fire(e),
                        (u = 0);
                    }, n));
                });
              },
              onLastListenerRemove() {
                o.dispose();
              },
            });
            return c.event;
          }
          function c(e, t = (e, t) => e === t) {
            let n,
              r = !0;
            return o(e, (e) => {
              const i = r || !t(e, n);
              return (r = !1), (n = e), i;
            });
          }
          (e.None = () => r.Disposable.None),
            (e.once = t),
            (e.map = n),
            (e.forEach = i),
            (e.filter = o),
            (e.signal = function (e) {
              return e;
            }),
            (e.any = function (...e) {
              return (t, n = null, i) =>
                (0, r.combinedDisposable)(
                  ...e.map((e) => e((e) => t.call(n, e), null, i))
                );
            }),
            (e.reduce = s),
            (e.debouncedListener = function (e, t, n, r = 100, i = !1) {
              let o,
                s,
                a = 0;
              return e((e) => {
                a++,
                  (o = n(o, e)),
                  i && !s && (t(o), (o = void 0)),
                  clearTimeout(s),
                  (s = setTimeout(() => {
                    const e = o;
                    (o = void 0), (s = void 0), (!i || a > 1) && t(e), (a = 0);
                  }, r));
              });
            }),
            (e.debounce = u),
            (e.latch = c),
            (e.split = function (t, n) {
              return [e.filter(t, n), e.filter(t, (e) => !n(e))];
            }),
            (e.buffer = function (e, t = !1, n = []) {
              let r = n.slice(),
                i = e((e) => {
                  r ? r.push(e) : s.fire(e);
                });
              const o = () => {
                  r && r.forEach((e) => s.fire(e)), (r = null);
                },
                s = new l({
                  onFirstListenerAdd() {
                    i || (i = e((e) => s.fire(e)));
                  },
                  onFirstListenerDidAdd() {
                    r && (t ? setTimeout(o) : o());
                  },
                  onLastListenerRemove() {
                    i && i.dispose(), (i = null);
                  },
                });
              return s.event;
            });
          class h {
            constructor(e) {
              this.event = e;
            }
            map(e) {
              return new h(n(this.event, e));
            }
            forEach(e) {
              return new h(i(this.event, e));
            }
            filter(e) {
              return new h(o(this.event, e));
            }
            reduce(e, t) {
              return new h(s(this.event, e, t));
            }
            latch() {
              return new h(c(this.event));
            }
            debounce(e, t = 100, n = !1, r) {
              return new h(u(this.event, e, t, n, r));
            }
            on(e, t, n) {
              return this.event(e, t, n);
            }
            once(e, n, r) {
              return t(this.event)(e, n, r);
            }
          }
          (e.chain = function (e) {
            return new h(e);
          }),
            (e.fromNodeEventEmitter = function (e, t, n = (e) => e) {
              const r = (...e) => i.fire(n(...e)),
                i = new l({
                  onFirstListenerAdd: () => e.on(t, r),
                  onLastListenerRemove: () => e.removeListener(t, r),
                });
              return i.event;
            }),
            (e.fromDOMEventEmitter = function (e, t, n = (e) => e) {
              const r = (...e) => i.fire(n(...e)),
                i = new l({
                  onFirstListenerAdd: () => e.addEventListener(t, r),
                  onLastListenerRemove: () => e.removeEventListener(t, r),
                });
              return i.event;
            }),
            (e.toPromise = function (e) {
              return new Promise((n) => t(e)(n));
            }),
            (e.runAndSubscribe = function (e, t) {
              return t(void 0), e((e) => t(e));
            }),
            (e.runAndSubscribeWithStore = function (e, t) {
              let n = null;
              function i(e) {
                null == n || n.dispose(),
                  (n = new r.DisposableStore()),
                  t(e, n);
              }
              i(void 0);
              const o = e((e) => i(e));
              return (0, r.toDisposable)(() => {
                o.dispose(), null == n || n.dispose();
              });
            });
        })((s = t.Event || (t.Event = {})));
      class a {
        constructor(e) {
          (this._listenerCount = 0),
            (this._invocationCount = 0),
            (this._elapsedOverall = 0),
            (this._name = `${e}_${a._idPool++}`);
        }
        start(e) {
          (this._stopWatch = new o.StopWatch(!0)), (this._listenerCount = e);
        }
        stop() {
          if (this._stopWatch) {
            const e = this._stopWatch.elapsed();
            (this._elapsedOverall += e),
              (this._invocationCount += 1),
              console.info(
                `did FIRE ${this._name}: elapsed_ms: ${e.toFixed(
                  5
                )}, listener: ${
                  this._listenerCount
                } (elapsed_overall: ${this._elapsedOverall.toFixed(
                  2
                )}, invocations: ${this._invocationCount})`
              ),
              (this._stopWatch = void 0);
          }
        }
      }
      a._idPool = 0;
      class l {
        constructor(e) {
          var t;
          (this._disposed = !1),
            (this._options = e),
            (this._leakageMon = void 0),
            (this._perfMon = (
              null === (t = this._options) || void 0 === t
                ? void 0
                : t._profName
            )
              ? new a(this._options._profName)
              : void 0);
        }
        get event() {
          return (
            this._event ||
              (this._event = (e, t, n) => {
                var o;
                this._listeners || (this._listeners = new i.LinkedList());
                const s = this._listeners.isEmpty();
                s &&
                  this._options &&
                  this._options.onFirstListenerAdd &&
                  this._options.onFirstListenerAdd(this);
                const a = this._listeners.push(t ? [e, t] : e);
                s &&
                  this._options &&
                  this._options.onFirstListenerDidAdd &&
                  this._options.onFirstListenerDidAdd(this),
                  this._options &&
                    this._options.onListenerDidAdd &&
                    this._options.onListenerDidAdd(this, e, t);
                const l =
                    null === (o = this._leakageMon) || void 0 === o
                      ? void 0
                      : o.check(this._listeners.size),
                  u = (0, r.toDisposable)(() => {
                    l && l(),
                      this._disposed ||
                        (a(),
                        this._options &&
                          this._options.onLastListenerRemove &&
                          ((this._listeners && !this._listeners.isEmpty()) ||
                            this._options.onLastListenerRemove(this)));
                  });
                return (
                  n instanceof r.DisposableStore
                    ? n.add(u)
                    : Array.isArray(n) && n.push(u),
                  u
                );
              }),
            this._event
          );
        }
        fire(e) {
          var t, r;
          if (this._listeners) {
            this._deliveryQueue || (this._deliveryQueue = new i.LinkedList());
            for (let t of this._listeners) this._deliveryQueue.push([t, e]);
            for (
              null === (t = this._perfMon) ||
              void 0 === t ||
              t.start(this._deliveryQueue.size);
              this._deliveryQueue.size > 0;

            ) {
              const [e, t] = this._deliveryQueue.shift();
              try {
                "function" == typeof e ? e.call(void 0, t) : e[0].call(e[1], t);
              } catch (o) {
                (0, n.onUnexpectedError)(o);
              }
            }
            null === (r = this._perfMon) || void 0 === r || r.stop();
          }
        }
        dispose() {
          var e, t, n, r, i;
          this._disposed ||
            ((this._disposed = !0),
            null === (e = this._listeners) || void 0 === e || e.clear(),
            null === (t = this._deliveryQueue) || void 0 === t || t.clear(),
            null ===
              (r =
                null === (n = this._options) || void 0 === n
                  ? void 0
                  : n.onLastListenerRemove) ||
              void 0 === r ||
              r.call(n),
            null === (i = this._leakageMon) || void 0 === i || i.dispose());
        }
      }
      t.Emitter = l;
      class u extends l {
        constructor(e) {
          super(e),
            (this._isPaused = 0),
            (this._eventQueue = new i.LinkedList()),
            (this._mergeFn = null == e ? void 0 : e.merge);
        }
        pause() {
          this._isPaused++;
        }
        resume() {
          if (0 !== this._isPaused && 0 == --this._isPaused)
            if (this._mergeFn) {
              const e = Array.from(this._eventQueue);
              this._eventQueue.clear(), super.fire(this._mergeFn(e));
            } else
              for (; !this._isPaused && 0 !== this._eventQueue.size; )
                super.fire(this._eventQueue.shift());
        }
        fire(e) {
          this._listeners &&
            (0 !== this._isPaused ? this._eventQueue.push(e) : super.fire(e));
        }
      }
      t.PauseableEmitter = u;
      t.DebounceEmitter = class extends u {
        constructor(e) {
          var t;
          super(e),
            (this._delay = null !== (t = e.delay) && void 0 !== t ? t : 100);
        }
        fire(e) {
          this._handle ||
            (this.pause(),
            (this._handle = setTimeout(() => {
              (this._handle = void 0), this.resume();
            }, this._delay))),
            super.fire(e);
        }
      };
      t.EventBufferer = class {
        constructor() {
          this.buffers = [];
        }
        wrapEvent(e) {
          return (t, n, r) =>
            e(
              (e) => {
                const r = this.buffers[this.buffers.length - 1];
                r ? r.push(() => t.call(n, e)) : t.call(n, e);
              },
              void 0,
              r
            );
        }
        bufferEvents(e) {
          const t = [];
          this.buffers.push(t);
          const n = e();
          return this.buffers.pop(), t.forEach((e) => e()), n;
        }
      };
      t.Relay = class {
        constructor() {
          (this.listening = !1),
            (this.inputEvent = s.None),
            (this.inputEventListener = r.Disposable.None),
            (this.emitter = new l({
              onFirstListenerDidAdd: () => {
                (this.listening = !0),
                  (this.inputEventListener = this.inputEvent(
                    this.emitter.fire,
                    this.emitter
                  ));
              },
              onLastListenerRemove: () => {
                (this.listening = !1), this.inputEventListener.dispose();
              },
            })),
            (this.event = this.emitter.event);
        }
        set input(e) {
          (this.inputEvent = e),
            this.listening &&
              (this.inputEventListener.dispose(),
              (this.inputEventListener = e(this.emitter.fire, this.emitter)));
        }
        dispose() {
          this.inputEventListener.dispose(), this.emitter.dispose();
        }
      };
    }),
    e(n[13], r([0, 1, 4]), function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.CancellationTokenSource = t.CancellationToken = void 0);
      const r = Object.freeze(function (e, t) {
        const n = setTimeout(e.bind(t), 0);
        return {
          dispose() {
            clearTimeout(n);
          },
        };
      });
      var i, o;
      ((o = i =
        t.CancellationToken || (t.CancellationToken = {})).isCancellationToken =
        function (e) {
          return (
            e === o.None ||
            e === o.Cancelled ||
            e instanceof s ||
            (!(!e || "object" != typeof e) &&
              "boolean" == typeof e.isCancellationRequested &&
              "function" == typeof e.onCancellationRequested)
          );
        }),
        (o.None = Object.freeze({
          isCancellationRequested: !1,
          onCancellationRequested: n.Event.None,
        })),
        (o.Cancelled = Object.freeze({
          isCancellationRequested: !0,
          onCancellationRequested: r,
        }));
      class s {
        constructor() {
          (this._isCancelled = !1), (this._emitter = null);
        }
        cancel() {
          this._isCancelled ||
            ((this._isCancelled = !0),
            this._emitter && (this._emitter.fire(void 0), this.dispose()));
        }
        get isCancellationRequested() {
          return this._isCancelled;
        }
        get onCancellationRequested() {
          return this._isCancelled
            ? r
            : (this._emitter || (this._emitter = new n.Emitter()),
              this._emitter.event);
        }
        dispose() {
          this._emitter && (this._emitter.dispose(), (this._emitter = null));
        }
      }
      t.CancellationTokenSource = class {
        constructor(e) {
          (this._token = void 0),
            (this._parentListener = void 0),
            (this._parentListener =
              e && e.onCancellationRequested(this.cancel, this));
        }
        get token() {
          return this._token || (this._token = new s()), this._token;
        }
        cancel() {
          this._token
            ? this._token instanceof s && this._token.cancel()
            : (this._token = i.Cancelled);
        }
        dispose(e = !1) {
          e && this.cancel(),
            this._parentListener && this._parentListener.dispose(),
            this._token
              ? this._token instanceof s && this._token.dispose()
              : (this._token = i.None);
        }
      };
    });
  var s =
      (this && this.__awaiter) ||
      function (e, t, n, r) {
        return new (n || (n = Promise))(function (i, o) {
          function s(e) {
            try {
              l(r.next(e));
            } catch (t) {
              o(t);
            }
          }
          function a(e) {
            try {
              l(r.throw(e));
            } catch (t) {
              o(t);
            }
          }
          function l(e) {
            e.done
              ? i(e.value)
              : (function (e) {
                  return e instanceof n
                    ? e
                    : new n(function (t) {
                        t(e);
                      });
                })(e.value).then(s, a);
          }
          l((r = r.apply(e, t || [])).next());
        });
      },
    a =
      (this && this.__asyncValues) ||
      function (e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var t,
          n = e[Symbol.asyncIterator];
        return n
          ? n.call(e)
          : ((e =
              "function" == typeof __values
                ? __values(e)
                : e[Symbol.iterator]()),
            (t = {}),
            r("next"),
            r("throw"),
            r("return"),
            (t[Symbol.asyncIterator] = function () {
              return this;
            }),
            t);
        function r(n) {
          t[n] =
            e[n] &&
            function (t) {
              return new Promise(function (r, i) {
                (function (e, t, n, r) {
                  Promise.resolve(r).then(function (t) {
                    e({ value: t, done: n });
                  }, t);
                })(r, i, (t = e[n](t)).done, t.value);
              });
            };
        }
      };
  e(n[28], r([0, 1, 13, 10, 4, 7, 3]), function (e, t, n, r, i, o, l) {
    "use strict";
    function u(e) {
      const t = new n.CancellationTokenSource(),
        i = e(t.token),
        o = new Promise((e, n) => {
          const o = t.token.onCancellationRequested(() => {
            o.dispose(), t.dispose(), n(new r.CancellationError());
          });
          Promise.resolve(i).then(
            (n) => {
              o.dispose(), t.dispose(), e(n);
            },
            (e) => {
              o.dispose(), t.dispose(), n(e);
            }
          );
        });
      return new (class {
        cancel() {
          t.cancel();
        }
        then(e, t) {
          return o.then(e, t);
        }
        catch(e) {
          return this.then(void 0, e);
        }
        finally(e) {
          return o.finally(e);
        }
      })();
    }
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.createCancelableAsyncIterable =
        t.CancelableAsyncIterableObject =
        t.AsyncIterableObject =
        t.Promises =
        t.DeferredPromise =
        t.IdleValue =
        t.runWhenIdle =
        t.RunOnceScheduler =
        t.IntervalTimer =
        t.TimeoutTimer =
        t.first =
        t.disposableTimeout =
        t.timeout =
        t.ThrottledDelayer =
        t.Delayer =
        t.MicrotaskDelay =
        t.Throttler =
        t.raceCancellation =
        t.createCancelablePromise =
        t.isThenable =
          void 0),
      (t.isThenable = function (e) {
        return !!e && "function" == typeof e.then;
      }),
      (t.createCancelablePromise = u),
      (t.raceCancellation = function (e, t, n) {
        return new Promise((r, i) => {
          const o = t.onCancellationRequested(() => {
            o.dispose(), r(n);
          });
          e.then(r, i).finally(() => o.dispose());
        });
      });
    class c {
      constructor() {
        (this.activePromise = null),
          (this.queuedPromise = null),
          (this.queuedPromiseFactory = null);
      }
      queue(e) {
        if (this.activePromise) {
          if (((this.queuedPromiseFactory = e), !this.queuedPromise)) {
            const e = () => {
              this.queuedPromise = null;
              const e = this.queue(this.queuedPromiseFactory);
              return (this.queuedPromiseFactory = null), e;
            };
            this.queuedPromise = new Promise((t) => {
              this.activePromise.then(e, e).then(t);
            });
          }
          return new Promise((e, t) => {
            this.queuedPromise.then(e, t);
          });
        }
        return (
          (this.activePromise = e()),
          new Promise((e, t) => {
            this.activePromise.then(
              (t) => {
                (this.activePromise = null), e(t);
              },
              (e) => {
                (this.activePromise = null), t(e);
              }
            );
          })
        );
      }
    }
    t.Throttler = c;
    t.MicrotaskDelay = Symbol("MicrotaskDelay");
    class h {
      constructor(e) {
        (this.defaultDelay = e),
          (this.deferred = null),
          (this.completionPromise = null),
          (this.doResolve = null),
          (this.doReject = null),
          (this.task = null);
      }
      trigger(e, n = this.defaultDelay) {
        (this.task = e),
          this.cancelTimeout(),
          this.completionPromise ||
            (this.completionPromise = new Promise((e, t) => {
              (this.doResolve = e), (this.doReject = t);
            }).then(() => {
              if (
                ((this.completionPromise = null),
                (this.doResolve = null),
                this.task)
              ) {
                const e = this.task;
                return (this.task = null), e();
              }
            }));
        const r = () => {
          var e;
          (this.deferred = null),
            null === (e = this.doResolve) || void 0 === e || e.call(this, null);
        };
        return (
          (this.deferred =
            n === t.MicrotaskDelay
              ? ((e) => {
                  let t = !0;
                  return (
                    queueMicrotask(() => {
                      t && ((t = !1), e());
                    }),
                    {
                      isTriggered: () => t,
                      dispose: () => {
                        t = !1;
                      },
                    }
                  );
                })(r)
              : ((e, t) => {
                  let n = !0;
                  const r = setTimeout(() => {
                    (n = !1), t();
                  }, e);
                  return {
                    isTriggered: () => n,
                    dispose: () => {
                      clearTimeout(r), (n = !1);
                    },
                  };
                })(n, r)),
          this.completionPromise
        );
      }
      isTriggered() {
        var e;
        return !!(null === (e = this.deferred) || void 0 === e
          ? void 0
          : e.isTriggered());
      }
      cancel() {
        this.cancelTimeout(),
          this.completionPromise &&
            (this.doReject && this.doReject(new r.CancellationError()),
            (this.completionPromise = null));
      }
      cancelTimeout() {
        var e;
        null === (e = this.deferred) || void 0 === e || e.dispose(),
          (this.deferred = null);
      }
      dispose() {
        this.cancel();
      }
    }
    t.Delayer = h;
    (t.ThrottledDelayer = class {
      constructor(e) {
        (this.delayer = new h(e)), (this.throttler = new c());
      }
      trigger(e, t) {
        return this.delayer.trigger(() => this.throttler.queue(e), t);
      }
      dispose() {
        this.delayer.dispose();
      }
    }),
      (t.timeout = function e(t, n) {
        return n
          ? new Promise((e, i) => {
              const o = setTimeout(() => {
                  s.dispose(), e();
                }, t),
                s = n.onCancellationRequested(() => {
                  clearTimeout(o), s.dispose(), i(new r.CancellationError());
                });
            })
          : u((n) => e(t, n));
      }),
      (t.disposableTimeout = function (e, t = 0) {
        const n = setTimeout(e, t);
        return (0, o.toDisposable)(() => clearTimeout(n));
      }),
      (t.first = function (e, t = (e) => !!e, n = null) {
        let r = 0;
        const i = e.length,
          o = () => {
            if (r >= i) return Promise.resolve(n);
            const s = e[r++];
            return Promise.resolve(s()).then((e) =>
              t(e) ? Promise.resolve(e) : o()
            );
          };
        return o();
      });
    t.TimeoutTimer = class {
      constructor(e, t) {
        (this._token = -1),
          "function" == typeof e &&
            "number" == typeof t &&
            this.setIfNotSet(e, t);
      }
      dispose() {
        this.cancel();
      }
      cancel() {
        -1 !== this._token && (clearTimeout(this._token), (this._token = -1));
      }
      cancelAndSet(e, t) {
        this.cancel(),
          (this._token = setTimeout(() => {
            (this._token = -1), e();
          }, t));
      }
      setIfNotSet(e, t) {
        -1 === this._token &&
          (this._token = setTimeout(() => {
            (this._token = -1), e();
          }, t));
      }
    };
    t.IntervalTimer = class {
      constructor() {
        this._token = -1;
      }
      dispose() {
        this.cancel();
      }
      cancel() {
        -1 !== this._token && (clearInterval(this._token), (this._token = -1));
      }
      cancelAndSet(e, t) {
        this.cancel(),
          (this._token = setInterval(() => {
            e();
          }, t));
      }
    };
    (t.RunOnceScheduler = class {
      constructor(e, t) {
        (this.timeoutToken = -1),
          (this.runner = e),
          (this.timeout = t),
          (this.timeoutHandler = this.onTimeout.bind(this));
      }
      dispose() {
        this.cancel(), (this.runner = null);
      }
      cancel() {
        this.isScheduled() &&
          (clearTimeout(this.timeoutToken), (this.timeoutToken = -1));
      }
      schedule(e = this.timeout) {
        this.cancel(), (this.timeoutToken = setTimeout(this.timeoutHandler, e));
      }
      get delay() {
        return this.timeout;
      }
      set delay(e) {
        this.timeout = e;
      }
      isScheduled() {
        return -1 !== this.timeoutToken;
      }
      onTimeout() {
        (this.timeoutToken = -1), this.runner && this.doRun();
      }
      doRun() {
        this.runner && this.runner();
      }
    }),
      "function" != typeof requestIdleCallback ||
      "function" != typeof cancelIdleCallback
        ? (t.runWhenIdle = (e) => {
            (0, l.setTimeout0)(() => {
              if (t) return;
              const n = Date.now() + 15;
              e(
                Object.freeze({
                  didTimeout: !0,
                  timeRemaining: () => Math.max(0, n - Date.now()),
                })
              );
            });
            let t = !1;
            return {
              dispose() {
                t || (t = !0);
              },
            };
          })
        : (t.runWhenIdle = (e, t) => {
            const n = requestIdleCallback(
              e,
              "number" == typeof t ? { timeout: t } : void 0
            );
            let r = !1;
            return {
              dispose() {
                r || ((r = !0), cancelIdleCallback(n));
              },
            };
          });
    t.IdleValue = class {
      constructor(e) {
        (this._didRun = !1),
          (this._executor = () => {
            try {
              this._value = e();
            } catch (t) {
              this._error = t;
            } finally {
              this._didRun = !0;
            }
          }),
          (this._handle = (0, t.runWhenIdle)(() => this._executor()));
      }
      dispose() {
        this._handle.dispose();
      }
      get value() {
        if (
          (this._didRun || (this._handle.dispose(), this._executor()),
          this._error)
        )
          throw this._error;
        return this._value;
      }
      get isInitialized() {
        return this._didRun;
      }
    };
    var d;
    (t.DeferredPromise = class {
      constructor() {
        (this.rejected = !1),
          (this.resolved = !1),
          (this.p = new Promise((e, t) => {
            (this.completeCallback = e), (this.errorCallback = t);
          }));
      }
      get isRejected() {
        return this.rejected;
      }
      get isSettled() {
        return this.rejected || this.resolved;
      }
      complete(e) {
        return new Promise((t) => {
          this.completeCallback(e), (this.resolved = !0), t();
        });
      }
      cancel() {
        new Promise((e) => {
          this.errorCallback(new r.CancellationError()),
            (this.rejected = !0),
            e();
        });
      }
    }),
      ((d = t.Promises || (t.Promises = {})).settled = function (e) {
        return s(this, void 0, void 0, function* () {
          let t;
          const n = yield Promise.all(
            e.map((e) =>
              e.then(
                (e) => e,
                (e) => {
                  t || (t = e);
                }
              )
            )
          );
          if ("undefined" != typeof t) throw t;
          return n;
        });
      }),
      (d.withAsyncBody = function (e) {
        return new Promise((t, n) =>
          s(this, void 0, void 0, function* () {
            try {
              yield e(t, n);
            } catch (r) {
              n(r);
            }
          })
        );
      });
    class f {
      constructor(e) {
        (this._state = 0),
          (this._results = []),
          (this._error = null),
          (this._onStateChanged = new i.Emitter()),
          queueMicrotask(() =>
            s(this, void 0, void 0, function* () {
              const t = {
                emitOne: (e) => this.emitOne(e),
                emitMany: (e) => this.emitMany(e),
                reject: (e) => this.reject(e),
              };
              try {
                yield Promise.resolve(e(t)), this.resolve();
              } catch (n) {
                this.reject(n);
              } finally {
                (t.emitOne = void 0),
                  (t.emitMany = void 0),
                  (t.reject = void 0);
              }
            })
          );
      }
      static fromArray(e) {
        return new f((t) => {
          t.emitMany(e);
        });
      }
      static fromPromise(e) {
        return new f((t) =>
          s(this, void 0, void 0, function* () {
            t.emitMany(yield e);
          })
        );
      }
      static fromPromises(e) {
        return new f((t) =>
          s(this, void 0, void 0, function* () {
            yield Promise.all(
              e.map((e) =>
                s(this, void 0, void 0, function* () {
                  return t.emitOne(yield e);
                })
              )
            );
          })
        );
      }
      static merge(e) {
        return new f((t) =>
          s(this, void 0, void 0, function* () {
            yield Promise.all(
              e.map((e) => {
                var n, r;
                return s(this, void 0, void 0, function* () {
                  var i, o;
                  try {
                    for (n = a(e); !(r = yield n.next()).done; ) {
                      const e = r.value;
                      t.emitOne(e);
                    }
                  } catch (s) {
                    i = { error: s };
                  } finally {
                    try {
                      r && !r.done && (o = n.return) && (yield o.call(n));
                    } finally {
                      if (i) throw i.error;
                    }
                  }
                });
              })
            );
          })
        );
      }
      [Symbol.asyncIterator]() {
        let e = 0;
        return {
          next: () =>
            s(this, void 0, void 0, function* () {
              for (;;) {
                if (2 === this._state) throw this._error;
                if (e < this._results.length)
                  return { done: !1, value: this._results[e++] };
                if (1 === this._state) return { done: !0, value: void 0 };
                yield i.Event.toPromise(this._onStateChanged.event);
              }
            }),
        };
      }
      static map(e, t) {
        return new f((n) =>
          s(this, void 0, void 0, function* () {
            var r, i;
            try {
              for (var o, s = a(e); !(o = yield s.next()).done; ) {
                const e = o.value;
                n.emitOne(t(e));
              }
            } catch (l) {
              r = { error: l };
            } finally {
              try {
                o && !o.done && (i = s.return) && (yield i.call(s));
              } finally {
                if (r) throw r.error;
              }
            }
          })
        );
      }
      map(e) {
        return f.map(this, e);
      }
      static filter(e, t) {
        return new f((n) =>
          s(this, void 0, void 0, function* () {
            var r, i;
            try {
              for (var o, s = a(e); !(o = yield s.next()).done; ) {
                const e = o.value;
                t(e) && n.emitOne(e);
              }
            } catch (l) {
              r = { error: l };
            } finally {
              try {
                o && !o.done && (i = s.return) && (yield i.call(s));
              } finally {
                if (r) throw r.error;
              }
            }
          })
        );
      }
      filter(e) {
        return f.filter(this, e);
      }
      static coalesce(e) {
        return f.filter(e, (e) => !!e);
      }
      coalesce() {
        return f.coalesce(this);
      }
      static toPromise(e) {
        var t, n, r, i;
        return s(this, void 0, void 0, function* () {
          const o = [];
          try {
            for (t = a(e); !(n = yield t.next()).done; ) {
              const e = n.value;
              o.push(e);
            }
          } catch (s) {
            r = { error: s };
          } finally {
            try {
              n && !n.done && (i = t.return) && (yield i.call(t));
            } finally {
              if (r) throw r.error;
            }
          }
          return o;
        });
      }
      toPromise() {
        return f.toPromise(this);
      }
      emitOne(e) {
        0 === this._state &&
          (this._results.push(e), this._onStateChanged.fire());
      }
      emitMany(e) {
        0 === this._state &&
          ((this._results = this._results.concat(e)),
          this._onStateChanged.fire());
      }
      resolve() {
        0 === this._state && ((this._state = 1), this._onStateChanged.fire());
      }
      reject(e) {
        0 === this._state &&
          ((this._state = 2), (this._error = e), this._onStateChanged.fire());
      }
    }
    (t.AsyncIterableObject = f), (f.EMPTY = f.fromArray([]));
    class g extends f {
      constructor(e, t) {
        super(t), (this._source = e);
      }
      cancel() {
        this._source.cancel();
      }
    }
    (t.CancelableAsyncIterableObject = g),
      (t.createCancelableAsyncIterable = function (e) {
        const t = new n.CancellationTokenSource(),
          i = e(t.token);
        return new g(t, (e) =>
          s(this, void 0, void 0, function* () {
            var n, o;
            const s = t.token.onCancellationRequested(() => {
              s.dispose(), t.dispose(), e.reject(new r.CancellationError());
            });
            try {
              try {
                for (var l, u = a(i); !(l = yield u.next()).done; ) {
                  const n = l.value;
                  if (t.token.isCancellationRequested) return;
                  e.emitOne(n);
                }
              } catch (c) {
                n = { error: c };
              } finally {
                try {
                  l && !l.done && (o = u.return) && (yield o.call(u));
                } finally {
                  if (n) throw n.error;
                }
              }
              s.dispose(), t.dispose();
            } catch (c) {
              s.dispose(), t.dispose(), e.reject(c);
            }
          })
        );
      });
  }),
    e(n[2], r([0, 1, 19, 25]), function (e, t, n, r) {
      "use strict";
      var i;
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.InvisibleCharacters =
          t.AmbiguousCharacters =
          t.noBreakWhitespace =
          t.getLeftDeleteOffset =
          t.singleLetterHash =
          t.containsUppercaseCharacter =
          t.startsWithUTF8BOM =
          t.UTF8_BOM_CHARACTER =
          t.isEmojiImprecise =
          t.isFullWidthCharacter =
          t.containsUnusualLineTerminators =
          t.UNUSUAL_LINE_TERMINATORS =
          t.isBasicASCII =
          t.containsRTL =
          t.getCharContainingOffset =
          t.prevCharLength =
          t.nextCharLength =
          t.GraphemeIterator =
          t.CodePointIterator =
          t.getNextCodePoint =
          t.computeCodePoint =
          t.isLowSurrogate =
          t.isHighSurrogate =
          t.commonSuffixLength =
          t.commonPrefixLength =
          t.startsWithIgnoreCase =
          t.equalsIgnoreCase =
          t.isUpperAsciiLetter =
          t.isLowerAsciiLetter =
          t.compareSubstringIgnoreCase =
          t.compareIgnoreCase =
          t.compareSubstring =
          t.compare =
          t.lastNonWhitespaceIndex =
          t.getLeadingWhitespace =
          t.firstNonWhitespaceIndex =
          t.splitLines =
          t.regExpFlags =
          t.regExpLeadsToEndlessLoop =
          t.createRegExp =
          t.stripWildcards =
          t.convertSimple2RegExpPattern =
          t.rtrim =
          t.ltrim =
          t.trim =
          t.escapeRegExpCharacters =
          t.escape =
          t.format =
          t.isFalsyOrWhitespace =
            void 0),
        (t.isFalsyOrWhitespace = function (e) {
          return !e || "string" != typeof e || 0 === e.trim().length;
        });
      const o = /{(\d+)}/g;
      function s(e) {
        return e.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, "\\$&");
      }
      function a(e, t) {
        if (!e || !t) return e;
        const n = t.length;
        if (0 === n || 0 === e.length) return e;
        let r = 0;
        for (; e.indexOf(t, r) === r; ) r += n;
        return e.substring(r);
      }
      function l(e, t) {
        if (!e || !t) return e;
        const n = t.length,
          r = e.length;
        if (0 === n || 0 === r) return e;
        let i = r,
          o = -1;
        for (; (o = e.lastIndexOf(t, i - 1)), -1 !== o && o + n === i; ) {
          if (0 === o) return "";
          i = o;
        }
        return e.substring(0, i);
      }
      function u(e, t, n = 0, r = e.length, i = 0, o = t.length) {
        for (; n < r && i < o; n++, i++) {
          let r = e.charCodeAt(n),
            o = t.charCodeAt(i);
          if (r < o) return -1;
          if (r > o) return 1;
        }
        const s = r - n,
          a = o - i;
        return s < a ? -1 : s > a ? 1 : 0;
      }
      function c(e, t, n = 0, r = e.length, i = 0, o = t.length) {
        for (; n < r && i < o; n++, i++) {
          let s = e.charCodeAt(n),
            a = t.charCodeAt(i);
          if (s === a) continue;
          if (s >= 128 || a >= 128)
            return u(e.toLowerCase(), t.toLowerCase(), n, r, i, o);
          h(s) && (s -= 32), h(a) && (a -= 32);
          const l = s - a;
          if (0 !== l) return l;
        }
        const s = r - n,
          a = o - i;
        return s < a ? -1 : s > a ? 1 : 0;
      }
      function h(e) {
        return e >= 97 && e <= 122;
      }
      function d(e) {
        return 55296 <= e && e <= 56319;
      }
      function f(e) {
        return 56320 <= e && e <= 57343;
      }
      function g(e, t) {
        return t - 56320 + ((e - 55296) << 10) + 65536;
      }
      function m(e, t, n) {
        const r = e.charCodeAt(n);
        if (d(r) && n + 1 < t) {
          const t = e.charCodeAt(n + 1);
          if (f(t)) return g(r, t);
        }
        return r;
      }
      (t.format = function (e, ...t) {
        return 0 === t.length
          ? e
          : e.replace(o, function (e, n) {
              const r = parseInt(n, 10);
              return isNaN(r) || r < 0 || r >= t.length ? e : t[r];
            });
      }),
        (t.escape = function (e) {
          return e.replace(/[<>&]/g, function (e) {
            switch (e) {
              case "<":
                return "&lt;";
              case ">":
                return "&gt;";
              case "&":
                return "&amp;";
              default:
                return e;
            }
          });
        }),
        (t.escapeRegExpCharacters = s),
        (t.trim = function (e, t = " ") {
          return l(a(e, t), t);
        }),
        (t.ltrim = a),
        (t.rtrim = l),
        (t.convertSimple2RegExpPattern = function (e) {
          return e
            .replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&")
            .replace(/[\*]/g, ".*");
        }),
        (t.stripWildcards = function (e) {
          return e.replace(/\*/g, "");
        }),
        (t.createRegExp = function (e, t, n = {}) {
          if (!e) throw new Error("Cannot create regex from empty string");
          t || (e = s(e)),
            n.wholeWord &&
              (/\B/.test(e.charAt(0)) || (e = "\\b" + e),
              /\B/.test(e.charAt(e.length - 1)) || (e += "\\b"));
          let r = "";
          return (
            n.global && (r += "g"),
            n.matchCase || (r += "i"),
            n.multiline && (r += "m"),
            n.unicode && (r += "u"),
            new RegExp(e, r)
          );
        }),
        (t.regExpLeadsToEndlessLoop = function (e) {
          return (
            "^" !== e.source &&
            "^$" !== e.source &&
            "$" !== e.source &&
            "^\\s*$" !== e.source &&
            !(!e.exec("") || 0 !== e.lastIndex)
          );
        }),
        (t.regExpFlags = function (e) {
          return (
            (e.global ? "g" : "") +
            (e.ignoreCase ? "i" : "") +
            (e.multiline ? "m" : "") +
            (e.unicode ? "u" : "")
          );
        }),
        (t.splitLines = function (e) {
          return e.split(/\r\n|\r|\n/);
        }),
        (t.firstNonWhitespaceIndex = function (e) {
          for (let t = 0, n = e.length; t < n; t++) {
            const n = e.charCodeAt(t);
            if (32 !== n && 9 !== n) return t;
          }
          return -1;
        }),
        (t.getLeadingWhitespace = function (e, t = 0, n = e.length) {
          for (let r = t; r < n; r++) {
            const n = e.charCodeAt(r);
            if (32 !== n && 9 !== n) return e.substring(t, r);
          }
          return e.substring(t, n);
        }),
        (t.lastNonWhitespaceIndex = function (e, t = e.length - 1) {
          for (let n = t; n >= 0; n--) {
            const t = e.charCodeAt(n);
            if (32 !== t && 9 !== t) return n;
          }
          return -1;
        }),
        (t.compare = function (e, t) {
          return e < t ? -1 : e > t ? 1 : 0;
        }),
        (t.compareSubstring = u),
        (t.compareIgnoreCase = function (e, t) {
          return c(e, t, 0, e.length, 0, t.length);
        }),
        (t.compareSubstringIgnoreCase = c),
        (t.isLowerAsciiLetter = h),
        (t.isUpperAsciiLetter = function (e) {
          return e >= 65 && e <= 90;
        }),
        (t.equalsIgnoreCase = function (e, t) {
          return e.length === t.length && 0 === c(e, t);
        }),
        (t.startsWithIgnoreCase = function (e, t) {
          const n = t.length;
          return !(t.length > e.length) && 0 === c(e, t, 0, n);
        }),
        (t.commonPrefixLength = function (e, t) {
          let n,
            r = Math.min(e.length, t.length);
          for (n = 0; n < r; n++)
            if (e.charCodeAt(n) !== t.charCodeAt(n)) return n;
          return r;
        }),
        (t.commonSuffixLength = function (e, t) {
          let n,
            r = Math.min(e.length, t.length);
          const i = e.length - 1,
            o = t.length - 1;
          for (n = 0; n < r; n++)
            if (e.charCodeAt(i - n) !== t.charCodeAt(o - n)) return n;
          return r;
        }),
        (t.isHighSurrogate = d),
        (t.isLowSurrogate = f),
        (t.computeCodePoint = g),
        (t.getNextCodePoint = m);
      class p {
        constructor(e, t = 0) {
          (this._str = e), (this._len = e.length), (this._offset = t);
        }
        get offset() {
          return this._offset;
        }
        setOffset(e) {
          this._offset = e;
        }
        prevCodePoint() {
          const e = (function (e, t) {
            const n = e.charCodeAt(t - 1);
            if (f(n) && t > 1) {
              const r = e.charCodeAt(t - 2);
              if (d(r)) return g(r, n);
            }
            return n;
          })(this._str, this._offset);
          return (this._offset -= e >= 65536 ? 2 : 1), e;
        }
        nextCodePoint() {
          const e = m(this._str, this._len, this._offset);
          return (this._offset += e >= 65536 ? 2 : 1), e;
        }
        eol() {
          return this._offset >= this._len;
        }
      }
      t.CodePointIterator = p;
      class _ {
        constructor(e, t = 0) {
          this._iterator = new p(e, t);
        }
        get offset() {
          return this._iterator.offset;
        }
        nextGraphemeLength() {
          const e = E.getInstance(),
            t = this._iterator,
            n = t.offset;
          let r = e.getGraphemeBreakType(t.nextCodePoint());
          for (; !t.eol(); ) {
            const n = t.offset,
              i = e.getGraphemeBreakType(t.nextCodePoint());
            if (S(r, i)) {
              t.setOffset(n);
              break;
            }
            r = i;
          }
          return t.offset - n;
        }
        prevGraphemeLength() {
          const e = E.getInstance(),
            t = this._iterator,
            n = t.offset;
          let r = e.getGraphemeBreakType(t.prevCodePoint());
          for (; t.offset > 0; ) {
            const n = t.offset,
              i = e.getGraphemeBreakType(t.prevCodePoint());
            if (S(i, r)) {
              t.setOffset(n);
              break;
            }
            r = i;
          }
          return n - t.offset;
        }
        eol() {
          return this._iterator.eol();
        }
      }
      function b(e, t) {
        return new _(e, t).nextGraphemeLength();
      }
      function C(e, t) {
        return new _(e, t).prevGraphemeLength();
      }
      (t.GraphemeIterator = _),
        (t.nextCharLength = b),
        (t.prevCharLength = C),
        (t.getCharContainingOffset = function (e, t) {
          t > 0 && f(e.charCodeAt(t)) && t--;
          const n = t + b(e, t);
          return [n - C(e, n), n];
        });
      const y =
        /(?:[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05F4\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u0710\u0712-\u072F\u074D-\u07A5\u07B1-\u07EA\u07F4\u07F5\u07FA\u07FE-\u0815\u081A\u0824\u0828\u0830-\u0858\u085E-\u088E\u08A0-\u08C9\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFD3D\uFD50-\uFDC7\uFDF0-\uFDFC\uFE70-\uFEFC]|\uD802[\uDC00-\uDD1B\uDD20-\uDE00\uDE10-\uDE35\uDE40-\uDEE4\uDEEB-\uDF35\uDF40-\uDFFF]|\uD803[\uDC00-\uDD23\uDE80-\uDEA9\uDEAD-\uDF45\uDF51-\uDF81\uDF86-\uDFF6]|\uD83A[\uDC00-\uDCCF\uDD00-\uDD43\uDD4B-\uDFFF]|\uD83B[\uDC00-\uDEBB])/;
      t.containsRTL = function (e) {
        return y.test(e);
      };
      const v = /^[\t\n\r\x20-\x7E]*$/;
      function w(e) {
        return (
          (e >= 127462 && e <= 127487) ||
          8986 === e ||
          8987 === e ||
          9200 === e ||
          9203 === e ||
          (e >= 9728 && e <= 10175) ||
          11088 === e ||
          11093 === e ||
          (e >= 127744 && e <= 128591) ||
          (e >= 128640 && e <= 128764) ||
          (e >= 128992 && e <= 129008) ||
          (e >= 129280 && e <= 129535) ||
          (e >= 129648 && e <= 129782)
        );
      }
      function S(e, t) {
        return 0 === e
          ? 5 !== t && 7 !== t
          : (2 !== e || 3 !== t) &&
              (4 === e ||
                2 === e ||
                3 === e ||
                4 === t ||
                2 === t ||
                3 === t ||
                !(
                  (8 === e && (8 === t || 9 === t || 11 === t || 12 === t)) ||
                  ((11 === e || 9 === e) && (9 === t || 10 === t)) ||
                  ((12 === e || 10 === e) && 10 === t) ||
                  5 === t ||
                  13 === t ||
                  7 === t ||
                  1 === e ||
                  (13 === e && 14 === t) ||
                  (6 === e && 6 === t)
                ));
      }
      (t.isBasicASCII = function (e) {
        return v.test(e);
      }),
        (t.UNUSUAL_LINE_TERMINATORS = /[\u2028\u2029]/),
        (t.containsUnusualLineTerminators = function (e) {
          return t.UNUSUAL_LINE_TERMINATORS.test(e);
        }),
        (t.isFullWidthCharacter = function (e) {
          return (
            (e >= 11904 && e <= 55215) ||
            (e >= 63744 && e <= 64255) ||
            (e >= 65281 && e <= 65374)
          );
        }),
        (t.isEmojiImprecise = w),
        (t.UTF8_BOM_CHARACTER = String.fromCharCode(65279)),
        (t.startsWithUTF8BOM = function (e) {
          return !!(e && e.length > 0 && 65279 === e.charCodeAt(0));
        }),
        (t.containsUppercaseCharacter = function (e, t = !1) {
          return (
            !!e && (t && (e = e.replace(/\\./g, "")), e.toLowerCase() !== e)
          );
        }),
        (t.singleLetterHash = function (e) {
          return (e %= 52) < 26
            ? String.fromCharCode(97 + e)
            : String.fromCharCode(65 + e - 26);
        });
      class E {
        constructor() {
          this._data = JSON.parse(
            "[0,0,0,51229,51255,12,44061,44087,12,127462,127487,6,7083,7085,5,47645,47671,12,54813,54839,12,128678,128678,14,3270,3270,5,9919,9923,14,45853,45879,12,49437,49463,12,53021,53047,12,71216,71218,7,128398,128399,14,129360,129374,14,2519,2519,5,4448,4519,9,9742,9742,14,12336,12336,14,44957,44983,12,46749,46775,12,48541,48567,12,50333,50359,12,52125,52151,12,53917,53943,12,69888,69890,5,73018,73018,5,127990,127990,14,128558,128559,14,128759,128760,14,129653,129655,14,2027,2035,5,2891,2892,7,3761,3761,5,6683,6683,5,8293,8293,4,9825,9826,14,9999,9999,14,43452,43453,5,44509,44535,12,45405,45431,12,46301,46327,12,47197,47223,12,48093,48119,12,48989,49015,12,49885,49911,12,50781,50807,12,51677,51703,12,52573,52599,12,53469,53495,12,54365,54391,12,65279,65279,4,70471,70472,7,72145,72147,7,119173,119179,5,127799,127818,14,128240,128244,14,128512,128512,14,128652,128652,14,128721,128722,14,129292,129292,14,129445,129450,14,129734,129743,14,1476,1477,5,2366,2368,7,2750,2752,7,3076,3076,5,3415,3415,5,4141,4144,5,6109,6109,5,6964,6964,5,7394,7400,5,9197,9198,14,9770,9770,14,9877,9877,14,9968,9969,14,10084,10084,14,43052,43052,5,43713,43713,5,44285,44311,12,44733,44759,12,45181,45207,12,45629,45655,12,46077,46103,12,46525,46551,12,46973,46999,12,47421,47447,12,47869,47895,12,48317,48343,12,48765,48791,12,49213,49239,12,49661,49687,12,50109,50135,12,50557,50583,12,51005,51031,12,51453,51479,12,51901,51927,12,52349,52375,12,52797,52823,12,53245,53271,12,53693,53719,12,54141,54167,12,54589,54615,12,55037,55063,12,69506,69509,5,70191,70193,5,70841,70841,7,71463,71467,5,72330,72342,5,94031,94031,5,123628,123631,5,127763,127765,14,127941,127941,14,128043,128062,14,128302,128317,14,128465,128467,14,128539,128539,14,128640,128640,14,128662,128662,14,128703,128703,14,128745,128745,14,129004,129007,14,129329,129330,14,129402,129402,14,129483,129483,14,129686,129704,14,130048,131069,14,173,173,4,1757,1757,1,2200,2207,5,2434,2435,7,2631,2632,5,2817,2817,5,3008,3008,5,3201,3201,5,3387,3388,5,3542,3542,5,3902,3903,7,4190,4192,5,6002,6003,5,6439,6440,5,6765,6770,7,7019,7027,5,7154,7155,7,8205,8205,13,8505,8505,14,9654,9654,14,9757,9757,14,9792,9792,14,9852,9853,14,9890,9894,14,9937,9937,14,9981,9981,14,10035,10036,14,11035,11036,14,42654,42655,5,43346,43347,7,43587,43587,5,44006,44007,7,44173,44199,12,44397,44423,12,44621,44647,12,44845,44871,12,45069,45095,12,45293,45319,12,45517,45543,12,45741,45767,12,45965,45991,12,46189,46215,12,46413,46439,12,46637,46663,12,46861,46887,12,47085,47111,12,47309,47335,12,47533,47559,12,47757,47783,12,47981,48007,12,48205,48231,12,48429,48455,12,48653,48679,12,48877,48903,12,49101,49127,12,49325,49351,12,49549,49575,12,49773,49799,12,49997,50023,12,50221,50247,12,50445,50471,12,50669,50695,12,50893,50919,12,51117,51143,12,51341,51367,12,51565,51591,12,51789,51815,12,52013,52039,12,52237,52263,12,52461,52487,12,52685,52711,12,52909,52935,12,53133,53159,12,53357,53383,12,53581,53607,12,53805,53831,12,54029,54055,12,54253,54279,12,54477,54503,12,54701,54727,12,54925,54951,12,55149,55175,12,68101,68102,5,69762,69762,7,70067,70069,7,70371,70378,5,70720,70721,7,71087,71087,5,71341,71341,5,71995,71996,5,72249,72249,7,72850,72871,5,73109,73109,5,118576,118598,5,121505,121519,5,127245,127247,14,127568,127569,14,127777,127777,14,127872,127891,14,127956,127967,14,128015,128016,14,128110,128172,14,128259,128259,14,128367,128368,14,128424,128424,14,128488,128488,14,128530,128532,14,128550,128551,14,128566,128566,14,128647,128647,14,128656,128656,14,128667,128673,14,128691,128693,14,128715,128715,14,128728,128732,14,128752,128752,14,128765,128767,14,129096,129103,14,129311,129311,14,129344,129349,14,129394,129394,14,129413,129425,14,129466,129471,14,129511,129535,14,129664,129666,14,129719,129722,14,129760,129767,14,917536,917631,5,13,13,2,1160,1161,5,1564,1564,4,1807,1807,1,2085,2087,5,2307,2307,7,2382,2383,7,2497,2500,5,2563,2563,7,2677,2677,5,2763,2764,7,2879,2879,5,2914,2915,5,3021,3021,5,3142,3144,5,3263,3263,5,3285,3286,5,3398,3400,7,3530,3530,5,3633,3633,5,3864,3865,5,3974,3975,5,4155,4156,7,4229,4230,5,5909,5909,7,6078,6085,7,6277,6278,5,6451,6456,7,6744,6750,5,6846,6846,5,6972,6972,5,7074,7077,5,7146,7148,7,7222,7223,5,7416,7417,5,8234,8238,4,8417,8417,5,9000,9000,14,9203,9203,14,9730,9731,14,9748,9749,14,9762,9763,14,9776,9783,14,9800,9811,14,9831,9831,14,9872,9873,14,9882,9882,14,9900,9903,14,9929,9933,14,9941,9960,14,9974,9974,14,9989,9989,14,10006,10006,14,10062,10062,14,10160,10160,14,11647,11647,5,12953,12953,14,43019,43019,5,43232,43249,5,43443,43443,5,43567,43568,7,43696,43696,5,43765,43765,7,44013,44013,5,44117,44143,12,44229,44255,12,44341,44367,12,44453,44479,12,44565,44591,12,44677,44703,12,44789,44815,12,44901,44927,12,45013,45039,12,45125,45151,12,45237,45263,12,45349,45375,12,45461,45487,12,45573,45599,12,45685,45711,12,45797,45823,12,45909,45935,12,46021,46047,12,46133,46159,12,46245,46271,12,46357,46383,12,46469,46495,12,46581,46607,12,46693,46719,12,46805,46831,12,46917,46943,12,47029,47055,12,47141,47167,12,47253,47279,12,47365,47391,12,47477,47503,12,47589,47615,12,47701,47727,12,47813,47839,12,47925,47951,12,48037,48063,12,48149,48175,12,48261,48287,12,48373,48399,12,48485,48511,12,48597,48623,12,48709,48735,12,48821,48847,12,48933,48959,12,49045,49071,12,49157,49183,12,49269,49295,12,49381,49407,12,49493,49519,12,49605,49631,12,49717,49743,12,49829,49855,12,49941,49967,12,50053,50079,12,50165,50191,12,50277,50303,12,50389,50415,12,50501,50527,12,50613,50639,12,50725,50751,12,50837,50863,12,50949,50975,12,51061,51087,12,51173,51199,12,51285,51311,12,51397,51423,12,51509,51535,12,51621,51647,12,51733,51759,12,51845,51871,12,51957,51983,12,52069,52095,12,52181,52207,12,52293,52319,12,52405,52431,12,52517,52543,12,52629,52655,12,52741,52767,12,52853,52879,12,52965,52991,12,53077,53103,12,53189,53215,12,53301,53327,12,53413,53439,12,53525,53551,12,53637,53663,12,53749,53775,12,53861,53887,12,53973,53999,12,54085,54111,12,54197,54223,12,54309,54335,12,54421,54447,12,54533,54559,12,54645,54671,12,54757,54783,12,54869,54895,12,54981,55007,12,55093,55119,12,55243,55291,10,66045,66045,5,68325,68326,5,69688,69702,5,69817,69818,5,69957,69958,7,70089,70092,5,70198,70199,5,70462,70462,5,70502,70508,5,70750,70750,5,70846,70846,7,71100,71101,5,71230,71230,7,71351,71351,5,71737,71738,5,72000,72000,7,72160,72160,5,72273,72278,5,72752,72758,5,72882,72883,5,73031,73031,5,73461,73462,7,94192,94193,7,119149,119149,7,121403,121452,5,122915,122916,5,126980,126980,14,127358,127359,14,127535,127535,14,127759,127759,14,127771,127771,14,127792,127793,14,127825,127867,14,127897,127899,14,127945,127945,14,127985,127986,14,128000,128007,14,128021,128021,14,128066,128100,14,128184,128235,14,128249,128252,14,128266,128276,14,128335,128335,14,128379,128390,14,128407,128419,14,128444,128444,14,128481,128481,14,128499,128499,14,128526,128526,14,128536,128536,14,128543,128543,14,128556,128556,14,128564,128564,14,128577,128580,14,128643,128645,14,128649,128649,14,128654,128654,14,128660,128660,14,128664,128664,14,128675,128675,14,128686,128689,14,128695,128696,14,128705,128709,14,128717,128719,14,128725,128725,14,128736,128741,14,128747,128748,14,128755,128755,14,128762,128762,14,128981,128991,14,129009,129023,14,129160,129167,14,129296,129304,14,129320,129327,14,129340,129342,14,129356,129356,14,129388,129392,14,129399,129400,14,129404,129407,14,129432,129442,14,129454,129455,14,129473,129474,14,129485,129487,14,129648,129651,14,129659,129660,14,129671,129679,14,129709,129711,14,129728,129730,14,129751,129753,14,129776,129782,14,917505,917505,4,917760,917999,5,10,10,3,127,159,4,768,879,5,1471,1471,5,1536,1541,1,1648,1648,5,1767,1768,5,1840,1866,5,2070,2073,5,2137,2139,5,2274,2274,1,2363,2363,7,2377,2380,7,2402,2403,5,2494,2494,5,2507,2508,7,2558,2558,5,2622,2624,7,2641,2641,5,2691,2691,7,2759,2760,5,2786,2787,5,2876,2876,5,2881,2884,5,2901,2902,5,3006,3006,5,3014,3016,7,3072,3072,5,3134,3136,5,3157,3158,5,3260,3260,5,3266,3266,5,3274,3275,7,3328,3329,5,3391,3392,7,3405,3405,5,3457,3457,5,3536,3537,7,3551,3551,5,3636,3642,5,3764,3772,5,3895,3895,5,3967,3967,7,3993,4028,5,4146,4151,5,4182,4183,7,4226,4226,5,4253,4253,5,4957,4959,5,5940,5940,7,6070,6070,7,6087,6088,7,6158,6158,4,6432,6434,5,6448,6449,7,6679,6680,5,6742,6742,5,6754,6754,5,6783,6783,5,6912,6915,5,6966,6970,5,6978,6978,5,7042,7042,7,7080,7081,5,7143,7143,7,7150,7150,7,7212,7219,5,7380,7392,5,7412,7412,5,8203,8203,4,8232,8232,4,8265,8265,14,8400,8412,5,8421,8432,5,8617,8618,14,9167,9167,14,9200,9200,14,9410,9410,14,9723,9726,14,9733,9733,14,9745,9745,14,9752,9752,14,9760,9760,14,9766,9766,14,9774,9774,14,9786,9786,14,9794,9794,14,9823,9823,14,9828,9828,14,9833,9850,14,9855,9855,14,9875,9875,14,9880,9880,14,9885,9887,14,9896,9897,14,9906,9916,14,9926,9927,14,9935,9935,14,9939,9939,14,9962,9962,14,9972,9972,14,9978,9978,14,9986,9986,14,9997,9997,14,10002,10002,14,10017,10017,14,10055,10055,14,10071,10071,14,10133,10135,14,10548,10549,14,11093,11093,14,12330,12333,5,12441,12442,5,42608,42610,5,43010,43010,5,43045,43046,5,43188,43203,7,43302,43309,5,43392,43394,5,43446,43449,5,43493,43493,5,43571,43572,7,43597,43597,7,43703,43704,5,43756,43757,5,44003,44004,7,44009,44010,7,44033,44059,12,44089,44115,12,44145,44171,12,44201,44227,12,44257,44283,12,44313,44339,12,44369,44395,12,44425,44451,12,44481,44507,12,44537,44563,12,44593,44619,12,44649,44675,12,44705,44731,12,44761,44787,12,44817,44843,12,44873,44899,12,44929,44955,12,44985,45011,12,45041,45067,12,45097,45123,12,45153,45179,12,45209,45235,12,45265,45291,12,45321,45347,12,45377,45403,12,45433,45459,12,45489,45515,12,45545,45571,12,45601,45627,12,45657,45683,12,45713,45739,12,45769,45795,12,45825,45851,12,45881,45907,12,45937,45963,12,45993,46019,12,46049,46075,12,46105,46131,12,46161,46187,12,46217,46243,12,46273,46299,12,46329,46355,12,46385,46411,12,46441,46467,12,46497,46523,12,46553,46579,12,46609,46635,12,46665,46691,12,46721,46747,12,46777,46803,12,46833,46859,12,46889,46915,12,46945,46971,12,47001,47027,12,47057,47083,12,47113,47139,12,47169,47195,12,47225,47251,12,47281,47307,12,47337,47363,12,47393,47419,12,47449,47475,12,47505,47531,12,47561,47587,12,47617,47643,12,47673,47699,12,47729,47755,12,47785,47811,12,47841,47867,12,47897,47923,12,47953,47979,12,48009,48035,12,48065,48091,12,48121,48147,12,48177,48203,12,48233,48259,12,48289,48315,12,48345,48371,12,48401,48427,12,48457,48483,12,48513,48539,12,48569,48595,12,48625,48651,12,48681,48707,12,48737,48763,12,48793,48819,12,48849,48875,12,48905,48931,12,48961,48987,12,49017,49043,12,49073,49099,12,49129,49155,12,49185,49211,12,49241,49267,12,49297,49323,12,49353,49379,12,49409,49435,12,49465,49491,12,49521,49547,12,49577,49603,12,49633,49659,12,49689,49715,12,49745,49771,12,49801,49827,12,49857,49883,12,49913,49939,12,49969,49995,12,50025,50051,12,50081,50107,12,50137,50163,12,50193,50219,12,50249,50275,12,50305,50331,12,50361,50387,12,50417,50443,12,50473,50499,12,50529,50555,12,50585,50611,12,50641,50667,12,50697,50723,12,50753,50779,12,50809,50835,12,50865,50891,12,50921,50947,12,50977,51003,12,51033,51059,12,51089,51115,12,51145,51171,12,51201,51227,12,51257,51283,12,51313,51339,12,51369,51395,12,51425,51451,12,51481,51507,12,51537,51563,12,51593,51619,12,51649,51675,12,51705,51731,12,51761,51787,12,51817,51843,12,51873,51899,12,51929,51955,12,51985,52011,12,52041,52067,12,52097,52123,12,52153,52179,12,52209,52235,12,52265,52291,12,52321,52347,12,52377,52403,12,52433,52459,12,52489,52515,12,52545,52571,12,52601,52627,12,52657,52683,12,52713,52739,12,52769,52795,12,52825,52851,12,52881,52907,12,52937,52963,12,52993,53019,12,53049,53075,12,53105,53131,12,53161,53187,12,53217,53243,12,53273,53299,12,53329,53355,12,53385,53411,12,53441,53467,12,53497,53523,12,53553,53579,12,53609,53635,12,53665,53691,12,53721,53747,12,53777,53803,12,53833,53859,12,53889,53915,12,53945,53971,12,54001,54027,12,54057,54083,12,54113,54139,12,54169,54195,12,54225,54251,12,54281,54307,12,54337,54363,12,54393,54419,12,54449,54475,12,54505,54531,12,54561,54587,12,54617,54643,12,54673,54699,12,54729,54755,12,54785,54811,12,54841,54867,12,54897,54923,12,54953,54979,12,55009,55035,12,55065,55091,12,55121,55147,12,55177,55203,12,65024,65039,5,65520,65528,4,66422,66426,5,68152,68154,5,69291,69292,5,69633,69633,5,69747,69748,5,69811,69814,5,69826,69826,5,69932,69932,7,70016,70017,5,70079,70080,7,70095,70095,5,70196,70196,5,70367,70367,5,70402,70403,7,70464,70464,5,70487,70487,5,70709,70711,7,70725,70725,7,70833,70834,7,70843,70844,7,70849,70849,7,71090,71093,5,71103,71104,5,71227,71228,7,71339,71339,5,71344,71349,5,71458,71461,5,71727,71735,5,71985,71989,7,71998,71998,5,72002,72002,7,72154,72155,5,72193,72202,5,72251,72254,5,72281,72283,5,72344,72345,5,72766,72766,7,72874,72880,5,72885,72886,5,73023,73029,5,73104,73105,5,73111,73111,5,92912,92916,5,94095,94098,5,113824,113827,4,119142,119142,7,119155,119162,4,119362,119364,5,121476,121476,5,122888,122904,5,123184,123190,5,125252,125258,5,127183,127183,14,127340,127343,14,127377,127386,14,127491,127503,14,127548,127551,14,127744,127756,14,127761,127761,14,127769,127769,14,127773,127774,14,127780,127788,14,127796,127797,14,127820,127823,14,127869,127869,14,127894,127895,14,127902,127903,14,127943,127943,14,127947,127950,14,127972,127972,14,127988,127988,14,127992,127994,14,128009,128011,14,128019,128019,14,128023,128041,14,128064,128064,14,128102,128107,14,128174,128181,14,128238,128238,14,128246,128247,14,128254,128254,14,128264,128264,14,128278,128299,14,128329,128330,14,128348,128359,14,128371,128377,14,128392,128393,14,128401,128404,14,128421,128421,14,128433,128434,14,128450,128452,14,128476,128478,14,128483,128483,14,128495,128495,14,128506,128506,14,128519,128520,14,128528,128528,14,128534,128534,14,128538,128538,14,128540,128542,14,128544,128549,14,128552,128555,14,128557,128557,14,128560,128563,14,128565,128565,14,128567,128576,14,128581,128591,14,128641,128642,14,128646,128646,14,128648,128648,14,128650,128651,14,128653,128653,14,128655,128655,14,128657,128659,14,128661,128661,14,128663,128663,14,128665,128666,14,128674,128674,14,128676,128677,14,128679,128685,14,128690,128690,14,128694,128694,14,128697,128702,14,128704,128704,14,128710,128714,14,128716,128716,14,128720,128720,14,128723,128724,14,128726,128727,14,128733,128735,14,128742,128744,14,128746,128746,14,128749,128751,14,128753,128754,14,128756,128758,14,128761,128761,14,128763,128764,14,128884,128895,14,128992,129003,14,129008,129008,14,129036,129039,14,129114,129119,14,129198,129279,14,129293,129295,14,129305,129310,14,129312,129319,14,129328,129328,14,129331,129338,14,129343,129343,14,129351,129355,14,129357,129359,14,129375,129387,14,129393,129393,14,129395,129398,14,129401,129401,14,129403,129403,14,129408,129412,14,129426,129431,14,129443,129444,14,129451,129453,14,129456,129465,14,129472,129472,14,129475,129482,14,129484,129484,14,129488,129510,14,129536,129647,14,129652,129652,14,129656,129658,14,129661,129663,14,129667,129670,14,129680,129685,14,129705,129708,14,129712,129718,14,129723,129727,14,129731,129733,14,129744,129750,14,129754,129759,14,129768,129775,14,129783,129791,14,917504,917504,4,917506,917535,4,917632,917759,4,918000,921599,4,0,9,4,11,12,4,14,31,4,169,169,14,174,174,14,1155,1159,5,1425,1469,5,1473,1474,5,1479,1479,5,1552,1562,5,1611,1631,5,1750,1756,5,1759,1764,5,1770,1773,5,1809,1809,5,1958,1968,5,2045,2045,5,2075,2083,5,2089,2093,5,2192,2193,1,2250,2273,5,2275,2306,5,2362,2362,5,2364,2364,5,2369,2376,5,2381,2381,5,2385,2391,5,2433,2433,5,2492,2492,5,2495,2496,7,2503,2504,7,2509,2509,5,2530,2531,5,2561,2562,5,2620,2620,5,2625,2626,5,2635,2637,5,2672,2673,5,2689,2690,5,2748,2748,5,2753,2757,5,2761,2761,7,2765,2765,5,2810,2815,5,2818,2819,7,2878,2878,5,2880,2880,7,2887,2888,7,2893,2893,5,2903,2903,5,2946,2946,5,3007,3007,7,3009,3010,7,3018,3020,7,3031,3031,5,3073,3075,7,3132,3132,5,3137,3140,7,3146,3149,5,3170,3171,5,3202,3203,7,3262,3262,7,3264,3265,7,3267,3268,7,3271,3272,7,3276,3277,5,3298,3299,5,3330,3331,7,3390,3390,5,3393,3396,5,3402,3404,7,3406,3406,1,3426,3427,5,3458,3459,7,3535,3535,5,3538,3540,5,3544,3550,7,3570,3571,7,3635,3635,7,3655,3662,5,3763,3763,7,3784,3789,5,3893,3893,5,3897,3897,5,3953,3966,5,3968,3972,5,3981,3991,5,4038,4038,5,4145,4145,7,4153,4154,5,4157,4158,5,4184,4185,5,4209,4212,5,4228,4228,7,4237,4237,5,4352,4447,8,4520,4607,10,5906,5908,5,5938,5939,5,5970,5971,5,6068,6069,5,6071,6077,5,6086,6086,5,6089,6099,5,6155,6157,5,6159,6159,5,6313,6313,5,6435,6438,7,6441,6443,7,6450,6450,5,6457,6459,5,6681,6682,7,6741,6741,7,6743,6743,7,6752,6752,5,6757,6764,5,6771,6780,5,6832,6845,5,6847,6862,5,6916,6916,7,6965,6965,5,6971,6971,7,6973,6977,7,6979,6980,7,7040,7041,5,7073,7073,7,7078,7079,7,7082,7082,7,7142,7142,5,7144,7145,5,7149,7149,5,7151,7153,5,7204,7211,7,7220,7221,7,7376,7378,5,7393,7393,7,7405,7405,5,7415,7415,7,7616,7679,5,8204,8204,5,8206,8207,4,8233,8233,4,8252,8252,14,8288,8292,4,8294,8303,4,8413,8416,5,8418,8420,5,8482,8482,14,8596,8601,14,8986,8987,14,9096,9096,14,9193,9196,14,9199,9199,14,9201,9202,14,9208,9210,14,9642,9643,14,9664,9664,14,9728,9729,14,9732,9732,14,9735,9741,14,9743,9744,14,9746,9746,14,9750,9751,14,9753,9756,14,9758,9759,14,9761,9761,14,9764,9765,14,9767,9769,14,9771,9773,14,9775,9775,14,9784,9785,14,9787,9791,14,9793,9793,14,9795,9799,14,9812,9822,14,9824,9824,14,9827,9827,14,9829,9830,14,9832,9832,14,9851,9851,14,9854,9854,14,9856,9861,14,9874,9874,14,9876,9876,14,9878,9879,14,9881,9881,14,9883,9884,14,9888,9889,14,9895,9895,14,9898,9899,14,9904,9905,14,9917,9918,14,9924,9925,14,9928,9928,14,9934,9934,14,9936,9936,14,9938,9938,14,9940,9940,14,9961,9961,14,9963,9967,14,9970,9971,14,9973,9973,14,9975,9977,14,9979,9980,14,9982,9985,14,9987,9988,14,9992,9996,14,9998,9998,14,10000,10001,14,10004,10004,14,10013,10013,14,10024,10024,14,10052,10052,14,10060,10060,14,10067,10069,14,10083,10083,14,10085,10087,14,10145,10145,14,10175,10175,14,11013,11015,14,11088,11088,14,11503,11505,5,11744,11775,5,12334,12335,5,12349,12349,14,12951,12951,14,42607,42607,5,42612,42621,5,42736,42737,5,43014,43014,5,43043,43044,7,43047,43047,7,43136,43137,7,43204,43205,5,43263,43263,5,43335,43345,5,43360,43388,8,43395,43395,7,43444,43445,7,43450,43451,7,43454,43456,7,43561,43566,5,43569,43570,5,43573,43574,5,43596,43596,5,43644,43644,5,43698,43700,5,43710,43711,5,43755,43755,7,43758,43759,7,43766,43766,5,44005,44005,5,44008,44008,5,44012,44012,7,44032,44032,11,44060,44060,11,44088,44088,11,44116,44116,11,44144,44144,11,44172,44172,11,44200,44200,11,44228,44228,11,44256,44256,11,44284,44284,11,44312,44312,11,44340,44340,11,44368,44368,11,44396,44396,11,44424,44424,11,44452,44452,11,44480,44480,11,44508,44508,11,44536,44536,11,44564,44564,11,44592,44592,11,44620,44620,11,44648,44648,11,44676,44676,11,44704,44704,11,44732,44732,11,44760,44760,11,44788,44788,11,44816,44816,11,44844,44844,11,44872,44872,11,44900,44900,11,44928,44928,11,44956,44956,11,44984,44984,11,45012,45012,11,45040,45040,11,45068,45068,11,45096,45096,11,45124,45124,11,45152,45152,11,45180,45180,11,45208,45208,11,45236,45236,11,45264,45264,11,45292,45292,11,45320,45320,11,45348,45348,11,45376,45376,11,45404,45404,11,45432,45432,11,45460,45460,11,45488,45488,11,45516,45516,11,45544,45544,11,45572,45572,11,45600,45600,11,45628,45628,11,45656,45656,11,45684,45684,11,45712,45712,11,45740,45740,11,45768,45768,11,45796,45796,11,45824,45824,11,45852,45852,11,45880,45880,11,45908,45908,11,45936,45936,11,45964,45964,11,45992,45992,11,46020,46020,11,46048,46048,11,46076,46076,11,46104,46104,11,46132,46132,11,46160,46160,11,46188,46188,11,46216,46216,11,46244,46244,11,46272,46272,11,46300,46300,11,46328,46328,11,46356,46356,11,46384,46384,11,46412,46412,11,46440,46440,11,46468,46468,11,46496,46496,11,46524,46524,11,46552,46552,11,46580,46580,11,46608,46608,11,46636,46636,11,46664,46664,11,46692,46692,11,46720,46720,11,46748,46748,11,46776,46776,11,46804,46804,11,46832,46832,11,46860,46860,11,46888,46888,11,46916,46916,11,46944,46944,11,46972,46972,11,47000,47000,11,47028,47028,11,47056,47056,11,47084,47084,11,47112,47112,11,47140,47140,11,47168,47168,11,47196,47196,11,47224,47224,11,47252,47252,11,47280,47280,11,47308,47308,11,47336,47336,11,47364,47364,11,47392,47392,11,47420,47420,11,47448,47448,11,47476,47476,11,47504,47504,11,47532,47532,11,47560,47560,11,47588,47588,11,47616,47616,11,47644,47644,11,47672,47672,11,47700,47700,11,47728,47728,11,47756,47756,11,47784,47784,11,47812,47812,11,47840,47840,11,47868,47868,11,47896,47896,11,47924,47924,11,47952,47952,11,47980,47980,11,48008,48008,11,48036,48036,11,48064,48064,11,48092,48092,11,48120,48120,11,48148,48148,11,48176,48176,11,48204,48204,11,48232,48232,11,48260,48260,11,48288,48288,11,48316,48316,11,48344,48344,11,48372,48372,11,48400,48400,11,48428,48428,11,48456,48456,11,48484,48484,11,48512,48512,11,48540,48540,11,48568,48568,11,48596,48596,11,48624,48624,11,48652,48652,11,48680,48680,11,48708,48708,11,48736,48736,11,48764,48764,11,48792,48792,11,48820,48820,11,48848,48848,11,48876,48876,11,48904,48904,11,48932,48932,11,48960,48960,11,48988,48988,11,49016,49016,11,49044,49044,11,49072,49072,11,49100,49100,11,49128,49128,11,49156,49156,11,49184,49184,11,49212,49212,11,49240,49240,11,49268,49268,11,49296,49296,11,49324,49324,11,49352,49352,11,49380,49380,11,49408,49408,11,49436,49436,11,49464,49464,11,49492,49492,11,49520,49520,11,49548,49548,11,49576,49576,11,49604,49604,11,49632,49632,11,49660,49660,11,49688,49688,11,49716,49716,11,49744,49744,11,49772,49772,11,49800,49800,11,49828,49828,11,49856,49856,11,49884,49884,11,49912,49912,11,49940,49940,11,49968,49968,11,49996,49996,11,50024,50024,11,50052,50052,11,50080,50080,11,50108,50108,11,50136,50136,11,50164,50164,11,50192,50192,11,50220,50220,11,50248,50248,11,50276,50276,11,50304,50304,11,50332,50332,11,50360,50360,11,50388,50388,11,50416,50416,11,50444,50444,11,50472,50472,11,50500,50500,11,50528,50528,11,50556,50556,11,50584,50584,11,50612,50612,11,50640,50640,11,50668,50668,11,50696,50696,11,50724,50724,11,50752,50752,11,50780,50780,11,50808,50808,11,50836,50836,11,50864,50864,11,50892,50892,11,50920,50920,11,50948,50948,11,50976,50976,11,51004,51004,11,51032,51032,11,51060,51060,11,51088,51088,11,51116,51116,11,51144,51144,11,51172,51172,11,51200,51200,11,51228,51228,11,51256,51256,11,51284,51284,11,51312,51312,11,51340,51340,11,51368,51368,11,51396,51396,11,51424,51424,11,51452,51452,11,51480,51480,11,51508,51508,11,51536,51536,11,51564,51564,11,51592,51592,11,51620,51620,11,51648,51648,11,51676,51676,11,51704,51704,11,51732,51732,11,51760,51760,11,51788,51788,11,51816,51816,11,51844,51844,11,51872,51872,11,51900,51900,11,51928,51928,11,51956,51956,11,51984,51984,11,52012,52012,11,52040,52040,11,52068,52068,11,52096,52096,11,52124,52124,11,52152,52152,11,52180,52180,11,52208,52208,11,52236,52236,11,52264,52264,11,52292,52292,11,52320,52320,11,52348,52348,11,52376,52376,11,52404,52404,11,52432,52432,11,52460,52460,11,52488,52488,11,52516,52516,11,52544,52544,11,52572,52572,11,52600,52600,11,52628,52628,11,52656,52656,11,52684,52684,11,52712,52712,11,52740,52740,11,52768,52768,11,52796,52796,11,52824,52824,11,52852,52852,11,52880,52880,11,52908,52908,11,52936,52936,11,52964,52964,11,52992,52992,11,53020,53020,11,53048,53048,11,53076,53076,11,53104,53104,11,53132,53132,11,53160,53160,11,53188,53188,11,53216,53216,11,53244,53244,11,53272,53272,11,53300,53300,11,53328,53328,11,53356,53356,11,53384,53384,11,53412,53412,11,53440,53440,11,53468,53468,11,53496,53496,11,53524,53524,11,53552,53552,11,53580,53580,11,53608,53608,11,53636,53636,11,53664,53664,11,53692,53692,11,53720,53720,11,53748,53748,11,53776,53776,11,53804,53804,11,53832,53832,11,53860,53860,11,53888,53888,11,53916,53916,11,53944,53944,11,53972,53972,11,54000,54000,11,54028,54028,11,54056,54056,11,54084,54084,11,54112,54112,11,54140,54140,11,54168,54168,11,54196,54196,11,54224,54224,11,54252,54252,11,54280,54280,11,54308,54308,11,54336,54336,11,54364,54364,11,54392,54392,11,54420,54420,11,54448,54448,11,54476,54476,11,54504,54504,11,54532,54532,11,54560,54560,11,54588,54588,11,54616,54616,11,54644,54644,11,54672,54672,11,54700,54700,11,54728,54728,11,54756,54756,11,54784,54784,11,54812,54812,11,54840,54840,11,54868,54868,11,54896,54896,11,54924,54924,11,54952,54952,11,54980,54980,11,55008,55008,11,55036,55036,11,55064,55064,11,55092,55092,11,55120,55120,11,55148,55148,11,55176,55176,11,55216,55238,9,64286,64286,5,65056,65071,5,65438,65439,5,65529,65531,4,66272,66272,5,68097,68099,5,68108,68111,5,68159,68159,5,68900,68903,5,69446,69456,5,69632,69632,7,69634,69634,7,69744,69744,5,69759,69761,5,69808,69810,7,69815,69816,7,69821,69821,1,69837,69837,1,69927,69931,5,69933,69940,5,70003,70003,5,70018,70018,7,70070,70078,5,70082,70083,1,70094,70094,7,70188,70190,7,70194,70195,7,70197,70197,7,70206,70206,5,70368,70370,7,70400,70401,5,70459,70460,5,70463,70463,7,70465,70468,7,70475,70477,7,70498,70499,7,70512,70516,5,70712,70719,5,70722,70724,5,70726,70726,5,70832,70832,5,70835,70840,5,70842,70842,5,70845,70845,5,70847,70848,5,70850,70851,5,71088,71089,7,71096,71099,7,71102,71102,7,71132,71133,5,71219,71226,5,71229,71229,5,71231,71232,5,71340,71340,7,71342,71343,7,71350,71350,7,71453,71455,5,71462,71462,7,71724,71726,7,71736,71736,7,71984,71984,5,71991,71992,7,71997,71997,7,71999,71999,1,72001,72001,1,72003,72003,5,72148,72151,5,72156,72159,7,72164,72164,7,72243,72248,5,72250,72250,1,72263,72263,5,72279,72280,7,72324,72329,1,72343,72343,7,72751,72751,7,72760,72765,5,72767,72767,5,72873,72873,7,72881,72881,7,72884,72884,7,73009,73014,5,73020,73021,5,73030,73030,1,73098,73102,7,73107,73108,7,73110,73110,7,73459,73460,5,78896,78904,4,92976,92982,5,94033,94087,7,94180,94180,5,113821,113822,5,118528,118573,5,119141,119141,5,119143,119145,5,119150,119154,5,119163,119170,5,119210,119213,5,121344,121398,5,121461,121461,5,121499,121503,5,122880,122886,5,122907,122913,5,122918,122922,5,123566,123566,5,125136,125142,5,126976,126979,14,126981,127182,14,127184,127231,14,127279,127279,14,127344,127345,14,127374,127374,14,127405,127461,14,127489,127490,14,127514,127514,14,127538,127546,14,127561,127567,14,127570,127743,14,127757,127758,14,127760,127760,14,127762,127762,14,127766,127768,14,127770,127770,14,127772,127772,14,127775,127776,14,127778,127779,14,127789,127791,14,127794,127795,14,127798,127798,14,127819,127819,14,127824,127824,14,127868,127868,14,127870,127871,14,127892,127893,14,127896,127896,14,127900,127901,14,127904,127940,14,127942,127942,14,127944,127944,14,127946,127946,14,127951,127955,14,127968,127971,14,127973,127984,14,127987,127987,14,127989,127989,14,127991,127991,14,127995,127999,5,128008,128008,14,128012,128014,14,128017,128018,14,128020,128020,14,128022,128022,14,128042,128042,14,128063,128063,14,128065,128065,14,128101,128101,14,128108,128109,14,128173,128173,14,128182,128183,14,128236,128237,14,128239,128239,14,128245,128245,14,128248,128248,14,128253,128253,14,128255,128258,14,128260,128263,14,128265,128265,14,128277,128277,14,128300,128301,14,128326,128328,14,128331,128334,14,128336,128347,14,128360,128366,14,128369,128370,14,128378,128378,14,128391,128391,14,128394,128397,14,128400,128400,14,128405,128406,14,128420,128420,14,128422,128423,14,128425,128432,14,128435,128443,14,128445,128449,14,128453,128464,14,128468,128475,14,128479,128480,14,128482,128482,14,128484,128487,14,128489,128494,14,128496,128498,14,128500,128505,14,128507,128511,14,128513,128518,14,128521,128525,14,128527,128527,14,128529,128529,14,128533,128533,14,128535,128535,14,128537,128537,14]"
          );
        }
        static getInstance() {
          return E._INSTANCE || (E._INSTANCE = new E()), E._INSTANCE;
        }
        getGraphemeBreakType(e) {
          if (e < 32) return 10 === e ? 3 : 13 === e ? 2 : 4;
          if (e < 127) return 0;
          const t = this._data,
            n = t.length / 3;
          let r = 1;
          for (; r <= n; )
            if (e < t[3 * r]) r *= 2;
            else {
              if (!(e > t[3 * r + 1])) return t[3 * r + 2];
              r = 2 * r + 1;
            }
          return 0;
        }
      }
      function L(e) {
        return 127995 <= e && e <= 127999;
      }
      (E._INSTANCE = null),
        (t.getLeftDeleteOffset = function (e, t) {
          if (0 === e) return 0;
          const n = (function (e, t) {
            const n = new p(t, e);
            let r = n.prevCodePoint();
            for (; L(r) || 65039 === r || 8419 === r; ) {
              if (0 === n.offset) return;
              r = n.prevCodePoint();
            }
            if (!w(r)) return;
            let i = n.offset;
            return i > 0 && 8205 === n.prevCodePoint() && (i = n.offset), i;
          })(e, t);
          if (void 0 !== n) return n;
          const r = new p(t, e);
          return r.prevCodePoint(), r.offset;
        }),
        (t.noBreakWhitespace = "\xa0");
      class A {
        constructor(e) {
          this.confusableDictionary = e;
        }
        static getInstance(e) {
          return A.cache.get(Array.from(e));
        }
        static getLocales() {
          return A._locales.getValue();
        }
        isAmbiguous(e) {
          return this.confusableDictionary.has(e);
        }
        getPrimaryConfusable(e) {
          return this.confusableDictionary.get(e);
        }
        getConfusableCodePoints() {
          return new Set(this.confusableDictionary.keys());
        }
      }
      (t.AmbiguousCharacters = A),
        (i = A),
        (A.ambiguousCharacterData = new r.Lazy(() =>
          JSON.parse(
            '{"_common":[8232,32,8233,32,5760,32,8192,32,8193,32,8194,32,8195,32,8196,32,8197,32,8198,32,8200,32,8201,32,8202,32,8287,32,8199,32,8239,32,2042,95,65101,95,65102,95,65103,95,8208,45,8209,45,8210,45,65112,45,1748,45,8259,45,727,45,8722,45,10134,45,11450,45,1549,44,1643,44,8218,44,184,44,42233,44,894,59,2307,58,2691,58,1417,58,1795,58,1796,58,5868,58,65072,58,6147,58,6153,58,8282,58,1475,58,760,58,42889,58,8758,58,720,58,42237,58,451,33,11601,33,660,63,577,63,2429,63,5038,63,42731,63,119149,46,8228,46,1793,46,1794,46,42510,46,68176,46,1632,46,1776,46,42232,46,1373,96,65287,96,8219,96,8242,96,1370,96,1523,96,8175,96,65344,96,900,96,8189,96,8125,96,8127,96,8190,96,697,96,884,96,712,96,714,96,715,96,756,96,699,96,701,96,700,96,702,96,42892,96,1497,96,2036,96,2037,96,5194,96,5836,96,94033,96,94034,96,65339,91,10088,40,10098,40,12308,40,64830,40,65341,93,10089,41,10099,41,12309,41,64831,41,10100,123,119060,123,10101,125,65342,94,8270,42,1645,42,8727,42,66335,42,5941,47,8257,47,8725,47,8260,47,9585,47,10187,47,10744,47,119354,47,12755,47,12339,47,11462,47,20031,47,12035,47,65340,92,65128,92,8726,92,10189,92,10741,92,10745,92,119311,92,119355,92,12756,92,20022,92,12034,92,42872,38,708,94,710,94,5869,43,10133,43,66203,43,8249,60,10094,60,706,60,119350,60,5176,60,5810,60,5120,61,11840,61,12448,61,42239,61,8250,62,10095,62,707,62,119351,62,5171,62,94015,62,8275,126,732,126,8128,126,8764,126,65372,124,65293,45,120784,50,120794,50,120804,50,120814,50,120824,50,130034,50,42842,50,423,50,1000,50,42564,50,5311,50,42735,50,119302,51,120785,51,120795,51,120805,51,120815,51,120825,51,130035,51,42923,51,540,51,439,51,42858,51,11468,51,1248,51,94011,51,71882,51,120786,52,120796,52,120806,52,120816,52,120826,52,130036,52,5070,52,71855,52,120787,53,120797,53,120807,53,120817,53,120827,53,130037,53,444,53,71867,53,120788,54,120798,54,120808,54,120818,54,120828,54,130038,54,11474,54,5102,54,71893,54,119314,55,120789,55,120799,55,120809,55,120819,55,120829,55,130039,55,66770,55,71878,55,2819,56,2538,56,2666,56,125131,56,120790,56,120800,56,120810,56,120820,56,120830,56,130040,56,547,56,546,56,66330,56,2663,57,2920,57,2541,57,3437,57,120791,57,120801,57,120811,57,120821,57,120831,57,130041,57,42862,57,11466,57,71884,57,71852,57,71894,57,9082,97,65345,97,119834,97,119886,97,119938,97,119990,97,120042,97,120094,97,120146,97,120198,97,120250,97,120302,97,120354,97,120406,97,120458,97,593,97,945,97,120514,97,120572,97,120630,97,120688,97,120746,97,65313,65,119808,65,119860,65,119912,65,119964,65,120016,65,120068,65,120120,65,120172,65,120224,65,120276,65,120328,65,120380,65,120432,65,913,65,120488,65,120546,65,120604,65,120662,65,120720,65,5034,65,5573,65,42222,65,94016,65,66208,65,119835,98,119887,98,119939,98,119991,98,120043,98,120095,98,120147,98,120199,98,120251,98,120303,98,120355,98,120407,98,120459,98,388,98,5071,98,5234,98,5551,98,65314,66,8492,66,119809,66,119861,66,119913,66,120017,66,120069,66,120121,66,120173,66,120225,66,120277,66,120329,66,120381,66,120433,66,42932,66,914,66,120489,66,120547,66,120605,66,120663,66,120721,66,5108,66,5623,66,42192,66,66178,66,66209,66,66305,66,65347,99,8573,99,119836,99,119888,99,119940,99,119992,99,120044,99,120096,99,120148,99,120200,99,120252,99,120304,99,120356,99,120408,99,120460,99,7428,99,1010,99,11429,99,43951,99,66621,99,128844,67,71922,67,71913,67,65315,67,8557,67,8450,67,8493,67,119810,67,119862,67,119914,67,119966,67,120018,67,120174,67,120226,67,120278,67,120330,67,120382,67,120434,67,1017,67,11428,67,5087,67,42202,67,66210,67,66306,67,66581,67,66844,67,8574,100,8518,100,119837,100,119889,100,119941,100,119993,100,120045,100,120097,100,120149,100,120201,100,120253,100,120305,100,120357,100,120409,100,120461,100,1281,100,5095,100,5231,100,42194,100,8558,68,8517,68,119811,68,119863,68,119915,68,119967,68,120019,68,120071,68,120123,68,120175,68,120227,68,120279,68,120331,68,120383,68,120435,68,5024,68,5598,68,5610,68,42195,68,8494,101,65349,101,8495,101,8519,101,119838,101,119890,101,119942,101,120046,101,120098,101,120150,101,120202,101,120254,101,120306,101,120358,101,120410,101,120462,101,43826,101,1213,101,8959,69,65317,69,8496,69,119812,69,119864,69,119916,69,120020,69,120072,69,120124,69,120176,69,120228,69,120280,69,120332,69,120384,69,120436,69,917,69,120492,69,120550,69,120608,69,120666,69,120724,69,11577,69,5036,69,42224,69,71846,69,71854,69,66182,69,119839,102,119891,102,119943,102,119995,102,120047,102,120099,102,120151,102,120203,102,120255,102,120307,102,120359,102,120411,102,120463,102,43829,102,42905,102,383,102,7837,102,1412,102,119315,70,8497,70,119813,70,119865,70,119917,70,120021,70,120073,70,120125,70,120177,70,120229,70,120281,70,120333,70,120385,70,120437,70,42904,70,988,70,120778,70,5556,70,42205,70,71874,70,71842,70,66183,70,66213,70,66853,70,65351,103,8458,103,119840,103,119892,103,119944,103,120048,103,120100,103,120152,103,120204,103,120256,103,120308,103,120360,103,120412,103,120464,103,609,103,7555,103,397,103,1409,103,119814,71,119866,71,119918,71,119970,71,120022,71,120074,71,120126,71,120178,71,120230,71,120282,71,120334,71,120386,71,120438,71,1292,71,5056,71,5107,71,42198,71,65352,104,8462,104,119841,104,119945,104,119997,104,120049,104,120101,104,120153,104,120205,104,120257,104,120309,104,120361,104,120413,104,120465,104,1211,104,1392,104,5058,104,65320,72,8459,72,8460,72,8461,72,119815,72,119867,72,119919,72,120023,72,120179,72,120231,72,120283,72,120335,72,120387,72,120439,72,919,72,120494,72,120552,72,120610,72,120668,72,120726,72,11406,72,5051,72,5500,72,42215,72,66255,72,731,105,9075,105,65353,105,8560,105,8505,105,8520,105,119842,105,119894,105,119946,105,119998,105,120050,105,120102,105,120154,105,120206,105,120258,105,120310,105,120362,105,120414,105,120466,105,120484,105,618,105,617,105,953,105,8126,105,890,105,120522,105,120580,105,120638,105,120696,105,120754,105,1110,105,42567,105,1231,105,43893,105,5029,105,71875,105,65354,106,8521,106,119843,106,119895,106,119947,106,119999,106,120051,106,120103,106,120155,106,120207,106,120259,106,120311,106,120363,106,120415,106,120467,106,1011,106,1112,106,65322,74,119817,74,119869,74,119921,74,119973,74,120025,74,120077,74,120129,74,120181,74,120233,74,120285,74,120337,74,120389,74,120441,74,42930,74,895,74,1032,74,5035,74,5261,74,42201,74,119844,107,119896,107,119948,107,120000,107,120052,107,120104,107,120156,107,120208,107,120260,107,120312,107,120364,107,120416,107,120468,107,8490,75,65323,75,119818,75,119870,75,119922,75,119974,75,120026,75,120078,75,120130,75,120182,75,120234,75,120286,75,120338,75,120390,75,120442,75,922,75,120497,75,120555,75,120613,75,120671,75,120729,75,11412,75,5094,75,5845,75,42199,75,66840,75,1472,108,8739,73,9213,73,65512,73,1633,108,1777,73,66336,108,125127,108,120783,73,120793,73,120803,73,120813,73,120823,73,130033,73,65321,73,8544,73,8464,73,8465,73,119816,73,119868,73,119920,73,120024,73,120128,73,120180,73,120232,73,120284,73,120336,73,120388,73,120440,73,65356,108,8572,73,8467,108,119845,108,119897,108,119949,108,120001,108,120053,108,120105,73,120157,73,120209,73,120261,73,120313,73,120365,73,120417,73,120469,73,448,73,120496,73,120554,73,120612,73,120670,73,120728,73,11410,73,1030,73,1216,73,1493,108,1503,108,1575,108,126464,108,126592,108,65166,108,65165,108,1994,108,11599,73,5825,73,42226,73,93992,73,66186,124,66313,124,119338,76,8556,76,8466,76,119819,76,119871,76,119923,76,120027,76,120079,76,120131,76,120183,76,120235,76,120287,76,120339,76,120391,76,120443,76,11472,76,5086,76,5290,76,42209,76,93974,76,71843,76,71858,76,66587,76,66854,76,65325,77,8559,77,8499,77,119820,77,119872,77,119924,77,120028,77,120080,77,120132,77,120184,77,120236,77,120288,77,120340,77,120392,77,120444,77,924,77,120499,77,120557,77,120615,77,120673,77,120731,77,1018,77,11416,77,5047,77,5616,77,5846,77,42207,77,66224,77,66321,77,119847,110,119899,110,119951,110,120003,110,120055,110,120107,110,120159,110,120211,110,120263,110,120315,110,120367,110,120419,110,120471,110,1400,110,1404,110,65326,78,8469,78,119821,78,119873,78,119925,78,119977,78,120029,78,120081,78,120185,78,120237,78,120289,78,120341,78,120393,78,120445,78,925,78,120500,78,120558,78,120616,78,120674,78,120732,78,11418,78,42208,78,66835,78,3074,111,3202,111,3330,111,3458,111,2406,111,2662,111,2790,111,3046,111,3174,111,3302,111,3430,111,3664,111,3792,111,4160,111,1637,111,1781,111,65359,111,8500,111,119848,111,119900,111,119952,111,120056,111,120108,111,120160,111,120212,111,120264,111,120316,111,120368,111,120420,111,120472,111,7439,111,7441,111,43837,111,959,111,120528,111,120586,111,120644,111,120702,111,120760,111,963,111,120532,111,120590,111,120648,111,120706,111,120764,111,11423,111,4351,111,1413,111,1505,111,1607,111,126500,111,126564,111,126596,111,65259,111,65260,111,65258,111,65257,111,1726,111,64428,111,64429,111,64427,111,64426,111,1729,111,64424,111,64425,111,64423,111,64422,111,1749,111,3360,111,4125,111,66794,111,71880,111,71895,111,66604,111,1984,79,2534,79,2918,79,12295,79,70864,79,71904,79,120782,79,120792,79,120802,79,120812,79,120822,79,130032,79,65327,79,119822,79,119874,79,119926,79,119978,79,120030,79,120082,79,120134,79,120186,79,120238,79,120290,79,120342,79,120394,79,120446,79,927,79,120502,79,120560,79,120618,79,120676,79,120734,79,11422,79,1365,79,11604,79,4816,79,2848,79,66754,79,42227,79,71861,79,66194,79,66219,79,66564,79,66838,79,9076,112,65360,112,119849,112,119901,112,119953,112,120005,112,120057,112,120109,112,120161,112,120213,112,120265,112,120317,112,120369,112,120421,112,120473,112,961,112,120530,112,120544,112,120588,112,120602,112,120646,112,120660,112,120704,112,120718,112,120762,112,120776,112,11427,112,65328,80,8473,80,119823,80,119875,80,119927,80,119979,80,120031,80,120083,80,120187,80,120239,80,120291,80,120343,80,120395,80,120447,80,929,80,120504,80,120562,80,120620,80,120678,80,120736,80,11426,80,5090,80,5229,80,42193,80,66197,80,119850,113,119902,113,119954,113,120006,113,120058,113,120110,113,120162,113,120214,113,120266,113,120318,113,120370,113,120422,113,120474,113,1307,113,1379,113,1382,113,8474,81,119824,81,119876,81,119928,81,119980,81,120032,81,120084,81,120188,81,120240,81,120292,81,120344,81,120396,81,120448,81,11605,81,119851,114,119903,114,119955,114,120007,114,120059,114,120111,114,120163,114,120215,114,120267,114,120319,114,120371,114,120423,114,120475,114,43847,114,43848,114,7462,114,11397,114,43905,114,119318,82,8475,82,8476,82,8477,82,119825,82,119877,82,119929,82,120033,82,120189,82,120241,82,120293,82,120345,82,120397,82,120449,82,422,82,5025,82,5074,82,66740,82,5511,82,42211,82,94005,82,65363,115,119852,115,119904,115,119956,115,120008,115,120060,115,120112,115,120164,115,120216,115,120268,115,120320,115,120372,115,120424,115,120476,115,42801,115,445,115,1109,115,43946,115,71873,115,66632,115,65331,83,119826,83,119878,83,119930,83,119982,83,120034,83,120086,83,120138,83,120190,83,120242,83,120294,83,120346,83,120398,83,120450,83,1029,83,1359,83,5077,83,5082,83,42210,83,94010,83,66198,83,66592,83,119853,116,119905,116,119957,116,120009,116,120061,116,120113,116,120165,116,120217,116,120269,116,120321,116,120373,116,120425,116,120477,116,8868,84,10201,84,128872,84,65332,84,119827,84,119879,84,119931,84,119983,84,120035,84,120087,84,120139,84,120191,84,120243,84,120295,84,120347,84,120399,84,120451,84,932,84,120507,84,120565,84,120623,84,120681,84,120739,84,11430,84,5026,84,42196,84,93962,84,71868,84,66199,84,66225,84,66325,84,119854,117,119906,117,119958,117,120010,117,120062,117,120114,117,120166,117,120218,117,120270,117,120322,117,120374,117,120426,117,120478,117,42911,117,7452,117,43854,117,43858,117,651,117,965,117,120534,117,120592,117,120650,117,120708,117,120766,117,1405,117,66806,117,71896,117,8746,85,8899,85,119828,85,119880,85,119932,85,119984,85,120036,85,120088,85,120140,85,120192,85,120244,85,120296,85,120348,85,120400,85,120452,85,1357,85,4608,85,66766,85,5196,85,42228,85,94018,85,71864,85,8744,118,8897,118,65366,118,8564,118,119855,118,119907,118,119959,118,120011,118,120063,118,120115,118,120167,118,120219,118,120271,118,120323,118,120375,118,120427,118,120479,118,7456,118,957,118,120526,118,120584,118,120642,118,120700,118,120758,118,1141,118,1496,118,71430,118,43945,118,71872,118,119309,86,1639,86,1783,86,8548,86,119829,86,119881,86,119933,86,119985,86,120037,86,120089,86,120141,86,120193,86,120245,86,120297,86,120349,86,120401,86,120453,86,1140,86,11576,86,5081,86,5167,86,42719,86,42214,86,93960,86,71840,86,66845,86,623,119,119856,119,119908,119,119960,119,120012,119,120064,119,120116,119,120168,119,120220,119,120272,119,120324,119,120376,119,120428,119,120480,119,7457,119,1121,119,1309,119,1377,119,71434,119,71438,119,71439,119,43907,119,71919,87,71910,87,119830,87,119882,87,119934,87,119986,87,120038,87,120090,87,120142,87,120194,87,120246,87,120298,87,120350,87,120402,87,120454,87,1308,87,5043,87,5076,87,42218,87,5742,120,10539,120,10540,120,10799,120,65368,120,8569,120,119857,120,119909,120,119961,120,120013,120,120065,120,120117,120,120169,120,120221,120,120273,120,120325,120,120377,120,120429,120,120481,120,5441,120,5501,120,5741,88,9587,88,66338,88,71916,88,65336,88,8553,88,119831,88,119883,88,119935,88,119987,88,120039,88,120091,88,120143,88,120195,88,120247,88,120299,88,120351,88,120403,88,120455,88,42931,88,935,88,120510,88,120568,88,120626,88,120684,88,120742,88,11436,88,11613,88,5815,88,42219,88,66192,88,66228,88,66327,88,66855,88,611,121,7564,121,65369,121,119858,121,119910,121,119962,121,120014,121,120066,121,120118,121,120170,121,120222,121,120274,121,120326,121,120378,121,120430,121,120482,121,655,121,7935,121,43866,121,947,121,8509,121,120516,121,120574,121,120632,121,120690,121,120748,121,1199,121,4327,121,71900,121,65337,89,119832,89,119884,89,119936,89,119988,89,120040,89,120092,89,120144,89,120196,89,120248,89,120300,89,120352,89,120404,89,120456,89,933,89,978,89,120508,89,120566,89,120624,89,120682,89,120740,89,11432,89,1198,89,5033,89,5053,89,42220,89,94019,89,71844,89,66226,89,119859,122,119911,122,119963,122,120015,122,120067,122,120119,122,120171,122,120223,122,120275,122,120327,122,120379,122,120431,122,120483,122,7458,122,43923,122,71876,122,66293,90,71909,90,65338,90,8484,90,8488,90,119833,90,119885,90,119937,90,119989,90,120041,90,120197,90,120249,90,120301,90,120353,90,120405,90,120457,90,918,90,120493,90,120551,90,120609,90,120667,90,120725,90,5059,90,42204,90,71849,90,65282,34,65284,36,65285,37,65286,38,65290,42,65291,43,65294,46,65295,47,65296,48,65297,49,65298,50,65299,51,65300,52,65301,53,65302,54,65303,55,65304,56,65305,57,65308,60,65309,61,65310,62,65312,64,65316,68,65318,70,65319,71,65324,76,65329,81,65330,82,65333,85,65334,86,65335,87,65343,95,65346,98,65348,100,65350,102,65355,107,65357,109,65358,110,65361,113,65362,114,65364,116,65365,117,65367,119,65370,122,65371,123,65373,125],"_default":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"cs":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"de":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"es":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"fr":[65374,126,65306,58,65281,33,8216,96,8245,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"it":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"ja":[8211,45,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65292,44,65307,59],"ko":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"pl":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"pt-BR":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"qps-ploc":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"ru":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,305,105,921,73,1009,112,215,120,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"tr":[160,32,8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"zh-hans":[65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41],"zh-hant":[8211,45,65374,126,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65307,59]}'
          )
        )),
        (A.cache = new n.LRUCachedComputed((e) => {
          function t(e) {
            const t = new Map();
            for (let n = 0; n < e.length; n += 2) t.set(e[n], e[n + 1]);
            return t;
          }
          function n(e, t) {
            if (!e) return t;
            const n = new Map();
            for (const [r, i] of e) t.has(r) && n.set(r, i);
            return n;
          }
          const r = i.ambiguousCharacterData.getValue();
          let o,
            s = e.filter((e) => !e.startsWith("_") && e in r);
          0 === s.length && (s = ["_default"]);
          for (const i of s) {
            o = n(o, t(r[i]));
          }
          const a = (function (e, t) {
            const n = new Map(e);
            for (const [r, i] of t) n.set(r, i);
            return n;
          })(t(r._common), o);
          return new A(a);
        })),
        (A._locales = new r.Lazy(() =>
          Object.keys(A.ambiguousCharacterData.getValue()).filter(
            (e) => !e.startsWith("_")
          )
        ));
      class M {
        static getRawData() {
          return JSON.parse(
            "[9,10,11,12,13,32,127,160,173,847,1564,4447,4448,6068,6069,6155,6156,6157,6158,7355,7356,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8203,8204,8205,8206,8207,8234,8235,8236,8237,8238,8239,8287,8288,8289,8290,8291,8292,8293,8294,8295,8296,8297,8298,8299,8300,8301,8302,8303,10240,12288,12644,65024,65025,65026,65027,65028,65029,65030,65031,65032,65033,65034,65035,65036,65037,65038,65039,65279,65440,65520,65521,65522,65523,65524,65525,65526,65527,65528,65532,78844,119155,119156,119157,119158,119159,119160,119161,119162,917504,917505,917506,917507,917508,917509,917510,917511,917512,917513,917514,917515,917516,917517,917518,917519,917520,917521,917522,917523,917524,917525,917526,917527,917528,917529,917530,917531,917532,917533,917534,917535,917536,917537,917538,917539,917540,917541,917542,917543,917544,917545,917546,917547,917548,917549,917550,917551,917552,917553,917554,917555,917556,917557,917558,917559,917560,917561,917562,917563,917564,917565,917566,917567,917568,917569,917570,917571,917572,917573,917574,917575,917576,917577,917578,917579,917580,917581,917582,917583,917584,917585,917586,917587,917588,917589,917590,917591,917592,917593,917594,917595,917596,917597,917598,917599,917600,917601,917602,917603,917604,917605,917606,917607,917608,917609,917610,917611,917612,917613,917614,917615,917616,917617,917618,917619,917620,917621,917622,917623,917624,917625,917626,917627,917628,917629,917630,917631,917760,917761,917762,917763,917764,917765,917766,917767,917768,917769,917770,917771,917772,917773,917774,917775,917776,917777,917778,917779,917780,917781,917782,917783,917784,917785,917786,917787,917788,917789,917790,917791,917792,917793,917794,917795,917796,917797,917798,917799,917800,917801,917802,917803,917804,917805,917806,917807,917808,917809,917810,917811,917812,917813,917814,917815,917816,917817,917818,917819,917820,917821,917822,917823,917824,917825,917826,917827,917828,917829,917830,917831,917832,917833,917834,917835,917836,917837,917838,917839,917840,917841,917842,917843,917844,917845,917846,917847,917848,917849,917850,917851,917852,917853,917854,917855,917856,917857,917858,917859,917860,917861,917862,917863,917864,917865,917866,917867,917868,917869,917870,917871,917872,917873,917874,917875,917876,917877,917878,917879,917880,917881,917882,917883,917884,917885,917886,917887,917888,917889,917890,917891,917892,917893,917894,917895,917896,917897,917898,917899,917900,917901,917902,917903,917904,917905,917906,917907,917908,917909,917910,917911,917912,917913,917914,917915,917916,917917,917918,917919,917920,917921,917922,917923,917924,917925,917926,917927,917928,917929,917930,917931,917932,917933,917934,917935,917936,917937,917938,917939,917940,917941,917942,917943,917944,917945,917946,917947,917948,917949,917950,917951,917952,917953,917954,917955,917956,917957,917958,917959,917960,917961,917962,917963,917964,917965,917966,917967,917968,917969,917970,917971,917972,917973,917974,917975,917976,917977,917978,917979,917980,917981,917982,917983,917984,917985,917986,917987,917988,917989,917990,917991,917992,917993,917994,917995,917996,917997,917998,917999]"
          );
        }
        static getData() {
          return (
            this._data || (this._data = new Set(M.getRawData())), this._data
          );
        }
        static isInvisibleCharacter(e) {
          return M.getData().has(e);
        }
        static get codePoints() {
          return M.getData();
        }
      }
      (t.InvisibleCharacters = M), (M._data = void 0);
    }),
    e(n[29], r([0, 1, 8, 3, 2]), function (e, t, n, r, i) {
      "use strict";
      function o(e) {
        return 47 === e || 92 === e;
      }
      function s(e) {
        return e.replace(/[\\/]/g, n.posix.sep);
      }
      function a(e) {
        return (e >= 65 && e <= 90) || (e >= 97 && e <= 122);
      }
      function l(e, t) {
        return (
          !!(void 0 !== t ? t : r.isWindows) &&
          a(e.charCodeAt(0)) &&
          58 === e.charCodeAt(1)
        );
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.hasDriveLetter =
          t.isRootOrDriveLetter =
          t.isWindowsDriveLetter =
          t.isEqualOrParent =
          t.getRoot =
          t.toPosixPath =
          t.toSlashes =
          t.isPathSeparator =
            void 0),
        (t.isPathSeparator = o),
        (t.toSlashes = s),
        (t.toPosixPath = function (e) {
          return (
            -1 === e.indexOf("/") && (e = s(e)),
            /^[a-zA-Z]:(\/|$)/.test(e) && (e = "/" + e),
            e
          );
        }),
        (t.getRoot = function (e, t = n.posix.sep) {
          if (!e) return "";
          const r = e.length,
            i = e.charCodeAt(0);
          if (o(i)) {
            if (o(e.charCodeAt(1)) && !o(e.charCodeAt(2))) {
              let n = 3;
              const i = n;
              for (; n < r && !o(e.charCodeAt(n)); n++);
              if (i !== n && !o(e.charCodeAt(n + 1)))
                for (n += 1; n < r; n++)
                  if (o(e.charCodeAt(n)))
                    return e.slice(0, n + 1).replace(/[\\/]/g, t);
            }
            return t;
          }
          if (a(i) && 58 === e.charCodeAt(1))
            return o(e.charCodeAt(2)) ? e.slice(0, 2) + t : e.slice(0, 2);
          let s = e.indexOf("://");
          if (-1 !== s)
            for (s += 3; s < r; s++)
              if (o(e.charCodeAt(s))) return e.slice(0, s + 1);
          return "";
        }),
        (t.isEqualOrParent = function (e, t, r, o = n.sep) {
          if (e === t) return !0;
          if (!e || !t || t.length > e.length) return !1;
          if (r) {
            if (!(0, i.startsWithIgnoreCase)(e, t)) return !1;
            if (t.length === e.length) return !0;
            let n = t.length;
            return t.charAt(t.length - 1) === o && n--, e.charAt(n) === o;
          }
          return t.charAt(t.length - 1) !== o && (t += o), 0 === e.indexOf(t);
        }),
        (t.isWindowsDriveLetter = a),
        (t.isRootOrDriveLetter = function (e) {
          const t = (0, n.normalize)(e);
          return r.isWindows
            ? !(e.length > 3) &&
                l(t) &&
                (2 === e.length || 92 === t.charCodeAt(2))
            : t === n.posix.sep;
        }),
        (t.hasDriveLetter = l);
    }),
    e(n[30], r([0, 1, 2]), function (e, t, n) {
      "use strict";
      function r(e, t) {
        switch (typeof e) {
          case "object":
            return null === e
              ? i(349, t)
              : Array.isArray(e)
              ? (function (e, t) {
                  return (t = i(104579, t)), e.reduce((e, t) => r(t, e), t);
                })(e, t)
              : (function (e, t) {
                  return (
                    (t = i(181387, t)),
                    Object.keys(e)
                      .sort()
                      .reduce((t, n) => ((t = o(n, t)), r(e[n], t)), t)
                  );
                })(e, t);
          case "string":
            return o(e, t);
          case "boolean":
            return (function (e, t) {
              return i(e ? 433 : 863, t);
            })(e, t);
          case "number":
            return i(e, t);
          case "undefined":
            return i(937, t);
          default:
            return i(617, t);
        }
      }
      function i(e, t) {
        return ((t << 5) - t + e) | 0;
      }
      function o(e, t) {
        t = i(149417, t);
        for (let n = 0, r = e.length; n < r; n++) t = i(e.charCodeAt(n), t);
        return t;
      }
      function s(e, t, n = 32) {
        const r = n - t;
        return ((e << t) | ((~((1 << r) - 1) & e) >>> r)) >>> 0;
      }
      function a(e, t = 0, n = e.byteLength, r = 0) {
        for (let i = 0; i < n; i++) e[t + i] = r;
      }
      function l(e, t = 32) {
        return e instanceof ArrayBuffer
          ? Array.from(new Uint8Array(e))
              .map((e) => e.toString(16).padStart(2, "0"))
              .join("")
          : (function (e, t, n = "0") {
              for (; e.length < t; ) e = n + e;
              return e;
            })((e >>> 0).toString(16), t / 4);
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.StringSHA1 =
          t.toHexString =
          t.stringHash =
          t.numberHash =
          t.doHash =
          t.hash =
            void 0),
        (t.hash = function (e) {
          return r(e, 0);
        }),
        (t.doHash = r),
        (t.numberHash = i),
        (t.stringHash = o),
        (t.toHexString = l);
      class u {
        constructor() {
          (this._h0 = 1732584193),
            (this._h1 = 4023233417),
            (this._h2 = 2562383102),
            (this._h3 = 271733878),
            (this._h4 = 3285377520),
            (this._buff = new Uint8Array(67)),
            (this._buffDV = new DataView(this._buff.buffer)),
            (this._buffLen = 0),
            (this._totalLen = 0),
            (this._leftoverHighSurrogate = 0),
            (this._finished = !1);
        }
        update(e) {
          const t = e.length;
          if (0 === t) return;
          const r = this._buff;
          let i,
            o,
            s = this._buffLen,
            a = this._leftoverHighSurrogate;
          for (
            0 !== a
              ? ((i = a), (o = -1), (a = 0))
              : ((i = e.charCodeAt(0)), (o = 0));
            ;

          ) {
            let l = i;
            if (n.isHighSurrogate(i)) {
              if (!(o + 1 < t)) {
                a = i;
                break;
              }
              {
                const t = e.charCodeAt(o + 1);
                n.isLowSurrogate(t)
                  ? (o++, (l = n.computeCodePoint(i, t)))
                  : (l = 65533);
              }
            } else n.isLowSurrogate(i) && (l = 65533);
            if (((s = this._push(r, s, l)), o++, !(o < t))) break;
            i = e.charCodeAt(o);
          }
          (this._buffLen = s), (this._leftoverHighSurrogate = a);
        }
        _push(e, t, n) {
          return (
            n < 128
              ? (e[t++] = n)
              : n < 2048
              ? ((e[t++] = 192 | ((1984 & n) >>> 6)),
                (e[t++] = 128 | ((63 & n) >>> 0)))
              : n < 65536
              ? ((e[t++] = 224 | ((61440 & n) >>> 12)),
                (e[t++] = 128 | ((4032 & n) >>> 6)),
                (e[t++] = 128 | ((63 & n) >>> 0)))
              : ((e[t++] = 240 | ((1835008 & n) >>> 18)),
                (e[t++] = 128 | ((258048 & n) >>> 12)),
                (e[t++] = 128 | ((4032 & n) >>> 6)),
                (e[t++] = 128 | ((63 & n) >>> 0))),
            t >= 64 &&
              (this._step(),
              (t -= 64),
              (this._totalLen += 64),
              (e[0] = e[64]),
              (e[1] = e[65]),
              (e[2] = e[66])),
            t
          );
        }
        digest() {
          return (
            this._finished ||
              ((this._finished = !0),
              this._leftoverHighSurrogate &&
                ((this._leftoverHighSurrogate = 0),
                (this._buffLen = this._push(this._buff, this._buffLen, 65533))),
              (this._totalLen += this._buffLen),
              this._wrapUp()),
            l(this._h0) + l(this._h1) + l(this._h2) + l(this._h3) + l(this._h4)
          );
        }
        _wrapUp() {
          (this._buff[this._buffLen++] = 128),
            a(this._buff, this._buffLen),
            this._buffLen > 56 && (this._step(), a(this._buff));
          const e = 8 * this._totalLen;
          this._buffDV.setUint32(56, Math.floor(e / 4294967296), !1),
            this._buffDV.setUint32(60, e % 4294967296, !1),
            this._step();
        }
        _step() {
          const e = u._bigBlock32,
            t = this._buffDV;
          for (let s = 0; s < 64; s += 4)
            e.setUint32(s, t.getUint32(s, !1), !1);
          for (let u = 64; u < 320; u += 4)
            e.setUint32(
              u,
              s(
                e.getUint32(u - 12, !1) ^
                  e.getUint32(u - 32, !1) ^
                  e.getUint32(u - 56, !1) ^
                  e.getUint32(u - 64, !1),
                1
              ),
              !1
            );
          let n,
            r,
            i,
            o = this._h0,
            a = this._h1,
            l = this._h2,
            c = this._h3,
            h = this._h4;
          for (let u = 0; u < 80; u++)
            u < 20
              ? ((n = (a & l) | (~a & c)), (r = 1518500249))
              : u < 40
              ? ((n = a ^ l ^ c), (r = 1859775393))
              : u < 60
              ? ((n = (a & l) | (a & c) | (l & c)), (r = 2400959708))
              : ((n = a ^ l ^ c), (r = 3395469782)),
              (i = (s(o, 5) + n + h + r + e.getUint32(4 * u, !1)) & 4294967295),
              (h = c),
              (c = l),
              (l = s(a, 30)),
              (a = o),
              (o = i);
          (this._h0 = (this._h0 + o) & 4294967295),
            (this._h1 = (this._h1 + a) & 4294967295),
            (this._h2 = (this._h2 + l) & 4294967295),
            (this._h3 = (this._h3 + c) & 4294967295),
            (this._h4 = (this._h4 + h) & 4294967295);
        }
      }
      (t.StringSHA1 = u), (u._bigBlock32 = new DataView(new ArrayBuffer(320)));
    }),
    e(n[14], r([0, 1, 21, 30]), function (e, t, n, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.LcsDiff =
          t.MyArray =
          t.Debug =
          t.stringDiff =
          t.StringDiffSequence =
            void 0);
      class i {
        constructor(e) {
          this.source = e;
        }
        getElements() {
          const e = this.source,
            t = new Int32Array(e.length);
          for (let n = 0, r = e.length; n < r; n++) t[n] = e.charCodeAt(n);
          return t;
        }
      }
      (t.StringDiffSequence = i),
        (t.stringDiff = function (e, t, n) {
          return new l(new i(e), new i(t)).ComputeDiff(n).changes;
        });
      class o {
        static Assert(e, t) {
          if (!e) throw new Error(t);
        }
      }
      t.Debug = o;
      class s {
        static Copy(e, t, n, r, i) {
          for (let o = 0; o < i; o++) n[r + o] = e[t + o];
        }
        static Copy2(e, t, n, r, i) {
          for (let o = 0; o < i; o++) n[r + o] = e[t + o];
        }
      }
      t.MyArray = s;
      class a {
        constructor() {
          (this.m_changes = []),
            (this.m_originalStart = 1073741824),
            (this.m_modifiedStart = 1073741824),
            (this.m_originalCount = 0),
            (this.m_modifiedCount = 0);
        }
        MarkNextChange() {
          (this.m_originalCount > 0 || this.m_modifiedCount > 0) &&
            this.m_changes.push(
              new n.DiffChange(
                this.m_originalStart,
                this.m_originalCount,
                this.m_modifiedStart,
                this.m_modifiedCount
              )
            ),
            (this.m_originalCount = 0),
            (this.m_modifiedCount = 0),
            (this.m_originalStart = 1073741824),
            (this.m_modifiedStart = 1073741824);
        }
        AddOriginalElement(e, t) {
          (this.m_originalStart = Math.min(this.m_originalStart, e)),
            (this.m_modifiedStart = Math.min(this.m_modifiedStart, t)),
            this.m_originalCount++;
        }
        AddModifiedElement(e, t) {
          (this.m_originalStart = Math.min(this.m_originalStart, e)),
            (this.m_modifiedStart = Math.min(this.m_modifiedStart, t)),
            this.m_modifiedCount++;
        }
        getChanges() {
          return (
            (this.m_originalCount > 0 || this.m_modifiedCount > 0) &&
              this.MarkNextChange(),
            this.m_changes
          );
        }
        getReverseChanges() {
          return (
            (this.m_originalCount > 0 || this.m_modifiedCount > 0) &&
              this.MarkNextChange(),
            this.m_changes.reverse(),
            this.m_changes
          );
        }
      }
      class l {
        constructor(e, t, n = null) {
          (this.ContinueProcessingPredicate = n),
            (this._originalSequence = e),
            (this._modifiedSequence = t);
          const [r, i, o] = l._getElements(e),
            [s, a, u] = l._getElements(t);
          (this._hasStrings = o && u),
            (this._originalStringElements = r),
            (this._originalElementsOrHash = i),
            (this._modifiedStringElements = s),
            (this._modifiedElementsOrHash = a),
            (this.m_forwardHistory = []),
            (this.m_reverseHistory = []);
        }
        static _isStringArray(e) {
          return e.length > 0 && "string" == typeof e[0];
        }
        static _getElements(e) {
          const t = e.getElements();
          if (l._isStringArray(t)) {
            const e = new Int32Array(t.length);
            for (let n = 0, i = t.length; n < i; n++)
              e[n] = (0, r.stringHash)(t[n], 0);
            return [t, e, !0];
          }
          return t instanceof Int32Array
            ? [[], t, !1]
            : [[], new Int32Array(t), !1];
        }
        ElementsAreEqual(e, t) {
          return (
            this._originalElementsOrHash[e] ===
              this._modifiedElementsOrHash[t] &&
            (!this._hasStrings ||
              this._originalStringElements[e] ===
                this._modifiedStringElements[t])
          );
        }
        ElementsAreStrictEqual(e, t) {
          if (!this.ElementsAreEqual(e, t)) return !1;
          return (
            l._getStrictElement(this._originalSequence, e) ===
            l._getStrictElement(this._modifiedSequence, t)
          );
        }
        static _getStrictElement(e, t) {
          return "function" == typeof e.getStrictElement
            ? e.getStrictElement(t)
            : null;
        }
        OriginalElementsAreEqual(e, t) {
          return (
            this._originalElementsOrHash[e] ===
              this._originalElementsOrHash[t] &&
            (!this._hasStrings ||
              this._originalStringElements[e] ===
                this._originalStringElements[t])
          );
        }
        ModifiedElementsAreEqual(e, t) {
          return (
            this._modifiedElementsOrHash[e] ===
              this._modifiedElementsOrHash[t] &&
            (!this._hasStrings ||
              this._modifiedStringElements[e] ===
                this._modifiedStringElements[t])
          );
        }
        ComputeDiff(e) {
          return this._ComputeDiff(
            0,
            this._originalElementsOrHash.length - 1,
            0,
            this._modifiedElementsOrHash.length - 1,
            e
          );
        }
        _ComputeDiff(e, t, n, r, i) {
          const o = [!1];
          let s = this.ComputeDiffRecursive(e, t, n, r, o);
          return (
            i && (s = this.PrettifyChanges(s)), { quitEarly: o[0], changes: s }
          );
        }
        ComputeDiffRecursive(e, t, r, i, s) {
          for (s[0] = !1; e <= t && r <= i && this.ElementsAreEqual(e, r); )
            e++, r++;
          for (; t >= e && i >= r && this.ElementsAreEqual(t, i); ) t--, i--;
          if (e > t || r > i) {
            let s;
            return (
              r <= i
                ? (o.Assert(
                    e === t + 1,
                    "originalStart should only be one more than originalEnd"
                  ),
                  (s = [new n.DiffChange(e, 0, r, i - r + 1)]))
                : e <= t
                ? (o.Assert(
                    r === i + 1,
                    "modifiedStart should only be one more than modifiedEnd"
                  ),
                  (s = [new n.DiffChange(e, t - e + 1, r, 0)]))
                : (o.Assert(
                    e === t + 1,
                    "originalStart should only be one more than originalEnd"
                  ),
                  o.Assert(
                    r === i + 1,
                    "modifiedStart should only be one more than modifiedEnd"
                  ),
                  (s = [])),
              s
            );
          }
          const a = [0],
            l = [0],
            u = this.ComputeRecursionPoint(e, t, r, i, a, l, s),
            c = a[0],
            h = l[0];
          if (null !== u) return u;
          if (!s[0]) {
            const o = this.ComputeDiffRecursive(e, c, r, h, s);
            let a = [];
            return (
              (a = s[0]
                ? [
                    new n.DiffChange(
                      c + 1,
                      t - (c + 1) + 1,
                      h + 1,
                      i - (h + 1) + 1
                    ),
                  ]
                : this.ComputeDiffRecursive(c + 1, t, h + 1, i, s)),
              this.ConcatenateChanges(o, a)
            );
          }
          return [new n.DiffChange(e, t - e + 1, r, i - r + 1)];
        }
        WALKTRACE(e, t, r, i, o, s, l, u, c, h, d, f, g, m, p, _, b, C) {
          let y = null,
            v = null,
            w = new a(),
            S = t,
            E = r,
            L = g[0] - _[0] - i,
            A = -1073741824,
            M = this.m_forwardHistory.length - 1;
          do {
            const t = L + e;
            t === S || (t < E && c[t - 1] < c[t + 1])
              ? ((m = (d = c[t + 1]) - L - i),
                d < A && w.MarkNextChange(),
                (A = d),
                w.AddModifiedElement(d + 1, m),
                (L = t + 1 - e))
              : ((m = (d = c[t - 1] + 1) - L - i),
                d < A && w.MarkNextChange(),
                (A = d - 1),
                w.AddOriginalElement(d, m + 1),
                (L = t - 1 - e)),
              M >= 0 &&
                ((e = (c = this.m_forwardHistory[M])[0]),
                (S = 1),
                (E = c.length - 1));
          } while (--M >= -1);
          if (((y = w.getReverseChanges()), C[0])) {
            let e = g[0] + 1,
              t = _[0] + 1;
            if (null !== y && y.length > 0) {
              const n = y[y.length - 1];
              (e = Math.max(e, n.getOriginalEnd())),
                (t = Math.max(t, n.getModifiedEnd()));
            }
            v = [new n.DiffChange(e, f - e + 1, t, p - t + 1)];
          } else {
            (w = new a()),
              (S = s),
              (E = l),
              (L = g[0] - _[0] - u),
              (A = 1073741824),
              (M = b
                ? this.m_reverseHistory.length - 1
                : this.m_reverseHistory.length - 2);
            do {
              const e = L + o;
              e === S || (e < E && h[e - 1] >= h[e + 1])
                ? ((m = (d = h[e + 1] - 1) - L - u),
                  d > A && w.MarkNextChange(),
                  (A = d + 1),
                  w.AddOriginalElement(d + 1, m + 1),
                  (L = e + 1 - o))
                : ((m = (d = h[e - 1]) - L - u),
                  d > A && w.MarkNextChange(),
                  (A = d),
                  w.AddModifiedElement(d + 1, m + 1),
                  (L = e - 1 - o)),
                M >= 0 &&
                  ((o = (h = this.m_reverseHistory[M])[0]),
                  (S = 1),
                  (E = h.length - 1));
            } while (--M >= -1);
            v = w.getChanges();
          }
          return this.ConcatenateChanges(y, v);
        }
        ComputeRecursionPoint(e, t, r, i, o, a, l) {
          let u = 0,
            c = 0,
            h = 0,
            d = 0,
            f = 0,
            g = 0;
          e--,
            r--,
            (o[0] = 0),
            (a[0] = 0),
            (this.m_forwardHistory = []),
            (this.m_reverseHistory = []);
          const m = t - e + (i - r),
            p = m + 1,
            _ = new Int32Array(p),
            b = new Int32Array(p),
            C = i - r,
            y = t - e,
            v = e - r,
            w = t - i,
            S = (y - C) % 2 == 0;
          (_[C] = e), (b[y] = t), (l[0] = !1);
          for (let E = 1; E <= m / 2 + 1; E++) {
            let m = 0,
              L = 0;
            (h = this.ClipDiagonalBound(C - E, E, C, p)),
              (d = this.ClipDiagonalBound(C + E, E, C, p));
            for (let e = h; e <= d; e += 2) {
              (u =
                e === h || (e < d && _[e - 1] < _[e + 1])
                  ? _[e + 1]
                  : _[e - 1] + 1),
                (c = u - (e - C) - v);
              const n = u;
              for (; u < t && c < i && this.ElementsAreEqual(u + 1, c + 1); )
                u++, c++;
              if (
                ((_[e] = u),
                u + c > m + L && ((m = u), (L = c)),
                !S && Math.abs(e - y) <= E - 1 && u >= b[e])
              )
                return (
                  (o[0] = u),
                  (a[0] = c),
                  n <= b[e] && E <= 1448
                    ? this.WALKTRACE(
                        C,
                        h,
                        d,
                        v,
                        y,
                        f,
                        g,
                        w,
                        _,
                        b,
                        u,
                        t,
                        o,
                        c,
                        i,
                        a,
                        S,
                        l
                      )
                    : null
                );
            }
            const A = (m - e + (L - r) - E) / 2;
            if (
              null !== this.ContinueProcessingPredicate &&
              !this.ContinueProcessingPredicate(m, A)
            )
              return (
                (l[0] = !0),
                (o[0] = m),
                (a[0] = L),
                A > 0 && E <= 1448
                  ? this.WALKTRACE(
                      C,
                      h,
                      d,
                      v,
                      y,
                      f,
                      g,
                      w,
                      _,
                      b,
                      u,
                      t,
                      o,
                      c,
                      i,
                      a,
                      S,
                      l
                    )
                  : (e++, r++, [new n.DiffChange(e, t - e + 1, r, i - r + 1)])
              );
            (f = this.ClipDiagonalBound(y - E, E, y, p)),
              (g = this.ClipDiagonalBound(y + E, E, y, p));
            for (let n = f; n <= g; n += 2) {
              (u =
                n === f || (n < g && b[n - 1] >= b[n + 1])
                  ? b[n + 1] - 1
                  : b[n - 1]),
                (c = u - (n - y) - w);
              const s = u;
              for (; u > e && c > r && this.ElementsAreEqual(u, c); ) u--, c--;
              if (((b[n] = u), S && Math.abs(n - C) <= E && u <= _[n]))
                return (
                  (o[0] = u),
                  (a[0] = c),
                  s >= _[n] && E <= 1448
                    ? this.WALKTRACE(
                        C,
                        h,
                        d,
                        v,
                        y,
                        f,
                        g,
                        w,
                        _,
                        b,
                        u,
                        t,
                        o,
                        c,
                        i,
                        a,
                        S,
                        l
                      )
                    : null
                );
            }
            if (E <= 1447) {
              let e = new Int32Array(d - h + 2);
              (e[0] = C - h + 1),
                s.Copy2(_, h, e, 1, d - h + 1),
                this.m_forwardHistory.push(e),
                (e = new Int32Array(g - f + 2)),
                (e[0] = y - f + 1),
                s.Copy2(b, f, e, 1, g - f + 1),
                this.m_reverseHistory.push(e);
            }
          }
          return this.WALKTRACE(
            C,
            h,
            d,
            v,
            y,
            f,
            g,
            w,
            _,
            b,
            u,
            t,
            o,
            c,
            i,
            a,
            S,
            l
          );
        }
        PrettifyChanges(e) {
          for (let t = 0; t < e.length; t++) {
            const n = e[t],
              r =
                t < e.length - 1
                  ? e[t + 1].originalStart
                  : this._originalElementsOrHash.length,
              i =
                t < e.length - 1
                  ? e[t + 1].modifiedStart
                  : this._modifiedElementsOrHash.length,
              o = n.originalLength > 0,
              s = n.modifiedLength > 0;
            for (
              ;
              n.originalStart + n.originalLength < r &&
              n.modifiedStart + n.modifiedLength < i &&
              (!o ||
                this.OriginalElementsAreEqual(
                  n.originalStart,
                  n.originalStart + n.originalLength
                )) &&
              (!s ||
                this.ModifiedElementsAreEqual(
                  n.modifiedStart,
                  n.modifiedStart + n.modifiedLength
                ));

            ) {
              const e = this.ElementsAreStrictEqual(
                n.originalStart,
                n.modifiedStart
              );
              if (
                this.ElementsAreStrictEqual(
                  n.originalStart + n.originalLength,
                  n.modifiedStart + n.modifiedLength
                ) &&
                !e
              )
                break;
              n.originalStart++, n.modifiedStart++;
            }
            let a = [null];
            t < e.length - 1 &&
              this.ChangesOverlap(e[t], e[t + 1], a) &&
              ((e[t] = a[0]), e.splice(t + 1, 1), t--);
          }
          for (let t = e.length - 1; t >= 0; t--) {
            const n = e[t];
            let r = 0,
              i = 0;
            if (t > 0) {
              const n = e[t - 1];
              (r = n.originalStart + n.originalLength),
                (i = n.modifiedStart + n.modifiedLength);
            }
            const o = n.originalLength > 0,
              s = n.modifiedLength > 0;
            let a = 0,
              l = this._boundaryScore(
                n.originalStart,
                n.originalLength,
                n.modifiedStart,
                n.modifiedLength
              );
            for (let e = 1; ; e++) {
              const t = n.originalStart - e,
                u = n.modifiedStart - e;
              if (
                t < r ||
                u < i ||
                (o &&
                  !this.OriginalElementsAreEqual(t, t + n.originalLength)) ||
                (s && !this.ModifiedElementsAreEqual(u, u + n.modifiedLength))
              )
                break;
              const c =
                (t === r && u === i ? 5 : 0) +
                this._boundaryScore(t, n.originalLength, u, n.modifiedLength);
              c > l && ((l = c), (a = e));
            }
            (n.originalStart -= a), (n.modifiedStart -= a);
            const u = [null];
            t > 0 &&
              this.ChangesOverlap(e[t - 1], e[t], u) &&
              ((e[t - 1] = u[0]), e.splice(t, 1), t++);
          }
          if (this._hasStrings)
            for (let t = 1, n = e.length; t < n; t++) {
              const n = e[t - 1],
                r = e[t],
                i = r.originalStart - n.originalStart - n.originalLength,
                o = n.originalStart,
                s = r.originalStart + r.originalLength,
                a = s - o,
                l = n.modifiedStart,
                u = r.modifiedStart + r.modifiedLength,
                c = u - l;
              if (i < 5 && a < 20 && c < 20) {
                const e = this._findBetterContiguousSequence(o, a, l, c, i);
                if (e) {
                  const [t, o] = e;
                  (t !== n.originalStart + n.originalLength ||
                    o !== n.modifiedStart + n.modifiedLength) &&
                    ((n.originalLength = t - n.originalStart),
                    (n.modifiedLength = o - n.modifiedStart),
                    (r.originalStart = t + i),
                    (r.modifiedStart = o + i),
                    (r.originalLength = s - r.originalStart),
                    (r.modifiedLength = u - r.modifiedStart));
                }
              }
            }
          return e;
        }
        _findBetterContiguousSequence(e, t, n, r, i) {
          if (t < i || r < i) return null;
          const o = e + t - i + 1,
            s = n + r - i + 1;
          let a = 0,
            l = 0,
            u = 0;
          for (let c = e; c < o; c++)
            for (let e = n; e < s; e++) {
              const t = this._contiguousSequenceScore(c, e, i);
              t > 0 && t > a && ((a = t), (l = c), (u = e));
            }
          return a > 0 ? [l, u] : null;
        }
        _contiguousSequenceScore(e, t, n) {
          let r = 0;
          for (let i = 0; i < n; i++) {
            if (!this.ElementsAreEqual(e + i, t + i)) return 0;
            r += this._originalStringElements[e + i].length;
          }
          return r;
        }
        _OriginalIsBoundary(e) {
          return (
            e <= 0 ||
            e >= this._originalElementsOrHash.length - 1 ||
            (this._hasStrings && /^\s*$/.test(this._originalStringElements[e]))
          );
        }
        _OriginalRegionIsBoundary(e, t) {
          if (this._OriginalIsBoundary(e) || this._OriginalIsBoundary(e - 1))
            return !0;
          if (t > 0) {
            const n = e + t;
            if (this._OriginalIsBoundary(n - 1) || this._OriginalIsBoundary(n))
              return !0;
          }
          return !1;
        }
        _ModifiedIsBoundary(e) {
          return (
            e <= 0 ||
            e >= this._modifiedElementsOrHash.length - 1 ||
            (this._hasStrings && /^\s*$/.test(this._modifiedStringElements[e]))
          );
        }
        _ModifiedRegionIsBoundary(e, t) {
          if (this._ModifiedIsBoundary(e) || this._ModifiedIsBoundary(e - 1))
            return !0;
          if (t > 0) {
            const n = e + t;
            if (this._ModifiedIsBoundary(n - 1) || this._ModifiedIsBoundary(n))
              return !0;
          }
          return !1;
        }
        _boundaryScore(e, t, n, r) {
          return (
            (this._OriginalRegionIsBoundary(e, t) ? 1 : 0) +
            (this._ModifiedRegionIsBoundary(n, r) ? 1 : 0)
          );
        }
        ConcatenateChanges(e, t) {
          let n = [];
          if (0 === e.length || 0 === t.length) return t.length > 0 ? t : e;
          if (this.ChangesOverlap(e[e.length - 1], t[0], n)) {
            const r = new Array(e.length + t.length - 1);
            return (
              s.Copy(e, 0, r, 0, e.length - 1),
              (r[e.length - 1] = n[0]),
              s.Copy(t, 1, r, e.length, t.length - 1),
              r
            );
          }
          {
            const n = new Array(e.length + t.length);
            return (
              s.Copy(e, 0, n, 0, e.length),
              s.Copy(t, 0, n, e.length, t.length),
              n
            );
          }
        }
        ChangesOverlap(e, t, r) {
          if (
            (o.Assert(
              e.originalStart <= t.originalStart,
              "Left change is not less than or equal to right change"
            ),
            o.Assert(
              e.modifiedStart <= t.modifiedStart,
              "Left change is not less than or equal to right change"
            ),
            e.originalStart + e.originalLength >= t.originalStart ||
              e.modifiedStart + e.modifiedLength >= t.modifiedStart)
          ) {
            const i = e.originalStart;
            let o = e.originalLength;
            const s = e.modifiedStart;
            let a = e.modifiedLength;
            return (
              e.originalStart + e.originalLength >= t.originalStart &&
                (o = t.originalStart + t.originalLength - e.originalStart),
              e.modifiedStart + e.modifiedLength >= t.modifiedStart &&
                (a = t.modifiedStart + t.modifiedLength - e.modifiedStart),
              (r[0] = new n.DiffChange(i, o, s, a)),
              !0
            );
          }
          return (r[0] = null), !1;
        }
        ClipDiagonalBound(e, t, n, r) {
          if (e >= 0 && e < r) return e;
          const i = t % 2 == 0;
          if (e < 0) {
            return i === (n % 2 == 0) ? 0 : 1;
          }
          return i === ((r - n - 1) % 2 == 0) ? r - 1 : r - 2;
        }
      }
      t.LcsDiff = l;
    }),
    e(n[31], r([0, 1, 2]), function (e, t, n) {
      "use strict";
      var r, i;
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.LRUCache =
          t.LinkedMap =
          t.ResourceMap =
          t.TernarySearchTree =
          t.UriIterator =
          t.PathIterator =
          t.ConfigKeysIterator =
          t.StringIterator =
            void 0);
      class o {
        constructor() {
          (this._value = ""), (this._pos = 0);
        }
        reset(e) {
          return (this._value = e), (this._pos = 0), this;
        }
        next() {
          return (this._pos += 1), this;
        }
        hasNext() {
          return this._pos < this._value.length - 1;
        }
        cmp(e) {
          return e.charCodeAt(0) - this._value.charCodeAt(this._pos);
        }
        value() {
          return this._value[this._pos];
        }
      }
      t.StringIterator = o;
      class s {
        constructor(e = !0) {
          this._caseSensitive = e;
        }
        reset(e) {
          return (
            (this._value = e), (this._from = 0), (this._to = 0), this.next()
          );
        }
        hasNext() {
          return this._to < this._value.length;
        }
        next() {
          this._from = this._to;
          let e = !0;
          for (; this._to < this._value.length; this._to++)
            if (46 === this._value.charCodeAt(this._to)) {
              if (!e) break;
              this._from++;
            } else e = !1;
          return this;
        }
        cmp(e) {
          return this._caseSensitive
            ? (0, n.compareSubstring)(
                e,
                this._value,
                0,
                e.length,
                this._from,
                this._to
              )
            : (0, n.compareSubstringIgnoreCase)(
                e,
                this._value,
                0,
                e.length,
                this._from,
                this._to
              );
        }
        value() {
          return this._value.substring(this._from, this._to);
        }
      }
      t.ConfigKeysIterator = s;
      class a {
        constructor(e = !0, t = !0) {
          (this._splitOnBackslash = e), (this._caseSensitive = t);
        }
        reset(e) {
          (this._from = 0),
            (this._to = 0),
            (this._value = e),
            (this._valueLen = e.length);
          for (let t = e.length - 1; t >= 0; t--, this._valueLen--) {
            const e = this._value.charCodeAt(t);
            if (!(47 === e || (this._splitOnBackslash && 92 === e))) break;
          }
          return this.next();
        }
        hasNext() {
          return this._to < this._valueLen;
        }
        next() {
          this._from = this._to;
          let e = !0;
          for (; this._to < this._valueLen; this._to++) {
            const t = this._value.charCodeAt(this._to);
            if (47 === t || (this._splitOnBackslash && 92 === t)) {
              if (!e) break;
              this._from++;
            } else e = !1;
          }
          return this;
        }
        cmp(e) {
          return this._caseSensitive
            ? (0, n.compareSubstring)(
                e,
                this._value,
                0,
                e.length,
                this._from,
                this._to
              )
            : (0, n.compareSubstringIgnoreCase)(
                e,
                this._value,
                0,
                e.length,
                this._from,
                this._to
              );
        }
        value() {
          return this._value.substring(this._from, this._to);
        }
      }
      t.PathIterator = a;
      class l {
        constructor(e) {
          (this._ignorePathCasing = e),
            (this._states = []),
            (this._stateIdx = 0);
        }
        reset(e) {
          return (
            (this._value = e),
            (this._states = []),
            this._value.scheme && this._states.push(1),
            this._value.authority && this._states.push(2),
            this._value.path &&
              ((this._pathIterator = new a(!1, !this._ignorePathCasing(e))),
              this._pathIterator.reset(e.path),
              this._pathIterator.value() && this._states.push(3)),
            this._value.query && this._states.push(4),
            this._value.fragment && this._states.push(5),
            (this._stateIdx = 0),
            this
          );
        }
        next() {
          return (
            3 === this._states[this._stateIdx] && this._pathIterator.hasNext()
              ? this._pathIterator.next()
              : (this._stateIdx += 1),
            this
          );
        }
        hasNext() {
          return (
            (3 === this._states[this._stateIdx] &&
              this._pathIterator.hasNext()) ||
            this._stateIdx < this._states.length - 1
          );
        }
        cmp(e) {
          if (1 === this._states[this._stateIdx])
            return (0, n.compareIgnoreCase)(e, this._value.scheme);
          if (2 === this._states[this._stateIdx])
            return (0, n.compareIgnoreCase)(e, this._value.authority);
          if (3 === this._states[this._stateIdx])
            return this._pathIterator.cmp(e);
          if (4 === this._states[this._stateIdx])
            return (0, n.compare)(e, this._value.query);
          if (5 === this._states[this._stateIdx])
            return (0, n.compare)(e, this._value.fragment);
          throw new Error();
        }
        value() {
          if (1 === this._states[this._stateIdx]) return this._value.scheme;
          if (2 === this._states[this._stateIdx]) return this._value.authority;
          if (3 === this._states[this._stateIdx])
            return this._pathIterator.value();
          if (4 === this._states[this._stateIdx]) return this._value.query;
          if (5 === this._states[this._stateIdx]) return this._value.fragment;
          throw new Error();
        }
      }
      t.UriIterator = l;
      class u {
        constructor() {
          this.height = 1;
        }
        rotateLeft() {
          const e = this.right;
          return (
            (this.right = e.left),
            (e.left = this),
            this.updateHeight(),
            e.updateHeight(),
            e
          );
        }
        rotateRight() {
          const e = this.left;
          return (
            (this.left = e.right),
            (e.right = this),
            this.updateHeight(),
            e.updateHeight(),
            e
          );
        }
        updateHeight() {
          this.height = 1 + Math.max(this.heightLeft, this.heightRight);
        }
        balanceFactor() {
          return this.heightRight - this.heightLeft;
        }
        get heightLeft() {
          var e, t;
          return null !==
            (t =
              null === (e = this.left) || void 0 === e ? void 0 : e.height) &&
            void 0 !== t
            ? t
            : 0;
        }
        get heightRight() {
          var e, t;
          return null !==
            (t =
              null === (e = this.right) || void 0 === e ? void 0 : e.height) &&
            void 0 !== t
            ? t
            : 0;
        }
      }
      class c {
        constructor(e) {
          this._iter = e;
        }
        static forUris(e = () => !1) {
          return new c(new l(e));
        }
        static forStrings() {
          return new c(new o());
        }
        static forConfigKeys() {
          return new c(new s());
        }
        clear() {
          this._root = void 0;
        }
        set(e, t) {
          const n = this._iter.reset(e);
          let r;
          this._root ||
            ((this._root = new u()), (this._root.segment = n.value()));
          const i = [];
          for (r = this._root; ; ) {
            const e = n.cmp(r.segment);
            if (e > 0)
              r.left || ((r.left = new u()), (r.left.segment = n.value())),
                i.push([-1, r]),
                (r = r.left);
            else if (e < 0)
              r.right || ((r.right = new u()), (r.right.segment = n.value())),
                i.push([1, r]),
                (r = r.right);
            else {
              if (!n.hasNext()) break;
              n.next(),
                r.mid || ((r.mid = new u()), (r.mid.segment = n.value())),
                i.push([0, r]),
                (r = r.mid);
            }
          }
          const o = r.value;
          (r.value = t), (r.key = e);
          for (let s = i.length - 1; s >= 0; s--) {
            const e = i[s][1];
            e.updateHeight();
            const t = e.balanceFactor();
            if (t < -1 || t > 1) {
              const t = i[s][0],
                n = i[s + 1][0];
              if (1 === t && 1 === n) i[s][1] = e.rotateLeft();
              else if (-1 === t && -1 === n) i[s][1] = e.rotateRight();
              else if (1 === t && -1 === n)
                (e.right = i[s + 1][1] = i[s + 1][1].rotateRight()),
                  (i[s][1] = e.rotateLeft());
              else {
                if (-1 !== t || 1 !== n) throw new Error();
                (e.left = i[s + 1][1] = i[s + 1][1].rotateLeft()),
                  (i[s][1] = e.rotateRight());
              }
              if (s > 0)
                switch (i[s - 1][0]) {
                  case -1:
                    i[s - 1][1].left = i[s][1];
                    break;
                  case 1:
                    i[s - 1][1].right = i[s][1];
                    break;
                  case 0:
                    i[s - 1][1].mid = i[s][1];
                }
              else this._root = i[0][1];
            }
          }
          return o;
        }
        get(e) {
          var t;
          return null === (t = this._getNode(e)) || void 0 === t
            ? void 0
            : t.value;
        }
        _getNode(e) {
          const t = this._iter.reset(e);
          let n = this._root;
          for (; n; ) {
            const e = t.cmp(n.segment);
            if (e > 0) n = n.left;
            else if (e < 0) n = n.right;
            else {
              if (!t.hasNext()) break;
              t.next(), (n = n.mid);
            }
          }
          return n;
        }
        has(e) {
          const t = this._getNode(e);
          return !(
            void 0 === (null == t ? void 0 : t.value) &&
            void 0 === (null == t ? void 0 : t.mid)
          );
        }
        delete(e) {
          return this._delete(e, !1);
        }
        deleteSuperstr(e) {
          return this._delete(e, !0);
        }
        _delete(e, t) {
          var n;
          const r = this._iter.reset(e),
            i = [];
          let o = this._root;
          for (; o; ) {
            const e = r.cmp(o.segment);
            if (e > 0) i.push([-1, o]), (o = o.left);
            else if (e < 0) i.push([1, o]), (o = o.right);
            else {
              if (!r.hasNext()) break;
              r.next(), i.push([0, o]), (o = o.mid);
            }
          }
          if (o) {
            if (
              (t
                ? ((o.left = void 0),
                  (o.mid = void 0),
                  (o.right = void 0),
                  (o.height = 1))
                : ((o.key = void 0), (o.value = void 0)),
              !o.mid && !o.value)
            )
              if (o.left && o.right) {
                const e = this._min(o.right),
                  { key: t, value: n, segment: r } = e;
                this._delete(e.key, !1),
                  (o.key = t),
                  (o.value = n),
                  (o.segment = r);
              } else {
                const e = null !== (n = o.left) && void 0 !== n ? n : o.right;
                if (i.length > 0) {
                  const [t, n] = i[i.length - 1];
                  switch (t) {
                    case -1:
                      n.left = e;
                      break;
                    case 0:
                      n.mid = e;
                      break;
                    case 1:
                      n.right = e;
                  }
                } else this._root = e;
              }
            for (let e = i.length - 1; e >= 0; e--) {
              const t = i[e][1];
              t.updateHeight();
              const n = t.balanceFactor();
              if (
                (n > 1
                  ? (t.right.balanceFactor() >= 0 ||
                      (t.right = t.right.rotateRight()),
                    (i[e][1] = t.rotateLeft()))
                  : n < -1 &&
                    (t.left.balanceFactor() <= 0 ||
                      (t.left = t.left.rotateLeft()),
                    (i[e][1] = t.rotateRight())),
                e > 0)
              )
                switch (i[e - 1][0]) {
                  case -1:
                    i[e - 1][1].left = i[e][1];
                    break;
                  case 1:
                    i[e - 1][1].right = i[e][1];
                    break;
                  case 0:
                    i[e - 1][1].mid = i[e][1];
                }
              else this._root = i[0][1];
            }
          }
        }
        _min(e) {
          for (; e.left; ) e = e.left;
          return e;
        }
        findSubstr(e) {
          const t = this._iter.reset(e);
          let n,
            r = this._root;
          for (; r; ) {
            const e = t.cmp(r.segment);
            if (e > 0) r = r.left;
            else if (e < 0) r = r.right;
            else {
              if (!t.hasNext()) break;
              t.next(), (n = r.value || n), (r = r.mid);
            }
          }
          return (r && r.value) || n;
        }
        findSuperstr(e) {
          const t = this._iter.reset(e);
          let n = this._root;
          for (; n; ) {
            const e = t.cmp(n.segment);
            if (e > 0) n = n.left;
            else if (e < 0) n = n.right;
            else {
              if (!t.hasNext()) return n.mid ? this._entries(n.mid) : void 0;
              t.next(), (n = n.mid);
            }
          }
        }
        forEach(e) {
          for (const [t, n] of this) e(n, t);
        }
        *[Symbol.iterator]() {
          yield* this._entries(this._root);
        }
        *_entries(e) {
          !e ||
            (e.left && (yield* this._entries(e.left)),
            e.value && (yield [e.key, e.value]),
            e.mid && (yield* this._entries(e.mid)),
            e.right && (yield* this._entries(e.right)));
        }
      }
      t.TernarySearchTree = c;
      class h {
        constructor(e, t) {
          (this.uri = e), (this.value = t);
        }
      }
      class d {
        constructor(e, t) {
          (this[r] = "ResourceMap"),
            e instanceof d
              ? ((this.map = new Map(e.map)),
                (this.toKey = t ?? d.defaultToKey))
              : ((this.map = new Map()), (this.toKey = e ?? d.defaultToKey));
        }
        set(e, t) {
          return this.map.set(this.toKey(e), new h(e, t)), this;
        }
        get(e) {
          var t;
          return null === (t = this.map.get(this.toKey(e))) || void 0 === t
            ? void 0
            : t.value;
        }
        has(e) {
          return this.map.has(this.toKey(e));
        }
        get size() {
          return this.map.size;
        }
        clear() {
          this.map.clear();
        }
        delete(e) {
          return this.map.delete(this.toKey(e));
        }
        forEach(e, t) {
          "undefined" != typeof t && (e = e.bind(t));
          for (let [n, r] of this.map) e(r.value, r.uri, this);
        }
        *values() {
          for (let e of this.map.values()) yield e.value;
        }
        *keys() {
          for (let e of this.map.values()) yield e.uri;
        }
        *entries() {
          for (let e of this.map.values()) yield [e.uri, e.value];
        }
        *[((r = Symbol.toStringTag), Symbol.iterator)]() {
          for (let [, e] of this.map) yield [e.uri, e.value];
        }
      }
      (t.ResourceMap = d), (d.defaultToKey = (e) => e.toString());
      class f {
        constructor() {
          (this[i] = "LinkedMap"),
            (this._map = new Map()),
            (this._head = void 0),
            (this._tail = void 0),
            (this._size = 0),
            (this._state = 0);
        }
        clear() {
          this._map.clear(),
            (this._head = void 0),
            (this._tail = void 0),
            (this._size = 0),
            this._state++;
        }
        isEmpty() {
          return !this._head && !this._tail;
        }
        get size() {
          return this._size;
        }
        get first() {
          var e;
          return null === (e = this._head) || void 0 === e ? void 0 : e.value;
        }
        get last() {
          var e;
          return null === (e = this._tail) || void 0 === e ? void 0 : e.value;
        }
        has(e) {
          return this._map.has(e);
        }
        get(e, t = 0) {
          const n = this._map.get(e);
          if (n) return 0 !== t && this.touch(n, t), n.value;
        }
        set(e, t, n = 0) {
          let r = this._map.get(e);
          if (r) (r.value = t), 0 !== n && this.touch(r, n);
          else {
            switch (
              ((r = { key: e, value: t, next: void 0, previous: void 0 }), n)
            ) {
              case 0:
              case 2:
              default:
                this.addItemLast(r);
                break;
              case 1:
                this.addItemFirst(r);
            }
            this._map.set(e, r), this._size++;
          }
          return this;
        }
        delete(e) {
          return !!this.remove(e);
        }
        remove(e) {
          const t = this._map.get(e);
          if (t)
            return (
              this._map.delete(e), this.removeItem(t), this._size--, t.value
            );
        }
        shift() {
          if (!this._head && !this._tail) return;
          if (!this._head || !this._tail) throw new Error("Invalid list");
          const e = this._head;
          return (
            this._map.delete(e.key), this.removeItem(e), this._size--, e.value
          );
        }
        forEach(e, t) {
          const n = this._state;
          let r = this._head;
          for (; r; ) {
            if (
              (t ? e.bind(t)(r.value, r.key, this) : e(r.value, r.key, this),
              this._state !== n)
            )
              throw new Error("LinkedMap got modified during iteration.");
            r = r.next;
          }
        }
        keys() {
          const e = this,
            t = this._state;
          let n = this._head;
          const r = {
            [Symbol.iterator]: () => r,
            next() {
              if (e._state !== t)
                throw new Error("LinkedMap got modified during iteration.");
              if (n) {
                const e = { value: n.key, done: !1 };
                return (n = n.next), e;
              }
              return { value: void 0, done: !0 };
            },
          };
          return r;
        }
        values() {
          const e = this,
            t = this._state;
          let n = this._head;
          const r = {
            [Symbol.iterator]: () => r,
            next() {
              if (e._state !== t)
                throw new Error("LinkedMap got modified during iteration.");
              if (n) {
                const e = { value: n.value, done: !1 };
                return (n = n.next), e;
              }
              return { value: void 0, done: !0 };
            },
          };
          return r;
        }
        entries() {
          const e = this,
            t = this._state;
          let n = this._head;
          const r = {
            [Symbol.iterator]: () => r,
            next() {
              if (e._state !== t)
                throw new Error("LinkedMap got modified during iteration.");
              if (n) {
                const e = { value: [n.key, n.value], done: !1 };
                return (n = n.next), e;
              }
              return { value: void 0, done: !0 };
            },
          };
          return r;
        }
        [((i = Symbol.toStringTag), Symbol.iterator)]() {
          return this.entries();
        }
        trimOld(e) {
          if (e >= this.size) return;
          if (0 === e) return void this.clear();
          let t = this._head,
            n = this.size;
          for (; t && n > e; ) this._map.delete(t.key), (t = t.next), n--;
          (this._head = t),
            (this._size = n),
            t && (t.previous = void 0),
            this._state++;
        }
        addItemFirst(e) {
          if (this._head || this._tail) {
            if (!this._head) throw new Error("Invalid list");
            (e.next = this._head), (this._head.previous = e);
          } else this._tail = e;
          (this._head = e), this._state++;
        }
        addItemLast(e) {
          if (this._head || this._tail) {
            if (!this._tail) throw new Error("Invalid list");
            (e.previous = this._tail), (this._tail.next = e);
          } else this._head = e;
          (this._tail = e), this._state++;
        }
        removeItem(e) {
          if (e === this._head && e === this._tail)
            (this._head = void 0), (this._tail = void 0);
          else if (e === this._head) {
            if (!e.next) throw new Error("Invalid list");
            (e.next.previous = void 0), (this._head = e.next);
          } else if (e === this._tail) {
            if (!e.previous) throw new Error("Invalid list");
            (e.previous.next = void 0), (this._tail = e.previous);
          } else {
            const t = e.next,
              n = e.previous;
            if (!t || !n) throw new Error("Invalid list");
            (t.previous = n), (n.next = t);
          }
          (e.next = void 0), (e.previous = void 0), this._state++;
        }
        touch(e, t) {
          if (!this._head || !this._tail) throw new Error("Invalid list");
          if (1 === t || 2 === t)
            if (1 === t) {
              if (e === this._head) return;
              const t = e.next,
                n = e.previous;
              e === this._tail
                ? ((n.next = void 0), (this._tail = n))
                : ((t.previous = n), (n.next = t)),
                (e.previous = void 0),
                (e.next = this._head),
                (this._head.previous = e),
                (this._head = e),
                this._state++;
            } else if (2 === t) {
              if (e === this._tail) return;
              const t = e.next,
                n = e.previous;
              e === this._head
                ? ((t.previous = void 0), (this._head = t))
                : ((t.previous = n), (n.next = t)),
                (e.next = void 0),
                (e.previous = this._tail),
                (this._tail.next = e),
                (this._tail = e),
                this._state++;
            }
        }
        toJSON() {
          const e = [];
          return (
            this.forEach((t, n) => {
              e.push([n, t]);
            }),
            e
          );
        }
        fromJSON(e) {
          this.clear();
          for (const [t, n] of e) this.set(t, n);
        }
      }
      t.LinkedMap = f;
      t.LRUCache = class extends f {
        constructor(e, t = 1) {
          super(),
            (this._limit = e),
            (this._ratio = Math.min(Math.max(0, t), 1));
        }
        get limit() {
          return this._limit;
        }
        set limit(e) {
          (this._limit = e), this.checkTrim();
        }
        get(e, t = 2) {
          return super.get(e, t);
        }
        peek(e) {
          return super.get(e, 0);
        }
        set(e, t) {
          return super.set(e, t, 2), this.checkTrim(), this;
        }
        checkTrim() {
          this.size > this._limit &&
            this.trimOld(Math.round(this._limit * this._ratio));
        }
      };
    }),
    e(n[32], r([0, 1, 28, 29, 31, 8, 3, 2]), function (e, t, n, r, i, o, s, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.isRelativePattern =
          t.parse =
          t.match =
          t.splitGlobAware =
          t.GLOB_SPLIT =
          t.GLOBSTAR =
            void 0),
        (t.GLOBSTAR = "**"),
        (t.GLOB_SPLIT = "/");
      const l = "[/\\\\]",
        u = "[^/\\\\]",
        c = /\//g;
      function h(e) {
        switch (e) {
          case 0:
            return "";
          case 1:
            return `${u}*?`;
          default:
            return `(?:${l}|${u}+${l}|${l}${u}+)*?`;
        }
      }
      function d(e, t) {
        if (!e) return [];
        const n = [];
        let r = !1,
          i = !1,
          o = "";
        for (const s of e) {
          switch (s) {
            case t:
              if (!r && !i) {
                n.push(o), (o = "");
                continue;
              }
              break;
            case "{":
              r = !0;
              break;
            case "}":
              r = !1;
              break;
            case "[":
              i = !0;
              break;
            case "]":
              i = !1;
          }
          o += s;
        }
        return o && n.push(o), n;
      }
      function f(e) {
        if (!e) return "";
        let n = "";
        const r = d(e, t.GLOB_SPLIT);
        if (r.every((e) => e === t.GLOBSTAR)) n = ".*";
        else {
          let e = !1;
          r.forEach((i, o) => {
            if (i === t.GLOBSTAR) return void (e || ((n += h(2)), (e = !0)));
            let s = !1,
              c = "",
              g = !1,
              m = "";
            for (const e of i)
              if ("}" !== e && s) c += e;
              else if (!g || ("]" === e && m))
                switch (e) {
                  case "{":
                    s = !0;
                    continue;
                  case "[":
                    g = !0;
                    continue;
                  case "}":
                    (n += `(?:${d(c, ",")
                      .map((e) => f(e))
                      .join("|")})`),
                      (s = !1),
                      (c = "");
                    break;
                  case "]":
                    (n += "[" + m + "]"), (g = !1), (m = "");
                    break;
                  case "?":
                    n += u;
                    continue;
                  case "*":
                    n += h(1);
                    continue;
                  default:
                    n += (0, a.escapeRegExpCharacters)(e);
                }
              else {
                let n;
                (n =
                  "-" === e
                    ? e
                    : ("^" !== e && "!" !== e) || m
                    ? e === t.GLOB_SPLIT
                      ? ""
                      : (0, a.escapeRegExpCharacters)(e)
                    : "^"),
                  (m += n);
              }
            o < r.length - 1 &&
              (r[o + 1] !== t.GLOBSTAR || o + 2 < r.length) &&
              (n += l),
              (e = !1);
          });
        }
        return n;
      }
      t.splitGlobAware = d;
      const g = /^\*\*\/\*\.[\w\.-]+$/,
        m = /^\*\*\/([\w\.-]+)\/?$/,
        p = /^{\*\*\/[\*\.]?[\w\.-]+\/?(,\*\*\/[\*\.]?[\w\.-]+\/?)*}$/,
        _ =
          /^{\*\*\/[\*\.]?[\w\.-]+(\/(\*\*)?)?(,\*\*\/[\*\.]?[\w\.-]+(\/(\*\*)?)?)*}$/,
        b = /^\*\*((\/[\w\.-]+)+)\/?$/,
        C = /^([\w\.-]+(\/[\w\.-]+)*)\/?$/,
        y = new i.LRUCache(1e4),
        v = function () {
          return !1;
        },
        w = function () {
          return null;
        };
      function S(e, t) {
        if (!e) return w;
        let n;
        (n = "string" != typeof e ? e.pattern : e), (n = n.trim());
        const r = `${n}_${!!t.trimForExclusions}`;
        let i,
          o = y.get(r);
        if (o) return E(o, e);
        if (g.test(n)) {
          const e = n.substr(4);
          o = function (t, r) {
            return "string" == typeof t && t.endsWith(e) ? n : null;
          };
        } else
          o = (i = m.exec(L(n, t)))
            ? (function (e, t) {
                const n = `/${e}`,
                  r = `\\${e}`,
                  i = function (i, o) {
                    return "string" != typeof i
                      ? null
                      : o
                      ? o === e
                        ? t
                        : null
                      : i === e || i.endsWith(n) || i.endsWith(r)
                      ? t
                      : null;
                  },
                  o = [e];
                return (
                  (i.basenames = o), (i.patterns = [t]), (i.allBasenames = o), i
                );
              })(i[1], n)
            : (t.trimForExclusions ? _ : p).test(n)
            ? (function (e, t) {
                const n = R(
                    e
                      .slice(1, -1)
                      .split(",")
                      .map((e) => S(e, t))
                      .filter((e) => e !== w),
                    e
                  ),
                  r = n.length;
                if (!r) return w;
                if (1 === r) return n[0];
                const i = function (t, r) {
                    for (let i = 0, o = n.length; i < o; i++)
                      if (n[i](t, r)) return e;
                    return null;
                  },
                  o = n.find((e) => !!e.allBasenames);
                o && (i.allBasenames = o.allBasenames);
                const s = n.reduce(
                  (e, t) => (t.allPaths ? e.concat(t.allPaths) : e),
                  []
                );
                return s.length && (i.allPaths = s), i;
              })(n, t)
            : (i = b.exec(L(n, t)))
            ? A(i[1].substr(1), n, !0)
            : (i = C.exec(L(n, t)))
            ? A(i[1], n, !1)
            : (function (e) {
                try {
                  const t = new RegExp(`^${f(e)}$`);
                  return function (n) {
                    return (
                      (t.lastIndex = 0),
                      "string" == typeof n && t.test(n) ? e : null
                    );
                  };
                } catch {
                  return w;
                }
              })(n);
        return y.set(r, o), E(o, e);
      }
      function E(e, t) {
        return "string" == typeof t
          ? e
          : function (n, i) {
              return (0, r.isEqualOrParent)(n, t.base, !s.isLinux)
                ? e(n.substr(t.base.length + 1), i)
                : null;
            };
      }
      function L(e, t) {
        return t.trimForExclusions && e.endsWith("/**")
          ? e.substr(0, e.length - 2)
          : e;
      }
      function A(e, t, n) {
        const r = o.sep === o.posix.sep,
          i = r ? e : e.replace(c, o.sep),
          s = o.sep + i,
          a = o.posix.sep + e,
          l = n
            ? function (n, o) {
                return "string" != typeof n ||
                  (n !== i &&
                    !n.endsWith(s) &&
                    (r || (n !== e && !n.endsWith(a))))
                  ? null
                  : t;
              }
            : function (n, o) {
                return "string" != typeof n || (n !== i && (r || n !== e))
                  ? null
                  : t;
              };
        return (l.allPaths = [(n ? "*/" : "./") + e]), l;
      }
      function M(e, t = {}) {
        if (!e) return v;
        if ("string" == typeof e || N(e)) {
          const n = S(e, t);
          if (n === w) return v;
          const r = function (e, t) {
            return !!n(e, t);
          };
          return (
            n.allBasenames && (r.allBasenames = n.allBasenames),
            n.allPaths && (r.allPaths = n.allPaths),
            r
          );
        }
        return (function (e, t) {
          const r = R(
              Object.getOwnPropertyNames(e)
                .map((r) =>
                  (function (e, t, r) {
                    if (!1 === t) return w;
                    const i = S(e, r);
                    if (i === w) return w;
                    if ("boolean" == typeof t) return i;
                    if (t) {
                      const r = t.when;
                      if ("string" == typeof r) {
                        const t = (t, o, s, a) => {
                          if (!a || !i(t, o)) return null;
                          const l = a(r.replace("$(basename)", s));
                          return (0, n.isThenable)(l)
                            ? l.then((t) => (t ? e : null))
                            : l
                            ? e
                            : null;
                        };
                        return (t.requiresSiblings = !0), t;
                      }
                    }
                    return i;
                  })(r, e[r], t)
                )
                .filter((e) => e !== w)
            ),
            i = r.length;
          if (!i) return w;
          if (!r.some((e) => !!e.requiresSiblings)) {
            if (1 === i) return r[0];
            const e = function (e, t) {
                for (let n = 0, i = r.length; n < i; n++) {
                  const i = r[n](e, t);
                  if (i) return i;
                }
                return null;
              },
              t = r.find((e) => !!e.allBasenames);
            t && (e.allBasenames = t.allBasenames);
            const n = r.reduce(
              (e, t) => (t.allPaths ? e.concat(t.allPaths) : e),
              []
            );
            return n.length && (e.allPaths = n), e;
          }
          const s = function (e, t, n) {
              let i;
              for (let s = 0, a = r.length; s < a; s++) {
                const a = r[s];
                a.requiresSiblings &&
                  n &&
                  (t || (t = (0, o.basename)(e)),
                  i || (i = t.substr(0, t.length - (0, o.extname)(e).length)));
                const l = a(e, t, i, n);
                if (l) return l;
              }
              return null;
            },
            a = r.find((e) => !!e.allBasenames);
          a && (s.allBasenames = a.allBasenames);
          const l = r.reduce(
            (e, t) => (t.allPaths ? e.concat(t.allPaths) : e),
            []
          );
          return l.length && (s.allPaths = l), s;
        })(e, t);
      }
      function N(e) {
        const t = e;
        return !!t && "string" == typeof t.base && "string" == typeof t.pattern;
      }
      function R(e, t) {
        const n = e.filter((e) => !!e.basenames);
        if (n.length < 2) return e;
        const r = n.reduce((e, t) => {
          const n = t.basenames;
          return n ? e.concat(n) : e;
        }, []);
        let i;
        if (t) {
          i = [];
          for (let e = 0, n = r.length; e < n; e++) i.push(t);
        } else
          i = n.reduce((e, t) => {
            const n = t.patterns;
            return n ? e.concat(n) : e;
          }, []);
        const o = function (e, t) {
          if ("string" != typeof e) return null;
          if (!t) {
            let n;
            for (n = e.length; n > 0; n--) {
              const t = e.charCodeAt(n - 1);
              if (47 === t || 92 === t) break;
            }
            t = e.substr(n);
          }
          const n = r.indexOf(t);
          return -1 !== n ? i[n] : null;
        };
        (o.basenames = r), (o.patterns = i), (o.allBasenames = r);
        const s = e.filter((e) => !e.basenames);
        return s.push(o), s;
      }
      (t.match = function (e, t, n) {
        return !(!e || "string" != typeof t) && M(e)(t, void 0, n);
      }),
        (t.parse = M),
        (t.isRelativePattern = N);
    }),
    e(n[9], r([0, 1]), function (e, t) {
      "use strict";
      function n(e) {
        return "string" == typeof e;
      }
      function r(e) {
        return "undefined" == typeof e;
      }
      function i(e) {
        return r(e) || null === e;
      }
      function o(e) {
        return "function" == typeof e;
      }
      function s(e, t) {
        if (n(t)) {
          if (typeof e !== t)
            throw new Error(`argument does not match constraint: typeof ${t}`);
        } else if (o(t)) {
          try {
            if (e instanceof t) return;
          } catch {}
          if (
            (!i(e) && e.constructor === t) ||
            (1 === t.length && !0 === t.call(void 0, e))
          )
            return;
          throw new Error(
            "argument does not match one of these constraints: arg instanceof constraint, arg.constructor === constraint, nor constraint(arg) === true"
          );
        }
      }
      function a(e) {
        let t = [],
          n = Object.getPrototypeOf(e);
        for (; Object.prototype !== n; )
          (t = t.concat(Object.getOwnPropertyNames(n))),
            (n = Object.getPrototypeOf(n));
        return t;
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.assertNever =
          t.withNullAsUndefined =
          t.createProxyObject =
          t.getAllMethodNames =
          t.getAllPropertyNames =
          t.validateConstraint =
          t.validateConstraints =
          t.isFunction =
          t.assertIsDefined =
          t.assertType =
          t.isUndefinedOrNull =
          t.isDefined =
          t.isUndefined =
          t.isBoolean =
          t.isNumber =
          t.isObject =
          t.isString =
          t.isArray =
            void 0),
        (t.isArray = function (e) {
          return Array.isArray(e);
        }),
        (t.isString = n),
        (t.isObject = function (e) {
          return (
            "object" == typeof e &&
            null !== e &&
            !Array.isArray(e) &&
            !(e instanceof RegExp) &&
            !(e instanceof Date)
          );
        }),
        (t.isNumber = function (e) {
          return "number" == typeof e && !isNaN(e);
        }),
        (t.isBoolean = function (e) {
          return !0 === e || !1 === e;
        }),
        (t.isUndefined = r),
        (t.isDefined = function (e) {
          return !i(e);
        }),
        (t.isUndefinedOrNull = i),
        (t.assertType = function (e, t) {
          if (!e)
            throw new Error(
              t ? `Unexpected type, expected '${t}'` : "Unexpected type"
            );
        }),
        (t.assertIsDefined = function (e) {
          if (i(e))
            throw new Error("Assertion Failed: argument is undefined or null");
          return e;
        }),
        (t.isFunction = o),
        (t.validateConstraints = function (e, t) {
          const n = Math.min(e.length, t.length);
          for (let r = 0; r < n; r++) s(e[r], t[r]);
        }),
        (t.validateConstraint = s),
        (t.getAllPropertyNames = a),
        (t.getAllMethodNames = function (e) {
          const t = [];
          for (const n of a(e)) "function" == typeof e[n] && t.push(n);
          return t;
        }),
        (t.createProxyObject = function (e, t) {
          const n = (e) =>
            function () {
              const n = Array.prototype.slice.call(arguments, 0);
              return t(e, n);
            };
          let r = {};
          for (const i of e) r[i] = n(i);
          return r;
        }),
        (t.withNullAsUndefined = function (e) {
          return null === e ? void 0 : e;
        }),
        (t.assertNever = function (e, t = "Unreachable") {
          throw new Error(t);
        });
    }),
    e(n[33], r([0, 1, 9]), function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.getOrDefault =
          t.equals =
          t.mixin =
          t.cloneAndChange =
          t.deepFreeze =
          t.deepClone =
            void 0),
        (t.deepClone = function e(t) {
          if (!t || "object" != typeof t || t instanceof RegExp) return t;
          const n = Array.isArray(t) ? [] : {};
          return (
            Object.keys(t).forEach((r) => {
              t[r] && "object" == typeof t[r]
                ? (n[r] = e(t[r]))
                : (n[r] = t[r]);
            }),
            n
          );
        }),
        (t.deepFreeze = function (e) {
          if (!e || "object" != typeof e) return e;
          const t = [e];
          for (; t.length > 0; ) {
            const e = t.shift();
            Object.freeze(e);
            for (const n in e)
              if (r.call(e, n)) {
                const r = e[n];
                "object" == typeof r && !Object.isFrozen(r) && t.push(r);
              }
          }
          return e;
        });
      const r = Object.prototype.hasOwnProperty;
      function i(e, t, o) {
        if ((0, n.isUndefinedOrNull)(e)) return e;
        const s = t(e);
        if ("undefined" != typeof s) return s;
        if ((0, n.isArray)(e)) {
          const n = [];
          for (const r of e) n.push(i(r, t, o));
          return n;
        }
        if ((0, n.isObject)(e)) {
          if (o.has(e))
            throw new Error("Cannot clone recursive data-structure");
          o.add(e);
          const n = {};
          for (let s in e) r.call(e, s) && (n[s] = i(e[s], t, o));
          return o.delete(e), n;
        }
        return e;
      }
      (t.cloneAndChange = function (e, t) {
        return i(e, t, new Set());
      }),
        (t.mixin = function e(t, r, i = !0) {
          return (0, n.isObject)(t)
            ? ((0, n.isObject)(r) &&
                Object.keys(r).forEach((o) => {
                  o in t
                    ? i &&
                      ((0, n.isObject)(t[o]) && (0, n.isObject)(r[o])
                        ? e(t[o], r[o], i)
                        : (t[o] = r[o]))
                    : (t[o] = r[o]);
                }),
              t)
            : r;
        }),
        (t.equals = function e(t, n) {
          if (t === n) return !0;
          if (
            null == t ||
            null === n ||
            void 0 === n ||
            typeof t != typeof n ||
            "object" != typeof t ||
            Array.isArray(t) !== Array.isArray(n)
          )
            return !1;
          let r, i;
          if (Array.isArray(t)) {
            if (t.length !== n.length) return !1;
            for (r = 0; r < t.length; r++) if (!e(t[r], n[r])) return !1;
          } else {
            const o = [];
            for (i in t) o.push(i);
            o.sort();
            const s = [];
            for (i in n) s.push(i);
            if ((s.sort(), !e(o, s))) return !1;
            for (r = 0; r < o.length; r++) if (!e(t[o[r]], n[o[r]])) return !1;
          }
          return !0;
        }),
        (t.getOrDefault = function (e, t, n) {
          const r = t(e);
          return "undefined" == typeof r ? n : r;
        });
    }),
    e(n[15], r([0, 1]), function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.toUint32 = t.toUint8 = void 0),
        (t.toUint8 = function (e) {
          return e < 0 ? 0 : e > 255 ? 255 : 0 | e;
        }),
        (t.toUint32 = function (e) {
          return e < 0 ? 0 : e > 4294967295 ? 4294967295 : 0 | e;
        });
    }),
    e(n[11], r([0, 1, 8, 3]), function (e, t, n, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.uriToFsPath = t.URI = void 0);
      const i = /^\w[\w\d+.-]*$/,
        o = /^\//,
        s = /^\/\//;
      function a(e, t) {
        if (!e.scheme && t)
          throw new Error(
            `[UriError]: Scheme is missing: {scheme: "", authority: "${e.authority}", path: "${e.path}", query: "${e.query}", fragment: "${e.fragment}"}`
          );
        if (e.scheme && !i.test(e.scheme))
          throw new Error("[UriError]: Scheme contains illegal characters.");
        if (e.path)
          if (e.authority) {
            if (!o.test(e.path))
              throw new Error(
                '[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character'
              );
          } else if (s.test(e.path))
            throw new Error(
              '[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")'
            );
      }
      const l = "",
        u = "/",
        c = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
      class h {
        constructor(e, t, n, r, i, o = !1) {
          "object" == typeof e
            ? ((this.scheme = e.scheme || l),
              (this.authority = e.authority || l),
              (this.path = e.path || l),
              (this.query = e.query || l),
              (this.fragment = e.fragment || l))
            : ((this.scheme = (function (e, t) {
                return e || t ? e : "file";
              })(e, o)),
              (this.authority = t || l),
              (this.path = (function (e, t) {
                switch (e) {
                  case "https":
                  case "http":
                  case "file":
                    t ? t[0] !== u && (t = u + t) : (t = u);
                }
                return t;
              })(this.scheme, n || l)),
              (this.query = r || l),
              (this.fragment = i || l),
              a(this, o));
        }
        static isUri(e) {
          return (
            e instanceof h ||
            (!!e &&
              "string" == typeof e.authority &&
              "string" == typeof e.fragment &&
              "string" == typeof e.path &&
              "string" == typeof e.query &&
              "string" == typeof e.scheme &&
              "string" == typeof e.fsPath &&
              "function" == typeof e.with &&
              "function" == typeof e.toString)
          );
        }
        get fsPath() {
          return _(this, !1);
        }
        with(e) {
          if (!e) return this;
          let { scheme: t, authority: n, path: r, query: i, fragment: o } = e;
          return (
            void 0 === t ? (t = this.scheme) : null === t && (t = l),
            void 0 === n ? (n = this.authority) : null === n && (n = l),
            void 0 === r ? (r = this.path) : null === r && (r = l),
            void 0 === i ? (i = this.query) : null === i && (i = l),
            void 0 === o ? (o = this.fragment) : null === o && (o = l),
            t === this.scheme &&
            n === this.authority &&
            r === this.path &&
            i === this.query &&
            o === this.fragment
              ? this
              : new f(t, n, r, i, o)
          );
        }
        static parse(e, t = !1) {
          const n = c.exec(e);
          return n
            ? new f(
                n[2] || l,
                v(n[4] || l),
                v(n[5] || l),
                v(n[7] || l),
                v(n[9] || l),
                t
              )
            : new f(l, l, l, l, l);
        }
        static file(e) {
          let t = l;
          if (
            (r.isWindows && (e = e.replace(/\\/g, u)), e[0] === u && e[1] === u)
          ) {
            const n = e.indexOf(u, 2);
            -1 === n
              ? ((t = e.substring(2)), (e = u))
              : ((t = e.substring(2, n)), (e = e.substring(n) || u));
          }
          return new f("file", t, e, l, l);
        }
        static from(e) {
          const t = new f(e.scheme, e.authority, e.path, e.query, e.fragment);
          return a(t, !0), t;
        }
        static joinPath(e, ...t) {
          if (!e.path)
            throw new Error(
              "[UriError]: cannot call joinPath on URI without path"
            );
          let i;
          return (
            (i =
              r.isWindows && "file" === e.scheme
                ? h.file(n.win32.join(_(e, !0), ...t)).path
                : n.posix.join(e.path, ...t)),
            e.with({ path: i })
          );
        }
        toString(e = !1) {
          return b(this, e);
        }
        toJSON() {
          return this;
        }
        static revive(e) {
          if (e) {
            if (e instanceof h) return e;
            {
              const t = new f(e);
              return (
                (t._formatted = e.external),
                (t._fsPath = e._sep === d ? e.fsPath : null),
                t
              );
            }
          }
          return e;
        }
      }
      t.URI = h;
      const d = r.isWindows ? 1 : void 0;
      class f extends h {
        constructor() {
          super(...arguments), (this._formatted = null), (this._fsPath = null);
        }
        get fsPath() {
          return this._fsPath || (this._fsPath = _(this, !1)), this._fsPath;
        }
        toString(e = !1) {
          return e
            ? b(this, !0)
            : (this._formatted || (this._formatted = b(this, !1)),
              this._formatted);
        }
        toJSON() {
          const e = { $mid: 1 };
          return (
            this._fsPath && ((e.fsPath = this._fsPath), (e._sep = d)),
            this._formatted && (e.external = this._formatted),
            this.path && (e.path = this.path),
            this.scheme && (e.scheme = this.scheme),
            this.authority && (e.authority = this.authority),
            this.query && (e.query = this.query),
            this.fragment && (e.fragment = this.fragment),
            e
          );
        }
      }
      const g = {
        58: "%3A",
        47: "%2F",
        63: "%3F",
        35: "%23",
        91: "%5B",
        93: "%5D",
        64: "%40",
        33: "%21",
        36: "%24",
        38: "%26",
        39: "%27",
        40: "%28",
        41: "%29",
        42: "%2A",
        43: "%2B",
        44: "%2C",
        59: "%3B",
        61: "%3D",
        32: "%20",
      };
      function m(e, t) {
        let n,
          r = -1;
        for (let i = 0; i < e.length; i++) {
          const o = e.charCodeAt(i);
          if (
            (o >= 97 && o <= 122) ||
            (o >= 65 && o <= 90) ||
            (o >= 48 && o <= 57) ||
            45 === o ||
            46 === o ||
            95 === o ||
            126 === o ||
            (t && 47 === o)
          )
            -1 !== r &&
              ((n += encodeURIComponent(e.substring(r, i))), (r = -1)),
              void 0 !== n && (n += e.charAt(i));
          else {
            void 0 === n && (n = e.substr(0, i));
            const t = g[o];
            void 0 !== t
              ? (-1 !== r &&
                  ((n += encodeURIComponent(e.substring(r, i))), (r = -1)),
                (n += t))
              : -1 === r && (r = i);
          }
        }
        return (
          -1 !== r && (n += encodeURIComponent(e.substring(r))),
          void 0 !== n ? n : e
        );
      }
      function p(e) {
        let t;
        for (let n = 0; n < e.length; n++) {
          const r = e.charCodeAt(n);
          35 === r || 63 === r
            ? (void 0 === t && (t = e.substr(0, n)), (t += g[r]))
            : void 0 !== t && (t += e[n]);
        }
        return void 0 !== t ? t : e;
      }
      function _(e, t) {
        let n;
        return (
          (n =
            e.authority && e.path.length > 1 && "file" === e.scheme
              ? `//${e.authority}${e.path}`
              : 47 === e.path.charCodeAt(0) &&
                ((e.path.charCodeAt(1) >= 65 && e.path.charCodeAt(1) <= 90) ||
                  (e.path.charCodeAt(1) >= 97 &&
                    e.path.charCodeAt(1) <= 122)) &&
                58 === e.path.charCodeAt(2)
              ? t
                ? e.path.substr(1)
                : e.path[1].toLowerCase() + e.path.substr(2)
              : e.path),
          r.isWindows && (n = n.replace(/\//g, "\\")),
          n
        );
      }
      function b(e, t) {
        const n = t ? p : m;
        let r = "",
          { scheme: i, authority: o, path: s, query: a, fragment: l } = e;
        if (
          (i && ((r += i), (r += ":")),
          (o || "file" === i) && ((r += u), (r += u)),
          o)
        ) {
          let e = o.indexOf("@");
          if (-1 !== e) {
            const t = o.substr(0, e);
            (o = o.substr(e + 1)),
              (e = t.indexOf(":")),
              -1 === e
                ? (r += n(t, !1))
                : ((r += n(t.substr(0, e), !1)),
                  (r += ":"),
                  (r += n(t.substr(e + 1), !1))),
              (r += "@");
          }
          (o = o.toLowerCase()),
            (e = o.indexOf(":")),
            -1 === e
              ? (r += n(o, !1))
              : ((r += n(o.substr(0, e), !1)), (r += o.substr(e)));
        }
        if (s) {
          if (
            s.length >= 3 &&
            47 === s.charCodeAt(0) &&
            58 === s.charCodeAt(2)
          ) {
            const e = s.charCodeAt(1);
            e >= 65 &&
              e <= 90 &&
              (s = `/${String.fromCharCode(e + 32)}:${s.substr(3)}`);
          } else if (s.length >= 2 && 58 === s.charCodeAt(1)) {
            const e = s.charCodeAt(0);
            e >= 65 &&
              e <= 90 &&
              (s = `${String.fromCharCode(e + 32)}:${s.substr(2)}`);
          }
          r += n(s, !0);
        }
        return (
          a && ((r += "?"), (r += n(a, !1))),
          l && ((r += "#"), (r += t ? l : m(l, !1))),
          r
        );
      }
      function C(e) {
        try {
          return decodeURIComponent(e);
        } catch {
          return e.length > 3 ? e.substr(0, 3) + C(e.substr(3)) : e;
        }
      }
      t.uriToFsPath = _;
      const y = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
      function v(e) {
        return e.match(y) ? e.replace(y, (e) => C(e)) : e;
      }
    }),
    e(n[50], r([0, 1, 10, 4, 7, 3, 9, 2]), function (e, t, n, r, i, o, s, a) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.create =
          t.SimpleWorkerServer =
          t.SimpleWorkerClient =
          t.logOnceWebWorkerWarning =
            void 0);
      const l = "$initialize";
      let u = !1;
      t.logOnceWebWorkerWarning = function (e) {
        !o.isWeb ||
          (u ||
            ((u = !0),
            console.warn(
              "Could not create web worker(s). Falling back to loading web worker code in main thread, which might cause UI freezes. Please see https://github.com/microsoft/monaco-editor#faq"
            )),
          console.warn(e.message));
      };
      class c {
        constructor(e, t, n, r) {
          (this.vsWorker = e),
            (this.req = t),
            (this.method = n),
            (this.args = r),
            (this.type = 0);
        }
      }
      class h {
        constructor(e, t, n, r) {
          (this.vsWorker = e),
            (this.seq = t),
            (this.res = n),
            (this.err = r),
            (this.type = 1);
        }
      }
      class d {
        constructor(e, t, n, r) {
          (this.vsWorker = e),
            (this.req = t),
            (this.eventName = n),
            (this.arg = r),
            (this.type = 2);
        }
      }
      class f {
        constructor(e, t, n) {
          (this.vsWorker = e),
            (this.req = t),
            (this.event = n),
            (this.type = 3);
        }
      }
      class g {
        constructor(e, t) {
          (this.vsWorker = e), (this.req = t), (this.type = 4);
        }
      }
      class m {
        constructor(e) {
          (this._workerId = -1),
            (this._handler = e),
            (this._lastSentReq = 0),
            (this._pendingReplies = Object.create(null)),
            (this._pendingEmitters = new Map()),
            (this._pendingEvents = new Map());
        }
        setWorkerId(e) {
          this._workerId = e;
        }
        sendMessage(e, t) {
          const n = String(++this._lastSentReq);
          return new Promise((r, i) => {
            (this._pendingReplies[n] = { resolve: r, reject: i }),
              this._send(new c(this._workerId, n, e, t));
          });
        }
        listen(e, t) {
          let n = null;
          const i = new r.Emitter({
            onFirstListenerAdd: () => {
              (n = String(++this._lastSentReq)),
                this._pendingEmitters.set(n, i),
                this._send(new d(this._workerId, n, e, t));
            },
            onLastListenerRemove: () => {
              this._pendingEmitters.delete(n),
                this._send(new g(this._workerId, n)),
                (n = null);
            },
          });
          return i.event;
        }
        handleMessage(e) {
          !e ||
            !e.vsWorker ||
            (-1 !== this._workerId && e.vsWorker !== this._workerId) ||
            this._handleMessage(e);
        }
        _handleMessage(e) {
          switch (e.type) {
            case 1:
              return this._handleReplyMessage(e);
            case 0:
              return this._handleRequestMessage(e);
            case 2:
              return this._handleSubscribeEventMessage(e);
            case 3:
              return this._handleEventMessage(e);
            case 4:
              return this._handleUnsubscribeEventMessage(e);
          }
        }
        _handleReplyMessage(e) {
          if (!this._pendingReplies[e.seq])
            return void console.warn("Got reply to unknown seq");
          let t = this._pendingReplies[e.seq];
          if ((delete this._pendingReplies[e.seq], e.err)) {
            let n = e.err;
            return (
              e.err.$isError &&
                ((n = new Error()),
                (n.name = e.err.name),
                (n.message = e.err.message),
                (n.stack = e.err.stack)),
              void t.reject(n)
            );
          }
          t.resolve(e.res);
        }
        _handleRequestMessage(e) {
          let t = e.req;
          this._handler.handleMessage(e.method, e.args).then(
            (e) => {
              this._send(new h(this._workerId, t, e, void 0));
            },
            (e) => {
              e.detail instanceof Error &&
                (e.detail = (0, n.transformErrorForSerialization)(e.detail)),
                this._send(
                  new h(
                    this._workerId,
                    t,
                    void 0,
                    (0, n.transformErrorForSerialization)(e)
                  )
                );
            }
          );
        }
        _handleSubscribeEventMessage(e) {
          const t = e.req,
            n = this._handler.handleEvent(
              e.eventName,
              e.arg
            )((e) => {
              this._send(new f(this._workerId, t, e));
            });
          this._pendingEvents.set(t, n);
        }
        _handleEventMessage(e) {
          this._pendingEmitters.has(e.req)
            ? this._pendingEmitters.get(e.req).fire(e.event)
            : console.warn("Got event for unknown req");
        }
        _handleUnsubscribeEventMessage(e) {
          this._pendingEvents.has(e.req)
            ? (this._pendingEvents.get(e.req).dispose(),
              this._pendingEvents.delete(e.req))
            : console.warn("Got unsubscribe for unknown req");
        }
        _send(e) {
          let t = [];
          if (0 === e.type)
            for (let n = 0; n < e.args.length; n++)
              e.args[n] instanceof ArrayBuffer && t.push(e.args[n]);
          else 1 === e.type && e.res instanceof ArrayBuffer && t.push(e.res);
          this._handler.sendMessage(e, t);
        }
      }
      class p extends i.Disposable {
        constructor(e, t, n) {
          super();
          let r = null;
          (this._worker = this._register(
            e.create(
              "vs/base/common/worker/simpleWorker",
              (e) => {
                this._protocol.handleMessage(e);
              },
              (e) => {
                r && r(e);
              }
            )
          )),
            (this._protocol = new m({
              sendMessage: (e, t) => {
                this._worker.postMessage(e, t);
              },
              handleMessage: (e, t) => {
                if ("function" != typeof n[e])
                  return Promise.reject(
                    new Error("Missing method " + e + " on main thread host.")
                  );
                try {
                  return Promise.resolve(n[e].apply(n, t));
                } catch (r) {
                  return Promise.reject(r);
                }
              },
              handleEvent: (e, t) => {
                if (b(e)) {
                  const r = n[e].call(n, t);
                  if ("function" != typeof r)
                    throw new Error(
                      `Missing dynamic event ${e} on main thread host.`
                    );
                  return r;
                }
                if (_(e)) {
                  const t = n[e];
                  if ("function" != typeof t)
                    throw new Error(`Missing event ${e} on main thread host.`);
                  return t;
                }
                throw new Error(`Malformed event name ${e}`);
              },
            })),
            this._protocol.setWorkerId(this._worker.getId());
          let i = null;
          "undefined" != typeof o.globals.require &&
          "function" == typeof o.globals.require.getConfig
            ? (i = o.globals.require.getConfig())
            : "undefined" != typeof o.globals.requirejs &&
              (i = o.globals.requirejs.s.contexts._.config);
          const a = s.getAllMethodNames(n);
          this._onModuleLoaded = this._protocol.sendMessage(l, [
            this._worker.getId(),
            JSON.parse(JSON.stringify(i)),
            t,
            a,
          ]);
          const u = (e, t) => this._request(e, t),
            c = (e, t) => this._protocol.listen(e, t);
          this._lazyProxy = new Promise((e, n) => {
            (r = n),
              this._onModuleLoaded.then(
                (t) => {
                  e(C(t, u, c));
                },
                (e) => {
                  n(e), this._onError("Worker failed to load " + t, e);
                }
              );
          });
        }
        getProxyObject() {
          return this._lazyProxy;
        }
        _request(e, t) {
          return new Promise((n, r) => {
            this._onModuleLoaded.then(() => {
              this._protocol.sendMessage(e, t).then(n, r);
            }, r);
          });
        }
        _onError(e, t) {
          console.error(e), console.info(t);
        }
      }
      function _(e) {
        return (
          "o" === e[0] && "n" === e[1] && a.isUpperAsciiLetter(e.charCodeAt(2))
        );
      }
      function b(e) {
        return /^onDynamic/.test(e) && a.isUpperAsciiLetter(e.charCodeAt(9));
      }
      function C(e, t, n) {
        const r = (e) =>
            function () {
              const n = Array.prototype.slice.call(arguments, 0);
              return t(e, n);
            },
          i = (e) =>
            function (t) {
              return n(e, t);
            };
        let o = {};
        for (const s of e)
          b(s) ? (o[s] = i(s)) : _(s) ? (o[s] = n(s, void 0)) : (o[s] = r(s));
        return o;
      }
      t.SimpleWorkerClient = p;
      class y {
        constructor(e, t) {
          (this._requestHandlerFactory = t),
            (this._requestHandler = null),
            (this._protocol = new m({
              sendMessage: (t, n) => {
                e(t, n);
              },
              handleMessage: (e, t) => this._handleMessage(e, t),
              handleEvent: (e, t) => this._handleEvent(e, t),
            }));
        }
        onmessage(e) {
          this._protocol.handleMessage(e);
        }
        _handleMessage(e, t) {
          if (e === l) return this.initialize(t[0], t[1], t[2], t[3]);
          if (
            !this._requestHandler ||
            "function" != typeof this._requestHandler[e]
          )
            return Promise.reject(
              new Error("Missing requestHandler or method: " + e)
            );
          try {
            return Promise.resolve(
              this._requestHandler[e].apply(this._requestHandler, t)
            );
          } catch (n) {
            return Promise.reject(n);
          }
        }
        _handleEvent(e, t) {
          if (!this._requestHandler) throw new Error("Missing requestHandler");
          if (b(e)) {
            const n = this._requestHandler[e].call(this._requestHandler, t);
            if ("function" != typeof n)
              throw new Error(`Missing dynamic event ${e} on request handler.`);
            return n;
          }
          if (_(e)) {
            const t = this._requestHandler[e];
            if ("function" != typeof t)
              throw new Error(`Missing event ${e} on request handler.`);
            return t;
          }
          throw new Error(`Malformed event name ${e}`);
        }
        initialize(t, n, r, i) {
          this._protocol.setWorkerId(t);
          const a = C(
            i,
            (e, t) => this._protocol.sendMessage(e, t),
            (e, t) => this._protocol.listen(e, t)
          );
          return this._requestHandlerFactory
            ? ((this._requestHandler = this._requestHandlerFactory(a)),
              Promise.resolve(s.getAllMethodNames(this._requestHandler)))
            : (n &&
                ("undefined" != typeof n.baseUrl && delete n.baseUrl,
                "undefined" != typeof n.paths &&
                  "undefined" != typeof n.paths.vs &&
                  delete n.paths.vs,
                void 0 !== typeof n.trustedTypesPolicy &&
                  delete n.trustedTypesPolicy,
                (n.catchError = !0),
                o.globals.require.config(n)),
              new Promise((t, n) => {
                (o.globals.require || e)(
                  [r],
                  (e) => {
                    (this._requestHandler = e.create(a)),
                      this._requestHandler
                        ? t(s.getAllMethodNames(this._requestHandler))
                        : n(new Error("No RequestHandler!"));
                  },
                  n
                );
              }));
        }
      }
      (t.SimpleWorkerServer = y),
        (t.create = function (e) {
          return new y(e, null);
        });
    }),
    e(n[16], r([0, 1, 15]), function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.CharacterSet = t.CharacterClassifier = void 0);
      class r {
        constructor(e) {
          const t = (0, n.toUint8)(e);
          (this._defaultValue = t),
            (this._asciiMap = r._createAsciiMap(t)),
            (this._map = new Map());
        }
        static _createAsciiMap(e) {
          const t = new Uint8Array(256);
          for (let n = 0; n < 256; n++) t[n] = e;
          return t;
        }
        set(e, t) {
          const r = (0, n.toUint8)(t);
          e >= 0 && e < 256 ? (this._asciiMap[e] = r) : this._map.set(e, r);
        }
        get(e) {
          return e >= 0 && e < 256
            ? this._asciiMap[e]
            : this._map.get(e) || this._defaultValue;
        }
      }
      t.CharacterClassifier = r;
      t.CharacterSet = class {
        constructor() {
          this._actual = new r(0);
        }
        add(e) {
          this._actual.set(e, 1);
        }
        has(e) {
          return 1 === this._actual.get(e);
        }
      };
    }),
    e(n[5], r([0, 1]), function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Position = void 0);
      class n {
        constructor(e, t) {
          (this.lineNumber = e), (this.column = t);
        }
        with(e = this.lineNumber, t = this.column) {
          return e === this.lineNumber && t === this.column
            ? this
            : new n(e, t);
        }
        delta(e = 0, t = 0) {
          return this.with(this.lineNumber + e, this.column + t);
        }
        equals(e) {
          return n.equals(this, e);
        }
        static equals(e, t) {
          return (
            (!e && !t) ||
            (!!e &&
              !!t &&
              e.lineNumber === t.lineNumber &&
              e.column === t.column)
          );
        }
        isBefore(e) {
          return n.isBefore(this, e);
        }
        static isBefore(e, t) {
          return (
            e.lineNumber < t.lineNumber ||
            (!(t.lineNumber < e.lineNumber) && e.column < t.column)
          );
        }
        isBeforeOrEqual(e) {
          return n.isBeforeOrEqual(this, e);
        }
        static isBeforeOrEqual(e, t) {
          return (
            e.lineNumber < t.lineNumber ||
            (!(t.lineNumber < e.lineNumber) && e.column <= t.column)
          );
        }
        static compare(e, t) {
          const n = 0 | e.lineNumber,
            r = 0 | t.lineNumber;
          if (n === r) {
            return (0 | e.column) - (0 | t.column);
          }
          return n - r;
        }
        clone() {
          return new n(this.lineNumber, this.column);
        }
        toString() {
          return "(" + this.lineNumber + "," + this.column + ")";
        }
        static lift(e) {
          return new n(e.lineNumber, e.column);
        }
        static isIPosition(e) {
          return (
            e && "number" == typeof e.lineNumber && "number" == typeof e.column
          );
        }
      }
      t.Position = n;
    }),
    e(n[6], r([0, 1, 5]), function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }), (t.Range = void 0);
      class r {
        constructor(e, t, n, r) {
          e > n || (e === n && t > r)
            ? ((this.startLineNumber = n),
              (this.startColumn = r),
              (this.endLineNumber = e),
              (this.endColumn = t))
            : ((this.startLineNumber = e),
              (this.startColumn = t),
              (this.endLineNumber = n),
              (this.endColumn = r));
        }
        isEmpty() {
          return r.isEmpty(this);
        }
        static isEmpty(e) {
          return (
            e.startLineNumber === e.endLineNumber &&
            e.startColumn === e.endColumn
          );
        }
        containsPosition(e) {
          return r.containsPosition(this, e);
        }
        static containsPosition(e, t) {
          return !(
            t.lineNumber < e.startLineNumber ||
            t.lineNumber > e.endLineNumber ||
            (t.lineNumber === e.startLineNumber && t.column < e.startColumn) ||
            (t.lineNumber === e.endLineNumber && t.column > e.endColumn)
          );
        }
        static strictContainsPosition(e, t) {
          return !(
            t.lineNumber < e.startLineNumber ||
            t.lineNumber > e.endLineNumber ||
            (t.lineNumber === e.startLineNumber && t.column <= e.startColumn) ||
            (t.lineNumber === e.endLineNumber && t.column >= e.endColumn)
          );
        }
        containsRange(e) {
          return r.containsRange(this, e);
        }
        static containsRange(e, t) {
          return !(
            t.startLineNumber < e.startLineNumber ||
            t.endLineNumber < e.startLineNumber ||
            t.startLineNumber > e.endLineNumber ||
            t.endLineNumber > e.endLineNumber ||
            (t.startLineNumber === e.startLineNumber &&
              t.startColumn < e.startColumn) ||
            (t.endLineNumber === e.endLineNumber && t.endColumn > e.endColumn)
          );
        }
        strictContainsRange(e) {
          return r.strictContainsRange(this, e);
        }
        static strictContainsRange(e, t) {
          return !(
            t.startLineNumber < e.startLineNumber ||
            t.endLineNumber < e.startLineNumber ||
            t.startLineNumber > e.endLineNumber ||
            t.endLineNumber > e.endLineNumber ||
            (t.startLineNumber === e.startLineNumber &&
              t.startColumn <= e.startColumn) ||
            (t.endLineNumber === e.endLineNumber && t.endColumn >= e.endColumn)
          );
        }
        plusRange(e) {
          return r.plusRange(this, e);
        }
        static plusRange(e, t) {
          let n, i, o, s;
          return (
            t.startLineNumber < e.startLineNumber
              ? ((n = t.startLineNumber), (i = t.startColumn))
              : t.startLineNumber === e.startLineNumber
              ? ((n = t.startLineNumber),
                (i = Math.min(t.startColumn, e.startColumn)))
              : ((n = e.startLineNumber), (i = e.startColumn)),
            t.endLineNumber > e.endLineNumber
              ? ((o = t.endLineNumber), (s = t.endColumn))
              : t.endLineNumber === e.endLineNumber
              ? ((o = t.endLineNumber),
                (s = Math.max(t.endColumn, e.endColumn)))
              : ((o = e.endLineNumber), (s = e.endColumn)),
            new r(n, i, o, s)
          );
        }
        intersectRanges(e) {
          return r.intersectRanges(this, e);
        }
        static intersectRanges(e, t) {
          let n = e.startLineNumber,
            i = e.startColumn,
            o = e.endLineNumber,
            s = e.endColumn,
            a = t.startLineNumber,
            l = t.startColumn,
            u = t.endLineNumber,
            c = t.endColumn;
          return (
            n < a ? ((n = a), (i = l)) : n === a && (i = Math.max(i, l)),
            o > u ? ((o = u), (s = c)) : o === u && (s = Math.min(s, c)),
            n > o || (n === o && i > s) ? null : new r(n, i, o, s)
          );
        }
        equalsRange(e) {
          return r.equalsRange(this, e);
        }
        static equalsRange(e, t) {
          return (
            !!e &&
            !!t &&
            e.startLineNumber === t.startLineNumber &&
            e.startColumn === t.startColumn &&
            e.endLineNumber === t.endLineNumber &&
            e.endColumn === t.endColumn
          );
        }
        getEndPosition() {
          return r.getEndPosition(this);
        }
        static getEndPosition(e) {
          return new n.Position(e.endLineNumber, e.endColumn);
        }
        getStartPosition() {
          return r.getStartPosition(this);
        }
        static getStartPosition(e) {
          return new n.Position(e.startLineNumber, e.startColumn);
        }
        toString() {
          return (
            "[" +
            this.startLineNumber +
            "," +
            this.startColumn +
            " -> " +
            this.endLineNumber +
            "," +
            this.endColumn +
            "]"
          );
        }
        setEndPosition(e, t) {
          return new r(this.startLineNumber, this.startColumn, e, t);
        }
        setStartPosition(e, t) {
          return new r(e, t, this.endLineNumber, this.endColumn);
        }
        collapseToStart() {
          return r.collapseToStart(this);
        }
        static collapseToStart(e) {
          return new r(
            e.startLineNumber,
            e.startColumn,
            e.startLineNumber,
            e.startColumn
          );
        }
        static fromPositions(e, t = e) {
          return new r(e.lineNumber, e.column, t.lineNumber, t.column);
        }
        static lift(e) {
          return e
            ? new r(
                e.startLineNumber,
                e.startColumn,
                e.endLineNumber,
                e.endColumn
              )
            : null;
        }
        static isIRange(e) {
          return (
            e &&
            "number" == typeof e.startLineNumber &&
            "number" == typeof e.startColumn &&
            "number" == typeof e.endLineNumber &&
            "number" == typeof e.endColumn
          );
        }
        static areIntersectingOrTouching(e, t) {
          return !(
            e.endLineNumber < t.startLineNumber ||
            (e.endLineNumber === t.startLineNumber &&
              e.endColumn < t.startColumn) ||
            t.endLineNumber < e.startLineNumber ||
            (t.endLineNumber === e.startLineNumber &&
              t.endColumn < e.startColumn)
          );
        }
        static areIntersecting(e, t) {
          return !(
            e.endLineNumber < t.startLineNumber ||
            (e.endLineNumber === t.startLineNumber &&
              e.endColumn <= t.startColumn) ||
            t.endLineNumber < e.startLineNumber ||
            (t.endLineNumber === e.startLineNumber &&
              t.endColumn <= e.startColumn)
          );
        }
        static compareRangesUsingStarts(e, t) {
          if (e && t) {
            const n = 0 | e.startLineNumber,
              r = 0 | t.startLineNumber;
            if (n === r) {
              const n = 0 | e.startColumn,
                r = 0 | t.startColumn;
              if (n === r) {
                const n = 0 | e.endLineNumber,
                  r = 0 | t.endLineNumber;
                if (n === r) {
                  return (0 | e.endColumn) - (0 | t.endColumn);
                }
                return n - r;
              }
              return n - r;
            }
            return n - r;
          }
          return (e ? 1 : 0) - (t ? 1 : 0);
        }
        static compareRangesUsingEnds(e, t) {
          return e.endLineNumber === t.endLineNumber
            ? e.endColumn === t.endColumn
              ? e.startLineNumber === t.startLineNumber
                ? e.startColumn - t.startColumn
                : e.startLineNumber - t.startLineNumber
              : e.endColumn - t.endColumn
            : e.endLineNumber - t.endLineNumber;
        }
        static spansMultipleLines(e) {
          return e.endLineNumber > e.startLineNumber;
        }
      }
      t.Range = r;
    }),
    e(n[34], r([0, 1, 5, 6]), function (e, t, n, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Selection = void 0);
      class i extends r.Range {
        constructor(e, t, n, r) {
          super(e, t, n, r),
            (this.selectionStartLineNumber = e),
            (this.selectionStartColumn = t),
            (this.positionLineNumber = n),
            (this.positionColumn = r);
        }
        toString() {
          return (
            "[" +
            this.selectionStartLineNumber +
            "," +
            this.selectionStartColumn +
            " -> " +
            this.positionLineNumber +
            "," +
            this.positionColumn +
            "]"
          );
        }
        equalsSelection(e) {
          return i.selectionsEqual(this, e);
        }
        static selectionsEqual(e, t) {
          return (
            e.selectionStartLineNumber === t.selectionStartLineNumber &&
            e.selectionStartColumn === t.selectionStartColumn &&
            e.positionLineNumber === t.positionLineNumber &&
            e.positionColumn === t.positionColumn
          );
        }
        getDirection() {
          return this.selectionStartLineNumber === this.startLineNumber &&
            this.selectionStartColumn === this.startColumn
            ? 0
            : 1;
        }
        setEndPosition(e, t) {
          return 0 === this.getDirection()
            ? new i(this.startLineNumber, this.startColumn, e, t)
            : new i(e, t, this.startLineNumber, this.startColumn);
        }
        getPosition() {
          return new n.Position(this.positionLineNumber, this.positionColumn);
        }
        getSelectionStart() {
          return new n.Position(
            this.selectionStartLineNumber,
            this.selectionStartColumn
          );
        }
        setStartPosition(e, t) {
          return 0 === this.getDirection()
            ? new i(e, t, this.endLineNumber, this.endColumn)
            : new i(this.endLineNumber, this.endColumn, e, t);
        }
        static fromPositions(e, t = e) {
          return new i(e.lineNumber, e.column, t.lineNumber, t.column);
        }
        static fromRange(e, t) {
          return 0 === t
            ? new i(
                e.startLineNumber,
                e.startColumn,
                e.endLineNumber,
                e.endColumn
              )
            : new i(
                e.endLineNumber,
                e.endColumn,
                e.startLineNumber,
                e.startColumn
              );
        }
        static liftSelection(e) {
          return new i(
            e.selectionStartLineNumber,
            e.selectionStartColumn,
            e.positionLineNumber,
            e.positionColumn
          );
        }
        static selectionsArrEqual(e, t) {
          if ((e && !t) || (!e && t)) return !1;
          if (!e && !t) return !0;
          if (e.length !== t.length) return !1;
          for (let n = 0, r = e.length; n < r; n++)
            if (!this.selectionsEqual(e[n], t[n])) return !1;
          return !0;
        }
        static isISelection(e) {
          return (
            e &&
            "number" == typeof e.selectionStartLineNumber &&
            "number" == typeof e.selectionStartColumn &&
            "number" == typeof e.positionLineNumber &&
            "number" == typeof e.positionColumn
          );
        }
        static createWithDirection(e, t, n, r, o) {
          return 0 === o ? new i(e, t, n, r) : new i(n, r, e, t);
        }
      }
      t.Selection = i;
    }),
    e(n[35], r([0, 1, 16]), function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.getMapForWordSeparators = t.WordCharacterClassifier = void 0);
      class r extends n.CharacterClassifier {
        constructor(e) {
          super(0);
          for (let t = 0, n = e.length; t < n; t++)
            this.set(e.charCodeAt(t), 2);
          this.set(32, 1), this.set(9, 1);
        }
      }
      (t.WordCharacterClassifier = r),
        (t.getMapForWordSeparators = (function (e) {
          const t = {};
          return (n) => (t.hasOwnProperty(n) || (t[n] = e(n)), t[n]);
        })((e) => new r(e)));
    }),
    e(n[36], r([0, 1]), function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.getWordAtText =
          t.ensureValidWordDefinition =
          t.DEFAULT_WORD_REGEXP =
          t.USUAL_WORD_SEPARATORS =
            void 0),
        (t.USUAL_WORD_SEPARATORS = "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?"),
        (t.DEFAULT_WORD_REGEXP = (function (e = "") {
          let n = "(-?\\d*\\.\\d\\w*)|([^";
          for (const r of t.USUAL_WORD_SEPARATORS)
            e.indexOf(r) >= 0 || (n += "\\" + r);
          return (n += "\\s]+)"), new RegExp(n, "g");
        })()),
        (t.ensureValidWordDefinition = function (e) {
          let n = t.DEFAULT_WORD_REGEXP;
          if (e && e instanceof RegExp)
            if (e.global) n = e;
            else {
              let t = "g";
              e.ignoreCase && (t += "i"),
                e.multiline && (t += "m"),
                e.unicode && (t += "u"),
                (n = new RegExp(e.source, t));
            }
          return (n.lastIndex = 0), n;
        });
      const n = { maxLen: 1e3, windowSize: 15, timeBudget: 150 };
      function r(e, t, n, r) {
        let i;
        for (; (i = e.exec(t)); ) {
          const t = i.index || 0;
          if (t <= n && e.lastIndex >= n) return i;
          if (r > 0 && t > r) return null;
        }
        return null;
      }
      t.getWordAtText = function e(t, i, o, s, a = n) {
        if (o.length > a.maxLen) {
          let n = t - a.maxLen / 2;
          return (
            n < 0 ? (n = 0) : (s += n),
            e(t, i, (o = o.substring(n, t + a.maxLen / 2)), s, a)
          );
        }
        const l = Date.now(),
          u = t - 1 - s;
        let c = -1,
          h = null;
        for (let n = 1; !(Date.now() - l >= a.timeBudget); n++) {
          const e = u - a.windowSize * n;
          i.lastIndex = Math.max(0, e);
          const t = r(i, o, u, c);
          if ((!t && h) || ((h = t), e <= 0)) break;
          c = e;
        }
        if (h) {
          const e = {
            word: h[0],
            startColumn: s + 1 + h.index,
            endColumn: s + 1 + h.index + h[0].length,
          };
          return (i.lastIndex = 0), e;
        }
        return null;
      };
    }),
    e(n[37], r([0, 1, 14, 2]), function (e, t, n, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.DiffComputer = void 0);
      function i(e, t, r, i) {
        return new n.LcsDiff(e, t, r).ComputeDiff(i);
      }
      class o {
        constructor(e) {
          const t = [],
            n = [];
          for (let r = 0, i = e.length; r < i; r++)
            (t[r] = u(e[r], 1)), (n[r] = c(e[r], 1));
          (this.lines = e), (this._startColumns = t), (this._endColumns = n);
        }
        getElements() {
          const e = [];
          for (let t = 0, n = this.lines.length; t < n; t++)
            e[t] = this.lines[t].substring(
              this._startColumns[t] - 1,
              this._endColumns[t] - 1
            );
          return e;
        }
        getStrictElement(e) {
          return this.lines[e];
        }
        getStartLineNumber(e) {
          return e + 1;
        }
        getEndLineNumber(e) {
          return e + 1;
        }
        createCharSequence(e, t, n) {
          const r = [],
            i = [],
            o = [];
          let a = 0;
          for (let s = t; s <= n; s++) {
            const t = this.lines[s],
              n = e ? this._startColumns[s] : 1,
              l = e ? this._endColumns[s] : t.length + 1;
            for (let e = n; e < l; e++)
              (r[a] = t.charCodeAt(e - 1)), (i[a] = s + 1), (o[a] = e), a++;
          }
          return new s(r, i, o);
        }
      }
      class s {
        constructor(e, t, n) {
          (this._charCodes = e), (this._lineNumbers = t), (this._columns = n);
        }
        getElements() {
          return this._charCodes;
        }
        getStartLineNumber(e) {
          return this._lineNumbers[e];
        }
        getStartColumn(e) {
          return this._columns[e];
        }
        getEndLineNumber(e) {
          return this._lineNumbers[e];
        }
        getEndColumn(e) {
          return this._columns[e] + 1;
        }
      }
      class a {
        constructor(e, t, n, r, i, o, s, a) {
          (this.originalStartLineNumber = e),
            (this.originalStartColumn = t),
            (this.originalEndLineNumber = n),
            (this.originalEndColumn = r),
            (this.modifiedStartLineNumber = i),
            (this.modifiedStartColumn = o),
            (this.modifiedEndLineNumber = s),
            (this.modifiedEndColumn = a);
        }
        static createFromDiffChange(e, t, n) {
          let r, i, o, s, l, u, c, h;
          return (
            0 === e.originalLength
              ? ((r = 0), (i = 0), (o = 0), (s = 0))
              : ((r = t.getStartLineNumber(e.originalStart)),
                (i = t.getStartColumn(e.originalStart)),
                (o = t.getEndLineNumber(
                  e.originalStart + e.originalLength - 1
                )),
                (s = t.getEndColumn(e.originalStart + e.originalLength - 1))),
            0 === e.modifiedLength
              ? ((l = 0), (u = 0), (c = 0), (h = 0))
              : ((l = n.getStartLineNumber(e.modifiedStart)),
                (u = n.getStartColumn(e.modifiedStart)),
                (c = n.getEndLineNumber(
                  e.modifiedStart + e.modifiedLength - 1
                )),
                (h = n.getEndColumn(e.modifiedStart + e.modifiedLength - 1))),
            new a(r, i, o, s, l, u, c, h)
          );
        }
      }
      class l {
        constructor(e, t, n, r, i) {
          (this.originalStartLineNumber = e),
            (this.originalEndLineNumber = t),
            (this.modifiedStartLineNumber = n),
            (this.modifiedEndLineNumber = r),
            (this.charChanges = i);
        }
        static createFromDiffResult(e, t, n, r, o, s, u) {
          let c, h, d, f, g;
          if (
            (0 === t.originalLength
              ? ((c = n.getStartLineNumber(t.originalStart) - 1), (h = 0))
              : ((c = n.getStartLineNumber(t.originalStart)),
                (h = n.getEndLineNumber(
                  t.originalStart + t.originalLength - 1
                ))),
            0 === t.modifiedLength
              ? ((d = r.getStartLineNumber(t.modifiedStart) - 1), (f = 0))
              : ((d = r.getStartLineNumber(t.modifiedStart)),
                (f = r.getEndLineNumber(
                  t.modifiedStart + t.modifiedLength - 1
                ))),
            s &&
              t.originalLength > 0 &&
              t.originalLength < 20 &&
              t.modifiedLength > 0 &&
              t.modifiedLength < 20 &&
              o())
          ) {
            const s = n.createCharSequence(
                e,
                t.originalStart,
                t.originalStart + t.originalLength - 1
              ),
              l = r.createCharSequence(
                e,
                t.modifiedStart,
                t.modifiedStart + t.modifiedLength - 1
              );
            let c = i(s, l, o, !0).changes;
            u &&
              (c = (function (e) {
                if (e.length <= 1) return e;
                const t = [e[0]];
                let n = t[0];
                for (let r = 1, i = e.length; r < i; r++) {
                  const i = e[r],
                    o = i.originalStart - (n.originalStart + n.originalLength),
                    s = i.modifiedStart - (n.modifiedStart + n.modifiedLength);
                  Math.min(o, s) < 3
                    ? ((n.originalLength =
                        i.originalStart + i.originalLength - n.originalStart),
                      (n.modifiedLength =
                        i.modifiedStart + i.modifiedLength - n.modifiedStart))
                    : (t.push(i), (n = i));
                }
                return t;
              })(c)),
              (g = []);
            for (let e = 0, t = c.length; e < t; e++)
              g.push(a.createFromDiffChange(c[e], s, l));
          }
          return new l(c, h, d, f, g);
        }
      }
      function u(e, t) {
        const n = r.firstNonWhitespaceIndex(e);
        return -1 === n ? t : n + 1;
      }
      function c(e, t) {
        const n = r.lastNonWhitespaceIndex(e);
        return -1 === n ? t : n + 2;
      }
      function h(e) {
        if (0 === e) return () => !0;
        const t = Date.now();
        return () => Date.now() - t < e;
      }
      t.DiffComputer = class {
        constructor(e, t, n) {
          (this.shouldComputeCharChanges = n.shouldComputeCharChanges),
            (this.shouldPostProcessCharChanges =
              n.shouldPostProcessCharChanges),
            (this.shouldIgnoreTrimWhitespace = n.shouldIgnoreTrimWhitespace),
            (this.shouldMakePrettyDiff = n.shouldMakePrettyDiff),
            (this.originalLines = e),
            (this.modifiedLines = t),
            (this.original = new o(e)),
            (this.modified = new o(t)),
            (this.continueLineDiff = h(n.maxComputationTime)),
            (this.continueCharDiff = h(
              0 === n.maxComputationTime
                ? 0
                : Math.min(n.maxComputationTime, 5e3)
            ));
        }
        computeDiff() {
          if (
            1 === this.original.lines.length &&
            0 === this.original.lines[0].length
          )
            return 1 === this.modified.lines.length &&
              0 === this.modified.lines[0].length
              ? { quitEarly: !1, changes: [] }
              : {
                  quitEarly: !1,
                  changes: [
                    {
                      originalStartLineNumber: 1,
                      originalEndLineNumber: 1,
                      modifiedStartLineNumber: 1,
                      modifiedEndLineNumber: this.modified.lines.length,
                      charChanges: [
                        {
                          modifiedEndColumn: 0,
                          modifiedEndLineNumber: 0,
                          modifiedStartColumn: 0,
                          modifiedStartLineNumber: 0,
                          originalEndColumn: 0,
                          originalEndLineNumber: 0,
                          originalStartColumn: 0,
                          originalStartLineNumber: 0,
                        },
                      ],
                    },
                  ],
                };
          if (
            1 === this.modified.lines.length &&
            0 === this.modified.lines[0].length
          )
            return {
              quitEarly: !1,
              changes: [
                {
                  originalStartLineNumber: 1,
                  originalEndLineNumber: this.original.lines.length,
                  modifiedStartLineNumber: 1,
                  modifiedEndLineNumber: 1,
                  charChanges: [
                    {
                      modifiedEndColumn: 0,
                      modifiedEndLineNumber: 0,
                      modifiedStartColumn: 0,
                      modifiedStartLineNumber: 0,
                      originalEndColumn: 0,
                      originalEndLineNumber: 0,
                      originalStartColumn: 0,
                      originalStartLineNumber: 0,
                    },
                  ],
                },
              ],
            };
          const e = i(
              this.original,
              this.modified,
              this.continueLineDiff,
              this.shouldMakePrettyDiff
            ),
            t = e.changes,
            n = e.quitEarly;
          if (this.shouldIgnoreTrimWhitespace) {
            const e = [];
            for (let n = 0, r = t.length; n < r; n++)
              e.push(
                l.createFromDiffResult(
                  this.shouldIgnoreTrimWhitespace,
                  t[n],
                  this.original,
                  this.modified,
                  this.continueCharDiff,
                  this.shouldComputeCharChanges,
                  this.shouldPostProcessCharChanges
                )
              );
            return { quitEarly: n, changes: e };
          }
          const r = [];
          let o = 0,
            s = 0;
          for (let i = -1, a = t.length; i < a; i++) {
            const e = i + 1 < a ? t[i + 1] : null,
              n = e ? e.originalStart : this.originalLines.length,
              h = e ? e.modifiedStart : this.modifiedLines.length;
            for (; o < n && s < h; ) {
              const e = this.originalLines[o],
                t = this.modifiedLines[s];
              if (e !== t) {
                {
                  let n = u(e, 1),
                    i = u(t, 1);
                  for (; n > 1 && i > 1; ) {
                    if (e.charCodeAt(n - 2) !== t.charCodeAt(i - 2)) break;
                    n--, i--;
                  }
                  (n > 1 || i > 1) &&
                    this._pushTrimWhitespaceCharChange(
                      r,
                      o + 1,
                      1,
                      n,
                      s + 1,
                      1,
                      i
                    );
                }
                {
                  let n = c(e, 1),
                    i = c(t, 1);
                  const a = e.length + 1,
                    l = t.length + 1;
                  for (; n < a && i < l; ) {
                    if (e.charCodeAt(n - 1) !== e.charCodeAt(i - 1)) break;
                    n++, i++;
                  }
                  (n < a || i < l) &&
                    this._pushTrimWhitespaceCharChange(
                      r,
                      o + 1,
                      n,
                      a,
                      s + 1,
                      i,
                      l
                    );
                }
              }
              o++, s++;
            }
            e &&
              (r.push(
                l.createFromDiffResult(
                  this.shouldIgnoreTrimWhitespace,
                  e,
                  this.original,
                  this.modified,
                  this.continueCharDiff,
                  this.shouldComputeCharChanges,
                  this.shouldPostProcessCharChanges
                )
              ),
              (o += e.originalLength),
              (s += e.modifiedLength));
          }
          return { quitEarly: n, changes: r };
        }
        _pushTrimWhitespaceCharChange(e, t, n, r, i, o, s) {
          if (this._mergeTrimWhitespaceCharChange(e, t, n, r, i, o, s)) return;
          let u;
          this.shouldComputeCharChanges &&
            (u = [new a(t, n, t, r, i, o, i, s)]),
            e.push(new l(t, t, i, i, u));
        }
        _mergeTrimWhitespaceCharChange(e, t, n, r, i, o, s) {
          const l = e.length;
          if (0 === l) return !1;
          const u = e[l - 1];
          return (
            0 !== u.originalEndLineNumber &&
            0 !== u.modifiedEndLineNumber &&
            u.originalEndLineNumber + 1 === t &&
            u.modifiedEndLineNumber + 1 === i &&
            ((u.originalEndLineNumber = t),
            (u.modifiedEndLineNumber = i),
            this.shouldComputeCharChanges &&
              u.charChanges &&
              u.charChanges.push(new a(t, n, t, r, i, o, i, s)),
            !0)
          );
        }
      };
    }),
    e(n[38], r([0, 1, 32, 8]), function (e, t, n, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.score = void 0),
        (t.score = function e(t, i, o, s) {
          if (Array.isArray(t)) {
            let n = 0;
            for (const r of t) {
              const t = e(r, i, o, s);
              if (10 === t) return t;
              t > n && (n = t);
            }
            return n;
          }
          if ("string" == typeof t)
            return s ? ("*" === t ? 5 : t === o ? 10 : 0) : 0;
          if (t) {
            const {
              language: e,
              pattern: a,
              scheme: l,
              hasAccessToAllModels: u,
            } = t;
            if (!s && !u) return 0;
            let c = 0;
            if (l)
              if (l === i.scheme) c = 10;
              else {
                if ("*" !== l) return 0;
                c = 5;
              }
            if (e)
              if (e === o) c = 10;
              else {
                if ("*" !== e) return 0;
                c = Math.max(c, 5);
              }
            if (a) {
              let e;
              if (
                ((e =
                  "string" == typeof a
                    ? a
                    : Object.assign(Object.assign({}, a), {
                        base: (0, r.normalize)(a.base),
                      })),
                e !== i.fsPath && !(0, n.match)(e, i.fsPath))
              )
                return 0;
              c = 10;
            }
            return c;
          }
          return 0;
        });
    }),
    e(n[39], r([0, 1, 16]), function (e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.computeLinks =
          t.LinkComputer =
          t.StateMachine =
          t.Uint8Matrix =
            void 0);
      class r {
        constructor(e, t, n) {
          const r = new Uint8Array(e * t);
          for (let i = 0, o = e * t; i < o; i++) r[i] = n;
          (this._data = r), (this.rows = e), (this.cols = t);
        }
        get(e, t) {
          return this._data[e * this.cols + t];
        }
        set(e, t, n) {
          this._data[e * this.cols + t] = n;
        }
      }
      t.Uint8Matrix = r;
      class i {
        constructor(e) {
          let t = 0,
            n = 0;
          for (let r = 0, o = e.length; r < o; r++) {
            const [i, o, s] = e[r];
            o > t && (t = o), i > n && (n = i), s > n && (n = s);
          }
          t++, n++;
          const i = new r(n, t, 0);
          for (let r = 0, o = e.length; r < o; r++) {
            const [t, n, o] = e[r];
            i.set(t, n, o);
          }
          (this._states = i), (this._maxCharCode = t);
        }
        nextState(e, t) {
          return t < 0 || t >= this._maxCharCode ? 0 : this._states.get(e, t);
        }
      }
      t.StateMachine = i;
      let o = null;
      let s = null;
      class a {
        static _createLink(e, t, n, r, i) {
          let o = i - 1;
          do {
            const n = t.charCodeAt(o);
            if (2 !== e.get(n)) break;
            o--;
          } while (o > r);
          if (r > 0) {
            const e = t.charCodeAt(r - 1),
              n = t.charCodeAt(o);
            ((40 === e && 41 === n) ||
              (91 === e && 93 === n) ||
              (123 === e && 125 === n)) &&
              o--;
          }
          return {
            range: {
              startLineNumber: n,
              startColumn: r + 1,
              endLineNumber: n,
              endColumn: o + 2,
            },
            url: t.substring(r, o + 1),
          };
        }
        static computeLinks(
          e,
          t = (function () {
            return (
              null === o &&
                (o = new i([
                  [1, 104, 2],
                  [1, 72, 2],
                  [1, 102, 6],
                  [1, 70, 6],
                  [2, 116, 3],
                  [2, 84, 3],
                  [3, 116, 4],
                  [3, 84, 4],
                  [4, 112, 5],
                  [4, 80, 5],
                  [5, 115, 9],
                  [5, 83, 9],
                  [5, 58, 10],
                  [6, 105, 7],
                  [6, 73, 7],
                  [7, 108, 8],
                  [7, 76, 8],
                  [8, 101, 9],
                  [8, 69, 9],
                  [9, 58, 10],
                  [10, 47, 11],
                  [11, 47, 12],
                ])),
              o
            );
          })()
        ) {
          const r = (function () {
              if (null === s) {
                s = new n.CharacterClassifier(0);
                const e =
                  " \t<>'\"\u3001\u3002\uff61\uff64\uff0c\uff0e\uff1a\uff1b\u2018\u3008\u300c\u300e\u3014\uff08\uff3b\uff5b\uff62\uff63\uff5d\uff3d\uff09\u3015\u300f\u300d\u3009\u2019\uff40\uff5e\u2026";
                for (let n = 0; n < e.length; n++) s.set(e.charCodeAt(n), 1);
                const t = ".,;";
                for (let n = 0; n < t.length; n++) s.set(t.charCodeAt(n), 2);
              }
              return s;
            })(),
            l = [];
          for (let n = 1, i = e.getLineCount(); n <= i; n++) {
            const i = e.getLineContent(n),
              o = i.length;
            let s = 0,
              u = 0,
              c = 0,
              h = 1,
              d = !1,
              f = !1,
              g = !1,
              m = !1;
            for (; s < o; ) {
              let e = !1;
              const o = i.charCodeAt(s);
              if (13 === h) {
                let t;
                switch (o) {
                  case 40:
                    (d = !0), (t = 0);
                    break;
                  case 41:
                    t = d ? 0 : 1;
                    break;
                  case 91:
                    (g = !0), (f = !0), (t = 0);
                    break;
                  case 93:
                    (g = !1), (t = f ? 0 : 1);
                    break;
                  case 123:
                    (m = !0), (t = 0);
                    break;
                  case 125:
                    t = m ? 0 : 1;
                    break;
                  case 39:
                    t = 34 === c || 96 === c ? 0 : 1;
                    break;
                  case 34:
                    t = 39 === c || 96 === c ? 0 : 1;
                    break;
                  case 96:
                    t = 39 === c || 34 === c ? 0 : 1;
                    break;
                  case 42:
                    t = 42 === c ? 1 : 0;
                    break;
                  case 124:
                    t = 124 === c ? 1 : 0;
                    break;
                  case 32:
                    t = g ? 0 : 1;
                    break;
                  default:
                    t = r.get(o);
                }
                1 === t && (l.push(a._createLink(r, i, n, u, s)), (e = !0));
              } else if (12 === h) {
                let t;
                91 === o ? ((f = !0), (t = 0)) : (t = r.get(o)),
                  1 === t ? (e = !0) : (h = 13);
              } else (h = t.nextState(h, o)), 0 === h && (e = !0);
              e &&
                ((h = 1), (d = !1), (f = !1), (m = !1), (u = s + 1), (c = o)),
                s++;
            }
            13 === h && l.push(a._createLink(r, i, n, u, o));
          }
          return l;
        }
      }
      (t.LinkComputer = a),
        (t.computeLinks = function (e) {
          return e &&
            "function" == typeof e.getLineCount &&
            "function" == typeof e.getLineContent
            ? a.computeLinks(e)
            : [];
        });
    }),
    e(n[40], r([0, 1]), function (e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.BasicInplaceReplace = void 0);
      class n {
        constructor() {
          this._defaultValueSet = [
            ["true", "false"],
            ["True", "False"],
            [
              "Private",
              "Public",
              "Friend",
              "ReadOnly",
              "Partial",
              "Protected",
              "WriteOnly",
            ],
            ["public", "protected", "private"],
          ];
        }
        navigateValueSet(e, t, n, r, i) {
          if (e && t) {
            const n = this.doNavigateValueSet(t, i);
            if (n) return { range: e, value: n };
          }
          if (n && r) {
            const e = this.doNavigateValueSet(r, i);
            if (e) return { range: n, value: e };
          }
          return null;
        }
        doNavigateValueSet(e, t) {
          const n = this.numberReplace(e, t);
          return null !== n ? n : this.textReplace(e, t);
        }
        numberReplace(e, t) {
          const n = Math.pow(10, e.length - (e.lastIndexOf(".") + 1));
          let r = Number(e),
            i = parseFloat(e);
          return isNaN(r) || isNaN(i) || r !== i
            ? null
            : 0 !== r || t
            ? ((r = Math.floor(r * n)), (r += t ? n : -n), String(r / n))
            : null;
        }
        textReplace(e, t) {
          return this.valueSetsReplace(this._defaultValueSet, e, t);
        }
        valueSetsReplace(e, t, n) {
          let r = null;
          for (let i = 0, o = e.length; null === r && i < o; i++)
            r = this.valueSetReplace(e[i], t, n);
          return r;
        }
        valueSetReplace(e, t, n) {
          let r = e.indexOf(t);
          return r >= 0
            ? ((r += n ? 1 : -1),
              r < 0 ? (r = e.length - 1) : (r %= e.length),
              e[r])
            : null;
        }
      }
      (t.BasicInplaceReplace = n), (n.INSTANCE = new n());
    }),
    e(n[17], r([0, 1, 33]), function (e, t, n) {
      "use strict";
      var r;
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.shouldSynchronizeModel =
          t.ApplyEditsResult =
          t.SearchData =
          t.ValidAnnotatedEditOperation =
          t.FindMatch =
          t.TextModelResolvedOptions =
          t.InjectedTextCursorStops =
          t.MinimapPosition =
          t.OverviewRulerLane =
            void 0),
        ((r = t.OverviewRulerLane || (t.OverviewRulerLane = {}))[(r.Left = 1)] =
          "Left"),
        (r[(r.Center = 2)] = "Center"),
        (r[(r.Right = 4)] = "Right"),
        (r[(r.Full = 7)] = "Full"),
        (function (e) {
          (e[(e.Inline = 1)] = "Inline"), (e[(e.Gutter = 2)] = "Gutter");
        })(t.MinimapPosition || (t.MinimapPosition = {})),
        (function (e) {
          (e[(e.Both = 0)] = "Both"),
            (e[(e.Right = 1)] = "Right"),
            (e[(e.Left = 2)] = "Left"),
            (e[(e.None = 3)] = "None");
        })(t.InjectedTextCursorStops || (t.InjectedTextCursorStops = {}));
      t.TextModelResolvedOptions = class {
        constructor(e) {
          (this._textModelResolvedOptionsBrand = void 0),
            (this.tabSize = Math.max(1, 0 | e.tabSize)),
            (this.indentSize = 0 | e.tabSize),
            (this.insertSpaces = Boolean(e.insertSpaces)),
            (this.defaultEOL = 0 | e.defaultEOL),
            (this.trimAutoWhitespace = Boolean(e.trimAutoWhitespace)),
            (this.bracketPairColorizationOptions =
              e.bracketPairColorizationOptions);
        }
        equals(e) {
          return (
            this.tabSize === e.tabSize &&
            this.indentSize === e.indentSize &&
            this.insertSpaces === e.insertSpaces &&
            this.defaultEOL === e.defaultEOL &&
            this.trimAutoWhitespace === e.trimAutoWhitespace &&
            (0, n.equals)(
              this.bracketPairColorizationOptions,
              e.bracketPairColorizationOptions
            )
          );
        }
        createChangeEvent(e) {
          return {
            tabSize: this.tabSize !== e.tabSize,
            indentSize: this.indentSize !== e.indentSize,
            insertSpaces: this.insertSpaces !== e.insertSpaces,
            trimAutoWhitespace:
              this.trimAutoWhitespace !== e.trimAutoWhitespace,
          };
        }
      };
      t.FindMatch = class {
        constructor(e, t) {
          (this._findMatchBrand = void 0), (this.range = e), (this.matches = t);
        }
      };
      t.ValidAnnotatedEditOperation = class {
        constructor(e, t, n, r, i, o) {
          (this.identifier = e),
            (this.range = t),
            (this.text = n),
            (this.forceMoveMarkers = r),
            (this.isAutoWhitespaceEdit = i),
            (this._isTracked = o);
        }
      };
      t.SearchData = class {
        constructor(e, t, n) {
          (this.regex = e), (this.wordSeparators = t), (this.simpleSearch = n);
        }
      };
      (t.ApplyEditsResult = class {
        constructor(e, t, n) {
          (this.reverseEdits = e),
            (this.changes = t),
            (this.trimAutoWhitespaceLineNumbers = n);
        }
      }),
        (t.shouldSynchronizeModel = function (e) {
          return !e.isTooLargeForSyncing() && !e.isForSimpleWidget;
        });
    }),
    e(n[41], r([0, 1, 4, 7, 17, 38]), function (e, t, n, r, i, o) {
      "use strict";
      function s(e) {
        return (
          "string" != typeof e &&
          (Array.isArray(e) ? e.every(s) : !!e.exclusive)
        );
      }
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.LanguageFeatureRegistry = void 0);
      class a {
        constructor() {
          (this._clock = 0),
            (this._entries = []),
            (this._onDidChange = new n.Emitter());
        }
        get onDidChange() {
          return this._onDidChange.event;
        }
        register(e, t) {
          let n = {
            selector: e,
            provider: t,
            _score: -1,
            _time: this._clock++,
          };
          return (
            this._entries.push(n),
            (this._lastCandidate = void 0),
            this._onDidChange.fire(this._entries.length),
            (0, r.toDisposable)(() => {
              if (n) {
                const e = this._entries.indexOf(n);
                e >= 0 &&
                  (this._entries.splice(e, 1),
                  (this._lastCandidate = void 0),
                  this._onDidChange.fire(this._entries.length),
                  (n = void 0));
              }
            })
          );
        }
        has(e) {
          return this.all(e).length > 0;
        }
        all(e) {
          if (!e) return [];
          this._updateScores(e);
          const t = [];
          for (let n of this._entries) n._score > 0 && t.push(n.provider);
          return t;
        }
        ordered(e) {
          const t = [];
          return this._orderedForEach(e, (e) => t.push(e.provider)), t;
        }
        orderedGroups(e) {
          const t = [];
          let n, r;
          return (
            this._orderedForEach(e, (e) => {
              n && r === e._score
                ? n.push(e.provider)
                : ((r = e._score), (n = [e.provider]), t.push(n));
            }),
            t
          );
        }
        _orderedForEach(e, t) {
          if (e) {
            this._updateScores(e);
            for (const e of this._entries) e._score > 0 && t(e);
          }
        }
        _updateScores(e) {
          const t = { uri: e.uri.toString(), language: e.getLanguageId() };
          if (
            !this._lastCandidate ||
            this._lastCandidate.language !== t.language ||
            this._lastCandidate.uri !== t.uri
          ) {
            this._lastCandidate = t;
            for (let t of this._entries)
              if (
                ((t._score = (0, o.score)(
                  t.selector,
                  e.uri,
                  e.getLanguageId(),
                  (0, i.shouldSynchronizeModel)(e)
                )),
                s(t.selector) && t._score > 0)
              ) {
                for (let e of this._entries) e._score = 0;
                t._score = 1e3;
                break;
              }
            this._entries.sort(a._compareByScoreAndTime);
          }
        }
        static _compareByScoreAndTime(e, t) {
          return e._score < t._score
            ? 1
            : e._score > t._score
            ? -1
            : e._time < t._time
            ? 1
            : e._time > t._time
            ? -1
            : 0;
        }
      }
      t.LanguageFeatureRegistry = a;
    }),
    e(n[42], r([0, 1, 18, 15]), function (e, t, n, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.PrefixSumIndexOfResult =
          t.ConstantTimePrefixSumComputer =
          t.PrefixSumComputer =
            void 0);
      t.PrefixSumComputer = class {
        constructor(e) {
          (this.values = e),
            (this.prefixSum = new Uint32Array(e.length)),
            (this.prefixSumValidIndex = new Int32Array(1)),
            (this.prefixSumValidIndex[0] = -1);
        }
        insertValues(e, t) {
          e = (0, r.toUint32)(e);
          const n = this.values,
            i = this.prefixSum,
            o = t.length;
          return (
            0 !== o &&
            ((this.values = new Uint32Array(n.length + o)),
            this.values.set(n.subarray(0, e), 0),
            this.values.set(n.subarray(e), e + o),
            this.values.set(t, e),
            e - 1 < this.prefixSumValidIndex[0] &&
              (this.prefixSumValidIndex[0] = e - 1),
            (this.prefixSum = new Uint32Array(this.values.length)),
            this.prefixSumValidIndex[0] >= 0 &&
              this.prefixSum.set(
                i.subarray(0, this.prefixSumValidIndex[0] + 1)
              ),
            !0)
          );
        }
        setValue(e, t) {
          return (
            (e = (0, r.toUint32)(e)),
            (t = (0, r.toUint32)(t)),
            this.values[e] !== t &&
              ((this.values[e] = t),
              e - 1 < this.prefixSumValidIndex[0] &&
                (this.prefixSumValidIndex[0] = e - 1),
              !0)
          );
        }
        removeValues(e, t) {
          (e = (0, r.toUint32)(e)), (t = (0, r.toUint32)(t));
          const n = this.values,
            i = this.prefixSum;
          if (e >= n.length) return !1;
          const o = n.length - e;
          return (
            t >= o && (t = o),
            0 !== t &&
              ((this.values = new Uint32Array(n.length - t)),
              this.values.set(n.subarray(0, e), 0),
              this.values.set(n.subarray(e + t), e),
              (this.prefixSum = new Uint32Array(this.values.length)),
              e - 1 < this.prefixSumValidIndex[0] &&
                (this.prefixSumValidIndex[0] = e - 1),
              this.prefixSumValidIndex[0] >= 0 &&
                this.prefixSum.set(
                  i.subarray(0, this.prefixSumValidIndex[0] + 1)
                ),
              !0)
          );
        }
        getTotalSum() {
          return 0 === this.values.length
            ? 0
            : this._getPrefixSum(this.values.length - 1);
        }
        getPrefixSum(e) {
          return e < 0 ? 0 : ((e = (0, r.toUint32)(e)), this._getPrefixSum(e));
        }
        _getPrefixSum(e) {
          if (e <= this.prefixSumValidIndex[0]) return this.prefixSum[e];
          let t = this.prefixSumValidIndex[0] + 1;
          0 === t && ((this.prefixSum[0] = this.values[0]), t++),
            e >= this.values.length && (e = this.values.length - 1);
          for (let n = t; n <= e; n++)
            this.prefixSum[n] = this.prefixSum[n - 1] + this.values[n];
          return (
            (this.prefixSumValidIndex[0] = Math.max(
              this.prefixSumValidIndex[0],
              e
            )),
            this.prefixSum[e]
          );
        }
        getIndexOf(e) {
          (e = Math.floor(e)), this.getTotalSum();
          let t = 0,
            n = this.values.length - 1,
            r = 0,
            o = 0,
            s = 0;
          for (; t <= n; )
            if (
              ((r = (t + (n - t) / 2) | 0),
              (o = this.prefixSum[r]),
              (s = o - this.values[r]),
              e < s)
            )
              n = r - 1;
            else {
              if (!(e >= o)) break;
              t = r + 1;
            }
          return new i(r, e - s);
        }
      };
      t.ConstantTimePrefixSumComputer = class {
        constructor(e) {
          (this._values = e),
            (this._isValid = !1),
            (this._validEndIndex = -1),
            (this._prefixSum = []),
            (this._indexBySum = []);
        }
        getTotalSum() {
          return this._ensureValid(), this._indexBySum.length;
        }
        getPrefixSum(e) {
          return this._ensureValid(), 0 === e ? 0 : this._prefixSum[e - 1];
        }
        getIndexOf(e) {
          this._ensureValid();
          const t = this._indexBySum[e],
            n = t > 0 ? this._prefixSum[t - 1] : 0;
          return new i(t, e - n);
        }
        removeValues(e, t) {
          this._values.splice(e, t), this._invalidate(e);
        }
        insertValues(e, t) {
          (this._values = (0, n.arrayInsert)(this._values, e, t)),
            this._invalidate(e);
        }
        _invalidate(e) {
          (this._isValid = !1),
            (this._validEndIndex = Math.min(this._validEndIndex, e - 1));
        }
        _ensureValid() {
          if (!this._isValid) {
            for (
              let e = this._validEndIndex + 1, t = this._values.length;
              e < t;
              e++
            ) {
              const t = this._values[e],
                n = e > 0 ? this._prefixSum[e - 1] : 0;
              this._prefixSum[e] = n + t;
              for (let r = 0; r < t; r++) this._indexBySum[n + r] = e;
            }
            (this._prefixSum.length = this._values.length),
              (this._indexBySum.length =
                this._prefixSum[this._prefixSum.length - 1]),
              (this._isValid = !0),
              (this._validEndIndex = this._values.length - 1);
          }
        }
        setValue(e, t) {
          this._values[e] !== t && ((this._values[e] = t), this._invalidate(e));
        }
      };
      class i {
        constructor(e, t) {
          (this.index = e),
            (this.remainder = t),
            (this._prefixSumIndexOfResultBrand = void 0),
            (this.index = e),
            (this.remainder = t);
        }
      }
      t.PrefixSumIndexOfResult = i;
    }),
    e(n[43], r([0, 1, 2, 5, 42]), function (e, t, n, r, i) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.MirrorTextModel = void 0);
      t.MirrorTextModel = class {
        constructor(e, t, n, r) {
          (this._uri = e),
            (this._lines = t),
            (this._eol = n),
            (this._versionId = r),
            (this._lineStarts = null),
            (this._cachedTextValue = null);
        }
        dispose() {
          this._lines.length = 0;
        }
        get version() {
          return this._versionId;
        }
        getText() {
          return (
            null === this._cachedTextValue &&
              (this._cachedTextValue = this._lines.join(this._eol)),
            this._cachedTextValue
          );
        }
        onEvents(e) {
          e.eol &&
            e.eol !== this._eol &&
            ((this._eol = e.eol), (this._lineStarts = null));
          const t = e.changes;
          for (const n of t)
            this._acceptDeleteRange(n.range),
              this._acceptInsertText(
                new r.Position(n.range.startLineNumber, n.range.startColumn),
                n.text
              );
          (this._versionId = e.versionId), (this._cachedTextValue = null);
        }
        _ensureLineStarts() {
          if (!this._lineStarts) {
            const e = this._eol.length,
              t = this._lines.length,
              n = new Uint32Array(t);
            for (let r = 0; r < t; r++) n[r] = this._lines[r].length + e;
            this._lineStarts = new i.PrefixSumComputer(n);
          }
        }
        _setLineText(e, t) {
          (this._lines[e] = t),
            this._lineStarts &&
              this._lineStarts.setValue(
                e,
                this._lines[e].length + this._eol.length
              );
        }
        _acceptDeleteRange(e) {
          if (e.startLineNumber !== e.endLineNumber)
            this._setLineText(
              e.startLineNumber - 1,
              this._lines[e.startLineNumber - 1].substring(
                0,
                e.startColumn - 1
              ) + this._lines[e.endLineNumber - 1].substring(e.endColumn - 1)
            ),
              this._lines.splice(
                e.startLineNumber,
                e.endLineNumber - e.startLineNumber
              ),
              this._lineStarts &&
                this._lineStarts.removeValues(
                  e.startLineNumber,
                  e.endLineNumber - e.startLineNumber
                );
          else {
            if (e.startColumn === e.endColumn) return;
            this._setLineText(
              e.startLineNumber - 1,
              this._lines[e.startLineNumber - 1].substring(
                0,
                e.startColumn - 1
              ) + this._lines[e.startLineNumber - 1].substring(e.endColumn - 1)
            );
          }
        }
        _acceptInsertText(e, t) {
          if (0 === t.length) return;
          const r = (0, n.splitLines)(t);
          if (1 === r.length)
            return void this._setLineText(
              e.lineNumber - 1,
              this._lines[e.lineNumber - 1].substring(0, e.column - 1) +
                r[0] +
                this._lines[e.lineNumber - 1].substring(e.column - 1)
            );
          (r[r.length - 1] += this._lines[e.lineNumber - 1].substring(
            e.column - 1
          )),
            this._setLineText(
              e.lineNumber - 1,
              this._lines[e.lineNumber - 1].substring(0, e.column - 1) + r[0]
            );
          const i = new Uint32Array(r.length - 1);
          for (let n = 1; n < r.length; n++)
            this._lines.splice(e.lineNumber + n - 1, 0, r[n]),
              (i[n - 1] = r[n].length + this._eol.length);
          this._lineStarts && this._lineStarts.insertValues(e.lineNumber, i);
        }
      };
    }),
    e(n[44], r([0, 1, 2, 35, 5, 6, 17]), function (e, t, n, r, i, o, s) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Searcher =
          t.isValidMatch =
          t.TextModelSearch =
          t.createFindMatch =
          t.isMultilineRegexSource =
          t.SearchParams =
            void 0);
      function a(e) {
        if (!e || 0 === e.length) return !1;
        for (let t = 0, n = e.length; t < n; t++)
          if (92 === e.charCodeAt(t)) {
            if ((t++, t >= n)) break;
            const r = e.charCodeAt(t);
            if (110 === r || 114 === r || 87 === r) return !0;
          }
        return !1;
      }
      function l(e, t, n) {
        if (!n) return new s.FindMatch(e, null);
        const r = [];
        for (let i = 0, o = t.length; i < o; i++) r[i] = t[i];
        return new s.FindMatch(e, r);
      }
      (t.SearchParams = class {
        constructor(e, t, n, r) {
          (this.searchString = e),
            (this.isRegex = t),
            (this.matchCase = n),
            (this.wordSeparators = r);
        }
        parseSearchRequest() {
          if ("" === this.searchString) return null;
          let e;
          e = this.isRegex
            ? a(this.searchString)
            : this.searchString.indexOf("\n") >= 0;
          let t = null;
          try {
            t = n.createRegExp(this.searchString, this.isRegex, {
              matchCase: this.matchCase,
              wholeWord: !1,
              multiline: e,
              global: !0,
              unicode: !0,
            });
          } catch {
            return null;
          }
          if (!t) return null;
          let i = !this.isRegex && !e;
          return (
            i &&
              this.searchString.toLowerCase() !==
                this.searchString.toUpperCase() &&
              (i = this.matchCase),
            new s.SearchData(
              t,
              this.wordSeparators
                ? (0, r.getMapForWordSeparators)(this.wordSeparators)
                : null,
              i ? this.searchString : null
            )
          );
        }
      }),
        (t.isMultilineRegexSource = a),
        (t.createFindMatch = l);
      class u {
        constructor(e) {
          const t = [];
          let n = 0;
          for (let r = 0, i = e.length; r < i; r++)
            10 === e.charCodeAt(r) && (t[n++] = r);
          this._lineFeedsOffsets = t;
        }
        findLineFeedCountBeforeOffset(e) {
          const t = this._lineFeedsOffsets;
          let n = 0,
            r = t.length - 1;
          if (-1 === r || e <= t[0]) return 0;
          for (; n < r; ) {
            const i = n + (((r - n) / 2) >> 0);
            t[i] >= e
              ? (r = i - 1)
              : t[i + 1] >= e
              ? ((n = i), (r = i))
              : (n = i + 1);
          }
          return n + 1;
        }
      }
      function c(e, t, n, r, i) {
        return (
          (function (e, t, n, r, i) {
            if (0 === r) return !0;
            const o = t.charCodeAt(r - 1);
            if (0 !== e.get(o) || 13 === o || 10 === o) return !0;
            if (i > 0) {
              const n = t.charCodeAt(r);
              if (0 !== e.get(n)) return !0;
            }
            return !1;
          })(e, t, 0, r, i) &&
          (function (e, t, n, r, i) {
            if (r + i === n) return !0;
            const o = t.charCodeAt(r + i);
            if (0 !== e.get(o) || 13 === o || 10 === o) return !0;
            if (i > 0) {
              const n = t.charCodeAt(r + i - 1);
              if (0 !== e.get(n)) return !0;
            }
            return !1;
          })(e, t, n, r, i)
        );
      }
      (t.TextModelSearch = class {
        static findMatches(e, t, n, r, i) {
          const o = t.parseSearchRequest();
          return o
            ? o.regex.multiline
              ? this._doFindMatchesMultiline(
                  e,
                  n,
                  new h(o.wordSeparators, o.regex),
                  r,
                  i
                )
              : this._doFindMatchesLineByLine(e, n, o, r, i)
            : [];
        }
        static _getMultilineMatchRange(e, t, n, r, i, s) {
          let a,
            l,
            u = 0;
          if (
            (r
              ? ((u = r.findLineFeedCountBeforeOffset(i)), (a = t + i + u))
              : (a = t + i),
            r)
          ) {
            const e = r.findLineFeedCountBeforeOffset(i + s.length) - u;
            l = a + s.length + e;
          } else l = a + s.length;
          const c = e.getPositionAt(a),
            h = e.getPositionAt(l);
          return new o.Range(c.lineNumber, c.column, h.lineNumber, h.column);
        }
        static _doFindMatchesMultiline(e, t, n, r, i) {
          const o = e.getOffsetAt(t.getStartPosition()),
            s = e.getValueInRange(t, 1),
            a = "\r\n" === e.getEOL() ? new u(s) : null,
            c = [];
          let h,
            d = 0;
          for (n.reset(0); (h = n.next(s)); )
            if (
              ((c[d++] = l(
                this._getMultilineMatchRange(e, o, s, a, h.index, h[0]),
                h,
                r
              )),
              d >= i)
            )
              return c;
          return c;
        }
        static _doFindMatchesLineByLine(e, t, n, r, i) {
          const o = [];
          let s = 0;
          if (t.startLineNumber === t.endLineNumber) {
            const a = e
              .getLineContent(t.startLineNumber)
              .substring(t.startColumn - 1, t.endColumn - 1);
            return (
              (s = this._findMatchesInLine(
                n,
                a,
                t.startLineNumber,
                t.startColumn - 1,
                s,
                o,
                r,
                i
              )),
              o
            );
          }
          const a = e
            .getLineContent(t.startLineNumber)
            .substring(t.startColumn - 1);
          s = this._findMatchesInLine(
            n,
            a,
            t.startLineNumber,
            t.startColumn - 1,
            s,
            o,
            r,
            i
          );
          for (let l = t.startLineNumber + 1; l < t.endLineNumber && s < i; l++)
            s = this._findMatchesInLine(
              n,
              e.getLineContent(l),
              l,
              0,
              s,
              o,
              r,
              i
            );
          if (s < i) {
            const a = e
              .getLineContent(t.endLineNumber)
              .substring(0, t.endColumn - 1);
            s = this._findMatchesInLine(n, a, t.endLineNumber, 0, s, o, r, i);
          }
          return o;
        }
        static _findMatchesInLine(e, t, n, r, i, a, u, d) {
          const f = e.wordSeparators;
          if (!u && e.simpleSearch) {
            const l = e.simpleSearch,
              u = l.length,
              h = t.length;
            let g = -u;
            for (; -1 !== (g = t.indexOf(l, g + u)); )
              if (
                (!f || c(f, t, h, g, u)) &&
                ((a[i++] = new s.FindMatch(
                  new o.Range(n, g + 1 + r, n, g + 1 + u + r),
                  null
                )),
                i >= d)
              )
                return i;
            return i;
          }
          const g = new h(e.wordSeparators, e.regex);
          let m;
          g.reset(0);
          do {
            if (
              ((m = g.next(t)),
              m &&
                ((a[i++] = l(
                  new o.Range(
                    n,
                    m.index + 1 + r,
                    n,
                    m.index + 1 + m[0].length + r
                  ),
                  m,
                  u
                )),
                i >= d))
            )
              return i;
          } while (m);
          return i;
        }
        static findNextMatch(e, t, n, r) {
          const i = t.parseSearchRequest();
          if (!i) return null;
          const o = new h(i.wordSeparators, i.regex);
          return i.regex.multiline
            ? this._doFindNextMatchMultiline(e, n, o, r)
            : this._doFindNextMatchLineByLine(e, n, o, r);
        }
        static _doFindNextMatchMultiline(e, t, n, r) {
          const s = new i.Position(t.lineNumber, 1),
            a = e.getOffsetAt(s),
            c = e.getLineCount(),
            h = e.getValueInRange(
              new o.Range(s.lineNumber, s.column, c, e.getLineMaxColumn(c)),
              1
            ),
            d = "\r\n" === e.getEOL() ? new u(h) : null;
          n.reset(t.column - 1);
          let f = n.next(h);
          return f
            ? l(this._getMultilineMatchRange(e, a, h, d, f.index, f[0]), f, r)
            : 1 !== t.lineNumber || 1 !== t.column
            ? this._doFindNextMatchMultiline(e, new i.Position(1, 1), n, r)
            : null;
        }
        static _doFindNextMatchLineByLine(e, t, n, r) {
          const i = e.getLineCount(),
            o = t.lineNumber,
            s = e.getLineContent(o),
            a = this._findFirstMatchInLine(n, s, o, t.column, r);
          if (a) return a;
          for (let l = 1; l <= i; l++) {
            const t = (o + l - 1) % i,
              s = e.getLineContent(t + 1),
              a = this._findFirstMatchInLine(n, s, t + 1, 1, r);
            if (a) return a;
          }
          return null;
        }
        static _findFirstMatchInLine(e, t, n, r, i) {
          e.reset(r - 1);
          const s = e.next(t);
          return s
            ? l(new o.Range(n, s.index + 1, n, s.index + 1 + s[0].length), s, i)
            : null;
        }
        static findPreviousMatch(e, t, n, r) {
          const i = t.parseSearchRequest();
          if (!i) return null;
          const o = new h(i.wordSeparators, i.regex);
          return i.regex.multiline
            ? this._doFindPreviousMatchMultiline(e, n, o, r)
            : this._doFindPreviousMatchLineByLine(e, n, o, r);
        }
        static _doFindPreviousMatchMultiline(e, t, n, r) {
          const s = this._doFindMatchesMultiline(
            e,
            new o.Range(1, 1, t.lineNumber, t.column),
            n,
            r,
            9990
          );
          if (s.length > 0) return s[s.length - 1];
          const a = e.getLineCount();
          return t.lineNumber !== a || t.column !== e.getLineMaxColumn(a)
            ? this._doFindPreviousMatchMultiline(
                e,
                new i.Position(a, e.getLineMaxColumn(a)),
                n,
                r
              )
            : null;
        }
        static _doFindPreviousMatchLineByLine(e, t, n, r) {
          const i = e.getLineCount(),
            o = t.lineNumber,
            s = e.getLineContent(o).substring(0, t.column - 1),
            a = this._findLastMatchInLine(n, s, o, r);
          if (a) return a;
          for (let l = 1; l <= i; l++) {
            const t = (i + o - l - 1) % i,
              s = e.getLineContent(t + 1),
              a = this._findLastMatchInLine(n, s, t + 1, r);
            if (a) return a;
          }
          return null;
        }
        static _findLastMatchInLine(e, t, n, r) {
          let i,
            s = null;
          for (e.reset(0); (i = e.next(t)); )
            s = l(
              new o.Range(n, i.index + 1, n, i.index + 1 + i[0].length),
              i,
              r
            );
          return s;
        }
      }),
        (t.isValidMatch = c);
      class h {
        constructor(e, t) {
          (this._wordSeparators = e),
            (this._searchRegex = t),
            (this._prevMatchStartIndex = -1),
            (this._prevMatchLength = 0);
        }
        reset(e) {
          (this._searchRegex.lastIndex = e),
            (this._prevMatchStartIndex = -1),
            (this._prevMatchLength = 0);
        }
        next(e) {
          const t = e.length;
          let r;
          do {
            if (
              this._prevMatchStartIndex + this._prevMatchLength === t ||
              ((r = this._searchRegex.exec(e)), !r)
            )
              return null;
            const i = r.index,
              o = r[0].length;
            if (
              i === this._prevMatchStartIndex &&
              o === this._prevMatchLength
            ) {
              if (0 === o) {
                n.getNextCodePoint(e, t, this._searchRegex.lastIndex) > 65535
                  ? (this._searchRegex.lastIndex += 2)
                  : (this._searchRegex.lastIndex += 1);
                continue;
              }
              return null;
            }
            if (
              ((this._prevMatchStartIndex = i),
              (this._prevMatchLength = o),
              !this._wordSeparators || c(this._wordSeparators, e, t, i, o))
            )
              return r;
          } while (r);
          return null;
        }
      }
      t.Searcher = h;
    }),
    e(n[45], r([0, 1, 6, 44, 2, 9]), function (e, t, n, r, i, o) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.UnicodeTextModelHighlighter = void 0);
      t.UnicodeTextModelHighlighter = class {
        static computeUnicodeHighlights(e, t, a) {
          const l = a ? a.startLineNumber : 1,
            u = a ? a.endLineNumber : e.getLineCount(),
            c = new s(t),
            h = c.getCandidateCodePoints();
          let d;
          var f;
          d =
            "allNonBasicAscii" === h
              ? new RegExp("[^\\t\\n\\r\\x20-\\x7E]", "g")
              : new RegExp(
                  "" +
                    ((f = Array.from(h)),
                    `[${i.escapeRegExpCharacters(
                      f.map((e) => String.fromCodePoint(e)).join("")
                    )}]`),
                  "g"
                );
          const g = new r.Searcher(null, d),
            m = [];
          let p,
            _ = !1,
            b = 0,
            C = 0,
            y = 0;
          e: for (let r = l, s = u; r <= s; r++) {
            const t = e.getLineContent(r),
              s = t.length;
            g.reset(0);
            do {
              if (((p = g.next(t)), p)) {
                let e = p.index,
                  a = p.index + p[0].length;
                if (e > 0) {
                  const n = t.charCodeAt(e - 1);
                  i.isHighSurrogate(n) && e--;
                }
                if (a + 1 < s) {
                  const e = t.charCodeAt(a - 1);
                  i.isHighSurrogate(e) && a++;
                }
                const l = t.substring(e, a),
                  u = c.shouldHighlightNonBasicASCII(l);
                if (0 !== u) {
                  3 === u
                    ? b++
                    : 2 === u
                    ? C++
                    : 1 === u
                    ? y++
                    : (0, o.assertNever)(u);
                  const t = 1e3;
                  if (m.length >= t) {
                    _ = !0;
                    break e;
                  }
                  m.push(new n.Range(r, e + 1, r, a + 1));
                }
              }
            } while (p);
          }
          return {
            ranges: m,
            hasMore: _,
            ambiguousCharacterCount: b,
            invisibleCharacterCount: C,
            nonBasicAsciiCharacterCount: y,
          };
        }
        static computeUnicodeHighlightReason(e, t) {
          const n = new s(t);
          switch (n.shouldHighlightNonBasicASCII(e)) {
            case 0:
              return null;
            case 2:
              return { kind: 1 };
            case 3: {
              const r = e.codePointAt(0),
                o = n.ambiguousCharacters.getPrimaryConfusable(r),
                s = i.AmbiguousCharacters.getLocales().filter(
                  (e) =>
                    !i.AmbiguousCharacters.getInstance(
                      new Set([...t.allowedLocales, e])
                    ).isAmbiguous(r)
                );
              return {
                kind: 0,
                confusableWith: String.fromCodePoint(o),
                notAmbiguousInLocales: s,
              };
            }
            case 1:
              return { kind: 2 };
          }
        }
      };
      class s {
        constructor(e) {
          (this.options = e),
            (this.allowedCodePoints = new Set(e.allowedCodePoints)),
            (this.ambiguousCharacters = i.AmbiguousCharacters.getInstance(
              new Set(e.allowedLocales)
            ));
        }
        getCandidateCodePoints() {
          if (this.options.nonBasicASCII) return "allNonBasicAscii";
          const e = new Set();
          if (this.options.invisibleCharacters)
            for (const t of i.InvisibleCharacters.codePoints) e.add(t);
          if (this.options.ambiguousCharacters)
            for (const t of this.ambiguousCharacters.getConfusableCodePoints())
              e.add(t);
          for (const t of this.allowedCodePoints) e.delete(t);
          return e;
        }
        shouldHighlightNonBasicASCII(e) {
          const t = e.codePointAt(0);
          return this.allowedCodePoints.has(t)
            ? 0
            : this.options.nonBasicASCII
            ? 1
            : this.options.invisibleCharacters &&
              " " !== e &&
              "\n" !== e &&
              "\t" !== e &&
              i.InvisibleCharacters.isInvisibleCharacter(t)
            ? 2
            : this.options.ambiguousCharacters &&
              this.ambiguousCharacters.isAmbiguous(t)
            ? 3
            : 0;
        }
      }
    }),
    e(n[46], r([0, 1]), function (e, t) {
      "use strict";
      var n;
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.WrappingIndent =
          t.TrackedRangeStickiness =
          t.TextEditorCursorStyle =
          t.TextEditorCursorBlinkingStyle =
          t.SymbolTag =
          t.SymbolKind =
          t.SignatureHelpTriggerKind =
          t.SelectionDirection =
          t.ScrollbarVisibility =
          t.ScrollType =
          t.RenderMinimap =
          t.RenderLineNumbersType =
          t.PositionAffinity =
          t.OverviewRulerLane =
          t.OverlayWidgetPositionPreference =
          t.MouseTargetType =
          t.MinimapPosition =
          t.MarkerTag =
          t.MarkerSeverity =
          t.KeyCode =
          t.InlineCompletionTriggerKind =
          t.InlayHintKind =
          t.InjectedTextCursorStops =
          t.IndentAction =
          t.EndOfLineSequence =
          t.EndOfLinePreference =
          t.EditorOption =
          t.EditorAutoIndentStrategy =
          t.DocumentHighlightKind =
          t.DefaultEndOfLine =
          t.CursorChangeReason =
          t.ContentWidgetPositionPreference =
          t.CompletionTriggerKind =
          t.CompletionItemTag =
          t.CompletionItemKind =
          t.CompletionItemInsertTextRule =
          t.AccessibilitySupport =
            void 0),
        ((n = t.AccessibilitySupport || (t.AccessibilitySupport = {}))[
          (n.Unknown = 0)
        ] = "Unknown"),
        (n[(n.Disabled = 1)] = "Disabled"),
        (n[(n.Enabled = 2)] = "Enabled"),
        (function (e) {
          (e[(e.KeepWhitespace = 1)] = "KeepWhitespace"),
            (e[(e.InsertAsSnippet = 4)] = "InsertAsSnippet");
        })(
          t.CompletionItemInsertTextRule ||
            (t.CompletionItemInsertTextRule = {})
        ),
        (function (e) {
          (e[(e.Method = 0)] = "Method"),
            (e[(e.Function = 1)] = "Function"),
            (e[(e.Constructor = 2)] = "Constructor"),
            (e[(e.Field = 3)] = "Field"),
            (e[(e.Variable = 4)] = "Variable"),
            (e[(e.Class = 5)] = "Class"),
            (e[(e.Struct = 6)] = "Struct"),
            (e[(e.Interface = 7)] = "Interface"),
            (e[(e.Module = 8)] = "Module"),
            (e[(e.Property = 9)] = "Property"),
            (e[(e.Event = 10)] = "Event"),
            (e[(e.Operator = 11)] = "Operator"),
            (e[(e.Unit = 12)] = "Unit"),
            (e[(e.Value = 13)] = "Value"),
            (e[(e.Constant = 14)] = "Constant"),
            (e[(e.Enum = 15)] = "Enum"),
            (e[(e.EnumMember = 16)] = "EnumMember"),
            (e[(e.Keyword = 17)] = "Keyword"),
            (e[(e.Text = 18)] = "Text"),
            (e[(e.Color = 19)] = "Color"),
            (e[(e.File = 20)] = "File"),
            (e[(e.Reference = 21)] = "Reference"),
            (e[(e.Customcolor = 22)] = "Customcolor"),
            (e[(e.Folder = 23)] = "Folder"),
            (e[(e.TypeParameter = 24)] = "TypeParameter"),
            (e[(e.User = 25)] = "User"),
            (e[(e.Issue = 26)] = "Issue"),
            (e[(e.Snippet = 27)] = "Snippet");
        })(t.CompletionItemKind || (t.CompletionItemKind = {})),
        (function (e) {
          e[(e.Deprecated = 1)] = "Deprecated";
        })(t.CompletionItemTag || (t.CompletionItemTag = {})),
        (function (e) {
          (e[(e.Invoke = 0)] = "Invoke"),
            (e[(e.TriggerCharacter = 1)] = "TriggerCharacter"),
            (e[(e.TriggerForIncompleteCompletions = 2)] =
              "TriggerForIncompleteCompletions");
        })(t.CompletionTriggerKind || (t.CompletionTriggerKind = {})),
        (function (e) {
          (e[(e.EXACT = 0)] = "EXACT"),
            (e[(e.ABOVE = 1)] = "ABOVE"),
            (e[(e.BELOW = 2)] = "BELOW");
        })(
          t.ContentWidgetPositionPreference ||
            (t.ContentWidgetPositionPreference = {})
        ),
        (function (e) {
          (e[(e.NotSet = 0)] = "NotSet"),
            (e[(e.ContentFlush = 1)] = "ContentFlush"),
            (e[(e.RecoverFromMarkers = 2)] = "RecoverFromMarkers"),
            (e[(e.Explicit = 3)] = "Explicit"),
            (e[(e.Paste = 4)] = "Paste"),
            (e[(e.Undo = 5)] = "Undo"),
            (e[(e.Redo = 6)] = "Redo");
        })(t.CursorChangeReason || (t.CursorChangeReason = {})),
        (function (e) {
          (e[(e.LF = 1)] = "LF"), (e[(e.CRLF = 2)] = "CRLF");
        })(t.DefaultEndOfLine || (t.DefaultEndOfLine = {})),
        (function (e) {
          (e[(e.Text = 0)] = "Text"),
            (e[(e.Read = 1)] = "Read"),
            (e[(e.Write = 2)] = "Write");
        })(t.DocumentHighlightKind || (t.DocumentHighlightKind = {})),
        (function (e) {
          (e[(e.None = 0)] = "None"),
            (e[(e.Keep = 1)] = "Keep"),
            (e[(e.Brackets = 2)] = "Brackets"),
            (e[(e.Advanced = 3)] = "Advanced"),
            (e[(e.Full = 4)] = "Full");
        })(t.EditorAutoIndentStrategy || (t.EditorAutoIndentStrategy = {})),
        (function (e) {
          (e[(e.acceptSuggestionOnCommitCharacter = 0)] =
            "acceptSuggestionOnCommitCharacter"),
            (e[(e.acceptSuggestionOnEnter = 1)] = "acceptSuggestionOnEnter"),
            (e[(e.accessibilitySupport = 2)] = "accessibilitySupport"),
            (e[(e.accessibilityPageSize = 3)] = "accessibilityPageSize"),
            (e[(e.ariaLabel = 4)] = "ariaLabel"),
            (e[(e.autoClosingBrackets = 5)] = "autoClosingBrackets"),
            (e[(e.autoClosingDelete = 6)] = "autoClosingDelete"),
            (e[(e.autoClosingOvertype = 7)] = "autoClosingOvertype"),
            (e[(e.autoClosingQuotes = 8)] = "autoClosingQuotes"),
            (e[(e.autoIndent = 9)] = "autoIndent"),
            (e[(e.automaticLayout = 10)] = "automaticLayout"),
            (e[(e.autoSurround = 11)] = "autoSurround"),
            (e[(e.bracketPairColorization = 12)] = "bracketPairColorization"),
            (e[(e.guides = 13)] = "guides"),
            (e[(e.codeLens = 14)] = "codeLens"),
            (e[(e.codeLensFontFamily = 15)] = "codeLensFontFamily"),
            (e[(e.codeLensFontSize = 16)] = "codeLensFontSize"),
            (e[(e.colorDecorators = 17)] = "colorDecorators"),
            (e[(e.columnSelection = 18)] = "columnSelection"),
            (e[(e.comments = 19)] = "comments"),
            (e[(e.contextmenu = 20)] = "contextmenu"),
            (e[(e.copyWithSyntaxHighlighting = 21)] =
              "copyWithSyntaxHighlighting"),
            (e[(e.cursorBlinking = 22)] = "cursorBlinking"),
            (e[(e.cursorSmoothCaretAnimation = 23)] =
              "cursorSmoothCaretAnimation"),
            (e[(e.cursorStyle = 24)] = "cursorStyle"),
            (e[(e.cursorSurroundingLines = 25)] = "cursorSurroundingLines"),
            (e[(e.cursorSurroundingLinesStyle = 26)] =
              "cursorSurroundingLinesStyle"),
            (e[(e.cursorWidth = 27)] = "cursorWidth"),
            (e[(e.disableLayerHinting = 28)] = "disableLayerHinting"),
            (e[(e.disableMonospaceOptimizations = 29)] =
              "disableMonospaceOptimizations"),
            (e[(e.domReadOnly = 30)] = "domReadOnly"),
            (e[(e.dragAndDrop = 31)] = "dragAndDrop"),
            (e[(e.emptySelectionClipboard = 32)] = "emptySelectionClipboard"),
            (e[(e.extraEditorClassName = 33)] = "extraEditorClassName"),
            (e[(e.fastScrollSensitivity = 34)] = "fastScrollSensitivity"),
            (e[(e.find = 35)] = "find"),
            (e[(e.fixedOverflowWidgets = 36)] = "fixedOverflowWidgets"),
            (e[(e.folding = 37)] = "folding"),
            (e[(e.foldingStrategy = 38)] = "foldingStrategy"),
            (e[(e.foldingHighlight = 39)] = "foldingHighlight"),
            (e[(e.foldingImportsByDefault = 40)] = "foldingImportsByDefault"),
            (e[(e.foldingMaximumRegions = 41)] = "foldingMaximumRegions"),
            (e[(e.unfoldOnClickAfterEndOfLine = 42)] =
              "unfoldOnClickAfterEndOfLine"),
            (e[(e.fontFamily = 43)] = "fontFamily"),
            (e[(e.fontInfo = 44)] = "fontInfo"),
            (e[(e.fontLigatures = 45)] = "fontLigatures"),
            (e[(e.fontSize = 46)] = "fontSize"),
            (e[(e.fontWeight = 47)] = "fontWeight"),
            (e[(e.formatOnPaste = 48)] = "formatOnPaste"),
            (e[(e.formatOnType = 49)] = "formatOnType"),
            (e[(e.glyphMargin = 50)] = "glyphMargin"),
            (e[(e.gotoLocation = 51)] = "gotoLocation"),
            (e[(e.hideCursorInOverviewRuler = 52)] =
              "hideCursorInOverviewRuler"),
            (e[(e.hover = 53)] = "hover"),
            (e[(e.inDiffEditor = 54)] = "inDiffEditor"),
            (e[(e.inlineSuggest = 55)] = "inlineSuggest"),
            (e[(e.letterSpacing = 56)] = "letterSpacing"),
            (e[(e.lightbulb = 57)] = "lightbulb"),
            (e[(e.lineDecorationsWidth = 58)] = "lineDecorationsWidth"),
            (e[(e.lineHeight = 59)] = "lineHeight"),
            (e[(e.lineNumbers = 60)] = "lineNumbers"),
            (e[(e.lineNumbersMinChars = 61)] = "lineNumbersMinChars"),
            (e[(e.linkedEditing = 62)] = "linkedEditing"),
            (e[(e.links = 63)] = "links"),
            (e[(e.matchBrackets = 64)] = "matchBrackets"),
            (e[(e.minimap = 65)] = "minimap"),
            (e[(e.mouseStyle = 66)] = "mouseStyle"),
            (e[(e.mouseWheelScrollSensitivity = 67)] =
              "mouseWheelScrollSensitivity"),
            (e[(e.mouseWheelZoom = 68)] = "mouseWheelZoom"),
            (e[(e.multiCursorMergeOverlapping = 69)] =
              "multiCursorMergeOverlapping"),
            (e[(e.multiCursorModifier = 70)] = "multiCursorModifier"),
            (e[(e.multiCursorPaste = 71)] = "multiCursorPaste"),
            (e[(e.occurrencesHighlight = 72)] = "occurrencesHighlight"),
            (e[(e.overviewRulerBorder = 73)] = "overviewRulerBorder"),
            (e[(e.overviewRulerLanes = 74)] = "overviewRulerLanes"),
            (e[(e.padding = 75)] = "padding"),
            (e[(e.parameterHints = 76)] = "parameterHints"),
            (e[(e.peekWidgetDefaultFocus = 77)] = "peekWidgetDefaultFocus"),
            (e[(e.definitionLinkOpensInPeek = 78)] =
              "definitionLinkOpensInPeek"),
            (e[(e.quickSuggestions = 79)] = "quickSuggestions"),
            (e[(e.quickSuggestionsDelay = 80)] = "quickSuggestionsDelay"),
            (e[(e.readOnly = 81)] = "readOnly"),
            (e[(e.renameOnType = 82)] = "renameOnType"),
            (e[(e.renderControlCharacters = 83)] = "renderControlCharacters"),
            (e[(e.renderFinalNewline = 84)] = "renderFinalNewline"),
            (e[(e.renderLineHighlight = 85)] = "renderLineHighlight"),
            (e[(e.renderLineHighlightOnlyWhenFocus = 86)] =
              "renderLineHighlightOnlyWhenFocus"),
            (e[(e.renderValidationDecorations = 87)] =
              "renderValidationDecorations"),
            (e[(e.renderWhitespace = 88)] = "renderWhitespace"),
            (e[(e.revealHorizontalRightPadding = 89)] =
              "revealHorizontalRightPadding"),
            (e[(e.roundedSelection = 90)] = "roundedSelection"),
            (e[(e.rulers = 91)] = "rulers"),
            (e[(e.scrollbar = 92)] = "scrollbar"),
            (e[(e.scrollBeyondLastColumn = 93)] = "scrollBeyondLastColumn"),
            (e[(e.scrollBeyondLastLine = 94)] = "scrollBeyondLastLine"),
            (e[(e.scrollPredominantAxis = 95)] = "scrollPredominantAxis"),
            (e[(e.selectionClipboard = 96)] = "selectionClipboard"),
            (e[(e.selectionHighlight = 97)] = "selectionHighlight"),
            (e[(e.selectOnLineNumbers = 98)] = "selectOnLineNumbers"),
            (e[(e.showFoldingControls = 99)] = "showFoldingControls"),
            (e[(e.showUnused = 100)] = "showUnused"),
            (e[(e.snippetSuggestions = 101)] = "snippetSuggestions"),
            (e[(e.smartSelect = 102)] = "smartSelect"),
            (e[(e.smoothScrolling = 103)] = "smoothScrolling"),
            (e[(e.stickyTabStops = 104)] = "stickyTabStops"),
            (e[(e.stopRenderingLineAfter = 105)] = "stopRenderingLineAfter"),
            (e[(e.suggest = 106)] = "suggest"),
            (e[(e.suggestFontSize = 107)] = "suggestFontSize"),
            (e[(e.suggestLineHeight = 108)] = "suggestLineHeight"),
            (e[(e.suggestOnTriggerCharacters = 109)] =
              "suggestOnTriggerCharacters"),
            (e[(e.suggestSelection = 110)] = "suggestSelection"),
            (e[(e.tabCompletion = 111)] = "tabCompletion"),
            (e[(e.tabIndex = 112)] = "tabIndex"),
            (e[(e.unicodeHighlighting = 113)] = "unicodeHighlighting"),
            (e[(e.unusualLineTerminators = 114)] = "unusualLineTerminators"),
            (e[(e.useShadowDOM = 115)] = "useShadowDOM"),
            (e[(e.useTabStops = 116)] = "useTabStops"),
            (e[(e.wordSeparators = 117)] = "wordSeparators"),
            (e[(e.wordWrap = 118)] = "wordWrap"),
            (e[(e.wordWrapBreakAfterCharacters = 119)] =
              "wordWrapBreakAfterCharacters"),
            (e[(e.wordWrapBreakBeforeCharacters = 120)] =
              "wordWrapBreakBeforeCharacters"),
            (e[(e.wordWrapColumn = 121)] = "wordWrapColumn"),
            (e[(e.wordWrapOverride1 = 122)] = "wordWrapOverride1"),
            (e[(e.wordWrapOverride2 = 123)] = "wordWrapOverride2"),
            (e[(e.wrappingIndent = 124)] = "wrappingIndent"),
            (e[(e.wrappingStrategy = 125)] = "wrappingStrategy"),
            (e[(e.showDeprecated = 126)] = "showDeprecated"),
            (e[(e.inlayHints = 127)] = "inlayHints"),
            (e[(e.editorClassName = 128)] = "editorClassName"),
            (e[(e.pixelRatio = 129)] = "pixelRatio"),
            (e[(e.tabFocusMode = 130)] = "tabFocusMode"),
            (e[(e.layoutInfo = 131)] = "layoutInfo"),
            (e[(e.wrappingInfo = 132)] = "wrappingInfo");
        })(t.EditorOption || (t.EditorOption = {})),
        (function (e) {
          (e[(e.TextDefined = 0)] = "TextDefined"),
            (e[(e.LF = 1)] = "LF"),
            (e[(e.CRLF = 2)] = "CRLF");
        })(t.EndOfLinePreference || (t.EndOfLinePreference = {})),
        (function (e) {
          (e[(e.LF = 0)] = "LF"), (e[(e.CRLF = 1)] = "CRLF");
        })(t.EndOfLineSequence || (t.EndOfLineSequence = {})),
        (function (e) {
          (e[(e.None = 0)] = "None"),
            (e[(e.Indent = 1)] = "Indent"),
            (e[(e.IndentOutdent = 2)] = "IndentOutdent"),
            (e[(e.Outdent = 3)] = "Outdent");
        })(t.IndentAction || (t.IndentAction = {})),
        (function (e) {
          (e[(e.Both = 0)] = "Both"),
            (e[(e.Right = 1)] = "Right"),
            (e[(e.Left = 2)] = "Left"),
            (e[(e.None = 3)] = "None");
        })(t.InjectedTextCursorStops || (t.InjectedTextCursorStops = {})),
        (function (e) {
          (e[(e.Other = 0)] = "Other"),
            (e[(e.Type = 1)] = "Type"),
            (e[(e.Parameter = 2)] = "Parameter");
        })(t.InlayHintKind || (t.InlayHintKind = {})),
        (function (e) {
          (e[(e.Automatic = 0)] = "Automatic"),
            (e[(e.Explicit = 1)] = "Explicit");
        })(
          t.InlineCompletionTriggerKind || (t.InlineCompletionTriggerKind = {})
        ),
        (function (e) {
          (e[(e.DependsOnKbLayout = -1)] = "DependsOnKbLayout"),
            (e[(e.Unknown = 0)] = "Unknown"),
            (e[(e.Backspace = 1)] = "Backspace"),
            (e[(e.Tab = 2)] = "Tab"),
            (e[(e.Enter = 3)] = "Enter"),
            (e[(e.Shift = 4)] = "Shift"),
            (e[(e.Ctrl = 5)] = "Ctrl"),
            (e[(e.Alt = 6)] = "Alt"),
            (e[(e.PauseBreak = 7)] = "PauseBreak"),
            (e[(e.CapsLock = 8)] = "CapsLock"),
            (e[(e.Escape = 9)] = "Escape"),
            (e[(e.Space = 10)] = "Space"),
            (e[(e.PageUp = 11)] = "PageUp"),
            (e[(e.PageDown = 12)] = "PageDown"),
            (e[(e.End = 13)] = "End"),
            (e[(e.Home = 14)] = "Home"),
            (e[(e.LeftArrow = 15)] = "LeftArrow"),
            (e[(e.UpArrow = 16)] = "UpArrow"),
            (e[(e.RightArrow = 17)] = "RightArrow"),
            (e[(e.DownArrow = 18)] = "DownArrow"),
            (e[(e.Insert = 19)] = "Insert"),
            (e[(e.Delete = 20)] = "Delete"),
            (e[(e.Digit0 = 21)] = "Digit0"),
            (e[(e.Digit1 = 22)] = "Digit1"),
            (e[(e.Digit2 = 23)] = "Digit2"),
            (e[(e.Digit3 = 24)] = "Digit3"),
            (e[(e.Digit4 = 25)] = "Digit4"),
            (e[(e.Digit5 = 26)] = "Digit5"),
            (e[(e.Digit6 = 27)] = "Digit6"),
            (e[(e.Digit7 = 28)] = "Digit7"),
            (e[(e.Digit8 = 29)] = "Digit8"),
            (e[(e.Digit9 = 30)] = "Digit9"),
            (e[(e.KeyA = 31)] = "KeyA"),
            (e[(e.KeyB = 32)] = "KeyB"),
            (e[(e.KeyC = 33)] = "KeyC"),
            (e[(e.KeyD = 34)] = "KeyD"),
            (e[(e.KeyE = 35)] = "KeyE"),
            (e[(e.KeyF = 36)] = "KeyF"),
            (e[(e.KeyG = 37)] = "KeyG"),
            (e[(e.KeyH = 38)] = "KeyH"),
            (e[(e.KeyI = 39)] = "KeyI"),
            (e[(e.KeyJ = 40)] = "KeyJ"),
            (e[(e.KeyK = 41)] = "KeyK"),
            (e[(e.KeyL = 42)] = "KeyL"),
            (e[(e.KeyM = 43)] = "KeyM"),
            (e[(e.KeyN = 44)] = "KeyN"),
            (e[(e.KeyO = 45)] = "KeyO"),
            (e[(e.KeyP = 46)] = "KeyP"),
            (e[(e.KeyQ = 47)] = "KeyQ"),
            (e[(e.KeyR = 48)] = "KeyR"),
            (e[(e.KeyS = 49)] = "KeyS"),
            (e[(e.KeyT = 50)] = "KeyT"),
            (e[(e.KeyU = 51)] = "KeyU"),
            (e[(e.KeyV = 52)] = "KeyV"),
            (e[(e.KeyW = 53)] = "KeyW"),
            (e[(e.KeyX = 54)] = "KeyX"),
            (e[(e.KeyY = 55)] = "KeyY"),
            (e[(e.KeyZ = 56)] = "KeyZ"),
            (e[(e.Meta = 57)] = "Meta"),
            (e[(e.ContextMenu = 58)] = "ContextMenu"),
            (e[(e.F1 = 59)] = "F1"),
            (e[(e.F2 = 60)] = "F2"),
            (e[(e.F3 = 61)] = "F3"),
            (e[(e.F4 = 62)] = "F4"),
            (e[(e.F5 = 63)] = "F5"),
            (e[(e.F6 = 64)] = "F6"),
            (e[(e.F7 = 65)] = "F7"),
            (e[(e.F8 = 66)] = "F8"),
            (e[(e.F9 = 67)] = "F9"),
            (e[(e.F10 = 68)] = "F10"),
            (e[(e.F11 = 69)] = "F11"),
            (e[(e.F12 = 70)] = "F12"),
            (e[(e.F13 = 71)] = "F13"),
            (e[(e.F14 = 72)] = "F14"),
            (e[(e.F15 = 73)] = "F15"),
            (e[(e.F16 = 74)] = "F16"),
            (e[(e.F17 = 75)] = "F17"),
            (e[(e.F18 = 76)] = "F18"),
            (e[(e.F19 = 77)] = "F19"),
            (e[(e.NumLock = 78)] = "NumLock"),
            (e[(e.ScrollLock = 79)] = "ScrollLock"),
            (e[(e.Semicolon = 80)] = "Semicolon"),
            (e[(e.Equal = 81)] = "Equal"),
            (e[(e.Comma = 82)] = "Comma"),
            (e[(e.Minus = 83)] = "Minus"),
            (e[(e.Period = 84)] = "Period"),
            (e[(e.Slash = 85)] = "Slash"),
            (e[(e.Backquote = 86)] = "Backquote"),
            (e[(e.BracketLeft = 87)] = "BracketLeft"),
            (e[(e.Backslash = 88)] = "Backslash"),
            (e[(e.BracketRight = 89)] = "BracketRight"),
            (e[(e.Quote = 90)] = "Quote"),
            (e[(e.OEM_8 = 91)] = "OEM_8"),
            (e[(e.IntlBackslash = 92)] = "IntlBackslash"),
            (e[(e.Numpad0 = 93)] = "Numpad0"),
            (e[(e.Numpad1 = 94)] = "Numpad1"),
            (e[(e.Numpad2 = 95)] = "Numpad2"),
            (e[(e.Numpad3 = 96)] = "Numpad3"),
            (e[(e.Numpad4 = 97)] = "Numpad4"),
            (e[(e.Numpad5 = 98)] = "Numpad5"),
            (e[(e.Numpad6 = 99)] = "Numpad6"),
            (e[(e.Numpad7 = 100)] = "Numpad7"),
            (e[(e.Numpad8 = 101)] = "Numpad8"),
            (e[(e.Numpad9 = 102)] = "Numpad9"),
            (e[(e.NumpadMultiply = 103)] = "NumpadMultiply"),
            (e[(e.NumpadAdd = 104)] = "NumpadAdd"),
            (e[(e.NUMPAD_SEPARATOR = 105)] = "NUMPAD_SEPARATOR"),
            (e[(e.NumpadSubtract = 106)] = "NumpadSubtract"),
            (e[(e.NumpadDecimal = 107)] = "NumpadDecimal"),
            (e[(e.NumpadDivide = 108)] = "NumpadDivide"),
            (e[(e.KEY_IN_COMPOSITION = 109)] = "KEY_IN_COMPOSITION"),
            (e[(e.ABNT_C1 = 110)] = "ABNT_C1"),
            (e[(e.ABNT_C2 = 111)] = "ABNT_C2"),
            (e[(e.AudioVolumeMute = 112)] = "AudioVolumeMute"),
            (e[(e.AudioVolumeUp = 113)] = "AudioVolumeUp"),
            (e[(e.AudioVolumeDown = 114)] = "AudioVolumeDown"),
            (e[(e.BrowserSearch = 115)] = "BrowserSearch"),
            (e[(e.BrowserHome = 116)] = "BrowserHome"),
            (e[(e.BrowserBack = 117)] = "BrowserBack"),
            (e[(e.BrowserForward = 118)] = "BrowserForward"),
            (e[(e.MediaTrackNext = 119)] = "MediaTrackNext"),
            (e[(e.MediaTrackPrevious = 120)] = "MediaTrackPrevious"),
            (e[(e.MediaStop = 121)] = "MediaStop"),
            (e[(e.MediaPlayPause = 122)] = "MediaPlayPause"),
            (e[(e.LaunchMediaPlayer = 123)] = "LaunchMediaPlayer"),
            (e[(e.LaunchMail = 124)] = "LaunchMail"),
            (e[(e.LaunchApp2 = 125)] = "LaunchApp2"),
            (e[(e.MAX_VALUE = 126)] = "MAX_VALUE");
        })(t.KeyCode || (t.KeyCode = {})),
        (function (e) {
          (e[(e.Hint = 1)] = "Hint"),
            (e[(e.Info = 2)] = "Info"),
            (e[(e.Warning = 4)] = "Warning"),
            (e[(e.Error = 8)] = "Error");
        })(t.MarkerSeverity || (t.MarkerSeverity = {})),
        (function (e) {
          (e[(e.Unnecessary = 1)] = "Unnecessary"),
            (e[(e.Deprecated = 2)] = "Deprecated");
        })(t.MarkerTag || (t.MarkerTag = {})),
        (function (e) {
          (e[(e.Inline = 1)] = "Inline"), (e[(e.Gutter = 2)] = "Gutter");
        })(t.MinimapPosition || (t.MinimapPosition = {})),
        (function (e) {
          (e[(e.UNKNOWN = 0)] = "UNKNOWN"),
            (e[(e.TEXTAREA = 1)] = "TEXTAREA"),
            (e[(e.GUTTER_GLYPH_MARGIN = 2)] = "GUTTER_GLYPH_MARGIN"),
            (e[(e.GUTTER_LINE_NUMBERS = 3)] = "GUTTER_LINE_NUMBERS"),
            (e[(e.GUTTER_LINE_DECORATIONS = 4)] = "GUTTER_LINE_DECORATIONS"),
            (e[(e.GUTTER_VIEW_ZONE = 5)] = "GUTTER_VIEW_ZONE"),
            (e[(e.CONTENT_TEXT = 6)] = "CONTENT_TEXT"),
            (e[(e.CONTENT_EMPTY = 7)] = "CONTENT_EMPTY"),
            (e[(e.CONTENT_VIEW_ZONE = 8)] = "CONTENT_VIEW_ZONE"),
            (e[(e.CONTENT_WIDGET = 9)] = "CONTENT_WIDGET"),
            (e[(e.OVERVIEW_RULER = 10)] = "OVERVIEW_RULER"),
            (e[(e.SCROLLBAR = 11)] = "SCROLLBAR"),
            (e[(e.OVERLAY_WIDGET = 12)] = "OVERLAY_WIDGET"),
            (e[(e.OUTSIDE_EDITOR = 13)] = "OUTSIDE_EDITOR");
        })(t.MouseTargetType || (t.MouseTargetType = {})),
        (function (e) {
          (e[(e.TOP_RIGHT_CORNER = 0)] = "TOP_RIGHT_CORNER"),
            (e[(e.BOTTOM_RIGHT_CORNER = 1)] = "BOTTOM_RIGHT_CORNER"),
            (e[(e.TOP_CENTER = 2)] = "TOP_CENTER");
        })(
          t.OverlayWidgetPositionPreference ||
            (t.OverlayWidgetPositionPreference = {})
        ),
        (function (e) {
          (e[(e.Left = 1)] = "Left"),
            (e[(e.Center = 2)] = "Center"),
            (e[(e.Right = 4)] = "Right"),
            (e[(e.Full = 7)] = "Full");
        })(t.OverviewRulerLane || (t.OverviewRulerLane = {})),
        (function (e) {
          (e[(e.Left = 0)] = "Left"),
            (e[(e.Right = 1)] = "Right"),
            (e[(e.None = 2)] = "None");
        })(t.PositionAffinity || (t.PositionAffinity = {})),
        (function (e) {
          (e[(e.Off = 0)] = "Off"),
            (e[(e.On = 1)] = "On"),
            (e[(e.Relative = 2)] = "Relative"),
            (e[(e.Interval = 3)] = "Interval"),
            (e[(e.Custom = 4)] = "Custom");
        })(t.RenderLineNumbersType || (t.RenderLineNumbersType = {})),
        (function (e) {
          (e[(e.None = 0)] = "None"),
            (e[(e.Text = 1)] = "Text"),
            (e[(e.Blocks = 2)] = "Blocks");
        })(t.RenderMinimap || (t.RenderMinimap = {})),
        (function (e) {
          (e[(e.Smooth = 0)] = "Smooth"), (e[(e.Immediate = 1)] = "Immediate");
        })(t.ScrollType || (t.ScrollType = {})),
        (function (e) {
          (e[(e.Auto = 1)] = "Auto"),
            (e[(e.Hidden = 2)] = "Hidden"),
            (e[(e.Visible = 3)] = "Visible");
        })(t.ScrollbarVisibility || (t.ScrollbarVisibility = {})),
        (function (e) {
          (e[(e.LTR = 0)] = "LTR"), (e[(e.RTL = 1)] = "RTL");
        })(t.SelectionDirection || (t.SelectionDirection = {})),
        (function (e) {
          (e[(e.Invoke = 1)] = "Invoke"),
            (e[(e.TriggerCharacter = 2)] = "TriggerCharacter"),
            (e[(e.ContentChange = 3)] = "ContentChange");
        })(t.SignatureHelpTriggerKind || (t.SignatureHelpTriggerKind = {})),
        (function (e) {
          (e[(e.File = 0)] = "File"),
            (e[(e.Module = 1)] = "Module"),
            (e[(e.Namespace = 2)] = "Namespace"),
            (e[(e.Package = 3)] = "Package"),
            (e[(e.Class = 4)] = "Class"),
            (e[(e.Method = 5)] = "Method"),
            (e[(e.Property = 6)] = "Property"),
            (e[(e.Field = 7)] = "Field"),
            (e[(e.Constructor = 8)] = "Constructor"),
            (e[(e.Enum = 9)] = "Enum"),
            (e[(e.Interface = 10)] = "Interface"),
            (e[(e.Function = 11)] = "Function"),
            (e[(e.Variable = 12)] = "Variable"),
            (e[(e.Constant = 13)] = "Constant"),
            (e[(e.String = 14)] = "String"),
            (e[(e.Number = 15)] = "Number"),
            (e[(e.Boolean = 16)] = "Boolean"),
            (e[(e.Array = 17)] = "Array"),
            (e[(e.Object = 18)] = "Object"),
            (e[(e.Key = 19)] = "Key"),
            (e[(e.Null = 20)] = "Null"),
            (e[(e.EnumMember = 21)] = "EnumMember"),
            (e[(e.Struct = 22)] = "Struct"),
            (e[(e.Event = 23)] = "Event"),
            (e[(e.Operator = 24)] = "Operator"),
            (e[(e.TypeParameter = 25)] = "TypeParameter");
        })(t.SymbolKind || (t.SymbolKind = {})),
        (function (e) {
          e[(e.Deprecated = 1)] = "Deprecated";
        })(t.SymbolTag || (t.SymbolTag = {})),
        (function (e) {
          (e[(e.Hidden = 0)] = "Hidden"),
            (e[(e.Blink = 1)] = "Blink"),
            (e[(e.Smooth = 2)] = "Smooth"),
            (e[(e.Phase = 3)] = "Phase"),
            (e[(e.Expand = 4)] = "Expand"),
            (e[(e.Solid = 5)] = "Solid");
        })(
          t.TextEditorCursorBlinkingStyle ||
            (t.TextEditorCursorBlinkingStyle = {})
        ),
        (function (e) {
          (e[(e.Line = 1)] = "Line"),
            (e[(e.Block = 2)] = "Block"),
            (e[(e.Underline = 3)] = "Underline"),
            (e[(e.LineThin = 4)] = "LineThin"),
            (e[(e.BlockOutline = 5)] = "BlockOutline"),
            (e[(e.UnderlineThin = 6)] = "UnderlineThin");
        })(t.TextEditorCursorStyle || (t.TextEditorCursorStyle = {})),
        (function (e) {
          (e[(e.AlwaysGrowsWhenTypingAtEdges = 0)] =
            "AlwaysGrowsWhenTypingAtEdges"),
            (e[(e.NeverGrowsWhenTypingAtEdges = 1)] =
              "NeverGrowsWhenTypingAtEdges"),
            (e[(e.GrowsOnlyWhenTypingBefore = 2)] =
              "GrowsOnlyWhenTypingBefore"),
            (e[(e.GrowsOnlyWhenTypingAfter = 3)] = "GrowsOnlyWhenTypingAfter");
        })(t.TrackedRangeStickiness || (t.TrackedRangeStickiness = {})),
        (function (e) {
          (e[(e.None = 0)] = "None"),
            (e[(e.Same = 1)] = "Same"),
            (e[(e.Indent = 2)] = "Indent"),
            (e[(e.DeepIndent = 3)] = "DeepIndent");
        })(t.WrappingIndent || (t.WrappingIndent = {}));
    }),
    e(n[47], r([0, 1, 4, 7]), function (e, t, n, r) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.TokenizationRegistry = void 0);
      t.TokenizationRegistry = class {
        constructor() {
          (this._map = new Map()),
            (this._factories = new Map()),
            (this._onDidChange = new n.Emitter()),
            (this.onDidChange = this._onDidChange.event),
            (this._colorMap = null);
        }
        fire(e) {
          this._onDidChange.fire({ changedLanguages: e, changedColorMap: !1 });
        }
        register(e, t) {
          return (
            this._map.set(e, t),
            this.fire([e]),
            (0, r.toDisposable)(() => {
              this._map.get(e) === t && (this._map.delete(e), this.fire([e]));
            })
          );
        }
        registerFactory(e, t) {
          var n;
          null === (n = this._factories.get(e)) || void 0 === n || n.dispose();
          const o = new i(this, e, t);
          return (
            this._factories.set(e, o),
            (0, r.toDisposable)(() => {
              const t = this._factories.get(e);
              !t || t !== o || (this._factories.delete(e), t.dispose());
            })
          );
        }
        getOrCreate(e) {
          return s(this, void 0, void 0, function* () {
            const t = this.get(e);
            if (t) return t;
            const n = this._factories.get(e);
            return !n || n.isResolved ? null : (yield n.resolve(), this.get(e));
          });
        }
        get(e) {
          return this._map.get(e) || null;
        }
        isResolved(e) {
          if (this.get(e)) return !0;
          const t = this._factories.get(e);
          return !(t && !t.isResolved);
        }
        setColorMap(e) {
          (this._colorMap = e),
            this._onDidChange.fire({
              changedLanguages: Array.from(this._map.keys()),
              changedColorMap: !0,
            });
        }
        getColorMap() {
          return this._colorMap;
        }
        getDefaultBackground() {
          return this._colorMap && this._colorMap.length > 2
            ? this._colorMap[2]
            : null;
        }
      };
      class i extends r.Disposable {
        constructor(e, t, n) {
          super(),
            (this._registry = e),
            (this._languageId = t),
            (this._factory = n),
            (this._isDisposed = !1),
            (this._resolvePromise = null),
            (this._isResolved = !1);
        }
        get isResolved() {
          return this._isResolved;
        }
        dispose() {
          (this._isDisposed = !0), super.dispose();
        }
        resolve() {
          return s(this, void 0, void 0, function* () {
            return (
              this._resolvePromise || (this._resolvePromise = this._create()),
              this._resolvePromise
            );
          });
        }
        _create() {
          return s(this, void 0, void 0, function* () {
            const e = yield Promise.resolve(
              this._factory.createTokenizationSupport()
            );
            (this._isResolved = !0),
              e &&
                !this._isDisposed &&
                this._register(this._registry.register(this._languageId, e));
          });
        }
      }
    }),
    e(n[48], r([0, 1, 11, 6, 41, 47, 20]), function (e, t, n, r, i, o, s) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.TokenizationRegistry =
          t.DocumentRangeSemanticTokensProviderRegistry =
          t.DocumentSemanticTokensProviderRegistry =
          t.FoldingRangeProviderRegistry =
          t.SelectionRangeRegistry =
          t.ColorProviderRegistry =
          t.LinkProviderRegistry =
          t.OnTypeFormattingEditProviderRegistry =
          t.DocumentRangeFormattingEditProviderRegistry =
          t.DocumentFormattingEditProviderRegistry =
          t.CodeActionProviderRegistry =
          t.InlayHintsProviderRegistry =
          t.CodeLensProviderRegistry =
          t.TypeDefinitionProviderRegistry =
          t.ImplementationProviderRegistry =
          t.DeclarationProviderRegistry =
          t.DefinitionProviderRegistry =
          t.LinkedEditingRangeProviderRegistry =
          t.DocumentHighlightProviderRegistry =
          t.DocumentSymbolProviderRegistry =
          t.InlineValuesProviderRegistry =
          t.EvaluatableExpressionProviderRegistry =
          t.HoverProviderRegistry =
          t.SignatureHelpProviderRegistry =
          t.InlineCompletionsProviderRegistry =
          t.CompletionProviderRegistry =
          t.RenameProviderRegistry =
          t.ReferenceProviderRegistry =
          t.InlayHintKind =
          t.Command =
          t.FoldingRangeKind =
          t.SymbolKinds =
          t.isLocationLink =
          t.DocumentHighlightKind =
          t.SignatureHelpTriggerKind =
          t.InlineCompletionTriggerKind =
          t.CompletionItemKinds =
          t.EncodedTokenizationResult =
          t.TokenizationResult =
          t.Token =
          t.TokenMetadata =
            void 0);
      t.TokenMetadata = class {
        static getLanguageId(e) {
          return (255 & e) >>> 0;
        }
        static getTokenType(e) {
          return (768 & e) >>> 8;
        }
        static getFontStyle(e) {
          return (15360 & e) >>> 10;
        }
        static getForeground(e) {
          return (8372224 & e) >>> 14;
        }
        static getBackground(e) {
          return (4286578688 & e) >>> 23;
        }
        static getClassNameFromMetadata(e) {
          let t = "mtk" + this.getForeground(e);
          const n = this.getFontStyle(e);
          return (
            1 & n && (t += " mtki"),
            2 & n && (t += " mtkb"),
            4 & n && (t += " mtku"),
            8 & n && (t += " mtks"),
            t
          );
        }
        static getInlineStyleFromMetadata(e, t) {
          const n = this.getForeground(e),
            r = this.getFontStyle(e);
          let i = `color: ${t[n]};`;
          1 & r && (i += "font-style: italic;"),
            2 & r && (i += "font-weight: bold;");
          let o = "";
          return (
            4 & r && (o += " underline"),
            8 & r && (o += " line-through"),
            o && (i += `text-decoration:${o};`),
            i
          );
        }
        static getPresentationFromMetadata(e) {
          const t = this.getForeground(e),
            n = this.getFontStyle(e);
          return {
            foreground: t,
            italic: Boolean(1 & n),
            bold: Boolean(2 & n),
            underline: Boolean(4 & n),
            strikethrough: Boolean(8 & n),
          };
        }
      };
      t.Token = class {
        constructor(e, t, n) {
          (this._tokenBrand = void 0),
            (this.offset = e),
            (this.type = t),
            (this.language = n);
        }
        toString() {
          return "(" + this.offset + ", " + this.type + ")";
        }
      };
      t.TokenizationResult = class {
        constructor(e, t) {
          (this._tokenizationResultBrand = void 0),
            (this.tokens = e),
            (this.endState = t);
        }
      };
      var a;
      (t.EncodedTokenizationResult = class {
        constructor(e, t) {
          (this._encodedTokenizationResultBrand = void 0),
            (this.tokens = e),
            (this.endState = t);
        }
      }),
        (function (e) {
          const t = new Map();
          t.set(0, s.Codicon.symbolMethod),
            t.set(1, s.Codicon.symbolFunction),
            t.set(2, s.Codicon.symbolConstructor),
            t.set(3, s.Codicon.symbolField),
            t.set(4, s.Codicon.symbolVariable),
            t.set(5, s.Codicon.symbolClass),
            t.set(6, s.Codicon.symbolStruct),
            t.set(7, s.Codicon.symbolInterface),
            t.set(8, s.Codicon.symbolModule),
            t.set(9, s.Codicon.symbolProperty),
            t.set(10, s.Codicon.symbolEvent),
            t.set(11, s.Codicon.symbolOperator),
            t.set(12, s.Codicon.symbolUnit),
            t.set(13, s.Codicon.symbolValue),
            t.set(15, s.Codicon.symbolEnum),
            t.set(14, s.Codicon.symbolConstant),
            t.set(15, s.Codicon.symbolEnum),
            t.set(16, s.Codicon.symbolEnumMember),
            t.set(17, s.Codicon.symbolKeyword),
            t.set(27, s.Codicon.symbolSnippet),
            t.set(18, s.Codicon.symbolText),
            t.set(19, s.Codicon.symbolColor),
            t.set(20, s.Codicon.symbolFile),
            t.set(21, s.Codicon.symbolReference),
            t.set(22, s.Codicon.symbolCustomColor),
            t.set(23, s.Codicon.symbolFolder),
            t.set(24, s.Codicon.symbolTypeParameter),
            t.set(25, s.Codicon.account),
            t.set(26, s.Codicon.issues),
            (e.toIcon = function (e) {
              let n = t.get(e);
              return (
                n ||
                  (console.info("No codicon found for CompletionItemKind " + e),
                  (n = s.Codicon.symbolProperty)),
                n
              );
            });
          const n = new Map();
          n.set("method", 0),
            n.set("function", 1),
            n.set("constructor", 2),
            n.set("field", 3),
            n.set("variable", 4),
            n.set("class", 5),
            n.set("struct", 6),
            n.set("interface", 7),
            n.set("module", 8),
            n.set("property", 9),
            n.set("event", 10),
            n.set("operator", 11),
            n.set("unit", 12),
            n.set("value", 13),
            n.set("constant", 14),
            n.set("enum", 15),
            n.set("enum-member", 16),
            n.set("enumMember", 16),
            n.set("keyword", 17),
            n.set("snippet", 27),
            n.set("text", 18),
            n.set("color", 19),
            n.set("file", 20),
            n.set("reference", 21),
            n.set("customcolor", 22),
            n.set("folder", 23),
            n.set("type-parameter", 24),
            n.set("typeParameter", 24),
            n.set("account", 25),
            n.set("issue", 26),
            (e.fromString = function (e, t) {
              let r = n.get(e);
              return "undefined" == typeof r && !t && (r = 9), r;
            });
        })(t.CompletionItemKinds || (t.CompletionItemKinds = {})),
        ((a =
          t.InlineCompletionTriggerKind ||
          (t.InlineCompletionTriggerKind = {}))[(a.Automatic = 0)] =
          "Automatic"),
        (a[(a.Explicit = 1)] = "Explicit"),
        (function (e) {
          (e[(e.Invoke = 1)] = "Invoke"),
            (e[(e.TriggerCharacter = 2)] = "TriggerCharacter"),
            (e[(e.ContentChange = 3)] = "ContentChange");
        })(t.SignatureHelpTriggerKind || (t.SignatureHelpTriggerKind = {})),
        (function (e) {
          (e[(e.Text = 0)] = "Text"),
            (e[(e.Read = 1)] = "Read"),
            (e[(e.Write = 2)] = "Write");
        })(t.DocumentHighlightKind || (t.DocumentHighlightKind = {})),
        (t.isLocationLink = function (e) {
          return (
            e &&
            n.URI.isUri(e.uri) &&
            r.Range.isIRange(e.range) &&
            (r.Range.isIRange(e.originSelectionRange) ||
              r.Range.isIRange(e.targetSelectionRange))
          );
        }),
        (function (e) {
          const t = new Map();
          t.set(0, s.Codicon.symbolFile),
            t.set(1, s.Codicon.symbolModule),
            t.set(2, s.Codicon.symbolNamespace),
            t.set(3, s.Codicon.symbolPackage),
            t.set(4, s.Codicon.symbolClass),
            t.set(5, s.Codicon.symbolMethod),
            t.set(6, s.Codicon.symbolProperty),
            t.set(7, s.Codicon.symbolField),
            t.set(8, s.Codicon.symbolConstructor),
            t.set(9, s.Codicon.symbolEnum),
            t.set(10, s.Codicon.symbolInterface),
            t.set(11, s.Codicon.symbolFunction),
            t.set(12, s.Codicon.symbolVariable),
            t.set(13, s.Codicon.symbolConstant),
            t.set(14, s.Codicon.symbolString),
            t.set(15, s.Codicon.symbolNumber),
            t.set(16, s.Codicon.symbolBoolean),
            t.set(17, s.Codicon.symbolArray),
            t.set(18, s.Codicon.symbolObject),
            t.set(19, s.Codicon.symbolKey),
            t.set(20, s.Codicon.symbolNull),
            t.set(21, s.Codicon.symbolEnumMember),
            t.set(22, s.Codicon.symbolStruct),
            t.set(23, s.Codicon.symbolEvent),
            t.set(24, s.Codicon.symbolOperator),
            t.set(25, s.Codicon.symbolTypeParameter),
            (e.toIcon = function (e) {
              let n = t.get(e);
              return (
                n ||
                  (console.info("No codicon found for SymbolKind " + e),
                  (n = s.Codicon.symbolProperty)),
                n
              );
            });
        })(t.SymbolKinds || (t.SymbolKinds = {}));
      class l {
        constructor(e) {
          this.value = e;
        }
      }
      (t.FoldingRangeKind = l),
        (l.Comment = new l("comment")),
        (l.Imports = new l("imports")),
        (l.Region = new l("region")),
        (function (e) {
          e.is = function (e) {
            return (
              !(!e || "object" != typeof e) &&
              "string" == typeof e.id &&
              "string" == typeof e.title
            );
          };
        })(t.Command || (t.Command = {})),
        (function (e) {
          (e[(e.Other = 0)] = "Other"),
            (e[(e.Type = 1)] = "Type"),
            (e[(e.Parameter = 2)] = "Parameter");
        })(t.InlayHintKind || (t.InlayHintKind = {})),
        (t.ReferenceProviderRegistry = new i.LanguageFeatureRegistry()),
        (t.RenameProviderRegistry = new i.LanguageFeatureRegistry()),
        (t.CompletionProviderRegistry = new i.LanguageFeatureRegistry()),
        (t.InlineCompletionsProviderRegistry = new i.LanguageFeatureRegistry()),
        (t.SignatureHelpProviderRegistry = new i.LanguageFeatureRegistry()),
        (t.HoverProviderRegistry = new i.LanguageFeatureRegistry()),
        (t.EvaluatableExpressionProviderRegistry =
          new i.LanguageFeatureRegistry()),
        (t.InlineValuesProviderRegistry = new i.LanguageFeatureRegistry()),
        (t.DocumentSymbolProviderRegistry = new i.LanguageFeatureRegistry()),
        (t.DocumentHighlightProviderRegistry = new i.LanguageFeatureRegistry()),
        (t.LinkedEditingRangeProviderRegistry =
          new i.LanguageFeatureRegistry()),
        (t.DefinitionProviderRegistry = new i.LanguageFeatureRegistry()),
        (t.DeclarationProviderRegistry = new i.LanguageFeatureRegistry()),
        (t.ImplementationProviderRegistry = new i.LanguageFeatureRegistry()),
        (t.TypeDefinitionProviderRegistry = new i.LanguageFeatureRegistry()),
        (t.CodeLensProviderRegistry = new i.LanguageFeatureRegistry()),
        (t.InlayHintsProviderRegistry = new i.LanguageFeatureRegistry()),
        (t.CodeActionProviderRegistry = new i.LanguageFeatureRegistry()),
        (t.DocumentFormattingEditProviderRegistry =
          new i.LanguageFeatureRegistry()),
        (t.DocumentRangeFormattingEditProviderRegistry =
          new i.LanguageFeatureRegistry()),
        (t.OnTypeFormattingEditProviderRegistry =
          new i.LanguageFeatureRegistry()),
        (t.LinkProviderRegistry = new i.LanguageFeatureRegistry()),
        (t.ColorProviderRegistry = new i.LanguageFeatureRegistry()),
        (t.SelectionRangeRegistry = new i.LanguageFeatureRegistry()),
        (t.FoldingRangeProviderRegistry = new i.LanguageFeatureRegistry()),
        (t.DocumentSemanticTokensProviderRegistry =
          new i.LanguageFeatureRegistry()),
        (t.DocumentRangeSemanticTokensProviderRegistry =
          new i.LanguageFeatureRegistry()),
        (t.TokenizationRegistry = new o.TokenizationRegistry());
    }),
    e(
      n[49],
      r([0, 1, 13, 4, 24, 11, 5, 6, 34, 48, 46]),
      function (e, t, n, r, i, o, s, a, l, u, c) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.createMonacoBaseAPI = t.KeyMod = void 0);
        class h {
          static chord(e, t) {
            return (0, i.KeyChord)(e, t);
          }
        }
        (t.KeyMod = h),
          (h.CtrlCmd = 2048),
          (h.Shift = 1024),
          (h.Alt = 512),
          (h.WinCtrl = 256),
          (t.createMonacoBaseAPI = function () {
            return {
              editor: void 0,
              languages: void 0,
              CancellationTokenSource: n.CancellationTokenSource,
              Emitter: r.Emitter,
              KeyCode: c.KeyCode,
              KeyMod: h,
              Position: s.Position,
              Range: a.Range,
              Selection: l.Selection,
              SelectionDirection: c.SelectionDirection,
              MarkerSeverity: c.MarkerSeverity,
              MarkerTag: c.MarkerTag,
              Uri: o.URI,
              Token: u.Token,
            };
          });
      }
    ),
    e(
      n[51],
      r([0, 1, 14, 3, 11, 5, 6, 37, 43, 36, 39, 40, 49, 9, 12, 45]),
      function (e, t, n, r, i, o, a, l, u, c, h, d, f, g, m, p) {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.create = t.EditorSimpleWorker = t.MirrorModel = void 0);
        class _ extends u.MirrorTextModel {
          get uri() {
            return this._uri;
          }
          get eol() {
            return this._eol;
          }
          getValue() {
            return this.getText();
          }
          getLinesContent() {
            return this._lines.slice(0);
          }
          getLineCount() {
            return this._lines.length;
          }
          getLineContent(e) {
            return this._lines[e - 1];
          }
          getWordAtPosition(e, t) {
            const n = (0, c.getWordAtText)(
              e.column,
              (0, c.ensureValidWordDefinition)(t),
              this._lines[e.lineNumber - 1],
              0
            );
            return n
              ? new a.Range(
                  e.lineNumber,
                  n.startColumn,
                  e.lineNumber,
                  n.endColumn
                )
              : null;
          }
          words(e) {
            const t = this._lines,
              n = this._wordenize.bind(this);
            let r = 0,
              i = "",
              o = 0,
              s = [];
            return {
              *[Symbol.iterator]() {
                for (;;)
                  if (o < s.length) {
                    const e = i.substring(s[o].start, s[o].end);
                    (o += 1), yield e;
                  } else {
                    if (!(r < t.length)) break;
                    (i = t[r]), (s = n(i, e)), (o = 0), (r += 1);
                  }
              },
            };
          }
          getLineWords(e, t) {
            const n = this._lines[e - 1],
              r = this._wordenize(n, t),
              i = [];
            for (const o of r)
              i.push({
                word: n.substring(o.start, o.end),
                startColumn: o.start + 1,
                endColumn: o.end + 1,
              });
            return i;
          }
          _wordenize(e, t) {
            const n = [];
            let r;
            for (t.lastIndex = 0; (r = t.exec(e)) && 0 !== r[0].length; )
              n.push({ start: r.index, end: r.index + r[0].length });
            return n;
          }
          getValueInRange(e) {
            if (
              (e = this._validateRange(e)).startLineNumber === e.endLineNumber
            )
              return this._lines[e.startLineNumber - 1].substring(
                e.startColumn - 1,
                e.endColumn - 1
              );
            const t = this._eol,
              n = e.startLineNumber - 1,
              r = e.endLineNumber - 1,
              i = [];
            i.push(this._lines[n].substring(e.startColumn - 1));
            for (let o = n + 1; o < r; o++) i.push(this._lines[o]);
            return (
              i.push(this._lines[r].substring(0, e.endColumn - 1)), i.join(t)
            );
          }
          offsetAt(e) {
            return (
              (e = this._validatePosition(e)),
              this._ensureLineStarts(),
              this._lineStarts.getPrefixSum(e.lineNumber - 2) + (e.column - 1)
            );
          }
          positionAt(e) {
            (e = Math.floor(e)), (e = Math.max(0, e)), this._ensureLineStarts();
            const t = this._lineStarts.getIndexOf(e),
              n = this._lines[t.index].length;
            return {
              lineNumber: 1 + t.index,
              column: 1 + Math.min(t.remainder, n),
            };
          }
          _validateRange(e) {
            const t = this._validatePosition({
                lineNumber: e.startLineNumber,
                column: e.startColumn,
              }),
              n = this._validatePosition({
                lineNumber: e.endLineNumber,
                column: e.endColumn,
              });
            return t.lineNumber !== e.startLineNumber ||
              t.column !== e.startColumn ||
              n.lineNumber !== e.endLineNumber ||
              n.column !== e.endColumn
              ? {
                  startLineNumber: t.lineNumber,
                  startColumn: t.column,
                  endLineNumber: n.lineNumber,
                  endColumn: n.column,
                }
              : e;
          }
          _validatePosition(e) {
            if (!o.Position.isIPosition(e)) throw new Error("bad position");
            let { lineNumber: t, column: n } = e,
              r = !1;
            if (t < 1) (t = 1), (n = 1), (r = !0);
            else if (t > this._lines.length)
              (t = this._lines.length),
                (n = this._lines[t - 1].length + 1),
                (r = !0);
            else {
              const e = this._lines[t - 1].length + 1;
              n < 1 ? ((n = 1), (r = !0)) : n > e && ((n = e), (r = !0));
            }
            return r ? { lineNumber: t, column: n } : e;
          }
        }
        t.MirrorModel = _;
        class b {
          constructor(e, t) {
            (this._host = e),
              (this._models = Object.create(null)),
              (this._foreignModuleFactory = t),
              (this._foreignModule = null);
          }
          dispose() {
            this._models = Object.create(null);
          }
          _getModel(e) {
            return this._models[e];
          }
          _getModels() {
            const e = [];
            return (
              Object.keys(this._models).forEach((t) => e.push(this._models[t])),
              e
            );
          }
          acceptNewModel(e) {
            this._models[e.url] = new _(
              i.URI.parse(e.url),
              e.lines,
              e.EOL,
              e.versionId
            );
          }
          acceptModelChanged(e, t) {
            this._models[e] && this._models[e].onEvents(t);
          }
          acceptRemovedModel(e) {
            !this._models[e] || delete this._models[e];
          }
          computeUnicodeHighlights(e, t, n) {
            return s(this, void 0, void 0, function* () {
              const r = this._getModel(e);
              return r
                ? p.UnicodeTextModelHighlighter.computeUnicodeHighlights(
                    r,
                    t,
                    n
                  )
                : {
                    ranges: [],
                    hasMore: !1,
                    ambiguousCharacterCount: 0,
                    invisibleCharacterCount: 0,
                    nonBasicAsciiCharacterCount: 0,
                  };
            });
          }
          computeDiff(e, t, n, r) {
            return s(this, void 0, void 0, function* () {
              const i = this._getModel(e),
                o = this._getModel(t);
              if (!i || !o) return null;
              const s = i.getLinesContent(),
                a = o.getLinesContent(),
                u = new l.DiffComputer(s, a, {
                  shouldComputeCharChanges: !0,
                  shouldPostProcessCharChanges: !0,
                  shouldIgnoreTrimWhitespace: n,
                  shouldMakePrettyDiff: !0,
                  maxComputationTime: r,
                }).computeDiff(),
                c = !(u.changes.length > 0) && this._modelsAreIdentical(i, o);
              return {
                quitEarly: u.quitEarly,
                identical: c,
                changes: u.changes,
              };
            });
          }
          _modelsAreIdentical(e, t) {
            const n = e.getLineCount();
            if (n !== t.getLineCount()) return !1;
            for (let r = 1; r <= n; r++) {
              if (e.getLineContent(r) !== t.getLineContent(r)) return !1;
            }
            return !0;
          }
          computeMoreMinimalEdits(e, t) {
            return s(this, void 0, void 0, function* () {
              const r = this._getModel(e);
              if (!r) return t;
              const i = [];
              let o;
              t = t.slice(0).sort((e, t) => {
                if (e.range && t.range)
                  return a.Range.compareRangesUsingStarts(e.range, t.range);
                return (e.range ? 0 : 1) - (t.range ? 0 : 1);
              });
              for (let { range: e, text: s, eol: l } of t) {
                if (("number" == typeof l && (o = l), a.Range.isEmpty(e) && !s))
                  continue;
                const t = r.getValueInRange(e);
                if (((s = s.replace(/\r\n|\n|\r/g, r.eol)), t === s)) continue;
                if (Math.max(s.length, t.length) > b._diffLimit) {
                  i.push({ range: e, text: s });
                  continue;
                }
                const u = (0, n.stringDiff)(t, s, !1),
                  c = r.offsetAt(a.Range.lift(e).getStartPosition());
                for (const e of u) {
                  const t = r.positionAt(c + e.originalStart),
                    n = r.positionAt(c + e.originalStart + e.originalLength),
                    o = {
                      text: s.substr(e.modifiedStart, e.modifiedLength),
                      range: {
                        startLineNumber: t.lineNumber,
                        startColumn: t.column,
                        endLineNumber: n.lineNumber,
                        endColumn: n.column,
                      },
                    };
                  r.getValueInRange(o.range) !== o.text && i.push(o);
                }
              }
              return (
                "number" == typeof o &&
                  i.push({
                    eol: o,
                    text: "",
                    range: {
                      startLineNumber: 0,
                      startColumn: 0,
                      endLineNumber: 0,
                      endColumn: 0,
                    },
                  }),
                i
              );
            });
          }
          computeLinks(e) {
            return s(this, void 0, void 0, function* () {
              const t = this._getModel(e);
              return t ? (0, h.computeLinks)(t) : null;
            });
          }
          textualSuggest(e, t, n, r) {
            return s(this, void 0, void 0, function* () {
              const i = new m.StopWatch(!0),
                o = new RegExp(n, r),
                s = new Set();
              e: for (let n of e) {
                const e = this._getModel(n);
                if (e)
                  for (let n of e.words(o))
                    if (
                      n !== t &&
                      isNaN(Number(n)) &&
                      (s.add(n), s.size > b._suggestionsLimit)
                    )
                      break e;
              }
              return { words: Array.from(s), duration: i.elapsed() };
            });
          }
          computeWordRanges(e, t, n, r) {
            return s(this, void 0, void 0, function* () {
              const i = this._getModel(e);
              if (!i) return Object.create(null);
              const o = new RegExp(n, r),
                s = Object.create(null);
              for (let e = t.startLineNumber; e < t.endLineNumber; e++) {
                const t = i.getLineWords(e, o);
                for (const n of t) {
                  if (!isNaN(Number(n.word))) continue;
                  let t = s[n.word];
                  t || ((t = []), (s[n.word] = t)),
                    t.push({
                      startLineNumber: e,
                      startColumn: n.startColumn,
                      endLineNumber: e,
                      endColumn: n.endColumn,
                    });
                }
              }
              return s;
            });
          }
          navigateValueSet(e, t, n, r, i) {
            return s(this, void 0, void 0, function* () {
              const o = this._getModel(e);
              if (!o) return null;
              const s = new RegExp(r, i);
              t.startColumn === t.endColumn &&
                (t = {
                  startLineNumber: t.startLineNumber,
                  startColumn: t.startColumn,
                  endLineNumber: t.endLineNumber,
                  endColumn: t.endColumn + 1,
                });
              const a = o.getValueInRange(t),
                l = o.getWordAtPosition(
                  { lineNumber: t.startLineNumber, column: t.startColumn },
                  s
                );
              if (!l) return null;
              const u = o.getValueInRange(l);
              return d.BasicInplaceReplace.INSTANCE.navigateValueSet(
                t,
                a,
                l,
                u,
                n
              );
            });
          }
          loadForeignModule(t, n, r) {
            const i = {
              host: g.createProxyObject(r, (e, t) => this._host.fhr(e, t)),
              getMirrorModels: () => this._getModels(),
            };
            return this._foreignModuleFactory
              ? ((this._foreignModule = this._foreignModuleFactory(i, n)),
                Promise.resolve(g.getAllMethodNames(this._foreignModule)))
              : new Promise((r, o) => {
                  e(
                    [t],
                    (e) => {
                      (this._foreignModule = e.create(i, n)),
                        r(g.getAllMethodNames(this._foreignModule));
                    },
                    o
                  );
                });
          }
          fmr(e, t) {
            if (
              !this._foreignModule ||
              "function" != typeof this._foreignModule[e]
            )
              return Promise.reject(
                new Error("Missing requestHandler or method: " + e)
              );
            try {
              return Promise.resolve(
                this._foreignModule[e].apply(this._foreignModule, t)
              );
            } catch (n) {
              return Promise.reject(n);
            }
          }
        }
        (t.EditorSimpleWorker = b),
          (b._diffLimit = 1e5),
          (b._suggestionsLimit = 1e4),
          (t.create = function (e) {
            return new b(e, null);
          }),
          "function" == typeof importScripts &&
            (r.globals.monaco = (0, f.createMonacoBaseAPI)());
      }
    ),
    (function () {
      var e, t;
      const n = self.MonacoEnvironment,
        r = n && n.baseUrl ? n.baseUrl : "../../../",
        i =
          "function" ==
          typeof (null === (e = self.trustedTypes) || void 0 === e
            ? void 0
            : e.createPolicy)
            ? null === (t = self.trustedTypes) || void 0 === t
              ? void 0
              : t.createPolicy("amdLoader", {
                  createScriptURL: (e) => e,
                  createScript: (e, ...t) =>
                    `(function anonymous(${t.slice(0, -1).join(",")}) {\n${t
                      .pop()
                      .toString()}\n})`,
                })
            : void 0;
      function o() {
        return new Promise((e, t) => {
          if ("function" == typeof self.define && self.define.amd) return e();
          const n = r + "vs/loader.js";
          (/^((http:)|(https:)|(file:))/.test(n) &&
            n.substring(0, self.origin.length) !== self.origin) ||
          !(function () {
            try {
              return (
                (i
                  ? self.eval(i.createScript("", "true"))
                  : new Function("true")
                ).call(self),
                !0
              );
            } catch {
              return !1;
            }
          })()
            ? (i ? importScripts(i.createScriptURL(n)) : importScripts(n), e())
            : fetch(n)
                .then((e) => {
                  if (200 !== e.status) throw new Error(e.statusText);
                  return e.text();
                })
                .then((t) => {
                  (t = `${t}\n//# sourceURL=${n}`),
                    (i
                      ? self.eval(i.createScript("", t))
                      : new Function(t)
                    ).call(self),
                    e();
                })
                .then(void 0, t);
        });
      }
      let s = !0,
        a = [];
      self.onmessage = (e) => {
        s
          ? ((s = !1),
            (function (e) {
              o().then(() => {
                require.config({
                  baseUrl: r,
                  catchError: !0,
                  trustedTypesPolicy: i,
                  amdModulesPattern: /^vs\//,
                }),
                  require([e], function (e) {
                    setTimeout(function () {
                      let t = e.create((e, t) => {
                        self.postMessage(e, t);
                      }, null);
                      for (
                        self.onmessage = (e) => t.onmessage(e.data, e.ports);
                        a.length > 0;

                      )
                        self.onmessage(a.shift());
                    }, 0);
                  });
              });
            })(e.data))
          : a.push(e);
      };
    })();
}.call(this));
