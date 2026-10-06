'use strict';
const D=window.AX_DATA,$=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=n=>Number(n).toLocaleString('ko-KR'), norm=s=>s.replace(/부천시|부천/g,'');
const caseById=id=>D.cases.find(c=>c.id===id);
let category='',expanded=false,returnFocus=null;
function toast(text){$('toast').textContent=text;$('toast').hidden=false;clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('toast').hidden=true,2500)}
function refLinks(ids){return '<div class="source-links">'+ids.filter(id=>D.sources[id]?.url).map(id=>'<a href="'+esc(D.sources[id].url)+'" target="_blank" rel="noopener">'+esc(D.sources[id].title)+'</a>').join('')+'</div><div class="source-files">'+ids.filter(id=>D.sources[id]?.file).map(id=>esc(id)+' · '+esc(D.sources[id].title)+'<br>').join('')+'</div>'}
function openDetail(html){returnFocus=document.activeElement;$('detail-content').innerHTML=html;if(!$('detail-dialog').open){$('detail-dialog').showModal();document.body.style.overflow='hidden'}$('detail-dialog').scrollTop=0;$('detail-dialog').querySelector('.dialog-close').focus()}
function closeDialog(dialog){dialog.close();document.body.style.overflow='';if(returnFocus?.isConnected)returnFocus.focus();if(location.hash.startsWith('#case-'))history.replaceState(null,'',location.pathname+location.search+'#cases')}
document.querySelectorAll('.dialog-close').forEach(b=>b.onclick=()=>closeDialog(b.closest('dialog')));
document.querySelectorAll('dialog').forEach(d=>{d.addEventListener('cancel',e=>{e.preventDefault();closeDialog(d)});d.addEventListener('click',e=>{if(e.target===d){let r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(d)}})});
function caseDetail(id){
 const c=caseById(id);if(!c)return;
 openDetail('<div class="eyebrow">'+esc(c.id)+' / '+esc(c.category)+'</div><h2>'+esc(c.title)+'</h2><p>'+esc(c.description)+'</p><dl class="case-facts">'+[['담당·협업',c.owner],['추진 단계',c.stage],['결과물',c.output],['확인된 변화',c.effect],['확인 방식',c.method],['기준일',c.date]].map(([k,v])=>'<dt>'+k+'</dt><dd>'+esc(v)+'</dd>').join('')+'</dl><h3>해석과 적용 범위</h3><p class="scope-note">'+esc(c.note)+'</p>'+refLinks(c.sources)+'<div class="dialog-actions"><button class="outline" id="copy-case">사례 링크 복사</button>'+(['E09','E11'].includes(id)?'<button class="text-link" id="go-demo">시연·체험 보기</button>':'')+'</div>');
 history.replaceState(null,'','#case-'+id);
 $('copy-case').onclick=async()=>{try{await navigator.clipboard.writeText(location.href);toast('사례 링크를 복사했습니다.')}catch{toast('현재 주소의 #case-'+id+'를 공유해 주세요.')}};
 if($('go-demo'))$('go-demo').onclick=()=>{closeDialog($('detail-dialog'));selectDemo(id==='E09'?'finance':'safety');$('demos').scrollIntoView({behavior:'smooth'})}
}
document.addEventListener('click',e=>{let b=e.target.closest('[data-case]');if(b)caseDetail(b.dataset.case)});
const categories=[...new Set(D.cases.map(c=>c.category))];
$('categories').innerHTML=['전체',...categories].map(c=>'<button data-category="'+(c==='전체'?'':esc(c))+'" aria-pressed="'+(c==='전체')+'">'+esc(c)+'</button>').join('');
$('department').innerHTML='<option value="">전체 부서</option>'+D.roster.map(d=>'<option>'+esc(d.department)+'</option>').join('');
$('stage').innerHTML='<option value="">전체 단계</option>'+[...new Set(D.cases.map(c=>c.stageGroup))].map(s=>'<option>'+esc(s)+'</option>').join('');
function results(){let q=$('search').value.trim().toLowerCase(),dept=$('department').value,stage=$('stage').value;return D.cases.filter(c=>(!category||c.category===category||($('include-related').checked&&c.related.includes(category)))&&(!dept||norm(c.department).includes(norm(dept))||norm(c.owner).includes(norm(dept)))&&(!stage||c.stageGroup===stage)&&(!q||[c.title,c.owner,c.output,c.department,c.description,c.related.join(' '),c.id].join(' ').toLowerCase().includes(q)))}
function renderCases(){
 const found=results(),filtered=!!(category||$('search').value||$('department').value||$('stage').value),visible=(expanded||filtered)?found:found.slice(0,6);
 $('case-grid').innerHTML=visible.map(c=>'<button class="case-card" data-case="'+c.id+'" aria-label="'+esc(c.title)+' 상세 보기"><span class="case-top"><span>'+esc(c.id)+' / '+esc(c.category)+'</span></span><h3>'+esc(c.title)+'</h3><p>'+esc(c.department)+'</p><span class="case-bottom"><span class="stage-tag '+(['기획','검토·시험'].includes(c.stageGroup)?'draft':c.stageGroup==='명세 확인'?'uncertain':'')+'">'+esc(c.stage)+'</span><span class="plus" aria-hidden="true">+</span></span></button>').join('');
 $('result-count').textContent=found.length+'개 항목'+(visible.length<found.length?' · '+visible.length+'개 표시':'');$('empty').hidden=!!found.length;$('show-all').hidden=filtered||found.length<=6;$('show-all').textContent=expanded?'기본 6개 항목으로 접기':'전체 30개 항목 펼치기';
 document.querySelectorAll('[data-category]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.category===category))
}
function reset(){category='';expanded=false;['search','department','stage'].forEach(id=>$(id).value='');$('include-related').checked=false;renderCases()}
$('categories').onclick=e=>{let b=e.target.closest('[data-category]');if(b){category=b.dataset.category;renderCases()}};
['search','department','stage','include-related'].forEach(id=>$(id).addEventListener(id==='search'?'input':'change',renderCases));$('reset').onclick=reset;$('empty-reset').onclick=reset;$('show-all').onclick=()=>{expanded=!expanded;renderCases()};renderCases();
function surveyDetail(){openDetail('<div class="eyebrow">E02–E05 / AI 활용성 조사</div><h2>활용 경험과 자신감 사이,<br>실무 지원이 필요합니다.</h2><dl class="case-facts">'+[['조사 시점','2026.6.10~6.30 · 온라인 익명 자기보고'],['응답','113/143명 · 응답률 79.0%'],['업무 활용','응답자 105/113명 · 92.9%'],['자신감','평균 4.96/10점 · n=113'],['학습 수요','사례자료 45명(39.8%) · 실습교육 42명(37.2%)']].map(([k,v])=>'<dt>'+k+'</dt><dd>'+v+'</dd>').join('')+'</dl><p class="scope-note">조사 당시 대상자 수는 143명입니다. 자기보고 결과이므로 객관적 역량평가나 AX 챌린저 사업의 인과적 효과로 해석하지 않습니다.</p>'+refLinks(['L03','N05']))}
$('survey-open').onclick=surveyDetail;$('confidence-open').onclick=surveyDetail;
// 활동 경과는 v4.js의 추진 흐름·정기모임·주요 이정표로 대체
$('people').innerHTML=D.roster.map(d=>'<div class="department-people"><h4>'+esc(d.department)+'</h4><div class="names">'+d.names.map(n=>'<button data-member="'+n+'">'+n+'</button>').join('')+'</div></div>').join('');
function memberDetail(name){
 let dept=D.roster.find(d=>d.names.includes(name))?.department||'',individual=D.cases.filter(c=>c.owner.includes(name)),departmentCases=D.cases.filter(c=>norm(c.department).includes(norm(dept))&&!individual.includes(c));
 const list=rows=>'<div class="member-cases">'+rows.map(c=>'<button class="member-case" data-case="'+c.id+'"><strong>'+esc(c.title)+'</strong><small>'+esc(c.owner)+'</small></button>').join('')+'</div>';
 let body='<div class="eyebrow">'+esc(dept)+'</div><h2>'+esc(name)+' 챌린저</h2><p>2026년 AX 챌린저 참여자 · 소속과 성명 대조 완료</p><h3>이름이 확인된 기여·공동 제출</h3>'+(individual.length?list(individual):'<p class="scope-note">자료에서 개인 역할이 확인된 사례를 임의로 배정하지 않았습니다. 참여자 명단과 부서 활동은 구별합니다.</p>');
 if(departmentCases.length)body+='<h3>소속 부서 활동 참고</h3><p class="scope-note">다음은 부서 활동이며 개인 단독 공적으로 귀속하지 않습니다.</p>'+list(departmentCases);
 if(dept.includes('건강가정'))body+='<h3>활용 여건 참고</h3><p>보고서 활용과 도구 진입장벽에 관한 운영 메모가 있습니다. 독립 완료 결과물 근거가 없다는 이유로 미제출·실패로 판단하지 않습니다.</p>'+refLinks(['N14']);
 openDetail(body+refLinks(['N01','L14']))
}
$('people').onclick=e=>{let b=e.target.closest('[data-member]');if(b)memberDetail(b.dataset.member)};
function dataTable(rows,keys){if(!rows.length)return '';keys=keys||Object.keys(rows[0]);return '<div class="table-scroll" tabindex="0" role="region" aria-label="근거 자료 표"><table class="evidence-table"><thead><tr>'+keys.map(k=>'<th scope="col">'+esc(k)+'</th>').join('')+'</tr></thead><tbody>'+rows.map(r=>'<tr>'+keys.map(k=>'<td>'+esc(r[k])+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>'}
$('priority-table').innerHTML=dataTable(D.priorities);
$('downloads').innerHTML=D.downloads.map(d=>'<div class="dl-card">'+(d.thumb?'<a class="dl-thumb" href="'+d.url+'" target="_blank" rel="noopener" aria-label="'+esc(d.title)+' 미리보기(새 창)"><img src="'+d.thumb+'" alt="" width="720" height="405" loading="lazy"></a>':'')+'<div class="dl-body"><span class="dl-kind">'+d.url.split('.').pop().toUpperCase()+'</span><strong>'+esc(d.title)+'</strong><span>'+esc(d.desc)+'</span><div class="dl-actions"><a class="solid" href="'+d.url+'" target="_blank" rel="noopener">미리보기<span aria-hidden="true"> ↗</span></a><a class="outline" href="'+d.url+'" download="'+esc(d.file||'')+'">내려받기<span aria-hidden="true"> ↓</span></a></div></div></div>').join('');
$('source-list').innerHTML='<ul class="source-list">'+Object.values(D.sources).map(s=>'<li><small>'+s.id+'</small>'+(s.url?'<a href="'+esc(s.url)+'" target="_blank" rel="noopener">'+esc(s.title)+'</a>':esc(s.title))+(s.file?'<span class="filename">로컬 근거파일: '+esc(s.file)+'</span>':'')+'</li>').join('')+'</ul><p class="scope-note">노션 원문은 기존 접근 권한에 따릅니다. 주요 허브·소사·일쉼·수입행정·9월 회의록은 이번 제작에서 다시 확인했으며 나머지는 기존 근거 자료와 대조했습니다.</p>';
const sections=['overview','progress','people-section','results','cases','demos','award','system','next','references'];
const observer=new IntersectionObserver(entries=>{for(let e of entries)if(e.isIntersecting)document.querySelectorAll('.header nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+e.target.id))},{rootMargin:'-15% 0px -65% 0px'});sections.forEach(id=>observer.observe($(id)));
const toTop=$('to-top');addEventListener('scroll',()=>{const on=scrollY>640;toTop.classList.toggle('show',on);toTop.tabIndex=on?0:-1},{passive:true});toTop.onclick=()=>{scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});document.querySelector('.brand')?.focus({preventScroll:true})};
window.addEventListener('hashchange',()=>{if(location.hash.startsWith('#case-'))caseDetail(location.hash.slice(6))});
