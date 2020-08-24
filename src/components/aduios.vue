<template>
  <div>
    <div style="text-align:center;clear:both;"></div>

    <!-- 播放器 -->
    <div class="music-player" id="player">
      <div class="col-lg-6" style="margin-bottom: 20px;float: none;width:100%;align:center">
        <div class="input-group">
          <input
            v-model="query"
            @keyup.enter="searchMusic"
            type="text"
            class="form-control"
            placeholder="查找歌曲"
          />
          <span class="input-group-btn">
            <button class="btn btn-default" type="button" @click="searchMusic">搜索</button>
          </span>
        </div>
        <!-- /input-group -->
      </div>
      <!-- /.col-lg-6 -->
      <!-- audio标签 -->
      <audio ref="audio" class="music-player__audio" :src="musicUrl" autoplay="autoplay"></audio>
      <!-- 播放器主体 -->
      <div class="music-player__main">
        <!-- 模糊背景 -->
        <div class="music-player__blur" :style="{'backgroundImage':'url('+picUrl+')'}"></div>
        <!-- 唱片 -->
        <div class="music-player__disc">
          <!-- 唱片图片 -->
          <div class="music-player__image">
            <img width="100%" :src="picUrl" alt />
          </div>
          <!-- 指针 -->
          <div class="music-player__pointer" :class="play">
            <img width="100%" class="auto-img" src="../assets/images/baios.jpg" alt />
          </div>
        </div>
        <!-- 控件主体 -->
        <div class="music-player__controls">
          <!-- 歌曲信息 -->
          <div class="music__info">
            <h3 class="music__info--title" v-text="musicName"></h3>
            <p class="music__info--singer" v-text="artist"></p>
          </div>
          <!-- 控件... -->
          <div class="player-control">
            <div class="player-control__content">
              <div class="player-control__btns">
                <div class="player-control__btn player-control__btn--prev">
                  <i class="iconfont icon-prev" @click="musicChange('pre')"></i>
                </div>
                <div class="player-control__btn player-control__btn--play">
                  <i @click="musiccl" :class="pause"></i>
                </div>
                <div class="player-control__btn player-control__btn--next">
                  <i class="iconfont icon-next" @click="musicChange('next')"></i>
                </div>
                <div class="player-control__btn player-control__btn--mode">
                  <i class="iconfont icon-loop"></i>
                </div>
              </div>
              <div class="player-control__volume">
                <div class="control__volume--icon player-control__btn">
                  <i class="iconfont icon-volume"></i>
                </div>
                <div class="control__volume--progress progress"></div>
              </div>
            </div>

            <!-- 歌曲播放进度 -->
            <div class="player-control__content">
              <div class="player__song--progress progress"></div>
              <div class="player__song--timeProgess nowTime">00:00</div>
              <div class="player__song--timeProgess totalTime">
                <span v-text="totalTime"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 歌曲列表 -->
      <div class="music-player__list">
        <ul class="music__list_content">
          <li
            class="music__list__item"
            :class="playing"
            v-for="(item,index) in musicList"
            :key="index"
            @click="playMusic(item.id,item.name,item.artists[0].name,index)"
          >
            <span style="color:aliceblue;">{{ item.name }}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;{{ item.artists[0].name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: {
    //查询关键字
    query: "",
    //歌曲数组
    musicList: [],
    //歌曲地址
    musicUrl: "",
    //歌曲播放图标切换
    pause: "iconfont icon-play",
    playing: "music__list__item",
    //歌曲名
    musicName: "...",
    //作者
    artist: "...",
    //图片路径
    picUrl: "",
    //指针状态
    play: "",
    //歌曲在数组中的位置
    musicIndex: 0,
    totalTime: "00:00",
  },
  methods: {
    //歌曲搜索
    searchMusic: function () {
      var that = this;
      axios.get("https://autumnfish.cn/search?keywords=" + this.query).then(
        function (response) {
          that.musicList = response.data.result.songs;
          console.log(response);
        },
        function (err) {}
      );
    },
    //歌曲播放
    playMusic: function (musicId, musicname, artist, index) {
      this.play = "play";
      this.musicIndex = index;

      //获取点击歌曲url并播放
      var that = this;
      axios.get("https://autumnfish.cn/song/url?id=" + musicId).then(
        function (response) {
          that.musicUrl = response.data.data[0].url;
          that.pause = "iconfont icon-pause";
          that.playing = "music__list__item play";
          that.musicName = musicname;
          that.artist = artist;
          console.log(response);
        },
        function (err) {}
      );

      //获取时长
      totalMinute =
        parseInt(this.$refs.audio.duration / 60) < 10
          ? "0" + parseInt(this.$refs.audio.duration / 60)
          : parseInt(this.$refs.audio.duration / 60);
      totalSecond =
        parseInt(this.$refs.audio.duration % 60) < 10
          ? "0" + parseInt(this.$refs.audio.duration % 60)
          : parseInt(this.$refs.audio.duration % 60);
      this.totalTime = totalMinute + ":" + totalSecond;
      console.log(this.totalTime);

      //歌曲详情获取
      axios.get("https://autumnfish.cn/song/detail?ids=" + musicId).then(
        function (response) {
          console.log(response.data.songs[0].al.picUrl);
          that.picUrl = response.data.songs[0].al.picUrl;
        },
        function (err) {}
      );
    },
    //歌曲播放与暂停切换
    musiccl: function () {
      if (this.pause == "iconfont icon-pause") {
        this.$refs.audio.pause();
        this.pause = "iconfont icon-play";
        this.play = "";
      } else {
        this.$refs.audio.play();
        this.pause = "iconfont icon-pause";
        this.play = "play";
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
  },
};
</script>

<style lang="less" scoped>
</style>