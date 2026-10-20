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
	FileText,
	ChevronRight,
	ChevronLeft,
	SlidersHorizontal,
	CheckCircle2,
	CircleCheck,
	Circle,
	SquareCheck,
	Pin,
	Bell,
	Calendar,
	Undo2,
	Redo2,
	Paperclip,
	PencilLine,
	Brush,
	Bold,
	Italic,
	Underline,
	Strikethrough,
	Heading1,
	Heading2,
	Heading3,
	List,
	Code,
	Sparkles,
	Brain,
	Images,
	Image as ImageIcon,
	Ellipsis,
	SquarePen,
	Download,
	AlertCircle,
	Table,
	Mic,
	Cpu,
	Plus,
	MessageSquare,
} from "lucide-react";

export function cn(...inputs: (string | undefined | null | false)[]) {
	return twMerge(clsx(inputs));
}

/*
 * The palette below is the app's own dark theme, read from `themes/theme.ts`
 * and the screen palette in `getScreenPalette()`.
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

const LargeTitle = ({ children }: { children: React.ReactNode }) => (
	<div className="px-5 pt-1 pb-2 text-[27px] font-bold text-white tracking-tight">
		{children}
	</div>
);

/** The folders screen has its own search field, not the Search screen's box. */
const FieldSearch = ({ placeholder }: { placeholder: string }) => (
	<div className="mx-4 flex items-center gap-1.5 rounded-xl bg-[#1C1C1E] px-2.5 h-[34px]">
		<Search className="w-[15px] h-[15px] text-[#8E8E93] shrink-0" />
		<span className="text-[13px] text-[#8E8E93] truncate">{placeholder}</span>
	</div>
);

/** The Search screen's box: a bordered field that turns accent when focused. */
const BoxSearch = ({
	placeholder,
	focused,
}: {
	placeholder: string;
	focused?: boolean;
}) => (
	<div
		className="mx-4 flex items-center gap-2 rounded-[10px] border bg-[#1C1C1E] px-2.5 h-[38px]"
		style={{ borderColor: focused ? A.accent : A.separator }}
	>
		<Search className="w-[15px] h-[15px] text-[#8E8E93] shrink-0" />
		<span className="text-[12.5px] text-[#8E8E93] truncate">{placeholder}</span>
	</div>
);

/** The iOS-style section label: 13 / 600 / letterSpacing 0.5, already uppercase. */
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
	<div className="px-5 pt-4 pb-1.5 text-[10px] font-semibold tracking-[0.6px] text-[#8E8E93]">
		{children}
	</div>
);

const GroupCard = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => (
	<div
		className={cn("mx-4 rounded-xl overflow-hidden bg-[#1C1C1E]", className)}
	>
		{children}
	</div>
);

const Hairline = ({ inset = 0 }: { inset?: number }) => (
	<div
		className="h-px bg-[#38383A]"
		style={{ marginLeft: inset }}
	></div>
);

/** A row inside a grouped card: icon, name, count, chevron. */
const ListRow = ({
	icon,
	name,
	count,
	separatorInset = 0,
}: {
	icon: React.ReactNode;
	name: string;
	count?: string;
	separatorInset?: number;
}) => (
	<>
		<div className="flex items-center gap-3 pl-4 pr-3.5 min-h-[46px]">
			<span className="w-5 shrink-0 text-accent flex justify-center">{icon}</span>
			<span className="text-[14.5px] text-white tracking-[-0.15px] flex-1 truncate">
				{name}
			</span>
			{count && (
				<span className="text-[13.5px] text-[#8E8E93] mr-1 tabular-nums">
					{count}
				</span>
			)}
			<ChevronRight className="w-[16px] h-[16px] text-[#636366] shrink-0" />
		</div>
		{separatorInset > 0 && <Hairline inset={separatorInset} />}
	</>
);

