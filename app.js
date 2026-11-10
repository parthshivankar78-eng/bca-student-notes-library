const { useState, useEffect, useMemo } = React;

function Icon({ name, className = "w-4 h-4" }) {
  const getPaths = () => {
    switch (name) {
      case 'sparkles': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />;
      case 'dashboard': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />;
      case 'book': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />;
      case 'test': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />;
      case 'admin': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />;
      case 'search': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />;
      case 'sun': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />;
      case 'moon': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />;
      case 'logout': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />;
      case 'clock': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />;
      case 'check': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />;
      case 'map': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />;
      case 'mail': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />;
      case 'phone': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />;
      case 'globe': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />;
      case 'star': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />;
      case 'bookmark': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />;
      case 'trash': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />;
      case 'plus': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />;
      case 'menu': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />;
      case 'close': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />;
      case 'upload': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />;
      case 'eye': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />;
      case 'eye-off': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />;
      case 'bell': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />;
      case 'download': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />;
      case 'calendar': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />;
      case 'user': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />;
      case 'users': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />;
      case 'academic': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5" />;
      case 'shield': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />;
      case 'lock': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />;
      case 'key': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />;
      case 'id': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />;
      default: return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />;
    }
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {getPaths()}
    </svg>
  );
}

const FILE_META = {
  pdf: { label: 'PDF', cls: 'bg-red-500/10 text-red-500' },
  doc: { label: 'WORD', cls: 'bg-blue-500/10 text-blue-500' }, docx: { label: 'WORD', cls: 'bg-blue-500/10 text-blue-500' },
  ppt: { label: 'PPT', cls: 'bg-orange-500/10 text-orange-500' }, pptx: { label: 'PPT', cls: 'bg-orange-500/10 text-orange-500' },
  xls: { label: 'EXCEL', cls: 'bg-emerald-500/10 text-emerald-500' }, xlsx: { label: 'EXCEL', cls: 'bg-emerald-500/10 text-emerald-500' },
  txt: { label: 'TXT', cls: 'bg-slate-500/10 text-slate-400' },
  png: { label: 'IMAGE', cls: 'bg-purple-500/10 text-purple-500' }, jpg: { label: 'IMAGE', cls: 'bg-purple-500/10 text-purple-500' }, jpeg: { label: 'IMAGE', cls: 'bg-purple-500/10 text-purple-500' }
};
const getExt = (name = '') => (name.split('.').pop() || 'pdf').toLowerCase();

function FileBadge({ type = 'pdf' }) {
  const m = FILE_META[type] || { label: type.toUpperCase(), cls: 'bg-slate-500/10 text-slate-400' };
  return <span className={`px-2 py-0.5 rounded-md text-[9px] font-black tracking-wider ${m.cls}`}>{m.label}</span>;
}

