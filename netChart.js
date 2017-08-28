/* @charset "UTF-8" */
/*
 * @author KuckBoy<shanchao@myhexin.com>
 * @create 2017-08-23
 */
(function ($) {
	//默认参数
	var defaluts = {
		common: {
			fontFamily: '微软雅黑'
		},
		title: {
			text: '网状图网状图',
			color: '#3c6c50',
			fontSize: '20px',
			lineHeight: '20px',
			fontWeight: 'bold'
		},
		expand: true,
		data: [],
		containerId: 'view_net_chart_container',
		backgroundColor: '#171b20',
		originBoll: {
			color: '#000',
			fontSize: '14px',
			border: '4px solid #3c6c50',
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
			var myDate = new Date();
			var options = $.extend({}, defaluts, options);
			this.options = options;
			this.options.containerId = this.options.containerId + myDate.getTime();

			self._addContainer();	// 添加容器
			self._setSize();		// 设置容器大小
			self._draw();			// 绘图
			self._addEvent();		// 添加监听事件
			self._resize();			// resize 事件
		},
		_addContainer: function () {
			$(this).css({
				position: 'relative',
				backgroundColor: this.options.backgroundColor,
				overflow: 'hidden',
				fontFamily: this.options.common.fontFamily
			});
			$(this).html('<div id="'+this.options.containerId+'"></div>');
		},
		_setSize: function () {
			var aData = this._getAdjustmentData();
			$(this).find('#'+this.options.containerId).css({
				position: 'absolute',
				width: aData.width,
				height: aData.height,
				top: aData.top,
				left: aData.left,
				overflow: 'hidden'
			});
		},
		_getAdjustmentData: function (a, b) {
			var width = $(this).width();
			var height = $(this).height();
			var length = width < height ? width : height;
			this.width = width;
			this.height = height;
			this.maxlength = length;
			var top = '0px', left = '0px';
			if (width > height) {
				left = (width - height) / 2 + 'px';
			} else {
				top = (height - width) / 2 + 'px';
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
			this._drawBollAndOriginLineAndText();
			this._drawChildCircle();
			this._drawGrandsonLine();
		},
		_drawOrigin: function () {
			$(this).find('#'+this.options.containerId).append('<div class="origin" style="\
				position: absolute;\
				top: 50%;\
				left: 50%;\
				transform: translate(-50%, -50%);\
				width: 13%;\
				height: 13%;\
				border-radius: 50%;\
				background-color: '+this.options.originBoll.backgroundColor+';\
				border: '+this.options.originBoll.border+';\
				z-index: '+this.options.originBoll.zIndex+';\
				color: '+this.options.title.color+';\
				font-size: '+this.options.title.fontSize+';\
				text-align: center;\
				padding: 10px;\
				box-sizing: border-box;\
				display: flex;\
				align-items: center;\
				">\
					<span style="\
						text-align: center;\
						display: inline-block;\
						width: 100%;\
					">'+this.options.title.text+'</span>\
				</div>');
		},
		_getAddOption: function (addOption, deg) {
			if (addOption) {
				return '<div class="option">\
							<span style="\
								display: inline-block;\
								width: 40%;\
								min-width: 20px;\
								height: 4%;\
								background-color: #a3e8cc;\
								position: absolute;\
								top: 50%;\
								left: 50%;\
								transform: translate(-50%, -50%) rotate(-'+deg+'deg);\
								"></span>\
							<span style="\
								display: inline-block;\
								width: 40%;\
								min-width: 20px;\
								height: 4%;\
								background-color: #a3e8cc;\
								position: absolute;\
								top: 50%;\
								left: 50%;\
								transform: translate(-50%, -50%) rotate('+(90-deg)+'deg);\
								"></span>\
						</div>';
			} else {
				return '<div class="option">\
							<span style="\
								display: inline-block;\
								width: 40%;\
								min-width: 20px;\
								height: 4%;\
								background-color: #a3e8cc;\
								position: absolute;\
								top: 50%;\
								left: 50%;\
								transform: translate(-50%, -50%) rotate(-'+deg+'deg);\
								"></span>\
						</div>';
			}
		},
		_drawBollAndOriginLineAndText: function () {
			var self = this;
			var originLineHtml = '<ul class="origin-line">';
			var childHtml = '<ul class="child">';
			var grandsonHtml = '<ul class="grandson">';
			var deg = 360 / this.options.data.length;
			var lineHight, grandsonOpacity, grandsonClass,grandsonTextHtml;
			$.each(this.options.data, function (key, value) {
				var rotateDeg = deg * key;
				var textRotateDeg = 0;
				if (rotateDeg <= 90 || rotateDeg > 270) {
					textRotateDeg = 0;
				} else {
					textRotateDeg = 180;
				}
				if (value.child) {
					if (self.options.expand) {
						lineHight = 32;
					} else {
						lineHight = 17;
					}
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
							background-color: '+self.options.originLine.backgroundColor+';\
							transform-origin: center bottom;\
							z-index: '+self.options.originLine.zIndex+';\
							transition: '+self.options.originLine.transition+';\
							transform: rotate('+rotateDeg+'deg);"></li>';

				if (value.child) {
					if (self.options.expand) {
						grandsonOpacity = 1;
					} else {
						grandsonOpacity = 0;
					}
					
					grandsonClass = '';
					grandsonTextHtml = '<span style="\
									color: '+self.options.grandsonBoll.backgroundColor+';\
									font-size: 12px;\
									display: block;\
									width: 200px;\
									height: 12px;\
									line-height: 12px;\
									position: absolute;\
									top: -15px;\
									left: 50%;\
									text-align: center;\
									transform: translate(-50%, -50%) rotate('+textRotateDeg+'deg);\
								">'+value.child.title+'</span>';
					$.each(value.child.subtitle, function (k, v) {
						grandsonTextHtml += '<span style="\
									color: '+self.options.grandsonBoll.backgroundColor+';\
									font-size: 12px;\
									display: block;\
									width: 200px;\
									height: 12px;\
									line-height: 12px;\
									position: absolute;\
									top: -'+(35+k*20)+'px;\
									left: 50%;\
									text-align: center;\
									transform: translate(-50%, -50%) rotate('+textRotateDeg+'deg);\
								">'+v+'</span>';
					});
				} else {
					grandsonOpacity = 0;
					grandsonClass = 'neverShow';
					grandsonTextHtml = '';
				}

				childHtml += '<li data-deg="'+rotateDeg+'" style="\
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
							background-color: '+self.options.childBoll.backgroundColor+';\
							transform-origin: center 417%;\
							z-index: '+self.options.childBoll.zIndex+';\
							transform: translate(-50%, -50%) rotate('+rotateDeg+'deg);">\
								'+(grandsonClass === 'neverShow' ? '' : self._getAddOption(!self.options.expand, rotateDeg))+'\
								<span style="\
									color: '+self.options.childBoll.backgroundColor+';\
									font-size: 12px;\
									display: block;\
									width: 200px;\
									height: 12px;\
									line-height: 12px;\
									position: absolute;\
									top: -15px;\
									left: 50%;\
									text-align: center;\
									transform: translate(-50%, -50%) rotate('+textRotateDeg+'deg);\
								">'+value.title+'</span>\
							</li>';
				
				grandsonHtml += '<li class="'+grandsonClass+' '+(grandsonClass === 'neverShow' ? 'origin-hide': self.options.expand ? '' : 'origin-hide')+'" \
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
							background-color: '+self.options.grandsonBoll.backgroundColor+';\
							transform-origin: center 730%;\
							box-sizing: border-box;\
							z-index: '+self.options.grandsonBoll.zIndex+';\
							transition: all 1s ease;\
							opacity: '+grandsonOpacity+';\
							transform: translate(-50%, -50%) rotate('+rotateDeg+'deg);">\
								'+grandsonTextHtml+'\
							</li>';
			});
			
			originLineHtml += '</ul>';
			childHtml += '</ul>';
			grandsonHtml += '</ul>';

			$(this).find('#'+this.options.containerId).append(originLineHtml+childHtml+grandsonHtml);
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
			$(this).find('#'+this.options.containerId).append(html);
		},
		_drawGrandsonLine: function () {
			var html = '<div class="grandson-circle" style="\
							position: absolute;\
							left: 50%;\
							top: 50%;\
							transform: translate(-50%, -50%);\
							width: 68%;\
							height: 68%;\
							border-radius: 50%;\
							border: '+this.options.grandsonCircle.border+';\
							z-index: '+this.options.grandsonCircle.zIndex+';\
							transition: '+this.options.grandsonCircle.transition+';\
							opacity: '+(this.options.expand ? 1 : 0)+';\
							"></div>';
			$(this).find('#'+this.options.containerId).append(html);
		},
		_addEvent: function () {
			var self = this;
			$(this).find('#'+this.options.containerId).on('click', '.child li', function () {
				var index = $(this).index();
				$(this).find('.option').remove();

				var grandsonLiDom = $(self).find('.grandson li');
				var originLiDom = $(self).find('.origin-line li');
				if (grandsonLiDom.eq(index).css('opacity') === '1') {
					grandsonLiDom.eq(index).css('opacity', 0).addClass('origin-hide');
					originLiDom.eq(index).height('17%');
					$(this).append(self._getAddOption(true, parseFloat($(this).attr('data-deg'))));
				} else {
					if (!grandsonLiDom.eq(index).hasClass('neverShow')) {
						grandsonLiDom.eq(index).css('opacity', 1).removeClass('origin-hide');
						originLiDom.eq(index).height('32%');
						$(this).append(self._getAddOption(false, parseFloat($(this).attr('data-deg'))));
					}
				}
				if ($(self).find('.origin-hide').length === self.options.data.length) {
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