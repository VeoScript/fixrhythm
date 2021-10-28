import React from 'react'
import NextNprogress from 'nextjs-progressbar'

const NextProgress: React.FC = () => {
  return (
    <NextNprogress
      color="#FF0000
      linear-gradient(
        to right,
        #FF5252,
        #FF5252,
        #FF0000,
        #A70000,
        #FF0000
      );"
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
      showOnShallow={true}
      options={{ easing: 'ease', speed: 500 }}
    />
  )
}

export default NextProgress