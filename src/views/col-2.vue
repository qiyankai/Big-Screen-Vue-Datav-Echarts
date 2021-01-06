<template>
  <div class="col-2">
    <div class="top bg-color-black">
      <div class="top-content">
        <div class="main">
          <div style="flex-grow:1;">
            <div class="d-flex jc-center">
              <div class="main-total">
                <div class="main-total-content">
                  <span>{{ total }}</span>
                  <div style="padding-top:20px;">建 议 总 数</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="button">
          <div class="item" v-for="(item, index) in numberData" :key="index">
            <div class>{{ item.text }}</div>
            <div class="count text-orange">{{ item.number.number[0] }} 件</div>
          </div>
        </div>
        <dv-border-box-13 :color="['#146199']" style="height:2rem;">
          <div class="else">
            <dv-scroll-board :config="marquee1" ref="l1" style="height: 1.5rem;" />
            <dv-scroll-board :config="marquee2" ref="l2" style="height: 1.5rem;" />
            <!-- <div>
            <span>admin</span>
            <span class="text-green">登录成功</span>
          </div>
          <div>
            <span>admin</span>
            <span class="text-green">登录成功</span>
            </div>-->
          </div>
        </dv-border-box-13>
      </div>
    </div>
    <div class="bottom dv-border-box-6">
      <dv-border-box-13 :color="['#146199']">
        <bottom-left style="width:100%;height:100%;"></bottom-left>
      </dv-border-box-13>
    </div>
  </div>
