<template>
  <div>
      <nav class="game-config">
          <div>
            <label for="gitter-3">3x3</label><input type="radio" id="gitter-3" value="3" v-model="grid" checked="true" @change="onGridChange">
            <label for="gitter-4">4x4</label><input type="radio" id="gitter-4" value="4" v-model="grid" @change="onGridChange">
          </div>
          <div class="image-config">
            <!-- <div class="numbers">
              <input id="numbers" type="radio" @change="onPictureChange" value="none" checked="checked" v-model="picture">
              <label for="numbers">
                12345...
              </label>
            </div> -->
            <div :key="index" v-for="(pic, index) in pictureConfig">
              <input  type="radio" :id="pic.index" :value="pic.url" v-model="picture"  @change="onPictureChange" :checked="false">
              <label v-if="pic.url === 'none'" :for="pic.index" class="numbers">
                12345...
              </label>
              <label v-if="pic.url !== 'none'" :for="pic.index">
                <img class="config-image" alt="pic1" :src="pic.url">
              </label>
            </div>
          </div>
      </nav>
  </div>
</template>

<script>
export default {
  name: 'config',
  props: ['number', 'position', 'allPositions', 'freePosition'],
  methods: {
    onPictureChange: function () {
      this.$emit('bgchanged', this.picture)
    },
    onGridChange: function () {
      this.$emit('gridchanged', parseInt(this.grid))
    }
  },
  data () {
    return {
      grid: 3,
      picture: 'none',
      pictureConfig: [
        {index: 'pic0', url: 'none'},
        {index: 'pic1', url: '/static/pic1.jpg'},
        {index: 'pic2', url: '/static/pic2.jpg'},
        {index: 'pic3', url: '/static/pic3.jpg'},
        {index: 'pic4', url: '/static/pic4.jpg'},
        {index: 'pic5', url: '/static/pic5.jpg'}
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.image-config {
  display: flex;
  flex-wrap: wrap;
  > div {
    display: inline-block;
    margin: 0 5px;
    label.numbers {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #e3e3e3;
    }
  }
  input[type=radio] {
    display: none;
    &:checked + label {
      border-color: #000;
      box-shadow: 1px 2px 10px #000;
    }
  }
  label {
    display: inline-block;
    cursor: pointer;
    width: 104px;
    height: 104px;
    border: 2px solid transparent;
    border-radius: 5px;
    transition: all 0.25s ease-in-out 0s;
    &:hover {
      border-color: #000;
      box-shadow: 1px 2px 10px #000;
    }
    .config-image {
      width: 100px;
      border-radius: 3px;
    }
  }

} 
</style>
