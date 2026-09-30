"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import type { User } from "firebase/auth";
import { firebaseApp } from "@/lib/firebase";
import InquiryInbox from "@/components/InquiryInbox";
import logoAsset from "../public/eumlantree-logo-clean.png";

type AuthKit = typeof import("firebase/auth");
const ADMIN_USERNAME = "eum";
const ADMIN_EMAIL = "eum@eumlantree.com";

function loginError(error: unknown) {
  const code = (error as { code?: string })?.code;
  if (code === "auth/invalid-credential" || code === "auth/user-not-found" || code === "auth/wrong-password") return "아이디 또는 비밀번호를 확인해 주세요.";
  if (code === "auth/operation-not-allowed") return "Firebase Authentication에서 이메일/비밀번호 로그인이 켜져 있는지 확인해 주세요.";
  if (code === "auth/too-many-requests") return "로그인 시도가 많습니다. 잠시 후 다시 시도해 주세요.";
  if (code === "auth/network-request-failed") return "네트워크 연결을 확인한 뒤 다시 시도해 주세요.";
  return "로그인하지 못했습니다. 잠시 후 다시 시도해 주세요.";
}

export default function PhoneAuth() {
  const [kit, setKit] = useState<AuthKit | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | undefined;
    import("firebase/auth").then((authKit) => {
      if (!active) return;
      setKit(authKit);
      const auth = authKit.getAuth(firebaseApp);
      unsubscribe = authKit.onAuthStateChanged(auth, (nextUser) => {
        if (nextUser?.phoneNumber) {
          void authKit.signOut(auth);
          setUser(null);
          return;
        }
        setUser(nextUser);
      });
    }).catch(() => setError("Firebase Authentication을 불러오지 못했습니다."));
    return () => { active = false; unsubscribe?.(); };
  }, []);

  useEffect(() => {
    if (!loginOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [loginOpen]);

  function closeLogin() {
    setLoginOpen(false);
    setPassword("");
    setError("");
  }

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!kit) return;
    if (username.trim() !== ADMIN_USERNAME) {
      setError("아이디 또는 비밀번호를 확인해 주세요.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await kit.signInWithEmailAndPassword(kit.getAuth(firebaseApp), ADMIN_EMAIL, password);
      closeLogin();
    } catch (reason) {
      setError(loginError(reason));
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    if (!kit) return;
    await kit.signOut(kit.getAuth(firebaseApp));
  }

  const footerBrand = (
    <>
      <img src={logoAsset.src} alt="" />
      <span>이음랜트리<small>EUMLANTREE</small></span>
    </>
  );

  return (
    <>
      {user ? (
        <div className="footer-auth-row">
          <a className="footer-brand" href="#home" aria-label="이음랜트리 홈">{footerBrand}</a>
          <div className="auth-nav">
            {user.email === ADMIN_EMAIL && <InquiryInbox />}
            <button className="auth-nav-button" type="button" onClick={logout}>로그아웃</button>
          </div>
        </div>
      ) : (
        <button className="footer-brand footer-login-trigger" type="button" aria-label="관리자 로그인" title="관리자 로그인" onClick={() => { setLoginOpen(true); setError(""); }}>{footerBrand}</button>
      )}
      {loginOpen && !user && typeof document !== "undefined" && createPortal(
        <div className="modal-backdrop phone-login-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeLogin(); }}>
          <section className="dialog-card" role="dialog" aria-modal="true" aria-labelledby="admin-login-title">
            <button className="dialog-close" type="button" aria-label="닫기" onClick={closeLogin}>×</button>
            <div className="eyebrow">EUMLANTREE ADMIN</div>
            <h2 id="admin-login-title">관리자 로그인</h2>
            <p className="dialog-intro">아이디와 비밀번호를 입력해 문의 내역을 확인하세요.</p>
            <form onSubmit={signIn} className="dialog-form">
              <label htmlFor="admin-username">아이디</label>
              <input id="admin-username" autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} required />
              <label htmlFor="admin-password">비밀번호</label>
              <input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
              {error && <p className="form-error" role="alert">{error}</p>}
              <button className="dialog-submit" type="submit" disabled={busy || !kit}>{busy ? "로그인 중…" : "로그인"}</button>
            </form>
          </section>
        </div>,
        document.body,
      )}
    </>
  );
}
