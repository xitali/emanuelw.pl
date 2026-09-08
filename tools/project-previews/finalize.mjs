import {createHash} from 'node:crypto';
import {readFile,writeFile,stat,rename,unlink} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
const projects=JSON.parse(await readFile('.debug/hyperframes-projects/projects.json','utf8'));
const manifest={};
for(const project of projects){
 const output=`public/project-previews/${project.id}`;
 const temp=`.debug/hyperframes-projects/${project.id}/optimized.mp4`;
 execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-i',`${output}.mp4`,'-vf','scale=960:600','-c:v','libx264','-preset','slow','-crf','27','-pix_fmt','yuv420p','-movflags','+faststart','-an',temp]);
 const metadata=JSON.parse(execFileSync('ffprobe',['-v','error','-show_entries','format=duration:stream=width,height,codec_name','-of','json',temp],{encoding:'utf8'}));
 if(Math.abs(Number(metadata.format.duration)-5)>.1)throw new Error('Invalid rendered duration');
 const version=createHash('sha256').update(await readFile(temp)).digest('hex').slice(0,8);
 const basename=`${project.id}-${version}`;
 const final=`public/project-previews/${basename}`;
 await rename(temp,`${final}.mp4`);
 execFileSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-i',`${final}.mp4`,'-frames:v','1',`${final}.jpg`]);
 await unlink(`${output}.mp4`);
 manifest[project.id]={source:project.source,video:`/project-previews/${basename}.mp4`,poster:`/project-previews/${basename}.jpg`};
 console.log(`${project.title}: ${Math.round((await stat(`${final}.mp4`)).size/1024)} KB, 5s, 960x600`);
}
await writeFile('src/lib/project-previews.json',JSON.stringify(manifest,null,2)+'\n');
