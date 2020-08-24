<template>
  <div>
    <el-backtop :bottom="100">
      <div
        style="{
          height: 100%;
          width: 100%;
          background-color: #f2f5f6;
          box-shadow: 0 0 6px rgba(0,0,0, .12);
          text-align: center;
          line-height: 40px;
          font-size:12px;
          color: #000;
        }"
      >
        top
      </div>
    </el-backtop>
    <div class="m-top">
      <div class="top">
        <div class="wrap">
          <h1 class="fl">
            <a href="javascript:void(0)" class="logos"></a>
          </h1>
          <ul>
            <li v-for="(item,index) in wrap" :key="index">
              <span>
                <a href="javascript:void(0)" @click="Awrap(item,index)" :class="{active : item.isActive}">{{item.name}}</a>
              </span>
            </li>
          </ul>
          <div class="tflage fr">
            <a href>登录</a>
          </div>
          <a href class="fr bilog">创作者中心</a>
          <div class="srcbg fr">
            <span class="ks"></span>
            <span>
              <input type="text" @focus="ddd" @blur="ccc" @keyup.enter="seach" v-model="value"/>
              <label for @click="ddd" v-if="active">音乐/视频/电台/用户</label>
            </span>
            <div v-if="laoy" class="lstlay">
              <div class="schlist">
                <p class="note"><a href="" class="s-fc3">搜“{{value}}”相关用户</a>&nbsp;></p>
                <div class="rap">
                  <div class="itm2 f-cb">
                    <h3 class="hd">
                      <i class="icn"></i>
                      <em>歌手</em>
                    </h3>
                    <ul class="fls">
                      <li class="lis" v-for="(item,index) in singer" :key="index"><a class="aos" >{{item.name}}</a></li>
                    </ul>
                  </div>
                  <div class="itm1 f-cb">
                    <h3 class="hd">
                      <i class="icn"></i>
                      <em>单曲</em>
                    </h3>
                    <ul class="fls">
                      <li class="lis" v-for="(item,index) in songs" :key="index"><a class="aos" @click="single(item.id)">{{item.name}}-{{item.artists[0].name}}</a></li>
                    </ul>
                  </div>
                  <div class="itm3 f-cb">
                    <h3 class="hd">
                      <i class="icn"></i>
                      <em>专辑</em>
                    </h3>
                    <ul class="fls">
                      <li class="lis" v-for="(item,index) in goods" :key="index"><a class="aos">{{item.name}}-{{item.artists[0].name}}</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="m-nav">
      <div class="nav">
        <ul>
          <li v-for="(item,index) in nav" :key="index">
            <span>
              <a href="javascript:void(0)" :class="{wrapbg : item.isActive}" @click="navs(item,index)">
                <em>{{item.name}}</em>
              </a>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <aidos></aidos>
    
    <router-view></router-view>
  </div>
  
</template>

<script>
import "../assets/less/discover.less"
import aidos from "../components/aidos"
export default {
  data() {
    return {
      value:'',
      active: true,
      laoy: false,
      songs:[],
      goods:[],
      singer:[],
      wrap:[
        {isActive: true,name:'发现音乐'},
        {isActive: false,name:'我的音乐'},
        {isActive: false,name:'朋友'},
        {isActive: false,name:'商城'},
        {isActive: false,name:'音乐人'},
        {isActive: false,name:'下载客户端'},
      ],
      nav:[
        {isActive: true,name:'推荐',router:'./tuijian'},
        {isActive: false,name:'排行榜',router:'./ranking'},
        {isActive: false,name:'歌单',router:'./songSheet'},
        {isActive: false,name:'主播电台',router:'./ggg'},
        {isActive: false,name:'歌手',router:'./ggg'},
        {isActive: false,name:'新碟上架',router:'./ggg'},
      ],
    };
  },
  components:{
   aidos
  },
  created(){
      
  },
  watch:{
    value: 'seach',
  },
  methods: {

    ccc() {
      // this.laoy = false;/
      if(this.value != ""){
        this.active = false;
      }else{
        this.active = true;
      }
    },
    single(id){
      this.$router.push({name: 'Single',query: { id }})
      this.laoy = false
    },

    seach(){
      if(this.value == ''){
        this.laoy = false;
      }else{
        this.laoy = true;
      }
      this.axios({
        method:'GET',
        url:'/search',
        params:{
          keywords: this.value,
          type: 1,
          limit: 4
        }
      }).then(res => {
        this.songs = res.data.result.songs;
        // console.log(this.songs);
      })
      this.axios({
        method:'GET',
        url:'/search',
        params:{
          keywords: this.value,
          type: 10,
          limit: 4
        }
      }).then(res => {
        this.goods = res.data.result.albums;
      })
      this.axios({
        method:'GET',
        url:'/search',
        params:{
          keywords: this.value,
          type: 100,
          limit: 1
        }
      }).then(res => {
        this.singer = res.data.result.artists;
      })
    },
    Awrap(item,index){
        for(let i=0;i<this.wrap.length;i++){
            if(this.wrap[i].isActive){
                this.wrap[i].isActive = false;
                break;
            }
        }
        item.isActive = true;
    },
    navs(item,index){
        for(let i=0;i<this.nav.length;i++){
            if(this.nav[i].isActive){
                this.nav[i].isActive = false;
                break;
            }
        }
        item.isActive = true;
        this.$router.push(item.router)
    },
    ddd() {
      this.active = false;
      if(this.value == ""){
        this.laoy = false
      }else{
        this.laoy = true
      }
    },

  },
};
</script>

<style lang="less">

</style>