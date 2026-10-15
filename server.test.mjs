import test from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:http';
import {handleRequest} from './server.mjs';
test('fail-closed staging bootstrap HTTP contract',async()=>{
 const srv=createServer(handleRequest);
 await new Promise(resolve=>srv.listen(0,'127.0.0.1',resolve));
 try{
  const root='http://127.0.0.1:'+srv.address().port;
  const cases=[['GET','/healthz',200],['GET','/readyz',503],['GET','/forge',503],
               ['POST','/forge',503],['POST','/provider',503],['GET','/unknown',503]];
  for(const [method,path,code] of cases){
   const r=await fetch(root+path,{method});
   assert.equal(r.status,code,method+path);
   const data=await r.json();
   assert.equal(data.productionGo,false);
   assert.equal(r.headers.get('cache-control'),'no-store, max-age=0');
  }
 }finally{await new Promise(resolve=>srv.close(resolve));}
});
