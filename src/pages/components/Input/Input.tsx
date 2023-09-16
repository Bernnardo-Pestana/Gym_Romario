import { FC, useState } from 'react'
import InputMask from 'react-input-mask'
import styles from './Input.module.css'
import Select from 'react-select'

type Props = {
  label?: string
  getFieldProps?: any
  inputAttr?: any
  checked?: boolean
  disabled?: boolean
  checkSwift?: boolean
  options?: any
  value?: any
  change?: any
  placeholder?: string
  maxLength?: string
  minLength?: string
  minNumber?: number
  maxNumber?: number
  rows?: number
  maxCaracteres?: number
  currency?: string
  locale?: string
  isSecure?: boolean
  autoComplete?: string
  name?: string
  defaultValue?: string
  focus?: boolean
  smalltext?: string
  acceptFile?: string
  blur?: (value: string) => void
  search?: boolean
  className?: string
  textCenter?: boolean
}

const Input: FC<Props> = (props) => {
  const {
    disabled,
    label,
    getFieldProps,
    inputAttr,
    checked,
    options,
    value,
    change,
    placeholder,
    minLength,
    maxLength,
    checkSwift,
    minNumber,
    maxNumber,
    rows,
    maxCaracteres,
    currency,
    locale,
    isSecure = true,
    autoComplete,
    name,
    defaultValue,
    focus,
    smalltext,
    acceptFile,
    blur,
    search,
    textCenter,
    className
  } = props

  const [hiddenPassword, setHiddenPassword] = useState<boolean>(isSecure)

  switch (inputAttr.type) {
    case 'radio':
      return (
        <div>
          <label className='d-flex align-items-center'>
            <input {...getFieldProps} {...inputAttr} checked={checked} onChange={(event) => change(event.target.checked)} />
            <span className='btn btn-sm btn-color-muted btn-active btn-active-primary ps-2 pe-4 py-0'>
              {label}
            </span>
          </label>
        </div>
      )
    case 'checkbox':
      return (
        <div className='mt-4'>
          <label
            className={`form-check ${checkSwift && 'form-switch form-check-custom form-check-solid'
              }`}
          >
            <input
              {...getFieldProps}
              {...inputAttr}
              className='form-check-input'
              value={value}
              defaultChecked={checked}
              disabled={disabled}
              onChange={(event) => change(event.target.checked)}
            />
            <span
              className={`form-check-label ${checkSwift ? 'fw-normal ms-5 text-gray-800' : 'fw-normal text-gray-800 ms-1'
                }`}
            >
              {label}
            </span>
          </label>
        </div>
      )
    case 'select':
      return (
        <div className='mt-6 '>
          {label && <label className='form-label fw-normal text-white'>{label}</label>}
          <div>
            {search ? (
              <Select
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    padding: 2,
                    border: '1px solid #e4e6ef',
                  }),
                }}
                value={value}
                onChange={(event) => change(event)}
                placeholder={placeholder ? placeholder : 'Selecione uma opção'}
                options={options.map((option: any) => ({
                  value: option.value,
                  label: option.select,
                }))}
                isDisabled={disabled ? disabled : false}
              />
            ) : (
              <select
                className='form-select fw-normal ps-4 pe-12 border border-hover-primary bg-dark text-white'
                data-kt-select2='true'
                data-placeholder='Select option'
                data-allow-clear='true'
                value={value}
                defaultValue={defaultValue}
                disabled={disabled ? disabled : false}
                onChange={(event) => change(event.target.value)}
              >
                {options.map((option: any) => (
                  <option key={option.key ? option.key : option.value} value={option.value}>
                    {option.select}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      )
    case 'select-multiple':
      return (
        <div className='mt-6'>
          {label && <label className='form-label fw-normal'>{label}</label>}
          <div>
            <select
              className='form-select fw-normal ps-4 pe-12 border border-hover-primary'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              value={value}
              onChange={(event) => change(event.target.value)}
              multiple
            >
              {options.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.select}
                </option>
              ))}
            </select>
          </div>
        </div>
      )
    case 'search':
      return (
        <div className='d-flex align-items-center border border-hover-primary px-3 rounded mt-6'>
          <i className='fas fa-search'></i>
          <input
            className='border-0 w-100 form-control'
            type='text'
            placeholder={placeholder}
            value={value}
            onBlur={(event: any) => blur && blur(event.target.value)}
            onChange={(event) => change(event.target.value)}
          />
        </div>
      )
    case 'date':
      return (
        <div className='mt-6'>
          {label && <label className='form-label fw-normal'>{label}</label>}
          <div className='d-flex align-items-center border border-hover-primary  rounded'>
            <input
              className={`border-0 w-100 form-control fw-normal ${className? className : 'bg-dark text-white'} `} 
              type='date'
              placeholder={placeholder}
              value={value}
              onChange={(event) => change(event.target.value)}
              min={minLength}
              max={maxLength}
            />
          </div>
        </div>
      )
    case 'email':
      return (
        <div className='mt-6'>
          {label && <label className='form-label fw-normal'>{label}</label>}
          <div className='d-flex align-items-center border border-hover-primary rounded'>
            <input
              className='border-0 w-100 form-control fw-normal'
              type='email'
              placeholder={placeholder}
              value={value}
              onChange={(event) => change(event.target.value)}
            />
          </div>
        </div>
      )
    case 'number':
      return (
        <div className='mt-6'>
          {label && <label className='form-label fw-normal'>{label}</label>}
          <div className='d-flex align-items-center border border-hover-primary rounded'>
            <input
              className={
                textCenter
                  ? 'border-0 w-100 form-control fw-normal text-center'
                  : 'border-0 w-100 form-control fw-normal'
              }
              type='number'
              disabled={disabled}
              placeholder={placeholder}
              value={value}
              onBlur={(event: any) => blur && blur(event.target.value)}
              onChange={(event) => {
                if (minNumber && !maxNumber && minNumber <= parseInt(event.target.value)) {
                  change(event.target.value)
                }
                else if (maxNumber && !minNumber && maxNumber >= parseInt(event.target.value)) {
                  change(event.target.value)
                }
                else if (maxNumber && minNumber && maxNumber >= parseInt(event.target.value) && minNumber <= parseInt(event.target.value)) {
                  change(event.target.value)
                }
                else if (!maxNumber && !maxNumber) {
                  change(event.target.value)
                }
                else if (!event.target.value) {
                  change(event.target.value)
                }
              }}
              max={maxNumber}
              min={minNumber}
            />
          </div>
        </div>
      )
    case 'tel':
      return (
        <div className='mt-6'>
          {label && <label className='form-label fw-normal'>{label}</label>}
          <div className='d-flex flex-grow-1 align-items-center border border-hover-primary rounded'>
            <InputMask
              className='border-0 w-100 form-control fw-normal'
              mask='(99) 99999-9999'
              placeholder={placeholder}
              value={value}
              onChange={(event: any) => change(event.target.value)}
            />
          </div>
        </div>
      )
    case 'time':
      return (
        <div>
          {label && <label className='form-label fw-normal'>{label}</label>}
          <div className='d-flex align-items-center border border-hover-primary px-3 rounded bg-dark'>
            <InputMask
              className='border-0 w-100 form-control fw-normal text-center bg-dark text-white'
              mask='99:99'
              placeholder={placeholder}
              value={value}
              onChange={(event: any) => change(event.target.value)}
              onBlur={(event: any) => blur && blur(event.target.value)}
              disabled={disabled}
            />
          </div>
        </div>
      )
    case 'cnpj':
      return (
        <div className='mt-6'>
          {label && <label className='form-label fw-normal'>{label}</label>}
          <div className='d-flex align-items-center border border-hover-primary rounded'>
            <InputMask
              className='border-0 w-100 form-control fw-normal'
              mask='99.999.999/9999-99'
              placeholder={placeholder}
              value={value}
              onChange={(event: any) => change(event.target.value)}
              disabled={disabled}
            />
          </div>
        </div>
      )
    case 'cep':
      return (
        <div className='mt-6'>
          {label && <label className='form-label fw-normal'>{label}</label>}
          <div className='d-flex align-items-center border border-hover-primary rounded'>
            <InputMask
              className='border-0 w-100 form-control fw-normal'
              mask='99999-999'
              placeholder={placeholder}
              value={value}
              onChange={(event: any) => change(event.target.value)}
              onBlur={(event: any) => blur && blur(event.target.value)}
            />
          </div>
        </div>
      )
    case 'cpf':
      return (
        <div className='mt-6'>
          {label && <label className='form-label fw-normal'>{label}</label>}
          <div className='d-flex align-items-center border border-hover-primary rounded'>
            <InputMask
              className='border-0 w-100 form-control fw-normal'
              mask='999.999.999-99'
              placeholder={placeholder}
              value={value}
              onChange={(event: any) => change(event.target.value)}
              onBlur={(event: any) => blur && blur(event.target.value)}
            />
          </div>
        </div>
      )
    case 'color':
      return (
        <div className='mt-6'>
          {label && <label className='form-label fw-normal'>{label}</label>}
          <div className='d-flex min-w-150px align-items-center border border-hover-primary rounded '>
            <input
              className='border-0 w-100 form-control fw-normal'
              type='color'
              value={value}
              onChange={(event) => change(event.target.value)}
            />
          </div>
        </div>
      )
    case 'textarea':
      return (
        <div className='mt-6'>
          {label && <label className='form-label fw-normal'>{label}</label>}
          <div className='d-flex min-w-150px align-items-center border border-hover-primary rounded'>
            <textarea
              className='border-0 w-100 form-control fw-normal'
              value={value}
              placeholder={placeholder}
              maxLength={maxCaracteres}
              rows={rows}
              disabled={disabled}
              onChange={(event) => change(event.target.value)}
            ></textarea>
          </div>
        </div>
      )
    case 'password':
      return (
        <div className='mt-6 flex-grow-1'>
          {label && <label className='form-label fw-normal'>{label}</label>}
          <div className='d-flex align-items-center border border-hover-primary rounded bg-white'>
            <input
              className='border-0 w-100 form-control fw-normal'
              type={hiddenPassword ? 'password' : 'default'}
              placeholder={placeholder}
              value={value}
              onChange={(event) => change(event.target.value)}
              disabled={disabled}
              autoComplete={autoComplete}
            />
            {hiddenPassword ? (
              <i
                style={{ color: '#ccc', fontSize: 20, paddingRight: 12 }}
                className='bi bi-eye-fill cursor-pointer text-hover-primary'
                onClick={() => setHiddenPassword(!hiddenPassword)}
              ></i>
            ) : (
              <i
                style={{ color: '#ccc', fontSize: 20, paddingRight: 12 }}
                className='bi bi-eye-slash-fill cursor-pointer text-hover-primary'
                onClick={() => setHiddenPassword(!hiddenPassword)}
              ></i>
            )}
          </div>
        </div>
      )
    case 'file':
      return (
        <div>
          <input
            type='file'
            name='file'
            accept={acceptFile ? acceptFile : ''}
            onChange={(event) => change(event)}
            value={value}
          />
        </div>
      )
    case 'image':
      return (
        <div>
          {label && <label className='form-label fw-normal'>{label}</label>}
          <div
            className={`${styles.image_container} mt-1 w-150px ${value ? '' : styles.bgImgContainer
              }`}
          >
            <div className='w-150px h-150px rounded'>
              <img
                className='w-100 h-100'
                src={
                  value
                    ? typeof value === 'string'
                      ? value
                      : URL.createObjectURL(value)
                    : 'https://via.placeholder.com/150x150'
                }
                alt='Logo pluginspace'
              />
            </div>
            <label
              className={`${styles.icon_edit} btn btn-xs btn-icon rounded-circle btn-white btn-hover-text-primary shadow`}
              data-action='change'
              data-toggle='tooltip'
              title='Trocar'
            >
              <i className='fa fa-pen icon-sm text-muted'></i>
              <input
                type='file'
                accept='.jpg, .jpeg, .png, .gif'
                name='file'
                className={`${styles.input_edit} custom-file-input opacity-0 w-0 h-0`}
                onChange={(event) => change(event)}
              />
            </label>
            <span
              className={`${styles.icon_remove} btn btn-xs btn-icon rounded-circle btn-white btn-hover-text-primary shadow`}
              data-action='remove'
              data-toggle='tooltip'
              title='Remover'
              onClick={() => change(null)}
            >
              <i className='bi bi-x text-muted fs-1'></i>
            </span>
          </div>
        </div>
      )

    case 'range': return (<>
      <div className='mt-6'>
        {label && <label className='form-label fw-normal text-white'>{label}</label>}
        <div className='d-flex min-w-150px align-items-center border border-hover-primary rounded'>
          <input
            className='border-0 w-100 form-control fw-normal bg-dark text-white'
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={value}
            onChange={(event) => change(event.target.value)}
          />
        </div>
      </div>
    </>)
    default:
      return (
        <div className='mt-6 flex-grow-1'>
          {label && (
            <label className='form-label fw-normal'>
              {label} <small>{smalltext}</small>
            </label>
          )}
          <div className='d-flex align-items-center border border-hover-primary rounded'>
            <input
              className={
                textCenter
                  ? 'border-0 w-100 form-control fw-normal text-center'
                  : 'border-0 w-100 form-control fw-normal'
              }
              type='text'
              placeholder={placeholder}
              value={value}
              onChange={(event) => change(event.target.value)}
              disabled={disabled}
              name={name}
              defaultValue={defaultValue}
              autoFocus={focus}
              onBlur={(event: any) => blur && blur(event.target.value)}
            />
          </div>
        </div>
      )
  }
}

export { Input }