/**
 * A note card in a list: a 16.5/600 title, then a 14pt meta line holding the
 * date and the snippet. The rows sit straight on the screen with a hairline
 * between them, the way the app draws them — there is no card behind them.
 * A locked note shows a lock, the words "Locked Note" and a date followed by
 * an em dash, never any of its text.
 */
const NoteRow = ({
	title,
	date,
	snippet,
	locked,
	pinned,
	badge,
	image,
}: {
	title: string;
	date?: string;
	snippet?: string;
	locked?: boolean;
	pinned?: boolean;
	badge?: string;
	image?: boolean;
}) => (
	<div className="px-5 pr-4 py-2.5">
		<div className="flex items-center gap-1.5">
			{locked && (
				<Lock className="w-[13px] h-[13px] text-[#8E8E93] shrink-0" />
			)}
			{pinned && <Pin className="w-[12px] h-[12px] text-[#8E8E93] shrink-0" />}
			<span className="text-[14px] font-semibold tracking-[-0.25px] text-white truncate">
				{title}
			</span>
			{badge && (
				<span className="ml-auto shrink-0 text-[9.5px] font-medium text-accent">
					{badge}
				</span>
			)}
		</div>
		<div className="flex items-center gap-1.5 mt-0.5">
			{date && (
				<span className="text-[11.5px] text-[#8E8E93] shrink-0 whitespace-nowrap">
					{date}
				</span>
			)}
			{snippet && (
				<span className="text-[11.5px] text-[#8E8E93] truncate">{snippet}</span>
			)}
			{image && (
				<span className="ml-auto h-[30px] w-[30px] rounded-lg bg-[#3a3a3c] shrink-0"></span>
			)}
		</div>
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
	icon: Icon,
}: {
	label: string;
	active?: boolean;
	icon?: any;
}) => (
	<div
		className={cn(
			"flex items-center gap-1 rounded-full px-2.5 h-[26px] text-[11.5px] font-semibold whitespace-nowrap border",
			active
				? "border-accent bg-accent/10 text-accent"
				: "border-[#38383A] text-[#8E8E93]",
		)}
	>
		{Icon && <Icon className="w-3 h-3" />}
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
					"flex-1 text-center text-[11.5px] font-semibold rounded-[7px] py-[5px] px-2 whitespace-nowrap",
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

/** A catalog row in the AI Models screen. */
const ModelRow = ({
	name,
	tag,
	tagIcon: TagIcon,
	steps,
	size,
	right,
}: {
	name: string;
	tag?: string;
	tagIcon?: any;
	steps?: string;
	size?: string;
	right?: React.ReactNode;
}) => (
	<div className="flex items-center gap-3 px-4 py-3">
		<div className="flex-1 min-w-0">
			<div className="text-[14px] tracking-[-0.2px] text-white truncate">{name}</div>
			<div className="flex items-center gap-2 mt-1.5 flex-wrap">
				{tag && (
					<span className="flex items-center gap-1 rounded-md bg-accent/10 px-1.5 py-0.5 text-[9.5px] font-medium text-accent">
						{TagIcon && <TagIcon className="w-[9px] h-[9px]" />}
						{tag}
					</span>
				)}
				{steps && (
					<span className="rounded-md bg-accent/10 px-1.5 py-0.5 text-[9.5px] font-medium text-accent">
						{steps}
					</span>
				)}
				{size && (
					<span className="text-[9.5px] font-medium text-[#8E8E93]">{size}</span>
				)}
			</div>
		</div>
		<div className="shrink-0 flex items-center gap-2">{right}</div>
	</div>
);

/* ──────────────────────────  The screens  ────────────────────────── */

/** The Folders screen — the app's first screen. */
export const ScreenFolders = () => (
	<Screen>
		<NavHeader right={<Cog className="w-[19px] h-[19px]" />} />
		<LargeTitle>Folders</LargeTitle>

		<FieldSearch placeholder="Search" />

		<SectionLabel>ON MY DEVICE</SectionLabel>
		<GroupCard>
			<ListRow
				icon={<FileText className="w-[19px] h-[19px]" />}
				name="Notes"
				count="12"
				separatorInset={14}
			/>
			<ListRow
				icon={<FolderOpen className="w-[19px] h-[19px]" />}
				name="Work"
				count="8"
				separatorInset={14}
			/>
			<ListRow
				icon={<Folder className="w-[19px] h-[19px]" />}
				name="Journal"
				count="3"
			/>
		</GroupCard>

		<GroupCard className="mt-4">
			<ListRow
				icon={<ListTodo className="w-[19px] h-[19px]" />}
				name="Tasks"
				count="4 open"
			/>
		</GroupCard>

		<GroupCard className="mt-4">
			<ListRow
				icon={<Trash2 className="w-[19px] h-[19px]" />}
				name="Recently Deleted"
				count="2"
			/>
		</GroupCard>

		<GlassBar
			left={<FolderPlus className="w-[20px] h-[20px]" />}
			centre="3 Folders"
			right={<SquarePen className="w-[20px] h-[20px]" />}
		/>
	</Screen>
);

/**
 * The note list, with a locked note in it. A locked note shows a lock, the
 * words "Locked Note" and a date followed by an em dash — nothing of what
 * it says.
 */
export const ScreenNotes = () => (
	<Screen>
		<NavHeader
			left={<Back label="Folders" />}
			right={<Ellipsis className="w-[20px] h-[20px]" />}
		/>
		<LargeTitle>Notes</LargeTitle>

		<BoxSearch placeholder="Search" />

		<div className="px-5 pt-2 pb-1 flex items-center gap-1.5">
			<Pin
				className="w-[12px] h-[12px] text-accent -rotate-[25deg]"
				strokeWidth={2.2}
			/>
			<span className="text-[14px] font-bold text-white">Pinned</span>
		</div>
		<NoteRow title="Locked Note" date="Yesterday" snippet="  —" locked />
		<Hairline inset={20} />

		<div className="px-5 pt-4 pb-1 text-[14px] font-bold text-white">Today</div>
		<NoteRow
			title="Kyoto trip plan"
			date="10:42 AM"
			snippet="Fushimi Inari before the crowds, then the bamboo grove."
		/>
		<Hairline inset={20} />
		<NoteRow
			title="Roof repair quote"
			date="9:15 AM"
			snippet="He can do it Thursday morning, cash or transfer."
		/>
		<Hairline inset={20} />

		<div className="px-5 pt-4 pb-1 text-[14px] font-bold text-white">Yesterday</div>
		<NoteRow
			title="Reading list"
			date="Yesterday"
			snippet="Six books for the winter, and the order to read them in."
			image
		/>
		<Hairline inset={20} />

		<GlassBar
			left={<MessageSquare className="w-[20px] h-[20px]" />}
			centre="12 notes"
			right={<SquarePen className="w-[20px] h-[20px]" />}
		/>
	</Screen>
);

/** The editor, with the slash command menu open. */
export const ScreenEditor = () => (
	<Screen bg={A.editorBg}>
		<NavHeader
			left={<Back label="Notes" />}
			right={
				<>
					<SquareCheck className="w-[12px] h-[12px] text-[#AAAAAA]" />
					<span className="text-[11px] text-[#AAAAAA]">1/3</span>
					<Ellipsis className="w-[19px] h-[19px]" />
				</>
			}
		/>

		<div className="px-5 pt-2 flex-1 overflow-hidden">
			<h1 className="text-[24px] font-bold text-white tracking-tight">
				Kyoto trip plan
			</h1>
			<div className="mt-3 space-y-1.5 text-[13px] leading-[1.45]">
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
						<p className="text-[10.5px] font-bold tracking-[0.3px] text-[#4C8DFF]">
							Note
						</p>
					</div>
					<p className="text-[12.5px] text-white">Matcha stand closes at 5pm.</p>
				</div>
				<p className="text-white">
					<span className="text-sky-300">📅 2026-04-12</span>{" "}
					<span>⏰ 09:00</span>
				</p>
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
			className="flex items-center gap-1 px-1.5 py-1.5 relative overflow-hidden"
			style={{ backgroundColor: A.surface, borderTopWidth: 1, borderTopColor: A.divider }}
		>
			<Undo2 className="w-[17px] h-[17px] text-[#AAAAAA] shrink-0" />
			<Redo2 className="w-[17px] h-[17px] text-[#AAAAAA] shrink-0" />
			<span className="w-px h-[14px] bg-[#2C2C2C] mx-1 shrink-0" />
			<Sparkles className="w-[17px] h-[17px] text-accent shrink-0" />
			<Paperclip className="w-[17px] h-[17px] text-[#AAAAAA] shrink-0" />
			<Brush className="w-[17px] h-[17px] text-[#AAAAAA] shrink-0" />
			<span className="w-px h-[14px] bg-[#2C2C2C] mx-1 shrink-0" />
			<Bold className="w-[17px] h-[17px] text-[#AAAAAA] shrink-0" />
			<Italic className="w-[17px] h-[17px] text-[#AAAAAA] shrink-0" />
			<Underline className="w-[17px] h-[17px] text-[#AAAAAA] shrink-0" />
			<Strikethrough className="w-[17px] h-[17px] text-[#AAAAAA] shrink-0" />
			<span className="w-px h-[14px] bg-[#2C2C2C] mx-1 shrink-0" />
			<Heading1 className="w-[17px] h-[17px] text-[#AAAAAA] shrink-0" />
			<Heading2 className="w-[17px] h-[17px] text-[#AAAAAA] shrink-0" />
			<Heading3 className="w-[17px] h-[17px] text-[#AAAAAA] shrink-0" />
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

		<div className="flex gap-2 px-4 mt-2">
			<Pill label="Text" />
			<Pill label="By meaning" active icon={Brain} />
			<Pill label="In images" icon={Images} />
		</div>

		<div className="flex items-center gap-1.5 px-4 mt-2 text-[10.5px] text-[#8E8E93] overflow-hidden whitespace-nowrap">
			<CircleCheck className="w-[13px] h-[13px] text-[#34C759] shrink-0" />
			<span>Search by meaning</span>
			<span className="text-[#38383A]">·</span>
			<span>All-MiniLM-L6-v2</span>
			<span className="text-[#38383A]">·</span>
			<span className="text-[#34C759]">Selected</span>
			<ChevronRight className="w-[13px] h-[13px] shrink-0" />
		</div>

		<div className="flex-1 overflow-hidden">
			<div className="px-5 py-2.5">
				<div className="flex items-center gap-1.5">
					<span className="text-[14px] font-semibold tracking-[-0.25px] text-white truncate">
						Notes on the offline-first idea
					</span>
					<span className="ml-auto text-[9.5px] font-medium text-accent">
						92%
					</span>
				</div>
				<div className="text-[11.5px] text-[#8E8E93] mt-0.5 truncate">
					10:42 AM A local-first tool owns the file, not the account
				</div>
			</div>
			<div className="h-px bg-[#38383A] ml-5" />
			<div className="px-5 py-2.5">
				<div className="flex items-center gap-1.5">
					<span className="text-[14px] font-semibold tracking-[-0.25px] text-white truncate">
						Why I keep a paper notebook
					</span>
					<span className="ml-auto text-[9.5px] font-medium text-accent">
						81%
					</span>
				</div>
				<div className="text-[11.5px] text-[#8E8E93] mt-0.5 truncate">
					Yesterday It cannot be synced, which is the point
				</div>
			</div>
			<div className="h-px bg-[#38383A] ml-5" />
			<div className="px-5 py-2.5">
				<div className="flex items-center gap-1.5">
					<span className="text-[14px] font-semibold tracking-[-0.25px] text-white truncate">
						Backup strategy
					</span>
					<span className="ml-auto text-[9.5px] font-medium text-accent">
						74%
					</span>
				</div>
				<div className="text-[11.5px] text-[#8E8E93] mt-0.5 truncate">
					Tuesday Copy the folder. That is the whole backup.
				</div>
			</div>
		</div>
	</Screen>
);

/** The Tasks screen, grouped by date. */
export const ScreenTasks = () => (
	<Screen>
		<NavHeader
			left={<Back label="Folders" />}
			right={<span className="text-[14px] text-accent">Hide done</span>}
		/>
		<LargeTitle>Tasks</LargeTitle>

		<div className="px-5 pb-2.5 text-[11.5px] text-[#AAAAAA]">
			4 open · 1 overdue
		</div>

		<div className="self-start ml-5">
			<Segmented options={["By date", "By note"]} active={0} />
		</div>

		<div className="flex-1 overflow-hidden">
			<div className="flex items-center gap-1.5 px-5 pt-4 pb-1.5">
				<span className="text-[10px] font-bold tracking-[0.4px] text-[#FF3B30]">
					OVERDUE
				</span>
				<span className="text-[10px] font-bold text-[#FF3B30]">1</span>
			</div>
			<div className="mx-4 rounded-xl overflow-hidden bg-[#1C1C1E]">
				<div className="flex items-start gap-2.5 px-4 py-2.5">
					<Circle className="w-[17px] h-[17px] text-[#AAAAAA] shrink-0 mt-px" />
					<div className="flex-1 min-w-0">
						<p className="text-[13.5px] leading-[1.35] text-white">
							Send the deposit receipt
						</p>
						<p className="text-[10.5px] text-[#AAAAAA] mt-0.5">Landlord</p>
					</div>
					<span className="text-[11px] text-[#FF3B30] shrink-0 mt-px">
						Oct 18
					</span>
				</div>
			</div>

			<div className="flex items-center gap-1.5 px-5 pt-4 pb-1.5">
				<span className="text-[10px] font-bold tracking-[0.4px] text-[#8E8E93]">
					TODAY
				</span>
				<span className="text-[10px] font-bold text-[#8E8E93]">2</span>
			</div>
			<div className="mx-4 rounded-xl overflow-hidden bg-[#1C1C1E]">
				<div className="flex items-start gap-2.5 px-4 py-2.5">
					<Circle className="w-[17px] h-[17px] text-[#AAAAAA] shrink-0 mt-px" />
					<div className="flex-1 min-w-0">
						<p className="text-[13.5px] leading-[1.35] text-white">
							Renew the passport
						</p>
						<p className="text-[10.5px] text-[#AAAAAA] mt-0.5">
							Travel admin
						</p>
					</div>
					<div className="flex items-center gap-1.5 shrink-0 mt-px">
						<Bell className="w-[11px] h-[11px] text-[#AAAAAA]" />
						<span className="text-[11px] text-[#AAAAAA]">09:00</span>
					</div>
				</div>
				<Hairline inset={16} />
				<div className="flex items-start gap-2.5 px-4 py-2.5">
					<Circle className="w-[17px] h-[17px] text-[#AAAAAA] shrink-0 mt-px" />
					<div className="flex-1 min-w-0">
						<p className="text-[13.5px] leading-[1.35] text-white">
							Book the ryokan
						</p>
						<p className="text-[10.5px] text-[#AAAAAA] mt-0.5">
							Kyoto trip plan
						</p>
					</div>
					<Calendar className="w-[14px] h-[14px] text-[#AAAAAA] shrink-0 mt-px" />
				</div>
			</div>

			<div className="flex items-center gap-1.5 px-5 pt-4 pb-1.5">
				<span className="text-[10px] font-bold tracking-[0.4px] text-[#8E8E93]">
					NEXT 7 DAYS
				</span>
				<span className="text-[10px] font-bold text-[#8E8E93]">1</span>
			</div>
			<div className="mx-4 rounded-xl overflow-hidden bg-[#1C1C1E]">
				<div className="flex items-start gap-2.5 px-4 py-2.5">
					<CheckCircle2 className="w-[17px] h-[17px] text-accent shrink-0 mt-px" />
					<div className="flex-1 min-w-0">
						<p className="text-[13.5px] leading-[1.35] text-[#AAAAAA] line-through">
							Water the plants
						</p>
						<p className="text-[10.5px] text-[#666666] mt-0.5">Home</p>
					</div>
				</div>
			</div>
		</div>

		<GlassBar
			centre="4 tasks"
			right={<SquarePen className="w-[20px] h-[20px]" />}
		/>
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
				<OutlineChip label="Images" />
			</div>
			<div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black to-transparent"></div>
		</div>

		<div className="flex-1 overflow-hidden">
			<SectionLabel>TEXT MODELS</SectionLabel>
			<GroupCard>
				<div className="flex items-center gap-3 px-4 py-3">
					<div className="flex-1 min-w-0">
						<div className="text-[14px] font-semibold text-white truncate">
							Gemma 4 E2B
						</div>
						<div className="flex items-center gap-1.5 mt-1.5">
							<span className="flex items-center gap-1 rounded-full bg-[#2C2C2E] px-2 py-0.5 text-[9.5px] font-medium text-[#AAAAAA]">
								<Cpu className="w-[9px] h-[9px]" />
								2B
							</span>
							<span className="rounded-full bg-accent px-2 py-0.5 text-[9.5px] font-semibold text-white">
								Active
							</span>
						</div>
					</div>
					<CircleCheck className="w-[19px] h-[19px] text-accent shrink-0" />
				</div>
				<Hairline inset={16} />
				<div className="flex items-center gap-3 px-4 py-3">
					<div className="flex-1 min-w-0">
						<div className="text-[14px] font-semibold text-white truncate">
							Qwen 3 1.7B
						</div>
						<div className="flex items-center gap-1.5 mt-1.5">
							<span className="flex items-center gap-1 rounded-full bg-[#2C2C2E] px-2 py-0.5 text-[9.5px] font-medium text-[#AAAAAA]">
								<Cpu className="w-[9px] h-[9px]" />
								1.7B
							</span>
						</div>
					</div>
					<div className="shrink-0 flex items-center gap-2">
						<span className="rounded-lg border border-accent/50 px-2.5 py-1 text-[10.5px] font-semibold text-accent">
							Use
						</span>
						<Trash2 className="w-[16px] h-[16px] text-[#FF3B30]" />
					</div>
				</div>
			</GroupCard>
			<div className="px-5 pt-1.5 text-[10.5px] text-[#8E8E93] leading-snug">
				Powers the Write tab and AI Chat — text models answer entirely on
				this device.
			</div>

			<SectionLabel>TRANSCRIPTION MODELS</SectionLabel>
			<GroupCard>
				<ModelRow
					name="Whisper Tiny (English)"
					tag="Whisper"
					tagIcon={Mic}
					size="57 MB"
					right={<CircleCheck className="w-[19px] h-[19px] text-accent" />}
				/>
			</GroupCard>

			<SectionLabel>TEXT EMBEDDINGS MODELS</SectionLabel>
			<GroupCard>
				<ModelRow
					name="All-MiniLM-L6-v2"
					tag="Embeddings"
					tagIcon={Brain}
					size="80 MB"
					right={<CircleCheck className="w-[19px] h-[19px] text-accent" />}
				/>
			</GroupCard>

			<SectionLabel>IMAGE GENERATION MODELS</SectionLabel>
			<GroupCard>
				<ModelRow
					name="SDXS 512 (DreamShaper)"
					tag="Diffusion"
					tagIcon={ImageIcon}
					steps="1 step"
					size="1.6 GB"
					right={<Download className="w-[19px] h-[19px] text-accent" />}
				/>
			</GroupCard>
		</div>

		<GlassBar centre="4 of 17 models" right={<Plus className="w-[20px] h-[20px]" />} />
	</Screen>
);
