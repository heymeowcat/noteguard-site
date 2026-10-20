import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
	Search,
	Lock,
	Cog,
	Folder,
	FolderOpen,
	FolderPlus,
	Trash2,
	ListTodo,
	ChevronRight,
	ChevronLeft,
	SlidersHorizontal,
	CheckCircle2,
	Circle,
	Pin,
	Bell,
	CalendarDays,
	Undo2,
	Redo2,
	Paperclip,
	Brush,
	Bold,
	Italic,
	Underline,
	Strikethrough,
	Heading1,
	List,
	ListOrdered,
	Quote,
	Code,
	Link2,
	Minus,
	Sparkles,
	Brain,
	Images,
	EllipsisVertical,
	SquarePen,
	Download,
	Check,
	Hash,
	Shield,
	KeyRound,
} from "lucide-react";

export function cn(...inputs: (string | undefined | null | false)[]) {
	return twMerge(clsx(inputs));
}

/*
 * The palette below is the app's own dark theme, read from `themes/theme.ts`
 * in the NoteGuard repository: a black screen, #1C1C1E cards, #2C2C2E grouped
 * fields and the #BB86FC accent. The mockups are meant to be recognisable as
 * the real app, not a mood board.
 */
export const A = {
	accent: "#BB86FC",
	screen: "#000000",
	card: "#1C1C1E",
	field: "#2C2C2E",
	text: "#FFFFFF",
	muted: "#8E8E93",
	separator: "#38383A",
	chevron: "#636366",
	danger: "#FF3B30",
	success: "#34C759",
};

/* ──────────────────────────  Shared pieces  ────────────────────────── */

export const NavBar = ({
	title,
	back,
	right,
}: {
	title?: string;
	back?: string;
	right?: React.ReactNode;
}) => (
	<div className="flex items-center gap-2 px-4 pt-3 pb-2 shrink-0">
		{back && (
			<div className="flex items-center gap-0.5 text-[13px] text-accent">
				<ChevronLeft className="w-5 h-5" />
				<span>{back}</span>
			</div>
		)}
		{title && (
			<div className="text-[15px] font-semibold text-white truncate">
				{title}
			</div>
		)}
		<div className="ml-auto flex items-center gap-3 text-zinc-400">{right}</div>
	</div>
);

export const LargeTitle = ({ children }: { children: React.ReactNode }) => (
	<div className="px-4 pt-1 pb-3 text-[26px] font-bold text-white tracking-tight">
		{children}
	</div>
);

export const SearchField = ({
	placeholder,
	active,
}: {
	placeholder: string;
	active?: boolean;
}) => (
	<div
		className={cn(
			"mx-4 flex items-center gap-2 rounded-xl px-3 h-9 text-[13px] bg-[#2C2C2E]",
			active && "ring-1 ring-accent/60",
		)}
	>
		<Search className="w-4 h-4 text-[#9E9EA4] shrink-0" />
		<span className="text-[#9E9EA4] truncate">{placeholder}</span>
	</div>
);

export const SectionLabel = ({ children }: { children: React.ReactNode }) => (
	<div className="px-4 pt-4 pb-1.5 text-[10px] font-semibold tracking-[0.08em] uppercase text-[#9E9EA4]">
		{children}
	</div>
);

export const GroupCard = ({ children }: { children: React.ReactNode }) => (
	<div className="mx-4 rounded-xl overflow-hidden bg-[#1C1C1E]">{children}</div>
);

export const GroupRow = ({
	icon,
	label,
	value,
	danger,
}: {
	icon?: React.ReactNode;
	label: string;
	value?: string;
	danger?: boolean;
}) => (
	<div className="flex items-center gap-3 px-3 h-11 border-b border-[#38383A] last:border-0">
		{icon && <span className="shrink-0 w-5 flex justify-center">{icon}</span>}
		<span
			className={cn(
				"text-[14px] flex-1 truncate",
				danger ? "text-[#FF3B30]" : "text-white",
			)}
		>
			{label}
		</span>
		{value && <span className="text-[14px] text-[#9E9EA4]">{value}</span>}
		<ChevronRight className="w-4 h-4 text-[#636366] shrink-0" />
	</div>
);

