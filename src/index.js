import Clipboard from 'clipboard';

let succText = '复制成功！'
let errText = '复制失败！'
let succTip = succText => {}
let errTip = errText => {}

export const clipConfig = opt => {
  if (Object.prototype.toString.call(opt) != '[object Object]') {
    throw new Error('clipConfig的参数必须是Object类型')
  }
  const { successText, errorText, success, error } = opt
  succText = successText
  errText = errorText
  succTip = success
  errTip = error
}

export const clipCopy = opt => {
  if (Object.prototype.toString.call(opt) != '[object Object]') {
    throw new Error('clipCopy的参数必须是一个对象，至少包含event和data两个属性')
  }
  const { event, data, successText, errorText, success, error } = opt
  const clipboard = new Clipboard(event.target, { text: () => data });
  clipboard.on('success', () => {
    if (typeof succTip == 'function') succTip(successText || succText)
    if (typeof success == 'function') success();
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    if (typeof errTip == 'function') errTip(errorText || errText)
    if (typeof error == 'function') error();
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}

