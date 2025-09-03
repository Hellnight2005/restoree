"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

// ====== Constants ======
const ARRIVAL_BASE: string[] = [
    "Color fading",
    "Scuffs / scratches",
    "Edge wear",
    "Hardware tarnish",
    "Loss of structure",
    "Ink transfer",
    "Water marks",
    "Oil stains",
    "Odor",
    "Interior dirt",
    "Cracking leather",
];
const WORK_BASE: string[] = [
    "Deep clean",
    "Edge repair",
    "Color touch-up",
    "Conditioning",
    "Hardware polish",
    "Odor neutralisation",
    "Stitch reinforcement",
    "Protective coating",
    "Finish refinement",
];
const CARE_BASE: string[] = [
    "Keep dry 48h",
    "Store upright",
    "Avoid sunlight",
    "Use dust bag",
    "Wipe after use",
    "Condition 6 months",
    "Avoid overloading",
];

type Metric = {
    key: string;
    b: string;
    a: string;
    computed?: boolean;
};

const METRICS: Metric[] = [
    { key: "Color", b: "mColorB", a: "mColorA" },
    { key: "Structure", b: "mStructB", a: "mStructA" },
    { key: "Hardware", b: "mHardB", a: "mHardA" },
    { key: "Cleanliness", b: "mCleanB", a: "mCleanA" },
    { key: "Odor", b: "mOdorB", a: "mOdorA" },
    { key: "Overall", b: "mOverallB", a: "mOverallA", computed: true },
];

const STORAGE_KEY = "restoree_v16_7_2_state_react";

// ====== Helpers ======
const clamp10 = (v: any): number | null => (v == null || Number.isNaN(v) ? null : Math.min(10, Math.max(0, v)));
const toNum = (v: any): number | null => {
    if (v === "" || v == null) return null;
    const n = parseFloat(String(v).replace(/[^0-9.]/g, ""));
    return Number.isNaN(n) ? null : n;
};
const fmtDate = (v: string): string => {
    if (!v) return "—";
    const d = new Date(v);
    if (Number.isNaN(d.getTime())) return "—";
    return d
        .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
        .replace(/ /g, " ");
};
const genID = (): string => `RST-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Date.now()
    .toString()
    .slice(-4)}`;

// Flatten external logos so CORS doesn't block canvas export
const flattenImage = (src: string): Promise<string> =>
    new Promise((resolve) => {
        try {
            const img = new window.Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
                const c = document.createElement("canvas");
                c.width = img.naturalWidth || 800;
                c.height = img.naturalHeight || 400;
                const ctx = c.getContext("2d");
                if (ctx) {
                    ctx.fillStyle = "#ffffff";
                    ctx.fillRect(0, 0, c.width, c.height);
                    ctx.drawImage(img, 0, 0, c.width, c.height);
                    try {
                        resolve(c.toDataURL("image/png"));
                    } catch (e) {
                        resolve(src);
                    }
                } else {
                    resolve(src);
                }
            };
            img.onerror = () => resolve(src);
            img.src = src;
        } catch (e) {
            resolve(src);
        }
    });

// ====== UI Small bits ======
interface TagCheckboxGridProps {
    base: string[];
    selected: string[];
    onToggle: (tag: string) => void;
}

const TagCheckboxGrid: React.FC<TagCheckboxGridProps> = ({ base, selected, onToggle }) => (
    <div className="tag-grid">
        {base.map((t) => (
            <label
                key={t}
                className={`tag-item ${selected.includes(t) ? "bg-gray-100 border-gray-300" : "bg-white border-gray-200"
                    }`}
            >
                <input
                    type="checkbox"
                    className="accent-black"
                    checked={selected.includes(t)}
                    onChange={() => onToggle(t)}
                />
                <span className="text-sm">{t}</span>
            </label>
        ))}
    </div>
);

interface MiniBarProps {
    before: string | number;
    after: string | number;
}

const MiniBar: React.FC<MiniBarProps> = ({ before, after }) => {
    const vb = clamp10(toNum(before));
    const va = clamp10(toNum(after));
    const left = vb != null ? (vb / 10) * 100 : 0;
    const width = vb != null && va != null ? Math.abs(va - vb) / 10 * 100 : 0;
    const regressing = vb != null && va != null && va < vb;
    return (
        <div className="mini-bar-wrap">
            {vb != null && (
                <div className="mini-before" style={{ width: `${(vb / 10) * 100}%` }} />
            )}
            {vb != null && va != null && !regressing && (
                <div className="mini-after" style={{ left: `${left}%`, width: `${width}%` }} />
            )}
            {vb != null && va != null && regressing && (
                <>
                    <div className="mini-before" style={{ width: `${(va / 10) * 100}%` }} />
                    <div className="mini-regress" style={{ left: `${(va / 10) * 100}%`, width: `${((vb - va) / 10) * 100}%` }} />
                </>
            )}
        </div>
    );
};

