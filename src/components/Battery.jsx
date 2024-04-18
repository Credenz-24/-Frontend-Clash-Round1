import React,{useState} from 'react'
import BatteryGauge from 'react-battery-gauge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons';


export default function Battery({streak}) {
  const [chargedColor,setChargedColor] =useState('blue');
  
  // if (streak>=8){
  //   setChargedColor('green');
  // }else{
  //   setChargedColor('blue');
  // }

  return (
    <>
    {/* <FontAwesomeIcon icon={faBoltLightning} fade /> */}
      <div className={`${streak<4 ? 'mx-6' : 'mx-3'} flex`}>
          <div className='flex justify-center items-center  -mr-6'>
              {streak >= 4 && <FontAwesomeIcon icon={faBoltLightning} fade  style={{color: "orange",}} />}
          </div>

          <div  >
            <BatteryGauge value={streak>4 ? 4 :streak}  size={70} maxValue={8} formatValue={() => streak<4 ? streak : streak  } customization={{
                batteryBody: {
                          strokeWidth: 4,
                          cornerRadius: 6,
                          fill: 'none',  // to fill battery body(white part)
                          strokeColor: 'white'
                        },
                        batteryCap: {
                          fill: 'none',
                          strokeWidth: 4,
                          strokeColor: 'white',
                          cornerRadius: 2,
                          capToBodyRatio: 0.4
                        },
                        batteryMeter: {
                          fill: streak>=4? 'green':'yellow',
                          lowBatteryValue: 3,
                          lowBatteryFill: 'red',
                          outerGap: 1,
                          noOfCells: 1, // more than 1, will create cell battery
                          interCellsGap: 1,
                        },
                        readingText: {
                          lightContrastColor: '#111',
                          darkContrastColor: streak>=4? '#fff' :'black',
                          lowBatteryColor: 'red',
                          fontFamily: 'Helvetica',
                          fontSize: 15,
                          showPercentage: false, // Hide percentage
                        },
                        chargingFlash: {
                          scale: undefined,
                          fill: 'orange',
                          animated: true,
                          animationDuration: 1000
                  },       
                }}          
              />
            </div>
            
      </div>
    </>
  )
}