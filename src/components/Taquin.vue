<template>
  <div>
    <div class="taquin">
      <piece :key="index" v-for="(piece, index) in shuffle(pieces)" :id="index" :number="piece.number" :position="piece.position" :allPositions="allPositions" :freePosition="freePosition" @moved="onPieceMoved"></piece>
    </div>
    <div class="debug">
        <pre>
          free position: {{freePosition}}
        </pre>
    </div>
  </div>
</template>

<script>
import piece from './Piece'
export default {
  name: 'Taquin',
  components: {piece},
  methods: {
    shuffle: function (a) {
      let j, x, i
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = a[i]
        a[i] = a[j]
        a[j] = x
      }
      return a
    },
    onPieceMoved: function (piece, newFreePosition) {
      this.freePosition = newFreePosition
      console.log(this.shuffle([1, 2, 3, 4]))
      // ToDo: check if game done
      // console.log('moved', piece, newFreePosition)
    }
  },
  data () {
    return {
      pieces: [
        {index: 0, number: 1, position: '00'},
        {index: 1, number: 2, position: '01'},
        {index: 2, number: 3, position: '02'},
        {index: 3, number: 4, position: '10'},
        {index: 4, number: 5, position: '11'},
        {index: 5, number: 6, position: '12'},
        {index: 6, number: 7, position: '20'},
        {index: 7, number: 8, position: '21'}
      ],
      allPositions: ['00', '01', '02', '10', '11', '12', '20', '21', '22'],
      freePosition: '22'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.taquin {
  width: 600px;
  height: 600px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 10px;
  border: 1px solid #000;
  margin: 0 auto;
  padding: 10px;
}
</style>
