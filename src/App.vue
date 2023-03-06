<template>
  <div class="box">你好啊！{{ greet }}</div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      greet: '你好',
    }
  },
}
</script>

<style>
.box {
  color: red;
}
</style>
