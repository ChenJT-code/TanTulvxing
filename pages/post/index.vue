<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <div>
        <PostList />
      </div>
    </el-row>
  </div>
</template>

<script>
import PostList from '@/components/post/postList'
export default {
  components: {
     PostList
  }
}
</script>

<style lang='less' scoped>
.container{
  width: 1000px;
  margin: 20px auto;
}

</style>
