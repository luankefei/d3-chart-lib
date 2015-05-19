# 基于d3的图表组件


整个组件库由数据和绘图两部分组成


##阅读顺序

main.js -> core.js -> dom.js -> http.js -> chart.js -> interactive.js -> events -> component.js -> util.js -> extend.js



##模块概要

main模块负责声明命名空间，提供一个基础的amd加载模块。

core提供组件库的核心接口，如init

dom模块负责解析页面的chart标签及子标签

http模块负责加载

chart是整个图表的基类，作为绘图入口

interactive定义了基础的几种交互类型，与页面的interactive标签配合使用，通过data-type来指定

extend负责暴露api到组件对象

##绘图组件

axis坐标轴

grid网格

legend图例

timeline时间轴

title标题

tooltip提示气泡

##关于组件库的设计


一、 模块加载

声明式设计，目的是减少全局污染、隐藏私有对象和多人协同开发。

目前想到的可行方案：

1. 命名空间方式 namespace.util、namespace.http

2. 闭包 var moduleA = (function() { return 'A' })

3. 自己实现amd，核心api是define、require和use

4. 使用node将amd、cmd和commonjs规范的代码编译成浏览器端可用的js

二、如何使用

设计思路是将整个图表包装成一个web组件，灵感来源于jquery插件和angular的directive
这与当前流行的web compoent组件化思路一致，未来切换到shadow dom也会很顺利

一个图表由3部分组成，html代码段，js和样式。在使用默认样式的情况下，代码大致如下：

```html
<chart id="bar" data-name="worldMap">
    <data>[0, 10, 5, 20, 35, 15, 25, 23, 28, 33, 24, 14, 19]</data>
    <config src="data/style.js"></config>
    <interactive data-name="mouseover" data-trigger="bar" data-type="highlight"></interactive>
    <component data-name="axis"></component>
</chart>
```

```javascript
// 常规绘图
var node = document.getElementById('bar')
Y.init(node)
```

在项目中，有些情况下，需要将多个图表生成到同一个svg内，以方便绘制关联图形，如连线。
所以，在init方法上，增加了另外两个参数：replace, target

如果replace为true（默认false），则绘图时，会在svg内生成一个g节点，图表将绘制在g节点内
如果传入target，图表将会绘制在target的svg内，作为附属图表

```javascript
// 多图公用svg
var map = Y.find('#map')
var node = document.getElementById('bar')

Y.init(node, true, map)
```


三、事件绑定

事件绑定分两种，一种是通过interactive标签绑定，默认支持约10种事件。另一种是通过重写事件来进行扩展绑定。这里主要介绍扩展绑定。

```html
<!-- 默认事件 -->
<interactive data-name="mouseover" data-trigger="bar" data-type="highlight"></interactive>
```

```javascript
// 事件扩展
var chart = T.find('#bar', node)

var handler = {
    part: 'bar',
    name: 'click',
    type: 'custom',
    func: function(e) {
        e.target.style.fill = 'red'
    }
}

// 注册事件
Y.addEvent(chart, handler)
```

四、样式

样式文件暂时放置在config.json内，以作示例。绘制图表和组件所需样式均从这里读取
该文件暂时作为示例文件，以规范结构、方便测试。后面会作为默认数据，用户可使用api对其重写


五、扩展

1.增加图表。将js文件放置在src/js/chart下即可

2.增加组件。将js文件放置在src/js/component下即可

3.增加事件。将代码添加到src/js/events即可

六、与图易的结合

1.生成div

2.生成图表模板

3.调用组件初始化函数

done!


