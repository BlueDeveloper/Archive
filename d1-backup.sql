PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE `deadlines` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` integer,
	`label` text NOT NULL,
	`description` text,
	`date` text NOT NULL,
	`type` text DEFAULT 'deadline',
	`sort_order` integer DEFAULT 0
);
INSERT INTO "deadlines" ("id","project_id","label","description","date","type","sort_order") VALUES(43,53,'엄태영 - 푸드트럭 납품완료','납품 완료 (2026-04-06)','2026-04-06','milestone',1);
INSERT INTO "deadlines" ("id","project_id","label","description","date","type","sort_order") VALUES(44,52,'홍연서 - 펫관리 앱 (중간발표)','졸업작품 중간 발표 - 데모 준비 필요','2026-04-17','milestone',2);
INSERT INTO "deadlines" ("id","project_id","label","description","date","type","sort_order") VALUES(45,50,'민세홍 - 나침반 호스팅 만료','Cloudflare 호스팅 운영 만료 (갱신 협의 필요)','2026-05-15','expiry',3);
INSERT INTO "deadlines" ("id","project_id","label","description","date","type","sort_order") VALUES(46,54,'김보경 - 냉장고를 부탁해','정산완료 (2026-04-04)','2026-04-04','deadline',4);
INSERT INTO "deadlines" ("id","project_id","label","description","date","type","sort_order") VALUES(47,52,'홍연서 - 펫관리 앱 (최종)','졸업작품 최종 종료 (계약 end_date)','2026-05-08','deadline',5);
INSERT INTO "deadlines" ("id","project_id","label","description","date","type","sort_order") VALUES(48,49,'최설아 - 세라스룸 AS 만료','AS 1개월 종료 (03.13) → 건별 수정 전환 (건당 20,000원)','2026-03-13','expiry',6);
INSERT INTO "deadlines" ("id","project_id","label","description","date","type","sort_order") VALUES(49,53,'엄태영 - 푸드트럭 A/S 만료','2개월 무료 A/S 종료','2026-06-06','expiry',7);
INSERT INTO "deadlines" ("id","project_id","label","description","date","type","sort_order") VALUES(50,59,'임지 - 밸런도그 납품','종료예정일','2026-04-25','deadline',8);
INSERT INTO "deadlines" ("id","project_id","label","description","date","type","sort_order") VALUES(51,59,'임지 - 밸런도그 A/S 만료','A/S 기간 종료 (1개월)','2026-05-25','expiry',9);
INSERT INTO "deadlines" ("id","project_id","label","description","date","type","sort_order") VALUES(52,60,'한정민 - 목업 납품','종료예정일','2026-04-19','deadline',10);
INSERT INTO "deadlines" ("id","project_id","label","description","date","type","sort_order") VALUES(53,61,'성수 - MVP 런칭','MVP 서비스 개발완료 목표','2026-05-15','milestone',11);
INSERT INTO "deadlines" ("id","project_id","label","description","date","type","sort_order") VALUES(54,61,'성수 - 쇼핑몰 최종 납품','종료예정일','2026-06-30','deadline',12);
CREATE TABLE `expenses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category` text NOT NULL,
	`label` text NOT NULL,
	`amount` integer NOT NULL,
	`date` text
);
INSERT INTO "expenses" ("id","category","label","amount","date") VALUES(41,'숨고포인트','숨고 충전 금액',75000,'2026-02-06');
INSERT INTO "expenses" ("id","category","label","amount","date") VALUES(42,'숨고포인트','숨고 충전 금액',75000,'2026-02-25');
INSERT INTO "expenses" ("id","category","label","amount","date") VALUES(43,'숨고포인트','숨고 충전 금액',75000,'2026-03-17');
INSERT INTO "expenses" ("id","category","label","amount","date") VALUES(44,'숨고포인트','숨고 충전 금액',75000,'2026-03-23');
INSERT INTO "expenses" ("id","category","label","amount","date") VALUES(45,'숨고포인트','숨고 충전 금액',150000,'2026-04-03');
INSERT INTO "expenses" ("id","category","label","amount","date") VALUES(46,'숨고포인트','숨고 충전 금액',41200,'2026-04-04');
INSERT INTO "expenses" ("id","category","label","amount","date") VALUES(47,'숨고포인트','숨고 충전 금액',25000,'2026-04-05');
INSERT INTO "expenses" ("id","category","label","amount","date") VALUES(48,'기타','애플 개발자 등록',129000,'2026-04-08');
INSERT INTO "expenses" ("id","category","label","amount","date") VALUES(49,'기타','구글 개발자 등록',37726,'2026-04-08');
INSERT INTO "expenses" ("id","category","label","amount","date") VALUES(50,'투자비','힉스필드 스타터팩 구매',26248,'2026-04-12');
INSERT INTO "expenses" ("id","category","label","amount","date") VALUES(51,'기타','피그마 구독',33380,'2026-04-13');
INSERT INTO "expenses" ("id","category","label","amount","date") VALUES(52,'숨고포인트','숨고 충전 금액',50000,'2026-04-15');
INSERT INTO "expenses" ("id","category","label","amount","date") VALUES(53,'숨고포인트','충전금액',25000,'2026-04-21');
INSERT INTO "expenses" ("id","category","label","amount","date") VALUES(54,'숨고포인트','숨고 충전 금액',25000,'2026-04-22');
INSERT INTO "expenses" ("id","category","label","amount","date") VALUES(55,'기타','클로드 프로',33232,'2026-04-23');
INSERT INTO "expenses" ("id","category","label","amount","date") VALUES(56,'기타','클로드 맥스',133901,'2026-04-23');
INSERT INTO "expenses" ("id","category","label","amount","date") VALUES(57,'숨고포인트','숨고 충전 금액',25000,'2026-04-24');
INSERT INTO "expenses" ("id","category","label","amount","date") VALUES(58,'숨고포인트','숨고 충전 금액',25000,'2026-04-29');
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`client` text NOT NULL,
	`folder` text,
	`type` text NOT NULL,
	`platform` text,
	`status` text DEFAULT '진행중' NOT NULL,
	`status_sub` text,
	`amount` integer DEFAULT 0 NOT NULL,
	`deploy_method` text,
	`tech_stack` text,
	`contract_date` text,
	`end_date` text,
	`as_info` text,
	`note` text,
	`sort_order` integer DEFAULT 0,
	`created_at` text DEFAULT '(datetime(''now''))' NOT NULL,
	`updated_at` text DEFAULT '(datetime(''now''))' NOT NULL
, service TEXT, amount_detail TEXT, settlement_status TEXT DEFAULT '미정산');
INSERT INTO "projects" ("id","name","client","folder","type","platform","status","status_sub","amount","deploy_method","tech_stack","contract_date","end_date","as_info","note","sort_order","created_at","updated_at","service","amount_detail","settlement_status") VALUES(49,'세라스룸 UI/UX 수정','최설아','Soomgo/6.serasroom','cafe24','cafe24 쇼핑몰 + 호스팅','완료',NULL,220000,'cafe24 sftp','["Cafe24","HTML/CSS","FTP"]','2026-02-08','2026-02-12','2026-03-13',NULL,1,'(datetime(''now''))','2026-04-19T09:52:11.990Z','A/S 건별(20,000원) 수정','[{"label":"기본견적","amount":150000},{"label":"고객님 팁","amount":50000},{"label":"건당 수정","amount":20000}]','정산완료');
INSERT INTO "projects" ("id","name","client","folder","type","platform","status","status_sub","amount","deploy_method","tech_stack","contract_date","end_date","as_info","note","sort_order","created_at","updated_at","service","amount_detail","settlement_status") VALUES(50,'좌표기반 나침반 모바일 웹','민세홍','Soomgo/1.compass','턴키','모바일 웹','AS','호스팅',600000,'GitHub + Cloudflare Pages CI/CD','["Next.js","TypeScript","CSS","Cloudflare Pages"]','2026-02-07','2026-03-17','2026-05-15',NULL,2,'(datetime(''now''))','2026-04-19T09:10:41.424Z','호스팅 운영(2026.05.15)','[{"label":"기본견적","amount":450000},{"label":"2개월 호스팅 비용","amount":150000}]','정산완료');
INSERT INTO "projects" ("id","name","client","folder","type","platform","status","status_sub","amount","deploy_method","tech_stack","contract_date","end_date","as_info","note","sort_order","created_at","updated_at","service","amount_detail","settlement_status") VALUES(51,'필라테스 정기구독 결제 시스템','서소연','Soomgo/2.pilates','기구축수정','반응형 웹 (WordPress + Cafe24 호스팅)','진행중',NULL,1000000,'Cafe24 호스팅센터 SSH/FTP','["WordPress","PHP","토스페이먼츠","PayPal","ACF","Cafe24 호스팅"]','2026-02-27',NULL,NULL,NULL,3,'(datetime(''now''))','2026-04-19T09:17:17.956Z',NULL,NULL,'미정산');
INSERT INTO "projects" ("id","name","client","folder","type","platform","status","status_sub","amount","deploy_method","tech_stack","contract_date","end_date","as_info","note","sort_order","created_at","updated_at","service","amount_detail","settlement_status") VALUES(52,'MyPetWatch - 펫관리 서비스 앱','홍연서','Soomgo/3.petcare','턴키','Android+iOS 보호자앱 / Android 홈캠앱','진행중',NULL,1200000,'Android: Gradle+Firebase / iOS: Codemagic+TestFlight','["React Native (Expo)","TypeScript","Android","iOS","Firebase App Distribution","Codemagic","TestFlight"]','2026-03-19','2026-05-08',NULL,NULL,1,'(datetime(''now''))','2026-04-19T09:11:12.635Z',NULL,NULL,'정산완료');
INSERT INTO "projects" ("id","name","client","folder","type","platform","status","status_sub","amount","deploy_method","tech_stack","contract_date","end_date","as_info","note","sort_order","created_at","updated_at","service","amount_detail","settlement_status") VALUES(53,'푸드트럭 홍보 사이트','엄태영','Soomgo/4.foodtruck','턴키','반응형 웹','완료','A/S',450000,'Cloudflare Workers (wrangler CLI)','["Next.js","TypeScript","Cloudflare Workers","wrangler"]','2026-03-24','2026-04-06','2026-06-06',NULL,5,'(datetime(''now''))','2026-04-19T09:10:42.674Z','2개월 무료 A/S',NULL,'정산완료');
INSERT INTO "projects" ("id","name","client","folder","type","platform","status","status_sub","amount","deploy_method","tech_stack","contract_date","end_date","as_info","note","sort_order","created_at","updated_at","service","amount_detail","settlement_status") VALUES(54,'냉장고를 부탁해 (과제용 Python)','김보경','Soomgo/5.saveRidge','턴키','Windows 실행형 (exe)','완료',NULL,100000,'PyInstaller exe → zip 전달','["Python","tkinter","PyInstaller"]','2026-03-24','2026-04-04',NULL,NULL,6,'(datetime(''now''))','2026-04-19T09:14:04.999Z',NULL,NULL,'정산완료');
INSERT INTO "projects" ("id","name","client","folder","type","platform","status","status_sub","amount","deploy_method","tech_stack","contract_date","end_date","as_info","note","sort_order","created_at","updated_at","service","amount_detail","settlement_status") VALUES(55,'가비아 도메인 카페24 연결','신용호','Soomgo/7.domain','인프라작업','도메인/호스팅','완료',NULL,30000,'가비아 DNS → 카페24 연결','["가비아","카페24"]','2026-04-03','2026-04-03',NULL,'작업시간 30분',7,'(datetime(''now''))','2026-04-19T09:10:48.030Z',NULL,NULL,'정산완료');
INSERT INTO "projects" ("id","name","client","folder","type","platform","status","status_sub","amount","deploy_method","tech_stack","contract_date","end_date","as_info","note","sort_order","created_at","updated_at","service","amount_detail","settlement_status") VALUES(58,'대학생 과제 풀이','주하영',NULL,'과제풀이',NULL,'완료',NULL,50000,'풀이집 압축 전달',NULL,'2026-04-10','2026-04-11',NULL,NULL,0,'(datetime(''now''))','2026-04-19T09:10:37.505Z',NULL,NULL,'정산완료');
INSERT INTO "projects" ("id","name","client","folder","type","platform","status","status_sub","amount","deploy_method","tech_stack","contract_date","end_date","as_info","note","sort_order","created_at","updated_at","service","amount_detail","settlement_status") VALUES(59,'카페24 밸런도그 디자인 수정','임지','7.moogyroom','cafe24','cafe24 쇼핑몰 + 호스팅','진행중',NULL,500000,'cafe24 sftp','["Cafe24","HTML5","CSS3","JavaScript","jQuery","Swiper.js"]','2026-04-06','2026-04-25','2026-04-25 ~ 2026-05-25','밸런도그 브랜드, mongyroom.cafe24.com, WinSCP SFTP 배포',0,'(datetime(''now''))','2026-04-19T09:50:45.867Z','https://mongyroom.cafe24.com/member/join.html','[{"label":"디자인 수정","amount":500000}]','미정산');
INSERT INTO "projects" ("id","name","client","folder","type","platform","status","status_sub","amount","deploy_method","tech_stack","contract_date","end_date","as_info","note","sort_order","created_at","updated_at","service","amount_detail","settlement_status") VALUES(60,'목업 사이트 제작','한정민','Soomgo/8.mockup','턴키','React SPA (Vite)','진행중',NULL,690000,'Cloudflare Pages (GitHub Actions CI/CD)','["React 19","TypeScript","Vite","Tailwind CSS","Recharts","Motion","Lucide","Google Gemini API"]','2026-04-07','2026-04-25',NULL,'DauData 파트너 포털 목업, 고객사: 다우데이타(연결매출 1.2조), Phase 3(116건)+코드감사(6건) 무상 포함',0,'2026-04-15 04:29:10','2026-04-29T23:50:42.903Z','https://mockup-2yk.pages.dev/','[{"label":"디자인 리뉴얼+핵심","amount":400000},{"label":"기능 고도화","amount":150000},{"label":"2026.04.23 연장","amount":20000},{"label":"2026.04.24 연장","amount":20000},{"label":"2026.04.25 연장","amount":20000},{"label":"2026.04.26 연장","amount":20000},{"label":"2026.04.27 연장","amount":20000},{"label":"2026.04.28 연장","amount":20000},{"label":"2026.04.30 연장","amount":20003}]','미정산');
INSERT INTO "projects" ("id","name","client","folder","type","platform","status","status_sub","amount","deploy_method","tech_stack","contract_date","end_date","as_info","note","sort_order","created_at","updated_at","service","amount_detail","settlement_status") VALUES(62,'레이시오 쇼핑몰(보류)','임성수','C:/BLUE/Project/blue/Soomgo/10.latio','cafe24','cafe24 쇼핑몰 + 호스팅','진행중',NULL,0,'cafe24 sftp','["카페24","HTML","CSS","JavaScript"]','2026-04-16','2026-12-31',NULL,NULL,0,'2026-04-18 07:36:54','2026-04-24T04:07:48.767Z',NULL,NULL,'미정산');
INSERT INTO "projects" ("id","name","client","folder","type","platform","status","status_sub","amount","deploy_method","tech_stack","contract_date","end_date","as_info","note","sort_order","created_at","updated_at","service","amount_detail","settlement_status") VALUES(63,'통신사 견적출력 사이트','택군','Soomgo/11.telequote/telequote','외주','PC','진행중',NULL,600000,'Cloudflare Pages','["Next.js","TypeScript","CSS Modules"]','2026-04-24',NULL,NULL,'숨고 수주. 바로폼(baroform.com) 벤치마킹. 견적서 작성/출력 + 통신사별 요금제 + 문자 발송 기능',0,'(datetime(''now''))','2026-04-25 16:46:00','통신사 견적서 출력',NULL,'미정산');
CREATE TABLE `settlements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` integer NOT NULL,
	`category` text NOT NULL,
	`label` text NOT NULL,
	`amount` integer NOT NULL,
	`date` text
);
INSERT INTO "settlements" ("id","project_id","category","label","amount","date") VALUES(70,49,'확정','최설아 - 세라스룸 (수정)',150000,'2026-02-12');
INSERT INTO "settlements" ("id","project_id","category","label","amount","date") VALUES(71,49,'확정','최설아 - 팁',50000,'2026-02-12');
INSERT INTO "settlements" ("id","project_id","category","label","amount","date") VALUES(72,49,'확정','최설아 - 건별수정 (2026.03.25)',20000,'2026-03-25');
INSERT INTO "settlements" ("id","project_id","category","label","amount","date") VALUES(73,50,'확정','민세홍 - 나침반 (구축)',450000,'2026-03-17');
INSERT INTO "settlements" ("id","project_id","category","label","amount","date") VALUES(74,50,'확정','민세홍 - 나침반 (호스팅)',150000,'2026-03-17');
INSERT INTO "settlements" ("id","project_id","category","label","amount","date") VALUES(75,51,'예정','서소연 - 필라테스 구독 결제',1000000,NULL);
INSERT INTO "settlements" ("id","project_id","category","label","amount","date") VALUES(76,52,'확정','홍연서 - 펫관리 앱',1200000,'2026-04-04');
INSERT INTO "settlements" ("id","project_id","category","label","amount","date") VALUES(77,53,'확정','엄태영 - 푸드트럭',450000,'2026-04-06');
INSERT INTO "settlements" ("id","project_id","category","label","amount","date") VALUES(78,54,'확정','김보경 - 냉장고를 부탁해',100000,'2026-04-04');
INSERT INTO "settlements" ("id","project_id","category","label","amount","date") VALUES(79,55,'확정','신용호 - 가비아 도메인 카페24 연결',30000,'2026-04-03');
INSERT INTO "settlements" ("id","project_id","category","label","amount","date") VALUES(81,58,'잔금','프로젝트 완료',50000,'2026-04-07');
INSERT INTO "settlements" ("id","project_id","category","label","amount","date") VALUES(82,59,'예정','임지 - 밸런도그 디자인 수정',500000,'2026-04-25');
INSERT INTO "settlements" ("id","project_id","category","label","amount","date") VALUES(83,60,'예정','한정민 - 목업 사이트 제작',550000,'2026-04-19');
INSERT INTO "settlements" ("id","project_id","category","label","amount","date") VALUES(84,61,'예정','성수 - 쇼핑몰 제작',900000,NULL);
CREATE TABLE `timelines` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` integer NOT NULL,
	`date` text NOT NULL,
	`description` text NOT NULL,
	`color` text DEFAULT 'green',
	`sort_order` integer DEFAULT 0
);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(156,49,'2026-02-08','계약 체결','green',1);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(157,49,'2026-02-12','작업 완료 및 납품','green',2);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(158,49,'2026-03-13','AS 1개월 만료','orange',3);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(159,49,'2026-03-25','건별 수정 추가 요청 (20,000원)','yellow',4);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(160,50,'2026-02-07','계약 체결','green',1);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(161,50,'2026-03-17','개발 완료 및 납품','green',2);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(162,50,'2026-05-17','호스팅 2개월 만료 (갱신 협의 필요)','yellow',3);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(163,51,'2026-02-27','계약 체결','green',1);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(164,51,'2026-03-03','Phase 1~3 완료 (테이블조회, 통화변환, 환불 + 토스 API 연동)','green',2);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(165,51,'진행중','토스페이먼츠 추가 계약 진행 (고객 측)','yellow',3);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(166,51,'예정','Phase 4: 개별 코스 구독제 전환','dim',4);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(167,51,'예정','Phase 5~6: 가격정책 변경 + QA','dim',5);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(168,52,'2026-03-19','계약 체결','green',1);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(169,52,'2026-03-26','개발 진행중 (MyPetWatch 보호자앱 + MyPetWatchCam 홈캠앱)','yellow',2);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(171,53,'2026-03-24','계약 체결 + 메뉴/후기 사진 소재 수령','green',1);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(172,53,'2026-03-26','개발 진행중','yellow',2);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(173,53,'2026-04-06','종료예정일','red',3);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(174,54,'2026-03-24','계약 체결','green',1);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(175,54,'2026-03-25','exe 빌드 완료 (dist/), QA 테스트 + 사용설명서 작성 완료','green',2);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(176,54,'2026-04-04','정산완료','green',3);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(177,55,'2026-04-03','계약 체결 및 작업 완료 (가비아 도메인 → 카페24 연결)','green',1);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(178,59,'2026-04-06','밸런도그 디자인 수정 계약','green',0);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(179,59,'2026-04-08','벤치마킹 사이트 업데이트로 일정 지연','red',0);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(180,58,'2026-04-10','대학생 과제풀이 계약','green',0);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(181,58,'2026-04-11','풀이집 전달','green',0);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(182,59,'2026-04-13','일러스트를 위한 힉스필드 결제 진행 및 견적금액에서 정산예정','yellow',0);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(183,51,'2026-04-05','토스페이먼츠 추가계약 지연으로 인한 프로젝트 지연 발생','red',3);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(184,52,'2026-04-04','리뷰작성을 위한 미리 정산 완료','green',0);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(185,60,'2026-04-07','목업 사이트 제작 계약','green',0);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(186,60,'2026-04-13','Phase 1 완료 (디자인 리뉴얼+핵심 8건), CI/CD 구축','green',0);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(187,60,'2026-04-14','Phase 2/3 + 코드감사 전체 완료 (155건)','green',0);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(188,61,'2026-04-15','RATIO 쇼핑몰 제작 계약','green',0);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(189,62,'2026-04-16','계약 체결','green',0);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(190,62,'2026-04-21','고객의 일방적 보류 통보','red',1);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(191,60,'2026-04-23','연장(+20,000)','green',3);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(192,60,'2026-04-24','연장(+20,000)','green',4);
INSERT INTO "timelines" ("id","project_id","date","description","color","sort_order") VALUES(193,60,'2026-04-25','연장(+20,000)','green',5);
CREATE TABLE `work_hours` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`project_id` integer NOT NULL,
	`source` text NOT NULL,
	`total_hours` real NOT NULL,
	`commits` integer,
	`work_days` integer,
	`avg_hours_per_day` real,
	`hourly_rate` integer,
	`file_count` integer,
	`note` text
);
INSERT INTO "work_hours" ("id","project_id","source","total_hours","commits","work_days","avg_hours_per_day","hourly_rate","file_count","note") VALUES(49,50,'git',24,113,4,6,25000,NULL,'git log ��� ���� (2026-04-30)');
INSERT INTO "work_hours" ("id","project_id","source","total_hours","commits","work_days","avg_hours_per_day","hourly_rate","file_count","note") VALUES(50,51,'file',10,NULL,4,NULL,100000,3,NULL);
INSERT INTO "work_hours" ("id","project_id","source","total_hours","commits","work_days","avg_hours_per_day","hourly_rate","file_count","note") VALUES(51,52,'git',66,101,11,6,18182,NULL,'git log ��� ���� (2026-04-30)');
INSERT INTO "work_hours" ("id","project_id","source","total_hours","commits","work_days","avg_hours_per_day","hourly_rate","file_count","note") VALUES(52,53,'file',90,NULL,15,6,5000,110,'���� Ÿ�ӽ����� ��� ���� (2026-04-30)');
INSERT INTO "work_hours" ("id","project_id","source","total_hours","commits","work_days","avg_hours_per_day","hourly_rate","file_count","note") VALUES(53,54,'file',18,NULL,3,6,5556,14,'���� Ÿ�ӽ����� ��� ���� (2026-04-30)');
INSERT INTO "work_hours" ("id","project_id","source","total_hours","commits","work_days","avg_hours_per_day","hourly_rate","file_count","note") VALUES(54,49,'file',6,NULL,1,6,36667,508,'���� Ÿ�ӽ����� ��� ���� (2026-04-30)');
INSERT INTO "work_hours" ("id","project_id","source","total_hours","commits","work_days","avg_hours_per_day","hourly_rate","file_count","note") VALUES(55,55,'manual',0.5,NULL,1,0.5,60000,NULL,'도메인 연결 작업 30분');
INSERT INTO "work_hours" ("id","project_id","source","total_hours","commits","work_days","avg_hours_per_day","hourly_rate","file_count","note") VALUES(56,58,'manual',2,NULL,1,2,50000,NULL,'과제풀이 수동 추정');
INSERT INTO "work_hours" ("id","project_id","source","total_hours","commits","work_days","avg_hours_per_day","hourly_rate","file_count","note") VALUES(57,60,'git',84,59,14,6,8214,45,'git log ��� ���� (2026-04-30)');
INSERT INTO "work_hours" ("id","project_id","source","total_hours","commits","work_days","avg_hours_per_day","hourly_rate","file_count","note") VALUES(58,59,'file',90,NULL,15,6,5556,932,'���� Ÿ�ӽ����� ��� (2026-04-30)');
INSERT INTO "work_hours" ("id","project_id","source","total_hours","commits","work_days","avg_hours_per_day","hourly_rate","file_count","note") VALUES(59,63,'git',24,75,4,6,25000,NULL,'git log ��� (2026-04-30)');
CREATE TABLE settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
INSERT INTO "settings" ("key","value") VALUES('admin_password_hash','f294d92332a5738f751115b4092a21e237c2a9e1223343676d56ad9d5d6d8c07');
DELETE FROM sqlite_sequence;
INSERT INTO "sqlite_sequence" ("name","seq") VALUES('projects',63);
INSERT INTO "sqlite_sequence" ("name","seq") VALUES('timelines',193);
INSERT INTO "sqlite_sequence" ("name","seq") VALUES('settlements',84);
INSERT INTO "sqlite_sequence" ("name","seq") VALUES('expenses',58);
INSERT INTO "sqlite_sequence" ("name","seq") VALUES('work_hours',59);
INSERT INTO "sqlite_sequence" ("name","seq") VALUES('deadlines',54);
