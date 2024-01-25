import React, { useState } from 'react'
import './style.scss'

const SwitchTabs = ({ data, OnTabChange }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [left, setLeft] = useState(0);

    const activeTab = (tab, index) => {
        setLeft(index * 100);       // we are setting the left property value through here by default index=0 so (left:100*0) but when index=1 then (left:100*1px) so we can set the property dynamically

        setTimeout(() => {        // we are using the setTimeout just for delay to set the select tab 3ms
            setSelectedTab(index);
        }, 300)
        OnTabChange(tab, index);


    }

    return (
        <div className='switchingTabs'>
            <div className="tabItems">
                {data.map((tab, index) => (
                    <span className={`tabItem ${selectedTab === index ? "active" : ""}`}
                        key={index}
                        onClick={() => activeTab(tab, index)}
                    >
                        {tab}
                    </span>
                ))}
                <span className='movingBg' style={{ left: left }} />     {/* by sending the left state to css we are accessing the left property of movingBg class
            and setting the left value there in css because for 0th index left will be 100*0 = 0px but for 100*1 = 100px so it means (left:100px;)  */}
            </div>


        </div>
    )
}

export default SwitchTabs
