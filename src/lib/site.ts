/**
 * One place for the facts about the app that the marketing site repeats.
 *
 * The values here are the ones the shipped NoteGuard build actually has:
 * the version in `app.json`, the Play package, the model names in the
 * on-device catalog and the algorithms in the crypto layer. When the app
 * changes, this file changes with it — the site should never describe a
 * feature the app does not have.
 */

const rawBase = import.meta.env.BASE_URL ?? "/";

/** The site lives under a path (`/noteguard-site`), without a trailing slash. */
export const BASE = rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;

/** Build a link to a path inside this site. */
export function url(path = "/"): string {
	const suffix = path.startsWith("/") ? path : `/${path}`;
	return `${BASE}${suffix}` || "/";
}

/** Build a link back to the homepage, optionally to a section on it. */
export function home(hash = ""): string {
	return hash ? `${url("/")}#${hash}` : url("/");
}

export const site = {
	name: "NoteGuard",
	version: "2.0.0",
	packageName: "com.heymeowcat.list",
	playUrl:
		"https://play.google.com/store/apps/details?id=com.heymeowcat.list&hl=en",
	author: "heymeowcat",
	language: "en-US",
} as const;

/**
 * The on-device model catalog, exactly as the app lists it. Sizes are the
 * download sizes the model manager shows.
 */
export const models = {
	text: [
		{ name: "Gemma 4 E2B", size: "2B" },
		{ name: "Qwen 3 1.7B", size: "1.7B" },
		{ name: "Llama 3.2 3B", size: "3B" },
		{ name: "LFM2.5-1.2B", size: "1.2B" },
		{ name: "Qwen 3 0.6B", size: "0.6B" },
	],
	transcription: [
		{ name: "Whisper Tiny (English)", size: "57 MB" },
		{ name: "Whisper Tiny (Multilingual)", size: "75 MB" },
		{ name: "Whisper Base (English)", size: "98 MB" },
		{ name: "Whisper Base (Multilingual)", size: "142 MB" },
		{ name: "Whisper Small (English)", size: "276 MB" },
		{ name: "Whisper Small (Multilingual)", size: "340 MB" },
	],
	embeddings: [{ name: "All-MiniLM-L6-v2", size: "80 MB" }],
	imageEmbeddings: [{ name: "CLIP ViT-B/32", size: "~600 MB" }],
	imageGeneration: [
		{ name: "SDXS 512 (DreamShaper)", size: "1.6 GB", steps: "1 step" },
		{ name: "EpiCRealism 512 (Hyper-SD)", size: "3.8 GB", steps: "4 steps" },
		{
			name: "Counterfeit V3.0 512 (Hyper-SD)",
			size: "3.8 GB",
			steps: "4 steps",
		},
	],
} as const;
