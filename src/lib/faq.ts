/**
 * The questions people actually ask about a private notes app, and the
 * answers the shipped build can stand behind. The same list feeds the FAQ
 * section and the `FAQPage` structured data, so the two cannot drift.
 */
export const faqs = [
	{
		q: "Is NoteGuard really offline?",
		a: "Yes. There is no account, no sync server and no analytics. The only network request the app ever makes is fetching a single web page — and only when you paste that link yourself and ask for it to be summarised. Everything else, including every AI model, runs on your device.",
	},
	{
		q: "What happens if I forget the PIN for a locked note?",
		a: "The note cannot be read. Your PIN is the key, and nothing keeps a copy of it — there is no stored hash to check against and no recovery code. That is the same trade-off a messaging app makes, and it is what makes the vault portable: a copy of the folder on another phone is useless without the PIN.",
	},
	{
		q: "Can I get my notes out of the app?",
		a: "Yes, and you do not need a special export. Your notes are plain Markdown files with metadata in frontmatter, in a folder you choose. Point Obsidian or any Markdown tool at that folder, or copy it to a USB stick. Settings also has an encrypted JSON export if you would rather hand someone a single file.",
	},
	{
		q: "Do my notes sync between my phone and my laptop?",
		a: "Not by the app — NoteGuard has no sync of its own. But the vault is an ordinary folder, so if you want sync you can put it in a synced folder (Syncthing, Nextcloud, a USB drive) and the app will read it there. The choice of who syncs your notes stays with you.",
	},
	{
		q: "Are all my notes encrypted, or only the locked ones?",
		a: "Only the ones you lock. The rest are ordinary Markdown files, readable by any app on your phone and by any tool that can open the folder. That is a deliberate trade: it keeps the notes readable, greppable and editable outside NoteGuard. Lock the ones that need it.",
	},
	{
		q: "How large are the AI models?",
		a: "Whisper Tiny is 57 MB and All-MiniLM-L6-v2 is 80 MB. At the top end, CLIP ViT-B/32 is around 600 MB, SDXS 512 is 1.6 GB, and the two photoreal and anime image exports are 3.8 GB each. Models download on demand from inside the app, and the app warns you before loading one that may not fit in memory.",
	},
	{
		q: "Is it on iOS?",
		a: "Android is the supported platform, and it is where NoteGuard is built and tested. The share-sheet capture, the home-screen widget, the note in the notification shade and the wide layout are all Android features.",
	},
	{
		q: "Will my notes survive a new phone?",
		a: "Yes. Your notes are files, so there is nothing to migrate. Copy the vault folder to the new phone, point NoteGuard at it, and everything is there — including locked notes, which open with the same PIN on the new device.",
	},
	{
		q: "Does the app need an account or the internet to work?",
		a: "No account, ever, and no internet. NoteGuard works in airplane mode, which is the state it is designed for. The AI features work too, because the models run locally.",
	},
	{
		q: "Can I use it on a tablet?",
		a: "Yes. On a tablet, a foldable or a large ChromeOS window, the folders rail, the note list and the editor sit side by side, and both sidebars can be put away to give the editor the whole window. The layout follows the window size and re-flows live.",
	},
];
