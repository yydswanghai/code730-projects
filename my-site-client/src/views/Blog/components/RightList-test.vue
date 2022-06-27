<template>
  <div class="test-container">
    <RightList :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./RightList";
export default {
  components: {
    RightList,
  },
  data(){
      return {
          list: [
              {name: 'a', isSelect: false},
              {name: 'b', isSelect: true, children: [
                  {name: 'b-1', isSelect: false},
                  {name: 'b-2', isSelect: false},
                  {name: 'b-3', isSelect: false, children: [
                       {name: 'b-3-1', isSelect: false},
                       {name: 'b-3-2', isSelect: false},
                  ]}
                  ]},
              {name: 'c', isSelect: false},
          ]
      }
  },
  methods: {
      handleSelect(item){
          console.log(item)
      }
  }
};
</script>

<style scoped>

</style>