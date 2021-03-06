/* tslint:disable */
import { OneHotEncoder, MinMaxScaler } from './data';

// Playing around with onehotencoder
const enc = new OneHotEncoder();
const planetList = [
  { planet: 'mars', isGasGiant: false, value: 10 },
  { planet: 'saturn', isGasGiant: true, value: 20 },
  { planet: 'jupiter', isGasGiant: true, value: 30 }
];
const encodeInfo = enc.encode(planetList, {
  dataKeys: ['value', 'isGasGiant'],
  labelKeys: ['planet']
});
console.log(encodeInfo.data);

const decodedInfo = enc.decode(encodeInfo.data, encodeInfo.decoders);
console.log(decodedInfo);

// MinMaxScaler
const minmaxScaler = new MinMaxScaler({ featureRange: [0, 1] });
minmaxScaler.fit([4, 5, 6]);
const result = minmaxScaler.fit_transform([4, 5, 6]);
console.log('minmax result', result);

const minmaxScaler2 = new MinMaxScaler({ featureRange: [0, 1] });
minmaxScaler2.fit([[1, 2, 3], [4, 5, 6]]);
const result2 = minmaxScaler2.transform([[1, 2, 3]]);
console.log('minmax result 2', result2);

// Imputer
import { Imputer } from './Imputer';

const testX = [[1, 2], [null, 3], [7, 6]];
const imp = new Imputer({ missingValues: null, axis: 0 });
imp.fit(testX);
const impResult = imp.fit_transform([[null, 2], [6, null], [7, 6]]);
console.log('checking result', impResult);

// Binarizer
import { Binarizer } from './data';

const binX = [[1, -1, 2], [2, 0, 0], [0, 1, -1]];
const newBin = new Binarizer({ threshold: 0 });
const binResult = newBin.transform(binX);
console.log('binresult: ', binResult);

// Label Encoder
import { LabelEncoder } from './label';

const le = new LabelEncoder();
const labelX = ['amsterdam', 'paris', 'tokyo'];
le.fit(labelX);
const transformX = ['tokyo', 'tokyo', 'paris'];
const leResult = le.transform(transformX);
console.log(leResult);

// add_dummy_features
import { add_dummy_feature } from './data';

const dummy = add_dummy_feature([[0, 1, 2], [1, 0, 3]]);
console.log(dummy);
