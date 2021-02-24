!function(e) {
    "use strict";
    function t() {
        edgtf.scroll = e(window).scrollTop(),
        edgtf.body.hasClass("edgtf-dark-header") && (edgtf.defaultHeaderStyle = "edgtf-dark-header"),
        edgtf.body.hasClass("edgtf-light-header") && (edgtf.defaultHeaderStyle = "edgtf-light-header")
    }
    function a() {}
    function d() {
        edgtf.windowWidth = e(window).width(),
        edgtf.windowHeight = e(window).height()
    }
    function o() {
        edgtf.scroll = e(window).scrollTop()
    }
    switch (window.edgtf = {},
    edgtf.modules = {},
    edgtf.scroll = 0,
    edgtf.window = e(window),
    edgtf.document = e(document),
    edgtf.windowWidth = e(window).width(),
    edgtf.windowHeight = e(window).height(),
    edgtf.body = e("body"),
    edgtf.html = e("html, body"),
    edgtf.htmlEl = e("html"),
    edgtf.menuDropdownHeightSet = !1,
    edgtf.defaultHeaderStyle = "",
    edgtf.minVideoWidth = 1500,
    edgtf.videoWidthOriginal = 1280,
    edgtf.videoHeightOriginal = 720,
    edgtf.videoRatio = 1.61,
    edgtf.edgtfOnDocumentReady = t,
    edgtf.edgtfOnWindowLoad = a,
    edgtf.edgtfOnWindowResize = d,
    edgtf.edgtfOnWindowScroll = o,
    e(document).ready(t),
    e(window).load(a),
    e(window).resize(d),
    e(window).scroll(o),
    !0) {
    case edgtf.body.hasClass("edgtf-grid-1300"):
        edgtf.boxedLayoutWidth = 1350;
        break;
    case edgtf.body.hasClass("edgtf-grid-1200"):
        edgtf.boxedLayoutWidth = 1250;
        break;
    case edgtf.body.hasClass("edgtf-grid-1000"):
        edgtf.boxedLayoutWidth = 1050;
        break;
    case edgtf.body.hasClass("edgtf-grid-800"):
        edgtf.boxedLayoutWidth = 850;
        break;
    default:
        edgtf.boxedLayoutWidth = 1150
    }
    edgtf.gridWidth = function() {
        var e = 1100;
        switch (!0) {
        case edgtf.body.hasClass("edgtf-grid-1300") && 1400 < edgtf.windowWidth:
            e = 1300;
            break;
        case edgtf.body.hasClass("edgtf-grid-1200") && 1300 < edgtf.windowWidth:
        case edgtf.body.hasClass("edgtf-grid-1000") && 1200 < edgtf.windowWidth:
            e = 1200;
            break;
        case edgtf.body.hasClass("edgtf-grid-800") && 1024 < edgtf.windowWidth:
            e = 800
        }
        return e
    }
}(jQuery),
function(A) {
    "use strict";
    var e = {};
    function t() {
        v().init(),
        -1 < navigator.appVersion.toLowerCase().indexOf("mac") && edgtf.body.hasClass("edgtf-smooth-scroll") && edgtf.body.removeClass("edgtf-smooth-scroll"),
        s().init(),
        A("#edgtf-back-to-top").on("click", function(e) {
            e.preventDefault(),
            edgtf.html.animate({
                scrollTop: 0
            }, edgtf.window.scrollTop() / 5, "easeOutQuint")
        }),
        edgtf.window.scroll(function() {
            var e = A(this).scrollTop()
              , t = A(this).height();
            r((0 < e ? e + t / 2 : 1) < 1e3 ? "off" : "on")
        }),
        g(),
        c(),
        u(),
        b(),
        function() {
            var e = A(".edgtf-preload-background");
            e.length && e.each(function() {
                var e = A(this);
                if ("" !== e.css("background-image") && "none" !== e.css("background-image")) {
                    var t = e.attr("style");
                    if (t = (t = t.match(/url\(["']?([^'")]+)['"]?\)/)) ? t[1] : "") {
                        var a = new Image;
                        a.src = t,
                        A(a).load(function() {
                            e.removeClass("edgtf-preload-background")
                        })
                    }
                } else
                    A(window).load(function() {
                        e.removeClass("edgtf-preload-background")
                    })
            })
        }(),
        h(),
        function() {
            var e = A(".edgtf-search-post-type");
            e.length && e.each(function() {
                var e = A(this)
                  , t = e.find(".edgtf-post-type-search-field")
                  , d = e.siblings(".edgtf-post-type-search-results")
                  , o = e.find(".edgtf-search-loading")
                  , i = e.find(".edgtf-search-icon");
                o.addClass("edgtf-hidden");
                var n, s = e.data("post-type");
                t.on("keyup paste", function() {
                    var a = A(this);
                    a.attr("autocomplete", "off"),
                    o.removeClass("edgtf-hidden"),
                    i.addClass("edgtf-hidden"),
                    clearTimeout(n),
                    n = setTimeout(function() {
                        var e = a.val();
                        if (e.length < 3)
                            d.html(""),
                            d.fadeOut(),
                            o.addClass("edgtf-hidden"),
                            i.removeClass("edgtf-hidden");
                        else {
                            var t = {
                                action: "playerx_edge_search_post_types",
                                term: e,
                                postType: s,
                                search_post_types_nonce: A('input[name="edgtf_search_post_types_nonce"]').val()
                            };
                            A.ajax({
                                type: "POST",
                                data: t,
                                url: edgtfGlobalVars.vars.edgtfAjaxUrl,
                                success: function(e) {
                                    var t = JSON.parse(e);
                                    "success" === t.status && (o.addClass("edgtf-hidden"),
                                    i.removeClass("edgtf-hidden"),
                                    d.html(t.data.html),
                                    d.fadeIn())
                                },
                                error: function(e, t, a) {
                                    console.log("Status: " + t),
                                    console.log("Error: " + a),
                                    o.addClass("edgtf-hidden"),
                                    i.removeClass("edgtf-hidden"),
                                    d.fadeOut()
                                }
                            })
                        }
                    }, 500)
                }),
                t.on("focusout", function() {
                    o.addClass("edgtf-hidden"),
                    i.removeClass("edgtf-hidden"),
                    d.fadeOut()
                })
            })
        }(),
        function() {
            var e = A(".edgtf-dashboard-form");
            e.length && e.each(function() {
                var e = A(this)
                  , o = e.find("button")
                  , i = o.data("updating-text")
                  , n = o.data("updated-text")
                  , s = e.data("action");
                e.on("submit", function(e) {
                    e.preventDefault();
                    var a = o.html()
                      , t = A(this).find(".edgtf-dashboard-gallery-upload-hidden")
                      , l = [];
                    o.html(i);
                    var f = new FormData;
                    t.each(function() {
                        var e, t = A(this), a = t.attr("name"), d = t.attr("id"), o = t[0].files;
                        if ("-1" !== a.indexOf("[")) {
                            e = a.substring(0, a.indexOf("[")) + "_edgtf_regarray_";
                            var i = d.indexOf("[")
                              , n = d.indexOf("]")
                              , s = d.substring(i + 1, n);
                            l.push(e),
                            e = e + s + "_"
                        } else
                            e = a + "_edgtf_reg_";
                        0 === o.length && f.append(e, new File([""],"edgtf-dummy-file.txt",{
                            type: "text/plain"
                        }));
                        for (var r = 0; r < o.length; r++) {
                            1 === o[r].name.match(/\./g).length && -1 !== A.inArray(o[r].type, ["image/png", "image/jpg", "image/jpeg", "application/pdf"]) && f.append(e + r, o[r])
                        }
                    }),
                    f.append("action", s);
                    var d = A(this).serialize();
                    return f.append("data", d),
                    A.ajax({
                        type: "POST",
                        data: f,
                        contentType: !1,
                        processData: !1,
                        url: edgtfGlobalVars.vars.edgtfAjaxUrl,
                        success: function(e) {
                            var t;
                            t = JSON.parse(e),
                            edgtf.modules.socialLogin.edgtfRenderAjaxResponseMessage(t),
                            "success" === t.status ? (o.html(n),
                            window.location = t.redirect) : o.html(a)
                        }
                    }),
                    !1
                })
            })
        }(),
        m(),
        function() {
            if (edgtf.body.hasClass("edgtf-scroll-to-content") && !edgtf.htmlEl.hasClass("touch")) {
                var e, t, a, d, o = A(".edgtf-slider"), i = o.find(".rev_slider"), n = !1, s = !1, r = function() {
                    e = o.height(),
                    t = o.offset().top,
                    a = e - t,
                    d = e + t
                };
                r(),
                o.on("mousewheel", function(e) {
                    !function(e) {
                        s = e.deltaY < 0
                    }(e)
                }),
                document.querySelector(".edgtf-slider").addEventListener("wheel", function(e) {
                    edgtf.scroll < a && s && (l(),
                    n || (n = !0,
                    A("html, body").stop().animate({
                        scrollTop: d
                    }, 1e3, "easeInOutQuint", function() {
                        n = !1,
                        f()
                    })))
                }, {
                    passive: !0
                }),
                i.length ? i.on("bind", "revolution.slide.onchange", function(e, t) {
                    !0
                }) : A(window).load(function() {
                    !0
                }),
                A(window).resize(function() {
                    setTimeout(function() {
                        r()
                    }, 100)
                })
            }
        }(),
        function() {
            var e = A(".edgtf-custom-footer-form");
            e.length && e.each(function() {
                A(this).find(".wpcf7-form-control-wrap").append('<span class="edgtf-cf7-filler" />')
            })
        }()
    }
    function a() {
        z(),
        function() {
            if (edgtf.body.hasClass("edgtf-smooth-page-transitions")) {
                if (edgtf.body.hasClass("edgtf-smooth-page-transitions-preloader")) {
                    var t = A("body > .edgtf-smooth-transition-loader.edgtf-mimic-ajax");
                    t.fadeOut(500),
                    A(window).on("bind", "pageshow", function(e) {
                        e.originalEvent.persisted && t.fadeOut(500)
                    })
                }
                if (edgtf.body.hasClass("edgtf-smooth-page-transitions-fadeout"))
                    A("a").on("click", function(e) {
                        var t = A(this);
                        (t.parents(".edgtf-shopping-cart-dropdown").length || t.parent(".product-remove").length) && t.hasClass("remove") || 1 === e.which && 0 <= t.attr("href").indexOf(window.location.host) && void 0 === t.data("rel") && void 0 === t.attr("rel") && !t.hasClass("lightbox-active") && (void 0 === t.attr("target") || "_self" === t.attr("target")) && t.attr("href").split("#")[0] !== window.location.href.split("#")[0] && (e.preventDefault(),
                        A(".edgtf-wrapper-inner").fadeOut(800, "easeOutQuint", function() {
                            window.location = t.attr("href")
                        }))
                    })
            }
        }(),
        y().init()
    }
    function d() {
        m(),
        c()
    }
    function l() {
        window.addEventListener && window.addEventListener("DOMMouseScroll", o, !1),
        window.onmousewheel = document.onmousewheel = o,
        document.onkeydown = i
    }
    function f() {
        window.removeEventListener && window.removeEventListener("DOMMouseScroll", o, !1),
        window.onmousewheel = document.onmousewheel = document.onkeydown = null
    }
    function o(e) {
        n(e)
    }
    function i(e) {
        for (var t = [37, 38, 39, 40], a = t.length; a--; )
            if (e.keyCode === t[a])
                return void n(e)
    }
    function n(e) {
        (e = e || window.event).preventDefault && e.preventDefault(),
        e.returnValue = !1
    }
    (edgtf.modules.common = e).edgtfFluidVideo = u,
    e.edgtfEnableScroll = f,
    e.edgtfDisableScroll = l,
    e.edgtfOwlSlider = b,
    e.edgtfInitParallax = z,
    e.edgtfInitSelfHostedVideoPlayer = g,
    e.edgtfSelfHostedVideoSize = c,
    e.edgtfPrettyPhoto = h,
    e.edgtfStickySidebarWidget = y,
    e.getLoadMoreData = function(e) {
        var t = e.data()
          , a = {};
        for (var d in t)
            t.hasOwnProperty(d) && void 0 !== t[d] && !1 !== t[d] && (a[d] = t[d]);
        return a
    }
    ,
    e.setLoadMoreAjaxData = function(e, t) {
        var a = {
            action: t
        };
        for (var d in e)
            e.hasOwnProperty(d) && void 0 !== e[d] && !1 !== e[d] && (a[d] = e[d]);
        return a
    }
    ,
    e.setFixedImageProportionSize = p,
    e.edgtfOnDocumentReady = t,
    e.edgtfOnWindowLoad = a,
    e.edgtfOnWindowResize = d,
    A(document).ready(t),
    A(window).load(a),
    A(window).resize(d);
    var s = function() {
        function n(t) {
            A(".edgtf-main-menu, .edgtf-mobile-nav, .edgtf-fullscreen-menu").each(function() {
                var e = A(this);
                t.parents(e).length && (e.find(".edgtf-active-item").removeClass("edgtf-active-item"),
                t.parent().addClass("edgtf-active-item"),
                e.find("a").removeClass("current"),
                t.addClass("current"))
            })
        }
        var t = function(e) {
            var t, a = A(".edgtf-main-menu a, .edgtf-mobile-nav a, .edgtf-fullscreen-menu a"), d = e, o = "" !== d ? A('[data-edgtf-anchor="' + d + '"]') : "";
            if ("" !== d && 0 < o.length) {
                var i = o.offset().top;
                return t = i - s(i) - edgtfGlobalVars.vars.edgtfAddForAdminBar,
                a.length && a.each(function() {
                    var e = A(this);
                    -1 < e.attr("href").indexOf(d) && n(e)
                }),
                edgtf.html.stop().animate({
                    scrollTop: Math.round(t)
                }, 1e3, function() {
                    history.pushState && history.pushState(null, "", "#" + d)
                }),
                !1
            }
        }
          , s = function(e) {
            "edgtf-sticky-header-on-scroll-down-up" === edgtf.modules.stickyHeader.behaviour && (edgtf.modules.stickyHeader.isStickyVisible = e > edgtf.modules.header.stickyAppearAmount),
            "edgtf-sticky-header-on-scroll-up" === edgtf.modules.stickyHeader.behaviour && e > edgtf.scroll && (edgtf.modules.stickyHeader.isStickyVisible = !1);
            var t = edgtf.modules.stickyHeader.isStickyVisible ? edgtfGlobalVars.vars.edgtfStickyHeaderTransparencyHeight : edgtfPerPageVars.vars.edgtfHeaderTransparencyHeight;
            return edgtf.windowWidth < 1025 && (t = 0),
            t
        };
        return {
            init: function() {
                A("[data-edgtf-anchor]").length && (edgtf.document.on("click", ".edgtf-main-menu a, .edgtf-fullscreen-menu a, .edgtf-btn, .edgtf-anchor, .edgtf-mobile-nav a", function() {
                    var e, t = A(this), a = t.prop("hash").split("#")[1], d = "" !== a ? A('[data-edgtf-anchor="' + a + '"]') : "";
                    if ("" !== a && 0 < d.length) {
                        var o = d.offset().top;
                        return e = o - s(o) - edgtfGlobalVars.vars.edgtfAddForAdminBar,
                        n(t),
                        edgtf.html.stop().animate({
                            scrollTop: Math.round(e)
                        }, 1e3, function() {
                            history.pushState && history.pushState(null, "", "#" + a)
                        }),
                        !1
                    }
                }),
                function() {
                    var t, e = A("[data-edgtf-anchor]"), a = window.location.href.split("#")[0];
                    "/" !== a.substr(-1) && (a += "/"),
                    e.waypoint(function(e) {
                        "down" === e && (t = 0 < A(this.element).length ? A(this.element).data("edgtf-anchor") : A(this).data("edgtf-anchor"),
                        n(A("a[href='" + a + "#" + t + "']")))
                    }, {
                        offset: "50%"
                    }),
                    e.waypoint(function(e) {
                        "up" === e && (t = 0 < A(this.element).length ? A(this.element).data("edgtf-anchor") : A(this).data("edgtf-anchor"),
                        n(A("a[href='" + a + "#" + t + "']")))
                    }, {
                        offset: function() {
                            return -(A(this.element).outerHeight() - 150)
                        }
                    })
                }(),
                A(window).load(function() {
                    !function() {
                        var e = window.location.hash.split("#")[1];
                        "" !== e && 0 < A('[data-edgtf-anchor="' + e + '"]').length && t(e)
                    }()
                }))
            }
        }
    };
    function r(e) {
        var t = A("#edgtf-back-to-top");
        t.removeClass("off on"),
        "on" === e ? t.addClass("on") : t.addClass("off")
    }
    function g() {
        var e = A(".edgtf-self-hosted-video");
        e.length && e.mediaelementplayer({
            audioWidth: "100%"
        })
    }
    function c() {
        var e = A(".edgtf-self-hosted-video-holder .edgtf-video-wrap");
        e.length && e.each(function() {
            var e = A(this)
              , t = e.closest(".edgtf-self-hosted-video-holder").outerWidth()
              , a = t / edgtf.videoRatio;
            navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/) && (e.parent().width(t),
            e.parent().height(a)),
            e.width(t),
            e.height(a),
            e.find("video, .mejs-overlay, .mejs-poster").width(t),
            e.find("video, .mejs-overlay, .mejs-poster").height(a)
        })
    }
    function u() {
        fluidvids.init({
            selector: ["iframe"],
            players: ["www.youtube.com", "player.vimeo.com"]
        })
    }
    function h() {
        A("a[data-rel^='prettyPhoto']").prettyPhoto({
            hook: "data-rel",
            animation_speed: "normal",
            slideshow: !1,
            autoplay_slideshow: !1,
            opacity: .8,
            show_title: !0,
            allow_resize: !0,
            horizontal_padding: 0,
            default_width: 960,
            default_height: 540,
            counter_separator_label: "/",
            theme: "pp_default",
            hideflash: !1,
            wmode: "opaque",
            autoplay: !0,
            modal: !1,
            overlay_gallery: !1,
            keyboard_shortcuts: !0,
            deeplinking: !1,
            custom_markup: "",
            social_tools: !1,
            markup: '<div class="pp_pic_holder">                         <div class="ppt">&nbsp;</div>                         <div class="pp_top">                             <div class="pp_left"></div>                             <div class="pp_middle"></div>                             <div class="pp_right"></div>                         </div>                         <div class="pp_content_container">                             <div class="pp_left">                             <div class="pp_right">                                 <div class="pp_content">                                     <div class="pp_loaderIcon"></div>                                     <div class="pp_fade">                                         <a href="#" class="pp_expand" title="Expand the image">Expand</a>                                         <div class="pp_hoverContainer">                                             <a class="pp_next" href="#"><span class="fa fa-angle-right"></span></a>                                             <a class="pp_previous" href="#"><span class="fa fa-angle-left"></span></a>                                         </div>                                         <div id="pp_full_res"></div>                                         <div class="pp_details">                                             <div class="pp_nav">                                                 <a href="#" class="pp_arrow_previous">Previous</a>                                                 <p class="currentTextHolder">0/0</p>                                                 <a href="#" class="pp_arrow_next">Next</a>                                             </div>                                             <p class="pp_description"></p>                                             {pp_social}                                             <a class="pp_close" href="#">Close</a>                                         </div>                                     </div>                                 </div>                             </div>                             </div>                         </div>                         <div class="pp_bottom">                             <div class="pp_left"></div>                             <div class="pp_middle"></div>                             <div class="pp_right"></div>                         </div>                     </div>                     <div class="pp_overlay"></div>'
        })
    }
    function m() {
        var e = A(".edgtf-grid-masonry-list");
        e.length && e.each(function() {
            var e = A(this)
              , t = e.find(".edgtf-masonry-list-wrapper")
              , a = e.find(".edgtf-masonry-grid-sizer").width();
            t.waitForImages(function() {
                t.isotope({
                    layoutMode: "packery",
                    itemSelector: ".edgtf-item-space",
                    percentPosition: !0,
                    masonry: {
                        columnWidth: ".edgtf-masonry-grid-sizer",
                        gutter: ".edgtf-masonry-grid-gutter"
                    }
                }),
                (e.find(".edgtf-fixed-masonry-item").length || e.hasClass("edgtf-fixed-masonry-items")) && p(t, t.find(".edgtf-item-space"), a, !0),
                setTimeout(function() {
                    z()
                }, 600),
                t.isotope("layout").css("opacity", 1)
            })
        })
    }
    function p(e, t, a, d) {
        if (e.hasClass("edgtf-masonry-images-fixed") || !0 === d) {
            var o = parseInt(t.css("paddingLeft"), 10)
              , i = a - 2 * o
              , n = e.find(".edgtf-masonry-size-small")
              , s = e.find(".edgtf-masonry-size-large-width")
              , r = e.find(".edgtf-masonry-size-large-height")
              , l = e.find(".edgtf-masonry-size-large-width-height");
            n.css("height", i),
            r.css("height", Math.round(2 * (i + o))),
            680 < edgtf.windowWidth ? (s.css("height", i),
            l.css("height", Math.round(2 * (i + o)))) : (s.css("height", Math.round(i / 2)),
            l.css("height", i))
        }
    }
    var v = function() {
        var e = A(".edgtf-icon-has-hover");
        return {
            init: function() {
                e.length && e.each(function() {
                    !function(e) {
                        if (void 0 !== e.data("hover-color")) {
                            var t = function(e) {
                                e.data.icon.css("color", e.data.color)
                            }
                              , a = e.data("hover-color")
                              , d = e.css("color");
                            "" !== a && (e.on("mouseenter", {
                                icon: e,
                                color: a
                            }, t),
                            e.on("mouseleave", {
                                icon: e,
                                color: d
                            }, t))
                        }
                    }(A(this))
                })
            }
        }
    };
    function z() {
        var e = A(".edgtf-parallax-row-holder");
        e.length && e.each(function() {
            var e = A(this)
              , t = e.data("parallax-bg-image")
              , a = .4 * e.data("parallax-bg-speed")
              , d = 0;
            void 0 !== e.data("parallax-bg-height") && !1 !== e.data("parallax-bg-height") && (d = parseInt(e.data("parallax-bg-height"))),
            e.css({
                "background-image": "url(" + t + ")"
            }),
            0 < d && e.css({
                "min-height": d + "px",
                height: d + "px"
            }),
            e.parallax("50%", a)
        })
    }
    function y() {
        var e = A(".edgtf-widget-sticky-sidebar")
          , t = A(".edgtf-page-header")
          , c = t.length ? t.outerHeight() : 0
          , n = 0
          , s = 0
          , r = 0
          , l = 0
          , u = [];
        function a() {
            u.length && A.each(u, function(e) {
                u[e].object;
                var t = u[e].offset
                  , a = u[e].position
                  , d = u[e].height
                  , o = u[e].width
                  , i = u[e].sidebarHolder
                  , n = u[e].sidebarHolderHeight;
                if (edgtf.body.hasClass("edgtf-fixed-on-scroll")) {
                    var s = A(".edgtf-fixed-wrapper.fixed");
                    s.length && (c = s.outerHeight() + edgtfGlobalVars.vars.edgtfAddForAdminBar)
                } else
                    edgtf.body.hasClass("edgtf-no-behavior") && (c = edgtfGlobalVars.vars.edgtfAddForAdminBar);
                if (1024 < edgtf.windowWidth && i.length) {
                    var r = -(a - c)
                      , l = d - a - 40
                      , f = n + t - c - a - edgtfGlobalVars.vars.edgtfTopBarHeight;
                    if (edgtf.scroll >= t - c && d < n)
                        if (i.hasClass("edgtf-sticky-sidebar-appeared") ? i.css({
                            top: r + "px"
                        }) : i.addClass("edgtf-sticky-sidebar-appeared").css({
                            position: "fixed",
                            top: r + "px",
                            width: o,
                            "margin-top": "-10px"
                        }).animate({
                            "margin-top": "0"
                        }, 200),
                        edgtf.scroll + l >= f) {
                            var g = n - l + r - c;
                            i.css({
                                position: "absolute",
                                top: g + "px"
                            })
                        } else
                            i.hasClass("edgtf-sticky-sidebar-appeared") && i.css({
                                position: "fixed",
                                top: r + "px"
                            });
                    else
                        i.removeClass("edgtf-sticky-sidebar-appeared").css({
                            position: "relative",
                            top: "0",
                            width: "auto"
                        })
                } else
                    i.removeClass("edgtf-sticky-sidebar-appeared").css({
                        position: "relative",
                        top: "0",
                        width: "auto"
                    })
            })
        }
        return {
            init: function() {
                e.length && e.each(function() {
                    var e = A(this)
                      , t = e.parents("aside.edgtf-sidebar")
                      , a = e.parents(".wpb_widgetised_column")
                      , d = ""
                      , o = 0;
                    if (n = e.offset().top,
                    s = e.position().top,
                    l = r = 0,
                    t.length) {
                        r = t.outerHeight(),
                        l = t.outerWidth(),
                        o = (d = t).parent().parent().outerHeight();
                        var i = t.parent().parent().find(".edgtf-blog-holder");
                        i.length && (o -= parseInt(i.css("marginBottom")))
                    } else
                        a.length && (r = a.outerHeight(),
                        l = a.outerWidth(),
                        o = (d = a).parents(".vc_row").outerHeight());
                    u.push({
                        object: e,
                        offset: n,
                        position: s,
                        height: r,
                        width: l,
                        sidebarHolder: d,
                        sidebarHolderHeight: o
                    })
                }),
                a(),
                A(window).scroll(function() {
                    a()
                })
            },
            reInit: a
        }
    }
    function b() {
        var e = A(".edgtf-owl-slider");
        e.length && e.each(function() {
            var a, i = A(this), e = A(this), t = i.children().length, d = 1, o = !0, n = !0, s = !0, r = 5e3, l = 600, f = 0, g = 0, c = 0, u = 0, h = !1, m = !1, p = !1, v = !1, y = !1, b = !0, w = !1, C = !1, x = !!i.hasClass("edgtf-list-is-slider"), k = x ? i.parent() : i, S = !0;
            if (void 0 === i.data("number-of-items") || !1 === i.data("number-of-items") || x || (d = i.data("number-of-items")),
            void 0 !== k.data("number-of-columns") && !1 !== k.data("number-of-columns") && x)
                switch (k.data("number-of-columns")) {
                case "one":
                    d = 1;
                    break;
                case "two":
                    d = 2;
                    break;
                case "three":
                    d = 3;
                    break;
                case "four":
                    d = 4;
                    break;
                case "five":
                    d = 5;
                    break;
                case "six":
                    d = 6;
                    break;
                default:
                    d = 4
                }
            "no" === k.data("enable-loop") && (o = !1),
            "no" === k.data("enable-autoplay") && (n = !1),
            "no" === k.data("enable-autoplay-hover-pause") && (s = !1),
            void 0 !== k.data("slider-speed") && !1 !== k.data("slider-speed") && (r = k.data("slider-speed")),
            void 0 !== k.data("slider-speed-animation") && !1 !== k.data("slider-speed-animation") && (l = k.data("slider-speed-animation")),
            void 0 !== k.data("slider-margin") && !1 !== k.data("slider-margin") ? f = "no" === k.data("slider-margin") ? 0 : k.data("slider-margin") : i.parent().hasClass("edgtf-huge-space") ? f = 60 : i.parent().hasClass("edgtf-large-space") ? f = 50 : i.parent().hasClass("edgtf-medium-space") ? f = 40 : i.parent().hasClass("edgtf-normal-space") ? f = 30 : i.parent().hasClass("edgtf-small-space") ? f = 20 : i.parent().hasClass("edgtf-tiny-space") && (f = 10),
            "yes" === k.data("slider-padding") && (h = !0,
            u = parseInt(.28 * i.outerWidth()),
            f = 50),
            "yes" === k.data("enable-center") && (m = !0),
            "yes" === k.data("enable-auto-width") && (p = !0),
            void 0 !== k.data("slider-animate-in") && !1 !== k.data("slider-animate-in") && (v = k.data("slider-animate-in")),
            void 0 !== k.data("slider-animate-out") && !1 !== k.data("slider-animate-out") && (y = k.data("slider-animate-out")),
            "no" === k.data("enable-navigation") && (b = !1),
            "yes" === k.data("enable-pagination") && (w = !0),
            "yes" === k.data("enable-thumbnail") && (C = !0),
            C && !w && (w = !0,
            e.addClass("edgtf-slider-hide-pagination")),
            b && w && i.addClass("edgtf-slider-has-both-nav"),
            t <= 1 && (w = b = n = o = !1);
            var _ = 2
              , T = 3
              , I = d
              , O = d;
            d < 3 && (T = _ = d),
            4 < d && (I = 4),
            5 < d && (O = 5),
            (h || 30 < f) && (g = 20,
            c = 30),
            0 < f && f <= 30 && (c = g = f);
            function D() {
                if (x && i.hasClass("edgtf-ps-full-height")) {
                    s = !1;
                    var t, e = i.find(".owl-item"), a = A(".edgtf-page-header").outerHeight(), d = A(".edgtf-title-holder").outerHeight(), o = A(".edgtf-content-bottom").outerHeight();
                    A(".edgtf-header-sliding").length && (a = A(".edgtf-main-menu").outerHeight());
                    i.hasClass("edgtf-ps-full-height-decreased") ? (edgtf.windowWidth <= 1024 && (a = A(".edgtf-mobile-header").outerHeight()),
                    600 <= edgtf.windowWidth ? e.height(edgtf.windowHeight - a - d - o - 60) : e.height(edgtf.windowHeight)) : e.height(edgtf.windowHeight),
                    e.each(function() {
                        var e = A(this);
                        t = e.find(".edgtf-pli-image img").attr("src"),
                        e.find(".edgtf-pl-item-inner .edgtf-ps-fh-image").length || (e.find(".edgtf-pl-item-inner").append('<div class="edgtf-ps-fh-image"></div>'),
                        e.find(".edgtf-ps-fh-image").css("background-image", "url('" + t + "')"))
                    })
                }
            }
            if (A(window).resize(function() {
                D()
            }),
            i.waitForImages(function() {
                e = i.owlCarousel({
                    items: d,
                    loop: o,
                    autoplay: n,
                    autoplayHoverPause: s,
                    autoplayTimeout: r,
                    smartSpeed: l,
                    margin: f,
                    stagePadding: u,
                    center: m,
                    autoWidth: p,
                    animateIn: v,
                    animateOut: y,
                    dots: w,
                    nav: b,
                    navText: ['<span class="edgtf-prev-icon fa fa-angle-left"></span>', '<span class="edgtf-next-icon fa fa-angle-right"></span>'],
                    responsive: {
                        0: {
                            items: 1,
                            margin: g,
                            stagePadding: 0,
                            center: !1,
                            autoWidth: !1
                        },
                        681: {
                            items: _,
                            margin: c
                        },
                        769: {
                            items: T,
                            margin: c
                        },
                        1025: {
                            items: I
                        },
                        1281: {
                            items: O
                        },
                        1367: {
                            items: d
                        }
                    },
                    onInitialize: function() {
                        i.css("visibility", "visible"),
                        z(),
                        C && a.find(".edgtf-slider-thumbnail-item:first-child").addClass("active")
                    },
                    onInitialized: function() {
                        D(),
                        x && i.hasClass("edgtf-ps-full-height") && i.mousewheel(function(e) {
                            S && (e.preventDefault(),
                            e.deltaY < 0 ? i.trigger("next.owl.carousel", [600]) : i.trigger("prev.owl.carousel", [600]))
                        }),
                        i.css("visibility", "visible")
                    },
                    onTranslate: function(e) {
                        if (C) {
                            var t = e.page.index + 1;
                            a.find(".edgtf-slider-thumbnail-item.active").removeClass("active"),
                            a.find(".edgtf-slider-thumbnail-item:nth-child(" + t + ")").addClass("active")
                        }
                        S = !1
                    },
                    onTranslated: function() {
                        S = !0
                    },
                    onDrag: function(e) {
                        edgtf.body.hasClass("edgtf-smooth-page-transitions-fadeout") && 0 < e.isTrigger && i.addClass("edgtf-slider-is-moving")
                    },
                    onDragged: function() {
                        edgtf.body.hasClass("edgtf-smooth-page-transitions-fadeout") && i.hasClass("edgtf-slider-is-moving") && setTimeout(function() {
                            i.removeClass("edgtf-slider-is-moving")
                        }, 500)
                    }
                })
            }),
            C) {
                a = i.parent().find(".edgtf-slider-thumbnail");
                var H = "";
                switch (parseInt(a.data("thumbnail-count")) % 6) {
                case 2:
                    H = "two";
                    break;
                case 3:
                    H = "three";
                    break;
                case 4:
                    H = "four";
                    break;
                case 5:
                    H = "five";
                    break;
                case 0:
                default:
                    H = "six"
                }
                "" !== H && a.addClass("edgtf-slider-columns-" + H),
                a.find(".edgtf-slider-thumbnail-item").on("click", function() {
                    A(this).siblings(".active").removeClass("active"),
                    A(this).addClass("active"),
                    e.trigger("to.owl.carousel", [A(this).index(), l])
                })
            }
        })
    }
}(jQuery),
function(f) {
    "use strict";
    var e = {};
    function t() {
        g()
    }
    function a() {
        o().init(),
        function() {
            var e = f('[data-post-info-excerpt="yes"]');
            if (e.length) {
                e.each(function() {
                    var e = f(this).hasClass("edgtf-blog-slider") ? "slider" : "list";
                    !function(e, o) {
                        e.find(".edgtf-post-excerpt-holder").each(function() {
                            var e, t, a, d = f(this);
                            "slider" === o && (t = (e = d.closest(".edgtf-item-text-wrapper")).closest(".owl-item"),
                            a = d.outerHeight(!0) + parseInt(e.css("paddingTop"))),
                            "list" === o && (t = (e = d.closest(".edgtf-bli-content")).closest(".edgtf-bl-item"),
                            a = d.outerHeight()),
                            function(e, t, a, d) {
                                t.css({
                                    transform: "translate3d(0, " + d + "px, 0)",
                                    transition: ".5s cubic-bezier(0.23, 1, 0.32, 1)"
                                }),
                                e.css({
                                    opacity: 0,
                                    transition: "opacity .4s"
                                }),
                                a.css({
                                    overflow: "hidden"
                                }).on("mouseover", function() {
                                    t.css({
                                        transform: "translate3d(0, 0, 0)"
                                    }),
                                    e.css({
                                        opacity: 1
                                    })
                                }).on("mouseleave", function() {
                                    t.css({
                                        transform: "translate3d(0, " + d + "px, 0)"
                                    }),
                                    e.css({
                                        opacity: 0
                                    })
                                })
                            }(d, e, t, a)
                        })
                    }(f(this), e)
                })
            }
        }()
    }
    function d() {
        o().scroll()
    }
    function g() {
        var e = f("audio.edgtf-blog-audio");
        e.length && e.mediaelementplayer({
            audioWidth: "100%"
        })
    }
    function o() {
        function t(e) {
            var t = e.outerHeight() + e.offset().top - edgtfGlobalVars.vars.edgtfAddForAdminBar;
            !e.hasClass("edgtf-blog-pagination-infinite-scroll-started") && edgtf.scroll + edgtf.windowHeight > t && a(e)
        }
        var e = f(".edgtf-blog-holder")
          , a = function(a) {
            var d, e, o = a.children(".edgtf-blog-holder-inner");
            void 0 !== a.data("max-num-pages") && !1 !== a.data("max-num-pages") && (e = a.data("max-num-pages")),
            a.hasClass("edgtf-blog-pagination-infinite-scroll") && a.addClass("edgtf-blog-pagination-infinite-scroll-started");
            var t = edgtf.modules.common.getLoadMoreData(a)
              , i = a.find(".edgtf-blog-pag-loading");
            d = t.nextPage;
            var n = a.find('input[name*="edgtf_blog_load_more_nonce_"]');
            if (t.blog_load_more_id = n.attr("name").substring(n.attr("name").length - 4, n.attr("name").length),
            t.blog_load_more_nonce = n.val(),
            d <= e) {
                i.addClass("edgtf-showing");
                var s = edgtf.modules.common.setLoadMoreAjaxData(t, "playerx_edge_blog_load_more");
                f.ajax({
                    type: "POST",
                    data: s,
                    url: edgtfGlobalVars.vars.edgtfAjaxUrl,
                    success: function(e) {
                        d++,
                        a.data("next-page", d);
                        var t = f.parseJSON(e).html;
                        a.waitForImages(function() {
                            a.hasClass("edgtf-grid-masonry-list") ? (r(o, i, t),
                            edgtf.modules.common.setFixedImageProportionSize(a, a.find("article"), o.find(".edgtf-masonry-grid-sizer").width())) : l(o, i, t),
                            setTimeout(function() {
                                g(),
                                edgtf.modules.common.edgtfOwlSlider(),
                                edgtf.modules.common.edgtfFluidVideo(),
                                edgtf.modules.common.edgtfInitSelfHostedVideoPlayer(),
                                edgtf.modules.common.edgtfSelfHostedVideoSize(),
                                "function" == typeof edgtf.modules.common.edgtfStickySidebarWidget && edgtf.modules.common.edgtfStickySidebarWidget().reInit(),
                                f(document.body).trigger("blog_list_load_more_trigger")
                            }, 400)
                        }),
                        a.hasClass("edgtf-blog-pagination-infinite-scroll-started") && a.removeClass("edgtf-blog-pagination-infinite-scroll-started")
                    }
                })
            }
            d === e && a.find(".edgtf-blog-pag-load-more").hide()
        }
          , r = function(e, t, a) {
            e.append(a).isotope("reloadItems").isotope({
                sortBy: "original-order"
            }),
            t.removeClass("edgtf-showing"),
            setTimeout(function() {
                e.isotope("layout")
            }, 600)
        }
          , l = function(e, t, a) {
            t.removeClass("edgtf-showing"),
            e.append(a)
        };
        return {
            init: function() {
                e.length && e.each(function() {
                    var e = f(this);
                    e.hasClass("edgtf-blog-pagination-load-more") && function(t) {
                        t.find(".edgtf-blog-pag-load-more a").on("click", function(e) {
                            e.preventDefault(),
                            e.stopPropagation(),
                            a(t)
                        })
                    }(e),
                    e.hasClass("edgtf-blog-pagination-infinite-scroll") && t(e)
                })
            },
            scroll: function() {
                e.length && e.each(function() {
                    var e = f(this);
                    e.hasClass("edgtf-blog-pagination-infinite-scroll") && t(e)
                })
            }
        }
    }
    (edgtf.modules.blog = e).edgtfOnDocumentReady = t,
    e.edgtfOnWindowLoad = a,
    e.edgtfOnWindowScroll = d,
    f(document).ready(t),
    f(window).load(a),
    f(window).scroll(d)
}(jQuery),
function(o) {
    "use strict";
    var e = {};
    function t() {
        !function() {
            if (o("body:not(.error404) .edgtf-footer-uncover").length && !edgtf.htmlEl.hasClass("touch")) {
                var e = o("footer")
                  , t = e.outerHeight()
                  , a = o(".edgtf-content")
                  , d = function() {
                    a.css("margin-bottom", t),
                    e.css("height", t)
                };
                d(),
                o(window).resize(function() {
                    t = e.find(".edgtf-footer-inner").outerHeight(),
                    d()
                })
            }
        }()
    }
    (edgtf.modules.footer = e).edgtfOnWindowLoad = t,
    o(window).load(t)
}(jQuery),
function(r) {
    "use strict";
    var e = {};
    function t() {
        d(),
        setTimeout(function() {
            r(".edgtf-drop-down > ul > li").each(function() {
                var n = r(this);
                n.find(".second").length && n.waitForImages(function() {
                    var e = n.find(".second")
                      , t = edgtf.menuDropdownHeightSet ? 0 : e.outerHeight();
                    if (n.hasClass("wide")) {
                        var a = 0
                          , d = e.find("> .inner > ul > li");
                        d.each(function() {
                            var e = r(this).outerHeight();
                            a < e && (a = e)
                        }),
                        d.css("height", "").height(a),
                        edgtf.menuDropdownHeightSet || (t = e.outerHeight())
                    }
                    if (edgtf.menuDropdownHeightSet || e.height(0),
                    navigator.userAgent.match(/(iPod|iPhone|iPad)/))
                        n.on("touchstart mouseenter", function() {
                            e.css({
                                height: t,
                                overflow: "visible",
                                visibility: "visible",
                                opacity: "1"
                            })
                        }).on("mouseleave", function() {
                            e.css({
                                height: "0px",
                                overflow: "hidden",
                                visibility: "hidden",
                                opacity: "0"
                            })
                        });
                    else if (edgtf.body.hasClass("edgtf-dropdown-animate-height")) {
                        var o = {
                            interval: 0,
                            over: function() {
                                setTimeout(function() {
                                    e.addClass("edgtf-drop-down-start").css({
                                        visibility: "visible",
                                        height: "0",
                                        opacity: "1"
                                    }),
                                    e.stop().animate({
                                        height: t
                                    }, 400, "easeInOutQuint", function() {
                                        e.css("overflow", "visible")
                                    })
                                }, 100)
                            },
                            timeout: 100,
                            out: function() {
                                e.stop().animate({
                                    height: "0",
                                    opacity: 0
                                }, 100, function() {
                                    e.css({
                                        overflow: "hidden",
                                        visibility: "hidden"
                                    })
                                }),
                                e.removeClass("edgtf-drop-down-start")
                            }
                        };
                        n.hoverIntent(o)
                    } else if (edgtf.body.hasClass("edgtf-dropdown-slide-from-bottom"))
                        o = {
                            interval: 0,
                            over: function() {
                                setTimeout(function() {
                                    e.addClass("edgtf-drop-down-start").css({
                                        visibility: "visible",
                                        top: "150%",
                                        opacity: "0",
                                        height: t
                                    }),
                                    e.stop().animate({
                                        opacity: 1,
                                        top: "100%"
                                    }, 400, "easeOutExpo", function() {
                                        e.css("overflow", "visible")
                                    })
                                }, 100)
                            },
                            timeout: 100,
                            out: function() {
                                e.stop().animate({
                                    opacity: 0,
                                    top: "150%"
                                }, 100, function() {
                                    e.css({
                                        overflow: "hidden",
                                        visibility: "hidden",
                                        height: "0"
                                    })
                                }),
                                e.removeClass("edgtf-drop-down-start")
                            }
                        },
                        n.hoverIntent(o);
                    else {
                        var i = {
                            interval: 0,
                            over: function() {
                                setTimeout(function() {
                                    e.addClass("edgtf-drop-down-start").stop().css({
                                        height: t
                                    })
                                }, 150)
                            },
                            timeout: 150,
                            out: function() {
                                e.stop().css({
                                    height: "0"
                                }).removeClass("edgtf-drop-down-start")
                            }
                        };
                        n.hoverIntent(i)
                    }
                })
            }),
            r(".edgtf-drop-down ul li.wide ul li a").on("click", function(e) {
                if (1 === e.which) {
                    var t = r(this);
                    setTimeout(function() {
                        t.mouseleave()
                    }, 500)
                }
            }),
            edgtf.menuDropdownHeightSet = !0
        }, 100)
    }
    function a() {
        o()
    }
    function d() {
        var e = r(".edgtf-drop-down > ul > li.narrow.menu-item-has-children");
        e.length && e.each(function(e) {
            var t, a = r(this), d = a.offset().left, o = a.find(".second"), i = o.find(".inner ul"), n = i.outerWidth(), s = edgtf.windowWidth - d;
            edgtf.body.hasClass("edgtf-boxed") && (s = edgtf.boxedLayoutWidth - (d - (edgtf.windowWidth - edgtf.boxedLayoutWidth) / 2)),
            0 < a.find("li.sub").length && (t = s - n),
            o.removeClass("right"),
            i.removeClass("right"),
            (s < n || t < n) && (o.addClass("right"),
            i.addClass("right"))
        })
    }
    function o() {
        var e = r(".edgtf-drop-down > ul > li.wide");
        e.length && e.each(function(e) {
            var t = r(this).find(".second");
            if (t.length && !t.hasClass("left_position") && !t.hasClass("right_position")) {
                t.css("left", 0);
                var a = t.offset().left;
                if (edgtf.body.hasClass("edgtf-boxed")) {
                    var d = r(".edgtf-boxed .edgtf-wrapper .edgtf-wrapper-inner").outerWidth();
                    a -= (edgtf.windowWidth - d) / 2,
                    t.css({
                        left: -a,
                        width: d
                    })
                } else
                    edgtf.body.hasClass("edgtf-wide-dropdown-menu-in-grid") ? t.css({
                        left: -a + (edgtf.windowWidth - edgtf.gridWidth()) / 2,
                        width: edgtf.gridWidth()
                    }) : t.css({
                        left: -a,
                        width: edgtf.windowWidth
                    })
            }
        })
    }
    (edgtf.modules.header = e).edgtfSetDropDownMenuPosition = d,
    e.edgtfSetDropDownWideMenuPosition = o,
    e.edgtfOnDocumentReady = t,
    e.edgtfOnWindowLoad = a,
    r(document).ready(t),
    r(window).load(a)
}(jQuery),
function(i) {
    "use strict";
    function e() {
        i(document).on("click", ".edgtf-like", function() {
            var t = i(this)
              , e = t.attr("id")
              , a = t.data("post-id")
              , d = "";
            if (t.hasClass("liked"))
                return !1;
            void 0 !== t.data("type") && (d = t.data("type"));
            var o = {
                action: "playerx_edge_like",
                likes_id: e,
                type: d,
                like_nonce: i("#edgtf_like_nonce_" + a).val()
            };
            return i.post(edgtfGlobalVars.vars.edgtfAjaxUrl, o, function(e) {
                t.html(e).addClass("liked").attr("title", "You already like this!")
            }),
            !1
        })
    }
    i(document).ready(e)
}(jQuery),
function(f) {
    "use strict";
    var e = {};
    function t() {
        !function() {
            var d, o = f(".edgtf-wrapper"), i = f(".edgtf-side-menu"), n = f("a.edgtf-side-menu-button-opener"), s = !1, r = !1, l = !1;
            edgtf.body.hasClass("edgtf-side-menu-slide-from-right") ? (f(".edgtf-cover").remove(),
            d = "edgtf-right-side-menu-opened",
            o.prepend('<div class="edgtf-cover"/>'),
            s = !0) : edgtf.body.hasClass("edgtf-side-menu-slide-with-content") ? (d = "edgtf-side-menu-open",
            r = !0) : edgtf.body.hasClass("edgtf-side-area-uncovered-from-content") && (d = "edgtf-right-side-menu-opened",
            l = !0);
            f("a.edgtf-side-menu-button-opener, a.edgtf-close-side-menu").on("click", function(e) {
                if (e.preventDefault(),
                n.hasClass("opened")) {
                    if (n.removeClass("opened"),
                    edgtf.body.removeClass(d),
                    l)
                        var t = setTimeout(function() {
                            i.css({
                                visibility: "hidden"
                            }),
                            clearTimeout(t)
                        }, 400)
                } else {
                    n.addClass("opened"),
                    edgtf.body.addClass(d),
                    s && f(".edgtf-wrapper .edgtf-cover").on("click", function() {
                        edgtf.body.removeClass("edgtf-right-side-menu-opened"),
                        n.removeClass("opened")
                    }),
                    l && i.css({
                        visibility: "visible"
                    });
                    var a = f(window).scrollTop();
                    f(window).scroll(function() {
                        if (400 < Math.abs(edgtf.scroll - a) && (edgtf.body.removeClass(d),
                        n.removeClass("opened"),
                        l))
                            var e = setTimeout(function() {
                                i.css({
                                    visibility: "hidden"
                                }),
                                clearTimeout(e)
                            }, 400)
                    })
                }
                r && (e.stopPropagation(),
                o.on("click", function() {
                    e.preventDefault(),
                    n.removeClass("opened"),
                    edgtf.body.removeClass("edgtf-side-menu-open")
                }))
            })
        }(),
        function() {
            var e = f(".edgtf-side-menu");
            e.length && e.perfectScrollbar({
                wheelSpeed: .6,
                suppressScrollX: !0
            })
        }()
    }
    (edgtf.modules.sidearea = e).edgtfOnDocumentReady = t,
    f(document).ready(t)
}(jQuery),
function(s) {
    "use strict";
    var e = {};
    function t() {
        !function() {
            var e = s(".edgtf-title-holder.edgtf-bg-parallax");
            if (0 < e.length && 1024 < edgtf.windowWidth) {
                var t = e.hasClass("edgtf-bg-parallax-zoom-out")
                  , a = parseInt(e.data("height"))
                  , d = parseInt(e.data("background-width"))
                  , o = edgtfGlobalVars.vars.edgtfAddForAdminBar;
                a || (a = e.height());
                var i = a / 1e4 * 7
                  , n = -edgtf.scroll * i;
                e.css({
                    "background-position": "center " + (n + o) + "px"
                }),
                t && t.css({
                    "background-size": d - edgtf.scroll + "px auto"
                }),
                s(window).scroll(function() {
                    n = -edgtf.scroll * i,
                    e.css({
                        "background-position": "center " + (n + o) + "px"
                    }),
                    t && t.css({
                        "background-size": d - edgtf.scroll + "px auto"
                    })
                })
            }
        }()
    }
    (edgtf.modules.title = e).edgtfOnDocumentReady = t,
    s(document).ready(t)
}(jQuery),
function(r) {
    "use strict";
    var e = {};
    function t() {
        r(document).on("click", ".edgtf-quantity-minus, .edgtf-quantity-plus", function(e) {
            e.stopPropagation();
            var t, a = r(this), d = a.siblings(".edgtf-quantity-input"), o = parseFloat(d.data("step")), i = parseFloat(d.data("max")), n = !1, s = parseFloat(d.val());
            a.hasClass("edgtf-quantity-minus") && (n = !0),
            n ? 1 <= (t = s - o) ? d.val(t) : d.val(0) : (t = s + o,
            void 0 === i ? d.val(t) : i <= t ? d.val(i) : d.val(t)),
            d.trigger("change")
        }),
        function() {
            var e = r(".woocommerce-ordering .orderby");
            e.length && e.select2({
                minimumResultsForSearch: 1 / 0
            });
            var t = r(".edgtf-woocommerce-page .edgtf-content .variations td.value select");
            t.length && t.select2();
            var a = r("#calc_shipping_country");
            a.length && a.select2();
            var d = r(".cart-collaterals .shipping select#calc_shipping_state");
            d.length && d.select2()
        }(),
        function() {
            var e = r(".edgtf-woo-single-page.edgtf-woo-single-has-pretty-photo .images .woocommerce-product-gallery__image");
            e.length && (e.children("a").attr("data-rel", "prettyPhoto[woo_single_pretty_photo]"),
            "function" == typeof edgtf.modules.common.edgtfPrettyPhoto && edgtf.modules.common.edgtfPrettyPhoto())
        }()
    }
    (edgtf.modules.woocommerce = e).edgtfOnDocumentReady = t,
    r(document).ready(t)
}(jQuery),
function(h) {
    "use strict";
    var e = {};
    function t() {
        d().init()
    }
    function a() {
        d().scroll()
    }
    function d() {
        function t(e) {
            var t = e.outerHeight() + e.offset().top - edgtfGlobalVars.vars.edgtfAddForAdminBar;
            !e.hasClass("edgtf-bl-pag-infinite-scroll-started") && edgtf.scroll + edgtf.windowHeight > t && o(e)
        }
        var e = h(".edgtf-blog-list-holder")
          , o = function(a, e) {
            var d, o, i = a.find(".edgtf-blog-list");
            void 0 !== a.data("max-num-pages") && !1 !== a.data("max-num-pages") && (o = a.data("max-num-pages")),
            a.hasClass("edgtf-bl-pag-standard-shortcodes") && a.data("next-page", e),
            a.hasClass("edgtf-bl-pag-infinite-scroll") && a.addClass("edgtf-bl-pag-infinite-scroll-started");
            var t = edgtf.modules.common.getLoadMoreData(a)
              , n = a.find(".edgtf-blog-pag-loading");
            d = t.nextPage;
            var s = a.find('input[name*="edgtf_blog_load_more_nonce_"]');
            if (t.blog_load_more_id = s.attr("name").substring(s.attr("name").length - 4, s.attr("name").length),
            t.blog_load_more_nonce = s.val(),
            d <= o) {
                a.hasClass("edgtf-bl-pag-standard-shortcodes") ? (n.addClass("edgtf-showing edgtf-standard-pag-trigger"),
                a.addClass("edgtf-bl-pag-standard-shortcodes-animate")) : n.addClass("edgtf-showing");
                var r = edgtf.modules.common.setLoadMoreAjaxData(t, "playerx_edge_blog_shortcode_load_more");
                h.ajax({
                    type: "POST",
                    data: r,
                    url: edgtfGlobalVars.vars.edgtfAjaxUrl,
                    success: function(e) {
                        a.hasClass("edgtf-bl-pag-standard-shortcodes") || d++,
                        a.data("next-page", d);
                        var t = h.parseJSON(e).html;
                        a.hasClass("edgtf-bl-pag-standard-shortcodes") ? (l(a, o, d),
                        a.waitForImages(function() {
                            a.hasClass("edgtf-bl-masonry") ? f(a, i, n, t) : (g(a, i, n, t),
                            "function" == typeof edgtf.modules.common.edgtfStickySidebarWidget && edgtf.modules.common.edgtfStickySidebarWidget().reInit())
                        })) : a.waitForImages(function() {
                            a.hasClass("edgtf-bl-masonry") ? c(i, n, t) : (u(i, n, t),
                            "function" == typeof edgtf.modules.common.edgtfStickySidebarWidget && edgtf.modules.common.edgtfStickySidebarWidget().reInit())
                        }),
                        a.hasClass("edgtf-bl-pag-infinite-scroll-started") && a.removeClass("edgtf-bl-pag-infinite-scroll-started")
                    }
                })
            }
            d === o && a.find(".edgtf-blog-pag-load-more").hide()
        }
          , l = function(e, t, a) {
            var d = e.find(".edgtf-bl-standard-pagination")
              , o = d.find("li.edgtf-pag-number")
              , i = d.find("li.edgtf-pag-prev a")
              , n = d.find("li.edgtf-pag-next a");
            o.removeClass("edgtf-pag-active"),
            o.eq(a - 1).addClass("edgtf-pag-active"),
            i.data("paged", a - 1),
            n.data("paged", a + 1),
            1 < a ? i.css({
                opacity: "1"
            }) : i.css({
                opacity: "0"
            }),
            a === t ? n.css({
                opacity: "0"
            }) : n.css({
                opacity: "1"
            })
        }
          , f = function(e, t, a, d) {
            t.html(d).isotope("reloadItems").isotope({
                sortBy: "original-order"
            }),
            a.removeClass("edgtf-showing edgtf-standard-pag-trigger"),
            e.removeClass("edgtf-bl-pag-standard-shortcodes-animate"),
            setTimeout(function() {
                t.isotope("layout"),
                "function" == typeof edgtf.modules.common.edgtfStickySidebarWidget && edgtf.modules.common.edgtfStickySidebarWidget().reInit()
            }, 600)
        }
          , g = function(e, t, a, d) {
            a.removeClass("edgtf-showing edgtf-standard-pag-trigger"),
            e.removeClass("edgtf-bl-pag-standard-shortcodes-animate"),
            t.html(d)
        }
          , c = function(e, t, a) {
            e.append(a).isotope("reloadItems").isotope({
                sortBy: "original-order"
            }),
            t.removeClass("edgtf-showing"),
            setTimeout(function() {
                e.isotope("layout"),
                "function" == typeof edgtf.modules.common.edgtfStickySidebarWidget && edgtf.modules.common.edgtfStickySidebarWidget().reInit()
            }, 600)
        }
          , u = function(e, t, a) {
            t.removeClass("edgtf-showing"),
            e.append(a)
        };
        return {
            init: function() {
                e.length && e.each(function() {
                    var e = h(this);
                    e.hasClass("edgtf-bl-pag-standard-shortcodes") && function(d) {
                        var e = d.find(".edgtf-bl-standard-pagination li");
                        e.length && e.each(function() {
                            var t = h(this).children("a")
                              , a = 1;
                            t.on("click", function(e) {
                                e.preventDefault(),
                                e.stopPropagation(),
                                void 0 !== t.data("paged") && !1 !== t.data("paged") && (a = t.data("paged")),
                                o(d, a)
                            })
                        })
                    }(e),
                    e.hasClass("edgtf-bl-pag-load-more") && function(t) {
                        t.find(".edgtf-blog-pag-load-more a").on("click", function(e) {
                            e.preventDefault(),
                            e.stopPropagation(),
                            o(t)
                        })
                    }(e),
                    e.hasClass("edgtf-bl-pag-infinite-scroll") && t(e)
                })
            },
            scroll: function() {
                e.length && e.each(function() {
                    var e = h(this);
                    e.hasClass("edgtf-bl-pag-infinite-scroll") && t(e)
                })
            }
        }
    }
    (edgtf.modules.blogListSC = e).edgtfOnWindowLoad = t,
    e.edgtfOnWindowScroll = a,
    h(window).load(t),
    h(window).scroll(a)
}(jQuery),
function(e) {
    "use strict";
    var t = {};
    function a() {
        o()
    }
    function d() {
        o()
    }
    function o() {
        if (edgtf.body.hasClass("edgtf-header-divided")) {
            var t = e(".edgtf-menu-area, .edgtf-sticky-header")
              , a = t.width()
              , d = parseInt(t.children(".edgtf-vertical-align-containers").css("paddingLeft"), 10)
              , o = e(".edgtf-main-menu > ul > li > a")
              , i = t.find(".edgtf-logo-wrapper")
              , n = 0;
            t.waitForImages(function() {
                t.find(".edgtf-grid").length && (a = t.find(".edgtf-grid").outerWidth()),
                o.length && parseInt(o.css("paddingLeft"), 10),
                i.length && (n = i.width() / 2);
                var e = Math.round(a / 2 - n - d);
                t.find(".edgtf-position-left").width(e),
                t.find(".edgtf-position-right").width(e),
                t.css("opacity", 1),
                "function" == typeof edgtf.modules.header.edgtfSetDropDownMenuPosition && edgtf.modules.header.edgtfSetDropDownMenuPosition(),
                "function" == typeof edgtf.modules.header.edgtfSetDropDownWideMenuPosition && edgtf.modules.header.edgtfSetDropDownWideMenuPosition()
            })
        }
    }
    (edgtf.modules.headerDivided = t).edgtfOnDocumentReady = a,
    t.edgtfOnWindowResize = d,
    e(document).ready(a),
    e(window).resize(d)
}(jQuery),
function(n) {
    "use strict";
    var e = {};
    function t() {
        a().init()
    }
    (edgtf.modules.headerVertical = e).edgtfOnDocumentReady = t,
    n(document).ready(t);
    var a = function() {
        function e() {
            t.hasClass("edgtf-with-scroll") && t.perfectScrollbar({
                wheelSpeed: .6,
                suppressScrollX: !0
            })
        }
        var t = n(".edgtf-vertical-menu-area");
        return {
            init: function() {
                t.length && (function() {
                    var d, o, i, e = t.find(".edgtf-vertical-menu");
                    e.hasClass("edgtf-vertical-dropdown-below") ? (i = e.find("ul li.menu-item-has-children")).each(function() {
                        var t = n(this).find(" > .second, > ul")
                          , a = this
                          , d = n(this).find("> a")
                          , o = "fast";
                        d.on("click tap", function(e) {
                            e.preventDefault(),
                            e.stopPropagation(),
                            t.is(":visible") ? (n(a).removeClass("open"),
                            t.slideUp(o)) : (d.parent().parent().children().hasClass("open") && d.parent().parent().parent().hasClass("edgtf-vertical-menu") ? (n(this).parent().parent().children().removeClass("open"),
                            n(this).parent().parent().children().find(" > .second").slideUp(o)) : (n(this).parents("li").hasClass("open") || (i.removeClass("open"),
                            i.find(" > .second, > ul").slideUp(o)),
                            n(this).parent().parent().children().hasClass("open") && (n(this).parent().parent().children().removeClass("open"),
                            n(this).parent().parent().children().find(" > .second, > ul").slideUp(o))),
                            n(a).addClass("open"),
                            t.slideDown("fast"))
                        })
                    }) : e.hasClass("edgtf-vertical-dropdown-side") && (d = e.find("ul li.menu-item-has-children"),
                    o = d.find(" > .second > .inner > ul, > ul"),
                    d.each(function() {
                        var t = n(this).find(" > .second > .inner > ul, > ul")
                          , a = this;
                        Modernizr.touch ? n(this).find("> a").on("click tap", function(e) {
                            e.preventDefault(),
                            e.stopPropagation(),
                            t.hasClass("edgtf-float-open") ? (t.removeClass("edgtf-float-open"),
                            n(a).removeClass("open")) : (n(this).parents("li").hasClass("open") || (d.removeClass("open"),
                            o.removeClass("edgtf-float-open")),
                            t.addClass("edgtf-float-open"),
                            n(a).addClass("open"))
                        }) : n(this).hoverIntent({
                            over: function() {
                                t.addClass("edgtf-float-open"),
                                n(a).addClass("open")
                            },
                            out: function() {
                                t.removeClass("edgtf-float-open"),
                                n(a).removeClass("open")
                            },
                            timeout: 300
                        })
                    }))
                }(),
                e())
            }
        }
    }
}(jQuery),
function(s) {
    "use strict";
    var e = {};
    function t() {
        !function() {
            var t = s(".edgtf-mobile-header .edgtf-mobile-menu-opener")
              , n = s(".edgtf-mobile-header .edgtf-mobile-nav")
              , e = s(".edgtf-mobile-nav .mobile_arrow, .edgtf-mobile-nav h6, .edgtf-mobile-nav a.edgtf-mobile-no-link");
            t.length && n.length && t.on("tap click", function(e) {
                e.stopPropagation(),
                e.preventDefault(),
                n.is(":visible") ? (n.slideUp(450, "easeInOutQuint"),
                t.removeClass("edgtf-mobile-menu-opened")) : (n.slideDown(450, "easeInOutQuint"),
                t.addClass("edgtf-mobile-menu-opened"))
            });
            e.length && e.each(function() {
                var o = s(this)
                  , i = n.outerHeight();
                o.on("tap click", function(e) {
                    var t = o.parent("li")
                      , a = t.siblings(".menu-item-has-children");
                    if (t.hasClass("has_sub")) {
                        var d = t.find("> ul.sub_menu");
                        d.is(":visible") ? (d.slideUp(450, "easeInOutQuint"),
                        t.removeClass("edgtf-opened"),
                        n.stop().animate({
                            height: i
                        }, 300)) : (t.addClass("edgtf-opened"),
                        0 === a.length ? t.find(".sub_menu").slideUp(400, "easeInOutQuint", function() {
                            d.slideDown(400, "easeInOutQuint"),
                            n.stop().animate({
                                height: i + 50
                            }, 300)
                        }) : t.siblings().removeClass("edgtf-opened").find(".sub_menu").slideUp(400, "easeInOutQuint", function() {
                            d.slideDown(400, "easeInOutQuint"),
                            n.stop().animate({
                                height: i + 50
                            }, 300)
                        }))
                    }
                })
            });
            s(".edgtf-mobile-nav a, .edgtf-mobile-logo-wrapper a").on("click tap", function(e) {
                "http://#" !== s(this).attr("href") && "#" !== s(this).attr("href") && (n.slideUp(450, "easeInOutQuint"),
                t.removeClass("edgtf-mobile-menu-opened"))
            })
        }(),
        d(),
        function() {
            var t = s(".edgtf-mobile-header")
              , a = t.find(".edgtf-mobile-menu-opener")
              , e = t.length ? t.outerHeight() : 0;
            edgtf.body.hasClass("edgtf-content-is-behind-header") && 0 < e && edgtf.windowWidth <= 1024 && s(".edgtf-content").css("marginTop", -e);
            if (edgtf.body.hasClass("edgtf-sticky-up-mobile-header")) {
                var d, o = s("#wpadminbar"), i = s(document).scrollTop();
                d = e + edgtfGlobalVars.vars.edgtfAddForAdminBar,
                s(window).scroll(function() {
                    var e = s(document).scrollTop();
                    d < e ? t.addClass("edgtf-animate-mobile-header") : t.removeClass("edgtf-animate-mobile-header"),
                    i < e && d < e && !a.hasClass("edgtf-mobile-menu-opened") || e < d ? (t.removeClass("mobile-header-appear"),
                    t.css("margin-bottom", 0),
                    o.length && t.find(".edgtf-mobile-header-inner").css("top", 0)) : (t.addClass("mobile-header-appear"),
                    t.css("margin-bottom", d)),
                    i = s(document).scrollTop()
                })
            }
        }()
    }
    function a() {
        d()
    }
    function d() {
        if (edgtf.windowWidth <= 1024) {
            var e = s(".edgtf-mobile-header")
              , t = e.length ? e.height() : 0
              , a = e.find(".edgtf-mobile-nav")
              , d = a.outerHeight()
              , o = edgtf.windowHeight - 100
              , i = o < t + d ? o - t : d;
            a.height(i).perfectScrollbar({
                wheelSpeed: .6,
                suppressScrollX: !0
            })
        }
    }
    (edgtf.modules.mobileHeader = e).edgtfOnDocumentReady = t,
    e.edgtfOnWindowResize = a,
    s(document).ready(t),
    s(window).resize(a)
}(jQuery),
function(g) {
    "use strict";
    var e = {};
    function t() {
        1024 < edgtf.windowWidth && function() {
            var t, e, a = g(".edgtf-page-header"), d = g(".edgtf-sticky-header"), o = g(".edgtf-fixed-wrapper"), i = o.children(".edgtf-menu-area").outerHeight(), n = g(".edgtf-slider"), s = n.length ? n.outerHeight() : 0, r = o.length ? o.offset().top - edgtfGlobalVars.vars.edgtfAddForAdminBar : 0;
            switch (!0) {
            case edgtf.body.hasClass("edgtf-sticky-header-on-scroll-up"):
                edgtf.modules.stickyHeader.behaviour = "edgtf-sticky-header-on-scroll-up";
                var l = g(document).scrollTop();
                t = parseInt(edgtfGlobalVars.vars.edgtfTopBarHeight) + parseInt(edgtfGlobalVars.vars.edgtfLogoAreaHeight) + parseInt(edgtfGlobalVars.vars.edgtfMenuAreaHeight) + parseInt(edgtfGlobalVars.vars.edgtfStickyHeaderHeight),
                (e = function() {
                    var e = g(document).scrollTop();
                    l < e && t < e || e < t ? (edgtf.modules.stickyHeader.isStickyVisible = !1,
                    d.removeClass("header-appear").find(".edgtf-main-menu .second").removeClass("edgtf-drop-down-start"),
                    edgtf.body.removeClass("edgtf-sticky-header-appear")) : (edgtf.modules.stickyHeader.isStickyVisible = !0,
                    d.addClass("header-appear"),
                    edgtf.body.addClass("edgtf-sticky-header-appear")),
                    l = g(document).scrollTop()
                }
                )(),
                g(window).scroll(function() {
                    e()
                });
                break;
            case edgtf.body.hasClass("edgtf-sticky-header-on-scroll-down-up"):
                edgtf.modules.stickyHeader.behaviour = "edgtf-sticky-header-on-scroll-down-up",
                0 !== edgtfPerPageVars.vars.edgtfStickyScrollAmount ? edgtf.modules.stickyHeader.stickyAppearAmount = parseInt(edgtfPerPageVars.vars.edgtfStickyScrollAmount) : edgtf.modules.stickyHeader.stickyAppearAmount = parseInt(edgtfGlobalVars.vars.edgtfTopBarHeight) + parseInt(edgtfGlobalVars.vars.edgtfLogoAreaHeight) + parseInt(edgtfGlobalVars.vars.edgtfMenuAreaHeight) + parseInt(s),
                (e = function() {
                    edgtf.scroll < edgtf.modules.stickyHeader.stickyAppearAmount ? (edgtf.modules.stickyHeader.isStickyVisible = !1,
                    d.removeClass("header-appear").find(".edgtf-main-menu .second").removeClass("edgtf-drop-down-start"),
                    edgtf.body.removeClass("edgtf-sticky-header-appear")) : (edgtf.modules.stickyHeader.isStickyVisible = !0,
                    d.addClass("header-appear"),
                    edgtf.body.addClass("edgtf-sticky-header-appear"))
                }
                )(),
                g(window).scroll(function() {
                    e()
                });
                break;
            case edgtf.body.hasClass("edgtf-fixed-on-scroll"):
                edgtf.modules.stickyHeader.behaviour = "edgtf-fixed-on-scroll";
                var f = function() {
                    edgtf.scroll <= r ? (o.removeClass("fixed"),
                    edgtf.body.removeClass("edgtf-fixed-header-appear"),
                    a.css("margin-bottom", "0")) : (o.addClass("fixed"),
                    edgtf.body.addClass("edgtf-fixed-header-appear"),
                    a.css("margin-bottom", i + "px"))
                };
                f(),
                g(window).scroll(function() {
                    f()
                })
            }
        }()
    }
    (edgtf.modules.stickyHeader = e).isStickyVisible = !1,
    e.stickyAppearAmount = 0,
    e.behaviour = "",
    e.edgtfOnDocumentReady = t,
    g(document).ready(t)
}(jQuery),
function(c) {
    "use strict";
    var e = {};
    function t() {
        !function() {
            if (edgtf.body.hasClass("edgtf-search-covers-header")) {
                var e = c("a.edgtf-search-opener");
                0 < e.length && e.each(function() {
                    c(this).on("click", function(e) {
                        e.preventDefault();
                        var t, a = c(this), d = c(".edgtf-page-header"), o = c(".edgtf-top-bar"), i = d.find(".edgtf-fixed-wrapper.fixed"), n = c(".edgtf-mobile-header"), s = c(".edgtf-search-cover"), r = !!a.parents(".edgtf-top-bar").length, l = !!a.parents(".edgtf-fixed-wrapper.fixed").length, f = !!a.parents(".edgtf-sticky-header").length, g = !!a.parents(".edgtf-mobile-header").length;
                        s.removeClass("edgtf-is-active"),
                        r ? (t = edgtfGlobalVars.vars.edgtfTopBarHeight,
                        o.find(".edgtf-search-cover").addClass("edgtf-is-active")) : l ? (t = i.outerHeight(),
                        d.children(".edgtf-search-cover").addClass("edgtf-is-active")) : f ? (t = d.find(".edgtf-sticky-header").outerHeight(),
                        d.children(".edgtf-search-cover").addClass("edgtf-is-active")) : g ? (t = n.hasClass("mobile-header-appear") ? n.children(".edgtf-mobile-header-inner").outerHeight() : n.outerHeight(),
                        n.find(".edgtf-search-cover").addClass("edgtf-is-active")) : (t = d.outerHeight(),
                        d.children(".edgtf-search-cover").addClass("edgtf-is-active")),
                        s.hasClass("edgtf-is-active") && s.height(t).stop(!0).fadeIn(600).find('input[type="text"]').focus(),
                        s.find(".edgtf-search-close").on("click", function(e) {
                            e.preventDefault(),
                            s.stop(!0).fadeOut(450)
                        }),
                        s.blur(function() {
                            s.stop(!0).fadeOut(450)
                        }),
                        c(window).scroll(function() {
                            s.stop(!0).fadeOut(450)
                        })
                    })
                })
            }
        }()
    }
    (edgtf.modules.searchCoversHeader = e).edgtfOnDocumentReady = t,
    c(document).ready(t)
}(jQuery),
function(i) {
    "use strict";
    var e = {};
    function t() {
        !function() {
            if (edgtf.body.hasClass("edgtf-fullscreen-search")) {
                var e = i("a.edgtf-search-opener");
                if (0 < e.length) {
                    var a = i(".edgtf-fullscreen-search-holder")
                      , t = i(".edgtf-search-close");
                    e.on("click", function(e) {
                        e.preventDefault(),
                        a.hasClass("edgtf-animate") ? (edgtf.body.removeClass("edgtf-fullscreen-search-opened edgtf-search-fade-out"),
                        edgtf.body.removeClass("edgtf-search-fade-in"),
                        a.removeClass("edgtf-animate"),
                        setTimeout(function() {
                            a.find(".edgtf-search-field").val(""),
                            a.find(".edgtf-search-field").blur()
                        }, 300),
                        edgtf.modules.common.edgtfEnableScroll()) : (edgtf.body.addClass("edgtf-fullscreen-search-opened edgtf-search-fade-in"),
                        edgtf.body.removeClass("edgtf-search-fade-out"),
                        a.addClass("edgtf-animate"),
                        setTimeout(function() {
                            a.find(".edgtf-search-field").focus()
                        }, 900),
                        edgtf.modules.common.edgtfDisableScroll()),
                        t.on("click", function(e) {
                            e.preventDefault(),
                            edgtf.body.removeClass("edgtf-fullscreen-search-opened edgtf-search-fade-in"),
                            edgtf.body.addClass("edgtf-search-fade-out"),
                            a.removeClass("edgtf-animate"),
                            setTimeout(function() {
                                a.find(".edgtf-search-field").val(""),
                                a.find(".edgtf-search-field").blur()
                            }, 300),
                            edgtf.modules.common.edgtfEnableScroll()
                        }),
                        i(document).mouseup(function(e) {
                            var t = i(".edgtf-form-holder-inner");
                            t.is(e.target) || 0 !== t.has(e.target).length || (e.preventDefault(),
                            edgtf.body.removeClass("edgtf-fullscreen-search-opened edgtf-search-fade-in"),
                            edgtf.body.addClass("edgtf-search-fade-out"),
                            a.removeClass("edgtf-animate"),
                            setTimeout(function() {
                                a.find(".edgtf-search-field").val(""),
                                a.find(".edgtf-search-field").blur()
                            }, 300),
                            edgtf.modules.common.edgtfEnableScroll())
                        }),
                        i(document).keyup(function(e) {
                            27 === e.keyCode && (edgtf.body.removeClass("edgtf-fullscreen-search-opened edgtf-search-fade-in"),
                            edgtf.body.addClass("edgtf-search-fade-out"),
                            a.removeClass("edgtf-animate"),
                            setTimeout(function() {
                                a.find(".edgtf-search-field").val(""),
                                a.find(".edgtf-search-field").blur()
                            }, 300),
                            edgtf.modules.common.edgtfEnableScroll())
                        })
                    });
                    var d = i(".edgtf-fullscreen-search-holder .edgtf-search-field")
                      , o = i(".edgtf-fullscreen-search-holder .edgtf-field-holder .edgtf-line");
                    d.focus(function() {
                        o.css("width", "100%")
                    }),
                    d.blur(function() {
                        o.css("width", "0")
                    })
                }
            }
        }()
    }
    (edgtf.modules.searchFullscreen = e).edgtfOnDocumentReady = t,
    i(document).ready(t)
}(jQuery),
function(d) {
    "use strict";
    var e = {};
    function t() {
        !function() {
            if (edgtf.body.hasClass("edgtf-fullscreen-search-with-sidebar")) {
                var e = d("a.edgtf-search-opener");
                if (0 < e.length) {
                    var t = d(".edgtf-fullscreen-with-sidebar-search-holder")
                      , a = d(".edgtf-search-close");
                    e.on("click", function(e) {
                        e.preventDefault(),
                        t.perfectScrollbar({
                            wheelSpeed: .6,
                            suppressScrollX: !0
                        }),
                        t.hasClass("edgtf-animate") ? (edgtf.body.removeClass("edgtf-fullscreen-search-opened edgtf-search-fade-out"),
                        edgtf.body.removeClass("edgtf-search-fade-in"),
                        t.removeClass("edgtf-animate"),
                        setTimeout(function() {
                            t.find(".edgtf-search-field").val(""),
                            t.find(".edgtf-search-field").blur()
                        }, 300),
                        edgtf.modules.common.edgtfEnableScroll()) : (edgtf.body.addClass("edgtf-fullscreen-search-opened edgtf-search-fade-in"),
                        edgtf.body.removeClass("edgtf-search-fade-out"),
                        t.addClass("edgtf-animate"),
                        setTimeout(function() {
                            t.find(".edgtf-search-field").focus()
                        }, 900),
                        edgtf.modules.common.edgtfDisableScroll()),
                        a.on("click", function(e) {
                            e.preventDefault(),
                            edgtf.body.removeClass("edgtf-fullscreen-search-opened edgtf-search-fade-in"),
                            edgtf.body.addClass("edgtf-search-fade-out"),
                            t.removeClass("edgtf-animate"),
                            setTimeout(function() {
                                t.find(".edgtf-search-field").val(""),
                                t.find(".edgtf-search-field").blur()
                            }, 300),
                            edgtf.modules.common.edgtfEnableScroll()
                        }),
                        d(document).keyup(function(e) {
                            27 === e.keyCode && (edgtf.body.removeClass("edgtf-fullscreen-search-opened edgtf-search-fade-in"),
                            edgtf.body.addClass("edgtf-search-fade-out"),
                            t.removeClass("edgtf-animate"),
                            setTimeout(function() {
                                t.find(".edgtf-search-field").val(""),
                                t.find(".edgtf-search-field").blur()
                            }, 300),
                            edgtf.modules.common.edgtfEnableScroll())
                        })
                    })
                }
            }
        }()
    }
    (edgtf.modules.searchFullscreenWithSidebar = e).edgtfOnDocumentReady = t,
    d(document).ready(t)
}(jQuery),
function(u) {
    "use strict";
    var e = {};
    function t() {
        !function() {
            if (edgtf.body.hasClass("edgtf-slide-from-header-bottom")) {
                var e = u("a.edgtf-search-opener");
                0 < e.length && e.on("click", function(e) {
                    e.preventDefault();
                    var t = u(this)
                      , a = parseInt(edgtf.windowWidth - t.offset().left - t.outerWidth());
                    edgtf.body.hasClass("edgtf-boxed") && 1024 < edgtf.windowWidth && (a -= parseInt((edgtf.windowWidth - u(".edgtf-boxed .edgtf-wrapper .edgtf-wrapper-inner").outerWidth()) / 2));
                    var d = u(".edgtf-page-header")
                      , o = "100%"
                      , i = u(".edgtf-top-bar")
                      , n = d.find(".edgtf-fixed-wrapper.fixed")
                      , s = u(".edgtf-mobile-header")
                      , r = u(".edgtf-slide-from-header-bottom-holder")
                      , l = !!t.parents(".edgtf-top-bar").length
                      , f = !!t.parents(".edgtf-fixed-wrapper.fixed").length
                      , g = !!t.parents(".edgtf-sticky-header").length
                      , c = !!t.parents(".edgtf-mobile-header").length;
                    r.removeClass("edgtf-is-active"),
                    l ? i.find(".edgtf-slide-from-header-bottom-holder").addClass("edgtf-is-active") : f ? (o = n.outerHeight() + edgtfGlobalVars.vars.edgtfAddForAdminBar,
                    d.children(".edgtf-slide-from-header-bottom-holder").addClass("edgtf-is-active")) : g ? (o = edgtfGlobalVars.vars.edgtfStickyHeaderHeight + edgtfGlobalVars.vars.edgtfAddForAdminBar,
                    d.children(".edgtf-slide-from-header-bottom-holder").addClass("edgtf-is-active")) : c ? (s.hasClass("mobile-header-appear") && (o = s.children(".edgtf-mobile-header-inner").outerHeight() + edgtfGlobalVars.vars.edgtfAddForAdminBar),
                    s.find(".edgtf-slide-from-header-bottom-holder").addClass("edgtf-is-active")) : d.children(".edgtf-slide-from-header-bottom-holder").addClass("edgtf-is-active"),
                    r.hasClass("edgtf-is-active") && r.css({
                        right: a,
                        top: o
                    }).stop(!0).slideToggle(300, "easeOutBack"),
                    u(document).keyup(function(e) {
                        27 === e.keyCode && r.stop(!0).fadeOut(0)
                    }),
                    u(window).scroll(function() {
                        r.stop(!0).fadeOut(0)
                    })
                })
            }
        }()
    }
    (edgtf.modules.searchSlideFromHB = e).edgtfOnDocumentReady = t,
    u(document).ready(t)
}(jQuery),
function(d) {
    "use strict";
    var e = {};
    function t() {
        !function() {
            if (edgtf.body.hasClass("edgtf-search-slides-from-window-top")) {
                var e = d("a.edgtf-search-opener");
                if (0 < e.length) {
                    var t = d(".edgtf-search-slide-window-top")
                      , a = d(".edgtf-search-close");
                    e.on("click", function(e) {
                        e.preventDefault(),
                        "0" === t.height() ? (d('.edgtf-search-slide-window-top input[type="text"]').focus(),
                        edgtf.body.addClass("edgtf-search-open")) : edgtf.body.removeClass("edgtf-search-open"),
                        d(window).scroll(function() {
                            "0" !== t.height() && 50 < edgtf.scroll && edgtf.body.removeClass("edgtf-search-open")
                        }),
                        a.on("click", function(e) {
                            e.preventDefault(),
                            edgtf.body.removeClass("edgtf-search-open")
                        })
                    })
                }
            }
        }()
    }
    (edgtf.modules.searchSlideFromWT = e).edgtfOnDocumentReady = t,
    d(document).ready(t)
}(jQuery),
function(l) {
    "use strict";
    var e = {};
    function t() {
        !function() {
            var e = l(".edgtf-match-list-holder-outer.edgtf-match-load-more");
            e.length && e.each(function() {
                var d, o, e = l(this), i = e.find(".edgtf-match-list-holder"), n = e.find(".edgtf-match-list-load-more a"), s = n.text(), r = edgtfGlobalVars.vars.edgtfPtfLoadMoreMessage;
                void 0 !== i.data("max-num-pages") && !1 !== i.data("max-num-pages") && (o = i.data("max-num-pages")),
                n.on("click", function(e) {
                    var t = function(e) {
                        var t = {
                            orderBy: "",
                            order: "",
                            number: "",
                            category: "",
                            status: "",
                            selectedProjects: "",
                            titleTag: "",
                            teamTitleTag: "",
                            showLoadMore: "",
                            showCategories: "",
                            showDate: "",
                            showResult: "",
                            nextPage: "",
                            skin: "",
                            maxNumPages: ""
                        };
                        void 0 !== e.data("order-by") && !1 !== e.data("order-by") && (t.orderBy = e.data("order-by"));
                        void 0 !== e.data("order") && !1 !== e.data("order") && (t.order = e.data("order"));
                        void 0 !== e.data("number") && !1 !== e.data("number") && (t.number = e.data("number"));
                        void 0 !== e.data("category") && !1 !== e.data("category") && (t.category = e.data("category"));
                        void 0 !== e.data("status") && !1 !== e.data("status") && (t.status = e.data("status"));
                        void 0 !== e.data("selected-projects") && !1 !== e.data("selected-projects") && (t.selectedProjects = e.data("selected-projects"));
                        void 0 !== e.data("title-tag") && !1 !== e.data("title-tag") && (t.titleTag = e.data("title-tag"));
                        void 0 !== e.data("team-title-tag") && !1 !== e.data("team-title-tag") && (t.teamTitleTag = e.data("team-title-tag"));
                        void 0 !== e.data("show-load-more") && !1 !== e.data("show-load-more") && (t.showLoadMore = e.data("show-load-more"));
                        void 0 !== e.data("show-categories") && !1 !== e.data("show-categories") && (t.showCategories = e.data("show-categories"));
                        void 0 !== e.data("show-date") && !1 !== e.data("show-date") && (t.showDate = e.data("show-date"));
                        void 0 !== e.data("show-result") && !1 !== e.data("show-result") && (t.showResult = e.data("show-result"));
                        void 0 !== e.data("next-page") && !1 !== e.data("next-page") && (t.nextPage = e.data("next-page"));
                        void 0 !== e.data("skin") && !1 !== e.data("skin") && (t.skin = e.data("skin"));
                        void 0 !== e.data("max-num-pages") && !1 !== e.data("max-num-pages") && (t.maxNumPages = e.data("max-num-pages"));
                        return t
                    }(i);
                    if (d = t.nextPage,
                    n.text(r),
                    e.preventDefault(),
                    e.stopPropagation(),
                    d <= o) {
                        var a = function(e) {
                            return {
                                action: "edgtf_core_match_ajax_load_more",
                                orderBy: e.orderBy,
                                order: e.order,
                                number: e.number,
                                category: e.category,
                                status: e.status,
                                selectedProjectes: e.selectedProjectes,
                                showLoadMore: e.showLoadMore,
                                titleTag: e.titleTag,
                                teamTitleTag: e.teamTitleTag,
                                showCategories: e.showCategories,
                                showDate: e.showDate,
                                showResult: e.showResult,
                                skin: e.skin,
                                nextPage: e.nextPage
                            }
                        }(t);
                        l.ajax({
                            type: "POST",
                            data: a,
                            url: edgtfGlobalVars.vars.edgtfAjaxUrl,
                            success: function(e) {
                                d++,
                                i.data("next-page", d);
                                var t = function(e) {
                                    var t = l.trim(e)
                                      , a = l(t)
                                      , d = l();
                                    return a.each(function(e, t) {
                                        1 === t.nodeType && (d = d.add(this))
                                    }),
                                    d
                                }(l.parseJSON(e).html);
                                i.waitForImages(function() {
                                    setTimeout(function() {
                                        i.append(t),
                                        n.text(s)
                                    }, 400)
                                })
                            }
                        })
                    }
                    d === o && n.hide()
                })
            })
        }()
    }
    (edgtf.modules.match = e).edgtfOnDocumentReady = t,
    l(document).ready(t)
}(jQuery),
function(r) {
    "use strict";
    var e = {};
    function t() {
        a().init()
    }
    (edgtf.modules.portfolio = e).edgtfOnWindowLoad = t,
    r(window).load(t);
    var a = function() {
        var t = r(".edgtf-follow-portfolio-info .edgtf-portfolio-single-holder .edgtf-ps-info-sticky-holder");
        if (t.length)
            var e = t.parent()
              , a = e.offset().top
              , d = e.height()
              , o = r(".edgtf-ps-image-holder").height()
              , i = r(".header-appear, .edgtf-fixed-wrapper")
              , n = i.length ? i.height() : 0
              , s = 30;
        return {
            init: function() {
                !function() {
                    if (t.length && d <= o && edgtf.scroll >= a - n - edgtfGlobalVars.vars.edgtfAddForAdminBar - s) {
                        var e = edgtf.scroll - a + edgtfGlobalVars.vars.edgtfAddForAdminBar + n + s;
                        o < e + d && (e = o - d + s),
                        t.stop().animate({
                            marginTop: e
                        })
                    }
                }(),
                r(window).scroll(function() {
                    t.length && d <= o && (0 < edgtf.scroll && i.length && (n = i.height()),
                    edgtf.scroll >= a - n - edgtfGlobalVars.vars.edgtfAddForAdminBar - s ? edgtf.scroll + n + edgtfGlobalVars.vars.edgtfAddForAdminBar + s + d < a + o ? (t.stop().animate({
                        marginTop: edgtf.scroll - a + edgtfGlobalVars.vars.edgtfAddForAdminBar + n + s
                    }),
                    n = 0) : t.stop().animate({
                        marginTop: o - d
                    }) : t.stop().animate({
                        marginTop: 0
                    }))
                })
            }
        }
    }
}(jQuery),
function(o) {
    "use strict";
    var e = {};
    function t() {
        a()
    }
    function a() {
        var e = o(".edgtf-accordion-holder");
        e.length && e.each(function() {
            var e = o(this);
            if (e.hasClass("edgtf-accordion") && e.accordion({
                animate: "easeInOutQuint",
                collapsible: !0,
                active: 0,
                icons: "",
                heightStyle: "content"
            }),
            e.hasClass("edgtf-toggle")) {
                var t = o(this)
                  , a = t.find(".edgtf-accordion-title")
                  , d = a.next();
                t.addClass("accordion ui-accordion ui-accordion-icons ui-widget ui-helper-reset"),
                a.addClass("ui-accordion-header ui-state-default ui-corner-top ui-corner-bottom"),
                d.addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").hide(),
                a.each(function() {
                    var e = o(this);
                    e.on("mouseenter mouseleave", function() {
                        e.toggleClass("ui-state-hover")
                    }),
                    e.on("click", function() {
                        e.toggleClass("ui-accordion-header-active ui-state-active ui-state-default ui-corner-bottom"),
                        e.next().toggleClass("ui-accordion-content-active").slideToggle(300, "easeInOutQuint")
                    })
                })
            }
        })
    }
    (edgtf.modules.accordions = e).edgtfInitAccordions = a,
    e.edgtfOnDocumentReady = t,
    o(document).ready(t)
}(jQuery),
function(o) {
    "use strict";
    var e = {};
    function t() {
        a()
    }
    function a() {
        var a, d, e = o(".edgtf-grow-in, .edgtf-fade-in-down, .edgtf-element-from-fade, .edgtf-element-from-left, .edgtf-element-from-right, .edgtf-element-from-top, .edgtf-element-from-bottom, .edgtf-flip-in, .edgtf-x-rotate, .edgtf-z-rotate, .edgtf-y-translate, .edgtf-fade-in, .edgtf-fade-in-left-x-rotate");
        e.length && e.each(function() {
            var t = o(this);
            t.appear(function() {
                if (a = t.data("animation"),
                d = parseInt(t.data("animation-delay")),
                void 0 !== a && "" !== a) {
                    var e = a + "-on";
                    setTimeout(function() {
                        t.addClass(e)
                    }, d)
                }
            }, {
                accX: 0,
                accY: edgtfGlobalVars.vars.edgtfElementAppearAmount
            })
        })
    }
    (edgtf.modules.animationHolder = e).edgtfInitAnimationHolder = a,
    e.edgtfOnDocumentReady = t,
    o(document).ready(t)
}(jQuery),
function(t) {
    "use strict";
    var e = {};
    function a() {
        d().init()
    }
    (edgtf.modules.button = e).edgtfButton = d,
    e.edgtfOnDocumentReady = a,
    t(document).ready(a);
    var d = function() {
        var e = t(".edgtf-btn");
        return {
            init: function() {
                e.length && e.not(".edgtf-btn-glow").each(function() {
                    !function(e) {
                        if (void 0 !== e.data("hover-color")) {
                            var t = function(e) {
                                e.data.button.css("color", e.data.color)
                            }
                              , a = e.css("color")
                              , d = e.data("hover-color");
                            e.on("mouseenter", {
                                button: e,
                                color: d
                            }, t),
                            e.on("mouseleave", {
                                button: e,
                                color: a
                            }, t)
                        }
                    }(t(this)),
                    function(e) {
                        if (void 0 !== e.data("hover-bg-color")) {
                            var t = function(e) {
                                e.data.button.css("background-color", e.data.color)
                            }
                              , a = function(e) {
                                e.data.button.css("border-top-color", e.data.color)
                            }
                              , d = e.css("background-color")
                              , o = e.data("hover-bg-color");
                            e.on("mouseenter", {
                                button: e,
                                color: o
                            }, t),
                            e.on("mouseleave", {
                                button: e,
                                color: d
                            }, t),
                            e.hasClass("edgtf-btn-trapeze-shape") && (e.on("mouseenter", {
                                button: e.find('span[class*="trapeze"]'),
                                color: o
                            }, a),
                            e.on("mouseleave", {
                                button: e.find('span[class*="trapeze"]'),
                                color: d
                            }, a))
                        }
                    }(t(this)),
                    function(e) {
                        if (void 0 !== e.data("hover-border-color")) {
                            var t = function(e) {
                                e.data.button.css("border-color", e.data.color)
                            }
                              , a = e.css("borderTopColor")
                              , d = e.data("hover-border-color");
                            e.on("mouseenter", {
                                button: e,
                                color: d
                            }, t),
                            e.on("mouseleave", {
                                button: e,
                                color: a
                            }, t)
                        }
                    }(t(this))
                })
            }
        }
    }
}(jQuery),
function(p) {
    "use strict";
    var e = {};
    function t() {
        a()
    }
    function a() {
        var o, i, n, s, r, l, f, g, c, u, h, e = p(".edgtf-countdown"), m = (new Date).getMonth();
        e.length && e.each(function() {
            var e, t, a = p(this).attr("id"), d = p("#" + a);
            o = d.data("year"),
            i = d.data("month"),
            n = d.data("day"),
            s = d.data("hour"),
            r = d.data("minute"),
            l = d.data("timezone"),
            f = d.data("month-label"),
            g = d.data("day-label"),
            c = d.data("hour-label"),
            u = d.data("minute-label"),
            h = d.data("second-label"),
            e = d.data("digit-size"),
            t = d.data("label-size"),
            m !== i && (i -= 1),
            d.countdown({
                until: new Date(o,i,n,s,r,44),
                labels: ["", f, "", g, c, u, h],
                format: "ODHMS",
                timezone: l,
                padZeroes: !0,
                onTick: function() {
                    d.find(".countdown-amount").css({
                        "font-size": e + "px",
                        "line-height": e + "px"
                    }),
                    d.find(".countdown-period").css({
                        "font-size": t + "px"
                    })
                }
            })
        })
    }
    (edgtf.modules.countdown = e).edgtfInitCountdown = a,
    e.edgtfOnDocumentReady = t,
    p(document).ready(t)
}(jQuery),
function(d) {
    "use strict";
    var e = {};
    function t() {
        a()
    }
    function a() {
        var e = d(".edgtf-counter-holder");
        e.length && e.each(function() {
            var t = d(this)
              , a = t.find(".edgtf-counter");
            t.appear(function() {
                if (t.css("opacity", "1"),
                a.hasClass("edgtf-zero-counter")) {
                    var e = parseFloat(a.text());
                    a.countTo({
                        from: 0,
                        to: e,
                        speed: 1500,
                        refreshInterval: 100
                    })
                } else
                    a.absoluteCounter({
                        speed: 2e3,
                        fadeInDelay: 1e3
                    })
            }, {
                accX: 0,
                accY: edgtfGlobalVars.vars.edgtfElementAppearAmount
            })
        })
    }
    (edgtf.modules.counter = e).edgtfInitCounter = a,
    e.edgtfOnDocumentReady = t,
    d(document).ready(t)
}(jQuery),
function(r) {
    "use strict";
    var e = {};
    function t() {
        d()
    }
    function a() {
        o()
    }
    function d() {
        var e = r(".edgtf-custom-font-holder");
        e.length && e.each(function() {
            var e = r(this)
              , t = ""
              , a = ""
              , d = ""
              , o = ""
              , i = ""
              , n = ""
              , s = "";
            void 0 !== e.data("item-class") && !1 !== e.data("item-class") && (t = e.data("item-class")),
            void 0 !== e.data("font-size-1366") && !1 !== e.data("font-size-1366") && (a += "font-size: " + e.data("font-size-1366") + " !important;"),
            void 0 !== e.data("font-size-1024") && !1 !== e.data("font-size-1024") && (d += "font-size: " + e.data("font-size-1024") + " !important;"),
            void 0 !== e.data("font-size-768") && !1 !== e.data("font-size-768") && (o += "font-size: " + e.data("font-size-768") + " !important;"),
            void 0 !== e.data("font-size-680") && !1 !== e.data("font-size-680") && (i += "font-size: " + e.data("font-size-680") + " !important;"),
            void 0 !== e.data("line-height-1366") && !1 !== e.data("line-height-1366") && (a += "line-height: " + e.data("line-height-1366") + " !important;"),
            void 0 !== e.data("line-height-1024") && !1 !== e.data("line-height-1024") && (d += "line-height: " + e.data("line-height-1024") + " !important;"),
            void 0 !== e.data("line-height-768") && !1 !== e.data("line-height-768") && (o += "line-height: " + e.data("line-height-768") + " !important;"),
            void 0 !== e.data("line-height-680") && !1 !== e.data("line-height-680") && (i += "line-height: " + e.data("line-height-680") + " !important;"),
            (a.length || d.length || o.length || i.length) && (a.length && (s += "@media only screen and (max-width: 1366px) {.edgtf-custom-font-holder." + t + " { " + a + " } }"),
            d.length && (s += "@media only screen and (max-width: 1024px) {.edgtf-custom-font-holder." + t + " { " + d + " } }"),
            o.length && (s += "@media only screen and (max-width: 768px) {.edgtf-custom-font-holder." + t + " { " + o + " } }"),
            i.length && (s += "@media only screen and (max-width: 680px) {.edgtf-custom-font-holder." + t + " { " + i + " } }")),
            s.length && (n = '<style type="text/css">' + s + "</style>"),
            n.length && r("head").append(n)
        })
    }
    function o() {
        var e = r(".edgtf-cf-typed");
        e.length && e.each(function() {
            var e = r(this)
              , t = e.parent(".edgtf-cf-typed-wrap").parent(".edgtf-custom-font-holder")
              , a = []
              , d = e.find(".edgtf-cf-typed-1").text()
              , o = e.find(".edgtf-cf-typed-2").text()
              , i = e.find(".edgtf-cf-typed-3").text()
              , n = e.find(".edgtf-cf-typed-4").text();
            d.length && a.push(d),
            o.length && a.push(o),
            i.length && a.push(i),
            n.length && a.push(n),
            t.appear(function() {
                e.typed({
                    strings: a,
                    typeSpeed: 90,
                    backDelay: 700,
                    loop: !0,
                    contentType: "text",
                    loopCount: !1,
                    cursorChar: "_"
                })
            }, {
                accX: 0,
                accY: edgtfGlobalVars.vars.edgtfElementAppearAmount
            })
        })
    }
    (edgtf.modules.customFont = e).edgtfCustomFontResize = d,
    e.edgtfCustomFontTypeOut = o,
    e.edgtfOnDocumentReady = t,
    e.edgtfOnWindowLoad = a,
    r(document).ready(t),
    r(window).load(a)
}(jQuery),
function(r) {
    "use strict";
    var e = {};
    function t() {
        a()
    }
    function a() {
        var e = r(".edgtf-elements-holder");
        e.length && e.each(function() {
            var e = r(this).children(".edgtf-eh-item")
              , t = ""
              , s = "";
            e.each(function() {
                var e = r(this)
                  , t = ""
                  , a = ""
                  , d = ""
                  , o = ""
                  , i = ""
                  , n = "";
                void 0 !== e.data("item-class") && !1 !== e.data("item-class") && (t = e.data("item-class")),
                void 0 !== e.data("1367-1600") && !1 !== e.data("1367-1600") && (a = e.data("1367-1600")),
                void 0 !== e.data("1025-1366") && !1 !== e.data("1025-1366") && (d = e.data("1025-1366")),
                void 0 !== e.data("769-1024") && !1 !== e.data("769-1024") && (o = e.data("769-1024")),
                void 0 !== e.data("681-768") && !1 !== e.data("681-768") && (i = e.data("681-768")),
                void 0 !== e.data("680") && !1 !== e.data("680") && (n = e.data("680")),
                (a.length || d.length || o.length || i.length || n.length || "".length) && (a.length && (s += "@media only screen and (min-width: 1367px) and (max-width: 1600px) {.edgtf-eh-item-content." + t + " { padding: " + a + " !important; } }"),
                d.length && (s += "@media only screen and (min-width: 1025px) and (max-width: 1366px) {.edgtf-eh-item-content." + t + " { padding: " + d + " !important; } }"),
                o.length && (s += "@media only screen and (min-width: 769px) and (max-width: 1024px) {.edgtf-eh-item-content." + t + " { padding: " + o + " !important; } }"),
                i.length && (s += "@media only screen and (min-width: 681px) and (max-width: 768px) {.edgtf-eh-item-content." + t + " { padding: " + i + " !important; } }"),
                n.length && (s += "@media only screen and (max-width: 680px) {.edgtf-eh-item-content." + t + " { padding: " + n + " !important; } }"))
            }),
            s.length && (t = '<style type="text/css">' + s + "</style>"),
            t.length && r("head").append(t),
            "function" == typeof edgtf.modules.common.edgtfOwlSlider && edgtf.modules.common.edgtfOwlSlider()
        })
    }
    (edgtf.modules.elementsHolder = e).edgtfInitElementsHolderResponsiveStyle = a,
    e.edgtfOnDocumentReady = t,
    r(document).ready(t)
}(jQuery),
function(s) {
    "use strict";
    var e = {};
    function t() {
        !function() {
            var e = s(".edgtf-fsis-slider");
            e.length && e.each(function() {
                var t = s(this)
                  , e = t.parent()
                  , a = e.children(".edgtf-fsis-prev-nav")
                  , d = e.children(".edgtf-fsis-next-nav")
                  , o = e.children(".edgtf-fsis-slider-mask");
                e.addClass("edgtf-fsis-is-init"),
                i(t),
                n(t, a, d, -1),
                t.on("drag.owl.carousel", function() {
                    setTimeout(function() {
                        o.hasClass("edgtf-drag") || e.hasClass("edgtf-fsis-active") || o.addClass("edgtf-drag")
                    }, 200)
                }),
                t.on("dragged.owl.carousel", function() {
                    setTimeout(function() {
                        o.hasClass("edgtf-drag") && o.removeClass("edgtf-drag")
                    }, 300)
                }),
                t.on("translate.owl.carousel", function(e) {
                    n(t, a, d, e.item.index)
                }),
                t.on("translated.owl.carousel", function() {
                    i(t),
                    setTimeout(function() {
                        o.removeClass("edgtf-drag")
                    }, 300)
                })
            })
        }()
    }
    function i(t) {
        var e = t.find(".owl-item.active");
        if (t.find(".edgtf-fsis-item").removeClass("edgtf-fsis-content-image-init"),
        function(e) {
            var t = e.find(".edgtf-fsis-item");
            t.length && t.removeClass("edgtf-fsis-active-image")
        }(t),
        e.length) {
            var a = e.find(".edgtf-fsis-item")
              , d = a.children(".edgtf-fsis-image");
            setTimeout(function() {
                a.addClass("edgtf-fsis-content-image-init")
            }, 100),
            d.off().on("mouseenter", function() {
                a.addClass("edgtf-fsis-image-hover")
            }).on("mouseleave", function() {
                a.removeClass("edgtf-fsis-image-hover")
            }).on("click", function() {
                a.hasClass("edgtf-fsis-active-image") ? (t.trigger("play.owl.autoplay"),
                t.parent().removeClass("edgtf-fsis-active"),
                a.removeClass("edgtf-fsis-active-image")) : (t.trigger("stop.owl.autoplay"),
                t.parent().addClass("edgtf-fsis-active"),
                a.addClass("edgtf-fsis-active-image"))
            }),
            s(document).keyup(function(e) {
                27 === e.keyCode && (t.trigger("play.owl.autoplay"),
                t.parent().removeClass("edgtf-fsis-active"),
                a.removeClass("edgtf-fsis-active-image"))
            })
        }
    }
    function n(e, t, a, d) {
        var o = -1 === d ? e.find(".owl-item.active") : s(e.find(".owl-item")[d])
          , i = o.prev().find(".edgtf-fsis-image").css("background-image")
          , n = o.next().find(".edgtf-fsis-image").css("background-image");
        i.length && t.css({
            "background-image": i
        }),
        n.length && a.css({
            "background-image": n
        })
    }
    (edgtf.modules.fullScreenImageSlider = e).edgtfOnWindowLoad = t,
    s(window).load(t)
}(jQuery),
function(g) {
    "use strict";
    var e = {};
    function t() {
        a()
    }
    function a() {
        var e = g(".edgtf-full-screen-sections");
        e.length && e.each(function() {
            var d = g(this)
              , e = d.children(".edgtf-fss-wrapper")
              , o = e.children(".edgtf-fss-item")
              , i = o.length
              , n = o.hasClass("edgtf-fss-item-has-style")
              , t = !1
              , a = ""
              , s = ""
              , r = "";
            edgtf.body.hasClass("edgtf-light-header") ? r = "light" : edgtf.body.hasClass("edgtf-dark-header") && (r = "dark"),
            void 0 !== d.data("enable-continuous-vertical") && !1 !== d.data("enable-continuous-vertical") && "yes" === d.data("enable-continuous-vertical") && (t = !0),
            void 0 !== d.data("enable-navigation") && !1 !== d.data("enable-navigation") && (a = d.data("enable-navigation")),
            void 0 !== d.data("enable-pagination") && !1 !== d.data("enable-pagination") && (s = d.data("enable-pagination"));
            var l = "no" !== a
              , f = "no" !== s;
            e.fullpage({
                sectionSelector: ".edgtf-fss-item",
                scrollingSpeed: 1200,
                verticalCentered: !1,
                continuousVertical: t,
                navigation: f,
                onLeave: function(e, t, a) {
                    n && c(g(o[t - 1]).data("header-style"), r),
                    l && u(d, i, t)
                },
                afterRender: function() {
                    n && c(o.first().data("header-style"), r),
                    l && (u(d, i, 1),
                    d.children(".edgtf-fss-nav-holder").css("visibility", "visible")),
                    e.css("visibility", "visible")
                }
            }),
            function(e) {
                var t = e.find(".edgtf-fss-item")
                  , n = ""
                  , a = "";
                t.each(function() {
                    var e = g(this)
                      , t = ""
                      , a = ""
                      , d = ""
                      , o = ""
                      , i = "";
                    void 0 !== e.data("item-class") && !1 !== e.data("item-class") && (t = e.data("item-class")),
                    void 0 !== e.data("laptop-image") && !1 !== e.data("laptop-image") && (a = e.data("laptop-image")),
                    void 0 !== e.data("tablet-image") && !1 !== e.data("tablet-image") && (d = e.data("tablet-image")),
                    void 0 !== e.data("tablet-portrait-image") && !1 !== e.data("tablet-portrait-image") && (o = e.data("tablet-portrait-image")),
                    void 0 !== e.data("mobile-image") && !1 !== e.data("mobile-image") && (i = e.data("mobile-image")),
                    (a.length || d.length || o.length || i.length) && (a.length && (n += "@media only screen and (max-width: 1366px) {.edgtf-fss-item." + t + " { background-image: url(" + a + ") !important; } }"),
                    d.length && (n += "@media only screen and (max-width: 1024px) {.edgtf-fss-item." + t + " { background-image: url( " + d + ") !important; } }"),
                    o.length && (n += "@media only screen and (max-width: 800px) {.edgtf-fss-item." + t + " { background-image: url( " + o + ") !important; } }"),
                    i.length && (n += "@media only screen and (max-width: 680px) {.edgtf-fss-item." + t + " { background-image: url( " + i + ") !important; } }"))
                }),
                n.length && (a = '<style type="text/css">' + n + "</style>");
                a.length && g("head").append(a)
            }(d),
            l && (d.find("#edgtf-fss-nav-up").on("click", function() {
                return g.fn.fullpage.moveSectionUp(),
                !1
            }),
            d.find("#edgtf-fss-nav-down").on("click", function() {
                return g.fn.fullpage.moveSectionDown(),
                !1
            }))
        })
    }
    function c(e, t) {
        void 0 !== e && "" !== e ? edgtf.body.removeClass("edgtf-light-header edgtf-dark-header").addClass("edgtf-" + e + "-header") : "" !== t ? edgtf.body.removeClass("edgtf-light-header edgtf-dark-header").addClass("edgtf-" + t + "-header") : edgtf.body.removeClass("edgtf-light-header edgtf-dark-header")
    }
    function u(e, t, a) {
        var d = e
          , o = d.find("#edgtf-fss-nav-up")
          , i = d.find("#edgtf-fss-nav-down")
          , n = !1;
        void 0 !== e.data("enable-continuous-vertical") && !1 !== e.data("enable-continuous-vertical") && "yes" === e.data("enable-continuous-vertical") && (n = !0),
        1 !== a || n ? a !== t || n ? (o.css({
            opacity: "1",
            height: "auto",
            visibility: "visible"
        }),
        i.css({
            opacity: "1",
            height: "auto",
            visibility: "visible"
        })) : (i.css({
            opacity: "0",
            height: "0",
            visibility: "hidden"
        }),
        2 === t && o.css({
            opacity: "1",
            height: "auto",
            visibility: "visible"
        })) : (o.css({
            opacity: "0",
            height: "0",
            visibility: "hidden"
        }),
        i.css({
            opacity: "0",
            height: "0",
            visibility: "hidden"
        }),
        a !== t && i.css({
            opacity: "1",
            height: "auto",
            visibility: "visible"
        }))
    }
    (edgtf.modules.fullScreenSections = e).edgtfInitFullScreenSections = a,
    e.edgtfOnDocumentReady = t,
    g(document).ready(t)
}(jQuery),
function(m) {
    "use strict";
    var e = {};
    function t() {
        a()
    }
    function a() {
        var e = m(".edgtf-google-map");
        e.length && e.each(function() {
            var e, t, a, d, o, i, n, s, r, l, f = m(this), g = !1, c = "";
            if (void 0 !== f.data("snazzy-map-style") && "yes" === f.data("snazzy-map-style")) {
                g = !0;
                var u = f.parent().find(".edgtf-snazzy-map")
                  , h = u.val();
                u.length && h.length && (c = JSON.parse(h.replace(/`{`/g, "[").replace(/`}`/g, "]").replace(/``/g, '"').replace(/`/g, "")))
            }
            void 0 !== f.data("custom-map-style") && (e = f.data("custom-map-style")),
            void 0 !== f.data("color-overlay") && !1 !== f.data("color-overlay") && (t = f.data("color-overlay")),
            void 0 !== f.data("saturation") && !1 !== f.data("saturation") && (a = f.data("saturation")),
            void 0 !== f.data("lightness") && !1 !== f.data("lightness") && (d = f.data("lightness")),
            void 0 !== f.data("zoom") && !1 !== f.data("zoom") && (o = f.data("zoom")),
            void 0 !== f.data("pin") && !1 !== f.data("pin") && (i = f.data("pin")),
            void 0 !== f.data("height") && !1 !== f.data("height") && (n = f.data("height")),
            void 0 !== f.data("unique-id") && !1 !== f.data("unique-id") && (s = f.data("unique-id")),
            void 0 !== f.data("scroll-wheel") && (r = f.data("scroll-wheel")),
            void 0 !== f.data("addresses") && !1 !== f.data("addresses") && (l = f.data("addresses")),
            function(e, t, a, d, o, i, n, s, r, l, f, g, c, u) {
                if ("object" != typeof google)
                    return;
                var h, m = [];
                m = e && t.length ? t : [{
                    stylers: [{
                        hue: d
                    }, {
                        saturation: o
                    }, {
                        lightness: i
                    }, {
                        gamma: 1
                    }]
                }];
                h = e || "yes" === a ? "edgtf-style" : google.maps.MapTypeId.ROADMAP;
                n = "yes" === n;
                var p = new google.maps.StyledMapType(m,{
                    name: "Google Map"
                });
                c = new google.maps.Geocoder;
                var v = new google.maps.LatLng(-34.397,150.644);
                isNaN(l) || (l += "px");
                var y, b = {
                    zoom: s,
                    scrollwheel: n,
                    center: v,
                    zoomControl: !0,
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.SMALL,
                        position: google.maps.ControlPosition.RIGHT_CENTER
                    },
                    scaleControl: !1,
                    scaleControlOptions: {
                        position: google.maps.ControlPosition.LEFT_CENTER
                    },
                    streetViewControl: !1,
                    streetViewControlOptions: {
                        position: google.maps.ControlPosition.LEFT_CENTER
                    },
                    panControl: !1,
                    panControlOptions: {
                        position: google.maps.ControlPosition.LEFT_CENTER
                    },
                    mapTypeControl: !1,
                    mapTypeControlOptions: {
                        mapTypeIds: [google.maps.MapTypeId.ROADMAP, "edgtf-style"],
                        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                        position: google.maps.ControlPosition.LEFT_CENTER
                    },
                    mapTypeId: h
                };
                for ((g = new google.maps.Map(document.getElementById(r),b)).mapTypes.set("edgtf-style", p),
                y = 0; y < u.length; ++y)
                    w(u[y], f, g, c);
                document.getElementById(r).style.height = l
            }(g, c, e, t, a, d, r, o, "edgtf-map-" + s, n, i, "map_" + s, "geocoder_" + s, l)
        })
    }
    function w(d, o, i, e) {
        if ("" !== d) {
            var t = '<div id="content"><div id="siteNotice"></div><div id="bodyContent"><p>' + d + "</p></div></div>"
              , n = new google.maps.InfoWindow({
                content: t
            });
            e.geocode({
                address: d
            }, function(e, t) {
                if (t === google.maps.GeocoderStatus.OK) {
                    i.setCenter(e[0].geometry.location);
                    var a = new google.maps.Marker({
                        map: i,
                        position: e[0].geometry.location,
                        icon: o,
                        title: d.store_title
                    });
                    google.maps.event.addListener(a, "click", function() {
                        n.open(i, a)
                    }),
                    google.maps.event.addDomListener(window, "resize", function() {
                        i.setCenter(e[0].geometry.location)
                    })
                }
            })
        }
    }
    (edgtf.modules.googleMap = e).edgtfShowGoogleMap = a,
    e.edgtfOnDocumentReady = t,
    m(document).ready(t)
}(jQuery),
function(t) {
    "use strict";
    var e = {};
    function a() {
        d().init()
    }
    (edgtf.modules.icon = e).edgtfIcon = d,
    e.edgtfOnDocumentReady = a,
    t(document).ready(a);
    var d = function() {
        var e = t(".edgtf-icon-shortcode");
        return {
            init: function() {
                e.length && e.each(function() {
                    !function(e) {
                        e.hasClass("edgtf-icon-animation") && e.appear(function() {
                            e.parent(".edgtf-icon-animation-holder").addClass("edgtf-icon-animation-show")
                        }, {
                            accX: 0,
                            accY: edgtfGlobalVars.vars.edgtfElementAppearAmount
                        })
                    }(t(this)),
                    function(e) {
                        if (void 0 !== e.data("hover-color")) {
                            var t = function(e) {
                                e.data.icon.css("color", e.data.color)
                            }
                              , a = e.find(".edgtf-icon-element")
                              , d = e.data("hover-color")
                              , o = a.css("color");
                            "" !== d && (e.on("mouseenter", {
                                icon: a,
                                color: d
                            }, t),
                            e.on("mouseleave", {
                                icon: a,
                                color: o
                            }, t))
                        }
                    }(t(this)),
                    function(e) {
                        if (void 0 !== e.data("hover-background-color")) {
                            var t = function(e) {
                                e.data.icon.css("background-color", e.data.color)
                            }
                              , a = e.data("hover-background-color")
                              , d = e.css("background-color");
                            "" !== a && (e.on("mouseenter", {
                                icon: e,
                                color: a
                            }, t),
                            e.on("mouseleave", {
                                icon: e,
                                color: d
                            }, t))
                        }
                    }(t(this)),
                    function(e) {
                        if (void 0 !== e.data("hover-border-color")) {
                            var t = function(e) {
                                e.data.icon.css("border-color", e.data.color)
                            }
                              , a = e.data("hover-border-color")
                              , d = e.css("borderTopColor");
                            "" !== a && (e.on("mouseenter", {
                                icon: e,
                                color: a
                            }, t),
                            e.on("mouseleave", {
                                icon: e,
                                color: d
                            }, t))
                        }
                    }(t(this))
                })
            }
        }
    }
}(jQuery),
function(t) {
    "use strict";
    var e = {};
    function a() {
        d().init()
    }
    (edgtf.modules.iconListItem = e).edgtfInitIconList = d,
    e.edgtfOnDocumentReady = a,
    t(document).ready(a);
    var d = function() {
        var e = t(".edgtf-animate-list");
        return {
            init: function() {
                e.length && e.each(function() {
                    !function(e) {
                        setTimeout(function() {
                            e.appear(function() {
                                e.addClass("edgtf-appeared")
                            }, {
                                accX: 0,
                                accY: edgtfGlobalVars.vars.edgtfElementAppearAmount
                            })
                        }, 30)
                    }(t(this))
                })
            }
        }
    }
}(jQuery),
function(i) {
    "use strict";
    var e = {};
    function t() {
        a()
    }
    function a() {
        var e = i(".edgtf-item-showcase-holder");
        e.length && e.each(function() {
            var t = i(this)
              , e = t.find(".edgtf-is-left")
              , a = t.find(".edgtf-is-right")
              , d = t.find(".edgtf-is-image");
            function o(e) {
                t.find(e).each(function(e) {
                    var t = i(this);
                    setTimeout(function() {
                        t.addClass("edgtf-appeared")
                    }, 150 * e)
                })
            }
            e.wrapAll("<div class='edgtf-is-item-holder edgtf-is-left-holder' />"),
            a.wrapAll("<div class='edgtf-is-item-holder edgtf-is-right-holder' />"),
            t.animate({
                opacity: 1
            }, 200),
            setTimeout(function() {
                t.appear(function() {
                    d.addClass("edgtf-appeared"),
                    t.on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function(e) {
                        1200 < edgtf.windowWidth ? (o(".edgtf-is-left-holder .edgtf-is-item"),
                        o(".edgtf-is-right-holder .edgtf-is-item")) : o(".edgtf-is-item")
                    })
                }, {
                    accX: 0,
                    accY: edgtfGlobalVars.vars.edgtfElementAppearAmount
                })
            }, 100)
        })
    }
    (edgtf.modules.itemShowcase = e).edgtfInitItemShowcase = a,
    e.edgtfOnDocumentReady = t,
    i(document).ready(t)
}(jQuery),
function(i) {
    "use strict";
    var e = {};
    function t() {
        a()
    }
    function a() {
        var e = i(".edgtf-pie-chart-holder");
        e.length && e.each(function() {
            var e = i(this)
              , t = e.children(".edgtf-pc-percentage")
              , a = "#ff0e1f"
              , d = "rgba(255,255,255,.0)"
              , o = 168;
            void 0 !== t.data("size") && "" !== t.data("size") && (o = t.data("size")),
            void 0 !== t.data("bar-color") && "" !== t.data("bar-color") && (a = t.data("bar-color")),
            void 0 !== t.data("track-color") && "" !== t.data("track-color") && (d = t.data("track-color")),
            t.appear(function() {
                !function(e) {
                    var t = e.find(".edgtf-pc-percent")
                      , a = parseFloat(t.text());
                    t.countTo({
                        from: 0,
                        to: a,
                        speed: 1500,
                        refreshInterval: 50
                    })
                }(t),
                e.css("opacity", "1"),
                t.easyPieChart({
                    barColor: a,
                    trackColor: d,
                    scaleColor: !1,
                    lineCap: "butt",
                    lineWidth: 10,
                    animate: 1500,
                    size: o
                })
            }, {
                accX: 0,
                accY: edgtfGlobalVars.vars.edgtfElementAppearAmount
            })
        })
    }
    (edgtf.modules.pieChart = e).edgtfInitPieChart = a,
    e.edgtfOnDocumentReady = t,
    i(document).ready(t)
}(jQuery),
function(t) {
    "use strict";
    var e = {};
    function a() {
        d()
    }
    function d() {
        var e = t(".edgtf-process-holder");
        e.length && e.each(function() {
            var e = t(this);
            e.appear(function() {
                e.addClass("edgtf-process-appeared")
            }, {
                accX: 0,
                accY: edgtfGlobalVars.vars.edgtfElementAppearAmount
            })
        })
    }
    (edgtf.modules.process = e).edgtfInitProcess = d,
    e.edgtfOnDocumentReady = a,
    t(document).ready(a)
}(jQuery),
function(o) {
    "use strict";
    var e = {};
    function t() {
        a()
    }
    function a() {
        var e = o(".edgtf-progress-bar");
        e.length && e.each(function() {
            var e = o(this)
              , t = e.find(".edgtf-pb-content")
              , a = e.find(".edgtf-pb-percent")
              , d = t.data("percentage");
            e.appear(function() {
                !function(e, t) {
                    var a = parseFloat(t);
                    e.length && e.each(function() {
                        var e = o(this);
                        e.css("opacity", "1"),
                        e.countTo({
                            from: 0,
                            to: a,
                            speed: 2e3,
                            refreshInterval: 50
                        })
                    })
                }(a, d),
                t.css("width", "0%").animate({
                    width: d + "%"
                }, 2e3),
                e.hasClass("edgtf-pb-percent-floating") && a.css("left", "0%").animate({
                    left: d + "%"
                }, 2e3)
            })
        })
    }
    (edgtf.modules.progressBar = e).edgtfInitProgressBars = a,
    e.edgtfOnDocumentReady = t,
    o(document).ready(t)
}(jQuery),
function(i) {
    "use strict";
    var e = {};
    function t() {
        a()
    }
    function a() {
        var e = i(".edgtf-tabs");
        e.length && e.each(function() {
            var e = i(this);
            e.children(".edgtf-tab-container").each(function(e) {
                e += 1;
                var t = i(this)
                  , a = t.attr("id")
                  , d = t.parent().find(".edgtf-tabs-nav li:nth-child(" + e + ") a")
                  , o = d.attr("href");
                -1 < (a = "#" + a).indexOf(o) && d.attr("href", a)
            }),
            e.tabs(),
            i(".edgtf-tabs a.edgtf-external-link").off("click")
        })
    }
    (edgtf.modules.tabs = e).edgtfInitTabs = a,
    e.edgtfOnDocumentReady = t,
    i(document).ready(t)
}(jQuery),
function(r) {
    "use strict";
    var e = {};
    function t() {
        d(),
        a()
    }
    function a() {
        var e = r(".edgtf-text-marquee");
        e.length && e.each(function() {
            function i(e) {
                return t.outerWidth() > e.outerWidth() ? t.outerWidth() : e.outerWidth()
            }
            var t = r(this)
              , e = t.find(".edgtf-marquee-element")
              , n = e.filter(".edgtf-original-text")
              , s = e.filter(".edgtf-aux-text");
            !function() {
                window.requestNextAnimationFrame = function() {
                    var a = void 0
                      , d = void 0
                      , e = navigator.userAgent
                      , t = 0
                      , o = this;
                    return window.webkitRequestAnimationFrame && (d = function(e) {
                        void 0 === e && (e = +new Date),
                        o.callback(e)
                    }
                    ,
                    a = window.webkitRequestAnimationFrame,
                    window.webkitRequestAnimationFrame = function(e, t) {
                        o.callback = e,
                        a(d, t)
                    }
                    ),
                    window.mozRequestAnimationFrame && (t = e.indexOf("rv:"),
                    -1 !== e.indexOf("Gecko") && "2.0" === e.substr(t + 3, 3) && (window.mozRequestAnimationFrame = void 0)),
                    window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e, t) {
                        var a, d;
                        window.setTimeout(function() {
                            a = +new Date,
                            e(a),
                            d = +new Date,
                            o.timeout = 1e3 / 60 - (d - a)
                        }, o.timeout)
                    }
                }();
                var o = i(n);
                e.css({
                    width: o
                }),
                s.css("left", o),
                e.each(function(e) {
                    var t = r(this)
                      , a = 0
                      , d = function() {
                        a -= 1,
                        t.position().left <= -o && (t.css("left", parseInt(o - 1)),
                        a = 0),
                        t.css("transform", "translate3d(" + .8 * a + "px,0,0)"),
                        requestNextAnimationFrame(d),
                        r(window).resize(function() {
                            o = i(n),
                            a = 0,
                            n.css("left", 0),
                            s.css("left", o)
                        })
                    };
                    d()
                })
            }()
        })
    }
    function d() {
        var e = r(".edgtf-text-marquee");
        e.length && e.each(function() {
            var e = r(this)
              , t = ""
              , a = ""
              , d = ""
              , o = ""
              , i = ""
              , n = ""
              , s = "";
            void 0 !== e.data("item-class") && !1 !== e.data("item-class") && (t = e.data("item-class")),
            void 0 !== e.data("font-size-1366") && !1 !== e.data("font-size-1366") && (a += "font-size: " + e.data("font-size-1366") + " !important;"),
            void 0 !== e.data("font-size-1024") && !1 !== e.data("font-size-1024") && (d += "font-size: " + e.data("font-size-1024") + " !important;"),
            void 0 !== e.data("font-size-768") && !1 !== e.data("font-size-768") && (o += "font-size: " + e.data("font-size-768") + " !important;"),
            void 0 !== e.data("font-size-680") && !1 !== e.data("font-size-680") && (i += "font-size: " + e.data("font-size-680") + " !important;"),
            void 0 !== e.data("line-height-1366") && !1 !== e.data("line-height-1366") && (a += "line-height: " + e.data("line-height-1366") + " !important;"),
            void 0 !== e.data("line-height-1024") && !1 !== e.data("line-height-1024") && (d += "line-height: " + e.data("line-height-1024") + " !important;"),
            void 0 !== e.data("line-height-768") && !1 !== e.data("line-height-768") && (o += "line-height: " + e.data("line-height-768") + " !important;"),
            void 0 !== e.data("line-height-680") && !1 !== e.data("line-height-680") && (i += "line-height: " + e.data("line-height-680") + " !important;"),
            (a.length || d.length || o.length || i.length) && (a.length && (s += "@media only screen and (max-width: 1366px) {.edgtf-text-marquee." + t + " { " + a + " } }"),
            d.length && (s += "@media only screen and (max-width: 1024px) {.edgtf-text-marquee." + t + " { " + d + " } }"),
            o.length && (s += "@media only screen and (max-width: 768px) {.edgtf-text-marquee." + t + " { " + o + " } }"),
            i.length && (s += "@media only screen and (max-width: 680px) {.edgtf-text-marquee." + t + " { " + i + " } }")),
            s.length && (n = '<style type="text/css">' + s + "</style>"),
            n.length && r("head").append(n)
        })
    }
    (edgtf.modules.textMarquee = e).edgtfInitTextMarquee = a,
    e.edgtfTextMarqueeResize = d,
    e.edgtfOnDocumentReady = t,
    r(document).ready(t)
}(jQuery),
function(l) {
    "use strict";
    var e = {};
    function t() {
        a()
    }
    function a() {
        var n = l(".edgtf-vertical-split-slider")
          , s = !0;
        if (n.length) {
            edgtf.body.hasClass("edgtf-vss-initialized") && (edgtf.body.removeClass("edgtf-vss-initialized"),
            l.fn.multiscroll.destroy()),
            n.height(edgtf.windowHeight).animate({
                opacity: 1
            }, 300);
            var r = "";
            edgtf.body.hasClass("edgtf-light-header") ? r = "light" : edgtf.body.hasClass("edgtf-dark-header") && (r = "dark"),
            n.multiscroll({
                scrollingSpeed: 700,
                easing: "easeInOutQuart",
                navigation: !0,
                useAnchorsOnLoad: !1,
                sectionSelector: ".edgtf-vss-ms-section",
                leftSelector: ".edgtf-vss-ms-left",
                rightSelector: ".edgtf-vss-ms-right",
                afterRender: function() {
                    f(l(".edgtf-vss-ms-left .edgtf-vss-ms-section:first-child").data("header-style"), r),
                    edgtf.body.addClass("edgtf-vss-initialized");
                    var e = l("div.wpcf7 > form");
                    e.length && e.each(function() {
                        var t = l(this);
                        t.find(".wpcf7-submit").off().on("click", function(e) {
                            e.preventDefault(),
                            wpcf7.submit(t)
                        })
                    });
                    var t = l('<div class="edgtf-vss-responsive"></div>')
                      , a = n.find(".edgtf-vss-ms-left > div")
                      , d = n.find(".edgtf-vss-ms-right > div");
                    n.after(t);
                    for (var o = 0; o < a.length; o++)
                        t.append(l(a[o]).clone(!0)),
                        t.append(l(d[a.length - 1 - o]).clone(!0));
                    var i = l(".edgtf-vss-responsive .edgtf-google-map");
                    i.length && i.each(function() {
                        var e = l(this);
                        e.empty();
                        var t = Math.floor(1e5 * Math.random() + 1);
                        e.attr("id", "edgtf-map-" + t),
                        e.data("unique-id", t)
                    }),
                    "function" == typeof edgtf.modules.animationHolder.edgtfInitAnimationHolder && edgtf.modules.animationHolder.edgtfInitAnimationHolder(),
                    "function" == typeof edgtf.modules.button.edgtfButton && edgtf.modules.button.edgtfButton().init(),
                    "function" == typeof edgtf.modules.elementsHolder.edgtfInitElementsHolderResponsiveStyle && edgtf.modules.elementsHolder.edgtfInitElementsHolderResponsiveStyle(),
                    "function" == typeof edgtf.modules.googleMap.edgtfShowGoogleMap && edgtf.modules.googleMap.edgtfShowGoogleMap(),
                    "function" == typeof edgtf.modules.icon.edgtfIcon && edgtf.modules.icon.edgtfIcon().init(),
                    s && "function" == typeof edgtf.modules.progressBar.edgtfInitProgressBars && l(l(".edgtf-vss-ms-left .edgtf-vss-ms-section, .edgtf-vss-ms-right .edgtf-vss-ms-section")[0]).find(".edgtf-progress-bar").length && (edgtf.modules.progressBar.edgtfInitProgressBars(),
                    s = !1)
                },
                onLeave: function(e, t) {
                    "function" == typeof edgtf.modules.progressBar.edgtfInitProgressBars && l(l(".edgtf-vss-ms-left .edgtf-vss-ms-section, .edgtf-vss-ms-right .edgtf-vss-ms-section")[t]).find(".edgtf-progress-bar").length && setTimeout(function() {
                        edgtf.modules.progressBar.edgtfInitProgressBars(),
                        s = !1
                    }, 700),
                    function(e, t) {
                        e.hasClass("edgtf-vss-scrolling-animation") && (1 < t && !e.hasClass("edgtf-vss-scrolled") ? e.addClass("edgtf-vss-scrolled") : 1 === t && e.hasClass("edgtf-vss-scrolled") && e.removeClass("edgtf-vss-scrolled"))
                    }(n, t),
                    f(l(l(".edgtf-vss-ms-left .edgtf-vss-ms-section")[t - 1]).data("header-style"), r)
                }
            }),
            edgtf.windowWidth <= 1024 ? l.fn.multiscroll.destroy() : l.fn.multiscroll.build(),
            l(window).resize(function() {
                edgtf.windowWidth <= 1024 ? l.fn.multiscroll.destroy() : l.fn.multiscroll.build()
            })
        }
    }
    function f(e, t) {
        void 0 !== e && "" !== e ? edgtf.body.removeClass("edgtf-light-header edgtf-dark-header").addClass("edgtf-" + e + "-header") : "" !== t ? edgtf.body.removeClass("edgtf-light-header edgtf-dark-header").addClass("edgtf-" + t + "-header") : edgtf.body.removeClass("edgtf-light-header edgtf-dark-header")
    }
    (edgtf.modules.verticalSplitSlider = e).edgtfInitVerticalSplitSlider = a,
    e.edgtfOnDocumentReady = t,
    l(document).ready(t)
}(jQuery),
function(u) {
    "use strict";
    var e = {};
    function t() {
        !function() {
            var e = u(".edgtf-portfolio-list-holder .edgtf-pl-filter-holder");
            e.length && e.each(function() {
                var o = u(this)
                  , i = o.closest(".edgtf-portfolio-list-holder")
                  , n = i.find(".edgtf-pl-inner")
                  , s = !!i.hasClass("edgtf-pl-pag-load-more");
                o.find(".edgtf-pl-filter:first").addClass("edgtf-pl-current"),
                i.hasClass("edgtf-pl-gallery") && n.isotope(),
                o.find(".edgtf-pl-filter").on("click", function() {
                    var e = u(this)
                      , t = e.attr("data-filter")
                      , a = t.length ? t.substring(1) : ""
                      , d = !!n.children().hasClass(a);
                    e.parent().children(".edgtf-pl-filter").removeClass("edgtf-pl-current"),
                    e.addClass("edgtf-pl-current"),
                    s && !d && t.length ? function d(e, t, a) {
                        var o = e
                          , i = o.find(".edgtf-pl-inner")
                          , n = t
                          , s = a
                          , r = 0;
                        void 0 !== o.data("max-num-pages") && !1 !== o.data("max-num-pages") && (r = o.data("max-num-pages"));
                        var l = edgtf.modules.common.getLoadMoreData(o)
                          , f = l.nextPage
                          , g = edgtf.modules.common.setLoadMoreAjaxData(l, "playerx_core_portfolio_ajax_load_more")
                          , c = o.find(".edgtf-pl-loading");
                        f <= r && (c.addClass("edgtf-showing edgtf-filter-trigger"),
                        i.css("opacity", "0"),
                        u.ajax({
                            type: "POST",
                            data: g,
                            url: edgtfGlobalVars.vars.edgtfAjaxUrl,
                            success: function(e) {
                                f++,
                                o.data("next-page", f);
                                var t = u.parseJSON(e)
                                  , a = t.html;
                                o.waitForImages(function() {
                                    i.append(a).isotope("reloadItems").isotope({
                                        sortBy: "original-order"
                                    });
                                    var e = !!i.children().hasClass(s);
                                    e ? setTimeout(function() {
                                        edgtf.modules.common.setFixedImageProportionSize(o, i.find("article"), i.find(".edgtf-masonry-grid-sizer").width()),
                                        i.isotope("layout").isotope({
                                            filter: n
                                        }),
                                        c.removeClass("edgtf-showing edgtf-filter-trigger"),
                                        setTimeout(function() {
                                            i.css("opacity", "1"),
                                            h(),
                                            edgtf.modules.common.edgtfInitParallax()
                                        }, 150)
                                    }, 400) : (c.removeClass("edgtf-showing edgtf-filter-trigger"),
                                    d(o, n, s))
                                })
                            }
                        }))
                    }(i, t, a) : (t = 0 === t.length ? "*" : t,
                    o.parent().children(".edgtf-pl-inner").isotope({
                        filter: t
                    }),
                    edgtf.modules.common.edgtfInitParallax())
                })
            })
        }(),
        h(),
        d().init()
    }
    function a() {
        d().scroll()
    }
    function h() {
        var e = u(".edgtf-portfolio-list-holder.edgtf-pl-has-animation");
        e.length && e.each(function() {
            u(this).children(".edgtf-pl-inner").children("article").each(function(e) {
                var t = u(this);
                t.appear(function() {
                    t.addClass("edgtf-item-show"),
                    setTimeout(function() {
                        t.addClass("edgtf-item-shown")
                    }, 1e3)
                }, {
                    accX: 0,
                    accY: 0
                })
            })
        })
    }
    function d() {
        function t(e) {
            var t = e.outerHeight() + e.offset().top - edgtfGlobalVars.vars.edgtfAddForAdminBar;
            !e.hasClass("edgtf-pl-infinite-scroll-started") && edgtf.scroll + edgtf.windowHeight > t && o(e)
        }
        var e = u(".edgtf-portfolio-list-holder")
          , o = function(a, d) {
            var o, i, n = a.find(".edgtf-pl-inner");
            void 0 !== a.data("max-num-pages") && !1 !== a.data("max-num-pages") && (i = a.data("max-num-pages")),
            a.hasClass("edgtf-pl-pag-standard") && a.data("next-page", d),
            a.hasClass("edgtf-pl-pag-infinite-scroll") && a.addClass("edgtf-pl-infinite-scroll-started");
            var e = edgtf.modules.common.getLoadMoreData(a)
              , s = a.find(".edgtf-pl-loading");
            if ((o = e.nextPage) <= i || 0 === i) {
                a.hasClass("edgtf-pl-pag-standard") ? (s.addClass("edgtf-showing edgtf-standard-pag-trigger"),
                a.addClass("edgtf-pl-pag-standard-animate")) : s.addClass("edgtf-showing");
                var t = edgtf.modules.common.setLoadMoreAjaxData(e, "playerx_core_portfolio_ajax_load_more");
                u.ajax({
                    type: "POST",
                    data: t,
                    url: edgtfGlobalVars.vars.edgtfAjaxUrl,
                    success: function(e) {
                        a.hasClass("edgtf-pl-pag-standard") || o++,
                        a.data("next-page", o);
                        var t = u.parseJSON(e).html;
                        a.hasClass("edgtf-pl-pag-standard") ? (r(a, i, o),
                        a.waitForImages(function() {
                            a.hasClass("edgtf-pl-masonry") ? l(a, n, s, t) : a.hasClass("edgtf-pl-gallery") && a.hasClass("edgtf-pl-has-filter") ? l(a, n, s, t) : f(a, n, s, t)
                        })) : a.waitForImages(function() {
                            a.hasClass("edgtf-pl-masonry") ? 1 === d ? l(a, n, s, t) : g(a, n, s, t) : a.hasClass("edgtf-pl-gallery") && a.hasClass("edgtf-pl-has-filter") && 1 !== d ? g(a, n, s, t) : 1 === d ? f(a, n, s, t) : c(n, s, t)
                        }),
                        a.hasClass("edgtf-pl-infinite-scroll-started") && a.removeClass("edgtf-pl-infinite-scroll-started")
                    }
                })
            }
            o === i && a.find(".edgtf-pl-load-more-holder").hide()
        }
          , r = function(e, t, a) {
            var d = e.find(".edgtf-pl-standard-pagination")
              , o = d.find("li.edgtf-pag-number")
              , i = d.find("li.edgtf-pag-prev a")
              , n = d.find("li.edgtf-pag-next a");
            o.removeClass("edgtf-pag-active"),
            o.eq(a - 1).addClass("edgtf-pag-active"),
            i.data("paged", a - 1),
            n.data("paged", a + 1),
            1 < a ? i.css({
                opacity: "1"
            }) : i.css({
                opacity: "0"
            }),
            a === t ? n.css({
                opacity: "0"
            }) : n.css({
                opacity: "1"
            })
        }
          , l = function(e, t, a, d) {
            t.find("article").remove(),
            t.append(d),
            edgtf.modules.common.setFixedImageProportionSize(e, t.find("article"), t.find(".edgtf-masonry-grid-sizer").width()),
            t.isotope("reloadItems").isotope({
                sortBy: "original-order"
            }),
            a.removeClass("edgtf-showing edgtf-standard-pag-trigger"),
            e.removeClass("edgtf-pl-pag-standard-animate"),
            setTimeout(function() {
                t.isotope("layout"),
                h(),
                edgtf.modules.common.edgtfInitParallax(),
                edgtf.modules.common.edgtfPrettyPhoto()
            }, 600)
        }
          , f = function(e, t, a, d) {
            a.removeClass("edgtf-showing edgtf-standard-pag-trigger"),
            e.removeClass("edgtf-pl-pag-standard-animate"),
            t.html(d),
            h(),
            edgtf.modules.common.edgtfInitParallax(),
            edgtf.modules.common.edgtfPrettyPhoto()
        }
          , g = function(e, t, a, d) {
            t.append(d),
            edgtf.modules.common.setFixedImageProportionSize(e, t.find("article"), t.find(".edgtf-masonry-grid-sizer").width()),
            t.isotope("reloadItems").isotope({
                sortBy: "original-order"
            }),
            a.removeClass("edgtf-showing"),
            setTimeout(function() {
                t.isotope("layout"),
                h(),
                edgtf.modules.common.edgtfInitParallax(),
                edgtf.modules.common.edgtfPrettyPhoto()
            }, 600)
        }
          , c = function(e, t, a) {
            t.removeClass("edgtf-showing"),
            e.append(a),
            h(),
            edgtf.modules.common.edgtfInitParallax(),
            edgtf.modules.common.edgtfPrettyPhoto()
        };
        return {
            init: function() {
                e.length && e.each(function() {
                    var e = u(this);
                    e.hasClass("edgtf-pl-pag-standard") && function(d) {
                        var e = d.find(".edgtf-pl-standard-pagination li");
                        e.length && e.each(function() {
                            var t = u(this).children("a")
                              , a = 1;
                            t.on("click", function(e) {
                                e.preventDefault(),
                                e.stopPropagation(),
                                void 0 !== t.data("paged") && !1 !== t.data("paged") && (a = t.data("paged")),
                                o(d, a)
                            })
                        })
                    }(e),
                    e.hasClass("edgtf-pl-pag-load-more") && function(t) {
                        t.find(".edgtf-pl-load-more a").on("click", function(e) {
                            e.preventDefault(),
                            e.stopPropagation(),
                            o(t)
                        })
                    }(e),
                    e.hasClass("edgtf-pl-pag-infinite-scroll") && t(e)
                })
            },
            scroll: function() {
                e.length && e.each(function() {
                    var e = u(this);
                    e.hasClass("edgtf-pl-pag-infinite-scroll") && t(e)
                })
            },
            getMainPagFunction: function(e, t) {
                o(e, t)
            }
        }
    }
    (edgtf.modules.portfolioList = e).edgtfOnWindowLoad = t,
    e.edgtfOnWindowScroll = a,
    u(window).load(t),
    u(window).scroll(a)
}(jQuery),
function(f) {
    "use strict";
    var e = {};
    function t() {
        a()
    }
    function a() {
        var e = f(".edgtf-testimonials-holder.edgtf-testimonials-carousel");
        e.length && e.each(function() {
            var e = f(this)
              , t = e.find(".edgtf-testimonials-main")
              , o = e.children(".edgtf-testimonial-image-nav")
              , a = !0
              , d = !0
              , i = 5e3
              , n = 600
              , s = !1;
            if ("no" === t.data("enable-loop") && (a = !1),
            "no" === t.data("enable-autoplay") && (d = !1),
            void 0 !== t.data("slider-speed") && !1 !== t.data("slider-speed") && (i = t.data("slider-speed")),
            void 0 !== t.data("slider-speed-animation") && !1 !== t.data("slider-speed-animation") && (n = t.data("slider-speed-animation")),
            edgtf.windowWidth < 680 && (s = !0),
            t.length && o.length) {
                var r = t.owlCarousel({
                    items: 1,
                    loop: a,
                    autoplay: d,
                    autoplayTimeout: i,
                    smartSpeed: n,
                    autoplayHoverPause: !1,
                    dots: !1,
                    nav: !1,
                    mouseDrag: !1,
                    touchDrag: s,
                    onInitialize: function() {
                        t.css("visibility", "visible")
                    }
                })
                  , l = o.owlCarousel({
                    loop: a,
                    autoplay: d,
                    autoplayTimeout: i,
                    smartSpeed: n,
                    autoplayHoverPause: !1,
                    center: !0,
                    dots: !1,
                    nav: !1,
                    mouseDrag: !1,
                    touchDrag: !1,
                    responsive: {
                        1025: {
                            items: 5
                        },
                        0: {
                            items: 3
                        }
                    },
                    onInitialize: function() {
                        o.css("visibility", "visible"),
                        e.css("opacity", "1")
                    }
                });
                o.find(".owl-item").on("click touchpress", function(e) {
                    e.preventDefault();
                    var t = f(this).index()
                      , a = o.find(".owl-item.cloned").length
                      , d = 0 <= t - a / 2 ? t - a / 2 : t;
                    l.trigger("to.owl.carousel", d),
                    r.trigger("to.owl.carousel", d)
                })
            }
        })
    }
    (edgtf.modules.testimonialsCarousel = e).edgtfInitTestimonials = a,
    e.edgtfOnWindowLoad = t,
    f(window).load(t)
}(jQuery),
function(u) {
    "use strict";
    var e = {};
    function t() {
        !function() {
            var e = u(".edgtf-testimonials-image-pagination-inner");
            e.length && e.each(function() {
                var t = u(this)
                  , e = t.children().length
                  , a = !0
                  , d = !0
                  , o = 3500
                  , i = 500
                  , n = !1
                  , s = !1
                  , r = !1
                  , l = !0
                  , f = !1
                  , g = t;
                if ("no" === g.data("enable-loop") && (a = !1),
                void 0 !== g.data("slider-speed") && !1 !== g.data("slider-speed") && (o = g.data("slider-speed")),
                void 0 !== g.data("slider-speed-animation") && !1 !== g.data("slider-speed-animation") && (i = g.data("slider-speed-animation")),
                "yes" === g.data("enable-auto-width") && (n = !0),
                void 0 !== g.data("slider-animate-in") && !1 !== g.data("slider-animate-in") && (s = g.data("slider-animate-in")),
                void 0 !== g.data("slider-animate-out") && !1 !== g.data("slider-animate-out") && (r = g.data("slider-animate-out")),
                "no" === g.data("enable-navigation") && (l = !1),
                "yes" === g.data("enable-pagination") && (f = !0),
                l && f && t.addClass("edgtf-slider-has-both-nav"),
                f) {
                    var c = "#edgtf-testimonial-pagination";
                    u(".edgtf-tsp-item").on("click", function() {
                        t.trigger("to.owl.carousel", [u(this).index(), 300])
                    })
                }
                e <= 1 && (f = l = d = a = !1),
                t.waitForImages(function() {
                    u(this).owlCarousel({
                        items: 1,
                        loop: a,
                        autoplay: d,
                        autoplayHoverPause: !1,
                        autoplayTimeout: o,
                        smartSpeed: i,
                        margin: 0,
                        stagePadding: 0,
                        center: !1,
                        autoWidth: n,
                        animateIn: s,
                        animateOut: r,
                        dots: f,
                        dotsContainer: c,
                        nav: l,
                        drag: !0,
                        callbacks: !0,
                        navText: ['<span class="edgtf-prev-icon ion-chevron-left"></span>', '<span class="edgtf-next-icon ion-chevron-right"></span>'],
                        onInitialize: function() {
                            t.css("visibility", "visible")
                        },
                        onDrag: function(e) {
                            edgtf.body.hasClass("edgtf-smooth-page-transitions-fadeout") && 0 < e.isTrigger && t.addClass("edgtf-slider-is-moving")
                        },
                        onDragged: function() {
                            edgtf.body.hasClass("edgtf-smooth-page-transitions-fadeout") && t.hasClass("edgtf-slider-is-moving") && setTimeout(function() {
                                t.removeClass("edgtf-slider-is-moving")
                            }, 500)
                        }
                    })
                })
            })
        }()
    }
    (edgtf.modules.testimonialsImagePagination = e).edgtfOnDocumentReady = t,
    u(document).ready(t)
}(jQuery);
