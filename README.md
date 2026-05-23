<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Vikas T — GitHub Profile</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --void:#0a0a10;--surface:#10101a;--card:#14141f;--border:#1e1e30;
  --purple:#8b5cf6;--cyan:#22d3ee;--pink:#f472b6;--green:#4ade80;--amber:#fbbf24;
  --text:#e2e0f0;--muted:#6b6888;
}
body{background:var(--void);color:var(--text);font-family:'Syne',sans-serif;overflow-x:hidden;min-height:100vh}
canvas#rain{position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;opacity:0.04;pointer-events:none}
.wrap{position:relative;z-index:1;max-width:680px;margin:0 auto;padding:2rem 1.5rem}

.hero{text-align:center;padding:3rem 0 2rem;opacity:0;animation:fadeUp 0.8s 0.2s forwards}
.avatar-ring{width:96px;height:96px;border-radius:50%;margin:0 auto 1.5rem;position:relative;display:flex;align-items:center;justify-content:center}
.avatar-ring::before{content:'';position:absolute;inset:-3px;border-radius:50%;background:conic-gradient(from 0deg,var(--purple),var(--cyan),var(--pink),var(--purple));animation:spin 4s linear infinite}
.avatar-inner{width:90px;height:90px;border-radius:50%;background:linear-gradient(135deg,#1e1040,#0f2030);display:flex;align-items:center;justify-content:center;font-size:2.2rem;position:relative;z-index:1;font-family:'Space Mono',monospace;color:var(--cyan)}
.name{font-size:2.4rem;font-weight:800;letter-spacing:-1px;line-height:1}
.name span.n1{color:var(--text)}.name span.n2{color:var(--purple)}
.tagline{margin-top:0.6rem;color:var(--muted);font-size:0.9rem;letter-spacing:0.5px}
.typed-wrap{margin-top:1rem;font-family:'Space Mono',monospace;font-size:0.82rem;color:var(--cyan);min-height:1.4em}
.typed-cursor{display:inline-block;animation:blink 1s infinite}

.badges{display:flex;flex-wrap:wrap;gap:0.5rem;justify-content:center;margin-top:1.5rem;opacity:0;animation:fadeUp 0.8s 0.6s forwards}
.badge{display:flex;align-items:center;gap:6px;background:var(--card);border:1px solid var(--border);border-radius:50px;padding:0.35rem 0.85rem;font-size:0.78rem;font-family:'Space Mono',monospace;cursor:pointer;transition:all 0.25s;text-decoration:none;color:var(--text)}
.badge:hover{border-color:var(--purple);background:#1a1228;transform:translateY(-2px)}
.badge-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}

.highlight{margin:2rem 0;background:linear-gradient(135deg,#1a0d2e,#0d1f2d);border:1px solid rgba(139,92,246,0.35);border-radius:12px;padding:1.2rem 1.5rem;display:flex;align-items:center;gap:1rem;opacity:0;animation:fadeUp 0.8s 0.9s forwards}
.highlight-icon{font-size:2rem;flex-shrink:0}
.highlight-text strong{color:var(--amber);font-size:0.9rem;display:block}
.highlight-text span{color:var(--muted);font-size:0.8rem}

.stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0.75rem;margin:1.5rem 0;opacity:0;animation:fadeUp 0.8s 1.1s forwards}
.stat-card{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:1rem;text-align:center;transition:all 0.3s;position:relative;overflow:hidden}
.stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--c),transparent);opacity:0;transition:opacity 0.3s}
.stat-card:hover::before{opacity:1}
.stat-card:hover{border-color:var(--c,var(--purple));transform:translateY(-3px)}
.stat-num{font-size:1.8rem;font-weight:800;color:var(--c,var(--purple));font-family:'Space Mono',monospace;line-height:1}
.stat-label{font-size:0.72rem;color:var(--muted);margin-top:0.3rem;letter-spacing:0.5px;text-transform:uppercase}

