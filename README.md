# net-charts
## 简介

net-charts 是基于 jQuery 的图表插件，兼容ie10及以上常规浏览器。

![](https://img.shields.io/badge/IE-10+-green.svg)
![](https://img.shields.io/badge/chrome-ok-green.svg)
![](https://img.shields.io/badge/Firefox-ok-green.svg)


## 使用方法

1、引入文件
``` html
<script src="http://s.thsi.cn/js/jquery-1.8.3.min.js"></script>
<script src="netChart.js"></script>
```
2、HTML
``` html
<div id="container"></div>
```
3、Javascript
``` javascript
$('#container').$('#view_net_chart').netChart({
	title: {
		text: '啤酒行业利空',
		color: '#3c6c50',
		fontSize: '16px',
		lineHeight: '16px',
		fontWeight: 'bold'
	},
	expand: false,
	data: [
		{
			title: '啤酒需求下降1',
			child: {
				title: '(小麦胚芽油的上游需求是小麦)',
				subtitle: [
					'小米胚芽油需求上升'
				]
			} 
		},
		{
			title: '啤酒需求下降1'
		},
		{
			title: '啤酒需求下降1',
			child: {
				title: '(小麦胚芽油的上游需求是小麦)',
				subtitle: [
					'小米胚芽油需求上升',
					'小米胚芽油需求上升'
				]
			} 
		}
	]
});
```

# 配置
- 默认都可以不传
```js
var defaluts = {
	common: {
		fontFamily: '微软雅黑'	// 字体样式设置
	},
	title: {			// 图表的名称（圆心的文字）
		text: '网状图网状图',		
		color: '#3c6c50',
		fontSize: '20px',
		lineHeight: '20px',
		fontWeight: 'bold'
	},
	expand: true,				// 是否默认展开
	data: [],					// 数据
	containerId: 'view_net_chart_container',	// 此项不支持配置
	backgroundColor: '#171b20',			// 背景的颜色
	originBoll: {		// 圆心球的样式
		color: '#000',
		fontSize: '14px',
		border: '4px solid #3c6c50',
		backgroundColor: '#1d232a',
		zIndex: 999
	},
	originLine: {	// 圆心发散线的样式
		width: '2px',
		backgroundColor: '#1a2a28',
		zIndex: 9,
		transition: 'all 1s ease'
	},
	childBoll: {	// 子球样式
		backgroundColor: '#59ce9e',
		zIndex: 999
	},
	childCircle: {	// 子球围绕线
		border: '2px solid #1a2a28',
		zIndex: 9
	},
	grandsonBoll: {	// 孙子球样式
		backgroundColor: '#56dad5',
		zIndex: 999
	},
	grandsonCircle: {	// 孙子围绕线样式
		border: '2px solid #1a2a28',
		zIndex: 9,
		transition: 'all 1s ease'
	}
};
```

# 历史更新
```
2. 17/08/28
@BUG 孙子球颜色不能设置，切换显示不显示问题。

1. 17/08/25
@MOD 显示大小设置为宽高的最小值，水平垂直居中。
@BUG 孙子球上的数据显示不正确。

```
