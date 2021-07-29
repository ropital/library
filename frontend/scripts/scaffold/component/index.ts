import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { createComponentTemplate, createIndexTemplate, createStorybookTemplate } from './template'

const getArgValue = (arg: string): { key: string; value: string } => {
  const initStr = arg.slice(0, 2)
  if (initStr !== '--') {
    throw new Error('引数は"--"で始めてください')
  }

  const equalIndex = arg.indexOf('=')
  if (equalIndex === -1) {
    throw new Error('引数のkeyとvalueの間には"="を使ってください(ex: --name="Button")')
  }

  const key = arg.slice(2, equalIndex)
  if (key.length === 0) {
    throw new Error('Keyがありません')
  }
  if (key !== 'name') {
    throw new Error('引数のkeyはnameを指定してください')
  }

  const value = arg.slice(equalIndex + 1, arg.length)
  if (value.length === 0) {
    throw new Error('引数の値がありません')
  }

  return { key, value }
}

const validateArgs = (args: string[]) => {
  if (args.length !== 4) {
    throw new Error(
      '引数の数が正しくありません。引数--nameを指定してください'
    )
  }
}

const main = () => {
  try {
    validateArgs(process.argv)
    const componentName = getArgValue(process.argv[3])

    const path = `src/components/${componentName.value}`
    if (!existsSync(path)) {
      mkdirSync(path, {
        recursive: true,
      })
    }

    writeFileSync(`${path}/${componentName.value}.tsx`, createComponentTemplate(componentName.value))
    writeFileSync(`${path}/index.tsx`, createIndexTemplate(componentName.value))
    writeFileSync(
      `${path}/${componentName.value}.stories.tsx`,
      createStorybookTemplate(componentName.value, componentName.value)
    )
  } catch (error) {
    console.error(error)
  }
}

main()
