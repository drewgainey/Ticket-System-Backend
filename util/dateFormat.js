const dateFormat = () => {
    const date = new Date();
    const [month, day, year] = [
      date.getMonth() + 1,
      date.getDate(),
      date.getFullYear(),
    ];
    return `${month}/${day}/${year}`;
  };

  module.exports = { dateFormat };