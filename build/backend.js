/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _preact = __webpack_require__(1);

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _store = __webpack_require__(82);

	var _store2 = _interopRequireDefault(_store);

	var _reactRedux = __webpack_require__(96);

	var _template = __webpack_require__(112);

	var _template2 = _interopRequireDefault(_template);

	var _App = __webpack_require__(114);

	var _App2 = _interopRequireDefault(_App);

	var _actions = __webpack_require__(118);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var app = (0, _express2.default)();

	app.use(_express2.default.static('public'));

	var render = function render(req, res) {
	  var rootComponent = (0, _preact.h)(
	    _reactRedux.Provider,
	    { store: req.store },
	    (0, _preact.h)(_App2.default, { url: req.url })
	  );
	  var initialState = req.store.getState();
	  intialState.clientControl = false;
	  var html = (0, _template2.default)(rootComponent, initialState);
	  res.send(html);
	};

	var fetchData = function fetchData(page) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  return function (req, res, next) {
	    var store = req.store = (0, _store2.default)();
	    var unsubscribe = store.subscribe(function () {
	      if (store.getState().serverReady) {
	        unsubscribe();
	        next();
	      }
	    });
	    var newArgs = args.map(function (arg) {
	      return req[arg[0]][arg[1]];
	    });
	    store.dispatch(_actions.fetchInitialData.apply(undefined, [page].concat(_toConsumableArray(newArgs))));
	  };
	};

	app.get('/', fetchData('home'), render);
	app.get('/dashboards/:dashboardId', fetchData('dashboard', ['params', 'dashboardId']), render);
	app.get('*', function (req, res) {
	  return res.status(404).send('Not found');
	});

	app.listen(3000);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	!function(global, factory) {
	     true ? module.exports = factory() : 'function' == typeof define && define.amd ? define(factory) : global.preact = factory();
	}(this, function() {
	    'use strict';
	    function VNode(nodeName, attributes, children) {
	        this.nodeName = nodeName;
	        this.attributes = attributes;
	        this.children = children;
	    }
	    function extend(obj, props) {
	        for (var i in props) if (hasOwnProperty.call(props, i)) obj[i] = props[i];
	        return obj;
	    }
	    function clone(obj) {
	        var out = {};
	        for (var i in obj) out[i] = obj[i];
	        return out;
	    }
	    function memoize(fn, mem) {
	        mem = mem || {};
	        return function(k) {
	            return hasOwnProperty.call(mem, k) ? mem[k] : mem[k] = fn(k);
	        };
	    }
	    function delve(obj, key) {
	        for (var p = key.split('.'), i = 0; i < p.length && obj; i++) obj = obj[p[i]];
	        return obj;
	    }
	    function toArray(obj) {
	        var arr = [], i = obj.length;
	        for (;i--; ) arr[i] = obj[i];
	        return arr;
	    }
	    function styleObjToCss(s) {
	        var str = '';
	        for (var prop in s) {
	            var val = s[prop];
	            if (!empty(val)) {
	                if (str) str += ' ';
	                str += jsToCss(prop);
	                str += ': ';
	                str += val;
	                if ('number' == typeof val && !NON_DIMENSION_PROPS[prop]) str += 'px';
	                str += ';';
	            }
	        }
	        return str;
	    }
	    function hashToClassName(c) {
	        var str = '';
	        for (var prop in c) if (c[prop]) {
	            if (str) str += ' ';
	            str += prop;
	        }
	        return str;
	    }
	    function normalize(obj, prop, fn) {
	        var v = obj[prop];
	        if (v && !isString(v)) obj[prop] = fn(v);
	    }
	    function optionsHook(name, a, b) {
	        return hook(options, name, a, b);
	    }
	    function hook(obj, name, a, b, c) {
	        if (obj[name]) return obj[name](a, b, c); else ;
	    }
	    function deepHook(obj, type) {
	        do hook(obj, type); while (obj = obj._component);
	    }
	    function h(nodeName, attributes) {
	        var len = arguments.length, children = void 0, arr = void 0, lastSimple = void 0;
	        if (len > 2) {
	            children = [];
	            for (var i = 2; len > i; i++) {
	                var _p = arguments[i];
	                if (!falsey(_p)) {
	                    if (_p.join) arr = _p; else {
	                        arr = SHARED_TEMP_ARRAY;
	                        arr[0] = _p;
	                    }
	                    for (var j = 0; j < arr.length; j++) {
	                        var child = arr[j], simple = !(falsey(child) || child instanceof VNode);
	                        if (simple) child = String(child);
	                        if (simple && lastSimple) children[children.length - 1] += child; else if (!falsey(child)) children.push(child);
	                        lastSimple = simple;
	                    }
	                } else ;
	            }
	        }
	        if (attributes && attributes.children) delete attributes.children;
	        var p = new VNode(nodeName, attributes || void 0, children || void 0);
	        optionsHook('vnode', p);
	        return p;
	    }
	    function createLinkedState(component, key, eventPath) {
	        var path = key.split('.'), p0 = path[0], len = path.length;
	        return function(e) {
	            var _component$setState;
	            var t = this, s = component.state, obj = s, v = void 0, i = void 0;
	            if (isString(eventPath)) {
	                v = delve(e, eventPath);
	                if (empty(v) && (t = t._component)) v = delve(t, eventPath);
	            } else v = (t.nodeName + t.type).match(/^input(checkbox|radio)$/i) ? t.checked : t.value;
	            if (isFunction(v)) v = v.call(t);
	            if (len > 1) {
	                for (i = 0; len - 1 > i; i++) obj = obj[path[i]] || (obj[path[i]] = {});
	                obj[path[i]] = v;
	                v = s[p0];
	            }
	            component.setState((_component$setState = {}, _component$setState[p0] = v, _component$setState));
	        };
	    }
	    function enqueueRender(component) {
	        if (1 === items.push(component)) (options.debounceRendering || setImmediate)(rerender);
	    }
	    function rerender() {
	        if (items.length) {
	            var currentItems = items, p = void 0;
	            items = itemsOffline;
	            itemsOffline = currentItems;
	            for (;p = currentItems.pop(); ) if (p._dirty) renderComponent(p);
	        }
	    }
	    function isFunctionalComponent(_ref) {
	        var nodeName = _ref.nodeName;
	        return isFunction(nodeName) && !(nodeName.prototype && nodeName.prototype.render);
	    }
	    function buildFunctionalComponent(vnode, context) {
	        return vnode.nodeName(getNodeProps(vnode), context || EMPTY) || EMPTY_BASE;
	    }
	    function ensureNodeData(node) {
	        return node[ATTR_KEY] || (node[ATTR_KEY] = {});
	    }
	    function getNodeType(node) {
	        return node.nodeType;
	    }
	    function appendChildren(parent, children) {
	        var len = children.length, many = len > 2, into = many ? document.createDocumentFragment() : parent;
	        for (var i = 0; len > i; i++) into.appendChild(children[i]);
	        if (many) parent.appendChild(into);
	    }
	    function getAccessor(node, name, value, cache) {
	        if ('type' !== name && 'style' !== name && name in node) return node[name];
	        var attrs = node[ATTR_KEY];
	        if (cache !== !1 && attrs && hasOwnProperty.call(attrs, name)) return attrs[name];
	        if ('class' === name) return node.className;
	        if ('style' === name) return node.style.cssText; else return value;
	    }
	    function setAccessor(node, name, value) {
	        if ('class' === name) node.className = value || ''; else if ('style' === name) node.style.cssText = value || ''; else if ('dangerouslySetInnerHTML' === name) {
	            if (value && value.__html) node.innerHTML = value.__html;
	        } else if ('key' === name || name in node && 'type' !== name) {
	            node[name] = value;
	            if (falsey(value)) node.removeAttribute(name);
	        } else setComplexAccessor(node, name, value);
	        ensureNodeData(node)[name] = value;
	    }
	    function setComplexAccessor(node, name, value) {
	        if ('on' !== name.substring(0, 2)) {
	            var type = typeof value;
	            if (falsey(value)) node.removeAttribute(name); else if ('function' !== type && 'object' !== type) node.setAttribute(name, value);
	        } else {
	            var _type = normalizeEventName(name), l = node._listeners || (node._listeners = {}), fn = !l[_type] ? 'add' : !value ? 'remove' : null;
	            if (fn) node[fn + 'EventListener'](_type, eventProxy);
	            l[_type] = value;
	        }
	    }
	    function eventProxy(e) {
	        var fn = this._listeners[normalizeEventName(e.type)];
	        if (fn) return fn.call(this, optionsHook('event', e) || e); else ;
	    }
	    function getNodeAttributes(node) {
	        return node[ATTR_KEY] || getRawNodeAttributes(node) || EMPTY;
	    }
	    function getRawNodeAttributes(node) {
	        var list = node.attributes;
	        if (!list || !list.getNamedItem) return list; else return getAttributesAsObject(list);
	    }
	    function getAttributesAsObject(list) {
	        var attrs = void 0;
	        for (var i = list.length; i--; ) {
	            var item = list[i];
	            if (!attrs) attrs = {};
	            attrs[item.name] = item.value;
	        }
	        return attrs;
	    }
	    function isSameNodeType(node, vnode) {
	        if (isFunctionalComponent(vnode)) return !0;
	        var nodeName = vnode.nodeName;
	        if (isFunction(nodeName)) return node._componentConstructor === nodeName;
	        if (3 === getNodeType(node)) return isString(vnode); else return toLowerCase(node.nodeName) === nodeName;
	    }
	    function getNodeProps(vnode) {
	        var props = clone(vnode.attributes), c = vnode.children;
	        if (c) props.children = c;
	        var defaultProps = vnode.nodeName.defaultProps;
	        if (defaultProps) for (var i in defaultProps) if (hasOwnProperty.call(defaultProps, i) && !(i in props)) props[i] = defaultProps[i];
	        return props;
	    }
	    function collectNode(node) {
	        cleanNode(node);
	        var name = normalizeName(node.nodeName), list = nodes[name];
	        if (list) list.push(node); else nodes[name] = [ node ];
	    }
	    function createNode(nodeName) {
	        var name = normalizeName(nodeName), list = nodes[name], node = list && list.pop() || document.createElement(nodeName);
	        ensureNodeData(node);
	        return node;
	    }
	    function cleanNode(node) {
	        var p = node.parentNode;
	        if (p) p.removeChild(node);
	        if (3 !== getNodeType(node)) {
	            if (!node[ATTR_KEY]) node[ATTR_KEY] = getRawNodeAttributes(node);
	            node._component = node._componentConstructor = null;
	        }
	    }
	    function diff(dom, vnode, context) {
	        var originalAttributes = vnode.attributes;
	        for (;isFunctionalComponent(vnode); ) vnode = buildFunctionalComponent(vnode, context);
	        if (isFunction(vnode.nodeName)) return buildComponentFromVNode(dom, vnode, context);
	        if (isString(vnode)) {
	            if (dom) {
	                var type = getNodeType(dom);
	                if (3 === type) {
	                    dom[TEXT_CONTENT] = vnode;
	                    return dom;
	                } else if (1 === type) collectNode(dom);
	            }
	            return document.createTextNode(vnode);
	        }
	        var out = dom, nodeName = vnode.nodeName || UNDEFINED_ELEMENT;
	        if (!dom) out = createNode(nodeName); else if (toLowerCase(dom.nodeName) !== nodeName) {
	            out = createNode(nodeName);
	            appendChildren(out, toArray(dom.childNodes));
	            recollectNodeTree(dom);
	        }
	        innerDiffNode(out, vnode, context);
	        diffAttributes(out, vnode);
	        if (originalAttributes && originalAttributes.ref) (out[ATTR_KEY].ref = originalAttributes.ref)(out);
	        return out;
	    }
	    function innerDiffNode(dom, vnode, context) {
	        var children = void 0, keyed = void 0, keyedLen = 0, len = dom.childNodes.length, childrenLen = 0;
	        if (len) {
	            children = [];
	            for (var i = 0; len > i; i++) {
	                var child = dom.childNodes[i], key = child._component ? child._component.__key : getAccessor(child, 'key');
	                if (!empty(key)) {
	                    if (!keyed) keyed = {};
	                    keyed[key] = child;
	                    keyedLen++;
	                } else children[childrenLen++] = child;
	            }
	        }
	        var vchildren = vnode.children, vlen = vchildren && vchildren.length, min = 0;
	        if (vlen) for (var i = 0; vlen > i; i++) {
	            var vchild = vchildren[i], child = void 0;
	            if (keyedLen) {
	                var attrs = vchild.attributes, key = attrs && attrs.key;
	                if (!empty(key) && hasOwnProperty.call(keyed, key)) {
	                    child = keyed[key];
	                    keyed[key] = null;
	                    keyedLen--;
	                }
	            }
	            if (!child && childrenLen > min) for (var j = min; childrenLen > j; j++) {
	                var c = children[j];
	                if (c && isSameNodeType(c, vchild)) {
	                    child = c;
	                    children[j] = null;
	                    if (j === childrenLen - 1) childrenLen--;
	                    if (j === min) min++;
	                    break;
	                }
	            }
	            child = diff(child, vchild, context);
	            if (dom.childNodes[i] !== child) {
	                var c = child.parentNode !== dom && child._component, next = dom.childNodes[i + 1];
	                if (c) deepHook(c, 'componentWillMount');
	                if (next) dom.insertBefore(child, next); else dom.appendChild(child);
	                if (c) deepHook(c, 'componentDidMount');
	            }
	        }
	        if (keyedLen) for (var i in keyed) if (hasOwnProperty.call(keyed, i) && keyed[i]) children[min = childrenLen++] = keyed[i];
	        if (childrenLen > min) removeOrphanedChildren(children);
	    }
	    function removeOrphanedChildren(children, unmountOnly) {
	        for (var i = children.length; i--; ) {
	            var child = children[i];
	            if (child) recollectNodeTree(child, unmountOnly);
	        }
	    }
	    function recollectNodeTree(node, unmountOnly) {
	        var attrs = node[ATTR_KEY];
	        if (attrs) hook(attrs, 'ref', null);
	        var component = node._component;
	        if (component) unmountComponent(node, component, !unmountOnly); else {
	            if (!unmountOnly) {
	                if (1 !== getNodeType(node)) {
	                    var p = node.parentNode;
	                    if (p) p.removeChild(node);
	                    return;
	                }
	                collectNode(node);
	            }
	            var c = node.childNodes;
	            if (c && c.length) removeOrphanedChildren(c, unmountOnly);
	        }
	    }
	    function diffAttributes(dom, vnode) {
	        var old = getNodeAttributes(dom) || EMPTY, attrs = vnode.attributes || EMPTY, name = void 0, value = void 0;
	        for (name in old) if (empty(attrs[name])) setAccessor(dom, name, null);
	        if (attrs !== EMPTY) for (name in attrs) if (hasOwnProperty.call(attrs, name)) {
	            value = attrs[name];
	            if (!empty(value) && value != getAccessor(dom, name)) setAccessor(dom, name, value);
	        }
	    }
	    function collectComponent(component) {
	        var name = component.constructor.name, list = components[name];
	        if (list) list.push(component); else components[name] = [ component ];
	    }
	    function createComponent(ctor, props, context) {
	        var list = components[ctor.name], len = list && list.length, c = void 0;
	        for (var i = 0; len > i; i++) {
	            c = list[i];
	            if (c.constructor === ctor) {
	                list.splice(i, 1);
	                var inst = new ctor(props, context);
	                inst.base = c.base;
	                return inst;
	            }
	        }
	        return new ctor(props, context);
	    }
	    function triggerComponentRender(component) {
	        if (!component._dirty) {
	            component._dirty = !0;
	            enqueueRender(component);
	        }
	    }
	    function setComponentProps(component, props, opts, context) {
	        var d = component._disableRendering;
	        component.__ref = props.ref;
	        component.__key = props.key;
	        delete props.ref;
	        delete props.key;
	        component._disableRendering = !0;
	        if (context) {
	            if (!component.prevContext) component.prevContext = component.context;
	            component.context = context;
	        }
	        if (component.base) hook(component, 'componentWillReceiveProps', props, component.context);
	        if (!component.prevProps) component.prevProps = component.props;
	        component.props = props;
	        component._disableRendering = d;
	        if (!opts || opts.render !== !1) if (opts && opts.renderSync || options.syncComponentUpdates !== !1) renderComponent(component); else triggerComponentRender(component);
	        hook(component, '__ref', component);
	    }
	    function renderComponent(component, opts) {
	        if (!component._disableRendering) {
	            var skip = void 0, rendered = void 0, props = component.props, state = component.state, context = component.context, previousProps = component.prevProps || props, previousState = component.prevState || state, previousContext = component.prevContext || context, isUpdate = component.base;
	            if (isUpdate) {
	                component.props = previousProps;
	                component.state = previousState;
	                component.context = previousContext;
	                if (hook(component, 'shouldComponentUpdate', props, state, context) === !1) skip = !0; else hook(component, 'componentWillUpdate', props, state, context);
	                component.props = props;
	                component.state = state;
	                component.context = context;
	            }
	            component.prevProps = component.prevState = component.prevContext = null;
	            component._dirty = !1;
	            if (!skip) {
	                rendered = hook(component, 'render', props, state, context);
	                var childComponent = rendered && rendered.nodeName, childContext = component.getChildContext ? component.getChildContext() : context, toUnmount = void 0, base = void 0;
	                if (isFunction(childComponent) && childComponent.prototype.render) {
	                    var inst = component._component;
	                    if (inst && inst.constructor !== childComponent) {
	                        toUnmount = inst;
	                        inst = null;
	                    }
	                    var childProps = getNodeProps(rendered);
	                    if (inst) setComponentProps(inst, childProps, SYNC_RENDER, childContext); else {
	                        inst = createComponent(childComponent, childProps, childContext);
	                        inst._parentComponent = component;
	                        component._component = inst;
	                        if (component.base) deepHook(inst, 'componentWillMount');
	                        setComponentProps(inst, childProps, NO_RENDER, childContext);
	                        renderComponent(inst, DOM_RENDER);
	                        if (component.base) deepHook(inst, 'componentDidMount');
	                    }
	                    base = inst.base;
	                } else {
	                    var cbase = component.base;
	                    toUnmount = component._component;
	                    if (toUnmount) cbase = component._component = null;
	                    if (component.base || opts && opts.build) base = diff(cbase, rendered || EMPTY_BASE, childContext);
	                }
	                if (component.base && base !== component.base) {
	                    var p = component.base.parentNode;
	                    if (p) p.replaceChild(base, component.base);
	                }
	                if (toUnmount) unmountComponent(toUnmount.base, toUnmount, !0);
	                component.base = base;
	                if (base) {
	                    var componentRef = component, t = component;
	                    for (;t = t._parentComponent; ) componentRef = t;
	                    base._component = componentRef;
	                    base._componentConstructor = componentRef.constructor;
	                }
	                if (isUpdate) hook(component, 'componentDidUpdate', previousProps, previousState, previousContext);
	            }
	            var cb = component._renderCallbacks, fn = void 0;
	            if (cb) for (;fn = cb.pop(); ) fn.call(component);
	            return rendered;
	        }
	    }
	    function buildComponentFromVNode(dom, vnode, context) {
	        var c = dom && dom._component, oldDom = dom;
	        var isOwner = c && dom._componentConstructor === vnode.nodeName;
	        for (;c && !isOwner && (c = c._parentComponent); ) isOwner = c.constructor === vnode.nodeName;
	        if (isOwner) {
	            setComponentProps(c, getNodeProps(vnode), SYNC_RENDER, context);
	            dom = c.base;
	        } else {
	            if (c) {
	                unmountComponent(dom, c, !0);
	                dom = oldDom = null;
	            }
	            dom = createComponentFromVNode(vnode, dom, context);
	            if (oldDom && dom !== oldDom) recollectNodeTree(oldDom);
	        }
	        return dom;
	    }
	    function createComponentFromVNode(vnode, dom, context) {
	        var props = getNodeProps(vnode);
	        var component = createComponent(vnode.nodeName, props, context);
	        if (dom && !component.base) component.base = dom;
	        setComponentProps(component, props, NO_RENDER, context);
	        renderComponent(component, DOM_RENDER);
	        return component.base;
	    }
	    function unmountComponent(dom, component, remove) {
	        hook(component, '__ref', null);
	        hook(component, 'componentWillUnmount');
	        var inner = component._component;
	        if (inner) {
	            unmountComponent(dom, inner, remove);
	            remove = !1;
	        }
	        var base = component.base;
	        if (base) {
	            if (remove !== !1) {
	                var p = base.parentNode;
	                if (p) p.removeChild(base);
	            }
	            removeOrphanedChildren(base.childNodes, !0);
	        }
	        if (remove) {
	            component._parentComponent = null;
	            collectComponent(component);
	        }
	        hook(component, 'componentDidUnmount');
	    }
	    function Component(props, context) {
	        this._dirty = this._disableRendering = !1;
	        this._linkedStates = {};
	        this._renderCallbacks = [];
	        this.prevState = this.prevProps = this.prevContext = this.base = this._parentComponent = this._component = this.__ref = this.__key = null;
	        this.context = context || {};
	        this.props = props || {};
	        this.state = hook(this, 'getInitialState') || {};
	    }
	    function render(vnode, parent, merge) {
	        var existing = merge && merge._component && merge._componentConstructor === vnode.nodeName, built = diff(merge, vnode), c = !existing && built._component;
	        if (c) deepHook(c, 'componentWillMount');
	        if (built.parentNode !== parent) parent.appendChild(built);
	        if (c) deepHook(c, 'componentDidMount');
	        return built;
	    }
	    var NO_RENDER = {
	        render: !1
	    };
	    var SYNC_RENDER = {
	        renderSync: !0
	    };
	    var DOM_RENDER = {
	        build: !0
	    };
	    var EMPTY = {};
	    var EMPTY_BASE = '';
	    var HAS_DOM = 'undefined' != typeof document;
	    var TEXT_CONTENT = !HAS_DOM || 'textContent' in document ? 'textContent' : 'nodeValue';
	    var ATTR_KEY = 'undefined' != typeof Symbol ? Symbol['for']('preactattr') : '__preactattr_';
	    var UNDEFINED_ELEMENT = 'undefined';
	    var NON_DIMENSION_PROPS = {
	        boxFlex: 1,
	        boxFlexGroup: 1,
	        columnCount: 1,
	        fillOpacity: 1,
	        flex: 1,
	        flexGrow: 1,
	        flexPositive: 1,
	        flexShrink: 1,
	        flexNegative: 1,
	        fontWeight: 1,
	        lineClamp: 1,
	        lineHeight: 1,
	        opacity: 1,
	        order: 1,
	        orphans: 1,
	        strokeOpacity: 1,
	        widows: 1,
	        zIndex: 1,
	        zoom: 1
	    };
	    var isFunction = function(obj) {
	        return 'function' == typeof obj;
	    };
	    var isString = function(obj) {
	        return 'string' == typeof obj;
	    };
	    var hasOwnProperty = {}.hasOwnProperty;
	    var empty = function(x) {
	        return null == x;
	    };
	    var falsey = function(value) {
	        return value === !1 || null == value;
	    };
	    var jsToCss = memoize(function(s) {
	        return s.replace(/([A-Z])/g, '-$1').toLowerCase();
	    });
	    var toLowerCase = memoize(function(s) {
	        return s.toLowerCase();
	    });
	    var ch = void 0;
	    try {
	        ch = new MessageChannel();
	    } catch (e) {}
	    var setImmediate = ch ? function(f) {
	        ch.port1.onmessage = f;
	        ch.port2.postMessage('');
	    } : setTimeout;
	    var options = {
	        vnode: function(n) {
	            var attrs = n.attributes;
	            if (attrs && !isFunction(n.nodeName)) {
	                var p = attrs.className;
	                if (p) {
	                    attrs['class'] = p;
	                    delete attrs.className;
	                }
	                if (attrs['class']) normalize(attrs, 'class', hashToClassName);
	                if (attrs.style) normalize(attrs, 'style', styleObjToCss);
	            }
	        }
	    };
	    var SHARED_TEMP_ARRAY = [];
	    var items = [];
	    var itemsOffline = [];
	    var normalizeEventName = memoize(function(t) {
	        return t.replace(/^on/i, '').toLowerCase();
	    });
	    var nodes = {};
	    var normalizeName = memoize(function(name) {
	        return name.toUpperCase();
	    });
	    var components = {};
	    extend(Component.prototype, {
	        linkState: function(key, eventPath) {
	            var c = this._linkedStates, cacheKey = key + '|' + (eventPath || '');
	            return c[cacheKey] || (c[cacheKey] = createLinkedState(this, key, eventPath));
	        },
	        setState: function(state, callback) {
	            var s = this.state;
	            if (!this.prevState) this.prevState = clone(s);
	            extend(s, isFunction(state) ? state(s, this.props) : state);
	            if (callback) this._renderCallbacks.push(callback);
	            triggerComponentRender(this);
	        },
	        forceUpdate: function() {
	            renderComponent(this);
	        },
	        render: function() {
	            return null;
	        }
	    });
	    var preact = {
	        h: h,
	        Component: Component,
	        render: render,
	        rerender: rerender,
	        options: options,
	        hooks: options
	    };
	    return preact;
	});
	//# sourceMappingURL=preact.js.map

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * express
	 * Copyright(c) 2009-2013 TJ Holowaychuk
	 * Copyright(c) 2013 Roman Shtylman
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict';

	module.exports = __webpack_require__(3);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * express
	 * Copyright(c) 2009-2013 TJ Holowaychuk
	 * Copyright(c) 2013 Roman Shtylman
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict';

	/**
	 * Module dependencies.
	 */

	var EventEmitter = __webpack_require__(4).EventEmitter;
	var mixin = __webpack_require__(5);
	var proto = __webpack_require__(6);
	var Route = __webpack_require__(21);
	var Router = __webpack_require__(20);
	var req = __webpack_require__(65);
	var res = __webpack_require__(77);

	/**
	 * Expose `createApplication()`.
	 */

	exports = module.exports = createApplication;

	/**
	 * Create an express application.
	 *
	 * @return {Function}
	 * @api public
	 */

	function createApplication() {
	  var app = function(req, res, next) {
	    app.handle(req, res, next);
	  };

	  mixin(app, EventEmitter.prototype, false);
	  mixin(app, proto, false);

	  app.request = { __proto__: req, app: app };
	  app.response = { __proto__: res, app: app };
	  app.init();
	  return app;
	}

	/**
	 * Expose the prototypes.
	 */

	exports.application = proto;
	exports.request = req;
	exports.response = res;

	/**
	 * Expose constructors.
	 */

	exports.Route = Route;
	exports.Router = Router;

	/**
	 * Expose middleware
	 */

	exports.query = __webpack_require__(37);
	exports.static = __webpack_require__(81);

	/**
	 * Replace removed middleware with an appropriate error message.
	 */

	[
	  'json',
	  'urlencoded',
	  'bodyParser',
	  'compress',
	  'cookieSession',
	  'session',
	  'logger',
	  'cookieParser',
	  'favicon',
	  'responseTime',
	  'errorHandler',
	  'timeout',
	  'methodOverride',
	  'vhost',
	  'csrf',
	  'directory',
	  'limit',
	  'multipart',
	  'staticCache',
	].forEach(function (name) {
	  Object.defineProperty(exports, name, {
	    get: function () {
	      throw new Error('Most middleware (like ' + name + ') is no longer bundled with Express and must be installed separately. Please see https://github.com/senchalabs/connect#middleware.');
	    },
	    configurable: true
	  });
	});


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("events");

/***/ },
/* 5 */
/***/ function(module, exports) {

	/*!
	 * merge-descriptors
	 * Copyright(c) 2014 Jonathan Ong
	 * Copyright(c) 2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict'

	/**
	 * Module exports.
	 * @public
	 */

	module.exports = merge

	/**
	 * Module variables.
	 * @private
	 */

	var hasOwnProperty = Object.prototype.hasOwnProperty

	/**
	 * Merge the property descriptors of `src` into `dest`
	 *
	 * @param {object} dest Object to add descriptors to
	 * @param {object} src Object to clone descriptors from
	 * @param {boolean} [redefine=true] Redefine `dest` properties with `src` properties
	 * @returns {object} Reference to dest
	 * @public
	 */

	function merge(dest, src, redefine) {
	  if (!dest) {
	    throw new TypeError('argument dest is required')
	  }

	  if (!src) {
	    throw new TypeError('argument src is required')
	  }

	  if (redefine === undefined) {
	    // Default to true
	    redefine = true
	  }

	  Object.getOwnPropertyNames(src).forEach(function forEachOwnPropertyName(name) {
	    if (!redefine && hasOwnProperty.call(dest, name)) {
	      // Skip desriptor
	      return
	    }

	    // Copy descriptor
	    var descriptor = Object.getOwnPropertyDescriptor(src, name)
	    Object.defineProperty(dest, name, descriptor)
	  })

	  return dest
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * express
	 * Copyright(c) 2009-2013 TJ Holowaychuk
	 * Copyright(c) 2013 Roman Shtylman
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict';

	/**
	 * Module dependencies.
	 * @private
	 */

	var finalhandler = __webpack_require__(7);
	var Router = __webpack_require__(20);
	var methods = __webpack_require__(25);
	var middleware = __webpack_require__(36);
	var query = __webpack_require__(37);
	var debug = __webpack_require__(8)('express:application');
	var View = __webpack_require__(42);
	var http = __webpack_require__(16);
	var compileETag = __webpack_require__(43).compileETag;
	var compileQueryParser = __webpack_require__(43).compileQueryParser;
	var compileTrust = __webpack_require__(43).compileTrust;
	var deprecate = __webpack_require__(27)('express');
	var flatten = __webpack_require__(22);
	var merge = __webpack_require__(26);
	var resolve = __webpack_require__(33).resolve;
	var slice = Array.prototype.slice;

	/**
	 * Application prototype.
	 */

	var app = exports = module.exports = {};

	/**
	 * Variable for trust proxy inheritance back-compat
	 * @private
	 */

	var trustProxyDefaultSymbol = '@@symbol:trust_proxy_default';

	/**
	 * Initialize the server.
	 *
	 *   - setup default configuration
	 *   - setup default middleware
	 *   - setup route reflection methods
	 *
	 * @private
	 */

	app.init = function init() {
	  this.cache = {};
	  this.engines = {};
	  this.settings = {};

	  this.defaultConfiguration();
	};

	/**
	 * Initialize application configuration.
	 * @private
	 */

	app.defaultConfiguration = function defaultConfiguration() {
	  var env = process.env.NODE_ENV || 'development';

	  // default settings
	  this.enable('x-powered-by');
	  this.set('etag', 'weak');
	  this.set('env', env);
	  this.set('query parser', 'extended');
	  this.set('subdomain offset', 2);
	  this.set('trust proxy', false);

	  // trust proxy inherit back-compat
	  Object.defineProperty(this.settings, trustProxyDefaultSymbol, {
	    configurable: true,
	    value: true
	  });

	  debug('booting in %s mode', env);

	  this.on('mount', function onmount(parent) {
	    // inherit trust proxy
	    if (this.settings[trustProxyDefaultSymbol] === true
	      && typeof parent.settings['trust proxy fn'] === 'function') {
	      delete this.settings['trust proxy'];
	      delete this.settings['trust proxy fn'];
	    }

	    // inherit protos
	    this.request.__proto__ = parent.request;
	    this.response.__proto__ = parent.response;
	    this.engines.__proto__ = parent.engines;
	    this.settings.__proto__ = parent.settings;
	  });

	  // setup locals
	  this.locals = Object.create(null);

	  // top-most app is mounted at /
	  this.mountpath = '/';

	  // default locals
	  this.locals.settings = this.settings;

	  // default configuration
	  this.set('view', View);
	  this.set('views', resolve('views'));
	  this.set('jsonp callback name', 'callback');

	  if (env === 'production') {
	    this.enable('view cache');
	  }

	  Object.defineProperty(this, 'router', {
	    get: function() {
	      throw new Error('\'app.router\' is deprecated!\nPlease see the 3.x to 4.x migration guide for details on how to update your app.');
	    }
	  });
	};

	/**
	 * lazily adds the base router if it has not yet been added.
	 *
	 * We cannot add the base router in the defaultConfiguration because
	 * it reads app settings which might be set after that has run.
	 *
	 * @private
	 */
	app.lazyrouter = function lazyrouter() {
	  if (!this._router) {
	    this._router = new Router({
	      caseSensitive: this.enabled('case sensitive routing'),
	      strict: this.enabled('strict routing')
	    });

	    this._router.use(query(this.get('query parser fn')));
	    this._router.use(middleware.init(this));
	  }
	};

	/**
	 * Dispatch a req, res pair into the application. Starts pipeline processing.
	 *
	 * If no callback is provided, then default error handlers will respond
	 * in the event of an error bubbling through the stack.
	 *
	 * @private
	 */

	app.handle = function handle(req, res, callback) {
	  var router = this._router;

	  // final handler
	  var done = callback || finalhandler(req, res, {
	    env: this.get('env'),
	    onerror: logerror.bind(this)
	  });

	  // no routes
	  if (!router) {
	    debug('no routes defined on app');
	    done();
	    return;
	  }

	  router.handle(req, res, done);
	};

	/**
	 * Proxy `Router#use()` to add middleware to the app router.
	 * See Router#use() documentation for details.
	 *
	 * If the _fn_ parameter is an express app, then it will be
	 * mounted at the _route_ specified.
	 *
	 * @public
	 */

	app.use = function use(fn) {
	  var offset = 0;
	  var path = '/';

	  // default path to '/'
	  // disambiguate app.use([fn])
	  if (typeof fn !== 'function') {
	    var arg = fn;

	    while (Array.isArray(arg) && arg.length !== 0) {
	      arg = arg[0];
	    }

	    // first arg is the path
	    if (typeof arg !== 'function') {
	      offset = 1;
	      path = fn;
	    }
	  }

	  var fns = flatten(slice.call(arguments, offset));

	  if (fns.length === 0) {
	    throw new TypeError('app.use() requires middleware functions');
	  }

	  // setup router
	  this.lazyrouter();
	  var router = this._router;

	  fns.forEach(function (fn) {
	    // non-express app
	    if (!fn || !fn.handle || !fn.set) {
	      return router.use(path, fn);
	    }

	    debug('.use app under %s', path);
	    fn.mountpath = path;
	    fn.parent = this;

	    // restore .app property on req and res
	    router.use(path, function mounted_app(req, res, next) {
	      var orig = req.app;
	      fn.handle(req, res, function (err) {
	        req.__proto__ = orig.request;
	        res.__proto__ = orig.response;
	        next(err);
	      });
	    });

	    // mounted an app
	    fn.emit('mount', this);
	  }, this);

	  return this;
	};

	/**
	 * Proxy to the app `Router#route()`
	 * Returns a new `Route` instance for the _path_.
	 *
	 * Routes are isolated middleware stacks for specific paths.
	 * See the Route api docs for details.
	 *
	 * @public
	 */

	app.route = function route(path) {
	  this.lazyrouter();
	  return this._router.route(path);
	};

	/**
	 * Register the given template engine callback `fn`
	 * as `ext`.
	 *
	 * By default will `require()` the engine based on the
	 * file extension. For example if you try to render
	 * a "foo.jade" file Express will invoke the following internally:
	 *
	 *     app.engine('jade', require('jade').__express);
	 *
	 * For engines that do not provide `.__express` out of the box,
	 * or if you wish to "map" a different extension to the template engine
	 * you may use this method. For example mapping the EJS template engine to
	 * ".html" files:
	 *
	 *     app.engine('html', require('ejs').renderFile);
	 *
	 * In this case EJS provides a `.renderFile()` method with
	 * the same signature that Express expects: `(path, options, callback)`,
	 * though note that it aliases this method as `ejs.__express` internally
	 * so if you're using ".ejs" extensions you dont need to do anything.
	 *
	 * Some template engines do not follow this convention, the
	 * [Consolidate.js](https://github.com/tj/consolidate.js)
	 * library was created to map all of node's popular template
	 * engines to follow this convention, thus allowing them to
	 * work seamlessly within Express.
	 *
	 * @param {String} ext
	 * @param {Function} fn
	 * @return {app} for chaining
	 * @public
	 */

	app.engine = function engine(ext, fn) {
	  if (typeof fn !== 'function') {
	    throw new Error('callback function required');
	  }

	  // get file extension
	  var extension = ext[0] !== '.'
	    ? '.' + ext
	    : ext;

	  // store engine
	  this.engines[extension] = fn;

	  return this;
	};

	/**
	 * Proxy to `Router#param()` with one added api feature. The _name_ parameter
	 * can be an array of names.
	 *
	 * See the Router#param() docs for more details.
	 *
	 * @param {String|Array} name
	 * @param {Function} fn
	 * @return {app} for chaining
	 * @public
	 */

	app.param = function param(name, fn) {
	  this.lazyrouter();

	  if (Array.isArray(name)) {
	    for (var i = 0; i < name.length; i++) {
	      this.param(name[i], fn);
	    }

	    return this;
	  }

	  this._router.param(name, fn);

	  return this;
	};

	/**
	 * Assign `setting` to `val`, or return `setting`'s value.
	 *
	 *    app.set('foo', 'bar');
	 *    app.get('foo');
	 *    // => "bar"
	 *
	 * Mounted servers inherit their parent server's settings.
	 *
	 * @param {String} setting
	 * @param {*} [val]
	 * @return {Server} for chaining
	 * @public
	 */

	app.set = function set(setting, val) {
	  if (arguments.length === 1) {
	    // app.get(setting)
	    return this.settings[setting];
	  }

	  debug('set "%s" to %o', setting, val);

	  // set value
	  this.settings[setting] = val;

	  // trigger matched settings
	  switch (setting) {
	    case 'etag':
	      this.set('etag fn', compileETag(val));
	      break;
	    case 'query parser':
	      this.set('query parser fn', compileQueryParser(val));
	      break;
	    case 'trust proxy':
	      this.set('trust proxy fn', compileTrust(val));

	      // trust proxy inherit back-compat
	      Object.defineProperty(this.settings, trustProxyDefaultSymbol, {
	        configurable: true,
	        value: false
	      });

	      break;
	  }

	  return this;
	};

	/**
	 * Return the app's absolute pathname
	 * based on the parent(s) that have
	 * mounted it.
	 *
	 * For example if the application was
	 * mounted as "/admin", which itself
	 * was mounted as "/blog" then the
	 * return value would be "/blog/admin".
	 *
	 * @return {String}
	 * @private
	 */

	app.path = function path() {
	  return this.parent
	    ? this.parent.path() + this.mountpath
	    : '';
	};

	/**
	 * Check if `setting` is enabled (truthy).
	 *
	 *    app.enabled('foo')
	 *    // => false
	 *
	 *    app.enable('foo')
	 *    app.enabled('foo')
	 *    // => true
	 *
	 * @param {String} setting
	 * @return {Boolean}
	 * @public
	 */

	app.enabled = function enabled(setting) {
	  return Boolean(this.set(setting));
	};

	/**
	 * Check if `setting` is disabled.
	 *
	 *    app.disabled('foo')
	 *    // => true
	 *
	 *    app.enable('foo')
	 *    app.disabled('foo')
	 *    // => false
	 *
	 * @param {String} setting
	 * @return {Boolean}
	 * @public
	 */

	app.disabled = function disabled(setting) {
	  return !this.set(setting);
	};

	/**
	 * Enable `setting`.
	 *
	 * @param {String} setting
	 * @return {app} for chaining
	 * @public
	 */

	app.enable = function enable(setting) {
	  return this.set(setting, true);
	};

	/**
	 * Disable `setting`.
	 *
	 * @param {String} setting
	 * @return {app} for chaining
	 * @public
	 */

	app.disable = function disable(setting) {
	  return this.set(setting, false);
	};

	/**
	 * Delegate `.VERB(...)` calls to `router.VERB(...)`.
	 */

	methods.forEach(function(method){
	  app[method] = function(path){
	    if (method === 'get' && arguments.length === 1) {
	      // app.get(setting)
	      return this.set(path);
	    }

	    this.lazyrouter();

	    var route = this._router.route(path);
	    route[method].apply(route, slice.call(arguments, 1));
	    return this;
	  };
	});

	/**
	 * Special-cased "all" method, applying the given route `path`,
	 * middleware, and callback to _every_ HTTP method.
	 *
	 * @param {String} path
	 * @param {Function} ...
	 * @return {app} for chaining
	 * @public
	 */

	app.all = function all(path) {
	  this.lazyrouter();

	  var route = this._router.route(path);
	  var args = slice.call(arguments, 1);

	  for (var i = 0; i < methods.length; i++) {
	    route[methods[i]].apply(route, args);
	  }

	  return this;
	};

	// del -> delete alias

	app.del = deprecate.function(app.delete, 'app.del: Use app.delete instead');

	/**
	 * Render the given view `name` name with `options`
	 * and a callback accepting an error and the
	 * rendered template string.
	 *
	 * Example:
	 *
	 *    app.render('email', { name: 'Tobi' }, function(err, html){
	 *      // ...
	 *    })
	 *
	 * @param {String} name
	 * @param {Object|Function} options or fn
	 * @param {Function} callback
	 * @public
	 */

	app.render = function render(name, options, callback) {
	  var cache = this.cache;
	  var done = callback;
	  var engines = this.engines;
	  var opts = options;
	  var renderOptions = {};
	  var view;

	  // support callback function as second arg
	  if (typeof options === 'function') {
	    done = options;
	    opts = {};
	  }

	  // merge app.locals
	  merge(renderOptions, this.locals);

	  // merge options._locals
	  if (opts._locals) {
	    merge(renderOptions, opts._locals);
	  }

	  // merge options
	  merge(renderOptions, opts);

	  // set .cache unless explicitly provided
	  if (renderOptions.cache == null) {
	    renderOptions.cache = this.enabled('view cache');
	  }

	  // primed cache
	  if (renderOptions.cache) {
	    view = cache[name];
	  }

	  // view
	  if (!view) {
	    var View = this.get('view');

	    view = new View(name, {
	      defaultEngine: this.get('view engine'),
	      root: this.get('views'),
	      engines: engines
	    });

	    if (!view.path) {
	      var dirs = Array.isArray(view.root) && view.root.length > 1
	        ? 'directories "' + view.root.slice(0, -1).join('", "') + '" or "' + view.root[view.root.length - 1] + '"'
	        : 'directory "' + view.root + '"'
	      var err = new Error('Failed to lookup view "' + name + '" in views ' + dirs);
	      err.view = view;
	      return done(err);
	    }

	    // prime the cache
	    if (renderOptions.cache) {
	      cache[name] = view;
	    }
	  }

	  // render
	  tryRender(view, renderOptions, done);
	};

	/**
	 * Listen for connections.
	 *
	 * A node `http.Server` is returned, with this
	 * application (which is a `Function`) as its
	 * callback. If you wish to create both an HTTP
	 * and HTTPS server you may do so with the "http"
	 * and "https" modules as shown here:
	 *
	 *    var http = require('http')
	 *      , https = require('https')
	 *      , express = require('express')
	 *      , app = express();
	 *
	 *    http.createServer(app).listen(80);
	 *    https.createServer({ ... }, app).listen(443);
	 *
	 * @return {http.Server}
	 * @public
	 */

	app.listen = function listen() {
	  var server = http.createServer(this);
	  return server.listen.apply(server, arguments);
	};

	/**
	 * Log error using console.error.
	 *
	 * @param {Error} err
	 * @private
	 */

	function logerror(err) {
	  /* istanbul ignore next */
	  if (this.get('env') !== 'test') console.error(err.stack || err.toString());
	}

	/**
	 * Try rendering a view.
	 * @private
	 */

	function tryRender(view, options, callback) {
	  try {
	    view.render(options, callback);
	  } catch (err) {
	    callback(err);
	  }
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * finalhandler
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict'

	/**
	 * Module dependencies.
	 * @private
	 */

	var debug = __webpack_require__(8)('finalhandler')
	var escapeHtml = __webpack_require__(15)
	var http = __webpack_require__(16)
	var onFinished = __webpack_require__(17)
	var unpipe = __webpack_require__(19)

	/**
	 * Module variables.
	 * @private
	 */

	/* istanbul ignore next */
	var defer = typeof setImmediate === 'function'
	  ? setImmediate
	  : function(fn){ process.nextTick(fn.bind.apply(fn, arguments)) }
	var isFinished = onFinished.isFinished

	/**
	 * Module exports.
	 * @public
	 */

	module.exports = finalhandler

	/**
	 * Create a function to handle the final response.
	 *
	 * @param {Request} req
	 * @param {Response} res
	 * @param {Object} [options]
	 * @return {Function}
	 * @public
	 */

	function finalhandler(req, res, options) {
	  var opts = options || {}

	  // get environment
	  var env = opts.env || process.env.NODE_ENV || 'development'

	  // get error callback
	  var onerror = opts.onerror

	  return function (err) {
	    var status = res.statusCode

	    // ignore 404 on in-flight response
	    if (!err && res._header) {
	      debug('cannot 404 after headers sent')
	      return
	    }

	    // unhandled error
	    if (err) {
	      // respect err.statusCode
	      if (err.statusCode) {
	        status = err.statusCode
	      }

	      // respect err.status
	      if (err.status) {
	        status = err.status
	      }

	      // default status code to 500
	      if (!status || status < 400) {
	        status = 500
	      }

	      // production gets a basic error message
	      var msg = env === 'production'
	        ? http.STATUS_CODES[status]
	        : err.stack || err.toString()
	      msg = escapeHtml(msg)
	        .replace(/\n/g, '<br>')
	        .replace(/  /g, ' &nbsp;') + '\n'
	    } else {
	      status = 404
	      msg = 'Cannot ' + escapeHtml(req.method) + ' ' + escapeHtml(req.originalUrl || req.url) + '\n'
	    }

	    debug('default %s', status)

	    // schedule onerror callback
	    if (err && onerror) {
	      defer(onerror, err, req, res)
	    }

	    // cannot actually respond
	    if (res._header) {
	      return req.socket.destroy()
	    }

	    send(req, res, status, msg)
	  }
	}

	/**
	 * Send response.
	 *
	 * @param {IncomingMessage} req
	 * @param {OutgoingMessage} res
	 * @param {number} status
	 * @param {string} body
	 * @private
	 */

	function send(req, res, status, body) {
	  function write() {
	    res.statusCode = status

	    // security header for content sniffing
	    res.setHeader('X-Content-Type-Options', 'nosniff')

	    // standard headers
	    res.setHeader('Content-Type', 'text/html; charset=utf-8')
	    res.setHeader('Content-Length', Buffer.byteLength(body, 'utf8'))

	    if (req.method === 'HEAD') {
	      res.end()
	      return
	    }

	    res.end(body, 'utf8')
	  }

	  if (isFinished(req)) {
	    write()
	    return
	  }

	  // unpipe everything from the request
	  unpipe(req)

	  // flush the request
	  onFinished(req, write)
	  req.resume()
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */

	var tty = __webpack_require__(9);
	var util = __webpack_require__(10);

	/**
	 * This is the Node.js implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(11);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;

	/**
	 * Colors.
	 */

	exports.colors = [6, 2, 3, 4, 5, 1];

	/**
	 * The file descriptor to write the `debug()` calls to.
	 * Set the `DEBUG_FD` env variable to override with another value. i.e.:
	 *
	 *   $ DEBUG_FD=3 node script.js 3>debug.log
	 */

	var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
	var stream = 1 === fd ? process.stdout :
	             2 === fd ? process.stderr :
	             createWritableStdioStream(fd);

	/**
	 * Is stdout a TTY? Colored output is enabled when `true`.
	 */

	function useColors() {
	  var debugColors = (process.env.DEBUG_COLORS || '').trim().toLowerCase();
	  if (0 === debugColors.length) {
	    return tty.isatty(fd);
	  } else {
	    return '0' !== debugColors
	        && 'no' !== debugColors
	        && 'false' !== debugColors
	        && 'disabled' !== debugColors;
	  }
	}

	/**
	 * Map %o to `util.inspect()`, since Node doesn't do that out of the box.
	 */

	var inspect = (4 === util.inspect.length ?
	  // node <= 0.8.x
	  function (v, colors) {
	    return util.inspect(v, void 0, void 0, colors);
	  } :
	  // node > 0.8.x
	  function (v, colors) {
	    return util.inspect(v, { colors: colors });
	  }
	);

	exports.formatters.o = function(v) {
	  return inspect(v, this.useColors)
	    .replace(/\s*\n\s*/g, ' ');
	};

	/**
	 * Adds ANSI color escape codes if enabled.
	 *
	 * @api public
	 */

	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;
	  var name = this.namespace;

	  if (useColors) {
	    var c = this.color;

	    args[0] = '  \u001b[3' + c + ';1m' + name + ' '
	      + '\u001b[0m'
	      + args[0] + '\u001b[3' + c + 'm'
	      + ' +' + exports.humanize(this.diff) + '\u001b[0m';
	  } else {
	    args[0] = new Date().toUTCString()
	      + ' ' + name + ' ' + args[0];
	  }
	  return args;
	}

	/**
	 * Invokes `console.error()` with the specified arguments.
	 */

	function log() {
	  return stream.write(util.format.apply(this, arguments) + '\n');
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  if (null == namespaces) {
	    // If you set a process.env field to null or undefined, it gets cast to the
	    // string 'null' or 'undefined'. Just delete instead.
	    delete process.env.DEBUG;
	  } else {
	    process.env.DEBUG = namespaces;
	  }
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  return process.env.DEBUG;
	}

	/**
	 * Copied from `node/src/node.js`.
	 *
	 * XXX: It's lame that node doesn't expose this API out-of-the-box. It also
	 * relies on the undocumented `tty_wrap.guessHandleType()` which is also lame.
	 */

	function createWritableStdioStream (fd) {
	  var stream;
	  var tty_wrap = process.binding('tty_wrap');

	  // Note stream._type is used for test-module-load-list.js

	  switch (tty_wrap.guessHandleType(fd)) {
	    case 'TTY':
	      stream = new tty.WriteStream(fd);
	      stream._type = 'tty';

	      // Hack to have stream not keep the event loop alive.
	      // See https://github.com/joyent/node/issues/1726
	      if (stream._handle && stream._handle.unref) {
	        stream._handle.unref();
	      }
	      break;

	    case 'FILE':
	      var fs = __webpack_require__(13);
	      stream = new fs.SyncWriteStream(fd, { autoClose: false });
	      stream._type = 'fs';
	      break;

	    case 'PIPE':
	    case 'TCP':
	      var net = __webpack_require__(14);
	      stream = new net.Socket({
	        fd: fd,
	        readable: false,
	        writable: true
	      });

	      // FIXME Should probably have an option in net.Socket to create a
	      // stream from an existing fd which is writable only. But for now
	      // we'll just add this hack and set the `readable` member to false.
	      // Test: ./node test/fixtures/echo.js < /etc/passwd
	      stream.readable = false;
	      stream.read = null;
	      stream._type = 'pipe';

	      // FIXME Hack to have stream not keep the event loop alive.
	      // See https://github.com/joyent/node/issues/1726
	      if (stream._handle && stream._handle.unref) {
	        stream._handle.unref();
	      }
	      break;

	    default:
	      // Probably an error on in uv_guess_handle()
	      throw new Error('Implement me. Unknown stream file type!');
	  }

	  // For supporting legacy API we put the FD here.
	  stream.fd = fd;

	  stream._isStdio = true;

	  return stream;
	}

	/**
	 * Enable namespaces listed in `process.env.DEBUG` initially.
	 */

	exports.enable(load());


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("tty");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("util");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(12);

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */

	exports.formatters = {};

	/**
	 * Previously assigned color.
	 */

	var prevColor = 0;

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */

	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function debug(namespace) {

	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;

	  // define the `enabled` version
	  function enabled() {

	    var self = enabled;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();

	    var args = Array.prototype.slice.call(arguments);

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;

	  var fn = exports.enabled(namespace) ? enabled : disabled;

	  fn.namespace = namespace;

	  return fn;
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;

	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */

	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("net");

/***/ },
/* 15 */
/***/ function(module, exports) {

	/*!
	 * escape-html
	 * Copyright(c) 2012-2013 TJ Holowaychuk
	 * Copyright(c) 2015 Andreas Lubbe
	 * Copyright(c) 2015 Tiancheng "Timothy" Gu
	 * MIT Licensed
	 */

	'use strict';

	/**
	 * Module variables.
	 * @private
	 */

	var matchHtmlRegExp = /["'&<>]/;

	/**
	 * Module exports.
	 * @public
	 */

	module.exports = escapeHtml;

	/**
	 * Escape special characters in the given string of html.
	 *
	 * @param  {string} string The string to escape for inserting into HTML
	 * @return {string}
	 * @public
	 */

	function escapeHtml(string) {
	  var str = '' + string;
	  var match = matchHtmlRegExp.exec(str);

	  if (!match) {
	    return str;
	  }

	  var escape;
	  var html = '';
	  var index = 0;
	  var lastIndex = 0;

	  for (index = match.index; index < str.length; index++) {
	    switch (str.charCodeAt(index)) {
	      case 34: // "
	        escape = '&quot;';
	        break;
	      case 38: // &
	        escape = '&amp;';
	        break;
	      case 39: // '
	        escape = '&#39;';
	        break;
	      case 60: // <
	        escape = '&lt;';
	        break;
	      case 62: // >
	        escape = '&gt;';
	        break;
	      default:
	        continue;
	    }

	    if (lastIndex !== index) {
	      html += str.substring(lastIndex, index);
	    }

	    lastIndex = index + 1;
	    html += escape;
	  }

	  return lastIndex !== index
	    ? html + str.substring(lastIndex, index)
	    : html;
	}


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * on-finished
	 * Copyright(c) 2013 Jonathan Ong
	 * Copyright(c) 2014 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict'

	/**
	 * Module exports.
	 * @public
	 */

	module.exports = onFinished
	module.exports.isFinished = isFinished

	/**
	 * Module dependencies.
	 * @private
	 */

	var first = __webpack_require__(18)

	/**
	 * Variables.
	 * @private
	 */

	/* istanbul ignore next */
	var defer = typeof setImmediate === 'function'
	  ? setImmediate
	  : function(fn){ process.nextTick(fn.bind.apply(fn, arguments)) }

	/**
	 * Invoke callback when the response has finished, useful for
	 * cleaning up resources afterwards.
	 *
	 * @param {object} msg
	 * @param {function} listener
	 * @return {object}
	 * @public
	 */

	function onFinished(msg, listener) {
	  if (isFinished(msg) !== false) {
	    defer(listener, null, msg)
	    return msg
	  }

	  // attach the listener to the message
	  attachListener(msg, listener)

	  return msg
	}

	/**
	 * Determine if message is already finished.
	 *
	 * @param {object} msg
	 * @return {boolean}
	 * @public
	 */

	function isFinished(msg) {
	  var socket = msg.socket

	  if (typeof msg.finished === 'boolean') {
	    // OutgoingMessage
	    return Boolean(msg.finished || (socket && !socket.writable))
	  }

	  if (typeof msg.complete === 'boolean') {
	    // IncomingMessage
	    return Boolean(msg.upgrade || !socket || !socket.readable || (msg.complete && !msg.readable))
	  }

	  // don't know
	  return undefined
	}

	/**
	 * Attach a finished listener to the message.
	 *
	 * @param {object} msg
	 * @param {function} callback
	 * @private
	 */

	function attachFinishedListener(msg, callback) {
	  var eeMsg
	  var eeSocket
	  var finished = false

	  function onFinish(error) {
	    eeMsg.cancel()
	    eeSocket.cancel()

	    finished = true
	    callback(error)
	  }

	  // finished on first message event
	  eeMsg = eeSocket = first([[msg, 'end', 'finish']], onFinish)

	  function onSocket(socket) {
	    // remove listener
	    msg.removeListener('socket', onSocket)

	    if (finished) return
	    if (eeMsg !== eeSocket) return

	    // finished on first socket event
	    eeSocket = first([[socket, 'error', 'close']], onFinish)
	  }

	  if (msg.socket) {
	    // socket already assigned
	    onSocket(msg.socket)
	    return
	  }

	  // wait for socket to be assigned
	  msg.on('socket', onSocket)

	  if (msg.socket === undefined) {
	    // node.js 0.8 patch
	    patchAssignSocket(msg, onSocket)
	  }
	}

	/**
	 * Attach the listener to the message.
	 *
	 * @param {object} msg
	 * @return {function}
	 * @private
	 */

	function attachListener(msg, listener) {
	  var attached = msg.__onFinished

	  // create a private single listener with queue
	  if (!attached || !attached.queue) {
	    attached = msg.__onFinished = createListener(msg)
	    attachFinishedListener(msg, attached)
	  }

	  attached.queue.push(listener)
	}

	/**
	 * Create listener on message.
	 *
	 * @param {object} msg
	 * @return {function}
	 * @private
	 */

	function createListener(msg) {
	  function listener(err) {
	    if (msg.__onFinished === listener) msg.__onFinished = null
	    if (!listener.queue) return

	    var queue = listener.queue
	    listener.queue = null

	    for (var i = 0; i < queue.length; i++) {
	      queue[i](err, msg)
	    }
	  }

	  listener.queue = []

	  return listener
	}

	/**
	 * Patch ServerResponse.prototype.assignSocket for node.js 0.8.
	 *
	 * @param {ServerResponse} res
	 * @param {function} callback
	 * @private
	 */

	function patchAssignSocket(res, callback) {
	  var assignSocket = res.assignSocket

	  if (typeof assignSocket !== 'function') return

	  // res.on('socket', callback) is broken in 0.8
	  res.assignSocket = function _assignSocket(socket) {
	    assignSocket.call(this, socket)
	    callback(socket)
	  }
	}


/***/ },
/* 18 */
/***/ function(module, exports) {

	/*!
	 * ee-first
	 * Copyright(c) 2014 Jonathan Ong
	 * MIT Licensed
	 */

	'use strict'

	/**
	 * Module exports.
	 * @public
	 */

	module.exports = first

	/**
	 * Get the first event in a set of event emitters and event pairs.
	 *
	 * @param {array} stuff
	 * @param {function} done
	 * @public
	 */

	function first(stuff, done) {
	  if (!Array.isArray(stuff))
	    throw new TypeError('arg must be an array of [ee, events...] arrays')

	  var cleanups = []

	  for (var i = 0; i < stuff.length; i++) {
	    var arr = stuff[i]

	    if (!Array.isArray(arr) || arr.length < 2)
	      throw new TypeError('each array member must be [ee, events...]')

	    var ee = arr[0]

	    for (var j = 1; j < arr.length; j++) {
	      var event = arr[j]
	      var fn = listener(event, callback)

	      // listen to the event
	      ee.on(event, fn)
	      // push this listener to the list of cleanups
	      cleanups.push({
	        ee: ee,
	        event: event,
	        fn: fn,
	      })
	    }
	  }

	  function callback() {
	    cleanup()
	    done.apply(null, arguments)
	  }

	  function cleanup() {
	    var x
	    for (var i = 0; i < cleanups.length; i++) {
	      x = cleanups[i]
	      x.ee.removeListener(x.event, x.fn)
	    }
	  }

	  function thunk(fn) {
	    done = fn
	  }

	  thunk.cancel = cleanup

	  return thunk
	}

	/**
	 * Create the event listener.
	 * @private
	 */

	function listener(event, done) {
	  return function onevent(arg1) {
	    var args = new Array(arguments.length)
	    var ee = this
	    var err = event === 'error'
	      ? arg1
	      : null

	    // copy args to prevent arguments escaping scope
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i]
	    }

	    done(err, ee, event, args)
	  }
	}


/***/ },
/* 19 */
/***/ function(module, exports) {

	/*!
	 * unpipe
	 * Copyright(c) 2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict'

	/**
	 * Module exports.
	 * @public
	 */

	module.exports = unpipe

	/**
	 * Determine if there are Node.js pipe-like data listeners.
	 * @private
	 */

	function hasPipeDataListeners(stream) {
	  var listeners = stream.listeners('data')

	  for (var i = 0; i < listeners.length; i++) {
	    if (listeners[i].name === 'ondata') {
	      return true
	    }
	  }

	  return false
	}

	/**
	 * Unpipe a stream from all destinations.
	 *
	 * @param {object} stream
	 * @public
	 */

	function unpipe(stream) {
	  if (!stream) {
	    throw new TypeError('argument stream is required')
	  }

	  if (typeof stream.unpipe === 'function') {
	    // new-style
	    stream.unpipe()
	    return
	  }

	  // Node.js 0.8 hack
	  if (!hasPipeDataListeners(stream)) {
	    return
	  }

	  var listener
	  var listeners = stream.listeners('close')

	  for (var i = 0; i < listeners.length; i++) {
	    listener = listeners[i]

	    if (listener.name !== 'cleanup' && listener.name !== 'onclose') {
	      continue
	    }

	    // invoke the listener
	    listener.call(stream)
	  }
	}


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * express
	 * Copyright(c) 2009-2013 TJ Holowaychuk
	 * Copyright(c) 2013 Roman Shtylman
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict';

	/**
	 * Module dependencies.
	 * @private
	 */

	var Route = __webpack_require__(21);
	var Layer = __webpack_require__(23);
	var methods = __webpack_require__(25);
	var mixin = __webpack_require__(26);
	var debug = __webpack_require__(8)('express:router');
	var deprecate = __webpack_require__(27)('express');
	var flatten = __webpack_require__(22);
	var parseUrl = __webpack_require__(34);

	/**
	 * Module variables.
	 * @private
	 */

	var objectRegExp = /^\[object (\S+)\]$/;
	var slice = Array.prototype.slice;
	var toString = Object.prototype.toString;

	/**
	 * Initialize a new `Router` with the given `options`.
	 *
	 * @param {Object} options
	 * @return {Router} which is an callable function
	 * @public
	 */

	var proto = module.exports = function(options) {
	  var opts = options || {};

	  function router(req, res, next) {
	    router.handle(req, res, next);
	  }

	  // mixin Router class functions
	  router.__proto__ = proto;

	  router.params = {};
	  router._params = [];
	  router.caseSensitive = opts.caseSensitive;
	  router.mergeParams = opts.mergeParams;
	  router.strict = opts.strict;
	  router.stack = [];

	  return router;
	};

	/**
	 * Map the given param placeholder `name`(s) to the given callback.
	 *
	 * Parameter mapping is used to provide pre-conditions to routes
	 * which use normalized placeholders. For example a _:user_id_ parameter
	 * could automatically load a user's information from the database without
	 * any additional code,
	 *
	 * The callback uses the same signature as middleware, the only difference
	 * being that the value of the placeholder is passed, in this case the _id_
	 * of the user. Once the `next()` function is invoked, just like middleware
	 * it will continue on to execute the route, or subsequent parameter functions.
	 *
	 * Just like in middleware, you must either respond to the request or call next
	 * to avoid stalling the request.
	 *
	 *  app.param('user_id', function(req, res, next, id){
	 *    User.find(id, function(err, user){
	 *      if (err) {
	 *        return next(err);
	 *      } else if (!user) {
	 *        return next(new Error('failed to load user'));
	 *      }
	 *      req.user = user;
	 *      next();
	 *    });
	 *  });
	 *
	 * @param {String} name
	 * @param {Function} fn
	 * @return {app} for chaining
	 * @public
	 */

	proto.param = function param(name, fn) {
	  // param logic
	  if (typeof name === 'function') {
	    deprecate('router.param(fn): Refactor to use path params');
	    this._params.push(name);
	    return;
	  }

	  // apply param functions
	  var params = this._params;
	  var len = params.length;
	  var ret;

	  if (name[0] === ':') {
	    deprecate('router.param(' + JSON.stringify(name) + ', fn): Use router.param(' + JSON.stringify(name.substr(1)) + ', fn) instead');
	    name = name.substr(1);
	  }

	  for (var i = 0; i < len; ++i) {
	    if (ret = params[i](name, fn)) {
	      fn = ret;
	    }
	  }

	  // ensure we end up with a
	  // middleware function
	  if ('function' != typeof fn) {
	    throw new Error('invalid param() call for ' + name + ', got ' + fn);
	  }

	  (this.params[name] = this.params[name] || []).push(fn);
	  return this;
	};

	/**
	 * Dispatch a req, res into the router.
	 * @private
	 */

	proto.handle = function handle(req, res, out) {
	  var self = this;

	  debug('dispatching %s %s', req.method, req.url);

	  var search = 1 + req.url.indexOf('?');
	  var pathlength = search ? search - 1 : req.url.length;
	  var fqdn = req.url[0] !== '/' && 1 + req.url.substr(0, pathlength).indexOf('://');
	  var protohost = fqdn ? req.url.substr(0, req.url.indexOf('/', 2 + fqdn)) : '';
	  var idx = 0;
	  var removed = '';
	  var slashAdded = false;
	  var paramcalled = {};

	  // store options for OPTIONS request
	  // only used if OPTIONS request
	  var options = [];

	  // middleware and routes
	  var stack = self.stack;

	  // manage inter-router variables
	  var parentParams = req.params;
	  var parentUrl = req.baseUrl || '';
	  var done = restore(out, req, 'baseUrl', 'next', 'params');

	  // setup next layer
	  req.next = next;

	  // for options requests, respond with a default if nothing else responds
	  if (req.method === 'OPTIONS') {
	    done = wrap(done, function(old, err) {
	      if (err || options.length === 0) return old(err);
	      sendOptionsResponse(res, options, old);
	    });
	  }

	  // setup basic req values
	  req.baseUrl = parentUrl;
	  req.originalUrl = req.originalUrl || req.url;

	  next();

	  function next(err) {
	    var layerError = err === 'route'
	      ? null
	      : err;

	    // remove added slash
	    if (slashAdded) {
	      req.url = req.url.substr(1);
	      slashAdded = false;
	    }

	    // restore altered req.url
	    if (removed.length !== 0) {
	      req.baseUrl = parentUrl;
	      req.url = protohost + removed + req.url.substr(protohost.length);
	      removed = '';
	    }

	    // no more matching layers
	    if (idx >= stack.length) {
	      setImmediate(done, layerError);
	      return;
	    }

	    // get pathname of request
	    var path = getPathname(req);

	    if (path == null) {
	      return done(layerError);
	    }

	    // find next matching layer
	    var layer;
	    var match;
	    var route;

	    while (match !== true && idx < stack.length) {
	      layer = stack[idx++];
	      match = matchLayer(layer, path);
	      route = layer.route;

	      if (typeof match !== 'boolean') {
	        // hold on to layerError
	        layerError = layerError || match;
	      }

	      if (match !== true) {
	        continue;
	      }

	      if (!route) {
	        // process non-route handlers normally
	        continue;
	      }

	      if (layerError) {
	        // routes do not match with a pending error
	        match = false;
	        continue;
	      }

	      var method = req.method;
	      var has_method = route._handles_method(method);

	      // build up automatic options response
	      if (!has_method && method === 'OPTIONS') {
	        appendMethods(options, route._options());
	      }

	      // don't even bother matching route
	      if (!has_method && method !== 'HEAD') {
	        match = false;
	        continue;
	      }
	    }

	    // no match
	    if (match !== true) {
	      return done(layerError);
	    }

	    // store route for dispatch on change
	    if (route) {
	      req.route = route;
	    }

	    // Capture one-time layer values
	    req.params = self.mergeParams
	      ? mergeParams(layer.params, parentParams)
	      : layer.params;
	    var layerPath = layer.path;

	    // this should be done for the layer
	    self.process_params(layer, paramcalled, req, res, function (err) {
	      if (err) {
	        return next(layerError || err);
	      }

	      if (route) {
	        return layer.handle_request(req, res, next);
	      }

	      trim_prefix(layer, layerError, layerPath, path);
	    });
	  }

	  function trim_prefix(layer, layerError, layerPath, path) {
	    var c = path[layerPath.length];
	    if (c && '/' !== c && '.' !== c) return next(layerError);

	     // Trim off the part of the url that matches the route
	     // middleware (.use stuff) needs to have the path stripped
	    if (layerPath.length !== 0) {
	      debug('trim prefix (%s) from url %s', layerPath, req.url);
	      removed = layerPath;
	      req.url = protohost + req.url.substr(protohost.length + removed.length);

	      // Ensure leading slash
	      if (!fqdn && req.url[0] !== '/') {
	        req.url = '/' + req.url;
	        slashAdded = true;
	      }

	      // Setup base URL (no trailing slash)
	      req.baseUrl = parentUrl + (removed[removed.length - 1] === '/'
	        ? removed.substring(0, removed.length - 1)
	        : removed);
	    }

	    debug('%s %s : %s', layer.name, layerPath, req.originalUrl);

	    if (layerError) {
	      layer.handle_error(layerError, req, res, next);
	    } else {
	      layer.handle_request(req, res, next);
	    }
	  }
	};

	/**
	 * Process any parameters for the layer.
	 * @private
	 */

	proto.process_params = function process_params(layer, called, req, res, done) {
	  var params = this.params;

	  // captured parameters from the layer, keys and values
	  var keys = layer.keys;

	  // fast track
	  if (!keys || keys.length === 0) {
	    return done();
	  }

	  var i = 0;
	  var name;
	  var paramIndex = 0;
	  var key;
	  var paramVal;
	  var paramCallbacks;
	  var paramCalled;

	  // process params in order
	  // param callbacks can be async
	  function param(err) {
	    if (err) {
	      return done(err);
	    }

	    if (i >= keys.length ) {
	      return done();
	    }

	    paramIndex = 0;
	    key = keys[i++];

	    if (!key) {
	      return done();
	    }

	    name = key.name;
	    paramVal = req.params[name];
	    paramCallbacks = params[name];
	    paramCalled = called[name];

	    if (paramVal === undefined || !paramCallbacks) {
	      return param();
	    }

	    // param previously called with same value or error occurred
	    if (paramCalled && (paramCalled.match === paramVal
	      || (paramCalled.error && paramCalled.error !== 'route'))) {
	      // restore value
	      req.params[name] = paramCalled.value;

	      // next param
	      return param(paramCalled.error);
	    }

	    called[name] = paramCalled = {
	      error: null,
	      match: paramVal,
	      value: paramVal
	    };

	    paramCallback();
	  }

	  // single param callbacks
	  function paramCallback(err) {
	    var fn = paramCallbacks[paramIndex++];

	    // store updated value
	    paramCalled.value = req.params[key.name];

	    if (err) {
	      // store error
	      paramCalled.error = err;
	      param(err);
	      return;
	    }

	    if (!fn) return param();

	    try {
	      fn(req, res, paramCallback, paramVal, key.name);
	    } catch (e) {
	      paramCallback(e);
	    }
	  }

	  param();
	};

	/**
	 * Use the given middleware function, with optional path, defaulting to "/".
	 *
	 * Use (like `.all`) will run for any http METHOD, but it will not add
	 * handlers for those methods so OPTIONS requests will not consider `.use`
	 * functions even if they could respond.
	 *
	 * The other difference is that _route_ path is stripped and not visible
	 * to the handler function. The main effect of this feature is that mounted
	 * handlers can operate without any code changes regardless of the "prefix"
	 * pathname.
	 *
	 * @public
	 */

	proto.use = function use(fn) {
	  var offset = 0;
	  var path = '/';

	  // default path to '/'
	  // disambiguate router.use([fn])
	  if (typeof fn !== 'function') {
	    var arg = fn;

	    while (Array.isArray(arg) && arg.length !== 0) {
	      arg = arg[0];
	    }

	    // first arg is the path
	    if (typeof arg !== 'function') {
	      offset = 1;
	      path = fn;
	    }
	  }

	  var callbacks = flatten(slice.call(arguments, offset));

	  if (callbacks.length === 0) {
	    throw new TypeError('Router.use() requires middleware functions');
	  }

	  for (var i = 0; i < callbacks.length; i++) {
	    var fn = callbacks[i];

	    if (typeof fn !== 'function') {
	      throw new TypeError('Router.use() requires middleware function but got a ' + gettype(fn));
	    }

	    // add the middleware
	    debug('use %s %s', path, fn.name || '<anonymous>');

	    var layer = new Layer(path, {
	      sensitive: this.caseSensitive,
	      strict: false,
	      end: false
	    }, fn);

	    layer.route = undefined;

	    this.stack.push(layer);
	  }

	  return this;
	};

	/**
	 * Create a new Route for the given path.
	 *
	 * Each route contains a separate middleware stack and VERB handlers.
	 *
	 * See the Route api documentation for details on adding handlers
	 * and middleware to routes.
	 *
	 * @param {String} path
	 * @return {Route}
	 * @public
	 */

	proto.route = function route(path) {
	  var route = new Route(path);

	  var layer = new Layer(path, {
	    sensitive: this.caseSensitive,
	    strict: this.strict,
	    end: true
	  }, route.dispatch.bind(route));

	  layer.route = route;

	  this.stack.push(layer);
	  return route;
	};

	// create Router#VERB functions
	methods.concat('all').forEach(function(method){
	  proto[method] = function(path){
	    var route = this.route(path)
	    route[method].apply(route, slice.call(arguments, 1));
	    return this;
	  };
	});

	// append methods to a list of methods
	function appendMethods(list, addition) {
	  for (var i = 0; i < addition.length; i++) {
	    var method = addition[i];
	    if (list.indexOf(method) === -1) {
	      list.push(method);
	    }
	  }
	}

	// get pathname of request
	function getPathname(req) {
	  try {
	    return parseUrl(req).pathname;
	  } catch (err) {
	    return undefined;
	  }
	}

	// get type for error message
	function gettype(obj) {
	  var type = typeof obj;

	  if (type !== 'object') {
	    return type;
	  }

	  // inspect [[Class]] for objects
	  return toString.call(obj)
	    .replace(objectRegExp, '$1');
	}

	/**
	 * Match path to a layer.
	 *
	 * @param {Layer} layer
	 * @param {string} path
	 * @private
	 */

	function matchLayer(layer, path) {
	  try {
	    return layer.match(path);
	  } catch (err) {
	    return err;
	  }
	}

	// merge params with parent params
	function mergeParams(params, parent) {
	  if (typeof parent !== 'object' || !parent) {
	    return params;
	  }

	  // make copy of parent for base
	  var obj = mixin({}, parent);

	  // simple non-numeric merging
	  if (!(0 in params) || !(0 in parent)) {
	    return mixin(obj, params);
	  }

	  var i = 0;
	  var o = 0;

	  // determine numeric gaps
	  while (i in params) {
	    i++;
	  }

	  while (o in parent) {
	    o++;
	  }

	  // offset numeric indices in params before merge
	  for (i--; i >= 0; i--) {
	    params[i + o] = params[i];

	    // create holes for the merge when necessary
	    if (i < o) {
	      delete params[i];
	    }
	  }

	  return mixin(obj, params);
	}

	// restore obj props after function
	function restore(fn, obj) {
	  var props = new Array(arguments.length - 2);
	  var vals = new Array(arguments.length - 2);

	  for (var i = 0; i < props.length; i++) {
	    props[i] = arguments[i + 2];
	    vals[i] = obj[props[i]];
	  }

	  return function(err){
	    // restore vals
	    for (var i = 0; i < props.length; i++) {
	      obj[props[i]] = vals[i];
	    }

	    return fn.apply(this, arguments);
	  };
	}

	// send an OPTIONS response
	function sendOptionsResponse(res, options, next) {
	  try {
	    var body = options.join(',');
	    res.set('Allow', body);
	    res.send(body);
	  } catch (err) {
	    next(err);
	  }
	}

	// wrap a function
	function wrap(old, fn) {
	  return function proxy() {
	    var args = new Array(arguments.length + 1);

	    args[0] = old;
	    for (var i = 0, len = arguments.length; i < len; i++) {
	      args[i + 1] = arguments[i];
	    }

	    fn.apply(this, args);
	  };
	}


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * express
	 * Copyright(c) 2009-2013 TJ Holowaychuk
	 * Copyright(c) 2013 Roman Shtylman
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict';

	/**
	 * Module dependencies.
	 * @private
	 */

	var debug = __webpack_require__(8)('express:router:route');
	var flatten = __webpack_require__(22);
	var Layer = __webpack_require__(23);
	var methods = __webpack_require__(25);

	/**
	 * Module variables.
	 * @private
	 */

	var slice = Array.prototype.slice;
	var toString = Object.prototype.toString;

	/**
	 * Module exports.
	 * @public
	 */

	module.exports = Route;

	/**
	 * Initialize `Route` with the given `path`,
	 *
	 * @param {String} path
	 * @public
	 */

	function Route(path) {
	  this.path = path;
	  this.stack = [];

	  debug('new %s', path);

	  // route handlers for various http methods
	  this.methods = {};
	}

	/**
	 * Determine if the route handles a given method.
	 * @private
	 */

	Route.prototype._handles_method = function _handles_method(method) {
	  if (this.methods._all) {
	    return true;
	  }

	  var name = method.toLowerCase();

	  if (name === 'head' && !this.methods['head']) {
	    name = 'get';
	  }

	  return Boolean(this.methods[name]);
	};

	/**
	 * @return {Array} supported HTTP methods
	 * @private
	 */

	Route.prototype._options = function _options() {
	  var methods = Object.keys(this.methods);

	  // append automatic head
	  if (this.methods.get && !this.methods.head) {
	    methods.push('head');
	  }

	  for (var i = 0; i < methods.length; i++) {
	    // make upper case
	    methods[i] = methods[i].toUpperCase();
	  }

	  return methods;
	};

	/**
	 * dispatch req, res into this route
	 * @private
	 */

	Route.prototype.dispatch = function dispatch(req, res, done) {
	  var idx = 0;
	  var stack = this.stack;
	  if (stack.length === 0) {
	    return done();
	  }

	  var method = req.method.toLowerCase();
	  if (method === 'head' && !this.methods['head']) {
	    method = 'get';
	  }

	  req.route = this;

	  next();

	  function next(err) {
	    if (err && err === 'route') {
	      return done();
	    }

	    var layer = stack[idx++];
	    if (!layer) {
	      return done(err);
	    }

	    if (layer.method && layer.method !== method) {
	      return next(err);
	    }

	    if (err) {
	      layer.handle_error(err, req, res, next);
	    } else {
	      layer.handle_request(req, res, next);
	    }
	  }
	};

	/**
	 * Add a handler for all HTTP verbs to this route.
	 *
	 * Behaves just like middleware and can respond or call `next`
	 * to continue processing.
	 *
	 * You can use multiple `.all` call to add multiple handlers.
	 *
	 *   function check_something(req, res, next){
	 *     next();
	 *   };
	 *
	 *   function validate_user(req, res, next){
	 *     next();
	 *   };
	 *
	 *   route
	 *   .all(validate_user)
	 *   .all(check_something)
	 *   .get(function(req, res, next){
	 *     res.send('hello world');
	 *   });
	 *
	 * @param {function} handler
	 * @return {Route} for chaining
	 * @api public
	 */

	Route.prototype.all = function all() {
	  var handles = flatten(slice.call(arguments));

	  for (var i = 0; i < handles.length; i++) {
	    var handle = handles[i];

	    if (typeof handle !== 'function') {
	      var type = toString.call(handle);
	      var msg = 'Route.all() requires callback functions but got a ' + type;
	      throw new TypeError(msg);
	    }

	    var layer = Layer('/', {}, handle);
	    layer.method = undefined;

	    this.methods._all = true;
	    this.stack.push(layer);
	  }

	  return this;
	};

	methods.forEach(function(method){
	  Route.prototype[method] = function(){
	    var handles = flatten(slice.call(arguments));

	    for (var i = 0; i < handles.length; i++) {
	      var handle = handles[i];

	      if (typeof handle !== 'function') {
	        var type = toString.call(handle);
	        var msg = 'Route.' + method + '() requires callback functions but got a ' + type;
	        throw new Error(msg);
	      }

	      debug('%s %s', method, this.path);

	      var layer = Layer('/', {}, handle);
	      layer.method = method;

	      this.methods[method] = true;
	      this.stack.push(layer);
	    }

	    return this;
	  };
	});


/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict'

	/**
	 * Expose `arrayFlatten`.
	 */
	module.exports = arrayFlatten

	/**
	 * Recursive flatten function with depth.
	 *
	 * @param  {Array}  array
	 * @param  {Array}  result
	 * @param  {Number} depth
	 * @return {Array}
	 */
	function flattenWithDepth (array, result, depth) {
	  for (var i = 0; i < array.length; i++) {
	    var value = array[i]

	    if (depth > 0 && Array.isArray(value)) {
	      flattenWithDepth(value, result, depth - 1)
	    } else {
	      result.push(value)
	    }
	  }

	  return result
	}

	/**
	 * Recursive flatten function. Omitting depth is slightly faster.
	 *
	 * @param  {Array} array
	 * @param  {Array} result
	 * @return {Array}
	 */
	function flattenForever (array, result) {
	  for (var i = 0; i < array.length; i++) {
	    var value = array[i]

	    if (Array.isArray(value)) {
	      flattenForever(value, result)
	    } else {
	      result.push(value)
	    }
	  }

	  return result
	}

	/**
	 * Flatten an array, with the ability to define a depth.
	 *
	 * @param  {Array}  array
	 * @param  {Number} depth
	 * @return {Array}
	 */
	function arrayFlatten (array, depth) {
	  if (depth == null) {
	    return flattenForever(array, [])
	  }

	  return flattenWithDepth(array, [], depth)
	}


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * express
	 * Copyright(c) 2009-2013 TJ Holowaychuk
	 * Copyright(c) 2013 Roman Shtylman
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict';

	/**
	 * Module dependencies.
	 * @private
	 */

	var pathRegexp = __webpack_require__(24);
	var debug = __webpack_require__(8)('express:router:layer');

	/**
	 * Module variables.
	 * @private
	 */

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Module exports.
	 * @public
	 */

	module.exports = Layer;

	function Layer(path, options, fn) {
	  if (!(this instanceof Layer)) {
	    return new Layer(path, options, fn);
	  }

	  debug('new %s', path);
	  var opts = options || {};

	  this.handle = fn;
	  this.name = fn.name || '<anonymous>';
	  this.params = undefined;
	  this.path = undefined;
	  this.regexp = pathRegexp(path, this.keys = [], opts);

	  if (path === '/' && opts.end === false) {
	    this.regexp.fast_slash = true;
	  }
	}

	/**
	 * Handle the error for the layer.
	 *
	 * @param {Error} error
	 * @param {Request} req
	 * @param {Response} res
	 * @param {function} next
	 * @api private
	 */

	Layer.prototype.handle_error = function handle_error(error, req, res, next) {
	  var fn = this.handle;

	  if (fn.length !== 4) {
	    // not a standard error handler
	    return next(error);
	  }

	  try {
	    fn(error, req, res, next);
	  } catch (err) {
	    next(err);
	  }
	};

	/**
	 * Handle the request for the layer.
	 *
	 * @param {Request} req
	 * @param {Response} res
	 * @param {function} next
	 * @api private
	 */

	Layer.prototype.handle_request = function handle(req, res, next) {
	  var fn = this.handle;

	  if (fn.length > 3) {
	    // not a standard request handler
	    return next();
	  }

	  try {
	    fn(req, res, next);
	  } catch (err) {
	    next(err);
	  }
	};

	/**
	 * Check if this route matches `path`, if so
	 * populate `.params`.
	 *
	 * @param {String} path
	 * @return {Boolean}
	 * @api private
	 */

	Layer.prototype.match = function match(path) {
	  if (path == null) {
	    // no path, nothing matches
	    this.params = undefined;
	    this.path = undefined;
	    return false;
	  }

	  if (this.regexp.fast_slash) {
	    // fast path non-ending match for / (everything matches)
	    this.params = {};
	    this.path = '';
	    return true;
	  }

	  var m = this.regexp.exec(path);

	  if (!m) {
	    this.params = undefined;
	    this.path = undefined;
	    return false;
	  }

	  // store values
	  this.params = {};
	  this.path = m[0];

	  var keys = this.keys;
	  var params = this.params;

	  for (var i = 1; i < m.length; i++) {
	    var key = keys[i - 1];
	    var prop = key.name;
	    var val = decode_param(m[i]);

	    if (val !== undefined || !(hasOwnProperty.call(params, prop))) {
	      params[prop] = val;
	    }
	  }

	  return true;
	};

	/**
	 * Decode param value.
	 *
	 * @param {string} val
	 * @return {string}
	 * @private
	 */

	function decode_param(val) {
	  if (typeof val !== 'string' || val.length === 0) {
	    return val;
	  }

	  try {
	    return decodeURIComponent(val);
	  } catch (err) {
	    if (err instanceof URIError) {
	      err.message = 'Failed to decode param \'' + val + '\'';
	      err.status = err.statusCode = 400;
	    }

	    throw err;
	  }
	}


/***/ },
/* 24 */
/***/ function(module, exports) {

	/**
	 * Expose `pathtoRegexp`.
	 */

	module.exports = pathtoRegexp;

	/**
	 * Match matching groups in a regular expression.
	 */
	var MATCHING_GROUP_REGEXP = /\((?!\?)/g;

	/**
	 * Normalize the given path string,
	 * returning a regular expression.
	 *
	 * An empty array should be passed,
	 * which will contain the placeholder
	 * key names. For example "/user/:id" will
	 * then contain ["id"].
	 *
	 * @param  {String|RegExp|Array} path
	 * @param  {Array} keys
	 * @param  {Object} options
	 * @return {RegExp}
	 * @api private
	 */

	function pathtoRegexp(path, keys, options) {
	  options = options || {};
	  keys = keys || [];
	  var strict = options.strict;
	  var end = options.end !== false;
	  var flags = options.sensitive ? '' : 'i';
	  var extraOffset = 0;
	  var keysOffset = keys.length;
	  var i = 0;
	  var name = 0;
	  var m;

	  if (path instanceof RegExp) {
	    while (m = MATCHING_GROUP_REGEXP.exec(path.source)) {
	      keys.push({
	        name: name++,
	        optional: false,
	        offset: m.index
	      });
	    }

	    return path;
	  }

	  if (Array.isArray(path)) {
	    // Map array parts into regexps and return their source. We also pass
	    // the same keys and options instance into every generation to get
	    // consistent matching groups before we join the sources together.
	    path = path.map(function (value) {
	      return pathtoRegexp(value, keys, options).source;
	    });

	    return new RegExp('(?:' + path.join('|') + ')', flags);
	  }

	  path = ('^' + path + (strict ? '' : path[path.length - 1] === '/' ? '?' : '/?'))
	    .replace(/\/\(/g, '/(?:')
	    .replace(/([\/\.])/g, '\\$1')
	    .replace(/(\\\/)?(\\\.)?:(\w+)(\(.*?\))?(\*)?(\?)?/g, function (match, slash, format, key, capture, star, optional, offset) {
	      slash = slash || '';
	      format = format || '';
	      capture = capture || '([^\\/' + format + ']+?)';
	      optional = optional || '';

	      keys.push({
	        name: key,
	        optional: !!optional,
	        offset: offset + extraOffset
	      });

	      var result = ''
	        + (optional ? '' : slash)
	        + '(?:'
	        + format + (optional ? slash : '') + capture
	        + (star ? '((?:[\\/' + format + '].+?)?)' : '')
	        + ')'
	        + optional;

	      extraOffset += result.length - match.length;

	      return result;
	    })
	    .replace(/\*/g, function (star, index) {
	      var len = keys.length

	      while (len-- > keysOffset && keys[len].offset > index) {
	        keys[len].offset += 3; // Replacement length minus asterisk length.
	      }

	      return '(.*)';
	    });

	  // This is a workaround for handling unnamed matching groups.
	  while (m = MATCHING_GROUP_REGEXP.exec(path)) {
	    var escapeCount = 0;
	    var index = m.index;

	    while (path.charAt(--index) === '\\') {
	      escapeCount++;
	    }

	    // It's possible to escape the bracket.
	    if (escapeCount % 2 === 1) {
	      continue;
	    }

	    if (keysOffset + i === keys.length || keys[keysOffset + i].offset > m.index) {
	      keys.splice(keysOffset + i, 0, {
	        name: name++, // Unnamed matching groups must be consistently linear.
	        optional: false,
	        offset: m.index
	      });
	    }

	    i++;
	  }

	  // If the path is non-ending, match until the end or a slash.
	  path += (end ? '$' : (path[path.length - 1] === '/' ? '' : '(?=\\/|$)'));

	  return new RegExp(path, flags);
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * methods
	 * Copyright(c) 2013-2014 TJ Holowaychuk
	 * Copyright(c) 2015-2016 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict';

	/**
	 * Module dependencies.
	 * @private
	 */

	var http = __webpack_require__(16);

	/**
	 * Module exports.
	 * @public
	 */

	module.exports = getCurrentNodeMethods() || getBasicNodeMethods();

	/**
	 * Get the current Node.js methods.
	 * @private
	 */

	function getCurrentNodeMethods() {
	  return http.METHODS && http.METHODS.map(function lowerCaseMethod(method) {
	    return method.toLowerCase();
	  });
	}

	/**
	 * Get the "basic" Node.js methods, a snapshot from Node.js 0.10.
	 * @private
	 */

	function getBasicNodeMethods() {
	  return [
	    'get',
	    'post',
	    'put',
	    'head',
	    'delete',
	    'options',
	    'trace',
	    'copy',
	    'lock',
	    'mkcol',
	    'move',
	    'purge',
	    'propfind',
	    'proppatch',
	    'unlock',
	    'report',
	    'mkactivity',
	    'checkout',
	    'merge',
	    'm-search',
	    'notify',
	    'subscribe',
	    'unsubscribe',
	    'patch',
	    'search',
	    'connect'
	  ];
	}


/***/ },
/* 26 */
/***/ function(module, exports) {

	/**
	 * Merge object b with object a.
	 *
	 *     var a = { foo: 'bar' }
	 *       , b = { bar: 'baz' };
	 *
	 *     merge(a, b);
	 *     // => { foo: 'bar', bar: 'baz' }
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object}
	 * @api public
	 */

	exports = module.exports = function(a, b){
	  if (a && b) {
	    for (var key in b) {
	      a[key] = b[key];
	    }
	  }
	  return a;
	};


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * depd
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	/**
	 * Module dependencies.
	 */

	var callSiteToString = __webpack_require__(28).callSiteToString
	var eventListenerCount = __webpack_require__(28).eventListenerCount
	var relative = __webpack_require__(33).relative

	/**
	 * Module exports.
	 */

	module.exports = depd

	/**
	 * Get the path to base files on.
	 */

	var basePath = process.cwd()

	/**
	 * Determine if namespace is contained in the string.
	 */

	function containsNamespace(str, namespace) {
	  var val = str.split(/[ ,]+/)

	  namespace = String(namespace).toLowerCase()

	  for (var i = 0 ; i < val.length; i++) {
	    if (!(str = val[i])) continue;

	    // namespace contained
	    if (str === '*' || str.toLowerCase() === namespace) {
	      return true
	    }
	  }

	  return false
	}

	/**
	 * Convert a data descriptor to accessor descriptor.
	 */

	function convertDataDescriptorToAccessor(obj, prop, message) {
	  var descriptor = Object.getOwnPropertyDescriptor(obj, prop)
	  var value = descriptor.value

	  descriptor.get = function getter() { return value }

	  if (descriptor.writable) {
	    descriptor.set = function setter(val) { return value = val }
	  }

	  delete descriptor.value
	  delete descriptor.writable

	  Object.defineProperty(obj, prop, descriptor)

	  return descriptor
	}

	/**
	 * Create arguments string to keep arity.
	 */

	function createArgumentsString(arity) {
	  var str = ''

	  for (var i = 0; i < arity; i++) {
	    str += ', arg' + i
	  }

	  return str.substr(2)
	}

	/**
	 * Create stack string from stack.
	 */

	function createStackString(stack) {
	  var str = this.name + ': ' + this.namespace

	  if (this.message) {
	    str += ' deprecated ' + this.message
	  }

	  for (var i = 0; i < stack.length; i++) {
	    str += '\n    at ' + callSiteToString(stack[i])
	  }

	  return str
	}

	/**
	 * Create deprecate for namespace in caller.
	 */

	function depd(namespace) {
	  if (!namespace) {
	    throw new TypeError('argument namespace is required')
	  }

	  var stack = getStack()
	  var site = callSiteLocation(stack[1])
	  var file = site[0]

	  function deprecate(message) {
	    // call to self as log
	    log.call(deprecate, message)
	  }

	  deprecate._file = file
	  deprecate._ignored = isignored(namespace)
	  deprecate._namespace = namespace
	  deprecate._traced = istraced(namespace)
	  deprecate._warned = Object.create(null)

	  deprecate.function = wrapfunction
	  deprecate.property = wrapproperty

	  return deprecate
	}

	/**
	 * Determine if namespace is ignored.
	 */

	function isignored(namespace) {
	  /* istanbul ignore next: tested in a child processs */
	  if (process.noDeprecation) {
	    // --no-deprecation support
	    return true
	  }

	  var str = process.env.NO_DEPRECATION || ''

	  // namespace ignored
	  return containsNamespace(str, namespace)
	}

	/**
	 * Determine if namespace is traced.
	 */

	function istraced(namespace) {
	  /* istanbul ignore next: tested in a child processs */
	  if (process.traceDeprecation) {
	    // --trace-deprecation support
	    return true
	  }

	  var str = process.env.TRACE_DEPRECATION || ''

	  // namespace traced
	  return containsNamespace(str, namespace)
	}

	/**
	 * Display deprecation message.
	 */

	function log(message, site) {
	  var haslisteners = eventListenerCount(process, 'deprecation') !== 0

	  // abort early if no destination
	  if (!haslisteners && this._ignored) {
	    return
	  }

	  var caller
	  var callFile
	  var callSite
	  var i = 0
	  var seen = false
	  var stack = getStack()
	  var file = this._file

	  if (site) {
	    // provided site
	    callSite = callSiteLocation(stack[1])
	    callSite.name = site.name
	    file = callSite[0]
	  } else {
	    // get call site
	    i = 2
	    site = callSiteLocation(stack[i])
	    callSite = site
	  }

	  // get caller of deprecated thing in relation to file
	  for (; i < stack.length; i++) {
	    caller = callSiteLocation(stack[i])
	    callFile = caller[0]

	    if (callFile === file) {
	      seen = true
	    } else if (callFile === this._file) {
	      file = this._file
	    } else if (seen) {
	      break
	    }
	  }

	  var key = caller
	    ? site.join(':') + '__' + caller.join(':')
	    : undefined

	  if (key !== undefined && key in this._warned) {
	    // already warned
	    return
	  }

	  this._warned[key] = true

	  // generate automatic message from call site
	  if (!message) {
	    message = callSite === site || !callSite.name
	      ? defaultMessage(site)
	      : defaultMessage(callSite)
	  }

	  // emit deprecation if listeners exist
	  if (haslisteners) {
	    var err = DeprecationError(this._namespace, message, stack.slice(i))
	    process.emit('deprecation', err)
	    return
	  }

	  // format and write message
	  var format = process.stderr.isTTY
	    ? formatColor
	    : formatPlain
	  var msg = format.call(this, message, caller, stack.slice(i))
	  process.stderr.write(msg + '\n', 'utf8')

	  return
	}

	/**
	 * Get call site location as array.
	 */

	function callSiteLocation(callSite) {
	  var file = callSite.getFileName() || '<anonymous>'
	  var line = callSite.getLineNumber()
	  var colm = callSite.getColumnNumber()

	  if (callSite.isEval()) {
	    file = callSite.getEvalOrigin() + ', ' + file
	  }

	  var site = [file, line, colm]

	  site.callSite = callSite
	  site.name = callSite.getFunctionName()

	  return site
	}

	/**
	 * Generate a default message from the site.
	 */

	function defaultMessage(site) {
	  var callSite = site.callSite
	  var funcName = site.name

	  // make useful anonymous name
	  if (!funcName) {
	    funcName = '<anonymous@' + formatLocation(site) + '>'
	  }

	  var context = callSite.getThis()
	  var typeName = context && callSite.getTypeName()

	  // ignore useless type name
	  if (typeName === 'Object') {
	    typeName = undefined
	  }

	  // make useful type name
	  if (typeName === 'Function') {
	    typeName = context.name || typeName
	  }

	  return typeName && callSite.getMethodName()
	    ? typeName + '.' + funcName
	    : funcName
	}

	/**
	 * Format deprecation message without color.
	 */

	function formatPlain(msg, caller, stack) {
	  var timestamp = new Date().toUTCString()

	  var formatted = timestamp
	    + ' ' + this._namespace
	    + ' deprecated ' + msg

	  // add stack trace
	  if (this._traced) {
	    for (var i = 0; i < stack.length; i++) {
	      formatted += '\n    at ' + callSiteToString(stack[i])
	    }

	    return formatted
	  }

	  if (caller) {
	    formatted += ' at ' + formatLocation(caller)
	  }

	  return formatted
	}

	/**
	 * Format deprecation message with color.
	 */

	function formatColor(msg, caller, stack) {
	  var formatted = '\x1b[36;1m' + this._namespace + '\x1b[22;39m' // bold cyan
	    + ' \x1b[33;1mdeprecated\x1b[22;39m' // bold yellow
	    + ' \x1b[0m' + msg + '\x1b[39m' // reset

	  // add stack trace
	  if (this._traced) {
	    for (var i = 0; i < stack.length; i++) {
	      formatted += '\n    \x1b[36mat ' + callSiteToString(stack[i]) + '\x1b[39m' // cyan
	    }

	    return formatted
	  }

	  if (caller) {
	    formatted += ' \x1b[36m' + formatLocation(caller) + '\x1b[39m' // cyan
	  }

	  return formatted
	}

	/**
	 * Format call site location.
	 */

	function formatLocation(callSite) {
	  return relative(basePath, callSite[0])
	    + ':' + callSite[1]
	    + ':' + callSite[2]
	}

	/**
	 * Get the stack as array of call sites.
	 */

	function getStack() {
	  var limit = Error.stackTraceLimit
	  var obj = {}
	  var prep = Error.prepareStackTrace

	  Error.prepareStackTrace = prepareObjectStackTrace
	  Error.stackTraceLimit = Math.max(10, limit)

	  // capture the stack
	  Error.captureStackTrace(obj)

	  // slice this function off the top
	  var stack = obj.stack.slice(1)

	  Error.prepareStackTrace = prep
	  Error.stackTraceLimit = limit

	  return stack
	}

	/**
	 * Capture call site stack from v8.
	 */

	function prepareObjectStackTrace(obj, stack) {
	  return stack
	}

	/**
	 * Return a wrapped function in a deprecation message.
	 */

	function wrapfunction(fn, message) {
	  if (typeof fn !== 'function') {
	    throw new TypeError('argument fn must be a function')
	  }

	  var args = createArgumentsString(fn.length)
	  var deprecate = this
	  var stack = getStack()
	  var site = callSiteLocation(stack[1])

	  site.name = fn.name

	  var deprecatedfn = eval('(function (' + args + ') {\n'
	    + '"use strict"\n'
	    + 'log.call(deprecate, message, site)\n'
	    + 'return fn.apply(this, arguments)\n'
	    + '})')

	  return deprecatedfn
	}

	/**
	 * Wrap property in a deprecation message.
	 */

	function wrapproperty(obj, prop, message) {
	  if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
	    throw new TypeError('argument obj must be object')
	  }

	  var descriptor = Object.getOwnPropertyDescriptor(obj, prop)

	  if (!descriptor) {
	    throw new TypeError('must call property on owner object')
	  }

	  if (!descriptor.configurable) {
	    throw new TypeError('property must be configurable')
	  }

	  var deprecate = this
	  var stack = getStack()
	  var site = callSiteLocation(stack[1])

	  // set site name
	  site.name = prop

	  // convert data descriptor
	  if ('value' in descriptor) {
	    descriptor = convertDataDescriptorToAccessor(obj, prop, message)
	  }

	  var get = descriptor.get
	  var set = descriptor.set

	  // wrap getter
	  if (typeof get === 'function') {
	    descriptor.get = function getter() {
	      log.call(deprecate, message, site)
	      return get.apply(this, arguments)
	    }
	  }

	  // wrap setter
	  if (typeof set === 'function') {
	    descriptor.set = function setter() {
	      log.call(deprecate, message, site)
	      return set.apply(this, arguments)
	    }
	  }

	  Object.defineProperty(obj, prop, descriptor)
	}

	/**
	 * Create DeprecationError for deprecation
	 */

	function DeprecationError(namespace, message, stack) {
	  var error = new Error()
	  var stackString

	  Object.defineProperty(error, 'constructor', {
	    value: DeprecationError
	  })

	  Object.defineProperty(error, 'message', {
	    configurable: true,
	    enumerable: false,
	    value: message,
	    writable: true
	  })

	  Object.defineProperty(error, 'name', {
	    enumerable: false,
	    configurable: true,
	    value: 'DeprecationError',
	    writable: true
	  })

	  Object.defineProperty(error, 'namespace', {
	    configurable: true,
	    enumerable: false,
	    value: namespace,
	    writable: true
	  })

	  Object.defineProperty(error, 'stack', {
	    configurable: true,
	    enumerable: false,
	    get: function () {
	      if (stackString !== undefined) {
	        return stackString
	      }

	      // prepare stack trace
	      return stackString = createStackString.call(this, stack)
	    },
	    set: function setter(val) {
	      stackString = val
	    }
	  })

	  return error
	}


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * depd
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict'

	/**
	 * Module dependencies.
	 * @private
	 */

	var Buffer = __webpack_require__(29)
	var EventEmitter = __webpack_require__(4).EventEmitter

	/**
	 * Module exports.
	 * @public
	 */

	lazyProperty(module.exports, 'bufferConcat', function bufferConcat() {
	  return Buffer.concat || __webpack_require__(30)
	})

	lazyProperty(module.exports, 'callSiteToString', function callSiteToString() {
	  var limit = Error.stackTraceLimit
	  var obj = {}
	  var prep = Error.prepareStackTrace

	  function prepareObjectStackTrace(obj, stack) {
	    return stack
	  }

	  Error.prepareStackTrace = prepareObjectStackTrace
	  Error.stackTraceLimit = 2

	  // capture the stack
	  Error.captureStackTrace(obj)

	  // slice the stack
	  var stack = obj.stack.slice()

	  Error.prepareStackTrace = prep
	  Error.stackTraceLimit = limit

	  return stack[0].toString ? toString : __webpack_require__(31)
	})

	lazyProperty(module.exports, 'eventListenerCount', function eventListenerCount() {
	  return EventEmitter.listenerCount || __webpack_require__(32)
	})

	/**
	 * Define a lazy property.
	 */

	function lazyProperty(obj, prop, getter) {
	  function get() {
	    var val = getter()

	    Object.defineProperty(obj, prop, {
	      configurable: true,
	      enumerable: true,
	      value: val
	    })

	    return val
	  }

	  Object.defineProperty(obj, prop, {
	    configurable: true,
	    enumerable: true,
	    get: get
	  })
	}

	/**
	 * Call toString() on the obj
	 */

	function toString(obj) {
	  return obj.toString()
	}


/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = require("buffer");

/***/ },
/* 30 */
/***/ function(module, exports) {

	/*!
	 * depd
	 * Copyright(c) 2014 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict'

	/**
	 * Module exports.
	 */

	module.exports = bufferConcat

	/**
	 * Concatenate an array of Buffers.
	 */

	function bufferConcat(bufs) {
	  var length = 0

	  for (var i = 0, len = bufs.length; i < len; i++) {
	    length += bufs[i].length
	  }

	  var buf = new Buffer(length)
	  var pos = 0

	  for (var i = 0, len = bufs.length; i < len; i++) {
	    bufs[i].copy(buf, pos)
	    pos += bufs[i].length
	  }

	  return buf
	}


/***/ },
/* 31 */
/***/ function(module, exports) {

	/*!
	 * depd
	 * Copyright(c) 2014 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict'

	/**
	 * Module exports.
	 */

	module.exports = callSiteToString

	/**
	 * Format a CallSite file location to a string.
	 */

	function callSiteFileLocation(callSite) {
	  var fileName
	  var fileLocation = ''

	  if (callSite.isNative()) {
	    fileLocation = 'native'
	  } else if (callSite.isEval()) {
	    fileName = callSite.getScriptNameOrSourceURL()
	    if (!fileName) {
	      fileLocation = callSite.getEvalOrigin()
	    }
	  } else {
	    fileName = callSite.getFileName()
	  }

	  if (fileName) {
	    fileLocation += fileName

	    var lineNumber = callSite.getLineNumber()
	    if (lineNumber != null) {
	      fileLocation += ':' + lineNumber

	      var columnNumber = callSite.getColumnNumber()
	      if (columnNumber) {
	        fileLocation += ':' + columnNumber
	      }
	    }
	  }

	  return fileLocation || 'unknown source'
	}

	/**
	 * Format a CallSite to a string.
	 */

	function callSiteToString(callSite) {
	  var addSuffix = true
	  var fileLocation = callSiteFileLocation(callSite)
	  var functionName = callSite.getFunctionName()
	  var isConstructor = callSite.isConstructor()
	  var isMethodCall = !(callSite.isToplevel() || isConstructor)
	  var line = ''

	  if (isMethodCall) {
	    var methodName = callSite.getMethodName()
	    var typeName = getConstructorName(callSite)

	    if (functionName) {
	      if (typeName && functionName.indexOf(typeName) !== 0) {
	        line += typeName + '.'
	      }

	      line += functionName

	      if (methodName && functionName.lastIndexOf('.' + methodName) !== functionName.length - methodName.length - 1) {
	        line += ' [as ' + methodName + ']'
	      }
	    } else {
	      line += typeName + '.' + (methodName || '<anonymous>')
	    }
	  } else if (isConstructor) {
	    line += 'new ' + (functionName || '<anonymous>')
	  } else if (functionName) {
	    line += functionName
	  } else {
	    addSuffix = false
	    line += fileLocation
	  }

	  if (addSuffix) {
	    line += ' (' + fileLocation + ')'
	  }

	  return line
	}

	/**
	 * Get constructor name of reviver.
	 */

	function getConstructorName(obj) {
	  var receiver = obj.receiver
	  return (receiver.constructor && receiver.constructor.name) || null
	}


/***/ },
/* 32 */
/***/ function(module, exports) {

	/*!
	 * depd
	 * Copyright(c) 2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict'

	/**
	 * Module exports.
	 * @public
	 */

	module.exports = eventListenerCount

	/**
	 * Get the count of listeners on an event emitter of a specific type.
	 */

	function eventListenerCount(emitter, type) {
	  return emitter.listeners(type).length
	}


/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * parseurl
	 * Copyright(c) 2014 Jonathan Ong
	 * Copyright(c) 2014 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict'

	/**
	 * Module dependencies.
	 */

	var url = __webpack_require__(35)
	var parse = url.parse
	var Url = url.Url

	/**
	 * Pattern for a simple path case.
	 * See: https://github.com/joyent/node/pull/7878
	 */

	var simplePathRegExp = /^(\/\/?(?!\/)[^\?#\s]*)(\?[^#\s]*)?$/

	/**
	 * Exports.
	 */

	module.exports = parseurl
	module.exports.original = originalurl

	/**
	 * Parse the `req` url with memoization.
	 *
	 * @param {ServerRequest} req
	 * @return {Object}
	 * @api public
	 */

	function parseurl(req) {
	  var url = req.url

	  if (url === undefined) {
	    // URL is undefined
	    return undefined
	  }

	  var parsed = req._parsedUrl

	  if (fresh(url, parsed)) {
	    // Return cached URL parse
	    return parsed
	  }

	  // Parse the URL
	  parsed = fastparse(url)
	  parsed._raw = url

	  return req._parsedUrl = parsed
	};

	/**
	 * Parse the `req` original url with fallback and memoization.
	 *
	 * @param {ServerRequest} req
	 * @return {Object}
	 * @api public
	 */

	function originalurl(req) {
	  var url = req.originalUrl

	  if (typeof url !== 'string') {
	    // Fallback
	    return parseurl(req)
	  }

	  var parsed = req._parsedOriginalUrl

	  if (fresh(url, parsed)) {
	    // Return cached URL parse
	    return parsed
	  }

	  // Parse the URL
	  parsed = fastparse(url)
	  parsed._raw = url

	  return req._parsedOriginalUrl = parsed
	};

	/**
	 * Parse the `str` url with fast-path short-cut.
	 *
	 * @param {string} str
	 * @return {Object}
	 * @api private
	 */

	function fastparse(str) {
	  // Try fast path regexp
	  // See: https://github.com/joyent/node/pull/7878
	  var simplePath = typeof str === 'string' && simplePathRegExp.exec(str)

	  // Construct simple URL
	  if (simplePath) {
	    var pathname = simplePath[1]
	    var search = simplePath[2] || null
	    var url = Url !== undefined
	      ? new Url()
	      : {}
	    url.path = str
	    url.href = str
	    url.pathname = pathname
	    url.search = search
	    url.query = search && search.substr(1)

	    return url
	  }

	  return parse(str)
	}

	/**
	 * Determine if parsed is still fresh for url.
	 *
	 * @param {string} url
	 * @param {object} parsedUrl
	 * @return {boolean}
	 * @api private
	 */

	function fresh(url, parsedUrl) {
	  return typeof parsedUrl === 'object'
	    && parsedUrl !== null
	    && (Url === undefined || parsedUrl instanceof Url)
	    && parsedUrl._raw === url
	}


/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("url");

/***/ },
/* 36 */
/***/ function(module, exports) {

	/*!
	 * express
	 * Copyright(c) 2009-2013 TJ Holowaychuk
	 * Copyright(c) 2013 Roman Shtylman
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict';

	/**
	 * Initialization middleware, exposing the
	 * request and response to each other, as well
	 * as defaulting the X-Powered-By header field.
	 *
	 * @param {Function} app
	 * @return {Function}
	 * @api private
	 */

	exports.init = function(app){
	  return function expressInit(req, res, next){
	    if (app.enabled('x-powered-by')) res.setHeader('X-Powered-By', 'Express');
	    req.res = res;
	    res.req = req;
	    req.next = next;

	    req.__proto__ = app.request;
	    res.__proto__ = app.response;

	    res.locals = res.locals || Object.create(null);

	    next();
	  };
	};



/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * express
	 * Copyright(c) 2009-2013 TJ Holowaychuk
	 * Copyright(c) 2013 Roman Shtylman
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict';

	/**
	 * Module dependencies.
	 */

	var parseUrl = __webpack_require__(34);
	var qs = __webpack_require__(38);

	/**
	 * @param {Object} options
	 * @return {Function}
	 * @api public
	 */

	module.exports = function query(options) {
	  var opts = Object.create(options || null);
	  var queryparse = qs.parse;

	  if (typeof options === 'function') {
	    queryparse = options;
	    opts = undefined;
	  }

	  if (opts !== undefined) {
	    if (opts.allowDots === undefined) {
	      opts.allowDots = false;
	    }

	    if (opts.allowPrototypes === undefined) {
	      opts.allowPrototypes = true;
	    }
	  }

	  return function query(req, res, next){
	    if (!req.query) {
	      var val = parseUrl(req).query;
	      req.query = queryparse(val, opts);
	    }

	    next();
	  };
	};


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Stringify = __webpack_require__(39);
	var Parse = __webpack_require__(41);


	// Declare internals

	var internals = {};


	module.exports = {
	    stringify: Stringify,
	    parse: Parse
	};


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Utils = __webpack_require__(40);


	// Declare internals

	var internals = {
	    delimiter: '&',
	    arrayPrefixGenerators: {
	        brackets: function (prefix, key) {

	            return prefix + '[]';
	        },
	        indices: function (prefix, key) {

	            return prefix + '[' + key + ']';
	        },
	        repeat: function (prefix, key) {

	            return prefix;
	        }
	    },
	    strictNullHandling: false
	};


	internals.stringify = function (obj, prefix, generateArrayPrefix, strictNullHandling, filter) {

	    if (typeof filter === 'function') {
	        obj = filter(prefix, obj);
	    }
	    else if (Utils.isBuffer(obj)) {
	        obj = obj.toString();
	    }
	    else if (obj instanceof Date) {
	        obj = obj.toISOString();
	    }
	    else if (obj === null) {
	        if (strictNullHandling) {
	            return Utils.encode(prefix);
	        }

	        obj = '';
	    }

	    if (typeof obj === 'string' ||
	        typeof obj === 'number' ||
	        typeof obj === 'boolean') {

	        return [Utils.encode(prefix) + '=' + Utils.encode(obj)];
	    }

	    var values = [];

	    if (typeof obj === 'undefined') {
	        return values;
	    }

	    var objKeys = Array.isArray(filter) ? filter : Object.keys(obj);
	    for (var i = 0, il = objKeys.length; i < il; ++i) {
	        var key = objKeys[i];

	        if (Array.isArray(obj)) {
	            values = values.concat(internals.stringify(obj[key], generateArrayPrefix(prefix, key), generateArrayPrefix, strictNullHandling, filter));
	        }
	        else {
	            values = values.concat(internals.stringify(obj[key], prefix + '[' + key + ']', generateArrayPrefix, strictNullHandling, filter));
	        }
	    }

	    return values;
	};


	module.exports = function (obj, options) {

	    options = options || {};
	    var delimiter = typeof options.delimiter === 'undefined' ? internals.delimiter : options.delimiter;
	    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : internals.strictNullHandling;
	    var objKeys;
	    var filter;
	    if (typeof options.filter === 'function') {
	        filter = options.filter;
	        obj = filter('', obj);
	    }
	    else if (Array.isArray(options.filter)) {
	        objKeys = filter = options.filter;
	    }

	    var keys = [];

	    if (typeof obj !== 'object' ||
	        obj === null) {

	        return '';
	    }

	    var arrayFormat;
	    if (options.arrayFormat in internals.arrayPrefixGenerators) {
	        arrayFormat = options.arrayFormat;
	    }
	    else if ('indices' in options) {
	        arrayFormat = options.indices ? 'indices' : 'repeat';
	    }
	    else {
	        arrayFormat = 'indices';
	    }

	    var generateArrayPrefix = internals.arrayPrefixGenerators[arrayFormat];

	    if (!objKeys) {
	        objKeys = Object.keys(obj);
	    }
	    for (var i = 0, il = objKeys.length; i < il; ++i) {
	        var key = objKeys[i];
	        keys = keys.concat(internals.stringify(obj[key], key, generateArrayPrefix, strictNullHandling, filter));
	    }

	    return keys.join(delimiter);
	};


/***/ },
/* 40 */
/***/ function(module, exports) {

	// Load modules


	// Declare internals

	var internals = {};
	internals.hexTable = new Array(256);
	for (var h = 0; h < 256; ++h) {
	    internals.hexTable[h] = '%' + ((h < 16 ? '0' : '') + h.toString(16)).toUpperCase();
	}


	exports.arrayToObject = function (source, options) {

	    var obj = options.plainObjects ? Object.create(null) : {};
	    for (var i = 0, il = source.length; i < il; ++i) {
	        if (typeof source[i] !== 'undefined') {

	            obj[i] = source[i];
	        }
	    }

	    return obj;
	};


	exports.merge = function (target, source, options) {

	    if (!source) {
	        return target;
	    }

	    if (typeof source !== 'object') {
	        if (Array.isArray(target)) {
	            target.push(source);
	        }
	        else if (typeof target === 'object') {
	            target[source] = true;
	        }
	        else {
	            target = [target, source];
	        }

	        return target;
	    }

	    if (typeof target !== 'object') {
	        target = [target].concat(source);
	        return target;
	    }

	    if (Array.isArray(target) &&
	        !Array.isArray(source)) {

	        target = exports.arrayToObject(target, options);
	    }

	    var keys = Object.keys(source);
	    for (var k = 0, kl = keys.length; k < kl; ++k) {
	        var key = keys[k];
	        var value = source[key];

	        if (!Object.prototype.hasOwnProperty.call(target, key)) {
	            target[key] = value;
	        }
	        else {
	            target[key] = exports.merge(target[key], value, options);
	        }
	    }

	    return target;
	};


	exports.decode = function (str) {

	    try {
	        return decodeURIComponent(str.replace(/\+/g, ' '));
	    } catch (e) {
	        return str;
	    }
	};

	exports.encode = function (str) {

	    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
	    // It has been adapted here for stricter adherence to RFC 3986
	    if (str.length === 0) {
	        return str;
	    }

	    if (typeof str !== 'string') {
	        str = '' + str;
	    }

	    var out = '';
	    for (var i = 0, il = str.length; i < il; ++i) {
	        var c = str.charCodeAt(i);

	        if (c === 0x2D || // -
	            c === 0x2E || // .
	            c === 0x5F || // _
	            c === 0x7E || // ~
	            (c >= 0x30 && c <= 0x39) || // 0-9
	            (c >= 0x41 && c <= 0x5A) || // a-z
	            (c >= 0x61 && c <= 0x7A)) { // A-Z

	            out += str[i];
	            continue;
	        }

	        if (c < 0x80) {
	            out += internals.hexTable[c];
	            continue;
	        }

	        if (c < 0x800) {
	            out += internals.hexTable[0xC0 | (c >> 6)] + internals.hexTable[0x80 | (c & 0x3F)];
	            continue;
	        }

	        if (c < 0xD800 || c >= 0xE000) {
	            out += internals.hexTable[0xE0 | (c >> 12)] + internals.hexTable[0x80 | ((c >> 6) & 0x3F)] + internals.hexTable[0x80 | (c & 0x3F)];
	            continue;
	        }

	        ++i;
	        c = 0x10000 + (((c & 0x3FF) << 10) | (str.charCodeAt(i) & 0x3FF));
	        out += internals.hexTable[0xF0 | (c >> 18)] + internals.hexTable[0x80 | ((c >> 12) & 0x3F)] + internals.hexTable[0x80 | ((c >> 6) & 0x3F)] + internals.hexTable[0x80 | (c & 0x3F)];
	    }

	    return out;
	};

	exports.compact = function (obj, refs) {

	    if (typeof obj !== 'object' ||
	        obj === null) {

	        return obj;
	    }

	    refs = refs || [];
	    var lookup = refs.indexOf(obj);
	    if (lookup !== -1) {
	        return refs[lookup];
	    }

	    refs.push(obj);

	    if (Array.isArray(obj)) {
	        var compacted = [];

	        for (var i = 0, il = obj.length; i < il; ++i) {
	            if (typeof obj[i] !== 'undefined') {
	                compacted.push(obj[i]);
	            }
	        }

	        return compacted;
	    }

	    var keys = Object.keys(obj);
	    for (i = 0, il = keys.length; i < il; ++i) {
	        var key = keys[i];
	        obj[key] = exports.compact(obj[key], refs);
	    }

	    return obj;
	};


	exports.isRegExp = function (obj) {

	    return Object.prototype.toString.call(obj) === '[object RegExp]';
	};


	exports.isBuffer = function (obj) {

	    if (obj === null ||
	        typeof obj === 'undefined') {

	        return false;
	    }

	    return !!(obj.constructor &&
	              obj.constructor.isBuffer &&
	              obj.constructor.isBuffer(obj));
	};


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Utils = __webpack_require__(40);


	// Declare internals

	var internals = {
	    delimiter: '&',
	    depth: 5,
	    arrayLimit: 20,
	    parameterLimit: 1000,
	    strictNullHandling: false,
	    plainObjects: false,
	    allowPrototypes: false
	};


	internals.parseValues = function (str, options) {

	    var obj = {};
	    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);

	    for (var i = 0, il = parts.length; i < il; ++i) {
	        var part = parts[i];
	        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

	        if (pos === -1) {
	            obj[Utils.decode(part)] = '';

	            if (options.strictNullHandling) {
	                obj[Utils.decode(part)] = null;
	            }
	        }
	        else {
	            var key = Utils.decode(part.slice(0, pos));
	            var val = Utils.decode(part.slice(pos + 1));

	            if (!Object.prototype.hasOwnProperty.call(obj, key)) {
	                obj[key] = val;
	            }
	            else {
	                obj[key] = [].concat(obj[key]).concat(val);
	            }
	        }
	    }

	    return obj;
	};


	internals.parseObject = function (chain, val, options) {

	    if (!chain.length) {
	        return val;
	    }

	    var root = chain.shift();

	    var obj;
	    if (root === '[]') {
	        obj = [];
	        obj = obj.concat(internals.parseObject(chain, val, options));
	    }
	    else {
	        obj = options.plainObjects ? Object.create(null) : {};
	        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
	        var index = parseInt(cleanRoot, 10);
	        var indexString = '' + index;
	        if (!isNaN(index) &&
	            root !== cleanRoot &&
	            indexString === cleanRoot &&
	            index >= 0 &&
	            (options.parseArrays &&
	             index <= options.arrayLimit)) {

	            obj = [];
	            obj[index] = internals.parseObject(chain, val, options);
	        }
	        else {
	            obj[cleanRoot] = internals.parseObject(chain, val, options);
	        }
	    }

	    return obj;
	};


	internals.parseKeys = function (key, val, options) {

	    if (!key) {
	        return;
	    }

	    // Transform dot notation to bracket notation

	    if (options.allowDots) {
	        key = key.replace(/\.([^\.\[]+)/g, '[$1]');
	    }

	    // The regex chunks

	    var parent = /^([^\[\]]*)/;
	    var child = /(\[[^\[\]]*\])/g;

	    // Get the parent

	    var segment = parent.exec(key);

	    // Stash the parent if it exists

	    var keys = [];
	    if (segment[1]) {
	        // If we aren't using plain objects, optionally prefix keys
	        // that would overwrite object prototype properties
	        if (!options.plainObjects &&
	            Object.prototype.hasOwnProperty(segment[1])) {

	            if (!options.allowPrototypes) {
	                return;
	            }
	        }

	        keys.push(segment[1]);
	    }

	    // Loop through children appending to the array until we hit depth

	    var i = 0;
	    while ((segment = child.exec(key)) !== null && i < options.depth) {

	        ++i;
	        if (!options.plainObjects &&
	            Object.prototype.hasOwnProperty(segment[1].replace(/\[|\]/g, ''))) {

	            if (!options.allowPrototypes) {
	                continue;
	            }
	        }
	        keys.push(segment[1]);
	    }

	    // If there's a remainder, just add whatever is left

	    if (segment) {
	        keys.push('[' + key.slice(segment.index) + ']');
	    }

	    return internals.parseObject(keys, val, options);
	};


	module.exports = function (str, options) {

	    options = options || {};
	    options.delimiter = typeof options.delimiter === 'string' || Utils.isRegExp(options.delimiter) ? options.delimiter : internals.delimiter;
	    options.depth = typeof options.depth === 'number' ? options.depth : internals.depth;
	    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : internals.arrayLimit;
	    options.parseArrays = options.parseArrays !== false;
	    options.allowDots = options.allowDots !== false;
	    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : internals.plainObjects;
	    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : internals.allowPrototypes;
	    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : internals.parameterLimit;
	    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : internals.strictNullHandling;

	    if (str === '' ||
	        str === null ||
	        typeof str === 'undefined') {

	        return options.plainObjects ? Object.create(null) : {};
	    }

	    var tempObj = typeof str === 'string' ? internals.parseValues(str, options) : str;
	    var obj = options.plainObjects ? Object.create(null) : {};

	    // Iterate over the keys and setup the new object

	    var keys = Object.keys(tempObj);
	    for (var i = 0, il = keys.length; i < il; ++i) {
	        var key = keys[i];
	        var newObj = internals.parseKeys(key, tempObj[key], options);
	        obj = Utils.merge(obj, newObj, options);
	    }

	    return Utils.compact(obj);
	};


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * express
	 * Copyright(c) 2009-2013 TJ Holowaychuk
	 * Copyright(c) 2013 Roman Shtylman
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict';

	/**
	 * Module dependencies.
	 * @private
	 */

	var debug = __webpack_require__(8)('express:view');
	var path = __webpack_require__(33);
	var fs = __webpack_require__(13);
	var utils = __webpack_require__(43);

	/**
	 * Module variables.
	 * @private
	 */

	var dirname = path.dirname;
	var basename = path.basename;
	var extname = path.extname;
	var join = path.join;
	var resolve = path.resolve;

	/**
	 * Module exports.
	 * @public
	 */

	module.exports = View;

	/**
	 * Initialize a new `View` with the given `name`.
	 *
	 * Options:
	 *
	 *   - `defaultEngine` the default template engine name
	 *   - `engines` template engine require() cache
	 *   - `root` root path for view lookup
	 *
	 * @param {string} name
	 * @param {object} options
	 * @public
	 */

	function View(name, options) {
	  var opts = options || {};

	  this.defaultEngine = opts.defaultEngine;
	  this.ext = extname(name);
	  this.name = name;
	  this.root = opts.root;

	  if (!this.ext && !this.defaultEngine) {
	    throw new Error('No default engine was specified and no extension was provided.');
	  }

	  var fileName = name;

	  if (!this.ext) {
	    // get extension from default engine name
	    this.ext = this.defaultEngine[0] !== '.'
	      ? '.' + this.defaultEngine
	      : this.defaultEngine;

	    fileName += this.ext;
	  }

	  if (!opts.engines[this.ext]) {
	    // load engine
	    opts.engines[this.ext] = __webpack_require__(64)(this.ext.substr(1)).__express;
	  }

	  // store loaded engine
	  this.engine = opts.engines[this.ext];

	  // lookup path
	  this.path = this.lookup(fileName);
	}

	/**
	 * Lookup view by the given `name`
	 *
	 * @param {string} name
	 * @private
	 */

	View.prototype.lookup = function lookup(name) {
	  var path;
	  var roots = [].concat(this.root);

	  debug('lookup "%s"', name);

	  for (var i = 0; i < roots.length && !path; i++) {
	    var root = roots[i];

	    // resolve the path
	    var loc = resolve(root, name);
	    var dir = dirname(loc);
	    var file = basename(loc);

	    // resolve the file
	    path = this.resolve(dir, file);
	  }

	  return path;
	};

	/**
	 * Render with the given options.
	 *
	 * @param {object} options
	 * @param {function} callback
	 * @private
	 */

	View.prototype.render = function render(options, callback) {
	  debug('render "%s"', this.path);
	  this.engine(this.path, options, callback);
	};

	/**
	 * Resolve the file within the given directory.
	 *
	 * @param {string} dir
	 * @param {string} file
	 * @private
	 */

	View.prototype.resolve = function resolve(dir, file) {
	  var ext = this.ext;

	  // <path>.<ext>
	  var path = join(dir, file);
	  var stat = tryStat(path);

	  if (stat && stat.isFile()) {
	    return path;
	  }

	  // <path>/index.<ext>
	  path = join(dir, basename(file, ext), 'index' + ext);
	  stat = tryStat(path);

	  if (stat && stat.isFile()) {
	    return path;
	  }
	};

	/**
	 * Return a stat, maybe.
	 *
	 * @param {string} path
	 * @return {fs.Stats}
	 * @private
	 */

	function tryStat(path) {
	  debug('stat "%s"', path);

	  try {
	    return fs.statSync(path);
	  } catch (e) {
	    return undefined;
	  }
	}


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * express
	 * Copyright(c) 2009-2013 TJ Holowaychuk
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict';

	/**
	 * Module dependencies.
	 * @api private
	 */

	var contentDisposition = __webpack_require__(44);
	var contentType = __webpack_require__(45);
	var deprecate = __webpack_require__(27)('express');
	var flatten = __webpack_require__(22);
	var mime = __webpack_require__(46).mime;
	var basename = __webpack_require__(33).basename;
	var etag = __webpack_require__(57);
	var proxyaddr = __webpack_require__(59);
	var qs = __webpack_require__(38);
	var querystring = __webpack_require__(63);

	/**
	 * Return strong ETag for `body`.
	 *
	 * @param {String|Buffer} body
	 * @param {String} [encoding]
	 * @return {String}
	 * @api private
	 */

	exports.etag = function (body, encoding) {
	  var buf = !Buffer.isBuffer(body)
	    ? new Buffer(body, encoding)
	    : body;

	  return etag(buf, {weak: false});
	};

	/**
	 * Return weak ETag for `body`.
	 *
	 * @param {String|Buffer} body
	 * @param {String} [encoding]
	 * @return {String}
	 * @api private
	 */

	exports.wetag = function wetag(body, encoding){
	  var buf = !Buffer.isBuffer(body)
	    ? new Buffer(body, encoding)
	    : body;

	  return etag(buf, {weak: true});
	};

	/**
	 * Check if `path` looks absolute.
	 *
	 * @param {String} path
	 * @return {Boolean}
	 * @api private
	 */

	exports.isAbsolute = function(path){
	  if ('/' == path[0]) return true;
	  if (':' == path[1] && '\\' == path[2]) return true;
	  if ('\\\\' == path.substring(0, 2)) return true; // Microsoft Azure absolute path
	};

	/**
	 * Flatten the given `arr`.
	 *
	 * @param {Array} arr
	 * @return {Array}
	 * @api private
	 */

	exports.flatten = deprecate.function(flatten,
	  'utils.flatten: use array-flatten npm module instead');

	/**
	 * Normalize the given `type`, for example "html" becomes "text/html".
	 *
	 * @param {String} type
	 * @return {Object}
	 * @api private
	 */

	exports.normalizeType = function(type){
	  return ~type.indexOf('/')
	    ? acceptParams(type)
	    : { value: mime.lookup(type), params: {} };
	};

	/**
	 * Normalize `types`, for example "html" becomes "text/html".
	 *
	 * @param {Array} types
	 * @return {Array}
	 * @api private
	 */

	exports.normalizeTypes = function(types){
	  var ret = [];

	  for (var i = 0; i < types.length; ++i) {
	    ret.push(exports.normalizeType(types[i]));
	  }

	  return ret;
	};

	/**
	 * Generate Content-Disposition header appropriate for the filename.
	 * non-ascii filenames are urlencoded and a filename* parameter is added
	 *
	 * @param {String} filename
	 * @return {String}
	 * @api private
	 */

	exports.contentDisposition = deprecate.function(contentDisposition,
	  'utils.contentDisposition: use content-disposition npm module instead');

	/**
	 * Parse accept params `str` returning an
	 * object with `.value`, `.quality` and `.params`.
	 * also includes `.originalIndex` for stable sorting
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */

	function acceptParams(str, index) {
	  var parts = str.split(/ *; */);
	  var ret = { value: parts[0], quality: 1, params: {}, originalIndex: index };

	  for (var i = 1; i < parts.length; ++i) {
	    var pms = parts[i].split(/ *= */);
	    if ('q' == pms[0]) {
	      ret.quality = parseFloat(pms[1]);
	    } else {
	      ret.params[pms[0]] = pms[1];
	    }
	  }

	  return ret;
	}

	/**
	 * Compile "etag" value to function.
	 *
	 * @param  {Boolean|String|Function} val
	 * @return {Function}
	 * @api private
	 */

	exports.compileETag = function(val) {
	  var fn;

	  if (typeof val === 'function') {
	    return val;
	  }

	  switch (val) {
	    case true:
	      fn = exports.wetag;
	      break;
	    case false:
	      break;
	    case 'strong':
	      fn = exports.etag;
	      break;
	    case 'weak':
	      fn = exports.wetag;
	      break;
	    default:
	      throw new TypeError('unknown value for etag function: ' + val);
	  }

	  return fn;
	}

	/**
	 * Compile "query parser" value to function.
	 *
	 * @param  {String|Function} val
	 * @return {Function}
	 * @api private
	 */

	exports.compileQueryParser = function compileQueryParser(val) {
	  var fn;

	  if (typeof val === 'function') {
	    return val;
	  }

	  switch (val) {
	    case true:
	      fn = querystring.parse;
	      break;
	    case false:
	      fn = newObject;
	      break;
	    case 'extended':
	      fn = parseExtendedQueryString;
	      break;
	    case 'simple':
	      fn = querystring.parse;
	      break;
	    default:
	      throw new TypeError('unknown value for query parser function: ' + val);
	  }

	  return fn;
	}

	/**
	 * Compile "proxy trust" value to function.
	 *
	 * @param  {Boolean|String|Number|Array|Function} val
	 * @return {Function}
	 * @api private
	 */

	exports.compileTrust = function(val) {
	  if (typeof val === 'function') return val;

	  if (val === true) {
	    // Support plain true/false
	    return function(){ return true };
	  }

	  if (typeof val === 'number') {
	    // Support trusting hop count
	    return function(a, i){ return i < val };
	  }

	  if (typeof val === 'string') {
	    // Support comma-separated values
	    val = val.split(/ *, */);
	  }

	  return proxyaddr.compile(val || []);
	}

	/**
	 * Set the charset in a given Content-Type string.
	 *
	 * @param {String} type
	 * @param {String} charset
	 * @return {String}
	 * @api private
	 */

	exports.setCharset = function setCharset(type, charset) {
	  if (!type || !charset) {
	    return type;
	  }

	  // parse type
	  var parsed = contentType.parse(type);

	  // set charset
	  parsed.parameters.charset = charset;

	  // format type
	  return contentType.format(parsed);
	};

	/**
	 * Parse an extended query string with qs.
	 *
	 * @return {Object}
	 * @private
	 */

	function parseExtendedQueryString(str) {
	  return qs.parse(str, {
	    allowDots: false,
	    allowPrototypes: true
	  });
	}

	/**
	 * Return new empty object.
	 *
	 * @return {Object}
	 * @api private
	 */

	function newObject() {
	  return {};
	}


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * content-disposition
	 * Copyright(c) 2014 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict'

	/**
	 * Module exports.
	 */

	module.exports = contentDisposition
	module.exports.parse = parse

	/**
	 * Module dependencies.
	 */

	var basename = __webpack_require__(33).basename

	/**
	 * RegExp to match non attr-char, *after* encodeURIComponent (i.e. not including "%")
	 */

	var encodeUriAttrCharRegExp = /[\x00-\x20"'\(\)*,\/:;<=>?@\[\\\]\{\}\x7f]/g

	/**
	 * RegExp to match percent encoding escape.
	 */

	var hexEscapeRegExp = /%[0-9A-Fa-f]{2}/
	var hexEscapeReplaceRegExp = /%([0-9A-Fa-f]{2})/g

	/**
	 * RegExp to match non-latin1 characters.
	 */

	var nonLatin1RegExp = /[^\x20-\x7e\xa0-\xff]/g

	/**
	 * RegExp to match quoted-pair in RFC 2616
	 *
	 * quoted-pair = "\" CHAR
	 * CHAR        = <any US-ASCII character (octets 0 - 127)>
	 */

	var qescRegExp = /\\([\u0000-\u007f])/g;

	/**
	 * RegExp to match chars that must be quoted-pair in RFC 2616
	 */

	var quoteRegExp = /([\\"])/g

	/**
	 * RegExp for various RFC 2616 grammar
	 *
	 * parameter     = token "=" ( token | quoted-string )
	 * token         = 1*<any CHAR except CTLs or separators>
	 * separators    = "(" | ")" | "<" | ">" | "@"
	 *               | "," | ";" | ":" | "\" | <">
	 *               | "/" | "[" | "]" | "?" | "="
	 *               | "{" | "}" | SP | HT
	 * quoted-string = ( <"> *(qdtext | quoted-pair ) <"> )
	 * qdtext        = <any TEXT except <">>
	 * quoted-pair   = "\" CHAR
	 * CHAR          = <any US-ASCII character (octets 0 - 127)>
	 * TEXT          = <any OCTET except CTLs, but including LWS>
	 * LWS           = [CRLF] 1*( SP | HT )
	 * CRLF          = CR LF
	 * CR            = <US-ASCII CR, carriage return (13)>
	 * LF            = <US-ASCII LF, linefeed (10)>
	 * SP            = <US-ASCII SP, space (32)>
	 * HT            = <US-ASCII HT, horizontal-tab (9)>
	 * CTL           = <any US-ASCII control character (octets 0 - 31) and DEL (127)>
	 * OCTET         = <any 8-bit sequence of data>
	 */

	var paramRegExp = /; *([!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) *= *("(?:[ !\x23-\x5b\x5d-\x7e\x80-\xff]|\\[\x20-\x7e])*"|[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) */g
	var textRegExp = /^[\x20-\x7e\x80-\xff]+$/
	var tokenRegExp = /^[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+$/

	/**
	 * RegExp for various RFC 5987 grammar
	 *
	 * ext-value     = charset  "'" [ language ] "'" value-chars
	 * charset       = "UTF-8" / "ISO-8859-1" / mime-charset
	 * mime-charset  = 1*mime-charsetc
	 * mime-charsetc = ALPHA / DIGIT
	 *               / "!" / "#" / "$" / "%" / "&"
	 *               / "+" / "-" / "^" / "_" / "`"
	 *               / "{" / "}" / "~"
	 * language      = ( 2*3ALPHA [ extlang ] )
	 *               / 4ALPHA
	 *               / 5*8ALPHA
	 * extlang       = *3( "-" 3ALPHA )
	 * value-chars   = *( pct-encoded / attr-char )
	 * pct-encoded   = "%" HEXDIG HEXDIG
	 * attr-char     = ALPHA / DIGIT
	 *               / "!" / "#" / "$" / "&" / "+" / "-" / "."
	 *               / "^" / "_" / "`" / "|" / "~"
	 */

	var extValueRegExp = /^([A-Za-z0-9!#$%&+\-^_`{}~]+)'(?:[A-Za-z]{2,3}(?:-[A-Za-z]{3}){0,3}|[A-Za-z]{4,8}|)'((?:%[0-9A-Fa-f]{2}|[A-Za-z0-9!#$&+\-\.^_`|~])+)$/

	/**
	 * RegExp for various RFC 6266 grammar
	 *
	 * disposition-type = "inline" | "attachment" | disp-ext-type
	 * disp-ext-type    = token
	 * disposition-parm = filename-parm | disp-ext-parm
	 * filename-parm    = "filename" "=" value
	 *                  | "filename*" "=" ext-value
	 * disp-ext-parm    = token "=" value
	 *                  | ext-token "=" ext-value
	 * ext-token        = <the characters in token, followed by "*">
	 */

	var dispositionTypeRegExp = /^([!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) *(?:$|;)/

	/**
	 * Create an attachment Content-Disposition header.
	 *
	 * @param {string} [filename]
	 * @param {object} [options]
	 * @param {string} [options.type=attachment]
	 * @param {string|boolean} [options.fallback=true]
	 * @return {string}
	 * @api public
	 */

	function contentDisposition(filename, options) {
	  var opts = options || {}

	  // get type
	  var type = opts.type || 'attachment'

	  // get parameters
	  var params = createparams(filename, opts.fallback)

	  // format into string
	  return format(new ContentDisposition(type, params))
	}

	/**
	 * Create parameters object from filename and fallback.
	 *
	 * @param {string} [filename]
	 * @param {string|boolean} [fallback=true]
	 * @return {object}
	 * @api private
	 */

	function createparams(filename, fallback) {
	  if (filename === undefined) {
	    return
	  }

	  var params = {}

	  if (typeof filename !== 'string') {
	    throw new TypeError('filename must be a string')
	  }

	  // fallback defaults to true
	  if (fallback === undefined) {
	    fallback = true
	  }

	  if (typeof fallback !== 'string' && typeof fallback !== 'boolean') {
	    throw new TypeError('fallback must be a string or boolean')
	  }

	  if (typeof fallback === 'string' && nonLatin1RegExp.test(fallback)) {
	    throw new TypeError('fallback must be ISO-8859-1 string')
	  }

	  // restrict to file base name
	  var name = basename(filename)

	  // determine if name is suitable for quoted string
	  var isQuotedString = textRegExp.test(name)

	  // generate fallback name
	  var fallbackName = typeof fallback !== 'string'
	    ? fallback && getlatin1(name)
	    : basename(fallback)
	  var hasFallback = typeof fallbackName === 'string' && fallbackName !== name

	  // set extended filename parameter
	  if (hasFallback || !isQuotedString || hexEscapeRegExp.test(name)) {
	    params['filename*'] = name
	  }

	  // set filename parameter
	  if (isQuotedString || hasFallback) {
	    params.filename = hasFallback
	      ? fallbackName
	      : name
	  }

	  return params
	}

	/**
	 * Format object to Content-Disposition header.
	 *
	 * @param {object} obj
	 * @param {string} obj.type
	 * @param {object} [obj.parameters]
	 * @return {string}
	 * @api private
	 */

	function format(obj) {
	  var parameters = obj.parameters
	  var type = obj.type

	  if (!type || typeof type !== 'string' || !tokenRegExp.test(type)) {
	    throw new TypeError('invalid type')
	  }

	  // start with normalized type
	  var string = String(type).toLowerCase()

	  // append parameters
	  if (parameters && typeof parameters === 'object') {
	    var param
	    var params = Object.keys(parameters).sort()

	    for (var i = 0; i < params.length; i++) {
	      param = params[i]

	      var val = param.substr(-1) === '*'
	        ? ustring(parameters[param])
	        : qstring(parameters[param])

	      string += '; ' + param + '=' + val
	    }
	  }

	  return string
	}

	/**
	 * Decode a RFC 6987 field value (gracefully).
	 *
	 * @param {string} str
	 * @return {string}
	 * @api private
	 */

	function decodefield(str) {
	  var match = extValueRegExp.exec(str)

	  if (!match) {
	    throw new TypeError('invalid extended field value')
	  }

	  var charset = match[1].toLowerCase()
	  var encoded = match[2]
	  var value

	  // to binary string
	  var binary = encoded.replace(hexEscapeReplaceRegExp, pdecode)

	  switch (charset) {
	    case 'iso-8859-1':
	      value = getlatin1(binary)
	      break
	    case 'utf-8':
	      value = new Buffer(binary, 'binary').toString('utf8')
	      break
	    default:
	      throw new TypeError('unsupported charset in extended field')
	  }

	  return value
	}

	/**
	 * Get ISO-8859-1 version of string.
	 *
	 * @param {string} val
	 * @return {string}
	 * @api private
	 */

	function getlatin1(val) {
	  // simple Unicode -> ISO-8859-1 transformation
	  return String(val).replace(nonLatin1RegExp, '?')
	}

	/**
	 * Parse Content-Disposition header string.
	 *
	 * @param {string} string
	 * @return {object}
	 * @api private
	 */

	function parse(string) {
	  if (!string || typeof string !== 'string') {
	    throw new TypeError('argument string is required')
	  }

	  var match = dispositionTypeRegExp.exec(string)

	  if (!match) {
	    throw new TypeError('invalid type format')
	  }

	  // normalize type
	  var index = match[0].length
	  var type = match[1].toLowerCase()

	  var key
	  var names = []
	  var params = {}
	  var value

	  // calculate index to start at
	  index = paramRegExp.lastIndex = match[0].substr(-1) === ';'
	    ? index - 1
	    : index

	  // match parameters
	  while (match = paramRegExp.exec(string)) {
	    if (match.index !== index) {
	      throw new TypeError('invalid parameter format')
	    }

	    index += match[0].length
	    key = match[1].toLowerCase()
	    value = match[2]

	    if (names.indexOf(key) !== -1) {
	      throw new TypeError('invalid duplicate parameter')
	    }

	    names.push(key)

	    if (key.indexOf('*') + 1 === key.length) {
	      // decode extended value
	      key = key.slice(0, -1)
	      value = decodefield(value)

	      // overwrite existing value
	      params[key] = value
	      continue
	    }

	    if (typeof params[key] === 'string') {
	      continue
	    }

	    if (value[0] === '"') {
	      // remove quotes and escapes
	      value = value
	        .substr(1, value.length - 2)
	        .replace(qescRegExp, '$1')
	    }

	    params[key] = value
	  }

	  if (index !== -1 && index !== string.length) {
	    throw new TypeError('invalid parameter format')
	  }

	  return new ContentDisposition(type, params)
	}

	/**
	 * Percent decode a single character.
	 *
	 * @param {string} str
	 * @param {string} hex
	 * @return {string}
	 * @api private
	 */

	function pdecode(str, hex) {
	  return String.fromCharCode(parseInt(hex, 16))
	}

	/**
	 * Percent encode a single character.
	 *
	 * @param {string} char
	 * @return {string}
	 * @api private
	 */

	function pencode(char) {
	  var hex = String(char)
	    .charCodeAt(0)
	    .toString(16)
	    .toUpperCase()
	  return hex.length === 1
	    ? '%0' + hex
	    : '%' + hex
	}

	/**
	 * Quote a string for HTTP.
	 *
	 * @param {string} val
	 * @return {string}
	 * @api private
	 */

	function qstring(val) {
	  var str = String(val)

	  return '"' + str.replace(quoteRegExp, '\\$1') + '"'
	}

	/**
	 * Encode a Unicode string for HTTP (RFC 5987).
	 *
	 * @param {string} val
	 * @return {string}
	 * @api private
	 */

	function ustring(val) {
	  var str = String(val)

	  // percent encode as UTF-8
	  var encoded = encodeURIComponent(str)
	    .replace(encodeUriAttrCharRegExp, pencode)

	  return 'UTF-8\'\'' + encoded
	}

	/**
	 * Class for parsed Content-Disposition header for v8 optimization
	 */

	function ContentDisposition(type, parameters) {
	  this.type = type
	  this.parameters = parameters
	}


/***/ },
/* 45 */
/***/ function(module, exports) {

	/*!
	 * content-type
	 * Copyright(c) 2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	/**
	 * RegExp to match *( ";" parameter ) in RFC 7231 sec 3.1.1.1
	 *
	 * parameter     = token "=" ( token / quoted-string )
	 * token         = 1*tchar
	 * tchar         = "!" / "#" / "$" / "%" / "&" / "'" / "*"
	 *               / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
	 *               / DIGIT / ALPHA
	 *               ; any VCHAR, except delimiters
	 * quoted-string = DQUOTE *( qdtext / quoted-pair ) DQUOTE
	 * qdtext        = HTAB / SP / %x21 / %x23-5B / %x5D-7E / obs-text
	 * obs-text      = %x80-FF
	 * quoted-pair   = "\" ( HTAB / SP / VCHAR / obs-text )
	 */
	var paramRegExp = /; *([!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+) */g
	var textRegExp = /^[\u000b\u0020-\u007e\u0080-\u00ff]+$/
	var tokenRegExp = /^[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+$/

	/**
	 * RegExp to match quoted-pair in RFC 7230 sec 3.2.6
	 *
	 * quoted-pair = "\" ( HTAB / SP / VCHAR / obs-text )
	 * obs-text    = %x80-FF
	 */
	var qescRegExp = /\\([\u000b\u0020-\u00ff])/g

	/**
	 * RegExp to match chars that must be quoted-pair in RFC 7230 sec 3.2.6
	 */
	var quoteRegExp = /([\\"])/g

	/**
	 * RegExp to match type in RFC 6838
	 *
	 * media-type = type "/" subtype
	 * type       = token
	 * subtype    = token
	 */
	var typeRegExp = /^[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+\/[!#$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+$/

	/**
	 * Module exports.
	 * @public
	 */

	exports.format = format
	exports.parse = parse

	/**
	 * Format object to media type.
	 *
	 * @param {object} obj
	 * @return {string}
	 * @public
	 */

	function format(obj) {
	  if (!obj || typeof obj !== 'object') {
	    throw new TypeError('argument obj is required')
	  }

	  var parameters = obj.parameters
	  var type = obj.type

	  if (!type || !typeRegExp.test(type)) {
	    throw new TypeError('invalid type')
	  }

	  var string = type

	  // append parameters
	  if (parameters && typeof parameters === 'object') {
	    var param
	    var params = Object.keys(parameters).sort()

	    for (var i = 0; i < params.length; i++) {
	      param = params[i]

	      if (!tokenRegExp.test(param)) {
	        throw new TypeError('invalid parameter name')
	      }

	      string += '; ' + param + '=' + qstring(parameters[param])
	    }
	  }

	  return string
	}

	/**
	 * Parse media type to object.
	 *
	 * @param {string|object} string
	 * @return {Object}
	 * @public
	 */

	function parse(string) {
	  if (!string) {
	    throw new TypeError('argument string is required')
	  }

	  if (typeof string === 'object') {
	    // support req/res-like objects as argument
	    string = getcontenttype(string)

	    if (typeof string !== 'string') {
	      throw new TypeError('content-type header is missing from object');
	    }
	  }

	  if (typeof string !== 'string') {
	    throw new TypeError('argument string is required to be a string')
	  }

	  var index = string.indexOf(';')
	  var type = index !== -1
	    ? string.substr(0, index).trim()
	    : string.trim()

	  if (!typeRegExp.test(type)) {
	    throw new TypeError('invalid media type')
	  }

	  var key
	  var match
	  var obj = new ContentType(type.toLowerCase())
	  var value

	  paramRegExp.lastIndex = index

	  while (match = paramRegExp.exec(string)) {
	    if (match.index !== index) {
	      throw new TypeError('invalid parameter format')
	    }

	    index += match[0].length
	    key = match[1].toLowerCase()
	    value = match[2]

	    if (value[0] === '"') {
	      // remove quotes and escapes
	      value = value
	        .substr(1, value.length - 2)
	        .replace(qescRegExp, '$1')
	    }

	    obj.parameters[key] = value
	  }

	  if (index !== -1 && index !== string.length) {
	    throw new TypeError('invalid parameter format')
	  }

	  return obj
	}

	/**
	 * Get content-type from req/res objects.
	 *
	 * @param {object}
	 * @return {Object}
	 * @private
	 */

	function getcontenttype(obj) {
	  if (typeof obj.getHeader === 'function') {
	    // res-like
	    return obj.getHeader('content-type')
	  }

	  if (typeof obj.headers === 'object') {
	    // req-like
	    return obj.headers && obj.headers['content-type']
	  }
	}

	/**
	 * Quote a string if necessary.
	 *
	 * @param {string} val
	 * @return {string}
	 * @private
	 */

	function qstring(val) {
	  var str = String(val)

	  // no need to quote tokens
	  if (tokenRegExp.test(str)) {
	    return str
	  }

	  if (str.length > 0 && !textRegExp.test(str)) {
	    throw new TypeError('invalid parameter value')
	  }

	  return '"' + str.replace(quoteRegExp, '\\$1') + '"'
	}

	/**
	 * Class to represent a content type.
	 * @private
	 */
	function ContentType(type) {
	  this.parameters = Object.create(null)
	  this.type = type
	}


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * send
	 * Copyright(c) 2012 TJ Holowaychuk
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict'

	/**
	 * Module dependencies.
	 * @private
	 */

	var createError = __webpack_require__(47)
	var debug = __webpack_require__(8)('send')
	var deprecate = __webpack_require__(27)('send')
	var destroy = __webpack_require__(51)
	var escapeHtml = __webpack_require__(15)
	  , parseRange = __webpack_require__(53)
	  , Stream = __webpack_require__(52)
	  , mime = __webpack_require__(54)
	  , fresh = __webpack_require__(56)
	  , path = __webpack_require__(33)
	  , fs = __webpack_require__(13)
	  , normalize = path.normalize
	  , join = path.join
	var etag = __webpack_require__(57)
	var EventEmitter = __webpack_require__(4).EventEmitter;
	var ms = __webpack_require__(12);
	var onFinished = __webpack_require__(17)
	var statuses = __webpack_require__(48)

	/**
	 * Variables.
	 */
	var extname = path.extname
	var maxMaxAge = 60 * 60 * 24 * 365 * 1000; // 1 year
	var resolve = path.resolve
	var sep = path.sep
	var toString = Object.prototype.toString
	var upPathRegexp = /(?:^|[\\\/])\.\.(?:[\\\/]|$)/

	/**
	 * Module exports.
	 * @public
	 */

	module.exports = send
	module.exports.mime = mime

	/**
	 * Shim EventEmitter.listenerCount for node.js < 0.10
	 */

	/* istanbul ignore next */
	var listenerCount = EventEmitter.listenerCount
	  || function(emitter, type){ return emitter.listeners(type).length; };

	/**
	 * Return a `SendStream` for `req` and `path`.
	 *
	 * @param {object} req
	 * @param {string} path
	 * @param {object} [options]
	 * @return {SendStream}
	 * @public
	 */

	function send(req, path, options) {
	  return new SendStream(req, path, options);
	}

	/**
	 * Initialize a `SendStream` with the given `path`.
	 *
	 * @param {Request} req
	 * @param {String} path
	 * @param {object} [options]
	 * @private
	 */

	function SendStream(req, path, options) {
	  var opts = options || {}

	  this.options = opts
	  this.path = path
	  this.req = req

	  this._etag = opts.etag !== undefined
	    ? Boolean(opts.etag)
	    : true

	  this._dotfiles = opts.dotfiles !== undefined
	    ? opts.dotfiles
	    : 'ignore'

	  if (this._dotfiles !== 'ignore' && this._dotfiles !== 'allow' && this._dotfiles !== 'deny') {
	    throw new TypeError('dotfiles option must be "allow", "deny", or "ignore"')
	  }

	  this._hidden = Boolean(opts.hidden)

	  if (opts.hidden !== undefined) {
	    deprecate('hidden: use dotfiles: \'' + (this._hidden ? 'allow' : 'ignore') + '\' instead')
	  }

	  // legacy support
	  if (opts.dotfiles === undefined) {
	    this._dotfiles = undefined
	  }

	  this._extensions = opts.extensions !== undefined
	    ? normalizeList(opts.extensions, 'extensions option')
	    : []

	  this._index = opts.index !== undefined
	    ? normalizeList(opts.index, 'index option')
	    : ['index.html']

	  this._lastModified = opts.lastModified !== undefined
	    ? Boolean(opts.lastModified)
	    : true

	  this._maxage = opts.maxAge || opts.maxage
	  this._maxage = typeof this._maxage === 'string'
	    ? ms(this._maxage)
	    : Number(this._maxage)
	  this._maxage = !isNaN(this._maxage)
	    ? Math.min(Math.max(0, this._maxage), maxMaxAge)
	    : 0

	  this._root = opts.root
	    ? resolve(opts.root)
	    : null

	  if (!this._root && opts.from) {
	    this.from(opts.from)
	  }
	}

	/**
	 * Inherits from `Stream.prototype`.
	 */

	SendStream.prototype.__proto__ = Stream.prototype;

	/**
	 * Enable or disable etag generation.
	 *
	 * @param {Boolean} val
	 * @return {SendStream}
	 * @api public
	 */

	SendStream.prototype.etag = deprecate.function(function etag(val) {
	  val = Boolean(val);
	  debug('etag %s', val);
	  this._etag = val;
	  return this;
	}, 'send.etag: pass etag as option');

	/**
	 * Enable or disable "hidden" (dot) files.
	 *
	 * @param {Boolean} path
	 * @return {SendStream}
	 * @api public
	 */

	SendStream.prototype.hidden = deprecate.function(function hidden(val) {
	  val = Boolean(val);
	  debug('hidden %s', val);
	  this._hidden = val;
	  this._dotfiles = undefined
	  return this;
	}, 'send.hidden: use dotfiles option');

	/**
	 * Set index `paths`, set to a falsy
	 * value to disable index support.
	 *
	 * @param {String|Boolean|Array} paths
	 * @return {SendStream}
	 * @api public
	 */

	SendStream.prototype.index = deprecate.function(function index(paths) {
	  var index = !paths ? [] : normalizeList(paths, 'paths argument');
	  debug('index %o', paths);
	  this._index = index;
	  return this;
	}, 'send.index: pass index as option');

	/**
	 * Set root `path`.
	 *
	 * @param {String} path
	 * @return {SendStream}
	 * @api public
	 */

	SendStream.prototype.root = function(path){
	  path = String(path);
	  this._root = resolve(path)
	  return this;
	};

	SendStream.prototype.from = deprecate.function(SendStream.prototype.root,
	  'send.from: pass root as option');

	SendStream.prototype.root = deprecate.function(SendStream.prototype.root,
	  'send.root: pass root as option');

	/**
	 * Set max-age to `maxAge`.
	 *
	 * @param {Number} maxAge
	 * @return {SendStream}
	 * @api public
	 */

	SendStream.prototype.maxage = deprecate.function(function maxage(maxAge) {
	  maxAge = typeof maxAge === 'string'
	    ? ms(maxAge)
	    : Number(maxAge);
	  if (isNaN(maxAge)) maxAge = 0;
	  if (Infinity == maxAge) maxAge = 60 * 60 * 24 * 365 * 1000;
	  debug('max-age %d', maxAge);
	  this._maxage = maxAge;
	  return this;
	}, 'send.maxage: pass maxAge as option');

	/**
	 * Emit error with `status`.
	 *
	 * @param {number} status
	 * @param {Error} [error]
	 * @private
	 */

	SendStream.prototype.error = function error(status, error) {
	  // emit if listeners instead of responding
	  if (listenerCount(this, 'error') !== 0) {
	    return this.emit('error', createError(error, status, {
	      expose: false
	    }))
	  }

	  var res = this.res
	  var msg = statuses[status]

	  // wipe all existing headers
	  res._headers = null

	  // send basic response
	  res.statusCode = status
	  res.setHeader('Content-Type', 'text/plain; charset=UTF-8')
	  res.setHeader('Content-Length', Buffer.byteLength(msg))
	  res.setHeader('X-Content-Type-Options', 'nosniff')
	  res.end(msg)
	}

	/**
	 * Check if the pathname ends with "/".
	 *
	 * @return {Boolean}
	 * @api private
	 */

	SendStream.prototype.hasTrailingSlash = function(){
	  return '/' == this.path[this.path.length - 1];
	};

	/**
	 * Check if this is a conditional GET request.
	 *
	 * @return {Boolean}
	 * @api private
	 */

	SendStream.prototype.isConditionalGET = function(){
	  return this.req.headers['if-none-match']
	    || this.req.headers['if-modified-since'];
	};

	/**
	 * Strip content-* header fields.
	 *
	 * @private
	 */

	SendStream.prototype.removeContentHeaderFields = function removeContentHeaderFields() {
	  var res = this.res
	  var headers = Object.keys(res._headers || {})

	  for (var i = 0; i < headers.length; i++) {
	    var header = headers[i]
	    if (header.substr(0, 8) === 'content-' && header !== 'content-location') {
	      res.removeHeader(header)
	    }
	  }
	}

	/**
	 * Respond with 304 not modified.
	 *
	 * @api private
	 */

	SendStream.prototype.notModified = function(){
	  var res = this.res;
	  debug('not modified');
	  this.removeContentHeaderFields();
	  res.statusCode = 304;
	  res.end();
	};

	/**
	 * Raise error that headers already sent.
	 *
	 * @api private
	 */

	SendStream.prototype.headersAlreadySent = function headersAlreadySent(){
	  var err = new Error('Can\'t set headers after they are sent.');
	  debug('headers already sent');
	  this.error(500, err);
	};

	/**
	 * Check if the request is cacheable, aka
	 * responded with 2xx or 304 (see RFC 2616 section 14.2{5,6}).
	 *
	 * @return {Boolean}
	 * @api private
	 */

	SendStream.prototype.isCachable = function(){
	  var res = this.res;
	  return (res.statusCode >= 200 && res.statusCode < 300) || 304 == res.statusCode;
	};

	/**
	 * Handle stat() error.
	 *
	 * @param {Error} error
	 * @private
	 */

	SendStream.prototype.onStatError = function onStatError(error) {
	  switch (error.code) {
	    case 'ENAMETOOLONG':
	    case 'ENOENT':
	    case 'ENOTDIR':
	      this.error(404, error)
	      break
	    default:
	      this.error(500, error)
	      break
	  }
	}

	/**
	 * Check if the cache is fresh.
	 *
	 * @return {Boolean}
	 * @api private
	 */

	SendStream.prototype.isFresh = function(){
	  return fresh(this.req.headers, this.res._headers);
	};

	/**
	 * Check if the range is fresh.
	 *
	 * @return {Boolean}
	 * @api private
	 */

	SendStream.prototype.isRangeFresh = function isRangeFresh(){
	  var ifRange = this.req.headers['if-range'];

	  if (!ifRange) return true;

	  return ~ifRange.indexOf('"')
	    ? ~ifRange.indexOf(this.res._headers['etag'])
	    : Date.parse(this.res._headers['last-modified']) <= Date.parse(ifRange);
	};

	/**
	 * Redirect to path.
	 *
	 * @param {string} path
	 * @private
	 */

	SendStream.prototype.redirect = function redirect(path) {
	  if (listenerCount(this, 'directory') !== 0) {
	    this.emit('directory')
	    return
	  }

	  if (this.hasTrailingSlash()) {
	    this.error(403)
	    return
	  }

	  var loc = path + '/'
	  var msg = 'Redirecting to <a href="' + escapeHtml(loc) + '">' + escapeHtml(loc) + '</a>\n'
	  var res = this.res

	  // redirect
	  res.statusCode = 301
	  res.setHeader('Content-Type', 'text/html; charset=UTF-8')
	  res.setHeader('Content-Length', Buffer.byteLength(msg))
	  res.setHeader('X-Content-Type-Options', 'nosniff')
	  res.setHeader('Location', loc)
	  res.end(msg)
	}

	/**
	 * Pipe to `res.
	 *
	 * @param {Stream} res
	 * @return {Stream} res
	 * @api public
	 */

	SendStream.prototype.pipe = function(res){
	  var self = this
	    , args = arguments
	    , root = this._root;

	  // references
	  this.res = res;

	  // decode the path
	  var path = decode(this.path)
	  if (path === -1) return this.error(400)

	  // null byte(s)
	  if (~path.indexOf('\0')) return this.error(400);

	  var parts
	  if (root !== null) {
	    // malicious path
	    if (upPathRegexp.test(normalize('.' + sep + path))) {
	      debug('malicious path "%s"', path)
	      return this.error(403)
	    }

	    // join / normalize from optional root dir
	    path = normalize(join(root, path))
	    root = normalize(root + sep)

	    // explode path parts
	    parts = path.substr(root.length).split(sep)
	  } else {
	    // ".." is malicious without "root"
	    if (upPathRegexp.test(path)) {
	      debug('malicious path "%s"', path)
	      return this.error(403)
	    }

	    // explode path parts
	    parts = normalize(path).split(sep)

	    // resolve the path
	    path = resolve(path)
	  }

	  // dotfile handling
	  if (containsDotFile(parts)) {
	    var access = this._dotfiles

	    // legacy support
	    if (access === undefined) {
	      access = parts[parts.length - 1][0] === '.'
	        ? (this._hidden ? 'allow' : 'ignore')
	        : 'allow'
	    }

	    debug('%s dotfile "%s"', access, path)
	    switch (access) {
	      case 'allow':
	        break
	      case 'deny':
	        return this.error(403)
	      case 'ignore':
	      default:
	        return this.error(404)
	    }
	  }

	  // index file support
	  if (this._index.length && this.path[this.path.length - 1] === '/') {
	    this.sendIndex(path);
	    return res;
	  }

	  this.sendFile(path);
	  return res;
	};

	/**
	 * Transfer `path`.
	 *
	 * @param {String} path
	 * @api public
	 */

	SendStream.prototype.send = function(path, stat){
	  var len = stat.size;
	  var options = this.options
	  var opts = {}
	  var res = this.res;
	  var req = this.req;
	  var ranges = req.headers.range;
	  var offset = options.start || 0;

	  if (res._header) {
	    // impossible to send now
	    return this.headersAlreadySent();
	  }

	  debug('pipe "%s"', path)

	  // set header fields
	  this.setHeader(path, stat);

	  // set content-type
	  this.type(path);

	  // conditional GET support
	  if (this.isConditionalGET()
	    && this.isCachable()
	    && this.isFresh()) {
	    return this.notModified();
	  }

	  // adjust len to start/end options
	  len = Math.max(0, len - offset);
	  if (options.end !== undefined) {
	    var bytes = options.end - offset + 1;
	    if (len > bytes) len = bytes;
	  }

	  // Range support
	  if (ranges) {
	    ranges = parseRange(len, ranges);

	    // If-Range support
	    if (!this.isRangeFresh()) {
	      debug('range stale');
	      ranges = -2;
	    }

	    // unsatisfiable
	    if (-1 == ranges) {
	      debug('range unsatisfiable');
	      res.setHeader('Content-Range', 'bytes */' + stat.size);
	      return this.error(416);
	    }

	    // valid (syntactically invalid/multiple ranges are treated as a regular response)
	    if (-2 != ranges && ranges.length === 1) {
	      debug('range %j', ranges);

	      // Content-Range
	      res.statusCode = 206;
	      res.setHeader('Content-Range', 'bytes '
	        + ranges[0].start
	        + '-'
	        + ranges[0].end
	        + '/'
	        + len);

	      offset += ranges[0].start;
	      len = ranges[0].end - ranges[0].start + 1;
	    }
	  }

	  // clone options
	  for (var prop in options) {
	    opts[prop] = options[prop]
	  }

	  // set read options
	  opts.start = offset
	  opts.end = Math.max(offset, offset + len - 1)

	  // content-length
	  res.setHeader('Content-Length', len);

	  // HEAD support
	  if ('HEAD' == req.method) return res.end();

	  this.stream(path, opts)
	};

	/**
	 * Transfer file for `path`.
	 *
	 * @param {String} path
	 * @api private
	 */
	SendStream.prototype.sendFile = function sendFile(path) {
	  var i = 0
	  var self = this

	  debug('stat "%s"', path);
	  fs.stat(path, function onstat(err, stat) {
	    if (err && err.code === 'ENOENT'
	      && !extname(path)
	      && path[path.length - 1] !== sep) {
	      // not found, check extensions
	      return next(err)
	    }
	    if (err) return self.onStatError(err)
	    if (stat.isDirectory()) return self.redirect(self.path)
	    self.emit('file', path, stat)
	    self.send(path, stat)
	  })

	  function next(err) {
	    if (self._extensions.length <= i) {
	      return err
	        ? self.onStatError(err)
	        : self.error(404)
	    }

	    var p = path + '.' + self._extensions[i++]

	    debug('stat "%s"', p)
	    fs.stat(p, function (err, stat) {
	      if (err) return next(err)
	      if (stat.isDirectory()) return next()
	      self.emit('file', p, stat)
	      self.send(p, stat)
	    })
	  }
	}

	/**
	 * Transfer index for `path`.
	 *
	 * @param {String} path
	 * @api private
	 */
	SendStream.prototype.sendIndex = function sendIndex(path){
	  var i = -1;
	  var self = this;

	  function next(err){
	    if (++i >= self._index.length) {
	      if (err) return self.onStatError(err);
	      return self.error(404);
	    }

	    var p = join(path, self._index[i]);

	    debug('stat "%s"', p);
	    fs.stat(p, function(err, stat){
	      if (err) return next(err);
	      if (stat.isDirectory()) return next();
	      self.emit('file', p, stat);
	      self.send(p, stat);
	    });
	  }

	  next();
	};

	/**
	 * Stream `path` to the response.
	 *
	 * @param {String} path
	 * @param {Object} options
	 * @api private
	 */

	SendStream.prototype.stream = function(path, options){
	  // TODO: this is all lame, refactor meeee
	  var finished = false;
	  var self = this;
	  var res = this.res;
	  var req = this.req;

	  // pipe
	  var stream = fs.createReadStream(path, options);
	  this.emit('stream', stream);
	  stream.pipe(res);

	  // response finished, done with the fd
	  onFinished(res, function onfinished(){
	    finished = true;
	    destroy(stream);
	  });

	  // error handling code-smell
	  stream.on('error', function onerror(err){
	    // request already finished
	    if (finished) return;

	    // clean up stream
	    finished = true;
	    destroy(stream);

	    // error
	    self.onStatError(err);
	  });

	  // end
	  stream.on('end', function onend(){
	    self.emit('end');
	  });
	};

	/**
	 * Set content-type based on `path`
	 * if it hasn't been explicitly set.
	 *
	 * @param {String} path
	 * @api private
	 */

	SendStream.prototype.type = function(path){
	  var res = this.res;
	  if (res.getHeader('Content-Type')) return;
	  var type = mime.lookup(path);
	  var charset = mime.charsets.lookup(type);
	  debug('content-type %s', type);
	  res.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''));
	};

	/**
	 * Set response header fields, most
	 * fields may be pre-defined.
	 *
	 * @param {String} path
	 * @param {Object} stat
	 * @api private
	 */

	SendStream.prototype.setHeader = function setHeader(path, stat){
	  var res = this.res;

	  this.emit('headers', res, path, stat);

	  if (!res.getHeader('Accept-Ranges')) res.setHeader('Accept-Ranges', 'bytes');
	  if (!res.getHeader('Cache-Control')) res.setHeader('Cache-Control', 'public, max-age=' + Math.floor(this._maxage / 1000));

	  if (this._lastModified && !res.getHeader('Last-Modified')) {
	    var modified = stat.mtime.toUTCString()
	    debug('modified %s', modified)
	    res.setHeader('Last-Modified', modified)
	  }

	  if (this._etag && !res.getHeader('ETag')) {
	    var val = etag(stat)
	    debug('etag %s', val)
	    res.setHeader('ETag', val)
	  }
	};

	/**
	 * Determine if path parts contain a dotfile.
	 *
	 * @api private
	 */

	function containsDotFile(parts) {
	  for (var i = 0; i < parts.length; i++) {
	    if (parts[i][0] === '.') {
	      return true
	    }
	  }

	  return false
	}

	/**
	 * decodeURIComponent.
	 *
	 * Allows V8 to only deoptimize this fn instead of all
	 * of send().
	 *
	 * @param {String} path
	 * @api private
	 */

	function decode(path) {
	  try {
	    return decodeURIComponent(path)
	  } catch (err) {
	    return -1
	  }
	}

	/**
	 * Normalize the index option into an array.
	 *
	 * @param {boolean|string|array} val
	 * @param {string} name
	 * @private
	 */

	function normalizeList(val, name) {
	  var list = [].concat(val || [])

	  for (var i = 0; i < list.length; i++) {
	    if (typeof list[i] !== 'string') {
	      throw new TypeError(name + ' must be array of strings or false')
	    }
	  }

	  return list
	}


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	
	var statuses = __webpack_require__(48);
	var inherits = __webpack_require__(50);

	function toIdentifier(str) {
	  return str.split(' ').map(function (token) {
	    return token.slice(0, 1).toUpperCase() + token.slice(1)
	  }).join('').replace(/[^ _0-9a-z]/gi, '')
	}

	exports = module.exports = function httpError() {
	  // so much arity going on ~_~
	  var err;
	  var msg;
	  var status = 500;
	  var props = {};
	  for (var i = 0; i < arguments.length; i++) {
	    var arg = arguments[i];
	    if (arg instanceof Error) {
	      err = arg;
	      status = err.status || err.statusCode || status;
	      continue;
	    }
	    switch (typeof arg) {
	      case 'string':
	        msg = arg;
	        break;
	      case 'number':
	        status = arg;
	        break;
	      case 'object':
	        props = arg;
	        break;
	    }
	  }

	  if (typeof status !== 'number' || !statuses[status]) {
	    status = 500
	  }

	  // constructor
	  var HttpError = exports[status]

	  if (!err) {
	    // create error
	    err = HttpError
	      ? new HttpError(msg)
	      : new Error(msg || statuses[status])
	    Error.captureStackTrace(err, httpError)
	  }

	  if (!HttpError || !(err instanceof HttpError)) {
	    // add properties to generic error
	    err.expose = status < 500
	    err.status = err.statusCode = status
	  }

	  for (var key in props) {
	    if (key !== 'status' && key !== 'statusCode') {
	      err[key] = props[key]
	    }
	  }

	  return err;
	};

	// create generic error objects
	var codes = statuses.codes.filter(function (num) {
	  return num >= 400;
	});

	codes.forEach(function (code) {
	  var name = toIdentifier(statuses[code])
	  var className = name.match(/Error$/) ? name : name + 'Error'

	  if (code >= 500) {
	    var ServerError = function ServerError(msg) {
	      var self = new Error(msg != null ? msg : statuses[code])
	      Error.captureStackTrace(self, ServerError)
	      self.__proto__ = ServerError.prototype
	      Object.defineProperty(self, 'name', {
	        enumerable: false,
	        configurable: true,
	        value: className,
	        writable: true
	      })
	      return self
	    }
	    inherits(ServerError, Error);
	    ServerError.prototype.status =
	    ServerError.prototype.statusCode = code;
	    ServerError.prototype.expose = false;
	    exports[code] =
	    exports[name] = ServerError
	    return;
	  }

	  var ClientError = function ClientError(msg) {
	    var self = new Error(msg != null ? msg : statuses[code])
	    Error.captureStackTrace(self, ClientError)
	    self.__proto__ = ClientError.prototype
	    Object.defineProperty(self, 'name', {
	      enumerable: false,
	      configurable: true,
	      value: className,
	      writable: true
	    })
	    return self
	  }
	  inherits(ClientError, Error);
	  ClientError.prototype.status =
	  ClientError.prototype.statusCode = code;
	  ClientError.prototype.expose = true;
	  exports[code] =
	  exports[name] = ClientError
	  return;
	});

	// backwards-compatibility
	exports["I'mateapot"] = exports.ImATeapot


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	
	var codes = __webpack_require__(49);

	module.exports = status;

	// [Integer...]
	status.codes = Object.keys(codes).map(function (code) {
	  code = ~~code;
	  var msg = codes[code];
	  status[code] = msg;
	  status[msg] = status[msg.toLowerCase()] = code;
	  return code;
	});

	// status codes for redirects
	status.redirect = {
	  300: true,
	  301: true,
	  302: true,
	  303: true,
	  305: true,
	  307: true,
	  308: true,
	};

	// status codes for empty bodies
	status.empty = {
	  204: true,
	  205: true,
	  304: true,
	};

	// status codes for when you should retry the request
	status.retry = {
	  502: true,
	  503: true,
	  504: true,
	};

	function status(code) {
	  if (typeof code === 'number') {
	    if (!status[code]) throw new Error('invalid status code: ' + code);
	    return code;
	  }

	  if (typeof code !== 'string') {
	    throw new TypeError('code must be a number or string');
	  }

	  // '403'
	  var n = parseInt(code, 10)
	  if (!isNaN(n)) {
	    if (!status[n]) throw new Error('invalid status code: ' + n);
	    return n;
	  }

	  n = status[code.toLowerCase()];
	  if (!n) throw new Error('invalid status message: "' + code + '"');
	  return n;
	}


/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = {
		"100": "Continue",
		"101": "Switching Protocols",
		"102": "Processing",
		"200": "OK",
		"201": "Created",
		"202": "Accepted",
		"203": "Non-Authoritative Information",
		"204": "No Content",
		"205": "Reset Content",
		"206": "Partial Content",
		"207": "Multi-Status",
		"208": "Already Reported",
		"226": "IM Used",
		"300": "Multiple Choices",
		"301": "Moved Permanently",
		"302": "Found",
		"303": "See Other",
		"304": "Not Modified",
		"305": "Use Proxy",
		"306": "(Unused)",
		"307": "Temporary Redirect",
		"308": "Permanent Redirect",
		"400": "Bad Request",
		"401": "Unauthorized",
		"402": "Payment Required",
		"403": "Forbidden",
		"404": "Not Found",
		"405": "Method Not Allowed",
		"406": "Not Acceptable",
		"407": "Proxy Authentication Required",
		"408": "Request Timeout",
		"409": "Conflict",
		"410": "Gone",
		"411": "Length Required",
		"412": "Precondition Failed",
		"413": "Payload Too Large",
		"414": "URI Too Long",
		"415": "Unsupported Media Type",
		"416": "Range Not Satisfiable",
		"417": "Expectation Failed",
		"418": "I'm a teapot",
		"422": "Unprocessable Entity",
		"423": "Locked",
		"424": "Failed Dependency",
		"425": "Unordered Collection",
		"426": "Upgrade Required",
		"428": "Precondition Required",
		"429": "Too Many Requests",
		"431": "Request Header Fields Too Large",
		"451": "Unavailable For Legal Reasons",
		"500": "Internal Server Error",
		"501": "Not Implemented",
		"502": "Bad Gateway",
		"503": "Service Unavailable",
		"504": "Gateway Timeout",
		"505": "HTTP Version Not Supported",
		"506": "Variant Also Negotiates",
		"507": "Insufficient Storage",
		"508": "Loop Detected",
		"509": "Bandwidth Limit Exceeded",
		"510": "Not Extended",
		"511": "Network Authentication Required"
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(10).inherits


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * destroy
	 * Copyright(c) 2014 Jonathan Ong
	 * MIT Licensed
	 */

	'use strict'

	/**
	 * Module dependencies.
	 * @private
	 */

	var ReadStream = __webpack_require__(13).ReadStream
	var Stream = __webpack_require__(52)

	/**
	 * Module exports.
	 * @public
	 */

	module.exports = destroy

	/**
	 * Destroy a stream.
	 *
	 * @param {object} stream
	 * @public
	 */

	function destroy(stream) {
	  if (stream instanceof ReadStream) {
	    return destroyReadStream(stream)
	  }

	  if (!(stream instanceof Stream)) {
	    return stream
	  }

	  if (typeof stream.destroy === 'function') {
	    stream.destroy()
	  }

	  return stream
	}

	/**
	 * Destroy a ReadStream.
	 *
	 * @param {object} stream
	 * @private
	 */

	function destroyReadStream(stream) {
	  stream.destroy()

	  if (typeof stream.close === 'function') {
	    // node.js core bug work-around
	    stream.on('open', onOpenClose)
	  }

	  return stream
	}

	/**
	 * On open handler to close stream.
	 * @private
	 */

	function onOpenClose() {
	  if (typeof this.fd === 'number') {
	    // actually close down the fd
	    this.close()
	  }
	}


/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = require("stream");

/***/ },
/* 53 */
/***/ function(module, exports) {

	/*!
	 * range-parser
	 * Copyright(c) 2012-2014 TJ Holowaychuk
	 * MIT Licensed
	 */

	'use strict';

	/**
	 * Module exports.
	 * @public
	 */

	module.exports = rangeParser;

	/**
	 * Parse "Range" header `str` relative to the given file `size`.
	 *
	 * @param {Number} size
	 * @param {String} str
	 * @return {Array}
	 * @public
	 */

	function rangeParser(size, str) {
	  var valid = true;
	  var i = str.indexOf('=');

	  if (-1 == i) return -2;

	  var arr = str.slice(i + 1).split(',').map(function(range){
	    var range = range.split('-')
	      , start = parseInt(range[0], 10)
	      , end = parseInt(range[1], 10);

	    // -nnn
	    if (isNaN(start)) {
	      start = size - end;
	      end = size - 1;
	    // nnn-
	    } else if (isNaN(end)) {
	      end = size - 1;
	    }

	    // limit last-byte-pos to current length
	    if (end > size - 1) end = size - 1;

	    // invalid
	    if (isNaN(start)
	      || isNaN(end)
	      || start > end
	      || start < 0) valid = false;

	    return {
	      start: start,
	      end: end
	    };
	  });

	  arr.type = str.slice(0, i);

	  return valid ? arr : -1;
	}


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var path = __webpack_require__(33);
	var fs = __webpack_require__(13);

	function Mime() {
	  // Map of extension -> mime type
	  this.types = Object.create(null);

	  // Map of mime type -> extension
	  this.extensions = Object.create(null);
	}

	/**
	 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
	 * to an array of extensions associated with the type.  The first extension is
	 * used as the default extension for the type.
	 *
	 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
	 *
	 * @param map (Object) type definitions
	 */
	Mime.prototype.define = function (map) {
	  for (var type in map) {
	    var exts = map[type];
	    for (var i = 0; i < exts.length; i++) {
	      if (process.env.DEBUG_MIME && this.types[exts]) {
	        console.warn(this._loading.replace(/.*\//, ''), 'changes "' + exts[i] + '" extension type from ' +
	          this.types[exts] + ' to ' + type);
	      }

	      this.types[exts[i]] = type;
	    }

	    // Default extension is the first one we encounter
	    if (!this.extensions[type]) {
	      this.extensions[type] = exts[0];
	    }
	  }
	};

	/**
	 * Load an Apache2-style ".types" file
	 *
	 * This may be called multiple times (it's expected).  Where files declare
	 * overlapping types/extensions, the last file wins.
	 *
	 * @param file (String) path of file to load.
	 */
	Mime.prototype.load = function(file) {
	  this._loading = file;
	  // Read file and split into lines
	  var map = {},
	      content = fs.readFileSync(file, 'ascii'),
	      lines = content.split(/[\r\n]+/);

	  lines.forEach(function(line) {
	    // Clean up whitespace/comments, and split into fields
	    var fields = line.replace(/\s*#.*|^\s*|\s*$/g, '').split(/\s+/);
	    map[fields.shift()] = fields;
	  });

	  this.define(map);

	  this._loading = null;
	};

	/**
	 * Lookup a mime type based on extension
	 */
	Mime.prototype.lookup = function(path, fallback) {
	  var ext = path.replace(/.*[\.\/\\]/, '').toLowerCase();

	  return this.types[ext] || fallback || this.default_type;
	};

	/**
	 * Return file extension associated with a mime type
	 */
	Mime.prototype.extension = function(mimeType) {
	  var type = mimeType.match(/^\s*([^;\s]*)(?:;|\s|$)/)[1].toLowerCase();
	  return this.extensions[type];
	};

	// Default instance
	var mime = new Mime();

	// Define built-in types
	mime.define(__webpack_require__(55));

	// Default type
	mime.default_type = mime.lookup('bin');

	//
	// Additional API specific to the default instance
	//

	mime.Mime = Mime;

	/**
	 * Lookup a charset based on mime type.
	 */
	mime.charsets = {
	  lookup: function(mimeType, fallback) {
	    // Assume text types are utf8
	    return (/^text\//).test(mimeType) ? 'UTF-8' : fallback;
	  }
	};

	module.exports = mime;


/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = {
		"application/andrew-inset": [
			"ez"
		],
		"application/applixware": [
			"aw"
		],
		"application/atom+xml": [
			"atom"
		],
		"application/atomcat+xml": [
			"atomcat"
		],
		"application/atomsvc+xml": [
			"atomsvc"
		],
		"application/ccxml+xml": [
			"ccxml"
		],
		"application/cdmi-capability": [
			"cdmia"
		],
		"application/cdmi-container": [
			"cdmic"
		],
		"application/cdmi-domain": [
			"cdmid"
		],
		"application/cdmi-object": [
			"cdmio"
		],
		"application/cdmi-queue": [
			"cdmiq"
		],
		"application/cu-seeme": [
			"cu"
		],
		"application/dash+xml": [
			"mdp"
		],
		"application/davmount+xml": [
			"davmount"
		],
		"application/docbook+xml": [
			"dbk"
		],
		"application/dssc+der": [
			"dssc"
		],
		"application/dssc+xml": [
			"xdssc"
		],
		"application/ecmascript": [
			"ecma"
		],
		"application/emma+xml": [
			"emma"
		],
		"application/epub+zip": [
			"epub"
		],
		"application/exi": [
			"exi"
		],
		"application/font-tdpfr": [
			"pfr"
		],
		"application/font-woff": [
			"woff"
		],
		"application/font-woff2": [
			"woff2"
		],
		"application/gml+xml": [
			"gml"
		],
		"application/gpx+xml": [
			"gpx"
		],
		"application/gxf": [
			"gxf"
		],
		"application/hyperstudio": [
			"stk"
		],
		"application/inkml+xml": [
			"ink",
			"inkml"
		],
		"application/ipfix": [
			"ipfix"
		],
		"application/java-archive": [
			"jar"
		],
		"application/java-serialized-object": [
			"ser"
		],
		"application/java-vm": [
			"class"
		],
		"application/javascript": [
			"js"
		],
		"application/json": [
			"json",
			"map"
		],
		"application/json5": [
			"json5"
		],
		"application/jsonml+json": [
			"jsonml"
		],
		"application/lost+xml": [
			"lostxml"
		],
		"application/mac-binhex40": [
			"hqx"
		],
		"application/mac-compactpro": [
			"cpt"
		],
		"application/mads+xml": [
			"mads"
		],
		"application/marc": [
			"mrc"
		],
		"application/marcxml+xml": [
			"mrcx"
		],
		"application/mathematica": [
			"ma",
			"nb",
			"mb"
		],
		"application/mathml+xml": [
			"mathml"
		],
		"application/mbox": [
			"mbox"
		],
		"application/mediaservercontrol+xml": [
			"mscml"
		],
		"application/metalink+xml": [
			"metalink"
		],
		"application/metalink4+xml": [
			"meta4"
		],
		"application/mets+xml": [
			"mets"
		],
		"application/mods+xml": [
			"mods"
		],
		"application/mp21": [
			"m21",
			"mp21"
		],
		"application/mp4": [
			"mp4s",
			"m4p"
		],
		"application/msword": [
			"doc",
			"dot"
		],
		"application/mxf": [
			"mxf"
		],
		"application/octet-stream": [
			"bin",
			"dms",
			"lrf",
			"mar",
			"so",
			"dist",
			"distz",
			"pkg",
			"bpk",
			"dump",
			"elc",
			"deploy",
			"buffer"
		],
		"application/oda": [
			"oda"
		],
		"application/oebps-package+xml": [
			"opf"
		],
		"application/ogg": [
			"ogx"
		],
		"application/omdoc+xml": [
			"omdoc"
		],
		"application/onenote": [
			"onetoc",
			"onetoc2",
			"onetmp",
			"onepkg"
		],
		"application/oxps": [
			"oxps"
		],
		"application/patch-ops-error+xml": [
			"xer"
		],
		"application/pdf": [
			"pdf"
		],
		"application/pgp-encrypted": [
			"pgp"
		],
		"application/pgp-signature": [
			"asc",
			"sig"
		],
		"application/pics-rules": [
			"prf"
		],
		"application/pkcs10": [
			"p10"
		],
		"application/pkcs7-mime": [
			"p7m",
			"p7c"
		],
		"application/pkcs7-signature": [
			"p7s"
		],
		"application/pkcs8": [
			"p8"
		],
		"application/pkix-attr-cert": [
			"ac"
		],
		"application/pkix-cert": [
			"cer"
		],
		"application/pkix-crl": [
			"crl"
		],
		"application/pkix-pkipath": [
			"pkipath"
		],
		"application/pkixcmp": [
			"pki"
		],
		"application/pls+xml": [
			"pls"
		],
		"application/postscript": [
			"ai",
			"eps",
			"ps"
		],
		"application/prs.cww": [
			"cww"
		],
		"application/pskc+xml": [
			"pskcxml"
		],
		"application/rdf+xml": [
			"rdf"
		],
		"application/reginfo+xml": [
			"rif"
		],
		"application/relax-ng-compact-syntax": [
			"rnc"
		],
		"application/resource-lists+xml": [
			"rl"
		],
		"application/resource-lists-diff+xml": [
			"rld"
		],
		"application/rls-services+xml": [
			"rs"
		],
		"application/rpki-ghostbusters": [
			"gbr"
		],
		"application/rpki-manifest": [
			"mft"
		],
		"application/rpki-roa": [
			"roa"
		],
		"application/rsd+xml": [
			"rsd"
		],
		"application/rss+xml": [
			"rss"
		],
		"application/rtf": [
			"rtf"
		],
		"application/sbml+xml": [
			"sbml"
		],
		"application/scvp-cv-request": [
			"scq"
		],
		"application/scvp-cv-response": [
			"scs"
		],
		"application/scvp-vp-request": [
			"spq"
		],
		"application/scvp-vp-response": [
			"spp"
		],
		"application/sdp": [
			"sdp"
		],
		"application/set-payment-initiation": [
			"setpay"
		],
		"application/set-registration-initiation": [
			"setreg"
		],
		"application/shf+xml": [
			"shf"
		],
		"application/smil+xml": [
			"smi",
			"smil"
		],
		"application/sparql-query": [
			"rq"
		],
		"application/sparql-results+xml": [
			"srx"
		],
		"application/srgs": [
			"gram"
		],
		"application/srgs+xml": [
			"grxml"
		],
		"application/sru+xml": [
			"sru"
		],
		"application/ssdl+xml": [
			"ssdl"
		],
		"application/ssml+xml": [
			"ssml"
		],
		"application/tei+xml": [
			"tei",
			"teicorpus"
		],
		"application/thraud+xml": [
			"tfi"
		],
		"application/timestamped-data": [
			"tsd"
		],
		"application/vnd.3gpp.pic-bw-large": [
			"plb"
		],
		"application/vnd.3gpp.pic-bw-small": [
			"psb"
		],
		"application/vnd.3gpp.pic-bw-var": [
			"pvb"
		],
		"application/vnd.3gpp2.tcap": [
			"tcap"
		],
		"application/vnd.3m.post-it-notes": [
			"pwn"
		],
		"application/vnd.accpac.simply.aso": [
			"aso"
		],
		"application/vnd.accpac.simply.imp": [
			"imp"
		],
		"application/vnd.acucobol": [
			"acu"
		],
		"application/vnd.acucorp": [
			"atc",
			"acutc"
		],
		"application/vnd.adobe.air-application-installer-package+zip": [
			"air"
		],
		"application/vnd.adobe.formscentral.fcdt": [
			"fcdt"
		],
		"application/vnd.adobe.fxp": [
			"fxp",
			"fxpl"
		],
		"application/vnd.adobe.xdp+xml": [
			"xdp"
		],
		"application/vnd.adobe.xfdf": [
			"xfdf"
		],
		"application/vnd.ahead.space": [
			"ahead"
		],
		"application/vnd.airzip.filesecure.azf": [
			"azf"
		],
		"application/vnd.airzip.filesecure.azs": [
			"azs"
		],
		"application/vnd.amazon.ebook": [
			"azw"
		],
		"application/vnd.americandynamics.acc": [
			"acc"
		],
		"application/vnd.amiga.ami": [
			"ami"
		],
		"application/vnd.android.package-archive": [
			"apk"
		],
		"application/vnd.anser-web-certificate-issue-initiation": [
			"cii"
		],
		"application/vnd.anser-web-funds-transfer-initiation": [
			"fti"
		],
		"application/vnd.antix.game-component": [
			"atx"
		],
		"application/vnd.apple.installer+xml": [
			"mpkg"
		],
		"application/vnd.apple.mpegurl": [
			"m3u8"
		],
		"application/vnd.aristanetworks.swi": [
			"swi"
		],
		"application/vnd.astraea-software.iota": [
			"iota"
		],
		"application/vnd.audiograph": [
			"aep"
		],
		"application/vnd.blueice.multipass": [
			"mpm"
		],
		"application/vnd.bmi": [
			"bmi"
		],
		"application/vnd.businessobjects": [
			"rep"
		],
		"application/vnd.chemdraw+xml": [
			"cdxml"
		],
		"application/vnd.chipnuts.karaoke-mmd": [
			"mmd"
		],
		"application/vnd.cinderella": [
			"cdy"
		],
		"application/vnd.claymore": [
			"cla"
		],
		"application/vnd.cloanto.rp9": [
			"rp9"
		],
		"application/vnd.clonk.c4group": [
			"c4g",
			"c4d",
			"c4f",
			"c4p",
			"c4u"
		],
		"application/vnd.cluetrust.cartomobile-config": [
			"c11amc"
		],
		"application/vnd.cluetrust.cartomobile-config-pkg": [
			"c11amz"
		],
		"application/vnd.commonspace": [
			"csp"
		],
		"application/vnd.contact.cmsg": [
			"cdbcmsg"
		],
		"application/vnd.cosmocaller": [
			"cmc"
		],
		"application/vnd.crick.clicker": [
			"clkx"
		],
		"application/vnd.crick.clicker.keyboard": [
			"clkk"
		],
		"application/vnd.crick.clicker.palette": [
			"clkp"
		],
		"application/vnd.crick.clicker.template": [
			"clkt"
		],
		"application/vnd.crick.clicker.wordbank": [
			"clkw"
		],
		"application/vnd.criticaltools.wbs+xml": [
			"wbs"
		],
		"application/vnd.ctc-posml": [
			"pml"
		],
		"application/vnd.cups-ppd": [
			"ppd"
		],
		"application/vnd.curl.car": [
			"car"
		],
		"application/vnd.curl.pcurl": [
			"pcurl"
		],
		"application/vnd.dart": [
			"dart"
		],
		"application/vnd.data-vision.rdz": [
			"rdz"
		],
		"application/vnd.dece.data": [
			"uvf",
			"uvvf",
			"uvd",
			"uvvd"
		],
		"application/vnd.dece.ttml+xml": [
			"uvt",
			"uvvt"
		],
		"application/vnd.dece.unspecified": [
			"uvx",
			"uvvx"
		],
		"application/vnd.dece.zip": [
			"uvz",
			"uvvz"
		],
		"application/vnd.denovo.fcselayout-link": [
			"fe_launch"
		],
		"application/vnd.dna": [
			"dna"
		],
		"application/vnd.dolby.mlp": [
			"mlp"
		],
		"application/vnd.dpgraph": [
			"dpg"
		],
		"application/vnd.dreamfactory": [
			"dfac"
		],
		"application/vnd.ds-keypoint": [
			"kpxx"
		],
		"application/vnd.dvb.ait": [
			"ait"
		],
		"application/vnd.dvb.service": [
			"svc"
		],
		"application/vnd.dynageo": [
			"geo"
		],
		"application/vnd.ecowin.chart": [
			"mag"
		],
		"application/vnd.enliven": [
			"nml"
		],
		"application/vnd.epson.esf": [
			"esf"
		],
		"application/vnd.epson.msf": [
			"msf"
		],
		"application/vnd.epson.quickanime": [
			"qam"
		],
		"application/vnd.epson.salt": [
			"slt"
		],
		"application/vnd.epson.ssf": [
			"ssf"
		],
		"application/vnd.eszigno3+xml": [
			"es3",
			"et3"
		],
		"application/vnd.ezpix-album": [
			"ez2"
		],
		"application/vnd.ezpix-package": [
			"ez3"
		],
		"application/vnd.fdf": [
			"fdf"
		],
		"application/vnd.fdsn.mseed": [
			"mseed"
		],
		"application/vnd.fdsn.seed": [
			"seed",
			"dataless"
		],
		"application/vnd.flographit": [
			"gph"
		],
		"application/vnd.fluxtime.clip": [
			"ftc"
		],
		"application/vnd.framemaker": [
			"fm",
			"frame",
			"maker",
			"book"
		],
		"application/vnd.frogans.fnc": [
			"fnc"
		],
		"application/vnd.frogans.ltf": [
			"ltf"
		],
		"application/vnd.fsc.weblaunch": [
			"fsc"
		],
		"application/vnd.fujitsu.oasys": [
			"oas"
		],
		"application/vnd.fujitsu.oasys2": [
			"oa2"
		],
		"application/vnd.fujitsu.oasys3": [
			"oa3"
		],
		"application/vnd.fujitsu.oasysgp": [
			"fg5"
		],
		"application/vnd.fujitsu.oasysprs": [
			"bh2"
		],
		"application/vnd.fujixerox.ddd": [
			"ddd"
		],
		"application/vnd.fujixerox.docuworks": [
			"xdw"
		],
		"application/vnd.fujixerox.docuworks.binder": [
			"xbd"
		],
		"application/vnd.fuzzysheet": [
			"fzs"
		],
		"application/vnd.genomatix.tuxedo": [
			"txd"
		],
		"application/vnd.geogebra.file": [
			"ggb"
		],
		"application/vnd.geogebra.tool": [
			"ggt"
		],
		"application/vnd.geometry-explorer": [
			"gex",
			"gre"
		],
		"application/vnd.geonext": [
			"gxt"
		],
		"application/vnd.geoplan": [
			"g2w"
		],
		"application/vnd.geospace": [
			"g3w"
		],
		"application/vnd.gmx": [
			"gmx"
		],
		"application/vnd.google-earth.kml+xml": [
			"kml"
		],
		"application/vnd.google-earth.kmz": [
			"kmz"
		],
		"application/vnd.grafeq": [
			"gqf",
			"gqs"
		],
		"application/vnd.groove-account": [
			"gac"
		],
		"application/vnd.groove-help": [
			"ghf"
		],
		"application/vnd.groove-identity-message": [
			"gim"
		],
		"application/vnd.groove-injector": [
			"grv"
		],
		"application/vnd.groove-tool-message": [
			"gtm"
		],
		"application/vnd.groove-tool-template": [
			"tpl"
		],
		"application/vnd.groove-vcard": [
			"vcg"
		],
		"application/vnd.hal+xml": [
			"hal"
		],
		"application/vnd.handheld-entertainment+xml": [
			"zmm"
		],
		"application/vnd.hbci": [
			"hbci"
		],
		"application/vnd.hhe.lesson-player": [
			"les"
		],
		"application/vnd.hp-hpgl": [
			"hpgl"
		],
		"application/vnd.hp-hpid": [
			"hpid"
		],
		"application/vnd.hp-hps": [
			"hps"
		],
		"application/vnd.hp-jlyt": [
			"jlt"
		],
		"application/vnd.hp-pcl": [
			"pcl"
		],
		"application/vnd.hp-pclxl": [
			"pclxl"
		],
		"application/vnd.ibm.minipay": [
			"mpy"
		],
		"application/vnd.ibm.modcap": [
			"afp",
			"listafp",
			"list3820"
		],
		"application/vnd.ibm.rights-management": [
			"irm"
		],
		"application/vnd.ibm.secure-container": [
			"sc"
		],
		"application/vnd.iccprofile": [
			"icc",
			"icm"
		],
		"application/vnd.igloader": [
			"igl"
		],
		"application/vnd.immervision-ivp": [
			"ivp"
		],
		"application/vnd.immervision-ivu": [
			"ivu"
		],
		"application/vnd.insors.igm": [
			"igm"
		],
		"application/vnd.intercon.formnet": [
			"xpw",
			"xpx"
		],
		"application/vnd.intergeo": [
			"i2g"
		],
		"application/vnd.intu.qbo": [
			"qbo"
		],
		"application/vnd.intu.qfx": [
			"qfx"
		],
		"application/vnd.ipunplugged.rcprofile": [
			"rcprofile"
		],
		"application/vnd.irepository.package+xml": [
			"irp"
		],
		"application/vnd.is-xpr": [
			"xpr"
		],
		"application/vnd.isac.fcs": [
			"fcs"
		],
		"application/vnd.jam": [
			"jam"
		],
		"application/vnd.jcp.javame.midlet-rms": [
			"rms"
		],
		"application/vnd.jisp": [
			"jisp"
		],
		"application/vnd.joost.joda-archive": [
			"joda"
		],
		"application/vnd.kahootz": [
			"ktz",
			"ktr"
		],
		"application/vnd.kde.karbon": [
			"karbon"
		],
		"application/vnd.kde.kchart": [
			"chrt"
		],
		"application/vnd.kde.kformula": [
			"kfo"
		],
		"application/vnd.kde.kivio": [
			"flw"
		],
		"application/vnd.kde.kontour": [
			"kon"
		],
		"application/vnd.kde.kpresenter": [
			"kpr",
			"kpt"
		],
		"application/vnd.kde.kspread": [
			"ksp"
		],
		"application/vnd.kde.kword": [
			"kwd",
			"kwt"
		],
		"application/vnd.kenameaapp": [
			"htke"
		],
		"application/vnd.kidspiration": [
			"kia"
		],
		"application/vnd.kinar": [
			"kne",
			"knp"
		],
		"application/vnd.koan": [
			"skp",
			"skd",
			"skt",
			"skm"
		],
		"application/vnd.kodak-descriptor": [
			"sse"
		],
		"application/vnd.las.las+xml": [
			"lasxml"
		],
		"application/vnd.llamagraphics.life-balance.desktop": [
			"lbd"
		],
		"application/vnd.llamagraphics.life-balance.exchange+xml": [
			"lbe"
		],
		"application/vnd.lotus-1-2-3": [
			"123"
		],
		"application/vnd.lotus-approach": [
			"apr"
		],
		"application/vnd.lotus-freelance": [
			"pre"
		],
		"application/vnd.lotus-notes": [
			"nsf"
		],
		"application/vnd.lotus-organizer": [
			"org"
		],
		"application/vnd.lotus-screencam": [
			"scm"
		],
		"application/vnd.lotus-wordpro": [
			"lwp"
		],
		"application/vnd.macports.portpkg": [
			"portpkg"
		],
		"application/vnd.mcd": [
			"mcd"
		],
		"application/vnd.medcalcdata": [
			"mc1"
		],
		"application/vnd.mediastation.cdkey": [
			"cdkey"
		],
		"application/vnd.mfer": [
			"mwf"
		],
		"application/vnd.mfmp": [
			"mfm"
		],
		"application/vnd.micrografx.flo": [
			"flo"
		],
		"application/vnd.micrografx.igx": [
			"igx"
		],
		"application/vnd.mif": [
			"mif"
		],
		"application/vnd.mobius.daf": [
			"daf"
		],
		"application/vnd.mobius.dis": [
			"dis"
		],
		"application/vnd.mobius.mbk": [
			"mbk"
		],
		"application/vnd.mobius.mqy": [
			"mqy"
		],
		"application/vnd.mobius.msl": [
			"msl"
		],
		"application/vnd.mobius.plc": [
			"plc"
		],
		"application/vnd.mobius.txf": [
			"txf"
		],
		"application/vnd.mophun.application": [
			"mpn"
		],
		"application/vnd.mophun.certificate": [
			"mpc"
		],
		"application/vnd.mozilla.xul+xml": [
			"xul"
		],
		"application/vnd.ms-artgalry": [
			"cil"
		],
		"application/vnd.ms-cab-compressed": [
			"cab"
		],
		"application/vnd.ms-excel": [
			"xls",
			"xlm",
			"xla",
			"xlc",
			"xlt",
			"xlw"
		],
		"application/vnd.ms-excel.addin.macroenabled.12": [
			"xlam"
		],
		"application/vnd.ms-excel.sheet.binary.macroenabled.12": [
			"xlsb"
		],
		"application/vnd.ms-excel.sheet.macroenabled.12": [
			"xlsm"
		],
		"application/vnd.ms-excel.template.macroenabled.12": [
			"xltm"
		],
		"application/vnd.ms-fontobject": [
			"eot"
		],
		"application/vnd.ms-htmlhelp": [
			"chm"
		],
		"application/vnd.ms-ims": [
			"ims"
		],
		"application/vnd.ms-lrm": [
			"lrm"
		],
		"application/vnd.ms-officetheme": [
			"thmx"
		],
		"application/vnd.ms-pki.seccat": [
			"cat"
		],
		"application/vnd.ms-pki.stl": [
			"stl"
		],
		"application/vnd.ms-powerpoint": [
			"ppt",
			"pps",
			"pot"
		],
		"application/vnd.ms-powerpoint.addin.macroenabled.12": [
			"ppam"
		],
		"application/vnd.ms-powerpoint.presentation.macroenabled.12": [
			"pptm"
		],
		"application/vnd.ms-powerpoint.slide.macroenabled.12": [
			"sldm"
		],
		"application/vnd.ms-powerpoint.slideshow.macroenabled.12": [
			"ppsm"
		],
		"application/vnd.ms-powerpoint.template.macroenabled.12": [
			"potm"
		],
		"application/vnd.ms-project": [
			"mpp",
			"mpt"
		],
		"application/vnd.ms-word.document.macroenabled.12": [
			"docm"
		],
		"application/vnd.ms-word.template.macroenabled.12": [
			"dotm"
		],
		"application/vnd.ms-works": [
			"wps",
			"wks",
			"wcm",
			"wdb"
		],
		"application/vnd.ms-wpl": [
			"wpl"
		],
		"application/vnd.ms-xpsdocument": [
			"xps"
		],
		"application/vnd.mseq": [
			"mseq"
		],
		"application/vnd.musician": [
			"mus"
		],
		"application/vnd.muvee.style": [
			"msty"
		],
		"application/vnd.mynfc": [
			"taglet"
		],
		"application/vnd.neurolanguage.nlu": [
			"nlu"
		],
		"application/vnd.nitf": [
			"ntf",
			"nitf"
		],
		"application/vnd.noblenet-directory": [
			"nnd"
		],
		"application/vnd.noblenet-sealer": [
			"nns"
		],
		"application/vnd.noblenet-web": [
			"nnw"
		],
		"application/vnd.nokia.n-gage.data": [
			"ngdat"
		],
		"application/vnd.nokia.radio-preset": [
			"rpst"
		],
		"application/vnd.nokia.radio-presets": [
			"rpss"
		],
		"application/vnd.novadigm.edm": [
			"edm"
		],
		"application/vnd.novadigm.edx": [
			"edx"
		],
		"application/vnd.novadigm.ext": [
			"ext"
		],
		"application/vnd.oasis.opendocument.chart": [
			"odc"
		],
		"application/vnd.oasis.opendocument.chart-template": [
			"otc"
		],
		"application/vnd.oasis.opendocument.database": [
			"odb"
		],
		"application/vnd.oasis.opendocument.formula": [
			"odf"
		],
		"application/vnd.oasis.opendocument.formula-template": [
			"odft"
		],
		"application/vnd.oasis.opendocument.graphics": [
			"odg"
		],
		"application/vnd.oasis.opendocument.graphics-template": [
			"otg"
		],
		"application/vnd.oasis.opendocument.image": [
			"odi"
		],
		"application/vnd.oasis.opendocument.image-template": [
			"oti"
		],
		"application/vnd.oasis.opendocument.presentation": [
			"odp"
		],
		"application/vnd.oasis.opendocument.presentation-template": [
			"otp"
		],
		"application/vnd.oasis.opendocument.spreadsheet": [
			"ods"
		],
		"application/vnd.oasis.opendocument.spreadsheet-template": [
			"ots"
		],
		"application/vnd.oasis.opendocument.text": [
			"odt"
		],
		"application/vnd.oasis.opendocument.text-master": [
			"odm"
		],
		"application/vnd.oasis.opendocument.text-template": [
			"ott"
		],
		"application/vnd.oasis.opendocument.text-web": [
			"oth"
		],
		"application/vnd.olpc-sugar": [
			"xo"
		],
		"application/vnd.oma.dd2+xml": [
			"dd2"
		],
		"application/vnd.openofficeorg.extension": [
			"oxt"
		],
		"application/vnd.openxmlformats-officedocument.presentationml.presentation": [
			"pptx"
		],
		"application/vnd.openxmlformats-officedocument.presentationml.slide": [
			"sldx"
		],
		"application/vnd.openxmlformats-officedocument.presentationml.slideshow": [
			"ppsx"
		],
		"application/vnd.openxmlformats-officedocument.presentationml.template": [
			"potx"
		],
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
			"xlsx"
		],
		"application/vnd.openxmlformats-officedocument.spreadsheetml.template": [
			"xltx"
		],
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
			"docx"
		],
		"application/vnd.openxmlformats-officedocument.wordprocessingml.template": [
			"dotx"
		],
		"application/vnd.osgeo.mapguide.package": [
			"mgp"
		],
		"application/vnd.osgi.dp": [
			"dp"
		],
		"application/vnd.osgi.subsystem": [
			"esa"
		],
		"application/vnd.palm": [
			"pdb",
			"pqa",
			"oprc"
		],
		"application/vnd.pawaafile": [
			"paw"
		],
		"application/vnd.pg.format": [
			"str"
		],
		"application/vnd.pg.osasli": [
			"ei6"
		],
		"application/vnd.picsel": [
			"efif"
		],
		"application/vnd.pmi.widget": [
			"wg"
		],
		"application/vnd.pocketlearn": [
			"plf"
		],
		"application/vnd.powerbuilder6": [
			"pbd"
		],
		"application/vnd.previewsystems.box": [
			"box"
		],
		"application/vnd.proteus.magazine": [
			"mgz"
		],
		"application/vnd.publishare-delta-tree": [
			"qps"
		],
		"application/vnd.pvi.ptid1": [
			"ptid"
		],
		"application/vnd.quark.quarkxpress": [
			"qxd",
			"qxt",
			"qwd",
			"qwt",
			"qxl",
			"qxb"
		],
		"application/vnd.realvnc.bed": [
			"bed"
		],
		"application/vnd.recordare.musicxml": [
			"mxl"
		],
		"application/vnd.recordare.musicxml+xml": [
			"musicxml"
		],
		"application/vnd.rig.cryptonote": [
			"cryptonote"
		],
		"application/vnd.rim.cod": [
			"cod"
		],
		"application/vnd.rn-realmedia": [
			"rm"
		],
		"application/vnd.rn-realmedia-vbr": [
			"rmvb"
		],
		"application/vnd.route66.link66+xml": [
			"link66"
		],
		"application/vnd.sailingtracker.track": [
			"st"
		],
		"application/vnd.seemail": [
			"see"
		],
		"application/vnd.sema": [
			"sema"
		],
		"application/vnd.semd": [
			"semd"
		],
		"application/vnd.semf": [
			"semf"
		],
		"application/vnd.shana.informed.formdata": [
			"ifm"
		],
		"application/vnd.shana.informed.formtemplate": [
			"itp"
		],
		"application/vnd.shana.informed.interchange": [
			"iif"
		],
		"application/vnd.shana.informed.package": [
			"ipk"
		],
		"application/vnd.simtech-mindmapper": [
			"twd",
			"twds"
		],
		"application/vnd.smaf": [
			"mmf"
		],
		"application/vnd.smart.teacher": [
			"teacher"
		],
		"application/vnd.solent.sdkm+xml": [
			"sdkm",
			"sdkd"
		],
		"application/vnd.spotfire.dxp": [
			"dxp"
		],
		"application/vnd.spotfire.sfs": [
			"sfs"
		],
		"application/vnd.stardivision.calc": [
			"sdc"
		],
		"application/vnd.stardivision.draw": [
			"sda"
		],
		"application/vnd.stardivision.impress": [
			"sdd"
		],
		"application/vnd.stardivision.math": [
			"smf"
		],
		"application/vnd.stardivision.writer": [
			"sdw",
			"vor"
		],
		"application/vnd.stardivision.writer-global": [
			"sgl"
		],
		"application/vnd.stepmania.package": [
			"smzip"
		],
		"application/vnd.stepmania.stepchart": [
			"sm"
		],
		"application/vnd.sun.xml.calc": [
			"sxc"
		],
		"application/vnd.sun.xml.calc.template": [
			"stc"
		],
		"application/vnd.sun.xml.draw": [
			"sxd"
		],
		"application/vnd.sun.xml.draw.template": [
			"std"
		],
		"application/vnd.sun.xml.impress": [
			"sxi"
		],
		"application/vnd.sun.xml.impress.template": [
			"sti"
		],
		"application/vnd.sun.xml.math": [
			"sxm"
		],
		"application/vnd.sun.xml.writer": [
			"sxw"
		],
		"application/vnd.sun.xml.writer.global": [
			"sxg"
		],
		"application/vnd.sun.xml.writer.template": [
			"stw"
		],
		"application/vnd.sus-calendar": [
			"sus",
			"susp"
		],
		"application/vnd.svd": [
			"svd"
		],
		"application/vnd.symbian.install": [
			"sis",
			"sisx"
		],
		"application/vnd.syncml+xml": [
			"xsm"
		],
		"application/vnd.syncml.dm+wbxml": [
			"bdm"
		],
		"application/vnd.syncml.dm+xml": [
			"xdm"
		],
		"application/vnd.tao.intent-module-archive": [
			"tao"
		],
		"application/vnd.tcpdump.pcap": [
			"pcap",
			"cap",
			"dmp"
		],
		"application/vnd.tmobile-livetv": [
			"tmo"
		],
		"application/vnd.trid.tpt": [
			"tpt"
		],
		"application/vnd.triscape.mxs": [
			"mxs"
		],
		"application/vnd.trueapp": [
			"tra"
		],
		"application/vnd.ufdl": [
			"ufd",
			"ufdl"
		],
		"application/vnd.uiq.theme": [
			"utz"
		],
		"application/vnd.umajin": [
			"umj"
		],
		"application/vnd.unity": [
			"unityweb"
		],
		"application/vnd.uoml+xml": [
			"uoml"
		],
		"application/vnd.vcx": [
			"vcx"
		],
		"application/vnd.visio": [
			"vsd",
			"vst",
			"vss",
			"vsw"
		],
		"application/vnd.visionary": [
			"vis"
		],
		"application/vnd.vsf": [
			"vsf"
		],
		"application/vnd.wap.wbxml": [
			"wbxml"
		],
		"application/vnd.wap.wmlc": [
			"wmlc"
		],
		"application/vnd.wap.wmlscriptc": [
			"wmlsc"
		],
		"application/vnd.webturbo": [
			"wtb"
		],
		"application/vnd.wolfram.player": [
			"nbp"
		],
		"application/vnd.wordperfect": [
			"wpd"
		],
		"application/vnd.wqd": [
			"wqd"
		],
		"application/vnd.wt.stf": [
			"stf"
		],
		"application/vnd.xara": [
			"xar"
		],
		"application/vnd.xfdl": [
			"xfdl"
		],
		"application/vnd.yamaha.hv-dic": [
			"hvd"
		],
		"application/vnd.yamaha.hv-script": [
			"hvs"
		],
		"application/vnd.yamaha.hv-voice": [
			"hvp"
		],
		"application/vnd.yamaha.openscoreformat": [
			"osf"
		],
		"application/vnd.yamaha.openscoreformat.osfpvg+xml": [
			"osfpvg"
		],
		"application/vnd.yamaha.smaf-audio": [
			"saf"
		],
		"application/vnd.yamaha.smaf-phrase": [
			"spf"
		],
		"application/vnd.yellowriver-custom-menu": [
			"cmp"
		],
		"application/vnd.zul": [
			"zir",
			"zirz"
		],
		"application/vnd.zzazz.deck+xml": [
			"zaz"
		],
		"application/voicexml+xml": [
			"vxml"
		],
		"application/widget": [
			"wgt"
		],
		"application/winhlp": [
			"hlp"
		],
		"application/wsdl+xml": [
			"wsdl"
		],
		"application/wspolicy+xml": [
			"wspolicy"
		],
		"application/x-7z-compressed": [
			"7z"
		],
		"application/x-abiword": [
			"abw"
		],
		"application/x-ace-compressed": [
			"ace"
		],
		"application/x-apple-diskimage": [
			"dmg"
		],
		"application/x-authorware-bin": [
			"aab",
			"x32",
			"u32",
			"vox"
		],
		"application/x-authorware-map": [
			"aam"
		],
		"application/x-authorware-seg": [
			"aas"
		],
		"application/x-bcpio": [
			"bcpio"
		],
		"application/x-bittorrent": [
			"torrent"
		],
		"application/x-blorb": [
			"blb",
			"blorb"
		],
		"application/x-bzip": [
			"bz"
		],
		"application/x-bzip2": [
			"bz2",
			"boz"
		],
		"application/x-cbr": [
			"cbr",
			"cba",
			"cbt",
			"cbz",
			"cb7"
		],
		"application/x-cdlink": [
			"vcd"
		],
		"application/x-cfs-compressed": [
			"cfs"
		],
		"application/x-chat": [
			"chat"
		],
		"application/x-chess-pgn": [
			"pgn"
		],
		"application/x-chrome-extension": [
			"crx"
		],
		"application/x-conference": [
			"nsc"
		],
		"application/x-cpio": [
			"cpio"
		],
		"application/x-csh": [
			"csh"
		],
		"application/x-debian-package": [
			"deb",
			"udeb"
		],
		"application/x-dgc-compressed": [
			"dgc"
		],
		"application/x-director": [
			"dir",
			"dcr",
			"dxr",
			"cst",
			"cct",
			"cxt",
			"w3d",
			"fgd",
			"swa"
		],
		"application/x-doom": [
			"wad"
		],
		"application/x-dtbncx+xml": [
			"ncx"
		],
		"application/x-dtbook+xml": [
			"dtb"
		],
		"application/x-dtbresource+xml": [
			"res"
		],
		"application/x-dvi": [
			"dvi"
		],
		"application/x-envoy": [
			"evy"
		],
		"application/x-eva": [
			"eva"
		],
		"application/x-font-bdf": [
			"bdf"
		],
		"application/x-font-ghostscript": [
			"gsf"
		],
		"application/x-font-linux-psf": [
			"psf"
		],
		"application/x-font-otf": [
			"otf"
		],
		"application/x-font-pcf": [
			"pcf"
		],
		"application/x-font-snf": [
			"snf"
		],
		"application/x-font-ttf": [
			"ttf",
			"ttc"
		],
		"application/x-font-type1": [
			"pfa",
			"pfb",
			"pfm",
			"afm"
		],
		"application/x-freearc": [
			"arc"
		],
		"application/x-futuresplash": [
			"spl"
		],
		"application/x-gca-compressed": [
			"gca"
		],
		"application/x-glulx": [
			"ulx"
		],
		"application/x-gnumeric": [
			"gnumeric"
		],
		"application/x-gramps-xml": [
			"gramps"
		],
		"application/x-gtar": [
			"gtar"
		],
		"application/x-hdf": [
			"hdf"
		],
		"application/x-install-instructions": [
			"install"
		],
		"application/x-iso9660-image": [
			"iso"
		],
		"application/x-java-jnlp-file": [
			"jnlp"
		],
		"application/x-latex": [
			"latex"
		],
		"application/x-lua-bytecode": [
			"luac"
		],
		"application/x-lzh-compressed": [
			"lzh",
			"lha"
		],
		"application/x-mie": [
			"mie"
		],
		"application/x-mobipocket-ebook": [
			"prc",
			"mobi"
		],
		"application/x-ms-application": [
			"application"
		],
		"application/x-ms-shortcut": [
			"lnk"
		],
		"application/x-ms-wmd": [
			"wmd"
		],
		"application/x-ms-wmz": [
			"wmz"
		],
		"application/x-ms-xbap": [
			"xbap"
		],
		"application/x-msaccess": [
			"mdb"
		],
		"application/x-msbinder": [
			"obd"
		],
		"application/x-mscardfile": [
			"crd"
		],
		"application/x-msclip": [
			"clp"
		],
		"application/x-msdownload": [
			"exe",
			"dll",
			"com",
			"bat",
			"msi"
		],
		"application/x-msmediaview": [
			"mvb",
			"m13",
			"m14"
		],
		"application/x-msmetafile": [
			"wmf",
			"wmz",
			"emf",
			"emz"
		],
		"application/x-msmoney": [
			"mny"
		],
		"application/x-mspublisher": [
			"pub"
		],
		"application/x-msschedule": [
			"scd"
		],
		"application/x-msterminal": [
			"trm"
		],
		"application/x-mswrite": [
			"wri"
		],
		"application/x-netcdf": [
			"nc",
			"cdf"
		],
		"application/x-nzb": [
			"nzb"
		],
		"application/x-pkcs12": [
			"p12",
			"pfx"
		],
		"application/x-pkcs7-certificates": [
			"p7b",
			"spc"
		],
		"application/x-pkcs7-certreqresp": [
			"p7r"
		],
		"application/x-rar-compressed": [
			"rar"
		],
		"application/x-research-info-systems": [
			"ris"
		],
		"application/x-sh": [
			"sh"
		],
		"application/x-shar": [
			"shar"
		],
		"application/x-shockwave-flash": [
			"swf"
		],
		"application/x-silverlight-app": [
			"xap"
		],
		"application/x-sql": [
			"sql"
		],
		"application/x-stuffit": [
			"sit"
		],
		"application/x-stuffitx": [
			"sitx"
		],
		"application/x-subrip": [
			"srt"
		],
		"application/x-sv4cpio": [
			"sv4cpio"
		],
		"application/x-sv4crc": [
			"sv4crc"
		],
		"application/x-t3vm-image": [
			"t3"
		],
		"application/x-tads": [
			"gam"
		],
		"application/x-tar": [
			"tar"
		],
		"application/x-tcl": [
			"tcl"
		],
		"application/x-tex": [
			"tex"
		],
		"application/x-tex-tfm": [
			"tfm"
		],
		"application/x-texinfo": [
			"texinfo",
			"texi"
		],
		"application/x-tgif": [
			"obj"
		],
		"application/x-ustar": [
			"ustar"
		],
		"application/x-wais-source": [
			"src"
		],
		"application/x-web-app-manifest+json": [
			"webapp"
		],
		"application/x-x509-ca-cert": [
			"der",
			"crt"
		],
		"application/x-xfig": [
			"fig"
		],
		"application/x-xliff+xml": [
			"xlf"
		],
		"application/x-xpinstall": [
			"xpi"
		],
		"application/x-xz": [
			"xz"
		],
		"application/x-zmachine": [
			"z1",
			"z2",
			"z3",
			"z4",
			"z5",
			"z6",
			"z7",
			"z8"
		],
		"application/xaml+xml": [
			"xaml"
		],
		"application/xcap-diff+xml": [
			"xdf"
		],
		"application/xenc+xml": [
			"xenc"
		],
		"application/xhtml+xml": [
			"xhtml",
			"xht"
		],
		"application/xml": [
			"xml",
			"xsl",
			"xsd"
		],
		"application/xml-dtd": [
			"dtd"
		],
		"application/xop+xml": [
			"xop"
		],
		"application/xproc+xml": [
			"xpl"
		],
		"application/xslt+xml": [
			"xslt"
		],
		"application/xspf+xml": [
			"xspf"
		],
		"application/xv+xml": [
			"mxml",
			"xhvml",
			"xvml",
			"xvm"
		],
		"application/yang": [
			"yang"
		],
		"application/yin+xml": [
			"yin"
		],
		"application/zip": [
			"zip"
		],
		"audio/adpcm": [
			"adp"
		],
		"audio/basic": [
			"au",
			"snd"
		],
		"audio/midi": [
			"mid",
			"midi",
			"kar",
			"rmi"
		],
		"audio/mp4": [
			"mp4a",
			"m4a"
		],
		"audio/mpeg": [
			"mpga",
			"mp2",
			"mp2a",
			"mp3",
			"m2a",
			"m3a"
		],
		"audio/ogg": [
			"oga",
			"ogg",
			"spx"
		],
		"audio/s3m": [
			"s3m"
		],
		"audio/silk": [
			"sil"
		],
		"audio/vnd.dece.audio": [
			"uva",
			"uvva"
		],
		"audio/vnd.digital-winds": [
			"eol"
		],
		"audio/vnd.dra": [
			"dra"
		],
		"audio/vnd.dts": [
			"dts"
		],
		"audio/vnd.dts.hd": [
			"dtshd"
		],
		"audio/vnd.lucent.voice": [
			"lvp"
		],
		"audio/vnd.ms-playready.media.pya": [
			"pya"
		],
		"audio/vnd.nuera.ecelp4800": [
			"ecelp4800"
		],
		"audio/vnd.nuera.ecelp7470": [
			"ecelp7470"
		],
		"audio/vnd.nuera.ecelp9600": [
			"ecelp9600"
		],
		"audio/vnd.rip": [
			"rip"
		],
		"audio/webm": [
			"weba"
		],
		"audio/x-aac": [
			"aac"
		],
		"audio/x-aiff": [
			"aif",
			"aiff",
			"aifc"
		],
		"audio/x-caf": [
			"caf"
		],
		"audio/x-flac": [
			"flac"
		],
		"audio/x-matroska": [
			"mka"
		],
		"audio/x-mpegurl": [
			"m3u"
		],
		"audio/x-ms-wax": [
			"wax"
		],
		"audio/x-ms-wma": [
			"wma"
		],
		"audio/x-pn-realaudio": [
			"ram",
			"ra"
		],
		"audio/x-pn-realaudio-plugin": [
			"rmp"
		],
		"audio/x-wav": [
			"wav"
		],
		"audio/xm": [
			"xm"
		],
		"chemical/x-cdx": [
			"cdx"
		],
		"chemical/x-cif": [
			"cif"
		],
		"chemical/x-cmdf": [
			"cmdf"
		],
		"chemical/x-cml": [
			"cml"
		],
		"chemical/x-csml": [
			"csml"
		],
		"chemical/x-xyz": [
			"xyz"
		],
		"font/opentype": [
			"otf"
		],
		"image/bmp": [
			"bmp"
		],
		"image/cgm": [
			"cgm"
		],
		"image/g3fax": [
			"g3"
		],
		"image/gif": [
			"gif"
		],
		"image/ief": [
			"ief"
		],
		"image/jpeg": [
			"jpeg",
			"jpg",
			"jpe"
		],
		"image/ktx": [
			"ktx"
		],
		"image/png": [
			"png"
		],
		"image/prs.btif": [
			"btif"
		],
		"image/sgi": [
			"sgi"
		],
		"image/svg+xml": [
			"svg",
			"svgz"
		],
		"image/tiff": [
			"tiff",
			"tif"
		],
		"image/vnd.adobe.photoshop": [
			"psd"
		],
		"image/vnd.dece.graphic": [
			"uvi",
			"uvvi",
			"uvg",
			"uvvg"
		],
		"image/vnd.djvu": [
			"djvu",
			"djv"
		],
		"image/vnd.dvb.subtitle": [
			"sub"
		],
		"image/vnd.dwg": [
			"dwg"
		],
		"image/vnd.dxf": [
			"dxf"
		],
		"image/vnd.fastbidsheet": [
			"fbs"
		],
		"image/vnd.fpx": [
			"fpx"
		],
		"image/vnd.fst": [
			"fst"
		],
		"image/vnd.fujixerox.edmics-mmr": [
			"mmr"
		],
		"image/vnd.fujixerox.edmics-rlc": [
			"rlc"
		],
		"image/vnd.ms-modi": [
			"mdi"
		],
		"image/vnd.ms-photo": [
			"wdp"
		],
		"image/vnd.net-fpx": [
			"npx"
		],
		"image/vnd.wap.wbmp": [
			"wbmp"
		],
		"image/vnd.xiff": [
			"xif"
		],
		"image/webp": [
			"webp"
		],
		"image/x-3ds": [
			"3ds"
		],
		"image/x-cmu-raster": [
			"ras"
		],
		"image/x-cmx": [
			"cmx"
		],
		"image/x-freehand": [
			"fh",
			"fhc",
			"fh4",
			"fh5",
			"fh7"
		],
		"image/x-icon": [
			"ico"
		],
		"image/x-mrsid-image": [
			"sid"
		],
		"image/x-pcx": [
			"pcx"
		],
		"image/x-pict": [
			"pic",
			"pct"
		],
		"image/x-portable-anymap": [
			"pnm"
		],
		"image/x-portable-bitmap": [
			"pbm"
		],
		"image/x-portable-graymap": [
			"pgm"
		],
		"image/x-portable-pixmap": [
			"ppm"
		],
		"image/x-rgb": [
			"rgb"
		],
		"image/x-tga": [
			"tga"
		],
		"image/x-xbitmap": [
			"xbm"
		],
		"image/x-xpixmap": [
			"xpm"
		],
		"image/x-xwindowdump": [
			"xwd"
		],
		"message/rfc822": [
			"eml",
			"mime"
		],
		"model/iges": [
			"igs",
			"iges"
		],
		"model/mesh": [
			"msh",
			"mesh",
			"silo"
		],
		"model/vnd.collada+xml": [
			"dae"
		],
		"model/vnd.dwf": [
			"dwf"
		],
		"model/vnd.gdl": [
			"gdl"
		],
		"model/vnd.gtw": [
			"gtw"
		],
		"model/vnd.mts": [
			"mts"
		],
		"model/vnd.vtu": [
			"vtu"
		],
		"model/vrml": [
			"wrl",
			"vrml"
		],
		"model/x3d+binary": [
			"x3db",
			"x3dbz"
		],
		"model/x3d+vrml": [
			"x3dv",
			"x3dvz"
		],
		"model/x3d+xml": [
			"x3d",
			"x3dz"
		],
		"text/cache-manifest": [
			"appcache",
			"manifest"
		],
		"text/calendar": [
			"ics",
			"ifb"
		],
		"text/coffeescript": [
			"coffee"
		],
		"text/css": [
			"css"
		],
		"text/csv": [
			"csv"
		],
		"text/hjson": [
			"hjson"
		],
		"text/html": [
			"html",
			"htm"
		],
		"text/jade": [
			"jade"
		],
		"text/jsx": [
			"jsx"
		],
		"text/less": [
			"less"
		],
		"text/n3": [
			"n3"
		],
		"text/plain": [
			"txt",
			"text",
			"conf",
			"def",
			"list",
			"log",
			"in",
			"ini"
		],
		"text/prs.lines.tag": [
			"dsc"
		],
		"text/richtext": [
			"rtx"
		],
		"text/sgml": [
			"sgml",
			"sgm"
		],
		"text/stylus": [
			"stylus",
			"styl"
		],
		"text/tab-separated-values": [
			"tsv"
		],
		"text/troff": [
			"t",
			"tr",
			"roff",
			"man",
			"me",
			"ms"
		],
		"text/turtle": [
			"ttl"
		],
		"text/uri-list": [
			"uri",
			"uris",
			"urls"
		],
		"text/vcard": [
			"vcard"
		],
		"text/vnd.curl": [
			"curl"
		],
		"text/vnd.curl.dcurl": [
			"dcurl"
		],
		"text/vnd.curl.mcurl": [
			"mcurl"
		],
		"text/vnd.curl.scurl": [
			"scurl"
		],
		"text/vnd.dvb.subtitle": [
			"sub"
		],
		"text/vnd.fly": [
			"fly"
		],
		"text/vnd.fmi.flexstor": [
			"flx"
		],
		"text/vnd.graphviz": [
			"gv"
		],
		"text/vnd.in3d.3dml": [
			"3dml"
		],
		"text/vnd.in3d.spot": [
			"spot"
		],
		"text/vnd.sun.j2me.app-descriptor": [
			"jad"
		],
		"text/vnd.wap.wml": [
			"wml"
		],
		"text/vnd.wap.wmlscript": [
			"wmls"
		],
		"text/vtt": [
			"vtt"
		],
		"text/x-asm": [
			"s",
			"asm"
		],
		"text/x-c": [
			"c",
			"cc",
			"cxx",
			"cpp",
			"h",
			"hh",
			"dic"
		],
		"text/x-component": [
			"htc"
		],
		"text/x-fortran": [
			"f",
			"for",
			"f77",
			"f90"
		],
		"text/x-handlebars-template": [
			"hbs"
		],
		"text/x-java-source": [
			"java"
		],
		"text/x-lua": [
			"lua"
		],
		"text/x-markdown": [
			"markdown",
			"md",
			"mkd"
		],
		"text/x-nfo": [
			"nfo"
		],
		"text/x-opml": [
			"opml"
		],
		"text/x-pascal": [
			"p",
			"pas"
		],
		"text/x-sass": [
			"sass"
		],
		"text/x-scss": [
			"scss"
		],
		"text/x-setext": [
			"etx"
		],
		"text/x-sfv": [
			"sfv"
		],
		"text/x-uuencode": [
			"uu"
		],
		"text/x-vcalendar": [
			"vcs"
		],
		"text/x-vcard": [
			"vcf"
		],
		"text/yaml": [
			"yaml",
			"yml"
		],
		"video/3gpp": [
			"3gp"
		],
		"video/3gpp2": [
			"3g2"
		],
		"video/h261": [
			"h261"
		],
		"video/h263": [
			"h263"
		],
		"video/h264": [
			"h264"
		],
		"video/jpeg": [
			"jpgv"
		],
		"video/jpm": [
			"jpm",
			"jpgm"
		],
		"video/mj2": [
			"mj2",
			"mjp2"
		],
		"video/mp2t": [
			"ts"
		],
		"video/mp4": [
			"mp4",
			"mp4v",
			"mpg4"
		],
		"video/mpeg": [
			"mpeg",
			"mpg",
			"mpe",
			"m1v",
			"m2v"
		],
		"video/ogg": [
			"ogv"
		],
		"video/quicktime": [
			"qt",
			"mov"
		],
		"video/vnd.dece.hd": [
			"uvh",
			"uvvh"
		],
		"video/vnd.dece.mobile": [
			"uvm",
			"uvvm"
		],
		"video/vnd.dece.pd": [
			"uvp",
			"uvvp"
		],
		"video/vnd.dece.sd": [
			"uvs",
			"uvvs"
		],
		"video/vnd.dece.video": [
			"uvv",
			"uvvv"
		],
		"video/vnd.dvb.file": [
			"dvb"
		],
		"video/vnd.fvt": [
			"fvt"
		],
		"video/vnd.mpegurl": [
			"mxu",
			"m4u"
		],
		"video/vnd.ms-playready.media.pyv": [
			"pyv"
		],
		"video/vnd.uvvu.mp4": [
			"uvu",
			"uvvu"
		],
		"video/vnd.vivo": [
			"viv"
		],
		"video/webm": [
			"webm"
		],
		"video/x-f4v": [
			"f4v"
		],
		"video/x-fli": [
			"fli"
		],
		"video/x-flv": [
			"flv"
		],
		"video/x-m4v": [
			"m4v"
		],
		"video/x-matroska": [
			"mkv",
			"mk3d",
			"mks"
		],
		"video/x-mng": [
			"mng"
		],
		"video/x-ms-asf": [
			"asf",
			"asx"
		],
		"video/x-ms-vob": [
			"vob"
		],
		"video/x-ms-wm": [
			"wm"
		],
		"video/x-ms-wmv": [
			"wmv"
		],
		"video/x-ms-wmx": [
			"wmx"
		],
		"video/x-ms-wvx": [
			"wvx"
		],
		"video/x-msvideo": [
			"avi"
		],
		"video/x-sgi-movie": [
			"movie"
		],
		"video/x-smv": [
			"smv"
		],
		"x-conference/x-cooltalk": [
			"ice"
		]
	};

/***/ },
/* 56 */
/***/ function(module, exports) {

	
	/**
	 * Expose `fresh()`.
	 */

	module.exports = fresh;

	/**
	 * Check freshness of `req` and `res` headers.
	 *
	 * When the cache is "fresh" __true__ is returned,
	 * otherwise __false__ is returned to indicate that
	 * the cache is now stale.
	 *
	 * @param {Object} req
	 * @param {Object} res
	 * @return {Boolean}
	 * @api public
	 */

	function fresh(req, res) {
	  // defaults
	  var etagMatches = true;
	  var notModified = true;

	  // fields
	  var modifiedSince = req['if-modified-since'];
	  var noneMatch = req['if-none-match'];
	  var lastModified = res['last-modified'];
	  var etag = res['etag'];
	  var cc = req['cache-control'];

	  // unconditional request
	  if (!modifiedSince && !noneMatch) return false;

	  // check for no-cache cache request directive
	  if (cc && cc.indexOf('no-cache') !== -1) return false;  

	  // parse if-none-match
	  if (noneMatch) noneMatch = noneMatch.split(/ *, */);

	  // if-none-match
	  if (noneMatch) {
	    etagMatches = noneMatch.some(function (match) {
	      return match === '*' || match === etag || match === 'W/' + etag;
	    });
	  }

	  // if-modified-since
	  if (modifiedSince) {
	    modifiedSince = new Date(modifiedSince);
	    lastModified = new Date(lastModified);
	    notModified = lastModified <= modifiedSince;
	  }

	  return !! (etagMatches && notModified);
	}


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * etag
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict'

	/**
	 * Module exports.
	 * @public
	 */

	module.exports = etag

	/**
	 * Module dependencies.
	 * @private
	 */

	var crypto = __webpack_require__(58)
	var Stats = __webpack_require__(13).Stats

	/**
	 * Module variables.
	 * @private
	 */

	var base64PadCharRegExp = /=+$/
	var toString = Object.prototype.toString

	/**
	 * Generate an entity tag.
	 *
	 * @param {Buffer|string} entity
	 * @return {string}
	 * @private
	 */

	function entitytag(entity) {
	  if (entity.length === 0) {
	    // fast-path empty
	    return '"0-1B2M2Y8AsgTpgAmY7PhCfg"'
	  }

	  // compute hash of entity
	  var hash = crypto
	    .createHash('md5')
	    .update(entity, 'utf8')
	    .digest('base64')
	    .replace(base64PadCharRegExp, '')

	  // compute length of entity
	  var len = typeof entity === 'string'
	    ? Buffer.byteLength(entity, 'utf8')
	    : entity.length

	  return '"' + len.toString(16) + '-' + hash + '"'
	}

	/**
	 * Create a simple ETag.
	 *
	 * @param {string|Buffer|Stats} entity
	 * @param {object} [options]
	 * @param {boolean} [options.weak]
	 * @return {String}
	 * @public
	 */

	function etag(entity, options) {
	  if (entity == null) {
	    throw new TypeError('argument entity is required')
	  }

	  // support fs.Stats object
	  var isStats = isstats(entity)
	  var weak = options && typeof options.weak === 'boolean'
	    ? options.weak
	    : isStats

	  // validate argument
	  if (!isStats && typeof entity !== 'string' && !Buffer.isBuffer(entity)) {
	    throw new TypeError('argument entity must be string, Buffer, or fs.Stats')
	  }

	  // generate entity tag
	  var tag = isStats
	    ? stattag(entity)
	    : entitytag(entity)

	  return weak
	    ? 'W/' + tag
	    : tag
	}

	/**
	 * Determine if object is a Stats object.
	 *
	 * @param {object} obj
	 * @return {boolean}
	 * @api private
	 */

	function isstats(obj) {
	  // genuine fs.Stats
	  if (typeof Stats === 'function' && obj instanceof Stats) {
	    return true
	  }

	  // quack quack
	  return obj && typeof obj === 'object'
	    && 'ctime' in obj && toString.call(obj.ctime) === '[object Date]'
	    && 'mtime' in obj && toString.call(obj.mtime) === '[object Date]'
	    && 'ino' in obj && typeof obj.ino === 'number'
	    && 'size' in obj && typeof obj.size === 'number'
	}

	/**
	 * Generate a tag for a stat.
	 *
	 * @param {object} stat
	 * @return {string}
	 * @private
	 */

	function stattag(stat) {
	  var mtime = stat.mtime.getTime().toString(16)
	  var size = stat.size.toString(16)

	  return '"' + size + '-' + mtime + '"'
	}


/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * proxy-addr
	 * Copyright(c) 2014 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict'

	/**
	 * Module exports.
	 */

	module.exports = proxyaddr;
	module.exports.all = alladdrs;
	module.exports.compile = compile;

	/**
	 * Module dependencies.
	 */

	var forwarded = __webpack_require__(60);
	var ipaddr = __webpack_require__(61);

	/**
	 * Variables.
	 */

	var digitre = /^[0-9]+$/;
	var isip = ipaddr.isValid;
	var parseip = ipaddr.parse;

	/**
	 * Pre-defined IP ranges.
	 */

	var ipranges = {
	  linklocal: ['169.254.0.0/16', 'fe80::/10'],
	  loopback: ['127.0.0.1/8', '::1/128'],
	  uniquelocal: ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16', 'fc00::/7']
	};

	/**
	 * Get all addresses in the request, optionally stopping
	 * at the first untrusted.
	 *
	 * @param {Object} request
	 * @param {Function|Array|String} [trust]
	 * @api public
	 */

	function alladdrs(req, trust) {
	  // get addresses
	  var addrs = forwarded(req);

	  if (!trust) {
	    // Return all addresses
	    return addrs;
	  }

	  if (typeof trust !== 'function') {
	    trust = compile(trust);
	  }

	  for (var i = 0; i < addrs.length - 1; i++) {
	    if (trust(addrs[i], i)) continue;

	    addrs.length = i + 1;
	  }

	  return addrs;
	}

	/**
	 * Compile argument into trust function.
	 *
	 * @param {Array|String} val
	 * @api private
	 */

	function compile(val) {
	  if (!val) {
	    throw new TypeError('argument is required');
	  }

	  var trust = typeof val === 'string'
	    ? [val]
	    : val;

	  if (!Array.isArray(trust)) {
	    throw new TypeError('unsupported trust argument');
	  }

	  for (var i = 0; i < trust.length; i++) {
	    val = trust[i];

	    if (!ipranges.hasOwnProperty(val)) {
	      continue;
	    }

	    // Splice in pre-defined range
	    val = ipranges[val];
	    trust.splice.apply(trust, [i, 1].concat(val));
	    i += val.length - 1;
	  }

	  return compileTrust(compileRangeSubnets(trust));
	}

	/**
	 * Compile `arr` elements into range subnets.
	 *
	 * @param {Array} arr
	 * @api private
	 */

	function compileRangeSubnets(arr) {
	  var rangeSubnets = new Array(arr.length);

	  for (var i = 0; i < arr.length; i++) {
	    rangeSubnets[i] = parseipNotation(arr[i]);
	  }

	  return rangeSubnets;
	}

	/**
	 * Compile range subnet array into trust function.
	 *
	 * @param {Array} rangeSubnets
	 * @api private
	 */

	function compileTrust(rangeSubnets) {
	  // Return optimized function based on length
	  var len = rangeSubnets.length;
	  return len === 0
	    ? trustNone
	    : len === 1
	    ? trustSingle(rangeSubnets[0])
	    : trustMulti(rangeSubnets);
	}

	/**
	 * Parse IP notation string into range subnet.
	 *
	 * @param {String} note
	 * @api private
	 */

	function parseipNotation(note) {
	  var ip;
	  var kind;
	  var max;
	  var pos = note.lastIndexOf('/');
	  var range;

	  ip = pos !== -1
	    ? note.substring(0, pos)
	    : note;

	  if (!isip(ip)) {
	    throw new TypeError('invalid IP address: ' + ip);
	  }

	  ip = parseip(ip);

	  kind = ip.kind();
	  max = kind === 'ipv6'
	    ? 128
	    : 32;

	  range = pos !== -1
	    ? note.substring(pos + 1, note.length)
	    : max;

	  if (typeof range !== 'number') {
	    range = digitre.test(range)
	      ? parseInt(range, 10)
	      : isip(range)
	      ? parseNetmask(range)
	      : 0;
	  }

	  if (ip.kind() === 'ipv6' && ip.isIPv4MappedAddress()) {
	    // Store as IPv4
	    ip = ip.toIPv4Address();
	    range = range <= max
	      ? range - 96
	      : range;
	  }

	  if (range <= 0 || range > max) {
	    throw new TypeError('invalid range on address: ' + note);
	  }

	  return [ip, range];
	}

	/**
	 * Parse netmask string into CIDR range.
	 *
	 * @param {String} note
	 * @api private
	 */

	function parseNetmask(netmask) {
	  var ip = parseip(netmask);
	  var parts;
	  var size;

	  switch (ip.kind()) {
	    case 'ipv4':
	      parts = ip.octets;
	      size = 8;
	      break;
	    case 'ipv6':
	      parts = ip.parts;
	      size = 16;
	      break;
	  }

	  var max = Math.pow(2, size) - 1;
	  var part;
	  var range = 0;

	  for (var i = 0; i < parts.length; i++) {
	    part = parts[i] & max;

	    if (part === max) {
	      range += size;
	      continue;
	    }

	    while (part) {
	      part = (part << 1) & max;
	      range += 1;
	    }

	    break;
	  }

	  return range;
	}

	/**
	 * Determine address of proxied request.
	 *
	 * @param {Object} request
	 * @param {Function|Array|String} trust
	 * @api public
	 */

	function proxyaddr(req, trust) {
	  if (!req) {
	    throw new TypeError('req argument is required');
	  }

	  if (!trust) {
	    throw new TypeError('trust argument is required');
	  }

	  var addrs = alladdrs(req, trust);
	  var addr = addrs[addrs.length - 1];

	  return addr;
	}

	/**
	 * Static trust function to trust nothing.
	 *
	 * @api private
	 */

	function trustNone() {
	  return false;
	}

	/**
	 * Compile trust function for multiple subnets.
	 *
	 * @param {Array} subnets
	 * @api private
	 */

	function trustMulti(subnets) {
	  return function trust(addr) {
	    if (!isip(addr)) return false;

	    var ip = parseip(addr);
	    var ipv4;
	    var kind = ip.kind();
	    var subnet;
	    var subnetip;
	    var subnetkind;
	    var subnetrange;
	    var trusted;

	    for (var i = 0; i < subnets.length; i++) {
	      subnet = subnets[i];
	      subnetip = subnet[0];
	      subnetkind = subnetip.kind();
	      subnetrange = subnet[1];
	      trusted = ip;

	      if (kind !== subnetkind) {
	        if (kind !== 'ipv6' || subnetkind !== 'ipv4' || !ip.isIPv4MappedAddress()) {
	          continue;
	        }

	        // Store addr as IPv4
	        ipv4 = ipv4 || ip.toIPv4Address();
	        trusted = ipv4;
	      }

	      if (trusted.match(subnetip, subnetrange)) return true;
	    }

	    return false;
	  };
	}

	/**
	 * Compile trust function for single subnet.
	 *
	 * @param {Object} subnet
	 * @api private
	 */

	function trustSingle(subnet) {
	  var subnetip = subnet[0];
	  var subnetkind = subnetip.kind();
	  var subnetisipv4 = subnetkind === 'ipv4';
	  var subnetrange = subnet[1];

	  return function trust(addr) {
	    if (!isip(addr)) return false;

	    var ip = parseip(addr);
	    var kind = ip.kind();

	    return kind === subnetkind
	      ? ip.match(subnetip, subnetrange)
	      : subnetisipv4 && kind === 'ipv6' && ip.isIPv4MappedAddress()
	      ? ip.toIPv4Address().match(subnetip, subnetrange)
	      : false;
	  };
	}


/***/ },
/* 60 */
/***/ function(module, exports) {

	/*!
	 * forwarded
	 * Copyright(c) 2014 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	/**
	 * Module exports.
	 */

	module.exports = forwarded

	/**
	 * Get all addresses in the request, using the `X-Forwarded-For` header.
	 *
	 * @param {Object} req
	 * @api public
	 */

	function forwarded(req) {
	  if (!req) {
	    throw new TypeError('argument req is required')
	  }

	  // simple header parsing
	  var proxyAddrs = (req.headers['x-forwarded-for'] || '')
	    .split(/ *, */)
	    .filter(Boolean)
	    .reverse()
	  var socketAddr = req.connection.remoteAddress
	  var addrs = [socketAddr].concat(proxyAddrs)

	  // return all addresses
	  return addrs
	}


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {(function() {
	  var expandIPv6, ipaddr, ipv4Part, ipv4Regexes, ipv6Part, ipv6Regexes, matchCIDR, root;

	  ipaddr = {};

	  root = this;

	  if ((typeof module !== "undefined" && module !== null) && module.exports) {
	    module.exports = ipaddr;
	  } else {
	    root['ipaddr'] = ipaddr;
	  }

	  matchCIDR = function(first, second, partSize, cidrBits) {
	    var part, shift;
	    if (first.length !== second.length) {
	      throw new Error("ipaddr: cannot match CIDR for objects with different lengths");
	    }
	    part = 0;
	    while (cidrBits > 0) {
	      shift = partSize - cidrBits;
	      if (shift < 0) {
	        shift = 0;
	      }
	      if (first[part] >> shift !== second[part] >> shift) {
	        return false;
	      }
	      cidrBits -= partSize;
	      part += 1;
	    }
	    return true;
	  };

	  ipaddr.subnetMatch = function(address, rangeList, defaultName) {
	    var rangeName, rangeSubnets, subnet, _i, _len;
	    if (defaultName == null) {
	      defaultName = 'unicast';
	    }
	    for (rangeName in rangeList) {
	      rangeSubnets = rangeList[rangeName];
	      if (rangeSubnets[0] && !(rangeSubnets[0] instanceof Array)) {
	        rangeSubnets = [rangeSubnets];
	      }
	      for (_i = 0, _len = rangeSubnets.length; _i < _len; _i++) {
	        subnet = rangeSubnets[_i];
	        if (address.match.apply(address, subnet)) {
	          return rangeName;
	        }
	      }
	    }
	    return defaultName;
	  };

	  ipaddr.IPv4 = (function() {
	    function IPv4(octets) {
	      var octet, _i, _len;
	      if (octets.length !== 4) {
	        throw new Error("ipaddr: ipv4 octet count should be 4");
	      }
	      for (_i = 0, _len = octets.length; _i < _len; _i++) {
	        octet = octets[_i];
	        if (!((0 <= octet && octet <= 255))) {
	          throw new Error("ipaddr: ipv4 octet is a byte");
	        }
	      }
	      this.octets = octets;
	    }

	    IPv4.prototype.kind = function() {
	      return 'ipv4';
	    };

	    IPv4.prototype.toString = function() {
	      return this.octets.join(".");
	    };

	    IPv4.prototype.toByteArray = function() {
	      return this.octets.slice(0);
	    };

	    IPv4.prototype.match = function(other, cidrRange) {
	      var _ref;
	      if (cidrRange === void 0) {
	        _ref = other, other = _ref[0], cidrRange = _ref[1];
	      }
	      if (other.kind() !== 'ipv4') {
	        throw new Error("ipaddr: cannot match ipv4 address with non-ipv4 one");
	      }
	      return matchCIDR(this.octets, other.octets, 8, cidrRange);
	    };

	    IPv4.prototype.SpecialRanges = {
	      unspecified: [[new IPv4([0, 0, 0, 0]), 8]],
	      broadcast: [[new IPv4([255, 255, 255, 255]), 32]],
	      multicast: [[new IPv4([224, 0, 0, 0]), 4]],
	      linkLocal: [[new IPv4([169, 254, 0, 0]), 16]],
	      loopback: [[new IPv4([127, 0, 0, 0]), 8]],
	      "private": [[new IPv4([10, 0, 0, 0]), 8], [new IPv4([172, 16, 0, 0]), 12], [new IPv4([192, 168, 0, 0]), 16]],
	      reserved: [[new IPv4([192, 0, 0, 0]), 24], [new IPv4([192, 0, 2, 0]), 24], [new IPv4([192, 88, 99, 0]), 24], [new IPv4([198, 51, 100, 0]), 24], [new IPv4([203, 0, 113, 0]), 24], [new IPv4([240, 0, 0, 0]), 4]]
	    };

	    IPv4.prototype.range = function() {
	      return ipaddr.subnetMatch(this, this.SpecialRanges);
	    };

	    IPv4.prototype.toIPv4MappedAddress = function() {
	      return ipaddr.IPv6.parse("::ffff:" + (this.toString()));
	    };

	    return IPv4;

	  })();

	  ipv4Part = "(0?\\d+|0x[a-f0-9]+)";

	  ipv4Regexes = {
	    fourOctet: new RegExp("^" + ipv4Part + "\\." + ipv4Part + "\\." + ipv4Part + "\\." + ipv4Part + "$", 'i'),
	    longValue: new RegExp("^" + ipv4Part + "$", 'i')
	  };

	  ipaddr.IPv4.parser = function(string) {
	    var match, parseIntAuto, part, shift, value;
	    parseIntAuto = function(string) {
	      if (string[0] === "0" && string[1] !== "x") {
	        return parseInt(string, 8);
	      } else {
	        return parseInt(string);
	      }
	    };
	    if (match = string.match(ipv4Regexes.fourOctet)) {
	      return (function() {
	        var _i, _len, _ref, _results;
	        _ref = match.slice(1, 6);
	        _results = [];
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	          part = _ref[_i];
	          _results.push(parseIntAuto(part));
	        }
	        return _results;
	      })();
	    } else if (match = string.match(ipv4Regexes.longValue)) {
	      value = parseIntAuto(match[1]);
	      if (value > 0xffffffff || value < 0) {
	        throw new Error("ipaddr: address outside defined range");
	      }
	      return ((function() {
	        var _i, _results;
	        _results = [];
	        for (shift = _i = 0; _i <= 24; shift = _i += 8) {
	          _results.push((value >> shift) & 0xff);
	        }
	        return _results;
	      })()).reverse();
	    } else {
	      return null;
	    }
	  };

	  ipaddr.IPv6 = (function() {
	    function IPv6(parts) {
	      var part, _i, _len;
	      if (parts.length !== 8) {
	        throw new Error("ipaddr: ipv6 part count should be 8");
	      }
	      for (_i = 0, _len = parts.length; _i < _len; _i++) {
	        part = parts[_i];
	        if (!((0 <= part && part <= 0xffff))) {
	          throw new Error("ipaddr: ipv6 part should fit to two octets");
	        }
	      }
	      this.parts = parts;
	    }

	    IPv6.prototype.kind = function() {
	      return 'ipv6';
	    };

	    IPv6.prototype.toString = function() {
	      var compactStringParts, part, pushPart, state, stringParts, _i, _len;
	      stringParts = (function() {
	        var _i, _len, _ref, _results;
	        _ref = this.parts;
	        _results = [];
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	          part = _ref[_i];
	          _results.push(part.toString(16));
	        }
	        return _results;
	      }).call(this);
	      compactStringParts = [];
	      pushPart = function(part) {
	        return compactStringParts.push(part);
	      };
	      state = 0;
	      for (_i = 0, _len = stringParts.length; _i < _len; _i++) {
	        part = stringParts[_i];
	        switch (state) {
	          case 0:
	            if (part === '0') {
	              pushPart('');
	            } else {
	              pushPart(part);
	            }
	            state = 1;
	            break;
	          case 1:
	            if (part === '0') {
	              state = 2;
	            } else {
	              pushPart(part);
	            }
	            break;
	          case 2:
	            if (part !== '0') {
	              pushPart('');
	              pushPart(part);
	              state = 3;
	            }
	            break;
	          case 3:
	            pushPart(part);
	        }
	      }
	      if (state === 2) {
	        pushPart('');
	        pushPart('');
	      }
	      return compactStringParts.join(":");
	    };

	    IPv6.prototype.toByteArray = function() {
	      var bytes, part, _i, _len, _ref;
	      bytes = [];
	      _ref = this.parts;
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        part = _ref[_i];
	        bytes.push(part >> 8);
	        bytes.push(part & 0xff);
	      }
	      return bytes;
	    };

	    IPv6.prototype.toNormalizedString = function() {
	      var part;
	      return ((function() {
	        var _i, _len, _ref, _results;
	        _ref = this.parts;
	        _results = [];
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	          part = _ref[_i];
	          _results.push(part.toString(16));
	        }
	        return _results;
	      }).call(this)).join(":");
	    };

	    IPv6.prototype.match = function(other, cidrRange) {
	      var _ref;
	      if (cidrRange === void 0) {
	        _ref = other, other = _ref[0], cidrRange = _ref[1];
	      }
	      if (other.kind() !== 'ipv6') {
	        throw new Error("ipaddr: cannot match ipv6 address with non-ipv6 one");
	      }
	      return matchCIDR(this.parts, other.parts, 16, cidrRange);
	    };

	    IPv6.prototype.SpecialRanges = {
	      unspecified: [new IPv6([0, 0, 0, 0, 0, 0, 0, 0]), 128],
	      linkLocal: [new IPv6([0xfe80, 0, 0, 0, 0, 0, 0, 0]), 10],
	      multicast: [new IPv6([0xff00, 0, 0, 0, 0, 0, 0, 0]), 8],
	      loopback: [new IPv6([0, 0, 0, 0, 0, 0, 0, 1]), 128],
	      uniqueLocal: [new IPv6([0xfc00, 0, 0, 0, 0, 0, 0, 0]), 7],
	      ipv4Mapped: [new IPv6([0, 0, 0, 0, 0, 0xffff, 0, 0]), 96],
	      rfc6145: [new IPv6([0, 0, 0, 0, 0xffff, 0, 0, 0]), 96],
	      rfc6052: [new IPv6([0x64, 0xff9b, 0, 0, 0, 0, 0, 0]), 96],
	      '6to4': [new IPv6([0x2002, 0, 0, 0, 0, 0, 0, 0]), 16],
	      teredo: [new IPv6([0x2001, 0, 0, 0, 0, 0, 0, 0]), 32],
	      reserved: [[new IPv6([0x2001, 0xdb8, 0, 0, 0, 0, 0, 0]), 32]]
	    };

	    IPv6.prototype.range = function() {
	      return ipaddr.subnetMatch(this, this.SpecialRanges);
	    };

	    IPv6.prototype.isIPv4MappedAddress = function() {
	      return this.range() === 'ipv4Mapped';
	    };

	    IPv6.prototype.toIPv4Address = function() {
	      var high, low, _ref;
	      if (!this.isIPv4MappedAddress()) {
	        throw new Error("ipaddr: trying to convert a generic ipv6 address to ipv4");
	      }
	      _ref = this.parts.slice(-2), high = _ref[0], low = _ref[1];
	      return new ipaddr.IPv4([high >> 8, high & 0xff, low >> 8, low & 0xff]);
	    };

	    return IPv6;

	  })();

	  ipv6Part = "(?:[0-9a-f]+::?)+";

	  ipv6Regexes = {
	    "native": new RegExp("^(::)?(" + ipv6Part + ")?([0-9a-f]+)?(::)?$", 'i'),
	    transitional: new RegExp(("^((?:" + ipv6Part + ")|(?:::)(?:" + ipv6Part + ")?)") + ("" + ipv4Part + "\\." + ipv4Part + "\\." + ipv4Part + "\\." + ipv4Part + "$"), 'i')
	  };

	  expandIPv6 = function(string, parts) {
	    var colonCount, lastColon, part, replacement, replacementCount;
	    if (string.indexOf('::') !== string.lastIndexOf('::')) {
	      return null;
	    }
	    colonCount = 0;
	    lastColon = -1;
	    while ((lastColon = string.indexOf(':', lastColon + 1)) >= 0) {
	      colonCount++;
	    }
	    if (string.substr(0, 2) === '::') {
	      colonCount--;
	    }
	    if (string.substr(-2, 2) === '::') {
	      colonCount--;
	    }
	    if (colonCount > parts) {
	      return null;
	    }
	    replacementCount = parts - colonCount;
	    replacement = ':';
	    while (replacementCount--) {
	      replacement += '0:';
	    }
	    string = string.replace('::', replacement);
	    if (string[0] === ':') {
	      string = string.slice(1);
	    }
	    if (string[string.length - 1] === ':') {
	      string = string.slice(0, -1);
	    }
	    return (function() {
	      var _i, _len, _ref, _results;
	      _ref = string.split(":");
	      _results = [];
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        part = _ref[_i];
	        _results.push(parseInt(part, 16));
	      }
	      return _results;
	    })();
	  };

	  ipaddr.IPv6.parser = function(string) {
	    var match, parts;
	    if (string.match(ipv6Regexes['native'])) {
	      return expandIPv6(string, 8);
	    } else if (match = string.match(ipv6Regexes['transitional'])) {
	      parts = expandIPv6(match[1].slice(0, -1), 6);
	      if (parts) {
	        parts.push(parseInt(match[2]) << 8 | parseInt(match[3]));
	        parts.push(parseInt(match[4]) << 8 | parseInt(match[5]));
	        return parts;
	      }
	    }
	    return null;
	  };

	  ipaddr.IPv4.isIPv4 = ipaddr.IPv6.isIPv6 = function(string) {
	    return this.parser(string) !== null;
	  };

	  ipaddr.IPv4.isValid = function(string) {
	    var e;
	    try {
	      new this(this.parser(string));
	      return true;
	    } catch (_error) {
	      e = _error;
	      return false;
	    }
	  };

	  ipaddr.IPv6.isValid = function(string) {
	    var e;
	    if (typeof string === "string" && string.indexOf(":") === -1) {
	      return false;
	    }
	    try {
	      new this(this.parser(string));
	      return true;
	    } catch (_error) {
	      e = _error;
	      return false;
	    }
	  };

	  ipaddr.IPv4.parse = ipaddr.IPv6.parse = function(string) {
	    var parts;
	    parts = this.parser(string);
	    if (parts === null) {
	      throw new Error("ipaddr: string is not formatted like ip address");
	    }
	    return new this(parts);
	  };

	  ipaddr.IPv4.parseCIDR = function(string) {
	    var maskLength, match;
	    if (match = string.match(/^(.+)\/(\d+)$/)) {
	      maskLength = parseInt(match[2]);
	      if (maskLength >= 0 && maskLength <= 32) {
	        return [this.parse(match[1]), maskLength];
	      }
	    }
	    throw new Error("ipaddr: string is not formatted like an IPv4 CIDR range");
	  };

	  ipaddr.IPv6.parseCIDR = function(string) {
	    var maskLength, match;
	    if (match = string.match(/^(.+)\/(\d+)$/)) {
	      maskLength = parseInt(match[2]);
	      if (maskLength >= 0 && maskLength <= 128) {
	        return [this.parse(match[1]), maskLength];
	      }
	    }
	    throw new Error("ipaddr: string is not formatted like an IPv6 CIDR range");
	  };

	  ipaddr.isValid = function(string) {
	    return ipaddr.IPv6.isValid(string) || ipaddr.IPv4.isValid(string);
	  };

	  ipaddr.parse = function(string) {
	    if (ipaddr.IPv6.isValid(string)) {
	      return ipaddr.IPv6.parse(string);
	    } else if (ipaddr.IPv4.isValid(string)) {
	      return ipaddr.IPv4.parse(string);
	    } else {
	      throw new Error("ipaddr: the address has neither IPv6 nor IPv4 format");
	    }
	  };

	  ipaddr.parseCIDR = function(string) {
	    var e;
	    try {
	      return ipaddr.IPv6.parseCIDR(string);
	    } catch (_error) {
	      e = _error;
	      try {
	        return ipaddr.IPv4.parseCIDR(string);
	      } catch (_error) {
	        e = _error;
	        throw new Error("ipaddr: the address has neither IPv6 nor IPv4 CIDR format");
	      }
	    }
	  };

	  ipaddr.process = function(string) {
	    var addr;
	    addr = this.parse(string);
	    if (addr.kind() === 'ipv6' && addr.isIPv4MappedAddress()) {
	      return addr.toIPv4Address();
	    } else {
	      return addr;
	    }
	  };

	}).call(this);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(62)(module)))

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = require("querystring");

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./application": 6,
		"./application.js": 6,
		"./express": 3,
		"./express.js": 3,
		"./middleware/init": 36,
		"./middleware/init.js": 36,
		"./middleware/query": 37,
		"./middleware/query.js": 37,
		"./request": 65,
		"./request.js": 65,
		"./response": 77,
		"./response.js": 77,
		"./router/index": 20,
		"./router/index.js": 20,
		"./router/layer": 23,
		"./router/layer.js": 23,
		"./router/route": 21,
		"./router/route.js": 21,
		"./utils": 43,
		"./utils.js": 43,
		"./view": 42,
		"./view.js": 42
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 64;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * express
	 * Copyright(c) 2009-2013 TJ Holowaychuk
	 * Copyright(c) 2013 Roman Shtylman
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict';

	/**
	 * Module dependencies.
	 * @private
	 */

	var accepts = __webpack_require__(66);
	var deprecate = __webpack_require__(27)('express');
	var isIP = __webpack_require__(14).isIP;
	var typeis = __webpack_require__(75);
	var http = __webpack_require__(16);
	var fresh = __webpack_require__(56);
	var parseRange = __webpack_require__(53);
	var parse = __webpack_require__(34);
	var proxyaddr = __webpack_require__(59);

	/**
	 * Request prototype.
	 */

	var req = exports = module.exports = {
	  __proto__: http.IncomingMessage.prototype
	};

	/**
	 * Return request header.
	 *
	 * The `Referrer` header field is special-cased,
	 * both `Referrer` and `Referer` are interchangeable.
	 *
	 * Examples:
	 *
	 *     req.get('Content-Type');
	 *     // => "text/plain"
	 *
	 *     req.get('content-type');
	 *     // => "text/plain"
	 *
	 *     req.get('Something');
	 *     // => undefined
	 *
	 * Aliased as `req.header()`.
	 *
	 * @param {String} name
	 * @return {String}
	 * @public
	 */

	req.get =
	req.header = function header(name) {
	  var lc = name.toLowerCase();

	  switch (lc) {
	    case 'referer':
	    case 'referrer':
	      return this.headers.referrer
	        || this.headers.referer;
	    default:
	      return this.headers[lc];
	  }
	};

	/**
	 * To do: update docs.
	 *
	 * Check if the given `type(s)` is acceptable, returning
	 * the best match when true, otherwise `undefined`, in which
	 * case you should respond with 406 "Not Acceptable".
	 *
	 * The `type` value may be a single MIME type string
	 * such as "application/json", an extension name
	 * such as "json", a comma-delimited list such as "json, html, text/plain",
	 * an argument list such as `"json", "html", "text/plain"`,
	 * or an array `["json", "html", "text/plain"]`. When a list
	 * or array is given, the _best_ match, if any is returned.
	 *
	 * Examples:
	 *
	 *     // Accept: text/html
	 *     req.accepts('html');
	 *     // => "html"
	 *
	 *     // Accept: text/*, application/json
	 *     req.accepts('html');
	 *     // => "html"
	 *     req.accepts('text/html');
	 *     // => "text/html"
	 *     req.accepts('json, text');
	 *     // => "json"
	 *     req.accepts('application/json');
	 *     // => "application/json"
	 *
	 *     // Accept: text/*, application/json
	 *     req.accepts('image/png');
	 *     req.accepts('png');
	 *     // => undefined
	 *
	 *     // Accept: text/*;q=.5, application/json
	 *     req.accepts(['html', 'json']);
	 *     req.accepts('html', 'json');
	 *     req.accepts('html, json');
	 *     // => "json"
	 *
	 * @param {String|Array} type(s)
	 * @return {String|Array|Boolean}
	 * @public
	 */

	req.accepts = function(){
	  var accept = accepts(this);
	  return accept.types.apply(accept, arguments);
	};

	/**
	 * Check if the given `encoding`s are accepted.
	 *
	 * @param {String} ...encoding
	 * @return {String|Array}
	 * @public
	 */

	req.acceptsEncodings = function(){
	  var accept = accepts(this);
	  return accept.encodings.apply(accept, arguments);
	};

	req.acceptsEncoding = deprecate.function(req.acceptsEncodings,
	  'req.acceptsEncoding: Use acceptsEncodings instead');

	/**
	 * Check if the given `charset`s are acceptable,
	 * otherwise you should respond with 406 "Not Acceptable".
	 *
	 * @param {String} ...charset
	 * @return {String|Array}
	 * @public
	 */

	req.acceptsCharsets = function(){
	  var accept = accepts(this);
	  return accept.charsets.apply(accept, arguments);
	};

	req.acceptsCharset = deprecate.function(req.acceptsCharsets,
	  'req.acceptsCharset: Use acceptsCharsets instead');

	/**
	 * Check if the given `lang`s are acceptable,
	 * otherwise you should respond with 406 "Not Acceptable".
	 *
	 * @param {String} ...lang
	 * @return {String|Array}
	 * @public
	 */

	req.acceptsLanguages = function(){
	  var accept = accepts(this);
	  return accept.languages.apply(accept, arguments);
	};

	req.acceptsLanguage = deprecate.function(req.acceptsLanguages,
	  'req.acceptsLanguage: Use acceptsLanguages instead');

	/**
	 * Parse Range header field,
	 * capping to the given `size`.
	 *
	 * Unspecified ranges such as "0-" require
	 * knowledge of your resource length. In
	 * the case of a byte range this is of course
	 * the total number of bytes. If the Range
	 * header field is not given `null` is returned,
	 * `-1` when unsatisfiable, `-2` when syntactically invalid.
	 *
	 * NOTE: remember that ranges are inclusive, so
	 * for example "Range: users=0-3" should respond
	 * with 4 users when available, not 3.
	 *
	 * @param {Number} size
	 * @return {Array}
	 * @public
	 */

	req.range = function(size){
	  var range = this.get('Range');
	  if (!range) return;
	  return parseRange(size, range);
	};

	/**
	 * Return the value of param `name` when present or `defaultValue`.
	 *
	 *  - Checks route placeholders, ex: _/user/:id_
	 *  - Checks body params, ex: id=12, {"id":12}
	 *  - Checks query string params, ex: ?id=12
	 *
	 * To utilize request bodies, `req.body`
	 * should be an object. This can be done by using
	 * the `bodyParser()` middleware.
	 *
	 * @param {String} name
	 * @param {Mixed} [defaultValue]
	 * @return {String}
	 * @public
	 */

	req.param = function param(name, defaultValue) {
	  var params = this.params || {};
	  var body = this.body || {};
	  var query = this.query || {};

	  var args = arguments.length === 1
	    ? 'name'
	    : 'name, default';
	  deprecate('req.param(' + args + '): Use req.params, req.body, or req.query instead');

	  if (null != params[name] && params.hasOwnProperty(name)) return params[name];
	  if (null != body[name]) return body[name];
	  if (null != query[name]) return query[name];

	  return defaultValue;
	};

	/**
	 * Check if the incoming request contains the "Content-Type"
	 * header field, and it contains the give mime `type`.
	 *
	 * Examples:
	 *
	 *      // With Content-Type: text/html; charset=utf-8
	 *      req.is('html');
	 *      req.is('text/html');
	 *      req.is('text/*');
	 *      // => true
	 *
	 *      // When Content-Type is application/json
	 *      req.is('json');
	 *      req.is('application/json');
	 *      req.is('application/*');
	 *      // => true
	 *
	 *      req.is('html');
	 *      // => false
	 *
	 * @param {String|Array} types...
	 * @return {String|false|null}
	 * @public
	 */

	req.is = function is(types) {
	  var arr = types;

	  // support flattened arguments
	  if (!Array.isArray(types)) {
	    arr = new Array(arguments.length);
	    for (var i = 0; i < arr.length; i++) {
	      arr[i] = arguments[i];
	    }
	  }

	  return typeis(this, arr);
	};

	/**
	 * Return the protocol string "http" or "https"
	 * when requested with TLS. When the "trust proxy"
	 * setting trusts the socket address, the
	 * "X-Forwarded-Proto" header field will be trusted
	 * and used if present.
	 *
	 * If you're running behind a reverse proxy that
	 * supplies https for you this may be enabled.
	 *
	 * @return {String}
	 * @public
	 */

	defineGetter(req, 'protocol', function protocol(){
	  var proto = this.connection.encrypted
	    ? 'https'
	    : 'http';
	  var trust = this.app.get('trust proxy fn');

	  if (!trust(this.connection.remoteAddress, 0)) {
	    return proto;
	  }

	  // Note: X-Forwarded-Proto is normally only ever a
	  //       single value, but this is to be safe.
	  proto = this.get('X-Forwarded-Proto') || proto;
	  return proto.split(/\s*,\s*/)[0];
	});

	/**
	 * Short-hand for:
	 *
	 *    req.protocol == 'https'
	 *
	 * @return {Boolean}
	 * @public
	 */

	defineGetter(req, 'secure', function secure(){
	  return this.protocol === 'https';
	});

	/**
	 * Return the remote address from the trusted proxy.
	 *
	 * The is the remote address on the socket unless
	 * "trust proxy" is set.
	 *
	 * @return {String}
	 * @public
	 */

	defineGetter(req, 'ip', function ip(){
	  var trust = this.app.get('trust proxy fn');
	  return proxyaddr(this, trust);
	});

	/**
	 * When "trust proxy" is set, trusted proxy addresses + client.
	 *
	 * For example if the value were "client, proxy1, proxy2"
	 * you would receive the array `["client", "proxy1", "proxy2"]`
	 * where "proxy2" is the furthest down-stream and "proxy1" and
	 * "proxy2" were trusted.
	 *
	 * @return {Array}
	 * @public
	 */

	defineGetter(req, 'ips', function ips() {
	  var trust = this.app.get('trust proxy fn');
	  var addrs = proxyaddr.all(this, trust);
	  return addrs.slice(1).reverse();
	});

	/**
	 * Return subdomains as an array.
	 *
	 * Subdomains are the dot-separated parts of the host before the main domain of
	 * the app. By default, the domain of the app is assumed to be the last two
	 * parts of the host. This can be changed by setting "subdomain offset".
	 *
	 * For example, if the domain is "tobi.ferrets.example.com":
	 * If "subdomain offset" is not set, req.subdomains is `["ferrets", "tobi"]`.
	 * If "subdomain offset" is 3, req.subdomains is `["tobi"]`.
	 *
	 * @return {Array}
	 * @public
	 */

	defineGetter(req, 'subdomains', function subdomains() {
	  var hostname = this.hostname;

	  if (!hostname) return [];

	  var offset = this.app.get('subdomain offset');
	  var subdomains = !isIP(hostname)
	    ? hostname.split('.').reverse()
	    : [hostname];

	  return subdomains.slice(offset);
	});

	/**
	 * Short-hand for `url.parse(req.url).pathname`.
	 *
	 * @return {String}
	 * @public
	 */

	defineGetter(req, 'path', function path() {
	  return parse(this).pathname;
	});

	/**
	 * Parse the "Host" header field to a hostname.
	 *
	 * When the "trust proxy" setting trusts the socket
	 * address, the "X-Forwarded-Host" header field will
	 * be trusted.
	 *
	 * @return {String}
	 * @public
	 */

	defineGetter(req, 'hostname', function hostname(){
	  var trust = this.app.get('trust proxy fn');
	  var host = this.get('X-Forwarded-Host');

	  if (!host || !trust(this.connection.remoteAddress, 0)) {
	    host = this.get('Host');
	  }

	  if (!host) return;

	  // IPv6 literal support
	  var offset = host[0] === '['
	    ? host.indexOf(']') + 1
	    : 0;
	  var index = host.indexOf(':', offset);

	  return index !== -1
	    ? host.substring(0, index)
	    : host;
	});

	// TODO: change req.host to return host in next major

	defineGetter(req, 'host', deprecate.function(function host(){
	  return this.hostname;
	}, 'req.host: Use req.hostname instead'));

	/**
	 * Check if the request is fresh, aka
	 * Last-Modified and/or the ETag
	 * still match.
	 *
	 * @return {Boolean}
	 * @public
	 */

	defineGetter(req, 'fresh', function(){
	  var method = this.method;
	  var s = this.res.statusCode;

	  // GET or HEAD for weak freshness validation only
	  if ('GET' != method && 'HEAD' != method) return false;

	  // 2xx or 304 as per rfc2616 14.26
	  if ((s >= 200 && s < 300) || 304 == s) {
	    return fresh(this.headers, (this.res._headers || {}));
	  }

	  return false;
	});

	/**
	 * Check if the request is stale, aka
	 * "Last-Modified" and / or the "ETag" for the
	 * resource has changed.
	 *
	 * @return {Boolean}
	 * @public
	 */

	defineGetter(req, 'stale', function stale(){
	  return !this.fresh;
	});

	/**
	 * Check if the request was an _XMLHttpRequest_.
	 *
	 * @return {Boolean}
	 * @public
	 */

	defineGetter(req, 'xhr', function xhr(){
	  var val = this.get('X-Requested-With') || '';
	  return val.toLowerCase() === 'xmlhttprequest';
	});

	/**
	 * Helper function for creating a getter on an object.
	 *
	 * @param {Object} obj
	 * @param {String} name
	 * @param {Function} getter
	 * @private
	 */
	function defineGetter(obj, name, getter) {
	  Object.defineProperty(obj, name, {
	    configurable: true,
	    enumerable: true,
	    get: getter
	  });
	};


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * accepts
	 * Copyright(c) 2014 Jonathan Ong
	 * Copyright(c) 2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict'

	/**
	 * Module dependencies.
	 * @private
	 */

	var Negotiator = __webpack_require__(67)
	var mime = __webpack_require__(72)

	/**
	 * Module exports.
	 * @public
	 */

	module.exports = Accepts

	/**
	 * Create a new Accepts object for the given req.
	 *
	 * @param {object} req
	 * @public
	 */

	function Accepts(req) {
	  if (!(this instanceof Accepts))
	    return new Accepts(req)

	  this.headers = req.headers
	  this.negotiator = new Negotiator(req)
	}

	/**
	 * Check if the given `type(s)` is acceptable, returning
	 * the best match when true, otherwise `undefined`, in which
	 * case you should respond with 406 "Not Acceptable".
	 *
	 * The `type` value may be a single mime type string
	 * such as "application/json", the extension name
	 * such as "json" or an array `["json", "html", "text/plain"]`. When a list
	 * or array is given the _best_ match, if any is returned.
	 *
	 * Examples:
	 *
	 *     // Accept: text/html
	 *     this.types('html');
	 *     // => "html"
	 *
	 *     // Accept: text/*, application/json
	 *     this.types('html');
	 *     // => "html"
	 *     this.types('text/html');
	 *     // => "text/html"
	 *     this.types('json', 'text');
	 *     // => "json"
	 *     this.types('application/json');
	 *     // => "application/json"
	 *
	 *     // Accept: text/*, application/json
	 *     this.types('image/png');
	 *     this.types('png');
	 *     // => undefined
	 *
	 *     // Accept: text/*;q=.5, application/json
	 *     this.types(['html', 'json']);
	 *     this.types('html', 'json');
	 *     // => "json"
	 *
	 * @param {String|Array} types...
	 * @return {String|Array|Boolean}
	 * @public
	 */

	Accepts.prototype.type =
	Accepts.prototype.types = function (types_) {
	  var types = types_

	  // support flattened arguments
	  if (types && !Array.isArray(types)) {
	    types = new Array(arguments.length)
	    for (var i = 0; i < types.length; i++) {
	      types[i] = arguments[i]
	    }
	  }

	  // no types, return all requested types
	  if (!types || types.length === 0) {
	    return this.negotiator.mediaTypes()
	  }

	  if (!this.headers.accept) return types[0];
	  var mimes = types.map(extToMime);
	  var accepts = this.negotiator.mediaTypes(mimes.filter(validMime));
	  var first = accepts[0];
	  if (!first) return false;
	  return types[mimes.indexOf(first)];
	}

	/**
	 * Return accepted encodings or best fit based on `encodings`.
	 *
	 * Given `Accept-Encoding: gzip, deflate`
	 * an array sorted by quality is returned:
	 *
	 *     ['gzip', 'deflate']
	 *
	 * @param {String|Array} encodings...
	 * @return {String|Array}
	 * @public
	 */

	Accepts.prototype.encoding =
	Accepts.prototype.encodings = function (encodings_) {
	  var encodings = encodings_

	  // support flattened arguments
	  if (encodings && !Array.isArray(encodings)) {
	    encodings = new Array(arguments.length)
	    for (var i = 0; i < encodings.length; i++) {
	      encodings[i] = arguments[i]
	    }
	  }

	  // no encodings, return all requested encodings
	  if (!encodings || encodings.length === 0) {
	    return this.negotiator.encodings()
	  }

	  return this.negotiator.encodings(encodings)[0] || false
	}

	/**
	 * Return accepted charsets or best fit based on `charsets`.
	 *
	 * Given `Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5`
	 * an array sorted by quality is returned:
	 *
	 *     ['utf-8', 'utf-7', 'iso-8859-1']
	 *
	 * @param {String|Array} charsets...
	 * @return {String|Array}
	 * @public
	 */

	Accepts.prototype.charset =
	Accepts.prototype.charsets = function (charsets_) {
	  var charsets = charsets_

	  // support flattened arguments
	  if (charsets && !Array.isArray(charsets)) {
	    charsets = new Array(arguments.length)
	    for (var i = 0; i < charsets.length; i++) {
	      charsets[i] = arguments[i]
	    }
	  }

	  // no charsets, return all requested charsets
	  if (!charsets || charsets.length === 0) {
	    return this.negotiator.charsets()
	  }

	  return this.negotiator.charsets(charsets)[0] || false
	}

	/**
	 * Return accepted languages or best fit based on `langs`.
	 *
	 * Given `Accept-Language: en;q=0.8, es, pt`
	 * an array sorted by quality is returned:
	 *
	 *     ['es', 'pt', 'en']
	 *
	 * @param {String|Array} langs...
	 * @return {Array|String}
	 * @public
	 */

	Accepts.prototype.lang =
	Accepts.prototype.langs =
	Accepts.prototype.language =
	Accepts.prototype.languages = function (languages_) {
	  var languages = languages_

	  // support flattened arguments
	  if (languages && !Array.isArray(languages)) {
	    languages = new Array(arguments.length)
	    for (var i = 0; i < languages.length; i++) {
	      languages[i] = arguments[i]
	    }
	  }

	  // no languages, return all requested languages
	  if (!languages || languages.length === 0) {
	    return this.negotiator.languages()
	  }

	  return this.negotiator.languages(languages)[0] || false
	}

	/**
	 * Convert extnames to mime.
	 *
	 * @param {String} type
	 * @return {String}
	 * @private
	 */

	function extToMime(type) {
	  return type.indexOf('/') === -1
	    ? mime.lookup(type)
	    : type
	}

	/**
	 * Check if mime is valid.
	 *
	 * @param {String} type
	 * @return {String}
	 * @private
	 */

	function validMime(type) {
	  return typeof type === 'string';
	}


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	
	var preferredCharsets = __webpack_require__(68);
	var preferredEncodings = __webpack_require__(69);
	var preferredLanguages = __webpack_require__(70);
	var preferredMediaTypes = __webpack_require__(71);

	module.exports = Negotiator;
	Negotiator.Negotiator = Negotiator;

	function Negotiator(request) {
	  if (!(this instanceof Negotiator)) {
	    return new Negotiator(request);
	  }

	  this.request = request;
	}

	Negotiator.prototype.charset = function charset(available) {
	  var set = this.charsets(available);
	  return set && set[0];
	};

	Negotiator.prototype.charsets = function charsets(available) {
	  return preferredCharsets(this.request.headers['accept-charset'], available);
	};

	Negotiator.prototype.encoding = function encoding(available) {
	  var set = this.encodings(available);
	  return set && set[0];
	};

	Negotiator.prototype.encodings = function encodings(available) {
	  return preferredEncodings(this.request.headers['accept-encoding'], available);
	};

	Negotiator.prototype.language = function language(available) {
	  var set = this.languages(available);
	  return set && set[0];
	};

	Negotiator.prototype.languages = function languages(available) {
	  return preferredLanguages(this.request.headers['accept-language'], available);
	};

	Negotiator.prototype.mediaType = function mediaType(available) {
	  var set = this.mediaTypes(available);
	  return set && set[0];
	};

	Negotiator.prototype.mediaTypes = function mediaTypes(available) {
	  return preferredMediaTypes(this.request.headers.accept, available);
	};

	// Backwards compatibility
	Negotiator.prototype.preferredCharset = Negotiator.prototype.charset;
	Negotiator.prototype.preferredCharsets = Negotiator.prototype.charsets;
	Negotiator.prototype.preferredEncoding = Negotiator.prototype.encoding;
	Negotiator.prototype.preferredEncodings = Negotiator.prototype.encodings;
	Negotiator.prototype.preferredLanguage = Negotiator.prototype.language;
	Negotiator.prototype.preferredLanguages = Negotiator.prototype.languages;
	Negotiator.prototype.preferredMediaType = Negotiator.prototype.mediaType;
	Negotiator.prototype.preferredMediaTypes = Negotiator.prototype.mediaTypes;


/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = preferredCharsets;
	preferredCharsets.preferredCharsets = preferredCharsets;

	function parseAcceptCharset(accept) {
	  var accepts = accept.split(',');

	  for (var i = 0, j = 0; i < accepts.length; i++) {
	    var charset = parseCharset(accepts[i].trim(), i);

	    if (charset) {
	      accepts[j++] = charset;
	    }
	  }

	  // trim accepts
	  accepts.length = j;

	  return accepts;
	}

	function parseCharset(s, i) {
	  var match = s.match(/^\s*(\S+?)\s*(?:;(.*))?$/);
	  if (!match) return null;

	  var charset = match[1];
	  var q = 1;
	  if (match[2]) {
	    var params = match[2].split(';')
	    for (var i = 0; i < params.length; i ++) {
	      var p = params[i].trim().split('=');
	      if (p[0] === 'q') {
	        q = parseFloat(p[1]);
	        break;
	      }
	    }
	  }

	  return {
	    charset: charset,
	    q: q,
	    i: i
	  };
	}

	function getCharsetPriority(charset, accepted, index) {
	  var priority = {o: -1, q: 0, s: 0};

	  for (var i = 0; i < accepted.length; i++) {
	    var spec = specify(charset, accepted[i], index);

	    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
	      priority = spec;
	    }
	  }

	  return priority;
	}

	function specify(charset, spec, index) {
	  var s = 0;
	  if(spec.charset.toLowerCase() === charset.toLowerCase()){
	    s |= 1;
	  } else if (spec.charset !== '*' ) {
	    return null
	  }

	  return {
	    i: index,
	    o: spec.i,
	    q: spec.q,
	    s: s
	  }
	}

	function preferredCharsets(accept, provided) {
	  // RFC 2616 sec 14.2: no header = *
	  var accepts = parseAcceptCharset(accept === undefined ? '*' : accept || '');

	  if (!provided) {
	    // sorted list of all charsets
	    return accepts.filter(isQuality).sort(compareSpecs).map(function getCharset(spec) {
	      return spec.charset;
	    });
	  }

	  var priorities = provided.map(function getPriority(type, index) {
	    return getCharsetPriority(type, accepts, index);
	  });

	  // sorted list of accepted charsets
	  return priorities.filter(isQuality).sort(compareSpecs).map(function getCharset(priority) {
	    return provided[priorities.indexOf(priority)];
	  });
	}

	function compareSpecs(a, b) {
	  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
	}

	function isQuality(spec) {
	  return spec.q > 0;
	}


/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = preferredEncodings;
	preferredEncodings.preferredEncodings = preferredEncodings;

	function parseAcceptEncoding(accept) {
	  var accepts = accept.split(',');
	  var hasIdentity = false;
	  var minQuality = 1;

	  for (var i = 0, j = 0; i < accepts.length; i++) {
	    var encoding = parseEncoding(accepts[i].trim(), i);

	    if (encoding) {
	      accepts[j++] = encoding;
	      hasIdentity = hasIdentity || specify('identity', encoding);
	      minQuality = Math.min(minQuality, encoding.q || 1);
	    }
	  }

	  if (!hasIdentity) {
	    /*
	     * If identity doesn't explicitly appear in the accept-encoding header,
	     * it's added to the list of acceptable encoding with the lowest q
	     */
	    accepts[j++] = {
	      encoding: 'identity',
	      q: minQuality,
	      i: i
	    };
	  }

	  // trim accepts
	  accepts.length = j;

	  return accepts;
	}

	function parseEncoding(s, i) {
	  var match = s.match(/^\s*(\S+?)\s*(?:;(.*))?$/);

	  if (!match) return null;

	  var encoding = match[1];
	  var q = 1;
	  if (match[2]) {
	    var params = match[2].split(';');
	    for (var i = 0; i < params.length; i ++) {
	      var p = params[i].trim().split('=');
	      if (p[0] === 'q') {
	        q = parseFloat(p[1]);
	        break;
	      }
	    }
	  }

	  return {
	    encoding: encoding,
	    q: q,
	    i: i
	  };
	}

	function getEncodingPriority(encoding, accepted, index) {
	  var priority = {o: -1, q: 0, s: 0};

	  for (var i = 0; i < accepted.length; i++) {
	    var spec = specify(encoding, accepted[i], index);

	    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
	      priority = spec;
	    }
	  }

	  return priority;
	}

	function specify(encoding, spec, index) {
	  var s = 0;
	  if(spec.encoding.toLowerCase() === encoding.toLowerCase()){
	    s |= 1;
	  } else if (spec.encoding !== '*' ) {
	    return null
	  }

	  return {
	    i: index,
	    o: spec.i,
	    q: spec.q,
	    s: s
	  }
	};

	function preferredEncodings(accept, provided) {
	  var accepts = parseAcceptEncoding(accept || '');

	  if (!provided) {
	    // sorted list of all encodings
	    return accepts.filter(isQuality).sort(compareSpecs).map(function getEncoding(spec) {
	      return spec.encoding;
	    });
	  }

	  var priorities = provided.map(function getPriority(type, index) {
	    return getEncodingPriority(type, accepts, index);
	  });

	  // sorted list of accepted encodings
	  return priorities.filter(isQuality).sort(compareSpecs).map(function getEncoding(priority) {
	    return provided[priorities.indexOf(priority)];
	  });
	}

	function compareSpecs(a, b) {
	  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
	}

	function isQuality(spec) {
	  return spec.q > 0;
	}


/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = preferredLanguages;
	preferredLanguages.preferredLanguages = preferredLanguages;

	function parseAcceptLanguage(accept) {
	  var accepts = accept.split(',');

	  for (var i = 0, j = 0; i < accepts.length; i++) {
	    var langauge = parseLanguage(accepts[i].trim(), i);

	    if (langauge) {
	      accepts[j++] = langauge;
	    }
	  }

	  // trim accepts
	  accepts.length = j;

	  return accepts;
	}

	function parseLanguage(s, i) {
	  var match = s.match(/^\s*(\S+?)(?:-(\S+?))?\s*(?:;(.*))?$/);
	  if (!match) return null;

	  var prefix = match[1],
	      suffix = match[2],
	      full = prefix;

	  if (suffix) full += "-" + suffix;

	  var q = 1;
	  if (match[3]) {
	    var params = match[3].split(';')
	    for (var i = 0; i < params.length; i ++) {
	      var p = params[i].split('=');
	      if (p[0] === 'q') q = parseFloat(p[1]);
	    }
	  }

	  return {
	    prefix: prefix,
	    suffix: suffix,
	    q: q,
	    i: i,
	    full: full
	  };
	}

	function getLanguagePriority(language, accepted, index) {
	  var priority = {o: -1, q: 0, s: 0};

	  for (var i = 0; i < accepted.length; i++) {
	    var spec = specify(language, accepted[i], index);

	    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
	      priority = spec;
	    }
	  }

	  return priority;
	}

	function specify(language, spec, index) {
	  var p = parseLanguage(language)
	  if (!p) return null;
	  var s = 0;
	  if(spec.full.toLowerCase() === p.full.toLowerCase()){
	    s |= 4;
	  } else if (spec.prefix.toLowerCase() === p.full.toLowerCase()) {
	    s |= 2;
	  } else if (spec.full.toLowerCase() === p.prefix.toLowerCase()) {
	    s |= 1;
	  } else if (spec.full !== '*' ) {
	    return null
	  }

	  return {
	    i: index,
	    o: spec.i,
	    q: spec.q,
	    s: s
	  }
	};

	function preferredLanguages(accept, provided) {
	  // RFC 2616 sec 14.4: no header = *
	  var accepts = parseAcceptLanguage(accept === undefined ? '*' : accept || '');

	  if (!provided) {
	    // sorted list of all languages
	    return accepts.filter(isQuality).sort(compareSpecs).map(function getLanguage(spec) {
	      return spec.full;
	    });
	  }

	  var priorities = provided.map(function getPriority(type, index) {
	    return getLanguagePriority(type, accepts, index);
	  });

	  // sorted list of accepted languages
	  return priorities.filter(isQuality).sort(compareSpecs).map(function getLanguage(priority) {
	    return provided[priorities.indexOf(priority)];
	  });
	}

	function compareSpecs(a, b) {
	  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
	}

	function isQuality(spec) {
	  return spec.q > 0;
	}


/***/ },
/* 71 */
/***/ function(module, exports) {

	/**
	 * negotiator
	 * Copyright(c) 2012 Isaac Z. Schlueter
	 * Copyright(c) 2014 Federico Romero
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	module.exports = preferredMediaTypes;
	preferredMediaTypes.preferredMediaTypes = preferredMediaTypes;

	function parseAccept(accept) {
	  var accepts = splitMediaTypes(accept);

	  for (var i = 0, j = 0; i < accepts.length; i++) {
	    var mediaType = parseMediaType(accepts[i].trim(), i);

	    if (mediaType) {
	      accepts[j++] = mediaType;
	    }
	  }

	  // trim accepts
	  accepts.length = j;

	  return accepts;
	};

	function parseMediaType(s, i) {
	  var match = s.match(/\s*(\S+?)\/([^;\s]+)\s*(?:;(.*))?/);
	  if (!match) return null;

	  var type = match[1],
	      subtype = match[2],
	      full = "" + type + "/" + subtype,
	      params = {},
	      q = 1;

	  if (match[3]) {
	    params = match[3].split(';').map(function(s) {
	      return s.trim().split('=');
	    }).reduce(function (set, p) {
	      var name = p[0].toLowerCase();
	      var value = p[1];

	      set[name] = value && value[0] === '"' && value[value.length - 1] === '"'
	        ? value.substr(1, value.length - 2)
	        : value;

	      return set;
	    }, params);

	    if (params.q != null) {
	      q = parseFloat(params.q);
	      delete params.q;
	    }
	  }

	  return {
	    type: type,
	    subtype: subtype,
	    params: params,
	    q: q,
	    i: i,
	    full: full
	  };
	}

	function getMediaTypePriority(type, accepted, index) {
	  var priority = {o: -1, q: 0, s: 0};

	  for (var i = 0; i < accepted.length; i++) {
	    var spec = specify(type, accepted[i], index);

	    if (spec && (priority.s - spec.s || priority.q - spec.q || priority.o - spec.o) < 0) {
	      priority = spec;
	    }
	  }

	  return priority;
	}

	function specify(type, spec, index) {
	  var p = parseMediaType(type);
	  var s = 0;

	  if (!p) {
	    return null;
	  }

	  if(spec.type.toLowerCase() == p.type.toLowerCase()) {
	    s |= 4
	  } else if(spec.type != '*') {
	    return null;
	  }

	  if(spec.subtype.toLowerCase() == p.subtype.toLowerCase()) {
	    s |= 2
	  } else if(spec.subtype != '*') {
	    return null;
	  }

	  var keys = Object.keys(spec.params);
	  if (keys.length > 0) {
	    if (keys.every(function (k) {
	      return spec.params[k] == '*' || (spec.params[k] || '').toLowerCase() == (p.params[k] || '').toLowerCase();
	    })) {
	      s |= 1
	    } else {
	      return null
	    }
	  }

	  return {
	    i: index,
	    o: spec.i,
	    q: spec.q,
	    s: s,
	  }

	}

	function preferredMediaTypes(accept, provided) {
	  // RFC 2616 sec 14.2: no header = */*
	  var accepts = parseAccept(accept === undefined ? '*/*' : accept || '');

	  if (!provided) {
	    // sorted list of all types
	    return accepts.filter(isQuality).sort(compareSpecs).map(function getType(spec) {
	      return spec.full;
	    });
	  }

	  var priorities = provided.map(function getPriority(type, index) {
	    return getMediaTypePriority(type, accepts, index);
	  });

	  // sorted list of accepted types
	  return priorities.filter(isQuality).sort(compareSpecs).map(function getType(priority) {
	    return provided[priorities.indexOf(priority)];
	  });
	}

	function compareSpecs(a, b) {
	  return (b.q - a.q) || (b.s - a.s) || (a.o - b.o) || (a.i - b.i) || 0;
	}

	function isQuality(spec) {
	  return spec.q > 0;
	}

	function quoteCount(string) {
	  var count = 0;
	  var index = 0;

	  while ((index = string.indexOf('"', index)) !== -1) {
	    count++;
	    index++;
	  }

	  return count;
	}

	function splitMediaTypes(accept) {
	  var accepts = accept.split(',');

	  for (var i = 1, j = 0; i < accepts.length; i++) {
	    if (quoteCount(accepts[j]) % 2 == 0) {
	      accepts[++j] = accepts[i];
	    } else {
	      accepts[j] += ',' + accepts[i];
	    }
	  }

	  // trim accepts
	  accepts.length = j + 1;

	  return accepts;
	}


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * mime-types
	 * Copyright(c) 2014 Jonathan Ong
	 * Copyright(c) 2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict'

	/**
	 * Module dependencies.
	 * @private
	 */

	var db = __webpack_require__(73)
	var extname = __webpack_require__(33).extname

	/**
	 * Module variables.
	 * @private
	 */

	var extractTypeRegExp = /^\s*([^;\s]*)(?:;|\s|$)/
	var textTypeRegExp = /^text\//i

	/**
	 * Module exports.
	 * @public
	 */

	exports.charset = charset
	exports.charsets = { lookup: charset }
	exports.contentType = contentType
	exports.extension = extension
	exports.extensions = Object.create(null)
	exports.lookup = lookup
	exports.types = Object.create(null)

	// Populate the extensions/types maps
	populateMaps(exports.extensions, exports.types)

	/**
	 * Get the default charset for a MIME type.
	 *
	 * @param {string} type
	 * @return {boolean|string}
	 */

	function charset(type) {
	  if (!type || typeof type !== 'string') {
	    return false
	  }

	  // TODO: use media-typer
	  var match = extractTypeRegExp.exec(type)
	  var mime = match && db[match[1].toLowerCase()]

	  if (mime && mime.charset) {
	    return mime.charset
	  }

	  // default text/* to utf-8
	  if (match && textTypeRegExp.test(match[1])) {
	    return 'UTF-8'
	  }

	  return false
	}

	/**
	 * Create a full Content-Type header given a MIME type or extension.
	 *
	 * @param {string} str
	 * @return {boolean|string}
	 */

	function contentType(str) {
	  // TODO: should this even be in this module?
	  if (!str || typeof str !== 'string') {
	    return false
	  }

	  var mime = str.indexOf('/') === -1
	    ? exports.lookup(str)
	    : str

	  if (!mime) {
	    return false
	  }

	  // TODO: use content-type or other module
	  if (mime.indexOf('charset') === -1) {
	    var charset = exports.charset(mime)
	    if (charset) mime += '; charset=' + charset.toLowerCase()
	  }

	  return mime
	}

	/**
	 * Get the default extension for a MIME type.
	 *
	 * @param {string} type
	 * @return {boolean|string}
	 */

	function extension(type) {
	  if (!type || typeof type !== 'string') {
	    return false
	  }

	  // TODO: use media-typer
	  var match = extractTypeRegExp.exec(type)

	  // get extensions
	  var exts = match && exports.extensions[match[1].toLowerCase()]

	  if (!exts || !exts.length) {
	    return false
	  }

	  return exts[0]
	}

	/**
	 * Lookup the MIME type for a file path/extension.
	 *
	 * @param {string} path
	 * @return {boolean|string}
	 */

	function lookup(path) {
	  if (!path || typeof path !== 'string') {
	    return false
	  }

	  // get the extension ("ext" or ".ext" or full path)
	  var extension = extname('x.' + path)
	    .toLowerCase()
	    .substr(1)

	  if (!extension) {
	    return false
	  }

	  return exports.types[extension] || false
	}

	/**
	 * Populate the extensions and types maps.
	 * @private
	 */

	function populateMaps(extensions, types) {
	  // source preference (least -> most)
	  var preference = ['nginx', 'apache', undefined, 'iana']

	  Object.keys(db).forEach(function forEachMimeType(type) {
	    var mime = db[type]
	    var exts = mime.extensions

	    if (!exts || !exts.length) {
	      return
	    }

	    // mime -> extensions
	    extensions[type] = exts

	    // extension -> mime
	    for (var i = 0; i < exts.length; i++) {
	      var extension = exts[i]

	      if (types[extension]) {
	        var from = preference.indexOf(db[types[extension]].source)
	        var to = preference.indexOf(mime.source)

	        if (types[extension] !== 'application/octet-stream'
	          && from > to || (from === to && types[extension].substr(0, 12) === 'application/')) {
	          // skip the remapping
	          continue
	        }
	      }

	      // set the extension -> mime
	      types[extension] = type
	    }
	  })
	}


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * mime-db
	 * Copyright(c) 2014 Jonathan Ong
	 * MIT Licensed
	 */

	/**
	 * Module exports.
	 */

	module.exports = __webpack_require__(74)


/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = {
		"application/1d-interleaved-parityfec": {
			"source": "iana"
		},
		"application/3gpdash-qoe-report+xml": {
			"source": "iana"
		},
		"application/3gpp-ims+xml": {
			"source": "iana"
		},
		"application/a2l": {
			"source": "iana"
		},
		"application/activemessage": {
			"source": "iana"
		},
		"application/alto-costmap+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-costmapfilter+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-directory+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-endpointcost+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-endpointcostparams+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-endpointprop+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-endpointpropparams+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-error+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-networkmap+json": {
			"source": "iana",
			"compressible": true
		},
		"application/alto-networkmapfilter+json": {
			"source": "iana",
			"compressible": true
		},
		"application/aml": {
			"source": "iana"
		},
		"application/andrew-inset": {
			"source": "iana",
			"extensions": [
				"ez"
			]
		},
		"application/applefile": {
			"source": "iana"
		},
		"application/applixware": {
			"source": "apache",
			"extensions": [
				"aw"
			]
		},
		"application/atf": {
			"source": "iana"
		},
		"application/atfx": {
			"source": "iana"
		},
		"application/atom+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"atom"
			]
		},
		"application/atomcat+xml": {
			"source": "iana",
			"extensions": [
				"atomcat"
			]
		},
		"application/atomdeleted+xml": {
			"source": "iana"
		},
		"application/atomicmail": {
			"source": "iana"
		},
		"application/atomsvc+xml": {
			"source": "iana",
			"extensions": [
				"atomsvc"
			]
		},
		"application/atxml": {
			"source": "iana"
		},
		"application/auth-policy+xml": {
			"source": "iana"
		},
		"application/bacnet-xdd+zip": {
			"source": "iana"
		},
		"application/batch-smtp": {
			"source": "iana"
		},
		"application/bdoc": {
			"compressible": false,
			"extensions": [
				"bdoc"
			]
		},
		"application/beep+xml": {
			"source": "iana"
		},
		"application/calendar+json": {
			"source": "iana",
			"compressible": true
		},
		"application/calendar+xml": {
			"source": "iana"
		},
		"application/call-completion": {
			"source": "iana"
		},
		"application/cals-1840": {
			"source": "iana"
		},
		"application/cbor": {
			"source": "iana"
		},
		"application/ccmp+xml": {
			"source": "iana"
		},
		"application/ccxml+xml": {
			"source": "iana",
			"extensions": [
				"ccxml"
			]
		},
		"application/cdfx+xml": {
			"source": "iana"
		},
		"application/cdmi-capability": {
			"source": "iana",
			"extensions": [
				"cdmia"
			]
		},
		"application/cdmi-container": {
			"source": "iana",
			"extensions": [
				"cdmic"
			]
		},
		"application/cdmi-domain": {
			"source": "iana",
			"extensions": [
				"cdmid"
			]
		},
		"application/cdmi-object": {
			"source": "iana",
			"extensions": [
				"cdmio"
			]
		},
		"application/cdmi-queue": {
			"source": "iana",
			"extensions": [
				"cdmiq"
			]
		},
		"application/cdni": {
			"source": "iana"
		},
		"application/cea": {
			"source": "iana"
		},
		"application/cea-2018+xml": {
			"source": "iana"
		},
		"application/cellml+xml": {
			"source": "iana"
		},
		"application/cfw": {
			"source": "iana"
		},
		"application/cms": {
			"source": "iana"
		},
		"application/cnrp+xml": {
			"source": "iana"
		},
		"application/coap-group+json": {
			"source": "iana",
			"compressible": true
		},
		"application/commonground": {
			"source": "iana"
		},
		"application/conference-info+xml": {
			"source": "iana"
		},
		"application/cpl+xml": {
			"source": "iana"
		},
		"application/csrattrs": {
			"source": "iana"
		},
		"application/csta+xml": {
			"source": "iana"
		},
		"application/cstadata+xml": {
			"source": "iana"
		},
		"application/csvm+json": {
			"source": "iana",
			"compressible": true
		},
		"application/cu-seeme": {
			"source": "apache",
			"extensions": [
				"cu"
			]
		},
		"application/cybercash": {
			"source": "iana"
		},
		"application/dart": {
			"compressible": true
		},
		"application/dash+xml": {
			"source": "iana",
			"extensions": [
				"mpd"
			]
		},
		"application/dashdelta": {
			"source": "iana"
		},
		"application/davmount+xml": {
			"source": "iana",
			"extensions": [
				"davmount"
			]
		},
		"application/dca-rft": {
			"source": "iana"
		},
		"application/dcd": {
			"source": "iana"
		},
		"application/dec-dx": {
			"source": "iana"
		},
		"application/dialog-info+xml": {
			"source": "iana"
		},
		"application/dicom": {
			"source": "iana"
		},
		"application/dii": {
			"source": "iana"
		},
		"application/dit": {
			"source": "iana"
		},
		"application/dns": {
			"source": "iana"
		},
		"application/docbook+xml": {
			"source": "apache",
			"extensions": [
				"dbk"
			]
		},
		"application/dskpp+xml": {
			"source": "iana"
		},
		"application/dssc+der": {
			"source": "iana",
			"extensions": [
				"dssc"
			]
		},
		"application/dssc+xml": {
			"source": "iana",
			"extensions": [
				"xdssc"
			]
		},
		"application/dvcs": {
			"source": "iana"
		},
		"application/ecmascript": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"ecma"
			]
		},
		"application/edi-consent": {
			"source": "iana"
		},
		"application/edi-x12": {
			"source": "iana",
			"compressible": false
		},
		"application/edifact": {
			"source": "iana",
			"compressible": false
		},
		"application/emergencycalldata.comment+xml": {
			"source": "iana"
		},
		"application/emergencycalldata.deviceinfo+xml": {
			"source": "iana"
		},
		"application/emergencycalldata.providerinfo+xml": {
			"source": "iana"
		},
		"application/emergencycalldata.serviceinfo+xml": {
			"source": "iana"
		},
		"application/emergencycalldata.subscriberinfo+xml": {
			"source": "iana"
		},
		"application/emma+xml": {
			"source": "iana",
			"extensions": [
				"emma"
			]
		},
		"application/emotionml+xml": {
			"source": "iana"
		},
		"application/encaprtp": {
			"source": "iana"
		},
		"application/epp+xml": {
			"source": "iana"
		},
		"application/epub+zip": {
			"source": "iana",
			"extensions": [
				"epub"
			]
		},
		"application/eshop": {
			"source": "iana"
		},
		"application/exi": {
			"source": "iana",
			"extensions": [
				"exi"
			]
		},
		"application/fastinfoset": {
			"source": "iana"
		},
		"application/fastsoap": {
			"source": "iana"
		},
		"application/fdt+xml": {
			"source": "iana"
		},
		"application/fits": {
			"source": "iana"
		},
		"application/font-sfnt": {
			"source": "iana"
		},
		"application/font-tdpfr": {
			"source": "iana",
			"extensions": [
				"pfr"
			]
		},
		"application/font-woff": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"woff"
			]
		},
		"application/font-woff2": {
			"compressible": false,
			"extensions": [
				"woff2"
			]
		},
		"application/framework-attributes+xml": {
			"source": "iana"
		},
		"application/gml+xml": {
			"source": "apache",
			"extensions": [
				"gml"
			]
		},
		"application/gpx+xml": {
			"source": "apache",
			"extensions": [
				"gpx"
			]
		},
		"application/gxf": {
			"source": "apache",
			"extensions": [
				"gxf"
			]
		},
		"application/gzip": {
			"source": "iana",
			"compressible": false
		},
		"application/h224": {
			"source": "iana"
		},
		"application/held+xml": {
			"source": "iana"
		},
		"application/http": {
			"source": "iana"
		},
		"application/hyperstudio": {
			"source": "iana",
			"extensions": [
				"stk"
			]
		},
		"application/ibe-key-request+xml": {
			"source": "iana"
		},
		"application/ibe-pkg-reply+xml": {
			"source": "iana"
		},
		"application/ibe-pp-data": {
			"source": "iana"
		},
		"application/iges": {
			"source": "iana"
		},
		"application/im-iscomposing+xml": {
			"source": "iana"
		},
		"application/index": {
			"source": "iana"
		},
		"application/index.cmd": {
			"source": "iana"
		},
		"application/index.obj": {
			"source": "iana"
		},
		"application/index.response": {
			"source": "iana"
		},
		"application/index.vnd": {
			"source": "iana"
		},
		"application/inkml+xml": {
			"source": "iana",
			"extensions": [
				"ink",
				"inkml"
			]
		},
		"application/iotp": {
			"source": "iana"
		},
		"application/ipfix": {
			"source": "iana",
			"extensions": [
				"ipfix"
			]
		},
		"application/ipp": {
			"source": "iana"
		},
		"application/isup": {
			"source": "iana"
		},
		"application/its+xml": {
			"source": "iana"
		},
		"application/java-archive": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"jar",
				"war",
				"ear"
			]
		},
		"application/java-serialized-object": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"ser"
			]
		},
		"application/java-vm": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"class"
			]
		},
		"application/javascript": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true,
			"extensions": [
				"js"
			]
		},
		"application/jose": {
			"source": "iana"
		},
		"application/jose+json": {
			"source": "iana",
			"compressible": true
		},
		"application/jrd+json": {
			"source": "iana",
			"compressible": true
		},
		"application/json": {
			"source": "iana",
			"charset": "UTF-8",
			"compressible": true,
			"extensions": [
				"json",
				"map"
			]
		},
		"application/json-patch+json": {
			"source": "iana",
			"compressible": true
		},
		"application/json-seq": {
			"source": "iana"
		},
		"application/json5": {
			"extensions": [
				"json5"
			]
		},
		"application/jsonml+json": {
			"source": "apache",
			"compressible": true,
			"extensions": [
				"jsonml"
			]
		},
		"application/jwk+json": {
			"source": "iana",
			"compressible": true
		},
		"application/jwk-set+json": {
			"source": "iana",
			"compressible": true
		},
		"application/jwt": {
			"source": "iana"
		},
		"application/kpml-request+xml": {
			"source": "iana"
		},
		"application/kpml-response+xml": {
			"source": "iana"
		},
		"application/ld+json": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"jsonld"
			]
		},
		"application/link-format": {
			"source": "iana"
		},
		"application/load-control+xml": {
			"source": "iana"
		},
		"application/lost+xml": {
			"source": "iana",
			"extensions": [
				"lostxml"
			]
		},
		"application/lostsync+xml": {
			"source": "iana"
		},
		"application/lxf": {
			"source": "iana"
		},
		"application/mac-binhex40": {
			"source": "iana",
			"extensions": [
				"hqx"
			]
		},
		"application/mac-compactpro": {
			"source": "apache",
			"extensions": [
				"cpt"
			]
		},
		"application/macwriteii": {
			"source": "iana"
		},
		"application/mads+xml": {
			"source": "iana",
			"extensions": [
				"mads"
			]
		},
		"application/manifest+json": {
			"charset": "UTF-8",
			"compressible": true,
			"extensions": [
				"webmanifest"
			]
		},
		"application/marc": {
			"source": "iana",
			"extensions": [
				"mrc"
			]
		},
		"application/marcxml+xml": {
			"source": "iana",
			"extensions": [
				"mrcx"
			]
		},
		"application/mathematica": {
			"source": "iana",
			"extensions": [
				"ma",
				"nb",
				"mb"
			]
		},
		"application/mathml+xml": {
			"source": "iana",
			"extensions": [
				"mathml"
			]
		},
		"application/mathml-content+xml": {
			"source": "iana"
		},
		"application/mathml-presentation+xml": {
			"source": "iana"
		},
		"application/mbms-associated-procedure-description+xml": {
			"source": "iana"
		},
		"application/mbms-deregister+xml": {
			"source": "iana"
		},
		"application/mbms-envelope+xml": {
			"source": "iana"
		},
		"application/mbms-msk+xml": {
			"source": "iana"
		},
		"application/mbms-msk-response+xml": {
			"source": "iana"
		},
		"application/mbms-protection-description+xml": {
			"source": "iana"
		},
		"application/mbms-reception-report+xml": {
			"source": "iana"
		},
		"application/mbms-register+xml": {
			"source": "iana"
		},
		"application/mbms-register-response+xml": {
			"source": "iana"
		},
		"application/mbms-schedule+xml": {
			"source": "iana"
		},
		"application/mbms-user-service-description+xml": {
			"source": "iana"
		},
		"application/mbox": {
			"source": "iana",
			"extensions": [
				"mbox"
			]
		},
		"application/media-policy-dataset+xml": {
			"source": "iana"
		},
		"application/media_control+xml": {
			"source": "iana"
		},
		"application/mediaservercontrol+xml": {
			"source": "iana",
			"extensions": [
				"mscml"
			]
		},
		"application/merge-patch+json": {
			"source": "iana",
			"compressible": true
		},
		"application/metalink+xml": {
			"source": "apache",
			"extensions": [
				"metalink"
			]
		},
		"application/metalink4+xml": {
			"source": "iana",
			"extensions": [
				"meta4"
			]
		},
		"application/mets+xml": {
			"source": "iana",
			"extensions": [
				"mets"
			]
		},
		"application/mf4": {
			"source": "iana"
		},
		"application/mikey": {
			"source": "iana"
		},
		"application/mods+xml": {
			"source": "iana",
			"extensions": [
				"mods"
			]
		},
		"application/moss-keys": {
			"source": "iana"
		},
		"application/moss-signature": {
			"source": "iana"
		},
		"application/mosskey-data": {
			"source": "iana"
		},
		"application/mosskey-request": {
			"source": "iana"
		},
		"application/mp21": {
			"source": "iana",
			"extensions": [
				"m21",
				"mp21"
			]
		},
		"application/mp4": {
			"source": "iana",
			"extensions": [
				"mp4s",
				"m4p"
			]
		},
		"application/mpeg4-generic": {
			"source": "iana"
		},
		"application/mpeg4-iod": {
			"source": "iana"
		},
		"application/mpeg4-iod-xmt": {
			"source": "iana"
		},
		"application/mrb-consumer+xml": {
			"source": "iana"
		},
		"application/mrb-publish+xml": {
			"source": "iana"
		},
		"application/msc-ivr+xml": {
			"source": "iana"
		},
		"application/msc-mixer+xml": {
			"source": "iana"
		},
		"application/msword": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"doc",
				"dot"
			]
		},
		"application/mxf": {
			"source": "iana",
			"extensions": [
				"mxf"
			]
		},
		"application/nasdata": {
			"source": "iana"
		},
		"application/news-checkgroups": {
			"source": "iana"
		},
		"application/news-groupinfo": {
			"source": "iana"
		},
		"application/news-transmission": {
			"source": "iana"
		},
		"application/nlsml+xml": {
			"source": "iana"
		},
		"application/nss": {
			"source": "iana"
		},
		"application/ocsp-request": {
			"source": "iana"
		},
		"application/ocsp-response": {
			"source": "iana"
		},
		"application/octet-stream": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"bin",
				"dms",
				"lrf",
				"mar",
				"so",
				"dist",
				"distz",
				"pkg",
				"bpk",
				"dump",
				"elc",
				"deploy",
				"exe",
				"dll",
				"deb",
				"dmg",
				"iso",
				"img",
				"msi",
				"msp",
				"msm",
				"buffer"
			]
		},
		"application/oda": {
			"source": "iana",
			"extensions": [
				"oda"
			]
		},
		"application/odx": {
			"source": "iana"
		},
		"application/oebps-package+xml": {
			"source": "iana",
			"extensions": [
				"opf"
			]
		},
		"application/ogg": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"ogx"
			]
		},
		"application/omdoc+xml": {
			"source": "apache",
			"extensions": [
				"omdoc"
			]
		},
		"application/onenote": {
			"source": "apache",
			"extensions": [
				"onetoc",
				"onetoc2",
				"onetmp",
				"onepkg"
			]
		},
		"application/oxps": {
			"source": "iana",
			"extensions": [
				"oxps"
			]
		},
		"application/p2p-overlay+xml": {
			"source": "iana"
		},
		"application/parityfec": {
			"source": "iana"
		},
		"application/patch-ops-error+xml": {
			"source": "iana",
			"extensions": [
				"xer"
			]
		},
		"application/pdf": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"pdf"
			]
		},
		"application/pdx": {
			"source": "iana"
		},
		"application/pgp-encrypted": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"pgp"
			]
		},
		"application/pgp-keys": {
			"source": "iana"
		},
		"application/pgp-signature": {
			"source": "iana",
			"extensions": [
				"asc",
				"sig"
			]
		},
		"application/pics-rules": {
			"source": "apache",
			"extensions": [
				"prf"
			]
		},
		"application/pidf+xml": {
			"source": "iana"
		},
		"application/pidf-diff+xml": {
			"source": "iana"
		},
		"application/pkcs10": {
			"source": "iana",
			"extensions": [
				"p10"
			]
		},
		"application/pkcs12": {
			"source": "iana"
		},
		"application/pkcs7-mime": {
			"source": "iana",
			"extensions": [
				"p7m",
				"p7c"
			]
		},
		"application/pkcs7-signature": {
			"source": "iana",
			"extensions": [
				"p7s"
			]
		},
		"application/pkcs8": {
			"source": "iana",
			"extensions": [
				"p8"
			]
		},
		"application/pkix-attr-cert": {
			"source": "iana",
			"extensions": [
				"ac"
			]
		},
		"application/pkix-cert": {
			"source": "iana",
			"extensions": [
				"cer"
			]
		},
		"application/pkix-crl": {
			"source": "iana",
			"extensions": [
				"crl"
			]
		},
		"application/pkix-pkipath": {
			"source": "iana",
			"extensions": [
				"pkipath"
			]
		},
		"application/pkixcmp": {
			"source": "iana",
			"extensions": [
				"pki"
			]
		},
		"application/pls+xml": {
			"source": "iana",
			"extensions": [
				"pls"
			]
		},
		"application/poc-settings+xml": {
			"source": "iana"
		},
		"application/postscript": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"ai",
				"eps",
				"ps"
			]
		},
		"application/ppsp-tracker+json": {
			"source": "iana",
			"compressible": true
		},
		"application/problem+json": {
			"source": "iana",
			"compressible": true
		},
		"application/problem+xml": {
			"source": "iana"
		},
		"application/provenance+xml": {
			"source": "iana"
		},
		"application/prs.alvestrand.titrax-sheet": {
			"source": "iana"
		},
		"application/prs.cww": {
			"source": "iana",
			"extensions": [
				"cww"
			]
		},
		"application/prs.hpub+zip": {
			"source": "iana"
		},
		"application/prs.nprend": {
			"source": "iana"
		},
		"application/prs.plucker": {
			"source": "iana"
		},
		"application/prs.rdf-xml-crypt": {
			"source": "iana"
		},
		"application/prs.xsf+xml": {
			"source": "iana"
		},
		"application/pskc+xml": {
			"source": "iana",
			"extensions": [
				"pskcxml"
			]
		},
		"application/qsig": {
			"source": "iana"
		},
		"application/raptorfec": {
			"source": "iana"
		},
		"application/rdap+json": {
			"source": "iana",
			"compressible": true
		},
		"application/rdf+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"rdf"
			]
		},
		"application/reginfo+xml": {
			"source": "iana",
			"extensions": [
				"rif"
			]
		},
		"application/relax-ng-compact-syntax": {
			"source": "iana",
			"extensions": [
				"rnc"
			]
		},
		"application/remote-printing": {
			"source": "iana"
		},
		"application/reputon+json": {
			"source": "iana",
			"compressible": true
		},
		"application/resource-lists+xml": {
			"source": "iana",
			"extensions": [
				"rl"
			]
		},
		"application/resource-lists-diff+xml": {
			"source": "iana",
			"extensions": [
				"rld"
			]
		},
		"application/rfc+xml": {
			"source": "iana"
		},
		"application/riscos": {
			"source": "iana"
		},
		"application/rlmi+xml": {
			"source": "iana"
		},
		"application/rls-services+xml": {
			"source": "iana",
			"extensions": [
				"rs"
			]
		},
		"application/rpki-ghostbusters": {
			"source": "iana",
			"extensions": [
				"gbr"
			]
		},
		"application/rpki-manifest": {
			"source": "iana",
			"extensions": [
				"mft"
			]
		},
		"application/rpki-roa": {
			"source": "iana",
			"extensions": [
				"roa"
			]
		},
		"application/rpki-updown": {
			"source": "iana"
		},
		"application/rsd+xml": {
			"source": "apache",
			"extensions": [
				"rsd"
			]
		},
		"application/rss+xml": {
			"source": "apache",
			"compressible": true,
			"extensions": [
				"rss"
			]
		},
		"application/rtf": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"rtf"
			]
		},
		"application/rtploopback": {
			"source": "iana"
		},
		"application/rtx": {
			"source": "iana"
		},
		"application/samlassertion+xml": {
			"source": "iana"
		},
		"application/samlmetadata+xml": {
			"source": "iana"
		},
		"application/sbml+xml": {
			"source": "iana",
			"extensions": [
				"sbml"
			]
		},
		"application/scaip+xml": {
			"source": "iana"
		},
		"application/scim+json": {
			"source": "iana",
			"compressible": true
		},
		"application/scvp-cv-request": {
			"source": "iana",
			"extensions": [
				"scq"
			]
		},
		"application/scvp-cv-response": {
			"source": "iana",
			"extensions": [
				"scs"
			]
		},
		"application/scvp-vp-request": {
			"source": "iana",
			"extensions": [
				"spq"
			]
		},
		"application/scvp-vp-response": {
			"source": "iana",
			"extensions": [
				"spp"
			]
		},
		"application/sdp": {
			"source": "iana",
			"extensions": [
				"sdp"
			]
		},
		"application/sep+xml": {
			"source": "iana"
		},
		"application/sep-exi": {
			"source": "iana"
		},
		"application/session-info": {
			"source": "iana"
		},
		"application/set-payment": {
			"source": "iana"
		},
		"application/set-payment-initiation": {
			"source": "iana",
			"extensions": [
				"setpay"
			]
		},
		"application/set-registration": {
			"source": "iana"
		},
		"application/set-registration-initiation": {
			"source": "iana",
			"extensions": [
				"setreg"
			]
		},
		"application/sgml": {
			"source": "iana"
		},
		"application/sgml-open-catalog": {
			"source": "iana"
		},
		"application/shf+xml": {
			"source": "iana",
			"extensions": [
				"shf"
			]
		},
		"application/sieve": {
			"source": "iana"
		},
		"application/simple-filter+xml": {
			"source": "iana"
		},
		"application/simple-message-summary": {
			"source": "iana"
		},
		"application/simplesymbolcontainer": {
			"source": "iana"
		},
		"application/slate": {
			"source": "iana"
		},
		"application/smil": {
			"source": "iana"
		},
		"application/smil+xml": {
			"source": "iana",
			"extensions": [
				"smi",
				"smil"
			]
		},
		"application/smpte336m": {
			"source": "iana"
		},
		"application/soap+fastinfoset": {
			"source": "iana"
		},
		"application/soap+xml": {
			"source": "iana",
			"compressible": true
		},
		"application/sparql-query": {
			"source": "iana",
			"extensions": [
				"rq"
			]
		},
		"application/sparql-results+xml": {
			"source": "iana",
			"extensions": [
				"srx"
			]
		},
		"application/spirits-event+xml": {
			"source": "iana"
		},
		"application/sql": {
			"source": "iana"
		},
		"application/srgs": {
			"source": "iana",
			"extensions": [
				"gram"
			]
		},
		"application/srgs+xml": {
			"source": "iana",
			"extensions": [
				"grxml"
			]
		},
		"application/sru+xml": {
			"source": "iana",
			"extensions": [
				"sru"
			]
		},
		"application/ssdl+xml": {
			"source": "apache",
			"extensions": [
				"ssdl"
			]
		},
		"application/ssml+xml": {
			"source": "iana",
			"extensions": [
				"ssml"
			]
		},
		"application/tamp-apex-update": {
			"source": "iana"
		},
		"application/tamp-apex-update-confirm": {
			"source": "iana"
		},
		"application/tamp-community-update": {
			"source": "iana"
		},
		"application/tamp-community-update-confirm": {
			"source": "iana"
		},
		"application/tamp-error": {
			"source": "iana"
		},
		"application/tamp-sequence-adjust": {
			"source": "iana"
		},
		"application/tamp-sequence-adjust-confirm": {
			"source": "iana"
		},
		"application/tamp-status-query": {
			"source": "iana"
		},
		"application/tamp-status-response": {
			"source": "iana"
		},
		"application/tamp-update": {
			"source": "iana"
		},
		"application/tamp-update-confirm": {
			"source": "iana"
		},
		"application/tar": {
			"compressible": true
		},
		"application/tei+xml": {
			"source": "iana",
			"extensions": [
				"tei",
				"teicorpus"
			]
		},
		"application/thraud+xml": {
			"source": "iana",
			"extensions": [
				"tfi"
			]
		},
		"application/timestamp-query": {
			"source": "iana"
		},
		"application/timestamp-reply": {
			"source": "iana"
		},
		"application/timestamped-data": {
			"source": "iana",
			"extensions": [
				"tsd"
			]
		},
		"application/ttml+xml": {
			"source": "iana"
		},
		"application/tve-trigger": {
			"source": "iana"
		},
		"application/ulpfec": {
			"source": "iana"
		},
		"application/urc-grpsheet+xml": {
			"source": "iana"
		},
		"application/urc-ressheet+xml": {
			"source": "iana"
		},
		"application/urc-targetdesc+xml": {
			"source": "iana"
		},
		"application/urc-uisocketdesc+xml": {
			"source": "iana"
		},
		"application/vcard+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vcard+xml": {
			"source": "iana"
		},
		"application/vemmi": {
			"source": "iana"
		},
		"application/vividence.scriptfile": {
			"source": "apache"
		},
		"application/vnd.3gpp-prose+xml": {
			"source": "iana"
		},
		"application/vnd.3gpp-prose-pc3ch+xml": {
			"source": "iana"
		},
		"application/vnd.3gpp.access-transfer-events+xml": {
			"source": "iana"
		},
		"application/vnd.3gpp.bsf+xml": {
			"source": "iana"
		},
		"application/vnd.3gpp.mid-call+xml": {
			"source": "iana"
		},
		"application/vnd.3gpp.pic-bw-large": {
			"source": "iana",
			"extensions": [
				"plb"
			]
		},
		"application/vnd.3gpp.pic-bw-small": {
			"source": "iana",
			"extensions": [
				"psb"
			]
		},
		"application/vnd.3gpp.pic-bw-var": {
			"source": "iana",
			"extensions": [
				"pvb"
			]
		},
		"application/vnd.3gpp.sms": {
			"source": "iana"
		},
		"application/vnd.3gpp.srvcc-ext+xml": {
			"source": "iana"
		},
		"application/vnd.3gpp.srvcc-info+xml": {
			"source": "iana"
		},
		"application/vnd.3gpp.state-and-event-info+xml": {
			"source": "iana"
		},
		"application/vnd.3gpp.ussd+xml": {
			"source": "iana"
		},
		"application/vnd.3gpp2.bcmcsinfo+xml": {
			"source": "iana"
		},
		"application/vnd.3gpp2.sms": {
			"source": "iana"
		},
		"application/vnd.3gpp2.tcap": {
			"source": "iana",
			"extensions": [
				"tcap"
			]
		},
		"application/vnd.3m.post-it-notes": {
			"source": "iana",
			"extensions": [
				"pwn"
			]
		},
		"application/vnd.accpac.simply.aso": {
			"source": "iana",
			"extensions": [
				"aso"
			]
		},
		"application/vnd.accpac.simply.imp": {
			"source": "iana",
			"extensions": [
				"imp"
			]
		},
		"application/vnd.acucobol": {
			"source": "iana",
			"extensions": [
				"acu"
			]
		},
		"application/vnd.acucorp": {
			"source": "iana",
			"extensions": [
				"atc",
				"acutc"
			]
		},
		"application/vnd.adobe.air-application-installer-package+zip": {
			"source": "apache",
			"extensions": [
				"air"
			]
		},
		"application/vnd.adobe.flash.movie": {
			"source": "iana"
		},
		"application/vnd.adobe.formscentral.fcdt": {
			"source": "iana",
			"extensions": [
				"fcdt"
			]
		},
		"application/vnd.adobe.fxp": {
			"source": "iana",
			"extensions": [
				"fxp",
				"fxpl"
			]
		},
		"application/vnd.adobe.partial-upload": {
			"source": "iana"
		},
		"application/vnd.adobe.xdp+xml": {
			"source": "iana",
			"extensions": [
				"xdp"
			]
		},
		"application/vnd.adobe.xfdf": {
			"source": "iana",
			"extensions": [
				"xfdf"
			]
		},
		"application/vnd.aether.imp": {
			"source": "iana"
		},
		"application/vnd.ah-barcode": {
			"source": "iana"
		},
		"application/vnd.ahead.space": {
			"source": "iana",
			"extensions": [
				"ahead"
			]
		},
		"application/vnd.airzip.filesecure.azf": {
			"source": "iana",
			"extensions": [
				"azf"
			]
		},
		"application/vnd.airzip.filesecure.azs": {
			"source": "iana",
			"extensions": [
				"azs"
			]
		},
		"application/vnd.amazon.ebook": {
			"source": "apache",
			"extensions": [
				"azw"
			]
		},
		"application/vnd.americandynamics.acc": {
			"source": "iana",
			"extensions": [
				"acc"
			]
		},
		"application/vnd.amiga.ami": {
			"source": "iana",
			"extensions": [
				"ami"
			]
		},
		"application/vnd.amundsen.maze+xml": {
			"source": "iana"
		},
		"application/vnd.android.package-archive": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"apk"
			]
		},
		"application/vnd.anki": {
			"source": "iana"
		},
		"application/vnd.anser-web-certificate-issue-initiation": {
			"source": "iana",
			"extensions": [
				"cii"
			]
		},
		"application/vnd.anser-web-funds-transfer-initiation": {
			"source": "apache",
			"extensions": [
				"fti"
			]
		},
		"application/vnd.antix.game-component": {
			"source": "iana",
			"extensions": [
				"atx"
			]
		},
		"application/vnd.apache.thrift.binary": {
			"source": "iana"
		},
		"application/vnd.apache.thrift.compact": {
			"source": "iana"
		},
		"application/vnd.apache.thrift.json": {
			"source": "iana"
		},
		"application/vnd.api+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.apple.installer+xml": {
			"source": "iana",
			"extensions": [
				"mpkg"
			]
		},
		"application/vnd.apple.mpegurl": {
			"source": "iana",
			"extensions": [
				"m3u8"
			]
		},
		"application/vnd.apple.pkpass": {
			"compressible": false,
			"extensions": [
				"pkpass"
			]
		},
		"application/vnd.arastra.swi": {
			"source": "iana"
		},
		"application/vnd.aristanetworks.swi": {
			"source": "iana",
			"extensions": [
				"swi"
			]
		},
		"application/vnd.artsquare": {
			"source": "iana"
		},
		"application/vnd.astraea-software.iota": {
			"source": "iana",
			"extensions": [
				"iota"
			]
		},
		"application/vnd.audiograph": {
			"source": "iana",
			"extensions": [
				"aep"
			]
		},
		"application/vnd.autopackage": {
			"source": "iana"
		},
		"application/vnd.avistar+xml": {
			"source": "iana"
		},
		"application/vnd.balsamiq.bmml+xml": {
			"source": "iana"
		},
		"application/vnd.balsamiq.bmpr": {
			"source": "iana"
		},
		"application/vnd.bekitzur-stech+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.biopax.rdf+xml": {
			"source": "iana"
		},
		"application/vnd.blueice.multipass": {
			"source": "iana",
			"extensions": [
				"mpm"
			]
		},
		"application/vnd.bluetooth.ep.oob": {
			"source": "iana"
		},
		"application/vnd.bluetooth.le.oob": {
			"source": "iana"
		},
		"application/vnd.bmi": {
			"source": "iana",
			"extensions": [
				"bmi"
			]
		},
		"application/vnd.businessobjects": {
			"source": "iana",
			"extensions": [
				"rep"
			]
		},
		"application/vnd.cab-jscript": {
			"source": "iana"
		},
		"application/vnd.canon-cpdl": {
			"source": "iana"
		},
		"application/vnd.canon-lips": {
			"source": "iana"
		},
		"application/vnd.cendio.thinlinc.clientconf": {
			"source": "iana"
		},
		"application/vnd.century-systems.tcp_stream": {
			"source": "iana"
		},
		"application/vnd.chemdraw+xml": {
			"source": "iana",
			"extensions": [
				"cdxml"
			]
		},
		"application/vnd.chipnuts.karaoke-mmd": {
			"source": "iana",
			"extensions": [
				"mmd"
			]
		},
		"application/vnd.cinderella": {
			"source": "iana",
			"extensions": [
				"cdy"
			]
		},
		"application/vnd.cirpack.isdn-ext": {
			"source": "iana"
		},
		"application/vnd.citationstyles.style+xml": {
			"source": "iana"
		},
		"application/vnd.claymore": {
			"source": "iana",
			"extensions": [
				"cla"
			]
		},
		"application/vnd.cloanto.rp9": {
			"source": "iana",
			"extensions": [
				"rp9"
			]
		},
		"application/vnd.clonk.c4group": {
			"source": "iana",
			"extensions": [
				"c4g",
				"c4d",
				"c4f",
				"c4p",
				"c4u"
			]
		},
		"application/vnd.cluetrust.cartomobile-config": {
			"source": "iana",
			"extensions": [
				"c11amc"
			]
		},
		"application/vnd.cluetrust.cartomobile-config-pkg": {
			"source": "iana",
			"extensions": [
				"c11amz"
			]
		},
		"application/vnd.coffeescript": {
			"source": "iana"
		},
		"application/vnd.collection+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.collection.doc+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.collection.next+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.commerce-battelle": {
			"source": "iana"
		},
		"application/vnd.commonspace": {
			"source": "iana",
			"extensions": [
				"csp"
			]
		},
		"application/vnd.contact.cmsg": {
			"source": "iana",
			"extensions": [
				"cdbcmsg"
			]
		},
		"application/vnd.cosmocaller": {
			"source": "iana",
			"extensions": [
				"cmc"
			]
		},
		"application/vnd.crick.clicker": {
			"source": "iana",
			"extensions": [
				"clkx"
			]
		},
		"application/vnd.crick.clicker.keyboard": {
			"source": "iana",
			"extensions": [
				"clkk"
			]
		},
		"application/vnd.crick.clicker.palette": {
			"source": "iana",
			"extensions": [
				"clkp"
			]
		},
		"application/vnd.crick.clicker.template": {
			"source": "iana",
			"extensions": [
				"clkt"
			]
		},
		"application/vnd.crick.clicker.wordbank": {
			"source": "iana",
			"extensions": [
				"clkw"
			]
		},
		"application/vnd.criticaltools.wbs+xml": {
			"source": "iana",
			"extensions": [
				"wbs"
			]
		},
		"application/vnd.ctc-posml": {
			"source": "iana",
			"extensions": [
				"pml"
			]
		},
		"application/vnd.ctct.ws+xml": {
			"source": "iana"
		},
		"application/vnd.cups-pdf": {
			"source": "iana"
		},
		"application/vnd.cups-postscript": {
			"source": "iana"
		},
		"application/vnd.cups-ppd": {
			"source": "iana",
			"extensions": [
				"ppd"
			]
		},
		"application/vnd.cups-raster": {
			"source": "iana"
		},
		"application/vnd.cups-raw": {
			"source": "iana"
		},
		"application/vnd.curl": {
			"source": "iana"
		},
		"application/vnd.curl.car": {
			"source": "apache",
			"extensions": [
				"car"
			]
		},
		"application/vnd.curl.pcurl": {
			"source": "apache",
			"extensions": [
				"pcurl"
			]
		},
		"application/vnd.cyan.dean.root+xml": {
			"source": "iana"
		},
		"application/vnd.cybank": {
			"source": "iana"
		},
		"application/vnd.dart": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"dart"
			]
		},
		"application/vnd.data-vision.rdz": {
			"source": "iana",
			"extensions": [
				"rdz"
			]
		},
		"application/vnd.debian.binary-package": {
			"source": "iana"
		},
		"application/vnd.dece.data": {
			"source": "iana",
			"extensions": [
				"uvf",
				"uvvf",
				"uvd",
				"uvvd"
			]
		},
		"application/vnd.dece.ttml+xml": {
			"source": "iana",
			"extensions": [
				"uvt",
				"uvvt"
			]
		},
		"application/vnd.dece.unspecified": {
			"source": "iana",
			"extensions": [
				"uvx",
				"uvvx"
			]
		},
		"application/vnd.dece.zip": {
			"source": "iana",
			"extensions": [
				"uvz",
				"uvvz"
			]
		},
		"application/vnd.denovo.fcselayout-link": {
			"source": "iana",
			"extensions": [
				"fe_launch"
			]
		},
		"application/vnd.desmume-movie": {
			"source": "iana"
		},
		"application/vnd.dir-bi.plate-dl-nosuffix": {
			"source": "iana"
		},
		"application/vnd.dm.delegation+xml": {
			"source": "iana"
		},
		"application/vnd.dna": {
			"source": "iana",
			"extensions": [
				"dna"
			]
		},
		"application/vnd.document+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.dolby.mlp": {
			"source": "apache",
			"extensions": [
				"mlp"
			]
		},
		"application/vnd.dolby.mobile.1": {
			"source": "iana"
		},
		"application/vnd.dolby.mobile.2": {
			"source": "iana"
		},
		"application/vnd.doremir.scorecloud-binary-document": {
			"source": "iana"
		},
		"application/vnd.dpgraph": {
			"source": "iana",
			"extensions": [
				"dpg"
			]
		},
		"application/vnd.dreamfactory": {
			"source": "iana",
			"extensions": [
				"dfac"
			]
		},
		"application/vnd.drive+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ds-keypoint": {
			"source": "apache",
			"extensions": [
				"kpxx"
			]
		},
		"application/vnd.dtg.local": {
			"source": "iana"
		},
		"application/vnd.dtg.local.flash": {
			"source": "iana"
		},
		"application/vnd.dtg.local.html": {
			"source": "iana"
		},
		"application/vnd.dvb.ait": {
			"source": "iana",
			"extensions": [
				"ait"
			]
		},
		"application/vnd.dvb.dvbj": {
			"source": "iana"
		},
		"application/vnd.dvb.esgcontainer": {
			"source": "iana"
		},
		"application/vnd.dvb.ipdcdftnotifaccess": {
			"source": "iana"
		},
		"application/vnd.dvb.ipdcesgaccess": {
			"source": "iana"
		},
		"application/vnd.dvb.ipdcesgaccess2": {
			"source": "iana"
		},
		"application/vnd.dvb.ipdcesgpdd": {
			"source": "iana"
		},
		"application/vnd.dvb.ipdcroaming": {
			"source": "iana"
		},
		"application/vnd.dvb.iptv.alfec-base": {
			"source": "iana"
		},
		"application/vnd.dvb.iptv.alfec-enhancement": {
			"source": "iana"
		},
		"application/vnd.dvb.notif-aggregate-root+xml": {
			"source": "iana"
		},
		"application/vnd.dvb.notif-container+xml": {
			"source": "iana"
		},
		"application/vnd.dvb.notif-generic+xml": {
			"source": "iana"
		},
		"application/vnd.dvb.notif-ia-msglist+xml": {
			"source": "iana"
		},
		"application/vnd.dvb.notif-ia-registration-request+xml": {
			"source": "iana"
		},
		"application/vnd.dvb.notif-ia-registration-response+xml": {
			"source": "iana"
		},
		"application/vnd.dvb.notif-init+xml": {
			"source": "iana"
		},
		"application/vnd.dvb.pfr": {
			"source": "iana"
		},
		"application/vnd.dvb.service": {
			"source": "iana",
			"extensions": [
				"svc"
			]
		},
		"application/vnd.dxr": {
			"source": "iana"
		},
		"application/vnd.dynageo": {
			"source": "iana",
			"extensions": [
				"geo"
			]
		},
		"application/vnd.dzr": {
			"source": "iana"
		},
		"application/vnd.easykaraoke.cdgdownload": {
			"source": "iana"
		},
		"application/vnd.ecdis-update": {
			"source": "iana"
		},
		"application/vnd.ecowin.chart": {
			"source": "iana",
			"extensions": [
				"mag"
			]
		},
		"application/vnd.ecowin.filerequest": {
			"source": "iana"
		},
		"application/vnd.ecowin.fileupdate": {
			"source": "iana"
		},
		"application/vnd.ecowin.series": {
			"source": "iana"
		},
		"application/vnd.ecowin.seriesrequest": {
			"source": "iana"
		},
		"application/vnd.ecowin.seriesupdate": {
			"source": "iana"
		},
		"application/vnd.emclient.accessrequest+xml": {
			"source": "iana"
		},
		"application/vnd.enliven": {
			"source": "iana",
			"extensions": [
				"nml"
			]
		},
		"application/vnd.enphase.envoy": {
			"source": "iana"
		},
		"application/vnd.eprints.data+xml": {
			"source": "iana"
		},
		"application/vnd.epson.esf": {
			"source": "iana",
			"extensions": [
				"esf"
			]
		},
		"application/vnd.epson.msf": {
			"source": "iana",
			"extensions": [
				"msf"
			]
		},
		"application/vnd.epson.quickanime": {
			"source": "iana",
			"extensions": [
				"qam"
			]
		},
		"application/vnd.epson.salt": {
			"source": "iana",
			"extensions": [
				"slt"
			]
		},
		"application/vnd.epson.ssf": {
			"source": "iana",
			"extensions": [
				"ssf"
			]
		},
		"application/vnd.ericsson.quickcall": {
			"source": "iana"
		},
		"application/vnd.eszigno3+xml": {
			"source": "iana",
			"extensions": [
				"es3",
				"et3"
			]
		},
		"application/vnd.etsi.aoc+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.asic-e+zip": {
			"source": "iana"
		},
		"application/vnd.etsi.asic-s+zip": {
			"source": "iana"
		},
		"application/vnd.etsi.cug+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.iptvcommand+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.iptvdiscovery+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.iptvprofile+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.iptvsad-bc+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.iptvsad-cod+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.iptvsad-npvr+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.iptvservice+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.iptvsync+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.iptvueprofile+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.mcid+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.mheg5": {
			"source": "iana"
		},
		"application/vnd.etsi.overload-control-policy-dataset+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.pstn+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.sci+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.simservs+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.timestamp-token": {
			"source": "iana"
		},
		"application/vnd.etsi.tsl+xml": {
			"source": "iana"
		},
		"application/vnd.etsi.tsl.der": {
			"source": "iana"
		},
		"application/vnd.eudora.data": {
			"source": "iana"
		},
		"application/vnd.ezpix-album": {
			"source": "iana",
			"extensions": [
				"ez2"
			]
		},
		"application/vnd.ezpix-package": {
			"source": "iana",
			"extensions": [
				"ez3"
			]
		},
		"application/vnd.f-secure.mobile": {
			"source": "iana"
		},
		"application/vnd.fastcopy-disk-image": {
			"source": "iana"
		},
		"application/vnd.fdf": {
			"source": "iana",
			"extensions": [
				"fdf"
			]
		},
		"application/vnd.fdsn.mseed": {
			"source": "iana",
			"extensions": [
				"mseed"
			]
		},
		"application/vnd.fdsn.seed": {
			"source": "iana",
			"extensions": [
				"seed",
				"dataless"
			]
		},
		"application/vnd.ffsns": {
			"source": "iana"
		},
		"application/vnd.filmit.zfc": {
			"source": "iana"
		},
		"application/vnd.fints": {
			"source": "iana"
		},
		"application/vnd.firemonkeys.cloudcell": {
			"source": "iana"
		},
		"application/vnd.flographit": {
			"source": "iana",
			"extensions": [
				"gph"
			]
		},
		"application/vnd.fluxtime.clip": {
			"source": "iana",
			"extensions": [
				"ftc"
			]
		},
		"application/vnd.font-fontforge-sfd": {
			"source": "iana"
		},
		"application/vnd.framemaker": {
			"source": "iana",
			"extensions": [
				"fm",
				"frame",
				"maker",
				"book"
			]
		},
		"application/vnd.frogans.fnc": {
			"source": "iana",
			"extensions": [
				"fnc"
			]
		},
		"application/vnd.frogans.ltf": {
			"source": "iana",
			"extensions": [
				"ltf"
			]
		},
		"application/vnd.fsc.weblaunch": {
			"source": "iana",
			"extensions": [
				"fsc"
			]
		},
		"application/vnd.fujitsu.oasys": {
			"source": "iana",
			"extensions": [
				"oas"
			]
		},
		"application/vnd.fujitsu.oasys2": {
			"source": "iana",
			"extensions": [
				"oa2"
			]
		},
		"application/vnd.fujitsu.oasys3": {
			"source": "iana",
			"extensions": [
				"oa3"
			]
		},
		"application/vnd.fujitsu.oasysgp": {
			"source": "iana",
			"extensions": [
				"fg5"
			]
		},
		"application/vnd.fujitsu.oasysprs": {
			"source": "iana",
			"extensions": [
				"bh2"
			]
		},
		"application/vnd.fujixerox.art-ex": {
			"source": "iana"
		},
		"application/vnd.fujixerox.art4": {
			"source": "iana"
		},
		"application/vnd.fujixerox.ddd": {
			"source": "iana",
			"extensions": [
				"ddd"
			]
		},
		"application/vnd.fujixerox.docuworks": {
			"source": "iana",
			"extensions": [
				"xdw"
			]
		},
		"application/vnd.fujixerox.docuworks.binder": {
			"source": "iana",
			"extensions": [
				"xbd"
			]
		},
		"application/vnd.fujixerox.docuworks.container": {
			"source": "iana"
		},
		"application/vnd.fujixerox.hbpl": {
			"source": "iana"
		},
		"application/vnd.fut-misnet": {
			"source": "iana"
		},
		"application/vnd.fuzzysheet": {
			"source": "iana",
			"extensions": [
				"fzs"
			]
		},
		"application/vnd.genomatix.tuxedo": {
			"source": "iana",
			"extensions": [
				"txd"
			]
		},
		"application/vnd.geo+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.geocube+xml": {
			"source": "iana"
		},
		"application/vnd.geogebra.file": {
			"source": "iana",
			"extensions": [
				"ggb"
			]
		},
		"application/vnd.geogebra.tool": {
			"source": "iana",
			"extensions": [
				"ggt"
			]
		},
		"application/vnd.geometry-explorer": {
			"source": "iana",
			"extensions": [
				"gex",
				"gre"
			]
		},
		"application/vnd.geonext": {
			"source": "iana",
			"extensions": [
				"gxt"
			]
		},
		"application/vnd.geoplan": {
			"source": "iana",
			"extensions": [
				"g2w"
			]
		},
		"application/vnd.geospace": {
			"source": "iana",
			"extensions": [
				"g3w"
			]
		},
		"application/vnd.gerber": {
			"source": "iana"
		},
		"application/vnd.globalplatform.card-content-mgt": {
			"source": "iana"
		},
		"application/vnd.globalplatform.card-content-mgt-response": {
			"source": "iana"
		},
		"application/vnd.gmx": {
			"source": "iana",
			"extensions": [
				"gmx"
			]
		},
		"application/vnd.google-apps.document": {
			"compressible": false,
			"extensions": [
				"gdoc"
			]
		},
		"application/vnd.google-apps.presentation": {
			"compressible": false,
			"extensions": [
				"gslides"
			]
		},
		"application/vnd.google-apps.spreadsheet": {
			"compressible": false,
			"extensions": [
				"gsheet"
			]
		},
		"application/vnd.google-earth.kml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"kml"
			]
		},
		"application/vnd.google-earth.kmz": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"kmz"
			]
		},
		"application/vnd.gov.sk.e-form+xml": {
			"source": "iana"
		},
		"application/vnd.gov.sk.e-form+zip": {
			"source": "iana"
		},
		"application/vnd.gov.sk.xmldatacontainer+xml": {
			"source": "iana"
		},
		"application/vnd.grafeq": {
			"source": "iana",
			"extensions": [
				"gqf",
				"gqs"
			]
		},
		"application/vnd.gridmp": {
			"source": "iana"
		},
		"application/vnd.groove-account": {
			"source": "iana",
			"extensions": [
				"gac"
			]
		},
		"application/vnd.groove-help": {
			"source": "iana",
			"extensions": [
				"ghf"
			]
		},
		"application/vnd.groove-identity-message": {
			"source": "iana",
			"extensions": [
				"gim"
			]
		},
		"application/vnd.groove-injector": {
			"source": "iana",
			"extensions": [
				"grv"
			]
		},
		"application/vnd.groove-tool-message": {
			"source": "iana",
			"extensions": [
				"gtm"
			]
		},
		"application/vnd.groove-tool-template": {
			"source": "iana",
			"extensions": [
				"tpl"
			]
		},
		"application/vnd.groove-vcard": {
			"source": "iana",
			"extensions": [
				"vcg"
			]
		},
		"application/vnd.hal+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.hal+xml": {
			"source": "iana",
			"extensions": [
				"hal"
			]
		},
		"application/vnd.handheld-entertainment+xml": {
			"source": "iana",
			"extensions": [
				"zmm"
			]
		},
		"application/vnd.hbci": {
			"source": "iana",
			"extensions": [
				"hbci"
			]
		},
		"application/vnd.hcl-bireports": {
			"source": "iana"
		},
		"application/vnd.hdt": {
			"source": "iana"
		},
		"application/vnd.heroku+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.hhe.lesson-player": {
			"source": "iana",
			"extensions": [
				"les"
			]
		},
		"application/vnd.hp-hpgl": {
			"source": "iana",
			"extensions": [
				"hpgl"
			]
		},
		"application/vnd.hp-hpid": {
			"source": "iana",
			"extensions": [
				"hpid"
			]
		},
		"application/vnd.hp-hps": {
			"source": "iana",
			"extensions": [
				"hps"
			]
		},
		"application/vnd.hp-jlyt": {
			"source": "iana",
			"extensions": [
				"jlt"
			]
		},
		"application/vnd.hp-pcl": {
			"source": "iana",
			"extensions": [
				"pcl"
			]
		},
		"application/vnd.hp-pclxl": {
			"source": "iana",
			"extensions": [
				"pclxl"
			]
		},
		"application/vnd.httphone": {
			"source": "iana"
		},
		"application/vnd.hydrostatix.sof-data": {
			"source": "iana",
			"extensions": [
				"sfd-hdstx"
			]
		},
		"application/vnd.hyperdrive+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.hzn-3d-crossword": {
			"source": "iana"
		},
		"application/vnd.ibm.afplinedata": {
			"source": "iana"
		},
		"application/vnd.ibm.electronic-media": {
			"source": "iana"
		},
		"application/vnd.ibm.minipay": {
			"source": "iana",
			"extensions": [
				"mpy"
			]
		},
		"application/vnd.ibm.modcap": {
			"source": "iana",
			"extensions": [
				"afp",
				"listafp",
				"list3820"
			]
		},
		"application/vnd.ibm.rights-management": {
			"source": "iana",
			"extensions": [
				"irm"
			]
		},
		"application/vnd.ibm.secure-container": {
			"source": "iana",
			"extensions": [
				"sc"
			]
		},
		"application/vnd.iccprofile": {
			"source": "iana",
			"extensions": [
				"icc",
				"icm"
			]
		},
		"application/vnd.ieee.1905": {
			"source": "iana"
		},
		"application/vnd.igloader": {
			"source": "iana",
			"extensions": [
				"igl"
			]
		},
		"application/vnd.immervision-ivp": {
			"source": "iana",
			"extensions": [
				"ivp"
			]
		},
		"application/vnd.immervision-ivu": {
			"source": "iana",
			"extensions": [
				"ivu"
			]
		},
		"application/vnd.ims.imsccv1p1": {
			"source": "iana"
		},
		"application/vnd.ims.imsccv1p2": {
			"source": "iana"
		},
		"application/vnd.ims.imsccv1p3": {
			"source": "iana"
		},
		"application/vnd.ims.lis.v2.result+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ims.lti.v2.toolconsumerprofile+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ims.lti.v2.toolproxy+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ims.lti.v2.toolproxy.id+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ims.lti.v2.toolsettings+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.ims.lti.v2.toolsettings.simple+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.informedcontrol.rms+xml": {
			"source": "iana"
		},
		"application/vnd.informix-visionary": {
			"source": "iana"
		},
		"application/vnd.infotech.project": {
			"source": "iana"
		},
		"application/vnd.infotech.project+xml": {
			"source": "iana"
		},
		"application/vnd.innopath.wamp.notification": {
			"source": "iana"
		},
		"application/vnd.insors.igm": {
			"source": "iana",
			"extensions": [
				"igm"
			]
		},
		"application/vnd.intercon.formnet": {
			"source": "iana",
			"extensions": [
				"xpw",
				"xpx"
			]
		},
		"application/vnd.intergeo": {
			"source": "iana",
			"extensions": [
				"i2g"
			]
		},
		"application/vnd.intertrust.digibox": {
			"source": "iana"
		},
		"application/vnd.intertrust.nncp": {
			"source": "iana"
		},
		"application/vnd.intu.qbo": {
			"source": "iana",
			"extensions": [
				"qbo"
			]
		},
		"application/vnd.intu.qfx": {
			"source": "iana",
			"extensions": [
				"qfx"
			]
		},
		"application/vnd.iptc.g2.catalogitem+xml": {
			"source": "iana"
		},
		"application/vnd.iptc.g2.conceptitem+xml": {
			"source": "iana"
		},
		"application/vnd.iptc.g2.knowledgeitem+xml": {
			"source": "iana"
		},
		"application/vnd.iptc.g2.newsitem+xml": {
			"source": "iana"
		},
		"application/vnd.iptc.g2.newsmessage+xml": {
			"source": "iana"
		},
		"application/vnd.iptc.g2.packageitem+xml": {
			"source": "iana"
		},
		"application/vnd.iptc.g2.planningitem+xml": {
			"source": "iana"
		},
		"application/vnd.ipunplugged.rcprofile": {
			"source": "iana",
			"extensions": [
				"rcprofile"
			]
		},
		"application/vnd.irepository.package+xml": {
			"source": "iana",
			"extensions": [
				"irp"
			]
		},
		"application/vnd.is-xpr": {
			"source": "iana",
			"extensions": [
				"xpr"
			]
		},
		"application/vnd.isac.fcs": {
			"source": "iana",
			"extensions": [
				"fcs"
			]
		},
		"application/vnd.jam": {
			"source": "iana",
			"extensions": [
				"jam"
			]
		},
		"application/vnd.japannet-directory-service": {
			"source": "iana"
		},
		"application/vnd.japannet-jpnstore-wakeup": {
			"source": "iana"
		},
		"application/vnd.japannet-payment-wakeup": {
			"source": "iana"
		},
		"application/vnd.japannet-registration": {
			"source": "iana"
		},
		"application/vnd.japannet-registration-wakeup": {
			"source": "iana"
		},
		"application/vnd.japannet-setstore-wakeup": {
			"source": "iana"
		},
		"application/vnd.japannet-verification": {
			"source": "iana"
		},
		"application/vnd.japannet-verification-wakeup": {
			"source": "iana"
		},
		"application/vnd.jcp.javame.midlet-rms": {
			"source": "iana",
			"extensions": [
				"rms"
			]
		},
		"application/vnd.jisp": {
			"source": "iana",
			"extensions": [
				"jisp"
			]
		},
		"application/vnd.joost.joda-archive": {
			"source": "iana",
			"extensions": [
				"joda"
			]
		},
		"application/vnd.jsk.isdn-ngn": {
			"source": "iana"
		},
		"application/vnd.kahootz": {
			"source": "iana",
			"extensions": [
				"ktz",
				"ktr"
			]
		},
		"application/vnd.kde.karbon": {
			"source": "iana",
			"extensions": [
				"karbon"
			]
		},
		"application/vnd.kde.kchart": {
			"source": "iana",
			"extensions": [
				"chrt"
			]
		},
		"application/vnd.kde.kformula": {
			"source": "iana",
			"extensions": [
				"kfo"
			]
		},
		"application/vnd.kde.kivio": {
			"source": "iana",
			"extensions": [
				"flw"
			]
		},
		"application/vnd.kde.kontour": {
			"source": "iana",
			"extensions": [
				"kon"
			]
		},
		"application/vnd.kde.kpresenter": {
			"source": "iana",
			"extensions": [
				"kpr",
				"kpt"
			]
		},
		"application/vnd.kde.kspread": {
			"source": "iana",
			"extensions": [
				"ksp"
			]
		},
		"application/vnd.kde.kword": {
			"source": "iana",
			"extensions": [
				"kwd",
				"kwt"
			]
		},
		"application/vnd.kenameaapp": {
			"source": "iana",
			"extensions": [
				"htke"
			]
		},
		"application/vnd.kidspiration": {
			"source": "iana",
			"extensions": [
				"kia"
			]
		},
		"application/vnd.kinar": {
			"source": "iana",
			"extensions": [
				"kne",
				"knp"
			]
		},
		"application/vnd.koan": {
			"source": "iana",
			"extensions": [
				"skp",
				"skd",
				"skt",
				"skm"
			]
		},
		"application/vnd.kodak-descriptor": {
			"source": "iana",
			"extensions": [
				"sse"
			]
		},
		"application/vnd.las.las+xml": {
			"source": "iana",
			"extensions": [
				"lasxml"
			]
		},
		"application/vnd.liberty-request+xml": {
			"source": "iana"
		},
		"application/vnd.llamagraphics.life-balance.desktop": {
			"source": "iana",
			"extensions": [
				"lbd"
			]
		},
		"application/vnd.llamagraphics.life-balance.exchange+xml": {
			"source": "iana",
			"extensions": [
				"lbe"
			]
		},
		"application/vnd.lotus-1-2-3": {
			"source": "iana",
			"extensions": [
				"123"
			]
		},
		"application/vnd.lotus-approach": {
			"source": "iana",
			"extensions": [
				"apr"
			]
		},
		"application/vnd.lotus-freelance": {
			"source": "iana",
			"extensions": [
				"pre"
			]
		},
		"application/vnd.lotus-notes": {
			"source": "iana",
			"extensions": [
				"nsf"
			]
		},
		"application/vnd.lotus-organizer": {
			"source": "iana",
			"extensions": [
				"org"
			]
		},
		"application/vnd.lotus-screencam": {
			"source": "iana",
			"extensions": [
				"scm"
			]
		},
		"application/vnd.lotus-wordpro": {
			"source": "iana",
			"extensions": [
				"lwp"
			]
		},
		"application/vnd.macports.portpkg": {
			"source": "iana",
			"extensions": [
				"portpkg"
			]
		},
		"application/vnd.mapbox-vector-tile": {
			"source": "iana"
		},
		"application/vnd.marlin.drm.actiontoken+xml": {
			"source": "iana"
		},
		"application/vnd.marlin.drm.conftoken+xml": {
			"source": "iana"
		},
		"application/vnd.marlin.drm.license+xml": {
			"source": "iana"
		},
		"application/vnd.marlin.drm.mdcf": {
			"source": "iana"
		},
		"application/vnd.mason+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.maxmind.maxmind-db": {
			"source": "iana"
		},
		"application/vnd.mcd": {
			"source": "iana",
			"extensions": [
				"mcd"
			]
		},
		"application/vnd.medcalcdata": {
			"source": "iana",
			"extensions": [
				"mc1"
			]
		},
		"application/vnd.mediastation.cdkey": {
			"source": "iana",
			"extensions": [
				"cdkey"
			]
		},
		"application/vnd.meridian-slingshot": {
			"source": "iana"
		},
		"application/vnd.mfer": {
			"source": "iana",
			"extensions": [
				"mwf"
			]
		},
		"application/vnd.mfmp": {
			"source": "iana",
			"extensions": [
				"mfm"
			]
		},
		"application/vnd.micro+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.micrografx.flo": {
			"source": "iana",
			"extensions": [
				"flo"
			]
		},
		"application/vnd.micrografx.igx": {
			"source": "iana",
			"extensions": [
				"igx"
			]
		},
		"application/vnd.microsoft.portable-executable": {
			"source": "iana"
		},
		"application/vnd.miele+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.mif": {
			"source": "iana",
			"extensions": [
				"mif"
			]
		},
		"application/vnd.minisoft-hp3000-save": {
			"source": "iana"
		},
		"application/vnd.mitsubishi.misty-guard.trustweb": {
			"source": "iana"
		},
		"application/vnd.mobius.daf": {
			"source": "iana",
			"extensions": [
				"daf"
			]
		},
		"application/vnd.mobius.dis": {
			"source": "iana",
			"extensions": [
				"dis"
			]
		},
		"application/vnd.mobius.mbk": {
			"source": "iana",
			"extensions": [
				"mbk"
			]
		},
		"application/vnd.mobius.mqy": {
			"source": "iana",
			"extensions": [
				"mqy"
			]
		},
		"application/vnd.mobius.msl": {
			"source": "iana",
			"extensions": [
				"msl"
			]
		},
		"application/vnd.mobius.plc": {
			"source": "iana",
			"extensions": [
				"plc"
			]
		},
		"application/vnd.mobius.txf": {
			"source": "iana",
			"extensions": [
				"txf"
			]
		},
		"application/vnd.mophun.application": {
			"source": "iana",
			"extensions": [
				"mpn"
			]
		},
		"application/vnd.mophun.certificate": {
			"source": "iana",
			"extensions": [
				"mpc"
			]
		},
		"application/vnd.motorola.flexsuite": {
			"source": "iana"
		},
		"application/vnd.motorola.flexsuite.adsi": {
			"source": "iana"
		},
		"application/vnd.motorola.flexsuite.fis": {
			"source": "iana"
		},
		"application/vnd.motorola.flexsuite.gotap": {
			"source": "iana"
		},
		"application/vnd.motorola.flexsuite.kmr": {
			"source": "iana"
		},
		"application/vnd.motorola.flexsuite.ttc": {
			"source": "iana"
		},
		"application/vnd.motorola.flexsuite.wem": {
			"source": "iana"
		},
		"application/vnd.motorola.iprm": {
			"source": "iana"
		},
		"application/vnd.mozilla.xul+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"xul"
			]
		},
		"application/vnd.ms-3mfdocument": {
			"source": "iana"
		},
		"application/vnd.ms-artgalry": {
			"source": "iana",
			"extensions": [
				"cil"
			]
		},
		"application/vnd.ms-asf": {
			"source": "iana"
		},
		"application/vnd.ms-cab-compressed": {
			"source": "iana",
			"extensions": [
				"cab"
			]
		},
		"application/vnd.ms-color.iccprofile": {
			"source": "apache"
		},
		"application/vnd.ms-excel": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"xls",
				"xlm",
				"xla",
				"xlc",
				"xlt",
				"xlw"
			]
		},
		"application/vnd.ms-excel.addin.macroenabled.12": {
			"source": "iana",
			"extensions": [
				"xlam"
			]
		},
		"application/vnd.ms-excel.sheet.binary.macroenabled.12": {
			"source": "iana",
			"extensions": [
				"xlsb"
			]
		},
		"application/vnd.ms-excel.sheet.macroenabled.12": {
			"source": "iana",
			"extensions": [
				"xlsm"
			]
		},
		"application/vnd.ms-excel.template.macroenabled.12": {
			"source": "iana",
			"extensions": [
				"xltm"
			]
		},
		"application/vnd.ms-fontobject": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"eot"
			]
		},
		"application/vnd.ms-htmlhelp": {
			"source": "iana",
			"extensions": [
				"chm"
			]
		},
		"application/vnd.ms-ims": {
			"source": "iana",
			"extensions": [
				"ims"
			]
		},
		"application/vnd.ms-lrm": {
			"source": "iana",
			"extensions": [
				"lrm"
			]
		},
		"application/vnd.ms-office.activex+xml": {
			"source": "iana"
		},
		"application/vnd.ms-officetheme": {
			"source": "iana",
			"extensions": [
				"thmx"
			]
		},
		"application/vnd.ms-opentype": {
			"source": "apache",
			"compressible": true
		},
		"application/vnd.ms-package.obfuscated-opentype": {
			"source": "apache"
		},
		"application/vnd.ms-pki.seccat": {
			"source": "apache",
			"extensions": [
				"cat"
			]
		},
		"application/vnd.ms-pki.stl": {
			"source": "apache",
			"extensions": [
				"stl"
			]
		},
		"application/vnd.ms-playready.initiator+xml": {
			"source": "iana"
		},
		"application/vnd.ms-powerpoint": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"ppt",
				"pps",
				"pot"
			]
		},
		"application/vnd.ms-powerpoint.addin.macroenabled.12": {
			"source": "iana",
			"extensions": [
				"ppam"
			]
		},
		"application/vnd.ms-powerpoint.presentation.macroenabled.12": {
			"source": "iana",
			"extensions": [
				"pptm"
			]
		},
		"application/vnd.ms-powerpoint.slide.macroenabled.12": {
			"source": "iana",
			"extensions": [
				"sldm"
			]
		},
		"application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
			"source": "iana",
			"extensions": [
				"ppsm"
			]
		},
		"application/vnd.ms-powerpoint.template.macroenabled.12": {
			"source": "iana",
			"extensions": [
				"potm"
			]
		},
		"application/vnd.ms-printdevicecapabilities+xml": {
			"source": "iana"
		},
		"application/vnd.ms-printing.printticket+xml": {
			"source": "apache"
		},
		"application/vnd.ms-printschematicket+xml": {
			"source": "iana"
		},
		"application/vnd.ms-project": {
			"source": "iana",
			"extensions": [
				"mpp",
				"mpt"
			]
		},
		"application/vnd.ms-tnef": {
			"source": "iana"
		},
		"application/vnd.ms-windows.devicepairing": {
			"source": "iana"
		},
		"application/vnd.ms-windows.nwprinting.oob": {
			"source": "iana"
		},
		"application/vnd.ms-windows.printerpairing": {
			"source": "iana"
		},
		"application/vnd.ms-windows.wsd.oob": {
			"source": "iana"
		},
		"application/vnd.ms-wmdrm.lic-chlg-req": {
			"source": "iana"
		},
		"application/vnd.ms-wmdrm.lic-resp": {
			"source": "iana"
		},
		"application/vnd.ms-wmdrm.meter-chlg-req": {
			"source": "iana"
		},
		"application/vnd.ms-wmdrm.meter-resp": {
			"source": "iana"
		},
		"application/vnd.ms-word.document.macroenabled.12": {
			"source": "iana",
			"extensions": [
				"docm"
			]
		},
		"application/vnd.ms-word.template.macroenabled.12": {
			"source": "iana",
			"extensions": [
				"dotm"
			]
		},
		"application/vnd.ms-works": {
			"source": "iana",
			"extensions": [
				"wps",
				"wks",
				"wcm",
				"wdb"
			]
		},
		"application/vnd.ms-wpl": {
			"source": "iana",
			"extensions": [
				"wpl"
			]
		},
		"application/vnd.ms-xpsdocument": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"xps"
			]
		},
		"application/vnd.msa-disk-image": {
			"source": "iana"
		},
		"application/vnd.mseq": {
			"source": "iana",
			"extensions": [
				"mseq"
			]
		},
		"application/vnd.msign": {
			"source": "iana"
		},
		"application/vnd.multiad.creator": {
			"source": "iana"
		},
		"application/vnd.multiad.creator.cif": {
			"source": "iana"
		},
		"application/vnd.music-niff": {
			"source": "iana"
		},
		"application/vnd.musician": {
			"source": "iana",
			"extensions": [
				"mus"
			]
		},
		"application/vnd.muvee.style": {
			"source": "iana",
			"extensions": [
				"msty"
			]
		},
		"application/vnd.mynfc": {
			"source": "iana",
			"extensions": [
				"taglet"
			]
		},
		"application/vnd.ncd.control": {
			"source": "iana"
		},
		"application/vnd.ncd.reference": {
			"source": "iana"
		},
		"application/vnd.nervana": {
			"source": "iana"
		},
		"application/vnd.netfpx": {
			"source": "iana"
		},
		"application/vnd.neurolanguage.nlu": {
			"source": "iana",
			"extensions": [
				"nlu"
			]
		},
		"application/vnd.nintendo.nitro.rom": {
			"source": "iana"
		},
		"application/vnd.nintendo.snes.rom": {
			"source": "iana"
		},
		"application/vnd.nitf": {
			"source": "iana",
			"extensions": [
				"ntf",
				"nitf"
			]
		},
		"application/vnd.noblenet-directory": {
			"source": "iana",
			"extensions": [
				"nnd"
			]
		},
		"application/vnd.noblenet-sealer": {
			"source": "iana",
			"extensions": [
				"nns"
			]
		},
		"application/vnd.noblenet-web": {
			"source": "iana",
			"extensions": [
				"nnw"
			]
		},
		"application/vnd.nokia.catalogs": {
			"source": "iana"
		},
		"application/vnd.nokia.conml+wbxml": {
			"source": "iana"
		},
		"application/vnd.nokia.conml+xml": {
			"source": "iana"
		},
		"application/vnd.nokia.iptv.config+xml": {
			"source": "iana"
		},
		"application/vnd.nokia.isds-radio-presets": {
			"source": "iana"
		},
		"application/vnd.nokia.landmark+wbxml": {
			"source": "iana"
		},
		"application/vnd.nokia.landmark+xml": {
			"source": "iana"
		},
		"application/vnd.nokia.landmarkcollection+xml": {
			"source": "iana"
		},
		"application/vnd.nokia.n-gage.ac+xml": {
			"source": "iana"
		},
		"application/vnd.nokia.n-gage.data": {
			"source": "iana",
			"extensions": [
				"ngdat"
			]
		},
		"application/vnd.nokia.n-gage.symbian.install": {
			"source": "iana",
			"extensions": [
				"n-gage"
			]
		},
		"application/vnd.nokia.ncd": {
			"source": "iana"
		},
		"application/vnd.nokia.pcd+wbxml": {
			"source": "iana"
		},
		"application/vnd.nokia.pcd+xml": {
			"source": "iana"
		},
		"application/vnd.nokia.radio-preset": {
			"source": "iana",
			"extensions": [
				"rpst"
			]
		},
		"application/vnd.nokia.radio-presets": {
			"source": "iana",
			"extensions": [
				"rpss"
			]
		},
		"application/vnd.novadigm.edm": {
			"source": "iana",
			"extensions": [
				"edm"
			]
		},
		"application/vnd.novadigm.edx": {
			"source": "iana",
			"extensions": [
				"edx"
			]
		},
		"application/vnd.novadigm.ext": {
			"source": "iana",
			"extensions": [
				"ext"
			]
		},
		"application/vnd.ntt-local.content-share": {
			"source": "iana"
		},
		"application/vnd.ntt-local.file-transfer": {
			"source": "iana"
		},
		"application/vnd.ntt-local.ogw_remote-access": {
			"source": "iana"
		},
		"application/vnd.ntt-local.sip-ta_remote": {
			"source": "iana"
		},
		"application/vnd.ntt-local.sip-ta_tcp_stream": {
			"source": "iana"
		},
		"application/vnd.oasis.opendocument.chart": {
			"source": "iana",
			"extensions": [
				"odc"
			]
		},
		"application/vnd.oasis.opendocument.chart-template": {
			"source": "iana",
			"extensions": [
				"otc"
			]
		},
		"application/vnd.oasis.opendocument.database": {
			"source": "iana",
			"extensions": [
				"odb"
			]
		},
		"application/vnd.oasis.opendocument.formula": {
			"source": "iana",
			"extensions": [
				"odf"
			]
		},
		"application/vnd.oasis.opendocument.formula-template": {
			"source": "iana",
			"extensions": [
				"odft"
			]
		},
		"application/vnd.oasis.opendocument.graphics": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"odg"
			]
		},
		"application/vnd.oasis.opendocument.graphics-template": {
			"source": "iana",
			"extensions": [
				"otg"
			]
		},
		"application/vnd.oasis.opendocument.image": {
			"source": "iana",
			"extensions": [
				"odi"
			]
		},
		"application/vnd.oasis.opendocument.image-template": {
			"source": "iana",
			"extensions": [
				"oti"
			]
		},
		"application/vnd.oasis.opendocument.presentation": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"odp"
			]
		},
		"application/vnd.oasis.opendocument.presentation-template": {
			"source": "iana",
			"extensions": [
				"otp"
			]
		},
		"application/vnd.oasis.opendocument.spreadsheet": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"ods"
			]
		},
		"application/vnd.oasis.opendocument.spreadsheet-template": {
			"source": "iana",
			"extensions": [
				"ots"
			]
		},
		"application/vnd.oasis.opendocument.text": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"odt"
			]
		},
		"application/vnd.oasis.opendocument.text-master": {
			"source": "iana",
			"extensions": [
				"odm"
			]
		},
		"application/vnd.oasis.opendocument.text-template": {
			"source": "iana",
			"extensions": [
				"ott"
			]
		},
		"application/vnd.oasis.opendocument.text-web": {
			"source": "iana",
			"extensions": [
				"oth"
			]
		},
		"application/vnd.obn": {
			"source": "iana"
		},
		"application/vnd.oftn.l10n+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.oipf.contentaccessdownload+xml": {
			"source": "iana"
		},
		"application/vnd.oipf.contentaccessstreaming+xml": {
			"source": "iana"
		},
		"application/vnd.oipf.cspg-hexbinary": {
			"source": "iana"
		},
		"application/vnd.oipf.dae.svg+xml": {
			"source": "iana"
		},
		"application/vnd.oipf.dae.xhtml+xml": {
			"source": "iana"
		},
		"application/vnd.oipf.mippvcontrolmessage+xml": {
			"source": "iana"
		},
		"application/vnd.oipf.pae.gem": {
			"source": "iana"
		},
		"application/vnd.oipf.spdiscovery+xml": {
			"source": "iana"
		},
		"application/vnd.oipf.spdlist+xml": {
			"source": "iana"
		},
		"application/vnd.oipf.ueprofile+xml": {
			"source": "iana"
		},
		"application/vnd.oipf.userprofile+xml": {
			"source": "iana"
		},
		"application/vnd.olpc-sugar": {
			"source": "iana",
			"extensions": [
				"xo"
			]
		},
		"application/vnd.oma-scws-config": {
			"source": "iana"
		},
		"application/vnd.oma-scws-http-request": {
			"source": "iana"
		},
		"application/vnd.oma-scws-http-response": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.associated-procedure-parameter+xml": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.drm-trigger+xml": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.imd+xml": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.ltkm": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.notification+xml": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.provisioningtrigger": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.sgboot": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.sgdd+xml": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.sgdu": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.simple-symbol-container": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.smartcard-trigger+xml": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.sprov+xml": {
			"source": "iana"
		},
		"application/vnd.oma.bcast.stkm": {
			"source": "iana"
		},
		"application/vnd.oma.cab-address-book+xml": {
			"source": "iana"
		},
		"application/vnd.oma.cab-feature-handler+xml": {
			"source": "iana"
		},
		"application/vnd.oma.cab-pcc+xml": {
			"source": "iana"
		},
		"application/vnd.oma.cab-subs-invite+xml": {
			"source": "iana"
		},
		"application/vnd.oma.cab-user-prefs+xml": {
			"source": "iana"
		},
		"application/vnd.oma.dcd": {
			"source": "iana"
		},
		"application/vnd.oma.dcdc": {
			"source": "iana"
		},
		"application/vnd.oma.dd2+xml": {
			"source": "iana",
			"extensions": [
				"dd2"
			]
		},
		"application/vnd.oma.drm.risd+xml": {
			"source": "iana"
		},
		"application/vnd.oma.group-usage-list+xml": {
			"source": "iana"
		},
		"application/vnd.oma.pal+xml": {
			"source": "iana"
		},
		"application/vnd.oma.poc.detailed-progress-report+xml": {
			"source": "iana"
		},
		"application/vnd.oma.poc.final-report+xml": {
			"source": "iana"
		},
		"application/vnd.oma.poc.groups+xml": {
			"source": "iana"
		},
		"application/vnd.oma.poc.invocation-descriptor+xml": {
			"source": "iana"
		},
		"application/vnd.oma.poc.optimized-progress-report+xml": {
			"source": "iana"
		},
		"application/vnd.oma.push": {
			"source": "iana"
		},
		"application/vnd.oma.scidm.messages+xml": {
			"source": "iana"
		},
		"application/vnd.oma.xcap-directory+xml": {
			"source": "iana"
		},
		"application/vnd.omads-email+xml": {
			"source": "iana"
		},
		"application/vnd.omads-file+xml": {
			"source": "iana"
		},
		"application/vnd.omads-folder+xml": {
			"source": "iana"
		},
		"application/vnd.omaloc-supl-init": {
			"source": "iana"
		},
		"application/vnd.openblox.game+xml": {
			"source": "iana"
		},
		"application/vnd.openblox.game-binary": {
			"source": "iana"
		},
		"application/vnd.openeye.oeb": {
			"source": "iana"
		},
		"application/vnd.openofficeorg.extension": {
			"source": "apache",
			"extensions": [
				"oxt"
			]
		},
		"application/vnd.openxmlformats-officedocument.custom-properties+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.drawing+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.extended-properties+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml-template": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.presentation": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"pptx"
			]
		},
		"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slide": {
			"source": "iana",
			"extensions": [
				"sldx"
			]
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
			"source": "iana",
			"extensions": [
				"ppsx"
			]
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.template": {
			"source": "apache",
			"extensions": [
				"potx"
			]
		},
		"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml-template": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"xlsx"
			]
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
			"source": "apache",
			"extensions": [
				"xltx"
			]
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.theme+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.themeoverride+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.vmldrawing": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml-template": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"docx"
			]
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
			"source": "apache",
			"extensions": [
				"dotx"
			]
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-package.core-properties+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
			"source": "iana"
		},
		"application/vnd.openxmlformats-package.relationships+xml": {
			"source": "iana"
		},
		"application/vnd.oracle.resource+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.orange.indata": {
			"source": "iana"
		},
		"application/vnd.osa.netdeploy": {
			"source": "iana"
		},
		"application/vnd.osgeo.mapguide.package": {
			"source": "iana",
			"extensions": [
				"mgp"
			]
		},
		"application/vnd.osgi.bundle": {
			"source": "iana"
		},
		"application/vnd.osgi.dp": {
			"source": "iana",
			"extensions": [
				"dp"
			]
		},
		"application/vnd.osgi.subsystem": {
			"source": "iana",
			"extensions": [
				"esa"
			]
		},
		"application/vnd.otps.ct-kip+xml": {
			"source": "iana"
		},
		"application/vnd.oxli.countgraph": {
			"source": "iana"
		},
		"application/vnd.pagerduty+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.palm": {
			"source": "iana",
			"extensions": [
				"pdb",
				"pqa",
				"oprc"
			]
		},
		"application/vnd.panoply": {
			"source": "iana"
		},
		"application/vnd.paos+xml": {
			"source": "iana"
		},
		"application/vnd.paos.xml": {
			"source": "apache"
		},
		"application/vnd.pawaafile": {
			"source": "iana",
			"extensions": [
				"paw"
			]
		},
		"application/vnd.pcos": {
			"source": "iana"
		},
		"application/vnd.pg.format": {
			"source": "iana",
			"extensions": [
				"str"
			]
		},
		"application/vnd.pg.osasli": {
			"source": "iana",
			"extensions": [
				"ei6"
			]
		},
		"application/vnd.piaccess.application-licence": {
			"source": "iana"
		},
		"application/vnd.picsel": {
			"source": "iana",
			"extensions": [
				"efif"
			]
		},
		"application/vnd.pmi.widget": {
			"source": "iana",
			"extensions": [
				"wg"
			]
		},
		"application/vnd.poc.group-advertisement+xml": {
			"source": "iana"
		},
		"application/vnd.pocketlearn": {
			"source": "iana",
			"extensions": [
				"plf"
			]
		},
		"application/vnd.powerbuilder6": {
			"source": "iana",
			"extensions": [
				"pbd"
			]
		},
		"application/vnd.powerbuilder6-s": {
			"source": "iana"
		},
		"application/vnd.powerbuilder7": {
			"source": "iana"
		},
		"application/vnd.powerbuilder7-s": {
			"source": "iana"
		},
		"application/vnd.powerbuilder75": {
			"source": "iana"
		},
		"application/vnd.powerbuilder75-s": {
			"source": "iana"
		},
		"application/vnd.preminet": {
			"source": "iana"
		},
		"application/vnd.previewsystems.box": {
			"source": "iana",
			"extensions": [
				"box"
			]
		},
		"application/vnd.proteus.magazine": {
			"source": "iana",
			"extensions": [
				"mgz"
			]
		},
		"application/vnd.publishare-delta-tree": {
			"source": "iana",
			"extensions": [
				"qps"
			]
		},
		"application/vnd.pvi.ptid1": {
			"source": "iana",
			"extensions": [
				"ptid"
			]
		},
		"application/vnd.pwg-multiplexed": {
			"source": "iana"
		},
		"application/vnd.pwg-xhtml-print+xml": {
			"source": "iana"
		},
		"application/vnd.qualcomm.brew-app-res": {
			"source": "iana"
		},
		"application/vnd.quark.quarkxpress": {
			"source": "iana",
			"extensions": [
				"qxd",
				"qxt",
				"qwd",
				"qwt",
				"qxl",
				"qxb"
			]
		},
		"application/vnd.quobject-quoxdocument": {
			"source": "iana"
		},
		"application/vnd.radisys.moml+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-audit+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-audit-conf+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-audit-conn+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-audit-dialog+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-audit-stream+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-conf+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-dialog+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-dialog-base+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-dialog-fax-detect+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-dialog-group+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-dialog-speech+xml": {
			"source": "iana"
		},
		"application/vnd.radisys.msml-dialog-transform+xml": {
			"source": "iana"
		},
		"application/vnd.rainstor.data": {
			"source": "iana"
		},
		"application/vnd.rapid": {
			"source": "iana"
		},
		"application/vnd.realvnc.bed": {
			"source": "iana",
			"extensions": [
				"bed"
			]
		},
		"application/vnd.recordare.musicxml": {
			"source": "iana",
			"extensions": [
				"mxl"
			]
		},
		"application/vnd.recordare.musicxml+xml": {
			"source": "iana",
			"extensions": [
				"musicxml"
			]
		},
		"application/vnd.renlearn.rlprint": {
			"source": "iana"
		},
		"application/vnd.rig.cryptonote": {
			"source": "iana",
			"extensions": [
				"cryptonote"
			]
		},
		"application/vnd.rim.cod": {
			"source": "apache",
			"extensions": [
				"cod"
			]
		},
		"application/vnd.rn-realmedia": {
			"source": "apache",
			"extensions": [
				"rm"
			]
		},
		"application/vnd.rn-realmedia-vbr": {
			"source": "apache",
			"extensions": [
				"rmvb"
			]
		},
		"application/vnd.route66.link66+xml": {
			"source": "iana",
			"extensions": [
				"link66"
			]
		},
		"application/vnd.rs-274x": {
			"source": "iana"
		},
		"application/vnd.ruckus.download": {
			"source": "iana"
		},
		"application/vnd.s3sms": {
			"source": "iana"
		},
		"application/vnd.sailingtracker.track": {
			"source": "iana",
			"extensions": [
				"st"
			]
		},
		"application/vnd.sbm.cid": {
			"source": "iana"
		},
		"application/vnd.sbm.mid2": {
			"source": "iana"
		},
		"application/vnd.scribus": {
			"source": "iana"
		},
		"application/vnd.sealed.3df": {
			"source": "iana"
		},
		"application/vnd.sealed.csf": {
			"source": "iana"
		},
		"application/vnd.sealed.doc": {
			"source": "iana"
		},
		"application/vnd.sealed.eml": {
			"source": "iana"
		},
		"application/vnd.sealed.mht": {
			"source": "iana"
		},
		"application/vnd.sealed.net": {
			"source": "iana"
		},
		"application/vnd.sealed.ppt": {
			"source": "iana"
		},
		"application/vnd.sealed.tiff": {
			"source": "iana"
		},
		"application/vnd.sealed.xls": {
			"source": "iana"
		},
		"application/vnd.sealedmedia.softseal.html": {
			"source": "iana"
		},
		"application/vnd.sealedmedia.softseal.pdf": {
			"source": "iana"
		},
		"application/vnd.seemail": {
			"source": "iana",
			"extensions": [
				"see"
			]
		},
		"application/vnd.sema": {
			"source": "iana",
			"extensions": [
				"sema"
			]
		},
		"application/vnd.semd": {
			"source": "iana",
			"extensions": [
				"semd"
			]
		},
		"application/vnd.semf": {
			"source": "iana",
			"extensions": [
				"semf"
			]
		},
		"application/vnd.shana.informed.formdata": {
			"source": "iana",
			"extensions": [
				"ifm"
			]
		},
		"application/vnd.shana.informed.formtemplate": {
			"source": "iana",
			"extensions": [
				"itp"
			]
		},
		"application/vnd.shana.informed.interchange": {
			"source": "iana",
			"extensions": [
				"iif"
			]
		},
		"application/vnd.shana.informed.package": {
			"source": "iana",
			"extensions": [
				"ipk"
			]
		},
		"application/vnd.simtech-mindmapper": {
			"source": "iana",
			"extensions": [
				"twd",
				"twds"
			]
		},
		"application/vnd.siren+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.smaf": {
			"source": "iana",
			"extensions": [
				"mmf"
			]
		},
		"application/vnd.smart.notebook": {
			"source": "iana"
		},
		"application/vnd.smart.teacher": {
			"source": "iana",
			"extensions": [
				"teacher"
			]
		},
		"application/vnd.software602.filler.form+xml": {
			"source": "iana"
		},
		"application/vnd.software602.filler.form-xml-zip": {
			"source": "iana"
		},
		"application/vnd.solent.sdkm+xml": {
			"source": "iana",
			"extensions": [
				"sdkm",
				"sdkd"
			]
		},
		"application/vnd.spotfire.dxp": {
			"source": "iana",
			"extensions": [
				"dxp"
			]
		},
		"application/vnd.spotfire.sfs": {
			"source": "iana",
			"extensions": [
				"sfs"
			]
		},
		"application/vnd.sss-cod": {
			"source": "iana"
		},
		"application/vnd.sss-dtf": {
			"source": "iana"
		},
		"application/vnd.sss-ntf": {
			"source": "iana"
		},
		"application/vnd.stardivision.calc": {
			"source": "apache",
			"extensions": [
				"sdc"
			]
		},
		"application/vnd.stardivision.draw": {
			"source": "apache",
			"extensions": [
				"sda"
			]
		},
		"application/vnd.stardivision.impress": {
			"source": "apache",
			"extensions": [
				"sdd"
			]
		},
		"application/vnd.stardivision.math": {
			"source": "apache",
			"extensions": [
				"smf"
			]
		},
		"application/vnd.stardivision.writer": {
			"source": "apache",
			"extensions": [
				"sdw",
				"vor"
			]
		},
		"application/vnd.stardivision.writer-global": {
			"source": "apache",
			"extensions": [
				"sgl"
			]
		},
		"application/vnd.stepmania.package": {
			"source": "iana",
			"extensions": [
				"smzip"
			]
		},
		"application/vnd.stepmania.stepchart": {
			"source": "iana",
			"extensions": [
				"sm"
			]
		},
		"application/vnd.street-stream": {
			"source": "iana"
		},
		"application/vnd.sun.wadl+xml": {
			"source": "iana"
		},
		"application/vnd.sun.xml.calc": {
			"source": "apache",
			"extensions": [
				"sxc"
			]
		},
		"application/vnd.sun.xml.calc.template": {
			"source": "apache",
			"extensions": [
				"stc"
			]
		},
		"application/vnd.sun.xml.draw": {
			"source": "apache",
			"extensions": [
				"sxd"
			]
		},
		"application/vnd.sun.xml.draw.template": {
			"source": "apache",
			"extensions": [
				"std"
			]
		},
		"application/vnd.sun.xml.impress": {
			"source": "apache",
			"extensions": [
				"sxi"
			]
		},
		"application/vnd.sun.xml.impress.template": {
			"source": "apache",
			"extensions": [
				"sti"
			]
		},
		"application/vnd.sun.xml.math": {
			"source": "apache",
			"extensions": [
				"sxm"
			]
		},
		"application/vnd.sun.xml.writer": {
			"source": "apache",
			"extensions": [
				"sxw"
			]
		},
		"application/vnd.sun.xml.writer.global": {
			"source": "apache",
			"extensions": [
				"sxg"
			]
		},
		"application/vnd.sun.xml.writer.template": {
			"source": "apache",
			"extensions": [
				"stw"
			]
		},
		"application/vnd.sus-calendar": {
			"source": "iana",
			"extensions": [
				"sus",
				"susp"
			]
		},
		"application/vnd.svd": {
			"source": "iana",
			"extensions": [
				"svd"
			]
		},
		"application/vnd.swiftview-ics": {
			"source": "iana"
		},
		"application/vnd.symbian.install": {
			"source": "apache",
			"extensions": [
				"sis",
				"sisx"
			]
		},
		"application/vnd.syncml+xml": {
			"source": "iana",
			"extensions": [
				"xsm"
			]
		},
		"application/vnd.syncml.dm+wbxml": {
			"source": "iana",
			"extensions": [
				"bdm"
			]
		},
		"application/vnd.syncml.dm+xml": {
			"source": "iana",
			"extensions": [
				"xdm"
			]
		},
		"application/vnd.syncml.dm.notification": {
			"source": "iana"
		},
		"application/vnd.syncml.dmddf+wbxml": {
			"source": "iana"
		},
		"application/vnd.syncml.dmddf+xml": {
			"source": "iana"
		},
		"application/vnd.syncml.dmtnds+wbxml": {
			"source": "iana"
		},
		"application/vnd.syncml.dmtnds+xml": {
			"source": "iana"
		},
		"application/vnd.syncml.ds.notification": {
			"source": "iana"
		},
		"application/vnd.tao.intent-module-archive": {
			"source": "iana",
			"extensions": [
				"tao"
			]
		},
		"application/vnd.tcpdump.pcap": {
			"source": "iana",
			"extensions": [
				"pcap",
				"cap",
				"dmp"
			]
		},
		"application/vnd.tmd.mediaflex.api+xml": {
			"source": "iana"
		},
		"application/vnd.tml": {
			"source": "iana"
		},
		"application/vnd.tmobile-livetv": {
			"source": "iana",
			"extensions": [
				"tmo"
			]
		},
		"application/vnd.trid.tpt": {
			"source": "iana",
			"extensions": [
				"tpt"
			]
		},
		"application/vnd.triscape.mxs": {
			"source": "iana",
			"extensions": [
				"mxs"
			]
		},
		"application/vnd.trueapp": {
			"source": "iana",
			"extensions": [
				"tra"
			]
		},
		"application/vnd.truedoc": {
			"source": "iana"
		},
		"application/vnd.ubisoft.webplayer": {
			"source": "iana"
		},
		"application/vnd.ufdl": {
			"source": "iana",
			"extensions": [
				"ufd",
				"ufdl"
			]
		},
		"application/vnd.uiq.theme": {
			"source": "iana",
			"extensions": [
				"utz"
			]
		},
		"application/vnd.umajin": {
			"source": "iana",
			"extensions": [
				"umj"
			]
		},
		"application/vnd.unity": {
			"source": "iana",
			"extensions": [
				"unityweb"
			]
		},
		"application/vnd.uoml+xml": {
			"source": "iana",
			"extensions": [
				"uoml"
			]
		},
		"application/vnd.uplanet.alert": {
			"source": "iana"
		},
		"application/vnd.uplanet.alert-wbxml": {
			"source": "iana"
		},
		"application/vnd.uplanet.bearer-choice": {
			"source": "iana"
		},
		"application/vnd.uplanet.bearer-choice-wbxml": {
			"source": "iana"
		},
		"application/vnd.uplanet.cacheop": {
			"source": "iana"
		},
		"application/vnd.uplanet.cacheop-wbxml": {
			"source": "iana"
		},
		"application/vnd.uplanet.channel": {
			"source": "iana"
		},
		"application/vnd.uplanet.channel-wbxml": {
			"source": "iana"
		},
		"application/vnd.uplanet.list": {
			"source": "iana"
		},
		"application/vnd.uplanet.list-wbxml": {
			"source": "iana"
		},
		"application/vnd.uplanet.listcmd": {
			"source": "iana"
		},
		"application/vnd.uplanet.listcmd-wbxml": {
			"source": "iana"
		},
		"application/vnd.uplanet.signal": {
			"source": "iana"
		},
		"application/vnd.uri-map": {
			"source": "iana"
		},
		"application/vnd.valve.source.material": {
			"source": "iana"
		},
		"application/vnd.vcx": {
			"source": "iana",
			"extensions": [
				"vcx"
			]
		},
		"application/vnd.vd-study": {
			"source": "iana"
		},
		"application/vnd.vectorworks": {
			"source": "iana"
		},
		"application/vnd.verimatrix.vcas": {
			"source": "iana"
		},
		"application/vnd.vidsoft.vidconference": {
			"source": "iana"
		},
		"application/vnd.visio": {
			"source": "iana",
			"extensions": [
				"vsd",
				"vst",
				"vss",
				"vsw"
			]
		},
		"application/vnd.visionary": {
			"source": "iana",
			"extensions": [
				"vis"
			]
		},
		"application/vnd.vividence.scriptfile": {
			"source": "iana"
		},
		"application/vnd.vsf": {
			"source": "iana",
			"extensions": [
				"vsf"
			]
		},
		"application/vnd.wap.sic": {
			"source": "iana"
		},
		"application/vnd.wap.slc": {
			"source": "iana"
		},
		"application/vnd.wap.wbxml": {
			"source": "iana",
			"extensions": [
				"wbxml"
			]
		},
		"application/vnd.wap.wmlc": {
			"source": "iana",
			"extensions": [
				"wmlc"
			]
		},
		"application/vnd.wap.wmlscriptc": {
			"source": "iana",
			"extensions": [
				"wmlsc"
			]
		},
		"application/vnd.webturbo": {
			"source": "iana",
			"extensions": [
				"wtb"
			]
		},
		"application/vnd.wfa.p2p": {
			"source": "iana"
		},
		"application/vnd.wfa.wsc": {
			"source": "iana"
		},
		"application/vnd.windows.devicepairing": {
			"source": "iana"
		},
		"application/vnd.wmc": {
			"source": "iana"
		},
		"application/vnd.wmf.bootstrap": {
			"source": "iana"
		},
		"application/vnd.wolfram.mathematica": {
			"source": "iana"
		},
		"application/vnd.wolfram.mathematica.package": {
			"source": "iana"
		},
		"application/vnd.wolfram.player": {
			"source": "iana",
			"extensions": [
				"nbp"
			]
		},
		"application/vnd.wordperfect": {
			"source": "iana",
			"extensions": [
				"wpd"
			]
		},
		"application/vnd.wqd": {
			"source": "iana",
			"extensions": [
				"wqd"
			]
		},
		"application/vnd.wrq-hp3000-labelled": {
			"source": "iana"
		},
		"application/vnd.wt.stf": {
			"source": "iana",
			"extensions": [
				"stf"
			]
		},
		"application/vnd.wv.csp+wbxml": {
			"source": "iana"
		},
		"application/vnd.wv.csp+xml": {
			"source": "iana"
		},
		"application/vnd.wv.ssp+xml": {
			"source": "iana"
		},
		"application/vnd.xacml+json": {
			"source": "iana",
			"compressible": true
		},
		"application/vnd.xara": {
			"source": "iana",
			"extensions": [
				"xar"
			]
		},
		"application/vnd.xfdl": {
			"source": "iana",
			"extensions": [
				"xfdl"
			]
		},
		"application/vnd.xfdl.webform": {
			"source": "iana"
		},
		"application/vnd.xmi+xml": {
			"source": "iana"
		},
		"application/vnd.xmpie.cpkg": {
			"source": "iana"
		},
		"application/vnd.xmpie.dpkg": {
			"source": "iana"
		},
		"application/vnd.xmpie.plan": {
			"source": "iana"
		},
		"application/vnd.xmpie.ppkg": {
			"source": "iana"
		},
		"application/vnd.xmpie.xlim": {
			"source": "iana"
		},
		"application/vnd.yamaha.hv-dic": {
			"source": "iana",
			"extensions": [
				"hvd"
			]
		},
		"application/vnd.yamaha.hv-script": {
			"source": "iana",
			"extensions": [
				"hvs"
			]
		},
		"application/vnd.yamaha.hv-voice": {
			"source": "iana",
			"extensions": [
				"hvp"
			]
		},
		"application/vnd.yamaha.openscoreformat": {
			"source": "iana",
			"extensions": [
				"osf"
			]
		},
		"application/vnd.yamaha.openscoreformat.osfpvg+xml": {
			"source": "iana",
			"extensions": [
				"osfpvg"
			]
		},
		"application/vnd.yamaha.remote-setup": {
			"source": "iana"
		},
		"application/vnd.yamaha.smaf-audio": {
			"source": "iana",
			"extensions": [
				"saf"
			]
		},
		"application/vnd.yamaha.smaf-phrase": {
			"source": "iana",
			"extensions": [
				"spf"
			]
		},
		"application/vnd.yamaha.through-ngn": {
			"source": "iana"
		},
		"application/vnd.yamaha.tunnel-udpencap": {
			"source": "iana"
		},
		"application/vnd.yaoweme": {
			"source": "iana"
		},
		"application/vnd.yellowriver-custom-menu": {
			"source": "iana",
			"extensions": [
				"cmp"
			]
		},
		"application/vnd.zul": {
			"source": "iana",
			"extensions": [
				"zir",
				"zirz"
			]
		},
		"application/vnd.zzazz.deck+xml": {
			"source": "iana",
			"extensions": [
				"zaz"
			]
		},
		"application/voicexml+xml": {
			"source": "iana",
			"extensions": [
				"vxml"
			]
		},
		"application/vq-rtcpxr": {
			"source": "iana"
		},
		"application/watcherinfo+xml": {
			"source": "iana"
		},
		"application/whoispp-query": {
			"source": "iana"
		},
		"application/whoispp-response": {
			"source": "iana"
		},
		"application/widget": {
			"source": "iana",
			"extensions": [
				"wgt"
			]
		},
		"application/winhlp": {
			"source": "apache",
			"extensions": [
				"hlp"
			]
		},
		"application/wita": {
			"source": "iana"
		},
		"application/wordperfect5.1": {
			"source": "iana"
		},
		"application/wsdl+xml": {
			"source": "iana",
			"extensions": [
				"wsdl"
			]
		},
		"application/wspolicy+xml": {
			"source": "iana",
			"extensions": [
				"wspolicy"
			]
		},
		"application/x-7z-compressed": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"7z"
			]
		},
		"application/x-abiword": {
			"source": "apache",
			"extensions": [
				"abw"
			]
		},
		"application/x-ace-compressed": {
			"source": "apache",
			"extensions": [
				"ace"
			]
		},
		"application/x-amf": {
			"source": "apache"
		},
		"application/x-apple-diskimage": {
			"source": "apache",
			"extensions": [
				"dmg"
			]
		},
		"application/x-authorware-bin": {
			"source": "apache",
			"extensions": [
				"aab",
				"x32",
				"u32",
				"vox"
			]
		},
		"application/x-authorware-map": {
			"source": "apache",
			"extensions": [
				"aam"
			]
		},
		"application/x-authorware-seg": {
			"source": "apache",
			"extensions": [
				"aas"
			]
		},
		"application/x-bcpio": {
			"source": "apache",
			"extensions": [
				"bcpio"
			]
		},
		"application/x-bdoc": {
			"compressible": false,
			"extensions": [
				"bdoc"
			]
		},
		"application/x-bittorrent": {
			"source": "apache",
			"extensions": [
				"torrent"
			]
		},
		"application/x-blorb": {
			"source": "apache",
			"extensions": [
				"blb",
				"blorb"
			]
		},
		"application/x-bzip": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"bz"
			]
		},
		"application/x-bzip2": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"bz2",
				"boz"
			]
		},
		"application/x-cbr": {
			"source": "apache",
			"extensions": [
				"cbr",
				"cba",
				"cbt",
				"cbz",
				"cb7"
			]
		},
		"application/x-cdlink": {
			"source": "apache",
			"extensions": [
				"vcd"
			]
		},
		"application/x-cfs-compressed": {
			"source": "apache",
			"extensions": [
				"cfs"
			]
		},
		"application/x-chat": {
			"source": "apache",
			"extensions": [
				"chat"
			]
		},
		"application/x-chess-pgn": {
			"source": "apache",
			"extensions": [
				"pgn"
			]
		},
		"application/x-chrome-extension": {
			"extensions": [
				"crx"
			]
		},
		"application/x-cocoa": {
			"source": "nginx",
			"extensions": [
				"cco"
			]
		},
		"application/x-compress": {
			"source": "apache"
		},
		"application/x-conference": {
			"source": "apache",
			"extensions": [
				"nsc"
			]
		},
		"application/x-cpio": {
			"source": "apache",
			"extensions": [
				"cpio"
			]
		},
		"application/x-csh": {
			"source": "apache",
			"extensions": [
				"csh"
			]
		},
		"application/x-deb": {
			"compressible": false
		},
		"application/x-debian-package": {
			"source": "apache",
			"extensions": [
				"deb",
				"udeb"
			]
		},
		"application/x-dgc-compressed": {
			"source": "apache",
			"extensions": [
				"dgc"
			]
		},
		"application/x-director": {
			"source": "apache",
			"extensions": [
				"dir",
				"dcr",
				"dxr",
				"cst",
				"cct",
				"cxt",
				"w3d",
				"fgd",
				"swa"
			]
		},
		"application/x-doom": {
			"source": "apache",
			"extensions": [
				"wad"
			]
		},
		"application/x-dtbncx+xml": {
			"source": "apache",
			"extensions": [
				"ncx"
			]
		},
		"application/x-dtbook+xml": {
			"source": "apache",
			"extensions": [
				"dtb"
			]
		},
		"application/x-dtbresource+xml": {
			"source": "apache",
			"extensions": [
				"res"
			]
		},
		"application/x-dvi": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"dvi"
			]
		},
		"application/x-envoy": {
			"source": "apache",
			"extensions": [
				"evy"
			]
		},
		"application/x-eva": {
			"source": "apache",
			"extensions": [
				"eva"
			]
		},
		"application/x-font-bdf": {
			"source": "apache",
			"extensions": [
				"bdf"
			]
		},
		"application/x-font-dos": {
			"source": "apache"
		},
		"application/x-font-framemaker": {
			"source": "apache"
		},
		"application/x-font-ghostscript": {
			"source": "apache",
			"extensions": [
				"gsf"
			]
		},
		"application/x-font-libgrx": {
			"source": "apache"
		},
		"application/x-font-linux-psf": {
			"source": "apache",
			"extensions": [
				"psf"
			]
		},
		"application/x-font-otf": {
			"source": "apache",
			"compressible": true,
			"extensions": [
				"otf"
			]
		},
		"application/x-font-pcf": {
			"source": "apache",
			"extensions": [
				"pcf"
			]
		},
		"application/x-font-snf": {
			"source": "apache",
			"extensions": [
				"snf"
			]
		},
		"application/x-font-speedo": {
			"source": "apache"
		},
		"application/x-font-sunos-news": {
			"source": "apache"
		},
		"application/x-font-ttf": {
			"source": "apache",
			"compressible": true,
			"extensions": [
				"ttf",
				"ttc"
			]
		},
		"application/x-font-type1": {
			"source": "apache",
			"extensions": [
				"pfa",
				"pfb",
				"pfm",
				"afm"
			]
		},
		"application/x-font-vfont": {
			"source": "apache"
		},
		"application/x-freearc": {
			"source": "apache",
			"extensions": [
				"arc"
			]
		},
		"application/x-futuresplash": {
			"source": "apache",
			"extensions": [
				"spl"
			]
		},
		"application/x-gca-compressed": {
			"source": "apache",
			"extensions": [
				"gca"
			]
		},
		"application/x-glulx": {
			"source": "apache",
			"extensions": [
				"ulx"
			]
		},
		"application/x-gnumeric": {
			"source": "apache",
			"extensions": [
				"gnumeric"
			]
		},
		"application/x-gramps-xml": {
			"source": "apache",
			"extensions": [
				"gramps"
			]
		},
		"application/x-gtar": {
			"source": "apache",
			"extensions": [
				"gtar"
			]
		},
		"application/x-gzip": {
			"source": "apache"
		},
		"application/x-hdf": {
			"source": "apache",
			"extensions": [
				"hdf"
			]
		},
		"application/x-httpd-php": {
			"compressible": true,
			"extensions": [
				"php"
			]
		},
		"application/x-install-instructions": {
			"source": "apache",
			"extensions": [
				"install"
			]
		},
		"application/x-iso9660-image": {
			"source": "apache",
			"extensions": [
				"iso"
			]
		},
		"application/x-java-archive-diff": {
			"source": "nginx",
			"extensions": [
				"jardiff"
			]
		},
		"application/x-java-jnlp-file": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"jnlp"
			]
		},
		"application/x-javascript": {
			"compressible": true
		},
		"application/x-latex": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"latex"
			]
		},
		"application/x-lua-bytecode": {
			"extensions": [
				"luac"
			]
		},
		"application/x-lzh-compressed": {
			"source": "apache",
			"extensions": [
				"lzh",
				"lha"
			]
		},
		"application/x-makeself": {
			"source": "nginx",
			"extensions": [
				"run"
			]
		},
		"application/x-mie": {
			"source": "apache",
			"extensions": [
				"mie"
			]
		},
		"application/x-mobipocket-ebook": {
			"source": "apache",
			"extensions": [
				"prc",
				"mobi"
			]
		},
		"application/x-mpegurl": {
			"compressible": false
		},
		"application/x-ms-application": {
			"source": "apache",
			"extensions": [
				"application"
			]
		},
		"application/x-ms-shortcut": {
			"source": "apache",
			"extensions": [
				"lnk"
			]
		},
		"application/x-ms-wmd": {
			"source": "apache",
			"extensions": [
				"wmd"
			]
		},
		"application/x-ms-wmz": {
			"source": "apache",
			"extensions": [
				"wmz"
			]
		},
		"application/x-ms-xbap": {
			"source": "apache",
			"extensions": [
				"xbap"
			]
		},
		"application/x-msaccess": {
			"source": "apache",
			"extensions": [
				"mdb"
			]
		},
		"application/x-msbinder": {
			"source": "apache",
			"extensions": [
				"obd"
			]
		},
		"application/x-mscardfile": {
			"source": "apache",
			"extensions": [
				"crd"
			]
		},
		"application/x-msclip": {
			"source": "apache",
			"extensions": [
				"clp"
			]
		},
		"application/x-msdos-program": {
			"extensions": [
				"exe"
			]
		},
		"application/x-msdownload": {
			"source": "apache",
			"extensions": [
				"exe",
				"dll",
				"com",
				"bat",
				"msi"
			]
		},
		"application/x-msmediaview": {
			"source": "apache",
			"extensions": [
				"mvb",
				"m13",
				"m14"
			]
		},
		"application/x-msmetafile": {
			"source": "apache",
			"extensions": [
				"wmf",
				"wmz",
				"emf",
				"emz"
			]
		},
		"application/x-msmoney": {
			"source": "apache",
			"extensions": [
				"mny"
			]
		},
		"application/x-mspublisher": {
			"source": "apache",
			"extensions": [
				"pub"
			]
		},
		"application/x-msschedule": {
			"source": "apache",
			"extensions": [
				"scd"
			]
		},
		"application/x-msterminal": {
			"source": "apache",
			"extensions": [
				"trm"
			]
		},
		"application/x-mswrite": {
			"source": "apache",
			"extensions": [
				"wri"
			]
		},
		"application/x-netcdf": {
			"source": "apache",
			"extensions": [
				"nc",
				"cdf"
			]
		},
		"application/x-ns-proxy-autoconfig": {
			"compressible": true,
			"extensions": [
				"pac"
			]
		},
		"application/x-nzb": {
			"source": "apache",
			"extensions": [
				"nzb"
			]
		},
		"application/x-perl": {
			"source": "nginx",
			"extensions": [
				"pl",
				"pm"
			]
		},
		"application/x-pilot": {
			"source": "nginx",
			"extensions": [
				"prc",
				"pdb"
			]
		},
		"application/x-pkcs12": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"p12",
				"pfx"
			]
		},
		"application/x-pkcs7-certificates": {
			"source": "apache",
			"extensions": [
				"p7b",
				"spc"
			]
		},
		"application/x-pkcs7-certreqresp": {
			"source": "apache",
			"extensions": [
				"p7r"
			]
		},
		"application/x-rar-compressed": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"rar"
			]
		},
		"application/x-redhat-package-manager": {
			"source": "nginx",
			"extensions": [
				"rpm"
			]
		},
		"application/x-research-info-systems": {
			"source": "apache",
			"extensions": [
				"ris"
			]
		},
		"application/x-sea": {
			"source": "nginx",
			"extensions": [
				"sea"
			]
		},
		"application/x-sh": {
			"source": "apache",
			"compressible": true,
			"extensions": [
				"sh"
			]
		},
		"application/x-shar": {
			"source": "apache",
			"extensions": [
				"shar"
			]
		},
		"application/x-shockwave-flash": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"swf"
			]
		},
		"application/x-silverlight-app": {
			"source": "apache",
			"extensions": [
				"xap"
			]
		},
		"application/x-sql": {
			"source": "apache",
			"extensions": [
				"sql"
			]
		},
		"application/x-stuffit": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"sit"
			]
		},
		"application/x-stuffitx": {
			"source": "apache",
			"extensions": [
				"sitx"
			]
		},
		"application/x-subrip": {
			"source": "apache",
			"extensions": [
				"srt"
			]
		},
		"application/x-sv4cpio": {
			"source": "apache",
			"extensions": [
				"sv4cpio"
			]
		},
		"application/x-sv4crc": {
			"source": "apache",
			"extensions": [
				"sv4crc"
			]
		},
		"application/x-t3vm-image": {
			"source": "apache",
			"extensions": [
				"t3"
			]
		},
		"application/x-tads": {
			"source": "apache",
			"extensions": [
				"gam"
			]
		},
		"application/x-tar": {
			"source": "apache",
			"compressible": true,
			"extensions": [
				"tar"
			]
		},
		"application/x-tcl": {
			"source": "apache",
			"extensions": [
				"tcl",
				"tk"
			]
		},
		"application/x-tex": {
			"source": "apache",
			"extensions": [
				"tex"
			]
		},
		"application/x-tex-tfm": {
			"source": "apache",
			"extensions": [
				"tfm"
			]
		},
		"application/x-texinfo": {
			"source": "apache",
			"extensions": [
				"texinfo",
				"texi"
			]
		},
		"application/x-tgif": {
			"source": "apache",
			"extensions": [
				"obj"
			]
		},
		"application/x-ustar": {
			"source": "apache",
			"extensions": [
				"ustar"
			]
		},
		"application/x-wais-source": {
			"source": "apache",
			"extensions": [
				"src"
			]
		},
		"application/x-web-app-manifest+json": {
			"compressible": true,
			"extensions": [
				"webapp"
			]
		},
		"application/x-www-form-urlencoded": {
			"source": "iana",
			"compressible": true
		},
		"application/x-x509-ca-cert": {
			"source": "apache",
			"extensions": [
				"der",
				"crt",
				"pem"
			]
		},
		"application/x-xfig": {
			"source": "apache",
			"extensions": [
				"fig"
			]
		},
		"application/x-xliff+xml": {
			"source": "apache",
			"extensions": [
				"xlf"
			]
		},
		"application/x-xpinstall": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"xpi"
			]
		},
		"application/x-xz": {
			"source": "apache",
			"extensions": [
				"xz"
			]
		},
		"application/x-zmachine": {
			"source": "apache",
			"extensions": [
				"z1",
				"z2",
				"z3",
				"z4",
				"z5",
				"z6",
				"z7",
				"z8"
			]
		},
		"application/x400-bp": {
			"source": "iana"
		},
		"application/xacml+xml": {
			"source": "iana"
		},
		"application/xaml+xml": {
			"source": "apache",
			"extensions": [
				"xaml"
			]
		},
		"application/xcap-att+xml": {
			"source": "iana"
		},
		"application/xcap-caps+xml": {
			"source": "iana"
		},
		"application/xcap-diff+xml": {
			"source": "iana",
			"extensions": [
				"xdf"
			]
		},
		"application/xcap-el+xml": {
			"source": "iana"
		},
		"application/xcap-error+xml": {
			"source": "iana"
		},
		"application/xcap-ns+xml": {
			"source": "iana"
		},
		"application/xcon-conference-info+xml": {
			"source": "iana"
		},
		"application/xcon-conference-info-diff+xml": {
			"source": "iana"
		},
		"application/xenc+xml": {
			"source": "iana",
			"extensions": [
				"xenc"
			]
		},
		"application/xhtml+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"xhtml",
				"xht"
			]
		},
		"application/xhtml-voice+xml": {
			"source": "apache"
		},
		"application/xml": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"xml",
				"xsl",
				"xsd",
				"rng"
			]
		},
		"application/xml-dtd": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"dtd"
			]
		},
		"application/xml-external-parsed-entity": {
			"source": "iana"
		},
		"application/xml-patch+xml": {
			"source": "iana"
		},
		"application/xmpp+xml": {
			"source": "iana"
		},
		"application/xop+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"xop"
			]
		},
		"application/xproc+xml": {
			"source": "apache",
			"extensions": [
				"xpl"
			]
		},
		"application/xslt+xml": {
			"source": "iana",
			"extensions": [
				"xslt"
			]
		},
		"application/xspf+xml": {
			"source": "apache",
			"extensions": [
				"xspf"
			]
		},
		"application/xv+xml": {
			"source": "iana",
			"extensions": [
				"mxml",
				"xhvml",
				"xvml",
				"xvm"
			]
		},
		"application/yang": {
			"source": "iana",
			"extensions": [
				"yang"
			]
		},
		"application/yin+xml": {
			"source": "iana",
			"extensions": [
				"yin"
			]
		},
		"application/zip": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"zip"
			]
		},
		"application/zlib": {
			"source": "iana"
		},
		"audio/1d-interleaved-parityfec": {
			"source": "iana"
		},
		"audio/32kadpcm": {
			"source": "iana"
		},
		"audio/3gpp": {
			"source": "iana"
		},
		"audio/3gpp2": {
			"source": "iana"
		},
		"audio/ac3": {
			"source": "iana"
		},
		"audio/adpcm": {
			"source": "apache",
			"extensions": [
				"adp"
			]
		},
		"audio/amr": {
			"source": "iana"
		},
		"audio/amr-wb": {
			"source": "iana"
		},
		"audio/amr-wb+": {
			"source": "iana"
		},
		"audio/aptx": {
			"source": "iana"
		},
		"audio/asc": {
			"source": "iana"
		},
		"audio/atrac-advanced-lossless": {
			"source": "iana"
		},
		"audio/atrac-x": {
			"source": "iana"
		},
		"audio/atrac3": {
			"source": "iana"
		},
		"audio/basic": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"au",
				"snd"
			]
		},
		"audio/bv16": {
			"source": "iana"
		},
		"audio/bv32": {
			"source": "iana"
		},
		"audio/clearmode": {
			"source": "iana"
		},
		"audio/cn": {
			"source": "iana"
		},
		"audio/dat12": {
			"source": "iana"
		},
		"audio/dls": {
			"source": "iana"
		},
		"audio/dsr-es201108": {
			"source": "iana"
		},
		"audio/dsr-es202050": {
			"source": "iana"
		},
		"audio/dsr-es202211": {
			"source": "iana"
		},
		"audio/dsr-es202212": {
			"source": "iana"
		},
		"audio/dv": {
			"source": "iana"
		},
		"audio/dvi4": {
			"source": "iana"
		},
		"audio/eac3": {
			"source": "iana"
		},
		"audio/encaprtp": {
			"source": "iana"
		},
		"audio/evrc": {
			"source": "iana"
		},
		"audio/evrc-qcp": {
			"source": "iana"
		},
		"audio/evrc0": {
			"source": "iana"
		},
		"audio/evrc1": {
			"source": "iana"
		},
		"audio/evrcb": {
			"source": "iana"
		},
		"audio/evrcb0": {
			"source": "iana"
		},
		"audio/evrcb1": {
			"source": "iana"
		},
		"audio/evrcnw": {
			"source": "iana"
		},
		"audio/evrcnw0": {
			"source": "iana"
		},
		"audio/evrcnw1": {
			"source": "iana"
		},
		"audio/evrcwb": {
			"source": "iana"
		},
		"audio/evrcwb0": {
			"source": "iana"
		},
		"audio/evrcwb1": {
			"source": "iana"
		},
		"audio/evs": {
			"source": "iana"
		},
		"audio/fwdred": {
			"source": "iana"
		},
		"audio/g711-0": {
			"source": "iana"
		},
		"audio/g719": {
			"source": "iana"
		},
		"audio/g722": {
			"source": "iana"
		},
		"audio/g7221": {
			"source": "iana"
		},
		"audio/g723": {
			"source": "iana"
		},
		"audio/g726-16": {
			"source": "iana"
		},
		"audio/g726-24": {
			"source": "iana"
		},
		"audio/g726-32": {
			"source": "iana"
		},
		"audio/g726-40": {
			"source": "iana"
		},
		"audio/g728": {
			"source": "iana"
		},
		"audio/g729": {
			"source": "iana"
		},
		"audio/g7291": {
			"source": "iana"
		},
		"audio/g729d": {
			"source": "iana"
		},
		"audio/g729e": {
			"source": "iana"
		},
		"audio/gsm": {
			"source": "iana"
		},
		"audio/gsm-efr": {
			"source": "iana"
		},
		"audio/gsm-hr-08": {
			"source": "iana"
		},
		"audio/ilbc": {
			"source": "iana"
		},
		"audio/ip-mr_v2.5": {
			"source": "iana"
		},
		"audio/isac": {
			"source": "apache"
		},
		"audio/l16": {
			"source": "iana"
		},
		"audio/l20": {
			"source": "iana"
		},
		"audio/l24": {
			"source": "iana",
			"compressible": false
		},
		"audio/l8": {
			"source": "iana"
		},
		"audio/lpc": {
			"source": "iana"
		},
		"audio/midi": {
			"source": "apache",
			"extensions": [
				"mid",
				"midi",
				"kar",
				"rmi"
			]
		},
		"audio/mobile-xmf": {
			"source": "iana"
		},
		"audio/mp4": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"m4a",
				"mp4a"
			]
		},
		"audio/mp4a-latm": {
			"source": "iana"
		},
		"audio/mpa": {
			"source": "iana"
		},
		"audio/mpa-robust": {
			"source": "iana"
		},
		"audio/mpeg": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"mpga",
				"mp2",
				"mp2a",
				"mp3",
				"m2a",
				"m3a"
			]
		},
		"audio/mpeg4-generic": {
			"source": "iana"
		},
		"audio/musepack": {
			"source": "apache"
		},
		"audio/ogg": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"oga",
				"ogg",
				"spx"
			]
		},
		"audio/opus": {
			"source": "iana"
		},
		"audio/parityfec": {
			"source": "iana"
		},
		"audio/pcma": {
			"source": "iana"
		},
		"audio/pcma-wb": {
			"source": "iana"
		},
		"audio/pcmu": {
			"source": "iana"
		},
		"audio/pcmu-wb": {
			"source": "iana"
		},
		"audio/prs.sid": {
			"source": "iana"
		},
		"audio/qcelp": {
			"source": "iana"
		},
		"audio/raptorfec": {
			"source": "iana"
		},
		"audio/red": {
			"source": "iana"
		},
		"audio/rtp-enc-aescm128": {
			"source": "iana"
		},
		"audio/rtp-midi": {
			"source": "iana"
		},
		"audio/rtploopback": {
			"source": "iana"
		},
		"audio/rtx": {
			"source": "iana"
		},
		"audio/s3m": {
			"source": "apache",
			"extensions": [
				"s3m"
			]
		},
		"audio/silk": {
			"source": "apache",
			"extensions": [
				"sil"
			]
		},
		"audio/smv": {
			"source": "iana"
		},
		"audio/smv-qcp": {
			"source": "iana"
		},
		"audio/smv0": {
			"source": "iana"
		},
		"audio/sp-midi": {
			"source": "iana"
		},
		"audio/speex": {
			"source": "iana"
		},
		"audio/t140c": {
			"source": "iana"
		},
		"audio/t38": {
			"source": "iana"
		},
		"audio/telephone-event": {
			"source": "iana"
		},
		"audio/tone": {
			"source": "iana"
		},
		"audio/uemclip": {
			"source": "iana"
		},
		"audio/ulpfec": {
			"source": "iana"
		},
		"audio/vdvi": {
			"source": "iana"
		},
		"audio/vmr-wb": {
			"source": "iana"
		},
		"audio/vnd.3gpp.iufp": {
			"source": "iana"
		},
		"audio/vnd.4sb": {
			"source": "iana"
		},
		"audio/vnd.audiokoz": {
			"source": "iana"
		},
		"audio/vnd.celp": {
			"source": "iana"
		},
		"audio/vnd.cisco.nse": {
			"source": "iana"
		},
		"audio/vnd.cmles.radio-events": {
			"source": "iana"
		},
		"audio/vnd.cns.anp1": {
			"source": "iana"
		},
		"audio/vnd.cns.inf1": {
			"source": "iana"
		},
		"audio/vnd.dece.audio": {
			"source": "iana",
			"extensions": [
				"uva",
				"uvva"
			]
		},
		"audio/vnd.digital-winds": {
			"source": "iana",
			"extensions": [
				"eol"
			]
		},
		"audio/vnd.dlna.adts": {
			"source": "iana"
		},
		"audio/vnd.dolby.heaac.1": {
			"source": "iana"
		},
		"audio/vnd.dolby.heaac.2": {
			"source": "iana"
		},
		"audio/vnd.dolby.mlp": {
			"source": "iana"
		},
		"audio/vnd.dolby.mps": {
			"source": "iana"
		},
		"audio/vnd.dolby.pl2": {
			"source": "iana"
		},
		"audio/vnd.dolby.pl2x": {
			"source": "iana"
		},
		"audio/vnd.dolby.pl2z": {
			"source": "iana"
		},
		"audio/vnd.dolby.pulse.1": {
			"source": "iana"
		},
		"audio/vnd.dra": {
			"source": "iana",
			"extensions": [
				"dra"
			]
		},
		"audio/vnd.dts": {
			"source": "iana",
			"extensions": [
				"dts"
			]
		},
		"audio/vnd.dts.hd": {
			"source": "iana",
			"extensions": [
				"dtshd"
			]
		},
		"audio/vnd.dvb.file": {
			"source": "iana"
		},
		"audio/vnd.everad.plj": {
			"source": "iana"
		},
		"audio/vnd.hns.audio": {
			"source": "iana"
		},
		"audio/vnd.lucent.voice": {
			"source": "iana",
			"extensions": [
				"lvp"
			]
		},
		"audio/vnd.ms-playready.media.pya": {
			"source": "iana",
			"extensions": [
				"pya"
			]
		},
		"audio/vnd.nokia.mobile-xmf": {
			"source": "iana"
		},
		"audio/vnd.nortel.vbk": {
			"source": "iana"
		},
		"audio/vnd.nuera.ecelp4800": {
			"source": "iana",
			"extensions": [
				"ecelp4800"
			]
		},
		"audio/vnd.nuera.ecelp7470": {
			"source": "iana",
			"extensions": [
				"ecelp7470"
			]
		},
		"audio/vnd.nuera.ecelp9600": {
			"source": "iana",
			"extensions": [
				"ecelp9600"
			]
		},
		"audio/vnd.octel.sbc": {
			"source": "iana"
		},
		"audio/vnd.qcelp": {
			"source": "iana"
		},
		"audio/vnd.rhetorex.32kadpcm": {
			"source": "iana"
		},
		"audio/vnd.rip": {
			"source": "iana",
			"extensions": [
				"rip"
			]
		},
		"audio/vnd.rn-realaudio": {
			"compressible": false
		},
		"audio/vnd.sealedmedia.softseal.mpeg": {
			"source": "iana"
		},
		"audio/vnd.vmx.cvsd": {
			"source": "iana"
		},
		"audio/vnd.wave": {
			"compressible": false
		},
		"audio/vorbis": {
			"source": "iana",
			"compressible": false
		},
		"audio/vorbis-config": {
			"source": "iana"
		},
		"audio/wav": {
			"compressible": false,
			"extensions": [
				"wav"
			]
		},
		"audio/wave": {
			"compressible": false,
			"extensions": [
				"wav"
			]
		},
		"audio/webm": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"weba"
			]
		},
		"audio/x-aac": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"aac"
			]
		},
		"audio/x-aiff": {
			"source": "apache",
			"extensions": [
				"aif",
				"aiff",
				"aifc"
			]
		},
		"audio/x-caf": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"caf"
			]
		},
		"audio/x-flac": {
			"source": "apache",
			"extensions": [
				"flac"
			]
		},
		"audio/x-m4a": {
			"source": "nginx",
			"extensions": [
				"m4a"
			]
		},
		"audio/x-matroska": {
			"source": "apache",
			"extensions": [
				"mka"
			]
		},
		"audio/x-mpegurl": {
			"source": "apache",
			"extensions": [
				"m3u"
			]
		},
		"audio/x-ms-wax": {
			"source": "apache",
			"extensions": [
				"wax"
			]
		},
		"audio/x-ms-wma": {
			"source": "apache",
			"extensions": [
				"wma"
			]
		},
		"audio/x-pn-realaudio": {
			"source": "apache",
			"extensions": [
				"ram",
				"ra"
			]
		},
		"audio/x-pn-realaudio-plugin": {
			"source": "apache",
			"extensions": [
				"rmp"
			]
		},
		"audio/x-realaudio": {
			"source": "nginx",
			"extensions": [
				"ra"
			]
		},
		"audio/x-tta": {
			"source": "apache"
		},
		"audio/x-wav": {
			"source": "apache",
			"extensions": [
				"wav"
			]
		},
		"audio/xm": {
			"source": "apache",
			"extensions": [
				"xm"
			]
		},
		"chemical/x-cdx": {
			"source": "apache",
			"extensions": [
				"cdx"
			]
		},
		"chemical/x-cif": {
			"source": "apache",
			"extensions": [
				"cif"
			]
		},
		"chemical/x-cmdf": {
			"source": "apache",
			"extensions": [
				"cmdf"
			]
		},
		"chemical/x-cml": {
			"source": "apache",
			"extensions": [
				"cml"
			]
		},
		"chemical/x-csml": {
			"source": "apache",
			"extensions": [
				"csml"
			]
		},
		"chemical/x-pdb": {
			"source": "apache"
		},
		"chemical/x-xyz": {
			"source": "apache",
			"extensions": [
				"xyz"
			]
		},
		"font/opentype": {
			"compressible": true,
			"extensions": [
				"otf"
			]
		},
		"image/bmp": {
			"source": "apache",
			"compressible": true,
			"extensions": [
				"bmp"
			]
		},
		"image/cgm": {
			"source": "iana",
			"extensions": [
				"cgm"
			]
		},
		"image/fits": {
			"source": "iana"
		},
		"image/g3fax": {
			"source": "iana",
			"extensions": [
				"g3"
			]
		},
		"image/gif": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"gif"
			]
		},
		"image/ief": {
			"source": "iana",
			"extensions": [
				"ief"
			]
		},
		"image/jp2": {
			"source": "iana"
		},
		"image/jpeg": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"jpeg",
				"jpg",
				"jpe"
			]
		},
		"image/jpm": {
			"source": "iana"
		},
		"image/jpx": {
			"source": "iana"
		},
		"image/ktx": {
			"source": "iana",
			"extensions": [
				"ktx"
			]
		},
		"image/naplps": {
			"source": "iana"
		},
		"image/pjpeg": {
			"compressible": false
		},
		"image/png": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"png"
			]
		},
		"image/prs.btif": {
			"source": "iana",
			"extensions": [
				"btif"
			]
		},
		"image/prs.pti": {
			"source": "iana"
		},
		"image/pwg-raster": {
			"source": "iana"
		},
		"image/sgi": {
			"source": "apache",
			"extensions": [
				"sgi"
			]
		},
		"image/svg+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"svg",
				"svgz"
			]
		},
		"image/t38": {
			"source": "iana"
		},
		"image/tiff": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"tiff",
				"tif"
			]
		},
		"image/tiff-fx": {
			"source": "iana"
		},
		"image/vnd.adobe.photoshop": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"psd"
			]
		},
		"image/vnd.airzip.accelerator.azv": {
			"source": "iana"
		},
		"image/vnd.cns.inf2": {
			"source": "iana"
		},
		"image/vnd.dece.graphic": {
			"source": "iana",
			"extensions": [
				"uvi",
				"uvvi",
				"uvg",
				"uvvg"
			]
		},
		"image/vnd.djvu": {
			"source": "iana",
			"extensions": [
				"djvu",
				"djv"
			]
		},
		"image/vnd.dvb.subtitle": {
			"source": "iana",
			"extensions": [
				"sub"
			]
		},
		"image/vnd.dwg": {
			"source": "iana",
			"extensions": [
				"dwg"
			]
		},
		"image/vnd.dxf": {
			"source": "iana",
			"extensions": [
				"dxf"
			]
		},
		"image/vnd.fastbidsheet": {
			"source": "iana",
			"extensions": [
				"fbs"
			]
		},
		"image/vnd.fpx": {
			"source": "iana",
			"extensions": [
				"fpx"
			]
		},
		"image/vnd.fst": {
			"source": "iana",
			"extensions": [
				"fst"
			]
		},
		"image/vnd.fujixerox.edmics-mmr": {
			"source": "iana",
			"extensions": [
				"mmr"
			]
		},
		"image/vnd.fujixerox.edmics-rlc": {
			"source": "iana",
			"extensions": [
				"rlc"
			]
		},
		"image/vnd.globalgraphics.pgb": {
			"source": "iana"
		},
		"image/vnd.microsoft.icon": {
			"source": "iana"
		},
		"image/vnd.mix": {
			"source": "iana"
		},
		"image/vnd.mozilla.apng": {
			"source": "iana"
		},
		"image/vnd.ms-modi": {
			"source": "iana",
			"extensions": [
				"mdi"
			]
		},
		"image/vnd.ms-photo": {
			"source": "apache",
			"extensions": [
				"wdp"
			]
		},
		"image/vnd.net-fpx": {
			"source": "iana",
			"extensions": [
				"npx"
			]
		},
		"image/vnd.radiance": {
			"source": "iana"
		},
		"image/vnd.sealed.png": {
			"source": "iana"
		},
		"image/vnd.sealedmedia.softseal.gif": {
			"source": "iana"
		},
		"image/vnd.sealedmedia.softseal.jpg": {
			"source": "iana"
		},
		"image/vnd.svf": {
			"source": "iana"
		},
		"image/vnd.tencent.tap": {
			"source": "iana"
		},
		"image/vnd.valve.source.texture": {
			"source": "iana"
		},
		"image/vnd.wap.wbmp": {
			"source": "iana",
			"extensions": [
				"wbmp"
			]
		},
		"image/vnd.xiff": {
			"source": "iana",
			"extensions": [
				"xif"
			]
		},
		"image/vnd.zbrush.pcx": {
			"source": "iana"
		},
		"image/webp": {
			"source": "apache",
			"extensions": [
				"webp"
			]
		},
		"image/x-3ds": {
			"source": "apache",
			"extensions": [
				"3ds"
			]
		},
		"image/x-cmu-raster": {
			"source": "apache",
			"extensions": [
				"ras"
			]
		},
		"image/x-cmx": {
			"source": "apache",
			"extensions": [
				"cmx"
			]
		},
		"image/x-freehand": {
			"source": "apache",
			"extensions": [
				"fh",
				"fhc",
				"fh4",
				"fh5",
				"fh7"
			]
		},
		"image/x-icon": {
			"source": "apache",
			"compressible": true,
			"extensions": [
				"ico"
			]
		},
		"image/x-jng": {
			"source": "nginx",
			"extensions": [
				"jng"
			]
		},
		"image/x-mrsid-image": {
			"source": "apache",
			"extensions": [
				"sid"
			]
		},
		"image/x-ms-bmp": {
			"source": "nginx",
			"compressible": true,
			"extensions": [
				"bmp"
			]
		},
		"image/x-pcx": {
			"source": "apache",
			"extensions": [
				"pcx"
			]
		},
		"image/x-pict": {
			"source": "apache",
			"extensions": [
				"pic",
				"pct"
			]
		},
		"image/x-portable-anymap": {
			"source": "apache",
			"extensions": [
				"pnm"
			]
		},
		"image/x-portable-bitmap": {
			"source": "apache",
			"extensions": [
				"pbm"
			]
		},
		"image/x-portable-graymap": {
			"source": "apache",
			"extensions": [
				"pgm"
			]
		},
		"image/x-portable-pixmap": {
			"source": "apache",
			"extensions": [
				"ppm"
			]
		},
		"image/x-rgb": {
			"source": "apache",
			"extensions": [
				"rgb"
			]
		},
		"image/x-tga": {
			"source": "apache",
			"extensions": [
				"tga"
			]
		},
		"image/x-xbitmap": {
			"source": "apache",
			"extensions": [
				"xbm"
			]
		},
		"image/x-xcf": {
			"compressible": false
		},
		"image/x-xpixmap": {
			"source": "apache",
			"extensions": [
				"xpm"
			]
		},
		"image/x-xwindowdump": {
			"source": "apache",
			"extensions": [
				"xwd"
			]
		},
		"message/cpim": {
			"source": "iana"
		},
		"message/delivery-status": {
			"source": "iana"
		},
		"message/disposition-notification": {
			"source": "iana"
		},
		"message/external-body": {
			"source": "iana"
		},
		"message/feedback-report": {
			"source": "iana"
		},
		"message/global": {
			"source": "iana"
		},
		"message/global-delivery-status": {
			"source": "iana"
		},
		"message/global-disposition-notification": {
			"source": "iana"
		},
		"message/global-headers": {
			"source": "iana"
		},
		"message/http": {
			"source": "iana",
			"compressible": false
		},
		"message/imdn+xml": {
			"source": "iana",
			"compressible": true
		},
		"message/news": {
			"source": "iana"
		},
		"message/partial": {
			"source": "iana",
			"compressible": false
		},
		"message/rfc822": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"eml",
				"mime"
			]
		},
		"message/s-http": {
			"source": "iana"
		},
		"message/sip": {
			"source": "iana"
		},
		"message/sipfrag": {
			"source": "iana"
		},
		"message/tracking-status": {
			"source": "iana"
		},
		"message/vnd.si.simp": {
			"source": "iana"
		},
		"message/vnd.wfa.wsc": {
			"source": "iana"
		},
		"model/iges": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"igs",
				"iges"
			]
		},
		"model/mesh": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"msh",
				"mesh",
				"silo"
			]
		},
		"model/vnd.collada+xml": {
			"source": "iana",
			"extensions": [
				"dae"
			]
		},
		"model/vnd.dwf": {
			"source": "iana",
			"extensions": [
				"dwf"
			]
		},
		"model/vnd.flatland.3dml": {
			"source": "iana"
		},
		"model/vnd.gdl": {
			"source": "iana",
			"extensions": [
				"gdl"
			]
		},
		"model/vnd.gs-gdl": {
			"source": "apache"
		},
		"model/vnd.gs.gdl": {
			"source": "iana"
		},
		"model/vnd.gtw": {
			"source": "iana",
			"extensions": [
				"gtw"
			]
		},
		"model/vnd.moml+xml": {
			"source": "iana"
		},
		"model/vnd.mts": {
			"source": "iana",
			"extensions": [
				"mts"
			]
		},
		"model/vnd.opengex": {
			"source": "iana"
		},
		"model/vnd.parasolid.transmit.binary": {
			"source": "iana"
		},
		"model/vnd.parasolid.transmit.text": {
			"source": "iana"
		},
		"model/vnd.rosette.annotated-data-model": {
			"source": "iana"
		},
		"model/vnd.valve.source.compiled-map": {
			"source": "iana"
		},
		"model/vnd.vtu": {
			"source": "iana",
			"extensions": [
				"vtu"
			]
		},
		"model/vrml": {
			"source": "iana",
			"compressible": false,
			"extensions": [
				"wrl",
				"vrml"
			]
		},
		"model/x3d+binary": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"x3db",
				"x3dbz"
			]
		},
		"model/x3d+fastinfoset": {
			"source": "iana"
		},
		"model/x3d+vrml": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"x3dv",
				"x3dvz"
			]
		},
		"model/x3d+xml": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"x3d",
				"x3dz"
			]
		},
		"model/x3d-vrml": {
			"source": "iana"
		},
		"multipart/alternative": {
			"source": "iana",
			"compressible": false
		},
		"multipart/appledouble": {
			"source": "iana"
		},
		"multipart/byteranges": {
			"source": "iana"
		},
		"multipart/digest": {
			"source": "iana"
		},
		"multipart/encrypted": {
			"source": "iana",
			"compressible": false
		},
		"multipart/form-data": {
			"source": "iana",
			"compressible": false
		},
		"multipart/header-set": {
			"source": "iana"
		},
		"multipart/mixed": {
			"source": "iana",
			"compressible": false
		},
		"multipart/parallel": {
			"source": "iana"
		},
		"multipart/related": {
			"source": "iana",
			"compressible": false
		},
		"multipart/report": {
			"source": "iana"
		},
		"multipart/signed": {
			"source": "iana",
			"compressible": false
		},
		"multipart/voice-message": {
			"source": "iana"
		},
		"multipart/x-mixed-replace": {
			"source": "iana"
		},
		"text/1d-interleaved-parityfec": {
			"source": "iana"
		},
		"text/cache-manifest": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"appcache",
				"manifest"
			]
		},
		"text/calendar": {
			"source": "iana",
			"extensions": [
				"ics",
				"ifb"
			]
		},
		"text/calender": {
			"compressible": true
		},
		"text/cmd": {
			"compressible": true
		},
		"text/coffeescript": {
			"extensions": [
				"coffee",
				"litcoffee"
			]
		},
		"text/css": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"css"
			]
		},
		"text/csv": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"csv"
			]
		},
		"text/csv-schema": {
			"source": "iana"
		},
		"text/directory": {
			"source": "iana"
		},
		"text/dns": {
			"source": "iana"
		},
		"text/ecmascript": {
			"source": "iana"
		},
		"text/encaprtp": {
			"source": "iana"
		},
		"text/enriched": {
			"source": "iana"
		},
		"text/fwdred": {
			"source": "iana"
		},
		"text/grammar-ref-list": {
			"source": "iana"
		},
		"text/hjson": {
			"extensions": [
				"hjson"
			]
		},
		"text/html": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"html",
				"htm",
				"shtml"
			]
		},
		"text/jade": {
			"extensions": [
				"jade"
			]
		},
		"text/javascript": {
			"source": "iana",
			"compressible": true
		},
		"text/jcr-cnd": {
			"source": "iana"
		},
		"text/jsx": {
			"compressible": true,
			"extensions": [
				"jsx"
			]
		},
		"text/less": {
			"extensions": [
				"less"
			]
		},
		"text/markdown": {
			"source": "iana"
		},
		"text/mathml": {
			"source": "nginx",
			"extensions": [
				"mml"
			]
		},
		"text/mizar": {
			"source": "iana"
		},
		"text/n3": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"n3"
			]
		},
		"text/parameters": {
			"source": "iana"
		},
		"text/parityfec": {
			"source": "iana"
		},
		"text/plain": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"txt",
				"text",
				"conf",
				"def",
				"list",
				"log",
				"in",
				"ini"
			]
		},
		"text/provenance-notation": {
			"source": "iana"
		},
		"text/prs.fallenstein.rst": {
			"source": "iana"
		},
		"text/prs.lines.tag": {
			"source": "iana",
			"extensions": [
				"dsc"
			]
		},
		"text/raptorfec": {
			"source": "iana"
		},
		"text/red": {
			"source": "iana"
		},
		"text/rfc822-headers": {
			"source": "iana"
		},
		"text/richtext": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"rtx"
			]
		},
		"text/rtf": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"rtf"
			]
		},
		"text/rtp-enc-aescm128": {
			"source": "iana"
		},
		"text/rtploopback": {
			"source": "iana"
		},
		"text/rtx": {
			"source": "iana"
		},
		"text/sgml": {
			"source": "iana",
			"extensions": [
				"sgml",
				"sgm"
			]
		},
		"text/slim": {
			"extensions": [
				"slim",
				"slm"
			]
		},
		"text/stylus": {
			"extensions": [
				"stylus",
				"styl"
			]
		},
		"text/t140": {
			"source": "iana"
		},
		"text/tab-separated-values": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"tsv"
			]
		},
		"text/troff": {
			"source": "iana",
			"extensions": [
				"t",
				"tr",
				"roff",
				"man",
				"me",
				"ms"
			]
		},
		"text/turtle": {
			"source": "iana",
			"extensions": [
				"ttl"
			]
		},
		"text/ulpfec": {
			"source": "iana"
		},
		"text/uri-list": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"uri",
				"uris",
				"urls"
			]
		},
		"text/vcard": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"vcard"
			]
		},
		"text/vnd.a": {
			"source": "iana"
		},
		"text/vnd.abc": {
			"source": "iana"
		},
		"text/vnd.curl": {
			"source": "iana",
			"extensions": [
				"curl"
			]
		},
		"text/vnd.curl.dcurl": {
			"source": "apache",
			"extensions": [
				"dcurl"
			]
		},
		"text/vnd.curl.mcurl": {
			"source": "apache",
			"extensions": [
				"mcurl"
			]
		},
		"text/vnd.curl.scurl": {
			"source": "apache",
			"extensions": [
				"scurl"
			]
		},
		"text/vnd.debian.copyright": {
			"source": "iana"
		},
		"text/vnd.dmclientscript": {
			"source": "iana"
		},
		"text/vnd.dvb.subtitle": {
			"source": "iana",
			"extensions": [
				"sub"
			]
		},
		"text/vnd.esmertec.theme-descriptor": {
			"source": "iana"
		},
		"text/vnd.fly": {
			"source": "iana",
			"extensions": [
				"fly"
			]
		},
		"text/vnd.fmi.flexstor": {
			"source": "iana",
			"extensions": [
				"flx"
			]
		},
		"text/vnd.graphviz": {
			"source": "iana",
			"extensions": [
				"gv"
			]
		},
		"text/vnd.in3d.3dml": {
			"source": "iana",
			"extensions": [
				"3dml"
			]
		},
		"text/vnd.in3d.spot": {
			"source": "iana",
			"extensions": [
				"spot"
			]
		},
		"text/vnd.iptc.newsml": {
			"source": "iana"
		},
		"text/vnd.iptc.nitf": {
			"source": "iana"
		},
		"text/vnd.latex-z": {
			"source": "iana"
		},
		"text/vnd.motorola.reflex": {
			"source": "iana"
		},
		"text/vnd.ms-mediapackage": {
			"source": "iana"
		},
		"text/vnd.net2phone.commcenter.command": {
			"source": "iana"
		},
		"text/vnd.radisys.msml-basic-layout": {
			"source": "iana"
		},
		"text/vnd.si.uricatalogue": {
			"source": "iana"
		},
		"text/vnd.sun.j2me.app-descriptor": {
			"source": "iana",
			"extensions": [
				"jad"
			]
		},
		"text/vnd.trolltech.linguist": {
			"source": "iana"
		},
		"text/vnd.wap.si": {
			"source": "iana"
		},
		"text/vnd.wap.sl": {
			"source": "iana"
		},
		"text/vnd.wap.wml": {
			"source": "iana",
			"extensions": [
				"wml"
			]
		},
		"text/vnd.wap.wmlscript": {
			"source": "iana",
			"extensions": [
				"wmls"
			]
		},
		"text/vtt": {
			"charset": "UTF-8",
			"compressible": true,
			"extensions": [
				"vtt"
			]
		},
		"text/x-asm": {
			"source": "apache",
			"extensions": [
				"s",
				"asm"
			]
		},
		"text/x-c": {
			"source": "apache",
			"extensions": [
				"c",
				"cc",
				"cxx",
				"cpp",
				"h",
				"hh",
				"dic"
			]
		},
		"text/x-component": {
			"source": "nginx",
			"extensions": [
				"htc"
			]
		},
		"text/x-fortran": {
			"source": "apache",
			"extensions": [
				"f",
				"for",
				"f77",
				"f90"
			]
		},
		"text/x-gwt-rpc": {
			"compressible": true
		},
		"text/x-handlebars-template": {
			"extensions": [
				"hbs"
			]
		},
		"text/x-java-source": {
			"source": "apache",
			"extensions": [
				"java"
			]
		},
		"text/x-jquery-tmpl": {
			"compressible": true
		},
		"text/x-lua": {
			"extensions": [
				"lua"
			]
		},
		"text/x-markdown": {
			"compressible": true,
			"extensions": [
				"markdown",
				"md",
				"mkd"
			]
		},
		"text/x-nfo": {
			"source": "apache",
			"extensions": [
				"nfo"
			]
		},
		"text/x-opml": {
			"source": "apache",
			"extensions": [
				"opml"
			]
		},
		"text/x-pascal": {
			"source": "apache",
			"extensions": [
				"p",
				"pas"
			]
		},
		"text/x-processing": {
			"compressible": true,
			"extensions": [
				"pde"
			]
		},
		"text/x-sass": {
			"extensions": [
				"sass"
			]
		},
		"text/x-scss": {
			"extensions": [
				"scss"
			]
		},
		"text/x-setext": {
			"source": "apache",
			"extensions": [
				"etx"
			]
		},
		"text/x-sfv": {
			"source": "apache",
			"extensions": [
				"sfv"
			]
		},
		"text/x-suse-ymp": {
			"compressible": true,
			"extensions": [
				"ymp"
			]
		},
		"text/x-uuencode": {
			"source": "apache",
			"extensions": [
				"uu"
			]
		},
		"text/x-vcalendar": {
			"source": "apache",
			"extensions": [
				"vcs"
			]
		},
		"text/x-vcard": {
			"source": "apache",
			"extensions": [
				"vcf"
			]
		},
		"text/xml": {
			"source": "iana",
			"compressible": true,
			"extensions": [
				"xml"
			]
		},
		"text/xml-external-parsed-entity": {
			"source": "iana"
		},
		"text/yaml": {
			"extensions": [
				"yaml",
				"yml"
			]
		},
		"video/1d-interleaved-parityfec": {
			"source": "apache"
		},
		"video/3gpp": {
			"source": "apache",
			"extensions": [
				"3gp",
				"3gpp"
			]
		},
		"video/3gpp-tt": {
			"source": "apache"
		},
		"video/3gpp2": {
			"source": "apache",
			"extensions": [
				"3g2"
			]
		},
		"video/bmpeg": {
			"source": "apache"
		},
		"video/bt656": {
			"source": "apache"
		},
		"video/celb": {
			"source": "apache"
		},
		"video/dv": {
			"source": "apache"
		},
		"video/h261": {
			"source": "apache",
			"extensions": [
				"h261"
			]
		},
		"video/h263": {
			"source": "apache",
			"extensions": [
				"h263"
			]
		},
		"video/h263-1998": {
			"source": "apache"
		},
		"video/h263-2000": {
			"source": "apache"
		},
		"video/h264": {
			"source": "apache",
			"extensions": [
				"h264"
			]
		},
		"video/h264-rcdo": {
			"source": "apache"
		},
		"video/h264-svc": {
			"source": "apache"
		},
		"video/jpeg": {
			"source": "apache",
			"extensions": [
				"jpgv"
			]
		},
		"video/jpeg2000": {
			"source": "apache"
		},
		"video/jpm": {
			"source": "apache",
			"extensions": [
				"jpm",
				"jpgm"
			]
		},
		"video/mj2": {
			"source": "apache",
			"extensions": [
				"mj2",
				"mjp2"
			]
		},
		"video/mp1s": {
			"source": "apache"
		},
		"video/mp2p": {
			"source": "apache"
		},
		"video/mp2t": {
			"source": "apache",
			"extensions": [
				"ts"
			]
		},
		"video/mp4": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"mp4",
				"mp4v",
				"mpg4"
			]
		},
		"video/mp4v-es": {
			"source": "apache"
		},
		"video/mpeg": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"mpeg",
				"mpg",
				"mpe",
				"m1v",
				"m2v"
			]
		},
		"video/mpeg4-generic": {
			"source": "apache"
		},
		"video/mpv": {
			"source": "apache"
		},
		"video/nv": {
			"source": "apache"
		},
		"video/ogg": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"ogv"
			]
		},
		"video/parityfec": {
			"source": "apache"
		},
		"video/pointer": {
			"source": "apache"
		},
		"video/quicktime": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"qt",
				"mov"
			]
		},
		"video/raw": {
			"source": "apache"
		},
		"video/rtp-enc-aescm128": {
			"source": "apache"
		},
		"video/rtx": {
			"source": "apache"
		},
		"video/smpte292m": {
			"source": "apache"
		},
		"video/ulpfec": {
			"source": "apache"
		},
		"video/vc1": {
			"source": "apache"
		},
		"video/vnd.cctv": {
			"source": "apache"
		},
		"video/vnd.dece.hd": {
			"source": "apache",
			"extensions": [
				"uvh",
				"uvvh"
			]
		},
		"video/vnd.dece.mobile": {
			"source": "apache",
			"extensions": [
				"uvm",
				"uvvm"
			]
		},
		"video/vnd.dece.mp4": {
			"source": "apache"
		},
		"video/vnd.dece.pd": {
			"source": "apache",
			"extensions": [
				"uvp",
				"uvvp"
			]
		},
		"video/vnd.dece.sd": {
			"source": "apache",
			"extensions": [
				"uvs",
				"uvvs"
			]
		},
		"video/vnd.dece.video": {
			"source": "apache",
			"extensions": [
				"uvv",
				"uvvv"
			]
		},
		"video/vnd.directv.mpeg": {
			"source": "apache"
		},
		"video/vnd.directv.mpeg-tts": {
			"source": "apache"
		},
		"video/vnd.dlna.mpeg-tts": {
			"source": "apache"
		},
		"video/vnd.dvb.file": {
			"source": "apache",
			"extensions": [
				"dvb"
			]
		},
		"video/vnd.fvt": {
			"source": "apache",
			"extensions": [
				"fvt"
			]
		},
		"video/vnd.hns.video": {
			"source": "apache"
		},
		"video/vnd.iptvforum.1dparityfec-1010": {
			"source": "apache"
		},
		"video/vnd.iptvforum.1dparityfec-2005": {
			"source": "apache"
		},
		"video/vnd.iptvforum.2dparityfec-1010": {
			"source": "apache"
		},
		"video/vnd.iptvforum.2dparityfec-2005": {
			"source": "apache"
		},
		"video/vnd.iptvforum.ttsavc": {
			"source": "apache"
		},
		"video/vnd.iptvforum.ttsmpeg2": {
			"source": "apache"
		},
		"video/vnd.motorola.video": {
			"source": "apache"
		},
		"video/vnd.motorola.videop": {
			"source": "apache"
		},
		"video/vnd.mpegurl": {
			"source": "apache",
			"extensions": [
				"mxu",
				"m4u"
			]
		},
		"video/vnd.ms-playready.media.pyv": {
			"source": "apache",
			"extensions": [
				"pyv"
			]
		},
		"video/vnd.nokia.interleaved-multimedia": {
			"source": "apache"
		},
		"video/vnd.nokia.videovoip": {
			"source": "apache"
		},
		"video/vnd.objectvideo": {
			"source": "apache"
		},
		"video/vnd.sealed.mpeg1": {
			"source": "apache"
		},
		"video/vnd.sealed.mpeg4": {
			"source": "apache"
		},
		"video/vnd.sealed.swf": {
			"source": "apache"
		},
		"video/vnd.sealedmedia.softseal.mov": {
			"source": "apache"
		},
		"video/vnd.uvvu.mp4": {
			"source": "apache",
			"extensions": [
				"uvu",
				"uvvu"
			]
		},
		"video/vnd.vivo": {
			"source": "apache",
			"extensions": [
				"viv"
			]
		},
		"video/webm": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"webm"
			]
		},
		"video/x-f4v": {
			"source": "apache",
			"extensions": [
				"f4v"
			]
		},
		"video/x-fli": {
			"source": "apache",
			"extensions": [
				"fli"
			]
		},
		"video/x-flv": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"flv"
			]
		},
		"video/x-m4v": {
			"source": "apache",
			"extensions": [
				"m4v"
			]
		},
		"video/x-matroska": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"mkv",
				"mk3d",
				"mks"
			]
		},
		"video/x-mng": {
			"source": "apache",
			"extensions": [
				"mng"
			]
		},
		"video/x-ms-asf": {
			"source": "apache",
			"extensions": [
				"asf",
				"asx"
			]
		},
		"video/x-ms-vob": {
			"source": "apache",
			"extensions": [
				"vob"
			]
		},
		"video/x-ms-wm": {
			"source": "apache",
			"extensions": [
				"wm"
			]
		},
		"video/x-ms-wmv": {
			"source": "apache",
			"compressible": false,
			"extensions": [
				"wmv"
			]
		},
		"video/x-ms-wmx": {
			"source": "apache",
			"extensions": [
				"wmx"
			]
		},
		"video/x-ms-wvx": {
			"source": "apache",
			"extensions": [
				"wvx"
			]
		},
		"video/x-msvideo": {
			"source": "apache",
			"extensions": [
				"avi"
			]
		},
		"video/x-sgi-movie": {
			"source": "apache",
			"extensions": [
				"movie"
			]
		},
		"video/x-smv": {
			"source": "apache",
			"extensions": [
				"smv"
			]
		},
		"x-conference/x-cooltalk": {
			"source": "apache",
			"extensions": [
				"ice"
			]
		},
		"x-shader/x-fragment": {
			"compressible": true
		},
		"x-shader/x-vertex": {
			"compressible": true
		}
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * type-is
	 * Copyright(c) 2014 Jonathan Ong
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict'

	/**
	 * Module dependencies.
	 * @private
	 */

	var typer = __webpack_require__(76)
	var mime = __webpack_require__(72)

	/**
	 * Module exports.
	 * @public
	 */

	module.exports = typeofrequest
	module.exports.is = typeis
	module.exports.hasBody = hasbody
	module.exports.normalize = normalize
	module.exports.match = mimeMatch

	/**
	 * Compare a `value` content-type with `types`.
	 * Each `type` can be an extension like `html`,
	 * a special shortcut like `multipart` or `urlencoded`,
	 * or a mime type.
	 *
	 * If no types match, `false` is returned.
	 * Otherwise, the first `type` that matches is returned.
	 *
	 * @param {String} value
	 * @param {Array} types
	 * @public
	 */

	function typeis(value, types_) {
	  var i
	  var types = types_

	  // remove parameters and normalize
	  var val = tryNormalizeType(value)

	  // no type or invalid
	  if (!val) {
	    return false
	  }

	  // support flattened arguments
	  if (types && !Array.isArray(types)) {
	    types = new Array(arguments.length - 1)
	    for (i = 0; i < types.length; i++) {
	      types[i] = arguments[i + 1]
	    }
	  }

	  // no types, return the content type
	  if (!types || !types.length) {
	    return val
	  }

	  var type
	  for (i = 0; i < types.length; i++) {
	    if (mimeMatch(normalize(type = types[i]), val)) {
	      return type[0] === '+' || type.indexOf('*') !== -1
	        ? val
	        : type
	    }
	  }

	  // no matches
	  return false
	}

	/**
	 * Check if a request has a request body.
	 * A request with a body __must__ either have `transfer-encoding`
	 * or `content-length` headers set.
	 * http://www.w3.org/Protocols/rfc2616/rfc2616-sec4.html#sec4.3
	 *
	 * @param {Object} request
	 * @return {Boolean}
	 * @public
	 */

	function hasbody(req) {
	  return req.headers['transfer-encoding'] !== undefined
	    || !isNaN(req.headers['content-length'])
	}

	/**
	 * Check if the incoming request contains the "Content-Type"
	 * header field, and it contains any of the give mime `type`s.
	 * If there is no request body, `null` is returned.
	 * If there is no content type, `false` is returned.
	 * Otherwise, it returns the first `type` that matches.
	 *
	 * Examples:
	 *
	 *     // With Content-Type: text/html; charset=utf-8
	 *     this.is('html'); // => 'html'
	 *     this.is('text/html'); // => 'text/html'
	 *     this.is('text/*', 'application/json'); // => 'text/html'
	 *
	 *     // When Content-Type is application/json
	 *     this.is('json', 'urlencoded'); // => 'json'
	 *     this.is('application/json'); // => 'application/json'
	 *     this.is('html', 'application/*'); // => 'application/json'
	 *
	 *     this.is('html'); // => false
	 *
	 * @param {String|Array} types...
	 * @return {String|false|null}
	 * @public
	 */

	function typeofrequest(req, types_) {
	  var types = types_

	  // no body
	  if (!hasbody(req)) {
	    return null
	  }

	  // support flattened arguments
	  if (arguments.length > 2) {
	    types = new Array(arguments.length - 1)
	    for (var i = 0; i < types.length; i++) {
	      types[i] = arguments[i + 1]
	    }
	  }

	  // request content type
	  var value = req.headers['content-type']

	  return typeis(value, types)
	}

	/**
	 * Normalize a mime type.
	 * If it's a shorthand, expand it to a valid mime type.
	 *
	 * In general, you probably want:
	 *
	 *   var type = is(req, ['urlencoded', 'json', 'multipart']);
	 *
	 * Then use the appropriate body parsers.
	 * These three are the most common request body types
	 * and are thus ensured to work.
	 *
	 * @param {String} type
	 * @private
	 */

	function normalize(type) {
	  if (typeof type !== 'string') {
	    // invalid type
	    return false
	  }

	  switch (type) {
	    case 'urlencoded':
	      return 'application/x-www-form-urlencoded'
	    case 'multipart':
	      return 'multipart/*'
	  }

	  if (type[0] === '+') {
	    // "+json" -> "*/*+json" expando
	    return '*/*' + type
	  }

	  return type.indexOf('/') === -1
	    ? mime.lookup(type)
	    : type
	}

	/**
	 * Check if `expected` mime type
	 * matches `actual` mime type with
	 * wildcard and +suffix support.
	 *
	 * @param {String} expected
	 * @param {String} actual
	 * @return {Boolean}
	 * @private
	 */

	function mimeMatch(expected, actual) {
	  // invalid type
	  if (expected === false) {
	    return false
	  }

	  // split types
	  var actualParts = actual.split('/')
	  var expectedParts = expected.split('/')

	  // invalid format
	  if (actualParts.length !== 2 || expectedParts.length !== 2) {
	    return false
	  }

	  // validate type
	  if (expectedParts[0] !== '*' && expectedParts[0] !== actualParts[0]) {
	    return false
	  }

	  // validate suffix wildcard
	  if (expectedParts[1].substr(0, 2) === '*+') {
	    return expectedParts[1].length <= actualParts[1].length + 1
	      && expectedParts[1].substr(1) === actualParts[1].substr(1 - expectedParts[1].length)
	  }

	  // validate subtype
	  if (expectedParts[1] !== '*' && expectedParts[1] !== actualParts[1]) {
	    return false
	  }

	  return true
	}

	/**
	 * Normalize a type and remove parameters.
	 *
	 * @param {string} value
	 * @return {string}
	 * @private
	 */

	function normalizeType(value) {
	  // parse the type
	  var type = typer.parse(value)

	  // remove the parameters
	  type.parameters = undefined

	  // reformat it
	  return typer.format(type)
	}

	/**
	 * Try to normalize a type and remove parameters.
	 *
	 * @param {string} value
	 * @return {string}
	 * @private
	 */

	function tryNormalizeType(value) {
	  try {
	    return normalizeType(value)
	  } catch (err) {
	    return null
	  }
	}


/***/ },
/* 76 */
/***/ function(module, exports) {

	/*!
	 * media-typer
	 * Copyright(c) 2014 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	/**
	 * RegExp to match *( ";" parameter ) in RFC 2616 sec 3.7
	 *
	 * parameter     = token "=" ( token | quoted-string )
	 * token         = 1*<any CHAR except CTLs or separators>
	 * separators    = "(" | ")" | "<" | ">" | "@"
	 *               | "," | ";" | ":" | "\" | <">
	 *               | "/" | "[" | "]" | "?" | "="
	 *               | "{" | "}" | SP | HT
	 * quoted-string = ( <"> *(qdtext | quoted-pair ) <"> )
	 * qdtext        = <any TEXT except <">>
	 * quoted-pair   = "\" CHAR
	 * CHAR          = <any US-ASCII character (octets 0 - 127)>
	 * TEXT          = <any OCTET except CTLs, but including LWS>
	 * LWS           = [CRLF] 1*( SP | HT )
	 * CRLF          = CR LF
	 * CR            = <US-ASCII CR, carriage return (13)>
	 * LF            = <US-ASCII LF, linefeed (10)>
	 * SP            = <US-ASCII SP, space (32)>
	 * SHT           = <US-ASCII HT, horizontal-tab (9)>
	 * CTL           = <any US-ASCII control character (octets 0 - 31) and DEL (127)>
	 * OCTET         = <any 8-bit sequence of data>
	 */
	var paramRegExp = /; *([!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) *= *("(?:[ !\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u0020-\u007e])*"|[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+) */g;
	var textRegExp = /^[\u0020-\u007e\u0080-\u00ff]+$/
	var tokenRegExp = /^[!#$%&'\*\+\-\.0-9A-Z\^_`a-z\|~]+$/

	/**
	 * RegExp to match quoted-pair in RFC 2616
	 *
	 * quoted-pair = "\" CHAR
	 * CHAR        = <any US-ASCII character (octets 0 - 127)>
	 */
	var qescRegExp = /\\([\u0000-\u007f])/g;

	/**
	 * RegExp to match chars that must be quoted-pair in RFC 2616
	 */
	var quoteRegExp = /([\\"])/g;

	/**
	 * RegExp to match type in RFC 6838
	 *
	 * type-name = restricted-name
	 * subtype-name = restricted-name
	 * restricted-name = restricted-name-first *126restricted-name-chars
	 * restricted-name-first  = ALPHA / DIGIT
	 * restricted-name-chars  = ALPHA / DIGIT / "!" / "#" /
	 *                          "$" / "&" / "-" / "^" / "_"
	 * restricted-name-chars =/ "." ; Characters before first dot always
	 *                              ; specify a facet name
	 * restricted-name-chars =/ "+" ; Characters after last plus always
	 *                              ; specify a structured syntax suffix
	 * ALPHA =  %x41-5A / %x61-7A   ; A-Z / a-z
	 * DIGIT =  %x30-39             ; 0-9
	 */
	var subtypeNameRegExp = /^[A-Za-z0-9][A-Za-z0-9!#$&^_.-]{0,126}$/
	var typeNameRegExp = /^[A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126}$/
	var typeRegExp = /^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/;

	/**
	 * Module exports.
	 */

	exports.format = format
	exports.parse = parse

	/**
	 * Format object to media type.
	 *
	 * @param {object} obj
	 * @return {string}
	 * @api public
	 */

	function format(obj) {
	  if (!obj || typeof obj !== 'object') {
	    throw new TypeError('argument obj is required')
	  }

	  var parameters = obj.parameters
	  var subtype = obj.subtype
	  var suffix = obj.suffix
	  var type = obj.type

	  if (!type || !typeNameRegExp.test(type)) {
	    throw new TypeError('invalid type')
	  }

	  if (!subtype || !subtypeNameRegExp.test(subtype)) {
	    throw new TypeError('invalid subtype')
	  }

	  // format as type/subtype
	  var string = type + '/' + subtype

	  // append +suffix
	  if (suffix) {
	    if (!typeNameRegExp.test(suffix)) {
	      throw new TypeError('invalid suffix')
	    }

	    string += '+' + suffix
	  }

	  // append parameters
	  if (parameters && typeof parameters === 'object') {
	    var param
	    var params = Object.keys(parameters).sort()

	    for (var i = 0; i < params.length; i++) {
	      param = params[i]

	      if (!tokenRegExp.test(param)) {
	        throw new TypeError('invalid parameter name')
	      }

	      string += '; ' + param + '=' + qstring(parameters[param])
	    }
	  }

	  return string
	}

	/**
	 * Parse media type to object.
	 *
	 * @param {string|object} string
	 * @return {Object}
	 * @api public
	 */

	function parse(string) {
	  if (!string) {
	    throw new TypeError('argument string is required')
	  }

	  // support req/res-like objects as argument
	  if (typeof string === 'object') {
	    string = getcontenttype(string)
	  }

	  if (typeof string !== 'string') {
	    throw new TypeError('argument string is required to be a string')
	  }

	  var index = string.indexOf(';')
	  var type = index !== -1
	    ? string.substr(0, index)
	    : string

	  var key
	  var match
	  var obj = splitType(type)
	  var params = {}
	  var value

	  paramRegExp.lastIndex = index

	  while (match = paramRegExp.exec(string)) {
	    if (match.index !== index) {
	      throw new TypeError('invalid parameter format')
	    }

	    index += match[0].length
	    key = match[1].toLowerCase()
	    value = match[2]

	    if (value[0] === '"') {
	      // remove quotes and escapes
	      value = value
	        .substr(1, value.length - 2)
	        .replace(qescRegExp, '$1')
	    }

	    params[key] = value
	  }

	  if (index !== -1 && index !== string.length) {
	    throw new TypeError('invalid parameter format')
	  }

	  obj.parameters = params

	  return obj
	}

	/**
	 * Get content-type from req/res objects.
	 *
	 * @param {object}
	 * @return {Object}
	 * @api private
	 */

	function getcontenttype(obj) {
	  if (typeof obj.getHeader === 'function') {
	    // res-like
	    return obj.getHeader('content-type')
	  }

	  if (typeof obj.headers === 'object') {
	    // req-like
	    return obj.headers && obj.headers['content-type']
	  }
	}

	/**
	 * Quote a string if necessary.
	 *
	 * @param {string} val
	 * @return {string}
	 * @api private
	 */

	function qstring(val) {
	  var str = String(val)

	  // no need to quote tokens
	  if (tokenRegExp.test(str)) {
	    return str
	  }

	  if (str.length > 0 && !textRegExp.test(str)) {
	    throw new TypeError('invalid parameter value')
	  }

	  return '"' + str.replace(quoteRegExp, '\\$1') + '"'
	}

	/**
	 * Simply "type/subtype+siffx" into parts.
	 *
	 * @param {string} string
	 * @return {Object}
	 * @api private
	 */

	function splitType(string) {
	  var match = typeRegExp.exec(string.toLowerCase())

	  if (!match) {
	    throw new TypeError('invalid media type')
	  }

	  var type = match[1]
	  var subtype = match[2]
	  var suffix

	  // suffix after last +
	  var index = subtype.lastIndexOf('+')
	  if (index !== -1) {
	    suffix = subtype.substr(index + 1)
	    subtype = subtype.substr(0, index)
	  }

	  var obj = {
	    type: type,
	    subtype: subtype,
	    suffix: suffix
	  }

	  return obj
	}


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * express
	 * Copyright(c) 2009-2013 TJ Holowaychuk
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict';

	/**
	 * Module dependencies.
	 * @private
	 */

	var contentDisposition = __webpack_require__(44);
	var deprecate = __webpack_require__(27)('express');
	var escapeHtml = __webpack_require__(15);
	var http = __webpack_require__(16);
	var isAbsolute = __webpack_require__(43).isAbsolute;
	var onFinished = __webpack_require__(17);
	var path = __webpack_require__(33);
	var merge = __webpack_require__(26);
	var sign = __webpack_require__(78).sign;
	var normalizeType = __webpack_require__(43).normalizeType;
	var normalizeTypes = __webpack_require__(43).normalizeTypes;
	var setCharset = __webpack_require__(43).setCharset;
	var statusCodes = http.STATUS_CODES;
	var cookie = __webpack_require__(79);
	var send = __webpack_require__(46);
	var extname = path.extname;
	var mime = send.mime;
	var resolve = path.resolve;
	var vary = __webpack_require__(80);

	/**
	 * Response prototype.
	 */

	var res = module.exports = {
	  __proto__: http.ServerResponse.prototype
	};

	/**
	 * Module variables.
	 * @private
	 */

	var charsetRegExp = /;\s*charset\s*=/;

	/**
	 * Set status `code`.
	 *
	 * @param {Number} code
	 * @return {ServerResponse}
	 * @public
	 */

	res.status = function status(code) {
	  this.statusCode = code;
	  return this;
	};

	/**
	 * Set Link header field with the given `links`.
	 *
	 * Examples:
	 *
	 *    res.links({
	 *      next: 'http://api.example.com/users?page=2',
	 *      last: 'http://api.example.com/users?page=5'
	 *    });
	 *
	 * @param {Object} links
	 * @return {ServerResponse}
	 * @public
	 */

	res.links = function(links){
	  var link = this.get('Link') || '';
	  if (link) link += ', ';
	  return this.set('Link', link + Object.keys(links).map(function(rel){
	    return '<' + links[rel] + '>; rel="' + rel + '"';
	  }).join(', '));
	};

	/**
	 * Send a response.
	 *
	 * Examples:
	 *
	 *     res.send(new Buffer('wahoo'));
	 *     res.send({ some: 'json' });
	 *     res.send('<p>some html</p>');
	 *
	 * @param {string|number|boolean|object|Buffer} body
	 * @public
	 */

	res.send = function send(body) {
	  var chunk = body;
	  var encoding;
	  var len;
	  var req = this.req;
	  var type;

	  // settings
	  var app = this.app;

	  // allow status / body
	  if (arguments.length === 2) {
	    // res.send(body, status) backwards compat
	    if (typeof arguments[0] !== 'number' && typeof arguments[1] === 'number') {
	      deprecate('res.send(body, status): Use res.status(status).send(body) instead');
	      this.statusCode = arguments[1];
	    } else {
	      deprecate('res.send(status, body): Use res.status(status).send(body) instead');
	      this.statusCode = arguments[0];
	      chunk = arguments[1];
	    }
	  }

	  // disambiguate res.send(status) and res.send(status, num)
	  if (typeof chunk === 'number' && arguments.length === 1) {
	    // res.send(status) will set status message as text string
	    if (!this.get('Content-Type')) {
	      this.type('txt');
	    }

	    deprecate('res.send(status): Use res.sendStatus(status) instead');
	    this.statusCode = chunk;
	    chunk = statusCodes[chunk];
	  }

	  switch (typeof chunk) {
	    // string defaulting to html
	    case 'string':
	      if (!this.get('Content-Type')) {
	        this.type('html');
	      }
	      break;
	    case 'boolean':
	    case 'number':
	    case 'object':
	      if (chunk === null) {
	        chunk = '';
	      } else if (Buffer.isBuffer(chunk)) {
	        if (!this.get('Content-Type')) {
	          this.type('bin');
	        }
	      } else {
	        return this.json(chunk);
	      }
	      break;
	  }

	  // write strings in utf-8
	  if (typeof chunk === 'string') {
	    encoding = 'utf8';
	    type = this.get('Content-Type');

	    // reflect this in content-type
	    if (typeof type === 'string') {
	      this.set('Content-Type', setCharset(type, 'utf-8'));
	    }
	  }

	  // populate Content-Length
	  if (chunk !== undefined) {
	    if (!Buffer.isBuffer(chunk)) {
	      // convert chunk to Buffer; saves later double conversions
	      chunk = new Buffer(chunk, encoding);
	      encoding = undefined;
	    }

	    len = chunk.length;
	    this.set('Content-Length', len);
	  }

	  // populate ETag
	  var etag;
	  var generateETag = len !== undefined && app.get('etag fn');
	  if (typeof generateETag === 'function' && !this.get('ETag')) {
	    if ((etag = generateETag(chunk, encoding))) {
	      this.set('ETag', etag);
	    }
	  }

	  // freshness
	  if (req.fresh) this.statusCode = 304;

	  // strip irrelevant headers
	  if (204 == this.statusCode || 304 == this.statusCode) {
	    this.removeHeader('Content-Type');
	    this.removeHeader('Content-Length');
	    this.removeHeader('Transfer-Encoding');
	    chunk = '';
	  }

	  if (req.method === 'HEAD') {
	    // skip body for HEAD
	    this.end();
	  } else {
	    // respond
	    this.end(chunk, encoding);
	  }

	  return this;
	};

	/**
	 * Send JSON response.
	 *
	 * Examples:
	 *
	 *     res.json(null);
	 *     res.json({ user: 'tj' });
	 *
	 * @param {string|number|boolean|object} obj
	 * @public
	 */

	res.json = function json(obj) {
	  var val = obj;

	  // allow status / body
	  if (arguments.length === 2) {
	    // res.json(body, status) backwards compat
	    if (typeof arguments[1] === 'number') {
	      deprecate('res.json(obj, status): Use res.status(status).json(obj) instead');
	      this.statusCode = arguments[1];
	    } else {
	      deprecate('res.json(status, obj): Use res.status(status).json(obj) instead');
	      this.statusCode = arguments[0];
	      val = arguments[1];
	    }
	  }

	  // settings
	  var app = this.app;
	  var replacer = app.get('json replacer');
	  var spaces = app.get('json spaces');
	  var body = JSON.stringify(val, replacer, spaces);

	  // content-type
	  if (!this.get('Content-Type')) {
	    this.set('Content-Type', 'application/json');
	  }

	  return this.send(body);
	};

	/**
	 * Send JSON response with JSONP callback support.
	 *
	 * Examples:
	 *
	 *     res.jsonp(null);
	 *     res.jsonp({ user: 'tj' });
	 *
	 * @param {string|number|boolean|object} obj
	 * @public
	 */

	res.jsonp = function jsonp(obj) {
	  var val = obj;

	  // allow status / body
	  if (arguments.length === 2) {
	    // res.json(body, status) backwards compat
	    if (typeof arguments[1] === 'number') {
	      deprecate('res.jsonp(obj, status): Use res.status(status).json(obj) instead');
	      this.statusCode = arguments[1];
	    } else {
	      deprecate('res.jsonp(status, obj): Use res.status(status).jsonp(obj) instead');
	      this.statusCode = arguments[0];
	      val = arguments[1];
	    }
	  }

	  // settings
	  var app = this.app;
	  var replacer = app.get('json replacer');
	  var spaces = app.get('json spaces');
	  var body = JSON.stringify(val, replacer, spaces);
	  var callback = this.req.query[app.get('jsonp callback name')];

	  // content-type
	  if (!this.get('Content-Type')) {
	    this.set('X-Content-Type-Options', 'nosniff');
	    this.set('Content-Type', 'application/json');
	  }

	  // fixup callback
	  if (Array.isArray(callback)) {
	    callback = callback[0];
	  }

	  // jsonp
	  if (typeof callback === 'string' && callback.length !== 0) {
	    this.charset = 'utf-8';
	    this.set('X-Content-Type-Options', 'nosniff');
	    this.set('Content-Type', 'text/javascript');

	    // restrict callback charset
	    callback = callback.replace(/[^\[\]\w$.]/g, '');

	    // replace chars not allowed in JavaScript that are in JSON
	    body = body
	      .replace(/\u2028/g, '\\u2028')
	      .replace(/\u2029/g, '\\u2029');

	    // the /**/ is a specific security mitigation for "Rosetta Flash JSONP abuse"
	    // the typeof check is just to reduce client error noise
	    body = '/**/ typeof ' + callback + ' === \'function\' && ' + callback + '(' + body + ');';
	  }

	  return this.send(body);
	};

	/**
	 * Send given HTTP status code.
	 *
	 * Sets the response status to `statusCode` and the body of the
	 * response to the standard description from node's http.STATUS_CODES
	 * or the statusCode number if no description.
	 *
	 * Examples:
	 *
	 *     res.sendStatus(200);
	 *
	 * @param {number} statusCode
	 * @public
	 */

	res.sendStatus = function sendStatus(statusCode) {
	  var body = statusCodes[statusCode] || String(statusCode);

	  this.statusCode = statusCode;
	  this.type('txt');

	  return this.send(body);
	};

	/**
	 * Transfer the file at the given `path`.
	 *
	 * Automatically sets the _Content-Type_ response header field.
	 * The callback `callback(err)` is invoked when the transfer is complete
	 * or when an error occurs. Be sure to check `res.sentHeader`
	 * if you wish to attempt responding, as the header and some data
	 * may have already been transferred.
	 *
	 * Options:
	 *
	 *   - `maxAge`   defaulting to 0 (can be string converted by `ms`)
	 *   - `root`     root directory for relative filenames
	 *   - `headers`  object of headers to serve with file
	 *   - `dotfiles` serve dotfiles, defaulting to false; can be `"allow"` to send them
	 *
	 * Other options are passed along to `send`.
	 *
	 * Examples:
	 *
	 *  The following example illustrates how `res.sendFile()` may
	 *  be used as an alternative for the `static()` middleware for
	 *  dynamic situations. The code backing `res.sendFile()` is actually
	 *  the same code, so HTTP cache support etc is identical.
	 *
	 *     app.get('/user/:uid/photos/:file', function(req, res){
	 *       var uid = req.params.uid
	 *         , file = req.params.file;
	 *
	 *       req.user.mayViewFilesFrom(uid, function(yes){
	 *         if (yes) {
	 *           res.sendFile('/uploads/' + uid + '/' + file);
	 *         } else {
	 *           res.send(403, 'Sorry! you cant see that.');
	 *         }
	 *       });
	 *     });
	 *
	 * @public
	 */

	res.sendFile = function sendFile(path, options, callback) {
	  var done = callback;
	  var req = this.req;
	  var res = this;
	  var next = req.next;
	  var opts = options || {};

	  if (!path) {
	    throw new TypeError('path argument is required to res.sendFile');
	  }

	  // support function as second arg
	  if (typeof options === 'function') {
	    done = options;
	    opts = {};
	  }

	  if (!opts.root && !isAbsolute(path)) {
	    throw new TypeError('path must be absolute or specify root to res.sendFile');
	  }

	  // create file stream
	  var pathname = encodeURI(path);
	  var file = send(req, pathname, opts);

	  // transfer
	  sendfile(res, file, opts, function (err) {
	    if (done) return done(err);
	    if (err && err.code === 'EISDIR') return next();

	    // next() all but write errors
	    if (err && err.code !== 'ECONNABORTED' && err.syscall !== 'write') {
	      next(err);
	    }
	  });
	};

	/**
	 * Transfer the file at the given `path`.
	 *
	 * Automatically sets the _Content-Type_ response header field.
	 * The callback `callback(err)` is invoked when the transfer is complete
	 * or when an error occurs. Be sure to check `res.sentHeader`
	 * if you wish to attempt responding, as the header and some data
	 * may have already been transferred.
	 *
	 * Options:
	 *
	 *   - `maxAge`   defaulting to 0 (can be string converted by `ms`)
	 *   - `root`     root directory for relative filenames
	 *   - `headers`  object of headers to serve with file
	 *   - `dotfiles` serve dotfiles, defaulting to false; can be `"allow"` to send them
	 *
	 * Other options are passed along to `send`.
	 *
	 * Examples:
	 *
	 *  The following example illustrates how `res.sendfile()` may
	 *  be used as an alternative for the `static()` middleware for
	 *  dynamic situations. The code backing `res.sendfile()` is actually
	 *  the same code, so HTTP cache support etc is identical.
	 *
	 *     app.get('/user/:uid/photos/:file', function(req, res){
	 *       var uid = req.params.uid
	 *         , file = req.params.file;
	 *
	 *       req.user.mayViewFilesFrom(uid, function(yes){
	 *         if (yes) {
	 *           res.sendfile('/uploads/' + uid + '/' + file);
	 *         } else {
	 *           res.send(403, 'Sorry! you cant see that.');
	 *         }
	 *       });
	 *     });
	 *
	 * @public
	 */

	res.sendfile = function (path, options, callback) {
	  var done = callback;
	  var req = this.req;
	  var res = this;
	  var next = req.next;
	  var opts = options || {};

	  // support function as second arg
	  if (typeof options === 'function') {
	    done = options;
	    opts = {};
	  }

	  // create file stream
	  var file = send(req, path, opts);

	  // transfer
	  sendfile(res, file, opts, function (err) {
	    if (done) return done(err);
	    if (err && err.code === 'EISDIR') return next();

	    // next() all but write errors
	    if (err && err.code !== 'ECONNABORT' && err.syscall !== 'write') {
	      next(err);
	    }
	  });
	};

	res.sendfile = deprecate.function(res.sendfile,
	  'res.sendfile: Use res.sendFile instead');

	/**
	 * Transfer the file at the given `path` as an attachment.
	 *
	 * Optionally providing an alternate attachment `filename`,
	 * and optional callback `callback(err)`. The callback is invoked
	 * when the data transfer is complete, or when an error has
	 * ocurred. Be sure to check `res.headersSent` if you plan to respond.
	 *
	 * This method uses `res.sendfile()`.
	 *
	 * @public
	 */

	res.download = function download(path, filename, callback) {
	  var done = callback;
	  var name = filename;

	  // support function as second arg
	  if (typeof filename === 'function') {
	    done = filename;
	    name = null;
	  }

	  // set Content-Disposition when file is sent
	  var headers = {
	    'Content-Disposition': contentDisposition(name || path)
	  };

	  // Resolve the full path for sendFile
	  var fullPath = resolve(path);

	  return this.sendFile(fullPath, { headers: headers }, done);
	};

	/**
	 * Set _Content-Type_ response header with `type` through `mime.lookup()`
	 * when it does not contain "/", or set the Content-Type to `type` otherwise.
	 *
	 * Examples:
	 *
	 *     res.type('.html');
	 *     res.type('html');
	 *     res.type('json');
	 *     res.type('application/json');
	 *     res.type('png');
	 *
	 * @param {String} type
	 * @return {ServerResponse} for chaining
	 * @public
	 */

	res.contentType =
	res.type = function contentType(type) {
	  var ct = type.indexOf('/') === -1
	    ? mime.lookup(type)
	    : type;

	  return this.set('Content-Type', ct);
	};

	/**
	 * Respond to the Acceptable formats using an `obj`
	 * of mime-type callbacks.
	 *
	 * This method uses `req.accepted`, an array of
	 * acceptable types ordered by their quality values.
	 * When "Accept" is not present the _first_ callback
	 * is invoked, otherwise the first match is used. When
	 * no match is performed the server responds with
	 * 406 "Not Acceptable".
	 *
	 * Content-Type is set for you, however if you choose
	 * you may alter this within the callback using `res.type()`
	 * or `res.set('Content-Type', ...)`.
	 *
	 *    res.format({
	 *      'text/plain': function(){
	 *        res.send('hey');
	 *      },
	 *
	 *      'text/html': function(){
	 *        res.send('<p>hey</p>');
	 *      },
	 *
	 *      'appliation/json': function(){
	 *        res.send({ message: 'hey' });
	 *      }
	 *    });
	 *
	 * In addition to canonicalized MIME types you may
	 * also use extnames mapped to these types:
	 *
	 *    res.format({
	 *      text: function(){
	 *        res.send('hey');
	 *      },
	 *
	 *      html: function(){
	 *        res.send('<p>hey</p>');
	 *      },
	 *
	 *      json: function(){
	 *        res.send({ message: 'hey' });
	 *      }
	 *    });
	 *
	 * By default Express passes an `Error`
	 * with a `.status` of 406 to `next(err)`
	 * if a match is not made. If you provide
	 * a `.default` callback it will be invoked
	 * instead.
	 *
	 * @param {Object} obj
	 * @return {ServerResponse} for chaining
	 * @public
	 */

	res.format = function(obj){
	  var req = this.req;
	  var next = req.next;

	  var fn = obj.default;
	  if (fn) delete obj.default;
	  var keys = Object.keys(obj);

	  var key = keys.length > 0
	    ? req.accepts(keys)
	    : false;

	  this.vary("Accept");

	  if (key) {
	    this.set('Content-Type', normalizeType(key).value);
	    obj[key](req, this, next);
	  } else if (fn) {
	    fn();
	  } else {
	    var err = new Error('Not Acceptable');
	    err.status = err.statusCode = 406;
	    err.types = normalizeTypes(keys).map(function(o){ return o.value });
	    next(err);
	  }

	  return this;
	};

	/**
	 * Set _Content-Disposition_ header to _attachment_ with optional `filename`.
	 *
	 * @param {String} filename
	 * @return {ServerResponse}
	 * @public
	 */

	res.attachment = function attachment(filename) {
	  if (filename) {
	    this.type(extname(filename));
	  }

	  this.set('Content-Disposition', contentDisposition(filename));

	  return this;
	};

	/**
	 * Append additional header `field` with value `val`.
	 *
	 * Example:
	 *
	 *    res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
	 *    res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
	 *    res.append('Warning', '199 Miscellaneous warning');
	 *
	 * @param {String} field
	 * @param {String|Array} val
	 * @return {ServerResponse} for chaining
	 * @public
	 */

	res.append = function append(field, val) {
	  var prev = this.get(field);
	  var value = val;

	  if (prev) {
	    // concat the new and prev vals
	    value = Array.isArray(prev) ? prev.concat(val)
	      : Array.isArray(val) ? [prev].concat(val)
	      : [prev, val];
	  }

	  return this.set(field, value);
	};

	/**
	 * Set header `field` to `val`, or pass
	 * an object of header fields.
	 *
	 * Examples:
	 *
	 *    res.set('Foo', ['bar', 'baz']);
	 *    res.set('Accept', 'application/json');
	 *    res.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' });
	 *
	 * Aliased as `res.header()`.
	 *
	 * @param {String|Object} field
	 * @param {String|Array} val
	 * @return {ServerResponse} for chaining
	 * @public
	 */

	res.set =
	res.header = function header(field, val) {
	  if (arguments.length === 2) {
	    var value = Array.isArray(val)
	      ? val.map(String)
	      : String(val);

	    // add charset to content-type
	    if (field.toLowerCase() === 'content-type' && !charsetRegExp.test(value)) {
	      var charset = mime.charsets.lookup(value.split(';')[0]);
	      if (charset) value += '; charset=' + charset.toLowerCase();
	    }

	    this.setHeader(field, value);
	  } else {
	    for (var key in field) {
	      this.set(key, field[key]);
	    }
	  }
	  return this;
	};

	/**
	 * Get value for header `field`.
	 *
	 * @param {String} field
	 * @return {String}
	 * @public
	 */

	res.get = function(field){
	  return this.getHeader(field);
	};

	/**
	 * Clear cookie `name`.
	 *
	 * @param {String} name
	 * @param {Object} options
	 * @return {ServerResponse} for chaining
	 * @public
	 */

	res.clearCookie = function clearCookie(name, options) {
	  var opts = merge({ expires: new Date(1), path: '/' }, options);

	  return this.cookie(name, '', opts);
	};

	/**
	 * Set cookie `name` to `value`, with the given `options`.
	 *
	 * Options:
	 *
	 *    - `maxAge`   max-age in milliseconds, converted to `expires`
	 *    - `signed`   sign the cookie
	 *    - `path`     defaults to "/"
	 *
	 * Examples:
	 *
	 *    // "Remember Me" for 15 minutes
	 *    res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
	 *
	 *    // save as above
	 *    res.cookie('rememberme', '1', { maxAge: 900000, httpOnly: true })
	 *
	 * @param {String} name
	 * @param {String|Object} value
	 * @param {Options} options
	 * @return {ServerResponse} for chaining
	 * @public
	 */

	res.cookie = function (name, value, options) {
	  var opts = merge({}, options);
	  var secret = this.req.secret;
	  var signed = opts.signed;

	  if (signed && !secret) {
	    throw new Error('cookieParser("secret") required for signed cookies');
	  }

	  var val = typeof value === 'object'
	    ? 'j:' + JSON.stringify(value)
	    : String(value);

	  if (signed) {
	    val = 's:' + sign(val, secret);
	  }

	  if ('maxAge' in opts) {
	    opts.expires = new Date(Date.now() + opts.maxAge);
	    opts.maxAge /= 1000;
	  }

	  if (opts.path == null) {
	    opts.path = '/';
	  }

	  this.append('Set-Cookie', cookie.serialize(name, String(val), opts));

	  return this;
	};

	/**
	 * Set the location header to `url`.
	 *
	 * The given `url` can also be "back", which redirects
	 * to the _Referrer_ or _Referer_ headers or "/".
	 *
	 * Examples:
	 *
	 *    res.location('/foo/bar').;
	 *    res.location('http://example.com');
	 *    res.location('../login');
	 *
	 * @param {String} url
	 * @return {ServerResponse} for chaining
	 * @public
	 */

	res.location = function location(url) {
	  var loc = url;

	  // "back" is an alias for the referrer
	  if (url === 'back') {
	    loc = this.req.get('Referrer') || '/';
	  }

	  // set location
	  this.set('Location', loc);
	  return this;
	};

	/**
	 * Redirect to the given `url` with optional response `status`
	 * defaulting to 302.
	 *
	 * The resulting `url` is determined by `res.location()`, so
	 * it will play nicely with mounted apps, relative paths,
	 * `"back"` etc.
	 *
	 * Examples:
	 *
	 *    res.redirect('/foo/bar');
	 *    res.redirect('http://example.com');
	 *    res.redirect(301, 'http://example.com');
	 *    res.redirect('../login'); // /blog/post/1 -> /blog/login
	 *
	 * @public
	 */

	res.redirect = function redirect(url) {
	  var address = url;
	  var body;
	  var status = 302;

	  // allow status / url
	  if (arguments.length === 2) {
	    if (typeof arguments[0] === 'number') {
	      status = arguments[0];
	      address = arguments[1];
	    } else {
	      deprecate('res.redirect(url, status): Use res.redirect(status, url) instead');
	      status = arguments[1];
	    }
	  }

	  // Set location header
	  this.location(address);
	  address = this.get('Location');

	  // Support text/{plain,html} by default
	  this.format({
	    text: function(){
	      body = statusCodes[status] + '. Redirecting to ' + encodeURI(address);
	    },

	    html: function(){
	      var u = escapeHtml(address);
	      body = '<p>' + statusCodes[status] + '. Redirecting to <a href="' + u + '">' + u + '</a></p>';
	    },

	    default: function(){
	      body = '';
	    }
	  });

	  // Respond
	  this.statusCode = status;
	  this.set('Content-Length', Buffer.byteLength(body));

	  if (this.req.method === 'HEAD') {
	    this.end();
	  } else {
	    this.end(body);
	  }
	};

	/**
	 * Add `field` to Vary. If already present in the Vary set, then
	 * this call is simply ignored.
	 *
	 * @param {Array|String} field
	 * @return {ServerResponse} for chaining
	 * @public
	 */

	res.vary = function(field){
	  // checks for back-compat
	  if (!field || (Array.isArray(field) && !field.length)) {
	    deprecate('res.vary(): Provide a field name');
	    return this;
	  }

	  vary(this, field);

	  return this;
	};

	/**
	 * Render `view` with the given `options` and optional callback `fn`.
	 * When a callback function is given a response will _not_ be made
	 * automatically, otherwise a response of _200_ and _text/html_ is given.
	 *
	 * Options:
	 *
	 *  - `cache`     boolean hinting to the engine it should cache
	 *  - `filename`  filename of the view being rendered
	 *
	 * @public
	 */

	res.render = function render(view, options, callback) {
	  var app = this.req.app;
	  var done = callback;
	  var opts = options || {};
	  var req = this.req;
	  var self = this;

	  // support callback function as second arg
	  if (typeof options === 'function') {
	    done = options;
	    opts = {};
	  }

	  // merge res.locals
	  opts._locals = self.locals;

	  // default callback to respond
	  done = done || function (err, str) {
	    if (err) return req.next(err);
	    self.send(str);
	  };

	  // render
	  app.render(view, opts, done);
	};

	// pipe the send file stream
	function sendfile(res, file, options, callback) {
	  var done = false;
	  var streaming;

	  // request aborted
	  function onaborted() {
	    if (done) return;
	    done = true;

	    var err = new Error('Request aborted');
	    err.code = 'ECONNABORTED';
	    callback(err);
	  }

	  // directory
	  function ondirectory() {
	    if (done) return;
	    done = true;

	    var err = new Error('EISDIR, read');
	    err.code = 'EISDIR';
	    callback(err);
	  }

	  // errors
	  function onerror(err) {
	    if (done) return;
	    done = true;
	    callback(err);
	  }

	  // ended
	  function onend() {
	    if (done) return;
	    done = true;
	    callback();
	  }

	  // file
	  function onfile() {
	    streaming = false;
	  }

	  // finished
	  function onfinish(err) {
	    if (err && err.code === 'ECONNRESET') return onaborted();
	    if (err) return onerror(err);
	    if (done) return;

	    setImmediate(function () {
	      if (streaming !== false && !done) {
	        onaborted();
	        return;
	      }

	      if (done) return;
	      done = true;
	      callback();
	    });
	  }

	  // streaming
	  function onstream() {
	    streaming = true;
	  }

	  file.on('directory', ondirectory);
	  file.on('end', onend);
	  file.on('error', onerror);
	  file.on('file', onfile);
	  file.on('stream', onstream);
	  onFinished(res, onfinish);

	  if (options.headers) {
	    // set headers on successful transfer
	    file.on('headers', function headers(res) {
	      var obj = options.headers;
	      var keys = Object.keys(obj);

	      for (var i = 0; i < keys.length; i++) {
	        var k = keys[i];
	        res.setHeader(k, obj[k]);
	      }
	    });
	  }

	  // pipe
	  file.pipe(res);
	}


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */

	var crypto = __webpack_require__(58);

	/**
	 * Sign the given `val` with `secret`.
	 *
	 * @param {String} val
	 * @param {String} secret
	 * @return {String}
	 * @api private
	 */

	exports.sign = function(val, secret){
	  if ('string' != typeof val) throw new TypeError("Cookie value must be provided as a string.");
	  if ('string' != typeof secret) throw new TypeError("Secret string must be provided.");
	  return val + '.' + crypto
	    .createHmac('sha256', secret)
	    .update(val)
	    .digest('base64')
	    .replace(/\=+$/, '');
	};

	/**
	 * Unsign and decode the given `val` with `secret`,
	 * returning `false` if the signature is invalid.
	 *
	 * @param {String} val
	 * @param {String} secret
	 * @return {String|Boolean}
	 * @api private
	 */

	exports.unsign = function(val, secret){
	  if ('string' != typeof val) throw new TypeError("Signed cookie string must be provided.");
	  if ('string' != typeof secret) throw new TypeError("Secret string must be provided.");
	  var str = val.slice(0, val.lastIndexOf('.'))
	    , mac = exports.sign(str, secret);
	  
	  return sha1(mac) == sha1(val) ? str : false;
	};

	/**
	 * Private
	 */

	function sha1(str){
	  return crypto.createHash('sha1').update(str).digest('hex');
	}


/***/ },
/* 79 */
/***/ function(module, exports) {

	/*!
	 * cookie
	 * Copyright(c) 2012-2014 Roman Shtylman
	 * Copyright(c) 2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	/**
	 * Module exports.
	 * @public
	 */

	exports.parse = parse;
	exports.serialize = serialize;

	/**
	 * Module variables.
	 * @private
	 */

	var decode = decodeURIComponent;
	var encode = encodeURIComponent;

	/**
	 * RegExp to match field-content in RFC 7230 sec 3.2
	 *
	 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
	 * field-vchar   = VCHAR / obs-text
	 * obs-text      = %x80-FF
	 */

	var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

	/**
	 * Parse a cookie header.
	 *
	 * Parse the given cookie header string into an object
	 * The object has the various cookies as keys(names) => values
	 *
	 * @param {string} str
	 * @param {object} [options]
	 * @return {object}
	 * @public
	 */

	function parse(str, options) {
	  if (typeof str !== 'string') {
	    throw new TypeError('argument str must be a string');
	  }

	  var obj = {}
	  var opt = options || {};
	  var pairs = str.split(/; */);
	  var dec = opt.decode || decode;

	  pairs.forEach(function(pair) {
	    var eq_idx = pair.indexOf('=')

	    // skip things that don't look like key=value
	    if (eq_idx < 0) {
	      return;
	    }

	    var key = pair.substr(0, eq_idx).trim()
	    var val = pair.substr(++eq_idx, pair.length).trim();

	    // quoted values
	    if ('"' == val[0]) {
	      val = val.slice(1, -1);
	    }

	    // only assign once
	    if (undefined == obj[key]) {
	      obj[key] = tryDecode(val, dec);
	    }
	  });

	  return obj;
	}

	/**
	 * Serialize data into a cookie header.
	 *
	 * Serialize the a name value pair into a cookie string suitable for
	 * http headers. An optional options object specified cookie parameters.
	 *
	 * serialize('foo', 'bar', { httpOnly: true })
	 *   => "foo=bar; httpOnly"
	 *
	 * @param {string} name
	 * @param {string} val
	 * @param {object} [options]
	 * @return {string}
	 * @public
	 */

	function serialize(name, val, options) {
	  var opt = options || {};
	  var enc = opt.encode || encode;

	  if (!fieldContentRegExp.test(name)) {
	    throw new TypeError('argument name is invalid');
	  }

	  var value = enc(val);

	  if (value && !fieldContentRegExp.test(value)) {
	    throw new TypeError('argument val is invalid');
	  }

	  var pairs = [name + '=' + value];

	  if (null != opt.maxAge) {
	    var maxAge = opt.maxAge - 0;
	    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
	    pairs.push('Max-Age=' + maxAge);
	  }

	  if (opt.domain) {
	    if (!fieldContentRegExp.test(opt.domain)) {
	      throw new TypeError('option domain is invalid');
	    }

	    pairs.push('Domain=' + opt.domain);
	  }

	  if (opt.path) {
	    if (!fieldContentRegExp.test(opt.path)) {
	      throw new TypeError('option path is invalid');
	    }

	    pairs.push('Path=' + opt.path);
	  }

	  if (opt.expires) pairs.push('Expires=' + opt.expires.toUTCString());
	  if (opt.httpOnly) pairs.push('HttpOnly');
	  if (opt.secure) pairs.push('Secure');

	  return pairs.join('; ');
	}

	/**
	 * Try decoding a string using a decoding function.
	 *
	 * @param {string} str
	 * @param {function} decode
	 * @private
	 */

	function tryDecode(str, decode) {
	  try {
	    return decode(str);
	  } catch (e) {
	    return str;
	  }
	}


/***/ },
/* 80 */
/***/ function(module, exports) {

	/*!
	 * vary
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict';

	/**
	 * Module exports.
	 */

	module.exports = vary;
	module.exports.append = append;

	/**
	 * Variables.
	 */

	var separators = /[\(\)<>@,;:\\"\/\[\]\?=\{\}\u0020\u0009]/;

	/**
	 * Append a field to a vary header.
	 *
	 * @param {String} header
	 * @param {String|Array} field
	 * @return {String}
	 * @api public
	 */

	function append(header, field) {
	  if (typeof header !== 'string') {
	    throw new TypeError('header argument is required');
	  }

	  if (!field) {
	    throw new TypeError('field argument is required');
	  }

	  // get fields array
	  var fields = !Array.isArray(field)
	    ? parse(String(field))
	    : field;

	  // assert on invalid fields
	  for (var i = 0; i < fields.length; i++) {
	    if (separators.test(fields[i])) {
	      throw new TypeError('field argument contains an invalid header');
	    }
	  }

	  // existing, unspecified vary
	  if (header === '*') {
	    return header;
	  }

	  // enumerate current values
	  var val = header;
	  var vals = parse(header.toLowerCase());

	  // unspecified vary
	  if (fields.indexOf('*') !== -1 || vals.indexOf('*') !== -1) {
	    return '*';
	  }

	  for (var i = 0; i < fields.length; i++) {
	    var fld = fields[i].toLowerCase();

	    // append value (case-preserving)
	    if (vals.indexOf(fld) === -1) {
	      vals.push(fld);
	      val = val
	        ? val + ', ' + fields[i]
	        : fields[i];
	    }
	  }

	  return val;
	}

	/**
	 * Parse a vary header into an array.
	 *
	 * @param {String} header
	 * @return {Array}
	 * @api private
	 */

	function parse(header) {
	  return header.trim().split(/ *, */);
	}

	/**
	 * Mark that a request is varied on a header field.
	 *
	 * @param {Object} res
	 * @param {String|Array} field
	 * @api public
	 */

	function vary(res, field) {
	  if (!res || !res.getHeader || !res.setHeader) {
	    // quack quack
	    throw new TypeError('res argument is required');
	  }

	  // get existing header
	  var val = res.getHeader('Vary') || ''
	  var header = Array.isArray(val)
	    ? val.join(', ')
	    : String(val);

	  // set new header
	  if ((val = append(header, field))) {
	    res.setHeader('Vary', val);
	  }
	}


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * serve-static
	 * Copyright(c) 2010 Sencha Inc.
	 * Copyright(c) 2011 TJ Holowaychuk
	 * Copyright(c) 2014-2015 Douglas Christopher Wilson
	 * MIT Licensed
	 */

	'use strict'

	/**
	 * Module dependencies.
	 * @private
	 */

	var escapeHtml = __webpack_require__(15)
	var parseUrl = __webpack_require__(34)
	var resolve = __webpack_require__(33).resolve
	var send = __webpack_require__(46)
	var url = __webpack_require__(35)

	/**
	 * Module exports.
	 * @public
	 */

	module.exports = serveStatic
	module.exports.mime = send.mime

	/**
	 * @param {string} root
	 * @param {object} [options]
	 * @return {function}
	 * @public
	 */

	function serveStatic(root, options) {
	  if (!root) {
	    throw new TypeError('root path required')
	  }

	  if (typeof root !== 'string') {
	    throw new TypeError('root path must be a string')
	  }

	  // copy options object
	  var opts = Object.create(options || null)

	  // fall-though
	  var fallthrough = opts.fallthrough !== false

	  // default redirect
	  var redirect = opts.redirect !== false

	  // headers listener
	  var setHeaders = opts.setHeaders

	  if (setHeaders && typeof setHeaders !== 'function') {
	    throw new TypeError('option setHeaders must be function')
	  }

	  // setup options for send
	  opts.maxage = opts.maxage || opts.maxAge || 0
	  opts.root = resolve(root)

	  // construct directory listener
	  var onDirectory = redirect
	    ? createRedirectDirectoryListener()
	    : createNotFoundDirectoryListener()

	  return function serveStatic(req, res, next) {
	    if (req.method !== 'GET' && req.method !== 'HEAD') {
	      if (fallthrough) {
	        return next()
	      }

	      // method not allowed
	      res.statusCode = 405
	      res.setHeader('Allow', 'GET, HEAD')
	      res.setHeader('Content-Length', '0')
	      res.end()
	      return
	    }

	    var forwardError = !fallthrough
	    var originalUrl = parseUrl.original(req)
	    var path = parseUrl(req).pathname

	    // make sure redirect occurs at mount
	    if (path === '/' && originalUrl.pathname.substr(-1) !== '/') {
	      path = ''
	    }

	    // create send stream
	    var stream = send(req, path, opts)

	    // add directory handler
	    stream.on('directory', onDirectory)

	    // add headers listener
	    if (setHeaders) {
	      stream.on('headers', setHeaders)
	    }

	    // add file listener for fallthrough
	    if (fallthrough) {
	      stream.on('file', function onFile() {
	        // once file is determined, always forward error
	        forwardError = true
	      })
	    }

	    // forward errors
	    stream.on('error', function error(err) {
	      if (forwardError || !(err.statusCode < 500)) {
	        next(err)
	        return
	      }

	      next()
	    })

	    // pipe
	    stream.pipe(res)
	  }
	}

	/**
	 * Collapse all leading slashes into a single slash
	 * @private
	 */
	function collapseLeadingSlashes(str) {
	  for (var i = 0; i < str.length; i++) {
	    if (str[i] !== '/') {
	      break
	    }
	  }

	  return i > 1
	    ? '/' + str.substr(i)
	    : str
	}

	/**
	 * Create a directory listener that just 404s.
	 * @private
	 */

	function createNotFoundDirectoryListener() {
	  return function notFound() {
	    this.error(404)
	  }
	}

	/**
	 * Create a directory listener that performs a redirect.
	 * @private
	 */

	function createRedirectDirectoryListener() {
	  return function redirect() {
	    if (this.hasTrailingSlash()) {
	      this.error(404)
	      return
	    }

	    // get original URL
	    var originalUrl = parseUrl.original(this.req)

	    // append trailing slash
	    originalUrl.path = null
	    originalUrl.pathname = collapseLeadingSlashes(originalUrl.pathname + '/')

	    // reformat the URL
	    var loc = url.format(originalUrl)
	    var msg = 'Redirecting to <a href="' + escapeHtml(loc) + '">' + escapeHtml(loc) + '</a>\n'
	    var res = this.res

	    // send redirect response
	    res.statusCode = 303
	    res.setHeader('Content-Type', 'text/html; charset=UTF-8')
	    res.setHeader('Content-Length', Buffer.byteLength(msg))
	    res.setHeader('X-Content-Type-Options', 'nosniff')
	    res.setHeader('Location', loc)
	    res.end(msg)
	  }
	}


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(83);

	var _reduxThunk = __webpack_require__(94);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reducers = __webpack_require__(95);

	var _reducers2 = _interopRequireDefault(_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  var initialState = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  return (0, _redux.createStore)(_reducers2.default, initialState, (0, _redux.applyMiddleware)(_reduxThunk2.default));
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

	var _createStore = __webpack_require__(84);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _combineReducers = __webpack_require__(89);

	var _combineReducers2 = _interopRequireDefault(_combineReducers);

	var _bindActionCreators = __webpack_require__(91);

	var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

	var _applyMiddleware = __webpack_require__(92);

	var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

	var _compose = __webpack_require__(93);

	var _compose2 = _interopRequireDefault(_compose);

	var _warning = __webpack_require__(90);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/*
	* This is a dummy function to check if the function name has been altered by minification.
	* If the function has been minified and NODE_ENV !== 'production', warn the user.
	*/
	function isCrushed() {}

	if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
	  (0, _warning2["default"])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
	}

	exports.createStore = _createStore2["default"];
	exports.combineReducers = _combineReducers2["default"];
	exports.bindActionCreators = _bindActionCreators2["default"];
	exports.applyMiddleware = _applyMiddleware2["default"];
	exports.compose = _compose2["default"];

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.ActionTypes = undefined;
	exports["default"] = createStore;

	var _isPlainObject = __webpack_require__(85);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = exports.ActionTypes = {
	  INIT: '@@redux/INIT'
	};

	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [initialState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @param {Function} enhancer The store enhancer. You may optionally specify it
	 * to enhance the store with third-party capabilities such as middleware,
	 * time travel, persistence, etc. The only store enhancer that ships with Redux
	 * is `applyMiddleware()`.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */
	function createStore(reducer, initialState, enhancer) {
	  if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = initialState;
	    initialState = undefined;
	  }

	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }

	    return enhancer(createStore)(reducer, initialState);
	  }

	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = initialState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;

	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }

	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }

	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected listener to be a function.');
	    }

	    var isSubscribed = true;

	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);

	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      isSubscribed = false;

	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	    };
	  }

	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!(0, _isPlainObject2["default"])(action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    var listeners = currentListeners = nextListeners;
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i]();
	    }

	    return action;
	  }

	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    if (typeof nextReducer !== 'function') {
	      throw new Error('Expected the nextReducer to be a function.');
	    }

	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }

	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });

	  return {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  };
	}

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(86),
	    isHostObject = __webpack_require__(87),
	    isObjectLike = __webpack_require__(88);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object,
	 *  else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) ||
	      objectToString.call(value) != objectTag || isHostObject(value)) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}

	module.exports = isPlainObject;


/***/ },
/* 86 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;

	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}

	module.exports = getPrototype;


/***/ },
/* 87 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	module.exports = isHostObject;


/***/ },
/* 88 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = combineReducers;

	var _createStore = __webpack_require__(84);

	var _isPlainObject = __webpack_require__(85);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _warning = __webpack_require__(90);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

	  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
	}

	function getUnexpectedStateShapeWarningMessage(inputState, reducers, action) {
	  var reducerKeys = Object.keys(reducers);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';

	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }

	  if (!(0, _isPlainObject2["default"])(inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }

	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return !reducers.hasOwnProperty(key);
	  });

	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}

	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }

	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}

	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */
	function combineReducers(reducers) {
	  var reducerKeys = Object.keys(reducers);
	  var finalReducers = {};
	  for (var i = 0; i < reducerKeys.length; i++) {
	    var key = reducerKeys[i];
	    if (typeof reducers[key] === 'function') {
	      finalReducers[key] = reducers[key];
	    }
	  }
	  var finalReducerKeys = Object.keys(finalReducers);

	  var sanityError;
	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }

	  return function combination() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];

	    if (sanityError) {
	      throw sanityError;
	    }

	    if (process.env.NODE_ENV !== 'production') {
	      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action);
	      if (warningMessage) {
	        (0, _warning2["default"])(warningMessage);
	      }
	    }

	    var hasChanged = false;
	    var nextState = {};
	    for (var i = 0; i < finalReducerKeys.length; i++) {
	      var key = finalReducerKeys[i];
	      var reducer = finalReducers[key];
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      nextState[key] = nextStateForKey;
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	    }
	    return hasChanged ? nextState : state;
	  };
	}

/***/ },
/* 90 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that you can use this stack
	    // to find the callsite that caused this warning to fire.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ },
/* 91 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = bindActionCreators;
	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}

	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */
	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if (typeof actionCreators !== 'object' || actionCreators === null) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];
	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	    }
	  }
	  return boundActionCreators;
	}

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports["default"] = applyMiddleware;

	var _compose = __webpack_require__(93);

	var _compose2 = _interopRequireDefault(_compose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */
	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (createStore) {
	    return function (reducer, initialState, enhancer) {
	      var store = createStore(reducer, initialState, enhancer);
	      var _dispatch = store.dispatch;
	      var chain = [];

	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2["default"].apply(undefined, chain)(store.dispatch);

	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

/***/ },
/* 93 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = compose;
	/**
	 * Composes single-argument functions from right to left. The rightmost
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing the argument functions
	 * from right to left. For example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */

	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  return function () {
	    if (funcs.length === 0) {
	      return arguments.length <= 0 ? undefined : arguments[0];
	    }

	    var last = funcs[funcs.length - 1];
	    var rest = funcs.slice(0, -1);

	    return rest.reduceRight(function (composed, f) {
	      return f(composed);
	    }, last.apply(undefined, arguments));
	  };
	}

/***/ },
/* 94 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = thunkMiddleware;
	function thunkMiddleware(_ref) {
	  var dispatch = _ref.dispatch;
	  var getState = _ref.getState;

	  return function (next) {
	    return function (action) {
	      if (typeof action === 'function') {
	        return action(dispatch, getState);
	      }

	      return next(action);
	    };
	  };
	}

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(83);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function projects() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case 'REQUEST_DASHBOARD':
	      return [];
	    case 'RECEIVE_DASHBOARD':
	      return [].concat(_toConsumableArray(action.projects));
	      break;
	    default:
	      return state;
	  }
	}

	function dashboards() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case 'REQUEST_DASHBOARDS':
	      return [];
	    case 'RECEIVE_DASHBOARDS':
	      return [].concat(_toConsumableArray(action.dashboards));
	      break;
	    default:
	      return state;
	  }
	}

	function serverReady() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case 'SERVER_READY':
	      return true;
	      break;
	    default:
	      return state;
	  }
	}

	exports.default = (0, _redux.combineReducers)({
	  projects: projects,
	  dashboards: dashboards,
	  serverReady: serverReady
	});

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.connect = exports.Provider = undefined;

	var _Provider = __webpack_require__(97);

	var _Provider2 = _interopRequireDefault(_Provider);

	var _connect = __webpack_require__(103);

	var _connect2 = _interopRequireDefault(_connect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	exports.Provider = _Provider2["default"];
	exports.connect = _connect2["default"];

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = undefined;

	var _react = __webpack_require__(98);

	var _storeShape = __webpack_require__(101);

	var _storeShape2 = _interopRequireDefault(_storeShape);

	var _warning = __webpack_require__(102);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var didWarnAboutReceivingStore = false;
	function warnAboutReceivingStore() {
	  if (didWarnAboutReceivingStore) {
	    return;
	  }
	  didWarnAboutReceivingStore = true;

	  (0, _warning2["default"])('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
	}

	var Provider = function (_Component) {
	  _inherits(Provider, _Component);

	  Provider.prototype.getChildContext = function getChildContext() {
	    return { store: this.store };
	  };

	  function Provider(props, context) {
	    _classCallCheck(this, Provider);

	    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

	    _this.store = props.store;
	    return _this;
	  }

	  Provider.prototype.render = function render() {
	    var children = this.props.children;

	    return _react.Children.only(children);
	  };

	  return Provider;
	}(_react.Component);

	exports["default"] = Provider;

	if (process.env.NODE_ENV !== 'production') {
	  Provider.prototype.componentWillReceiveProps = function (nextProps) {
	    var store = this.store;
	    var nextStore = nextProps.store;

	    if (store !== nextStore) {
	      warnAboutReceivingStore();
	    }
	  };
	}

	Provider.propTypes = {
	  store: _storeShape2["default"].isRequired,
	  children: _react.PropTypes.element.isRequired
	};
	Provider.childContextTypes = {
	  store: _storeShape2["default"].isRequired
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
		 true ? factory(exports, __webpack_require__(99), __webpack_require__(100), __webpack_require__(1)) :
		typeof define === 'function' && define.amd ? define(['exports', 'proptypes', 'preact-svg', 'preact'], factory) :
		(factory((global.preactCompat = global.preactCompat || {}),global.PropTypes,global.preactSvg,global.preact));
	}(this, function (exports,PropTypes,SVG,preact) { 'use strict';

		PropTypes = 'default' in PropTypes ? PropTypes['default'] : PropTypes;
		SVG = 'default' in SVG ? SVG['default'] : SVG;

		var babelHelpers = {};

		babelHelpers.classCallCheck = function (instance, Constructor) {
		  if (!(instance instanceof Constructor)) {
		    throw new TypeError("Cannot call a class as a function");
		  }
		};

		babelHelpers.createClass = function () {
		  function defineProperties(target, props) {
		    for (var i = 0; i < props.length; i++) {
		      var descriptor = props[i];
		      descriptor.enumerable = descriptor.enumerable || false;
		      descriptor.configurable = true;
		      if ("value" in descriptor) descriptor.writable = true;
		      Object.defineProperty(target, descriptor.key, descriptor);
		    }
		  }

		  return function (Constructor, protoProps, staticProps) {
		    if (protoProps) defineProperties(Constructor.prototype, protoProps);
		    if (staticProps) defineProperties(Constructor, staticProps);
		    return Constructor;
		  };
		}();

		babelHelpers.inherits = function (subClass, superClass) {
		  if (typeof superClass !== "function" && superClass !== null) {
		    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		  }

		  subClass.prototype = Object.create(superClass && superClass.prototype, {
		    constructor: {
		      value: subClass,
		      enumerable: false,
		      writable: true,
		      configurable: true
		    }
		  });
		  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
		};

		babelHelpers.possibleConstructorReturn = function (self, call) {
		  if (!self) {
		    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		  }

		  return call && (typeof call === "object" || typeof call === "function") ? call : self;
		};

		babelHelpers;

		var ELEMENTS = 'a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr circle clipPath defs ellipse g image line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan'.split(' ');

		var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

		var AUTOBIND_BLACKLIST = {
			constructor: 1,
			render: 1,
			shouldComponentUpdate: 1,
			componentWillRecieveProps: 1,
			componentWillUpdate: 1,
			componentDidUpdate: 1,
			componentWillMount: 1,
			componentDidMount: 1,
			componentWillUnmount: 1,
			componentDidUnmount: 1
		};

		var BYPASS_HOOK = {};

		var DEV = typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production';

		var EmptyComponent = function () {
			return null;
		};

		var VNode = preact.h('').constructor;
		VNode.prototype.$$typeof = REACT_ELEMENT_TYPE;

		Object.defineProperty(VNode.prototype, 'type', {
			get: function () {
				return this.nodeName;
			},
			set: function (v) {
				this.nodeName = v;
			}
		});

		Object.defineProperty(VNode.prototype, 'props', {
			get: function () {
				return this.attributes;
			},
			set: function (v) {
				this.attributes = v;
			}
		});

		function render$1(vnode, parent, callback) {
			var prev = parent._preactCompatRendered;
			if (prev && prev.parentNode !== parent) prev = null;
			var out = preact.render(vnode, parent, prev);
			parent._preactCompatRendered = out;
			if (typeof callback === 'function') callback();
			return out && out._component;
		}

		function unmountComponentAtNode(container) {
			var existing = container._preactCompatRendered;
			if (existing && existing.parentNode === container) {
				preact.render(preact.h(EmptyComponent), container, existing);
				return true;
			}
			return false;
		}

		var ARR = [];

		var Children = {
			map: function (children, fn, ctx) {
				children = Children.toArray(children);
				if (ctx && ctx !== children) fn = fn.bind(ctx);
				return children.map(fn);
			},
			forEach: function (children, fn, ctx) {
				children = Children.toArray(children);
				if (ctx && ctx !== children) fn = fn.bind(ctx);
				children.forEach(fn);
			},
			count: function (children) {
				children = Children.toArray(children);
				return children.length;
			},
			only: function (children) {
				children = Children.toArray(children);
				if (children.length !== 1) throw new Error('Children.only() expects only one child.');
				return children[0];
			},
			toArray: function (children) {
				return Array.isArray && Array.isArray(children) ? children : ARR.concat(children);
			}
		};

		var currentComponent = void 0;

		function createFactory(type) {
			return function () {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				return createElement.apply(undefined, [type].concat(args));
			};
		}

		var DOM = {};
		for (var i = ELEMENTS.length; i--;) {
			DOM[ELEMENTS[i]] = createFactory(ELEMENTS[i]);
		}

		function createElement() {
			var vnode = preact.h.apply(undefined, arguments);

			if (vnode.nodeName === 'svg') {
				vnode.nodeName = SVG;
			}

			applyClassName(vnode);

			var ref = vnode.attributes && vnode.attributes.ref;
			if (currentComponent && ref && typeof ref === 'string') {
				vnode.attributes.ref = createStringRefProxy(ref, currentComponent);
			}

			return vnode;
		}

		function cloneElement(element, props) {
			for (var _len2 = arguments.length, children = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
				children[_key2 - 2] = arguments[_key2];
			}

			return createElement.apply(undefined, [element.nodeName || element.type, extend({}, element.attributes || element.props || {}, props)].concat(children));
		}

		function isValidElement(element) {
			return element instanceof VNode || element.$$typeof === REACT_ELEMENT_TYPE;
		}

		function createStringRefProxy(name, component) {
			return component._refProxies[name] || (component._refProxies[name] = function (resolved) {
				if (component && component.refs) {
					component.refs[name] = resolved;
					if (resolved === null) {
						delete component._refProxies[name];
						component = null;
					}
				}
			});
		}

		function applyClassName(_ref) {
			var attributes = _ref.attributes;

			if (!attributes) return;
			var cl = attributes.className || attributes.class;
			if (cl) attributes.className = cl;
		}

		function extend(base) {
			for (var _len3 = arguments.length, objs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
				objs[_key3 - 1] = arguments[_key3];
			}

			for (var _i = 0; _i < objs.length; _i++) {
				for (var key in objs[_i]) {
					if (objs[_i].hasOwnProperty(key)) {
						var v = objs[_i][key];
						if (v !== null && v !== undefined) {
							base[key] = v;
						}
					}
				}
			}
			return base;
		}

		var findDOMNode = function (component) {
			return component.base || component;
		};

		function F() {}

		function createClass(obj) {
			var cl = function (props, context) {
				extend(this, obj);
				Component$1.call(this, props, context, BYPASS_HOOK);
				bindAll(this);
				newComponentHook.call(this, props, context);
			};

			if (obj.propTypes) {
				cl.propTypes = obj.propTypes;
			}
			if (obj.defaultProps) {
				cl.defaultProps = obj.defaultProps;
			}
			if (obj.getDefaultProps) {
				cl.defaultProps = obj.getDefaultProps();
			}

			F.prototype = Component$1.prototype;
			cl.prototype = new F();
			cl.prototype.constructor = cl;

			cl.displayName = obj.displayName || 'Component';

			return cl;
		}

		function bindAll(ctx) {
			for (var _i2 in ctx) {
				var v = ctx[_i2];
				if (typeof v === 'function' && !v.__bound && !AUTOBIND_BLACKLIST.hasOwnProperty(_i2)) {
					(ctx[_i2] = v.bind(ctx)).__bound = true;
				}
			}
		}

		function callMethod(ctx, m, args) {
			if (typeof m === 'string') {
				m = ctx.constructor.prototype[m];
			}
			if (typeof m === 'function') {
				return m.apply(ctx, args);
			}
		}

		function multihook() {
			for (var _len4 = arguments.length, hooks = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
				hooks[_key4] = arguments[_key4];
			}

			return function () {
				var ret = void 0;

				for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
					args[_key5] = arguments[_key5];
				}

				for (var _i3 = 0; _i3 < hooks.length; _i3++) {
					var r = callMethod(this, hooks[_i3], args);
					if (r !== undefined) ret = r;
				}
				return ret;
			};
		}

		function newComponentHook(props, context) {
			propsHook.call(this, props, context);
			this.componentWillReceiveProps = multihook(this.componentWillReceiveProps || 'componentWillReceiveProps', propsHook);
			this.render = multihook(beforeRender, this.render || 'render', afterRender);
		}

		function propsHook(props) {
			if (!props) return;

			var c = props.children;
			if (c && c.length === 1) {
				props.children = c[0];

				if (props.children && typeof props.children === 'object') {
					props.children.length = 1;
					props.children[0] = props.children;
				}
			}

			if (DEV) {
				var propTypes = this.propTypes || this.constructor.propTypes;
				if (propTypes) {
					for (var prop in propTypes) {
						if (propTypes.hasOwnProperty(prop) && typeof propTypes[prop] === 'function') {
							var err = propTypes[prop](props, prop, this.constructor.name, 'prop');
							if (err) throw err;
						}
					}
				}
			}
		}

		function beforeRender() {
			currentComponent = this;
		}

		function afterRender() {
			if (currentComponent === this) {
				currentComponent = null;
			}
		}

		var Component$1 = function (_PreactComponent) {
			babelHelpers.inherits(Component, _PreactComponent);

			function Component(props, context, opts) {
				babelHelpers.classCallCheck(this, Component);

				var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Component).call(this, props, context));

				_this.refs = {};
				_this._refProxies = {};
				if (opts !== BYPASS_HOOK) {
					newComponentHook.call(_this, props, context);
				}
				return _this;
			}

			babelHelpers.createClass(Component, [{
				key: 'getDOMNode',
				value: function getDOMNode() {
					return this.base;
				}
			}, {
				key: 'isMounted',
				value: function isMounted() {
					return !!this.base;
				}
			}]);
			return Component;
		}(preact.Component);

		var index = { DOM: DOM, PropTypes: PropTypes, Children: Children, render: render$1, createClass: createClass, createFactory: createFactory, createElement: createElement, cloneElement: cloneElement, isValidElement: isValidElement, findDOMNode: findDOMNode, unmountComponentAtNode: unmountComponentAtNode, Component: Component$1 };

		exports.DOM = DOM;
		exports.PropTypes = PropTypes;
		exports.Children = Children;
		exports.render = render$1;
		exports.createClass = createClass;
		exports.createFactory = createFactory;
		exports.createElement = createElement;
		exports.cloneElement = cloneElement;
		exports.isValidElement = isValidElement;
		exports.findDOMNode = findDOMNode;
		exports.unmountComponentAtNode = unmountComponentAtNode;
		exports.Component = Component$1;
		exports['default'] = index;

	}));
	//# sourceMappingURL=preact-compat.js.map

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
	    factory(exports, module);
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, mod);
	    global.PropTypes = mod.exports;
	  }
	})(this, function (exports, module) {

	  'use strict';

	  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

	  var ReactElement = {};

	  ReactElement.isValidElement = function (object) {
	    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  var ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };

	  var emptyFunction = {
	    thatReturns: function thatReturns(what) {
	      return function () {
	        return what;
	      };
	    }
	  };

	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator';
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  var ANONYMOUS = '<<anonymous>>';

	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker
	  };

	  function createChainableTypeChecker(validate) {
	    function checkType(isRequired, props, propName, componentName, location, propFullName) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;
	      if (props[propName] == null) {
	        var locationName = ReactPropTypeLocationNames[location];
	        if (isRequired) {
	          return new Error('Required ' + locationName + ' `' + propFullName + '` was not specified in ' + ('`' + componentName + '`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        var locationName = ReactPropTypeLocationNames[location];

	        var preciseType = getPreciseType(propValue);

	        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunction.thatReturns(null));
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var locationName = ReactPropTypeLocationNames[location];
	        var propType = getPropType(propValue);
	        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']');
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!ReactElement.isValidElement(props[propName])) {
	        var locationName = ReactPropTypeLocationNames[location];
	        return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var locationName = ReactPropTypeLocationNames[location];
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      return createChainableTypeChecker(function () {
	        return new Error('Invalid argument supplied to oneOf, expected an instance of array.');
	      });
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (propValue === expectedValues[i]) {
	          return null;
	        }
	      }

	      var locationName = ReactPropTypeLocationNames[location];
	      var valuesString = JSON.stringify(expectedValues);
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        var locationName = ReactPropTypeLocationNames[location];
	        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      return createChainableTypeChecker(function () {
	        return new Error('Invalid argument supplied to oneOfType, expected an instance of array.');
	      });
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName) == null) {
	          return null;
	        }
	      }

	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        var locationName = ReactPropTypeLocationNames[location];
	        return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        var locationName = ReactPropTypeLocationNames[location];
	        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || ReactElement.isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      return 'object';
	    }
	    return propType;
	  }

	  function getPreciseType(propValue) {
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  module.exports = ReactPropTypes;
	});

	//# sourceMappingURL=index.js.map

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports,module,__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports !== 'undefined' && typeof module !== 'undefined'){factory(exports,module,require('preact'));}else {var mod={exports:{}};factory(mod.exports,mod,global.preact);global.preactSvg = mod.exports;}})(this,function(exports,module,_preact){'use strict';var _extends=Object.assign || function(target){for(var i=1;i < arguments.length;i++) {var source=arguments[i];for(var key in source) {if(Object.prototype.hasOwnProperty.call(source,key)){target[key] = source[key];}}}return target;};function _objectWithoutProperties(obj,keys){var target={};for(var i in obj) {if(keys.indexOf(i) >= 0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i] = obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _inherits(subClass,superClass){if(typeof superClass !== 'function' && superClass !== null){throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;}var DOM=typeof document !== 'undefined' && !!document.createElement;var SVG_ATTRS=['viewBox'];var PROP_TO_ATTR_MAP={'className':'class'};var EMPTY={};var updateMode=false;if(DOM){(function(){var div=document.createElement('div');var oldCreate=document.createElement;document.createElement = function(name){if(updateMode || name === 'svg'){var el=document.createElementNS('http://www.w3.org/2000/svg',name);for(var key in el) {if(~SVG_ATTRS.indexOf(key) || !(key in div) || PROP_TO_ATTR_MAP.hasOwnProperty(key)){overwriteProperty(el,key);}}return el;}return oldCreate.call(document,name);};})();}var PROPERTY_ERRORS={};var hasPropertyErrors=false;function overwriteProperty(el,key){var err=PROPERTY_ERRORS[key];if(err === false){Object.defineProperty(el,key,contentPropertyDef(key));}else {attemptOverwriteProperty(el,key);}}function attemptOverwriteProperty(el,key){try{Object.defineProperty(el,key,contentPropertyDef(key));PROPERTY_ERRORS[key] = false;}catch(e) {if(!PROPERTY_ERRORS[key]){var err=el.nodeName + ': ' + e;PROPERTY_ERRORS[key] = err;if(!hasPropertyErrors && 'undefined' !== typeof console && console.warn){hasPropertyErrors = true;console.warn('Error overwriting some SVG properties.',{errors:PROPERTY_ERRORS});}}}}var memoize=function memoize(fn){var mem=arguments.length <= 1 || arguments[1] === undefined?{}:arguments[1];return function(k){return mem.hasOwnProperty(k)?mem[k]:mem[k] = fn(k);};};var contentPropertyDef=memoize(function(prop){var attr=arguments.length <= 1 || arguments[1] === undefined?PROP_TO_ATTR_MAP[prop] || prop:arguments[1];return (function(){return {set:function set(v){if(v === null || v === undefined)this.removeAttribute(attr);else this.setAttribute(attr,v);},get:function get(){return this.getAttribute(attr);}};})();});var SVG=(function(_Component){_inherits(SVG,_Component);function SVG(){_classCallCheck(this,SVG);_Component.apply(this,arguments);}SVG.prototype.componentWillUpdate = function componentWillUpdate(){updateMode = true;};SVG.prototype.componentDidUpdate = function componentDidUpdate(){updateMode = false;if(this.base){for(var i in this.props) {if(~SVG_ATTRS.indexOf(i) || PROPERTY_ERRORS.hasOwnProperty(i) && PROPERTY_ERRORS[i] !== false){this.base.setAttribute(i,this.props[i]);}}}};SVG.prototype.render = function render(_ref){var children=_ref.children;var props=_objectWithoutProperties(_ref,['children']);if(!this.hasRendered){this.hasRendered = updateMode = true;this.setState(EMPTY,setStateUpdateProxy(this));}for(var i in props) {if(~SVG_ATTRS.indexOf(i) || PROPERTY_ERRORS.hasOwnProperty(i) && PROPERTY_ERRORS[i] !== false){delete props[i];}}return _preact.h('svg',_extends({version:'1.1',xmlns:'http://www.w3.org/2000/svg'},props),children);};return SVG;})(_preact.Component);module.exports = SVG;function setStateUpdateProxy(component){return function(){component.componentDidUpdate();component = null;};}});

	//# sourceMappingURL=preact-svg.js.map

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(98);

	exports["default"] = _react.PropTypes.shape({
	  subscribe: _react.PropTypes.func.isRequired,
	  dispatch: _react.PropTypes.func.isRequired,
	  getState: _react.PropTypes.func.isRequired
	});

/***/ },
/* 102 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that you can use this stack
	    // to find the callsite that caused this warning to fire.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.__esModule = true;
	exports["default"] = connect;

	var _react = __webpack_require__(98);

	var _storeShape = __webpack_require__(101);

	var _storeShape2 = _interopRequireDefault(_storeShape);

	var _shallowEqual = __webpack_require__(104);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	var _wrapActionCreators = __webpack_require__(105);

	var _wrapActionCreators2 = _interopRequireDefault(_wrapActionCreators);

	var _warning = __webpack_require__(102);

	var _warning2 = _interopRequireDefault(_warning);

	var _isPlainObject = __webpack_require__(106);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _hoistNonReactStatics = __webpack_require__(110);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	var _invariant = __webpack_require__(111);

	var _invariant2 = _interopRequireDefault(_invariant);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var defaultMapStateToProps = function defaultMapStateToProps(state) {
	  return {};
	}; // eslint-disable-line no-unused-vars
	var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
	  return { dispatch: dispatch };
	};
	var defaultMergeProps = function defaultMergeProps(stateProps, dispatchProps, parentProps) {
	  return _extends({}, parentProps, stateProps, dispatchProps);
	};

	function getDisplayName(WrappedComponent) {
	  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
	}

	var errorObject = { value: null };
	function tryCatch(fn, ctx) {
	  try {
	    return fn.apply(ctx);
	  } catch (e) {
	    errorObject.value = e;
	    return errorObject;
	  }
	}

	// Helps track hot reloading.
	var nextVersion = 0;

	function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
	  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	  var shouldSubscribe = Boolean(mapStateToProps);
	  var mapState = mapStateToProps || defaultMapStateToProps;

	  var mapDispatch = undefined;
	  if (typeof mapDispatchToProps === 'function') {
	    mapDispatch = mapDispatchToProps;
	  } else if (!mapDispatchToProps) {
	    mapDispatch = defaultMapDispatchToProps;
	  } else {
	    mapDispatch = (0, _wrapActionCreators2["default"])(mapDispatchToProps);
	  }

	  var finalMergeProps = mergeProps || defaultMergeProps;
	  var _options$pure = options.pure;
	  var pure = _options$pure === undefined ? true : _options$pure;
	  var _options$withRef = options.withRef;
	  var withRef = _options$withRef === undefined ? false : _options$withRef;

	  var checkMergedEquals = pure && finalMergeProps !== defaultMergeProps;

	  // Helps track hot reloading.
	  var version = nextVersion++;

	  return function wrapWithConnect(WrappedComponent) {
	    var connectDisplayName = 'Connect(' + getDisplayName(WrappedComponent) + ')';

	    function checkStateShape(props, methodName) {
	      if (!(0, _isPlainObject2["default"])(props)) {
	        (0, _warning2["default"])(methodName + '() in ' + connectDisplayName + ' must return a plain object. ' + ('Instead received ' + props + '.'));
	      }
	    }

	    function computeMergedProps(stateProps, dispatchProps, parentProps) {
	      var mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps);
	      if (process.env.NODE_ENV !== 'production') {
	        checkStateShape(mergedProps, 'mergeProps');
	      }
	      return mergedProps;
	    }

	    var Connect = function (_Component) {
	      _inherits(Connect, _Component);

	      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
	        return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged;
	      };

	      function Connect(props, context) {
	        _classCallCheck(this, Connect);

	        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

	        _this.version = version;
	        _this.store = props.store || context.store;

	        (0, _invariant2["default"])(_this.store, 'Could not find "store" in either the context or ' + ('props of "' + connectDisplayName + '". ') + 'Either wrap the root component in a <Provider>, ' + ('or explicitly pass "store" as a prop to "' + connectDisplayName + '".'));

	        var storeState = _this.store.getState();
	        _this.state = { storeState: storeState };
	        _this.clearCache();
	        return _this;
	      }

	      Connect.prototype.computeStateProps = function computeStateProps(store, props) {
	        if (!this.finalMapStateToProps) {
	          return this.configureFinalMapState(store, props);
	        }

	        var state = store.getState();
	        var stateProps = this.doStatePropsDependOnOwnProps ? this.finalMapStateToProps(state, props) : this.finalMapStateToProps(state);

	        if (process.env.NODE_ENV !== 'production') {
	          checkStateShape(stateProps, 'mapStateToProps');
	        }
	        return stateProps;
	      };

	      Connect.prototype.configureFinalMapState = function configureFinalMapState(store, props) {
	        var mappedState = mapState(store.getState(), props);
	        var isFactory = typeof mappedState === 'function';

	        this.finalMapStateToProps = isFactory ? mappedState : mapState;
	        this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1;

	        if (isFactory) {
	          return this.computeStateProps(store, props);
	        }

	        if (process.env.NODE_ENV !== 'production') {
	          checkStateShape(mappedState, 'mapStateToProps');
	        }
	        return mappedState;
	      };

	      Connect.prototype.computeDispatchProps = function computeDispatchProps(store, props) {
	        if (!this.finalMapDispatchToProps) {
	          return this.configureFinalMapDispatch(store, props);
	        }

	        var dispatch = store.dispatch;

	        var dispatchProps = this.doDispatchPropsDependOnOwnProps ? this.finalMapDispatchToProps(dispatch, props) : this.finalMapDispatchToProps(dispatch);

	        if (process.env.NODE_ENV !== 'production') {
	          checkStateShape(dispatchProps, 'mapDispatchToProps');
	        }
	        return dispatchProps;
	      };

	      Connect.prototype.configureFinalMapDispatch = function configureFinalMapDispatch(store, props) {
	        var mappedDispatch = mapDispatch(store.dispatch, props);
	        var isFactory = typeof mappedDispatch === 'function';

	        this.finalMapDispatchToProps = isFactory ? mappedDispatch : mapDispatch;
	        this.doDispatchPropsDependOnOwnProps = this.finalMapDispatchToProps.length !== 1;

	        if (isFactory) {
	          return this.computeDispatchProps(store, props);
	        }

	        if (process.env.NODE_ENV !== 'production') {
	          checkStateShape(mappedDispatch, 'mapDispatchToProps');
	        }
	        return mappedDispatch;
	      };

	      Connect.prototype.updateStatePropsIfNeeded = function updateStatePropsIfNeeded() {
	        var nextStateProps = this.computeStateProps(this.store, this.props);
	        if (this.stateProps && (0, _shallowEqual2["default"])(nextStateProps, this.stateProps)) {
	          return false;
	        }

	        this.stateProps = nextStateProps;
	        return true;
	      };

	      Connect.prototype.updateDispatchPropsIfNeeded = function updateDispatchPropsIfNeeded() {
	        var nextDispatchProps = this.computeDispatchProps(this.store, this.props);
	        if (this.dispatchProps && (0, _shallowEqual2["default"])(nextDispatchProps, this.dispatchProps)) {
	          return false;
	        }

	        this.dispatchProps = nextDispatchProps;
	        return true;
	      };

	      Connect.prototype.updateMergedPropsIfNeeded = function updateMergedPropsIfNeeded() {
	        var nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props);
	        if (this.mergedProps && checkMergedEquals && (0, _shallowEqual2["default"])(nextMergedProps, this.mergedProps)) {
	          return false;
	        }

	        this.mergedProps = nextMergedProps;
	        return true;
	      };

	      Connect.prototype.isSubscribed = function isSubscribed() {
	        return typeof this.unsubscribe === 'function';
	      };

	      Connect.prototype.trySubscribe = function trySubscribe() {
	        if (shouldSubscribe && !this.unsubscribe) {
	          this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
	          this.handleChange();
	        }
	      };

	      Connect.prototype.tryUnsubscribe = function tryUnsubscribe() {
	        if (this.unsubscribe) {
	          this.unsubscribe();
	          this.unsubscribe = null;
	        }
	      };

	      Connect.prototype.componentDidMount = function componentDidMount() {
	        this.trySubscribe();
	      };

	      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        if (!pure || !(0, _shallowEqual2["default"])(nextProps, this.props)) {
	          this.haveOwnPropsChanged = true;
	        }
	      };

	      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
	        this.tryUnsubscribe();
	        this.clearCache();
	      };

	      Connect.prototype.clearCache = function clearCache() {
	        this.dispatchProps = null;
	        this.stateProps = null;
	        this.mergedProps = null;
	        this.haveOwnPropsChanged = true;
	        this.hasStoreStateChanged = true;
	        this.haveStatePropsBeenPrecalculated = false;
	        this.statePropsPrecalculationError = null;
	        this.renderedElement = null;
	        this.finalMapDispatchToProps = null;
	        this.finalMapStateToProps = null;
	      };

	      Connect.prototype.handleChange = function handleChange() {
	        if (!this.unsubscribe) {
	          return;
	        }

	        var storeState = this.store.getState();
	        var prevStoreState = this.state.storeState;
	        if (pure && prevStoreState === storeState) {
	          return;
	        }

	        if (pure && !this.doStatePropsDependOnOwnProps) {
	          var haveStatePropsChanged = tryCatch(this.updateStatePropsIfNeeded, this);
	          if (!haveStatePropsChanged) {
	            return;
	          }
	          if (haveStatePropsChanged === errorObject) {
	            this.statePropsPrecalculationError = errorObject.value;
	          }
	          this.haveStatePropsBeenPrecalculated = true;
	        }

	        this.hasStoreStateChanged = true;
	        this.setState({ storeState: storeState });
	      };

	      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
	        (0, _invariant2["default"])(withRef, 'To access the wrapped instance, you need to specify ' + '{ withRef: true } as the fourth argument of the connect() call.');

	        return this.refs.wrappedInstance;
	      };

	      Connect.prototype.render = function render() {
	        var haveOwnPropsChanged = this.haveOwnPropsChanged;
	        var hasStoreStateChanged = this.hasStoreStateChanged;
	        var haveStatePropsBeenPrecalculated = this.haveStatePropsBeenPrecalculated;
	        var statePropsPrecalculationError = this.statePropsPrecalculationError;
	        var renderedElement = this.renderedElement;

	        this.haveOwnPropsChanged = false;
	        this.hasStoreStateChanged = false;
	        this.haveStatePropsBeenPrecalculated = false;
	        this.statePropsPrecalculationError = null;

	        if (statePropsPrecalculationError) {
	          throw statePropsPrecalculationError;
	        }

	        var shouldUpdateStateProps = true;
	        var shouldUpdateDispatchProps = true;
	        if (pure && renderedElement) {
	          shouldUpdateStateProps = hasStoreStateChanged || haveOwnPropsChanged && this.doStatePropsDependOnOwnProps;
	          shouldUpdateDispatchProps = haveOwnPropsChanged && this.doDispatchPropsDependOnOwnProps;
	        }

	        var haveStatePropsChanged = false;
	        var haveDispatchPropsChanged = false;
	        if (haveStatePropsBeenPrecalculated) {
	          haveStatePropsChanged = true;
	        } else if (shouldUpdateStateProps) {
	          haveStatePropsChanged = this.updateStatePropsIfNeeded();
	        }
	        if (shouldUpdateDispatchProps) {
	          haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded();
	        }

	        var haveMergedPropsChanged = true;
	        if (haveStatePropsChanged || haveDispatchPropsChanged || haveOwnPropsChanged) {
	          haveMergedPropsChanged = this.updateMergedPropsIfNeeded();
	        } else {
	          haveMergedPropsChanged = false;
	        }

	        if (!haveMergedPropsChanged && renderedElement) {
	          return renderedElement;
	        }

	        if (withRef) {
	          this.renderedElement = (0, _react.createElement)(WrappedComponent, _extends({}, this.mergedProps, {
	            ref: 'wrappedInstance'
	          }));
	        } else {
	          this.renderedElement = (0, _react.createElement)(WrappedComponent, this.mergedProps);
	        }

	        return this.renderedElement;
	      };

	      return Connect;
	    }(_react.Component);

	    Connect.displayName = connectDisplayName;
	    Connect.WrappedComponent = WrappedComponent;
	    Connect.contextTypes = {
	      store: _storeShape2["default"]
	    };
	    Connect.propTypes = {
	      store: _storeShape2["default"]
	    };

	    if (process.env.NODE_ENV !== 'production') {
	      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
	        if (this.version === version) {
	          return;
	        }

	        // We are hot reloading!
	        this.version = version;
	        this.trySubscribe();
	        this.clearCache();
	      };
	    }

	    return (0, _hoistNonReactStatics2["default"])(Connect, WrappedComponent);
	  };
	}

/***/ },
/* 104 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = shallowEqual;
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var hasOwn = Object.prototype.hasOwnProperty;
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }

	  return true;
	}

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = wrapActionCreators;

	var _redux = __webpack_require__(83);

	function wrapActionCreators(actionCreators) {
	  return function (dispatch) {
	    return (0, _redux.bindActionCreators)(actionCreators, dispatch);
	  };
	}

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(107),
	    isHostObject = __webpack_require__(108),
	    isObjectLike = __webpack_require__(109);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object,
	 *  else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) ||
	      objectToString.call(value) != objectTag || isHostObject(value)) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return (typeof Ctor == 'function' &&
	    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
	}

	module.exports = isPlainObject;


/***/ },
/* 107 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;

	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}

	module.exports = getPrototype;


/***/ },
/* 108 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	module.exports = isHostObject;


/***/ },
/* 109 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 110 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	'use strict';

	var REACT_STATICS = {
	    childContextTypes: true,
	    contextTypes: true,
	    defaultProps: true,
	    displayName: true,
	    getDefaultProps: true,
	    mixins: true,
	    propTypes: true,
	    type: true
	};

	var KNOWN_STATICS = {
	    name: true,
	    length: true,
	    prototype: true,
	    caller: true,
	    arguments: true,
	    arity: true
	};

	module.exports = function hoistNonReactStatics(targetComponent, sourceComponent) {
	    var keys = Object.getOwnPropertyNames(sourceComponent);
	    for (var i=0; i<keys.length; ++i) {
	        if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]]) {
	            try {
	                targetComponent[keys[i]] = sourceComponent[keys[i]];
	            } catch (error) {

	            }
	        }
	    }

	    return targetComponent;
	};


/***/ },
/* 111 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var NODE_ENV = process.env.NODE_ENV;

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _preactRenderToString = __webpack_require__(113);

	var _preactRenderToString2 = _interopRequireDefault(_preactRenderToString);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (rootComponent, initialState) {
	  return '\n  <!doctype html>\n  <html>\n    <head>\n      <title>HackDash</title>\n    </head>\n    <body>\n      <div id="root">' + (0, _preactRenderToString2.default)(rootComponent) + '</div>\n      <script>window.__state__ = ' + JSON.stringify(initialState) + ';</script>\n      <script src="/frontend.js"></script>\n    </body>\n  </html>';
	};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports,module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports !== 'undefined' && typeof module !== 'undefined'){factory(exports,module);}else {var mod={exports:{}};factory(mod.exports,mod);global.preactRenderToString = mod.exports;}})(this,function(exports,module){'use strict';var _extends=Object.assign || function(target){for(var i=1;i < arguments.length;i++) {var source=arguments[i];for(var key in source) {if(Object.prototype.hasOwnProperty.call(source,key)){target[key] = source[key];}}}return target;};module.exports = renderToString;var SHALLOW={shallow:true};var ESC={'<':'&lt;','>':'&gt;','"':'&quot;','&':'&amp;'};var EMPTY={};var VOID_ELEMENTS=['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'];var UNNAMED=[];var objectKeys=Object.keys || function(obj){var keys=[];for(var i in obj) {if(obj.hasOwnProperty(i))keys.push(i);}return keys;};var encodeEntities=function encodeEntities(s){return String(s).replace(/[<>"&]/g,escapeChar);};var escapeChar=function escapeChar(a){return ESC[a] || a;};var falsey=function falsey(v){return v == null || v === false;};renderToString.render = renderToString;renderToString.shallowRender = function(vnode,context){return renderToString(vnode,context,SHALLOW);};function renderToString(_x,_x2,_x3,_x4){var _again=true;_function: while(_again) {var vnode=_x,context=_x2,opts=_x3,inner=_x4;_again = false;var _ref=vnode || EMPTY;var nodeName=_ref.nodeName;var attributes=_ref.attributes;var children=_ref.children;context = context || {};if(!nodeName){return encodeEntities(vnode);}if(typeof nodeName === 'function'){if(opts && opts.shallow && (inner || opts && opts.renderRootComponent === false)){nodeName = getComponentName(nodeName);}else {var props=_extends({children:children},attributes),rendered=undefined;if(!nodeName.prototype || typeof nodeName.prototype.render !== 'function'){rendered = nodeName(props,context);}else {var c=new nodeName(props,context);c.props = props;c.context = context;rendered = c.render(c.props,c.state,c.context);if(c.getChildContext){context = c.getChildContext();}}_x = rendered;_x2 = context;_x3 = opts;_x4 = !opts || opts.shallowHighOrder !== false;_again = true;_ref = nodeName = attributes = children = props = rendered = c = undefined;continue _function;}}var s='<' + nodeName,html=undefined;if(attributes){var attrs=objectKeys(attributes);if(opts && opts.sortAttributes === true)attrs.sort();for(var i=0;i < attrs.length;i++) {var _name=attrs[i],v=attributes[_name];if(_name === 'className'){if(attributes['class'])continue;_name = 'class';}if(_name === 'dangerouslySetInnerHTML'){html = v && v.__html;}else if(!falsey(v) && typeof v !== 'function'){s += ' ' + _name + '="' + encodeEntities(v) + '"';}}}s += '>';if(html){s += html;}else {var len=children && children.length;if(len){for(var i=0;i < len;i++) {var child=children[i];if(!falsey(child)){s += renderToString(child,context,opts,true);}}}else if(opts && opts.xml){return s.substring(0,s.length - 1) + ' />';}}if(VOID_ELEMENTS.indexOf(nodeName) === -1){s += '</' + nodeName + '>';}return s;}}function getComponentName(component){var proto=component.prototype,ctor=proto && proto.constructor;return component.displayName || component.name || proto && (proto.displayName || proto.name) || getFallbackComponentName(component);}function getFallbackComponentName(component){var str=Function.prototype.toString.call(component),name=(str.match(/^\s*function\s+([^\( ]+)/) || EMPTY)[1];if(!name){var index=-1;for(var i=UNNAMED.length;i--;) {if(UNNAMED[i] === component){index = i;break;}}if(index < 0){index = UNNAMED.push(component) - 1;}name = 'UnnamedComponent' + index;}return name;}});
	//# sourceMappingURL=index.js.map

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _preact = __webpack_require__(1);

	var _Router = __webpack_require__(115);

	var _Router2 = _interopRequireDefault(_Router);

	var _preactRouter = __webpack_require__(116);

	var _Home = __webpack_require__(117);

	var _Home2 = _interopRequireDefault(_Home);

	var _Dashboard = __webpack_require__(144);

	var _Dashboard2 = _interopRequireDefault(_Dashboard);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (_ref) {
	  var url = _ref.url;
	  var _ref$client = _ref.client;
	  var client = _ref$client === undefined ? false : _ref$client;
	  return (0, _preact.h)(
	    _Router2.default,
	    { url: url, client: client },
	    (0, _preact.h)(_Home2.default, { path: '/' }),
	    (0, _preact.h)(_Dashboard2.default, { path: '/dashboards/:dashboardId' })
	  );
	};

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _preactRouter = __webpack_require__(116);

	var _preactRouter2 = _interopRequireDefault(_preactRouter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Router = function (_PreactRouter) {
	  _inherits(Router, _PreactRouter);

	  function Router(props) {
	    _classCallCheck(this, Router);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Router).call(this, props));

	    _get(Object.getPrototypeOf(Router.prototype), 'componentWillMount', _this).call(_this);
	    return _this;
	  }

	  _createClass(Router, [{
	    key: 'getInitialState',
	    value: function getInitialState() {
	      var state = _get(Object.getPrototypeOf(Router.prototype), 'getInitialState', this).call(this);
	      state.url = state.url || this.props.url;
	      return state;
	    }
	  }]);

	  return Router;
	}(_preactRouter2.default);

	exports.default = Router;

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	(function (global, factory) {
		 true ? module.exports = factory(__webpack_require__(1)) :
		typeof define === 'function' && define.amd ? define(['preact'], factory) :
		(global.preactRouter = factory(global.preact));
	}(this, function (preact) { 'use strict';

		var babelHelpers = {};

		babelHelpers.inherits = function (subClass, superClass) {
		  if (typeof superClass !== "function" && superClass !== null) {
		    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		  }

		  subClass.prototype = Object.create(superClass && superClass.prototype, {
		    constructor: {
		      value: subClass,
		      enumerable: false,
		      writable: true,
		      configurable: true
		    }
		  });
		  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
		};

		babelHelpers.objectWithoutProperties = function (obj, keys) {
		  var target = {};

		  for (var i in obj) {
		    if (keys.indexOf(i) >= 0) continue;
		    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
		    target[i] = obj[i];
		  }

		  return target;
		};

		babelHelpers._extends = Object.assign || function (target) {
		  for (var i = 1; i < arguments.length; i++) {
		    var source = arguments[i];

		    for (var key in source) {
		      if (Object.prototype.hasOwnProperty.call(source, key)) {
		        target[key] = source[key];
		      }
		    }
		  }

		  return target;
		};

		babelHelpers.classCallCheck = function (instance, Constructor) {
		  if (!(instance instanceof Constructor)) {
		    throw new TypeError("Cannot call a class as a function");
		  }
		};
		var EMPTY$1 = {};

		function exec(url, route) {
			var opts = arguments.length <= 2 || arguments[2] === undefined ? EMPTY$1 : arguments[2];

			var reg = /(?:\?([^#]*))?(#.*)?$/,
			    c = url.match(reg),
			    matches = {},
			    ret = undefined;
			if (c && c[1]) {
				var p = c[1].split('&');
				for (var i = 0; i < p.length; i++) {
					var r = p[i].split('=');
					matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
				}
			}
			url = segmentize(url.replace(reg, ''));
			route = segmentize(route || '');
			var max = Math.max(url.length, route.length);
			for (var i = 0; i < max; i++) {
				if (route[i] && route[i].charAt(0) === ':') {
					var param = route[i].replace(/(^\:|[+*?]+$)/g, ''),
					    flags = (route[i].match(/[+*?]+$/) || EMPTY$1)[0] || '',
					    plus = ~flags.indexOf('+'),
					    star = ~flags.indexOf('*'),
					    val = url[i] || '';
					if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
						ret = false;
						break;
					}
					matches[param] = decodeURIComponent(val);
					if (plus || star) {
						matches[param] = url.slice(i).map(decodeURIComponent).join('/');
						break;
					}
				} else {
					if (route[i] !== url[i]) {
						ret = false;
						break;
					}
				}
			}
			if (opts['default'] !== true && ret === false) return false;
			return matches;
		}

		function pathRankSort(a, b) {
			var aAttr = a.attributes || EMPTY$1,
			    bAttr = b.attributes || EMPTY$1;
			if (aAttr['default']) return 1;
			if (bAttr['default']) return -1;
			var diff = rank(aAttr.path) - rank(bAttr.path);
			return diff || aAttr.path.length - bAttr.path.length;
		}

		function segmentize(url) {
			return strip(url).split('/');
		}

		function rank(url) {
			return (strip(url).match(/\/+/g) || '').length;
		}

		function strip(url) {
			return url.replace(/(^\/+|\/+$)/g, '');
		}

		var routers = [];

		var EMPTY = {};

		function route(url) {
			var replace = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

			if (typeof url !== 'string' && url.url) {
				replace = url.replace;
				url = url.url;
			}
			if (history) {
				if (replace === true) {
					history.replaceState(null, null, url);
				} else {
					history.pushState(null, null, url);
				}
			}
			routeTo(url);
		}

		function routeTo(url) {
			routers.forEach(function (router) {
				return router.routeTo(url);
			});
		}

		function getCurrentUrl() {
			var url = typeof location !== 'undefined' ? location : EMPTY;
			return '' + (url.pathname || '') + (url.search || '');
		}

		if (typeof addEventListener === 'function') {
			addEventListener('popstate', function () {
				return routeTo(getCurrentUrl());
			});
		}

		function handleLinkClick(e) {
			route(this.getAttribute('href'));
			if (e.stopImmediatePropagation) e.stopImmediatePropagation();
			e.stopPropagation();
			e.preventDefault();
			return false;
		}

		var Link = function Link(_ref) {
			var children = _ref.children;
			var props = babelHelpers.objectWithoutProperties(_ref, ['children']);
			return preact.h(
				'a',
				babelHelpers._extends({}, props, { onClick: handleLinkClick }),
				children
			);
		};

		var Router = (function (_Component) {
			babelHelpers.inherits(Router, _Component);

			function Router() {
				babelHelpers.classCallCheck(this, Router);

				_Component.apply(this, arguments);
			}

			Router.prototype.getInitialState = function getInitialState() {
				return { url: getCurrentUrl() };
			};

			Router.prototype.routeTo = function routeTo(url) {
				this.setState({ url: url });
			};

			Router.prototype.componentWillMount = function componentWillMount() {
				routers.push(this);
			};

			Router.prototype.componentWillUnmount = function componentWillUnmount() {
				routers.splice(routers.indexOf(this), 1);
			};

			Router.prototype.render = function render(_ref2, _ref3) {
				var children = _ref2.children;
				var onChange = _ref2.onChange;
				var url = _ref3.url;

				var active = children.slice().sort(pathRankSort).filter(function (_ref4) {
					var attributes = _ref4.attributes;

					var path = attributes.path,
					    matches = exec(url, path, attributes);
					if (matches) {
						attributes.url = url;
						attributes.matches = matches;
						// copy matches onto props
						for (var i in matches) {
							if (matches.hasOwnProperty(i)) {
								attributes[i] = matches[i];
							}
						}
						return true;
					}
				});
				var previous = this.previousUrl;
				if (url !== previous) {
					this.previousUrl = url;
					if (typeof onChange === 'function') {
						onChange({
							router: this,
							url: url,
							previous: previous,
							active: active,
							current: active[0]
						});
					}
				}
				return active[0] || null;
			};

			return Router;
		})(preact.Component);

		var Route = function Route(_ref5) {
			var RoutedComponent = _ref5.component;
			var url = _ref5.url;
			var matches = _ref5.matches;
			return preact.h(RoutedComponent, { url: url, matches: matches });
		};

		Router.route = route;
		Router.Router = Router;
		Router.Route = Route;
		Router.Link = Link;

		return Router;

	}));
	//# sourceMappingURL=preact-router.js.map

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _preact = __webpack_require__(1);

	var _preactRouter = __webpack_require__(116);

	var _reactRedux = __webpack_require__(96);

	var _actions = __webpack_require__(118);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Home = function (_Component) {
	  _inherits(Home, _Component);

	  function Home() {
	    _classCallCheck(this, Home);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Home).apply(this, arguments));
	  }

	  _createClass(Home, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var dispatch = this.props.dispatch;

	      dispatch((0, _actions.fetchInitialData)('home'));
	    }
	  }, {
	    key: 'render',
	    value: function render(_ref) {
	      var dashboards = _ref.dashboards;

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'h1',
	          null,
	          'HackDash'
	        ),
	        (0, _preact.h)(
	          'ul',
	          null,
	          dashboards.map(function (dashboard, i) {
	            return (0, _preact.h)(
	              'li',
	              { key: i },
	              (0, _preact.h)(
	                _preactRouter.Link,
	                { href: '/dashboards/' + dashboard.domain },
	                dashboard.title
	              )
	            );
	          })
	        )
	      );
	    }
	  }]);

	  return Home;
	}(_preact.Component);

	var mapStateToProps = function mapStateToProps(_ref2) {
	  var dashboards = _ref2.dashboards;
	  return { dashboards: dashboards };
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(Home);

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fetchDashboards = exports.fetchDashboard = exports.fetchInitialData = undefined;

	var _axios = __webpack_require__(119);

	var _axios2 = _interopRequireDefault(_axios);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mounted = false;
	var fetchInitialData = exports.fetchInitialData = function fetchInitialData(page) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  if (!mounted && typeof window !== 'undefined') {
	    mounted = true;
	    return instantDispatch;
	  } else {
	    return fetchInitial[page] ? fetchInitial[page].apply(fetchInitial, args) : instantDispatch;
	  }
	};

	var fetchDashboard = exports.fetchDashboard = function fetchDashboard(dashboardId) {
	  return function (dispatch) {
	    dispatch(requestDashboard(dashboardId));
	    return (0, _axios2.default)('https://hackdash.org/api/v2/' + dashboardId + '/projects').then(function (res) {
	      return dispatch(receiveDashboard(dashboardId, res.data));
	    }).then(function () {
	      return dispatch(serverReady());
	    });
	  };
	};

	function requestDashboard(dashboardId) {
	  return {
	    type: 'REQUEST_DASHBOARD',
	    dashboardId: dashboardId
	  };
	}

	function receiveDashboard(dashboardId, projects) {
	  return {
	    type: 'RECEIVE_DASHBOARD',
	    dashboardId: dashboardId,
	    projects: projects
	  };
	}

	function serverReady() {
	  return {
	    type: 'SERVER_READY',
	    serverReady: true
	  };
	}

	function requestDashboards(dashboardId) {
	  return {
	    type: 'REQUEST_DASHBOARDS'
	  };
	}

	function receiveDashboards(dashboards) {
	  return {
	    type: 'RECEIVE_DASHBOARDS',
	    dashboards: dashboards
	  };
	}

	var fetchDashboards = exports.fetchDashboards = function fetchDashboards() {
	  return function (dispatch) {
	    dispatch(requestDashboards());
	    return (0, _axios2.default)('https://hackdash.org/api/v2/dashboards').then(function (res) {
	      return dispatch(receiveDashboards(res.data));
	    }).then(function () {
	      return dispatch(serverReady());
	    });
	  };
	};

	var instantDispatch = function instantDispatch(dispatch) {
	  return dispatch({ type: 'SERVER_READY' });
	};

	var fetchInitial = {
	  dashboard: fetchDashboard,
	  home: fetchDashboards
	};

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(120);

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defaults = __webpack_require__(121);
	var utils = __webpack_require__(122);
	var dispatchRequest = __webpack_require__(123);
	var InterceptorManager = __webpack_require__(139);
	var isAbsoluteURL = __webpack_require__(140);
	var combineURLs = __webpack_require__(141);
	var bind = __webpack_require__(142);
	var transformData = __webpack_require__(127);

	function Axios(defaultConfig) {
	  this.defaults = utils.merge({}, defaultConfig);
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}

	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }

	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }

	  // Don't allow overriding defaults.withCredentials
	  config.withCredentials = config.withCredentials || this.defaults.withCredentials;

	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );

	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );

	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);

	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }

	  return promise;
	};

	var defaultInstance = new Axios(defaults);
	var axios = module.exports = bind(Axios.prototype.request, defaultInstance);

	axios.create = function create(defaultConfig) {
	  return new Axios(defaultConfig);
	};

	// Expose defaults
	axios.defaults = defaultInstance.defaults;

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(143);

	// Expose interceptors
	axios.interceptors = defaultInstance.interceptors;

	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	  axios[method] = bind(Axios.prototype[method], defaultInstance);
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	  axios[method] = bind(Axios.prototype[method], defaultInstance);
	});


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(122);

	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	module.exports = {
	  transformRequest: [function transformResponseJSON(data, headers) {
	    if (utils.isFormData(data)) {
	      return data;
	    }
	    if (utils.isArrayBuffer(data)) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isObject(data) && !utils.isFile(data) && !utils.isBlob(data)) {
	      // Set application/json if no Content-Type has been specified
	      if (!utils.isUndefined(headers)) {
	        utils.forEach(headers, function processContentTypeHeader(val, key) {
	          if (key.toLowerCase() === 'content-type') {
	            headers['Content-Type'] = val;
	          }
	        });

	        if (utils.isUndefined(headers['Content-Type'])) {
	          headers['Content-Type'] = 'application/json;charset=utf-8';
	        }
	      }
	      return JSON.stringify(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponseJSON(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],

	  headers: {
	    common: {
	      'Accept': 'application/json, text/plain, */*'
	    },
	    patch: utils.merge(DEFAULT_CONTENT_TYPE),
	    post: utils.merge(DEFAULT_CONTENT_TYPE),
	    put: utils.merge(DEFAULT_CONTENT_TYPE)
	  },

	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN'
	};


/***/ },
/* 122 */
/***/ function(module, exports) {

	'use strict';

	/*global toString:true*/

	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return toString.call(val) === '[object FormData]';
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createElement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined' &&
	    typeof document.createElement === 'function'
	  );
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }

	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  trim: trim
	};


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Dispatch a request to the server using whichever adapter
	 * is supported by the current environment.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  return new Promise(function executor(resolve, reject) {
	    try {
	      var adapter;

	      if (typeof config.adapter === 'function') {
	        // For custom adapter support
	        adapter = config.adapter;
	      } else if (typeof XMLHttpRequest !== 'undefined') {
	        // For browsers use XHR adapter
	        adapter = __webpack_require__(124);
	      } else if (typeof process !== 'undefined') {
	        // For node use HTTP adapter
	        adapter = __webpack_require__(131);
	      }

	      if (typeof adapter === 'function') {
	        adapter(resolve, reject, config);
	      }
	    } catch (e) {
	      reject(e);
	    }
	  });
	};



/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(122);
	var buildURL = __webpack_require__(125);
	var parseHeaders = __webpack_require__(126);
	var transformData = __webpack_require__(127);
	var isURLSameOrigin = __webpack_require__(128);
	var btoa = window.btoa || __webpack_require__(129);

	module.exports = function xhrAdapter(resolve, reject, config) {
	  var requestData = config.data;
	  var requestHeaders = config.headers;

	  if (utils.isFormData(requestData)) {
	    delete requestHeaders['Content-Type']; // Let the browser set it
	  }

	  var request = new XMLHttpRequest();

	  // For IE 8/9 CORS support
	  // Only supports POST and GET calls and doesn't returns the response headers.
	  if (window.XDomainRequest && !('withCredentials' in request) && !isURLSameOrigin(config.url)) {
	    request = new window.XDomainRequest();
	  }

	  // HTTP basic authentication
	  if (config.auth) {
	    var username = config.auth.username || '';
	    var password = config.auth.password || '';
	    requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	  }

	  request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

	  // Set the request timeout in MS
	  request.timeout = config.timeout;

	  // Listen for ready state
	  request.onload = function handleLoad() {
	    if (!request) {
	      return;
	    }
	    // Prepare the response
	    var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	    var responseData = ['text', ''].indexOf(config.responseType || '') !== -1 ? request.responseText : request.response;
	    var response = {
	      data: transformData(
	        responseData,
	        responseHeaders,
	        config.transformResponse
	      ),
	      // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	      status: request.status === 1223 ? 204 : request.status,
	      statusText: request.status === 1223 ? 'No Content' : request.statusText,
	      headers: responseHeaders,
	      config: config
	    };

	    // Resolve or reject the Promise based on the status
	    ((response.status >= 200 && response.status < 300) ||
	     (!('status' in request) && response.responseText) ?
	      resolve :
	      reject)(response);

	    // Clean up request
	    request = null;
	  };

	  // Handle low level network errors
	  request.onerror = function handleError() {
	    // Real errors are hidden from us by the browser
	    // onerror should only fire if it's a network error
	    reject(new Error('Network Error'));

	    // Clean up request
	    request = null;
	  };

	  // Add xsrf header
	  // This is only done if running in a standard browser environment.
	  // Specifically not if we're in a web worker, or react-native.
	  if (utils.isStandardBrowserEnv()) {
	    var cookies = __webpack_require__(130);

	    // Add xsrf header
	    var xsrfValue = config.withCredentials || isURLSameOrigin(config.url) ?
	        cookies.read(config.xsrfCookieName) :
	        undefined;

	    if (xsrfValue) {
	      requestHeaders[config.xsrfHeaderName] = xsrfValue;
	    }
	  }

	  // Add headers to the request
	  if ('setRequestHeader' in request) {
	    utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	      if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	        // Remove Content-Type if data is undefined
	        delete requestHeaders[key];
	      } else {
	        // Otherwise add header to the request
	        request.setRequestHeader(key, val);
	      }
	    });
	  }

	  // Add withCredentials to request if needed
	  if (config.withCredentials) {
	    request.withCredentials = true;
	  }

	  // Add responseType to request if needed
	  if (config.responseType) {
	    try {
	      request.responseType = config.responseType;
	    } catch (e) {
	      if (request.responseType !== 'json') {
	        throw e;
	      }
	    }
	  }

	  if (utils.isArrayBuffer(requestData)) {
	    requestData = new DataView(requestData);
	  }

	  // Send the request
	  request.send(requestData);
	};


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(122);

	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }

	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else {
	    var parts = [];

	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }

	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }

	      if (!utils.isArray(val)) {
	        val = [val];
	      }

	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });

	    serializedParams = parts.join('&');
	  }

	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }

	  return url;
	};



/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(122);

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;

	  if (!headers) { return parsed; }

	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));

	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });

	  return parsed;
	};


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(122);

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });

	  return data;
	};


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(122);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;

	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;

	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }

	      urlParsingNode.setAttribute('href', href);

	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }

	    originURL = resolveURL(window.location.href);

	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :

	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ },
/* 129 */
/***/ function(module, exports) {

	'use strict';

	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	function InvalidCharacterError(message) {
	  this.message = message;
	}
	InvalidCharacterError.prototype = new Error;
	InvalidCharacterError.prototype.code = 5;
	InvalidCharacterError.prototype.name = 'InvalidCharacterError';

	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new InvalidCharacterError('INVALID_CHARACTER_ERR: DOM Exception 5');
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}

	module.exports = btoa;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(122);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));

	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }

	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }

	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }

	        if (secure === true) {
	          cookie.push('secure');
	        }

	        document.cookie = cookie.join('; ');
	      },

	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },

	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :

	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(122);
	var buildURL = __webpack_require__(125);
	var transformData = __webpack_require__(127);
	var http = __webpack_require__(132).http;
	var https = __webpack_require__(132).https;
	var url = __webpack_require__(35);
	var zlib = __webpack_require__(137);
	var pkg = __webpack_require__(138);
	var Buffer = __webpack_require__(29).Buffer;

	module.exports = function httpAdapter(resolve, reject, config) {
	  var data = config.data;
	  var headers = config.headers;
	  var timer;
	  var aborted = false;

	  // Set User-Agent (required by some servers)
	  // Only set header if it hasn't been set in config
	  // See https://github.com/mzabriskie/axios/issues/69
	  if (!headers['User-Agent'] && !headers['user-agent']) {
	    headers['User-Agent'] = 'axios/' + pkg.version;
	  }

	  if (data) {
	    if (utils.isArrayBuffer(data)) {
	      data = new Buffer(new Uint8Array(data));
	    } else if (utils.isString(data)) {
	      data = new Buffer(data, 'utf-8');
	    } else {
	      return reject(new Error('Data after transformation must be a string or an ArrayBuffer'));
	    }

	    // Add Content-Length header if data exists
	    headers['Content-Length'] = data.length;
	  }

	  // HTTP basic authentication
	  var auth = undefined;
	  if (config.auth) {
	    var username = config.auth.username || '';
	    var password = config.auth.password || '';
	    auth = username + ':' + password;
	  }

	  // Parse url
	  var parsed = url.parse(config.url);
	  var options = {
	    hostname: parsed.hostname,
	    port: parsed.port,
	    path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
	    method: config.method,
	    headers: headers,
	    agent: config.agent,
	    auth: auth
	  };

	  // Create the request
	  var transport = parsed.protocol === 'https:' ? https : http;
	  var req = transport.request(options, function handleResponse(res) {
	    if (aborted) return;

	    // Response has been received so kill timer that handles request timeout
	    clearTimeout(timer);
	    timer = null;

	    // uncompress the response body transparently if required
	    var stream = res;
	    switch (res.headers['content-encoding']) {
	    /*eslint default-case:0*/
	    case 'gzip':
	    case 'compress':
	    case 'deflate':
	      // add the unzipper to the body stream processing pipeline
	      stream = stream.pipe(zlib.createUnzip());

	      // remove the content-encoding in order to not confuse downstream operations
	      delete res.headers['content-encoding'];
	      break;
	    }

	    var responseBuffer = [];
	    stream.on('data', function handleStreamData(chunk) {
	      responseBuffer.push(chunk);
	    });

	    stream.on('end', function handleStreamEnd() {
	      var d = Buffer.concat(responseBuffer);
	      if (config.responseType !== 'arraybuffer') {
	        d = d.toString('utf8');
	      }
	      var response = {
	        data: transformData(
	          d,
	          res.headers,
	          config.transformResponse
	        ),
	        status: res.statusCode,
	        statusText: res.statusMessage,
	        headers: res.headers,
	        config: config
	      };

	      // Resolve or reject the Promise based on the status
	      (res.statusCode >= 200 && res.statusCode < 300 ?
	        resolve :
	        reject)(response);
	    });
	  });

	  // Handle errors
	  req.on('error', function handleRequestError(err) {
	    if (aborted) return;
	    reject(err);
	  });

	  // Handle request timeout
	  if (config.timeout && !timer) {
	    timer = setTimeout(function handleRequestTimeout() {
	      var err = new Error('timeout of ' + config.timeout + 'ms exceeded');
	      err.timeout = config.timeout;
	      err.code = 'ECONNABORTED';
	      req.abort();
	      reject(err);
	      aborted = true;
	    }, config.timeout);
	  }

	  // Send the request
	  req.end(data);
	};


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(133)({
	  'http': __webpack_require__(16),
	  'https': __webpack_require__(136)
	});


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var url = __webpack_require__(35);
	var debug = __webpack_require__(8)('follow-redirects');
	var assert = __webpack_require__(134);
	var consume = __webpack_require__(135);

	module.exports = function(_nativeProtocols) {
	  var nativeProtocols = {};

	  var publicApi = {
	    maxRedirects: 5
	  };

	  for (var p in _nativeProtocols) {
	    /* istanbul ignore else */
	    if (_nativeProtocols.hasOwnProperty(p)) {
	      // http://www.ietf.org/rfc/rfc2396.txt - Section 3.1
	      assert(/^[A-Z][A-Z\+\-\.]*$/i.test(p), JSON.stringify(p) + ' is not a valid scheme name');
	      generateWrapper(p, _nativeProtocols[p]);
	    }
	  }

	  return publicApi;

	  function execute(options) {
	    var clientRequest;
	    var fetchedUrls = [];

	    return (clientRequest = cb());

	    function cb(res) {
	      // skip the redirection logic on the first call.
	      if (res) {
	        var fetchedUrl = url.format(options);
	        fetchedUrls.unshift(fetchedUrl);

	        if (!isRedirect(res)) {
	          res.fetchedUrls = fetchedUrls;
	          return options.userCallback(res);
	        }

	        // we are going to follow the redirect, but in node 0.10 we must first attach a data listener
	        // to consume the stream and send the 'end' event
	        consume(res);

	        // need to use url.resolve() in case location is a relative URL
	        var redirectUrl = url.resolve(fetchedUrl, res.headers.location);
	        debug('redirecting to', redirectUrl);

	        // clean all the properties related to the old url away, and copy from the redirect url
	        wipeUrlProps(options);
	        extend(options, url.parse(redirectUrl));
	      }

	      if (fetchedUrls.length > options.maxRedirects) {
	        var err = new Error('Max redirects exceeded.');
	        return forwardError(err);
	      }

	      options.nativeProtocol = nativeProtocols[options.protocol];
	      options.defaultRequest = defaultMakeRequest;

	      var req = (options.makeRequest || defaultMakeRequest)(options, cb, res);

	      if (res) {
	        req.on('error', forwardError);
	      }
	      return req;
	    }

	    function defaultMakeRequest(options, cb, res) {
	      if (res) {
	        // This is a redirect, so use only GET methods
	        options.method = 'GET';
	      }

	      var req = options.nativeProtocol.request(options, cb);

	      if (res) {
	        // We leave the user to call `end` on the first request
	        req.end();
	      }

	      return req;
	    }

	    // bubble errors that occur on the redirect back up to the initiating client request
	    // object, otherwise they wind up killing the process.
	    function forwardError (err) {
	      clientRequest.emit('error', err);
	    }
	  }

	  function generateWrapper (scheme, nativeProtocol) {
	    var wrappedProtocol = scheme + ':';
	    var H = function() {};
	    H.prototype = nativeProtocols[wrappedProtocol] = nativeProtocol;
	    H = new H();
	    publicApi[scheme] = H;

	    H.request = function(options, callback) {
	      return execute(parseOptions(options, callback, wrappedProtocol));
	    };

	    // see https://github.com/joyent/node/blob/master/lib/http.js#L1623
	    H.get = function(options, callback) {
	      options = parseOptions(options, callback, wrappedProtocol);
	      var req = execute(options);
	      req.end();
	      return req;
	    };
	  }

	  // returns a safe copy of options (or a parsed url object if options was a string).
	  // validates that the supplied callback is a function
	  function parseOptions (options, callback, wrappedProtocol) {
	    assert.equal(typeof callback, 'function', 'callback must be a function');
	    if ('string' === typeof options) {
	      options = url.parse(options);
	      options.maxRedirects = publicApi.maxRedirects;
	    } else {
	      options = extend({
	        maxRedirects: publicApi.maxRedirects,
	        protocol: wrappedProtocol
	      }, options);
	    }
	    assert.equal(options.protocol, wrappedProtocol, 'protocol mismatch');
	    options.protocol = wrappedProtocol;
	    options.userCallback = callback;

	    debug('options', options);
	    return options;
	  }
	};

	// copies source's own properties onto destination and returns destination
	function extend(destination, source) {
	  for (var i in source) {
	    if (source.hasOwnProperty(i)) {
	      destination[i] = source[i];
	    }
	  }
	  return destination;
	}

	// to redirect the result must have
	// a statusCode between 300-399
	// and a `Location` header
	function isRedirect (res) {
	  return (res.statusCode >= 300 && res.statusCode <= 399 &&
	  'location' in res.headers);
	}

	// nulls all url related properties on the object.
	// required on node <10
	function wipeUrlProps(options) {
	  for (var i = 0, l = urlProps.length; i < l; ++i) {
	    options[urlProps[i]] = null;
	  }
	}
	var urlProps = ['protocol', 'slashes', 'auth', 'host', 'port', 'hostname',
	  'hash', 'search', 'query', 'pathname', 'path', 'href'];


/***/ },
/* 134 */
/***/ function(module, exports) {

	module.exports = require("assert");

/***/ },
/* 135 */
/***/ function(module, exports) {

	module.exports = function(stream) {
	    if (stream.readable && typeof stream.resume === 'function') {
	        var state = stream._readableState;
	        if (!state || state.pipesCount === 0) {
	            // Either a classic stream or streams2 that's not piped to another destination
	            try {
	                stream.resume();
	            } catch (err) {
	                console.error("Got error: " + err);
	                // If we can't, it's not worth dying over
	            }
	        }
	    }
	};


/***/ },
/* 136 */
/***/ function(module, exports) {

	module.exports = require("https");

/***/ },
/* 137 */
/***/ function(module, exports) {

	module.exports = require("zlib");

/***/ },
/* 138 */
/***/ function(module, exports) {

	module.exports = {
		"_args": [
			[
				"axios",
				"/Users/dan/Projects/fellowship/hackdash-front"
			]
		],
		"_from": "axios@latest",
		"_id": "axios@0.9.1",
		"_inCache": true,
		"_installable": true,
		"_location": "/axios",
		"_nodeVersion": "3.3.1",
		"_npmUser": {
			"email": "mzabriskie@gmail.com",
			"name": "mzabriskie"
		},
		"_npmVersion": "2.14.3",
		"_phantomChildren": {},
		"_requested": {
			"name": "axios",
			"raw": "axios",
			"rawSpec": "",
			"scope": null,
			"spec": "latest",
			"type": "tag"
		},
		"_requiredBy": [
			"/"
		],
		"_resolved": "http://registry.npmjs.org/axios/-/axios-0.9.1.tgz",
		"_shasum": "95608b16447ee29b033589854c3fc7ee2c06bf6e",
		"_shrinkwrap": null,
		"_spec": "axios",
		"_where": "/Users/dan/Projects/fellowship/hackdash-front",
		"author": {
			"name": "Matt Zabriskie"
		},
		"browser": {
			"./lib/adapters/http.js": "./lib/adapters/xhr.js"
		},
		"bugs": {
			"url": "https://github.com/mzabriskie/axios/issues"
		},
		"dependencies": {
			"follow-redirects": "0.0.7"
		},
		"description": "Promise based HTTP client for the browser and node.js",
		"devDependencies": {
			"coveralls": "2.11.6",
			"es6-promise": "3.0.2",
			"grunt": "0.4.5",
			"grunt-banner": "0.6.0",
			"grunt-cli": "0.1.13",
			"grunt-contrib-clean": "0.7.0",
			"grunt-contrib-nodeunit": "0.4.1",
			"grunt-contrib-watch": "0.6.1",
			"grunt-eslint": "17.3.1",
			"grunt-karma": "0.12.1",
			"grunt-ts": "5.3.2",
			"grunt-update-json": "0.2.2",
			"grunt-webpack": "1.0.11",
			"istanbul-instrumenter-loader": "^0.1.3",
			"jasmine-core": "2.4.1",
			"karma": "0.13.19",
			"karma-coverage": "0.5.3",
			"karma-jasmine": "0.3.6",
			"karma-jasmine-ajax": "0.1.13",
			"karma-phantomjs-launcher": "0.2.3",
			"karma-sinon": "1.0.4",
			"karma-sourcemap-loader": "0.3.7",
			"karma-webpack": "1.7.0",
			"load-grunt-tasks": "3.4.0",
			"minimist": "1.2.0",
			"phantomjs": "1.9.19",
			"webpack": "1.12.11",
			"webpack-dev-server": "1.14.1"
		},
		"directories": {},
		"dist": {
			"shasum": "95608b16447ee29b033589854c3fc7ee2c06bf6e",
			"tarball": "https://registry.npmjs.org/axios/-/axios-0.9.1.tgz"
		},
		"gitHead": "5176623d6c70e9d66c17f7867703a8e9990554bd",
		"homepage": "https://github.com/mzabriskie/axios",
		"keywords": [
			"ajax",
			"http",
			"node",
			"promise",
			"xhr"
		],
		"license": "MIT",
		"main": "index.js",
		"maintainers": [
			{
				"name": "mzabriskie",
				"email": "mzabriskie@gmail.com"
			}
		],
		"name": "axios",
		"optionalDependencies": {},
		"readme": "ERROR: No README data found!",
		"repository": {
			"type": "git",
			"url": "git+https://github.com/mzabriskie/axios.git"
		},
		"scripts": {
			"build": "grunt build",
			"coveralls": "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
			"examples": "node ./examples/server.js",
			"start": "node ./sandbox/server.js",
			"test": "grunt test"
		},
		"typescript": {
			"definition": "./axios.d.ts"
		},
		"version": "0.9.1"
	};

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(122);

	function InterceptorManager() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	module.exports = InterceptorManager;


/***/ },
/* 140 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ },
/* 141 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
	};


/***/ },
/* 142 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ },
/* 143 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _preact = __webpack_require__(1);

	var _preactRouter = __webpack_require__(116);

	var _reactRedux = __webpack_require__(96);

	var _actions = __webpack_require__(118);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Dashboard = function (_Component) {
	  _inherits(Dashboard, _Component);

	  function Dashboard() {
	    _classCallCheck(this, Dashboard);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Dashboard).apply(this, arguments));
	  }

	  _createClass(Dashboard, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _props = this.props;
	      var dispatch = _props.dispatch;
	      var matches = _props.matches;

	      dispatch((0, _actions.fetchInitialData)('dashboard', matches.dashboardId));
	    }
	  }, {
	    key: 'render',
	    value: function render(_ref) {
	      var projects = _ref.projects;

	      return (0, _preact.h)(
	        'div',
	        null,
	        (0, _preact.h)(
	          'h1',
	          null,
	          'Dashboard'
	        ),
	        (0, _preact.h)(
	          _preactRouter.Link,
	          { href: '/' },
	          'Home'
	        ),
	        (0, _preact.h)(
	          'ul',
	          null,
	          projects.map(function (project, i) {
	            return (0, _preact.h)(
	              'li',
	              { key: i },
	              project.title
	            );
	          })
	        )
	      );
	    }
	  }]);

	  return Dashboard;
	}(_preact.Component);

	var mapStateToProps = function mapStateToProps(_ref2) {
	  var projects = _ref2.projects;
	  return { projects: projects };
	};
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(Dashboard);

/***/ }
/******/ ]);