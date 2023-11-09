import React, { useState } from 'react'
import "./SideDrawer.css"
import { Search } from '@mui/icons-material'
import Slider from './Slider'

const SideDrawer = () => {
    const [drawer, setDrawer] = useState(false)
    
  return (
    <>
<div className="side-drawer">
<div className="form-control" onClick={() => setDrawer(!drawer)}>
    <Search/>
   <p>Search here..</p>
    </div>
{drawer && <div><Slider setDrawer={setDrawer}/> </div>}
</div>
    </>
  )
}

export default SideDrawer
