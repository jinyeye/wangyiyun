<template>
  <div class="ddd">
    <div class="songSheet">
      <div class="g-wrap">
        <div class="g-top clearfix">
          <h3 class="fl">
            <span class="nev fl">全部</span>
            <a href="javascript:void(0)" @click="Vshow">
              <i>
                选择分类
                <em></em>
              </i>
            </a>
          </h3>
          <a href="javascript:void(0)" class="fr hots">热门</a>
          <div class="classfix" v-show="active">
            <div class="catlist">
              <div class="c-go">
                <div class="fo">
                  <h3 class="ht">
                    <a class="ad" href>{{getrpx.name}}</a>
                  </h3>
                  <dl v-for="(item,index) in classeven" :key="index">
                    <dt>{{dts[index].name}}</dt>
                    <dd>
                      <div class="cao" v-for="(fc,li) in item" :key="li">
                        <a href="javascript:void(0)" @click="gottag(fc.name)">
                          {{fc.name}}<span>|</span>
                        </a>
                      </div>
                    </dd>
                  </dl>
                  <div class="h30">
                      <div class="kill"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul>
          <li v-for="(item,index) in playlist" :key="index" @click="godetail(item.id)">
            <div class="li-img">
              <img :src="item.coverImgUrl" :title="item.name"/>
              <a href :title="item.creator.nickname"></a>
              <div class="ting">
                <span>{{item.playCount}}</span>
                <span class="logoer"></span>
                <a href class="icon-play"></a>
              </div>
            </div>
            <p class="a-sp1">
              <a href="javascript:void(0)">{{item.name}}</a>
            </p>
            <p class="a-sp2">
              <span>by</span>
              <a href="javascript:void(0)">{{item.creator.nickname}}</a>
            </p>
          </li>
        </ul>
        <div class="paga">
          <el-pagination class="pagin" background layout="prev, pager, next" :total="1000"></el-pagination>
        </div>
      </div>
    </div>
    <foot></foot>
  </div>
</template>

