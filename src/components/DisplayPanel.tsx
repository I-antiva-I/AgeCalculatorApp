import React, {useEffect, useMemo, useRef, useState} from 'react';
import InputFields from './InputFields';

interface DisplayPanelProps
{
    displayData:
    {
        year:   number,
        month:  number,
        day:    number,
    } | undefined,
}

function DisplayPanel(props: DisplayPanelProps) {


    // Counters
    let [displayDay, setDisplayDay] = useState<number>(0);
    let [displayMonth, setDisplayMonth] = useState<number>(0);
    let [displayYear, setDisplayYear] = useState<number>(0);
    // Refs
    let displayDayInterval = useRef<number | undefined>(undefined);
    let displayMonthInterval = useRef<number | undefined>(undefined);
    let displayYearInterval = useRef<number | undefined>(undefined);

    // Counter manipulations
    let startCounter = (
        ref: React.MutableRefObject<number | undefined>,
        setter: React.Dispatch<React.SetStateAction<number>>, 
        timeTick: number) =>
    {
        setter(0);
        if (ref.current !== undefined) {return};
        ref.current = window.setInterval(() => {setter((prev) => prev+1);}, timeTick);
    }
    let stopCounter = (ref: React.MutableRefObject<number | undefined>) =>
    {
        if (ref.current)
        {
            window.clearInterval(ref.current);
            ref.current=undefined;
        }
    }

    // Clear intervals
    useEffect(() => 
    {
        return () => 
        {
            if (displayDayInterval.current !== undefined) {window.clearInterval(displayDayInterval.current);}
            if (displayMonthInterval.current !== undefined) {window.clearInterval(displayMonthInterval.current);}
            if (displayYearInterval.current !== undefined) {window.clearInterval(displayYearInterval.current);}
        };
    }, []);

    // Start onn new data
    useEffect(() => 
    {  
        if (props.displayData !== undefined)
        {
            startCounter(displayDayInterval, setDisplayDay, 1500/props.displayData.day);
            startCounter(displayMonthInterval, setDisplayMonth, 1500/props.displayData.month);
            startCounter(displayYearInterval, setDisplayYear, 1500/props.displayData.year);
        }
        
        return ()=>
        {
            stopCounter(displayDayInterval);
            stopCounter(displayMonthInterval);
            stopCounter(displayYearInterval);
        }
    }, [props.displayData]);

    // MAX day
    useEffect(() => 
    {  
        if (props.displayData !== undefined)
        {
            if (displayDay >= props.displayData.day)
            {
                stopCounter(displayDayInterval);
            }
        }
    }, [displayDay]);
    
    // MAX month
    useEffect(() => 
    {  
        if (props.displayData !== undefined)
        {
            if (displayMonth >= props.displayData.month)
            {
                stopCounter(displayMonthInterval);
            }
        }
    }, [displayMonth]);

     // MAX year
    useEffect(() => 
    {  
        if (props.displayData !== undefined)
        {
            if (displayYear >= props.displayData.year)
            {
                stopCounter(displayYearInterval);
            }
        }
    }, [displayYear]);

  return (
    <div className="display-panel">
        <div className="display-info years">
            <div className='years-value'>{(props.displayData) ? displayYear : "--"}</div>
            <div className='years-label'>years</div>
        </div>
        <div className="display-info months">
            <div className='months-value'>{(props.displayData) ? displayMonth : "--"}</div>
            <div className='months-label'>months</div>
        </div>
        <div className="display-info days">
            <div className='days-value'>{(props.displayData) ? displayDay : "--"}</div>
            <div className='days-label'>days</div>
        </div>
    </div>
  );
}

export default DisplayPanel;
