<template>
  <div>
    <div id="bottomLeftChartState" style="width: 4.35rem; height: 3.05rem; margin:-.6rem 0 0 .1rem;"></div>
  </div>
</template>

<script>
import echartMixins from "@/utils/resizeMixins";
export default {
  data() {
    return {
      chart: null,
    };
  },
  mixins: [echartMixins],
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(
        document.getElementById("bottomLeftChartState")
      );

      let option = {
        // title: {
        //   text: "建议各状态组成（单位:件）",
        //   subtext: "状态图",
        // },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            var tar = params[1];
            return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
          },
        },
        // grid: {
        //   left: "3%",
        //   right: "4%",
        //   bottom: "3%",
        //   containLabel: true,
        // },
        xAxis: {
          type: "category",
          splitLine: { show: false },
          data: ["总费用", "房租", "水电费", "交通费", "伙食费", "日用品数"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "辅助",
            type: "bar",
            stack: "总量",
            itemStyle: {
              barBorderColor: "rgba(0,0,0,0)",
              color: "rgba(0,0,0,0)",
            },
            emphasis: {
              itemStyle: {
                barBorderColor: "rgba(0,0,0,0)",
                color: "rgba(0,0,0,0)",
              },
            },
            data: [0, 1700, 1400, 1200, 300, 0],
          },
          {
            name: "件数",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "inside",
            },
            data: [2900, 1200, 300, 200, 900, 300],
          },
        ],
      };

      this.chart.setOption(option);
    },
    refresh(data) {
      let option = this.chart.getOption();
      var showList = new Array();
      var hiddenList = new Array();
      var wordList = new Array();
      // let coutSum = data[0];
      let temp = 0;
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        wordList.push(element.X0);
        showList.push(element.COUNT);
        if (index > 1) {
          temp += data[index - 1].COUNT;
        }
        hiddenList.push(temp);
      }

      option.xAxis[0].data = wordList;
      option.series[0].data = hiddenList;
      option.series[1].data = showList;

      // console.log(wordLisst)
      // console.log(hiddenList)
      // console.log(showList)
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