import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
	Search,
	Lock,
	Cog,
	Trash2,
	SquareCheck,
	Square,
	FileText,
	FolderPlus,
	SquarePen,
	MessageSquare,
	EllipsisVertical,
	ChevronRight,
	ChevronLeft,
	SlidersHorizontal,
	CheckCircle2,
	CircleCheck,
	Calendar,
	Undo2,
	Redo2,
	Paperclip,
	Brush,
	Bold,
	Italic,
	Underline,
	Heading1,
	Sparkles,
	Brain,
	Images,
	AlertCircle,
	Table,
	Code,
	List,
	Cpu,
	CloudDownload,
	Star,
	Lightbulb,
	Plus,
	PencilLine,
} from "lucide-react";

export function cn(...inputs: (string | undefined | null | false)[]) {
	return twMerge(clsx(inputs));
}

/*
 * The palette below is the app's own dark theme, read from `themes/theme.ts`
 * and the screen palette in `getScreenPalette()`, and matched against
 * screenshots of the running app.
 *
 * Two muted greys exist in the app and they are not interchangeable: the
 * iOS-style screens (folders, note list, search, AI models) use #8E8E93,
 * while the React-Native-Paper screens (editor, toolbar, tasks) use #AAAAAA.
 * The editor sits on #121212 and the toolbar on #1E1E1E — a different
 * palette from the black screens, exactly as in the app.
 */
export const A = {
	accent: "#BB86FC",
	accentWash: "rgba(187,134,252,0.12)",
	accentEdge: "rgba(187,134,252,0.50)",
	screen: "#000000",
	card: "#1C1C1E",
	field: "#2C2C2E",
	editorBg: "#121212",
	surface: "#1E1E1E",
	text: "#FFFFFF",
	muted: "#8E8E93",
	paper: "#AAAAAA",
	separator: "#38383A",
	divider: "#2C2C2C",
	chevron: "#636366",
	danger: "#FF3B30",
	success: "#34C759",
	warning: "#FF9500",
	glass: "rgba(28,28,30,0.72)",
};

/* ──────────────────────────  Shared pieces  ────────────────────────── */

const Screen = ({
	children,
	bg = A.screen,
}: {
	children: React.ReactNode;
	bg?: string;
}) => (
	<div
		className="h-full w-full flex flex-col overflow-hidden font-sans"
		style={{ backgroundColor: bg }}
	>
		{children}
	</div>
);

const NavHeader = ({
	left,
	title,
	right,
}: {
	left?: React.ReactNode;
	title?: string;
	right?: React.ReactNode;
}) => (
	<div className="flex items-center gap-1.5 px-2 pt-2.5 pb-1.5 shrink-0">
		<div className="flex items-center gap-0.5 min-w-0">{left}</div>
		{title && (
			<div className="flex-1 text-center text-[14px] font-semibold text-white tracking-tight truncate">
				{title}
			</div>
		)}
		{!title && <div className="flex-1" />}
		<div className="flex items-center gap-2.5 text-accent">{right}</div>
	</div>
);

/** The back chevron plus its label, as the app draws it. */
const Back = ({ label }: { label?: string }) => (
	<div className="flex items-center gap-0.5 text-accent">
		<ChevronLeft className="w-[22px] h-[22px]" strokeWidth={2.2} />
		{label && <span className="text-[14px] -ml-1">{label}</span>}
	</div>
);

/** The overflow menu: three dots in a circle. */
const Overflow = () => (
	<EllipsisVertical className="w-[19px] h-[19px] rotate-90" strokeWidth={2} />
);

const LargeTitle = ({ children }: { children: React.ReactNode }) => (
	<div className="px-5 pt-1 pb-2 text-[27px] font-bold text-white tracking-tight">
		{children}
	</div>
);

/** The folders screen has its own search field, not the Search screen's box. */
const FieldSearch = ({ placeholder }: { placeholder: string }) => (
	<div className="mx-4 flex items-center gap-2 rounded-xl bg-[#1C1C1E] px-3 h-[36px]">
		<Search className="w-[15px] h-[15px] text-[#8E8E93] shrink-0" />
		<span className="text-[13.5px] text-[#8E8E93] truncate">{placeholder}</span>
	</div>
);

