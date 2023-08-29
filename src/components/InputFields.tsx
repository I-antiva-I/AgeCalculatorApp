import React, {useEffect, useMemo, useRef, useState} from 'react';
import { ValidState, validateDay, validateMonth, validateYear, validationInfo } from '../validations';
import { dateDifference } from '../date_difference';

interface InputFieldsProps
{
    setDisplayData: Function,
}


function InputFields(props: InputFieldsProps) 
{
    // Inputs' values
    let [myDay, setMyDay] =       useState<string>("");
    let [myMonth, setMyMonth] =   useState<string>("");
    let [myYear, setMyYear] =     useState<string>("");

    // Inputs' state (idle/valid/invalid/empty)
    let [myDayState, setMyDayState] =       useState<ValidState>(ValidState.IDLE);
    let [myMonthState, setMyMonthState] =   useState<ValidState>(ValidState.IDLE);
    let [myYearState, setMyYearState] =     useState<ValidState>(ValidState.IDLE);

    // Effect - validateDay if updating myMonth or myYear
    useEffect(() => 
    {
        if (myDay !== "")
        {   
            setMyDayState(validateDay(myDay, myMonth, myYear));
        }

    }, [myMonth, myYear]);

    let handleSubmission = (event: React.FormEvent<HTMLFormElement>) =>
    {   
        event.preventDefault();

        if ((myDayState===ValidState.VALID) &&
            (myMonthState===ValidState.VALID) && 
            (myYearState===ValidState.VALID))
        {
           props.setDisplayData(dateDifference(myDay, myMonth, myYear));
        }
        else
        {
            setMyDayState(validateDay(myDay, myMonth, myYear));
            setMyMonthState(validateMonth(myMonth));
            setMyYearState(validateYear(myYear));
        }
    }
 
    let handleMyChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {   
        let inputName = event.target.name;
        let newValue  = event.target.value;

        // Console message
        // console.log("New input:", inputName, newValue);

        // Validate and update
        switch (inputName)
        {
            case "day":
                setMyDayState(validateDay(newValue, myMonth, myYear));
                setMyDay(newValue);
                break;
            case "month":
                setMyMonthState(validateMonth(newValue))
                setMyMonth(newValue);
                break;
            case "year":
                setMyYearState(validateYear(newValue))
                setMyYear(newValue);
                break;
            default:
                console.log("Unknown field name...");
        }
    }

    return (
    <form className="my-form" onSubmit={handleSubmission}>
        <div className="input-fields">
            <label htmlFor="field-day"      className={"input-label "+myDayState}>DAY</label>
            <label htmlFor="field-month"    className={"input-label "+myMonthState}>MONTH</label>
            <label htmlFor="field-year"     className={"input-label "+myYearState}>YEAR</label>

            <input
                id="field-day"
                type="number"
                name="day"
                placeholder="DD"
                className={"input-field "+myDayState}
                value={myDay}
                onChange={handleMyChange}
            />
            <input
                id="field-month"
                type="number" 
                name="month"
                placeholder="MM"
                className={"input-field "+myMonthState}
                value={myMonth}
                onChange={handleMyChange}
            />
            <input
                id="field-year"
                type="number"
                name="year"
                placeholder="YYYY"
                className={"input-field "+myYearState}
                value={myYear}
                onChange={handleMyChange}
            />

            <div className={"input-info "+myDayState}>{validationInfo("day", myDay, myDayState)}</div>
            <div className={"input-info "+myMonthState}>{validationInfo("month", myMonth, myMonthState)}</div>
            <div className={"input-info "+myYearState}>{validationInfo("year", myYear, myYearState)}</div>
        </div>

        <div className="button-container">
            <button type="submit" id="submit-button"></button>
        </div>

    </form>

  );
}

export default InputFields;
