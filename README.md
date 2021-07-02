# Tests for the @euriklis/quadprog package (library).

This is tester for the our npm package @euriklis/quadprog. We comparison the results of our computations with the output of the Alberto Santini quadprog package and with the fortran code. First we apply the conventional javascript tests provided from Alberto Santini and then we create random matrices and test the output of the two packages.
l

# Tests running.

To run the tests you have to execute in the terminal the command 
```sh
npm t
```
# Add a set of tests

If you would like to add your own data for testing you have to inside it with the following way:
1. Create a javascript file with arbitrary name in the folder **Tests**. In the file create an object or an array of object elements which consist from the properties (keys):
"D" - a symmetric matrix (array of arrays) with dimensions, say n x n.
"d" - a vector (array) with dimensions, say n x 1 (array with length n).
"A" - a rectangular matrix with dimensions, say q x n.
"b" - a vector with dimensions, say q x 1.
"meq" - count of the equality constraints in the matrix A.
"label" - a string that gives a general and abstract description for your data.
Export this/these data.
2. Open the file Tests/data.js and require your file (const my_file = require('./my_file')).If the exported type of your data is array, then insert it to the data array in the data file with the spread operator (for example data = [examples, ...my_file]), otherwise insert it as variable. Save the data file and run the tests.

