(() => {
  var app = new Vue({
    el: '#app',
    data: {
      url: '',
      shortedUrl: null,
      error: null
    },
    methods: {
      short() {
        this.error = null
        this.shortedUrl = null
        if (this.url.length > 0) {
          axios.post('/new', {
            url: this.url
          }).then(res => {
            this.shortedUrl = res.data
          }).catch(err => {
            this.error = true
            console.log(err)
          })
        }
      },
      showShortedUrl(id) {
        return `${document.location.origin}/${id}`
      },
      reset() {
        this.url = ''
        this.shortedUrl = null
        this.error = null
      }
    }
  })
})()