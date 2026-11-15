/* account.signin — the website calls init(root). The CmsAccount block is shared by every account component. */
/*
 * CmsAccount — website accounts in the browser. Every account.* component and header.members
 * carries this same block; the first one loaded defines it and the others reuse it.
 * The session lives in localStorage ("cmstags.account.<project>") and goes to the CMS in the
 * X-Account-Token header. Pages with members-only sections need that header too (see README).
 */
(function () {
  if (window.CmsAccount) return;

  const TEXT = {
    en: {
      signIn: "Sign in",
      signUp: "Create account",
      signOut: "Sign out",
      myAccount: "My account",
      email: "Email",
      password: "Password",
      newPassword: "New password",
      currentPassword: "Current password",
      name: "Full name",
      code: "6-digit code",
      passwordHint: "At least 12 characters.",
      withPassword: "With a password",
      withCode: "With an email code",
      google: "Continue with Google",
      or: "or",
      sendCode: "Email me a code",
      confirm: "Confirm",
      continue: "Continue",
      forgot: "Forgot your password?",
      resetTitle: "Choose a new password",
      resetText: "We will email you a code. Enter it with your new password.",
      setPassword: "Save the new password",
      codeSent: "We sent a 6-digit code to {email}. It is valid for 10 minutes.",
      verifyTitle: "Confirm your email",
      verifyText: "Enter the code we sent to {email}.",
      resend: "Send a new code",
      resent: "A new code is on its way.",
      back: "Back",
      pendingTitle: "Thanks, your account is waiting for approval",
      pendingText: "We will email {email} as soon as it is approved. Then you can sign in.",
      noAccount: "No account yet?",
      haveAccount: "Already have an account?",
      disabled: "Signing in is not available on this website.",
      closed: "New accounts are not open on this website.",
      loading: "Loading…",
      save: "Save",
      saved: "Saved",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      required: "Required",
      optional: "optional",
      signedInAs: "Signed in as {email}",
      profile: "Your details",
      changePassword: "Change password",
      passwordChanged: "Your password has been changed.",
      addPassword: "Add a password",
      googleLinked: "Google is linked to this account.",
      needSignIn: "Sign in to continue.",
      offline: "Could not reach the website. Check your connection and try again.",
      // content
      add: "Add new",
      newItem: "New item",
      editItem: "Edit",
      empty: "You have not added anything yet.",
      state_review: "Waiting for review",
      state_published: "Published",
      state_changes_pending: "Changes waiting for review",
      state_archived: "Archived",
      submit: "Submit",
      submitReview: "Send for review",
      reviewNote: "New items and changes are published after the website team reviews them.",
      directNote: "What you add is published right away.",
      sentReview: "Thanks! It will appear on the website after review.",
      published: "Published.",
      confirmDelete: "Delete “{title}”? This cannot be undone.",
      deleted: "Deleted.",
      upload: "Upload",
      uploading: "Uploading…",
      chooseFiles: "Choose files",
      chooseFile: "Choose a file",
      remove: "Remove",
      limitReached: "You have reached the limit of {n} items.",
      untitled: "Untitled",
      noCollection: "This section has no collection yet. Set its collection in the CMS.",
      notOpen: "This collection does not take content from website accounts.",
      updated: "Updated {date}",
      yes: "Yes",
      more: "Load more",
      addRow: "Add",
      // errors
      err_unauthorized: "Incorrect email or password.",
      err_invalid_code: "The code is wrong or has expired.",
      err_account_blocked: "This account is blocked.",
      err_rate_limited: "Too many attempts. Please wait a few minutes and try again.",
      err_conflict: "An account with this email already exists. Sign in instead.",
      err_accounts_disabled: "Signing in is not available on this website.",
      err_google_cancelled: "Google sign-in was cancelled.",
      err_google_failed: "Google sign-in did not work. Try again or use another way.",
      err_google_closed: "New accounts are not open on this website.",
      err_google_pending: "Your account is waiting for approval.",
      err_google_blocked: "This account is blocked.",
      err_validation_error: "Please check the highlighted fields.",
      err_generic: "Something went wrong. Please try again.",
    },
    ar: {
      signIn: "تسجيل الدخول",
      signUp: "إنشاء حساب",
      signOut: "تسجيل الخروج",
      myAccount: "حسابي",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      newPassword: "كلمة المرور الجديدة",
      currentPassword: "كلمة المرور الحالية",
      name: "الاسم الكامل",
      code: "الرمز المكوّن من 6 أرقام",
      passwordHint: "12 حرفاً على الأقل.",
      withPassword: "بكلمة المرور",
      withCode: "برمز على البريد",
      google: "المتابعة باستخدام Google",
      or: "أو",
      sendCode: "أرسل لي رمزاً",
      confirm: "تأكيد",
      continue: "متابعة",
      forgot: "نسيت كلمة المرور؟",
      resetTitle: "اختر كلمة مرور جديدة",
      resetText: "سنرسل لك رمزاً على البريد. أدخله مع كلمة المرور الجديدة.",
      setPassword: "حفظ كلمة المرور الجديدة",
      codeSent: "أرسلنا رمزاً من 6 أرقام إلى {email}. صالح لمدة 10 دقائق.",
      verifyTitle: "تأكيد البريد الإلكتروني",
      verifyText: "أدخل الرمز الذي أرسلناه إلى {email}.",
      resend: "إرسال رمز جديد",
      resent: "تم إرسال رمز جديد.",
      back: "رجوع",
      pendingTitle: "شكراً، حسابك بانتظار الموافقة",
      pendingText: "سنراسلك على {email} فور الموافقة عليه، وبعدها يمكنك تسجيل الدخول.",
      noAccount: "ليس لديك حساب؟",
      haveAccount: "لديك حساب؟",
      disabled: "تسجيل الدخول غير متاح على هذا الموقع.",
      closed: "إنشاء الحسابات غير متاح حالياً على هذا الموقع.",
      loading: "جارٍ التحميل…",
      save: "حفظ",
      saved: "تم الحفظ",
      cancel: "إلغاء",
      delete: "حذف",
      edit: "تعديل",
      required: "مطلوب",
      optional: "اختياري",
      signedInAs: "مسجّل الدخول باسم {email}",
      profile: "بياناتك",
      changePassword: "تغيير كلمة المرور",
      passwordChanged: "تم تغيير كلمة المرور.",
      addPassword: "إضافة كلمة مرور",
      googleLinked: "حساب Google مربوط بهذا الحساب.",
      needSignIn: "سجّل الدخول للمتابعة.",
      offline: "تعذّر الوصول إلى الموقع. تحقق من الاتصال وحاول مرة أخرى.",
      add: "إضافة جديد",
      newItem: "إضافة جديدة",
      editItem: "تعديل",
      empty: "لم تضف أي شيء بعد.",
      state_review: "بانتظار المراجعة",
      state_published: "منشور",
      state_changes_pending: "تعديلات بانتظار المراجعة",
      state_archived: "مؤرشف",
      submit: "إرسال",
      submitReview: "إرسال للمراجعة",
      reviewNote: "تُنشر الإضافات والتعديلات بعد مراجعتها من فريق الموقع.",
      directNote: "ما تضيفه يُنشر مباشرة.",
      sentReview: "شكراً! سيظهر على الموقع بعد المراجعة.",
      published: "تم النشر.",
      confirmDelete: "حذف «{title}»؟ لا يمكن التراجع عن ذلك.",
      deleted: "تم الحذف.",
      upload: "رفع",
      uploading: "جارٍ الرفع…",
      chooseFiles: "اختر الملفات",
      chooseFile: "اختر ملفاً",
      remove: "إزالة",
      limitReached: "وصلت إلى الحد الأقصى وهو {n}.",
      untitled: "بدون عنوان",
      noCollection: "لم يُحدَّد لهذا القسم أي مجموعة بعد. حدّدها من نظام الإدارة.",
      notOpen: "هذه المجموعة لا تستقبل محتوى من حسابات الموقع.",
      updated: "آخر تعديل {date}",
      yes: "نعم",
      more: "عرض المزيد",
      addRow: "إضافة",
      err_unauthorized: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
      err_invalid_code: "الرمز غير صحيح أو انتهت صلاحيته.",
      err_account_blocked: "هذا الحساب محظور.",
      err_rate_limited: "محاولات كثيرة. انتظر بضع دقائق ثم حاول مرة أخرى.",
      err_conflict: "يوجد حساب بهذا البريد. سجّل الدخول بدلاً من ذلك.",
      err_accounts_disabled: "تسجيل الدخول غير متاح على هذا الموقع.",
      err_google_cancelled: "تم إلغاء الدخول عبر Google.",
      err_google_failed: "لم ينجح الدخول عبر Google. حاول مرة أخرى أو استخدم طريقة أخرى.",
      err_google_closed: "إنشاء الحسابات غير متاح حالياً على هذا الموقع.",
      err_google_pending: "حسابك بانتظار الموافقة.",
      err_google_blocked: "هذا الحساب محظور.",
      err_validation_error: "يرجى مراجعة الحقول المحددة.",
      err_generic: "حدث خطأ. حاول مرة أخرى.",
    },
  };
  // Field messages the CMS sends in English, shown in Arabic on Arabic pages.
  const FIELD_AR = {
    "Invalid email": "البريد الإلكتروني غير صالح",
    "Use at least 12 characters": "استخدم 12 حرفاً على الأقل",
    "Required": "مطلوب",
    "Value is required": "مطلوب",
    "Already registered": "مسجّل مسبقاً",
    "Enter the 6-digit code": "أدخل الرمز المكوّن من 6 أرقام",
    "Wrong or expired code": "الرمز غير صحيح أو منتهي",
    "Choose a file": "اختر ملفاً",
    "This kind of file cannot be uploaded here": "لا يمكن رفع هذا النوع من الملفات هنا",
    "Upload the files from this account first": "ارفع الملفات من هذا الحساب أولاً",
    "Wrong password": "كلمة المرور غير صحيحة",
    "String must contain at least 1 character(s)": "مطلوب",
    "Sign in first": "سجّل الدخول أولاً",
    "Collection not found": "المجموعة غير موجودة",
    "Record not found": "العنصر غير موجود",
    "This way of signing in is not enabled on this website": "طريقة الدخول هذه غير مفعّلة على هذا الموقع",
    "New accounts cannot be created on this website": "إنشاء الحسابات غير متاح على هذا الموقع",
    "This field cannot be filled in from the website": "لا يمكن تعبئة هذا الحقل من الموقع",
  };

  const listeners = new Set();
  let cachedMe = null;

  const route = () => window.CmsRoute || {};
  const cfg = () => window.CMSTAGS || {};

  function locale() {
    return String(route().locale || document.documentElement.lang || "en").slice(0, 10);
  }
  function lang() {
    return /^ar\b/i.test(locale()) ? "ar" : "en";
  }
  function t(key, vars) {
    let s = (TEXT[lang()] && TEXT[lang()][key]) || TEXT.en[key] || key;
    if (vars) Object.keys(vars).forEach((k) => (s = s.split("{" + k + "}").join(String(vars[k]))));
    return s;
  }
  function fieldMessage(msg) {
    const m = String(msg || "");
    return lang() === "ar" ? FIELD_AR[m] || m : m;
  }
  /** A localized CMS value ({en, ar} or a plain string) in the page's language. */
  function text(value) {
    if (value == null) return "";
    if (typeof value === "string") return value;
    if (typeof value === "object") return value[locale()] || value[lang()] || value.en || Object.values(value).find(Boolean) || "";
    return String(value);
  }

  function base() {
    const r = route();
    if (r.cmsUrl && r.projectPath) return String(r.cmsUrl).replace(/\/$/, "") + r.projectPath;
    const c = cfg();
    return String(c.api || "").replace(/\/$/, "") + "/api/v1/public/" + encodeURIComponent(c.project || "");
  }
  function project() {
    const r = route();
    return (r.info && r.info.slug) || cfg().project || "site";
  }
  const storeKey = () => "cmstags.account." + project();

  function session() {
    try {
      const s = JSON.parse(localStorage.getItem(storeKey()) || "null");
      if (s && s.token && (!s.expiresAt || Date.parse(s.expiresAt) > Date.now())) return s;
      if (s) localStorage.removeItem(storeKey());
    } catch (e) {
      /* storage blocked */
    }
    return null;
  }
  function emit() {
    const s = session();
    listeners.forEach((fn) => {
      try {
        fn(s);
      } catch (e) {
        /* a listener failed */
      }
    });
    document.dispatchEvent(new CustomEvent("cmstags:account", { detail: s }));
  }
  function save(outcome) {
    const value = outcome ? { token: outcome.token, expiresAt: outcome.expiresAt, name: outcome.account.name, email: outcome.account.email } : null;
    try {
      if (value) localStorage.setItem(storeKey(), JSON.stringify(value));
      else localStorage.removeItem(storeKey());
    } catch (e) {
      /* storage blocked: the session lasts for this page only */
    }
    cachedMe = null;
    emit();
  }
  function updateStored(account) {
    const s = session();
    if (!s || !account) return;
    try {
      localStorage.setItem(storeKey(), JSON.stringify({ ...s, name: account.name, email: account.email }));
    } catch (e) {
      /* ignore */
    }
    emit();
  }

  /** Calls the CMS. Errors carry status, code, message (in the page's language) and field messages. */
  async function call(method, path, body, opts) {
    const o = opts || {};
    const url = base() + path + (path.indexOf("?") >= 0 ? "&" : "?") + "locale=" + encodeURIComponent(locale());
    const headers = { Accept: "application/json" };
    const s = session();
    if (s) headers["X-Account-Token"] = s.token;
    let payload;
    if (body instanceof FormData) payload = body;
    else if (body !== undefined) {
      headers["Content-Type"] = "application/json";
      payload = JSON.stringify(body);
    }
    let res;
    try {
      res = await fetch(url, { method, headers, body: payload, credentials: "omit" });
    } catch (e) {
      const err = new Error(t("offline"));
      err.status = 0;
      err.code = "offline";
      throw err;
    }
    if (res.status === 204) return null;
    const json = await res.json().catch(() => null);
    if (!res.ok) {
      const info = (json && json.error) || {};
      const err = new Error();
      err.status = res.status;
      err.code = info.code === "validation_failed" ? "validation_error" : info.code || "error";
      err.fields = {};
      Object.keys(info.details || {}).forEach((k) => (err.fields[k] = fieldMessage(info.details[k])));
      const known = TEXT.en["err_" + err.code] && !(err.code === "unauthorized" && !o.login) && !(err.code === "conflict" && !o.register);
      err.message = known ? t("err_" + err.code) : res.status === 429 ? t("err_rate_limited") : info.message && lang() === "en" ? info.message : fieldMessage(info.message) || t("err_generic");
      if (res.status === 401 && s && !o.login) save(null);
      throw err;
    }
    return json;
  }

  /** A path of this site in the page's language: "account" → /account or /ar/account. */
  function href(path) {
    const p = String(path || "").trim();
    if (!p) return "";
    if (/^(https?:)?\/\//i.test(p) || p.charAt(0) === "#" || p.charAt(0) === "?") return p;
    const r = route();
    const slug = p.replace(/^\/+/, "");
    if (typeof r.href === "function") return r.href(slug);
    return "/" + slug;
  }
  function go(target) {
    if (!target) return;
    if (/^(https?:)?\/\//i.test(target)) {
      location.href = target;
      return;
    }
    if (typeof window.CmsNavigate === "function") window.CmsNavigate(target);
    else location.href = target;
  }
  /** Sends a visitor who is not signed in to the sign-in page, then back here. */
  function requireSignIn(signinPage) {
    const target = href(signinPage || "login");
    // With #/ addresses the page is in the hash: /#/my-projects comes back as /my-projects.
    const here = /^#\//.test(location.hash) ? location.hash.slice(1) : location.pathname + location.search + location.hash;
    go(target + (target.indexOf("?") >= 0 ? "&" : "?") + "next=" + encodeURIComponent(here));
  }
  /** ?next=/some/page from the address, when it stays on this site. */
  function nextFromUrl() {
    const q = new URLSearchParams(location.search);
    let n = q.get("next") || "";
    if (!n && route().query && route().query.next) n = route().query.next;
    return /^\/(?!\/)/.test(n) ? n : "";
  }

  let configPromise = null;
  function config() {
    if (!configPromise) configPromise = call("GET", "/auth/config").catch((err) => {
      configPromise = null;
      throw err;
    });
    return configPromise;
  }
  async function me(force) {
    if (!session()) return null;
    if (!cachedMe || force) cachedMe = call("GET", "/me").catch((err) => {
      cachedMe = null;
      throw err;
    });
    return cachedMe;
  }
  async function signOut() {
    try {
      await call("POST", "/auth/logout");
    } catch (e) {
      /* the session ends here either way */
    }
    save(null);
  }

  /** Google brings the visitor back with #cms-account-ticket=… (or #cms-account-error=…). */
  const RETURN_KEY = "cmstags.account.return";
  let resumed = null;
  function resume() {
    if (resumed) return resumed;
    const m = /(?:^#|&)cms-account-(ticket|error)=([^&]+)/.exec(location.hash);
    if (!m) return (resumed = Promise.resolve(null));
    let back = "";
    try {
      back = sessionStorage.getItem(RETURN_KEY) || "";
      sessionStorage.removeItem(RETURN_KEY);
    } catch (e) {
      /* ignore */
    }
    const clean = location.pathname + location.search;
    history.replaceState(history.state, "", back && back.indexOf(clean) === 0 ? back : clean);
    if (m[1] === "error") return (resumed = Promise.resolve({ error: t("err_google_" + decodeURIComponent(m[2])) }));
    resumed = call("POST", "/auth/google/ticket", { ticket: decodeURIComponent(m[2]) }, { login: true })
      .then((out) => {
        if (out && out.status === "ok") save(out);
        return out;
      })
      .catch((err) => ({ error: err.message }));
    return resumed;
  }
  function googleUrl() {
    const returnTo = location.origin + location.pathname + location.search;
    try {
      sessionStorage.setItem(RETURN_KEY, location.pathname + location.search + location.hash);
    } catch (e) {
      /* ignore */
    }
    return base() + "/auth/google/start?returnTo=" + encodeURIComponent(returnTo);
  }

  /** Tiny DOM builder: h("button", { class: "btn", onclick: fn }, "Text"). Text is never parsed as HTML. */
  function h(tag, attrs) {
    const el = document.createElement(tag);
    const a = attrs || {};
    Object.keys(a).forEach((k) => {
      const v = a[k];
      if (v == null || v === false) return;
      if (k.slice(0, 2) === "on" && typeof v === "function") el.addEventListener(k.slice(2), v);
      else if (k === "class") el.className = v;
      else if (k === "text") el.textContent = v;
      else if (k in el && k !== "list" && typeof v !== "string") el[k] = v;
      else el.setAttribute(k, v === true ? "" : String(v));
    });
    for (let i = 2; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  }
  function append(el, child) {
    if (child == null || child === false) return;
    if (Array.isArray(child)) child.forEach((c) => append(el, c));
    else el.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }

  let uid = 0;
  const nextId = (p) => (p || "cms-acc") + "-" + ++uid;

  /** A Bootstrap form field: label, input, help and error text. */
  function field(opts) {
    const id = nextId("cms-acc-f");
    const input =
      opts.input ||
      h(opts.multiline ? "textarea" : "input", {
        id,
        class: "form-control",
        name: opts.name,
        type: opts.multiline ? null : opts.type || "text",
        autocomplete: opts.autocomplete || null,
        required: opts.required || null,
        inputmode: opts.inputmode || null,
        maxlength: opts.maxlength || null,
        rows: opts.multiline ? opts.rows || 4 : null,
        placeholder: opts.placeholder || null,
        dir: opts.dir || null,
      });
    if (!input.id) input.id = id;
    if (opts.value != null && "value" in input) input.value = opts.value;
    const error = h("div", { class: "invalid-feedback", "data-error-for": opts.name });
    const help = opts.help ? h("div", { class: "form-text" }, opts.help) : null;
    return h(
      "div",
      { class: "cms-acc-field mb-3", "data-field": opts.name },
      opts.label ? h("label", { class: "form-label", for: input.id }, opts.label, opts.required ? null : h("span", { class: "cms-acc-optional" }, " (" + t("optional") + ")")) : null,
      input,
      help,
      error,
    );
  }
  /** Shows the CMS's field messages under the matching inputs; returns whether any matched. */
  function showErrors(form, err) {
    form.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));
    form.querySelectorAll("[data-error-for]").forEach((el) => (el.textContent = ""));
    let matched = false;
    Object.keys((err && err.fields) || {}).forEach((key) => {
      const sel = (k) => form.querySelector('[data-error-for="' + k.replace(/"/g, "") + '"]');
      const box = sel(key) || sel(key.split(".")[0]) || sel(key.split(".").slice(-1)[0]);
      if (!box) return;
      box.textContent = err.fields[key];
      const wrap = box.closest("[data-field]");
      const input = wrap && wrap.querySelector("input, textarea, select");
      if (input) input.classList.add("is-invalid");
      box.style.display = "block";
      matched = true;
    });
    return matched;
  }
  /** Replaces an element's content; null and false children are skipped. */
  function fill(el, ...nodes) {
    el.replaceChildren();
    append(el, nodes);
    return el;
  }
  function alertBox(kind, message) {
    return h("div", { class: "alert alert-" + kind + " cms-acc-alert", role: kind === "danger" ? "alert" : "status" }, message);
  }
  /** Disables a form's buttons while a request runs. */
  async function busy(form, fn) {
    const buttons = Array.from(form.querySelectorAll("button"));
    buttons.forEach((b) => (b.disabled = true));
    form.setAttribute("aria-busy", "true");
    try {
      return await fn();
    } finally {
      buttons.forEach((b) => (b.disabled = false));
      form.removeAttribute("aria-busy");
    }
  }
  function formatDate(iso) {
    try {
      return new Intl.DateTimeFormat(locale(), { dateStyle: "medium" }).format(new Date(iso));
    } catch (e) {
      return String(iso || "").slice(0, 10);
    }
  }

  window.CmsAccount = {
    t,
    text,
    lang,
    locale,
    base,
    session,
    save,
    updateStored,
    call,
    config,
    me,
    signOut,
    resume,
    googleUrl,
    href,
    go,
    requireSignIn,
    nextFromUrl,
    onChange(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    ui: { h, fill, field, showErrors, alertBox, busy, formatDate, nextId },
  };
  // Another tab signed in or out.
  window.addEventListener("storage", (e) => {
    if (e.key === storeKey()) {
      cachedMe = null;
      emit();
    }
  });
})();

/* account.signin — sign in and create an account, with the ways this website has turned on. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["account.signin"] = {
    init: function (root) {
      const box = root && root.querySelector("[data-cms-account-signin]");
      if (!box || !window.CmsAccount) return;
      const A = window.CmsAccount;
      const { h, field, showErrors, alertBox, busy } = A.ui;
      const t = A.t;
      const wantsSignup = box.getAttribute("data-start") === "signup" || new URLSearchParams(location.search).get("mode") === "signup";
      const state = { tab: wantsSignup ? "signup" : "signin", method: "", cfg: null, notice: null, touched: false };
      box.addEventListener("click", () => (state.touched = true));

      function render(...nodes) {
        A.ui.fill(box, ...nodes);
        // After the visitor's own click (a tab, "Back", a code sent), the new view's first field takes the focus.
        const first = box.querySelector("input:not([type=hidden]):not([readonly])");
        if (first && state.touched) first.focus({ preventScroll: true });
      }
      function target() {
        return A.nextFromUrl() || A.href(box.getAttribute("data-redirect") || "") || "";
      }
      /** What a sign-in, sign-up or code returned. */
      function outcome(out, ctx) {
        if (!out) return;
        if (out.status === "ok") {
          A.save(out);
          const to = target();
          if (to) A.go(to);
          else signedIn();
        } else if (out.status === "pending") pending(out.email);
        else if (out.status === "verify") codeView({ email: out.email, purpose: "verify" });
        else if (out.status === "sent") codeView({ email: out.email, purpose: ctx && ctx.purpose ? ctx.purpose : "login", name: ctx && ctx.name, profile: ctx && ctx.profile, password: ctx && ctx.password });
      }
      function fail(form, err, top) {
        const matched = showErrors(form, err);
        A.ui.fill(top, matched && err.code === "validation_error" ? "" : alertBox("danger", err.message));
      }

      function title(text, sub) {
        return h("div", { class: "cms-acc-head mb-4" }, h("h2", { class: "h4 fw-bold mb-1" }, text), sub ? h("p", { class: "text-body-secondary mb-0" }, sub) : null);
      }

      function googleButton() {
        if (!state.cfg.methods.google) return null;
        return [
          h(
            "a",
            { class: "btn btn-outline-secondary w-100 cms-acc-google", href: "#", onclick: (e) => { e.preventDefault(); location.href = A.googleUrl(); } },
            h("span", { class: "cms-acc-google__mark", "aria-hidden": "true" }, "G"),
            t("google"),
          ),
          state.cfg.methods.password || state.cfg.methods.emailCode ? h("div", { class: "cms-acc-or", role: "separator" }, h("span", null, t("or"))) : null,
        ];
      }

      function tabs() {
        if (state.cfg.signup === "closed") return null;
        const tab = (id, label) =>
          h("button", { type: "button", class: "cms-acc-tab" + (state.tab === id ? " is-active" : ""), role: "tab", "aria-selected": state.tab === id ? "true" : "false", onclick: () => { state.tab = id; state.notice = null; main(); } }, label);
        return h("div", { class: "cms-acc-tabs mb-4", role: "tablist" }, tab("signin", t("signIn")), tab("signup", t("signUp")));
      }

      function methodSwitch() {
        const m = state.cfg.methods;
        if (!(m.password && m.emailCode)) return null;
        const opt = (id, label) =>
          h("button", { type: "button", class: "btn btn-sm " + (state.method === id ? "btn-dark" : "btn-outline-secondary"), "aria-pressed": state.method === id ? "true" : "false", onclick: () => { state.method = id; main(); } }, label);
        return h("div", { class: "btn-group w-100 mb-3 cms-acc-methods", role: "group" }, opt("password", t("withPassword")), opt("code", t("withCode")));
      }

      function signInForm() {
        const top = h("div", null, state.notice ? alertBox(state.notice.kind, state.notice.text) : null);
        const usePassword = state.method === "password";
        const form = h(
          "form",
          { class: "cms-acc-form", novalidate: true },
          top,
          field({ name: "email", label: t("email"), type: "email", autocomplete: "email", required: true, dir: "ltr" }),
          usePassword ? field({ name: "password", label: t("password"), type: "password", autocomplete: "current-password", required: true }) : null,
          h("button", { type: "submit", class: "btn btn-dark w-100" }, usePassword ? t("signIn") : t("sendCode")),
          usePassword ? h("div", { class: "text-center mt-3" }, h("a", { href: "#", class: "cms-acc-link", onclick: (e) => { e.preventDefault(); forgot(form.elements.namedItem("email").value); } }, t("forgot"))) : null,
        );
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const email = form.elements.namedItem("email").value.trim();
          busy(form, async () => {
            try {
              if (usePassword) outcome(await A.call("POST", "/auth/login", { email, password: form.elements.namedItem("password").value }, { login: true }));
              else outcome(await A.call("POST", "/auth/code", { email, purpose: "login" }), { purpose: "login" });
            } catch (err) {
              fail(form, err, top);
            }
          });
        });
        return form;
      }

      function profileFields(values) {
        return (state.cfg.profileFields || []).map((f) =>
          field({
            name: "profile." + f.key,
            label: A.text(f.label),
            type: f.type === "phone" ? "tel" : f.type === "url" ? "url" : "text",
            multiline: f.type === "textarea",
            required: f.required,
            autocomplete: f.type === "phone" ? "tel" : null,
            dir: f.type === "phone" || f.type === "url" ? "ltr" : null,
            value: values ? values[f.key] : null,
          }),
        );
      }
      function readProfile(form) {
        const out = {};
        (state.cfg.profileFields || []).forEach((f) => {
          const el = form.elements["profile." + f.key];
          if (el && el.value.trim()) out[f.key] = el.value.trim();
        });
        return out;
      }

      function signUpForm() {
        const top = h("div");
        const withPassword = Boolean(state.cfg.methods.password);
        const form = h(
          "form",
          { class: "cms-acc-form", novalidate: true },
          top,
          field({ name: "name", label: t("name"), autocomplete: "name", required: true, maxlength: 120 }),
          field({ name: "email", label: t("email"), type: "email", autocomplete: "email", required: true, dir: "ltr" }),
          profileFields(),
          withPassword ? field({ name: "password", label: t("password"), type: "password", autocomplete: "new-password", required: true, help: t("passwordHint") }) : null,
          h("button", { type: "submit", class: "btn btn-dark w-100" }, t("signUp")),
        );
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const body = { name: form.elements.namedItem("name").value.trim(), email: form.elements.namedItem("email").value.trim(), profile: readProfile(form) };
          if (withPassword) body.password = form.elements.namedItem("password").value;
          busy(form, async () => {
            try {
              outcome(await A.call("POST", "/auth/register", body, { register: true }), { purpose: "login", name: body.name, profile: body.profile });
            } catch (err) {
              // Profile fields come back as "profile.city" or "city".
              if (err.fields) Object.keys(err.fields).forEach((k) => { if (!/^profile\./.test(k) && (state.cfg.profileFields || []).some((f) => f.key === k)) err.fields["profile." + k] = err.fields[k]; });
              fail(form, err, top);
            }
          });
        });
        return form;
      }

      /** Enter the emailed code: to sign in, confirm the address, or set a new password. */
      function codeView(ctx) {
        const top = h("div", null, alertBox("info", ctx.purpose === "verify" ? t("verifyText", { email: ctx.email }) : t("codeSent", { email: ctx.email })));
        const reset = ctx.purpose === "reset";
        const resend = h("button", { type: "button", class: "btn btn-link btn-sm cms-acc-link px-0" }, t("resend"));
        let wait = 0;
        let timer = null;
        function cool() {
          wait = 60;
          resend.disabled = true;
          clearInterval(timer);
          timer = setInterval(() => {
            wait -= 1;
            resend.textContent = wait > 0 ? t("resend") + " (" + wait + ")" : t("resend");
            if (wait <= 0) {
              clearInterval(timer);
              resend.disabled = false;
            }
          }, 1000);
        }
        resend.addEventListener("click", async () => {
          try {
            await A.call("POST", "/auth/code", { email: ctx.email, purpose: ctx.purpose, name: ctx.name || undefined });
            A.ui.fill(top, alertBox("success", t("resent")));
            cool();
          } catch (err) {
            A.ui.fill(top, alertBox("danger", err.message));
          }
        });
        const form = h(
          "form",
          { class: "cms-acc-form", novalidate: true },
          top,
          field({ name: "code", label: t("code"), type: "text", inputmode: "numeric", autocomplete: "one-time-code", required: true, maxlength: 6, dir: "ltr" }),
          reset ? field({ name: "password", label: t("newPassword"), type: "password", autocomplete: "new-password", required: true, help: t("passwordHint") }) : null,
          h("button", { type: "submit", class: "btn btn-dark w-100" }, reset ? t("setPassword") : t("confirm")),
          h("div", { class: "d-flex justify-content-between align-items-center mt-3" }, h("button", { type: "button", class: "btn btn-link btn-sm cms-acc-link px-0", onclick: () => { clearInterval(timer); main(); } }, t("back")), resend),
        );
        form.elements.namedItem("code").classList.add("cms-acc-code");
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const body = { email: ctx.email, code: form.elements.namedItem("code").value.replace(/\D/g, ""), purpose: ctx.purpose };
          if (reset) body.password = form.elements.namedItem("password").value;
          if (ctx.purpose === "login" && ctx.name) {
            body.name = ctx.name;
            body.profile = ctx.profile || {};
          }
          busy(form, async () => {
            try {
              const out = await A.call("POST", "/auth/code/verify", body);
              clearInterval(timer);
              outcome(out);
            } catch (err) {
              fail(form, err, top);
            }
          });
        });
        cool();
        render(card(title(ctx.purpose === "verify" ? t("verifyTitle") : reset ? t("resetTitle") : t("signIn")), form));
      }

      function forgot(email) {
        const top = h("div");
        const form = h(
          "form",
          { class: "cms-acc-form", novalidate: true },
          top,
          field({ name: "email", label: t("email"), type: "email", autocomplete: "email", required: true, dir: "ltr", value: email || "" }),
          h("button", { type: "submit", class: "btn btn-dark w-100" }, t("sendCode")),
          h("div", { class: "text-center mt-3" }, h("button", { type: "button", class: "btn btn-link btn-sm cms-acc-link", onclick: () => main() }, t("back"))),
        );
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const mail = form.elements.namedItem("email").value.trim();
          busy(form, async () => {
            try {
              await A.call("POST", "/auth/code", { email: mail, purpose: "reset" });
              codeView({ email: mail, purpose: "reset" });
            } catch (err) {
              fail(form, err, top);
            }
          });
        });
        render(card(title(t("resetTitle"), t("resetText")), form));
      }

      function pending(email) {
        render(
          card(
            h("div", { class: "text-center py-2" }, h("div", { class: "cms-acc-icon mb-3", "aria-hidden": "true" }, "✓"), h("h2", { class: "h4 fw-bold" }, t("pendingTitle")), h("p", { class: "text-body-secondary mb-4" }, t("pendingText", { email }))),
            h("button", { type: "button", class: "btn btn-outline-secondary w-100", onclick: () => { state.tab = "signin"; main(); } }, t("back")),
          ),
        );
      }

      function signedIn() {
        const s = A.session();
        const account = A.href(box.getAttribute("data-account") || "account");
        render(
          card(
            h("p", { class: "mb-3" }, t("signedInAs", { email: (s && s.email) || "" })),
            h(
              "div",
              { class: "d-flex gap-2 flex-wrap" },
              account ? h("a", { class: "btn btn-dark", href: account, onclick: (e) => { e.preventDefault(); A.go(target() || account); } }, t("continue")) : null,
              h("button", { type: "button", class: "btn btn-outline-secondary", onclick: async () => { await A.signOut(); main(); } }, t("signOut")),
            ),
          ),
        );
      }

      function card(...nodes) {
        return h("div", { class: "cms-acc-card" }, ...nodes);
      }

      function main() {
        const cfg = state.cfg;
        if (!cfg.enabled || !(cfg.methods.password || cfg.methods.emailCode || cfg.methods.google)) {
          render(card(alertBox("secondary", t("disabled"))));
          return;
        }
        if (A.session()) {
          signedIn();
          return;
        }
        if (cfg.signup === "closed") state.tab = "signin";
        if (!state.method) state.method = cfg.methods.password ? "password" : "code";
        const isSignup = state.tab === "signup";
        const hasForm = cfg.methods.password || cfg.methods.emailCode;
        render(
          card(
            tabs(),
            googleButton(),
            hasForm ? (isSignup ? signUpForm() : [methodSwitch(), signInForm()]) : null,
            cfg.signup !== "closed" ? h("p", { class: "text-center text-body-secondary small mt-4 mb-0" }, isSignup ? t("haveAccount") : t("noAccount"), " ", h("a", { href: "#", class: "cms-acc-link", onclick: (e) => { e.preventDefault(); state.tab = isSignup ? "signin" : "signup"; state.notice = null; main(); } }, isSignup ? t("signIn") : t("signUp"))) : null,
          ),
        );
      }

      render(card(h("p", { class: "text-body-secondary mb-0", role: "status" }, t("loading"))));
      Promise.all([A.config(), A.resume()])
        .then(([cfg, back]) => {
          state.cfg = cfg;
          if (back && back.error) state.notice = { kind: "danger", text: back.error };
          if (back && back.status && back.status !== "ok") {
            outcome(back);
            return;
          }
          if (back && back.status === "ok") {
            const to = target();
            if (to) {
              A.go(to);
              return;
            }
          }
          main();
        })
        .catch((err) => render(card(alertBox(err.status === 404 ? "secondary" : "danger", err.status === 404 ? t("disabled") : err.message))));
    },
  };
})();
