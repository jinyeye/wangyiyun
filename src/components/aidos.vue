<template>
  <div>
    <audio id="myAudio" ref="audio" :src="musicUrl" autoplay="autoplay" muted></audio>
    <div class="adios">
      <div class="playbar">
        <div class="updn">
          <div class="left fl">
            <a href="javascript:void(0)" class="btn"></a>
          </div>
          <div class="right fl"></div>
        </div>
        <div class="bg"></div>
        <div class="hand"></div>
        <div class="g_plarer">
          <div class="btns fl">
            <a href="javascript:void(0)" class="prv"></a>
            <a href="javascript:void(0)" class="ply" @click="musiccl" :class="{pause: active}"></a>
            <a href="javascript:void(0)" class="nxt"></a>
          </div>
          <div class="head fl">
            <img :src="musicImg" alt />
            <a href="javascript:void(0)" class="mask"></a>
          </div>
          <div class="play fl">
            <div class="words">
              <a href="javascript:void(0)" class="name">{{musicName}}</a>
              <span class="by">
                <span>
                  <a href="javascript:void(0)">{{musicarname}}</a>

                  <a href="javascript:void(0)"></a>
                </span>
              </span>
            </div>
            <div class="pbar">
              <div class="barbg">
                <div class="rdy"></div>
                <div class="cur" :style="{width: progress + '%'}">
                  <span class="alpha">
                    <i></i>
                  </span>
                </div>
              </div>
              <span class="time">
                <em>0{{fen}}:{{miao}}{{miaos}}</em>
                / {{time}}
              </span>
            </div>
          </div>
          <div class="oper fl">
            <a href="javascript:void(0)" class="icn-add"></a>
            <a href="javascript:void(0)" class="icn-share"></a>
          </div>
          <div class="ctrl fl">
            <div></div>
            <a href="javascript:void(0)" class="icn icn-vol" @click="mutedvol"></a>
            <a href="javascript:void(0)" class="icn icn-loop"></a>
            <span class="add">
              <span class="tip" style="display:none"></span>
              <a href="javascript:void(0)" class="icn icn-list"></a>
            </span>
            <div class="list">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/aidos.less";
import { mapState, mapActions } from "vuex";
export default {
  props: {
    inputSong: String,
    required: true,
  },
  data() {
    return {
      active: false,
      musicUrl: "",
      musicImg: "",
      musicName: "",
      musicarname: "",
      time: "",
      fen:0,
      miao:0,
      miaos:0,
      progress: 0,
      tableData: [],
      //歌曲播放图标切换
      pause: "iconfont icon-play",
      playing: "music__list__item",
      //歌曲名
      musicName: "...",
      //作者
      artist: "...",
      //指针状态
      play: "",
      //歌曲在数组中的位置
      musicIndex: 0,
      totalTime: "",
    };
  },
  watch: {
  },
  created() {},
  computed: {
    ...mapState({
      print: (state) => state.print.all,
    }),
  },
  methods: {
    musiccl() {
      this.musicUrl = this.print.url;
      this.tableData = this.print.table;
      this.musicImg = this.tableData.al.picUrl;
      this.musicName = this.tableData.name;
      this.time = new Date(this.tableData.dt).toTimeString().substr(3, 5);
      this.totalTime = this.time.slice(3, 5) * 1 + this.time.slice(1, 2) * 60;
      this.musicarname = this.tableData.ar[0].name;
      const daoji = setInterval(()=>{
        if(this.miaos >= 9){
            this.miaos = 0
            this.miao += 1
            if(this.miao >= 6){
              this.miao = 0
              this.fen += 1
              if(this.fen == this.time.slice(1, 2) && this.miaos == this.time.slice(3, 4) && this.miao == this.time.slice(4, 5)){
                clearInterval(daoji);
              }
            }
        }else{
          this.miaos ++
        }
      },1000)
      if (this.active == true) {
        clearInterval(timer);
        clearInterval(daoji);
        this.$refs.audio.pause();
        this.active = !this.active;
      } else {
          const timer = setInterval(() => {
            if (this.progress < 99) {
              this.progress++;
            } else {
              clearInterval(daoji);
              this.miaos = 0
              this.miao = 0
              this.fen = 0
              clearInterval(timer);
              this.progress = 0;
            }
        }, (this.totalTime / 100) * 1000);
        this.$refs.audio.play();
        this.active = !this.active;
      }
    },
    //歌曲切换
    musicChange: function (changeid) {
      index = this.musicIndex;
      if (index >= 0 && index <= this.musicList.length) {
        //上一首
        if (changeid == "pre" && index > 0) {
          musicId = this.musicList[index - 1].id;
          musicname = this.musicList[index - 1].name;
          artist = this.musicList[index - 1].artists[0].name;
          this.playMusic(musicId, musicname, artist, index - 1);
        }
        //下一首
        if (changeid == "next" && index < this.musicList.length) {
          musicId = this.musicList[index + 1].id;
          musicname = this.musicList[index + 1].name;
          artist = this.musicList[index + 1].artists[0].name;
          this.playMusic(musicId, musicname, artist, index + 1);
        }
      }
    },
    mutedvol(){
      document.getElementById("myAudio").volume = 0.5;
    }
  },  
};
</script>