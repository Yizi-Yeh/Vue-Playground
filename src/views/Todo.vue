<template>
  <div class="todo">
    <h1>This is an todo page</h1>
    <p>show:{{ filter }}</p>
    <p>show:{{ list }}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      filter: 'all'
    }
  },
  computed: {
    list () {
      return this.$store.getters.filterList(this.filter)
    }
  }
}
</script>
