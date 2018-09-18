import lessFunctions from './lessFunctions';
import {mapKeys} from 'lodash';

export const operatorMap = {
    '*': 'mul',
    '+': 'add',
    '-': 'sub',
    '/': 'div'
};

export const nativeFunctions = [
    'calc',
    'linear-gradient',
    'rgba',
    'url',
    'blur',
    'translate',
    'rotate',
    'translateY',
    'translateX',
    'attr',
    'scale',
    'translate3d',
    'translateZ',
    'scale3d'
];

export const customMixinFunctions = {
    'svg-fill'({src, defaultColor, newColor, property = 'background-image'}) {

        return {
            [property]: `url(${src})`
        };
    }

};

export const staticFunctions = {
    // e: lessFunctions.e
};

export const functions = {
    env(key) { return this[`${key}`]; },
    nf: (name, ...args) => `${name}(${args.join(', ')})`,
    ...customMixinFunctions,
    ...lessFunctions,
    ...mapKeys(lessFunctions, (func, key) => func.name),
};

// provide all functions for execution
export default functions;
