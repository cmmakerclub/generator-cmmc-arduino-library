const validators = {
  defaultValidators: {
    notNull: (input) => {
      if (input) {
        return true
      } else {
        return 'Please enter a valid input'
      }
    }
  }
}

module.exports = validators
