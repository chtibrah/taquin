<template>
    <div class="piece" 
        ref="thisPiece" 
        :style="{'background': 'url(' + background + ') no-repeat ' + myPosX + ' ' + myPosY + ' rgba(0,0,0,0.4)'}"
        @click="movePiece">
      <span v-if="background === 'none'">{{number}}</span>
    </div>
</template>

<script>
export default {
  name: 'piece',
  props: ['background', 'number', 'position', 'allPositions', 'freePosition', 'myWidth', 'myHeight', 'factor'],
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
        this.$refs.thisPiece.style.setProperty('--moveX', currentPosX + (moveX * (this.myWidth + 1)) + 'px')
        this.$refs.thisPiece.style.setProperty('--moveY', currentPosY + (moveY * (this.myHeight + 1)) + 'px')
        this.myPosition = this.freePosition
        this.$emit('moved', this, currentPosition)
      }
    },
    setBackgroundPostions: function () {
      this.myPosX = (-this.myWidth * ((this.number - 1) % this.gridFactor)) + 'px'
      this.myPosY = -(Math.floor((this.number - 1) / this.gridFactor) * this.myHeight) + 'px'
    }
  },
  data () {
    return {
      myPosition: this.position,
      gridFactor: this.factor,
      myPosX: '0px',
      myPosY: '0px',
      baseStyles: {
        '--moveX': '0px',
        '--moveY': '0px'
      }
    }
  },
  beforeMount: function () {
    this.myPosX = (-this.myWidth * ((this.number - 1) % this.factor)) + 'px'
    this.myPosY = -(Math.floor((this.number - 1) / this.factor) * this.myHeight) + 'px'
  },
  watch: {
    position: function () {
      this.myPosition = this.position
    },
    factor: function () {
      this.gridFactor = this.factor
      this.myPosX = (-this.myWidth * ((this.number - 1) % this.gridFactor)) + 'px'
      this.myPosY = -(Math.floor((this.number - 1) / this.factor) * this.myHeight) + 'px'
      // css translate reset
      this.$el.style.setProperty('--moveX', '0px')
      this.$el.style.setProperty('--moveY', '0px')
      this.myPosition = this.position
    },
    background: function () {
      this.gridFactor = this.factor
      this.myPosX = (-this.myWidth * ((this.number - 1) % this.gridFactor)) + 'px'
      this.myPosY = -(Math.floor((this.number - 1) / this.factor) * this.myHeight) + 'px'
      // css translate reset
      this.$el.style.setProperty('--moveX', '0px')
      this.$el.style.setProperty('--moveY', '0px')
      this.myPosition = this.position
    },
    myWidth: function () {
      this.myPosX = (-this.myWidth * ((this.number - 1) % this.factor)) + 'px'
    },
    myHeight: function () {
      this.myPosY = -(Math.floor((this.number - 1) / this.factor) * this.myHeight) + 'px'
    },
    number: function () {
      this.myPosX = (-this.myWidth * ((this.number - 1) % this.factor)) + 'px'
      this.myPosY = -(Math.floor((this.number - 1) / this.factor) * this.myHeight) + 'px'
    }
  }

}
</script>

<<style lang="less" scoped>
.piece {
  --moveX: 0;
  --moveY: 0;
  background-color: orange;
  border: 1px solid #c7c7c7;
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


