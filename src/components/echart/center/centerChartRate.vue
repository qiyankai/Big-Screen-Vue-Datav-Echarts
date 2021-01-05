<template>
  <div>
    <div :id="id" style="margin:0 0 0 .285rem;width:1.5rem;height:1.25rem;"></div>
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
  props: {
    id: {
      type: String,
      required: true,
      default: "chartRate",
    },
    tips: {
      type: Number,
      required: true,
      default: 50,
    },
    colorObj: {
      type: Object,
      default: function () {
        return {
          textStyle: "#3fc0fb",
          series: {
            color: ["#00bcd44a", "transparent"],
            dataColor: {
              normal: "#03a9f4",
              shadowColor: "#97e2f5",
            },
          },
        };
      },
    },
  },
  methods: {
    draw() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(document.getElementById(this.id));
      //  ----------------------------------------------------------------
      let tips = this.tips;
      let option = {
        title: [
          {
            text: tips * 1 + "%",
            x: "center",
            y: "center",
            textStyle: {
              color: this.colorObj.textStyle,
              fontSize: 16,
            },
          },
        ],
        series: [
          {
            type: "pie",
            radius: ["75%", "65%"],
            center: ["50%", "50%"],
            hoverAnimation: false,
            color: this.colorObj.series.color,
            label: {
              normal: {
                show: false,
              },
            },
            data: [
              {
                value: tips,
                itemStyle: {
                  normal: {
                    color: this.colorObj.series.dataColor.normal,
                    shadowBlur: 10,
                    shadowColor: this.colorObj.series.dataColor.shadowColor,
                  },
                },
              },
              {
                value: 100 - tips,
              },
            ],
          },
        ],
      };
      this.chart.setOption(option);
    },
    refresh(tips) {
      let option = this.chart.getOption();
      option.title[0].text = tips * 1 + "%";
      option.series[0].data[0].value = tips;
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