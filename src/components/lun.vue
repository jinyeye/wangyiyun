<template>
  <div>
    <el-carousel height="190px" :autoplay="false" :loop="true" indicator-position="none" arrow="always">
      <el-carousel-item v-for="(item,index) in pushtalb" :key="index">
        <div class="uls">
            <div class="fl lisp" v-for="(ter,lu) in item[0]" :key="lu">
                <div class="a-lis">
                    <a href="javascript:void(0)">
                        <div class="a-img">
                            <img class="auto-img" :src="ter.picUrl" alt="" :title="ter.name">
                            <a href="javascript:void(0)"></a>
                        </div>
                        <p><a>{{ter.name}}</a></p>
                        <p><a>{{ter.company}}</a></p>
                    </a>
                </div>
            </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
    data(){
        return{
            talbum:[],
            talbs:[],
            pushtalb:[]
        }
    },
  created() {
    this.getTalbum();
  },
  methods: {
    getTalbum() {
      this.axios({
        method: "GET",
        url: "/top/album?limit=10",
        params: {},
      }).then((result) => {
          if(result.status == 200){
              this.talbum.push(result.data.albums.slice(0,5))
              this.talbs.push(result.data.albums.slice(5,10))
              this.pushtalb.push(this.talbs,this.talbum)
          }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 186px;
  margin: 0;
}
.el-carousel--horizontal{
    background-color: #f5f5f5;
    margin: 20px 0 37px;
    border: 1px solid #d5d5d5;
}
/deep/ .el-carousel__arrow--left{
    left: -5px;
}
/deep/ .el-carousel__arrow{
    background-color: rgba(0, 0, 0, 0);
    color: #000;
    font-size: 16px;
}
/deep/ .el-carousel__arrow--right{
    right: -5px;
}
.uls{
    width: 645px;
    height: 150px;
    margin-top: 28px;
    margin-left: 20px;
    .lisp{
        margin-left: 9px;
        width: 118px;
        height: 150px;
        .a-lis{
            width: 100%;
                height: 100%;
            a{
                display: inline-block;
                width: 100%;
                height: 100%;
                .a-img{
                    width: 100%;
                    height: 100px;
                    position: relative;
                    img{
                        width: 100px;
                        height: 100px;
                        display: inline-block;
                    }
                    a{
                        display: inline-block;
                        background: url(../assets/images/coverall.png) no-repeat;
                        width: 118px;
                        height: 100px;
                        background-position: 0 -570px;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                }
                p{
                    height: 18px;
                    font-size: 12px;
                    line-height: 18px;
                    color: #000;
                    margin-top: 5px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    a{
                        color: #000;
                    }
                }
            }
        }
    }
}
</style>