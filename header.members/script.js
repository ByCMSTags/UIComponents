/* header.members — the website calls init(root). The CmsAccount block is shared by every account component. */
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

/* header.members — Bootstrap navbar with a sign-in / "My account" button for website accounts. */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};
  window.CmsTagsComponents["header.members"] = {
    init: function (root) {
      if (!root) return;
      function sync() {
        root.classList.toggle("is-scrolled", window.scrollY > 6);
      }
      if (root._cmsScroll) window.removeEventListener("scroll", root._cmsScroll);
      root._cmsScroll = sync;
      window.addEventListener("scroll", sync, { passive: true });
      sync();

      const A = window.CmsAccount;
      if (!A) return;
      if (root._cmsAccountOff) root._cmsAccountOff();
      root._cmsAccountOff = A.onChange(() => drawAll());
      A.resume().then(drawAll);
      drawAll();

      function drawAll() {
        root.querySelectorAll("[data-cms-account-link]").forEach(draw);
      }
      /** The account area: a sign-in link, or a menu with the account's pages and sign out. */
      function draw(slot) {
        const { h } = A.ui;
        const t = A.t;
        const s = A.session();
        const signin = A.href(slot.getAttribute("data-signin") || "login");
        const account = A.href(slot.getAttribute("data-account") || "account");
        const contentPage = slot.getAttribute("data-content") || "";
        const contentLabel = slot.getAttribute("data-content-label") || "";
        const nav = (href) => (e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey) return;
          e.preventDefault();
          A.go(href);
        };
        if (!s) {
          A.ui.fill(slot, h("a", { class: "btn btn-sm btn-dark cms-account-btn", href: signin, onclick: nav(signin) }, t("signIn")));
          slot.hidden = false;
          return;
        }
        const first = String(s.name || s.email || "").trim().split(/\s+/)[0] || t("myAccount");
        const items = [h("li", null, h("a", { class: "dropdown-item", href: account, onclick: nav(account) }, t("myAccount")))];
        if (contentPage) {
          const href = A.href(contentPage);
          items.push(h("li", null, h("a", { class: "dropdown-item", href, onclick: nav(href) }, contentLabel || contentPage)));
        }
        items.push(h("li", null, h("hr", { class: "dropdown-divider" })));
        items.push(
          h(
            "li",
            null,
            h(
              "button",
              {
                type: "button",
                class: "dropdown-item",
                onclick: async () => {
                  await A.signOut();
                  A.go(A.href("home") || "/");
                },
              },
              t("signOut"),
            ),
          ),
        );
        A.ui.fill(slot, 
          h(
            "div",
            { class: "dropdown cms-account-menu" },
            h(
              "button",
              { class: "btn btn-sm btn-outline-dark dropdown-toggle cms-account-btn", type: "button", "data-bs-toggle": "dropdown", "aria-expanded": "false", title: s.email },
              h("span", { class: "cms-account-btn__avatar", "aria-hidden": "true" }, first.charAt(0).toUpperCase()),
              h("span", { class: "cms-account-btn__name" }, first),
            ),
            h("ul", { class: "dropdown-menu dropdown-menu-end" }, items),
          ),
        );
        slot.hidden = false;
      }
    },
  };
})();