.sec-label{font-size:0.7rem;letter-spacing:3px;text-transform:uppercase;color:var(--purple);font-family:'Space Mono',monospace;margin:2rem 0 0.8rem;display:flex;align-items:center;gap:0.5rem}
.sec-label::after{content:'';flex:1;height:1px;background:var(--border)}

.projects{display:grid;grid-template-columns:repeat(2,1fr);gap:0.75rem}
.proj-card{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:1.1rem;cursor:pointer;transition:all 0.3s;position:relative;overflow:hidden;text-decoration:none;display:block;color:var(--text)}
.proj-card::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(139,92,246,0.08),transparent 60%);opacity:0;transition:opacity 0.3s;pointer-events:none}
.proj-card:hover::after{opacity:1}
.proj-card:hover{border-color:rgba(139,92,246,0.4);transform:translateY(-3px)}
.proj-icon{font-size:1.4rem;margin-bottom:0.5rem}
.proj-name{font-weight:700;font-size:0.9rem;margin-bottom:0.3rem}
.proj-desc{font-size:0.75rem;color:var(--muted);line-height:1.5}
.proj-tags{display:flex;flex-wrap:wrap;gap:4px;margin-top:0.7rem}
.proj-tag{font-size:0.65rem;font-family:'Space Mono',monospace;padding:2px 7px;border-radius:4px;background:rgba(139,92,246,0.1);color:var(--purple);border:1px solid rgba(139,92,246,0.2)}
.proj-tag.cy{background:rgba(34,211,238,0.1);color:var(--cyan);border-color:rgba(34,211,238,0.2)}
.proj-tag.pk{background:rgba(244,114,182,0.1);color:var(--pink);border-color:rgba(244,114,182,0.2)}
.proj-tag.gn{background:rgba(74,222,128,0.1);color:var(--green);border-color:rgba(74,222,128,0.2)}
.proj-live{display:inline-flex;align-items:center;gap:4px;font-size:0.7rem;color:var(--cyan);margin-top:0.5rem;font-family:'Space Mono',monospace}
.live-dot{width:5px;height:5px;border-radius:50%;background:var(--green);box-shadow:0 0 6px var(--green);animation:pulse 2s infinite}

.stack-grid{display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.5rem}
.stack-pill{background:var(--card);border:1px solid var(--border);border-radius:50px;padding:0.3rem 0.85rem;font-size:0.75rem;font-family:'Space Mono',monospace;transition:all 0.25s;color:var(--muted)}
.stack-pill:hover{border-color:var(--cyan);color:var(--cyan);transform:scale(1.05)}

.footer{margin-top:2.5rem;padding:1.5rem;background:var(--card);border:1px solid var(--border);border-radius:12px;text-align:center;opacity:0;animation:fadeUp 0.8s 1.8s forwards}
.footer-cta{font-size:0.85rem;color:var(--muted);margin-bottom:1rem}
.footer-links{display:flex;justify-content:center;flex-wrap:wrap;gap:1rem}
.flink{color:var(--purple);font-size:0.8rem;font-family:'Space Mono',monospace;text-decoration:none;transition:color 0.2s}
.flink:hover{color:var(--cyan)}

