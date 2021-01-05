<template>
  <div id="center">
    <div class="up">
      <div
        class="bg-color-black item"
        v-for="item in titleItem"
        :key="item.title"
      >
        <p class="colorBlue fw-b" style="text-align: center">
          {{ item.title }}
        </p>
        <div>
          <dv-digital-flop
            :config="item.number"
            style="width: 2.5rem; height: 0.375rem; text-align: center"
          />
          <!-- padding:0rem 0.9rem 0rem 0.9rem; -->
        </div>
      </div>
    </div>
    <div class="down">
      <div class="ranking bg-color-black">
        <span style="color: #5cd9e8">
          <icon name="align-left"></icon>
        </span>
        <span class="fs-xl text mx-2 mb-1">主办单位确认件数</span>
        <!-- <dv-scroll-ranking-board :config="ranking" ref="unit"  style="height:2.75rem" /> -->
        <dv-scroll-board :config="config" ref="unit" style="height: 3.05rem" />
      </div>
      <div class="percent">
        <div class="item bg-color-black">
          <span>{{ rate[0].id }}</span>
          <centerChart
            :id="rate[0].id"
            :tips="rate[0].tips"
            :colorObj="rate[0].colorData"
            ref="centerChart1"
          />
        </div>
        <div class="item bg-color-black">
          <span>{{ rate[1].id }}</span>
          <centerChart
            :id="rate[1].id"
            :tips="rate[1].tips"
            :colorObj="rate[1].colorData"
            ref="centerChart2"
          />
        </div>
        <!-- <div class="water">
          <dv-water-level-pond :config="water" style="height: 1.5rem" />
        </div> -->

        <bottomLeftChartState
          style=""
          ref="bottomLeftChartState"
        />
      </div>
    </div>
  </div>
</template>
 
<script>
import centerChart from "@/components/echart/center/centerChartRate";
import bottomLeftChartState from "@/components/echart/bottom/bottomLeftChartState";

