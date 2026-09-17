(self.webpackChunkanyride = self.webpackChunkanyride || []).push([
    [524], {
        1203: (e, t, i) => {
            var o, n, r;
            ! function() {
                "use strict";
                n = [i(4692)], o = function(e) {
                    function t(i, o) {
                        var n = this;
                        n.element = i, n.el = e(i), n.suggestions = [], n.badQueries = [], n.selectedIndex = -1, n.currentValue = n.element.value, n.timeoutId = null, n.cachedResponse = {}, n.onChangeTimeout = null, n.onChange = null, n.isLocal = !1, n.suggestionsContainer = null, n.noSuggestionsContainer = null, n.options = e.extend({}, t.defaults, o), n.classes = {
                            selected: "autocomplete-selected",
                            suggestion: "autocomplete-suggestion"
                        }, n.hint = null, n.hintValue = "", n.selection = null, n.initialize(), n.setOptions(o)
                    }
                    var i = {
                            escapeRegExChars: function(e) {
                                return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&")
                            },
                            createNode: function(e) {
                                var t = document.createElement("div");
                                return t.className = e, t.style.position = "absolute", t.style.display = "none", t
                            }
                        },
                        o = 27,
                        n = 9,
                        r = 13,
                        a = 38,
                        s = 39,
                        l = 40,
                        c = e.noop;
                    t.utils = i, e.Autocomplete = t, t.defaults = {
                        ajaxSettings: {},
                        autoSelectFirst: !1,
                        appendTo: "body",
                        serviceUrl: null,
                        lookup: null,
                        onSelect: null,
                        width: "auto",
                        minChars: 1,
                        maxHeight: 300,
                        deferRequestBy: 0,
                        params: {},
                        formatResult: function(e, t) {
                            if (!t) return e.value;
                            var o = "(" + i.escapeRegExChars(t) + ")";
                            return e.value.replace(new RegExp(o, "gi"), "<strong>$1</strong>").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/&lt;(\/?strong)&gt;/g, "<$1>")
                        },
                        formatGroup: function(e, t) {
                            return '<div class="autocomplete-group">' + t + "</div>"
                        },
                        delimiter: null,
                        zIndex: 9999,
                        type: "GET",
                        noCache: !1,
                        onSearchStart: c,
                        onSearchComplete: c,
                        onSearchError: c,
                        preserveInput: !1,
                        containerClass: "autocomplete-suggestions",
                        tabDisabled: !1,
                        dataType: "text",
                        currentRequest: null,
                        triggerSelectOnValidInput: !0,
                        preventBadQueries: !0,
                        lookupFilter: function(e, t, i) {
                            return -1 !== e.value.toLowerCase().indexOf(i)
                        },
                        paramName: "query",
                        transformResult: function(t) {
                            return "string" == typeof t ? e.parseJSON(t) : t
                        },
                        showNoSuggestionNotice: !1,
                        noSuggestionNotice: "No results",
                        orientation: "bottom",
                        forceFixPosition: !1
                    }, t.prototype = {
                        initialize: function() {
                            var i, o = this,
                                n = "." + o.classes.suggestion,
                                r = o.classes.selected,
                                a = o.options;
                            o.element.setAttribute("autocomplete", "off"), o.noSuggestionsContainer = e('<div class="autocomplete-no-suggestion"></div>').html(this.options.noSuggestionNotice).get(0), o.suggestionsContainer = t.utils.createNode(a.containerClass), (i = e(o.suggestionsContainer)).appendTo(a.appendTo || "body"), "auto" !== a.width && i.css("width", a.width), i.on("mouseover.autocomplete", n, (function() {
                                o.activate(e(this).data("index"))
                            })), i.on("mouseout.autocomplete", (function() {
                                o.selectedIndex = -1, i.children("." + r).removeClass(r)
                            })), i.on("click.autocomplete", n, (function() {
                                o.select(e(this).data("index"))
                            })), i.on("click.autocomplete", (function() {
                                clearTimeout(o.blurTimeoutId)
                            })), o.fixPositionCapture = function() {
                                o.visible && o.fixPosition()
                            }, e(window).on("resize.autocomplete", o.fixPositionCapture), o.el.on("keydown.autocomplete", (function(e) {
                                o.onKeyPress(e)
                            })), o.el.on("keyup.autocomplete", (function(e) {
                                o.onKeyUp(e)
                            })), o.el.on("blur.autocomplete", (function() {
                                o.onBlur()
                            })), o.el.on("focus.autocomplete", (function() {
                                o.onFocus()
                            })), o.el.on("change.autocomplete", (function(e) {
                                o.onKeyUp(e)
                            })), o.el.on("input.autocomplete", (function(e) {
                                o.onKeyUp(e)
                            }))
                        },
                        onFocus: function() {
                            var e = this;
                            e.fixPosition(), e.el.val().length >= e.options.minChars && e.onValueChange()
                        },
                        onBlur: function() {
                            var e = this;
                            e.blurTimeoutId = setTimeout((function() {
                                e.hide()
                            }), 200)
                        },
                        abortAjax: function() {
                            var e = this;
                            e.currentRequest && (e.currentRequest.abort(), e.currentRequest = null)
                        },
                        setOptions: function(t) {
                            var i = this,
                                o = e.extend({}, i.options, t);
                            i.isLocal = Array.isArray(o.lookup), i.isLocal && (o.lookup = i.verifySuggestionsFormat(o.lookup)), o.orientation = i.validateOrientation(o.orientation, "bottom"), e(i.suggestionsContainer).css({
                                "max-height": o.maxHeight + "px",
                                width: o.width + "px",
                                "z-index": o.zIndex
                            }), this.options = o
                        },
                        clearCache: function() {
                            this.cachedResponse = {}, this.badQueries = []
                        },
                        clear: function() {
                            this.clearCache(), this.currentValue = "", this.suggestions = []
                        },
                        disable: function() {
                            var e = this;
                            e.disabled = !0, clearTimeout(e.onChangeTimeout), e.abortAjax()
                        },
                        enable: function() {
                            this.disabled = !1
                        },
                        fixPosition: function() {
                            var t = this,
                                i = e(t.suggestionsContainer),
                                o = i.parent().get(0);
                            if (o === document.body || t.options.forceFixPosition) {
                                var n = t.options.orientation,
                                    r = i.outerHeight(),
                                    a = t.el.outerHeight(),
                                    s = t.el.offset(),
                                    l = {
                                        top: s.top,
                                        left: s.left
                                    };
                                if ("auto" === n) {
                                    var c = e(window).height(),
                                        u = e(window).scrollTop(),
                                        h = -u + s.top - r,
                                        d = u + c - (s.top + a + r);
                                    n = Math.max(h, d) === h ? "top" : "bottom"
                                }
                                if (l.top += "top" === n ? -r : a, o !== document.body) {
                                    var p, f = i.css("opacity");
                                    t.visible || i.css("opacity", 0).show(), p = i.offsetParent().offset(), l.top -= p.top, l.top += o.scrollTop, l.left -= p.left, t.visible || i.css("opacity", f).hide()
                                }
                                "auto" === t.options.width && (l.width = t.el.outerWidth() + "px"), i.css(l)
                            }
                        },
                        isCursorAtEnd: function() {
                            var e, t = this.el.val().length,
                                i = this.element.selectionStart;
                            return "number" == typeof i ? i === t : !document.selection || ((e = document.selection.createRange()).moveStart("character", -t), t === e.text.length)
                        },
                        onKeyPress: function(e) {
                            var t = this;
                            if (t.disabled || t.visible || e.which !== l || !t.currentValue) {
                                if (!t.disabled && t.visible) {
                                    switch (e.which) {
                                        case o:
                                            t.el.val(t.currentValue), t.hide();
                                            break;
                                        case s:
                                            if (t.hint && t.options.onHint && t.isCursorAtEnd()) {
                                                t.selectHint();
                                                break
                                            }
                                            return;
                                        case n:
                                            if (t.hint && t.options.onHint) return void t.selectHint();
                                            if (-1 === t.selectedIndex) return void t.hide();
                                            if (t.select(t.selectedIndex), !1 === t.options.tabDisabled) return;
                                            break;
                                        case r:
                                            if (-1 === t.selectedIndex) return void t.hide();
                                            t.select(t.selectedIndex);
                                            break;
                                        case a:
                                            t.moveUp();
                                            break;
                                        case l:
                                            t.moveDown();
                                            break;
                                        default:
                                            return
                                    }
                                    e.stopImmediatePropagation(), e.preventDefault()
                                }
                            } else t.suggest()
                        },
                        onKeyUp: function(e) {
                            var t = this;
                            if (!t.disabled) {
                                switch (e.which) {
                                    case a:
                                    case l:
                                        return
                                }
                                clearTimeout(t.onChangeTimeout), t.currentValue !== t.el.val() && (t.findBestHint(), t.options.deferRequestBy > 0 ? t.onChangeTimeout = setTimeout((function() {
                                    t.onValueChange()
                                }), t.options.deferRequestBy) : t.onValueChange())
                            }
                        },
                        onValueChange: function() {
                            if (!this.ignoreValueChange) {
                                var t = this,
                                    i = t.options,
                                    o = t.el.val(),
                                    n = t.getQuery(o);
                                return t.selection && t.currentValue !== n && (t.selection = null, (i.onInvalidateSelection || e.noop).call(t.element)), clearTimeout(t.onChangeTimeout), t.currentValue = o, t.selectedIndex = -1, i.triggerSelectOnValidInput && t.isExactMatch(n) ? void t.select(0) : void(n.length < i.minChars ? t.hide() : t.getSuggestions(n))
                            }
                            this.ignoreValueChange = !1
                        },
                        isExactMatch: function(e) {
                            var t = this.suggestions;
                            return 1 === t.length && t[0].value.toLowerCase() === e.toLowerCase()
                        },
                        getQuery: function(t) {
                            var i, o = this.options.delimiter;
                            return o ? (i = t.split(o), e.trim(i[i.length - 1])) : t
                        },
                        getSuggestionsLocal: function(t) {
                            var i, o = this.options,
                                n = t.toLowerCase(),
                                r = o.lookupFilter,
                                a = parseInt(o.lookupLimit, 10);
                            return i = {
                                suggestions: e.grep(o.lookup, (function(e) {
                                    return r(e, t, n)
                                }))
                            }, a && i.suggestions.length > a && (i.suggestions = i.suggestions.slice(0, a)), i
                        },
                        getSuggestions: function(t) {
                            var i, o, n, r, a = this,
                                s = a.options,
                                l = s.serviceUrl;
                            if (s.params[s.paramName] = t, !1 !== s.onSearchStart.call(a.element, s.params)) {
                                if (o = s.ignoreParams ? null : s.params, e.isFunction(s.lookup)) return void s.lookup(t, (function(e) {
                                    a.suggestions = e.suggestions, a.suggest(), s.onSearchComplete.call(a.element, t, e.suggestions)
                                }));
                                a.isLocal ? i = a.getSuggestionsLocal(t) : (e.isFunction(l) && (l = l.call(a.element, t)), n = l + "?" + e.param(o || {}), i = a.cachedResponse[n]), i && Array.isArray(i.suggestions) ? (a.suggestions = i.suggestions, a.suggest(), s.onSearchComplete.call(a.element, t, i.suggestions)) : a.isBadQuery(t) ? s.onSearchComplete.call(a.element, t, []) : (a.abortAjax(), r = {
                                    url: l,
                                    data: o,
                                    type: s.type,
                                    dataType: s.dataType
                                }, e.extend(r, s.ajaxSettings), a.currentRequest = e.ajax(r).done((function(e) {
                                    var i;
                                    a.currentRequest = null, i = s.transformResult(e, t), a.processResponse(i, t, n), s.onSearchComplete.call(a.element, t, i.suggestions)
                                })).fail((function(e, i, o) {
                                    s.onSearchError.call(a.element, t, e, i, o)
                                })))
                            }
                        },
                        isBadQuery: function(e) {
                            if (!this.options.preventBadQueries) return !1;
                            for (var t = this.badQueries, i = t.length; i--;)
                                if (0 === e.indexOf(t[i])) return !0;
                            return !1
                        },
                        hide: function() {
                            var t = this,
                                i = e(t.suggestionsContainer);
                            e.isFunction(t.options.onHide) && t.visible && t.options.onHide.call(t.element, i), t.visible = !1, t.selectedIndex = -1, clearTimeout(t.onChangeTimeout), e(t.suggestionsContainer).hide(), t.signalHint(null)
                        },
                        suggest: function() {
                            if (this.suggestions.length) {
                                var t, i = this,
                                    o = i.options,
                                    n = o.groupBy,
                                    r = o.formatResult,
                                    a = i.getQuery(i.currentValue),
                                    s = i.classes.suggestion,
                                    l = i.classes.selected,
                                    c = e(i.suggestionsContainer),
                                    u = e(i.noSuggestionsContainer),
                                    h = o.beforeRender,
                                    d = "",
                                    p = function(e, i) {
                                        var r = e.data[n];
                                        return t === r ? "" : (t = r, o.formatGroup(e, t))
                                    };
                                return o.triggerSelectOnValidInput && i.isExactMatch(a) ? void i.select(0) : (e.each(i.suggestions, (function(e, t) {
                                    n && (d += p(t, 0)), d += '<div class="' + s + '" data-index="' + e + '">' + r(t, a, e) + "</div>"
                                })), this.adjustContainerWidth(), u.detach(), c.html(d), e.isFunction(h) && h.call(i.element, c, i.suggestions), i.fixPosition(), c.show(), o.autoSelectFirst && (i.selectedIndex = 0, c.scrollTop(0), c.children("." + s).first().addClass(l)), i.visible = !0, void i.findBestHint())
                            }
                            this.options.showNoSuggestionNotice ? this.noSuggestions() : this.hide()
                        },
                        noSuggestions: function() {
                            var t = this,
                                i = t.options.beforeRender,
                                o = e(t.suggestionsContainer),
                                n = e(t.noSuggestionsContainer);
                            this.adjustContainerWidth(), n.detach(), o.empty(), o.append(n), e.isFunction(i) && i.call(t.element, o, t.suggestions), t.fixPosition(), o.show(), t.visible = !0
                        },
                        adjustContainerWidth: function() {
                            var t, i = this,
                                o = i.options,
                                n = e(i.suggestionsContainer);
                            "auto" === o.width ? (t = i.el.outerWidth(), n.css("width", t > 0 ? t : 300)) : "flex" === o.width && n.css("width", "")
                        },
                        findBestHint: function() {
                            var t = this,
                                i = t.el.val().toLowerCase(),
                                o = null;
                            i && (e.each(t.suggestions, (function(e, t) {
                                var n = 0 === t.value.toLowerCase().indexOf(i);
                                return n && (o = t), !n
                            })), t.signalHint(o))
                        },
                        signalHint: function(t) {
                            var i = "",
                                o = this;
                            t && (i = o.currentValue + t.value.substr(o.currentValue.length)), o.hintValue !== i && (o.hintValue = i, o.hint = t, (this.options.onHint || e.noop)(i))
                        },
                        verifySuggestionsFormat: function(t) {
                            return t.length && "string" == typeof t[0] ? e.map(t, (function(e) {
                                return {
                                    value: e,
                                    data: null
                                }
                            })) : t
                        },
                        validateOrientation: function(t, i) {
                            return t = e.trim(t || "").toLowerCase(), -1 === e.inArray(t, ["auto", "bottom", "top"]) && (t = i), t
                        },
                        processResponse: function(e, t, i) {
                            var o = this,
                                n = o.options;
                            e.suggestions = o.verifySuggestionsFormat(e.suggestions), n.noCache || (o.cachedResponse[i] = e, n.preventBadQueries && !e.suggestions.length && o.badQueries.push(t)), t === o.getQuery(o.currentValue) && (o.suggestions = e.suggestions, o.suggest())
                        },
                        activate: function(t) {
                            var i, o = this,
                                n = o.classes.selected,
                                r = e(o.suggestionsContainer),
                                a = r.find("." + o.classes.suggestion);
                            return r.find("." + n).removeClass(n), o.selectedIndex = t, -1 !== o.selectedIndex && a.length > o.selectedIndex ? (i = a.get(o.selectedIndex), e(i).addClass(n), i) : null
                        },
                        selectHint: function() {
                            var t = this,
                                i = e.inArray(t.hint, t.suggestions);
                            t.select(i)
                        },
                        select: function(e) {
                            this.hide(), this.onSelect(e)
                        },
                        moveUp: function() {
                            var t = this;
                            if (-1 !== t.selectedIndex) return 0 === t.selectedIndex ? (e(t.suggestionsContainer).children("." + t.classes.suggestion).first().removeClass(t.classes.selected), t.selectedIndex = -1, t.ignoreValueChange = !1, t.el.val(t.currentValue), void t.findBestHint()) : void t.adjustScroll(t.selectedIndex - 1)
                        },
                        moveDown: function() {
                            var e = this;
                            e.selectedIndex !== e.suggestions.length - 1 && e.adjustScroll(e.selectedIndex + 1)
                        },
                        adjustScroll: function(t) {
                            var i = this,
                                o = i.activate(t);
                            if (o) {
                                var n, r, a, s = e(o).outerHeight();
                                n = o.offsetTop, a = (r = e(i.suggestionsContainer).scrollTop()) + i.options.maxHeight - s, n < r ? e(i.suggestionsContainer).scrollTop(n) : n > a && e(i.suggestionsContainer).scrollTop(n - i.options.maxHeight + s), i.options.preserveInput || (i.ignoreValueChange = !0, i.el.val(i.getValue(i.suggestions[t].value))), i.signalHint(null)
                            }
                        },
                        onSelect: function(t) {
                            var i = this,
                                o = i.options.onSelect,
                                n = i.suggestions[t];
                            i.currentValue = i.getValue(n.value), i.currentValue === i.el.val() || i.options.preserveInput || i.el.val(i.currentValue), i.signalHint(null), i.suggestions = [], i.selection = n, e.isFunction(o) && o.call(i.element, n)
                        },
                        getValue: function(e) {
                            var t, i, o = this.options.delimiter;
                            return o ? 1 === (i = (t = this.currentValue).split(o)).length ? e : t.substr(0, t.length - i[i.length - 1].length) + e : e
                        },
                        dispose: function() {
                            var t = this;
                            t.el.off(".autocomplete").removeData("autocomplete"), e(window).off("resize.autocomplete", t.fixPositionCapture), e(t.suggestionsContainer).remove()
                        }
                    }, e.fn.devbridgeAutocomplete = function(i, o) {
                        var n = "autocomplete";
                        return arguments.length ? this.each((function() {
                            var r = e(this),
                                a = r.data(n);
                            "string" == typeof i ? a && "function" == typeof a[i] && a[i](o) : (a && a.dispose && a.dispose(), a = new t(this, i), r.data(n, a))
                        })) : this.first().data(n)
                    }, e.fn.autocomplete || (e.fn.autocomplete = e.fn.devbridgeAutocomplete)
                }, void 0 === (r = o.apply(t, n)) || (e.exports = r)
            }()
        },
        2885: (e, t, i) => {
            ! function(e) {
                "use strict";
                var t = {
                        title: "",
                        text: "",
                        extraCssClasses: [],
                        overrideGeometry: {
                            top: void 0,
                            left: void 0,
                            width: void 0,
                            height: void 0
                        }
                    },
                    i = function(i, o) {
                        this._waitCount = 0, this._parent = i, this._options = e.extend({}, t, o)
                    };
                i.prototype = {
                    get waitCount() {
                        return this._waitCount
                    },
                    show: function() {
                        this._waitCount++ || (this._buildAndDisplay(), this._parent.data("waitOverlay", this))
                    },
                    unshow: function() {
                        0 === --this._waitCount && this._removeSelf()
                    },
                    _buildAndDisplay: function() {
                        var e = this;
                        this._createOverlay()._addTitle()._addText()._addWaitClassArea()._waitForParentToStabilize().done((function() {
                            e._display()
                        }))
                    },
                    _createOverlay: function() {
                        return this._parentIsWindow() ? this._createWindowOverlay() : this._createRegularOverlay()
                    },
                    _createWindowOverlay: function() {
                        return this._overlay = e("<div></div>").css("position", "fixed").css("display", "table").css("z-index", "9999").css("width", "100%").css("height", "100%").css("top", "0").css("left", "0").css("margin-left", "0").css("margin-top", "0").addClass("wait-overlay").addClass("wait-overlay-window"), this._ensureOverlayIsNotTransparent(), this._applyExtraCssClassesTo(this._overlay), this
                    },
                    _createRegularOverlay: function() {
                        var t = e(this._parent),
                            i = t.position(),
                            o = this._getMarginsOf(t);
                        return this._overlay = e("<div></div>").css("position", "absolute").css("display", "table").css("z-index", "9999").width(t.outerWidth()).height(t.outerHeight()).css("left", i.left).css("top", i.top).css(o).addClass("wait-overlay"), this._applyExtraCssClassesTo(this._overlay), this
                    },
                    _getMarginsOf: function(e) {
                        return {
                            marginLeft: e.css("margin-left"),
                            marginRight: e.css("margin-right"),
                            marginTop: e.css("margin-top"),
                            marginBottom: e.css("margin-bottom")
                        }
                    },
                    _applyExtraCssClassesTo: function(e) {
                        this._options.extraCssClasses.forEach((function(t) {
                            e.addClass(t)
                        }))
                    },
                    _getParentGeometry: function() {
                        if (this._options.overrideGeometry) return this._options.overrideGeometry;
                        var t = e(this._parent).offset();
                        return {
                            left: t.left,
                            top: t.top,
                            width: e(this._parent).outerWidth(),
                            height: e(this._parent).outerHeight(),
                            marginLeft: e(this._parent).css("margin-left"),
                            marginRight: e(this._parent).css("margin-right")
                        }
                    },
                    _addWaitClassArea: function() {
                        var t = e("<div></div>").addClass("wait"),
                            i = e("<div></div>").addClass("wait-lens"),
                            o = e("<div></div>");
                        return o.append(t), o.append(i), this._overlay.append(o), this._waitArea = o, this
                    },
                    _addTitle: function() {
                        if (this._options.title) {
                            var t = e("<div></div>").css("text-align", "center").css("margin", "0px").addClass("wait-title-container"),
                                i = e("<span></span>").css("margin", "0px").text(this._options.title).addClass("wait-title");
                            t.append(i), this._titleArea = t, this._overlay.append(t)
                        }
                        return this
                    },
                    _addText: function() {
                        if (this._options.text) {
                            var t = e("<div></div>").addClass("wait-text-container").css("margin", "0px").css("width", "100%"),
                                i = e("<span></span>").text(this._options.text).css("white-space", "pre-wrap").addClass("wait-text");
                            t.append(i), this._textArea = t, this._overlay.append(t)
                        }
                        return this
                    },
                    _display: function() {
                        this._parentIsWindow() ? e("body").append(this._overlay) : e(this._parent.parent()).append(this._overlay), this._keepSizeInSync()
                    },
                    _checkIfParentHasStabilised: function(e, t) {
                        this._waitCount || e.reject();
                        var i = this._getParentGeometry(),
                            o = void 0 === t;
                        if (!o)
                            for (var n in i)
                                if (i[n] !== t[n]) {
                                    o = !0;
                                    break
                                } if (o) {
                            var r = this;
                            window.setTimeout((function() {
                                r._checkIfParentHasStabilised(e, i)
                            }), 50)
                        } else e.resolve(i)
                    },
                    _waitForParentToStabilize: function() {
                        var t = new e.Deferred;
                        return this._checkIfParentHasStabilised(t), t.promise()
                    },
                    _keepSizeInSync: function() {
                        if (this._parent.is(":visible")) {
                            var t = this._parent.parent && this._parent.parent() || this._parent;
                            if (0 === t.length && (t = e("html")), t.find(".wait-overlay").length) {
                                var i = this._resizeInnerContentToFit(),
                                    o = this;
                                window.setTimeout((function() {
                                    o._keepSizeInSync(!0)
                                }), i ? 25 : 100)
                            }
                        }
                    },
                    _resizeInnerContentToFit: function() {
                        return this._textArea ? this._resizedTextArea() : this._resizedWaitArea()
                    },
                    _resizedWaitArea: function() {
                        var e = this._waitArea.height(),
                            t = this._getParentHeight();
                        return this._titleArea && (t -= this._titleArea.outerHeight()), e !== t && (this._waitArea.height(t), !0)
                    },
                    _resizedTextArea: function() {
                        var e = this._textArea.height(),
                            t = this._getParentHeight() - this._waitArea.outerHeight();
                        return this._titleArea && (t -= this._titleArea.outerHeight()), e !== t && (this._textArea.height(t), !0)
                    },
                    _parentIsWindow: function() {
                        return this._parent[0] === window
                    },
                    _createBackingOverlay: function() {
                        this._parentIsWindow() || (this._backingOverlay = e(this._parent).clone(), this._backingOverlay.addClass("wait-overlay-backing").css("opacity", this._options.backingOverlayOpacity), e(this._backingOverlay).find("*").attr("disabled", "disabled"), e(this._parent.parent()).append(this._backingOverlay), this._parent.hide())
                    },
                    _removeSelf: function() {
                        this._parent.data("waitOverlay", null), this._overlay.remove(), this._backingOverlay && this._backingOverlay.remove(), this._parent.show()
                    },
                    _getParentWidth: function() {
                        for (var t, i = this._parent.width(), o = this._parent.offset().left, n = o + i, r = this._parent.find("*:visible"), a = 0; a < r.length; a++) t = e(r[a]).offset().left + e(r[a]).width(), t += this._getCssIntVal(r[a], "padding-left"), (t += this._getCssIntVal(r[a], "padding-right")) > n && (n = t);
                        return n - o
                    },
                    _getParentHeight: function() {
                        if (void 0 !== this._options.overrideGeometry.height) return this._options.overrideGeometry.height;
                        for (var t, i = this._parent.height(), o = this._parent.offset().top, n = o + i, r = this._parent.find("*:visible"), a = 0; a < r.length; a++) t = e(r[a]).offset().top + e(r[a]).height(), t += this._getCssIntVal(r[a], "padding-top"), (t += this._getCssIntVal(r[a], "padding-bottom")) > n && (n = t);
                        return n - o
                    },
                    _getCssIntVal: function(t, i) {
                        var o = e(t).css(i);
                        if (!o) return 0;
                        o = o.replace(/px/, "");
                        try {
                            return parseInt(o, 10)
                        } catch (e) {
                            return 0
                        }
                    }
                }, e.fn.wait = function(t) {
                    var o = new e.Deferred;
                    if (0 === this.length) return o.promise();
                    t = t || {};
                    for (var n = 0; n < this.length; n++) {
                        var r = this[n];
                        r === window && (t.overrideGeometry = {
                            left: 0,
                            top: 0,
                            width: window.innerWidth,
                            height: window.innerHeight
                        }), (e(r).data("waitOverlay") || new i(e(r), t)).show()
                    }
                    return o.promise()
                }, e.fn.unwait = function() {
                    for (var t = 0; t < this.length; t++) {
                        var i = e(this.get(t)).data("waitOverlay");
                        i && i.unshow()
                    }
                }, window.TestExports = window.TestExports || {}, window.TestExports = e.extend({}, window.TestExports, {
                    WaitOverlay: i
                }), window.jasmine && (i.prototype._waitForParentToStabilize = function() {
                    var t = new e.Deferred;
                    return t.resolve({}), t.promise()
                })
            }(i(4692))
        },
        5358: (e, t, i) => {
            var o = {
                "./af": 5177,
                "./af.js": 5177,
                "./ar": 1509,
                "./ar-dz": 1488,
                "./ar-dz.js": 1488,
                "./ar-kw": 8676,
                "./ar-kw.js": 8676,
                "./ar-ly": 2353,
                "./ar-ly.js": 2353,
                "./ar-ma": 4496,
                "./ar-ma.js": 4496,
                "./ar-ps": 6947,
                "./ar-ps.js": 6947,
                "./ar-sa": 2682,
                "./ar-sa.js": 2682,
                "./ar-tn": 9756,
                "./ar-tn.js": 9756,
                "./ar.js": 1509,
                "./az": 5533,
                "./az.js": 5533,
                "./be": 8959,
                "./be.js": 8959,
                "./bg": 7777,
                "./bg.js": 7777,
                "./bm": 4903,
                "./bm.js": 4903,
                "./bn": 1290,
                "./bn-bd": 7357,
                "./bn-bd.js": 7357,
                "./bn.js": 1290,
                "./bo": 1545,
                "./bo.js": 1545,
                "./br": 1470,
                "./br.js": 1470,
                "./bs": 4429,
                "./bs.js": 4429,
                "./ca": 7306,
                "./ca.js": 7306,
                "./cs": 6464,
                "./cs.js": 6464,
                "./cv": 3635,
                "./cv.js": 3635,
                "./cy": 4226,
                "./cy.js": 4226,
                "./da": 3601,
                "./da.js": 3601,
                "./de": 7853,
                "./de-at": 6111,
                "./de-at.js": 6111,
                "./de-ch": 4697,
                "./de-ch.js": 4697,
                "./de.js": 7853,
                "./dv": 708,
                "./dv.js": 708,
                "./el": 4691,
                "./el.js": 4691,
                "./en-au": 3872,
                "./en-au.js": 3872,
                "./en-ca": 8298,
                "./en-ca.js": 8298,
                "./en-gb": 6195,
                "./en-gb.js": 6195,
                "./en-ie": 6584,
                "./en-ie.js": 6584,
                "./en-il": 5543,
                "./en-il.js": 5543,
                "./en-in": 9033,
                "./en-in.js": 9033,
                "./en-nz": 9402,
                "./en-nz.js": 9402,
                "./en-sg": 3004,
                "./en-sg.js": 3004,
                "./eo": 2934,
                "./eo.js": 2934,
                "./es": 7650,
                "./es-do": 838,
                "./es-do.js": 838,
                "./es-mx": 7730,
                "./es-mx.js": 7730,
                "./es-us": 6575,
                "./es-us.js": 6575,
                "./es.js": 7650,
                "./et": 3035,
                "./et.js": 3035,
                "./eu": 3508,
                "./eu.js": 3508,
                "./fa": 119,
                "./fa.js": 119,
                "./fi": 527,
                "./fi.js": 527,
                "./fil": 5995,
                "./fil.js": 5995,
                "./fo": 2477,
                "./fo.js": 2477,
                "./fr": 5498,
                "./fr-ca": 6435,
                "./fr-ca.js": 6435,
                "./fr-ch": 7892,
                "./fr-ch.js": 7892,
                "./fr.js": 5498,
                "./fy": 7071,
                "./fy.js": 7071,
                "./ga": 1734,
                "./ga.js": 1734,
                "./gd": 217,
                "./gd.js": 217,
                "./gl": 7329,
                "./gl.js": 7329,
                "./gom-deva": 2124,
                "./gom-deva.js": 2124,
                "./gom-latn": 3383,
                "./gom-latn.js": 3383,
                "./gu": 5050,
                "./gu.js": 5050,
                "./he": 1713,
                "./he.js": 1713,
                "./hi": 3861,
                "./hi.js": 3861,
                "./hr": 6308,
                "./hr.js": 6308,
                "./hu": 609,
                "./hu.js": 609,
                "./hy-am": 7160,
                "./hy-am.js": 7160,
                "./id": 4063,
                "./id.js": 4063,
                "./is": 9374,
                "./is.js": 9374,
                "./it": 8383,
                "./it-ch": 1827,
                "./it-ch.js": 1827,
                "./it.js": 8383,
                "./ja": 3827,
                "./ja.js": 3827,
                "./jv": 9722,
                "./jv.js": 9722,
                "./ka": 1794,
                "./ka.js": 1794,
                "./kk": 7088,
                "./kk.js": 7088,
                "./km": 6870,
                "./km.js": 6870,
                "./kn": 4451,
                "./kn.js": 4451,
                "./ko": 3164,
                "./ko.js": 3164,
                "./ku": 8174,
                "./ku-kmr": 6181,
                "./ku-kmr.js": 6181,
                "./ku.js": 8174,
                "./ky": 8474,
                "./ky.js": 8474,
                "./lb": 9680,
                "./lb.js": 9680,
                "./lo": 5867,
                "./lo.js": 5867,
                "./lt": 5766,
                "./lt.js": 5766,
                "./lv": 9532,
                "./lv.js": 9532,
                "./me": 8076,
                "./me.js": 8076,
                "./mi": 1848,
                "./mi.js": 1848,
                "./mk": 306,
                "./mk.js": 306,
                "./ml": 3739,
                "./ml.js": 3739,
                "./mn": 9053,
                "./mn.js": 9053,
                "./mr": 6169,
                "./mr.js": 6169,
                "./ms": 3386,
                "./ms-my": 2297,
                "./ms-my.js": 2297,
                "./ms.js": 3386,
                "./mt": 7075,
                "./mt.js": 7075,
                "./my": 2264,
                "./my.js": 2264,
                "./nb": 2274,
                "./nb.js": 2274,
                "./ne": 8235,
                "./ne.js": 8235,
                "./nl": 2572,
                "./nl-be": 3784,
                "./nl-be.js": 3784,
                "./nl.js": 2572,
                "./nn": 4566,
                "./nn.js": 4566,
                "./oc-lnc": 9330,
                "./oc-lnc.js": 9330,
                "./pa-in": 9849,
                "./pa-in.js": 9849,
                "./pl": 4418,
                "./pl.js": 4418,
                "./pt": 9834,
                "./pt-br": 8303,
                "./pt-br.js": 8303,
                "./pt.js": 9834,
                "./ro": 4457,
                "./ro.js": 4457,
                "./ru": 2271,
                "./ru.js": 2271,
                "./sd": 1221,
                "./sd.js": 1221,
                "./se": 3478,
                "./se.js": 3478,
                "./si": 7538,
                "./si.js": 7538,
                "./sk": 5784,
                "./sk.js": 5784,
                "./sl": 6637,
                "./sl.js": 6637,
                "./sq": 6794,
                "./sq.js": 6794,
                "./sr": 5719,
                "./sr-cyrl": 3322,
                "./sr-cyrl.js": 3322,
                "./sr.js": 5719,
                "./ss": 6e3,
                "./ss.js": 6e3,
                "./sv": 1011,
                "./sv.js": 1011,
                "./sw": 748,
                "./sw.js": 748,
                "./ta": 1025,
                "./ta.js": 1025,
                "./te": 1885,
                "./te.js": 1885,
                "./tet": 8861,
                "./tet.js": 8861,
                "./tg": 6571,
                "./tg.js": 6571,
                "./th": 5802,
                "./th.js": 5802,
                "./tk": 9527,
                "./tk.js": 9527,
                "./tl-ph": 9231,
                "./tl-ph.js": 9231,
                "./tlh": 1052,
                "./tlh.js": 1052,
                "./tr": 5096,
                "./tr.js": 5096,
                "./tzl": 9846,
                "./tzl.js": 9846,
                "./tzm": 1765,
                "./tzm-latn": 7711,
                "./tzm-latn.js": 7711,
                "./tzm.js": 1765,
                "./ug-cn": 8414,
                "./ug-cn.js": 8414,
                "./uk": 6618,
                "./uk.js": 6618,
                "./ur": 158,
                "./ur.js": 158,
                "./uz": 7609,
                "./uz-latn": 2475,
                "./uz-latn.js": 2475,
                "./uz.js": 7609,
                "./vi": 1135,
                "./vi.js": 1135,
                "./x-pseudo": 4051,
                "./x-pseudo.js": 4051,
                "./yo": 2218,
                "./yo.js": 2218,
                "./zh-cn": 2648,
                "./zh-cn.js": 2648,
                "./zh-hk": 1632,
                "./zh-hk.js": 1632,
                "./zh-mo": 1541,
                "./zh-mo.js": 1541,
                "./zh-tw": 304,
                "./zh-tw.js": 304
            };

            function n(e) {
                var t = r(e);
                return i(t)
            }

            function r(e) {
                if (!i.o(o, e)) {
                    var t = new Error("Cannot find module '" + e + "'");
                    throw t.code = "MODULE_NOT_FOUND", t
                }
                return o[e]
            }
            n.keys = function() {
                return Object.keys(o)
            }, n.resolve = r, e.exports = n, n.id = 5358
        },
        6441: (e, t, i) => {
            ! function(e) {
                var t = {
                        vertical: {
                            x: !1,
                            y: !0
                        },
                        horizontal: {
                            x: !0,
                            y: !1
                        },
                        both: {
                            x: !0,
                            y: !0
                        },
                        x: {
                            x: !0,
                            y: !1
                        },
                        y: {
                            x: !1,
                            y: !0
                        }
                    },
                    i = {
                        duration: "fast",
                        direction: "both"
                    },
                    o = /^(?:html)$/i,
                    n = function(t, i) {
                        i = i || (document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(t, null) : t.currentStyle);
                        var o = !(!document.defaultView || !document.defaultView.getComputedStyle),
                            n = {
                                top: parseFloat(o ? i.borderTopWidth : e.css(t, "borderTopWidth")) || 0,
                                left: parseFloat(o ? i.borderLeftWidth : e.css(t, "borderLeftWidth")) || 0,
                                bottom: parseFloat(o ? i.borderBottomWidth : e.css(t, "borderBottomWidth")) || 0,
                                right: parseFloat(o ? i.borderRightWidth : e.css(t, "borderRightWidth")) || 0
                            };
                        return {
                            top: n.top,
                            left: n.left,
                            bottom: n.bottom,
                            right: n.right,
                            vertical: n.top + n.bottom,
                            horizontal: n.left + n.right
                        }
                    },
                    r = function(t) {
                        var i, r = e(window),
                            a = o.test(t[0].nodeName);
                        return {
                            border: a ? {
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0
                            } : n(t[0]),
                            scroll: {
                                top: (a ? r : t).scrollTop(),
                                left: (a ? r : t).scrollLeft()
                            },
                            scrollbar: {
                                right: a ? 0 : t.innerWidth() - t[0].clientWidth,
                                bottom: a ? 0 : t.innerHeight() - t[0].clientHeight
                            },
                            rect: (i = t[0].getBoundingClientRect(), {
                                top: a ? 0 : i.top,
                                left: a ? 0 : i.left,
                                bottom: a ? t[0].clientHeight : i.bottom,
                                right: a ? t[0].clientWidth : i.right
                            })
                        }
                    };
                e.fn.extend({
                    scrollintoview: function(n) {
                        (n = e.extend({}, i, n)).direction = t["string" == typeof n.direction && n.direction.toLowerCase()] || t.both;
                        var a = "";
                        !0 === n.direction.x && (a = "horizontal"), !0 === n.direction.y && (a = a ? "both" : "vertical");
                        var s = this.eq(0),
                            l = s.closest(":scrollable(" + a + ")");
                        if (l.length > 0) {
                            l = l.eq(0);
                            var c = {
                                    e: r(s),
                                    s: r(l)
                                },
                                u = {
                                    top: c.e.rect.top - (c.s.rect.top + c.s.border.top),
                                    bottom: c.s.rect.bottom - c.s.border.bottom - c.s.scrollbar.bottom - c.e.rect.bottom,
                                    left: c.e.rect.left - (c.s.rect.left + c.s.border.left),
                                    right: c.s.rect.right - c.s.border.right - c.s.scrollbar.right - c.e.rect.right
                                },
                                h = {};
                            !0 === n.direction.y && (u.top < 0 ? h.scrollTop = c.s.scroll.top + u.top : u.top > 0 && u.bottom < 0 && (h.scrollTop = c.s.scroll.top + Math.min(u.top, -u.bottom))), !0 === n.direction.x && (u.left < 0 ? h.scrollLeft = c.s.scroll.left + u.left : u.left > 0 && u.right < 0 && (h.scrollLeft = c.s.scroll.left + Math.min(u.left, -u.right))), e.isEmptyObject(h) ? e.isFunction(n.complete) && n.complete.call(l[0]) : (o.test(l[0].nodeName) && (l = e("html,body")), l.animate(h, n.duration).eq(0).queue((function(t) {
                                e.isFunction(n.complete) && n.complete.call(l[0]), t()
                            })))
                        }
                        return this
                    }
                });
                var a = {
                    auto: !0,
                    scroll: !0,
                    visible: !1,
                    hidden: !1
                };
                e.extend(e.expr[":"], {
                    scrollable: function(e, i, n, r) {
                        var s = t["string" == typeof n[3] && n[3].toLowerCase()] || t.both,
                            l = document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(e, null) : e.currentStyle,
                            c = {
                                x: a[l.overflowX.toLowerCase()] || !1,
                                y: a[l.overflowY.toLowerCase()] || !1,
                                isRoot: o.test(e.nodeName)
                            };
                        if (!c.x && !c.y && !c.isRoot) return !1;
                        var u = {
                            height: {
                                scroll: e.scrollHeight,
                                client: e.clientHeight
                            },
                            width: {
                                scroll: e.scrollWidth,
                                client: e.clientWidth
                            },
                            scrollableX: function() {
                                return (c.x || c.isRoot) && this.width.scroll > this.width.client
                            },
                            scrollableY: function() {
                                return (c.y || c.isRoot) && this.height.scroll > this.height.client
                            }
                        };
                        return s.y && u.scrollableY() || s.x && u.scrollableX()
                    }
                })
            }(i(4692))
        },
        9910: (e, t, i) => {
            "use strict";
            var o = i(1635),
                n = i(4692),
                r = i(1786),
                a = i(3481),
                s = i(626),
                l = i(2543),
                c = i(5093),
                u = i(9336);

            function h(e, t) {
                return function(e, t) {
                    for (var i = e + ""; i.length < t;) i = "0" + i;
                    return i
                }(e, t)
            }
            r.bindingHandlers.tooltip = {
                init: function(e, t) {
                    r.utils.domNodeDisposal.addDisposeCallback(e, (function() {
                        var t = u.m_.getInstance(e);
                        t && t.dispose()
                    }))
                },
                update: function(e, t) {
                    var i = r.unwrap(t()),
                        o = r.toJS(i);
                    o && null === o.title && (o.title = "");
                    var n = u.m_.getInstance(e);
                    n ? (n.dispose(), new u.m_(e, o)) : new u.m_(e, o)
                }
            }, i(2885), i(1203), i(6441), Object.values || (Object.values = function(e) {
                return Object.keys(e).map((function(t) {
                    return e[t]
                }))
            });
            var d = function(e) {
                return "number" == typeof e && e === Number(e) && e !== 1 / 0 && e !== -1 / 0
            };

            function p(e, t) {
                return e < t ? -1 : t < e ? 1 : 0
            }

            function f(e, t) {
                if ("string" != typeof e || "string" != typeof e) return p(e, t);
                for (var i = 0, o = 0, n = 0, r = 0, a = 0; o < e.length && n < t.length;) {
                    for (var s = o, l = n; o < e.length && e[o] >= "0" && e[o] <= "9"; o++);
                    for (; n < t.length && t[n] >= "0" && t[n] <= "9"; n++);
                    var c = s === o,
                        u = l === n;
                    if (0 !== (i = p(c ? e[o] : "0", u ? t[n] : "0"))) break;
                    for (; s < e.length && "0" === e[s]; s++, r++);
                    for (; l < t.length && "0" === t[l]; l++, a++);
                    if (0 !== (i = p(o - s, n - l))) break;
                    for (; 0 === i && s < o && l < n;) i = p(e[s++], t[l++]);
                    if (0 !== i) break;
                    if (0 !== (i = p(r, a))) break;
                    o += c ? 1 : 0, n += u ? 1 : 0
                }
                return 0 === i && (i = p(e.length - o, t.length - n)), i
            }

            function m(e, t) {
                return -(e.priority() - t.priority())
            }

            function g(e, t) {
                switch (t.messagePriorityStrategy) {
                    default:
                    case v.None:
                        break;
                    case v.Priority:
                        var i = e.reduce((function(e, t) {
                            return Math.max(t.priority(), e)
                        }), null);
                        e = e.filter((function(e) {
                            return e.priority() === i
                        }))
                }
                return e
            }
            c.duration.fn.units = {
                seconds: /s/,
                minutes: /m/,
                hours: /H/
            }, c.duration.fn.customFormatTokens = {
                MaybeTotalHours: {
                    regex: /\[HHH:\]/g,
                    value: function(e) {
                        return e.asHours() > 1 ? Math.floor(e.asHours()) + ":" : ""
                    }
                },
                TotalHours: {
                    regex: /HHH/g,
                    value: function(e) {
                        return Math.floor(e.asHours())
                    }
                },
                MaybeTotalMinutes: {
                    regex: /\[mmm:\]/g,
                    value: function(e) {
                        return e.asMinutes() > 1 ? Math.floor(e.asMinutes()) + ":" : ""
                    }
                },
                TotalMinutes: {
                    regex: /mmm/g,
                    value: function(e) {
                        return Math.floor(e.asMinutes())
                    }
                },
                Minutes: {
                    regex: /mm/g,
                    value: function(e) {
                        return h(e.minutes(), 2)
                    }
                },
                MaybeTotalSeconds: {
                    regex: /\[sss:\]/g,
                    value: function(e) {
                        return e.asMinutes() > 1 ? Math.floor(e.asMinutes()) + ":" : ""
                    }
                },
                TotalSeconds: {
                    regex: /sss/g,
                    value: function(e) {
                        return Math.floor(e.asSeconds())
                    }
                },
                Seconds: {
                    regex: /ss/g,
                    value: function(e) {
                        return h(e.seconds(), 2)
                    }
                }
            }, c.duration.fn.formatI4m = function(e) {
                var t = null;
                for (var i in c.duration.fn.units)
                    if ((r = c.duration.fn.units[i]).test(e)) {
                        t = i;
                        break
                    } var o = this;
                t && (o = c.duration(Math.round(this.as(t)), t));
                var n = e;
                for (var i in c.duration.fn.customFormatTokens) {
                    var r;
                    if ((r = c.duration.fn.customFormatTokens[i]).regex.test(n)) {
                        var a = r.value(o);
                        n = n.replace(r.regex, a)
                    }
                }
                return n
            };
            var v, b = function() {
                    function e(e, t) {
                        this.invocations = [], this.settingsNow = {
                            time: 30
                        }, this.settingsRelative = {
                            time: null
                        }, this.config = e, this.model = t, this.parse(this.config)
                    }
                    return e.prototype.reset = function() {
                        this.invocations = [], this.settingsNow = {
                            time: 30
                        }, this.settingsRelative = {
                            time: null
                        }
                    }, e.prototype.parse = function(e) {
                        var t = this;
                        this.reset();
                        var i = e.formatForecastTime;
                        for (var o in i) {
                            var n = i[o],
                                r = n;
                            switch (n.type.toLowerCase()) {
                                case "forecastnow":
                                    var a = this.settingsNow;
                                    r && r.time && (a.time = c.duration(r.time).asSeconds());
                                    var s = function(e) {
                                        return t.tryNowTime(e)
                                    };
                                    this.invocations.push(s);
                                    break;
                                case "absolutetime":
                                    s = function(e) {
                                        return t.tryAbsoluteForecastTime(e)
                                    }, this.invocations.push(s);
                                    break;
                                case "relativetime":
                                    a = this.settingsRelative, r && r.time && (a.time = c.duration(r.time).asSeconds()), s = function(e) {
                                        return t.tryRelativeForecastTime(e)
                                    }, this.invocations.push(s);
                                    break;
                                default:
                                    var l = "Unknown type: " + n.Type;
                                    throw console.error(l), l
                            }
                        }
                        return this.invocations
                    }, e.prototype.formatTime = function(e) {
                        if (e.isCancelled) return this.model.viewModel.textCancelled();
                        for (var t in this.invocations) {
                            var i = (0, this.invocations[t])(e);
                            if (i && i.success) return i.time
                        }
                        return ""
                    }, e.prototype.absoluteTime = function(e) {
                        return e.format(this.model.config.formatAbsoluteTime)
                    }, e.prototype.relativetime = function(e) {
                        return e.formatI4m(this.model.config.formatRelativeTime)
                    }, e.prototype.tryNowTime = function(e) {
                        return e.isRealtime && this.settingsNow.time && e.duration.asSeconds() <= this.settingsNow.time ? {
                            success: !0,
                            time: this.model.viewModel.textNow()
                        } : {
                            success: !1,
                            time: null
                        }
                    }, e.prototype.tryAbsoluteForecastTime = function(e) {
                        return e.datetime ? {
                            success: !0,
                            time: this.absoluteForecastTime(e)
                        } : {
                            success: !1,
                            time: null
                        }
                    }, e.prototype.absoluteForecastTime = function(e) {
                        var t = this.absoluteTime(e.datetime);
                        return !e.isRealtime && this.model.config.useNonForcastIndicator && (t = this.model.viewModel.textCa() + " " + t), t
                    }, e.prototype.tryRelativeForecastTime = function(e) {
                        return !this.settingsRelative.time || e.duration.asSeconds() <= this.settingsRelative.time ? {
                            success: !0,
                            time: this.relativeForecastTime(e)
                        } : {
                            success: !1,
                            time: null
                        }
                    }, e.prototype.relativeForecastTime = function(e) {
                        var t = this.relativetime(e.duration) + " " + this.model.viewModel.textMin();
                        return !e.isRealtime && this.model.config.useNonForcastIndicator && (t = this.model.viewModel.textCa() + " " + t), t
                    }, e
                }(),
                y = function() {
                    function e() {
                        var e = this;
                        this.background = r.observable(""), this.foreground = r.observable(""), this.fontStyle = r.observable(""), this.cssStyle = r.pureComputed((function() {
                            var t = {},
                                i = e.cssStyleFont();
                            return i && (t = Object.assign(t, i)), e.background() && (t = Object.assign(t, {
                                "background-color": e.background()
                            })), e.foreground() && (t = Object.assign(t, {
                                color: e.foreground()
                            })), t
                        })), this.cssStyleFont = r.pureComputed((function() {
                            var t = {};
                            switch (e.fontStyle().toLowerCase()) {
                                case "bold":
                                    t = Object.assign(t, {
                                        "font-weight": "bold"
                                    });
                                    break;
                                case "italic":
                                    t = Object.assign(t, {
                                        "font-style": "italic"
                                    })
                            }
                            return t
                        })), this.clear()
                    }
                    return e.prototype.update = function(e) {
                        this.background(e.background), this.foreground(e.foreground), this.fontStyle(e.fontStyle)
                    }, e.prototype.clear = function() {
                        this.background(""), this.foreground(""), this.fontStyle("")
                    }, e
                }(),
                w = function() {
                    function e() {
                        this.latitude = r.observable(null), this.longitude = r.observable(null)
                    }
                    return e.prototype.update = function(e) {
                        this.latitude(e.lat), this.longitude(e.lon)
                    }, e.prototype.toLeaflet = function() {
                        return a.latLng(this.latitude(), this.longitude())
                    }, e
                }(),
                x = function(e) {
                    function t() {
                        var t = null !== e && e.apply(this, arguments) || this;
                        return t.id = r.observable(null), t.displayName = r.observable(null), t.classes = r.observable([]), t
                    }
                    return (0, o.C6)(t, e), t.prototype.update = function(t) {
                        e.prototype.update.call(this, t), this.id(t.id), this.displayName(t.displayName), this.classes(t.classes)
                    }, t
                }(function() {
                    function e() {
                        this.timestamp = r.observable(null), this.heading = r.observable(null), this.location = r.observable(null)
                    }
                    return e.prototype.update = function(e) {
                        this.timestamp(e.timestamp), this.heading(e.heading), this.location(null), e.location && (this.location(new w), this.location().update(e.location))
                    }, e
                }()),
                S = function() {
                    function e() {
                        this.id = r.observable(0), this.text = r.observable("")
                    }
                    return e.prototype.update = function(e) {
                        this.id(e.id), this.text(e.text)
                    }, e
                }(),
                C = function() {
                    function e() {
                        this.id = r.observable(0), this.text = r.observable(""), this.location = r.observable(null)
                    }
                    return e.prototype.update = function(e) {
                        if (this.id(e.id), this.text(e.text), this.location(null), e.location) {
                            var t = new w;
                            t.update(e.location), this.location(t)
                        }
                    }, e
                }(),
                A = function() {
                    function e() {
                        this.id = r.observable(0), this.text = r.observable("")
                    }
                    return e.prototype.update = function(e) {
                        this.id(e.id), this.text(e.text)
                    }, e
                }();
            ! function(e) {
                e.None = "none", e.Priority = "priority"
            }(v || (v = {}));
            var T, M = function() {
                    function e() {
                        var e = this;
                        this.id = r.observable(0), this.text = r.observable(""), this.priority = r.observable(null), this.lines = r.observableArray([]), this.AffectedCalls = r.observableArray([]), this.isDisturbance = r.observable(!1), this.isInfo = r.observable(!1), this.getIconClass = r.pureComputed((function() {
                            return e.isDisturbance() ? "icon-exclamation" : "icon-image-exclam-minor"
                        })), this.getDisturbanceColors = r.pureComputed((function() {
                            return e.isDisturbance() ? "disturbance-color" : ""
                        }))
                    }
                    return e.prototype.update = function(e) {
                        this.id(e.id), this.text(e.text), this.priority(e.priority), this.isDisturbance(e.isDisturbance), this.isInfo(e.isInfo);
                        var t = [];
                        e.affectedCalls.forEach((function(e) {
                            t.push(e)
                        })), this.AffectedCalls(t), this.lines([])
                    }, e
                }(),
                L = function() {
                    this.lineId = r.observable(0), this.lineName = r.observable(""), this.lineAppearance = r.observable(new y)
                };
            ! function(e) {
                e.Undefined = "Undefined", e.Normal = "Normal", e.Extra = "Extra"
            }(T || (T = {}));
            var k, j = function() {
                    function e(e) {
                        this.PlannedTime = r.observable(c(0)), this.ForecastTime = r.observable(c(0)), this.ForecastType = r.observable(""), this.Quality = r.observable(""), this.Attributes = r.observableArray([]), this.JourneyType = r.observable(T.Undefined), this.VehicleType = r.observable(""), this.Designation = r.observable(""), this.OccupancyPercent = r.observable(null), this.call = e
                    }
                    return e.prototype.update = function(e) {
                        this.PlannedTime(c(e.forecastTime)), this.ForecastTime(c(e.plannedTime)), this.Quality(e.quality), this.Attributes(e.attributes);
                        var t = T.Undefined;
                        if ("string" == typeof e.journeyType) switch (e.journeyType.toLowerCase()) {
                            case "extra":
                            case "reinforcement":
                                t = T.Extra;
                                break;
                            default:
                                t = T.Normal
                        }
                        this.JourneyType(t), this.VehicleType(e.vehicleType), this.Designation(e.designation), this.OccupancyPercent(d(e.occupancyPercent) ? e.occupancyPercent : null)
                    }, e
                }(),
                D = function() {
                    function e(e, t) {
                        var i = this;
                        this.Key = r.observable(""), this.CurrentForecast = r.pureComputed((function() {
                            return i.Departure()
                        })), this.Arrival = r.observable(null), this.Departure = r.observable(null), this.row = e, this.model = t
                    }
                    return e.prototype.update = function(e) {
                        var t;
                        this.Key(e.key), e.arrival ? (null == (t = this.Arrival()) && ((t = new j(this)).ForecastType("arrival"), this.Arrival(t)), t.update(e.arrival)) : this.Arrival(null), e.departure ? (null == (t = this.Departure()) && ((t = new j(this)).ForecastType("departure"), this.Departure(t)), t.update(e.departure)) : this.Departure(null)
                    }, e
                }(),
                N = function() {
                    function e(e, t) {
                        var i = this;
                        this.Calls = r.observableArray([]), this.NextCall = this.GetCall(0), this.AfterCall = this.GetCall(1), this.getRowDisturbances = r.pureComputed((function() {
                            var e = [];
                            if (i.model.viewModel.newTableMessagesAtTop()) return e;
                            var t = i.GetCall(0),
                                o = i.GetCall(1);
                            if (!t && !o) return e;
                            e = (e = i.model.viewModel.messages().filter((function(e) {
                                return e.AffectedCalls().length > 0
                            }))).filter((function(e) {
                                var i, n;
                                return e.AffectedCalls().includes(null === (i = t()) || void 0 === i ? void 0 : i.Key()) || e.AffectedCalls().includes(null === (n = o()) || void 0 === n ? void 0 : n.Key())
                            }));
                            var n = i.model.viewModel.calls().reduce((function(e, t) {
                                return e + t.Calls().length
                            }), 0);
                            return 1 != n && (e = e.filter((function(e) {
                                return e.AffectedCalls().length !== n
                            }))), e.sort(m), g(e, i.model.config)
                        })), this.getDisturbanceColor = function(e) {
                            if (i.model.viewModel.newTableMessagesAtTop()) return "";
                            var t = i.GetCall(e);
                            if (!t) return "";
                            var o = i.model.viewModel.messages().filter((function(e) {
                                    var i;
                                    return e.AffectedCalls().length > 0 && e.AffectedCalls().includes(null === (i = t()) || void 0 === i ? void 0 : i.Key())
                                })),
                                n = i.model.viewModel.calls().reduce((function(e, t) {
                                    return e + t.Calls().length
                                }), 0),
                                r = o.every((function(e) {
                                    return e.AffectedCalls().length === n
                                }));
                            return o.length > 0 && !r ? "disturbance-color center-text-override rounded-corners bold" : ""
                        }, this.getNextDisturbanceColors = r.pureComputed((function() {
                            return i.getDisturbanceColor(0)
                        })), this.getAfterDisturbanceColors = r.pureComputed((function() {
                            return i.getDisturbanceColor(1)
                        })), this.Next = r.observable(""), this.NextHhMm = r.observable(""), this.After = r.observable(""), this.AfterHhMm = r.observable(""), this.RowLabel = r.pureComputed((function() {
                            switch (i.model.config.rowLabel) {
                                case "Line":
                                    return i.Line();
                                case "Journey":
                                    return i.Journey()
                            }
                            return ""
                        })), this.CallId = r.observable(""), this.RouteId = r.observable(0), this.JourneyId = r.observable(0), this.LineId = r.observable(0), this.Journey = r.observable(""), this.Line = r.observable(""), this.LineAppearance = r.observable(new y), this.Dest = r.observable(""), this.Subdest = r.observable(""), this.SubdestText = r.pureComputed((function() {
                            var e = i.NextCall();
                            if (!e) return i.Subdest();
                            var t = e.CurrentForecast();
                            if (!t) return i.Subdest();
                            var o = i.model.viewModel.frameStateMap.get(z.Destination);
                            if (null == o) return i.Subdest();
                            var n = o.frame();
                            if (null == n) return i.Subdest();
                            var r = J[n.template.toLowerCase()],
                                a = t.JourneyType() == T.Extra,
                                s = null;
                            switch (a && (s = i.model.translationModel.getTranslation("textReinforcement", {
                                    row: i
                                })()), r) {
                                case U.Reinforcement:
                                    if (a) return s;
                                case U.Default:
                                default:
                                    return i.Subdest() || s
                            }
                        })), this.NextWheelchairAdapted = r.observable(!1), this.AfterWheelchairAdapted = r.observable(!1), this.NextRealtime = r.observable(!1), this.NextAttr = r.computed((function() {
                            return i.NextWheelchairAdapted() || i.NextRealtime()
                        })), this.NextAttrImgSrc = r.pureComputed((function() {
                            return i.NextWheelchairAdapted() ? i.model.viewModel.iconWheelchair() : i.NextRealtime() ? i.model.viewModel.iconRealtime() : i.model.viewModel.iconHash()
                        })), this.NextCss = r.pureComputed((function() {
                            return i.NextForecastQualityCss().trim()
                        })), this.NextForecastQualityCss = r.pureComputed((function() {
                            var e = "";
                            return i.IsNextCancelled() ? e = "fc-quality-cancelled" : i.NextRealtime() ? e = "fc-quality-realtime" : i.Next() && (e = "fc-quality-timetable"), e || (e = "fc-quality-nodata"), e
                        })), this.NextDeparture = r.observable(c(0)), this.IsNextCancelled = r.observable(!1), this.IsAfterRealtime = r.observable(!1), this.AfterDeparture = r.observable(null), this.CreatedTime = r.observable(c(0)), this.IsAfterCancelled = r.observable(!1), this.AfterAttr = r.computed((function() {
                            return i.AfterWheelchairAdapted() || i.IsAfterRealtime()
                        })), this.AfterAttrImgSrc = r.pureComputed((function() {
                            return i.AfterWheelchairAdapted() ? i.model.viewModel.iconWheelchair() : i.IsAfterRealtime() ? i.model.viewModel.iconRealtime() : i.model.viewModel.iconHash()
                        })), this.AfterCss = r.pureComputed((function() {
                            return i.AfterForecastQualityCss().trim()
                        })), this.AfterForecastQualityCss = r.pureComputed((function() {
                            var e = "";
                            return i.IsAfterCancelled() ? e = "fc-quality-cancelled" : i.IsAfterRealtime() ? e = "fc-quality-realtime" : i.After() && (e = "fc-quality-timetable"), e || (e = "fc-quality-nodata"), e
                        })), this.OccupancyPercentageNext = r.pureComputed((function() {
                            return i.getOccupancyPercentage("NextCall")
                        })), this.OccupancyPercentageAfter = r.pureComputed((function() {
                            return i.getOccupancyPercentage("AfterCall")
                        })), this.OccupancyConfiguration = r.pureComputed((function() {
                            return i.getOccupancyConfiguration(i.OccupancyPercentageNext())
                        })), this.OccupancyConfigurationAfter = r.pureComputed((function() {
                            return i.getOccupancyConfiguration(i.OccupancyPercentageAfter())
                        })), this.OccupancyImgSrc = r.pureComputed((function() {
                            return i.getResourceSrc("OccupancyConfiguration", "imageKey")
                        })), this.OccupancyAfterImgSrc = r.pureComputed((function() {
                            return i.getResourceSrc("OccupancyConfigurationAfter", "imageKey")
                        })), this.ShowOccupancy = r.pureComputed((function() {
                            return !!i.OccupancyImgSrc()
                        })), this.ShowOccupancyAfter = r.pureComputed((function() {
                            return !!i.OccupancyAfterImgSrc()
                        })), this.OccupancyImgAlt = r.pureComputed((function() {
                            return i.getResourceSrc("OccupancyConfiguration", "labelKey")
                        })), this.OccupancyAfterImgAlt = r.pureComputed((function() {
                            return i.getResourceSrc("OccupancyConfigurationAfter", "labelKey")
                        })), this.OccupancyTooltipTitle = r.computed((function() {
                            return i.ShowOccupancy() ? i.model.viewModel.size() !== Q.Normal ? null : function() {
                                var e = r.dataFor(this);
                                return e ? e.model.viewModel.tooltip(this) : null
                            } : null
                        })), this.IsDirty = r.observable(!1), this.IsExpanded = r.observable(!1), this.StopAreaNumber = r.observable(""), this.NextStopAreaNumber = r.observable(""), this.Id = e, this.model = t
                    }
                    return e.prototype.GetCall = function(e) {
                        var t = this;
                        return r.pureComputed((function() {
                            return t.Calls()[e]
                        }), this)
                    }, e.prototype.getOccupancyPercentage = function(e) {
                        var t = this[e]();
                        if (!t) return null;
                        var i = t.CurrentForecast();
                        return i ? i.OccupancyPercent() : null
                    }, e.prototype.getOccupancyConfiguration = function(e) {
                        if (!d(e)) return null;
                        for (var t = null, i = 0, o = this.model.config.occupancy.levels; i < o.length; i++) {
                            var n = o[i],
                                r = !0;
                            if (d(n.from) && (r = r && n.from <= e), d(n.to) && (r = r && e <= n.to), r) {
                                t = n;
                                break
                            }
                        }
                        return t
                    }, e.prototype.getResourceSrc = function(e, t) {
                        var i = this[e]();
                        return i ? "imageKey" === t ? this.model.resourceModel.getResource(i.imageKey)() : "labelKey" === t ? this.model.translationModel.getTranslation(i.labelKey)() : void 0 : null
                    }, e
                }(),
                I = function() {
                    function e() {
                        this.configLoaded = !1, this.pageLoaded = !1, this.profileLoaded = !1, this.themeLoaded = !1, this.callbacks = []
                    }
                    return e.prototype.onUpdate = function() {
                        for (var e = 0; e < this.callbacks.length; e++) this.callbacks[e](this) && this.callbacks.splice(e--, 1);
                        0 === this.callbacks.length && console.log("startup complete")
                    }, e.prototype.addOnUpdate = function(e) {
                        this.callbacks.push(e), this.onUpdate()
                    }, e
                }(),
                O = function() {
                    this.baseUri = ""
                },
                _ = function() {
                    this.centerLat = 0, this.centerLon = 0, this.maxCount = 100, this.maxDistance = 750, this.zoom = null, this.minZoom = null, this.tilesUrl = "", this.tilesOptions = {}, this.renderer = ""
                },
                R = function() {
                    this.showOccupancy = r.observable(!0), this.showExpander = r.observable(!0), this.showStopAreaNumber = r.observable(!1)
                },
                P = function() {
                    function e() {
                        this.frameMap = new Map
                    }
                    return e.parse = function(t) {
                        var i = new e;
                        if (!t) return i;
                        if (t.destination) {
                            for (var o = [], n = 0, r = 0, a = t.destination; r < a.length; r++) {
                                var s = a[r],
                                    l = H.parse(s);
                                l.index = n++, o.push(l)
                            }
                            i.frameMap.set(z.Destination, o)
                        }
                        return i
                    }, e
                }(),
                F = function() {
                    function e() {
                        this.levels = []
                    }
                    return e.parse = function(t) {
                        var i = new e;
                        if (!t) return i;
                        if (t.levels) {
                            for (var o = [], n = 0, r = 0, a = t.levels; r < a.length; r++) {
                                var s = a[r],
                                    l = V.parse(s);
                                l.index = n++, o.push(l)
                            }
                            i.levels = o
                        }
                        return i
                    }, e
                }(),
                V = function() {
                    function e() {
                        this.index = 1, this.from = null, this.to = null, this.imageKey = "", this.labelKey = "", this.descriptionKey = ""
                    }
                    return e.parse = function(t) {
                        if (!t) return null;
                        var i = new e;
                        return i.from = t.from, i.to = t.to, i.imageKey = t.image, i.labelKey = t.label, i.descriptionKey = t.description, i
                    }, e
                }(),
                H = function() {
                    function e() {
                        this.index = 1, this.seconds = 1, this.template = "default"
                    }
                    return e.parse = function(t) {
                        if (!t) return null;
                        var i = new e;
                        return i.seconds = t.seconds, i.template = t.template, i
                    }, e
                }();
            ! function(e) {
                e[e.Normal = 0] = "Normal", e[e.Detailed = 1] = "Detailed"
            }(k || (k = {}));
            var z, U, E = function() {
                    function e() {
                        this.id = "", this.title = "", this.latlng = null, this.marker = null, this.iconDetailed = null, this.iconNormal = null, this.iconType = k.Normal, this.heading = null
                    }
                    return e.prototype.updatePosition = function(e) {
                        this.latlng = e.location().toLeaflet(), this.marker.setLatLng(this.latlng)
                    }, e.prototype.updateHeading = function(e) {
                        e && null != e.heading() ? (this.heading = this.rotateHeading(this.heading, e.heading()), this.vehicleArrowImg.style.display = "block", this.vehicleArrowImg.style.transform = "rotate(" + Math.round(this.heading) + "deg)") : (this.vehicleArrowImg.style.display = "none", this.heading = null)
                    }, e.prototype.rotateHeading = function(e, t) {
                        var i = t;
                        if (null == t || isNaN(t)) return i;
                        if (t = Math.round(t), null == e || isNaN(e)) return i;
                        var o = Math.floor(e / 360),
                            n = e % 360;
                        return n < 0 && (n += 360), n - t > 180 ? 360 * (o + 1) + t : t - n > 180 ? 360 * (o - 1) + t : 360 * (o + 0) + t
                    }, e
                }(),
                G = function() {
                    function e() {
                        this.polyline = null, this.polylineDirection = null
                    }
                    return e.prototype.addTo = function(e) {
                        this.polyline.addTo(e), this.polylineDirection.addTo(e)
                    }, e.prototype.removeFrom = function(e) {
                        this.polyline.removeFrom(e), this.polylineDirection.removeFrom(e)
                    }, e.prototype.getBounds = function() {
                        return this.polyline.getBounds()
                    }, e
                }(),
                W = function() {
                    function e() {
                        var e = this;
                        this.fromStopAreaQuery = r.observable(""), this.toStopAreaQuery = r.observable(""), this.lineId = r.observable(0), this.directionId = r.observable(0), this.callLineDest = r.observable(""), this.hasData = r.pureComputed((function() {
                            var t = !1;
                            return !!(t = (t = (t = (t = (t = t || !!e.fromStopAreaQuery()) || !!e.toStopAreaQuery()) || !!e.lineId()) || !!e.directionId()) || !!e.callLineDest())
                        }))
                    }
                    return e.prototype.updateUri = function() {
                        var e = {};
                        this.fromStopAreaQuery() && (e.f = this.fromStopAreaQuery()), this.toStopAreaQuery() && (e.t = this.toStopAreaQuery()), this.lineId() && (e.l = this.lineId()), this.directionId() && (e.d = this.directionId()), this.callLineDest() && (e.c = this.callLineDest());
                        var t = "#" + n.param(e);
                        window.history.pushState(null, null, t), n(window).trigger("pathchange")
                    }, e.prototype.setFromUri = function() {
                        var e, t = (e = window.location.hash) ? e.replace(/(^\#)/, "").split("&").map(function(e, t, i) {
                            return i[(e = e.split("="))[0]] = decodeURIComponent(e[1].replace(/\+/g, "%20")), i
                        }.bind({}))[0] : {};
                        t.hasOwnProperty("f") && this.fromStopAreaQuery(t.f), t.hasOwnProperty("t") && this.toStopAreaQuery(t.t), t.hasOwnProperty("l") && this.lineId(t.l), t.hasOwnProperty("d") && this.directionId(t.d), t.hasOwnProperty("c") && this.callLineDest(t.c)
                    }, e
                }(),
                B = a.Control.extend({
                    onAdd: function(e) {
                        var t = a.DomUtil.create("a");
                        return t.textContent = "X", t.style.cursor = "pointer", t
                    },
                    onRemove: function(e) {}
                });
            ! function(e) {
                e[e.Destination = 0] = "Destination"
            }(z || (z = {})),
            function(e) {
                e[e.Default = 0] = "Default", e[e.Reinforcement = 1] = "Reinforcement"
            }(U || (U = {}));
            var Q, q, J = Object.values(U).filter((function(e) {
                    return "string" == typeof e
                })).reduce((function(e, t) {
                    return e[t.toString().toLowerCase()] = U[t], e
                }), {}),
                K = function() {
                    this.startTick = null, this.frame = r.observable(null)
                },
                Y = function() {
                    function e() {
                        this.resources = r.observable(null)
                    }
                    return e.prototype.setSource = function(e) {
                        this.resources(e)
                    }, e.prototype.getResource = function(e, t) {
                        var i = this;
                        return void 0 === t && (t = null), r.pureComputed((function() {
                            return i.internalGetTranslation(i.resources(), e, t)
                        }))
                    }, e.prototype.internalGetTranslation = function(e, t, i) {
                        var o = null;
                        return t ? (o || e[t] && (o = e[t]), o) : null
                    }, e
                }(),
                Z = function() {
                    function e() {
                        this.translations = r.observable(null)
                    }
                    return e.prototype.setSource = function(e) {
                        this.translations(e)
                    }, e.prototype.getTranslation = function(e, t) {
                        var i = this;
                        return void 0 === t && (t = null), r.pureComputed((function() {
                            return i.internalGetTranslation(i.translations(), e, t)
                        }))
                    }, e.prototype.internalGetTranslation = function(e, t, i) {
                        var o = null;
                        if (!t) return null;
                        if (i) {
                            if (!o && i.forecast && i.forecast instanceof j) {
                                var n = i.forecast;
                                if (e.VehicleType) {
                                    var r = n.VehicleType();
                                    e.VehicleType[r] && e.VehicleType[r][t] && (o = e.VehicleType[r][t])
                                }
                            }
                            if (!o && i.row && i.row instanceof N) {
                                var a = i.row;
                                e.VehicleType && (r = a.NextCall().CurrentForecast().VehicleType(), e.VehicleType[r] && e.VehicleType[r][t] && (o = e.VehicleType[r][t]))
                            }
                        }
                        return o || e[t] && (o = e[t]), o
                    }, e
                }(),
                X = function() {
                    function e(e) {
                        var t = this;
                        this.size = r.observable(Q.Normal), this.totalTicks = 0, this.frameStateMap = new Map, this.elapsedSeconds = 0, this.TIMEOUT_INTERVAL_SECONDS = 15, this.selectedRow = null, this.selectedMapRoute = null, this.systemDateTimeOffset = 0, this.mqListMedium = window.matchMedia("(min-width: 768px)"), this.mqListLarge = window.matchMedia("(min-width: 992px)"), this.showVehicleLocations = !1, this.showAllStopsCancelledText = r.observable(!1), this.searchMap = null, this.searchMapStopAreaMarkers = [], this.resultMap = null, this.currentPosMarker = null, this.vehicleMarker = null, this.searchParameters = r.observable(null), this.isLoadingResultList = r.observable(!1), this.year = (new Date).getFullYear(), this.calls = r.observableArray(), this.header = r.pureComputed((function() {
                            return t.searchParameters() && t.searchParameters().hasData() ? t.resultStopArea() ? t.resultStopArea().text() : "" : t.textPleaseDefineYourSearch()
                        })), this.messages = r.observableArray(), this.messagesWithoutAffected = r.pureComputed((function() {
                            var e = t.messages();
                            if (t.useNewTable() && !t.newTableMessagesAtTop()) {
                                var i = t.calls().reduce((function(e, t) {
                                    return e + t.Calls().length
                                }), 0);
                                if (1 == i) return e.filter((function(e) {
                                    return e.isInfo() && 0 == e.AffectedCalls().length
                                }));
                                e = e.filter((function(e) {
                                    return e.AffectedCalls().length === i || e.isInfo() && 0 == e.AffectedCalls().length
                                }))
                            }
                            return e.sort(m), g(e, t.model.config)
                        })), this.resultStopArea = r.observable(null), this.resultMapStopAreaMarker = r.observable(null), this.lines = r.observableArray(), this.selectedLine = r.observable(), this.directions = r.observableArray(), this.selectedDirection = r.observable(), this.stopPoints = r.observableArray([]), this.selectedStopPoint = r.observable(), this.useDirection = r.observable(!1), this.useNewTable = r.observable(!1), this.newTableMessagesAtTop = r.observable(!1), this.displayRowMapExpanded = r.observable(!1), this.hideRouteStopSelection = r.observable(!1), this.isCallListFocused = r.observable(!1), this.top_pushpin = r.observable(""), this.logo = r.observable(""), this.logo_top = r.observable(""), this.hrefCustomer = r.observable(""), this.iconWheelchair = r.observable(""), this.iconRealtime = r.observable(""), this.iconHash = r.observable("#"), this.ariaHasSuggestionPopup = r.observable(!1), this.tableDetailsShowNext = r.observable(!0), this.tableDetailsShowAfter = r.observable(!0), this.tableDetailsShowMap = r.observable(!0), this.tableDetailsShowOccupancyLegend = r.observable(!0), this.textRowLabelHeader = r.pureComputed((function() {
                            switch (t.model.config.rowLabel) {
                                case "Line":
                                    return t.textLine();
                                case "Journey":
                                    return t.textJourney()
                            }
                            return ""
                        })), this.textAllStopsCancelledString = r.observable(""), this.textSelectYourStop = r.observable(""), this.textDoYouKnowStop = r.observable(""), this.textUseGPS = r.observable(""), this.textStopNameOrNumber = r.observable(""), this.textChooseLineStop = r.observable(""), this.textChooseLineDirectionStop = r.observable(""), this.textGetChooseHeader = r.pureComputed((function() {
                            return t.useDirection() ? t.textChooseLineDirectionStop() : t.textChooseLineStop()
                        })), this.textDirection = r.observable(""), this.textDestination = r.observable(""), this.textOccupancy = r.observable(""), this.textLine = r.observable(""), this.textJourney = r.observable(""), this.textStop = r.observable(""), this.textSelectLine = r.observable(""), this.textSelectDirection = r.observable(""), this.textLoadingDirection = r.observable(""), this.textSelectStop = r.observable(""), this.textLoadingStop = r.observable(""), this.textNext = r.observable(""), this.textStopAreaNumber = r.observable(""), this.textNextDepartureIn = r.observable(""), this.textOr = r.observable(""), this.textAfter = r.observable(""), this.textMin = r.observable(""), this.textViewLiveMap = r.observable(""), this.textCopyright = r.observable(""), this.htmlPoweredBy = r.observable(""), this.textNoDataFound = r.observable(""), this.textLiveBusTimes = r.observable(""), this.textCancelled = r.observable(""), this.textNoFollowingDeparture = r.observable(""), this.textCa = r.observable(""), this.textNow = r.observable(""), this.textFailedGpsLocation = r.observable(""), this.textAriaLabelGps = r.observable(""), this.textAriaLabelSearch = r.observable(""), this.textAriaOr = r.observable(""), this.textPleaseDefineYourSearch = r.observable(""), this.vehicleLocationMarkers = [], this.secToLocationUpdate = -1, this.selectRow = function(e, i) {
                            t.selectedRow = e, t.resultMap && (a.DomUtil.remove(t.resultMap.getContainer()), t.resultMap.remove(), t.resultMap = void 0), t.searchParameters().callLineDest("");
                            for (var o = t.calls().length, n = 0; n < o; n++) {
                                var r = t.calls()[n];
                                r.Id !== e.Id ? r.IsExpanded(!1) : (t.useNewTable() && t.toggleCollapse(e, n), r.IsExpanded() && t.displayRowMapExpanded() && (t.toggleShowOnMap(e, n), t.searchParameters().callLineDest(e.Line() + "-" + e.Dest())))
                            }
                            return t.searchParameters().updateUri(), t.callresize(), !0
                        }, this.compareRows = function(e, i) {
                            for (var o = 0, n = 0; n < t.model.config.rowOrder.length && 0 === o; n++) switch (t.model.config.rowOrder[n]) {
                                case "Line":
                                    o = f(e.Line(), i.Line());
                                    break;
                                case "Journey":
                                    o = f(e.Journey(), i.Journey());
                                    break;
                                case "Destination":
                                    o = f(e.Dest(), i.Dest());
                                    break;
                                case "Time":
                                    o = p(e.NextDeparture(), i.NextDeparture())
                            }
                            return o
                        }, this.gpsLocation = function(e, i) {
                            n("#GpsButton").wait(), t.clearAllSearchMapStopAreaMarkers(), null === t.currentPosMarker ? t.currentPosMarker = a.marker(a.latLng(e, i), {
                                title: "You are here",
                                icon: a.icon({
                                    iconUrl: "assets/img/youAreHereIcon136.png",
                                    iconSize: [64, 64],
                                    iconAnchor: [32, 64]
                                })
                            }).addTo(t.searchMap) : t.currentPosMarker.setLatLng(a.latLng(e, i)), t.searchMap.setView([e, i], 16), t.findStopsNearLocation()
                        }, this.gpsLocationSuccess = function(e) {
                            t.gpsLocation(e.coords.latitude, e.coords.longitude)
                        }, this.gpsLocationError = function(e) {
                            console.log("failed gpsLocation(" + e.code + "): " + e.message), alert(t.textFailedGpsLocation()), t.gpsLocation(t.model.config.map.centerLat, t.model.config.map.centerLon)
                        }, this.handleCalls = function(e, i) {
                            if (t.calls([]), t.updateCalls(e, i), t.isCallListFocused(!0), t.mqListMedium.matches && n("#resulty").scrollintoview({
                                    duration: "normal"
                                }), t.displayRowMapExpanded() && t.calls().length > 0) {
                                var o = t.calls()[0],
                                    r = t.searchParameters().callLineDest();
                                if (r.length > 0) {
                                    var a = l.findIndex(t.calls(), (function(e) {
                                        return r.startsWith(e.Line()) && "-" === r[e.Line().length] && r.endsWith(e.Dest())
                                    })); - 1 === a && (a = l.findIndex(t.calls(), (function(e) {
                                        return r.endsWith(e.Dest())
                                    }))), -1 === a && (a = l.findIndex(t.calls(), (function(e) {
                                        return r.startsWith(e.Line()) && "-" === r[e.Line().length]
                                    }))), a >= 0 && (o = t.calls()[a])
                                }
                                t.selectRow(o.IsExpanded(!0), null)
                            }
                        }, this.updateCalls = function(e, i) {
                            if (i && i.calls)
                                for (var o = i.calls.length, n = 0; n < o; n++) {
                                    var r = i.calls[n],
                                        a = t.findKoCall(r.id);
                                    a || (a = new N(r.id, t.model), n < t.calls().length ? t.calls.insertAt(n, a) : t.calls.push(a)), t.updateCall(a, r), t.updateCallFormat(a), a.IsDirty(!0)
                                }
                            t.purgeCalls();
                            var s = [];
                            if (i && i.messages) {
                                var l = i.messages.length;
                                for (n = 0; n < l; n++) {
                                    var c = new M,
                                        u = i.messages[n];
                                    c.update(u), s.push(c)
                                }
                            }
                            t.updateMessageReferences(s, t.calls()), i && i.isStopCancelled && t.showAllStopsCancelledText() && ((c = new M).text(t.textAllStopsCancelledString()), c.isDisturbance(!0), s.unshift(c)), 0 === t.calls().length && 0 === s.length && ((c = new M).text(t.textNoDataFound()), s.unshift(c)), t.messages(s)
                        }, this.model = e, r.observableArray.fn.insertAt = function(e, t) {
                            return this.valueWillMutate(), this.splice(e, 0, t), this.valueHasMutated(), this
                        }, r.observableArray.fn.removeAt = function(e) {
                            return this.valueWillMutate(), this.splice(e, 1), this.valueHasMutated(), this
                        }, this.selectedLine.subscribe((function(e) {
                            t.directions([]), t.stopPoints([]), void 0 !== e && (t.useDirection() ? t.getDirections() : t.getStopPoints())
                        })), this.selectedDirection.subscribe((function(e) {
                            void 0 !== e && t.getStopPoints()
                        }))
                    }
                    return e.prototype.start = function() {
                        this.getConfigOptions()
                    }, e.prototype.getNow = function() {
                        return new Date(Date.now() + this.systemDateTimeOffset)
                    }, e.prototype.clearStopName = function() {
                        n("#StopName").val("")
                    }, e.prototype.findKoCall = function(e) {
                        for (var t = this.calls().length, i = 0; i < t; i++)
                            if (this.calls()[i].Id === e) return this.calls()[i];
                        return null
                    }, e.prototype.purgeCalls = function() {
                        for (var e = this.calls().length - 1; 0 <= e; e--) {
                            var t = this.calls()[e];
                            t.IsDirty() || this.calls.removeAt(e), t.IsDirty(!1)
                        }
                    }, e.prototype.getDirections = function() {
                        var e = this;
                        n("#SelectedStopPoint").unwait(), n("#SelectedDirection").wait(), n("#SelectedDirection").attr("aria-busy", "true"), n("#SelectedDirection").find("option:first-child").text(this.textLoadingDirection());
                        var t = {
                            lineId: this.selectedLine().id()
                        };
                        n.ajax({
                            type: "GET",
                            contentType: "application/json; charset=utf-8",
                            url: this.model.config.api.baseUri + "api/GetDirections",
                            data: t,
                            dataType: "json",
                            success: function(t) {
                                var i = t.map((function(e) {
                                    var t = new A;
                                    return t.update(e), t
                                }));
                                e.directions(i), n("#SelectedDirection").unwait(), n("#SelectedDirection").find("option:first-child").text(e.textSelectDirection()), n("#SelectedDirection").attr("aria-busy", "false")
                            },
                            error: function(t) {
                                console.error("Failed: GetDirections"), n("#SelectedDirection").unwait(), n("#SelectedDirection").find("option:first-child").text(e.textSelectDirection()), n("#SelectedDirection").attr("aria-busy", "false")
                            }
                        })
                    }, e.prototype.getStopPoints = function() {
                        var e = this;
                        this.stopPoints([]), n("#SelectedStopPoint").wait(), n("#SelectedStopPoint").attr("aria-busy", "true"), n("#SelectedStopPoint").find("option:first-child").text(this.textLoadingStop());
                        var t = {
                            lineId: this.selectedLine().id(),
                            directionId: this.useDirection() ? this.selectedDirection().id() : null
                        };
                        n.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: this.model.config.api.baseUri + "api/GetStopAreas",
                            data: JSON.stringify(t),
                            dataType: "json",
                            success: function(t) {
                                var i = t.map((function(e) {
                                    var t = new C;
                                    return t.update(e), t
                                }));
                                e.stopPoints(i), n("#SelectedStopPoint").unwait(), n("#SelectedStopPoint").find("option:first-child").text(e.textSelectStop()), n("#SelectedStopPoint").attr("aria-busy", "false")
                            },
                            error: function(t) {
                                console.error("Failed: GetStopAreas"), n("#SelectedStopPoint").unwait(), n("#SelectedStopPoint").find("option:first-child").text(e.textSelectStop()), n("#SelectedStopPoint").attr("aria-busy", "false")
                            }
                        })
                    }, e.prototype.toggleCollapse = function(e, t) {
                        this.closeAllToggles(), e.IsExpanded(!e.IsExpanded());
                        var i = document.querySelector("#collapse-" + t);
                        e.IsExpanded() ? i.style.display = "block" : i.style.display = "none"
                    }, e.prototype.closeAllToggles = function() {
                        for (var e = document.getElementsByClassName("accordion-content"), t = 0; t < e.length; t++) document.querySelector("#collapse-" + t).style.display = "none", e[t].ariaExpanded = "false"
                    }, e.prototype.toggleShowOnMap = function(e, t) {
                        this.resultMap ? this.hideRowMap(e, t) : this.showRowMap(e, t)
                    }, e.prototype.hideRowMap = function(e, t) {
                        this.removeJourneyVehicleMarker(), this.resultMap && (a.DomUtil.remove(this.resultMap.getContainer()), this.resultMap.remove(), this.resultMap = void 0)
                    }, e.prototype.showRowMap = function(e, t) {
                        var i = this;
                        this.removeJourneyVehicleMarker(), null !== this.selectedMapRoute && (this.resultMap && this.selectedMapRoute.removeFrom(this.resultMap), this.selectedMapRoute = null);
                        var o = this.resultMapStopAreaMarker();
                        o && (this.resultMap && this.resultMap.removeLayer(o), this.resultMapStopAreaMarker(null));
                        var r = {
                            routeId: e.RouteId()
                        };
                        n.ajax({
                            type: "GET",
                            contentType: "application/json; charset=utf-8",
                            url: this.model.config.api.baseUri + "api/GetMapRoute?",
                            data: r,
                            dataType: "json",
                            success: function(o) {
                                var n = "#FF0000",
                                    r = new Array,
                                    s = {
                                        color: n
                                    };
                                for (var l in o.locations) r.push([o.locations[l].lat, o.locations[l].lon]);
                                i.resultMap && (a.DomUtil.remove(i.resultMap.getContainer()), i.resultMap.remove(), i.resultMap = void 0), i.useNewTable() ? a.DomUtil.create("div", "", a.DomUtil.get("map-" + t)).id = "resultmap" : a.DomUtil.create("div", "", a.DomUtil.get("mapold-" + t)).id = "resultmap", i.resultMap = a.map("resultmap", {
                                    center: [i.model.config.map.centerLat, i.model.config.map.centerLon],
                                    zoom: i.model.config.map.zoom,
                                    zoomAnimation: !1,
                                    fadeAnimation: !1,
                                    markerZoomAnimation: !1
                                }), i.selectedMapRoute = new G, i.selectedMapRoute.polyline = a.polyline(r, s), i.selectedMapRoute.polylineDirection = a.polylineDecorator(i.selectedMapRoute.polyline, {
                                    patterns: [{
                                        offset: 50,
                                        repeat: 50,
                                        symbol: a.Symbol.arrowHead({
                                            pixelSize: 10,
                                            pathOptions: {
                                                fillOpacity: 1,
                                                weight: 0,
                                                color: n
                                            }
                                        })
                                    }]
                                }), i.selectedMapRoute.addTo(i.resultMap), i.createTileLayer(i.resultMap), i.resultMap.fitBounds(i.selectedMapRoute.getBounds(), {});
                                var c = i.resultStopArea();
                                if (c) {
                                    var u = c.location().toLeaflet(),
                                        h = a.marker(u, {
                                            title: c.text(),
                                            icon: a.icon({
                                                iconUrl: "assets/img/stop-icon.svg",
                                                iconSize: [25, 41],
                                                iconAnchor: [13, 42],
                                                className: "marker-stop"
                                            })
                                        }).addTo(i.resultMap);
                                    i.resultMapStopAreaMarker(h)
                                }
                                e.NextRealtime() && null != i.selectedRow && i.getVehicleLocation(i.selectedRow.CallId(), !0), i.callresize()
                            },
                            error: function(e) {
                                console.error("Failed: GetMapRoute"), i.callresize()
                            }
                        })
                    }, e.prototype.getVehicleLocation = function(e, t) {
                        var i = this;
                        n.ajax({
                            type: "GET",
                            contentType: "application/json; charset=utf-8",
                            url: this.model.config.api.baseUri + "api/GetVehiclePosition?",
                            data: {
                                callId: e
                            },
                            dataType: "json",
                            success: function(e) {
                                if (e) {
                                    var o = new x;
                                    o.update(e), t ? i.addJourneyVehicleMarker(o) : i.vehicleMarker ? i.updateJourneyVehicleMarker(i.vehicleMarker, o) : i.addJourneyVehicleMarker(o)
                                } else i.removeJourneyVehicleMarker()
                            },
                            error: function(e) {
                                console.error("Failed: GetVehiclePosition")
                            }
                        })
                    }, e.prototype.getVehicleLocations = function() {
                        var e = this;
                        n.ajax({
                            type: "GET",
                            contentType: "application/json; charset=utf-8",
                            url: this.model.config.api.baseUri + "api/GetVehiclePositions",
                            data: {},
                            dataType: "json",
                            success: function(t) {
                                if (t) {
                                    e.searchMap.getPane("markerPane").setAttribute("animation", "true");
                                    var i = l.map(t, (function(e) {
                                        var t = new x;
                                        return t.update(e), t
                                    }));
                                    e.updateVehicleLocations(i), e.secToLocationUpdate = 3
                                }
                            },
                            error: function(e) {
                                console.error("Failed: GetVehiclePositions")
                            }
                        })
                    }, e.prototype.updateVehicleLocations = function(e) {
                        for (var t = l.keyBy(e, (function(e) {
                                return e.id()
                            })), i = [], o = l.keyBy(this.vehicleLocationMarkers, (function(e) {
                                return e.id
                            })), n = 0; n < this.vehicleLocationMarkers.length; n++) l.has(t, this.vehicleLocationMarkers[n].id) || this.vehicleLocationMarkers[n].marker.remove();
                        for (n = 0; n < e.length; n++) {
                            var r = null,
                                a = e[n];
                            l.has(o, a.id()) ? ((r = o[a.id()]).updatePosition(a), r.updateHeading(a)) : (r = this.createVehicleMarker(a)).marker.addTo(this.searchMap), i.push(r)
                        }
                        this.vehicleLocationMarkers = i, this.updateVehicleMarkerIcons()
                    }, e.prototype.updateVehicleMarkerIcons = function() {
                        for (var e = this.searchMap.getZoom(), t = this.searchMap.getBounds(), i = 0; i < this.vehicleLocationMarkers.length; i++) {
                            var o = this.vehicleLocationMarkers[i];
                            e >= 12 && t.contains(o.latlng) ? o.iconType !== k.Detailed && (o.marker.setIcon(o.iconDetailed), o.iconType = k.Detailed) : o.iconType !== k.Normal && (o.marker.setIcon(o.iconNormal), o.iconType = k.Normal)
                        }
                    }, e.prototype.compareLines = function(e, t) {
                        return f(e.text(), t.text())
                    }, e.prototype.compareStopAreas = function(e, t) {
                        return f(e.text(), t.text())
                    }, e.prototype.compareText = function(e, t) {
                        return f(e.text(), t.text())
                    }, e.prototype.clickUpdateVehicles = function() {
                        this.getVehicleLocations()
                    }, e.prototype.clearAllSearchMapStopAreaMarkers = function() {
                        var e = this;
                        this.searchMap && (this.searchMapStopAreaMarkers.map((function(t) {
                            e.searchMap.removeLayer(t)
                        })), this.searchMapStopAreaMarkers = [])
                    }, e.prototype.onStopAreaMarkerClick = function(e) {
                        var t = e.target.options.title.split(" ");
                        t.shift(), n("#StopName").val(t.join(" "));
                        var i = new W;
                        i.fromStopAreaQuery(n("#StopName").val().toString()), this.search(i), this.searchMap && this.toggleSearchMap()
                    }, e.prototype.createTileLayer = function(e) {
                        var t = {};
                        if (l.assign(t, this.model.config.map.tilesOptions), e.options.minZoom = this.model.config.map.minZoom, "protomaps-leaflet" == this.model.config.map.renderer) return e.options.maxZoom = 15, t.url = this.model.config.map.tilesUrl, void s.nS(t).addTo(e);
                        a.tileLayer(this.model.config.map.tilesUrl, t).addTo(e)
                    }, e.prototype.createVehicleMarker = function(e) {
                        var t = new E;
                        t.id = e.id(), t.vehicleDiv = document.createElement("div"), t.vehicleImg = document.createElement("img"), t.vehicleImg.classList.add("icon-vehicle"), t.vehicleImg.style.position = "absolute", t.vehicleImg.style.zIndex = "1", t.vehicleImg.src = "assets/img/vehicleIcon68.png", t.vehicleArrowImg = document.createElement("img"), t.vehicleArrowImg.classList.add("heading"), t.vehicleArrowImg.style.position = "absolute", t.vehicleArrowImg.style.zIndex = "2", t.vehicleArrowImg.src = "assets/img/vehicleArrowIcon68.png", t.vehicleArrowImg.style.transition = "all 1s ease-in", t.vehicleDiv.style.transition = "all 1s ease-in", t.vehicleDiv.appendChild(t.vehicleImg), t.vehicleDiv.appendChild(t.vehicleArrowImg);
                        var i = "marker-vehicle detailed",
                            o = "marker-vehicle normal";
                        return e.classes() && (i = "".concat(i, " ").concat(e.classes().join(" ")), o = "".concat(o, " ").concat(e.classes().join(" "))), t.iconDetailed = a.divIcon({
                            className: i,
                            html: t.vehicleDiv,
                            iconSize: [69, 69]
                        }), t.iconNormal = a.icon({
                            iconUrl: "assets/img/vehicleArrow.svg",
                            iconSize: [40, 40],
                            iconAnchor: [20, 20],
                            popupAnchor: [-3, -76],
                            className: o
                        }), t.marker = a.marker(t.latlng, {
                            title: t.title,
                            icon: t.iconNormal
                        }), t.iconType = k.Normal, t.title = e.displayName(), t.updatePosition(e), t.updateHeading(e), t
                    }, e.prototype.addVehicleMarker = function(e, t) {
                        t.marker.addTo(e), t.marker.getElement().style.transition = "all 1s ease-in"
                    }, e.prototype.addJourneyVehicleMarker = function(e) {
                        this.removeJourneyVehicleMarker(), this.resultMap && (this.vehicleMarker = this.createVehicleMarker(e), this.vehicleMarker.iconType = k.Detailed, this.vehicleMarker.marker.setIcon(this.vehicleMarker.iconDetailed), this.vehicleMarker.marker.addTo(this.resultMap))
                    }, e.prototype.updateJourneyVehicleMarker = function(e, t) {
                        e && (e.updatePosition(t), e.updateHeading(t))
                    }, e.prototype.removeJourneyVehicleMarker = function() {
                        null !== this.vehicleMarker && (this.resultMap && this.resultMap.removeLayer(this.vehicleMarker.marker), this.vehicleMarker = null)
                    }, e.prototype.addAllSearchMapStopAreaMarkers = function(e) {
                        var t = this;
                        this.searchMap && e.map((function(e) {
                            var i = e.location().toLeaflet(),
                                o = a.marker(i, {
                                    title: e.text(),
                                    zIndexOffset: -1e3,
                                    icon: a.icon({
                                        iconUrl: "assets/img/stopPoint50.png",
                                        iconSize: [33, 50],
                                        iconAnchor: [16, 50]
                                    })
                                }).addTo(t.searchMap);
                            o.on("click", t.onStopAreaMarkerClick.bind(t)), t.searchMapStopAreaMarkers.push(o)
                        }))
                    }, e.prototype.findStopsNearLocation = function() {
                        var e = this,
                            t = this.searchMap.getCenter(),
                            i = {
                                coordinate: {
                                    lat: t.lat,
                                    lon: t.lng
                                },
                                maxCount: this.model.config.map.maxCount,
                                maxDistance: this.model.config.map.maxDistance
                            };
                        n.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: this.model.config.api.baseUri + "api/FindStopsNearLocation",
                            data: JSON.stringify(i),
                            dataType: "json",
                            success: function(t) {
                                var i = t.map((function(t) {
                                    var i = new C;
                                    i.update(t);
                                    var o = i.location().toLeaflet(),
                                        n = (10 * Math.round(e.currentPosMarker.getLatLng().distanceTo(o) / 10)).toFixed(0);
                                    return i.text(n.toString() + "m " + i.text()), i
                                }));
                                e.clearAllSearchMapStopAreaMarkers(), e.addAllSearchMapStopAreaMarkers(i), n("#GpsButton").unwait()
                            },
                            error: function(e) {
                                console.error("Failed: FindStopsNearLocation"), n("#GpsButton").unwait()
                            }
                        })
                    }, e.prototype.populateRoutesDDL = function() {
                        var e = this;
                        n("#SelectedLine").wait(), n("#SelectedLine").find("option:first-child").text("Loading"), n.ajax({
                            type: "GET",
                            contentType: "application/json; charset=utf-8",
                            url: this.model.config.api.baseUri + "api/GetLines?",
                            dataType: "json",
                            success: function(t) {
                                n("#SelectedLine").unwait(), n("#SelectedLine").find("option:first-child").text(e.textSelectLine());
                                var i = t.map((function(e) {
                                    var t = new S;
                                    return t.update(e), t
                                }));
                                e.lines(i)
                            },
                            error: function(e) {
                                console.error("Failed: GetLines")
                            }
                        })
                    }, e.prototype.getCalls = function(e, t) {
                        var i = this;
                        if (e) {
                            var o = {
                                query: {
                                    fromStopAreaQuery: e.fromStopAreaQuery(),
                                    toStopAreaName: e.toStopAreaQuery(),
                                    lineId: e.lineId(),
                                    directionId: e.directionId()
                                },
                                configuration: {
                                    grouping: this.model.config.rowGrouping
                                }
                            };
                            n("#spinner").show(), this.isLoadingResultList(!0), n.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                url: this.model.config.api.baseUri + "api/GetCalls",
                                data: JSON.stringify(o),
                                dataType: "json",
                                success: function(o) {
                                    t(e, o), i.callresize()
                                },
                                error: function(e) {
                                    console.error("Failed: GetCalls")
                                },
                                complete: function() {
                                    ee(), i.isLoadingResultList(!1)
                                }
                            })
                        }
                    }, e.prototype.updateCall = function(e, t) {
                        for (var i, o, n, r, a = t.calls[0], s = t.calls[1]; e.Calls().length > t.calls.length;) e.Calls.pop();
                        for (var l = 0; l < t.calls.length; l++) {
                            var u = t.calls[l],
                                h = e.Calls()[l];
                            null == h && (h = new D(e, this.model), e.Calls.push(h)), h.update(u)
                        }
                        e.CallId(a.id), e.RouteId(a.routeId), e.JourneyId(a.journeyId), e.LineId(a.lineId), e.Line(a.line), e.Journey(a.journey), e.StopAreaNumber(null !== (o = null === (i = null == a ? void 0 : a.departure) || void 0 === i ? void 0 : i.designation) && void 0 !== o ? o : ""), e.NextStopAreaNumber(null !== (r = null === (n = null == s ? void 0 : s.departure) || void 0 === n ? void 0 : n.designation) && void 0 !== r ? r : ""), a.lineAppearance ? e.LineAppearance().update(a.lineAppearance) : e.LineAppearance().clear(), e.Dest(a.destination), e.Subdest(a.subdestination), e.NextWheelchairAdapted(a.departure.attributes.indexOf("wheelchair") > -1), e.NextRealtime("realtime" === a.departure.quality), e.NextDeparture(c(a.departure.forecastTime)), e.IsNextCancelled(a.departure.attributes.indexOf("departureCancelled") > -1), s ? (e.AfterWheelchairAdapted(s.departure.attributes.indexOf("wheelchair") > -1), e.IsAfterRealtime("realtime" === s.departure.quality), e.AfterDeparture(c(s.departure.forecastTime)), e.IsAfterCancelled(s.departure.attributes.indexOf("departureCancelled") > -1)) : (e.IsAfterRealtime(!1), e.AfterDeparture(null), e.IsAfterCancelled(!1)), e.CreatedTime(c(a.createdTime))
                    }, e.prototype.updateCallFormat = function(e) {
                        e.Next(this.formatTime(e.NextRealtime(), e.NextDeparture(), e.CreatedTime(), !1, e.IsNextCancelled())), e.NextHhMm(this.formatTime(e.NextRealtime(), e.NextDeparture(), e.CreatedTime(), !0, e.IsNextCancelled())), e.After(this.formatTime(e.IsAfterRealtime(), e.AfterDeparture(), e.CreatedTime(), !1, e.IsAfterCancelled())), e.AfterHhMm(this.formatTime(e.IsAfterRealtime(), e.AfterDeparture(), e.CreatedTime(), !0, e.IsAfterCancelled()))
                    }, e.prototype.updateMessageReferences = function(e, t) {
                        var i = this;
                        e.forEach((function(e) {
                            var o = new Set;
                            e.lines([]), t.forEach((function(t) {
                                t.Calls().forEach((function(n) {
                                    if (!1 !== e.AffectedCalls().includes(n.Key())) {
                                        var r = i.getMessageLineReference(t),
                                            a = "".concat(r.lineId());
                                        !1 === o.has(a) && (o.add(a), e.lines.push(r))
                                    }
                                }))
                            })), e.lines.sort((function(e, t) {
                                return f(e.lineName(), t.lineName())
                            }))
                        }))
                    }, e.prototype.getMessageLineReference = function(e) {
                        var t = new L;
                        return t.lineId(e.LineId()), t.lineName(e.Line()), t.lineAppearance(e.LineAppearance()), t
                    }, e.prototype.tooltip = function(e) {
                        var t = n(e).data("tooltip");
                        return n("#" + t).first().clone()[0]
                    }, e.prototype.formatTime = function(e, t, i, o, n) {
                        if (!t) return this.textNoFollowingDeparture();
                        var r = c(t),
                            a = c(i),
                            s = c.duration(r.diff(a));
                        s.asSeconds() < 0 && (s = c.duration(0, "seconds"));
                        var l = this.textNoFollowingDeparture();
                        return r && r.year() < 9999 && (l = o ? this.model.timeFormatter.absoluteTime(r) : this.model.timeFormatter.formatTime({
                            datetime: r,
                            duration: s,
                            isRealtime: e,
                            isCancelled: n,
                            isCongestion: !1
                        })), l
                    }, e.prototype.respondToUrl = function() {
                        var e = new W;
                        e.setFromUri(), this.search(e)
                    }, e.prototype.getSimpleStopArea = function(e) {
                        var t = this;
                        n.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            url: this.model.config.api.baseUri + "api/FindStopArea",
                            data: JSON.stringify({
                                StopAreaQuery: e
                            }),
                            dataType: "json",
                            success: function(e) {
                                var i = null;
                                e && (i = new C).update(e), t.resultStopArea(i)
                            },
                            error: function(e) {
                                console.error("Failed: FindStopArea")
                            }
                        })
                    }, e.prototype.search = function(e) {
                        this.clearResult(), e.fromStopAreaQuery() ? (this.searchParameters(e), this.searchParameters().updateUri(), this.getCalls(this.searchParameters(), this.handleCalls), this.getSimpleStopArea(this.searchParameters().fromStopAreaQuery())) : this.searchParameters(null)
                    }, e.prototype.clearResult = function() {
                        this.elapsedSeconds = 0, this.resultStopArea(null), null !== this.selectedMapRoute && (this.resultMap && this.selectedMapRoute.removeFrom(this.searchMap), this.selectedMapRoute = null), this.resultMap && (a.DomUtil.remove(this.resultMap.getContainer()), this.resultMap.remove(), this.resultMap = void 0), this.messages([])
                    }, e.prototype.resizeTables = function() {
                        var e = n("#resulty").outerHeight(),
                            t = n("#searchy").outerHeight(),
                            i = n(".content-footer").outerHeight(),
                            o = Math.max(e, t);
                        o < window.innerHeight - i ? (n(".content-area").height(window.innerHeight - i), n(".content-area-header").height(window.innerHeight - i), n("#header").height(window.innerHeight - i), n("#headerimage").height(window.innerHeight - i)) : (n(".content-area").height(o), n(".content-area-header").height(o), n("#header").height(window.innerHeight - i), n("#headerimage").height(o))
                    }, e.prototype.resizeTablesSm = function() {
                        n("#header").height(100), n(".content-area-header").height(100);
                        var e = n("#resulty").outerHeight(),
                            t = n("#searchy").outerHeight(),
                            i = n(".content-footer").outerHeight(),
                            o = n(".content-area-header").outerHeight(),
                            r = Math.max(e, t);
                        r < window.innerHeight - i - o ? n(".content-area").height(window.innerHeight - i - o) : n(".content-area").height(r), n("#headerimage").css("height", "100%")
                    }, e.prototype.resizeTablesXs = function() {
                        n("#header").height(100), n(".content-area-header").height(100), n(".content-area").css("height", "auto"), n("#header").css("height", "100%")
                    }, e.prototype.resizeCallTable = function() {
                        var e = n(".line, .lineHeader");
                        e.css({
                            width: "",
                            "min-width": "",
                            "max-width": ""
                        });
                        var t = n(".destination, .destinationHeader");
                        t.css({
                            width: "",
                            "min-width": "",
                            "max-width": ""
                        });
                        var i = n(".next, .nextHeader");
                        i.css({
                            width: "",
                            "min-width": "",
                            "max-width": ""
                        });
                        var o = n(".stopAreaNumber, .stopAreaNumberHeader");
                        o.css({
                            width: "",
                            "min-width": "",
                            "max-width": ""
                        });
                        var r = n(".occupancy, .occupancyHeader");
                        r.css({
                            width: "",
                            "min-width": "",
                            "max-width": ""
                        });
                        var a = n(".expander, .expanderHeader");
                        a.css({
                            width: "",
                            "min-width": "",
                            "max-width": ""
                        });
                        var s = this.maxOuterWidth(e);
                        isNaN(s) || e.css({
                            "min-width": "".concat(s, "px"),
                            "max-width": "".concat(s, "px")
                        });
                        var l = this.maxOuterWidth(i);
                        isNaN(l) || i.css({
                            "min-width": "".concat(l, "px"),
                            "max-width": "".concat(l, "px")
                        });
                        var c = this.maxOuterWidth(o);
                        isNaN(c) || o.css({
                            "min-width": "".concat(c, "px"),
                            "max-width": "".concat(c, "px")
                        });
                        var u = this.maxOuterWidth(n(".occupancyHeader"));
                        isNaN(u) || r.css({
                            "min-width": "".concat(u, "px"),
                            "max-width": "".concat(u, "px")
                        });
                        var h = this.maxOuterWidth(n(".expanderHeader"));
                        isNaN(h) || a.css({
                            "min-width": "".concat(h, "px"),
                            "max-width": "".concat(h, "px")
                        });
                        var d = n(".tc2").innerWidth() - (h || 0) - (u || 0) - (l || 0) - (c || 0) - (s || 0);
                        isNaN(d) || t.css({
                            "min-width": "".concat(d, "px"),
                            "max-width": "".concat(d, "px")
                        })
                    }, e.prototype.maxOuterWidthElement = function(e) {
                        var t = null,
                            i = NaN;
                        return e.each((function() {
                            var e = NaN;
                            n(this).is(":visible") && (e = n(this).outerWidth(!0)), isNaN(e) || (isNaN(i) ? (i = e, t = this) : e > i && (t = this))
                        })), t
                    }, e.prototype.maxOuterWidth = function(e, t) {
                        void 0 === t && (t = NaN);
                        var i = NaN;
                        return e.each((function() {
                            var e = NaN;
                            n(this).is(":visible") && (e = n(this).outerWidth(!0)), isNaN(e) || (i = isNaN(i) ? e : Math.max(i, e))
                        })), isNaN(i) && (i = t), i
                    }, e.prototype.callresize = function() {
                        this.mqListLarge.matches ? (this.model.viewModel.size(Q.Normal), this.resizeTables()) : this.mqListMedium.matches ? (this.model.viewModel.size(Q.Small), this.resizeTablesSm()) : (this.model.viewModel.size(Q.ExtraSmall), this.resizeTablesXs()), this.resizeCallTable()
                    }, e.prototype.clock = function(e) {
                        var t = c(e);
                        if (this.model.config.am_pm) {
                            var i = t.format("A");
                            n("#clockcontent").html(t.format(this.model.config.formatClock) + ' <span class="ampm">' + i + "</span>")
                        } else n("#clockcontent").html(t.format(this.model.config.formatClock))
                    }, e.prototype.tick = function(e) {
                        if (this.totalTicks++, this.clock(e), this.updateFrameState(), !this.isLoadingResultList()) {
                            var t = this.searchParameters();
                            t && ++this.elapsedSeconds === this.TIMEOUT_INTERVAL_SECONDS && (this.getCalls(t, this.updateCalls), this.selectedRow && this.resultMap && this.getVehicleLocation(this.selectedRow.CallId(), !1), this.elapsedSeconds = 0)
                        }
                        this.showVehicleLocations && this.searchMap && (this.secToLocationUpdate > 0 ? this.secToLocationUpdate -= 1 : 0 === this.secToLocationUpdate && (this.secToLocationUpdate = -1, this.getVehicleLocations()))
                    }, e.prototype.updateFrameState = function() {
                        for (var e = this.totalTicks, t = 0, i = Object.keys(z); t < i.length; t++) {
                            var o = i[t],
                                n = z[o],
                                r = this.model.viewModel.frameStateMap.get(n),
                                a = this.model.config.frames.frameMap.get(n);
                            if (null != a) {
                                var s = !1,
                                    l = null;
                                null == r ? (r = new K, this.model.viewModel.frameStateMap.set(n, r), l = a[0], s = !0) : r.frame() && e - r.startTick >= r.frame().seconds && (l = a[(r.frame().index + 1) % a.length], s = !0), s && (r.startTick = e, r.frame(l))
                            }
                        }
                    }, e.prototype.toggleSearchMap = function() {
                        var e = this;
                        if (this.showVehicleLocations) {
                            if (this.searchMap) return this.updateVehicleLocations([]), this.searchMap.remove(), this.currentPosMarker = null, this.searchMap = null, n("#map_overlay_div").hide(), !1;
                            n("#map_overlay_div").show(), this.searchMap = a.map("map_overlay_div", {
                                center: [this.model.config.map.centerLat, this.model.config.map.centerLon],
                                zoom: this.model.config.map.zoom,
                                zoomAnimation: !1,
                                fadeAnimation: !1,
                                markerZoomAnimation: !1
                            }), this.createTileLayer(this.searchMap);
                            var t = new B({
                                options: "topright"
                            });
                            return t.addTo(this.searchMap), a.DomEvent.on(t.getContainer(), "click", (function(t) {
                                e.toggleSearchMap()
                            })), this.searchMap.on("moveend", (function(t) {
                                e.findStopsNearLocation(), e.updateVehicleMarkerIcons()
                            })), this.searchMap.on("zoomstart", (function(t) {
                                e.searchMap.getPane("markerPane").setAttribute("animation", "false")
                            })), this.searchMap.on("zoomend", (function(e) {})), this.getVehicleLocations(), this.callresize(), !0
                        }
                        return this.searchMap ? (n("#searchmap").remove(), this.currentPosMarker = null, this.searchMap = null, this.callresize(), !1) : (n('<div id="searchmap" class="map"></div>').prependTo("#search_map_div"), this.searchMap = a.map("searchmap", {
                            center: [this.model.config.map.centerLat, this.model.config.map.centerLon],
                            zoom: this.model.config.map.zoom,
                            zoomAnimation: !1,
                            fadeAnimation: !1,
                            markerZoomAnimation: !1
                        }), this.createTileLayer(this.searchMap), this.callresize(), !0)
                    }, e.prototype.getConfigOptions = function() {
                        var e = this;
                        r.applyBindings(this), n.ajax({
                            type: "GET",
                            contentType: "application/json; charset=utf-8",
                            url: this.model.config.api.baseUri + "api/GetConfigOptions?profile=" + $("profile") + "&language=" + $("language"),
                            dataType: "json",
                            success: function(t) {
                                var i;
                                if (t) {
                                    document.title = t.title, document.documentElement.lang = t.textLanguage, n("link[rel*='icon']").attr("href", t.favicon);
                                    var o = $("profileData");
                                    o || (o = $("data")), o || (o = t.profileData);
                                    var r = $("profile");
                                    r || (r = t.profileDisplay);
                                    var a = {};
                                    if (o && (a["anyride-profile-data"] = o), r && (a["anyride-profile-display"] = r), n.ajaxSetup({
                                            headers: a
                                        }), t.customCss.length > 0) {
                                        var s = n('<link href="' + t.customCss + '" rel="stylesheet" type="text/css" />'),
                                            u = function() {
                                                e.model.bootstrap.themeLoaded = !0, e.model.bootstrap.onUpdate()
                                            };
                                        s.on("load", u), s.on("error", u), n("head").append(s)
                                    } else e.model.bootstrap.themeLoaded = !0, e.model.bootstrap.onUpdate();
                                    e.model.config.locale = t.locale, e.model.config.locale || (e.model.config.locale = window.navigator.userLanguage || window.navigator.language), c.locale(e.model.config.locale), e.model.resourceModel.setSource(t), e.model.config.map.centerLat = t.centerLat, e.model.config.map.centerLon = t.centerLon, e.model.config.map.maxCount = t.mapMaxCount, e.model.config.map.maxDistance = t.mapMaxDistance, e.model.config.map.zoom = t.zoom, e.model.config.map.minZoom = t.minZoom;
                                    var h = e.model.config.api.baseUri,
                                        d = h.indexOf("//");
                                    if (d >= 0 && (h = h.substring(d + 2)), (d = h.indexOf("/")) >= 0 && (h = h.substring(0, d)), e.model.config.map.tilesUrl = t.tiles.urlTemplate.replace("{host}", h), l.forEach(t.tiles.options, (function(t) {
                                            l.assign(e.model.config.map.tilesOptions, t)
                                        })), e.model.config.map.renderer = null !== (i = t.tiles.renderer) && void 0 !== i ? i : "", e.model.config.frames = P.parse(t.frames), e.model.config.occupancy = F.parse(t.occupancy), e.model.config.formatClock = t.formatClock, e.model.config.am_pm = t.am_pm, e.model.config.formatAbsoluteTime = t.formatAbsoluteTime, e.model.config.formatRelativeTime = t.formatRelativeTime, e.model.config.formatForecastTime = t.formatForecastTime, e.model.config.useNonForcastIndicator = t.useNonForcastIndicator, e.model.config.messagePriorityStrategy = t.messagePriorityStrategy, e.model.config.rowGrouping = t.rowGrouping, e.model.config.rowOrder = t.rowOrder, e.model.config.rowData = t.rowData, e.model.config.rowLabel = t.rowLabel, e.model.config.resultTable.showStopAreaNumber(t.showStopAreaNumber), e.model.config.resultTable.showOccupancy(t.tableShowOccupancy), e.model.config.resultTable.showExpander(t.tableShowExpander), e.useNewTable(t.useNewTable), e.newTableMessagesAtTop(t.newTableMessagesAtTop), e.tableDetailsShowNext(t.tableDetailsShowNext), e.tableDetailsShowAfter(t.tableDetailsShowAfter), e.tableDetailsShowMap(t.tableDetailsShowMap), e.tableDetailsShowOccupancyLegend(t.tableDetailsShowOccupancyLegend), e.iconWheelchair(t.iconWheelchair), e.iconRealtime(t.iconRealtime), e.showVehicleLocations = t.showVehicleLocations, e.showAllStopsCancelledText(t.showAllStopsCancelledText), e.useDirection(t.useDirection), e.displayRowMapExpanded(t.displayRowMapExpanded), e.hideRouteStopSelection(t.hideRouteStopSelection), e.logo(t.logo), e.logo_top(t.logo_top), e.hrefCustomer(t.hrefCustomer), e.top_pushpin(t.top_pushpin), e.model.translationModel.setSource(t), e.textAllStopsCancelledString(t.textAllStopsCancelledString), e.textSelectYourStop(t.textSelectYourStop), e.textDoYouKnowStop(t.textDoYouKnowStop), e.textUseGPS(t.textUseGPS), e.textStopNameOrNumber(t.textStopNameOrNumber), e.textChooseLineStop(t.textChooseLineStop), e.textChooseLineDirectionStop(t.textChooseLineDirectionStop), e.textDirection(t.textDirection), e.textDestination(t.textDestination), e.textOccupancy(t.textOccupancy), e.textLine(t.textLine), e.textJourney(t.textJourney), e.textStop(t.textStop), e.textSelectLine(t.textSelectLine), e.textSelectDirection(t.textSelectDirection), e.textLoadingDirection(t.textLoadingDirection), e.textSelectStop(t.textSelectStop), e.textLoadingStop(t.textLoadingStop), e.textNext(t.textNext), e.textStopAreaNumber(t.textStopAreaNumber), e.textNextDepartureIn(t.textNextDepartureIn), e.textOr(t.textOr), e.textAfter(t.textAfter), e.textMin(t.textMin), e.textViewLiveMap(t.textViewLiveMap), e.textCopyright(t.textCopyright), e.htmlPoweredBy(t.htmlPoweredBy), e.textNoDataFound(t.textNoDataFound), e.textLiveBusTimes(t.textLiveBusTimes), e.textCancelled(t.textCancelled), e.textNoFollowingDeparture(t.textNoFollowingDeparture), e.textCa(t.textForecastQualityTimetable), e.textNow(t.textNow), e.textFailedGpsLocation(t.textFailedGpsLocation), e.textAriaLabelGps(t.textAriaLabelGps), e.textAriaLabelSearch(t.textAriaLabelSearch), e.textAriaOr(t.textAriaOr), e.textPleaseDefineYourSearch(t.textPleaseDefineYourSearch), e.model.bootstrap.profileLoaded = !0, e.model.bootstrap.onUpdate(), Array.isArray(t.googleAnalytics) && t.googleAnalytics.length > 0) {
                                        window.gtag("js", new Date);
                                        for (var p = 0; p < t.googleAnalytics.length; p++) window.gtag("config", t.googleAnalytics[p].trackingId);
                                        var f = document.head || document.getElementsByTagName("head")[0],
                                            m = document.createElement("script");
                                        m.async = !0, m.src = "https://www.googletagmanager.com/gtag/js?id=" + t.googleAnalytics[0].trackingId, f.appendChild(m)
                                    }
                                } else console.log("Failed to get GetConfigOptions.")
                            },
                            error: function(e) {
                                console.log("Failed to get GetConfigOptions.")
                            }
                        }).done((function() {
                            return e.initAfterSetConfigOptions()
                        }))
                    }, e.prototype.initAfterSetConfigOptions = function() {
                        var e = this;
                        this.model.timeFormatter = new b(this.model.config, this.model), n(window).bind("resize", (function() {
                            e.callresize()
                        })), this.callresize(), this.getSystemDateTime()
                    }, e.prototype.getSystemDateTime = function() {
                        var e = this;
                        n.ajax({
                            type: "GET",
                            contentType: "application/json; charset=utf-8",
                            url: this.model.config.api.baseUri + "api/GetSystemTimestamp?",
                            data: {
                                clientTimestamp: c().format()
                            },
                            dataType: "json",
                            success: function(t) {
                                if (t) {
                                    var i = c(),
                                        o = c(t.ClientDateTime),
                                        n = c(t.SystemDateTime),
                                        r = i.valueOf() - o.valueOf();
                                    n = c(n.valueOf() - Math.floor(r / 2)), e.systemDateTimeOffset = n.valueOf() - i.valueOf(), console.log("systemDateTimeOffset: %d ms", e.systemDateTimeOffset)
                                } else console.log("Failed to get GetSystemDateTime.")
                            },
                            error: function(e) {
                                console.log("Failed to get GetSystemDateTime.")
                            }
                        }).done((function() {
                            return e.initAfterSyncWithSystemDateTime()
                        }))
                    }, e.prototype.initAfterSyncWithSystemDateTime = function() {
                        var e = this;
                        this.tick(this.getNow()), window.setInterval((function() {
                            e.tick(e.getNow())
                        }), 1e3), n("#GpsButton").on("click", (function() {
                            if (navigator.geolocation) {
                                if (!e.toggleSearchMap()) return;
                                navigator.geolocation.getCurrentPosition(e.gpsLocationSuccess, e.gpsLocationError)
                            } else alert(e.textFailedGpsLocation())
                        })), n("#SubmitStopButton").on("click", (function() {
                            n("#results").attr("aria-busy", "true");
                            var t = new W;
                            t.fromStopAreaQuery(n("#StopName").val().toString()), e.search(t), n("#results").attr("aria-busy", "false")
                        })), n("#SubmitRDSButton").on("click", (function() {
                            if (n("#results").attr("aria-busy", "true"), e.selectedStopPoint() && e.selectedLine() && (!e.useDirection() || e.selectedDirection())) {
                                var t = new W;
                                t.fromStopAreaQuery(e.selectedStopPoint().text()), t.lineId(e.selectedLine().id()), t.directionId(e.useDirection() ? e.selectedDirection().id() : 0), e.search(t)
                            }
                            n("#results").attr("aria-busy", "false")
                        })), n("#StopName").autocomplete({
                            ajaxSettings: {
                                dataType: "json",
                                contentType: "application/json; charset=utf-8"
                            },
                            triggerSelectOnValidInput: !1,
                            serviceUrl: this.model.config.api.baseUri + "api/Autocomplete",
                            transformResult: function(e) {
                                return {
                                    suggestions: e
                                }
                            },
                            beforeRender: function(t, i) {
                                e.model.viewModel.ariaHasSuggestionPopup(!0)
                            },
                            onHide: function(t) {
                                e.model.viewModel.ariaHasSuggestionPopup(!1)
                            },
                            onSelect: function(t) {
                                var i = new W;
                                i.fromStopAreaQuery(t.value), e.search(i)
                            }
                        }), this.respondToUrl(), this.hideRouteStopSelection() || this.populateRoutesDDL(), ee()
                    }, e
                }();

            function $(e) {
                return (location.search.split(e + "=")[1] || "").split("&")[0]
            }

            function ee() {
                setTimeout((function() {
                    n("#spinner").hide()
                }), 1e3)
            }! function(e) {
                e[e.Normal = 0] = "Normal", e[e.Small = 1] = "Small", e[e.ExtraSmall = 2] = "ExtraSmall"
            }(Q || (Q = {})), (window || i.g).toggleResultRow = function(e) {
                var t = !1;
                ("Enter" == e.key || 13 === e.keyCode) && (t = !0), t && e.target.click()
            }, q = new function() {
                this.config = null, this.viewModel = null, this.resourceModel = null, this.translationModel = null, this.bootstrap = null, this.timeFormatter = null
            }, window.model = q, q.config = new function() {
                this.api = new O, this.locale = null, this.formatClock = "", this.am_pm = !0, this.useNonForcastIndicator = !0, this.formatAbsoluteTime = "", this.formatRelativeTime = "", this.formatForecastTime = [], this.messagePriorityStrategy = v.None, this.resultTable = new R, this.map = new _, this.frames = new P, this.occupancy = new F, this.rowGrouping = [], this.rowOrder = [], this.rowData = [], this.rowLabel = "Line"
            }, q.bootstrap = new I, q.resourceModel = new Y, q.translationModel = new Z, q.viewModel = new X(q), n.ajaxSetup({
                cache: !1
            }), n.getJSON("app.config.json").done((function(e) {
                var t = e.apiUri;
                t = t.replace("{protocol}", window.location.protocol).replace("{host}", window.location.hostname), t += "/" === t.charAt(t.length - 1) ? "" : "/", q.config.api.baseUri = t, q.bootstrap.configLoaded = !0, q.bootstrap.onUpdate()
            })).fail((function() {
                alert("config error")
            })), n(document).ready((function() {
                q.bootstrap.pageLoaded = !0, q.bootstrap.onUpdate()
            })), q.bootstrap.addOnUpdate((function(e) {
                return !!(e.pageLoaded && e.profileLoaded && e.themeLoaded) && (n("#splash").hide(), !0)
            })), q.bootstrap.addOnUpdate((function(e) {
                return !(!e.configLoaded || !e.pageLoaded || (q.viewModel.start(), 0))
            }))
        }
    },
    e => {
        e.O(0, [96], (() => e(e.s = 9910))), e.O()
    }
]);
//# sourceMappingURL=app.bundle.js.map