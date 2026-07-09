function tutorial(){
element("style").textContent=".tut-pointer,.tut-message{position:fixed;z-index:2;} .tut-message{padding:1rem;}"
let ci=0,p,song,clicks,m=element("button",document.body,"tut-message","Click here to watch a 25 second tutorial"); addEventListener("click",e=>{m.remove();if(e.target==m)init();},{once:true});
function init(){p=element("div",document.body,"tut-pointer","👉");p.style.transition="transform .1s ease";initSong();initClicks();move();}
function move(){if(ci>=clicks.length)return p.remove();let e=clicks[ci++]();let r=e.getBoundingClientRect();p.style.top=r.top;p.style.left=r.left;click(e);}
function click(e){setTimeout(()=>{p.style.transform="scale(.5)";e.click();setTimeout(()=>{p.style.transform="";setTimeout(move,100);},100);},100);}
function make(clickon,c,r){return ()=>clickon.cells.find(x=>x.row==r&&x.col==c);}
function toggle(c,r){return Array(2).fill(0).flatMap(()=>[make(sequencer,c,-1),make(sequencer,-1,r)]);}
function initClicks(){let notes=new Map();
  let sequencerclicks=song.flatMap((t,c)=>t[0].flatMap((pid,r)=>(notes.set(c+"-"+pid,{c,r,a:t[1][pid-1]}),Array(pid).fill(0).map(()=>make(sequencer,c,r)))));
  let pianoclicks=[...notes.values()].flatMap(({c,r,a})=>toggle(c,r).toSpliced(2,0,...a.flatMap((n,r)=>n?[make(piano,n-123,r)]:[])));
  clicks=[...sequencerclicks,...pianoclicks,make(sequencer,-1,-1)];
}
function initSong(){song=[
  [[1,1,1,1],[[123,,,,123,,,,123,,,,123,,,,123,,,,123,,,,123,,,,123]]],
  [[1,1,1,1],[[,,124,,,,,,,,,,,,124,,124]]],
  [[1,1,2,3],[[135,,,,,,,,159,,157,,159,,,,,,,,,,,,147,154,,159],[138,,,,,,,,150,,159,,162,,,,,,,,,,150,,162,150,,159],[149,,,,,,,,149,,150,,154,,,,,,,,,,,,147,157,,159]]]];
}
}
tutorial();
