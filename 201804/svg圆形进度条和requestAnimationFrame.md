##### svg 和 应用场景

使用svg模拟京东支付成功的动画进度效果。首先使用svg的circle画一个圆圈。然后改变circle的属性值

```html
<svg width="120px" height="120px" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <circle r="50" cy="60" cx="60" stroke-width="2" stroke-dasharray="314" stroke-  dashoffset="314"  stroke="darkturquoise" fill="none" class="circle">
    </circle>
</svg>
```

circle 画一个圆。cy 和 cx 是svg的 圆点的x轴和y轴。 Stroke-width 是 宽度。 **Storke-dasharray** 创建虚线。然后这里是无缝隙的314。 **stroke-dashoffset**是表示偏移量 相等时重叠 每小一点 进度条就加载一点。

因为这里是用原生js实现的动画 所以 直接贴代码

```javascript
;(function(win, doc, defined){
    	// 获取dom节点
		var circle = doc.querySelector('.circle');
		var circleLoad = doc.querySelector('.circle-load');

		var offset = 314;
		var stand = 15;

		function circleProgress() {
            // 修改offset属性的偏移量 达到加载的效果
			circle.setAttribute('stroke-dashoffset', offset);
			if (offset > stand) {
				offset -= 5;
                // 调用requesetAnimationFrame
				win.requestAnimationFrame(circleProgress);
			} else {
                // 这里是一个完成的对号表示效果
				circleLoad.className = 'circle-load circle-finish';
				win.cancelAnimationFrame(circleProgress);
			}
		}
		win.requestAnimationFrame(circleProgress);
	}(this, document));
```



至于vue的组件

```vue
<template>
  <div class="progress-circle">
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray"
              :stroke-dashoffset="dashOffset"/>
    </svg>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      radius: {
        type: Number,
        default: 100
      },
      // 父类的百分比
      precent: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        dashArray: Math.PI * 100
      };
    },
    computed: {
      // 实时计算offset
      dashOffset() {
        // dashoffset的偏移量 达到加载的效果
        return (1 - this.precent) * this.dashArray;
      }
    }
  };
</script>

<style>
  @import "~common/stylus/variable";
  .progress-circle
    position: relative
    circle
      stroke-width: 8px
      transform-origin: center
      &.progress-background
        transform: scale(0.9)
        stroke: $color-theme-d
      &.progress-bar
      	/* 这里是旋转角度 */
        transform: scale(0.9) rotate(-90deg)
        stroke: $color-theme
</style>
```





























