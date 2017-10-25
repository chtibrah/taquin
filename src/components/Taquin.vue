<template>
  <div class="main">
    <config @bgchanged="changePieceBackground" @gridchanged="gridChanged"></config>
    <div class="game-area">
      <div class="win">You Win!!!</div>
      <button class="start-game" @click="startGame">Start Game</button>
      <div class="moves">Moves: {{moves}}</div>
      <div class="taquin" :style="{
        gridTemplateColumns: 'repeat(' + grid + ', 1fr)',
        gridTemplateRows: 'repeat(' + grid + ', 1fr)',
        gridGap: gridGap}">
        <piece :myWidth="pieceWidth" 
          v-for="(piece, index) in shuffledPieces" 
          :myHeight="pieceHeight" 
          :factor="grid" 
          :key="index" 
          :number="piece.number" 
          :position="allPositions[index]" 
          :allPositions="allPositions" 
          :freePosition="freePosition" 
          :background="bgStyle"
          :gameStarts="gameStarts"
          @moved="onPieceMoved">
        </piece> 
      </div>
    </div>
  </div>
</template>

<script>
import piece from './Piece'
import config from './Config'

export default {
  name: 'Taquin',
  components: {piece, config},
  methods: {
    shuffle: function (a) {
      let j, x, i
      let b = a.slice(0)
      for (i = b.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = b[i]
        b[i] = b[j]
        b[j] = x
      }
      return b
    },
    gameIsDone: function (arr1, arr2) {
      console.log(arr1, arr2)
      let arr3 = arr2.slice(0)
      arr3.sort((a, b) => { return a.number > b.number ? 1 : (a.number < b.number ? -1 : 0) })
      if (arr1.length !== arr3.length) return false
      for (let i = arr1.length; i--;) {
        if (JSON.stringify(arr1[i]) !== JSON.stringify(arr3[i])) return false
      }
      this.gridGap = '0px'
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
      if (this.grid === 3 && newFreePosition === '22') {
        let currentGamePieces = this.shuffledPieces.slice(0)
        currentGamePieces = currentGamePieces.sort((a, b) => { return a.number > b.number })
        if (this.gameIsDone(this.winningPieces3x3, currentGamePieces)) {
          document.querySelector('.win').style.opacity = '1'
          document.querySelector('.win').style.zIndex = '1'
        }
      }
      if (this.grid === 4 && newFreePosition === '33') {
        let currentGamePieces = this.shuffledPieces.slice(0)
        currentGamePieces = currentGamePieces.sort((a, b) => { return a.number > b.number })
        if (this.gameIsDone(this.winningPieces4x4, currentGamePieces)) {
          document.querySelector('.win').style.opacity = '1'
          document.querySelector('.win').style.zIndex = '1'
        }
      }
    },
    changePieceBackground: function (background) {
      this.allPositions = this.grid === 3 ? this.allPositions3x3 : this.allPositions4x4
      this.freePosition = this.grid === 3 ? this.freePosition3x3 : this.freePosition4x4
      this.shuffledPieces = this.grid === 3 ? this.winningPieces3x3 : this.winningPieces4x4
      this.bgStyle = background
      this.gameStarts = false
    },
    gridChanged: function (newGrid) {
      this.grid = newGrid
      this.pieceWidth = parseInt(578 / newGrid)
      this.pieceHeight = parseInt(578 / newGrid)
      this.allPositions = newGrid === 3 ? this.allPositions3x3 : this.allPositions4x4
      this.freePosition = newGrid === 3 ? this.freePosition3x3 : this.freePosition4x4
      this.shuffledPieces = newGrid === 3 ? this.winningPieces3x3 : this.winningPieces4x4
      this.gameStarts = false
    },
    gameReset: function () {
      this.gameStarts = false
    },
    startGame: function () {
      if (this.grid === 3) {
        this.shuffledPieces = this.shuffle([
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
        })
      } else {
        this.shuffledPieces = this.shuffle([
          {number: 1},
          {number: 2},
          {number: 3},
          {number: 4},
          {number: 5},
          {number: 6},
          {number: 7},
          {number: 8},
          {number: 9},
          {number: 10},
          {number: 11},
          {number: 12},
          {number: 13},
          {number: 14},
          {number: 15}
        ]).map((item, i) => {
          let allPos = ['00', '01', '02', '03', '10', '11', '12', '13', '20', '21', '22', '23', '30', '31', '32']
          item.position = allPos[i]
          return item
        })
      }
      this.moves = 0
      this.gameStarts = true
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
      winningPieces4x4: [
        {number: 1, position: '00'},
        {number: 2, position: '01'},
        {number: 3, position: '02'},
        {number: 4, position: '03'},
        {number: 5, position: '10'},
        {number: 6, position: '11'},
        {number: 7, position: '12'},
        {number: 8, position: '13'},
        {number: 9, position: '20'},
        {number: 10, position: '21'},
        {number: 11, position: '22'},
        {number: 12, position: '23'},
        {number: 13, position: '30'},
        {number: 14, position: '31'},
        {number: 15, position: '32'}
      ],
      allPositions3x3: ['00', '01', '02', '10', '11', '12', '20', '21', '22'],
      allPositions4x4: ['00', '01', '02', '03', '10', '11', '12', '13', '20', '21', '22', '23', '30', '31', '32', '33'],
      freePosition3x3: '22',
      freePosition4x4: '33',
      freePosition: '',
      shuffledPieces: [],
      allPositions: [],
      moves: 0,
      grid: 3,
      gridGap: '1px',
      bgStyle: 'none',
      pieceWidth: 0,
      pieceHeight: 0,
      gameStarts: false
    }
  },
  mounted: function () {
    this.pieceWidth = parseInt(578 / this.grid)
    this.pieceHeight = parseInt(578 / this.grid)
    this.allPositions = this.grid === 3 ? this.allPositions3x3 : this.allPositions4x4
    this.shuffledPieces = this.grid === 3 ? this.winningPieces3x3 : this.winningPieces4x4
    this.freePosition = this.grid === 3 ? this.freePosition3x3 : this.freePosition4x4
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.main {
  position: relative;
  display: grid; 
  grid-template-columns: 1fr 2fr;
  align-items: center;
}
.start-game {
  background: none;
  border: 1px solid #718cd6;
  padding: 10px 10px;
  font-weight: bold;
  background-color: #88b1e4;
  color: #fff;
  font-size: 1.25em;
  cursor: pointer;
  outline: 0;
  &:hover {
    background-color: blue;
  }
}
.moves {
  text-align: center;
}
.taquin {
  width: 600px;
  height: 600px;
  display: grid;
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
