<template>
  <div class="col-3">
    <div class="top">
      <dv-border-box-13 :color="['#146199']">
        <!-- <center-right2></center-right2> -->
        <div class="ranking bg-color-black">
          <div class="pt">
            <span style="color: #5cd9e8">
              <icon name="align-left"></icon>
            </span>
            <span class="fs-xl text mx-2 mb-1">主办单位确认件数</span>
          </div>
          <!-- <dv-scroll-ranking-board :config="ranking" ref="unit"  style="height:2.75rem" /> -->
          <dv-scroll-board :config="config" ref="unit" style="height:4.5rem;margin-top:0.2rem;" />
        </div>
      </dv-border-box-13>
      <dv-border-box-13 :color="['#146199']">
        <center-right1></center-right1>
      </dv-border-box-13>
    </div>
    <div class="bottom">
      <dv-border-box-13 :color="['#146199']">
        <div class="bottom-label">
          <span style="color: #5cd9e8">
            <icon name="align-left"></icon>
          </span>
          <span class="fs-xl text mx-2 mb-1">本届热点词</span>
        </div>
        <word-cloud></word-cloud>
      </dv-border-box-13>
    </div>
  </div>
</template>

<script>
import centerRight1 from "@/views/centerRight1";
// import centerRight2 from "@/views/centerRight2";
import wordCloud from "./word-cloud";
export default {
  data() {
    return {
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
          ['<span style="color:#9fe6b8;">市交通委</span>', "153"]
        ],
        rowNum: 10, //表格行数
        headerHeight: 35,
        headerBGC: "#0f1325", //表头
        oddRowBGC: "#0f1325", //奇数行
        evenRowBGC: "#171c33", //偶数行
        index: true,
        columnWidth: [50, 150, 50],
        align: ["center"],
        waitTime: 3000,
        carousel: "page"
      }
    };
  },
  components: {
    centerRight1,
    // centerRight2,
    wordCloud
  },
  mounted() {
    this.fetchUnitSum();
    setInterval(() => {
      this.fetchUnitSum(); //获取-承办单位-排行榜
    }, 30000);
  },
  methods: {
    async fetchUnitSum() {
      const { data } = await this.$http.get(
        "getDataByName?name=UNIT_HANDLE_SUM"
      );

      let status = data.status;
      let dataList = JSON.parse(data.data);

      let resultList = new Array();

      if (status === 200) {
        for (var i = dataList.length - 1; i >= 0; i--) {
          let item = new Array();
          let colorCode = "";
          if (i % 2 == 0) {
            colorCode = '<span style="color:#78cecd;">';
          } else {
            colorCode = '<span style="color:#33cea0;">';
          }
          item[0] = colorCode + dataList[i].X0 + "</span>";
          item[1] = colorCode + dataList[i].COUNT + "</span>";
          // item.push(dataList[i].X0);
          // item.push(
          //   "<span  class='colorGrass'>" + dataList[i].COUNT + "</span>"
          // );
          resultList.push(item);
        }
        this.config.data = resultList;
        this.config = { ...this.config };
        // this.$refs["unit"].updateRows(resultList);
      }
    }
  }
};
</script>

<style lang="scss">
.col-3 {
  width: 33%;
  .top {
    box-sizing: border-box;
    display: flex;
    height: 50%;
    .ranking {
      margin: 0.2rem;
    }
  }
  .bottom {
    height: 50%;
    .bottom-label {
      position: relative;
      top: 0.2rem;
      left: 0.2rem;
    }
  }
  .pt {
    padding-top: 0.1rem;
  }
}
</style>