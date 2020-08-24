<template>
<div>
  <div class="ddd">
    <div class="aaa">
      <div class="ggg">
        <div class="block">
          <el-carousel trigger="click" height="284px">
            <el-carousel-item v-for="(item,index) in banner" :key="index">
              <img class="auto-img" :src="item.imageUrl" alt />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="leto">
        <a href="javascript:void(0)" class="load"></a>
        <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
      </div>

      <div class="ron">
        <div class="left">
          <div class="hot">
              <div class="hot-txt">
                  <div class="hot-hd fl">
                      <a href="javascript:void(0)" @click="gosong">热门推荐</a>
                  </div>
                  <div class="fl hot-tab">
                      <a href="javascript:void(0)">华语</a>
                      <span>|</span>
                      <a href="javascript:void(0)">流行</a>
                      <span>|</span>
                      <a href="javascript:void(0)">摇滚</a>
                      <span>|</span>
                      <a href="javascript:void(0)">民谣</a>
                      <span>|</span>
                      <a href="javascript:void(0)">电子</a>
                  </div>
              </div>
              <ul>
                  <li v-for="(item,index) in getPersonaLized" :key="index" @click="godetail(item.id)">
                      <div class="u-cover">
                          <img :src="item.picUrl" :title="item.name">
                          <a href="javascript:void(0)"></a>
                          <p>
                              <a href="javascript:void(0)">{{item.name}}</a>
                          </p>
                          <div class="ting">
                            <span>{{item.playCount}}</span>
                            <span class="logoer"></span>
                            <a href="" class="icon-play"></a>
                        </div>
                      </div>
                  </li>
              </ul>
              <div class="konghang"></div>
              <div class="flash">
                <div class="f-top">
                  <a href="javascript:void(0)">新碟上架</a>
                </div>
                <div>
                  <lun></lun>
                </div>
              </div>
              <div class="konghang"></div>
              <div class="list">
                <div class="f-top">
                  <a href="javascript:void(0)">榜单</a>
                </div>
                <div class="bist">
                    <dl class="blk fl">
                      <dt class="blk-top">
                        <div class="cver">
                          <a href="javascript:void(0)"></a>
                          <img class="auto-img" src="../../assets/images/baios.jpg" alt="">
                          
                        </div>
                        <div class="fl tit">
                          <a href="javascript:void(0)"><h3>云音乐飙升榜</h3></a>
                          <div class="ge"></div>
                          <a href="javascript:void(0)" class="fl s-bgb"></a>
                          <a href="javascript:void(0)" class="fl s-bgn"></a>
                        </div>
                      </dt>
                      <dd>
                        <ol>
                          <li v-for="(no,to) in biaos" :key="to">
                            <span class="no-top no">{{no.t}}</span>
                            <a href="javascript:void(0)">{{no.name}}</a>
                          </li>
                        </ol>
                        <div class="more">
                          <a href="javascript:void(0)">查看全部></a>
                        </div>
                      </dd>
                    </dl>
                    <dl class="blk fl">
                      <dt class="blk-top">
                        <div class="cver">
                          <a href="javascript:void(0)"></a>
                          <img class="auto-img" src="http://p3.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=100y100" alt="">
                          
                        </div>
                        <div class="fl tit">
                          <a href="javascript:void(0)"><h3>云音乐新歌榜</h3></a>
                          <div class="ge"></div>
                          <a href="javascript:void(0)" class="fl s-bgb"></a>
                          <a href="javascript:void(0)" class="fl s-bgn"></a>
                        </div>
                      </dt>
                      <dd>
                        <ol>
                          <li v-for="(nox,tox) in xin" :key="tox">
                            <span class="no-top no">{{nox.t}}</span>
                            <a href="javascript:void(0)">{{nox.name}}</a>
                          </li>
                        </ol>
                        <div class="more">
                          <a href="javascript:void(0)">查看全部></a>
                        </div>
                      </dd>
                    </dl>
                    <dl class="blk fl">
                      <dt class="blk-top">
                        <div class="cver">
                          <a href="javascript:void(0)"></a>
                          <img class="auto-img" src="http://p4.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=100y100" alt="">
                          
                        </div>
                        <div class="fl tit">
                          <a href="javascript:void(0)"><h3>云音乐飙升榜</h3></a>
                          <div class="ge"></div>
                          <a href="javascript:void(0)" class="fl s-bgb"></a>
                          <a href="javascript:void(0)" class="fl s-bgn"></a>
                        </div>
                      </dt>
                      <dd>
                        <ol>
                          <li v-for="(nol,tol) in original" :key="tol">
                            <span class="no-top no">{{nol.t}}</span>
                            <a href="javascript:void(0)">{{nol.name}}</a>
                          </li>
                        </ol>
                        <div class="more">
                          <a href="javascript:void(0)">查看全部></a>
                        </div>
                      </dd>
                    </dl>
                </div>
              </div>
          </div>
        </div>
        <div class="right">
            <div class="tab-a">
                <div class="tab-txt">
                    <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
                    <a href="javascript:void(0)">用户登录</a>
                </div>
            </div>
            <div class="singer">
                <div class="singer-r">
                    <h3>
                        <span>入驻歌手</span>
                        <a href="javascript:void(0)">查看全部 ></a>
                    </h3>
                    <ul>
                        <li v-for="(item,index) in singer" :key="index">
                            <a href="javascript:void(0)">
                                <div class="a-img fl">
                                    <img :src="item.img1v1Url" alt="" >
                                </div>
                                <div class="a-fio fl">
                                    <h4><span>{{item.name}}{{item.alias[0]}}</span></h4>
                                    <!-- <p>{{item.img1v1Id}}</p> -->
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div class="letsinger">
                      <a href="javascript:void(0)">申请成为网易音乐人</a>
                    </div>
                </div>
            </div>
            <div class="anchor">
                <div class="hot-ancjor">
                  <h3>热门主播</h3>
                  <ul>
                    <li v-for="(pop,bo) in Popular" :key="bo">
                      <a class="li-img fl">
                        <img :src="pop.avatarUrl" alt="">
                      </a>
                      <div class="li-p">
                        <p><a>{{pop.nickName}}</a></p>
                        <p></p>
                      </div>
                    </li>
                  </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  <foot></foot>
  </div>
