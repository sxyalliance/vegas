import type { Event } from '$lib/types/event';

export async function getEvents() {
	let events: Event[] = [];
	const paths = import.meta.glob('$lib/content/events/*.md', { eager: true });
	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');
		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Event, 'slug'>;

			metadata.meetingTime = new Date(metadata.meetingTime);

			const event = { ...metadata, slug } satisfies Event;
			event.published && events.push(event);
		}
	}
	events = events.sort(
		(first, second) =>
			second.meetingTime.getTime() - first.meetingTime.getTime()
	);
	return events;
}

export const hello = 'world';

export * from './category';
