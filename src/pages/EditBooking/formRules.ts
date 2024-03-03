export default {
  noLetters: {
    pattern: {
      value: /^(?=.*?[1-9 ])[0-9() -]+$/,
      message: 'No letters'
    }
  },
  onlyLetters: {
    pattern: {
      value: /^[a-zA-Z\s]*$/,
      message: 'Only letters'
    }
  },
  required: {
    required: 'Required'
  }
}
