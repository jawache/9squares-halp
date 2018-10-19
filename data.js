class Data {
  constructor(raw_data) {
    this.training = this.parse(raw_data.getArray().slice(0, 2000));
    this.testing = this.parse(raw_data.getArray().slice(2000, 2500));
  }

  parse(data) {
    let labels = [];
    let inputs = [];
    for (let row of data) {
      // Convert each item to an integer
      row = row.map(x => x.trim()).map(x => parseInt(x));

      // Get the first item, these are the labels
      labels.push(row[0]);

      // Get the remaining items in the row, divide by 255 to get from 0 -> 1
      inputs.push(row.slice(1).map(x => x / 255));
    }

    // Convert to tensors
    inputs = tf.tensor(inputs);
    labels = tf.tensor([labels]).transpose(); // We need to convert into columns

    return { labels, inputs };
  }
}