/**
 * The Search screen's box: a bordered field that turns accent when focused.
 * The note list uses the same box with the two AI mode buttons inside it.
 */
const BoxSearch = ({
	placeholder,
	focused,
	modes,
}: {
	placeholder: string;
	focused?: boolean;
	modes?: boolean;
}) => (
	<div
		className="mx-4 flex items-center gap-2 rounded-[10px] border bg-[#1C1C1E] px-3 h-[38px]"
		style={{ borderColor: focused ? A.accent : A.separator }}
	>
		<Search className="w-[15px] h-[15px] text-[#8E8E93] shrink-0" />
		<span className="text-[13px] text-[#8E8E93] truncate flex-1">
			{placeholder}
		</span>
		{modes && (
			<>
				<Brain className="w-[15px] h-[15px] text-[#8E8E93] shrink-0" />
				<Images className="w-[15px] h-[15px] text-[#8E8E93] shrink-0" />
			</>
		)}
	</div>
);

/** The iOS-style section label: 13 / 600 / letterSpacing 0.5, already uppercase. */
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
	<div className="px-5 pt-4 pb-1.5 text-[10px] font-semibold tracking-[0.6px] text-[#8E8E93]">
		{children}
	</div>
);

const Hairline = ({ inset = 0 }: { inset?: number }) => (
	<div className="h-px bg-[#38383A]" style={{ marginLeft: inset }}></div>
);

/**
 * A row inside its own rounded card. The Folders screen gives every row a
 * card of its own — Notes, Tasks and Recently Deleted each sit in one.
 */
const Card = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<div
		className={cn(
			"mx-4 rounded-xl overflow-hidden bg-[#1C1C1E]",
			className,
		)}
	>
		{children}
	</div>
);

/** Icon, name, count, chevron — the shape of every row on the Folders screen. */
const ListRow = ({
	icon,
	name,
	count,
}: {
	icon: React.ReactNode;
	name: string;
	count?: string;
}) => (
	<div className="flex items-center gap-3.5 pl-4 pr-3.5 h-[52px]">
		<span className="w-6 shrink-0 text-accent flex justify-center">{icon}</span>
		<span className="text-[15px] text-white tracking-[-0.15px] flex-1 truncate">
			{name}
		</span>
		{count && (
			<span className="text-[14px] text-[#8E8E93] tabular-nums">{count}</span>
		)}
		<ChevronRight className="w-[16px] h-[16px] text-[#636366] shrink-0 ml-1" />
	</div>
);

/**
 * A note card in a list: a 16.5/600 title, then a 14pt meta line holding the
 * date and the snippet. The notes of one section share a card, separated by
 * a hairline. A locked note shows a lock, the words "Locked Note" and a date
 * followed by an em dash, never any of its text.
 */
const NoteRow = ({
	title,
	date,
	snippet,
	locked,
	badge,
	image,
}: {
	title: string;
	date?: string;
	snippet?: string;
	locked?: boolean;
	badge?: string;
	image?: boolean;
}) => (
	<div className="px-4 pr-3.5 py-2.5 flex items-center gap-3">
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-1.5">
				{locked && (
					<Lock className="w-[13px] h-[13px] text-[#8E8E93] shrink-0" />
				)}
				<span className="text-[14.5px] font-semibold tracking-[-0.3px] text-white truncate">
					{title}
				</span>
			</div>
			<div className="flex items-center gap-1.5 mt-0.5">
				{date && (
					<span className="text-[11.5px] text-[#8E8E93] shrink-0 whitespace-nowrap">
						{date}
					</span>
				)}
				{snippet && (
					<span className="text-[11.5px] text-[#8E8E93] truncate">
						{snippet}
					</span>
				)}
				{badge && (
					<CheckCircle2 className="w-[13px] h-[13px] text-[#8E8E93] shrink-0 ml-auto" />
				)}
			</div>
		</div>
		{image && (
			<span className="h-[34px] w-[34px] rounded-lg bg-[#3a3a3c] shrink-0"></span>
		)}
	</div>
);

