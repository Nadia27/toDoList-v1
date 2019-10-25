// jshint esversion:6



exports.getDate = function() {
  // Creates an instance of Date object
  const today = new Date();

  // Date formatting style
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };

  // Return the Date obj as a string with specified options
  return today.toLocaleDateString('en-US', options);
}


exports.getDay = function () {

  // Creates an instance of Date object
  const today = new Date();
  // Date formatting style
  const options = {
    weekday: 'long',
  };

  // Return the Date obj as a string with specified options
  return today.toLocaleDateString('en-US', options);
}
