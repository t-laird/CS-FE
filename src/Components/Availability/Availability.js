import React from 'react';
import './Availability.css';

const Availability = ({ campsites, gap }) => {
  const campsiteKeys = Object.keys(campsites);
  const campsiteInfo = campsiteKeys.map((campsite, ind) => {
    const gapKeys = Object.keys(campsites[campsite].gaps);
    return (
      <tr key={`infoRow${ind}`}>
        <td>{campsites[campsite].name}</td>
        {
          gapKeys.map( (avail, i) => {
          const gapHighlight = (i === gap && campsites[campsite].gaps[avail])? 'highlight' : '';
          return <td key={`avail${ind}${i}`} className={gapHighlight}>{campsites[campsite].gaps[avail].toString()}</td>
        
        })
        }
      </tr>
    );
  });


  return (
    <div className="Availability">
      <h1>Campsites</h1>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>0 Gap Availability</th>
            <th>1 Gap Availability</th>
            <th>2 Gap Availability</th>
            <th>3 Gap Availability</th>
            <th>4 Gap Availability</th>
            <th>5 Gap Availability</th>
          </tr>
          {campsiteInfo}
        </tbody>
      </table>
    </div>
  );
}

export default Availability;