<template>
  <div class="params">
    <h3 class="title">{{msg}}</h3>
    <div class="amap-wrapper">
      <el-amap
        class="amap-box"
        :vid="'amap-vue'"
        :plugin="plugin"
        :center="center"
        :zoom="zoom"
      >
        <el-amap-circle-marker
          v-for="(marker,index) in markers"
          :key='index'
          :center="marker.center"
          :radius="marker.radius"
          :fill-color="marker.fillColor"
          :fill-opacity="marker.fillOpacity"
          :events="marker.events"
        ></el-amap-circle-marker>
      </el-amap>
      <div class="toolbar">
        <span v-if="loaded">
          location: lng = {{ lng }} lat = {{ lat }}
        </span>
        <span v-else>正在定位...</span>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  data () {
    let self = this
    return {
      zoom: 12,
      msg: '陈十一向你问好',
      center: [113.422366, 23.131622],
      markers: [
        {
          center: [113.422366, 23.131622],
          radius: 6,
          fillOpacity: 1,
          fillColor: 'rgba(255,0,0,1)',
          events: {
            click: () => {
              alert('click')
            }
          }
        }
      ],
      lng: 0,
      lat: 0,
      loaded: false,
      plugin: [
        {
          pName: 'MapType',
          defaultType: 0,
          events: {
            init (instance) {
              console.log(instance)
            }
          }
        },
        {
          pName: 'OverView',
          events: {
            init (instance) {
              console.log(instance)
            }
          }
        },
        {
          pName: 'Scale',
          events: {
            init (instance) {
              console.log(instance)
            }
          }
        },
        {
          pName: 'ToolBar',
          events: {
            init (instance) {
              console.log(instance)
            }
          }
        },
        {
          pName: 'Geolocation',
          events: {
            init (o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.lng = result.position.lng
                  self.lat = result.position.lat
                  self.center = [self.lng, self.lat]
                  self.loaded = true
                  self.$nextTick()
                }
              })
            }
          }
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.tltle {
  font-size: 22px;
  font-weight: 700;
}
.amap-wrapper {
  width: 100%;
  height: 800px;
  margin-top: 10px;
}
</style>