</template>
<script>
import bottomLeft from "@/views/bottomLeft";
export default {
  data() {
    return {
      config: {
        header: ["主办单位数量"],
        data: [
          ['<span style="color:#9fe6b8;">海淀区政府（23）</span>'],
          ['<span style="color:#9fe6b8;">市发展改革委（26）</span>'],
          ['<span style="color:#9fe6b8;">市民政局（35）</span>'],
          ['<span style="color:#9fe6b8;">市城市管理委（39）</span>'],
          ['<span style="color:#9fe6b8;">市规划自然资源委（39）</span>'],
          ['<span style="color:#9fe6b8;">市住房城乡建设委（45）</span>'],
          ['<span style="color:#9fe6b8;">市公安局（53）</span>'],
          ['<span style="color:#9fe6b8;">市教委（55）</span>'],
          ['<span style="color:#9fe6b8;">市卫生健康委（60）</span>'],
          ['<span style="color:#9fe6b8;">市交通委（153）</span>']
        ],
        rowNum: 5, // 表格行数
        headerHeight: 35,
        headerBGC: "#0f1325", // 表头
        oddRowBGC: "#0f1325", // 奇数行
        evenRowBGC: "#171c33", // 偶数行
        index: false,
        columnWidth: [],
        align: ["center"],
        waitTime: 3000,
        carousel: "single"
      },
      numberData: [],
      total: 0,
      statistics: {
        data: [],
        colors: [
          "#37a2da",
          "#37a2da",
          "#37a2da",
          "#37a2da",
          "#37a2da",
          "#37a2da",
          "#37a2da",
          "#37a2da",
          "#37a2da",
          "#37a2da",
          "#37a2da",
          "#37a2da",
          "#37a2da",
          "#37a2da",
          "#37a2da",
          "#37a2da",
          "#37a2da",
          "#37a2da",
          "#37a2da",
          "#37a2da",
          "#37a2da"
        ],
        showValue: true,
        unit: "件"
      },
      marquee1: {
        data: [],
        rowNum: 3, // 表格行数
        index: false,
        oddRowBGC: "transparent", // "#0f1325", // 奇数行
        evenRowBGC: "transparent", // "#0f1325", // 偶数行
        columnWidth: [],
        align: ["center"],
        waitTime: 3000,
        carousel: "single"
      },
      marquee2: {
        data: [],
        rowNum: 3, // 表格行数
        index: false,
        oddRowBGC: "transparent", // "#0f1325", // 奇数行
        evenRowBGC: "transparent", // "#0f1325", // 偶数行
        columnWidth: [],
        align: ["center"],
        waitTime: 3000,
        carousel: "single"
      }
    };
  },
  methods: {
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
          if (i == 1) {
            this.total = titleData[i].COUNT;
          } else {
            item.text = titleData[i].X0;
            item.number.number = new Array();
            item.number.number.push(titleData[i].COUNT);
            titleRes.push(item);
          }
        }
        this.numberData = titleRes;
      }
    },
    async fetchGroupSubmit() {
      const { data } = await this.$http.get("getDataByName?name=GROUP_SUM");

      let status = data.status;
      let dataList = JSON.parse(data.data);

      var resultList = new Array();
      if (status === 200) {
        var order = [
          "东城团",
          "西城团",
          "朝阳团",
          "海淀团",
          "丰台团",
          "石景山团",
          "门头沟团",
          "房山团",
          "通州团",
          "顺义团",
          "昌平团",
          "大兴团",
          "平谷团",
          "怀柔团",
          "密云团",
          "延庆团",
          "驻京部队代表团"
        ];
        for (var i = 0; i < order.length; i++) {
          var item = { name: "怀柔区", value: 38 };
          item.name = order[i];
          var index = dataList.findIndex(v => {
            return v.X0 == item.name;
          });
          item.value = index === -1 ? 0 : dataList[index].COUNT;
          resultList.push(item);
        }
        this.statistics.data = resultList;
        this.statistics = { ...this.statistics };
      }
    },
    async fetchSystemSum() {
      const { data } = await this.$http.get("getDataByName?name=SYSTEM_SUM");
      let dataList = JSON.parse(data.data);
      let status = data.status;
      let l1 = new Array();
      let l2 = new Array();

      if (status === 200) {
        for (let i = 0; i < dataList.length; i++) {
          let colorCode = '<span style="color:#67e0e3;">',
            item = [];
          item[0] = dataList[i].X0;
          item[1] = colorCode + dataList[i].COUNT + "</span>";
          if (i % 2 == 0) {
            l1.push(item);
          } else {
            l2.push(item);
          }
        }
        this.marquee1.data = l1;
        this.marquee1 = { ...this.marquee1 };
        this.marquee2.data = l2;
        this.marquee2 = { ...this.marquee2 };
      }
    }
  },
  mounted() {
    this.fetchProposalSubmit(); // 获取-建议情况
    this.fetchGroupSubmit(); // 获取-各团的提出情况
    this.fetchSystemSum();
    setInterval(() => {
      // this.fetchSystemSum(); // 获取-系统
      this.fetchProposalSubmit(); // 获取-建议情况
      this.fetchGroupSubmit(); // 获取-各团的提出情况
      this.fetchSystemSum();
      // this.fetchSubjectSum(); // 获取-主题词
      // this.changeNumber();
    }, 10000);
  },
  components: {
    bottomLeft
  }
};
</script>
<style lang="scss">
.text-orange {
  color: orange;
}
.text-cyan {
  color: cyan;
}
.text-purple {
  color: #c1a4f8;
}
.text-green {
  color: #32b395;
}
.col-2 {
  width: 34%;
  .top {
    height: 75%;
    .top-content {
      box-sizing: border-box;
      height: 100%;
      display: flex;
      flex-direction: column;
      .main {
        flex-grow: 1;
        .main-total {
          width: 300px;
          height: 300px;
          margin-top: 0.75rem;
          background: url("../assets/round.png") no-repeat 50% 50%;
          background-size: 100% 100%;
          text-align: center;
          font-size: 0.25rem;
          font-weight: bold;
          .main-total-content {
            margin-top: 30%;
            line-height: 0.4rem;
            font-size: 0.3rem;
            span {
              display: inline-block;
              padding: 0.25rem;
              font-size: 0.8rem;
              color: cyan;
            }
          }
        }
      }
      .button {
        display: flex;
        justify-content: space-around;
        height: 2rem;
        text-align: center;
        font-size: 0.2rem;
        .item {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          width: 30%;
          height: 1.5rem;
        }
        .item:nth-child(1) {
          background: url("../assets/left-border.png") no-repeat 50% 50%;
          background-size: 100% 100%;
          .count {
            @extend .text-cyan;
          }
        }
        .item:nth-child(2) {
          background: url("../assets/center-border.png") no-repeat 50% 50%;
          background-size: 100% 100%;
          position: relative;
          top: 0.5rem;
        }
        .item:nth-child(3) {
          background: url("../assets/right-border.png") no-repeat 50% 50%;
          background-size: 100% 100%;
          .count {
            @extend .text-purple;
          }
        }
        .count {
          padding: 10px 0 24px;
          text-align: center;
          font-size: 0.25rem;
        }
      }
      .else {
        margin: 0.2rem 0.5rem;
        height: 1.25rem;
        line-height: 0.675rem;
        display: flex;
        // div {
        //   flex-grow: 1;
        //   display: flex;
        //   justify-content: space-around;
        //   font-size: 0.2rem;
        //   border-top: 1px solid cyan;
        //   border-bottom: 1px solid cyan;
        // }
      }
    }
  }
  .bottom {
    height: 25%;
  }
}
</style>