</template>

<script>
import '../../assets/less/tuijian.less'
import lun from '../../components/lun'
import foot from '../../components/foot'
export default {
  data() {
    return {
      banner: [],
      getPersonaLized:[],
      singer:[],
      Popular:[],
      biaos:[],
      xin:[],
      original:[],
      count:'',
    };
  },
  components:{
    lun,
    foot
  },
  created() {
    this.getBanner();
    this.getPersonalized();
    this.getsinger();
    this.getPopular();
    this.getLists();
    this.getxin();
    this.getOriginal();
  },
  methods: {
    gosong(){
      this.$router.push('./songSheet')
    },
    godetail(id){
        this.$router.push({name: 'SongDetail' , query: { id }})
    },
    getBanner() {
      this.axios({
        method: "GET",
        url: "/banner",
        params: {},
      }).then(result => {
        if (result.status == 200) {
          this.banner = result.data.banners;
        }
      });
    },
    getPersonalized(){
        this.axios({
            method: "GET",
            url: "/personalized?limit=8",
            params: {},
        }).then(result => {
        if (result.status == 200) {
          this.getPersonaLized = result.data.result;
          for(let i=0;i<this.getPersonaLized.length;i++){
              if(this.getPersonaLized[i].playCount > 100000){
                 this.getPersonaLized[i].playCount =parseInt(this.getPersonaLized[i].playCount / 10000) + '万';
              }
          }
        }
      });
    },
    getsinger(){
        this.axios({
            method:'GET',
            url:'/artist/list?cat=5001',
            params:{}
        }).then(result => {
          
            if(result.status == 200){
                for(let i = 0;i<5;i++){
                    this.singer.push(result.data.artists[i])
                }
            }
        })
    },
   getPopular(){
     this.axios({
            method:'GET',
            url:'/dj/toplist/popular?limit=5',
            params:{}
        }).then(result => {
        if (result.status == 200) {
          this.Popular = result.data.data.list;
        }
      });
   },
   getLists(){
     this.axios({
            method:'GET',
            url:'/top/list?idx=3',
            params:{}
        }).then(result => {
        if (result.status == 200) {
          this.biaos = result.data.playlist.tracks.slice(0,10)
          for(let i=0;i<this.biaos.length;i++){
            this.biaos[i].t = i + 1;
          }
          
        }
      });
   },
   getxin(){
     this.axios({
            method:'GET',
            url:'/top/list?idx=0',
            params:{}
        }).then(result => {
        if (result.status == 200) {
          this.xin = result.data.playlist.tracks.slice(0,10)
          for(let i=0;i<this.xin.length;i++){
            this.xin[i].t = i + 1;
          }
          
        }
      });
   },
   getOriginal(){
     this.axios({
            method:'GET',
            url:'/top/list?idx=2',
            params:{}
        }).then(result => {
        if (result.status == 200) {
          this.original = result.data.playlist.tracks.slice(0,10)
          for(let i=0;i<this.original.length;i++){
            this.original[i].t = i + 1;
          }
          
        }
      });
   },
  },
};
</script>
