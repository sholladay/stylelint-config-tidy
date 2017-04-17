import path from 'path';
import test from 'ava';
import stylelint from 'stylelint';
import tidy from '.';

const sheetPath = {
    good : path.resolve(__dirname, 'fixture', 'good.css'),
    bad  : path.resolve(__dirname, 'fixture', 'bad.css')
};

test('good stylesheet', async (t) => {
    const result = await stylelint.lint({
        config : tidy,
        files  : sheetPath.good
    });
    t.false(result.errored);
});

test('bad stylesheet', async (t) => {
    const result = await stylelint.lint({
        config : tidy,
        files  : sheetPath.bad
    });
    t.true(result.errored);
});

