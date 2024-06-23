let majorityElement = (nums) => {
    let result = null
    let count = 0

    nums.forEach((num) => {
        if(count === 0) {
        result = num
        }

        if(num === result) {
            count++
        }
        else {
            count--
        }
    })

    return result
}