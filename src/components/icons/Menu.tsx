import { IClassNameProps } from '../../interfaces/interfaces'

const Menu = ({className}: IClassNameProps) => {
  return (
    <>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width={26} height={26} x={0} y={0} viewBox="0 0 24 24" style={{background: 'new 0 0 512 512'}} xmlSpace="preserve" className={className}>
        <g>
          <g fill="currentColor">
            <path d="M20 7H4c-.6 0-1-.4-1-1s.4-1 1-1h16c.6 0 1 .4 1 1s-.4 1-1 1zM14 13H4c-.6 0-1-.4-1-1s.4-1 1-1h10c.6 0 1 .4 1 1s-.4 1-1 1zM18 19H4c-.6 0-1-.4-1-1s.4-1 1-1h14c.6 0 1 .4 1 1s-.4 1-1 1z" fill="currentColor" opacity={1} data-original="#000000" />
          </g>
        </g>
        </svg>
    </>
  )
}

export default Menu