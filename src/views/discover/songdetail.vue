<template>
<div>
    <div class="detail">
        <div class="de-right fr">
            <div class="right-top">
                <h3><span>喜欢这个歌单的人</span></h3>
                <ul class="ul1">
                    <li class="u-li1" v-for="(ig,rw) in subscribers" :key="rw">
                        <a href="javascript:void(0)" :title="ig.nickname"><img :src="ig.avatarUrl" alt=""></a>
                    </li>
                </ul>
                <h3><span>相关推荐</span></h3>
                <ul class="ul2">
                    <li class="u-li2" v-for="(hr,lis) in getrealts" :key="lis">
                        <div class="cover">
                            <a href="" :title="hr.name"><img :src="hr.coverImgUrl" alt=""></a>
                        </div>
                        <div class="info">
                            <p class="sp1"><a href="">{{hr.name}}</a></p>
                            <p class="sp2">
                                <span>by</span>
                                <a href="">{{hr.creator.nickname}}</a>
                            </p>
                        </div>
                    </li>
                </ul>
                <div class="tw"></div>
                <h3><span>网易云音乐多端下载</span></h3>
                <ul class="ul3">
                    <li class="fl"><a href="https://itunes.apple.com/cn/app/id590338362" class="ios"></a></li>
                    <li class="fl"><a href="https://music.163.com/api/pc/download/latest" class="pc"></a></li>
                    <li class="fl"><a href="https://music.163.com/api/android/download/latest2" class="aos"></a></li>
                </ul>
                <p class="footp">同步歌单，随时畅听320k好音乐</p>
            </div>
        </div>
        <div class="de-left fl">
            <div class="left-top">
                <div class="l-info">
                    <div class="l-img fl">
                        <img class="auto-img" :src="getdeta.coverImgUrl" alt="">
                        <span class="spap"></span>
                    </div>
                    <div class="l-cntc fr">
                        <div class="hb">
                            <i class="icn fl"></i>
                            <div class="tits fl">
                                <h2 class="brk">{{getdeta.name}}</h2>
                            </div>
                        </div>
                         <div class="user">
                            <a href="javascript:void(0)" class="face fl">
                                <img class="auto-img" :src="creator.avatarUrl" alt="">
                            </a>
                            <span class="name"><a href="javascript:void(0)">{{creator.nickname}}</a></span>
                            <span class="time">{{createtime}} 创建</span>
                        </div>
                        <div class="btns clearfix">
                            <a href="javascript:void(0)" class="play fl" title="播放" @click="getsongurl">
                                <i>
                                    <em></em>
                                    播放
                                </i>
                            </a>
                            <a href="" class="btni-add fl" title="添加到播放列表"></a>
                            <a href="" class="btni-fav">
                                <i>({{subscribedCount}})</i>
                            </a>
                            <a href="" class="btni-share">
                                <i>({{getdeta.shareCount}})</i>
                            </a>
                            <a href="" class="btni-dl">
                                <i>下载</i>
                            </a>
                            <a href="" class="btni-cmmt">
                                <i>({{getdeta.commentCount}})</i>
                            </a>
                        </div>
                        <p class="f-brk">
                            <span>
                                <b>介绍：</b>
                            {{getdeta.description}}
                            </span>
                        </p>
                    </div>
                </div>
                <div class="songtb">
                    <div class="title">
                        <h3>
                            <span>歌曲列表</span>
                        </h3>
                        <span class="sub">
                            <span class="playlist-track-count">{{litsong}}</span>
                            首歌
                        </span>
                        
                        <div class="more">
                            播放：
                            <strong class="play-count">{{getdeta.playCount}}</strong>
                            次
                        </div>
                        <div class="out-list fr">
                            <i></i>
                            <a href="" class="outchain">生成外链播放器</a>
                        </div>
                    </div>
                    <div class="song-list">
                        <table class="m-table" border="0" cellspacing="0" cellpadding="0">
                            <thead>
                                <tr>
                                    <th class="w1"><div class="wp">&nbsp;</div></th>
                                    <th class="w2"><div class="wp">歌曲标题</div></th>
                                    <th class="w3"><div class="wp">时长</div></th>
                                    <th class="w4"><div class="wp">歌手</div></th>
                                    <th class="w5"><div class="wp">专辑</div></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in tableData" :key="index">
                                    <td><div class="hd"><span class="num fl">{{item.pst}}</span><span class="ply fr" ref="plys" :class="{plys : item.t}" @click="bofang(index,item.id)"></span></div></td>
                                    <td><a href="" class="tda" :title="item.name">{{item.name}}</a></td>
                                    <td>{{new Date(item.dt).toTimeString().substr(3,5)}}</td>
                                    <td><a href="" class="tda" :title="item.ar[0].name">{{item.ar[0].name}}</a></td>
                                    <td><a href="" class="tda" :title="item.al.name">{{item.al.name}}</a></td>
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
        
    </div>
    <foot></foot>
    <!-- <aidos class="aidos" :inputSong="tableSong"></aidos> -->
    <!-- <aduios></aduios> -->
    <audio class="aidos" ref="audios" :src="songurl" autoplay></audio>
    </div>
