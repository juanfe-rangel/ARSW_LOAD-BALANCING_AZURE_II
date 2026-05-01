module.exports = async function (context, req) {
    context.log('Processing request...');

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

    let a = 0, b = 1, temp;

    for (let i = 0; i < nth; i++) {
        temp = a;
        a = b;
        b = temp + b;
    }

    context.res = {
        status: 200,
        body: a.toString()
    };
};