import {FC, MouseEventHandler} from 'react'

type Props = {
  disabled?: boolean
  loading?: boolean
  icon?: string
  btnClass?: string
  btnAttr?: object
  text: string
  size?: string
  outline?: boolean
  color: string
  iconColor?: string
  horizontalPadding?: number
  verticalPadding?: number
  click: MouseEventHandler<HTMLButtonElement>
  width?: string
  uppercase?: boolean
  title?: string
}

const Button: FC<Props> = (props) => {
  const {
    disabled,
    loading,
    icon,
    btnClass,
    btnAttr,
    text,
    size,
    outline,
    color,
    horizontalPadding,
    verticalPadding,
    iconColor,
    click,
    width,
    uppercase,
    title,
  } = props

  let adapted = ''
  if (!iconColor?.includes('#')) {
    if (iconColor === 'success') adapted = '#50cd89'
    else if (iconColor === 'primary') adapted = '#6993FF'
    else if (iconColor === 'danger') adapted = '#f1416c'
    else if (iconColor === 'info') adapted = '#8950fc'
  }

  return (
    <button
      {...btnAttr}
      title={title}
      className={
        `btn ${outline ? `btn-outline-${color} border border-${color}` : `btn-${color}`} btn-${
          size === 'small' ? 'sm' : 'lg'
        }
        ${horizontalPadding ? `px-${horizontalPadding}` : ''} ${
          verticalPadding ? `py-${verticalPadding}` : ''
        } 
        ${width && `w-${width}`} ${uppercase && 'text-uppercase'} ` + btnClass
      }
      disabled={disabled}
      onClick={click}
    >
      {!loading && icon && (
        <i
          style={{
            marginRight: `${text ? '.8em' : ''}`,
            color: iconColor?.includes('#') ? iconColor : adapted,
          }}
          className={icon}
        ></i>
      )}

      {!loading && <span className='indicator-label'>{text}</span>}
      {loading && (
        <span className='indicator-progress' style={{display: 'block'}}>
          Aguarde...
          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
        </span>
      )}
    </button>
  )
}

export {Button}
