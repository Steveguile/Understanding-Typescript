// data: 
// initial amount
// annual contribution 
// expected return 
// duration

type Data = {
	initialAmount: number;
	annualContribution: number;
	expectedReturn: number;
	duration: number;
}

type Result = {
	year: string;
	totalAmount: number;
	totalContribution: number;
	totalInterestEarned: number;
}	

type CalculationResult = Result[] | string;

function calculateInvestment(data: Data): CalculationResult {
	const { initialAmount, annualContribution, expectedReturn, duration } = data;

	if (initialAmount < 0) {
		return 'Initial amount cannot be negative.';
	}

	if (duration <= 0) {
		return 'Duration must be greater than zero.';
	}

	if (expectedReturn < 0) {
		return 'Expected return cannot be negative.';
	}

	let total = initialAmount;
	let totalContribution = 0;
	let totalInterestEarned = 0;

	const annualResults: Result[] = [];

	for (let i = 0; i < duration; i++)	 {
		total = total * (1 + expectedReturn); // compound interest
		totalInterestEarned = total - totalContribution - initialAmount;
		totalContribution += annualContribution;
		total = total + annualContribution;

		annualResults.push({
			year: `Year ${i + 1}`,
			totalAmount: total,
			totalContribution, // js shorthand property
			totalInterestEarned
		});
	}

	return annualResults;
}

function printResults(results: CalculationResult): void {
	if (typeof results == 'string') {
		console.log(results);
		return;
	}

	for (const yearEndResult of results) {
		console.log(yearEndResult.year);
		console.log(`Total: ${yearEndResult.totalAmount.toFixed(0)}`);
		console.log(`Total Contributions: ${yearEndResult.totalContribution.toFixed(0)}`);
		console.log(`Total Interest Earned: ${yearEndResult.totalInterestEarned.toFixed(0)}`);
		console.log('-----------------------');
	}

}

const data: Data = {
	initialAmount: 5000,
	annualContribution: 500,
	expectedReturn: 0.09,
	duration: 10
};
const results = calculateInvestment(data);

printResults(results);