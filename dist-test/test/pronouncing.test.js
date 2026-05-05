"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tape_1 = __importDefault(require("tape"));
const pronouncing = __importStar(require("../src/pronouncing"));
(0, tape_1.default)('parse cmu dictionary', (t) => {
    const testData = ';;; some test data to ensure that parsing CMU-formatted files works\n' +
        'ADOLESCENT  AE2 D AH0 L EH1 S AH0 N T\n' +
        'ADOLESCENT(1)  AE2 D OW0 L EH1 S AH0 N T\n';
    const pronunciations = pronouncing.parseCMU(testData);
    t.ok(pronunciations.length > 0);
    const matches = pronunciations.filter(item => item[0] === 'adolescent');
    t.equal(matches.length, 2);
    t.end();
});
(0, tape_1.default)('syllable count', (t) => {
    t.equal(pronouncing.syllableCount('CH IY1 Z'), 1);
    t.equal(pronouncing.syllableCount('CH EH1 D ER0'), 2);
    t.equal(pronouncing.syllableCount('AE1 F T ER0 W ER0 D'), 3);
    t.equal(pronouncing.syllableCount('IH2 N T ER0 M IH1 T AH0 N T'), 4);
    t.equal(pronouncing.syllableCount('IH2 N T ER0 M IH1 T AH0 N T L IY0'), 5);
    t.end();
});
(0, tape_1.default)('phones for word', (t) => {
    const phones = pronouncing.phonesForWord('conflicts');
    t.equal(phones.length, 4);
    t.equal(phones[0], 'K AH0 N F L IH1 K T S');
    t.end();
});
(0, tape_1.default)('rhyming part', (t) => {
    let part = pronouncing.rhymingPart('S L IY1 P ER0');
    t.equal(part, 'IY1 P ER0');
    part = pronouncing.rhymingPart('S L IY1 P AH0 L IY0');
    t.equal(part, 'IY1 P AH0 L IY0');
    t.end();
});
(0, tape_1.default)('search', (t) => {
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
(0, tape_1.default)('rhymes', (t) => {
    const rhymes = pronouncing.rhymes('sleekly');
    const expected = [
        'beakley', 'biweekly', 'bleakley', 'meekly', 'obliquely',
        'steakley', 'szekely', 'uniquely', 'weakley', 'weakly',
        'weekley', 'weekly', 'yeakley'
    ];
    t.deepEqual(expected, rhymes);
    t.end();
});
(0, tape_1.default)('stresses', (t) => {
    let stresses = pronouncing.stresses('P ER0 M IH1 T');
    t.equal('01', stresses);
    stresses = pronouncing.stresses('P ER1 M IH2 T');
    t.equal('12', stresses);
    t.end();
});
(0, tape_1.default)('search stresses', (t) => {
    let words = pronouncing.searchStresses('^000100$');
    t.deepEqual(words, [
        'phytogeography', 'uninterruptible', 'uninterruptible', 'variability'
    ]);
    words = pronouncing.searchStresses('^[12]0[12]0[12]0[12]$');
    t.deepEqual(words, ['dideoxycytidine', 'homosexuality', 'hypersensitivity']);
    t.end();
});
//# sourceMappingURL=pronouncing.test.js.map