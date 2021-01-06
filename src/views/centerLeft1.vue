<template>
  <div id="centreLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color: #5cd9e8">
          <icon name="chart-bar"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">提出情况</span>
          <dv-decoration-3
            style="
              width: 1.25rem;
              height: 0.25rem;
              position: relative;
              top: -0.0375rem;
            "
          />
        </div>
      </div>
      <div class="d-flex jc-center">
        <!-- <centreLeft1Chart ref="centreLeft1Chart" /> -->
        <dv-active-ring-chart ref="ring" :config="config" style="height: 2.75rem; width: 2.75rem" />
      </div>
      <!-- 4个主要的数据 -->
      <div class="bottom-data">
        <div class="item-box" v-for="(item, index) in numberData" :key="index">
          <div class="d-flex">
            <!-- <span class="coin">￥</span> -->
            <dv-digital-flop :config="item.number" style="width: 2.5rem; height: 0.625rem" />
          </div>
          <p class="text" style="text-align: center">
            {{ item.text }}
            <span class="colorYellow">(件)</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import centreLeft1Chart from "@/components/echart/centerLeft2/centreLeft1Chart";
export default {
  data() {
    return {
      config: {
        data: [
          {
            name: "全部",
            value: 1315
          }
        ],
        color: ["#00baff", "#3de7c9", "#fff", "#ffc530", "#469f4b"],
        lineWidth: 20,
        radius: "55%",
        activeRadius: "60%",
        digitalFlopStyle: {
          fontSize: 15
        },
        showOriginValue: true
      },
      numberData: [
        {
          number: {
            number: [15],
            toFixed: 0,
            content: "{nt}"
          },
          text: "建议已提交总数"
        },
        {
          number: {
            number: [1144],
            toFixed: 0,
            content: "{nt}"
          },
          text: "代表团未提交数"
        },
        {
          number: {
            number: [361],
            toFixed: 0,
            content: "{nt}"
          },
          text: "参与主提代表数"
        },
        {
          number: {
            number: [157],
            toFixed: 0,
            content: "{nt}"
          },
          text: "建议未确认数"
        }
      ]
    };
  },
  components: {
    // centreLeft1Chart,
  },
  mounted() {
    this.changeTiming();
  },
  methods: {
    changeTiming() {
      setInterval(() => {
        // this.fetchSystemSum(); // 获取-系统
        this.fetchProposalSubmit(); // 获取-建议情况
        this.fetchSubjectSum(); // 获取-主题词
        // this.changeNumber();
      }, 3000);
    },
    async fetchProposalSubmit() {
      const { data } = await this.$http.get(
        "getDataByName?name=PROPOSAL_LEFT_SUM"
      );

      let status = data.status;
      let titleData = JSON.parse(data.data);

      var titleRes = new Array();
      if (status === 200) {
        for (var i = titleData.length - 1; i >= 0; i--) {
          var item = {
            number: {
              number: [157],
              toFixed: 0,
              content: "{nt}"
            },
            text: "建议未确认数"
          };
          item.text = titleData[i].X0;
          item.number.number = new Array();
          item.number.number.push(titleData[i].COUNT);
          titleRes.push(item);
        }
        this.numberData = titleRes;
      }
    },
    async fetchSystemSum() {
      const { data } = await this.$http.get("getDataByName?name=SYSTEM_SUM");

      let status = data.status;
      let dataList = JSON.parse(data.data);

      if (status === 200) {
        this.$refs.centreLeft1Chart.refresh(dataList);
      }
    },
    async fetchSubjectSum() {
      const { data } = await this.$http.get("getDataByName?name=SUBJECT_SUM");

      let status = data.status;
      let dataList = JSON.parse(data.data);

      if (status === 200) {
        let resultList = new Array();
        for (let index = 0; index < dataList.length; index++) {
          const element = dataList[index];
          let item = {
            name: "收费站",
            value: 1315
          };
          item.name = element.X0;
          item.value = element.COUNT;
          resultList.push(item);
        }
        this.config.data = resultList;
        this.$refs.ring.mergeConfig();
      }
    },
    changeNumber() {
      this.numberData.forEach((item, index) => {
        item.number.number[0] += ++index;
        item.number = { ...item.number };
      });
    }
  }
};
</script>

<style lang="scss">
#centreLeft1 {
  padding: 0.2rem;
  height: 5.125rem;
  min-width: 3.75rem;
  border-radius: 0.0625rem;
  .bg-color-black {
    height: 4.8125rem;
    border-radius: 0.125rem;
  }
  .text {
    color: #c3cbde;
  }
  .chart-box {
    margin-top: 0.2rem;
    width: 2.125rem;
    height: 2.125rem;
    .active-ring-name {
      padding-top: 0.125rem;
    }
  }

  .bottom-data {
    .item-box {
      float: right;
      position: relative;
      width: 50%;
      color: #d3d6dd;
      // 金币
      .coin {
        position: absolute;
        left: 0.1rem;
        top: 0.2125rem;
        font-size: 0.25rem;
        color: #ffc107;
      }
      .colorYellow {
        color: yellowgreen;
      }
    }
  }
}
</style>