/** The glass bar the app puts at the bottom of its list screens. */
const GlassBar = ({
	left,
	centre,
	right,
}: {
	left?: React.ReactNode;
	centre?: string;
	right?: React.ReactNode;
}) => (
	<div
		className="mt-auto flex items-center justify-between px-5 py-2.5"
		style={{
			backgroundColor: A.glass,
			borderTopWidth: 1,
			borderTopColor: "rgba(255,255,255,0.18)",
		}}
	>
		<span className="w-6 text-accent">{left}</span>
		<span className="flex-1 text-center text-[11.5px] text-[#8E8E93]">{centre}</span>
		<span className="w-6 text-accent flex justify-end">{right}</span>
	</div>
);

const Pill = ({
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
			"flex items-center gap-1 rounded-full px-2.5 h-[26px] text-[11.5px] font-semibold whitespace-nowrap",
			active ? "bg-accent text-white" : "bg-[#2C2C2E] text-white",
		)}
	>
		{Icon && <Icon className="w-3 h-3" />}
		{label}
	</div>
);

/** The outlined chip row the AI Models screen uses. */
const OutlineChip = ({
	label,
	active,
}: {
	label: string;
	active?: boolean;
}) => (
	<div
		className={cn(
			"rounded-full px-3 h-[28px] flex items-center text-[12px] font-semibold whitespace-nowrap border",
			active
				? "border-accent bg-accent/10 text-accent"
				: "border-white/12 text-[#8E8E93]",
		)}
	>
		{label}
	</div>
);

/** A segmented control: Downloaded / Available, By date / By note. */
const Segmented = ({
	options,
	active,
	dark,
}: {
	options: string[];
	active?: number;
	dark?: boolean;
}) => (
	<div
		className="mx-4 flex gap-0.5 rounded-[9px] p-0.5"
		style={{ backgroundColor: dark ? A.card : A.field }}
	>
		{options.map((option, i) => (
			<div
				key={option}
				className={cn(
					"flex-1 text-center text-[12px] font-semibold rounded-[7px] py-[6px] px-2 whitespace-nowrap",
					i === (active ?? 0) ? "text-white" : "text-[#8E8E93]",
				)}
				style={{
					backgroundColor:
						i === (active ?? 0) ? (dark ? "#48484A" : A.card) : "transparent",
				}}
			>
				{option}
			</div>
		))}
	</div>
);

/* ──────────────────────────  The screens  ────────────────────────── */

/**
 * The Folders screen — the app's first screen. Every row is a card of its
 * own, the icons are the accent colour, and the bottom bar carries a
 * folder-plus, the count, and a new-note.
 */
export const ScreenFolders = () => (
	<Screen>
		<NavHeader right={<Cog className="w-[19px] h-[19px]" />} />
		<LargeTitle>Folders</LargeTitle>

		<FieldSearch placeholder="Search" />

		<SectionLabel>ON MY DEVICE</SectionLabel>

		<Card>
			<ListRow
				icon={<FileText className="w-[19px] h-[19px]" />}
				name="Notes"
				count="2"
			/>
		</Card>
		<Card className="mt-2.5">
			<ListRow
				icon={<SquareCheck className="w-[19px] h-[19px]" />}
				name="Tasks"
				count="2"
			/>
		</Card>
		<Card className="mt-2.5">
			<ListRow
				icon={<Trash2 className="w-[19px] h-[19px]" />}
				name="Recently Deleted"
				count="2"
			/>
		</Card>

		<GlassBar
			left={<FolderPlus className="w-[20px] h-[20px]" />}
			centre="1 Folder"
			right={<SquarePen className="w-[20px] h-[20px]" />}
		/>
	</Screen>
);

/**
 * The note list with the Unlock Note dialog over it. This is the moment the
 * app asks for the key: nothing about the note is shown until the PIN is
 * typed, and the PIN is the only copy of it that exists.
 */
