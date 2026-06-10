# 개발 컨벤션

> **문서 상태**: 초안 (Draft) · **버전**: 0.1 · **작성일**: 2026-04-17 · **관리**: 솔루션개발실

이 문서는 솔루션개발실 전 팀원이 코드 작성·협업 시 따라야 할 컨벤션을 정의합니다.

---

## 1. 코드 스타일

### 1.1 언어별 기준 가이드

> ⚠️ TODO: 팀별 언어 버전(Java 17/21, Python 3.10/3.11 등) 확정 후 업데이트

| 언어 | 스타일 가이드 | 포매터 / 린터 | 적용 팀 |
|---|---|---|---|
| Java | Google Java Style Guide | Checkstyle | 개발1팀 |
| Kotlin | Kotlin Coding Conventions | ktlint | 개발1팀 |
| Python | PEP 8 | Black + isort + flake8 | 개발2팀 |
| JavaScript | Airbnb Style Guide | ESLint + Prettier | 개발1팀 |
| TypeScript | Airbnb Style Guide (TS) | ESLint + Prettier | 개발1팀 |
| SQL | 키워드 대문자, 들여쓰기 2칸 | — | 공통 |

### 1.2 공통 원칙

- **단일 책임**: 함수·메서드는 한 가지 일만 한다. 20줄 초과 시 분리 검토
- **의미 있는 이름**: 축약어보다 명확한 전체 단어 사용 (`usrLoc` ❌ → `userLocation` ✅)
- **매직 넘버 금지**: 숫자 리터럴은 상수로 정의 (`if (count > 5)` ❌ → `if (count > MAX_RETRY_COUNT)` ✅)
- **주석**: 무엇이 아닌 **왜**를 설명한다. 코드가 명확하다면 주석 불필요
- **에러 처리**: 빈 catch 블록·예외 무시 금지. 최소한 로그 출력
- **로그**: 운영 환경에서 개인정보·인증키 로깅 금지

### 1.3 Java / Kotlin

- 들여쓰기: 스페이스 **4칸** (탭 금지)
- 최대 줄 길이: **120자**
- 클래스 내 순서: `static final` → 인스턴스 필드 → 생성자 → public 메서드 → private 메서드

```java
// ✅ Good
public class LocationService {
    private static final int MAX_ACCURACY_METER = 50;

    public Optional<Location> findNearestPoint(double lat, double lng) {
        // 외부 API 응답이 null일 수 있어 Optional로 래핑
        return locationRepository.findNearest(lat, lng, MAX_ACCURACY_METER);
    }
}

// ❌ Bad
public class ls {
    public Location f(double a, double b) {
        return locationRepository.findNearest(a, b, 50); // 매직 넘버
    }
}
```

### 1.4 Python

- 들여쓰기: 스페이스 **4칸**
- 최대 줄 길이: **100자**
- Type hint 필수 (함수 파라미터·반환 타입)
- Docstring: Google Style 사용

```python
# ✅ Good
MAX_RETRY_COUNT = 3
LOCATION_ACCURACY_METER = 50.0

def get_nearest_location(lat: float, lng: float) -> Optional[Location]:
    """GPS 좌표 기반 가장 가까운 위치 반환.

    정확도 기준(LOCATION_ACCURACY_METER) 내 결과 없으면 None 반환.
    """
    return location_repo.find_nearest(lat, lng, LOCATION_ACCURACY_METER)

# ❌ Bad
def get_loc(a, b):
    return location_repo.find_nearest(a, b, 50)
```

### 1.5 JavaScript / TypeScript

- 들여쓰기: 스페이스 **2칸**
- 세미콜론: 필수
- `var` 사용 금지 → `const` / `let` 사용
- TypeScript: `any` 타입 사용 최소화, 불가피한 경우 주석으로 사유 명시

```typescript
// ✅ Good
const MAX_RETRY_COUNT = 3;

async function getUserLocation(userId: string): Promise<Location | null> {
    // 외부 API 타임아웃 발생 시 null 반환 (재시도는 호출자 책임)
    const result = await locationApi.fetch(userId);
    return result ?? null;
}

// ❌ Bad
async function getloc(id) {
    return await locationApi.fetch(id);
}
```

---

## 2. 네이밍 컨벤션

### 2.1 공통 규칙

