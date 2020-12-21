class TempusDate {
    private _format: string;
    private _year: any;
    private _month: any;
    private _day: any;
    private _daysInMonth: { [key: string]: number };
    constructor(year: number, month: number, day: number, format: string = "YYYY-MM-DD") {
        // No params specified default to Today
        if (!(year && month && day)) {
            let tempDate = new Date();
            this._year = tempDate.getFullYear();
            this._month = tempDate.getMonth() + 1;
            this._day = tempDate.getDate();
        } else {
            this._year = year;
            this._month = month;
            this._day = day;
        }
        this.setDaysInMonth();
        this._format = format;
    }
    private setDaysInMonth = () => {
        this._daysInMonth = {
            '1': 31,
            '2': (this._year % 4 === 0 ? 29 : 28),
            '3': 31,
            '4': 30,
            '5': 31,
            '6': 30,
            '7': 31,
            '8': 31,
            '9': 30,
            '10': 31,
            '11': 30,
            '12': 31
        }
    }
    static Today(format: string = "YYYY-MM-DD"): string {
        let date = new Date();
        console.log(date.getMonth(), date.getDay());
        return new TempusDate(date.getFullYear(), date.getMonth(), date.getDay(), format).date;
    }
    validateDate() {
        return 0 < this._day && this._day < this._daysInMonth[this._month];
    }
    get date() {
        if (this.valid) {
            return this.formatDate(this._format)
        }
        return "Invalid Date";
    }
    get year() {
        return this._year;
    }
    get day() {
        return this._day;
    }
    get month() {
        return this._month;
    }
    get valid() {
        return this.validateDate();
    }
    dayOfWeek(): number {
        let t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
        let localY = this._year - Number(this._month < 3);
        return (localY + Math.floor(localY / 4) - Math.floor(localY / 100) + Math.floor(localY / 400) + t[this._month - 1] + this._day) % 7;
    }
    set year(newYear: number) {
        this._year = newYear;
        this.setDaysInMonth();
    }
    set month(newMonth: number) {
        this._month = newMonth;
        while (this._month > 12) {
            this._year += 1;
            this._month -= 12;
        }
    }
    set day(newDay: number) {
        this._day = newDay;
        while (this._daysInMonth[this._month] < this._day) {
            this._day -= this._daysInMonth[this._month];
            this._month += 1;
        }
    }
    // Lowercase = No 0's Padding
    // Uppercase = 0's Padding
    formatDate = (formatString: string = this._format): string => {
        let year = formatString.match(/[y|Y]+/);
        let month = formatString.match(/[m|M]+/);
        let day = formatString.match(/[d|D]+/);
        // Trim localYear
        let localYear = String(this.year % (10 ** (year[0].length)));

        let localMonth = String(this.month % (10 ** (month[0].length)));
        let localDay = String(this.day % (10 ** (day[0].length)));
        // Padding: 
        if (year[0].toUpperCase() === year[0]) {
            while (localYear.length < year[0].length) {
                localYear = "0" + localYear;
            }
        }
        if (month[0].toUpperCase() === month[0]) {
            while (localMonth.length < month[0].length) {
                localMonth = "0" + localMonth;
            }
        }
        if (day[0].toUpperCase() === day[0]) {
            while (localDay.length < day[0].length) {
                localDay = "0" + localDay;
            }
        }
        // Replacements
        formatString = formatString.replace(year[0], localYear);
        formatString = formatString.replace(month[0], localMonth);
        formatString = formatString.replace(day[0], localDay);
        return formatString
    }
    addYear(years: number): TempusDate {
        this.year += years;
        return this;
    }
    addMonths(months: number): TempusDate {
        this.month += months;
        return this;
    }
    addDays(days: number): TempusDate {
        this.day += days;
        return this;
    }
}