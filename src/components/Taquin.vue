<template>
  <div class="main">
    <div class="config">
      <gridconfig  @gridchanged="gridChanged"></gridconfig>
      <pictureconfig @bgchanged="changePieceBackground"></pictureconfig>
    </div>
    <div class="game-area">
      <modal :moves="moves" @reset="resetGame"></modal>
      <button class="start-game" @click="startGame">Start Game</button>
      <div class="moves">Moves: {{moves}}</div>
      <div class="taquin" :style="{
        gridTemplateColumns: 'repeat(' + grid + ', 1fr)',
        gridTemplateRows: 'repeat(' + grid + ', 1fr)',
        gridGap: gridGap}">
        <div class="game-starter"
          v-show="gameStarts !== true"
          :style="grid === 3 ? {'backgroundColor': 'rgba(103, 58, 183, 0.3)'} : {'backgroundColor': 'rgba(57, 106, 221, 0.3)'}">
        </div>
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
import gridconfig from './GridConfig'
import pictureconfig from './PictureConfig'
import modal from './Modal'

export default {
  name: 'Taquin',
  components: {piece, gridconfig, pictureconfig, modal},
  methods: {
    getPositions: function (factor) {
      let allPos = []
      for (let i = 0; i < (factor * factor); i++) {
        let x = Math.floor(i / factor)
        let y = i % factor
        allPos.push(x + '' + y)
      }
      return allPos
    },
    getPossibleMoves: function (position, allPos) {
      let positionArray = [...position]
      let possiblePositions = []
      possiblePositions[0] = (+positionArray[0] - 1) + positionArray[1]
      possiblePositions[1] = (+positionArray[0] + 1) + positionArray[1]
      possiblePositions[2] = positionArray[0] + (+positionArray[1] - 1)
      possiblePositions[3] = positionArray[0] + (+positionArray[1] + 1)
      return possiblePositions.filter((item) => { return allPos.indexOf(item) !== -1 })
    },
    getReversedMove: function (move) {
      return move.split('-').reverse().join('-')
    },
    chooseRandomMove: function (arr) {
      let j = Math.floor(Math.random() * ((arr.length - 1) + 1))
      if (this.freePosition === arr[j] ||
        this.randomMoves.indexOf(this.getReversedMove(this.freePosition + '-' + arr[j])) !== -1 ||
        this.randomMoves.indexOf(this.freePosition + '-' + arr[j]) !== -1) {
        j = Math.floor(Math.random() * ((arr.length - 1) + 1))
      }
      this.randomMoves.push(this.freePosition + '-' + arr[j])
      this.freePosition = arr[j]
      return arr[j]
    },
    shuffle: function (arr) {
      arr.some((item) => {
        let piecePosition = item.split('-')[1]
        for (let prop of this.shuffledPieces) {
          if (prop.position === piecePosition) {
            prop.position = item.split('-')[0]
            break
          }
        }
      })
      return this.shuffledPieces
    },
    gameIsDone: function (arr1, arr2) {
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
      let currentGamePieces = this.shuffledPieces.slice(0)
      currentGamePieces = currentGamePieces.sort((a, b) => { return a.number > b.number })
      if (this.gameIsDone(this.winningPieces, currentGamePieces)) {
        document.querySelector('.backdrop').style.opacity = '1'
        document.querySelector('.backdrop').style.zIndex = '1'
      }
    },
    changePieceBackground: function (background) {
      this.freePosition = this.allPositions[this.allPositions.length - 1]
      this.shuffledPieces = this.cloneArray(this.winningPieces)
      this.bgStyle = background
      this.gameStarts = false
      this.randomMoves = []
    },
    gridChanged: function (newGrid) {
      this.grid = newGrid
      this.pieceWidth = parseInt(578 / newGrid)
      this.pieceHeight = parseInt(578 / newGrid)
      this.gameStarts = false
      this.randomMoves = []
    },
    resetGame: function () {
      this.gameStarts = false
      this.moves = 0
    },
    startGame: function () {
      this.randomMoves = []
      let possibleMoves = this.getPossibleMoves(this.freePosition, this.allPositions)
      let count = 0
      do {
        this.chooseRandomMove(possibleMoves)
        possibleMoves = this.getPossibleMoves(this.freePosition, this.allPositions)
        count++
      } while (count < 10 || this.freePosition !== this.firstFreePosition)
      // sort shuffled array over positions
      this.shuffledPieces = this.shuffle(this.randomMoves).sort(function (a, b) { return (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0) })
      this.moves = 0
      this.gameStarts = true
    },
    cloneArray: function (inputArr) {
      return JSON.parse(JSON.stringify(inputArr))
    },
    calcAllPositions: function () {
      let result = []
      for (let i = 0; i < (this.grid * this.grid); i++) {
        let x = Math.floor(i / this.grid)
        let y = i % this.grid
        result.push(x + '' + y)
      }
      return result
    },
    calcWinningPieces: function () {
      let result = []
      for (let i = 0; i < (this.grid * this.grid); i++) {
        let x = Math.floor(i / this.grid)
        let y = i % this.grid
        result.push({'number': i + 1, 'position': x + '' + y})
      }
      result.pop()
      return result
    }
  },
  data () {
    return {
      firstFreePosition: '',
      freePosition: '',
      shuffledPieces: [],
      allPositions: [],
      moves: 0,
      grid: 3,
      gridGap: '1px',
      bgStyle: 'none',
      pieceWidth: 0,
      pieceHeight: 0,
      gameStarts: false,
      randomMoves: [],
      winningPieces: []
    }
  },
  mounted: function () {
    this.pieceWidth = parseInt(578 / this.grid)
    this.pieceHeight = parseInt(578 / this.grid)
    this.allPositions = this.calcAllPositions()
    this.winningPieces = this.calcWinningPieces()
    this.shuffledPieces = this.cloneArray(this.winningPieces)
    this.freePosition = this.allPositions[this.allPositions.length - 1]
    this.firstFreePosition = this.freePosition
  },
  watch: {
    grid: function () {
      this.allPositions = this.calcAllPositions()
      this.winningPieces = this.calcWinningPieces()
      this.freePosition = this.allPositions[this.allPositions.length - 1]
      this.shuffledPieces = this.cloneArray(this.winningPieces)
      this.firstFreePosition = this.freePosition
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.main {
  height: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 2fr;
  .config {
    align-self: center;
  }
}
.start-game {
  border: 1px solid #bab1ec;
  padding: 10px 10px;
  font-weight: bold;
  background-color: #396add;
  color: #fff;
  font-size: 1.25em;
  cursor: pointer;
  outline: 0;
  margin: 1em 0;
  &:hover {
    background-color: darken(#396add, 10%);
  }
}
.moves {
  text-align: center;
  margin: 1em 0;
  font-weight: 700;
}
.taquin {
  flex: 1 1 auto;
  width: 600px;
  height: 600px;
  display: grid;
  border: 1px solid #000;
  margin: 0 auto;
  padding: 10px;
  position: relative;
  .game-starter {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    cursor: not-allowed;
  }
}
</style>
