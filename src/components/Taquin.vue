<template>
  <div style="position:relative;">
    <nav class="game-config">
      <label for="gitter-3">3x3</label><input type="radio" id="gitter-3" value="3" v-model="grid" checked="true">
      <label for="gitter-4">4x4</label><input type="radio" id="gitter-4" value="4" v-model="grid">
    </nav>
    <div class="moves">Moves: {{moves}}</div>
    <div class="taquin" :style="{
      gridTemplateColumns: 'repeat(' + grid + ', 1fr)',
      gridTemplateRows: 'repeat(' + grid + ', 1fr)'}">
      <div class="win">You Win!!!</div>
      <piece :key="index" v-for="(piece, index) in shuffledPieces" :id="index" :number="piece.number" :position="allPositions[index]" :allPositions="allPositions" :freePosition="freePosition" @moved="onPieceMoved"></piece>
    </div>
    <!-- <div class="debug">
        <pre>
          shuffled: {{shuffledPieces}}
        </pre>
    </div> -->
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
      let b = a
      for (i = b.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = b[i]
        b[i] = b[j]
        b[j] = x
      }
      return b
    },
    gameIsDone: function (arr1, arr2) {
      if (arr1.length !== arr2.length) return false
      for (let i = arr1.length; i--;) {
        if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) return false
      }
      return true
    },
    onPieceMoved: function (piece, newFreePosition) {
      this.moves++
      this.freePosition = newFreePosition
      this.shuffledPieces.map((item, i) => {
        if (item.number === piece.number) {
          item.position = piece.myPosition
        }
        return item
      })
      // check if game done
      if (newFreePosition === '22') {
        let currentGamePieces = this.shuffledPieces.slice(0)
        currentGamePieces = currentGamePieces.sort((a, b) => { return a.number > b.number })
        if (this.gameIsDone(this.winningPieces3x3, currentGamePieces)) {
          document.querySelector('.win').style.opacity = '1'
          document.querySelector('.win').style.zIndex = '1'
        }
      }
    }
  },
  data () {
    return {
      winningPieces3x3: [
        {number: 1, position: '00'},
        {number: 2, position: '01'},
        {number: 3, position: '02'},
        {number: 4, position: '10'},
        {number: 5, position: '11'},
        {number: 6, position: '12'},
        {number: 7, position: '20'},
        {number: 8, position: '21'}
      ],
      allPositions: ['00', '01', '02', '10', '11', '12', '20', '21', '22'],
      freePosition: '22',
      shuffledPieces: this.shuffle([
        {number: 1},
        {number: 2},
        {number: 3},
        {number: 4},
        {number: 5},
        {number: 6},
        {number: 7},
        {number: 8}
      ]).map((item, i) => {
        let allPos = ['00', '01', '02', '10', '11', '12', '20', '21']
        item.position = allPos[i]
        return item
      }),
      moves: 0,
      grid: '3'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.moves {
  text-align: center;
}
.taquin {
  width: 600px;
  height: 600px;
  display: grid;
  grid-gap: 10px;
  border: 1px solid #000;
  margin: 0 auto;
  padding: 10px;
  position: relative;
}
.win {
  position: absolute;
  font-size: 70px;
  color: green;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  opacity: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  transition: all 0.25s ease-in-out 0s; 
  z-index: -1;
}
</style>
