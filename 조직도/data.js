// 조직도 데이터 — Hubilon
// 성별(M/F) 기준: 남성=홍길동, 여성=홍길순 (렌더 단계에서 치환)
// avatar: randomuser.me 포트레이트 인덱스 (1-99, 20-30대 인물)
// status: 'new' (신규입사자, 보라색 별) | 'dispatched' (파견자, 회색 점) | null

const ORG_DATA = {
  ceo: {
    id: "ceo",
    rank: "대표이사",
    gender: "M",
    avatar: 12,
    status: null,
    featured: true,
  },
  vp: {
    id: "vp",
    rank: "부사장",
    gender: "M",
    avatar: 45,
    status: null,
    featured: true,
  },
  departments: [
    {
      id: "service",
      name: "서비스개발실",
      color: "blue",
      head: { id: "service-head", rank: "실장", gender: "M", avatar: 33 },
      teams: [
        {
          id: "service-1",
          name: "서비스개발 1팀",
          members: [
            { id: "s1-1", rank: "팀장", gender: "M", avatar: 14 },
            { id: "s1-2", rank: "부장", gender: "M", avatar: 22 },
            { id: "s1-3", rank: "부장", gender: "M", avatar: 31 },
            { id: "s1-4", rank: "부장", gender: "F", avatar: 8 },
            { id: "s1-5", rank: "부장", gender: "M", avatar: 41 },
            { id: "s1-6", rank: "차장", gender: "M", avatar: 52 },
            { id: "s1-7", rank: "대리", gender: "M", avatar: 63 },
            { id: "s1-8", rank: "사원", gender: "M", avatar: 71 },
            { id: "s1-9", rank: "사원", gender: "M", avatar: 84, status: "new" },
          ],
        },
        {
          id: "service-2",
          name: "서비스개발 2팀",
          members: [
            { id: "s2-1", rank: "팀장", gender: "F", avatar: 15 },
            { id: "s2-2", rank: "과장", gender: "M", avatar: 26 },
          ],
        },
        {
          id: "service-3",
          name: "서비스개발 3팀",
          members: [
            { id: "s3-1", rank: "팀장", gender: "M", avatar: 37 },
            { id: "s3-2", rank: "부장", gender: "M", avatar: 48 },
            { id: "s3-3", rank: "차장", gender: "M", avatar: 59 },
            { id: "s3-4", rank: "과장", gender: "F", avatar: 21 },
            { id: "s3-5", rank: "대리", gender: "M", avatar: 67 },
            { id: "s3-6", rank: "대리", gender: "M", avatar: 75 },
            { id: "s3-7", rank: "대리", gender: "F", avatar: 32 },
            { id: "s3-8", rank: "사원", gender: "F", avatar: 44 },
          ],
        },
      ],
    },
    {
      id: "solution",
      name: "솔루션연구소",
      color: "teal",
      head: { id: "solution-head", rank: "실장", gender: "M", avatar: 18 },
      teams: [
        {
          id: "solution-1",
          name: "솔루션개발 1팀",
          width: 2, // 2 columns wide
          columns: [
            [
              { id: "sol1-a1", rank: "팀장", gender: "M", avatar: 28 },
              { id: "sol1-a2", rank: "부장", gender: "M", avatar: 39 },
              { id: "sol1-a3", rank: "차장", gender: "M", avatar: 50 },
              { id: "sol1-a4", rank: "차장", gender: "F", avatar: 17, status: "new" },
              { id: "sol1-a5", rank: "과장", gender: "M", avatar: 61 },
              { id: "sol1-a6", rank: "대리", gender: "F", avatar: 25 },
            ],
            [
              { id: "sol1-b1", rank: "부장", gender: "M", avatar: 72 },
              { id: "sol1-b2", rank: "부장", gender: "M", avatar: 83 },
              { id: "sol1-b3", rank: "차장", gender: "F", avatar: 36, status: "new" },
              { id: "sol1-b4", rank: "과장", gender: "M", avatar: 91 },
              { id: "sol1-b5", rank: "과장", gender: "M", avatar: 13 },
              { id: "sol1-b6", rank: "대리", gender: "F", avatar: 47 },
              { id: "sol1-b7", rank: "대리", gender: "M", avatar: 24 },
            ],
          ],
        },
        {
          id: "solution-2",
          name: "솔루션개발 2팀",
          members: [
            { id: "sol2-1", rank: "팀장", gender: "M", avatar: 35 },
            { id: "sol2-2", rank: "부장", gender: "M", avatar: 46 },
            { id: "sol2-3", rank: "부장", gender: "M", avatar: 57 },
            { id: "sol2-4", rank: "차장", gender: "F", avatar: 19 },
          ],
        },
      ],
    },
    {
      id: "platform",
      name: "플랫폼개발실",
      color: "green",
      head: { id: "platform-head", rank: "실장", gender: "M", avatar: 68 },
      teams: [
        {
          id: "platform-1",
          name: "플랫폼개발팀",
          members: [
            { id: "p1-1", rank: "팀장", gender: "M", avatar: 79 },
            { id: "p1-2", rank: "차장", gender: "M", avatar: 90 },
            { id: "p1-3", rank: "과장", gender: "F", avatar: 11 },
            { id: "p1-4", rank: "과장", gender: "F", avatar: 23 },
            { id: "p1-5", rank: "과장", gender: "F", avatar: 38 },
            { id: "p1-6", rank: "대리", gender: "F", avatar: 49 },
          ],
        },
      ],
    },
    {
      id: "sales",
      name: "영업/기획실",
      color: "lime",
      head: null,
      // 영업/기획실은 실장 없이 부장 2명 직접 배치
      teams: [
        {
          id: "sales-direct",
          name: null,
          members: [
            { id: "sa-1", rank: "부장", gender: "M", avatar: 16 },
            { id: "sa-2", rank: "부장", gender: "M", avatar: 27, status: "new" },
          ],
        },
      ],
    },
    {
      id: "dx",
      name: "DX사업실",
      color: "orange",
      head: { id: "dx-head", rank: "실장", gender: "M", avatar: 56 },
      teams: [
        {
          id: "dx-1",
          name: "UI/UX팀",
          members: [
            { id: "dx1-1", rank: "팀장", gender: "M", avatar: 65 },
            { id: "dx1-2", rank: "부장", gender: "F", avatar: 29 },
            { id: "dx1-3", rank: "차장", gender: "F", avatar: 42 },
            { id: "dx1-4", rank: "차장", gender: "F", avatar: 53 },
            { id: "dx1-5", rank: "차장", gender: "F", avatar: 64 },
            { id: "dx1-6", rank: "과장", gender: "M", avatar: 86 },
            { id: "dx1-7", rank: "과장", gender: "F", avatar: 75 },
            { id: "dx1-8", rank: "대리", gender: "F", avatar: 87 },
            { id: "dx1-9", rank: "대리", gender: "F", avatar: 98 },
          ],
        },
      ],
    },
    {
      id: "mgmt",
      name: "경영관리팀",
      color: "magenta",
      head: null,
      isStandaloneTeam: true,
      teams: [
        {
          id: "mgmt-1",
          name: null,
          members: [
            { id: "m-1", rank: "팀장", gender: "F", avatar: 55 },
            { id: "m-2", rank: "과장", gender: "F", avatar: 66 },
          ],
        },
      ],
    },
  ],
};

// 컬러 토큰
const DEPT_COLORS = {
  blue:    { bg: "#3B82F6", bgSoft: "#60A5FA", text: "#fff" },
  teal:    { bg: "#14B8A6", bgSoft: "#2DD4BF", text: "#fff" },
  green:   { bg: "#22C55E", bgSoft: "#4ADE80", text: "#fff" },
  lime:    { bg: "#84CC16", bgSoft: "#A3E635", text: "#0F172A" },
  orange:  { bg: "#F97316", bgSoft: "#FB923C", text: "#fff" },
  magenta: { bg: "#EC4899", bgSoft: "#F472B6", text: "#fff" },
};

window.ORG_DATA = ORG_DATA;
window.DEPT_COLORS = DEPT_COLORS;
