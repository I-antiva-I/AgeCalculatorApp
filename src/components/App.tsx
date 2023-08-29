import React, {useEffect, useMemo, useState} from 'react';

import InputFields from './InputFields';
import DisplayPanel from './DisplayPanel';


interface DisplayData
{
  year:   number,
  month:  number,
  day:    number,
}


function App() {

  // Display data for display panel
  let [displayData, setDisplayData] = useState<DisplayData | undefined>(undefined);

  useEffect(() => 
  {
    let date = new Date();
    //setDisplayData({day: date.getDate(), month: date.getMonth()+1, year: date.getFullYear()%100})
  },[]);

  return (
    <div className="application">
      <main>
        <InputFields setDisplayData={setDisplayData}/>
        <DisplayPanel displayData={displayData}/>
      </main>
    </div>
  );
}

export default App;
