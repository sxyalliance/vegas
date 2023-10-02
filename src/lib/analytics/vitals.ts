import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';
import { getLogger, normalizeForLog } from '$lib/logging/logger';
import type { Metric } from 'web-vitals';

const logger = getLogger('analytics', 'vercel', 'vitals');

type AnalyticsOptions = {
	params: { [s: string]: never } | ArrayLike<never>;
	path: string;
	debug: boolean;
};

function getConnectionSpeed() {
	if (navigator.connection) {
		const { downlink, effectiveType } = navigator.connection;
		return `${downlink}Mbps (${effectiveType})`;
	}

	return 'Unknown';
}

function sendToAnalytics(metric: Metric, options: AnalyticsOptions) {
	const page = Object.entries(options.params).reduce(
		(acc, [key, value]) => acc.replace(value, `[${key}]`),
		options.path
	);

	const body = {
		id: metric.id,
		page,
		href: location.href,
		event_name: metric.name,
		value: metric.value.toString(),
		speed: getConnectionSpeed()
	};

	if (options.debug) {
		logger.debug(normalizeForLog(body), 'Metric has been reported');
	}
}

export function webVitals(options: AnalyticsOptions) {
	try {
		getFID((metric) => sendToAnalytics(metric, options));
		getTTFB((metric) => sendToAnalytics(metric, options));
		getLCP((metric) => sendToAnalytics(metric, options));
		getCLS((metric) => sendToAnalytics(metric, options));
		getFCP((metric) => sendToAnalytics(metric, options));
	} catch (err) {
		logger.error(normalizeForLog(err), 'Error while reporting web vitals');
	}
}
