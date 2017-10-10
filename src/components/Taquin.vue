<template>
  <div class="taquin">
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
    <div class="piece"></div>
  </div>
</template>

<script>
export default {
  name: 'Taquin',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.taquin {
  width: 800px;
  height: 800px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 10px;
  border: 1px solid #000;
  margin: 0 auto;
  padding: 10px;
  .piece {
    border: 1px solid grey;
  }
}
</style>
