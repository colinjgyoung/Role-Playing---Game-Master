/* ---------- content ---------- */
const OUTCOMES = [
  {n:1,label:"Total failure",color:"#b23b3b",gm:"It backfires. Your character reacts worse than before — add a fresh complication and raise the pressure."},
  {n:2,label:"It mostly fails",color:"#c0623e",gm:"Your character is unmoved or mildly annoyed. The door isn't shut, but they give nothing yet."},
  {n:3,label:"Partial — low",color:"#b5651d",gm:"A small concession, but with a cost or a condition attached. Make them work for the rest."},
  {n:4,label:"Partial — high",color:"#8a8a2f",gm:"Mostly agreed — but one snag or hesitation remains. Surface it and let them close it."},
  {n:5,label:"Strong success",color:"#2f8a4f",gm:"Your character comes on board. Give a small bonus and a clear next step."},
  {n:6,label:"Total success",color:"#1f7a44",gm:"Fully won over — and it opens a new opportunity or ally. Reward the good move."}
];

// Each function: realistic + fantasy framing, B1 & C1 phrase banks grouped by sub-purpose.
// B1 scenario text + headers use short, high-frequency words on purpose (avoid translation-fest).
const FUNCTIONS = {
  delegate:{
    label:"Delegating without managerial authority",
    real:{you:"You work on a project. You need help.",npc:"A colleague from another team. They are busy. They do not have to help you.",
      premise:"You want this colleague to do one job for you. But you are not their boss, and they have a lot of work.",
      stakes:"Good: they say yes to one clear job, with a day to finish it, and they are still happy with you. Bad: they say 'maybe', or they get annoyed.",
      mission:"Get a clear 'yes' to one job, with a day to finish — and keep a good relationship."},
    fantasy:{you:"You are a traveller. You have no power here.",npc:"A skilled worker in the town. They have many jobs already.",
      premise:"You need this worker to make something important. But you cannot give them orders, and they are very busy.",
      stakes:"Good: a clear promise with a day to finish, and they like you. Bad: they say no, or they get angry.",
      mission:"Get a clear promise with a day to finish — without being the boss."},
    B1:{"Ask for help":["Could you help me with…?","Would you be able to…?","Can I ask you for help?"],
        "Give a reason":["It would really help because…","We need it so that…","This is important because…"],
        "Make it easy":["It will only take…","I can send you everything you need.","I'll do the rest."],
        "Agree a day":["Could we say by…?","Does … work for you?","Can you do it by…?"]},
    C1:{"Frame the ask":["You're really the right person for this because…","I wanted to ask a favour."],
        "Acknowledge their load":["I know your plate is full — is there a version of this that's doable?","I don't want to add pressure, but…"],
        "Lower the barrier":["What would make this easier to say yes to?","How can I take the friction out of this for you?"],
        "Lock it in":["Can I count on … by …, or shall we look at the timing together?","What's realistic from your side?"]}
  },
  pushback:{
    label:"Handling pushback",
    real:{you:"You have just asked for something or made a plan.",npc:"A colleague who says no, or does not agree, or is too busy.",
      premise:"You asked for something normal, but the other person says no. You want to stay friendly, answer their 'no', and still move forward.",
      stakes:"Good: you answer their 'no' and agree a next step. Bad: it becomes a fight, or you give up with nothing.",
      mission:"Listen to their 'no', keep what is important, and agree a real next step."},
    fantasy:{you:"You carry an important message.",npc:"A guard who will not let your plan pass.",
      premise:"The guard says no — too dangerous, not their job. You must change the 'no' into a way through.",
      stakes:"Good: you find a way and keep their respect. Bad: the gate stays closed, or you make an enemy.",
      mission:"Answer the 'no', keep your main need, and find a way forward."},
    B1:{"Show you understand":["I understand.","That's a fair point.","I see what you mean."],
        "Say what you still need":["The problem is that…","But we still need to…","I hear you, but…"],
        "Offer another idea":["What if we…?","Could we try … instead?","Is there another way to…?"],
        "Move forward":["Can we agree to…?","Let's at least…","Shall we…?"]},
    C1:{"Validate, then pivot":["I hear you — and I still think we need to find a way to…","Fair — let me put the other side."],
        "Surface the real concern":["Help me understand what's driving the concern.","What's the actual blocker here?"],
        "Find the middle":["Where could we meet in the middle?","If X isn't possible, what is?"],
        "Commit a step":["So can we land on …?","Let's agree the next concrete step."]}
  },
  justify:{
    label:"Giving justification / reasons",
    real:{you:"You must explain a decision or a need.",npc:"A colleague or manager who is not sure about it.",
      premise:"You decided something, or you need something, and the other person is not sure. You must say why — in a clear, calm way.",
      stakes:"Good: they understand your reasons and agree. Bad: it sounds like a weak excuse and they say no.",
      mission:"Explain it with clear, real reasons — and stay calm."},
    fantasy:{you:"You are on a council. You made a risky choice.",npc:"An older leader who wants to know why.",
      premise:"You made a big choice. Now you must say why, in front of the leader. With weak reasons, the council says no.",
      stakes:"Good: the leader agrees with you. Bad: the council stops you.",
      mission:"Explain your choice with clear reasons — and stay calm."},
    B1:{"Give the reason":["The main reason is…","This is important because…","We're doing this so that…"],
        "Say what happens":["If we don't, then…","If not,…","The danger is that…"],
        "Give an example":["For example,…","Last time,…","We have seen that…"],
        "Say why it's good":["The good thing is…","This means we can…"]},
    C1:{"Lead with the why":["What's driving this decision is…","The thinking behind it is simple:"],
        "Structure the case":["There are two reasons this matters…","First… and just as important…"],
        "Frame the risk":["The cost of not doing this is…","Left as it is, this becomes…"],
        "Invite scrutiny":["Happy to be challenged on this, but…","Tell me where that logic breaks."]}
  },
  politeness:{
    label:"Adding politeness / softening a hard message",
    real:{you:"You must give a message that sounds too direct.",npc:"A colleague who would not like the direct words.",
      premise:"Your message is true, but it sounds too strong. You need to keep it clear, but in a nicer way.",
      stakes:"Good: clear and friendly. Bad: it sounds rude, or it becomes so soft that the point is lost.",
      mission:"Give the message in a way that is both clear and friendly."},
    fantasy:{you:"You bring bad news.",npc:"A proud leader who does not like direct words.",
      premise:"You must give bad news to the leader. Too direct, and they get angry. Too soft, and they miss the warning.",
      stakes:"Good: they listen and respect you. Bad: you make them angry, or they miss the point.",
      mission:"Make the message softer, but keep it clear."},
    B1:{"Ask in a nice way":["Could you…?","Would it be possible to…?","I was wondering if…"],
        "Be friendly first":["Just a small thing,…","When you have a moment,…","Sorry to ask, but…"],
        "Show you understand":["I know this is late notice, but…","I know you are busy."],
        "Keep it clear":["The main thing is…","What I really need is…"]},
    C1:{"Pre-empt":["I might be missing something, but…","Stop me if I've got this wrong, but…"],
        "Invite, don't impose":["Would you be open to…?","Can I push back gently on…?"],
        "Frame as shared":["How do we want to handle…?","I think we'd both rather avoid…"],
        "Keep the edge":["To be straight with you, the issue is…","I'll be honest:…"]}
  },
  escalate:{
    label:"Escalating a problem professionally",
    real:{you:"You have a problem that is not getting fixed.",npc:"A manager you must tell about it.",
      premise:"A problem is stuck. You need to tell a manager — in a clear, calm way, not angry and not in a panic.",
      stakes:"Good: they understand it and help, or make a decision. Bad: you sound too dramatic, or they do not see how important it is.",
      mission:"Explain the problem clearly, show why it matters, and ask for a decision."},
    fantasy:{you:"You are a scout. You saw a danger the leaders did not see.",npc:"A commander you must finally convince.",
      premise:"The danger grew while no one did anything. You must tell the commander — calm but clear.",
      stakes:"Good: the commander acts. Bad: they think you worry too much.",
      mission:"Explain the danger, show why it matters, and get a decision."},
    B1:{"Say there's a problem":["I need to tell you about a problem.","There's something we need to talk about.","I have a worry about this."],
        "Say what you tried":["We've already tried…, but…","We did …, and it didn't work."],
        "Say why it matters":["This means that…","If it continues,…","The danger now is…"],
        "Ask for help":["I need a decision on…","Could you help with…?","What do you suggest?"]},
    C1:{"Put it on the radar":["I want to put something on your radar before it grows.","Flagging this early on purpose."],
        "Be precise on status":["We've exhausted the options at our level.","We're at the point where I need a call from you."],
        "Quantify the impact":["The exposure here is…","If we wait, the cost becomes…"],
        "Drive to a decision":["I need a yes/no on … today.","What do you need from me to decide?"]}
  },
  clarify:{
    label:"Clarifying / checking understanding",
    real:{you:"You are not sure you understood.",npc:"A colleague who gave an unclear message or job.",
      premise:"A message or job is not clear, and you cannot do it safely. You need to check — but not sound like you did not listen.",
      stakes:"Good: you get the clear answer you need. Bad: you guess wrong, or you sound confused.",
      mission:"Check the unclear parts and make sure you both understand the same thing."},
    fantasy:{you:"You are a new student. Your teacher gave a strange order.",npc:"A mysterious teacher who speaks in riddles.",
      premise:"The teacher's words are not clear, and acting blindly is dangerous. You must find the real meaning — in a polite way.",
      stakes:"Good: you find out what they really mean. Bad: you do the wrong thing.",
      mission:"Make the message clear and check what they really want."},
    B1:{"Start the question":["Just to check,…","Can I check one thing?","Sorry, one question."],
        "Check the meaning":["Do you mean…?","Is that …, or …?","Which one do you need?"],
        "Say it back":["So if I understand right,…","So you want me to…, right?"],
        "Make sure":["Great, so the plan is…","Perfect, I'll …, then."]},
    C1:{"Frame the check":["Let me play that back to make sure we're aligned…","Before I run with this —"],
        "Probe the real target":["What does 'done' look like here?","What's the outcome you actually want?"],
        "Test edge cases":["And if … happens, do you still want…?","Where's the line on this?"],
        "Lock alignment":["So we're agreed:…","Good — I'll proceed on that basis."]}
  }
};

