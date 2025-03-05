enum DateFormat {
	US = "en-US",
	BR = "pt-BR",
}

export const formatDateToBr = (
	dateString: string,
	formatString: DateFormat,
) => {
	const date = new Date(dateString);
	return date.toLocaleDateString(formatString);
};
