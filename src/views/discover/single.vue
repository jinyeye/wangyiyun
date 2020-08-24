<template>
<div>
    <div class="g-bd">
        <div class="g-mn">
            <div class="g-mnc">
                <div class="g-wrap">
                    <div class="lycfo">
                        <div class="cvr">
                            <div class="cover fl">
                                <img :src="sPurl" alt="">
                                <span></span>
                            </div>
                            <div class="out">
                                <i></i>
                                <a href="">生成外链播放器</a>
                            </div>
                        </div>
                        <div class="cnt">   
                            <div class="hd">
                                <i class="lab"></i>
                                <div class="tit">
                                    <em>{{songs.name}}</em>
                                    <a href=""><i></i></a>
                                    <div class="submit">{{alia}}</div>
                                </div>
                            </div>
                            <p class="des">
                                歌手：
                                <span title="">
                                    <a href="">{{nameed}}</a>
                                </span>
                            </p>
                            <p class="des">
                                所属专辑：
                                <span title="">
                                    <a href="">{{alname}}</a>
                                </span>
                            </p>
                            <div class="btns clearfix">
                                <a href="javascript:void(0)" class="play fl" title="播放" @click="playAud">
                                    <i>
                                        <em></em>
                                        播放
                                    </i>
                                </a>
                                <a href="" class="btni-add fl" title="添加到播放列表"></a>
                                <a href="" class="btni-fav">
                                    <i>收藏</i>
                                </a>
                                <a href="" class="btni-share">
                                    <i>分享</i>
                                </a>
                                <a href="" class="btni-dl">
                                    <i>下载</i>
                                </a>
                                <a href="" class="btni-cmmt">
                                    <i>({{songs.cp}})</i>
                                </a>
                            </div>
                            <div class="bd-open">
                                <ul>
                                    <li v-for="(item,index) in songfen[0]" :key="index">{{item}}</li>
                                </ul>
                                <ul v-show="active">
                                    <li v-for="(item,index) in songgod[0]" :key="index">{{item}}</li>
                                </ul>
                                <div class="show">
                                    <a href="javascript:void(0)" class="flag_ctrl" @click="vShow">展开<i class="u-icn" :class="{dicn : active}"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="g-sd">
            <div class="g-wrap">
                <h3 class="hd3 fl">
                    <span class="fl">包含这首歌的歌单</span>
                </h3>
                <ul class="rctlist">
                    <li v-for="(item,index) in playList" :key="index">
                        <div class="cver">
                            <a href="">
                                <img :src="item.coverImgUrl" alt="">
                            </a>
                        </div>
                        <div class="info">
                            <p class="thide">
                                <a href="">{{item.name}}</a>
                            </p>
                            <p class="bye">
                                <span>by</span>
                                <a href="">{{item.creator.nickname}}</a>
                            </p>
                        </div>
                    </li>
                </ul>
                <h3 class="hd3 fl">
                    <span class="fl">相似歌曲</span>
                </h3>
                <ul class="sglist fl">
                    <li class="f-cb" v-for="(item,index) in isong" :key="index">
                        <div class="txt">
                            <div class="f-thided">
                                <a href="">{{item.name}}</a>
                            </div>
                            <div class="f-thides">
                                <span>
                                    <a href="">{{item.artists[0].name}}</a>
                                    <a href="" v-if="item.artists.length > 1 ? true : false">/{{item.artists[1].name}}</a>
                                    <a href="" v-if="item.artists.length > 2 ? true : false">/{{item.artists[2].name}}</a>
                                </span>
                            </div>
                        </div>
                        <div class="opr">
                            <a href="" class="play"></a>
                            <a href="" class="addto"></a>
                        </div>
                    </li>
                </ul>
                <h3 class="hd3 fl">
                    <span class="fl">网易云音乐多端下载</span>
                </h3>
                <ul class="ul3 fl">
                    <li class="fl"><a href="https://itunes.apple.com/cn/app/id590338362" class="ios"></a></li>
                    <li class="fl"><a href="https://music.163.com/api/pc/download/latest" class="pc"></a></li>
                    <li class="fl"><a href="https://music.163.com/api/android/download/latest2" class="aos"></a></li>
                </ul>
                <p class="footp">同步歌单，随时畅听320k好音乐</p>
            </div>
        </div>
        <audio ref="audio"  :src="songUrl" controls></audio>
    </div>
    <foot></foot>
</div>
</template>

<script>
import foot from '../../components/foot.vue'
import '../../assets/less/single.less'
export default {
    data(){
        return{
            id:'',
            active: false,
            artis: false,
            songs:[],
            lineArr:[],
            sPurl:'',
            alia:'',
            nameed:'',
            alname:'',
            songlrc:[],
            songfen:[],
            songgod:[],
            son:[],
            songUrl:[],
            playList:[],
            isong:[],
            singer:[],
            singers:'',
        }
    },
    components:{
        foot
    },
    watch:{
        
    },
    created(){
        this.id = this.$route.query.id
        this.single();
        this.songsurl();
        this.playlist();
    },
    methods:{
        vShow(){
            this.active = !this.active;
        },
        playAud(){
            this.$refs.audio.play()
        },
        single(){
            this.axios({
                method:'GET',
                url:'/lyric',
                params:{
                    id: this.id
                }
            }).then(res => {
                if(res.status = 200){
                    const regNewLine = /\n/;
                    this.lineArr = res.data.lrc.lyric.split(regNewLine);
                    this.lineArr.forEach(item => {
                        if (item === '') return
                        this.son = item.split(']')[1].trim() === '' ? '' : item.split(']')[1].trim()
                        this.songlrc.push(this.son)
                        
                    });
                    this.songfen.push(this.songlrc.slice(0,15));
                    this.songgod.push(this.songlrc.slice(15,this.songlrc.length))
                }
            })
            this.axios({
                method:'GET',
                url:'/song/detail',
                params:{
                    ids: this.id
                }
            }).then(res => {
                if(res.status = 200){
                    this.songs = res.data.songs[0];
                    this.alia = this.songs.alia[0];
                    this.nameed = this.songs.ar[0].name;
                    this.alname = this.songs.al.name;
                    this.sPurl = this.songs.al.picUrl;
                }
            })
        },
        songsurl(){
            this.axios({
                method:'GET',
                url:'/song/url',
                params:{
                    id: this.id
                }
            }).then(res => {
                if(res.status = 200){
                    this.songUrl = res.data.data[0].url;
                }
            })
        },
        playlist(){
            this.axios({
                method:'GET',
                url:'/simi/playlist',
                params:{
                    id: this.id
                }
            }).then(res => {
                if(res.status = 200){
                    this.playList = res.data.playlists;
                }
            })
            this.axios({
                method:'GET',
                url:'/simi/song',
                params:{
                    id: this.id
                }
            }).then(res => {
                if(res.status = 200){
                    this.isong = res.data.songs;
                }
            })
        },
    }
}
</script>

<style lang="less" scoped>

</style>