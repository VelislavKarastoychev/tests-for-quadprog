'use strict';
let Dmat = [], dvec = [], Amat = [], bvec = [], meq = 0, label = 'Alberto Santini example';

Dmat[0] = [];
Dmat[1] = [];
Dmat[2] = [];
Dmat[0][0] = 1;
Dmat[1][0] = 0;
Dmat[2][0] = 0;
Dmat[0][1] = 0;
Dmat[1][1] = 1;
Dmat[2][1] = 0;
Dmat[0][2] = 0;
Dmat[1][2] = 0;
Dmat[2][2] = 1;

dvec[0] = 0;
dvec[1] = 5;
dvec[2] = 0;

Amat[0] = [];
Amat[1] = [];
Amat[2] = [];
Amat[0][0] = -4;
Amat[1][0] = -3;
Amat[2][0] = 0;
Amat[0][1] = 2;
Amat[1][1] = 1;
Amat[2][1] = 0;
Amat[0][2] = 0;
Amat[1][2] = -2;
Amat[2][2] = 1;

bvec[0] = -8;
bvec[1] = 2;
bvec[2] = 0;
module.exports = {
    D : Dmat, d : dvec, A : Amat, b : bvec, label, meq
}