/* ---------- character names + GM prep kit ---------- */
const NAMES=["Marek","Sofia","Priya","Lukas","Elena","Jan","Anke","Tomás","Mei","Diego","Nadia","Stefan"];

const PREP={
  delegate:{trait:"Friendly but always 'firefighting' — buried in their own work.",
    line:"\"Honestly, this week is brutal — what do you need?\"",
    yes:"the ask is small, specific, and makes them look good.",
    no:"it's vague, or sounds like your problem dumped on them.",
    complications:["They offer a worse deadline.","They say yes — but to the wrong task.","Their boss 'has to approve' first.","They want something from you in return.","They go quiet; you must follow up."],
    upgrades:[["\"You must do this.\"","\"Could you…?\""],["No reason given","Add \"…because…\""],["No deadline","\"…by Thursday.\""],["Long apology buries the ask","One clean sentence."]],
    fallback:"Add time pressure: they leave for a meeting in 2 minutes.",landing:"End on a clear yes + a day — or a clean no they handled well."},
  pushback:{trait:"Defensive at first, fair underneath — needs to feel heard.",
    line:"\"Look, I just don't think this is going to work.\"",
    yes:"they feel understood and you offer a real option.",
    no:"you argue, ignore their point, or just repeat yourself.",
    complications:["They raise a second objection.","They agree in words but not in action.","They quote someone else's opinion.","They get a little emotional.","They offer a deal with a catch."],
    upgrades:[["\"You're wrong.\"","\"That's a fair point, and…\""],["Repeating it louder","Offer a new option"],["\"No.\" (full stop)","\"What if we…?\""],["Giving up","\"Can we agree one step?\""]],
    fallback:"Have them check the clock — a decision is needed now.",landing:"End when the objection is met and one next step is agreed."},
  justify:{trait:"Polite but unconvinced — keeps asking 'but why?'",
    line:"\"Okay… but why this way and not the usual one?\"",
    yes:"the reasons are concrete and tied to a real risk or benefit.",
    no:"reasons are vague, or it sounds like a defensive excuse.",
    complications:["They poke a hole in your first reason.","They compare it to a past failure.","They ask 'what if it goes wrong?'","They say the cost is too high.","They half-agree but want proof."],
    upgrades:[["\"Because it's better.\"","\"The main reason is…\""],["Vague benefit","Tie it to a real risk: \"If we don't…\""],["One weak reason","Two clear reasons"],["Defensive tone","Calm: \"Happy to explain the thinking.\""]],
    fallback:"They'll decide now — give your single best reason.",landing:"End when they accept the reasoning, even with one condition."},
  politeness:{trait:"Sensitive to tone — warm if respected, cold if pushed.",
    line:"\"Go on then — what is it?\"",
    yes:"the message stays clear but is wrapped kindly.",
    no:"it's blunt (offence) or so soft the point vanishes.",
    complications:["They take it personally anyway.","They ask 'are you criticising me?'","They were already in a bad mood.","They agree but seem hurt.","They miss the point — it was too soft."],
    upgrades:[["\"This is wrong.\"","\"Could we look at…?\""],["No cushion","\"Sorry to ask, but…\""],["Over-apologising","One kind, clear line"],["Point disappears","Keep the 'what I need' clear"]],
    fallback:"They're about to leave — say it kindly but clearly now.",landing:"End when it's said clearly and the relationship is intact."},
  escalate:{trait:"Senior, time-poor — wants the point fast, hates drama.",
    line:"\"I've got five minutes. What's the issue?\"",
    yes:"it's clear, shows real impact, and asks for a decision.",
    no:"it's panicky, vague, or buries the ask in detail.",
    complications:["They ask 'why didn't you solve this yourself?'","They want it shorter — cut to it.","They question your numbers.","They push it back to you.","They now have only 2 minutes."],
    upgrades:[["Long backstory first","Lead with the problem + ask"],["\"Maybe a small issue…\"","\"We have a delivery risk.\""],["No impact","\"This means…\" / \"The risk is…\""],["No ask","\"I need a decision on…\""]],
    fallback:"Cut their time to 1 minute — force the headline.",landing:"End when they grasp it and give a decision or help."},
  clarify:{trait:"Busy and a bit vague — assumes you already understand.",
    line:"\"Yeah, just do it the usual way, you know how it goes.\"",
    yes:"you check specific points without sounding lost.",
    no:"you guess silently, or you sound like you didn't listen.",
    complications:["They answer, but still vaguely.","They get slightly impatient.","Their answer reveals a new unknown.","They contradict what they said earlier.","They must go — last question only."],
    upgrades:[["Silent guessing","\"Just to check,…\""],["\"I don't understand.\"","\"Do you mean… or…?\""],["No confirmation","\"So the plan is…, right?\""],["Vague 'okay'","Repeat the key detail back"]],
    fallback:"They're leaving — you get one clarifying question.",landing:"End when you both clearly agree what's wanted."}
};