<script>
import foot from "../../components/foot";
export default {
  data() {
    return {
      active: false,
      playlist: [],
      getrpx: [],
      classlist: [],
      classone: [],
      classtwo: [],
      classthree: [],
      classfor: [],
      classfive: [],
      classeven: [],
      tag:'',
      dts:[
          {name:'语种'},
          {name:'风格'},
          {name:'场景'},
          {name:'情感'},
          {name:'主题'},
      ],
    };
  },
  components: {
    foot,
  },
  created() {
    this.getcatlist();
    this.getClass();
  },
  methods: {
    godetail(id){
        this.$router.push({name: 'SongDetail' , query: { id }})
    },
    Vshow() {
      this.active = !this.active;
    },
    gottag(tag){
      this.axios({
        method: "GET",
        url: "/top/playlist/highquality?limit=35",
        params:{
            cat: tag
        }
      }).then((res) => {
          this.active = false;
        if (res.status == 200) {
            this.playlist = ''
            this.playlist = res.data.playlists
            for (let i = 0; i < this.playlist.length; i++) {
            if (this.playlist[i].playCount > 100000) {
              this.playlist[i].playCount =
                parseInt(this.playlist[i].playCount / 10000) + "万";
            }
          }
        }
      });
    },
    getcatlist() {
      this.axios({
        method: "GET",
        url: "/top/playlist?limit=35",
      }).then((res) => {
          
        if (res.status == 200) {
          this.playlist = res.data.playlists;
          for (let i = 0; i < this.playlist.length; i++) {
            if (this.playlist[i].playCount > 100000) {
              this.playlist[i].playCount =
                parseInt(this.playlist[i].playCount / 10000) + "万";
            }
          }
        }
      });
    },
    getClass() {
      this.axios({
        method: "GET",
        url: "/playlist/catlist",
      }).then((res) => {
        if (res.status == 200) {
          this.getrpx = res.data.all;
          this.classlist = res.data.sub;
          for (let i = 0; i < this.classlist.length; i++) {
            if (this.classlist[i].category == 0) {
              this.classone.push(this.classlist[i]);
            }
          }
          for (let i = 0; i < this.classlist.length; i++) {
            if (this.classlist[i].category == 1) {
              this.classtwo.push(this.classlist[i]);
            }
          }
          for (let i = 0; i < this.classlist.length; i++) {
            if (this.classlist[i].category == 2) {
              this.classthree.push(this.classlist[i]);
            }
          }
          for (let i = 0; i < this.classlist.length; i++) {
            if (this.classlist[i].category == 3) {
              this.classfor.push(this.classlist[i]);
            }
          }
          for (let i = 0; i < this.classlist.length; i++) {
            if (this.classlist[i].category == 4) {
              this.classfive.push(this.classlist[i]);
            }
          }
          this.classeven.push(
            this.classone,
            this.classtwo,
            this.classthree,
            this.classfor,
            this.classfive
          );
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.ddd {
  width: 100%;
  height: 500px;
}
.songSheet {
  width: 980px;
  margin: 0 auto;
  .g-wrap {
    padding: 40px;
    .g-top {
      height: 40px;
      width: 100%;
      border-bottom: 2px solid red;
      position: relative;
      h3 {
        .nev {
          width: 48px;
          height: 31px;
          font-size: 24px;
          font-weight: normal;
        }
        a {
          display: inline-block;
          width: 91px;
          height: 31px;
          font-size: 12px;
          font-weight: normal;
          margin: 2px 0 0 12px;
          padding: 0 5px 0 0;
          white-space: nowrap;
          text-align: center;
          line-height: 31px;
          border-radius: 5px;
          border-left: 1px solid #c4c4c4;
          border-top: 1px solid #c4c4c4;
          border-right: 1px solid #c4c4c4;
          color: #333;
          background: url(../../assets/images/button2.png) no-repeat;
          background-position: right -60px;
          overflow: hidden;
          i {
            color: #0c73c2;
            em {
              display: inline-block;
              margin: 0px 0px 2px 5px;
              width: 8px;
              height: 5px;
              background: url(../../assets/images/move.png) no-repeat;
              background-position: -70px -543px;
            }
          }
        }
        a:hover {
          background: url(../../assets/images/button2.png) no-repeat;
          background-position: right -142px;
          cursor: pointer;
          text-decoration: none;
        }
      }
      .hots {
        display: inline-block;
        width: 46px;
        height: 29px;
        line-height: 29px;
        text-align: center;
        background-color: #a80909;
        border-radius: 5px;
      }
      .classfix {
        width: 720px;
        height: 437px;
        position: absolute;
        left: -40px;
        top: 42px;
        z-index: 10;
        .catlist {
          padding: 10px;

          .c-go {
            background-color: #fff;
            border: 1px solid #f5f5f5;
            border-radius: 3px;
            .ht {
              width: 100%;
              margin-top: 20px;
              height: 35px;
              border-bottom: 1px solid #d5d5d5;
              .ad {
                display: inline-block;
                margin: 0 0 0 35px;
                width: 75px;
                height: 26px;
                line-height: 26px;
                text-align: center;
                border-bottom: 1px solid #d5d5d5;
              }
              .ad:hover {
                text-decoration: underline;
              }
            }
            dl {
              dt{
                float: left;
                // display: inline;
                width: 70px;
                margin: 0 -100px 0 26px;
                padding-top: 20px;
                border-right: 1px solid #e6e6e6;
                font-weight: bold;
              }
              dd{
                margin-left: 96px;
                padding: 16px 15px 0 15px;
                border-left: 1px solid #e6e6e6;
                line-height: 24px;
                
                .cao {
                  display: inline-block;
                  width: auto;
                  height: 20px;
                    
                  a {
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    color: #333;
                    font-size: 10px;
                    span {
                    display: inline-block;  
                      margin: 0 10px 0 12px;
                      color: #d8d8d8;
                      font-size: 10px;
                    }
                  }
                  
                }
              }
              
            }
            .h30{
                width: 100%;
                height: 30px;
                .kill{
                    width: 96px;
                    height: 30px;
                    border-right: 1px solid #e6e6e6;
                }
            }
          }
        }
      }
    }
    ul {
      margin: 30px 0 0 -50px;
      li {
        float: left;
        width: 140px;
        height: 188px;
        overflow: hidden;
        padding: 0 0 30px 50px;
        line-height: 1.4;
        .li-img {
          width: 140px;
          height: 140px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          a {
            width: 100%;
            height: 100%;
          }
          .ting {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 27px;
            font-size: 12px;
            background-color: rgba(0, 0, 0, 0.5);
            span {
              width: 50px;
              height: 100%;
              line-height: 28px;
              color: #ccc;
              font-size: 12px;
              margin-left: 25px;
            }
            .logoer {
              height: 11px;
              width: 14px;
              // float: left;
              position: absolute;
              bottom: 8px;
              left: -18px;
              background: url(../../assets/images/iconall.png) no-repeat;
              background-position: 0 -24px;
            }
            .icon-play {
              height: 17px;
              width: 16px;
              position: absolute;
              bottom: 5px;
              left: 117px;
              background: url(../../assets/images/iconall.png) no-repeat;
              background-position: 0 0px;
            }
            .icon-play:hover {
              background: url(../../assets/images/iconall.png) no-repeat;
              background-position: 0 -60px;
            }
          }
        }
        .a-sp1 {
          margin: 8px 0 3px;
          font-size: 14px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          a {
            color: #000;
          }
        }
        .a-sp2 {
          width: 100%;
          span {
            color: #b5b5b5;
          }
          a {
            display: inline-block;
            margin-left: 2px;
            color: #666666;
          }
        }
      }
    }
    .paga {
      float: left;
      width: 100%;
      .pagin {
        margin: 0 auto;
        padding: 20px 0px 50px 260px;
      }
    }
  }
}
</style>