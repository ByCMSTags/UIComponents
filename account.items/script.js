/* account.items — the website calls init(root). The CmsAccount block is shared by every account component. */
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

/*
 * account.items — "My content": the signed-in account's own records in one collection, and a form to
 * add or change them. The form is built from the collection's fields marked "Writable through the API".
 */
(function () {
  window.CmsTagsComponents = window.CmsTagsComponents || {};

  const TEXT_TYPES = { shortText: "text", email: "email", url: "url", phone: "tel", icon: "text" };
  const AREA_TYPES = { longText: 1, plainText: 1, markdown: 1, richText: 1 };
  const MEDIA_TYPES = { image: 1, video: 1, file: 1, gallery: 1 };
  const ACCEPT = { image: "image/*", panorama: "image/*", video: "video/*", audio: "audio/*", document: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip" };

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  /** Rich text in a plain textarea: paragraphs in, <p> paragraphs out. */
  function htmlToText(html) {
    const div = document.createElement("div");
    div.innerHTML = String(html || "").replace(/<\/(p|div|h\d|li)>/gi, "\n\n").replace(/<br\s*\/?>/gi, "\n");
    return (div.textContent || "").replace(/\n{3,}/g, "\n\n").trim();
  }
  function textToHtml(text) {
    return String(text || "")
      .trim()
      .split(/\n{2,}/)
      .filter(Boolean)
      .map((p) => "<p>" + esc(p).replace(/\n/g, "<br>") + "</p>")
      .join("");
  }
  function localInput(iso, withTime) {
    if (!iso) return "";
    if (!withTime) return String(iso).slice(0, 10);
    const d = new Date(iso);
    if (isNaN(d)) return "";
    const pad = (n) => String(n).padStart(2, "0");
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) + "T" + pad(d.getHours()) + ":" + pad(d.getMinutes());
  }

  window.CmsTagsComponents["account.items"] = {
    init: function (root) {
      const box = root && root.querySelector("[data-cms-account-items]");
      if (!box || !window.CmsAccount) return;
      const A = window.CmsAccount;
      const { h, field, showErrors, alertBox, busy, formatDate, nextId } = A.ui;
      const t = A.t;
      const slug = (box.getAttribute("data-collection") || "").trim();
      const signinPage = box.getAttribute("data-signin") || "login";
      const pageSize = Math.min(50, Math.max(1, Number(box.getAttribute("data-page-size")) || 12));
      const loc = A.locale();
      const defaultLocale = (window.CmsRoute && window.CmsRoute.info && window.CmsRoute.info.defaultLocale) || loc;
      const st = { def: null, items: [], total: 0, page: 1, notice: null };

      function render(...nodes) {
        A.ui.fill(box, ...nodes);
      }
      function needSignIn() {
        render(h("div", { class: "cms-acc-card" }, h("p", { class: "mb-3" }, t("needSignIn")), h("a", { class: "btn btn-dark", href: A.href(signinPage), onclick: (e) => { e.preventDefault(); A.requireSignIn(signinPage); } }, t("signIn"))));
      }
      function failed(err) {
        if (err.status === 401) {
          A.requireSignIn(signinPage);
          needSignIn();
        } else render(alertBox(err.status === 404 ? "secondary" : "danger", err.status === 404 ? t("notOpen") : err.message));
      }

      /* ------------------------------ The list ------------------------------ */

      function titleOf(item) {
        const keys = [st.def.displayField].concat(st.def.fields.filter((f) => TEXT_TYPES[f.type] || f.type === "longText").map((f) => f.key));
        for (const k of keys) {
          const v = A.text(item.data[k]);
          if (k && v) return String(v);
        }
        return t("untitled");
      }
      function thumbOf(item) {
        for (const f of st.def.fields) {
          if (!MEDIA_TYPES[f.type]) continue;
          const v = item.data[f.key];
          const id = Array.isArray(v) ? v[0] : v;
          const m = id && item.media[id];
          if (m && m.kind === "image") return m.resizable ? m.url + (m.url.indexOf("?") >= 0 ? "&" : "?") + "w=480" : m.url;
        }
        return "";
      }
      function chip(state) {
        return h("span", { class: "cms-acc-state cms-acc-state--" + state }, t("state_" + state));
      }
      function limitReached() {
        return st.def.maxPerAccount > 0 && st.total >= st.def.maxPerAccount;
      }

      function list() {
        const def = st.def;
        const addBtn = h("button", { type: "button", class: "btn btn-dark", disabled: limitReached(), onclick: () => editor(null) }, "+ " + t("add"));
        const cards = st.items.map((item) => {
          const thumb = thumbOf(item);
          const name = titleOf(item);
          return h(
            "article",
            { class: "cms-acc-item" },
            h("div", { class: "cms-acc-item__media" }, thumb ? h("img", { src: thumb, alt: "", loading: "lazy" }) : h("span", { class: "cms-acc-item__blank", "aria-hidden": "true" }, name.charAt(0).toUpperCase())),
            h(
              "div",
              { class: "cms-acc-item__body" },
              chip(item.state),
              h("h3", { class: "cms-acc-item__title" }, name),
              h("p", { class: "cms-acc-item__date" }, t("updated", { date: formatDate(item.updatedAt) })),
              h(
                "div",
                { class: "cms-acc-item__actions" },
                h("button", { type: "button", class: "btn btn-sm btn-outline-dark", onclick: () => editor(item) }, t("edit")),
                def.allowDelete ? h("button", { type: "button", class: "btn btn-sm btn-link text-danger", onclick: () => remove(item, name) }, t("delete")) : null,
              ),
            ),
          );
        });
        render(
          h(
            "div",
            { class: "cms-acc-toolbar" },
            h("p", { class: "cms-acc-note mb-0" }, def.publish === "direct" ? t("directNote") : t("reviewNote")),
            addBtn,
          ),
          st.notice ? alertBox(st.notice.kind, st.notice.text) : null,
          limitReached() ? alertBox("secondary", t("limitReached", { n: def.maxPerAccount })) : null,
          cards.length ? h("div", { class: "cms-acc-items" }, cards) : h("div", { class: "cms-acc-empty" }, h("p", { class: "mb-3" }, t("empty")), limitReached() ? null : h("button", { type: "button", class: "btn btn-dark", onclick: () => editor(null) }, "+ " + t("add"))),
          st.items.length < st.total ? h("div", { class: "text-center mt-4" }, h("button", { type: "button", class: "btn btn-outline-secondary", onclick: more }, t("more"))) : null,
        );
        st.notice = null;
      }
      async function load() {
        const out = await A.call("GET", "/me/collections/" + encodeURIComponent(slug) + "/records?page=1&pageSize=" + pageSize);
        st.items = out.items;
        st.total = out.total;
        st.page = 1;
      }
      async function more(e) {
        const btn = e.currentTarget;
        btn.disabled = true;
        try {
          const out = await A.call("GET", "/me/collections/" + encodeURIComponent(slug) + "/records?page=" + (st.page + 1) + "&pageSize=" + pageSize);
          st.page += 1;
          st.items = st.items.concat(out.items);
          st.total = out.total;
          list();
        } catch (err) {
          btn.disabled = false;
          st.notice = { kind: "danger", text: err.message };
          list();
        }
      }
      async function remove(item, name) {
        if (!window.confirm(t("confirmDelete", { title: name }))) return;
        try {
          await A.call("DELETE", "/me/collections/" + encodeURIComponent(slug) + "/records/" + item.id);
          await load();
          st.notice = { kind: "success", text: t("deleted") };
        } catch (err) {
          st.notice = { kind: "danger", text: err.message };
        }
        list();
      }

      /* ------------------------------ The form ------------------------------ */

      /** Uploads for an image, video, file or gallery field. get() returns the id (or ids). */
      function mediaInput(f, value, media) {
        const many = f.type === "gallery";
        let ids = (Array.isArray(value) ? value : value ? [value] : []).slice();
        const known = Object.assign({}, media);
        const kinds = f.mediaKinds && f.mediaKinds.length ? f.mediaKinds : f.type === "image" || f.type === "gallery" ? ["image"] : f.type === "video" ? ["video"] : [];
        const accept = kinds.map((k) => ACCEPT[k]).filter(Boolean).join(",");
        const grid = h("div", { class: "cms-acc-media" });
        const status = h("div", { class: "form-text", role: "status" });
        const picker = h("input", { type: "file", class: "visually-hidden", accept: accept || null, multiple: many || null, id: nextId("cms-acc-file") });
        const chooser = h("label", { class: "btn btn-outline-secondary btn-sm", for: picker.id }, many ? t("chooseFiles") : t("chooseFile"));

        function tile(id) {
          const m = known[id];
          const src = m && m.kind === "image" ? (m.resizable ? m.url + (m.url.indexOf("?") >= 0 ? "&" : "?") + "w=320" : m.url) : "";
          return h(
            "div",
            { class: "cms-acc-media__tile" },
            src ? h("img", { src, alt: "" }) : h("span", { class: "cms-acc-media__file" }, (m && m.filename) || id.slice(0, 8)),
            h("button", { type: "button", class: "cms-acc-media__remove", "aria-label": t("remove"), title: t("remove"), onclick: () => { ids = ids.filter((x) => x !== id); draw(); } }, "×"),
          );
        }
        function draw() {
          A.ui.fill(grid, ...ids.map(tile));
          chooser.hidden = !many && ids.length > 0;
        }
        picker.addEventListener("change", async () => {
          const files = Array.from(picker.files || []);
          picker.value = "";
          for (const file of files) {
            status.textContent = t("uploading") + " " + file.name;
            chooser.classList.add("disabled");
            try {
              const fd = new FormData();
              fd.append("file", file);
              const m = await A.call("POST", "/me/media", fd);
              known[m.id] = m;
              ids = many ? ids.concat(m.id) : [m.id];
              draw();
              status.textContent = "";
            } catch (err) {
              status.textContent = file.name + ": " + (err.fields && err.fields.file ? err.fields.file : err.message);
            } finally {
              chooser.classList.remove("disabled");
            }
            if (!many) break;
          }
        });
        draw();
        const el = h("div", { class: "cms-acc-uploader" }, grid, h("div", { class: "d-flex align-items-center gap-2 mt-2" }, picker, chooser), status);
        return { el, get: () => (many ? ids : ids[0] || null) };
      }

      let relationCache = {};
      function relationInput(f, value) {
        const many = f.cardinality === "many";
        const chosen = new Set(Array.isArray(value) ? value : value ? [value] : []);
        const wrap = h("div", { class: "cms-acc-relation" }, h("span", { class: "text-body-secondary small" }, t("loading")));
        let select = null;
        if (f.target) {
          relationCache[f.target] =
            relationCache[f.target] ||
            fetch(A.base() + "/collections/" + encodeURIComponent(f.target) + "/records?pageSize=100&locale=" + encodeURIComponent(loc), { headers: { Accept: "application/json" } }).then((r) => (r.ok ? r.json() : { items: [] }));
          relationCache[f.target].then((out) => {
            const rows = (out.items || []).map((r) => {
              const d = r.data || {};
              const label = A.text(d.title) || A.text(d.name) || Object.values(d).map(A.text).find((v) => typeof v === "string" && v && v.length < 120) || r.id;
              return { id: r.id, label };
            });
            if (many) {
              A.ui.fill(wrap, 
                ...rows.map((r) => {
                  const id = nextId("cms-acc-rel");
                  return h("div", { class: "form-check" }, h("input", { class: "form-check-input", type: "checkbox", id, value: r.id, checked: chosen.has(r.id), onchange: (e) => (e.target.checked ? chosen.add(r.id) : chosen.delete(r.id)) }), h("label", { class: "form-check-label", for: id }, r.label));
                }),
              );
            } else {
              select = h("select", { class: "form-select" }, h("option", { value: "" }, "—"), rows.map((r) => h("option", { value: r.id, selected: chosen.has(r.id) }, r.label)));
              A.ui.fill(wrap, select);
            }
          });
        }
        return { el: wrap, get: () => (many ? Array.from(chosen) : select ? select.value || null : Array.from(chosen)[0] || null) };
      }

      /** One input for a value of type `type`; returns { el, get }. */
      function simpleInput(f, value) {
        const type = f.type;
        if (type === "boolean") {
          const id = nextId("cms-acc-b");
          const box = h("input", { class: "form-check-input", type: "checkbox", id, checked: Boolean(value) });
          return { el: h("div", { class: "form-check" }, box, h("label", { class: "form-check-label", for: id }, t("yes"))), get: () => box.checked, check: true };
        }
        if (type === "select") {
          const sel = h("select", { class: "form-select" }, h("option", { value: "" }, "—"), (f.options || []).map((o) => h("option", { value: o.value, selected: o.value === value }, A.text(o.label))));
          return { el: sel, get: () => sel.value || null };
        }
        if (type === "multiSelect") {
          const chosen = new Set(Array.isArray(value) ? value : []);
          const el = h(
            "div",
            null,
            (f.options || []).map((o) => {
              const id = nextId("cms-acc-m");
              return h("div", { class: "form-check" }, h("input", { class: "form-check-input", type: "checkbox", id, checked: chosen.has(o.value), onchange: (e) => (e.target.checked ? chosen.add(o.value) : chosen.delete(o.value)) }), h("label", { class: "form-check-label", for: id }, A.text(o.label)));
            }),
          );
          return { el, get: () => (f.options || []).map((o) => o.value).filter((v) => chosen.has(v)) };
        }
        if (type === "number" || type === "integer" || type === "decimal") {
          const input = h("input", { class: "form-control", type: "number", step: type === "integer" ? "1" : "any", value: value == null ? "" : String(value), dir: "ltr" });
          return { el: input, get: () => (input.value === "" ? null : type === "integer" ? parseInt(input.value, 10) : Number(input.value)) };
        }
        if (type === "date" || type === "dateTime") {
          const input = h("input", { class: "form-control", type: type === "date" ? "date" : "datetime-local", value: localInput(value, type === "dateTime") });
          return { el: input, get: () => (!input.value ? null : type === "date" ? input.value : new Date(input.value).toISOString()) };
        }
        if (type === "color") {
          const input = h("input", { class: "form-control form-control-color", type: "color", value: value || "#000000" });
          return { el: input, get: () => input.value };
        }
        if (AREA_TYPES[type]) {
          const rich = type === "richText";
          const area = h("textarea", { class: "form-control", rows: type === "shortText" ? 2 : 6, placeholder: f.placeholder || null });
          area.value = rich ? htmlToText(value) : value || "";
          return { el: area, get: () => (rich ? textToHtml(area.value) : area.value.trim()) || null };
        }
        const input = h("input", { class: "form-control", type: TEXT_TYPES[type] || "text", placeholder: f.placeholder || null, dir: type === "email" || type === "url" || type === "phone" ? "ltr" : null, maxlength: f.validation && f.validation.maxLength ? f.validation.maxLength : null });
        input.value = value == null ? "" : String(value);
        return { el: input, get: () => input.value.trim() || null };
      }

      function repeaterInput(f, value) {
        const subs = (f.subFields || []).filter((s) => !MEDIA_TYPES[s.type] && s.type !== "relation");
        const rowsBox = h("div", { class: "cms-acc-rows" });
        const rows = [];
        function addRow(v) {
          const row = { inputs: {}, el: null };
          const cells = subs.map((s) => {
            const input = simpleInput(s, (v || {})[s.key]);
            row.inputs[s.key] = input;
            return h("div", { class: "cms-acc-rows__cell" }, h("label", { class: "form-label small mb-1" }, A.text(s.label)), input.el);
          });
          row.el = h("div", { class: "cms-acc-rows__row" }, cells, h("button", { type: "button", class: "cms-acc-media__remove cms-acc-rows__remove", "aria-label": t("remove"), onclick: () => { rows.splice(rows.indexOf(row), 1); row.el.remove(); } }, "×"));
          rows.push(row);
          rowsBox.append(row.el);
        }
        (Array.isArray(value) ? value : []).forEach(addRow);
        const el = h("div", null, rowsBox, h("button", { type: "button", class: "btn btn-sm btn-outline-secondary", onclick: () => addRow({}) }, "+ " + t("addRow")));
        return {
          el,
          get: () =>
            rows
              .map((r) => {
                const out = {};
                Object.keys(r.inputs).forEach((k) => {
                  const v = r.inputs[k].get();
                  if (v !== null && v !== "" && !(Array.isArray(v) && !v.length)) out[k] = v;
                });
                return out;
              })
              .filter((o) => Object.keys(o).length),
        };
      }

      function inputFor(f, value, media) {
        if (MEDIA_TYPES[f.type]) return mediaInput(f, value, media);
        if (f.type === "relation") return relationInput(f, value);
        if (f.type === "repeater") return repeaterInput(f, value);
        // A field in several languages: this page's language is edited here, the others stay.
        if (f.localized && value && typeof value === "object" && !Array.isArray(value)) {
          const inner = simpleInput(f, value[loc]);
          return {
            el: inner.el,
            check: inner.check,
            get: () => {
              const v = inner.get();
              const out = Object.assign({}, value, { [loc]: v });
              if (!out[defaultLocale]) out[defaultLocale] = v;
              return out;
            },
          };
        }
        if (f.localized) {
          const inner = simpleInput(f, value);
          return { el: inner.el, check: inner.check, get: () => { const v = inner.get(); const out = { [loc]: v }; if (loc !== defaultLocale) out[defaultLocale] = v; return out; } };
        }
        return simpleInput(f, value);
      }

      function editor(item) {
        const def = st.def;
        const top = h("div");
        const inputs = {};
        const groups = def.fields.map((f) => {
          const input = inputFor(f, item ? item.data[f.key] : undefined, item ? item.media : {});
          inputs[f.key] = input;
          if (input.el.matches && input.el.matches("input, textarea, select")) input.el.id = input.el.id || nextId("cms-acc-in");
          const labelFor = input.el.matches && input.el.matches("input, textarea, select") ? input.el.id : null;
          return h(
            "div",
            { class: "cms-acc-field mb-3", "data-field": f.key },
            h(labelFor ? "label" : "div", { class: "form-label", for: labelFor }, A.text(f.label), f.required ? h("span", { class: "text-danger", "aria-hidden": "true" }, " *") : null),
            input.el,
            f.helpText ? h("div", { class: "form-text" }, A.text(f.helpText)) : null,
            h("div", { class: "invalid-feedback", "data-error-for": f.key }),
          );
        });
        const form = h(
          "form",
          { class: "cms-acc-form", novalidate: true },
          top,
          groups,
          h(
            "div",
            { class: "d-flex flex-wrap gap-2 align-items-center mt-4" },
            h("button", { type: "submit", class: "btn btn-dark" }, def.publish === "direct" ? t("save") : item ? t("submitReview") : t("submitReview")),
            h("button", { type: "button", class: "btn btn-outline-secondary", onclick: () => list() }, t("cancel")),
            h("span", { class: "cms-acc-note small ms-auto" }, def.publish === "direct" ? t("directNote") : t("reviewNote")),
          ),
        );
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const data = {};
          def.fields.forEach((f) => (data[f.key] = inputs[f.key].get()));
          // Required fields are checked here first, so the messages read the same in every language.
          const empty = (v) => v == null || v === "" || (Array.isArray(v) && !v.length) || (typeof v === "object" && !Array.isArray(v) && f0(v));
          const f0 = (v) => Object.keys(v).length > 0 && !v[defaultLocale] && !v[loc];
          const missing = {};
          def.fields.forEach((f) => {
            if (f.required && f.type !== "boolean" && empty(data[f.key])) missing[f.key] = t("required");
          });
          if (Object.keys(missing).length) {
            showErrors(form, { fields: missing });
            A.ui.fill(top, alertBox("danger", t("err_validation_error")));
            top.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
          }
          busy(form, async () => {
            try {
              const path = "/me/collections/" + encodeURIComponent(slug) + "/records";
              const saved = item ? await A.call("PATCH", path + "/" + item.id, { data, expectedVersion: item.version }) : await A.call("POST", path, { data });
              await load();
              st.notice = { kind: "success", text: saved.state === "published" ? t("published") : t("sentReview") };
              list();
              box.scrollIntoView({ behavior: "smooth", block: "start" });
            } catch (err) {
              const matched = showErrors(form, err);
              A.ui.fill(top, alertBox("danger", matched ? t("err_validation_error") : err.message));
              top.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          });
        });
        render(h("div", { class: "cms-acc-card cms-acc-editor" }, h("h2", { class: "h4 fw-bold mb-4" }, item ? t("editItem") + " — " + titleOf(item) : t("newItem")), form));
        box.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      /* ------------------------------- Start -------------------------------- */

      render(h("div", { class: "cms-acc-card" }, h("p", { class: "text-body-secondary mb-0", role: "status" }, t("loading"))));
      if (!slug) {
        render(alertBox("warning", t("noCollection")));
        return;
      }
      A.resume().then(() => {
        if (!A.session()) {
          A.requireSignIn(signinPage);
          needSignIn();
          return;
        }
        Promise.all([A.call("GET", "/me/collections/" + encodeURIComponent(slug)), load()])
          .then(([def]) => {
            st.def = def;
            list();
          })
          .catch(failed);
      });
    },
  };
})();
