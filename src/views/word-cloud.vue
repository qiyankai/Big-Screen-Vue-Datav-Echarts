<template>
  <div id="wc" class="wc" ref="chart"></div>
</template>

<script>
import echarts from "echarts";
import "echarts-wordcloud";
import image from "../assets/bear.png";
export default {
  data() {
    return {
      words: [],
      mycharts: null
    };
  },
  computed: {
    option: function() {
      return {
        // 设置标题，居中显示
        // title: {
        //   text: "本届热点词",
        //   left: 20,
        //   top: 20,
        //   textStyle: {
        //     fontWeight: "normal",
        //     color: "cyan"
        //   }
        // },
        // 数据可以点击
        tooltip: {},

        series: [
          {
            // maskImage: maskResource,
            // 词的类型
            type: "wordCloud",
            // 设置字符大小范围
            sizeRange: [6, 40],
            rotationRange: [-45, 90],
            textStyle: {
              normal: {
                // 生成随机的字体颜色
                color: function() {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 255),
                      Math.round(Math.random() * 255),
                      Math.round(Math.random() * 255)
                    ].join(",") +
                    ")"
                  );
                }
              }
            },
            //不要忘记调用数据
            data: this.words
          }
        ]
      };
    }
  },
  components: {},
  mounted() {
    let maskResource = new Image();
    maskResource.src = image;
    const option = this.option;
    maskResource.onload = () => {
      const mycharts = echarts.init(document.getElementById("wc"));
      this.mycharts = mycharts;
      mycharts.setOption(option);
      mycharts.resize();
    };
    // this.fetchSubjectSum();
    setInterval(() => {
      this.fetchSubjectSum();
    }, 3000);
  },
  methods: {
    async fetchSubjectSum() {
      const { data } = await this.$http.get("getDataByName?name=SUBJECT_SUM");

      let status = data.status;
      let dataList = JSON.parse(data.data);

      if (status === 200) {
        let resultList = new Array();
        for (let index = 0; index < dataList.length; index++) {
          const element = dataList[index];
          let item = {};
          item.name = Object.keys(element)[0];
          item.value = Object.values(element)[0];
          resultList.push(item);
        }
        this.words = resultList;
        this.mycharts.setOption(this.option);
        this.mycharts.resize();
        // this.words = resultList;
      }
    }
  }
};
</script>

<style lang="scss">
.wc {
  width: 100%;
  height: 100%;
}
</style>