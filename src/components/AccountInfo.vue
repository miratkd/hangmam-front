<template>
  <div class="account-info-row">
    <span class="WHITE account-info-title">{{ title }}</span>
    <span class="DARK-NAVY account-info-value" :title="value">{{ value || '--' }}</span>
  </div>
</template>

<script>
export default {
  name: 'AccountInfo',
  props: {
    title: {
      type: String
    },
    value: {
      type: undefined
    }
  }
}
</script>

<style scoped>
.account-info-row{
  display: flex;
  flex-direction: column;
}
.account-info-title{
  text-align: center;
}

.account-info-value{
  background-color: white;
  border-radius: 8px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
span {
  width: 15vw;
}

/* Tablet */
@media screen and (max-width: 1050px ) and (orientation: Portrait), (max-width: 700) {
  span {
    width: 27.5vw;
  }
}

/* Mobile */
@media screen and (max-width: 500px) {
  span {
    width: 35vw;
  }
}
</style>
