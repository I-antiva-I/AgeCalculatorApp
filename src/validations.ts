export function validateDay(stringDay: string, stringMonth: string, stringYear: string)
{
    let numberDay=      Number(stringDay);
    let numberMonth =   Number(stringMonth);
    let numberYear =    Number(stringYear);

    // Leap condition: (the year is multiple of 400) OR ((the year is a multiple of 4) AND (NOT a multiple of 100))
    let isLeapYear = (numberYear%400 == 0) || ((numberYear%100 != 0) && (numberYear%4 == 0))

    // Max         UNK JAN FEB                    MAR APR MAY JUN JUL AUG SEP OCT NOV DEC
    let maxDays = [31, 31, 28+Number(isLeapYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    
    return ((numberDay>0) && (numberDay<maxDays[numberMonth]+1) && (Number.isInteger(numberDay))) ?
        ValidState.VALID : ValidState.INVALID
    
}

export function validateMonth(stringMonth: string)
{
    let numberMonth =   Number(stringMonth);

    return ((numberMonth>0) && (numberMonth<13) && (Number.isInteger(numberMonth))) ?
        ValidState.VALID : ValidState.INVALID
}

export function validateYear(stringYear: string)
{
    let numberYear =   Number(stringYear);
    let currentYear =  new Date().getFullYear();

    return ((numberYear>=1) && (numberYear<currentYear+1) && (Number.isInteger(numberYear))) ?
        ValidState.VALID : ValidState.INVALID
}

export enum ValidState
{
    IDLE    = "idle",
    VALID   = "valid",
    INVALID = "invalid",
}

export function validationInfo(stringKey:string, stringValue: string, state: ValidState)
{
    switch(stringKey)
    {
        case "day":
            if (state === ValidState.INVALID)
                {return (stringValue === "") ? "This field is required" : "Must be a valid day";}
            else return "";
        case "month":
            if (state === ValidState.INVALID)
                {return (stringValue === "") ? "This field is required" : "Must be a valid month";}
            else return "";                
        case "year":
            if (state === ValidState.INVALID)
                {return (stringValue === "") ? "This field is required" : "Must be a past year";}
            else return "";
        default:
            return "";
    }
}