function FileViewer({ file, onClose }) {
  const [resolvedUrl, setResolvedUrl] = useState(file.fileUrl);

  useEffect(() => {
    setResolvedUrl(file.fileUrl);
    if (file.id && (!file.fileUrl || file.fileUrl.includes('dummy.pdf'))) {
      getFileFromIDB(file.id).then(storedUrl => {
        if (storedUrl) setResolvedUrl(storedUrl);
      });
    }
  }, [file]);

  const type = file.fileType || 'pdf';
  const isImg = ['png', 'jpg', 'jpeg'].includes(type);
  const canEmbed = ['pdf', 'txt'].includes(type);
  const currentUrl = resolvedUrl || file.fileUrl;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex flex-col p-4 md:p-8">
      <div className="flex justify-between items-center text-white mb-4 gap-3">
        <h3 className="font-bold text-lg flex items-center space-x-2 truncate">
          <Icon name="book" className="w-5 h-5 text-brand-500" />
          <span className="truncate">{file.fileName || file.title}</span>
          <FileBadge type={type} />
        </h3>
        <div className="flex items-center gap-2 shrink-0">
          <a href={currentUrl} download={file.fileName || file.title} className="px-4 py-2 bg-brand-600 hover:bg-brand-700 rounded-xl font-bold text-sm flex items-center gap-1.5">
            <Icon name="download" className="w-4 h-4" /><span>Download</span>
          </a>
          <button onClick={onClose} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl font-bold text-sm">Close</button>
        </div>
      </div>
      {canEmbed ? (
        <iframe src={currentUrl} className="w-full flex-1 rounded-2xl bg-white border-none"></iframe>
      ) : isImg ? (
        <div className="flex-1 flex items-center justify-center overflow-auto"><img src={currentUrl} alt={file.title} className="max-w-full max-h-full rounded-2xl" /></div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="glass-card p-10 rounded-3xl text-center space-y-4 max-w-md">
            <FileBadge type={type} />
            <h4 className="text-lg font-black">{file.title}</h4>
            <p className="text-xs text-slate-400">Browsers can't preview this file type directly. Download it to open in Word / PowerPoint / Excel.</p>
            <a href={currentUrl} download={file.fileName || file.title} className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-sm font-bold">
              <Icon name="download" className="w-4 h-4" /><span>Download File</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function BarChart({ data, unit = '', color = 'from-brand-600 to-indigo-400', go }) {
  const max = Math.max(...data.map(d => d[1]));
  return (
    <div className="flex items-end justify-between gap-2 h-36">
      {data.map(([label, v], i) => (
        <div key={label} className="flex-1 flex flex-col items-center justify-end h-full gap-1">
          <span className="text-[10px] font-bold text-slate-400">{v}{unit}</span>
          <div className={`w-full rounded-t-lg bg-gradient-to-t ${color}`} style={{ height: go ? `${(v / max) * 80}%` : '0%', transition: `height .8s cubic-bezier(.2,.8,.2,1) ${i * 80}ms` }}></div>
          <span className="text-[10px] font-semibold text-slate-400">{label}</span>
        </div>
      ))}
    </div>
  );
}

function DashboardCharts({ studentData }) {
  const [go, setGo] = useState(false);
  useEffect(() => { const t = setTimeout(() => setGo(true), 100); return () => clearTimeout(t); }, [studentData]);
  
  const attendance = studentData?.attendance ?? 88;
  const r = 52, c = 2 * Math.PI * r;
  const months = studentData?.monthlyAttendance ?? [['Apr', 82], ['May', 90], ['Jun', 76], ['Jul', 88], ['Aug', 94], ['Sep', 88]];
  const views = studentData?.viewsThisWeek ?? [['Mon', 34], ['Tue', 52], ['Wed', 41], ['Thu', 68], ['Fri', 59], ['Sat', 25], ['Sun', 18]];
  const ratings = studentData?.ratings ?? [[5, 62], [4, 25], [3, 8], [2, 3], [1, 2]];
  const avg = studentData?.ratingAvg ?? 4.7;
  const points = studentData?.starPoints ?? 1240;
  const nextLevel = studentData?.nextLevel ?? 1500;
  const stars = (cls) => [0, 1, 2, 3, 4].map(i => <Icon key={i} name="star" className={`w-5 h-5 ${cls}`} />);
  const card = "glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 animate-fadeIn";

  const strokeColor = attendance >= 75 ? 'stroke-emerald-500' : attendance >= 60 ? 'stroke-amber-500' : 'stroke-red-500';
  const barGrad = attendance >= 75 ? 'from-emerald-600 to-teal-400' : attendance >= 60 ? 'from-amber-600 to-yellow-400' : 'from-red-600 to-pink-500';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className={card + " flex flex-col items-center"}>
        <div className="flex justify-between items-center w-full">
          <p className="text-xs font-bold text-slate-400 uppercase">Overall Attendance</p>
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${attendance >= 75 ? 'bg-emerald-500/10 text-emerald-500' : attendance >= 60 ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'}`}>
            {attendance >= 75 ? 'Optimal ✅' : attendance >= 60 ? 'Warning ⚠️' : 'Critical ❌'}
          </span>
        </div>
        <svg viewBox="0 0 120 120" className="w-36 h-36 mt-2">
          <circle cx="60" cy="60" r={r} fill="none" strokeWidth="12" className="stroke-slate-200 dark:stroke-slate-700" />
          <circle cx="60" cy="60" r={r} fill="none" strokeWidth="12" strokeLinecap="round" className={strokeColor}
            strokeDasharray={c} strokeDashoffset={go ? c * (1 - attendance / 100) : c} transform="rotate(-90 60 60)"
            style={{ transition: 'stroke-dashoffset 1.2s ease' }} />
          <text x="60" y="66" textAnchor="middle" className="fill-current font-black" fontSize="22">{attendance}%</text>
        </svg>
        <p className="text-[11px] text-slate-400 mt-1">
          {attendance >= 75 ? 'Above the 75% college requirement ✅' : `Below 75%! Need more classes to qualify ⚠️`}
        </p>
      </div>

      <div className={card + " md:col-span-2"}>
        <div className="flex justify-between items-center mb-2">
          <p className="text-xs font-bold text-slate-400 uppercase">Monthly Attendance Trend (%)</p>
          <span className="text-[10px] text-slate-400 font-semibold">Min 75% Requirement</span>
        </div>
        <BarChart data={months} unit="%" go={go} color={barGrad} />
      </div>

      <div className={card}>
        <p className="text-xs font-bold text-slate-400 uppercase">Faculty Academic Rating</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-4xl font-black">{avg}</span>
          <div className="relative inline-flex">
            <div className="flex">{stars('text-slate-300 dark:text-slate-700')}</div>
            <div className="absolute left-0 top-0 overflow-hidden" style={{ width: go ? `${(avg / 5) * 100}%` : '0%', transition: 'width 1s ease' }}>
              <div className="flex">{stars('fill-amber-400 text-amber-400')}</div>
            </div>
          </div>
        </div>
        <div className="space-y-1.5 mt-3">
          {ratings.map(([n, pct], i) => (
            <div key={n} className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
              <span className="w-6">{n}★</span>
              <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div className="h-full rounded-full bg-amber-400" style={{ width: go ? `${pct}%` : '0%', transition: `width .9s ease ${i * 100}ms` }}></div>
              </div>
              <span className="w-8 text-right">{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className={card}>
        <div className="flex justify-between items-center mb-2">
          <p className="text-xs font-bold text-slate-400 uppercase">Weekly Resource Views</p>
          <span className="text-xs font-black text-brand-500">{views.reduce((a, v) => a + v[1], 0)} total</span>
        </div>
        <BarChart data={views} go={go} color="from-purple-600 to-pink-400" />
      </div>

      <div className={card}>
        <p className="text-xs font-bold text-slate-400 uppercase">Student XP & Star Points</p>
        <div className="flex items-center gap-2 mt-2">
          <Icon name="star" className="w-9 h-9 fill-amber-400 text-amber-400 emoji-idle" />
          <span className="text-4xl font-black">{points.toLocaleString()}</span>
        </div>
        <div className="flex mt-3">{[0, 1, 2, 3, 4].map(i => <Icon key={i} name="star" className={`w-5 h-5 ${i < Math.min(5, Math.floor(points / 300)) ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'}`} />)}</div>
        <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden mt-3">
          <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-pink-400" style={{ width: go ? `${Math.min(100, (points / nextLevel) * 100)}%` : '0%', transition: 'width 1.2s ease' }}></div>
        </div>
        <p className="text-[11px] text-slate-400 mt-1.5">{Math.max(0, nextLevel - points)} points to next tier • Active Scholar</p>
      </div>
    </div>
  );
}

const INITIAL_REVIEWS = [
  { name: 'Riya S.', course: 'BCA • Sem 2', emoji: '🤩', text: 'The DBMS notes saved my exam prep. Everything in one place!' },
  { name: 'Aman K.', course: 'BCA • Sem 4', emoji: '😊', text: 'Mock tests feel just like the real thing. Really helpful.' },
  { name: 'Parth.', course: 'BCA • Sem 3', emoji: '😊', text: 'Most helpfull for me to exam time.' },
  { name: 'Sneha P.', course: 'BCA • Sem 2', emoji: '🤩', text: 'Love the dark mode and the quick search for notes.' },
  { name: 'Rohit D.', course: 'BCA • Sem 6', emoji: '😊', text: 'Previous year papers are easy to find. Great work, faculty!' },
  { name: 'Pooja M.', course: 'BCA • Sem 1', emoji: '🤩', text: 'The aptitude practice boosted my placement confidence.' },
  { name: 'Karan T.', course: 'BCA • Sem 2', emoji: '😊', text: 'Clean dashboard, and I can track my attendance easily.' }
];

const INITIAL_NOTES = [
  { id: 1, title: "DBMS Complete Module 1-4", subject: "DBMS", semester: "Semester 2", author: "Prof. K. Verma", downloads: 342, rating: 4.8, fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
  { id: 2, title: "Data Structures - Trees & Graphs", subject: "Data Structures", semester: "Semester 2", author: "Dr. A. Mehta", downloads: 512, rating: 4.9, fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
  { id: 3, title: "Web Tech HTML/CSS Cheat Sheet", subject: "Web Technology", semester: "Semester 2", author: "Prof. S. Gupta", downloads: 219, rating: 4.6, fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
  { id: 4, title: "C++ OOP Concepts Notes", subject: "C++", semester: "Semester 2", author: "Prof. K. Verma", downloads: 189, rating: 4.7, fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
];

const APTITUDE_CATEGORIES = [
  'Quantitative Aptitude',
  'Logical Reasoning',
  'Verbal Ability',
  'Data Interpretation'
];

const CATEGORY_META = {
  'Quantitative Aptitude': { label: 'Quantitative Aptitude', icon: '🧮', cls: 'bg-blue-500/10 text-blue-500 border-blue-500/30' },
  'Logical Reasoning': { label: 'Logical Reasoning', icon: '🧩', cls: 'bg-purple-500/10 text-purple-500 border-purple-500/30' },
  'Verbal Ability': { label: 'Verbal Ability', icon: '📝', cls: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' },
  'Data Interpretation': { label: 'Data Interpretation', icon: '📈', cls: 'bg-amber-500/10 text-amber-500 border-amber-500/30' }
};

function AptitudeCategoryBadge({ category = 'Quantitative Aptitude' }) {
  const meta = CATEGORY_META[category] || { label: category, icon: '⚡', cls: 'bg-brand-500/10 text-brand-500 border-brand-500/30' };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider border ${meta.cls}`}>
      <span>{meta.icon}</span>
      <span>{meta.label}</span>
    </span>
  );
}

const INITIAL_QUESTIONS = [
  // Quantitative Aptitude
  {
    id: 1,
    category: 'Quantitative Aptitude',
    question: "If a person sells an article for ₹540 and makes a 20% profit, what was the original cost price?",
    options: ["₹420", "₹450", "₹480", "₹500"],
    correct: 1,
    explanation: "Cost Price = (Selling Price * 100) / (100 + Profit%) = (540 * 100) / 120 = ₹450."
  },
  {
    id: 2,
    category: 'Quantitative Aptitude',
    question: "A train running at 72 km/h crosses a pole in 15 seconds. What is the length of the train?",
    options: ["250 meters", "300 meters", "350 meters", "200 meters"],
    correct: 1,
    explanation: "Speed in m/s = 72 * (5/18) = 20 m/s. Length = Speed * Time = 20 * 15 = 300 meters."
  },
  {
    id: 3,
    category: 'Quantitative Aptitude',
    question: "A and B together can complete a project in 12 days. If A alone takes 20 days, how many days will B take alone?",
    options: ["25 days", "30 days", "35 days", "28 days"],
    correct: 1,
    explanation: "1/B = 1/12 - 1/20 = (5 - 3)/60 = 2/60 = 1/30. Therefore, B alone takes 30 days."
  },

  // Logical Reasoning
  {
    id: 4,
    category: 'Logical Reasoning',
    question: "Find the next number in the logical sequence: 3, 7, 15, 31, 63, ?",
    options: ["126", "127", "128", "131"],
    correct: 1,
    explanation: "Pattern is (previous * 2) + 1: (63 * 2) + 1 = 127."
  },
  {
    id: 5,
    category: 'Logical Reasoning',
    question: "Pointing to a man, a woman said, 'His mother is the only daughter of my mother.' How is the woman related to the man?",
    options: ["Sister", "Mother", "Aunt", "Daughter"],
    correct: 1,
    explanation: "'Only daughter of my mother' is the woman herself. Therefore, she is the man's mother."
  },
  {
    id: 6,
    category: 'Logical Reasoning',
    question: "In a certain code, 'ROAD' is written as 'URDG'. How is 'SWAN' encoded in that pattern?",
    options: ["VXDO", "VZDQ", "VZCQ", "UXDP"],
    correct: 1,
    explanation: "Each letter is shifted forward by +3 positions: S(+3)->V, W(+3)->Z, A(+3)->D, N(+3)->Q => VZDQ."
  },

  // Verbal Ability
  {
    id: 7,
    category: 'Verbal Ability',
    question: "Select the most accurate synonym for the word 'METICULOUS':",
    options: ["Careless", "Thorough & Precise", "Hasty", "Indifferent"],
    correct: 1,
    explanation: "'Meticulous' means taking extreme care about minute details; thorough and precise."
  },
  {
    id: 8,
    category: 'Verbal Ability',
    question: "Choose the correct preposition: 'The student was congratulated ______ securing top campus placement.'",
    options: ["for", "on", "with", "about"],
    correct: 1,
    explanation: "The standard English idiom after 'congratulate' is 'on' (or upon)."
  },
  {
    id: 9,
    category: 'Verbal Ability',
    question: "Select the exact antonym for the word 'EPHEMERAL':",
    options: ["Transient", "Permanent", "Fleeting", "Fragile"],
    correct: 1,
    explanation: "'Ephemeral' describes something lasting for a very short time. The opposite is 'Permanent'."
  },

  // Data Interpretation
  {
    id: 10,
    category: 'Data Interpretation',
    question: "In a batch of 120 BCA students, 60% passed in DBMS, 70% passed in Web Tech, and 50% passed in both. How many failed in both?",
    options: ["12 students", "24 students", "18 students", "30 students"],
    correct: 1,
    explanation: "Passed at least one = 60% + 70% - 50% = 80%. Failed both = 100% - 80% = 20%. 20% of 120 = 24 students."
  },
  {
    id: 11,
    category: 'Data Interpretation',
    question: "Placement records show BCA offers: 2023: 80 offers, 2024: 100 offers, 2025: 125 offers. What is the percentage increase from 2023 to 2025?",
    options: ["45.25%", "56.25%", "50.00%", "60.50%"],
    correct: 1,
    explanation: "Percentage increase = ((125 - 80) / 80) * 100 = (45 / 80) * 100 = 56.25%."
  },
  {
    id: 12,
    category: 'Data Interpretation',
    question: "A pie chart depicts programming preferences: Python 35%, Java 30%, C++ 20%, Web 15%. What is the central angle for Python?",
    options: ["108°", "126°", "120°", "135°"],
    correct: 1,
    explanation: "Central angle = (35 / 100) * 360° = 126°."
  }
];

const STORAGE_KEY_USERS = 'sbjain_registered_users_v2';
const STORAGE_KEY_EMAIL_LOGS = 'sbjain_email_logs_v1';
const STORAGE_KEY_STUDENT_NOTIFICATIONS = 'sbjain_student_notifications_v1';
const STORAGE_KEY_NOTES = 'sbjain_study_notes_v1';
const STORAGE_KEY_QUESTIONS = 'sbjain_mock_questions_v1';

// IndexedDB large file storage helper for persisting PDFs, images and documents
const IDB_NAME = 'SBJainLibraryDB';
const IDB_STORE = 'notes_files';

function openLibraryDB() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      resolve(null);
      return;
    }
    try {
      const req = window.indexedDB.open(IDB_NAME, 1);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) {
          db.createObjectStore(IDB_STORE, { keyPath: 'id' });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch (err) {
      resolve(null);
    }
  });
}

async function saveFileToIDB(id, fileUrl) {
  try {
    const db = await openLibraryDB();
    if (!db) return;
    const tx = db.transaction(IDB_STORE, 'readwrite');
    tx.objectStore(IDB_STORE).put({ id, fileUrl });
  } catch (e) {
    console.warn('IDB saveFile error', e);
  }
}

async function getFileFromIDB(id) {
  try {
    const db = await openLibraryDB();
    if (!db) return null;
    return new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const req = tx.objectStore(IDB_STORE).get(id);
      req.onsuccess = () => resolve(req.result ? req.result.fileUrl : null);
      req.onerror = () => resolve(null);
    });
  } catch (e) {
    return null;
  }
}

const INITIAL_DEFAULT_USERS = [
  {
    id: 'user_admin_default',
    username: 'admin',
    password: '123',
    role: 'Admin',
    name: 'Prof. K. Verma',
    studentId: 'FAC-ADMIN-01',
    email: 'k.verma@sbjit.edu.in',
    department: 'BCA & Computer Applications',
    designation: 'Head of Department (HOD)',
    phone: '+91 98230 11223',
    joinedDate: 'Jan 2024'
  },
  {
    id: 'user_student_default',
    username: 'student',
    password: '123',
    role: 'Student',
    name: 'Rahul Deshmukh',
    studentId: 'SBJ2026BCA001',
    email: 'rahul.bcayear@sbjit.edu.in',
    department: 'BCA (Bachelor of Computer Applications)',
    semester: 'Year 2 • Semester 3',
    phone: '+91 88888 12345',
    joinedDate: 'Aug 2025'
  },
  {
    id: 'user_student_sneha',
    username: 'sneha',
    password: '123',
    role: 'Student',
    name: 'Sneha Patel',
    studentId: 'SBJ2026BCA042',
    email: 'sneha.bca1@sbjit.edu.in',
    department: 'BCA (Bachelor of Computer Applications)',
    semester: 'Year 1 • Semester 2',
    phone: '+91 98765 22334',
    joinedDate: 'Jul 2025'
  },
  {
    id: 'user_student_aman',
    username: 'aman',
    password: '123',
    role: 'Student',
    name: 'Aman Kumar',
    studentId: 'SBJ2026BCA089',
    email: 'aman.bca3@sbjit.edu.in',
    department: 'BCA (Bachelor of Computer Applications)',
    semester: 'Year 3 • Semester 5',
    phone: '+91 77665 44332',
    joinedDate: 'Aug 2024'
  }
];

// Helper: Generates or returns unique, personalized performance data for any student
function getStudentPerformance(user) {
  if (!user || user.role !== 'Student') return null;
  if (user.performance) return user.performance;

  const uname = (user.username || '').toLowerCase();
  const fullName = (user.name || '').toLowerCase();

  // Student 1: Rahul Deshmukh (High Achiever, 91% Attendance, 6-Day Streak)
  if (uname === 'student' || fullName.includes('rahul')) {
    return {
      attendance: 91,
      loginStreak: 6,
      overallScore: 89,
      grade: 'A+',
      rank: 2,
      starPoints: 1640,
      nextLevel: 2000,
      ratingAvg: 4.8,
      lastLoginDate: new Date().toISOString().slice(0, 10),
      lastLoginTime: '09:15 AM',
      weeklyLogins: [true, true, true, true, true, true, false],
      loginHistory: [
        { date: new Date().toISOString().slice(0, 10), displayDate: 'Today', time: '09:15 AM', status: 'Present / Checked In', bonus: '+25 XP' },
        { date: '2026-10-14', displayDate: 'Yesterday', time: '09:30 AM', status: 'Present / Checked In', bonus: '+25 XP' },
        { date: '2026-10-13', displayDate: '13 Oct 2026', time: '10:05 AM', status: 'Present / Checked In', bonus: '+25 XP' },
        { date: '2026-10-12', displayDate: '12 Oct 2026', time: '09:00 AM', status: 'Present / Checked In', bonus: '+25 XP' },
        { date: '2026-10-11', displayDate: '11 Oct 2026', time: '09:45 AM', status: 'Present / Checked In', bonus: '+25 XP' }
      ],
      monthlyAttendance: [['Apr', 86], ['May', 92], ['Jun', 88], ['Jul', 94], ['Aug', 90], ['Sep', 91]],
      viewsThisWeek: [['Mon', 42], ['Tue', 58], ['Wed', 49], ['Thu', 74], ['Fri', 63], ['Sat', 31], ['Sun', 22]],
      ratings: [[5, 75], [4, 20], [3, 5], [2, 0], [1, 0]],
      subjects: [
        { code: 'BCA-301', name: 'Database Management Systems', attendance: 94, marks: 92, maxMarks: 100, grade: 'A+', status: 'good', attended: 47, total: 50 },
        { code: 'BCA-302', name: 'Data Structures & Algorithms', attendance: 90, marks: 88, maxMarks: 100, grade: 'A+', status: 'good', attended: 45, total: 50 },
        { code: 'BCA-303', name: 'Java Programming', attendance: 92, marks: 91, maxMarks: 100, grade: 'A+', status: 'good', attended: 46, total: 50 },
        { code: 'BCA-304', name: 'Computer Networks', attendance: 88, marks: 85, maxMarks: 100, grade: 'A', status: 'good', attended: 44, total: 50 },
        { code: 'BCA-305', name: 'Operating Systems', attendance: 92, marks: 89, maxMarks: 100, grade: 'A+', status: 'good', attended: 46, total: 50 }
      ]
    };
  }

  // Student 2: Sneha Patel (Consistent Performer, 84% Attendance, 3-Day Streak)
  if (uname === 'sneha' || fullName.includes('sneha')) {
    return {
      attendance: 84,
      loginStreak: 3,
      overallScore: 82,
      grade: 'A',
      rank: 7,
      starPoints: 1180,
      nextLevel: 1500,
      ratingAvg: 4.6,
      lastLoginDate: new Date().toISOString().slice(0, 10),
      lastLoginTime: '08:45 AM',
      weeklyLogins: [true, true, true, false, false, false, false],
      loginHistory: [
        { date: new Date().toISOString().slice(0, 10), displayDate: 'Today', time: '08:45 AM', status: 'Present / Checked In', bonus: '+25 XP' },
        { date: '2026-10-14', displayDate: 'Yesterday', time: '09:10 AM', status: 'Present / Checked In', bonus: '+25 XP' },
        { date: '2026-10-13', displayDate: '13 Oct 2026', time: '10:30 AM', status: 'Present / Checked In', bonus: '+25 XP' }
      ],
      monthlyAttendance: [['Apr', 80], ['May', 85], ['Jun', 82], ['Jul', 86], ['Aug', 88], ['Sep', 84]],
      viewsThisWeek: [['Mon', 28], ['Tue', 45], ['Wed', 38], ['Thu', 52], ['Fri', 41], ['Sat', 18], ['Sun', 15]],
      ratings: [[5, 60], [4, 30], [3, 8], [2, 2], [1, 0]],
      subjects: [
        { code: 'BCA-101', name: 'Programming in C++', attendance: 86, marks: 84, maxMarks: 100, grade: 'A', status: 'good', attended: 43, total: 50 },
        { code: 'BCA-102', name: 'Web Technologies (HTML/CSS)', attendance: 90, marks: 88, maxMarks: 100, grade: 'A+', status: 'good', attended: 45, total: 50 },
        { code: 'BCA-103', name: 'Discrete Mathematics', attendance: 78, marks: 76, maxMarks: 100, grade: 'B+', status: 'good', attended: 39, total: 50 },
        { code: 'BCA-104', name: 'Digital Electronics', attendance: 82, marks: 80, maxMarks: 100, grade: 'A', status: 'good', attended: 41, total: 50 },
        { code: 'BCA-105', name: 'Professional Communication', attendance: 84, marks: 82, maxMarks: 100, grade: 'A', status: 'good', attended: 42, total: 50 }
      ]
    };
  }

  // Student 3: Aman Kumar (Low Attendance Alert 72%, 1-Day Streak, Needs Classes)
  if (uname === 'aman' || fullName.includes('aman')) {
    return {
      attendance: 72,
      loginStreak: 1,
      overallScore: 74,
      grade: 'B',
      rank: 19,
      starPoints: 780,
      nextLevel: 1000,
      ratingAvg: 4.2,
      lastLoginDate: new Date().toISOString().slice(0, 10),
      lastLoginTime: '11:20 AM',
      weeklyLogins: [true, false, false, false, false, false, false],
      loginHistory: [
        { date: new Date().toISOString().slice(0, 10), displayDate: 'Today', time: '11:20 AM', status: 'Present / Checked In', bonus: '+25 XP' }
      ],
      monthlyAttendance: [['Apr', 75], ['May', 78], ['Jun', 68], ['Jul', 70], ['Aug', 74], ['Sep', 72]],
      viewsThisWeek: [['Mon', 18], ['Tue', 22], ['Wed', 19], ['Thu', 31], ['Fri', 25], ['Sat', 12], ['Sun', 10]],
      ratings: [[5, 40], [4, 35], [3, 15], [2, 7], [1, 3]],
      subjects: [
        { code: 'BCA-501', name: 'Python & Machine Learning', attendance: 76, marks: 75, maxMarks: 100, grade: 'B+', status: 'good', attended: 38, total: 50 },
        { code: 'BCA-502', name: 'Cloud Computing & DevOps', attendance: 68, marks: 70, maxMarks: 100, grade: 'B', status: 'warn', attended: 34, total: 50 },
        { code: 'BCA-503', name: 'Software Engineering & Agile', attendance: 72, marks: 73, maxMarks: 100, grade: 'B', status: 'warn', attended: 36, total: 50 },
        { code: 'BCA-504', name: 'Mobile Application Dev', attendance: 70, marks: 72, maxMarks: 100, grade: 'B', status: 'warn', attended: 35, total: 50 },
        { code: 'BCA-505', name: 'Major Capstone Project', attendance: 74, marks: 80, maxMarks: 100, grade: 'A', status: 'good', attended: 37, total: 50 }
      ]
    };
  }

  // Dynamic baseline for any newly registered student
  const seed = (user.username || user.studentId || user.email || 'student').toLowerCase();
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) % 10000;

  const att = 74 + (hash % 20); // 74% - 93%
  const score = 72 + ((hash * 7) % 22); // 72% - 93%
  const grade = score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B+' : score >= 60 ? 'B' : 'C';
  const rank = 3 + (hash % 16);
  const streak = 1 + (hash % 4);
  const points = 950 + (hash % 600);

  const sem = (user.semester || 'Semester 2').toLowerCase();
  let subList = [];
  if (sem.includes('1') || sem.includes('2')) {
    subList = [
      { code: 'BCA-101', name: 'Programming in C++', attendance: att + 2, marks: score + 1, maxMarks: 100, grade: 'A', status: 'good', attended: 43, total: 50 },
      { code: 'BCA-102', name: 'Web Technologies (HTML/CSS)', attendance: att + 3, marks: score + 2, maxMarks: 100, grade: 'A+', status: 'good', attended: 45, total: 50 },
      { code: 'BCA-103', name: 'Discrete Mathematics', attendance: att - 3, marks: score - 4, maxMarks: 100, grade: 'B+', status: att - 3 < 75 ? 'warn' : 'good', attended: 38, total: 50 },
      { code: 'BCA-104', name: 'Digital Electronics', attendance: att, marks: score, maxMarks: 100, grade: grade, status: 'good', attended: 40, total: 50 },
      { code: 'BCA-105', name: 'Professional Communication', attendance: att + 1, marks: score + 2, maxMarks: 100, grade: 'A', status: 'good', attended: 42, total: 50 }
    ];
  } else if (sem.includes('3') || sem.includes('4')) {
    subList = [
      { code: 'BCA-301', name: 'Database Management Systems', attendance: att + 3, marks: score + 2, maxMarks: 100, grade: 'A+', status: 'good', attended: 46, total: 50 },
      { code: 'BCA-302', name: 'Data Structures & Algorithms', attendance: att, marks: score, maxMarks: 100, grade: grade, status: 'good', attended: 42, total: 50 },
      { code: 'BCA-303', name: 'Java Programming', attendance: att + 1, marks: score + 1, maxMarks: 100, grade: 'A', status: 'good', attended: 44, total: 50 },
      { code: 'BCA-304', name: 'Computer Networks', attendance: att - 2, marks: score - 2, maxMarks: 100, grade: grade, status: att - 2 < 75 ? 'warn' : 'good', attended: 39, total: 50 },
      { code: 'BCA-305', name: 'Operating Systems', attendance: att + 2, marks: score + 3, maxMarks: 100, grade: 'A', status: 'good', attended: 45, total: 50 }
    ];
  } else {
    subList = [
      { code: 'BCA-501', name: 'Python & Machine Learning', attendance: att + 2, marks: score + 2, maxMarks: 100, grade: 'A', status: 'good', attended: 44, total: 50 },
      { code: 'BCA-502', name: 'Cloud Computing & DevOps', attendance: att - 3, marks: score - 3, maxMarks: 100, grade: grade, status: att - 3 < 75 ? 'warn' : 'good', attended: 38, total: 50 },
      { code: 'BCA-503', name: 'Software Engineering & Agile', attendance: att, marks: score, maxMarks: 100, grade: grade, status: 'good', attended: 41, total: 50 },
      { code: 'BCA-504', name: 'Mobile Application Dev', attendance: att - 2, marks: score - 2, maxMarks: 100, grade: grade, status: att - 2 < 75 ? 'warn' : 'good', attended: 39, total: 50 },
      { code: 'BCA-505', name: 'Major Capstone Project', attendance: att + 3, marks: score + 4, maxMarks: 100, grade: 'A+', status: 'good', attended: 46, total: 50 }
    ];
  }

  return {
    attendance: att,
    loginStreak: streak,
    overallScore: score,
    grade: grade,
    rank: rank,
    starPoints: points,
    nextLevel: points + 400,
    ratingAvg: 4.5,
    lastLoginDate: new Date().toISOString().slice(0, 10),
    lastLoginTime: '09:00 AM',
    weeklyLogins: [true, false, false, false, false, false, false],
    loginHistory: [
      { date: new Date().toISOString().slice(0, 10), displayDate: 'Today', time: '09:00 AM', status: 'Present / Checked In', bonus: '+25 XP' }
    ],
    monthlyAttendance: [['Apr', Math.max(50, att - 4)], ['May', Math.min(100, att + 3)], ['Jun', Math.max(50, att - 2)], ['Jul', Math.min(100, att + 4)], ['Aug', att], ['Sep', att]],
    viewsThisWeek: [['Mon', 22], ['Tue', 36], ['Wed', 30], ['Thu', 44], ['Fri', 38], ['Sat', 16], ['Sun', 14]],
    ratings: [[5, 55], [4, 32], [3, 10], [2, 2], [1, 1]],
    subjects: subList
  };
}

// Helper: Records daily login, advances daily login streak, updates check-in, and awards daily bonus XP
function recordDailyLogin(user) {
  if (!user || user.role !== 'Student') return user;

  const todayStr = new Date().toISOString().slice(0, 10);
  const nowTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  const perf = { ...getStudentPerformance(user) };

  let streak = perf.loginStreak || 1;
  let bonusAwarded = false;
  const lastDate = perf.lastLoginDate;

  if (lastDate) {
    if (lastDate === todayStr) {
      // Already logged in today
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().slice(0, 10);

      if (lastDate === yesterdayStr) {
        streak += 1;
      } else {
        streak = 1; // broken streak restarted
      }
      perf.starPoints = (perf.starPoints || 1000) + 25;
      bonusAwarded = true;
    }
  } else {
    streak = 1;
    perf.starPoints = (perf.starPoints || 1000) + 25;
    bonusAwarded = true;
  }

  perf.loginStreak = streak;
  perf.lastLoginDate = todayStr;
  perf.lastLoginTime = nowTime;

  // Track weekly active login days (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const currentDayIdx = new Date().getDay();
  const weekly = Array.isArray(perf.weeklyLogins) ? [...perf.weeklyLogins] : [false, false, false, false, false, false, false];
  weekly[currentDayIdx] = true;
  perf.weeklyLogins = weekly;

  // Add entry to login history if not logged yet today
  const history = Array.isArray(perf.loginHistory) ? [...perf.loginHistory] : [];
  const alreadyToday = history.find(h => h.date === todayStr);
  if (!alreadyToday) {
    history.unshift({
      date: todayStr,
      displayDate: 'Today (' + new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) + ')',
      time: nowTime,
      status: 'Present / Checked In',
      bonus: bonusAwarded ? '+25 XP' : 'Checked In'
    });
    if (history.length > 7) history.pop();
    perf.loginHistory = history;
  }

  return {
    ...user,
    performance: perf
  };
}

const INITIAL_EMAIL_LOGS = [
  {
    id: 'email_init_1',
    timestamp: 'Today, 10:30 AM',
    type: 'Study Note',
    title: 'DBMS Complete Module 1-4',
    subject: 'DBMS',
    author: 'Prof. K. Verma',
    fileName: 'dbms_module1_4.pdf',
    recipients: ['rahul.bcayear@sbjit.edu.in'],
    recipientCount: 1,
    status: 'Delivered',
    subjectLine: '[SB Jain BCA Alert] New Study Note Uploaded: DBMS Complete Module 1-4 (DBMS)',
    body: 'Hello SB Jain BCA Student,\n\nFaculty Prof. K. Verma has just uploaded new study material for DBMS: "DBMS Complete Module 1-4".\n\nLog in to your SB Jain BCA Student Portal to access and download this resource.\n\nRegards,\nSB Jain Institute of Technology - BCA Department'
  }
];

function getStoredUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS);
    let usersList = INITIAL_DEFAULT_USERS;
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure default multi-students are present
        const existingNames = new Set(parsed.map(u => u.username));
        INITIAL_DEFAULT_USERS.forEach(def => {
          if (!existingNames.has(def.username)) {
            parsed.push(def);
          }
        });
        usersList = parsed;
      }
    }
    // Hydrate all students with their distinct performance
    const hydrated = usersList.map(u => {
      if (u.role === 'Student' && !u.performance) {
        return { ...u, performance: getStudentPerformance(u) };
      }
      return u;
    });
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(hydrated));
    return hydrated;
  } catch (err) {
    return INITIAL_DEFAULT_USERS;
  }
}

function saveStoredUsers(users) {
  try {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save users in localStorage', err);
  }
}

function getStoredEmailLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EMAIL_LOGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_EMAIL_LOGS, JSON.stringify(INITIAL_EMAIL_LOGS));
      return INITIAL_EMAIL_LOGS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_EMAIL_LOGS;
  } catch (err) {
    return INITIAL_EMAIL_LOGS;
  }
}

function saveStoredEmailLogs(logs) {
  try {
    localStorage.setItem(STORAGE_KEY_EMAIL_LOGS, JSON.stringify(logs));
  } catch (err) {}
}

function getStoredStudentNotifications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STUDENT_NOTIFICATIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_STUDENT_NOTIFICATIONS, JSON.stringify(INITIAL_EMAIL_LOGS));
      return INITIAL_EMAIL_LOGS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_EMAIL_LOGS;
  } catch (err) {
    return INITIAL_EMAIL_LOGS;
  }
}

function saveStoredStudentNotifications(notifs) {
  try {
    localStorage.setItem(STORAGE_KEY_STUDENT_NOTIFICATIONS, JSON.stringify(notifs));
  } catch (err) {}
}

function getStoredNotes() {
  try {
    let notesList = INITIAL_NOTES;
    const raw = localStorage.getItem(STORAGE_KEY_NOTES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        notesList = parsed;
      }
    }

    // Auto-recover notes that exist in studentNotifications but are missing from notesList
    try {
      const notifsRaw = localStorage.getItem(STORAGE_KEY_STUDENT_NOTIFICATIONS);
      if (notifsRaw) {
        const notifs = JSON.parse(notifsRaw);
        if (Array.isArray(notifs)) {
          let updated = false;
          notifs.forEach(n => {
            if (n.type === 'Study Note' && n.title) {
              const cleanTitle = n.title.trim().toLowerCase();
              const exists = notesList.some(item => (item.title || '').trim().toLowerCase() === cleanTitle);
              if (!exists) {
                const ext = getExt(n.fileName || 'pdf');
                notesList.unshift({
                  id: Date.now() + Math.floor(Math.random() * 10000),
                  title: n.title,
                  subject: n.subject || 'BCA Study Resource',
                  semester: 'Semester 2',
                  author: n.author || 'Faculty',
                  downloads: 0,
                  rating: 5.0,
                  fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                  fileType: ext,
                  fileName: n.fileName || `${n.title.replace(/\s+/g, '_').toLowerCase()}.${ext}`
                });
                updated = true;
              }
            }
          });
          if (updated) {
            saveStoredNotes(notesList);
          }
        }
      }
    } catch (e) {
      console.warn('Auto-sync from notifications error', e);
    }

    return notesList;
  } catch (err) {
    return INITIAL_NOTES;
  }
}

function saveStoredNotes(notesList) {
  try {
    localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notesList));
  } catch (err) {
    console.warn('LocalStorage save error, attempting safe stripped save', err);
    try {
      // Strip large base64 data URLs to avoid QuotaExceededError
      const safeNotes = notesList.map(n => {
        if (n.fileUrl && n.fileUrl.startsWith('data:') && n.fileUrl.length > 100000) {
          return { ...n, fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" };
        }
        return n;
      });
      localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(safeNotes));
    } catch (innerErr) {
      console.error('Failed to save notes to localStorage', innerErr);
    }
  }
}

function getStoredQuestions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_QUESTIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(INITIAL_QUESTIONS));
      return INITIAL_QUESTIONS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Ensure all questions carry a recognized category
      const hydrated = parsed.map((q, idx) => ({
        ...q,
        category: (q.category && APTITUDE_CATEGORIES.includes(q.category)) 
          ? q.category 
          : APTITUDE_CATEGORIES[idx % APTITUDE_CATEGORIES.length]
      }));

      // If any of the 4 standard categories are missing, bring them in from INITIAL_QUESTIONS
      const categoriesPresent = new Set(hydrated.map(q => q.category));
      const missingCats = APTITUDE_CATEGORIES.filter(c => !categoriesPresent.has(c));
      if (missingCats.length > 0) {
        INITIAL_QUESTIONS.forEach(defQ => {
          if (missingCats.includes(defQ.category) && !hydrated.some(h => h.question === defQ.question)) {
            hydrated.push(defQ);
          }
        });
      }
      localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(hydrated));
      return hydrated;
    }
    return INITIAL_QUESTIONS;
  } catch (err) {
    return INITIAL_QUESTIONS;
  }
}

function saveStoredQuestions(qList) {
  try {
    localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(qList));
  } catch (err) {
    console.error('Failed to save questions in localStorage', err);
  }
}

function App() {
  const [users, setUsers] = useState(getStoredUsers);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [notes, setNotes] = useState(getStoredNotes);
  const [questions, setQuestions] = useState(getStoredQuestions);
  const [aptitudeCategory, setAptitudeCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState([1, 2]);
  const [previewFile, setPreviewFile] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [emailLogs, setEmailLogs] = useState(getStoredEmailLogs);
  const [studentNotifications, setStudentNotifications] = useState(getStoredStudentNotifications);
  const [showNotifModal, setShowNotifModal] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = (user) => {
    const updatedUser = user.role === 'Student' ? recordDailyLogin(user) : user;
    setCurrentUser(updatedUser);
    setUsers(prev => {
      const idx = prev.findIndex(u => u.id === updatedUser.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = updatedUser;
        saveStoredUsers(next);
        return next;
      }
      return prev;
    });
    setIsLoggedIn(true);
    setActiveTab(updatedUser.role === 'Student' ? 'dashboard' : 'home');
    setShowNotifModal(false);
  };

  const handleCheckInToday = () => {
    if (!currentUser || currentUser.role !== 'Student') return;
    const updatedUser = recordDailyLogin(currentUser);
    setCurrentUser(updatedUser);
    setUsers(prev => {
      const idx = prev.findIndex(u => u.id === updatedUser.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = updatedUser;
        saveStoredUsers(next);
        return next;
      }
      return prev;
    });
    alert(`🎉 Daily Login Attendance Recorded! +25 XP Bonus awarded. Current streak: ${updatedUser.performance?.loginStreak} days 🔥`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setMobileMenuOpen(false);
    setShowNotifModal(false);
  };

  const handleRegisterUser = (newUser) => {
    const userWithPerf = newUser.role === 'Student' ? {
      ...newUser,
      performance: getStudentPerformance(newUser)
    } : newUser;
    setUsers(prev => {
      const updated = [userWithPerf, ...prev];
      saveStoredUsers(updated);
      return updated;
    });
  };

  const handleMockScoreSubmitted = (score, total) => {
    if (!currentUser || currentUser.role !== 'Student') return;
    const perf = { ...(currentUser.performance || getStudentPerformance(currentUser)) };
    perf.starPoints = (perf.starPoints || 1000) + score * 25;
    const updatedUser = { ...currentUser, performance: perf };
    setCurrentUser(updatedUser);
    setUsers(prev => {
      const idx = prev.findIndex(u => u.id === updatedUser.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = updatedUser;
        saveStoredUsers(next);
        return next;
      }
      return prev;
    });
  };

  const handleDeleteUser = (userId) => {
    if (currentUser && currentUser.id === userId) {
      alert("You cannot delete your own logged-in account!");
      return;
    }
    if (confirm("Are you sure you want to remove this user from the directory?")) {
      setUsers(prev => {
        const updated = prev.filter(u => u.id !== userId);
        saveStoredUsers(updated);
        return updated;
      });
    }
  };

  // API Call: Dispatch email notification directly to all registered BCA students
  const handleDispatchNotification = ({ type, title, subject, author, fileName }) => {
    const bcaStudents = users.filter(u => u.role === 'Student' && u.email);
    const recipientEmails = bcaStudents.map(u => u.email);
    const timestamp = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

    const newRecord = {
      id: 'email_' + Date.now(),
      timestamp,
      type, // 'Study Note' | 'Mock Assessment'
      title,
      subject,
      author: author || currentUser?.name || 'Faculty',
      fileName: fileName || `${title.replace(/\s+/g, '_').toLowerCase()}.pdf`,
      recipients: recipientEmails,
      recipientCount: recipientEmails.length,
      status: 'Delivered',
      subjectLine: `[SB Jain BCA Alert] New ${type} Uploaded: ${title} (${subject})`,
      body: `Hello SB Jain BCA Student,\n\nFaculty ${author || currentUser?.name} has just published a new ${type.toLowerCase()} for ${subject}:\n• Material: "${title}"\n• Associated File: ${fileName || 'Resource Document'}\n\nLog into your SB Jain BCA Student Portal to study and prepare.\n\nWarm regards,\nDepartment of BCA, S. B. Jain Institute of Technology\ninfo@sbjit.edu.in`
    };

    setEmailLogs(prev => {
      const updated = [newRecord, ...prev];
      saveStoredEmailLogs(updated);
      return updated;
    });

    setStudentNotifications(prev => {
      const updated = [newRecord, ...prev];
      saveStoredStudentNotifications(updated);
      return updated;
    });

    return newRecord;
  };

  const toggleBookmark = (id) => {
    setBookmarks(prev => prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]);
  };

  const handleAddNote = (newNote) => {
    setNotes(prev => {
      const updated = [newNote, ...prev];
      saveStoredNotes(updated);
      return updated;
    });
  };

  const handleDeleteNote = (id) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      setNotes(prev => {
        const updated = prev.filter(note => note.id !== id);
        saveStoredNotes(updated);
        return updated;
      });
    }
  };

  const handleAddQuestion = (newQ) => {
    setQuestions(prev => {
      const updated = [...prev, newQ];
      saveStoredQuestions(updated);
      return updated;
    });
  };

  const handleDeleteQuestion = (id) => {
    if (confirm("Are you sure you want to delete this question?")) {
      setQuestions(prev => {
        const updated = prev.filter(q => q.id !== id);
        saveStoredQuestions(updated);
        return updated;
      });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: 'sparkles' },
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'notes', label: 'Notes Library', icon: 'book' },
    { id: 'mocktest', label: 'Aptitude Tests', icon: 'test' },
    { id: 'admin', label: 'Admin Panel', icon: 'admin', adminOnly: true }
  ];

  if (!isLoggedIn) {
    return (
      <AuthPage 
        onLogin={handleLogin} 
        onRegister={handleRegisterUser} 
        users={users} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      />
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden relative hero-gradient-bg">
      {previewFile && <FileViewer file={previewFile} onClose={() => setPreviewFile(null)} />}
      {activeTab === 'home' && <div className="home-blur-bg"></div>}

      {/* Navigation Bar */}
      <header className="glass-nav border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-3 flex items-center justify-between z-30 flex-shrink-0">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-xl shadow-lg glow-effect">
              SB
            </div>
            <div>
              <h1 className="font-black text-lg leading-tight tracking-wide bg-gradient-to-r from-brand-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                SB Jain
              </h1>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block -mt-1">BCA Notes Library</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              if (item.adminOnly && currentUser?.role !== 'Admin') return null;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-2xl text-xs font-extrabold transition-all duration-200 ${
                    activeTab === item.id 
                      ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Icon name={item.icon} className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative hidden sm:block w-40 lg:w-56">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <Icon name="search" className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search BCA notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-900/80 rounded-2xl text-xs border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
            />
          </div>

          {/* User Profile Pill in Header */}
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-white text-xs font-black shadow-sm ${currentUser?.role === 'Admin' ? 'bg-gradient-to-tr from-purple-600 to-indigo-600' : 'bg-gradient-to-tr from-brand-600 to-cyan-600'}`}>
              {currentUser?.name ? currentUser.name[0].toUpperCase() : 'U'}
            </div>
            <div className="hidden lg:block text-left pr-1">
              <p className="text-xs font-bold leading-tight truncate max-w-[110px] text-slate-900 dark:text-slate-100">{currentUser?.name}</p>
              <p className="text-[10px] text-slate-400 font-semibold">{currentUser?.role} • {currentUser?.studentId}</p>
            </div>
          </div>

          {/* Direct College Email Notification Bell for Students */}
          {currentUser?.role === 'Student' && (
            <div className="relative">
              <button
                onClick={() => setShowNotifModal(!showNotifModal)}
                className="relative p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:scale-105 transition"
                title="Direct College Email Alerts"
              >
                <Icon name="bell" className="w-4 h-4 text-brand-500" />
                {studentNotifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center animate-pulse">
                    {studentNotifications.length}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {showNotifModal && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 glass-card p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl z-50 space-y-3 animate-fadeIn text-left">
                  <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
                    <div className="flex items-center space-x-2">
                      <Icon name="mail" className="w-4 h-4 text-brand-500" />
                      <h4 className="text-xs font-black">College Email Alerts</h4>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500">
                      {currentUser?.email}
                    </span>
                  </div>

                  <div className="max-h-64 overflow-y-auto space-y-2.5 pr-1">
                    {studentNotifications.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-4">No new email alerts received yet.</p>
                    ) : (
                      studentNotifications.map(n => (
                        <div key={n.id} className="p-3 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                          <div className="flex justify-between items-start text-[10px]">
                            <span className="font-bold text-brand-500 uppercase">{n.type}</span>
                            <span className="text-slate-400">{n.timestamp}</span>
                          </div>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{n.title}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                            Faculty {n.author} ({n.subject}) • Direct notification dispatched via College Email API
                          </p>
                          <div className="pt-1 flex items-center justify-between border-t border-slate-200/50 dark:border-slate-700/50">
                            <span className="text-[10px] text-slate-400 truncate max-w-[130px]">{n.fileName}</span>
                            {n.type === 'Study Note' ? (
                              <button
                                onClick={() => {
                                  setShowNotifModal(false);
                                  setActiveTab('notes');
                                  const match = notes.find(item => (item.title || '').trim().toLowerCase() === (n.title || '').trim().toLowerCase());
                                  if (match) {
                                    setPreviewFile(match);
                                  }
                                }}
                                className="px-2.5 py-1 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-[10px] font-bold transition flex items-center space-x-1"
                              >
                                <Icon name="eye" className="w-3 h-3" />
                                <span>View Note</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setShowNotifModal(false);
                                  const matchedCat = APTITUDE_CATEGORIES.find(c => (n.subject || '').includes(c) || (n.title || '').includes(c));
                                  if (matchedCat) setAptitudeCategory(matchedCat);
                                  setActiveTab('mocktest');
                                }}
                                className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-bold transition flex items-center space-x-1"
                              >
                                <Icon name="test" className="w-3 h-3" />
                                <span>Take Test</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:scale-105 transition"
            title="Toggle Dark / Light Mode"
          >
            <Icon name={darkMode ? "sun" : "moon"} className="w-4 h-4 text-amber-400" />
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition text-xs font-bold"
            title="Sign out of your session"
          >
            <Icon name="logout" className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-2xl bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200"
          >
            <Icon name={mobileMenuOpen ? "close" : "menu"} className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-b border-slate-200 dark:border-slate-800 px-4 py-3 space-y-2 z-20 animate-fadeIn">
          {navItems.map((item) => {
            if (item.adminOnly && currentUser?.role !== 'Admin') return null;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition ${
                  activeTab === item.id 
                    ? 'bg-brand-600 text-white shadow' 
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon name={item.icon} className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main View Container */}
      <div className="flex-1 overflow-y-auto flex flex-col justify-between relative z-10">
        <main className="p-4 md:p-8 space-y-8 flex-1">
          {activeTab === 'home' && (
            <>
              <LandingPageView 
                onNavigate={setActiveTab} 
                onStartAptitudeCategory={(cat) => {
                  setAptitudeCategory(cat || 'All');
                  setActiveTab('mocktest');
                }}
              />
              <Footer />
            </>
          )}
          {activeTab === 'dashboard' && (
            <DashboardView 
              notes={notes} 
              setPreviewFile={setPreviewFile} 
              currentUser={currentUser} 
              studentNotifications={studentNotifications} 
              onNavigate={setActiveTab} 
              onSelectCategory={setAptitudeCategory}
              onCheckInToday={handleCheckInToday}
            />
          )}
          {activeTab === 'notes' && (
            <NotesView notes={notes} bookmarks={bookmarks} toggleBookmark={toggleBookmark} searchQuery={searchQuery} setPreviewFile={setPreviewFile} />
          )}
          {activeTab === 'mocktest' && (
            <MockTestView 
              questions={questions} 
              currentUser={currentUser} 
              selectedCategory={aptitudeCategory}
              onCategoryChange={setAptitudeCategory}
              onScoreSubmitted={handleMockScoreSubmitted} 
            />
          )}
          {activeTab === 'admin' && currentUser?.role === 'Admin' && (
            <AdminView 
              notes={notes} 
              questions={questions}
              users={users}
              currentUser={currentUser}
              emailLogs={emailLogs}
              onAddNote={handleAddNote} 
              onDeleteNote={handleDeleteNote}
              onAddQuestion={handleAddQuestion}
              onDeleteQuestion={handleDeleteQuestion}
              onDeleteUser={handleDeleteUser}
              onDispatchNotification={handleDispatchNotification}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="glass-nav border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 py-8 px-6 md:px-12 mt-12 flex-shrink-0">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center text-white font-black text-sm">
              SB
            </div>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">S. B. Jain Institute</h4>
          </div>
          <p className="leading-relaxed">
            S. B. Jain Institute of Technology, Management & Research, Nagpur. An Autonomous Institute dedicated to academic excellence.
          </p>
        </div>

        <div className="space-y-3">
          <h5 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white">Campus Address</h5>
          <p className="leading-relaxed flex items-start space-x-2">
            <Icon name="map" className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
            <span>Near Jain International School, Yerla Village, Kalmeshwar Road, Nagpur - 441501, Maharashtra, India</span>
          </p>
        </div>

        <div className="space-y-3">
          <h5 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white">Official Contact & Links</h5>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <Icon name="mail" className="w-4 h-4 text-brand-500" />
              <span>Email: <a href="mailto:info@sbjit.edu.in" className="text-brand-500 hover:underline">info@sbjit.edu.in</a></span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon name="phone" className="w-4 h-4 text-brand-500" />
              <span>Admission Enquiry: +91-8999300998</span>
            </li>
            <li className="flex items-center space-x-2">
              <Icon name="globe" className="w-4 h-4 text-brand-500" />
              <span>Official Website: <a href="https://www.sbjit.edu.in" target="_blank" rel="noreferrer" className="text-brand-500 font-bold hover:underline">www.sbjit.edu.in</a></span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-slate-200 dark:border-slate-800/80 mt-8 pt-4 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-400">
        <p>© {new Date().getFullYear()} SB Jain Institute of Technology. All Rights Reserved.</p>
        <p className="mt-2 sm:mt-0">Student & Faculty Notes Management Portal</p>
      </div>
    </footer>
  );
}

function AuthPage({ onLogin, onRegister, users, darkMode, setDarkMode }) {
  // Standalone Panels: 'student_register' | 'admin_register' | 'signin'
  const [activePanel, setActivePanel] = useState('student_register');
  const [signInRole, setSignInRole] = useState('Student');

  // Password visibility states (White eye icon)
  const [showStudentPass, setShowStudentPass] = useState(false);
  const [showStudentConfirmPass, setShowStudentConfirmPass] = useState(false);
  const [showAdminPass, setShowAdminPass] = useState(false);
  const [showAdminConfirmPass, setShowAdminConfirmPass] = useState(false);
  const [showLoginPass, setShowLoginPass] = useState(false);

  // Sign In state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [successToast, setSuccessToast] = useState('');

  // Student registration state (Restricted strictly to BCA Department 1st, 2nd, 3rd years)
  const [studentForm, setStudentForm] = useState({
    name: '',
    studentId: '',
    department: 'BCA (Bachelor of Computer Applications)',
    semester: 'Year 1 • Semester 1',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  // Admin registration state
  const [adminForm, setAdminForm] = useState({
    name: '',
    facultyId: '',
    department: 'BCA & Computer Applications',
    designation: 'Assistant Professor',
    email: '',
    phone: '',
    adminSecret: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [registerError, setRegisterError] = useState('');

  // Sign In submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    setSuccessToast('');

    const query = loginIdentifier.trim().toLowerCase();
    const pass = loginPassword.trim();

    if (!query || !pass) {
      setLoginError('Please enter both your Username/ID/Email and Password.');
      return;
    }

    const matched = users.find(u => {
      const roleMatch = u.role.toLowerCase() === signInRole.toLowerCase();
      const idMatch = (u.username && u.username.toLowerCase() === query) ||
                      (u.studentId && u.studentId.toLowerCase() === query) ||
                      (u.email && u.email.toLowerCase() === query);
      return roleMatch && idMatch;
    });

    if (!matched) {
      setLoginError(`No registered ${signInRole} account found with that Username, ID, or Email.`);
      return;
    }

    if (matched.password !== pass) {
      setLoginError('Incorrect password. Please verify your credentials and try again.');
      return;
    }

    onLogin(matched);
  };

  // Student Registration submission (Strict Privacy for SB Jain BCA)
  const handleStudentSubmit = (e) => {
    e.preventDefault();
    setRegisterError('');

    const { name, studentId, department, semester, email, phone, username, password, confirmPassword } = studentForm;

    if (!name.trim() || !studentId.trim() || !email.trim() || !username.trim() || !password) {
      setRegisterError('Please fill out all required fields.');
      return;
    }

    // Strict Privacy: Only official college email ending with @sbjit.edu.in
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail.endsWith('@sbjit.edu.in')) {
      setRegisterError('Privacy Restriction: Only official SB Jain college emails ending with @sbjit.edu.in are authorized.');
      return;
    }

    // Strict BCA Format check: e.g. yourname.bcayear@sbjit.edu.in (e.g. rohit.bca1@sbjit.edu.in or priya.bca2@sbjit.edu.in)
    const localPart = trimmedEmail.split('@')[0];
    if (!localPart.includes('bca')) {
      setRegisterError('Privacy Restriction: Registration is limited strictly to SB Jain BCA Department students (Years 1, 2, 3). Your email must follow: yourname.bcayear@sbjit.edu.in (e.g. rohit.bca1@sbjit.edu.in, sneha.bca2@sbjit.edu.in, aman.bca3@sbjit.edu.in).');
      return;
    }

    // One-Time Registration Check: No duplicate emails allowed
    const duplicateEmail = users.some(u => u.email && u.email.toLowerCase() === trimmedEmail);
    if (duplicateEmail) {
      setRegisterError(`Registration Denied: The college email "${email.trim()}" is already registered. Each student can only register one time.`);
      return;
    }

    // Check PRN and Username duplicate
    const exists = users.find(u => 
      u.username.toLowerCase() === username.trim().toLowerCase() ||
      (u.studentId && u.studentId.toLowerCase() === studentId.trim().toLowerCase())
    );

    if (exists) {
      setRegisterError('An account with this Username or Student PRN is already registered.');
      return;
    }

    if (password !== confirmPassword) {
      setRegisterError('Passwords do not match. Please verify your password confirmation.');
      return;
    }

    if (password.length < 3) {
      setRegisterError('Password must be at least 3 characters long.');
      return;
    }

    const newUser = {
      id: 'student_' + Date.now(),
      role: 'Student',
      name: name.trim(),
      studentId: studentId.trim().toUpperCase(),
      department: 'BCA (Bachelor of Computer Applications)',
      semester,
      email: trimmedEmail,
      phone: phone.trim() || '+91 90000 00000',
      username: username.trim(),
      password: password,
      joinedDate: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
    };

    onRegister(newUser);
    setSuccessToast(`🎉 SB Jain BCA Student registered successfully for ${newUser.name}! Please sign in below.`);
    setActivePanel('signin');
    setSignInRole('Student');
    setLoginIdentifier(newUser.username);
    setLoginPassword(password);
  };

  // Admin Registration submission (Strict Faculty College Email & One-Time)
  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setRegisterError('');

    const { name, facultyId, department, designation, email, phone, adminSecret, username, password, confirmPassword } = adminForm;

    if (!name.trim() || !facultyId.trim() || !email.trim() || !username.trim() || !password || !adminSecret.trim()) {
      setRegisterError('Please fill out all required fields.');
      return;
    }

    // College Domain Check: must end with @sbjit.edu.in
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail.endsWith('@sbjit.edu.in')) {
      setRegisterError('Official Domain Error: Faculty must register with official SB Jain institutional email ending with @sbjit.edu.in');
      return;
    }

    // One-Time Registration Check: No duplicate emails allowed
    const duplicateEmail = users.some(u => u.email && u.email.toLowerCase() === trimmedEmail);
    if (duplicateEmail) {
      setRegisterError(`Registration Denied: The college email "${email.trim()}" is already registered. Each faculty member can only register one time.`);
      return;
    }

    // Faculty Authorization Code
    if (adminSecret.trim().toUpperCase() !== 'SBJAIN2026') {
      setRegisterError('Invalid Faculty Authorization Code. Please check the institutional code (Hint: SBJAIN2026).');
      return;
    }

    // Check duplicate ID/Username
    const exists = users.find(u => 
      u.username.toLowerCase() === username.trim().toLowerCase() ||
      (u.studentId && u.studentId.toLowerCase() === facultyId.trim().toLowerCase())
    );

    if (exists) {
      setRegisterError('An account with this Username or Faculty ID is already registered.');
      return;
    }

    if (password !== confirmPassword) {
      setRegisterError('Passwords do not match. Please verify your password confirmation.');
      return;
    }

    if (password.length < 3) {
      setRegisterError('Password must be at least 3 characters long.');
      return;
    }

    const newUser = {
      id: 'admin_' + Date.now(),
      role: 'Admin',
      name: name.trim(),
      studentId: facultyId.trim().toUpperCase(),
      department,
      designation,
      email: trimmedEmail,
      phone: phone.trim() || '+91 98000 00000',
      username: username.trim(),
      password: password,
      joinedDate: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
    };

    onRegister(newUser);
    setSuccessToast(`🎉 Faculty account registered successfully for ${newUser.name}! Please sign in below.`);
    setActivePanel('signin');
    setSignInRole('Admin');
    setLoginIdentifier(newUser.username);
    setLoginPassword(password);
  };

  const isWideCard = activePanel === 'student_register' || activePanel === 'admin_register';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-y-auto login-bg">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>

      {/* Dark/Light mode toggle */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 rounded-2xl bg-black/50 border border-white/20 hover:scale-105 transition text-white shadow-lg"
          title="Toggle Dark / Light Mode"
        >
          <Icon name={darkMode ? "sun" : "moon"} className="w-4 h-4 text-amber-400" />
        </button>
      </div>

      <div className={`w-full ${isWideCard ? 'max-w-2xl' : 'max-w-md'} login-glass-card rounded-3xl p-6 md:p-8 relative z-10 text-white my-6 shadow-2xl transition-all duration-300`}>
        {/* Header Branding */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-2xl mx-auto shadow-lg glow-effect">
            SB
          </div>
          <h2 className="text-2xl font-black text-white drop-shadow">
            SB Jain Institute of Technology
          </h2>
          <p className="text-xs text-slate-300">
            {activePanel === 'student_register' && '🔒 BCA Student Registration Panel • Years 1, 2 & 3 Exclusive'}
            {activePanel === 'admin_register' && '🛡️ Faculty & Admin Registration Panel • Curriculum & Notes Management'}
            {activePanel === 'signin' && 'Sign in to access your BCA dashboard and study notes library'}
          </p>
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="mb-5 p-3.5 bg-emerald-500/20 border border-emerald-500/50 rounded-2xl text-emerald-300 text-xs font-semibold flex items-center gap-2.5 animate-fadeIn">
            <Icon name="check" className="w-4 h-4 shrink-0 text-emerald-400" />
            <span className="flex-1">{successToast}</span>
            <button onClick={() => setSuccessToast('')} className="text-emerald-400 hover:text-white">✕</button>
          </div>
        )}

        {/* SEPARATE PANEL SELECTOR: 3 Distinct Independent Panels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-black/40 rounded-2xl border border-white/20 text-xs font-black mb-6">
          <button
            type="button"
            onClick={() => { setActivePanel('student_register'); setLoginError(''); setRegisterError(''); }}
            className={`py-3 px-2 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              activePanel === 'student_register' 
                ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-lg' 
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon name="academic" className="w-4 h-4 shrink-0" />
            <span>BCA Student Registration</span>
          </button>

          <button
            type="button"
            onClick={() => { setActivePanel('admin_register'); setLoginError(''); setRegisterError(''); }}
            className={`py-3 px-2 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              activePanel === 'admin_register' 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' 
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon name="shield" className="w-4 h-4 shrink-0" />
            <span>Admin Registration</span>
          </button>

          <button
            type="button"
            onClick={() => { setActivePanel('signin'); setLoginError(''); setRegisterError(''); }}
            className={`py-3 px-2 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
              activePanel === 'signin' 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg' 
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon name="logout" className="w-4 h-4 shrink-0 rotate-180" />
            <span>Sign In</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* PANEL 1: SEPARATE BCA STUDENT REGISTRATION PANEL                          */}
        {/* ========================================================================= */}
        {activePanel === 'student_register' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-3.5 bg-brand-500/10 border border-brand-500/30 rounded-2xl text-xs flex items-center space-x-3 text-brand-200">
              <Icon name="academic" className="w-5 h-5 shrink-0 text-brand-400" />
              <div>
                <span className="font-bold block text-white flex items-center gap-1.5">
                  <span>SB Jain BCA Student Registration</span>
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-black bg-brand-500/20 text-brand-300 uppercase tracking-wider">🔒 Restricted</span>
                </span>
                <span className="text-[11px] text-slate-300">
                  Exclusive to SB Jain BCA Department (1st, 2nd, and 3rd year students). One registration per student email.
                </span>
              </div>
            </div>

            {registerError && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-2xl text-red-200 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                <Icon name="close" className="w-4 h-4 shrink-0 text-red-400" />
                <span>{registerError}</span>
              </div>
            )}

            <form onSubmit={handleStudentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                    className="w-full p-2.5 bg-black/40 border border-white/30 rounded-xl text-xs outline-none focus:ring-2 focus:ring-brand-500 text-white placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1">Student PRN / Roll No *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SBJ2026BCA088"
                    value={studentForm.studentId}
                    onChange={(e) => setStudentForm({ ...studentForm, studentId: e.target.value })}
                    className="w-full p-2.5 bg-black/40 border border-white/30 rounded-xl text-xs outline-none focus:ring-2 focus:ring-brand-500 text-white placeholder-slate-400 uppercase"
                  />
                </div>

                {/* Locked BCA Department */}
                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1 flex items-center justify-between">
                    <span>Department *</span>
                    <span className="text-[10px] text-brand-300 font-semibold">🔒 BCA Only</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="BCA - Bachelor of Computer Applications"
                    className="w-full p-2.5 bg-slate-900/90 border border-brand-500/40 rounded-xl text-xs font-bold text-brand-300 cursor-not-allowed"
                  />
                </div>

                {/* BCA 1st, 2nd, 3rd Year Semesters */}
                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1">BCA Year & Semester *</label>
                  <select
                    value={studentForm.semester}
                    onChange={(e) => setStudentForm({ ...studentForm, semester: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-white/30 rounded-xl text-xs outline-none focus:ring-2 focus:ring-brand-500 text-white"
                  >
                    <option value="Year 1 • Semester 1">1st Year • Semester 1</option>
                    <option value="Year 1 • Semester 2">1st Year • Semester 2</option>
                    <option value="Year 2 • Semester 3">2nd Year • Semester 3</option>
                    <option value="Year 2 • Semester 4">2nd Year • Semester 4</option>
                    <option value="Year 3 • Semester 5">3rd Year • Semester 5</option>
                    <option value="Year 3 • Semester 6">3rd Year • Semester 6</option>
                  </select>
                </div>

                {/* College Email with strict BCA format */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-200 block mb-1 flex items-center justify-between">
                    <span>College Email (One-time registration) *</span>
                    <span className="text-[10px] text-amber-300 font-semibold">yourname.bcayear@sbjit.edu.in</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rohit.bca1@sbjit.edu.in or sneha.bca2@sbjit.edu.in"
                    value={studentForm.email}
                    onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                    className="w-full p-2.5 bg-black/40 border border-amber-400/40 rounded-xl text-xs outline-none focus:ring-2 focus:ring-amber-400 text-white placeholder-slate-400"
                  />
                  <p className="text-[10px] text-slate-300 mt-1">
                    Format: <code className="text-amber-300">yourname.bca1@sbjit.edu.in</code> (Year 1), <code className="text-amber-300">yourname.bca2@sbjit.edu.in</code> (Year 2), or <code className="text-amber-300">yourname.bca3@sbjit.edu.in</code> (Year 3).
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={studentForm.phone}
                    onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                    className="w-full p-2.5 bg-black/40 border border-white/30 rounded-xl text-xs outline-none focus:ring-2 focus:ring-brand-500 text-white placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1">Choose Username *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. aarav_sharma"
                    value={studentForm.username}
                    onChange={(e) => setStudentForm({ ...studentForm, username: e.target.value })}
                    className="w-full p-2.5 bg-black/40 border border-white/30 rounded-xl text-xs outline-none focus:ring-2 focus:ring-brand-500 text-white placeholder-slate-400"
                  />
                </div>

                {/* Password with White Eye Icon */}
                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1">Password *</label>
                  <div className="relative">
                    <input
                      type={showStudentPass ? "text" : "password"}
                      required
                      placeholder="Minimum 3 characters"
                      value={studentForm.password}
                      onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                      className="w-full pl-3 pr-10 py-2.5 bg-black/40 border border-white/30 rounded-xl text-xs outline-none focus:ring-2 focus:ring-brand-500 text-white placeholder-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowStudentPass(!showStudentPass)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white hover:text-slate-200 p-1 focus:outline-none"
                      title={showStudentPass ? "Hide password" : "Show password"}
                    >
                      <Icon name={showStudentPass ? "eye-off" : "eye"} className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Confirm Password with White Eye Icon */}
                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1">Confirm Password *</label>
                  <div className="relative">
                    <input
                      type={showStudentConfirmPass ? "text" : "password"}
                      required
                      placeholder="Re-enter password"
                      value={studentForm.confirmPassword}
                      onChange={(e) => setStudentForm({ ...studentForm, confirmPassword: e.target.value })}
                      className="w-full pl-3 pr-10 py-2.5 bg-black/40 border border-white/30 rounded-xl text-xs outline-none focus:ring-2 focus:ring-brand-500 text-white placeholder-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowStudentConfirmPass(!showStudentConfirmPass)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white hover:text-slate-200 p-1 focus:outline-none"
                      title={showStudentConfirmPass ? "Hide password" : "Show password"}
                    >
                      <Icon name={showStudentConfirmPass ? "eye-off" : "eye"} className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold rounded-2xl shadow-lg hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center space-x-2"
              >
                <Icon name="academic" className="w-4 h-4" />
                <span>Submit BCA Student Registration</span>
              </button>
            </form>

            <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-300 pt-3 border-t border-white/10 gap-2">
              <div>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => { setActivePanel('signin'); setSignInRole('Student'); setRegisterError(''); }}
                  className="text-brand-300 font-bold hover:underline"
                >
                  Go to Sign In
                </button>
              </div>
              <button
                type="button"
                onClick={() => { setActivePanel('admin_register'); setRegisterError(''); }}
                className="text-purple-300 font-bold hover:underline text-[11px]"
              >
                Register as Admin / Faculty instead →
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PANEL 2: SEPARATE ADMIN / FACULTY REGISTRATION PANEL                      */}
        {/* ========================================================================= */}
        {activePanel === 'admin_register' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-3.5 bg-purple-500/10 border border-purple-500/30 rounded-2xl text-xs flex items-center space-x-3 text-purple-200">
              <Icon name="shield" className="w-5 h-5 shrink-0 text-purple-400" />
              <div>
                <span className="font-bold block text-white">Admin / Faculty Registration Panel</span>
                <span className="text-[11px] text-slate-300">Register official SB Jain faculty credentials. Direct email notifications will dispatch to all BCA students when uploading content.</span>
              </div>
            </div>

            {registerError && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-2xl text-red-200 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                <Icon name="close" className="w-4 h-4 shrink-0 text-red-400" />
                <span>{registerError}</span>
              </div>
            )}

            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1">Full Name with Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Sharma"
                    value={adminForm.name}
                    onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                    className="w-full p-2.5 bg-black/40 border border-white/30 rounded-xl text-xs outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1">Faculty / Employee ID *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FAC-BCA-104"
                    value={adminForm.facultyId}
                    onChange={(e) => setAdminForm({ ...adminForm, facultyId: e.target.value })}
                    className="w-full p-2.5 bg-black/40 border border-white/30 rounded-xl text-xs outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-slate-400 uppercase"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1">Department *</label>
                  <select
                    value={adminForm.department}
                    onChange={(e) => setAdminForm({ ...adminForm, department: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-white/30 rounded-xl text-xs outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  >
                    <option value="BCA & Computer Applications">BCA & Computer Applications</option>
                    <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                    <option value="Artificial Intelligence & Data Science">AI & Data Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Management Studies">Management Studies</option>
                    <option value="Academic & Examination Cell">Academic & Examination Cell</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1">Designation *</label>
                  <select
                    value={adminForm.designation}
                    onChange={(e) => setAdminForm({ ...adminForm, designation: e.target.value })}
                    className="w-full p-2.5 bg-slate-900 border border-white/30 rounded-xl text-xs outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  >
                    <option value="Professor & HOD">Professor & HOD</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Dean / Principal">Dean / Principal</option>
                    <option value="Academic Coordinator">Academic Coordinator</option>
                    <option value="System / Lab Administrator">System / Lab Administrator</option>
                  </select>
                </div>

                {/* College Email with @sbjit.edu.in validation & one-time check */}
                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1">Institutional Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. r.sharma@sbjit.edu.in"
                    value={adminForm.email}
                    onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                    className="w-full p-2.5 bg-black/40 border border-white/30 rounded-xl text-xs outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-slate-400"
                  />
                  <p className="text-[10px] text-slate-300 mt-1">Must end with @sbjit.edu.in (One-time registration)</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1 flex items-center justify-between">
                    <span>Admin Security Passcode *</span>
                    <span className="text-[10px] text-amber-300 font-normal">Hint: SBJAIN2026</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter code: SBJAIN2026"
                    value={adminForm.adminSecret}
                    onChange={(e) => setAdminForm({ ...adminForm, adminSecret: e.target.value })}
                    className="w-full p-2.5 bg-black/40 border border-amber-400/40 rounded-xl text-xs outline-none focus:ring-2 focus:ring-amber-400 text-white placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1">Admin Username *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. rajesh_sharma"
                    value={adminForm.username}
                    onChange={(e) => setAdminForm({ ...adminForm, username: e.target.value })}
                    className="w-full p-2.5 bg-black/40 border border-white/30 rounded-xl text-xs outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-slate-400"
                  />
                </div>

                {/* Admin Password with White Eye Icon */}
                <div>
                  <label className="text-xs font-bold text-slate-200 block mb-1">Password *</label>
                  <div className="relative">
                    <input
                      type={showAdminPass ? "text" : "password"}
                      required
                      placeholder="Minimum 3 characters"
                      value={adminForm.password}
                      onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                      className="w-full pl-3 pr-10 py-2.5 bg-black/40 border border-white/30 rounded-xl text-xs outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdminPass(!showAdminPass)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white hover:text-slate-200 p-1 focus:outline-none"
                      title={showAdminPass ? "Hide password" : "Show password"}
                    >
                      <Icon name={showAdminPass ? "eye-off" : "eye"} className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Admin Confirm Password with White Eye Icon */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-200 block mb-1">Confirm Password *</label>
                  <div className="relative">
                    <input
                      type={showAdminConfirmPass ? "text" : "password"}
                      required
                      placeholder="Re-enter password to confirm"
                      value={adminForm.confirmPassword}
                      onChange={(e) => setAdminForm({ ...adminForm, confirmPassword: e.target.value })}
                      className="w-full pl-3 pr-10 py-2.5 bg-black/40 border border-white/30 rounded-xl text-xs outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdminConfirmPass(!showAdminConfirmPass)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white hover:text-slate-200 p-1 focus:outline-none"
                      title={showAdminConfirmPass ? "Hide password" : "Show password"}
                    >
                      <Icon name={showAdminConfirmPass ? "eye-off" : "eye"} className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-brand-600 hover:opacity-95 text-white font-bold rounded-2xl shadow-lg hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center space-x-2"
              >
                <Icon name="shield" className="w-4 h-4" />
                <span>Submit Admin Registration</span>
              </button>
            </form>

            <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-300 pt-3 border-t border-white/10 gap-2">
              <div>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => { setActivePanel('signin'); setSignInRole('Admin'); setRegisterError(''); }}
                  className="text-purple-300 font-bold hover:underline"
                >
                  Go to Sign In
                </button>
              </div>
              <button
                type="button"
                onClick={() => { setActivePanel('student_register'); setRegisterError(''); }}
                className="text-brand-300 font-bold hover:underline text-[11px]"
              >
                Register as Student instead →
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PANEL 3: SEPARATE SIGN IN PORTAL                                          */}
        {/* ========================================================================= */}
        {activePanel === 'signin' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Direct Role Switcher within Sign In */}
            <div className="flex bg-black/40 p-1 rounded-2xl border border-white/20 text-xs font-bold">
              <button
                type="button"
                onClick={() => { setSignInRole('Student'); setLoginError(''); }}
                className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center space-x-2 ${
                  signInRole === 'Student' ? 'bg-brand-600 text-white shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Icon name="academic" className="w-4 h-4" />
                <span>BCA Student Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => { setSignInRole('Admin'); setLoginError(''); }}
                className={`flex-1 py-2.5 rounded-xl transition flex items-center justify-center space-x-2 ${
                  signInRole === 'Admin' ? 'bg-purple-600 text-white shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Icon name="shield" className="w-4 h-4" />
                <span>Faculty / Admin Sign In</span>
              </button>
            </div>

            {loginError && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-2xl text-red-200 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                <Icon name="close" className="w-4 h-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1.5 flex items-center justify-between">
                  <span>Username, {signInRole === 'Student' ? 'BCA PRN / Roll No' : 'Faculty ID'}, or College Email</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Icon name={signInRole === 'Student' ? "academic" : "shield"} className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/30 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-brand-500 text-white placeholder-slate-400"
                    placeholder={signInRole === 'Student' ? "e.g. student or rohit.bca1@sbjit.edu.in" : "e.g. admin or k.verma@sbjit.edu.in"}
                  />
                </div>
              </div>

              {/* Sign In Password with White Eye Icon */}
              <div>
                <label className="text-xs font-bold text-slate-200 block mb-1.5 flex items-center justify-between">
                  <span>Password</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Icon name="lock" className="w-4 h-4" />
                  </div>
                  <input
                    type={showLoginPass ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-black/40 border border-white/30 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-brand-500 text-white placeholder-slate-400"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPass(!showLoginPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-slate-200 p-1 focus:outline-none"
                    title={showLoginPass ? "Hide password" : "Show password"}
                  >
                    <Icon name={showLoginPass ? "eye-off" : "eye"} className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-3.5 ${signInRole === 'Admin' ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-brand-600' : 'bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600'} hover:opacity-95 text-white font-bold rounded-2xl shadow-lg hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center space-x-2`}
              >
                <Icon name={signInRole === 'Student' ? "academic" : "shield"} className="w-4 h-4" />
                <span>Sign In as {signInRole}</span>
              </button>
            </form>

            <div className="pt-3 border-t border-white/10 text-center space-y-1.5">
              <p className="text-xs text-slate-300">Don't have an account yet?</p>
              <div className="flex justify-center gap-4 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => { setActivePanel('student_register'); setLoginError(''); }}
                  className="text-brand-300 hover:underline flex items-center gap-1"
                >
                  <Icon name="academic" className="w-3.5 h-3.5" />
                  <span>BCA Student Registration</span>
                </button>
                <span className="text-slate-500">•</span>
                <button
                  type="button"
                  onClick={() => { setActivePanel('admin_register'); setLoginError(''); }}
                  className="text-purple-300 hover:underline flex items-center gap-1"
                >
                  <Icon name="shield" className="w-3.5 h-3.5" />
                  <span>Faculty Registration</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function LandingPageView({ onNavigate, onStartAptitudeCategory }) {
  const [feedbackRating, setFeedbackRating] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [burst, setBurst] = useState({ value: null, key: 0 });
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

  const feedbackOptions = [
    { label: 'Bad', emoji: '😞', value: 'bad' },
    { label: 'Good', emoji: '😊', value: 'good' },
    { label: 'Very Good', emoji: '🤩', value: 'very_good' }
  ];

  const aptitude = [
    { icon: '🧮', title: 'Quantitative Aptitude', info: 'Percentages, ratios, time & work, profit & loss', q: 25, min: 30 },
    { icon: '🧩', title: 'Logical Reasoning', info: 'Sequences, coding-decoding, relations, syllogisms', q: 20, min: 25 },
    { icon: '📝', title: 'Verbal Ability', info: 'Vocabulary, grammar, synonyms, comprehension', q: 20, min: 20 },
    { icon: '📈', title: 'Data Interpretation', info: 'Charts, tables, graphs & statistical analysis', q: 15, min: 25 }
  ];

  const handlePick = (value) => {
    setFeedbackRating(value);
    setBurst({ value, key: Date.now() });
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedbackRating) return;
    if (feedbackText.trim()) {
      const emoji = feedbackOptions.find(o => o.value === feedbackRating).emoji;
      setReviews(prev => [{ name: 'You', course: 'SB Jain Student', emoji, text: feedbackText.trim() }, ...prev]);
    }
    setSubmittedFeedback(true);
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto py-4">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600/90 via-indigo-600/90 to-purple-700/90 p-8 md:p-14 text-white shadow-2xl glow-effect flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 bg-black/30 backdrop-blur-md border border-white/20 rounded-full text-[11px] font-bold flex items-center space-x-1.5">
          <Icon name="calendar" className="w-3.5 h-3.5" />
          <span>{today}</span>
        </div>

        <div className="space-y-6 max-w-2xl z-10 pt-6 md:pt-0">
          <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-extrabold uppercase tracking-widest border border-white/30 inline-flex items-center space-x-2">
            <span>SB Jain Institute of Technology</span>
          </span>

          <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
            Smart Notes Platform for <span className="bg-gradient-to-r from-amber-300 to-pink-300 bg-clip-text text-transparent">SB Jain Students</span>
          </h1>

          <p className="text-slate-100 text-base md:text-lg leading-relaxed font-normal">
            Access verified faculty notes, download previous year question papers, attempt timed mock tests, and analyze performance metrics in one centralized dashboard.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button 
              onClick={() => onNavigate('notes')} 
              className="px-8 py-4 bg-white text-brand-700 rounded-2xl font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition flex items-center space-x-2"
            >
              <Icon name="book" className="w-5 h-5" />
              <span>Explore Notes Library</span>
            </button>
            
            <button 
              onClick={() => {
                if (onStartAptitudeCategory) onStartAptitudeCategory('All');
                else onNavigate('mocktest');
              }} 
              className="px-8 py-4 bg-black/30 hover:bg-black/40 backdrop-blur-md border border-white/30 text-white rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition flex items-center space-x-2"
            >
              <Icon name="test" className="w-5 h-5" />
              <span>Take Aptitude Test</span>
            </button>
          </div>
        </div>
      </section>

      {/* Aptitude Test Section */}
      <section className="space-y-5">
        <div className="text-center space-y-1">
          <h2 className="text-2xl md:text-3xl font-black">Aptitude Test Sections</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Practice placement-style aptitude tests, section by section with live scoring.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {aptitude.map(a => (
            <div key={a.title} className="glass-card p-5 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:-translate-y-1 hover:border-brand-500 transition duration-300">
              <div className="space-y-2">
                <span className="text-4xl emoji-idle">{a.icon}</span>
                <h3 className="font-extrabold text-sm">{a.title}</h3>
                <p className="text-xs text-slate-400">{a.info}</p>
                <p className="text-[11px] font-bold text-brand-500">{a.q} Practice Questions • {a.min} min</p>
              </div>
              <button
                onClick={() => {
                  if (onStartAptitudeCategory) {
                    onStartAptitudeCategory(a.title);
                  } else {
                    onNavigate('mocktest');
                  }
                }}
                className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-1.5 shadow"
              >
                <Icon name="test" className="w-3.5 h-3.5" />
                <span>Start {a.title.split(' ')[0]}</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Feedback Section */}
      <section className="space-y-8">
        <div className="glass-card p-6 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 text-center max-w-2xl mx-auto shadow-xl">
          <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-black">How do you like our portal?</h3>
            <p className="text-xs text-slate-400">Tap an emoji — your feedback helps us improve notes availability and experience for SB Jain students.</p>
          </div>

          {submittedFeedback ? (
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-500 space-y-2 animate-fadeIn">
              <h4 className="font-black text-lg">Thank you for your feedback! 🎉</h4>
              <p className="text-xs">We appreciate your support in making the SB Jain portal better.</p>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-6">
              <div className="flex justify-center gap-4 sm:gap-6">
                {feedbackOptions.map((opt, i) => {
                  const isSelected = feedbackRating === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handlePick(opt.value)}
                      className={`relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl border transition duration-200 w-28 sm:w-32 ${
                        isSelected 
                          ? 'bg-brand-600 text-white border-brand-600 scale-105 shadow-lg' 
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:scale-105'
                      }`}
                    >
                      {burst.value === opt.value && [-30, -12, 8, 26, 40].map((dx, n) => (
                        <span key={burst.key + '-' + n} className="emoji-burst text-lg" style={{ '--dx': dx + 'px', animationDelay: n * 40 + 'ms' }}>{opt.emoji}</span>
                      ))}
                      <span
                        key={isSelected ? 'on-' + burst.key : 'off'}
                        className={`text-3xl sm:text-4xl mb-2 ${isSelected ? 'emoji-selected' : 'emoji-idle'}`}
                        style={isSelected ? undefined : { animationDelay: i * 0.3 + 's' }}
                      >{opt.emoji}</span>
                      <span className="text-xs font-bold">{opt.label}</span>
                    </button>
                  );
                })}
              </div>

              {feedbackRating && (
                <div className="space-y-4 animate-fadeIn">
                  <textarea
                    rows="3"
                    placeholder="Any additional comments or suggestions? (Optional)"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="w-full p-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  <button
                    type="submit"
                    className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-md transition"
                  >
                    Submit Feedback
                  </button>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Scrolling student reviews */}
        <div className="space-y-3">
          <h3 className="text-center text-lg font-black">What Students Say</h3>
          <div className="marquee">
            <div className="marquee-track" style={{ animationDuration: reviews.length * 7 + 's' }}>
              {[...reviews, ...reviews].map((r, i) => (
                <div key={i} className="glass-card w-72 shrink-0 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{r.emoji}</span>
                    <div>
                      <p className="text-xs font-extrabold">{r.name}</p>
                      <p className="text-[10px] text-slate-400">{r.course}</p>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">“{r.text}”</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function DashboardView({ notes, setPreviewFile, currentUser, studentNotifications = [], onNavigate, onCheckInToday }) {
  const isStudent = currentUser?.role === 'Student';
  const perf = isStudent ? (currentUser?.performance || getStudentPerformance(currentUser)) : null;

  const att = perf ? perf.attendance : 88;
  const isAttLow = isStudent && att < 75;
  const classesNeeded = isAttLow ? Math.max(1, Math.ceil((0.75 * 50 - (att * 0.5)) / 0.25)) : 0;
  const streak = perf ? (perf.loginStreak || 1) : 5;
  const rank = perf ? (perf.rank || 4) : 4;
  const grade = perf ? (perf.grade || 'A') : 'A';
  const overallScore = perf ? (perf.overallScore || 85) : 85;

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayDayIdx = new Date().getDay();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Personalized Welcome Banner */}
      <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-brand-600/10 via-indigo-600/10 to-purple-600/10">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded-full text-[11px] font-black uppercase tracking-wider">
            <Icon name={currentUser?.role === 'Admin' ? "shield" : "academic"} className="w-3.5 h-3.5" />
            <span>{currentUser?.role === 'Admin' ? 'Faculty & Administration Portal' : `Student Academic Hub • ${currentUser?.name}`}</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            Welcome back, {currentUser?.name || 'Scholar'}! 👋
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {currentUser?.role === 'Admin' 
              ? `${currentUser?.designation || 'Faculty'} • Department: ${currentUser?.department || 'Engineering'} • Faculty ID: ${currentUser?.studentId || 'FAC-01'}`
              : `Department: ${currentUser?.department || 'BCA'} • ${currentUser?.semester || 'Semester 2'} • PRN: ${currentUser?.studentId || 'SBJ2026BCA001'} • Logged in as @${currentUser?.username}`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isStudent && (
            <div className="px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-right">
              <p className="text-[10px] font-bold text-emerald-500 uppercase flex items-center gap-1 justify-end">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Daily Login Active</span>
              </p>
              <p className="text-xs font-black text-emerald-600 dark:text-emerald-400">Checked In Today</p>
            </div>
          )}
          <div className="px-4 py-2 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Role Status</p>
            <p className="text-xs font-black text-brand-600 dark:text-brand-400">{currentUser?.role} Authorized</p>
          </div>
        </div>
      </div>

      {/* ─── DAILY LOGIN & ATTENDANCE CHECK-IN HUB ─── */}
      {isStudent && perf && (
        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-brand-600/5 via-indigo-600/5 to-purple-600/5 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="p-2 bg-brand-500/10 text-brand-500 rounded-xl">
                  <Icon name="calendar" className="w-5 h-5" />
                </span>
                <h3 className="text-base font-black">Daily Login & Attendance Performance</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-wider">
                  Checked In ✅
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Daily web portal logins automatically verify your attendance streak and earn academic star points.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onCheckInToday}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-sm active:scale-95"
              >
                <Icon name="check" className="w-4 h-4" />
                <span>Check In Today (+25 XP)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Streak card */}
            <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase">
                <span>Daily Login Streak</span>
                <span className="text-amber-500">🔥 On Fire</span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white">{streak}</span>
                <span className="text-xs font-bold text-slate-500">Days Consecutive</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                {streak >= 5 ? 'Master Streak! You earned +120 bonus XP this week.' : `${7 - streak} more daily logins to unlock the 7-Day Streak Master badge.`}
              </p>
            </div>

            {/* Today check-in status */}
            <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase">
                <span>Today's Check-In</span>
                <span className="text-emerald-500 font-bold">● Recorded</span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-black text-slate-900 dark:text-white">{perf.lastLoginTime || '09:00 AM'}</span>
                <span className="text-xs font-semibold text-emerald-500">Today Verified</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Daily login verified on {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}.
              </p>
            </div>

            {/* Weekly Active Track */}
            <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-400 font-bold uppercase">
                <span>This Week's Attendance</span>
                <span className="text-brand-500 font-bold">Week View</span>
              </div>
              <div className="flex items-center justify-between gap-1 pt-1">
                {daysOfWeek.map((day, idx) => {
                  const isChecked = Array.isArray(perf.weeklyLogins) ? !!perf.weeklyLogins[idx] : (idx <= todayDayIdx);
                  const isToday = idx === todayDayIdx;
                  return (
                    <div key={day} className="flex-1 flex flex-col items-center gap-1">
                      <span className={`text-[10px] font-bold ${isToday ? 'text-brand-500' : 'text-slate-400'}`}>{day}</span>
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black transition ${
                        isChecked 
                          ? 'bg-emerald-500 text-white shadow-sm' 
                          : isToday 
                            ? 'border-2 border-brand-500 text-brand-500' 
                            : 'bg-slate-200/50 dark:bg-slate-800/60 text-slate-400'
                      }`}>
                        {isChecked ? '✓' : isToday ? '•' : '—'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Alert Banner if Attendance < 75% */}
      {isAttLow && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-start space-x-3 animate-fadeIn">
          <Icon name="clock" className="w-5 h-5 shrink-0 mt-0.5 text-amber-500" />
          <div className="space-y-1 text-xs">
            <h4 className="font-black text-sm">Attendance Shortfall Alert: {att}% (Below 75% Minimum Requirement)</h4>
            <p className="leading-relaxed">
              Your overall attendance is currently below the mandatory 75% requirement. You must attend approximately 
              <strong className="mx-1 underline text-amber-500 font-black">{classesNeeded} more consecutive classes</strong>
              without missing any to return to the safe threshold of 75%.
            </p>
          </div>
        </div>
      )}

      {/* Personalized KPI Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Overall Attendance</p>
            <p className={`text-2xl font-black mt-1 ${att >= 75 ? 'text-emerald-500' : att >= 60 ? 'text-amber-500' : 'text-red-500'}`}>
              {att}%
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {att >= 75 ? '✅ Safe (> 75% required)' : '⚠️ Below 75% minimum'}
            </p>
          </div>
          <div className={`p-3 rounded-2xl ${att >= 75 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
            <Icon name="check" className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Daily Login Streak</p>
            <p className="text-2xl font-black mt-1 text-amber-500">
              {streak} Days 🔥
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">Checked In Daily Webpage</p>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl">
            <Icon name="sparkles" className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Academic Score</p>
            <p className="text-2xl font-black mt-1 text-brand-500">
              {overallScore}% (Grade {grade})
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">Semester Assessments Avg</p>
          </div>
          <div className="p-3 bg-brand-500/10 text-brand-500 rounded-2xl">
            <Icon name="academic" className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase">Department Rank</p>
            <p className="text-2xl font-black mt-1 text-purple-500">
              #{rank} in Dept
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">{perf?.starPoints || 1240} Total Star XP</p>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-500 rounded-2xl">
            <Icon name="star" className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Dynamic Student Charts */}
      <DashboardCharts studentData={perf} />

      {/* ─── SUBJECT-WISE ACADEMIC PERFORMANCE & ATTENDANCE BREAKDOWN ─── */}
      {isStudent && perf?.subjects && (
        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="p-2 bg-brand-500/10 text-brand-500 rounded-xl">
                  <Icon name="book" className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-black">Subject-Wise Performance & Attendance ({currentUser?.semester || 'Semester'})</h3>
              </div>
              <p className="text-xs text-slate-400">
                Course marks, class attendance percentage, and status for all enrolled subjects.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-brand-500/10 text-brand-500 rounded-full">
              {perf.subjects.length} Subjects Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-bold text-[10px]">
                  <th className="py-3 px-2">Course Code & Name</th>
                  <th className="py-3 px-2">Classes Attended</th>
                  <th className="py-3 px-2">Attendance %</th>
                  <th className="py-3 px-2">Assessment Marks</th>
                  <th className="py-3 px-2">Grade</th>
                  <th className="py-3 px-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {perf.subjects.map((s, idx) => {
                  const sAtt = s.attendance;
                  const isSafe = sAtt >= 75;
                  const isMid = sAtt >= 60;
                  return (
                    <tr key={idx} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-2">
                        <span className="font-mono font-bold text-brand-600 dark:text-brand-400 mr-2">{s.code}</span>
                        <span className="font-extrabold text-slate-900 dark:text-white">{s.name}</span>
                      </td>
                      <td className="py-3.5 px-2 text-slate-500 dark:text-slate-400">
                        {s.attended || Math.round(sAtt * 0.5)} / {s.total || 50} classes
                      </td>
                      <td className="py-3.5 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${isSafe ? 'bg-emerald-500' : isMid ? 'bg-amber-500' : 'bg-red-500'}`}
                              style={{ width: `${sAtt}%` }}
                            ></div>
                          </div>
                          <span className={`font-black ${isSafe ? 'text-emerald-500' : isMid ? 'text-amber-500' : 'text-red-500'}`}>
                            {sAtt}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-2 font-bold text-slate-700 dark:text-slate-200">
                        {s.marks} / {s.maxMarks || 100}
                      </td>
                      <td className="py-3.5 px-2">
                        <span className={`px-2 py-0.5 rounded-md font-black text-[10px] ${
                          s.grade.startsWith('A') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-brand-500/10 text-brand-500'
                        }`}>
                          {s.grade}
                        </span>
                      </td>
                      <td className="py-3.5 px-2 text-right">
                        {isSafe ? (
                          <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-emerald-500/10 text-emerald-500 inline-flex items-center gap-1">
                            <span>Good</span>
                          </span>
                        ) : isMid ? (
                          <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-amber-500/10 text-amber-500 inline-flex items-center gap-1">
                            <span>Warning</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-red-500/10 text-red-500 inline-flex items-center gap-1">
                            <span>Critical</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── RECENT DAILY LOGIN AUDIT LOG ─── */}
      {isStudent && perf?.loginHistory && perf.loginHistory.length > 0 && (
        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-black flex items-center space-x-2">
              <Icon name="clock" className="w-4 h-4 text-brand-500" />
              <span>Recent Daily Login History</span>
            </h4>
            <span className="text-[10px] font-bold text-slate-400">Daily Web Check-in Records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-bold text-[10px]">
                  <th className="py-2.5 px-2">Date</th>
                  <th className="py-2.5 px-2">Time of Check-in</th>
                  <th className="py-2.5 px-2">Web Attendance Status</th>
                  <th className="py-2.5 px-2 text-right">Reward</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {perf.loginHistory.slice(0, 5).map((log, i) => (
                  <tr key={i} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/40">
                    <td className="py-2.5 px-2 font-bold text-slate-800 dark:text-slate-200">{log.displayDate || log.date}</td>
                    <td className="py-2.5 px-2 text-slate-500">{log.time}</td>
                    <td className="py-2.5 px-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500">
                        {log.status || 'Present / Checked In'}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-right font-bold text-amber-500">{log.bonus || '+25 XP'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Direct College Email Broadcasts Feed */}
      <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="p-2 bg-brand-500/10 text-brand-500 rounded-xl">
                <Icon name="mail" className="w-5 h-5" />
              </span>
              <h3 className="text-lg font-black">Direct College Email Broadcasts</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-wider">
                API Live ⚡
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Instant alerts sent directly to registered BCA student college emails ({currentUser?.email || 'yourname.bcayear@sbjit.edu.in'})
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-brand-500/10 text-brand-500 rounded-full">
            {studentNotifications.length} Broadcasts Received
          </span>
        </div>

        {studentNotifications.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            No faculty email broadcasts recorded yet. When faculty uploads study material or tests, official email alerts arrive here.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studentNotifications.slice(0, 4).map(notif => (
              <div 
                key={notif.id} 
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 hover:border-brand-500/50 transition duration-200 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-1 bg-brand-600/10 text-brand-500 text-[10px] font-black rounded-lg uppercase tracking-wider">
                      {notif.type}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">{notif.timestamp}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                    <Icon name="check" className="w-3 h-3" /> Delivered
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                    {notif.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Subject: <span className="font-semibold text-slate-700 dark:text-slate-300">{notif.subject}</span> • Faculty: {notif.author}
                  </p>
                </div>

                <div className="p-2.5 bg-slate-100/80 dark:bg-slate-800/80 rounded-xl text-[11px] font-mono text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] font-bold text-slate-400 block mb-0.5">Dispatched to College Email:</span>
                  <div className="truncate text-brand-600 dark:text-brand-400 font-bold">
                    {currentUser?.email || (notif.recipients && notif.recipients[0]) || 'sbjain.bca@sbjit.edu.in'}
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400 truncate max-w-[140px]">File: {notif.fileName}</span>
                  {notif.type === 'Study Note' ? (
                    <button
                      onClick={() => {
                        const match = notes.find(n => (n.title || '').trim().toLowerCase() === (notif.title || '').trim().toLowerCase());
                        if (match && setPreviewFile) {
                          setPreviewFile(match);
                        } else if (onNavigate) {
                          onNavigate('notes');
                        }
                      }}
                      className="px-3 py-1 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg text-xs transition flex items-center space-x-1"
                    >
                      <Icon name="eye" className="w-3.5 h-3.5" />
                      <span>View Note</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onNavigate && onNavigate('mocktest')}
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs transition"
                    >
                      Take Test
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-black">Recent Uploads</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.slice(0, 4).map(note => (
            <div key={note.id} className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-brand-500/10 text-brand-500 rounded-xl">
                  <Icon name="book" className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{note.title}</h4>
                  <p className="text-xs text-slate-400">{note.subject} • Faculty: {note.author}</p>
                </div>
              </div>
              <button 
                onClick={() => setPreviewFile(note)}
                className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotesView({ notes, bookmarks, toggleBookmark, searchQuery, setPreviewFile }) {
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [filterBookmarked, setFilterBookmarked] = useState(false);

  const semesters = ['All', 'Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6'];

  const filtered = notes.filter(n => {
    const q = (searchQuery || '').trim().toLowerCase();
    const matchesSearch = !q || 
      (n.title || '').toLowerCase().includes(q) || 
      (n.subject || '').toLowerCase().includes(q) ||
      (n.author || '').toLowerCase().includes(q);

    const matchesSem = selectedSemester === 'All' || n.semester === selectedSemester;
    const matchesBookmark = !filterBookmarked || bookmarks.includes(n.id);

    return matchesSearch && matchesSem && matchesBookmark;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black">Notes Library</h2>
          <p className="text-xs text-slate-400">Verified study materials, syllabus modules and question papers</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterBookmarked(!filterBookmarked)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border ${
              filterBookmarked 
                ? 'bg-amber-500 text-white border-amber-500 shadow-sm' 
                : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Icon name="bookmark" className={`w-3.5 h-3.5 ${filterBookmarked ? 'fill-white' : ''}`} />
            <span>Bookmarked ({bookmarks.length})</span>
          </button>
          <span className="text-xs font-bold px-3 py-1.5 bg-brand-500/10 text-brand-500 rounded-xl">
            {filtered.length} {filtered.length === 1 ? 'Resource' : 'Resources'}
          </span>
        </div>
      </div>

      {/* Semester filter chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {semesters.map(sem => (
          <button
            key={sem}
            onClick={() => setSelectedSemester(sem)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${
              selectedSemester === sem 
                ? 'bg-brand-600 text-white shadow-md' 
                : 'bg-slate-100 dark:bg-slate-900/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {sem}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card p-12 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
            <Icon name="book" className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-base font-extrabold text-slate-800 dark:text-slate-200">No study materials found</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              {searchQuery ? `No notes matching "${searchQuery}".` : 'No study materials in this filter.'} Try selecting "All" semesters or clearing filters.
            </p>
          </div>
          {(selectedSemester !== 'All' || filterBookmarked || searchQuery) && (
            <button
              onClick={() => { setSelectedSemester('All'); setFilterBookmarked(false); }}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl transition inline-flex items-center space-x-1"
            >
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map(note => (
            <div key={note.id} className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-brand-500 transition duration-300">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-1 bg-brand-500/10 text-brand-500 text-[10px] rounded-lg font-black uppercase tracking-wider">
                    {note.semester || 'Semester 2'}
                  </span>
                  <button onClick={() => toggleBookmark(note.id)}>
                    <Icon name="bookmark" className={`w-5 h-5 ${bookmarks.includes(note.id) ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
                  </button>
                </div>
                <h3 className="font-extrabold text-base leading-snug">{note.title}</h3>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-slate-400">Faculty: {note.author || 'Faculty'}</p>
                  <FileBadge type={note.fileType || 'pdf'} />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 truncate max-w-[140px]">{note.subject}</span>
                <button 
                  onClick={() => setPreviewFile(note)}
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1"
                >
                  <Icon name="eye" className="w-3.5 h-3.5" />
                  <span>View Note</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MockTestView({ questions, currentUser, selectedCategory = 'All', onCategoryChange, onScoreSubmitted }) {
  const [activeCategory, setActiveCategory] = useState(selectedCategory || 'All');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    if (selectedCategory && selectedCategory !== activeCategory) {
      setActiveCategory(selectedCategory);
      setCurrentQ(0);
      setAnswers({});
      setSubmitted(false);
      setShowReview(false);
    }
  }, [selectedCategory]);

  const handleCategorySwitch = (cat) => {
    setActiveCategory(cat);
    if (onCategoryChange) onCategoryChange(cat);
    setCurrentQ(0);
    setAnswers({});
    setSubmitted(false);
    setShowReview(false);
  };

  const activeQuestions = useMemo(() => {
    if (activeCategory === 'All') return questions;
    return questions.filter(q => (q.category || 'Quantitative Aptitude') === activeCategory);
  }, [questions, activeCategory]);

  const handleSelectOption = (qId, optionIndex) => {
    if (!submitted) {
      setAnswers(prev => ({ ...prev, [qId]: optionIndex }));
    }
  };

  const calculateScore = () => {
    let score = 0;
    activeQuestions.forEach(q => {
      if (answers[q.id] === q.correct) score += 1;
    });
    return score;
  };

  const handleSubmitTest = () => {
    setSubmitted(true);
    const finalScore = calculateScore();
    if (onScoreSubmitted) {
      onScoreSubmitted(finalScore, activeQuestions.length);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentQ(0);
    setSubmitted(false);
    setShowReview(false);
  };

  const finalScore = calculateScore();
  const currentQuestionItem = activeQuestions[currentQ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Aptitude Category Tabs Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-2xl font-black flex items-center gap-2">
            <span>Aptitude Test Arena</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-500 font-bold">BCA Prep</span>
          </h2>
          <p className="text-xs text-slate-400">Section-wise practice for campus placements & technical assessments</p>
        </div>
        <span className="text-xs font-bold px-3 py-1.5 bg-brand-500/10 text-brand-500 rounded-xl">
          {activeQuestions.length} {activeQuestions.length === 1 ? 'MCQ' : 'MCQs'} in {activeCategory === 'All' ? 'Total' : activeCategory}
        </span>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => handleCategorySwitch('All')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition flex items-center space-x-1.5 ${
            activeCategory === 'All'
              ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <span>⚡</span>
          <span>All Aptitude ({questions.length})</span>
        </button>
        {APTITUDE_CATEGORIES.map(cat => {
          const count = questions.filter(q => (q.category || 'Quantitative Aptitude') === cat).length;
          const meta = CATEGORY_META[cat] || { icon: '⚡' };
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategorySwitch(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition flex items-center space-x-1.5 ${
                isSelected
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>{meta.icon}</span>
              <span>{cat}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {activeQuestions.length === 0 ? (
        <div className="text-center py-12 glass-card rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
            <Icon name="test" className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-800 dark:text-slate-200">No MCQs in {activeCategory}</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Faculty has not uploaded MCQs for this specific category yet. Try switching to another category.
            </p>
          </div>
          <button
            onClick={() => handleCategorySwitch('All')}
            className="px-4 py-2 bg-brand-600 text-white font-bold text-xs rounded-xl"
          >
            View All MCQs
          </button>
        </div>
      ) : !submitted ? (
        /* Active Test Question Card */
        <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-wrap justify-between items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <AptitudeCategoryBadge category={currentQuestionItem?.category || activeCategory} />
              <span className="text-xs font-bold text-slate-400">
                Question {currentQ + 1} of {activeQuestions.length}
              </span>
            </div>
            {/* Progress indicator */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-bold">
                Answered {Object.keys(answers).length}/{activeQuestions.length}
              </span>
              <div className="w-24 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-brand-500 rounded-full transition-all duration-300" 
                  style={{ width: `${Math.round(((currentQ + 1) / activeQuestions.length) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base md:text-lg font-extrabold text-slate-900 dark:text-white leading-relaxed">
              {currentQuestionItem?.question}
            </h3>

            <div className="space-y-3">
              {currentQuestionItem?.options.map((opt, idx) => {
                const isSelected = answers[currentQuestionItem.id] === idx;
                const letter = ['A', 'B', 'C', 'D'][idx] || idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(currentQuestionItem.id, idx)}
                    className={`w-full p-4 text-left text-xs font-bold rounded-2xl border transition flex items-center space-x-3 ${
                      isSelected 
                        ? 'bg-brand-600 text-white border-brand-600 shadow-md scale-[1.01]' 
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {letter}
                    </span>
                    <span className="flex-1">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              disabled={currentQ === 0}
              onClick={() => setCurrentQ(prev => prev - 1)}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-xs font-bold rounded-xl disabled:opacity-40 transition"
            >
              Previous
            </button>

            {currentQ < activeQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentQ(prev => prev + 1)}
                className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-md transition"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={handleSubmitTest}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-lg transition flex items-center space-x-1.5"
              >
                <Icon name="check" className="w-4 h-4" />
                <span>Submit & View Results</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Test Completion & Results Screen */
        <div className="space-y-6">
          <div className="p-8 glass-card rounded-3xl border border-emerald-500/30 text-center space-y-4 animate-fadeIn">
            <div className="inline-flex p-4 rounded-2xl bg-emerald-500/10 text-emerald-500">
              <Icon name="check" className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-emerald-500">Test Completed Successfully! 🎉</h3>
              <p className="text-xs text-slate-400 mt-1">Category: {activeCategory === 'All' ? 'Comprehensive Aptitude' : activeCategory}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto py-2">
              <div className="p-4 bg-slate-100 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Score</span>
                <span className="text-2xl font-black text-brand-500">{finalScore} / {activeQuestions.length}</span>
              </div>
              <div className="p-4 bg-slate-100 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Accuracy</span>
                <span className="text-2xl font-black text-emerald-500">
                  {Math.round((finalScore / activeQuestions.length) * 100)}%
                </span>
              </div>
              <div className="p-4 bg-slate-100 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Bonus XP</span>
                <span className="text-2xl font-black text-amber-500">+{finalScore * 25} XP</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={handleRetake}
                className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
              >
                <Icon name="clock" className="w-4 h-4" />
                <span>Retake This Section</span>
              </button>
              <button
                onClick={() => setShowReview(!showReview)}
                className="px-5 py-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition"
              >
                {showReview ? 'Hide Solutions' : 'Review Questions & Explanations'}
              </button>
            </div>
          </div>

          {/* Solutions & Explanations Review Section */}
          {showReview && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-lg font-black flex items-center gap-2">
                <Icon name="book" className="w-5 h-5 text-brand-500" />
                <span>Detailed Solutions & Explanations ({activeQuestions.length} MCQs)</span>
              </h3>

              <div className="space-y-4">
                {activeQuestions.map((q, qIdx) => {
                  const studentAns = answers[q.id];
                  const isCorrect = studentAns === q.correct;
                  const isSkipped = studentAns === undefined;

                  return (
                    <div 
                      key={q.id}
                      className={`glass-card p-6 rounded-3xl border ${
                        isCorrect 
                          ? 'border-emerald-500/40 bg-emerald-500/5' 
                          : isSkipped 
                            ? 'border-slate-300 dark:border-slate-700' 
                            : 'border-red-500/40 bg-red-500/5'
                      } space-y-3`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-800 text-xs font-bold flex items-center justify-center">
                            {qIdx + 1}
                          </span>
                          <AptitudeCategoryBadge category={q.category || activeCategory} />
                        </div>
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase ${
                          isCorrect 
                            ? 'bg-emerald-500/10 text-emerald-500' 
                            : isSkipped 
                              ? 'bg-slate-500/10 text-slate-400' 
                              : 'bg-red-500/10 text-red-500'
                        }`}>
                          {isCorrect ? '✓ Correct (+25 XP)' : isSkipped ? '⚪ Skipped' : '✗ Incorrect'}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{q.question}</h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {q.options.map((opt, oIdx) => {
                          const isOptionCorrect = oIdx === q.correct;
                          const wasSelected = studentAns === oIdx;

                          let badgeStyle = "bg-slate-100 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800";
                          if (isOptionCorrect) {
                            badgeStyle = "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40 font-bold";
                          } else if (wasSelected && !isOptionCorrect) {
                            badgeStyle = "bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40 line-through";
                          }

                          return (
                            <div key={oIdx} className={`p-3 rounded-xl border ${badgeStyle} flex items-center justify-between`}>
                              <span>{opt}</span>
                              {isOptionCorrect && <span className="text-[10px] font-bold text-emerald-500">Correct Answer ✓</span>}
                              {wasSelected && !isOptionCorrect && <span className="text-[10px] font-bold text-red-500">Your Choice ✗</span>}
                            </div>
                          );
                        })}
                      </div>

                      {q.explanation && (
                        <div className="p-3 bg-slate-100/80 dark:bg-slate-900/70 rounded-xl text-xs text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800">
                          <strong className="text-brand-500 block mb-0.5">Explanation:</strong>
                          <p>{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AdminView({ 
  notes, 
  questions, 
  users = [],
  currentUser,
  emailLogs = [],
  onAddNote, 
  onDeleteNote, 
  onAddQuestion, 
  onDeleteQuestion,
  onDeleteUser,
  onDispatchNotification
}) {
  const [adminTab, setAdminTab] = useState('resources'); // 'resources' | 'questions' | 'users' | 'broadcasts'
  const [sendEmailNotification, setSendEmailNotification] = useState(true);
  const [apiSuccessMsg, setApiSuccessMsg] = useState('');

  // Resources state
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [semester, setSemester] = useState('Semester 2');
  const [author, setAuthor] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileMeta, setFileMeta] = useState(null);
  const [isReadingFile, setIsReadingFile] = useState(false);
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  // Aptitude Question state
  const [questionCategory, setQuestionCategory] = useState('Quantitative Aptitude');
  const [questionExplanation, setQuestionExplanation] = useState('');
  const [manageCategoryFilter, setManageCategoryFilter] = useState('All');
  const [questionText, setQuestionText] = useState('');
  const [opt0, setOpt0] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [correctIndex, setCorrectIndex] = useState(0);

  // Users filter state
  const [userRoleFilter, setUserRoleFilter] = useState('All');
  const [userSearchTerm, setUserSearchTerm] = useState('');

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !subject.trim()) return;

    const finalFileName = fileMeta ? fileMeta.name : `${(title || 'resource').replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}.pdf`;
    const finalFileType = fileMeta ? fileMeta.type : 'pdf';
    const finalAuthor = author.trim() || currentUser?.name || "Faculty";
    const noteId = Date.now();

    const newNote = {
      id: noteId,
      title: title.trim(),
      subject: subject.trim(),
      semester: semester || "Semester 2",
      author: finalAuthor,
      downloads: 0,
      rating: 5.0,
      fileUrl: fileUrl || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      fileType: finalFileType,
      fileName: finalFileName
    };

    onAddNote(newNote);
    if (fileUrl && fileUrl.startsWith('data:')) {
      saveFileToIDB(noteId, fileUrl);
    }

    // College Email API trigger
    if (sendEmailNotification && onDispatchNotification) {
      const dispatched = onDispatchNotification({
        type: 'Study Note',
        title: newNote.title,
        subject: newNote.subject,
        author: finalAuthor,
        fileName: finalFileName
      });
      setApiSuccessMsg(`✅ Resource published to Notes Library! Direct college email notification dispatched to ${dispatched.recipientCount} registered BCA student email(s).`);
    } else {
      setApiSuccessMsg('✅ Resource published to Notes Library successfully!');
    }
    setTimeout(() => setApiSuccessMsg(''), 7000);

    setTitle('');
    setSubject('');
    setAuthor('');
    setFileUrl('');
    setFileMeta(null);
    setFileInputKey(Date.now());
  };

  const handleFileUploadChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const ext = getExt(file.name);
      setFileMeta({ name: file.name, type: ext, size: (file.size / 1024).toFixed(0) + ' KB' });
      setIsReadingFile(true);
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        setFileUrl(loadEvt.target.result);
        setIsReadingFile(false);
      };
      reader.onerror = () => {
        try {
          const localUrl = URL.createObjectURL(file);
          setFileUrl(localUrl);
        } catch (err) {}
        setIsReadingFile(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (!questionText.trim() || !opt0.trim() || !opt1.trim()) return;
    
    const newQ = {
      id: Date.now(),
      category: questionCategory,
      question: questionText.trim(),
      options: [opt0.trim(), opt1.trim(), opt2.trim() || "N/A", opt3.trim() || "N/A"].filter(Boolean),
      correct: Number(correctIndex),
      explanation: questionExplanation.trim() || undefined
    };

    onAddQuestion(newQ);

    // College Email API trigger
    if (sendEmailNotification && onDispatchNotification) {
      const titleShort = questionText.length > 50 ? questionText.slice(0, 47) + '...' : questionText;
      const dispatched = onDispatchNotification({
        type: 'Mock Assessment',
        title: `[${questionCategory}] ${titleShort}`,
        subject: `BCA Aptitude MCQs (${questionCategory})`,
        author: currentUser?.name || 'Faculty',
        fileName: 'Aptitude_MCQ_Question.pdf'
      });
      setApiSuccessMsg(`✅ ${questionCategory} MCQ added & published to Student Aptitude Section! Direct alert dispatched to ${dispatched.recipientCount} student(s).`);
    } else {
      setApiSuccessMsg(`✅ ${questionCategory} MCQ added & published to Student Aptitude Section successfully!`);
    }
    setTimeout(() => setApiSuccessMsg(''), 7000);

    setQuestionText('');
    setOpt0('');
    setOpt1('');
    setOpt2('');
    setOpt3('');
    setQuestionExplanation('');
    setCorrectIndex(0);
  };

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesRole = userRoleFilter === 'All' || u.role === userRoleFilter;
      const term = userSearchTerm.toLowerCase();
      const matchesSearch = !term || 
        (u.name && u.name.toLowerCase().includes(term)) ||
        (u.studentId && u.studentId.toLowerCase().includes(term)) ||
        (u.username && u.username.toLowerCase().includes(term)) ||
        (u.department && u.department.toLowerCase().includes(term));
      return matchesRole && matchesSearch;
    });
  }, [users, userRoleFilter, userSearchTerm]);

  const studentCount = users.filter(u => u.role === 'Student').length;
  const adminCount = users.filter(u => u.role === 'Admin').length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Admin Panel Header & Sub-Navigation */}
      <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black flex items-center space-x-2">
            <Icon name="admin" className="w-6 h-6 text-brand-500" />
            <span>Faculty & Administration Hub</span>
          </h2>
          <p className="text-xs text-slate-400">Manage notes, assessments, and registered students & administrators</p>
        </div>

        <div className="flex flex-wrap bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold gap-1">
          <button
            onClick={() => setAdminTab('resources')}
            className={`px-3 py-1.5 rounded-xl transition ${adminTab === 'resources' ? 'bg-brand-600 text-white shadow' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
          >
            Study Notes ({notes.length})
          </button>
          <button
            onClick={() => setAdminTab('questions')}
            className={`px-3 py-1.5 rounded-xl transition ${adminTab === 'questions' ? 'bg-brand-600 text-white shadow' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
          >
            Aptitude & MCQs ({questions.length})
          </button>
          <button
            onClick={() => setAdminTab('users')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center space-x-1.5 ${adminTab === 'users' ? 'bg-purple-600 text-white shadow' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
          >
            <Icon name="users" className="w-3.5 h-3.5" />
            <span>Registered Users ({users.length})</span>
          </button>
          <button
            onClick={() => setAdminTab('broadcasts')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center space-x-1.5 ${adminTab === 'broadcasts' ? 'bg-emerald-600 text-white shadow' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
          >
            <Icon name="mail" className="w-3.5 h-3.5" />
            <span>Email API Broadcasts ({emailLogs.length})</span>
          </button>
        </div>
      </div>

      {/* ==================== REGISTERED USERS DIRECTORY TAB ==================== */}
      {adminTab === 'users' && (
        <div className="space-y-6 animate-fadeIn">
          {/* User Metrics Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <p className="text-xs font-bold text-slate-400 uppercase">Total Registered</p>
              <p className="text-2xl font-black mt-1 text-brand-500">{users.length} Users</p>
            </div>
            <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <p className="text-xs font-bold text-slate-400 uppercase">Registered Students</p>
              <p className="text-2xl font-black mt-1 text-cyan-500">{studentCount} Students</p>
            </div>
            <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <p className="text-xs font-bold text-slate-400 uppercase">Faculty & Admins</p>
              <p className="text-2xl font-black mt-1 text-purple-500">{adminCount} Administrators</p>
            </div>
          </div>

          {/* Directory Filter & Search */}
          <div className="glass-card p-5 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center space-x-2">
                {['All', 'Student', 'Admin'].map(role => (
                  <button
                    key={role}
                    onClick={() => setUserRoleFilter(role)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                      userRoleFilter === role
                        ? 'bg-brand-600 text-white shadow'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {role === 'All' ? 'All Roles' : `${role}s`}
                  </button>
                ))}
              </div>

              <div className="w-full sm:w-64 relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Icon name="search" className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, ID, username..."
                  value={userSearchTerm}
                  onChange={(e) => setUserSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Users List */}
            <div className="space-y-3 pt-2">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No registered users match your search criteria.
                </div>
              ) : (
                filteredUsers.map(u => {
                  const isCurrent = currentUser && currentUser.id === u.id;
                  const isAdmin = u.role === 'Admin';
                  return (
                    <div 
                      key={u.id}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-brand-500/50 transition bg-slate-50/50 dark:bg-slate-900/40"
                    >
                      <div className="flex items-start sm:items-center space-x-3.5">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black text-sm shrink-0 shadow-sm ${
                          isAdmin ? 'bg-gradient-to-tr from-purple-600 to-indigo-600' : 'bg-gradient-to-tr from-brand-600 to-cyan-600'
                        }`}>
                          {u.name ? u.name[0].toUpperCase() : 'U'}
                        </div>

                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-extrabold text-xs text-slate-900 dark:text-slate-100">{u.name}</h4>
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${
                              isAdmin ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' : 'bg-brand-500/10 text-brand-600 dark:text-brand-400'
                            }`}>
                              {u.role}
                            </span>
                            {isCurrent && (
                              <span className="px-2 py-0.5 rounded-md text-[9px] font-black bg-emerald-500/10 text-emerald-500">
                                You
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            ID: <span className="font-bold text-slate-600 dark:text-slate-300">{u.studentId}</span> • Username: <span className="font-semibold text-slate-500">{u.username}</span> • {u.department} {u.semester ? `(${u.semester})` : ''} {u.designation ? `(${u.designation})` : ''}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            Email: {u.email} {u.joinedDate ? `• Registered: ${u.joinedDate}` : ''}
                          </p>
                          {!isAdmin && (
                            <div className="flex flex-wrap items-center gap-2 mt-1.5 pt-1.5 border-t border-slate-200/50 dark:border-slate-800/50 text-[10px]">
                              <span className={`px-2 py-0.5 rounded-md font-black ${
                                (u.performance?.attendance || 85) >= 75 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                              }`}>
                                Att: {u.performance?.attendance || 88}%
                              </span>
                              <span className="px-2 py-0.5 rounded-md font-bold bg-amber-500/10 text-amber-500">
                                🔥 {u.performance?.loginStreak || 1}d Daily Streak
                              </span>
                              <span className="px-2 py-0.5 rounded-md font-bold bg-brand-500/10 text-brand-500">
                                Score: {u.performance?.overallScore || 85}% (Grade {u.performance?.grade || 'A'})
                              </span>
                              <span className="text-slate-400">
                                Last Login: {u.performance?.lastLoginTime || 'Today'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 self-end sm:self-center shrink-0">
                        {isCurrent ? (
                          <span className="text-[10px] text-slate-400 font-bold px-3 py-1 bg-slate-200 dark:bg-slate-800 rounded-lg">
                            Active Session
                          </span>
                        ) : (
                          <button
                            onClick={() => onDeleteUser(u.id)}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition"
                            title="Remove User Account"
                          >
                            <Icon name="trash" className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* ==================== STUDY NOTES RESOURCES TAB ==================== */}
      {adminTab === 'resources' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Upload Note Section */}
          <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-black flex items-center space-x-2">
              <Icon name="plus" className="w-5 h-5 text-brand-500" />
              <span>Upload New Study Resource</span>
            </h3>

            <form onSubmit={handleNoteSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Document Title (e.g. Python Complete Notes)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none"
              />
              <input
                type="text"
                required
                placeholder="Subject (e.g. Python, DBMS, Java)"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none"
              />
              <input
                type="text"
                required
                placeholder="Author / Faculty Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none"
              />
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none font-semibold text-slate-800 dark:text-slate-200"
              >
                <option value="Semester 1">Semester 1</option>
                <option value="Semester 2">Semester 2</option>
                <option value="Semester 3">Semester 3</option>
                <option value="Semester 4">Semester 4</option>
                <option value="Semester 5">Semester 5</option>
                <option value="Semester 6">Semester 6</option>
              </select>
              
              <div className="md:col-span-2 flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <label className="flex-1 flex items-center justify-center space-x-2 p-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs cursor-pointer hover:border-brand-500 transition">
                    <Icon name="upload" className="w-4 h-4 text-brand-500" />
                    <span className="truncate">
                      {isReadingFile ? "Reading & preparing file..." : fileMeta ? `Selected: ${fileMeta.name} (${fileMeta.size})` : "Upload PDF, Word, PPT, Excel, TXT or image..."}
                    </span>
                    <input
                      key={fileInputKey}
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.png,.jpg,.jpeg"
                      onChange={handleFileUploadChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Direct College Email API Broadcast Toggle */}
              <div className="md:col-span-2 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                    <Icon name="mail" className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">
                      Direct Student College Email API Notification
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                      Dispatches instant official email alerts to all registered BCA student inboxes (*.bcayear@sbjit.edu.in)
                    </span>
                  </div>
                </div>
                <label className="flex items-center space-x-2 cursor-pointer bg-white/80 dark:bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  <input
                    type="checkbox"
                    checked={sendEmailNotification}
                    onChange={(e) => setSendEmailNotification(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 accent-emerald-600"
                  />
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Enabled</span>
                </label>
              </div>

              {apiSuccessMsg && (
                <div className="md:col-span-2 p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-bold flex items-center space-x-2 animate-fadeIn">
                  <Icon name="check" className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{apiSuccessMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isReadingFile}
                className={`md:col-span-2 py-3 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center space-x-2 ${isReadingFile ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Icon name="plus" className="w-4 h-4" />
                <span>{isReadingFile ? "Processing File..." : "Add Resource & Publish to Notes Library"}</span>
              </button>
            </form>
          </div>

          {/* Manage Existing Resources */}
          <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-black">Manage Existing Resources</h3>
            <div className="space-y-3">
              {notes.map(note => (
                <div key={note.id} className="flex justify-between items-center p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div>
                    <h4 className="font-bold text-xs flex items-center gap-2">{note.title} <FileBadge type={note.fileType} /></h4>
                    <p className="text-[10px] text-slate-400">{note.subject} • {note.author}</p>
                  </div>
                  <button 
                    onClick={() => onDeleteNote(note.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition"
                  >
                    <Icon name="trash" className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== APTITUDE TEST & MCQS TAB ==================== */}
      {adminTab === 'questions' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Aptitude 4-Category KPI Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {APTITUDE_CATEGORIES.map(cat => {
              const count = questions.filter(q => (q.category || 'Quantitative Aptitude') === cat).length;
              const meta = CATEGORY_META[cat] || { icon: '⚡', cls: 'text-brand-500' };
              return (
                <div 
                  key={cat} 
                  onClick={() => { setQuestionCategory(cat); setManageCategoryFilter(cat); }}
                  className="glass-card p-5 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-brand-500 cursor-pointer transition flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <span className="text-2xl">{meta.icon}</span>
                    <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400">{cat}</h4>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">{count} MCQs</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 bg-brand-500/10 text-brand-500 rounded-lg">
                    Select
                  </span>
                </div>
              );
            })}
          </div>

          {/* Add New Aptitude MCQ Question Section */}
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black flex items-center space-x-2">
                  <Icon name="test" className="w-5 h-5 text-brand-500" />
                  <span>Add New Aptitude Test MCQ</span>
                </h3>
                <p className="text-xs text-slate-400">Create categorized MCQs for Quantitative, Logical, Verbal, and Data Interpretation sections</p>
              </div>
              <AptitudeCategoryBadge category={questionCategory} />
            </div>

            <form onSubmit={handleQuestionSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Aptitude Section / Category *</label>
                  <select
                    value={questionCategory}
                    onChange={(e) => setQuestionCategory(e.target.value)}
                    className="w-full p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold outline-none"
                  >
                    <option value="Quantitative Aptitude">🧮 Quantitative Aptitude (Math, Ratios, Speed, Profit/Loss)</option>
                    <option value="Logical Reasoning">🧩 Logical Reasoning (Sequences, Puzzles, Coding, Relations)</option>
                    <option value="Verbal Ability">📝 Verbal Ability (English, Synonyms, Grammar, Vocab)</option>
                    <option value="Data Interpretation">📈 Data Interpretation (Charts, Tables, Percentages)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Correct Answer Selection *</label>
                  <select
                    value={correctIndex}
                    onChange={(e) => setCorrectIndex(e.target.value)}
                    className="w-full p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold outline-none text-emerald-500"
                  >
                    <option value={0}>Option A is Correct Answer</option>
                    <option value={1}>Option B is Correct Answer</option>
                    <option value={2}>Option C is Correct Answer</option>
                    <option value={3}>Option D is Correct Answer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">Question Statement *</label>
                <textarea
                  required
                  rows="2"
                  placeholder="e.g. Find the missing number in the sequence: 3, 7, 15, 31, 63, ?"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  className="w-full p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Option A *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter choice A"
                    value={opt0}
                    onChange={(e) => setOpt0(e.target.value)}
                    className="w-full p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Option B *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter choice B"
                    value={opt1}
                    onChange={(e) => setOpt1(e.target.value)}
                    className="w-full p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Option C</label>
                  <input
                    type="text"
                    placeholder="Enter choice C"
                    value={opt2}
                    onChange={(e) => setOpt2(e.target.value)}
                    className="w-full p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Option D</label>
                  <input
                    type="text"
                    placeholder="Enter choice D"
                    value={opt3}
                    onChange={(e) => setOpt3(e.target.value)}
                    className="w-full p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">
                  Explanation & Solution Method <span className="text-[10px] text-slate-500 font-normal">(Shown to students upon test review)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Formula: (previous * 2) + 1 gives (63 * 2) + 1 = 127."
                  value={questionExplanation}
                  onChange={(e) => setQuestionExplanation(e.target.value)}
                  className="w-full p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none"
                />
              </div>

              {/* Direct College Email API Broadcast Toggle */}
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                    <Icon name="mail" className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">
                      Direct Student College Email API Notification
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                      Dispatches instant official email alerts to all registered BCA student inboxes (*.bcayear@sbjit.edu.in)
                    </span>
                  </div>
                </div>
                <label className="flex items-center space-x-2 cursor-pointer bg-white/80 dark:bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  <input
                    type="checkbox"
                    checked={sendEmailNotification}
                    onChange={(e) => setSendEmailNotification(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 accent-emerald-600"
                  />
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Enabled</span>
                </label>
              </div>

              {apiSuccessMsg && (
                <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-bold flex items-center space-x-2 animate-fadeIn">
                  <Icon name="check" className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{apiSuccessMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:opacity-95 text-white text-xs font-black rounded-xl shadow-lg transition flex items-center justify-center space-x-2"
              >
                <Icon name="plus" className="w-4 h-4" />
                <span>Add {questionCategory} MCQ & Publish to Portal</span>
              </button>
            </form>
          </div>

          {/* Manage Existing Aptitude Questions Section */}
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-lg font-black">Manage Aptitude & Mock Questions</h3>
                <p className="text-xs text-slate-400">Filter and audit existing MCQs by aptitude section</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-brand-500/10 text-brand-500 rounded-xl">
                {questions.length} Total MCQs
              </span>
            </div>

            {/* Filter by Category */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setManageCategoryFilter('All')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${
                  manageCategoryFilter === 'All'
                    ? 'bg-brand-600 text-white shadow'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 border border-slate-200 dark:border-slate-800'
                }`}
              >
                All Sections ({questions.length})
              </button>
              {APTITUDE_CATEGORIES.map(cat => {
                const count = questions.filter(q => (q.category || 'Quantitative Aptitude') === cat).length;
                const isSelected = manageCategoryFilter === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setManageCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${
                      isSelected
                        ? 'bg-brand-600 text-white shadow'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 border border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Questions List */}
            <div className="space-y-3 pt-2">
              {questions
                .filter(q => manageCategoryFilter === 'All' || (q.category || 'Quantitative Aptitude') === manageCategoryFilter)
                .map((q, qIndex) => (
                  <div key={q.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 hover:border-brand-500/40 transition space-y-2">
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-slate-200 dark:bg-slate-800 text-[10px] font-bold flex items-center justify-center">
                          {qIndex + 1}
                        </span>
                        <AptitudeCategoryBadge category={q.category || 'Quantitative Aptitude'} />
                      </div>
                      <button 
                        onClick={() => onDeleteQuestion(q.id)}
                        className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition"
                        title="Delete Question"
                      >
                        <Icon name="trash" className="w-4 h-4" />
                      </button>
                    </div>

                    <h4 className="font-extrabold text-xs text-slate-900 dark:text-white leading-relaxed">
                      {q.question}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                      {q.options.map((opt, oIdx) => {
                        const isCorrect = oIdx === q.correct;
                        return (
                          <div 
                            key={oIdx} 
                            className={`px-2.5 py-1.5 rounded-lg border flex items-center justify-between ${
                              isCorrect 
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold' 
                                : 'bg-slate-100/60 dark:bg-slate-800/60 border-slate-200/60 dark:border-slate-700/60 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            <span>{['A', 'B', 'C', 'D'][oIdx]}: {opt}</span>
                            {isCorrect && <span className="text-[9px] font-black uppercase text-emerald-500">Correct ✓</span>}
                          </div>
                        );
                      })}
                    </div>

                    {q.explanation && (
                      <p className="text-[10px] text-slate-400 bg-slate-100/50 dark:bg-slate-800/40 p-2 rounded-lg">
                        <strong className="text-brand-500">Explanation:</strong> {q.explanation}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== COLLEGE EMAIL API BROADCASTS TAB ==================== */}
      {adminTab === 'broadcasts' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header & Gateway Status */}
          <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-lg font-black flex items-center space-x-2">
                  <Icon name="mail" className="w-5 h-5 text-emerald-500" />
                  <span>College Email API Broadcast Gateway</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Direct automated notification delivery pipeline for SB Jain BCA student inboxes
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-xs font-black text-emerald-500">API Gateway Active (SMTP 25 / HTTPS REST)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Total Dispatched Broadcasts</p>
                <p className="text-2xl font-black mt-1 text-emerald-500">{emailLogs.length} Sent</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Registered Student Inboxes</p>
                <p className="text-2xl font-black mt-1 text-brand-500">{studentCount} BCA Accounts</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Delivery SLA / Status</p>
                <p className="text-2xl font-black mt-1 text-purple-500">100% Delivered ✅</p>
              </div>
            </div>
          </div>

          {/* Broadcasts Feed */}
          <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h4 className="text-base font-black">Live Delivery Logs & Notification History</h4>

            {emailLogs.length === 0 ? (
              <div className="text-center py-10 text-xs text-slate-400">
                No email broadcasts recorded yet. Upload a note or mock question to dispatch automated emails to students.
              </div>
            ) : (
              <div className="space-y-4">
                {emailLogs.map(log => (
                  <div key={log.id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 space-y-3">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded-lg uppercase tracking-wider">
                          {log.type}
                        </span>
                        <h5 className="font-extrabold text-sm">{log.title}</h5>
                      </div>
                      <div className="flex items-center space-x-3 text-xs">
                        <span className="text-slate-400 font-medium">{log.timestamp}</span>
                        <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-500 rounded-full font-bold flex items-center gap-1 text-[11px]">
                          <Icon name="check" className="w-3.5 h-3.5" />
                          <span>{log.status || 'Delivered'}</span>
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 font-semibold block mb-1">Subject Header:</span>
                        <span className="font-bold text-slate-700 dark:text-slate-200">{log.subjectLine}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold block mb-1">Dispatcher / Faculty:</span>
                        <span className="font-bold text-slate-700 dark:text-slate-200">{log.author} • Subject: {log.subject}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-400 font-semibold block mb-1.5">
                        Dispatched to {log.recipientCount || (log.recipients && log.recipients.length) || 1} Registered BCA Student College Email(s):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {log.recipients && log.recipients.length > 0 ? (
                          log.recipients.map((recip, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-brand-500/10 text-brand-600 dark:text-brand-400 font-mono text-[11px] rounded-lg font-bold border border-brand-500/20">
                              {recip}
                            </span>
                          ))
                        ) : (
                          <span className="px-2.5 py-1 bg-brand-500/10 text-brand-500 font-mono text-[11px] rounded-lg">
                            All Registered BCA Students
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                      {log.body}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
