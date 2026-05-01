module.exports = async function (context, req) {
    context.log('Processing request with memoized recursion...');

    let nth = req.body?.nth;

    if (nth === undefined) {
        context.res = {
            status: 400,
            body: "Send { \"nth\": number }"
        };
        return;
    }

    nth = parseInt(nth);

    if (nth < 0) {
        context.res = {
            status: 400,
            body: "must be greater than 0"
        };
        return;
    }

    // Create a memoization cache
    const memo = {};

    // Recursive function with memoization
    function fibonacciMemo(n) {
        if (n <= 1) {
            return n;
        }

        if (memo[n] !== undefined) {
            return memo[n];
        }

        memo[n] = fibonacciMemo(n - 1) + fibonacciMemo(n - 2);
        return memo[n];
    }

    const result = fibonacciMemo(nth);

    context.res = {
        status: 200,
        body: result.toString()
    };
};
