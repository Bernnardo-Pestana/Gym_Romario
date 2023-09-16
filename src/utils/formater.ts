const numberToCpf = (n: string) => n.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
const numberToCpfHidden = (n: string) => n.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.***.$3-**')
const numberToCnpj = (n: string) =>
  n.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
const numberToCnpjHidden = (n: string) =>
  n.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.***.$3/$4-**')
const cpfToNumber = (n: string) => n.replace(/[^\w\s]/gi, '')
const toMoney = (n: string) =>
  parseFloat(n).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
    style: 'currency',
    currency: 'BRL',
  })
const toDate = (d: string) => {
  let firstSplit
  let day
  let mounth
  let year
  if (d && d.length > 0) {
    if (String(d).split('').includes('T')) {
      firstSplit = d.split('T')[0]
      day = firstSplit.split('-')[2]
      mounth = firstSplit.split('-')[1]
      year = firstSplit.split('-')[0]
    } else {
      firstSplit = String(d).split(' ')[0]
      day = firstSplit.split('-')[2]
      mounth = firstSplit.split('-')[1]
      year = firstSplit.split('-')[0]
    }
    return `${day}/${mounth}/${year}`
  }
  return '-'
}
const toHour = (d: string) => {
  let secondSplit
  let thirdSplit
  let hour
  let minute
  let second
  if (d && d.length > 0) {
    if (String(d).split('').includes('T')) {
      secondSplit = d.split('T')[1]
      thirdSplit = secondSplit.split('.')[0]
      hour = thirdSplit.split(':')[0]
      minute = thirdSplit.split(':')[1]
      second = thirdSplit.split(':')[2]
    } else {
      secondSplit = String(d).split(' ')[1]
      thirdSplit = secondSplit.split('.')[0]
      hour = thirdSplit.split(':')[0]
      minute = thirdSplit.split(':')[1]
      second = thirdSplit.split(':')[2]
    }
    return `${hour}:${minute}:${second}`
  }
  return ''
}
const toDateTime = (d: string) => {
  let firstSplit
  let secondSplit
  let thirdSplit
  let day
  let mounth
  let year
  let hour
  let minute
  let second
  if (d && d.length > 0) {
    if (String(d).split('').includes('T')) {
      firstSplit = d.split('T')[0]
      secondSplit = d.split('T')[1]
      thirdSplit = secondSplit.split('.')[0]
      day = firstSplit.split('-')[2]
      mounth = firstSplit.split('-')[1]
      year = firstSplit.split('-')[0]
      hour = thirdSplit.split(':')[0]
      minute = thirdSplit.split(':')[1]
      second = thirdSplit.split(':')[2]
    } else {
      firstSplit = String(d).split(' ')[0]
      secondSplit = String(d).split(' ')[1]
      thirdSplit = secondSplit.split('.')[0]
      day = firstSplit.split('-')[2]
      mounth = firstSplit.split('-')[1]
      year = firstSplit.split('-')[0]
      hour = thirdSplit.split(':')[0]
      minute = thirdSplit.split(':')[1]
      second = thirdSplit.split(':')[2]
    }
    return `${day}/${mounth}/${year} ${hour}:${minute}:${second}`
  }
  return ''
}
const toDateUS = (d: string) => {
  const firstSplit = d.split(' ')[0]
  const day = firstSplit.split('-')[2]
  const mounth = firstSplit.split('-')[1]
  const year = firstSplit.split('-')[0]
  return `${year}-${mounth}-${day}`
}

const dateBRtoDateUS = (d: string) => {
  const day = d.split('/')[0]
  const mounth = d.split('/')[1]
  const year = d.split('/')[2]
  return `${year}-${mounth}-${day}`
}

const toTimeStamp = (d: string) => {
  let day = ''
  let mounth = ''
  let year = ''
  if (d.includes('/')) {
    day = d.split('/')[0]
    mounth = d.split('/')[1]
    year = d.split('/')[2]
  } else {
    day = d.split('-')[0]
    mounth = d.split('-')[1]
    year = d.split('-')[2]
  }
  return `${year}-${mounth}-${day}`
}

const formatPhone = (value: string) => {
  value = value.replace(/\D/g, '') //Remove tudo o que não é dígito
  value = value.replace(/^(\d{2})(\d)/g, '($1) $2') //Coloca parênteses em volta dos dois primeiros dígitos
  value = value.replace(/(\d)(\d{4})$/, '$1-$2') //Coloca hífen entre o quarto e o quinto dígitos
  return value
}

export function telephoneNoMask(telephone: string) {
	let newTelephone = telephone.replaceAll("(", "");
	newTelephone = newTelephone.replaceAll(")", "");
	newTelephone = newTelephone.replaceAll(" ", "");
	newTelephone = newTelephone.replaceAll("-", "");
	return newTelephone;
}

const formatCpfCnpj = (cpfCnpj: string) => {
  let newCpf = cpfCnpj.replaceAll(".", "");
  newCpf = newCpf.replaceAll("-", "");
  newCpf = newCpf.replaceAll("/", "");
  return newCpf;
}

export {
  numberToCpf,
  numberToCpfHidden,
  numberToCnpj,
  numberToCnpjHidden,
  cpfToNumber,
  toDate,
  toDateTime,
  toDateUS,
  dateBRtoDateUS,
  toHour,
  toMoney,
  toTimeStamp,
  formatPhone,
  formatCpfCnpj
}
