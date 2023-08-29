export function dateDifference(stringDay: string, stringMonth: string, stringYear: string)
{
    let startDay=      Number(stringDay);
    let startMonth =   Number(stringMonth); // [1..12]
    let startYear =    Number(stringYear);
    
    let currentDate =   new Date();
    let endDay=         currentDate.getDate();
    let endMonth =      currentDate.getMonth()+1; // [1..12]
    let endYear =       currentDate.getFullYear();
    
    if (startDay > endDay)
    {
        let isLeapYear = (endYear%400 == 0) || ((endYear%100 != 0) && (endYear%4 == 0))
        let borrowDays = [31, 28+Number(isLeapYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
        endDay += borrowDays[endMonth-1];
        endMonth--;
    }

    if (startMonth > endMonth)
    {
        endMonth += 12;
        endYear -= 1;
    }

    //console.log( endDay, endMonth, endYear);
    //console.log( startDay, startMonth, startYear);

    return {day: endDay-startDay, month: endMonth-startMonth, year: endYear-startYear}
}

// https://overiq.com/c-examples/c-program-to-calculate-the-difference-of-two-dates-in-years-months-and-days