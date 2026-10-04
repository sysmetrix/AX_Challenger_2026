'use strict';
/* v4 발표자료(재단 서식 24장) 반영: 숫자 실적·운영 구조·추진 흐름·정기모임·주요 이정표·전략경영실 프로덕트·업무유형별 목록·4주 육성과정.
   원문: 10_PPTX_최종/20261006_AX챌린저_성과보고회_최종_v4_재단서식.pptx, 노션 회의록 DB, 03 성과근거표. app.js보다 먼저 실행된다. */
(function(){
const byId=id=>document.getElementById(id);
const h=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const figures=[
 {num:'15',unit:'명',label:'챌린저 참여',cond:'10개 부서 · 위촉 명단 기준',tone:'p'},
 {num:'92.9',unit:'%',label:'응답자의 업무 AI 활용',cond:'전 직원 설문 113명 응답 · 자기보고',tone:'p',id:'survey-open'},
 {pre:'약 20분 →',num:'1',unit:'분 이내',label:'안전교육일지 10개 작성',cond:'소사청소년센터 제출 사례',tone:'p',caseId:'E11'},
 {pre:'40분 →',num:'5',unit:'분',label:'보안점검 결과 정리',cond:'전략경영실 담당자 사례',tone:'g',caseId:'E30'},
 {num:'3',unit:'곳',label:'부서 직원 AI 활용 워크숍',cond:'소사 6.17. · 일쉼 7.29. · 산울림 9.22.',tone:'g',jump:'milestones'},
 {pre:'4명 →',num:'2',unit:'명',label:'‘활용 방법 모름’ 응답',cond:'일쉼 공동실습 6명 · 자기보고',tone:'g',caseId:'E23'}
];
function renderFigures(){
 byId('figures').innerHTML=figures.map(f=>{
  const attr=f.id?' id="'+f.id+'"':f.caseId?' data-case="'+f.caseId+'"':f.jump?' data-jump="'+f.jump+'"':'';
  const tag=(f.id||f.caseId||f.jump)?'button':'div';
  return '<'+tag+' class="figure tone-'+f.tone+'"'+attr+'><span class="figure-num">'+(f.pre?'<small class="pre">'+h(f.pre)+'</small>':'')+'<b>'+h(f.num)+'</b><small>'+h(f.unit)+'</small></span><strong>'+h(f.label)+'</strong><span class="figure-cond">'+h(f.cond)+'</span></'+tag+'>';
 }).join('');
}

const stages=[
 ['4.9.','위촉·첫 모임','출범·워크숍','1차 킥오프에서 위촉식과 특강으로 출범했습니다. 10개 부서 15명이 부서의 AI 활용을 돕는 역할로 참여했습니다.'],
 ['5~6월','역할 재정립','부서 확산 + TF','5월 12일 챌린저 역할을 ‘프로젝트 개발자’에서 ‘AI 활용 문화 확산자’로 다시 정했습니다. 공통 도구 개발은 필요할 때 실무 TF가 맡았습니다.'],
 ['6~7월','공통 기반 정비','HWPX·직원 조사','6월 8일 HWPX 기본 저장을 전면 적용하고, 6월 10~30일 전 직원 AI 활용성 조사(113명 응답)를 실시했습니다.'],
 ['7~9월','부서 적용·협업','실험·개발·공유','부서별로 반복업무 도구를 만들고 워크숍으로 동료의 활용을 도왔습니다. KPI 성과관리 시스템은 7월 13일 조건부 운영을 시작했습니다.'],
 ['9월','운영·검증','수입행정 운영·보고 시제품','9월 1일 수입·지출 대시보드 운영을 시작했고, 월간 업무보고 자동화는 시제품에서 서식·수집 재설계 과제를 확인했습니다.'],
 ['10.6.','성과보고회','전원 소개·표창·차년도','부서협업의 날에 성과를 공유하고 김준호 직원을 표창하며 2027년 추진 검토안을 안내합니다.']
];
const meetings=[
 ['4.9.','1차 킥오프','위촉식·특강','전체 모임 · 참석 13명','위촉식과 특강을 진행했습니다. 다음 모임에서 챌린저의 정의와 운영 방향을 다시 합의하기로 했습니다.'],
 ['5.12.','2차 모임','역할 재정립','전체 모임','챌린저 역할을 ‘AI 활용 문화 확산자’로 재정립하고 정기모임 운영원칙을 정했습니다. 협업 페이지·KPI, 활용·보안·윤리 지침, 구글 튜토리얼을 3대 과제로 정하고 HWPX 전환 검토를 시작했습니다.'],
 ['6.9.','3차 모임','지침안·튜토리얼팀','전체 모임 · 참석 13명','AI 활용 지침(안)을 검토하고, 부서별 사례 수집 방법을 정했으며 튜토리얼 제작팀을 구성했습니다.'],
 ['6.25.','TF 1차','도구 우선순위','소그룹 · 참석 4명','월간 업무보고 자동화, 수입결의서 자동화, 설문 자동분석, 홍보물 아카이빙, KPI 성과관리 시스템 순으로 우선순위를 정했습니다. 구글 교육 콘텐츠는 재단 업무사례 중심으로 바꾸고 공용 개발 협업 구조를 마련했습니다.'],
 ['7.7.','4차 모임','설문 결과 공유','전체 모임 · 참석 8명','전 직원 활용성 조사 결과와 6개 부서의 경과를 공유했습니다. 사례 확보를 챌린저 중심의 부서 관리로 바꾸고 부서별 키멤버를 발굴하기로 했습니다.'],
 ['8.11.','5차 모임','상반기 결산','전체 모임','상반기 경과와 부서 도구 6건을 발표하고 차년도 운영 방향을 토의했습니다. 수입결의서 확산 전 양식 통일이 필요하다는 점과 윤리 지침 일정 재설정을 정리했습니다.'],
 ['9.8.','6차 모임','경과보고 공유','전체 모임','운영 경과보고를 공유하고 10월 부서협업의 날 성과공유와 우수 직원 표창 계획을 안내했습니다.']
];
function renderStages(i){
 byId('stage-track').innerHTML=stages.map((s,n)=>'<button data-stage="'+n+'" aria-pressed="'+(n===i)+'" class="'+(n===stages.length-1?'last':'')+'"><span class="stage-date">'+s[0]+'</span><span class="stage-dot" aria-hidden="true"></span><strong>'+s[1]+'</strong><small>'+s[2]+'</small></button>').join('');
 byId('stage-detail').innerHTML='<strong>'+h(stages[i][0])+' '+h(stages[i][1])+'</strong><p>'+h(stages[i][3])+'</p>';
}
function renderMeetings(i){
 byId('meeting-track').innerHTML=meetings.map((m,n)=>'<button data-meeting="'+n+'" aria-pressed="'+(n===i)+'" class="'+(m[1].startsWith('TF')?'tf':'')+'"><span class="m-date">'+m[0]+'</span><span class="m-dot" aria-hidden="true"></span><strong>'+m[1]+'</strong><small>'+m[2]+'</small></button>').join('');
 const m=meetings[i];
 byId('meeting-detail').innerHTML='<span class="eyebrow">'+h(m[0])+' · '+h(m[3])+'</span><h4>'+h(m[1])+' — '+h(m[2])+'</h4><p>'+h(m[4])+'</p>';
}

const CAT={b:['기반·운영','p'],t:['도구 개발·운영','a'],e:['직원 AI 활용 워크숍','g']};
const months=[
 ['5월',[['5.12.','HWPX 전환 결정 · 챌린저 역할 재정립','b',''],['5.25.','HWPX 안내·패치 시작','b','E06']]],
 ['6월',[['6.8.','HWPX 전면 적용 · PC 124대','b','E06'],['6.10.~30.','전 직원 AI 설문 · 113명 응답','b','E02'],['6.17.','소사 AI 활용 워크숍 · 13명 참석','e','E13'],['6.25.','TF 1차 모임 · 도구 우선순위 확정','t','']]],
 ['7월',[['7.7.','설문 결과 공유 · 결과분석 보고','b','E02'],['7.13.','KPI 성과관리 시스템 조건부 운영 개시','t','E08'],['7.29.','일쉼 AX 워크숍 · 6명 전원 참여','e','E23']]],
 ['8월',[['8.11.','상반기 결산 · 차년도 방향 토의','b',''],['8.27.','AI 활용 윤리 지침안 작업본','b','E07']]],
 ['9월',[['9.1.','수입·지출 대시보드 운영 개시','t','E09'],['9.4.','퀴즈톡 베타 배포','t','E28'],['9.14.','월간 업무보고 자동화 결과 정리','t','E31'],['9.22.','산울림 AI 활용 워크숍 · 14명 대상','e','E18']]]
];
let milestoneFilter='';
function renderMilestones(){
 byId('milestone-filter').innerHTML=[['','전체 15개']].concat(Object.entries(CAT).map(([k,v])=>[k,v[0]])).map(([k,l])=>'<button data-mfilter="'+k+'" aria-pressed="'+(k===milestoneFilter)+'" class="'+(k?'cat-'+CAT[k][1]:'')+'">'+h(l)+'</button>').join('');
 byId('milestone-grid').innerHTML=months.map(([mon,items])=>'<div class="month"><h4>'+mon+'</h4>'+items.map(([d,t,k,id])=>{
  const dim=milestoneFilter&&milestoneFilter!==k;const [first,...rest]=t.split(' · ');
  const inner='<b>'+h(d)+'</b><strong>'+h(first)+'</strong>'+(rest.length?'<small>'+h(rest.join(' · '))+'</small>':'');
  return id?'<button class="ms cat-'+CAT[k][1]+(dim?' dim':'')+'" data-case="'+id+'" aria-label="'+h(d+' '+t)+' 근거 보기">'+inner+'</button>':'<div class="ms cat-'+CAT[k][1]+(dim?' dim':'')+'">'+inner+'</div>';
 }).join('')+'</div>').join('');
}

const products=[
 ['E06','HWPX 문서 체계 전환·변환 도구','6.8. 전면 적용 · AI 결과를 업무 문서로 변환','적용 지원','g'],
 ['E30','내PC지키미 점검 결과 정리','PC명·직원 매칭 자동화 · 40분 → 5분 사례','적용','g'],
 ['E10','구글 AI 활용 콘텐츠','재단 업무 사례로 따라 하는 실습 콘텐츠','배포·확산','p'],
 ['E02','전 직원 활용성 조사·윤리 지침안','113명 조사 분석 · 활용 기준 공동 검토','분석·검토','a']
];
function renderProducts(){
 byId('products').innerHTML=products.map(([id,t,d,st,tone])=>'<button class="product tone-'+tone+'" data-case="'+id+'"><span class="chip">'+h(st)+'</span><strong>'+h(t)+'</strong><small>'+h(d)+'</small></button>').join('');
}

const devGroups=[
 ['재무·회계',[['E09','수입·지출 대시보드·결의서','소사·전략경영실 · 운영 개시'],['E16','이체명세서 자동출력','산울림 · 부서 공유'],['E17','급량비 자동기안','산울림 · 부서 적용']]],
 ['보고·성과·통계',[['E08','KPI 성과관리 시스템','전략경영실 · 정식 운영'],['E27','여성 고용동향 자동 브리프','일쉼 · 도구 구현'],['E31','월간 업무보고 자동화','상담복지·전략경영실 · 시제품']]],
 ['시설·프로그램·서비스 운영',[['E11','안전교육일지 자동생성','소사 · 부서 배포'],['E12','S TOUR 디지털 출입기록','소사 · 현장 적용'],['E14','출석부 자동생성','여성회관 · 테스트'],['E21','청소년카페 이용관리','상담복지 · 운영 중'],['E22','또래상담 시뮬레이션','상담복지 · 결과물 등록'],['E29','감정노동존중주간 웹앱','일쉼 · 운영 배포'],['E28','청소년 존중시민 퀴즈톡','일쉼 · 베타 배포'],['E26','시민참여 웹 이벤트','일쉼 · 운영']]],
 ['홍보·콘텐츠·기록',[['E15','보도자료 초안 생성기','청소년센터 · 부서 배포'],['E20','사계 부여청 웹 아카이브','여성청소년센터 · 공개'],['E24','국제가사노동자의 날 캠페인','일쉼 · 공개'],['E25','맘편한 임산부우선이용 안내','일쉼 · 공개']]],
 ['직원 교육·활용지원',[['E10','구글 AI 활용 콘텐츠','전략경영실 · 배포·확산'],['E13','소사 AI 활용 안내 워크숍','소사 · 6.17. 13명 참석'],['E23','일쉼 AX 워크숍','일쉼 · 7.29. 6명 전원'],['E18','산울림 AI 활용 워크숍','산울림 · 9.22. 14명 대상']]],
 ['규정·윤리·보안',[['E19','외부활동 신고 AI 챗봇','윤리감사 · 공식 안내'],['E30','내PC지키미 점검 정리','전략경영실 · 적용'],['E07','AI 활용 윤리 지침안','전략경영실 · 공동 검토']]],
 ['문서·서식 관리',[['E06','HWPX 문서 체계 전환','전략경영실 · 적용 지원'],['E32','HWPX 변환 도구','전략경영실 · 안내']]],
 ['활용 현황·수요조사',[['E02','전 직원 AI 활용성 조사','전략경영실 · 분석 완료']]]
];
function renderDevList(){
 byId('devlist').innerHTML=devGroups.map(([cat,items])=>'<div class="dev-group"><h4>'+h(cat)+'<span>'+items.length+'</span></h4>'+items.map(([id,t,m])=>'<button data-case="'+id+'"><strong>'+h(t)+'</strong><small>'+h(m)+'</small></button>').join('')+'</div>').join('');
}

function init(){
 renderFigures();renderStages(0);renderMeetings(0);renderMilestones();renderProducts();renderDevList();
 byId('stage-track').addEventListener('click',e=>{const b=e.target.closest('[data-stage]');if(b)renderStages(+b.dataset.stage)});
 byId('meeting-track').addEventListener('click',e=>{const b=e.target.closest('[data-meeting]');if(b)renderMeetings(+b.dataset.meeting)});
 byId('milestone-filter').addEventListener('click',e=>{const b=e.target.closest('[data-mfilter]');if(b){milestoneFilter=b.dataset.mfilter;renderMilestones()}});
 document.addEventListener('click',e=>{const b=e.target.closest('[data-jump]');if(b){const t=byId(b.dataset.jump);if(t)t.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}});
}
init();
window.AX_V4={figures,stages,meetings,months,products,devGroups};
})();