export const ScreenLock = () => (
	<Screen>
		<NavHeader
			left={<Back label="Folders" />}
			right={<Overflow />}
		/>
		<LargeTitle>Notes</LargeTitle>

		<BoxSearch placeholder="Search" modes />

		<div className="px-5 pt-3 pb-1.5 text-[15px] font-bold text-white">
			Today
		</div>
		<Card>
			<NoteRow title="Locked Note" date="4:41 AM" snippet="—" locked />
		</Card>

		{/* The Unlock Note dialog */}
		<div className="absolute inset-0 flex items-center justify-center px-4">
			<div className="w-full rounded-2xl bg-[#141416] p-5">
				<h3 className="text-[19px] font-bold text-white text-center">
					Unlock Note
				</h3>
				<p className="mt-2.5 text-[12.5px] text-[#8E8E93] text-center">
					Enter your PIN to view this note.
				</p>
				<div className="mt-5 rounded-xl bg-[#1C1C1E] h-[42px] flex items-center justify-center text-[13px] tracking-[0.35em] text-[#8E8E93]">
					P I N
				</div>
				<div className="mt-4 flex gap-2.5">
					<div className="flex-1 rounded-xl bg-accent py-2.5 text-center text-[13.5px] font-semibold text-white">
						Cancel
					</div>
					<div className="flex-1 rounded-xl bg-[#1C1C1E] py-2.5 text-center text-[13.5px] font-semibold text-[#4A4A4E]">
						Unlock
					</div>
				</div>
			</div>
		</div>

		<GlassBar
			left={<MessageSquare className="w-[20px] h-[20px]" />}
			centre="2 notes"
			right={<SquarePen className="w-[20px] h-[20px]" />}
		/>
	</Screen>
);

/** The editor, with the slash command menu open. */
export const ScreenEditor = () => (
	<Screen bg={A.editorBg}>
		<NavHeader
			left={<Back label="Notes" />}
			right={<Overflow />}
		/>

		<div className="px-5 pt-3 flex-1 overflow-hidden">
			<h1 className="text-[26px] font-bold text-white tracking-tight">
				Title
			</h1>
			<p className="mt-3 text-[15px] text-[#8E8E93]">Start writing...</p>
			<div className="mt-4 space-y-1.5 text-[13.5px] leading-[1.45]">
				<p className="text-white">Fushimi Inari early, before the crowds.</p>
				<p className="text-white">Arashiyama bamboo grove after lunch.</p>
				{/* A callout: the type's own accent, a 3px edge and a 10% tint. */}
				<div
					className="rounded-md border-l-[3px] pl-2.5 pr-2.5 py-2 my-1"
					style={{
						borderLeftColor: "#4C8DFF",
						backgroundColor: "rgba(76,141,255,0.10)",
					}}
				>
					<div className="flex items-center gap-1.5 mb-1">
						<PencilLine className="w-[11px] h-[11px] text-[#4C8DFF]" />
						<p className="text-[11px] font-bold tracking-[0.3px] text-[#4C8DFF]">
							Note
						</p>
					</div>
					<p className="text-[12.5px] text-white">Matcha stand closes at 5pm.</p>
				</div>
			</div>
		</div>

		{/* The slash command menu, in the order the app lists it. */}
		<div
			className="mx-2 mb-1 rounded-xl overflow-hidden border-t"
			style={{ backgroundColor: A.surface, borderColor: A.divider }}
		>
			{[
				{ label: "Heading 1", icon: Heading1 },
				{ label: "Bulleted list", icon: List },
				{ label: "Checklist", icon: SquareCheck },
				{ label: "Callout", icon: AlertCircle },
				{ label: "Table", icon: Table },
				{ label: "Code block", icon: Code },
			].map((item) => (
				<div
					key={item.label}
					className="flex items-center gap-3 px-4 py-[9px]"
				>
					<item.icon className="w-[15px] h-[15px] text-accent shrink-0" />
					<span className="text-[13px] text-white">{item.label}</span>
				</div>
			))}
		</div>

		{/* The formatting toolbar, in the app's order. */}
		<div
			className="flex items-center gap-2 px-3 py-2.5 relative overflow-hidden"
			style={{
				backgroundColor: A.surface,
				borderTopWidth: 1,
				borderTopColor: A.divider,
			}}
		>
			<Undo2 className="w-[17px] h-[17px] text-[#3A3A3E] shrink-0" />
			<Redo2 className="w-[17px] h-[17px] text-[#3A3A3E] shrink-0" />
			<span className="w-px h-[16px] bg-[#2C2C2C] shrink-0" />
			<Sparkles className="w-[18px] h-[18px] text-white shrink-0" />
			<span className="w-px h-[16px] bg-[#2C2C2C] shrink-0" />
			<Paperclip className="w-[18px] h-[18px] text-white shrink-0" />
			<Brush className="w-[18px] h-[18px] text-white shrink-0" />
			<span className="w-px h-[16px] bg-[#2C2C2C] shrink-0" />
			<Bold className="w-[17px] h-[17px] text-white shrink-0" />
			<Italic className="w-[17px] h-[17px] text-white shrink-0" />
			<Underline className="w-[17px] h-[17px] text-white shrink-0" />
			<div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#1E1E1E] to-transparent"></div>
		</div>
	</Screen>
);

