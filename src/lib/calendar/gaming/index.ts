import { getSpreadsheetRangeData } from '$lib/calendar/gaming/sheet';
import { error } from '@sveltejs/kit';

const SpreadsheetId = '1XL4WQfdRTIBIGRJ2051Lt02cRSF99gIVTRwMX35Ym2c' as const;
const Range = 'A11:AC18' as const;

export enum DayOfWeek {
	MONDAY = 'Monday',
	TUESDAY = 'Tuesday',
	WEDNESDAY = 'Wednesday',
	THURSDAY = 'Thursday',
	FRIDAY = 'Friday',
	SATURDAY = 'Saturday',
	SUNDAY = 'Sunday'
}

export enum TimeOfDay {
	MORNING = 'Morn', // ~ 10:00 (10:00 - 12:00)
	AFTERNOON = 'AftN', // ~ 14:00 (14:00 - 16:00)
	EVENING = 'Even', // ~ 17:00 (17:00 - 20:00)
	AFTER_DARK = 'AftD' // ~ 21:00 (21:00 - 23:00)
}

export enum Availability {
	AVAILABLE = '✔️',
	TENTATIVE = '🟨',
	NOT_FREE = '❌'
}

export interface GamingCalendar {
	// username
	[key: string]: {
		// day of week
		[key in DayOfWeek]: {
			// time of day
			[key in TimeOfDay]: Availability;
		};
	};
}

export const getGamingCalendar = async (): Promise<GamingCalendar> => {
	const data = await getSpreadsheetRangeData(SpreadsheetId, Range);
	if (data.isErr()) {
		throw error(data.error.code, data.error.message);
	}

	const values = data.value.valueRanges[0].values;
	const keys = values[0];
	// append three empty strings to keys, since gapi response do not include the trailing empty cells
	keys.push('', '', '');

	// build keys map, if empty string, use previous non-empty key
	const keysMap: Record<number, string> = {};
	keys.forEach((key, index) => {
		if (key) {
			keysMap[index] = key;
		} else {
			keysMap[index] = keysMap[index - 1];
		}
	});

	const subKeys = values[2];

	const getKey = (index: number) => {
		return keysMap[index];
	};

	const parsed: GamingCalendar = {};

	values.slice(3).map((row) => {
		let username = '';
		const obj: {
			[key in DayOfWeek]: {
				[key in TimeOfDay]: Availability;
			};
		} = {} as never;

		row.forEach((value, index) => {
			const key = getKey(index);
			const subKey = subKeys[index];

			if (key === 'You name here' && value) {
				username = value;
				return;
			}

			if (
				!Object.values(DayOfWeek).includes(key as DayOfWeek) ||
				!Object.values(TimeOfDay).includes(subKey as TimeOfDay) ||
				!Object.values(Availability).includes(value as Availability)
			) {
				return;
			}

			const dayOfWeek = key as DayOfWeek;
			const timeOfDay = subKey as TimeOfDay;
			const availability = value as Availability;

			obj[dayOfWeek] = obj[dayOfWeek] || {};
			obj[dayOfWeek][timeOfDay] = availability;
		});

		parsed[username] = obj;
	});

	return parsed;
};

export const getAvailabilityOfTime = (
	gamingCalendar: GamingCalendar,
	dayOfWeek: DayOfWeek,
	timeOfDay: TimeOfDay
): Availability => {
	const stats = getStatementStatsOfTime(gamingCalendar, dayOfWeek, timeOfDay);
	return calculateOverallAvailability(
		stats[Availability.AVAILABLE],
		stats[Availability.TENTATIVE],
		stats[Availability.NOT_FREE]
	);
};

export const getStatementStatsOfTime = (
	gamingCalendar: GamingCalendar,
	dayOfWeek: DayOfWeek,
	timeOfDay: TimeOfDay
): { [key in Availability]: number } => {
	let [available, tentative, notFree] = [0, 0, 0];
	Object.values(gamingCalendar).forEach((user) => {
		// empty case, usually means not filled in
		if (!user[dayOfWeek]) {
			return;
		}

		const availability = user[dayOfWeek][timeOfDay];
		switch (availability) {
			case Availability.AVAILABLE:
				available++;
				break;
			case Availability.TENTATIVE:
				tentative++;
				break;
			case Availability.NOT_FREE:
				notFree++;
				break;
		}
	});
	return {
		[Availability.AVAILABLE]: available,
		[Availability.TENTATIVE]: tentative,
		[Availability.NOT_FREE]: notFree
	};
};

const calculateOverallAvailability = (
	available: number,
	tentative: number,
	notFree: number
): Availability => {
	// 70% or more not free -> not free
	// 70% or more available -> available
	// otherwise -> tentative
	const total = available + tentative + notFree;
	const notFreePercentage = notFree / total;
	const availablePercentage = available / total;
	if (notFreePercentage >= 0.7) {
		return Availability.NOT_FREE;
	}
	if (availablePercentage >= 0.7) {
		return Availability.AVAILABLE;
	}
	return Availability.TENTATIVE;
};

export const getDayOfWeek = (date: Date): DayOfWeek => {
	return date.toLocaleString('en-US', { weekday: 'long' }) as DayOfWeek;
};

export const getTimeOfDay = (date: Date): TimeOfDay | null => {
	const hour = date.getHours();
	if (hour >= 10 && hour < 12) {
		return TimeOfDay.MORNING;
	}
	if (hour >= 14 && hour < 16) {
		return TimeOfDay.AFTERNOON;
	}
	if (hour >= 17 && hour < 20) {
		return TimeOfDay.EVENING;
	}
	if (hour >= 21 && hour < 23) {
		return TimeOfDay.AFTER_DARK;
	}
	return null;
};
