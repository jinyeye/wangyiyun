<template>
  <div class="Rank">
    <div class="Ranking">
      <div class="g-sd3 fl">
        <div class="n-minelst">
          <h2 class="f-ff1">云音乐特色榜</h2>
          <ul class="f-cb clearfix">
            <li class="mine fl" v-for="(item,index) in listte" :key="index" @click="getsome(index)">
              <div class="lef">
                <a href="javascript:void(0)" class="avater">
                  <img :src="item.coverImgUrl" alt />
                </a>
              </div>
              <div class="rig">
                <p class="name">
                  <a href="javascript:void(0)">{{item.name}}</a>
                </p>
                <p class="s-fc4">{{item.updateFrequency}}</p>
              </div>
            </li>
          </ul>
          <h2 class="scd f-ff1">全球媒体榜</h2>
          <ul class="f-cb clearfix">
            <li
              class="mine fl"
              v-for="(item,index) in listall"
              :key="index"
              @click="getthing(index)"
            >
              <div class="lef">
                <a href="javascript:void(0)" class="avater">
                  <img :src="item.coverImgUrl" alt />
                </a>
              </div>
              <div class="rig">
                <p class="name">
                  <a href="javascript:void(0)">{{item.name}}</a>
                </p>
                <p class="s-fc4">{{item.updateFrequency}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="g-mn3 fl">
        <div class="l-info fl">
          <div class="l-img fl">
            <img class="auto-img" :src="playLIst.coverImgUrl" alt />
            <span class="spap auto-img"></span>
          </div>
          <div class="l-cntc fr">
            <div class="hb">
              <div class="tits fl">
                <h2 class="brk">{{playlist.name}}</h2>
              </div>
            </div>
            <div class="user">
              <span class="time">{{playlist.description}}</span>
            </div>
            <div class="btns clearfix">
              <a href="javascript:void(0)" class="play fl" title="播放">
                <i>
                  <em></em>
                  播放
                </i>
              </a>
              <a href class="btni-add fl" title="添加到播放列表"></a>
              <a href class="btni-fav">
                <i>({{playlist.subscribedCount}})</i>
              </a>
              <a href class="btni-share">
                <i>({{playlist.shareCount}})</i>
              </a>
              <a href class="btni-dl">
                <i>下载</i>
              </a>
              <a href class="btni-cmmt">
                <i>({{playlist.commentCount}})</i>
              </a>
            </div>
          </div>
        </div>
        <div class="songtb fl">
          <div class="title">
            <h3>
              <span>歌曲列表</span>
            </h3>
            <span class="sub">
              <span class="playlist-track-count">100</span>
              首歌
            </span>

            <div class="more">
              播放：
              <strong class="play-count">{{playlist.playCount}}</strong>
              次
            </div>
          </div>
          <div class="song-list">
            <table class="m-table" border="0" cellspacing="0" cellpadding="0">
              <thead>
                <tr>
                  <th class="w1">
                    <div class="wp">&nbsp;</div>
                  </th>
                  <th class="w2">
                    <div class="wp">歌曲标题</div>
                  </th>
                  <th class="w3">
                    <div class="wp">时长</div>
                  </th>
                  <th class="w4">
                    <div class="wp">歌手</div>
                  </th>
                  <th class="w5">
                    <div class="wp">专辑</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in tableData" :key="index"  >
                  <td>
                    <div class="hd">
                      <span class="num fl">{{item.pst}}</span>
                      <span
                        class="ply fr"
                        ref="plys"
                        :class="{plys : item.t}"
                        @click="bofang(item,index,item.id)"
                      ></span>
                    </div>
                  </td>
                  <td>
                    <a href class="tda" :title="item.name">{{item.name}}</a>
                  </td>
                  <td>{{new Date(item.dt).toTimeString().substr(3,5)}}</td>
                  <td>
                    <a href class="tda" :title="item.ar[0].name">{{item.ar[0].name}}</a>
                  </td>
                  <td>
                    <a href class="tda" :title="item.al.name">{{item.al.name}}</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="playlist">
            <div class="text">查看更多内容，请下载客户端</div>
            <a href="javascript:void(0)" class="buton">立即下载</a>
          </div>
        </div>
      </div>
    </div>
    <!-- <audio class="aidos" ref="audios" :src="songurl" autoplay></audio> -->
    <foot></foot>
  </div>
</template>

<script>
import foot from "../../components/foot";
import "../../assets/less/Ranking.less";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("print");
export default {
  data() {
    return {
      list: [],
      listte: [],
      listall: [],
      playlist: [],
      tableData: [],
      songurl: "",
      idx: 3,
      idg: [3, 0, 2, 1],
      idxs: [23,24,25,26,27,22,28,4,29,30,5,6,21,7,8,10,9,20,31,32,19,11,12,22,13,14,15,16,17,18,21,32,33,],
    };
  },
  computed: {
    playLIst() {
      return this.playlist;
    },
  },
  components: {
    foot,
    // aduios
  },
  created() {
    this.getlist();
    this.getdetail();
  },

  methods: {
    ...mapMutations(['musiccl']),
    getlist() {
      this.axios({
        method: "GET",
        url: "/toplist",
      }).then((res) => {
        this.list = res.data.list;
        this.listte = res.data.list.slice(0, 4);
        this.listall = res.data.list.slice(4);
      });
    },
    getsome(index) {
      for (var d = 0; d < this.idg.length; d++) {
        if (index == d) {
          this.idx = this.idg[d];
        }
      }
      this.axios({
        method: "GET",
        url: "/top/list",
        params: {
          idx: this.idx,
        },
      }).then((res) => {
        if (res.data.code == 200) {
          this.playlist = res.data.playlist;
          this.tableData = res.data.playlist.tracks;
          for (var i = 0; i < this.tableData.length; i++) {
            this.tableData[i].pst = i + 1;
          }
        }
      });
    },
    getdetail(index) {
      this.axios({
        method: "GET",
        url: "/top/list",
        params: {
          idx: this.idx,
        },
      }).then((res) => {
        this.playlist = res.data.playlist;
        this.tableData = res.data.playlist.tracks;
        
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].pst = i + 1;
        }
      });
    },

    getthing(index) {
        for (var d = 0; d < this.idxs.length; d++) {
          if (index == d) {
            this.idx = this.idxs[d];
          }
        }
      this.axios({
        method: "GET",
        url: "/top/list",
        params: {
          idx: this.idx,
        },
      }).then((res) => {
        this.playlist = res.data.playlist;
        this.tableData = res.data.playlist.tracks;
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].pst = i + 1;
        }
        
      });
    },
    bofang(item,index,id) {
      this.axios({
        method: "GET",
        url: "/song/url",
        params: {
          id: id,
        },
      }).then((res) => {
        if (res.status == 200) {
          this.songurl = res.data.data[0].url;
          this.$store.commit("print/setPrint", { 
            url: this.songurl,
            table: item
          });

          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[index].t = 1;
            this.tableData[i].t = 0;
          }
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>