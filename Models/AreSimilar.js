'use strict';
const message = require('@euriklis/message');
const validator = require('@euriklis/validator');
const sqrt = Math.sqrt;
function computeNNorm(a, b) {
    return sqrt((a - b) * (a - b));
}
function computeVNorm(a, b) {
    let norm = 0.0;
    for (let i = 0; i < b.length; i++) {
        norm += (a[i + 1] - b[i]) * (a[i + 1] - b[i]);
    }
    return sqrt(norm);
}
const incorrect_message = (text) => {
    return new message().bold().set_color_red()
        .append_not_check_mark().reset().append_white_space()
        .set_color_blue(text).reset().log();
}
const success_message = (text) => {
    return new message().bold().set_color_green()
        .append_check_mark().reset().append_white_space()
        .set_color_blue().append(text).reset().log();
}
/**
 * 
 * @param {{
 * value : number, 
 * solution : Array.<number>,
 * unconstrained_solution : Array.<number>,
 * Lagrangian : Array.<number>,
 * iact : Array.<number>,
 * iterations : [number, number],
 * message: string,
 * }} r1 
 * @param {{
 * value : number,
 * solution : Array.<number>,
 * unconstrained_solution : Array.<number>,
 * 'Lagrangian multipliers' : Array.<number>,
 * 'active constraints' : Array.<number>,
 * 'count of active constraints' : number,
 * iterations : [number, number],
 * message : string
 * }} r2 
 * @param {string} label
 * @param {number} epsilon
*/
function AreSimilar(r1, r2, label, epsilon) {
    new validator(r1.value[1]).is_number()
        .and().bind(
            new validator(r2.value).is_number()
        ).on(false, () => {
            incorrect_message(`The value of the ${label} data is not correct --> ${r1.value} and ${r2.value}.`);
        }).on(true, () => {
            new validator(computeNNorm(r1.value[1], r2.value))
                .is_lesser_than(epsilon)
                .on(true, () => {
                    success_message(`Correct value parameters in ${label}.`)
                }).on(false, () => {
                    success_message(`Incorrect value parameters in ${label}.`);
                })

        })
    new validator(r1.solution).is_array_and_for_every(elem => {
        return elem.is_undefined().or().is_number();
    })
        .and().bind(
            new validator(r2.solution).is_array_and_for_every(elem => {
                return elem.is_undefined().or().is_number();
            })
        ).on(false, () => {
            incorrect_message(`error in the solution parameter of ${label}.`);
        }).on(true, () => {
            new validator(computeVNorm(r1.solution, r2.solution))
                .is_equal_or_lesser_than(epsilon)
                .on(true, () => {
                    success_message(`correctly computed solution parameters in ${label}`);
                }).on(false, () => {
                    incorrect_message(`Incorrectly computed solution parameters in ${label}.`);
                })
        })
    new validator(r1.unconstrained_solution)
        .is_array_and_for_every(elem => {
            return elem.is_undefined().or().is_number();
        }).and().bind(
            new validator(r2.unconstrained_solution).is_array_and_for_every(elem => {
                return elem.is_undefined().or().is_number();
            })
        ).on(true, () => {
            new validator(computeVNorm(r1.unconstrained_solution, r2.unconstrained_solution))
                .is_equal_or_lesser_than(epsilon)
                .on(true, () => {
                    success_message(`Correctly computed unconstrained_solution parameters in ${label}.`);
                }).on(false, () => {
                    incorrect_message(`Incorrectly computed unconstrained_solution parameters in ${label}`);
                })
        }).on(false, () => {
            incorrect_message(`Error in unconstrained_solution parameter in ${label}`);
        })
    new validator(r1.Lagrangian).is_array_and_for_every(elem => {
        return elem.is_undefined().or().is_number();
    }).and().bind(
        new validator(r2["Lagrangian multipliers"]).is_array_and_for_every(elem => {
            return elem.is_undefined().or().is_number();
        })
    ).on(true, () => {
        new validator(computeVNorm(r1.Lagrangian, r2["Lagrangian multipliers"]))
            .is_equal_or_lesser_than(epsilon)
            .on(true, () => {
                success_message(`Correctly computed Lagrangian multipliers in ${label}.`);
            }).on(false, () => {
                incorrect_message(`Incorrectly computed Lagrangian multipliers in ${label}.`);
            });
    }).on(false, () => {
        incorrect_message(`Error in Lagrangian multipliers in ${label}.`);
    });
    new validator(r1.iterations).is_array_and_for_every(elem => {
        return elem.is_undefined().or().is_number();
    }).and().bind(
        new validator(r2.iterations).is_array_and_for_every(elem => {
            return elem.is_undefined().or().is_number();
        })
    ).on(true, () => {
        new validator(computeVNorm(r1.iterations, r2.iterations))
            .is_equal_or_lesser_than(epsilon)
            .on(true, () => {
                success_message(`Correctly computed iterations parameter in ${label}.`);
            }).on(false, () => {
                incorrect_message(`Incorrectly computed iterations parameter in ${label}.`);
            })
    }).on(false, () => {
        incorrect_message(`Error in the iterations parameter in ${label}.`);
    });
    new validator(r1.iact).is_array_and_for_every(elem => {
        return elem.is_undefined().or().is_number();
    }).and().bind(
        new validator(r2["active constraints"]).is_array_and_for_every(elem => {
            return elem.is_undefined().or().is_number();
        })
    ).on(false, () => {
        incorrect_message(`Error in active constraints parameters in ${label}.`);
    }).on(true, () => {
        let is_same = true;
        for (let i = 0; i < r2["active constraints"].length; i++) {
            if (r1.iact[i + 1] !== 0 && (r1.iact[i + 1] - 1) !== r2["active constraints"][i]) {
                is_same = false;
                break;
            }
        }
        new validator(is_same).is_same(true)
            .on(true, () => {
                success_message(`Correctly computed active constraint parameters in ${label}.`);
            }).on(false, () => {
                incorrect_message(`Incorrect active parameters in ${label}. --> ${JSON.stringify(r1.iact)} and ${JSON.stringify(r2["active constraints"])}`);
            });
    });
}
module.exports = AreSimilar;