@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.4)}}
.proj-anim{opacity:0;transform:translateY(15px);transition:all 0.5s}
.proj-anim.visible{opacity:1;transform:translateY(0)}
</style>
</head>
<body>
<canvas id="rain"></canvas>
<div class="wrap">
  <div class="hero">
    <div class="avatar-ring">
      <div class="avatar-inner">VT</div>
    </div>
    <div class="name"><span class="n1">Vikas </span><span class="n2">T</span></div>
    <div class="tagline">AI Engineer · Full Stack Developer · Product Builder</div>
    <div class="typed-wrap"><span id="typed"></span><span class="typed-cursor">|</span></div>
    <div class="badges">
      <a href="https://vikast.me/" class="badge"><span class="badge-dot" style="background:var(--purple)"></span>vikast.me</a>
      <a href="https://www.linkedin.com/in/vikasthangavel/" class="badge"><span class="badge-dot" style="background:#0a66c2"></span>LinkedIn</a>
      <a href="https://github.com/Vikasthangavel" class="badge"><span class="badge-dot" style="background:var(--muted)"></span>GitHub</a>
      <a href="mailto:vikasthangavel@gmail.com" class="badge"><span class="badge-dot" style="background:var(--pink)"></span>Email</a>
    </div>
  </div>
  <div class="highlight">
    <div class="highlight-icon">🥈</div>
    <div class="highlight-text">
      <strong>2nd Place — Namakkal Police Cybersecurity Hackathon 2025</strong>
      <span>Built an AI-based cybercrime detection system. Reviewed by Namakkal Cyber Cell for pilot deployment.</span>
    </div>
  </div>
  <div class="stats-grid">
    <div class="stat-card" style="--c:var(--purple)"><div class="stat-num" id="s1">0</div><div class="stat-label">Live Products</div></div>
    <div class="stat-card" style="--c:var(--cyan)"><div class="stat-num" id="s2">0</div><div class="stat-label">CGPA</div></div>
    <div class="stat-card" style="--c:var(--green)"><div class="stat-num" id="s3">0</div><div class="stat-label">Hackathon</div></div>
  </div>
  <div class="sec-label">Featured Projects</div>
  <div class="projects">
    <a class="proj-card proj-anim" href="https://tinyurl.com/cybernamakkal">
      <div class="proj-icon">🔍</div><div class="proj-name">TrueSight AI</div>
      <div class="proj-desc">Multimodal deepfake detection. Forensic reports for cybercrime investigation.</div>
      <div class="proj-tags"><span class="proj-tag">Flask</span><span class="proj-tag cy">Roboflow</span><span class="proj-tag pk">Computer Vision</span></div>
      <div class="proj-live"><span class="live-dot"></span>live</div>
    </a>
    <a class="proj-card proj-anim" href="https://time2orders.com">
      <div class="proj-icon">🛒</div><div class="proj-name">Time2Order</div>
      <div class="proj-desc">Preorder platform for local shops. Soundbox alerts + digital payments.</div>
      <div class="proj-tags"><span class="proj-tag">Python</span><span class="proj-tag cy">SQL</span><span class="proj-tag gn">Cashfree</span></div>
      <div class="proj-live"><span class="live-dot"></span>live</div>
    </a>
    <a class="proj-card proj-anim" href="https://dakshaa.ksrct.ac.in">
      <div class="proj-icon">🎓</div><div class="proj-name">DAKSHAA T26</div>
      <div class="proj-desc">Full-stack national symposium portal. Payment gateway + Supabase auth.</div>
      <div class="proj-tags"><span class="proj-tag">React</span><span class="proj-tag cy">Express</span><span class="proj-tag pk">Supabase</span></div>
      <div class="proj-live"><span class="live-dot"></span>live</div>
    </a>
    <a class="proj-card proj-anim" href="https://time2due.com">
      <div class="proj-icon">🏢</div><div class="proj-name">Time2Due</div>
      <div class="proj-desc">ERP for cable operators. Employee mgmt, offline payments, mobile dashboards.</div>
      <div class="proj-tags"><span class="proj-tag">Python</span><span class="proj-tag cy">SQL</span></div>
      <div class="proj-live"><span class="live-dot"></span>live</div>
    </a>
    <a class="proj-card proj-anim" href="#">
      <div class="proj-icon">🌾</div><div class="proj-name">Time2Farm</div>
      <div class="proj-desc">Farm finance tracker with AI-driven insights using Gemini API.</div>
      <div class="proj-tags"><span class="proj-tag">Python</span><span class="proj-tag pk">Gemini API</span></div>
    </a>
    <a class="proj-card proj-anim" href="https://theastro.pages.dev/">
      <div class="proj-icon">🏠</div><div class="proj-name">Astro Technologies</div>
      <div class="proj-desc">Product catalog for RO Systems. React + Firebase + Cloudinary.</div>
      <div class="proj-tags"><span class="proj-tag">React</span><span class="proj-tag cy">Firebase</span></div>
      <div class="proj-live"><span class="live-dot"></span>live</div>
    </a>
  </div>
  <div class="sec-label">Tech Stack</div>
  <div class="stack-grid" id="stack"></div>
  <div class="footer">
    <div class="footer-cta">📍 Erode, Tamil Nadu &nbsp;·&nbsp; Always open to interesting collaborations ⭐</div>
    <div class="footer-links">
      <a href="https://vikast.me/" class="flink">🌐 vikast.me</a>
      <a href="mailto:vikasthangavel@gmail.com" class="flink">📧 vikasthangavel@gmail.com</a>
      <a href="https://github.com/Vikasthangavel" class="flink">🐙 GitHub</a>
      <a href="https://www.linkedin.com/in/vikasthangavel/" class="flink">💼 LinkedIn</a>
    </div>
  </div>
