<template>
  <div id="centreRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color: #5cd9e8">
          <icon name="chart-line"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">系统统计</span>
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <dv-scroll-board
          :config="config"
          ref="log"
          style="width: 3.375rem; height: 4.28rem"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        header: ["用户名", 
        // "时间", 
        "操作"],
        data: [
          ["程晓君", "<span  class='colorGrass'>登录成功</span>"],
          ["杨清英", "<span  class='colorRed'>登录成功</span>"],
          ["程晓君", "<span  class='colorGrass'>登录成功</span>"],
          ["魏敏", "<span  class='colorGrass'>登录成功</span>"],
          ["王全礼", "<span  class='colorGrass'>登录成功</span>"],
          ["王全礼", "<span  class='colorGrass'>登录成功</span>"],
          ["王全礼", "<span  class='colorGrass'>登录成功</span>"],
          ["王全礼", "<span  class='colorRed'>登录成功</span>"],
          ["王全礼", "<span  class='colorRed'>登录成功</span>"],
          ["东城区", "<span  class='colorGrass'>登录成功</span>"],
          ["魏敏", "<span  class='colorGrass'>登录成功</span>"],
          ["王全礼", "<span  class='colorGrass'>登录成功</span>"],
          ["建议综合组组长", "<span  class='colorGrass'>办理</span>"],
          ["建议综合组组长", "<span  class='colorGrass'>办理</span>"],
        ],
        rowNum: 8, //表格行数
        headerHeight: 35,
        headerBGC: "#0f1325", //表头
        oddRowBGC: "#0f1325", //奇数行
        evenRowBGC: "#171c33", //偶数行
        index: false,
        columnWidth: [150],
        align: ["left"],
      },
    };
  },
  components: {},
  mounted() {
    this.changeTiming();
  },
  methods: {
    changeTiming() {
      setInterval(() => {
        this.fetchProposalSubmit(); //获取-建议情况
      }, 3000);
    },
    async fetchProposalSubmit() {
      const { data } = await this.$http.get(
        "getDataByName?name=LOGIN_LOG"
      );

      let status = data.status;
      let dataList = JSON.parse(data.data);

      var dataArr = new Array();
      if (status === 200) {
        for (var i = dataList.length - 1; i >= 0; i--) {
          let item =new Array();
          item.push(dataList[i].NAME);
          // item.push(dataList[i].TIME);
          item.push("<span  class='colorGrass'>"+dataList[i].MESSAGE+"</span>");
          dataArr.push(item);
        }
        this.config.data = dataArr;
        this.$refs["log"].updateRows(dataArr);
      }
    },
  },
};
</script>

<style lang="scss">
#centreRight1 {
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
  .body-box {
    border-radius: 0.125rem;
    overflow: hidden;
  }
}
</style>