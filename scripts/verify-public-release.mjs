import { JSDOM } from 'jsdom';
import { createHash } from 'node:crypto';
import { readFile,writeFile,mkdir } from 'node:fs/promises';
const base=new URL(process.argv[2]||'http://localhost:3000');
const canonical='https://emanuelwloch.pl';
const headers={'User-Agent':'facebookexternalhit/1.1'};
const get=async path=>{const r=await fetch(new URL(path,base),{headers,signal:AbortSignal.timeout(20000)});if(!r.ok)throw new Error(`${path}: HTTP ${r.status}`);const html=await r.text();return {r,doc:new JSDOM(html).window.document};};
const home=await get('/');const catalog=await get('/realizacje');
const paths=[...new Set(['/', '/realizacje','/uslugi','/o-mnie','/polityka-prywatnosci','/poradniki','/tworzenie-stron-internetowych','/tworzenie-aplikacji-webowych','/sklepy-internetowe','/nextjs-developer','/tworzenie-stron-internetowych-jaroslaw','/tworzenie-stron-internetowych-rzeszow',...Array.from(catalog.doc.querySelectorAll('a[href^="/projekty/"]'),a=>a.getAttribute('href')),...Array.from((await get('/poradniki')).doc.querySelectorAll('a[href^="/poradniki/"]'),a=>a.getAttribute('href'))])];
const pages=[];const failures=[];
for(let i=0;i<paths.length;i+=5){
 const batch=await Promise.allSettled(paths.slice(i,i+5).map(async path=>{
  const {doc,r}=path==='/'?home:path==='/realizacje'?catalog:await get(path);
  const meta=name=>doc.querySelector(`meta[property="${name}"],meta[name="${name}"]`)?.getAttribute('content');
  const og={title:meta('og:title'),description:meta('og:description'),url:meta('og:url'),image:meta('og:image'),twitterTitle:meta('twitter:title'),twitterDescription:meta('twitter:description'),twitterImage:meta('twitter:image')};
  if(new URL(og.url||'',canonical).href!==new URL(path,canonical).href)throw new Error(`${path}: wrong og:url ${og.url}`);
  if(Object.values(og).some(x=>!x))throw new Error(`${path}: incomplete sharing metadata`);
  if(og.title!==og.twitterTitle||og.description!==og.twitterDescription||og.image!==og.twitterImage)throw new Error(`${path}: OG/Twitter disagree`);
  const heading=doc.querySelector('#services-heading');if(heading&&!/Wybierz, czego\s+potrzebujesz/.test(heading.textContent))throw new Error(`${path}: missing heading whitespace`);
  return {path,status:r.status,...og};
 }));
 batch.forEach(r=>r.status==='fulfilled'?pages.push(r.value):failures.push(String(r.reason)));
}
for(const title of ['VIP Transfery','Zielona Baza']){
 const getCard=doc=>Array.from(doc.querySelectorAll('article')).find(a=>a.querySelector('h3')?.textContent.includes(title));
 const a=getCard(home.doc),b=getCard(catalog.doc);if(!a||!b)failures.push(`Missing ${title} card`);
 const label=title==='VIP Transfery'?'Strona ofertowa':'Strona internetowa';if(!a?.textContent.includes(label)||!b?.textContent.includes(label))failures.push(`Wrong ${title} label`);
 if(a?.textContent.includes('gotowość pod Google Ads'))failures.push('Stale VIP result');
}
for(const title of ['Dmuchańce Afryka','Fundacja Serce Mototrasy']) {
 const card=Array.from(catalog.doc.querySelectorAll('article')).find(a=>a.querySelector('h3')?.textContent.includes(title));
 if(!card?.textContent.includes('Strona internetowa'))failures.push(`Wrong website label: ${title}`);
}
const projectTitles=Array.from(catalog.doc.querySelectorAll('h3'),e=>e.textContent);
if(projectTitles.some(t=>t.includes('Full-Stack Software Engineer')))failures.push('Old self-project positioning');
if(!projectTitles.some(t=>t.includes('Strona ofertowa i lekki CMS')))failures.push('Updated self-project title missing');
const serviceRows=home.doc.querySelector('#services-heading')?.parentElement?.parentElement?.parentElement?.textContent||'';
if(/Błyskawicznie|niesamowitą|Gwarantuję|bezbłędną/.test(serviceRows))failures.push('Old service promises remain');
const imagePath='/og/strony-i-aplikacje-9dac8276.jpg';const image=await fetch(new URL(imagePath,base));const remote=Buffer.from(await image.arrayBuffer());const local=await readFile('public'+imagePath);const hash=b=>createHash('sha256').update(b).digest('hex');if(!image.ok||hash(remote)!==hash(local))failures.push('Sharing image differs');
const legacy=await fetch(new URL('/opengraph-image.jpg',base),{redirect:'manual'});if(legacy.status!==308||!legacy.headers.get('location')?.includes(imagePath))failures.push('Legacy image redirect missing');
const report={base:base.href,pages,sharingImage:{status:image.status,sha256:hash(remote)},legacyImageStatus:legacy.status,failures};await mkdir('.debug',{recursive:true});await writeFile(`.debug/public-release-${base.hostname==='localhost'?'local':'production'}.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify({pages:pages.length,imageHash:hash(remote),legacyImageStatus:legacy.status,failures},null,2));if(failures.length)process.exitCode=1;