export const NoteRow = ({
	title,
	preview,
	date,
	locked,
	pinned,
	task,
	badge,
}: {
	title: string;
	preview?: string;
	date?: string;
	locked?: boolean;
	pinned?: boolean;
	task?: boolean;
	badge?: string;
}) => (
	<div className="px-4 py-2.5 border-b border-[#38383A] last:border-0">
		<div className="flex items-center gap-1.5">
			{pinned && <Pin className="w-3 h-3 text-[#9E9EA4] shrink-0" />}
			{locked && <Lock className="w-3.5 h-3.5 text-[#BB86FC] shrink-0" />}
			{task && <CheckCircle2 className="w-3.5 h-3.5 text-[#9E9EA4] shrink-0" />}
			<span
				className={cn(
					"text-[15px] font-semibold tracking-tight truncate",
					locked ? "text-[#BB86FC]" : "text-white",
				)}
			>
				{title}
			</span>
			{badge && (
				<span className="ml-auto shrink-0 text-[10px] font-semibold text-purple-300 bg-accent/15 rounded-full px-1.5 py-0.5">
					{badge}
				</span>
			)}
		</div>
		{preview && (
			<p className="mt-0.5 text-[12.5px] text-zinc-400 truncate">{preview}</p>
		)}
		{date && <p className="mt-0.5 text-[11px] text-[#8E8E93]">{date}</p>}
	</div>
);

export const GlassBar = ({ children }: { children: React.ReactNode }) => (
	<div className="mt-auto flex items-center justify-between px-5 py-3 bg-white/[0.07] backdrop-blur-md border-t border-white/10 text-zinc-200">
		{children}
	</div>
);

export const ModeChip = ({
	label,
	active,
	icon: Icon,
}: {
	label: string;
	active?: boolean;
	icon?: any;
}) => (
	<div
		className={cn(
			"flex items-center gap-1.5 rounded-full px-3 h-7 text-[12px] font-semibold whitespace-nowrap",
			active ? "bg-accent text-[#1a1030]" : "bg-[#2C2C2E] text-zinc-400",
		)}
	>
		{Icon && <Icon className="w-3.5 h-3.5" />}
		{label}
	</div>
);

export const TagChip = ({ label }: { label: string }) => (
	<span className="text-[9.5px] font-bold uppercase tracking-wide text-[#BB86FC] bg-accent/15 rounded-md px-1.5 py-0.5">
		{label}
	</span>
);

export const SizeChip = ({ label }: { label: string }) => (
	<span className="text-[9.5px] font-semibold text-zinc-400 bg-[#2C2C2E] rounded-md px-1.5 py-0.5">
		{label}
	</span>
);

/* ──────────────────────────  The screens  ────────────────────────── */

/** The Folders screen — the app's first screen. */
export const ScreenFolders = () => (
	<div className="h-full w-full bg-black flex flex-col overflow-hidden">
		<NavBar right={<Cog className="w-5 h-5" style={{ color: A.accent }} />} />
		<LargeTitle>Folders</LargeTitle>
		<SearchField placeholder="Search" />

		<SectionLabel>On my device</SectionLabel>
		<GroupCard>
			<GroupRow
				icon={<Folder className="w-5 h-5" style={{ color: A.accent }} />}
				label="Notes"
				value="12"
			/>
			<GroupRow
				icon={<FolderOpen className="w-5 h-5" style={{ color: A.accent }} />}
				label="Work"
				value="8"
			/>
			<GroupRow
				icon={<Folder className="w-5 h-5" style={{ color: A.accent }} />}
				label="Journal"
				value="3"
			/>
		</GroupCard>

		<div className="mt-2">
			<GroupRow
				icon={<ListTodo className="w-5 h-5" style={{ color: A.accent }} />}
				label="Tasks"
				value="4 open"
			/>
			<GroupRow
				icon={<Trash2 className="w-5 h-5" style={{ color: A.accent }} />}
				label="Recently Deleted"
				value="2"
			/>
		</div>

		<GlassBar>
			<FolderPlus className="w-6 h-6" />
			<span className="text-[13px] font-medium">3 Folders</span>
			<SquarePen className="w-6 h-6" />
		</GlassBar>
	</div>
);

