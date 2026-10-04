import http from 'node:http';import fs from 'node:fs/promises';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../docs'),base='/AX_Challenger_2026/';
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.ttf':'font/ttf','.png':'image/png','.webm':'video/webm','.vtt':'text/vtt; charset=utf-8','.csv':'text/csv; charset=utf-8','.docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document','.pptx':'application/vnd.openxmlformats-officedocument.presentationml.presentation'};
http.createServer(async(req,res)=>{try{
 let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 if(!pathname.startsWith(base)){res.writeHead(404);res.end('Not found');return}
 let file=path.resolve(root,pathname.slice(base.length)||'index.html');if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return}
 let data=await fs.readFile(file),range=/bytes=(\d+)-(\d*)/.exec(req.headers.range||'');
 const headers={'Content-Type':types[path.extname(file)]||'application/octet-stream','Accept-Ranges':'bytes','Cache-Control':'no-cache'};
 if(range){let start=+range[1],end=range[2]?Math.min(+range[2],data.length-1):data.length-1;if(start>end){res.writeHead(416);res.end();return}res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${data.length}`,'Content-Length':end-start+1});res.end(data.subarray(start,end+1));return}
 res.writeHead(200,{...headers,'Content-Length':data.length});res.end(data)
}catch{res.writeHead(404);res.end('Not found')}}).listen(8767,'127.0.0.1',()=>console.log('http://127.0.0.1:8767'+base));
