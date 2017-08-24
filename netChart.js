/* @charset "UTF-8" */
/*
 * @author KuckBoy<shanchao@myhexin.com>
 * @create 2017-08-23
 */
(function ($) {
	//默认参数
	var defaluts = {
		title: '网状图',
		data: [],
		containerId: 'view_net_chart_container',
		backgroundColor: '#171b20',
		originBoll: {
			color: '#000',
			fontSize: '14px',
			border: '4px solid #38664d',
			backgroundColor: '#1d232a',
			zIndex: 999
		},
		originLine: {
			width: '2px',
			backgroundColor: '#1a2a28',
			zIndex: 9,
			transition: 'all 1s ease'
		},
		childBoll: {
			backgroundColor: '#59ce9e',
			zIndex: 999
		},
		childCircle: {
			border: '2px solid #1a2a28',
			zIndex: 9
		},
		grandsonBoll: {
			backgroundColor: '#56dad5',
			zIndex: 999
		},
		grandsonCircle: {
			border: '2px solid #1a2a28',
			zIndex: 9,
			transition: 'all 1s ease'
		}
	};

	$.fn.extend({
		netChart: function (options) {
			var self = this;
			var options = $.extend({}, defaluts, options);
			
			this.options = options;
			
			console.log(this.options);
			self._addContainer();	// 添加容器
			self._setSize();		// 设置容器大小
			self._draw();			// 绘图
			self._addEvent();		// 添加监听事件
			self._resize();			// resize 事件
			self._setText();
		},
		_setText: function () {
			this._setOriginText();
			this._setChildText();
			this._setGrandsonText();
		},
		_setOriginText: function () {
			$(this).find('.origin').text(this.options.title);
		},
		_setChildText: function () {

		},
		_setGrandsonText: function () {

		},
		_addContainer: function () {
			$(this).css({
				position: 'relative',
				backgroundColor: this.options.backgroundColor,
				overflow: 'hidden'
			});
			$(this).append('<div id="'+this.options.containerId+'"></div>');
		},
		_setSize: function () {
			var aData = this._getAdjustmentData();
			$('#'+this.options.containerId).css({
				position: 'absolute',
				width: aData.width,
				height: aData.height,
				top: aData.top,
				left: aData.left,
				overflow: 'hidden',
				
			});
		},
		_getAdjustmentData: function (a, b) {
			var width = $(this).width();
			var height = $(this).height();
			var length = width > height ? width : height;
			this.width = width;
			this.height = height;
			this.maxlength = length;
			var top = '0px', left = '0px';
			if (width > height) {
				top = -1 * (width - height) / 2 + 'px';
			} else {
				left = -1 * (height - width) / 2 + 'px';
			}
			return {
				width: length,
				height: length,
				top: top,
				left: left
			};
		},
		_draw: function () {
			this._drawOrigin();
			this._drawBollAndOriginLine();
			this._drawChildCircle();
			this._drawGrandsonLine();
		},
		_drawOrigin: function () {
			$('#'+this.options.containerId).append('<div class="origin" style="position: absolute;\
			top: 50%;\
			left: 50%;\
			transform: translate(-50%, -50%);\
			width: 12.5%;\
			height: 12.5%;\
			border-radius: 50%;\
			background-color: '+this.options.originBoll.backgroundColor+';\
			border: '+this.options.originBoll.border+';\
			z-index: '+this.options.originBoll.zIndex+';"></div>');
		},
		_drawBollAndOriginLine: function () {
			var self = this;
			var originLineHtml = '<ul class="origin-line">';
			var childHtml = '<ul class="child">';
			var grandsonHtml = '<ul class="grandson">';
			var deg = 360 / this.options.data.length;
			var lineHight, grandsonOpacity, grandsonClass;
			$.each(this.options.data, function (key, value) {
				if (value.child) {
					lineHight = 32;
				} else {
					lineHight = 17;
				}
				originLineHtml += '<li style="\
							list-style:none;\
							padding:0;\
							margin:0;\
							position: absolute;\
							left: 50%;\
							bottom: 50%;\
							width: '+self.options.originLine.width+';\
							height: '+lineHight+'%;\
							background: '+self.options.originLine.backgroundColor+';\
							transform-origin: center bottom;\
							z-index: '+self.options.originLine.zIndex+';\
							transition: '+self.options.originLine.transition+';\
							transform: rotate('+key*deg+'deg);"></li>';

				if (value.child) {
					grandsonOpacity = 1;
					grandsonClass = '';
				} else {
					grandsonOpacity = 0;
					grandsonClass = 'neverShow';
				}

				childHtml += '<li style="\
							cursor: '+(grandsonClass === 'neverShow' ? 'default' : 'pointer')+';\
							list-style:none;\
							padding:0;\
							margin:0;\
							position: absolute;\
							left: 50%;\
							top: 31.5%;\
							width: 5%;\
							height: 5%;\
							border-radius: 50%;\
							background: '+self.options.childBoll.backgroundColor+';\
							transform-origin: center 417%;\
							z-index: '+self.options.childBoll.zIndex+';\
							transform: translate(-50%, -50%) rotate('+key*deg+'deg);"></li>';
				
				grandsonHtml += '<li class="'+grandsonClass+'" \
							style="\
							list-style:none;\
							padding:0;\
							margin:0;\
							position: absolute;\
							left: 50%;\
							top: 16%;\
							width: 5%;\
							height: 5%;\
							border-radius: 50%;\
							background: #56dad5;\
							transform-origin: center 730%;\
							box-sizing: border-box;\
							z-index: 999;\
							transition: all 1s ease;\
							opacity: '+grandsonOpacity+';\
							transform: translate(-50%, -50%) rotate('+key*deg+'deg);"></li>';
			});
			
			originLineHtml += '</ul>';
			childHtml += '</ul>';
			grandsonHtml += '</ul>';

			$('#'+this.options.containerId).append(originLineHtml+childHtml+grandsonHtml);
		},
		_drawChildCircle: function () {
			var html = '<div class="child-circle" style="\
							position: absolute;\
							left: 50%;\
							top: 50%;\
							transform: translate(-50%, -50%);\
							width: 37%;\
							height: 37%;\
							border-radius: 50%;\
							border: '+this.options.childCircle.border+';\
							z-index: '+this.options.childCircle.zIndex+';\
							"></div>';
			$('#'+this.options.containerId).append(html);
		},
		_drawGrandsonLine: function () {
			var html = '<div class="grandson-circle" style="\
							position: absolute;\
							left: 50%;\
							top: 50%;\
							transform: translate(-50%, -50%);\
							width: 67%;\
							height: 67%;\
							border-radius: 50%;\
							border: '+this.options.grandsonCircle.border+';\
							z-index: '+this.options.grandsonCircle.zIndex+';\
							transition: '+this.options.grandsonCircle.transition+';\
							"></div>';
			$('#'+this.options.containerId).append(html);
		},
		_addEvent: function () {
			var self = this;
			$(this).on('click', '.child li', function () {
				var index = $(this).index();
				console.log(index);
				var grandsonLiDom = $(self).find('.grandson li');
				var originLiDom = $(self).find('.origin-line li');
				//console.log(grandsonLiDom);
				if (grandsonLiDom.eq(index).css('opacity') === '1') {
					// grandsonLiDom.eq(index).css('width', '200px');
					grandsonLiDom.eq(index).css('opacity', 0).addClass('origin-hide');
					originLiDom.eq(index).height('17%');
				} else {
					if (!grandsonLiDom.eq(index).hasClass('neverShow')) {
						grandsonLiDom.eq(index).css('opacity', 1).removeClass('origin-hide');
						originLiDom.eq(index).height('32%');
					}
				}
				if ($('.origin-hide').length === self.options.data.length) {
					$(self).find('.grandson-circle').css('opacity', 0);
				} else {
					$(self).find('.grandson-circle').css('opacity', 1);
				}
			});
		},
		_resize: function () {
			var self = this;
			$(this).resize(function () {
				self._setSize();
			});
		}
	});
	
})(jQuery);