/* ---------- state ---------- */
let level='B1', mode='real', currentFn='delegate', charNameVal='', currentImg='', pv=null;

function init(){
  const sel=document.getElementById('func');
  Object.entries(FUNCTIONS).forEach(([k,v])=>{
    const o=document.createElement('option');o.value=k;o.textContent=v.label;sel.appendChild(o);
  });
  buildLegend();
  loadFunction();
}

function setLevel(l){level=l;
  document.getElementById('lvlB1').classList.toggle('active',l==='B1');
  document.getElementById('lvlC1').classList.toggle('active',l==='C1');
  document.getElementById('showPhrases').checked=(l==='B1'); // phrases on screen by default for B1
  renderPhrases();updatePlayerView();}

function setMode(m){mode=m;
  document.getElementById('modeReal').classList.toggle('active',m==='real');
  document.getElementById('modeFan').classList.toggle('active',m==='fantasy');
  loadScenario();updatePlayerView();}

function loadFunction(){currentFn=document.getElementById('func').value;loadScenario();renderPhrases();shuffleName();updatePlayerView();}

function shuffleName(){
  charNameVal=NAMES[Math.floor(Math.random()*NAMES.length)];
  document.getElementById('charName').textContent=charNameVal;
  renderPrep();
}

function renderPrep(){
  const p=PREP[currentFn];
  document.getElementById('prepChar').innerHTML=
    `<p><strong>${charNameVal}</strong> — ${p.trait}</p>`+
    `<p class="line2">Opening line: ${p.line}</p>`+
    `<p class="line2">✅ Says yes if ${p.yes}</p>`+
    `<p class="line2">⛔ Says no if ${p.no}</p>`;
  document.getElementById('prepComp').innerHTML=p.complications.map(c=>`<li>${c}</li>`).join('');
  document.getElementById('prepUpg').innerHTML=p.upgrades.map(u=>`<li><span class="weak">${u[0]}</span> → <span class="better">${u[1]}</span></li>`).join('');
  document.getElementById('prepFall').innerHTML=`<p><strong>If stuck:</strong> ${p.fallback}</p><p><strong>Landing:</strong> ${p.landing}</p>`;
}

