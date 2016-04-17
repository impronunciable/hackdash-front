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

	var _reactRedux = __webpack_require__(4);

	var _App = __webpack_require__(31);

	var _App2 = _interopRequireDefault(_App);

	var _store = __webpack_require__(54);

	var _store2 = _interopRequireDefault(_store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var store = (0, _store2.default)(__state__);

	var root = document.getElementById('root');
	(0, _preact.render)((0, _preact.h)(
	  _reactRedux.Provider,
	  { store: store },
	  (0, _preact.h)(_App2.default, { client: true })
	), root, root.lastChild);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {!function(global, factory) {
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).setImmediate))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(3).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).setImmediate, __webpack_require__(2).clearImmediate))

/***/ },
/* 3 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.connect = exports.Provider = undefined;

	var _Provider = __webpack_require__(5);

	var _Provider2 = _interopRequireDefault(_Provider);

	var _connect = __webpack_require__(11);

	var _connect2 = _interopRequireDefault(_connect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	exports.Provider = _Provider2["default"];
	exports.connect = _connect2["default"];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports["default"] = undefined;

	var _react = __webpack_require__(6);

	var _storeShape = __webpack_require__(9);

	var _storeShape2 = _interopRequireDefault(_storeShape);

	var _warning = __webpack_require__(10);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {(function (global, factory) {
		 true ? factory(exports, __webpack_require__(7), __webpack_require__(8), __webpack_require__(1)) :
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(global,factory){if(true){!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports,module,__webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));}else if(typeof exports !== 'undefined' && typeof module !== 'undefined'){factory(exports,module,require('preact'));}else {var mod={exports:{}};factory(mod.exports,mod,global.preact);global.preactSvg = mod.exports;}})(this,function(exports,module,_preact){'use strict';var _extends=Object.assign || function(target){for(var i=1;i < arguments.length;i++) {var source=arguments[i];for(var key in source) {if(Object.prototype.hasOwnProperty.call(source,key)){target[key] = source[key];}}}return target;};function _objectWithoutProperties(obj,keys){var target={};for(var i in obj) {if(keys.indexOf(i) >= 0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i] = obj[i];}return target;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function');}}function _inherits(subClass,superClass){if(typeof superClass !== 'function' && superClass !== null){throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__ = superClass;}var DOM=typeof document !== 'undefined' && !!document.createElement;var SVG_ATTRS=['viewBox'];var PROP_TO_ATTR_MAP={'className':'class'};var EMPTY={};var updateMode=false;if(DOM){(function(){var div=document.createElement('div');var oldCreate=document.createElement;document.createElement = function(name){if(updateMode || name === 'svg'){var el=document.createElementNS('http://www.w3.org/2000/svg',name);for(var key in el) {if(~SVG_ATTRS.indexOf(key) || !(key in div) || PROP_TO_ATTR_MAP.hasOwnProperty(key)){overwriteProperty(el,key);}}return el;}return oldCreate.call(document,name);};})();}var PROPERTY_ERRORS={};var hasPropertyErrors=false;function overwriteProperty(el,key){var err=PROPERTY_ERRORS[key];if(err === false){Object.defineProperty(el,key,contentPropertyDef(key));}else {attemptOverwriteProperty(el,key);}}function attemptOverwriteProperty(el,key){try{Object.defineProperty(el,key,contentPropertyDef(key));PROPERTY_ERRORS[key] = false;}catch(e) {if(!PROPERTY_ERRORS[key]){var err=el.nodeName + ': ' + e;PROPERTY_ERRORS[key] = err;if(!hasPropertyErrors && 'undefined' !== typeof console && console.warn){hasPropertyErrors = true;console.warn('Error overwriting some SVG properties.',{errors:PROPERTY_ERRORS});}}}}var memoize=function memoize(fn){var mem=arguments.length <= 1 || arguments[1] === undefined?{}:arguments[1];return function(k){return mem.hasOwnProperty(k)?mem[k]:mem[k] = fn(k);};};var contentPropertyDef=memoize(function(prop){var attr=arguments.length <= 1 || arguments[1] === undefined?PROP_TO_ATTR_MAP[prop] || prop:arguments[1];return (function(){return {set:function set(v){if(v === null || v === undefined)this.removeAttribute(attr);else this.setAttribute(attr,v);},get:function get(){return this.getAttribute(attr);}};})();});var SVG=(function(_Component){_inherits(SVG,_Component);function SVG(){_classCallCheck(this,SVG);_Component.apply(this,arguments);}SVG.prototype.componentWillUpdate = function componentWillUpdate(){updateMode = true;};SVG.prototype.componentDidUpdate = function componentDidUpdate(){updateMode = false;if(this.base){for(var i in this.props) {if(~SVG_ATTRS.indexOf(i) || PROPERTY_ERRORS.hasOwnProperty(i) && PROPERTY_ERRORS[i] !== false){this.base.setAttribute(i,this.props[i]);}}}};SVG.prototype.render = function render(_ref){var children=_ref.children;var props=_objectWithoutProperties(_ref,['children']);if(!this.hasRendered){this.hasRendered = updateMode = true;this.setState(EMPTY,setStateUpdateProxy(this));}for(var i in props) {if(~SVG_ATTRS.indexOf(i) || PROPERTY_ERRORS.hasOwnProperty(i) && PROPERTY_ERRORS[i] !== false){delete props[i];}}return _preact.h('svg',_extends({version:'1.1',xmlns:'http://www.w3.org/2000/svg'},props),children);};return SVG;})(_preact.Component);module.exports = SVG;function setStateUpdateProxy(component){return function(){component.componentDidUpdate();component = null;};}});

	//# sourceMappingURL=preact-svg.js.map

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _react = __webpack_require__(6);

	exports["default"] = _react.PropTypes.shape({
	  subscribe: _react.PropTypes.func.isRequired,
	  dispatch: _react.PropTypes.func.isRequired,
	  getState: _react.PropTypes.func.isRequired
	});

/***/ },
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.__esModule = true;
	exports["default"] = connect;

	var _react = __webpack_require__(6);

	var _storeShape = __webpack_require__(9);

	var _storeShape2 = _interopRequireDefault(_storeShape);

	var _shallowEqual = __webpack_require__(12);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	var _wrapActionCreators = __webpack_require__(13);

	var _wrapActionCreators2 = _interopRequireDefault(_wrapActionCreators);

	var _warning = __webpack_require__(10);

	var _warning2 = _interopRequireDefault(_warning);

	var _isPlainObject = __webpack_require__(25);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _hoistNonReactStatics = __webpack_require__(29);

	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

	var _invariant = __webpack_require__(30);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = wrapActionCreators;

	var _redux = __webpack_require__(14);

	function wrapActionCreators(actionCreators) {
	  return function (dispatch) {
	    return (0, _redux.bindActionCreators)(actionCreators, dispatch);
	  };
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

	var _createStore = __webpack_require__(15);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _combineReducers = __webpack_require__(20);

	var _combineReducers2 = _interopRequireDefault(_combineReducers);

	var _bindActionCreators = __webpack_require__(22);

	var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

	var _applyMiddleware = __webpack_require__(23);

	var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

	var _compose = __webpack_require__(24);

	var _compose2 = _interopRequireDefault(_compose);

	var _warning = __webpack_require__(21);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.ActionTypes = undefined;
	exports["default"] = createStore;

	var _isPlainObject = __webpack_require__(16);

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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(17),
	    isHostObject = __webpack_require__(18),
	    isObjectLike = __webpack_require__(19);

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
/* 17 */
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
/* 18 */
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
/* 19 */
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports["default"] = combineReducers;

	var _createStore = __webpack_require__(15);

	var _isPlainObject = __webpack_require__(16);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _warning = __webpack_require__(21);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 21 */
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
/* 22 */
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports["default"] = applyMiddleware;

	var _compose = __webpack_require__(24);

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
/* 24 */
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(26),
	    isHostObject = __webpack_require__(27),
	    isObjectLike = __webpack_require__(28);

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
/* 26 */
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
/* 27 */
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
/* 28 */
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
/* 29 */
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
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

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _preact = __webpack_require__(1);

	var _Router = __webpack_require__(32);

	var _Router2 = _interopRequireDefault(_Router);

	var _preactRouter = __webpack_require__(33);

	var _Home = __webpack_require__(34);

	var _Home2 = _interopRequireDefault(_Home);

	var _Dashboard = __webpack_require__(53);

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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _preactRouter = __webpack_require__(33);

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
/* 33 */
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _preact = __webpack_require__(1);

	var _preactRouter = __webpack_require__(33);

	var _reactRedux = __webpack_require__(4);

	var _actions = __webpack_require__(35);

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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.fetchDashboards = exports.fetchDashboard = exports.fetchInitialData = undefined;

	var _axios = __webpack_require__(36);

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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(37);

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defaults = __webpack_require__(38);
	var utils = __webpack_require__(39);
	var dispatchRequest = __webpack_require__(40);
	var InterceptorManager = __webpack_require__(48);
	var isAbsoluteURL = __webpack_require__(49);
	var combineURLs = __webpack_require__(50);
	var bind = __webpack_require__(51);
	var transformData = __webpack_require__(44);

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
	axios.spread = __webpack_require__(52);

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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(39);

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
/* 39 */
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

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
	        adapter = __webpack_require__(41);
	      } else if (typeof process !== 'undefined') {
	        // For node use HTTP adapter
	        adapter = __webpack_require__(41);
	      }

	      if (typeof adapter === 'function') {
	        adapter(resolve, reject, config);
	      }
	    } catch (e) {
	      reject(e);
	    }
	  });
	};


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(39);
	var buildURL = __webpack_require__(42);
	var parseHeaders = __webpack_require__(43);
	var transformData = __webpack_require__(44);
	var isURLSameOrigin = __webpack_require__(45);
	var btoa = window.btoa || __webpack_require__(46);

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
	    var cookies = __webpack_require__(47);

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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(39);

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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(39);

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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(39);

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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(39);

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
/* 46 */
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(39);

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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(39);

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
/* 49 */
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
/* 50 */
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
/* 51 */
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
/* 52 */
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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _preact = __webpack_require__(1);

	var _preactRouter = __webpack_require__(33);

	var _reactRedux = __webpack_require__(4);

	var _actions = __webpack_require__(35);

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

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(14);

	var _reduxThunk = __webpack_require__(55);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reducers = __webpack_require__(56);

	var _reducers2 = _interopRequireDefault(_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  var initialState = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  return (0, _redux.createStore)(_reducers2.default, initialState, (0, _redux.applyMiddleware)(_reduxThunk2.default));
	};

/***/ },
/* 55 */
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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(14);

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

/***/ }
/******/ ]);