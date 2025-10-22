import { extractDeckcode } from './parsers';

describe('Deck Parsers', () => {
	
	describe('extractDeckcode', () => {
		it('should extract a short deckcode from plain text', () => {
			// arrange
			const input = 'SGQ0LFRoSG5ncjksS3R0UHJkQSxSY2t0UmNjbkQsSnFuVHJyc0QsWm1iTXN0ckZudHN0YzE1LFptYlNjcmx0V3RjaDEyLFptYkdudE1uRSxGbGNuNixNcmxuNixQcmRnNyxXbmc0';
			
			// act
			const result = extractDeckcode(input);
			
			// assert
			expect(result).toEqual({ type: 'short', deckcode: 'Hd4,ThHngr9,KttPrdA,RcktRccnD,JqnTrrsD,ZmbMstrFntstc15,ZmbScrltWtch12,ZmbGntMnE,Flcn6,Mrln6,Prdg7,Wng4' });
		});

		it('should extract a long deckcode from JSON base64', () => {
			// arrange
			const input = 'eyJOYW1lIjoiRGlzY2FyZCIsIkNhcmRzIjpbeyJDYXJkRGVmSWQiOiJBcG9jYWx5cHNlIn0seyJDYXJkRGVmSWQiOiJCbGFkZSJ9LHsiQ2FyZERlZklkIjoiQ29sbGVlbldpbmcifSx7IkNhcmREZWZJZCI6IkNvcnZ1c0dsYWl2ZSJ9LHsiQ2FyZERlZklkIjoiRHJhY3VsYSJ9LHsiQ2FyZERlZklkIjoiR2FtYml0In0seyJDYXJkRGVmSWQiOiJLaG9uc2h1In0seyJDYXJkRGVmSWQiOiJMYWR5U2lmIn0seyJDYXJkRGVmSWQiOiJNb2RvayJ9LHsiQ2FyZERlZklkIjoiTW9yYml1cyJ9LHsiQ2FyZERlZklkIjoiUHJveGltYU1pZG5pZ2h0In0seyJDYXJkRGVmSWQiOiJTY29ybiJ9XX0=';
			
			// act
			const result = extractDeckcode(input);

			// assert
			expect(result).toEqual({ type: 'long', deckcode: '{"Name":"Discard","Cards":[{"CardDefId":"Apocalypse"},{"CardDefId":"Blade"},{"CardDefId":"ColleenWing"},{"CardDefId":"CorvusGlaive"},{"CardDefId":"Dracula"},{"CardDefId":"Gambit"},{"CardDefId":"Khonshu"},{"CardDefId":"LadySif"},{"CardDefId":"Modok"},{"CardDefId":"Morbius"},{"CardDefId":"ProximaMidnight"},{"CardDefId":"Scorn"}]}' });
		});
	});
});