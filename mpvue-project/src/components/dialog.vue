<template>
  <div class="user-dialog-mask" >
    <div class="user-dialog-content">
      <div class="user-dialog-title">{{authInfo}}</div>
      <div class="user-dialog-foot">
        <div class="user-dialog-btn" catchtap="cancelDialog">取消</div>
        <button class="user-dialog-btn user-dialog-confirm" open-type="{{openType}}" bindtap="confirmDialog">查看</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dialog'
  }
</script>

<style scoped>

</style>
