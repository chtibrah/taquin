<template>
    <div class="piece" @click="movePiece">
      <span>{{nbr}}</span>
    </div>
</template>

<script>
export default {
  name: 'piece',
  props: ['number', 'position', 'allPositions'],
  methods: {
    getFreePositions: function () {
      let positionArray = [...this.position]
      let possiblePositions = []
      possiblePositions[0] = +positionArray[0] - 1 + positionArray[1]
      possiblePositions[1] = +positionArray[0] + 1 + positionArray[1]
      possiblePositions[2] = positionArray[0] + (+positionArray[1] - 1)
      possiblePositions[3] = positionArray[0] + (+positionArray[1] + 1)
      console.log(this.position)
      console.log(possiblePositions.filter((item) => { return this.allPositions.indexOf(item) !== -1 }))
    },
    movePiece: function () {
      this.getFreePositions()
      this.myPosition = '22'
      this.$emit('moved', this.myPosition)
      // this.$el.className += ' moved'
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
  border: 1px solid grey;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  transform: translate3d(0,0,0);
  transition: transform 0.25s ease-in-out 0s;
  cursor: pointer;
  &.moved {
    transform: translateX(203px);
  }
}
</style>