| 대상 | 규칙 | 예시 |
|---|---|---|
| 클래스 / 인터페이스 | PascalCase | `LocationService`, `UserRepository` |
| 함수 / 메서드 (Java·JS) | camelCase, 동사 시작 | `getUserLocation`, `calculateDistance` |
| 함수 / 메서드 (Python) | snake_case, 동사 시작 | `get_user_location`, `calculate_distance` |
| 변수 (Java·JS) | camelCase | `userLocation`, `retryCount` |
| 변수 (Python) | snake_case | `user_location`, `retry_count` |
| 상수 | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT`, `DEFAULT_TIMEOUT_MS` |
| 파일명 (JS/TS) | kebab-case | `location-service.ts`, `user-api.ts` |
| 파일명 (Java) | PascalCase | `LocationService.java` |
| 파일명 (Python) | snake_case | `location_service.py` |
| DB 테이블 | snake_case, 복수형 | `user_locations`, `position_logs` |
| DB 컬럼 | snake_case | `created_at`, `accuracy_meter` |
| API 엔드포인트 | kebab-case, 복수형 명사 | `/api/v1/user-locations` |
| 환경변수 | UPPER_SNAKE_CASE | `DB_HOST`, `API_SECRET_KEY` |

### 2.2 Boolean 네이밍

`is`, `has`, `can`, `should` prefix 사용

```
isActive  /  hasPermission  /  canRetry  /  shouldRefresh
```

### 2.3 CSS 클래스명

- **kebab-case** 사용 (`org-slide-header` ✅, `orgSlide__header` ❌)
- 색상·외형 기반 이름 지양 → 역할·위치 기반 이름 사용 (`glow-accent` ✅, `bg-green` ❌)
- 컴포넌트 단위 prefix로 스코프 명확화 (`org-slide-logo`, `org-slide-header`)
- BEM 구분자(`__`, `--`) 사용 안 함

```css
/* ✅ Good */
.org-slide-glow-accent { ... }
.org-slide-header { ... }

/* ❌ Bad */
.slide-org__bg-green { ... }   /* BEM + 색상명 */
.orgSlideHeader { ... }        /* camelCase */
```

### 2.4 컬렉션 / 배열

복수형 사용: `users` (✅) vs `user` (❌)

```
locationList → locations  /  userArray → users
```

---

## 3. 브랜치 전략

### 3.1 브랜치 모델 (Git Flow)

```
main         ── 운영(Production) 배포 전용. 직접 Push 금지
└─ develop   ── 개발 통합 브랜치. 모든 feature는 여기로 머지
   ├─ feature/    ── 기능 개발. develop에서 분기
   ├─ release/    ── 배포 준비 (QA). develop → main 전 단계
   └─ hotfix/     ── 운영 긴급 패치. main에서 분기, main+develop 동시 머지
