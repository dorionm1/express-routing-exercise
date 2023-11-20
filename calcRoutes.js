const express = require('express');

const app = express();

app.listen(3000, function () {
  console.log('App on port 3000');
})

let nums = [2, 14, 64, 7, 38, 8, 64, 85, 83, 49, 13, 32, 9, 81, 55, 8, 3, 100, 11, 34, 17, 76, 36, 74, 78, 67, 2, 61, 6, 30, 71, 81, 40, 25, 68, 99, 51, 15, 59, 16, 15, 78, 5, 54, 36, 60, 93, 84, 66, 88, 43, 15, 39, 79, 37, 39, 46, 96, 69, 15, 64, 20, 25, 13, 66, 17, 16, 36, 7, 14, 86, 42, 86, 13, 10, 84, 87, 89, 57, 81, 100, 60, 16, 92, 59, 56, 86, 39, 33, 56, 65, 86, 55, 55, 14, 78, 85, 7, 70, 8]

app.get(`/mean/:nums`, function(req, res){

  const mean = nums.reduce((a, b) => a + b) / nums.length;
  return res.json({ response: {operation: 'mean', value: mean}})
})

app.get(`/median/:nums`, function(req, res){
  const sorted = Array.from(nums).sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return res.json({ response: {operation: 'median', value: (sorted[middle - 1] + sorted[middle]) / 2}})
  }
  return res.json({ response: {operation: 'median', value: sorted[middle]}})
})

app.get(`/mode/:nums`, function(req, res){
  const mode = nums => { if(nums.filter((x,index)=>nums.indexOf(x)==index).length == nums.length) return nums; else return mode(nums.sort((x,index)=>x-index).map((x,index)=>nums.indexOf(x)!=index ? x : null ).filter(x=>x!=null)) }
  
  const realMode = mode(nums)

  console.log(mode)
  return res.json({ response: {operation: 'mode', value: realMode}})
})

app.get('/all/:nums', function(req, res){
  const mean = nums.reduce((a, b) => a + b) / nums.length;
  const sorted = Array.from(nums).sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  let median;
  const mode = nums => { if(nums.filter((x,index)=>nums.indexOf(x)==index).length == nums.length) return nums; else return mode(nums.sort((x,index)=>x-index).map((x,index)=>nums.indexOf(x)!=index ? x : null ).filter(x=>x!=null)) }
  const realMode = mode(nums)

  console.log(sorted)
  console.log(middle)

  if (sorted.length % 2 === 0) {
    median = (sorted[middle - 1] + sorted[middle]) / 2
  } else {
  median = sorted[middle]
  }
  return res.json({ response: {operation: 'all', mean: mean, median: median, mode: realMode}})
})