// ====== Main Component ======
export default function RestorationCertificateReact() {
    // Basic status log (optional)
    const [logLines, setLogLines] = useState<string[]>([]);
    const log = (m: string) => setLogLines((prev) => [`${new Date().toLocaleTimeString()}: ${m}`, ...prev].slice(0, 200));

    // Core fields
    const [cust, setCust] = useState({ name: "", mobile: "", email: "", address: "" });
    const [article, setArticle] = useState({
        nameSelect: "",
        nameCustom: "",
        brand: "",
        model: "",
        serial: "",
        service: "",
        tech: "",
    });
    const [dates, setDates] = useState({ picked: "", completed: "", delivered: "", warranty: "", nextCare: "" });
    const [cond, setCond] = useState({ before: "", after: "" });
    const [improvePct, setImprovePct] = useState("");
    const [handle, setHandle] = useState("");
    const [verifyUrl, setVerifyUrl] = useState("");
    const [refCode, setRefCode] = useState("");
    const [certID, setCertID] = useState("");
    const [disclaimerTxt, setDisclaimerTxt] = useState("This certificate documents restorative work performed. Cosmetic enhancement does not imply manufacturer endorsement.");

    // Metrics
    interface MetricsState {
        mColorB: string;
        mColorA: string;
        mStructB: string;
        mStructA: string;
        mHardB: string;
        mHardA: string;
        mCleanB: string;
        mCleanA: string;
        mOdorB: string;
        mOdorA: string;
        mOverallB: string;
        mOverallA: string;
        [key: string]: string; // Index signature to allow dynamic key access
    }
    const [m, setM] = useState<MetricsState>({
        mColorB: "",
        mColorA: "",
        mStructB: "",
        mStructA: "",
        mHardB: "",
        mHardA: "",
        mCleanB: "",
        mCleanA: "",
        mOdorB: "",
        mOdorA: "",
        mOverallB: "",
        mOverallA: "",
    });

    // Tags
    const [arrivalSel, setArrivalSel] = useState<string[]>([]);
    const [workSel, setWorkSel] = useState<string[]>([]);
    const [careSel, setCareSel] = useState<string[]>([]);

    // Custom tag inputs
    const [arrivalAdd, setArrivalAdd] = useState("");
    const [workAdd, setWorkAdd] = useState("");
    const [careAdd, setCareAdd] = useState("");

    // Images
    const [beforeImgs, setBeforeImgs] = useState<string[]>([]); // array of data URLs (max 4)
    const [afterImgs, setAfterImgs] = useState<string[]>([]);

    // Logo
    const [logoUrl, setLogoUrl] = useState("");
    const [logoBase64, setLogoBase64] = useState("");
    const [embeddedLogo, setEmbeddedLogo] = useState<string | null>(null);
    const [logoStatus, setLogoStatus] = useState("");

    // View flags
    const [plainMode, setPlainMode] = useState(false);
    const [printFit, setPrintFit] = useState(false);

    const certificateRef = useRef<HTMLDivElement>(null);

    // ===== Persist / Restore =====
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const data = JSON.parse(raw);
            if (data.cust) setCust(data.cust);
            if (data.article) setArticle(data.article);
            if (data.dates) setDates(data.dates);
            if (data.cond) setCond(data.cond);
            if (data.improvePct !== undefined) setImprovePct(data.improvePct);
            if (data.handle !== undefined) setHandle(data.handle);
            if (data.verifyUrl !== undefined) setVerifyUrl(data.verifyUrl);
            if (data.refCode !== undefined) setRefCode(data.refCode);
            if (data.m) setM(data.m);
            if (data.arrivalSel) setArrivalSel(data.arrivalSel);
            if (data.workSel) setWorkSel(data.workSel);
            if (data.careSel) setCareSel(data.careSel);
            if (data.beforeImgs) setBeforeImgs(data.beforeImgs);
            if (data.afterImgs) setAfterImgs(data.afterImgs);
            if (data.logoUrl !== undefined) setLogoUrl(data.logoUrl);
            if (data.logoBase64 !== undefined) setLogoBase64(data.logoBase64);
            if (data.embeddedLogo !== undefined) setEmbeddedLogo(data.embeddedLogo);
            if (data.certID) setCertID(data.certID);
            if (data.plainMode) setPlainMode(true);
            if (data.printFit) setPrintFit(true);
            if (data.disclaimerTxt) setDisclaimerTxt(data.disclaimerTxt);
            log("State restored");
        } catch (e) {
            // ignore
        }
    }, []);

    useEffect(() => {
        const data = {
            cust,
            article,
            dates,
            cond,
            improvePct,
            handle,
            verifyUrl,
            refCode,
            m,
            arrivalSel,
            workSel,
            careSel,
            beforeImgs,
            afterImgs,
            logoUrl,
            logoBase64,
            embeddedLogo,
            certID,
            plainMode,
            printFit,
            disclaimerTxt,
        };
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            // ignore
        }
    }, [
        cust,
        article,
        dates,
        cond,
        improvePct,
        handle,
        verifyUrl,
        refCode,
        m,
        arrivalSel,
        workSel,
        careSel,
        beforeImgs,
        afterImgs,
        logoUrl,
        logoBase64,
        embeddedLogo,
        certID,
        plainMode,
        printFit,
        disclaimerTxt,
    ]);

    // ===== Derived values =====
    // Auto compute overall metrics when atomic ones change
    useEffect(() => {
        const bVals = [toNum(m.mColorB), toNum(m.mStructB), toNum(m.mHardB), toNum(m.mCleanB), toNum(m.mOdorB)].filter(
            (x) => x != null
        );
        const aVals = [toNum(m.mColorA), toNum(m.mStructA), toNum(m.mHardA), toNum(m.mCleanA), toNum(m.mOdorA)].filter(
            (x) => x != null
        );
        if (bVals.length) {
            const ob = bVals.reduce((x, y) => x + y, 0) / bVals.length;
            setM((prev) => ({ ...prev, mOverallB: ob.toFixed(1).replace(/\.0$/, "") }));
        }
        if (aVals.length) {
            const oa = aVals.reduce((x, y) => x + y, 0) / aVals.length;
            setM((prev) => ({ ...prev, mOverallA: oa.toFixed(1).replace(/\.0$/, "") }));
        }
    }, [m.mColorB, m.mStructB, m.mHardB, m.mCleanB, m.mOdorB, m.mColorA, m.mStructA, m.mHardA, m.mCleanA, m.mOdorA]);

    // Auto improvement % if not manually set
    useEffect(() => {
        if (!improvePct) {
            const ob = toNum(m.mOverallB);
            const oa = toNum(m.mOverallA);
            if (ob && oa && ob > 0) {
                let imp = ((oa - ob) / ob) * 100;
                imp = Math.min(100, Math.max(-100, imp));
                if (imp > 0) setImprovePct(`${imp.toFixed(0)}%`);
            }
        }
    }, [m.mOverallA, m.mOverallB]);

    const transformationScore = useMemo(() => {
        const progress: number[] = [];
        METRICS.filter((mm) => !mm.computed).forEach((mm) => {
            const vb = clamp10(toNum(m[mm.b]));
            const va = clamp10(toNum(m[mm.a]));
            if (vb != null && va != null && va > vb && vb < 10) {
                progress.push(((va - vb) / (10 - vb)) * 100);
            }
        });
        if (progress.length) return Math.min(100, Math.max(0, progress.reduce((x, y) => x + y, 0) / progress.length));
        const after = METRICS.filter((mm) => !mm.computed)
            .map((mm) => clamp10(toNum(m[mm.a])))
            .filter((v) => v != null);
        if (after.length) return Math.min(100, Math.max(0, (after.reduce((x, y) => x + y, 0) / after.length / 10) * 100));
        return null;
    }, [m]);

    const topGains = useMemo(() => {
        const arr: { k: string; g: number }[] = [];
        METRICS.filter((mm) => !mm.computed).forEach((mm) => {
            const vb = clamp10(toNum(m[mm.b]));
            const va = clamp10(toNum(m[mm.a]));
            if (vb != null && va != null && vb > 0) {
                let g = ((va - vb) / vb) * 100;
                g = Math.min(100, Math.max(-100, g));
                if (g > 0) arr.push({ k: mm.key, g });
            }
        });
        return arr.sort((a, b) => b.g - a.g).slice(0, 3);
    }, [m]);

    const overallDelta = useMemo(() => {
        const ob = toNum(m.mOverallB);
        const oa = toNum(m.mOverallA);
        if (ob != null && oa != null) {
            const d = oa - ob;
            const pct = ob > 0 ? Math.min(100, Math.max(-100, (d / ob) * 100)) : null;
            return { d, pct };
        }
        return { d: null, pct: null };
    }, [m.mOverallB, m.mOverallA]);

    // ===== Logo Handlers =====
    const applyLogo = (src: string) => {
        if (!src) return setEmbeddedLogo(null);
        setEmbeddedLogo(src);
    };
    const embedFromUrl = async () => {
        const url = logoUrl.trim();
        if (!url) {
            setLogoStatus("No URL");
            return;
        }
        setLogoStatus("Embedding...");
        try {
            // Fetch -> blob -> dataURL
            const resp = await fetch(url, { mode: "cors" });
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            const blob = await resp.blob();
            const data = await new Promise<string>((res, rej) => {
                const fr = new FileReader();
                fr.onload = () => res(fr.result as string);
                fr.onerror = () => rej(fr.error);
                fr.readAsDataURL(blob);
            });
            const flat = await flattenImage(data);
            setEmbeddedLogo(flat);
            setLogoStatus("Embedded & cached.");
            log("Logo embedded OK");
        } catch (e: any) {
            setLogoStatus(`Embed fail: ${e.message}`);
            log(`Logo embed failed: ${e.message}`);
        }
    };
    const onLogoUpload = async (file: File) => {
        if (!file) return;
        const fr = new FileReader();
        fr.onload = async (ev) => {
            const result = ev.target?.result;
            if (typeof result === 'string') {
                const flat = await flattenImage(result);
                setEmbeddedLogo(flat);
                setLogoStatus("Embedded from upload.");
                log("Logo uploaded & embedded");
            }
        };
        fr.readAsDataURL(file);
    };

    // ===== Images =====
    const onImageFiles = (files: FileList | null, type: 'before' | 'after') => {
        const list = Array.from(files || []);
        const readAll = list.slice(0, 4).map(
            (f) =>
                new Promise<string>((res) => {
                    const fr = new FileReader();
                    fr.onload = () => res(fr.result as string);
                    fr.readAsDataURL(f);
                })
        );
        Promise.all(readAll).then((arr) => {
            if (type === "before") setBeforeImgs(arr);
            else setAfterImgs(arr);
        });
    };

    // ===== Certificate Actions =====
    const ensureCertID = () => {
        if (!certID) setCertID(genID());
    };

    const printFullPage = () => {
        ensureCertID();
        window.print();
    };

    const exportPNG = async () => {
        ensureCertID();
        const node = certificateRef.current;
        if (!node) return;
        const canvas = await html2canvas(node, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
        const a = document.createElement("a");
        a.download = `certificate_${Date.now()}.png`;
        a.href = canvas.toDataURL("image/png");
        a.click();
    };

    const exportFlatPDF = async () => {
        ensureCertID();
        const node = certificateRef.current;
        if (!node) return;
        const canvas = await html2canvas(node, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
        const pdf = new jsPDF("p", "pt", "a4");
        const pw = pdf.internal.pageSize.getWidth();
        const ph = pdf.internal.pageSize.getHeight();
        const margin = 20;
        let imgW = pw - 2 * margin;
        const ratio = canvas.width / canvas.height;
        let imgH = imgW / ratio;
        if (imgH > ph - 2 * margin) {
            imgH = ph - 2 * margin;
            imgW = imgH * ratio;
        }
        pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", (pw - imgW) / 2, 20, imgW, imgH, "", "FAST");
        pdf.save(`certificate_flat_${Date.now()}.pdf`);
    };

    // ===== Render helpers =====
    const articleNameResolved = article.nameSelect === "__CUSTOM__" ? article.nameCustom : article.nameSelect;
    const genTime = useMemo(() => new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC", [m, cust, article, dates, cond]);

    const toggleSel = (value: string, listSetter: React.Dispatch<React.SetStateAction<string[]>>, list: string[]) => {
        if (list.includes(value)) listSetter(list.filter((x) => x !== value));
        else listSetter([...list, value]);
    };

    const addCustomTag = (addState: string, selState: string[], addSetter: React.Dispatch<React.SetStateAction<string>>, selSetter: React.Dispatch<React.SetStateAction<string[]>>) => {
        if (addState.trim()) {
            selSetter([...selState, addState.trim()]);
            addSetter("");
        }
    };

    // ====== UI ======
    return (
        <div className={`wrap ${plainMode ? "plain" : ""}`}>
            <div id="dataForm" className="form-col">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-semibold tracking-tight">Restoration Certificate Builder</h1>
                    <div className="text-xs text-gray-500">v16.7.2 (React)</div>
                </div>

                {/* Controls */}
                <div className="actions">
                    <button onClick={printFullPage} type="button">
                        Print / Full Page PDF
                    </button>
                    <button className="secondary" onClick={exportFlatPDF} type="button">
                        Flat Image PDF
                    </button>
                    <button className="secondary" onClick={exportPNG} type="button">
                        Export PNG
                    </button>
                    <button
                        className="secondary"
                        type="button"
                        onClick={() => setPlainMode((s) => !s)}
                    >
                        {plainMode ? "Design Mode" : "Plain Mode"}
                    </button>
                    <button
                        className="secondary"
                        type="button"
                        onClick={() => setPrintFit((s) => !s)}
                    >
                        Print Fit {printFit ? "ON" : "OFF"}
                    </button>
                    <button
                        className="secondary"
                        type="button"
                        onClick={() => setCertID(genID())}
                    >
                        New ID
                    </button>
                </div>

                {/* Form */}
                <div className="space-y-6">
                    {/* Header logo */}
                    <fieldset>
                        <legend>Header Logo</legend>
                        <div
                            className="logo-drop-zone"
                            onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("dragover"); }}
                            onDragLeave={(e) => e.currentTarget.classList.remove("dragover")}
                            onDrop={(e) => {
                                e.preventDefault();
                                e.currentTarget.classList.remove("dragover");
                                const f = e.dataTransfer.files?.[0];
                                if (f) onLogoUpload(f);
                            }}
                            onClick={() => document.getElementById("headerLogoInput")?.click()}
                        >
                            Drop Logo Here or Click to Upload
                            <small>PNG / JPG • Transparent PNG preferred • Auto embeds</small>
                        </div>
                        <input id="headerLogoInput" type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files && onLogoUpload(e.target.files[0])} />
                        <label>Logo URL</label>
                        <input type="text" placeholder="https://..." value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} />
                        <div className="actions">
                            <button className="secondary" type="button" onClick={embedFromUrl}>
                                Embed / Freeze
                            </button>
                            <button className="secondary" type="button" onClick={() => { setEmbeddedLogo(null); setLogoStatus("Reset"); }}>
                                Reset
                            </button>
                            <div className="micro">{logoStatus}</div>
                        </div>
                        <label>Base64</label>
                        <textarea
                            placeholder="data:image/png;base64,..."
                            value={logoBase64}
                            onChange={(e) => setLogoBase64(e.target.value)}
                        />
                        <button className="secondary" type="button" onClick={async () => {
                            if (!logoBase64.startsWith("data:image")) {
                                setLogoStatus("Invalid base64");
                                log("Logo base64 invalid");
                                return;
                            }
                            const flat = await flattenImage(logoBase64);
                            setEmbeddedLogo(flat);
                            setLogoStatus("Base64 embedded.");
                            log("Logo base64 embedded");
                        }}>Use Base64</button>
                    </fieldset>

                    {/* Customer */}
                    <fieldset>
                        <legend>Customer</legend>
                        <input className="w-full" placeholder="Name" value={cust.name} onChange={(e) => setCust({ ...cust, name: e.target.value })} />
                        <input className="w-full" placeholder="Mobile" value={cust.mobile} onChange={(e) => setCust({ ...cust, mobile: e.target.value })} />
                        <input className="w-full" placeholder="Email" value={cust.email} onChange={(e) => setCust({ ...cust, email: e.target.value })} />
                        <textarea className="w-full" placeholder="Address" rows={3} value={cust.address} onChange={(e) => setCust({ ...cust, address: e.target.value })} />
                    </fieldset>

                    {/* Article */}
                    <fieldset>
                        <legend>Article</legend>
                        <select className="w-full" value={article.nameSelect} onChange={(e) => setArticle({ ...article, nameSelect: e.target.value })} >
                            <option value="">Select Article</option>
                            <option value="Bag">Bag</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Wallet">Wallet</option>
                            <option value="__CUSTOM__">Custom</option>
                        </select>
                        {article.nameSelect === "__CUSTOM__" && (
                            <input className="w-full mt-2" placeholder="Custom Article Name" value={article.nameCustom} onChange={(e) => setArticle({ ...article, nameCustom: e.target.value })} />
                        )}
                        <input className="w-full" placeholder="Brand" value={article.brand} onChange={(e) => setArticle({ ...article, brand: e.target.value })} />
                        <input className="w-full" placeholder="Model" value={article.model} onChange={(e) => setArticle({ ...article, model: e.target.value })} />
                        <input className="w-full" placeholder="Serial" value={article.serial} onChange={(e) => setArticle({ ...article, serial: e.target.value })} />
                        <input className="w-full" placeholder="Service" value={article.service} onChange={(e) => setArticle({ ...article, service: e.target.value })} />
                        <input className="w-full" placeholder="Technician" value={article.tech} onChange={(e) => setArticle({ ...article, tech: e.target.value })} />
                    </fieldset>

                    {/* Dates */}
                    <fieldset>
                        <legend>Dates</legend>
                        <label>Picked Up
                            <input type="date" value={dates.picked} onChange={(e) => setDates({ ...dates, picked: e.target.value })} />
                        </label>
                        <label>Completed
                            <input type="date" value={dates.completed} onChange={(e) => setDates({ ...dates, completed: e.target.value })} />
                        </label>
                        <label>Delivered
                            <input type="date" value={dates.delivered} onChange={(e) => setDates({ ...dates, delivered: e.target.value })} />
                        </label>
                        <label>Warranty
                            <input type="date" value={dates.warranty} onChange={(e) => setDates({ ...dates, warranty: e.target.value })} />
                        </label>
                        <label>Next Care
                            <input type="date" value={dates.nextCare} onChange={(e) => setDates({ ...dates, nextCare: e.target.value })} />
                        </label>
                    </fieldset>

                    {/* Metrics */}
                    <fieldset>
                        <legend>Metrics (1-10)</legend>
                        {METRICS.filter(m => !m.computed).map(mKey => (
                            <div key={mKey.key} className="row">
                                <label>{mKey.key} Before
                                    <input type="text" value={m[mKey.b]} onChange={(e) => setM(prev => ({ ...prev, [mKey.b]: e.target.value }))} placeholder="5" />
                                </label>
                                <label>{mKey.key} After
                                    <input type="text" value={m[mKey.a]} onChange={(e) => setM(prev => ({ ...prev, [mKey.a]: e.target.value }))} placeholder="8" />
                                </label>
                            </div>
                        ))}
                    </fieldset>

                    {/* Tags */}
                    <fieldset>
                        <legend>Arrival Issues</legend>
                        <TagCheckboxGrid base={ARRIVAL_BASE} selected={arrivalSel} onToggle={(t) => toggleSel(t, setArrivalSel, arrivalSel)} />
                        <div className="add-line">
                            <input type="text" placeholder="Add custom" value={arrivalAdd} onChange={(e) => setArrivalAdd(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCustomTag(arrivalAdd, arrivalSel, setArrivalAdd, setArrivalSel)} />
                            <button className="secondary" type="button" onClick={() => addCustomTag(arrivalAdd, arrivalSel, setArrivalAdd, setArrivalSel)}>
                                Add
                            </button>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Work Done</legend>
                        <TagCheckboxGrid base={WORK_BASE} selected={workSel} onToggle={(t) => toggleSel(t, setWorkSel, workSel)} />
                        <div className="add-line">
                            <input type="text" placeholder="Add custom" value={workAdd} onChange={(e) => setWorkAdd(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCustomTag(workAdd, workSel, setWorkAdd, setWorkSel)} />
                            <button className="secondary" type="button" onClick={() => addCustomTag(workAdd, workSel, setWorkAdd, setWorkSel)}>
                                Add
                            </button>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Care Essentials</legend>
                        <TagCheckboxGrid base={CARE_BASE} selected={careSel} onToggle={(t) => toggleSel(t, setCareSel, careSel)} />
                        <div className="add-line">
                            <input type="text" placeholder="Add custom" value={careAdd} onChange={(e) => setCareAdd(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCustomTag(careAdd, careSel, setCareAdd, setCareSel)} />
                            <button className="secondary" type="button" onClick={() => addCustomTag(careAdd, careSel, setCareAdd, setCareSel)}>
                                Add
                            </button>
                        </div>
                    </fieldset>

                    {/* Images */}
                    <fieldset>
                        <legend>Images</legend>
                        <div className="row">
                            {["Before 1", "Before 2", "Before 3", "Before 4"].map((label, i) => (
                                <label key={i} className="flex-1">
                                    {label}
                                    <input type="file" onChange={(e) => e.target.files && onImageFiles(e.target.files, "before")} />
                                </label>
                            ))}
                        </div>
                        <div className="row">
                            {["After 1", "After 2", "After 3", "After 4"].map((label, i) => (
                                <label key={i} className="flex-1">
                                    {label}
                                    <input type="file" onChange={(e) => e.target.files && onImageFiles(e.target.files, "after")} />
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    {/* Disclaimer */}
                    <fieldset>
                        <legend>Disclaimer</legend>
                        <textarea rows={3} value={disclaimerTxt} onChange={(e) => setDisclaimerTxt(e.target.value)} />
                    </fieldset>
                </div>
            </div>

            {/* Right column (Certificate Display) */}
            <div className={`cert-col ${printFit ? "scale-95" : ""}`}>
                <div ref={certificateRef} className={`cert-shell ${plainMode ? 'plain' : ''}`}>
                    {/* Logo */}
                    <div className="logo-wrap">
                        {embeddedLogo ? (
                            <img src={embeddedLogo} alt="Logo" className="cert-logo" />
                        ) : (
                            <div className="logo-fallback">RESTOREE</div>
                        )}
                    </div>
                    <h2 className="cert-title">Restoration Certificate</h2>
                    <div className="gen-line">
                        <span>ID: {certID || "—"}</span> |
                        <span>Generated: {genTime}</span>
                    </div>

                    {/* Customer & Article Info */}
                    <div className="info-grid">
                        <div className="info-box"><div className="lbl">Customer:</div><div className="val">{cust.name || "—"}</div></div>
                        <div className="info-box"><div className="lbl">Mobile:</div><div className="val">{cust.mobile || "—"}</div></div>
                        <div className="info-box"><div className="lbl">Email:</div><div className="val">{cust.email || "—"}</div></div>
                        <div className="info-box"><div className="lbl">Address:</div><div className="val">{cust.address || "—"}</div></div>
                        <div className="info-box"><div className="lbl">Article:</div><div className="val">{articleNameResolved || "—"}</div></div>
                        <div className="info-box"><div className="lbl">Brand:</div><div className="val">{article.brand || "—"}</div></div>
                        <div className="info-box"><div className="lbl">Model:</div><div className="val">{article.model || "—"}</div></div>
                        <div className="info-box"><div className="lbl">Serial:</div><div className="val">{article.serial || "—"}</div></div>
                        <div className="info-box"><div className="lbl">Service:</div><div className="val">{article.service || "—"}</div></div>
                        <div className="info-box"><div className="lbl">Technician:</div><div className="val">{article.tech || "—"}</div></div>
                        <div className="info-box"><div className="lbl">Picked Up:</div><div className="val">{fmtDate(dates.picked)}</div></div>
                        <div className="info-box"><div className="lbl">Completed:</div><div className="val">{fmtDate(dates.completed)}</div></div>
                    </div>

                    {/* Before & After Images */}
                    <div className="ba-block">
                        <div className="ba-headers">
                            <div className="ba-head">Before</div>
                            <div className="ba-head">After</div>
                        </div>
                        <div className="ba-grid">
                            {Array.from({ length: Math.max(beforeImgs.length, afterImgs.length) }).map((_, i) => (
                                <React.Fragment key={i}>
                                    <div className={`ba-cell ${!beforeImgs[i] ? "empty" : ""}`}>
                                        {beforeImgs[i] ? <img src={beforeImgs[i]} alt="Before" /> : <span>Image</span>}
                                    </div>
                                    <div className={`ba-cell ${!afterImgs[i] ? "empty" : ""}`}>
                                        {afterImgs[i] ? <img src={afterImgs[i]} alt="After" /> : <span>Image</span>}
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Metrics */}
                    <table className="metrics-table">
                        <thead>
                            <tr>
                                <th className="metric">Metric</th>
                                <th>Before</th>
                                <th>After</th>
                                <th>Δ (Pct)</th>
                                <th>Bar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {METRICS.filter(mt => !mt.computed).map(mt => (
                                <tr key={mt.key}>
                                    <td className="metric">{mt.key}</td>
                                    <td>{toNum(m[mt.b]) || "—"}</td>
                                    <td>{toNum(m[mt.a]) || "—"}</td>
                                    <td>
                                        {(toNum(m[mt.a]) != null && toNum(m[mt.b]) != null)
                                            ? `${toNum(m[mt.a])! - toNum(m[mt.b])!} (${(((toNum(m[mt.a])! - toNum(m[mt.b])!) / toNum(m[mt.b])!) * 100).toFixed(0)}%)`
                                            : "—"}
                                    </td>
                                    <td>
                                        <MiniBar before={m[mt.b]} after={m[mt.a]} />
                                    </td>
                                </tr>
                            ))}
                            <tr className="avoid-break">
                                <td className="metric" colSpan={2}><strong>Overall Progress</strong></td>
                                <td><strong>{m.mOverallA || "—"}</strong></td>
                                <td>
                                    {overallDelta.d !== null ? `${overallDelta.d > 0 ? "+" : ""}${overallDelta.d} (${overallDelta.pct?.toFixed(0) || "—"}%)` : "—"}
                                </td>
                                <td>
                                    <MiniBar before={m.mOverallB} after={m.mOverallA} />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Tags and Disclaimer */}
                    <div className="notes-block">
                        {arrivalSel.length > 0 && (
                            <div className="avoid-break">
                                <h5>Arrival Condition</h5>
                                <ul className="list-disc list-inside">
                                    {arrivalSel.map(item => <li key={item}>{item}</li>)}
                                </ul>
                            </div>
                        )}
                        {workSel.length > 0 && (
                            <div className="avoid-break mt-4">
                                <h5>Work Performed</h5>
                                <ul className="list-disc list-inside">
                                    {workSel.map(item => <li key={item}>{item}</li>)}
                                </ul>
                            </div>
                        )}
                        {careSel.length > 0 && (
                            <div className="avoid-break mt-4">
                                <h5>Care Plan</h5>
                                <ul className="list-disc list-inside">
                                    {careSel.map(item => <li key={item}>{item}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="disclaimer">
                        {disclaimerTxt}
                    </div>
                </div>
            </div>

            {/* Status Panel */}
            <div className="status-panel">
                <div className="font-semibold mb-1">Status Log</div>
                <div className="max-h-40 overflow-y-auto">
                    {logLines.map((line, i) => (
                        <div key={i} className="text-gray-400">{line}</div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                :root {
                    --gold:#c9a24a;
                    --gold-deep:#b18327;
                    --ink:#111;
                    --ink-soft:#3e4146;
                    --line:#ddd4c4;
                    --panel:#ffffff;
                    --accent-bg:#f7f3eb;
                    --bar-before:#d7cab6;
                    --bar-improve:linear-gradient(90deg,#c9a24a,#b18327);
                    --bar-regress:#e26b6b;
                    --ba-divider:#e1d6c6;
                    --ba-head-bg:#f6f1e9;
                }
                * { box-sizing:border-box; }
                html,body {
                    margin:0;
                    background:#fff;
                    font-family:'Inter',system-ui,-apple-system,'Segoe UI',Roboto;
                    font-size:15px;
                    color:var(--ink);
                    -webkit-font-smoothing:antialiased;
                }
                .plain * {
                    background:#fff !important;
                    color:#000 !important;
                    box-shadow:none !important;
                    background-image:none !important;
                }
                a{color:var(--gold);text-decoration:none;font-weight:600;}
                a:hover{text-decoration:underline;}
                .plain a{color:#000;text-decoration:none;}
                .wrap{
                    max-width:1480px;
                    margin:0 auto;
                    padding:20px 30px 70px;
                    display:grid;
                    gap:44px;
                }
                @media(min-width:1250px){.wrap{grid-template-columns:470px 1fr;}}
                @media(max-width:1249px){.wrap{grid-template-columns:1fr;}}
                fieldset{
                    border:1px solid var(--line);
                    border-radius:18px;
                    padding:16px 18px 20px;
                    background:var(--panel);
                }
                legend{
                    font:700 .65rem 'Inter';
                    letter-spacing:.18em;
                    text-transform:uppercase;
                    padding:0 10px;
                    color:var(--ink-soft);
                }
                label{
                    display:flex;
                    flex-direction:column;
                    gap:4px;
                    margin:0 0 12px;
                    font:600 .58rem 'Inter';
                    letter-spacing:.06em;
                    text-transform:uppercase;
                    color:var(--ink-soft);
                }
                input[type=text],input[type=date],select,textarea{
                    border:1px solid var(--line);
                    background:#fff;
                    padding:9px 11px;
                    border-radius:10px;
                    font:600 .82rem 'Inter';
                    color:var(--ink);
                }
                textarea{resize:vertical;min-height:62px;}
                input:focus,select:focus,textarea:focus{outline:2px solid #e9dfc6;}
                .row{display:flex;gap:10px;}
                .row>*{flex:1;}
                .actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:4px;}
                button{
                    background:linear-gradient(120deg,var(--gold),var(--gold-deep));
                    color:#fff;
                    border:none;
                    padding:10px 18px;
                    font:700 .62rem 'Inter';
                    letter-spacing:.12em;
                    text-transform:uppercase;
                    border-radius:10px;
                    cursor:pointer;
                }
                button.secondary{
                    background:#fff;
                    color:var(--ink);
                    border:1px solid var(--line);
                }
                .micro{
                    font:600 .5rem/1.3 'Inter';
                    color:var(--ink-soft);
                    letter-spacing:.05em;
                    margin-top:2px;
                }
                .tag-grid{
                    display:grid;
                    gap:8px;
                    grid-template-columns:repeat(auto-fill,minmax(170px,1fr));
                }
                .tag-item{
                    display:flex;
                    gap:6px;
                    align-items:center;
                    font:600 .6rem 'Inter';
                    background:#fff;
                    border:1px solid #ece4d6;
                    padding:6px 8px;
                    border-radius:10px;
                }
                .tag-item input{margin:0;width:15px;height:15px;}
                .add-line{display:flex;gap:8px;margin-top:10px;}
                .add-line input{flex:1;}
                .cert-shell{
                    background:#fff;
                    border:3px solid var(--gold);
                    border-radius:36px;
                    padding:54px 60px 74px;
                    max-width:1130px;
                    margin:0 auto;
                    position:relative;
                    box-shadow:0 22px 46px -18px rgba(0,0,0,.15);
                }
                .plain .cert-shell{border:2px solid #000;box-shadow:none;}
                .logo-wrap{
                    text-align:center;
                    margin:0 0 8px;
                    min-height:122px;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                }
                .cert-logo{
                    max-width:420px;
                    height:120px;
                    object-fit:contain;
                    background:#fff;
                    filter:contrast(1.05);
                }
                .logo-fallback{
                    font:800 2.4rem 'Playfair Display';
                    color:var(--gold);
                    letter-spacing:2px;
                }
                .cert-title{
                    text-align:center;
                    font:800 2.3rem 'Playfair Display';
                    margin:4px 0 20px;
                    text-transform:uppercase;
                    color:#101010;
                }
                .gen-line{
                    text-align:center;
                    font:600 .5rem 'Inter';
                    letter-spacing:.2em;
                    text-transform:uppercase;
                    color:var(--ink-soft);
                    margin:-4px 0 26px;
                }
                .section-head{
                    font:700 .68rem 'Inter';
                    letter-spacing:.32em;
                    text-transform:uppercase;
                    text-align:center;
                    color:var(--ink-soft);
                    margin:30px 0 16px;
                }
                .info-grid{
                    display:grid;
                    gap:18px 18px;
                    grid-template-columns:repeat(auto-fit,minmax(230px,1fr));
                }
                .info-box{
                    background:#fff;
                    border:1.6px solid #e6dac6;
                    border-radius:16px;
                    padding:12px 15px 14px;
                    display:flex;
                    flex-direction:column;
                    gap:6px;
                    min-height:76px;
                }
                .plain .info-box{border:1px solid #000;}
                .info-box .lbl{
                    font:600 .52rem 'Inter';
                    letter-spacing:.2em;
                    text-transform:uppercase;
                    color:var(--ink-soft);
                }
                .info-box .val{
                    font:700 .86rem 'Inter';
                    line-height:1.15;
                    letter-spacing:.3px;
                    word-break:break-word;
                    color:#121212;
                }
                .ba-block{
                    position:relative;
                    margin:12px 0 50px;
                    border:2px solid var(--gold);
                    border-radius:24px;
                    padding:18px 28px 26px;
                    background:#fff;
                }
                .plain .ba-block{border:1px solid #000;}
                .ba-block:before{
                    content:"";
                    position:absolute;
                    top:60px;
                    bottom:26px;
                    left:50%;
                    width:1px;
                    background:var(--ba-divider);
                    pointer-events:none;
                }
                .ba-headers{
                    display:grid;
                    grid-template-columns:1fr 1fr;
                    gap:0;
                    margin:0 0 14px;
                    position:relative;
                }
                .ba-head{
                    text-align:center;
                    font:700 .75rem 'Inter';
                    letter-spacing:.22em;
                    text-transform:uppercase;
                    padding:10px 4px 9px;
                    background:var(--ba-head-bg);
                    border:1px solid var(--gold);
                    color:#1b1b1b;
                    border-bottom:2px solid var(--gold);
                }
                .ba-head:first-child{
                    border-top-left-radius:14px;
                    border-right:none;
                }
                .ba-head:last-child{
                    border-top-right-radius:14px;
                    border-left:none;
                }
                .plain .ba-head{background:#fff;}
                .ba-grid{
                    display:grid;
                    grid-template-columns:1fr 1fr;
                    gap:18px 26px;
                }
                .ba-cell{
                    position:relative;
                    background:#f0ede8;
                    border:1px solid #dacfbf;
                    border-radius:16px;
                    height:180px;
                    overflow:hidden;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    font:700 .6rem 'Inter';
                    color:#5b5b5b;
                    box-shadow:0 4px 12px -6px rgba(0,0,0,.22);
                }
                .ba-cell img{
                    width:100%;
                    height:100%;
                    object-fit:cover;
                }
                .ba-cell.empty{
                    background:repeating-linear-gradient(45deg,#f7f3ed,#f7f3ed 10px,#eee7dd 10px,#eee7dd 20px);
                    color:#8d7d68;
                    font-weight:600;
                    letter-spacing:.05em;
                }
                .plain .ba-cell{box-shadow:none;}
                .plain .ba-cell.empty{background:#fff;}
                @media(max-width:740px){
                    .ba-block:before{display:none;}
                    .ba-grid{gap:14px 16px;}
                    .ba-cell{height:150px;}
                }
                @media print{
                    .ba-cell{page-break-inside:avoid;break-inside:avoid;}
                }
                .metrics-table{
                    width:100%;
                    border-collapse:collapse;
                    background:#fff;
                    border:3px solid var(--gold);
                    font:600 .62rem 'Inter';
                    margin:0 auto 30px;
                    max-width:880px;
                }
                .metrics-table th{
                    background:#f5efe2;
                    font:800 .55rem 'Inter';
                    letter-spacing:.18em;
                    text-transform:uppercase;
                    padding:8px 6px;
                    border:1.6px solid var(--gold);
                    color:#202020;
                }
                .plain .metrics-table th{background:#fff;}
                .metrics-table td{
                    border:1.6px solid var(--gold);
                    padding:6px 6px;
                    text-align:center;
                    background:#fff;
                    font-weight:600;
                    vertical-align:middle;
                }
                .metrics-table td.metric{text-align:left;font-weight:700;color:#161616;white-space:nowrap;}
                .mini-bar-wrap{
                    position:relative;
                    height:14px;
                    background:#eee;
                    border:1px solid #d3ccbe;
                    border-radius:12px;
                    overflow:hidden;
                    width:120px;
                    margin:0 auto;
                }
                .mini-before,.mini-after,.mini-regress{
                    position:absolute;top:0;bottom:0;left:0;width:0%;
                }
                .mini-before{background:var(--bar-before);}
                .mini-after{background:var(--bar-improve);mix-blend-mode:multiply;}
                .mini-regress{background:var(--bar-regress);opacity:.85;}
                .notes-block{
                    background:#fff;
                    border:1px solid #eadfca;
                    border-radius:16px;
                    padding:18px 22px 20px;
                    max-width:880px;
                    margin:0 auto 34px;
                }
                .notes-block h5{
                    margin:0 0 10px;
                    font:700 .6rem 'Inter';
                    letter-spacing:.22em;
                    text-transform:uppercase;
                    color:#2a2b2d;
                }
                .notes-block ul{
                    margin:0;
                    padding-left:20px;
                    font:600 .68rem/1.5 'Inter';
                    color:#1d1e1f;
                }
                .disclaimer{
                    max-width:840px;
                    margin:18px auto 14px;
                    font:600 .52rem/1.38 'Inter';
                    letter-spacing:.06em;
                    text-align:center;
                    color:#575a5e;
                }
                .status-panel{
                    position:fixed;
                    left:12px;
                    bottom:12px;
                    background:#111;
                    color:#fff;
                    font:600 .55rem 'Inter';
                    padding:8px 10px;
                    border-radius:10px;
                    max-width:260px;
                    z-index:9999;
                    line-height:1.3;
                    box-shadow:0 4px 14px -4px rgba(0,0,0,.4);
                }
                .status-panel button{
                    all:unset;
                    display:inline-block;
                    background:#444;
                    color:#fff;
                    padding:3px 6px;
                    margin:4px 4px 0 0;
                    border-radius:5px;
                    font:600 .55rem 'Inter';
                    cursor:pointer;
                }
                .status-panel button:hover{background:#666;}
                .logo-drop-zone{
                    border:2px dashed #c7b79e;
                    background:#faf7f2;
                    padding:18px 16px;
                    border-radius:16px;
                    text-align:center;
                    cursor:pointer;
                    font:600 .66rem 'Inter';
                    letter-spacing:.08em;
                    color:#715d37;
                    transition:.25s border-color,.25s background;
                }
                .logo-drop-zone.dragover{
                    background:#f0e8dc;
                    border-color:var(--gold);
                }
                .logo-drop-zone small{display:block;margin-top:6px;font:500 .55rem 'Inter';opacity:.8;}
                .avoid-break{break-inside:avoid;page-break-inside:avoid;}
                @media print {
                    .form-col, #dataForm, form, fieldset, legend, .actions, input, select, textarea,
                    .status-panel, .status-panel * {
                        display:none !important;
                        visibility:hidden !important;
                    }
                    .wrap { grid-template-columns:1fr !important; padding:0 !important; }
                    .cert-shell {
                        border:3px solid var(--gold) !important;
                        box-shadow:none !important;
                        margin:0 !important;
                        padding:40px 50px 56px !important;
                    }
                    .ba-block {page-break-inside:avoid;break-inside:avoid;}
                    .notes-block,
                    .info-grid,
                    .logo-wrap,
                    .gen-line {page-break-inside:avoid;break-inside:avoid;}
                    .metrics-table thead {display:table-header-group;}
                    body {
                        -webkit-print-color-adjust:exact !important;
                        print-color-adjust:exact !important;
                        background:#fff !important;
                    }
                }
            `}</style>
        </div>
    );
}