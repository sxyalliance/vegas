import browserslist from 'browserslist';
import { getUserAgentRegex, getUserAgentRegexes } from 'browserslist-useragent-regexp';

export const supportedBrowsers = browserslist();

export const userAgentRegexes = getUserAgentRegexes({
	browsers: supportedBrowsers,
	allowHigherVersions: true
});

export const userAgentRegex = getUserAgentRegex({
	browsers: supportedBrowsers,
	allowHigherVersions: true
});

export const isSupported = (userAgent: string) => {
	return userAgentRegex.test(userAgent);
};

export const isFullSupported = (userAgent: string) => {
	// we only actively supported Chrome and Edge
	const browser = getBrowser(userAgent);
	return browser ? browser.family === 'chrome' || browser.family === 'edge' : false;
};

const getBrowser = (userAgent: string) => {
	const browser = userAgentRegexes.find(({ regex }) => regex.test(userAgent));
	return browser || null;
};

export const getBrowserFamily = (userAgent: string) => {
	const browser = getBrowser(userAgent);
	return browser ? browser.family : 'unknown';
};

export const getBrowserName = (userAgent: string) => {
	const browser = getBrowser(userAgent);
	return browser ? `${browser.family} ${browser.matchedVersions[0][0]}` : 'unknown';
};
