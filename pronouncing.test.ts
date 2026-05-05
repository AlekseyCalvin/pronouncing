import test from 'tape';
import * as pronouncing from '../src/pronouncing';

test('parse cmu dictionary', (t) => {
  const testData =
    ';;; some test data to ensure that parsing CMU-formatted files works\n' +
    'ADOLESCENT  AE2 D AH0 L EH1 S AH0 N T\n' +
    'ADOLESCENT(1)  AE2 D OW0 L EH1 S AH0 N T\n';
  const pronunciations = pronouncing.parseCMU(testData);
  t.ok(pronunciations.length > 0);
  const matches = pronunciations.filter(item => item[0] === 'adolescent');
  t.equal(matches.length, 2);
  t.end();
});

test('syllable count', (t) => {
  t.equal(pronouncing.syllableCount('CH IY1 Z'), 1);
  t.equal(pronouncing.syllableCount('CH EH1 D ER0'), 2);
  t.equal(pronouncing.syllableCount('AE1 F T ER0 W ER0 D'), 3);
  t.equal(pronouncing.syllableCount('IH2 N T ER0 M IH1 T AH0 N T'), 4);
  t.equal(pronouncing.syllableCount('IH2 N T ER0 M IH1 T AH0 N T L IY0'), 5);
  t.end();
});

test('phones for word', (t) => {
  const phones = pronouncing.phonesForWord('conflicts');
  t.equal(phones.length, 4);
  t.equal(phones[0], 'K AH0 N F L IH1 K T S');
  t.end();
});

test('rhyming part', (t) => {
  let part = pronouncing.rhymingPart('S L IY1 P ER0');
  t.equal(part, 'IY1 P ER0');
  part = pronouncing.rhymingPart('S L IY1 P AH0 L IY0');
  t.equal(part, 'IY1 P AH0 L IY0');
  t.end();
});

test('search', (t) => {
  let matches = pronouncing.search('^S K L');
  t.deepEqual(matches, ['sclafani', 'scleroderma', 'sclerosis', 'sklar', 'sklenar']);
  matches = pronouncing.search('IH. \\w* IH. \\w* IH. \\w* IH.');
  t.deepEqual(matches, [
    'definitive', 'definitively', 'diminishes', 'diminishing',
    'elicited', 'miscibility', 'primitivistic', 'privileges'
  ]);
  matches = pronouncing.search(/\bIH. \w* IH. \w* IH. \w* IH.\b/);
  t.deepEqual(matches, [
    'definitive', 'definitively', 'diminishes', 'diminishing',
    'elicited', 'miscibility', 'primitivistic', 'privileges'
  ]);
  t.end();
});

test('rhymes', (t) => {
  const rhymes = pronouncing.rhymes('sleekly');
  const expected = [
    'beakley', 'biweekly', 'bleakley', 'meekly', 'obliquely',
    'steakley', 'szekely', 'uniquely', 'weakley', 'weakly',
    'weekley', 'weekly', 'yeakley'
  ];
  t.deepEqual(expected, rhymes);
  t.end();
});

test('stresses', (t) => {
  let stresses = pronouncing.stresses('P ER0 M IH1 T');
  t.equal('01', stresses);
  stresses = pronouncing.stresses('P ER1 M IH2 T');
  t.equal('12', stresses);
  t.end();
});

test('search stresses', (t) => {
  let words = pronouncing.searchStresses('^000100$');
  t.deepEqual(words, [
    'phytogeography', 'uninterruptible', 'uninterruptible', 'variability'
  ]);
  words = pronouncing.searchStresses('^[12]0[12]0[12]0[12]$');
  t.deepEqual(words, ['dideoxycytidine', 'homosexuality', 'hypersensitivity']);
  t.end();
});
