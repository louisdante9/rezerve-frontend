import React, {useState} from 'react'

const WithState = (Component) => {
  const WithStateComponent = () => {
     const [active, setActive] = useState(false);
    return <Component active={active} setActive={setActive} />
  }
  return WithStateComponent
}

export default WithState