/** The editor, with the slash command menu open. */
export const ScreenEditor = () => (
	<div className="h-full w-full bg-black flex flex-col overflow-hidden">
		<NavBar
			back="Notes"
			right={
				<>
					<CheckCircle2 className="w-4 h-4 text-[#9E9EA4]" />
					<span className="text-[12px] text-[#9E9EA4]">1/3</span>
					<EllipsisVertical className="w-5 h-5" />
				</>
			}
		/>

		<div className="px-4 pt-1 flex-1 overflow-hidden">
			<h1 className="text-[22px] font-bold text-white tracking-tight">
				Kyoto trip plan
			</h1>
			<div className="mt-3 space-y-1.5">
				<p className="text-[13px] text-zinc-300 leading-relaxed">
					Fushimi Inari early, before the crowds.
				</p>
				<p className="text-[13px] text-zinc-400 leading-relaxed">
					Arashiyama bamboo grove after lunch.
				</p>
				<div className="rounded-lg border-l-2 border-accent bg-accent/10 px-2.5 py-1.5">
					<p className="text-[12px] text-purple-300 font-semibold">Note</p>
					<p className="text-[12px] text-zinc-300">
						Matcha stand closes at 5pm.
					</p>
				</div>
				<p className="text-[13px] text-[#9E9EA4] leading-relaxed">
					<span className="text-sky-300">📅 2026-04-12</span>{" "}
					<span className="text-zinc-400">⏰ 09:00</span>
				</p>
			</div>
		</div>

		{/* Slash command menu */}
		<div className="mx-2 mb-1 rounded-xl bg-[#1C1C1E] border border-white/10 overflow-hidden">
			<div className="grid grid-cols-2 gap-x-1 p-1.5">
				{[
					{ label: "Heading 1", icon: Heading1 },
					{ label: "Bulleted list", icon: List },
					{ label: "Checklist", icon: CheckCircle2 },
					{ label: "Callout", icon: Sparkles },
					{ label: "Table", icon: ListOrdered },
					{ label: "Code block", icon: Code },
				].map((item) => (
					<div
						key={item.label}
						className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11.5px] text-zinc-300"
					>
						<item.icon className="w-3.5 h-3.5 text-[#9E9EA4]" />
						{item.label}
					</div>
				))}
			</div>
		</div>

		{/* Formatting toolbar */}
		<div className="flex items-center gap-1 px-2 py-2 bg-[#1C1C1E] border-t border-white/10 overflow-hidden">
			<Undo2 className="w-4 h-4 text-[#8E8E93] shrink-0" />
			<Redo2 className="w-4 h-4 text-[#8E8E93] shrink-0" />
			<span className="w-px h-5 bg-white/10 mx-0.5 shrink-0" />
			<Sparkles className="w-4 h-4 text-accent shrink-0" />
			<span className="w-px h-5 bg-white/10 mx-0.5 shrink-0" />
			<Paperclip className="w-4 h-4 text-zinc-400 shrink-0" />
			<Brush className="w-4 h-4 text-zinc-400 shrink-0" />
			<span className="w-px h-5 bg-white/10 mx-0.5 shrink-0" />
			<Bold className="w-4 h-4 text-zinc-400 shrink-0" />
			<Italic className="w-4 h-4 text-zinc-400 shrink-0" />
			<Underline className="w-4 h-4 text-zinc-400 shrink-0" />
			<Strikethrough className="w-4 h-4 text-zinc-400 shrink-0" />
			<span className="w-px h-5 bg-white/10 mx-0.5 shrink-0" />
			<Hash className="w-4 h-4 text-zinc-400 shrink-0" />
			<List className="w-4 h-4 text-zinc-400 shrink-0" />
			<Quote className="w-4 h-4 text-zinc-400 shrink-0" />
			<Code className="w-4 h-4 text-zinc-400 shrink-0" />
			<Link2 className="w-4 h-4 text-zinc-400 shrink-0" />
			<Minus className="w-4 h-4 text-zinc-400 shrink-0" />
		</div>
	</div>
);

