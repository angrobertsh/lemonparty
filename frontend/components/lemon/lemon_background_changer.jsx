import React from 'react';

const bgs = {
  0: 'lemon-bg-3',
  1: 'lemon-bg-3',
  2: 'lemon-bg-3',
  3: 'lemon-bg-3',
  4: 'lemon-bg-3',
  5: 'lemon-bg-6',
  6: 'lemon-bg-8',
  7: 'lemon-bg-8',
  8: 'lemon-bg-8',
  9: 'lemon-bg-8',
}

const bgClass = () => {
  const date = Date.now();
  const bg = bgs[date.toString()[date.toString().length-1]]
  return bg
}

const LemonBackgroundChanger = () => {
  return <div id="lemon-bg-changer" onClick={() => {
    document.getElementById("root").className = ""
    document.getElementById("root").classList.add(bgClass())
  }}/>
}

export default LemonBackgroundChanger;
