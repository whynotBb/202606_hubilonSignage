// 조직도 컴포넌트 (Tailwind 버전)
const { useState } = React;

const NAME_MALE = "홍길동";
const NAME_FEMALE = "홍길순";

function avatarUrl(gender, idx) {
  // Microsoft Fluent Emoji 3D — 진짜 3D 렌더링 아바타 (Iconify CDN)
  // 20대 분위기로 student, technologist, curly/red hair 등 젊은 변형 위주
  if (gender === "F") {
    const pool = [
      "woman", "woman-light", "woman-medium-light", "woman-medium", "woman-medium-dark", "woman-dark",
      "woman-student", "woman-student-light",
      "woman-curly-hair", "woman-curly-hair-light",
      "woman-red-hair", "woman-red-hair-light",
      "woman-technologist", "woman-technologist-light", "woman-technologist-medium",
    ];
    const v = pool[idx % pool.length];
    return `https://api.iconify.design/fluent-emoji/${v}.svg`;
  }
  const pool = [
    "man", "man-light", "man-medium-light", "man-medium", "man-medium-dark", "man-dark",
    "man-student", "man-student-light", "man-student-medium",
    "man-curly-hair", "man-curly-hair-light", "man-curly-hair-medium",
    "man-red-hair", "man-red-hair-light",
    "man-technologist", "man-technologist-light", "man-technologist-medium",
  ];
  const v = pool[idx % pool.length];
  return `https://api.iconify.design/fluent-emoji/${v}.svg`;
}

function nameOf(person) {
  return person.gender === "F" ? NAME_FEMALE : NAME_MALE;
}

// 부서 컬러 → tailwind hex
const COLOR_HEX = {
  blue:    { c: "#3B82F6", soft: "#60A5FA", text: "#fff" },
  teal:    { c: "#14B8A6", soft: "#2DD4BF", text: "#fff" },
  green:   { c: "#22C55E", soft: "#4ADE80", text: "#fff" },
  lime:    { c: "#84CC16", soft: "#A3E635", text: "#0F172A" },
  orange:  { c: "#F97316", soft: "#FB923C", text: "#fff" },
  magenta: { c: "#EC4899", soft: "#F472B6", text: "#fff" },
};

// ───────────────────────────────────────────────
// 인물 카드
// ───────────────────────────────────────────────
function PersonCard({ person, color, highlighted, dimmed, onClick }) {
  const c = COLOR_HEX[color] || COLOR_HEX.blue;
  const name = nameOf(person);
  const isNew = person.status === "new";
  const isDispatched = person.status === "dispatched";

  const ring = highlighted
    ? `0 0 0 2px #fff, 0 0 0 5px ${c.c}, 0 10px 30px rgba(0,0,0,.5)`
    : undefined;

  return (
    <button
      type="button"
      onClick={() => onClick?.(person)}
      style={{ boxShadow: ring }}
      className={[
        "group relative w-full h-[46px] grid grid-cols-[38px_1fr] items-center gap-2",
        "rounded-full bg-white pl-1 pr-3 py-1 overflow-hidden text-left cursor-pointer",
        "shadow-card transition-[transform,box-shadow,opacity] duration-150",
        "hover:-translate-y-px hover:scale-[1.015] hover:shadow-card-hover",
        "focus:outline-none",
        dimmed ? "opacity-[0.18] saturate-[0.4]" : "",
        highlighted ? "z-10" : "",
      ].join(" ")}
    >
      <span className="relative w-[38px] h-[38px]">
        <img
          className="w-[38px] h-[38px] rounded-full object-contain bg-[#fff0e0] block"
          src={avatarUrl(person.gender, person.avatar)}
          alt={name}
          loading="lazy"
        />
        {isDispatched && (
          <span className="absolute inset-0 rounded-full bg-gray-600/55 mix-blend-luminosity" />
        )}
        {isNew && (
          <span className="absolute -top-0.5 -left-0.5 w-[14px] h-[14px] bg-purple-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-[2]">
            <svg viewBox="0 0 24 24" width="9" height="9" fill="#fff">
              <path d="M12 2l2.6 6.4 6.9.5-5.3 4.5 1.7 6.7L12 16.7 6.1 20.1l1.7-6.7L2.5 8.9l6.9-.5z" />
            </svg>
          </span>
        )}
      </span>

      <span className="flex flex-col leading-[1.1] min-w-0">
        <span className="text-[10px] font-medium text-gray-500">{person.rank}</span>
        <span className="text-[14px] font-bold text-gray-900 tracking-wide">{name}</span>
      </span>

      {/* 우측 컬러 액센트 바 */}
      <span
        className="absolute right-0 top-0 bottom-0 w-[6px] rounded-r-full"
        style={{ background: c.c }}
      />

      {/* hover 시 부드러운 컬러 링 */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ boxShadow: `0 0 0 2px ${c.soft}` }}
      />
    </button>
  );
}

