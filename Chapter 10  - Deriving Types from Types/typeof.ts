// Remember that typeof is a JavaScript operator that can be used at runtime, not TypeScript
const userName = 'Steve';
console.log(typeof userName); // "string"

// However, TypeScript also has a typeof operator that can be used at compile time to get the type of a variable or property
type UserNameType = typeof userName; // UserNameType is inferred as 'Steve' literal as it's a const. It would be string if let was used

// More realistic example
const settings = {
	difficulty: 'easy',
	minLevel: 10,
	didStart: false,
	players: ['Steve', 'Cali']
};

type SettingsType = typeof settings; // This saves us having to write out the type before assignment. Writing both can also be error prone, getting the type from a type is safer.

function loadData( settings: SettingsType ) {
	console.log(`Loading game with difficulty ${settings.difficulty} for ${settings.players.length} players.`)
};