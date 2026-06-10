// 메인 앱 (Tailwind)
const { useState } = React;

function DetailPanel({ person, onClose }) {
  if (!person) return null;
  const name = window.nameOf(person);
  return (
    <div className="fixed right-6 top-6 w-[280px] bg-[rgba(20,30,60,0.92)] backdrop-blur-xl border border-white/10 rounded-[18px] p-[18px] text-white z-50 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 border-0 text-white w-[26px] h-[26px] rounded-full cursor-pointer text-sm leading-none"
      >
        ×
      </button>
      <img
        className="w-[72px] h-[72px] rounded-2xl object-contain bg-[#fff0e0] mb-3 border-2 border-white/20"
        src={window.avatarUrl(person.gender, person.avatar)}
        alt={name}
      />
      <div className="text-xs text-slate-400 mb-0.5">{person.rank}</div>
      <div className="text-[20px] font-extrabold tracking-[0.04em] mb-3">
        {name.split("").join(" ")}
      </div>
      <Row k="이메일" v={`${person.id.replace(/-/g, ".")}@hubilon.com`} />
      <Row k="내선" v={`02-555-${(person.avatar * 71) % 9000 + 1000}`} />
      <Row
        k="상태"
        v={
          person.status === "new"
            ? "신규입사자"
            : person.status === "dispatched"
            ? "파견자"
            : "재직중"
        }
      />
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div className="flex justify-between text-xs py-1.5 border-t border-white/10">
      <span className="text-slate-400">{k}</span>
      <span className="font-semibold">{v}</span>
    </div>
  );
}

function App() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const data = window.ORG_DATA;

  // 뷰포트에 맞춰 자동 스케일
  React.useEffect(() => {
    const fit = () => {
      const page = document.querySelector(".org-page");
      if (!page) return;
      const designWidth = 1680;
      const scale = Math.min(1, window.innerWidth / designWidth);
      page.style.transform = `scale(${scale})`;
      const scaledHeight = page.offsetHeight * scale;
      const scaleWrap = document.querySelector(".org-scale");
      if (scaleWrap) scaleWrap.style.minHeight = scaledHeight + "px";
    };
    fit();
    window.addEventListener("resize", fit);
    const t = setTimeout(fit, 800);
    return () => {
      window.removeEventListener("resize", fit);
      clearTimeout(t);
    };
  }, []);

  const handlePersonClick = (person) => {
    setSelected((cur) => (cur && cur.id === person.id ? null : person));
  };

  return (
    <div className="org-scale w-screen min-h-screen flex justify-center items-start overflow-hidden">
      <div
        className="org-page relative w-[1680px] min-w-[1680px] pt-9 pb-16 px-14"
        style={{ transformOrigin: "top center" }}
      >
        {/* 상단: 로고 / CEO / VP */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-start mb-2 relative z-[2]">
          <div className="flex items-center">
            <window.HubilonLogo />
          </div>
          <div className="flex justify-center pl-10">
            <window.ExecCard person={data.ceo} gradient="ceo" />
          </div>
          <div className="flex justify-end items-end pt-12 pr-[280px]">
            <window.ExecCard person={data.vp} gradient="vp" />
          </div>
        </div>

        {/* 부서 구분선 (헤더 row 아래로 옅은 선) */}
        <div
          className="absolute left-14 right-14 h-px z-0"
          style={{
            top: "232px",
            background:
              "linear-gradient(90deg, transparent 2%, rgba(255,255,255,0.08) 12%, rgba(255,255,255,0.08) 88%, transparent 98%)",
          }}
        />

        {/* 6 departments */}
        <div
          className="mt-7 grid gap-[18px] items-start relative"
          style={{
            gridTemplateColumns:
              "minmax(420px,1.05fr) minmax(340px,0.95fr) minmax(160px,0.45fr) minmax(150px,0.42fr) minmax(160px,0.45fr) minmax(150px,0.42fr)",
          }}
        >
          {data.departments.map((dept) => (
            <window.DepartmentBlock
              key={dept.id}
              dept={dept}
              statusFilter={statusFilter}
              onPersonClick={handlePersonClick}
              selectedId={selected?.id}
            />
          ))}
        </div>

        <window.Legend statusFilter={statusFilter} setStatusFilter={setStatusFilter} />

        <DetailPanel person={selected} onClose={() => setSelected(null)} />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
