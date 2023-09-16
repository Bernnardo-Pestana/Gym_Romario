const isEmpty = (payload: any) => {
  const emptyFields = []
  Object.entries(payload).forEach((element) => {
    if (element[1] === '' || element[1] === '0') {
      emptyFields.push(element[0])
    }
  })

  return emptyFields.length > 0 ? false : true
}

const isEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

// padrão parametro date => string formato "DD/MM/AAAA"
const isBirthday = (date: string) => {
  const year = new Date().getFullYear()
  let month: any = new Date().getMonth() + 1
  let day: any = new Date().getDate()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day

  let yearValidate = false
  if (date.split('/')[2] && date.split('/')[2].length === 4) {
    if (Number(date.split('/')[2]) > year - 110 && Number(date.split('/')[2]) <= year) {
      yearValidate = true
    }
  }
  const monthValidate = Number(date.split('/')[1]) <= 12
  const dayValidate = Number(date.split('/')[0]) <= 31
  const fullDateValidate = date.length === 10 ? true : false

  let dateValidate = false
  const currentDate = `${day}/${month}/${year}`
  let arrayDate = [date, currentDate]
  arrayDate = arrayDate.sort((a: any, b: any) => a.split('/')[0] - b.split('/')[0])
  arrayDate = arrayDate.sort((a: any, b: any) => a.split('/')[1] - b.split('/')[1])
  arrayDate = arrayDate.sort((a: any, b: any) => a.split('/')[2] - b.split('/')[2])
  dateValidate = arrayDate[1] === date ? false : true

  const birthdayValidate =
    yearValidate && monthValidate && dayValidate && fullDateValidate && dateValidate ? true : false
  return birthdayValidate
}

// padrão parametro date => string formato "MM/AA"
const isExpDate = (date: string) => {
  const year = new Date().getFullYear() - 2000
  let month = new Date().getMonth() + 1
  const yearValidate = parseInt(date.split('/')[1]) >= year ? true : false
  let monthValidate = false
  if (parseInt(date.split('/')[0]) < 13)
    monthValidate = yearValidate ? true : parseInt(date.split('/')[0]) >= month ? true : false
  const fillValidate = date.length === 5 ? true : false
  const validate = yearValidate && monthValidate && fillValidate ? true : false
  return validate
}

const isName = (text: string) => {
  text = text.replaceAll(' ', '').toLowerCase()
  text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a')
  text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e')
  text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i')
  text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o')
  text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u')
  text = text.replace(new RegExp('[Ç]', 'gi'), 'c')
  const re = /((?=.*\d)|(?=.*\W+))/g
  const validate = re.test(text)
  return !validate
}

export {isEmpty, isEmail, isBirthday, isExpDate, isName}
