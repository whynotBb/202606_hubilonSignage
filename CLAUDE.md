# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어 및 커뮤니케이션 규칙

- **기본 응답 언어**: 한국어
- **코드 주석**: 한국어로 작성
- **문서화**: 한국어로 작성
- **변수명/함수명**: 영어 (코드 표준 준수)

## 개발 컨벤션

전체 컨벤션은 [`CONVENTION.md`](./CONVENTION.md)를 참조한다.
코드 작성·리뷰·커밋·PR 시 반드시 준수한다.

### 커밋 메시지 (Conventional Commits)

```
{타입}({범위}): {제목}   ← 50자 이내, 마침표 없음, 명령형

{본문}                   ← 선택. 왜 변경했는지 설명

Closes #이슈번호
```

| 타입 | 사용 시점 |
|---|---|
| `feat` | 새 기능 |
| `fix` | 버그 수정 |
| `refactor` | 코드 구조 개선 (기능 변경 없음) |
| `style` | 포매팅·세미콜론 등 |
| `docs` | 문서 수정 |
| `chore` | 빌드·설정 변경 |

### 네이밍 핵심 규칙 (JS/TS 기준)

- 파일명: **kebab-case** (`location-service.js`)
- 함수·변수: **camelCase**, 동사 시작 (`getUserLocation`)
- 상수: **UPPER_SNAKE_CASE** (`MAX_RETRY_COUNT`)
- Boolean: `is` / `has` / `can` / `should` prefix (`isActive`)
- 컬렉션: 복수형 (`users`, `locations`)
- `var` 금지 → `const` / `let`
- 들여쓰기: 스페이스 **2칸**, 세미콜론 **필수**

## 프로젝트 개요

Hubilon 디지털 사이니지 프로젝트. 순수 HTML/CSS/JavaScript로 구성되며, Tailwind CSS CDN을 스타일링에 활용한다. 빌드 도구 없이 브라우저에서 직접 실행된다.

## 프로젝트 구조

```
02_hubilonSignage/
├── index.html      # 메인 진입점 (Tailwind CDN 포함)
└── signage_src/
    └── js/
        └── main.js # 메인 스크립트
```

## Tailwind CSS (CDN)

`index.html` `<head>`에 CDN 스크립트 태그로 포함:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

Tailwind 테마 커스터마이징이 필요한 경우 CDN 스크립트 이후에 인라인 스크립트로 설정:

```html
<script>
	tailwind.config = {
		theme: {
			extend: {},
		},
	};
</script>
```

## 사이니지 개발 유의사항

- 화면 해상도와 비율에 맞는 레이아웃 설계 (일반적으로 16:9, 1920×1080)
- 콘텐츠 자동 전환/슬라이드 등 타이머 기반 로직은 `signage_src/js/`에 모듈별로 분리
- 빌드 과정 없이 HTML 파일을 브라우저로 직접 열어 개발/확인
