export default {
  mounted(el: any, binding: any) {
    console.log(el, binding)
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      if (entries[0].isIntersecting) {
        console.log('Intersecting observer')
        binding.value()
      }
    }
    const observer = new IntersectionObserver(callback, options)
    observer.observe(el)
  },
  name: 'intersection'
}