/** A locked note, with the PIN sheet asking for the key. */
export const ScreenLock = () => (
	<div className="h-full w-full bg-black flex flex-col overflow-hidden">
		<NavBar back="Notes" right={<EllipsisVertical className="w-5 h-5" />} />

		<div className="px-4 pt-1 flex-1 overflow-hidden">
			<GroupCard>
				<NoteRow title="Locked Note" date="Yesterday" locked />
				<NoteRow
					title="Reading list"
					preview="Six books for the winter, and the order to read them in."
					date="Tuesday"
				/>
				<NoteRow
					title="Roof repair quote"
					preview="Called him back — he can do it Thursday morning."
					date="10/18/26"
				/>
			</GroupCard>
		</div>

		{/* The sheet */}
		<div className="px-3 pb-3">
			<div className="rounded-2xl bg-[#1C1C1E] border border-white/10 p-4">
				<div className="flex items-center gap-2">
					<KeyRound className="w-4 h-4 text-accent" />
					<span className="text-[14px] font-semibold text-white">
						Lock note
					</span>
				</div>
				<p className="mt-1.5 text-[11.5px] text-zinc-400 leading-relaxed">
					Your PIN is the key. It is not stored anywhere, so a forgotten
					PIN means the note cannot be read.
				</p>

				<div className="mt-3.5 flex justify-center gap-2.5">
					{[0, 1, 2, 3, 4, 5].map((i) => (
						<span
							key={i}
							className={cn(
								"h-3 w-3 rounded-full",
								i < 4 ? "bg-accent" : "bg-white/15",
							)}
						></span>
					))}
				</div>

				<div className="mt-4 flex items-center gap-1.5 text-[10.5px] text-[#9E9EA4]">
					<Shield className="w-3 h-3" />
					PBKDF2-HMAC-SHA256 · 210,000 rounds
				</div>
			</div>
		</div>
	</div>
);

/** The Search screen, with the mode chips. */
export const ScreenSearch = () => (
	<div className="h-full w-full bg-black flex flex-col overflow-hidden">
		<NavBar
			back="Folders"
			title="Search"
			right={<SlidersHorizontal className="w-[18px] h-[18px]" />}
		/>

		<div className="px-4 pt-1">
			<SearchField placeholder="Search by meaning" active />
		</div>

		<div className="flex gap-1.5 px-4 mt-2.5">
			<ModeChip label="Text" />
			<ModeChip label="By meaning" active icon={Brain} />
			<ModeChip label="In images" icon={Images} />
		</div>

		<div className="px-4 mt-2.5 flex items-center gap-1.5 text-[10.5px] text-[#9E9EA4]">
			<span>Search by meaning</span>
			<span className="text-zinc-700">·</span>
			<span>All-MiniLM-L6-v2</span>
			<span className="text-zinc-700">·</span>
			<span className="text-accent">Selected</span>
			<ChevronRight className="w-3 h-3" />
		</div>

		<div className="mt-3 flex-1 overflow-hidden">
			<GroupCard>
				<NoteRow
					title="Notes on the offline-first idea"
					preview="A local-first tool owns the file, not the account..."
					date="10:42 AM"
					badge="92%"
				/>
				<NoteRow
					title="Why I keep a paper notebook"
					preview="It cannot be synced, which is the point..."
					date="Yesterday"
					badge="81%"
				/>
				<NoteRow
					title="Backup strategy"
					preview="Copy the folder. That is the whole backup."
					date="Tuesday"
					badge="74%"
				/>
			</GroupCard>
		</div>
	</div>
);

