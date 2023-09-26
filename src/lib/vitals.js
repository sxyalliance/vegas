import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';
import { getLogger, normalizeForLog } from '$lib/logging/logger';

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

const logger = getLogger('analytics', 'vercel', 'vitals');

function getConnectionSpeed() {
	return 'connection' in navigator &&
		navigator['connection'] &&
		'effectiveType' in navigator['connection']
		? navigator['connection']['effectiveType']
		: '';
}

/**
 * @param {import("web-vitals").Metric} metric
 * @param {{ params: { [s: string]: any; } | ArrayLike<any>; path: string; analyticsId: string; debug: boolean; }} options
 */
function sendToAnalytics(metric, options) {
	const page = Object.entries(options.params).reduce(
		(acc, [key, value]) => acc.replace(value, `[${key}]`),
		options.path
	);

	const body = {
		dsn: options.analyticsId,
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

	const blob = new Blob([new URLSearchParams(body).toString()], {
		// This content type is necessary for `sendBeacon`
		type: 'application/x-www-form-urlencoded'
	});
	if (navigator.sendBeacon) {
		navigator.sendBeacon(vitalsUrl, blob);
	} else
		fetch(vitalsUrl, {
			body: blob,
			method: 'POST',
			credentials: 'omit',
			keepalive: true
		});
}

/**
 * @param {any} options
 */
export function webVitals(options) {
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
