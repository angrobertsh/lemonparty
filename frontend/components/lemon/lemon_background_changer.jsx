import React from 'react';

const bgs = {
  0: 'lemon-bg-8',
  1: 'lemon-bg-9',
  2: 'lemon-bg-7',
  3: 'lemon-bg-6',
  4: 'lemon-bg-6',
  5: 'lemon-bg-5',
  6: 'lemon-bg-4',
  7: 'lemon-bg-3',
  8: 'lemon-bg-2',
  9: 'lemon-bg-1',
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
