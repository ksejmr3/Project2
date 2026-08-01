# Design Tokens

이 문서는 Figma `23:4564` 데스크톱 프레임과 `project.md`에서 확인된 값만 기록한다.

## Colors

| Token | Value | Usage |
|---|---|---|
| Primary Blue | `#00A1E9` | 주요 버튼, 선택 상태, 후기 오버레이 |
| Domestic Blue | `#30BFFF` | 국내 배지 |
| Accent Orange | `#F39800` | TOP 버튼, 해외 배지 |
| Accent Pink | `#FF5F6D` | 가격, 지역 배지 |
| Accent Green | `#8FC31F` | 지역 배지 |
| Review Background | `#F3FBFF` | 후기 섹션 배경 |
| Black | `#000000` | 제목과 기본 검정 |
| Text Dark | `#333333` | 기본 본문 텍스트 |
| Gray | `#999999` | 보조 텍스트 |
| White | `#FFFFFF` | 반전 텍스트와 배경 |
| White 80% | `rgba(255, 255, 255, 0.8)` | 밝은 보조 텍스트 |
| White 70% | `rgba(255, 255, 255, 0.7)` | Footer 보조 텍스트 |
| White 60% | `rgba(255, 255, 255, 0.6)` | Footer 링크와 날짜 |
| White 50% | `rgba(255, 255, 255, 0.5)` | Footer 버튼 테두리 |
| White 30% | `rgba(255, 255, 255, 0.3)` | Copyright |
| Black Overlay | `rgba(0, 0, 0, 0.3)` | 후기 카드 활성 오버레이 |

## Typography

- 기본 글꼴: `Pretendard`, sans-serif
- 마키 글꼴: `Leelawadee`, sans-serif, Bold

| Role | Size | Weight | Line height | Letter spacing |
|---|---:|---:|---:|---:|
| Hero title | `80px` | `700` | `1.3` | `-1.6px` |
| Section title | `60px` | `800` | `1.5` | `-2.4px` |
| Banner main | `40px` | `500–800` | `1.5` | `-1.6px` |
| Banner sub | `32px` | `400` | `1.5` | `-1.28px` |
| Product list heading | `30px` | `700` | `1` | `-1.5px` |
| Product title | `23px` | `700` | `1` | `-1.15px` |
| Section description | `22px` | `400` | `1.5` | `-0.88px` |
| Body large | `20px` | `400–600` | `1.4` | Figma 미지정 |
| Body | `18px` | `400–700` | `1.4–1.6` | `-0.9px` 사용 |
| Button | `16px` | `700` | `1.5` | `-0.48px` |
| Marquee | `200px` | `700` | `1.3` | Figma 미지정 |

## Layout

| Token | Value |
|---|---:|
| Desktop canvas | `1920px` |
| Full frame height | `6035px` |
| Content width | `1480px` |
| Content gutter | `220px` |
| Header inner width | `1680px` |
| Header gutter | `120px` |
| Header height | `80px` |
| Category navigation height | `157px` |
| Hero height | `848px` |
| Footer height | `431px` |
| Product card | `334.762px × 480.222px` |
| Product image | `334.762px × 334.762px` |
| Review card | `469.164px × 588.383px` |

## Spacing

| Context | Value |
|---|---:|
| Section header gap | `20px` |
| Product header to cards | `20px` |
| Travel to event section | `140px` |
| Review card vertical gap | `58–59px` |
| Footer major gap | `40px` |
| Footer minor gap | `20px` |
| Category item gap | `10–13px` |

## Radius

| Token | Value |
|---|---:|
| Product card/image | `10px` |
| Review card | `20px` |
| Review overlay bottom | `13.881px` |
| Pill button | `40px` |
| Location badge | `587.302px` |

## Border

- Footer customer-service button: `1px solid rgba(255, 255, 255, 0.5)`
- Category와 Footer 구분선은 Figma 원본 SVG 자산을 사용한다.

## Shadow

| Token | Value |
|---|---|
| Category navigation | `0 4px 2px rgba(0, 0, 0, 0.05)` |
| Review card | `3px 8px 10px rgba(0, 0, 0, 0.05)` |
| Review card active | `3px 8px 10px rgba(0, 0, 0, 0.1)` |

## Breakpoints

- 확인된 Figma 기준 화면은 `1920px` 데스크톱 한 종류다.
- 태블릿과 모바일 중단점 값은 지정되어 있지 않으므로 임의의 토큰을 추가하지 않는다.

## Interaction States

| State | Confirmed behavior |
|---|---|
| `default` | 카테고리, 페이지네이션, 카드와 버튼의 기본 상태를 사용한다. |
| `hover` | 버튼, 카드, 링크, 카테고리 아이템에 필요하다. 구체적인 색상과 변형 값은 지정되어 있지 않다. |
| `focus-visible` | 키보드 사용자가 확인 가능한 포커스 표시를 제공한다. 구체적인 Figma 스타일은 지정되어 있지 않다. |
| `active` | Hero 페이지네이션 active 자산과 후기 카드의 어두운 오버레이·강한 그림자가 확인되었다. |
| `selected` | 선택된 카테고리는 `#00A1E9` 강조색과 더 굵은 텍스트를 사용한다. |
| `disabled` | 필요한 컨트롤에 비활성 상태를 제공하되 구체적인 Figma 스타일은 지정되어 있지 않다. |

`Cursor/Default` 레이어는 상호작용 안내용이며 화면 자산으로 구현하지 않는다. 숨김 처리된 Figma 레이어도 구현에서 제외한다.
