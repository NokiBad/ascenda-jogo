// Sistema de partículas leve para efeitos visuais na ASCENDA.
// Sem dependências externas — Canvas 2D puro.
const Particles=(function(){
  const particles=[];
  let ctx=null;
  function init(canvasContext){ctx=canvasContext;}
  function spawn(x,y,color,count=12){
    for(let i=0;i<count;i++){
      const angle=Math.random()*Math.PI*2;
      const speed=Math.random()*2+1;
      particles.push({
        x,y,
        vx:Math.cos(angle)*speed,
        vy:Math.sin(angle)*speed,
        life:1.0,
        decay:Math.random()*0.02+0.015,
        color:color||'#7bf5cd',
        size:Math.random()*3+2
      });
    }
  }
  function update(){
    for(let i=particles.length-1;i>=0;i--){
      const p=particles[i];
      p.x+=p.vx;p.y+=p.vy;
      p.vy+=0.05; // gravidade leve
      p.life-=p.decay;
      if(p.life<=0)particles.splice(i,1);
    }
  }
  function draw(){
    if(!ctx)return;
    ctx.save();
    ctx.globalCompositeOperation='lighter';
    for(const p of particles){
      ctx.globalAlpha=Math.max(0,p.life);
      ctx.fillStyle=p.color;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
      ctx.fill();
    }
    ctx.restore();
  }
  return {init,spawn,update,draw};
})();
