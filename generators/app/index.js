'use strict'
// import { defaultValidators } from './validators'

const path = require('path')
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const mkdirp = require('mkdirp')
const _s = require('underscore.string')
const defaultValidators = require('./validators').defaultValidators

module.exports = class extends Generator {
  // note: arguments and options should be defined in the constructor.
  constructor (args, opts) {
    super(args, opts)

    // // This makes `appname` argument.
    this.argument('appname', {type: String, required: false, description: 'app name'})
    // // And you can then access it later; e.g. this.appname
  }

  initializing () {
    this.props = {}
    this.pkg = require('../../package.json')
  }

  default () {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log('Your generator must be inside a folder named ' + this.props.name + '\n' +
        'I\'ll automatically create this folder.'
      )

      // create-directory
      // const sluggifiedName = _s.slugify(this.props.name)
      // mkdirp(sluggifiedName)
      // this.destinationRoot(this.destinationPath(this.props.name))
    }
  }

  prompting () {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the best ' + chalk.red(this.pkg.name) + ' generator!'))

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your library name:',
        validate: defaultValidators.notNull,
        default: this.options.appname
      },
      {
        type: 'input',
        name: 'platform',
        message: 'platform',
        validate: defaultValidators.notNull,
        default: 'espressif8266'
      }
    ]

    return this.prompt(prompts).then(answers => {
      // To access props later use this.props.someAnswer;
      this.props = answers
    })
  }

  writing () {
    this._writingGit()
    this._writingConfig()
  }

  _writingConfig () {
    const templateOptions = {
      appname: this.props.name,
      className: this.props.name
    }

    mkdirp(`${this.props.name}/lib`)
    mkdirp(`${this.props.name}/src`)
    mkdirp(`${this.props.name}/examples`)
    mkdirp(`${this.props.name}/examples/example1`)

    const file = (name, path) => {
      return {name, path}
    }

    let files = ['keywords.txt',
      'platformio.ini',
      'library.properties',
      'extra_script.py',
      file('example.ino', `examples/example1/example1.ino`),
      file('lib.cpp', `src/${this.props.name}.cpp`),
      file('lib.h', `src/${this.props.name}.h`)
    ]

    files.forEach((file, idx) => {
      console.log(file)
      const src = this.templatePath(file.name || file)
      const dst = this.destinationPath(`${this.props.name}/${file.path || file}`)
      this.fs.copyTpl(src, dst, templateOptions)
    })
  }

  _writingGit () {
    // this.fs.copy(
    //   this.templatePath('gitignore'),
    //   this.destinationPath('.gitignore'))
    //
    // this.fs.copy(
    //   this.templatePath('gitattributes'),
    //   this.destinationPath('.gitattributes'))
  }

  install () {
    // const commandExists = require('command-exists').sync
    // const hasYarn = commandExists('yarn')
    // this.installDependencies({
    //   npm: false,
    //   yarn: false,
    //   bower: false
    // })
  }

  end () {
    this.log(`Happy coding!`)
  }
}
