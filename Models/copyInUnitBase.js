'use strict';
function transformToUnitBase(D, d, A, b) {
    let i, j, CD = [], Cd = [], CA = [], Cb = [];
    for (i = 0; i < D.length; i++) {
        CD[i + 1] = [];
        Cd[i + 1] = d[i];
        for (j = 0; j < D[i].length; j++) {
            CD[i + 1][j + 1] = D[i][j];
        }
    }
    for (i = 0; i < A.length; i++) {
        CA[i + 1] = [];
        Cb[i + 1] = b[i];
        for (j = 0; j < A[i].length; j++) CA[i + 1][j + 1] = A[i][j];
    }
    return {
        D : CD, d : Cd, A : CA, b : Cb
    }
}
module.exports = transformToUnitBase;