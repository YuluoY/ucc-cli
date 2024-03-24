#!/usr/bin/env node

import { program } from "commander";
import inquirer from "inquirer";
import { resolve as r } from 'node:path/win32'
import { readFileSync } from 'node:fs'
import { lightGreen } from "kolorist";

const resolve = (...args) => r(process.cwd(), ...args)
const pckg = JSON.parse(readFileSync(resolve('package.json'), 'utf-8'))


const data = {
  framework: '',
  Vue: {
    TypeScript: {

    },
    JavaScript: false
  },
  React: {
    TypeScript: false,
    JavaScript: false,
  },
}

/**
 * 对脚手架的基本配置
 */
function basicSetting() {
  program.version(pckg.version)
  program.description(pckg.description)
  program
    .option('-d, --debug', '是否开启调试模式', false)
    .option('-f, --framework <framework>', '指定框架', false)
    .option('-t, --template <template>', '指定模板', false)
    .option('-p, --path <path>', '指定项目路径', './')
    .option('-n, --name <name>', '指定项目名称', 'my-app')
    .option('-c, --config <config>', '指定配置文件', './config.js')
    .option('-s, --silent', '是否开启静默模式', false)
    .option('-e, --env <env>', '指定环境变量', 'development')
    .option('-v, --verbose', '是否开启详细模式', false)
    .option('-h, --help', '帮助信息', false)
    .parse(process.argv)

  const { help, template } = program.opts()
  if (help) {
    program.outputHelp()
    process.exit(0)
  }
  if (template) {
    console.log(template);
  }
}

/**
 * 处理框架，选择出需要创建的语言
 */
async function processFramework() {
  const { framework } = await inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      message: lightGreen('请选择一个框架'),
      choices: Object.keys(data).splice(1).map(v => ({ name: v, value: v }))
    }
  ])
  data.framework = framework;
}

/**
 * 选择编程语言
 */
async function processCodeLanguage() {
  const { codeLanguage } = await inquirer.prompt([
    {
      type: 'list',
      name: 'codeLanguage',
      message: lightGreen('请选择编程语言'),
      choices: Object.keys(data[data.framework]).map(v => ({ name: v, value: v }))
    }
  ])
  data[data.framework][codeLanguage] = true;
}



async function init() {
  basicSetting()

  // 获取框架
  await processFramework()

  // 获取编程语言
  await processCodeLanguage()

  console.log(data);

}

init();