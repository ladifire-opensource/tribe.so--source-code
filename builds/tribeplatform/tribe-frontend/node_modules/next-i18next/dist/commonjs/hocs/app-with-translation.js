"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.date.to-json");

require("core-js/modules/es.function.bind");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/web.url.to-json");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appWithTranslation = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _router = require("next/router");

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _reactI18next = require("react-i18next");

var _middlewares = require("../middlewares");

var _utils = require("../utils");

var _components = require("../components");

var appWithTranslation = function appWithTranslation(WrappedComponent) {
  var WrappedComponentWithSSR = (0, _reactI18next.withSSR)()(WrappedComponent);
  var nextI18Next = this;
  var config = nextI18Next.config,
      consoleMessage = nextI18Next.consoleMessage,
      i18n = nextI18Next.i18n,
      initPromise = nextI18Next.initPromise;

  var clientLoadNamespaces = function clientLoadNamespaces(lng, namespaces) {
    return Promise.all(namespaces.filter(function (ns) {
      return !i18n.hasResourceBundle(lng, ns);
    }).map(function (ns) {
      return i18n.reloadResources(lng, ns);
    }));
  };

  var AppWithTranslation = /*#__PURE__*/function (_React$Component) {
    (0, _inherits2["default"])(AppWithTranslation, _React$Component);

    function AppWithTranslation(props) {
      var _this;

      (0, _classCallCheck2["default"])(this, AppWithTranslation);
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(AppWithTranslation).call(this, props));

      if (!(0, _utils.isServer)()) {
        var changeLanguageCallback = function changeLanguageCallback(prevLng, newLng) {
          var router = props.router;
          var pathname = router.pathname,
              asPath = router.asPath,
              query = router.query;
          var routeInfo = {
            pathname: pathname,
            query: query
          };

          if (i18n.initializedLanguageOnce && typeof newLng === 'string' && prevLng !== newLng) {
            var _lngPathCorrector = (0, _utils.lngPathCorrector)(config, {
              as: asPath,
              href: routeInfo
            }, newLng),
                as = _lngPathCorrector.as,
                href = _lngPathCorrector.href;

            router.replace(href, as, {
              shallow: config.shallowRender
            });
          }
        };

        var changeLanguage = i18n.changeLanguage.bind(i18n);

        i18n.changeLanguage = /*#__PURE__*/function () {
          var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(newLng) {
            var callback,
                prevLng,
                usedNamespaces,
                _args = arguments;
            return _regenerator["default"].wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    callback = _args.length > 1 && _args[1] !== undefined ? _args[1] : function () {
                      return null;
                    };
                    prevLng = i18n.language;

                    if (!(typeof newLng === 'string' && i18n.initializedLanguageOnce === true)) {
                      _context.next = 6;
                      break;
                    }

                    usedNamespaces = Object.entries(i18n.reportNamespaces.usedNamespaces).filter(function (x) {
                      return x[1] === true;
                    }).map(function (x) {
                      return x[0];
                    });
                    _context.next = 6;
                    return clientLoadNamespaces(newLng, usedNamespaces);

                  case 6:
                    return _context.abrupt("return", changeLanguage(newLng, function () {
                      changeLanguageCallback(prevLng, newLng);
                      callback();
                    }));

                  case 7:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }();
      }

      return _this;
    }

    (0, _createClass2["default"])(AppWithTranslation, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            initialLanguage = _this$props.initialLanguage,
            initialI18nStore = _this$props.initialI18nStore,
            i18nServerInstance = _this$props.i18nServerInstance;
        return _react["default"].createElement(_reactI18next.I18nextProvider, {
          i18n: i18nServerInstance || i18n
        }, _react["default"].createElement(_components.NextStaticProvider, null, _react["default"].createElement(WrappedComponentWithSSR, (0, _extends2["default"])({
          initialLanguage: initialLanguage,
          initialI18nStore: initialI18nStore
        }, this.props))));
      }
    }], [{
      key: "getInitialProps",
      value: function () {
        var _getInitialProps = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(ctx) {
          var _ctx$ctx, req, res, initialI18nStore, initialLanguage, i18nServerInstance, middlewares, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, wrappedComponentProps, namespacesRequired, fallbackLng, languagesToLoad;

          return _regenerator["default"].wrap(function _callee2$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return initPromise;

                case 2:
                  /*
                    Initiate vars to return
                  */
                  _ctx$ctx = ctx.ctx, req = _ctx$ctx.req, res = _ctx$ctx.res;
                  initialI18nStore = {};
                  initialLanguage = null;
                  i18nServerInstance = null;
                  /*
                    Preprocess the req via next-i18next and i18next middlewares
                  */

                  if (!(req && res)) {
                    _context3.next = 33;
                    break;
                  }

                  middlewares = (0, _middlewares.nextI18NextMiddleware)(nextI18Next);
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context3.prev = 11;
                  _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop() {
                    var middleware;
                    return _regenerator["default"].wrap(function _loop$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            middleware = _step.value;
                            _context2.next = 3;
                            return new Promise(function (resolve) {
                              return middleware(req, res, resolve);
                            });

                          case 3:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _loop);
                  });
                  _iterator = middlewares[Symbol.iterator]();

                case 14:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    _context3.next = 19;
                    break;
                  }

                  return _context3.delegateYield(_loop(), "t0", 16);

                case 16:
                  _iteratorNormalCompletion = true;
                  _context3.next = 14;
                  break;

                case 19:
                  _context3.next = 25;
                  break;

                case 21:
                  _context3.prev = 21;
                  _context3.t1 = _context3["catch"](11);
                  _didIteratorError = true;
                  _iteratorError = _context3.t1;

                case 25:
                  _context3.prev = 25;
                  _context3.prev = 26;

                  if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                    _iterator["return"]();
                  }

                case 28:
                  _context3.prev = 28;

                  if (!_didIteratorError) {
                    _context3.next = 31;
                    break;
                  }

                  throw _iteratorError;

                case 31:
                  return _context3.finish(28);

                case 32:
                  return _context3.finish(25);

                case 33:
                  /* Call getInitialProps on our wrapped _app */
                  wrappedComponentProps = {
                    pageProps: {}
                  };

                  if (!WrappedComponent.getInitialProps) {
                    _context3.next = 38;
                    break;
                  }

                  _context3.next = 37;
                  return WrappedComponent.getInitialProps(ctx);

                case 37:
                  wrappedComponentProps = _context3.sent;

                case 38:
                  if (typeof wrappedComponentProps.pageProps === 'undefined') {
                    consoleMessage('error', 'If you have a getInitialProps method in your custom _app.js file, you must explicitly return pageProps. For more information, see: https://github.com/zeit/next.js#custom-app');
                  }
                  /*
                    Step 1: Determine initial language
                  */


                  if (!(req && req.i18n)) {
                    _context3.next = 45;
                    break;
                  }

                  initialLanguage = (0, _utils.lngFromReq)(req);
                  /*
                    Perform a lang change in case we're not on the right lang
                  */

                  _context3.next = 43;
                  return req.i18n.changeLanguage(initialLanguage);

                case 43:
                  _context3.next = 46;
                  break;

                case 45:
                  if (Array.isArray(i18n.languages) && i18n.languages.length > 0) {
                    initialLanguage = i18n.language;
                  }

                case 46:
                  /*
                    Step 2: Determine namespace dependencies
                  */
                  namespacesRequired = config.ns;

                  if (Array.isArray(wrappedComponentProps.pageProps.namespacesRequired)) {
                    namespacesRequired = wrappedComponentProps.pageProps.namespacesRequired;
                  } else {
                    consoleMessage('warn', "You have not declared a namespacesRequired array on your page-level component: ".concat(ctx.Component.displayName || ctx.Component.name || 'Component', ". This will cause all namespaces to be sent down to the client, possibly negatively impacting the performance of your app. For more info, see: https://github.com/isaachinman/next-i18next#4-declaring-namespace-dependencies"));
                  }
                  /*
                    We must always send down the defaultNS, otherwise
                    the client will trigger a request for it and issue
                    the "Did not expect server HTML to contain a <h1> in <div>"
                    error
                  */


                  if (typeof config.defaultNS === 'string' && !namespacesRequired.includes(config.defaultNS)) {
                    namespacesRequired.push(config.defaultNS);
                  }
                  /*
                    Step 3: Perform data fetching, depending on environment
                  */


                  if (!(req && req.i18n)) {
                    _context3.next = 55;
                    break;
                  }

                  /*
                    Detect the languages to load based upon the fallbackLng configuration
                  */
                  fallbackLng = config.fallbackLng;
                  languagesToLoad = (0, _utils.lngsToLoad)(initialLanguage, fallbackLng, config.otherLanguages);
                  /*
                    Initialise the store with the languagesToLoad and
                    necessary namespaces needed to render this specific tree
                  */

                  languagesToLoad.forEach(function (lng) {
                    initialI18nStore[lng] = {};
                    namespacesRequired.forEach(function (ns) {
                      initialI18nStore[lng][ns] = (req.i18n.services.resourceStore.data[lng] || {})[ns] || {};
                    });
                  });
                  _context3.next = 59;
                  break;

                case 55:
                  if (!(Array.isArray(i18n.languages) && i18n.languages.length > 0)) {
                    _context3.next = 59;
                    break;
                  }

                  _context3.next = 58;
                  return clientLoadNamespaces(i18n.languages[0], namespacesRequired);

                case 58:
                  initialI18nStore = i18n.store.data;

                case 59:
                  /*
                    Step 4: Overwrite i18n.toJSON method to be able to serialize the instance
                  */
                  if (req && req.i18n) {
                    req.i18n.toJSON = function () {
                      return null;
                    };

                    i18nServerInstance = req.i18n;
                  }
                  /*
                    `pageProps` will get serialized automatically by NextJs
                  */


                  return _context3.abrupt("return", (0, _objectSpread2["default"])({
                    initialI18nStore: initialI18nStore,
                    initialLanguage: initialLanguage,
                    i18nServerInstance: i18nServerInstance
                  }, wrappedComponentProps));

                case 61:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee2, null, [[11, 21, 25, 33], [26,, 28, 32]]);
        }));

        return function getInitialProps(_x2) {
          return _getInitialProps.apply(this, arguments);
        };
      }()
    }]);
    return AppWithTranslation;
  }(_react["default"].Component);

  return (0, _hoistNonReactStatics["default"])((0, _router.withRouter)(AppWithTranslation), WrappedComponent, {
    getInitialProps: true
  });
};

exports.appWithTranslation = appWithTranslation;