/** The Search screen, with the mode chips. */
export const ScreenSearch = () => (
	<Screen>
		<NavHeader
			left={<Back />}
			title="Search"
			right={<SlidersHorizontal className="w-[18px] h-[18px]" />}
		/>

		<BoxSearch placeholder="Search by meaning" focused />

		<div className="flex gap-2 px-4 mt-2.5">
			<Pill label="Text" />
			<Pill label="By meaning" active icon={Brain} />
			<Pill label="In images" icon={Images} />
		</div>

		<div className="flex items-center gap-1.5 px-4 mt-2.5 text-[10.5px] text-[#8E8E93] overflow-hidden whitespace-nowrap">
			<CircleCheck className="w-[13px] h-[13px] text-[#34C759] shrink-0" />
			<span>Search by meaning</span>
			<span className="text-[#38383A]">·</span>
			<span>All-MiniLM-L6-v2</span>
			<span className="text-[#38383A]">·</span>
			<span className="text-[#34C759]">Selected</span>
			<ChevronRight className="w-[13px] h-[13px] shrink-0" />
		</div>

		<div className="flex-1 overflow-hidden">
			<NoteRow
				title="Notes on the offline-first idea"
				date="10:42 AM"
				snippet="A local-first tool owns the file, not the account"
			/>
			<Hairline inset={16} />
			<NoteRow
				title="Why I keep a paper notebook"
				date="Yesterday"
				snippet="It cannot be synced, which is the point"
			/>
			<Hairline inset={16} />
			<NoteRow
				title="Backup strategy"
				date="Tuesday"
				snippet="Copy the folder. That is the whole backup."
			/>
		</div>
	</Screen>
);

/** The Tasks screen, grouped by date. */
export const ScreenTasks = () => (
	<Screen>
		<NavHeader
			left={<Back label="Folders" />}
			right={<span className="text-[14px] text-accent">Show done</span>}
		/>
		<LargeTitle>Tasks</LargeTitle>

		<div className="px-5 pb-2.5 text-[12.5px] text-[#AAAAAA]">2 open</div>

		<div className="self-start ml-5">
			<Segmented options={["By date", "By note"]} active={0} />
		</div>

		<div className="flex-1 overflow-hidden">
			{/* The section title, with its count pushed to the far right. */}
			<div className="flex items-center px-5 pt-4 pb-1.5">
				<span className="flex-1 text-[10.5px] font-bold tracking-[0.4px] text-[#8E8E93]">
					NO DATE
				</span>
				<span className="text-[10.5px] font-bold text-[#8E8E93]">2</span>
			</div>

			<Card>
				<div className="flex items-start gap-2.5 px-4 py-3">
					<Square className="w-[18px] h-[18px] text-white shrink-0 mt-px" strokeWidth={2.2} />
					<div className="flex-1 min-w-0">
						<p className="text-[14px] leading-[1.35] text-white">test</p>
						<p className="text-[11.5px] text-[#AAAAAA] mt-0.5">Testing</p>
					</div>
					<Calendar className="w-[15px] h-[15px] text-[#AAAAAA] shrink-0 mt-1" />
				</div>
				<Hairline inset={16} />
				<div className="flex items-start gap-2.5 px-4 py-3">
					<Square className="w-[18px] h-[18px] text-white shrink-0 mt-px" strokeWidth={2.2} />
					<div className="flex-1 min-w-0">
						<p className="text-[14px] leading-[1.35] text-white">test 2</p>
						<p className="text-[11.5px] text-[#AAAAAA] mt-0.5">Testing</p>
					</div>
					<Calendar className="w-[15px] h-[15px] text-[#AAAAAA] shrink-0 mt-1" />
				</div>
			</Card>
		</div>
	</Screen>
);

