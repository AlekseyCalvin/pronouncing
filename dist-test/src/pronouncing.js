"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCMU = parseCMU;
exports.syllableCount = syllableCount;
exports.phonesForWord = phonesForWord;
exports.rhymingPart = rhymingPart;
exports.search = search;
exports.searchStresses = searchStresses;
exports.rhymes = rhymes;
exports.stresses = stresses;
const fs = require("fs");
/**
 * Parses CMU dictionary format into arrays of [word, phones] pairs.
 */
function parseCMU(str) {
    const pronunciations = [];
    const lines = str.split('\n');
    for (const line of lines) {
        if (/^;/.test(line))
            continue;
        if (line.length === 0)
            continue;
        const parts = line.split('  ');
        if (parts.length < 2)
            continue;
        const word = parts[0].replace(/\(\d\)$/, '').toLowerCase();
        const phones = parts[1];
        pronunciations.push([word, phones]);
    }
    return pronunciations;
}
const pronunciations = parseCMU(fs.readFileSync(__dirname + '/cmudict-0.7b', { encoding: 'utf8' }));
// Build an index for O(1) word lookups while preserving the original
// return-order semantics (arrays of phone strings).
const phonesByWord = new Map();
for (const [word, phones] of pronunciations) {
    const list = phonesByWord.get(word);
    if (list) {
        list.push(phones);
    }
    else {
        phonesByWord.set(word, [phones]);
    }
}
/**
 * Counts the number of syllables in a phones string.
 * @param phones Space-separated ARPABET phonemes (e.g., "HH AH L OW"), or an array of characters/phonemes.
 */
function syllableCount(phones) {
    const items = Array.isArray(phones) ? phones : Array.from(phones);
    return items.reduce((sum, item) => sum + (item.match(/[012]/g) || []).length, 0);
}
/**
 * Returns all pronunciations (phone strings) for a given word.
 * Returns empty array if word not found.
 * @param find The word to look up (case-insensitive)
 */
function phonesForWord(find) {
    return phonesByWord.get(find) || [];
}
/**
 * Returns the "rhyming part" of a phones string: everything from the
 * last stressed vowel to the end.
 * @param phones Space-separated ARPABET phonemes
 */
function rhymingPart(phones) {
    const phonesList = phones.split(' ');
    let idx = 0;
    for (let i = phonesList.length - 1; i >= 0; i--) {
        if (/[12]$/.test(phonesList[i])) {
            idx = i;
            break;
        }
    }
    return phonesList.slice(idx).join(' ');
}
/**
 * Searches the CMU dictionary for words whose phoneme representation
 * matches the given pattern. If a string is passed, it's converted to
 * a RegExp with word boundary anchors. If a RegExp is passed, you must
 * add boundaries yourself.
 * @param pattern A regex pattern (string or RegExp) to match against phones
 */
function search(pattern) {
    const matches = [];
    const re = pattern instanceof RegExp ? pattern : new RegExp('\\b' + pattern + '\\b');
    for (const [word, phones] of pronunciations) {
        if (re.test(phones)) {
            matches.push(word);
        }
    }
    return matches;
}
/**
 * Searches for words whose stress pattern matches the given pattern.
 * @param pattern A regex pattern to match against the stress string
 */
function searchStresses(pattern) {
    const matches = [];
    const re = new RegExp('\\b' + pattern + '\\b');
    for (const [word, phones] of pronunciations) {
        if (re.test(stresses(phones))) {
            matches.push(word);
        }
    }
    return matches;
}
/**
 * Returns all words that rhyme with the given word.
 * @param word The word to find rhymes for
 */
function rhymes(word) {
    const allRhymes = [];
    const allPhones = phonesForWord(word);
    for (const phonesStr of allPhones) {
        const part = rhymingPart(phonesStr);
        const found = search(part + '$');
        allRhymes.push(...found);
    }
    return allRhymes.filter(r => r !== word);
}
/**
 * Extracts the stress pattern from a phones string as a string of digits.
 * "0" = unstressed, "1" = primary stress, "2" = secondary stress.
 * @param s Space-separated ARPABET phonemes
 */
function stresses(s) {
    return s.replace(/[^012]/g, '');
}
//# sourceMappingURL=pronouncing.js.map