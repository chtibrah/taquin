<template>
    <div class="piece" @click="movePiece" ref="thisPiece">
      <span>{{nbr}}</span>
      <pre>
        number: {{nbr}}
        mypPosition: {{myPosition}}
      </pre>
    </div>
</template>

<script>
export default {
  name: 'piece',
  props: ['number', 'position', 'allPositions', 'freePosition'],
  methods: {
    getPossiblePositions: function () {
      let positionArray = [...this.myPosition]
      let possiblePositions = []
      possiblePositions[0] = (+positionArray[0] - 1) + positionArray[1]
      possiblePositions[1] = (+positionArray[0] + 1) + positionArray[1]
      possiblePositions[2] = positionArray[0] + (+positionArray[1] - 1)
      possiblePositions[3] = positionArray[0] + (+positionArray[1] + 1)
      return possiblePositions.filter((item) => { return this.allPositions.indexOf(item) !== -1 })
    },
    movePiece: function () {
      let possiblePositions = this.getPossiblePositions()
      let currentPosition = this.myPosition
      if (possiblePositions.indexOf(this.freePosition) !== -1) {
        let moveX = +([...this.freePosition][1]) - +([...currentPosition][1])
        let moveY = +([...this.freePosition][0]) - +([...currentPosition][0])
        let currentPosX = parseInt(window.getComputedStyle(this.$refs.thisPiece).getPropertyValue('--moveX'), 10)
        let currentPosY = parseInt(window.getComputedStyle(this.$refs.thisPiece).getPropertyValue('--moveY'), 10)
        this.$refs.thisPiece.style.setProperty('--moveX', currentPosX + (moveX * 203) + 'px')
        this.$refs.thisPiece.style.setProperty('--moveY', currentPosY + (moveY * 203) + 'px')
        this.myPosition = this.freePosition
        this.$emit('moved', this, currentPosition)
      }
    }
  },
  data () {
    return {
      nbr: this.number,
      myPosition: this.position
    }
  }
}
</script>

<<style lang="less" scoped>
.piece {
  --moveX: 0;
  --moveY: 0;
  border: 1px solid grey;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  transform: translate3d(var(--moveX), var(--moveY), 0);
  transition: transform 0.15s ease-in-out 0s;
  cursor: pointer;
  pre {
    display: block;
    font-size: 10px;
  }
}
</style>