/* ---------- image + Player View ---------- */
function loadImg(e){
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=()=>{currentImg=r.result;
    const pr=document.getElementById('imgPreview');pr.src=currentImg;pr.style.display='block';
    updatePlayerView();};
  r.readAsDataURL(f);
}

function openPlayerView(){
  pv=window.open('','gmPlayerView','width=920,height=700');
  if(!pv){alert('Pop-up blocked — allow pop-ups for this page to use Player View.');return;}
  pv.document.open();
  pv.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>The Scene</title>
  <style>
    html,body{margin:0;height:100%}
    body{font-family:"Segoe UI",system-ui,Arial,sans-serif;background:#0f1722;color:#eef3f8;display:flex;flex-direction:column}
    #pvImg{width:100%;max-height:48vh;object-fit:cover;display:none}
    .pvwrap{flex:1;padding:34px 44px;max-width:920px;margin:0 auto;width:100%;box-sizing:border-box}
    #pvScene{font-size:1.55rem;line-height:1.55;white-space:pre-wrap}
    #pvScene.empty{color:#5b6f85;font-style:italic}
    #pvPhr{margin-top:28px;padding-top:18px;border-top:1px solid #2a3a4d;display:none}
    #pvPhr h3{font-size:.78rem;text-transform:uppercase;letter-spacing:.05em;color:#7fb6df;margin:0 0 10px}
    .pvchip{display:inline-block;border:1px solid #33475a;border-radius:999px;padding:7px 14px;margin:0 7px 8px 0;font-size:1.02rem;color:#dbe6f0}
  </style></head>
  <body><img id="pvImg"><div class="pvwrap"><div id="pvScene"></div><div id="pvPhr"></div></div></body></html>`);
  pv.document.close();
  updatePlayerView();
}

function updatePlayerView(){
  if(!pv||pv.closed)return;
  const scene=document.getElementById('sceneText').value.trim();
  const sEl=pv.document.getElementById('pvScene');
  if(sEl){sEl.textContent=scene||'The scene will appear here…';sEl.className=scene?'':'empty';}
  const img=pv.document.getElementById('pvImg');
  if(img){if(currentImg){img.src=currentImg;img.style.display='block';}else{img.style.display='none';}}
  const phrBox=pv.document.getElementById('pvPhr');
  if(phrBox){
    if(document.getElementById('showPhrases').checked){
      phrBox.style.display='block';
      const groups=FUNCTIONS[currentFn][level];
      phrBox.innerHTML='<h3>Useful language</h3>'+Object.values(groups).flat().map(p=>`<span class="pvchip">${p}</span>`).join('');
    }else phrBox.style.display='none';
  }
}

function loadScenario(){
  const s=FUNCTIONS[currentFn][mode];
  document.getElementById('roleYou').textContent=s.you;
  document.getElementById('roleNpc').textContent=s.npc;
  document.getElementById('premise').textContent=s.premise;
  document.getElementById('stakes').textContent=s.stakes;
  document.getElementById('mission').textContent=s.mission;
}

function renderPhrases(){
  const groups=FUNCTIONS[currentFn][level];
  const box=document.getElementById('phrases');box.innerHTML='';
  document.getElementById('phrLvl').textContent='· '+level+' support';
  Object.entries(groups).forEach(([head,arr])=>{
    const h=document.createElement('h3');h.textContent=head;box.appendChild(h);
    const c=document.createElement('div');c.className='chips';
    arr.forEach(p=>{
      const chip=document.createElement('span');chip.className='chip copyable';chip.textContent=p;
      chip.onclick=()=>navigator.clipboard.writeText(p);
      c.appendChild(chip);
    });
    box.appendChild(c);
  });
}

function buildLegend(){
  const t=document.getElementById('legend');t.innerHTML='';
  OUTCOMES.forEach(o=>{
    const tr=document.createElement('tr');tr.id='leg'+o.n;
    tr.innerHTML=`<td class="n" style="color:${o.color}">${o.n}</td><td style="color:#fff;font-weight:600">${o.label}</td><td>${o.gm}</td>`;
    t.appendChild(tr);
  });
}

/* ---------- dice ---------- */
function rollDie(){
  const die=document.getElementById('die');
  die.classList.remove('rolling');void die.offsetWidth;die.classList.add('rolling');
  let ticks=0;const spin=setInterval(()=>{
    die.textContent=1+Math.floor(Math.random()*6);ticks++;
    if(ticks>8){clearInterval(spin);settle();}
  },55);
  function settle(){
    const n=1+Math.floor(Math.random()*6);
    die.textContent=n;
    const o=OUTCOMES[n-1];
    document.getElementById('result').innerHTML=
      `<span class="tag" style="background:${o.color}">${n} · ${o.label}</span><p>${o.gm}</p>`;
    document.querySelectorAll('#legend tr').forEach(r=>r.classList.remove('hit'));
    document.getElementById('leg'+n).classList.add('hit');
  }
}

/* ---------- read aloud ---------- */
function speak(){
  const t=document.getElementById('sceneText').value.trim();
  if(!t||!('speechSynthesis'in window))return;
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(t);u.rate=.96;u.lang='en-GB';
  window.speechSynthesis.speak(u);
}
function stopSpeak(){if('speechSynthesis'in window)window.speechSynthesis.cancel();}

/* ---------- capture ---------- */
function copyCapture(){
  const fn=FUNCTIONS[currentFn].label;
  const txt=`Language RPG — ${fn} (${level}, ${mode})\n`+
    `Best lines: ${document.getElementById('capLines').value}\n`+
    `Phrase to reuse: ${document.getElementById('capReuse').value}\n`+
    `Real situation: ${document.getElementById('capReal').value}`;
  navigator.clipboard.writeText(txt).then(()=>{
    const m=document.getElementById('capCopied');m.classList.add('show');setTimeout(()=>m.classList.remove('show'),1400);
  });
}

/* ---------- timer ---------- */
let timer=null,remain=1800;
function fmt(s){const m=Math.floor(s/60),x=s%60;return `${m}:${x<10?'0':''}${x}`;}
function paint(){const c=document.getElementById('clock');c.textContent=fmt(remain);c.classList.toggle('low',remain<=120);}
function toggleTimer(){
  const b=document.getElementById('startBtn');
  if(timer){clearInterval(timer);timer=null;b.textContent='Start';return;}
  b.textContent='Pause';
  timer=setInterval(()=>{remain--;paint();if(remain<=0){clearInterval(timer);timer=null;b.textContent='Start';}},1000);
}
function resetTimer(){
  if(timer){clearInterval(timer);timer=null;document.getElementById('startBtn').textContent='Start';}
  remain=parseInt(document.getElementById('mins').value,10)*60;paint();
}

document.getElementById('sceneText').addEventListener('input',updatePlayerView);
document.getElementById('showPhrases').addEventListener('change',updatePlayerView);
document.getElementById('showPhrases').checked=(level==='B1');
init();paint();
