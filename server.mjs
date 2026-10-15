import http from 'node:http';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

// Safe bootstrap only. This process MUST NOT accept Forge invocation tokens.
// No customer data, Atlassian trust keys, remote secrets or privileged actions.
export function handleRequest(req,res) {
  res.setHeader('Cache-Control','no-store, max-age=0');
  res.setHeader('Content-Type','application/json; charset=utf-8');
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Referrer-Policy','no-referrer');
  res.setHeader('X-Frame-Options','DENY');
  res.setHeader('Content-Security-Policy',"default-src 'none'");
  if (req.method === 'GET' && req.url === '/healthz') {
    res.statusCode=200;
    return res.end(JSON.stringify({service:'staging-bootstrap',alive:true,ready:false,productionGo:false}));
  }
  res.statusCode=503;
  res.end(JSON.stringify({ready:false,productionGo:false,reason:'AUTHENTICATED_VERIFIER_NOT_DEPLOYED'}));
}
if(process.argv[1] && import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
  const port=Number(process.env.PORT || 10000);
  if(!Number.isSafeInteger(port)||port<1||port>65535) throw new Error('INVALID_PORT');
  http.createServer(handleRequest).listen(port,'0.0.0.0');
}
