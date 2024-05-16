
export const getStorageKey: (key: string) => string = (key: string) => `innovio-cache-${key}`;

export const roundDecimalPlaces = (value: string | undefined, roundTo: number): number | string => {
	if (!value) {
		return "-";
	}
	return parseFloat(value).toFixed(roundTo) as unknown as number;
};
