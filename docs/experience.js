'use strict';
let demo='finance',diagramYear='2026',zoom=100,labView='document';
const demoInfo={
 finance:{title:'입력·집계·분석을 한 흐름으로',description:'실제 로컬 HTML 프로그램에서 가상 예제자료로 수입 관리와 실적 분석을 확인하고 원본 결제자료의 결의서 변환 흐름을 안내합니다.',label:'실제 프로그램 · 가상 예제자료 시연',id:'E09',chapters:[[0,'예제 수입·지출 종합 현황'],[6,'사업별 수입 내역 확인'],[14,'입금수단·월별 실적 확인'],[23,'원본자료의 결의서 변환 안내']]},
 safety:{title:'같은 내용을 다시 입력하는 일을 줄이기',description:'제출 사례의 Excel 자료 → 행 선택 → 일지 생성·확인 흐름을 설명용 화면으로 재구성했습니다. 실제 배포 프로그램의 화면 녹화는 아닙니다.',label:'설명용 재구성 시연 · 가상 자료 · 원본 프로그램 아님',id:'E11',chapters:[[0,'교육대장 예제 확인'],[5,'일지로 옮길 교육 선택'],[11,'같은 내용으로 미리보기 생성'],[17,'원본과 결과 대조']]}
};
function selectDemo(kind){
 demo=kind;let info=demoInfo[kind],v=$('demo-video');v.pause();v.removeAttribute('src');v.querySelector('source').src='media/'+kind+'.webm';
 // Replace the track so captions from the previous video cannot remain visible while loading.
 for(const t of v.textTracks)t.mode='disabled';v.querySelector('track').remove();let track=document.createElement('track');track.kind='captions';track.label='한국어 설명';track.srclang='ko';track.src='media/'+kind+'.vtt';track.default=true;v.append(track);v.poster='media/'+kind+'-poster.png';v.load();
 $('video-error').hidden=true;$('video-download').href='media/'+kind+'.webm';$('video-label').textContent=info.label;$('demo-title').textContent=info.title;$('demo-desc').textContent=info.description;$('demo-detail').dataset.case=info.id;$('demo-panel').setAttribute('aria-labelledby','demo-'+kind);
 document.querySelectorAll('[data-demo]').forEach(b=>{let selected=b.dataset.demo===kind;b.setAttribute('aria-selected',selected);b.tabIndex=selected?0:-1});
 $('chapters').innerHTML=info.chapters.map(([t,label])=>'<button data-time="'+t+'"><span>00:'+String(t).padStart(2,'0')+'</span><span>'+label+'</span></button>').join('');renderLab()
}
document.querySelectorAll('[data-demo]').forEach(b=>{b.onclick=()=>selectDemo(b.dataset.demo);b.onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();let k=e.key==='Home'?'finance':e.key==='End'?'safety':b.dataset.demo==='finance'?'safety':'finance';selectDemo(k);$('demo-'+k).focus()}}});
$('chapters').onclick=e=>{let b=e.target.closest('[data-time]');if(!b)return;let v=$('demo-video');v.currentTime=Number(b.dataset.time);v.play().catch(()=>toast('재생 버튼을 눌러 영상을 시작하세요.'))};
$('demo-video').addEventListener('error',()=>{$('video-error').hidden=false});
const financeRows=[{program:'창작교실',method:'카드',amount:80000,date:'2026-09-03'},{program:'창작교실',method:'계좌이체',amount:60000,date:'2026-09-04'},{program:'체험교실',method:'카드',amount:100000,date:'2026-09-05'},{program:'체험교실',method:'계좌이체',amount:40000,date:'2026-09-06'}];
const safetyRows=[{date:'2026-09-03',time:'14:00~14:30',topic:'활동 공간 안전수칙',people:20},{date:'2026-09-04',time:'15:00~15:40',topic:'비상 대피와 화재 예방',people:18},{date:'2026-09-05',time:'10:00~10:30',topic:'야외활동 안전',people:24}];
function renderLab(){
 labView='document';
 if(demo==='finance'){
 $('interactive-lab').innerHTML='<div class="lab-grid"><div><div class="lab-title">가상 원본자료 / 수입 4건</div><div class="lab-controls"><label>프로그램<select id="lab-program"><option value="">전체 프로그램</option><option>창작교실</option><option>체험교실</option></select></label><label>입금수단<select id="lab-method"><option value="">전체 입금수단</option><option>카드</option><option>계좌이체</option></select></label></div><table class="data-table"><thead><tr><th>일자</th><th>프로그램</th><th>입금수단</th><th>금액(원)</th></tr></thead><tbody id="lab-rows"></tbody></table><p class="lab-note">조건을 바꾸면 같은 데이터로 문서와 분석 결과가 함께 달라집니다.</p></div><div class="lab-output"><div class="output-tabs" role="group" aria-label="예제 결과 보기"><button data-output="document" aria-pressed="true">결의자료 미리보기</button><button data-output="analysis" aria-pressed="false">실적 분석</button></div><div id="lab-result" aria-live="polite"></div><p class="scope-note">설명용 예제입니다. 공식 수입결의서 생성·결재를 수행하지 않으며, 실제 업무에서는 원본 대조와 기존 회계 검증 절차를 유지합니다.</p></div></div>';
 ['lab-program','lab-method'].forEach(id=>$(id).onchange=updateFinance);document.querySelectorAll('[data-output]').forEach(b=>b.onclick=()=>{labView=b.dataset.output;updateFinance()});updateFinance();
 }else{
 $('interactive-lab').innerHTML='<div class="lab-grid"><div><div class="lab-title">가상 원본자료 / 교육대장 3건</div><table class="data-table"><thead><tr><th>선택</th><th>교육일</th><th>교육 내용</th><th>인원</th></tr></thead><tbody>'+safetyRows.map((r,i)=>'<tr><td><input type="checkbox" class="safety-check" value="'+i+'" '+(i===0?'checked':'')+' aria-label="'+esc(r.topic)+' 선택"></td><td>'+r.date.slice(5)+'</td><td>'+esc(r.topic)+'</td><td>'+r.people+'명</td></tr>').join('')+'</tbody></table><div class="lab-controls" style="margin-top:22px"><button id="safety-generate" class="solid">선택한 교육으로 미리보기</button><button id="safety-reset" class="text-link">초기화</button></div><p class="lab-note">제출 사례: 10개 일지 수기 작성 약 20분 → 생성 1분 이내. 측정일·반복횟수는 미기재이며 기관 전체 평균으로 일반화하지 않습니다.</p></div><div class="lab-output"><div class="lab-title">같은 자료로 만든 일지 / 설명용 미리보기</div><div id="safety-result" aria-live="polite"><p class="safety-status">교육을 선택한 후 미리보기를 생성하세요.</p></div><p class="scope-note">원본 프로그램의 HWPX 생성 기능을 재현한 서비스가 아닙니다. 자료 재사용과 담당자 확인 과정을 체험하기 위한 화면입니다.</p></div></div>';
 $('safety-generate').onclick=generateSafety;$('safety-reset').onclick=renderLab;
 }
}
function updateFinance(){
 let rows=financeRows.filter(r=>(!$('lab-program').value||r.program===$('lab-program').value)&&(!$('lab-method').value||r.method===$('lab-method').value)),total=rows.reduce((a,r)=>a+r.amount,0);
 $('lab-rows').innerHTML=rows.map(r=>'<tr><td>'+r.date.slice(5)+'</td><td>'+r.program+'</td><td>'+r.method+'</td><td>'+money(r.amount)+'</td></tr>').join('')||'<tr><td colspan="4">해당 조건의 자료가 없습니다.</td></tr>';
 document.querySelectorAll('[data-output]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.output===labView));
 $('lab-result').innerHTML=labView==='document'?'<div class="document-preview"><h4>수입결의 자료 미리보기</h4><dl><dt>조회 범위</dt><dd>'+esc($('lab-program').value||'전체 프로그램')+'</dd><dt>입금수단</dt><dd>'+esc($('lab-method').value||'전체 입금수단')+'</dd><dt>자료 건수</dt><dd>'+rows.length+'건</dd><dt>수입 합계</dt><dd><strong>'+money(total)+'원</strong></dd><dt>확인</dt><dd>원본 금액·일자·건수 대조</dd></dl></div>':'<div class="total-label">동일 자료의 수입 합계</div><div class="total-value">'+money(total)+'<small style="font-size:20px">원</small></div><div class="bars">'+['창작교실','체험교실'].map(p=>{let n=rows.filter(r=>r.program===p).reduce((a,r)=>a+r.amount,0);return '<div><div class="bar-label"><span>'+p+'</span><span>'+money(n)+'원</span></div><div class="bar-track"><div class="bar-fill" style="width:'+(total?n/total*100:0)+'%"></div></div></div>'}).join('')+'</div>'
}
function generateSafety(){
 let chosen=[...document.querySelectorAll('.safety-check:checked')].map(b=>safetyRows[+b.value]);
 if(!chosen.length){$('safety-result').innerHTML='<p class="safety-status">교육을 한 개 이상 선택하세요.</p>';return}
 let r=chosen[0];$('safety-result').innerHTML='<div class="document-preview reveal"><h4>안전교육일지 미리보기</h4><dl><dt>교육일</dt><dd>'+r.date+'</dd><dt>시간</dt><dd>'+r.time+'</dd><dt>내용</dt><dd>'+r.topic+'</dd><dt>참가 인원</dt><dd>'+r.people+'명</dd><dt>확인</dt><dd>교육대장과 내용·인원 대조</dd></dl></div><p class="safety-status">선택 '+chosen.length+'건 · 첫 번째 교육의 미리보기입니다.</p>'
}
selectDemo('finance');
function renderDiagram(){
 let d=D.diagrams.find(x=>x.year===diagramYear&&x.index===+$('diagram-type').value);
 $('diagram-image').src=d.src;$('diagram-image').alt=(diagramYear==='2026'?'2026 자료 기반':'2027 설계 제안')+' AX 챌린저 '+d.title;$('diagram-download').href=d.src;$('diagram-caption').textContent=diagramYear==='2027'?'2027년 추가 설계 제안입니다. 확정 조직·운영 규모를 뜻하지 않습니다.':'2026년 자료 기반 도식입니다. 도식 안의 2027년 검토 영역은 현행과 구별합니다. 서비스 간 데이터 연동을 뜻하지 않습니다.';
 document.querySelectorAll('[data-year]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.year===diagramYear))
}
document.querySelectorAll('[data-year]').forEach(b=>b.onclick=()=>{diagramYear=b.dataset.year;renderDiagram()});$('diagram-type').onchange=renderDiagram;renderDiagram();
function applyZoom(){$('zoom-image').style.width=zoom+'%';$('zoom-value').textContent=zoom+'%'}
$('diagram-zoom').onclick=()=>{returnFocus=document.activeElement;zoom=100;$('zoom-image').src=$('diagram-image').src;$('zoom-image').alt=$('diagram-image').alt;$('zoom-title').textContent=$('diagram-image').alt;applyZoom();$('diagram-dialog').showModal();document.body.style.overflow='hidden'};
$('zoom-plus').onclick=()=>{zoom=Math.min(250,zoom+25);applyZoom()};$('zoom-minus').onclick=()=>{zoom=Math.max(100,zoom-25);applyZoom()};
const directions=[
 ['AX 전략과제 발굴·자체 개발','반복업무의 빈도·시간·서식·병목을 조사합니다. 업무 부담·공동 활용성·자료 준비·구현·유지관리 가능성을 기준으로 우선과제를 선정하는 방향을 검토합니다.'],
 ['운영체계 전환·2기 운영','개발 참여자와 현업 검증·확산 참여자가 같은 과제에서 협업합니다. 문제 정의 → MVP → 실제 업무 검증 → 보완 → 배포·사용지원 과정을 제안합니다.'],
 ['개발 도구·기관 계정','AI 개발도구·API·외부 서비스·도메인·호스팅을 서비스 필요에 맞춰 검토합니다. 기관 소유·관리 책임·사용량·비용 기준을 마련합니다.'],
 ['운영·보안·백업','서비스마다 운영 담당·대체 담당을 연결하고 접근권한·변경 기록·비용을 확인합니다. 백업 파일뿐 아니라 복원과 인수인계까지 점검합니다.'],
 ['성과 확산·내부 활용 지원','기존 도구의 사용성을 보완하고 짧은 업무별 실습과 문의 지원을 병행합니다. 실제 사용자·반복 사용·업무시간·오류·타부서 재사용으로 성과를 확인합니다.']
];
$('next-directions').innerHTML=directions.map(([title,body],i)=>'<div class="direction-item"><button aria-expanded="'+(!i)+'" aria-controls="direction-'+i+'" data-direction="'+i+'"><span>0'+(i+1)+'</span>'+title+'<span aria-hidden="true">'+(i?'+':'−')+'</span></button><div class="direction-body" id="direction-'+i+'" '+(i?'hidden':'')+'>'+body+'</div></div>').join('');
$('next-directions').onclick=e=>{let b=e.target.closest('[data-direction]');if(b){let opened=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',!opened);$(b.getAttribute('aria-controls')).hidden=opened;b.lastElementChild.textContent=opened?'+':'−'}};
const mvp=[['문제 정의','1주','문제·서식·입력 위치를 확인하고 최소 기능을 합의합니다. 산출: 과제카드·기준선·검증 예제. 바이브 코딩: AI 코딩 도구 환경을 준비하고 요구사항을 프롬프트로 쓰는 법을 배웁니다.'],['MVP 제작','2주','핵심 기능을 구현하고 현업이 중간에 확인합니다. 산출: 시제품·오류·변경 기록. 바이브 코딩: AI와 대화하며 기능을 만들고, 작게 요청→실행→수정을 반복합니다.'],['실제 업무 검증','3주','실제 업무 자료로 정상·예외·저장 결과를 시험합니다. 최종 확인은 개발자가 아닌 현업이 합니다. 산출: 원본 일치·입력 부담 점검. 바이브 코딩: 오류를 AI와 함께 고치고 예외 자료·개인정보 처리를 점검합니다.'],['보완·인계','4주','보완하고 설명서·실습과 운영·대체 담당 인계를 준비합니다. 산출: 배포 또는 보완 결정. 바이브 코딩: AI로 설명서·인계 문서를 쓰고 버전 관리·백업과 프롬프트를 공유합니다.']];
function renderMvp(i){$('mvp-steps').innerHTML=mvp.map((s,n)=>'<button data-mvp="'+n+'" aria-pressed="'+(i===n)+'">'+s[0]+'<small>'+s[1]+'</small></button>').join('');$('mvp-detail').textContent=mvp[i][2]}
$('mvp-steps').onclick=e=>{let b=e.target.closest('[data-mvp]');if(b)renderMvp(+b.dataset.mvp)};renderMvp(0);
const roadmap=[['1~2월','계획·환경 정비','기존 서비스의 실제 사용·자료·계정·운영/대체 담당을 조사하고 백업·복원을 확인합니다. 신규 개발보다 운영 기반을 먼저 정비합니다.'],['2~3월','과제 선정','반복업무의 문제·자료·검증자·개발 여력을 확인해 우선과제를 선정합니다. 개발·검증·확산 역할의 참여를 연결합니다.'],['3~11월','개발·현장 적용','최소 기능을 만들고 실제 업무 주기에 맞춰 검증합니다. 결과에 따라 보완·배포·사용지원 범위를 조정합니다.'],['연중','유지관리·활용 지원','권한·사용량·비용·문의·변경·백업을 관리합니다. 담당자 변경 전에는 대체 실행·복원·인수인계를 확인합니다.'],['6월·12월','운영 점검','실제 사용과 운영 부담을 근거로 계속 운영·보완·재사용·중단·보관을 판단합니다. 다음 과제와 과정 규모를 조정합니다.']];
function renderRoadmap(i){$('roadmap').innerHTML=roadmap.map((r,n)=>'<button data-roadmap="'+n+'" aria-pressed="'+(i===n)+'"><strong>'+r[0]+'</strong><span>'+r[1]+'</span></button>').join('');$('roadmap-detail').textContent=roadmap[i][2]}
$('roadmap').onclick=e=>{let b=e.target.closest('[data-roadmap]');if(b)renderRoadmap(+b.dataset.roadmap)};renderRoadmap(0);
if(location.hash.startsWith('#case-'))caseDetail(location.hash.slice(6));
