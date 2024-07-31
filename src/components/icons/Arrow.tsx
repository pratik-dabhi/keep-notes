import { IClassNameProps } from '../../interfaces/interfaces'

const Arrow = ({className} : IClassNameProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className={className} xmlnsXlink="http://www.w3.org/1999/xlink" width={26} height={26} x={0} y={0} viewBox="0 0 32 32" style={{background: 'new 0 0 512 512'}} xmlSpace="preserve">
        <g>
            <path d="M13 24a1.011 1.011 0 0 1-.707-1.707L18.586 16l-6.293-6.293a1 1 0 0 1 1.414-1.414l7 7a1 1 0 0 1 0 1.414l-7 7A1 1 0 0 1 13 24z" fill="currentColor" opacity={1} data-original="#000000" />
        </g>
    </svg>
  )
}

export default Arrow