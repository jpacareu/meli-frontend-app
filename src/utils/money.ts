export const formatAmount = (amount: number) =>
	amount.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1.');

export const formatCurrency = (currency: string) =>
	currency === 'ARS' ? '$' : 'U$S';
