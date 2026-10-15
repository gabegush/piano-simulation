(()=>{
'use strict';
// Only positions interpolate. Held notes and geometric contacts remain sampled.
window.PIANO_TIP_VIEW={sample(frame){const data=window.PIANO_TIPS;if(!data?.rows?.length)return null;let lo=0,hi=data.rows.length;while(lo<hi){const mid=(lo+hi)>>1;if(data.rows[mid].f<=frame)lo=mid+1;else hi=mid;}const index=Math.max(0,lo-1),a=data.rows[index],b=data.rows[Math.min(index+1,data.rows.length-1)],u=a.s===b.s&&b.f>a.f?Math.max(0,Math.min(1,(frame-a.f)/(b.f-a.f))):0;return{frame:a.f,source:a.s,keys:data.sources[a.s].keys,bounds:data.projectionBounds,kz:a.kz,interpolated:u>0&&u<1,digits:a.d.map((digit,i)=>({...digit,p:digit.p.map((v,k)=>v+(b.d[i].p[k]-v)*u)}))};}};
})();