export default {
  data() {
    return {
      titleItem: [
        {
          title: "今年累计任务建次数",
          number: {
            number: [120],
            toFixed: 1,
            content: "{nt}",
            style: {
              fontSize: 15,
              fill: "#3de7c9",
            },
          },
        },
        {
          title: "本月累计任务次数",
          number: {
            number: [18],
            toFixed: 1,
            content: "{nt}",
            style: {
              fontSize: 15,
              fill: "#3de7c9",
            },
          },
        },
        {
          title: "今日累计任务次数",
          number: {
            number: [2],
            toFixed: 1,
            content: "{nt}",
            style: {
              fontSize: 15,
              fill: "#3de7c9",
            },
          },
        },
        {
          title: "今年失败任务次数",
          number: {
            number: [14],
            toFixed: 1,
            content: "{nt}",
            style: {
              fontSize: 15,
              fill: "#3de7c9",
            },
          },
        },
        {
          title: "今年成功任务次数",
          number: {
            number: [106],
            toFixed: 1,
            content: "{nt}",
            style: {
              fontSize: 15,
              fill: "#3de7c9",
            },
          },
        },
        {
          title: "今年达标任务个数",
          number: {
            number: [100],
            toFixed: 1,
            content: "{nt}",

            style: {
              fontSize: 15,
              fill: "#3de7c9",
            },
          },
        },
      ],
      ranking: {
        data: [
          {
            name: "新乡",
            value: 80,
          },
        ],
        waitTime: 4000,
        carousel: "single",
        unit: "件",
      },
      config: {
        header: ["主办单位", "数量"],
        data: [
          ['<span style="color:#9fe6b8;">海淀区政府</span>', "23"],
          ['<span style="color:#9fe6b8;">市发展改革委</span>', "26"],
          ['<span style="color:#9fe6b8;">市民政局</span>', "35"],
          ['<span style="color:#9fe6b8;">市城市管理委</span>', "39"],
          ['<span style="color:#9fe6b8;">市规划自然资源委</span>', "39"],
          ['<span style="color:#9fe6b8;">市住房城乡建设委</span>', "45"],
          ['<span style="color:#9fe6b8;">市公安局</span>', "53"],
          ['<span style="color:#9fe6b8;">市教委</span>', "55"],
          ['<span style="color:#9fe6b8;">市卫生健康委</span>', "60"],
          ['<span style="color:#9fe6b8;">市交通委</span>', "153"],
        ],
        rowNum: 5, //表格行数
        headerHeight: 35,
        headerBGC: "#0f1325", //表头
        oddRowBGC: "#0f1325", //奇数行
        evenRowBGC: "#171c33", //偶数行
        index: true,
        columnWidth: [30,150,50],
        align: ["center"],
        waitTime: 3000,
        carousel: "page",
      },
      water: {
        data: [5, 45],
        shape: "roundRect",
        formatter: "{value}%",
        waveNum: 3,
      },
      // 通过率和达标率的组件复用数据
      rate: [
        {
          id: "代表自提",
          tips: 22,
          colorData: {
            textStyle: "#3fc0fb",
            series: {
              color: ["#00bcd44a", "transparent"],
              dataColor: {
                normal: "#03a9f4",
                shadowColor: "#97e2f5",
              },
            },
          },
        },
        {
          id: "代表团代提",
          tips: 78,
          colorData: {
            textStyle: "#67e0e3",
            series: {
              color: ["#faf3a378", "transparent"],
              dataColor: {
                normal: "#ff9800",
                shadowColor: "#fcebad",
              },
            },
          },
        },
      ],
    };
  },

  mounted() {
    this.fetchProposalSubmit(); //获取-数字板数据
    this.fetchProposalReplace(); //获取-代提百分比
    this.fetchUnitSum(); //获取-承办单位-排行榜
    this.setTimer();
  },
  methods: {
    setTimer() {
      this.timer = setInterval(() => {
        this.fetchProposalSubmit(); //获取-数字板数据
        this.fetchProposalReplace(); //获取-代提百分比
        this.fetchUnitSum(); //获取-承办单位-排行榜
        this.fetchState(); //获取-状态
      }, 3000);
    },
    async fetchState() {
      const { data } = await this.$http.get("getDataByName?name=STATE_SUM");

      let status = data.status;
      let dataList = JSON.parse(data.data);

      if (status === 200) {
        this.$refs.bottomLeftChartState.refresh(dataList);
      }
    },
    async fetchProposalSubmit() {
      const { data } = await this.$http.get("getDataByName?name=PROPOSAL_SUM");

      let status = data.status;
      let titleData = JSON.parse(data.data);

      var titleRes = new Array();
      if (status === 200) {
        for (var i = titleData.length - 1; i >= 0; i--) {
          var item = {
            title: "",
            number: {
              number: [],
              toFixed: 0,
              content: "{nt}",
              style: {
                fontSize: 15,
                fill: "#3de7c9",
              },
            },
          };
          item.title = titleData[i].X0;

          item.number.number.push(titleData[i].COUNT);
          titleRes.push(item);
        }
        this.titleItem = titleRes;
      }
    },
    async fetchProposalReplace() {
      const { data } = await this.$http.get("getDataByName?name=SUBMIT_SUM");

      let status = data.status;
      let dataList = JSON.parse(data.data);
      if (status === 200) {
        this.rate[0].id = dataList[0].X0;
        this.rate[1].id = dataList[1].X0;
        let submitSumMe = dataList[0].COUNT + 0;
        let submitSumNotMe = dataList[1].COUNT + 0;
        let count = submitSumMe + submitSumNotMe;
        submitSumMe = parseFloat((submitSumMe / count) * 100).toFixed(2);
        submitSumNotMe = parseFloat((submitSumNotMe / count) * 100).toFixed(2);

        this.$refs.centerChart1.refresh(submitSumMe);
        this.$refs.centerChart2.refresh(submitSumNotMe);
      }
    },
    async fetchUnitSum() {
      const { data } = await this.$http.get(
        "getDataByName?name=UNIT_HANDLE_SUM"
      );

      let status = data.status;
      let dataList = JSON.parse(data.data);

      let resultList = new Array();

      if (status === 200) {
        for (var i = dataList.length - 1; i >= 0; i--) {
          var item = ["组件1", "dev-1"];
          let colorCode = "";
          if (i % 2 == 0) {
            colorCode = '<span style="color:#9fe6b8;">';
          } else {
            colorCode = '<span style="color:#67e0e3;">';
          }
          item[0] = colorCode + dataList[i].X0 + "</span>";
          item[1] = colorCode + dataList[i].COUNT + "</span>";
          resultList.push(item);
        }
        this.config.data = resultList;
        this.$refs["unit"].updateRows(resultList);
      }
    },
  },
  components: {
    centerChart,
    // centerChart1,
    // centerChart2
    bottomLeftChartState,
  },
};
</script>

<style lang="scss" scoped>
#center {
  display: flex;
  flex-direction: column;
  .up {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      border-radius: 0.0625rem;
      padding-top: 0.13rem;
      margin-top: 0.1rem;
      width: 32%;
      height: 0.675rem;
      font-size: 0.01rem;
    }
  }
  .down {
    padding: 0.07rem 0.05rem;
    padding-bottom: 0;
    width: 100%;
    display: flex;
    height: 3.5875rem;
    justify-content: space-between;
    .bg-color-black {
      border-radius: 0.0625rem;
    }
    .ranking {
      padding: 0.125rem;
      width: 46%;
    }
    .percent {
      width: 54%;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 50%;
        height: 1.5rem;
        span {
          margin-top: 0.0875rem;
          display: flex;
          justify-content: center;
        }
      }
      .water {
        width: 100%;
      }
    }
  }
}
</style>