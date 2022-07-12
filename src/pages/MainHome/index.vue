<template>
  <div class="main">
    <div v-if="!loading">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="hover" class="box-card">
            <div class="admin">
              <el-image
                class="img"
                :src="url"
                :preview-src-list="srcList"
                v-if="LoginSatus != '管理员'"
              >
              </el-image>
              <el-image
                v-else
                class="img"
                :src="LoginInfo.imgUrl"
                :preview-src-list="srcList"
              ></el-image>
              <div class="adminName">
                <b v-if="LoginSatus == '游客'"></b>
                <b v-else>{{ LoginInfo.nickName }}</b>
                <p>{{ LoginSatus }}</p>
              </div>
            </div>
            <el-divider></el-divider>
            <div class="time">
              <p>
                <span>上次登录时间：</span>
                <span>{{ time }}</span>
              </p>
              <p>
                <span id="allmap" style="width: 100px; height: 100px"
                  >上次登录地：{{ LocationCity }}</span
                >
              </p>
            </div>
          </el-card>
          <el-card shadow="hover" style="height: 252px; margin-top: 20px">
            <template #header>
              <div class="clearfix">
                <span>语言详情</span>
              </div>
            </template>
            Vue<el-progress :percentage="70.1" color="#42b983"></el-progress>
            JavaScript<el-progress
              :percentage="27.8"
              color="#f1e05a"
            ></el-progress
            >CSS <el-progress :percentage="1.1"></el-progress> Other<el-progress
              :percentage="1.0"
              color="#f56c6c"
            ></el-progress>
          </el-card>
        </el-col>
        <el-col :span="16">
          <!-- <el-card shadow="hover"> -->
          <el-row :gutter="20" class="mgb20">
            <el-col :span="8">
              <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <div class="grid-content grid-con-1">
                  <i class="el-icon-user-solid grid-con-icon"></i>
                  <div class="grid-cont-right">
                    <div class="grid-num">{{ UserNum }}</div>
                    <div>用户数量</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <div class="grid-content grid-con-2">
                  <i class="el-icon-s-order grid-con-icon"></i>
                  <div class="grid-cont-right">
                    <div class="grid-num">{{ OrderNum }}</div>
                    <div>交易订单数量</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <div class="grid-content grid-con-3">
                  <i class="el-icon-s-goods grid-con-icon"></i>
                  <div class="grid-cont-right">
                    <div class="grid-num">{{ GoodsNum }}</div>
                    <div>商品数量</div>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="24">
              <el-card
                shadow="hover"
                :body-style="{ padding: '0px' }"
                style="margin-top: 40px"
              >
                <el-calendar>
                  <template slot="dateCell" slot-scope="{ data }">
                    <p :class="data.isSelected ? 'is-selected' : ''">
                      {{ data.day.split("-").slice(1).join("-") }}
                      {{ data.isSelected ? "✔️" : "" }}
                    </p>
                  </template>
                </el-calendar>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <el-skeleton :rows="12" animated v-else style="padding: 20px" />
  </div>
</template>

<script>
import moment from "moment";
import getCurrentCityName from "@/assets/js/map.js";
import img from "@/assets/img/333.jpg";
import { selectUser, selectGoodsList, selectOrder } from "@/api/index.js";
export default {
  name: "MainHome",
  data() {
    return {
      url: img,
      srcList: [img], // 大图效果
      time: "",
      LocationCity: "正在定位...", // 登录地点
      UserNum: "", // 用户数量
      OrderNum: "", // 订单数量
      GoodsNum: "", // 商品数量
      loading: false,
      LoginInfo: "", // 登录信息
      LoginSatus: "", // 登录状态
    };
  },
  created() {
    this.LoginInfo = JSON.parse(localStorage.getItem("loginUserInfo"));
    if (this.LoginInfo == "admin") {
      this.LoginSatus = "游客";
    } else if (this.LoginInfo.id != 1) {
      this.LoginSatus = "管理员";
    } else if (this.LoginInfo.id == 1) {
      this.LoginSatus = "超级管理员";
    }
  },
  mounted() {
    this.getCurrentCity();
    (this.loading = true), (this.time = moment().format("YYYY-MM-DD HH:mm"));
    selectUser().then((res) => {
      this.UserNum = res.data.pop().id;
    });
    selectGoodsList().then((res) => {
      this.GoodsNum = res.data.pop().id;
    });
    selectOrder().then((res) => {
      this.OrderNum = res.data.pop().id;
      this.loading = false;
    });
  },
  methods: {
    //通过百度地图获取当前城市
    getCurrentCity() {
      getCurrentCityName().then((city) => {
        this.LocationCity = city;
      });
    },
    DataSelect() {
      console.log(111);
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  .admin {
    display: flex;
    justify-content: space-between;
    .img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
    .adminName {
      margin: auto;
      b {
        font-size: 24px;
      }
      p {
        font-size: 14px;
        color: #666;
        text-align: center;
      }
    }
  }
  .time {
    color: #666;
  }
  .grid-content {
    display: flex;
    align-items: center;
    height: 100px;
    .grid-con-icon {
      font-size: 50px;
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      color: #fff;
    }
    .grid-cont-right {
      flex: 1;
      text-align: center;
      font-size: 14px;
      color: #999;
      .grid-num {
        font-size: 30px;
        font-weight: bold;
      }
    }
  }
}
.el-row {
  margin-bottom: 20px;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}
.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}
.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}
.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}
.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}
.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}
.is-selected {
  color: #1989fa;
}
</style>
