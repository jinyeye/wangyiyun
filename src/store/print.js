/**
 * 存放 ** 数据
 * **/
 
// initial state
const state = {
    all: { 
        url:'',
        table:[]
    }
  }
   
  // getters
  const getters = {}
   
  // actions
  const actions = {}
   
  // mutations
  const mutations = {
    setPrint(state, all) { //设置参数
      state.all = all;
    },
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
  }
   
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }