import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ShowPassword(props) {
  return (
    <Svg
      width={35}
      height={25}
      viewBox="0 0 21 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M20.873 6.468C18.896 2.61 14.982 0 10.5 0 6.018 0 2.103 2.612.127 6.468a1.18 1.18 0 000 1.064C2.104 11.39 6.018 14 10.5 14c4.482 0 8.397-2.612 10.373-6.468a1.18 1.18 0 000-1.064zM10.5 12.25a5.25 5.25 0 110-10.5 5.25 5.25 0 010 10.5zm0-8.75c-.312.004-.623.05-.923.138a1.745 1.745 0 01-2.439 2.44A3.492 3.492 0 1010.5 3.5z"
        fill="#ACACAC"
      />
    </Svg>
  )
}

export default ShowPassword