// ───────────────────────────────────────────────
// CEO / VP 카드
// ───────────────────────────────────────────────
function ExecCard({ person, gradient }) {
  const name = nameOf(person);
  const isCEO = gradient === "ceo";
  return (
    <div
      className={[
        "relative flex items-center gap-3.5 rounded-[18px] shadow-exec text-white",
        isCEO
          ? "bg-exec-ceo min-w-[240px] pl-2.5 pr-8 py-2.5"
          : "bg-exec-vp min-w-[200px] pl-2 pr-7 py-2",
      ].join(" ")}
    >
      <img
        className={[
          "object-contain bg-white border-[3px] border-white/85",
          isCEO ? "w-[72px] h-[72px] rounded-2xl" : "w-[56px] h-[56px] rounded-[14px]",
        ].join(" ")}
        src={avatarUrl(person.gender, person.avatar)}
        alt={name}
      />
      <div className="flex flex-col gap-[2px]">
        <div className="text-[13px] font-medium opacity-95">{person.rank}</div>
        <div
          className={[
            "font-extrabold tracking-[0.04em]",
            isCEO ? "text-[22px]" : "text-[18px]",
          ].join(" ")}
        >
          {name.split("").join(" ")}
        </div>
      </div>

      {/* CEO에서 부서로 내려가는 라인 */}
      {isCEO && (
        <span className="absolute left-1/2 -bottom-7 w-[2px] h-7 bg-white/20" />
      )}
    </div>
  );
}

// ───────────────────────────────────────────────
// Pill / Team headers
// ───────────────────────────────────────────────
function PillHeader({ label, color }) {
  const c = COLOR_HEX[color];
  return (
    <div
      className="rounded-full font-extrabold tracking-tight whitespace-nowrap text-center shadow-pill text-[22px] px-8 py-2.5 min-w-[160px]"
      style={{
        backgroundImage: `linear-gradient(180deg, ${c.soft}, ${c.c})`,
        color: c.text,
      }}
    >
      {label}
    </div>
  );
}

function TeamHeader({ label, color }) {
  const c = COLOR_HEX[color];
  return (
    <div
      className="rounded-full text-center font-bold text-[15px] px-[18px] py-[7px] mb-1 min-w-[130px] shadow-team"
      style={{ background: c.soft, color: c.text }}
    >
      {label}
    </div>
  );
}