//监听div大小变化
(function($, h, c) {
	var a = $([]),
	e = $.resize = $.extend($.resize, {}),
	i,
	k = "setTimeout",
	j = "resize",
	d = j + "-special-event",
	b = "delay",
	f = "throttleWindow";
	e[b] = 250;
	e[f] = true;
	$.event.special[j] = {
		setup: function() {
			if (!e[f] && this[k]) {
				return false;
			}
			var l = $(this);
			a = a.add(l);
			$.data(this, d, {
				w: l.width(),
				h: l.height()
			});
			if (a.length === 1) {
				g();
			}
		},
		teardown: function() {
			if (!e[f] && this[k]) {
				return false;
			}
			var l = $(this);
			a = a.not(l);
			l.removeData(d);
			if (!a.length) {
				clearTimeout(i);
			}
		},
		add: function(l) {
			if (!e[f] && this[k]) {
				return false;
			}
			var n;
			function m(s, o, p) {
				var q = $(this),
				r = $.data(this, d);
				r.w = o !== c ? o: q.width();
				r.h = p !== c ? p: q.height();
				n.apply(this, arguments);
			}
			if ($.isFunction(l)) {
				n = l;
				return m;
			} else {
				n = l.handler;
				l.handler = m;
			}
		}
	};
	function g() {
		i = h[k](function() {
			a.each(function() {
				var n = $(this),
				m = n.width(),
				l = n.height(),
				o = $.data(this, d);
				if (m !== o.w || l !== o.h) {
					n.trigger(j, [o.w = m, o.h = l]);
				}
			});
			g();
		},
		e[b]);
	}
})(jQuery, this);