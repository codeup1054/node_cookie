function test(i) {
    console.log('start', i)
    setTimeout(() => {
        console.log('timeout')
        console.log('end', i)
        i--
        if (i < 0) {
            return
        }
        test(i)
    }, 1000)
}
test(3);