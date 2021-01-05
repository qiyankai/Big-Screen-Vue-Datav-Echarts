<template>
  <div>
    <div id="bottomRightChart" style="width: 11.25rem; height: 6rem"></div>
  </div>
</template>

<script>
import echartMixins from "@/utils/resizeMixins";
import "../../../../node_modules/echarts/map/js/province/beijing.js";
export default {
  data() {
    return {
      chart: null,
      index: -1,
    };
  },
  mounted() {
    this.draw();
    this.charTimg();
  },
  mixins: [echartMixins],
  methods: {
    charTimg() {
      setInterval(() => {
        // 定时显示提示框和高亮效果
        // 隐藏提示框
        this.chart.dispatchAction({
          type: "hideTip",
          seriesIndex: 0,
          dataIndex: this.index,
        });
        // 显示提示框
        this.chart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: this.index + 1,
        });
        // 取消高亮指定的数据图形
        this.chart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: this.index,
        });
        // 高亮指定的数据图形
        this.chart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: this.index + 1,
        });
        this.index++;
        if (this.index > 17 - 1) {
          this.index = -1;
        }
      }, 1000);
    },
    draw() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(
        document.getElementById("bottomRightChart")
      );
      //  ----------------------------------------------------------------
      // 数据
      let option = {
        title: {
          // text: "北京",
          subtext: "",
          sublink: "",
          // 值: 'top', 'middle', 'bottom' 也可以是具体的值或者百分比
          top: 25,
          // 值: 'left', 'center', 'right' 同上
          left: "center",
          // 文本样式
          textStyle: {
            // 字体大小
            fontSize: 25,
            // 字体粗细
            fontWeight: 650,
            // 字体颜色
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "item",
          // 使用函数模板，传入的数据值 ——> value: number | Array
          formatter: "{b}<br/>建议数量:{c} (件)",
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        visualMap: {
          // continuous 类型为连续型
          type: "continuous",
          // 是否显示 visualMap-continuous 组件 如果设置为 false，不会显示，但是数据映射的功能还存在
          show: true,
          // 指定 visualMapContinuous 组件的允许的最小/大值 min/max 必须用户指定
          min: 0,
          // min,max 形成了视觉映射的定义域
          max: 75 ,
          // 文本样式
          textStyle: {
            // 字体大小
            fontSize: 15,
            // 字体颜色
            color: "#fff",
          },
          // 拖拽时，是否实时更新
          realtime: true,
          // 是否显示拖拽用的手柄
          calculable: true,
          // 定义在选中范围中的视觉元素
          inRange: {
            // 图元的颜色
            color: [
              "#e0f3f8",
              "#abd9e9",
              "#74e2ca",
              "#85daef",
              "#9feaa5",
              "#5475f5",

              // '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026',

              // "#e0f3f8",
              // "#abd9e9",
              // "#74add1",
              // "#4575b4",
              // "#313695",
            ],
          },
        },
        series: [
          {
            // 类型
            type: "map",
            // 系列名称，用于tooltip的显示，legend 的图例筛选 在 setOption 更新数据和配置项时用于指定对应的系列
            map: "北京",
            // 地图类型
            mapType: "province",
            // 是否开启鼠标缩放和平移漫游 默认不开启
            // 如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move' 设置成 true 为都开启
            roam: false,
            // 定位 值: 'top', 'middle', 'bottom' 也可以是具体的值或者百分比
            top: 70,
            // 图形上的文本标签
            label: {
              show: false, // 是否显示对应地名
            },
            // 地图区域的多边形 图形样式
            itemStyle: {
              // 地图区域的颜色 如果设置了visualMap, 这个属性将不起作用
              areaColor: "#7B68EE",
              // 描边线宽 为 0 时无描边
              borderWidth: 0.5,
              // 图形的描边颜色 支持的颜色格式同 color
              borderColor: "#000",
              // 描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'
              borderType: "solid",
            },
            // 高亮状态
            emphasis: {
              // 文本标签
              label: {
                // 是否显示标签
                show: true,
                // 文字的颜色 如果设置为 'auto'，则为视觉映射得到的颜色，如系列色
                color: "auto",
              },
              // 图形样式
              itemStyle: {
                // 地图区域的颜色
                areaColor: "#FF6347",
              },
            },
            nameProperty:'name',
            // 地图系列中的数据内容数组，数组项可以为单个数值
            data: [
              { name: "怀柔团", value: 38 },
              { name: "密云团", value: 47 },
              { name: "昌平团", value: 196 },
              { name: "顺义团", value: 102 },
              { name: "平谷团", value: 42 },
              { name: "门头沟团", value: 30 },
              { name: "海淀团", value: 369 },
              { name: "石景山团", value: 65 },
              { name: "西城团", value: 129 },
              { name: "东城团", value: 90 },
              { name: "朝阳团", value: 395 },
              { name: "大兴团", value: 156 },
              { name: "房山团", value: 104 },
              { name: "丰台团", value: 232 },
            ],
            // 自定义名称映射
            nameMap: {
              "怀柔区": "怀柔团",
              "密云区": "密云团",
              "昌平区": "昌平团",
              "顺义区": "顺义团",
              "平谷区": "平谷团",
              "门头沟区": "门头沟团",
              "海淀区": "海淀团",
              "石景山区": "石景山团",
              "西城区": "西城团",
              "东城区": "东城团",
              "朝阳区": "朝阳团",
              "大兴区": "大兴团",
              "房山区": "房山团",
              "丰台区": "丰台团",
              "延庆区": "延庆团",
              "通州区": "通州团",
              "驻京部队代表团": "通州团",
            },
          },
        ],
      };
      this.chart.setOption(option);
    },
    refresh(data) {
      let option = this.chart.getOption();
      option.series[0].data = data;
      this.chart.setOption(option);
    },
  },
  destroyed() {
    window.onresize = null;
  },
};
</script>

<style lang="scss" scoped>
</style>