/** The Tasks screen, grouped by date. */
export const ScreenTasks = () => (
	<div className="h-full w-full bg-black flex flex-col overflow-hidden">
		<NavBar
			back="Folders"
			title="Tasks"
			right={<span className="text-[13px] text-accent">Hide done</span>}
		/>

		<div className="px-4 pt-1 flex items-center gap-2">
			<span className="text-[12px] text-[#9E9EA4]">4 open · 1 overdue</span>
			<div className="ml-auto flex rounded-lg overflow-hidden text-[11px] font-semibold">
				<span className="px-2.5 py-1 bg-accent text-[#1a1030]">By date</span>
				<span className="px-2.5 py-1 bg-[#2C2C2E] text-zinc-400">By note</span>
			</div>
		</div>

		<div className="mt-3 flex-1 overflow-hidden">
			<div className="flex items-center gap-2 px-4 pb-1.5">
				<span className="text-[10px] font-bold tracking-[0.08em] uppercase text-[#FF3B30]">
					Overdue
				</span>
				<span className="text-[10px] font-bold text-[#FF3B30]">1</span>
			</div>
			<div className="px-4 pb-2 flex items-start gap-2.5">
				<Circle className="w-[18px] h-[18px] text-[#8E8E93] shrink-0 mt-px" />
				<div className="flex-1">
					<p className="text-[13px] text-white leading-snug">
						Send the deposit receipt
					</p>
					<p className="text-[11px] text-[#9E9EA4]">Landlord</p>
				</div>
				<span className="text-[11px] text-[#FF3B30] shrink-0">Oct 18</span>
			</div>

			<div className="flex items-center gap-2 px-4 pt-2 pb-1.5">
				<span className="text-[10px] font-bold tracking-[0.08em] uppercase text-[#9E9EA4]">
					Today
				</span>
				<span className="text-[10px] font-bold text-[#9E9EA4]">2</span>
			</div>
			<div className="px-4 pb-1.5 flex items-start gap-2.5">
				<Circle className="w-[18px] h-[18px] text-[#8E8E93] shrink-0 mt-px" />
				<div className="flex-1">
					<p className="text-[13px] text-white leading-snug">
						Renew the passport
					</p>
					<p className="text-[11px] text-[#9E9EA4]">Travel admin</p>
				</div>
				<div className="flex items-center gap-1 shrink-0">
					<Bell className="w-3.5 h-3.5 text-[#9E9EA4]" />
					<span className="text-[11px] text-zinc-400">09:00</span>
				</div>
			</div>
			<div className="px-4 pb-2 flex items-start gap-2.5">
				<Circle className="w-[18px] h-[18px] text-[#8E8E93] shrink-0 mt-px" />
				<div className="flex-1">
					<p className="text-[13px] text-white leading-snug">
						Book the ryokan
					</p>
					<p className="text-[11px] text-[#9E9EA4]">Kyoto trip plan</p>
				</div>
				<CalendarDays className="w-3.5 h-3.5 text-[#9E9EA4] shrink-0" />
			</div>

			<div className="flex items-center gap-2 px-4 pt-2 pb-1.5">
				<span className="text-[10px] font-bold tracking-[0.08em] uppercase text-[#9E9EA4]">
					Next 7 days
				</span>
				<span className="text-[10px] font-bold text-[#9E9EA4]">1</span>
			</div>
			<div className="px-4 flex items-start gap-2.5">
				<CheckCircle2 className="w-[18px] h-[18px] text-accent shrink-0 mt-px" />
				<div className="flex-1">
					<p className="text-[13px] text-[#9E9EA4] leading-snug line-through">
						Water the plants
					</p>
					<p className="text-[11px] text-[#8E8E93]">Home</p>
				</div>
			</div>
		</div>

		<GlassBar>
			<span className="text-[12px] text-[#9E9EA4]">4 tasks</span>
			<SquarePen className="w-6 h-6" />
		</GlassBar>
	</div>
);