</template>

<script>
import foot from "../../components/foot";
// import aduios from "../../components/aduios";
import '../../assets/less/songdetail.less'
export default {
    data(){
        return{
            id:'',
            fred: false,
            getdeta:[],
            creator:[],
            subscribers:[],
            getrealts:[],
            createtime:'',
            subscribedCount:'',
            tableData:[],
            tableSong:[],
            tableID:[],
            count:0,
            songid:'',
            songurl:'',
            litsong:'',
        }
    },
    components: {
        foot,
        // aduios
    },
    created(){
        
        this.id = this.$route.query.id;
        this.getdetail();
        this.getrealt();
    },
    methods:{
        getdetail(){
            this.axios({
                method:'GET',
                url:'/playlist/detail',
                params:{
                    id: this.id
                }
            }).then(res => {
                if(res.status == 200){
                    this.getdeta = res.data.playlist;
                    this.litsong = this.getdeta.trackIds.length;
                    this.subscribers = res.data.playlist.subscribers;
                    this.creator = res.data.playlist.creator;
                    this.tableData = res.data.playlist.tracks;
                    this.createtime = new Date(this.getdeta.createTime);
                    this.createtime = this.createtime.toLocaleDateString().replace(/\//g, "-") + " " + this.createtime.toTimeString().substr(0, 0)
                    if(this.getdeta.subscribedCount > 100000){
                        this.subscribedCount = parseInt(this.getdeta.subscribedCount / 10000) + '万';
                    }else{
                        this.subscribedCount = this.getdeta.subscribedCount
                    }
                    for(let i=0;i<this.tableData.length;i++){
                        this.tableData[i].pst = i + 1;
                        this.tableID.push(this.tableData[i].id)
                    }
                }
            })
        },
        getrealt(){
            this.axios({
                method:'GET',
                url:'/related/playlist',
                params:{
                    id: this.id
                }
            }).then(res => {
                if(res.status == 200){
                   this.getrealts = res.data.playlists;
                }
            })
        },
        getsongurl(){
            this.axios({
                method:'GET',
                url:'/song/url',
                params:{
                    id: this.tableID
                }
            }).then(res => {
                if(res.status == 200){
                   this.songurl = res.data.data[0].url;
                    this.$refs.audio.play();
                }
            })
        },
        bofang(index,id){
            this.axios({
                method:'GET',
                url:'/song/url',
                params:{
                    id: id
                }
            }).then(res => {
                if(res.status == 200){
                   this.songurl = res.data.data[0].url;
                    this.$refs.audios.play();
                    for(let i=0;i<this.tableData.length;i++){
                        this.tableData[index].t = 1
                        this.tableData[i].t = 0
                   }
                }
            })
        },
    }
}
</script>

<style lang="less" scoped>
.aidos{
    position: fixed;
    right: 10px;
    bottom: 10px;
}
</style>