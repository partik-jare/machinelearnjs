import * as _ from 'lodash';


export class Question {
	private features = [];
	private column = null;
	private value = null;

	constructor(features, column, value) {
		this.features = features;
		this.column = column;
		this.value = value;
	}

	public match(example) {
		const val = example[this.column];
		if (_.isNumber(val)) {
			return val >= this.value;
		} else {
			return val === this.value;
		}
	}

	public toString():string {
		const condition = _.isNumber(this.value) ? '>=' : '==';
		return `Is ${this.features[this.column]} ${condition} ${this.value}`;
	}
}

export class DecisionTreeClassifier {

	/**
	 * According to the given targets array, count occurences into an object
	 * Increment the value as they occur
	 * @param targets
	 * @returns {{}}
	 */
	public classCounts(targets) {
		// TODO: If targets is a multi-dimensional, automatically grab -1 index
		return _.reduce(targets, (accum, target) => {
			const count = _.get(accum, target);
			if (_.isNumber(count) && count > 0) {
				return _.set(accum, target, count + 1);
			} else {
				return _.set(accum, target, 1);
			}
		}, {});
	}

	/**
	 * Split rows into true and false according to quesiton.match result
	 * @param rows
	 * @param {Question} question
	 * @returns {{trueRows: Array; falseRows: Array}}
	 */
	public partition(rows, question: Question) {
		let trueRows = [];
		let falseRows = [];
		_.forEach(rows, (row) => {
			if (question.match(row)) {
				trueRows.push(row);
			} else {
				falseRows.push(row);
			}
		});

		return { trueRows, falseRows };
	}

	/**
	 * Calculate the gini impurity of rows
	 * Checkout: https://en.wikipedia.org/wiki/Decision_tree_learning#Gini_impurity
	 * @param targets
	 */
	public gini(targets) {
		const counts = this.classCounts(targets);
		let impurity = 1;
		const keys = _.keys(counts);
		_.forEach(keys, (key) => {
			const count = _.get(counts, key);

			if (_.isNull(count)) {
				throw Error('Invalid class count detected!');
			}

			let probOfClass = count / _.size(targets);

		});
	}

	public fit() {

	}
}