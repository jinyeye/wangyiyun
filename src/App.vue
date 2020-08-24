<template>
  <div id="app">
    <router-view></router-view>
    
  </div>
</template>

<script>

export default {
  
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 12px;
  color: #333;
}
*{
  padding: 0;
  margin: 0;
}
body{
  margin: 0;
  background-color: #f3f3f3;
}
li{
  list-style: none;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.clearfix::after{
  content: '';
  display: block;
  clear: both;
}
.auto-img{
  width: 100%;
  display: block;
}
i{
  font-style: normal;
}
.one-text{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
a{
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}
a:hover{
  text-decoration: underline;
}
</style>
