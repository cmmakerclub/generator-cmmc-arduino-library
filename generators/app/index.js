'use strict'
const path = require('path')
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const mkdirp = require('mkdirp')
const _s = require('underscore.string')

const defaultValidators = {
  notNull: (input) => {
    if (input) {
      return true
    } else {
      return 'Please enter a valid input'
    }
  }
}
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
      const sluggifiedName = _s.slugify(this.props.name)
      mkdirp(sluggifiedName)
      this.destinationRoot(this.destinationPath(sluggifiedName))
    }
  }

  prompting () {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the best ' + chalk.red('generator-cmmc-mqtt-connector') + ' generator!'))

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name:',
        default: this.options.appname || this.appname // Default to current folder name
      },
      {
        type: 'input',
        name: 'wifiSsid',
        message: 'Your WIFI ssid',
        default: this.config.get('wifiSsid') || 'belkin.636',
        validate: defaultValidators.notNull
      },
      {
        type: 'input',
        name: 'wifiPassword',
        message: 'Your WIFI password',
        default: this.config.get('wifiPassword') || '3eb7e66b',
        validate: defaultValidators.notNull
      },
      {
        type: 'input',
        name: 'mqttHostName',
        message: 'Your mqtt host name',
        default: this.config.get('mqttHostName') || 'beta.cmmc.io',
        validate: defaultValidators.notNull
      },
      {
        type: 'input',
        name: 'mqttPort',
        message: 'Your mqtt port',
        default: this.config.get('mqttPort') || '51883',
        validate: defaultValidators.notNull
      }, {
        type: 'input',
        name: 'mqttPrefix',
        message: 'Your app prefix',
        default: this.config.get('mqttPrefix') || 'MARU/',
        validate: defaultValidators.notNull
      }, {
        type: 'input',
        name: 'mqttDeviceName',
        message: 'Your app device name',
        default: this.config.get('mqttDeviceName') || 'YOUR-NAME-001',
        validate: defaultValidators.notNull
      }, {
        type: 'input',
        name: 'mqttPublishEverySeconds',
        message: 'publish sensor data every (seconds)',
        default: this.config.get('mqttPublishEverySeconds') || 10,
        validate: defaultValidators.notNull
      },
      {
        type: 'input',
        name: 'mqttClientId',
        message: 'your mqttClientId',
        default: this.config.get('mqttClientId') || 'cmmc-mqtt-' + (10e3 * Math.random()).toFixed(4),
        validate: defaultValidators.notNull
      },
      {
        type: 'input',
        name: 'ledPin',
        message: 'led pin',
        default: '2',
        validate: defaultValidators.notNull
      },
      {
        type: 'input',
        name: 'relayPin',
        message: 'relay pin',
        default: '15',
        validate: defaultValidators.notNull
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
      wifiSsid: this.props.wifiSsid,
      wifiPassword: this.props.wifiPassword,
      mqttHostName: this.props.mqttHostName,
      mqttPort: this.props.mqttPort,
      mqttUserName: this.props.mqttUserName,
      mqttPassword: this.props.mqttPassword,
      mqttPrefix: this.props.mqttPrefix,
      mqttPublishEverySeconds: this.props.mqttPublishEverySeconds,
      ledPin: this.props.ledPin,
      relayPin: this.props.relayPin,
      mqttClientId: this.props.mqttClientId,
      mqttDeviceName: this.props.mqttDeviceName
    }

    this.fs.copyTpl(this.templatePath('basic_mqtt/_publish.h'),
      this.destinationPath(this.props.name + '/_publish.h'), templateOptions
    )
    this.fs.copyTpl(this.templatePath('basic_mqtt/_receive.h'),
      this.destinationPath(this.props.name + '/_receive.h'), templateOptions
    )
    this.fs.copyTpl(this.templatePath('basic_mqtt/basic_mqtt.ino'),
      this.destinationPath(this.props.name + '/' + this.props.name + '.ino'), templateOptions
    )
    this.fs.copyTpl(this.templatePath('basic_mqtt/init_mqtt.h'),
      this.destinationPath(this.props.name + '/init_mqtt.h'), templateOptions
    )
    this.fs.copyTpl(this.templatePath('platformio.ini'),
      this.destinationPath('platformio.ini'), templateOptions)
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
