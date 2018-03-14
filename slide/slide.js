import '@/slide/slide.css'
import $ from 'jquery'
function Slide (ele, options) {
  this.$ele = $(ele)
  this.options = $.extend({
    speed: 1000,
    delay: 3000
  }, options)
  this.states = [
    { '&zIndex': 1, top: 0, left: 134},
    { '&zIndex': 2, top: 0, left: 0},
    { '&zIndex': 4, top: 0, left: 76},
    { '&zIndex': 3, top: 0, left: 146},
    { '&zIndex': 2, top: 0, left: 620},
    { '&zIndex': 1, top: 0, left: 496}
  ]
  this.lis = this.$ele.find('li')
  this.interval
  this.$ele.find('section:nth-child(2)').on('click', function () {
    this.stop()
    this.next()
  }.bind(this))
  this.$ele.find('section:nth-child(1)').on('click', function () {
    this.stop()
    this.prev()
  }.bind(this))
  this.move()
  // this.play()
}
Slide.prototype = {
  move: function () {
    this.lis.each(function (i, el) {
      $(el)
                  .css('z-index', this.states[i]['&zIndex'])
                  .finish().animate(this.states[i], this.options.speed)
                  .find('img').css('opacity', this.states[i].$opacity)
    }.bind(this))
  },
  next: function () {
    this.states.unshift(this.states.pop())
    this.move()
  },
  prev: function () {
    this.states.push(this.states.shift())
    this.move()
  },
  play: function () {
    this.interval = setInterval(function () {
      this.next()
    }.bind(this), this.options.delay)
  },
  stop: function () {
    clearInterval(this.interval)
  }
}
export default Slide

