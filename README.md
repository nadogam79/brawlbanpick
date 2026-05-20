# Brawl Pick — 브롤스타즈 밴픽 시뮬레이터

> 경쟁전 유저를 위한 모바일 밴픽 보조 앱

**브롤스타즈 밴픽 시뮬레이터** (React Native · 크로스플랫폼).
경쟁전 밴픽 세션을 실시간으로 진행하며, 모드별 브롤러 추천·티어리스트·
드래프트 시뮬레이션을 제공합니다.

- 상세 설계: [PLAN.md](PLAN.md)
- 작업 규칙·컨벤션: [CLAUDE.md](CLAUDE.md)

## 프로젝트 구조

```
.
├── src/
│   ├── screens/                       # 화면 컴포넌트
│   │   ├── HomeScreen.tsx             # 모드 선택 / 최근 세션 기록
│   │   ├── BanPickScreen.tsx          # 실시간 밴/픽 진행
│   │   ├── ResultScreen.tsx           # 결과 & 브롤러 추천
│   │   ├── SimulatorScreen.tsx        # 드래프트 시뮬레이터
│   │   └── TierListScreen.tsx         # 모드별 티어리스트
│   │
│   ├── components/                    # 재사용 UI 컴포넌트
│   │   ├── BrawlerCard.tsx            # 브롤러 카드 (아이콘·등급 표시)
│   │   ├── BanSlot.tsx                # 밴 슬롯 UI
│   │   ├── PickSlot.tsx               # 픽 슬롯 UI
│   │   ├── ModeSelector.tsx           # 게임 모드 선택기
│   │   ├── TierBadge.tsx              # 티어 뱃지 (S/A/B/C)
│   │   └── RecommendCard.tsx          # 추천 브롤러 카드
│   │
│   ├── data/                          # 정적 게임 데이터
│   │   ├── brawlers.json              # 브롤러 목록·스탯·클래스
│   │   ├── modes.json                 # 게임 모드 목록
│   │   ├── tiers.json                 # 모드별 브롤러 티어
│   │   └── counters.json              # 브롤러 간 상성 매트릭스
│   │
│   ├── store/                         # Zustand 전역 상태
│   │   ├── sessionStore.ts            # 밴픽 세션 상태 (밴 목록·픽 순서)
│   │   ├── settingsStore.ts           # 앱 설정 (모드·언어 등)
│   │   └── historyStore.ts            # 세션 기록
│   │
│   ├── hooks/                         # 커스텀 훅
│   │   ├── useBanPick.ts              # 밴픽 세션 로직
│   │   ├── useRecommend.ts            # 추천 브롤러 계산
│   │   └── useTierList.ts             # 티어리스트 데이터
│   │
│   └── utils/                         # 유틸리티
│       ├── recommendEngine.ts         # 모드·상성 기반 추천 알고리즘
│       ├── counterPick.ts             # 카운터픽 분석 로직
│       └── synergyAnalyzer.ts         # 팀 시너지 분석
│
├── assets/                            # 정적 에셋
│   ├── brawlers/                      # 브롤러 아이콘 이미지
│   └── modes/                         # 모드 썸네일
│
├── app.json
├── package.json
├── tsconfig.json
├── PLAN.md                            # 시스템 설계·데이터 모델·추천 알고리즘 스펙
├── CLAUDE.md                          # 작업 규칙·컨벤션
└── README.md
```

## 빠른 시작

```bash
npm install
npx expo start
```

- iOS 시뮬레이터: `i` 입력
- Android 에뮬레이터: `a` 입력
- 실기기: Expo Go 앱으로 QR 스캔

## 로컬 개발

### 환경 요구사항

[Node.js](https://nodejs.org/) 18 이상, [Expo CLI](https://docs.expo.dev/get-started/installation/) 가 설치되어 있어야 합니다.

```bash
npm install              # 의존성 설치
npx expo start           # 개발 서버 시작 (Metro bundler)

npm run lint             # ESLint 검사
npm run type-check       # TypeScript 타입 검사
npm run test             # Jest 테스트
```

> `brawlers.json`, `tiers.json` 등 게임 데이터는 메타 패치 시 `src/data/`
> 하위 파일을 직접 수정해 반영합니다. 변경 시 `counters.json` 상성 매트릭스도
> 함께 업데이트해 주세요.

### 외부 API 연동 (선택)

실시간 게임 데이터가 필요한 경우 [Brawlify API](https://brawlapi.com/)를 사용합니다.
`.env` 파일을 생성하고 아래 값을 설정하세요.

```env
EXPO_PUBLIC_BRAWLIFY_BASE_URL=https://api.brawlapi.com/v1
```

## 기술 스택

| 영역 | 기술 |
|------|------|
| 앱 프레임워크 | React Native · Expo SDK |
| 언어 | TypeScript |
| 상태관리 | Zustand |
| 서버 상태 / 캐싱 | React Query (TanStack Query) |
| 네비게이션 | React Navigation v6 |
| 게임 데이터 | Brawlify API · 로컬 JSON |

## 디렉터리 컨벤션

- **screens/**: 화면 단위 컴포넌트. 라우팅의 진입점이며 비즈니스 로직은 훅에 위임
- **components/**: 여러 화면에서 재사용되는 UI 단위. 순수하게 props만 의존
- **data/**: 패치 주기로 갱신되는 정적 게임 데이터 (JSON)
- **store/**: Zustand 스토어. 화면 간 공유가 필요한 상태만 전역으로 관리
- **hooks/**: 화면/컴포넌트에서 분리된 로직. `use` 접두사 필수
- **utils/**: 순수 함수 모음. 프레임워크 의존성 없음

## 관련 문서

- [PLAN.md](PLAN.md) — 시스템 설계·추천 알고리즘·상성 매트릭스·데이터 스키마
- [CLAUDE.md](CLAUDE.md) — 작업 규칙·컨벤션