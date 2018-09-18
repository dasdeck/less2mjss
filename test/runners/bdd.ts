
import * as suites from '..';
import {pickBy, isObject, forEach} from 'lodash';
import less2jss from '../../src/index';
import {Sheet, Exp, Nest, Extend} from 'mjss';
import * as less from 'less';
import {css_beautify} from 'js-beautify';
/* generates test with bdd style commands */

forEach(pickBy(suites, suite => isObject(suite) && suite.tests), (block:any, name) => {

    const compare = (a, b) => expect(a).toEqual(b);
    describe(name, () => {

        block.tests.forEach(row => {

            const desc = row.desc || row.less;
            it(desc, () => {

                if (row.test) {
                    row.test(less2jss, {compare})
                } else {
                    const jss = less2jss(row.less);
                    compare(jss, row.jss)
                }


            });

            it(`${desc}(round-trip)`, () => {
                const jss = less2jss(row.less);
                const options = {plugins: [new Exp, new Extend, new Nest]}
                const sheet = new Sheet(options, jss);
                const jssCss = sheet.toString();

                less.render(row.less, (err, res) => {

                    compare(css_beautify(jssCss), css_beautify(res.css));

                })
            })

        });
    });
});