// ───────────────────────────────────────────────
// 팀 컬럼
// ───────────────────────────────────────────────
function TeamColumn({ team, color, statusFilter, onPersonClick, selectedId }) {
  const renderList = (list) =>
    list.map((p) => {
      const matchesFilter = statusFilter === "all" || p.status === statusFilter;
      const highlighted = selectedId && selectedId === p.id;
      const dimmed = statusFilter !== "all" && !matchesFilter;
      return (
        <PersonCard
          key={p.id}
          person={p}
          color={color}
          highlighted={highlighted}
          dimmed={dimmed}
          onClick={onPersonClick}
        />
      );
    });

  // 2-column wide team (솔루션개발 1팀)
  if (team.columns) {
    return (
      <div className="flex flex-col items-center gap-1.5 min-w-[132px]">
        {team.name && (
          <div className="flex justify-center w-full">
            <TeamHeader label={team.name} color={color} />
          </div>
        )}
        <div className="flex gap-2">
          {team.columns.map((col, i) => (
            <div key={i} className="flex flex-col gap-1.5 items-stretch w-[132px]">
              {renderList(col)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1.5 min-w-[132px]">
      {team.name && <TeamHeader label={team.name} color={color} />}
      <div className="flex flex-col gap-1.5 items-stretch w-[132px]">
        {renderList(team.members)}
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────
// 부서 블록
// ───────────────────────────────────────────────
function DepartmentBlock({ dept, statusFilter, onPersonClick, selectedId }) {
  const noHead = !dept.head;
  return (
    <div className="flex flex-col gap-3.5 items-center relative">
      <div className="flex justify-center">
        <PillHeader label={dept.name} color={dept.color} />
      </div>

      {dept.head ? (
        <div className="flex justify-center w-[132px]">
          <PersonCard
            person={dept.head}
            color={dept.color}
            highlighted={selectedId === dept.head.id}
            dimmed={statusFilter !== "all" && dept.head.status !== statusFilter}
            onClick={onPersonClick}
          />
        </div>
      ) : (
        // 영업/기획실, 경영관리팀은 실장이 없음 — 빈 공간 확보
        <div className={dept.id === "sales" ? "h-[88px]" : "h-[32px]"} />
      )}

      <div className="flex gap-2.5 items-start w-full justify-center">
        {dept.teams.map((team) => (
          <TeamColumn
            key={team.id}
            team={team}
            color={dept.color}
            statusFilter={statusFilter}
            onPersonClick={onPersonClick}
            selectedId={selectedId}
          />
        ))}
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────
// 범례
// ───────────────────────────────────────────────
function Legend({ statusFilter, setStatusFilter }) {
  const items = [
    { id: "new", label: "신규입사자", icon: "star" },
    { id: "dispatched", label: "파견자", icon: "dot" },
  ];
  return (
    <div className="absolute right-14 bottom-8 flex flex-col gap-2.5 text-sm z-10">
      {items.map((it) => {
        const active = statusFilter === it.id;
        return (
          <button
            key={it.id}
            onClick={() => setStatusFilter(active ? "all" : it.id)}
            className={[
              "flex items-center gap-2.5 pl-2.5 pr-3.5 py-1.5 rounded-full border text-[13px] font-medium cursor-pointer transition",
              active
                ? "bg-purple-500/20 border-purple-400/60 text-white"
                : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10",
            ].join(" ")}
          >
            {it.icon === "star" ? (
              <span className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="10" height="10" fill="#fff">
                  <path d="M12 2l2.6 6.4 6.9.5-5.3 4.5 1.7 6.7L12 16.7 6.1 20.1l1.7-6.7L2.5 8.9l6.9-.5z" />
                </svg>
              </span>
            ) : (
              <span className="w-3.5 h-3.5 bg-gray-400 rounded-full inline-block" />
            )}
            <span>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ───────────────────────────────────────────────
// Hubilon 로고
// ───────────────────────────────────────────────
function HubilonLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-[34px] h-[34px] rounded-lg flex items-center justify-center shadow-[0_4px_18px_rgba(59,130,246,0.4)]"
           style={{ backgroundImage: "linear-gradient(135deg,#3aa3ff,#1f6df0 60%,#fbbf24 100%)" }}>
        <span className="w-3 h-3 rounded-full bg-amber-400 ring-[3px] ring-inset ring-white" />
      </div>
      <span className="text-[28px] font-extrabold tracking-tight text-white">Hubilon</span>
    </div>
  );
}

Object.assign(window, {
  PersonCard,
  ExecCard,
  PillHeader,
  TeamHeader,
  TeamColumn,
  DepartmentBlock,
  Legend,
  HubilonLogo,
  nameOf,
  avatarUrl,
});