```

개발2팀 추가 브랜치:
```
experiment/  ── AI 모델·알고리즘 실험 전용. develop 머지 불필요할 수 있음
```

### 3.2 브랜치 네이밍 규칙

| 유형 | 패턴 | 예시 |
|---|---|---|
| feature | `feature/{이슈번호}-{동사-설명}` | `feature/123-add-gps-filter` |
| release | `release/{버전}` | `release/2.1.0` |
| hotfix | `hotfix/{이슈번호}-{동사-설명}` | `hotfix/456-fix-null-location` |
| experiment | `experiment/{모델명}-{실험내용}` | `experiment/indoor-model-kalman-v2` |

- 영문 소문자 + 하이픈(`-`) 사용. 언더스코어·대문자 금지
- 설명부는 동사로 시작 (`add`, `fix`, `update`, `remove`, `refactor`)
- 브랜치 생성 전 Jira 이슈 등록 필수

### 3.3 브랜치 보호 정책

| 브랜치 | 직접 Push | PR 필수 | 리뷰어 수 | CI 통과 |
|---|---|---|---|---|
| `main` | ❌ | ✅ | 팀장 포함 2명 | ✅ |
| `develop` | ❌ | ✅ | 1명 이상 | ✅ |
| `release/*` | ❌ | ✅ | 팀장 1명 | ✅ |
| `feature/*` | ✅ | — | — | — |
| `experiment/*` | ✅ | — | — | — |

### 3.4 브랜치 생명주기

- `feature/*` : PR 머지 후 즉시 삭제
- `release/*` : main 머지 후 즉시 삭제
- `hotfix/*` : main + develop 머지 후 즉시 삭제
- `experiment/*` : 실험 종료 후 팀장 확인 후 삭제

---

## 4. 커밋 메시지 규칙

### 4.1 형식 (Conventional Commits)

```
{타입}({범위}): {제목}    ← 필수, 50자 이내

{본문}                    ← 선택, 72자 줄바꿈

{꼬리말}                  ← 선택
```

작성 예시:

```
feat(location): 실내 GPS 보정 알고리즘 추가

Kalman 필터 적용으로 단순 평균 방식 대비 정확도 개선.
실내 환경 기준 오차 반경 3m → 1.5m 수준으로 향상.
기존 단순 평균 로직은 LegacyLocationFilter로 분리 보존.

Closes #123
Refs #100
```

### 4.2 커밋 타입

| 타입 | 사용 시점 | 예시 |
|---|---|---|
| `feat` | 새로운 기능 추가 | `feat(api): 위치 이력 조회 API 추가` |
| `fix` | 버그 수정 | `fix(location): null 좌표 예외 처리 누락 수정` |
| `refactor` | 기능 변경 없는 코드 구조 개선 | `refactor(service): 중복 계산 로직 분리` |
| `perf` | 성능 개선 | `perf(query): 위치 조회 인덱스 추가로 응답 개선` |
| `test` | 테스트 코드 추가·수정 | `test(location): 거리 계산 엣지 케이스 추가` |
| `docs` | 문서 수정 | `docs(readme): 로컬 실행 가이드 업데이트` |
| `chore` | 빌드·패키지 설정 | `chore: gradle 의존성 버전 업데이트` |
| `style` | 포매팅·세미콜론 등 | `style: Prettier 적용` |
| `ci` | CI/CD 파이프라인 변경 | `ci: GitHub Actions 배포 워크플로 추가` |
| `revert` | 이전 커밋 되돌리기 | `revert: feat(location) 롤백 (성능 저하 이슈)` |

### 4.3 작성 규칙

- 제목: **50자 이내**, 마침표 없음, 명령형 현재 시제 (`추가했다` ❌ → `추가` ✅)
- 본문: 필요한 경우만. 한 줄 72자 제한. 무엇을보다 **왜**를 설명
- 이슈 연결: `Closes #번호` (해결), `Refs #번호` (참조)
- WIP 커밋은 `wip:` 타입 허용하되 PR 전 반드시 정리 (squash 또는 amend)

---

## 5. PR (Pull Request) 규칙

### 5.1 PR 생성 원칙

- **단일 목적**: 하나의 PR은 하나의 기능·버그픽스만 포함
- **적정 크기**: 변경 파일 10개 이하, 변경 라인 400줄 이하 권장. 초과 시 팀장과 협의하여 분리 여부 결정
- **WIP PR**: 제목에 `[WIP]` 표시. 완료 전 머지 금지
- PR 등록 전 자체 리뷰(diff 확인) 필수

### 5.2 PR 제목 형식

```
{타입}({범위}): {변경 내용 요약}
```

예: `feat(location-api): 사용자 실시간 위치 조회 엔드포인트 추가`

### 5.3 PR 본문 템플릿

```markdown
## 변경 내용
<!-- 무엇을, 왜 변경했는지 설명 -->

## 주요 변경 파일
- `src/location/LocationService.java` — 핵심 로직 변경
- `src/location/LocationController.java` — 엔드포인트 추가

## 테스트 방법
<!-- 검증 방법, 테스트 명령, 확인 시나리오 -->

## 스크린샷 (UI 변경 시)

## 체크리스트
- [ ] 단위 테스트 작성 또는 업데이트
- [ ] 로컬 빌드·테스트 통과 확인
- [ ] 민감 정보(키·비밀번호) 코드에 미포함 확인

## 관련 이슈
Closes #
```

### 5.4 코드 리뷰 규칙

**리뷰어:**
- PR 등록 후 1 영업일 이내 리뷰 시작
- 피드백 prefix로 중요도 구분:

| Prefix | 의미 | 머지 블로킹 |
|---|---|---|
| `필수:` | 반드시 수정해야 머지 가능 | ✅ |
| `제안:` | 개선 제안. 수용 여부는 작성자 판단 | ❌ |
| `질문:` | 이해를 위한 질문. 논의 후 결정 | ❌ |
| `nit:` | 사소한 스타일·오타 지적 | ❌ |

**작성자:**
- 리뷰 코멘트 1 영업일 이내 응답
- 반영하지 않는 경우 사유를 댓글로 명시
- 승인 완료 후 작성자가 직접 머지

### 5.5 머지 전략

| 대상 브랜치 | 머지 방식 | 이유 |
|---|---|---|
| `develop ← feature/*` | Squash Merge | 히스토리 간결화 |
| `main ← release/*` | Merge Commit | 릴리즈 히스토리 보존 |
| `main ← hotfix/*` | Merge Commit | 핫픽스 추적 용이 |

---

## 6. 테스트 컨벤션

### 6.1 테스트 작성 원칙

- 비즈니스 로직 함수에 단위 테스트 필수
- 외부 의존성(DB, API)은 Mock 처리
- 테스트 코드는 실 코드와 동일한 품질 기준 적용
- 테스트는 독립적으로 실행 가능해야 함 (순서·상태 의존 금지)

### 6.2 테스트 네이밍

패턴: `{테스트_대상}_when{조건}_then{기대_결과}`

| 언어 | 예시 |
|---|---|
| Java | `getUserLocation_whenUserNotFound_thenReturnEmpty` |
| Python | `test_get_user_location_when_user_not_found_then_return_none` |
| JavaScript | `getUserLocation: should return null when user not found` |

### 6.3 커버리지 목표

> ⚠️ TODO: CI 파이프라인 커버리지 게이트 수치 및 실패 기준 확정 필요

| 구분 | 목표 |
|---|---|
| 신규 개발 코드 전체 | 70% 이상 |
| 핵심 비즈니스 로직 | 90% 이상 |
| AI 모델 추론 모듈 | 80% 이상 |

---

## 변경 이력

| 버전 | 날짜 | 내용 | 작성자 |
|---|---|---|---|
| 0.1 | 2026-04-17 | 초안 작성 | 솔루션개발실 |

> 💬 의견·수정 제안은 팀장에게 전달해 주세요.
