module.exports = {
    set(val = null) {
        this.timeout = val
    },

    setTimeout() {
        this.set(setTimeout.apply(null, arguments))
    },

    componentWillUnmount() {
        this.set()
    }
}