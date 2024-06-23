let removeElement = (nums, val) => {
    let k = 0
    let i = 0
   
   while(i < nums.length) {
       if(nums[i] === val) {
           nums.splice(i, 1)
       }
       else {
           k++
           i++
       }
   }
   return k
}
