// ============================================================
// assets/js/auth.js  –  Client-side auth helpers
// ============================================================

// ─── Toggle password visibility ──────────────────────────────
function togglePw(fieldId) {
  const input   = document.getElementById(fieldId);
  const iconEl  = document.getElementById('eyeIcon_' + fieldId);
  if (!input) return;
  const show = input.type === 'password';
  input.type = show ? 'text' : 'password';
  if (iconEl) {
    iconEl.classList.toggle('fa-eye',      !show);
    iconEl.classList.toggle('fa-eye-slash', show);
  }
}

// ─── Password strength meter ──────────────────────────────────
(function () {
  const pwInput    = document.getElementById('password');
  const bar        = document.getElementById('strengthBar');
  const label      = document.getElementById('strengthLabel');
  const confirmIn  = document.getElementById('confirm_password');
  const matchHint  = document.getElementById('matchHint');

  const rules = {
    'r-len':   pw => pw.length >= 8,
    'r-upper': pw => /[A-Z]/.test(pw),
    'r-lower': pw => /[a-z]/.test(pw),
    'r-num':   pw => /[0-9]/.test(pw),
    'r-sym':   pw => /[\W_]/.test(pw),
  };

  const levels = [
    { label: 'Very Weak', color: '#ef4444', pct: '15%' },
    { label: 'Weak',      color: '#f97316', pct: '30%' },
    { label: 'Fair',      color: '#f59e0b', pct: '55%' },
    { label: 'Good',      color: '#3b82f6', pct: '75%' },
    { label: 'Strong',    color: '#10b981', pct: '100%' },
  ];

  function updateStrength(pw) {
    if (!bar) return;
    let score = 0;
    for (const [id, fn] of Object.entries(rules)) {
      const ok = fn(pw);
      const el = document.getElementById(id);
      if (el) el.classList.toggle('ok', ok);
      if (ok) score++;
    }

    if (!pw) {
      bar.style.width = '0';
      if (label) label.textContent = '';
      return;
    }

    const lvl = levels[Math.max(0, score - 1)];
    bar.style.width       = lvl.pct;
    bar.style.background  = lvl.color;
    if (label) {
      label.textContent  = lvl.label;
      label.style.color  = lvl.color;
    }
  }

  function checkMatch() {
    if (!confirmIn || !matchHint) return;
    const pw  = pwInput ? pwInput.value : '';
    const cpw = confirmIn.value;
    if (!cpw) { matchHint.textContent = ''; return; }
    if (pw === cpw) {
      matchHint.textContent = '✔ Passwords match';
      matchHint.style.color = '#10b981';
    } else {
      matchHint.textContent = '✖ Passwords do not match';
      matchHint.style.color = '#ef4444';
    }
  }

  if (pwInput) {
    pwInput.addEventListener('input', () => {
      updateStrength(pwInput.value);
      checkMatch();
    });
  }
  if (confirmIn) {
    confirmIn.addEventListener('input', checkMatch);
  }
})();

// ─── Form submit guard ────────────────────────────────────────
(function () {
  const form = document.getElementById('registerForm') || document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    const btn = document.getElementById('submitBtn');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing…';
    }
  });
})();

// ─── Username auto-lowercase ──────────────────────────────────
(function () {
  const un = document.getElementById('username');
  if (un) {
    un.addEventListener('input', () => {
      const pos = un.selectionStart;
      un.value  = un.value.toLowerCase().replace(/[^a-z0-9_.]/g, '');
      un.setSelectionRange(pos, pos);
    });
  }
})();
