## 一、项目描述

- 一个基于 vue、datav、Echart 框架的 " **数据大屏项目** "，通过 vue 组件实现数据动态刷新渲染，内部图表可实现自由替换。部分图表使用 DataV 自带组件，可进行更改，详情请点击下方 DataV 文档。
- 项目需要全屏展示（按 F11）。
- 项目部分区域使用了全局注册方式，增加了打包体积，在实际运用中请使用**按需引入**。
- 拉取项目之后，建议按照自己的功能区域重命名文件，现以简单的位置进行区分。
- 项目环境：vue-cli-3.0、webpack-4.0、npm-6.13、node-v12.16。
- 请拉取 master 分支的代码，其余是开发分支。

友情链接：

1.  [DataV 官方文档（建议使用之前先浏览）](http://datav.jiaminghi.com/guide/)
2.  [echarts 实例](https://www.echartsjs.com/examples/zh/index.html)，[echarts 官方文档](https://www.echartsjs.com/zh/option.html#title)
3.  [Vue 官方文档](https://cn.vuejs.org/v2/guide/instance.html)
4.  [项目 gitee 地址（国内速度快）](https://gitee.com/MTrun/big-screen-vue-datav)

项目展示
![项目展示](https://images.gitee.com/uploads/images/2020/0411/221307_0f8af2e7_4964818.gif '20200411_221020.gif')

## 二、主要文件介绍

| 文件                | 作用/功能                                           |
| ------------------- | --------------------------------------------------- |
| main.js             | 主目录文件，引入Echart/DataV等文件                   |
| utils               | 工具函数与 mixins 函数等                            |
| views/ index.vue    | 项目主结构                                          |
| views/其余文件      | 界面各个区域组件（按照位置来命名）ajax 接口请求位置 |
| assets              | 静态资源目录，放置 logo 与背景图片                  |
| assets / style.scss | 通用 CSS 文件，全局项目快捷样式调节                 |
| assets / index.scss | Index 界面的 CSS 文件                               |
| components/echart   | 所有 echart 图表（按照位置来命名）                  |
| common/flexible.js  | flexible 插件代码（适配屏幕尺寸，定制化修改）       |

## 三、使用介绍

1. **如何启动项目**

   需要提前安装好`nodejs`与`npm`,下载项目后在项目主目录下运行`npm/cnpm install`拉取依赖包，然后使用 `vue-cli` 或者直接使用命令`npm run serve`，就可以启动项目，启动项目后需要手动全屏（按 F11）。

2. **如何请求数据**

   现在的项目未使用前后端数据请求，建议使用 axios 进行数据请求，在 main.js 位置进行全局配置，在 views/xx.vue 文件里进行前后端数据请求。

- axios 的 main.js 配置参考范例（因人而异）

```js
import axios from 'axios';

//把方法放到vue的原型上，这样就可以全局使用了
Vue.prototype.$http = axios.create({
  //设置20秒超时时间
  timeout: 20000,
  baseURL: 'http://172.0.0.1:80080', //这里写后端地址
});
```

- 在 vue 页面中调用 axios 方法并通过 props 传给 echarts 图表子组件

```js
export default {
  data() {
  	ListDataSelf:[]
  },
  mounted() {
   this.fetchList(); //获取数据
  },
  methods: {
	async fetchList(){
	  const { code,listData }= await this.$http.get("xx/xx/xx"x);
	  if(code === 200){
		 this.ListDataSelf= listData;
	  }
	}
  }
 }
```

3. **如何动态渲染图表**

   在`components/echart`下的文件，比如`drawPie()`是渲染函数，`echartData`是需要动态渲染的数据，当外界通过`props`传入新数据，我们可以使用`watch()`方法去监听，一但数据变化就调用`this.drawPie()`并触发内部的`.setOption`函数，重新渲染一次图表。

```js
//这里是子组件内部

props: ["listData"],
watch: {
  listData(newValue) {
     this.echartData= newValue;
     this.drawPie();
   },
  },
methods: {
  drawPie() {
  	.....
  	'渲染节点名称'.setOption(option);
  }
 }
```

4. **如何复用图表组件**

   因为 Echart 图表是根据`id/class`去获取 Dom 节点并进行渲染的，所以我们只要传入唯一的 id 值与需要的数据就可以进行复用。如中间部分的`任务通过率与任务达标率`组件就是采用复用的方式。

如：在调用处`views/center.vue`里去定义好数据并传入组件（项目里的所有`id`都不能重复!!!）

```js
//组件调用
<span>今日任务通过率</span>
<centerChart :id="rate[0].id" :tips="rate[0].tips" :colorObj="rate[0].colorData" />

<span>今日任务达标率</span>
<centerChart :id="rate[1].id" :tips="rate[1].tips" :colorObj="rate[1].colorData" />

...
import centerChart from "@/components/echart/center/centerChartRate";

data() {
  return {
    rate: [
      {
        id: "centerRate1",
        tips: 60,
        ...
      },
      {
        id: "centerRate2",
        tips: 40,
        colorData: {
          ...
        }
      }
    ]
  }
}
```

然后在复用的组件`components/echart/center/centerChartRate`里进行接收并在用到的地方赋值。

5. **如何更换边框**

   边框是使用了 DataV 自带的组件，只需要去 views 目录下去寻找对应的位置去查找并替换就可以，具体的种类请去 DavaV 官网查看
   如：

```html
<dv-border-box-1></dv-border-box-1>
<dv-border-box-2></dv-border-box-2>
<dv-border-box-3></dv-border-box-3>
```

6. **如何更换图表**

   直接进入 `components/echart` 下的文件修改成你要的 echarts 模样，可以去[echarts 官方社区](https://gallery.echartsjs.com/explore.html#sort=rank~timeframe=all~author=all)里面查看案例。

7. **Mixins 注入的问题**

   使用 mixins 注入解决了图表重复书写响应式适配的代码，如果要更换(新增)图形，需要将`echarts.init()`函数赋值给`this.chart`，然后 mixins 才会自动帮你注入响应式功能。

8. **屏幕适配问题**

   本项目借助了 flexible 插件，通过改变 rem 的值来进行适配，原设计为 1920px。 ，适配区间为：1366px ~ 2560px，本项目有根据实际情况进行源文件的更改，小屏幕（如:宽为 1366px）需要自己舍弃部分动态组件进行适配，如'动态文字变换组件'会影响布局，需要手动换成一般节点，

```js
// flexible文件位置: `common/flexible.js`,修改部分如下
function refreshRem() {
  var width = docEl.getBoundingClientRect().width;
  // 最小1366px，最大适配2560px
  if (width / dpr < 1366) {
    width = 1366 * dpr;
  } else if (width / dpr > 2560) {
    width = 2560 * dpr;
  }
  // 原项目是1920px我设置成24等份，这样1rem就是80px
  var rem = width / 24;
  docEl.style.fontSize = rem + 'px';
  flexible.rem = win.rem = rem;
}
```

## 四、更新情况

1. 增加了 Echart 组件复用的功能，如：中间任务达标率的两个百分比图使用的是同一个组件。
2. 修复了头部右侧的图案条不对称的问题。
3. 修复屏幕适配问题，更换了所有的尺寸单位，统一使用 rem。
4. 使用 Mixins 注入图表响应式代码。
5. vue-awesome 改成按需引入的方式

## 五、其余

这个项目是个人的作品，难免会有问题和 BUG，如果有问题请进行评论，我也会尽力去更新，自己也在前端学习的路上，欢迎交流，非常感谢！