/** The AI Models screen, with the real catalog. */
export const ScreenAI = () => (
	<Screen>
		<NavHeader left={<Back label="Settings" />} />
		<LargeTitle>AI Models</LargeTitle>

		<Segmented options={["Downloaded", "Available"]} active={0} dark />

		{/* The category chips scroll, exactly as they do in the app. */}
		<div className="relative mt-3">
			<div className="flex gap-2 px-4 overflow-hidden">
				<OutlineChip label="All" active />
				<OutlineChip label="Text" />
				<OutlineChip label="Transcription" />
				<OutlineChip label="Embeddings" />
			</div>
			<div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black to-transparent"></div>
		</div>

		<div className="flex-1 overflow-hidden">
			<SectionLabel>TEXT MODELS</SectionLabel>
			<Card>
				<div className="px-4 py-3 flex items-start gap-3">
					<div className="flex-1 min-w-0">
						<div className="text-[15px] font-bold text-white truncate">
							Qwen 3 1.7B
						</div>
						<div className="flex items-center gap-2.5 mt-2 flex-wrap">
							<span className="flex items-center gap-1 text-[10.5px] text-white">
								<Cpu className="w-[11px] h-[11px]" />
								1.70 B
							</span>
							<span className="flex items-center gap-1 text-[10.5px] text-white">
								<CloudDownload className="w-[11px] h-[11px]" />
								2.20 GB
							</span>
							<span className="flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[10.5px] font-semibold text-accent">
								<Star className="w-[10px] h-[10px] fill-accent" />
								Featured
							</span>
						</div>
						<div className="flex items-center gap-2 mt-1.5">
							<span className="flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[10.5px] font-semibold text-accent">
								<Lightbulb className="w-[10px] h-[10px] fill-accent" />
								Reasoning
							</span>
							<span className="rounded-full bg-accent px-2 py-0.5 text-[10.5px] font-semibold text-white">
								Active
							</span>
						</div>
					</div>
					<div className="shrink-0 flex items-center gap-2.5 mt-1">
						<CircleCheck className="w-[19px] h-[19px] text-accent" />
						<Trash2 className="w-[17px] h-[17px] text-[#FF3B30]" />
					</div>
				</div>
				<Hairline inset={16} />
				<div className="px-4 py-3 flex items-start gap-3">
					<div className="flex-1 min-w-0">
						<div className="text-[15px] font-bold text-white truncate">
							Qwen 3 0.6B
						</div>
						<div className="flex items-center gap-2.5 mt-2 flex-wrap">
							<span className="flex items-center gap-1 text-[10.5px] text-white">
								<Cpu className="w-[11px] h-[11px]" />
								0.60 B
							</span>
							<span className="flex items-center gap-1 text-[10.5px] text-white">
								<CloudDownload className="w-[11px] h-[11px]" />
								0.90 GB
							</span>
							<span className="flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[10.5px] font-semibold text-accent">
								<Lightbulb className="w-[10px] h-[10px] fill-accent" />
								Reasoning
							</span>
						</div>
					</div>
					<Trash2 className="w-[17px] h-[17px] text-[#FF3B30] shrink-0 mt-1" />
				</div>
			</Card>
			<div className="px-5 pt-2 text-[11.5px] text-[#8E8E93] leading-snug">
				Powers the Write tab and AI Chat — text models answer entirely on
				this device.
			</div>
		</div>

		<GlassBar centre="2 of 22 models" right={<Plus className="w-[20px] h-[20px]" />} />
	</Screen>
);
