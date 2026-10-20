import React, { useRef, useState, useEffect } from "react";
import { motion, useTransform, useScroll, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "./screens";
import {
	ScreenFolders,
	ScreenLock,
	ScreenEditor,
	ScreenSearch,
	ScreenTasks,
	ScreenAI,
} from "./screens";

/*
 * The feature copy, in the order the showcase walks through it. Each entry
 * points at one of the mock screens in `screens.tsx`, which are drawn from
 * the app's own dark theme and use the real labels the app shows.
 */
const features = [
	{
		id: "vault",
		eyebrow: "01 — The vault",
		title: "Notes are files.",
		description:
			"Every note is a Markdown file in a folder you pick, with metadata in frontmatter. The vault opens straight in Obsidian, and backing up means copying that folder.",
		points: [
			"Plain Markdown with YAML frontmatter",
			"Obsidian and other Markdown tools read it directly",
			"Import a zipped Obsidian vault, or single .md files",
		],
		color: "#a855f7",
		align: "left" as const,
		screen: <ScreenFolders />,
	},
	{
		id: "key",
		eyebrow: "02 — The lock",
		title: "Your PIN is the key.",
		description:
			"Locking a note derives its key from the PIN you type and stores nothing else. A vault copied off the phone is useless without it — and a locked note still opens on a new phone.",
		points: [
			"PBKDF2-HMAC-SHA256, 210,000 rounds, one derivation per note",
			"AES-256-CBC + HMAC-SHA256 for text, AES-256-GCM for media",
			"Biometrics type the PIN for you — they are never the key",
		],
		color: "#34d399",
		align: "right" as const,
		screen: <ScreenLock />,
	},
	{
		id: "editor",
		eyebrow: "03 — The editor",
		title: "An editor for writing.",
		description:
			"A Markdown editor written for people who write in Markdown all day: a formatting toolbar, a slash command menu, and blocks you can turn into something else. Callouts, pipe tables, footnotes, wiki links and backlinks, with find and replace.",
		points: [
			"Type / for headings, lists, callouts, tables and code",
			"Long-press a block to change, move, duplicate or delete it",
			"Undo, redo, smart Enter, and a links & backlinks panel",
		],
		color: "#60a5fa",
		align: "left" as const,
		screen: <ScreenEditor />,
	},
	{
		id: "search",
		eyebrow: "04 — Search",
		title: "Search that understands.",
		description:
			"Full-text search over the whole vault, semantic search that finds a note by what it means, and image search that finds a photo by describing it. Filters for folders, dates, pinned and locked state.",
		points: [
			"Text, by meaning, and in images",
			"Advanced filters for folders, dates, pinned and locked notes",
			"Embeddings are computed on the device, not on a server",
		],
		color: "#f472b6",
		align: "right" as const,
		screen: <ScreenSearch />,
	},
	{
		id: "tasks",
		eyebrow: "05 — Tasks & history",
		title: "Tasks, dates and history.",
		description:
			"Checklists with nesting and per-note progress, a vault-wide Tasks screen, due dates and reminders — plus git-like version history for every note and a recycle bin that keeps things for 30 days.",
		points: [
			"📅 for a due date, ⏰ for a reminder, in the task's own line",
			"Overdue, Today, Tomorrow and the next seven days",
			"Line diffs and one-tap restore, up to 500 versions per note",
		],
		color: "#fbbf24",
		align: "left" as const,
		screen: <ScreenTasks />,
	},
	{
		id: "ai",
		eyebrow: "06 — On-device AI",
		title: "AI that stays on the phone.",
		description:
			"Chat with your notes, summarise, draft and generate images with models that run entirely on your device. Web search was removed on purpose: the only thing NoteGuard ever fetches is a link you paste yourself.",
		points: [
			"Local LLMs, Whisper, MiniLM, CLIP and diffusion models",
			"A memory check warns you before a model that will not fit",
			"Nothing heavy loads until you ask for it",
		],
		color: "#2dd4bf",
		align: "right" as const,
		screen: <ScreenAI />,
	},
];

/* The device the screens are drawn inside. */
const PhoneFrame = ({ children }: { children: React.ReactNode }) => (
	<div
		aria-hidden="true"
		className="relative w-[320px] h-[660px] bg-black rounded-[44px] shadow-2xl overflow-hidden border-[6px] border-[#1c1c1e]"
		style={{
			boxShadow: `0 0 0 2px #0f0f0f, 8px 10px 0 2px #0a0a0a, 14px 18px 0 2px #050505, 0 40px 70px -20px rgba(0,0,0,0.9), 0 0 60px -12px rgba(168,85,247,0.18)`,
		}}
	>
		<div className="absolute inset-0 rounded-[38px] ring-1 ring-white/10 z-50 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent"></div>
		<div className="absolute inset-0 bg-black">{children}</div>
	</div>
);

export default function FeatureShowcase() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [activeFeature, setActiveFeature] = useState(0);
	/*
	 * How far the phone has to travel to sit on the opposite side of the
	 * screen from the text. On a wide screen the phone sits against one edge
	 * and the copy against the other, so the two never collide; on a narrow
	 * one the phone stays in the middle and the copy scrolls over it on a
	 * blurred card.
	 */
	const [shift, setShift] = useState(0);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	const rotateY = useTransform(scrollYProgress, [0, 1], [0, -18]);
	const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.04, 1]);

	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const springConfig = { stiffness: 100, damping: 30 };
	const rotateXSpring = useSpring(
		useTransform(mouseY, [-0.5, 0.5], [6, -6]),
		springConfig,
	);
	const rotateYSpring = useSpring(
		useTransform(mouseX, [-0.5, 0.5], [-6, 6]),
		springConfig,
	);

	/* Which side of the screen the phone sits on — opposite the copy. */
	const side = useMotionValue(0);
	const sideSpring = useSpring(side, { stiffness: 70, damping: 20 });

	useEffect(() => {
		side.set(features[activeFeature].align === "left" ? shift : -shift);
	}, [activeFeature, shift, side]);

	const combinedRotateX = useTransform(() => rotateXSpring.get());
	const combinedRotateY = useTransform(() => rotateY.get() + rotateYSpring.get());

	useEffect(() => {
		const measure = () => {
			const width = window.innerWidth;
			if (width < 1024) {
				setShift(0);
				return;
			}
			const half = width / 2;
			setShift(Math.max(0, half - 160 - 120));
		};

		const handleScroll = () => {
			if (!containerRef.current) return;
			const sections = features.map((f) =>
				document.getElementById(`feature-${f.id}`),
			);
			let currentIdx = 0;
			let minDist = Infinity;
			sections.forEach((sec, idx) => {
				if (!sec) return;
				const r = sec.getBoundingClientRect();
				const dist = Math.abs(r.top - window.innerHeight / 2);
				if (dist < minDist) {
					minDist = dist;
					currentIdx = idx;
				}
			});
			setActiveFeature(currentIdx);
		};

		const onMouseMove = (e: MouseEvent) => {
			mouseX.set(e.clientX / window.innerWidth - 0.5);
			mouseY.set(e.clientY / window.innerHeight - 0.5);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("resize", measure);
		handleScroll();
		measure();
		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("resize", measure);
		};
	}, []);

	return (
		<div ref={containerRef} className="relative w-full bg-ink">
			{/*
			 * On a wide screen the phone sticks in the middle of the viewport
			 * and the copy scrolls past it. On a narrow one the sticky phone
			 * would be in the way of the copy, so each feature carries its own
			 * phone inline and the page scrolls normally.
			 */}
			<div className="sticky top-0 h-screen hidden lg:flex items-center justify-center overflow-hidden z-10 perspective-2000">
				{/* Ambient glow, tinted by the active feature and following the phone */}
				<div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
					<motion.div
						className="w-[560px] h-[560px] rounded-full blur-[150px] shrink-0"
						animate={{ backgroundColor: features[activeFeature].color }}
						transition={{ duration: 0.8 }}
						style={{ opacity: 0.18, x: sideSpring }}
					></motion.div>
				</div>

				{/* The phone */}
				<motion.div
					style={{
						x: sideSpring,
						rotateX: combinedRotateX,
						rotateY: combinedRotateY,
						scale,
						z: 100,
					}}
					className="relative transform-3d transition-transform duration-500"
				>
					<PhoneFrame>
						{features.map((feature, index) => (
							<motion.div
								key={feature.id}
								initial={false}
								animate={{ opacity: activeFeature === index ? 1 : 0 }}
								transition={{ duration: 0.45 }}
								className="absolute inset-0"
							>
								{feature.screen}
							</motion.div>
						))}
					</PhoneFrame>
				</motion.div>
			</div>

			{/* The feature copy */}
			<div className="relative z-20">
				{features.map((feature) => (
					<div
						id={`feature-${feature.id}`}
						key={feature.id}
						className={cn(
							"min-h-screen flex items-start lg:items-center px-6 md:px-12 lg:px-20 py-16 lg:py-0 pointer-events-none",
							feature.align === "left"
								? "justify-center lg:justify-start"
								: "justify-center lg:justify-end",
						)}
					>
						<div className="max-w-md pointer-events-auto w-full">
							{/* The phone, inline, for narrow screens */}
							<div className="lg:hidden mb-8 flex justify-center">
								{/* The scale does not change the layout box, so the
								    space it leaves behind is taken back here. */}
								<div className="scale-[0.78] origin-top -mb-[145px]">
									<PhoneFrame>{feature.screen}</PhoneFrame>
								</div>
							</div>

							<motion.div
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6 }}
								className="bg-black/70 backdrop-blur-xl p-7 rounded-3xl border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] lg:bg-transparent lg:backdrop-blur-none lg:p-0 lg:border-none lg:shadow-none transition-all duration-300"
							>
								<span
									className="eyebrow inline-block mb-4"
									style={{ color: feature.color }}
								>
									{feature.eyebrow}
								</span>
								<h2 className="text-4xl md:text-6xl font-bold mb-5 text-white tracking-tight leading-[1.05]">
									{feature.title}
								</h2>
								<p className="text-lg text-zinc-400 leading-relaxed">
									{feature.description}
								</p>
								<ul className="mt-7 space-y-3">
									{feature.points.map((point) => (
										<li
											key={point}
											className="flex gap-3 text-[15px] text-zinc-300"
										>
											<ArrowRight
												className="w-4 h-4 mt-1 shrink-0"
												style={{ color: feature.color }}
											/>
											<span>{point}</span>
										</li>
									))}
								</ul>
							</motion.div>
						</div>
					</div>
				))}
			</div>

			<style>{`
				.perspective-2000 { perspective: 2000px; }
				.transform-3d { transform-style: preserve-3d; }
			`}</style>
		</div>
	);
}
