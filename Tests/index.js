'use strict';
const solveQP = require('quadprog').solveQP;
const solveQP_eur = require('@euriklis/quadprog');
const models = require('../Models');
const data = require('./data')
let A, b, CA, Cb, Cd, CD, d, D, meq, toUnitBase, label;
for (let i = 0; i < data.length; i++) { 
    A = data[i].A, b = data[i].b, label = data[i].label,
    d = data[i].d, D = data[i].D, meq = data[i].meq,
    toUnitBase = models.transformToUnitBase(D, d, A, b),
        CD = toUnitBase.D, Cd = toUnitBase.d,
        CA = toUnitBase.A, Cb = toUnitBase.b;
        models.example_label(`Comparison of the results for the ${label}:`);
        models.AreSimilar(solveQP(CD, Cd, CA, Cb, meq), solveQP_eur(D, d, A, b, meq), label, 1e-8)
}
