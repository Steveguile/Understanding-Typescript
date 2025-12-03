type FileSource = { path: string };
const fileSource: FileSource = {
  path: 'some/path/to/file.csv',
};

type DBSource = { connectionUrl: string };
const dbSource: DBSource = {
  connectionUrl: 'some-connection-url',
};

type Source = FileSource | DBSource;

function loadData(source: Source) {
	if('path' in source) {
		console.log(`Loading data from file at path: ${source.path}`);
		return;
	}

	// After if check then source.connectionUrl is valid as it must be DBSource
	source.connectionUrl
}