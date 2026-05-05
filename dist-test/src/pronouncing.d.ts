export type Pronunciation = [string, string];
/**
 * Parses CMU dictionary format into arrays of [word, phones] pairs.
 */
export declare function parseCMU(str: string): Pronunciation[];
/**
 * Counts the number of syllables in a phones string.
 * @param phones Space-separated ARPABET phonemes (e.g., "HH AH L OW"), or an array of characters/phonemes.
 */
export declare function syllableCount(phones: string | string[]): number;
/**
 * Returns all pronunciations (phone strings) for a given word.
 * Returns empty array if word not found.
 * @param find The word to look up (case-insensitive)
 */
export declare function phonesForWord(find: string): string[];
/**
 * Returns the "rhyming part" of a phones string: everything from the
 * last stressed vowel to the end.
 * @param phones Space-separated ARPABET phonemes
 */
export declare function rhymingPart(phones: string): string;
/**
 * Searches the CMU dictionary for words whose phoneme representation
 * matches the given pattern. If a string is passed, it's converted to
 * a RegExp with word boundary anchors. If a RegExp is passed, you must
 * add boundaries yourself.
 * @param pattern A regex pattern (string or RegExp) to match against phones
 */
export declare function search(pattern: string | RegExp): string[];
/**
 * Searches for words whose stress pattern matches the given pattern.
 * @param pattern A regex pattern to match against the stress string
 */
export declare function searchStresses(pattern: string): string[];
/**
 * Returns all words that rhyme with the given word.
 * @param word The word to find rhymes for
 */
export declare function rhymes(word: string): string[];
/**
 * Extracts the stress pattern from a phones string as a string of digits.
 * "0" = unstressed, "1" = primary stress, "2" = secondary stress.
 * @param s Space-separated ARPABET phonemes
 */
export declare function stresses(s: string): string;
//# sourceMappingURL=pronouncing.d.ts.map