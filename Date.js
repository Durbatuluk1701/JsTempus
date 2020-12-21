var TempusDate = /** @class */ (function () {
    function TempusDate(year, month, day, format) {
        var _this = this;
        if (format === void 0) { format = "YYYY-MM-DD"; }
        this.setDaysInMonth = function () {
            _this._daysInMonth = {
                '1': 31,
                '2': (_this._year % 4 === 0 ? 29 : 28),
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
            };
        };
        // Lowercase = No 0's Padding
        // Uppercase = 0's Padding
        this.formatDate = function (formatString) {
            if (formatString === void 0) { formatString = _this._format; }
            var year = formatString.match(/[y|Y]+/);
            var month = formatString.match(/[m|M]+/);
            var day = formatString.match(/[d|D]+/);
            // Trim localYear
            var localYear = String(_this.year % (Math.pow(10, (year[0].length))));
            var localMonth = String(_this.month % (Math.pow(10, (month[0].length))));
            var localDay = String(_this.day % (Math.pow(10, (day[0].length))));
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
            return formatString;
        };
        // No params specified default to Today
        if (!(year && month && day)) {
            var tempDate = new Date();
            this._year = tempDate.getFullYear();
            this._month = tempDate.getMonth() + 1;
            this._day = tempDate.getDate();
        }
        else {
            this._year = year;
            this._month = month;
            this._day = day;
        }
        this.setDaysInMonth();
        this._format = format;
    }
    TempusDate.Today = function (format) {
        if (format === void 0) { format = "YYYY-MM-DD"; }
        var date = new Date();
        console.log(date.getMonth(), date.getDay());
        return new TempusDate(date.getFullYear(), date.getMonth(), date.getDay(), format).date;
    };
    TempusDate.prototype.validateDate = function () {
        return 0 < this._day && this._day < this._daysInMonth[this._month];
    };
    Object.defineProperty(TempusDate.prototype, "date", {
        get: function () {
            if (this.valid) {
                return this.formatDate(this._format);
            }
            return "Invalid Date";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TempusDate.prototype, "year", {
        get: function () {
            return this._year;
        },
        set: function (newYear) {
            this._year = newYear;
            this.setDaysInMonth();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TempusDate.prototype, "day", {
        get: function () {
            return this._day;
        },
        set: function (newDay) {
            this._day = newDay;
            while (this._daysInMonth[this._month] < this._day) {
                this._day -= this._daysInMonth[this._month];
                this._month += 1;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TempusDate.prototype, "month", {
        get: function () {
            return this._month;
        },
        set: function (newMonth) {
            this._month = newMonth;
            while (this._month > 12) {
                this._year += 1;
                this._month -= 12;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TempusDate.prototype, "valid", {
        get: function () {
            return this.validateDate();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TempusDate.prototype, "dayOfWeek", {
        get: function () {
            var t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
            var localY = this._year - Number(this._month < 3);
            return (localY + Math.floor(localY / 4) - Math.floor(localY / 100) + Math.floor(localY / 400) + t[this._month - 1] + this._day) % 7;
        },
        enumerable: false,
        configurable: true
    });
    TempusDate.prototype.addYear = function (years) {
        this.year += years;
        return this;
    };
    TempusDate.prototype.addMonths = function (months) {
        this.month += months;
        return this;
    };
    TempusDate.prototype.addDays = function (days) {
        this.day += days;
        return this;
    };
    return TempusDate;
}());
