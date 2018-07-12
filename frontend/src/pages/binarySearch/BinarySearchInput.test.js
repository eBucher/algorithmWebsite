import BinarySearchInput from './BinarySearchInput.js';
import React from 'react';

describe('Testing BinarySearchInput class', () => {

    //Expected: Anything that only has an integer in it is accepted.
    test('BinarySearchInput: verifyTarget()', () => {
        var b = new BinarySearchInput();
        expect(b.verifyTarget("5")).toEqual(true);
        expect(b.verifyTarget("9876543210")).toEqual(true);
        expect(b.verifyTarget("-459")).toEqual(true);
        expect(b.verifyTarget("")).toEqual(false);
        expect(b.verifyTarget("- 43")).toEqual(false);
        expect(b.verifyTarget(" 43")).toEqual(false);
        expect(b.verifyTarget("56 ")).toEqual(false);
        expect(b.verifyTarget("98 76")).toEqual(false);
        expect(b.verifyTarget("83,189")).toEqual(false);
        expect(b.verifyTarget("12bad45")).toEqual(false);
    });

    //Expected: Anything that only has an integer in it is accepted.
    test('BinarySearchInput: verifyElements()', () => {
        var b = new BinarySearchInput();
        expect(b.verifyElements("5")).toEqual(true);
        expect(b.verifyElements("-1")).toEqual(true);
        expect(b.verifyElements("-150, -50, -5")).toEqual(true);
        expect(b.verifyElements("-150,-50,-5")).toEqual(true);
        expect(b.verifyElements("")).toEqual(false);
        expect(b.verifyElements("43,")).toEqual(false);
        expect(b.verifyElements("83,18,")).toEqual(false);
        expect(b.verifyElements("56, -")).toEqual(false);
        expect(b.verifyElements("98 76 190")).toEqual(false);
        expect(b.verifyTarget("1, 23, bad, 45")).toEqual(false);
        expect(b.verifyTarget("10, 20, 30, 15")).toEqual(false);
    });

});