/** The AI Models screen, with the real catalog. */
export const ScreenAI = () => (
	<div className="h-full w-full bg-black flex flex-col overflow-hidden">
		<NavBar back="Settings" title="AI Models" />

		<div className="px-4 pt-1 flex rounded-lg overflow-hidden text-[12px] font-semibold">
			<span className="flex-1 text-center py-1.5 bg-accent text-[#1a1030]">
				Downloaded
			</span>
			<span className="flex-1 text-center py-1.5 bg-[#2C2C2E] text-zinc-400">
				Available
			</span>
		</div>

		<div className="flex gap-1.5 px-4 mt-2.5 overflow-hidden">
			<ModeChip label="All" active />
			<ModeChip label="Text" />
			<ModeChip label="Transcription" />
			<ModeChip label="Embeddings" />
			<ModeChip label="Images" />
		</div>

		<div className="mt-3 flex-1 overflow-hidden">
			<div className="px-4 pb-1.5 text-[10px] font-bold tracking-[0.08em] uppercase text-[#9E9EA4]">
				Text models
			</div>
			<GroupCard>
				<div className="px-3 py-2.5 border-b border-[#38383A]">
					<div className="flex items-center gap-1.5">
						<span className="text-[13.5px] font-semibold text-white">
							Gemma 4 E2B
						</span>
						<span className="ml-auto text-[9.5px] font-bold uppercase text-[#BB86FC] bg-accent/20 rounded-full px-1.5 py-0.5">
							Active
						</span>
					</div>
					<div className="mt-1.5 flex items-center gap-1.5">
						<SizeChip label="2B" />
						<span className="text-[10.5px] text-[#8E8E93]">
							Powers Write and AI Chat
						</span>
					</div>
				</div>
				<div className="px-3 py-2.5 border-b border-[#38383A]">
					<div className="flex items-center gap-1.5">
						<span className="text-[13.5px] font-semibold text-white">
							Qwen 3 1.7B
						</span>
						<span className="ml-auto text-[9.5px] font-bold uppercase text-purple-300 bg-accent/15 rounded-full px-2 py-0.5">
							Use
						</span>
					</div>
					<div className="mt-1.5 flex items-center gap-1.5">
						<SizeChip label="1.7B" />
					</div>
				</div>
			</GroupCard>

			<div className="px-4 pt-3 pb-1.5 text-[10px] font-bold tracking-[0.08em] uppercase text-[#9E9EA4]">
				Transcription
			</div>
			<GroupCard>
				<div className="px-3 py-2.5 border-b border-[#38383A]">
					<div className="flex items-center gap-1.5">
						<span className="text-[13.5px] font-semibold text-white">
							Whisper Tiny (English)
						</span>
						<Check className="ml-auto w-3.5 h-3.5 text-[#34C759]" />
					</div>
					<div className="mt-1.5 flex items-center gap-1.5">
						<TagChip label="Whisper" />
						<SizeChip label="57 MB" />
					</div>
				</div>
				<div className="px-3 py-2.5">
					<div className="flex items-center gap-1.5">
						<span className="text-[13.5px] font-semibold text-white">
							All-MiniLM-L6-v2
						</span>
						<Check className="ml-auto w-3.5 h-3.5 text-[#34C759]" />
					</div>
					<div className="mt-1.5 flex items-center gap-1.5">
						<TagChip label="Embeddings" />
						<SizeChip label="80 MB" />
					</div>
				</div>
			</GroupCard>

			<div className="px-4 pt-3 pb-1.5 text-[10px] font-bold tracking-[0.08em] uppercase text-[#9E9EA4]">
				Image generation
			</div>
			<GroupCard>
				<div className="px-3 py-2.5">
					<div className="flex items-center gap-1.5">
						<span className="text-[13.5px] font-semibold text-white">
							SDXS 512 (DreamShaper)
						</span>
						<Download className="ml-auto w-3.5 h-3.5 text-accent" />
					</div>
					<div className="mt-1.5 flex items-center gap-1.5">
						<TagChip label="Diffusion" />
						<SizeChip label="1 step" />
						<SizeChip label="1.6 GB" />
					</div>
				</div>
			</GroupCard>
		</div>
	</div>
);
