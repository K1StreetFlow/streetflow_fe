export const formatDate = (isodate) => {
	const date = new Date(isodate);

	// Daftar nama bulan dalam bahasa Indonesia
	const monthNames = [
		"Januari",
		"Februari",
		"Maret",
		"April",
		"Mei",
		"Juni",
		"Juli",
		"Agustus",
		"September",
		"Oktober",
		"November",
		"Desember",
	];

	const formattedDate = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}, ${(
		"0" + date.getHours()
	).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;

	return formattedDate;
};

export const formatDates = (isodate) => {
	const date = new Date(isodate);

	// Daftar nama bulan dalam bahasa Indonesia
	const monthNames = [
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"10",
		"11",
		"12",
	];

	const formattedDates = `${date.getDate()}-${monthNames[date.getMonth()]}-${date.getFullYear()}`;

	return formattedDates;
};

