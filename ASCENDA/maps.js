// Coordinates refer to the approved 1536 × 1024 artwork, in world pixels.
// Navigation is a union of floor polygons minus furniture and solid walls.
const R=(x,y,w,h)=>[[x,y],[x+w,y],[x+w,y+h],[x,y+h]];
const COMMON_FLOOR=[R(440,270,145,485),R(940,270,150,475),R(515,110,370,170),R(405,690,700,65),R(335,870,780,90),R(435,730,180,160),R(920,725,170,180),R(635,730,270,220)];
const MAPS=[
 {asset:'fachada',name:'Área externa',spawn:[700,830],entry:[812,673],exit:null,lift:null,npcs:{},walk:[[[105,790],[565,650],[785,600],[970,625],[1395,500],[1510,620],[1440,775],[830,1005],[465,1005]]],solid:[R(645,650,100,88),R(922,610,90,65),R(1080,630,95,88),R(744,735,105,110),R(480,825,100,115),R(110,740,310,105)],occlude:[]},
 {asset:'terreo',name:'Térreo · Pessoas e negócio',spawn:[800,887],entry:null,exit:[770,850],lift:[1205,475],npcs:{recepcao:[952,520],rh:[400,282],financeiro:[1248,270],comercial:[346,620]},
  walk:[...COMMON_FLOOR,R(465,455,610,290),R(100,110,425,188),R(895,110,450,185),R(80,395,330,260),R(390,590,80,58),R(1100,650,330,165),R(1050,460,95,280),R(1090,420,220,110),R(1305,320,90,260)],
  solid:[R(158,155,215,94),R(404,184,95,66),R(437,100,66,80),R(970,160,276,92),R(1250,90,80,95),R(1120,110,120,40),R(110,455,237,107),R(130,572,155,65),R(652,422,235,98),R(593,535,55,154),R(891,536,62,153),R(707,566,124,107),R(1155,744,165,68),R(1122,661,240,60),R(615,268,302,154)],
  occlude:[{rect:[52,258,380,58],line:310},{rect:[905,262,427,58],line:314},{rect:[50,650,365,60],line:702},{rect:[1115,805,340,60],line:858}]},
 {asset:'andar1',name:'1º andar · Operações',spawn:[1020,520],entry:null,exit:null,lift:[1205,485],npcs:{soc:[480,319],intel:[1268,278],infra:[360,683],grc:[1380,786]},
  walk:[...COMMON_FLOOR,R(455,455,625,270),R(110,110,425,240),R(900,110,445,200),R(65,419,335,300),R(375,665,100,50),R(1110,650,325,190),R(1070,778,90,40),R(1080,430,230,110),R(1050,470,90,270),R(1315,325,80,245)],
  solid:[R(175,164,335,82),R(168,257,283,78),R(95,205,60,60),R(952,170,200,85),R(1223,197,120,70),R(1220,98,95,85),R(128,466,98,189),R(260,460,110,193),R(615,270,300,180),R(655,490,225,138),R(1160,676,266,94),R(1158,751,130,60),R(90,420,270,35)],
  occlude:[{rect:[52,300,385,63],line:355},{rect:[947,275,380,54],line:320},{rect:[51,655,348,65],line:711},{rect:[1128,810,333,58],line:862}]},
 {asset:'andar2',name:'2º andar · Inovação',spawn:[1033,528],entry:null,exit:null,lift:[1205,485],mentor:[881,525],npcs:{appsec:[482,278],cloud:[1280,288],red:[330,690],direcao:[1400,850]},
  walk:[...COMMON_FLOOR,R(465,565,620,175),R(120,110,405,190),R(905,110,430,210),R(65,420,358,295),R(395,660,90,65),R(1030,700,410,175),R(1080,430,230,110),R(1050,480,90,270),R(1315,325,80,245),R(595,422,340,168)],
  solid:[R(181,155,280,90),R(338,242,118,37),R(965,155,295,95),R(1235,236,108,41),R(111,474,242,94),R(125,608,225,64),R(1161,734,168,96),R(1040,803,82,61),R(598,341,70,100),R(627,427,272,80),R(679,536,169,57),R(565,272,397,45),R(558,316,27,260),R(939,316,26,260)],
  occlude:[{rect:[64,291,383,55],line:337},{rect:[950,275,375,55],line:325},{rect:[51,707,372,42],line:744},{rect:[1032,869,420,55],line:916}]}
];
// Architectural barriers are independent of the floor patches. Only explicit door
// gaps connect the rooms; the same swept collider is used by keyboard and routing.
const HWall=(y,a,b)=>[a,y,b,y,7],VWall=(x,a,b)=>[x,a,x,b,7];
MAPS[0].walls=[[550,730,965,582,9],[965,582,1415,505,9]];
MAPS[0].doors=[];
MAPS[1].npcs.rh=[400,270];MAPS[1].spawn=[790,705];MAPS[1].exit=[772,763];
MAPS[1].walls=[HWall(286,45,430),VWall(525,65,250),HWall(286,880,968),HWall(286,1048,1385),VWall(885,55,286),[421,310,394,575,8],[388,650,380,720,8],HWall(677,30,387),VWall(1085,295,440),VWall(1085,530,600),HWall(561,1085,1355),VWall(1105,595,716),VWall(1105,790,875),HWall(845,1110,1450),HWall(760,335,714),HWall(760,834,1095),HWall(932,190,1380)];
MAPS[1].doors=[{x:1008,y:286,axis:'h',size:80},{x:392,y:610,axis:'v',size:68},{x:1105,y:752,axis:'v',size:72}];
MAPS[1].walk.push(R(1050,712,115,84),R(714,705,120,90));
MAPS[2].walls=[HWall(340,45,460),VWall(545,55,270),HWall(310,880,975),HWall(310,1055,1385),VWall(885,55,310),VWall(425,350,647),VWall(425,717,760),HWall(705,45,400),VWall(1085,295,440),VWall(1085,530,585),HWall(561,1085,1218),HWall(561,1288,1355),VWall(1100,595,885),HWall(635,1100,1218),HWall(635,1288,1460),HWall(843,1100,1460),HWall(760,335,1115),HWall(932,190,1380)];
MAPS[2].doors=[{x:1015,y:310,axis:'h',size:80},{x:425,y:682,axis:'v',size:68},{x:1253,y:561,axis:'h',size:68},{x:1253,y:635,axis:'h',size:68}];
MAPS[2].walk.push(R(1210,510,90,160),R(1210,610,90,100));
MAPS[3].walls=[HWall(320,65,440),VWall(545,55,250),HWall(312,890,980),HWall(312,1060,1385),VWall(885,55,312),[445,335,423,650,8],[417,725,410,760,8],HWall(730,45,418),VWall(1085,295,440),VWall(1085,530,600),HWall(561,1085,1355),VWall(1030,615,703),VWall(1030,767,905),HWall(900,1030,1465),HWall(760,335,1010),HWall(932,190,1380)];
MAPS[3].doors=[{x:1020,y:312,axis:'h',size:80},{x:420,y:687,axis:'v',size:72},{x:1030,y:735,axis:'v',size:62}];
for(let f=1;f<4;f++)MAPS[f].solid.push(R(1330,325,150,250));
function segmentDistance(x,y,ax,ay,bx,by){const dx=bx-ax,dy=by-ay,len=dx*dx+dy*dy,t=len?Math.max(0,Math.min(1,((x-ax)*dx+(y-ay)*dy)/len)):0;return Math.hypot(x-ax-t*dx,y-ay-t*dy)}
function pointInPolygon(x,y,p){let inside=false;for(let i=0,j=p.length-1;i<p.length;j=i++){const a=p[i],b=p[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])inside=!inside}return inside}
function walkable(f,x,y,radius=8){const m=MAPS[f];if(!m||!Number.isFinite(x)||!Number.isFinite(y))return false;if((m.walls||[]).some(([ax,ay,bx,by,w])=>segmentDistance(x,y,ax,ay,bx,by)<radius+w/2))return false;return [[0,0],[-radius,0],[radius,0],[0,-radius],[0,radius],[-radius*.7,-radius*.7],[radius*.7,-radius*.7],[-radius*.7,radius*.7],[radius*.7,radius*.7]].every(([dx,dy])=>m.walk.some(p=>pointInPolygon(x+dx,y+dy,p))&&!m.solid.some(p=>pointInPolygon(x+dx,y+dy,p)))}
function canTravel(f,ax,ay,bx,by){const n=Math.max(1,Math.ceil(Math.hypot(bx-ax,by-ay)/3));for(let i=0;i<=n;i++)if(!walkable(f,ax+(bx-ax)*i/n,ay+(by-ay)*i/n,8))return false;return true}
const NAV_CELL=12,NAV_W=128,NAV_H=86,NAV_CACHE=new Map();
function navigation(f){if(NAV_CACHE.has(f))return NAV_CACHE.get(f);const grid=new Uint8Array(NAV_W*NAV_H);for(let y=0;y<NAV_H;y++)for(let x=0;x<NAV_W;x++)grid[y*NAV_W+x]=walkable(f,x*NAV_CELL+6,y*NAV_CELL+6,8)?1:0;NAV_CACHE.set(f,grid);return grid}
function nearestCell(f,x,y,maxRadius=15){const grid=navigation(f),cx=Math.floor(x/NAV_CELL),cy=Math.floor(y/NAV_CELL);for(let r=0;r<=maxRadius;r++){let best=null,dist=Infinity;for(let yy=cy-r;yy<=cy+r;yy++)for(let xx=cx-r;xx<=cx+r;xx++){if(xx<0||yy<0||xx>=NAV_W||yy>=NAV_H||!grid[yy*NAV_W+xx])continue;const d=(xx*NAV_CELL+6-x)**2+(yy*NAV_CELL+6-y)**2;if(d<dist){best=yy*NAV_W+xx;dist=d}}if(best!==null)return best}return null}
const NAV_DIRS=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]],NAV_LINKS=new Map();
function navigationLinks(f){if(NAV_LINKS.has(f))return NAV_LINKS.get(f);const grid=navigation(f),links=new Uint8Array(grid.length);for(let id=0;id<grid.length;id++){if(!grid[id])continue;const x=id%NAV_W,y=Math.floor(id/NAV_W);NAV_DIRS.forEach(([dx,dy],k)=>{const xx=x+dx,yy=y+dy;if(xx<0||yy<0||xx>=NAV_W||yy>=NAV_H||!grid[yy*NAV_W+xx])return;if(dx&&dy&&(!grid[y*NAV_W+xx]||!grid[yy*NAV_W+x]))return;if(walkable(f,(x+xx)*6+6,(y+yy)*6+6,8))links[id]|=1<<k})}NAV_LINKS.set(f,links);return links}
function smoothRoute(f,sx,sy,points){const out=[];let anchor={x:sx,y:sy},i=0;while(i<points.length){let next=i;for(let j=i+1;j<Math.min(points.length,i+24);j++){if(!canTravel(f,anchor.x,anchor.y,points[j].x,points[j].y))break;next=j}out.push(points[next]);anchor=points[next];i=next+1}return out}
function findPath(f,sx,sy,tx,ty){const grid=navigation(f),start=nearestCell(f,sx,sy,4),end=nearestCell(f,tx,ty,7);if(start===null||end===null)return [];const first={x:start%NAV_W*12+6,y:Math.floor(start/NAV_W)*12+6};if(!canTravel(f,sx,sy,first.x,first.y))return [];const links=navigationLinks(f),parent=new Int32Array(grid.length).fill(-1),queue=[start];parent[start]=start;let head=0;while(head<queue.length){const id=queue[head++];if(id===end)break;for(let k=0;k<8;k++){if(!(links[id]&(1<<k)))continue;const [dx,dy]=NAV_DIRS[k],next=id+dy*NAV_W+dx;if(parent[next]!==-1)continue;parent[next]=id;queue.push(next)}}if(parent[end]===-1)return [];const result=[];for(let id=end;id!==start;id=parent[id])result.push({x:id%NAV_W*12+6,y:Math.floor(id/NAV_W)*12+6});result.push(first);result.reverse();return smoothRoute(f,sx,sy,result)}
function reachableTarget(f,sx,sy,tx,ty,range=65){const candidates=[];for(let dy=-range;dy<=range;dy+=18)for(let dx=-range;dx<=range;dx+=18){const distance=Math.hypot(dx,dy);if(distance<=range&&walkable(f,tx+dx,ty+dy)&&canTravel(f,tx+dx,ty+dy,tx,ty))candidates.push({x:tx+dx,y:ty+dy,distance})}candidates.sort((a,b)=>a.distance-b.distance);for(const p of candidates){const path=findPath(f,sx,sy,p.x,p.y);if(path.length)return {...p,path}}return null}