</div>
<script>
const canvas=document.getElementById('rain');const ctx=canvas.getContext('2d');
function sizeCanvas(){canvas.width=window.innerWidth;canvas.height=window.innerHeight}
sizeCanvas();window.addEventListener('resize',sizeCanvas);
const cols=Math.floor(window.innerWidth/18);const drops=Array(cols).fill(1);
function drawRain(){
  ctx.fillStyle='rgba(10,10,16,0.05)';ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='#8b5cf6';ctx.font='14px Space Mono,monospace';
  drops.forEach((y,i)=>{const ch=String.fromCharCode(0x30A0+Math.random()*96);ctx.fillText(ch,i*18,y*18);if(y*18>canvas.height&&Math.random()>0.975)drops[i]=0;drops[i]++;});
}
setInterval(drawRain,60);
const phrases=["I build things that solve real problems.","From deepfakes to farm finance.","6+ live products shipped end-to-end.","AI × Full Stack × Real Impact."];
let pi=0,ci=0,del=false;
function typeNext(){const p=phrases[pi];if(!del){document.getElementById('typed').textContent=p.slice(0,++ci);if(ci===p.length){del=true;setTimeout(typeNext,1800);return}}else{document.getElementById('typed').textContent=p.slice(0,--ci);if(ci===0){del=false;pi=(pi+1)%phrases.length}}setTimeout(typeNext,del?40:75);}
typeNext();
function countUp(id,target,suffix,dec){const el=document.getElementById(id);let cur=0;const inc=target/1200*16;const t=setInterval(()=>{cur=Math.min(cur+inc,target);el.textContent=dec?cur.toFixed(1):Math.floor(cur)+suffix;if(cur>=target)clearInterval(t);},16);}
setTimeout(()=>{countUp('s1',6,'+',false);countUp('s2',8.2,'',true);countUp('s3',1,'st',false);},1200);
const stack=["Python","JavaScript","React","Node.js","Flask","Express.js","Django","MySQL","Supabase","Machine Learning","Computer Vision","Roboflow","Power BI","Git","Cloudflare","Java","Tailwind","HTML/CSS"];
const sg=document.getElementById('stack');
stack.forEach((s,i)=>{const p=document.createElement('span');p.className='stack-pill';p.textContent=s;p.style.opacity='0';p.style.animation=`fadeUp 0.4s ${1.4+i*0.05}s forwards`;sg.appendChild(p);});
const obs=new IntersectionObserver(entries=>{entries.forEach((e,idx)=>{if(e.isIntersecting)setTimeout(()=>e.target.classList.add('visible'),idx*80);});},{threshold:0.1});
document.querySelectorAll('.proj-anim').forEach(c=>obs.observe(c));
document.querySelectorAll('.proj-card').forEach(card=>{card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');card.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');});});
</script>
</body>
</html>
