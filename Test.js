require("./Date");

class DateTester {
    constructor() {
        const w = (fn) => {
            return () => fn();
        }
        this.tests = [w(this.test1)];
    }
    run() {
        return Promise.all(this.tests);
    }
    // Date with Pass Values Correctly Constructs with Values;
    async test1() {
        let date = new TempusDate(2000, 1, 1);
        return true;
    }
}

let tester = new DateTester();
tester.run();