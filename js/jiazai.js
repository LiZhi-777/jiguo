
(function ($) {
	$.fn.extend({
		"backBtn": function (options) {
			var ops = $.extend({
				isBack: true,
				goBack: false,
				scrollTop: 0,
				position: "auto",
				width: 1000,
				offset: 5,
				bottom: "auto",
				speed: 100,
				ifshow: true
			}, options);
			var $dom = $(this), $doc = $(document), $win = $(window);
			if (!$dom.get(0)) return;
			var opr = {
				getTop: function () {
					var t = $dom.offset().top;
					if (ops.bottom != "auto") {
						t = $win.height() - $dom.height() - ops.bottom;
					}
					return t;
				},
				getLeft: function () {
					var l = $dom.offset().left;
					var w = $dom.outerWidth();
					var ww = $win.width();
					var minw = ops.width + (ops.offset + w) * 2;
					if (ops.position == "left") {
						if (ww > minw) {
							l = (ww - ops.width) / 2 - w - ops.offset;
						} else {
							l = 0;
						}
					} else if (ops.position == "right") {
						if (ww > minw) {
							l = (ww - ops.width) / 2 + ops.width + ops.offset;
						} else {
							l = ww - w;
						}
					}
					return l;
				},
				ifShow: function () {
					if ($win.scrollTop() > ops.scrollTop) {
						$dom.show();
					} else {
						$dom.hide();
					}
				},
				setTop: function () {
					var t = this.getTop();
					var l = this.getLeft();
					if ($.browser.msie && $.browser.version === "6.0") {
						t = $doc.scrollTop() + t;
						if (t > $doc.height()) {
							t = $doc.height() - ops.bottom - $dom.outerWidth();
						}
						$dom.css({ position: "absolute", top: t, left: l });
					} else {
						$dom.css("position", "fixed");
						if ($dom.css("left") != l + "px") {
							$dom.css("left", l);
						}
						if ($dom.css("top") != t + "px") {
							$dom.css("top", t);
						}
					}
				},
				handler: function () {
					if (ops.isBack) {
						$dom.live('click', function () {
							$("body,html").animate({ scrollTop: 0 }, ops.speed);
							if (ops.scrollTop > 0) {
								$dom.hide();
							}
						});
					} else if (ops.goBack) {
						$dom.click(function () {
							history.go(-1);
						});
					}
					var self = this;
					self.setTop();
					if (!ops.ifshow) {
						self.ifShow();
					}
					$win.scroll(function () {
						if ($.browser.msie && $.browser.version === "6.0") {
							self.setTop();
						}
						if (!ops.ifshow) {
							self.ifShow();
						}
					});
					$win.resize(function () {
						self.setTop();
						if (!ops.ifshow) {
							self.ifShow();
						}
					});
				}
			};
			opr.handler();
			return $dom;
		}
	})
})(jQuery);


$(function () {

	/**
	 * @导购清单json
	 */
	var indexNum = 0, allLen;//当前加载json页数，json长度
	$("#guid-btn").live("click", function () {
		var self = $(this);
		var param = '';//加载html变量
		self.addClass("loading").html("正在加载中");
		$.post("json/json.js", function (data) {
			allLen = data.length;//获取json长度
			var data1 = data[indexNum];
			var dlen = data1.length;
			for (var j = 0; j < dlen; j++) {
				var thisd = data1[j];
				var img = thisd["img"];
				var text = thisd["text"];
				param += '<li><a href="detail.html"><img src="' + img + '" width="220" height="130"/><div class="info"><p class="name">' + text + '</p><div class="tip fix"><div class="right icon"><span class="xin">3</span><span class="look">3</span></div></div></div></a></li>';
			}
			self.parent().prev().append(param);
			indexNum++;
			if (indexNum >= allLen) {
				self.parent().html('<span class="no-more">没有更多啦~</span>');
				indexNum = 0;
			} else {
				self.removeClass("loading").html("点击加载更多");
			}
		}, "json");
	});

	/**
	 * @首页酷玩&&&酷玩页面json
	 */
	$(".comMore").click(function () {
		var self = $(this);
		var param = '';//加载html变量
		self.addClass("loading").html("正在加载中");
		$.post("json/json.js", function (data) {
			allLen = data.length;//获取json长度
			var data1 = data[indexNum];
			var dlen = data1.length;
			for (var j = 0; j < dlen; j++) {
				var thisd = data1[j];
				var img = thisd["img"];
				var text = thisd["text"];
				var price = thisd["price"];
				param += '<li><a href="use/detail.html"><img src="' + img + '" width="220" height="130"/><div class="info"><p class="name">' + text + '</span></p><div class="tip fix"><span class="price left">' + price + '</span><div class="right icon"><span class="xin">3</span><span class="look">3</span></div></div></div></a></li>';
			}
			self.parent().prev().append(param);
			indexNum++;
			if (indexNum >= allLen) {
				self.parent().html('<span class="no-more">没有更多啦~</span>');
				indexNum = 0
			} else {
				self.removeClass("loading").html("点击加载更多");
			}
		}, "json");
	});

	//返回顶部
	$("#back").backBtn({
		isBack: true,
		goBack: false,
		scrollTop: 0,
		position: "right",
		width: 1000,
		offset: 50,
		bottom: 50,
		ifshow: false,
		speed: 300
	});
});