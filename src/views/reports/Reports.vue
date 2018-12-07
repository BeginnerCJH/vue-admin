<template>
    <div class="reports">
        数据统计

    </div>
</template>

<script>
import {getReportsPie} from '@/api'

export default {
  mounted () {
    getReportsPie(123).then(results => {
      console.log(results)
    })
  },
  methods: {

  }
}
</script>

<style>

</style>
