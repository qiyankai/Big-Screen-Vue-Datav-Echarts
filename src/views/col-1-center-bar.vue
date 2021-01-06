<template>
  <div id="col1CenterBar" style="width: 100%; height: 100%;"></div>
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
    refresh(data) {
      let option = this.chart.getOption();
      let allList = new Array();
      let hanList = new Array();
      let groupList = new Array();
      let rateList = new Array();
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        groupList.push(element.X0);
        allList.push(element.ALL_COUNT);
        hanList.push(element.HAN_COUNT);
        let temp = element.HAN_COUNT / element.ALL_COUNT;
        rateList.push(temp.toFixed(2));
      }
      option.xAxis.data = groupList;
      option.series[0].data = rateList;
      option.series[1].data = hanList;
      option.series[2].data = allList;
      this.chart.setOption(option);
    },
    draw() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(
        document.getElementById("col1CenterBar")
      );
      //  ----------------------------------------------------------------
      let category = [
        // "市区",
        // "万州",
        // "江北",
        // "南岸",
        // "北碚",
        // "綦南",
        // "长寿",
        // "永川",
        // "璧山",
        // "江津",
        // "城口",
        // "大足",
        // "垫江",
        // "丰都",
        // "奉节",
        // "合川",
        // "江津区",
        // "开州",
        // "南川",
        // "彭水",
        // "黔江",
        // "石柱",
        // "铜梁",
        // "潼南",
        // "巫山",
        // "巫溪",
        // "武隆",
        // "秀山",
        // "酉阳",
        // "云阳",
        // "忠县",
        // "川东",
        // "检修",
      ];
      let allData = [
        // 18092,
        // 20728,
        // 24045,
        // 28348,
        // 32808,
        // 36097,
        // 39867,
        // 44715,
        // 48444,
        // 50415,
        // 56061,
        // 62677,
        // 59521,
        // 67560,
        // 18092,
        // 20728,
        // 24045,
        // 28348,
        // 32808,
        // 36097,
        // 39867,
        // 44715,
        // 48444,
        // 50415,
        // 36097,
        // 39867,
        // 44715,
        // 48444,
        // 50415,
        // 50061,
        // 32677,
        // 49521,
        // 32808,
      ];
      let hanData = [
        // 4600,
        // 5000,
        // 5500,
        // 6500,
        // 7500,
        // 8500,
        // 9900,
        // 12500,
        // 14000,
        // 21500,
        // 23200,
        // 24450,
        // 25250,
        // 33300,
        // 4600,
        // 5000,
        // 5500,
        // 6500,
        // 7500,
        // 8500,
        // 9900,
        // 22500,
        // 14000,
        // 21500,
        // 8500,
        // 9900,
        // 12500,
        // 14000,
        // 21500,
        // 23200,
        // 24450,
        // 25250,
        // 7500,
      ];
      let rateData = [];
      for (let i = 0; i < 33; i++) {
        let rate = hanData[i] / allData[i];
        rateData[i] = rate.toFixed(2);
      }

      let option = {
        title: {
          text: "",
          x: "center",
          y: 0,
          textStyle: {
            color: "#B4B4B4",
            fontSize: 16,
            fontWeight: "normal",
          },
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,0.1)",
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
              backgroundColor: "#7B7DDC",
            },
          },
        },
        legend: {
          data: ["已分配", "代表提出", "完成率"],
          textStyle: {
            color: "#B4B4B4",
          },
          bottom: "10",
        },
        grid: {
          x: "8%",
          width: "88%",
          y: "4%",
        },
        xAxis: {
          data: category,
          axisLine: {
            lineStyle: {
              color: "#B4B4B4",
            },
          },
          axisTick: {
            show: true,
          },
        },
        yAxis: [
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#B4B4B4",
              },
            },

            axisLabel: {
              formatter: "{value} ",
            },
          },
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#B4B4B4",
              },
            },
            axisLabel: {
              formatter: "{value} ",
            },
          },
        ],
        series: [
          {
            name: "办理率",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 8,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: "#F02FC2",
              },
            },
            data: rateData,
          },

          {
            name: "已分配",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#956FD4" },
                  { offset: 1, color: "#3EACE5" },
                ]),
              },
            },
            data: hanData,
          },

          {
            name: "代表提出",
            type: "bar",
            barGap: "-100%",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(156,107,211,0.8)" },
                  { offset: 0.2, color: "rgba(156,107,211,0.5)" },
                  { offset: 1, color: "rgba(156,107,211,0.2)" },
                ]),
              },
            },
            z: -12,

            data: allData,
          },
        ],
      };
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